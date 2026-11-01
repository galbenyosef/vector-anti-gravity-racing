// assets__game-D43Oxqny 43 — math
// Lines 17311-17323 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Vm(e) {
  return e.asset === `fountain-arc` ? `fountain-arc` : `fountain-jet`;
}
function Hm(e, t, n = 1) {
  let r = Math.max(0.001, t),
    i = Vm(e) === `fountain-arc` ? (e.reach ?? 1) * r : n;
  return [
    Lm(e.p[0], e.p[1], e.p[2]),
    zm(`y`, e.yaw * Bm),
    zm(`z`, -e.tilt * Bm),
    Rm(i, Math.max(0.001, e.height * r), n),
  ].reduce(Im);
}
