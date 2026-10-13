// assets__game-CsnOSIff 48 — math
// Lines 20561-20724 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function ug(e) {
  let t = new Zh(e.mobile, e.heightAt);
  t.trace = e.trace;
  let n = {
      b: t,
      random: vh(6167834),
      mobile: e.mobile,
      towers: [],
      parks: [],
    },
    r = Gg();
  return (
    bg(n),
    Og(n),
    Ag(n),
    Bg(n),
    Jg(n),
    Zg(n),
    e_(n, r),
    a_(n),
    o_(n),
    c_(n),
    r_(n),
    l_(n),
    u_(n),
    d_(n),
    f_(n),
    zg(n),
    Rg(n),
    p_(n),
    m_(n),
    S_(n),
    w_(n),
    T_(n),
    D_(n),
    O_(n),
    fg(t),
    {
      layout: {
        placements: t.placements,
        fixtures: t.fixtures,
        screens: t.screens,
        tubes: t.tubes,
        info: mg(t, e.mobile),
      },
      detail: t.detail,
      hotel: r,
      misses: t.misses,
    }
  );
}
var dg = `#f1f5ff`;
function fg(e, t = 6, n = 14) {
  for (;;) {
    let r = new Map();
    for (let n = 0; n < 32; n += 4)
      for (let i = 0; i < 32; i += 4) {
        let a = new Map();
        for (let t of e.fixtures) {
          let { x: e, z: r } = t.position;
          for (
            let o = Math.floor((e - t.range - n) / 32);
            o <= Math.floor((e + t.range - n) / 32);
            o++
          )
            for (
              let s = Math.floor((r - t.range - i) / 32);
              s <= Math.floor((r + t.range - i) / 32);
              s++
            ) {
              let c = Math.min(Math.max(e, n + o * 32), n + (o + 1) * 32),
                l = Math.min(Math.max(r, i + s * 32), i + (s + 1) * 32);
              if (Math.hypot(c - e, l - r) > t.range) continue;
              let u = Uh(o, s),
                d = a.get(u);
              d ? d.push(t) : a.set(u, [t]);
            }
        }
        for (let e of a.values())
          if (e.length > t)
            for (let t of e) t.color === dg && r.set(t, (r.get(t) ?? 0) + 1);
      }
    if (!r.size) return;
    let i = null,
      a = 0;
    for (let [e, t] of r) t > a && ((a = t), (i = e));
    i.range > n
      ? (i.range = Math.max(n, i.range - 2))
      : e.fixtures.splice(e.fixtures.indexOf(i), 1);
  }
}
function pg(e) {
  return ug(e).layout;
}
function mg(e, t) {
  let n = {},
    r = 0;
  for (let t of th) {
    let i = 0,
      a = new Set();
    for (let n of e.placements[t])
      ((i += eh[t].triangles[n.asset] ?? 0), a.add(n.asset));
    ((n[`${t}.instances`] = e.placements[t].length),
      (n[`${t}.prototypes`] = a.size),
      (n[`${t}.instanceTriangles`] = i),
      (r += i));
  }
  ((n.instanceTriangles = r),
    (n.mobile = +!!t),
    (n.fixtures = e.fixtures.length),
    (n.screens = e.screens.length));
  for (let [t, r] of Object.entries(e.rejected)) n[t] = r;
  return n;
}
function hg(e) {
  let t = bp(e, 2);
  return (n) => {
    let r = e.path.wrap(n);
    return t[Math.min(t.length - 1, Math.max(0, Math.round(r / 2)))];
  };
}
function gg(e) {
  return e < 30
    ? 1
    : e < 60
      ? 1 + ((e - 30) / 30) * 0.25
      : Math.min(1.55, 1.25 + ((e - 60) / 50) * 0.3);
}
function _g(e, t, n) {
  let r = [],
    i = e.path.length,
    a = 0;
  for (; a < i - 0.5;) {
    let o = Math.abs(e.path.curvatureAt(a + Math.min(t, 10))),
      s = o > 1e-4 ? Math.sqrt(3.2 / o) : t,
      c = Math.max(4, Math.min(t, Math.floor(s / 2) * 2));
    (a + c > i && (c = i - a),
      !n(a) && !n(a + c / 2) && !n(a + c) && r.push({ s0: a, s1: a + c }),
      (a += c));
  }
  return r;
}
function vg(e, t, n, r, i) {
  let a = e.path.pointAt(n),
    o = e.path.pointAt(r),
    s = new g(o.x - a.x, o.y - a.y, o.z - a.z),
    c = s.length();
  s.normalize();
  let l = new g(...t((n + r) / 2).right);
  l.addScaledVector(s, -l.dot(s)).normalize();
  let u = new g().crossVectors(s, l).normalize();
  return Ch(
    [a.x, a.y, a.z],
    l.toArray(),
    u.toArray(),
    s.toArray(),
    1,
    1,
    c / i,
  );
}
function yg(e, t) {
  return Kh(e, t);
}
