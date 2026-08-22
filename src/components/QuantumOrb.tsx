import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * QuantumOrb — a Three.js motion visual for the About page.
 * A golden particle sphere with wireframe core, two orbiting rings and
 * ambient drifting particles, in Kanagam brand colors (#D7AB6A / #4B1D3F).
 */
export function QuantumOrb({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    // Dead-center framing: no vertical offset so the orb sits exactly in the middle.
    camera.position.set(0, 0, 8.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const GOLD = new THREE.Color("#D7AB6A");
    const MAROON = new THREE.Color("#8a4a76");
    const group = new THREE.Group();
    scene.add(group);

    // --- Particle sphere (quantum core) ---
    const sphereCount = 1400;
    const spherePositions = new Float32Array(sphereCount * 3);
    for (let i = 0; i < sphereCount; i++) {
      // Fibonacci-ish even distribution on a sphere
      const phi = Math.acos(1 - (2 * (i + 0.5)) / sphereCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2 + (Math.random() - 0.5) * 0.12;
      spherePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      spherePositions[i * 3 + 1] = r * Math.cos(phi);
      spherePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const sphereGeo = new THREE.BufferGeometry();
    sphereGeo.setAttribute("position", new THREE.BufferAttribute(spherePositions, 3));
    const sphereMat = new THREE.PointsMaterial({
      color: GOLD,
      size: 0.035,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const spherePoints = new THREE.Points(sphereGeo, sphereMat);
    group.add(spherePoints);

    // --- Inner wireframe icosahedron ---
    const innerGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: MAROON,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // --- Glowing nucleus ---
    const nucleusGeo = new THREE.SphereGeometry(0.42, 32, 32);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.85,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    group.add(nucleus);

    // --- Orbital rings ---
    const makeRing = (radius: number, tiltX: number, tiltZ: number, opacity: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.008, 12, 160);
      const ringMat = new THREE.MeshBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = tiltX;
      ring.rotation.z = tiltZ;
      group.add(ring);
      return ring;
    };
    const ringA = makeRing(2.3, Math.PI / 3, 0.45, 0.55);
    const ringB = makeRing(2.55, Math.PI / 1.75, -0.6, 0.35);

    // Orbiting electrons on the rings (gold, compact — kept well inside the frame)
    const electronGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const electronMat = new THREE.MeshBasicMaterial({ color: GOLD });
    const electronA = new THREE.Mesh(electronGeo, electronMat);
    const electronB = new THREE.Mesh(electronGeo, electronMat);
    group.add(electronA, electronB);

    // --- Ambient drifting particles ---
    const dustCount = 260;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 11;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: GOLD,
      size: 0.02,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // --- Resize handling ---
    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // --- Animation loop ---
    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      const t = clock.getElapsedTime();
      const speed = reduced ? 0.15 : 1;

      group.rotation.y += 0.0022 * speed;
      spherePoints.rotation.y -= 0.0012 * speed;
      innerMesh.rotation.x += 0.0016 * speed;
      innerMesh.rotation.y += 0.0021 * speed;

      ringA.rotation.z += 0.0016 * speed;
      ringB.rotation.z -= 0.0011 * speed;

      // Electrons travelling along their tilted rings
      const aAng = t * 0.9 * speed;
      const aR = 2.3;
      electronA.position.set(aR * Math.cos(aAng), 0, aR * Math.sin(aAng));
      electronA.position.applyEuler(new THREE.Euler(Math.PI / 3, 0, 0.45));

      const bAng = -t * 0.65 * speed + 2;
      const bR = 2.55;
      electronB.position.set(bR * Math.cos(bAng), 0, bR * Math.sin(bAng));
      electronB.position.applyEuler(new THREE.Euler(Math.PI / 1.75, 0, -0.6));

      // Gentle breathing of the nucleus
      const pulse = 1 + Math.sin(t * 1.4) * 0.08;
      nucleus.scale.setScalar(pulse);
      nucleusMat.opacity = 0.7 + Math.sin(t * 1.4) * 0.15;

      dust.rotation.y += 0.0004 * speed;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      electronGeo.dispose();
      electronMat.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden />;
}
