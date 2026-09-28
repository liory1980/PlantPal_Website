import {ArrowUpRight,Camera,ScanSearch,Sparkles,TreePine} from 'lucide-react';
import {DownloadButton} from '@/components/plantpal/shared';
import {JsonLd} from '@/lib/seo';
import {SITE_URL} from '@/lib/config';

type Locale='en'|'he';

const copy={
  en:{
    eyebrow:'NEW · AI GARDEN & ROOM DESIGN',
    title:<><em>AI garden design</em> starts with your space.</>,
    intro:'Take a photo of your garden, balcony, or indoor space. PlantPal considers the setting and your location, suggests plants and trees that could suit it, and shows a visual concept of the finished space.',
    before:'Before',after:'After · AI concept',
    illustration:'Illustrative concept. Plant choice and final appearance depend on your space and local conditions.',
    stepsEyebrow:'FROM SNAPSHOT TO GREEN SPACE',stepsTitle:'A clearer path from empty space to planting plan.',
    steps:[
      {title:'Snap your space',body:'Start with a photo of the room, balcony, or garden you want to transform.'},
      {title:'Understand the setting',body:'AI looks at the visible space and geographic location to help account for the environment.'},
      {title:'Explore suitable plants',body:'Browse plant and tree suggestions for the space, then choose the direction you like.'},
      {title:'See the possibility',body:'Preview a visual simulation of how the space could look once planted.'},
    ],
    detailsTitle:'Ideas that begin with your actual space.',
    details:'A blank corner, a sunny balcony, or a garden waiting for a plan: the photo gives PlantPal a starting point. The recommendations help you think through scale, greenery, and placement before you buy or plant.',
    note:'A simulation is an inspiration image, not a guarantee of growth or plant survival. Check sunlight, climate, mature size, drainage, and local planting guidance before making final choices.',
    ctaTitle:'Ready to imagine a greener space?',ctaBody:'Bring your photo to PlantPal and explore plants, trees, and a visual design concept.',
    breadcrumbs:['Home','The app','Design your space'],
  },
  he:{
    eyebrow:'חדש · עיצוב גינה וחלל בעזרת AI',
    title:<><em>עיצוב גינה בעזרת AI</em> מתחיל בתמונה שלכם.</>,
    intro:'מצלמים את הגינה, המרפסת או החדר. PlantPal בוחנת את החלל ואת המיקום הגאוגרפי, מציעה צמחים ועצים שעשויים להתאים ומציגה הדמיה של המראה האפשרי.',
    before:'לפני',after:'אחרי · הדמיית AI',
    illustration:'הדמיה להמחשה. בחירת הצמחים והתוצאה בפועל תלויות בתנאי החלל והסביבה.',
    stepsEyebrow:'מתמונה לרעיון ירוק',stepsTitle:'ארבעה צעדים מחלל ריק לתכנון צמחייה.',
    steps:[
      {title:'מצלמים את החלל',body:'מתחילים בתמונה של החדר, המרפסת או הגינה שתרצו לשנות.'},
      {title:'מבינים את הסביבה',body:'הבינה המלאכותית בוחנת את החלל הנראה בתמונה ואת המיקום הגאוגרפי.'},
      {title:'מגלים מה יכול להתאים',body:'מקבלים הצעות לצמחים ולעצים שמתאימים לכיוון התכנון שבחרתם.'},
      {title:'רואים את האפשרות',body:'צופים בהדמיה חזותית של החלל לאחר הוספת הצמחייה.'},
    ],
    detailsTitle:'רעיונות שמתחילים בחלל האמיתי שלכם.',
    details:'פינה ריקה, מרפסת מוארת או גינה שמחכה לתכנון — התמונה נותנת ל־PlantPal נקודת התחלה. ההמלצות עוזרות לחשוב על גודל, צמחייה ומיקום לפני שקונים או שותלים.',
    note:'ההדמיה נועדה להשראה ואינה מבטיחה צמיחה או הישרדות של צמח. לפני בחירה סופית כדאי לבדוק שמש, אקלים, גודל בבגרות, ניקוז והנחיות שתילה מקומיות.',
    ctaTitle:'מוכנים לדמיין חלל ירוק יותר?',ctaBody:'הביאו תמונה ל־PlantPal וגלו צמחים, עצים ורעיון עיצובי בהדמיה.',
    breadcrumbs:['דף הבית','האפליקציה','עיצוב החלל'],
  },
} as const;

const icons=[Camera,ScanSearch,TreePine,Sparkles];

