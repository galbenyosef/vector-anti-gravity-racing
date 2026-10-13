// assets__game-CsnOSIff 62 — mul
// Lines 26738-27883 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
async function Fv(e, t, n) {
  let r = n.mobile,
    a = n.anisotropy ?? (r ? 1 : 4),
    o = performance.now(),
    s = new pn();
  s.name = `Meridian Grand Prix · Blender scenery`;
  let c = new pn();
  c.name = `Meridian · static`;
  let l = new pn();
  ((l.name = `Meridian · dynamic`), s.add(c, l));
  let u = L(0),
    d = n.time.sub(u),
    f = L(1),
    p = L(1),
    m = L(0.3),
    h = L(0),
    v = L(0),
    y = L(0),
    b = L(1),
    x = L(new _(Z_.ultramarine)),
    S = L(0),
    C = new Map(),
    w = new Map(),
    T = new Map(),
    E = [],
    D = new Set(),
    O = new Set(),
    ee = null,
    te = new Map(),
    k = [],
    ne = null,
    re = [],
    A = new pn();
  ((A.name = `Meridian · shadow casters`), c.add(A));
  let ie = new Map(),
    ae = 0,
    oe = 0,
    se = () => ii(`meridianVariant`, `vec2`),
    ce = () => se().x,
    le = () => se().y,
    ue = jr(
      hv.map((e) => new be(e.cols, e.pitch[0], e.pitch[1], e.count)),
      `vec4`,
    ),
    de = () => {
      let e = ii(`meridianRegion`, `float`),
        t = ue.element(e.toInt()),
        n = Bi(ce(), t.w);
      return K(Bi(n, t.x).mul(t.y), Cr(n.div(t.x)).mul(t.z));
    },
    fe = () => ii(`color`, `vec4`),
    pe = (e, t) => (!r && !t ? iv[e] : void 0),
    j = (e) => {
      let t = e.object;
      if (!t?.isInstancedMesh) return null;
      let n = Math.max(t.instanceMatrix.count, 1),
        r = e.getUniformBufferLimit();
      return n * 64 > r
        ? null
        : qi(t.instanceMatrix.array, `mat4`, n).element(Er);
    },
    me = (e, t = !1) =>
      Vi((n) => {
        let r = j(n);
        if (n.object?.isInstancedMesh && !r) return Xi;
        let i = t ? B(1) : fe().x,
          a = t ? K(0, 0) : ii(`uv1`, `vec2`),
          o = qr(Er.add(5)).mul(0.4).add(0.8),
          s = d
            .mul(e * Math.PI * 2)
            .mul(t ? Br(qr(Er).greaterThan(0.5), 1, -1).mul(o) : o)
            .mul(i)
            .mul(f),
          c = r ? Wi : Xi,
          l = K(c.x, c.z).sub(a),
          u = Rr(s),
          p = Hr(s),
          m = q(
            l.x.mul(u).sub(l.y.mul(p)).add(a.x),
            c.y,
            l.x.mul(p).add(l.y.mul(u)).add(a.y),
          );
        return r ? r.mul(H(m, 1)).xyz : m;
      })(),
    he = () => {
      let e = fe().y,
        t = Xi,
        n = t.x.mul(0.9).add(t.z.mul(0.7)).add(t.y.mul(0.35)).sub(d.mul(5.2)),
        r = Hr(n)
          .mul(0.6)
          .add(Hr(n.mul(2.3).add(1.7)).mul(0.25));
      return Xi.add(Li.mul(e.mul(r).mul(0.3).mul(f)));
    },
    ge = () => {
      let e = fe().w,
        t = Xi,
        n = Hr(d.mul(1.25).add(t.x.mul(0.045)).add(t.z.mul(0.06)))
          .mul(0.6)
          .add(Hr(d.mul(2.7).add(t.x.mul(0.11)).add(t.z.mul(0.03))).mul(0.25));
      return Xi.add(q(n.mul(0.42), 0, n.mul(0.24)).mul(e).mul(f));
    },
    _e = (e, t) => {
      let n = Sv,
        r = G(n.stand.x[0], e.x)
          .mul(G(e.x, n.stand.x[1]))
          .mul(G(n.stand.z[0], e.z))
          .mul(G(e.z, n.stand.z[1])),
        i = K(e.x.sub(n.cauldron.centre[0]), e.z.sub(n.cauldron.centre[1])),
        a = i.length(),
        o = G(n.cauldron.radius[0], a).mul(G(a, n.cauldron.radius[1])),
        s = Yi(i.y, i.x.negate()).mul(n.spacing / Math.PI),
        c = Br(o.greaterThan(0.5), s, e.x),
        l = V(r, o),
        u = (e) => {
          let t = Bi(d.mul(n.speed).sub(c).add(e), B(n.spacing));
          return Z(0, 4, t).mul(B(1).sub(Z(10, 22, t)));
        },
        p = V(u(0), u(n.spacing / 2).mul(h))
          .mul(l)
          .mul(f),
        g = d.mul(0.7).add(t.mul(5));
      return {
        all: V(
          p,
          G(B(1).sub(m.mul(0.32)), qr(t.mul(9173).add(Cr(g))))
            .mul(Hr(z(g).mul(Math.PI)))
            .mul(f),
        ),
        wave: p,
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
      let o = new (i ? kt : I)({
          name: e.name,
          color: e.color,
          map: e.map,
          roughness: e.roughness,
          metalness: e.metalness,
          roughnessMap: e.roughnessMap,
          metalnessMap: e.metalnessMap,
          normalMap: r ? null : e.normalMap,
          normalScale: e.normalScale,
          emissive: a ? e.emissive : new _(0),
          emissiveMap: a ? e.emissiveMap : null,
          emissiveIntensity: e.emissiveIntensity,
          side: e.side,
          alphaTest: e.alphaTest,
        }),
        s;
      if (t) {
        let n = q(e.color.r, e.color.g, e.color.b);
        if (
          (e.map && (o.colorNode = R(e.map, t).mul(H(n, 1))), e.roughnessMap)
        ) {
          let n = R(e.roughnessMap, t);
          ((s = n.g.mul(e.roughness)),
            (o.roughnessNode = s),
            (o.metalnessNode = n.b.mul(e.metalness)));
        }
        (e.normalMap &&
          !r &&
          (o.normalNode = si(
            R(e.normalMap, t),
            K(e.normalScale.x, e.normalScale.y),
          )),
          a &&
            e.emissiveMap &&
            (o.emissiveNode = R(e.emissiveMap, t)
              .rgb.mul(q(e.emissive.r, e.emissive.g, e.emissive.b))
              .mul(e.emissiveIntensity)));
      }
      let c = pe(e.name, n);
      if (
        (c &&
          ((o.roughnessNode = pa(ga[c], s)),
          (o.userData.microSurface = { ...ga[c], normal: 0 })),
        i && !r)
      ) {
        let e = o;
        ((e.clearcoat = 0.55), (e.clearcoatRoughness = 0.14));
      }
      return o;
    },
    xe = (e, t, n) => {
      let r = new i({ name: e });
      return ((r.colorNode = q(t.r, t.g, t.b).mul(n)), r);
    },
    Se = (e) => {
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
        (t.opacityNode = yi(Ci.dot(Ji).abs())
          .oneMinus()
          .pow(4)
          .mul(0.6)
          .add(0.14)),
        t
      );
    },
    Ce = (e, t = !1) => {
      let n = X().add(K(Bi(ce(), 16).div(16), 0)),
        r = ye(e, { st: n, emissive: !1 });
      t &&
        r.colorNode &&
        (r.colorNode = r.colorNode.mul(H(0.5, 0.56, 0.66, 1)));
      let i = yi(Hi.dot(wv)).mul(0.5),
        a = le().mul(0.8).add(1.2).mul(B(1).sub(i));
      return (
        e.emissiveMap && (r.emissiveNode = R(e.emissiveMap, n).rgb.mul(a)),
        r
      );
    },
    we = (e, t, n) => {
      let r = X().add(de());
      if (n && e.name === `Meridian livery atlas`) {
        let e = ii(yv, `vec2`),
          t = K(Bi(e.x.mul(2).add(e.y.mul(16)), 8).mul(0.125), 0),
          n = Y(ii(`meridianRegion`, `float`).sub(gv.get(`door`))).lessThan(
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
        t === `rotor` && (i.positionNode = me(Cv[e.name] ?? 1)),
        t === `cloth` && (i.positionNode = he()),
        e.name === `Meridian fabric` && (i.side = 2),
        i
      );
    },
    Te = (e, t) => {
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
        c = q(0.2126, 0.7152, 0.0722),
        l = (e, t) =>
          e
            .mul(a)
            .div(
              B(1).add(R(i, t).level(B(s)).rgb.dot(c).sub(0.3).max(0).mul(12)),
            );
      if (t) return ((n.emissiveNode = l(R(i, X()).rgb, X())), n);
      let u = X(),
        f = (e) => K(Bi(e, 4).mul(0.25), Cr(e.div(4)).mul(0.125)),
        p = Cr(u.x.mul(4)).add(Cr(u.y.mul(8)).mul(4)),
        m = 7.5,
        h = d.add(le().mul(m)).div(m),
        g = Cr(h),
        _ = (e) => e.add(1).add(G(15, e)),
        v = (e) => u.sub(f(p)).add(f(_(Bi(p.add(ce()).add(e), 30)))),
        y = u.y.sub(Cr(u.y.mul(8)).div(8)).mul(8),
        b = R(i, v(g)).rgb;
      if (r) return ((n.emissiveNode = l(b, v(g))), n);
      let x = Z(1 - 0.5 / m, 1, z(h)),
        S = R(i, v(g.add(1))).rgb,
        C = J(b, S, G(y, x)),
        w = Pr(y.sub(x).div(0.02).pow(2).negate()).mul(G(0.001, x));
      return (
        (n.emissiveNode = l(C, Br(y.lessThanEqual(x), v(g.add(1)), v(g))).add(
          q(0.6, 0.8, 1).mul(w).mul(2.5),
        )),
        n
      );
    },
    Ee = (e) => {
      let t = new I({ name: e.name, roughness: 0.8, metalness: 0 }),
        n = e.map;
      n.anisotropy = 1;
      let r = Bi(ce(), 48),
        i = le(),
        { all: a, wave: o } = _e(Xi, i);
      t.colorNode = R(n, K(X().x, r.add(0.5).div(64))).rgb.mul(
        o.mul(0.22).add(1),
      );
      let s = fe().z,
        c = Hr(d.mul(2.1).add(i.mul(6.283)))
          .mul(0.02)
          .mul(f),
        l = Y(Hr(d.mul(6.5).add(i.mul(9)))).mul(0.15);
      return (
        (t.positionNode = Xi.add(
          q(0, s.mul(a).mul(1.36).add(a.mul(l)).add(o.mul(0.3)).add(c), 0),
        )),
        t
      );
    },
    De = (e) => {
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
        { all: o, wave: s } = _e(Xi, a),
        c = Bi(ce(), 16),
        l = X().add(K(c.div(16), G(0.5, o).mul(0.5))),
        u = R(n, l),
        f = Bi(ce().mul(7).add(3), 48).add(0.5).div(64),
        p = (e) => R(i, K((e + 0.5) / 4, f)).rgb,
        m = V(u.a.sub(u.r).sub(u.g).sub(u.b), 0),
        h = p(0)
          .mul(u.r)
          .add(p(1).mul(u.g))
          .add(p(2).mul(u.b))
          .add(p(3).mul(m))
          .div(V(u.a, 0.05)),
        g = e.aoMap ? R(e.aoMap, l).r : B(1);
      t.colorNode = H(h.mul(g).mul(s.mul(0.22).add(1)), u.a);
      let _ = fe().z,
        v = Y(Hr(d.mul(7).add(a.mul(9)))).mul(0.12);
      return (
        (t.positionNode = Xi.add(
          q(0, _.mul(o).mul(0.22).add(o.mul(v)).add(s.mul(0.35)), 0),
        )),
        t
      );
    },
    Oe = (e, t) => {
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
          (n.emissiveNode = R(e.map, X()).rgb.mul(q(0.05, 0.07, 0.02))),
        t && (n.positionNode = ge()),
        n
      );
    },
    ke = (e) => {
      let t = new I({
          name: e.name,
          map: e.map,
          roughness: e.roughness,
          metalness: 0,
          alphaToCoverage: !0,
          side: 2,
        }),
        n = Ur.sub(U).length();
      return (
        (t.opacityNode = R(e.map, X()).a.mul(B(1).sub(Z(110, 240, n)))),
        (t.alphaTest = 0.35),
        t
      );
    },
    Ae = (e) => {
      let t = new I({
          name: e.name,
          color: e.color,
          roughness: 0.55,
          metalness: 0.2,
          alphaToCoverage: !0,
        }),
        n = Ur.sub(U).length();
      return (
        (t.opacityNode = B(1).sub(Z(120, 260, n))),
        (t.alphaTest = 0.01),
        t
      );
    },
    je = (e) => {
      let t = new I({
          name: e.name,
          color: e.color,
          roughness: 0.02,
          metalness: 0,
        }),
        n = q(e.emissive.r, e.emissive.g, e.emissive.b);
      if (r) return ((t.emissiveNode = n.mul(2.5)), t);
      let i = Cr(Wi.mul(q(7, 3, 7))),
        a = qr(i.x.add(i.y.mul(131)).add(i.z.mul(71)).add(le().mul(997))),
        o = Ci.dot(Ji),
        s = Z(0.93, 1, z(a.mul(7).add(o.mul(2.5)).add(d.mul(0.35)))).mul(
          f.mul(0.85).add(0.15),
        );
      return ((t.emissiveNode = n.mul(s.mul(5.5).add(2.5))), t);
    },
    Me = (e, t) => {
      let n = d,
        a = B(1).sub(Z(0.55, 0.8, Y(li.y)));
      if (t) {
        let t = new i({
            name: e.name,
            transparent: !0,
            depthWrite: !1,
            blending: 2,
            side: 2,
          }),
          a = U.xz,
          o = Z(-0.6, -0.85, li.y),
          s = (e, t) =>
            B(1)
              .sub(_i(a.mul(e).add(t.mul(n))))
              .pow(5),
          c = r
            ? B(0.35)
            : s(0.55, K(0.11, 0.07))
                .add(s(0.83, K(-0.08, 0.05)))
                .mul(f.mul(0.4).add(0.6));
        return (
          (t.colorNode = J(
            q(0.03, 0.09, 0.1),
            q(0.55, 0.85, 0.9).mul(c.mul(1.6).add(0.12)),
            o,
          )),
          t
        );
      }
      let o = new I({
        name: e.name,
        color: e.color,
        roughness: 0.04,
        metalness: 0,
      });
      if (
        ((o.colorNode = J(
          q(e.color.r, e.color.g, e.color.b),
          q(0.42, 0.58, 0.62),
          a.mul(0.45),
        )),
        r)
      )
        return o;
      let s = U,
        c = Rr(s.x.mul(0.9).add(n.mul(1.3)))
          .mul(0.08)
          .add(Rr(s.x.mul(0.35).add(s.z.mul(0.6)).sub(n.mul(0.8))).mul(0.06)),
        l = Rr(s.z.mul(1.1).sub(n.mul(1.1)))
          .mul(0.08)
          .add(Rr(s.z.mul(0.4).sub(s.x.mul(0.5)).add(n.mul(0.7))).mul(0.06)),
        u = Z(0.6, 0.9, li.y);
      o.normalNode = Yr(
        J(
          li,
          q(c.negate(), 1, l.negate()).normalize(),
          u.mul(f.mul(0.6).add(0.4)),
        ),
      );
      let p = X().mul(4),
        m = Cr(p.x.div(0.2)),
        h = Y(z(p.x.div(0.2)).sub(0.5)),
        g = Hr(
          p.y
            .add(n.mul(1.6))
            .add(qr(m).mul(9))
            .mul(0.9)
            .add(qr(m.add(3)).mul(6.28)),
        )
          .mul(0.5)
          .add(0.5),
        _ = Z(0.35, 0.1, h)
          .mul(g.pow(3))
          .mul(qr(m.add(11)).mul(0.6).add(0.4)),
        v = B(1)
          .sub(yi(Ci.dot(Ji).abs()))
          .pow(3);
      return (
        (o.emissiveNode = q(0.5, 0.66, 0.7).mul(
          _.mul(0.32).add(v.mul(0.12)).mul(a),
        )),
        o
      );
    },
    Ne = (e) => {
      let t = new i({ name: e.name }),
        n = G(0.75, z(d.mul(0.5).add(le())))
          .mul(p)
          .add(B(1).sub(p));
      return (
        (t.colorNode = q(e.emissive.r, e.emissive.g, e.emissive.b).mul(
          n.mul(e.emissiveIntensity * 0.85).add(0.4),
        )),
        t
      );
    },
    P = (e) =>
      xe(e.name, e.emissive, le().mul(0.5).add(0.75).mul(e.emissiveIntensity)),
    Pe = (e) => {
      if (r) return xe(e.name, e.emissive, e.emissiveIntensity);
      let t = vr(
        Hr(
          X()
            .x.mul(Math.PI * 2)
            .sub(d.mul(0.6)),
        )
          .mul(0.5)
          .add(0.5),
        6,
      );
      return xe(
        e.name,
        e.emissive,
        t
          .mul(f)
          .mul(1.6)
          .add(e.emissiveIntensity * 0.85),
      );
    },
    Fe = (e, t) => {
      let n = new i({
          name: e.name,
          transparent: !0,
          depthWrite: !1,
          blending: 2,
          side: 2,
        }),
        r = G(0.55, z(X().x.mul(14).sub(d.mul(0.9))));
      return (
        (n.colorNode = q(e.emissive.r, e.emissive.g, e.emissive.b)
          .mul(r.mul(0.45).add(0.55))
          .mul(1.6)),
        t && (n.positionNode = me(0.16, !0)),
        n
      );
    },
    Ie = (e) => {
      let t = new i({ name: e.name }),
        n = Cr(X().x.mul(5)),
        r = Cr(X().y.mul(3)),
        a = V(G(r, 1.5).mul(G(n, y.sub(0.5))), G(1.5, r).mul(b)),
        o = J(q(1, 0.06, 0.03), q(0.1, 1, 0.3), G(1.5, r));
      return ((t.colorNode = J(q(0.012, 0.004, 0.003), o.mul(9), a)), t);
    },
    Le = (e, t) => {
      let n = T.get(t);
      if (!n) {
        let [e, i, a, o] = xv[t];
        ((n = new Bv(t, r ? a : e, r ? o : i)), T.set(t, n));
      }
      let a = X();
      t === `ring` &&
        (a = Vi((e) => {
          let t = j(e);
          if (!t) return K(z(X().x.add(S)), X().y);
          let n = t.mul(H(0, 0, 0, 1)).xyz,
            r = U.sub(n);
          return K(
            z(
              Yi(r.x, r.z)
                .div(Math.PI * 2)
                .mul(3)
                .negate()
                .add(S),
            ),
            X().y,
          );
        })());
      let o = R(n.texture, a).rgb;
      if (r) {
        let t = new i({ name: e.name });
        return ((t.colorNode = o.mul(2.2)), t);
      }
      let s = new I({
        name: e.name,
        color: `#030405`,
        roughness: 0.22,
        metalness: 0,
      });
      return ((s.emissiveNode = o.mul(e.emissiveIntensity * 0.55)), s);
    },
    F = (e, t) => {
      let n = ve(e),
        r = rv(e),
        [i, a, o] = t.split(`|`),
        s = i !== ``,
        c = a === `moving`,
        l;
      switch (r.runtime) {
        case `windows`:
          l = Ce(n, o === `office`);
          break;
        case `fresnel-glass`:
          l = Se(n);
          break;
        case `cloth`:
          l = we(n, s ? `cloth` : ``, c);
          break;
        case `advert`:
          l = Te(n, o === `fixed`);
          break;
        case `crowd`:
          l = Ee(n);
          break;
        case `crowd-cards`:
          l = De(n);
          break;
        case `foliage`:
          l = Oe(n, s);
          break;
        case `fence`:
          l = ke(n);
          break;
        case `crystal`:
          l = je(n);
          break;
        case `lamp`:
          l =
            e === `Meridian accent light`
              ? Pe(n)
              : xe(n.name, n.emissive, n.emissiveIntensity);
          break;
        case `interior`:
          l = P(n);
          break;
        case `beacon`:
          l = Ne(n);
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
          l = Me(n, o === `caustic`);
          break;
        case `cable`:
          l = Ae(n);
          break;
        default:
          if (kv.has(e)) l = we(n, s ? i : ``, c);
          else {
            let t = ye(n, { dynamicBatch: c });
            (s && i === `sway` && (t.positionNode = ge()),
              s && i === `rotor` && (t.positionNode = me(Cv[e] ?? 1)),
              (l = t));
          }
      }
      l.name = e;
      let u = {
        color: s,
        uv1: s && i === `rotor`,
        variant: (r.runtime !== null && Dv.has(r.runtime)) || Ov.has(e),
        region: kv.has(e),
        life: c && e === `Meridian livery atlas`,
      };
      return (
        w.set(l, u),
        (l.userData.meridianVariant = t),
        (l.userData.meridianNeeds = u),
        l
      );
    },
    Re = (e, t, n) => {
      if (!te.has(e.name)) {
        D.add(e.name);
        return;
      }
      O.add(e.name);
      let i = `${e.name}#${Pv(e.name, n, r)}`,
        a = C.get(i);
      return (a || ((a = F(e.name, i.split(`#`)[1])), C.set(i, a)), a);
    },
    ze = (e, t) => Pv(e.name, t, r),
    Ve = (e, t) => {
      let n = w.get(t.material),
        r = new Set([`position`, `normal`, `uv`]);
      (n?.color && r.add(`color`), n?.uv1 && r.add(`uv1`));
      for (let t of Object.keys(e.attributes)) r.has(t) || e.deleteAttribute(t);
      let i = e.getAttribute(`position`).count;
      if (
        (e.hasAttribute(`uv`) ||
          e.setAttribute(`uv`, new ct(new Float32Array(i * 2), 2)),
        e.hasAttribute(`normal`) || e.computeVertexNormals(),
        n?.region)
      ) {
        let { attribute: n } = Nv(e, Av[t.source.name], vv[t.asset] ?? []);
        e.setAttribute(`meridianRegion`, n);
      }
    },
    He = new Map();
  for (let e of t) He.set(e.asset, (He.get(e.asset) ?? 0) + e.count);
  let Ue = (e, t) => {
      if (!w.get(e.material)?.variant) return;
      let n = new Float32Array(t.length * 2);
      t.forEach((e, t) => {
        let [r, i] = Mv(e);
        ((n[t * 2] = r), (n[t * 2 + 1] = i));
      });
      let r = new Ct(n, 2);
      e.dynamic && r.setUsage(Be);
      let i = { meridianVariant: r };
      if (w.get(e.material)?.life) {
        let e = ro(t.length),
          n = new Ct(new Float32Array(e * 2), 2);
        (n.setUsage(Be), (i[yv] = n));
      }
      return i;
    },
    We = lv[r ? `mobile` : `desktop`],
    Ge = (e, t, n) => {
      if (dv.has(e)) return !1;
      let { merge: i } = We,
        a = (r ? t - 1 : t) * n;
      return t <= i.count || (a <= i.baked && t <= i.copies);
    },
    Ke = 0,
    qe = 0,
    Je = new Map(),
    Ye = () => {
      ne &&
        (ne.group.removeFromParent(),
        ne.group.traverse((e) => {
          e.isSprite && e.material.dispose();
        }));
      let e = new Set(),
        t = (t) =>
          t.traverse((t) => {
            let n = t.material;
            if (n) for (let t of Array.isArray(n) ? n : [n]) e.add(t);
          });
      t(s);
      for (let e of k) t(e.group);
      Ga(s);
      for (let e of k) e.dispose();
      for (let t of C.values()) e.has(t) || t.dispose();
      for (let t of ie.values()) e.has(t) || t.dispose();
      for (let e of T.values()) e.dispose();
      (ee && Ga(ee), (ee = null));
    };
  try {
    let n = Ja(X_, a).then((e) => {
        ((ee = e.scene),
          ee.traverse((e) => {
            if (e instanceof N) {
              let t = e.material;
              te.set(t.name, t);
            }
          }));
        for (let e of tv)
          if (!te.has(e)) throw Error(`Meridian materials library lacks ${e}.`);
      }),
      o = cv.map((i) => {
        let o = e.placements[i] ?? [],
          s = t.filter((e) => e.kit === i),
          c = new Set();
        for (let e of o) c.add(e.asset);
        for (let e of s) c.add(e.asset);
        if (!c.size) return Promise.resolve(null);
        let l = new Set(s.map((e) => e.asset)),
          u = new M().makeScale(0, 0, 0),
          d = [];
        for (let e of s)
          for (let t = 0; t < e.count; t++) {
            let t = d.filter((t) => t.asset === e.asset).length;
            d.push({
              asset: e.asset,
              matrix: u.clone(),
              x: t,
              z: 0,
              variant: vv[e.asset]?.some((e) => _v.has(e)) ? 0 : t,
            });
          }
        return Y_(sv[i], {
          name: `Meridian ${i}`,
          ids: [...c],
          placements: [...d, ...o],
          remap: Re,
          remapKey: ze,
          prepare: Ve,
          instanceAttributes: Ue,
          merge: Ge,
          ready: n,
          dynamic: l,
          noShadow: fv,
          noReflection: pv,
          mobile: r,
          anisotropy: a,
          heights: [-160, 720],
          cell: We.field.cell,
          cellTriangles: We.field.triangles,
        });
      }),
      u = await Promise.allSettled([n, ...o]);
    for (let e of u.slice(1))
      e.status === `fulfilled` && e.value && k.push(e.value);
    let f = u.find((e) => e.status === `rejected`);
    if (f) throw f.reason;
    let p = [],
      m = (e) => rv(e.name)?.castShadow !== !1;
    for (let e of k) {
      for (let t of e.statics.children.slice()) {
        let e = t.material;
        (m(e) || (t.castShadow = !1), c.add(t));
      }
      for (let t of e.dynamic.children.slice())
        ((t.userData.reflectionHidden = !0), l.add(t));
      (Ua(e.group, s), p.push(...e.pieces), (e.pieces.length = 0));
    }
    if (ee) {
      let e = ee;
      (Ua(e, s),
        e.traverse((e) => {
          e instanceof N && (e.geometry.dispose(), e.material.dispose());
        }),
        (ee = null));
    }
    let h = [],
      _ = new Map(),
      y = new g(),
      b = (e, t) =>
        Number.isFinite(We.cell)
          ? `${Math.floor(e / We.cell)},${Math.floor(t / We.cell)}`
          : `city`,
      S = (e) => {
        let t = `${e.material.uuid}|${e.cell}`;
        (_.set(t, (_.get(t) ?? 0) + e.triangles), h.push(e));
      };
    for (let e of p) {
      let t = w.get(e.material);
      for (let n of e.placements) {
        let r = e.geometry.clone().applyMatrix4(n.matrix);
        if (t?.uv1 && r.hasAttribute(`uv1`)) {
          let e = r.getAttribute(`uv1`);
          for (let t = 0; t < e.count; t++)
            (y.set(e.getX(t), 0, e.getY(t)).applyMatrix4(n.matrix),
              e.setXY(t, y.x, y.z));
        }
        if (t?.variant) {
          let [e, t] = Mv(n),
            i = r.getAttribute(`position`).count,
            a = new Float32Array(i * 2);
          for (let n = 0; n < i; n++) ((a[n * 2] = e), (a[n * 2 + 1] = t));
          r.setAttribute(`meridianVariant`, new ct(a, 2));
        }
        let i = (r.index?.count ?? r.getAttribute(`position`).count) / 3;
        (Je.set(e.asset, (Je.get(e.asset) ?? 0) + i),
          S({
            material: e.material,
            cell: b(n.x, n.z),
            shadowCell: `${Math.floor(n.x / We.shadowCell)},${Math.floor(n.z / We.shadowCell)}`,
            cast: e.castShadow && m(e.material),
            hidden: e.reflectionHidden,
            geometry: r,
            triangles: i,
          }));
      }
      e.geometry.dispose();
    }
    for (let t of e.tubes ?? [])
      for (let e of Lv(t, r)) {
        let t = `${e.material}#||`,
          n = C.get(t);
        n || ((n = F(e.material, `||`)), C.set(t, n));
        let r = e.geometry.boundingSphere;
        S({
          material: n,
          cell: b(r.center.x, r.center.z),
          shadowCell: `tube`,
          cast: !1,
          hidden: !0,
          geometry: e.geometry,
          triangles: (e.geometry.index?.count ?? 0) / 3,
        });
      }
    let D = new Map();
    for (let e of h) {
      let t = `${e.material.uuid}|${e.cell}`;
      _.get(t) < We.cellTriangles && (t = `${e.material.uuid}|city`);
      let n = D.get(t);
      (n || D.set(t, (n = [])), n.push(e));
    }
    let O = !r;
    if (O) {
      let e = new Map();
      for (let t of h) {
        let n = t.material;
        if (!t.cast || n.transparent || n.alphaTest > 0) continue;
        let r = `${t.shadowCell}|${n.side === 0 ? `front` : `double`}`,
          i = e.get(r);
        (i || e.set(r, (i = [])), i.push(t));
      }
      for (let [t, n] of e) {
        let e = ur(
          n.map((e) => {
            let t = new tr();
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
          a = ie.get(r);
        a ||
          ((a = new i({ side: r })),
          (a.name = `Meridian shadow caster`),
          ie.set(r, a));
        let o = new N(e, a);
        ((o.name = `Meridian shadow caster · ${t}`),
          o.layers.set(5),
          (o.castShadow = !0),
          (o.receiveShadow = !1),
          (o.matrixAutoUpdate = !1),
          (o.userData.reflectionHidden = !0),
          A.add(o),
          (ae += (e.index?.count ?? 0) / 3),
          (oe +=
            e.getAttribute(`position`).array.byteLength +
            (e.index?.array.byteLength ?? 0)));
      }
    }
    let se = (e, t) => {
      let n = t[0].material,
        i = ur(
          t.map((e) => e.geometry),
          !1,
        );
      if (!i) throw Error(`Meridian could not merge ${e}.`);
      (i.computeBoundingBox(), i.computeBoundingSphere(), Iv(i, r));
      let a = new N(i, n),
        o = n.transparent,
        s = t.some((e) => e.cast) && !o;
      ((a.name = `${n.name} · merged ${e.split(`|`)[1]}${s ? `` : ` · no shadow`}`),
        (a.castShadow = s && (!O || n.alphaTest > 0)),
        (a.receiveShadow = !o),
        (a.userData.reflectionHidden = t.every((e) => e.hidden)),
        o && (a.renderOrder = 2),
        (a.matrixAutoUpdate = !1),
        c.add(a),
        re.push(a),
        (Ke += (i.index?.count ?? 0) / 3));
      for (let e of Object.values(i.attributes)) qe += e.array.byteLength;
      qe += i.index?.array.byteLength ?? 0;
    };
    for (let [e, t] of D) {
      se(e, t);
      for (let e of t) e.geometry.dispose();
    }
    c.traverse((e) => {
      let t = e.material;
      ((t && !Array.isArray(t) && t.alphaTest > 0) ||
        e.name.startsWith(`crowd-figure`)) &&
        (e.userData.proxied = !0);
    });
    for (let e of l.children) e.userData.proxied = !0;
    let ce = k.find((e) => e.info.kit === `Meridian venue`);
    ce &&
      ((ne = Vv(ce, e.placements.venue ?? [], {
        clock: d,
        celebrate: v,
        smokeTint: x,
        mobile: r,
      })),
      ne && l.add(ne.group));
    for (let e of T.values()) (e.draw(void 0, !1, 0), E.push(e.texture));
  } catch (e) {
    throw (Ye(), e);
  }
  let Xe = new Map();
  for (let e of k)
    for (let [t, n] of e.batches)
      n.some((e) => e.frustumCulled === !1) && Xe.set(t, n);
  let Ze = [...Xe.values()].flat().map((e) => {
      let t = e.geometry;
      t.boundingSphere || t.computeBoundingSphere();
      let n = t.boundingSphere;
      return { mesh: e, reach: n.center.length() + n.radius };
    }),
    Qe = new jt(),
    $e = new M(),
    et = new Mn(),
    tt = 0,
    nt = (e) => {
      ($e.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
        Qe.setFromProjectionMatrix($e, e.coordinateSystem, e.reversedDepth),
        (tt = 0));
      for (let { mesh: e, reach: t } of Ze) {
        let n = e.instanceMatrix.array,
          r = !1;
        for (let i = 0, a = 0; i < e.count && !r; i++, a += 16) {
          let e = Math.max(
            n[a] * n[a] + n[a + 1] * n[a + 1] + n[a + 2] * n[a + 2],
            n[a + 4] * n[a + 4] + n[a + 5] * n[a + 5] + n[a + 6] * n[a + 6],
            n[a + 8] * n[a + 8] + n[a + 9] * n[a + 9] + n[a + 10] * n[a + 10],
          );
          e < 1e-8 ||
            (et.center.set(n[a + 12], n[a + 13], n[a + 14]),
            (et.radius = t * Math.sqrt(e) * 1.1 + 4),
            (r = Qe.intersectsSphere(et)));
        }
        ((e.visible = r), r || tt++);
      }
    },
    rt = 0,
    it = 0,
    at = !1,
    ot = (e) => {
      let t = 0;
      return (
        e.traverse((e) => {
          e.parent !== A && (e.isMesh || e.isSprite) && t++;
        }),
        t
      );
    },
    st = c.children.filter((e) => e.isInstancedMesh).length,
    lt = new Map();
  for (let e of re) {
    let t = e.name.split(` · merged `)[1].split(` · `)[0];
    lt.set(t, (lt.get(t) ?? 0) + 1);
  }
  let ut = {
    source: `Blender`,
    loaded: !0,
    kit: `Meridian Grand Prix`,
    mobile: r,
    loadMs: Math.round(performance.now() - o),
    kits: Object.fromEntries(k.map((e) => [e.info.kit, e.info])),
    materials: C.size,
    libraryNames: O.size,
    unknownMaterials: [...D],
    batches: {
      staticInstanced: st,
      merged: re.length,
      dynamic: ot(l),
      total: ot(s),
      mergedCells: Object.fromEntries(lt),
      busiestCell: Math.max(0, ...lt.values()),
      shadowProxies: A.children.length,
    },
    shadowProxyTriangles: ae,
    shadowProxyMiB: +(oe / 2 ** 20).toFixed(2),
    mergedTriangles: Ke,
    mergedMiB: +(qe / 2 ** 20).toFixed(2),
    mergedHeaviest: Object.fromEntries(
      [...Je].sort((e, t) => t[1] - e[1]).slice(0, 24),
    ),
    instanceTriangles: k.reduce((e, t) => e + t.info.instanceTriangles, 0),
    prototypeTriangles: k.reduce((e, t) => e + t.info.prototypeTriangles, 0),
    screens: {
      layout: e.screens.length,
      canvases: Object.fromEntries(
        [...T].map(([e, t]) => [e, [t.width, t.height]]),
      ),
    },
    dynamicAssets: [...Xe.keys()],
    celebration: ne?.info ?? null,
  };
  return {
    group: s,
    statics: c,
    batches(e) {
      return Xe.get(e) ?? [];
    },
    setVariant(e, t, n) {
      for (let r of Xe.get(e) ?? []) {
        let e = r.geometry.getAttribute(`meridianVariant`);
        !e ||
          t >= e.count ||
          (e.setX(t, ((Math.round(n) % 480) + 480) % 480),
          (e.needsUpdate = !0));
      }
    },
    update(e, t, n) {
      let i = Math.max(0, e);
      (n.reducedMotion ? (u.value = t - rt) : (rt = t - u.value),
        (p.value = +!n.reducedMotion),
        (f.value = n.reducedMotion
          ? 0
          : f.value + (1 - f.value) * Math.min(1, i * 2)));
      let a = Math.min(1, i * 0.8);
      ((m.value += ((n.finalLap ? 1 : 0.3) - m.value) * a),
        (h.value += (+!!n.finalLap - h.value) * a),
        (v.value += (+!!n.finalLap - v.value) * a),
        ne && (ne.group.visible = v.value > 0.002));
      let o = n.race?.leaderTeam;
      if (
        (o && Tv.includes(o) && x.value.set(Z_[o]),
        n.countdown !== void 0 && n.countdown > 0
          ? ((y.value = Math.min(
              5,
              Math.max(0, Math.ceil(((3 - n.countdown) / 3) * 5)),
            )),
            (b.value = 0))
          : ((y.value = 0), (b.value = 1)),
        n.reducedMotion || (S.value = (S.value + i * 0.018) % 1),
        n.camera && this.cull(n.camera),
        (it += i),
        it >= (r ? 1 : 0.25))
      ) {
        it = 0;
        for (let e of T.values()) e.draw(n.race, n.finalLap, t - u.value);
      }
    },
    cull(e) {
      (nt(e), (ut.moversCulled = tt));
    },
    dispose() {
      at || ((at = !0), s.removeFromParent(), Ye());
    },
    info: ut,
  };
}
