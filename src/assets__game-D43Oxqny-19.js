// assets__game-D43Oxqny 19 — mul
// Lines 5491-5929 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Ll(
  e,
  t,
  n,
  r = !1,
  {
    glass: i = { color: `#b4e8ec`, opacity: 0.4 },
    name: a = `Sirocco Oasis · track dressing`,
    tunnelCover: o = !0,
  } = {},
) {
  let s = new An();
  s.name = a;
  let c = { geometries: [], materials: [], textures: [] },
    u = (e, t, n, r = !0) => {
      let i = new M(e, t);
      return (
        (i.name = n),
        (i.castShadow = r),
        (i.receiveShadow = !0),
        c.geometries.push(e),
        s.add(i),
        i
      );
    },
    d = P(0),
    f = Nl(512, 1024, r, (e) => {
      ((e.fillStyle = `#1b2127`),
        e.fillRect(0, 0, 512, 1024),
        (e.strokeStyle = `#2b333b`),
        (e.lineWidth = 3));
      for (let t = 0; t < 1024; t += 64)
        (e.beginPath(), e.moveTo(0, t), e.lineTo(512, t), e.stroke());
      for (let t = 80; t < 980; t += 150)
        for (let [n, r] of [
          [150, `#f0762f`],
          [362, `#f0762f`],
        ])
          ((e.fillStyle = r),
            e.beginPath(),
            e.moveTo(n - 60, 1024 - t),
            e.lineTo(n, 1024 - t - 60),
            e.lineTo(n + 60, 1024 - t),
            e.lineTo(n + 60, 1024 - t + 26),
            e.lineTo(n, 1024 - t - 34),
            e.lineTo(n - 60, 1024 - t + 26),
            e.fill());
      for (let t = -64; t < 512; t += 64)
        ((e.fillStyle = `#f5c542`),
          e.beginPath(),
          e.moveTo(t, 0),
          e.lineTo(t + 32, 0),
          e.lineTo(t + 64, 40),
          e.lineTo(t + 32, 40),
          e.fill());
      ((e.fillStyle = `#e9eef2`),
        e.fillRect(0, 40, 512, 6),
        e.fillRect(0, 0, 10, 1024),
        e.fillRect(502, 0, 10, 1024));
    });
  ((f.wrapT = m), c.textures.push(f));
  let p = new cr({
      name: `Kicker ramp deck`,
      map: f,
      roughness: 0.55,
      metalness: 0,
    }),
    h = Nl(256, 64, r, (e) => {
      ((e.fillStyle = `#16191d`),
        e.fillRect(0, 0, 256, 64),
        (e.fillStyle = `#f5c542`));
      for (let t = -64; t < 256; t += 48)
        (e.beginPath(),
          e.moveTo(t, 64),
          e.lineTo(t + 24, 64),
          e.lineTo(t + 56, 0),
          e.lineTo(t + 32, 0),
          e.fill());
    });
  ((h.wrapS = C), h.repeat.set(10, 1), c.textures.push(h));
  let g = new cr({
      name: `Leap hazard edge`,
      map: h,
      roughness: 0.5,
      metalness: 0,
      side: 2,
    }),
    _ = new b({
      name: `Leap energy rail`,
      color: new j(`#5ff3ff`).multiplyScalar(2.4),
      transparent: !0,
      opacity: 0.85,
      blending: 2,
      depthWrite: !1,
      side: 2,
    }),
    y = new b({
      name: `Leap lip lamps`,
      color: new j(`#ffb347`).multiplyScalar(3),
    });
  c.materials.push(p, g, _, y);
  for (let t of ar) {
    let n = Array.from({ length: 9 }, (e, t) =>
      F.lerp(-d - 0.3, d + 0.3, t / 8),
    );
    u(
      Pl(t.kicker, t.lip, n, (e) => re(e) + 0.04, 0.5, 1 / (t.lip - t.kicker)),
      p,
      `Aqueduct kicker ramp`,
    );
    for (let n of [-1, 1]) {
      let r = n * (d + 0.3),
        i = [],
        a = [],
        o = Math.ceil((t.lip - t.kicker) / 0.5);
      for (let e = 0; e <= o; e++) {
        let s = F.lerp(t.kicker, t.lip, e / o);
        for (let e of [-1.6, re(s) + 0.04]) {
          let t = L(s, r, e);
          i.push(t.x, t.y, t.z);
        }
        if (e < o) {
          let t = e * 2;
          n > 0
            ? a.push(t, t + 2, t + 1, t + 1, t + 2, t + 3)
            : a.push(t, t + 1, t + 2, t + 1, t + 3, t + 2);
        }
      }
      let s = new Me();
      (s.setAttribute(`position`, new N(i, 3)),
        s.setIndex(a),
        s.computeVertexNormals(),
        u(s, e.dark, `Kicker flank`));
    }
    (u(
      Fl(t.lip, [-d - 1.3, d + 1.3], -3.4, t.height + 0.04),
      g,
      `Kicker lip face`,
    ),
      u(Fl(t.land, [-d - 1.3, d + 1.3], -3.4, 0.02), g, `Landing deck edge`));
    for (let e of [-1, 1])
      for (let n of [0.9, 2.6])
        u(
          l(t.lip, t.land, e * (d + 0.45) - 0.09, e * (d + 0.45) + 0.09, n, 1),
          _,
          `Gap energy rail`,
          !1,
        );
    let r = new ht(0.9, 0.22, 0.4);
    c.geometries.push(r);
    let i = new Dt(r, y, 32);
    i.name = `Leap edge lamps`;
    let a = new k(),
      o = new Rn(),
      f = 0;
    for (let [e, n] of [
      [t.lip - 0.3, t.height + 0.15],
      [t.land + 0.3, 0.14],
    ])
      for (let t = 0; t < 16; t++) {
        let r = pe(e);
        (o.setFromRotationMatrix(new k().makeBasis(r.right, r.up, r.tangent)),
          a.compose(L(e, F.lerp(-d + 1, d - 1, t / 15), n), o, new A(1, 1, 1)),
          i.setMatrixAt(f++, a));
      }
    ((i.instanceMatrix.needsUpdate = !0), s.add(i));
  }
  let x = new I({
    name: `Drifted sand on the deck`,
    roughness: 0.94,
    metalness: 0,
    alphaTest: 0.5,
    alphaToCoverage: !0,
  });
  {
    let e = X().x.mul(2).sub(1).abs(),
      t = W,
      n = e
        .pow(2.4)
        .mul(1.25)
        .add(Ii(t.xz.mul(0.06)).mul(0.5))
        .add(Ii(t.xz.mul(0.35)).mul(0.14))
        .mul(ii(`zone`, `float`));
    x.opacityNode = Z(0.34, 0.4, n);
    let r = t.x.mul(0.83).add(t.z.mul(0.56)).mul(4.2).sin();
    ((x.colorNode = Y(
      G(`#c89b62`),
      G(`#e7c893`),
      Z(0.4, 0.9, n).mul(0.6).add(r.mul(0.08)).add(0.3),
    )),
      (x.normalNode = _r
        .mul(U(Ui.add(J(r.mul(0.05), 0, r.mul(0.03))).normalize(), 0))
        .xyz.normalize()));
  }
  let S = new zn({
    name: `Standing water on the deck`,
    roughness: 0.03,
    metalness: 0,
    ior: 1.333,
    alphaTest: 0.5,
    alphaToCoverage: !0,
  });
  {
    let e = W,
      n = Ii(e.xz.mul(0.11))
        .mul(0.6)
        .add(Ii(e.xz.mul(0.43).add(7)).mul(0.28))
        .add(Ii(e.xz.mul(1.3).add(3)).mul(0.08))
        .add(0.12)
        .mul(ii(`zone`, `float`));
    S.opacityNode = Z(0.3, 0.33, n);
    let r = Ii(J(e.x.mul(0.9), e.z.mul(0.9), t.mul(1.4))),
      i = Ii(J(e.x.mul(2.3).add(4), e.z.mul(2.1), t.mul(2.1)));
    ((S.colorNode = Y(G(`#0d1719`), G(`#1d3437`), Z(0.33, 0.6, n))),
      (S.roughnessNode = Y(V(0.22), V(0.02), Z(0.33, 0.45, n))),
      (S.normalNode = _r
        .mul(U(Ui.add(J(r.mul(0.035), 0, i.mul(0.035))).normalize(), 0))
        .xyz.normalize()));
  }
  c.materials.push(x, S);
  for (let t of Ie) {
    let n = t.from * v,
      r = t.to * v,
      i = t.kind === `water`,
      a = l(n, r, -d + 0.35, d - 0.35, i ? 0.03 : 0.05, 1),
      o = a.getAttribute(`position`).count,
      s = new Float32Array(o);
    for (let e = 0; e < o; e++)
      s[e] = Il(t, F.lerp(n, r, Math.floor(e / 2) / (o / 2 - 1))) * t.cover * 2;
    a.setAttribute(`zone`, new er(s, 1));
    let c = u(
      a,
      i ? S : x,
      i ? `Causeway standing water` : `Sand drift on the deck`,
      !1,
    );
    if (((c.userData.surfaceZone = t.kind), !i))
      for (let i of [-1, 1]) {
        let a = [0.9, 3, 6, 10, 15].map((e) => i * (d + e)),
          o = [2.1, 2.3, 1.4, -0.4, -2.6],
          s = Pl(
            n,
            r,
            i < 0 ? [...a].reverse() : a,
            (e, n) => {
              let r = a.indexOf(n),
                s =
                  Math.sin(e * 0.07 + i) * 0.5 +
                  Math.sin(e * 0.19 + 2 * i) * 0.3;
              return F.lerp(-2.8, o[r] + s * (r < 3 ? 1 : 0.4), Il(t, e));
            },
            2,
            1 / 16,
          );
        (s.setAttribute(
          `tint`,
          new er(
            new Float32Array(s.getAttribute(`position`).count * 3).fill(1),
            3,
          ),
        ),
          u(s, e.sand, `Sand berm against the barrier`));
      }
  }
  let w = (e) =>
    e.setAttribute(
      `tint`,
      new er(new Float32Array(e.getAttribute(`position`).count * 3).fill(1), 3),
    );
  for (let t of en.filter((e) => o && !e.glass)) {
    let r = t.from * v,
      i = t.to * v,
      a = d + 1.3,
      o = d + 12,
      s = [0, 4, 8, 12, d, a, d + 2.5, d + 4, d + 6, d + 9, o],
      c = Pl(
        r,
        i,
        [
          ...s
            .slice(1)
            .reverse()
            .map((e) => -e),
          ...s,
        ],
        (e, t) => {
          let s =
              12.3 +
              F.smoothstep(Math.min(e - r, i - e), 0, 16) *
                (2.6 * (1 - (t / o) ** 2) +
                  0.5 +
                  Math.sin(e * 0.045 + t * 0.21) * 0.45) -
              Math.max(0, Math.abs(t) - a) * 1.15,
            c = L(e, t, 0);
          return Math.max(s, n(c.x, c.z) - c.y + 0.35);
        },
        2,
        1 / 16,
      );
    (w(c), u(c, e.dune, `Sandworm dune over the tunnel`));
  }
  let T = new Ae({
      name: `Glassway glazing`,
      color: i.color,
      roughness: 0.03,
      metalness: 0,
      ior: 1.5,
      specularIntensity: 1,
      transparent: !0,
      opacity: i.opacity,
      depthWrite: !1,
      side: 2,
    }),
    ee = new cr({
      name: `Glassway frame`,
      color: `#f1f4f3`,
      roughness: 0.3,
      metalness: 0,
    }),
    te = ee.clone();
  ((te.side = 2), c.materials.push(ee, te), c.materials.push(T));
  for (let t of en.filter((e) => e.glass)) {
    let n = t.from * v,
      r = t.to * v,
      i = Pl(
        n,
        r,
        Array.from({ length: 25 }, (e, t) => Ml(t / 24).lane),
        (e, t) => Ml(Math.acos(F.clamp(-t / jl.lane, -1, 1)) / Math.PI).height,
        2,
        1 / 9,
      );
    u(i, T, `Glassway glass shell`, !1).renderOrder = 2;
    let a = [],
      o = [],
      s = [];
    for (let e = n; e <= r + 0.01; e += 9) {
      let t = pe(e),
        n = a.length / 3;
      for (let e = 0; e <= 40; e++) {
        let r = e / 40,
          { lane: i, height: s } = Ml(r),
          c = Math.PI * (1 - r),
          l = Math.cos(c),
          u = Math.sin(c);
        for (let [e, n, r] of [
          [0, 0, -0.26],
          [0, 0, 0.26],
          [l * 0.62, u * 0.62, 0.26],
          [l * 0.62, u * 0.62, -0.26],
        ]) {
          let o = t.position
            .clone()
            .addScaledVector(t.right, i + e)
            .addScaledVector(t.up, s + n)
            .addScaledVector(t.tangent, r);
          a.push(o.x, o.y, o.z);
        }
        if (e < 40) {
          let t = n + e * 4,
            r = t + 4;
          for (let [e, n] of [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0],
          ])
            o.push(t + e, r + e, t + n, t + n, r + e, r + n);
        }
      }
      for (let n of [-1, 1]) {
        let r = new ht(1.6, 3.2, 1.4),
          i = new Rn().setFromRotationMatrix(
            new k().makeBasis(t.right, t.up, t.tangent),
          );
        (r.applyMatrix4(
          new k().compose(L(e, n * (jl.lane + 0.3), -0.2), i, new A(1, 1, 1)),
        ),
          s.push(r));
      }
    }
    u(ur(s), e.dark, `Glassway rib plinths`);
    for (let e of s) e.dispose();
    let c = new Me();
    (c.setAttribute(`position`, new N(a, 3)),
      c.setIndex(o),
      c.computeVertexNormals(),
      u(c, ee, `Glassway ribs`));
    let d = (e, t) =>
        Ml(Math.acos(F.clamp(-t / jl.lane, -1, 1)) / Math.PI).height - 0.08,
      f = Array.from({ length: 7 }, (e, t) => {
        let i = (t + 1) / 8;
        return Pl(
          n,
          r,
          [Ml(i - 0.0028).lane, Ml(i + 0.0028).lane],
          d,
          2,
          1 / 9,
        );
      });
    u(ur(f), te, `Glassway mullions`, !1);
    for (let e of f) e.dispose();
    for (let t of [-1, 1])
      (u(
        l(n, r, t * (jl.lane - 0.9) - 0.2, t * (jl.lane - 0.9) + 0.2, 0.9, 2),
        e.cyan,
        `Glassway foot light`,
        !1,
      ),
        u(
          l(
            n,
            r,
            t * (jl.lane - 0.4) - 0.8,
            t * (jl.lane - 0.4) + 0.8,
            -0.3,
            2,
          ),
          e.dark,
          `Glassway sill`,
        ));
    u(
      l(n, r, -0.35, 0.35, jl.crown - 0.05, 2),
      e.cyan,
      `Glassway crown light`,
      !1,
    );
  }
  return {
    group: s,
    dispose() {
      (c.geometries.forEach((e) => e.dispose()),
        c.materials.forEach((e) => e.dispose()),
        c.textures.forEach((e) => e.dispose()),
        s.clear());
    },
  };
}
