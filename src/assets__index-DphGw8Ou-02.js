// assets__index-DphGw8Ou 02 — math
// Lines 68717-68998 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function fJ(e, t = [0, 0, 0], n = 0, r = 28) {
  mJ(r, `Route spacing`);
  let i = [],
    [a, o, s] = t,
    c = n;
  for (let t of e) {
    let e =
      `straight` in t ? t.straight : (t.radius * t.degrees * Math.PI) / 180;
    mJ(e, `Route segment length`);
    let n = Math.max(1, Math.ceil(e)),
      r = (t.rise ?? 0) / n,
      l =
        `straight` in t
          ? 0
          : ((t.turn === `right` ? 1 : -1) * e) / t.radius / n;
    for (let t = 0; t < n; t++)
      (i.push([a, o, s]),
        (c += l / 2),
        (a += (e / n) * Math.cos(c)),
        (s += (e / n) * Math.sin(c)),
        (c += l / 2),
        (o += r));
  }
  let l = i.length,
    u = { x: a, y: o, z: s, psi: c },
    d = Math.max(4, Math.round(l / r));
  return {
    controlPoints: Array.from({ length: d }, (e, t) => {
      let n = i[Math.min(l - 1, Math.round((t * l) / d))];
      return [n[0], n[1], n[2]];
    }),
    end: u,
    length: l,
  };
}
function pJ(e, t) {
  if (!Number.isFinite(e)) throw Error(`${t} must be finite`);
}
function mJ(e, t) {
  if ((pJ(e, t), e <= 0)) throw Error(`${t} must be positive`);
}
function hJ(e, t, n) {
  if (!Number.isInteger(e) || e < t || e > 2e5)
    throw Error(`${n} must be an integer from ${t} to 200000`);
}
var gJ = class extends Y_ {
  constructor(e) {
    (super(), (this.points = e));
  }
  getPoint(e, t = new L()) {
    let n = (((e % 1) + 1) % 1) * this.points.length,
      r = Math.floor(n),
      i = n - r,
      a = [
        (1 - i) ** 3 / 6,
        (3 * i ** 3 - 6 * i * i + 4) / 6,
        (-3 * i ** 3 + 3 * i * i + 3 * i + 1) / 6,
        i ** 3 / 6,
      ];
    t.set(0, 0, 0);
    for (let e = 0; e < 4; e++)
      t.addScaledVector(this.points[(r + e) % this.points.length], a[e]);
    return t;
  }
};
function _J(e, t = !1) {
  let n = e.sampleCount ?? uJ.sampleCount,
    r = e.arcLengthDivisions ?? uJ.arcLengthDivisions;
  (hJ(n, 64, `sampleCount`),
    hJ(r, n, `arcLengthDivisions`),
    mJ(e.halfWidth, `halfWidth`));
  let i = dJ[e.profile ?? `flowing`];
  if (!i) throw Error(`Unknown track profile`);
  if (e.controlPoints.length < 4)
    throw Error(`A closed circuit needs at least four distinct control points`);
  let a = e.scale ?? [1, 1, 1];
  a.forEach((e) => mJ(e, `control-point scale`));
  let o = e.controlPoints.map((e, t) => {
    if (e.length !== 3) throw Error(`Control point ${t} needs x, y, z`);
    return (
      e.forEach((e) => pJ(e, `Control point ${t}`)),
      new L(e[0] * a[0], e[1] * a[1], e[2] * a[2])
    );
  });
  o.forEach((e, t) => {
    if (e.distanceToSquared(o[(t + 1) % o.length]) < 1e-10)
      throw Error(
        `Adjacent control points must be distinct; do not repeat the first point`,
      );
  });
  let s = new gJ(o);
  s.arcLengthDivisions = r;
  let c = s.getLength();
  mJ(c, `Circuit length`);
  let l = s.getSpacedPoints(n),
    u = (e) => l[(e + n) % n],
    d = l.slice(0, n).map((e, t) => {
      let n = u(t + 1)
        .clone()
        .sub(u(t - 1))
        .normalize();
      if (Math.hypot(n.x, n.z) < 1e-5)
        throw Error(
          `Circuit has a stationary or vertical tangent; check control-point order`,
        );
      return n;
    }),
    f = uJ.curvatureRadius,
    p = (f * 2 * c) / n,
    m = d.map((e, t) => {
      let r = d[(t - f + n) % n],
        i = d[(t + f) % n];
      return Math.atan2(r.z * i.x - r.x * i.z, r.x * i.x + r.z * i.z) / p;
    }),
    h = l.slice(0, n).map((e, t) => {
      let r = 0,
        a = 0;
      for (let e = -i.bankWindow; e <= i.bankWindow; e++) {
        let o = Math.exp(-(e * e) / i.bankFalloff);
        ((r += m[(t + e + n) % n] * o), (a += o));
      }
      let o = -jp.clamp((r / a) * i.bankGain, -i.maxBank, i.maxBank),
        s = d[(t - f + n) % n],
        c = d[(t + f) % n];
      return {
        position: e,
        tangent: d[t],
        curvature: m[t],
        verticalCurvature: (Math.asin(c.y) - Math.asin(s.y)) / p,
        bank: o,
      };
    }),
    g = () => e.halfWidth,
    _ = (e) => ((e % c) + c) % c,
    v = (e) => {
      let r = (_(t ? -e : e) / c) * n,
        i = Math.floor(r);
      return (
        jp.lerp(h[i].curvature, h[(i + 1) % n].curvature, r - i) * (t ? -1 : 1)
      );
    },
    y = (e) => {
      let r = (_(t ? -e : e) / c) * n,
        i = Math.floor(r),
        a = r - i,
        o = h[i].tangent,
        s = h[(i + 1) % n].tangent,
        l = o.x + (s.x - o.x) * a,
        u = o.y + (s.y - o.y) * a,
        d = o.z + (s.z - o.z) * a;
      return u * (1 / (Math.sqrt(l * l + u * u + d * d) || 1)) * (t ? -1 : 1);
    },
    b = (e) => {
      let r = (_(t ? -e : e) / c) * n,
        i = Math.floor(r),
        a = r - i,
        o = h[i],
        s = h[(i + 1) % n],
        l = o.tangent.clone().lerp(s.tangent, a).normalize(),
        u = jp.lerp(o.bank, s.bank, a) * (t ? -1 : 1);
      t && l.negate();
      let d = new L(l.z, 0, -l.x).normalize().applyAxisAngle(l, u),
        f = l.clone().cross(d).normalize();
      return {
        position: o.position.clone().lerp(s.position, a),
        tangent: l,
        right: d,
        up: f,
        bank: u,
        curvature: jp.lerp(o.curvature, s.curvature, a) * (t ? -1 : 1),
        verticalCurvature: jp.lerp(o.verticalCurvature, s.verticalCurvature, a),
      };
    },
    x = (e, t = 0, n = 0) => {
      let r = b(e);
      return r.position.addScaledVector(r.right, t).addScaledVector(r.up, n);
    },
    S = (e, t, n) =>
      x(e + uJ.normalProbe, t, n).sub(x(e - uJ.normalProbe, t, n)),
    C = (e) => Math.max(1, Math.round(c / e)) / c,
    w = (e, t, n) => {
      if (
        (pJ(e, `Surface start`),
        pJ(t, `Surface end`),
        mJ(n, `Surface step`),
        t <= e || t - e > c + 1e-6)
      )
        throw Error(
          `A surface span must be positive and no longer than one lap`,
        );
      let r = Math.max(1, Math.ceil((t - e) / n));
      if (r > 2e5)
        throw Error(`Surface exceeds the 200000-segment safety limit`);
      return r;
    },
    T = (e, t, n, r) => {
      let i = new Bh();
      return (
        i.setAttribute(`position`, new Oh(e, 3)),
        i.setAttribute(`normal`, new Oh(t, 3)),
        i.setAttribute(`uv`, new Oh(n, 2)),
        i.setIndex(r),
        i
      );
    };
  return {
    length: c,
    sampleCount: n,
    profile: i,
    curvatureAt: v,
    gradeAt: y,
    frame: b,
    point: x,
    halfWidth: g,
    ribbon: (e, t, n, r, i, a = 4) => {
      let o = w(e, t, a);
      pJ(i, `Ribbon height`);
      let s = [],
        c = [],
        l = [],
        u = [];
      for (let a = 0; a <= o; a++) {
        let d = jp.lerp(e, t, a / o),
          f = b(d),
          p = [n, r].map((e) => (typeof e == `function` ? e(d) : e));
        if ((p.forEach((e) => pJ(e, `Ribbon edge`)), p[0] >= p[1]))
          throw Error(`Ribbon left edge must be less than its right edge`);
        for (let [e, t] of p.entries()) {
          let n = f.position
              .clone()
              .addScaledVector(f.right, t)
              .addScaledVector(f.up, i),
            r = S(d, t, i).cross(f.right).normalize();
          (s.push(n.x, n.y, n.z),
            c.push(r.x, r.y, r.z),
            l.push(e, d * C(uJ.roadTextureMetres)));
        }
        if (a < o) {
          let e = a * 2;
          u.push(e, e + 2, e + 1, e + 1, e + 2, e + 3);
        }
      }
      return T(s, c, l, u);
    },
    wall: (e, t, n, r, i, a = 0, o = 0) => {
      let s = w(e, t, 2);
      if (
        ([r, i, a, o].forEach((e) => pJ(e, `Wall profile`)),
        n !== -1 && n !== 1)
      )
        throw Error(`Wall side must be -1 or 1`);
      if (i <= r) throw Error(`Wall top must be above its bottom`);
      let c = [],
        l = [],
        u = [],
        d = [];
      for (let f = 0; f <= s; f++) {
        let p = jp.lerp(e, t, f / s),
          m = b(p),
          h = m.up.clone().addScaledVector(m.right, n * o);
        for (let e of [r, i]) {
          let t = n * (g() + a + e * o),
            r = m.position
              .clone()
              .addScaledVector(m.right, t)
              .addScaledVector(m.up, e),
            i = S(p, t, e).cross(h).multiplyScalar(n).normalize();
          (c.push(r.x, r.y, r.z),
            l.push(i.x, i.y, i.z),
            u.push(p * C(uJ.wallTextureMetres), e / 8));
        }
        if (f < s) {
          let e = f * 2;
          n > 0
            ? d.push(e, e + 2, e + 1, e + 1, e + 2, e + 3)
            : d.push(e, e + 1, e + 2, e + 1, e + 3, e + 2);
        }
      }
      return T(c, l, u, d);
    },
  };
}
