// assets__game-CsnOSIff 23 — mul
// Lines 6635-6983 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var gu = class {
    constructor({ mobile: e = !1 } = {}) {
      ((this.group = new pn()),
        (this.baking = L(0)),
        (this.eye = L(new g())),
        (this.right = L(new g(1, 0, 0))),
        (this.up = L(new g(0, 1, 0))),
        (this.projectionScale = L(1)),
        (this.viewForward = L(new g(0, 0, -1))),
        (this.clock = L(0)),
        (this.starGain = L(1)),
        (this.forward = new g()),
        (this.textures = []),
        (this.geometries = []),
        (this.materials = []),
        (this.group.name = `Shackleton Rim sky`));
      let t = this.loadTexture(
          e ? `environment/lunar-earth-512.png` : `environment/lunar-earth.png`,
          !0,
        ),
        n = this.loadTexture(
          e
            ? `environment/lunar-earth-data-512.png`
            : `environment/lunar-earth-data.png`,
        ),
        r = this.loadTexture(
          e
            ? `environment/lunar-milky-way-512.png`
            : `environment/lunar-milky-way.png`,
        );
      ((this.ready = Promise.all(
        this.textures.map((e) => e.userData.loading ?? Promise.resolve()),
      ).then(() => void 0)),
        this.ready.catch(() => void 0),
        (this.skyDome = this.createDome(t, n, r)),
        (this.stars = this.createStars(e ? cu.lowCount : cu.highCount)),
        this.group.add(this.skyDome, this.stars));
    }
    loadTexture(e, t = !1) {
      let n = new Pt();
      return (
        (n.name = e),
        (n.colorSpace = t ? st : ``),
        (n.wrapS = qe),
        (n.wrapT = x),
        (n.generateMipmaps = !0),
        (n.minFilter = m),
        (n.magFilter = Fe),
        (n.userData.loading = new In()
          .loadAsync(new URL(e, document.baseURI).href)
          .then((e) => {
            ((n.image = e), (n.needsUpdate = !0));
          })),
        this.textures.push(n),
        n
      );
    }
    createDome(e, t, n) {
      let r = new i({ side: 1, depthWrite: !1, fog: !1 });
      r.name = `Shackleton sky`;
      let a = U.sub(Ur).normalize(),
        o = q(qo),
        s = B(1).sub(this.baking),
        c = lu(),
        l = Yi(a.dot(q(c.y)), a.dot(q(c.centre))),
        u = Ui(a.dot(q(c.north)).clamp(-1, 1)),
        d = l.div(Math.PI * 2),
        f = d.add(0.5),
        p = z(d).add(0.5),
        m = R(
          n,
          K(Br(Vr(f).greaterThan(0.25), p, f), u.div(Math.PI).add(0.5)),
        ).rgb,
        h = m.mul(m).mul(au.brightness),
        g = du(),
        _ = Math.tan(tu(ru.angularDiameter / 2)),
        v = K(a.dot(q(g.right)), a.dot(q(g.up))).div(_),
        y = v.dot(v),
        x = gr(y),
        S = Z(0, 0.01, a.dot(q(g.forward))),
        C = B(1)
          .sub(Z(0.975, 1, x))
          .mul(S),
        w = gr(B(1).sub(y).max(0)),
        T = q(g.right)
          .mul(v.x)
          .add(q(g.up).mul(v.y))
          .sub(q(g.forward).mul(w))
          .normalize(),
        E = Ui(T.dot(q(g.north)).clamp(-1, 1)),
        D = K(
          Yi(T.dot(q(g.east)), T.dot(q(g.meridian)))
            .add(tu(ru.subLongitude))
            .div(Math.PI * 2)
            .add(0.5),
          E.div(Math.PI).add(0.5),
        ),
        O = R(e, D),
        ee = R(t, D),
        te = ee.b,
        k = T.dot(o),
        ne = k.add(0.06).div(1.06).max(0),
        re = J(O.rgb, q(0.86, 0.88, 0.9), te),
        A = q(g.forward).negate(),
        ie = fi(o.add(A)),
        ae = T.dot(ie)
          .max(0)
          .pow(600)
          .mul(1.6)
          .add(T.dot(ie).max(0).pow(18).mul(0.12))
          .mul(ee.g)
          .mul(B(1).sub(te)),
        oe = B(1).sub(w).pow(2.2),
        se = q(0.16, 0.36, 0.95).mul(oe).mul(ne),
        ce = Z(0.04, -0.14, k),
        le = q(1, 0.7, 0.38)
          .mul(ee.r)
          .mul(ce)
          .mul(B(1).sub(te.mul(0.7)))
          .mul(0.55),
        ue = Jo.sunIntensity * ru.radiance,
        de = re
          .mul(ne)
          .add(ae.mul(ne))
          .mul(ue)
          .mul(J(B(1), B(0.72), oe))
          .add(se.mul(ue * 0.5))
          .add(le),
        fe = q(g.right).mul(v.x).add(q(g.up).mul(v.y)).normalize(),
        pe = Pr(x.sub(1).max(0).div(-0.018))
          .mul(Z(0.985, 1, x))
          .mul(fe.dot(o).add(0.25).max(0))
          .mul(S)
          .mul(q(0.2, 0.42, 1).mul(ue * 0.22)),
        j = Math.cos(tu(su.radius)),
        me = a.dot(o),
        M = Z(
          Math.cos(tu(su.radius * 1.12)),
          Math.cos(tu(su.radius * 0.9)),
          me,
        ),
        he = B(1)
          .sub(me)
          .div(1 - j)
          .min(1),
        ge = B(1).sub(
          B(1)
            .sub(gr(B(1).sub(he)))
            .mul(0.55),
        ),
        _e = a.sub(o),
        ve = _e.dot(this.right),
        ye = _e.dot(this.up),
        be = _e.length(),
        xe = B(0);
      for (let e = 0; e < 3; e++) {
        let t = (e * Math.PI) / 3,
          n = Y(ve.mul(-Math.sin(t)).add(ye.mul(Math.cos(t))));
        xe = xe.add(Pr(n.div(be.mul(0.012).add(18e-5)).negate()));
      }
      let Se = me
          .max(0)
          .pow(12e3)
          .mul(5)
          .add(me.max(0).pow(1400).mul(0.32))
          .add(me.max(0).pow(160).mul(0.018))
          .add(xe.mul(Pr(be.div(-0.035))).mul(0.55)),
        Ce = q(1, 0.975, 0.94).mul(M.mul(ge).mul(su.radiance).add(Se)).mul(s),
        we = J(h.add(pe), de, C).add(Ce),
        Te = Math.max(0.05, qo.y),
        Ee = a.y.negate().max(0.02),
        De = B(Te).div(Ee.add(Te)),
        Oe = a.negate().dot(o),
        ke = B(1).add(Oe.max(0).pow(10).mul(0.7)),
        Ae = new b(qo.x, qo.z).normalize(),
        je = fi(K(a.x, a.z).add(K(1e-4, 0)))
          .dot(K(-Ae.x, -Ae.y))
          .mul(0.42)
          .add(0.55);
      r.colorNode = J(
        q(1, 0.955, 0.9)
          .mul(0.049 * Jo.sunIntensity)
          .mul(De)
          .mul(ke)
          .mul(je),
        we,
        Z(-0.012, 0.004, a.y),
      );
      let Me = new N(new bt(ou, 48, 32), r);
      return (
        (Me.name = `Shackleton sky dome`),
        (Me.frustumCulled = !1),
        (Me.renderOrder = 10),
        this.geometries.push(Me.geometry),
        this.materials.push(r),
        Me
      );
    }
    createStars(e) {
      let t = pu(cu.highCount).slice(0, e),
        n = new rt(1, 1),
        r = new rn();
      (r.setIndex(n.getIndex()),
        r.setAttribute(`position`, n.getAttribute(`position`)),
        r.setAttribute(`uv`, n.getAttribute(`uv`)),
        n.dispose(),
        (r.instanceCount = t.length));
      let a = Array.from(
          { length: 4 },
          () => new Ct(new Float32Array(t.length * 4), 4),
        ),
        o = new _(),
        c = 625341585,
        l = () => (
          (c = (Math.imul(c, 1664525) + 1013904223) >>> 0),
          c / 4294967296
        );
      t.forEach((e, t) => {
        let n = hu(e.magnitude);
        mu(e.colorIndex, o);
        let r = cu.sigma + 0.45 * s.clamp((3 - e.magnitude) / 4.5, 0, 1),
          i = s.clamp((0.6 - e.magnitude) / 2.4, 0, 1),
          c = i > 0 ? 2 + i * 6 : 0,
          u = Math.max(r * 3.2, c * 2.6),
          d = cu.shimmer * s.clamp((3.4 - e.magnitude) / 4, 0, 1) + 0.035;
        (a[0].setXYZW(t, e.direction.x, e.direction.y, e.direction.z, n),
          a[1].setXYZW(t, o.r, o.g, o.b, r),
          a[2].setXYZW(t, d, 1.9 + l() * 4.4, l() * Math.PI * 2, u),
          a[3].setXYZW(t, c, 0, 0, 0));
      });
      let [u, d, f, p] = a.map(
          (e, t) => (r.setAttribute(`starRecord${t}`, e), Gr(e, `vec4`)),
        ),
        m = f.w,
        h = p.x,
        g = u.xyz,
        v = this.eye.add(g.mul(cu.distance)),
        y = m
          .mul(g.dot(this.viewForward).max(0.05))
          .mul(cu.distance)
          .div(this.projectionScale),
        b = new i({
          transparent: !0,
          depthWrite: !1,
          blending: 2,
          side: 2,
          forceSinglePass: !0,
          fog: !1,
        });
      ((b.name = `Shackleton stars`),
        (b.positionNode = v.add(
          this.right
            .mul(Wi.x.mul(y.mul(2)))
            .add(this.up.mul(Wi.y.mul(y.mul(2)))),
        )));
      let x = Math.cos(tu(ru.angularDiameter / 2)),
        S = Z(
          Math.cos(tu(ru.angularDiameter * 0.62)),
          x,
          g.dot(q(iu)),
        ).oneMinus(),
        C = B(1).sub(Z(Math.cos(tu(30)), Math.cos(tu(9)), g.dot(q(qo)))),
        w = Z(-0.03, 0.004, g.y),
        T = this.clock.mul(f.y).add(f.z),
        E = B(1).add(
          f.x.mul(
            Hr(T)
              .mul(0.6)
              .add(Hr(T.mul(2.31).add(f.z.mul(1.7))).mul(0.4)),
          ),
        ),
        D = f.x.mul(0.35),
        O = q(
          B(1).add(Hr(T.mul(1.13)).mul(D)),
          B(1).add(Hr(T.mul(1.13).add(2.1)).mul(D)),
          B(1).add(Hr(T.mul(1.13).add(4.2)).mul(D)),
        ),
        ee = kr(
          d.rgb.mul(O).mul(u.w.mul(E).mul(this.starGain)).mul(S.mul(C).mul(w)),
        ),
        te = kr(d.w),
        k = kr(m),
        ne = kr(h),
        re = X().sub(0.5).mul(k.mul(2)),
        A = re.dot(re),
        ie = Pr(A.div(te.mul(te).mul(-2))).div(te.mul(te).mul(Math.PI * 2)),
        ae = B(0);
      for (let e = 0; e < 3; e++) {
        let t = (e * Math.PI) / 3 + Math.PI / 6,
          n = re.x.mul(-Math.sin(t)).add(re.y.mul(Math.cos(t)));
        ae = ae.add(Pr(n.mul(n).mul(-3.2)));
      }
      let oe = Br(
        ne.greaterThan(0),
        ae.mul(Pr(gr(A).div(ne.max(1)).negate())).mul(0.05),
        B(0),
      );
      b.colorNode = ee.mul(ie.add(oe));
      let se = new N(r, b);
      return (
        (se.name = `Shackleton star field`),
        (se.frustumCulled = !1),
        (se.castShadow = se.receiveShadow = !1),
        (se.renderOrder = 2),
        this.geometries.push(r),
        this.materials.push(b),
        se
      );
    }
    setBaking(e) {
      this.baking.value = +!!e;
    }
    update(e, t, n, r) {
      (!r &&
        Number.isFinite(e) &&
        e > 0 &&
        (this.clock.value += Math.min(e, 0.1)),
        t.getWorldPosition(this.eye.value),
        this.skyDome.position.copy(this.eye.value),
        this.right.value.setFromMatrixColumn(t.matrixWorld, 0),
        this.up.value.setFromMatrixColumn(t.matrixWorld, 1),
        (this.projectionScale.value =
          Math.max(1, n) / (2 * Math.tan(s.degToRad(t.fov / 2)))),
        t.getWorldDirection(this.forward),
        this.viewForward.value.copy(this.forward));
      let i = this.forward.dot(qo);
      this.starGain.value = 1 - 0.62 * s.smoothstep(i, 0.35, 0.92);
    }
    snapshot() {
      return {
        stars: this.stars.geometry.instanceCount,
        starGain: +this.starGain.value.toFixed(3),
        earth: { ...ru },
        texturesLoaded: this.textures.every((e) => !!e.image),
      };
    }
    dispose() {
      for (let e of this.geometries) e.dispose();
      for (let e of this.materials) e.dispose();
      for (let e of this.textures) e.dispose();
    }
  },
  _u = {
    albedo: `#7b7771`,
    scales: [61, 9.3, 1.55],
    relief: [0.6, 0.85, 0.7],
    closeFade: [35, 80],
    midFade: [260, 700],
  };
