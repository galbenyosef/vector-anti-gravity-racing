// assets__game-CsnOSIff 35 — path
// Lines 10182-10519 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function cp() {
  let { centre: e, crown: t, pads: n } = Ef,
    r = [],
    i = [60, 105, 150, 195],
    a = (t, n, r) => [
      e[0] + Math.cos(t * Qd) * n,
      r,
      e[1] + Math.sin(t * Qd) * n,
    ];
  return (
    n.forEach((e, n) => {
      let [o, , s] = e.position,
        c = [o, t + 22, s],
        l = [o, t + Ef.gear, s],
        u = a(i[n], 700, 235),
        d = a(i[n], 150, 205),
        f = (i[n] + 180) % 360;
      r.push({
        id: `taxi-pad${n + 1}-in`,
        name: `Vertiport pad ${n + 1} inbound`,
        kind: `taxi`,
        group: `taxis`,
        mode: `through`,
        speed: 30,
        envelope: lf.taxi,
        allow: [`vertiport-crown`],
        start: u,
        heading: f,
        pieces: [
          { to: d, heading: f, tension: 0.4 },
          { to: c, heading: f, tension: 0.45 },
          { polyline: [l] },
        ],
      });
      let p = i[n] + 25,
        m = a(p, 160, 215),
        h = a(p, 700, 250);
      r.push({
        id: `taxi-pad${n + 1}-out`,
        name: `Vertiport pad ${n + 1} outbound`,
        kind: `taxi`,
        group: `taxis`,
        mode: `through`,
        speed: 30,
        envelope: lf.taxi,
        allow: [`vertiport-crown`],
        start: l,
        heading: p,
        pieces: [
          { polyline: [c] },
          { to: m, heading: p, tension: 0.45 },
          { to: h, heading: p, tension: 0.4 },
        ],
      });
    }),
    r
  );
}
var lp = null;
function up() {
  if (lp) return lp;
  let e = new Map();
  for (let t of sp()) {
    let { pieces: n, start: r, heading: i, ...a } = t,
      o = af(r, i, n),
      s = t.mode === `loop`,
      c = cf(hp(o), t.smooth ?? 0, s);
    e.set(t.id, { ...a, path: new ef(c, s) });
  }
  let t = _p(e);
  return (
    (lp = {
      lines: e,
      stations: t,
      pylons: yp(e, t),
      hangers: dp(e),
      pierGaps: pp(e),
    }),
    lp
  );
}
function dp(e) {
  let t = [],
    [n, r, i] = vf.centre,
    [a, o, s] = vf.axis,
    c = { x: 0, y: 0, z: 0 },
    l = (e) => (e.x - n) * a + (e.y - r) * o + (e.z - i) * s;
  for (let a of e.values()) {
    if (!a.pylons) continue;
    let e = NaN;
    for (let o = 0; o <= a.path.length; o += 1) {
      a.path.pointAt(o, c);
      let s = l(c);
      if (e < 0 && s >= 0) {
        let e = o - 1,
          s = o;
        for (let t = 0; t < 30; t++) {
          let t = (e + s) / 2;
          l(a.path.pointAt(t, c)) < 0 ? (e = t) : (s = t);
        }
        (a.path.pointAt(s, c),
          Math.hypot(c.x - n, c.y - r, c.z - i) < vf.radius &&
            t.push({
              line: a.id,
              s,
              position: [c.x, c.y - a.envelope.below, c.z],
              by: `eye`,
            }));
      }
      e = s;
    }
  }
  return t;
}
var fp = 4;
function pp(e) {
  let t = [],
    n = { x: 0, y: 0, z: 0 },
    r = -1 / 0;
  for (let e of Wf().samples) r = Math.max(r, e.under);
  for (let i of e.values()) {
    let e = i.envelope,
      a = [];
    for (let t of i.path.stations(1))
      if ((i.path.pointAt(t, n), !(n.y + e.above >= r)))
        for (let t of Gf(n.x, n.z, e.half + fp))
          n.y + e.above < t.under &&
            a.push({ d: t.d, top: n.y + e.above, soffit: t.under });
    a.sort((e, t) => e.d - t.d);
    for (let e of a) {
      let n = t.at(-1);
      n && n.line === i.id && e.d - n.to <= 6
        ? ((n.to = e.d),
          (n.top = Math.max(n.top, e.top)),
          (n.soffit = Math.min(n.soffit, e.soffit)))
        : t.push({
            line: i.id,
            from: e.d,
            to: e.d,
            top: e.top,
            soffit: e.soffit,
          });
    }
  }
  for (let e of t) ((e.from -= 2), (e.to += 2));
  return t;
}
function mp(e) {
  let t = ((e % Xd) + Xd) % Xd;
  return !up().pierGaps.some(
    (e) =>
      (t >= e.from && t <= e.to) ||
      (t + Xd >= e.from && t + Xd <= e.to) ||
      (t - Xd >= e.from && t - Xd <= e.to),
  );
}
function hp(e) {
  let t = [e[0]];
  for (let n of e.slice(1)) {
    let e = t[t.length - 1];
    Math.hypot(n[0] - e[0], n[1] - e[1], n[2] - e[2]) > 0.05 && t.push(n);
  }
  return t;
}
function gp(e, t, n, r, i) {
  let a = e.path.nearestS(r[0], r[1], r[2], !0),
    o = e.path.wrap(a - i / 2),
    s = e.path.wrap(a + i / 2),
    c = e.path.pointAt(a);
  return {
    id: t,
    name: n,
    line: e.id,
    from: o,
    to: s,
    centre: [c.x, c.y, c.z],
    heading: e.path.headingAt(a) / Qd,
    length: i,
  };
}
function _p(e) {
  return [
    gp(e.get(`marina`), `crown-station`, `Crown Station`, [0, kf, Af], 90),
    gp(
      e.get(`aurelian`),
      `aurelian-station`,
      `Aurelian Station`,
      Jf(uf + Nf, -29, 1),
      90,
    ),
    gp(
      e.get(`freight`),
      `stackyard-station`,
      `Stackyard Station`,
      [tp.west + 70 + np / 2, jf, Mf],
      90,
    ),
  ];
}
function vp(e, t, n, r) {
  let i = (Jd + n) / 2,
    a = (n - Jd) / 2;
  return Rf.some((o) => {
    if (o.kind !== `ring` && o.kind !== `capsule`)
      return zf(o, e, i, t, r, a, a);
    for (let i = Jd; i <= n; i += 2) if (zf(o, e, i, t, r)) return !0;
    return !1;
  });
}
function yp(e, t) {
  let n = [],
    r = Zd + $d.footMargin,
    i = new Map();
  for (let t of e.values()) {
    let e = t.envelope;
    for (let n of t.path.stations(4)) {
      let r = t.path.pointAt(n),
        a = Uf(r.x, r.z),
        o = {
          id: t.id,
          x: r.x,
          z: r.z,
          low: r.y - Math.max(e.below, e.movingBelow),
          high: r.y + e.above,
          half: e.half,
        },
        s = i.get(a);
      s ? s.push(o) : i.set(a, [o]);
    }
  }
  let a = (e, t, n, r) => {
      let a = Math.floor(t / Vf),
        o = Math.floor(n / Vf);
      for (let s = -1; s <= 1; s++)
        for (let c = -1; c <= 1; c++)
          for (let l of i.get(Hf(a + s, o + c)) ?? [])
            if (
              l.id !== e &&
              Math.hypot(l.x - t, l.z - n) < l.half + 3 &&
              l.high > Jd &&
              l.low < r
            )
              return !0;
      return !1;
    },
    o = { x: 0, y: 0, z: 0 };
  for (let i of e.values()) {
    if (!i.pylons) continue;
    let e = i.pylons,
      s = t.filter((e) => e.line === i.id);
    for (let t = e / 2; t < i.path.length; t += e) {
      i.path.pointAt(t, o);
      let e = o.y - i.envelope.below;
      e - Jd < 6 ||
        Kf(o.x, o.z, r).length ||
        vp(o.x, o.z, e, 3) ||
        s.some((e) =>
          e.from <= e.to
            ? t > e.from - 6 && t < e.to + 6
            : t > e.from - 6 || t < e.to + 6,
        ) ||
        a(i.id, o.x, o.z, e) ||
        n.push({
          line: i.id,
          s: t,
          x: o.x,
          z: o.z,
          ground: Jd,
          top: e,
          heading: i.path.headingAt(t) / Qd,
        });
    }
  }
  return n;
}
function bp(e, t = 2) {
  let n = e.kind === `monorail` ? 0.12 : e.kind === `expressway` ? 0.05 : 0,
    r = e.path.stations(Math.min(t, 2)),
    i = r.map((t) =>
      n === 0
        ? 0
        : Math.max(
            -n,
            Math.min(
              n,
              0.5 * Math.atan((e.speed ** 2 * e.path.curvatureAt(t)) / 9.81),
            ),
          ),
    ),
    a = i.map((t, n) => {
      let r = 0,
        a = 0;
      for (let t = -5; t <= 5; t++) {
        let o = n + t;
        if (e.path.closed) o = (o + i.length) % i.length;
        else if (o < 0 || o >= i.length) continue;
        let s = Math.exp(-0.5 * (t / 2.5) ** 2);
        ((r += i[o] * s), (a += s));
      }
      return r / a;
    }),
    o = { x: 0, y: 0, z: 0 },
    s = { x: 0, y: 0, z: 0 };
  return r.map((t, n) => {
    (e.path.pointAt(t, s), e.path.tangentAt(t, o));
    let r = o.z,
      i = -o.x,
      c = Math.hypot(r, i) || 1;
    ((r /= c), (i /= c));
    let l = o.y * i,
      u = o.z * r - o.x * i,
      d = -o.y * r,
      f = a[n],
      p = Math.cos(f),
      m = Math.sin(f),
      h = [l * p - r * m, u * p, d * p - i * m],
      g = [r * p + l * m, u * m, i * p + d * m];
    return {
      s: t,
      position: [s.x, s.y, s.z],
      tangent: [o.x, o.y, o.z],
      right: g,
      up: h,
      bank: f,
    };
  });
}
var xp = {
    line: `crown`,
    trigger: 0.395,
    behind: 120,
    speed: 150,
    launch: 45,
    ease: 1.2,
    cars: 5,
    carLength: [18, 15],
  },
  Sp = null;
