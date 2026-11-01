// assets__game-D43Oxqny 72 — built
// Lines 30763-30963 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var Yb = 670;
function Xb(e) {
  return Jb(e).slots.list();
}
var Zb = 0.0011,
  Qb = class {
    constructor(e, t) {
      ((this.info = {}),
        (this.frame = 0),
        (this.cursor = 0),
        (this.lastDistance = NaN),
        (this.lastClock = NaN),
        (this.speed = 0),
        (this.disposed = !1),
        (this.cpu = 0),
        (this.maxWrites = 0),
        (this.built = Jb(t.mobile)),
        (this.budget = t.mobile ? ty.mobileWrites : ty.writes));
      let n = 0;
      for (let t of this.built.slots.pools.values()) {
        let r = e(t.asset);
        (t.bind(r), t.meshes.length || n++);
      }
      for (let [e, t, n] of this.built.slots.liveries) e.setLivery(t, n);
      for (let e of this.built.movers)
        e.cost = e.units.reduce(
          (e, t) => e + t.pool.arrays.length * t.count,
          0,
        );
      this.world = {
        t: 0,
        dt: 0,
        player: { x: 0, y: 0, z: 0, d: 0, speed: 0 },
        w: new xy(),
        pose: gy(),
        xf: new yy(),
        xf2: new yy(),
        motion: { s: 0, v: 0, a: 0 },
      };
      for (let e of this.built.movers) e.write(this.world);
      (this.world.w.flush(),
        (this.world.w.writes = 0),
        (this.info.missingAssets = n),
        this.report());
    }
    get pacer() {
      let e = this.built.pacer.state;
      return e && !e.done ? { ...e } : null;
    }
    get debug() {
      return this.built;
    }
    update(e, t, n, r) {
      if (this.disposed) return;
      let i = performance.now(),
        a = this.world;
      if (Number.isFinite(t) && t < this.lastClock - 1) {
        (this.built.pacer.reset(), this.built.maglev.reset());
        for (let e of this.built.broadcast) e.reset();
        this.lastDistance = NaN;
      }
      if ((Number.isFinite(t) && (this.lastClock = t), r)) {
        ((this.lastDistance = n.distance),
          (this.info.reducedMotion = 1),
          (this.info.writes = 0));
        return;
      }
      ((this.info.reducedMotion = 0),
        (e = Number.isFinite(e) ? sy(e, 0, 0.25) : 0),
        (a.dt = e),
        (a.t += e));
      let o = n.position;
      if (
        ((a.player.x = o?.x ?? 0),
        (a.player.y = o?.y ?? 0),
        (a.player.z = o?.z ?? 0),
        (a.player.d = n.distance),
        e > 0 && Number.isFinite(this.lastDistance))
      ) {
        let t = (n.distance - this.lastDistance) / e;
        (Number.isFinite(t) &&
          Math.abs(t) < 400 &&
          (this.speed += (sy(t, 0, 260) - this.speed) * 0.4),
          n.finished ||
            this.built.pacer.trigger(
              this.lastDistance,
              n.distance,
              this.speed,
            ));
      }
      if (
        ((a.player.speed = this.speed), (this.lastDistance = n.distance), e > 0)
      ) {
        this.frame++;
        for (let e of this.built.movers) e.step(a);
        (this.schedule(e), a.w.flush());
      }
      ((this.maxWrites = Math.max(this.maxWrites, a.w.writes)),
        (this.info.writes = a.w.writes),
        (a.w.writes = 0));
      let s = performance.now() - i;
      ((this.cpu += (s - this.cpu) * 0.05),
        (this.info.cpuMs = s),
        (this.info.cpuMsAvg = this.cpu),
        this.report());
    }
    schedule(e) {
      let t = this.world,
        n = this.built.movers,
        { x: r, y: i, z: a } = t.player,
        o = this.frame,
        s = (t) => {
          if (t.fast) t.interval = 1;
          else {
            let n = Math.hypot(t.x - r, t.y - i, t.z - a);
            t.interval = sy(
              Math.floor((Zb * n) / (Math.max(t.speed, 0.1) * e)),
              1,
              8,
            );
          }
          t.due = o + t.interval;
        };
      for (let e of n) e.fast && (e.write(t), s(e));
      let c = n.length;
      for (let e = 0; e < c; e++) {
        let r = n[(this.cursor + e) % c];
        r.fast ||
          o < r.due ||
          t.w.writes + r.cost > this.budget ||
          (r.write(t), s(r));
      }
      this.cursor = (this.cursor + 7) % c;
    }
    report() {
      let e = this.built,
        t = 0;
      for (let n of e.broadcast) n.active && t++;
      let n = this.info;
      ((n.movers = e.movers.length),
        (n.time = this.world.t),
        (n.maxWrites = this.maxWrites),
        (n.pacerActive = +!!e.pacer.active),
        (n.pacerSpawns = e.pacer.spawned),
        (n.pacerSpeed = e.pacer.active ? e.pacer.state.speed : 0),
        (n.maglevPods = e.maglev.count),
        (n.heroPods = e.maglev.heroes),
        (n.broadcastActive = t));
    }
    dispose() {
      if (!this.disposed) {
        this.disposed = !0;
        for (let e of this.built.slots.pools.values())
          ((e.meshes = []), (e.arrays = []), (e.liveryAttributes = []));
        this.built.movers.length = 0;
      }
    }
  },
  $b = {
    color: `#5f9dff`,
    cells: 3,
    sweep: 0.42,
    failing: 1.2,
    fadeOut: 0.18,
    ripples: 4,
    rippleLife: 0.9,
  },
  ex = 1.7320508,
  tx = Hi(([e]) => {
    let t = q(1, ex),
      n = t.mul(0.5),
      r = Vi(e, t).sub(n),
      i = Vi(e.sub(n), t).sub(n),
      a = Br(yi(r, r).lessThan(yi(i, i)), r, i),
      o = hi(a);
    return J(V(0.5).sub(H(yi(o, fi(q(1, ex))), o.x)), e.sub(a));
  }),
  nx = (e) => B(Hr(yi(e, q(127.1, 311.7))).mul(43758.5453));
function rx(e, t) {
  t.updateMatrixWorld(!0);
  let n = t.matrixWorld.clone().invert(),
    r = new rr(),
    i = new A();
  e.traverse((e) => {
    let t = e,
      a = t.isMesh ? t.geometry.getAttribute(`position`) : null;
    if (a)
      for (let e = 0; e < a.count; e += 3)
        r.expandByPoint(
          i
            .fromBufferAttribute(a, e)
            .applyMatrix4(t.matrixWorld)
            .applyMatrix4(n),
        );
  });
  let a = r.getSize(new A());
  return {
    centre: r.getCenter(new A()),
    radii: new A(a.x * 0.64, a.y * 0.66, a.z * 0.6),
  };
}
