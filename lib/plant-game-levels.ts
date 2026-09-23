export type Platform = { x: number; z: number; radius: number; height: number };
export type Hazard = { x: number; z: number; axis: 'x' | 'z'; range: number; speed: number; phase: number };
export type Level = { name: string; description: string; seconds: number; color: number; platforms: Platform[]; hazards: Hazard[] };
export const LEVELS: Level[] = [
  { name: 'אחו הבוקר', description: 'לומדים לזוז, קופצים בין האבנים ואוספים את כל השמשות.', seconds: 90, color: 0xaec397,
    platforms: [{ x: -3, z: 1.5, radius: 1, height: .28 }, { x: 3, z: 1.2, radius: 1, height: .55 }, { x: -4, z: -2.1, radius: 1, height: .72 }, { x: 0, z: -2.4, radius: 1.1, height: 1.05 }, { x: 4, z: -2.4, radius: 1, height: .85 }], hazards: [] },
  { name: 'מעבר הקוצים', description: 'האבנים קטנות יותר והקוצים זזים. קפצו מעל המכשולים הכתומים.', seconds: 80, color: 0x91b5a4,
    platforms: [{ x: -3.8, z: 2, radius: .8, height: .55 }, { x: 3.8, z: 2, radius: .8, height: .7 }, { x: -4.5, z: -1.8, radius: .75, height: 1.1 }, { x: -1.5, z: -2, radius: .75, height: .95 }, { x: 1.5, z: -2.3, radius: .7, height: 1.2 }, { x: 4.5, z: -1.8, radius: .8, height: 1.05 }],
    hazards: [{ x: 0, z: .1, axis: 'x', range: 5.7, speed: .8, phase: 1.5 }, { x: 0, z: -1.5, axis: 'z', range: 1.8, speed: 1.1, phase: .5 }] },
  { name: 'מרוץ שעת הזהב', description: 'שבע שמשות, אבנים גבוהות וקוצים מהירים. כל קפיצה חשובה.', seconds: 70, color: 0xc4b786,
    platforms: [{ x: -4.7, z: 2.2, radius: .7, height: .7 }, { x: -2.2, z: .8, radius: .65, height: 1.2 }, { x: 2.2, z: .8, radius: .65, height: 1.25 }, { x: 4.7, z: 2.2, radius: .7, height: .75 }, { x: -4.5, z: -2.5, radius: .65, height: 1.25 }, { x: 0, z: -2.7, radius: .7, height: 1.3 }, { x: 4.5, z: -2.5, radius: .65, height: 1.3 }],
    hazards: [{ x: 0, z: -.6, axis: 'x', range: 5.8, speed: 1.25, phase: 0 }, { x: -1.1, z: 0, axis: 'z', range: 3.2, speed: 1, phase: 2 }, { x: 1.1, z: 0, axis: 'z', range: 3.2, speed: 1.2, phase: 4 }] },
];
export const hazardPosition = (hazard: Hazard, time: number) => ({ x: hazard.x + (hazard.axis === 'x' ? Math.sin(time * hazard.speed + hazard.phase) * hazard.range : 0), z: hazard.z + (hazard.axis === 'z' ? Math.sin(time * hazard.speed + hazard.phase) * hazard.range : 0) });
export type RunState = { level: number; collected: number[]; elapsed: number; lives: number; invulnerable: number; status: 'playing' | 'complete' | 'lost' | 'won' };
export const newRun = (level = 0): RunState => ({ level, collected: [], elapsed: 0, lives: 3, invulnerable: 0, status: 'playing' });
export function advanceRun(run: RunState, player: { x: number; y: number; z: number }, dt: number): ('collect' | 'hit' | 'complete' | 'lost' | 'won')[] {
  const events: ('collect' | 'hit' | 'complete' | 'lost' | 'won')[] = [];
  if (run.status !== 'playing') return events;
  const level = LEVELS[run.level];
  run.elapsed += dt;
  run.invulnerable = Math.max(0, run.invulnerable - dt);
  if (run.elapsed >= level.seconds) { run.status = 'lost'; return ['lost']; }
  if (run.invulnerable === 0 && player.y < .7 && level.hazards.some(h => { const p = hazardPosition(h, run.elapsed); return Math.hypot(player.x - p.x, player.z - p.z) < .72; })) {
    run.lives--; run.invulnerable = 1.8; events.push('hit');
    if (run.lives === 0) { run.status = 'lost'; events.push('lost'); }
    return events;
  }
  level.platforms.forEach((p, i) => {
    if (!run.collected.includes(i) && Math.hypot(player.x - p.x, player.z - p.z) < Math.min(.62, p.radius) && Math.abs(player.y - p.height) < .36) { run.collected.push(i); events.push('collect'); }
  });
  if (run.collected.length === level.platforms.length) { run.status = run.level === LEVELS.length - 1 ? 'won' : 'complete'; events.push(run.status); }
  return events;
}
