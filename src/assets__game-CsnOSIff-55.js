// assets__game-CsnOSIff 55 — math
// Lines 22459-22738 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function p_(e) {
  let { b: t, mobile: n } = e,
    { lines: r } = up(),
    i = n ? 3 : 6;
  for (let e of r.values()) {
    if (e.kind !== `sky-lane`) continue;
    let n = 0;
    for (let r = 0; r < 24 && n < i; r++) {
      let i = ((r + 0.5) / 24) * e.path.length,
        a = e.path.pointAt(i);
      if (yg(a.x, a.z) < ah + 30) continue;
      let o = e.path.tangentAt(i),
        s = wh(o.x, o.z),
        c = -Math.asin(Math.max(-1, Math.min(1, o.y))),
        l = $(a.x, a.y, a.z, s, 1, 1, 1, c);
      t.place(`flying`, `sky-lane-gate`, l, {
        role: `attached`,
        margin: 30,
        noLines: !0,
      }) && n++;
    }
  }
}
function m_(e) {
  let { b: t, mobile: n } = e,
    r = i_(
      e,
      `skyline`,
      n ? `meridian-needle-lod` : `meridian-needle`,
      [[1e3, 20]],
      (e, t) => $(Math.max(900, e), Q, t, 0),
      { role: `ground` },
      150,
    );
  if (r)
    for (let e of km[`meridian-needle`].beacons)
      t.add(`skyline`, `aviation-beacon`, $(...Th(r, e)), { role: `attached` });
  let i = `terraced-arcology-lod`,
    a = i_(
      e,
      `skyline`,
      i,
      [[950, -980]],
      (e, t) => $(e, Q, t, 0.4),
      { role: `ground` },
      200,
    ),
    o = i_(
      e,
      `skyline`,
      i,
      [[-1250, -900]],
      (e, t) => $(e, Q, t, 0.4 + Math.PI / 2, 0.85),
      { role: `ground` },
      200,
    );
  for (let e of [a, o])
    if (e)
      for (let n of km[`terraced-arcology`].beacons)
        t.add(`skyline`, `aviation-beacon`, $(...Th(e, n)), {
          role: `attached`,
        });
}
var h_ = [
    `podium-block-a`,
    `podium-block-b`,
    `podium-block-c`,
    `podium-block-d`,
  ],
  g_ = [
    `diagrid-office`,
    `twist-tower`,
    `holo-crown-tower`,
    `cantilever-stack`,
  ];
function __(e, t, n, r, i, a) {
  let { b: o, mobile: s, random: c } = e;
  s && !t.endsWith(`-lod`) && Om[t] && (t = `${t}-lod`);
  let l = t.startsWith(`twist`) ? 0.82 + c() * 0.18 : 1,
    u = $(
      n,
      Q,
      r,
      i,
      l,
      t.startsWith(`podium-block`) || t.startsWith(`diagrid-office`)
        ? 0.85 + c() * 0.35
        : l,
      l,
    );
  if (
    !o.place(`skyline`, t, u, {
      role: `ground`,
      cap: a === 1 / 0 ? void 0 : a,
      variant: Math.floor(c() * 16),
    })
  )
    return !1;
  if ((Xg(e, t, u), t === `holo-crown-tower`))
    for (let e of km[`holo-crown-tower`].holoRings) {
      let t = Th(u, [0, e.y, 0]);
      o.add(
        `skyline`,
        `holo-crown-ring`,
        $(t[0], t[1], t[2], 0, e.radius / 14),
        { role: `attached` },
      );
    }
  return !0;
}
var v_ = (e, t) => t[Math.floor(e() * t.length)];
function y_(e) {
  let { random: t } = e;
  for (let n of [1, -1]) {
    let r = 0;
    for (; r < ih;) {
      let i = v_(t, h_),
        a = Em[i],
        o = a.max[0] - a.min[0],
        s = ah + oh + 13 + t() * 10,
        c = r + o / 2,
        [l, u] = eg(c, n * (s + a.max[2])),
        d = lg(l, u);
      __(e, i, l, u, tg(c, n), d) ? (r += o + 5 + t() * 9) : (r += 9);
    }
  }
}
var b_ = Rf.filter((e) => e.ground),
  x_ = { pitch: 62, x0: -2e3, z0: -2100, x1: 2200, z1: 1900 };
