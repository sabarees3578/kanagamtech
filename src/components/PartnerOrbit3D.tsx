import { useEffect, useRef } from "react";
import * as THREE from "three";

const LOGOS = [
  { name: "ACCURA TECQ", src: "/partners img/ACCURA TECQ.jpeg" },
  { name: "AMSEMS", src: "/partners img/AMSEMS.jpeg" },
  { name: "ARK", src: "/partners img/ARK.jpeg" },
  { name: "QUANTUMMATE", src: "/partners img/QUANTUMMATE.jpeg" },
  { name: "RPBD", src: "/partners img/RPBD.jpeg" },
  { name: "SILICON SYSTEM", src: "/partners img/SILICON SYSTEM.jpeg" },
  { name: "ZORA TECH", src: "/partners img/ZORA TECH.jpeg" },
];

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function capsuleTexture(src: string): Promise<THREE.CanvasTexture> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const W = 256;
      const H = 160;
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      const ctx = c.getContext("2d")!;

      // Dark plum capsule backing
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#3a1744");
      g.addColorStop(0.45, "#2f1138");
      g.addColorStop(1, "#1c0826");
      roundRectPath(ctx, 8, 8, W - 16, H - 16, 40);
      ctx.fillStyle = g;
      ctx.fill();

      // Gold rim
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#D7AB6A";
      ctx.globalAlpha = 0.9;
      roundRectPath(ctx, 8, 8, W - 16, H - 16, 40);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Logo, white-background keyed out for a holographic feel
      const t = document.createElement("canvas");
      t.width = W;
      t.height = H;
      const tc = t.getContext("2d")!;
      const iw = img.width;
      const ih = img.height;
      const scale = Math.min((W - 52) / iw, (H - 52) / ih);
      const dx = (W - iw * scale) / 2;
      const dy = (H - ih * scale) / 2;
      tc.drawImage(img, dx, dy, iw * scale, ih * scale);
      const imageData = tc.getImageData(0, 0, W, H);
      const px = imageData.data;
      const cornerIdx = (4 + 4 * W) * 4;
      const hasLightBg =
        px[cornerIdx + 3] > 200 &&
        px[cornerIdx] > 228 &&
        px[cornerIdx + 1] > 228 &&
        px[cornerIdx + 2] > 228;
      if (hasLightBg) {
        for (let i = 0; i < px.length; i += 4) {
          if (px[i] > 230 && px[i + 1] > 230 && px[i + 2] > 230 && px[i + 3] > 60) {
            px[i + 3] = 0;
          }
        }
        tc.putImageData(imageData, 0, 0);
      }
      ctx.drawImage(t, 0, 0);

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      resolve(tex);
    };
    img.onerror = () => {
      // Fallback: capsule shell without the logo
      const c = document.createElement("canvas");
      c.width = 256;
      c.height = 160;
      const ctx = c.getContext("2d")!;
      const g = ctx.createLinearGradient(0, 0, 0, 160);
      g.addColorStop(0, "#3a1744");
      g.addColorStop(0.45, "#2f1138");
      g.addColorStop(1, "#1c0826");
      roundRectPath(ctx, 8, 8, 240, 144, 40);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#D7AB6A";
      ctx.globalAlpha = 0.9;
      roundRectPath(ctx, 8, 8, 240, 144, 40);
      ctx.stroke();
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      resolve(tex);
    };
    img.src = src;
  });
}

function glowTexture(inner: string, outer: string): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, outer);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * PartnerOrbit3D — a royal, futuristic hologram of the partner logo cards
 * orbiting a golden quantum core, used as the /partners hero motion.
 */
