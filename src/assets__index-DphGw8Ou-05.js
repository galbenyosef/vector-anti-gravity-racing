// assets__index-DphGw8Ou 05 — math
// Lines 69549-69826 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function TY(e) {
  let t = wY(e);
  return SY.find((e) => t >= e.kicker && t < e.land) ?? null;
}
function EY(e) {
  let t = wY(e),
    n = null,
    r = 1 / 0;
  for (let e of SY) {
    let i = (((t - e.lip) % $) + $) % $;
    i < r && ((r = i), (n = e));
  }
  return n;
}
function DY(e) {
  let t = wY(e),
    n = TY(t);
  return !!n && t > n.lip;
}
function OY(e) {
  let t = wY(e),
    n = TY(t);
  if (!n || t > n.lip) return 0;
  let r = n.lip - n.kicker,
    i = t - n.kicker,
    a = (3 * n.height - n.slope * r) / r ** 2,
    o = (n.slope * r - 2 * n.height) / r ** 3;
  return a * i * i + o * i * i * i;
}
function kY(e) {
  let t = wY(e),
    n = TY(t);
  if (!n || t > n.lip) return 0;
  let r = n.lip - n.kicker,
    i = t - n.kicker,
    a = (3 * n.height - n.slope * r) / r ** 2,
    o = (n.slope * r - 2 * n.height) / r ** 3;
  return 2 * a * i + 3 * o * i * i;
}
function AY() {
  let e = [...SY].sort((e, t) => e.lip - t.lip);
  return e.length
    ? e.map((t, n) => [
        t.land,
        e[(n + 1) % e.length].lip + (n === e.length - 1 ? $ : 0),
      ])
    : [[0, $]];
}
function jY(e) {
  return pY.halfWidth();
}
function MY(e, t) {
  return pY.profile.trueLaneDistance ? 1 / Math.max(0.4, 1 - hY(e) * t) : 1;
}
function NY(e) {
  return pY.profile.trueLaneDistance ? 1 - gY(e) * 0.4 : 1;
}
function PY(e) {
  let t = (((e % $) + $) % $) / $;
  return bY.filter((e) => t >= e.from).at(-1);
}
function FY(e) {
  for (let t = 0; t <= 240; t += 20) {
    let n = hY(e + t);
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
var IY = (e, t) =>
    e.map((e, n) => ({ distance: e * $, lane: t[n % t.length] })),
  LY = IY(...aY[`solstice-port-mk3`].boost),
  RY = IY(...aY[`solstice-port-mk3`].weapons);
function zY() {
  let e = Array.from({ length: pY.sampleCount }, (e, t) =>
    _Y((t / pY.sampleCount) * $),
  );
  return {
    minX: Math.min(...e.map((e) => e.x)),
    maxX: Math.max(...e.map((e) => e.x)),
    minZ: Math.min(...e.map((e) => e.z)),
    maxZ: Math.max(...e.map((e) => e.z)),
  };
}
var BY = zY();
function VY(e) {
  let t = mY(e).position,
    n = BY.maxX - BY.minX,
    r = BY.maxZ - BY.minZ,
    i = Math.min(190 / n, 160 / r);
  return {
    x: (t.x - BY.minX) * i + 10 + (190 - n * i) / 2,
    y: (t.z - BY.minZ) * i + 10 + (160 - r * i) / 2,
  };
}
var HY = Array.from({ length: 150 }, (e, t) => VY((t / 150) * $)),
  UY = new Map(),
  WY = {
    "solstice-port-mk3": BJ,
    "nocturne-exchange": HJ,
    "sirocco-oasis": WJ,
    "shackleton-rim": KJ,
    "meridian-grand-prix": JJ,
  },
  GY = { ...Lu };
function KY(e) {
  if (e.direction !== GY.direction)
    throw Error(`Reversing the circuit needs selectTrack.`);
  GY = zu(e);
}
function qY(e, t = Lu) {
  let n = aY[e];
  if (!n) throw Error(`Unknown circuit: ${e}`);
  let r = bJ(e);
  ((oY = n.track.frame),
    (sY = n.track.point),
    (cY = n.track.ribbon),
    (lY = n.tunnels),
    (uY = n.jumps),
    (dY = n.surfaces),
    (fY = n.sectors),
    (GY = zu(t)));
  let i = GY.direction === `reverse`;
  (i && !UY.has(e) && UY.set(e, _J(WY[e], !0)),
    (pY = i ? UY.get(e) : n.track),
    ($ = pY.length),
    (mY = pY.frame),
    (hY = pY.curvatureAt),
    (gY = pY.gradeAt),
    (_Y = pY.point),
    (vY = pY.ribbon),
    (yY = pY.wall),
    (bY = i
      ? n.sectors
          .map((e, t) => ({
            ...e,
            from: t === n.sectors.length - 1 ? 0 : 1 - n.sectors[t + 1].from,
          }))
          .sort((e, t) => e.from - t.from)
      : n.sectors),
    (xY = i
      ? n.tunnels.map((e) => ({ ...e, from: 1 - e.to, to: 1 - e.from }))
      : n.tunnels),
    (SY = i
      ? n.jumps
          .map((e) => ({
            ...e,
            kicker: $ - e.land - (e.lip - e.kicker),
            lip: $ - e.land,
            land: $ - e.lip,
          }))
          .sort((e, t) => e.lip - t.lip)
      : n.jumps),
    (CY = i
      ? n.surfaces.map((e) => ({ ...e, from: 1 - e.to, to: 1 - e.from }))
      : n.surfaces));
  let a = (e) =>
    IY(...e).map((e) =>
      i ? { distance: $ - e.distance - 16, lane: -e.lane } : e,
    );
  return (
    (LY = a(n.boost)),
    (RY = a(n.weapons)),
    (BY = zY()),
    (HY = Array.from({ length: 150 }, (e, t) => VY((t / 150) * $))),
    r
  );
}
var JY = {
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
  YY = 1.25,
  XY = Object.keys(JY),
  ZY = [...XY, `energy`],
  QY = (e) => ((((e + $ * 1.5) % $) + $) % $) - $ / 2,
  $Y = (e, t, n) => Math.max(t, Math.min(n, e)),
  eX = 2 / 3,
  tX = (e) => Math.max(1, Math.round(e * eX));
function nX(e) {
  return e?.item
    ? Math.round(JY[e.item].absorb * (e.item === `cannon` ? e.ammo / 30 : 1))
    : 0;
}
function rX(e) {
  ((e.hull = 65),
    (e.speed = 18),
    (e.lane = 0),
    (e.heading = 0),
    (e.lateralVelocity = 0),
    (e.boostTime = 0),
    (e.turboTime = 0),
    (e.hitStun = 0),
    (e.boostActive = !1),
    (e.protection = YY),
    e.recoverySerial++,
    `yawRate` in e && (e.yawRate = 0),
    `collisionCooldown` in e && (e.collisionCooldown = YY));
}
function iX(e, t, n = (12 * Math.PI) / 180) {
  let r = QY(t.distance - e.distance);
  if (r < 9 || r > 180 || t.protection > 0) return !1;
  let i = _Y(e.distance, e.lane, 1.6),
    a = _Y(e.distance + r, t.lane, 1.6),
    o = mY(e.distance),
    s = o.tangent
      .clone()
      .multiplyScalar(Math.cos(e.heading))
      .addScaledVector(o.right, Math.sin(e.heading));
  if (a.clone().sub(i).normalize().dot(s) < Math.cos(n)) return !1;
  for (let t = 1; t < 8; t++) {
    let n = t / 8,
      o = e.distance + r * n,
      s = mY(o),
      c = i.clone().lerp(a, n).sub(s.position);
    if (
      Math.abs(c.dot(s.right)) > jY(o) - 0.6 ||
      Math.abs(c.dot(s.up) - 1.6) > 4
    )
      return !1;
  }
  return !0;
}
