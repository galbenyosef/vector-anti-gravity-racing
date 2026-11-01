// assets__game-D43Oxqny 56 — math
// Lines 22774-23082 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function O_(e) {
  let { b: t, random: n, mobile: r } = e,
    i = (e, t) => (r ? t : e),
    a = D_(560, 1e3, -(oh + sh + 7), 13),
    o = D_(560, 1e3, oh + sh + 7, 13),
    s = e_(`SKYWAY BOULEVARD`),
    c = D_(s.from + 20, s.to - 60, -(oh + sh + 8), 13),
    l = D_(s.from + 20, s.to - 60, oh + sh + 8, 13),
    u = [];
  for (let e = -34; e <= 82; e += 9)
    for (let t of [94, 222])
      u.push({ x: e, z: t, yaw: t < 150 ? 0 : Math.PI, near: 60 });
  for (let e = 96; e <= 220; e += 9)
    u.push({ x: 84, z: e, yaw: -Math.PI / 2, near: 60 });
  let d = (t, n) => {
      let r = [];
      for (let i of e.towers) {
        if (i.asset.endsWith(`-lod`)) continue;
        let e = qh(i.x, i.z);
        if (e > 320) continue;
        let a = Dm[i.asset],
          o = i.placement.matrix,
          [s, c, l, u] = [
            a.min[0] - t,
            a.max[0] + t,
            a.min[2] - t,
            a.max[2] + t,
          ],
          d = [
            [s, u, c, u, 0],
            [c, u, c, l, Math.PI / 2],
            [c, l, s, l, Math.PI],
            [s, l, s, u, -Math.PI / 2],
          ];
        for (let [t, a, s, c, l] of d) {
          let u = Math.hypot(s - t, c - a);
          for (let d = n / 2; d < u - 4; d += n) {
            let n = Eh(o, [t + ((s - t) * d) / u, 0, a + ((c - a) * d) / u]);
            r.push({ x: n[0], z: n[2], yaw: i.yaw + l, near: e });
          }
        }
      }
      return r;
    },
    f = (e) => {
      for (let t = e.length - 1; t > 0; t--) {
        let r = Math.floor(n() * (t + 1));
        [e[t], e[r]] = [e[r], e[t]];
      }
      return e;
    },
    p = (e, r, i, a = {}) => {
      let o = 0;
      for (let s of i) {
        if (o >= r) break;
        let i = a.lod ? a.lod(s) : e,
          c = $(s.x, t.ground(s.x, s.z), s.z, s.yaw + (a.turn ?? 0));
        t.place(`street`, i, c, {
          role: `ground`,
          margin: a.margin ?? 4,
          variant: a.variant === void 0 ? void 0 : Math.floor(n() * a.variant),
        }) && (o++, a.extra?.(c, s));
      }
      return o;
    },
    m = (e) => Math.floor(e.near / 40),
    h = [
      ...o.filter((e, t) => t % 2 == 1),
      ...c.filter((e, t) => t % 2 == 1),
      ...l.filter((e, t) => t % 2 == 1),
      ...f([...d(9, 17), ...e.parks]).sort((e, t) => m(e) - m(t)),
    ],
    g = 0;
  p(`plane-tree`, i(560, 190), h, {
    margin: 5,
    lod: (e) =>
      !r && e.near < 90 && g < 110 ? `plane-tree` : `plane-tree-lod`,
    extra: () => {
      t.placements.street.at(-1)?.asset === `plane-tree` && g++;
    },
  });
  let _ = D_(560, 1e3, -(oh + sh + 14), 11),
    v = mh.polygon;
  for (let e = 0; e < v.length; e++) {
    let [t, r] = v[e],
      [i, a] = v[(e + 1) % v.length],
      o = Math.hypot(i - t, a - r),
      s = -(a - r) / o,
      c = (i - t) / o;
    jh((t + i) / 2 + s * 3, (r + a) / 2 + c * 3, v) && ((s = -s), (c = -c));
    for (let e = 6; e < o - 6; e += 12)
      _.push({
        x: t + ((i - t) * e) / o + s * 7,
        z: r + ((a - r) * e) / o + c * 7,
        yaw: n() * 6.28,
        near: 40,
      });
  }
  p(`marina-palm`, i(90, 60), [..._, ...u], {
    margin: 6,
    lod: (e) => (r || e.near > 200 ? `marina-palm-lod` : `marina-palm`),
  });
  let y = [...a, ...o, ...c, ...l].filter((e, t) => t % 2 == 0);
  p(
    `designer-lamp`,
    i(170, 60),
    [...y, ...u.filter((e, t) => t % 3 == 0), ...f(d(3.5, 26))],
    {
      extra: (e) => {
        let r = n(),
          i = e.elements,
          a = og(i[12], i[14]) ? 5 + Math.floor(r * 3) : Math.floor(r * 8);
        t.add(`street`, `lamp-banner`, e.clone(), {
          role: `attached`,
          variant: a,
        });
      },
    },
  );
  let b = f([...a, ...u, ...c, ...l, ...d(4, 9)]);
  for (let [t, n, a, o] of [
    [`holo-pylon`, 36, 12, 9],
    [`kiosk`, 30, 12, 4],
    [`cafe-terrace`, 24, 8, 4],
    [`bench`, 50, 20],
    [`planter`, 50, 20],
    [`bollard`, 120, 40],
    [`litter-bin`, 48, 20],
    [`info-totem`, 24, 12],
    [`scooter-dock`, 16, 8],
    [`utility-cabinet`, 24, 10],
    [`tram-shelter`, 8, 6, 4],
    [`taxi-stop`, 7, 3],
    [`signal-gantry`, 10, 6],
    [`cone-set`, 16, 6],
  ]) {
    let s =
      t === `holo-pylon`
        ? b.filter((e) => e.near > 12)
        : t === `signal-gantry` ||
            t === `tram-shelter` ||
            t === `utility-cabinet`
          ? f(d(4, 11))
          : b;
    p(t, i(n, a), s, {
      margin: t === `holo-pylon` ? 12 : 4,
      variant: o,
      extra: (n) => {
        r ||
          (t === `kiosk` && wg(e, n, 0, Fm.kiosk.crowdSlots.slots, 0.5),
          t === `cafe-terrace` &&
            wg(
              e,
              n,
              0,
              Fm[`cafe-terrace`].crowdSlots.slots,
              0.5,
              `crowd-figure-seated`,
            ),
          t === `tram-shelter` &&
            wg(e, n, 0, Fm[`tram-shelter`].crowdSlots.slots, 0.6));
      },
    });
  }
  let x = 400;
  for (let e of [
    ...o.filter((e, t) => t % 3 == 0),
    ...u.filter((e, t) => t % 4 == 1),
  ]) {
    if (x >= 400 + (r ? 12 : 40)) break;
    let n = $(e.x, t.ground(e.x, e.z), e.z, Eg);
    t.fits(`venue`, `flag-mast`, n, { role: `ground`, margin: 4 }) &&
      (t.add(`venue`, `flag-mast`, n, { role: `ground`, variant: x - 400 }),
      x++);
  }
}
function k_(e) {
  let { b: t, random: n, mobile: r } = e,
    i = r ? 56 : 180,
    a = 0,
    o = r ? 60 : 160,
    s = t.placements.skyline.filter(
      (e) => e.asset === `aviation-beacon`,
    ).length;
  for (let { placement: r } of e.towers) {
    let e = Am[r.asset];
    if (!e) continue;
    let c = Math.atan2(-r.matrix.elements[2], r.matrix.elements[0]);
    if (!r.asset.endsWith(`-lod`) && a < i) {
      for (let o of e.roofSlots ?? []) {
        if (a >= i || n() < 0.25) continue;
        let e = o.kinds[Math.floor(n() * o.kinds.length)];
        (t.add(
          `skyline`,
          e,
          $(...Eh(r.matrix, o.p), c + Math.floor(n() * 2) * Math.PI),
          { role: `attached` },
        ),
          a++);
      }
      for (let o of e.terraces ?? []) {
        if (a >= i || n() < 0.4) continue;
        let [e, s, l, u] = o.rect,
          [d, f, p, m] = o.cover,
          [h, g, _, v] = [
            [e, Math.max(e, Math.min(s, d)), l, u],
            [Math.min(s, Math.max(e, f)), s, l, u],
            [e, s, l, Math.max(l, Math.min(u, p))],
            [e, s, Math.min(u, Math.max(l, m)), u],
          ].sort(
            (e, t) =>
              (t[1] - t[0]) * (t[3] - t[2]) - (e[1] - e[0]) * (e[3] - e[2]),
          )[0];
        if (g - h < 10 || v - _ < 8) continue;
        let y = g - h > 20 && v - _ > 12 ? `rooftop-pool` : `rooftop-garden`,
          b = g - h >= v - _ ? 0 : Math.PI / 2;
        (t.add(
          `skyline`,
          y,
          $(...Eh(r.matrix, [(h + g) / 2, o.y, (_ + v) / 2]), c + b),
          { role: `attached` },
        ),
          a++);
      }
    }
    if (s < o && !r.asset.startsWith(`podium`))
      for (let n of e.beacons ?? []) {
        if (s >= o) break;
        (t.add(`skyline`, `aviation-beacon`, $(...Eh(r.matrix, n)), {
          role: `attached`,
        }),
          s++);
      }
  }
}
var A_ = {
    street: 30,
    bed: 0.6,
    wall: 4,
    tile: 128,
    fine: 4,
    fineMobile: 8,
    margin: 2600,
    cauldron: { centre: [-169, 62], core: 40, drum: 82 },
    garage: { core: 41.2, drum: 77.5, depth: 1.5, storey: 3.3, coping: 30.05 },
    basin: { floor: 25.8, step: 2, stepMobile: 4, coping: 30.06 },
  },
  j_ = {
    carriage: 6.5,
    pavement: 9.5,
    roadClear: 30,
    standing: 4.5,
    cars: 700,
    busy: 220,
    minRun: 120,
    spacing: [34, 80],
    speed: [8, 15],
    lanes: [1.7, 4.9],
  },
  M_ = new Set([`plaza-paving`, `quay-edge`, `marina-pontoon`]);
