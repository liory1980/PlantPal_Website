import {listArticles} from '@/lib/repository';
import {glossary} from '@/lib/glossary';
import {SITE_URL,categories} from '@/lib/config';
export const dynamic='force-dynamic';
const escape=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export async function GET(){try{const all=await listArticles();const base=['','/app','/learn','/glossary','/editorial',...categories.map(c=>'/'+c.slug)];const entries=[...base.map(path=>({path,date:undefined as string|undefined})),...all.map(a=>({path:'/learn/'+a.slug,date:a.updatedAt})),...glossary.map(t=>({path:'/glossary/'+t.slug,date:undefined}))];return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries.map(e=>`<url><loc>${escape(SITE_URL+e.path)}</loc>${e.date?`<lastmod>${e.date}</lastmod>`:''}</url>`).join('')+'</urlset>',{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'no-cache'}});}catch(e){console.error('Sitemap unavailable',e);return new Response('Sitemap temporarily unavailable',{status:503,headers:{'Retry-After':'30'}})}}
