// assets__game-D43Oxqny 27 — count
// Lines 8044-8110 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function wd(e, t) {
  let n = xd(e),
    { supports: r, pylonSection: i } = hd.massDriver,
    a = e.scale ?? 1,
    o = [];
  for (let s of r) {
    let r = new A(...s).applyMatrix4(n),
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
var Td = new Set([
    `pad-light`,
    `cable-spool`,
    `ltv-rover`,
    `boulder-a`,
    `boulder-b`,
    `boulder-c-lod`,
    `boulder-d-lod`,
  ]),
  Ed = new Set([`boulder-b`, `boulder-field`]),
  Dd = { "boulder-c": `boulder-c-lod`, "boulder-d": `boulder-d-lod` },
  Od = new Set([
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
  kd = {
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
  Ad = 750,
  jd = 1e5,
  Md = 120,
  Nd = -12,
  Pd = [120, 260],
  Fd = (8 * Math.PI) / hd.massDriver.end[0];
function Id(e) {
  return (e.index?.count ?? e.attributes.position.count) / 3;
}
var Ld = (e) => e.map((e) => e.toFixed(2)).join(`,`);
