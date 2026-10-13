// assets__game-CsnOSIff 57 — math
// Lines 23048-23120 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function I_() {
  let e = [];
  for (let t of Rt)
    if (!t.glass)
      for (let [n, r] of [
        [t.from * F, 1],
        [t.to * F, -1],
      ]) {
        let t = Gn(n),
          i = Math.hypot(t.tangent.x, t.tangent.z) || 1,
          a = Math.hypot(t.right.x, t.right.z) || 1,
          o = j(n),
          s = t.position.clone(),
          c = t.right.clone(),
          l = t.up.clone(),
          u = F_;
        e.push({
          d: n,
          x: s.x,
          z: s.z,
          tx: (t.tangent.x / i) * r,
          tz: (t.tangent.z / i) * r,
          rx: t.right.x / a,
          rz: t.right.z / a,
          reach: o + 2 + k_.wall + 4,
          skip: [n - 8, n + 8],
          open: (e, t) => {
            let n = e - s.x,
              r = t - s.z,
              i = n * c.x + r * c.z,
              a = n * l.x + r * l.z,
              d = s.y + (u.underside - a) / l.y,
              f = s.y + (u.height - a) / l.y,
              p = o + u.wall;
            if (Math.abs(c.y) < 1e-6) {
              if (Math.abs(i) >= p) return null;
            } else {
              let e = s.y + (-p - i) / c.y,
                t = s.y + (p - i) / c.y;
              ((d = Math.max(d, Math.min(e, t))),
                (f = Math.min(f, Math.max(e, t))));
            }
            return f > d ? [d, f] : null;
          },
        });
      }
  return e;
}
function L_(e) {
  let t = e.getAttribute(`normal`);
  if (!t || !(t.array instanceof Float32Array)) return;
  let n = new Int8Array(t.count * 3);
  for (let e = 0; e < t.count * 3; e++)
    n[e] = Math.round(Math.max(-1, Math.min(1, t.array[e])) * 127);
  e.setAttribute(`normal`, new vt(n, 3, !0));
}
function R_() {
  let e = new ir(1.9, 1.05, 4.5);
  e.translate(0, 0.825, 0);
  let t = new ir(1.7, 0.62, 2.5);
  t.translate(0, 1.6600000000000001, -0.35);
  for (let [n, r] of [
    [e, 0],
    [t, 1],
  ])
    (n.deleteAttribute(`uv`),
      n.setAttribute(
        `carGlass`,
        new ct(new Float32Array(n.getAttribute(`position`).count).fill(r), 1),
      ));
  let n = ur([e, t]);
  return (e.dispose(), t.dispose(), n);
}
