// assets__game-D43Oxqny 62 — mul
// Lines 26876-28021 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
async function qv(e, t, n) {
  let r = n.mobile,
    i = n.anisotropy ?? (r ? 1 : 4),
    a = performance.now(),
    o = new An();
  o.name = `Meridian Grand Prix · Blender scenery`;
  let s = new An();
  s.name = `Meridian · static`;
  let c = new An();
  ((c.name = `Meridian · dynamic`), o.add(s, c));
  let l = R(0),
    u = n.time.sub(l),
    d = R(1),
    f = R(1),
    p = R(0.3),
    m = R(0),
    h = R(0),
    g = R(0),
    _ = R(1),
    v = R(new j(lv.ultramarine)),
    y = R(0),
    b = new Map(),
    x = new Map(),
    S = new Map(),
    C = [],
    w = new Set(),
    T = new Set(),
    ee = null,
    te = new Map(),
    E = [],
    D = null,
    ne = [],
    re = new An();
  ((re.name = `Meridian · shadow casters`), s.add(re));
  let ie = new Map(),
    ae = 0,
    oe = 0,
    se = () => ii(`meridianVariant`, `vec2`),
    ce = () => se().x,
    le = () => se().y,
    ue = jr(
      Dv.map((e) => new Qt(e.cols, e.pitch[0], e.pitch[1], e.count)),
      `vec4`,
    ),
    O = () => {
      let e = ii(`meridianRegion`, `float`),
        t = ue.element(e.toInt()),
        n = Vi(ce(), t.w);
      return q(Vi(n, t.x).mul(t.y), Cr(n.div(t.x)).mul(t.z));
    },
    de = () => ii(`color`, `vec4`),
    fe = (e, t) => (!r && !t ? gv[e] : void 0),
    pe = (e) => {
      let t = e.object;
      if (!t?.isInstancedMesh) return null;
      let n = Math.max(t.instanceMatrix.count, 1),
        r = e.getUniformBufferLimit();
      return n * 64 > r
        ? null
        : Ji(t.instanceMatrix.array, `mat4`, n).element(Er);
    },
    me = (e, t = !1) =>
      Hi((n) => {
        let r = pe(n);
        if (n.object?.isInstancedMesh && !r) return Zi;
        let i = t ? V(1) : de().x,
          a = t ? q(0, 0) : ii(`uv1`, `vec2`),
          o = qr(Er.add(5)).mul(0.4).add(0.8),
          s = u
            .mul(e * Math.PI * 2)
            .mul(t ? Br(qr(Er).greaterThan(0.5), 1, -1).mul(o) : o)
            .mul(i)
            .mul(d),
          c = r ? Gi : Zi,
          l = q(c.x, c.z).sub(a),
          f = Rr(s),
          p = Hr(s),
          m = J(
            l.x.mul(f).sub(l.y.mul(p)).add(a.x),
            c.y,
            l.x.mul(p).add(l.y.mul(f)).add(a.y),
          );
        return r ? r.mul(U(m, 1)).xyz : m;
      })(),
    he = () => {
      let e = de().y,
        t = Zi,
        n = t.x.mul(0.9).add(t.z.mul(0.7)).add(t.y.mul(0.35)).sub(u.mul(5.2)),
        r = Hr(n)
          .mul(0.6)
          .add(Hr(n.mul(2.3).add(1.7)).mul(0.25));
      return Zi.add(Ri.mul(e.mul(r).mul(0.3).mul(d)));
    },
    ge = () => {
      let e = de().w,
        t = Zi,
        n = Hr(u.mul(1.25).add(t.x.mul(0.045)).add(t.z.mul(0.06)))
          .mul(0.6)
          .add(Hr(u.mul(2.7).add(t.x.mul(0.11)).add(t.z.mul(0.03))).mul(0.25));
      return Zi.add(J(n.mul(0.42), 0, n.mul(0.24)).mul(e).mul(d));
    },
    _e = (e, t) => {
      let n = Pv,
        r = K(n.stand.x[0], e.x)
          .mul(K(e.x, n.stand.x[1]))
          .mul(K(n.stand.z[0], e.z))
          .mul(K(e.z, n.stand.z[1])),
        i = q(e.x.sub(n.cauldron.centre[0]), e.z.sub(n.cauldron.centre[1])),
        a = i.length(),
        o = K(n.cauldron.radius[0], a).mul(K(a, n.cauldron.radius[1])),
        s = Xi(i.y, i.x.negate()).mul(n.spacing / Math.PI),
        c = Br(o.greaterThan(0.5), s, e.x),
        l = H(r, o),
        f = (e) => {
          let t = Vi(u.mul(n.speed).sub(c).add(e), V(n.spacing));
          return Z(0, 4, t).mul(V(1).sub(Z(10, 22, t)));
        },
        h = H(f(0), f(n.spacing / 2).mul(m))
          .mul(l)
          .mul(d),
        g = u.mul(0.7).add(t.mul(5));
      return {
        all: H(
          h,
          K(V(1).sub(p.mul(0.32)), qr(t.mul(9173).add(Cr(g))))
            .mul(Hr(B(g).mul(Math.PI)))
            .mul(d),
        ),
        wave: h,
      };
    },
    ve = (e) => {
      let t = te.get(e);
      if (!t) throw Error(`Meridian materials library lacks ${e}.`);
      return t;
    },
    ye = (
      e,
      { st: t, dynamicBatch: n = !1, physical: i = !1, emissive: a = !0 } = {},
    ) => {
      let o = new (i ? zn : I)({
          name: e.name,
          color: e.color,
          map: e.map,
          roughness: e.roughness,
          metalness: e.metalness,
          roughnessMap: e.roughnessMap,
          metalnessMap: e.metalnessMap,
          normalMap: r ? null : e.normalMap,
          normalScale: e.normalScale,
          emissive: a ? e.emissive : new j(0),
          emissiveMap: a ? e.emissiveMap : null,
          emissiveIntensity: e.emissiveIntensity,
          side: e.side,
          alphaTest: e.alphaTest,
        }),
        s;
      if (t) {
        let n = J(e.color.r, e.color.g, e.color.b);
        if (
          (e.map && (o.colorNode = z(e.map, t).mul(U(n, 1))), e.roughnessMap)
        ) {
          let n = z(e.roughnessMap, t);
          ((s = n.g.mul(e.roughness)),
            (o.roughnessNode = s),
            (o.metalnessNode = n.b.mul(e.metalness)));
        }
        (e.normalMap &&
          !r &&
          (o.normalNode = si(
            z(e.normalMap, t),
            q(e.normalScale.x, e.normalScale.y),
          )),
          a &&
            e.emissiveMap &&
            (o.emissiveNode = z(e.emissiveMap, t)
              .rgb.mul(J(e.emissive.r, e.emissive.g, e.emissive.b))
              .mul(e.emissiveIntensity)));
      }
      let c = fe(e.name, n);
      if (
        (c &&
          ((o.roughnessNode = ma(_a[c], s)),
          (o.userData.microSurface = { ..._a[c], normal: 0 })),
        i && !r)
      ) {
        let e = o;
        ((e.clearcoat = 0.55), (e.clearcoatRoughness = 0.14));
      }
      return o;
    },
    be = (e, t, n) => {
      let r = new At({ name: e });
      return ((r.colorNode = J(t.r, t.g, t.b).mul(n)), r);
    },
    xe = (e) => {
      let t = new I({
        name: e.name,
        color: `#06090c`,
        roughness: 0.03,
        metalness: 0,
        transparent: !0,
        depthWrite: !1,
        side: 2,
      });
      return (
        (t.blending = 5),
        (t.blendSrc = 201),
        (t.blendDst = 205),
        (t.blendSrcAlpha = 201),
        (t.blendDstAlpha = 205),
        (t.opacityNode = bi(wi.dot(Yi).abs())
          .oneMinus()
          .pow(4)
          .mul(0.6)
          .add(0.14)),
        t
      );
    },
    Se = (e, t = !1) => {
      let n = X().add(q(Vi(ce(), 16).div(16), 0)),
        r = ye(e, { st: n, emissive: !1 });
      t &&
        r.colorNode &&
        (r.colorNode = r.colorNode.mul(U(0.5, 0.56, 0.66, 1)));
      let i = bi(Ui.dot(Iv)).mul(0.5),
        a = le().mul(0.8).add(1.2).mul(V(1).sub(i));
      return (
        e.emissiveMap && (r.emissiveNode = z(e.emissiveMap, n).rgb.mul(a)),
        r
      );
    },
    Ce = (e, t, n) => {
      let r = X().add(O());
      if (n && e.name === `Meridian livery atlas`) {
        let e = ii(jv, `vec2`),
          t = q(Vi(e.x.mul(2).add(e.y.mul(16)), 8).mul(0.125), 0),
          n = hi(ii(`meridianRegion`, `float`).sub(Ov.get(`door`))).lessThan(
            0.5,
          );
        r = r.add(Br(n, t, e));
      }
      let i = ye(e, {
        st: r,
        dynamicBatch: n,
        physical: n && e.name === `Meridian livery atlas`,
      });
      return (
        t === `rotor` && (i.positionNode = me(Fv[e.name] ?? 1)),
        t === `cloth` && (i.positionNode = he()),
        e.name === `Meridian fabric` && (i.side = 2),
        i
      );
    },
    we = (e, t) => {
      let n = new I({
          name: e.name,
          color: `#000000`,
          roughness: 0.3,
          metalness: 0,
        }),
        i = e.emissiveMap,
        a = e.emissiveIntensity,
        o = (i.image?.width ?? 1024) / 4,
        s = Math.max(0, Math.round(Math.log2(o / 8))),
        c = J(0.2126, 0.7152, 0.0722),
        l = (e, t) =>
          e
            .mul(a)
            .div(
              V(1).add(z(i, t).level(V(s)).rgb.dot(c).sub(0.3).max(0).mul(12)),
            );
      if (t) return ((n.emissiveNode = l(z(i, X()).rgb, X())), n);
      let d = X(),
        f = (e) => q(Vi(e, 4).mul(0.25), Cr(e.div(4)).mul(0.125)),
        p = Cr(d.x.mul(4)).add(Cr(d.y.mul(8)).mul(4)),
        m = 7.5,
        h = u.add(le().mul(m)).div(m),
        g = Cr(h),
        _ = (e) => e.add(1).add(K(15, e)),
        v = (e) => d.sub(f(p)).add(f(_(Vi(p.add(ce()).add(e), 30)))),
        y = d.y.sub(Cr(d.y.mul(8)).div(8)).mul(8),
        b = z(i, v(g)).rgb;
      if (r) return ((n.emissiveNode = l(b, v(g))), n);
      let x = Z(1 - 0.5 / m, 1, B(h)),
        S = z(i, v(g.add(1))).rgb,
        C = Y(b, S, K(y, x)),
        w = Pr(y.sub(x).div(0.02).pow(2).negate()).mul(K(0.001, x));
      return (
        (n.emissiveNode = l(C, Br(y.lessThanEqual(x), v(g.add(1)), v(g))).add(
          J(0.6, 0.8, 1).mul(w).mul(2.5),
        )),
        n
      );
    },
    Te = (e) => {
      let t = new I({ name: e.name, roughness: 0.8, metalness: 0 }),
        n = e.map;
      n.anisotropy = 1;
      let r = Vi(ce(), 48),
        i = le(),
        { all: a, wave: o } = _e(Zi, i);
      t.colorNode = z(n, q(X().x, r.add(0.5).div(64))).rgb.mul(
        o.mul(0.22).add(1),
      );
      let s = de().z,
        c = Hr(u.mul(2.1).add(i.mul(6.283)))
          .mul(0.02)
          .mul(d),
        l = hi(Hr(u.mul(6.5).add(i.mul(9)))).mul(0.15);
      return (
        (t.positionNode = Zi.add(
          J(0, s.mul(a).mul(1.36).add(a.mul(l)).add(o.mul(0.3)).add(c), 0),
        )),
        t
      );
    },
    Ee = (e) => {
      let t = new I({
          name: e.name,
          roughness: 0.85,
          metalness: 0,
          alphaTest: 0.5,
          alphaToCoverage: !r,
          side: 2,
        }),
        n = e.map;
      n.colorSpace = ``;
      let i = ve(`Meridian crowd`).map,
        a = le(),
        { all: o, wave: s } = _e(Zi, a),
        c = Vi(ce(), 16),
        l = X().add(q(c.div(16), K(0.5, o).mul(0.5))),
        d = z(n, l),
        f = Vi(ce().mul(7).add(3), 48).add(0.5).div(64),
        p = (e) => z(i, q((e + 0.5) / 4, f)).rgb,
        m = H(d.a.sub(d.r).sub(d.g).sub(d.b), 0),
        h = p(0)
          .mul(d.r)
          .add(p(1).mul(d.g))
          .add(p(2).mul(d.b))
          .add(p(3).mul(m))
          .div(H(d.a, 0.05)),
        g = e.aoMap ? z(e.aoMap, l).r : V(1);
      t.colorNode = U(h.mul(g).mul(s.mul(0.22).add(1)), d.a);
      let _ = de().z,
        v = hi(Hr(u.mul(7).add(a.mul(9)))).mul(0.12);
      return (
        (t.positionNode = Zi.add(
          J(0, _.mul(o).mul(0.22).add(o.mul(v)).add(s.mul(0.35)), 0),
        )),
        t
      );
    },
    De = (e, t) => {
      let n = new I({
        name: e.name,
        map: e.map,
        normalMap: r ? null : e.normalMap,
        normalScale: e.normalScale,
        roughness: e.roughness,
        metalness: 0,
        alphaTest: e.alphaTest || 0.5,
        alphaToCoverage: !r,
        side: 2,
      });
      return (
        e.map &&
          !r &&
          (n.emissiveNode = z(e.map, X()).rgb.mul(J(0.05, 0.07, 0.02))),
        t && (n.positionNode = ge()),
        n
      );
    },
    Oe = (e) => {
      let t = new I({
          name: e.name,
          map: e.map,
          roughness: e.roughness,
          metalness: 0,
          alphaToCoverage: !0,
          side: 2,
        }),
        n = Ur.sub(W).length();
      return (
        (t.opacityNode = z(e.map, X()).a.mul(V(1).sub(Z(110, 240, n)))),
        (t.alphaTest = 0.35),
        t
      );
    },
    ke = (e) => {
      let t = new I({
          name: e.name,
          color: e.color,
          roughness: 0.55,
          metalness: 0.2,
          alphaToCoverage: !0,
        }),
        n = Ur.sub(W).length();
      return (
        (t.opacityNode = V(1).sub(Z(120, 260, n))),
        (t.alphaTest = 0.01),
        t
      );
    },
    Ae = (e) => {
      let t = new I({
          name: e.name,
          color: e.color,
          roughness: 0.02,
          metalness: 0,
        }),
        n = J(e.emissive.r, e.emissive.g, e.emissive.b);
      if (r) return ((t.emissiveNode = n.mul(2.5)), t);
      let i = Cr(Gi.mul(J(7, 3, 7))),
        a = qr(i.x.add(i.y.mul(131)).add(i.z.mul(71)).add(le().mul(997))),
        o = wi.dot(Yi),
        s = Z(0.93, 1, B(a.mul(7).add(o.mul(2.5)).add(u.mul(0.35)))).mul(
          d.mul(0.85).add(0.15),
        );
      return ((t.emissiveNode = n.mul(s.mul(5.5).add(2.5))), t);
    },
    P = (e, t) => {
      let n = u,
        i = V(1).sub(Z(0.55, 0.8, hi(li.y)));
      if (t) {
        let t = new At({
            name: e.name,
            transparent: !0,
            depthWrite: !1,
            blending: 2,
            side: 2,
          }),
          i = W.xz,
          a = Z(-0.6, -0.85, li.y),
          o = (e, t) =>
            V(1)
              .sub(vi(i.mul(e).add(t.mul(n))))
              .pow(5),
          s = r
            ? V(0.35)
            : o(0.55, q(0.11, 0.07))
                .add(o(0.83, q(-0.08, 0.05)))
                .mul(d.mul(0.4).add(0.6));
        return (
          (t.colorNode = Y(
            J(0.03, 0.09, 0.1),
            J(0.55, 0.85, 0.9).mul(s.mul(1.6).add(0.12)),
            a,
          )),
          t
        );
      }
      let a = new I({
        name: e.name,
        color: e.color,
        roughness: 0.04,
        metalness: 0,
      });
      if (
        ((a.colorNode = Y(
          J(e.color.r, e.color.g, e.color.b),
          J(0.42, 0.58, 0.62),
          i.mul(0.45),
        )),
        r)
      )
        return a;
      let o = W,
        s = Rr(o.x.mul(0.9).add(n.mul(1.3)))
          .mul(0.08)
          .add(Rr(o.x.mul(0.35).add(o.z.mul(0.6)).sub(n.mul(0.8))).mul(0.06)),
        c = Rr(o.z.mul(1.1).sub(n.mul(1.1)))
          .mul(0.08)
          .add(Rr(o.z.mul(0.4).sub(o.x.mul(0.5)).add(n.mul(0.7))).mul(0.06)),
        l = Z(0.6, 0.9, li.y);
      a.normalNode = Yr(
        Y(
          li,
          J(s.negate(), 1, c.negate()).normalize(),
          l.mul(d.mul(0.6).add(0.4)),
        ),
      );
      let f = X().mul(4),
        p = Cr(f.x.div(0.2)),
        m = hi(B(f.x.div(0.2)).sub(0.5)),
        h = Hr(
          f.y
            .add(n.mul(1.6))
            .add(qr(p).mul(9))
            .mul(0.9)
            .add(qr(p.add(3)).mul(6.28)),
        )
          .mul(0.5)
          .add(0.5),
        g = Z(0.35, 0.1, m)
          .mul(h.pow(3))
          .mul(qr(p.add(11)).mul(0.6).add(0.4)),
        _ = V(1)
          .sub(bi(wi.dot(Yi).abs()))
          .pow(3);
      return (
        (a.emissiveNode = J(0.5, 0.66, 0.7).mul(
          g.mul(0.32).add(_.mul(0.12)).mul(i),
        )),
        a
      );
    },
    je = (e) => {
      let t = new At({ name: e.name }),
        n = K(0.75, B(u.mul(0.5).add(le())))
          .mul(f)
          .add(V(1).sub(f));
      return (
        (t.colorNode = J(e.emissive.r, e.emissive.g, e.emissive.b).mul(
          n.mul(e.emissiveIntensity * 0.85).add(0.4),
        )),
        t
      );
    },
    Ne = (e) =>
      be(e.name, e.emissive, le().mul(0.5).add(0.75).mul(e.emissiveIntensity)),
    Pe = (e) => {
      if (r) return be(e.name, e.emissive, e.emissiveIntensity);
      let t = vr(
        Hr(
          X()
            .x.mul(Math.PI * 2)
            .sub(u.mul(0.6)),
        )
          .mul(0.5)
          .add(0.5),
        6,
      );
      return be(
        e.name,
        e.emissive,
        t
          .mul(d)
          .mul(1.6)
          .add(e.emissiveIntensity * 0.85),
      );
    },
    Fe = (e, t) => {
      let n = new At({
          name: e.name,
          transparent: !0,
          depthWrite: !1,
          blending: 2,
          side: 2,
        }),
        r = K(0.55, B(X().x.mul(14).sub(u.mul(0.9))));
      return (
        (n.colorNode = J(e.emissive.r, e.emissive.g, e.emissive.b)
          .mul(r.mul(0.45).add(0.55))
          .mul(1.6)),
        t && (n.positionNode = me(0.16, !0)),
        n
      );
    },
    Ie = (e) => {
      let t = new At({ name: e.name }),
        n = Cr(X().x.mul(5)),
        r = Cr(X().y.mul(3)),
        i = H(K(r, 1.5).mul(K(n, g.sub(0.5))), K(1.5, r).mul(_)),
        a = Y(J(1, 0.06, 0.03), J(0.1, 1, 0.3), K(1.5, r));
      return ((t.colorNode = Y(J(0.012, 0.004, 0.003), a.mul(9), i)), t);
    },
    Le = (e, t) => {
      let n = S.get(t);
      if (!n) {
        let [e, i, a, o] = Nv[t];
        ((n = new Qv(t, r ? a : e, r ? o : i)), S.set(t, n));
      }
      let i = X();
      t === `ring` &&
        (i = Hi((e) => {
          let t = pe(e);
          if (!t) return q(B(X().x.add(y)), X().y);
          let n = t.mul(U(0, 0, 0, 1)).xyz,
            r = W.sub(n);
          return q(
            B(
              Xi(r.x, r.z)
                .div(Math.PI * 2)
                .mul(3)
                .negate()
                .add(y),
            ),
            X().y,
          );
        })());
      let a = z(n.texture, i).rgb;
      if (r) {
        let t = new At({ name: e.name });
        return ((t.colorNode = a.mul(2.2)), t);
      }
      let o = new I({
        name: e.name,
        color: `#030405`,
        roughness: 0.22,
        metalness: 0,
      });
      return ((o.emissiveNode = a.mul(e.emissiveIntensity * 0.55)), o);
    },
    Re = (e, t) => {
      let n = ve(e),
        r = hv(e),
        [i, a, o] = t.split(`|`),
        s = i !== ``,
        c = a === `moving`,
        l;
      switch (r.runtime) {
        case `windows`:
          l = Se(n, o === `office`);
          break;
        case `fresnel-glass`:
          l = xe(n);
          break;
        case `cloth`:
          l = Ce(n, s ? `cloth` : ``, c);
          break;
        case `advert`:
          l = we(n, o === `fixed`);
          break;
        case `crowd`:
          l = Te(n);
          break;
        case `crowd-cards`:
          l = Ee(n);
          break;
        case `foliage`:
          l = De(n, s);
          break;
        case `fence`:
          l = Oe(n);
          break;
        case `crystal`:
          l = Ae(n);
          break;
        case `lamp`:
          l =
            e === `Meridian accent light`
              ? Pe(n)
              : be(n.name, n.emissive, n.emissiveIntensity);
          break;
        case `interior`:
          l = Ne(n);
          break;
        case `beacon`:
          l = je(n);
          break;
        case `screen`:
          l = Le(n, o || `giant`);
          break;
        case `holo`:
          l = Fe(n, o === `spin`);
          break;
        case `start-lights`:
          l = Ie(n);
          break;
        case `water`:
          l = P(n, o === `caustic`);
          break;
        case `cable`:
          l = ke(n);
          break;
        default:
          if (Vv.has(e)) l = Ce(n, s ? i : ``, c);
          else {
            let t = ye(n, { dynamicBatch: c });
            (s && i === `sway` && (t.positionNode = ge()),
              s && i === `rotor` && (t.positionNode = me(Fv[e] ?? 1)),
              (l = t));
          }
      }
      l.name = e;
      let u = {
        color: s,
        uv1: s && i === `rotor`,
        variant: (r.runtime !== null && zv.has(r.runtime)) || Bv.has(e),
        region: Vv.has(e),
        life: c && e === `Meridian livery atlas`,
      };
      return (
        x.set(l, u),
        (l.userData.meridianVariant = t),
        (l.userData.meridianNeeds = u),
        l
      );
    },
    ze = (e, t, n) => {
      if (!te.has(e.name)) {
        w.add(e.name);
        return;
      }
      T.add(e.name);
      let i = `${e.name}#${Kv(e.name, n, r)}`,
        a = b.get(i);
      return (a || ((a = Re(e.name, i.split(`#`)[1])), b.set(i, a)), a);
    },
    Be = (e, t) => Kv(e.name, t, r),
    Ve = (e, t) => {
      let n = x.get(t.material),
        r = new Set([`position`, `normal`, `uv`]);
      (n?.color && r.add(`color`), n?.uv1 && r.add(`uv1`));
      for (let t of Object.keys(e.attributes)) r.has(t) || e.deleteAttribute(t);
      let i = e.getAttribute(`position`).count;
      if (
        (e.hasAttribute(`uv`) ||
          e.setAttribute(`uv`, new N(new Float32Array(i * 2), 2)),
        e.hasAttribute(`normal`) || e.computeVertexNormals(),
        n?.region)
      ) {
        let { attribute: n } = Gv(e, Hv[t.source.name], Av[t.asset] ?? []);
        e.setAttribute(`meridianRegion`, n);
      }
    },
    He = new Map();
  for (let e of t) He.set(e.asset, (He.get(e.asset) ?? 0) + e.count);
  let Ue = (e, t) => {
      if (!x.get(e.material)?.variant) return;
      let n = new Float32Array(t.length * 2);
      t.forEach((e, t) => {
        let [r, i] = Wv(e);
        ((n[t * 2] = r), (n[t * 2 + 1] = i));
      });
      let r = new on(n, 2);
      e.dynamic && r.setUsage(Ge);
      let i = { meridianVariant: r };
      if (x.get(e.material)?.life) {
        let e = io(t.length),
          n = new on(new Float32Array(e * 2), 2);
        (n.setUsage(Ge), (i[jv] = n));
      }
      return i;
    },
    We = xv[r ? `mobile` : `desktop`],
    Ke = (e, t, n) => {
      if (Cv.has(e)) return !1;
      let { merge: i } = We,
        a = (r ? t - 1 : t) * n;
      return t <= i.count || (a <= i.baked && t <= i.copies);
    },
    qe = 0,
    Je = 0,
    Ye = new Map(),
    Xe = () => {
      D &&
        (D.group.removeFromParent(),
        D.group.traverse((e) => {
          e.isSprite && e.material.dispose();
        }));
      let e = new Set(),
        t = (t) =>
          t.traverse((t) => {
            let n = t.material;
            if (n) for (let t of Array.isArray(n) ? n : [n]) e.add(t);
          });
      t(o);
      for (let e of E) t(e.group);
      Ka(o);
      for (let e of E) e.dispose();
      for (let t of b.values()) e.has(t) || t.dispose();
      for (let t of ie.values()) e.has(t) || t.dispose();
      for (let e of S.values()) e.dispose();
      (ee && Ka(ee), (ee = null));
    };
  try {
    let n = Ya(cv, i).then((e) => {
        ((ee = e.scene),
          ee.traverse((e) => {
            if (e instanceof M) {
              let t = e.material;
              te.set(t.name, t);
            }
          }));
        for (let e of pv)
          if (!te.has(e)) throw Error(`Meridian materials library lacks ${e}.`);
      }),
      a = bv.map((a) => {
        let o = e.placements[a] ?? [],
          s = t.filter((e) => e.kit === a),
          c = new Set();
        for (let e of o) c.add(e.asset);
        for (let e of s) c.add(e.asset);
        if (!c.size) return Promise.resolve(null);
        let l = new Set(s.map((e) => e.asset)),
          u = new k().makeScale(0, 0, 0),
          d = [];
        for (let e of s)
          for (let t = 0; t < e.count; t++) {
            let t = d.filter((t) => t.asset === e.asset).length;
            d.push({
              asset: e.asset,
              matrix: u.clone(),
              x: t,
              z: 0,
              variant: Av[e.asset]?.some((e) => kv.has(e)) ? 0 : t,
            });
          }
        return sv(yv[a], {
          name: `Meridian ${a}`,
          ids: [...c],
          placements: [...d, ...o],
          remap: ze,
          remapKey: Be,
          prepare: Ve,
          instanceAttributes: Ue,
          merge: Ke,
          ready: n,
          dynamic: l,
          noShadow: wv,
          noReflection: Tv,
          mobile: r,
          anisotropy: i,
          heights: [-160, 720],
          cell: We.field.cell,
          cellTriangles: We.field.triangles,
        });
      }),
      l = await Promise.allSettled([n, ...a]);
    for (let e of l.slice(1))
      e.status === `fulfilled` && e.value && E.push(e.value);
    let d = l.find((e) => e.status === `rejected`);
    if (d) throw d.reason;
    let f = [],
      p = (e) => hv(e.name)?.castShadow !== !1;
    for (let e of E) {
      for (let t of e.statics.children.slice()) {
        let e = t.material;
        (p(e) || (t.castShadow = !1), s.add(t));
      }
      for (let t of e.dynamic.children.slice())
        ((t.userData.reflectionHidden = !0), c.add(t));
      (Wa(e.group, o), f.push(...e.pieces), (e.pieces.length = 0));
    }
    if (ee) {
      let e = ee;
      (Wa(e, o),
        e.traverse((e) => {
          e instanceof M && (e.geometry.dispose(), e.material.dispose());
        }),
        (ee = null));
    }
    let m = [],
      g = new Map(),
      _ = new A(),
      y = (e, t) =>
        Number.isFinite(We.cell)
          ? `${Math.floor(e / We.cell)},${Math.floor(t / We.cell)}`
          : `city`,
      w = (e) => {
        let t = `${e.material.uuid}|${e.cell}`;
        (g.set(t, (g.get(t) ?? 0) + e.triangles), m.push(e));
      };
    for (let e of f) {
      let t = x.get(e.material);
      for (let n of e.placements) {
        let r = e.geometry.clone().applyMatrix4(n.matrix);
        if (t?.uv1 && r.hasAttribute(`uv1`)) {
          let e = r.getAttribute(`uv1`);
          for (let t = 0; t < e.count; t++)
            (_.set(e.getX(t), 0, e.getY(t)).applyMatrix4(n.matrix),
              e.setXY(t, _.x, _.z));
        }
        if (t?.variant) {
          let [e, t] = Wv(n),
            i = r.getAttribute(`position`).count,
            a = new Float32Array(i * 2);
          for (let n = 0; n < i; n++) ((a[n * 2] = e), (a[n * 2 + 1] = t));
          r.setAttribute(`meridianVariant`, new N(a, 2));
        }
        let i = (r.index?.count ?? r.getAttribute(`position`).count) / 3;
        (Ye.set(e.asset, (Ye.get(e.asset) ?? 0) + i),
          w({
            material: e.material,
            cell: y(n.x, n.z),
            shadowCell: `${Math.floor(n.x / We.shadowCell)},${Math.floor(n.z / We.shadowCell)}`,
            cast: e.castShadow && p(e.material),
            hidden: e.reflectionHidden,
            geometry: r,
            triangles: i,
          }));
      }
      e.geometry.dispose();
    }
    for (let t of e.tubes ?? [])
      for (let e of Yv(t, r)) {
        let t = `${e.material}#||`,
          n = b.get(t);
        n || ((n = Re(e.material, `||`)), b.set(t, n));
        let r = e.geometry.boundingSphere;
        w({
          material: n,
          cell: y(r.center.x, r.center.z),
          shadowCell: `tube`,
          cast: !1,
          hidden: !0,
          geometry: e.geometry,
          triangles: (e.geometry.index?.count ?? 0) / 3,
        });
      }
    let T = new Map();
    for (let e of m) {
      let t = `${e.material.uuid}|${e.cell}`;
      g.get(t) < We.cellTriangles && (t = `${e.material.uuid}|city`);
      let n = T.get(t);
      (n || T.set(t, (n = [])), n.push(e));
    }
    let se = !r;
    if (se) {
      let e = new Map();
      for (let t of m) {
        let n = t.material;
        if (!t.cast || n.transparent || n.alphaTest > 0) continue;
        let r = `${t.shadowCell}|${n.side === 0 ? `front` : `double`}`,
          i = e.get(r);
        (i || e.set(r, (i = [])), i.push(t));
      }
      for (let [t, n] of e) {
        let e = ur(
          n.map((e) => {
            let t = new Me();
            return (
              t.setAttribute(`position`, e.geometry.getAttribute(`position`)),
              t.setIndex(e.geometry.getIndex()),
              t
            );
          }),
          !1,
        );
        if (!e) throw Error(`Meridian could not merge ${t}.`);
        e.computeBoundingSphere();
        let r = t.endsWith(`front`) ? 0 : 2,
          i = ie.get(r);
        i ||
          ((i = new At({ side: r })),
          (i.name = `Meridian shadow caster`),
          ie.set(r, i));
        let a = new M(e, i);
        ((a.name = `Meridian shadow caster · ${t}`),
          a.layers.set(5),
          (a.castShadow = !0),
          (a.receiveShadow = !1),
          (a.matrixAutoUpdate = !1),
          (a.userData.reflectionHidden = !0),
          re.add(a),
          (ae += (e.index?.count ?? 0) / 3),
          (oe +=
            e.getAttribute(`position`).array.byteLength +
            (e.index?.array.byteLength ?? 0)));
      }
    }
    let ce = (e, t) => {
      let n = t[0].material,
        i = ur(
          t.map((e) => e.geometry),
          !1,
        );
      if (!i) throw Error(`Meridian could not merge ${e}.`);
      (i.computeBoundingBox(), i.computeBoundingSphere(), Jv(i, r));
      let a = new M(i, n),
        o = n.transparent,
        c = t.some((e) => e.cast) && !o;
      ((a.name = `${n.name} · merged ${e.split(`|`)[1]}${c ? `` : ` · no shadow`}`),
        (a.castShadow = c && (!se || n.alphaTest > 0)),
        (a.receiveShadow = !o),
        (a.userData.reflectionHidden = t.every((e) => e.hidden)),
        o && (a.renderOrder = 2),
        (a.matrixAutoUpdate = !1),
        s.add(a),
        ne.push(a),
        (qe += (i.index?.count ?? 0) / 3));
      for (let e of Object.values(i.attributes)) Je += e.array.byteLength;
      Je += i.index?.array.byteLength ?? 0;
    };
    for (let [e, t] of T) {
      ce(e, t);
      for (let e of t) e.geometry.dispose();
    }
    s.traverse((e) => {
      let t = e.material;
      ((t && !Array.isArray(t) && t.alphaTest > 0) ||
        e.name.startsWith(`crowd-figure`)) &&
        (e.userData.proxied = !0);
    });
    for (let e of c.children) e.userData.proxied = !0;
    let le = E.find((e) => e.info.kit === `Meridian venue`);
    le &&
      ((D = $v(le, e.placements.venue ?? [], {
        clock: u,
        celebrate: h,
        smokeTint: v,
        mobile: r,
      })),
      D && c.add(D.group));
    for (let e of S.values()) (e.draw(void 0, !1, 0), C.push(e.texture));
  } catch (e) {
    throw (Xe(), e);
  }
  let Ze = new Map();
  for (let e of E)
    for (let [t, n] of e.batches)
      n.some((e) => e.frustumCulled === !1) && Ze.set(t, n);
  let Qe = [...Ze.values()].flat().map((e) => {
      let t = e.geometry;
      t.boundingSphere || t.computeBoundingSphere();
      let n = t.boundingSphere;
      return { mesh: e, reach: n.center.length() + n.radius };
    }),
    $e = new Vn(),
    et = new k(),
    tt = new yt(),
    nt = 0,
    rt = (e) => {
      (et.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
        $e.setFromProjectionMatrix(et, e.coordinateSystem, e.reversedDepth),
        (nt = 0));
      for (let { mesh: e, reach: t } of Qe) {
        let n = e.instanceMatrix.array,
          r = !1;
        for (let i = 0, a = 0; i < e.count && !r; i++, a += 16) {
          let e = Math.max(
            n[a] * n[a] + n[a + 1] * n[a + 1] + n[a + 2] * n[a + 2],
            n[a + 4] * n[a + 4] + n[a + 5] * n[a + 5] + n[a + 6] * n[a + 6],
            n[a + 8] * n[a + 8] + n[a + 9] * n[a + 9] + n[a + 10] * n[a + 10],
          );
          e < 1e-8 ||
            (tt.center.set(n[a + 12], n[a + 13], n[a + 14]),
            (tt.radius = t * Math.sqrt(e) * 1.1 + 4),
            (r = $e.intersectsSphere(tt)));
        }
        ((e.visible = r), r || nt++);
      }
    },
    it = 0,
    at = 0,
    ot = !1,
    st = (e) => {
      let t = 0;
      return (
        e.traverse((e) => {
          e.parent !== re && (e.isMesh || e.isSprite) && t++;
        }),
        t
      );
    },
    ct = s.children.filter((e) => e.isInstancedMesh).length,
    lt = new Map();
  for (let e of ne) {
    let t = e.name.split(` · merged `)[1].split(` · `)[0];
    lt.set(t, (lt.get(t) ?? 0) + 1);
  }
  let ut = {
    source: `Blender`,
    loaded: !0,
    kit: `Meridian Grand Prix`,
    mobile: r,
    loadMs: Math.round(performance.now() - a),
    kits: Object.fromEntries(E.map((e) => [e.info.kit, e.info])),
    materials: b.size,
    libraryNames: T.size,
    unknownMaterials: [...w],
    batches: {
      staticInstanced: ct,
      merged: ne.length,
      dynamic: st(c),
      total: st(o),
      mergedCells: Object.fromEntries(lt),
      busiestCell: Math.max(0, ...lt.values()),
      shadowProxies: re.children.length,
    },
    shadowProxyTriangles: ae,
    shadowProxyMiB: +(oe / 2 ** 20).toFixed(2),
    mergedTriangles: qe,
    mergedMiB: +(Je / 2 ** 20).toFixed(2),
    mergedHeaviest: Object.fromEntries(
      [...Ye].sort((e, t) => t[1] - e[1]).slice(0, 24),
    ),
    instanceTriangles: E.reduce((e, t) => e + t.info.instanceTriangles, 0),
    prototypeTriangles: E.reduce((e, t) => e + t.info.prototypeTriangles, 0),
    screens: {
      layout: e.screens.length,
      canvases: Object.fromEntries(
        [...S].map(([e, t]) => [e, [t.width, t.height]]),
      ),
    },
    dynamicAssets: [...Ze.keys()],
    celebration: D?.info ?? null,
  };
  return {
    group: o,
    statics: s,
    batches(e) {
      return Ze.get(e) ?? [];
    },
    setVariant(e, t, n) {
      for (let r of Ze.get(e) ?? []) {
        let e = r.geometry.getAttribute(`meridianVariant`);
        !e ||
          t >= e.count ||
          (e.setX(t, ((Math.round(n) % 480) + 480) % 480),
          (e.needsUpdate = !0));
      }
    },
    update(e, t, n) {
      let i = Math.max(0, e);
      (n.reducedMotion ? (l.value = t - it) : (it = t - l.value),
        (f.value = +!n.reducedMotion),
        (d.value = n.reducedMotion
          ? 0
          : d.value + (1 - d.value) * Math.min(1, i * 2)));
      let a = Math.min(1, i * 0.8);
      ((p.value += ((n.finalLap ? 1 : 0.3) - p.value) * a),
        (m.value += (+!!n.finalLap - m.value) * a),
        (h.value += (+!!n.finalLap - h.value) * a),
        D && (D.group.visible = h.value > 0.002));
      let o = n.race?.leaderTeam;
      if (
        (o && Lv.includes(o) && v.value.set(lv[o]),
        n.countdown !== void 0 && n.countdown > 0
          ? ((g.value = Math.min(
              5,
              Math.max(0, Math.ceil(((3 - n.countdown) / 3) * 5)),
            )),
            (_.value = 0))
          : ((g.value = 0), (_.value = 1)),
        n.reducedMotion || (y.value = (y.value + i * 0.018) % 1),
        n.camera && this.cull(n.camera),
        (at += i),
        at >= (r ? 1 : 0.25))
      ) {
        at = 0;
        for (let e of S.values()) e.draw(n.race, n.finalLap, t - l.value);
      }
    },
    cull(e) {
      (rt(e), (ut.moversCulled = nt));
    },
    dispose() {
      ot || ((ot = !0), o.removeFromParent(), Xe());
    },
    info: ut,
  };
}
