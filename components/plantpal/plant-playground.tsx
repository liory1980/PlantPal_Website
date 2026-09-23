'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Gamepad2, Pause, Play, RotateCcw, Sun } from 'lucide-react';
import type { GameController } from './plant-game-engine';

type Phase = 'loading' | 'ready' | 'playing' | 'paused' | 'won' | 'error';
const keyMap: Record<string, string> = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down' };

export function PlantPlayground() {
  const hostRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<GameController | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');
  const phaseRef = useRef<Phase>('loading');
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const updatePhase = (next: Phase) => { phaseRef.current = next; setPhase(next); };

  useEffect(() => {
    const surface = surfaceRef.current!;
    const host = hostRef.current!;
    let cancelled = false;
    let startedLoading = false;
    const load = async () => {
      if (startedLoading) return;
      startedLoading = true;
      try {
        const { createPlantGame } = await import('./plant-game-engine');
        if (cancelled) return;
        controllerRef.current = createPlantGame(host, {
          onReady: () => { if (!cancelled) updatePhase('ready'); },
          onProgress: value => { if (!cancelled) setProgress(value); },
          onScore: value => {
            if (cancelled) return;
            setScore(value);
            if (value === 5) { updatePhase('won'); controllerRef.current?.setActive(false); }
          },
          onError: () => { if (!cancelled) { updatePhase('error'); controllerRef.current?.setActive(false); } },
        });
      } catch { if (!cancelled) updatePhase('error'); }
    };
    const visibility = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) void load();
      else if (phaseRef.current === 'playing') { controllerRef.current?.setActive(false); updatePhase('paused'); }
    }, { threshold: 0.08 });
    visibility.observe(surface);
    const pause = () => { controllerRef.current?.clearKeys(); if (phaseRef.current === 'playing') { controllerRef.current?.setActive(false); updatePhase('paused'); } };
    const hidden = () => { if (document.hidden) pause(); };
    window.addEventListener('blur', pause);
    document.addEventListener('visibilitychange', hidden);
    return () => { cancelled = true; visibility.disconnect(); window.removeEventListener('blur', pause); document.removeEventListener('visibilitychange', hidden); controllerRef.current?.dispose(); controllerRef.current = null; };
  }, [attempt]);

  function play() {
    if (phaseRef.current === 'won') controllerRef.current?.reset();
    updatePhase('playing'); controllerRef.current?.setActive(true); surfaceRef.current?.focus({ preventScroll: true });
  }
  function pause() { controllerRef.current?.setActive(false); updatePhase('paused'); }
  function reset() { controllerRef.current?.reset(); updatePhase('playing'); controllerRef.current?.setActive(true); surfaceRef.current?.focus({ preventScroll: true }); }

  return <section className="playground-section" id="plant-playground" aria-labelledby="playground-title">
    <div className="shell">
      <div className="playground-heading"><div><span className="eyebrow"><Gamepad2 size={17} /> TAKE A LITTLE GREEN BREAK</span><h2 id="playground-title">Small plant. <em>Big personality.</em></h2></div><p>Take your PlantPal for a stroll. <br />Hop onto the stepping stones and collect five sunbeams.</p></div>
      <div ref={surfaceRef} className="playground-surface" tabIndex={0} role="region" aria-label="PlantPal garden game" aria-describedby="game-instructions" onKeyDown={event => {
        if (event.target !== surfaceRef.current) return;
        if (event.code === 'Escape' && phaseRef.current === 'playing') { event.preventDefault(); pause(); return; }
        if (phaseRef.current !== 'playing') return;
        if (keyMap[event.code]) { event.preventDefault(); controllerRef.current?.setDirection(keyMap[event.code], true); }
        if (event.code === 'Space') { event.preventDefault(); if (!event.repeat) controllerRef.current?.jump(); }
      }} onKeyUp={event => { if (keyMap[event.code]) controllerRef.current?.setDirection(keyMap[event.code], false); }} onBlur={event => { controllerRef.current?.clearKeys(); if (!event.currentTarget.contains(event.relatedTarget) && phaseRef.current === 'playing') pause(); }} onPointerDown={event => { if (event.target instanceof HTMLCanvasElement) surfaceRef.current?.focus({ preventScroll: true }); }}>
        <div ref={hostRef} className="playground-canvas" />
        <div className="game-topbar"><span className="garden-label"><LeafMark /> THE SUNSHINE GARDEN</span><div className="game-tools"><span className="game-score" aria-label={`${score} of 5 sunbeams collected`}><Sun size={18} /> {score}<span>/ 5</span></span><button onClick={reset} disabled={phase === 'loading' || phase === 'error'} aria-label="Restart game" title="Restart game"><RotateCcw size={18} /></button>{phase === 'playing' && <button onClick={pause} aria-label="Pause game" title="Pause game"><Pause size={18} /></button>}</div></div>
        {phase === 'loading' && <div className="game-overlay"><div className="game-message"><img src="/images/app-icon.webp" width="64" height="64" alt="" /><h3>A little garden is growing.</h3><p role="status">Loading your PlantPal{progress > 0 ? ` · ${progress}%` : '…'}</p></div></div>}
        {(phase === 'ready' || phase === 'paused') && <div className="game-start"><button className="button" onClick={play}><Play size={16} fill="currentColor" />{phase === 'ready' ? 'Let’s play' : 'Keep exploring'}</button><span>{phase === 'ready' ? 'No rush. Just a little sunshine.' : 'Your garden is paused.'}</span></div>}
        {phase === 'won' && <div className="game-overlay game-win"><div className="game-message"><span className="game-win-icon"><Check size={26} /></span><h3>You made their day.</h3><p>Five little sunbeams. One happy PlantPal.</p><button className="button" onClick={play}><RotateCcw size={16} /> Play again</button></div></div>}
        {phase === 'error' && <div className="game-overlay"><div className="game-message"><h3>The garden couldn’t open.</h3><p>Try again, or use a browser with 3D graphics enabled.</p><button className="button" onClick={() => { setProgress(0); setScore(0); updatePhase('loading'); setAttempt(value => value + 1); }}>Try again</button><a href="/learn">Explore plant care instead</a></div></div>}
        <div className="game-touch-controls" aria-label="Touch game controls"><div className="game-dpad">{([['up', ArrowUp], ['left', ArrowLeft], ['down', ArrowDown], ['right', ArrowRight]] as const).map(([key, Icon]) => <button key={key} className={`direction-${key}`} aria-label={`Move ${key}`} disabled={phase !== 'playing'} onPointerDown={event => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); controllerRef.current?.setDirection(key, true); }} onPointerUp={() => controllerRef.current?.setDirection(key, false)} onPointerCancel={() => controllerRef.current?.setDirection(key, false)} onLostPointerCapture={() => controllerRef.current?.setDirection(key, false)}><Icon size={20} /></button>)}</div><button className="game-jump" disabled={phase !== 'playing'} onPointerDown={event => { event.preventDefault(); controllerRef.current?.jump(); }} onClick={event => { if (event.detail === 0) controllerRef.current?.jump(); }}><ArrowUp size={19} /> Jump</button></div>
      </div>
      <div className="game-instructions" id="game-instructions"><span><kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd> or <strong>WASD</strong> to move</span><span><kbd>Space</kbd> to jump</span><span><kbd>Esc</kbd> to pause</span><p>Click the garden to use your keyboard. Touch controls work too.</p></div>
      <span className="sr-only" role="status" aria-live="polite">{phase === 'won' ? 'You collected all five sunbeams! Play again whenever you like.' : `${score} of 5 sunbeams collected.`}</span>
    </div>
  </section>;
}

function LeafMark() { return <Sun size={16} strokeWidth={1.5} />; }
