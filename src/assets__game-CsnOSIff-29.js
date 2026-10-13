// assets__game-CsnOSIff 29 — math
// Lines 8388-8699 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function Vd(e, t = () => !1) {
  let n = Bd(5947879),
    r = j(0),
    i = [],
    a = [],
    o = [];
  for (let e = 0; e < F; e += 4) {
    let t = Gn(e),
      n = new g(t.tangent.x, 0, t.tangent.z).normalize();
    o.push({
      d: e,
      x: t.position.x,
      y: t.position.y,
      z: t.position.z,
      tx: n.x,
      tz: n.z,
      turn: 0,
    });
  }
  o.forEach((e, t) => {
    let n = o[(t - 3 + o.length) % o.length],
      r = o[(t + 3) % o.length];
    e.turn = (n.tx * r.tz - n.tz * r.tx) / 24;
  });
  let s = new Map();
  for (let e of o) {
    let t = `${Math.floor(e.x / 64)},${Math.floor(e.z / 64)}`,
      n = s.get(t);
    (n || s.set(t, (n = [])), n.push(e));
  }
  let c = (e, t, n = 400) => {
      let r = n,
        i = Math.floor(e / 64),
        a = Math.floor(t / 64),
        o = Math.ceil(n / 64);
      for (let n = -o; n <= o; n++)
        for (let c = -o; c <= o; c++)
          for (let o of s.get(`${i + n},${a + c}`) ?? [])
            r = Math.min(r, Math.hypot(o.x - e, o.z - t));
      return r;
    },
    l = (t, n, r, i) => {
      let a = e(t, n),
        o = 0;
      for (let i = 0; i < 8; i++) {
        let s = (i / 8) * Math.PI * 2;
        o = Math.max(
          o,
          Math.abs(e(t + Math.cos(s) * r, n + Math.sin(s) * r) - a),
        );
      }
      return o <= i;
    },
    u = (e, t, n, i = 10) =>
      c(e, t, n + r + i + 1) > n + r + i &&
      a.every((r) => Math.hypot(r.x - e, r.z - t) > r.r + n),
    d = (
      t,
      n,
      r,
      o,
      {
        y: s = e(n, r),
        pitch: c,
        roll: l,
        scale: u,
        radius: d = Rd[t] ?? 0,
      } = {},
    ) => {
      let f = { asset: t, position: [n, s, r], yaw: o };
      return (
        c !== void 0 && (f.pitch = c),
        l !== void 0 && (f.roll = l),
        u !== void 0 && (f.scale = u),
        i.push(f),
        d > 0 && a.push({ x: n, z: r, r: d }),
        f
      );
    },
    f = (e) => {
      let t = cn.findIndex((t) => t.name.includes(e));
      return t < 0
        ? null
        : { from: cn[t].from * F, to: (cn[t + 1]?.from ?? 1) * F };
    },
    p = (e) => o[Math.floor((((e % F) + F) % F) / 4)];
  for (let e of Rt.filter((e) => e.glass)) {
    let t = p(((e.from + e.to) / 2) * F);
    d(`biodome`, t.x, t.z, zd(t.tx, t.tz), { y: t.y - 4 });
  }
  let m = f(`SLALOM`) ?? { from: 0, to: F * 0.12 },
    h = [];
  for (let e = 1; e < o.length - 1; e++) {
    let t = o[e];
    if (t.d < m.from || t.d > m.to) continue;
    let n = Math.abs(t.turn);
    n > 0.004 &&
      n >= Math.abs(o[e - 1].turn) &&
      n >= Math.abs(o[e + 1].turn) &&
      h.push(t);
  }
  let _ = 0;
  for (let t of h) {
    let r = Math.sign(t.turn) || 1;
    for (let i of [64, 74, 86]) {
      let a = t.x - t.tz * r * i,
        o = t.z + t.tx * r * i;
      if (!u(a, o, 38, 6) || !l(a, o, 30, 6)) continue;
      let s = e(a, o);
      (d(`landing-pad`, a, o, n() * Math.PI * 2, { y: s }),
        d(
          _++ % 2 ? `starship-cargo` : `starship-hls`,
          a,
          o,
          n() * Math.PI * 2,
          { y: s + 0.3, radius: 0 },
        ));
      for (let e = 0; e < 6; e++) {
        let t = (e / 6) * Math.PI * 2;
        d(`pad-light`, a + Math.cos(t) * 36, o + Math.sin(t) * 36, t, {
          radius: 0,
        });
      }
      break;
    }
  }
  let v = p(120);
  for (let [t, r] of [
    [1, 0],
    [-1, 140],
  ])
    for (let i of [95, 120, 150]) {
      let a = p(120 + r),
        o = a.x - a.tz * t * i,
        s = a.z + a.tx * t * i;
      if (!u(o, s, 38) || !l(o, s, 30, 6)) continue;
      let c = e(o, s);
      (d(`landing-pad`, o, s, n() * 6.28, { y: c }),
        d(_++ % 2 ? `starship-cargo` : `starship-hls`, o, s, n() * 6.28, {
          y: c + 0.3,
          radius: 0,
        }));
      break;
    }
  let y = [
      [`printed-habitat`, 4],
      [`habitat-module`, 3],
      [`habitat-inflatable`, 2],
      [`isru-plant`, 1],
      [`fuel-tanks`, 2],
      [`comms-mast`, 2],
      [`lunar-rover`, 3],
      [`ltv-rover`, 3],
      [`cable-spool`, 3],
    ],
    b = { x: v.x - v.tz * -1 * 230, z: v.z + v.tx * -1 * 230 };
  for (let [e, t] of y)
    for (let r = 0, i = 0; r < t && i < 80; i++) {
      let t = n() * Math.PI * 2,
        i = 40 + n() * 170,
        a = b.x + Math.cos(t) * i,
        o = b.z + Math.sin(t) * i,
        s = Rd[e] ?? 5;
      !u(a, o, s, 14) ||
        !l(a, o, s, 3) ||
        (d(e, a, o, zd(b.x - a, b.z - o) + (n() - 0.5) * 0.6), r++);
    }
  let x = -1 / 0;
  for (let e of o) x = Math.max(x, e.y);
  let S = o.filter((e) => e.y > x - 30),
    C = zd(qo.x, qo.z),
    w = [];
  for (let e = 0; e < S.length && w.length < 22; e += 9) {
    let t = S[e];
    for (let e of [-1, 1])
      for (let n of [70, 110]) {
        let r = t.x - t.tz * e * n,
          i = t.z + t.tx * e * n;
        !u(r, i, 6, 30) ||
          !l(r, i, 5, 4) ||
          (d(`solar-mast`, r, i, C), w.push({ x: r, z: i }));
      }
  }
  let T = zd(iu.x, iu.z),
    E = Math.asin(iu.y),
    D = f(`RIDGE`) ?? { from: F * 0.31, to: F * 0.44 };
  for (let e = D.from + 40, t = 0; e < D.to && t < 5; e += 70) {
    let n = p(e),
      r = t % 2 ? 1 : -1,
      i = n.x - n.tz * r * 58,
      a = n.z + n.tx * r * 58;
    !u(i, a, 6, 18) ||
      !l(i, a, 5, 3) ||
      (d(`comms-dish-base`, i, a, T),
      d(`comms-dish-head`, i, a, T, { pitch: E, radius: 0 }),
      t++);
  }
  for (let e = 0; e < 200; e++) {
    let e = n() * Math.PI * 2,
      t = 650 + n() * 300,
      r = b.x + Math.cos(e) * t,
      i = b.z + Math.sin(e) * t;
    if (!(!u(r, i, 16, 60) || !l(r, i, 14, 4))) {
      d(`fission-reactor`, r, i, n() * 6.28);
      break;
    }
  }
  let { mouthX: O, deckHeight: ee } = md.lavaTube;
  for (let e of Rt.filter((e) => !e.glass))
    for (let [t, n] of [
      [e.from * F, 1],
      [e.to * F, -1],
    ]) {
      let e = Gn(t),
        r = p(t),
        i = zd(r.tx * n, r.tz * n);
      d(`lava-tube-portal`, r.x - r.tx * n * O, r.z - r.tz * n * O, i, {
        y: r.y - ee,
        roll: hd(e.up, i),
        radius: 0,
      });
    }
  for (let e of [`CREST`, `DIVE`]) {
    let t = f(e);
    if (!t) continue;
    let n = p(t.from + 10);
    for (let e of [-1, 1]) {
      let t = n.x - n.tz * e * 34,
        r = n.z + n.tx * e * 34;
      u(t, r, 4, 4) && d(`crater-beacon`, t, r, zd(n.tx, n.tz));
    }
  }
  let te = -1 / 0,
    k = 1;
  for (let n of o) {
    if (
      n.d - te < 80 ||
      !t(n.x, n.y + 1, n.z) ||
      Rt.some((e) => n.d >= e.from * F - 20 && n.d <= e.to * F + 20)
    )
      continue;
    let i = n.x - n.tz * k * (r + 9),
      a = n.z + n.tx * k * (r + 9),
      o = e(i, a);
    Math.abs(o - n.y) > 14 ||
      (d(`crater-beacon`, i, a, zd(-n.tz * k, n.tx * k), { radius: 0 }),
      (te = n.d),
      (k = -k));
  }
  {
    let t = { x: v.tx, z: v.tz },
      n = { x: -v.tz, z: v.tx },
      r = { x: v.x + n.x * 330 - t.x * 200, z: v.z + n.z * 330 - t.z * 200 },
      a = zd(t.x, t.z),
      { end: o } = md.massDriver,
      s = r.x,
      c = r.z,
      l = e(s, c) + 6;
    for (
      let n = 0;
      n < 4 &&
      [0, 0.5, 1].every((e) =>
        u(s + t.x * o[0] * e, c + t.z * o[0] * e, 6, 30),
      );
      n++
    ) {
      let n = d(`mass-driver`, s, c, a, { y: l, radius: 0 });
      (i.push(...Cd(n, e)), (s += t.x * o[0]), (c += t.z * o[0]), (l += o[1]));
    }
  }
  if (w.length) {
    let e = w[0],
      t = Math.hypot(b.x - e.x, b.z - e.z);
    for (let n = 40; n < t - 40; n += 40) {
      let i = e.x + ((b.x - e.x) * n) / t,
        a = e.z + ((b.z - e.z) * n) / t;
      c(i, a, r + 8) < r + 6 ||
        d(`power-pylon`, i, a, zd(b.x - e.x, b.z - e.z), { radius: 0 });
    }
  }
  let ne = [`boulder-a`, `boulder-b`, `boulder-c`, `boulder-d`],
    { min: re, max: A } = o.reduce(
      (e, t) => ({
        min: { x: Math.min(e.min.x, t.x), z: Math.min(e.min.z, t.z) },
        max: { x: Math.max(e.max.x, t.x), z: Math.max(e.max.z, t.z) },
      }),
      { min: { x: 1 / 0, z: 1 / 0 }, max: { x: -1 / 0, z: -1 / 0 } },
    );
  for (let t = 0, i = 0; t < 640 && i < 6e3; i++) {
    let i = re.x - 500 + n() * (A.x - re.x + 1e3),
      o = re.z - 500 + n() * (A.z - re.z + 1e3),
      s = c(i, o, 200);
    if (s < r + 10) continue;
    let l = Math.abs(e(i + 6, o) - e(i - 6, o)) / 12;
    if (
      n() > 0.25 + (s < 120 ? 0.35 : 0) + Math.min(0.4, l) ||
      a.some((e) => Math.hypot(e.x - i, e.z - o) < e.r + 4)
    )
      continue;
    let u = n() ** 3,
      f = n() < 0.06 ? `boulder-field` : ne[Math.min(3, Math.floor(u * 4))];
    (s > 160 && f === `boulder-c` && (f = `boulder-c-lod`),
      s > 160 && f === `boulder-d` && (f = `boulder-d-lod`),
      d(f, i, o, n() * Math.PI * 2, {
        y: e(i, o) - 0.3,
        scale: 0.6 + n() * 0.9,
        radius: 0,
      }),
      t++);
  }
  return i;
}
