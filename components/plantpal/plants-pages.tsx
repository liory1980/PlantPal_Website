import {ArrowDown,ArrowLeft,ArrowRight,ArrowUpRight,Droplets,Leaf,Lightbulb,Sun} from 'lucide-react';
import {JsonLd} from '@/lib/seo';
import {SITE_URL} from '@/lib/config';
import {plants,type Plant} from '@/lib/plants';
import {localizedPlant,plantAlternates,plantLang,plantPrefix,plantSearchText,plantUi,template,type PlantLocale} from '@/lib/plants-l10n';
import {PlantsCatalog} from './plants-catalog';

export function plantsMetadata(locale:PlantLocale){
  const ui=plantUi[locale];
  const url=SITE_URL+plantPrefix(locale)+'/plants';
  const title=ui.metaIndexTitle;
  const description=ui.metaIndexDescription;
  return {title,description,alternates:{canonical:url,languages:plantAlternates('/plants')},openGraph:{title,description,url,locale:plantLang(locale).replace('-','_'),type:'website' as const,images:[{url:SITE_URL+'/images/plants/hero.webp',width:1680,height:943,alt:ui.imageAlt}]},twitter:{card:'summary_large_image' as const,title,description,images:[SITE_URL+'/images/plants/hero.webp']}};
}

export function plantMetadata(plant:Plant,locale:PlantLocale){
  const ui=plantUi[locale],local=localizedPlant(plant,locale);
  const title=template(ui.metaDetail,{name:local.name});
  const description=`${local.intro} ${ui.light}: ${local.light}. ${ui.water}: ${local.water}.`;
  const url=SITE_URL+plantPrefix(locale)+'/plants/'+plant.slug;
  return {title,description,alternates:{canonical:url,languages:plantAlternates('/plants/'+plant.slug)},openGraph:{title,description,url,locale:plantLang(locale).replace('-','_'),type:'article' as const,images:[{url:SITE_URL+plant.image,width:760,height:950,alt:plant.scientific}]},twitter:{card:'summary_large_image' as const,title,description,images:[SITE_URL+plant.image]}};
}

export function PlantsIndex({locale}:{locale:PlantLocale}){
  const ui=plantUi[locale];
  const base=SITE_URL+plantPrefix(locale);
  const cards=plants.map((plant,index)=>{const local=localizedPlant(plant,locale);return {slug:plant.slug,name:local.name,scientific:plant.scientific,intro:local.intro,light:local.light,water:local.water,image:plant.image,group:plant.group,search:plantSearchText(plant,locale),order:index+1}});
  return <>
    <section className="plants-hero"><img className="plants-hero-photo" src="/images/plants/hero.webp" alt={ui.imageAlt} width="1680" height="943" fetchPriority="high"/><div className="plants-hero-shade"/><div className="shell plants-hero-inner"><nav className="plants-crumbs" aria-label="Breadcrumb"><a href={plantPrefix(locale)||'/'}>{ui.home}</a><span>/</span><span>{ui.plantsLabel}</span></nav><div className="plants-hero-copy"><span className="eyebrow"><Leaf size={16}/>{ui.heroEyebrow}</span><h1>{ui.heroLine}<br/><em>{ui.heroAccent}</em></h1><p>{ui.heroText}</p><a className="plants-hero-link" href="#browse-plants">{ui.heroLink} <ArrowDown size={18}/></a></div><div className="plants-hero-bottom"><span>{ui.heroFoot}</span><span>PLANTPAL / 01—10</span></div></div></section>
    <PlantsCatalog ui={ui} prefix={plantPrefix(locale)} cards={cards}/>
    <section className="plants-guide-banner shell"><div><span className="eyebrow">{ui.bannerEyebrow}</span><h2>{ui.bannerTitle}</h2><p>{ui.bannerText}</p></div><a className="button" href={plantPrefix(locale)+'/learn/houseplant-care-for-beginners'}>{ui.beginnerGuide} <ArrowUpRight size={17}/></a></section>
    <JsonLd data={{'@context':'https://schema.org','@type':'CollectionPage',name:ui.metaIndexTitle,description:ui.metaIndexDescription,url:base+'/plants',inLanguage:plantLang(locale),image:SITE_URL+'/images/plants/hero.webp',mainEntity:{'@type':'ItemList',numberOfItems:plants.length,itemListElement:plants.map((plant,index)=>({'@type':'ListItem',position:index+1,name:localizedPlant(plant,locale).name,url:base+'/plants/'+plant.slug}))}}}/>
    <JsonLd data={breadcrumbData([{name:ui.home,url:base||SITE_URL},{name:ui.plantsLabel,url:base+'/plants'}])}/>
  </>;
}

