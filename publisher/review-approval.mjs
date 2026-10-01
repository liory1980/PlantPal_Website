import {createHash} from 'node:crypto';
import path from 'node:path';
import {root,dir,exists,readJson} from './runtime.mjs';

const projectRoot=path.resolve(root,'..');
export const reviewPayloadHash=article=>createHash('sha256').update(JSON.stringify(article)).digest('hex');

export async function requireFirstPostApproval(article){
 const config=await readJson(path.join(projectRoot,'content-ops','sites','plantpal.json'));
 const policy=config.publishing;
 if(!policy.first_post_review_required)return;
 const recordPath=path.resolve(projectRoot,policy.first_post_approval_record);
 if(!recordPath.startsWith(path.join(projectRoot,'content-ops','approvals')+path.sep))throw new Error('First-post approval record must stay in content-ops/approvals.');
 if(!await exists(recordPath))throw new Error('The first PlantPal post is awaiting owner review. No approval record exists.');
 const approval=await readJson(recordPath);
 if(approval.site_id!=='plantpal'||approval.approved_by!=='site-owner'||!approval.approved_at)throw new Error('The first-post approval record is incomplete.');
 if(article.slug===approval.slug){
  if(approval.payload_sha256!==reviewPayloadHash(article))throw new Error('The article changed after owner approval. Review the new version before publishing.');
  return;
 }
 if(!await exists(path.join(dir('state'),approval.slug+'.receipt.json')))throw new Error('The approved first post has not been published yet.');
}
