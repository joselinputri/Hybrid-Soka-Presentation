/**
 * Three.js 3D Visualizer Components:
 * 1. Landscape3D: 3D Wireframe/Surface of Rastrigin, Ackley, Sphere with animated swarms
 * 2. CloudDatacenter3D: 3D Server racks showing VM loads in real-time
 */
(function (global) {
  'use strict';

  // 1. Landscape 3D Viewer
  function init3DLandscape(container, options = {}) {
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x04081c);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 16, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1; // don't go below ground

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // Grid helper on ground
    const grid = new THREE.GridHelper(24, 24, 0x38bdf8, 0x1e293b);
    grid.position.y = -0.05;
    scene.add(grid);

    let terrainMesh = null;
    let particles = { fa: null, ba: null, firebat: null };
    let swarmManager = null;
    let animId = null;
    let currentLandscape = 'rastrigin';

    function buildTerrain(landKey) {
      if (terrainMesh) scene.remove(terrainMesh);
      const land = global.SimEngine.LANDSCAPES[landKey];
      const R = land.range;
      const segs = 48;
      const geo = new THREE.PlaneGeometry(20, 20, segs, segs);
      geo.rotateX(-Math.PI / 2);

      const pos = geo.attributes.position;
      const colors = [];
      const colorHelper = new THREE.Color();

      let minY = Infinity, maxY = -Infinity;
      for (let i = 0; i < pos.count; i++) {
        const x = (pos.getX(i) / 10) * R;
        const z = (pos.getZ(i) / 10) * R;
        const val = land.fn(x, z);
        pos.setY(i, val * 0.15); // scaled height
        if (val < minY) minY = val;
        if (val > maxY) maxY = val;
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();

      // Vertex coloring (Deep blue at valleys/optimum -> Violet/Pink at peaks)
      for (let i = 0; i < pos.count; i++) {
        const h = pos.getY(i) / 0.15;
        const ratio = Math.pow((h - minY) / Math.max(1e-5, maxY - minY), 0.6);
        colorHelper.setHSL(0.6 - ratio * 0.45, 0.85, 0.2 + ratio * 0.4);
        colors.push(colorHelper.r, colorHelper.g, colorHelper.b);
      }
      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const mat = new THREE.MeshStandardMaterial({
        vertexColors: true,
        wireframe: true,
        roughness: 0.8,
        metalness: 0.2
      });

      terrainMesh = new THREE.Mesh(geo, mat);
      scene.add(terrainMesh);
    }

    function initSwarmMeshes() {
      // Clean old
      Object.keys(particles).forEach(k => {
        if (particles[k]) scene.remove(particles[k]);
      });

      const N = 18;
      function makeSwarmGroup(colorHex, size = 0.35) {
        const group = new THREE.Group();
        const sphereGeo = new THREE.SphereGeometry(size, 16, 16);
        const mat = new THREE.MeshStandardMaterial({
          color: colorHex,
          emissive: colorHex,
          emissiveIntensity: 0.6,
          roughness: 0.2
        });

        for (let i = 0; i < N; i++) {
          const m = new THREE.Mesh(sphereGeo, mat);
          group.add(m);
        }
        return group;
      }

      particles.fa = makeSwarmGroup(0x22d3ee); // Cyan Kunang-kunang
      particles.ba = makeSwarmGroup(0xa855f7); // Violet Kelelawar
      particles.firebat = makeSwarmGroup(0xfbbf24, 0.45); // Emas FireBat

      scene.add(particles.fa);
      scene.add(particles.ba);
      scene.add(particles.firebat);
    }

    function updateParticlesPositions() {
      if (!swarmManager) return;
      const R = swarmManager.land.range;

      function syncGroup(group, list) {
        for (let i = 0; i < list.length; i++) {
          const p = list[i];
          const mesh = group.children[i];
          if (mesh) {
            const worldX = (p.x / R) * 10;
            const worldZ = (p.z / R) * 10;
            mesh.position.set(worldX, p.y * 0.15 + 0.3, worldZ);
          }
        }
      }

      syncGroup(particles.fa, swarmManager.fireflies);
      syncGroup(particles.ba, swarmManager.bats);
      syncGroup(particles.firebat, swarmManager.firebat);
    }

    function setFilterMode(mode) {
      // mode: 'all', 'firebat', 'fa', 'ba'
      if (!particles.fa) return;
      particles.fa.visible = (mode === 'all' || mode === 'fa');
      particles.ba.visible = (mode === 'all' || mode === 'ba');
      particles.firebat.visible = (mode === 'all' || mode === 'firebat');
    }

    function loadLandscape(landKey, seed = 42) {
      currentLandscape = landKey;
      buildTerrain(landKey);
      initSwarmMeshes();
      swarmManager = global.SimEngine.create3DSwarm(landKey, seed);
      updateParticlesPositions();
    }

    function step() {
      if (!swarmManager) return null;
      const res = swarmManager.step();
      updateParticlesPositions();
      return res;
    }

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', resize);
    loadLandscape(currentLandscape);
    animate();

    return {
      step,
      loadLandscape,
      setFilterMode,
      resize,
      destroy() {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      }
    };
  }

  // 2. 3D Cloud Datacenter Viewer
  function init3DDatacenter(container) {
    let width = container.clientWidth || 800;
    let height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030718);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 10, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const pLight = new THREE.PointLight(0x38bdf8, 1.2, 50);
    pLight.position.set(0, 12, 5);
    scene.add(pLight);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(20, 14);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x09122c, roughness: 0.7 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.05;
    scene.add(floor);

    // 4 Server Racks (Representing 4 VMs: VM-1 to VM-4)
    const racks = [];
    const vms = global.SimEngine.DEFAULT_VMS;
    const rackWidth = 2.4;
    const startX = -((vms.length - 1) * 3.6) / 2;

    for (let i = 0; i < vms.length; i++) {
      const group = new THREE.Group();
      group.position.set(startX + i * 3.6, 0, 0);

      // Outer Rack Frame
      const frameGeo = new THREE.BoxGeometry(rackWidth, 6.5, 2.2);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.8,
        roughness: 0.3,
        wireframe: false
      });
      const rackFrame = new THREE.Mesh(frameGeo, frameMat);
      rackFrame.position.y = 3.25;
      group.add(rackFrame);

      // Internal Dynamic Load Pillar (grows with VM load time)
      const barGeo = new THREE.BoxGeometry(rackWidth - 0.5, 1, 1.6);
      const barMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(vms[i].color),
        emissive: new THREE.Color(vms[i].color),
        emissiveIntensity: 0.4
      });
      const loadBar = new THREE.Mesh(barGeo, barMat);
      loadBar.position.y = 0.5;
      group.add(loadBar);

      scene.add(group);
      racks.push({ group, loadBar, vm: vms[i] });
    }

    let animId = null;

    function updateLoads(vmLoads, makespan) {
      const maxH = 5.8;
      for (let i = 0; i < racks.length; i++) {
        const load = vmLoads[i] || 0;
        const normH = Math.max(0.2, (load / Math.max(1, makespan * 1.1)) * maxH);
        racks[i].loadBar.scale.set(1, normH, 1);
        racks[i].loadBar.position.y = normH / 2 + 0.1;

        // Turn red if overloaded (> average + 5%)
        const avg = vmLoads.reduce((a, b) => a + b, 0) / vmLoads.length;
        if (load > avg * 1.08) {
          racks[i].loadBar.material.color.setHex(0xf43f5e);
          racks[i].loadBar.material.emissive.setHex(0xf43f5e);
        } else {
          racks[i].loadBar.material.color.set(racks[i].vm.color);
          racks[i].loadBar.material.emissive.set(racks[i].vm.color);
        }
      }
    }

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', resize);
    animate();

    return {
      updateLoads,
      resize,
      destroy() {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      }
    };
  }

  global.Visual3D = {
    init3DLandscape,
    init3DDatacenter
  };
})(window);
