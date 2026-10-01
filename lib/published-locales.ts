import {database,ensureContentSchema,englishSeedArticles} from './repository';
import {localizeFor} from './localized';
import {localizeArticle} from './hebrew-content';
import type {Article,ContentLocale} from './content';
import type {NewLocale} from './multilingual';

function copyFor(article:Article,locale:ContentLocale):Article|undefined{
  if(article.locale===locale)return article;
  const copy=article.translations?.[locale];
  return copy?{...article,...copy,locale}:undefined;
}

export async function publishedPosts():Promise<Article[]>{
  try{
    await ensureContentSchema();
    const {results}=await database().prepare('SELECT payload FROM posts WHERE status = ? AND published_at <= ? ORDER BY published_at DESC').bind('published',new Date().toISOString()).all<{payload:string}>();
    return results.map(row=>JSON.parse(row.payload) as Article);
  }catch(error){console.error('Published content storage is unavailable.',error);return []}
}

export async function articlesForLocale(locale:ContentLocale,published?:Article[]):Promise<Article[]>{
  const seeds=locale==='en'?englishSeedArticles:locale==='he'?englishSeedArticles.map(localizeArticle):englishSeedArticles.map(article=>localizeFor(article,locale as NewLocale));
  const posts=(published??await publishedPosts()).map(article=>copyFor(article,locale)).filter((article):article is Article=>Boolean(article));
  return [...posts,...seeds].sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));
}

export async function articleForLocale(slug:string,locale:ContentLocale):Promise<Article|undefined>{
  const seed=englishSeedArticles.find(article=>article.slug===slug);
  if(seed)return locale==='en'?seed:locale==='he'?localizeArticle(seed):localizeFor(seed,locale as NewLocale);
  const post=(await publishedPosts()).find(article=>article.slug===slug);
  return post&&copyFor(post,locale);
}
