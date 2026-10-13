// assets__game-CsnOSIff 32 — centre
// Lines 9291-9633 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var _f = 0.45 * Xd,
  vf = (() => {
    let e = Yd.frame(_f);
    return {
      distance: _f,
      centre: [e.position.x, e.position.y + 17, e.position.z],
      axis: [e.tangent.x, e.tangent.y, e.tangent.z],
      lane: 0,
      height: 17,
      radius: 35,
      depth: 36,
    };
  })(),
  yf = {
    centre: [-450, 280, -350],
    heading: 20,
    length: 300,
    radius: 31,
    bays: [-100, -60, -20, 20, 60, 100],
  },
  bf = [Math.cos(yf.heading * Qd), Math.sin(yf.heading * Qd)],
  xf = (e, t = 0) => [
    yf.centre[0] + bf[0] * e,
    yf.centre[1] - t,
    yf.centre[2] + bf[1] * e,
  ],
  Sf = [
    { id: `stack-1`, centre: [-700, -470], heading: 0 },
    { id: `stack-2`, centre: [-760, -300], heading: 0 },
    { id: `stack-3`, centre: [-610, -200], heading: 0 },
    { id: `stack-4`, centre: [-700, -100], heading: 0 },
  ],
  Cf = 22,
  wf = Jd + 160,
  Tf = {
    centre: [-871.4, -678.9],
    radius: 15,
    top: Jd + 140,
    conveyor: { radius: 23, from: Jd + 25, to: Jd + 140, turns: 3 },
  },
  Ef = {
    centre: [170, 340],
    radius: 40,
    crown: 155,
    gear: 2.5,
    pads: [45, 135, 225, 315].map((e) => ({
      angle: e,
      position: [170 + Math.cos(e * Qd) * 24, 155, 340 + Math.sin(e * Qd) * 24],
    })),
  },
  Df = [
    { from: -170, to: -60 },
    { from: -50, to: 71 },
  ],
  Of = 32.4,
  kf = 54,
  Af = 230,
  jf = 80,
  Mf = -400,
  Nf = 125,
  Pf = 29,
  Ff = 0.04,
  If = 160,
  Lf = 600,
  Rf = [
    {
      id: `aurelian-shell`,
      kind: `box`,
      centre: gf(hf / 2, 0),
      heading: mf,
      halfLength: hf / 2 + 2,
      halfWidth: 39,
      yMin: 76,
      yMax: 165,
      ground: !0,
    },
    {
      id: `aurelian-tower-south`,
      kind: `box`,
      centre: gf(0, -46),
      heading: mf,
      halfLength: 31,
      halfWidth: 24,
      yMin: Jd - 5,
      yMax: Jd + 215,
      ground: !0,
    },
    {
      id: `aurelian-tower-north`,
      kind: `box`,
      centre: gf(hf, 46),
      heading: mf,
      halfLength: 31,
      halfWidth: 24,
      yMin: Jd - 5,
      yMax: Jd + 215,
      ground: !0,
    },
    {
      id: `aurelian-porte-cochere`,
      kind: `box`,
      centre: gf(-14, 0),
      heading: mf,
      halfLength: 16,
      halfWidth: 32,
      yMin: 92,
      yMax: 148,
      ground: !1,
    },
    {
      id: `aurelian-terrace`,
      kind: `box`,
      centre: gf(hf + 14, 0),
      heading: mf,
      halfLength: 16,
      halfWidth: 40,
      yMin: 108,
      yMax: 132,
      ground: !1,
    },
    {
      id: `vertiport-tower`,
      kind: `cylinder`,
      centre: Ef.centre,
      radius: Ef.radius,
      yMin: -1 / 0,
      yMax: Ef.crown,
      ground: !0,
    },
    {
      id: `vertiport-crown`,
      kind: `cylinder`,
      centre: Ef.centre,
      radius: Ef.radius + 6,
      yMin: Ef.crown,
      yMax: Ef.crown + 30,
      ground: !1,
    },
    {
      id: `silo`,
      kind: `cylinder`,
      centre: Tf.centre,
      radius: 15.4,
      yMin: -1 / 0,
      yMax: Tf.top,
      ground: !0,
    },
    {
      id: `silo-top`,
      kind: `cylinder`,
      centre: Tf.centre,
      radius: Tf.radius + 3,
      yMin: Tf.top,
      yMax: Tf.top + 6,
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
      yMax: Jd + 45,
      ground: !0,
    },
    {
      id: `cauldron`,
      kind: `cylinder`,
      centre: [-168.7, 62],
      radius: 82,
      yMin: -1 / 0,
      yMax: Jd + 30,
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
      yMax: Jd + 32,
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
      yMax: Jd + 52,
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
      yMax: Jd + 28,
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
      yMax: Jd + 18,
      ground: !0,
    },
    ...Df.map((e) => [e.from, e.to]).flatMap(([e, t], n) =>
      [-795, -655].map((r, i) => ({
        id: `canyon-tower-${n * 2 + i + 1}`,
        kind: `box`,
        centre: [(e + t) / 2, r],
        heading: 0,
        halfLength: (t - e) / 2,
        halfWidth: 35,
        yMin: -1 / 0,
        yMax: Jd + 340,
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
      centre: vf.centre,
      axis: vf.axis,
      inner: vf.radius,
      outer: 130,
      halfDepth: vf.depth / 2 + 1,
      yMin: -1 / 0,
      yMax: 1 / 0,
      ground: !1,
    },
    {
      id: `leviathan`,
      kind: `capsule`,
      a: xf(-yf.length / 2 + yf.radius),
      b: xf(yf.length / 2 - yf.radius),
      radius: yf.radius + 4,
      yMin: -1 / 0,
      yMax: 1 / 0,
      ground: !1,
    },
    ...[-1, 1].map((e) => ({
      id: `leviathan-mast-${e < 0 ? `west` : `east`}`,
      kind: `cylinder`,
      centre: [
        yf.centre[0] + bf[0] * e * 110 + bf[1] * 70,
        yf.centre[2] + bf[1] * e * 110 - bf[0] * 70,
      ],
      radius: 14,
      yMin: -1 / 0,
      yMax: yf.centre[1] - 20,
      ground: !0,
    })),
    ...Sf.map((e) => ({
      id: e.id,
      kind: `box`,
      centre: e.centre,
      heading: e.heading,
      halfLength: Cf + 2,
      halfWidth: Cf + 2,
      yMin: -1 / 0,
      yMax: wf + 4,
      ground: !0,
    })),
  ];
function zf(e, t, n, r, i = 0, a = i, o = i) {
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
    let a = Math.atan2(r - e.centre[1], t - e.centre[0]) / Qd,
      o = n > 1 ? i / n / Qd : 180;
    for (; a < e.from - o;) a += 360;
    for (; a > e.from + 360;) a -= 360;
    return a <= e.to + o;
  }
  let s = Math.cos(e.heading * Qd),
    c = Math.sin(e.heading * Qd),
    l = t - e.centre[0],
    u = r - e.centre[1];
  return (
    Math.abs(l * s + u * c) < e.halfLength + i &&
    Math.abs(-l * c + u * s) < e.halfWidth + i
  );
}
var Bf = null,
  Vf = 32,
  Hf = (e, t) => (e + 4096) * 8192 + t + 4096,
  Uf = (e, t) => Hf(Math.floor(e / Vf), Math.floor(t / Vf));
