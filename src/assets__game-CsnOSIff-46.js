// assets__game-CsnOSIff 46 — math
// Lines 20041-20255 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Lh = {
  "diagrid-office": 27.7,
  "diagrid-office-lod": 23.4,
  "twist-tower": 31.7,
  "twist-tower-lod": 31.7,
  "holo-crown-tower": 24,
  "holo-crown-tower-lod": 21,
  "container-silo": 15.4,
  "container-silo-lod": 15.3,
  "vertiport-crown": 39.6,
  "vertiport-crown-lod": 39,
  "plaza-fountain": 9.9,
  "bandstand-pavilion": 6.5,
  "terraced-arcology-lod": 80,
};
function Rh() {
  let e = km[`canyon-pair-tower`],
    t = Em[`canyon-pair-tower`].max[0],
    n = Em[`canyon-pair-tower`].max[1],
    r = e.wallLine,
    i = e.towerFaces.reduce((e, t) => (t.top > e.top ? t : e));
  return [
    jh(r.x, t, 0, r.height, r.z[0], r.z[1]),
    ...e.towerFaces.map((n) => jh(e.innerFaceX, t, 0, n.top, n.z[0], n.z[1])),
    jh(e.innerFaceX, t, i.top, n, i.z[0], i.z[1]),
  ];
}
var zh = {
  venue: {
    "start-gantry": () => {
      let e = Zm[`start-gantry`].legX,
        [t, n] = Zm[`start-gantry`].legSize,
        r = Ym[`start-gantry`].max[1],
        i = Zm[`start-gantry`].clearance;
      return [
        ...e.map((e) => jh(e - t / 2, e + t / 2, 0, r, -n / 2, n / 2)),
        jh(-23.3, 23.3, i, r, -2, 2),
      ];
    },
    "sponsor-arch": () => {
      let e = Zm[`sponsor-arch`].clearance;
      return [
        jh(-24.9, -21.3, 0, e, -1.1, 1.1),
        jh(21.3, 24.9, 0, e, -1.1, 1.1),
        jh(-24.9, 24.9, e, 29.37, -1.1, 1.1),
      ];
    },
    "crown-bridge": () => {
      let e = Zm[`crown-bridge`].clearance;
      return [
        jh(-35.65, -29, 0, 32.98, -6.18, 6.18),
        jh(29, 35.65, 0, 32.98, -6.18, 6.18),
        jh(-35.65, 35.65, e, 32.98, -6.18, 6.18),
      ];
    },
  },
  skyline: {
    "orbis-ring-hotel": Ih,
    "orbis-ring-hotel-lod": Ih,
    "canyon-pair-tower": Rh,
    "canyon-pair-tower-lod": Rh,
    "celeste-skybridge-hotel": () => {
      let e = km[`celeste-skybridge-hotel`].deckY;
      return [
        jh(-54.4, -44, 0, 58.6, -12.9, 12.9),
        jh(44, 54.4, 0, 58.6, -12.9, 12.9),
        jh(-54.4, 54.4, e - 1, 58.6, -12.9, 12.9),
      ];
    },
  },
  street: { "crowd-barrier": () => [jh(...Mg.x, -Mg.rise, 1.123, ...Mg.z)] },
  hotel: {
    "aurelian-atrium-shell": () => [
      jh(-1.6, Nh + 1.6, -Mh.bellyDepth, -2.5, -40.75, 40.75),
      jh(-1.6, Nh + 1.6, -2.5, Mh.ridge, Ph, 40.75),
      jh(-1.6, Nh + 1.6, -2.5, Mh.ridge, -40.75, -Ph),
      jh(-1.6, Nh + 1.6, Mh.clearHeight, Mh.ridge, -Ph, Ph),
    ],
    "porte-cochere": () => [
      jh(-7.8, 0.6, -2.5, 39, Ph, 35),
      jh(-7.8, 0.6, -2.5, 39, -35, -Ph),
      jh(-23.4, -8.7, 0.7, 29.5, 22.1, 23.1),
      jh(-23.4, -8.7, 0.7, 29.5, -23.1, -22.1),
      jh(-31.35, 0.6, 26, 39, -35, 35),
    ],
    "sky-terrace-portal": () => [
      jh(-0.25, 20.52, -2.5, 31.4, 17.2, 45.72),
      jh(-0.25, 20.52, -2.5, 31.4, -29.22, -17.2),
      jh(-0.25, 20.52, 16, 31.4, -29.22, 45.72),
    ],
  },
};
function Bh(e, t) {
  let n = zh[e]?.[t];
  return n ? n() : [eh[e].bounds[t]];
}
var Vh = null,
  Hh = 32,
  Uh = (e, t) => (e + 4096) * 8192 + t + 4096;
