// assets__game-D43Oxqny 73 — mul
// Lines 30964-31603 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var ix = null,
  ax = 0,
  ox = class {
    constructor(e, t = new A(), n = $b.color) {
      ((this.level = R(0)),
        (this.front = R(1.3)),
        (this.failure = R(0)),
        (this.clock = R(0)),
        (this.nextHit = 0),
        (this.time = 0),
        (this.fade = 0),
        (this.wasUp = !1),
        (this.upFor = 0),
        (ix ??= new nn(1, 72, 40)),
        ax++,
        (this.radii = R(e.clone())),
        (this.hits = Array.from(
          { length: $b.ripples },
          () => new Qt(0, 0, 1, -100),
        )),
        (this.hitNode = jr(this.hits, `vec4`)),
        (this.material = this.createMaterial(new j(n))),
        (this.mesh = new M(ix, this.material)),
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
      let t = new At({
          name: `Shield energy`,
          transparent: !0,
          depthWrite: !1,
          blending: 2,
          side: 2,
          fog: !1,
        }),
        n = J(e.r, e.g, e.b),
        r = fi(Zi),
        i = Zi.mul(this.radii).mul($b.cells),
        a = vr(hi(Ri), J(6)),
        o = a.div(a.x.add(a.y).add(a.z)),
        s = tx(i.zy),
        c = tx(i.xz),
        l = tx(i.xy),
        u = s.x.mul(o.x).add(c.x.mul(o.y)).add(l.x.mul(o.z)),
        d = nx(s.yz).mul(o.x).add(nx(c.yz).mul(o.y)).add(nx(l.yz).mul(o.z)),
        f = Vr(u).mul(1.2),
        p = V(1).sub(Z(0.035, f.add(0.065), u)),
        m = Z(
          0.15,
          0.75,
          Ii(i.mul(0.32).add(J(0, this.clock.mul(0.4), this.clock.mul(-1.6))))
            .mul(0.5)
            .add(0.5)
            .add(d.mul(0.35))
            .sub(0.2),
        ),
        h = fi(Ur.sub(W)),
        g = vr(V(1).sub(hi(yi(Ui, h))), 2.4),
        _ = Z(this.front, this.front.add(0.12), r.z),
        v = Pr(r.z.sub(this.front).div(0.07).pow(2).negate()),
        y = K(this.failure, d.mul(0.98).add(0.01)),
        b = Y(
          1,
          V(0.45).add(K(0.5, B(this.clock.mul(13).add(d.mul(7)))).mul(0.55)),
          K(0.001, this.failure),
        ),
        x = Hi(() => {
          let e = V(0).toVar();
          return (
            di($b.ripples, ({ i: t }) => {
              let n = this.hitNode.element(t),
                i = this.clock.sub(n.w),
                a = K(0, i).mul(K(i, $b.rippleLife)),
                o = r.sub(n.xyz).length(),
                s = V(1).sub(i.div($b.rippleLife)).max(0),
                c = Pr(o.sub(i.mul(3)).div(0.11).pow(2).negate()).mul(s.pow(2)),
                l = Pr(o.mul(o).div(0.04).negate()).mul(Pr(i.mul(-8)));
              e.addAssign(c.mul(1.4).add(l.mul(3)).mul(a));
            }),
            e
          );
        })(),
        S = vr(B(r.z.mul(-1.6).add(this.clock.mul(1.15))), V(14)),
        C = V(0.018)
          .add(p.mul(V(0.14).add(g.mul(1.05)).add(m.mul(0.5)).add(S.mul(0.9))))
          .add(g.mul(0.42))
          .add(m.mul(0.025))
          .add(S.mul(0.05))
          .mul(y)
          .mul(b)
          .add(x.mul(p.mul(1.2).add(0.35)))
          .mul(_)
          .add(v.mul(1.8))
          .mul(this.level),
        w = Ki(
          g
            .pow(3)
            .mul(0.7)
            .add(x.mul(0.35))
            .add(v.mul(0.6))
            .add(S.mul(p).mul(0.35)),
          0,
          1,
        ),
        T = Br(Mr, V(1), V(0.35));
      return (
        (t.colorNode = Y(n, J(1, 1, 1), w)
          .mul(C)
          .mul(T)),
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
        (this.fade = r ? 1 : Math.max(0, this.fade - e / $b.fadeOut)),
        (this.front.value = F.lerp(
          1.3,
          -1.3,
          F.clamp(this.upFor / $b.sweep, 0, 1),
        )),
        (this.failure.value = r
          ? F.clamp(1 - t / $b.failing, 0, 1) * 0.9
          : this.failure.value));
      let i = this.upFor / $b.sweep,
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
        --ax === 0 && (ix?.dispose(), (ix = null)));
    }
  },
  sx = class {
    constructor(e) {
      ((this.scene = new kt()),
        (this.camera = new oe(34, 16 / 9, 0.1, 80)),
        (this.pivot = new An()),
        (this.model = null),
        (this.releaseMaterials = null),
        (this.rig = null),
        (this.owned = []),
        (this.active = !1),
        (this.rotating = !0),
        (this.yaw = -0.5),
        (this.pitch = 0),
        (this.clock = 0),
        (this.scene.background = new j(`#07131c`)),
        (this.scene.environment = e),
        (this.scene.environmentIntensity = 0.8),
        this.scene.add(this.pivot, new ft(`#bce4ee`, `#253746`, 2.2)));
      for (let [e, t, n] of [
        [`#ecf4ff`, 3.5, [4, 8, 5]],
        [`#70e8e4`, 2.4, [-5, 4, -4]],
        [`#ffffff`, 1.3, [0, 2, -6]],
      ]) {
        let r = new Re(e, t);
        (r.position.set(n[0], n[1], n[2]), this.scene.add(r));
      }
      let t = new b({ color: `#0a202b` }),
        n = new Se(5.7, 5.9, 0.18, 96),
        r = new M(n, t);
      ((r.position.y = -1.3), this.scene.add(r), this.owned.push(n, t));
      let i = new b({
        color: `#51bece`,
        transparent: !0,
        opacity: 0.22,
        depthWrite: !1,
      });
      this.owned.push(i);
      for (let e of [5.5, 5.8]) {
        let t = new wn(e, e + 0.024, 128),
          n = new M(t, i);
        ((n.rotation.x = -Math.PI / 2),
          (n.position.y = -1.19),
          this.scene.add(n),
          this.owned.push(t));
      }
      let a = new _(1, 64),
        o = new At({ color: `#02080d`, transparent: !0, depthWrite: !1 });
      o.opacityNode = V(1)
        .sub(Z(0.1, 1, Pi(X().sub(0.5).mul(2))))
        .mul(0.5);
      let s = new M(a, o);
      ((s.rotation.x = -Math.PI / 2),
        s.scale.set(2.25, 3.5, 1),
        (s.position.y = -1.18),
        this.scene.add(s),
        this.owned.push(a, o),
        this.camera.position.set(10, 10, 12.8),
        this.camera.lookAt(0, 0, 0));
    }
    setModel(e) {
      this.clearModel();
      let t = e.clone(!0);
      ((this.releaseMaterials = As(t)),
        t.traverse((e) => {
          if (e instanceof M) {
            e.castShadow = e.receiveShadow = !1;
            for (let t of Array.isArray(e.material) ? e.material : [e.material])
              (`envNode` in t && (t.envNode = null),
                `envMap` in t && (t.envMap = null));
          }
        }),
        this.pivot.add(t),
        (this.model = t),
        (this.rig = Sc(t)));
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
        this.camera.setViewOffset(t, 900, 0, 900 * 0.07, t, 900),
        this.camera.updateProjectionMatrix());
    }
    drag(e, t) {
      ((this.yaw += e * 0.008),
        (this.pitch = F.clamp(this.pitch + t * 0.004, -0.22, 0.42)),
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
          Cc(
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
  cx = new hn(),
  lx = new p(),
  ux = new p(1, 0),
  dx = new p(0, 1),
  fx,
  px = Hi(({ input: e, threshold: t, smoothWidth: n }) => {
    let r = Xr(e.rgb),
      i = Z(t, t.add(n), r);
    return Y(U(0), e, i);
  }),
  mx = class extends Ft {
    static get type() {
      return `BloomNode`;
    }
    constructor(e, t = 1, n = 0, r = 0) {
      (super(`vec4`),
        (this.inputNode = e),
        (this.strength = t.isNode ? t : R(t)),
        (this.radius = n.isNode ? n : R(n)),
        (this.threshold = r.isNode ? r : R(r)),
        (this.smoothWidth = R(0.01)),
        (this._resolutionScale = 0.5),
        (this.highPassFn = px),
        (this._renderTargetsHorizontal = []),
        (this._renderTargetsVertical = []),
        (this._nMips = 5),
        (this._renderTargetBright = new We(1, 1, {
          depthBuffer: !1,
          type: Kt,
        })),
        (this._renderTargetBright.texture.name = `UnrealBloomPass.bright`),
        (this._renderTargetBright.texture.generateMipmaps = !1));
      for (let e = 0; e < this._nMips; e++) {
        let t = new We(1, 1, { depthBuffer: !1, type: Kt });
        ((t.texture.name = `UnrealBloomPass.h` + e),
          (t.texture.generateMipmaps = !1),
          this._renderTargetsHorizontal.push(t));
        let n = new We(1, 1, { depthBuffer: !1, type: Kt });
        ((n.texture.name = `UnrealBloomPass.v` + e),
          (n.texture.generateMipmaps = !1),
          this._renderTargetsVertical.push(n));
      }
      ((this._compositeMaterial = null),
        (this._highPassFilterMaterial = null),
        (this._separableBlurMaterials = []),
        (this._textureNodeBright = z(this._renderTargetBright.texture)),
        (this._textureNodeBlur0 = z(this._renderTargetsVertical[0].texture)),
        (this._textureNodeBlur1 = z(this._renderTargetsVertical[1].texture)),
        (this._textureNodeBlur2 = z(this._renderTargetsVertical[2].texture)),
        (this._textureNodeBlur3 = z(this._renderTargetsVertical[3].texture)),
        (this._textureNodeBlur4 = z(this._renderTargetsVertical[4].texture)),
        (this._textureOutput = gi(
          this,
          this._renderTargetsHorizontal[0].texture,
        )),
        (this.updateBeforeType = Wt.FRAME));
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
      fx = xt.resetRendererState(t, fx);
      let n = t.getDrawingBufferSize(lx);
      (this.setSize(n.width, n.height),
        t.setRenderTarget(this._renderTargetBright),
        (cx.material = this._highPassFilterMaterial),
        (cx.name = `Bloom [ High Pass ]`),
        cx.render(t));
      let r = this._renderTargetBright;
      for (let e = 0; e < this._nMips; e++)
        ((cx.material = this._separableBlurMaterials[e]),
          (this._separableBlurMaterials[e].colorTexture.value = r.texture),
          (this._separableBlurMaterials[e].direction.value = ux),
          t.setRenderTarget(this._renderTargetsHorizontal[e]),
          (cx.name = `Bloom [ Blur Horizontal - ${e} ]`),
          cx.render(t),
          (this._separableBlurMaterials[e].colorTexture.value =
            this._renderTargetsHorizontal[e].texture),
          (this._separableBlurMaterials[e].direction.value = dx),
          t.setRenderTarget(this._renderTargetsVertical[e]),
          (cx.name = `Bloom [ Blur Vertical - ${e} ]`),
          cx.render(t),
          (r = this._renderTargetsVertical[e]));
      (t.setRenderTarget(this._renderTargetsHorizontal[0]),
        (cx.material = this._compositeMaterial),
        (cx.name = `Bloom [ Composite ]`),
        cx.render(t),
        xt.restoreRendererState(t, fx));
    }
    setup(e) {
      ((this._highPassFilterMaterial =
        this._highPassFilterMaterial || new On()),
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
          new A(1, 1, 1),
          new A(1, 1, 1),
          new A(1, 1, 1),
          new A(1, 1, 1),
          new A(1, 1, 1),
        ]),
        i = Hi(([e, t]) => Y(e, V(1.2).sub(e), t)).setLayout({
          name: `lerpBloomFactor`,
          type: `float`,
          inputs: [
            { name: `factor`, type: `float` },
            { name: `radius`, type: `float` },
          ],
        }),
        a = Hi(() => {
          let e = i(n.element(0), this.radius)
              .mul(U(r.element(0), 1))
              .mul(this._textureNodeBlur0),
            t = i(n.element(1), this.radius)
              .mul(U(r.element(1), 1))
              .mul(this._textureNodeBlur1),
            a = i(n.element(2), this.radius)
              .mul(U(r.element(2), 1))
              .mul(this._textureNodeBlur2),
            o = i(n.element(3), this.radius)
              .mul(U(r.element(3), 1))
              .mul(this._textureNodeBlur3),
            s = i(n.element(4), this.radius)
              .mul(U(r.element(4), 1))
              .mul(this._textureNodeBlur4);
          return e.add(t).add(a).add(o).add(s).mul(this.strength);
        });
      return (
        (this._compositeMaterial = this._compositeMaterial || new On()),
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
      let i = z(null),
        a = jr(n),
        o = R(new p()),
        s = R(new p(0.5, 0.5)),
        c = X(),
        l = (e) => i.sample(e),
        u = Hi(() => {
          let e = l(c).rgb.mul(a.element(0)).toVar();
          return (
            di(
              { start: Jr(1), end: Jr(t), type: `int`, condition: `<` },
              ({ i: t }) => {
                let n = V(t),
                  r = a.element(t),
                  i = s.mul(o).mul(n),
                  u = l(c.add(i)).rgb,
                  d = l(c.sub(i)).rgb;
                e.addAssign(ei(u, d).mul(r));
              },
            ),
            U(e, 1)
          );
        }),
        d = new On();
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
  hx = (e, t, n, r) => new mx(ri(e), t, n, r),
  gx = `models/launch-bay.glb`,
  _x = {
    url: `environment/launch-bay_1k.hdr`,
    title: `Launch Bay (Blender panorama)`,
    intensity: 1,
    tunnelIntensity: 1,
    skyIntensity: 1,
    rotation: 0,
    maxRadiance: 32,
  },
  vx = -1.32,
  yx = new j(0.05, 0.2, 0.24),
  bx = J(0.2126, 0.7152, 0.0722),
  xx = class {
    constructor(e, t, n, r) {
      ((this.slots = []),
        (this.time = R(0)),
        (this.launch = R(0)),
        (this.levels = {
          light: R(1),
          mirror: R(1),
          glow: R(0.45),
          sheen: R(1),
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
        (i.target.position.y = vx),
        e.add(i.target),
        i.reflector.getVirtualCamera(n).layers.set(0),
        this.owned.push(i));
      let a = new Map();
      e.traverse((e) => {
        let t = e;
        if (!t.isMesh) return;
        let n = t.material,
          o = wx(t),
          s = Cx(t, `Bay deck`) || Cx(t, `Bay markings`);
        s && t.layers.set(1);
        let c;
        (o === null
          ? (a.has(n) ||
              a.set(
                n,
                n.aoMap
                  ? Tx(
                      n,
                      this.environment,
                      r,
                      s ? i : null,
                      Cx(t, `Bay markings`),
                      this.levels,
                    )
                  : n.emissiveIntensity > 0 && n.emissive.getHex() !== 0
                    ? this.glow(n)
                    : Ex(n),
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
      let t = new At({ name: e.name, side: e.side });
      t.fog = !1;
      let n = G(e.emissive).mul(e.emissiveIntensity).mul(this.levels.glow);
      if (e.name === `Bay light tunnel`) {
        let e = V(0.45).add(this.launch.mul(1.6)),
          r = B(this.time.mul(e).sub(X().x.mul(2.4))),
          i = Z(0.78, 1, r).add(Z(0.35, 1, r).mul(0.25));
        t.colorNode = n.mul(V(0.35).add(i.mul(1.4)));
      } else if (e.name === `Bay portal`) {
        let e = Pi(X().sub(q(0.5, 0.45)).mul(q(1, 0.75))),
          r = V(1).sub(Z(0, 0.6, e)),
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
        this.slots.push({ accent: R(new j()), energy: R(0) });
      let { accent: n, energy: r } = this.slots[t],
        [i, a] =
          e.name === `Cradle core`
            ? [0.45, 1.8]
            : e.name === `Cradle lamp`
              ? [1.4, 5]
              : [1.6, 4],
        o = new At({ name: `${e.name} ${t}`, side: e.side });
      o.fog = !1;
      let s = Hr(this.time.mul(2.1).add(t * 1.3))
        .mul(0.08)
        .add(1);
      return (
        (o.colorNode = Y(G(yx).mul(i), n.mul(a).mul(s), r).mul(
          this.levels.glow,
        )),
        this.owned.push(o),
        o
      );
    }
    dispose() {
      this.disposed ||
        ((this.disposed = !0),
        this.root.removeFromParent(),
        Ka(this.root),
        this.owned.forEach((e) => e.dispose()),
        (this.owned = []));
    }
  },
  Sx = (e) => e.name.replace(/_/g, ` `);
