// assets__game-CsnOSIff 18 — math
// Lines 5383-5455 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function kl(e, t, n, r = 512) {
  let i = n ? Math.min(1, r / Math.max(e, t)) : 1;
  return {
    width: Math.max(1, Math.round(e * i)),
    height: Math.max(1, Math.round(t * i)),
  };
}
var Al = { lane: 19.5, springing: 1.2, crown: 14.5 };
function jl(e) {
  let t = Math.PI * (1 - e);
  return {
    lane: Math.cos(t) * Al.lane,
    height: Al.springing + Math.sin(t) ** 0.85 * (Al.crown - Al.springing),
  };
}
function Ml(e, t, n, r) {
  let i = document.createElement(`canvas`),
    a = kl(e, t, n);
  ((i.width = a.width), (i.height = a.height));
  let o = i.getContext(`2d`);
  (o.scale(a.width / e, a.height / t), r(o));
  let s = new p(i);
  return ((s.colorSpace = st), (s.anisotropy = 8), s);
}
function Nl(e, t, n, r, i, a) {
  let o = Math.max(1, Math.ceil((t - e) / i)),
    c = [],
    l = [],
    u = [];
  for (let i = 0; i <= o; i++) {
    let d = s.lerp(e, t, i / o);
    for (let [t, i] of n.entries()) {
      let o = P(d, i, r(d, i));
      (c.push(o.x, o.y, o.z), l.push(t / (n.length - 1), (d - e) * a));
    }
    if (i < o)
      for (let e = 0; e < n.length - 1; e++) {
        let t = i * n.length + e,
          r = t + n.length;
        u.push(t, r, t + 1, t + 1, r, r + 1);
      }
  }
  let d = new tr();
  return (
    d.setAttribute(`position`, new ct(c, 3)),
    d.setAttribute(`uv`, new ct(l, 2)),
    d.setIndex(u),
    d.computeVertexNormals(),
    d
  );
}
function Pl(e, t, n, r) {
  let i = A(e),
    a = [
      [t[0], n],
      [t[1], n],
      [t[1], r],
      [t[0], r],
    ].map(([e, t]) =>
      i.position.clone().addScaledVector(i.right, e).addScaledVector(i.up, t),
    ),
    o = new tr().setFromPoints(a);
  return (
    o.setAttribute(`uv`, new ct([0, 0, 1, 0, 1, 1, 0, 1], 2)),
    o.setIndex([0, 1, 2, 0, 2, 3]),
    o.computeVertexNormals(),
    o
  );
}
function Fl(e, t) {
  let n = (t / F - e.from) / (e.to - e.from);
  return s.smoothstep(Math.min(n, 1 - n), 0, 0.14);
}
