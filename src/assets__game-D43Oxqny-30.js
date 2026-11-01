// assets__game-D43Oxqny 30 — pods
// Lines 8736-8982 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var Ud = {
    period: 3,
    speed: 420,
    flight: 16,
    pods: 6,
    streak: 0.075,
    width: 4.5,
  },
  Wd = class {
    constructor(e, t) {
      ((this.group = new An()),
        (this.start = new A()),
        (this.direction = new A()),
        (this.clock = 0),
        (this.matrix = new k()),
        (this.quaternion = new Rn()),
        (this.scale = new A()),
        (this.position = new A()),
        (this.toCamera = new A()),
        (this.up = new A()),
        (this.normal = new A()),
        (this.group.name = `Mass driver launches`));
      let n = e[0];
      this.start.set(...n.position);
      let r = new A(...t);
      ((this.railLength = r.length() * e.length),
        this.direction.copy(r).applyAxisAngle(w.DEFAULT_UP, n.yaw).normalize(),
        (this.acceleration = Ud.speed ** 2 / (2 * this.railLength)),
        this.quaternion.setFromUnitVectors(new A(1, 0, 0), this.direction));
      let i = new Fe(1.1, 4.2, 4, 10);
      i.rotateZ(-Math.PI / 2);
      let a = new cr({
        name: `Mass driver pod`,
        color: `#d9dde2`,
        metalness: 0.7,
        roughness: 0.35,
        emissive: new j(`#9fd8ff`),
        emissiveIntensity: 1.6,
      });
      ((this.pods = new Dt(i, a, Ud.pods)),
        (this.pods.name = `Mass driver pods`));
      let o = new Ye(1, 1);
      o.translate(-0.5, 0, 0);
      let s = new At({
          name: `Mass driver streak`,
          transparent: !0,
          depthWrite: !1,
          blending: 2,
          side: 2,
          fog: !1,
        }),
        c = X().x,
        l = X().y.sub(0.5).mul(2),
        u = Z(0.86, 1, c),
        d = c.pow(2.2),
        f = Pr(l.mul(l).mul(-5)).mul(d.add(u.mul(5)));
      ((s.colorNode = J(0.55, 0.82, 1).mul(f).mul(V(10))),
        (this.streaks = new Dt(o, s, Ud.pods)),
        (this.streaks.name = `Mass driver streaks`),
        (this.streaks.renderOrder = 3));
      for (let e of [this.pods, this.streaks])
        ((e.frustumCulled = !1),
          (e.castShadow = e.receiveShadow = !1),
          (e.userData.reflectionHidden = !0),
          (e.count = 0),
          this.group.add(e));
    }
    travel(e) {
      let t = Ud.speed / this.acceleration;
      return e < t
        ? 0.5 * this.acceleration * e * e
        : this.railLength + Ud.speed * (e - t);
    }
    speedAt(e) {
      return Math.min(Ud.speed, this.acceleration * e);
    }
    update(e, t, n) {
      if (n) {
        this.pods.count = this.streaks.count = 0;
        return;
      }
      Number.isFinite(e) && e > 0 && (this.clock += Math.min(e, 0.1));
      let r = 0,
        i = Math.floor(this.clock / Ud.period);
      for (let e = i; e > i - Ud.pods && r < Ud.pods; e--) {
        let n = this.clock - e * Ud.period;
        if (e < 0 || n < 0 || n > Ud.flight) continue;
        this.position
          .copy(this.start)
          .addScaledVector(this.direction, this.travel(n));
        let i = F.clamp((Ud.flight - n) / 2, 0, 1);
        (this.matrix.compose(
          this.position,
          this.quaternion,
          this.scale.set(i, i, i),
        ),
          this.pods.setMatrixAt(r, this.matrix),
          this.toCamera.copy(t.position).sub(this.position).normalize(),
          this.up.crossVectors(this.direction, this.toCamera).normalize(),
          this.normal.crossVectors(this.direction, this.up));
        let a = Math.max(4, this.speedAt(n) * Ud.streak * 6) * i,
          o =
            Math.max(Ud.width, t.position.distanceTo(this.position) * 0.007) *
            i;
        (this.matrix
          .makeBasis(this.direction, this.up, this.normal)
          .scale(this.scale.set(a, o, 1))
          .setPosition(this.position),
          this.streaks.setMatrixAt(r, this.matrix),
          r++);
      }
      ((this.pods.count = this.streaks.count = r),
        (this.pods.instanceMatrix.needsUpdate = !0),
        (this.streaks.instanceMatrix.needsUpdate = !0));
    }
    dispose() {
      for (let e of [this.pods, this.streaks])
        (e.geometry.dispose(), e.material.dispose(), e.dispose());
      this.group.clear();
    }
  },
  Gd = { spacing: 36, column: 2.4, inset: 5, head: 2 };
