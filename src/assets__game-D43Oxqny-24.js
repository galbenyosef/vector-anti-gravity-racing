// assets__game-D43Oxqny 24 — mul
// Lines 7020-7366 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function yu(e, { maximum: t = 2.4, surge: n = 1 } = {}) {
  let r = J(Jo),
    i = Ur.sub(W).normalize(),
    a = e.dot(r).max(0.03),
    o = e.dot(i).max(0.05),
    s = V(1).div(a.add(o)).clamp(0.85, t),
    c = V(1).sub(i.dot(r)),
    l = V(1)
      .add(Pr(c.div(-0.0016)).mul(0.55 * n))
      .add(Pr(c.div(-0.035)).mul(0.22 * n));
  return s.mul(l);
}
var bu = (e) =>
    e
      ? `environment/regolith-detail-256.png`
      : `environment/regolith-detail.png`,
  xu = new Map();
function Su(e = !1) {
  let t = bu(e),
    n = xu.get(t);
  if (!n) {
    let e = new bn();
    ((e.name = t),
      (e.colorSpace = ``),
      (e.wrapS = e.wrapT = C),
      (e.flipY = !1),
      (e.generateMipmaps = !0),
      (e.minFilter = Qn),
      (e.magFilter = d),
      (e.anisotropy = 8));
    let r = new Ct().loadAsync(new URL(t, document.baseURI).href).then((t) => {
      ((e.image = t), (e.needsUpdate = !0));
    });
    (r.catch(() => void 0),
      (n = { texture: e, ready: r, users: 0 }),
      xu.set(t, n));
  }
  return (n.users++, n);
}
function Cu(e = !1) {
  let t = bu(e),
    n = xu.get(t);
  !n || --n.users > 0 || (n.texture.dispose(), xu.delete(t));
}
function wu(
  e,
  {
    name: t = `Shackleton regolith`,
    mobile: n = !1,
    tint: r = !0,
    cutouts: i = [],
  } = {},
) {
  let a = new I({ name: t, roughness: 0.96, metalness: 0 }),
    o = W,
    s = li,
    c = J(Jo),
    l = Ur.sub(o).length(),
    u = s.abs().pow(J(5)).toVar(),
    d = u.div(u.x.add(u.y).add(u.z).max(1e-4)),
    f = (e, t) =>
      q(
        e.x.mul(Math.cos(t)).sub(e.y.mul(Math.sin(t))),
        e.x.mul(Math.sin(t)).add(e.y.mul(Math.cos(t))),
      ),
    p = J(0),
    m = V(0),
    h = V(1).sub(Z(vu.closeFade[0], vu.closeFade[1], l)),
    g = V(1).sub(Z(vu.midFade[0], vu.midFade[1], l)),
    _ = [V(1), g, h];
  vu.scales.forEach((t, r) => {
    let i = [0, 0.65, 1.24][r],
      a = [0, 0.37, 0.71][r],
      s = (n) => z(e, f(n.div(t), i).add(a)),
      c = _[r].mul(vu.relief[r]),
      l = Math.cos(i),
      u = Math.sin(i),
      h = (e) => {
        let t = e.rg.mul(2).sub(1);
        return q(t.x.mul(l).add(t.y.mul(u)), t.y.mul(l).sub(t.x.mul(u)));
      },
      g = s(o.xz),
      v = h(g),
      y = J(v.x, 0, v.y),
      b = g.b;
    if (!n && r < 2) {
      let e = s(q(o.z, o.y)),
        t = s(q(o.x, o.y)),
        n = h(e),
        r = h(t);
      ((y = J(0, n.y, n.x)
        .mul(d.x)
        .add(y.mul(d.y))
        .add(J(r.x, r.y, 0).mul(d.z))),
        (b = e.b.mul(d.x).add(b.mul(d.y)).add(t.b.mul(d.z))));
    }
    ((p = p.add(y.mul(c))),
      (m = m.add(b.sub(0.5).mul(2).mul(_[r]).mul([0.85, 0.85, 0.6][r]))));
  });
  let v = s.add(p).normalize();
  a.normalNode = _r.mul(U(v, 0)).xyz.normalize();
  let y = Y(V(0.45), V(1), Z(-0.02, 0.22, v.dot(c))),
    b = V(1).add(m).clamp(0.55, 1.45),
    x = G(vu.albedo).mul(b);
  r && (x = x.mul(ii(`tint`, `vec3`)));
  let S = x.mul(yu(s)).mul(y);
  return (
    (a.colorNode = i.length
      ? Hi(() => {
          for (let e of i) {
            let t = R(e.toLocal).mul(U(o, 1)),
              n = t.y
                .add(1.5)
                .div(e.crown + 1.5)
                .clamp(0, 1)
                .pow(1.25),
              r = gr(V(1).sub(n.mul(n)).max(0))
                .mul(e.lane)
                .mul(n.mul(0.08).add(1))
                .add(0.4);
            Ci(
              t.x
                .greaterThan(e.from)
                .and(t.x.lessThan(e.to))
                .and(t.y.greaterThan(-2.5))
                .and(t.y.lessThan(e.crown + 0.4))
                .and(t.z.abs().lessThan(r)),
            );
          }
          return S;
        })()
      : S),
    a
  );
}
var Tu = { lane: P(0) + 6, crown: 19, relief: 2.6, ringSpacing: 50 },
  Eu = {
    collar: 3,
    band: 2.8,
    thickness: 1.4,
    liner: 10,
    cut: [-9, 18],
    lane: P(0) + 6.6,
    crown: 19.6,
  };
