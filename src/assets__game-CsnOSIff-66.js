// assets__game-CsnOSIff 66 — math
// Lines 28650-28945 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function py(e) {
  let t = fy.get(`rail:${e}`);
  return (t || fy.set(`rail:${e}`, (t = oy.rail(up().lines.get(e)))), t);
}
function my(e, t = 2, n = 0.6) {
  let r = `flight:${e}:${t}:${n}`,
    i = fy.get(r);
  if (!i) {
    let a = up().lines.get(e);
    fy.set(r, (i = oy.flight(a.path, t, a.speed, n)));
  }
  return i;
}
var hy = { lead: 18, mid: 15, tail: 18, wagon: 14.5, gap: 1 },
  gy = { crown: 0, marina: 1, freight: 2, aurelian: 3 },
  _y = class extends dy {
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
        (e.unit.pool.asset.includes(`wagon`) ? hy.wagon : hy.tail) / 2
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
function vy(e, t, n, r, i, a) {
  let o = n + ny(e, r, i),
    s = { s: 0, v: 0, a: 0 };
  return {
    period: o,
    fn: (c, l) => {
      let u = Qv(c + a, o);
      return (
        (l.dir = 1),
        (l.head = u < n ? t : t + ry(e, r, i, u - n, s).s),
        l
      );
    },
  };
}
function yy(e, t, n, r, i, a, o, s) {
  let c = t - e - n,
    l = ny(c, a, o),
    u = r + l + i + l,
    d = { s: 0, v: 0, a: 0 };
  return {
    period: u,
    fn: (f, p) => {
      let m = Qv(f + s, u);
      return m < r
        ? ((p.dir = m < r / 2 ? -1 : 1), (p.head = p.dir < 0 ? e : e + n), p)
        : ((m -= r),
          m < l
            ? ((p.dir = 1), (p.head = e + n + ry(c, a, o, m, d).s), p)
            : ((m -= l),
              m < i
                ? ((p.dir = m < i / 2 ? 1 : -1),
                  (p.head = p.dir > 0 ? t : t - n),
                  p)
                : ((m -= i),
                  (p.dir = -1),
                  (p.head = t - n - ry(c, a, o, m, d).s),
                  p)));
    },
  };
}
function by(e, t, n, r) {
  let i = [],
    a = 0,
    o = (t, n) => {
      let o = e.take(`transit`, t, 1, `train`);
      (e.paint(o, r),
        i.push({ unit: o, offset: a + n / 2 }),
        (a += n + hy.gap));
    };
  o(t.lead, hy.lead);
  for (let e = 0; e < n; e++) o(t.mid, hy.mid);
  return (o(t.tail, hy.tail), i);
}
var xy = 400,
  Sy = class extends dy {
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
      let r = Qv(t, Gv),
        i = xp.trigger * Gv;
      (Math.abs(r - i) > xy && (this.armed = !0),
        !(!this.armed || this.active || !Ep(e, t)) &&
          ((this.armed = !1), (this.state = wp(r, n)), this.spawned++));
    }
    step(e) {
      this.state &&
        !this.state.done &&
        e.dt > 0 &&
        (this.state = Tp(this.state, e.dt));
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
  Cy = { speed: 280, streak: 0.075, streakWidth: 2.4, podLength: 14 },
  wy = class extends dy {
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
        (t - this.starts[e]) * Cy.speed > this.table.length &&
          (this.starts[e] = NaN);
      let n = Math.floor(t / this.period);
      n > this.lastPeriodic &&
        ((this.lastPeriodic = n), this.spawn(n * this.period));
      let r = _f - Qv(e.player.d, Gv);
      r > 0 && r < 900 && e.player.speed > 30
        ? this.heroArmed &&
          r / e.player.speed <= this.sEye / Cy.speed &&
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
        let d = (a - c) * Cy.speed;
        (this.table.at(d, n),
          r.rail(n, 1),
          t.put(this.pods.pool, l, r),
          (o &&= ((this.x = r.px), (this.y = r.py), (this.z = r.pz), !1)),
          i.copy(r).local(0, -1.05, -Cy.podLength / 2));
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
        let b = Yv(d / 40, 0, 1);
        t.put(
          this.streaks.pool,
          u,
          i,
          Cy.streakWidth,
          1,
          Cy.speed * Cy.streak * b,
        );
      }
    }
  },
  Ty = (yf.heading + 180) * qv,
  Ey = [72, 46, 20, -6, -32, -58],
  Dy = [86, -72],
  Oy = { cut: 50, staging: 28 },
  ky = -41,
  Ay = -34.9,
  jy = { y: 114, out: 5.5 };
function My(e, t = { x: 0, y: 0, z: 0, heading: 0 }) {
  return (
    (t.x = yf.centre[0]),
    (t.y = yf.centre[1] + 0.4 * Math.sin(Kv * 0.05 * e)),
    (t.z = yf.centre[2]),
    (t.heading = Ty + 3 * qv * Math.sin((Kv * e) / 160 + 0.7)),
    t
  );
}
function Ny(e, t, n) {
  return [
    e.x + Math.cos(e.heading) * t,
    e.y + n,
    e.z + Math.sin(e.heading) * t,
  ];
}
function Py() {
  let e = Math.cos(yf.heading * qv),
    t = Math.sin(yf.heading * qv),
    n = My(0);
  return [-1, 1].map((r) => {
    let i = yf.centre[0] + e * r * 110 + t * 70,
      a = yf.centre[2] + t * r * 110 - e * 70,
      o = r * Math.cos(Ty - yf.heading * qv) > 0 ? Dy[0] : Dy[1],
      s = Ny(n, o, ky),
      c = Math.atan2(s[2] - a, s[0] - i);
    return {
      id: r < 0 ? `west` : `east`,
      position: [i, Jd, a],
      yaw: c,
      head: [i + Math.cos(c) * jy.out, Jd + jy.y, a + Math.sin(c) * jy.out],
      along: o,
    };
  });
}
