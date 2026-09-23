import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { initialPlayer, stepPlayer } from '@/lib/plant-game-physics';
import { LEVELS, newRun, advanceRun, hazardPosition, type RunState } from '@/lib/plant-game-levels';
export type GameSnapshot = { level: number; score: number; total: number; lives: number; seconds: number; status: RunState['status'] };

export type GameController = {
  setActive: (active: boolean) => void;
  setDirection: (key: string, pressed: boolean) => void;
  jump: () => void;
  reset: (fromBeginning?: boolean) => void;
  nextStage: () => void;
  clearKeys: () => void;
  dispose: () => void;
};

export function createPlantGame(host: HTMLDivElement, callbacks: {
  onReady: () => void;
  onProgress: (progress: number) => void;
  onState: (state: GameSnapshot) => void;
  onEvent: (event: 'collect' | 'hit' | 'complete' | 'won' | 'lost') => void;
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
  let run = newRun();
  let lastSnapshot = "";
  const emitState = () => { const state: GameSnapshot = { level: run.level, score: run.collected.length, total: LEVELS[run.level].platforms.length, lives: run.lives, seconds: Math.max(0, Math.ceil(LEVELS[run.level].seconds - run.elapsed)), status: run.status }; const key = JSON.stringify(state); if (key !== lastSnapshot) { lastSnapshot = key; callbacks.onState(state); } };
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
  const levelObjects = new THREE.Group();
  scene.add(levelObjects);
  const tokens: THREE.Group[] = [];
  const hazards: THREE.Group[] = [];
  const gold = () => new THREE.MeshStandardMaterial({color:0xffc72c,emissive:0xffa800,emissiveIntensity:.55,roughness:.35});
  function buildLevel() {
    releaseObject(levelObjects); levelObjects.clear(); tokens.length = 0; hazards.length = 0;
    const level = LEVELS[run.level];
    (ground.material as THREE.MeshStandardMaterial).color.setHex(level.color);
    for (const [i,p] of level.platforms.entries()) {
      const platform = new THREE.Mesh(new THREE.CylinderGeometry(p.radius,p.radius+.06,p.height,40),new THREE.MeshStandardMaterial({color:run.level===2?0x94815d:run.level===1?0x558b79:0x779960,roughness:.9}));
      platform.position.set(p.x,p.height/2,p.z);platform.castShadow=true;platform.receiveShadow=true;levelObjects.add(platform);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(p.radius*.83,.018,5,40),new THREE.MeshBasicMaterial({color:0xe0edb1}));rim.rotation.x=Math.PI/2;rim.position.set(p.x,p.height+.015,p.z);levelObjects.add(rim);
      const token = new THREE.Group();
      const core = new THREE.Mesh(new THREE.SphereGeometry(.235,20,14),gold());core.scale.z=.48;token.add(core);
      for(let ray=0;ray<10;ray++){
        const angle=ray*Math.PI/5;
        const spike=new THREE.Mesh(new THREE.ConeGeometry(.065,.2,3),gold());
        spike.position.set(Math.sin(angle)*.355,Math.cos(angle)*.355,0);spike.rotation.z=-angle;token.add(spike);
      }
      token.quaternion.copy(camera.quaternion);token.position.set(p.x,p.height+1.08,p.z);tokens.push(token);levelObjects.add(token);
    }
    for(const h of level.hazards){
      const hazard=new THREE.Group();
      const ball=new THREE.Mesh(new THREE.IcosahedronGeometry(.38,1),new THREE.MeshStandardMaterial({color:0xc15836,roughness:.7}));hazard.add(ball);
      for(let i=0;i<8;i++){const angle=i*Math.PI/4;const thorn=new THREE.Mesh(new THREE.ConeGeometry(.09,.24,5),new THREE.MeshStandardMaterial({color:0x713729}));thorn.position.set(Math.cos(angle)*.42,Math.sin(angle)*.42,0);thorn.rotation.z=angle-Math.PI/2;hazard.add(thorn);}
      const pos=hazardPosition(h,0);hazard.position.set(pos.x,.44,pos.z);hazards.push(hazard);levelObjects.add(hazard);
    }
  }
  const sparks = new THREE.Group(); scene.add(sparks);
  const sparkGeometry = new THREE.SphereGeometry(.045,6,4);
  const sparkMaterial = new THREE.MeshBasicMaterial({color:0xffdc63});
  for(let i=0;i<14;i++)sparks.add(new THREE.Mesh(sparkGeometry,sparkMaterial));
  let sparkLife=0;
  sparks.visible=false;
  function burst(position: THREE.Vector3) {sparks.position.copy(position);sparkLife=.6;sparks.visible=true;}

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
    stepPlayer(player, dx, dz, dt, pendingJump, LEVELS[run.level].platforms);
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
    const oldScore = run.collected.length;
    const events = advanceRun(run,player,dt);
    if(events.includes('hit')) { Object.assign(player, initialPlayer()); character.position.set(player.x,player.y,player.z); }
    character.visible=run.invulnerable===0 || Math.floor(run.invulnerable*10)%2===0;
    tokens.forEach((token,i)=>{
      token.visible=!run.collected.includes(i);
      token.quaternion.copy(camera.quaternion);token.rotateZ(elapsed*.5);
      token.position.y=LEVELS[run.level].platforms[i].height+1.08+Math.sin(elapsed*2.5+i)*.07;
    });
    hazards.forEach((hazard,i)=>{const position=hazardPosition(LEVELS[run.level].hazards[i],run.elapsed);hazard.position.set(position.x,.44,position.z);hazard.rotation.z=elapsed*2.5;hazard.rotation.y=elapsed*.8;});
    if(run.collected.length>oldScore)burst(tokens[run.collected[run.collected.length-1]].position);
    if(sparkLife>0){sparkLife-=dt;const t=.6-sparkLife;sparks.children.forEach((spark,i)=>{const angle=i*Math.PI*2/14;spark.position.set(Math.cos(angle)*t*2,Math.sin(angle)*t*2-t*t,Math.sin(i*3)*t);spark.scale.setScalar(Math.max(0,sparkLife/.6));});sparks.visible=sparkLife>0;}
    events.forEach(event=>callbacks.onEvent(event));
    if(run.status!=='playing') {active=false;keys.clear();}
    emitState();
    render();
    if (active) frame = requestAnimationFrame(tick);
  }
  const setActive = (value: boolean) => {
    active = value && run.status === 'playing';
    cancelAnimationFrame(frame);
    previousTime = 0;
    if (active && ready && !disposed) frame = requestAnimationFrame(tick);
    else { keys.clear(); pendingJump = false; render(); }
  };
  function releaseObject(object: THREE.Object3D) {
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
  buildLevel();
  emitState();
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
    reset(fromBeginning = false) {
      setActive(false);run = newRun(fromBeginning?0:run.level);elapsed=0;lastSnapshot='';
      Object.assign(player, initialPlayer()); keys.clear(); pendingJump=false;
      character.position.set(player.x,player.y,player.z);character.rotation.set(0,0,0);character.visible=true;
      body.position.y=0;body.rotation.set(0,0,0);body.scale.setScalar(1);sparks.visible=false;sparkLife=0;
      buildLevel();emitState();render();
    },
    nextStage() {
      if(run.status!=='complete')return;
      run=newRun(run.level+1);this.reset();
    },
    dispose() {
      disposed = true; active = false; cancelAnimationFrame(frame); resizeObserver.disconnect();
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      releaseObject(scene); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    },
  };
}
