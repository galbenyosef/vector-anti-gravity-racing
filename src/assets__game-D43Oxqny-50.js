// assets__game-D43Oxqny 50 — math
// Lines 21027-21358 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function kg(e) {
  let { b: t, mobile: n } = e,
    r = Kg(),
    i = oh + Np.fence.lane,
    a = Qm[`crown-stand-bay`],
    o = -(i + a.fenceLine[0][2]),
    s = n ? `crown-stand-bay-lod` : `crown-stand-bay`,
    c = n ? `crown-stand-end-lod` : `crown-stand-end`,
    l = Array.from({ length: 10 }, (e, t) => -30 + 30 * t),
    u = 0;
  l.forEach((i, c) => {
    let l = $(i, Q, o, 0);
    t.place(`venue`, s, l, {
      role: `ground`,
      group: `crown-stand`,
      margin: 12,
    });
    let d = a.screenMounts[0];
    if ([1, 4, 9].includes(c)) {
      let n = $(...Eh(l, d), 0);
      Og(Eh(n, [0, 18, 0]), r) ||
        (t.add(`venue`, `giant-screen`, n, {
          role: `attached`,
          group: `crown-stand`,
        }),
        Tg(e, n, [0, 11, 0], 0, 40, 12, `giant`));
    }
    for (let t of a.flagMasts) {
      let n = Eh(l, t);
      Og([n[0], n[1] + 13, n[2]], r) || Dg(e, n, u++);
    }
    Cg(
      e,
      l,
      a.seatRows,
      0,
      n ? { figures: 0, cards: 150 } : { figures: 30, cards: 540 },
    );
  });
  for (let n of [-51, 261]) {
    let r = $(n, Q, o, 0);
    (t.place(`venue`, c, r, {
      role: `ground`,
      group: `crown-stand`,
      margin: 12,
    }),
      Dg(e, Eh(r, Qm[`crown-stand-end`].flagMasts[0]), u++),
      wg(e, r, 0, Qm[`crown-stand-end`].crowdSlots, 0.7));
  }
  let d = Pp,
    f = Qm[`pit-garage-pair`],
    p = Xm[`pit-garage-pair`].max[2],
    m = -d.forecourt[0] + p,
    h = n ? `pit-garage-pair-lod` : `pit-garage-pair`,
    g = [];
  for (let r = 0; r < d.garagePairs; r++) {
    let i = dh + d.firstPair + r * d.pairPitch;
    g.push(i);
    let a = $(i, Q, m, Math.PI);
    if (
      (t.place(`venue`, h, a, {
        role: `ground`,
        group: `pits`,
        margin: 12,
        variant: r,
      }),
      !n)
    )
      for (let [e, n] of f.craftStand.entries()) {
        let i = Eh(a, n);
        t.add(`venue`, `garage-display-craft`, $(i[0], i[1], i[2], Math.PI), {
          role: `attached`,
          variant: (r * 2 + e) % 8,
        });
      }
    let o = f.fixtureMounts[r % 2],
      s = Eh(a, o),
      c = Dh(a, [o[3], o[4], o[5]]);
    (t.fixture(s, fg, 300, 22, { axis: c.toArray(), cos: 0.35 }),
      wg(e, a, Math.PI, f.crowdSlots, 0.35));
    let l = $(i, Q, -d.wall[0] + Xm[`pit-wall-stand`].max[2], Math.PI);
    (t.add(`venue`, `pit-wall-stand`, l, {
      role: `attached`,
      group: `pits`,
      variant: r,
    }),
      wg(e, l, Math.PI, Qm[`pit-wall-stand`].crowdSlots, 1));
  }
  let _ = 34.3,
    v = [g[0] - _, g[g.length - 1] + _];
  for (let n of v) {
    let r = $(n, Q, m, Math.PI);
    if (
      t.place(`venue`, `pit-end-block`, r, {
        role: `ground`,
        group: `pits`,
        margin: 12,
      })
    )
      wg(e, r, Math.PI, Qm[`pit-end-block`].crowdSlots, 0.8);
    else {
      let n = $(-12, Q, 90, 0);
      t.place(`venue`, `pit-end-block`, n, { role: `ground`, margin: 12 }) &&
        wg(e, n, 0, Qm[`pit-end-block`].crowdSlots, 0.8);
    }
  }
  let y = $(
    dh,
    Q,
    m - Xm[`pit-garage-pair`].min[2] + 3 + Xm[`race-control-spire`].max[2],
    Math.PI,
  );
  t.place(`venue`, `race-control-spire`, y, { role: `ground`, margin: 12 });
  let b = Qm[`race-control-spire`].lapCounter;
  (Tg(e, y, b.centre, Math.PI, b.size[0], b.size[1], `board`),
    wg(e, y, Math.PI, Qm[`race-control-spire`].crowdSlots, 0.6));
  let x = eg(0);
  t.place(`venue`, `start-gantry`, $(x.x, x.y, x.z - 3.9, Math.PI / 2), {
    role: `air`,
    margin: 0,
  });
  for (let t of [-60, 300]) Hg(e, t, 3.6, 0);
  let S = eg(-100),
    C = $(S.x, Q, S.z, Math.PI / 2);
  t.place(`venue`, `crown-bridge`, C, { role: `air`, margin: 0 }) &&
    wg(e, C, Math.PI / 2, Qm[`crown-bridge`].crowdSlots, 0.6);
  let w = cg(300);
  [300, 200, 100].forEach((t, n) => sg(e, w - t, 1, n));
  for (let e of [60, 330]) {
    let [n, r] = tg(e, oh + sh + 7);
    t.place(`venue`, `tv-camera-platform`, $(n, Q, r, ng(e, 1)), {
      role: `ground`,
      margin: 4,
    });
  }
}
function Ag(e, t, n, r, i, a) {
  let { b: o, mobile: s } = e,
    c = s ? `bowl-stand-segment-lod` : `bowl-stand-segment`,
    l = Qm[`bowl-stand-segment`].seatArcs,
    u = eh(l),
    d = [...new Set(u.map((e) => e[1]))].sort((e, t) => e - t);
  for (let l of n) {
    let n = l * uh,
      f = Math.atan2(Math.cos(n), Math.sin(n)),
      p = $(t[0], Q, t[1], f);
    if (!o.place(`venue`, c, p, { role: `ground`, group: r, margin: 12 }))
      continue;
    if (i) {
      o.add(`venue`, `ring-screen-segment`, p, { role: `attached`, group: r });
      let t = Qm[`ring-screen-segment`].radius;
      Tg(e, p, [0, 28, t], f + Math.PI, 2 * t * Math.tan(7.5 * uh), 6, `ring`);
    }
    let m = 0,
      h = 0,
      g = 0;
    for (let t of u) {
      let n = Eh(p, t),
        r = f + t[3],
        i = t[1] === d[0];
      !s && i && h < a.seated
        ? (h++,
          o.add(`venue`, `crowd-figure-seated`, $(n[0], n[1], n[2], r), {
            role: `attached`,
            variant: Math.floor(e.random() * 16),
          }))
        : !s && t[1] === d[1] && m < a.figures
          ? (m++,
            o.add(`venue`, `crowd-figure`, $(n[0], n[1], n[2], r), {
              role: `attached`,
              variant: Math.floor(e.random() * 16),
            }))
          : g < a.cards &&
            e.random() < 0.5 &&
            (g++,
            o.add(`venue`, `crowd-card`, $(n[0], n[1], n[2], r), {
              role: `attached`,
              variant: Math.floor(e.random() * 16),
            }));
    }
  }
}
function jg(e) {
  let { b: t, mobile: n } = e;
  Ag(
    e,
    [440.2, 62.9],
    Array.from({ length: 8 }, (e, t) => -97.5 + 15 * t),
    `t1-bowl`,
    !0,
    n
      ? { figures: 0, seated: 0, cards: 140 }
      : { figures: 10, seated: 22, cards: 420 },
  );
  for (let r of [318, 356]) {
    let i = $(r, Q, -50, 0),
      a = n ? `hospitality-pavilion-lod` : `hospitality-pavilion`;
    t.place(`venue`, a, i, { role: `ground`, margin: 12 }) &&
      wg(
        e,
        i,
        0,
        Qm[`hospitality-pavilion`].crowdSlots,
        0.5,
        `crowd-figure-seated`,
      );
  }
  let r = cg(300);
  apex: for (let e of [40, 25, 55, 70])
    for (let n of [5, 9, 13]) {
      let i = r + e,
        [a, o] = tg(i, -(oh + sh + n));
      if (
        t.place(`venue`, `tv-camera-platform`, $(a, Q, o, ng(i, -1)), {
          role: `ground`,
          margin: 3,
        })
      )
        break apex;
    }
  let i = 0;
  for (let e = 0; e <= 120 && i < (n ? 3 : 7); e += 15)
    for (let a of [14, 24]) {
      let [o, s] = tg(r + e, -(oh + sh + a)),
        c = n || a > 20 ? `plane-tree-lod` : `plane-tree`;
      t.place(`street`, c, $(o, Q, s, e * 0.37), {
        role: `ground`,
        margin: 5,
      }) && i++;
    }
  Rg(e, r, 1);
}
var Mg = oh + 2 + 4 + 0.4,
  Ng = { rise: 3, x: [-5.25, 5.25], z: [-2.4, 1.4], step: 0.4 },
  Pg = {
    inner: oh + 1.2,
    outer: oh + 12,
    rise: 1.2,
    runs: [
      [cg(300) - 40, cg(300) + 190, 1],
      [cg(ah * 0.64) - 40, cg(ah * 0.64) + 190, -1],
    ],
  };
