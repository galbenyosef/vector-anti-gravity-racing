// assets__game-CsnOSIff 74 — mul
// Lines 31465-31529 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function dx(e, t) {
  for (let n = e; n; n = n.parent) if (ux(n) === t) return !0;
  return !1;
}
function fx(e) {
  for (let t = e; t; t = t.parent) {
    let e = /^Cradle (?:emitter|lights) (\d)$/.exec(ux(t));
    if (e) return Number(e[1]);
  }
  return null;
}
function px(e, t, n, r, a, o) {
  let s = new i({ name: e.name, side: e.side });
  ((s.fog = !1),
    a &&
      ((s.polygonOffset = !0),
      (s.polygonOffsetFactor = -1),
      (s.polygonOffsetUnits = -4)));
  let c = q(e.color.r, e.color.g, e.color.b),
    l = e.map ? R(e.map).rgb.mul(c) : c,
    u = R(e.aoMap, X(1)).rgb.pow(q(2.2)).mul(6).mul(o.light),
    d = e.roughnessMap ? R(e.roughnessMap).g.mul(e.roughness) : B(e.roughness),
    f = e.metalnessMap ? R(e.metalnessMap).b.mul(e.metalness) : B(e.metalness),
    p = l.mul(u).mul(B(1).sub(f)),
    m = Ci.dot(Ji).clamp(0, 1),
    h = B(1).sub(m).pow(5);
  if (r) {
    let e = r.level(d.mul(9).add(1.2)).rgb,
      t = B(1).sub(d).pow(2);
    p = p.add(
      e
        .mul(J(0.1, 0.75, h))
        .mul(t)
        .mul(o.mirror),
    );
  } else if (t && n.specular) {
    let e = J(q(0.04), l, f),
      n = e.add(q(1).sub(e).mul(h)),
      r = u.dot(cx).mul(0.6).clamp(0, 1),
      i = ti(t, Sr, d);
    p = p.add(i.mul(n).mul(r).mul(o.sheen));
  }
  return ((s.colorNode = p), s);
}
function mx(e) {
  let t = new i({ name: e.name, side: e.side });
  return ((t.fog = !1), (t.colorNode = W(e.color).mul(1.6)), t);
}
async function hx(e, t, n) {
  let [r, i] = await Promise.all([
      Ja(ix, n.anisotropy),
      Di(ax).catch(() => null),
    ]),
    a = null;
  if (i) {
    let t = new Ut(e);
    try {
      a = t.fromEquirectangular(i.texture);
    } finally {
      (t.dispose(), i.texture.dispose());
    }
  }
  let o = r.scene;
  return ((o.name = `Launch bay`), new lx(o, a, t, n));
}
