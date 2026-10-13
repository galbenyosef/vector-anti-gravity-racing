// assets__game-CsnOSIff 33 — math
// Lines 9634-9821 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function Wf() {
  if (Bf) return Bf;
  let e = [],
    t = new Map();
  for (let n = 0; n < Xd; n += 2) {
    let r = Yd.frame(n),
      i = Zd * Math.abs(Math.sin(r.bank)),
      a = Math.hypot(r.tangent.x, r.tangent.z) || 1,
      o = {
        d: n,
        x: r.position.x,
        y: r.position.y,
        z: r.position.z,
        tx: r.tangent.x / a,
        tz: r.tangent.z / a,
        top: r.position.y + i,
        under: r.position.y - i - $d.slab,
      };
    e.push(o);
    let s = Uf(o.x, o.z),
      c = t.get(s);
    c ? c.push(o) : t.set(s, [o]);
  }
  return ((Bf = { samples: e, grid: t }), Bf);
}
function Gf(e, t, n) {
  let r = [];
  for (let i of Kf(e, t, Zd + n + 2)) {
    let a = e - i.x,
      o = t - i.z,
      s = Math.abs(a * i.tx + o * i.tz),
      c = Math.abs(-a * i.tz + o * i.tx);
    s ** 2 + Math.max(0, c - Zd) ** 2 <= (n + 1.2) ** 2 && r.push(i);
  }
  return r;
}
function Kf(e, t, n) {
  let { grid: r } = Wf(),
    i = [],
    a = Math.ceil(n / Vf),
    o = Math.floor(e / Vf),
    s = Math.floor(t / Vf);
  for (let c = -a; c <= a; c++)
    for (let l = -a; l <= a; l++)
      for (let a of r.get(Hf(o + c, s + l)) ?? [])
        Math.hypot(a.x - e, a.z - t) <= n && i.push(a);
  return i;
}
var qf = (e) => Yd.frame(e).position,
  Jf = (e, t, n, r = !1) => {
    let i = nf(e, t, n, !1, r);
    return [i.x, i.y, i.z];
  },
  Yf = (e) => {
    let t = Yd.frame(e).tangent;
    return Math.atan2(t.z, t.x) / Qd;
  };
function Xf(e, t, n = 0.38, r) {
  let i = e.length,
    a = (n) => {
      if (!t && n === i - 1 && r !== void 0) return r;
      let a = e[t ? (n - 1 + i) % i : Math.max(0, n - 1)],
        o = e[t ? (n + 1) % i : Math.min(i - 1, n + 1)];
      return Math.atan2(o[2] - a[2], o[0] - a[0]) / Qd;
    },
    o = [];
  for (let t = 1; t < i; t++) o.push({ to: e[t], heading: a(t), tension: n });
  return (
    t && o.push({ to: e[0], heading: a(0), tension: n }),
    { start: e[0], heading: a(0), pieces: o }
  );
}
function Zf(e) {
  return e <= 25
    ? { half: 6, above: 2.5, below: 0, movingBelow: 2.5 }
    : lf.skyLane;
}
function Qf(e, t, n, r, i) {
  let a = (e) => {
      let t = [...i].sort((e, t) => e[0] - t[0]);
      if (e <= t[0][0]) return t[0][1];
      for (let n = 1; n < t.length; n++)
        if (e <= t[n][0]) {
          let [r, i] = t[n - 1],
            [a, o] = t[n];
          return i + ((o - i) * (e - r)) / (a - r);
        }
      return t[t.length - 1][1];
    },
    o = [r.far, r.near, ...i.map((e) => e[0])];
  for (let e = r.far + 40; e < r.near; e += 40) o.push(e);
  let s = [...new Set(o.map((e) => Math.round(e * 1e3) / 1e3))]
      .filter((e) => e >= r.far && e <= r.near)
      .sort((e, t) => e - t),
    c = Math.abs(r.xs - r.xn) / 2,
    l = [];
  for (let e = 1; e < s.length; e++)
    l.push({ straight: s[e] - s[e - 1], y: a(s[e]) });
  let u = r.xn < r.xs ? `right` : `left`;
  l.push({ turn: u, radius: c, degrees: 180, y: a(r.near) });
  for (let e = s.length - 2; e >= 0; e--)
    l.push({ straight: s[e + 1] - s[e], y: a(s[e]) });
  return (
    l.push({ turn: u, radius: c, degrees: 180, y: a(r.far) }),
    {
      id: e,
      name: t,
      kind: `sky-lane`,
      group: `sky`,
      mode: `loop`,
      speed: 34,
      envelope: Zf(n),
      smooth: 10,
      start: [r.xs, a(r.far), r.far],
      heading: 90,
      pieces: l,
    }
  );
}
function $f(e, t, n, r, i = []) {
  let a = Math.hypot(n[0] - t[0], n[2] - t[2]),
    o = (n[0] - t[0]) / a,
    s = (n[2] - t[2]) / a,
    c = Math.atan2(s, o) / Qd,
    l = Math.max(r, Math.min(t[1], n[1])),
    u = Math.min(40, a / 4),
    d = [t[0] + o * u, Math.max(l, t[1]), t[2] + s * u],
    f = [n[0] - o * u, Math.max(l, n[1]), n[2] - s * u];
  return {
    id: e,
    name: e,
    kind: `drone`,
    group: `drones`,
    mode: `shuttle`,
    speed: 22,
    envelope: lf.drone,
    smooth: 10,
    allow: i,
    start: t,
    heading: c,
    pieces: [
      { to: d, heading: c, tension: 0.35 },
      { to: f, heading: c, tension: 0.35 },
      { to: n, heading: c, tension: 0.35 },
    ],
  };
}
function ep(e, t, n, r, i) {
  let a = Math.ceil(
      Math.PI * (3 * (n + r) - Math.sqrt((3 * n + r) * (n + 3 * r))),
    ),
    o = Math.cos(i * Qd),
    s = Math.sin(i * Qd),
    c = [];
  for (let e = 0; e <= a; e++) {
    let i = (e / a) * 2 * Math.PI,
      l = Math.cos(i) * n,
      u = Math.sin(i) * r;
    c.push([
      t[0] + l * o - u * s,
      t[1] + Math.sin(i * 2) * 4,
      t[2] + l * s + u * o,
    ]);
  }
  return {
    id: e,
    name: e,
    kind: `blimp`,
    group: `blimps`,
    mode: `loop`,
    speed: 8,
    envelope: lf.blimp,
    start: c[0],
    heading: 0,
    pieces: [{ polyline: c.slice(1) }],
  };
}
var tp = { west: -560, east: -290 },
  np = tp.east - tp.west - 140,
  rp = { south: -390, north: -500 },
  ip = (() => {
    let e = Ge.findIndex((e) => e.name === `SKYWAY BOULEVARD`),
      t = Ge[e].from * Xd,
      n = Ge[e + 1].from * Xd;
    return Yd.frame((t + n) / 2).position.z;
  })(),
  ap = { south: -205, north: -265 },
  op = { boulevard: 35, canyon: 65 };
