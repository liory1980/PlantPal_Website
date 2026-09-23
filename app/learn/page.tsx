import {PageHero} from '@/components/plantpal/page-hero';
import {Library} from '@/components/plantpal/library';
import {AppCTA} from '@/components/plantpal/shared';
import {listArticles} from '@/lib/repository';
import {pageMetadata,Breadcrumbs} from '@/lib/seo';
export const dynamic='force-dynamic';
type Props={searchParams:Promise<{q?:string;page?:string}>};
export async function generateMetadata({searchParams}:Props){const p=await searchParams;const n=Math.max(1,parseInt(p.page||'1')||1);return {...pageMetadata(n>1?`ספריית הטיפול בצמחים — עמוד ${n}`:'מדריכים וטיפים לטיפול בצמחי בית','מדריכים מקוריים להשקיה, אור, אדמה, דישון, זיהוי בעיות והרגלי גידול טובים.','/learn'+(n>1?`?page=${n}`:'')),...(p.q?{robots:{index:false,follow:true}}:{})}}
export default async function Learn({searchParams}:Props){const p=await searchParams;const all=await listArticles();return <main id="main"><PageHero eyebrow="הספרייה של PLANTPAL" title={<>קצת יותר ידע.<br/><em>הרבה יותר ירוק בבית.</em></>} description="תשובות מעשיות לאנשים שמגדלים צמחים באמת. מכאן מתחיל ההרגל הטוב הבא שלכם." imageAlt="אור בוקר בחממה ביתית ירוקה" breadcrumbs={<Breadcrumbs items={[{name:"לומדים ומגדלים",href:"/learn"}]}/>} linkLabel="למציאת המדריך הבא"/><section className="shell page-top visual-page-content" id="browse-content"><Library articles={all} q={typeof p.q==='string'?p.q.slice(0,120):''} page={parseInt(p.page||'1')||1}/></section><AppCTA/></main>}
