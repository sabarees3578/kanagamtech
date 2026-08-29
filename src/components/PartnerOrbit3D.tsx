import { useEffect, useRef } from "react";
import * as THREE from "three";

const LOGOS = [
  { name: "Accura Tequipment", src: "/partners img/Accura Tequipment.png" },
  { name: "AMS EMS", src: "/partners img/AMS EMS.jpeg" },
  { name: "ARK Infosolutions", src: "/partners img/ARK Infosolutions.svg" },
  { name: "QuantumMate", src: "/partners img/QUANTUMMATE.jpeg" },
  { name: "RP3D Products", src: "/partners img/RP3D Products.jpg" },
  { name: "Silicon Systems", src: "/partners img/SILICON SYSTEM.jpeg" },
  { name: "Zorah Tech", src: "/partners img/Zora Technologies.png" },
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

      // Logo drawn with its own background, then the background color is
      // keyed out so the plum capsule shows through uniformly (handles
      // white, black and tinted backings alike).
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

      let rSum = 0;
      let gSum = 0;
      let bSum = 0;
      let n = 0;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          if (x < 8 || y < 8 || x >= W - 8 || y >= H - 8) {
            const i = (y * W + x) * 4;
            if (px[i + 3] > 220) {
              rSum += px[i];
              gSum += px[i + 1];
              bSum += px[i + 2];
              n++;
            }
          }
        }
      }
      if (n > 0) {
        const bgR = rSum / n;
        const bgG = gSum / n;
        const bgB = bSum / n;
        const thr = 48;
        for (let i = 0; i < px.length; i += 4) {
          const d = Math.abs(px[i] - bgR) + Math.abs(px[i + 1] - bgG) + Math.abs(px[i + 2] - bgB);
          if (d < thr && px[i + 3] > 60) {
            px[i + 3] = 0;
          }
        }
        tc.putImageData(imageData, 0, 0);
      }
      ctx.drawImage(t, 0, 0);

      // Soft "paper" inner sheet so the dark capsules read elegantly on
      // the light page and the logo never gets lost.
      roundRectPath(ctx, 8, 8, W - 16, H - 16, 40);
      ctx.fillStyle = "rgba(255,252,247,0.55)";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(75,29,63,0.35)";
      ctx.stroke();

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
 * PartnerOrbit3D — a royal, futuristic full-screen hologram of the partner
 * logo cards orbiting a golden quantum core. Used as the /partners page
 * motion theme (fills the whole viewport, centred).
 */
