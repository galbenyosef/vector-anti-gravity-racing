// assets__game-D43Oxqny 38 — math
// Lines 11544-11811 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Ip() {
  return [105, v * 0.575];
}
var Lp = 4,
  Rp = Ip,
  zp = 8,
  Bp = 8.8,
  Vp = 1.6,
  Hp = 9,
  Up = 3.5,
  Wp = Hp * zp * 110,
  Gp = [1, 1, 1],
  Kp = {
    kerbRed: `#d8262b`,
    kerbWhite: `#f4f4f0`,
    paint: `#eeeee8`,
    chequerDark: `#141619`,
    asphalt: `#3a3d41`,
    concrete: `#8f8a83`,
    coral: `#ff5a4e`,
    brass: `#c99a4a`,
    travertine: `#d9cfbf`,
    bronze: `#5b4126`,
    brassDark: `#7d5f30`,
    champagne: `#c8b28a`,
    bronzeGlass: `#5a4630`,
    clearGlass: `#22343e`,
    warm: `#ffd7a6`,
    downlight: `#ffcf96`,
    ledCap: `#eef3ff`,
    teams: [`#ff6536`, `#54deda`, `#ff6576`, `#d9b572`],
  },
  qp = (e) => ((e % v) + v) % v,
  Jp = (e, t, n) => [0, v, -v].some((r) => e + r >= t && e + r <= n);
function Yp() {
  let { kerbRadius: e, kerbTolerance: t, kerbRunIn: n, kerbRepeat: r } = Np,
    i = (1 / e) * (1 + t),
    a = [],
    o = -1;
  for (let e = 0; e <= v; e += 1) {
    let t = Math.abs(Ot(e).curvature) > i;
    (t && o < 0 && (o = e),
      (!t || e + 1 > v) &&
        o >= 0 &&
        (a.push({ from: o - n, to: e + n }), (o = -1)));
  }
  let s = [];
  for (let e of a) {
    let t = s.at(-1);
    t && e.from <= t.to ? (t.to = Math.max(t.to, e.to)) : s.push({ ...e });
  }
  return s.map(({ from: e, to: t }) => ({
    from: Math.floor(e / r) * r,
    to: Math.ceil(t / r) * r,
  }));
}
function Xp() {
  let e = (e) => {
      for (let t = e; t < e + 400; t++)
        if (Math.abs(Ot(t).curvature) > 1 / 60) return t;
      return e;
    },
    t = e(300),
    n = e(v * 0.64);
  return [
    { name: `CORONATION CORNER`, from: t - 320, to: t + 10 },
    { name: `SILO HAIRPIN`, from: n - 320, to: n + 10 },
  ];
}
function Zp(e = 10, t = 1500) {
  let n = Math.round(v / e),
    r = v / n,
    i = P(0) - Np.kerbWidth - Np.rubberWidth / 2,
    a = Array.from({ length: n }, (e, t) => Ot(t * r).curvature),
    o = 1 / 60 ** 2,
    s = (e, t) => (e[(t + 1) % n] - 2 * e[t] + e[(t - 1 + n) % n]) / (r * r),
    c = 1 / (32 / r ** 4 + (4 * o) / r ** 2),
    l = new Float64Array(n),
    u = new Float64Array(n),
    d = new Float64Array(n),
    f = new Float64Array(n);
  for (let e = 1; e <= t; e++) {
    let t = (e - 1) / (e + 2);
    for (let e = 0; e < n; e++) d[e] = l[e] + t * (l[e] - u[e]);
    for (let e = 0; e < n; e++) f[e] = a[e] + s(d, e);
    ((u = l), (l = new Float64Array(n)));
    for (let e = 0; e < n; e++) {
      let t = 2 * s(f, e) - o * (a[e] + s(d, e));
      l[e] = F.clamp(d[e] - c * t, -i, i);
    }
  }
  let p = 10 / r,
    m = Math.ceil(p * 3),
    h = Array.from({ length: m * 2 + 1 }, (e, t) =>
      Math.exp(-((t - m) ** 2) / (2 * p * p)),
    ),
    g = h.reduce((e, t) => e + t, 0);
  return {
    step: r,
    lanes: Array.from({ length: n }, (e, t) => {
      let r = 0;
      for (let e = -m; e <= m; e++) r += l[(t + e + n * 4) % n] * h[e + m];
      return F.clamp(r / g, -i, i);
    }),
  };
}
function Qp() {
  let e = v,
    t = [],
    n = (e, n) => t.push([1, e, n], [-1, e, n]);
  return (
    n(-88, 400),
    n(2390, 2860),
    n(e * 0.551, e * 0.653),
    n(4600, 4860),
    t
  );
}
var $p = (e, t = 1) => {
    let n = new j(e);
    return [n.r * t, n.g * t, n.b * t];
  },
  em = class {
    constructor(e = []) {
      ((this.extraNames = e),
        (this.positions = []),
        (this.normals = []),
        (this.colors = []),
        (this.uvs = []),
        (this.indices = []),
        (this.extra = {}));
      for (let t of e) this.extra[t] = [];
    }
    get count() {
      return this.positions.length / 3;
    }
    vertex(e, t, n, r = 0, i = 0, a = []) {
      return (
        this.positions.push(e.x, e.y, e.z),
        this.normals.push(t.x, t.y, t.z),
        this.colors.push(n[0], n[1], n[2]),
        this.uvs.push(r, i),
        this.extraNames.forEach((e, t) => this.extra[e].push(a[t] ?? 0)),
        this.count - 1
      );
    }
    quad(e, t, n, r) {
      this.indices.push(e, n, t, t, n, r);
    }
    flat(e, t, n = [0, 0, 1, 0, 0, 1, 1, 1], r = []) {
      let [i, a, o] = e,
        s = o.clone().sub(i).cross(a.clone().sub(i)).normalize(),
        c = e.map((e, i) => this.vertex(e, s, t, n[i * 2], n[i * 2 + 1], r));
      this.quad(c[0], c[1], c[2], c[3]);
    }
    geometry(e) {
      let t = new Me();
      (t.setAttribute(`position`, new N(this.positions, 3)),
        e.includes(`normal`) &&
          t.setAttribute(`normal`, new N(this.normals, 3)),
        e.includes(`color`) && t.setAttribute(`color`, new N(this.colors, 3)),
        e.includes(`uv`) && t.setAttribute(`uv`, new N(this.uvs, 2)));
      for (let e of this.extraNames) t.setAttribute(e, new N(this.extra[e], 1));
      return (
        t.setIndex(
          this.count > 65535
            ? new st(this.indices, 1)
            : new Rt(this.indices, 1),
        ),
        t.computeBoundingBox(),
        t.computeBoundingSphere(),
        t
      );
    }
  };