function Kd(e) {
  let t = P(0),
    n = [],
    r = Array.from({ length: Math.ceil(v / 4) }, (e, t) => L(t * 4, 0, 0)),
    i = new Rn(),
    a = new k();
  for (let o = 0; o < v; o += Gd.spacing) {
    if (
      en.some((e) => o >= e.from * v - 20 && o <= e.to * v + 20) ||
      ar.some((e) => o > e.kicker - 12 && o < e.land + 12)
    )
      continue;
    let s = pe(o),
      c = s.position.y - Mu;
    if (c - e(s.position.x, s.position.z) < ju.bermReach) continue;
    let l = new A(s.tangent.x, 0, s.tangent.z).normalize(),
      u = new A(-l.z, 0, l.x);
    (a.makeBasis(u, new A(0, 1, 0), l), i.setFromRotationMatrix(a));
    let d = [];
    for (let a of [-1, 1]) {
      let s = L(o, a * (t - Gd.inset), 0),
        c = e(s.x, s.z) - 2,
        l = s.y - Mu;
      if (
        l - c < 4 ||
        r.some(
          (e) =>
            e.y < l - 8 && Math.hypot(e.x - s.x, e.z - s.z) < t + Gd.column + 3,
        )
      )
        continue;
      let u = l - c,
        f = new ht(Gd.column, u, Gd.column);
      (f.applyMatrix4(
        new k().compose(new A(s.x, c + u / 2, s.z), i, new A(1, 1, 1)),
      ),
        n.push(f),
        d.push(s));
    }
    if (!d.length) continue;
    let f = new ht(
        d.length === 2 ? (t - Gd.inset) * 2 + 4 : 6,
        Gd.head,
        Gd.column + 0.8,
      ),
      p = d.length === 2 ? d[0].clone().add(d[1]).multiplyScalar(0.5) : d[0];
    (f.applyMatrix4(
      new k().compose(new A(p.x, c - Gd.head / 2, p.z), i, new A(1, 1, 1)),
    ),
      n.push(f));
  }
  return n;
}
var qd = 24.8;
function Jd(e) {
  let t = Array.from({ length: Math.ceil(v / 4) }, (e, t) => t * 4)
      .filter(
        (e) =>
          !en.some((t) => !t.glass && e >= t.from * v - 4 && e <= t.to * v + 4),
      )
      .map((e) => L(e, 0, 0)),
    n = [],
    r = [],
    i = [];
  for (let [a, [o, s, c]] of e.entries()) {
    let e = new A(o, s + qd, c),
      l = t[0];
    for (let n of t) n.distanceToSquared(e) < l.distanceToSquared(e) && (l = n);
    if (l.y > e.y - 4 || l.distanceTo(e) > cs.range * 0.85) continue;
    let u = l.clone().sub(e).normalize();
    i.push(a);
    let d = new A(u.x, 0, u.z).normalize(),
      f = e.clone().addScaledVector(d, 1.4);
    (n.push({
      position: f.clone().addScaledVector(u, 6),
      color: cs.color,
      intensity: cs.intensity,
      range: cs.range,
      cone: { axis: u, cos: cs.cone },
    }),
      r.push(new k().lookAt(f, f.clone().sub(u), new A(0, 1, 0))),
      r[r.length - 1].setPosition(f));
  }
  let a = new An();
  a.name = `Crater floodlights`;
  let o = new ht(1.9, 1.1, 0.5);
  o.translate(0, 0, -0.25);
  let s = new Ye(1.6, 0.8);
  s.translate(0, 0, 0.01);
  let c = new cr({
      name: `Floodlight housing`,
      color: `#2a2c30`,
      roughness: 0.5,
      metalness: 0.6,
    }),
    l = new b({
      name: `Floodlight lens`,
      color: new j(cs.color).multiplyScalar(9),
    }),
    u = new Dt(o, c, Math.max(1, r.length)),
    d = new Dt(s, l, Math.max(1, r.length));
  ((u.name = `Floodlight housings`),
    (d.name = `Floodlight lenses`),
    r.forEach((e, t) => {
      (u.setMatrixAt(t, e), d.setMatrixAt(t, e));
    }));
  for (let e of [u, d])
    ((e.count = r.length), e.computeBoundingSphere(), a.add(e));
  return (
    (u.castShadow = d.castShadow = !1),
    {
      fixtures: n,
      lit: i,
      group: a,
      dispose() {
        (o.dispose(),
          s.dispose(),
          c.dispose(),
          l.dispose(),
          u.dispose(),
          d.dispose());
      },
    }
  );
}