export function GardenDesignTeaser({locale}:{locale:Locale}){
  const he=locale==='he';
  return <section className="design-feature-teaser shell" aria-labelledby="design-teaser-title">
    <img src="/images/garden-design-before-after.png" width="1672" height="941" loading="lazy" alt={he?'סלון לפני הוספת צמחים ולאחר הדמיית עיצוב ירוק':'Living room before and after an AI planting concept'}/>
    <div><span className="eyebrow">{he?'חדש ב־PLANTPAL':'NEW IN PLANTPAL'}</span><h2 id="design-teaser-title">{he?'מצלמים חלל. רואים מה הוא יכול להיות.':'Your space, reimagined in green.'}</h2><p>{he?'צלמו חדר, מרפסת או גינה וקבלו הצעות לצמחים ולעצים לצד הדמיה חזותית של האפשרות הירוקה.':'Photograph a room, balcony, or garden. Explore plant and tree suggestions and preview a greener design concept.'}</p><a className="text-link" href={he?'/he/design-your-space':'/design-your-space'}>{he?'מגלים איך זה עובד':'Explore the new feature'} <ArrowUpRight size={18}/></a></div>
  </section>
}

export function GardenDesignFeature({locale}:{locale:Locale}){
  const t=copy[locale];
  const base=locale==='he'?'/he':'';
  return <>
    <div className="shell design-breadcrumbs" aria-label={locale==='he'?'פירורי לחם':'Breadcrumb'}>
      <a href={base||'/'}>{t.breadcrumbs[0]}</a><span aria-hidden="true">/</span>
      <a href={`${base}/app`}>{t.breadcrumbs[1]}</a><span aria-hidden="true">/</span>
      <span aria-current="page">{t.breadcrumbs[2]}</span>
    </div>
    <section className="design-hero shell" aria-labelledby="design-title">
      <div className="design-hero-copy">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 id="design-title">{t.title}</h1>
        <p>{t.intro}</p>
        <DownloadButton/>
      </div>
      <figure className="design-visual">
        <img src="/images/garden-design-before-after.png" width="1672" height="941" alt={locale==='he'?'אותו סלון לפני הוספת צמחים ולאחר הדמיית צמחייה שופעת':'The same living room before planting and as a lush AI garden design concept'} fetchPriority="high"/>
        <span className="design-visual-label design-visual-label-before">{t.before}</span>
        <span className="design-visual-label design-visual-label-after">{t.after}</span>
        <figcaption>{t.illustration}</figcaption>
      </figure>
    </section>
    <section className="design-steps section" aria-labelledby="design-steps-title">
      <div className="shell">
        <span className="eyebrow">{t.stepsEyebrow}</span>
        <h2 id="design-steps-title">{t.stepsTitle}</h2>
        <div className="design-steps-grid">{t.steps.map((step,i)=>{const Icon=icons[i];return <article key={step.title}><div className="design-step-top"><span>{String(i+1).padStart(2,'0')}</span><Icon size={25} aria-hidden="true"/></div><h3>{step.title}</h3><p>{step.body}</p></article>})}</div>
      </div>
    </section>
    <section className="design-details shell section"><div><span className="eyebrow">PLANTPAL</span><h2>{t.detailsTitle}</h2></div><div><p>{t.details}</p><p className="design-note">{t.note}</p></div></section>
    <section className="design-cta shell"><div><span className="eyebrow">PLANTPAL: AI PLANT CARE</span><h2>{t.ctaTitle}</h2><p>{t.ctaBody}</p></div><DownloadButton light/></section>
    <JsonLd data={{'@context':'https://schema.org','@type':'WebPage',name:locale==='he'?'עיצוב גינה וחלל בעזרת AI | PlantPal':'AI Garden & Room Design | PlantPal',description:t.intro,inLanguage:locale==='he'?'he-IL':'en',url:`${SITE_URL}${base}/design-your-space`,isPartOf:{'@type':'WebSite',name:'PlantPal',url:SITE_URL},about:{'@type':'SoftwareApplication',name:'PlantPal: AI Plant Care',applicationCategory:'LifestyleApplication'}}}/>
    <JsonLd data={{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:t.breadcrumbs[0],item:`${SITE_URL}${base||'/'}`},{name:t.breadcrumbs[1],item:`${SITE_URL}${base}/app`},{name:t.breadcrumbs[2],item:`${SITE_URL}${base}/design-your-space`}].map((item,i)=>({'@type':'ListItem',position:i+1,...item}))}}/>
  </>
}
