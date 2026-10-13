// assets__game-CsnOSIff 72 — built
// Lines 30625-30825 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Lb = 670;
function Rb(e) {
  return Ib(e).slots.list();
}
var zb = 0.0011,
  Bb = class {
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
        (this.built = Ib(t.mobile)),
        (this.budget = t.mobile ? Uv.mobileWrites : Uv.writes));
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
        w: new ly(),
        pose: iy(),
        xf: new sy(),
        xf2: new sy(),
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
        (e = Number.isFinite(e) ? Yv(e, 0, 0.25) : 0),
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
          (this.speed += (Yv(t, 0, 260) - this.speed) * 0.4),
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
            t.interval = Yv(
              Math.floor((zb * n) / (Math.max(t.speed, 0.1) * e)),
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
  Vb = {
    color: `#5f9dff`,
    cells: 3,
    sweep: 0.42,
    failing: 1.2,
    fadeOut: 0.18,
    ripples: 4,
    rippleLife: 0.9,
  },
  Hb = 1.7320508,
  Ub = Vi(([e]) => {
    let t = K(1, Hb),
      n = t.mul(0.5),
      r = Bi(e, t).sub(n),
      i = Bi(e.sub(n), t).sub(n),
      a = Br(vi(r, r).lessThan(vi(i, i)), r, i),
      o = Y(a);
    return q(B(0.5).sub(V(vi(o, fi(K(1, Hb))), o.x)), e.sub(a));
  }),
  Wb = (e) => z(Hr(vi(e, K(127.1, 311.7))).mul(43758.5453));
function Gb(e, t) {
  t.updateMatrixWorld(!0);
  let n = t.matrixWorld.clone().invert(),
    r = new Jn(),
    i = new g();
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
  let a = r.getSize(new g());
  return {
    centre: r.getCenter(new g()),
    radii: new g(a.x * 0.64, a.y * 0.66, a.z * 0.6),
  };
}
