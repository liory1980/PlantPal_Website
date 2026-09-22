import {Library} from '@/components/plantpal/library';
import {AppCTA} from '@/components/plantpal/shared';
import {listArticles} from '@/lib/repository';
import {pageMetadata,Breadcrumbs} from '@/lib/seo';
export const dynamic='force-dynamic';
type Props={searchParams:Promise<{q?:string;page?:string}>};
export async function generateMetadata({searchParams}:Props){const p=await searchParams;const n=Math.max(1,parseInt(p.page||'1')||1);return {...pageMetadata(n>1?`Plant care library — page ${n}`:'Plant care library: guides, tips & troubleshooting','Explore original guides to indoor plant care, houseplant problems, potting mixes, fertilizer, and everyday growing habits.','/learn'+(n>1?`?page=${n}`:'')),...(p.q?{robots:{index:false,follow:true}}:{})}}
export default async function Learn({searchParams}:Props){const p=await searchParams;const all=await listArticles();return <main id="main"><section className="shell page-top"><Breadcrumbs items={[{name:'Learn & grow',href:'/learn'}]}/><span className="eyebrow">THE PLANTPAL LIBRARY</span><h1>A little knowledge.<br/><em>A happier indoor jungle.</em></h1><p>Practical answers for real plant parents. Find your next good growing habit.</p><Library articles={all} q={typeof p.q==='string'?p.q.slice(0,120):''} page={parseInt(p.page||'1')||1}/></section><AppCTA/></main>}
