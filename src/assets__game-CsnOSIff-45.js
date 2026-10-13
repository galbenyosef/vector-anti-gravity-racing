// assets__game-CsnOSIff 45 — math
// Lines 19696-20040 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function Qm(e) {
  let t = [];
  for (let [n, r, i, a, o] of e) {
    let e = Math.round((r - n) / o);
    for (let r = 0; r <= e; r++) t.push([n + r * o, i, a]);
  }
  return t;
}
function $m(e) {
  let t = [];
  for (let [n, r, i, a, o] of e) {
    let e = Math.max(1, Math.round((Math.abs(a - i) * n) / o));
    for (let o = 0; o <= e; o++) {
      let s = i + ((a - i) * o) / e;
      t.push([n * Math.sin(s), r, n * Math.cos(s), s + Math.PI]);
    }
  }
  return t;
}
var eh = {
    venue: { ids: Jm, bounds: Ym, triangles: Xm },
    skyline: { ids: Tm, bounds: Em, triangles: Dm },
    hotel: { ids: gm, bounds: vm, triangles: ym },
    transit: { ids: Um, bounds: Wm, triangles: Gm },
    flying: { ids: Op, bounds: kp, triangles: Ap },
    street: { ids: jm, bounds: Mm, triangles: Nm },
  },
  th = Object.keys(eh),
  nh = {
    venue: [`broadcast-drone`],
    skyline: [`window-cleaner-gondola`, `window-cleaner-cable`],
    hotel: [`kinetic-chandelier`, `kinetic-chandelier-lod`, `glass-lift`],
    transit: [
      `monorail-car-lead`,
      `monorail-car-lead-lod`,
      `monorail-car-mid`,
      `monorail-car-mid-lod`,
      `monorail-car-tail`,
      `monorail-car-tail-lod`,
      `freight-wagon`,
      `freight-wagon-lod`,
      `maglev-pod`,
      `maglev-pod-lod`,
      `maglev-pod-streak`,
      `pod-car`,
      `pod-car-lod`,
      `autonomous-bus`,
      `autonomous-bus-lod`,
      `cargo-truck`,
      `cargo-truck-lod`,
      `sports-car`,
      `sports-car-lod`,
      `sky-gondola-cabin`,
    ],
    flying: [
      `heavy-lift-drone`,
      `heavy-lift-drone-lod`,
      `container-12`,
      `container-6`,
      `aero-taxi`,
      `aero-taxi-lod`,
      `sky-car`,
      `sky-car-lod`,
      `courier-drone`,
      `broadcast-drone`,
      `patrol-drone`,
      `airliner-far`,
      `stack-gantry`,
      `leviathan-depot-airship`,
      `leviathan-depot-airship-lod`,
      `leviathan-tether`,
      `ad-blimp`,
      `ad-blimp-lod`,
    ],
    street: [`walker`, `water-taxi`, `meridian-line-ring`],
  },
  rh = or,
  ih = rh.length,
  ah = rh.halfWidth(),
  Q = 30,
  oh = 1.13,
  sh = 16,
  ch = oh + 12,
  lh = Math.PI / 180,
  uh = rh.frame(0).position.x,
  dh = Q - 1.6,
  fh = [Ve[0].from * ih - 4, Ve[0].to * ih + 4],
  ph = (() => {
    let e = [];
    for (let t = 560; t <= 960; t += 40) {
      let n = rh.frame(t),
        r = Math.hypot(n.right.x, n.right.z),
        i = ah + oh + 18;
      e.push([
        n.position.x - (n.right.x / r) * i,
        n.position.z - (n.right.z / r) * i,
      ]);
    }
    return {
      polygon: [
        ...e,
        [266, 352],
        [252, 270],
        [258, 150],
        [300, 116],
        [440, 112],
      ],
      waterY: dh,
    };
  })(),
  mh = (() => {
    let e = (e) => {
        let t = rh.frame(e),
          n = Math.hypot(t.right.x, t.right.z),
          r = -(ah + oh + 25);
        return [
          t.position.x + (t.right.x / n) * r,
          Q,
          t.position.z + (t.right.z / n) * r,
        ];
      },
      t = e(655),
      n = e(975);
    return {
      a: t,
      tower: [(t[0] + n[0]) / 2, Q, (t[2] + n[2]) / 2],
      b: n,
      cable: 34.5,
    };
  })(),
  hh = (() => {
    let e = mh,
      t = [];
    for (let [n, r] of [
      [e.a, e.tower],
      [e.tower, e.b],
    ]) {
      let e = Math.ceil(Math.hypot(r[0] - n[0], r[2] - n[2]) / 4);
      for (let i = 0; i <= e; i++)
        t.push([
          n[0] + ((r[0] - n[0]) * i) / e,
          n[2] + ((r[2] - n[2]) * i) / e,
        ]);
    }
    return t;
  })();
