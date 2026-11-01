// assets__game-D43Oxqny 46 — math
// Lines 20076-20290 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var Rh = {
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
function zh() {
  let e = Am[`canyon-pair-tower`],
    t = Dm[`canyon-pair-tower`].max[0],
    n = Dm[`canyon-pair-tower`].max[1],
    r = e.wallLine,
    i = e.towerFaces.reduce((e, t) => (t.top > e.top ? t : e));
  return [
    Mh(r.x, t, 0, r.height, r.z[0], r.z[1]),
    ...e.towerFaces.map((n) => Mh(e.innerFaceX, t, 0, n.top, n.z[0], n.z[1])),
    Mh(e.innerFaceX, t, i.top, n, i.z[0], i.z[1]),
  ];
}
var Bh = {
  venue: {
    "start-gantry": () => {
      let e = Qm[`start-gantry`].legX,
        [t, n] = Qm[`start-gantry`].legSize,
        r = Xm[`start-gantry`].max[1],
        i = Qm[`start-gantry`].clearance;
      return [
        ...e.map((e) => Mh(e - t / 2, e + t / 2, 0, r, -n / 2, n / 2)),
        Mh(-23.3, 23.3, i, r, -2, 2),
      ];
    },
    "sponsor-arch": () => {
      let e = Qm[`sponsor-arch`].clearance;
      return [
        Mh(-24.9, -21.3, 0, e, -1.1, 1.1),
        Mh(21.3, 24.9, 0, e, -1.1, 1.1),
        Mh(-24.9, 24.9, e, 29.37, -1.1, 1.1),
      ];
    },
    "crown-bridge": () => {
      let e = Qm[`crown-bridge`].clearance;
      return [
        Mh(-35.65, -29, 0, 32.98, -6.18, 6.18),
        Mh(29, 35.65, 0, 32.98, -6.18, 6.18),
        Mh(-35.65, 35.65, e, 32.98, -6.18, 6.18),
      ];
    },
  },
  skyline: {
    "orbis-ring-hotel": Lh,
    "orbis-ring-hotel-lod": Lh,
    "canyon-pair-tower": zh,
    "canyon-pair-tower-lod": zh,
    "celeste-skybridge-hotel": () => {
      let e = Am[`celeste-skybridge-hotel`].deckY;
      return [
        Mh(-54.4, -44, 0, 58.6, -12.9, 12.9),
        Mh(44, 54.4, 0, 58.6, -12.9, 12.9),
        Mh(-54.4, 54.4, e - 1, 58.6, -12.9, 12.9),
      ];
    },
  },
  street: { "crowd-barrier": () => [Mh(...Ng.x, -Ng.rise, 1.123, ...Ng.z)] },
  hotel: {
    "aurelian-atrium-shell": () => [
      Mh(-1.6, Ph + 1.6, -Nh.bellyDepth, -2.5, -40.75, 40.75),
      Mh(-1.6, Ph + 1.6, -2.5, Nh.ridge, Fh, 40.75),
      Mh(-1.6, Ph + 1.6, -2.5, Nh.ridge, -40.75, -Fh),
      Mh(-1.6, Ph + 1.6, Nh.clearHeight, Nh.ridge, -Fh, Fh),
    ],
    "porte-cochere": () => [
      Mh(-7.8, 0.6, -2.5, 39, Fh, 35),
      Mh(-7.8, 0.6, -2.5, 39, -35, -Fh),
      Mh(-23.4, -8.7, 0.7, 29.5, 22.1, 23.1),
      Mh(-23.4, -8.7, 0.7, 29.5, -23.1, -22.1),
      Mh(-31.35, 0.6, 26, 39, -35, 35),
    ],
    "sky-terrace-portal": () => [
      Mh(-0.25, 20.52, -2.5, 31.4, 17.2, 45.72),
      Mh(-0.25, 20.52, -2.5, 31.4, -29.22, -17.2),
      Mh(-0.25, 20.52, 16, 31.4, -29.22, 45.72),
    ],
  },
};
function Vh(e, t) {
  let n = Bh[e]?.[t];
  return n ? n() : [th[e].bounds[t]];
}
var Hh = null,
  Uh = 32,
  Wh = (e, t) => (e + 4096) * 8192 + t + 4096;
function Gh() {
  if (Hh) return Hh;
  let e = [],
    t = new Map();
  for (let n = 0; n < ah; n += 2) {
    let r = ih.frame(n),
      i = Math.hypot(r.tangent.x, r.tangent.z) || 1,
      a = Math.hypot(r.right.x, r.right.z) || 1,
      o = (oh + sh) * Math.abs(Math.sin(r.bank)),
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
    let c = Wh(Math.floor(s.x / Uh), Math.floor(s.z / Uh)),
      l = t.get(c);
    l ? l.push(s) : t.set(c, [s]);
  }
  return (
    (Hh = { samples: e, grid: t, coarse: e.filter((e, t) => t % 15 == 0) }),
    Hh
  );
}
function Kh(e, t, n, r) {
  let { grid: i } = Gh(),
    a = [];
  for (let o = Math.floor(e / Uh); o <= Math.floor(n / Uh); o++)
    for (let e = Math.floor(t / Uh); e <= Math.floor(r / Uh); e++)
      for (let t of i.get(Wh(o, e)) ?? []) a.push(t);
  return a;
}
function qh(e, t) {
  let n = 1 / 0;
  for (let r of Gh().coarse) n = Math.min(n, Math.hypot(r.x - e, r.z - t));
  if (n > 60) return n;
  for (let r of Kh(e - 64, t - 64, e + 64, t + 64))
    n = Math.min(n, Math.hypot(r.x - e, r.z - t));
  return n;
}
var Jh = null;
function Yh() {
  if (Jh) return Jh;
  let e = new Map(),
    t = (t) => {
      let n = Wh(Math.floor(t.x / Uh), Math.floor(t.z / Uh)),
        r = e.get(n);
      r ? r.push(t) : e.set(n, [t]);
    },
    { lines: n, pylons: r, stations: i } = dp();
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
  return ((Jh = e), e);
}
function Xh(e, t) {
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
function Zh(e, t) {
  return e.d > ph[0] && e.d < ph[1] && t <= e.y - Nh.bellyDepth - 2;
}
