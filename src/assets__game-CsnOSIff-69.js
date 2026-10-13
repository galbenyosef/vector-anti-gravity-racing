// assets__game-CsnOSIff 69 — math
// Lines 29783-30074 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function pb() {
  let e = Wv.frame(Ve[0].from * Gv),
    t = Math.atan2(-e.tangent.z, e.tangent.x),
    n = Math.cos(t),
    r = Math.sin(t),
    i = e.position;
  return {
    yaw: t,
    point: (e) => [
      i.x + e[0] * n + e[2] * r,
      i.y + e[1],
      i.z - e[0] * r + e[2] * n,
    ],
  };
}
var mb = (e) => Math.PI / 2 - e,
  hb = class extends dy {
    constructor(e, t) {
      (super(),
        (this.unit = e),
        (this.list = t),
        (this.frame = pb()),
        (this.units = [e]),
        (this.speed = 0.3));
      let n = this.frame.point(t[0].p);
      ((this.x = n[0]), (this.y = n[1]), (this.z = n[2]));
    }
    write(e) {
      let { w: t, xf: n } = e;
      this.list.forEach((r, i) => {
        let [a, o, s] = this.frame.point(r.p),
          c = this.frame.yaw + (r.yaw + (r.spin ?? 0) * e.t) * qv;
        (n.yaw(mb(c)).at(a, o, s),
          t.put(this.unit.pool, this.unit.start + i, n));
      });
    }
  },
  gb = { accel: 0.8, dwell: 5 },
  _b = 29,
  vb = 1.64,
  yb = class extends dy {
    constructor(e, t) {
      (super(),
        (this.unit = e),
        (this.lift = t),
        (this.frame = pb()),
        (this.units = [e]),
        (this.speed = t.speed ?? 2.5));
      let [n, r] = t.travel ?? [t.p[1], t.p[1]];
      ((this.span = r - n),
        (this.run = ny(Math.max(this.span, 0.01), this.speed, gb.accel)),
        (this.period = 2 * (this.run + gb.dwell)));
      let i = t.p[2],
        a =
          Math.abs(Math.cos(t.yaw * qv)) > 0.5 && Math.cos(t.yaw * qv) < 0
            ? 2.45
            : 1.82;
      this.lz = i > 0 ? Math.min(i, _b - vb - a - 0.3) : i;
    }
    write(e) {
      let { w: t, xf: n, motion: r } = e,
        [i] = this.lift.travel ?? [this.lift.p[1]],
        a = Qv(e.t + (this.lift.phase ?? 0), this.period),
        o;
      o =
        a < gb.dwell
          ? 0
          : (a -= gb.dwell) < this.run
            ? ry(this.span, this.speed, gb.accel, a, r).s
            : (a -= this.run) < gb.dwell
              ? this.span
              : this.span -
                ry(this.span, this.speed, gb.accel, a - gb.dwell, r).s;
      let [s, c, l] = this.frame.point([this.lift.p[0], i + o, this.lz]);
      (n.yaw(mb(this.frame.yaw + this.lift.yaw * qv)).at(s, c, l),
        t.put(this.unit.pool, this.unit.start, n),
        (this.x = s),
        (this.y = c),
        (this.z = l));
    }
  };
