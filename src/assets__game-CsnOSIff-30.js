// assets__game-CsnOSIff 30 — pods
// Lines 8700-8946 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Hd = {
    period: 3,
    speed: 420,
    flight: 16,
    pods: 6,
    streak: 0.075,
    width: 4.5,
  },
  Ud = class {
    constructor(e, t) {
      ((this.group = new pn()),
        (this.start = new g()),
        (this.direction = new g()),
        (this.clock = 0),
        (this.matrix = new M()),
        (this.quaternion = new Ot()),
        (this.scale = new g()),
        (this.position = new g()),
        (this.toCamera = new g()),
        (this.up = new g()),
        (this.normal = new g()),
        (this.group.name = `Mass driver launches`));
      let n = e[0];
      this.start.set(...n.position);
      let r = new g(...t);
      ((this.railLength = r.length() * e.length),
        this.direction.copy(r).applyAxisAngle(Je.DEFAULT_UP, n.yaw).normalize(),
        (this.acceleration = Hd.speed ** 2 / (2 * this.railLength)),
        this.quaternion.setFromUnitVectors(new g(1, 0, 0), this.direction));
      let a = new Qn(1.1, 4.2, 4, 10);
      a.rotateZ(-Math.PI / 2);
      let o = new Ne({
        name: `Mass driver pod`,
        color: `#d9dde2`,
        metalness: 0.7,
        roughness: 0.35,
        emissive: new _(`#9fd8ff`),
        emissiveIntensity: 1.6,
      });
      ((this.pods = new Wn(a, o, Hd.pods)),
        (this.pods.name = `Mass driver pods`));
      let s = new rt(1, 1);
      s.translate(-0.5, 0, 0);
      let c = new i({
          name: `Mass driver streak`,
          transparent: !0,
          depthWrite: !1,
          blending: 2,
          side: 2,
          fog: !1,
        }),
        l = X().x,
        u = X().y.sub(0.5).mul(2),
        d = Z(0.86, 1, l),
        f = l.pow(2.2),
        p = Pr(u.mul(u).mul(-5)).mul(f.add(d.mul(5)));
      ((c.colorNode = q(0.55, 0.82, 1).mul(p).mul(B(10))),
        (this.streaks = new Wn(s, c, Hd.pods)),
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
      let t = Hd.speed / this.acceleration;
      return e < t
        ? 0.5 * this.acceleration * e * e
        : this.railLength + Hd.speed * (e - t);
    }
    speedAt(e) {
      return Math.min(Hd.speed, this.acceleration * e);
    }
    update(e, t, n) {
      if (n) {
        this.pods.count = this.streaks.count = 0;
        return;
      }
      Number.isFinite(e) && e > 0 && (this.clock += Math.min(e, 0.1));
      let r = 0,
        i = Math.floor(this.clock / Hd.period);
      for (let e = i; e > i - Hd.pods && r < Hd.pods; e--) {
        let n = this.clock - e * Hd.period;
        if (e < 0 || n < 0 || n > Hd.flight) continue;
        this.position
          .copy(this.start)
          .addScaledVector(this.direction, this.travel(n));
        let i = s.clamp((Hd.flight - n) / 2, 0, 1);
        (this.matrix.compose(
          this.position,
          this.quaternion,
          this.scale.set(i, i, i),
        ),
          this.pods.setMatrixAt(r, this.matrix),
          this.toCamera.copy(t.position).sub(this.position).normalize(),
          this.up.crossVectors(this.direction, this.toCamera).normalize(),
          this.normal.crossVectors(this.direction, this.up));
        let a = Math.max(4, this.speedAt(n) * Hd.streak * 6) * i,
          o =
            Math.max(Hd.width, t.position.distanceTo(this.position) * 0.007) *
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
  Wd = { spacing: 36, column: 2.4, inset: 5, head: 2 };
function Gd(e) {
  let t = j(0),
    n = [],
    r = Array.from({ length: Math.ceil(F / 4) }, (e, t) => P(t * 4, 0, 0)),
    i = new Ot(),
    a = new M();
  for (let o = 0; o < F; o += Wd.spacing) {
    if (
      Se.some((e) => o >= e.from * F - 20 && o <= e.to * F + 20) ||
      Xn.some((e) => o > e.kicker - 12 && o < e.land + 12)
    )
      continue;
    let s = A(o),
      c = s.position.y - ju;
    if (c - e(s.position.x, s.position.z) < Au.bermReach) continue;
    let l = new g(s.tangent.x, 0, s.tangent.z).normalize(),
      u = new g(-l.z, 0, l.x);
    (a.makeBasis(u, new g(0, 1, 0), l), i.setFromRotationMatrix(a));
    let d = [];
    for (let a of [-1, 1]) {
      let s = P(o, a * (t - Wd.inset), 0),
        c = e(s.x, s.z) - 2,
        l = s.y - ju;
      if (
        l - c < 4 ||
        r.some(
          (e) =>
            e.y < l - 8 && Math.hypot(e.x - s.x, e.z - s.z) < t + Wd.column + 3,
        )
      )
        continue;
      let u = l - c,
        f = new ir(Wd.column, u, Wd.column);
      (f.applyMatrix4(
        new M().compose(new g(s.x, c + u / 2, s.z), i, new g(1, 1, 1)),
      ),
        n.push(f),
        d.push(s));
    }
    if (!d.length) continue;
    let f = new ir(
        d.length === 2 ? (t - Wd.inset) * 2 + 4 : 6,
        Wd.head,
        Wd.column + 0.8,
      ),
      p = d.length === 2 ? d[0].clone().add(d[1]).multiplyScalar(0.5) : d[0];
    (f.applyMatrix4(
      new M().compose(new g(p.x, c - Wd.head / 2, p.z), i, new g(1, 1, 1)),
    ),
      n.push(f));
  }
  return n;
}
var Kd = 24.8;
function qd(e) {
  let t = Array.from({ length: Math.ceil(F / 4) }, (e, t) => t * 4)
      .filter(
        (e) =>
          !Se.some((t) => !t.glass && e >= t.from * F - 4 && e <= t.to * F + 4),
      )
      .map((e) => P(e, 0, 0)),
    n = [],
    r = [],
    i = [];
  for (let [a, [o, s, c]] of e.entries()) {
    let e = new g(o, s + Kd, c),
      l = t[0];
    for (let n of t) n.distanceToSquared(e) < l.distanceToSquared(e) && (l = n);
    if (l.y > e.y - 4 || l.distanceTo(e) > ss.range * 0.85) continue;
    let u = l.clone().sub(e).normalize();
    i.push(a);
    let d = new g(u.x, 0, u.z).normalize(),
      f = e.clone().addScaledVector(d, 1.4);
    (n.push({
      position: f.clone().addScaledVector(u, 6),
      color: ss.color,
      intensity: ss.intensity,
      range: ss.range,
      cone: { axis: u, cos: ss.cone },
    }),
      r.push(new M().lookAt(f, f.clone().sub(u), new g(0, 1, 0))),
      r[r.length - 1].setPosition(f));
  }
  let a = new pn();
  a.name = `Crater floodlights`;
  let o = new ir(1.9, 1.1, 0.5);
  o.translate(0, 0, -0.25);
  let s = new rt(1.6, 0.8);
  s.translate(0, 0, 0.01);
  let c = new Ne({
      name: `Floodlight housing`,
      color: `#2a2c30`,
      roughness: 0.5,
      metalness: 0.6,
    }),
    l = new we({
      name: `Floodlight lens`,
      color: new _(ss.color).multiplyScalar(9),
    }),
    u = new Wn(o, c, Math.max(1, r.length)),
    d = new Wn(s, l, Math.max(1, r.length));
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
