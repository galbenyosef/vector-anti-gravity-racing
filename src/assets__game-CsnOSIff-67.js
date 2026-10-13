// assets__game-CsnOSIff 67 — math
// Lines 28946-29439 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Fy = class extends dy {
    constructor(e, t) {
      (super(),
        (this.ship = e),
        (this.tethers = t),
        (this.p = { x: 0, y: 0, z: 0, heading: 0 }),
        (this.masts = Py()),
        (this.units = [e, t]),
        (this.speed = 0.3));
    }
    write(e) {
      let { w: t, xf: n } = e,
        r = My(e.t, this.p);
      (n.yaw(r.heading).at(r.x, r.y, r.z),
        t.put(this.ship.pool, this.ship.start, n),
        (this.x = r.x),
        (this.y = r.y),
        (this.z = r.z),
        this.masts.forEach((e, i) => {
          let [a, o, s] = Ny(r, e.along, ky),
            [c, l, u] = e.head,
            d = a - c,
            f = o - l,
            p = s - u,
            m = Math.hypot(d, f, p);
          ((d /= m), (f /= m), (p /= m));
          let h = p,
            g = -d,
            _ = Math.hypot(h, g) || 1;
          ((h /= _),
            (g /= _),
            n.at(c, l, u),
            (n.fx = d),
            (n.fy = f),
            (n.fz = p),
            (n.rx = h),
            (n.ry = 0),
            (n.rz = g),
            (n.ux = f * g),
            (n.uy = p * h - d * g),
            (n.uz = -f * h),
            t.put(this.tethers.pool, this.tethers.start + i, n, 1, 1, m));
        }));
    }
  },
  Iy = { height: 2.9, length: 12.19, half: 6.1 },
  Ly = { speed: 22, accel: 3, half: 6.83, height: 4.61 },
  Ry = {
    rack: { time: 14.5, swap: 6.5 },
    bay: { time: 17, swap: 8.5 },
    drop: { time: 12, swap: 5.5 },
  },
  zy = 8,
  By = 12,
  Vy = { close: 4.7, slide: 14.7 },
  Hy = class extends dy {
    constructor(e, t, n, r, i, a, o, s) {
      (super(),
        (this.id = e),
        (this.table = t),
        (this.a = n),
        (this.b = r),
        (this.drone = i),
        (this.container = a),
        (this.phase = o),
        (this.seed = s),
        (this.lev = { x: 0, y: 0, z: 0, heading: 0 }),
        (this.box = { shown: !1, x: 0, y: 0, z: 0 }),
        (this.units = [i, a]),
        (this.run = ny(t.length, Ly.speed, Ly.accel)),
        (this.period = Ry[n.kind].time + this.run + Ry[r.kind].time + this.run),
        (this.speed = Ly.speed));
    }
    write(e) {
      let { w: t, xf: n, xf2: r, pose: i, motion: a } = e,
        o = e.t + this.phase,
        s = Math.floor(o / this.period),
        c = Qv(o, this.period),
        l = 0,
        u = 0,
        d = 0,
        f = 0,
        p = !0,
        m = 0,
        h = 0,
        g = (t, r) => {
          let [i, a, o] = t.hover,
            s = i,
            c = a,
            m = o,
            h;
          if (t.kind === `rack`) {
            let e = Math.atan2(-t.nz, -t.nx),
              n = Vy.close * (r < 4 ? Xv((r - 2) / 2) : 1 - Xv((r - 10.5) / 2));
            ((h =
              r < 2
                ? $v(t.inYaw, e, Xv(r / 2))
                : r < 12.5
                  ? e
                  : $v(e, t.outYaw, Xv((r - 12.5) / 2))),
              (s -= t.nx * n),
              (m -= t.nz * n),
              r >= 4 &&
                r < 10.5 &&
                ((u =
                  r < 6.5
                    ? Vy.slide * Xv((r - 4) / 2.5)
                    : r < 8
                      ? Vy.slide
                      : Vy.slide * (1 - Xv((r - 8) / 2.5))),
                (d = -t.nx),
                (f = -t.nz),
                (p = r < 6.5 || r >= 8)));
          } else if (t.kind === `bay`) {
            let n = My(e.t, this.lev),
              [l, u, d] = Ny(n, t.along, Ay),
              f = n.heading,
              p =
                Math.abs(Qv(f - t.inYaw + Math.PI, Kv) - Math.PI) < Math.PI / 2
                  ? f
                  : f + Math.PI,
              g = r < 4 ? Xv(r / 4) : r < 13 ? 1 : 1 - Xv((r - 13) / 4);
            ((s = Zv(i, l, g)),
              (m = Zv(o, d, g)),
              (c = Zv(
                a,
                u,
                r < 4
                  ? 0
                  : r < 7
                    ? Xv((r - 4) / 3)
                    : r < 10
                      ? 1
                      : r < 13
                        ? 1 - Xv((r - 10) / 3)
                        : 0,
              )),
              (h =
                r < 4
                  ? $v(t.inYaw, p, Xv(r / 4))
                  : r < 13
                    ? p
                    : $v(p, t.outYaw, Xv((r - 13) / 4))));
          } else
            ((h = $v(t.inYaw, t.outYaw, Xv(r / 2.5))),
              (l =
                r < 2.5
                  ? 0
                  : r < 5.5
                    ? t.drop * Xv((r - 2.5) / 3)
                    : r < 7
                      ? t.drop
                      : t.drop * (1 - Xv((r - 7) / 3))),
              (p = r < 5.5 || r >= 7),
              (c += 0.15 * Math.sin(e.t * 1.7 + this.seed)));
          return (n.yaw(h).at(s, c, m), +(r >= Ry[t.kind].swap));
        },
        _ = Ry[this.a.kind].time,
        v = Ry[this.b.kind].time;
      if (
        (c < _
          ? (h = g(this.a, c))
          : (c -= _) < this.run
            ? (ry(this.table.length, Ly.speed, Ly.accel, c, a),
              this.table.at(a.s, i),
              (m = a.a),
              n
                .yaw(Math.atan2(i.tz, i.tx))
                .at(i.px, i.py, i.pz)
                .pitch(0.05 * (a.v / Ly.speed) + 0.06 * (a.a / Ly.accel)),
              (h = 1))
            : (c -= this.run) < v
              ? (h = 1 + g(this.b, c))
              : (ry(this.table.length, Ly.speed, Ly.accel, c - v, a),
                this.table.at(this.table.length - a.s, i),
                (m = a.a),
                n
                  .yaw(Math.atan2(-i.tz, -i.tx))
                  .at(i.px, i.py, i.pz)
                  .pitch(0.05 * (a.v / Ly.speed) + 0.06 * (a.a / Ly.accel)),
                (h = 2)),
        t.put(this.drone.pool, this.drone.start, n),
        (this.x = n.px),
        (this.y = n.py),
        (this.z = n.pz),
        this.container.pool.setLivery(
          this.container.start,
          Math.floor(ey(this.seed, s * 2 + h) * 8),
        ),
        !p)
      ) {
        (t.hide(this.container.pool, this.container.start),
          (this.box.shown = !1));
        return;
      }
      let y = -0.05 * (m / Ly.accel) + 0.012 * Math.sin(e.t * 1.3 + this.seed),
        b = 0.015 * Math.sin(e.t * 1.07 + this.seed * 2.1);
      (r.yaw(Math.atan2(n.fz, n.fx)).pitch(y).roll(b),
        r.at(n.px + d * u, n.py - l, n.pz + f * u),
        r.local(0, -Iy.height, 0),
        t.put(this.container.pool, this.container.start, r),
        (this.box.shown = !0),
        (this.box.x = r.px),
        (this.box.y = r.py),
        (this.box.z = r.pz));
    }
  },
  Uy = { speed: 12, lift: 19, pause: 2, climb: 4 },
  Wy = class e extends dy {
    static period(e) {
      return 2 * (e.length / Uy.speed + Uy.pause + Uy.climb);
    }
    constructor(e, t, n, r, i) {
      (super(),
        (this.table = e),
        (this.drone = t),
        (this.container = n),
        (this.phase = r),
        (this.seed = i),
        (this.units = [t, n]),
        (this.speed = Uy.speed));
    }
    write(t) {
      let { w: n, xf: r, xf2: i, pose: a } = t,
        o = this.table.length,
        s = o / Uy.speed,
        c = Uy.pause + Uy.climb,
        l = Qv(t.t + this.phase, e.period(this.table)),
        u = 0,
        d = 1,
        f = 0;
      (l < s
        ? (f = l * Uy.speed)
        : (l -= s) < c
          ? ((f = o), (u = Uy.lift * Xv((l - Uy.pause) / Uy.climb)))
          : (l -= c) < s
            ? ((f = o - l * Uy.speed), (u = Uy.lift), (d = -1))
            : ((d = -1),
              (u = Uy.lift * (1 - Xv((l - s - Uy.pause) / Uy.climb)))),
        this.table.at(f, a));
      let p = Math.atan2(a.tz * d, a.tx * d);
      (r
        .yaw(p)
        .at(a.px, a.py + u + Iy.height / 2, a.pz)
        .pitch(0.04),
        n.put(this.drone.pool, this.drone.start, r),
        (this.x = r.px),
        (this.y = r.py),
        (this.z = r.pz),
        i.yaw(p).roll(0.012 * Math.sin(t.t * 1.2 + this.seed)),
        i.at(r.px, r.py, r.pz).local(0, -Iy.height, 0),
        n.put(this.container.pool, this.container.start, i));
    }
  },
  Gy = { plane: 21.9, yMin: 8, yMax: 144, reach: 12.2, travel: 15, period: 26 },
  Ky = class extends dy {
    constructor(e, t, n, r, i, a, o, s) {
      (super(),
        (this.cx = e),
        (this.cz = t),
        (this.nx = n),
        (this.nz = r),
        (this.gantry = i),
        (this.container = a),
        (this.phase = o),
        (this.seed = s),
        (this.units = [i, a]),
        (this.speed = 4));
    }
    tier(e) {
      return Zv(Gy.yMin + 6, Gy.yMax - 6, ey(this.seed, e));
    }
    trolley(e) {
      return Gy.travel * (ey(this.seed, e, 3) - 0.5);
    }
    write(e) {
      let { w: t, xf: n, xf2: r } = e,
        i = e.t + this.phase,
        a = Math.floor(i / Gy.period),
        o = Qv(i, Gy.period),
        s = o < 11 ? 0 : Xv((o - 11) / 15),
        c = Zv(this.tier(a), this.tier(a + 1), s),
        l = Zv(this.trolley(a), this.trolley(a + 1), s),
        u =
          o < 3
            ? 0
            : o < 6
              ? Xv((o - 3) / 3)
              : o < 8
                ? 1
                : o < 11
                  ? 1 - Xv((o - 8) / 3)
                  : 0;
      if (
        (n
          .yaw(Math.atan2(this.nz, this.nx))
          .at(
            this.cx + this.nx * Gy.plane,
            Jd + c,
            this.cz + this.nz * Gy.plane,
          ),
        t.put(this.gantry.pool, this.gantry.start, n),
        (this.x = n.px),
        (this.y = n.py),
        (this.z = n.pz),
        o >= 5.8 && o < 8.2)
      ) {
        (t.hide(this.container.pool, this.container.start),
          this.container.pool.setLivery(
            this.container.start,
            Math.floor(ey(this.seed, a, 7) * 8),
          ));
        return;
      }
      (r.copy(n).local(l, 0, -Gy.reach * u),
        t.put(this.container.pool, this.container.start, r));
    }
  },
  qy = class extends dy {
    constructor(e, t, n, r, i, a, o, s, c) {
      (super(),
        (this.table = e),
        (this.unit = t),
        (this.s0 = r),
        (this.lane = i),
        (this.rise = a),
        (this.bob = o),
        (this.attitude = s),
        (this.seed = c),
        (this.units = [t]),
        (this.speed = n));
    }
    write(e) {
      let { w: t, xf: n, pose: r } = e;
      this.table.at(this.s0 + this.speed * e.t, r);
      let i = Math.hypot(r.tx, r.tz) || 1;
      (n.yaw(Math.atan2(r.tz, r.tx)),
        n.at(
          r.px + r.rx * this.lane,
          r.py + this.rise + this.bob * Math.sin(e.t * 0.9 + this.seed),
          r.pz + r.rz * this.lane,
        ),
        n.pitch(this.attitude - Math.atan2(r.ty, i)).roll(r.bank),
        t.put(this.unit.pool, this.unit.start, n),
        (this.x = n.px),
        (this.y = n.py),
        (this.z = n.pz));
    }
  },
  Jy = [
    [0, 0, 0],
    [-2.3, 0.6, -2.6],
    [2.2, -0.5, -2.9],
    [-1.1, -0.9, -5.6],
    [1.4, 0.8, -6.1],
  ],
  Yy = class extends dy {
    constructor(e, t, n, r, i, a, o) {
      (super(),
        (this.table = e),
        (this.unit = t),
        (this.s0 = r),
        (this.lane = i),
        (this.rise = a),
        (this.seed = o),
        (this.units = [t]),
        (this.speed = n));
    }
    write(e) {
      let { w: t, xf: n, xf2: r, pose: i } = e;
      (this.table.at(this.s0 + this.speed * e.t, i),
        n.yaw(Math.atan2(i.tz, i.tx)).roll(i.bank * 1.3),
        n.at(
          i.px + i.rx * this.lane,
          i.py + this.rise,
          i.pz + i.rz * this.lane,
        ),
        (this.x = n.px),
        (this.y = n.py),
        (this.z = n.pz));
      for (let i = 0; i < this.unit.count; i++) {
        let [a, o, s] = Jy[i % Jy.length],
          c = e.t * 1.9 + this.seed + i * 1.7;
        (r
          .copy(n)
          .local(
            a + 0.6 * Math.sin(c),
            o + 0.42 * Math.sin(c * 1.31),
            s + 0.6 * Math.sin(c * 0.77),
          )
          .pitch(0.18),
          t.put(this.unit.pool, this.unit.start + i, r));
      }
    }
  },
  Xy = class extends dy {
    constructor(e, t, n, r, i) {
      (super(),
        (this.centre = e),
        (this.radius = t),
        (this.phase = r),
        (this.unit = i),
        (this.units = [i]),
        (this.speed = n));
    }
    write(e) {
      let { w: t, xf: n } = e,
        r = this.phase + (e.t * this.speed) / this.radius,
        [i, a, o] = this.centre;
      (n
        .yaw(r + Math.PI / 2)
        .at(
          i + Math.cos(r) * this.radius,
          a + 1.5 * Math.sin(e.t * 0.5 + this.phase),
          o + Math.sin(r) * this.radius,
        )
        .pitch(0.08)
        .roll(0.12),
        t.put(this.unit.pool, this.unit.start, n),
        (this.x = n.px),
        (this.y = n.py),
        (this.z = n.pz));
    }
  },
  Zy = class extends dy {
    constructor(e, t, n, r, i, a) {
      (super(),
        (this.from = e),
        (this.to = t),
        (this.period = r),
        (this.phase = i),
        (this.unit = a),
        (this.units = [a]),
        (this.speed = n),
        (this.fast = !0));
    }
    write(e) {
      let { w: t, xf: n } = e,
        [r, i, a] = this.from,
        [o, s, c] = this.to,
        l = Math.hypot(o - r, s - i, c - a),
        u = Qv(e.t + this.phase, this.period) * this.speed;
      if (u > l) {
        t.hide(this.unit.pool, this.unit.start);
        return;
      }
      let d = u / l;
      (n
        .yaw(Math.atan2(c - a, o - r))
        .at(Zv(r, o, d), Zv(i, s, d), Zv(a, c, d)),
        t.put(this.unit.pool, this.unit.start, n),
        (this.x = n.px),
        (this.y = n.py),
        (this.z = n.pz));
    }
  },
  Qy = { lanes: [5.4, 9], pace: [1.12, 0.86], gap: 26, edge: 14 },
  $y = class extends dy {
    constructor(e, t, n, r, i, a) {
      (super(),
        (this.table = e),
        (this.unit = t),
        (this.s0 = r),
        (this.dir = i),
        (this.lane = a),
        (this.units = [t]),
        (this.speed = n));
    }
    write(e) {
      let { w: t, xf: n, pose: r } = e,
        i = this.table.length,
        a = Qv(this.s0 + this.speed * e.t, i),
        o = Math.min(a, i - a) - Qy.edge * 0.5;
      if (o <= 0) {
        t.hide(this.unit.pool, this.unit.start);
        return;
      }
      this.table.at(this.dir > 0 ? a : i - a, r);
      let s = Math.hypot(r.tx, r.tz) || 1;
      n.yaw(Math.atan2(r.tz * this.dir, r.tx * this.dir))
        .at(
          r.px + r.rx * this.lane,
          r.py + r.ry * this.lane,
          r.pz + r.rz * this.lane,
        )
        .pitch(-Math.atan2(r.ty * this.dir, s));
      let c = Xv(o / (Qy.edge * 0.5));
      (t.put(this.unit.pool, this.unit.start, n, c, c, c),
        (this.x = n.px),
        (this.y = n.py),
        (this.z = n.pz));
    }
  },
  eb = { speed: 30, accel: 2.5, descend: 7, idle: 8, lift: 5, away: 30 };