function gh(e) {
  if (e.y1 < Q + mh.cable - 12) return !0;
  let t = Math.abs(e.hx) + Math.abs(e.hz) + 12;
  for (let [n, r] of hh) {
    if (Math.abs(n - e.cx) > t || Math.abs(r - e.cz) > t) continue;
    let i = n - e.cx,
      a = r - e.cz,
      o = i * e.ux + a * e.uz,
      s = -i * e.uz + a * e.ux;
    if (
      Math.hypot(
        Math.max(0, Math.abs(o) - e.hx),
        Math.max(0, Math.abs(s) - e.hz),
      ) < 10
    )
      return !1;
  }
  return !0;
}
function _h(e) {
  for (let t of Rf) {
    if (t.kind !== `capsule`) continue;
    let [n, r, i] = t.a,
      [a, o, s] = t.b,
      c = t.radius + 6;
    if (e.y1 < Math.min(r, o) - c) continue;
    let l = Math.max(2, Math.ceil(Math.hypot(a - n, s - i) / 6));
    for (let r = 0; r <= l; r++) {
      let o = n + ((a - n) * r) / l - e.cx,
        u = i + ((s - i) * r) / l - e.cz,
        d = o * e.ux + u * e.uz,
        f = -o * e.uz + u * e.ux;
      if (
        Math.hypot(
          Math.max(0, Math.abs(d) - e.hx),
          Math.max(0, Math.abs(f) - e.hz),
        ) < c
      )
        return t.id;
    }
  }
  return null;
}
function vh(e) {
  return () => {
    e = (e + 1831565813) | 0;
    let t = Math.imul(e ^ (e >>> 15), 1 | e);
    return (
      (t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t),
      ((t ^ (t >>> 14)) >>> 0) / 4294967296
    );
  };
}
var yh = new D(),
  bh = new Ot(),
  xh = new g(),
  Sh = new g();