function S_(e) {
  let { random: t } = e;
  y_(e);
  let { pitch: n, x0: r, z0: i, x1: a, z1: o } = x_,
    s = 0;
  for (let c = 0, l = r; l <= a; l += n, c++)
    for (let r = 0, a = i; a <= o; a += n, r++) {
      let n = l + (t() - 0.5) * 10,
        i = a + (t() - 0.5) * 10,
        o = Kh(n, i);
      if (
        o < 32 ||
        o > 1150 ||
        qg(n, i, 40) ||
        b_.some((e) => zf(e, n, Q + 10, i, 25))
      )
        continue;
      if (((c % 7 == 3 || r % 6 == 2) && o > 110) || t() < 0.035) {
        if (o < 520)
          for (let [r, a] of [
            [-16, -16],
            [16, -16],
            [-16, 16],
            [16, 16],
          ])
            e.parks.push({ x: n + r, z: i + a, yaw: t() * 6.28, near: o });
        continue;
      }
      let u = lg(n, i),
        d = t(),
        f = Math.floor(t() * 4) * (Math.PI / 2);
      if (o < 160) {
        let e = C_(n, i);
        e && (f = Math.atan2(-e.tz, e.tx) + (t() < 0.5 ? 0 : Math.PI));
      }
      let p = [],
        m = u > Q + 300;
      o < 240
        ? (m && o > 70 && d < 0.12 && s < 16 && p.push(v_(t, g_)),
          p.push(v_(t, h_), v_(t, h_), `podium-block-d`))
        : o < 450
          ? (d < 0.28 && m && p.push(`${v_(t, g_)}-lod`),
            p.push(
              `${v_(t, h_)}${o > 330 ? `-lod` : ``}`,
              `podium-block-d-lod`,
            ))
          : (d < (o > 800 ? 0.36 : 0.44) && m
              ? p.push(`${v_(t, g_)}-lod`)
              : d < 0.86 && p.push(`${v_(t, h_)}-lod`),
            u < Q + 70 && d < 0.86 && p.push(`podium-block-d-lod`));
      let h = !1;
      placed: for (let [t, r] of [
        [0, 0],
        [8, 0],
        [-8, 0],
        [0, 8],
        [0, -8],
      ])
        for (let a of p)
          if (__(e, a, n + t, i + r, f, u)) {
            (g_.includes(a) && s++, (h = !0));
            break placed;
          }
      if (!h && o < 420 && p.length)
        for (let [r, a] of [
          [-12, -12],
          [12, -12],
          [-12, 12],
          [12, 12],
        ])
          e.parks.push({ x: n + r, z: i + a, yaw: t() * 6.28, near: o });
    }
}
function C_(e, t) {
  let n = null,
    r = 1 / 0;
  for (let i of Gh(e - 160, t - 160, e + 160, t + 160)) {
    let a = Math.hypot(i.x - e, i.z - t);
    a < r && ((r = a), (n = i));
  }
  return n;
}
function w_(e) {
  let { b: t, mobile: n } = e,
    r = 0,
    i = 0,
    a = e.towers.filter((e) => !e.asset.endsWith(`-lod`) && e.top > Q + 120);
  for (let e = 0; e < a.length; e++)
    for (let o = e + 1; o < a.length; o++) {
      if (r >= 8 && i >= 2) return;
      let s = a[e],
        c = a[o],
        l = Math.hypot(c.x - s.x, c.z - s.z) - s.radius - c.radius;
      if (l < 30 || l > 90) continue;
      let u = i < 2 && (e + o) % 3 == 0 ? `sky-bridge-garden` : `sky-bridge`;
      if (u === `sky-bridge` && r >= 8) continue;
      let d = Q + (Math.min(s.top, c.top) - Q) * 0.55,
        f = $(
          (s.x + c.x) / 2,
          d,
          (s.z + c.z) / 2,
          Math.atan2(-(c.z - s.z), c.x - s.x),
          (l + 6) / 60,
          1,
          1,
        );
      t.place(`skyline`, n ? `${u}-lod` : u, f, {
        role: `attached`,
        margin: 6,
      }) && (u === `sky-bridge` ? r++ : i++);
    }
}
function T_(e) {
  let { b: t, random: n, mobile: r } = e,
    i = [-180, -160],
    a = [
      `far-tower-a`,
      `far-tower-b`,
      `far-tower-c`,
      `far-tower-d`,
      `far-tower-e`,
    ],
    o = r ? 180 : 760,
    s = 0;
  for (let e = 0; e < 16 && s < o; e++) {
    let c = 1250 + e * 115,
      l = (130 + (c - 1250) * 0.16) * (r ? 3.5 : 1),
      u = Math.round((2 * Math.PI * c) / l);
    for (let e = 0; e < u && s < o; e++) {
      let r = ((e + n()) / u) * 2 * Math.PI,
        o = c + (n() - 0.5) * 60,
        l = i[0] + Math.cos(r) * o,
        d = i[1] + Math.sin(r) * o;
      if (Kh(l, d) < 1100) continue;
      let f = a[Math.floor(n() * a.length)],
        p = 0.8 + n() * 0.5;
      t.place(`skyline`, f, $(l, Q, d, n() * Math.PI, p), { role: `ground` }) &&
        s++;
    }
  }
}
function E_(e, t, n, r) {
  let i = [];
  for (let a = e; a < t; a += r) {
    let e = $h(a);
    if (Math.abs(e.y - Q) > 1.5) continue;
    let [t, r] = eg(a, n);
    i.push({ x: t, z: r, yaw: tg(a, n), near: Math.abs(n) - ah });
  }
  return i;
}
