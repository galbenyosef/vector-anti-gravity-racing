// assets__game-CsnOSIff 86 — mul
// Lines 34543-34864 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var IS = class {
    constructor(e, t, n, r, i, a, o = Xe(`high`), s) {
      ((this.renderer = e),
        (this.camera = n),
        (this.speedBlur = L(0)),
        (this.focus = L(new b(0.5, 0.5))),
        (this.sharpness = L(wS)),
        (this.aspect = L(16 / 9)),
        (this.texel = L(new b(1, 1))),
        (this.frame = L(0)),
        (this.smaaPass = null),
        (this.displayTarget = null),
        (this.topology = ``),
        (this.graphRevision = 0),
        (this.disposed = !1),
        (this.graphics = o),
        (this.active = FS(o)),
        (this.pipeline = new _n(e)),
        (this.pipeline.outputColorTransform = !1));
      let c = (this.scenePass = Ti(t, n, {
        samples: this.active.msaa ? 4 : 0,
        type: e.getOutputBufferType(),
      }));
      this.releaseSceneContext = DS(e, c.renderTarget);
      let l = c.getTextureNode(`output`);
      ((this.ambientOcclusion = new _S(e, t, n)),
        (this.sunScattering = new bS(c.getTextureNode(`depth`), n, r, i, a, s)),
        (this.bloomPass = rx(l, xS.strength, xS.radius, xS.threshold)),
        (this.bloomPass.smoothWidth.value = xS.knee),
        (this.bloomPass.highPassFn = jS),
        this.applyGraphics(o));
    }
    applyGraphics(e) {
      ((this.graphics = e),
        this.ambientOcclusion.apply(e.ambientOcclusion),
        this.sunScattering.apply({
          enabled: e.atmosphere.scattering,
          intensity: e.atmosphere.scatteringIntensity,
          resolution: e.atmosphere.scatteringResolution,
          steps: e.atmosphere.scatteringSteps,
        }),
        (this.bloomPass.strength.value = e.bloom.strength),
        (this.bloomPass.radius.value = e.bloom.radius),
        (this.bloomPass.threshold.value = e.bloom.threshold),
        this.bloomPass.setResolutionScale(e.bloom.resolution));
      let t = FS(e),
        n = JSON.stringify({ ...t, ao: !1 });
      if (((this.active = t), n === this.topology)) return;
      this.topology = n;
      let r = t.msaa ? 4 : 0;
      (this.scenePass.renderTarget.samples !== r &&
        ((this.scenePass.options.samples = r),
        (this.scenePass.renderTarget.samples = r),
        this.scenePass.renderTarget.dispose()),
        this.rebuild());
    }
    disposeDisplay() {
      if (
        (this.smaaPass?.dispose(), (this.smaaPass = null), this.displayTarget)
      ) {
        this.displayTarget.renderTarget?.dispose();
        let e = this.displayTarget._quadMesh.material;
        for (let t of Array.isArray(e) ? e : [e]) t.dispose();
        this.displayTarget = null;
      }
    }
    rebuild() {
      this.disposeDisplay();
      let e = { ...this.active },
        t = this.renderer,
        n = this.scenePass.getTextureNode(`output`),
        r = this.bloomPass,
        i = xi(
          Vi(() => {
            let t = X(),
              i = K(this.aspect, 1),
              a = Ni(t.sub(0.5).mul(i)).mul(2).toVar(),
              o = this.speedBlur.mul(Z(SS.inner, SS.outer, a)).toVar(),
              s = q(n.sample(t).rgb).toVar();
            e.speedBlur &&
              ci(o.greaterThan(0.002), () => {
                let r = t
                    .sub(this.focus)
                    .mul(o.mul(SS.length / e.blurTaps))
                    .toVar(),
                  i = Tr(Fr.xy),
                  a = q(s).toVar();
                (di(e.blurTaps - 1, ({ i: e }) => {
                  let o = r.mul(B(e).add(i).add(0.5));
                  a.addAssign(n.sample(t.sub(o)).level(B(0)).rgb);
                }),
                  s.assign(a.div(e.blurTaps)));
              });
            let c = s.toVar();
            if (
              (e.bloom && c.addAssign(r.rgb),
              e.scattering && c.addAssign(this.sunScattering.output),
              !e.vignette)
            )
              return H(c, 1);
            let l = Z(0.35, 1.05, Ni(t.sub(0.5).mul(i)).div(Ni(i.mul(0.5))))
              .mul(CS)
              .oneMinus();
            return H(c.mul(l), 1);
          })(),
          t.toneMapping,
          t.outputColorSpace,
        ),
        a = null;
      ((e.smaa || e.sharpening) &&
        ((this.displayTarget = mr(i, null, null, {
          type: kn,
          depthBuffer: !1,
        })),
        (this.displayTarget.updateBeforeType = ji.FRAME),
        (a = this.displayTarget)),
        e.smaa &&
          ((this.smaaPass = lS(a)), (a = this.smaaPass.getTextureNode())));
      let o = new URLSearchParams(location.search).has(`aoDebug`),
        s = this.ambientOcclusion.filtered;
      ((this.pipeline.outputNode = Vi(() => {
        if (o) return H(q(s.sample(X()).r), 1);
        let t = X(),
          n = e.sharpening
            ? (() => {
                let e = (e, n) =>
                    a.sample(t.add(K(e, n).mul(this.texel))).level(B(0)).rgb,
                  n = q(e(0, 0)).toVar(),
                  r = e(0, -1),
                  i = e(-1, 0),
                  o = e(1, 0),
                  s = e(0, 1),
                  c = dr(dr(r, i), dr(o, s)).toVar(),
                  l = V(V(r, i), V(o, s)).toVar(),
                  u = dr(c, n).div(V(l.mul(4), q(1e-4))),
                  d = q(1)
                    .sub(V(l, n))
                    .div(dr(c.mul(4).sub(4), q(-1e-4))),
                  f = V(u.negate(), d).toVar(),
                  p = V(B(-0.1875), dr(V(f.r, V(f.g, f.b)), B(0)))
                    .mul(Ir(this.sharpness.negate()))
                    .toVar();
                return r
                  .add(i)
                  .add(o)
                  .add(s)
                  .mul(p)
                  .add(n)
                  .div(p.mul(4).add(1));
              })()
            : a
              ? a.sample(t).rgb
              : i.rgb;
        if (!e.dither) return H(n, 1);
        let r = Fr.xy.add(this.frame.mul(5.588238)),
          c = Tr(r)
            .add(Tr(r.add(K(47, 17))))
            .sub(1)
            .div(255);
        return H(n.add(c), 1);
      })()),
        (this.pipeline.needsUpdate = !0),
        this.graphRevision++);
    }
    update(e, t, n, r) {
      if (
        ((this.speedBlur.value = AS(
          this.speedBlur.value,
          this.active.speedBlur ? t : 0,
          e,
        )),
        !(e > 0) ||
          (NS.copy(n).project(r), NS.z > 1 || !Number.isFinite(NS.x + NS.y)))
      )
        return;
      let i = 1 - Math.exp(-e * 6),
        a = this.focus.value;
      ((a.x += (s.clamp((NS.x + 1) / 2, 0.3, 0.7) - a.x) * i),
        (a.y += (s.clamp((1 - NS.y) / 2, 0.3, 0.65) - a.y) * i));
    }
    reset() {
      ((this.speedBlur.value = 0), this.focus.value.set(0.5, 0.5));
    }
    async prepare(e, t = () => {}) {
      if (this.disposed) return;
      let n = this.renderer,
        r = Pn.saveRendererState(n),
        i = n.contextNode,
        a = n.getDrawingBufferSize(new b());
      this.scenePass.setSize(Math.max(1, a.x), Math.max(1, a.y));
      try {
        if (
          (n.initRenderTarget(this.scenePass.renderTarget),
          await this.ambientOcclusion.prepare(e, (e) => t(e * 0.3)),
          this.disposed ||
            (n.setRenderTarget(this.scenePass.renderTarget),
            n.setMRT(null),
            (n.toneMapping = 0),
            (n.outputColorSpace = xe.workingColorSpace),
            await n.compileAsync(this.scenePass.scene, this.camera),
            this.disposed))
        )
          return;
        t(0.9);
      } finally {
        this.disposed || ((n.contextNode = i), Pn.restoreRendererState(n, r));
      }
      try {
        if (this.disposed) return;
        (this.render(), t(1));
      } finally {
        this.disposed || ((n.contextNode = i), Pn.restoreRendererState(n, r));
      }
    }
    render() {
      let e = this.renderer.getDrawingBufferSize(MS),
        t = Math.max(1, e.x),
        n = Math.max(1, e.y);
      (this.texel.value.set(1 / t, 1 / n),
        (this.aspect.value = t / n),
        this.sunScattering.update(t, n),
        (this.frame.value = (this.frame.value + 1) % 64),
        this.ambientOcclusion.render(),
        this.pipeline.render());
    }
    snapshot() {
      return {
        active: PS(this.graphics),
        graphRevision: this.graphRevision,
        stages: {
          ...this.active,
          scattering:
            this.active.scattering && this.sunScattering.snapshot().enabled,
        },
        quality: this.graphics.postProcessing.quality,
        antialiasing: this.active.msaa
          ? `msaa-4x${this.active.smaa ? `+smaa` : ``}`
          : this.graphics.antiAliasing,
        msaaSamples: this.active.msaa ? 4 : 0,
        toneMapping: `aces-filmic-graded`,
        ambientOcclusion: this.ambientOcclusion.snapshot(),
        sunScattering: this.sunScattering.snapshot(),
        bloom: {
          enabled: this.active.bloom,
          resolution: this.bloomPass.getResolutionScale(),
          threshold: this.bloomPass.threshold.value,
          strength: this.bloomPass.strength.value,
        },
        sharpening: this.active.sharpening ? `rcas` : `off`,
        speedBlur: this.active.speedBlur ? +this.speedBlur.value.toFixed(3) : 0,
        temporalHistory: !1,
      };
    }
    dispose() {
      this.disposed ||
        ((this.disposed = !0),
        this.releaseSceneContext(),
        this.scenePass.dispose(),
        this.ambientOcclusion.dispose(),
        this.sunScattering.dispose(),
        this.bloomPass.dispose(),
        this.disposeDisplay(),
        this.pipeline.dispose());
    }
  },
  LS = {
    intensity: 1,
    cubeSize: 128,
    probeInterval: 0.25,
    probeFade: [25, 90],
    staticFade: [40, 140],
    planarScale: 0.33,
    planarMaxSize: 512,
    planarInterval: 1 / 30,
    roughnessFade: [0.25, 0.7],
  },
  RS = {
    canopy: 0.8,
    gold: 0.85,
    copper: 0.9,
    titanium: 0.6,
    enamel: 0.45,
    ceramic: 0.35,
    carbon: 0.25,
  },
  zS = {
    "Meridian tower glass": 0.45,
    "Meridian hotel glass": 0.45,
    "Meridian clear glass": 0.5,
    "Meridian champagne": 0.5,
    "Meridian brass": 0.55,
    "Meridian chrome": 0.6,
  };
