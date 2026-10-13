// assets__game-CsnOSIff 31 — math
// Lines 8947-9290 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Jd = k[1],
  Yd = or,
  Xd = Yd.length,
  Zd = Yd.halfWidth(),
  Qd = Math.PI / 180,
  $d = { moving: 22, soffit: 14.5, slab: 1.6, footMargin: 7 },
  ef = class {
    constructor(e, t) {
      let n = [...e];
      if (t && n.length > 2) {
        let e = n[0],
          t = n[n.length - 1];
        Math.hypot(e[0] - t[0], e[1] - t[1], e[2] - t[2]) < 1e-6 && n.pop();
      }
      if (n.length < 2) throw Error(`LinePath needs at least two points`);
      ((this.closed = t),
        (this.count = n.length),
        (this.xs = new Float64Array(n.map((e) => e[0]))),
        (this.ys = new Float64Array(n.map((e) => e[1]))),
        (this.zs = new Float64Array(n.map((e) => e[2]))));
      let r = t ? n.length + 1 : n.length;
      this.cum = new Float64Array(r);
      for (let e = 1; e < r; e++) {
        let t = (e - 1) % n.length,
          r = e % n.length;
        this.cum[e] =
          this.cum[e - 1] +
          Math.hypot(
            this.xs[r] - this.xs[t],
            this.ys[r] - this.ys[t],
            this.zs[r] - this.zs[t],
          );
      }
      this.length = this.cum[r - 1];
    }
    wrap(e) {
      if (this.closed) {
        let t = e % this.length;
        return t < 0 ? t + this.length : t;
      }
      return Math.min(this.length, Math.max(0, e));
    }
    locate(e) {
      let t = this.wrap(e),
        n = 0,
        r = this.cum.length - 1;
      for (; r - n > 1;) {
        let e = (n + r) >> 1;
        this.cum[e] <= t ? (n = e) : (r = e);
      }
      let i = this.cum[r] - this.cum[n];
      return { i: n, t: i > 0 ? (t - this.cum[n]) / i : 0 };
    }
    index(e) {
      return this.closed ? ((e % this.count) + this.count) % this.count : e;
    }
    pointAt(e, t) {
      let { i: n, t: r } = this.locate(e),
        i = this.index(n),
        a = this.index(n + 1),
        o = t ?? { x: 0, y: 0, z: 0 };
      return (
        (o.x = this.xs[i] + (this.xs[a] - this.xs[i]) * r),
        (o.y = this.ys[i] + (this.ys[a] - this.ys[i]) * r),
        (o.z = this.zs[i] + (this.zs[a] - this.zs[i]) * r),
        o
      );
    }
    tangentAt(e, t) {
      let { i: n, t: r } = this.locate(e),
        i = t ?? { x: 0, y: 0, z: 0 },
        a = (e) => {
          let t = this.closed ? this.count - 1 : this.count - 2,
            n = this.closed ? e : Math.min(Math.max(e, 0), t),
            r = this.index(n),
            i = this.index(n + 1);
          return [
            this.xs[i] - this.xs[r],
            this.ys[i] - this.ys[r],
            this.zs[i] - this.zs[r],
          ];
        },
        o = a(n),
        s = a(r < 0.5 ? n - 1 : n + 1),
        c = r < 0.5 ? 0.5 - r : r - 0.5,
        l = (e) => {
          let t = Math.hypot(e[0], e[1], e[2]) || 1;
          return [e[0] / t, e[1] / t, e[2] / t];
        },
        u = l(o),
        d = l(s),
        f = u[0] * (1 - c) + d[0] * c,
        p = u[1] * (1 - c) + d[1] * c,
        m = u[2] * (1 - c) + d[2] * c,
        h = Math.hypot(f, p, m) || 1;
      return ((i.x = f / h), (i.y = p / h), (i.z = m / h), i);
    }
    headingAt(e) {
      let t = this.tangentAt(e);
      return Math.atan2(t.z, t.x);
    }
    curvatureAt(e, t = 6) {
      let n = this.headingAt(e - t),
        r = this.headingAt(e + t) - n;
      for (; r > Math.PI;) r -= 2 * Math.PI;
      for (; r < -Math.PI;) r += 2 * Math.PI;
      let i = this.closed ? 2 * t : this.wrap(e + t) - this.wrap(e - t);
      return i > 0 ? r / i : 0;
    }
    gradeAt(e) {
      let t = this.tangentAt(e);
      return t.y / Math.max(1e-6, Math.hypot(t.x, t.z));
    }
    nearestS(e, t, n, r = !1) {
      let i = 0,
        a = 1 / 0,
        o = Math.max(1, Math.floor(this.count / 2e3));
      for (let s = 0; s < this.count; s += o) {
        let o =
          (this.xs[s] - e) ** 2 +
          (this.zs[s] - n) ** 2 +
          (r ? 0 : (this.ys[s] - t) ** 2);
        o < a && ((a = o), (i = s));
      }
      let s = this.cum[i],
        c = { x: 0, y: 0, z: 0 };
      for (let i = o * 2; i > 0.01; i *= 0.5)
        for (let o of [s - i, s + i]) {
          this.pointAt(o, c);
          let i = (c.x - e) ** 2 + (c.z - n) ** 2 + (r ? 0 : (c.y - t) ** 2);
          i < a && ((a = i), (s = this.wrap(o)));
        }
      return s;
    }
    stations(e) {
      let t = [],
        n = Math.max(1, Math.ceil(this.length / e - 1e-9)),
        r = this.length / n;
      for (let e = 0; e <= (this.closed ? n - 1 : n); e++) t.push(e * r);
      return t;
    }
    points() {
      return Array.from({ length: this.count }, (e, t) => [
        this.xs[t],
        this.ys[t],
        this.zs[t],
      ]);
    }
  },
  tf = (e) => [-Math.sin(e), Math.cos(e)];
