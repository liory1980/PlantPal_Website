'use client';

import {useMemo, useState} from 'react';
import {ArrowUpRight,Search,X} from 'lucide-react';
import type {PlantUi} from '@/lib/plants-l10n';

export type CatalogPlant={slug:string;name:string;scientific:string;intro:string;light:string;water:string;image:string;group:'easy'|'statement'|'trailing';search:string;order:number};
const filterKeys=['all','easy','statement','trailing'] as const;

export function PlantsCatalog({ui,prefix,cards}:{ui:PlantUi;prefix:string;cards:CatalogPlant[]}){
  const [query,setQuery]=useState('');
  const [filter,setFilter]=useState<(typeof filterKeys)[number]>('all');
  const visible=useMemo(()=>cards.filter(plant=>{
    if(filter!=='all'&&plant.group!==filter)return false;
    const needle=query.trim().toLocaleLowerCase();
    return !needle||plant.search.includes(needle);
  }),[cards,query,filter]);

  return <section id="browse-plants" className="plants-browse shell" aria-labelledby="plants-browse-title">
    <div className="plants-section-heading"><div><span className="eyebrow">{ui.collectionEyebrow}</span><h2 id="plants-browse-title">{ui.collectionTitle}</h2><p>{ui.collectionText}</p></div><span className="plants-count">{String(cards.length).padStart(2,'0')} <small>{ui.countLabel}</small></span></div>
    <div className="plants-tools"><div className="plants-search"><Search size={20} aria-hidden="true"/><label className="sr-only" htmlFor="plants-query">{ui.searchLabel}</label><input id="plants-query" type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder={ui.searchPlaceholder} autoComplete="off"/>{query&&<button type="button" aria-label={ui.clearSearch} onClick={()=>setQuery('')}><X size={17}/></button>}</div><div className="plants-filters" role="group" aria-label={ui.plantsLabel}>{filterKeys.map(value=><button key={value} type="button" className={filter===value?'active':''} aria-pressed={filter===value} onClick={()=>setFilter(value)}>{ui.filters[value]}</button>)}</div></div>
    <p className="plants-results" aria-live="polite">{visible.length===1?ui.resultsOne:ui.results.replace('{count}',String(visible.length))}</p>
    {visible.length?<div className="plants-grid">{visible.map((plant,index)=><PlantCard key={plant.slug} plant={plant} ui={ui} prefix={prefix} priority={index<3&&!query&&filter==='all'}/>)}</div>:<div className="plants-empty"><Search size={27}/><h3>{ui.emptyTitle}</h3><p>{ui.emptyText}</p><button type="button" className="text-link" onClick={()=>{setQuery('');setFilter('all')}}>{ui.reset} <ArrowUpRight size={16}/></button></div>}
  </section>;
}

function PlantCard({plant,ui,prefix,priority}:{plant:CatalogPlant;ui:PlantUi;prefix:string;priority:boolean}){
  return <a className="plant-card" href={`${prefix}/plants/${plant.slug}`} aria-label={ui.cardLink.replace('{name}',plant.name)}>
    <div className="plant-card-image"><img src={plant.image} alt={ui.cardAlt.replace('{name}',plant.name).replace('{scientific}',plant.scientific)} width="760" height="950" loading={priority?'eager':'lazy'} decoding="async"/><span className="plant-card-index">{String(plant.order).padStart(2,'0')}</span></div>
    <div className="plant-card-content"><span className="plant-card-scientific" lang="la">{plant.scientific}</span><div className="plant-card-title"><h3>{plant.name}</h3><span><ArrowUpRight size={19}/></span></div><p>{plant.intro}</p><div className="plant-card-tags"><span>{plant.light}</span><span>{plant.water}</span></div></div>
  </a>;
}
