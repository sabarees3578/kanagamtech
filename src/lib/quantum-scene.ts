/**
 * Quantum core renderer — a compact pseudo-3D engine on Canvas2D.
 * Deterministic, GPU-composited, 60fps friendly (no per-frame allocations
 * in the hot loop beyond small projected vectors).
 */

export type V3 = { x: number; y: number; z: number };

const rnd = (() => {
  let s = 1337;
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
})();

/* ---------- palette (Kanagam Tech Brand Guidelines v1.0) ---------- */
export const PAL = {
  gold: "215, 171, 106", // #D7AB6A (Gold Accent)
  goldDeep: "198, 107, 78", // #C66B4E (Terracotta)
  champagne: "234, 215, 186", // #EAD7BA (Soft Sand)
  ivory: "247, 241, 232", // #F7F1E8 (Warm Ivory)
  plum: "75, 29, 63", // #4B1D3F (Plum Foundation)
  rose: "185, 103, 123", // #B9677B (Dusty Rose)
  teal: "47, 107, 104", // #2F6B68 (Deep Teal)
  charcoal: "39, 33, 40", // #272128 (Charcoal Neutral)
  pearl: "255, 255, 255", // #FFFFFF (White)
  cyan: "47, 107, 104",
  amber: "215, 171, 106",
  ink: "75, 29, 63",
};
const rgba = (c: string, a: number) => `rgba(${c},${a})`;

/* ---------- math ---------- */
function rot(p: V3, yaw: number, pitch: number, roll = 0): V3 {
  let { x, y, z } = p;
  // roll (around z)
  if (roll) {
    const c = Math.cos(roll),
      s = Math.sin(roll);
    [x, y] = [x * c - y * s, x * s + y * c];
  }
  const cy = Math.cos(yaw),
    sy = Math.sin(yaw);
  [x, z] = [x * cy + z * sy, -x * sy + z * cy];
  const cp = Math.cos(pitch),
    sp = Math.sin(pitch);
  [y, z] = [y * cp - z * sp, y * sp + z * cp];
  return { x, y, z };
}

type Cam = { yaw: number; pitch: number; dist: number; zoom: number; cx: number; cy: number };

function project(p: V3, cam: Cam) {
  const r = rot(p, cam.yaw, cam.pitch);
  const d = cam.dist;
  const k = (d / Math.max(0.001, d + r.z)) * cam.zoom;
  return { x: cam.cx + r.x * k, y: cam.cy + r.y * k, s: k, z: r.z };
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

/* ---------- scene data ---------- */
const NODES: V3[] = (() => {
  const n: V3[] = [];
  const count = 18;
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = i * 2.399963;
    n.push({ x: Math.cos(th) * r * 150, y: y * 118, z: Math.sin(th) * r * 150 });
  }
  return n;
})();

const EDGES: [number, number][] = (() => {
  const e: [number, number][] = [];
  for (let i = 0; i < NODES.length; i++)
    for (let j = i + 1; j < NODES.length; j++) {
      const a = NODES[i]!,
        b = NODES[j]!;
      const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
      if (d < 132) e.push([i, j]);
    }
  return e;
})();

const RINGS = [
  { r: 176, tilt: 0.28, yaw: 0.2, spd: 0.16, w: 2.2, c: PAL.gold },
  { r: 214, tilt: 1.32, yaw: 0.9, spd: -0.11, w: 1.5, c: PAL.champagne },
  { r: 252, tilt: 0.82, yaw: 2.1, spd: 0.07, w: 1.1, c: PAL.champagne },
  { r: 300, tilt: 1.52, yaw: 0.4, spd: -0.05, w: 0.9, c: PAL.gold },
];

const PARTICLES = Array.from({ length: 260 }, () => {
  const th = rnd() * Math.PI * 2;
  const ph = Math.acos(2 * rnd() - 1);
  const r = 150 + rnd() * 330;
  return {
    p: {
      x: Math.sin(ph) * Math.cos(th) * r,
      y: Math.cos(ph) * r * 0.62,
      z: Math.sin(ph) * Math.sin(th) * r,
    },
    ph: rnd() * Math.PI * 2,
    sp: 0.1 + rnd() * 0.5,
    sz: 0.7 + rnd() * 1.9,
    warm: rnd(),
  };
});

