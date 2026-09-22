import {mkdir,open,readFile,rename,writeFile,unlink,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
export const root=fileURLToPath(new URL('../',import.meta.url));
export const dir=name=>path.join(root,'publisher',name);
export async function init(){for(const n of ['queue','drafts','sent','state','logs'])await mkdir(dir(n),{recursive:true});}
export async function exists(p){try{await stat(p);return true;}catch(e){if(e.code==='ENOENT')return false;throw e;}}
export async function atomicJson(file,value){const temp=file+`.${process.pid}.tmp`;await writeFile(temp,JSON.stringify(value,null,2)+'\n',{flag:'wx'});await rename(temp,file);}
export async function lock(name,fn){await init();const file=path.join(dir('state'),name+'.lock');let handle;try{handle=await open(file,'wx');await handle.writeFile(String(process.pid));}catch(e){if(e.code==='EEXIST')throw new Error(`Another ${name} run owns ${file}. If the previous run crashed, verify it has stopped before removing this lock.`);throw e;}try{return await fn();}finally{await handle.close();await unlink(file);}}
export function siteUrl(){const raw=process.env.PLANTPAL_SITE_URL;if(!raw)throw new Error('Set PLANTPAL_SITE_URL in .env.publisher.');const u=new URL(raw);if(u.username||u.password||u.search||u.hash||u.pathname!=='/')throw new Error('PLANTPAL_SITE_URL must be a site origin, without a path or credentials.');if(u.protocol!=='https:'&&!(u.protocol==='http:'&&['localhost','127.0.0.1'].includes(u.hostname)))throw new Error('Use HTTPS except for a local preview.');return u.origin;}
export function authHeaders(){const key=process.env.CONTENT_API_KEY;if(!key||key.length<32)throw new Error('Configure the publishing API key in .env.publisher.');return {'Authorization':`Bearer ${key}`,'Content-Type':'application/json'};}
export async function log(message){const line=`${new Date().toISOString()} ${message}`;console.log(line);const handle=await open(path.join(dir('logs'),'publisher.log'),'a');try{await handle.writeFile(line+'\n');}finally{await handle.close();}}
export async function readJson(file){return JSON.parse((await readFile(file,'utf8')).replace(/^\uFEFF/,''));}
