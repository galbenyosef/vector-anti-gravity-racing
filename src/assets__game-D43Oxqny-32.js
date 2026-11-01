// assets__game-D43Oxqny 32 — centre
// Lines 9327-9669 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var vf = 0.45 * Zd,
  yf = (() => {
    let e = Xd.frame(vf);
    return {
      distance: vf,
      centre: [e.position.x, e.position.y + 17, e.position.z],
      axis: [e.tangent.x, e.tangent.y, e.tangent.z],
      lane: 0,
      height: 17,
      radius: 35,
      depth: 36,
    };
  })(),
  bf = {
    centre: [-450, 280, -350],
    heading: 20,
    length: 300,
    radius: 31,
    bays: [-100, -60, -20, 20, 60, 100],
  },
  xf = [Math.cos(bf.heading * $d), Math.sin(bf.heading * $d)],
  Sf = (e, t = 0) => [
    bf.centre[0] + xf[0] * e,
    bf.centre[1] - t,
    bf.centre[2] + xf[1] * e,
  ],
  Cf = [
    { id: `stack-1`, centre: [-700, -470], heading: 0 },
    { id: `stack-2`, centre: [-760, -300], heading: 0 },
    { id: `stack-3`, centre: [-610, -200], heading: 0 },
    { id: `stack-4`, centre: [-700, -100], heading: 0 },
  ],
  wf = 22,
  Tf = Yd + 160,
  Ef = {
    centre: [-871.4, -678.9],
    radius: 15,
    top: Yd + 140,
    conveyor: { radius: 23, from: Yd + 25, to: Yd + 140, turns: 3 },
  },
  Df = {
    centre: [170, 340],
    radius: 40,
    crown: 155,
    gear: 2.5,
    pads: [45, 135, 225, 315].map((e) => ({
      angle: e,
      position: [170 + Math.cos(e * $d) * 24, 155, 340 + Math.sin(e * $d) * 24],
    })),
  },
  Of = [
    { from: -170, to: -60 },
    { from: -50, to: 71 },
  ],
  kf = 32.4,
  Af = 54,
  jf = 230,
  Mf = 80,
  Nf = -400,
  Pf = 125,
  Ff = 29,
  If = 0.04,
  Lf = 160,
  Rf = 600,
  zf = [
    {
      id: `aurelian-shell`,
      kind: `box`,
      centre: _f(gf / 2, 0),
      heading: hf,
      halfLength: gf / 2 + 2,
      halfWidth: 39,
      yMin: 76,
      yMax: 165,
      ground: !0,
    },
    {
      id: `aurelian-tower-south`,
      kind: `box`,
      centre: _f(0, -46),
      heading: hf,
      halfLength: 31,
      halfWidth: 24,
      yMin: Yd - 5,
      yMax: Yd + 215,
      ground: !0,
    },
    {
      id: `aurelian-tower-north`,
      kind: `box`,
      centre: _f(gf, 46),
      heading: hf,
      halfLength: 31,
      halfWidth: 24,
      yMin: Yd - 5,
      yMax: Yd + 215,
      ground: !0,
    },
    {
      id: `aurelian-porte-cochere`,
      kind: `box`,
      centre: _f(-14, 0),
      heading: hf,
      halfLength: 16,
      halfWidth: 32,
      yMin: 92,
      yMax: 148,
      ground: !1,
    },
    {
      id: `aurelian-terrace`,
      kind: `box`,
      centre: _f(gf + 14, 0),
      heading: hf,
      halfLength: 16,
      halfWidth: 40,
      yMin: 108,
      yMax: 132,
      ground: !1,
    },
    {
      id: `vertiport-tower`,
      kind: `cylinder`,
      centre: Df.centre,
      radius: Df.radius,
      yMin: -1 / 0,
      yMax: Df.crown,
      ground: !0,
    },
    {
      id: `vertiport-crown`,
      kind: `cylinder`,
      centre: Df.centre,
      radius: Df.radius + 6,
      yMin: Df.crown,
      yMax: Df.crown + 30,
      ground: !1,
    },
    {
      id: `silo`,
      kind: `cylinder`,
      centre: Ef.centre,
      radius: 15.4,
      yMin: -1 / 0,
      yMax: Ef.top,
      ground: !0,
    },
    {
      id: `silo-top`,
      kind: `cylinder`,
      centre: Ef.centre,
      radius: Ef.radius + 3,
      yMin: Ef.top,
      yMax: Ef.top + 6,
      ground: !1,
    },
    {
      id: `t1-bowl`,
      kind: `annulus`,
      centre: [440.2, 62.9],
      inner: 100,
      outer: 140,
      from: -115,
      to: 25,
      yMin: -1 / 0,
      yMax: Yd + 45,
      ground: !0,
    },
    {
      id: `cauldron`,
      kind: `cylinder`,
      centre: [-168.7, 62],
      radius: 82,
      yMin: -1 / 0,
      yMax: Yd + 30,
      ground: !0,
    },
    {
      id: `cauldron-stands`,
      kind: `annulus`,
      centre: [-168.7, 62],
      inner: 82,
      outer: 132,
      from: 80,
      to: 190,
      yMin: -1 / 0,
      yMax: Yd + 32,
      ground: !0,
    },
    {
      id: `crown-stand`,
      kind: `box`,
      centre: [105, -70],
      heading: 0,
      halfLength: 165,
      halfWidth: 40,
      yMin: -1 / 0,
      yMax: Yd + 52,
      ground: !0,
    },
    {
      id: `pits`,
      kind: `box`,
      centre: [157.5, 49],
      heading: 0,
      halfLength: 242.5,
      halfWidth: 33,
      yMin: -1 / 0,
      yMax: Yd + 28,
      ground: !0,
    },
    {
      id: `podium-plaza`,
      kind: `box`,
      centre: [10, 165],
      heading: 0,
      halfLength: 70,
      halfWidth: 85,
      yMin: -1 / 0,
      yMax: Yd + 18,
      ground: !0,
    },
    ...Of.map((e) => [e.from, e.to]).flatMap(([e, t], n) =>
      [-795, -655].map((r, i) => ({
        id: `canyon-tower-${n * 2 + i + 1}`,
        kind: `box`,
        centre: [(e + t) / 2, r],
        heading: 0,
        halfLength: (t - e) / 2,
        halfWidth: 35,
        yMin: -1 / 0,
        yMax: Yd + 340,
        ground: !0,
      })),
    ),
    {
      id: `penthouse-stack`,
      kind: `cylinder`,
      centre: [225.3, -280.3],
      radius: 50,
      yMin: -1 / 0,
      yMax: 135,
      ground: !0,
    },
    {
      id: `eye`,
      kind: `ring`,
      centre: yf.centre,
      axis: yf.axis,
      inner: yf.radius,
      outer: 130,
      halfDepth: yf.depth / 2 + 1,
      yMin: -1 / 0,
      yMax: 1 / 0,
      ground: !1,
    },
    {
      id: `leviathan`,
      kind: `capsule`,
      a: Sf(-bf.length / 2 + bf.radius),
      b: Sf(bf.length / 2 - bf.radius),
      radius: bf.radius + 4,
      yMin: -1 / 0,
      yMax: 1 / 0,
      ground: !1,
    },
    ...[-1, 1].map((e) => ({
      id: `leviathan-mast-${e < 0 ? `west` : `east`}`,
      kind: `cylinder`,
      centre: [
        bf.centre[0] + xf[0] * e * 110 + xf[1] * 70,
        bf.centre[2] + xf[1] * e * 110 - xf[0] * 70,
      ],
      radius: 14,
      yMin: -1 / 0,
      yMax: bf.centre[1] - 20,
      ground: !0,
    })),
    ...Cf.map((e) => ({
      id: e.id,
      kind: `box`,
      centre: e.centre,
      heading: e.heading,
      halfLength: wf + 2,
      halfWidth: wf + 2,
      yMin: -1 / 0,
      yMax: Tf + 4,
      ground: !0,
    })),
  ];
