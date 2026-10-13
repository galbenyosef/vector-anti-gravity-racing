// assets__game-CsnOSIff 20 — math
// Lines 5895-6196 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Ll = [
    `date-palm`,
    `date-palm-lod`,
    `coconut-palm`,
    `coconut-palm-lod`,
    `fan-palm`,
    `desert-shrub`,
    `reeds`,
    `boulder-cluster`,
    `hoodoo`,
    `rock-arch`,
    `solar-tower`,
    `heliostat`,
    `desal-plant`,
    `storage-tanks`,
    `cooling-tower`,
    `hydro-dome`,
    `harvester-gantry`,
    `crop-row`,
    `wind-catcher`,
    `oasis-habitat`,
    `sun-sail`,
    `aqueduct-wall`,
    `track-pylon`,
    `pylon-head`,
    `leap-gantry`,
  ],
  Rl = 7,
  zl = 7,
  Bl = -1,
  Vl = null,
  Hl = 48;
function Ul() {
  if (Bl === F && Vl) return Vl;
  let e = Array.from({ length: Math.ceil(F / 4) }, (e, t) => {
      let n = Gn(t * 4).position;
      return { d: t * 4, x: n.x, y: n.y, z: n.z };
    }),
    t = new Map();
  for (let n of e) {
    let e = `${Math.floor(n.x / Hl)},${Math.floor(n.z / Hl)}`,
      r = t.get(e);
    (r || t.set(e, (r = [])), r.push(n));
  }
  return ((Bl = F), (Vl = { samples: e, grid: t }), Vl);
}
function Wl(e, t, n = -1 / 0, r = 1 / 0, i = 400) {
  let { grid: a } = Ul(),
    o = Math.floor(e / Hl),
    s = Math.floor(t / Hl),
    c = Math.ceil(i / Hl),
    l = 1 / 0;
  for (let i = -c; i <= c; i++)
    for (let u = -c; u <= c; u++) {
      let c = a.get(`${o + i},${s + u}`);
      if (c)
        for (let i of c) {
          if (i.y - 4 > n + r + 6) continue;
          let a = Math.hypot(i.x - e, i.z - t);
          a < l && (l = a);
        }
    }
  return l;
}
function Gl(e, t = 1) {
  return (
    Math.hypot(
      Math.max(Math.abs(e.min[0]), Math.abs(e.max[0])),
      Math.max(Math.abs(e.min[2]), Math.abs(e.max[2])),
    ) * t
  );
}
var Kl = (e, t, n, r, i = 1, a = i) =>
  new M().compose(
    new g(e, t, n),
    new Ot().setFromAxisAngle(new g(0, 1, 0), r),
    new g(i, a, i),
  );
