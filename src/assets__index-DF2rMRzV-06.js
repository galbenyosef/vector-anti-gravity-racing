// assets__index-DF2rMRzV 06 — math
// Lines 69881-70158 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function jY(e) {
  let t = AY(e);
  return OY.find((e) => t >= e.kicker && t < e.land) ?? null;
}
function MY(e) {
  let t = AY(e),
    n = null,
    r = 1 / 0;
  for (let e of OY) {
    let i = (((t - e.lip) % $) + $) % $;
    i < r && ((r = i), (n = e));
  }
  return n;
}
function NY(e) {
  let t = AY(e),
    n = jY(t);
  return !!n && t > n.lip;
}
function PY(e) {
  let t = AY(e),
    n = jY(t);
  if (!n || t > n.lip) return 0;
  let r = n.lip - n.kicker,
    i = t - n.kicker,
    a = (3 * n.height - n.slope * r) / r ** 2,
    o = (n.slope * r - 2 * n.height) / r ** 3;
  return a * i * i + o * i * i * i;
}
function FY(e) {
  let t = AY(e),
    n = jY(t);
  if (!n || t > n.lip) return 0;
  let r = n.lip - n.kicker,
    i = t - n.kicker,
    a = (3 * n.height - n.slope * r) / r ** 2,
    o = (n.slope * r - 2 * n.height) / r ** 3;
  return 2 * a * i + 3 * o * i * i;
}
function IY() {
  let e = [...OY].sort((e, t) => e.lip - t.lip);
  return e.length
    ? e.map((t, n) => [
        t.land,
        e[(n + 1) % e.length].lip + (n === e.length - 1 ? $ : 0),
      ])
    : [[0, $]];
}
function LY(e) {
  return yY.halfWidth();
}
function RY(e, t) {
  return yY.profile.trueLaneDistance ? 1 / Math.max(0.4, 1 - xY(e) * t) : 1;
}
function zY(e) {
  return yY.profile.trueLaneDistance ? 1 - SY(e) * 0.4 : 1;
}
function BY(e) {
  let t = (((e % $) + $) % $) / $;
  return EY.filter((e) => t >= e.from).at(-1);
}
function VY(e) {
  for (let t = 0; t <= 240; t += 20) {
    let n = xY(e + t);
    if (Math.abs(n) > 0.0026)
      return {
        direction: n > 0 ? `left` : `right`,
        distance: t,
        label:
          Math.abs(n) > 0.018
            ? `HAIRPIN`
            : Math.abs(n) > 0.006
              ? `TURN`
              : `SWEEP`,
      };
  }
  return null;
}
var HY = (e, t) =>
    e.map((e, n) => ({ distance: e * $, lane: t[n % t.length] })),
  UY = HY(...dY[`solstice-port-mk3`].boost),
  WY = HY(...dY[`solstice-port-mk3`].weapons);
function GY() {
  let e = Array.from({ length: yY.sampleCount }, (e, t) =>
    CY((t / yY.sampleCount) * $),
  );
  return {
    minX: Math.min(...e.map((e) => e.x)),
    maxX: Math.max(...e.map((e) => e.x)),
    minZ: Math.min(...e.map((e) => e.z)),
    maxZ: Math.max(...e.map((e) => e.z)),
  };
}
var KY = GY();
function qY(e) {
  let t = bY(e).position,
    n = KY.maxX - KY.minX,
    r = KY.maxZ - KY.minZ,
    i = Math.min(190 / n, 160 / r);
  return {
    x: (t.x - KY.minX) * i + 10 + (190 - n * i) / 2,
    y: (t.z - KY.minZ) * i + 10 + (160 - r * i) / 2,
  };
}
var JY = Array.from({ length: 150 }, (e, t) => qY((t / 150) * $)),
  YY = new Map(),
  XY = {
    "solstice-port-mk3": KJ,
    "nocturne-exchange": JJ,
    "sirocco-oasis": XJ,
    "shackleton-rim": QJ,
    "meridian-grand-prix": eY,
  },
  ZY = { ...Vu };
