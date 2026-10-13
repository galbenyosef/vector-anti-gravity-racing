// assets__game-CsnOSIff 68 — math
// Lines 29440-29782 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function tb(e, t) {
  let n = 22 - Ef.gear,
    r = e.length - n,
    i = eb.speed,
    a = eb.accel,
    o = (i * i) / (2 * a),
    s = (r - o) / i,
    c = s + i / a,
    l = t.length - n,
    u = i / a + (l - o) / i;
  return {
    drop: n,
    flareIn: r,
    brake: o,
    cruise: s,
    inbound: c,
    outbound: u,
    period: c + eb.descend + eb.idle + eb.lift + u + eb.away,
  };
}
var nb = class extends dy {
    constructor(e, t, n, r) {
      (super(),
        (this.inbound = e),
        (this.outbound = t),
        (this.unit = n),
        (this.phase = r),
        (this.units = [n]),
        (this.speed = eb.speed),
        (this.times = tb(e, t)));
      let i = iy();
      ((this.inYaw = e.heading(this.times.flareIn - 2, i)),
        (this.outYaw = t.heading(this.times.drop + 2, i)));
    }
    write(e) {
      let { w: t, xf: n, pose: r } = e,
        i = this.times,
        a = Qv(e.t + this.phase, i.period),
        o = eb.speed,
        s = eb.accel,
        c,
        l;
      if (a < i.inbound) {
        let e;
        if (a < i.cruise) ((e = o * a), (l = 0.2));
        else {
          let t = a - i.cruise,
            n = Math.max(0, o - s * t);
          ((e = i.flareIn - i.brake + o * t - 0.5 * s * t * t),
            (l =
              (n / o) * 0.2 -
              0.14 * Math.sin(Math.PI * Yv(t / (o / s), 0, 1))));
        }
        (this.inbound.at(Math.min(e, i.flareIn), r),
          (c = Math.atan2(r.tz, r.tx)));
      } else if ((a -= i.inbound) < eb.descend + eb.idle)
        (this.inbound.at(i.flareIn + i.drop * Xv(a / eb.descend), r),
          (c = this.inYaw),
          (l = -0.03 * (1 - Xv(a / eb.descend))));
      else if ((a -= eb.descend + eb.idle) < eb.lift)
        (this.outbound.at(i.drop * Xv(a / eb.lift), r),
          (c = $v(this.inYaw, this.outYaw, Xv(a / eb.lift))),
          (l = 0.02));
      else if ((a -= eb.lift) < i.outbound) {
        let e = Math.min(o, s * a),
          t =
            i.drop + (a < o / s ? 0.5 * s * a * a : i.brake + o * (a - o / s));
        (this.outbound.at(t, r),
          (c = Math.atan2(r.tz, r.tx)),
          (l = (e / o) * 0.21 + 0.05));
      } else {
        t.hide(this.unit.pool, this.unit.start);
        return;
      }
      (n
        .yaw(c)
        .at(r.px, r.py - Ef.gear, r.pz)
        .pitch(l),
        t.put(this.unit.pool, this.unit.start, n),
        (this.x = n.px),
        (this.y = n.py),
        (this.z = n.pz));
    }
  },
  rb = [
    {
      id: `straight`,
      from: Gv - 160,
      to: Gv + 380,
      lane: 21,
      height: 36,
      lead: 85,
    },
    { id: `sweep`, from: 2380, to: 2740, lane: -17, height: 26, lead: 78 },
    { id: `boulevard`, from: 3215, to: 3520, lane: 24, height: 34, lead: 82 },
    { id: `knot`, from: 4600, to: 4860, lane: -24, height: 30, lead: 80 },
  ],
  ib = 2.4,
  ab = { out: 10, up: 50, ahead: 60 },
  ob = { gap: 13, step: 4, ahead: 48, blur: 28 };
