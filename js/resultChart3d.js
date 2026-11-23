/**
 * resultChart3d.js — Live 3D Bar Chart: Real GoCJ 600-Task Experiment Results
 * Slide 5 — Kelompok 4 (FireBat vs HGACO vs RASA vs Max-Min)
 *
 * Data sumber: S1_summary_metrics.csv (ExperimentRunner 30 stochastic runs)
 * Dataset: GoCJ_Dataset_600.txt | VM: 15 heterogen | LB: 3921s
 */
(function (global) {
  'use strict';

  /* ─── REAL EXPERIMENT DATA ───────────────────────────────────────── */
  const ALGORITHMS = [
    {
      name: 'FireBat',
      shortName: 'FireBat',
      subtitle: 'Hybrid FA+BA',
      makespanBest: 4058.0,
      makespanMean: 4260.57,
      di: 0.0779,
      arur: 96.64,
      color: 0xfbbf24,     // amber/gold
      emissive: 0xf59e0b,
      glowColor: '#fbbf24',
      champion: true
    },
    {
      name: 'RASA',
      shortName: 'RASA',
      subtitle: 'Baseline Heuristik',
      makespanBest: 4192.5,
      makespanMean: 4192.5,
      di: 0.1012,
      arur: 94.35,
      color: 0x38bdf8,     // cyan
      emissive: 0x0ea5e9,
      glowColor: '#38bdf8',
      champion: false
    },
    {
      name: 'Max-Min',
      shortName: 'Max-Min',
      subtitle: 'Baseline Heuristik',
      makespanBest: 4337.5,
      makespanMean: 4337.5,
      di: 0.1082,
      arur: 92.33,
      color: 0xa855f7,     // violet
      emissive: 0x9333ea,
      glowColor: '#a855f7',
      champion: false
    },
    {
      name: 'HGACO',
      shortName: 'HGACO',
      subtitle: 'Hybrid GA+ACO',
      makespanBest: 4451.5,
      makespanMean: 5000.08,
      di: 0.5541,
      arur: 79.49,
      color: 0xef4444,     // red (worst)
      emissive: 0xdc2626,
      glowColor: '#ef4444',
      champion: false
    }
  ];

  const LOWER_BOUND = 3921.0;
  const SCALE_MAX   = 5100;   // y-scale ceiling for bars
  const BAR_W       = 0.9;
  const BAR_D       = 0.9;
  const BAR_GAP     = 2.2;

  /* ─── SCALE HELPER ───────────────────────────────────────────────── */
  function toBarHeight(makespan, maxH = 6.0) {
    // map [LOWER_BOUND .. SCALE_MAX] → [0.3 .. maxH]
    const ratio = (makespan - LOWER_BOUND) / (SCALE_MAX - LOWER_BOUND);
    return Math.max(0.3, ratio * maxH);
  }

  /* ─── LABEL SPRITE (canvas texture) ─────────────────────────────── */
  function makeLabel(text, color, fontSize = 22) {
    const canvas  = document.createElement('canvas');
    canvas.width  = 256;
    canvas.height = 56;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font      = `700 ${fontSize}px 'Nunito', sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 28);
    const tex = new global.THREE.CanvasTexture(canvas);
    const mat = new global.THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
    const sp  = new global.THREE.Sprite(mat);
    sp.scale.set(1.6, 0.4, 1);
    return sp;
  }

  /* ─── RING / DISC BASE ───────────────────────────────────────────── */
  function makeBase(x, color) {
    const geo = new global.THREE.CylinderGeometry(0.72, 0.72, 0.08, 32);
    const mat = new global.THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.4,
      metalness: 0.3,
      roughness: 0.5,
      transparent: true,
      opacity: 0.75
    });
    const mesh = new global.THREE.Mesh(geo, mat);
    mesh.position.set(x, 0.04, 0);
    return mesh;
  }

  /* ─── PILLAR (bar) ───────────────────────────────────────────────── */
  function makePillar(x, height, color, emissive) {
    const geo = new global.THREE.BoxGeometry(BAR_W, height, BAR_D);
    geo.translate(0, height / 2, 0);           // pivot at bottom
    const mat = new global.THREE.MeshStandardMaterial({
      color,
      emissive,
      emissiveIntensity: 0.35,
      metalness: 0.4,
      roughness: 0.45
    });
    const mesh = new global.THREE.Mesh(geo, mat);
    mesh.position.set(x, 0, 0);
    mesh.scale.y = 0;   // start collapsed — will animate up
    return mesh;
  }

  /* ─── SPARKLE PARTICLES ON TOP ───────────────────────────────────── */
  function makeSparkles(x, height, color) {
    const count = 24;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = x + (Math.random() - 0.5) * BAR_W * 1.4;
      positions[i * 3 + 1] = height + Math.random() * 1.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * BAR_D * 1.4;
    }
    const geo = new global.THREE.BufferGeometry();
    geo.setAttribute('position', new global.THREE.BufferAttribute(positions, 3));
    const mat = new global.THREE.PointsMaterial({
      color,
      size: 0.07,
      transparent: true,
      opacity: 0.0,     // fade in after bar finishes growing
      sizeAttenuation: true
    });
    return new global.THREE.Points(geo, mat);
  }

  /* ─── HORIZONTAL LOWER-BOUND PLANE ──────────────────────────────── */
  function makeLBPlane() {
    const lbH = toBarHeight(LOWER_BOUND);  // = 0.0 since LB = floor
    const geo = new global.THREE.PlaneGeometry(ALGORITHMS.length * BAR_GAP + 1.5, 0.04);
    geo.rotateX(-Math.PI / 2);
    const mat = new global.THREE.MeshBasicMaterial({
      color: 0x4ade80,
      transparent: true,
      opacity: 0.55,
      side: global.THREE.DoubleSide
    });
    const mesh = new global.THREE.Mesh(geo, mat);
    mesh.position.set((ALGORITHMS.length - 1) * BAR_GAP / 2, lbH, 0);
    return mesh;
  }

  /* ─── GRID FLOOR ─────────────────────────────────────────────────── */
  function makeGrid() {
    const size   = ALGORITHMS.length * BAR_GAP + 2;
    const divs   = 12;
    const helper = new global.THREE.GridHelper(size, divs, 0x334155, 0x1e293b);
    helper.position.set((ALGORITHMS.length - 1) * BAR_GAP / 2, -0.01, 0);
    return helper;
  }

  /* ─── SCENE LIGHTS ───────────────────────────────────────────────── */
  function addLights(scene) {
    const ambient = new global.THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);

    const dirA = new global.THREE.DirectionalLight(0xfbbf24, 1.1);
    dirA.position.set(4, 10, 6);
    scene.add(dirA);

    const dirB = new global.THREE.DirectionalLight(0x38bdf8, 0.6);
    dirB.position.set(-4, 6, -6);
    scene.add(dirB);

    const pt = new global.THREE.PointLight(0xffffff, 0.4, 20);
    pt.position.set((ALGORITHMS.length - 1) * BAR_GAP / 2, 8, 2);
    scene.add(pt);
  }

  /* ─── MAIN INIT ─────────────────────────────────────────────────── */
  function init(container, opts) {
    opts = opts || {};
    if (!global.THREE) return null;

    const THREE = global.THREE;
    const OrbitControls = global.THREE.OrbitControls || (global.OrbitControls);

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth || 600, container.clientHeight || 320);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    /* scene */
    const scene = new THREE.Scene();
    scene.background = null;

    addLights(scene);
    scene.add(makeGrid());
    scene.add(makeLBPlane());

    /* camera */
    const W = container.clientWidth  || 600;
    const H = container.clientHeight || 320;
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set((ALGORITHMS.length - 1) * BAR_GAP / 2, 5, 11);
    camera.lookAt((ALGORITHMS.length - 1) * BAR_GAP / 2, 2, 0);

    /* orbit controls */
    let controls = null;
    if (OrbitControls) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping  = true;
      controls.dampingFactor  = 0.08;
      controls.minDistance    = 5;
      controls.maxDistance    = 20;
      controls.maxPolarAngle  = Math.PI / 2.1;
      controls.target.set((ALGORITHMS.length - 1) * BAR_GAP / 2, 1.5, 0);
    }

    /* build bars */
    const pillars   = [];
    const sparklePs = [];
    const targetHs  = [];

    ALGORITHMS.forEach(function (alg, i) {
      const x  = i * BAR_GAP;
      const hB = toBarHeight(alg.makespanBest);
      const hM = toBarHeight(alg.makespanMean);

      // "Best" pillar (taller accent, transparent outline)
      const pBest = makePillar(x - 0.25, hB, alg.color, alg.emissive);
      scene.add(pBest);
      pillars.push({ mesh: pBest, target: 1 });
      targetHs.push(hB);

      // "Mean" pillar (slightly narrower, same color, lower opacity)
      const meanGeo = new THREE.BoxGeometry(BAR_W * 0.55, hM, BAR_D * 0.55);
      meanGeo.translate(0, hM / 2, 0);
      const meanMat = new THREE.MeshStandardMaterial({
        color: alg.color,
        emissive: alg.emissive,
        emissiveIntensity: 0.15,
        metalness: 0.3,
        roughness: 0.6,
        transparent: true,
        opacity: 0.4,
        wireframe: false
      });
      const pMean = new THREE.Mesh(meanGeo, meanMat);
      pMean.position.set(x + 0.28, 0, 0);
      pMean.scale.y = 0;
      scene.add(pMean);
      pillars.push({ mesh: pMean, target: 1, delay: 0.3 });

      // Base disc
      scene.add(makeBase(x, alg.color));

      // Top sparkles (only on best bar)
      const sp = makeSparkles(x - 0.25, hB, alg.color);
      scene.add(sp);
      sparklePs.push({ pts: sp, maxH: hB });

      // Name label (below base)
      const lbl = makeLabel(alg.shortName, alg.glowColor, 20);
      lbl.position.set(x, -0.45, 0);
      scene.add(lbl);

      // Makespan value label (above bar)
      const valLbl = makeLabel(alg.makespanBest.toFixed(0) + 's', alg.glowColor, 18);
      valLbl.position.set(x - 0.25, hB + 0.55, 0);
      scene.add(valLbl);

      // Champion crown
      if (alg.champion) {
        const crownLbl = makeLabel('⭐ TERBAIK', '#fbbf24', 16);
        crownLbl.position.set(x - 0.25, hB + 1.0, 0);
        scene.add(crownLbl);
      }
    });

    /* animate */
    let startT  = null;
    let frameId = null;
    let alive   = true;

    function animate(ts) {
      if (!alive) return;
      frameId = requestAnimationFrame(animate);

      if (!startT) startT = ts;
      const elapsed = (ts - startT) / 1000;   // seconds

      /* grow bars */
      pillars.forEach(function (p) {
        const delay = p.delay || 0;
        const t = Math.min(1.0, Math.max(0, (elapsed - delay) / 1.6));
        const eased = 1 - Math.pow(1 - t, 3);
        p.mesh.scale.y = eased;
      });

      /* sparkle opacity: fade in after bars grown */
      const sparkleT = Math.min(1, Math.max(0, (elapsed - 1.8) / 0.8));
      sparklePs.forEach(function (s) {
        s.pts.material.opacity = sparkleT * 0.8;
      });

      /* gentle auto-rotate */
      if (controls) {
        controls.update();
      } else {
        const cx = (ALGORITHMS.length - 1) * BAR_GAP / 2;
        camera.position.x = cx + Math.sin(elapsed * 0.12) * 7;
        camera.position.z = Math.cos(elapsed * 0.12) * 7 + 6;
        camera.lookAt(cx, 2, 0);
      }

      renderer.render(scene, camera);
    }
    frameId = requestAnimationFrame(animate);

    /* resize */
    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    return {
      destroy: function () {
        alive = false;
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', onResize);
        if (controls) controls.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }

  global.ResultChart3D = { init: init, ALGORITHMS: ALGORITHMS };
})(window);

