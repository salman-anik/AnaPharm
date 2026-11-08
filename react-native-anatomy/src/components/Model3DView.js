import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

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

  // Send state updates into WebView Three.js scene
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
  }, [bpm, respRate, autoRotate, xrayMode, explodeVal, focusRegion, theme]);

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'ORGAN_CLICKED' && onSelectOrgan) {
        onSelectOrgan(data.organ);
      }
    } catch (e) {
      console.warn('WebView message error:', e);
    }
  };

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body, html { width:100%; height:100%; overflow:hidden; background-color: ${theme === 'light' ? '#f1f5f9' : '#020617'}; touch-action:none; }
    #canvas3d { width:100%; height:100%; display:block; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
  <canvas id="canvas3d"></canvas>
  <script>
    let scene, camera, renderer, controls;
    let organMeshes = {};
    let config = {
      bpm: ${bpm},
      respRate: ${respRate},
      autoRotate: ${autoRotate},
      xrayMode: ${xrayMode},
      explodeVal: ${explodeVal},
      focusRegion: '${focusRegion}'
    };

    const canvas = document.getElementById('canvas3d');
    scene = new THREE.Scene();
    scene.background = new THREE.Color(${theme === 'light' ? '0xf1f5f9' : '0x020617'});

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxDistance = 14;
    controls.minDistance = 2;
    controls.target.set(0, 0, 0);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.5);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Geometry Helpers
    function createOrgan(name, geo, mat, pos, normalDir) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.userData = {
        name: name,
        originPos: pos.clone(),
        normalDir: normalDir ? normalDir.clone() : new THREE.Vector3(0,0,1)
      };
      scene.add(mesh);
      organMeshes[name] = mesh;
      return mesh;
    }

    // Materials
    const matSkin = new THREE.MeshStandardMaterial({ color: 0xe2ab8c, roughness: 0.7, transparent: true, opacity: 0.15 });
    const matBone = new THREE.MeshStandardMaterial({ color: 0xede6d2, roughness: 0.4 });
    const matHeart = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.3 });
    const matBrain = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.5 });
    const matLung = new THREE.MeshStandardMaterial({ color: 0xe07c8c, roughness: 0.4, transparent: true, opacity: 0.85 });
    const matLiver = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.4 });
    const matStomach = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.4 });
    const matKidney = new THREE.MeshStandardMaterial({ color: 0x9c4221, roughness: 0.3 });

    // Build Anatomy
    // Head / Skull
    createOrgan('Skull (Cranium)', new THREE.SphereGeometry(0.7, 32, 32), matBone, new THREE.Vector3(0, 2.5, 0), new THREE.Vector3(0, 1, 0));
    // Brain
    createOrgan('Brain (Cerebrum & Cortex)', new THREE.SphereGeometry(0.55, 32, 32), matBrain, new THREE.Vector3(0, 2.55, 0), new THREE.Vector3(0, 1, 0));
    // Spine
    createOrgan('Thoracic & Lumbar Spine', new THREE.CylinderGeometry(0.12, 0.15, 3.2, 16), matBone, new THREE.Vector3(0, 0.5, -0.3), new THREE.Vector3(0, 0, -1));
    // Rib Cage
    createOrgan('Rib Cage', new THREE.CylinderGeometry(0.95, 0.85, 1.6, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0xede6d2, wireframe: true }), new THREE.Vector3(0, 1.1, 0), new THREE.Vector3(0, 0, 1));
    // Heart
    createOrgan('Heart', new THREE.SphereGeometry(0.38, 24, 24), matHeart, new THREE.Vector3(-0.15, 1.15, 0.15), new THREE.Vector3(-0.3, 0.2, 1));
    // Lungs
    createOrgan('Lungs (Pulmonary Lobes)', new THREE.ConeGeometry(0.55, 1.3, 20), matLung, new THREE.Vector3(-0.55, 1.1, 0.05), new THREE.Vector3(-1, 0, 0));
    const rightLung = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.3, 20), matLung);
    rightLung.position.set(0.55, 1.1, 0.05);
    scene.add(rightLung);
    // Liver
    createOrgan('Liver', new THREE.CylinderGeometry(0.65, 0.5, 0.45, 16), matLiver, new THREE.Vector3(0.35, 0.15, 0.1), new THREE.Vector3(1, 0, 1));
    // Stomach
    createOrgan('Stomach', new THREE.TorusGeometry(0.35, 0.18, 16, 24, Math.PI * 0.9), matStomach, new THREE.Vector3(-0.3, 0.1, 0.15), new THREE.Vector3(-1, 0, 1));
    // Kidneys
    createOrgan('Kidneys', new THREE.SphereGeometry(0.24, 16, 16), matKidney, new THREE.Vector3(-0.45, -0.25, -0.2), new THREE.Vector3(-1, 0, -1));
    const rKidney = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), matKidney);
    rKidney.position.set(0.45, -0.25, -0.2);
    scene.add(rKidney);
    // Femur Bones
    createOrgan('Femur', new THREE.CylinderGeometry(0.12, 0.1, 2.0, 16), matBone, new THREE.Vector3(-0.5, -1.8, 0), new THREE.Vector3(-1, -1, 0));
    const rFemur = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 2.0, 16), matBone);
    rFemur.position.set(0.5, -1.8, 0);
    scene.add(rFemur);
    // Skin Outline
    createOrgan('Body Surface (Skin)', new THREE.CapsuleGeometry ? new THREE.CapsuleGeometry(1.05, 4.2, 16, 32) : new THREE.CylinderGeometry(1.05, 1.05, 4.5, 24), matSkin, new THREE.Vector3(0, 0.4, 0), new THREE.Vector3(0, 0, 1));

    // Handle Raycast Taps
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('pointerdown', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const hitList = [];
      for (let key in organMeshes) {
        if (key === 'Body Surface (Skin)') continue;
        hitList.push(organMeshes[key]);
      }
      const intersects = raycaster.intersectObjects(hitList, true);
      if (intersects.length > 0) {
        const selected = intersects[0].object.userData.name;
        if (selected) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'ORGAN_CLICKED',
            organ: selected
          }));
        }
      }
    });

    // Handle React Native postMessage Updates
    window.addEventListener('message', (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'CONFIG_UPDATE') {
          config.bpm = msg.bpm || config.bpm;
          config.respRate = msg.respRate || config.respRate;
          config.autoRotate = !!msg.autoRotate;
          controls.autoRotate = config.autoRotate;
          controls.autoRotateSpeed = 1.8;

          // Exploded view
          const exp = msg.explodeVal || 0;
          for (let key in organMeshes) {
            const m = organMeshes[key];
            if (m.userData.originPos && m.userData.normalDir) {
              m.position.copy(m.userData.originPos).addScaledVector(m.userData.normalDir, exp * 1.5);
            }
          }

          // Camera focus region
          if (msg.focusRegion === 'head') {
            controls.target.set(0, 2.5, 0);
          } else if (msg.focusRegion === 'thorax') {
            controls.target.set(0, 1.1, 0);
          } else if (msg.focusRegion === 'abdomen') {
            controls.target.set(0, 0.1, 0);
          } else if (msg.focusRegion === 'pelvis' || msg.focusRegion === 'extremities') {
            controls.target.set(0, -1.8, 0);
          } else {
            controls.target.set(0, 0.4, 0);
          }
        }
      } catch (err) {}
    });

    // Animation Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Cardiac pulsation
      const heartPulse = Math.sin(time * (config.bpm / 60) * Math.PI * 2) * 0.04;
      if (organMeshes['Heart']) {
        organMeshes['Heart'].scale.set(1 + heartPulse, 1 + heartPulse, 1 + heartPulse);
      }

      // Respiratory expansion
      const respBreath = Math.sin(time * (config.respRate / 60) * Math.PI * 2) * 0.05;
      if (organMeshes['Lungs (Pulmonary Lobes)']) {
        organMeshes['Lungs (Pulmonary Lobes)'].scale.set(1 + respBreath, 1 + respBreath * 0.6, 1 + respBreath);
      }

      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  </script>
</body>
</html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scrollEnabled={false}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
