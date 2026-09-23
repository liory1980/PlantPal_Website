import assert from 'node:assert/strict';
import { LEVELS, newRun, advanceRun, hazardPosition } from '../lib/plant-game-levels.ts';
import { initialPlayer, stepPlayer } from '../lib/plant-game-physics.ts';

for (let level = 0; level < LEVELS.length; level++) {
  const run = newRun(level);
  for (const platform of LEVELS[level].platforms) {
    assert(advanceRun(run, { x: platform.x, y: platform.height, z: platform.z }, .01).includes('collect'));
    const player = { x: platform.x, y: 0, z: platform.z + 1.6, vy: 0, grounded: true };
    for (let frame = 0; frame < 200; frame++) stepPlayer(player, 0, frame < 50 ? -1 : 0, 1 / 120, frame === 0, [platform]);
    assert(Math.abs(player.y - platform.height) < .001, `Unreachable platform in stage ${level + 1}`);
    assert(player.grounded);
  }
  assert.equal(run.status, level === LEVELS.length - 1 ? 'won' : 'complete');
  assert.equal(run.collected.length, LEVELS[level].platforms.length);
  assert.equal(advanceRun(run, initialPlayer(), 999).length, 0, 'Finished stages must stop the clock');
}
const hurt = newRun(1);
for (let hit = 0; hit < 3; hit++) {
  hurt.invulnerable = 0;
  const hazard = hazardPosition(LEVELS[1].hazards[0], hurt.elapsed);
  assert(advanceRun(hurt, { ...hazard, y: 0 }, 0).includes('hit'));
  assert.equal(hurt.lives, 2 - hit);
  assert.equal(advanceRun(hurt, { ...hazard, y: 0 }, .1).length, 0, 'Invulnerability must prevent repeated damage');
}
assert.equal(hurt.status, 'lost');
const jumping = newRun(1);
assert(!advanceRun(jumping, { ...hazardPosition(LEVELS[1].hazards[0], 0), y: 1 }, 0).includes('hit'));
const expired = newRun();
assert(advanceRun(expired, initialPlayer(), LEVELS[0].seconds).includes('lost'));
const duplicate = newRun();
const first = LEVELS[0].platforms[0];
advanceRun(duplicate, { x: first.x, y: first.height, z: first.z }, 0);
advanceRun(duplicate, { x: first.x, y: first.height, z: first.z }, 0);
assert.equal(duplicate.collected.length, 1);
console.log('Passed: 18 platform landings, three-stage progression, victory, damage, lives, invulnerability, jumping over hazards, timeout, and duplicate pickups.');
