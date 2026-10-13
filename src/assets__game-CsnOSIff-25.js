// assets__game-CsnOSIff 25 — math
// Lines 7331-7673 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Fu = (e, t, n) => {
    let r = Math.max(0, Math.min(1, (n - e) / (t - e)));
    return r * r * (3 - 2 * r);
  },
  Iu = (e, t, n) => e + (t - e) * n;
function Lu(e, t, n, r) {
  let i = 0,
    a = 0.5,
    o = 0;
  for (let s = 0; s < n; s++) {
    let n = 1 - Math.abs(Qc(e, t, 1, r + s * 31) * 2 - 1);
    ((i += n * n * a),
      (o += a),
      (e = e * 2.1 + 5.3),
      (t = t * 2.1 - 3.1),
      (a *= 0.5));
  }
  return i / o;
}
function Ru(e, t) {
  let n = 0.05 + 0.2 * t,
    r = e < 1 ? -n * (1 - e * e) ** (1.25 - 0.45 * t) : 0,
    i =
      (0.012 + 0.05 * t) *
      Math.exp(-(((e - 1) / (0.22 + 0.14 * (1 - t))) ** 2)),
    a = e > 1 ? 0.02 * e ** -3 : 0;
  return r + i + a;
}
var zu = [
    { cell: 70, chance: 0.55, min: 4, max: 30, seed: 101 },
    { cell: 230, chance: 0.42, min: 22, max: 120, seed: 211 },
    { cell: 900, chance: 0.42, min: 120, max: 360, seed: 307 },
  ],
  Bu = zu.map(() => new Map()),
  Vu = (e, t) => (e + 1e5) * 4e5 + (t + 1e5);
function Hu(e, t, n) {
  let r = Bu[e],
    i = Vu(t, n),
    a = r.get(i);
  if (a !== void 0) return a;
  let o = zu[e],
    s = 0.45 + Qc(t * 0.37, n * 0.37, 2, o.seed + 9) * 1.1;
  if (Pu(t, n, o.seed) > o.chance * s) a = null;
  else {
    let e = Pu(t, n, o.seed + 1);
    a = {
      x: (t + 0.15 + 0.7 * Pu(t, n, o.seed + 2)) * o.cell,
      z: (n + 0.15 + 0.7 * Pu(t, n, o.seed + 3)) * o.cell,
      radius: o.min + (o.max - o.min) * e ** 2.2,
      fresh: Pu(t, n, o.seed + 4) ** 4,
    };
  }
  return (r.set(i, a), a);
}
function Uu(e, t) {
  let n = 0,
    r = 0;
  for (let i = 0; i < zu.length; i++) {
    let a = zu[i].cell,
      o = Math.floor(e / a),
      s = Math.floor(t / a);
    for (let a = -1; a <= 1; a++)
      for (let c = -1; c <= 1; c++) {
        let l = Hu(i, o + a, s + c);
        if (!l) continue;
        let { radius: u, fresh: d } = l,
          f = e - l.x,
          p = t - l.z,
          m = f * f + p * p;
        if (m > 9 * u * u) continue;
        let h = Math.sqrt(m) / u;
        ((n += Ru(h, d) * u),
          d > 0.55 &&
            (r = Math.max(
              r,
              d *
                (h < 1.25
                  ? Math.exp(-(((h - 1) / 0.3) ** 2))
                  : 0.6 * (h / 1.25) ** -2.2),
            )));
      }
  }
  return { height: n, bright: r };
}
var Wu = -1,
  Gu = [],
  Ku = new Map(),
  qu = { centerX: 0, centerZ: 0, size: 0, minY: 0, maxY: 0 },
  Ju = null,
  Yu = 64,
  Xu = 16,
  Zu = { min: 0.55, max: 0.95 },
  Qu = 1.5;
