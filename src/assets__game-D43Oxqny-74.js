// assets__game-D43Oxqny 74 — mul
// Lines 31604-31668 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Cx(e, t) {
  for (let n = e; n; n = n.parent) if (Sx(n) === t) return !0;
  return !1;
}
function wx(e) {
  for (let t = e; t; t = t.parent) {
    let e = /^Cradle (?:emitter|lights) (\d)$/.exec(Sx(t));
    if (e) return Number(e[1]);
  }
  return null;
}
function Tx(e, t, n, r, i, a) {
  let o = new At({ name: e.name, side: e.side });
  ((o.fog = !1),
    i &&
      ((o.polygonOffset = !0),
      (o.polygonOffsetFactor = -1),
      (o.polygonOffsetUnits = -4)));
  let s = J(e.color.r, e.color.g, e.color.b),
    c = e.map ? z(e.map).rgb.mul(s) : s,
    l = z(e.aoMap, X(1)).rgb.pow(J(2.2)).mul(6).mul(a.light),
    u = e.roughnessMap ? z(e.roughnessMap).g.mul(e.roughness) : V(e.roughness),
    d = e.metalnessMap ? z(e.metalnessMap).b.mul(e.metalness) : V(e.metalness),
    f = c.mul(l).mul(V(1).sub(d)),
    p = wi.dot(Yi).clamp(0, 1),
    m = V(1).sub(p).pow(5);
  if (r) {
    let e = r.level(u.mul(9).add(1.2)).rgb,
      t = V(1).sub(u).pow(2);
    f = f.add(
      e
        .mul(Y(0.1, 0.75, m))
        .mul(t)
        .mul(a.mirror),
    );
  } else if (t && n.specular) {
    let e = Y(J(0.04), c, d),
      n = e.add(J(1).sub(e).mul(m)),
      r = l.dot(bx).mul(0.6).clamp(0, 1),
      i = ti(t, Sr, u);
    f = f.add(i.mul(n).mul(r).mul(a.sheen));
  }
  return ((o.colorNode = f), o);
}
function Ex(e) {
  let t = new At({ name: e.name, side: e.side });
  return ((t.fog = !1), (t.colorNode = G(e.color).mul(1.6)), t);
}
async function Dx(e, t, n) {
  let [r, i] = await Promise.all([
      Ya(gx, n.anisotropy),
      Oi(_x).catch(() => null),
    ]),
    a = null;
  if (i) {
    let t = new ut(e);
    try {
      a = t.fromEquirectangular(i.texture);
    } finally {
      (t.dispose(), i.texture.dispose());
    }
  }
  let o = r.scene;
  return ((o.name = `Launch bay`), new xx(o, a, t, n));
}