function breadcrumbData(items:{name:string;url:string}[]){return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:item.url}))};}

export function PlantDetail({plant,locale}:{plant:Plant;locale:PlantLocale}){
  const ui=plantUi[locale],local=localizedPlant(plant,locale);
  const prefix=plantPrefix(locale),base=SITE_URL+prefix;
  const related=plants.filter(other=>other.slug!==plant.slug&&other.group===plant.group).slice(0,2);
  if(related.length<2)related.push(...plants.filter(other=>other.slug!==plant.slug&&!related.includes(other)).slice(0,2-related.length));
  return <>
    <div className="plant-detail shell"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href={prefix||'/'}>{ui.home}</a><span><span aria-hidden="true">/</span><a href={`${prefix}/plants`}>{ui.plantsLabel}</a></span><span><span aria-hidden="true">/</span><span aria-current="page">{local.name}</span></span></nav>
      <div className="plant-detail-lead"><div className="plant-detail-photo"><img src={plant.image} alt={template(ui.detailAlt,{name:local.name,scientific:plant.scientific})} width="760" height="950" fetchPriority="high"/></div><div className="plant-detail-intro"><span className="eyebrow"><Leaf size={16}/>{ui.detailEyebrow}</span><h1>{local.name}<span>.</span></h1><p className="plant-latin" lang="la">{plant.scientific}</p><p className="plant-detail-summary">{local.intro}</p><div className="plant-quick-facts"><div><Sun size={21}/><span>{ui.light}</span><strong>{local.light}</strong></div><div><Droplets size={21}/><span>{ui.water}</span><strong>{local.water}</strong></div></div><a className="plants-back-link" href={`${prefix}/plants`}>{locale==='he'||locale==='ar'?<ArrowRight size={17}/>:<ArrowLeft size={17}/>} {ui.back}</a></div></div>
      <div className="plant-detail-body"><div className="plant-detail-main"><span className="eyebrow">{ui.careEyebrow}</span><h2>{ui.careTitle}</h2><div className="plant-care-block"><span className="plant-care-number">01</span><div><h3><Sun size={22}/>{ui.lightHeading}</h3><p>{local.lightCare}</p></div></div><div className="plant-care-block"><span className="plant-care-number">02</span><div><h3><Droplets size={22}/>{ui.waterHeading}</h3><p>{local.waterCare}</p></div></div><div className="plant-care-block"><span className="plant-care-number">03</span><div><h3><Lightbulb size={22}/>{ui.tipHeading}</h3><p>{local.tip}</p></div></div>{plant.guide&&<a className="plant-guide-link" href={`${prefix}/learn/${plant.guide}`}>{ui.fullGuide} <ArrowUpRight size={18}/></a>}<p className="plant-source">{ui.furtherReading} <a href={plant.source} target="_blank" rel="noopener noreferrer">{ui.sourceLabel} <ArrowUpRight size={13}/></a></p></div><aside className="plant-detail-aside"><div><span className="eyebrow">{ui.asideEyebrow}</span><p>{ui.asideText}</p></div></aside></div>
      <section className="plant-related"><span className="eyebrow">{ui.relatedEyebrow}</span><h2>{ui.relatedTitle}</h2><div>{related.map(other=><a href={`${prefix}/plants/${other.slug}`} key={other.slug}><img src={other.image} alt={localizedPlant(other,locale).name} width="760" height="950" loading="lazy"/><span><strong>{localizedPlant(other,locale).name}</strong><small lang="la">{other.scientific}</small></span><ArrowUpRight size={20}/></a>)}</div></section>
    </div>
    <JsonLd data={{'@context':'https://schema.org','@type':'WebPage',name:template(ui.metaDetail,{name:local.name}),url:base+'/plants/'+plant.slug,inLanguage:plantLang(locale),description:local.intro,image:SITE_URL+plant.image,about:{'@type':'Thing',name:plant.scientific,alternateName:[plant.name,plant.nameHe]}}}/>
    <JsonLd data={breadcrumbData([{name:ui.home,url:base||SITE_URL},{name:ui.plantsLabel,url:base+'/plants'},{name:local.name,url:base+'/plants/'+plant.slug}])}/>
  </>;
}