const TRACES = Array.from({ length: 22 }, (_, i) => ({
  a: -84 + ((i * 37) % 168),
  b: -84 + ((i * 61) % 168),
  axis: i % 2,
  off: rnd(),
  sp: 0.28 + rnd() * 0.5,
}));

const PANELS = [
  { p: { x: 250, y: -110, z: 60 }, w: 118, h: 68, t0: 0.1, label: "COHERENCE" },
  { p: { x: -272, y: 70, z: -40 }, w: 104, h: 60, t0: 0.45, label: "ENTANGLE" },
  { p: { x: 90, y: 210, z: 120 }, w: 96, h: 54, t0: 0.72, label: "QBIT · 512" },
];

/* ---------- chip geometry (stacked frosted plates) ---------- */
const PLATES = [
  { y: 42, s: 126, a: 0.24 },
  { y: 10, s: 112, a: 0.3 },
  { y: -22, s: 94, a: 0.36 },
];

function quad(ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[]) {
  ctx.beginPath();
  ctx.moveTo(pts[0]!.x, pts[0]!.y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i]!.x, pts[i]!.y);
  ctx.closePath();
}

export type SceneState = {
  /** 0..1 assembly progress */
  assemble: number;
  /** 0..1 ignition pulse energy */
  ignite: number;
  /** camera zoom multiplier for the hand-off */
  zoom: number;
  /** global opacity */
  alpha: number;
  time: number;
  reduced: boolean;
};

