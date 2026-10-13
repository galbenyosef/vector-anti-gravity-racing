// assets__game-CsnOSIff 87 — visible
// Lines 34865-35463 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var WS = class {
    constructor(e, t, n, r, i = LS.intensity) {
      ((this.renderer = e),
        (this.scene = t),
        (this.player = n),
        (this.captureContext = r),
        (this.intensity = L(LS.intensity)),
        (this.enabled = !1),
        (this.disposed = !1),
        (this.capturing = L(0)),
        (this.probeReady = L(0)),
        (this.probePosition = L(new g())),
        (this.inverseIntensity = L(1)),
        (this.rotationCancel = L(new M())),
        (this.bindings = new Map()),
        (this.planar = []),
        (this.cube = null),
        (this.cubeCamera = null),
        (this.filtered = null),
        (this.generator = null),
        (this.face = 0),
        (this.lastProbe = -1 / 0),
        (this.probeCaptures = 0),
        (this.frameFaces = 0),
        (this.framePlanar = 0),
        (this.size = new b()),
        (this.frustum = new jt()),
        (this.viewProjection = new M()),
        (this.hidden = []),
        (this.pmremNodes = []),
        (this.intensity.value = VS(i)));
    }
    attach(e = this.scene) {
      if (!this.enabled || !this.scene.environment) return;
      this.allocateProbe();
      let t = new Map();
      e.traverse((e) => {
        if (!(e instanceof N)) return;
        let n = this.isPlayer(e),
          r = (r) => {
            if (this.bindings.has(r)) return r;
            let i = BS(r, n);
            if (!i) return r;
            let a = t.get(r);
            if (a) return a;
            if (`isMeshStandardNodeMaterial` in r) a = r;
            else if (r instanceof pe) a = new kt().copy(r);
            else if (r instanceof Ne) a = new I().copy(r);
            else return r;
            (t.set(r, a),
              this.bindings.set(a, {
                material: a,
                original: a.envNode,
                player: n,
              }));
            let o = ti(this.scene.environment),
              s = ti(this.filtered.texture);
            this.pmremNodes.push(o, s);
            let c = null;
            return (
              i.kind === `planar` &&
                ((c = this.createPlanar(e)), this.planar.push(c)),
              (a.envNode = Vi((e) => {
                let t = e.context,
                  r = t.getTextureLevel(),
                  a = B(1)
                    .sub(r.smoothstep(...LS.roughnessFade))
                    .mul(i.weight)
                    .mul(this.intensity)
                    .mul(this.capturing.oneMinus()),
                  l;
                if (c) {
                  let e = c.projection.mul(H(U, 1)),
                    t = e.xy
                      .div(e.w.max(1e-4))
                      .mul(0.5)
                      .add(0.5)
                      .flipY()
                      .add(Hi.xz.mul(0.015)),
                    n = t.min(K(1).sub(t)),
                    i = n.x.min(n.y).smoothstep(0, 0.04),
                    o = r.mul(6).add(0.5).clamp(0, 6);
                  ((l = R(c.target.texture, t.clamp(0, 1), o).rgb),
                    (a = a
                      .mul(i)
                      .mul(e.w.greaterThan(0).select(1, 0))
                      .mul(c.ready)));
                } else {
                  l = s.context({
                    getUV: () =>
                      t.getUV().transformDirection(this.rotationCancel),
                  });
                  let e = n ? LS.probeFade : LS.staticFade;
                  a = a
                    .mul(
                      U.sub(this.probePosition)
                        .length()
                        .smoothstep(e[0], e[1])
                        .oneMinus(),
                    )
                    .mul(this.probeReady);
                }
                return J(o, l.mul(this.inverseIntensity), a);
              })()),
              (a.needsUpdate = !0),
              a
            );
          };
        e.material = Array.isArray(e.material)
          ? e.material.map(r)
          : r(e.material);
      });
      for (let [e, n] of t) e !== n && e.dispose();
      this.refreshHidden();
    }
    isPlayer(e) {
      for (let t = e; t; t = t.parent) if (t === this.player) return !0;
      return !1;
    }
    detach(e) {
      let t = new Set();
      (e.traverse((e) => {
        if ((t.add(e), e instanceof N))
          for (let t of Array.isArray(e.material) ? e.material : [e.material]) {
            let e = this.bindings.get(t);
            e &&
              ((e.material.envNode = e.original),
              (e.material.needsUpdate = !0),
              this.bindings.delete(t));
          }
      }),
        (this.planar = this.planar.filter((e) =>
          t.has(e.mesh) ? (e.target.dispose(), !1) : !0,
        )),
        this.refreshHidden());
    }
    setQuality(e) {
      if (this.enabled !== e) {
        if (((this.enabled = e), e)) this.attach();
        else {
          for (let e of this.bindings.values())
            ((e.material.envNode = e.original), (e.material.needsUpdate = !0));
          (this.bindings.clear(),
            this.planar.forEach((e) => e.target.dispose()),
            (this.planar = []),
            this.cube?.dispose(),
            this.filtered?.dispose(),
            this.generator?.dispose(),
            (this.cube =
              this.filtered =
              this.generator =
              this.cubeCamera =
                null));
        }
        ((this.probeReady.value = 0),
          (this.face = 0),
          (this.lastProbe = -1 / 0));
        for (let e of this.planar) ((e.ready.value = 0), (e.last = -1 / 0));
      }
    }
    setIntensity(e) {
      let t = VS(e);
      if (t === 0 || this.intensity.value === 0) {
        ((this.face = 0),
          (this.lastProbe = -1 / 0),
          (this.probeReady.value = 0));
        for (let e of this.planar) ((e.ready.value = 0), (e.last = -1 / 0));
      }
      this.intensity.value = t;
    }
    allocateProbe() {
      if (this.cube) return;
      let e = this.renderer;
      ((this.cube = new et(LS.cubeSize, { type: kn, generateMipmaps: !1 })),
        (this.cube.texture.name = `Local reflection capture`),
        (this.cubeCamera = new o(0.5, 7500, this.cube)),
        (this.cubeCamera.coordinateSystem = e.coordinateSystem),
        this.cubeCamera.updateCoordinateSystem());
      let t = e.getMRT();
      try {
        (e.setMRT(null),
          this.cube.clear(e),
          (this.generator = new Ut(e)),
          (this.filtered = this.generator.fromCubemap(this.cube.texture)),
          (this.filtered.texture.name = `Roughness-filtered local reflections`));
      } finally {
        e.setMRT(t);
      }
      let n = new M().makeScale(1, -1, 1);
      this.rotationCancel.value
        .copy(n)
        .multiply(new M().makeRotationFromEuler(this.scene.environmentRotation))
        .multiply(n);
    }
    createPlanar(e) {
      let t = new ze(1, 1, { type: kn, generateMipmaps: !0, minFilter: m });
      return (
        (t.texture.name = `Water scenery reflections`),
        {
          mesh: e,
          target: t,
          camera: new wn(),
          projection: L(new M()),
          ready: L(0),
          sourcePosition: new g(),
          last: -1 / 0,
          captures: 0,
        }
      );
    }
    refreshHidden() {
      ((this.hidden = []),
        this.scene.traverse((e) => {
          if (!(e instanceof N) && !(e instanceof Yn)) return;
          let t = Array.isArray(e.material) ? e.material : [e.material];
          (e.userData.reflectionHidden ||
            t.every((e) => e.transparent && !e.depthWrite)) &&
            this.hidden.push(e);
        }));
    }
    prepareTargets(e) {
      if (
        this.disposed ||
        !this.enabled ||
        this.intensity.value === 0 ||
        !this.cube
      )
        return;
      let t = Pn.saveRendererState(this.renderer);
      try {
        this.renderer.initRenderTarget(this.cube);
        for (let t of this.planar)
          (this.configurePlanar(t, e),
            this.renderer.initRenderTarget(t.target));
      } finally {
        Pn.restoreRendererState(this.renderer, t);
      }
    }
    async prepare(e, t = () => {}) {
      if (this.disposed) return;
      if (!this.enabled || this.intensity.value === 0 || !this.cube) {
        t(1);
        return;
      }
      this.prepareTargets(e);
      let n = this.renderer,
        r = Pn.saveRendererState(n),
        i = n.contextNode,
        a = this.hidden.map((e) => e.visible),
        o = this.planar.map((e) => e.mesh.visible),
        s = this.player.visible,
        c = [];
      this.scene.traverse((e) => {
        (e instanceof te || e instanceof $e || e instanceof en) &&
          (c.push([e.shadow, e.shadow.autoUpdate, e.shadow.needsUpdate]),
          (e.shadow.autoUpdate = e.shadow.needsUpdate = !1));
      });
      let l = 7 + this.planar.length * 2,
        u = 0,
        d = async (e) => {
          this.disposed ||
            (await n.compileAsync(this.scene, e), !this.disposed && t(++u / l));
        };
      try {
        (this.hidden.forEach((e) => {
          e.visible = !1;
        }),
          (this.capturing.value = 1),
          (this.inverseIntensity.value =
            1 / Math.max(0.001, this.scene.environmentIntensity)),
          (n.contextNode = this.captureContext),
          n.setMRT(null),
          (n.toneMapping = 0),
          (n.toneMappingExposure = 1),
          (n.autoClear = !0),
          (this.player.visible = !1),
          this.cubeCamera.position
            .copy(this.player.getWorldPosition(new g()))
            .add(new g(0, 0.7, 0)),
          this.cubeCamera.updateMatrixWorld(!0),
          (this.face = 0));
        for (let e = 0; e < 6; e++) {
          if (
            this.disposed ||
            (n.setRenderTarget(this.cube, e),
            e === 0 && (await d(this.cubeCamera.children[e])),
            this.disposed)
          )
            return;
          (this.captureFace(performance.now() / 1e3), t(++u / l));
        }
        this.player.visible = s;
        for (let r of this.planar) {
          if (
            this.disposed ||
            (this.configurePlanar(r, e),
            this.planar.forEach((e) => {
              e.mesh.visible = !1;
            }),
            n.setRenderTarget(r.target),
            await d(r.camera),
            this.disposed)
          )
            return;
          (this.capturePlanar(r, e, performance.now() / 1e3), t(++u / l));
        }
      } finally {
        (this.hidden.forEach((e, t) => {
          e.visible = a[t];
        }),
          this.planar.forEach((e, t) => {
            e.mesh.visible = o[t];
          }),
          (this.player.visible = s));
        for (let [e, t, n] of c) ((e.autoUpdate = t), (e.needsUpdate = n));
        ((this.capturing.value = 0),
          (this.frameFaces = this.framePlanar = 0),
          this.disposed ||
            ((n.contextNode = i), Pn.restoreRendererState(n, r)));
      }
    }
    update(e, t = performance.now() / 1e3) {
      if (
        ((this.frameFaces = this.framePlanar = 0),
        !this.enabled || this.intensity.value === 0 || !this.cube)
      ) {
        this.probeReady.value = 0;
        for (let e of this.planar) e.ready.value = 0;
        return;
      }
      ((this.inverseIntensity.value =
        1 / Math.max(0.001, this.scene.environmentIntensity)),
        this.viewProjection.multiplyMatrices(
          e.projectionMatrix,
          e.matrixWorldInverse,
        ),
        this.frustum.setFromProjectionMatrix(
          this.viewProjection,
          this.renderer.coordinateSystem,
        ));
      let n = this.planar.find(
          (n) =>
            this.isVisible(n.mesh) &&
            e.position.y > n.mesh.getWorldPosition(new g()).y + 0.1 &&
            this.frustum.intersectsObject(n.mesh) &&
            (t - n.last >= LS.planarInterval ||
              n.sourcePosition.distanceToSquared(e.position) > 1600),
        ),
        r = this.face > 0 || t - this.lastProbe >= LS.probeInterval;
      (!n && !r) ||
        this.capture(() => {
          (r && this.captureFace(t), n && this.capturePlanar(n, e, t));
        });
    }
    capture(e) {
      let t = this.renderer,
        n = {
          target: t.getRenderTarget(),
          face: t.getActiveCubeFace(),
          mip: t.getActiveMipmapLevel(),
          mrt: t.getMRT(),
          context: t.contextNode,
          tone: t.toneMapping,
          clear: t.autoClear,
          exposure: t.toneMappingExposure,
        },
        r = this.hidden,
        i = r.map((e) => e.visible),
        a = [];
      (this.scene.traverse((e) => {
        (e instanceof te || e instanceof $e || e instanceof en) &&
          (a.push([e.shadow, e.shadow.autoUpdate, e.shadow.needsUpdate]),
          (e.shadow.autoUpdate = e.shadow.needsUpdate = !1));
      }),
        (this.capturing.value = 1));
      try {
        (r.forEach((e) => {
          e.visible = !1;
        }),
          (t.contextNode = this.captureContext),
          t.setMRT(null),
          (t.toneMapping = 0),
          (t.toneMappingExposure = 1),
          (t.autoClear = !0),
          e());
      } finally {
        (r.forEach((e, t) => {
          e.visible = i[t];
        }),
          a.forEach(([e, t, n]) => {
            ((e.autoUpdate = t), (e.needsUpdate = n));
          }),
          t.setRenderTarget(n.target, n.face, n.mip),
          t.setMRT(n.mrt),
          (t.contextNode = n.context),
          (t.toneMapping = n.tone),
          (t.toneMappingExposure = n.exposure),
          (t.autoClear = n.clear),
          (this.capturing.value = 0));
      }
    }
    captureFace(e) {
      let t = this.cubeCamera;
      this.face === 0 &&
        (t.position
          .copy(this.player.getWorldPosition(new g()))
          .add(new g(0, 0.7, 0)),
        t.updateMatrixWorld(!0));
      let n = this.player.visible;
      try {
        ((this.player.visible = !1),
          this.renderer.setRenderTarget(this.cube, this.face),
          this.renderer.render(this.scene, t.children[this.face]),
          (this.frameFaces = 1));
      } finally {
        this.player.visible = n;
      }
      ++this.face === 6 &&
        ((this.filtered = this.generator.fromCubemap(
          this.cube.texture,
          this.filtered,
        )),
        this.probePosition.value.copy(t.position),
        (this.probeReady.value = 1),
        (this.face = 0),
        (this.lastProbe = e),
        this.probeCaptures++);
    }
    configurePlanar(e, t) {
      let n = e.mesh.getWorldPosition(new g()).y,
        r = e.camera;
      (r.copy(t, !1), (r.position.y = 2 * n - t.position.y));
      let i = t.getWorldDirection(new g());
      ((i.y *= -1),
        r.up.set(0, 1, 0).transformDirection(t.matrixWorld),
        (r.up.y *= -1),
        r.lookAt(r.position.clone().add(i)),
        r.updateMatrixWorld(!0),
        r.projectionMatrix.copy(t.projectionMatrix),
        e.projection.value.multiplyMatrices(
          r.projectionMatrix,
          r.matrixWorldInverse,
        ));
      let a = new oe(new g(0, 1, 0), -n).applyMatrix4(r.matrixWorldInverse),
        o = new be(a.normal.x, a.normal.y, a.normal.z, a.constant),
        s = r.projectionMatrix.elements,
        c = new be(
          (Math.sign(o.x) + s[8]) / s[0],
          (Math.sign(o.y) + s[9]) / s[5],
          -1,
          (1 + s[10]) / s[14],
        );
      (o.multiplyScalar(
        (this.renderer.coordinateSystem === 2001 ? 1 : 2) / o.dot(c),
      ),
        (s[2] = o.x),
        (s[6] = o.y),
        (s[10] = o.z + (this.renderer.coordinateSystem === 2001 ? 0 : 1)),
        (s[14] = o.w),
        r.projectionMatrixInverse.copy(r.projectionMatrix).invert(),
        this.renderer.getDrawingBufferSize(this.size));
      let [l, u] = US(this.size.x, this.size.y);
      e.target.setSize(l, u);
    }
    capturePlanar(e, t, n) {
      (this.configurePlanar(e, t), this.renderer.setRenderTarget(e.target));
      let r = this.planar.map((e) => e.mesh.visible);
      try {
        (this.planar.forEach((e) => {
          e.mesh.visible = !1;
        }),
          this.renderer.render(this.scene, e.camera));
      } finally {
        this.planar.forEach((e, t) => {
          e.mesh.visible = r[t];
        });
      }
      ((e.ready.value = 1),
        (e.last = n),
        e.sourcePosition.copy(t.position),
        e.captures++,
        this.framePlanar++);
    }
    isVisible(e) {
      for (let t = e; t; t = t.parent) if (!t.visible) return !1;
      return !0;
    }
    snapshot() {
      return {
        mode:
          this.enabled && this.intensity.value > 0 ? `local-and-hdr` : `hdr`,
        intensity: this.intensity.value,
        materials: this.bindings.size,
        probe: {
          size: this.cube?.width ?? 0,
          ready: !!this.probeReady.value,
          captures: this.probeCaptures,
          facesThisFrame: this.frameFaces,
          interval: LS.probeInterval,
        },
        water: this.planar.map((e) => ({
          size: [e.target.width, e.target.height],
          ready: !!e.ready.value,
          captures: e.captures,
        })),
        waterDrawsThisFrame: this.framePlanar,
        extraShadowPasses: 0,
      };
    }
    dispose() {
      if (!this.disposed) {
        this.disposed = !0;
        for (let e of this.bindings.values()) e.material.envNode = e.original;
        (this.bindings.clear(),
          this.planar.forEach((e) => e.target.dispose()),
          (this.planar = []),
          this.cube?.dispose(),
          this.filtered?.dispose(),
          this.generator?.dispose());
        for (let e of this.pmremNodes) e.dispose();
        ((this.pmremNodes = []), (this.hidden = []));
      }
    }
  },
  GS = class {
    constructor() {
      ((this.group = new pn()),
        (this.fade = L(0)),
        (this.model = null),
        (this.key = ``),
        (this.group.name = `Ghost craft`),
        (this.group.visible = !1));
      let e = new i({
          name: `Ghost hologram`,
          transparent: !0,
          depthWrite: !1,
          side: 0,
        }),
        t = fi(Ur.sub(U)),
        n = vr(B(1).sub(Y(vi(Hi, t))), 2);
      ((e.colorNode = q(0.55, 0.95, 1).mul(n.mul(1.4).add(0.45))),
        (e.opacityNode = n.mul(0.62).add(0.14).mul(this.fade)),
        (this.material = e));
    }
    setModel(e, t) {
      if (e === this.key) return !1;
      this.model && this.group.remove(this.model);
      let n = t.clone(!0);
      return (
        n.traverse((e) => {
          let t = e;
          t.isMesh &&
            ((t.material = this.material),
            (t.castShadow = t.receiveShadow = !1),
            (t.userData.reflectionHidden = !0),
            (t.renderOrder = 5));
        }),
        this.group.add(n),
        (this.model = n),
        (this.key = e),
        !0
      );
    }
    place(e, t) {
      if (!e || !this.model || t <= 0.01) {
        this.group.visible = !1;
        return;
      }
      let n = A(e.distance);
      (this.group.position
        .copy(n.position)
        .addScaledVector(n.right, e.lane)
        .addScaledVector(n.up, e.height),
        this.group.quaternion.setFromRotationMatrix(
          new M().makeBasis(n.right, n.up, n.tangent),
        ),
        this.group.rotateY(e.heading),
        this.group.rotateZ(e.roll),
        this.group.rotateX(e.pitch),
        (this.fade.value = t),
        (this.group.visible = !0));
    }
    dispose() {
      (this.model && this.group.remove(this.model),
        (this.model = null),
        (this.key = ``),
        this.material.dispose());
    }
  },
  KS = 0.035,
  qS = 0.0013,
  JS = `#b3cfda`,
  YS = 0.35,
  XS = {
    FOG_HEIGHT: [-200, 1e3],
    FOG_FALLOFF: [0, 1],
    FOG_DENSITY: [0, 0.02],
    SUN_SCATTERING_INTENSITY: [0, 2],
  };
