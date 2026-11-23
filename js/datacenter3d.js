/**
 * 3D Scene Architecture for FireBat (Inspired by Cloud Kitchen HMMGA)
 * Features:
 * - Datacenter Floor with tiled tech pattern and subtle reflections
 * - Back Wall with glowing Neon Sign "DATACENTER ☁ CLOUD SCHEDULING"
 * - Server Stations (VM-1 to VM-4) with animated server racks, cooling fans, and LED indicator lights
 * - Task Towers (stack of tasks per VM) with golden target makespan line and ideal lower bound line
 * - Dispatch Station with task conveyor and Scheduler Manager avatar (FireBat Dispatcher)
 * - Swarm Optimization Arena (-32, 0, 0) with 3D Rastrigin landscape and animated FireBat swarm
 * - Smooth camera transitions between slides matching Cloud Kitchen's camera director
 */
(function (global) {
  'use strict';

  // 1. Tiled Datacenter Floor Texture
  function createFloorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 128, 128);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillRect(64, 64, 64, 64);

    ctx.strokeStyle = '#090d16';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, 128, 128);
    ctx.strokeRect(0, 0, 64, 64);
    ctx.strokeRect(64, 64, 64, 64);

    // Glowing subtle circuit dots
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath(); ctx.arc(32, 32, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(96, 96, 2, 0, Math.PI * 2); ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(36, 24);
    return tex;
  }

  // Camera views corresponding to slides
  const CAMERA_VIEWS = [
    // 0: Cover / Overview (Wide cinematic view of Datacenter)
    { pos: [0, 6.5, 16], target: [0, 2.2, 0], fov: 42 },
    // 1: Masalah (Focus on VM-1 and VM-4 showing imbalance)
    { pos: [-1.5, 5.0, 11], target: [-1.2, 2.2, 0], fov: 40 },
    // 2: Alur 3 Tahap (Conveyor & Dispatcher Station)
    { pos: [-6.8, 4.2, 9.5], target: [-5.2, 2.0, 1.2], fov: 38 },
    // 3: 3D Swarm Arena (Moved to the left arena zone)
    { pos: [-32, 8.5, 14], target: [-32, 1.8, 0], fov: 45 },
    // 4: Datacenter Scheduler (Full view of 4 VM Towers & Target Line)
    { pos: [0, 5.5, 13.5], target: [0, 2.4, 0], fov: 40 },
    // 5: Perbandingan 10 Beban Kerja (Front comparison angle)
    { pos: [0.5, 5.2, 12.5], target: [0.5, 2.1, 0], fov: 42 },
    // 6: Validasi CloudSim Paper (Macro Datacenter overview)
    { pos: [0, 7.5, 18], target: [0, 2.5, 0], fov: 44 },
    // 7: Penutup & Referensi (Wide cinematic angle)
    { pos: [2.5, 5.8, 15], target: [-0.5, 2.2, 0], fov: 40 }
  ];

  function createDatacenterScene(container) {
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b19);
    scene.fog = new THREE.Fog(0x070b19, 30, 75);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200);
    camera.position.set(0, 6.5, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.06;
    controls.minDistance = 4;
    controls.maxDistance = 50;

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x090d16, 0.6);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(8, 16, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Neon Accent Lights
    const neonPink = new THREE.PointLight(0xf43f5e, 1.2, 20);
    neonPink.position.set(0, 6.5, -3.2);
    scene.add(neonPink);

    const neonCyan = new THREE.PointLight(0x38bdf8, 1.5, 25);
    neonCyan.position.set(-6, 5, 2);
    scene.add(neonCyan);

    // --- Datacenter Environment ---
    const floorTex = createFloorTexture();
    const floorGeo = new THREE.PlaneGeometry(90, 60);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.7,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.receiveShadow = true;
    scene.add(floor);

    // Back Wall with Sci-Fi Datacenter Styling
    const wallGeo = new THREE.BoxGeometry(46, 12, 0.4);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, 6, -3.8);
    scene.add(wall);

    // Neon Sign "DATACENTER ☁ CLOUD SCHEDULING"
    const signGroup = new THREE.Group();
    signGroup.position.set(0, 6.2, -3.5);
    const signBoard = new THREE.Mesh(
      new THREE.BoxGeometry(11, 1.6, 0.1),
      new THREE.MeshBasicMaterial({ color: 0x090d16 })
    );
    const signBorder = new THREE.Mesh(
      new THREE.BoxGeometry(11.2, 1.8, 0.05),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.85 })
    );
    signGroup.add(signBorder);
    signGroup.add(signBoard);
    scene.add(signGroup);

    // Overhead Hanging Server Lamps
    [-6, 0, 6].forEach((x) => {
      const lamp = new THREE.Group();
      lamp.position.set(x, 7.5, 0.5);
      const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.5, 8), new THREE.MeshBasicMaterial({ color: 0x334155 }));
      cord.position.y = 1.25;
      const shade = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.5, 18, 1, true), new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.4 }));
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), new THREE.MeshBasicMaterial({ color: 0xfff2c6 }));
      bulb.position.y = -0.15;
      lamp.add(cord); lamp.add(shade); lamp.add(bulb);
      const pl = new THREE.PointLight(0xfff2c6, 1.2, 10, 1.5);
      pl.position.y = -0.4;
      lamp.add(pl);
      scene.add(lamp);
    });

    // --- 4 Server Stations (VM-1 to VM-4) ---
    const vms = [
      { id: 0, name: 'VM-1 (Small)', mips: 85, color: '#f87171', colorHex: 0xf87171, x: -5.4, width: 2.2 },
      { id: 1, name: 'VM-2 (Medium)', mips: 115, color: '#fbbf24', colorHex: 0xfbbf24, x: -1.8, width: 2.4 },
      { id: 2, name: 'VM-3 (Large)', mips: 145, color: '#38bdf8', colorHex: 0x38bdf8, x: 1.8, width: 2.6 },
      { id: 3, name: 'VM-4 (X-Large)', mips: 175, color: '#4ade80', colorHex: 0x4ade80, x: 5.4, width: 2.8 }
    ];

    const vmStations = [];

    vms.forEach((vm) => {
      const station = new THREE.Group();
      station.position.set(vm.x, 0, 0);

      // Server Desk / Rack Base
      const baseMesh = new THREE.Mesh(
        new THREE.BoxGeometry(vm.width, 0.85, 1.8),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.3 })
      );
      baseMesh.position.y = 0.425;
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      station.add(baseMesh);

      // Server Cabinet / Tower Frame behind desk
      const cabinet = new THREE.Mesh(
        new THREE.BoxGeometry(vm.width - 0.4, 3.8, 1.0),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 })
      );
      cabinet.position.set(0, 1.9 + 0.85, -0.6);
      station.add(cabinet);

      // Blinking Status LEDs on server cabinet
      const ledColors = [0x4ade80, 0x38bdf8, 0xfbbf24];
      const leds = [];
      for (let row = 0; row < 5; row++) {
        const led = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 8, 8),
          new THREE.MeshBasicMaterial({ color: ledColors[row % 3] })
        );
        led.position.set(0.6, 1.3 + row * 0.5, -0.08);
        station.add(led);
        leds.push(led);
      }

      // Dynamic Task Stack Pillar (Gantt Tower in 3D)
      const stackGroup = new THREE.Group();
      stackGroup.position.set(0, 0.85, 0.2);
      station.add(stackGroup);

      // Glowing Base Plate
      const plate = new THREE.Mesh(
        new THREE.CylinderGeometry(vm.width / 2, vm.width / 2 + 0.1, 0.08, 24),
        new THREE.MeshStandardMaterial({ color: vm.colorHex, emissive: vm.colorHex, emissiveIntensity: 0.3 })
      );
      plate.position.y = 0.04;
      station.add(plate);

      scene.add(station);
      vmStations.push({ vm, station, stackGroup, leds });
    });

    // Makespan & Ideal Lines across Datacenter
    const lineGroup = new THREE.Group();
    lineGroup.position.set(0, 0, 0.22);

    // Golden Makespan Target Line
    const mkLineGeo = new THREE.BoxGeometry(16, 0.04, 0.04);
    const mkLineMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    const mkLineMesh = new THREE.Mesh(mkLineGeo, mkLineMat);
    mkLineMesh.position.y = 4.2;
    lineGroup.add(mkLineMesh);

    // Cyan Ideal Lower Bound Line
    const idLineGeo = new THREE.BoxGeometry(16, 0.03, 0.03);
    const idLineMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const idLineMesh = new THREE.Mesh(idLineGeo, idLineMat);
    idLineMesh.position.y = 3.8;
    lineGroup.add(idLineMesh);

    scene.add(lineGroup);

    // --- Task Conveyor & Dispatch Station (Left side) ---
    const dispatchStation = new THREE.Group();
    dispatchStation.position.set(-8.8, 0, 1.2);

    // Conveyor table
    const table = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.85, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 })
    );
    table.position.y = 0.425;
    dispatchStation.add(table);

    // Conveyor Belt
    const belt = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.8 })
    );
    belt.position.y = 0.87;
    dispatchStation.add(belt);

    // Queue of Task Blocks waiting to be dispatched
    const queueBlocks = [];
    const blockPalette = [0xf87171, 0xfbbf24, 0x38bdf8, 0x4ade80, 0xa855f7];
    for (let q = 0; q < 5; q++) {
      const b = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.28, 0.35),
        new THREE.MeshStandardMaterial({
          color: blockPalette[q % blockPalette.length],
          metalness: 0.2,
          roughness: 0.4
        })
      );
      b.position.set(-0.8 + q * 0.4, 1.03, 0);
      dispatchStation.add(b);
      queueBlocks.push(b);
    }

    // Dispatcher Avatar / Mascot (Stylized Golden FireBat Agent)
    const mascot = new THREE.Group();
    mascot.position.set(0.8, 0.85, -0.6);
    // Body
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 0.4 })
    );
    body.position.y = 0.6;
    mascot.add(body);
    // Head with cute visor
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 14, 14),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2 })
    );
    head.position.set(0, 0.95, 0.05);
    mascot.add(head);
    const visor = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.1, 0.15),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    visor.position.set(0, 0.95, 0.18);
    mascot.add(visor);
    // Bat Wings
    const wingMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, side: THREE.DoubleSide });
    const wingL = new THREE.Mesh(new THREE.BufferGeometry(), wingMat);
    // Simple triangle wings
    const wGeo = new THREE.BufferGeometry();
    const wVertices = new Float32Array([0, 0, 0, -0.6, 0.4, -0.1, -0.4, -0.3, 0]);
    wGeo.setAttribute('position', new THREE.BufferAttribute(wVertices, 3));
    const wingMeshL = new THREE.Mesh(wGeo, wingMat);
    wingMeshL.position.set(-0.25, 0.6, 0);
    const wingMeshR = wingMeshL.clone();
    wingMeshR.scale.x = -1;
    wingMeshR.position.x = 0.25;
    mascot.add(wingMeshL); mascot.add(wingMeshR);

    dispatchStation.add(mascot);
    scene.add(dispatchStation);

    // --- SWARM ARENA ZONE (-32, 0, 0) ---
    // A distinct 3D Arena for Slide 4 Swarm Optimization
    const arenaGroup = new THREE.Group();
    arenaGroup.position.set(-32, 0, 0);

    const arenaPlatform = new THREE.Mesh(
      new THREE.CylinderGeometry(9.5, 10, 0.4, 48),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 })
    );
    arenaPlatform.position.y = 0.2;
    arenaGroup.add(arenaPlatform);

    // Ring glow
    const arenaRing = new THREE.Mesh(
      new THREE.RingGeometry(8.8, 9.2, 48),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide })
    );
    arenaRing.rotation.x = -Math.PI / 2;
    arenaRing.position.y = 0.41;
    arenaGroup.add(arenaRing);

    // 3D Landscape Surface (Rastrigin inside arena)
    let arenaTerrain = null;
    function buildArenaTerrain(landKey = 'rastrigin') {
      if (arenaTerrain) arenaGroup.remove(arenaTerrain);
      const land = global.SimEngine.LANDSCAPES[landKey];
      const R = land.range;
      const segs = 36;
      const geo = new THREE.PlaneGeometry(14, 14, segs, segs);
      geo.rotateX(-Math.PI / 2);
      const pos = geo.attributes.position;
      const colors = [];
      const colHelper = new THREE.Color();

      let minY = Infinity, maxY = -Infinity;
      for (let i = 0; i < pos.count; i++) {
        const x = (pos.getX(i) / 7) * R;
        const z = (pos.getZ(i) / 7) * R;
        const v = land.fn(x, z);
        pos.setY(i, v * 0.12);
        if (v < minY) minY = v;
        if (v > maxY) maxY = v;
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();

      for (let i = 0; i < pos.count; i++) {
        const h = pos.getY(i) / 0.12;
        const ratio = Math.pow((h - minY) / Math.max(1e-5, maxY - minY), 0.6);
        colHelper.setHSL(0.6 - ratio * 0.45, 0.85, 0.25 + ratio * 0.35);
        colors.push(colHelper.r, colHelper.g, colHelper.b);
      }
      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const mat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        wireframe: true,
        roughness: 0.6
      });
      arenaTerrain = new THREE.Mesh(geo, mat);
      arenaTerrain.position.y = 0.45;
      arenaGroup.add(arenaTerrain);
    }
    buildArenaTerrain('rastrigin');

    // Arena Swarm Particles
    const swarmMeshes = {
      fa: new THREE.Group(),
      ba: new THREE.Group(),
      firebat: new THREE.Group()
    };
    function createParticleGroup(hex, size = 0.28) {
      const g = new THREE.Group();
      const sGeo = new THREE.SphereGeometry(size, 12, 12);
      const sMat = new THREE.MeshStandardMaterial({ color: hex, emissive: hex, emissiveIntensity: 0.6 });
      for (let i = 0; i < 18; i++) {
        const m = new THREE.Mesh(sGeo, sMat);
        g.add(m);
      }
      return g;
    }
    swarmMeshes.fa = createParticleGroup(0x22d3ee, 0.25);
    swarmMeshes.ba = createParticleGroup(0xa855f7, 0.25);
    swarmMeshes.firebat = createParticleGroup(0xfbbf24, 0.36);
    arenaGroup.add(swarmMeshes.fa);
    arenaGroup.add(swarmMeshes.ba);
    arenaGroup.add(swarmMeshes.firebat);

    scene.add(arenaGroup);

    // --- State and Animation ---
    let cameraTarget = new THREE.Vector3(0, 2.2, 0);
    let cameraPos = new THREE.Vector3(0, 6.5, 16);
    let targetFov = 42;
    let animId = null;
    let swarm3DManager = global.SimEngine.create3DSwarm('rastrigin', 101);

    function updateSwarmPositions() {
      if (!swarm3DManager) return;
      const R = swarm3DManager.land.range;

      function sync(group, list) {
        for (let i = 0; i < list.length; i++) {
          const p = list[i];
          const m = group.children[i];
          if (m) {
            const wx = (p.x / R) * 7;
            const wz = (p.z / R) * 7;
            m.position.set(wx, p.y * 0.12 + 0.6, wz);
          }
        }
      }
      sync(swarmMeshes.fa, swarm3DManager.fireflies);
      sync(swarmMeshes.ba, swarm3DManager.bats);
      sync(swarmMeshes.firebat, swarm3DManager.firebat);
    }

    // Function to populate VM task towers (3D Gantt blocks)
    function updateScheduleBlocks(scheduleEval, idealMakespan = 14.2) {
      const scaleY = 0.24; // height multiplier per second

      vmStations.forEach((st, vmIdx) => {
        // Clear previous blocks
        while (st.stackGroup.children.length > 0) {
          st.stackGroup.remove(st.stackGroup.children[0]);
        }

        const tasks = scheduleEval.vmTasks[vmIdx] || [];
        tasks.forEach((t, i) => {
          const h = Math.max(0.12, t.duration * scaleY);
          const y = t.start * scaleY + h / 2;
          const block = new THREE.Mesh(
            new THREE.BoxGeometry(st.vm.width - 0.5, h - 0.02, 1.1),
            new THREE.MeshStandardMaterial({
              color: blockPalette[(t.id + i) % blockPalette.length],
              metalness: 0.3,
              roughness: 0.4
            })
          );
          block.position.set(0, y, 0);
          block.castShadow = true;
          st.stackGroup.add(block);
        });

        // Flash leds
        st.leds.forEach((led, i) => {
          led.visible = Math.sin(Date.now() * 0.005 + vmIdx + i) > -0.2;
        });
      });

      // Update Lines
      mkLineMesh.position.y = 0.85 + scheduleEval.makespan * scaleY;
      idLineMesh.position.y = 0.85 + idealMakespan * scaleY;
    }

    // Smooth Camera Transition to a Slide View
    function setCameraView(viewIndex, smooth = true) {
      const v = CAMERA_VIEWS[viewIndex] || CAMERA_VIEWS[0];
      cameraPos.set(v.pos[0], v.pos[1], v.pos[2]);
      cameraTarget.set(v.target[0], v.target[1], v.target[2]);
      targetFov = v.fov;
      controls.target.copy(cameraTarget);

      if (!smooth) {
        camera.position.copy(cameraPos);
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }
    }

    function animate() {
      animId = requestAnimationFrame(animate);

      // Smooth camera damp
      camera.position.lerp(cameraPos, 0.06);
      controls.target.lerp(cameraTarget, 0.06);
      controls.update();

      // Conveyor belt animation
      queueBlocks.forEach((b, i) => {
        b.position.x += 0.005;
        if (b.position.x > 1.0) b.position.x = -1.0;
      });

      // Mascot idle hover
      mascot.position.y = 0.85 + Math.sin(Date.now() * 0.004) * 0.06;
      wingMeshL.rotation.y = Math.sin(Date.now() * 0.012) * 0.4;
      wingMeshR.rotation.y = -Math.sin(Date.now() * 0.012) * 0.4;

      renderer.render(scene, camera);
    }

    function resize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', resize);
    animate();

    return {
      scene,
      camera,
      controls,
      setCameraView,
      updateScheduleBlocks,
      buildArenaTerrain,
      updateSwarmPositions,
      stepArenaSwarm() {
        if (!swarm3DManager) return null;
        const res = swarm3DManager.step();
        updateSwarmPositions();
        return res;
      },
      resetArenaSwarm(landKey, seed) {
        swarm3DManager = global.SimEngine.create3DSwarm(landKey, seed);
        buildArenaTerrain(landKey);
        updateSwarmPositions();
      },
      destroy() {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      }
    };
  }

  global.Datacenter3D = {
    createDatacenterScene
  };
})(window);
