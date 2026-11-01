// assets__game-D43Oxqny 23 — mul
// Lines 6670-7019 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var _u = class {
    constructor({ mobile: e = !1 } = {}) {
      ((this.group = new An()),
        (this.baking = R(0)),
        (this.eye = R(new A())),
        (this.right = R(new A(1, 0, 0))),
        (this.up = R(new A(0, 1, 0))),
        (this.projectionScale = R(1)),
        (this.viewForward = R(new A(0, 0, -1))),
        (this.clock = R(0)),
        (this.starGain = R(1)),
        (this.forward = new A()),
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
        (this.stars = this.createStars(e ? lu.lowCount : lu.highCount)),
        this.group.add(this.skyDome, this.stars));
    }
    loadTexture(e, t = !1) {
      let n = new bn();
      return (
        (n.name = e),
        (n.colorSpace = t ? Ee : ``),
        (n.wrapS = C),
        (n.wrapT = m),
        (n.generateMipmaps = !0),
        (n.minFilter = Qn),
        (n.magFilter = d),
        (n.userData.loading = new Ct()
          .loadAsync(new URL(e, document.baseURI).href)
          .then((e) => {
            ((n.image = e), (n.needsUpdate = !0));
          })),
        this.textures.push(n),
        n
      );
    }
    createDome(e, t, n) {
      let r = new At({ side: 1, depthWrite: !1, fog: !1 });
      r.name = `Shackleton sky`;
      let i = W.sub(Ur).normalize(),
        a = J(Jo),
        o = V(1).sub(this.baking),
        s = uu(),
        c = Xi(i.dot(J(s.y)), i.dot(J(s.centre))),
        l = Wi(i.dot(J(s.north)).clamp(-1, 1)),
        u = c.div(Math.PI * 2),
        d = u.add(0.5),
        f = B(u).add(0.5),
        m = z(
          n,
          q(Br(Vr(d).greaterThan(0.25), f, d), l.div(Math.PI).add(0.5)),
        ).rgb,
        h = m.mul(m).mul(ou.brightness),
        g = fu(),
        _ = Math.tan(nu(iu.angularDiameter / 2)),
        v = q(i.dot(J(g.right)), i.dot(J(g.up))).div(_),
        y = v.dot(v),
        b = gr(y),
        x = Z(0, 0.01, i.dot(J(g.forward))),
        S = V(1)
          .sub(Z(0.975, 1, b))
          .mul(x),
        C = gr(V(1).sub(y).max(0)),
        w = J(g.right)
          .mul(v.x)
          .add(J(g.up).mul(v.y))
          .sub(J(g.forward).mul(C))
          .normalize(),
        T = Wi(w.dot(J(g.north)).clamp(-1, 1)),
        ee = q(
          Xi(w.dot(J(g.east)), w.dot(J(g.meridian)))
            .add(nu(iu.subLongitude))
            .div(Math.PI * 2)
            .add(0.5),
          T.div(Math.PI).add(0.5),
        ),
        te = z(e, ee),
        E = z(t, ee),
        D = E.b,
        ne = w.dot(a),
        re = ne.add(0.06).div(1.06).max(0),
        ie = Y(te.rgb, J(0.86, 0.88, 0.9), D),
        ae = J(g.forward).negate(),
        oe = fi(a.add(ae)),
        se = w
          .dot(oe)
          .max(0)
          .pow(600)
          .mul(1.6)
          .add(w.dot(oe).max(0).pow(18).mul(0.12))
          .mul(E.g)
          .mul(V(1).sub(D)),
        ce = V(1).sub(C).pow(2.2),
        le = J(0.16, 0.36, 0.95).mul(ce).mul(re),
        ue = Z(0.04, -0.14, ne),
        O = J(1, 0.7, 0.38)
          .mul(E.r)
          .mul(ue)
          .mul(V(1).sub(D.mul(0.7)))
          .mul(0.55),
        de = Yo.sunIntensity * iu.radiance,
        fe = ie
          .mul(re)
          .add(se.mul(re))
          .mul(de)
          .mul(Y(V(1), V(0.72), ce))
          .add(le.mul(de * 0.5))
          .add(O),
        pe = J(g.right).mul(v.x).add(J(g.up).mul(v.y)).normalize(),
        me = Pr(b.sub(1).max(0).div(-0.018))
          .mul(Z(0.985, 1, b))
          .mul(pe.dot(a).add(0.25).max(0))
          .mul(x)
          .mul(J(0.2, 0.42, 1).mul(de * 0.22)),
        he = Math.cos(nu(cu.radius)),
        ge = i.dot(a),
        _e = Z(
          Math.cos(nu(cu.radius * 1.12)),
          Math.cos(nu(cu.radius * 0.9)),
          ge,
        ),
        k = V(1)
          .sub(ge)
          .div(1 - he)
          .min(1),
        ve = V(1).sub(
          V(1)
            .sub(gr(V(1).sub(k)))
            .mul(0.55),
        ),
        ye = i.sub(a),
        A = ye.dot(this.right),
        j = ye.dot(this.up),
        be = ye.length(),
        xe = V(0);
      for (let e = 0; e < 3; e++) {
        let t = (e * Math.PI) / 3,
          n = hi(A.mul(-Math.sin(t)).add(j.mul(Math.cos(t))));
        xe = xe.add(Pr(n.div(be.mul(0.012).add(18e-5)).negate()));
      }
      let Se = ge
          .max(0)
          .pow(12e3)
          .mul(5)
          .add(ge.max(0).pow(1400).mul(0.32))
          .add(ge.max(0).pow(160).mul(0.018))
          .add(xe.mul(Pr(be.div(-0.035))).mul(0.55)),
        Ce = J(1, 0.975, 0.94).mul(_e.mul(ve).mul(cu.radiance).add(Se)).mul(o),
        we = Y(h.add(me), fe, S).add(Ce),
        Te = Math.max(0.05, Jo.y),
        Ee = i.y.negate().max(0.02),
        N = V(Te).div(Ee.add(Te)),
        De = i.negate().dot(a),
        Oe = V(1).add(De.max(0).pow(10).mul(0.7)),
        ke = new p(Jo.x, Jo.z).normalize(),
        Ae = fi(q(i.x, i.z).add(q(1e-4, 0)))
          .dot(q(-ke.x, -ke.y))
          .mul(0.42)
          .add(0.55);
      r.colorNode = Y(
        J(1, 0.955, 0.9)
          .mul(0.049 * Yo.sunIntensity)
          .mul(N)
          .mul(Oe)
          .mul(Ae),
        we,
        Z(-0.012, 0.004, i.y),
      );
      let P = new M(new nn(su, 48, 32), r);
      return (
        (P.name = `Shackleton sky dome`),
        (P.frustumCulled = !1),
        (P.renderOrder = 10),
        this.geometries.push(P.geometry),
        this.materials.push(r),
        P
      );
    }
    createStars(e) {
      let t = mu(lu.highCount).slice(0, e),
        n = new Ye(1, 1),
        r = new qn();
      (r.setIndex(n.getIndex()),
        r.setAttribute(`position`, n.getAttribute(`position`)),
        r.setAttribute(`uv`, n.getAttribute(`uv`)),
        n.dispose(),
        (r.instanceCount = t.length));
      let i = Array.from(
          { length: 4 },
          () => new on(new Float32Array(t.length * 4), 4),
        ),
        a = new j(),
        o = 625341585,
        s = () => (
          (o = (Math.imul(o, 1664525) + 1013904223) >>> 0),
          o / 4294967296
        );
      t.forEach((e, t) => {
        let n = gu(e.magnitude);
        hu(e.colorIndex, a);
        let r = lu.sigma + 0.45 * F.clamp((3 - e.magnitude) / 4.5, 0, 1),
          o = F.clamp((0.6 - e.magnitude) / 2.4, 0, 1),
          c = o > 0 ? 2 + o * 6 : 0,
          l = Math.max(r * 3.2, c * 2.6),
          u = lu.shimmer * F.clamp((3.4 - e.magnitude) / 4, 0, 1) + 0.035;
        (i[0].setXYZW(t, e.direction.x, e.direction.y, e.direction.z, n),
          i[1].setXYZW(t, a.r, a.g, a.b, r),
          i[2].setXYZW(t, u, 1.9 + s() * 4.4, s() * Math.PI * 2, l),
          i[3].setXYZW(t, c, 0, 0, 0));
      });
      let [c, l, u, d] = i.map(
          (e, t) => (r.setAttribute(`starRecord${t}`, e), Gr(e, `vec4`)),
        ),
        f = u.w,
        p = d.x,
        m = c.xyz,
        h = this.eye.add(m.mul(lu.distance)),
        g = f
          .mul(m.dot(this.viewForward).max(0.05))
          .mul(lu.distance)
          .div(this.projectionScale),
        _ = new At({
          transparent: !0,
          depthWrite: !1,
          blending: 2,
          side: 2,
          forceSinglePass: !0,
          fog: !1,
        });
      ((_.name = `Shackleton stars`),
        (_.positionNode = h.add(
          this.right
            .mul(Gi.x.mul(g.mul(2)))
            .add(this.up.mul(Gi.y.mul(g.mul(2)))),
        )));
      let v = Math.cos(nu(iu.angularDiameter / 2)),
        y = Z(
          Math.cos(nu(iu.angularDiameter * 0.62)),
          v,
          m.dot(J(au)),
        ).oneMinus(),
        b = V(1).sub(Z(Math.cos(nu(30)), Math.cos(nu(9)), m.dot(J(Jo)))),
        x = Z(-0.03, 0.004, m.y),
        S = this.clock.mul(u.y).add(u.z),
        C = V(1).add(
          u.x.mul(
            Hr(S)
              .mul(0.6)
              .add(Hr(S.mul(2.31).add(u.z.mul(1.7))).mul(0.4)),
          ),
        ),
        w = u.x.mul(0.35),
        T = J(
          V(1).add(Hr(S.mul(1.13)).mul(w)),
          V(1).add(Hr(S.mul(1.13).add(2.1)).mul(w)),
          V(1).add(Hr(S.mul(1.13).add(4.2)).mul(w)),
        ),
        ee = kr(
          l.rgb.mul(T).mul(c.w.mul(C).mul(this.starGain)).mul(y.mul(b).mul(x)),
        ),
        te = kr(l.w),
        E = kr(f),
        D = kr(p),
        ne = X().sub(0.5).mul(E.mul(2)),
        re = ne.dot(ne),
        ie = Pr(re.div(te.mul(te).mul(-2))).div(te.mul(te).mul(Math.PI * 2)),
        ae = V(0);
      for (let e = 0; e < 3; e++) {
        let t = (e * Math.PI) / 3 + Math.PI / 6,
          n = ne.x.mul(-Math.sin(t)).add(ne.y.mul(Math.cos(t)));
        ae = ae.add(Pr(n.mul(n).mul(-3.2)));
      }
      let oe = Br(
        D.greaterThan(0),
        ae.mul(Pr(gr(re).div(D.max(1)).negate())).mul(0.05),
        V(0),
      );
      _.colorNode = ee.mul(ie.add(oe));
      let se = new M(r, _);
      return (
        (se.name = `Shackleton star field`),
        (se.frustumCulled = !1),
        (se.castShadow = se.receiveShadow = !1),
        (se.renderOrder = 2),
        this.geometries.push(r),
        this.materials.push(_),
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
          Math.max(1, n) / (2 * Math.tan(F.degToRad(t.fov / 2)))),
        t.getWorldDirection(this.forward),
        this.viewForward.value.copy(this.forward));
      let i = this.forward.dot(Jo);
      this.starGain.value = 1 - 0.62 * F.smoothstep(i, 0.35, 0.92);
    }
    snapshot() {
      return {
        stars: this.stars.geometry.instanceCount,
        starGain: +this.starGain.value.toFixed(3),
        earth: { ...iu },
        texturesLoaded: this.textures.every((e) => !!e.image),
      };
    }
    dispose() {
      for (let e of this.geometries) e.dispose();
      for (let e of this.materials) e.dispose();
      for (let e of this.textures) e.dispose();
    }
  },
  vu = {
    albedo: `#7b7771`,
    scales: [61, 9.3, 1.55],
    relief: [0.6, 0.85, 0.7],
    closeFade: [35, 80],
    midFade: [260, 700],
  };
