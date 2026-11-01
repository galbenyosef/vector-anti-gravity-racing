// assets__game-D43Oxqny 52 — role
// Lines 21523-21824 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Yg(e) {
  let { b: t, mobile: n } = e,
    r = mh.polygon,
    i = hh,
    a = Th(i.b[0] - i.a[0], i.b[2] - i.a[2]);
  for (let [e, r, o] of [
    [i.a, a, `gondola-terminal`],
    [i.b, a + Math.PI, `gondola-terminal`],
    [i.tower, a, `gondola-tower`],
  ])
    t.place(`transit`, n ? `${o}-lod` : o, $(e[0], e[1], e[2], r), {
      role: `ground`,
      margin: 10,
      group: `gondola`,
    });
  let o = 0;
  for (let e = 0; e < r.length && o < 30; e++) {
    let [n, i] = r[e],
      [a, s] = r[(e + 1) % r.length],
      c = Math.hypot(a - n, s - i),
      l = Math.floor(c / 20),
      u = (a - n) / c,
      d = (s - i) / c,
      f = -d,
      p = u,
      m = (n + a) / 2,
      h = (i + s) / 2;
    jh(m + f * 3, h + p * 3, r) || ((f = -f), (p = -p));
    for (let e = 0; e < l && o < 30; e++) {
      let r = (e + 0.5) * 20 + (c - l * 20) / 2,
        a = n + u * r,
        s = i + d * r;
      t.place(`street`, `quay-edge`, $(a, Q, s, Th(f, p)), {
        role: `ground`,
        group: `quay`,
        margin: 4,
      }) && o++;
    }
  }
  let s = n ? `superyacht-lod` : `superyacht`,
    c = Fm.superyacht.length,
    l = 0;
  for (let r = 0; r < 3; r++) {
    let r = 700 + l;
    l += 21;
    let [i, a] = tg(r, -(oh + sh + 18)),
      o = eg(r),
      u = -o.rx,
      d = -o.rz,
      f = i + u * (c / 2 + 3),
      p = a + d * (c / 2 + 3),
      m = Math.atan2(-d, u),
      h = $(f, fh, p, m);
    t.place(`street`, s, h, {
      role: `ground`,
      group: `marina-water`,
      margin: 12,
      ignoreLines: [`marina`],
    }) &&
      !n &&
      wg(e, h, m, Fm.superyacht.crowdSlots.slots, 0.5);
  }
  let u = n ? `small-yacht-lod` : `small-yacht`,
    d = 0,
    f = 0,
    p = n ? 12 : 22;
  for (let r of [182, 236, 290])
    for (let i = 282; i <= 420 && !(d >= p); i += 20) {
      if (!qg(i, r, 6) || !qg(i, r + 22, 4)) continue;
      let a = $(i, fh, r, 0);
      if (
        t.place(`street`, `marina-pontoon`, a, {
          role: `ground`,
          group: `marina-water`,
          margin: 12,
        })
      ) {
        d++;
        for (let a of [-6, 0, 6]) {
          if (f >= 18 || e.random() < 0.18) continue;
          let o = $(i + a, fh, r + 2 + 9.5, -Math.PI / 2);
          t.place(`street`, u, o, {
            role: `ground`,
            group: `marina-water`,
            margin: 12,
            variant: Math.floor(e.random() * 8),
          }) &&
            (f++,
            !n &&
              e.random() < 0.4 &&
              wg(e, o, -Math.PI / 2, Fm[`small-yacht`].crowdSlots.slots, 0.6));
        }
      }
    }
  {
    let [r, i] = tg(860, -(oh + sh + 18 + 14)),
      a = rg(860) - Math.PI / 2,
      o = $(r, fh + 0.4, i, a);
    t.place(`street`, `dancing-fountain`, o, {
      role: `ground`,
      group: `marina-water`,
      margin: 12,
    }) && Wg(e, o, Fm[`dancing-fountain`].jets.list, n ? 0.5 : 1);
  }
  let m = 0,
    h = a_(
      e,
      `venue`,
      `fan-zone-stage`,
      [[350, 92]],
      (e, t) => $(e, Q, t, 0),
      { role: `ground`, margin: 12 },
      20,
    );
  if (
    ((h ||=
      ((m = Math.PI / 2),
      a_(
        e,
        `venue`,
        `fan-zone-stage`,
        [[232, 222]],
        (e, t) => $(e, Q, t, m),
        { role: `ground`, margin: 12 },
        45,
      ))),
    h)
  ) {
    let r = Qm[`fan-zone-stage`];
    Tg(
      e,
      h,
      r.backdrop.centre,
      m,
      r.backdrop.size[0],
      r.backdrop.size[1],
      `board`,
    );
    for (let t of r.screenMounts) Tg(e, h, t, m, 5, 8, `board`);
    let [i, , a] = Eh(h, [0, 0, 18]);
    if (!n)
      for (let n = 0; n < 70; n++) {
        let n = i - 6 + e.random() * 12,
          r = a - 17 + e.random() * 34;
        t.add(`venue`, `crowd-figure`, $(n, Q, r, -m + (e.random() - 0.5)), {
          role: `attached`,
          variant: Math.floor(e.random() * 16),
        });
      }
  }
  let g = Th(0.35, 0.94),
    _ = a_(
      e,
      `venue`,
      `giant-screen`,
      [
        [408, 96],
        [250, 128],
      ],
      (e, t) => $(e, Q, t, g),
      { role: `ground`, margin: 12 },
      30,
    );
  _ && Tg(e, _, [0, 11, 0], g, 40, 12, `giant`);
  let v = $(268, Q, 166, Math.PI / 2);
  t.place(`venue`, `bandstand-pavilion`, v, { role: `ground`, margin: 12 }) &&
    wg(e, v, Math.PI / 2, Qm[`bandstand-pavilion`].crowdSlots, 1);
  let y = $(292, Q, 90, 0);
  (t.place(
    `venue`,
    n ? `hospitality-pavilion-lod` : `hospitality-pavilion`,
    y,
    { role: `ground`, margin: 12 },
  ) &&
    wg(
      e,
      y,
      0,
      Qm[`hospitality-pavilion`].crowdSlots,
      0.5,
      `crowd-figure-seated`,
    ),
    t.place(`street`, `taxi-stop`, $(420, Q, 104, Math.PI), {
      role: `ground`,
      margin: 6,
    }));
  for (let t of [585, 640]) Hg(e, t, 0, 8);
  let b = n ? `sail-residence-lod` : `sail-residence`,
    x = Xg.sun,
    S = 0;
  sun: for (let n of [0, 10, 20, -10, 30])
    for (let r of [0, 8, -8, 16]) {
      let i = $(
        x.x + x.px * r + x.sx * n,
        Q,
        x.z + x.pz * r + x.sz * n,
        x.yaw,
        1,
        x.scaleY,
        1,
      );
      if (t.place(`skyline`, b, i, { role: `ground` })) {
        (S++, Zg(e, b, i));
        break sun;
      }
    }
  for (let n of [690, 790, 890, 990, 610]) {
    if (S >= 4) break;
    let r = Xg.shapes[S],
      i = !1;
    for (let a of [52, 64, 78, 92, 110, 130])
      for (let o of [0, 20, -20, 40, -40]) {
        if (i) break;
        let s = n + o,
          [c, l] = tg(s, oh + sh + a),
          u = $(c, Q, l, ng(s, 1) + r.twist * uh, 1, r.scaleY, 1);
        t.place(`skyline`, b, u, { role: `ground` }) &&
          (S++, Zg(e, b, u), (i = !0));
      }
  }
}
var Xg = (() => {
  let e = new p(Zo.x, Zo.z).normalize(),
    t = new p(e.y, -e.x);
  return {
    sun: {
      x: t.x * 524 + e.x * 125,
      z: t.y * 524 + e.y * 125,
      sx: e.x,
      sz: e.y,
      px: t.x,
      pz: t.y,
      yaw: Th(-e.x, -e.y),
      scaleY: 1.1,
    },
    shapes: [
      { scaleY: 1.15, twist: 0 },
      { scaleY: 0.82, twist: 12 },
      { scaleY: 1, twist: -9 },
      { scaleY: 0.92, twist: 16 },
    ],
  };
})();
function Zg(e, t, n) {
  let r = Dm[t],
    i = Oh(n, r);
  e.towers.push({
    placement: e.b.placements.skyline[e.b.placements.skyline.length - 1],
    x: i.cx,
    z: i.cz,
    radius: Math.min(i.hx, i.hz),
    top: i.y1,
    yaw: Math.atan2(-i.uz, i.ux),
    asset: t,
  });
}
function Qg(e) {
  let { b: t, mobile: n } = e,
    [r, i] = Df.centre,
    a = Mp[`vertiport-crown`],
    o = Df.crown - a.deckHeight - 0.6,
    s = Am[`diagrid-office`],
    c = (o - Q) / (s.height - 2.5),
    l = a.drumRadius / 27.2,
    u = n ? `diagrid-office-lod` : `diagrid-office`;
  (t.place(`skyline`, u, $(r, Q, i, 0, l, c, l), {
    role: `ground`,
    group: `vertiport`,
    noLines: !0,
  }),
    t.place(
      `flying`,
      n ? `vertiport-crown-lod` : `vertiport-crown`,
      $(r, o, i, 0),
      { role: `air`, group: `vertiport`, noLines: !0 },
    ));
  for (let e of a.beacons)
    t.add(`skyline`, `aviation-beacon`, $(r + e[0], o + e[1], i + e[2]), {
      role: `attached`,
    });
  let d = e_(`VERTIPORT HELIX`);
  for (let e = 0; e < 10; e++) {
    let n = eg(d.from + 27 + e * 45 * uh * 68.7),
      r = -(oh + 0.5),
      i = [n.x + n.rx * r, n.y + 6, n.z + n.rz * r];
    t.fixture(i, `#dfeeff`, 380, 30, { axis: [n.rx, -0.35, n.rz], cos: 0.3 });
  }
}
function $g(e, t) {
  let n = e.from,
    r = 1 / 0;
  for (let i = e.from; i < e.to; i += 1) {
    let e = Math.abs(eg(i).x - t);
    e < r && ((r = e), (n = i));
  }
  return n;
}
function e_(e) {
  let t = D,
    n = t.findIndex((t) => t.name === e);
  return { from: t[n].from * ah, to: (t[n + 1]?.from ?? 1) * ah };
}
