import React, { useRef, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { THREE_B64, CONTROLS_B64 } from '../assets/threeBase64';
import { OBJ_LOADER_B64, BP3D_MODELS_B64 } from '../assets/bp3dBundle';

export default function Model3DView({
  onSelectOrgan,
  bpm = 72,
  respRate = 16,
  autoRotate = false,
  xrayMode = false,
  explodeVal = 0,
  focusRegion = 'all',
  theme = 'dark',
}) {
  const webViewRef = useRef(null);

  // Send state updates into WebView Three.js scene via both postMessage and injectJavaScript
  useEffect(() => {
    if (!webViewRef.current) return;
    const msg = JSON.stringify({
      type: 'CONFIG_UPDATE',
      bpm,
      respRate,
      autoRotate,
      xrayMode,
      explodeVal,
      focusRegion,
      theme,
    });
    // 1. PostMessage
    webViewRef.current.postMessage(msg);
    // 2. Direct JavaScript injection fallback (bulletproof on Android)
    webViewRef.current.injectJavaScript(`
      if (window.onConfigUpdate) {
        window.onConfigUpdate(${msg});
      }
      true;
    `);
  }, [bpm, respRate, autoRotate, xrayMode, explodeVal, focusRegion, theme]);

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'ORGAN_CLICKED' && onSelectOrgan) {
        onSelectOrgan(data.organ);
      }
    } catch (e) {
      console.warn('WebView message parse error:', e);
    }
  };

  // Memoize htmlContent so WebView doesn't reload on every render!
  const htmlContent = useMemo(() => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <style>
    * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color: transparent; }
    html, body {
      width:100%; height:100%; overflow:hidden;
      background-color: #020617; touch-action:none;
      user-select:none; -webkit-user-select:none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #canvas3d { width:100%; height:100%; display:block; }
    #loader {
      position: absolute; top:50%; left:50%;
      transform: translate(-50%, -50%);
      color: #38bdf8; font-size: 13px; font-weight: 600;
      letter-spacing: 0.5px;
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      pointer-events: none; transition: opacity 0.4s ease;
      z-index: 10;
    }
    .spinner {
      width: 34px; height: 34px;
      border: 3px solid rgba(56, 189, 248, 0.2);
      border-top-color: #38bdf8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    #tooltip {
      position: absolute; bottom: 22px; left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.94);
      border: 1px solid rgba(56, 189, 248, 0.5);
      color: #f8fafc; padding: 7px 18px; border-radius: 22px;
      font-size: 13px; font-weight: 600; pointer-events: none;
      opacity: 0; transition: opacity 0.25s, transform 0.25s;
      white-space: nowrap; box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      z-index: 20;
    }
    #tooltip.visible { opacity: 1; transform: translateX(-50%) translateY(-6px); }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <div id="loader"><div class="spinner"></div><span>Loading Authentic 3D Medical Models...</span></div>
  <div id="tooltip"></div>
  <canvas id="canvas3d"></canvas>

  <script>
    // Bulletproof Three.js loader
    if (typeof THREE === 'undefined') {
      try {
        const rawThree = atob("${THREE_B64}");
        (1, eval)(rawThree);
      } catch (err) {
        console.error('Three fallback decode error:', err);
      }
    }
    if (typeof THREE !== 'undefined' && !THREE.OrbitControls) {
      try {
        const rawControls = atob("${CONTROLS_B64}");
        (1, eval)(rawControls);
      } catch (err) {
        console.error('OrbitControls fallback decode error:', err);
      }
    }
    if (typeof THREE !== 'undefined' && !THREE.OBJLoader) {
      try {
        const rawLoader = atob("${OBJ_LOADER_B64}");
        (1, eval)(rawLoader);
      } catch (err) {
        console.error('OBJLoader fallback decode error:', err);
      }
    }

    const BP3D_DATA = ${JSON.stringify(BP3D_MODELS_B64)};
    let objLoader = null;

    let scene, camera, renderer, controls;
    let organMeshes = [];
    let organMap = {};
    let heartMesh = null;
    let rightLungMesh = null;
    let leftLungMesh = null;
    let bloodPoints = null;
    let bloodSpeeds = [];
    let bloodCount = 130;

    let config = {
      bpm: 72,
      respRate: 16,
      autoRotate: false,
      xrayMode: false,
      explodeVal: 0,
      focusRegion: 'all',
      theme: 'dark'
    };

    const CAM_VIEWS = {
      all:     { p: new THREE.Vector3(0, 11, 30), t: new THREE.Vector3(0, 9.5, 0) },
      head:    { p: new THREE.Vector3(0, 16.8, 8), t: new THREE.Vector3(0, 16.5, 0) },
      thorax:  { p: new THREE.Vector3(0, 13.5, 9.5), t: new THREE.Vector3(0, 13.2, 0) },
      abdomen: { p: new THREE.Vector3(0, 11, 9), t: new THREE.Vector3(0, 10.8, 0) },
      pelvis:  { p: new THREE.Vector3(0, 8.0, 10.5), t: new THREE.Vector3(0, 7.5, 0) }
    };

    let targetCamPos = CAM_VIEWS.all.p.clone();
    let targetCamLook = CAM_VIEWS.all.t.clone();
    let isCamTransitioning = false;

    function setCameraView(regionKey) {
      const v = CAM_VIEWS[regionKey] || CAM_VIEWS.all;
      targetCamPos.copy(v.p);
      targetCamLook.copy(v.t);
      isCamTransitioning = true;
    }

    function startApp() {
      if (typeof THREE === 'undefined' || !THREE.OrbitControls || !THREE.OBJLoader) {
        setTimeout(startApp, 50);
        return;
      }
      objLoader = new THREE.OBJLoader();
      initScene();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startApp);
    } else {
      startApp();
    }

    function initScene() {
      const canvas = document.getElementById('canvas3d');
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x020617);

      const w = Math.max(window.innerWidth || 0, document.documentElement.clientWidth || 0, 320);
      const h = Math.max(window.innerHeight || 0, document.documentElement.clientHeight || 0, 480);

      camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 120);
      camera.position.copy(CAM_VIEWS.all.p);

      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 3;
      controls.maxDistance = 55;
      controls.target.copy(CAM_VIEWS.all.t);
      controls.autoRotate = false;
      controls.autoRotateSpeed = 1.6;

      // Lighting
      const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambLight);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x182438, 0.85);
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.05);
      dirLight.position.set(12, 24, 20);
      scene.add(dirLight);

      const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
      rimLight.position.set(-12, 10, -18);
      scene.add(rimLight);

      // Subtle Ground Grid
      const grid = new THREE.GridHelper(26, 26, 0x0ea5e9, 0x1e293b);
      grid.material.transparent = true;
      grid.material.opacity = 0.22;
      grid.position.y = -0.05;
      scene.add(grid);

      // Build Authentic Medical Anatomy & Dynamic Blood Particles
      buildFullAnatomy();
      buildBloodParticles();

      // Touch Raycast
      setupTouchRaycaster();

      // Hide Loader
      const loader = document.getElementById('loader');
      if (loader) loader.style.opacity = '0';

      animate();
    }

    // Geometry Helpers for procedural accents
    const S = (r) => new THREE.SphereGeometry(r, 26, 20);
    const C = (rt, rb, h) => new THREE.CylinderGeometry(rt, rb, h, 20);
    const T = (r, t) => new THREE.TorusGeometry(r, t, 12, 28);
    const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);

    // Loader for BodyParts3D authentic medical meshes
    function loadBP3DOrgan(key, nameKey, system, colorHex, opts = {}) {
      if (!BP3D_DATA || !BP3D_DATA[key] || !objLoader) return null;
      try {
        const rawObj = atob(BP3D_DATA[key]);
        const group = objLoader.parse(rawObj);

        const mat = new THREE.MeshStandardMaterial({
          color: colorHex,
          roughness: system === 'skeletal' ? 0.38 : (system === 'cardio' ? 0.28 : 0.52),
          metalness: system === 'cardio' ? 0.25 : 0.08,
          transparent: Boolean(opts.opacity && opts.opacity < 1),
          opacity: opts.opacity || 1.0,
          side: THREE.DoubleSide
        });

        const created = [];
        group.traverse(child => {
          if (child.isMesh && child.geometry) {
            child.material = mat.clone();

            // Transform BodyParts3D millimeter coordinates into Three.js meter units
            const pos = child.geometry.attributes.position;
            for (let i = 0; i < pos.count; i++) {
              const rx = pos.getX(i);
              const ry = pos.getY(i);
              const rz = pos.getZ(i);

              // X lateral, Z cranial/caudal, Y anterior/posterior
              const x = rx * 0.01;
              const y = rz * 0.01;
              const z = -(ry + 115) * 0.01;
              pos.setXYZ(i, x, y, z);
            }
            pos.needsUpdate = true;
            child.geometry.computeVertexNormals();
            child.geometry.computeBoundingBox();

            // Compute organ centroid for local scaling & outward anatomical explosion
            const center = new THREE.Vector3();
            child.geometry.boundingBox.getCenter(center);
            child.geometry.center();
            child.position.copy(center);

            child.userData = {
              nameKey: nameKey,
              system: system,
              origColor: colorHex,
              origOpacity: opts.opacity || 1.0,
              origPos: child.position.clone(),
              origScale: child.scale.clone(),
              explodeDir: new THREE.Vector3(center.x, center.y - 9.5, center.z).normalize()
            };

            scene.add(child);
            organMeshes.push(child);
            if (!organMap[nameKey]) organMap[nameKey] = [];
            organMap[nameKey].push(child);
            created.push(child);
          }
        });

        return created.length === 1 ? created[0] : (created.length > 0 ? created[0] : null);
      } catch (err) {
        console.error('Error loading BP3D organ ' + key + ':', err);
        return null;
      }
    }

    function registerOrgan(system, nameKey, geo, colorHex, x, y, z, opts = {}) {
      const isSkin = (nameKey === 'Body Surface (Skin)');
      const mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: system === 'skeletal' ? 0.42 : (system === 'cardio' ? 0.28 : 0.55),
        metalness: system === 'cardio' ? 0.25 : 0.05,
        transparent: isSkin || (opts.opacity && opts.opacity < 1),
        opacity: isSkin ? 0.16 : (opts.opacity || 1.0),
        depthWrite: !isSkin,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      if (opts.s) mesh.scale.set(opts.s[0], opts.s[1], opts.s[2]);
      if (opts.r) mesh.rotation.set(opts.r[0], opts.r[1], opts.r[2]);

      mesh.userData = {
        nameKey: nameKey,
        system: system,
        origColor: colorHex,
        origOpacity: isSkin ? 0.16 : (opts.opacity || 1.0),
        origPos: mesh.position.clone(),
        origScale: mesh.scale.clone(),
        explodeDir: new THREE.Vector3(x, y - 9.5, z).normalize()
      };

      scene.add(mesh);
      organMeshes.push(mesh);
      if (!organMap[nameKey]) organMap[nameKey] = [];
      organMap[nameKey].push(mesh);
      return mesh;
    }

    function registerBilateral(system, nameKey, geoFunc, colorHex, x, y, z, opts = {}) {
      const left = registerOrgan(system, nameKey, geoFunc(), colorHex, x, y, z, opts);
      const optsR = Object.assign({}, opts);
      if (opts.r) optsR.r = [opts.r[0], -opts.r[1], -opts.r[2]];
      const right = registerOrgan(system, nameKey, geoFunc(), colorHex, -x, y, z, optsR);
      return { left, right };
    }

    function buildFullAnatomy() {
      const SK = 0xede6d2;
      const CA = 0xd63031;
      const NE = 0xf1c40f;
      const RE = 0xe07c8c;
      const DI = 0xe67e22;
      const UR = 0x00cec9;
      const MU = 0xbd4646;
      const IN = 0xdfa78b;

      // 1. SKELETAL SYSTEM (Authentic BodyParts3D Skull, Spine & Femurs + Rib Cage)
      loadBP3DOrgan('skull', 'Skull (Cranium)', 'skeletal', SK);
      loadBP3DOrgan('spine', 'Thoracic & Lumbar Spine', 'skeletal', SK);
      loadBP3DOrgan('femurR', 'Femur', 'skeletal', SK);
      loadBP3DOrgan('femurL', 'Femur', 'skeletal', SK);

      registerOrgan('skeletal', 'Rib Cage', B(0.38, 2.4, 0.14), SK, 0, 13.5, 0.98); // Sternum
      [1.3, 1.5, 1.62, 1.6, 1.5, 1.35].forEach((rad, i) => {
        registerOrgan('skeletal', 'Rib Cage', T(rad, 0.075), SK, 0, 14.6 - i * 0.48, 0.05, {
          s: [1, 0.62, 1], r: [Math.PI / 2 + 0.08, 0, 0]
        });
      });

      // 2. CARDIOVASCULAR SYSTEM (Authentic BP3D Heart + Aorta System)
      heartMesh = loadBP3DOrgan('heart', 'Heart', 'cardio', CA);
      loadBP3DOrgan('aorta', 'Heart', 'cardio', 0xe11d48);
      registerOrgan('cardio', 'Heart', C(0.16, 0.16, 4.6), 0x2563eb, -0.2, 12.8, -0.1); // Vena Cava

      // 3. NERVOUS SYSTEM (Authentic BP3D Brain Hemispheres + Peripheral Nerves)
      loadBP3DOrgan('brain', 'Brain (Cerebrum & Cortex)', 'nervous', NE);
      registerBilateral('nervous', 'Sciatic Nerve', () => C(0.07, 0.05, 4.2), NE, 0.82, 6.7, -0.2);

      // 4. RESPIRATORY SYSTEM (Authentic BP3D Left & Right Lungs + Trachea)
      rightLungMesh = loadBP3DOrgan('lungR', 'Lungs (Pulmonary Lobes)', 'respiratory', RE, { opacity: 0.88 });
      leftLungMesh = loadBP3DOrgan('lungL', 'Lungs (Pulmonary Lobes)', 'respiratory', RE, { opacity: 0.88 });
      loadBP3DOrgan('trachea', 'Lungs (Pulmonary Lobes)', 'respiratory', 0xd1d5db);

      // 5. DIGESTIVE SYSTEM (Authentic BP3D Stomach, Liver, Gallbladder & Pancreas + Intestines)
      loadBP3DOrgan('stomach', 'Stomach', 'digestive', DI);
      loadBP3DOrgan('liver', 'Liver', 'digestive', 0xb45309);
      loadBP3DOrgan('gallbladder', 'Gallbladder', 'digestive', 0x84cc16);
      loadBP3DOrgan('pancreas', 'Pancreas', 'digestive', 0xf59e0b);

      registerOrgan('digestive', 'Spleen', S(0.35), 0x9333ea, 1.15, 11.9, 0.1, { s: [0.8, 1.2, 0.6] });
      registerOrgan('digestive', 'Small Intestine', T(0.68, 0.28), 0xfb923c, 0, 10.3, 0.22, { r: [Math.PI / 2, 0, 0] });
      registerOrgan('digestive', 'Large Intestine (Colon)', T(1.08, 0.22), 0xd97706, 0, 10.3, 0.18, { r: [Math.PI / 2, 0, 0] });
      registerOrgan('digestive', 'Appendix', C(0.04, 0.04, 0.35), 0xe11d48, -0.88, 9.4, 0.45, { r: [0.3, 0, 0.6] });

      // 6. URINARY & ENDOCRINE (Authentic BP3D Kidneys & Urinary Bladder + Thyroid)
      loadBP3DOrgan('kidneyR', 'Kidneys', 'urinary', UR);
      loadBP3DOrgan('kidneyL', 'Kidneys', 'urinary', UR);
      loadBP3DOrgan('bladder', 'Kidneys', 'urinary', 0x0284c7);
      registerOrgan('urinary', 'Thyroid Gland', S(0.32), 0xa855f7, 0, 14.6, 0.45, { s: [1.2, 0.6, 0.5] });

      // 7. MUSCULAR SYSTEM
      registerBilateral('muscular', 'Pectoralis Major', () => B(0.9, 0.8, 0.18), MU, 0.75, 13.6, 0.85, { r: [0, -0.2, 0.15] });

      // 8. INTEGUMENTARY SYSTEM (Translucent Protective Skin Shell)
      registerOrgan('integumentary', 'Body Surface (Skin)', S(1.08), IN, 0, 16.8, 0, { s: [0.95, 1.12, 1.05] });
      registerOrgan('integumentary', 'Body Surface (Skin)', C(0.5, 0.55, 1.2), IN, 0, 15.4, 0);
      registerOrgan('integumentary', 'Body Surface (Skin)', C(2.1, 1.6, 3.4), IN, 0, 13.4, 0, { s: [1, 1, 0.64] });
      registerOrgan('integumentary', 'Body Surface (Skin)', C(1.6, 1.5, 2.5), IN, 0, 10.9, 0, { s: [1, 1, 0.66] });
      registerOrgan('integumentary', 'Body Surface (Skin)', C(1.5, 1.25, 1.8), IN, 0, 9.1, 0, { s: [1.05, 1, 0.72] });
      registerBilateral('integumentary', 'Body Surface (Skin)', () => C(0.55, 0.45, 2.9), IN, 2.5, 13.0, 0);
      registerBilateral('integumentary', 'Body Surface (Skin)', () => C(0.8, 0.58, 4.3), IN, 0.88, 6.9, 0);
    }

    function buildBloodParticles() {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(bloodCount * 3);
      const col = new Float32Array(bloodCount * 3);
      bloodSpeeds = new Float32Array(bloodCount);

      for (let i = 0; i < bloodCount; i++) {
        const isArtery = (i % 2 === 0);
        const progress = Math.random();
        const y = 16.5 - progress * 14.5;
        const x = (Math.random() - 0.5) * (y < 8.8 ? 1.8 : 0.8);
        const z = (Math.random() - 0.5) * 0.4;
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        if (isArtery) {
          col[i * 3] = 0.95; col[i * 3 + 1] = 0.12; col[i * 3 + 2] = 0.18;
        } else {
          col[i * 3] = 0.15; col[i * 3 + 1] = 0.45; col[i * 3 + 2] = 0.95;
        }
        bloodSpeeds[i] = 0.03 + Math.random() * 0.04;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.18,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      bloodPoints = new THREE.Points(geo, mat);
      scene.add(bloodPoints);
    }

    function applyXrayMode(enable) {
      config.xrayMode = enable;
      organMeshes.forEach(m => {
        if (!m.material) return;
        if (m.userData.nameKey === 'Body Surface (Skin)') {
          m.material.transparent = true;
          m.material.opacity = enable ? 0.04 : 0.16;
          m.material.color.setHex(enable ? 0x38bdf8 : m.userData.origColor);
          m.material.needsUpdate = true;
        } else if (m.userData.system === 'skeletal') {
          m.material.transparent = enable;
          m.material.opacity = enable ? 0.95 : 1.0;
          m.material.color.setHex(enable ? 0xe0f2fe : m.userData.origColor);
          if (enable) {
            m.material.emissive = new THREE.Color(0x0284c7);
            m.material.emissiveIntensity = 0.35;
          } else {
            m.material.emissive = new THREE.Color(0x000000);
            m.material.emissiveIntensity = 0;
          }
          m.material.needsUpdate = true;
        } else {
          m.material.transparent = enable;
          m.material.opacity = enable ? 0.28 : (m.userData.origOpacity || 1.0);
          m.material.color.setHex(enable ? 0x0284c7 : m.userData.origColor);
          if (enable) {
            m.material.emissive = new THREE.Color(0x0369a1);
            m.material.emissiveIntensity = 0.25;
          } else {
            m.material.emissive = new THREE.Color(0x000000);
            m.material.emissiveIntensity = 0;
          }
          m.material.needsUpdate = true;
        }
      });
      if (scene) {
        scene.background.setHex(enable ? 0x000814 : (config.theme === 'light' ? 0xf1f5f9 : 0x020617));
      }
    }

    function applyExplode(val) {
      organMeshes.forEach(m => {
        if (m.userData.origPos && m.userData.explodeDir) {
          m.position.copy(m.userData.origPos).addScaledVector(m.userData.explodeDir, val * 2.5);
        }
      });
    }

    function setupTouchRaycaster() {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const tooltip = document.getElementById('tooltip');
      let tooltipTimer = null;

      function showTooltip(text) {
        if (!tooltip) return;
        tooltip.textContent = text;
        tooltip.classList.add('visible');
        clearTimeout(tooltipTimer);
        tooltipTimer = setTimeout(() => {
          tooltip.classList.remove('visible');
        }, 2200);
      }

      window.addEventListener('pointerdown', (e) => {
        const w = window.innerWidth || document.documentElement.clientWidth;
        const h = window.innerHeight || document.documentElement.clientHeight;
        mouse.x = (e.clientX / w) * 2 - 1;
        mouse.y = -(e.clientY / h) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const hitList = organMeshes.filter(m => m.userData.nameKey !== 'Body Surface (Skin)');
        const intersects = raycaster.intersectObjects(hitList, true);

        if (intersects.length > 0) {
          const hitObj = intersects[0].object;
          const organName = hitObj.userData.nameKey;
          if (organName) {
            showTooltip(organName);
            const origColor = hitObj.material.color.getHex();
            hitObj.material.color.setHex(0x38bdf8);
            setTimeout(() => {
              if (hitObj.material) hitObj.material.color.setHex(origColor);
            }, 350);

            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'ORGAN_CLICKED',
                organ: organName
              }));
            }
          }
        }
      });
    }

    // Unified message handler for BOTH Android and iOS WebView:
    function handleConfigMessage(raw) {
      let msg;
      try {
        msg = typeof raw === 'string' ? JSON.parse(raw) : raw;
      } catch (e) {
        return;
      }
      if (!msg || msg.type !== 'CONFIG_UPDATE') return;

      if (typeof msg.bpm === 'number') config.bpm = msg.bpm;
      if (typeof msg.respRate === 'number') config.respRate = msg.respRate;

      if (typeof msg.autoRotate === 'boolean') {
        config.autoRotate = msg.autoRotate;
        if (controls) controls.autoRotate = config.autoRotate;
      }

      if (typeof msg.xrayMode === 'boolean') {
        applyXrayMode(msg.xrayMode);
      }

      if (typeof msg.explodeVal === 'number') {
        applyExplode(msg.explodeVal);
      }

      if (msg.focusRegion) {
        setCameraView(msg.focusRegion);
      }

      if (msg.theme && !config.xrayMode && scene) {
        config.theme = msg.theme;
        scene.background.setHex(msg.theme === 'light' ? 0xf1f5f9 : 0x020617);
      }
    }

    // Global hook for injectJavaScript:
    window.onConfigUpdate = handleConfigMessage;

    // Listen to both window and document events:
    window.addEventListener('message', (e) => handleConfigMessage(e.data));
    document.addEventListener('message', (e) => handleConfigMessage(e.data));

    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth Camera Interpolation
      if (isCamTransitioning && camera && controls) {
        camera.position.lerp(targetCamPos, 0.08);
        controls.target.lerp(targetCamLook, 0.08);
        if (camera.position.distanceTo(targetCamPos) < 0.05 && controls.target.distanceTo(targetCamLook) < 0.05) {
          camera.position.copy(targetCamPos);
          controls.target.copy(targetCamLook);
          isCamTransitioning = false;
        }
      }

      // Cardiac Cycle Pulsing
      if (heartMesh && heartMesh.userData && heartMesh.userData.origScale) {
        const cardiacCycle = Math.sin(time * (config.bpm / 60) * Math.PI * 2);
        const beatScale = 1 + (cardiacCycle > 0.4 ? Math.sin((cardiacCycle - 0.4) * 5) * 0.12 : 0);
        heartMesh.scale.set(
          heartMesh.userData.origScale.x * beatScale,
          heartMesh.userData.origScale.y * (1 + (beatScale - 1) * 0.4),
          heartMesh.userData.origScale.z * beatScale
        );
      }

      // Respiratory Cycle
      const respBreath = Math.sin(time * (config.respRate / 60) * Math.PI * 2) * 0.08;
      if (rightLungMesh && rightLungMesh.userData && rightLungMesh.userData.origScale) {
        rightLungMesh.scale.set(
          rightLungMesh.userData.origScale.x * (1 + respBreath),
          rightLungMesh.userData.origScale.y * (1 + respBreath * 0.5),
          rightLungMesh.userData.origScale.z * (1 + respBreath)
        );
      }
      if (leftLungMesh && leftLungMesh.userData && leftLungMesh.userData.origScale) {
        leftLungMesh.scale.set(
          leftLungMesh.userData.origScale.x * (1 + respBreath),
          leftLungMesh.userData.origScale.y * (1 + respBreath * 0.5),
          leftLungMesh.userData.origScale.z * (1 + respBreath)
        );
      }

      // Blood Circulation Particles
      if (bloodPoints) {
        const positions = bloodPoints.geometry.attributes.position.array;
        for (let i = 0; i < bloodCount; i++) {
          positions[i * 3 + 1] -= bloodSpeeds[i];
          if (positions[i * 3 + 1] < 2.0) {
            positions[i * 3 + 1] = 16.5;
          }
        }
        bloodPoints.geometry.attributes.position.needsUpdate = true;
      }

      if (controls) controls.update();
      if (renderer && scene && camera) renderer.render(scene, camera);
    }

    function onResize() {
      const w = window.innerWidth || document.documentElement.clientWidth;
      const h = window.innerHeight || document.documentElement.clientHeight;
      if (camera && renderer && w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    }
    window.addEventListener('resize', onResize);
    setTimeout(onResize, 150);
    setTimeout(onResize, 400);
  </script>
</body>
</html>
  `, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        allowsInlineMediaPlayback={true}
        androidLayerType="hardware"
        androidHardwareAccelerationDisabled={false}
        scrollEnabled={false}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#020617',
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});
