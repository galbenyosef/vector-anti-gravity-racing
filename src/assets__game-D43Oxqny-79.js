// assets__game-D43Oxqny 79 — mul
// Lines 32897-33150 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var rS = class {
  constructor(e, t, n = !1, r = eS.intensity) {
    ((this.lighting = e),
      (this.night = n),
      (this.clock = R(0)),
      (this.eye = R(new A())),
      (this.right = R(new A(1, 0, 0))),
      (this.up = R(new A(0, 1, 0))),
      (this.projectionScale = R(550)),
      (this.intensity = R(eS.intensity)),
      (this.sunDirection = R(new A())),
      (this.sunColor = R(new j())),
      (this.sunPower = R(0)),
      (this.shadowMatrix = R(new k())),
      (this.shadowBias = R(0)),
      (this.shadowEnabled = R(0)),
      (this.placeholder = new E(1, 1)),
      (this.placeholderTarget = new We(1, 1, {
        depthTexture: this.placeholder,
        samples: 0,
      })),
      (this.target = new A()),
      (this.high = !0),
      (this.motion = !0),
      this.setIntensity(r),
      (this.placeholder.compareFunction = 515),
      (this.shadowDepth = z(this.placeholder)),
      (this.locals = [
        e.engine,
        ...e.tunnel,
        ...e.flashes.map(({ light: e }) => e),
      ].map((e) => ({
        light: e,
        positionRange: R(new Qt()),
        colorPower: R(new Qt()),
      }))));
    let i = new Ye(1, 1),
      a = new qn();
    (a.setIndex(i.getIndex()),
      a.setAttribute(`position`, i.getAttribute(`position`)),
      a.setAttribute(`uv`, i.getAttribute(`uv`)),
      (a.instanceCount = eS.highCount));
    let o = 1957501243,
      s = () => (
        (o = (Math.imul(o, 1664525) + 1013904223) >>> 0),
        o / 4294967296
      ),
      c = Array.from(
        { length: 3 },
        () => new on(new Float32Array(eS.highCount * 4), 4),
      );
    for (let e = 0; e < eS.highCount; e++)
      (c[0].setXYZW(
        e,
        (s() - 0.5) * eS.radius * 2,
        (s() - 0.5) * eS.radius * 2,
        (s() - 0.5) * eS.radius * 2,
        s() * Math.PI * 2,
      ),
        c[1].setXYZW(
          e,
          (s() - 0.5) * 0.07,
          (s() - 0.5) * 0.025,
          (s() - 0.5) * 0.07,
          24 + s() * 28,
        ),
        c[2].setXYZW(
          e,
          s(),
          0.009 + s() * 0.013,
          0.65 + s() * 0.35,
          0.07 + s() * 0.07,
        ));
    let [l, u, d] = c.map(
        (e, t) => (a.setAttribute(`dustRecord${t}`, e), Gr(e, `vec4`)),
      ),
      f = l.w,
      p = this.clock.mul(d.w),
      m = l.xyz
        .add(u.xyz.mul(this.clock))
        .add(
          J(
            Hr(p.add(f)).mul(0.25),
            Hr(p.mul(0.73).add(f.mul(1.7))).mul(0.12),
            Hr(p.mul(0.89).add(f.mul(2.3))).mul(0.25),
          ),
        ),
      h = eS.radius * 2,
      g = m.sub(this.eye).add(eS.radius),
      _ = g.sub(g.div(h).floor().mul(h)).sub(eS.radius),
      v = this.eye.add(_),
      y = _.length(),
      b = _.div(y.max(0.001)),
      x = this.clock.div(u.w).add(d.x).fract(),
      S = Z(0, 0.12, x).mul(Z(0.8, 1, x).oneMinus()),
      C = Z(1, 2, y).mul(Z(eS.radius * 0.65, eS.radius, y).oneMinus()),
      w = dr(d.y, y.mul(eS.maxPixels).div(this.projectionScale)),
      T = new At({
        transparent: !0,
        depthWrite: !1,
        side: 2,
        forceSinglePass: !0,
        fog: !0,
      });
    ((T.name = `Light-catching ambient dust`),
      (T.positionNode = v.add(
        this.right.mul(Gi.x.mul(w)).add(this.up.mul(Gi.y.mul(w))),
      )));
    let ee = J(0);
    for (let { positionRange: e, colorPower: t } of this.locals) {
      let n = e.xyz.sub(v),
        r = e.w.max(0.001),
        i = n.dot(n).max(0.25),
        a = V(1)
          .sub(i.div(r.mul(r)))
          .max(0)
          .pow(2),
        o = Z(0.35, 3, t.w.div(i.add(1)).mul(a)).mul(
          b.dot(n.div(i.sqrt())).max(0).pow(4).mul(0.85).add(0.15),
        );
      ee = ee.add(t.xyz.mul(o));
    }
    let te = kr(ee),
      D = kr(b.dot(this.sunDirection).max(0).pow(8).mul(0.97).add(0.03)),
      ne = kr(S.mul(C).mul(d.z)),
      re = kr(v.y.sub(t.height).max(0).mul(t.falloff).negate().exp()),
      ie = kr(v),
      ae = this.shadowMatrix.mul(U(ie, 1)).xyz,
      oe = Z(
        0.005,
        0.06,
        dr(dr(ae.x, ae.y), dr(ae.x.oneMinus(), ae.y.oneMinus())),
      )
        .mul(Z(0, 0.015, ae.z))
        .mul(Z(0, 0.015, ae.z.oneMinus())),
      se = this.shadowDepth
        .sample(q(ae.x, ae.y.oneMinus()))
        .compare(ae.z.add(this.shadowBias)),
      ce = this.sunPower.mul(D).mul(Y(1, se.mul(oe), this.shadowEnabled)),
      le = te.add(this.sunColor.mul(ce)),
      ue = le.x.max(le.y).max(le.z),
      O = X().sub(0.5).mul(2).length(),
      de = O.mul(O).oneMinus().max(0).pow(2);
    ((T.colorNode = Y(
      J(0.55, 0.5, 0.42),
      le.div(ue.max(0.001)).mul(1.25),
      Z(0, 0.03, ue),
    )),
      (T.opacityNode = de
        .mul(ne)
        .mul(re)
        .mul(ue.mul(0.3).add(6e-4).min(0.24))
        .mul(this.intensity)),
      (this.mesh = new M(a, T)),
      (this.mesh.name = `Ambient dust particles`),
      (this.mesh.visible = this.intensity.value > 0),
      (this.mesh.frustumCulled = !1),
      (this.mesh.castShadow = this.mesh.receiveShadow = !1));
  }
  setIntensity(e) {
    ((this.intensity.value = tS(e)),
      this.mesh && (this.mesh.visible = this.intensity.value > 0));
  }
  update(e, t, n, r, i, a, o = r ? eS.highCount : eS.performanceCount) {
    ((this.high = r),
      (this.motion = !i),
      Number.isFinite(e) &&
        e > 0 &&
        this.motion &&
        (this.clock.value += Math.min(e, 0.1)),
      t.getWorldPosition(this.eye.value),
      this.right.value.setFromMatrixColumn(t.matrixWorld, 0),
      this.up.value.setFromMatrixColumn(t.matrixWorld, 1),
      (this.projectionScale.value =
        Math.max(1, n) / (2 * Math.tan(F.degToRad(t.fov / 2)))),
      this.lighting.sun.getWorldPosition(this.sunDirection.value),
      this.sunDirection.value
        .sub(this.lighting.sun.target.getWorldPosition(this.target))
        .normalize(),
      this.sunColor.value.copy(this.lighting.sun.color));
    let s = r
      ? this.lighting.shadows.slots.find(
          (e) => e.active.value > 0 && e.caster.shadow.map?.depthTexture,
        )
      : void 0;
    ((this.shadowEnabled.value = +!!s),
      (this.sunPower.value =
        (this.lighting.sun.intensity / 4) *
        (this.night ? 0.12 : 1) *
        (s ? 1 : 1 - is(a, !0))),
      s &&
        ((this.shadowDepth.value = s.caster.shadow.map.depthTexture),
        (this.shadowMatrix.value = s.caster.shadow.matrix),
        (this.shadowBias.value = s.caster.shadow.bias)));
    for (let { light: e, positionRange: t, colorPower: n } of this.locals)
      (t.value.set(
        e.position.x,
        e.position.y,
        e.position.z,
        Math.min(e.distance, 12),
      ),
        n.value.set(e.color.r, e.color.g, e.color.b, e.intensity));
    ((this.mesh.geometry.instanceCount = Math.round(
      F.clamp(o, 0, eS.highCount),
    )),
      (this.mesh.visible = this.intensity.value > 0 && o > 0));
  }
  snapshot() {
    return {
      enabled: this.mesh.visible,
      intensity: this.intensity.value,
      count: this.mesh.geometry.instanceCount,
      capacity: eS.highCount,
      drawCalls: +!!this.mesh.visible,
      quality: this.high ? `high` : `performance`,
      clock: +this.clock.value.toFixed(3),
      motion: this.motion,
      sunOcclusion: this.shadowEnabled.value > 0,
      maxPixels: eS.maxPixels,
      radius: eS.radius,
      simulation: `gpu`,
    };
  }
  dispose() {
    (this.mesh.removeFromParent(),
      this.mesh.geometry.dispose(),
      this.mesh.material.dispose(),
      this.placeholderTarget.dispose(),
      this.placeholder.dispose());
  }
};
(g.high.resolution.maxPixels,
  g.low.resolution.maxPixels,
  g.high.resolution.maxDpr,
  g.low.resolution.maxDpr);
function iS(e) {
  let t;
  function n() {
    (t?.removeEventListener(`change`, r),
      (t = matchMedia(`(resolution: ${devicePixelRatio}dppx)`)),
      t.addEventListener(`change`, r));
  }
  function r() {
    (n(), e());
  }
  return (n(), () => t?.removeEventListener(`change`, r));
}
var aS = (e) => e.backend;
function oS(e) {
  let t = aS(e);
  t.trackTimestamp = !1;
  let n = t.isWebGPUBackend ? t.get?.(e.getCanvasTarget())?.descriptor : void 0;
  n && (n.timestampWrites = void 0);
}
