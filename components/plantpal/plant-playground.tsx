'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Gamepad2, Heart, Pause, Play, RotateCcw, Sun, Timer, Volume2, VolumeX } from 'lucide-react';
import type { GameController, GameSnapshot } from './plant-game-engine';
import { LEVELS } from '@/lib/plant-game-levels';
import { GardenAudio } from '@/lib/plant-game-audio';
import { plantGameCopy } from '@/lib/plant-game-copy';

type Phase = 'loading' | 'ready' | 'playing' | 'paused' | 'complete' | 'won' | 'lost' | 'error';
const keyMap: Record<string, string> = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down' };
const initialSnapshot: GameSnapshot = { level: 0, score: 0, total: 5, lives: 3, seconds: 90, status: 'playing' };

export function PlantPlayground({ locale = 'he' }: { locale?: keyof typeof plantGameCopy }) {
  const copy = plantGameCopy[locale];
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
  const levelCopy = copy.levels[game.level];
  const locked = phase === 'loading' || phase === 'error';

  return <section className="playground-section" id="plant-playground" aria-labelledby="playground-title">
    <div className="shell">
      <div className="playground-heading"><div><span className="eyebrow"><Gamepad2 size={17} /> {copy.eyebrow}</span><h2 id="playground-title">{copy.title} <em>{copy.titleEmphasis}</em></h2></div><p>{copy.intro}</p></div>
      <ol className="game-stage-track" aria-label={copy.stagesLabel}>{LEVELS.map((l, i) => <li key={l.name} className={i < game.level || phase === 'won' ? 'stage-done' : i === game.level ? 'stage-current' : ''} aria-current={i === game.level ? 'step' : undefined}><span>{i < game.level || phase === 'won' ? <Check size={14} /> : `0${i + 1}`}</span><div>{copy.levels[i].name}<small>{copy.levels[i].subtitle}</small></div></li>)}</ol>
      <div ref={surfaceRef} className={`playground-surface garden-stage-${game.level + 1}`} tabIndex={0} role="region" aria-label={copy.regionLabel} aria-describedby="game-instructions" onKeyDown={event => {
        if (event.target !== surfaceRef.current) return;
        if (event.code === 'Escape' && phaseRef.current === 'playing') { event.preventDefault(); pause(); return; }
        if (phaseRef.current !== 'playing') return;
        if (keyMap[event.code]) { event.preventDefault(); controllerRef.current?.setDirection(keyMap[event.code], true); }
        if (event.code === 'Space') { event.preventDefault(); if (!event.repeat) controllerRef.current?.jump(); }
      }} onKeyUp={event => { if (keyMap[event.code]) controllerRef.current?.setDirection(keyMap[event.code], false); }} onBlur={event => { controllerRef.current?.clearKeys(); if (!event.currentTarget.contains(event.relatedTarget) && phaseRef.current === 'playing') pause(); }} onPointerDown={event => { if (event.target instanceof HTMLCanvasElement) surfaceRef.current?.focus({ preventScroll: true }); }}>
        <div ref={hostRef} className="playground-canvas" />
        <div className="game-topbar"><span className="garden-label"><Sun size={16} /> {copy.stageOf(game.level + 1, LEVELS.length)}</span><div className="game-tools"><span className="game-score" aria-label={copy.score(game.score, game.total)}><Sun size={18} /> {game.score}<span>/ {game.total}</span></span><span className={`game-timer${game.seconds <= 15 ? ' time-low' : ''}`} aria-label={copy.time(game.seconds)}><Timer size={16} />{game.seconds}</span><span className="game-lives" aria-label={copy.lives(game.lives)}>{[0,1,2].map(i => <Heart key={i} size={15} fill={i < game.lives ? 'currentColor' : 'none'} opacity={i < game.lives ? 1 : .3} />)}</span><button onClick={toggleSound} aria-label={muted ? copy.unmute : copy.mute} aria-pressed={muted} title={muted ? copy.soundOff : copy.soundOn}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button><button onClick={() => reset()} disabled={locked} aria-label={copy.restart} title={copy.restart}><RotateCcw size={18} /></button>{phase === 'playing' && <button onClick={pause} aria-label={copy.pause} title={copy.pause}><Pause size={18} /></button>}</div></div>
        {phase === 'loading' && <div className="game-overlay"><div className="game-message"><img src="/images/app-icon.webp" width="64" height="64" alt="" /><h3>{copy.loadingTitle}</h3><p role="status">{copy.loading}{progress > 0 ? ` · ${progress}%` : '…'}</p></div></div>}
        {(phase === 'ready' || phase === 'paused') && <div className="game-start"><span className="game-level-tip">{phase === 'ready' ? levelCopy.description : copy.paused}</span><button className="button" onClick={play}><Play size={16} fill="currentColor" />{phase === 'ready' ? copy.start(game.level + 1) : copy.resume}</button><span>{copy.stats(phase === 'paused' ? game.seconds : level.seconds, game.total, game.lives)}</span></div>}
        {(phase === 'complete' || phase === 'won' || phase === 'lost') && <div className="game-overlay game-win"><div className="game-message"><span className="game-win-icon">{phase === 'lost' ? <RotateCcw size={26} /> : <Check size={26} />}</span><span className="eyebrow">{phase === 'won' ? copy.allComplete : `${copy.stage(game.level + 1)} · ${levelCopy.name}`}</span><h3>{phase === 'complete' ? copy.completeTitle : phase === 'won' ? copy.wonTitle : game.lives === 0 ? copy.hitTitle : copy.timeoutTitle}</h3><p>{phase === 'complete' ? copy.complete(game.total, game.seconds) : phase === 'won' ? copy.won : copy.lost}</p>{phase === 'complete' ? <button className="button" onClick={nextStage}>{copy.next} <ArrowRight size={17} /></button> : <button className="button" onClick={() => reset(phase === 'won')}><RotateCcw size={16} />{phase === 'won' ? copy.replay : copy.retryStage}</button>}</div></div>}
        {phase === 'error' && <div className="game-overlay"><div className="game-message"><h3>{copy.errorTitle}</h3><p>{copy.error}</p><button className="button" onClick={() => { setProgress(0); setGame(initialSnapshot); updatePhase('loading'); setAttempt(value => value + 1); }}>{copy.retry}</button><a href={copy.guideHref}>{copy.guide}</a></div></div>}
        <div className="game-touch-controls" aria-label={copy.touch}><div className="game-dpad">{([['up', ArrowUp], ['left', ArrowLeft], ['down', ArrowDown], ['right', ArrowRight]] as const).map(([key, Icon]) => <button key={key} className={`direction-${key}`} aria-label={copy.directions[key]} disabled={phase !== 'playing'} onPointerDown={event => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); controllerRef.current?.setDirection(key, true); }} onPointerUp={() => controllerRef.current?.setDirection(key, false)} onPointerCancel={() => controllerRef.current?.setDirection(key, false)} onLostPointerCapture={() => controllerRef.current?.setDirection(key, false)}><Icon size={20} /></button>)}</div><button className="game-jump" disabled={phase !== 'playing'} onPointerDown={event => { event.preventDefault(); controllerRef.current?.jump(); }} onClick={event => { if (event.detail === 0) controllerRef.current?.jump(); }}><ArrowUp size={19} /> {copy.jump}</button></div>
      </div>
      <div className="game-instructions" id="game-instructions"><span><kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd> {copy.or} <strong>WASD</strong> {copy.moveHint}</span><span><kbd>{copy.space}</kbd> {copy.jumpHint}</span><span><kbd>Esc</kbd> {copy.pauseHint}</span><p>{copy.instructions}</p></div>
      <span className="sr-only" role="status" aria-live="polite">{copy.stage(game.level + 1)}. {copy.score(game.score, game.total)}. {copy.lives(game.lives)}. {phase === 'won' ? copy.wonStatus : phase === 'complete' ? copy.completeStatus : phase === 'lost' ? copy.lostStatus : ''}</span>
    </div>
  </section>;
}
