// assets__game-CsnOSIff 09 — math
// Lines 2806-2985 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function vs(e) {
  return Math.hypot(
    Math.max(Math.abs(e.min[0]), Math.abs(e.max[0])),
    Math.max(Math.abs(e.min[2]), Math.abs(e.max[2])),
  );
}
var ys = (e) => {
    let t = Gn(e).tangent,
      n = Math.hypot(t.x, t.z);
    return { x: t.x / n, z: t.z / n };
  },
  bs = (e, t, n, r, i = 1) =>
    new M().compose(
      new g(e, t, n),
      new Ot().setFromAxisAngle(new g(0, 1, 0), r),
      new g(1, i, 1),
    );
function xs() {
  let e = ps * F,
    t = Gn(e).position,
    n = ys(e);
  return { distance: e, x: t.x, z: t.z, yaw: Math.atan2(n.x, n.z) };
}
function Ss(e) {
  let t = gs(),
    n = j(0),
    r = [],
    i = 173343,
    a = () => (
      (i = (Math.imul(i, 1664525) + 1013904223) >>> 0),
      i / 4294967296
    ),
    o = [],
    s = (e, t, n, r = 6) =>
      !o.some((i) => Math.hypot(i.x - e, i.z - t) < i.radius + n + r),
    c = (e, r, i, a = ms) => _s(t, e, r).distance >= n + i + a,
    l = (e, t, n, i, a, s = !0) => {
      (r.push({ asset: e, matrix: t, x: n, z: i, radius: a }),
        s && o.push({ x: n, z: i, radius: a }));
    },
    u = xs();
  l(`exchange-gate`, bs(u.x, 0, u.z, u.yaw), u.x, u.z, vs(e[`exchange-gate`]));
  let d = vs(e[`holo-pylon`]);
  for (let [e, t] of [
    0.045, 0.165, 0.3, 0.36, 0.43, 0.62, 0.7, 0.84, 0.905, 0.955,
  ].entries()) {
    let r = t * F,
      i = Gn(r),
      a = ys(r),
      o = e % 2 ? 1 : -1,
      u = n + d + 6,
      f = i.position.x + a.z * o * u,
      p = i.position.z - a.x * o * u;
    !c(f, p, d, 4) ||
      !s(f, p, d) ||
      l(`holo-pylon`, bs(f, 0, p, Math.atan2(-a.x, -a.z)), f, p, d);
  }
  let f = { x: 260, z: 60 },
    p = [
      `spire-tower`,
      `twin-towers`,
      `arcology-block`,
      `neon-tenement-tall`,
      `neon-tenement`,
      `data-spire`,
    ],
    m = [`far-block-a`, `far-block-b`, `far-block-c`],
    { pitch: h, street: g } = fs;
  for (let n = -15; n <= 19; n++)
    for (let r = -13; r <= 15; r++) {
      let i = n * h + g + (h - g) / 2,
        o = r * h + g + (h - g) / 2,
        u = _s(t, i, o).distance,
        d = Math.hypot(i - f.x, o - f.z),
        _ = a(),
        v = Math.floor(a() * 4) * (Math.PI / 2),
        y = (n, r, i, a = 1) => {
          let o = vs(e[n]);
          if (!c(r, i, o) || !s(r, i, o)) return !1;
          let u = hs[n];
          return (
            l(
              !u || _s(t, r, i).distance - o < 200 ? n : u,
              bs(r, 0, i, v, a),
              r,
              i,
              o,
            ),
            !0
          );
        };
      if (u < 420) {
        let e =
          d < 520
            ? [0.2, 0.14, 0.24, 0.2, 0.14, 0.03]
            : [0.02, 0.04, 0.18, 0.3, 0.4, 0.01];
        if (_ > 0.93) continue;
        let t = a(),
          n = 0;
        for (; n < e.length - 1 && t > e[n];) t -= e[n++];
        let r = p[n],
          s = a() < 0.5 ? 1 : -1;
        if (r === `neon-tenement` || r === `neon-tenement-tall`)
          for (let e of [-1, 1]) y(r, i + e * 20, o + e * 20 * s);
        else if (!y(r, i, o))
          for (let e of [-1, 1]) y(`neon-tenement`, i + e * 20, o + e * 20 * s);
      } else if (u < 1400) {
        if (_ > (u < 900 ? 0.82 : 0.55)) continue;
        y(
          m[Math.floor(a() * m.length)],
          i + (a() - 0.5) * 20,
          o + (a() - 0.5) * 20,
          0.75 + a() * (d < 900 ? 0.7 : 0.4),
        );
      }
    }
  Cs(r, t, e);
  for (let { distance: t, side: i } of as()) {
    let a = Ft(t, i * (n + 2.5), 0),
      o = ys(t),
      s = { x: o.z * i, z: -o.x * i };
    r.push({
      asset: `lamp-mast`,
      matrix: bs(a.x, a.y, a.z, Math.atan2(-s.z, s.x)),
      x: a.x,
      z: a.z,
      radius: vs(e[`lamp-mast`]),
    });
  }
  return r;
}
function Cs(e, t, n) {
  let r = ps * F,
    i = j(0),
    a = -n[`pier-head`].min[1],
    o = (e, t) => {
      let n = Math.abs(e - t) % F;
      return Math.min(n, F - n);
    },
    s = Rt[0];
  for (let n = 20; n < F; n += 45) {
    if (o(n, r) < 60 || (n >= s.from * F - 6 && n <= s.to * F + 6)) continue;
    let c = Gn(n),
      l = Ft(n, 0, -1.65),
      u = l.clone().addScaledVector(c.up, -a);
    if (
      t.some(
        (e) =>
          o(e.d, n) > 60 &&
          e.y < c.position.y &&
          Math.hypot(e.x - u.x, e.z - u.z) < i + 7,
      )
    )
      continue;
    let d = ys(n),
      f = Math.atan2(d.x, d.z),
      p = u.y > 1,
      m = p ? u.y : l.y;
    if (m < 1.5) continue;
    p &&
      e.push({
        asset: `pier-head`,
        matrix: new M().makeBasis(c.right, c.up, c.tangent).setPosition(l),
        x: l.x,
        z: l.z,
        radius: 13,
      });
    let h = Math.ceil(m / 10);
    for (let t = 0; t < h; t++) {
      let n = Math.min(10, m - t * 10);
      e.push({
        asset: `pier-column`,
        matrix: bs(u.x, t * 10, u.z, f, n / 10),
        x: u.x,
        z: u.z,
        radius: 3,
      });
    }
  }
}
