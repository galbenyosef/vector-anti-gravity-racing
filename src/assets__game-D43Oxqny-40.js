// assets__game-D43Oxqny 40 — math
// Lines 12078-12859 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function mm(e, t, n) {
  let r = new An();
  r.name = `Meridian Grand Prix · track dressing`;
  let i = v,
    a = P(0),
    o = Np,
    s = {
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
    c = Xp(),
    l = new em(),
    u = new em([`wear`]),
    d = new em([`advert`, `motion`]),
    f = new em(),
    p = new em(),
    m = new em(),
    g = new em([`veil`]),
    _ = new em(),
    y = new em(),
    b = $p(Kp.kerbRed),
    x = $p(Kp.kerbWhite),
    S = o.kerbRepeat / 2;
  for (let e of Yp()) {
    (s.kerbRuns++, (s.kerbMetres += e.to - e.from));
    for (let t = e.from; t < e.to - 1e-6; t += S) {
      let e = ((Math.round(t / S) % 2) + 2) % 2 ? x : b;
      for (let n of [-1, 1]) {
        let r = a - o.kerbWidth,
          i = [
            [r, 0.03],
            [r + 0.4, o.kerbHeight],
            [a, o.kerbHeight],
          ];
        tm(l, t, t + S, S, n > 0 ? i : i.map(([e, t]) => [-e, t]).reverse(), e);
      }
    }
  }
  {
    let e = Zp(),
      t = (t) => {
        let n = qp(t) / e.step,
          r = Math.floor(n),
          i = e.lanes.length;
        return F.lerp(e.lanes[r % i], e.lanes[(r + 1) % i], n - r);
      },
      n = o.rubberWidth / 2;
    tm(
      u,
      0,
      i,
      2,
      (e) => [
        [t(e) - n, o.rubberHeight],
        [t(e) + n, o.rubberHeight],
      ],
      [0, 0, 0],
      {
        u: () => 0,
        v: (e) => e,
        extra: (e) => {
          let t = Math.min(1, Math.abs(Ot(e).curvature) * 55),
            n = c.some((t) => Jp(e, t.from + 160, t.to)) ? 0.25 : 0;
          return [0.8 + 0.4 * Math.max(t, n)];
        },
      },
    );
  }
  let C = (e, t, n, r, i, a, o) => {
      h.direction === `reverse`
        ? nm(e, -n, -t, -i, -r, a, o)
        : nm(e, t, n, r, i, a, o);
    },
    w = $p(Kp.paint),
    T = o.paintHeight;
  for (let e of Fp) {
    s.gridSlots++;
    let { distance: t, lane: n } = e;
    C(l, t + 3.2, t + 3.55, n - 3.2, n + 3.2, T, w);
    for (let e of [-1, 1])
      C(l, t + 1.2, t + 3.2, n + e * 3.2 - 0.17, n + e * 3.2 + 0.17, T, w);
    let r = n + (n > 0 ? 5.4 : -5.4);
    for (let n of sm[e.slot]) {
      let [e, i, a, o] = om[n];
      C(
        l,
        t - 0.4 + i * 1.45,
        t - 0.4 + o * 1.45,
        r + 0.6 - a,
        r + 0.6 - e,
        T,
        w,
      );
    }
  }
  let ee = $p(Kp.chequerDark);
  for (let e = 0; e < 3; e++)
    for (let t = 0; t < 30; t++)
      C(l, e, e + 1, -15 + t, -14 + t, T + 0.002, (e + t) % 2 ? w : ee);
  C(l, 99, 99.6, -a + 0.4, a - 0.4, T, w);
  for (let e of [5.2, 103.5, 1990, 2702, 3378]) {
    s.timingLoops++;
    for (let t of [0, 0.55])
      nm(l, e + t, e + t + 0.12, -a + 0.6, a - 0.6, T, w);
  }
  {
    let e = Pp,
      t = $p(Kp.asphalt),
      n = $p(Kp.concrete),
      r = e.surface,
      i = r + 0.012;
    (tm(
      l,
      e.from,
      e.to,
      4,
      [
        [e.workingLane[0], r],
        [e.wall[0], r],
      ],
      t,
    ),
      tm(
        l,
        e.from,
        e.to,
        4,
        [
          [e.forecourt[0], r],
          [e.forecourt[1], r],
        ],
        n,
      ),
      tm(
        l,
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
      nm(l, e.from + 2, e.to - 2, t, n, i, w);
    for (let t of [e.from + 26, e.to - 26])
      nm(l, t, t + 0.5, e.fastLane[0], e.wall[0] - 0.5, i, w);
    for (let [t, n] of [
      [e.from + 2, 1],
      [e.to - 2, -1],
    ])
      for (let r = 0; r < 6; r++) {
        let a = t + r * 3.6 * n;
        nm(
          l,
          Math.min(a, a + n * 1.4),
          Math.max(a, a + n * 1.4),
          e.fastLane[0] + 0.6,
          e.wall[0] - 0.9,
          i,
          w,
        );
      }
    for (let t = 0; t < e.garagePairs; t++) {
      let n = e.firstPair + t * e.pairPitch,
        r = $p(Kp.teams[t % 4]),
        a = r.map((e) => e * 0.35 + 0.02);
      for (let t of [-6, 6]) {
        s.pitBoxes++;
        let o = n + t - 4.6,
          c = n + t + 4.6,
          [u, d] = [e.workingLane[0] + 0.5, e.workingLane[1] - 0.5];
        nm(l, o, c, u, d, i - 0.004, a);
        for (let [e, t, n, a] of [
          [o, o + 0.25, u, d],
          [c - 0.25, c, u, d],
          [o, c, u, u + 0.25],
          [o, c, d - 0.25, d],
        ])
          nm(l, e, t, n, a, i, r);
        nm(l, n + t - 0.1, n + t + 0.1, u + 1.2, d - 1.2, i, w);
      }
    }
    (tm(
      p,
      e.from,
      e.to,
      2,
      [
        [e.wall[0], o.barrierTop],
        [e.wall[1], o.barrierTop],
      ],
      Gp,
    ),
      tm(
        p,
        e.from,
        e.to,
        2,
        [
          [e.wall[0], r],
          [e.wall[0], o.barrierTop],
        ],
        Gp,
      ),
      tm(
        l,
        e.from,
        e.to,
        2,
        [
          [e.wall[0] - 0.012, 2.15],
          [e.wall[0] - 0.012, 2.45],
        ],
        $p(Kp.coral),
      ));
    for (let [t, n] of [
      [e.from, -1],
      [e.to, 1],
    ]) {
      let i = Ot(t),
        a = (e, t) =>
          i.position
            .clone()
            .addScaledVector(i.right, e)
            .addScaledVector(i.up, t),
        s = [
          a(e.wall[0], r),
          a(e.wall[1], r),
          a(e.wall[0], o.barrierTop),
          a(e.wall[1], o.barrierTop),
        ];
      p.flat(n < 0 ? s : [s[1], s[0], s[3], s[2]], Gp);
    }
  }
  let te = Yp(),
    E = (e, t) =>
      Rp().some((n) => t > n - Lp && e < n + Lp) ||
      te.some((n) => Jp(t, n.from, n.to) || Jp(e, n.from, n.to)) ||
      ct.some((n) => t > n.from * i && e < n.to * i);
  {
    let e = o.board;
    Qp().forEach(([t, n, r], i) => {
      let l = o.boardPitch,
        u = Math.ceil(n / l) * l;
      for (let n = u, f = 0; n + l <= r + 1e-6; n += l, f++) {
        let r = n + l - o.boardGap,
          u = (n + r) / 2;
        if (E(n, r)) continue;
        let p = Ot(u).curvature;
        if (Math.abs(p) > 0.0028 && t === -Math.sign(p)) continue;
        let m = c.some((e) => Jp(n, e.from, e.to) || Jp(r, e.from, e.to)),
          h = m ? 0 : t,
          g = m ? 0 : 1 + ((i * 5 + Math.floor(f / 3)) % (zp - 1));
        (s.boardPanels++, m && s.staticBoardPanels++, (s.boardMetres += r - n));
        let _ = (t) => a + o.barrierOffset + t * o.barrierFlare - e.gap,
          v = e.base + e.height,
          y = [
            [t * _(e.base), e.base],
            [t * _(v), v],
          ];
        tm(d, n, r, 2, t > 0 ? y : [y[1], y[0]], [1, 1, 1], {
          u: (e) => (t * e) / Bp,
          v: (t, n) => (n - e.base) / (v - e.base),
          extra: () => [g, h],
        });
      }
    });
  }
  let D = o.fence,
    ne = (e, t) => {
      let n = new A(0, 1, 0),
        r = e.clone().addScaledVector(n, D.upright);
      return [
        e,
        r,
        r
          .clone()
          .addScaledVector(n, D.overhang * Math.SQRT1_2)
          .addScaledVector(t, D.overhang * Math.SQRT1_2),
      ];
    },
    re = (e) => {
      for (let t = 0; t < e.length - 1; t++) {
        let n = e[t],
          r = e[t + 1];
        for (let e = 0; e < 2; e++) {
          let t = e === 0 ? 0 : D.upright,
            i = e === 0 ? D.upright : D.upright + D.overhang,
            a = r.points[e]
              .clone()
              .sub(n.points[e])
              .cross(n.points[e + 1].clone().sub(n.points[e]))
              .normalize(),
            o = [
              f.vertex(n.points[e], a, Gp, n.u, t),
              f.vertex(n.points[e + 1], a, Gp, n.u, i),
              f.vertex(r.points[e], a, Gp, r.u, t),
              f.vertex(r.points[e + 1], a, Gp, r.u, i),
            ];
          f.quad(o[0], o[1], o[2], o[3]);
        }
      }
    },
    ie = (e, t, n, r) => {
      s.fencePosts++;
      let i = new A(0, 1, 0);
      rm(
        m,
        e.clone().addScaledVector(i, D.upright / 2 - 0.05),
        [t, i, n],
        [0.13, D.upright + 0.1, 0.13],
        Gp,
      );
      let a = i.clone().add(r).normalize(),
        o = a.clone().cross(n).normalize();
      rm(
        m,
        e
          .clone()
          .addScaledVector(i, D.upright)
          .addScaledVector(a, D.overhang / 2),
        [o, a, n],
        [0.11, D.overhang + 0.1, 0.11],
        Gp,
      );
    };
  {
    let { from: e, to: t } = o.crowdFence,
      n = [],
      r = e;
    for (let e of Rp())
      e - Lp > r && e + Lp < t && (n.push([r, e - Lp]), (r = e + Lp));
    n.push([r, t]);
    for (let [e, t] of n) {
      s.fenceMetres += t - e;
      let n = [],
        r = Math.ceil((t - e) / 2);
      for (let i = 0; i <= r; i++) {
        let s = F.lerp(e, t, i / r),
          [c] = am(s),
          l = xn(s, 1 * (a + D.lane), o.barrierTop + 0.04);
        n.push({ points: ne(l, c.clone().multiplyScalar(-1)), u: s });
      }
      re(n);
      for (let n = Math.ceil(e / D.posts) * D.posts; n <= t; n += D.posts) {
        let [e, , t] = am(n);
        ie(
          xn(n, 1 * (a + D.lane + 0.08), o.barrierTop + 0.02),
          e,
          t,
          e.clone().multiplyScalar(-1),
        );
      }
    }
  }
  {
    let e = o.cauldronRim,
      t = new A(e.centre[0], 30.02, e.centre[1]),
      n = e.radius,
      r = F.degToRad(e.from),
      i = F.degToRad(e.to),
      a = n * (i - r);
    s.fenceMetres += a;
    let c = Math.ceil(a / 2),
      l = (e) => t.clone().add(new A(Math.cos(e) * n, 0, Math.sin(e) * n)),
      u = [];
    for (let e = 0; e <= c; e++) {
      let t = F.lerp(r, i, e / c);
      u.push({
        points: ne(l(t), new A(-Math.cos(t), 0, -Math.sin(t))),
        u: n * t,
      });
    }
    re(u);
    let d = Math.floor(a / D.posts);
    for (let e = 0; e <= d; e++) {
      let t = r + (e * D.posts) / n,
        i = new A(Math.cos(t), 0, Math.sin(t)),
        a = new A(-Math.sin(t), 0, Math.cos(t));
      ie(l(t).addScaledVector(i, 0.08), i, a, i.clone().negate());
    }
  }
  let ae = ct.find((e) => e.glass);
  if (ae) {
    let e = ae.from * i,
      t = ae.to * i;
    s.parapetMetres += 2 * (t - e);
    let n = $p(Kp.brass),
      r = $p(Kp.brassDark),
      c = $p(Kp.bronzeGlass),
      u = $p(Kp.warm, 3),
      d = $p(Kp.downlight, 4.5),
      f = (e, t) => (e > 0 ? t : t.map(([e, t]) => [-e, t]).reverse()),
      p = (e) => a + o.barrierOffset - o.claddingGap + e * o.barrierFlare,
      m = [
        [0.04, 0.42, $p(Kp.bronze), _],
        [0.42, 2.18, $p(Kp.travertine), l],
        [2.18, 2.26, $p(Kp.warm, 2.6), y],
        [2.26, 2.78, $p(Kp.bronze), _],
      ];
    for (let n of [-1, 1])
      for (let [r, i, a, o] of m)
        tm(
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
    for (let i of [-1, 1]) {
      let s = o.barrierTop;
      (tm(
        _,
        e,
        t,
        2,
        f(i, [
          [a + 0.66, s],
          [a + 0.66, s + 0.2],
          [a + 1.08, s + 0.2],
          [a + 1.08, s],
        ]),
        r,
      ),
        tm(
          y,
          e,
          t,
          2,
          f(i, [
            [a + 0.655, s + 0.06],
            [a + 0.655, s + 0.14],
          ]),
          u,
        ),
        tm(
          g,
          e,
          t,
          2,
          f(i, [
            [a + 0.87, s + 0.2],
            [a + 0.87, s + 1.24],
          ]),
          c,
          { extra: () => [0.3] },
        ),
        tm(
          _,
          e,
          t,
          2,
          f(i, [
            [a + 0.76, s + 1.22],
            [a + 0.76, s + 1.3],
            [a + 0.81, s + 1.37],
            [a + 0.93, s + 1.37],
            [a + 0.98, s + 1.3],
            [a + 0.98, s + 1.22],
          ]),
          n,
        ),
        tm(
          y,
          e,
          t,
          2,
          f(i, [
            [a + 0.98, s + 1.215],
            [a + 0.76, s + 1.215],
          ]),
          u,
        ),
        tm(
          y,
          e,
          t,
          2,
          f(i, [
            [a + 0.9, -1.62],
            [a + 0.3, -1.62],
          ]),
          u,
        ),
        tm(
          y,
          e,
          t,
          2,
          f(i, [
            [a + 1.015, -0.3],
            [a + 1.015, -0.48],
          ]),
          u,
        ));
    }
    for (let n = Math.ceil(e / 5) * 5 + 2.5; n < t - 2; n += 5)
      for (let e of [-11, -4, 4, 11])
        (s.downlights++,
          tm(
            y,
            n - 0.25,
            n + 0.25,
            0.5,
            [
              [e + 0.25, -1.62],
              [e - 0.25, -1.62],
            ],
            d,
          ));
  }
  {
    let e = Ht.findIndex((e) => e.name === `VERTIPORT HELIX`),
      t =
        e < 0
          ? { from: 0, to: 0 }
          : { from: Ht[e].from * i, to: (Ht[e + 1]?.from ?? 1) * i },
      n = [],
      r = -1;
    for (let e = 0; e <= i; e += 2) {
      let t = Math.abs(Ot(e).curvature) > 1 / 120;
      (t && r < 0 && (r = e),
        !t && r >= 0 && (e - r > 400 && n.push({ from: r, to: e }), (r = -1)));
    }
    let c = $p(Kp.champagne),
      l = $p(Kp.clearGlass),
      u = $p(Kp.ledCap, 2.2);
    for (let e of n.filter((e) => e.to > t.from && e.from < t.to)) {
      let t = -Math.sign(Ot((e.from + e.to) / 2).curvature),
        n = (e) => (t > 0 ? e : e.map(([e, t]) => [-e, t]).reverse()),
        r = o.barrierTop,
        i = r + 2.4;
      (tm(
        _,
        e.from,
        e.to,
        2,
        n([
          [a + 0.7, r],
          [a + 0.7, r + 0.16],
          [a + 1.12, r + 0.16],
          [a + 1.12, r],
        ]),
        c,
      ),
        tm(
          g,
          e.from,
          e.to,
          2,
          n([
            [a + 0.92, r + 0.16],
            [a + 0.92, i],
          ]),
          l,
          { extra: () => [0.22] },
        ),
        tm(
          _,
          e.from,
          e.to,
          2,
          n([
            [a + 0.84, i],
            [a + 0.84, i + 0.14],
            [a + 1, i + 0.14],
            [a + 1, i],
          ]),
          c,
        ));
      for (let n = Math.ceil(e.from / 6) * 6 + 3; n < e.to - 3; n += 6) {
        s.helixFins++;
        let e = Ot(n),
          o = (n, r) =>
            e.position
              .clone()
              .addScaledVector(e.right, t * n)
              .addScaledVector(e.up, r),
          d = i + 0.5;
        g.flat(
          [
            o(a + 0.92, r + 0.16),
            o(a + 2.3, r + 0.16),
            o(a + 0.92, d),
            o(a + 2.3, d + 0.25),
          ],
          l,
          void 0,
          [0.3],
        );
        let [f, p, m] = im(n);
        rm(
          _,
          o(a + 2.3, (r + 0.16 + d + 0.25) / 2),
          [f, p, m],
          [0.07, d + 0.25 - r - 0.16, 0.07],
          c,
        );
        let h = o(a + 1.61, d + 0.16),
          v = p
            .clone()
            .multiplyScalar(0.25)
            .addScaledVector(f, t * 1.38)
            .normalize();
        rm(
          y,
          h,
          [v, v.clone().cross(m).negate().normalize(), m],
          [1.42, 0.07, 0.11],
          u,
        );
      }
    }
  }
  let oe = R(0),
    se = fm(n),
    ce = pm(n),
    le = new I({
      name: `Meridian deck paint`,
      vertexColors: !0,
      roughness: 0.62,
      metalness: 0,
    }),
    ue = new zn({
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
    ((ue.blending = 5),
      (ue.blendSrc = 201),
      (ue.blendDst = 205),
      (ue.blendSrcAlpha = 201),
      (ue.blendDstAlpha = 205));
    let e = X().y.mul(2).sub(1).abs(),
      t = V(1)
        .sub(Z(0.3, 1, e))
        .mul(ii(`wear`, `float`));
    ((ue.opacityNode = t.mul(o.rubberDarkening)),
      (ue.specularIntensityNode = t.mul(0.18)));
  }
  let O = new I({
    name: `Meridian LED perimeter boards`,
    color: `#07090b`,
    roughness: 0.24,
    metalness: 0,
  });
  {
    let e = ii(`advert`, `float`),
      t = ii(`motion`, `float`),
      n = Cr(oe.div(Hp)).mul(t.abs()),
      r = Vi(e.add(n), zp);
    O.emissiveNode = z(
      se,
      q(
        X().x.add(oe.mul(Vp / Bp).mul(t)),
        V(1).sub(r.add(1).div(zp)).add(X().y.mul(0.92).add(0.04).div(zp)),
      ),
    ).rgb.mul(Up);
  }
  let de = new I({
      name: `Meridian fence`,
      color: `#8b9299`,
      map: ce,
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
    (fe.opacityNode = bi(wi.dot(Yi).abs())
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
    me = new At({ name: `Meridian dressing light lines`, vertexColors: !0 }),
    he = {
      geometries: [],
      materials: [le, ue, O, de, fe, pe, me],
      textures: [se, ce],
    },
    ge = (e, t, n, i, { cast: a = !1, receive: o = !0, order: s = 0 } = {}) => {
      if (!e.count) return;
      let c = e.geometry(i),
        l = c.getAttribute(`normal`);
      if (l && l.array instanceof Float32Array) {
        let e = new Int8Array(l.count * 3);
        for (let t = 0; t < e.length; t++)
          e[t] = Math.round(Math.max(-1, Math.min(1, l.array[t])) * 127);
        c.setAttribute(`normal`, new er(e, 3, !0));
      }
      he.geometries.push(c);
      let u = new M(c, t);
      ((u.name = n),
        (u.castShadow = a),
        (u.receiveShadow = o),
        (u.renderOrder = s),
        (u.matrixAutoUpdate = !1),
        u.updateMatrix(),
        r.add(u));
    };
  (ge(l, le, `Meridian kerbs, grid and pit paint`, [`normal`, `color`]),
    ge(u, ue, `Meridian racing line`, [`normal`, `uv`], { order: 1 }),
    ge(d, O, `Meridian LED boards`, [`normal`, `uv`]),
    ge(f, de, `Meridian catch fences`, [`normal`, `uv`]),
    ge(p, e.white, `Meridian pit wall`, [`normal`, `uv`], { cast: !0 }),
    ge(m, e.dark, `Meridian posts and board cabinets`, [`normal`, `uv`], {
      cast: !0,
    }),
    ge(_, pe, `Meridian brass and champagne rails`, [`normal`, `color`]),
    ge(y, me, `Meridian soffit and cap lights`, [`color`], { receive: !1 }),
    ge(g, fe, `Meridian parapet glass and fins`, [`normal`, `color`], {
      receive: !1,
      order: 2,
    }),
    (r.matrixAutoUpdate = !1));
  let _e = 0,
    k = 0;
  for (let e of he.geometries)
    ((_e += e.index.count / 3), (k += e.getAttribute(`position`).count));
  return {
    group: r,
    info: { ...s, batches: r.children.length, triangles: _e, vertices: k },
    clock: oe,
    update(e, t, n) {
      n || !Number.isFinite(e) || e <= 0 || (oe.value = (oe.value + e) % Wp);
    },
    dispose() {
      (he.geometries.forEach((e) => e.dispose()),
        he.materials.forEach((e) => e.dispose()),
        he.textures.forEach((e) => e.dispose()),
        r.clear());
    },
  };
}
