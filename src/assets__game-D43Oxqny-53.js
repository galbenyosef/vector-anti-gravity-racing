// assets__game-D43Oxqny 53 — math
// Lines 21825-22165 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function t_(e, t) {
  let { b: n, mobile: r } = e,
    i = new Set(rh.hotel),
    a = new Set(wm),
    o = xm,
    s = ih.frame(Ke[0].to * ah + 10).position,
    c = { z: t.toLocal([s.x, s.y, s.z])[2], scale: 1.04 };
  for (let e of Cm) {
    if (i.has(e.id) || (r && a.has(e.id))) continue;
    let s = e.id;
    if ((r && o[s] && (s = o[s].lod), i.has(s))) continue;
    let l = $(e.p[0], e.p[1], e.p[2], e.yaw * uh);
    e.id === `sky-terrace-portal`
      ? (l = $(e.p[0], e.p[1], e.p[2] + c.z, 0, 1, 1, c.scale))
      : e.p[0] > Ph &&
        (l = $(
          e.p[0],
          e.p[1],
          e.p[2] * c.scale + c.z,
          Math.round(e.yaw / 90) * (Math.PI / 2),
        ));
    let u = t.matrix.clone().multiply(l),
      d =
        s.startsWith(`aurelian-tower`) ||
        s === `aurelian-atrium-shell` ||
        s === `porte-cochere` ||
        s === `sky-terrace-portal`,
      f = e.facadeShift === void 0 ? void 0 : Math.round(e.facadeShift * 16);
    d
      ? n.place(`hotel`, s, u, {
          role: s.startsWith(`aurelian-tower`) ? `ground` : `air`,
          group: `hotel`,
          margin: s.startsWith(`aurelian-tower`) ? 8 : 0,
          noRoad: !s.startsWith(`aurelian-tower`),
          ignoreLines: [`aurelian`],
          variant: f,
        })
      : n.add(`hotel`, s, u, { role: `attached`, group: `hotel`, variant: f });
  }
  let l = [`underside`, `sky-pool uplight`].map((e) =>
    Sm.filter((t) => t.name === e),
  );
  for (let e of Sm) {
    let r = l.find((t) => t.includes(e));
    if (r && e !== r[0]) continue;
    let i = (e) => r.reduce((t, n) => t + n.p[e], 0) / r.length,
      a = r ? [i(0), i(1), i(2)] : [...e.p],
      o = hm(t.origin, t.yaw, a),
      s = e.dir
        ? { axis: Dh(t.matrix, e.dir).toArray(), cos: e.cos ?? 0.5 }
        : void 0,
      c = r ? e.intensity * Math.sqrt(r.length) : e.intensity;
    n.fixture(o, e.color, c, n_[e.name] ?? e.range, s);
  }
  let u = Cm.filter((e) => e.id === `balcony-block`),
    d = r_;
  for (let n of u)
    e.random() > (r ? 0.12 : 0.3) ||
      wg(
        e,
        t.matrix.clone().multiply($(n.p[0], n.p[1], n.p[2], n.yaw * uh)),
        t.yaw + n.yaw * uh,
        d,
        0.35,
        `crowd-card`,
      );
}
var n_ = {
    chandelier: 22,
    "soffit wash": 11,
    "sky-pool uplight": 10,
    underside: 17,
    "porte-cochere": 32,
  },
  r_ = [
    [-8.9, 0.32, -0.37, 0],
    [-5.4, 0.32, -0.37, 0],
    [-1.8, 0.32, -0.37, 0],
    [1.8, 4.12, -0.37, 0],
    [5.4, 4.12, -0.37, 0],
    [8.9, 7.92, -0.37, 0],
  ];
