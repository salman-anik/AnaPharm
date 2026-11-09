import React, { useRef, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { THREE_B64, CONTROLS_B64 } from '../assets/threeBase64';

export default function Model3DView({
  onSelectOrgan,
  bpm = 72,
  respRate = 16,
  autoRotate = false,
  xrayMode = false,
  explodeVal = 0,
  focusRegion = 'all',
  theme = 'dark',
  resetKey = 0,
}) {
  const webViewRef = useRef(null);

  const getBgCssForTheme = (t) => {
    if (t === 'light') return '#e2e8f0';
    return '#000000'; // Pure OLED Black
  };

  const getBgHexForTheme = (t) => {
    if (t === 'light') return '0xe2e8f0';
    return '0x000000'; // Pure OLED Black
  };

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
    webViewRef.current.postMessage(msg);
    webViewRef.current.injectJavaScript(`
      if (window.onConfigUpdate) {
        window.onConfigUpdate(${msg});
      }
      true;
    `);
  }, [bpm, respRate, autoRotate, xrayMode, explodeVal, focusRegion, theme]);

  // Handle explicit 3D camera reset trigger
  useEffect(() => {
    if (!webViewRef.current || resetKey === 0) return;
    webViewRef.current.injectJavaScript(`
      if (window.onResetView) {
        window.onResetView();
      }
      true;
    `);
  }, [resetKey]);

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
      background-color: ${getBgCssForTheme(theme)}; touch-action:none;
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
  <div id="loader"><div class="spinner"></div><span>Rendering 3D Human Anatomy...</span></div>
  <div id="tooltip"></div>
  <canvas id="canvas3d"></canvas>

  <script>
    // Bulletproof Three.js decoders
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

    let scene, camera, renderer, controls;
    let grid = null;
    let ambLight = null;
    let hemiLight = null;
    let dirLight = null;
    let rimLight = null;
    let organMeshes = [];
    let organMap = {};
    let heartMesh = null;
    let rightLungMesh = null;
    let leftLungMesh = null;
    let bloodPoints = null;
    let bloodSpeeds = [];
    let bloodCount = 100;

    let config = {
      bpm: 72,
      respRate: 16,
      autoRotate: false,
      xrayMode: false,
      explodeVal: 0,
      focusRegion: 'all',
      theme: '${theme}'
    };

    const CAM_VIEWS = {
      all:     { p: new THREE.Vector3(0, 10.0, 22), t: new THREE.Vector3(0, 9.5, 0) },
      head:    { p: new THREE.Vector3(0, 16.5, 6.0), t: new THREE.Vector3(0, 16.2, 0) },
      thorax:  { p: new THREE.Vector3(0, 12.8, 7.5), t: new THREE.Vector3(0, 12.6, 0) },
      abdomen: { p: new THREE.Vector3(0, 10.5, 7.0), t: new THREE.Vector3(0, 10.3, 0) },
      pelvis:  { p: new THREE.Vector3(0, 6.8, 8.5), t: new THREE.Vector3(0, 6.5, 0) }
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
      if (typeof THREE === 'undefined' || !THREE.OrbitControls) {
        setTimeout(startApp, 50);
        return;
      }
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
      scene.background = new THREE.Color(${getBgHexForTheme(theme)});

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
      controls.minDistance = 2.0;
      controls.maxDistance = 55.0;
      controls.rotateSpeed = 0.9;
      controls.zoomSpeed = 1.1;
      controls.maxPolarAngle = Math.PI - 0.05;
      controls.minPolarAngle = 0.05;
      controls.target.copy(CAM_VIEWS.all.t);
      controls.autoRotate = false;
      controls.autoRotateSpeed = 1.6;

      // Stop programmatic camera transitions when user touches controls
      controls.addEventListener('start', () => {
        isCamTransitioning = false;
      });

      // Studio Medical Lighting
      ambLight = new THREE.AmbientLight(0xffffff, ${theme === 'light' ? 0.75 : 0.95});
      scene.add(ambLight);

      hemiLight = new THREE.HemisphereLight(0xffffff, ${theme === 'light' ? '0x94a3b8' : '0x1e293b'}, ${theme === 'light' ? 0.55 : 0.9});
      scene.add(hemiLight);

      dirLight = new THREE.DirectionalLight(0xffffff, ${theme === 'light' ? 0.95 : 1.1});
      dirLight.position.set(12, 24, 20);
      scene.add(dirLight);

      rimLight = new THREE.DirectionalLight(${theme === 'light' ? '0x0284c7' : '0x38bdf8'}, ${theme === 'light' ? 0.5 : 0.7});
      rimLight.position.set(-12, 10, -18);
      scene.add(rimLight);

      // Anatomical Ground Grid
      grid = new THREE.GridHelper(26, 26, 0x0ea5e9, 0x1e293b);
      grid.material.transparent = true;
      grid.material.opacity = ${theme === 'light' ? '0.35' : '0.22'};
      grid.position.y = -0.05;
      scene.add(grid);

      // Build the Complete Human Anatomy System
      buildFullHumanAnatomy();
      buildBloodParticles();

      // Touch Raycast setup
      setupTouchRaycaster();

      // Hide Loader
      const loader = document.getElementById('loader');
      if (loader) loader.style.opacity = '0';

      animate();
    }

    // High-performance geometry generators
    const S = (r, ws = 28, hs = 20) => new THREE.SphereGeometry(r, ws, hs);
    const C = (rt, rb, h, rs = 22) => new THREE.CylinderGeometry(rt, rb, h, rs);
    const T = (r, t, rs = 16, cs = 28) => new THREE.TorusGeometry(r, t, rs, cs);
    const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);

    function registerOrgan(system, nameKey, geo, colorHex, x, y, z, opts = {}) {
      const isSkin = (nameKey === 'Body Surface (Skin)');
      const isLight = config.theme === 'light';

      let matColor = colorHex;
      let matOpacity = opts.opacity || 1.0;
      let matRoughness = system === 'skeletal' ? 0.35 : (system === 'cardio' ? 0.22 : 0.48);

      if (isSkin) {
        matColor = isLight ? 0x0284c7 : 0x38bdf8;
        matOpacity = isLight ? 0.34 : 0.20;
        matRoughness = isLight ? 0.65 : 0.45;
      } else if (system === 'skeletal' && isLight) {
        matColor = 0xd9cebc;
      }

      const mat = new THREE.MeshStandardMaterial({
        color: matColor,
        roughness: matRoughness,
        metalness: isSkin ? 0.05 : (system === 'cardio' ? 0.22 : 0.05),
        transparent: isSkin || Boolean(opts.opacity && opts.opacity < 1),
        opacity: matOpacity,
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
        origOpacity: isSkin ? (isLight ? 0.34 : 0.20) : (opts.opacity || 1.0),
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

    function buildFullHumanAnatomy() {
      const SK = 0xf5eedb; // Ivory bone
      const CA = 0xe11d48; // Heart deep arterial crimson
      const NE = 0xfacc15; // Brain cortex gold
      const RE = 0xf472b6; // Lungs pulmonary soft rose
      const DI = 0xf97316; // Stomach warm coral
      const UR = 0x06b6d4; // Kidneys cyan
      const MU = 0xc2410c; // Muscular terracotta
      const IN = 0x38bdf8; // Body surface / skin translucent cyan-sky

      // ==========================================
      // 1. INTEGUMENTARY SYSTEM (COMPLETE HUMAN BODY & HANDS)
      // ==========================================
      // Head & Neck
      registerOrgan('integumentary', 'Body Surface (Skin)', S(1.02), IN, 0, 16.7, 0, { s: [0.96, 1.15, 1.06] });
      registerOrgan('integumentary', 'Body Surface (Skin)', C(0.48, 0.55, 1.2), IN, 0, 15.2, 0);
      // Torso (Chest & Abdomen)
      registerOrgan('integumentary', 'Body Surface (Skin)', C(2.1, 1.7, 3.5), IN, 0, 13.3, 0, { s: [1, 1, 0.68] });
      registerOrgan('integumentary', 'Body Surface (Skin)', C(1.65, 1.55, 2.6), IN, 0, 10.8, 0, { s: [1, 1, 0.68] });
      registerOrgan('integumentary', 'Body Surface (Skin)', C(1.55, 1.35, 1.8), IN, 0, 9.0, 0, { s: [1.06, 1, 0.74] });
      // Shoulders & Arms
      registerBilateral('integumentary', 'Body Surface (Skin)', () => S(0.68), IN, 2.45, 14.1, 0);
      registerBilateral('integumentary', 'Body Surface (Skin)', () => C(0.42, 0.35, 3.2), IN, 2.7, 12.2, 0, { r: [0, 0, -0.22] });
      registerBilateral('integumentary', 'Body Surface (Skin)', () => C(0.35, 0.28, 3.0), IN, 3.4, 9.6, 0, { r: [0, 0, -0.15] });
      // HANDS, PALMS & FINGERS
      registerBilateral('integumentary', 'Body Surface (Skin)', () => B(0.36, 0.85, 0.18), IN, 3.85, 7.8, 0, { r: [0, 0, -0.1] });
      registerBilateral('integumentary', 'Body Surface (Skin)', () => C(0.06, 0.05, 0.45), IN, 3.75, 7.15, 0); // Finger thumb
      registerBilateral('integumentary', 'Body Surface (Skin)', () => C(0.05, 0.04, 0.5), IN, 3.9, 7.1, 0);  // Middle fingers
      // Legs (Thighs, Knees, Calves, Feet)
      registerBilateral('integumentary', 'Body Surface (Skin)', () => C(0.72, 0.52, 4.2), IN, 0.95, 6.8, 0);
      registerBilateral('integumentary', 'Body Surface (Skin)', () => S(0.48), IN, 0.95, 4.6, 0.05); // Patella/Knee
      registerBilateral('integumentary', 'Body Surface (Skin)', () => C(0.48, 0.34, 4.4), IN, 0.95, 2.4, 0);
      registerBilateral('integumentary', 'Body Surface (Skin)', () => B(0.55, 0.28, 1.4), IN, 0.95, 0.15, 0.35); // Foot

      // ==========================================
      // 2. CARDIOVASCULAR SYSTEM (THE HEART!)
      // ==========================================
      // Prominent, anatomically detailed human heart in the central chest cavity
      heartMesh = registerOrgan('cardio', 'Heart', S(0.85), CA, 0.32, 12.8, 0.38, {
        s: [1.15, 1.35, 0.95],
        r: [0.15, 0, 0.38]
      });
      // Left and right atria auricles
      registerOrgan('cardio', 'Heart', S(0.42), 0xbe123c, 0.55, 13.4, 0.28, { s: [1, 0.8, 0.8] });
      registerOrgan('cardio', 'Heart', S(0.38), 0x9f1239, 0.05, 13.3, 0.32, { s: [1, 0.8, 0.8] });
      // Aortic Arch & Major Vessels
      registerOrgan('cardio', 'Heart', T(0.48, 0.16, 14, 28), 0xef4444, 0.22, 13.7, 0.18, {
        r: [0, 0, Math.PI / 2 + 0.3]
      });
      registerOrgan('cardio', 'Heart', C(0.18, 0.16, 5.2), 0xef4444, 0.16, 11.8, -0.2); // Descending Aorta
      registerOrgan('cardio', 'Heart', C(0.18, 0.18, 4.8), 0x2563eb, -0.22, 12.4, -0.15); // Superior & Inferior Vena Cava
      registerBilateral('cardio', 'Heart', () => C(0.09, 0.07, 1.6), 0xef4444, 0.45, 14.8, 0.1); // Carotid Arteries

      // ==========================================
      // 3. NERVOUS SYSTEM (THE BRAIN & NERVES)
      // ==========================================
      // Left & Right Cerebral Hemispheres
      registerOrgan('nervous', 'Brain (Cerebrum & Cortex)', S(0.78), NE, -0.38, 16.9, 0.05, { s: [0.85, 0.88, 1.1] });
      registerOrgan('nervous', 'Brain (Cerebrum & Cortex)', S(0.78), NE, 0.38, 16.9, 0.05, { s: [0.85, 0.88, 1.1] });
      // Cerebellum & Brainstem
      registerOrgan('nervous', 'Brain (Cerebrum & Cortex)', S(0.48), 0xd97706, 0, 15.8, -0.35, { s: [1.2, 0.7, 0.8] });
      registerOrgan('nervous', 'Brain (Cerebrum & Cortex)', C(0.12, 0.1, 1.2), 0xf59e0b, 0, 15.0, -0.2); // Brainstem
      // Sciatic Nerves
      registerBilateral('nervous', 'Sciatic Nerve', () => C(0.06, 0.04, 4.4), NE, 0.88, 6.6, -0.2);

      // ==========================================
      // 4. RESPIRATORY SYSTEM (THE LUNGS & TRACHEA)
      // ==========================================
      // Right Lung (3 lobes, larger)
      rightLungMesh = registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', S(0.85), RE, -0.82, 12.9, 0.1, {
        s: [0.82, 1.65, 0.85],
        opacity: 0.92
      });
      // Left Lung (2 lobes, with cardiac notch for heart)
      leftLungMesh = registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', S(0.78), RE, 0.88, 12.9, 0.08, {
        s: [0.75, 1.58, 0.8],
        opacity: 0.92
      });
      // Trachea & Primary Bronchi
      registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', C(0.14, 0.14, 1.8), 0xe2e8f0, 0, 14.5, 0.35);
      registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', C(0.1, 0.08, 0.8), 0xe2e8f0, -0.28, 13.5, 0.2, { r: [0, 0, 0.6] });
      registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', C(0.1, 0.08, 0.8), 0xe2e8f0, 0.28, 13.5, 0.2, { r: [0, 0, -0.6] });

      // ==========================================
      // 5. DIGESTIVE SYSTEM (STOMACH, LIVER, INTESTINES)
      // ==========================================
      // Stomach (J-shaped gastric reservoir)
      registerOrgan('digestive', 'Stomach', S(0.68), DI, 0.58, 11.2, 0.35, {
        s: [1.15, 0.95, 0.85],
        r: [0, 0, 0.45]
      });
      // Liver (Large prominent wedge in right hypochondrium)
      registerOrgan('digestive', 'Liver', S(0.95), 0xb45309, -0.75, 11.4, 0.3, {
        s: [1.35, 0.72, 0.92],
        r: [0, 0, -0.15]
      });
      // Gallbladder
      registerOrgan('digestive', 'Gallbladder', S(0.2), 0x84cc16, -0.52, 10.7, 0.62, { s: [0.75, 1.35, 0.75] });
      // Pancreas
      registerOrgan('digestive', 'Pancreas', B(1.1, 0.26, 0.28), 0xf59e0b, 0.15, 10.8, 0.08, { r: [0, 0, 0.18] });
      // Spleen
      registerOrgan('digestive', 'Spleen', S(0.36), 0x9333ea, 1.25, 11.5, 0.12, { s: [0.8, 1.25, 0.65] });
      // Small Intestine (Central abdomen coils)
      registerOrgan('digestive', 'Small Intestine', T(0.72, 0.32, 14, 26), 0xfb923c, 0, 9.8, 0.25, { r: [Math.PI / 2, 0, 0] });
      // Large Intestine (Colon perimeter framing the small intestine)
      registerOrgan('digestive', 'Large Intestine (Colon)', T(1.12, 0.24, 16, 28), 0xd97706, 0, 9.8, 0.2, { r: [Math.PI / 2, 0, 0] });
      // Appendix
      registerOrgan('digestive', 'Appendix', C(0.04, 0.04, 0.4), 0xe11d48, -0.92, 8.8, 0.42, { r: [0.3, 0, 0.5] });

      // ==========================================
      // 6. URINARY & ENDOCRINE
      // ==========================================
      // Kidneys (Bilateral retroperitoneal organs)
      registerBilateral('urinary', 'Kidneys', () => S(0.38), UR, 0.82, 10.6, -0.45, { s: [0.72, 1.3, 0.65] });
      // Urinary Bladder
      registerOrgan('urinary', 'Kidneys', S(0.45), 0x0284c7, 0, 8.1, 0.35, { s: [1.1, 0.9, 0.95] });
      // Thyroid Gland
      registerOrgan('urinary', 'Thyroid Gland', S(0.34), 0xa855f7, 0, 14.7, 0.52, { s: [1.25, 0.65, 0.5] });

      // ==========================================
      // 7. SKELETAL SYSTEM (COMPLETE BONES & JOINTS)
      // ==========================================
      // Skull (Cranium & Facial Skeleton)
      registerOrgan('skeletal', 'Skull (Cranium)', S(1.02), SK, 0, 16.7, 0, { s: [0.92, 1.1, 1.08] });
      registerOrgan('skeletal', 'Skull (Cranium)', B(0.72, 0.45, 0.65), SK, 0, 15.6, 0.45); // Maxilla & Mandible
      // Vertebral Column (Cervical, Thoracic & Lumbar Spine)
      registerOrgan('skeletal', 'Thoracic & Lumbar Spine', C(0.22, 0.26, 6.8, 16), SK, 0, 11.6, -0.55);
      // Rib Cage & Sternum
      registerOrgan('skeletal', 'Rib Cage', B(0.38, 2.6, 0.14), SK, 0, 13.0, 0.98); // Sternum
      [1.25, 1.45, 1.6, 1.62, 1.55, 1.45, 1.3].forEach((rad, i) => {
        registerOrgan('skeletal', 'Rib Cage', T(rad, 0.075, 12, 28), SK, 0, 14.2 - i * 0.42, 0.08, {
          s: [1, 0.62, 1], r: [Math.PI / 2 + 0.08, 0, 0]
        });
      });
      // Clavicles (Collarbones)
      registerBilateral('skeletal', 'Rib Cage', () => C(0.08, 0.08, 1.7), SK, 1.15, 14.3, 0.45, { r: [0, 0, -1.35] });
      // Pelvic Basin
      registerOrgan('skeletal', 'Thoracic & Lumbar Spine', T(1.15, 0.22, 12, 24), SK, 0, 8.5, 0, {
        s: [1.1, 0.8, 1], r: [Math.PI / 2, 0, 0]
      });
      // Arm Bones
      registerBilateral('skeletal', 'Femur', () => C(0.14, 0.12, 3.2), SK, 2.7, 12.2, 0, { r: [0, 0, -0.22] }); // Humerus
      registerBilateral('skeletal', 'Femur', () => C(0.1, 0.09, 3.0), SK, 3.4, 9.6, 0, { r: [0, 0, -0.15] });  // Forearm
      // Hand Bones (Carpals & Metacarpals)
      registerBilateral('skeletal', 'Femur', () => B(0.28, 0.65, 0.1), SK, 3.85, 7.8, 0, { r: [0, 0, -0.1] });
      // Leg Bones (Femurs, Tibia/Fibula)
      registerBilateral('skeletal', 'Femur', () => C(0.18, 0.16, 4.4), SK, 0.95, 6.6, 0); // Femur
      registerBilateral('skeletal', 'Femur', () => C(0.15, 0.12, 4.4), SK, 0.95, 2.4, 0); // Tibia/Fibula

      // ==========================================
      // 8. MUSCULAR SYSTEM
      // ==========================================
      registerBilateral('muscular', 'Pectoralis Major', () => B(0.95, 0.85, 0.18), MU, 0.75, 13.3, 0.86, {
        r: [0, -0.18, 0.15]
      });
    }

    function buildBloodParticles() {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(bloodCount * 3);
      const col = new Float32Array(bloodCount * 3);
      bloodSpeeds = new Float32Array(bloodCount);

      for (let i = 0; i < bloodCount; i++) {
        const isArtery = (i % 2 === 0);
        const progress = Math.random();
        const y = 16.0 - progress * 13.0; // Y from 3.0 to 16.0
        const x = (Math.random() - 0.5) * (y < 8.5 ? 1.6 : 0.6);
        const z = (Math.random() - 0.5) * 0.35;
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        if (isArtery) {
          col[i * 3] = 0.95; col[i * 3 + 1] = 0.12; col[i * 3 + 2] = 0.22;
        } else {
          col[i * 3] = 0.15; col[i * 3 + 1] = 0.55; col[i * 3 + 2] = 0.95;
        }
        bloodSpeeds[i] = 0.025 + Math.random() * 0.035;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.16,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      bloodPoints = new THREE.Points(geo, mat);
      scene.add(bloodPoints);
    }

    function getThemeHex(mode) {
      if (mode === 'light') return 0xe2e8f0;
      if (mode === 'blue_dark') return 0x020617;
      if (mode === 'purple_dark') return 0x090414;
      if (mode === 'emerald_dark') return 0x02120b;
      return 0x000000;
    }

    function applyTheme(themeMode) {
      config.theme = themeMode;
      const isLight = (themeMode === 'light');
      const bgHex = getThemeHex(themeMode);

      if (scene && !config.xrayMode) {
        scene.background.setHex(bgHex);
      }

      if (grid) {
        grid.material.opacity = isLight ? 0.32 : 0.22;
      }

      if (ambLight) ambLight.intensity = isLight ? 0.75 : 0.95;
      if (hemiLight) {
        hemiLight.intensity = isLight ? 0.55 : 0.9;
        hemiLight.groundColor.setHex(isLight ? 0x94a3b8 : 0x1e293b);
      }
      if (dirLight) dirLight.intensity = isLight ? 0.95 : 1.1;
      if (rimLight) {
        rimLight.color.setHex(isLight ? 0x0284c7 : 0x38bdf8);
        rimLight.intensity = isLight ? 0.5 : 0.7;
      }

      if (!config.xrayMode) {
        organMeshes.forEach(m => {
          if (!m.material) return;
          const isSkin = (m.userData.nameKey === 'Body Surface (Skin)');
          if (isSkin) {
            m.material.color.setHex(isLight ? 0x0284c7 : 0x38bdf8);
            m.material.opacity = isLight ? 0.34 : 0.20;
            m.material.roughness = isLight ? 0.65 : 0.45;
            m.userData.origOpacity = isLight ? 0.34 : 0.20;
            m.material.needsUpdate = true;
          } else if (m.userData.system === 'skeletal') {
            m.material.color.setHex(isLight ? 0xd9cebc : m.userData.origColor);
            m.material.needsUpdate = true;
          } else {
            m.material.color.setHex(m.userData.origColor);
            m.material.opacity = m.userData.origOpacity;
            m.material.needsUpdate = true;
          }
        });
      }
    }

    function applyXrayMode(enable) {
      config.xrayMode = enable;
      organMeshes.forEach(m => {
        if (!m.material) return;
        if (m.userData.nameKey === 'Body Surface (Skin)') {
          m.material.transparent = true;
          m.material.opacity = enable ? 0.04 : (config.theme === 'light' ? 0.34 : 0.20);
          m.material.color.setHex(enable ? 0x38bdf8 : (config.theme === 'light' ? 0x0284c7 : 0x38bdf8));
          m.material.needsUpdate = true;
        } else if (m.userData.system === 'skeletal') {
          m.material.transparent = enable;
          m.material.opacity = enable ? 0.95 : 1.0;
          m.material.color.setHex(enable ? 0xe0f2fe : (config.theme === 'light' ? 0xd9cebc : m.userData.origColor));
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
        scene.background.setHex(enable ? 0x000814 : getThemeHex(config.theme));
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

      function processHit(clientX, clientY) {
        const w = window.innerWidth || document.documentElement.clientWidth;
        const h = window.innerHeight || document.documentElement.clientHeight;
        mouse.x = (clientX / w) * 2 - 1;
        mouse.y = -(clientY / h) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        // Prioritize internal visceral organs before the transparent skin
        const internalHits = organMeshes.filter(m => m.userData.nameKey !== 'Body Surface (Skin)');
        let intersects = raycaster.intersectObjects(internalHits, true);
        if (intersects.length === 0) {
          intersects = raycaster.intersectObjects(organMeshes, true);
        }

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
      }

      // Mobile Touch Handling: Prevent click on drag-to-rotate or pinch-to-zoom
      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;
      let isPinching = false;

      const dom = renderer ? renderer.domElement : window;

      window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
          isPinching = true;
          return;
        }
        isPinching = false;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
          isPinching = true;
        }
      }, { passive: true });

      window.addEventListener('touchend', (e) => {
        if (isPinching) {
          isPinching = false;
          return;
        }
        const dt = Date.now() - touchStartTime;
        if (dt > 320) {
          // Dragged/held for rotation - DO NOT click
          return;
        }
        const touch = e.changedTouches && e.changedTouches[0];
        if (!touch) return;

        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
        if (Math.sqrt(dx * dx + dy * dy) > 7) {
          // Moved more than 7px - user was rotating, DO NOT click
          return;
        }

        // Clean stationary tap on organ
        processHit(touch.clientX, touch.clientY);
      }, { passive: false });

      // Desktop Mouse Fallback
      let mouseDownX = 0;
      let mouseDownY = 0;
      let mouseDownTime = 0;

      window.addEventListener('mousedown', (e) => {
        mouseDownX = e.clientX;
        mouseDownY = e.clientY;
        mouseDownTime = Date.now();
      });

      window.addEventListener('mouseup', (e) => {
        const dt = Date.now() - mouseDownTime;
        const dx = e.clientX - mouseDownX;
        const dy = e.clientY - mouseDownY;
        if (dt > 300 || Math.sqrt(dx * dx + dy * dy) > 6) return;
        processHit(e.clientX, e.clientY);
      });
    }

    // Unified message handler for BOTH Android and iOS WebView
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

      if (msg.theme) {
        applyTheme(msg.theme);
      }
    }

    function resetCamera() {
      if (controls) {
        controls.reset();
      }
      targetCamPos.copy(CAM_VIEWS.all.p);
      targetCamLook.copy(CAM_VIEWS.all.t);
      if (camera && controls) {
        camera.position.copy(CAM_VIEWS.all.p);
        controls.target.copy(CAM_VIEWS.all.t);
        camera.lookAt(CAM_VIEWS.all.t);
        controls.update();
      }
      isCamTransitioning = true;
    }

    window.onConfigUpdate = handleConfigMessage;
    window.onResetView = resetCamera;
    window.addEventListener('message', (e) => {
      if (typeof e.data === 'string' && e.data.includes('RESET_VIEW')) {
        resetCamera();
      } else {
        handleConfigMessage(e.data);
      }
    });
    document.addEventListener('message', (e) => {
      if (typeof e.data === 'string' && e.data.includes('RESET_VIEW')) {
        resetCamera();
      } else {
        handleConfigMessage(e.data);
      }
    });

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

      // Cardiac Cycle Pulsing (Heart visibly beats!)
      if (heartMesh && heartMesh.userData && heartMesh.userData.origScale) {
        const cardiacCycle = Math.sin(time * (config.bpm / 60) * Math.PI * 2);
        const beatScale = 1 + (cardiacCycle > 0.35 ? Math.sin((cardiacCycle - 0.35) * 5) * 0.16 : 0);
        heartMesh.scale.set(
          heartMesh.userData.origScale.x * beatScale,
          heartMesh.userData.origScale.y * (1 + (beatScale - 1) * 0.5),
          heartMesh.userData.origScale.z * beatScale
        );
      }

      // Respiratory Cycle (Lungs expand and contract!)
      const respBreath = Math.sin(time * (config.respRate / 60) * Math.PI * 2) * 0.09;
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

      // Dynamic Circulating Blood Particles
      if (bloodPoints) {
        const positions = bloodPoints.geometry.attributes.position.array;
        for (let i = 0; i < bloodCount; i++) {
          positions[i * 3 + 1] -= bloodSpeeds[i];
          if (positions[i * 3 + 1] < 2.5) {
            positions[i * 3 + 1] = 16.0;
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
  `, [theme]);

  return (
    <View style={[styles.container, theme === 'light' && styles.containerLight]}>
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
  containerLight: {
    backgroundColor: '#f8fafc',
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});