function BS(e, t = !1) {
  if (e.name === `Solstice sea` || e.name === `nightWater`)
    return { kind: `planar`, weight: 0.85 };
  if (t) {
    let t = RS[e.userData.surfaceFinish];
    return t ? { kind: `probe`, weight: t } : null;
  }
  if (e.name === `solarGlass`) return { kind: `probe`, weight: 0.6 };
  if (e.name === `Nocturne glazing` || e.name === `Solstice shared PBR atlas`)
    return { kind: `probe`, weight: 0.4 };
  if (e.name === `Nocturne metal`) return { kind: `probe`, weight: 0.55 };
  if (e.name === `Nocturne trim atlas`) return { kind: `probe`, weight: 0.35 };
  if (e.name === `Shackleton stainless`) return { kind: `probe`, weight: 0.55 };
  if (e.name === `Shackleton MLI gold`) return { kind: `probe`, weight: 0.4 };
  if (e.name === `Shackleton dome glass`) return { kind: `probe`, weight: 0.6 };
  let n = zS[e.name];
  return n ? { kind: `probe`, weight: n } : null;
}
function VS(e) {
  return Number.isFinite(e) ? Math.min(1, Math.max(0, e)) : 1;
}
function HS(e) {
  let t = new URLSearchParams(e).get(`reflections`);
  return t === null || t.trim() === `` ? LS.intensity : VS(Number(t));
}
function US(e, t) {
  let n = Math.min(LS.planarScale, LS.planarMaxSize / Math.max(1, e, t));
  return [Math.max(1, Math.round(e * n)), Math.max(1, Math.round(t * n))];
}
