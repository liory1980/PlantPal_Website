import {readdir,rename} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {postSchema} from '../lib/post-schema.mjs';
import {dir,lock,siteUrl,authHeaders,log,readJson,atomicJson,exists} from './runtime.mjs';
const pause=ms=>new Promise(r=>setTimeout(r,ms));
export async function publishQueue({dryRun=false}={}){return lock('publish',async()=>{
 const files=(await readdir(dir('queue'))).filter(n=>n.endsWith('.json')).sort();
 if(!files.length){await log('No articles queued.');return;}
 let failures=0;
 for(const name of files.slice(0,3)){
  try{
   const file=path.join(dir('queue'),name);const article=postSchema.parse(await readJson(file));
   if(article.status!=='published')throw new Error('Queue articles must explicitly have status published. Keep unapproved content in drafts.');
   if(dryRun){await log(`Validated ${article.slug}; dry run, no request sent.`);continue;}
   const endpoint=siteUrl()+'/api/content';let response;
   for(let attempt=0;attempt<3;attempt++){
    try{response=await fetch(endpoint,{method:'POST',headers:authHeaders(),body:JSON.stringify(article),redirect:'error',signal:AbortSignal.timeout(30000)});}catch(e){if(attempt===2)throw new Error('Publishing request failed or timed out. Article kept for an idempotent retry.');await pause(1000*2**attempt);continue;}
    if(response.status!==429&&response.status<500)break;
    if(attempt<2){const retry=Math.min(30,Math.max(1,Number(response.headers.get('retry-after'))||2**attempt));await pause(retry*1000);}
   }
   if(!response)throw new Error('No publishing response.');
   const result=await response.json().catch(()=>({error:'Non-JSON response. Check that the site is public and the URL is correct.'}));
   if(!response.ok)throw new Error(`HTTP ${response.status}: ${result.error||'Publishing failed'}`);
   await atomicJson(path.join(dir('state'),article.slug+'.receipt.json'),result);
   const destination=path.join(dir('sent'),name);if(await exists(destination))throw new Error('Published successfully, but a sent file with this name already exists. Check the saved receipt before moving it.');
   await rename(file,destination);await log(`Accepted ${article.slug}${result.scheduled?' (scheduled)':''}: ${result.url}`);
  }catch(e){failures++;await log(`Failed ${name}: ${e.message}`);}
 }
 if(failures)throw new Error(`${failures} article(s) kept in queue for correction or retry.`);
});}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){publishQueue({dryRun:process.argv.includes('--dry-run')}).catch(e=>{console.error(e.message);process.exitCode=1;});}