function sb(e) {
  let t = [...up().lines.values()].filter(
      (e) =>
        e.kind === `monorail` || e.kind === `maglev` || e.kind === `expressway`,
    ),
    { gap: n, step: r, ahead: i, blur: a } = ob,
    o = e.from + e.lead - i - a,
    s = e.to + e.lead + ab.ahead + i + a,
    c = Math.ceil((s - o) / r) + 1,
    l = new Float32Array(c),
    u = { x: 0, y: 0, z: 0 };
  for (let i = 0; i < c; i++) {
    let a = Wv.frame(o + i * r),
      s = a.position.x + a.right.x * e.lane,
      c = a.position.y + a.right.y * e.lane + e.height,
      d = a.position.z + a.right.z * e.lane;
    for (let e of t) {
      let t = e.path.nearestS(s, c, d, !0);
      e.path.pointAt(t, u);
      let r = Math.hypot(u.x - s, u.z - d);
      r >= n ||
        u.y - c > 6 ||
        (l[i] = Math.max(l[i], u.y + Math.sqrt(n * n - r * r) - c));
    }
  }
  let d = Math.round(i / r),
    f = Math.round(a / r),
    p = l.map((e, t) => {
      let n = 0;
      for (let e = Math.max(0, t - d); e <= Math.min(c - 1, t + d); e++)
        n = Math.max(n, l[e]);
      return n;
    });
  return {
    u0: o,
    step: r,
    lift: p.map((e, t) => {
      let n = 0,
        r = 0;
      for (let e = t - f; e <= t + f; e++) ((n += p[Yv(e, 0, c - 1)]), r++);
      return Math.max(n / r, l[t]);
    }),
  };
}
var cb = class extends dy {
    constructor(e, t) {
      (super(),
        (this.spec = e),
        (this.unit = t),
        (this.px = NaN),
        (this.py = 0),
        (this.pz = 0),
        (this.vx = 0),
        (this.vy = 0),
        (this.vz = 0),
        (this.tx = 0),
        (this.ty = 0),
        (this.tz = 0),
        (this.tracking = !1),
        (this.away = 1 / 0),
        (this.active = !1),
        (this.q = [0, 0, 0, 0, 0, 0, 0]),
        (this.units = [t]),
        (this.fast = !0),
        (this.profile = sb(e)));
    }
    liftAt(e) {
      let { u0: t, step: n, lift: r } = this.profile;
      e < t && (e += Gv);
      let i = (e - t) / n,
        a = Math.floor(i);
      return a < 0 || a >= r.length - 1
        ? 0
        : r[a] + (r[a + 1] - r[a]) * (i - a);
    }
    reset() {
      ((this.px = NaN),
        (this.away = 1 / 0),
        (this.active = !1),
        (this.tracking = !1));
    }
    inside(e) {
      let { from: t, to: n } = this.spec;
      return (e >= t && e <= n) || (e + Gv >= t && e + Gv <= n);
    }
    target(e) {
      let t = e + this.spec.lead,
        n = Wv.frame(t),
        r = this.q;
      return (
        (r[0] = n.position.x + n.right.x * this.spec.lane),
        (r[1] =
          n.position.y +
          n.right.y * this.spec.lane +
          this.spec.height +
          this.liftAt(t)),
        (r[2] = n.position.z + n.right.z * this.spec.lane),
        (r[3] = n.right.x),
        (r[4] = n.right.z),
        (r[5] = n.tangent.x),
        (r[6] = n.tangent.z),
        r
      );
    }
    step(e) {
      let t = e.dt;
      if (t <= 0) return;
      let n = Qv(e.player.d, Gv),
        r = Math.sign(this.spec.lane);
      if (this.inside(n)) {
        let e = this.target(n);
        if (!this.active) {
          let t = Number.isNaN(this.px) || !Number.isFinite(this.away);
          if (((this.active = !0), (this.away = 0), t)) {
            let t = n + this.spec.lead;
            ((this.px = e[0] + e[5] * ab.ahead),
              (this.py = e[1] - this.liftAt(t) + this.liftAt(t + ab.ahead)),
              (this.pz = e[2] + e[6] * ab.ahead),
              (this.vx = this.vy = this.vz = 0));
          }
          this.tracking = !1;
        }
        let r = 0,
          i = 0,
          a = 0;
        if (this.tracking) {
          ((r = (e[0] - this.tx) / t),
            (i = (e[1] - this.ty) / t),
            (a = (e[2] - this.tz) / t));
          let n = Math.hypot(r, i, a);
          n > 260 && ((r *= 260 / n), (i *= 260 / n), (a *= 260 / n));
        }
        ((this.tx = e[0]),
          (this.ty = e[1]),
          (this.tz = e[2]),
          (this.tracking = !0),
          this.spring(t, e[0], e[1], e[2], r, i, a));
      } else if (Number.isFinite(this.away)) {
        if (this.active) {
          ((this.active = !1), (this.away = 0));
          let e = Wv.frame(n);
          ((this.tx = this.px + e.right.x * r * ab.out),
            (this.ty = this.py + ab.up),
            (this.tz = this.pz + e.right.z * r * ab.out));
        }
        ((this.away += t),
          this.spring(t, this.tx, this.ty, this.tz, 0, 0, 0),
          this.away > 5 && (this.away = 1 / 0));
      }
    }
    spring(e, t, n, r, i, a, o) {
      let s = Math.max(1, Math.ceil(e * 120)),
        c = e / s,
        l = ib;
      for (let e = 0; e < s; e++)
        ((this.vx += (l * l * (t - this.px) + 2 * l * (i - this.vx)) * c),
          (this.vy += (l * l * (n - this.py) + 2 * l * (a - this.vy)) * c),
          (this.vz += (l * l * (r - this.pz) + 2 * l * (o - this.vz)) * c),
          (this.px += this.vx * c),
          (this.py += this.vy * c),
          (this.pz += this.vz * c));
    }
    get shown() {
      return !Number.isNaN(this.px) && Number.isFinite(this.away);
    }
    get position() {
      return this.shown ? [this.px, this.py, this.pz] : null;
    }
    write(e) {
      let { w: t, xf: n } = e;
      if (!this.shown) {
        t.hide(this.unit.pool, this.unit.start);
        return;
      }
      let r = Math.atan2(e.player.z - this.pz, e.player.x - this.px);
      (n
        .yaw(r)
        .at(this.px, this.py, this.pz)
        .pitch(Yv(Math.hypot(this.vx, this.vz) / 900, 0, 0.18)),
        t.put(this.unit.pool, this.unit.start, n),
        (this.x = this.px),
        (this.y = this.py),
        (this.z = this.pz));
    }
  },
  lb = [
    { x0: 292, x1: 348, z: 218.5, radius: 6 },
    { x0: 278, x1: 334, z: 272, radius: 6 },
  ],
  ub = { water: Jd - 1.6, speed: 7, accel: 0.6, dwell: 8, length: 9 };
