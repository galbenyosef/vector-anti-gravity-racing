// assets__game-CsnOSIff 36 — math
// Lines 10520-10554 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function Cp(e) {
  let t = up().lines.get(xp.line);
  if (!Sp) {
    let e = [],
      n = [],
      r = 0;
    for (let i = 2e3; i <= 2900; i += 4) {
      let a = qf(i),
        o = Math.max(r, t.path.nearestS(a.x, a.y, a.z, !0));
      (e.push(i), n.push(o), (r = o));
    }
    Sp = { d: new Float64Array(e), s: new Float64Array(n) };
  }
  let { d: n, s: r } = Sp,
    i = Math.min(n[n.length - 1], Math.max(n[0], e)),
    a = Math.min(n.length - 2, Math.floor((i - n[0]) / 4)),
    o = (i - n[a]) / (n[a + 1] - n[a]);
  return r[a] + (r[a + 1] - r[a]) * o;
}
function wp(e, t) {
  return { s: Cp(e - xp.behind), speed: Math.max(0, t) + xp.launch, done: !1 };
}
function Tp(e, t) {
  if (e.done) return e;
  let n = up().lines.get(xp.line),
    r = e.speed + (xp.speed - e.speed) * (1 - Math.exp(-t / xp.ease)),
    i = e.s + ((e.speed + r) / 2) * t;
  return { s: i, speed: r, done: i >= n.path.length - 20 };
}
function Ep(e, t) {
  let n = xp.trigger * Xd,
    r = ((e % Xd) + Xd) % Xd,
    i = ((t % Xd) + Xd) % Xd;
  return r < n && i >= n && i - r < Xd / 2;
}
