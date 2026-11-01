// assets__game-D43Oxqny 86 — mul
// Lines 34704-35025 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var JS = class {
    constructor(e, t, n, r, i, o, s = a(`high`), c) {
      ((this.renderer = e),
        (this.camera = n),
        (this.speedBlur = R(0)),
        (this.focus = R(new p(0.5, 0.5))),
        (this.sharpness = R(IS)),
        (this.aspect = R(16 / 9)),
        (this.texel = R(new p(1, 1))),
        (this.frame = R(0)),
        (this.smaaPass = null),
        (this.displayTarget = null),
        (this.topology = ``),
        (this.graphRevision = 0),
        (this.disposed = !1),
        (this.graphics = s),
        (this.active = qS(s)),
        (this.pipeline = new Pn(e)),
        (this.pipeline.outputColorTransform = !1));
      let l = (this.scenePass = Ei(t, n, {
        samples: this.active.msaa ? 4 : 0,
        type: e.getOutputBufferType(),
      }));
      this.releaseSceneContext = zS(e, l.renderTarget);
      let u = l.getTextureNode(`output`);
      ((this.ambientOcclusion = new kS(e, t, n)),
        (this.sunScattering = new MS(l.getTextureNode(`depth`), n, r, i, o, c)),
        (this.bloomPass = hx(u, NS.strength, NS.radius, NS.threshold)),
        (this.bloomPass.smoothWidth.value = NS.knee),
        (this.bloomPass.highPassFn = US),
        this.applyGraphics(s));
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
      let t = qS(e),
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
        i = Si(
          Hi(() => {
            let t = X(),
              i = q(this.aspect, 1),
              a = Pi(t.sub(0.5).mul(i)).mul(2).toVar(),
              o = this.speedBlur.mul(Z(PS.inner, PS.outer, a)).toVar(),
              s = J(n.sample(t).rgb).toVar();
            e.speedBlur &&
              ci(o.greaterThan(0.002), () => {
                let r = t
                    .sub(this.focus)
                    .mul(o.mul(PS.length / e.blurTaps))
                    .toVar(),
                  i = Tr(Fr.xy),
                  a = J(s).toVar();
                (di(e.blurTaps - 1, ({ i: e }) => {
                  let o = r.mul(V(e).add(i).add(0.5));
                  a.addAssign(n.sample(t.sub(o)).level(V(0)).rgb);
                }),
                  s.assign(a.div(e.blurTaps)));
              });
            let c = s.toVar();
            if (
              (e.bloom && c.addAssign(r.rgb),
              e.scattering && c.addAssign(this.sunScattering.output),
              !e.vignette)
            )
              return U(c, 1);
            let l = Z(0.35, 1.05, Pi(t.sub(0.5).mul(i)).div(Pi(i.mul(0.5))))
              .mul(FS)
              .oneMinus();
            return U(c.mul(l), 1);
          })(),
          t.toneMapping,
          t.outputColorSpace,
        ),
        a = null;
      ((e.smaa || e.sharpening) &&
        ((this.displayTarget = mr(i, null, null, {
          type: Kt,
          depthBuffer: !1,
        })),
        (this.displayTarget.updateBeforeType = Mi.FRAME),
        (a = this.displayTarget)),
        e.smaa &&
          ((this.smaaPass = xS(a)), (a = this.smaaPass.getTextureNode())));
      let o = new URLSearchParams(location.search).has(`aoDebug`),
        s = this.ambientOcclusion.filtered;
      ((this.pipeline.outputNode = Hi(() => {
        if (o) return U(J(s.sample(X()).r), 1);
        let t = X(),
          n = e.sharpening
            ? (() => {
                let e = (e, n) =>
                    a.sample(t.add(q(e, n).mul(this.texel))).level(V(0)).rgb,
                  n = J(e(0, 0)).toVar(),
                  r = e(0, -1),
                  i = e(-1, 0),
                  o = e(1, 0),
                  s = e(0, 1),
                  c = dr(dr(r, i), dr(o, s)).toVar(),
                  l = H(H(r, i), H(o, s)).toVar(),
                  u = dr(c, n).div(H(l.mul(4), J(1e-4))),
                  d = J(1)
                    .sub(H(l, n))
                    .div(dr(c.mul(4).sub(4), J(-1e-4))),
                  f = H(u.negate(), d).toVar(),
                  p = H(V(-0.1875), dr(H(f.r, H(f.g, f.b)), V(0)))
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
        if (!e.dither) return U(n, 1);
        let r = Fr.xy.add(this.frame.mul(5.588238)),
          c = Tr(r)
            .add(Tr(r.add(q(47, 17))))
            .sub(1)
            .div(255);
        return U(n.add(c), 1);
      })()),
        (this.pipeline.needsUpdate = !0),
        this.graphRevision++);
    }
    update(e, t, n, r) {
      if (
        ((this.speedBlur.value = HS(
          this.speedBlur.value,
          this.active.speedBlur ? t : 0,
          e,
        )),
        !(e > 0) ||
          (GS.copy(n).project(r), GS.z > 1 || !Number.isFinite(GS.x + GS.y)))
      )
        return;
      let i = 1 - Math.exp(-e * 6),
        a = this.focus.value;
      ((a.x += (F.clamp((GS.x + 1) / 2, 0.3, 0.7) - a.x) * i),
        (a.y += (F.clamp((1 - GS.y) / 2, 0.3, 0.65) - a.y) * i));
    }
    reset() {
      ((this.speedBlur.value = 0), this.focus.value.set(0.5, 0.5));
    }
    async prepare(e, t = () => {}) {
      if (this.disposed) return;
      let n = this.renderer,
        r = xt.saveRendererState(n),
        i = n.contextNode,
        a = n.getDrawingBufferSize(new p());
      this.scenePass.setSize(Math.max(1, a.x), Math.max(1, a.y));
      try {
        if (
          (n.initRenderTarget(this.scenePass.renderTarget),
          await this.ambientOcclusion.prepare(e, (e) => t(e * 0.3)),
          this.disposed ||
            (n.setRenderTarget(this.scenePass.renderTarget),
            n.setMRT(null),
            (n.toneMapping = 0),
            (n.outputColorSpace = $t.workingColorSpace),
            await n.compileAsync(this.scenePass.scene, this.camera),
            this.disposed))
        )
          return;
        t(0.9);
      } finally {
        this.disposed || ((n.contextNode = i), xt.restoreRendererState(n, r));
      }
      try {
        if (this.disposed) return;
        (this.render(), t(1));
      } finally {
        this.disposed || ((n.contextNode = i), xt.restoreRendererState(n, r));
      }
    }
    render() {
      let e = this.renderer.getDrawingBufferSize(WS),
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
        active: KS(this.graphics),
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
  YS = {
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
  XS = {
    canopy: 0.8,
    gold: 0.85,
    copper: 0.9,
    titanium: 0.6,
    enamel: 0.45,
    ceramic: 0.35,
    carbon: 0.25,
  },
  ZS = {
    "Meridian tower glass": 0.45,
    "Meridian hotel glass": 0.45,
    "Meridian clear glass": 0.5,
    "Meridian champagne": 0.5,
    "Meridian brass": 0.55,
    "Meridian chrome": 0.6,
  };
function QS(e, t = !1) {
  if (e.name === `Solstice sea` || e.name === `nightWater`)
    return { kind: `planar`, weight: 0.85 };
  if (t) {
    let t = XS[e.userData.surfaceFinish];
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
  let n = ZS[e.name];
  return n ? { kind: `probe`, weight: n } : null;
}
function $S(e) {
  return Number.isFinite(e) ? Math.min(1, Math.max(0, e)) : 1;
}
function eC(e) {
  let t = new URLSearchParams(e).get(`reflections`);
  return t === null || t.trim() === `` ? YS.intensity : $S(Number(t));
}
function tC(e, t) {
  let n = Math.min(YS.planarScale, YS.planarMaxSize / Math.max(1, e, t));
  return [Math.max(1, Math.round(e * n)), Math.max(1, Math.round(t * n))];
}
