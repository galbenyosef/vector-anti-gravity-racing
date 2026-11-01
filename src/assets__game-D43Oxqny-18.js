// assets__game-D43Oxqny 18 — math
// Lines 5418-5490 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Al(e, t, n, r = 512) {
  let i = n ? Math.min(1, r / Math.max(e, t)) : 1;
  return {
    width: Math.max(1, Math.round(e * i)),
    height: Math.max(1, Math.round(t * i)),
  };
}
var jl = { lane: 19.5, springing: 1.2, crown: 14.5 };
function Ml(e) {
  let t = Math.PI * (1 - e);
  return {
    lane: Math.cos(t) * jl.lane,
    height: jl.springing + Math.sin(t) ** 0.85 * (jl.crown - jl.springing),
  };
}
function Nl(e, t, n, r) {
  let i = document.createElement(`canvas`),
    a = Al(e, t, n);
  ((i.width = a.width), (i.height = a.height));
  let o = i.getContext(`2d`);
  (o.scale(a.width / e, a.height / t), r(o));
  let s = new Zn(i);
  return ((s.colorSpace = Ee), (s.anisotropy = 8), s);
}
function Pl(e, t, n, r, i, a) {
  let o = Math.max(1, Math.ceil((t - e) / i)),
    s = [],
    c = [],
    l = [];
  for (let i = 0; i <= o; i++) {
    let u = F.lerp(e, t, i / o);
    for (let [t, i] of n.entries()) {
      let o = L(u, i, r(u, i));
      (s.push(o.x, o.y, o.z), c.push(t / (n.length - 1), (u - e) * a));
    }
    if (i < o)
      for (let e = 0; e < n.length - 1; e++) {
        let t = i * n.length + e,
          r = t + n.length;
        l.push(t, r, t + 1, t + 1, r, r + 1);
      }
  }
  let u = new Me();
  return (
    u.setAttribute(`position`, new N(s, 3)),
    u.setAttribute(`uv`, new N(c, 2)),
    u.setIndex(l),
    u.computeVertexNormals(),
    u
  );
}
function Fl(e, t, n, r) {
  let i = pe(e),
    a = [
      [t[0], n],
      [t[1], n],
      [t[1], r],
      [t[0], r],
    ].map(([e, t]) =>
      i.position.clone().addScaledVector(i.right, e).addScaledVector(i.up, t),
    ),
    o = new Me().setFromPoints(a);
  return (
    o.setAttribute(`uv`, new N([0, 0, 1, 0, 1, 1, 0, 1], 2)),
    o.setIndex([0, 1, 2, 0, 2, 3]),
    o.computeVertexNormals(),
    o
  );
}
function Il(e, t) {
  let n = (t / v - e.from) / (e.to - e.from);
  return F.smoothstep(Math.min(n, 1 - n), 0, 0.14);
}
