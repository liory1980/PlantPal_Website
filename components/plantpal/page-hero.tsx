'use client';

import { useState, type ReactNode } from 'react';
import { ArrowDown, Pause, Play } from 'lucide-react';

export function PageHero({ eyebrow, title, description, image = '/images/greenhouse-hero.webp', imageAlt, breadcrumbs, children, side, target = 'browse-content', linkLabel = 'Explore below' }: {
  eyebrow: string; title: ReactNode; description: string; image?: string; imageAlt: string; breadcrumbs?: ReactNode; children?: ReactNode; side?: ReactNode; target?: string; linkLabel?: string;
}) {
  const [paused, setPaused] = useState(false);
  return <section className={`immersive-hero page-visual-hero${paused ? ' motion-paused' : ''}${side ? ' with-product' : ''}`}>
    <img className="immersive-hero-image" src={image} alt={imageAlt} width="1672" height="941" fetchPriority="high" />
    <div className="hero-shade" />
    <div className="shell page-visual-inner">
      {breadcrumbs && <div className="page-hero-breadcrumbs">{breadcrumbs}</div>}
      <div className="page-visual-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p>{children}</div>
      {side && <div className="page-visual-product">{side}</div>}
      <div className="hero-bottom-row"><a className="page-hero-explore" href={`#${target}`}>{linkLabel === 'Explore below' ? 'ממשיכים למטה' : linkLabel}<ArrowDown size={19} /></a><button className="hero-motion-button" onClick={() => setPaused(!paused)} aria-label={paused ? 'הפעלת תנועת הרקע' : 'עצירת תנועת הרקע'} aria-pressed={paused}>{paused ? <Play size={16} /> : <Pause size={16} />}</button></div>
    </div>
  </section>;
}
