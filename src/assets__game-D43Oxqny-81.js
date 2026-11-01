// assets__game-D43Oxqny 81 — orm
// Lines 33471-33527 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function gS(e, t = !1, n = !1, r = !1) {
  let i = mS(t),
    a = hS(t),
    o = new I({
      name: `Layered composite racing deck`,
      map: i.map,
      normalMap: i.normalMap,
      roughnessMap: i.orm,
      metalnessMap: i.orm,
      aoMap: i.orm,
      aoMapIntensity: 0.45,
      metalness: 1,
      roughness: 1,
      emissive: e ? `#12213a` : `#000000`,
      emissiveIntensity: e ? 0.16 : 0,
    }),
    s = Ii(W.mul(0.055)).mul(0.5).add(0.5).clamp(),
    c = z(i.orm, X());
  ((o.colorNode = z(i.map).rgb.mul(
    Y(
      G(e ? `#8294b0` : n ? `#e0d4c1` : r ? `#dfe3e6` : `#d5dddd`),
      G(n ? `#fff6e6` : `#ffffff`),
      s,
    ),
  )),
    (o.roughnessNode = c.g
      .mul(e ? 0.8 : 1)
      .sub(s.mul(e ? 0.09 : 0.045))
      .clamp(0.28, 0.92)));
  let l = new I({
    name: `Machined crash barrier`,
    map: a.map,
    normalMap: a.normalMap,
    roughnessMap: a.orm,
    metalnessMap: a.orm,
    aoMap: a.orm,
    aoMapIntensity: 0.4,
    color: e ? `#637895` : `#e0e9eb`,
    roughness: e ? 0.8 : 1,
    metalness: 1,
    emissive: e ? `#0e1f38` : `#000000`,
    emissiveIntensity: e ? 0.25 : 0,
    side: 2,
  });
  (ga(l, _a.metal),
    r &&
      ((o.metalness = 0.3),
      (o.colorNode = o.colorNode.mul(yu(Ui, { maximum: 2, surge: 0.6 }))),
      (l.metalness = 0.4)));
  let u = l.clone();
  return (
    (u.name = `Tunnel maintenance panels`),
    u.color.set(e ? `#34455f` : `#536c83`),
    (u.roughness = 1.2),
    { road: o, wall: l, tunnel: u }
  );
}
