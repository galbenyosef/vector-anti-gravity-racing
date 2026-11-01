// assets__game-D43Oxqny 66 — math
// Lines 28788-29083 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Ty(e) {
  let t = wy.get(`rail:${e}`);
  return (t || wy.set(`rail:${e}`, (t = vy.rail(dp().lines.get(e)))), t);
}
function Ey(e, t = 2, n = 0.6) {
  let r = `flight:${e}:${t}:${n}`,
    i = wy.get(r);
  if (!i) {
    let a = dp().lines.get(e);
    wy.set(r, (i = vy.flight(a.path, t, a.speed, n)));
  }
  return i;
}
var Dy = { lead: 18, mid: 15, tail: 18, wagon: 14.5, gap: 1 },
  Oy = { crown: 0, marina: 1, freight: 2, aurelian: 3 },
  ky = class extends Cy {
    constructor(e, t, n, r, i, a) {
      (super(),
        (this.name = e),
        (this.line = t),
        (this.table = n),
        (this.cars = r),
        (this.schedule = i),
        (this.state = { head: 0, dir: 1 }),
        (this.last = { head: 0, dir: 1 }),
        (this.units = r.flatMap((e) => [
          e.unit,
          ...(e.cargo ?? []).map((e) => e.unit),
        ])),
        (this.speed = a));
    }
    get length() {
      let e = this.cars.at(-1);
      return (
        e.offset +
        (e.unit.pool.asset.includes(`wagon`) ? Dy.wagon : Dy.tail) / 2
      );
    }
    write(e) {
      let t = this.schedule(e.t, this.state);
      ((this.last.head = t.head), (this.last.dir = t.dir));
      let { w: n, pose: r, xf: i, xf2: a } = e;
      for (let e = 0; e < this.cars.length; e++) {
        let o = this.cars[e];
        if (
          (this.table.at(t.head - t.dir * o.offset, r),
          i.rail(r, t.dir),
          n.put(o.unit.pool, o.unit.start, i),
          e === 0 && ((this.x = i.px), (this.y = i.py), (this.z = i.pz)),
          o.cargo)
        )
          for (let e of o.cargo)
            (a.copy(i).local(0, 1.15, e.z),
              n.put(e.unit.pool, e.unit.start, a));
      }
    }
  };
