// assets__game-CsnOSIff 43 — math
// Lines 17276-17288 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function Bm(e) {
  return e.asset === `fountain-arc` ? `fountain-arc` : `fountain-jet`;
}
function Vm(e, t, n = 1) {
  let r = Math.max(0.001, t),
    i = Bm(e) === `fountain-arc` ? (e.reach ?? 1) * r : n;
  return [
    Im(e.p[0], e.p[1], e.p[2]),
    Rm(`y`, e.yaw * zm),
    Rm(`z`, -e.tilt * zm),
    Lm(i, Math.max(0.001, e.height * r), n),
  ].reduce(Fm);
}
