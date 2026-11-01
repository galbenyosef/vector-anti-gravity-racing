// assets__game-D43Oxqny 36 — math
// Lines 10556-10590 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function wp(e) {
  let t = dp().lines.get(Sp.line);
  if (!Cp) {
    let e = [],
      n = [],
      r = 0;
    for (let i = 2e3; i <= 2900; i += 4) {
      let a = Jf(i),
        o = Math.max(r, t.path.nearestS(a.x, a.y, a.z, !0));
      (e.push(i), n.push(o), (r = o));
    }
    Cp = { d: new Float64Array(e), s: new Float64Array(n) };
  }
  let { d: n, s: r } = Cp,
    i = Math.min(n[n.length - 1], Math.max(n[0], e)),
    a = Math.min(n.length - 2, Math.floor((i - n[0]) / 4)),
    o = (i - n[a]) / (n[a + 1] - n[a]);
  return r[a] + (r[a + 1] - r[a]) * o;
}
function Tp(e, t) {
  return { s: wp(e - Sp.behind), speed: Math.max(0, t) + Sp.launch, done: !1 };
}
function Ep(e, t) {
  if (e.done) return e;
  let n = dp().lines.get(Sp.line),
    r = e.speed + (Sp.speed - e.speed) * (1 - Math.exp(-t / Sp.ease)),
    i = e.s + ((e.speed + r) / 2) * t;
  return { s: i, speed: r, done: i >= n.path.length - 20 };
}
function Dp(e, t) {
  let n = Sp.trigger * Zd,
    r = ((e % Zd) + Zd) % Zd,
    i = ((t % Zd) + Zd) % Zd;
  return r < n && i >= n && i - r < Zd / 2;
}