function Du(e, t, n = pe) {
  return [
    [e, 1],
    [t, -1],
  ].map(([e, t]) => {
    let r = n(e),
      i = r.tangent.clone().multiplyScalar(t).normalize(),
      a = r.up.clone().normalize(),
      o = new A().crossVectors(i, a).normalize(),
      s = new k().makeBasis(i, a, o).setPosition(r.position);
    return { d: e, into: t, toWorld: s, toLocal: s.clone().invert() };
  });
}
function Ou(e) {
  let t = Math.PI * (1 - e);
  return {
    lane: Math.cos(t) * Tu.lane * (1 + 0.08 * Math.sin(t)),
    height: -1.5 + Math.sin(t) ** 0.8 * (Tu.crown + 1.5),
    nx: Math.cos(t),
    ny: Math.sin(t),
  };
}
function ku(e, t) {
  let n = Math.max(2, Math.ceil((t - e) / 2.5)),
    r = new Float32Array((n + 1) * 49 * 3),
    i = new Float32Array((n + 1) * 49 * 3),
    a = [],
    o = new A();
  for (let s = 0; s <= n; s++) {
    let c = F.lerp(e, t, s / n),
      l = pe(c),
      u = F.smoothstep(Math.min(c - e, t - c), Eu.liner - 2, Eu.liner + 10);
    for (let e = 0; e <= 48; e++) {
      let t = e / 48,
        d = Ou(t),
        f = $c(c / 18, t * 6, 3, 401) - 0.5,
        p = $c(c / 4, t * 22, 2, 409) - 0.5,
        m = Math.exp(-(((d.height - 3.5) / 1.4) ** 2)) * 1.2 * Math.abs(d.nx),
        h = (f * 2 + p * 0.6) * Tu.relief * u + m * u;
      o.copy(l.position)
        .addScaledVector(l.right, d.lane + d.nx * h)
        .addScaledVector(l.up, d.height + d.ny * h);
      let g = s * 49 + e;
      r.set([o.x, o.y, o.z], g * 3);
      let _ = F.clamp(0.42 + f * 0.5 + p * 0.25 + m * 0.12, 0.22, 0.7);
      if ((i.set([_, _ * 0.97, _ * 0.95], g * 3), s < n && e < 48)) {
        let e = g,
          t = g + 48 + 1;
        a.push(e, e + 1, t, t, e + 1, t + 1);
      }
    }
  }
  let s = new Me();
  (s.setAttribute(`position`, new er(r, 3)),
    s.setAttribute(`tint`, new er(i, 3)),
    s.setIndex(a),
    s.computeVertexNormals());
  let c = [],
    l = [];
  for (let n = e + Tu.ringSpacing; n < t - Eu.liner; n += Tu.ringSpacing) {
    let e = pe(n),
      t = c.length / 3;
    for (let n = 0; n <= 24; n++) {
      let r = Ou(0.12 + (n / 24) * 0.76),
        i = Tu.relief * 1.4;
      for (let [t, n] of [
        [-0.18, 0],
        [0.18, 0],
      ])
        (o
          .copy(e.position)
          .addScaledVector(e.right, r.lane - r.nx * i)
          .addScaledVector(e.up, r.height - r.ny * i + n)
          .addScaledVector(e.tangent, t),
          c.push(o.x, o.y, o.z));
      if (n < 24) {
        let e = t + n * 2;
        l.push(e, e + 2, e + 1, e + 1, e + 2, e + 3);
      }
    }
  }
  let u = new Me();
  return (
    u.setAttribute(`position`, new N(c, 3)),
    u.setIndex(l),
    u.computeVertexNormals(),
    { rock: s, rings: u }
  );
}
function Au(e, t) {
  let n = [],
    r = [],
    i = [],
    a = [],
    o = [],
    s = [],
    c = new A(),
    l = (e, t, n) => {
      let r = pe(e);
      return c
        .copy(r.position)
        .addScaledVector(r.right, t)
        .addScaledVector(r.up, n)
        .toArray();
    },
    u = (e, t) => {
      let n = Ou(e);
      return { lane: n.lane + n.nx * t, height: n.height + n.ny * t };
    };
  for (let [c, d] of [
    [e, 1],
    [t, -1],
  ]) {
    let e = c - d * Eu.collar,
      t = n.length / 3;
    for (let i = 0; i <= 8; i++) {
      let a = e + (d * (Eu.collar + Eu.liner) * i) / 8;
      for (let e = 0; e <= 40; e++) {
        let o = u(e / 40, 0.15);
        if ((n.push(...l(a, o.lane, o.height)), i < 8 && e < 40)) {
          let n = t + i * 41 + e,
            a = n + 40 + 1;
          r.push(n, n + 1, a, a, n + 1, a + 1);
        }
      }
    }
    let f = i.length / 3,
      p = e + d * Eu.thickness;
    for (let t = 0; t <= 40; t++) {
      let n = t / 40,
        r = u(n, 0.1),
        o = u(n, Eu.band);
      if (
        (i.push(
          ...l(e, r.lane, r.height),
          ...l(e, o.lane, o.height),
          ...l(p, o.lane, o.height),
          ...l(p, r.lane, r.height),
        ),
        t < 40)
      ) {
        let e = f + t * 4,
          n = e + 4;
        for (let [t, r] of [
          [0, 1],
          [1, 2],
          [2, 3],
        ])
          a.push(
            ...(d === 1
              ? [e + t, e + r, n + t, e + r, n + r, n + t]
              : [e + t, n + t, e + r, e + r, n + t, n + r]),
          );
      }
    }
    for (let e of [2.5, 7.5]) {
      let t = c + d * e,
        n = o.length / 3;
      for (let e = 0; e <= 20; e++) {
        let r = u(0.14 + (e / 20) * 0.72, -0.25);
        if (
          (o.push(
            ...l(t - 0.2, r.lane, r.height),
            ...l(t + 0.2, r.lane, r.height),
          ),
          e < 20)
        ) {
          let t = n + e * 2;
          s.push(t, t + 2, t + 1, t + 1, t + 2, t + 3);
        }
      }
    }
  }
  let d = (e, t) => {
    let n = new Me();
    return (
      n.setAttribute(`position`, new N(e, 3)),
      n.setIndex(t),
      n.computeVertexNormals(),
      n
    );
  };
  return { liner: d(n, r), collar: d(i, a), lights: d(o, s) };
}
var ju = {
    step: 8,
    margin: 700,
    maxCount: 481,
    farSize: 14400,
    farStep: 80,
    bermReach: 16,
  },
  Mu = 2.2,
  Nu = 24,
  Pu = 88;
function Fu(e, t, n) {
  let r = Math.imul(e, 374761393) ^ Math.imul(t, 668265263) ^ n;
  return (
    (r = Math.imul(r ^ (r >>> 13), 1274126177)),
    ((r ^ (r >>> 16)) >>> 0) / 4294967296
  );
}