function Ay(e, t, n, r, i, a) {
  let o = n + my(e, r, i),
    s = { s: 0, v: 0, a: 0 };
  return {
    period: o,
    fn: (c, l) => {
      let u = uy(c + a, o);
      return (
        (l.dir = 1),
        (l.head = u < n ? t : t + hy(e, r, i, u - n, s).s),
        l
      );
    },
  };
}
function jy(e, t, n, r, i, a, o, s) {
  let c = t - e - n,
    l = my(c, a, o),
    u = r + l + i + l,
    d = { s: 0, v: 0, a: 0 };
  return {
    period: u,
    fn: (f, p) => {
      let m = uy(f + s, u);
      return m < r
        ? ((p.dir = m < r / 2 ? -1 : 1), (p.head = p.dir < 0 ? e : e + n), p)
        : ((m -= r),
          m < l
            ? ((p.dir = 1), (p.head = e + n + hy(c, a, o, m, d).s), p)
            : ((m -= l),
              m < i
                ? ((p.dir = m < i / 2 ? 1 : -1),
                  (p.head = p.dir > 0 ? t : t - n),
                  p)
                : ((m -= i),
                  (p.dir = -1),
                  (p.head = t - n - hy(c, a, o, m, d).s),
                  p)));
    },
  };
}
function My(e, t, n, r) {
  let i = [],
    a = 0,
    o = (t, n) => {
      let o = e.take(`transit`, t, 1, `train`);
      (e.paint(o, r),
        i.push({ unit: o, offset: a + n / 2 }),
        (a += n + Dy.gap));
    };
  o(t.lead, Dy.lead);
  for (let e = 0; e < n; e++) o(t.mid, Dy.mid);
  return (o(t.tail, Dy.tail), i);
}
var Ny = 400,
  Py = class extends Cy {
    constructor(e, t) {
      (super(),
        (this.table = e),
        (this.cars = t),
        (this.state = null),
        (this.spawned = 0),
        (this.shown = !1),
        (this.armed = !0),
        (this.units = t.map((e) => e.unit)),
        (this.fast = !0));
    }
    trigger(e, t, n) {
      let r = uy(t, ry),
        i = Sp.trigger * ry;
      (Math.abs(r - i) > Ny && (this.armed = !0),
        !(!this.armed || this.active || !Dp(e, t)) &&
          ((this.armed = !1), (this.state = Tp(r, n)), this.spawned++));
    }
    step(e) {
      this.state &&
        !this.state.done &&
        e.dt > 0 &&
        (this.state = Ep(this.state, e.dt));
    }
    reset() {
      ((this.state = null), (this.armed = !0));
    }
    get active() {
      return !!this.state && !this.state.done;
    }
    write(e) {
      let { w: t, pose: n, xf: r } = e;
      if (!this.active) {
        if (this.shown)
          for (let e of this.cars) t.hide(e.unit.pool, e.unit.start);
        this.shown = !1;
        return;
      }
      this.shown = !0;
      let i = this.state.s;
      for (let e = 0; e < this.cars.length; e++) {
        let a = this.cars[e];
        (this.table.at(i - a.offset, n),
          r.rail(n, 1),
          t.put(a.unit.pool, a.unit.start, r),
          e === 0 && ((this.x = r.px), (this.y = r.py), (this.z = r.pz)));
      }
    }
  },
  Fy = { speed: 280, streak: 0.075, streakWidth: 2.4, podLength: 14 },
  Iy = class extends Cy {
    constructor(e, t, n, r, i) {
      (super(),
        (this.table = e),
        (this.pods = t),
        (this.streaks = n),
        (this.period = r),
        (this.sEye = i),
        (this.lastPeriodic = -1 / 0),
        (this.heroArmed = !0),
        (this.heroes = 0),
        (this.units = [t, n]),
        (this.starts = new Float64Array(t.count).fill(NaN)),
        (this.fast = !0));
    }
    spawn(e) {
      for (let t of this.starts) if (Math.abs(t - e) < 1.6) return !1;
      for (let t = 0; t < this.starts.length; t++)
        if (Number.isNaN(this.starts[t])) return ((this.starts[t] = e), !0);
      return !1;
    }
    get count() {
      let e = 0;
      for (let t of this.starts) Number.isNaN(t) || e++;
      return e;
    }
    reset() {
      this.heroArmed = !0;
    }
    step(e) {
      let t = e.t;
      for (let e = 0; e < this.starts.length; e++)
        (t - this.starts[e]) * Fy.speed > this.table.length &&
          (this.starts[e] = NaN);
      let n = Math.floor(t / this.period);
      n > this.lastPeriodic &&
        ((this.lastPeriodic = n), this.spawn(n * this.period));
      let r = vf - uy(e.player.d, ry);
      r > 0 && r < 900 && e.player.speed > 30
        ? this.heroArmed &&
          r / e.player.speed <= this.sEye / Fy.speed &&
          ((this.heroArmed = !1), this.spawn(t) && this.heroes++)
        : (this.heroArmed = !0);
    }
    write(e) {
      let { w: t, pose: n, xf: r, xf2: i, t: a } = e,
        o = !0;
      for (let s = 0; s < this.starts.length; s++) {
        let c = this.starts[s],
          l = this.pods.start + s,
          u = this.streaks.start + s;
        if (Number.isNaN(c)) {
          (t.hide(this.pods.pool, l), t.hide(this.streaks.pool, u));
          continue;
        }
        let d = (a - c) * Fy.speed;
        (this.table.at(d, n),
          r.rail(n, 1),
          t.put(this.pods.pool, l, r),
          (o &&= ((this.x = r.px), (this.y = r.py), (this.z = r.pz), !1)),
          i.copy(r).local(0, -1.05, -Fy.podLength / 2));
        let f = e.player.x - i.px,
          p = e.player.y + 4 - i.py,
          m = e.player.z - i.pz,
          h = f * i.fx + p * i.fy + m * i.fz,
          g = f - i.fx * h,
          _ = p - i.fy * h,
          v = m - i.fz * h,
          y = Math.hypot(g, _, v);
        y > 0.001 &&
          ((g /= y),
          (_ /= y),
          (v /= y),
          (i.ux = g),
          (i.uy = _),
          (i.uz = v),
          (i.rx = _ * i.fz - v * i.fy),
          (i.ry = v * i.fx - g * i.fz),
          (i.rz = g * i.fy - _ * i.fx));
        let b = sy(d / 40, 0, 1);
        t.put(
          this.streaks.pool,
          u,
          i,
          Fy.streakWidth,
          1,
          Fy.speed * Fy.streak * b,
        );
      }
    }
  },
  Ly = (bf.heading + 180) * ay,
  Ry = [72, 46, 20, -6, -32, -58],
  zy = [86, -72],
  By = { cut: 50, staging: 28 },
  Vy = -41,
  Hy = -34.9,
  Uy = { y: 114, out: 5.5 };
function Wy(e, t = { x: 0, y: 0, z: 0, heading: 0 }) {
  return (
    (t.x = bf.centre[0]),
    (t.y = bf.centre[1] + 0.4 * Math.sin(iy * 0.05 * e)),
    (t.z = bf.centre[2]),
    (t.heading = Ly + 3 * ay * Math.sin((iy * e) / 160 + 0.7)),
    t
  );
}
function Gy(e, t, n) {
  return [
    e.x + Math.cos(e.heading) * t,
    e.y + n,
    e.z + Math.sin(e.heading) * t,
  ];
}
function Ky() {
  let e = Math.cos(bf.heading * ay),
    t = Math.sin(bf.heading * ay),
    n = Wy(0);
  return [-1, 1].map((r) => {
    let i = bf.centre[0] + e * r * 110 + t * 70,
      a = bf.centre[2] + t * r * 110 - e * 70,
      o = r * Math.cos(Ly - bf.heading * ay) > 0 ? zy[0] : zy[1],
      s = Gy(n, o, Vy),
      c = Math.atan2(s[2] - a, s[0] - i);
    return {
      id: r < 0 ? `west` : `east`,
      position: [i, Yd, a],
      yaw: c,
      head: [i + Math.cos(c) * Uy.out, Yd + Uy.y, a + Math.sin(c) * Uy.out],
      along: o,
    };
  });
}
