/**
 * Explainable 3D Cloud Task Scheduling Comparison Engine
 * Direct Head-to-Head Comparison: Firefly (FA) vs Bat (BA) vs FireBat
 * 
 * Features:
 * - 3 Datacenter Racks/Pods side-by-side in 3D:
 *   * Pod Left: Firefly (FA) - Cyan glow, uneven load, high makespan (19.3s)
 *   * Pod Center: Bat (BA) - Violet glow, VM-1 overloaded/stuck in local optimum (17.8s)
 *   * Pod Right: FireBat (Hybrid) - Golden glow, leveled across golden target line (14.6s - 15.4s)
 * - Interactive modes:
 *   * 'all' (Side-by-side wide view showing all 3 simultaneously)
 *   * 'fa' (Focus on Firefly: explains slow convergence)
 *   * 'ba' (Focus on Bat: explains local optimum trap)
 *   * 'fb' (Focus on FireBat: explains why hybrid + rebalance wins)
 * - Animated simulation: running iterations from 0 to 100 with dynamic height adjustments
 */
(function (global) {
  'use strict';

  function initSimulation(container) {
    let width = container.clientWidth || 700;
    let height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040817);
    scene.fog = new THREE.FogExp2(0x040817, 0.022);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 7.5, 13.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.85);
    mainLight.position.set(5, 14, 8);
    scene.add(mainLight);

    const pCyan = new THREE.PointLight(0x38bdf8, 1.4, 25);
    pCyan.position.set(-6, 6, 2);
    scene.add(pCyan);

    const pViolet = new THREE.PointLight(0xa855f7, 1.4, 25);
    pViolet.position.set(0, 6, 2);
    scene.add(pViolet);

    const pGold = new THREE.PointLight(0xfbbf24, 1.6, 25);
    pGold.position.set(6, 6, 2);
    scene.add(pGold);

    // Floor Base (Platform Laboratorium Komparasi Datacenter)
    const floorGeo = new THREE.CylinderGeometry(9.5, 10.0, 0.35, 48);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x09122c, roughness: 0.6, metalness: 0.8 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -1.2;
    scene.add(floor);

    // Subtle Grid Floor
    const grid = new THREE.GridHelper(18, 18, 0x1e293b, 0x09122c);
    grid.position.y = -1.02;
    scene.add(grid);

    // -------------------------------------------------------------
    // BUILD 4 ALGORITHM PODS (FA, BA, HGACO, FIREBAT) SIDE-BY-SIDE
    // -------------------------------------------------------------
    // Each Pod has 4 VM server bars representing the allocation profile
    const podConfigs = [
      {
        id: 'fa',
        name: 'Firefly (FA)',
        colorHex: 0x38bdf8,
        centerX: -6.0,
        initialH: [3.4, 2.6, 2.0, 1.4],
        finalH: [3.0, 2.4, 2.0, 1.6],
        makespan: 19.3,
        doi: 0.185
      },
      {
        id: 'ba',
        name: 'Bat (BA)',
        colorHex: 0xa855f7,
        centerX: -2.0,
        initialH: [3.6, 2.2, 1.6, 0.8],
        finalH: [3.5, 2.0, 1.6, 0.9],
        makespan: 17.8,
        doi: 0.240
      },
      {
        id: 'hgaco',
        name: 'HGACO (GA-ACO)',
        colorHex: 0x4ce6cf,
        centerX: 2.0,
        // HGACO: Positive feedback ACO causes extreme bottleneck on VM-1 (3.7), VM-4 idle (1.1)
        initialH: [3.5, 2.5, 1.8, 1.2],
        finalH: [3.7, 2.6, 1.9, 1.1],
        makespan: 21.4,
        doi: 0.554
      },
      {
        id: 'fb',
        name: 'FireBat (Hybrid)',
        colorHex: 0xfbbf24,
        centerX: 6.0,
        // FireBat: Level balance across all VMs thanks to deviation load balancer
        initialH: [3.5, 2.2, 1.6, 0.8],
        finalH: [2.1, 2.1, 2.1, 2.1],
        makespan: 15.4,
        doi: 0.071
      }
    ];

    const pods = [];

    podConfigs.forEach((cfg) => {
      const pGroup = new THREE.Group();
      pGroup.position.set(cfg.centerX, -1.0, 0);

      // Pod Circular Pedestal
      const ped = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.3, 0.2, 32),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 })
      );
      ped.position.y = 0.1;
      pGroup.add(ped);

      // Glowing Perimeter Ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(2.0, 2.15, 32),
        new THREE.MeshBasicMaterial({ color: cfg.colorHex, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.21;
      pGroup.add(ring);

      // 4 VM Load Columns
      const vmBars = [];
      const colSpacing = 0.85;
      const startX = -1.5 * colSpacing / 2 - 0.42;

      for (let j = 0; j < 4; j++) {
        const xPos = startX + j * colSpacing;
        const bGroup = new THREE.Group();
        bGroup.position.set(xPos, 0.2, 0);

        // Rack Skeleton Frame
        const frame = new THREE.Mesh(
          new THREE.BoxGeometry(0.55, 3.8, 0.55),
          new THREE.MeshBasicMaterial({ color: 0x1e293b, wireframe: true, transparent: true, opacity: 0.35 })
        );
        frame.position.y = 1.9;
        bGroup.add(frame);

        // Dynamic Load Stack
        let barCol = cfg.colorHex;
        if (cfg.id === 'ba' && j === 0) barCol = 0xf43f5e; // VM-1 overload red on BA
        if (cfg.id === 'fb') barCol = 0xfbbf24;

        const stackMat = new THREE.MeshStandardMaterial({
          color: barCol,
          emissive: barCol,
          emissiveIntensity: 0.45,
          roughness: 0.25
        });
        const stackMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 0.5), stackMat);
        stackMesh.position.y = 0.5;
        bGroup.add(stackMesh);

        pGroup.add(bGroup);
        vmBars.push({ bGroup, stackMesh, stackMat, currentH: cfg.initialH[j] });
      }

      // Golden Target Line (Only for FireBat pod)
      let targetLine = null;
      if (cfg.id === 'fb') {
        targetLine = new THREE.Mesh(
          new THREE.BoxGeometry(3.2, 0.04, 0.04),
          new THREE.MeshBasicMaterial({ color: 0x34d399 })
        );
        targetLine.position.set(0, 0.2 + 2.1, 0);
        pGroup.add(targetLine);
      }

      // Floating Pod Emblem / Indicator above
      const emblem = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.25, 0),
        new THREE.MeshBasicMaterial({ color: cfg.colorHex, wireframe: true })
      );
      emblem.position.set(0, 4.3, 0);
      pGroup.add(emblem);

      scene.add(pGroup);
      pods.push({ cfg, pGroup, vmBars, targetLine, emblem });
    });

    // -------------------------------------------------------------
    // CAMERA PERSPECTIVE PRESETS
    // -------------------------------------------------------------
    const CAMERA_VIEWS = {
      all: { pos: [0, 8.0, 15.5], target: [0, 1.2, 0] },     // Wide view showing FA, BA, HGACO, FB
      fa: { pos: [-6.0, 5.2, 7.5], target: [-6.0, 1.2, 0] }, // Close-up on Firefly
      ba: { pos: [-2.0, 5.2, 7.5], target: [-2.0, 1.2, 0] }, // Close-up on Bat
      hgaco: { pos: [2.0, 5.2, 7.5], target: [2.0, 1.2, 0] },// Close-up on HGACO
      fb: { pos: [6.0, 5.2, 7.5], target: [6.0, 1.2, 0] }    // Close-up on FireBat
    };

    let targetCamPos = new THREE.Vector3(0, 7.5, 14);
    let targetCamTarget = new THREE.Vector3(0, 1.2, 0);
    let currentMode = 'all';

    function setFocusMode(mode) {
      currentMode = mode;
      const v = CAMERA_VIEWS[mode] || CAMERA_VIEWS.all;
      targetCamPos.set(v.pos[0], v.pos[1], v.pos[2]);
      targetCamTarget.set(v.target[0], v.target[1], v.target[2]);
    }

    // -------------------------------------------------------------
    // SIMULATION RUNNER & PROGRESS TIMELINE
    // -------------------------------------------------------------
    let isRunning = false;
    let iteration = 0;
    const maxIterations = 100;
    let stepCallback = null;
    let animId = null;
    let clock = new THREE.Clock();

    function updateSimulationStep(iter) {
      const p = iter / maxIterations;

      pods.forEach((pod) => {
        const { cfg, vmBars } = pod;
        for (let j = 0; j < 4; j++) {
          let h = cfg.initialH[j];

          if (cfg.id === 'fa') {
            // FA: slowly and noisily fluctuates towards finalH
            h = cfg.initialH[j] + (cfg.finalH[j] - cfg.initialH[j]) * (p * 0.75) + Math.sin(iter * 0.4 + j) * 0.08;
          } else if (cfg.id === 'ba') {
            // BA: drops fast in first 20 steps, then locks in local trap (VM-1 stays 3.5)
            const baP = Math.min(1, p * 3.0);
            h = cfg.initialH[j] + (cfg.finalH[j] - cfg.initialH[j]) * baP;
            if (j === 0) h = Math.max(3.3, h); // VM-1 stays trapped
          } else if (cfg.id === 'hgaco') {
            // HGACO: Positive feedback loop traps VM-1 in extreme bottleneck (3.7)
            const hP = Math.min(1, p * 1.5);
            h = cfg.initialH[j] + (cfg.finalH[j] - cfg.initialH[j]) * hP + Math.sin(iter * 0.3 + j) * 0.05;
          } else if (cfg.id === 'fb') {
            // FireBat: explores in p < 0.35, then rebalancing smoothly levels all to 2.1
            if (p < 0.35) {
              const t = p / 0.35;
              h = cfg.initialH[j] + (Math.sin(iter * 0.5 + j) * 0.15);
            } else {
              const t = (p - 0.35) / 0.65;
              h = cfg.initialH[j] + (2.1 - cfg.initialH[j]) * t;
            }
          }

          vmBars[j].currentH = h;
          vmBars[j].stackMesh.scale.y = Math.max(0.2, h);
          vmBars[j].stackMesh.position.y = h / 2;
        }

        // Color flash on FireBat when balanced
        if (cfg.id === 'fb' && p >= 0.95) {
          vmBars.forEach(b => {
            b.stackMat.color.setHex(0x34d399); // Turn Emerald Green
            b.stackMat.emissive.setHex(0x34d399);
          });
        }
      });

      // Compute live scores (Makespan in seconds)
      const faLive = (19.3 - p * 1.5 + Math.sin(iter * 0.2) * 0.3).toFixed(1);
      const baLive = (p < 0.25 ? 19.3 - (p / 0.25) * 1.5 : 17.8 + Math.sin(iter * 0.3) * 0.1).toFixed(1);
      const fbLive = (19.3 - p * 3.9).toFixed(1);

      return {
        fa: Number(faLive),
        ba: Number(baLive),
        fb: Number(fbLive)
      };
    }

    function resetSimulation() {
      isRunning = false;
      iteration = 0;
      updateSimulationStep(0);

      // Reset FireBat color back to Gold
      pods[2].vmBars.forEach(b => {
        b.stackMat.color.setHex(0xfbbf24);
        b.stackMat.emissive.setHex(0xfbbf24);
      });
    }

    resetSimulation();

    function animate() {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth camera interpolation
      camera.position.lerp(targetCamPos, 0.06);
      controls.target.lerp(targetCamTarget, 0.06);
      controls.update();

      // Pod emblems floating rotation
      pods.forEach((p, i) => {
        p.emblem.rotation.y += 0.02;
        p.emblem.rotation.x += 0.01;
        p.emblem.position.y = 4.3 + Math.sin(time * 2.5 + i) * 0.1;
      });

      if (isRunning) {
        iteration++;
        const bests = updateSimulationStep(iteration);

        if (stepCallback) {
          stepCallback(iteration, maxIterations, bests);
        }

        if (iteration >= maxIterations) {
          isRunning = false;
        }
      }

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
      start(cb) {
        stepCallback = cb;
        isRunning = true;
      },
      pause() {
        isRunning = false;
      },
      reset() {
        resetSimulation();
      },
      isRunning() {
        return isRunning;
      },
      setFocusMode,
      setFunction(mode) {
        // Compatibility wrapper for button clicks
        setFocusMode(mode);
      },
      resize,
      destroy() {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      }
    };
  }

  global.InteractiveSim3D = {
    initSimulation,
    initComparison3D: initSimulation
  };
})(window);
