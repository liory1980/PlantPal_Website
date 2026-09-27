'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Leaf, Pause, Play } from 'lucide-react';
import { DownloadButton } from './shared';

export function ImmersiveHero() {
  const [paused, setPaused] = useState(false);
  return <section className={`immersive-hero${paused ? ' motion-paused' : ''}`} aria-labelledby="hero-title">
    <img className="immersive-hero-image" src="/images/greenhouse-hero.webp" alt="קרני שמש בין עלים ירוקים ושופעים" width="1672" height="941" fetchPriority="high" />
    <div className="hero-shade" />
    <div className="shell immersive-hero-content">
      <div className="immersive-hero-copy">
        <span className="eyebrow"><Leaf size={16} /> טיפול בצמחים, בלי לנחש</span>
        <h1 id="hero-title">לכל צמח יש<br />טיפול <em>שמתאים לו.</em></h1>
        <p>PlantPal עוזרת לכם להבין איך לטפל בכל צמח ולבנות שגרה שמתאימה לו.</p>
        <DownloadButton />
        <a className="hero-learn-link" href="/learn">למדריכי הטיפול <ArrowUpRight size={18} /></a>
      </div>
      <div className="hero-bottom-row">
        <span>יותר ידע על הצמחים. יותר ביטחון בטיפול.</span>
        <a className="hero-play-link" href="#plant-playground"><span>יוצאים להרפתקה קטנה.<strong>בואו לשחק עם PlantPal</strong></span><ArrowDown size={21} /></a>
        <button className="hero-motion-button" onClick={() => setPaused(!paused)} aria-label={paused ? 'הפעלת תנועת הרקע' : 'עצירת תנועת הרקע'} aria-pressed={paused}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
      </div>
    </div>
  </section>;
}
