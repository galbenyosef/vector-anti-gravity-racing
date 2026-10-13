// assets__game-CsnOSIff 84 — mul
// Lines 33834-34473 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var _S = class {
    constructor(e, t, n, r = pS(location.search)) {
      ((this.renderer = e),
        (this.scene = t),
        (this.camera = n),
        (this.strength = L(1)),
        (this.intensity = L(1)),
        (this.radius = L(1)),
        (this.slices = L(3, `int`)),
        (this.steps = L(6, `int`)),
        (this.size = L(new b(1, 1))),
        (this.prepass = new ze(1, 1, {
          type: kn,
          depthBuffer: !0,
          depthTexture: new We(1, 1),
          minFilter: u,
          magFilter: u,
        })),
        (this.raw = new ze(1, 1, {
          type: qn,
          format: Ue,
          depthBuffer: !1,
          minFilter: u,
          magFilter: u,
        })),
        (this.result = new ze(1, 1, { type: kn, format: Ue, depthBuffer: !1 })),
        (this.normalMaterial = new dn()),
        (this.gtaoMaterial = new dn()),
        (this.filterMaterial = new dn()),
        (this.quad = new pt()),
        (this.rendered = !1),
        (this.disposed = !1),
        (this.drawOccluder = (e, ...t) => {
          if (e.userData.craftProxy) return this.renderer.renderObject(e, ...t);
          e.userData.proxied ||
            !gS(t[3]) ||
            this.renderer.renderObject(e, ...t);
        }),
        (this.settings = { ...r }),
        (this.prepass.texture.name = `AO pre-pass normals`),
        (this.prepass.depthTexture.name = `AO pre-pass depth`),
        (this.raw.texture.name = `AO (raw)`),
        (this.result.texture.name = `AO`),
        (this.normalMaterial.name = `AO depth-normal pre-pass`),
        (this.normalMaterial.side = 2),
        (this.normalMaterial.fragmentNode = H(Ci, 1)));
      let i = R(this.prepass.depthTexture),
        a = R(this.prepass.texture),
        o = R(this.raw.texture),
        s = L(n.projectionMatrix),
        c = L(n.projectionMatrixInverse),
        l = Wr(`near`, `float`, n),
        d = Wr(`far`, `float`, n),
        f = (e) => mi(i.sample(e).r, l, d).negate(),
        p = this.size;
      ((this.gtaoMaterial.name = `AO (GTAO)`),
        (this.gtaoMaterial.fragmentNode = Vi(() => {
          let e = X(),
            t = i.sample(e).r.toVar(),
            n = B(1).toVar();
          return (
            ci(t.lessThan(1), () => {
              let r = hr(e, t, c).toVar(),
                o = a.sample(e).rgb.normalize().toVar(),
                l = r.negate().normalize().toVar(),
                u = e.mul(p).floor(),
                d = u.x.mod(5),
                f = u.y.mod(5),
                m = d
                  .add(f.add(d.mul(2)).mod(5).mul(5))
                  .add(0.5)
                  .div(25),
                h = d.mul(3).add(f.mul(2)).mod(5).add(0.5).div(5),
                g = B(this.slices),
                _ = B(0).toVar();
              (di(
                { start: 0, end: this.slices, type: `int`, condition: `<` },
                ({ i: t }) => {
                  let n = B(t).add(m).div(g).mul(wi),
                    a = q(Rr(n), Hr(n), 0).toVar(),
                    u = bi(a, l).normalize().toVar(),
                    d = bi(u, l).toVar(),
                    f = o.sub(u.mul(vi(o, u))).toVar(),
                    v = f.length().toVar(),
                    y = f.div(V(v, 1e-4)).toVar(),
                    b = vi(y, d).toVar(),
                    x = Gi(vi(y, l), 0, 1).toVar(),
                    S = b
                      .greaterThanEqual(0)
                      .select(B(1), B(-1))
                      .mul(pi(x))
                      .toVar(),
                    C = bi(y, u).toVar(),
                    w = K(vi(l, C), vi(l, C.negate())).toVar();
                  di(
                    {
                      start: 0,
                      end: this.steps,
                      type: `int`,
                      name: `j`,
                      condition: `<`,
                    },
                    ({ j: t }) => {
                      let n = B(t)
                          .add(h)
                          .div(B(this.steps))
                          .pow(dS.distanceExponent),
                        o = a.mul(this.radius.mul(n)).toVar(),
                        u = J(1, B(2).div(B(t).add(2)), dS.falloff);
                      for (let [t, n] of [
                        [1, `x`],
                        [-1, `y`],
                      ]) {
                        let a = Zi(r.add(o.mul(t)), s)
                            .mul(p)
                            .floor()
                            .add(0.5)
                            .div(p)
                            .toVar(),
                          d = a.sub(e).mul(p).abs(),
                          f = hr(a, i.sample(a).r, c).sub(r).toVar();
                        ci(
                          V(d.x, d.y)
                            .greaterThan(0.5)
                            .and(a.x.greaterThan(0))
                            .and(a.x.lessThan(1))
                            .and(a.y.greaterThan(0))
                            .and(a.y.lessThan(1))
                            .and(Y(f.z).lessThan(dS.thickness)),
                          () => {
                            let e = vi(l, f.normalize());
                            w[n].addAssign(V(0, e.sub(w[n]).mul(u)));
                          },
                        );
                      }
                    },
                  );
                  let T = pi(w.y).toVar(),
                    E = pi(w.x).negate().toVar(),
                    D = Rr(T.mul(2).sub(S))
                      .negate()
                      .add(x)
                      .add(T.mul(2).mul(b)),
                    O = Rr(E.mul(2).sub(S))
                      .negate()
                      .add(x)
                      .add(E.mul(2).mul(b));
                  _.addAssign(v.mul(D.add(O).mul(0.25)));
                },
              ),
                n.assign(Gi(_.div(g), 0, 1).pow(this.intensity)));
            }),
            H(n, 0, 0, 1)
          );
        })()),
        (this.filterMaterial.name = `AO filter`),
        (this.filterMaterial.fragmentNode = Vi(() => {
          let e = X(),
            t = f(e).toVar(),
            [n, r] = dS.fade,
            i = B(1).toVar();
          return (
            ci(t.lessThan(r), () => {
              let s = K(1).div(p),
                c = a.sample(e).rgb.normalize().toVar(),
                l = t.mul(0.03).add(0.08).toVar(),
                u = B(0).toVar(),
                d = B(0).toVar();
              for (let n = -2; n <= 2; n++)
                for (let r = -2; r <= 2; r++) {
                  let i = e.add(K(r, n).mul(s)),
                    p = V(B(1).sub(Y(f(i).sub(t)).div(l)), 0),
                    m = V(vi(a.sample(i).rgb.normalize(), c), 0),
                    h = p.mul(m.mul(m).mul(m.mul(m)));
                  (u.addAssign(o.sample(i).r.mul(h)), d.addAssign(h));
                }
              let m = d.greaterThan(0.001).select(u.div(d), o.sample(e).r);
              i.assign(J(m, 1, Z(n, r, t)));
            }),
            H(i, 0, 0, 1)
          );
        })()));
      let m = R(this.result.texture),
        h = Vi(() => {
          let e = Lr.mul(p).sub(0.5),
            t = e.floor(),
            n = e.sub(t),
            r = ai.z.negate(),
            i = r.mul(0.03).add(0.08).add(Vr(r).mul(3)).toVar(),
            a = B(0).toVar(),
            o = B(0).toVar();
          for (let [e, s] of [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
          ]) {
            let c = t.add(K(e + 0.5, s + 0.5)).div(p),
              l = (e ? n.x : n.x.oneMinus())
                .mul(s ? n.y : n.y.oneMinus())
                .mul(V(B(1).sub(Y(f(c).sub(r)).div(i)), 0));
            (a.addAssign(m.sample(c).r.mul(l)), o.addAssign(l));
          }
          return J(1, o.greaterThan(1e-4).select(a.div(o), 1), this.strength);
        })();
      ((this.context = xr({
        getAO: (e, { material: t }) =>
          t.transparent || !gS(t) ? e : e ? e.mul(h) : h,
      })),
        (this.filtered = m),
        this.apply(this.settings));
    }
    apply(e) {
      Object.assign(this.settings, e);
      let { limits: t } = dS;
      ((this.settings.intensity = s.clamp(
        this.settings.intensity,
        ...t.intensity,
      )),
        (this.settings.radius = s.clamp(this.settings.radius, ...t.radius)),
        (this.settings.resolution = s.clamp(
          this.settings.resolution ?? dS.resolution,
          0.25,
          1,
        )));
      let { quality: n } = this.settings;
      (n !== `off` &&
        ((this.slices.value = uS[n].slices), (this.steps.value = uS[n].steps)),
        (this.intensity.value = this.settings.intensity),
        (this.radius.value = this.settings.radius),
        (this.strength.value =
          n === `off` || this.settings.intensity === 0 ? 0 : 1),
        (n === `off` || this.settings.intensity === 0) && (this.rendered = !1));
    }
    resizeTargets() {
      let e = this.renderer.getDrawingBufferSize(mS),
        t = Math.max(1, Math.round(e.x * this.settings.resolution)),
        n = Math.max(1, Math.round(e.y * this.settings.resolution));
      if (this.prepass.width !== t || this.prepass.height !== n)
        for (let e of [this.prepass, this.raw, this.result]) e.setSize(t, n);
      this.size.value.set(t, n);
    }
    async prepare(e, t = () => {}) {
      if (this.disposed) return;
      if (this.settings.quality === `off` || this.settings.intensity === 0) {
        t(1);
        return;
      }
      this.resizeTargets();
      let n = this.renderer,
        r = Pn.saveRendererState(n);
      Pn.resetRendererState(n, r);
      let i = n.transparent,
        a = this.scene.overrideMaterial,
        o = this.camera.layers.mask,
        s = this.quad.material,
        c = new Set();
      for (let t of e)
        t.traverse((e) => {
          let t = e;
          if (!t.isMesh) return;
          let n = Array.isArray(t.material) ? t.material : [t.material];
          (t.userData.craftProxy || (!t.userData.proxied && n.some(gS))) &&
            c.add(t);
        });
      let l = c.size + 2,
        u = 0;
      try {
        for (let e of [this.prepass, this.raw, this.result])
          n.initRenderTarget(e);
        ((this.scene.overrideMaterial = this.normalMaterial),
          this.camera.layers.enable(6),
          (n.transparent = !1),
          n.setRenderTarget(this.prepass));
        for (let e of c) {
          if (
            this.disposed ||
            (await n.compileAsync(e, this.camera, this.scene), this.disposed)
          )
            return;
          t(++u / l);
        }
        ((this.scene.overrideMaterial = a),
          (this.camera.layers.mask = o),
          (n.transparent = i));
        for (let [e, r] of [
          [this.raw, this.gtaoMaterial],
          [this.result, this.filterMaterial],
        ]) {
          if (
            this.disposed ||
            ((this.quad.material = r),
            n.setRenderTarget(e),
            await n.compileAsync(this.quad, this.quad.camera),
            this.disposed)
          )
            return;
          t(++u / l);
        }
      } finally {
        ((this.quad.material = s),
          (this.scene.overrideMaterial = a),
          (this.camera.layers.mask = o),
          this.disposed ||
            ((n.transparent = i), Pn.restoreRendererState(n, r)));
      }
    }
    render() {
      if (this.settings.quality === `off` || this.settings.intensity === 0)
        return;
      this.resizeTargets();
      let e = this.renderer;
      hS = Pn.resetRendererState(e, hS);
      let t = e.transparent,
        n = this.scene.overrideMaterial,
        r = this.camera.layers.mask;
      try {
        try {
          ((this.scene.overrideMaterial = this.normalMaterial),
            this.camera.layers.enable(6),
            (e.transparent = !1),
            e.setRenderObjectFunction(this.drawOccluder),
            e.setRenderTarget(this.prepass),
            e.render(this.scene, this.camera));
        } finally {
          (e.setRenderObjectFunction(null),
            (this.scene.overrideMaterial = n),
            (this.camera.layers.mask = r),
            (e.transparent = t));
        }
        e.setClearColor(16777215, 1);
        for (let [t, n] of [
          [this.raw, this.gtaoMaterial],
          [this.result, this.filterMaterial],
        ])
          ((this.quad.material = n),
            (this.quad.name = n.name),
            e.setRenderTarget(t),
            this.quad.render(e));
        this.rendered = !0;
      } finally {
        Pn.restoreRendererState(e, hS);
      }
    }
    snapshot() {
      let { quality: e, intensity: t, radius: n } = this.settings,
        r = e === `off` ? null : uS[e];
      return {
        technique: `gtao`,
        appliedTo: `indirect-light`,
        quality: e,
        slices: r?.slices ?? 0,
        steps: r?.steps ?? 0,
        intensity: t,
        radius: n,
        thickness: dS.thickness,
        resolution: this.settings.resolution,
        size: [this.prepass.width, this.prepass.height],
        fade: [...dS.fade],
        temporalHistory: !1,
        rendered: this.rendered,
      };
    }
    dispose() {
      if (!this.disposed) {
        this.disposed = !0;
        for (let e of [this.prepass, this.raw, this.result]) e.dispose();
        for (let e of [
          this.normalMaterial,
          this.gtaoMaterial,
          this.filterMaterial,
        ])
          e.dispose();
      }
    }
  },
  vS = { resolution: 0.25, steps: 16, maxDistance: 260, anisotropy: 0.65 },
  yS = {
    day: {
      name: `coastal-air`,
      strength: 1,
      anisotropy: vS.anisotropy,
      maxDistance: vS.maxDistance,
    },
    sunset: {
      name: `sunset-dust`,
      strength: 2.6,
      anisotropy: 0.48,
      maxDistance: 360,
    },
    metropolis: {
      name: `city-haze`,
      strength: 1.6,
      anisotropy: 0.55,
      maxDistance: 300,
    },
  },
  bS = class {
    constructor(e, t, n, r, i, a = yS.day) {
      ((this.camera = t),
        (this.atmosphere = n),
        (this.sun = r),
        (this.shadows = i),
        (this.profile = a),
        (this.size = L(new b(1, 1))),
        (this.sampleFootprint = L(1 / vS.resolution)),
        (this.eye = L(new g())),
        (this.shadowMatrix = L(new M())),
        (this.shadowBias = L(0)),
        (this.range = L(vS.maxDistance)),
        (this.enabled = L(0)),
        (this.intensity = L(0.35)),
        (this.steps = L(vS.steps, `int`)),
        (this.sunDirection = L(new g())),
        (this.sunColor = L(new _())),
        (this.sunTarget = new g()),
        (this.placeholder = new We(1, 1)),
        (this.placeholderTarget = new ze(1, 1, {
          depthTexture: this.placeholder,
          samples: 0,
        })),
        (this.settings = {
          enabled: !0,
          intensity: n.settings.SUN_SCATTERING_INTENSITY,
          resolution: vS.resolution,
          steps: vS.steps,
        }),
        (this.intensity.value = this.settings.intensity * a.strength),
        (this.range.value = a.maxDistance),
        (this.inverseProjection = L(t.projectionMatrixInverse)),
        (this.worldMatrix = L(t.matrixWorld)),
        (this.placeholder.compareFunction = 515),
        (this.shadowDepth = R(this.placeholder)));
      let o = (t) => hr(t, e.sample(t).r, this.inverseProjection),
        s = Vi(() => {
          let e = X(),
            t = o(e).toVar(),
            r = dr(t.length(), this.range).toVar(),
            i = this.worldMatrix
              .mul(H(t.normalize(), 0))
              .xyz.normalize()
              .toVar(),
            s = B(0).toVar(),
            c = i.dot(this.sunDirection).clamp(-1, 1).toVar(),
            l = a.anisotropy,
            u = B((1 - l) ** 2)
              .div(B(1 + l * l).sub(c.mul(2 * l)))
              .pow(1.5)
              .mul(0.8)
              .add(c.max(0).pow(3).mul(0.2))
              .toVar();
          return (
            ci(
              this.enabled
                .greaterThan(0)
                .and(this.intensity.greaterThan(0))
                .and(n.density.greaterThan(0)),
              () => {
                let t = r.div(B(this.steps)).toVar(),
                  a = Tr(e.mul(this.size)).toVar(),
                  o = B(1).toVar();
                di(
                  { start: 0, end: this.steps, type: `int`, condition: `<` },
                  ({ i: e }) => {
                    let r = B(e).add(a).mul(t).toVar(),
                      c = this.eye.add(i.mul(r)).toVar(),
                      l = n
                        .densityAt(c.y)
                        .mul(t)
                        .toVar()
                        .negate()
                        .exp()
                        .toVar(),
                      u = this.shadowMatrix.mul(H(c, 1)).xyz.toVar(),
                      d = K(u.x, u.y.oneMinus()),
                      f = Z(
                        0.015,
                        0.13,
                        dr(dr(u.x, u.y), dr(u.x.oneMinus(), u.y.oneMinus())),
                      )
                        .mul(Z(0, 0.03, u.z))
                        .mul(Z(0, 0.03, u.z.oneMinus())),
                      p = this.shadowDepth
                        .sample(d)
                        .compare(u.z.add(this.shadowBias));
                    (s.addAssign(o.mul(l.oneMinus()).mul(p).mul(f)),
                      o.mulAssign(l));
                  },
                );
              },
            ),
            H(s.mul(u).mul(this.intensity).mul(this.enabled), r, 0, 1)
          );
        })();
      ((this.raw = mr(s, null, null, {
        type: kn,
        depthBuffer: !1,
        minFilter: u,
        magFilter: u,
      }).setResolutionScale(vS.resolution)),
        (this.raw.updateBeforeType = ji.FRAME),
        (this.filtered = mr(
          Vi(() => {
            let e = X(),
              t = this.raw.sample(e).rg.toVar(),
              n = B(0).toVar(),
              r = B(0).toVar(),
              i = V(
                t.y.mul(0.025).add(0.5),
                dr(Vr(t.y).mul(1.5), t.y.mul(0.2).add(0.5)),
              );
            for (let a = -1; a <= 1; a++)
              for (let o = -1; o <= 1; o++) {
                let s = this.raw.sample(e.add(K(o, a).div(this.size))).rg,
                  c = B(1)
                    .sub(Y(s.y.sub(t.y)).div(i))
                    .max(0)
                    .mul((o === 0 ? 2 : 1) * (a === 0 ? 2 : 1));
                (n.addAssign(s.x.mul(c)), r.addAssign(c));
              }
            return H(n.div(V(r, 1e-4)), t.y, 0, 1);
          })(),
          null,
          null,
          { type: kn, depthBuffer: !1, minFilter: u, magFilter: u },
        ).setResolutionScale(vS.resolution)),
        (this.filtered.updateBeforeType = ji.FRAME),
        (this.output = Vi(() => {
          let e = X(),
            t = dr(o(e).length(), this.range).toVar(),
            n = V(
              t.mul(0.025).add(0.5),
              dr(Vr(t).mul(this.sampleFootprint).mul(1.5), t.mul(0.2).add(0.5)),
            ),
            r = e.mul(this.size).sub(0.5).toVar(),
            i = r.floor(),
            a = r.fract(),
            s = B(0).toVar(),
            c = B(0).toVar();
          for (let [e, r] of [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
          ]) {
            let o = this.filtered.sample(
                i.add(K(e + 0.5, r + 0.5)).div(this.size),
              ).rg,
              l = (e ? a.x : a.x.oneMinus()).mul(r ? a.y : a.y.oneMinus()).mul(
                B(1)
                  .sub(Y(o.y.sub(t)).div(n))
                  .max(0),
              );
            (s.addAssign(o.x.mul(l)), c.addAssign(l));
          }
          return this.sunColor.mul(s.div(V(c, 1e-4))).mul(this.enabled);
        })()));
    }
    apply(e) {
      ((this.settings = { ...e }),
        (this.intensity.value = e.intensity * this.profile.strength),
        (this.steps.value = e.steps),
        (this.sampleFootprint.value = 1 / e.resolution),
        this.raw.setResolutionScale(e.resolution),
        this.filtered.setResolutionScale(e.resolution),
        (!e.enabled || e.intensity === 0) && (this.enabled.value = 0));
    }
    update(e, t) {
      (this.size.value.set(
        Math.max(1, Math.floor(e * this.settings.resolution)),
        Math.max(1, Math.floor(t * this.settings.resolution)),
      ),
        this.camera.getWorldPosition(this.eye.value),
        this.sun.getWorldPosition(this.sunDirection.value),
        this.sunDirection.value
          .sub(this.sun.target.getWorldPosition(this.sunTarget))
          .normalize(),
        this.sunColor.value
          .copy(this.sun.color)
          .multiplyScalar(this.sun.intensity / 4));
      let n = this.shadows.slots.findLast(
          (e) => e.active.value > 0 && e.caster.shadow.map?.depthTexture,
        ),
        r = this.enabled.value;
      this.enabled.value =
        n &&
        this.settings.enabled &&
        this.settings.intensity > 0 &&
        this.atmosphere.settings.FOG_DENSITY > 0
          ? 1
          : 0;
      for (let e of [this.raw, this.filtered])
        ((e.autoUpdate = this.enabled.value > 0),
          r !== this.enabled.value && (e.textureNeedsUpdate = !0));
      n &&
        ((this.shadowDepth.value = n.caster.shadow.map.depthTexture),
        (this.shadowMatrix.value = n.caster.shadow.matrix),
        (this.shadowBias.value = n.caster.shadow.bias),
        (this.range.value = Math.min(
          this.profile.maxDistance,
          n.layout.reach,
        )));
    }
    snapshot() {
      return {
        enabled: this.enabled.value > 0,
        intensity: this.settings.intensity,
        effectiveIntensity: this.intensity.value,
        profile: this.profile.name,
        anisotropy: this.profile.anisotropy,
        maxDistance: this.range.value,
        technique: `shadowed-single-scattering`,
        resolution: this.settings.resolution,
        size: this.size.value.toArray(),
        steps: this.settings.steps,
        additionalShadowDraws: 0,
        temporalHistory: !1,
      };
    }
    dispose() {
      for (let e of [this.raw, this.filtered]) {
        e.renderTarget?.dispose();
        let t = e._quadMesh.material;
        for (let e of Array.isArray(t) ? t : [t]) e.dispose();
      }
      (this.placeholderTarget.dispose(), this.placeholder.dispose());
    }
  },
  xS = {
    strength: 0.3,
    radius: 0.6,
    threshold: 1.05,
    knee: 0.45,
    fireflyClamp: 16,
  },
  SS = { taps: 8, length: 0.065, inner: 0.6, outer: 1.65 },
  CS = 0.16,
  wS = 0.6,
  TS = (e) => Math.min(1, Math.max(0, e)),
  ES = new WeakMap();