function bb() {
  let e = 1 / 0,
    t = -1 / 0;
  for (let n of Rf)
    n.id.startsWith(`canyon-tower`) &&
      n.kind === `box` &&
      ((e = Math.min(e, n.centre[0] - n.halfLength)),
      (t = Math.max(t, n.centre[0] + n.halfLength)));
  let n = (e + t) / 2,
    r = (t - e) / 320;
  return [Math.PI / 2, -Math.PI / 2].map((e) => {
    let t = Math.cos(e),
      i = Math.sin(e);
    return {
      yaw: e,
      point: (e, a, o) => [
        n + e * t + o * r * i,
        Jd + a,
        -725 - e * i + o * r * t,
      ],
      out: Math.atan2(i, -t),
    };
  });
}
var xb = {
    x: 33,
    speed: 0.4,
    return: 0.8,
    step: 3.8,
    dwell: 9,
    slots: [
      { tower: 0, z: -91, roof: 340, band: [75, 170] },
      { tower: 0, z: 46, roof: 250, band: [140, 240] },
      { tower: 0, z: 80, roof: 160, band: [140, 175] },
      { tower: 0, z: -56, roof: 340, band: [90, 200] },
      { tower: 1, z: -91, roof: 340, band: [150, 260] },
      { tower: 1, z: 46, roof: 250, band: [95, 200] },
      { tower: 1, z: 140, roof: 160, band: [75, 170] },
      { tower: 1, z: -56, roof: 340, band: [140, 250] },
    ],
  },
  Sb = class extends dy {
    constructor(e, t, n, r) {
      (super(),
        (this.slot = e),
        (this.gondola = t),
        (this.cable = n),
        (this.phase = r),
        (this.units = [t, n]),
        (this.speed = xb.speed));
      let i = bb()[e.tower],
        [a, o] = e.band;
      ((this.base = i.point(xb.x, 0, e.z)),
        (this.heading = i.out),
        (this.roof = Jd + e.roof),
        (this.steps = Math.floor((o - a) / xb.step)),
        (this.top = o));
      let s = xb.step / xb.speed;
      this.period =
        this.steps * (xb.dwell + s) +
        xb.dwell +
        (this.steps * xb.step) / xb.return;
    }
    heightAt(e) {
      let t = xb.step / xb.speed,
        n = Qv(e + this.phase, this.period),
        r = xb.dwell + t;
      if (n < this.steps * r) {
        let e = Math.floor(n / r),
          i = n - e * r;
        return (
          this.top - xb.step * (e + (i < xb.dwell ? 0 : Xv((i - xb.dwell) / t)))
        );
      }
      n -= this.steps * r;
      let i = (this.steps * xb.step) / xb.return,
        a = this.top - this.steps * xb.step;
      return n < xb.dwell
        ? a
        : a + this.steps * xb.step * Xv((n - xb.dwell) / i);
    }
    write(e) {
      let { w: t, xf: n, xf2: r } = e,
        i = this.heightAt(e.t),
        [a, , o] = this.base;
      (n
        .yaw(this.heading)
        .at(a, i, o)
        .roll(0.004 * Math.sin(e.t * 0.7 + this.phase)),
        t.put(this.gondola.pool, this.gondola.start, n));
      let s = i + 4.2;
      (r.yaw(this.heading).at(a, s, o),
        t.put(
          this.cable.pool,
          this.cable.start,
          r,
          1,
          Math.max(0.01, this.roof - s),
          1,
        ),
        (this.x = a),
        (this.y = i),
        (this.z = o));
    }
  },
  Cb = { speed: 6, accel: 1, dwell: 8 },
  wb = class extends dy {
    constructor(e, t, n, r) {
      (super(),
        (this.shaft = t),
        (this.unit = n),
        (this.phase = r),
        (this.units = [n]),
        (this.speed = Cb.speed),
        (this.base = e.point(t.x, t.y[0], t.z)),
        (this.heading = e.out),
        (this.span = t.y[1] - t.y[0]),
        (this.run = ny(this.span, Cb.speed, Cb.accel)),
        (this.period = 2 * (this.run + Cb.dwell)));
    }
    write(e) {
      let { w: t, xf: n, motion: r } = e,
        i = Qv(e.t + this.phase, this.period),
        a,
        { dwell: o, speed: s, accel: c } = Cb;
      a =
        i < o
          ? 0
          : (i -= o) < this.run
            ? ry(this.span, s, c, i, r).s
            : (i -= this.run) < o
              ? this.span
              : this.span - ry(this.span, s, c, i - o, r).s;
      let [l, u, d] = this.base;
      (n.yaw(this.heading).at(l, u + a, d),
        t.put(this.unit.pool, this.unit.start, n),
        (this.x = l),
        (this.y = u + a),
        (this.z = d));
    }
  },
  Tb = { line: 4.5, station: 0.9, grip: -4.95, sag: 1.6, wheel: 4.2 };
function Eb() {
  let { a: e, b: t, tower: n, cable: r } = mh,
    i = t[0] - e[0],
    a = t[2] - e[2],
    o = Math.hypot(i, a),
    s = i / o,
    c = a / o,
    l = (e, t, n, r, i) => [
      e[0] + t * (c * n + s * r),
      i,
      e[2] + t * (-s * n + c * r),
    ],
    u = e[1] + r,
    d = Tb.wheel,
    f = [],
    p = (e, t) => {
      for (let n = 0; n <= 16; n++) {
        let r = Math.PI + (n / 16) * Math.PI;
        f.push({
          p: l(e, t, Math.cos(r) * d, -1 + Math.sin(r) * d, u),
          slow: !0,
        });
      }
    },
    m = (n[0] - e[0]) * s + (n[2] - e[2]) * c,
    h = (e, t, n, r, i) => {
      let a = Math.ceil(Math.abs(n - t) / 2);
      for (let s = 1; s < a; s++) {
        let c = t + ((n - t) * s) / a,
          d = r > 0 ? c : o - c,
          [p, h] = d < m ? [4, m] : [m, o - 4],
          g = Yv((d - p) / (h - p), 0, 1);
        f.push({ p: l(i, r, e, c, u - Tb.sag * 4 * g * (1 - g)), slow: !1 });
      }
    };
  (p(e, 1),
    f.push({ p: l(e, 1, d, 4, u), slow: !0 }),
    h(d, 4, o - 4, 1, e),
    f.push({ p: l(t, -1, -d, 4, u), slow: !0 }),
    p(t, -1),
    f.push({ p: l(t, -1, d, 4, u), slow: !0 }),
    h(-d, o - 4, 4, 1, e),
    f.push({ p: l(e, 1, -d, 4, u), slow: !0 }));
  let g = new ef(
      f.map((e) => e.p),
      !0,
    ),
    _ = f.filter((e) => e.slow).map((e) => g.nearestS(e.p[0], e.p[1], e.p[2])),
    v = (e) => {
      let t = 1 / 0;
      for (let n of _)
        t = Math.min(t, Math.abs(e - n), g.length - Math.abs(e - n));
      return Zv(Tb.station, Tb.line, Xv(t / 8));
    },
    y = 0.5,
    b = [0];
  for (let e = y; e <= g.length + 1e-9; e += y)
    b.push(b.at(-1) + y / v(e - y / 2));
  let x = b.at(-1),
    S = 0.05,
    C = new Float32Array(Math.ceil(x / S) + 1);
  for (let e = 0, t = 0; e < C.length; e++) {
    let n = e * S;
    for (; t < b.length - 2 && b[t + 1] < n;) t++;
    let r = Yv((n - b[t]) / (b[t + 1] - b[t]), 0, 1);
    C[e] = (t + r) * y;
  }
  return { path: g, period: x, sOfT: C, dt: S };
}
