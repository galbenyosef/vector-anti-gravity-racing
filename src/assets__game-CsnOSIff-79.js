// assets__game-CsnOSIff 79 — mul
// Lines 32736-32989 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Gx = class {
  constructor(e, t, n = !1, r = Hx.intensity) {
    ((this.lighting = e),
      (this.night = n),
      (this.clock = L(0)),
      (this.eye = L(new g())),
      (this.right = L(new g(1, 0, 0))),
      (this.up = L(new g(0, 1, 0))),
      (this.projectionScale = L(550)),
      (this.intensity = L(Hx.intensity)),
      (this.sunDirection = L(new g())),
      (this.sunColor = L(new _())),
      (this.sunPower = L(0)),
      (this.shadowMatrix = L(new M())),
      (this.shadowBias = L(0)),
      (this.shadowEnabled = L(0)),
      (this.placeholder = new We(1, 1)),
      (this.placeholderTarget = new ze(1, 1, {
        depthTexture: this.placeholder,
        samples: 0,
      })),
      (this.target = new g()),
      (this.high = !0),
      (this.motion = !0),
      this.setIntensity(r),
      (this.placeholder.compareFunction = 515),
      (this.shadowDepth = R(this.placeholder)),
      (this.locals = [
        e.engine,
        ...e.tunnel,
        ...e.flashes.map(({ light: e }) => e),
      ].map((e) => ({
        light: e,
        positionRange: L(new be()),
        colorPower: L(new be()),
      }))));
    let a = new rt(1, 1),
      o = new rn();
    (o.setIndex(a.getIndex()),
      o.setAttribute(`position`, a.getAttribute(`position`)),
      o.setAttribute(`uv`, a.getAttribute(`uv`)),
      (o.instanceCount = Hx.highCount));
    let s = 1957501243,
      c = () => (
        (s = (Math.imul(s, 1664525) + 1013904223) >>> 0),
        s / 4294967296
      ),
      l = Array.from(
        { length: 3 },
        () => new Ct(new Float32Array(Hx.highCount * 4), 4),
      );
    for (let e = 0; e < Hx.highCount; e++)
      (l[0].setXYZW(
        e,
        (c() - 0.5) * Hx.radius * 2,
        (c() - 0.5) * Hx.radius * 2,
        (c() - 0.5) * Hx.radius * 2,
        c() * Math.PI * 2,
      ),
        l[1].setXYZW(
          e,
          (c() - 0.5) * 0.07,
          (c() - 0.5) * 0.025,
          (c() - 0.5) * 0.07,
          24 + c() * 28,
        ),
        l[2].setXYZW(
          e,
          c(),
          0.009 + c() * 0.013,
          0.65 + c() * 0.35,
          0.07 + c() * 0.07,
        ));
    let [u, d, f] = l.map(
        (e, t) => (o.setAttribute(`dustRecord${t}`, e), Gr(e, `vec4`)),
      ),
      p = u.w,
      m = this.clock.mul(f.w),
      h = u.xyz
        .add(d.xyz.mul(this.clock))
        .add(
          q(
            Hr(m.add(p)).mul(0.25),
            Hr(m.mul(0.73).add(p.mul(1.7))).mul(0.12),
            Hr(m.mul(0.89).add(p.mul(2.3))).mul(0.25),
          ),
        ),
      v = Hx.radius * 2,
      y = h.sub(this.eye).add(Hx.radius),
      b = y.sub(y.div(v).floor().mul(v)).sub(Hx.radius),
      x = this.eye.add(b),
      S = b.length(),
      C = b.div(S.max(0.001)),
      w = this.clock.div(d.w).add(f.x).fract(),
      T = Z(0, 0.12, w).mul(Z(0.8, 1, w).oneMinus()),
      E = Z(1, 2, S).mul(Z(Hx.radius * 0.65, Hx.radius, S).oneMinus()),
      D = dr(f.y, S.mul(Hx.maxPixels).div(this.projectionScale)),
      O = new i({
        transparent: !0,
        depthWrite: !1,
        side: 2,
        forceSinglePass: !0,
        fog: !0,
      });
    ((O.name = `Light-catching ambient dust`),
      (O.positionNode = x.add(
        this.right.mul(Wi.x.mul(D)).add(this.up.mul(Wi.y.mul(D))),
      )));
    let ee = q(0);
    for (let { positionRange: e, colorPower: t } of this.locals) {
      let n = e.xyz.sub(x),
        r = e.w.max(0.001),
        i = n.dot(n).max(0.25),
        a = B(1)
          .sub(i.div(r.mul(r)))
          .max(0)
          .pow(2),
        o = Z(0.35, 3, t.w.div(i.add(1)).mul(a)).mul(
          C.dot(n.div(i.sqrt())).max(0).pow(4).mul(0.85).add(0.15),
        );
      ee = ee.add(t.xyz.mul(o));
    }
    let te = kr(ee),
      k = kr(C.dot(this.sunDirection).max(0).pow(8).mul(0.97).add(0.03)),
      ne = kr(T.mul(E).mul(f.z)),
      re = kr(x.y.sub(t.height).max(0).mul(t.falloff).negate().exp()),
      A = kr(x),
      ie = this.shadowMatrix.mul(H(A, 1)).xyz,
      ae = Z(
        0.005,
        0.06,
        dr(dr(ie.x, ie.y), dr(ie.x.oneMinus(), ie.y.oneMinus())),
      )
        .mul(Z(0, 0.015, ie.z))
        .mul(Z(0, 0.015, ie.z.oneMinus())),
      oe = this.shadowDepth
        .sample(K(ie.x, ie.y.oneMinus()))
        .compare(ie.z.add(this.shadowBias)),
      se = this.sunPower.mul(k).mul(J(1, oe.mul(ae), this.shadowEnabled)),
      ce = te.add(this.sunColor.mul(se)),
      le = ce.x.max(ce.y).max(ce.z),
      ue = X().sub(0.5).mul(2).length(),
      de = ue.mul(ue).oneMinus().max(0).pow(2);
    ((O.colorNode = J(
      q(0.55, 0.5, 0.42),
      ce.div(le.max(0.001)).mul(1.25),
      Z(0, 0.03, le),
    )),
      (O.opacityNode = de
        .mul(ne)
        .mul(re)
        .mul(le.mul(0.3).add(6e-4).min(0.24))
        .mul(this.intensity)),
      (this.mesh = new N(o, O)),
      (this.mesh.name = `Ambient dust particles`),
      (this.mesh.visible = this.intensity.value > 0),
      (this.mesh.frustumCulled = !1),
      (this.mesh.castShadow = this.mesh.receiveShadow = !1));
  }
  setIntensity(e) {
    ((this.intensity.value = Ux(e)),
      this.mesh && (this.mesh.visible = this.intensity.value > 0));
  }
  update(e, t, n, r, i, a, o = r ? Hx.highCount : Hx.performanceCount) {
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
        Math.max(1, n) / (2 * Math.tan(s.degToRad(t.fov / 2)))),
      this.lighting.sun.getWorldPosition(this.sunDirection.value),
      this.sunDirection.value
        .sub(this.lighting.sun.target.getWorldPosition(this.target))
        .normalize(),
      this.sunColor.value.copy(this.lighting.sun.color));
    let c = r
      ? this.lighting.shadows.slots.find(
          (e) => e.active.value > 0 && e.caster.shadow.map?.depthTexture,
        )
      : void 0;
    ((this.shadowEnabled.value = +!!c),
      (this.sunPower.value =
        (this.lighting.sun.intensity / 4) *
        (this.night ? 0.12 : 1) *
        (c ? 1 : 1 - rs(a, !0))),
      c &&
        ((this.shadowDepth.value = c.caster.shadow.map.depthTexture),
        (this.shadowMatrix.value = c.caster.shadow.matrix),
        (this.shadowBias.value = c.caster.shadow.bias)));
    for (let { light: e, positionRange: t, colorPower: n } of this.locals)
      (t.value.set(
        e.position.x,
        e.position.y,
        e.position.z,
        Math.min(e.distance, 12),
      ),
        n.value.set(e.color.r, e.color.g, e.color.b, e.intensity));
    ((this.mesh.geometry.instanceCount = Math.round(
      s.clamp(o, 0, Hx.highCount),
    )),
      (this.mesh.visible = this.intensity.value > 0 && o > 0));
  }
  snapshot() {
    return {
      enabled: this.mesh.visible,
      intensity: this.intensity.value,
      count: this.mesh.geometry.instanceCount,
      capacity: Hx.highCount,
      drawCalls: +!!this.mesh.visible,
      quality: this.high ? `high` : `performance`,
      clock: +this.clock.value.toFixed(3),
      motion: this.motion,
      sunOcclusion: this.shadowEnabled.value > 0,
      maxPixels: Hx.maxPixels,
      radius: Hx.radius,
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
(ce.high.resolution.maxPixels,
  ce.low.resolution.maxPixels,
  ce.high.resolution.maxDpr,
  ce.low.resolution.maxDpr);
function Kx(e) {
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
var qx = (e) => e.backend;
function Jx(e) {
  let t = qx(e);
  t.trackTimestamp = !1;
  let n = t.isWebGPUBackend ? t.get?.(e.getCanvasTarget())?.descriptor : void 0;
  n && (n.timestampWrites = void 0);
}
