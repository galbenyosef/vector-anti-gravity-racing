// assets__game-D43Oxqny 54 — math
// Lines 22166-22493 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function s_(e) {
  let { b: t, mobile: n } = e,
    r = zf.filter((e) => e.id.startsWith(`canyon-tower`)),
    i = 1 / 0,
    a = -1 / 0;
  for (let e of r)
    e.kind === `box` &&
      ((i = Math.min(i, e.centre[0] - e.halfLength)),
      (a = Math.max(a, e.centre[0] + e.halfLength)));
  let o = -725,
    s = (i + a) / 2,
    c = (a - i) / 320,
    l = n ? `canyon-pair-tower-lod` : `canyon-pair-tower`;
  for (let r of [Math.PI / 2, -Math.PI / 2]) {
    let i = $(s, Q, o, r, 1, 1, c);
    t.place(`skyline`, l, i, { role: `ground`, margin: sh + 8, noLines: !0 });
    for (let e of Am[`canyon-pair-tower`].beacons)
      t.add(`skyline`, `aviation-beacon`, $(...Eh(i, e)), { role: `attached` });
    if (!n)
      for (let n of Am[`canyon-pair-tower`].roofSlots) {
        let a = n.kinds[Math.floor(e.random() * n.kinds.length)];
        t.add(`skyline`, a, $(...Eh(i, n.p), r), { role: `attached` });
      }
  }
  let u =
      (2 * Am[`canyon-pair-tower`].innerFaceX) / Am[`sky-bridge`].nominalSpan,
    d = c_(s, c, o);
  for (let [r, i, a] of d) {
    let s = $(r, i, o, Math.PI / 2, u, 1, 1);
    t.place(`skyline`, n ? `${a}-lod` : a, s, {
      role: `attached`,
      margin: 0,
      noLines: !0,
    }) &&
      (t.fixture([r, i - 1.6, o], `#eaf1ff`, 420, 48, {
        axis: [0, -1, 0],
        cos: 0.25,
      }),
      n ||
        wg(
          e,
          s,
          Math.PI / 2,
          Am[`sky-bridge`].crowdSlots.map((e) => [e.p[0], e.p[1], e.p[2], 0]),
          0.3,
          `crowd-card`,
        ));
  }
}
function c_(e, t, n) {
  let r = Am[`canyon-pair-tower`],
    i = (n) =>
      r.towerFaces.map((r) => {
        let i = e + n * r.z[0] * t,
          a = e + n * r.z[1] * t;
        return { x0: Math.min(i, a), x1: Math.max(i, a), top: Q + r.top };
      }),
    a = i(1),
    o = i(-1),
    s = (e, t, n) =>
      e.some((e) => t - 4 > e.x0 && t + 4 < e.x1 && e.top > n + 10),
    c = e_(`SKYBRIDGE CANYON`),
    l = (e) => {
      let t = 1 / 0,
        r = 0;
      for (let i = c.from; i < c.to + 80; i += 2) {
        let a = eg(i),
          o = Math.abs(a.x - e);
        o < t &&
          Math.abs(a.z - n) < 30 &&
          ((t = o), (r = a.y + (oh + sh) * Math.abs(Math.sin(a.f.bank))));
      }
      return r;
    },
    u = [],
    d = [
      [30, 1],
      [70, 2],
      [140, 3],
    ],
    f = 0;
  for (let [e, t] of d) {
    let n = Q + e,
      r = 0;
    for (let e = -168; e < 70 && r < t; e += 2) {
      if (
        !s(a, e, n) ||
        !s(o, e, n) ||
        l(e) + 17 > n - 0.9 ||
        u.some(([t]) => Math.abs(t - e) < 16)
      )
        continue;
      let t = f < 2 && r === 1 ? `sky-bridge-garden` : `sky-bridge`;
      (t === `sky-bridge-garden` && f++, u.push([e, n, t]), r++, (e += 14));
    }
  }
  return u;
}
function l_(e) {
  let { b: t, mobile: n } = e,
    r = $(-330, Q, -725, Math.PI / 2);
  if (
    t.place(
      `skyline`,
      n ? `celeste-skybridge-hotel-lod` : `celeste-skybridge-hotel`,
      r,
      { role: `air`, margin: 6 },
    )
  ) {
    let i = Am[`celeste-skybridge-hotel`];
    for (let e of i.fixtureMounts)
      t.fixture(Eh(r, e), `#eaf1ff`, 420, 48, { axis: [0, -1, 0], cos: 0.25 });
    for (let e of i.beacons)
      t.add(`skyline`, `aviation-beacon`, $(...Eh(r, e)), { role: `attached` });
    for (let a of i.crowdSlots) {
      if (e.random() > (n ? 0.25 : 0.6)) continue;
      let i = Eh(r, a.p);
      t.add(
        `venue`,
        n ? `crowd-card` : `crowd-figure`,
        $(i[0], i[1], i[2], e.random() * 6.28),
        { role: `attached`, variant: Math.floor(e.random() * 16) },
      );
    }
    if (!n)
      for (let e of i.roofSlots)
        t.add(`skyline`, e.kinds[0], $(...Eh(r, e.p), Math.PI / 2), {
          role: `attached`,
        });
  }
  for (let t of [-445, -610]) Hg(e, $g(e_(`SKYWAY BOULEVARD`), t), 0, 12);
  let i = e_(`SKYWAY BOULEVARD`);
  for (let e of [i.from + 120, i.from + 420]) {
    let [n, r] = tg(e, oh + sh + 7);
    t.place(`venue`, `tv-camera-platform`, $(n, Q, r, ng(e, 1)), {
      role: `ground`,
      margin: 4,
    });
  }
}
function u_(e) {
  let { b: t, mobile: n } = e,
    [r, i] = Ef.centre,
    a = $(r, Q, i, 0);
  t.place(`flying`, n ? `container-silo-lod` : `container-silo`, a, {
    role: `ground`,
    margin: 12,
    ignoreLines: [`silo-conveyor`, `drone-stack2-silo`],
  });
  for (let e of Mp[`container-silo`].beacons)
    t.add(`skyline`, `aviation-beacon`, $(r + e[0], Q + e[1], i + e[2]), {
      role: `attached`,
    });
  Ag(
    e,
    [r, i],
    [165, 180, 195],
    `silo-fans`,
    !1,
    n
      ? { figures: 0, seated: 0, cards: 80 }
      : { figures: 30, seated: 0, cards: 260 },
  );
  let o = cg(ah * 0.64);
  ([300, 200, 100].forEach((t, n) => sg(e, o - t, -1, n)), Rg(e, o, -1));
  let [s, c] = tg(o + 70, -(oh + sh + 10));
  t.place(`venue`, `tv-camera-platform`, $(s, Q, c, ng(o + 70, -1)), {
    role: `ground`,
    margin: 4,
  });
}
function d_(e) {
  let { b: t, mobile: n } = e;
  for (let e of Cf) {
    let r = $(e.centre[0], Q, e.centre[1], e.heading * uh);
    t.place(`flying`, n ? `sky-stack-rack-lod` : `sky-stack-rack`, r, {
      role: `ground`,
      margin: 12,
      noLines: !0,
    });
    for (let e of Mp[`sky-stack-rack`].beacons)
      t.add(`skyline`, `aviation-beacon`, $(...Eh(r, e)), { role: `attached` });
  }
  let r = Math.cos(bf.heading * uh),
    i = Math.sin(bf.heading * uh);
  for (let e of [-1, 1]) {
    let n = bf.centre[0] + r * e * 110 + i * 70,
      a = bf.centre[2] + i * e * 110 - r * 70,
      o = $(n, Q, a, Th(bf.centre[0] - n, bf.centre[2] - a));
    t.place(`flying`, `leviathan-mooring-mast`, o, {
      role: `ground`,
      margin: 12,
      noLines: !0,
    });
    for (let e of Mp[`leviathan-mooring-mast`].beacons)
      t.add(`skyline`, `aviation-beacon`, $(...Eh(o, e)), { role: `attached` });
  }
  let a = e_(`STACKYARD ESSES`),
    o = e_(`LEVIATHAN CREST`),
    s = n ? 40 : 110,
    c = 0,
    l = 0,
    u = oh + sh + 20 + 8;
  for (let r = a.from - 140; r < o.to && c < s; r += 52)
    for (let i of [1, -1]) {
      if (c >= s) break;
      let [a, o] = tg(r, i * u),
        d = rg(r) - Math.PI / 2,
        f = n ? 1 : 2 + Math.floor(e.random() * 2),
        p = t.ground(a, o),
        m = 0;
      for (let n = 0; n < f; n++) {
        let s =
            n === f - 1 && f > 1
              ? `container-stack-block`
              : `container-stack-block-b`,
          l = $(a, p + n * 11.6, o, d + (n % 2 ? Math.PI : 0));
        if (
          !t.place(`flying`, s, l, {
            role: `ground`,
            group: `wall-${r}-${i}`,
            margin: 12,
            variant: Math.floor(e.random() * 8),
          })
        )
          break;
        (m++, c++);
      }
      if (m && !n) {
        let [n, a] = tg(r, i * (u + 18));
        for (let o = 0; o < 1 + Math.floor(e.random() * 2) && c < s; o++) {
          let s = $(n, t.ground(n, a) + o * 11.6, a, d + Math.PI);
          if (
            !t.place(`flying`, `container-stack-block-b`, s, {
              role: `ground`,
              group: `wall2-${r}-${i}`,
              margin: 12,
              variant: Math.floor(e.random() * 8),
            })
          )
            break;
          c++;
        }
      }
      if (m && l < 8 && Math.floor(r / 52) % 3 == 0) {
        let e = p + m * 11.6 + 1,
          [n, a] = tg(r, i * (u - 8)),
          o = eg(r);
        (t.fixture([n, e, a], `#ffb46a`, 520, 55, {
          axis: [-o.rx * i * 0.6, -0.8, -o.rz * i * 0.6],
          cos: 0.4,
        }),
          l++);
      }
    }
  for (let n = -790; n <= -500 && c < s; n += 56)
    for (let r of [-680]) {
      let i = $(n + (e.random() - 0.5) * 6, Q, r, 0);
      t.place(`flying`, `container-stack-block-b`, i, {
        role: `ground`,
        group: `yard-${n}`,
        margin: 12,
      }) && c++;
    }
}
function f_(e) {
  let { b: t } = e,
    { lines: n } = dp(),
    r = 0;
  for (let e of [`expressway-cutting`, `expressway-knot`]) {
    let i = n.get(e),
      a = -1 / 0;
    for (let e = 0; e < i.path.length && r < 4; e += 2) {
      let n = i.path.pointAt(e);
      if (!(
        !Kh(n.x - 20, n.z - 20, n.x + 20, n.z + 20).find(
          (e) => Math.hypot(e.x - n.x, e.z - n.z) < 4 && n.y - 2.4 > e.top + 8,
        ) || e - a < 60
      )) {
        for (let a of [-6, 6]) {
          let o = i.path.tangentAt(e),
            s = [n.x + o.z * a, n.y - 3, n.z - o.x * a];
          (t.fixture(s, `#f6efe2`, 300, 30, { axis: [0, -1, 0], cos: 0.4 }),
            r++);
        }
        a = e;
      }
    }
  }
}
function p_(e) {
  let { b: t, mobile: n } = e,
    r = [-169, 62];
  Ag(
    e,
    r,
    Array.from({ length: 6 }, (e, t) => 97.5 + 15 * t),
    `cauldron-stands`,
    !0,
    n
      ? { figures: 0, seated: 0, cards: 120 }
      : { figures: 20, seated: 0, cards: 380 },
  );
  let { from: i, to: a, radius: o } = Np.cauldronRim,
    s = n ? 1.8 : 0.6,
    c = 0;
  for (let e of [o - 2.6, o - 1.2])
    for (let n = i + 2; n <= a - 2; n += s / e / uh) {
      let i = r[0] + Math.cos(n * uh) * e,
        a = r[1] + Math.sin(n * uh) * e,
        o = Math.sin(c++ * 12.9898 + e * 78.233) * 43758.5453,
        s = o - Math.floor(o);
      t.add(
        `venue`,
        `crowd-card`,
        $(i, Q + 0.05, a, Th(r[0] - i, r[1] - a), 0.92 + s * 0.16),
        { role: `attached`, variant: Math.floor(s * 16) },
      );
    }
  for (let e = 0; e < 6; e++) {
    let n = (20 + e * 60) * uh,
      i = [r[0] + Math.cos(n) * 79, Q - 2, r[1] + Math.sin(n) * 79];
    t.fixture(i, `#e4eeff`, 380, 40, {
      axis: [-Math.cos(n), -0.7, -Math.sin(n)],
      cos: 0.3,
    });
  }
}
