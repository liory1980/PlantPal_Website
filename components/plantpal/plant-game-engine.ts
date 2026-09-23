import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { initialPlayer, PLATFORMS, stepPlayer } from '@/lib/plant-game-physics';

export type GameController = {
  setActive: (active: boolean) => void;
  setDirection: (key: string, pressed: boolean) => void;
  jump: () => void;
  reset: () => void;
  clearKeys: () => void;
  dispose: () => void;
};

export function createPlantGame(host: HTMLDivElement, callbacks: {
  onReady: () => void;
  onProgress: (progress: number) => void;
  onScore: (score: number) => void;
  onError: () => void;
}): GameController {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-9, 9, 6, -6, 0.1, 90);
  camera.position.set(0, 13, 18);
  camera.lookAt(0, 0, 0);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute('aria-label', '3D PlantPal garden');
  renderer.domElement.setAttribute('role', 'img');
  host.appendChild(renderer.domElement);

  let disposed = false;
  let active = false;
  let ready = false;
  let frame = 0;
  let previousTime = 0;
  let elapsed = 0;
  let pendingJump = false;
  let score = 0;
  const keys = new Set<string>();
  const player = initialPlayer();
  const character = new THREE.Group();
  const body = new THREE.Group();
  character.add(body);
  character.position.set(player.x, player.y, player.z);
  scene.add(character);

  scene.add(new THREE.HemisphereLight(0xf4ffdc, 0x668b6c, 2.2));
  const sun = new THREE.DirectionalLight(0xfff4d1, 2.8);
  sun.position.set(-5, 12, 7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -10;
  sun.shadow.camera.right = 10;
  sun.shadow.camera.top = 10;
  sun.shadow.camera.bottom = -10;
  sun.shadow.normalBias = 0.04;
  sun.shadow.bias = -0.0002;
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0xcaffc4, 1.2);
  rim.position.set(6, 4, -7);
  scene.add(rim);

  const ground = new THREE.Mesh(new RoundedBoxGeometry(15, 0.65, 11, 4, 0.35), new THREE.MeshStandardMaterial({ color: 0xaec397, roughness: 0.96 }));
  ground.position.y = -0.37;
  ground.receiveShadow = true;
  scene.add(ground);
  const base = new THREE.Mesh(new RoundedBoxGeometry(14.7, 0.7, 10.7, 4, 0.4), new THREE.MeshStandardMaterial({ color: 0x4c6d52, roughness: 1 }));
  base.position.y = -0.88;
  scene.add(base);

  // The rings mark the playable area; all platforms use the same physics dimensions.
  const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(13.3, 0.001, 8.8)), new THREE.LineBasicMaterial({ color: 0xd3dfaf, transparent: true, opacity: 0.55 }));
  edge.position.y = 0.025;
  scene.add(edge);
  const tokens: { mesh: THREE.Group; found: boolean; x: number; y: number; z: number }[] = [];
  const ringGeometry = new THREE.TorusGeometry(0.3, 0.07, 10, 28);
  const coreGeometry = new THREE.IcosahedronGeometry(0.17, 1);
  const gold = new THREE.MeshStandardMaterial({ color: 0xffd762, emissive: 0xf6b62a, emissiveIntensity: 0.35, roughness: 0.3, metalness: 0.25 });
  for (const [i, p] of PLATFORMS.entries()) {
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(p.radius, p.radius + 0.08, p.height, 48), new THREE.MeshStandardMaterial({ color: [0x7f9e69, 0x849e6a, 0x728f64, 0xb3c38b, 0x77955f][i], roughness: 0.92 }));
    platform.position.set(p.x, p.height / 2, p.z);
    platform.castShadow = true;
    platform.receiveShadow = true;
    scene.add(platform);
    const topRing = new THREE.Mesh(new THREE.TorusGeometry(p.radius * 0.82, 0.015, 4, 48), new THREE.MeshBasicMaterial({ color: 0xd5e4a8 }));
    topRing.rotation.x = Math.PI / 2;
    topRing.position.set(p.x, p.height + 0.015, p.z);
    scene.add(topRing);
    const token = new THREE.Group();
    token.add(new THREE.Mesh(ringGeometry, gold), new THREE.Mesh(coreGeometry, gold));
    const y = p.height + 1.1;
    token.position.set(p.x, y, p.z);
    scene.add(token);
    tokens.push({ mesh: token, found: false, x: p.x, y, z: p.z });
  }

  const render = () => { if (!disposed) renderer.render(scene, camera); };
  const resize = () => {
    if (disposed) return;
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    const aspect = width / height;
    const halfHeight = Math.max(4.9, 8.1 / aspect);
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    render();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);

  function tick(time: number) {
    if (disposed || !active || !ready) return;
    const dt = Math.min((time - (previousTime || time)) / 1000, 1 / 30);
    previousTime = time;
    elapsed += dt;
    const dx = Number(keys.has('right')) - Number(keys.has('left'));
    const dz = Number(keys.has('down')) - Number(keys.has('up'));
    stepPlayer(player, dx, dz, dt, pendingJump);
    pendingJump = false;
    character.position.set(player.x, player.y, player.z);
    const walking = dx !== 0 || dz !== 0;
    if (walking) {
      const target = Math.atan2(dx, dz);
      const delta = Math.atan2(Math.sin(target - character.rotation.y), Math.cos(target - character.rotation.y));
      character.rotation.y += delta * Math.min(dt * 14, 1);
    }
    body.rotation.z = walking && player.grounded ? Math.sin(elapsed * 13) * 0.065 : Math.sin(elapsed * 2) * 0.012;
    body.position.y = walking && player.grounded ? Math.abs(Math.sin(elapsed * 13)) * 0.06 : 0;
    body.scale.set(1, player.grounded ? 1 : 1.025, 1);
    for (const [i, token] of tokens.entries()) {
      if (token.found) continue;
      token.mesh.rotation.y = elapsed * 1.7 + i;
      token.mesh.position.y = token.y + Math.sin(elapsed * 2.5 + i) * 0.09;
      if (Math.hypot(player.x - token.x, player.z - token.z) < 0.68 && Math.abs(player.y + 1.05 - token.y) < 0.5) {
        token.found = true;
        token.mesh.visible = false;
        callbacks.onScore(++score);
      }
    }
    render();
    if (active) frame = requestAnimationFrame(tick);
  }
  const setActive = (value: boolean) => {
    active = value;
    cancelAnimationFrame(frame);
    previousTime = 0;
    if (value && ready && !disposed) frame = requestAnimationFrame(tick);
    else { keys.clear(); pendingJump = false; render(); }
  };
  const releaseObject = (object: THREE.Object3D) => {
    const textures = new Set<THREE.Texture>();
    object.traverse(node => {
      if (!(node instanceof THREE.Mesh) && !(node instanceof THREE.LineSegments)) return;
      node.geometry.dispose();
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      for (const material of materials) {
        for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value);
        material.dispose();
      }
    });
    for (const texture of textures) { texture.dispose(); const bitmap = texture.image; if (typeof ImageBitmap !== 'undefined' && bitmap instanceof ImageBitmap) bitmap.close(); }
  };
  const loader = new GLTFLoader();
  loader.load('/models/plantpal.glb', gltf => {
    if (disposed) { releaseObject(gltf.scene); return; }
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = 1.85 / size.y;
    gltf.scene.scale.setScalar(scale);
    gltf.scene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
    gltf.scene.traverse(node => { if (node instanceof THREE.Mesh) { node.castShadow = true; node.receiveShadow = true; } });
    body.add(gltf.scene);
    ready = true;
    resize();
    callbacks.onReady();
    if (active) setActive(true);
  }, event => { if (!disposed && event.total) callbacks.onProgress(Math.round(event.loaded / event.total * 100)); }, () => { if (!disposed) callbacks.onError(); });
  const contextLost = (event: Event) => { event.preventDefault(); setActive(false); callbacks.onError(); };
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  resize();

  return {
    setActive,
    setDirection(key, pressed) { if (pressed && active) keys.add(key); else keys.delete(key); },
    jump() { if (active) pendingJump = true; },
    clearKeys() { keys.clear(); pendingJump = false; },
    reset() {
      Object.assign(player, initialPlayer()); score = 0; elapsed = 0; keys.clear(); pendingJump = false;
      character.position.set(player.x, player.y, player.z); character.rotation.set(0, 0, 0);
      body.position.y = 0; body.rotation.set(0, 0, 0); body.scale.setScalar(1);
      tokens.forEach(token => { token.found = false; token.mesh.visible = true; token.mesh.position.y = token.y; });
      callbacks.onScore(0); render();
    },
    dispose() {
      disposed = true; active = false; cancelAnimationFrame(frame); resizeObserver.disconnect();
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      releaseObject(scene); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    },
  };
}
