// assets__game-CsnOSIff 64 — math
// Lines 28232-28296 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Hv = `liveryOffset`,
  Uv = { writes: 400, mobileWrites: 220, cpuMs: 0.35 },
  Wv = or,
  Gv = Wv.length,
  Kv = Math.PI * 2,
  qv = Math.PI / 180,
  Jv = 9.81,
  Yv = (e, t, n) => (e < t ? t : e > n ? n : e),
  Xv = (e) => {
    let t = Yv(e, 0, 1);
    return t * t * (3 - 2 * t);
  },
  Zv = (e, t, n) => e + (t - e) * n,
  Qv = (e, t) => ((e % t) + t) % t;
function $v(e, t, n) {
  let r = Qv(t - e, Kv);
  return (r > Math.PI && (r -= Kv), e + r * n);
}
function ey(e, t = 0, n = 0) {
  let r =
    Math.imul(e + 2654435769, 2246822507) ^
    Math.imul(t + 2135587861, 3266489909);
  return (
    (r = Math.imul(
      r ^ (r >>> 15) ^ Math.imul(n + 374761393, 668265263),
      739982445,
    )),
    (r ^= r >>> 13),
    (r = Math.imul(r, 695872825)),
    (r ^= r >>> 16),
    (r >>> 0) / 4294967296
  );
}
function ty(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t = Math.imul(t ^ e.charCodeAt(n), 16777619);
  return t >>> 0;
}
function ny(e, t, n) {
  let r = t / n,
    i = 0.5 * t * r;
  return 2 * i >= e ? 2 * Math.sqrt(e / n) : 2 * r + (e - 2 * i) / t;
}
function ry(e, t, n, r, i) {
  let a = t / n,
    o = 0.5 * t * a,
    s,
    c,
    l;
  if (
    (2 * o >= e
      ? ((s = Math.sqrt(e / n)), (c = 2 * s), (l = n * s))
      : ((s = a), (c = 2 * a + (e - 2 * o) / t), (l = t)),
    r <= 0)
  )
    ((i.s = 0), (i.v = 0), (i.a = 0));
  else if (r >= c) ((i.s = e), (i.v = 0), (i.a = 0));
  else if (r < s) ((i.s = 0.5 * n * r * r), (i.v = n * r), (i.a = n));
  else if (r > c - s) {
    let t = c - r;
    ((i.s = e - 0.5 * n * t * t), (i.v = n * t), (i.a = -n));
  } else ((i.s = 0.5 * l * s + l * (r - s)), (i.v = l), (i.a = 0));
  return i;
}
