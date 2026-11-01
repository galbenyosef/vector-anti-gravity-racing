// assets__game-D43Oxqny 41 — math
// Lines 12860-12864 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function hm(e, t, n) {
  let r = Math.cos(t),
    i = Math.sin(t);
  return [e[0] + n[0] * r + n[2] * i, e[1] + n[1], e[2] - n[0] * i + n[2] * r];
}