export function drawScene(ctx: CanvasRenderingContext2D, w: number, h: number, st: SceneState) {
  const t = st.time;
  const A = st.assemble;
  const min = Math.min(w, h);
  const scale = (min / 900) * (w < 640 ? 1.05 : 1);

  const cam: Cam = {
    yaw: st.reduced ? 0.5 : t * 0.13 + Math.sin(t * 0.21) * 0.24,
    pitch: -0.24 + Math.sin(t * 0.17) * 0.07,
    dist: 900,
    zoom: (0.72 + easeOut(A) * 0.28) * scale * st.zoom,
    cx: w / 2,
    cy: h / 2 - (w < 640 ? min * 0.06 : min * 0.02),
  };

  ctx.save();
  ctx.globalAlpha = st.alpha;

  /* ---- backdrop: soft ivory volumetric wash ---- */
  const bg = ctx.createRadialGradient(cam.cx, cam.cy, 0, cam.cx, cam.cy, min * 0.95);
  const lift = 0.35 + A * 0.65 + st.ignite * 0.25;
  bg.addColorStop(0, rgba(PAL.ivory, 0.06 + lift * 0.1));
  bg.addColorStop(0.45, rgba(PAL.champagne, 0.05 * lift));
  bg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  /* ---- drifting quantum dust ---- */
  for (const q of PARTICLES) {
    const drift = st.reduced ? 0 : Math.sin(t * q.sp + q.ph);
    const p = {
      x: q.p.x + drift * 16,
      y: q.p.y + Math.cos(t * q.sp * 0.7 + q.ph) * 20,
      z: q.p.z + drift * 12,
    };
    const pr = project(p, cam);
    const dep = clamp01((pr.s - 0.35) / 0.9);
    const a = (0.05 + dep * 0.4) * (0.25 + A * 0.75);
    ctx.fillStyle = rgba(q.warm > 0.75 ? PAL.cyan : q.warm > 0.35 ? PAL.gold : PAL.champagne, a);
    ctx.beginPath();
    ctx.arc(pr.x, pr.y, q.sz * pr.s, 0, 6.2832);
    ctx.fill();
  }

  /* ---- orbital rings ---- */
  RINGS.forEach((ring, ri) => {
    const app = seg(A, 0.34 + ri * 0.1, 0.78 + ri * 0.05);
    if (app <= 0) return;
    const spin = st.reduced ? 0 : t * ring.spd;
    const steps = 96;
    ctx.lineWidth = ring.w * cam.zoom;
    for (let i = 0; i < steps; i++) {
      const f0 = i / steps,
        f1 = (i + 1) / steps;
      if (f0 > app) break;
      const mk = (f: number) => {
        const th = f * 6.2832 + spin;
        return rot(
          { x: Math.cos(th) * ring.r, y: 0, z: Math.sin(th) * ring.r },
          ring.yaw,
          ring.tilt,
        );
      };
      const p0 = project(mk(f0), cam),
        p1 = project(mk(f1), cam);
      const dep = clamp01((p0.s - 0.4) / 0.8);
      ctx.strokeStyle = rgba(ring.c, (0.1 + dep * 0.5) * app);
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.stroke();
    }
    // energy bead riding the ring
    const bth = t * (ring.spd * 4 + 0.5) + ri;
    const bp = project(
      rot({ x: Math.cos(bth) * ring.r, y: 0, z: Math.sin(bth) * ring.r }, ring.yaw, ring.tilt),
      cam,
    );
    const g = ctx.createRadialGradient(bp.x, bp.y, 0, bp.x, bp.y, 16 * bp.s);
    g.addColorStop(0, rgba(PAL.ivory, 0.9 * app));
    g.addColorStop(0.3, rgba(PAL.gold, 0.55 * app));
    g.addColorStop(1, rgba(PAL.gold, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(bp.x, bp.y, 16 * bp.s, 0, 6.2832);
    ctx.fill();
  });

  /* ---- entanglement lattice ---- */
  const nodeApp = seg(A, 0.05, 0.5);
  const proj = NODES.map((n) => {
    const b = 1 + easeInOut(seg(A, 0.55, 1)) * 0.75; // qubits settle into an outer shell
    return project({ x: n.x * b, y: n.y * b, z: n.z * b }, cam);
  });
  EDGES.forEach(([i, j], k) => {
    const app = seg(nodeApp, (k / EDGES.length) * 0.7, (k / EDGES.length) * 0.7 + 0.3);
    if (app <= 0) return;
    const a = proj[i]!,
      b = proj[j]!;
    const dep = clamp01(((a.s + b.s) / 2 - 0.4) / 0.8);
    ctx.strokeStyle = rgba(PAL.gold, 0.055 + dep * 0.16 * app);
    ctx.lineWidth = 0.8 * cam.zoom;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(a.x + (b.x - a.x) * app, a.y + (b.y - a.y) * app);
    ctx.stroke();
    // travelling pulse
    if (app > 0.99 && k % 3 === 0) {
      const f = ((t * 0.35 + k * 0.13) % 1) ** 1;
      const px = a.x + (b.x - a.x) * f,
        py = a.y + (b.y - a.y) * f;
      ctx.fillStyle = rgba(PAL.amber, 0.5 * dep);
      ctx.beginPath();
      ctx.arc(px, py, 1.7 * cam.zoom, 0, 6.2832);
      ctx.fill();
    }
  });
  proj.forEach((p, i) => {
    const app = seg(nodeApp, (i / proj.length) * 0.6, (i / proj.length) * 0.6 + 0.4);
    if (app <= 0) return;
    const pulse = 1 + Math.sin(t * 1.6 + i) * 0.18;
    const r = 2.3 * p.s * pulse * app;
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5);
    g.addColorStop(0, rgba(PAL.ivory, 0.95 * app));
    g.addColorStop(0.25, rgba(PAL.gold, 0.5 * app));
    g.addColorStop(1, rgba(PAL.gold, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 5, 0, 6.2832);
    ctx.fill();
    ctx.fillStyle = rgba(PAL.ivory, app);
    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 0.9, 0, 6.2832);
    ctx.fill();
  });

  /* ---- processor: frosted glass plates + crystalline core ---- */
  const chip = easeOut(seg(A, 0.5, 1));
  if (chip > 0) {
    const spin = st.reduced ? 0.3 : t * 0.22;
    const bob = Math.sin(t * 0.8) * 6;

    // depth-sorted plates
    const plates = PLATES.map((pl) => {
      const s = pl.s * (0.55 + chip * 0.45);
      const y = pl.y * chip + bob;
      const corners = [
        { x: -s, y, z: -s },
        { x: s, y, z: -s },
        { x: s, y, z: s },
        { x: -s, y, z: s },
      ].map((c) => project(rot(c, spin, 0), cam));
      return { pl, corners, s, y, depth: corners.reduce((m, c) => m + c.z, 0) / 4 };
    }).sort((a, b) => b.depth - a.depth);

    for (const { pl, corners, s, y } of plates) {
      quad(ctx, corners);
      const gg = ctx.createLinearGradient(
        corners[0]!.x,
        corners[0]!.y,
        corners[2]!.x,
        corners[2]!.y,
      );
      gg.addColorStop(0, rgba(PAL.ivory, (pl.a + 0.16) * chip));
      gg.addColorStop(0.5, rgba(PAL.champagne, pl.a * chip));
      gg.addColorStop(1, rgba(PAL.pearl, (pl.a + 0.08) * chip));
      ctx.fillStyle = gg;
      ctx.fill();
      ctx.strokeStyle = rgba(PAL.gold, 0.55 * chip);
      ctx.lineWidth = 1.1 * cam.zoom;
      ctx.stroke();

      // holographic circuit traces on the plate surface
      ctx.lineWidth = 0.7 * cam.zoom;
      for (const tr of TRACES) {
        const k = s / 92;
        const a0 = tr.a * k,
          b0 = tr.b * k;
        const p1 = tr.axis
          ? project(rot({ x: a0, y, z: -s * 0.92 }, spin, 0), cam)
          : project(rot({ x: -s * 0.92, y, z: a0 }, spin, 0), cam);
        const p2 = tr.axis
          ? project(rot({ x: a0, y, z: b0 }, spin, 0), cam)
          : project(rot({ x: b0, y, z: a0 }, spin, 0), cam);
        ctx.strokeStyle = rgba(PAL.goldDeep, 0.2 * chip);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        // light travelling the trace
        const f = (t * tr.sp + tr.off) % 1;
        const lx = p1.x + (p2.x - p1.x) * f,
          ly = p1.y + (p2.y - p1.y) * f;
        const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, 7 * cam.zoom);
        lg.addColorStop(0, rgba(PAL.ivory, 0.85 * chip));
        lg.addColorStop(0.4, rgba(PAL.amber, 0.4 * chip));
        lg.addColorStop(1, rgba(PAL.amber, 0));
        ctx.fillStyle = lg;
        ctx.beginPath();
        ctx.arc(lx, ly, 7 * cam.zoom, 0, 6.2832);
        ctx.fill();
      }
    }

    // vertical crystalline core
    const coreTop = project(rot({ x: 0, y: -46 + bob, z: 0 }, spin, 0), cam);
    const coreBot = project(rot({ x: 0, y: 52 + bob, z: 0 }, spin, 0), cam);
    const cg = ctx.createLinearGradient(coreTop.x, coreTop.y, coreBot.x, coreBot.y);
    cg.addColorStop(0, rgba(PAL.cyan, 0.5 * chip));
    cg.addColorStop(0.5, rgba(PAL.ivory, 0.85 * chip));
    cg.addColorStop(1, rgba(PAL.gold, 0.55 * chip));
    ctx.strokeStyle = cg;
    ctx.lineWidth = 5 * cam.zoom * chip;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(coreTop.x, coreTop.y);
    ctx.lineTo(coreBot.x, coreBot.y);
    ctx.stroke();
    ctx.lineCap = "butt";

    // core bloom + ignition pulse
    const cc = project({ x: 0, y: bob, z: 0 }, cam);
    const bloomR = (70 + st.ignite * 260) * cam.zoom;
    const bg2 = ctx.createRadialGradient(cc.x, cc.y, 0, cc.x, cc.y, bloomR);
    bg2.addColorStop(0, rgba(PAL.ivory, (0.5 + st.ignite * 0.4) * chip));
    bg2.addColorStop(0.25, rgba(PAL.champagne, 0.3 * chip));
    bg2.addColorStop(0.6, rgba(PAL.gold, 0.12 * chip));
    bg2.addColorStop(1, rgba(PAL.gold, 0));
    ctx.fillStyle = bg2;
    ctx.beginPath();
    ctx.arc(cc.x, cc.y, bloomR, 0, 6.2832);
    ctx.fill();

    if (st.ignite > 0.01) {
      ctx.strokeStyle = rgba(PAL.champagne, 0.5 * (1 - st.ignite));
      ctx.lineWidth = 2 * cam.zoom;
      ctx.beginPath();
      ctx.ellipse(cc.x, cc.y, 380 * st.ignite * cam.zoom, 140 * st.ignite * cam.zoom, 0, 0, 6.2832);
      ctx.stroke();
    }

    /* ---- holographic data panels ---- */
    ctx.font = `${Math.round(9 * cam.zoom + 3)}px ui-monospace, monospace`;
    for (const pn of PANELS) {
      const cyc = (t * 0.12 + pn.t0) % 1;
      const vis = Math.sin(clamp01(cyc / 0.42) * Math.PI) * chip;
      if (vis <= 0.02) continue;
      const o = project(pn.p, cam);
      const w2 = pn.w * o.s,
        h2 = pn.h * o.s;
      ctx.fillStyle = rgba(PAL.ivory, 0.1 * vis);
      ctx.strokeStyle = rgba(PAL.gold, 0.4 * vis);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(o.x - w2 / 2, o.y - h2 / 2, w2, h2, 6 * o.s);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = rgba(PAL.ink, 0.62 * vis);
      ctx.fillText(pn.label, o.x - w2 / 2 + 8 * o.s, o.y - h2 / 2 + 16 * o.s);
      for (let r = 0; r < 3; r++) {
        const bw = (0.3 + ((Math.sin(t * 1.3 + r + pn.t0) + 1) / 2) * 0.6) * (w2 - 16 * o.s);
        ctx.fillStyle = rgba(PAL.gold, (0.3 - r * 0.06) * vis);
        ctx.fillRect(o.x - w2 / 2 + 8 * o.s, o.y - h2 / 2 + 24 * o.s + r * 9 * o.s, bw, 2.5 * o.s);
      }
      // dissolving particles
      if (cyc > 0.3) {
        const d = clamp01((cyc - 0.3) / 0.12);
        for (let i = 0; i < 12; i++) {
          const ang = i * 0.523 + pn.t0 * 6;
          ctx.fillStyle = rgba(PAL.champagne, 0.5 * (1 - d));
          ctx.beginPath();
          ctx.arc(
            o.x + Math.cos(ang) * d * 60 * o.s,
            o.y + Math.sin(ang) * d * 34 * o.s - d * 20,
            1.4 * o.s,
            0,
            6.2832,
          );
          ctx.fill();
        }
      }
    }
  } else {
    /* ---- genesis particle before assembly ---- */
    const g = seg(A, 0, 0.08);
    const cc = { x: cam.cx, y: cam.cy };
    const r = (14 + (1 - g) * 4) * cam.zoom;
    const gg = ctx.createRadialGradient(cc.x, cc.y, 0, cc.x, cc.y, r * 6);
    gg.addColorStop(0, rgba(PAL.ivory, 0.95));
    gg.addColorStop(0.2, rgba(PAL.champagne, 0.6));
    gg.addColorStop(1, rgba(PAL.gold, 0));
    ctx.fillStyle = gg;
    ctx.beginPath();
    ctx.arc(cc.x, cc.y, r * 6, 0, 6.2832);
    ctx.fill();
  }

  ctx.restore();
}
