// assets__game-CsnOSIff 41 — math
// Lines 12825-12829 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function mm(e, t, n) {
  let r = Math.cos(t),
    i = Math.sin(t);
  return [e[0] + n[0] * r + n[2] * i, e[1] + n[1], e[2] - n[0] * i + n[2] * r];
}
