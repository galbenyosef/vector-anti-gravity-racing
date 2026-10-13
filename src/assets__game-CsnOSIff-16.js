// assets__game-CsnOSIff 16 — math
// Lines 4770-5020 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function hl() {
  if (dl === F) return fl;
  dl = F;
  let e = (e) => ((e % F) + F) % F,
    t = (t, n, r) => e(t) >= n && e(t) <= r,
    n = Vt.filter((e) => e.kind === `sand`),
    r = Rt.filter((e) => !e.glass),
    i = j(0) + 1;
  ((fl = Array.from({ length: Math.ceil(F / 4) }, (e, a) => {
    let o = a * 4,
      s = Gn(o),
      c = s.position,
      l = o / F;
    return {
      d: o,
      x: c.x,
      y: c.y,
      z: c.z,
      low: c.y - i * Math.abs(Math.sin(s.bank)),
      rock: ul.some(([e, n]) => t(o, e, n)),
      sand: n.some((e) => l >= e.from - 0.004 && l <= e.to + 0.004),
      buried: r.some((e) => o >= e.from * F - 4 && o <= e.to * F + 4),
      gap: Dt.some((e) => o > e.lip - 2 && o < e.land + 2),
    };
  })),
    (pl = new Map()));
  for (let e of fl) {
    let t = `${Math.floor(e.x / ml)},${Math.floor(e.z / ml)}`,
      n = pl.get(t);
    (n || pl.set(t, (n = [])), n.push(e));
  }
  return fl;
}
function gl(e, t, n, r) {
  let i = Math.floor(e / ml),
    a = Math.floor(t / ml),
    o = Math.ceil(n / ml);
  for (let s = -o; s <= o; s++)
    for (let c = -o; c <= o; c++) {
      let o = pl.get(`${i + s},${a + c}`);
      if (o)
        for (let i of o) {
          let a = Math.hypot(i.x - e, i.z - t);
          a <= n && r(i, a);
        }
    }
}
function _l(e, t) {
  hl();
  let n = j(0),
    r = ll(e, t);
  return (
    gl(e, t, 120, (i, a) => {
      (i.rock &&
        !i.gap &&
        (r = Math.max(r, i.low - Wc - Math.max(0, a - (n + 6)) * 2.4)),
        i.buried &&
          (r = Math.max(
            r,
            i.y +
              13 +
              Qc(e / 35, t / 35, 3, 3) * 4 +
              il(e, t, 0.83, 0.56, 90, 41) * 5 -
              Math.max(0, a - 26) * (0.4 + Qc(e / 90, t / 90, 2, 8) * 0.2),
          )));
    }),
    gl(e, t, 90, (e, t) => {
      if (e.gap) {
        t < n + 10 && (r = Math.min(r, e.y - 14));
        return;
      }
      let [i, a] = e.buried
        ? [n + 4, 2.4]
        : e.rock
          ? [n + 6, 4]
          : e.sand
            ? [n + 3, 2]
            : [n + 6, 1.4];
      r = Math.min(r, e.low - Wc + Math.max(0, t - i) * a);
    }),
    r
  );
}
var vl = Array.from({ length: 11 }, (e, t) => {
  let n = (t / 11) * Math.PI * 2 + Xc(t, 3, 5) * 0.4,
    r = 2400 + Xc(t, 7, 9) * 3200;
  return {
    x: Uc.centerX + Math.cos(n) * r,
    z: Uc.centerZ + Math.sin(n) * r,
    a: 220 + Xc(t, 1, 2) * 420,
    b: 160 + Xc(t, 2, 1) * 260,
    angle: Xc(t, 4, 4) * Math.PI,
    top: 120 + Xc(t, 5, 6) * 260,
    seed: 40 + t,
  };
});
function yl(e, t) {
  let { centerX: n, centerZ: r, size: i } = Uc,
    a = $c(0, 900, Math.max(Math.abs(e - n) - i / 2, Math.abs(t - r) - i / 2)),
    o = Math.max(
      0.6,
      al(e, t) * (1 + 0.5 * a) + Qc(e / 1600, t / 1600, 3, 13) * 34 * a,
    );
  for (let n of vl) {
    let r = cl(n, e, t);
    if (r > 1.6) continue;
    let i = n.top + Qc(e / 120, t / 120, 3, n.seed) * 14;
    o = Math.max(
      o,
      el(o + $c(1.55, 1, r) ** 1.5 * i * 0.25, i, $c(1.04, 0.96, r)),
    );
  }
  return o;
}
function bl(e = Uc.step) {
  let { centerX: t, centerZ: n, size: r } = Uc,
    i = Math.round(r / e) + 1,
    a = t - r / 2,
    o = n - r / 2,
    s = new Float32Array(i * i);
  for (let t = 0; t < i; t++)
    for (let n = 0; n < i; n++) s[t * i + n] = _l(a + n * e, o + t * e);
  return { heights: s, count: i, step: e, minX: a, minZ: o };
}
function xl(e, t) {
  let { heights: n, count: r, step: i } = e,
    a = n.map((e) => e - 4),
    o = Math.hypot(t.x, t.z);
  if (t.y <= 0) return a.fill(1e4);
  if (o < 1e-6) return a;
  let s = t.x / o,
    c = t.z / o,
    l = (t.y / o) * i,
    u = -1 / 0;
  for (let e of n) u = Math.max(u, e);
  for (let e = 0; e < r; e++)
    for (let t = 0; t < r; t++) {
      let i = e * r + t,
        o = a[i];
      for (let i = 3; u - i * l > o; i++) {
        let a = t + i * s,
          u = e + i * c;
        if (a < 0 || u < 0 || a > r - 1 || u > r - 1) break;
        let d = Math.min(r - 2, Math.floor(a)),
          f = Math.min(r - 2, Math.floor(u)),
          p = a - d,
          m = u - f,
          h = n[f * r + d],
          g = n[f * r + d + 1],
          _ = n[(f + 1) * r + d],
          v = n[(f + 1) * r + d + 1],
          y = h + (g - h) * p + (_ - h) * m + (h - g - _ + v) * p * m;
        o = Math.max(o, y - i * l);
      }
      a[i] = o;
    }
  return a;
}
var Sl = {
    zenith: `#393e76`,
    sky: `#a478aa`,
    horizon: `#e9a185`,
    ground: `#b5856c`,
    sandLight: `#e8c895`,
    sandDark: `#c2945b`,
    wetSand: `#8a6a47`,
    shallow: `#54d6c4`,
    lagoon: `#169fb0`,
    deep: `#0a5c7c`,
    fog: `#d5a191`,
  },
  Cl = [`#c07a4a`, `#b36c40`, `#c98755`, `#a9633a`, `#d39a66`, `#bb7447`];
