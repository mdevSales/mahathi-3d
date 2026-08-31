import * as THREE from "three";

/* ----------------------------------------------------------------------------
   Particle galaxy — a slowly rotating spiral of thousands of glowing points
   in Mahathi's purple → pink → indigo brand. Reacts to the cursor.
---------------------------------------------------------------------------- */

const canvas = document.getElementById("galaxy");
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0d0817, 0.02);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 8);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* --- Build the galaxy geometry --- */
const PARAMS = {
  count: 12000,
  radius: 7,
  branches: 4,
  spin: 1.15,
  randomness: 0.55,
  randomnessPower: 2.6,
};

// Brand palette — points blend from core (bright) to edge (deep)
const colorInner = new THREE.Color(0xffd9f4); // near-white pink at the core
const colorMid = new THREE.Color(0xa855f7);   // purple
const colorOuter = new THREE.Color(0x6366f1); // indigo at the rim
const colorAccent = new THREE.Color(0xec4899); // pink sparkle

const positions = new Float32Array(PARAMS.count * 3);
const colors = new Float32Array(PARAMS.count * 3);
const scales = new Float32Array(PARAMS.count);

for (let i = 0; i < PARAMS.count; i++) {
  const i3 = i * 3;
  const radius = Math.pow(Math.random(), 1.5) * PARAMS.radius;
  const branchAngle = ((i % PARAMS.branches) / PARAMS.branches) * Math.PI * 2;
  const spinAngle = radius * PARAMS.spin;

  // Deterministic-ish scatter that thins out toward the edges
  const rand = (n) =>
    Math.pow(Math.random(), PARAMS.randomnessPower) *
    (Math.random() < 0.5 ? 1 : -1) *
    PARAMS.randomness *
    n;

  positions[i3] = Math.cos(branchAngle + spinAngle) * radius + rand(radius * 0.4);
  positions[i3 + 1] = rand(1.4); // vertical thickness of the disc
  positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rand(radius * 0.4);

  // Color: core → mid → outer, with occasional pink sparkles
  const mixed = colorInner.clone();
  const t = radius / PARAMS.radius;
  if (t < 0.5) mixed.lerpColors(colorInner, colorMid, t / 0.5);
  else mixed.lerpColors(colorMid, colorOuter, (t - 0.5) / 0.5);
  if (Math.random() > 0.93) mixed.copy(colorAccent);

  colors[i3] = mixed.r;
  colors[i3 + 1] = mixed.g;
  colors[i3 + 2] = mixed.b;

  scales[i] = Math.random();
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

/* --- Round, glowing points via a tiny shader --- */
const material = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
  uniforms: {
    uSize: { value: 26 * renderer.getPixelRatio() },
    uTime: { value: 0 },
  },
  vertexShader: /* glsl */ `
    uniform float uSize;
    uniform float uTime;
    attribute float aScale;
    varying vec3 vColor;
    void main() {
      vColor = color;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      // gentle twinkle
      float twinkle = 0.75 + 0.25 * sin(uTime * 2.0 + aScale * 30.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      gl_Position = projectionMatrix * viewPosition;
      gl_PointSize = uSize * aScale * twinkle;
      gl_PointSize *= (1.0 / -viewPosition.z);
    }
  `,
  fragmentShader: /* glsl */ `
    varying vec3 vColor;
    void main() {
      // soft radial falloff → round glowing dot
      float d = distance(gl_PointCoord, vec2(0.5));
      float strength = 1.0 - smoothstep(0.0, 0.5, d);
      strength = pow(strength, 1.6);
      gl_FragColor = vec4(vColor, strength);
    }
  `,
});

const galaxy = new THREE.Points(geometry, material);
scene.add(galaxy);

/* --- A faint field of distant stars for depth --- */
const starGeo = new THREE.BufferGeometry();
const starCount = 800;
const starPos = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 60;
starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
const stars = new THREE.Points(
  starGeo,
  new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.5 })
);
scene.add(stars);

/* --- Cursor parallax --- */
const mouse = { x: 0, y: 0 };
const target = { x: 0, y: 0 };
window.addEventListener("pointermove", (e) => {
  target.x = (e.clientX / window.innerWidth - 0.5) * 2;
  target.y = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* --- Resize --- */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  material.uniforms.uSize.value = 26 * renderer.getPixelRatio();
});

/* --- Animate --- */
const clock = new THREE.Clock();
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function tick() {
  const elapsed = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsed;

  // constant slow spin of the whole galaxy
  if (!reduceMotion) {
    galaxy.rotation.y = elapsed * 0.08;
    stars.rotation.y = -elapsed * 0.01;
  }

  // ease cursor influence
  mouse.x += (target.x - mouse.x) * 0.04;
  mouse.y += (target.y - mouse.y) * 0.04;

  // Cinematic auto-orbit: the camera flies around the galaxy on its own,
  // viewing the disc at a tilt so depth (near edge large, far edge small) is obvious.
  const orbitSpeed = reduceMotion ? 0 : 0.12;
  const angle = elapsed * orbitSpeed + mouse.x * 0.8;      // cursor nudges the orbit
  const distance = 9;
  const height = 3.2 + Math.sin(elapsed * 0.15) * 1.6 - mouse.y * 1.5; // gentle rise/dip
  camera.position.x = Math.sin(angle) * distance;
  camera.position.z = Math.cos(angle) * distance;
  camera.position.y = height;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();
