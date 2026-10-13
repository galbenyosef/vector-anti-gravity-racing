// assets__game-CsnOSIff 40 — math
// Lines 12043-12824 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function pm(e, t, n) {
  let r = new pn();
  r.name = `Meridian Grand Prix · track dressing`;
  let a = F,
    o = j(0),
    c = Mp,
    l = {
      kerbRuns: 0,
      kerbMetres: 0,
      boardPanels: 0,
      staticBoardPanels: 0,
      boardMetres: 0,
      fencePosts: 0,
      fenceMetres: 0,
      gridSlots: 0,
      timingLoops: 0,
      pitBoxes: 0,
      helixFins: 0,
      parapetMetres: 0,
      downlights: 0,
    },
    u = Yp(),
    d = new $p(),
    f = new $p([`wear`]),
    p = new $p([`advert`, `motion`]),
    m = new $p(),
    h = new $p(),
    _ = new $p(),
    v = new $p([`veil`]),
    y = new $p(),
    b = new $p(),
    x = Qp(Gp.kerbRed),
    C = Qp(Gp.kerbWhite),
    w = c.kerbRepeat / 2;
  for (let e of Jp()) {
    (l.kerbRuns++, (l.kerbMetres += e.to - e.from));
    for (let t = e.from; t < e.to - 1e-6; t += w) {
      let e = ((Math.round(t / w) % 2) + 2) % 2 ? C : x;
      for (let n of [-1, 1]) {
        let r = o - c.kerbWidth,
          i = [
            [r, 0.03],
            [r + 0.4, c.kerbHeight],
            [o, c.kerbHeight],
          ];
        em(d, t, t + w, w, n > 0 ? i : i.map(([e, t]) => [-e, t]).reverse(), e);
      }
    }
  }
  {
    let e = Xp(),
      t = (t) => {
        let n = Kp(t) / e.step,
          r = Math.floor(n),
          i = e.lanes.length;
        return s.lerp(e.lanes[r % i], e.lanes[(r + 1) % i], n - r);
      },
      n = c.rubberWidth / 2;
    em(
      f,
      0,
      a,
      2,
      (e) => [
        [t(e) - n, c.rubberHeight],
        [t(e) + n, c.rubberHeight],
      ],
      [0, 0, 0],
      {
        u: () => 0,
        v: (e) => e,
        extra: (e) => {
          let t = Math.min(1, Math.abs(Gn(e).curvature) * 55),
            n = u.some((t) => qp(e, t.from + 160, t.to)) ? 0.25 : 0;
          return [0.8 + 0.4 * Math.max(t, n)];
        },
      },
    );
  }
  let T = (e, t, n, r, i, a, o) => {
      S.direction === `reverse`
        ? tm(e, -n, -t, -i, -r, a, o)
        : tm(e, t, n, r, i, a, o);
    },
    E = Qp(Gp.paint),
    D = c.paintHeight;
  for (let e of Pp) {
    l.gridSlots++;
    let { distance: t, lane: n } = e;
    T(d, t + 3.2, t + 3.55, n - 3.2, n + 3.2, D, E);
    for (let e of [-1, 1])
      T(d, t + 1.2, t + 3.2, n + e * 3.2 - 0.17, n + e * 3.2 + 0.17, D, E);
    let r = n + (n > 0 ? 5.4 : -5.4);
    for (let n of om[e.slot]) {
      let [e, i, a, o] = am[n];
      T(
        d,
        t - 0.4 + i * 1.45,
        t - 0.4 + o * 1.45,
        r + 0.6 - a,
        r + 0.6 - e,
        D,
        E,
      );
    }
  }
  let O = Qp(Gp.chequerDark);
  for (let e = 0; e < 3; e++)
    for (let t = 0; t < 30; t++)
      T(d, e, e + 1, -15 + t, -14 + t, D + 0.002, (e + t) % 2 ? E : O);
  T(d, 99, 99.6, -o + 0.4, o - 0.4, D, E);
  for (let e of [5.2, 103.5, 1990, 2702, 3378]) {
    l.timingLoops++;
    for (let t of [0, 0.55])
      tm(d, e + t, e + t + 0.12, -o + 0.6, o - 0.6, D, E);
  }
  {
    let e = Np,
      t = Qp(Gp.asphalt),
      n = Qp(Gp.concrete),
      r = e.surface,
      i = r + 0.012;
    (em(
      d,
      e.from,
      e.to,
      4,
      [
        [e.workingLane[0], r],
        [e.wall[0], r],
      ],
      t,
    ),
      em(
        d,
        e.from,
        e.to,
        4,
        [
          [e.forecourt[0], r],
          [e.forecourt[1], r],
        ],
        n,
      ),
      em(
        d,
        e.from,
        e.to,
        4,
        [
          [e.forecourt[0], -0.2],
          [e.forecourt[0], r],
        ],
        n,
      ));
    for (let [t, n] of [
      [e.wall[0] - 0.5, e.wall[0] - 0.35],
      [e.fastLane[0] - 0.1, e.fastLane[0] + 0.1],
      [e.workingLane[0] - 0.1, e.workingLane[0] + 0.1],
    ])
      tm(d, e.from + 2, e.to - 2, t, n, i, E);
    for (let t of [e.from + 26, e.to - 26])
      tm(d, t, t + 0.5, e.fastLane[0], e.wall[0] - 0.5, i, E);
    for (let [t, n] of [
      [e.from + 2, 1],
      [e.to - 2, -1],
    ])
      for (let r = 0; r < 6; r++) {
        let a = t + r * 3.6 * n;
        tm(
          d,
          Math.min(a, a + n * 1.4),
          Math.max(a, a + n * 1.4),
          e.fastLane[0] + 0.6,
          e.wall[0] - 0.9,
          i,
          E,
        );
      }
    for (let t = 0; t < e.garagePairs; t++) {
      let n = e.firstPair + t * e.pairPitch,
        r = Qp(Gp.teams[t % 4]),
        a = r.map((e) => e * 0.35 + 0.02);
      for (let t of [-6, 6]) {
        l.pitBoxes++;
        let o = n + t - 4.6,
          s = n + t + 4.6,
          [c, u] = [e.workingLane[0] + 0.5, e.workingLane[1] - 0.5];
        tm(d, o, s, c, u, i - 0.004, a);
        for (let [e, t, n, a] of [
          [o, o + 0.25, c, u],
          [s - 0.25, s, c, u],
          [o, s, c, c + 0.25],
          [o, s, u - 0.25, u],
        ])
          tm(d, e, t, n, a, i, r);
        tm(d, n + t - 0.1, n + t + 0.1, c + 1.2, u - 1.2, i, E);
      }
    }
    (em(
      h,
      e.from,
      e.to,
      2,
      [
        [e.wall[0], c.barrierTop],
        [e.wall[1], c.barrierTop],
      ],
      Wp,
    ),
      em(
        h,
        e.from,
        e.to,
        2,
        [
          [e.wall[0], r],
          [e.wall[0], c.barrierTop],
        ],
        Wp,
      ),
      em(
        d,
        e.from,
        e.to,
        2,
        [
          [e.wall[0] - 0.012, 2.15],
          [e.wall[0] - 0.012, 2.45],
        ],
        Qp(Gp.coral),
      ));
    for (let [t, n] of [
      [e.from, -1],
      [e.to, 1],
    ]) {
      let i = Gn(t),
        a = (e, t) =>
          i.position
            .clone()
            .addScaledVector(i.right, e)
            .addScaledVector(i.up, t),
        o = [
          a(e.wall[0], r),
          a(e.wall[1], r),
          a(e.wall[0], c.barrierTop),
          a(e.wall[1], c.barrierTop),
        ];
      h.flat(n < 0 ? o : [o[1], o[0], o[3], o[2]], Wp);
    }
  }
  let ee = Jp(),
    te = (e, t) =>
      Lp().some((n) => t > n - Ip && e < n + Ip) ||
      ee.some((n) => qp(t, n.from, n.to) || qp(e, n.from, n.to)) ||
      Rt.some((n) => t > n.from * a && e < n.to * a);
  {
    let e = c.board;
    Zp().forEach(([t, n, r], i) => {
      let a = c.boardPitch,
        s = Math.ceil(n / a) * a;
      for (let n = s, d = 0; n + a <= r + 1e-6; n += a, d++) {
        let r = n + a - c.boardGap,
          s = (n + r) / 2;
        if (te(n, r)) continue;
        let f = Gn(s).curvature;
        if (Math.abs(f) > 0.0028 && t === -Math.sign(f)) continue;
        let m = u.some((e) => qp(n, e.from, e.to) || qp(r, e.from, e.to)),
          h = m ? 0 : t,
          g = m ? 0 : 1 + ((i * 5 + Math.floor(d / 3)) % (Rp - 1));
        (l.boardPanels++, m && l.staticBoardPanels++, (l.boardMetres += r - n));
        let _ = (t) => o + c.barrierOffset + t * c.barrierFlare - e.gap,
          v = e.base + e.height,
          y = [
            [t * _(e.base), e.base],
            [t * _(v), v],
          ];
        em(p, n, r, 2, t > 0 ? y : [y[1], y[0]], [1, 1, 1], {
          u: (e) => (t * e) / zp,
          v: (t, n) => (n - e.base) / (v - e.base),
          extra: () => [g, h],
        });
      }
    });
  }
  let k = c.fence,
    ne = (e, t) => {
      let n = new g(0, 1, 0),
        r = e.clone().addScaledVector(n, k.upright);
      return [
        e,
        r,
        r
          .clone()
          .addScaledVector(n, k.overhang * Math.SQRT1_2)
          .addScaledVector(t, k.overhang * Math.SQRT1_2),
      ];
    },
    re = (e) => {
      for (let t = 0; t < e.length - 1; t++) {
        let n = e[t],
          r = e[t + 1];
        for (let e = 0; e < 2; e++) {
          let t = e === 0 ? 0 : k.upright,
            i = e === 0 ? k.upright : k.upright + k.overhang,
            a = r.points[e]
              .clone()
              .sub(n.points[e])
              .cross(n.points[e + 1].clone().sub(n.points[e]))
              .normalize(),
            o = [
              m.vertex(n.points[e], a, Wp, n.u, t),
              m.vertex(n.points[e + 1], a, Wp, n.u, i),
              m.vertex(r.points[e], a, Wp, r.u, t),
              m.vertex(r.points[e + 1], a, Wp, r.u, i),
            ];
          m.quad(o[0], o[1], o[2], o[3]);
        }
      }
    },
    A = (e, t, n, r) => {
      l.fencePosts++;
      let i = new g(0, 1, 0);
      nm(
        _,
        e.clone().addScaledVector(i, k.upright / 2 - 0.05),
        [t, i, n],
        [0.13, k.upright + 0.1, 0.13],
        Wp,
      );
      let a = i.clone().add(r).normalize(),
        o = a.clone().cross(n).normalize();
      nm(
        _,
        e
          .clone()
          .addScaledVector(i, k.upright)
          .addScaledVector(a, k.overhang / 2),
        [o, a, n],
        [0.11, k.overhang + 0.1, 0.11],
        Wp,
      );
    };
  {
    let { from: e, to: t } = c.crowdFence,
      n = [],
      r = e;
    for (let e of Lp())
      e - Ip > r && e + Ip < t && (n.push([r, e - Ip]), (r = e + Ip));
    n.push([r, t]);
    for (let [e, t] of n) {
      l.fenceMetres += t - e;
      let n = [],
        r = Math.ceil((t - e) / 2);
      for (let i = 0; i <= r; i++) {
        let a = s.lerp(e, t, i / r),
          [l] = im(a),
          u = Ft(a, 1 * (o + k.lane), c.barrierTop + 0.04);
        n.push({ points: ne(u, l.clone().multiplyScalar(-1)), u: a });
      }
      re(n);
      for (let n = Math.ceil(e / k.posts) * k.posts; n <= t; n += k.posts) {
        let [e, , t] = im(n);
        A(
          Ft(n, 1 * (o + k.lane + 0.08), c.barrierTop + 0.02),
          e,
          t,
          e.clone().multiplyScalar(-1),
        );
      }
    }
  }
  {
    let e = c.cauldronRim,
      t = new g(e.centre[0], 30.02, e.centre[1]),
      n = e.radius,
      r = s.degToRad(e.from),
      i = s.degToRad(e.to),
      a = n * (i - r);
    l.fenceMetres += a;
    let o = Math.ceil(a / 2),
      u = (e) => t.clone().add(new g(Math.cos(e) * n, 0, Math.sin(e) * n)),
      d = [];
    for (let e = 0; e <= o; e++) {
      let t = s.lerp(r, i, e / o);
      d.push({
        points: ne(u(t), new g(-Math.cos(t), 0, -Math.sin(t))),
        u: n * t,
      });
    }
    re(d);
    let f = Math.floor(a / k.posts);
    for (let e = 0; e <= f; e++) {
      let t = r + (e * k.posts) / n,
        i = new g(Math.cos(t), 0, Math.sin(t)),
        a = new g(-Math.sin(t), 0, Math.cos(t));
      A(u(t).addScaledVector(i, 0.08), i, a, i.clone().negate());
    }
  }
  let ie = Rt.find((e) => e.glass);
  if (ie) {
    let e = ie.from * a,
      t = ie.to * a;
    l.parapetMetres += 2 * (t - e);
    let n = Qp(Gp.brass),
      r = Qp(Gp.brassDark),
      i = Qp(Gp.bronzeGlass),
      s = Qp(Gp.warm, 3),
      u = Qp(Gp.downlight, 4.5),
      f = (e, t) => (e > 0 ? t : t.map(([e, t]) => [-e, t]).reverse()),
      p = (e) => o + c.barrierOffset - c.claddingGap + e * c.barrierFlare,
      m = [
        [0.04, 0.42, Qp(Gp.bronze), y],
        [0.42, 2.18, Qp(Gp.travertine), d],
        [2.18, 2.26, Qp(Gp.warm, 2.6), b],
        [2.26, 2.78, Qp(Gp.bronze), y],
      ];
    for (let n of [-1, 1])
      for (let [r, i, a, o] of m)
        em(
          o,
          e,
          t,
          2,
          f(n, [
            [p(r), r],
            [p(i), i],
          ]),
          a,
        );
    for (let a of [-1, 1]) {
      let l = c.barrierTop;
      (em(
        y,
        e,
        t,
        2,
        f(a, [
          [o + 0.66, l],
          [o + 0.66, l + 0.2],
          [o + 1.08, l + 0.2],
          [o + 1.08, l],
        ]),
        r,
      ),
        em(
          b,
          e,
          t,
          2,
          f(a, [
            [o + 0.655, l + 0.06],
            [o + 0.655, l + 0.14],
          ]),
          s,
        ),
        em(
          v,
          e,
          t,
          2,
          f(a, [
            [o + 0.87, l + 0.2],
            [o + 0.87, l + 1.24],
          ]),
          i,
          { extra: () => [0.3] },
        ),
        em(
          y,
          e,
          t,
          2,
          f(a, [
            [o + 0.76, l + 1.22],
            [o + 0.76, l + 1.3],
            [o + 0.81, l + 1.37],
            [o + 0.93, l + 1.37],
            [o + 0.98, l + 1.3],
            [o + 0.98, l + 1.22],
          ]),
          n,
        ),
        em(
          b,
          e,
          t,
          2,
          f(a, [
            [o + 0.98, l + 1.215],
            [o + 0.76, l + 1.215],
          ]),
          s,
        ),
        em(
          b,
          e,
          t,
          2,
          f(a, [
            [o + 0.9, -1.62],
            [o + 0.3, -1.62],
          ]),
          s,
        ),
        em(
          b,
          e,
          t,
          2,
          f(a, [
            [o + 1.015, -0.3],
            [o + 1.015, -0.48],
          ]),
          s,
        ));
    }
    for (let n = Math.ceil(e / 5) * 5 + 2.5; n < t - 2; n += 5)
      for (let e of [-11, -4, 4, 11])
        (l.downlights++,
          em(
            b,
            n - 0.25,
            n + 0.25,
            0.5,
            [
              [e + 0.25, -1.62],
              [e - 0.25, -1.62],
            ],
            u,
          ));
  }
  {
    let e = cn.findIndex((e) => e.name === `VERTIPORT HELIX`),
      t =
        e < 0
          ? { from: 0, to: 0 }
          : { from: cn[e].from * a, to: (cn[e + 1]?.from ?? 1) * a },
      n = [],
      r = -1;
    for (let e = 0; e <= a; e += 2) {
      let t = Math.abs(Gn(e).curvature) > 1 / 120;
      (t && r < 0 && (r = e),
        !t && r >= 0 && (e - r > 400 && n.push({ from: r, to: e }), (r = -1)));
    }
    let i = Qp(Gp.champagne),
      s = Qp(Gp.clearGlass),
      u = Qp(Gp.ledCap, 2.2);
    for (let e of n.filter((e) => e.to > t.from && e.from < t.to)) {
      let t = -Math.sign(Gn((e.from + e.to) / 2).curvature),
        n = (e) => (t > 0 ? e : e.map(([e, t]) => [-e, t]).reverse()),
        r = c.barrierTop,
        a = r + 2.4;
      (em(
        y,
        e.from,
        e.to,
        2,
        n([
          [o + 0.7, r],
          [o + 0.7, r + 0.16],
          [o + 1.12, r + 0.16],
          [o + 1.12, r],
        ]),
        i,
      ),
        em(
          v,
          e.from,
          e.to,
          2,
          n([
            [o + 0.92, r + 0.16],
            [o + 0.92, a],
          ]),
          s,
          { extra: () => [0.22] },
        ),
        em(
          y,
          e.from,
          e.to,
          2,
          n([
            [o + 0.84, a],
            [o + 0.84, a + 0.14],
            [o + 1, a + 0.14],
            [o + 1, a],
          ]),
          i,
        ));
      for (let n = Math.ceil(e.from / 6) * 6 + 3; n < e.to - 3; n += 6) {
        l.helixFins++;
        let e = Gn(n),
          c = (n, r) =>
            e.position
              .clone()
              .addScaledVector(e.right, t * n)
              .addScaledVector(e.up, r),
          d = a + 0.5;
        v.flat(
          [
            c(o + 0.92, r + 0.16),
            c(o + 2.3, r + 0.16),
            c(o + 0.92, d),
            c(o + 2.3, d + 0.25),
          ],
          s,
          void 0,
          [0.3],
        );
        let [f, p, m] = rm(n);
        nm(
          y,
          c(o + 2.3, (r + 0.16 + d + 0.25) / 2),
          [f, p, m],
          [0.07, d + 0.25 - r - 0.16, 0.07],
          i,
        );
        let h = c(o + 1.61, d + 0.16),
          g = p
            .clone()
            .multiplyScalar(0.25)
            .addScaledVector(f, t * 1.38)
            .normalize();
        nm(
          b,
          h,
          [g, g.clone().cross(m).negate().normalize(), m],
          [1.42, 0.07, 0.11],
          u,
        );
      }
    }
  }
  let ae = L(0),
    oe = dm(n),
    se = fm(n),
    ce = new I({
      name: `Meridian deck paint`,
      vertexColors: !0,
      roughness: 0.62,
      metalness: 0,
    }),
    le = new kt({
      name: `Meridian rubbered line`,
      color: 0,
      roughness: 0.5,
      metalness: 0,
      transparent: !0,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -2,
    });
  {
    ((le.blending = 5),
      (le.blendSrc = 201),
      (le.blendDst = 205),
      (le.blendSrcAlpha = 201),
      (le.blendDstAlpha = 205));
    let e = X().y.mul(2).sub(1).abs(),
      t = B(1)
        .sub(Z(0.3, 1, e))
        .mul(ii(`wear`, `float`));
    ((le.opacityNode = t.mul(c.rubberDarkening)),
      (le.specularIntensityNode = t.mul(0.18)));
  }
  let ue = new I({
    name: `Meridian LED perimeter boards`,
    color: `#07090b`,
    roughness: 0.24,
    metalness: 0,
  });
  {
    let e = ii(`advert`, `float`),
      t = ii(`motion`, `float`),
      n = Cr(ae.div(Vp)).mul(t.abs()),
      r = Bi(e.add(n), Rp);
    ue.emissiveNode = R(
      oe,
      K(
        X().x.add(ae.mul(Bp / zp).mul(t)),
        B(1).sub(r.add(1).div(Rp)).add(X().y.mul(0.92).add(0.04).div(Rp)),
      ),
    ).rgb.mul(Hp);
  }
  let de = new I({
      name: `Meridian fence`,
      color: `#8b9299`,
      map: se,
      roughness: 0.42,
      metalness: 0.7,
      alphaTest: 0.5,
      alphaToCoverage: !0,
      side: 2,
    }),
    fe = new I({
      name: `Meridian parapet glass`,
      vertexColors: !0,
      roughness: 0.04,
      metalness: 0,
      transparent: !0,
      depthWrite: !1,
      side: 2,
    });
  ((fe.blending = 5),
    (fe.blendSrc = 201),
    (fe.blendDst = 205),
    (fe.blendSrcAlpha = 201),
    (fe.blendDstAlpha = 205),
    (fe.opacityNode = yi(Ci.dot(Ji).abs())
      .oneMinus()
      .pow(4)
      .mul(0.6)
      .add(ii(`veil`, `float`))));
  let pe = new I({
      name: `Meridian brass and champagne trim`,
      vertexColors: !0,
      roughness: 0.3,
      metalness: 1,
    }),
    me = new i({ name: `Meridian dressing light lines`, vertexColors: !0 }),
    M = {
      geometries: [],
      materials: [ce, le, ue, de, fe, pe, me],
      textures: [oe, se],
    },
    he = (e, t, n, i, { cast: a = !1, receive: o = !0, order: s = 0 } = {}) => {
      if (!e.count) return;
      let c = e.geometry(i),
        l = c.getAttribute(`normal`);
      if (l && l.array instanceof Float32Array) {
        let e = new Int8Array(l.count * 3);
        for (let t = 0; t < e.length; t++)
          e[t] = Math.round(Math.max(-1, Math.min(1, l.array[t])) * 127);
        c.setAttribute(`normal`, new vt(e, 3, !0));
      }
      M.geometries.push(c);
      let u = new N(c, t);
      ((u.name = n),
        (u.castShadow = a),
        (u.receiveShadow = o),
        (u.renderOrder = s),
        (u.matrixAutoUpdate = !1),
        u.updateMatrix(),
        r.add(u));
    };
  (he(d, ce, `Meridian kerbs, grid and pit paint`, [`normal`, `color`]),
    he(f, le, `Meridian racing line`, [`normal`, `uv`], { order: 1 }),
    he(p, ue, `Meridian LED boards`, [`normal`, `uv`]),
    he(m, de, `Meridian catch fences`, [`normal`, `uv`]),
    he(h, e.white, `Meridian pit wall`, [`normal`, `uv`], { cast: !0 }),
    he(_, e.dark, `Meridian posts and board cabinets`, [`normal`, `uv`], {
      cast: !0,
    }),
    he(y, pe, `Meridian brass and champagne rails`, [`normal`, `color`]),
    he(b, me, `Meridian soffit and cap lights`, [`color`], { receive: !1 }),
    he(v, fe, `Meridian parapet glass and fins`, [`normal`, `color`], {
      receive: !1,
      order: 2,
    }),
    (r.matrixAutoUpdate = !1));
  let ge = 0,
    _e = 0;
  for (let e of M.geometries)
    ((ge += e.index.count / 3), (_e += e.getAttribute(`position`).count));
  return {
    group: r,
    info: { ...l, batches: r.children.length, triangles: ge, vertices: _e },
    clock: ae,
    update(e, t, n) {
      n || !Number.isFinite(e) || e <= 0 || (ae.value = (ae.value + e) % Up);
    },
    dispose() {
      (M.geometries.forEach((e) => e.dispose()),
        M.materials.forEach((e) => e.dispose()),
        M.textures.forEach((e) => e.dispose()),
        r.clear());
    },
  };
}
