import {glossary} from '@/lib/glossary';
import {SITE_URL,categories} from '@/lib/config';
import {newLocaleCodes} from '@/lib/multilingual';
import {plants} from '@/lib/plants';
import {articlesForLocale,publishedPosts} from '@/lib/published-locales';

export const dynamic='force-dynamic';
const escape=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
type Entry={path:string;date?:string};
const base=['','/app','/design-your-space','/game','/learn','/glossary','/editorial','/terms','/privacy','/account-deletion',...categories.map(c=>'/'+c.slug)];
const limitedBase=base.filter(path=>!['/editorial','/terms','/account-deletion','/design-your-space','/game'].includes(path));
const glossaryEntries=glossary.map(term=>({path:'/glossary/'+term.slug}));
const plantEntries=[{path:'/plants'},...plants.map(plant=>({path:'/plants/'+plant.slug}))];

export async function GET(){
  try{
    const posts=await publishedPosts();
    const locales=['en','he',...newLocaleCodes] as const;
    const entries:Entry[]=[];
    for(const locale of locales){
      const prefix=locale==='en'?'':`/${locale}`;
      const pages=locale==='he'||locale==='en'?base:limitedBase;
      const articles=await articlesForLocale(locale,posts);
      const paths:Entry[]=[...pages.map(path=>({path})),...plantEntries,...glossaryEntries,...articles.map(article=>({path:'/learn/'+article.slug,date:article.updatedAt}))];
      entries.push(...paths.map(entry=>({...entry,path:prefix+entry.path})));
    }
    const unique=[...new Map(entries.map(entry=>[entry.path,entry])).values()];
    const xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+unique.map(entry=>`<url><loc>${escape(SITE_URL+entry.path)}</loc>${entry.date?`<lastmod>${entry.date}</lastmod>`:''}</url>`).join('')+'</urlset>';
    return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'no-cache'}});
  }catch(error){
    console.error('Sitemap unavailable',error);
    return new Response('Sitemap temporarily unavailable',{status:503,headers:{'Retry-After':'30'}});
  }
}
