import {PageHero} from '@/components/plantpal/page-hero';
import {notFound} from 'next/navigation';
import {categories} from '@/lib/config';
import {listArticles} from '@/lib/repository';
import {pageMetadata,Breadcrumbs} from '@/lib/seo';
import {Library} from '@/components/plantpal/library';
import {AppCTA} from '@/components/plantpal/shared';
export const dynamic='force-dynamic';
type Props={params:Promise<{category:string}>;searchParams:Promise<{q?:string;page?:string}>};
export async function generateMetadata({params,searchParams}:Props){const {category}=await params;const c=categories.find(c=>c.slug===category);if(!c)return {};const q=await searchParams;const n=Math.max(1,parseInt(q.page||'1')||1);return {...pageMetadata(c.name+(n>1?` — page ${n}`:''),c.description,`/${c.slug}`+(n>1?`?page=${n}`:'')),...(q.q?{robots:{index:false,follow:true}}:{})}}
export default async function CategoryPage({params,searchParams}:Props){const {category}=await params;const c=categories.find(c=>c.slug===category);if(!c)notFound();const p=await searchParams;return <main id="main"><PageHero eyebrow="לומדים קצת. מגדלים הרבה." title={<>{c.name}<em>.</em></>} description={c.description} image={c.slug==="soil-fertilizer"?"/images/soil-care-hero.webp":c.slug==="plant-guides"||c.slug==="troubleshooting"?"/images/leaf-detail-hero.webp":"/images/greenhouse-hero.webp"} imageAlt={c.slug==="soil-fertilizer"?"שולחן שתילה מואר עם צמח, אדמה ועציצי טרקוטה":"עלים ירוקים באור טבעי"} breadcrumbs={<Breadcrumbs items={[{name:c.name,href:`/${c.slug}`}]}/>} linkLabel={`לכל המדריכים בנושא ${c.name}`}/><section className="shell page-top visual-page-content" id="browse-content"><Library articles={await listArticles()} category={c.slug} q={typeof p.q==='string'?p.q.slice(0,120):''} page={parseInt(p.page||'1')||1}/></section><AppCTA/></main>}