function Bf(e, t, n, r, i = 0, a = i, o = i) {
  if (e.kind === `ring`) {
    let [a, o, s] = e.centre,
      [c, l, u] = e.axis,
      d = t - a,
      f = n - o,
      p = r - s,
      m = d * c + f * l + p * u;
    if (Math.abs(m) > e.halfDepth + i) return !1;
    let h = Math.hypot(d - c * m, f - l * m, p - u * m);
    return h + i > e.inner && h - i < e.outer;
  }
  if (e.kind === `capsule`) {
    let [a, o, s] = e.a,
      [c, l, u] = e.b,
      d = c - a,
      f = l - o,
      p = u - s,
      m = d * d + f * f + p * p,
      h = Math.max(
        0,
        Math.min(1, ((t - a) * d + (n - o) * f + (r - s) * p) / m),
      );
    return (
      Math.hypot(t - a - d * h, n - o - f * h, r - s - p * h) < e.radius + i
    );
  }
  if (n - o > e.yMax || n + a < e.yMin) return !1;
  if (e.kind === `cylinder`)
    return Math.hypot(t - e.centre[0], r - e.centre[1]) < e.radius + i;
  if (e.kind === `annulus`) {
    let n = Math.hypot(t - e.centre[0], r - e.centre[1]);
    if (n + i < e.inner || n - i > e.outer) return !1;
    if (e.from === void 0 || e.to === void 0) return !0;
    let a = Math.atan2(r - e.centre[1], t - e.centre[0]) / $d,
      o = n > 1 ? i / n / $d : 180;
    for (; a < e.from - o;) a += 360;
    for (; a > e.from + 360;) a -= 360;
    return a <= e.to + o;
  }
  let s = Math.cos(e.heading * $d),
    c = Math.sin(e.heading * $d),
    l = t - e.centre[0],
    u = r - e.centre[1];
  return (
    Math.abs(l * s + u * c) < e.halfLength + i &&
    Math.abs(-l * c + u * s) < e.halfWidth + i
  );
}
var Vf = null,
  Hf = 32,
  Uf = (e, t) => (e + 4096) * 8192 + t + 4096,
  Wf = (e, t) => Uf(Math.floor(e / Hf), Math.floor(t / Hf));