function tm(
  e,
  t,
  n,
  r,
  i,
  a,
  { u: o = (e) => e, v: s = (e, t) => t, extra: c } = {},
) {
  let l = Math.max(1, Math.ceil((n - t) / r - 1e-9)),
    u = (typeof i == `function` ? i(t) : i).length - 1,
    d = e.count;
  for (let r = 0; r <= l; r++) {
    let d = F.lerp(t, n, r / l),
      f = Ot(d),
      p = typeof i == `function` ? i(d) : i,
      m = typeof a == `function` ? a(d) : a,
      h = c?.(d) ?? [];
    for (let t = 0; t < u; t++) {
      let [n, r] = p[t],
        [i, a] = p[t + 1],
        c = f.right
          .clone()
          .multiplyScalar(-(a - r))
          .addScaledVector(f.up, i - n)
          .normalize();
      for (let [l, u, p] of [
        [n, r, t],
        [i, a, t + 1],
      ]) {
        let t = f.position
          .clone()
          .addScaledVector(f.right, l)
          .addScaledVector(f.up, u);
        e.vertex(t, c, m, o(d), s(p, u), h);
      }
    }
  }
  let f = u * 2;
  for (let t = 0; t < l; t++)
    for (let n = 0; n < u; n++) {
      let r = d + t * f + n * 2;
      e.quad(r, r + 1, r + f, r + f + 1);
    }
}
function nm(e, t, n, r, i, a, o) {
  tm(
    e,
    t,
    n,
    2,
    [
      [Math.min(r, i), a],
      [Math.max(r, i), a],
    ],
    o,
  );
}
function rm(e, t, n, r, i, a = {}) {
  let [o, s, c] = n,
    l = (e, n, i) =>
      t
        .clone()
        .addScaledVector(o, (e * r[0]) / 2)
        .addScaledVector(s, (n * r[1]) / 2)
        .addScaledVector(c, (i * r[2]) / 2);
  for (let t = 0; t < 3; t++)
    for (let n of [1, -1]) {
      if (t === 1 && n < 0 && !a.bottom) continue;
      let r = (t + 1) % 3,
        o = (t + 2) % 3,
        s = (e, i) => {
          let a = [0, 0, 0];
          return ((a[t] = n), (a[r] = e), (a[o] = i), l(a[0], a[1], a[2]));
        };
      e.flat(
        n > 0
          ? [s(-1, -1), s(-1, 1), s(1, -1), s(1, 1)]
          : [s(-1, -1), s(1, -1), s(-1, 1), s(1, 1)],
        i,
      );
    }
}
function im(e) {
  let t = Ot(e);
  return [t.right, t.up, t.tangent];
}
function am(e) {
  let t = Ot(e),
    n = new A(t.right.x, 0, t.right.z).normalize(),
    r = new A(t.tangent.x, 0, t.tangent.z).normalize();
  return [n, new A(0, 1, 0), r];
}
