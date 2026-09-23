'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Gamepad2, Heart, Pause, Play, RotateCcw, Sun, Timer, Volume2, VolumeX } from 'lucide-react';
import type { GameController, GameSnapshot } from './plant-game-engine';
import { LEVELS } from '@/lib/plant-game-levels';
import { GardenAudio } from '@/lib/plant-game-audio';

type Phase = 'loading' | 'ready' | 'playing' | 'paused' | 'complete' | 'won' | 'lost' | 'error';
const keyMap: Record<string, string> = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down' };
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
      <div className="playground-heading"><div><span className="eyebrow"><Gamepad2 size={17} /> A LITTLE ADVENTURE. A LOT OF SUNSHINE.</span><h2 id="playground-title">Small plant. <em>Big adventure.</em></h2></div><p>Three gardens to explore. Suns to gather. Brambles to dodge. How far can your PlantPal go?</p></div>
      <ol className="game-stage-track" aria-label="Game stages">{LEVELS.map((l, i) => <li key={l.name} className={i < game.level || phase === 'won' ? 'stage-done' : i === game.level ? 'stage-current' : ''} aria-current={i === game.level ? 'step' : undefined}><span>{i < game.level || phase === 'won' ? <Check size={14} /> : `0${i + 1}`}</span><div>{l.name}<small>{i === 0 ? 'Find your feet' : i === 1 ? 'Dodge & jump' : 'Race the clock'}</small></div></li>)}</ol>
      <div ref={surfaceRef} className={`playground-surface garden-stage-${game.level + 1}`} tabIndex={0} role="region" aria-label="PlantPal garden game" aria-describedby="game-instructions" onKeyDown={event => {
        if (event.target !== surfaceRef.current) return;
        if (event.code === 'Escape' && phaseRef.current === 'playing') { event.preventDefault(); pause(); return; }
        if (phaseRef.current !== 'playing') return;
        if (keyMap[event.code]) { event.preventDefault(); controllerRef.current?.setDirection(keyMap[event.code], true); }
        if (event.code === 'Space') { event.preventDefault(); if (!event.repeat) controllerRef.current?.jump(); }
      }} onKeyUp={event => { if (keyMap[event.code]) controllerRef.current?.setDirection(keyMap[event.code], false); }} onBlur={event => { controllerRef.current?.clearKeys(); if (!event.currentTarget.contains(event.relatedTarget) && phaseRef.current === 'playing') pause(); }} onPointerDown={event => { if (event.target instanceof HTMLCanvasElement) surfaceRef.current?.focus({ preventScroll: true }); }}>
        <div ref={hostRef} className="playground-canvas" />
        <div className="game-topbar"><span className="garden-label"><Sun size={16} /> STAGE {game.level + 1} / 3</span><div className="game-tools"><span className="game-score" aria-label={`${game.score} of ${game.total} suns collected`}><Sun size={18} /> {game.score}<span>/ {game.total}</span></span><span className={`game-timer${game.seconds <= 15 ? ' time-low' : ''}`} aria-label={`${game.seconds} seconds remaining`}><Timer size={16} />{game.seconds}s</span><span className="game-lives" aria-label={`${game.lives} lives remaining`}>{[0,1,2].map(i => <Heart key={i} size={15} fill={i < game.lives ? 'currentColor' : 'none'} opacity={i < game.lives ? 1 : .3} />)}</span><button onClick={toggleSound} aria-label={muted ? 'Enable game sound' : 'Mute game sound'} aria-pressed={muted} title={muted ? 'Sound off' : 'Sound on'}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button><button onClick={() => reset()} disabled={locked} aria-label="Restart stage" title="Restart stage"><RotateCcw size={18} /></button>{phase === 'playing' && <button onClick={pause} aria-label="Pause game" title="Pause game"><Pause size={18} /></button>}</div></div>
        {phase === 'loading' && <div className="game-overlay"><div className="game-message"><img src="/images/app-icon.webp" width="64" height="64" alt="" /><h3>A little garden is growing.</h3><p role="status">Loading your PlantPal{progress > 0 ? ` · ${progress}%` : '…'}</p></div></div>}
        {(phase === 'ready' || phase === 'paused') && <div className="game-start"><span className="game-level-tip">{phase === 'ready' ? level.description : 'Take a breath. Your timer is paused.'}</span><button className="button" onClick={play}><Play size={16} fill="currentColor" />{phase === 'ready' ? `Play stage ${game.level + 1}` : 'Keep exploring'}</button><span>{phase === 'paused' ? game.seconds : level.seconds} seconds · {game.total} suns · {game.lives} lives</span></div>}
        {(phase === 'complete' || phase === 'won' || phase === 'lost') && <div className="game-overlay game-win"><div className="game-message"><span className="game-win-icon">{phase === 'lost' ? <RotateCcw size={26} /> : <Check size={26} />}</span><span className="eyebrow">{phase === 'won' ? 'ALL THREE GARDENS COMPLETE' : `STAGE ${game.level + 1} · ${level.name.toUpperCase()}`}</span><h3>{phase === 'complete' ? 'A little more sunshine.' : phase === 'won' ? 'You’re a natural.' : game.lives === 0 ? 'Watch those brambles.' : 'The sun has set.'}</h3><p>{phase === 'complete' ? `${game.total} suns collected with ${game.seconds} seconds to spare. A new garden is waiting.` : phase === 'won' ? 'Eighteen suns. Three gardens. One very happy PlantPal.' : 'Take another run. Jump over the orange brambles and land on each stone before time runs out.'}</p>{phase === 'complete' ? <button className="button" onClick={nextStage}>Next stage <ArrowRight size={17} /></button> : <button className="button" onClick={() => reset(phase === 'won')}><RotateCcw size={16} />{phase === 'won' ? 'Play all stages again' : 'Try this stage again'}</button>}</div></div>}
        {phase === 'error' && <div className="game-overlay"><div className="game-message"><h3>The garden couldn’t open.</h3><p>Try again, or use a browser with 3D graphics enabled.</p><button className="button" onClick={() => { setProgress(0); setGame(initialSnapshot); updatePhase('loading'); setAttempt(value => value + 1); }}>Try again</button><a href="/learn">Explore plant care instead</a></div></div>}
        <div className="game-touch-controls" aria-label="Touch game controls"><div className="game-dpad">{([['up', ArrowUp], ['left', ArrowLeft], ['down', ArrowDown], ['right', ArrowRight]] as const).map(([key, Icon]) => <button key={key} className={`direction-${key}`} aria-label={`Move ${key}`} disabled={phase !== 'playing'} onPointerDown={event => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); controllerRef.current?.setDirection(key, true); }} onPointerUp={() => controllerRef.current?.setDirection(key, false)} onPointerCancel={() => controllerRef.current?.setDirection(key, false)} onLostPointerCapture={() => controllerRef.current?.setDirection(key, false)}><Icon size={20} /></button>)}</div><button className="game-jump" disabled={phase !== 'playing'} onPointerDown={event => { event.preventDefault(); controllerRef.current?.jump(); }} onClick={event => { if (event.detail === 0) controllerRef.current?.jump(); }}><ArrowUp size={19} /> Jump</button></div>
      </div>
      <div className="game-instructions" id="game-instructions"><span><kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd> or <strong>WASD</strong> to move</span><span><kbd>Space</kbd> to jump</span><span><kbd>Esc</kbd> to pause</span><p>Collect every sun. Jump over orange brambles. Touch controls work too.</p></div>
      <span className="sr-only" role="status" aria-live="polite">Stage {game.level + 1}. {game.score} of {game.total} suns collected. {game.lives} lives remaining. {phase === 'won' ? 'All stages complete!' : phase === 'complete' ? 'Stage complete. Continue to the next garden.' : phase === 'lost' ? 'Try this stage again.' : ''}</span>
    </div>
  </section>;
}