function i_(e) {
  let { b: t, mobile: n } = e,
    r = Ke[0].from * ah - 20,
    i = Ke[0].to * ah + 10,
    a = zf.find((e) => e.id === `eye`),
    o = zf.filter(
      (e) =>
        e.ground &&
        e.id !== `crown-stand` &&
        e.id !== `pits` &&
        e.id !== `podium-plaza`,
    ),
    s = (e, t, n, r) =>
      Kh(e - 24, t - 24, e + 24, t + 24).some((i) => {
        let a = Math.abs(i.d - r);
        return (
          (a = Math.min(a, ah - a)),
          a > 60 && Math.hypot(i.x - e, i.z - t) < oh + 5 && i.top < n - 3
        );
      }),
    c = -1 / 0;
  for (let e = 0; e < ah; e += 4) {
    if (e - c < 40 || (e > r && e < i)) continue;
    let l = eg(e),
      u = l.f,
      d = [
        u.position.x - u.up.x * 8.6,
        u.position.y - u.up.y * 8.6,
        u.position.z - u.up.z * 8.6,
      ],
      f = t.ground(d[0], d[2]),
      p = d[1] - f;
    if (
      p < 3 ||
      f < Q - 0.3 ||
      !hp(e) ||
      s(d[0], d[2], l.y - 2, e) ||
      o.some((e) => Bf(e, d[0], (d[1] + f) / 2, d[2], 4, p / 2, p / 2)) ||
      Array.from({ length: Math.ceil(p / 4) + 1 }, (e, t) => f + t * 4).some(
        (e) => Bf(a, d[0], e, d[2], 4),
      )
    )
      continue;
    let m = p > 80 ? 1.15 : 1,
      h = Th(l.tx, l.tz),
      g = $(d[0], f, d[2], h, m, p / (10 * m), m);
    if (
      !t.fits(`transit`, `skyway-pier`, g, {
        role: `ground`,
        noRoad: !0,
        group: `pier`,
      })
    )
      continue;
    let _ = wh(
      [u.position.x, u.position.y, u.position.z],
      u.right.toArray(),
      u.up.toArray(),
      u.tangent.toArray(),
    );
    (t.add(
      `transit`,
      n ? `skyway-pier-capital-lod` : `skyway-pier-capital`,
      _,
      { role: `line` },
    ),
      t.add(`transit`, `skyway-pier`, g, { role: `line`, group: `pier` }),
      t.register(Oh(g, Gm[`skyway-pier`]), `pier`, `ground`),
      (c = e));
  }
}
function a_(e, t, n, r, i, a, o = 120) {
  for (let [s, c] of r)
    for (let r = 0; r <= o; r += 15) {
      let o = r === 0 ? 1 : Math.max(6, Math.round((2 * Math.PI * r) / 20));
      for (let l = 0; l < o; l++) {
        let u = (l / o) * 2 * Math.PI,
          d = i(s + Math.cos(u) * r, c + Math.sin(u) * r);
        if (e.b.place(t, n, d, a)) return d;
      }
    }
  return null;
}
function o_(e) {
  let { b: t, mobile: n } = e,
    r = (e) => (n ? `${e}-lod` : e),
    i = zf.find((e) => e.id === `penthouse-stack`);
  if (i.kind === `cylinder`) {
    let e = $(i.centre[0], Q, i.centre[1], -0.9);
    t.place(`skyline`, r(`cantilever-penthouse`), e, {
      role: `ground`,
      noLines: !0,
    });
    for (let n of Am[`cantilever-penthouse`].beacons)
      t.add(`skyline`, `aviation-beacon`, $(...Eh(e, n)), { role: `attached` });
  }
  let a = Am[`orbis-ring-hotel`].aperture,
    [o, s, c] = yf.axis,
    l = Th(o, c),
    u = $(yf.centre[0], yf.centre[1] - a.centre[1], yf.centre[2], l);
  t.place(`skyline`, r(`orbis-ring-hotel`), u, {
    role: `air`,
    noLines: !0,
    noRoad: !0,
  });
  let d = Am[`orbis-ring-hotel`];
  for (let e of d.fixtureMounts) t.fixture(Eh(u, e), `#ffe2b8`, 500, 50);
  for (let e of d.beacons)
    t.add(`skyline`, `aviation-beacon`, $(...Eh(u, e)), { role: `attached` });
  for (let r of d.crowdSlots) {
    if (e.random() > (n ? 0.3 : 0.6)) continue;
    let i = Eh(u, r.p),
      a = l + Th(r.facing[0], r.facing[2]);
    t.add(`venue`, n ? `crowd-card` : `crowd-figure`, $(i[0], i[1], i[2], a), {
      role: `attached`,
      variant: Math.floor(e.random() * 16),
    });
  }
  for (let [n, i] of [
    [
      `twist-tower`,
      [
        [205, -500],
        [520, -480],
        [-30, -420],
        [470, -820],
      ],
    ],
    [
      `twist-tower`,
      [
        [520, -480],
        [470, -820],
        [205, -500],
      ],
    ],
    [
      `twist-tower`,
      [
        [470, -820],
        [600, -600],
        [205, -500],
      ],
    ],
    [
      `twist-tower`,
      [
        [90, -1e3],
        [560, -700],
        [-30, -420],
      ],
    ],
    [
      `diagrid-office`,
      [
        [150, -620],
        [140, -440],
      ],
    ],
    [
      `diagrid-office`,
      [
        [420, -620],
        [440, -300],
      ],
    ],
    [
      `diagrid-office`,
      [
        [600, -620],
        [640, -420],
      ],
    ],
    [
      `diagrid-office`,
      [
        [420, -300],
        [520, -320],
      ],
    ],
    [
      `diagrid-office`,
      [
        [-40, -560],
        [40, -470],
      ],
    ],
    [
      `diagrid-office`,
      [
        [280, -900],
        [360, -960],
      ],
    ],
    [
      `cantilever-stack`,
      [
        [110, -330],
        [120, -250],
      ],
    ],
    [
      `cantilever-stack`,
      [
        [540, -260],
        [600, -330],
      ],
    ],
    [
      `cantilever-stack`,
      [
        [0, -880],
        [-60, -940],
      ],
    ],
    [
      `holo-crown-tower`,
      [
        [380, -720],
        [420, -760],
      ],
    ],
    [
      `holo-crown-tower`,
      [
        [700, -500],
        [700, -380],
      ],
    ],
    [
      `holo-crown-tower`,
      [
        [30, -1150],
        [-80, -1120],
      ],
    ],
  ]) {
    let a = r(n),
      o = a_(
        e,
        `skyline`,
        a,
        i,
        (t, n) => $(t, Q, n, Math.round(e.random() * 3) * (Math.PI / 2) + 0.12),
        { role: `ground`, cap: void 0 },
        90,
      );
    if (o && (Zg(e, a, o), n === `holo-crown-tower`))
      for (let e of Am[`holo-crown-tower`].holoRings) {
        let n = Eh(o, [0, e.y, 0]);
        t.add(
          `skyline`,
          `holo-crown-ring`,
          $(n[0], n[1], n[2], 0, e.radius / 14),
          { role: `attached` },
        );
      }
  }
}
