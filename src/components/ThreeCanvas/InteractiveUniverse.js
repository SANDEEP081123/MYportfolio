import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * InteractiveUniverse
 * Immersive 3D WebGL background environment featuring:
 * - Living Galaxy (3,500+ particles with gravitation/repulsion physics)
 * - Digital Procedural Wireframe Terrain with real-time cursor deformation & wave simulation
 * - Floating Glass World (Translucent physical geometric objects with refraction & reflections)
 * - Dynamic 3D Cursor Spotlight with inertia
 * - Deep Parallax Engine linked to mouse velocity and scroll position
 * - Adaptive Quality & Tab-pause optimizations
 */
const InteractiveUniverse = ({ quality = 'HIGH' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Performance detection
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Determine particle count and complexity based on quality prop
    let starCount = 3800;
    let terrainSegments = 48;
    if (quality === 'MEDIUM' || isMobile) {
      starCount = 1800;
      terrainSegments = 32;
    } else if (quality === 'LOW') {
      starCount = 800;
      terrainSegments = 20;
    }

    if (prefersReducedMotion) {
      starCount = 1000;
    }

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 24);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: quality === 'HIGH' && !isMobile,
      alpha: true,
      stencil: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality === 'HIGH' ? 2 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 2. Lighting System (Dynamic cursor spotlight + ambient cosmic glow)
    const ambientLight = new THREE.AmbientLight(0x0a1026, 1.8);
    scene.add(ambientLight);

    // Cyan/Blue spotlight that tracks the mouse cursor in 3D
    const cursorLight = new THREE.PointLight(0x00f0ff, 4.5, 45, 1.5);
    cursorLight.position.set(0, 0, 10);
    scene.add(cursorLight);

    // Violet counter-light for cinematic dual-tone highlights
    const violetLight = new THREE.PointLight(0x8b00ff, 3.8, 40, 1.8);
    violetLight.position.set(-8, 5, 8);
    scene.add(violetLight);

    // Deep blue rim light from below
    const rimLight = new THREE.DirectionalLight(0x0055ff, 1.2);
    rimLight.position.set(0, -10, 5);
    scene.add(rimLight);

    // 3. Living Galaxy (Layer 1 - Starfield with attraction physics)
    const galaxyGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const originalPositions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const velocities = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0x8b00ff), // Violet
      new THREE.Color(0x38bdf8), // Sky blue
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0xffffff), // Pure star white
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Spread in a large cylindrical disc with depth
      const radius = THREE.MathUtils.randFloat(8, 70);
      const angle = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const ySpread = THREE.MathUtils.randFloatSpread(40);

      const x = Math.cos(angle) * radius;
      const y = ySpread;
      const z = Math.sin(angle) * radius - 10;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Assign cosmic gradient colors
      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create custom smooth circle star texture programmatically (no external image required)
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 32;
    starCanvas.height = 32;
    const ctx = starCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(0,240,255,0.8)');
    grad.addColorStop(0.7, 'rgba(139,0,255,0.2)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const starTexture = new THREE.CanvasTexture(starCanvas);

    const galaxyMat = new THREE.PointsMaterial({
      size: quality === 'HIGH' ? 0.75 : 0.6,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });

    const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
    scene.add(galaxy);

    // 4. Digital Procedural Wireframe Terrain (Layer 2)
    const terrainWidth = 80;
    const terrainHeight = 80;
    const terrainGeo = new THREE.PlaneGeometry(
      terrainWidth,
      terrainHeight,
      terrainSegments,
      terrainSegments
    );
    terrainGeo.rotateX(-Math.PI / 2);
    terrainGeo.translate(0, -6, -8);

    const terrainPos = terrainGeo.attributes.position;
    const terrainOriginalY = new Float32Array(terrainPos.count);
    for (let i = 0; i < terrainPos.count; i++) {
      terrainOriginalY[i] = terrainPos.getY(i);
    }

    // Material with glowing neon lines and transparent facets
    const terrainWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const terrain = new THREE.Mesh(terrainGeo, terrainWireMat);
    scene.add(terrain);

    // Secondary subtle terrain glow plane directly underneath
    const terrainGlowMat = new THREE.MeshStandardMaterial({
      color: 0x070e28,
      roughness: 0.7,
      metalness: 0.4,
      emissive: 0x140a38,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.6,
    });
    const terrainGlowMesh = new THREE.Mesh(terrainGeo.clone(), terrainGlowMat);
    terrainGlowMesh.position.y -= 0.05;
    scene.add(terrainGlowMesh);

    // 5. Floating Glass World (Layer 3 - Translucent 3D Objects)
    const glassGroup = new THREE.Group();
    scene.add(glassGroup);

    // Glass material with transmission / refraction
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      roughness: 0.12,
      transmission: quality === 'HIGH' ? 0.85 : 0.6,
      ior: 1.5,
      thickness: 1.2,
      metalness: 0.1,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      color: 0x88ccff,
      emissive: 0x1a0f35,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.88,
    });

    // Accent chrome/neon materials
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.95,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.25,
    });

    const neonRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    // Object 1: Central Icosahedron Crystal
    const crystalGeo = new THREE.IcosahedronGeometry(2.2, 0);
    const crystalMesh = new THREE.Mesh(crystalGeo, glassMaterial);
    crystalMesh.position.set(7, 3, 2);
    crystalMesh.userData = {
      baseX: 7,
      baseY: 3,
      baseZ: 2,
      floatSpeed: 0.0015,
      rotX: 0.004,
      rotY: 0.006,
    };
    glassGroup.add(crystalMesh);

    // Outer wireframe cage for crystal
    const crystalWire = new THREE.Mesh(crystalGeo, neonRingMaterial);
    crystalWire.scale.set(1.08, 1.08, 1.08);
    crystalMesh.add(crystalWire);

    // Object 2: Torus Knot Cyber Ring
    const torusGeo = new THREE.TorusGeometry(1.9, 0.45, 24, 60);
    const torusMesh = new THREE.Mesh(torusGeo, glassMaterial);
    torusMesh.position.set(-8, 4, 0);
    torusMesh.userData = {
      baseX: -8,
      baseY: 4,
      baseZ: 0,
      floatSpeed: 0.0018,
      rotX: 0.005,
      rotY: -0.004,
    };
    glassGroup.add(torusMesh);

    // Object 3: Faceted Octahedron
    const octaGeo = new THREE.OctahedronGeometry(1.6, 0);
    const octaMesh = new THREE.Mesh(octaGeo, chromeMaterial);
    octaMesh.position.set(-6, -2, 6);
    octaMesh.userData = {
      baseX: -6,
      baseY: -2,
      baseZ: 6,
      floatSpeed: 0.002,
      rotX: -0.003,
      rotY: 0.007,
    };
    glassGroup.add(octaMesh);

    // Object 4: Floating Holographic Prism
    const prismGeo = new THREE.DodecahedronGeometry(1.5, 0);
    const prismMesh = new THREE.Mesh(prismGeo, glassMaterial);
    prismMesh.position.set(8.5, -3, 5);
    prismMesh.userData = {
      baseX: 8.5,
      baseY: -3,
      baseZ: 5,
      floatSpeed: 0.0014,
      rotX: 0.005,
      rotY: 0.003,
    };
    glassGroup.add(prismMesh);

    // Small floating orbiting nodes
    const nodeGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const nodes = [];
    for (let n = 0; n < 8; n++) {
      const nodeMesh = new THREE.Mesh(
        nodeGeo,
        n % 2 === 0 ? neonRingMaterial : chromeMaterial
      );
      nodeMesh.position.set(
        THREE.MathUtils.randFloatSpread(18),
        THREE.MathUtils.randFloatSpread(12),
        THREE.MathUtils.randFloatSpread(10)
      );
      nodeMesh.userData = {
        angle: Math.random() * Math.PI * 2,
        dist: THREE.MathUtils.randFloat(3, 12),
        speed: THREE.MathUtils.randFloat(0.003, 0.008),
        yBase: nodeMesh.position.y,
      };
      nodes.push(nodeMesh);
      glassGroup.add(nodeMesh);
    }

    // 6. Interaction State (Mouse & Scroll tracking)
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseVelocity = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;

    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e) => {
      // Normalized coordinates (-1 to 1)
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Mouse velocity
      const dx = targetMouseX - lastMouseX;
      const dy = targetMouseY - lastMouseY;
      mouseVelocity = Math.min(Math.sqrt(dx * dx + dy * dy) * 40, 3.0);
      lastMouseX = targetMouseX;
      lastMouseY = targetMouseY;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Raycaster for terrain cursor interaction
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();
    let hitPoint = new THREE.Vector3(0, -6, 0);

    // 7. Animation Loop with Parallax & Tab-pause optimization
    let animationFrameId;
    let clock = new THREE.Clock();
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
      if (isTabVisible) {
        clock.start();
      } else {
        clock.stop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia lerping for mouse & scroll
      const lerpFactor = 0.055;
      mouseX += (targetMouseX - mouseX) * lerpFactor;
      mouseY += (targetMouseY - mouseY) * lerpFactor;
      scrollY += (targetScrollY - scrollY) * 0.08;
      mouseVelocity *= 0.94; // Velocity decay

      // Calculate normalized scroll progress (0 to ~1)
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const scrollRatio = scrollY / maxScroll;

      // Deep Parallax Camera Movement
      // Moves subtly along X, Y, and Z based on scroll and cursor
      const targetCamX = mouseX * 2.8;
      const targetCamY = 3 - scrollRatio * 8 + mouseY * 1.8;
      const targetCamZ = 24 - scrollRatio * 14;

      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.position.z += (targetCamZ - camera.position.z) * 0.04;

      // Slight camera look-ahead
      camera.lookAt(mouseX * 1.5, -scrollRatio * 6, -10);

      // Update 3D Cursor Spotlight Position
      cursorLight.position.x = mouseX * 16;
      cursorLight.position.y = mouseY * 12 + camera.position.y - 3;
      cursorLight.position.z = 8 + mouseVelocity * 2;
      cursorLight.intensity = 3.5 + mouseVelocity * 2.0;

      violetLight.position.x = -mouseX * 12;
      violetLight.position.y = -mouseY * 8 + camera.position.y;

      // Rotate Galaxy slowly (Layer 1)
      galaxy.rotation.y = elapsedTime * 0.02 + scrollRatio * 0.4;
      galaxy.rotation.x = mouseY * 0.08;

      // Galaxy Particle Attraction/Repulsion near cursor
      if (quality !== 'LOW' && !prefersReducedMotion) {
        const posAttr = galaxyGeo.attributes.position;
        const posArray = posAttr.array;
        const influenceRadius = 10;
        const pushStrength = 0.35 + mouseVelocity * 0.4;

        // Project cursor into 3D plane
        const cursorWorld = new THREE.Vector3(mouseX * 15, mouseY * 12, 0);

        // Update a subset of stars each frame for extreme efficiency
        const step = quality === 'HIGH' ? 2 : 4;
        for (let i = 0; i < starCount; i += step) {
          const i3 = i * 3;
          const origX = originalPositions[i3];
          const origY = originalPositions[i3 + 1];
          const origZ = originalPositions[i3 + 2];

          const curX = posArray[i3];
          const curY = posArray[i3 + 1];

          const dist = Math.hypot(curX - cursorWorld.x, curY - cursorWorld.y);
          if (dist < influenceRadius) {
            // Push away
            const force = (1 - dist / influenceRadius) * pushStrength;
            posArray[i3] += (curX - cursorWorld.x) * force * 0.08;
            posArray[i3 + 1] += (curY - cursorWorld.y) * force * 0.08;
          } else {
            // Elastic return to original orbit
            posArray[i3] += (origX - curX) * 0.03;
            posArray[i3 + 1] += (origY - curY) * 0.03;
            posArray[i3 + 2] += (origZ - posArray[i3 + 2]) * 0.03;
          }
        }
        posAttr.needsUpdate = true;
      }

      // Procedural Terrain Waves & Cursor Deformation (Layer 2)
      if (!prefersReducedMotion) {
        mouseVector.set(mouseX, mouseY);
        raycaster.setFromCamera(mouseVector, camera);
        const intersects = raycaster.intersectObject(terrain);
        if (intersects.length > 0) {
          hitPoint.copy(intersects[0].point);
        }

        const tPos = terrainGeo.attributes.position;
        const waveSpeed = elapsedTime * 1.8;

        for (let i = 0; i < tPos.count; i++) {
          const px = tPos.getX(i);
          const pz = tPos.getZ(i);
          const baseHeight = terrainOriginalY[i];

          // Cyber energy sinusoidal wave propagation
          let wave =
            Math.sin(px * 0.18 + waveSpeed) * 0.85 +
            Math.cos(pz * 0.16 + waveSpeed * 0.8) * 0.65;

          // Cursor physical dent / ripple reaction
          const distToCursor = Math.hypot(px - hitPoint.x, pz - hitPoint.z);
          if (distToCursor < 9.0) {
            const cursorInfluence = (1.0 - distToCursor / 9.0);
            wave += Math.sin(distToCursor * 2.0 - elapsedTime * 6) * cursorInfluence * 1.4;
          }

          tPos.setY(i, baseHeight + wave);
        }
        tPos.needsUpdate = true;
      }

      // Floating Glass World physics & rotation (Layer 3)
      glassGroup.children.forEach((obj, idx) => {
        if (!obj.userData.floatSpeed) return;
        const { baseX, baseY, baseZ, rotX, rotY } = obj.userData;

        // Gentle sinusoidal levitation
        const levitation = Math.sin(elapsedTime * 1.6 + idx * 1.5) * 0.45;
        obj.position.y = baseY + levitation - scrollRatio * 4;

        // Mouse proximity subtle displacement
        const dx = mouseX * 10 - obj.position.x;
        const dy = mouseY * 8 - obj.position.y;
        obj.position.x = baseX + dx * 0.08;
        obj.position.z = baseZ + dy * 0.05;

        // Responsive rotation
        obj.rotation.x += rotX + mouseY * 0.005;
        obj.rotation.y += rotY + mouseX * 0.008;
      });

      // Orbiting nodes around the scene
      nodes.forEach((node) => {
        node.userData.angle += node.userData.speed;
        node.position.x = Math.cos(node.userData.angle) * node.userData.dist;
        node.position.z = Math.sin(node.userData.angle) * node.userData.dist;
        node.position.y =
          node.userData.yBase +
          Math.sin(elapsedTime * 2 + node.userData.angle) * 0.6 -
          scrollRatio * 5;
      });

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // 8. Dynamic Resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality === 'HIGH' ? 2 : 1.5));
    };

    window.addEventListener('resize', handleResize);

    // 9. Clean Lifecycle Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);

      // Dispose Geometries and Materials
      galaxyGeo.dispose();
      galaxyMat.dispose();
      starTexture.dispose();
      terrainGeo.dispose();
      terrainWireMat.dispose();
      terrainGlowMat.dispose();
      crystalGeo.dispose();
      torusGeo.dispose();
      octaGeo.dispose();
      prismGeo.dispose();
      nodeGeo.dispose();
      glassMaterial.dispose();
      chromeMaterial.dispose();
      neonRingMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [quality]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
};

export default React.memo(InteractiveUniverse);