function $u() {
  if (Wu === F) return Gu;
  Wu = F;
  let e = Rt.filter((e) => !e.glass),
    t = Rt.filter((e) => e.glass),
    n = (e, t) => t.some((t) => e >= t.from * F - 4 && e <= t.to * F + 4),
    r = j(0) + 1;
  ((Gu = Array.from({ length: Math.ceil(F / 4) }, (i, a) => {
    let o = a * 4,
      s = Gn(o),
      c = s.position;
    return {
      d: o,
      x: c.x,
      y: c.y,
      z: c.z,
      low: c.y - r * Math.abs(Math.sin(s.bank)),
      tx: s.tangent.x / (Math.hypot(s.tangent.x, s.tangent.z) || 1),
      tz: s.tangent.z / (Math.hypot(s.tangent.x, s.tangent.z) || 1),
      buried: n(o, e),
      roofed: e.some((e) => o >= e.from * F + 2 && o <= e.to * F - 2),
      glass: n(o, t),
      gap: Dt.some((e) => o > e.lip - 2 && o < e.land + 2),
    };
  })),
    (Ku = new Map()));
  let i = 1 / 0,
    a = -1 / 0,
    o = 1 / 0,
    s = -1 / 0,
    c = 1 / 0,
    l = -1 / 0;
  for (let e of Gu) {
    let t = Vu(Math.floor(e.x / Yu), Math.floor(e.z / Yu)),
      n = Ku.get(t);
    (n || Ku.set(t, (n = [])),
      n.push(e),
      (i = Math.min(i, e.x)),
      (a = Math.max(a, e.x)),
      (o = Math.min(o, e.z)),
      (s = Math.max(s, e.z)),
      (c = Math.min(c, e.y)),
      (l = Math.max(l, e.y)));
  }
  return (
    (qu = {
      centerX: Math.round((i + a) / 2),
      centerZ: Math.round((o + s) / 2),
      size: Math.ceil((Math.max(a - i, s - o) + 2 * Au.margin) / 80) * 80,
      minY: c,
      maxY: l,
    }),
    (Ju = ed()),
    Gu
  );
}
function ed() {
  let e = qu.size / 2 + 600,
    t = Xu,
    n = Math.ceil((e * 2) / t) + 1,
    r = qu.centerX - e,
    i = qu.centerZ - e,
    a = new Float32Array(n * n).fill(-1e4),
    o = new Float32Array(n * n).fill(1e4),
    s = new Uint8Array(n * n),
    c = Math.ceil(160 / t),
    l = j(0) + 5,
    u = qu.minY - ju - 30,
    d = new Float32Array(n * n);
  for (let e = 0; e < n; e++)
    for (let a = 0; a < n; a++)
      d[e * n + a] = Iu(
        Zu.min,
        Zu.max,
        Qc((r + a * t) / 210, (i + e * t) / 210, 3, 67),
      );
  for (let e of Gu) {
    let f = Math.round((e.x - r) / t),
      p = Math.round((e.z - i) / t);
    for (let e = Math.max(0, p - c); e <= Math.min(n - 1, p + c); e++)
      for (let t = Math.max(0, f - c); t <= Math.min(n - 1, f + c); t++)
        s[e * n + t] = 1;
    if (e.gap) continue;
    let m = e.low - ju,
      [h, g] = e.glass ? [e.y - 4, Nu] : e.buried ? [e.y + Mu, 28] : [m - 1, l],
      _ = Math.round((e.x - r) / t),
      v = Math.round((e.z - i) / t),
      y = Math.ceil(Math.max(g + (h - u) / Zu.min, l + (qu.maxY - m) / Qu) / t);
    for (let s = Math.max(0, v - y); s <= Math.min(n - 1, v + y); s++)
      for (let c = Math.max(0, _ - y); c <= Math.min(n - 1, _ + y); c++) {
        let u = r + c * t - e.x,
          f = i + s * t - e.z,
          p = Math.sqrt(u * u + f * f),
          _ = s * n + c;
        ((a[_] = Math.max(a[_], h - Math.max(0, p - g) * d[_])),
          e.buried || (o[_] = Math.min(o[_], m + Math.max(0, p - l) * Qu)));
      }
  }
  return { minX: r, minZ: i, step: t, count: n, fill: a, cut: o, near: s };
}
function td(e, t) {
  let n = Ju,
    r = (e - n.minX) / n.step,
    i = (t - n.minZ) / n.step;
  if (r < 0 || i < 0 || r > n.count - 1 || i > n.count - 1)
    return { fill: -1e4, cut: 1e4 };
  let a = Math.min(n.count - 2, Math.floor(r)),
    o = Math.min(n.count - 2, Math.floor(i)),
    s = r - a,
    c = i - o,
    l = (e) =>
      Iu(
        Iu(e[o * n.count + a], e[o * n.count + a + 1], s),
        Iu(e[(o + 1) * n.count + a], e[(o + 1) * n.count + a + 1], s),
        c,
      );
  return { fill: l(n.fill), cut: l(n.cut) };
}
function nd(e, t) {
  let n = Ju,
    r = Math.round((e - n.minX) / n.step),
    i = Math.round((t - n.minZ) / n.step);
  return r < 0 || i < 0 || r >= n.count || i >= n.count
    ? !1
    : n.near[i * n.count + r] === 1;
}
function rd(e, t, n, r) {
  let i = Math.floor(e / Yu),
    a = Math.floor(t / Yu),
    o = Math.ceil(n / Yu),
    s = n * n;
  for (let n = -o; n <= o; n++)
    for (let c = -o; c <= o; c++) {
      let o = Ku.get(Vu(i + n, a + c));
      if (o)
        for (let n of o) {
          let i = n.x - e,
            a = n.z - t,
            o = i * i + a * a;
          o <= s && r(n, Math.sqrt(o));
        }
    }
}
function id() {
  return ($u(), qu);
}
function ad(e, t) {
  return (
    $u(),
    qu.minY -
      ju -
      3 +
      (Qc(e / 1500, t / 1500, 3, 41) - 0.5) * 40 +
      (Qc(e / 320, t / 320, 3, 53) - 0.5) * 10
  );
}
function od(e, t) {
  $u();
  let { fill: n, cut: r } = td(e, t),
    i = Uu(e, t).height,
    a = ad(e, t) + i;
  if (n + Math.max(0, i) * 0.6 < a) return Math.min(a, r);
  let o = n - Lu(e / 120, t / 120, 3, 79) * 6 + i * 0.6;
  return Math.min(Math.max(a, o), r);
}
function sd(e, t, n = 0) {
  $u();
  let r = j(0),
    i = od(e, t);
  if (!nd(e, t)) return i;
  rd(e, t, 140, (n, a) => {
    let o = n.low - ju;
    n.buried
      ? a < 70 &&
        (i = Math.max(
          i,
          Iu(n.y + Mu + Lu(e / 70, t / 70, 3, 71) * 9, i, Fu(28, 70, a)),
        ))
      : n.glass && a < Nu
        ? (i = Math.max(i, n.y - 4))
        : !n.gap &&
          o - i < Au.bermReach &&
          (i = Math.max(i, o - Math.max(0, a - (r + 5)) * 0.9));
  });
  let a = -1 / 0;
  return (
    rd(e, t, 120, (o, s) => {
      if (
        (o.roofed &&
          s < r + 10 &&
          Math.abs((e - o.x) * o.tx + (t - o.z) * o.tz) < 2.5 &&
          (a = Math.max(a, o.y + Mu)),
        o.gap)
      ) {
        s < r + 34 && (i = Math.min(i, o.y - 46 + Fu(r + 6, r + 34, s) * 30));
        return;
      }
      if (o.glass) {
        i = Math.min(i, o.y - 4 + Math.max(0, s - 80) * Qu);
        return;
      }
      o.buried ||
        (i = Math.min(i, o.low - ju + Math.max(0, s - (r + 6 + n)) * 1.5));
    }),
    Math.max(i, a)
  );
}
var cd = [
  [12, 5200, 1150, 1700],
  [74, 6100, 820, 1300],
  [128, 4800, 640, 1100],
  [196, 5600, 1350, 2100],
  [252, 6300, 900, 1500],
  [318, 5e3, 760, 1200],
];
function ld(e, t) {
  $u();
  let { centerX: n, centerZ: r, size: i } = qu,
    a = Fu(0, 1200, Math.max(Math.abs(e - n) - i / 2, Math.abs(t - r) - i / 2)),
    o = Iu(
      od(e, t),
      qu.minY - ju - 3 + (Qc(e / 2600, t / 2600, 3, 83) - 0.5) * 160,
      a,
    );
  for (let [i, s, c, l] of cd) {
    let u = (i * Math.PI) / 180,
      d = n + Math.cos(u) * s,
      f = r + Math.sin(u) * s,
      p = Math.hypot(e - d, t - f) / l;
    if (p > 2.2) continue;
    let m = Lu(e / 900, t / 900, 4, Math.round(i));
    o = Math.max(
      o,
      Iu(o, qu.minY + c * Math.exp(-p * p * 1.1) * (0.62 + 0.55 * m), a),
    );
  }
  return o;
}
function ud(e = Au.step) {
  let { centerX: t, centerZ: n } = id(),
    r = Math.min(qu.size, (Au.maxCount - 1) * e),
    i = Math.round(r / e) + 1,
    a = t - r / 2,
    o = n - r / 2,
    s = new Float32Array(i * i);
  for (let t = 0; t < i; t++)
    for (let n = 0; n < i; n++)
      s[t * i + n] = sd(a + n * e, o + t * e, e - Au.step);
  return { heights: s, count: i, step: e, minX: a, minZ: o, size: r };
}
