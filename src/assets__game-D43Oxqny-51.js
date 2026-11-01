// assets__game-D43Oxqny 51 — math
// Lines 21359-21522 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Vg(e) {
  let { b: t, mobile: n } = e,
    r = Math.PI / 2,
    i = -61.6,
    a = n ? `crown-stand-bay-lod` : `crown-stand-bay`,
    o = n ? `crown-stand-end-lod` : `crown-stand-end`,
    s = 200;
  for (let o of [125, 155]) {
    let c = $(i, Q, o, r);
    if (
      t.place(`venue`, a, c, {
        role: `ground`,
        group: `west-stand`,
        margin: 12,
      })
    ) {
      for (let t of Qm[`crown-stand-bay`].flagMasts) Dg(e, Eh(c, t), s++);
      Cg(
        e,
        c,
        Qm[`crown-stand-bay`].seatRows,
        r,
        n ? { figures: 0, cards: 120 } : { figures: 30, cards: 260 },
      );
    }
  }
  for (let e of [104, 176]) {
    let n = $(i, Q, e, r);
    t.place(`venue`, o, n, { role: `ground`, group: `west-stand`, margin: 12 });
  }
  let c = $(25, Q, 157, -Math.PI / 2);
  (t.place(`venue`, `podium-stage`, c, { role: `ground`, margin: 12 }),
    wg(e, c, -Math.PI / 2, Qm[`podium-stage`].crowdSlots, 1));
  for (let n of Qm[`podium-stage`].screenMounts) {
    let r = $(...Eh(c, n), -Math.PI / 2);
    t.place(`venue`, `giant-screen`, r, { role: `ground`, margin: 12 }) &&
      Tg(e, r, [0, 11, 0], -Math.PI / 2, 40, 12, `giant`);
  }
  if (!n)
    for (let n = 0; n < 90; n++) {
      let n = -34 + e.random() * 40,
        r = 136 + e.random() * 46;
      t.add(
        `venue`,
        `crowd-figure`,
        $(n, Q, r, -Math.PI / 2 + (e.random() - 0.5)),
        { role: `attached`, variant: Math.floor(e.random() * 16) },
      );
    }
  let l = n ? `hospitality-pavilion-lod` : `hospitality-pavilion`;
  for (let n of [112, 146]) {
    let r = $(68, Q, n, -Math.PI / 2);
    t.place(`venue`, l, r, { role: `ground`, margin: 12 }) &&
      wg(
        e,
        r,
        -Math.PI / 2,
        Qm[`hospitality-pavilion`].crowdSlots,
        0.5,
        `crowd-figure-seated`,
      );
  }
  let u = $(-20, Q, 202, 0);
  (t.place(`venue`, `bandstand-pavilion`, u, { role: `ground`, margin: 12 }) &&
    wg(e, u, 0, Qm[`bandstand-pavilion`].crowdSlots, 1),
    t.place(`street`, `meridian-line-sculpture`, $(55, Q, 195, 0), {
      role: `ground`,
      margin: 12,
    }),
    Ug(e, -14, 118, `plaza`),
    n || Ug(e, 12, 206, `plaza`));
  for (let e = -36; e <= 84; e += 24)
    for (let n = 96; n <= 216; n += 24)
      t.place(`street`, `plaza-paving`, $(e, Q, n, 0), {
        role: `attached`,
        margin: 4,
        noLines: !0,
      });
  for (let [e, n, r] of [
    [60, 92, 0],
    [-14, 228, Math.PI],
    [40, 228, Math.PI],
    [76, 182, -Math.PI / 2],
  ])
    t.place(`street`, `plaza-steps`, $(e, Q, n, r), {
      role: `ground`,
      margin: 6,
    });
  Hg(e, 5695, 3.6, 4);
}
function Hg(e, t, n, r) {
  let i = eg(t),
    a = (oh + sh) * Math.abs(Math.sin(i.f.bank)),
    o = Qm[`sponsor-arch`].clearance,
    s = Math.max(1, (ch + a + 0.4) / o),
    c = $(i.x + i.rx * n, i.y, i.z + i.rz * n, rg(t), s);
  return e.b.place(`venue`, `sponsor-arch`, c, {
    role: `air`,
    margin: 0,
    variant: r,
  });
}
function Ug(e, t, n, r) {
  let { b: i, mobile: a } = e,
    o = $(t, Q, n, 0);
  i.place(`street`, `plaza-fountain`, o, {
    role: `ground`,
    group: r,
    margin: 12,
  }) && Wg(e, o, Fm[`plaza-fountain`].jets.list, a ? 0.5 : 1);
}
function Wg(e, t, n, r) {
  n.forEach((n, i) => {
    if (r < 1 && i % Math.round(1 / r) !== 0) return;
    let a = new k().fromArray(Hm(n, 0.6));
    e.b.add(`street`, Vm(n), t.clone().multiply(a), { role: `attached` });
  });
}
var Gg = null;
function Kg() {
  if (Gg) return Gg;
  let e = ih.frame(Ke[0].from * ah),
    t = [e.position.x, e.position.y, e.position.z],
    n = Math.atan2(-e.tangent.z, e.tangent.x),
    r = $(t[0], t[1], t[2], n),
    i = r.clone().invert();
  return (
    (Gg = { origin: t, yaw: n, matrix: r, toLocal: (e) => Eh(i, e) }),
    Gg
  );
}
function qg(e, t, n = 0) {
  let r = mh.polygon;
  if (!jh(e, t, r)) return !1;
  if (n <= 0) return !0;
  for (let i = 0; i < r.length; i++) {
    let [a, o] = r[i],
      [s, c] = r[(i + 1) % r.length],
      l = s - a,
      u = c - o,
      d = Math.max(
        0,
        Math.min(1, ((e - a) * l + (t - o) * u) / (l * l + u * u)),
      );
    if (Math.hypot(e - a - l * d, t - o - u * d) < n) return !1;
  }
  return !0;
}
function Jg(e, t, n) {
  let r = mh.polygon;
  if (jh(e, t, r)) return !0;
  for (let i = 0; i < r.length; i++) {
    let [a, o] = r[i],
      [s, c] = r[(i + 1) % r.length],
      l = s - a,
      u = c - o,
      d = Math.max(
        0,
        Math.min(1, ((e - a) * l + (t - o) * u) / (l * l + u * u)),
      );
    if (Math.hypot(e - a - l * d, t - o - u * d) < n) return !0;
  }
  return !1;
}
