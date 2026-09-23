import {env} from 'cloudflare:workers';
import {articles,type Article} from './content';
import {plantArticles} from './plant-content';
import {extraArticles} from './extra-content';
import {localizeArticle} from './hebrew-content';
export const englishSeedArticles=[...articles,...plantArticles,...extraArticles];
export const seedArticles=englishSeedArticles.map(localizeArticle);
export function database(){if(!env.DB)throw new Error('Content storage is unavailable');return env.DB;}
export async function listArticles():Promise<Article[]>{
 const {results}=await database().prepare('SELECT payload FROM posts WHERE status = ? AND published_at <= ? ORDER BY published_at DESC').bind('published',new Date().toISOString()).all<{payload:string}>();
 return [...results.map(r=>localizeArticle(JSON.parse(r.payload) as Article)),...seedArticles].sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));
}
export async function findArticle(slug:string){
 const seed=seedArticles.find(a=>a.slug===slug);if(seed)return seed;
 const row=await database().prepare('SELECT payload FROM posts WHERE slug = ? AND status = ? AND published_at <= ?').bind(slug,'published',new Date().toISOString()).first<{payload:string}>();
 return row?localizeArticle(JSON.parse(row.payload) as Article):undefined;
}
