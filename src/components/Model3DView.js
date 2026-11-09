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

  const THEME_DATA = {
    dark: { css: '#000000', hex: '0x000000' },
    light: { css: '#e4e4e7', hex: '0xe4e4e7' },
  };

  const getBgCssForTheme = (t) => {
    return (THEME_DATA[t] || THEME_DATA.dark).css;
  };

  const getBgHexForTheme = (t) => {
    return (THEME_DATA[t] || THEME_DATA.dark).hex;
  };

  // Send state updates into WebView Three.js scene via postMessage and injectJavaScript
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
      width: 36px; height: 36px;
      border: 3px solid rgba(56, 189, 248, 0.2);
      border-top-color: #38bdf8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    #tooltip {
      position: absolute; bottom: 24px; left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.94);
      border: 1px solid rgba(56, 189, 248, 0.6);
      color: #ffffff; padding: 8px 20px; border-radius: 24px;
      font-size: 13px; font-weight: 700; pointer-events: none;
      opacity: 0; transition: opacity 0.25s, transform 0.25s;
      white-space: nowrap; box-shadow: 0 4px 24px rgba(0,0,0,0.6);
      z-index: 20;
      display: flex; align-items: center; gap: 8px;
    }
    #tooltip.visible { opacity: 1; transform: translateX(-50%) translateY(-6px); }
    #tooltip-dot {
      width: 8px; height: 8px; border-radius: 4px;
      background: #38bdf8; box-shadow: 0 0 8px #38bdf8;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <div id="loader"><div class="spinner"></div><span>Rendering 3D Human Anatomy...</span></div>
  <div id="tooltip"><span id="tooltip-dot"></span><span id="tooltip-text"></span></div>
  <canvas id="canvas3d"></canvas>

  <script>
    // Bulletproof Three.js decoders
    if (typeof THREE === 'undefined') {
      try {
        var rawThree = atob("${THREE_B64}");
        (1, eval)(rawThree);
      } catch (err) {
        console.error('Three fallback decode error:', err);
      }
    }
    if (typeof THREE !== 'undefined' && !THREE.OrbitControls) {
      try {
        var rawControls = atob("${CONTROLS_B64}");
        (1, eval)(rawControls);
      } catch (err) {
        console.error('OrbitControls fallback decode error:', err);
      }
    }

    // Hoisted Geometry Generators
    function S(r, ws, hs) { return new THREE.SphereGeometry(r, ws || 28, hs || 22); }
    function C(rt, rb, h, rs) { return new THREE.CylinderGeometry(rt, rb, h, rs || 22); }
    function T(r, t, rs, cs) { return new THREE.TorusGeometry(r, t, rs || 16, cs || 28); }
    function B(w, h, d) { return new THREE.BoxGeometry(w, h, d); }
    function Cone(r, h, rs) { return new THREE.ConeGeometry(r, h, rs || 22); }

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
    var heartGroup = null;
    var rightLungGroup = null;
    var leftLungGroup = null;
    var bloodPoints = null;
    var bloodSpeeds = [];
    var bloodCount = 140;
    var clock = new THREE.Clock();

    var THEME_PALETTES = {
      dark: {
        bgHex: 0x000000,
        ambIntensity: 0.95,
        hemiSky: 0xffffff,
        hemiGround: 0x1e293b,
        hemiIntensity: 0.90,
        dirIntensity: 1.15,
        rimColor: 0x38bdf8,
        rimIntensity: 0.85,
        rimWarmColor: 0xffedd5,
        rimWarmIntensity: 0.35,
        grid1: 0x0ea5e9,
        grid2: 0x1e293b,
        gridOpacity: 0.22,
        skinColor: 0x38bdf8,
        skinOpacity: 0.18,
        skinRoughness: 0.45,
        toneExposure: 1.15,
        skeletalColor: 0xf5eedb,
      },
      light: {
        bgHex: 0xe4e4e7,
        ambIntensity: 0.85,
        hemiSky: 0xffffff,
        hemiGround: 0x94a3b8,
        hemiIntensity: 0.65,
        dirIntensity: 1.00,
        rimColor: 0x0284c7,
        rimIntensity: 0.55,
        rimWarmColor: 0x64748b,
        rimWarmIntensity: 0.25,
        grid1: 0x0284c7,
        grid2: 0xcfd8dc,
        gridOpacity: 0.34,
        skinColor: 0x0284c7,
        skinOpacity: 0.28,
        skinRoughness: 0.65,
        toneExposure: 1.05,
        skeletalColor: 0xd9cebc,
      },
    };

    var config = {
      bpm: 72,
      respRate: 16,
      autoRotate: false,
      xrayMode: false,
      explodeVal: 0,
      focusRegion: 'all',
      theme: '${theme}'
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

    function registerOrgan(system, nameKey, geo, colorHex, x, y, z, opts) {
      opts = opts || {};
      var isSkin = (nameKey === 'Body Surface (Skin)');
      var curPal = THEME_PALETTES[config.theme] || THEME_PALETTES.dark;

      var matColor = colorHex;
      var matOpacity = opts.opacity !== undefined ? opts.opacity : 1.0;
      var matRoughness = system === 'skeletal' ? 0.38 : (system === 'cardio' ? 0.20 : 0.44);
      var matMetalness = isSkin ? 0.05 : (system === 'cardio' ? 0.18 : 0.06);

      if (isSkin) {
        matColor = curPal.skinColor;
        matOpacity = curPal.skinOpacity;
        matRoughness = curPal.skinRoughness;
      } else if (system === 'skeletal') {
        matColor = curPal.skeletalColor;
      }

      var mat = new THREE.MeshStandardMaterial({
        color: matColor,
        roughness: matRoughness,
        metalness: matMetalness,
        transparent: isSkin || Boolean(opts.opacity && opts.opacity < 1),
        opacity: matOpacity,
        depthWrite: !isSkin,
        side: THREE.DoubleSide
      });

      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      if (opts.s) mesh.scale.set(opts.s[0], opts.s[1], opts.s[2]);
      if (opts.r) mesh.rotation.set(opts.r[0], opts.r[1], opts.r[2]);

      mesh.userData = {
        nameKey: nameKey,
        system: system,
        origColor: colorHex,
        origOpacity: isSkin ? curPal.skinOpacity : (opts.opacity !== undefined ? opts.opacity : 1.0),
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

    function registerBilateral(system, nameKey, geoFunc, colorHex, x, y, z, opts) {
      opts = opts || {};
      var left = registerOrgan(system, nameKey, geoFunc(), colorHex, x, y, z, opts);
      var optsR = Object.assign({}, opts);
      if (opts.r) optsR.r = [opts.r[0], -opts.r[1], -opts.r[2]];
      var right = registerOrgan(system, nameKey, geoFunc(), colorHex, -x, y, z, optsR);
      return { left: left, right: right };
    }

    function buildUpgradedHumanAnatomy() {
      var curPal = THEME_PALETTES[config.theme] || THEME_PALETTES.dark;
      var SK = curPal.skeletalColor;
      var CA = 0xe11d48;
      var NE = 0xfacc15;
      var RE = 0xf472b6;
      var DI = 0xf97316;
      var UR = 0x06b6d4;
      var MU = 0xc2410c;
      var IN = curPal.skinColor;

      // 1. Integumentary (Skin)
      registerOrgan('integumentary', 'Body Surface (Skin)', S(1.06), IN, 0, 16.8, 0, { s: [0.94, 1.15, 1.04] });
      registerOrgan('integumentary', 'Body Surface (Skin)', B(0.72, 0.55, 0.7), IN, 0, 15.75, 0.38, { r: [0.1, 0, 0] });
      registerOrgan('integumentary', 'Body Surface (Skin)', C(0.46, 0.58, 1.3), IN, 0, 15.1, 0);
      registerOrgan('integumentary', 'Body Surface (Skin)', C(2.15, 1.75, 3.4), IN, 0, 13.4, 0, { s: [1, 1, 0.7] });
      registerOrgan('integumentary', 'Body Surface (Skin)', C(1.7, 1.52, 2.5), IN, 0, 10.9, 0, { s: [1, 1, 0.68] });
      registerOrgan('integumentary', 'Body Surface (Skin)', C(1.58, 1.40, 1.9), IN, 0, 9.1, 0, { s: [1.06, 1, 0.74] });
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return S(0.72); }, IN, 2.45, 14.15, 0);
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return C(0.44, 0.36, 3.2); }, IN, 2.72, 12.2, 0, { r: [0, 0, -0.22] });
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return C(0.36, 0.26, 3.0); }, IN, 3.42, 9.6, 0, { r: [0, 0, -0.15] });
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return B(0.42, 0.82, 0.16); }, IN, 3.85, 7.85, 0, { r: [0, 0, -0.1] });
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return C(0.065, 0.05, 0.46); }, IN, 3.65, 7.4, 0.08, { r: [0.3, 0, 0.4] });
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return C(0.055, 0.045, 0.52); }, IN, 3.78, 7.12, 0.02);
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return C(0.058, 0.046, 0.55); }, IN, 3.88, 7.08, 0.01);
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return C(0.054, 0.044, 0.51); }, IN, 3.98, 7.12, 0.0);
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return C(0.048, 0.038, 0.44); }, IN, 4.07, 7.18, -0.01);
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return C(0.74, 0.54, 4.2); }, IN, 0.95, 6.8, 0);
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return S(0.50); }, IN, 0.95, 4.6, 0.06);
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return C(0.50, 0.32, 4.4); }, IN, 0.95, 2.4, 0);
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return B(0.56, 0.28, 1.45); }, IN, 0.95, 0.15, 0.32);
      registerBilateral('integumentary', 'Body Surface (Skin)', function() { return B(0.52, 0.22, 0.42); }, IN, 0.95, 0.12, 1.1);

      // 2. Cardio (Heart & Great Vessels)
      var heartMeshes = [];
      var hVent = registerOrgan('cardio', 'Heart', S(0.86), CA, 0.32, 12.8, 0.38, { s: [1.14, 1.34, 0.95], r: [0.15, 0, 0.38] });
      var hApex = registerOrgan('cardio', 'Heart', Cone(0.42, 0.8), 0xbe123c, 0.48, 12.35, 0.44, { r: [Math.PI + 0.2, 0, 0.35] });
      var hRV = registerOrgan('cardio', 'Heart', S(0.54), 0x9f1239, 0.12, 12.75, 0.46, { s: [0.95, 1.1, 0.85] });
      var hLA = registerOrgan('cardio', 'Heart', S(0.44), 0xbe123c, 0.58, 13.45, 0.28, { s: [1, 0.85, 0.8] });
      var hRA = registerOrgan('cardio', 'Heart', S(0.42), 0x9f1239, 0.02, 13.35, 0.32, { s: [1, 0.85, 0.8] });
      heartMeshes.push(hVent, hApex, hRV, hLA, hRA);

      registerOrgan('cardio', 'Heart', T(0.50, 0.16, 16, 32), 0xef4444, 0.22, 13.75, 0.20, { r: [0, 0, Math.PI / 2 + 0.32] });
      registerOrgan('cardio', 'Heart', C(0.08, 0.08, 0.75), 0xef4444, 0.06, 14.3, 0.22, { r: [0, 0, -0.3] });
      registerOrgan('cardio', 'Heart', C(0.075, 0.075, 0.85), 0xef4444, 0.22, 14.4, 0.18, { r: [0, 0, 0.05] });
      registerOrgan('cardio', 'Heart', C(0.075, 0.075, 0.8), 0xef4444, 0.38, 14.3, 0.15, { r: [0, 0, 0.35] });
      registerOrgan('cardio', 'Heart', C(0.15, 0.14, 1.1), 0x2563eb, 0.26, 13.3, 0.52, { r: [-0.3, 0, 0.1] });
      registerOrgan('cardio', 'Heart', C(0.09, 0.08, 1.2), 0x2563eb, 0.26, 13.7, 0.44, { r: [0, 0, Math.PI / 2] });
      registerOrgan('cardio', 'Heart', C(0.18, 0.18, 5.0), 0x2563eb, -0.22, 12.3, -0.15);
      registerOrgan('cardio', 'Heart', C(0.18, 0.16, 5.4), 0xef4444, 0.16, 11.6, -0.20);
      registerBilateral('cardio', 'Heart', function() { return C(0.09, 0.07, 1.8); }, 0xef4444, 0.42, 14.9, 0.1);
      registerBilateral('cardio', 'Heart', function() { return C(0.08, 0.06, 4.4); }, 0xef4444, 0.88, 6.6, 0.05);
      registerBilateral('cardio', 'Heart', function() { return C(0.08, 0.06, 4.4); }, 0x2563eb, 0.74, 6.6, -0.05);
      registerOrgan('cardio', 'Heart', C(0.035, 0.025, 1.1), 0xf87171, 0.34, 12.75, 0.72, { r: [0.2, 0, -0.3] });
      registerOrgan('cardio', 'Heart', C(0.03, 0.02, 0.9), 0x60a5fa, 0.24, 12.65, 0.70, { r: [0.15, 0, -0.2] });
      heartGroup = heartMeshes;

      // 3. Respiratory (Lungs & Bronchi)
      registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', C(0.15, 0.15, 1.9), 0xe2e8f0, 0, 14.6, 0.32);
      for (var i = 0; i < 5; i++) {
        registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', T(0.16, 0.02, 10, 20), 0xcfd8dc, 0, 14.9 - i * 0.25, 0.32, { r: [Math.PI / 2, 0, 0] });
      }
      registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', C(0.10, 0.08, 0.9), 0xe2e8f0, -0.30, 13.55, 0.18, { r: [0, 0, 0.6] });
      registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', C(0.10, 0.08, 0.9), 0xe2e8f0, 0.30, 13.55, 0.18, { r: [0, 0, -0.6] });

      var rLungs = [];
      rLungs.push(registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', S(0.74), RE, -0.84, 13.6, 0.12, { s: [0.82, 0.95, 0.85], opacity: 0.92 }));
      rLungs.push(registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', S(0.72), 0xf472b6, -0.86, 12.9, 0.15, { s: [0.85, 0.75, 0.85], opacity: 0.92 }));
      rLungs.push(registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', S(0.82), 0xf43f5e, -0.82, 12.1, 0.08, { s: [0.88, 1.05, 0.90], opacity: 0.92 }));
      rightLungGroup = rLungs;

      var lLungs = [];
      lLungs.push(registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', S(0.72), RE, 0.90, 13.5, 0.10, { s: [0.78, 1.10, 0.82], opacity: 0.92 }));
      lLungs.push(registerOrgan('respiratory', 'Lungs (Pulmonary Lobes)', S(0.78), 0xf43f5e, 0.88, 12.2, 0.06, { s: [0.84, 1.05, 0.85], opacity: 0.92 }));
      leftLungGroup = lLungs;

      // 4. Nervous (Brain & Sciatic)
      registerOrgan('nervous', 'Brain (Cerebrum & Cortex)', S(0.80), NE, -0.38, 16.95, 0.05, { s: [0.86, 0.88, 1.12] });
      registerOrgan('nervous', 'Brain (Cerebrum & Cortex)', S(0.80), NE, 0.38, 16.95, 0.05, { s: [0.86, 0.88, 1.12] });
      registerOrgan('nervous', 'Brain (Cerebrum & Cortex)', S(0.52), 0xfde047, -0.34, 16.85, 0.52, { s: [0.85, 0.75, 0.8] });
      registerOrgan('nervous', 'Brain (Cerebrum & Cortex)', S(0.52), 0xfde047, 0.34, 16.85, 0.52, { s: [0.85, 0.75, 0.8] });
      registerOrgan('nervous', 'Brain (Cerebrum & Cortex)', S(0.50), 0xd97706, 0, 15.85, -0.35, { s: [1.25, 0.68, 0.85] });
      registerOrgan('nervous', 'Brain (Cerebrum & Cortex)', C(0.18, 0.12, 1.3), 0xf59e0b, 0, 15.1, -0.2);
      registerBilateral('nervous', 'Sciatic Nerve', function() { return C(0.065, 0.045, 4.4); }, NE, 0.88, 6.6, -0.2);

      // 5. Digestive (Stomach, Liver, Gallbladder, Pancreas, Intestines, Colon, Appendix)
      registerOrgan('digestive', 'Stomach', S(0.70), DI, 0.58, 11.2, 0.35, { s: [1.16, 0.95, 0.85], r: [0, 0, 0.45] });
      registerOrgan('digestive', 'Stomach', S(0.48), 0xfb923c, 0.68, 11.75, 0.28, { s: [1.0, 0.8, 0.8] });
      registerOrgan('digestive', 'Stomach', C(0.22, 0.16, 0.75), 0xf97316, 0.22, 10.8, 0.38, { r: [0, 0, -0.7] });
      registerOrgan('digestive', 'Liver', S(0.96), 0xb45309, -0.76, 11.45, 0.30, { s: [1.38, 0.74, 0.94], r: [0, 0, -0.15] });
      registerOrgan('digestive', 'Liver', S(0.68), 0x9a3412, -0.25, 11.65, 0.34, { s: [1.0, 0.6, 0.75] });
      registerOrgan('digestive', 'Gallbladder', S(0.22), 0x84cc16, -0.52, 10.7, 0.64, { s: [0.75, 1.35, 0.75] });
      registerOrgan('digestive', 'Pancreas', B(1.15, 0.28, 0.30), 0xf59e0b, 0.15, 10.8, 0.10, { r: [0, 0, 0.18] });
      registerOrgan('digestive', 'Pancreas', T(0.38, 0.08, 10, 20), 0xfb923c, 0.02, 10.6, 0.25, { r: [0, Math.PI / 2, 0] });
      registerOrgan('digestive', 'Spleen', S(0.38), 0x9333ea, 1.28, 11.5, 0.12, { s: [0.8, 1.25, 0.68] });
      registerOrgan('digestive', 'Small Intestine', T(0.74, 0.34, 14, 28), 0xfb923c, 0, 9.8, 0.25, { r: [Math.PI / 2, 0, 0] });
      registerOrgan('digestive', 'Small Intestine', T(0.52, 0.26, 12, 24), 0xf97316, 0.08, 9.4, 0.32, { r: [Math.PI / 2 + 0.2, 0.1, 0] });
      registerOrgan('digestive', 'Large Intestine (Colon)', S(0.34), 0xd97706, -0.92, 9.1, 0.26);
      registerOrgan('digestive', 'Appendix', C(0.045, 0.035, 0.48), 0xe11d48, -0.96, 8.7, 0.36, { r: [0.35, 0, 0.55] });
      registerOrgan('digestive', 'Large Intestine (Colon)', C(0.24, 0.24, 1.6), 0xd97706, -0.98, 10.0, 0.22);
      registerOrgan('digestive', 'Large Intestine (Colon)', C(0.22, 0.22, 1.9), 0xd97706, 0, 10.7, 0.32, { r: [0, 0, Math.PI / 2] });
      registerOrgan('digestive', 'Large Intestine (Colon)', C(0.24, 0.24, 1.6), 0xd97706, 0.98, 10.0, 0.22);
      registerOrgan('digestive', 'Large Intestine (Colon)', T(0.42, 0.18, 12, 22), 0xd97706, 0.48, 8.8, 0.15, { r: [Math.PI / 2, 0.3, 0] });

      // 6. Urinary
      registerBilateral('urinary', 'Kidneys', function() { return S(0.40); }, UR, 0.82, 10.6, -0.45, { s: [0.72, 1.32, 0.65] });
      registerBilateral('urinary', 'Kidneys', function() { return Cone(0.18, 0.26); }, 0xfbbf24, 0.82, 11.15, -0.42);
      registerBilateral('urinary', 'Kidneys', function() { return C(0.035, 0.035, 2.6); }, 0x38bdf8, 0.62, 9.3, -0.15, { r: [0.2, 0, -0.1] });
      registerOrgan('urinary', 'Kidneys', S(0.46), 0x0284c7, 0, 8.1, 0.35, { s: [1.1, 0.9, 0.95] });
      registerOrgan('urinary', 'Thyroid Gland', S(0.35), 0xa855f7, 0, 14.7, 0.52, { s: [1.25, 0.65, 0.5] });

      // 7. Skeletal
      registerOrgan('skeletal', 'Skull (Cranium)', S(1.02), SK, 0, 16.7, 0, { s: [0.92, 1.1, 1.08] });
      registerOrgan('skeletal', 'Skull (Cranium)', B(0.74, 0.48, 0.68), SK, 0, 15.65, 0.44);
      registerBilateral('skeletal', 'Skull (Cranium)', function() { return S(0.18); }, 0x09090b, 0.28, 16.2, 0.85);
      registerOrgan('skeletal', 'Thoracic & Lumbar Spine', C(0.24, 0.28, 6.9, 16), SK, 0, 11.6, -0.55);
      for (var j = 0; j < 14; j++) {
        registerOrgan('skeletal', 'Thoracic & Lumbar Spine', T(0.29, 0.035, 8, 18), 0xd9cebc, 0, 14.8 - j * 0.46, -0.55, { r: [Math.PI / 2, 0, 0] });
      }
      registerOrgan('skeletal', 'Rib Cage', B(0.36, 2.7, 0.14), SK, 0, 13.0, 0.98);
      [1.25, 1.44, 1.58, 1.64, 1.60, 1.52, 1.40, 1.25].forEach(function(rad, idx) {
        registerOrgan('skeletal', 'Rib Cage', T(rad, 0.08, 12, 30), SK, 0, 14.25 - idx * 0.40, 0.08, { s: [1, 0.64, 1], r: [Math.PI / 2 + 0.08, 0, 0] });
      });
      registerBilateral('skeletal', 'Rib Cage', function() { return C(0.085, 0.085, 1.75); }, SK, 1.15, 14.35, 0.45, { r: [0, 0, -1.35] });
      registerBilateral('skeletal', 'Rib Cage', function() { return B(0.72, 1.2, 0.12); }, SK, 1.25, 13.1, -0.65, { r: [0.15, 0.3, -0.2] });
      registerOrgan('skeletal', 'Thoracic & Lumbar Spine', T(1.18, 0.24, 12, 26), SK, 0, 8.5, 0, { s: [1.12, 0.82, 1], r: [Math.PI / 2, 0, 0] });
      registerBilateral('skeletal', 'Femur', function() { return C(0.15, 0.12, 3.2); }, SK, 2.7, 12.2, 0, { r: [0, 0, -0.22] });
      registerBilateral('skeletal', 'Femur', function() { return C(0.11, 0.09, 3.0); }, SK, 3.4, 9.6, 0, { r: [0, 0, -0.15] });
      registerBilateral('skeletal', 'Femur', function() { return B(0.28, 0.68, 0.1); }, SK, 3.85, 7.8, 0, { r: [0, 0, -0.1] });
      registerBilateral('skeletal', 'Femur', function() { return C(0.19, 0.16, 4.4); }, SK, 0.95, 6.6, 0);
      registerBilateral('skeletal', 'Femur', function() { return S(0.26); }, SK, 0.95, 4.6, 0.14);
      registerBilateral('skeletal', 'Femur', function() { return C(0.16, 0.12, 4.4); }, SK, 0.95, 2.4, 0);
      registerBilateral('skeletal', 'Femur', function() { return B(0.38, 0.22, 1.1); }, SK, 0.95, 0.15, 0.32);

      // 8. Muscular
      registerBilateral('muscular', 'Pectoralis Major', function() { return B(0.96, 0.88, 0.18); }, MU, 0.75, 13.35, 0.88, { r: [0, -0.18, 0.15] });
    }

    function buildBloodParticles() {
      var geo = new THREE.BufferGeometry();
      var pos = new Float32Array(bloodCount * 3);
      var col = new Float32Array(bloodCount * 3);
      bloodSpeeds = new Float32Array(bloodCount);

      for (var i = 0; i < bloodCount; i++) {
        var isArtery = (i % 2 === 0);
        var progress = Math.random();
        var y = 16.5 - progress * 14.5;
        var x = (Math.random() - 0.5) * (y < 8.5 ? 1.7 : 0.65);
        var z = (Math.random() - 0.5) * 0.38;
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        if (isArtery) {
          col[i * 3] = 0.98; col[i * 3 + 1] = 0.12; col[i * 3 + 2] = 0.26;
        } else {
          col[i * 3] = 0.12; col[i * 3 + 1] = 0.58; col[i * 3 + 2] = 0.98;
        }
        bloodSpeeds[i] = 0.026 + Math.random() * 0.038;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      var mat = new THREE.PointsMaterial({
        size: 0.17,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending
      });
      bloodPoints = new THREE.Points(geo, mat);
      scene.add(bloodPoints);
    }

    function initScene() {
      var canvas = document.getElementById('canvas3d');
      scene = new THREE.Scene();

      var curPal = THEME_PALETTES[config.theme] || THEME_PALETTES.dark;
      scene.background = new THREE.Color(curPal.bgHex);

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
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = curPal.toneExposure;

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

      buildUpgradedHumanAnatomy();
      buildBloodParticles();

      setupTouchRaycaster();

      var loader = document.getElementById('loader');
      if (loader) loader.style.opacity = '0';

      animate();
    }

    function setupTouchRaycaster() {
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      var tooltip = document.getElementById('tooltip');
      var tooltipText = document.getElementById('tooltip-text');
      var tooltipTimer = null;

      function showTooltip(text) {
        if (!tooltip || !tooltipText) return;
        tooltipText.textContent = text;
        tooltip.classList.add('visible');
        clearTimeout(tooltipTimer);
        tooltipTimer = setTimeout(function() {
          tooltip.classList.remove('visible');
        }, 2200);
      }

      function processHit(clientX, clientY) {
        var w = window.innerWidth || document.documentElement.clientWidth;
        var h = window.innerHeight || document.documentElement.clientHeight;
        mouse.x = (clientX / w) * 2 - 1;
        mouse.y = -(clientY / h) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        var internalHits = organMeshes.filter(function(m) {
          return m.userData.nameKey !== 'Body Surface (Skin)';
        });
        var intersects = raycaster.intersectObjects(internalHits, true);
        if (intersects.length === 0) {
          intersects = raycaster.intersectObjects(organMeshes, true);
        }

        if (intersects.length > 0) {
          var hitObj = intersects[0].object;
          var organName = hitObj.userData.nameKey;
          if (organName) {
            showTooltip(organName);
            var origColor = hitObj.material.color.getHex();
            hitObj.material.color.setHex(0x38bdf8);
            setTimeout(function() {
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
      var curPal = THEME_PALETTES[themeMode] || THEME_PALETTES.dark;

      if (scene && !config.xrayMode) {
        scene.background.setHex(curPal.bgHex);
      }

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
            m.material.color.setHex(curPal.skeletalColor);
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

      if (scene) {
        scene.background.setHex(enable ? 0x000814 : curPal.bgHex);
      }
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

      if (msg.theme && msg.theme !== config.theme) {
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

    function animate() {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(animate);
      } else if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(animate);
      }
      var delta = clock.getDelta();
      var time = clock.getElapsedTime();

      if (isCamTransitioning && camera && controls) {
        camera.position.lerp(targetCamPos, 0.08);
        controls.target.lerp(targetCamLook, 0.08);
        if (camera.position.distanceTo(targetCamPos) < 0.05 && controls.target.distanceTo(targetCamLook) < 0.05) {
          camera.position.copy(targetCamPos);
          controls.target.copy(targetCamLook);
          isCamTransitioning = false;
        }
      }

      if (heartGroup && heartGroup.length > 0) {
        var beatFreq = (config.bpm / 60) * Math.PI * 2;
        var phase = (time * beatFreq) % (Math.PI * 2);
        var pulse = 0;
        if (phase < 0.6) {
          pulse = Math.sin((phase / 0.6) * Math.PI) * 0.16;
        } else if (phase > 0.9 && phase < 1.4) {
          pulse = Math.sin(((phase - 0.9) / 0.5) * Math.PI) * 0.07;
        }
        var sVal = 1 + pulse;

        heartGroup.forEach(function(m) {
          if (m && m.userData && m.userData.origScale) {
            m.scale.set(
              m.userData.origScale.x * sVal,
              m.userData.origScale.y * (1 + pulse * 0.6),
              m.userData.origScale.z * sVal
            );
          }
        });
      }

      var respBreath = Math.sin(time * (config.respRate / 60) * Math.PI * 2) * 0.085;
      if (rightLungGroup) {
        rightLungGroup.forEach(function(m) {
          if (m && m.userData && m.userData.origScale) {
            m.scale.set(
              m.userData.origScale.x * (1 + respBreath),
              m.userData.origScale.y * (1 + respBreath * 0.45),
              m.userData.origScale.z * (1 + respBreath)
            );
          }
        });
      }
      if (leftLungGroup) {
        leftLungGroup.forEach(function(m) {
          if (m && m.userData && m.userData.origScale) {
            m.scale.set(
              m.userData.origScale.x * (1 + respBreath),
              m.userData.origScale.y * (1 + respBreath * 0.45),
              m.userData.origScale.z * (1 + respBreath)
            );
          }
        });
      }

      if (bloodPoints) {
        var positions = bloodPoints.geometry.attributes.position.array;
        for (var i = 0; i < bloodCount; i++) {
          var isArtery = (i % 2 === 0);
          if (isArtery) {
            positions[i * 3 + 1] -= bloodSpeeds[i];
            if (positions[i * 3 + 1] < 2.0) {
              positions[i * 3 + 1] = 16.5;
            }
          } else {
            positions[i * 3 + 1] += bloodSpeeds[i] * 0.85;
            if (positions[i * 3 + 1] > 16.5) {
              positions[i * 3 + 1] = 2.0;
            }
          }
        }
        bloodPoints.geometry.attributes.position.needsUpdate = true;
      }

      if (controls) controls.update();
      if (renderer && scene && camera) renderer.render(scene, camera);
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
  `, [theme]);

  return (
    <View style={[styles.container, { backgroundColor: getBgCssForTheme(theme) }]}>
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
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});