function N_(e, t, n) {
  let r = !1;
  for (let i = 0, a = n.length - 1; i < n.length; a = i++) {
    let [o, s] = n[i],
      [c, l] = n[a];
    s > t != l > t && e < ((c - o) * (t - s)) / (l - s) + o && (r = !r);
  }
  return r;
}
function P_(e, t, n) {
  let r = 1 / 0;
  for (let i = 0; i < n.length; i++) {
    let [a, o] = n[i],
      [s, c] = n[(i + 1) % n.length],
      l = s - a,
      u = c - o,
      d = Math.max(
        0,
        Math.min(1, ((e - a) * l + (t - o) * u) / (l * l + u * u)),
      );
    r = Math.min(r, Math.hypot(e - a - l * d, t - o - u * d));
  }
  return r;
}
function F_(e = 2) {
  let t = [],
    n = (e) => ct.some((t) => !t.glass && e > t.from * v && e < t.to * v);
  for (let r = 0; r < v; r += e) {
    let e = Ot(r),
      i = P(r),
      a = e.position.y - (i + 1) * Math.abs(Math.sin(e.bank));
    if (a > A_.street + A_.bed || n(r)) continue;
    let o = Math.hypot(e.right.x, e.right.z) || 1,
      s = new A(e.right.x, 0, e.right.z).normalize();
    t.push({
      d: r,
      x: e.position.x,
      z: e.position.z,
      y: a,
      cy: e.position.y,
      tan: e.right.y / o,
      rx: s.x,
      rz: s.z,
      half: i,
    });
  }
  return t;
}
var I_ = { height: 12, wall: 0.85, underside: -1.6 };
