/**
 * 3D Ambient Background Engine
 * Clean, fluid, cosmic aesthetic:
 * - Fluid celestial particle waves (replacing harsh boxy grid squares)
 * - Floating glowing energy nodes (Cyan Firefly, Violet Bat, Gold FireBat)
 * - Zero background box-towers / monoliths for a clean, open, distraction-free view
 * - Camera gracefully travels and pivots based on active slide
 */
(function (global) {
  'use strict';

  function initBackground3D(container) {
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040817);
    scene.fog = new THREE.FogExp2(0x040817, 0.025);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Subtle Ambient & Accent Spotlights
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const lightGold = new THREE.PointLight(0xfbbf24, 1.6, 30);
    lightGold.position.set(6, 8, 4);
    scene.add(lightGold);

    const lightCyan = new THREE.PointLight(0x38bdf8, 1.4, 30);
    lightCyan.position.set(-6, 6, 2);
    scene.add(lightCyan);

    const lightViolet = new THREE.PointLight(0xa855f7, 1.2, 25);
    lightViolet.position.set(0, 4, -4);
    scene.add(lightViolet);

    // 1. Organic Celestial Particle Waves (No harsh square boxes / wireframes)
    const gridRows = 55, gridCols = 55;
    const waveGeo = new THREE.PlaneGeometry(38, 38, gridCols, gridRows);
    waveGeo.rotateX(-Math.PI / 2);

    const waveMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.42
    });
    const wavePoints = new THREE.Points(waveGeo, waveMat);
    wavePoints.position.y = -1.6;
    scene.add(wavePoints);

    // 2. Swarm Particles (Floating Bio-luminescent Energy Orbs)
    const particleCount = 50;
    const particlesGroup = new THREE.Group();
    const sphereGeo = new THREE.SphereGeometry(0.08, 8, 8);

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      let colorHex = 0x38bdf8; // Firefly Cyan
      if (i % 3 === 1) colorHex = 0xa855f7; // Bat Violet
      if (i % 3 === 2) colorHex = 0xfbbf24; // FireBat Gold

      const mat = new THREE.MeshBasicMaterial({ color: colorHex });
      const mesh = new THREE.Mesh(sphereGeo, mat);

      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 6.5;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.2) * 3.5,
        Math.sin(angle) * radius - 2
      );

      particlesGroup.add(mesh);
      particles.push({
        mesh,
        angle,
        radius,
        speed: (0.003 + Math.random() * 0.006) * (Math.random() > 0.5 ? 1 : -1),
        baseY: mesh.position.y
      });
    }
    scene.add(particlesGroup);

    // Camera viewpoints for each slide index (0 to 6)
    const CAMERA_DESTS = [
      { pos: [0, 3.5, 12], rot: [-0.15, 0, 0] },         // Cover: cinematic wide
      { pos: [-3, 2.8, 10], rot: [-0.08, 0.12, 0] },     // Dilema / Masalah: tilt left
      { pos: [2.5, 3.0, 9.5], rot: [-0.1, -0.15, 0] },   // Cara kerja: tilt right
      { pos: [0, 4.0, 8.5], rot: [-0.22, 0, 0] },        // Balapan: elevated view
      { pos: [0, 2.6, 9.5], rot: [-0.08, 0, 0] },        // Data 10 beban: balanced view
      { pos: [-1.8, 2.5, 9.5], rot: [-0.05, 0.08, 0] },  // Validasi CloudSim: angled view
      { pos: [0, 3.5, 12], rot: [-0.15, 0, 0] }          // Kesimpulan: wide reset
    ];

    let targetCamPos = new THREE.Vector3(0, 3.5, 12);
    let targetCamRot = new THREE.Vector3(-0.15, 0, 0);
    let animId = null;
    let clock = new THREE.Clock();

    function setSlideIndex(idx) {
      const dest = CAMERA_DESTS[idx] || CAMERA_DESTS[0];
      targetCamPos.set(dest.pos[0], dest.pos[1], dest.pos[2]);
      targetCamRot.set(dest.rot[0], dest.rot[1], dest.rot[2]);
    }

    // Dynamic wave animation on points
    const posAttr = waveGeo.attributes.position;
    const initialY = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) initialY[i] = posAttr.getY(i);

    function animate() {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth camera interpolation
      camera.position.lerp(targetCamPos, 0.045);
      camera.rotation.x += (targetCamRot.x - camera.rotation.x) * 0.045;
      camera.rotation.y += (targetCamRot.y - camera.rotation.y) * 0.045;

      // Animate organic wave
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);
        const wave = Math.sin(x * 0.4 + time * 1.1) * Math.cos(z * 0.4 + time * 0.9) * 0.42;
        posAttr.setY(i, initialY[i] + wave);
      }
      posAttr.needsUpdate = true;

      // Orbit particles
      particles.forEach((p) => {
        p.angle += p.speed;
        p.mesh.position.x = Math.cos(p.angle) * p.radius;
        p.mesh.position.z = Math.sin(p.angle) * p.radius - 2;
        p.mesh.position.y = p.baseY + Math.sin(time * 2 + p.angle) * 0.35;
      });

      renderer.render(scene, camera);
    }

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', resize);
    animate();

    return {
      setSlideIndex,
      resize,
      destroy() {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      }
    };
  }

  global.Background3D = {
    initBackground3D
  };
})(window);