function wl(e, t, n, r, i, a = qe) {
  let o = new re(e, t, n);
  return (
    (o.name = r),
    (o.wrapS = o.wrapT = a),
    (o.magFilter = Fe),
    (o.minFilter = m),
    (o.generateMipmaps = !0),
    (o.anisotropy = 8),
    (o.colorSpace = i ? st : ``),
    (o.needsUpdate = !0),
    o
  );
}
function Tl(e = 256) {
  let t = new Uint8Array(e * e * 4),
    n = new Float32Array(e * e);
  for (let t = 0; t < e; t++)
    for (let r = 0; r < e; r++) {
      let i = r / e,
        a = t / e,
        o =
          Math.sin((a * 3 + i) * Math.PI * 2) * 0.08 +
          Math.sin((i * 2 - a * 5) * Math.PI * 2) * 0.03,
        s = (i * 11 + a * 3 + o) % 1,
        c = s - Math.floor(s);
      n[t * e + r] =
        (c < 0.7 ? c / 0.7 : (1 - c) / 0.3) +
        Math.sin((i * 37 + a * 23) * Math.PI * 2) * 0.05;
    }
  for (let r = 0; r < e; r++)
    for (let i = 0; i < e; i++) {
      let a = r * e + i,
        o = n[r * e + ((i + 1) % e)] - n[r * e + ((i + e - 1) % e)],
        c = n[((r + 1) % e) * e + i] - n[((r + e - 1) % e) * e + i];
      ((t[a * 4] = Math.round(s.clamp(0.5 - o * 1.4, 0, 1) * 255)),
        (t[a * 4 + 1] = Math.round(s.clamp(0.5 - c * 1.4, 0, 1) * 255)),
        (t[a * 4 + 2] = Math.round(n[a] * 200 + 20)),
        (t[a * 4 + 3] = 255));
    }
  return wl(t, e, e, `Sirocco sand ripples`, !1);
}
function El(e = 512) {
  let t = 24301,
    n = () => (
      (t = (Math.imul(t, 1664525) + 1013904223) >>> 0),
      t / 4294967296
    ),
    r = [],
    i = Cl.map((e) => new _(e)),
    a = i[0].clone();
  for (; r.length < e;) {
    let t = Math.round(10 + n() * 46),
      o = i[Math.floor(n() * i.length)]
        .clone()
        .multiplyScalar(0.94 + n() * 0.12);
    for (let n = 0; n < t && r.length < e; n++) {
      let e = s.smoothstep(n, 0, 5),
        t = a.clone().lerp(o, e);
      ((n === 0 || n === 1) && t.multiplyScalar(0.84), r.push(t));
    }
    a = o;
  }
  for (let t = 0; t < 6; t++) r[e - 1 - t].lerp(r[0], 1 - t / 6);
  let o = new Uint8Array(4 * e * 4);
  return (
    r.forEach((e, t) => {
      let n = e.clone().convertLinearToSRGB();
      for (let e = 0; e < 4; e++) {
        let r = (t * 4 + e) * 4;
        ((o[r] = Math.round(n.r * 255)),
          (o[r + 1] = Math.round(n.g * 255)),
          (o[r + 2] = Math.round(n.b * 255)),
          (o[r + 3] = 255));
      }
    }),
    wl(o, 4, e, `Sirocco sandstone strata`, !0)
  );
}
