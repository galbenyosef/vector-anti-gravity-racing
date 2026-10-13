// assets__game-CsnOSIff 27 — count
// Lines 8008-8074 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function Cd(e, t) {
  let n = bd(e),
    { supports: r, pylonSection: i } = md.massDriver,
    a = e.scale ?? 1,
    o = [];
  for (let s of r) {
    let r = new g(...s).applyMatrix4(n),
      c = t(r.x, r.z),
      l = r.y - c;
    l < 0.5 ||
      o.push({
        asset: `mass-driver-pylon`,
        position: [r.x, c, r.z],
        yaw: e.yaw,
        scale: a,
        scaleY: l / (i * a),
      });
  }
  return o;
}
var wd = new Set([
    `pad-light`,
    `cable-spool`,
    `ltv-rover`,
    `boulder-a`,
    `boulder-b`,
    `boulder-c-lod`,
    `boulder-d-lod`,
  ]),
  Td = new Set([`boulder-b`, `boulder-field`]),
  Ed = { "boulder-c": `boulder-c-lod`, "boulder-d": `boulder-d-lod` },
  Dd = new Set([
    `boulder-a`,
    `boulder-b`,
    `boulder-c`,
    `boulder-d`,
    `boulder-c-lod`,
    `boulder-d-lod`,
    `boulder-field`,
    `pad-light`,
    `cable-spool`,
    `ltv-rover`,
    `power-pylon`,
    `mass-driver-pylon`,
  ]),
  Od = {
    "Shackleton stainless": `metal`,
    "Shackleton MLI gold": `metal`,
    "Shackleton copper": `metal`,
    "Shackleton sintered regolith": `concrete`,
    "Shackleton sintered block": `concrete`,
    "Shackleton printed regolith": `concrete`,
    "Shackleton regolith rock": `concrete`,
    "Shackleton trim atlas": `mixed`,
    "Shackleton white hull": `paint`,
    "Shackleton frame": `paint`,
  },
  kd = 750,
  Ad = 1e5,
  jd = 120,
  Md = -12,
  Nd = [120, 260],
  Pd = (8 * Math.PI) / md.massDriver.end[0];
function Fd(e) {
  return (e.index?.count ?? e.attributes.position.count) / 3;
}
var Id = (e) => e.map((e) => e.toFixed(2)).join(`,`);