function QY(e) {
  if (e.direction !== ZY.direction)
    throw Error(`Reversing the circuit needs selectTrack.`);
  ZY = Uu(e);
}
function $Y(e, t = Vu) {
  let n = dY[e];
  if (!n) throw Error(`Unknown circuit: ${e}`);
  let r = EJ(e);
  ((fY = n.track.frame),
    (pY = n.track.point),
    (mY = n.track.ribbon),
    (hY = n.tunnels),
    (gY = n.jumps),
    (_Y = n.surfaces),
    (vY = n.sectors),
    (ZY = Uu(t)));
  let i = ZY.direction === `reverse`;
  (i && !YY.has(e) && YY.set(e, CJ(XY[e], !0)),
    (yY = i ? YY.get(e) : n.track),
    ($ = yY.length),
    (bY = yY.frame),
    (xY = yY.curvatureAt),
    (SY = yY.gradeAt),
    (CY = yY.point),
    (wY = yY.ribbon),
    (TY = yY.wall),
    (EY = i
      ? n.sectors
          .map((e, t) => ({
            ...e,
            from: t === n.sectors.length - 1 ? 0 : 1 - n.sectors[t + 1].from,
          }))
          .sort((e, t) => e.from - t.from)
      : n.sectors),
    (DY = i
      ? n.tunnels.map((e) => ({ ...e, from: 1 - e.to, to: 1 - e.from }))
      : n.tunnels),
    (OY = i
      ? n.jumps
          .map((e) => ({
            ...e,
            kicker: $ - e.land - (e.lip - e.kicker),
            lip: $ - e.land,
            land: $ - e.lip,
          }))
          .sort((e, t) => e.lip - t.lip)
      : n.jumps),
    (kY = i
      ? n.surfaces.map((e) => ({ ...e, from: 1 - e.to, to: 1 - e.from }))
      : n.surfaces));
  let a = (e) =>
    HY(...e).map((e) =>
      i ? { distance: $ - e.distance - 16, lane: -e.lane } : e,
    );
  return (
    (UY = a(n.boost)),
    (WY = a(n.weapons)),
    (KY = GY()),
    (JY = Array.from({ length: 150 }, (e, t) => qY((t / 150) * $))),
    r
  );
}
var eX = {
    mines: {
      name: `MINES`,
      color: `#b18aff`,
      icon: `◈`,
      ammo: 5,
      absorb: 20,
      damage: 3,
    },
    rockets: {
      name: `ROCKETS`,
      color: `#ff8a3d`,
      icon: `⋙`,
      ammo: 3,
      absorb: 20,
      damage: 10,
    },
    missile: {
      name: `HOMING MISSILE`,
      color: `#ff4f68`,
      icon: `⊕`,
      ammo: 1,
      absorb: 30,
      damage: 22,
    },
    cannon: {
      name: `CANNON`,
      color: `#ffd15a`,
      icon: `≋`,
      ammo: 30,
      absorb: 20,
      damage: 1,
    },
    turbo: {
      name: `TURBO`,
      color: `#4ce8ff`,
      icon: `»`,
      ammo: 1,
      absorb: 15,
      damage: 0,
    },
    shield: {
      name: `SHIELD`,
      color: `#5f9dff`,
      icon: `⬡`,
      ammo: 1,
      absorb: 20,
      damage: 0,
    },
  },
  tX = 1.25,
  nX = Object.keys(eX),
  rX = [...nX, `energy`],
  iX = (e) => ((((e + $ * 1.5) % $) + $) % $) - $ / 2,
  aX = (e, t, n) => Math.max(t, Math.min(n, e)),
  oX = 2 / 3,
  sX = (e) => Math.max(1, Math.round(e * oX));
function cX(e) {
  return e?.item
    ? Math.round(eX[e.item].absorb * (e.item === `cannon` ? e.ammo / 30 : 1))
    : 0;
}
function lX(e) {
  ((e.hull = 65),
    (e.speed = 18),
    (e.lane = 0),
    (e.heading = 0),
    (e.lateralVelocity = 0),
    (e.boostTime = 0),
    (e.turboTime = 0),
    (e.hitStun = 0),
    (e.boostActive = !1),
    (e.protection = tX),
    e.recoverySerial++,
    `yawRate` in e && (e.yawRate = 0),
    `collisionCooldown` in e && (e.collisionCooldown = tX));
}
function uX(e, t, n = (12 * Math.PI) / 180) {
  let r = iX(t.distance - e.distance);
  if (r < 9 || r > 180 || t.protection > 0) return !1;
  let i = CY(e.distance, e.lane, 1.6),
    a = CY(e.distance + r, t.lane, 1.6),
    o = bY(e.distance),
    s = o.tangent
      .clone()
      .multiplyScalar(Math.cos(e.heading))
      .addScaledVector(o.right, Math.sin(e.heading));
  if (a.clone().sub(i).normalize().dot(s) < Math.cos(n)) return !1;
  for (let t = 1; t < 8; t++) {
    let n = t / 8,
      o = e.distance + r * n,
      s = bY(o),
      c = i.clone().lerp(a, n).sub(s.position);
    if (
      Math.abs(c.dot(s.right)) > LY(o) - 0.6 ||
      Math.abs(c.dot(s.up) - 1.6) > 4
    )
      return !1;
  }
  return !0;
}
