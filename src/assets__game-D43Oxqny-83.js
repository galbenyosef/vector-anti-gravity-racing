// assets__game-D43Oxqny 83 — intensity
// Lines 33968-33994 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function TS(e) {
  let t = new URLSearchParams(e),
    n = t.get(`ao`),
    r = (e, [n, r]) => {
      let i = Number(t.get(e));
      return t.has(e) && Number.isFinite(i) ? F.clamp(i, n, r) : void 0;
    },
    { limits: i } = CS;
  return {
    quality: n && wS.includes(n) ? n : CS.quality,
    intensity: r(`aoIntensity`, i.intensity) ?? CS.intensity,
    radius: r(`aoRadius`, i.radius) ?? CS.radius,
  };
}
var ES = new p(),
  DS;
function OS(e) {
  let t = e;
  return (
    !e.transparent &&
    !!(
      t.isMeshStandardMaterial ||
      t.isMeshLambertMaterial ||
      t.isMeshPhongMaterial
    )
  );
}