function $(e, t, n, r = 0, i = 1, a = i, o = i, s = 0, c = 0) {
  return (
    yh.set(s, r, c, `YZX`),
    bh.setFromEuler(yh),
    new M().compose(xh.set(e, t, n), bh, Sh.set(i, a, o))
  );
}
function Ch(e, t, n, r, i = 1, a = 1, o = 1) {
  let s = new M().makeBasis(
    new g(t[0], t[1], t[2]),
    new g(n[0], n[1], n[2]),
    new g(r[0], r[1], r[2]),
  );
  return (s.scale(Sh.set(i, a, o)), s.setPosition(e[0], e[1], e[2]), s);
}
var wh = (e, t) => Math.atan2(e, t);
function Th(e, t) {
  let n = new g(t[0], t[1], t[2]).applyMatrix4(e);
  return [n.x, n.y, n.z];
}
function Eh(e, t) {
  return new g(t[0], t[1], t[2]).transformDirection(e);
}
function Dh(e, t) {
  let n = e.elements,
    r = Math.hypot(n[0], n[2]) || 1,
    i = Math.hypot(n[8], n[10]) || 1,
    a = Th(e, [
      (t.min[0] + t.max[0]) / 2,
      (t.min[1] + t.max[1]) / 2,
      (t.min[2] + t.max[2]) / 2,
    ]),
    o = 1 / 0,
    s = -1 / 0;
  for (let n of [t.min[0], t.max[0]])
    for (let r of [t.min[1], t.max[1]])
      for (let i of [t.min[2], t.max[2]]) {
        let t = Th(e, [n, r, i]);
        ((o = Math.min(o, t[1])), (s = Math.max(s, t[1])));
      }
  return {
    cx: a[0],
    cz: a[2],
    ux: n[0] / r,
    uz: n[2] / r,
    hx: ((t.max[0] - t.min[0]) / 2) * r,
    hz: ((t.max[2] - t.min[2]) / 2) * i,
    y0: o,
    y1: s,
  };
}
function Oh(e, t, n) {
  let r = t - e.cx,
    i = n - e.cz,
    a = r * e.ux + i * e.uz,
    o = -r * e.uz + i * e.ux;
  return Math.hypot(
    Math.max(0, Math.abs(a) - e.hx),
    Math.max(0, Math.abs(o) - e.hz),
  );
}
function kh(e, t, n = 0.25) {
  let r = [
      [e.ux, e.uz],
      [-e.uz, e.ux],
      [t.ux, t.uz],
      [-t.uz, t.ux],
    ],
    i = t.cx - e.cx,
    a = t.cz - e.cz;
  for (let [o, s] of r) {
    let r =
        Math.abs(e.hx * (e.ux * o + e.uz * s)) +
        Math.abs(e.hz * (-e.uz * o + e.ux * s)),
      c =
        Math.abs(t.hx * (t.ux * o + t.uz * s)) +
        Math.abs(t.hz * (-t.uz * o + t.ux * s));
    if (Math.abs(i * o + a * s) >= r + c - n) return !1;
  }
  return !0;
}
function Ah(e, t, n) {
  let r = !1;
  for (let i = 0, a = n.length - 1; i < n.length; a = i++) {
    let [o, s] = n[i],
      [c, l] = n[a];
    s > t != l > t && e < ((c - o) * (t - s)) / (l - s) + o && (r = !r);
  }
  return r;
}
var jh = (e, t, n, r, i, a) => ({ min: [e, n, i], max: [t, r, a] }),
  Mh = _m,
  Nh = Mh.portalX[1],
  Ph = Mh.corridorHalfWidth;
function Fh() {
  let e = km[`orbis-ring-hotel`].aperture,
    [t, n] = [e.centre[0], e.centre[1]],
    r = e.radius,
    i = [];
  for (let e = 0; e < 16; e++) {
    let a = (e / 16) * 2 * Math.PI,
      o = ((e + 1) / 16) * 2 * Math.PI,
      s = [],
      c = [];
    for (let e of [r, 104])
      for (let r of [a, o])
        (s.push(t + e * Math.cos(r)), c.push(n + e * Math.sin(r)));
    let l = (a + o) / 2;
    (s.push(t + 104 * Math.cos(l)),
      c.push(n + 104 * Math.sin(l)),
      i.push(
        jh(
          Math.min(...s),
          Math.max(...s),
          Math.min(...c),
          Math.max(...c),
          -30,
          30,
        ),
      ));
  }
  return (i.push(jh(-105, 105, 0, n - 104, -30, 30)), i);
}
function Ih() {
  let e = km[`orbis-ring-hotel`].aperture,
    [t, n] = [e.centre[0], e.centre[1]];
  return Fh().map((r) => {
    let i = Math.max(r.min[0] - t, 0, t - r.max[0]),
      a = Math.max(r.min[1] - n, 0, n - r.max[1]);
    if (Math.hypot(i, a) >= e.radius) return r;
    let o = (r.min[0] + r.max[0]) / 2 - t,
      s = (r.min[1] + r.max[1]) / 2 - n,
      c = e.radius;
    return Math.abs(o) > Math.abs(s)
      ? o > 0
        ? jh(t + c, r.max[0], r.min[1], r.max[1], r.min[2], r.max[2])
        : jh(r.min[0], t - c, r.min[1], r.max[1], r.min[2], r.max[2])
      : s > 0
        ? jh(r.min[0], r.max[0], n + c, r.max[1], r.min[2], r.max[2])
        : jh(r.min[0], r.max[0], r.min[1], n - c, r.min[2], r.max[2]);
  });
}
