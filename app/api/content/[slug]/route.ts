import {authorized,readPayload,json,publishFailure,PublishError,hash,normalizedBody} from '@/lib/publishing';
import {database,seedArticles} from '@/lib/repository';
import {SITE_URL} from '@/lib/config';
export const dynamic='force-dynamic';
type Context={params:Promise<{slug:string}>};
export async function GET(request:Request,{params}:Context){if(!await authorized(request))return json({error:'Unauthorized'},401);try{const {slug}=await params;const row=await database().prepare('SELECT payload, revision FROM posts WHERE slug = ?').bind(slug).first<{payload:string;revision:string}>();if(!row)return json({error:'Article not found'},404);return json({article:JSON.parse(row.payload),revision:row.revision},200,{'ETag':`"${row.revision}"`});}catch(e){return publishFailure(e);}}
export async function PUT(request:Request,{params}:Context){if(!await authorized(request))return json({error:'Unauthorized'},401);try{
 const {slug}=await params;const data=await readPayload(request);if(data.slug!==slug)throw new PublishError(422,'Body slug must match the route.');
 if(seedArticles.some(a=>a.slug===slug))throw new PublishError(409,'Bundled articles must be edited in source.');
 const expected=request.headers.get('if-match')?.replace(/^"|"$/g,'');if(!expected)throw new PublishError(428,'Send If-Match with the revision returned by GET.');
 const db=database();const old=await db.prepare('SELECT payload,revision FROM posts WHERE slug = ?').bind(slug).first<{payload:string;revision:string}>();if(!old)throw new PublishError(404,'Article not found.');
 const revision=await hash(JSON.stringify(data));if(revision===old.revision)return json({slug,revision,idempotent:true});if(expected!==old.revision)throw new PublishError(412,'Article changed. Fetch the current revision before editing.');
 const now=new Date().toISOString();const publishedAt=data.publishedAt||JSON.parse(old.payload).publishedAt;const contentHash=await hash(normalizedBody(data));
 for(const seed of seedArticles){if(await hash(normalizedBody(seed))===contentHash)throw new PublishError(409,'This article duplicates existing editorial content.');}
 const payload={...data,publishedAt,updatedAt:now,contentHash};
 let result;try{result=await db.prepare('UPDATE posts SET title = ?,category = ?,status = ?,published_at = ?,updated_at = ?,content_hash = ?,revision = ?,payload = ? WHERE slug = ? AND revision = ?').bind(data.title,data.category,data.status,publishedAt,now,contentHash,revision,JSON.stringify(payload),slug,expected).run();}catch(e){if(e instanceof Error&&/UNIQUE constraint/.test(e.message))throw new PublishError(409,'This article body already exists.');throw e;}
 if(!result.meta.changes)throw new PublishError(412,'Article changed. Fetch the current revision.');return json({slug,revision,url:SITE_URL+'/learn/'+slug,status:data.status,publishedAt});
 }catch(e){return publishFailure(e);}}
