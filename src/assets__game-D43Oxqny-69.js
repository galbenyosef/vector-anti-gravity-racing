// assets__game-D43Oxqny 69 — math
// Lines 29921-30212 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Tb() {
  let e = ny.frame(Ke[0].from * ry),
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
var Eb = (e) => Math.PI / 2 - e,
  Db = class extends Cy {
    constructor(e, t) {
      (super(),
        (this.unit = e),
        (this.list = t),
        (this.frame = Tb()),
        (this.units = [e]),
        (this.speed = 0.3));
      let n = this.frame.point(t[0].p);
      ((this.x = n[0]), (this.y = n[1]), (this.z = n[2]));
    }
    write(e) {
      let { w: t, xf: n } = e;
      this.list.forEach((r, i) => {
        let [a, o, s] = this.frame.point(r.p),
          c = this.frame.yaw + (r.yaw + (r.spin ?? 0) * e.t) * ay;
        (n.yaw(Eb(c)).at(a, o, s),
          t.put(this.unit.pool, this.unit.start + i, n));
      });
    }
  },
  Ob = { accel: 0.8, dwell: 5 },
  kb = 29,
  Ab = 1.64,
  jb = class extends Cy {
    constructor(e, t) {
      (super(),
        (this.unit = e),
        (this.lift = t),
        (this.frame = Tb()),
        (this.units = [e]),
        (this.speed = t.speed ?? 2.5));
      let [n, r] = t.travel ?? [t.p[1], t.p[1]];
      ((this.span = r - n),
        (this.run = my(Math.max(this.span, 0.01), this.speed, Ob.accel)),
        (this.period = 2 * (this.run + Ob.dwell)));
      let i = t.p[2],
        a =
          Math.abs(Math.cos(t.yaw * ay)) > 0.5 && Math.cos(t.yaw * ay) < 0
            ? 2.45
            : 1.82;
      this.lz = i > 0 ? Math.min(i, kb - Ab - a - 0.3) : i;
    }
    write(e) {
      let { w: t, xf: n, motion: r } = e,
        [i] = this.lift.travel ?? [this.lift.p[1]],
        a = uy(e.t + (this.lift.phase ?? 0), this.period),
        o;
      o =
        a < Ob.dwell
          ? 0
          : (a -= Ob.dwell) < this.run
            ? hy(this.span, this.speed, Ob.accel, a, r).s
            : (a -= this.run) < Ob.dwell
              ? this.span
              : this.span -
                hy(this.span, this.speed, Ob.accel, a - Ob.dwell, r).s;
      let [s, c, l] = this.frame.point([this.lift.p[0], i + o, this.lz]);
      (n.yaw(Eb(this.frame.yaw + this.lift.yaw * ay)).at(s, c, l),
        t.put(this.unit.pool, this.unit.start, n),
        (this.x = s),
        (this.y = c),
        (this.z = l));
    }
  };
function Mb() {
  let e = 1 / 0,
    t = -1 / 0;
  for (let n of zf)
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
        Yd + a,
        -725 - e * i + o * r * t,
      ],
      out: Math.atan2(i, -t),
    };
  });
}
var Nb = {
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
  Pb = class extends Cy {
    constructor(e, t, n, r) {
      (super(),
        (this.slot = e),
        (this.gondola = t),
        (this.cable = n),
        (this.phase = r),
        (this.units = [t, n]),
        (this.speed = Nb.speed));
      let i = Mb()[e.tower],
        [a, o] = e.band;
      ((this.base = i.point(Nb.x, 0, e.z)),
        (this.heading = i.out),
        (this.roof = Yd + e.roof),
        (this.steps = Math.floor((o - a) / Nb.step)),
        (this.top = o));
      let s = Nb.step / Nb.speed;
      this.period =
        this.steps * (Nb.dwell + s) +
        Nb.dwell +
        (this.steps * Nb.step) / Nb.return;
    }
    heightAt(e) {
      let t = Nb.step / Nb.speed,
        n = uy(e + this.phase, this.period),
        r = Nb.dwell + t;
      if (n < this.steps * r) {
        let e = Math.floor(n / r),
          i = n - e * r;
        return (
          this.top - Nb.step * (e + (i < Nb.dwell ? 0 : cy((i - Nb.dwell) / t)))
        );
      }
      n -= this.steps * r;
      let i = (this.steps * Nb.step) / Nb.return,
        a = this.top - this.steps * Nb.step;
      return n < Nb.dwell
        ? a
        : a + this.steps * Nb.step * cy((n - Nb.dwell) / i);
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
  Fb = { speed: 6, accel: 1, dwell: 8 },
  Ib = class extends Cy {
    constructor(e, t, n, r) {
      (super(),
        (this.shaft = t),
        (this.unit = n),
        (this.phase = r),
        (this.units = [n]),
        (this.speed = Fb.speed),
        (this.base = e.point(t.x, t.y[0], t.z)),
        (this.heading = e.out),
        (this.span = t.y[1] - t.y[0]),
        (this.run = my(this.span, Fb.speed, Fb.accel)),
        (this.period = 2 * (this.run + Fb.dwell)));
    }
    write(e) {
      let { w: t, xf: n, motion: r } = e,
        i = uy(e.t + this.phase, this.period),
        a,
        { dwell: o, speed: s, accel: c } = Fb;
      a =
        i < o
          ? 0
          : (i -= o) < this.run
            ? hy(this.span, s, c, i, r).s
            : (i -= this.run) < o
              ? this.span
              : this.span - hy(this.span, s, c, i - o, r).s;
      let [l, u, d] = this.base;
      (n.yaw(this.heading).at(l, u + a, d),
        t.put(this.unit.pool, this.unit.start, n),
        (this.x = l),
        (this.y = u + a),
        (this.z = d));
    }
  },
  Lb = { line: 4.5, station: 0.9, grip: -4.95, sag: 1.6, wheel: 4.2 };
function Rb() {
  let { a: e, b: t, tower: n, cable: r } = hh,
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
    d = Lb.wheel,
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
          g = sy((d - p) / (h - p), 0, 1);
        f.push({ p: l(i, r, e, c, u - Lb.sag * 4 * g * (1 - g)), slow: !1 });
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
  let g = new tf(
      f.map((e) => e.p),
      !0,
    ),
    _ = f.filter((e) => e.slow).map((e) => g.nearestS(e.p[0], e.p[1], e.p[2])),
    v = (e) => {
      let t = 1 / 0;
      for (let n of _)
        t = Math.min(t, Math.abs(e - n), g.length - Math.abs(e - n));
      return ly(Lb.station, Lb.line, cy(t / 8));
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
    let r = sy((n - b[t]) / (b[t + 1] - b[t]), 0, 1);
    C[e] = (t + r) * y;
  }
  return { path: g, period: x, sOfT: C, dt: S };
}