function ql(e, t) {
  let n = j(0),
    r = [],
    i = 20928,
    a = () => (
      (i = (Math.imul(i, 1664525) + 1013904223) >>> 0),
      i / 4294967296
    ),
    o = [],
    s = (e, t, n, r = 4) =>
      !o.some((i) => Math.hypot(i.x - e, i.z - t) < i.radius + n + r),
    c = (t, n = 1) => e[t].max[1] * n,
    l = (
      i,
      l,
      u,
      d = a() * Math.PI * 2,
      {
        scale: f = 1,
        margin: p = zl,
        blocks: m = !0,
        gap: h = 4,
        sink: g = 0.3,
        dry: _ = !0,
      } = {},
    ) => {
      let v = Gl(e[i], f),
        y = t(l, u);
      return (_ && y < 0.4) ||
        Wl(l, u, y, c(i, f)) < n + v + p ||
        (m && !s(l, u, v, h))
        ? !1
        : (r.push({
            asset: i,
            matrix: Kl(l, y - g, u, d, f),
            x: l,
            z: u,
            radius: v,
          }),
          m && o.push({ x: l, z: u, radius: v }),
          !0);
    },
    u = (e, n) =>
      Math.hypot(t(e + 3, n) - t(e - 3, n), t(e, n + 3) - t(e, n - 3)) / 6;
  (l(`solar-tower`, Jc.x, Jc.z, 0.4, { margin: 4 }),
    l(`rock-arch`, 760, 40, 1.2, { margin: 30 }),
    l(`rock-arch`, -760, -470, 0.3, { margin: 30, scale: 0.8 }),
    l(`rock-arch`, 180, 820, 2.4, { margin: 30, scale: 0.7 }),
    l(`desal-plant`, 20, 610, 0.55, { margin: 10 }),
    l(`storage-tanks`, 150, 640, 1.1, { margin: 10 }),
    l(`cooling-tower`, -90, 690, 0, { margin: 10 }),
    l(`cooling-tower`, -30, 760, 0, { margin: 10, scale: 0.85 }),
    l(`storage-tanks`, 470, -780, 2.3, { margin: 12 }),
    l(`cooling-tower`, 560, -700, 0, { margin: 12, scale: 1.1 }),
    l(`desal-plant`, 330, -840, 0.9, { margin: 12 }));
  for (let [e, t] of [
    [150, 150],
    [205, 105],
    [120, 225],
    [185, 250],
    [245, 175],
  ])
    l(`hydro-dome`, e, t, a() * 6, { margin: 6, gap: 3 });
  let d = { x: -250, z: 190 };
  for (let e = 0; e < 26; e++) {
    let e = a() * Math.PI * 2,
      t = 40 + a() * 150,
      n = d.x + Math.cos(e) * t,
      r = d.z + Math.sin(e) * t * 0.7,
      i = a();
    u(n, r) > 0.35 ||
      l(
        i < 0.45 ? `oasis-habitat` : i < 0.75 ? `wind-catcher` : `sun-sail`,
        n,
        r,
        Math.round(a() * 4) * (Math.PI / 2) + (a() - 0.5) * 0.3,
        { margin: 10 },
      );
  }
  for (let e = 0; e < 900; e++) {
    let e = -900 + a() * 1100,
      n = -700 + a() * 1e3,
      r = t(e, n);
    r < 0.3 ||
      r > 3.2 ||
      ol(e, n) > 0.2 ||
      ol(e + 14, n) + ol(e - 14, n) + ol(e, n + 14) + ol(e, n - 14) <= 0 ||
      (a() < 0.55
        ? l(
            Wl(e, n, r, 16) < 80 ? `coconut-palm` : `coconut-palm-lod`,
            e,
            n,
            a() * 6.3,
            { scale: 0.85 + a() * 0.35, margin: 4, gap: 1 },
          )
        : l(`reeds`, e, n, a() * 6.3, { margin: 2, blocks: !1, dry: !1 }));
  }
  for (let e = 0; e < 40; e++) {
    let e = a() * Math.PI * 2,
      t = 30 + a() * 170;
    l(
      `fan-palm`,
      d.x + Math.cos(e) * t,
      d.z + Math.sin(e) * t * 0.7,
      a() * 6.3,
      { scale: 0.8 + a() * 0.5, margin: 3, gap: 1 },
    );
  }
  let f = { x: 250, z: 220, angle: 0.9 },
    p = Math.cos(f.angle),
    m = Math.sin(f.angle),
    h = 0;
  for (let e = -20; e <= 20; e++)
    for (let r = -17; r <= 17; r++) {
      let i = e * 13.5 + (r % 2) * 6.75,
        o = r * 15.5,
        s = f.x + i * p - o * m,
        c = f.z + i * m + o * p,
        d = t(s, c);
      if (d < 0.8 || d > 13 || u(s, c) > 0.18) continue;
      let g = Wl(s, c, d, 16);
      g < n + 8 ||
        Math.hypot(i / 280, o / 230) > 1 ||
        (l(
          g < 80 ? `date-palm` : `date-palm-lod`,
          s + (a() - 0.5) * 1.5,
          c + (a() - 0.5) * 1.5,
          a() * 6.3,
          { scale: 0.9 + a() * 0.22, margin: 6, gap: 0.5 },
        ),
        e % 7 == 0 &&
          r % 5 == 3 &&
          h < 7 &&
          l(`harvester-gantry`, s, c, f.angle + Math.PI / 2, {
            margin: 10,
            blocks: !1,
          }) &&
          h++);
    }
  for (let [e, t, n] of [
    [-40, 190, 0.2],
    [-120, 250, 0.2],
    [300, 560, 0.55],
    [380, 610, 0.55],
    [-560, 260, -0.4],
  ])
    for (let r = 0; r < 4; r++)
      l(`crop-row`, e + r * 16 * Math.sin(n), t + r * 16 * Math.cos(n), n, {
        margin: 6,
        gap: 1,
      });
  let g = { x: Jc.x, z: Jc.z };
  for (let e = 104; e < Jc.radius; e += 15) {
    let t = Math.floor((Math.PI * 2 * e) / 17);
    for (let n = 0; n < t; n++) {
      let r = (n / t) * Math.PI * 2 + (e % 30) * 0.01,
        i = g.x + Math.cos(r) * e,
        a = g.z + Math.sin(r) * e;
      u(i, a) > 0.12 ||
        l(`heliostat`, i, a, Math.atan2(-(g.x - i), -(g.z - a)), {
          margin: 6,
          gap: 0.5,
          sink: 0,
        });
    }
  }
  for (let e = 0; e < 70; e++) {
    let e = -1e3 + a() * 2100,
      t = -1150 + a() * 2150;
    u(e, t) > 0.5 ||
      l(a() < 0.2 ? `hoodoo` : `boulder-cluster`, e, t, a() * 6.3, {
        scale: 0.7 + a() * 0.9,
        margin: 12,
      });
  }
  for (let e = 0; e < 260; e++) {
    let e = -1050 + a() * 2200,
      t = -1150 + a() * 2200;
    u(e, t) > 0.4 ||
      l(`desert-shrub`, e, t, a() * 6.3, {
        scale: 0.7 + a() * 0.8,
        margin: 3,
        blocks: !1,
      });
  }
  let _ = qc.path;
  for (let e = 1; e < _.length; e++) {
    let [t, i] = _[e - 1],
      [a, o] = _[e],
      s = Math.hypot(a - t, o - i),
      c = (a - t) / s,
      l = (o - i) / s;
    for (let e = 20; e < s - 10; e += 40)
      for (let a of [-1, 1]) {
        let o = qc.halfWidth + 1.6,
          s = t + c * e - l * a * o,
          u = i + l * e + c * a * o;
        if (Wl(s, u, -5, 14) < n + 26) continue;
        let d = Math.atan2(c, l) + (a > 0 ? 0 : Math.PI);
        r.push({
          asset: `aqueduct-wall`,
          matrix: Kl(s, 0, u, d),
          x: s,
          z: u,
          radius: 20,
        });
      }
  }
  Jl(r, t, e);
  for (let e of Dt) {
    let t = e.kicker - 8,
      n = Gn(t),
      i = Math.hypot(n.tangent.x, n.tangent.z),
      a = Ft(t, 0, 0);
    r.push({
      asset: `leap-gantry`,
      matrix: Kl(a.x, a.y, a.z, Math.atan2(n.tangent.x / i, n.tangent.z / i)),
      x: a.x,
      z: a.z,
      radius: 26,
    });
  }
  return r;
}
