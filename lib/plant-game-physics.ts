import type { Platform } from './plant-game-levels';
export type PlayerState = { x: number; y: number; z: number; vy: number; grounded: boolean };
export const initialPlayer = (): PlayerState => ({ x: 0, y: 0, z: 2.8, vy: 0, grounded: true });

// All motion uses seconds, so speed and jumping are independent of frame rate.
export function stepPlayer(p: PlayerState, dx: number, dz: number, dt: number, jump: boolean, platforms: Platform[] = []) {
  dt = Math.min(Math.max(dt, 0), 1 / 30);
  if (jump && p.grounded) { p.vy = 6.5; p.grounded = false; }
  const length = Math.hypot(dx, dz);
  const speed = 3.8;
  if (length > 0) { p.x += dx / length * speed * dt; p.z += dz / length * speed * dt; }
  p.x = Math.max(-6.4, Math.min(6.4, p.x));
  p.z = Math.max(-4, Math.min(4.2, p.z));
  const previousY = p.y;
  p.vy -= 14 * dt;
  p.y += p.vy * dt;
  p.grounded = false;
  let floor = 0;
  for (const platform of platforms) {
    const distance = Math.hypot(p.x - platform.x, p.z - platform.z);
    if (distance < platform.radius + 0.2 && previousY >= platform.height - 0.08 && p.vy <= 0) {
      floor = Math.max(floor, platform.height);
    } else if (distance < platform.radius + 0.28 && p.y < platform.height - 0.08) {
      const angle = distance < 0.001 ? 0 : Math.atan2(p.z - platform.z, p.x - platform.x);
      p.x = platform.x + Math.cos(angle) * (platform.radius + 0.28);
      p.z = platform.z + Math.sin(angle) * (platform.radius + 0.28);
    }
  }
  if (p.y <= floor) { p.y = floor; p.vy = 0; p.grounded = true; }
  return p;
}