function db(e) {
  let { x0: t, x1: n, z: r, radius: i } = e,
    a = ub.water,
    o = [],
    s = (e, t, n, s, c = !0) => {
      for (let l = 0; l <= (c ? s : s - 1); l++) {
        let c = t + ((n - t) * l) / s;
        o.push([e + Math.cos(c) * i, a, r + Math.sin(c) * i]);
      }
    };
  s(t, Math.PI, 1.5 * Math.PI, 6);
  for (let e = t + 2; e < n; e += 2) o.push([e, a, r - i]);
  s(n, 1.5 * Math.PI, 2.5 * Math.PI, 12);
  for (let e = n - 2; e > t; e -= 2) o.push([e, a, r + i]);
  return (s(t, 0.5 * Math.PI, Math.PI, 6, !1), o);
}
var fb = class extends dy {
  constructor(e, t, n, r) {
    (super(),
      (this.table = e),
      (this.unit = t),
      (this.phase = n),
      (this.seed = r),
      (this.units = [t]),
      (this.speed = ub.speed),
      (this.run = ny(e.length, ub.speed, ub.accel)),
      (this.period = ub.dwell + this.run));
  }
  write(e) {
    let { w: t, xf: n, pose: r, motion: i } = e,
      a = Qv(e.t + this.phase, this.period);
    (a < ub.dwell
      ? ((i.v = 0), (i.a = 0), (i.s = 0))
      : ry(this.table.length, ub.speed, ub.accel, a - ub.dwell, i),
      this.table.at(i.s, r));
    let o = i.v / ub.speed;
    (n
      .yaw(Math.atan2(r.tz, r.tx))
      .at(r.px, ub.water + 0.08 * Math.sin(e.t * 1.6 + this.seed), r.pz)
      .pitch(
        -0.035 * o -
          0.02 * (i.a / ub.accel) +
          0.012 * Math.sin(e.t * 1.1 + this.seed),
      )
      .roll(
        0.03 * o * Math.sign(r.bank) + 0.015 * Math.sin(e.t * 0.9 + this.seed),
      ),
      t.put(this.unit.pool, this.unit.start, n),
      (this.x = n.px),
      (this.y = n.py),
      (this.z = n.pz));
  }
};
