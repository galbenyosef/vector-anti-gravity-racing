// assets__game-CsnOSIff 12 — math
// Lines 3484-3826 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Ks = class {
    constructor() {
      ((this.group = new pn()),
        (this.geometry = new ue(0.96, 1, 64)),
        (this.material = new we({
          color: new _(`#70edff`).multiplyScalar(2),
          transparent: !0,
          depthWrite: !1,
          side: 2,
          blending: 2,
          toneMapped: !1,
        })),
        (this.rings = [0, 1].map(() => {
          let e = new N(this.geometry, this.material);
          return (
            (e.rotation.x = -Math.PI / 2),
            e.scale.set(3.2, 5.1, 1),
            this.group.add(e),
            e
          );
        })),
        (this.pose = Gs(0)),
        (this.group.name = `Craft recovery sweeps`),
        (this.group.visible = !1));
    }
    update(e, t) {
      ((this.pose = Gs(e, t)),
        (this.group.visible = this.pose.active),
        (this.material.opacity = this.pose.opacity * 0.75));
      let n = t ? 0.5 : s.smoothstep(this.pose.age, 0, 0.9);
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
  qs = (e) => (e === `chase` ? `close` : e === `close` ? `first` : `chase`),
  Js = (e) =>
    e.settings.camera === `first` &&
    (e.mode === `countdown` || e.mode === `racing` || e.mode === `paused`),
  Ys = new g(0, 1.5, 0.55),
  Xs = 0.5,
  Zs = (e) => ((e.airTime ?? 0) > 0 ? (e.airHeight ?? 0) : w(e.distance)),
  Qs = 700,
  $s = 21 / 9 - Qs / 900,
  ec = (e) => ((((e + F / 2) % F) + F) % F) - F / 2,
  tc = new g(),
  nc = new g(),
  rc = new Ot(),
  ic = new Ot(),
  ac = new g(),
  oc = new M(),
  sc = new g(),
  cc = class {
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
  lc = class {
    constructor() {
      ((this.lane = new cc()),
        (this.heading = new cc()),
        (this.bank = new cc()),
        (this.back = new cc()),
        (this.height = new cc()),
        (this.fov = new cc()),
        (this.lift = new cc()),
        (this.ready = !1),
        (this.lastMode = `menu`),
        (this.lastClock = 0),
        (this.lastView = `chase`),
        (this.lastDistance = 0),
        (this.look = new g()),
        (this.finishStart = 0),
        (this.finishSide = 1),
        (this.finishCut = !1),
        (this.tourTime = 0),
        (this.front = new cc()),
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
        c = Js(t),
        l =
          !this.ready ||
          a !== o ||
          t.clock < this.lastClock ||
          Math.abs(ec(t.distance - this.lastDistance)) > 100 ||
          (i === `first`) != (this.lastView === `first`),
        u = A(t.distance);
      if (a) {
        let i = !this.ready || !o;
        i ? (this.tourTime = 0) : r || (this.tourTime += n);
        let a = this.front.step(
            (t.rivals ?? []).reduce(
              (e, n) => Math.max(e, Math.min(200, ec(n.distance - t.distance))),
              0,
            ),
            0.5,
            n,
            i,
          ),
          c = Ws(r ? Hs : this.tourTime, {
            distance: t.distance,
            lane: t.lane,
            front: t.distance + a,
          }),
          l = j(c.eye.distance) - 1.5;
        (e.position.copy(
          P(
            c.eye.distance,
            s.clamp(c.eye.lane, -l, l),
            Math.max(0.7, c.eye.height),
          ),
        ),
          this.look.copy(P(c.look.distance, c.look.lane, c.look.height)),
          e.up.set(0, 1, 0).lerp(A(c.eye.distance).up, 0.15).normalize(),
          e.lookAt(this.look));
        let u = e.aspect - Qs / 900,
          d = Math.tan(s.degToRad(c.fov) / 2) * Math.max(1, $s / u);
        ((e.fov = s.radToDeg(2 * Math.atan(d))),
          e.rotateY(Math.atan((Qs / 900) * d)),
          (this.menuLight = c.light),
          (this.diagnostics.menuShot = c.shot));
      } else if (c) this.cockpit(e, t, n, l, r);
      else {
        let r = i === `close`,
          a = this.lane.step(t.lane, 23, n, l);
        ((a = s.clamp(a, t.lane - 1.25, t.lane + 1.25)), (this.lane.value = a));
        let o = this.heading.step(t.heading * 0.82, 32, n, l),
          c = this.bank.step(
            s.clamp(u.bank * 0.82 + t.roll * 0.12, -0.29, 0.29),
            18,
            n,
            l,
          ),
          d = s.clamp((1 / e.aspect - 1) * 3.2, 0, 4),
          f = this.back.step(
            (r ? 10.5 : 14.2) + d + (t.boostActive ? 1.1 : 0),
            16,
            n,
            l,
          ),
          p = this.height.step(r ? 2.25 : 3.35, 16, n, l),
          m = Zs(t),
          h = Math.min(m, this.lift.step(m, 9, n, l)),
          _ = new g(u.tangent.z, 0, -u.tangent.x).normalize(),
          v = u.tangent
            .clone()
            .cross(_)
            .applyAxisAngle(u.tangent, c)
            .normalize(),
          y = u.tangent
            .clone()
            .multiplyScalar(Math.cos(o))
            .addScaledVector(u.right, Math.sin(o))
            .normalize(),
          b = P(
            t.distance,
            a,
            1.05 + (t.hoverHeight - 1.05) * 0.12 + Math.max(h, -4),
          );
        e.position.copy(b).addScaledVector(y, -f).addScaledVector(v, p);
        let x = A(t.distance - f),
          S = e.position.clone().sub(x.position).dot(x.right),
          C = j(t.distance - f) - 1.2;
        e.position.addScaledVector(x.right, s.clamp(S, -C, C) - S);
        let w = b.clone().addScaledVector(y, 34).addScaledVector(v, 0.55),
          T = P(t.distance + 36, a, 1.6);
        (this.look.copy(w).lerp(T, 0.12),
          e.up.copy(v),
          e.lookAt(this.look),
          (e.fov = this.fov.step(
            65 + Math.min(1, t.speed / 128) * 7 + (t.boostActive ? 4 : 0),
            12,
            n,
            l,
          )));
        let E = t.mode === `finished` ? this.finishShot(e, t, l) : 0;
        (t.impact > 0.01 &&
          t.mode !== `finished` &&
          (e.rotateZ(Math.sin(t.clock * 80) * 0.012 * t.impact),
          e.position.addScaledVector(
            v,
            Math.sin(t.clock * 63) * t.impact * 0.055,
          )),
          (this.diagnostics = {
            cockpit: !1,
            lateralLag: +(t.lane - a).toFixed(3),
            followHeading: +((o * 180) / Math.PI).toFixed(2),
            bankDegrees: +((c * 180) / Math.PI).toFixed(2),
            setback: +f.toFixed(2),
            finishShot: +E.toFixed(3),
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
      let a = A(t.distance),
        o = Gs(t.protection ?? 0, i),
        c = t.heading + (t.slideYaw ?? 0);
      (e.position.copy(P(t.distance, t.lane, t.hoverHeight + Zs(t) + o.lift)),
        e.quaternion.setFromRotationMatrix(
          oc.makeBasis(a.right, a.up, a.tangent),
        ),
        e.rotateY(c),
        i || (e.rotateZ(t.roll * Xs), e.rotateX((t.pitch ?? 0) + o.pitch)),
        e.position.add(sc.copy(Ys).applyQuaternion(e.quaternion)),
        e.rotateY(Math.PI),
        e.rotateX(-0.035),
        e.up.copy(a.up));
      let l = 68 + Math.min(1, t.speed / 128) * 8 + (t.boostActive ? 4 : 0),
        u = s.radToDeg(2 * Math.atan(Math.tan(s.degToRad(42)) / e.aspect));
      ((e.fov = this.fov.step(Math.min(100, Math.max(l, u)), 12, n, r)),
        t.impact > 0.01 &&
          (e.rotateZ(Math.sin(t.clock * 80) * 0.01 * t.impact),
          e.position.addScaledVector(
            a.up,
            Math.sin(t.clock * 63) * t.impact * 0.04,
          )),
        (this.diagnostics = {
          cockpit: !0,
          lateralLag: 0,
          followHeading: +((c * 180) / Math.PI).toFixed(2),
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
        i = this.finishCut ? 1 : s.smootherstep(r, 0.25, 2.85),
        a = s.smootherstep(r, 0, 10),
        o = A(t.distance),
        c = P(t.distance, t.lane, t.hoverHeight + Zs(t)),
        l =
          2.55 -
          1.75 * a +
          Math.sin((r - 10) * 0.12) * 0.25 * s.smoothstep(r, 10, 14),
        u = 0.2 + 0.1 * a,
        d = 13.5 - 2 * a + Math.sin(r * 0.21) * 0.5;
      (nc
        .copy(o.tangent)
        .multiplyScalar(Math.cos(l))
        .addScaledVector(o.right, Math.sin(l) * this.finishSide)
        .multiplyScalar(Math.cos(u))
        .addScaledVector(o.up, Math.sin(u)),
        tc.copy(e.position).sub(c));
      let f = s.lerp(tc.length(), d, i);
      (tc.normalize(),
        rc.setFromUnitVectors(tc, nc).slerp(ic, 1 - i),
        e.position.copy(c).addScaledVector(tc.applyQuaternion(rc), f));
      let p = A(t.distance + e.position.clone().sub(c).dot(o.tangent)),
        m = e.position.clone().sub(p.position),
        h = j(t.distance) - 1.2,
        g = m.dot(p.right);
      e.position.addScaledVector(p.right, s.clamp(g, -h, h) - g);
      let _ = m.dot(p.up);
      _ < 1.2 && e.position.addScaledVector(p.up, 1.2 - _);
      let v = c
        .clone()
        .addScaledVector(o.tangent, 1.5)
        .addScaledVector(o.up, 0.5);
      return (
        this.look.lerp(v, i),
        ac.set(0, 1, 0).lerp(o.up, 0.25).normalize(),
        e.up.lerp(ac, i).normalize(),
        e.lookAt(this.look),
        (e.fov = s.lerp(e.fov, 50, i)),
        i
      );
    }
    snapshot() {
      return { ...this.diagnostics };
    }
  };
function uc(e, t) {
  if (!e.matrixWorldAutoUpdate) return t();
  (e.updateMatrixWorld(), (e.matrixWorldAutoUpdate = !1));
  try {
    return t();
  } finally {
    e.matrixWorldAutoUpdate = !0;
  }
}
function dc() {
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
