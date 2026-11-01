// assets__game-D43Oxqny 12 — math
// Lines 3503-3845 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var qs = class {
    constructor() {
      ((this.group = new An()),
        (this.geometry = new wn(0.96, 1, 64)),
        (this.material = new b({
          color: new j(`#70edff`).multiplyScalar(2),
          transparent: !0,
          depthWrite: !1,
          side: 2,
          blending: 2,
          toneMapped: !1,
        })),
        (this.rings = [0, 1].map(() => {
          let e = new M(this.geometry, this.material);
          return (
            (e.rotation.x = -Math.PI / 2),
            e.scale.set(3.2, 5.1, 1),
            this.group.add(e),
            e
          );
        })),
        (this.pose = Ks(0)),
        (this.group.name = `Craft recovery sweeps`),
        (this.group.visible = !1));
    }
    update(e, t) {
      ((this.pose = Ks(e, t)),
        (this.group.visible = this.pose.active),
        (this.material.opacity = this.pose.opacity * 0.75));
      let n = t ? 0.5 : F.smoothstep(this.pose.age, 0, 0.9);
      return (
        (this.rings[0].position.y = -0.45 + n * 1.9),
        (this.rings[1].position.y = 1.45 - n * 1.9),
        this.pose
      );
    }
    dispose() {
      (this.group.removeFromParent(),
        this.geometry.dispose(),
        this.material.dispose());
    }
  },
  Js = (e) => (e === `chase` ? `close` : e === `close` ? `first` : `chase`),
  Ys = (e) =>
    e.settings.camera === `first` &&
    (e.mode === `countdown` || e.mode === `racing` || e.mode === `paused`),
  Xs = new A(0, 1.5, 0.55),
  Zs = 0.5,
  Qs = (e) => ((e.airTime ?? 0) > 0 ? (e.airHeight ?? 0) : re(e.distance)),
  $s = 0,
  ec = 21 / 9 - $s / 900,
  tc = (e) => ((((e + v / 2) % v) + v) % v) - v / 2,
  nc = new A(),
  rc = new A(),
  ic = new Rn(),
  ac = new Rn(),
  oc = new A(),
  sc = new k(),
  cc = new A(),
  lc = class {
    constructor() {
      ((this.value = 0), (this.velocity = 0));
    }
    step(e, t, n, r) {
      if (r) return ((this.value = e), (this.velocity = 0), e);
      let i = this.value - e,
        a = this.velocity + i * t,
        o = Math.exp(-t * n);
      return (
        (this.value = e + (i + a * n) * o),
        (this.velocity = (this.velocity - a * t * n) * o),
        this.value
      );
    }
  },
  uc = class {
    constructor() {
      ((this.lane = new lc()),
        (this.heading = new lc()),
        (this.bank = new lc()),
        (this.back = new lc()),
        (this.height = new lc()),
        (this.fov = new lc()),
        (this.lift = new lc()),
        (this.ready = !1),
        (this.lastMode = `menu`),
        (this.lastClock = 0),
        (this.lastView = `chase`),
        (this.lastDistance = 0),
        (this.look = new A()),
        (this.finishStart = 0),
        (this.finishSide = 1),
        (this.finishCut = !1),
        (this.tourTime = 0),
        (this.front = new lc()),
        (this.menuLight = 1),
        (this.diagnostics = {
          cockpit: !1,
          lateralLag: 0,
          followHeading: 0,
          bankDegrees: 0,
          setback: 0,
          finishShot: 0,
          menuShot: ``,
        }));
    }
    update(e, t, n, r = !1) {
      let i = t.settings.camera;
      if (
        ((this.menuLight = 1),
        this.ready && t.mode === `paused` && i === this.lastView)
      )
        return;
      n = Math.max(0, Math.min(n, 0.1));
      let a = t.mode === `menu`,
        o = this.lastMode === `menu`,
        s = Ys(t),
        c =
          !this.ready ||
          a !== o ||
          t.clock < this.lastClock ||
          Math.abs(tc(t.distance - this.lastDistance)) > 100 ||
          (i === `first`) != (this.lastView === `first`),
        l = pe(t.distance);
      if (a) {
        let i = !this.ready || !o;
        i ? (this.tourTime = 0) : r || (this.tourTime += n);
        let a = this.front.step(
            (t.rivals ?? []).reduce(
              (e, n) => Math.max(e, Math.min(200, tc(n.distance - t.distance))),
              0,
            ),
            0.5,
            n,
            i,
          ),
          s = Gs(r ? Us : this.tourTime, {
            distance: t.distance,
            lane: t.lane,
            front: t.distance + a,
          }),
          c = P(s.eye.distance) - 1.5;
        (e.position.copy(
          L(
            s.eye.distance,
            F.clamp(s.eye.lane, -c, c),
            Math.max(0.7, s.eye.height),
          ),
        ),
          this.look.copy(L(s.look.distance, s.look.lane, s.look.height)),
          e.up.set(0, 1, 0).lerp(pe(s.eye.distance).up, 0.15).normalize(),
          e.lookAt(this.look));
        let l = e.aspect - $s / 900,
          u = Math.tan(F.degToRad(s.fov) / 2) * Math.max(1, ec / l);
        ((e.fov = F.radToDeg(2 * Math.atan(u))),
          e.rotateY(Math.atan(($s / 900) * u)),
          (this.menuLight = s.light),
          (this.diagnostics.menuShot = s.shot));
      } else if (s) this.cockpit(e, t, n, c, r);
      else {
        let r = i === `close`,
          a = this.lane.step(t.lane, 23, n, c);
        ((a = F.clamp(a, t.lane - 1.25, t.lane + 1.25)), (this.lane.value = a));
        let o = this.heading.step(t.heading * 0.82, 32, n, c),
          s = this.bank.step(
            F.clamp(l.bank * 0.82 + t.roll * 0.12, -0.29, 0.29),
            18,
            n,
            c,
          ),
          u = F.clamp((1 / e.aspect - 1) * 3.2, 0, 4),
          d = this.back.step(
            (r ? 10.5 : 14.2) + u + (t.boostActive ? 1.1 : 0),
            16,
            n,
            c,
          ),
          f = this.height.step(r ? 2.25 : 3.35, 16, n, c),
          p = Qs(t),
          m = Math.min(p, this.lift.step(p, 9, n, c)),
          h = new A(l.tangent.z, 0, -l.tangent.x).normalize(),
          g = l.tangent
            .clone()
            .cross(h)
            .applyAxisAngle(l.tangent, s)
            .normalize(),
          _ = l.tangent
            .clone()
            .multiplyScalar(Math.cos(o))
            .addScaledVector(l.right, Math.sin(o))
            .normalize(),
          v = L(
            t.distance,
            a,
            1.05 + (t.hoverHeight - 1.05) * 0.12 + Math.max(m, -4),
          );
        e.position.copy(v).addScaledVector(_, -d).addScaledVector(g, f);
        let y = pe(t.distance - d),
          b = e.position.clone().sub(y.position).dot(y.right),
          x = P(t.distance - d) - 1.2;
        e.position.addScaledVector(y.right, F.clamp(b, -x, x) - b);
        let S = v.clone().addScaledVector(_, 34).addScaledVector(g, 0.55),
          C = L(t.distance + 36, a, 1.6);
        (this.look.copy(S).lerp(C, 0.12),
          e.up.copy(g),
          e.lookAt(this.look),
          (e.fov = this.fov.step(
            65 + Math.min(1, t.speed / 128) * 7 + (t.boostActive ? 4 : 0),
            12,
            n,
            c,
          )));
        let w = t.mode === `finished` ? this.finishShot(e, t, c) : 0;
        (t.impact > 0.01 &&
          t.mode !== `finished` &&
          (e.rotateZ(Math.sin(t.clock * 80) * 0.012 * t.impact),
          e.position.addScaledVector(
            g,
            Math.sin(t.clock * 63) * t.impact * 0.055,
          )),
          (this.diagnostics = {
            cockpit: !1,
            lateralLag: +(t.lane - a).toFixed(3),
            followHeading: +((o * 180) / Math.PI).toFixed(2),
            bankDegrees: +((s * 180) / Math.PI).toFixed(2),
            setback: +d.toFixed(2),
            finishShot: +w.toFixed(3),
            menuShot: ``,
          }));
      }
      (e.updateProjectionMatrix(),
        e.updateMatrixWorld(),
        (this.ready = !0),
        (this.lastMode = t.mode),
        (this.lastClock = t.clock),
        (this.lastView = i),
        (this.lastDistance = t.distance));
    }
    cockpit(e, t, n, r, i) {
      let a = pe(t.distance),
        o = Ks(t.protection ?? 0, i),
        s = t.heading + (t.slideYaw ?? 0);
      (e.position.copy(L(t.distance, t.lane, t.hoverHeight + Qs(t) + o.lift)),
        e.quaternion.setFromRotationMatrix(
          sc.makeBasis(a.right, a.up, a.tangent),
        ),
        e.rotateY(s),
        i || (e.rotateZ(t.roll * Zs), e.rotateX((t.pitch ?? 0) + o.pitch)),
        e.position.add(cc.copy(Xs).applyQuaternion(e.quaternion)),
        e.rotateY(Math.PI),
        e.rotateX(-0.035),
        e.up.copy(a.up));
      let c = 68 + Math.min(1, t.speed / 128) * 8 + (t.boostActive ? 4 : 0),
        l = F.radToDeg(2 * Math.atan(Math.tan(F.degToRad(42)) / e.aspect));
      ((e.fov = this.fov.step(Math.min(100, Math.max(c, l)), 12, n, r)),
        t.impact > 0.01 &&
          (e.rotateZ(Math.sin(t.clock * 80) * 0.01 * t.impact),
          e.position.addScaledVector(
            a.up,
            Math.sin(t.clock * 63) * t.impact * 0.04,
          )),
        (this.diagnostics = {
          cockpit: !0,
          lateralLag: 0,
          followHeading: +((s * 180) / Math.PI).toFixed(2),
          bankDegrees: +((a.bank * 180) / Math.PI).toFixed(2),
          setback: 0,
          finishShot: 0,
          menuShot: ``,
        }));
    }
    finishShot(e, t, n) {
      (n || this.lastMode !== `finished`) &&
        ((this.finishStart =
          t.flagAt > 0 && t.flagAt <= t.clock ? t.flagAt : t.clock),
        (this.finishSide = t.lane > 0 ? -1 : 1),
        (this.finishCut = t.settings.camera === `first`));
      let r = Math.max(0, t.clock - this.finishStart),
        i = this.finishCut ? 1 : F.smootherstep(r, 0.25, 2.85),
        a = F.smootherstep(r, 0, 10),
        o = pe(t.distance),
        s = L(t.distance, t.lane, t.hoverHeight + Qs(t)),
        c =
          2.55 -
          1.75 * a +
          Math.sin((r - 10) * 0.12) * 0.25 * F.smoothstep(r, 10, 14),
        l = 0.2 + 0.1 * a,
        u = 13.5 - 2 * a + Math.sin(r * 0.21) * 0.5;
      (rc
        .copy(o.tangent)
        .multiplyScalar(Math.cos(c))
        .addScaledVector(o.right, Math.sin(c) * this.finishSide)
        .multiplyScalar(Math.cos(l))
        .addScaledVector(o.up, Math.sin(l)),
        nc.copy(e.position).sub(s));
      let d = F.lerp(nc.length(), u, i);
      (nc.normalize(),
        ic.setFromUnitVectors(nc, rc).slerp(ac, 1 - i),
        e.position.copy(s).addScaledVector(nc.applyQuaternion(ic), d));
      let f = pe(t.distance + e.position.clone().sub(s).dot(o.tangent)),
        p = e.position.clone().sub(f.position),
        m = P(t.distance) - 1.2,
        h = p.dot(f.right);
      e.position.addScaledVector(f.right, F.clamp(h, -m, m) - h);
      let g = p.dot(f.up);
      g < 1.2 && e.position.addScaledVector(f.up, 1.2 - g);
      let _ = s
        .clone()
        .addScaledVector(o.tangent, 1.5)
        .addScaledVector(o.up, 0.5);
      return (
        this.look.lerp(_, i),
        oc.set(0, 1, 0).lerp(o.up, 0.25).normalize(),
        e.up.lerp(oc, i).normalize(),
        e.lookAt(this.look),
        (e.fov = F.lerp(e.fov, 50, i)),
        i
      );
    }
    snapshot() {
      return { ...this.diagnostics };
    }
  };
function dc(e, t) {
  if (!e.matrixWorldAutoUpdate) return t();
  (e.updateMatrixWorld(), (e.matrixWorldAutoUpdate = !1));
  try {
    return t();
  } finally {
    e.matrixWorldAutoUpdate = !0;
  }
}
function fc() {
  return new Promise((e) => {
    let t = 0,
      n = () => {
        (clearTimeout(r), t && cancelAnimationFrame(t), e());
      },
      r = setTimeout(n, 40);
    typeof requestAnimationFrame == `function` &&
      (t = requestAnimationFrame(() => setTimeout(n, 0)));
  });
}
