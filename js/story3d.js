/**
 * 3D Storytelling Engine for FireBat Cloud Task Scheduling
 * 6-Step Sequential Scenario:
 * Step 1: Banjir Task Tiba di Cloud (Incoming Task Queue)
 * Step 2: Masalah Penjadwalan Biasa (VM-1 Overload Merah vs VM-4 Idle)
 * Step 3: Eksplorasi Global oleh Firefly (Kunang-kunang memindai kombinasi rute)
 * Step 4: Eksploitasi Cepat oleh Bat Algorithm (Kelelawar menukik mempertajam detail)
 * Step 5: Senjata Rahasia FireBat (Migrasi Task dari VM-1 ke VM-4)
 * Step 6: Hasil Akhir Sempurna (Semua VM Rata Sejajar di Garis Emas)
 */
(function (global) {
  'use strict';

  function initStory3D(container) {
    let width = container.clientWidth || 700;
    let height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030718);
    scene.fog = new THREE.FogExp2(0x030718, 0.022);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4.5, 12);

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

    const lightGold = new THREE.PointLight(0xfbbf24, 2.0, 30);
    lightGold.position.set(4, 9, 6);
    scene.add(lightGold);

    const lightCyan = new THREE.PointLight(0x38bdf8, 1.8, 30);
    lightCyan.position.set(-6, 7, 4);
    scene.add(lightCyan);

    const lightViolet = new THREE.PointLight(0xa855f7, 1.6, 25);
    lightViolet.position.set(6, 7, 4);
    scene.add(lightViolet);

    // Datacenter Floor Base
    const floorGeo = new THREE.CylinderGeometry(8.2, 8.8, 0.35, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x09122c,
      roughness: 0.6,
      metalness: 0.8
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -1.2;
    scene.add(floor);

    // Circuit Base Ring
    const radarRing = new THREE.Mesh(
      new THREE.RingGeometry(4.8, 4.95, 48),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.35 })
    );
    radarRing.rotation.x = -Math.PI / 2;
    radarRing.position.y = -1.01;
    scene.add(radarRing);

    // ==========================================
    // 4 VIRTUAL MACHINE RACKS (VM-1 to VM-4)
    // ==========================================
    const vmData = [
      { id: 1, name: 'VM-1 (Small)', mips: 85, x: -3.6, color: 0xf87171 },
      { id: 2, name: 'VM-2 (Medium)', mips: 115, x: -1.2, color: 0xfbbf24 },
      { id: 3, name: 'VM-3 (Large)', mips: 145, x: 1.2, color: 0x38bdf8 },
      { id: 4, name: 'VM-4 (X-Large)', mips: 175, x: 3.6, color: 0x4ade80 }
    ];

    const vmRacks = [];
    const rackGroup = new THREE.Group();

    vmData.forEach((vm) => {
      const g = new THREE.Group();
      g.position.set(vm.x, -1.0, 0);

      // Chassis Stand Pedestal
      const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(0.85, 0.95, 0.22, 24),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 })
      );
      pedestal.position.y = 0.11;
      g.add(pedestal);

      // Inner Rack Column Skeleton
      const skeleton = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 3.6, 0.7),
        new THREE.MeshBasicMaterial({ color: 0x1e293b, wireframe: true })
      );
      skeleton.position.y = 1.9;
      g.add(skeleton);

      // Dynamic Workload Stack Block
      const stackMat = new THREE.MeshStandardMaterial({
        color: vm.color,
        emissive: vm.color,
        emissiveIntensity: 0.45,
        roughness: 0.2
      });
      const stackMesh = new THREE.Mesh(new THREE.BoxGeometry(0.82, 1, 0.62), stackMat);
      stackMesh.position.y = 0.5 + 0.22;
      g.add(stackMesh);

      // Floating Status Beacon on top of rack
      const beaconGeo = new THREE.OctahedronGeometry(0.18, 0);
      const beaconMat = new THREE.MeshBasicMaterial({ color: vm.color, wireframe: true });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.y = 3.9;
      g.add(beacon);

      rackGroup.add(g);
      vmRacks.push({
        group: g,
        stackMesh,
        stackMat,
        beacon,
        vm,
        currentHeight: 1.0,
        targetHeight: 1.0
      });
    });

    scene.add(rackGroup);

    // ==========================================
    // STEP 1: INCOMING TASK QUEUE BUFFER
    // ==========================================
    const step1Group = new THREE.Group();
    const taskCubes = [];
    const taskColors = [0x38bdf8, 0xa855f7, 0xfbbf24, 0x34d399, 0xf43f5e];

    for (let i = 0; i < 18; i++) {
      const col = taskColors[i % taskColors.length];
      const size = 0.24 + (i % 3) * 0.08;
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.6, roughness: 0.3 })
      );
      cube.position.set(-4.0 + (i % 6) * 1.6, 3.4 + Math.floor(i / 6) * 0.8, -1.0 + (Math.random() - 0.5) * 0.8);
      step1Group.add(cube);
      taskCubes.push({
        mesh: cube,
        baseY: cube.position.y,
        baseX: cube.position.x,
        speed: 0.02 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Queue overhead conveyor beam
    const queueBeam = new THREE.Mesh(
      new THREE.BoxGeometry(9.6, 0.08, 0.4),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 })
    );
    queueBeam.position.set(0, 3.2, -1.0);
    step1Group.add(queueBeam);

    scene.add(step1Group);

    // ==========================================
    // STEP 3: FIREFLY GLOBAL EXPLORATION PROBES
    // ==========================================
    const step3Group = new THREE.Group();
    const fireflyProbes = [];
    const ffGeo = new THREE.SphereGeometry(0.16, 12, 12);
    const ffMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.0
    });

    for (let i = 0; i < 12; i++) {
      const fGroup = new THREE.Group();
      const orb = new THREE.Mesh(ffGeo, ffMat);
      fGroup.add(orb);

      // Scanning cone downward
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.3, 0.9, 12, 1, true),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.3, side: THREE.DoubleSide })
      );
      cone.position.y = -0.45;
      fGroup.add(cone);

      const angle = (i / 12) * Math.PI * 2;
      const rad = 2.8 + (Math.random() - 0.5) * 2;
      fGroup.position.set(Math.cos(angle) * rad, 1.2 + Math.random() * 2.0, Math.sin(angle) * rad);
      step3Group.add(fGroup);

      fireflyProbes.push({
        group: fGroup,
        angle,
        rad,
        speed: 0.015 + Math.random() * 0.015,
        baseY: fGroup.position.y
      });
    }

    scene.add(step3Group);

    // ==========================================
    // STEP 4: BAT EXPLOITATION SONAR CONES
    // ==========================================
    const step4Group = new THREE.Group();
    const batProbes = [];
    const baMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 1.0
    });

    for (let i = 0; i < 8; i++) {
      const bGroup = new THREE.Group();
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 8), baMat);
      cone.rotation.x = Math.PI;
      bGroup.add(cone);

      const sonarPulse = new THREE.Mesh(
        new THREE.RingGeometry(0.1, 0.45, 16),
        new THREE.MeshBasicMaterial({ color: 0xc084fc, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })
      );
      sonarPulse.rotation.x = -Math.PI / 2;
      sonarPulse.position.y = -0.4;
      bGroup.add(sonarPulse);

      bGroup.position.set((Math.random() - 0.5) * 6, 2.0 + Math.random() * 1.5, (Math.random() - 0.5) * 2);
      step4Group.add(bGroup);

      batProbes.push({
        group: bGroup,
        sonarPulse,
        target: new THREE.Vector3((Math.random() - 0.5) * 5, 0.8 + Math.random() * 1.2, (Math.random() - 0.5) * 1.5),
        speed: 0.04 + Math.random() * 0.02
      });
    }

    scene.add(step4Group);

    // ==========================================
    // STEP 5: SMART MIGRATION ARTIFACTS
    // ==========================================
    const step5Group = new THREE.Group();

    // Golden Arc Trajectory Curve from VM-1 (x: -3.6) to VM-4 (x: 3.6)
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-3.6, 2.8, 0),
      new THREE.Vector3(0, 5.0, 0),
      new THREE.Vector3(3.6, 2.3, 0)
    );
    const curvePoints = curve.getPoints(50);
    const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const curveMat = new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.75 });
    const arcLine = new THREE.Line(curveGeo, curveMat);
    step5Group.add(arcLine);

    // Migrating Heavy Task Block (Golden Glowing Cube)
    const migratingTask = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.42, 0.42),
      new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xfbbf24,
        emissiveIntensity: 0.95,
        metalness: 0.8
      })
    );
    step5Group.add(migratingTask);

    scene.add(step5Group);

    // ==========================================
    // GOLDEN LEVELING TARGET LINE (For Step 5 & 6)
    // ==========================================
    const goldenTargetBeam = new THREE.Mesh(
      new THREE.BoxGeometry(9.6, 0.04, 0.04),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    goldenTargetBeam.position.set(0, -1.0 + 0.22 + 2.1, 0);
    goldenTargetBeam.visible = false;
    scene.add(goldenTargetBeam);

    // ==========================================
    // STEP STATE MANAGER
    // ==========================================
    let currentStep = 1;
    let animId = null;
    let clock = new THREE.Clock();
    let migrationT = 0;

    // Heights for 4 VMs per step
    const HEIGHT_PROFILES = {
      1: [0.8, 0.8, 0.8, 0.8],      // Step 1: Blank baseline (tasks waiting above)
      2: [3.6, 1.8, 1.5, 0.6],      // Step 2: Severe Overload on VM-1 (3.6) vs VM-4 (0.6)
      3: [3.3, 1.9, 1.7, 0.9],      // Step 3: Firefly exploring permutations
      4: [2.9, 2.0, 1.8, 1.1],      // Step 4: Bat narrowing down
      5: [3.6, 2.1, 2.1, 0.6],      // Step 5: Base for migration animation
      6: [2.1, 2.1, 2.1, 2.1]       // Step 6: Perfectly Balanced!
    };

    function setStep(stepNum) {
      currentStep = stepNum;

      // Group visibilities
      step1Group.visible = (stepNum === 1);
      step3Group.visible = (stepNum === 3);
      step4Group.visible = (stepNum === 4);
      step5Group.visible = (stepNum === 5);
      goldenTargetBeam.visible = (stepNum >= 5);

      // Camera transitions
      if (stepNum === 1) {
        camera.position.set(0, 5.2, 12);
        controls.target.set(0, 1.5, 0);
      } else if (stepNum === 2) {
        camera.position.set(-2.0, 4.0, 10.5);
        controls.target.set(-1.0, 1.2, 0);
      } else if (stepNum === 3) {
        camera.position.set(0, 5.0, 11);
        controls.target.set(0, 1.2, 0);
      } else if (stepNum === 4) {
        camera.position.set(1.5, 4.2, 10);
        controls.target.set(0.5, 1.2, 0);
      } else if (stepNum === 5) {
        camera.position.set(0, 4.2, 11);
        controls.target.set(0, 1.2, 0);
        migrationT = 0;
      } else if (stepNum === 6) {
        camera.position.set(0, 3.6, 10.5);
        controls.target.set(0, 1.0, 0);
      }

      // Update rack heights & colors
      const heights = HEIGHT_PROFILES[stepNum] || HEIGHT_PROFILES[1];
      vmRacks.forEach((vr, i) => {
        vr.targetHeight = heights[i];

        if (stepNum === 2) {
          if (i === 0) {
            vr.stackMat.color.setHex(0xf43f5e); // Pulsing Red Overload
            vr.stackMat.emissive.setHex(0xf43f5e);
            vr.beacon.material.color.setHex(0xf43f5e);
          } else if (i === 3) {
            vr.stackMat.color.setHex(0x64748b); // Grey Idle
            vr.stackMat.emissive.setHex(0x64748b);
          } else {
            vr.stackMat.color.setHex(vr.vm.color);
            vr.stackMat.emissive.setHex(vr.vm.color);
          }
        } else if (stepNum === 6) {
          // All Green / Gold Harmony
          vr.stackMat.color.setHex(0x34d399);
          vr.stackMat.emissive.setHex(0x34d399);
          vr.beacon.material.color.setHex(0xfbbf24);
        } else {
          vr.stackMat.color.setHex(vr.vm.color);
          vr.stackMat.emissive.setHex(vr.vm.color);
          vr.beacon.material.color.setHex(vr.vm.color);
        }
      });
    }

    setStep(1);

    function animate() {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      controls.update();

      // Smooth Rack Height Interpolation
      vmRacks.forEach((vr, i) => {
        vr.beacon.rotation.y += 0.02;
        vr.beacon.rotation.x += 0.01;

        if (currentStep !== 5) {
          vr.currentHeight += (vr.targetHeight - vr.currentHeight) * 0.08;
          vr.stackMesh.scale.y = vr.currentHeight;
          vr.stackMesh.position.y = 0.22 + vr.currentHeight / 2;
        }
      });

      // Step 1: Floating task cubes
      if (currentStep === 1) {
        taskCubes.forEach((tc) => {
          tc.mesh.position.y = tc.baseY + Math.sin(time * 3 + tc.phase) * 0.15;
          tc.mesh.rotation.y += tc.speed;
          tc.mesh.rotation.x += tc.speed * 0.5;
        });
      }

      // Step 2: Red alarm pulse on VM-1
      if (currentStep === 2) {
        const pulse = 0.5 + Math.sin(time * 8) * 0.45;
        vmRacks[0].stackMat.emissiveIntensity = pulse;
      }

      // Step 3: Firefly Probes Orbit
      if (currentStep === 3) {
        fireflyProbes.forEach((fp) => {
          fp.angle += fp.speed;
          fp.group.position.x = Math.cos(fp.angle) * fp.rad;
          fp.group.position.z = Math.sin(fp.angle) * fp.rad;
          fp.group.position.y = fp.baseY + Math.sin(time * 3 + fp.angle) * 0.35;
        });
      }

      // Step 4: Bat Sonar Probes Darting
      if (currentStep === 4) {
        batProbes.forEach((bp) => {
          bp.group.position.lerp(bp.target, bp.speed);
          bp.sonarPulse.scale.setScalar(1 + Math.sin(time * 9) * 0.35);
          if (bp.group.position.distanceTo(bp.target) < 0.25) {
            bp.target.set((Math.random() - 0.5) * 5, 0.6 + Math.random() * 1.5, (Math.random() - 0.5) * 1.5);
          }
        });
      }

      // Step 5: Smooth Migration Flight (Arc from VM-1 to VM-4)
      if (currentStep === 5) {
        migrationT = (migrationT + 0.008) % 1;
        const pt = curve.getPoint(migrationT);
        migratingTask.position.copy(pt);
        migratingTask.rotation.y += 0.06;
        migratingTask.rotation.x += 0.04;

        // Dynamic height adjustment during flight
        let vm1H = 3.6, vm4H = 0.6;
        if (migrationT > 0.3) {
          const tProgress = (migrationT - 0.3) / 0.7;
          vm1H = 3.6 - tProgress * 1.5; // Decreases to 2.1
          vm4H = 0.6 + tProgress * 1.5; // Increases to 2.1
        }
        vmRacks[0].stackMesh.scale.y = vm1H;
        vmRacks[0].stackMesh.position.y = 0.22 + vm1H / 2;

        vmRacks[3].stackMesh.scale.y = vm4H;
        vmRacks[3].stackMesh.position.y = 0.22 + vm4H / 2;
      }

      // Step 6: Harmonious Golden Target Line pulse
      if (currentStep === 6) {
        goldenTargetBeam.scale.y = 1 + Math.sin(time * 4) * 0.2;
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
      setStep,
      getStep() { return currentStep; },
      resize,
      destroy() {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      }
    };
  }

  global.Story3D = {
    initStory3D
  };
})(window);
