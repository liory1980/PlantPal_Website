import {authorized,readPayload,json,publishFailure,PublishError,hash,normalizedBody} from '@/lib/publishing';
import {database,seedArticles} from '@/lib/repository';
import {SITE_URL} from '@/lib/config';
export const dynamic='force-dynamic';
export async function POST(request:Request){
 if(!await authorized(request))return json({error:'A valid publishing API key is required.'},401,{'WWW-Authenticate':'Bearer'});
 try{
  const data=await readPayload(request);if(seedArticles.some(a=>a.slug===data.slug))throw new PublishError(409,'This slug belongs to the bundled editorial library. Edit its source file instead.');
  const now=new Date().toISOString();const publishedAt=data.publishedAt||now;const contentHash=await hash(normalizedBody(data));
  const requestHash=await hash(JSON.stringify(data));
  const db=database();const existing=await db.prepare('SELECT revision FROM posts WHERE slug = ?').bind(data.slug).first<{revision:string}>();
  if(existing){if(existing.revision===requestHash)return json({slug:data.slug,url:SITE_URL+'/learn/'+data.slug,revision:requestHash,idempotent:true});throw new PublishError(409,'Slug already exists with different content. Use PUT with its current revision.');}
  for(const seed of seedArticles){if(await hash(normalizedBody(seed))===contentHash)throw new PublishError(409,'This article duplicates existing editorial content.');}
  const payload={...data,publishedAt,updatedAt:now,contentHash};
  try{await db.prepare('INSERT INTO posts (slug,title,category,status,published_at,updated_at,content_hash,revision,payload) VALUES (?,?,?,?,?,?,?,?,?)').bind(data.slug,data.title,data.category,data.status,publishedAt,now,contentHash,requestHash,JSON.stringify(payload)).run();}
  catch(e){if(e instanceof Error&&/UNIQUE constraint/.test(e.message)){const retry=await db.prepare('SELECT revision FROM posts WHERE slug = ?').bind(data.slug).first<{revision:string}>();if(retry?.revision===requestHash)return json({slug:data.slug,url:SITE_URL+'/learn/'+data.slug,revision:requestHash,idempotent:true});throw new PublishError(409,'The slug or article body already exists.');}throw e;}
  return json({slug:data.slug,url:SITE_URL+'/learn/'+data.slug,revision:requestHash,status:data.status,publishedAt,scheduled:data.status==='published'&&publishedAt>now},201);
 }catch(e){return publishFailure(e);}
}