function Fg(e, t) {
  if (!Pg.runs.find(([n, r, i]) => i === t && e >= n && e <= r)) return null;
  let n = ih.frame($h(e)),
    r = Math.hypot(n.right.x, n.right.z) || 1,
    i = n.position.y + (n.right.y / r) * t * (oh + 1);
  return i > Q + Pg.rise ? i : null;
}
function Ig(e) {
  return Math.abs(eg(e).y - Q) < 1.2;
}
function Lg(e, t, n) {
  if (!Ig(t)) return !1;
  let [r, i] = tg(t, n * (Mg + 3));
  return e.b.place(
    `venue`,
    `marshal-post`,
    $(r, Fg(t, n) ?? e.b.ground(r, i), i, ng(t, n)),
    { role: `ground`, margin: 4, variant: Math.floor(e.random() * 8) },
  );
}
function Rg(e, t, n) {
  let { b: r } = e;
  for (let r of [t - 30, t + 140]) Lg(e, r, n);
  let i = 0;
  for (let e = t - 10; e < t + 170 && i < 22; e += 8.4) {
    if (!Ig(e)) continue;
    let a = n * (Mg + 0.6),
      [o, s] = tg(e, a);
    r.place(
      `venue`,
      `impact-foam-stack`,
      $(o, Fg(e, n) ?? r.ground(o, s), s, ng(e, n)),
      { role: `ground`, margin: 2, group: `foam-${t}`, variant: i % 8 },
    ) && i++;
  }
}
function zg(e) {
  let t = e.b.placements.venue.filter((e) => e.asset === `marshal-post`).length,
    n = 1;
  for (let r = 90; r < ah && t < 22; r += 37)
    if (Ig(r)) {
      for (let i of [n, -n])
        if (Lg(e, r, i)) {
          (t++, (n = -i), (r += 70));
          break;
        }
    }
}
function Bg(e) {
  let { b: t, mobile: n } = e,
    r = n ? 60 : 160,
    i = e_(`SKYWAY BOULEVARD`),
    a = [
      [330, 560, 1, !0],
      [540, 700, 1, !0],
      [540, 700, -1, !0],
      [700, 900, -1, !1],
      [i.from + 30, i.to - 80, -1, !0],
      [i.from + 30, i.to - 80, 1, !0],
      [5640, ah - 40, 1, !0],
      [5640, ah - 40, -1, !0],
    ],
    o = 0;
  for (let [i, s, c, l] of a)
    for (let a = i; a < s && o < r; a += 10.4) {
      if ((l && !Ig(a)) || Fg(a, c) !== null) continue;
      let r = c * (Mg + 0.5),
        [s, u] = tg(a, r),
        d = t.ground(s, u);
      if (d < Q - 0.1) continue;
      let f = ng(a, c),
        p = $(s, d + Ng.rise, u, f);
      t.place(`street`, `crowd-barrier`, p, {
        role: `ground`,
        margin: 2,
        group: `crowd-line-${i}-${c}`,
        variant: Math.floor(e.random() * 8),
      }) &&
        (o++,
        wg(
          e,
          p,
          f,
          Fm[`crowd-barrier`].crowdSlots.slots,
          n ? 0.25 : 0.5,
          `crowd-card`,
        ));
    }
}
