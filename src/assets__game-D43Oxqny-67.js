// assets__game-D43Oxqny 67 — math
// Lines 29084-29577 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var qy = class extends Cy {
    constructor(e, t) {
      (super(),
        (this.ship = e),
        (this.tethers = t),
        (this.p = { x: 0, y: 0, z: 0, heading: 0 }),
        (this.masts = Ky()),
        (this.units = [e, t]),
        (this.speed = 0.3));
    }
    write(e) {
      let { w: t, xf: n } = e,
        r = Wy(e.t, this.p);
      (n.yaw(r.heading).at(r.x, r.y, r.z),
        t.put(this.ship.pool, this.ship.start, n),
        (this.x = r.x),
        (this.y = r.y),
        (this.z = r.z),
        this.masts.forEach((e, i) => {
          let [a, o, s] = Gy(r, e.along, Vy),
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
  Jy = { height: 2.9, length: 12.19, half: 6.1 },
  Yy = { speed: 22, accel: 3, half: 6.83, height: 4.61 },
  Xy = {
    rack: { time: 14.5, swap: 6.5 },
    bay: { time: 17, swap: 8.5 },
    drop: { time: 12, swap: 5.5 },
  },
  Zy = 8,
  Qy = 12,
  $y = { close: 4.7, slide: 14.7 },
  eb = class extends Cy {
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
        (this.run = my(t.length, Yy.speed, Yy.accel)),
        (this.period = Xy[n.kind].time + this.run + Xy[r.kind].time + this.run),
        (this.speed = Yy.speed));
    }
    write(e) {
      let { w: t, xf: n, xf2: r, pose: i, motion: a } = e,
        o = e.t + this.phase,
        s = Math.floor(o / this.period),
        c = uy(o, this.period),
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
              n = $y.close * (r < 4 ? cy((r - 2) / 2) : 1 - cy((r - 10.5) / 2));
            ((h =
              r < 2
                ? dy(t.inYaw, e, cy(r / 2))
                : r < 12.5
                  ? e
                  : dy(e, t.outYaw, cy((r - 12.5) / 2))),
              (s -= t.nx * n),
              (m -= t.nz * n),
              r >= 4 &&
                r < 10.5 &&
                ((u =
                  r < 6.5
                    ? $y.slide * cy((r - 4) / 2.5)
                    : r < 8
                      ? $y.slide
                      : $y.slide * (1 - cy((r - 8) / 2.5))),
                (d = -t.nx),
                (f = -t.nz),
                (p = r < 6.5 || r >= 8)));
          } else if (t.kind === `bay`) {
            let n = Wy(e.t, this.lev),
              [l, u, d] = Gy(n, t.along, Hy),
              f = n.heading,
              p =
                Math.abs(uy(f - t.inYaw + Math.PI, iy) - Math.PI) < Math.PI / 2
                  ? f
                  : f + Math.PI,
              g = r < 4 ? cy(r / 4) : r < 13 ? 1 : 1 - cy((r - 13) / 4);
            ((s = ly(i, l, g)),
              (m = ly(o, d, g)),
              (c = ly(
                a,
                u,
                r < 4
                  ? 0
                  : r < 7
                    ? cy((r - 4) / 3)
                    : r < 10
                      ? 1
                      : r < 13
                        ? 1 - cy((r - 10) / 3)
                        : 0,
              )),
              (h =
                r < 4
                  ? dy(t.inYaw, p, cy(r / 4))
                  : r < 13
                    ? p
                    : dy(p, t.outYaw, cy((r - 13) / 4))));
          } else
            ((h = dy(t.inYaw, t.outYaw, cy(r / 2.5))),
              (l =
                r < 2.5
                  ? 0
                  : r < 5.5
                    ? t.drop * cy((r - 2.5) / 3)
                    : r < 7
                      ? t.drop
                      : t.drop * (1 - cy((r - 7) / 3))),
              (p = r < 5.5 || r >= 7),
              (c += 0.15 * Math.sin(e.t * 1.7 + this.seed)));
          return (n.yaw(h).at(s, c, m), +(r >= Xy[t.kind].swap));
        },
        _ = Xy[this.a.kind].time,
        v = Xy[this.b.kind].time;
      if (
        (c < _
          ? (h = g(this.a, c))
          : (c -= _) < this.run
            ? (hy(this.table.length, Yy.speed, Yy.accel, c, a),
              this.table.at(a.s, i),
              (m = a.a),
              n
                .yaw(Math.atan2(i.tz, i.tx))
                .at(i.px, i.py, i.pz)
                .pitch(0.05 * (a.v / Yy.speed) + 0.06 * (a.a / Yy.accel)),
              (h = 1))
            : (c -= this.run) < v
              ? (h = 1 + g(this.b, c))
              : (hy(this.table.length, Yy.speed, Yy.accel, c - v, a),
                this.table.at(this.table.length - a.s, i),
                (m = a.a),
                n
                  .yaw(Math.atan2(-i.tz, -i.tx))
                  .at(i.px, i.py, i.pz)
                  .pitch(0.05 * (a.v / Yy.speed) + 0.06 * (a.a / Yy.accel)),
                (h = 2)),
        t.put(this.drone.pool, this.drone.start, n),
        (this.x = n.px),
        (this.y = n.py),
        (this.z = n.pz),
        this.container.pool.setLivery(
          this.container.start,
          Math.floor(fy(this.seed, s * 2 + h) * 8),
        ),
        !p)
      ) {
        (t.hide(this.container.pool, this.container.start),
          (this.box.shown = !1));
        return;
      }
      let y = -0.05 * (m / Yy.accel) + 0.012 * Math.sin(e.t * 1.3 + this.seed),
        b = 0.015 * Math.sin(e.t * 1.07 + this.seed * 2.1);
      (r.yaw(Math.atan2(n.fz, n.fx)).pitch(y).roll(b),
        r.at(n.px + d * u, n.py - l, n.pz + f * u),
        r.local(0, -Jy.height, 0),
        t.put(this.container.pool, this.container.start, r),
        (this.box.shown = !0),
        (this.box.x = r.px),
        (this.box.y = r.py),
        (this.box.z = r.pz));
    }
  },
  tb = { speed: 12, lift: 19, pause: 2, climb: 4 },
  nb = class e extends Cy {
    static period(e) {
      return 2 * (e.length / tb.speed + tb.pause + tb.climb);
    }
    constructor(e, t, n, r, i) {
      (super(),
        (this.table = e),
        (this.drone = t),
        (this.container = n),
        (this.phase = r),
        (this.seed = i),
        (this.units = [t, n]),
        (this.speed = tb.speed));
    }
    write(t) {
      let { w: n, xf: r, xf2: i, pose: a } = t,
        o = this.table.length,
        s = o / tb.speed,
        c = tb.pause + tb.climb,
        l = uy(t.t + this.phase, e.period(this.table)),
        u = 0,
        d = 1,
        f = 0;
      (l < s
        ? (f = l * tb.speed)
        : (l -= s) < c
          ? ((f = o), (u = tb.lift * cy((l - tb.pause) / tb.climb)))
          : (l -= c) < s
            ? ((f = o - l * tb.speed), (u = tb.lift), (d = -1))
            : ((d = -1),
              (u = tb.lift * (1 - cy((l - s - tb.pause) / tb.climb)))),
        this.table.at(f, a));
      let p = Math.atan2(a.tz * d, a.tx * d);
      (r
        .yaw(p)
        .at(a.px, a.py + u + Jy.height / 2, a.pz)
        .pitch(0.04),
        n.put(this.drone.pool, this.drone.start, r),
        (this.x = r.px),
        (this.y = r.py),
        (this.z = r.pz),
        i.yaw(p).roll(0.012 * Math.sin(t.t * 1.2 + this.seed)),
        i.at(r.px, r.py, r.pz).local(0, -Jy.height, 0),
        n.put(this.container.pool, this.container.start, i));
    }
  },
  rb = { plane: 21.9, yMin: 8, yMax: 144, reach: 12.2, travel: 15, period: 26 },
  ib = class extends Cy {
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
      return ly(rb.yMin + 6, rb.yMax - 6, fy(this.seed, e));
    }
    trolley(e) {
      return rb.travel * (fy(this.seed, e, 3) - 0.5);
    }
    write(e) {
      let { w: t, xf: n, xf2: r } = e,
        i = e.t + this.phase,
        a = Math.floor(i / rb.period),
        o = uy(i, rb.period),
        s = o < 11 ? 0 : cy((o - 11) / 15),
        c = ly(this.tier(a), this.tier(a + 1), s),
        l = ly(this.trolley(a), this.trolley(a + 1), s),
        u =
          o < 3
            ? 0
            : o < 6
              ? cy((o - 3) / 3)
              : o < 8
                ? 1
                : o < 11
                  ? 1 - cy((o - 8) / 3)
                  : 0;
      if (
        (n
          .yaw(Math.atan2(this.nz, this.nx))
          .at(
            this.cx + this.nx * rb.plane,
            Yd + c,
            this.cz + this.nz * rb.plane,
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
            Math.floor(fy(this.seed, a, 7) * 8),
          ));
        return;
      }
      (r.copy(n).local(l, 0, -rb.reach * u),
        t.put(this.container.pool, this.container.start, r));
    }
  },
  ab = class extends Cy {
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
  ob = [
    [0, 0, 0],
    [-2.3, 0.6, -2.6],
    [2.2, -0.5, -2.9],
    [-1.1, -0.9, -5.6],
    [1.4, 0.8, -6.1],
  ],
  sb = class extends Cy {
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
        let [a, o, s] = ob[i % ob.length],
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
  cb = class extends Cy {
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
  lb = class extends Cy {
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
        u = uy(e.t + this.phase, this.period) * this.speed;
      if (u > l) {
        t.hide(this.unit.pool, this.unit.start);
        return;
      }
      let d = u / l;
      (n
        .yaw(Math.atan2(c - a, o - r))
        .at(ly(r, o, d), ly(i, s, d), ly(a, c, d)),
        t.put(this.unit.pool, this.unit.start, n),
        (this.x = n.px),
        (this.y = n.py),
        (this.z = n.pz));
    }
  },
  ub = { lanes: [5.4, 9], pace: [1.12, 0.86], gap: 26, edge: 14 },
  db = class extends Cy {
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
        a = uy(this.s0 + this.speed * e.t, i),
        o = Math.min(a, i - a) - ub.edge * 0.5;
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
      let c = cy(o / (ub.edge * 0.5));
      (t.put(this.unit.pool, this.unit.start, n, c, c, c),
        (this.x = n.px),
        (this.y = n.py),
        (this.z = n.pz));
    }
  },
  fb = { speed: 30, accel: 2.5, descend: 7, idle: 8, lift: 5, away: 30 };
