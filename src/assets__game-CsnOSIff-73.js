// assets__game-CsnOSIff 73 — mul
// Lines 30826-31464 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Kb = null,
  qb = 0,
  Jb = class {
    constructor(e, t = new g(), n = Vb.color) {
      ((this.level = L(0)),
        (this.front = L(1.3)),
        (this.failure = L(0)),
        (this.clock = L(0)),
        (this.nextHit = 0),
        (this.time = 0),
        (this.fade = 0),
        (this.wasUp = !1),
        (this.upFor = 0),
        (Kb ??= new bt(1, 72, 40)),
        qb++,
        (this.radii = L(e.clone())),
        (this.hits = Array.from(
          { length: Vb.ripples },
          () => new be(0, 0, 1, -100),
        )),
        (this.hitNode = jr(this.hits, `vec4`)),
        (this.material = this.createMaterial(new _(n))),
        (this.mesh = new N(Kb, this.material)),
        (this.mesh.name = `Shield`),
        this.mesh.position.copy(t),
        this.mesh.scale.copy(e),
        (this.mesh.renderOrder = 6),
        (this.mesh.castShadow = this.mesh.receiveShadow = !1),
        (this.mesh.userData.reflectionHidden = !0),
        (this.mesh.userData.craftAttachment = !0),
        (this.mesh.visible = !1));
    }
    createMaterial(e) {
      let t = new i({
          name: `Shield energy`,
          transparent: !0,
          depthWrite: !1,
          blending: 2,
          side: 2,
          fog: !1,
        }),
        n = q(e.r, e.g, e.b),
        r = fi(Xi),
        a = Xi.mul(this.radii).mul(Vb.cells),
        o = vr(Y(Li), q(6)),
        s = o.div(o.x.add(o.y).add(o.z)),
        c = Ub(a.zy),
        l = Ub(a.xz),
        u = Ub(a.xy),
        d = c.x.mul(s.x).add(l.x.mul(s.y)).add(u.x.mul(s.z)),
        f = Wb(c.yz).mul(s.x).add(Wb(l.yz).mul(s.y)).add(Wb(u.yz).mul(s.z)),
        p = Vr(d).mul(1.2),
        m = B(1).sub(Z(0.035, p.add(0.065), d)),
        h = Z(
          0.15,
          0.75,
          Fi(a.mul(0.32).add(q(0, this.clock.mul(0.4), this.clock.mul(-1.6))))
            .mul(0.5)
            .add(0.5)
            .add(f.mul(0.35))
            .sub(0.2),
        ),
        g = fi(Ur.sub(U)),
        _ = vr(B(1).sub(Y(vi(Hi, g))), 2.4),
        v = Z(this.front, this.front.add(0.12), r.z),
        y = Pr(r.z.sub(this.front).div(0.07).pow(2).negate()),
        b = G(this.failure, f.mul(0.98).add(0.01)),
        x = J(
          1,
          B(0.45).add(G(0.5, z(this.clock.mul(13).add(f.mul(7)))).mul(0.55)),
          G(0.001, this.failure),
        ),
        S = Vi(() => {
          let e = B(0).toVar();
          return (
            di(Vb.ripples, ({ i: t }) => {
              let n = this.hitNode.element(t),
                i = this.clock.sub(n.w),
                a = G(0, i).mul(G(i, Vb.rippleLife)),
                o = r.sub(n.xyz).length(),
                s = B(1).sub(i.div(Vb.rippleLife)).max(0),
                c = Pr(o.sub(i.mul(3)).div(0.11).pow(2).negate()).mul(s.pow(2)),
                l = Pr(o.mul(o).div(0.04).negate()).mul(Pr(i.mul(-8)));
              e.addAssign(c.mul(1.4).add(l.mul(3)).mul(a));
            }),
            e
          );
        })(),
        C = vr(z(r.z.mul(-1.6).add(this.clock.mul(1.15))), B(14)),
        w = B(0.018)
          .add(m.mul(B(0.14).add(_.mul(1.05)).add(h.mul(0.5)).add(C.mul(0.9))))
          .add(_.mul(0.42))
          .add(h.mul(0.025))
          .add(C.mul(0.05))
          .mul(b)
          .mul(x)
          .add(S.mul(m.mul(1.2).add(0.35)))
          .mul(v)
          .add(y.mul(1.8))
          .mul(this.level),
        T = Gi(
          _.pow(3)
            .mul(0.7)
            .add(S.mul(0.35))
            .add(y.mul(0.6))
            .add(C.mul(m).mul(0.35)),
          0,
          1,
        ),
        E = Br(Mr, B(1), B(0.35));
      return (
        (t.colorNode = J(n, q(1, 1, 1), T)
          .mul(w)
          .mul(E)),
        t
      );
    }
    fit(e, t) {
      (this.radii.value.copy(e),
        this.mesh.position.copy(t),
        this.mesh.scale.copy(e));
    }
    update(e, t, n) {
      if (!(e > 0)) return;
      ((this.time += e), (this.clock.value = this.time));
      let r = t > 0;
      (r && !this.wasUp
        ? (this.upFor = Math.max(0, n - t))
        : r && (this.upFor += e),
        (this.wasUp = r),
        (this.fade = r ? 1 : Math.max(0, this.fade - e / Vb.fadeOut)),
        (this.front.value = s.lerp(
          1.3,
          -1.3,
          s.clamp(this.upFor / Vb.sweep, 0, 1),
        )),
        (this.failure.value = r
          ? s.clamp(1 - t / Vb.failing, 0, 1) * 0.9
          : this.failure.value));
      let i = this.upFor / Vb.sweep,
        a = r
          ? 1 + 0.06 * Math.exp(-3 * i) * Math.sin(Math.min(i, 6) * 5)
          : 1 + 0.04 * (1 - this.fade);
      (this.mesh.scale.copy(this.radii.value).multiplyScalar(a),
        (this.level.value = this.fade),
        (this.mesh.visible = this.fade > 0));
    }
    impact(e) {
      if (!this.mesh.visible) return;
      let t = this.mesh.worldToLocal(e.clone()).normalize();
      (this.hits[this.nextHit].set(t.x, t.y, t.z, this.time),
        (this.nextHit = (this.nextHit + 1) % this.hits.length));
    }
    dispose() {
      (this.material.dispose(),
        this.mesh.removeFromParent(),
        --qb === 0 && (Kb?.dispose(), (Kb = null)));
    }
  },
  Yb = class {
    constructor(e) {
      ((this.scene = new n()),
        (this.camera = new wn(34, 16 / 9, 0.1, 80)),
        (this.pivot = new pn()),
        (this.model = null),
        (this.releaseMaterials = null),
        (this.rig = null),
        (this.owned = []),
        (this.active = !1),
        (this.rotating = !0),
        (this.yaw = -0.5),
        (this.pitch = 0),
        (this.clock = 0),
        (this.scene.background = new _(`#07131c`)),
        (this.scene.environment = e),
        (this.scene.environmentIntensity = 0.8),
        this.scene.add(this.pivot, new Gt(`#bce4ee`, `#253746`, 2.2)));
      for (let [e, t, n] of [
        [`#ecf4ff`, 3.5, [4, 8, 5]],
        [`#70e8e4`, 2.4, [-5, 4, -4]],
        [`#ffffff`, 1.3, [0, 2, -6]],
      ]) {
        let r = new te(e, t);
        (r.position.set(n[0], n[1], n[2]), this.scene.add(r));
      }
      let t = new we({ color: `#0a202b` }),
        r = new _e(5.7, 5.9, 0.18, 96),
        a = new N(r, t);
      ((a.position.y = -1.3), this.scene.add(a), this.owned.push(r, t));
      let o = new we({
        color: `#51bece`,
        transparent: !0,
        opacity: 0.22,
        depthWrite: !1,
      });
      this.owned.push(o);
      for (let e of [5.5, 5.8]) {
        let t = new ue(e, e + 0.024, 128),
          n = new N(t, o);
        ((n.rotation.x = -Math.PI / 2),
          (n.position.y = -1.19),
          this.scene.add(n),
          this.owned.push(t));
      }
      let s = new Le(1, 64),
        c = new i({ color: `#02080d`, transparent: !0, depthWrite: !1 });
      c.opacityNode = B(1)
        .sub(Z(0.1, 1, Ni(X().sub(0.5).mul(2))))
        .mul(0.5);
      let l = new N(s, c);
      ((l.rotation.x = -Math.PI / 2),
        l.scale.set(2.25, 3.5, 1),
        (l.position.y = -1.18),
        this.scene.add(l),
        this.owned.push(s, c),
        this.camera.position.set(10, 10, 12.8),
        this.camera.lookAt(0, 0, 0));
    }
    setModel(e) {
      this.clearModel();
      let t = e.clone(!0);
      ((this.releaseMaterials = ks(t)),
        t.traverse((e) => {
          if (e instanceof N) {
            e.castShadow = e.receiveShadow = !1;
            for (let t of Array.isArray(e.material) ? e.material : [e.material])
              (`envNode` in t && (t.envNode = null),
                `envMap` in t && (t.envMap = null));
          }
        }),
        this.pivot.add(t),
        (this.model = t),
        (this.rig = xc(t)));
    }
    clearModel() {
      (this.model?.removeFromParent(),
        this.releaseMaterials?.(),
        (this.model = null),
        (this.rig = null),
        (this.releaseMaterials = null));
    }
    resize(e) {
      let t = 900 * e;
      ((this.camera.aspect = e),
        this.camera.setViewOffset(t, 900, t * 0.225, 900 * 0.015, t, 900),
        this.camera.updateProjectionMatrix());
    }
    drag(e, t) {
      ((this.yaw += e * 0.008),
        (this.pitch = s.clamp(this.pitch + t * 0.004, -0.22, 0.42)),
        (this.rotating = !1));
    }
    reset() {
      ((this.yaw = -0.5), (this.pitch = 0));
    }
    update(e, t) {
      this.active &&
        ((e = Math.max(0, Math.min(e, 0.05))),
        t || (this.clock += e),
        this.rotating && (this.yaw += e * 0.18),
        this.pivot.rotation.set(this.pitch, this.yaw, 0),
        (this.pivot.position.y = t
          ? 0.3
          : 0.3 + Math.sin(this.clock * 1.3) * 0.085),
        this.rig &&
          !t &&
          Sc(
            this.rig,
            {
              speed: 0,
              throttle: 0.12,
              steer: 0,
              airbrake: 0,
              boost: 0,
              time: this.clock,
            },
            e,
          ));
    }
    snapshot() {
      return {
        active: this.active,
        rotating: this.rotating,
        yaw: this.yaw,
        loaded: !!this.model,
      };
    }
    dispose() {
      (this.clearModel(),
        this.owned.forEach((e) => e.dispose()),
        (this.scene.environment = null),
        this.scene.clear());
    }
  },
  Xb = new pt(),
  Zb = new b(),
  Qb = new b(1, 0),
  $b = new b(0, 1),
  ex,
  tx = Vi(({ input: e, threshold: t, smoothWidth: n }) => {
    let r = Xr(e.rgb),
      i = Z(t, t.add(n), r);
    return J(H(0), e, i);
  }),
  nx = class extends Et {
    static get type() {
      return `BloomNode`;
    }
    constructor(e, t = 1, n = 0, r = 0) {
      (super(`vec4`),
        (this.inputNode = e),
        (this.strength = t.isNode ? t : L(t)),
        (this.radius = n.isNode ? n : L(n)),
        (this.threshold = r.isNode ? r : L(r)),
        (this.smoothWidth = L(0.01)),
        (this._resolutionScale = 0.5),
        (this.highPassFn = tx),
        (this._renderTargetsHorizontal = []),
        (this._renderTargetsVertical = []),
        (this._nMips = 5),
        (this._renderTargetBright = new ze(1, 1, {
          depthBuffer: !1,
          type: kn,
        })),
        (this._renderTargetBright.texture.name = `UnrealBloomPass.bright`),
        (this._renderTargetBright.texture.generateMipmaps = !1));
      for (let e = 0; e < this._nMips; e++) {
        let t = new ze(1, 1, { depthBuffer: !1, type: kn });
        ((t.texture.name = `UnrealBloomPass.h` + e),
          (t.texture.generateMipmaps = !1),
          this._renderTargetsHorizontal.push(t));
        let n = new ze(1, 1, { depthBuffer: !1, type: kn });
        ((n.texture.name = `UnrealBloomPass.v` + e),
          (n.texture.generateMipmaps = !1),
          this._renderTargetsVertical.push(n));
      }
      ((this._compositeMaterial = null),
        (this._highPassFilterMaterial = null),
        (this._separableBlurMaterials = []),
        (this._textureNodeBright = R(this._renderTargetBright.texture)),
        (this._textureNodeBlur0 = R(this._renderTargetsVertical[0].texture)),
        (this._textureNodeBlur1 = R(this._renderTargetsVertical[1].texture)),
        (this._textureNodeBlur2 = R(this._renderTargetsVertical[2].texture)),
        (this._textureNodeBlur3 = R(this._renderTargetsVertical[3].texture)),
        (this._textureNodeBlur4 = R(this._renderTargetsVertical[4].texture)),
        (this._textureOutput = hi(
          this,
          this._renderTargetsHorizontal[0].texture,
        )),
        (this.updateBeforeType = Dn.FRAME));
    }
    getTextureNode() {
      return this._textureOutput;
    }
    setResolutionScale(e) {
      return ((this._resolutionScale = e), this);
    }
    getResolutionScale() {
      return this._resolutionScale;
    }
    setSize(e, t) {
      let n = Math.floor(e * this._resolutionScale),
        r = Math.floor(t * this._resolutionScale);
      this._renderTargetBright.setSize(n, r);
      for (let e = 0; e < this._nMips; e++)
        (this._renderTargetsHorizontal[e].setSize(n, r),
          this._renderTargetsVertical[e].setSize(n, r),
          this._separableBlurMaterials[e].invSize.value.set(1 / n, 1 / r),
          (n = Math.floor(n / 2)),
          (r = Math.floor(r / 2)));
    }
    updateBefore(e) {
      let { renderer: t } = e;
      ex = Pn.resetRendererState(t, ex);
      let n = t.getDrawingBufferSize(Zb);
      (this.setSize(n.width, n.height),
        t.setRenderTarget(this._renderTargetBright),
        (Xb.material = this._highPassFilterMaterial),
        (Xb.name = `Bloom [ High Pass ]`),
        Xb.render(t));
      let r = this._renderTargetBright;
      for (let e = 0; e < this._nMips; e++)
        ((Xb.material = this._separableBlurMaterials[e]),
          (this._separableBlurMaterials[e].colorTexture.value = r.texture),
          (this._separableBlurMaterials[e].direction.value = Qb),
          t.setRenderTarget(this._renderTargetsHorizontal[e]),
          (Xb.name = `Bloom [ Blur Horizontal - ${e} ]`),
          Xb.render(t),
          (this._separableBlurMaterials[e].colorTexture.value =
            this._renderTargetsHorizontal[e].texture),
          (this._separableBlurMaterials[e].direction.value = $b),
          t.setRenderTarget(this._renderTargetsVertical[e]),
          (Xb.name = `Bloom [ Blur Vertical - ${e} ]`),
          Xb.render(t),
          (r = this._renderTargetsVertical[e]));
      (t.setRenderTarget(this._renderTargetsHorizontal[0]),
        (Xb.material = this._compositeMaterial),
        (Xb.name = `Bloom [ Composite ]`),
        Xb.render(t),
        Pn.restoreRendererState(t, ex));
    }
    setup(e) {
      ((this._highPassFilterMaterial =
        this._highPassFilterMaterial || new dn()),
        (this._highPassFilterMaterial.fragmentNode = this.highPassFn({
          input: this.inputNode,
          threshold: this.threshold,
          smoothWidth: this.smoothWidth,
        }).context(e.getSharedContext())),
        (this._highPassFilterMaterial.name = `Bloom_highPass`),
        (this._highPassFilterMaterial.needsUpdate = !0));
      let t = [6, 10, 14, 18, 22];
      for (let n = 0; n < this._nMips; n++)
        this._separableBlurMaterials.push(
          this._getSeparableBlurMaterial(e, t[n]),
        );
      let n = jr([1, 0.8, 0.6, 0.4, 0.2]),
        r = jr([
          new g(1, 1, 1),
          new g(1, 1, 1),
          new g(1, 1, 1),
          new g(1, 1, 1),
          new g(1, 1, 1),
        ]),
        i = Vi(([e, t]) => J(e, B(1.2).sub(e), t)).setLayout({
          name: `lerpBloomFactor`,
          type: `float`,
          inputs: [
            { name: `factor`, type: `float` },
            { name: `radius`, type: `float` },
          ],
        }),
        a = Vi(() => {
          let e = i(n.element(0), this.radius)
              .mul(H(r.element(0), 1))
              .mul(this._textureNodeBlur0),
            t = i(n.element(1), this.radius)
              .mul(H(r.element(1), 1))
              .mul(this._textureNodeBlur1),
            a = i(n.element(2), this.radius)
              .mul(H(r.element(2), 1))
              .mul(this._textureNodeBlur2),
            o = i(n.element(3), this.radius)
              .mul(H(r.element(3), 1))
              .mul(this._textureNodeBlur3),
            s = i(n.element(4), this.radius)
              .mul(H(r.element(4), 1))
              .mul(this._textureNodeBlur4);
          return e.add(t).add(a).add(o).add(s).mul(this.strength);
        });
      return (
        (this._compositeMaterial = this._compositeMaterial || new dn()),
        (this._compositeMaterial.fragmentNode = a().context(
          e.getSharedContext(),
        )),
        (this._compositeMaterial.name = `Bloom_comp`),
        (this._compositeMaterial.needsUpdate = !0),
        this._textureOutput
      );
    }
    dispose() {
      for (let e = 0; e < this._renderTargetsHorizontal.length; e++)
        this._renderTargetsHorizontal[e].dispose();
      for (let e = 0; e < this._renderTargetsVertical.length; e++)
        this._renderTargetsVertical[e].dispose();
      (this._renderTargetBright.dispose(),
        this._highPassFilterMaterial !== null &&
          this._highPassFilterMaterial.dispose(),
        this._compositeMaterial !== null && this._compositeMaterial.dispose());
      for (let e = 0; e < this._separableBlurMaterials.length; e++)
        this._separableBlurMaterials[e].dispose();
    }
    _getSeparableBlurMaterial(e, t) {
      let n = [],
        r = t / 3;
      for (let e = 0; e < t; e++)
        n.push((0.39894 * Math.exp((-0.5 * e * e) / (r * r))) / r);
      let i = R(null),
        a = jr(n),
        o = L(new b()),
        s = L(new b(0.5, 0.5)),
        c = X(),
        l = (e) => i.sample(e),
        u = Vi(() => {
          let e = l(c).rgb.mul(a.element(0)).toVar();
          return (
            di(
              { start: Jr(1), end: Jr(t), type: `int`, condition: `<` },
              ({ i: t }) => {
                let n = B(t),
                  r = a.element(t),
                  i = s.mul(o).mul(n),
                  u = l(c.add(i)).rgb,
                  d = l(c.sub(i)).rgb;
                e.addAssign(ei(u, d).mul(r));
              },
            ),
            H(e, 1)
          );
        }),
        d = new dn();
      return (
        (d.fragmentNode = u().context(e.getSharedContext())),
        (d.name = `Bloom_separable`),
        (d.needsUpdate = !0),
        (d.colorTexture = i),
        (d.direction = s),
        (d.invSize = o),
        d
      );
    }
  },
  rx = (e, t, n, r) => new nx(ri(e), t, n, r),
  ix = `models/launch-bay.glb`,
  ax = {
    url: `environment/launch-bay_1k.hdr`,
    title: `Launch Bay (Blender panorama)`,
    intensity: 1,
    tunnelIntensity: 1,
    skyIntensity: 1,
    rotation: 0,
    maxRadiance: 32,
  },
  ox = -1.32,
  sx = new _(0.05, 0.2, 0.24),
  cx = q(0.2126, 0.7152, 0.0722),
  lx = class {
    constructor(e, t, n, r) {
      ((this.slots = []),
        (this.time = L(0)),
        (this.launch = L(0)),
        (this.levels = {
          light: L(1),
          mirror: L(1),
          glow: L(0.45),
          sheen: L(1),
        }),
        (this.environment = null),
        (this.owned = []),
        (this.disposed = !1),
        (this.root = e),
        t && ((this.environment = t.texture), this.owned.push(t)));
      let i = null;
      r.reflections &&
        ((i = br({ resolutionScale: 0.5, generateMipmaps: !0, bounces: !1 })),
        (i.target.rotation.x = -Math.PI / 2),
        (i.target.position.y = ox),
        e.add(i.target),
        i.reflector.getVirtualCamera(n).layers.set(0),
        this.owned.push(i));
      let a = new Map();
      e.traverse((e) => {
        let t = e;
        if (!t.isMesh) return;
        let n = t.material,
          o = fx(t),
          s = dx(t, `Bay deck`) || dx(t, `Bay markings`);
        s && t.layers.set(1);
        let c;
        (o === null
          ? (a.has(n) ||
              a.set(
                n,
                n.aoMap
                  ? px(
                      n,
                      this.environment,
                      r,
                      s ? i : null,
                      dx(t, `Bay markings`),
                      this.levels,
                    )
                  : n.emissiveIntensity > 0 && n.emissive.getHex() !== 0
                    ? this.glow(n)
                    : mx(n),
              ),
            (c = a.get(n)))
          : (c = this.emitter(n, o)),
          (t.material = c),
          (t.castShadow = t.receiveShadow = !1),
          (t.matrixAutoUpdate = !1),
          t.updateMatrix());
      });
      for (let [e] of a) e.dispose();
      for (let e of new Set(a.values())) this.owned.push(e);
    }
    glow(e) {
      let t = new i({ name: e.name, side: e.side });
      t.fog = !1;
      let n = W(e.emissive).mul(e.emissiveIntensity).mul(this.levels.glow);
      if (e.name === `Bay light tunnel`) {
        let e = B(0.45).add(this.launch.mul(1.6)),
          r = z(this.time.mul(e).sub(X().x.mul(2.4))),
          i = Z(0.78, 1, r).add(Z(0.35, 1, r).mul(0.25));
        t.colorNode = n.mul(B(0.35).add(i.mul(1.4)));
      } else if (e.name === `Bay portal`) {
        let e = Ni(X().sub(K(0.5, 0.45)).mul(K(1, 0.75))),
          r = B(1).sub(Z(0, 0.6, e)),
          i = Hr(this.time.mul(1.3).add(e.mul(18))).mul(0.06);
        t.colorNode = n.mul(
          r.mul(r).mul(1.6).add(0.3).add(i).add(this.launch.mul(0.8)),
        );
      } else
        e.name === `Bay sign` ? (t.colorNode = n.mul(2.2)) : (t.colorNode = n);
      return t;
    }
    emitter(e, t) {
      for (; this.slots.length <= t;)
        this.slots.push({ accent: L(new _()), energy: L(0) });
      let { accent: n, energy: r } = this.slots[t],
        [a, o] =
          e.name === `Cradle core`
            ? [0.45, 1.8]
            : e.name === `Cradle lamp`
              ? [1.4, 5]
              : [1.6, 4],
        s = new i({ name: `${e.name} ${t}`, side: e.side });
      s.fog = !1;
      let c = Hr(this.time.mul(2.1).add(t * 1.3))
        .mul(0.08)
        .add(1);
      return (
        (s.colorNode = J(W(sx).mul(a), n.mul(o).mul(c), r).mul(
          this.levels.glow,
        )),
        this.owned.push(s),
        s
      );
    }
    dispose() {
      this.disposed ||
        ((this.disposed = !0),
        this.root.removeFromParent(),
        Ga(this.root),
        this.owned.forEach((e) => e.dispose()),
        (this.owned = []));
    }
  },
  ux = (e) => e.name.replace(/_/g, ` `);
