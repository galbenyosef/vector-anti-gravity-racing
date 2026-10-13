// assets__game-CsnOSIff 83 — intensity
// Lines 33807-33833 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function pS(e) {
  let t = new URLSearchParams(e),
    n = t.get(`ao`),
    r = (e, [n, r]) => {
      let i = Number(t.get(e));
      return t.has(e) && Number.isFinite(i) ? s.clamp(i, n, r) : void 0;
    },
    { limits: i } = dS;
  return {
    quality: n && fS.includes(n) ? n : dS.quality,
    intensity: r(`aoIntensity`, i.intensity) ?? dS.intensity,
    radius: r(`aoRadius`, i.radius) ?? dS.radius,
  };
}
var mS = new b(),
  hS;
function gS(e) {
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