function Wh() {
  if (Vh) return Vh;
  let e = [],
    t = new Map();
  for (let n = 0; n < ih; n += 2) {
    let r = rh.frame(n),
      i = Math.hypot(r.tangent.x, r.tangent.z) || 1,
      a = Math.hypot(r.right.x, r.right.z) || 1,
      o = (ah + oh) * Math.abs(Math.sin(r.bank)),
      s = {
        d: n,
        x: r.position.x,
        y: r.position.y,
        z: r.position.z,
        tx: r.tangent.x / i,
        tz: r.tangent.z / i,
        rx: r.right.x / a,
        rz: r.right.z / a,
        top: r.position.y + o,
        under: r.position.y - o - 1.6,
      };
    e.push(s);
    let c = Uh(Math.floor(s.x / Hh), Math.floor(s.z / Hh)),
      l = t.get(c);
    l ? l.push(s) : t.set(c, [s]);
  }
  return (
    (Vh = { samples: e, grid: t, coarse: e.filter((e, t) => t % 15 == 0) }),
    Vh
  );
}
function Gh(e, t, n, r) {
  let { grid: i } = Wh(),
    a = [];
  for (let o = Math.floor(e / Hh); o <= Math.floor(n / Hh); o++)
    for (let e = Math.floor(t / Hh); e <= Math.floor(r / Hh); e++)
      for (let t of i.get(Uh(o, e)) ?? []) a.push(t);
  return a;
}
function Kh(e, t) {
  let n = 1 / 0;
  for (let r of Wh().coarse) n = Math.min(n, Math.hypot(r.x - e, r.z - t));
  if (n > 60) return n;
  for (let r of Gh(e - 64, t - 64, e + 64, t + 64))
    n = Math.min(n, Math.hypot(r.x - e, r.z - t));
  return n;
}
var qh = null;
function Jh() {
  if (qh) return qh;
  let e = new Map(),
    t = (t) => {
      let n = Uh(Math.floor(t.x / Hh), Math.floor(t.z / Hh)),
        r = e.get(n);
      r ? r.push(t) : e.set(n, [t]);
    },
    { lines: n, pylons: r, stations: i } = up();
  for (let e of n.values()) {
    let n = e.envelope,
      r = n.below > 0;
    for (let i of e.path.stations(4)) {
      let a = e.path.pointAt(i);
      t({
        id: e.id,
        x: a.x,
        z: a.z,
        low: a.y - Math.max(n.below, n.movingBelow),
        high: a.y + n.above,
        half: n.half,
        moving: !r,
      });
    }
  }
  for (let e of r)
    t({
      id: e.line,
      x: e.x,
      z: e.z,
      low: e.ground - 1,
      high: e.top,
      half: 3,
      moving: !1,
    });
  for (let e of i) {
    let r = n.get(e.line),
      i = Math.ceil((e.length + 24) / 4);
    for (let n = 0; n <= i; n++) {
      let i = r.path.pointAt(r.path.wrap(e.from - 12 + n * 4));
      t({
        id: e.line,
        x: i.x,
        z: i.z,
        low: i.y - 4,
        high: i.y + 11,
        half: 8.5,
        moving: !1,
      });
    }
  }
  return ((qh = e), e);
}
function Yh(e, t) {
  return {
    cx: e.x,
    cz: e.z,
    ux: e.tx,
    uz: e.tz,
    hx: 1.2,
    hz: t,
    y0: e.under,
    y1: e.top,
  };
}
function Xh(e, t) {
  return e.d > fh[0] && e.d < fh[1] && t <= e.y - Mh.bellyDepth - 2;
}