function nf(e, t, n, r, i = !1) {
  let a = Yd.frame(e),
    o = Math.atan2(a.tangent.z, a.tangent.x) + (r ? Math.PI : 0);
  if (i)
    return {
      x: a.position.x + a.right.x * t + a.up.x * n,
      y: a.position.y + a.right.y * t + a.up.y * n,
      z: a.position.z + a.right.z * t + a.up.z * n,
      h: o,
    };
  let s = Math.hypot(a.right.x, a.right.z) || 1;
  return {
    x: a.position.x + (a.right.x / s) * t,
    y: a.position.y + n,
    z: a.position.z + (a.right.z / s) * t,
    h: o,
  };
}
function rf(e, t, n, r) {
  let i = Math.hypot(t.x - e.x, t.z - e.z),
    a = n * i,
    o = [e.x + Math.cos(e.h) * a, e.z + Math.sin(e.h) * a],
    s = [t.x - Math.cos(t.h) * a, t.z - Math.sin(t.h) * a],
    c = Math.max(2, Math.ceil(Math.max(i, Math.abs(t.y - e.y)) * 1.3));
  for (let n = 1; n <= c; n++) {
    let i = n / c,
      a = 1 - i,
      l =
        a * a * a * e.x +
        3 * a * a * i * o[0] +
        3 * a * i * i * s[0] +
        i * i * i * t.x,
      u =
        a * a * a * e.z +
        3 * a * a * i * o[1] +
        3 * a * i * i * s[1] +
        i * i * i * t.z;
    r.push([l, e.y + (t.y - e.y) * i, u]);
  }
}
function af(e, t, n) {
  let r = { x: e[0], y: e[1], z: e[2], h: t * Qd },
    i = [[r.x, r.y, r.z]],
    a = (e) => {
      (i.push(e), (r.x = e[0]), (r.y = e[1]), (r.z = e[2]));
    };
  for (let e of n)
    if (`straight` in e) {
      let t = Math.max(1, Math.ceil(e.straight)),
        n = r.y,
        i = e.y ?? r.y,
        o = r.x,
        s = r.z;
      for (let c = 1; c <= t; c++) {
        let l = c / t;
        a([
          o + Math.cos(r.h) * e.straight * l,
          n + (i - n) * l,
          s + Math.sin(r.h) * e.straight * l,
        ]);
      }
    } else if (`turn` in e) {
      let t = e.turn === `right` ? 1 : -1,
        n = e.degrees * Qd,
        [i, o] = tf(r.h),
        s = r.x + t * e.radius * i,
        c = r.z + t * e.radius * o,
        l = r.h,
        u = r.y,
        d = e.y ?? r.y,
        f = Math.max(2, Math.ceil(e.radius * n));
      for (let r = 1; r <= f; r++) {
        let i = r / f,
          [o, p] = tf(l + t * n * i);
        a([s - t * e.radius * o, u + (d - u) * i, c - t * e.radius * p]);
      }
      r.h = l + t * n;
    } else if (`follow` in e) {
      let [t, n] = e.follow,
        a = n < t,
        [o, s] = typeof e.height == `number` ? [e.height, e.height] : e.height,
        c = e.banked ?? !1,
        l = nf(t, e.lane, o, a, c);
      Math.hypot(l.x - r.x, l.z - r.z) > 0.5 && rf({ ...r }, l, 0.4, i);
      let u = Math.max(1, Math.ceil(Math.abs(n - t)));
      for (let r = 1; r <= u; r++) {
        let l = nf(t + ((n - t) * r) / u, e.lane, o + ((s - o) * r) / u, a, c);
        i.push([l.x, l.y, l.z]);
      }
      let d = nf(n, e.lane, s, a, c);
      Object.assign(r, d);
    } else if (`polyline` in e) {
      for (let t of e.polyline) {
        let e = Math.max(
            1,
            Math.ceil(Math.hypot(t[0] - r.x, t[1] - r.y, t[2] - r.z)),
          ),
          n = r.x,
          i = r.y,
          o = r.z;
        for (let r = 1; r <= e; r++)
          a([
            n + ((t[0] - n) * r) / e,
            i + ((t[1] - i) * r) / e,
            o + ((t[2] - o) * r) / e,
          ]);
      }
      let t = i.length;
      t > 1 &&
        (r.h = Math.atan2(
          i[t - 1][2] - i[t - 2][2],
          i[t - 1][0] - i[t - 2][0],
        ));
    } else {
      let t = { x: e.to[0], y: e.to[1], z: e.to[2], h: e.heading * Qd };
      (rf({ ...r }, t, e.tension ?? 0.4, i), Object.assign(r, t));
    }
  return i;
}
var of = 200,
  sf = Float64Array.from({ length: 3 * of + 2 }, (e, t) =>
    Math.exp(-0.5 * (t / of) ** 2),
  );
