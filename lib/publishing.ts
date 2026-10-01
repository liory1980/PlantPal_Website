import {env} from 'cloudflare:workers';
import {postSchema} from './post-schema.mjs';
export {postSchema} from './post-schema.mjs';
export async function hash(value:string){const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');}
export async function authorized(request:Request){const expected=env.CONTENT_API_KEY;if(!expected||expected.length<32)return false;const raw=request.headers.get('authorization')||'';if(!raw.startsWith('Bearer ')||raw.length>512)return false;const a=await hash(raw.slice(7));const b=await hash(expected);let diff=0;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0;}
export function json(data:unknown,status=200,headers:Record<string,string>={}){return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex',...headers}})}
export async function readPayload(request:Request){
 if(!request.headers.get('content-type')?.toLowerCase().includes('application/json'))throw new PublishError(415,'Use Content-Type: application/json.');
 if(!request.body)throw new PublishError(400,'A JSON body is required.');
 const reader=request.body.getReader();const chunks:Uint8Array[]=[];let size=0;
 while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>512000){await reader.cancel();throw new PublishError(413,'Article payload exceeds 512 KB.');}chunks.push(value);}
 const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length;}
 let value;try{value=JSON.parse(new TextDecoder().decode(bytes));}catch{throw new PublishError(400,'Invalid JSON.');}
 const parsed=postSchema.safeParse(value);if(!parsed.success)throw new PublishError(422,'Article validation failed.',parsed.error.flatten());return parsed.data;
}
export class PublishError extends Error{constructor(public status:number,message:string,public details?:unknown){super(message)}}
export function publishFailure(error:unknown){if(error instanceof PublishError)return json({error:error.message,details:error.details},error.status);console.error('Content publishing failed',error instanceof Error?error.message:'Storage error');return json({error:'Content storage is temporarily unavailable. Retry with the same slug and payload.'},503,{'Retry-After':'30'});}
export function normalizedBody(p:{sections:{paragraphs:string[];bullets?:string[]}[]}){return p.sections.flatMap(s=>[...s.paragraphs,...(s.bullets||[])]).join(' ').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();}