export function PartnerOrbit3D({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x120317, 0.006);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);
    camera.position.set(0, 2, 58);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const GOLD = new THREE.Color("#D7AB6A");
    const DEEP = new THREE.Color("#4B1D3F");

    const root = new THREE.Group();
    scene.add(root);

    // --- Golden quantum core ---
    const sphereCount = 900;
    const sphPos = new Float32Array(sphereCount * 3);
    for (let i = 0; i < sphereCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / sphereCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 3 + (Math.random() - 0.5) * 0.2;
      sphPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      sphPos[i * 3 + 1] = r * Math.cos(phi);
      sphPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const sphGeo = new THREE.BufferGeometry();
    sphGeo.setAttribute("position", new THREE.BufferAttribute(sphPos, 3));
    const sphMat = new THREE.PointsMaterial({
      color: GOLD,
      size: 0.07,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const corePoints = new THREE.Points(sphGeo, sphMat);
    root.add(corePoints);

    const wireGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: DEEP,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireCore = new THREE.Mesh(wireGeo, wireMat);
    root.add(wireCore);

    const nucleusGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const nucleusMat = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    root.add(nucleus);

    // --- Royal auras ---
    const addSprite = (tex: THREE.Texture, scale: number, opacity: number) => {
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const s = new THREE.Sprite(mat);
      s.scale.set(scale, scale, 1);
      root.add(s);
      return s;
    };
    addSprite(glowTexture("rgba(240,196,120,0.85)", "rgba(215,171,106,0.18)"), 34, 0.9);
    addSprite(glowTexture("rgba(123,42,99,0.7)", "rgba(75,29,63,0.14)"), 44, 0.65);

    // --- Orbital logo cards ---
    const RING_RADIUS = 18;
    const textureMap = new Map<string, THREE.CanvasTexture>();
    const cards: { mesh: THREE.Mesh; phase: number }[] = [];
    const planeGeo = new THREE.PlaneGeometry(6.4, 4);

    const buildCards = async () => {
      await Promise.all(
        LOGOS.map(async (l) => {
          textureMap.set(l.name, await capsuleTexture(l.src));
        }),
      );
      LOGOS.forEach((logo, i) => {
        const a = (i / LOGOS.length) * Math.PI * 2 - Math.PI / 2;
        const mat = new THREE.MeshBasicMaterial({
          map: textureMap.get(logo.name),
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          toneMapped: false,
        });
        const mesh = new THREE.Mesh(planeGeo, mat);
        const x = Math.cos(a) * RING_RADIUS;
        const z = Math.sin(a) * RING_RADIUS;
        mesh.position.set(x, 0, z);
        mesh.lookAt(x * 2, 0, z * 2);
        root.add(mesh);
        cards.push({ mesh, phase: a });
      });
      if (reduced) renderer.render(scene, camera);
      else raf = requestAnimationFrame(loop);
    };

    // --- Orbit rings ---
    const torusGeo = new THREE.TorusGeometry(RING_RADIUS, 0.05, 8, 160);
    const torusMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.4,
    });
    const ringTorus = new THREE.Mesh(torusGeo, torusMat);
    ringTorus.rotation.x = Math.PI / 2;
    scene.add(ringTorus);

    const torusGeo2 = new THREE.TorusGeometry(RING_RADIUS * 1.3, 0.035, 8, 160);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: DEEP,
      transparent: true,
      opacity: 0.5,
    });
    const ringTorus2 = new THREE.Mesh(torusGeo2, torusMat2);
    ringTorus2.rotation.x = Math.PI / 2 + 0.32;
    scene.add(ringTorus2);

    // --- Gold satellites ---
    const satGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: GOLD });
    const satellites = [0, 1, 2].map((i) => {
      const s = new THREE.Mesh(satGeo, satMat);
      scene.add(s);
      return { mesh: s, offset: i * ((Math.PI * 2) / 3) };
    });

    // --- Ambient dust particles ---
    const dustCount = 220;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 60;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: GOLD,
      size: 0.05,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // --- Resize ---
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
      const speed = reduced ? 0 : 1;

      root.rotation.y = t * 0.15 * speed;
      ringTorus.rotation.z = -t * 0.08 * speed;
      ringTorus2.rotation.z = t * 0.06 * speed;
      dust.rotation.y = -t * 0.01 * speed;

      corePoints.rotation.y -= t * 0.02 * speed;
      wireCore.rotation.x += 0.004 * speed;
      wireCore.rotation.y += 0.006 * speed;

      const pulse = 1 + Math.sin(t * 1.3) * 0.08;
      nucleus.scale.setScalar(pulse);
      nucleusMat.opacity = 0.7 + Math.sin(t * 1.3) * 0.2;

      cards.forEach((c) => {
        c.mesh.position.y = Math.sin(t * 0.6 + c.phase) * 0.8;
      });

      satellites.forEach((s, i) => {
        const a = t * 0.85 + s.offset;
        const r = RING_RADIUS * 1.6;
        s.mesh.position.set(Math.cos(a) * r, Math.sin(t * 0.9 + i) * 0.6, Math.sin(a) * r);
      });

      camera.position.x = Math.sin(t * 0.12) * 3;
      camera.position.y = 2 + Math.sin(t * 0.09) * 1.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    void buildCards();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      sphGeo.dispose();
      sphMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      planeGeo.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      torusGeo2.dispose();
      torusMat2.dispose();
      satGeo.dispose();
      satMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      textureMap.forEach((tex) => tex.dispose());
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden />;
}
