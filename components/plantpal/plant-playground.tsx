'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Gamepad2, Heart, Pause, Play, RotateCcw, Sun, Timer, Volume2, VolumeX } from 'lucide-react';
import type { GameController, GameSnapshot } from './plant-game-engine';
import { LEVELS } from '@/lib/plant-game-levels';
import { GardenAudio } from '@/lib/plant-game-audio';

type Phase = 'loading' | 'ready' | 'playing' | 'paused' | 'complete' | 'won' | 'lost' | 'error';
const keyMap: Record<string, string> = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down' };
const directionLabels: Record<string, string> = {up:'למעלה',down:'למטה',left:'שמאלה',right:'ימינה'};
const initialSnapshot: GameSnapshot = { level: 0, score: 0, total: 5, lives: 3, seconds: 90, status: 'playing' };

export function PlantPlayground() {
  const hostRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<GameController | null>(null);
  const audioRef = useRef<GardenAudio | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');
  const phaseRef = useRef<Phase>('loading');
  const [game, setGame] = useState(initialSnapshot);
  const [progress, setProgress] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const updatePhase = (next: Phase) => { phaseRef.current = next; setPhase(next); };

  useEffect(() => {
    const surface = surfaceRef.current!;
    const host = hostRef.current!;
    let cancelled = false;
    let startedLoading = false;
    audioRef.current = new GardenAudio();
    audioRef.current.setMuted(mutedRef.current);
    const load = async () => {
      if (startedLoading) return;
      startedLoading = true;
      try {
        const { createPlantGame } = await import('./plant-game-engine');
        if (cancelled) return;
        controllerRef.current = createPlantGame(host, {
          onReady: () => { if (!cancelled) updatePhase('ready'); },
          onProgress: value => { if (!cancelled) setProgress(value); },
          onState: state => {
            if (cancelled) return;
            setGame(state);
            if (state.status !== 'playing') updatePhase(state.status);
          },
          onEvent: event => { if (!cancelled) audioRef.current?.play(event); },
          onError: () => { if (!cancelled) { updatePhase('error'); controllerRef.current?.setActive(false); } },
        });
      } catch { if (!cancelled) updatePhase('error'); }
    };
    const pause = () => { controllerRef.current?.clearKeys(); if (phaseRef.current === 'playing') { controllerRef.current?.setActive(false); updatePhase('paused'); } };
    const visibility = new IntersectionObserver(entries => { if (entries[0].isIntersecting) void load(); else pause(); }, { threshold: 0.08 });
    visibility.observe(surface);
    const hidden = () => { if (document.hidden) pause(); };
    window.addEventListener('blur', pause);
    document.addEventListener('visibilitychange', hidden);
    return () => { cancelled = true; visibility.disconnect(); window.removeEventListener('blur', pause); document.removeEventListener('visibilitychange', hidden); controllerRef.current?.dispose(); controllerRef.current = null; audioRef.current?.dispose(); audioRef.current = null; };
  }, [attempt]);

  function play() { audioRef.current?.unlock(); updatePhase('playing'); controllerRef.current?.setActive(true); surfaceRef.current?.focus({ preventScroll: true }); }
  function pause() { controllerRef.current?.setActive(false); updatePhase('paused'); }
  function reset(fromBeginning = false) { controllerRef.current?.reset(fromBeginning); play(); }
  function nextStage() { controllerRef.current?.nextStage(); updatePhase('ready'); }
  function toggleSound() { const next = !muted; mutedRef.current = next; setMuted(next); audioRef.current?.setMuted(next); if (!next) audioRef.current?.unlock(); }
  const level = LEVELS[game.level];
  const locked = phase === 'loading' || phase === 'error';

  return <section className="playground-section" id="plant-playground" aria-labelledby="playground-title">
    <div className="shell">
      <div className="playground-heading"><div><span className="eyebrow"><Gamepad2 size={17} /> הרפתקה קטנה. הרבה שמש.</span><h2 id="playground-title">צמח קטן. <em>הרפתקה גדולה.</em></h2></div><p>שלושה גנים, שמשות לאסוף וקוצים לעבור. עד כמה רחוק יגיע ה־PlantPal שלכם?</p></div>
      <ol className="game-stage-track" aria-label="שלבי המשחק">{LEVELS.map((l, i) => <li key={l.name} className={i < game.level || phase === 'won' ? 'stage-done' : i === game.level ? 'stage-current' : ''} aria-current={i === game.level ? 'step' : undefined}><span>{i < game.level || phase === 'won' ? <Check size={14} /> : `0${i + 1}`}</span><div>{l.name}<small>{i === 0 ? 'לומדים לזוז' : i === 1 ? 'מתחמקים וקופצים' : 'נגד השעון'}</small></div></li>)}</ol>
      <div ref={surfaceRef} className={`playground-surface garden-stage-${game.level + 1}`} tabIndex={0} role="region" aria-label="משחק הגינה של PlantPal" aria-describedby="game-instructions" onKeyDown={event => {
        if (event.target !== surfaceRef.current) return;
        if (event.code === 'Escape' && phaseRef.current === 'playing') { event.preventDefault(); pause(); return; }
        if (phaseRef.current !== 'playing') return;
        if (keyMap[event.code]) { event.preventDefault(); controllerRef.current?.setDirection(keyMap[event.code], true); }
        if (event.code === 'Space') { event.preventDefault(); if (!event.repeat) controllerRef.current?.jump(); }
      }} onKeyUp={event => { if (keyMap[event.code]) controllerRef.current?.setDirection(keyMap[event.code], false); }} onBlur={event => { controllerRef.current?.clearKeys(); if (!event.currentTarget.contains(event.relatedTarget) && phaseRef.current === 'playing') pause(); }} onPointerDown={event => { if (event.target instanceof HTMLCanvasElement) surfaceRef.current?.focus({ preventScroll: true }); }}>
        <div ref={hostRef} className="playground-canvas" />
        <div className="game-topbar"><span className="garden-label"><Sun size={16} /> שלב {game.level + 1} מתוך 3</span><div className="game-tools"><span className="game-score" aria-label={`${game.score} מתוך ${game.total} שמשות נאספו`}><Sun size={18} /> {game.score}<span>/ {game.total}</span></span><span className={`game-timer${game.seconds <= 15 ? ' time-low' : ''}`} aria-label={`${game.seconds} שניות נותרו`}><Timer size={16} />{game.seconds}</span><span className="game-lives" aria-label={`${game.lives} פסילות נותרו`}>{[0,1,2].map(i => <Heart key={i} size={15} fill={i < game.lives ? 'currentColor' : 'none'} opacity={i < game.lives ? 1 : .3} />)}</span><button onClick={toggleSound} aria-label={muted ? 'הפעלת צליל' : 'השתקת צליל'} aria-pressed={muted} title={muted ? 'הצליל כבוי' : 'הצליל פועל'}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button><button onClick={() => reset()} disabled={locked} aria-label="התחלת השלב מחדש" title="התחלת השלב מחדש"><RotateCcw size={18} /></button>{phase === 'playing' && <button onClick={pause} aria-label="השהיית המשחק" title="השהיית המשחק"><Pause size={18} /></button>}</div></div>
        {phase === 'loading' && <div className="game-overlay"><div className="game-message"><img src="/images/app-icon.webp" width="64" height="64" alt="" /><h3>הגינה הקטנה צומחת.</h3><p role="status">טוענים את PlantPal{progress > 0 ? ` · ${progress}%` : '…'}</p></div></div>}
        {(phase === 'ready' || phase === 'paused') && <div className="game-start"><span className="game-level-tip">{phase === 'ready' ? level.description : 'אפשר לנשום. השעון עצר.'}</span><button className="button" onClick={play}><Play size={16} fill="currentColor" />{phase === 'ready' ? `מתחילים שלב ${game.level + 1}` : 'ממשיכים לשחק'}</button><span>{phase === 'paused' ? game.seconds : level.seconds} שניות · {game.total} שמשות · {game.lives} פסילות</span></div>}
        {(phase === 'complete' || phase === 'won' || phase === 'lost') && <div className="game-overlay game-win"><div className="game-message"><span className="game-win-icon">{phase === 'lost' ? <RotateCcw size={26} /> : <Check size={26} />}</span><span className="eyebrow">{phase === 'won' ? 'כל שלושת הגנים הושלמו' : `שלב ${game.level + 1} · ${level.name}`}</span><h3>{phase === 'complete' ? 'עוד קצת שמש.' : phase === 'won' ? 'יש לכם את זה.' : game.lives === 0 ? 'זהירות מהקוצים.' : 'השמש שקעה.'}</h3><p>{phase === 'complete' ? `אספתם ${game.total} שמשות ונשארו ${game.seconds} שניות. גינה חדשה מחכה לכם.` : phase === 'won' ? 'שמונה־עשרה שמשות. שלושה גנים. PlantPal אחד מאושר מאוד.' : 'מנסים שוב, קופצים מעל הקוצים הכתומים ונוחתים על כל אבן לפני שהזמן נגמר.'}</p>{phase === 'complete' ? <button className="button" onClick={nextStage}>לשלב הבא <ArrowRight size={17} /></button> : <button className="button" onClick={() => reset(phase === 'won')}><RotateCcw size={16} />{phase === 'won' ? 'לשחק שוב מההתחלה' : 'לנסות שוב את השלב'}</button>}</div></div>}
        {phase === 'error' && <div className="game-overlay"><div className="game-message"><h3>הגינה לא נפתחה.</h3><p>נסו שוב או הפעילו גרפיקה תלת־ממדית בדפדפן.</p><button className="button" onClick={() => { setProgress(0); setGame(initialSnapshot); updatePhase('loading'); setAttempt(value => value + 1); }}>ניסיון נוסף</button><a href="/learn">בינתיים אפשר לקרוא מדריך</a></div></div>}
        <div className="game-touch-controls" aria-label="פקדי מגע למשחק"><div className="game-dpad">{([['up', ArrowUp], ['left', ArrowLeft], ['down', ArrowDown], ['right', ArrowRight]] as const).map(([key, Icon]) => <button key={key} className={`direction-${key}`} aria-label={`תנועה ${directionLabels[key]}`} disabled={phase !== 'playing'} onPointerDown={event => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); controllerRef.current?.setDirection(key, true); }} onPointerUp={() => controllerRef.current?.setDirection(key, false)} onPointerCancel={() => controllerRef.current?.setDirection(key, false)} onLostPointerCapture={() => controllerRef.current?.setDirection(key, false)}><Icon size={20} /></button>)}</div><button className="game-jump" disabled={phase !== 'playing'} onPointerDown={event => { event.preventDefault(); controllerRef.current?.jump(); }} onClick={event => { if (event.detail === 0) controllerRef.current?.jump(); }}><ArrowUp size={19} /> קפיצה</button></div>
      </div>
      <div className="game-instructions" id="game-instructions"><span><kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd> או <strong>WASD</strong> לתנועה</span><span><kbd>רווח</kbd> לקפיצה</span><span><kbd>Esc</kbd> להשהיה</span><p>אוספים את כל השמשות וקופצים מעל הקוצים הכתומים. אפשר לשחק גם במגע.</p></div>
      <span className="sr-only" role="status" aria-live="polite">שלב {game.level + 1}. נאספו {game.score} מתוך {game.total} שמשות. נותרו {game.lives} פסילות. {phase === 'won' ? 'כל השלבים הושלמו!' : phase === 'complete' ? 'השלב הושלם. ממשיכים לגינה הבאה.' : phase === 'lost' ? 'מנסים שוב את השלב.' : ''}</span>
    </div>
  </section>;
}
