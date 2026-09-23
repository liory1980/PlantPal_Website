import {env} from 'cloudflare:workers';
import {articles,type Article} from './content';
import {plantArticles} from './plant-content';
import {extraArticles} from './extra-content';
import {localizeArticle} from './hebrew-content';
export const englishSeedArticles=[...articles,...plantArticles,...extraArticles];
export const seedArticles=englishSeedArticles.map(localizeArticle);
export function database(){if(!env.DB)throw new Error('Content storage is unavailable');return env.DB;}
let schemaReady:Promise<void>|undefined;
export function ensureContentSchema(){
 if(!schemaReady){
  const db=database();
  schemaReady=(async()=>{
   await db.prepare("CREATE TABLE IF NOT EXISTS posts (slug TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, category TEXT NOT NULL, status TEXT NOT NULL, published_at TEXT NOT NULL, updated_at TEXT NOT NULL, content_hash TEXT NOT NULL, revision TEXT NOT NULL, payload TEXT NOT NULL)").run();
   await db.prepare('CREATE INDEX IF NOT EXISTS idx_posts_status_published ON posts (status, published_at)').run();
   await db.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_posts_content_hash ON posts (content_hash)').run();
  })().catch(error=>{schemaReady=undefined;throw error});
 }
 return schemaReady;
}
export async function listArticles():Promise<Article[]>{
 try{
  await ensureContentSchema();
  const {results}=await database().prepare('SELECT payload FROM posts WHERE status = ? AND published_at <= ? ORDER BY published_at DESC').bind('published',new Date().toISOString()).all<{payload:string}>();
  return [...results.map(r=>localizeArticle(JSON.parse(r.payload) as Article)),...seedArticles].sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));
 }catch(error){console.error('Published content storage is unavailable; using the bundled library.',error);return seedArticles;}
}
export async function findArticle(slug:string){
 const seed=seedArticles.find(a=>a.slug===slug);if(seed)return seed;
 try{await ensureContentSchema();const row=await database().prepare('SELECT payload FROM posts WHERE slug = ? AND status = ? AND published_at <= ?').bind(slug,'published',new Date().toISOString()).first<{payload:string}>();return row?localizeArticle(JSON.parse(row.payload) as Article):undefined;}
 catch(error){console.error('Published content lookup is unavailable.',error);return undefined;}
}
