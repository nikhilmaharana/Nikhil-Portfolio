/**
 * core3d.js — "The Digital Core"
 * A particle sphere with drifting connective threads, rendered on
 * a canvas behind the hero copy. Reacts subtly to pointer position.
 * Fails silently (canvas just stays empty) if Three.js didn't load —
 * the hero copy and layout work fine without it.
 */
(function () {
  const canvas = document.getElementById('coreCanvas');
  if (!canvas) return;
  if (typeof THREE === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall = window.innerWidth < 720;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, isSmall ? 9 : 7);

  // ---- Core: a sphere of points ----
  const CORE_COUNT = isSmall ? 900 : 1800;
  const coreGeo = new THREE.BufferGeometry();
  const corePos = new Float32Array(CORE_COUNT * 3);
  const coreRadius = 2.1;
  for (let i = 0; i < CORE_COUNT; i++) {
    // fibonacci sphere distribution
    const y = 1 - (i / (CORE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    corePos[i * 3] = x * coreRadius;
    corePos[i * 3 + 1] = y * coreRadius;
    corePos[i * 3 + 2] = z * coreRadius;
  }
  coreGeo.setAttribute('position', new THREE.BufferAttribute(corePos, 3));
  const coreMat = new THREE.PointsMaterial({
    color: 0x5cc8ff,
    size: isSmall ? 0.028 : 0.024,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });
  const core = new THREE.Points(coreGeo, coreMat);
  scene.add(core);

  // ---- Outer drifting particle field ----
  const FIELD_COUNT = isSmall ? 300 : 700;
  const fieldGeo = new THREE.BufferGeometry();
  const fieldPos = new Float32Array(FIELD_COUNT * 3);
  for (let i = 0; i < FIELD_COUNT; i++) {
    const radius = 3.2 + Math.random() * 3.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    fieldPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    fieldPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    fieldPos[i * 3 + 2] = radius * Math.cos(phi);
  }
  fieldGeo.setAttribute('position', new THREE.BufferAttribute(fieldPos, 3));
  const fieldMat = new THREE.PointsMaterial({
    color: 0x9fe0ff,
    size: 0.016,
    transparent: true,
    opacity: 0.35,
  });
  const field = new THREE.Points(fieldGeo, fieldMat);
  scene.add(field);

  // ---- Connective ring lines (system nodes) ----
  const ringGroup = new THREE.Group();
  const ringMat = new THREE.LineBasicMaterial({ color: 0x5cc8ff, transparent: true, opacity: 0.18 });
  [2.7, 3.3, 3.9].forEach((r, idx) => {
    const segments = 96;
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.35, Math.sin(a) * r * 0.2));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const ring = new THREE.Line(geo, ringMat);
    ring.rotation.x = Math.PI / 3;
    ring.rotation.z = idx * 0.6;
    ringGroup.add(ring);
  });
  scene.add(ringGroup);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('pointermove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function resize() {
    const hero = document.getElementById('hero');
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  let raf = null;
  let t = 0;

  function animate() {
    t += reduceMotion ? 0.0015 : 0.004;
    core.rotation.y = t * 0.6;
    core.rotation.x = Math.sin(t * 0.3) * 0.15;
    field.rotation.y = -t * 0.15;
    ringGroup.rotation.y = t * 0.25;

    if (!reduceMotion) {
      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
    }

    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  }

  // Pause rendering when hero is off-screen (perf)
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!raf) animate();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    });
  }, { threshold: 0.05 });
  io.observe(document.getElementById('hero'));

  if (reduceMotion) {
    // Render a single static frame instead of a continuous loop.
    renderer.render(scene, camera);
  } else {
    animate();
  }
})();