function cf(e, t, n) {
  if (t <= 0) return e;
  let r = e.length,
    i = new Float64Array(r),
    a = new Float64Array(r);
  a[0] = e[0][1];
  for (let t = 1; t < r; t++) {
    let n = e[t - 1],
      r = e[t];
    ((i[t] = i[t - 1] + Math.hypot(r[0] - n[0], r[1] - n[1], r[2] - n[2])),
      (a[t] = r[1]));
  }
  let [o, s] = [e[0], e[r - 1]],
    c = n
      ? i[r - 1] + Math.hypot(o[0] - s[0], o[1] - s[1], o[2] - s[2])
      : i[r - 1],
    l = t * 3,
    u = of / t,
    d = [];
  for (let o = 0; o < r; o++) {
    let s = a[o],
      f = 1;
    for (let e = 1; e < r; e++) {
      let t = o - e,
        d = 0;
      if (t < 0) {
        if (!n) break;
        ((t += r), (d = i[o] + c - i[t]));
      } else d = i[o] - i[t];
      if (d > l) break;
      let p = sf[(d * u + 0.5) | 0];
      ((s += a[t] * p), (f += p));
    }
    for (let e = 1; e < r; e++) {
      let t = o + e,
        d = 0;
      if (t >= r) {
        if (!n) break;
        ((t -= r), (d = i[t] + c - i[o]));
      } else d = i[t] - i[o];
      if (d > l) break;
      let p = sf[(d * u + 0.5) | 0];
      ((s += a[t] * p), (f += p));
    }
    let p = s / f,
      m = n ? 1 : Math.min(1, Math.min(i[o], c - i[o]) / (2 * t));
    d.push([e[o][0], e[o][1] + (p - e[o][1]) * m, e[o][2]]);
  }
  return d;
}
var lf = {
    monorail: { half: 1.8, above: 4.4, below: 1.9, movingBelow: 1.2 },
    maglev: { half: 4, above: 4, below: 4, movingBelow: 2.4 },
    expressway: { half: 12, above: 4.2, below: 2.4, movingBelow: 0 },
    skyLane: { half: 9, above: 5, below: 0, movingBelow: 5 },
    drone: { half: 8.5, above: 2.5, below: 0, movingBelow: 9 },
    blimp: { half: 14, above: 14, below: 0, movingBelow: 18 },
    taxi: { half: 4, above: 2, below: 0, movingBelow: 2 },
    conveyor: { half: 2.2, above: 1.6, below: 0, movingBelow: 1.6 },
  },
  uf = Ve[0].from * Xd,
  df = Ve[0].to * Xd,
  ff = Yd.frame(uf).position,
  pf = Yd.frame(df).position,
  mf = Math.atan2(pf.z - ff.z, pf.x - ff.x) / Qd,
  hf = Math.hypot(pf.x - ff.x, pf.z - ff.z);
function gf(e, t) {
  let n = Math.cos(mf * Qd),
    r = Math.sin(mf * Qd);
  return [ff.x + n * e + r * t, ff.z + r * e - n * t];
}
