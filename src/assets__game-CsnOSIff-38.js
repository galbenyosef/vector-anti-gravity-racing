// assets__game-CsnOSIff 38 — math
// Lines 11508-11776 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function Fp() {
  return [105, F * 0.575];
}
var Ip = 4,
  Lp = Fp,
  Rp = 8,
  zp = 8.8,
  Bp = 1.6,
  Vp = 9,
  Hp = 3.5,
  Up = Vp * Rp * 110,
  Wp = [1, 1, 1],
  Gp = {
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
  Kp = (e) => ((e % F) + F) % F,
  qp = (e, t, n) => [0, F, -F].some((r) => e + r >= t && e + r <= n);
function Jp() {
  let { kerbRadius: e, kerbTolerance: t, kerbRunIn: n, kerbRepeat: r } = Mp,
    i = (1 / e) * (1 + t),
    a = [],
    o = -1;
  for (let e = 0; e <= F; e += 1) {
    let t = Math.abs(Gn(e).curvature) > i;
    (t && o < 0 && (o = e),
      (!t || e + 1 > F) &&
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
function Yp() {
  let e = (e) => {
      for (let t = e; t < e + 400; t++)
        if (Math.abs(Gn(t).curvature) > 1 / 60) return t;
      return e;
    },
    t = e(300),
    n = e(F * 0.64);
  return [
    { name: `CORONATION CORNER`, from: t - 320, to: t + 10 },
    { name: `SILO HAIRPIN`, from: n - 320, to: n + 10 },
  ];
}
function Xp(e = 10, t = 1500) {
  let n = Math.round(F / e),
    r = F / n,
    i = j(0) - Mp.kerbWidth - Mp.rubberWidth / 2,
    a = Array.from({ length: n }, (e, t) => Gn(t * r).curvature),
    o = 1 / 60 ** 2,
    c = (e, t) => (e[(t + 1) % n] - 2 * e[t] + e[(t - 1 + n) % n]) / (r * r),
    l = 1 / (32 / r ** 4 + (4 * o) / r ** 2),
    u = new Float64Array(n),
    d = new Float64Array(n),
    f = new Float64Array(n),
    p = new Float64Array(n);
  for (let e = 1; e <= t; e++) {
    let t = (e - 1) / (e + 2);
    for (let e = 0; e < n; e++) f[e] = u[e] + t * (u[e] - d[e]);
    for (let e = 0; e < n; e++) p[e] = a[e] + c(f, e);
    ((d = u), (u = new Float64Array(n)));
    for (let e = 0; e < n; e++) {
      let t = 2 * c(p, e) - o * (a[e] + c(f, e));
      u[e] = s.clamp(f[e] - l * t, -i, i);
    }
  }
  let m = 10 / r,
    h = Math.ceil(m * 3),
    g = Array.from({ length: h * 2 + 1 }, (e, t) =>
      Math.exp(-((t - h) ** 2) / (2 * m * m)),
    ),
    _ = g.reduce((e, t) => e + t, 0);
  return {
    step: r,
    lanes: Array.from({ length: n }, (e, t) => {
      let r = 0;
      for (let e = -h; e <= h; e++) r += u[(t + e + n * 4) % n] * g[e + h];
      return s.clamp(r / _, -i, i);
    }),
  };
}
function Zp() {
  let e = F,
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
var Qp = (e, t = 1) => {
    let n = new _(e);
    return [n.r * t, n.g * t, n.b * t];
  },
  $p = class {
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
      let t = new tr();
      (t.setAttribute(`position`, new ct(this.positions, 3)),
        e.includes(`normal`) &&
          t.setAttribute(`normal`, new ct(this.normals, 3)),
        e.includes(`color`) && t.setAttribute(`color`, new ct(this.colors, 3)),
        e.includes(`uv`) && t.setAttribute(`uv`, new ct(this.uvs, 2)));
      for (let e of this.extraNames)
        t.setAttribute(e, new ct(this.extra[e], 1));
      return (
        t.setIndex(
          this.count > 65535
            ? new Lt(this.indices, 1)
            : new Bt(this.indices, 1),
        ),
        t.computeBoundingBox(),
        t.computeBoundingSphere(),
        t
      );
    }
  };
function em(
  e,
  t,
  n,
  r,
  i,
  a,
  { u: o = (e) => e, v: c = (e, t) => t, extra: l } = {},
) {
  let u = Math.max(1, Math.ceil((n - t) / r - 1e-9)),
    d = (typeof i == `function` ? i(t) : i).length - 1,
    f = e.count;
  for (let r = 0; r <= u; r++) {
    let f = s.lerp(t, n, r / u),
      p = Gn(f),
      m = typeof i == `function` ? i(f) : i,
      h = typeof a == `function` ? a(f) : a,
      g = l?.(f) ?? [];
    for (let t = 0; t < d; t++) {
      let [n, r] = m[t],
        [i, a] = m[t + 1],
        s = p.right
          .clone()
          .multiplyScalar(-(a - r))
          .addScaledVector(p.up, i - n)
          .normalize();
      for (let [l, u, d] of [
        [n, r, t],
        [i, a, t + 1],
      ]) {
        let t = p.position
          .clone()
          .addScaledVector(p.right, l)
          .addScaledVector(p.up, u);
        e.vertex(t, s, h, o(f), c(d, u), g);
      }
    }
  }
  let p = d * 2;
  for (let t = 0; t < u; t++)
    for (let n = 0; n < d; n++) {
      let r = f + t * p + n * 2;
      e.quad(r, r + 1, r + p, r + p + 1);
    }
}
function tm(e, t, n, r, i, a, o) {
  em(
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
function nm(e, t, n, r, i, a = {}) {
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
function rm(e) {
  let t = Gn(e);
  return [t.right, t.up, t.tangent];
}
function im(e) {
  let t = Gn(e),
    n = new g(t.right.x, 0, t.right.z).normalize(),
    r = new g(t.tangent.x, 0, t.tangent.z).normalize();
  return [n, new g(0, 1, 0), r];
}
