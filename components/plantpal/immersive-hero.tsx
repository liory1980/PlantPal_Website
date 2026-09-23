'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Leaf, Pause, Play } from 'lucide-react';
import { DownloadButton } from './shared';

export function ImmersiveHero() {
  const [paused, setPaused] = useState(false);
  return <section className={`immersive-hero${paused ? ' motion-paused' : ''}`} aria-labelledby="hero-title">
    <img className="immersive-hero-image" src="/images/greenhouse-hero.webp" alt="Sunlight streaming through lush, green monstera leaves" width="1672" height="941" fetchPriority="high" />
    <div className="hero-shade" />
    <div className="shell immersive-hero-content">
      <div className="immersive-hero-copy">
        <span className="eyebrow"><Leaf size={16} /> YOUR LITTLE CORNER OF GREEN</span>
        <h1 id="hero-title">A little care.<br />A lot more <em>life.</em></h1>
        <p>Meet your plants. Understand their needs.<br className="desktop-break" /> Grow something wonderful with PlantPal.</p>
        <DownloadButton />
        <a className="hero-learn-link" href="/learn">Explore plant care <ArrowUpRight size={18} /></a>
      </div>
      <div className="hero-bottom-row">
        <span>HEALTHIER PLANTS. HAPPIER DAYS.</span>
        <a className="hero-play-link" href="#plant-playground"><span>A little play goes a long way.<strong>Meet your PlantPal</strong></span><ArrowDown size={21} /></a>
        <button className="hero-motion-button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Resume background motion' : 'Pause background motion'} aria-pressed={paused}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
      </div>
    </div>
  </section>;
}