export function PartnerOrbit3D({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf6ede0, 0.0024);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 300);
    camera.position.set(0, 9, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const GOLD = new THREE.Color("#C08A3C");
    const BRONZE = new THREE.Color("#B98A3E");
    const DEEP = new THREE.Color("#4B1D3F");

    const root = new THREE.Group();
    // Gentle card-table tilt so the orbit reads as a grand ellipse.
    root.rotation.x = 0.32;
    scene.add(root);

    // --- Golden quantum core ---
    const sphereCount = 1100;
    const sphPos = new Float32Array(sphereCount * 3);
    for (let i = 0; i < sphereCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / sphereCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 3.6 + (Math.random() - 0.5) * 0.25;
      sphPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      sphPos[i * 3 + 1] = r * Math.cos(phi);
      sphPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const sphGeo = new THREE.BufferGeometry();
    sphGeo.setAttribute("position", new THREE.BufferAttribute(sphPos, 3));
    const sphMat = new THREE.PointsMaterial({
      color: DEEP,
      size: 0.09,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const corePoints = new THREE.Points(sphGeo, sphMat);
    root.add(corePoints);

    const wireGeo = new THREE.IcosahedronGeometry(1.9, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: DEEP,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireCore = new THREE.Mesh(wireGeo, wireMat);
    root.add(wireCore);

    const wire2Geo = new THREE.IcosahedronGeometry(2.6, 1);
    const wire2Mat = new THREE.MeshBasicMaterial({
      color: BRONZE,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wireCore2 = new THREE.Mesh(wire2Geo, wire2Mat);
    root.add(wireCore2);

    const nucleusGeo = new THREE.SphereGeometry(0.75, 32, 32);
    const nucleusMat = new THREE.MeshBasicMaterial({ color: BRONZE, transparent: true });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    root.add(nucleus);

    // --- Royal auras (soft pastel glows that read on light) ---
    const addSprite = (tex: THREE.Texture, scale: number, opacity: number) => {
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity,
        depthWrite: false,
      });
      const s = new THREE.Sprite(mat);
      s.scale.set(scale, scale, 1);
      root.add(s);
      return s;
    };
    addSprite(glowTexture("rgba(215,171,106,0.55)", "rgba(214,171,106,0.14)"), 36, 0.7);
    addSprite(glowTexture("rgba(150,70,110,0.35)", "rgba(75,29,63,0.1)"), 46, 0.5);

    // --- Orbital logo cards ---
    const RING_RADIUS = 15;
    const textureMap = new Map<string, THREE.CanvasTexture>();
    const cards: { mesh: THREE.Mesh; phase: number }[] = [];
    const planeGeo = new THREE.PlaneGeometry(6.6, 4.12);

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

    // --- Celestial halo rings ---
    const halo1Geo = new THREE.TorusGeometry(22, 0.05, 8, 180);
    const halo1Mat = new THREE.MeshBasicMaterial({
      color: BRONZE,
      transparent: true,
      opacity: 0.5,
    });
    const halo1 = new THREE.Mesh(halo1Geo, halo1Mat);
    halo1.rotation.x = Math.PI / 2 + 0.18;
    root.add(halo1);

    const halo2Geo = new THREE.TorusGeometry(17.5, 0.035, 8, 160);
    const halo2Mat = new THREE.MeshBasicMaterial({
      color: DEEP,
      transparent: true,
      opacity: 0.4,
    });
    const halo2 = new THREE.Mesh(halo2Geo, halo2Mat);
    halo2.rotation.x = Math.PI / 2 - 0.3;
    root.add(halo2);

    // --- Inner data ring (tiny gold points, counter-rotating) ---
    const dataCount = 90;
    const dataPos = new Float32Array(dataCount * 3);
    for (let i = 0; i < dataCount; i++) {
      const a = (i / dataCount) * Math.PI * 2;
      dataPos[i * 3] = Math.cos(a) * 8.5;
      dataPos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      dataPos[i * 3 + 2] = Math.sin(a) * 8.5;
    }
    const dataGeo = new THREE.BufferGeometry();
    dataGeo.setAttribute("position", new THREE.BufferAttribute(dataPos, 3));
    const dataMat = new THREE.PointsMaterial({
      color: BRONZE,
      size: 0.11,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const dataRing = new THREE.Points(dataGeo, dataMat);
    root.add(dataRing);

    // --- Gold satellites ---
    const satGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: BRONZE });
    const satGlowMat = new THREE.SpriteMaterial({
      map: glowTexture("rgba(215,171,106,0.5)", "rgba(215,171,106,0.12)"),
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const satellites = [0, 1, 2].map((i) => {
      const s = new THREE.Mesh(satGeo, satMat);
      const glow = new THREE.Sprite(satGlowMat);
      glow.scale.set(2.4, 2.4, 1);
      s.add(glow);
      root.add(s);
      return { mesh: s, offset: i * ((Math.PI * 2) / 3) };
    });

    // --- Ambient dust particles ---
    const dustCount = 260;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 70;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 6;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: BRONZE,
      size: 0.07,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // --- Floating ivory motes (very faint static sparkle) ---
    const moteCount = 140;
    const motePos = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      motePos[i * 3] = (Math.random() - 0.5) * 80;
      motePos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      motePos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute("position", new THREE.BufferAttribute(motePos, 3));
    const moteMat = new THREE.PointsMaterial({
      color: "#ffffff",
      size: 0.11,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);

    // --- Resize (frame the scene to the viewport, keep it centred) ---
    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;
      camera.fov = aspect < 0.9 ? 58 : aspect < 1.35 ? 50 : 44;
      camera.position.set(0, 9, aspect < 1.2 ? 34 : 30);
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

      root.rotation.y = t * 0.16 * speed;
      halo1.rotation.z = -t * 0.07 * speed;
      halo2.rotation.z = t * 0.05 * speed;
      dataRing.rotation.y = -t * 0.4 * speed;
      dust.rotation.y = -t * 0.01 * speed;
      motes.rotation.y = t * 0.02 * speed;

      corePoints.rotation.y -= t * 0.02 * speed;
      wireCore.rotation.x += 0.004 * speed;
      wireCore.rotation.y += 0.006 * speed;
      wireCore2.rotation.x -= 0.003 * speed;
      wireCore2.rotation.y += 0.005 * speed;

      const pulse = 1 + Math.sin(t * 1.3) * 0.08;
      nucleus.scale.setScalar(pulse);
      nucleusMat.opacity = 0.7 + Math.sin(t * 1.3) * 0.2;

      cards.forEach((c) => {
        c.mesh.position.y = Math.sin(t * 0.6 + c.phase) * 0.9;
      });

      satellites.forEach((s, i) => {
        const a = t * 0.85 + s.offset;
        const r = RING_RADIUS * 1.7;
        s.mesh.position.set(Math.cos(a) * r, Math.sin(t * 0.9 + i) * 0.7, Math.sin(a) * r);
      });

      camera.position.x = Math.sin(t * 0.1) * 1.4;
      camera.position.y = 9 + Math.sin(t * 0.08) * 1;
      camera.lookAt(0, 0.2, 0);

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
      wire2Geo.dispose();
      wire2Mat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      planeGeo.dispose();
      halo1Geo.dispose();
      halo1Mat.dispose();
      halo2Geo.dispose();
      halo2Mat.dispose();
      dataGeo.dispose();
      dataMat.dispose();
      satGeo.dispose();
      satMat.dispose();
      satGlowMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      moteGeo.dispose();
      moteMat.dispose();
      textureMap.forEach((tex) => tex.dispose());
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden />;
}
