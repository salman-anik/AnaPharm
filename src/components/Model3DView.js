import React, { useRef, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';

const ANATOMY_MODULES = [
  require('../assets/anatomy/atlas_skeleton.glb'), require('../assets/anatomy/atlas_muscular.glb'),
  require('../assets/anatomy/atlas_brain.glb'), require('../assets/anatomy/atlas_heart.glb'),
  require('../assets/anatomy/atlas_lungs.glb'), require('../assets/anatomy/atlas_liver.glb'),
  require('../assets/anatomy/atlas_stomach.glb'), require('../assets/anatomy/atlas_kidneys.glb'),
  require('../assets/anatomy/atlas_small_intestine.glb'), require('../assets/anatomy/atlas_large_intestine.glb'),
  require('../assets/anatomy/atlas_trachea.glb'),
];

export default function Model3DView({
  onSelectOrgan,
  isActive = true,
  keepAlive = false,
  autoRotate = false,
  xrayMode = false,
  explodeVal = 0,
  focusRegion = 'all',
  theme = 'dark',
  resetKey = 0,
  showSkeleton = true,
  showMuscles = true,
  muscleOpacity = 0.58,
  organsVisible = {},
}) {
  const webViewRef = useRef(null);
  const [modelUris, setModelUris] = useState(null);
  const [runtime, setRuntime] = useState(null);
  const [assetError, setAssetError] = useState(false);
  const [runtimeError, setRuntimeError] = useState('');
  const shouldRender = isActive || keepAlive;
  const configRef = useRef(null);
  configRef.current = { type: 'CONFIG_UPDATE', autoRotate, xrayMode, explodeVal, focusRegion, theme, showSkeleton, showMuscles, muscleOpacity, organsVisible };

  useEffect(() => {
    let active = true;
    Promise.all(ANATOMY_MODULES.map((moduleId) => Asset.fromModule(moduleId).downloadAsync()))
      .then((assets) => {
        if (active) setModelUris(assets.map((asset) => (__DEV__ ? asset.uri : asset.localUri || asset.uri)));
      })
      .catch((error) => { console.warn('Could not prepare bundled anatomy models:', error); if (active) setAssetError(true); });
    return () => { active = false; };
  }, []);

  // Load the large WebGL runtime only when the user opens the 3D screen.
  useEffect(() => {
    if (!shouldRender || runtime) return;
    try {
      const three = require('../assets/threeBase64');
      const gltf = require('../assets/gltfRuntime');
      setRuntime({ ...three, ...gltf });
    } catch (error) {
      console.warn('Could not load the 3D rendering runtime:', error);
      setRuntimeError(error?.message || 'Could not load the 3D rendering runtime.');
    }
  }, [shouldRender, runtime]);

  const THEME_DATA = {
    dark: { solid: '#091321' },
    light: { solid: '#1d2e44' },
  };
  const getBgSolidForTheme = (t) => (THEME_DATA[t] || THEME_DATA.dark).solid;

  // Send state updates into WebView Three.js scene via postMessage and injectJavaScript
  useEffect(() => {
    if (!webViewRef.current) return;
    const msg = JSON.stringify({
      type: 'CONFIG_UPDATE',
      autoRotate,
      xrayMode,
      explodeVal,
      focusRegion,
      theme,
      showSkeleton,
      showMuscles,
      muscleOpacity,
      organsVisible,
    });
    webViewRef.current.injectJavaScript(`
      if (window.onConfigUpdate) {
        window.onConfigUpdate(${msg});
      }
      true;
    `);
  }, [autoRotate, xrayMode, explodeVal, focusRegion, theme, showSkeleton, showMuscles, muscleOpacity, organsVisible]);

  useEffect(() => {
    webViewRef.current?.injectJavaScript(`if (window.onAppVisibility) window.onAppVisibility(${Boolean(isActive)}); true;`);
  }, [isActive]);

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
      if (data.type === 'MODEL_ERROR') {
        console.error('3D anatomy load failed:', data.message);
        setRuntimeError(data.message || 'Could not read the bundled model files.');
        return;
      }
      if (data.type === 'MODEL_READY') {
        const msg = JSON.stringify(configRef.current);
        webViewRef.current?.injectJavaScript(`if (window.onConfigUpdate) window.onConfigUpdate(${msg}); if (window.onAppVisibility) window.onAppVisibility(${Boolean(isActive)}); true;`);
        return;
      }
      if (data.type === 'ORGAN_CLICKED' && onSelectOrgan) {
        onSelectOrgan(data.organ, data.part);
      }
    } catch (e) {
      console.warn('WebView message parse error:', e);
    }
  };

  const htmlContent = useMemo(() => {
    if (!modelUris || !runtime || !shouldRender) return '';
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <style>
    * { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color: transparent; }
    html, body {
      width:100%; height:100%; overflow:hidden;
      background: radial-gradient(ellipse at 50% 40%, #304a67 0%, #1a2d44 46%, #091321 100%); touch-action:none;
      user-select:none; -webkit-user-select:none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      position:relative;
    }
    body.theme-dark { background:radial-gradient(ellipse at 50% 40%, #304a67 0%, #1a2d44 46%, #091321 100%); }
    body.theme-light { background:radial-gradient(ellipse at 50% 40%, #516b86 0%, #344b65 46%, #1d2e44 100%); }
    body::before { content:""; position:absolute; inset:0; pointer-events:none; opacity:0.55;
      background-image: radial-gradient(ellipse at 50% 38%, rgba(56,189,248,0.13), transparent 58%),
        linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px);
      background-size:auto, 38px 38px, 38px 38px; mask-image:radial-gradient(ellipse at center, black 12%, transparent 88%); }
    body.theme-light::before { opacity:0.5; background-image:radial-gradient(ellipse at 50% 38%, rgba(216,189,248,0.19), transparent 58%), linear-gradient(rgba(226,232,240,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.07) 1px, transparent 1px); }
    body.xray { background:radial-gradient(ellipse at 50% 40%, #112d46 0%, #091827 54%, #050b13 100%); }
    body.xray::before { opacity:0.7; }
    #canvas3d { width:100%; height:100%; display:block; position:relative; z-index:1; }
    #loader {
      position: absolute; inset:0; display:grid; place-items:center; padding:22px;
      pointer-events: none; transition: opacity 0.4s ease;
      z-index: 10; background:linear-gradient(180deg, ${theme === 'dark' ? 'rgba(8,8,12,0.1)' : 'rgba(32,28,43,0.10)'}, ${theme === 'dark' ? 'rgba(8,8,12,0.3)' : 'rgba(32,28,43,0.2)'});
    }
    .loading-card { width:min(320px, calc(100vw - 44px)); padding:20px; color:${theme === 'dark' ? '#fafafa' : '#272433'};
      border:1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(96,75,129,0.18)'}; border-radius:22px;
      background:linear-gradient(145deg, ${theme === 'dark' ? 'rgba(30,30,36,0.97), rgba(17,17,22,0.96)' : 'rgba(255,255,255,0.97), rgba(247,245,251,0.96)'});
      box-shadow:0 22px 70px rgba(0,0,0,0.42), inset 0 1px rgba(255,255,255,0.06);
      backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); }
    .loading-brand { display:flex; align-items:center; gap:13px; margin-bottom:22px; }
    .anatomy-mark { width:48px; height:48px; border-radius:16px; display:grid; place-items:center;
      position:relative; flex:none; color:${theme === 'dark' ? '#e8d9ff' : '#7654a5'}; font-size:23px; font-weight:300;
      border:1px solid ${theme === 'dark' ? 'rgba(216,189,248,0.36)' : 'rgba(118,84,165,0.24)'}; background:radial-gradient(circle at 50% 40%, ${theme === 'dark' ? 'rgba(216,189,248,0.25), rgba(37,28,51,0.92)' : 'rgba(216,189,248,0.52), rgba(246,242,251,0.96)'});
      box-shadow:0 0 28px rgba(156,120,201,0.18); }
    .anatomy-mark::before { content:""; position:absolute; inset:-4px; border:2px solid transparent; border-top-color:#4f8a54; border-right-color:rgba(79,138,84,.28); border-radius:20px; animation:spin 1.35s linear infinite; }
    .anatomy-mark::after { content:""; position:absolute; inset:-8px; border:1px solid rgba(79,138,84,0.25); border-radius:24px; animation:markPulse 2.1s ease-out infinite; }
    .loading-kicker { display:block; color:${theme === 'dark' ? '#DDEEDD' : '#4b744d'}; font-size:8px; font-weight:800; letter-spacing:1.5px; margin-bottom:4px; }
    .loading-title { display:block; font-size:16px; line-height:20px; font-weight:750; letter-spacing:0.1px; }
    .loading-status { display:flex; justify-content:space-between; gap:10px; align-items:center; margin-bottom:9px; }
    #loading-name { color:${theme === 'dark' ? '#c9c6d0' : '#686275'}; font-size:10px; letter-spacing:0.15px; }
    #loading-count { color:${theme === 'dark' ? '#DDEEDD' : '#4b744d'}; font-size:10px; font-weight:800; font-variant-numeric:tabular-nums; }
    .progress-track { height:5px; border-radius:9px; overflow:hidden; background:${theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(74,62,94,0.12)'}; }
    #loading-progress { display:block; height:100%; width:0%; border-radius:9px; background:linear-gradient(90deg,#397842,#77bb78,#DDEEDD); background-size:200% 100%; box-shadow:0 0 12px rgba(79,138,84,0.4); transition:width 0.35s ease; animation:progressGlow 1.8s linear infinite; }
    .loading-steps { display:flex; gap:6px; margin-top:14px; }
    .loading-step { flex:1; padding:7px 5px; border-radius:8px; text-align:center; white-space:nowrap;
      color:${theme === 'dark' ? '#a1a1aa' : '#777180'}; background:${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(74,62,94,0.06)'}; font-size:8px; font-weight:700; letter-spacing:0.25px; }
    .loading-step.active { color:${theme === 'dark' ? '#eadfff' : '#65428f'}; background:${theme === 'dark' ? 'rgba(216,189,248,0.14)' : 'rgba(216,189,248,0.32)'}; box-shadow:inset 0 0 0 1px rgba(167,139,250,0.25); }
    @keyframes markPulse { 0% { transform:scale(.92); opacity:.85; } 100% { transform:scale(1.16); opacity:0; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes progressGlow { to { background-position:200% 0; } }
  </style>
  <script>(1, eval)(atob("${runtime.THREE_B64}"));</script>
  <script>(1, eval)(atob("${runtime.CONTROLS_B64}"));</script>
  <script>(1, eval)(atob("${runtime.GLTF_LOADER_B64}"));</script>
  <script>(1, eval)(atob("${runtime.DRACO_LOADER_B64}"));</script>
</head>
<body class="theme-${theme}">
  <div id="loader"><div class="loading-card">
    <div class="loading-brand"><div class="anatomy-mark">＋</div><div><span class="loading-kicker">ANAPHARM · 3D ATLAS</span><strong class="loading-title">Preparing the body</strong></div></div>
    <div class="loading-status"><span id="loading-name">Preparing local anatomy models…</span><b id="loading-count">0%</b></div>
    <div class="progress-track"><i id="loading-progress"></i></div>
    <div class="loading-steps"><span id="load-step-skeleton" class="loading-step">SKELETON</span><span id="load-step-muscles" class="loading-step">MUSCLES</span><span id="load-step-organs" class="loading-step">ORGANS</span></div>
  </div></div>
  <canvas id="canvas3d"></canvas>

  <script>
    // Bulletproof Three.js decoders
    if (typeof THREE === 'undefined') {
      try {
        var rawThree = atob("${runtime.THREE_B64}");
        (1, eval)(rawThree);
      } catch (err) {
        console.error('Three fallback decode error:', err);
      }
    }
    if (typeof THREE !== 'undefined' && !THREE.OrbitControls) {
      try {
        var rawControls = atob("${runtime.CONTROLS_B64}");
        (1, eval)(rawControls);
      } catch (err) {
        console.error('OrbitControls fallback decode error:', err);
      }
    }
    window.__DRACO_DECODER_SOURCE = atob('${runtime.DRACO_DECODER_B64}');

    var scene, camera, renderer, controls;
    var grid = null;
    var gridRings = null;
    var ambLight = null;
    var hemiLight = null;
    var keyLight = null;
    var rimLight = null;
    var rimWarmLight = null;
    var organMeshes = [];
    var organMap = {};
    var layerGroups = {};
    var muscleMaterials = [];
    var muscleMaterialSet = new Set();
    var lastMuscleOpacity = null;
    var sceneActive = true;
    var animationFrameId = 0;
    var modelUris = ${JSON.stringify(modelUris)};
    var anatomyRoot = null;

    var THEME_PALETTES = {
      dark: {
        bgHex: 0x000000,
        ambIntensity: 0.95,
        hemiSky: 0xffffff,
        hemiGround: 0x1e293b,
        hemiIntensity: 0.90,
        dirIntensity: 1.35,
        rimColor: 0x62d6ff,
        rimIntensity: 1.0,
        rimWarmColor: 0xffedd5,
        rimWarmIntensity: 0.35,
        grid1: 0x0ea5e9,
        grid2: 0x1e293b,
        gridOpacity: 0.09,
        skinColor: 0x38bdf8,
        skinOpacity: 0.18,
        skinRoughness: 0.45,
        toneExposure: 1.28,
        skeletalColor: 0xf5eedc,
      },
      light: {
        bgHex: 0xe4e4e7,
        ambIntensity: 0.85,
        hemiSky: 0xffffff,
        hemiGround: 0x94a3b8,
        hemiIntensity: 0.65,
        dirIntensity: 1.18,
        rimColor: 0x5cc9f5,
        rimIntensity: 0.78,
        rimWarmColor: 0x64748b,
        rimWarmIntensity: 0.25,
        grid1: 0x0284c7,
        grid2: 0xcfd8dc,
        gridOpacity: 0.11,
        skinColor: 0x0284c7,
        skinOpacity: 0.28,
        skinRoughness: 0.65,
        toneExposure: 1.18,
        skeletalColor: 0xf5eedc,
      },
    };

    var config = {
      autoRotate: false,
      xrayMode: false,
      explodeVal: 0,
      focusRegion: 'all',
      theme: '${theme}',
      showSkeleton: true,
      showMuscles: true,
      muscleOpacity: 0.58,
      organsVisible: { brain: true, heart: true, lungs: true, liver: true, stomach: true, kidneys: true, smallIntestine: true, largeIntestine: true, trachea: true }
    };

    var CAM_VIEWS = {
      all:     { p: new THREE.Vector3(0, 10.0, 22.0), t: new THREE.Vector3(0, 9.5, 0) },
      head:    { p: new THREE.Vector3(0, 16.5, 5.8), t: new THREE.Vector3(0, 16.2, 0) },
      thorax:  { p: new THREE.Vector3(0, 12.8, 7.2), t: new THREE.Vector3(0, 12.6, 0) },
      abdomen: { p: new THREE.Vector3(0, 10.5, 6.8), t: new THREE.Vector3(0, 10.3, 0) },
      pelvis:  { p: new THREE.Vector3(0, 6.8, 8.2), t: new THREE.Vector3(0, 6.5, 0) }
    };

    var targetCamPos = CAM_VIEWS.all.p.clone();
    var targetCamLook = CAM_VIEWS.all.t.clone();
    var isCamTransitioning = false;

    function setCameraView(regionKey) {
      var v = CAM_VIEWS[regionKey] || CAM_VIEWS.all;
      targetCamPos.copy(v.p);
      targetCamLook.copy(v.t);
      isCamTransitioning = true;
    }

    function isLayerVisible(id) {
      if (id === 'skeleton') return config.showSkeleton;
      if (id === 'muscles') return config.showMuscles;
      return config.organsVisible[id] !== false;
    }

    function applyLayerSettings() {
      Object.keys(layerGroups).forEach(function(id) { layerGroups[id].visible = isLayerVisible(id); });
      var opacity = Math.max(0.05, Math.min(0.95, config.muscleOpacity));
      if (lastMuscleOpacity === null || Math.abs(lastMuscleOpacity - opacity) > 0.001) {
        muscleMaterials.forEach(function(mat) {
          mat.transparent = opacity < 0.99;
          mat.opacity = opacity;
          mat.depthWrite = opacity >= 0.99;
          mat.needsUpdate = true;
        });
        lastMuscleOpacity = opacity;
      }
    }

    function updateAtlasLoader(index, completed, labels) {
      var progress = Math.round(((index + (completed ? 1 : 0)) / modelUris.length) * 100);
      var progressBar = document.getElementById('loading-progress');
      var count = document.getElementById('loading-count');
      var label = document.getElementById('loading-name');
      if (progressBar) progressBar.style.width = progress + '%';
      if (count) count.textContent = progress + '%';
      if (label) label.textContent = completed ? 'Loaded ' + labels[index] : 'Loading ' + labels[index] + '…';
      var activeStep = index === 0 ? 'skeleton' : index === 1 ? 'muscles' : 'organs';
      ['skeleton','muscles','organs'].forEach(function(step) {
        var item = document.getElementById('load-step-' + step);
        if (item) item.classList.toggle('active', step === activeStep);
      });
    }

    function loadFullBodyAnatomy() {
      var loaderEl = document.getElementById('loader');
      var labels = ['Skeleton','Muscles','Brain','Heart','Lungs','Liver','Stomach','Kidneys','Small bowel','Large bowel','Trachea'];
      var ids = ['skeleton','muscles','brain','heart','lungs','liver','stomach','kidneys','smallIntestine','largeIntestine','trachea'];
      var organKeys = ['Skeleton','Muscles','Brain','Heart','Lungs','Liver','Stomach','Kidneys','Small Intestine','Large Intestine','Trachea'];
      var systems = ['skeletal','muscular','nervous','cardio','respiratory','digestive','digestive','urinary','digestive','digestive','respiratory'];
      var root = new THREE.Group();
      root.rotation.x = -Math.PI / 2;
      scene.add(root);

      var draco = new THREE.DRACOLoader();
      draco.setDecoderConfig({ type: 'js' });
      draco._loadLibrary = function () { return Promise.resolve(window.__DRACO_DECODER_SOURCE); };
      draco.setWorkerLimit(2);
      var gltfLoader = new THREE.GLTFLoader();
      gltfLoader.setDRACOLoader(draco);

      var chain = Promise.resolve();
      var adjustedMuscleMaterials = new Set();
      var layerTints = [null, 0xc93645, 0xcf4c91, 0xe52d43, 0x16a9ba, 0xa94518, 0xd47a16, 0x993c72, 0xc28c16, 0xb95721, 0x148d9c];
      modelUris.forEach(function(uri, index) {
        chain = chain.then(function() {
          updateAtlasLoader(index, false, labels);
          return new Promise(function(resolve, reject) {
            gltfLoader.load(uri, function(gltf) {
              var part = gltf.scene;
              layerGroups[ids[index]] = part;
              part.traverse(function(node) {
                if (!node.isMesh) return;
                node.userData.nameKey = organKeys[index];
                node.userData.system = systems[index];
                if (node.material) {
                  var modelMaterials = Array.isArray(node.material) ? node.material : [node.material];
                  modelMaterials.forEach(function(mat) {
                    if (mat.color && !adjustedMuscleMaterials.has(mat)) {
                      // Keep the source bone and cartilage material colors distinct.
                      if (index !== 0 && layerTints[index]) mat.color.lerp(new THREE.Color(layerTints[index]), index === 1 ? 0.58 : 0.62);
                      if (index === 1) mat.roughness = 0.7;
                      adjustedMuscleMaterials.add(mat);
                    }
                    if (index === 1 && !muscleMaterialSet.has(mat)) {
                      muscleMaterialSet.add(mat);
                      muscleMaterials.push(mat);
                    }
                  });
                }
                node.userData.origColor = node.material && node.material.color ? node.material.color.getHex() : 0xffffff;
                node.userData.origOpacity = 1;
                node.userData.origPos = node.position.clone();
                node.userData.explodeDir = new THREE.Vector3(0, 1, 0);
                organMeshes.push(node);
              });
              root.add(part);
              if (index === 1) lastMuscleOpacity = null;
              applyLayerSettings();
              updateAtlasLoader(index, true, labels);
              resolve();
            }, undefined, reject);
          });
        });
      });

      chain.then(function() {
        var bounds = new THREE.Box3().setFromObject(root);
        var size = bounds.getSize(new THREE.Vector3());
        var center = bounds.getCenter(new THREE.Vector3());
        var scale = 17.2 / (size.y || 1);
        root.scale.setScalar(scale);
        root.position.set(-center.x * scale, 8.65 - center.y * scale, -center.z * scale);
        root.updateMatrixWorld(true);
        if (loaderEl) loaderEl.style.opacity = '0';
        setupTouchRaycaster();
        animate();
        if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'MODEL_READY' }));
      }).catch(function(error) {
        console.error('Full body anatomy could not load:', error);
        if (loaderEl) {
          var label = document.getElementById('loading-name');
          if (label) label.textContent = 'Could not load the anatomy atlas';
          loaderEl.style.opacity = '1';
        }
        if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'MODEL_ERROR', message: String(error && (error.message || error.type) || error || 'Unknown model error')
        }));
      });
    }

    function initScene() {
      var canvas = document.getElementById('canvas3d');
      scene = new THREE.Scene();

      var curPal = THEME_PALETTES[config.theme] || THEME_PALETTES.dark;
      scene.background = null;

      var w = Math.max(window.innerWidth || 0, document.documentElement.clientWidth || 0, 320);
      var h = Math.max(window.innerHeight || 0, document.documentElement.clientHeight || 0, 480);

      camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 140);
      camera.position.copy(CAM_VIEWS.all.p);

      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = curPal.toneExposure;

      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enabled = true;
      controls.enableRotate = true;
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.touches.ONE = THREE.TOUCH.ROTATE;
      controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;
      controls.minDistance = 2.0;
      controls.maxDistance = 55.0;
      controls.rotateSpeed = 0.9;
      controls.zoomSpeed = 1.1;
      controls.maxPolarAngle = Math.PI - 0.05;
      controls.minPolarAngle = 0.05;
      controls.target.copy(CAM_VIEWS.all.t);
      controls.autoRotate = config.autoRotate;
      controls.autoRotateSpeed = 1.6;

      controls.addEventListener('start', function() {
        isCamTransitioning = false;
      });

      ambLight = new THREE.AmbientLight(0xffffff, curPal.ambIntensity);
      scene.add(ambLight);

      hemiLight = new THREE.HemisphereLight(curPal.hemiSky, curPal.hemiGround, curPal.hemiIntensity);
      scene.add(hemiLight);

      keyLight = new THREE.DirectionalLight(0xffffff, curPal.dirIntensity);
      keyLight.position.set(12, 26, 22);
      scene.add(keyLight);

      rimLight = new THREE.DirectionalLight(curPal.rimColor, curPal.rimIntensity);
      rimLight.position.set(-14, 12, -20);
      scene.add(rimLight);

      rimWarmLight = new THREE.DirectionalLight(curPal.rimWarmColor, curPal.rimWarmIntensity);
      rimWarmLight.position.set(14, 8, -16);
      scene.add(rimWarmLight);

      grid = new THREE.GridHelper(28, 28, curPal.grid1, curPal.grid2);
      grid.material.transparent = true;
      grid.material.opacity = curPal.gridOpacity;
      grid.position.y = -0.05;
      scene.add(grid);

      var ringsGroup = new THREE.Group();
      [3.5, 7.0, 10.5].forEach(function(rad) {
        var ringGeo = new THREE.RingGeometry(rad - 0.03, rad, 48);
        var ringMat = new THREE.MeshBasicMaterial({
          color: curPal.grid1,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: curPal.gridOpacity * 0.75
        });
        var ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        ringMesh.position.y = -0.04;
        ringsGroup.add(ringMesh);
      });
      gridRings = ringsGroup;
      scene.add(gridRings);

      loadFullBodyAnatomy();
    }

    function setupTouchRaycaster() {
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      function processHit(clientX, clientY) {
        var w = window.innerWidth || document.documentElement.clientWidth;
        var h = window.innerHeight || document.documentElement.clientHeight;
        mouse.x = (clientX / w) * 2 - 1;
        mouse.y = -(clientY / h) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        var internalHits = organMeshes.filter(function(m) {
          var node = m;
          while (node) { if (!node.visible) return false; node = node.parent; }
          return m.userData.nameKey !== 'Body Surface (Skin)';
        });
        var intersects = raycaster.intersectObjects(internalHits, true);
        var organIntersects = intersects.filter(function(hit) {
          return hit.object.userData.system !== 'skeletal' && hit.object.userData.system !== 'muscular';
        });
        if (organIntersects.length) intersects = organIntersects;
        if (intersects.length > 0) {
          var hitObj = intersects[0].object;
          var organName = hitObj.userData.nameKey;
          if (organName) {
            var hitMaterial = Array.isArray(hitObj.material) ? hitObj.material[0] : hitObj.material;
            var origColor = hitMaterial && hitMaterial.color ? hitMaterial.color.getHex() : null;
            if (origColor !== null) hitMaterial.color.setHex(0x38bdf8);
            setTimeout(function() {
              if (origColor !== null && hitMaterial && hitMaterial.color) hitMaterial.color.setHex(origColor);
            }, 350);

            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'ORGAN_CLICKED',
                organ: organName,
                part: hitObj.name || organName
              }));
            }
          }
        }
      }

      var touchStartX = 0;
      var touchStartY = 0;
      var touchStartTime = 0;
      var isPinching = false;

      window.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
          isPinching = true;
          return;
        }
        isPinching = false;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }, { passive: true });

      window.addEventListener('touchmove', function(e) {
        if (e.touches.length > 1) {
          isPinching = true;
        }
      }, { passive: true });

      window.addEventListener('touchend', function(e) {
        if (isPinching) {
          isPinching = false;
          return;
        }
        var dt = Date.now() - touchStartTime;
        if (dt > 320) return;
        var touch = e.changedTouches && e.changedTouches[0];
        if (!touch) return;

        var dx = touch.clientX - touchStartX;
        var dy = touch.clientY - touchStartY;
        if (Math.sqrt(dx * dx + dy * dy) > 8) return;

        processHit(touch.clientX, touch.clientY);
      }, { passive: false });

      var mouseDownX = 0;
      var mouseDownY = 0;
      var mouseDownTime = 0;

      window.addEventListener('mousedown', function(e) {
        mouseDownX = e.clientX;
        mouseDownY = e.clientY;
        mouseDownTime = Date.now();
      });

      window.addEventListener('mouseup', function(e) {
        var dt = Date.now() - mouseDownTime;
        var dx = e.clientX - mouseDownX;
        var dy = e.clientY - mouseDownY;
        if (dt > 300 || Math.sqrt(dx * dx + dy * dy) > 6) return;
        processHit(e.clientX, e.clientY);
      });
    }

    function applyTheme(themeMode) {
      config.theme = themeMode;
      document.body.classList.toggle('theme-dark', themeMode === 'dark');
      document.body.classList.toggle('theme-light', themeMode !== 'dark');
      var curPal = THEME_PALETTES[themeMode] || THEME_PALETTES.dark;

      if (scene) scene.background = null;

      if (renderer) {
        renderer.toneMappingExposure = curPal.toneExposure;
      }

      if (grid) {
        grid.material.color.setHex(curPal.grid2);
        grid.material.opacity = curPal.gridOpacity;
      }
      if (gridRings) {
        gridRings.children.forEach(function(r) {
          if (r.material) {
            r.material.color.setHex(curPal.grid1);
            r.material.opacity = curPal.gridOpacity * 0.75;
          }
        });
      }

      if (ambLight) ambLight.intensity = curPal.ambIntensity;
      if (hemiLight) {
        hemiLight.intensity = curPal.hemiIntensity;
        hemiLight.color.setHex(curPal.hemiSky);
        hemiLight.groundColor.setHex(curPal.hemiGround);
      }
      if (keyLight) {
        keyLight.intensity = curPal.dirIntensity;
      }
      if (rimLight) {
        rimLight.color.setHex(curPal.rimColor);
        rimLight.intensity = curPal.rimIntensity;
      }
      if (rimWarmLight) {
        rimWarmLight.color.setHex(curPal.rimWarmColor);
        rimWarmLight.intensity = curPal.rimWarmIntensity;
      }

      if (!config.xrayMode) {
        organMeshes.forEach(function(m) {
          if (!m.material) return;
          var isSkin = (m.userData.nameKey === 'Body Surface (Skin)');
          if (isSkin) {
            m.material.color.setHex(curPal.skinColor);
            m.material.opacity = curPal.skinOpacity;
            m.material.roughness = curPal.skinRoughness;
            m.userData.origOpacity = curPal.skinOpacity;
            m.material.needsUpdate = true;
          } else if (m.userData.system === 'skeletal') {
            m.material.color.setHex(m.userData.origColor);
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
      var curPal = THEME_PALETTES[config.theme] || THEME_PALETTES.dark;

      organMeshes.forEach(function(m) {
        if (!m.material) return;
        var isSkin = (m.userData.nameKey === 'Body Surface (Skin)');
        if (isSkin) {
          m.material.transparent = true;
          m.material.opacity = enable ? 0.04 : curPal.skinOpacity;
          m.material.color.setHex(enable ? 0x38bdf8 : curPal.skinColor);
          m.material.needsUpdate = true;
        } else if (m.userData.system === 'skeletal') {
          m.material.transparent = enable;
          m.material.opacity = enable ? 0.95 : 1.0;
          m.material.color.setHex(enable ? 0xe0f2fe : curPal.skeletalColor);
          if (enable) {
            m.material.emissive = new THREE.Color(0x0284c7);
            m.material.emissiveIntensity = 0.38;
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

      if (scene) scene.background = null;
      document.body.classList.toggle('xray', enable);
    }

    function applyExplode(val) {
      organMeshes.forEach(function(m) {
        if (m.userData.origPos && m.userData.explodeDir) {
          m.position.copy(m.userData.origPos).addScaledVector(m.userData.explodeDir, val * 2.5);
        }
      });
    }

    function handleConfigMessage(raw) {
      var msg;
      try {
        msg = typeof raw === 'string' ? JSON.parse(raw) : raw;
      } catch (e) {
        return;
      }
      if (!msg || msg.type !== 'CONFIG_UPDATE') return;

      if (typeof msg.showSkeleton === 'boolean') config.showSkeleton = msg.showSkeleton;
      if (typeof msg.showMuscles === 'boolean') config.showMuscles = msg.showMuscles;
      if (typeof msg.muscleOpacity === 'number') config.muscleOpacity = msg.muscleOpacity;
      if (msg.organsVisible && typeof msg.organsVisible === 'object') config.organsVisible = msg.organsVisible;
      if (typeof msg.autoRotate === 'boolean') {
        config.autoRotate = msg.autoRotate;
        if (controls) controls.autoRotate = config.autoRotate;
      }

      if (typeof msg.xrayMode === 'boolean' && msg.xrayMode !== config.xrayMode) {
        applyXrayMode(msg.xrayMode);
      }

      if (typeof msg.explodeVal === 'number' && msg.explodeVal !== config.explodeVal) {
        config.explodeVal = msg.explodeVal;
        applyExplode(msg.explodeVal);
      }

      if (msg.focusRegion && msg.focusRegion !== config.focusRegion) {
        config.focusRegion = msg.focusRegion;
        setCameraView(msg.focusRegion);
      }

      if (msg.theme && msg.theme !== config.theme) {
        applyTheme(msg.theme);
      }
      applyLayerSettings();
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
    window.onAppVisibility = function(active) {
      sceneActive = Boolean(active);
      if (!sceneActive && animationFrameId && window.cancelAnimationFrame) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      } else if (sceneActive && !animationFrameId) {
        animate();
      }
    };
    window.addEventListener('message', function(e) {
      if (typeof e.data === 'string' && e.data.includes('RESET_VIEW')) {
        resetCamera();
      } else {
        handleConfigMessage(e.data);
      }
    });
    document.addEventListener('message', function(e) {
      if (typeof e.data === 'string' && e.data.includes('RESET_VIEW')) {
        resetCamera();
      } else {
        handleConfigMessage(e.data);
      }
    });

    var lastRenderAt = 0;
    function animate(timestamp) {
      if (!sceneActive) return;
      if (window.requestAnimationFrame) animationFrameId = window.requestAnimationFrame(animate);
      else if (typeof requestAnimationFrame !== 'undefined') animationFrameId = requestAnimationFrame(animate);

      var frameTime = typeof timestamp === 'number' ? timestamp : performance.now();

      if (isCamTransitioning && camera && controls) {
        camera.position.lerp(targetCamPos, 0.08);
        controls.target.lerp(targetCamLook, 0.08);
        if (camera.position.distanceTo(targetCamPos) < 0.05 && controls.target.distanceTo(targetCamLook) < 0.05) {
          camera.position.copy(targetCamPos);
          controls.target.copy(targetCamLook);
          isCamTransitioning = false;
        }
      }

      if (controls) controls.update();
      // Keep camera damping smooth while limiting expensive WebGL draws on mobile.
      if (renderer && scene && camera && frameTime - lastRenderAt >= 1000 / 30) {
        renderer.render(scene, camera);
        lastRenderAt = frameTime;
      }
    }

    function onResize() {
      var w = window.innerWidth || document.documentElement.clientWidth;
      var h = window.innerHeight || document.documentElement.clientHeight;
      if (camera && renderer && w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    }
    window.addEventListener('resize', onResize);
    setTimeout(onResize, 150);
    setTimeout(onResize, 400);

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
  </script>
</body>
</html>
  `;
  }, [modelUris, runtime, shouldRender]);

  return (
    <View style={[styles.container, { backgroundColor: getBgSolidForTheme(theme) }]}>
      {shouldRender && modelUris && runtime ? <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent, baseUrl: modelUris[0].slice(0, modelUris[0].lastIndexOf('/') + 1) }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={false}
        mixedContentMode="always"
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        allowsInlineMediaPlayback={true}
        allowingReadAccessToURL="file:///"
        androidLayerType="hardware"
        androidHardwareAccelerationDisabled={false}
        scrollEnabled={false}
        style={styles.webview}
      /> : shouldRender ? <View style={[styles.loading, { backgroundColor: theme === 'dark' ? '#111115' : '#f5f1fa' }]}>
        <View style={[styles.preflightCard, { backgroundColor: theme === 'dark' ? '#1d1b22' : '#ffffff', borderColor: theme === 'dark' ? '#3b3445' : '#e5dcef' }]}>
          <View style={styles.preflightMark}><Text style={styles.preflightPlus}>＋</Text></View>
          <Text style={styles.preflightKicker}>ANAPHARM · 3D ATLAS</Text>
          <Text style={[styles.preflightTitle, { color: theme === 'dark' ? '#fafafa' : '#292533' }]}>{assetError ? 'Atlas unavailable' : 'Preparing the anatomy'}</Text>
          {assetError ? <Text style={[styles.loadingText, { color: theme === 'dark' ? '#c9c4d0' : '#526653' }]}>The bundled anatomy files could not be prepared.</Text> : <><ActivityIndicator color="#4f8a54" style={styles.preflightSpinner} /><Text style={[styles.loadingText, { color: theme === 'dark' ? '#c9c4d0' : '#526653' }]}>Loading 11 local anatomy models…</Text></>}
        </View>
      </View> : null}
      {!!runtimeError && <View pointerEvents="none" style={styles.errorBanner}><Text style={styles.errorText}>{runtimeError}</Text></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 22 },
  preflightCard: { width: '100%', maxWidth: 320, alignItems: 'center', borderWidth: 1, borderRadius: 22, padding: 22, elevation: 16 },
  preflightMark: { width: 52, height: 52, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E8F2E5', borderWidth: 1, borderColor: '#A9CBAA', marginBottom: 14 },
  preflightPlus: { color: '#7654a5', fontSize: 26, fontWeight: '300' },
  preflightKicker: { color: '#4b744d', fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
  preflightTitle: { fontSize: 17, fontWeight: '800', marginTop: 6 },
  preflightSpinner: { marginTop: 18 },
  loadingText: { fontSize: 11, fontWeight: '600', textAlign: 'center', lineHeight: 16, marginTop: 10 },
  errorBanner: { position: 'absolute', bottom: 120, left: 16, right: 16, padding: 10, borderRadius: 10, backgroundColor: '#7f1d1d' },
  errorText: { color: '#fff', fontSize: 11 },
});
