// assets__game-CsnOSIff 53 — math
// Lines 21790-22130 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function e_(e, t) {
  let { b: n, mobile: r } = e,
    i = new Set(nh.hotel),
    a = new Set(Cm),
    o = bm,
    s = rh.frame(Ve[0].to * ih + 10).position,
    c = { z: t.toLocal([s.x, s.y, s.z])[2], scale: 1.04 };
  for (let e of Sm) {
    if (i.has(e.id) || (r && a.has(e.id))) continue;
    let s = e.id;
    if ((r && o[s] && (s = o[s].lod), i.has(s))) continue;
    let l = $(e.p[0], e.p[1], e.p[2], e.yaw * lh);
    e.id === `sky-terrace-portal`
      ? (l = $(e.p[0], e.p[1], e.p[2] + c.z, 0, 1, 1, c.scale))
      : e.p[0] > Nh &&
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
    xm.filter((t) => t.name === e),
  );
  for (let e of xm) {
    let r = l.find((t) => t.includes(e));
    if (r && e !== r[0]) continue;
    let i = (e) => r.reduce((t, n) => t + n.p[e], 0) / r.length,
      a = r ? [i(0), i(1), i(2)] : [...e.p],
      o = mm(t.origin, t.yaw, a),
      s = e.dir
        ? { axis: Eh(t.matrix, e.dir).toArray(), cos: e.cos ?? 0.5 }
        : void 0,
      c = r ? e.intensity * Math.sqrt(r.length) : e.intensity;
    n.fixture(o, e.color, c, t_[e.name] ?? e.range, s);
  }
  let u = Sm.filter((e) => e.id === `balcony-block`),
    d = n_;
  for (let n of u)
    e.random() > (r ? 0.12 : 0.3) ||
      Cg(
        e,
        t.matrix.clone().multiply($(n.p[0], n.p[1], n.p[2], n.yaw * lh)),
        t.yaw + n.yaw * lh,
        d,
        0.35,
        `crowd-card`,
      );
}
var t_ = {
    chandelier: 22,
    "soffit wash": 11,
    "sky-pool uplight": 10,
    underside: 17,
    "porte-cochere": 32,
  },
  n_ = [
    [-8.9, 0.32, -0.37, 0],
    [-5.4, 0.32, -0.37, 0],
    [-1.8, 0.32, -0.37, 0],
    [1.8, 4.12, -0.37, 0],
    [5.4, 4.12, -0.37, 0],
    [8.9, 7.92, -0.37, 0],
  ];
function r_(e) {
  let { b: t, mobile: n } = e,
    r = Ve[0].from * ih - 20,
    i = Ve[0].to * ih + 10,
    a = Rf.find((e) => e.id === `eye`),
    o = Rf.filter(
      (e) =>
        e.ground &&
        e.id !== `crown-stand` &&
        e.id !== `pits` &&
        e.id !== `podium-plaza`,
    ),
    s = (e, t, n, r) =>
      Gh(e - 24, t - 24, e + 24, t + 24).some((i) => {
        let a = Math.abs(i.d - r);
        return (
          (a = Math.min(a, ih - a)),
          a > 60 && Math.hypot(i.x - e, i.z - t) < ah + 5 && i.top < n - 3
        );
      }),
    c = -1 / 0;
  for (let e = 0; e < ih; e += 4) {
    if (e - c < 40 || (e > r && e < i)) continue;
    let l = $h(e),
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
      !mp(e) ||
      s(d[0], d[2], l.y - 2, e) ||
      o.some((e) => zf(e, d[0], (d[1] + f) / 2, d[2], 4, p / 2, p / 2)) ||
      Array.from({ length: Math.ceil(p / 4) + 1 }, (e, t) => f + t * 4).some(
        (e) => zf(a, d[0], e, d[2], 4),
      )
    )
      continue;
    let m = p > 80 ? 1.15 : 1,
      h = wh(l.tx, l.tz),
      g = $(d[0], f, d[2], h, m, p / (10 * m), m);
    if (
      !t.fits(`transit`, `skyway-pier`, g, {
        role: `ground`,
        noRoad: !0,
        group: `pier`,
      })
    )
      continue;
    let _ = Ch(
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
      t.register(Dh(g, Wm[`skyway-pier`]), `pier`, `ground`),
      (c = e));
  }
}
function i_(e, t, n, r, i, a, o = 120) {
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
function a_(e) {
  let { b: t, mobile: n } = e,
    r = (e) => (n ? `${e}-lod` : e),
    i = Rf.find((e) => e.id === `penthouse-stack`);
  if (i.kind === `cylinder`) {
    let e = $(i.centre[0], Q, i.centre[1], -0.9);
    t.place(`skyline`, r(`cantilever-penthouse`), e, {
      role: `ground`,
      noLines: !0,
    });
    for (let n of km[`cantilever-penthouse`].beacons)
      t.add(`skyline`, `aviation-beacon`, $(...Th(e, n)), { role: `attached` });
  }
  let a = km[`orbis-ring-hotel`].aperture,
    [o, s, c] = vf.axis,
    l = wh(o, c),
    u = $(vf.centre[0], vf.centre[1] - a.centre[1], vf.centre[2], l);
  t.place(`skyline`, r(`orbis-ring-hotel`), u, {
    role: `air`,
    noLines: !0,
    noRoad: !0,
  });
  let d = km[`orbis-ring-hotel`];
  for (let e of d.fixtureMounts) t.fixture(Th(u, e), `#ffe2b8`, 500, 50);
  for (let e of d.beacons)
    t.add(`skyline`, `aviation-beacon`, $(...Th(u, e)), { role: `attached` });
  for (let r of d.crowdSlots) {
    if (e.random() > (n ? 0.3 : 0.6)) continue;
    let i = Th(u, r.p),
      a = l + wh(r.facing[0], r.facing[2]);
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
      o = i_(
        e,
        `skyline`,
        a,
        i,
        (t, n) => $(t, Q, n, Math.round(e.random() * 3) * (Math.PI / 2) + 0.12),
        { role: `ground`, cap: void 0 },
        90,
      );
    if (o && (Xg(e, a, o), n === `holo-crown-tower`))
      for (let e of km[`holo-crown-tower`].holoRings) {
        let n = Th(o, [0, e.y, 0]);
        t.add(
          `skyline`,
          `holo-crown-ring`,
          $(n[0], n[1], n[2], 0, e.radius / 14),
          { role: `attached` },
        );
      }
  }
}
