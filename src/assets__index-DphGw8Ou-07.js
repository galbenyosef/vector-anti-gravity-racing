// assets__index-DphGw8Ou 07 — math
// Lines 70262-70575 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function oX(e) {
  if (!e || typeof e != `object`) return !1;
  let t = e,
    n = (e, t = 0, n = 1e8) =>
      typeof e == `number` && Number.isFinite(e) && e >= t && e <= n,
    r = (e) =>
      typeof e == `string` &&
      e.length <= 80 &&
      e !== `__proto__` &&
      e !== `constructor` &&
      e !== `prototype`,
    i = (e) => XY.includes(e);
  return (
    n(t.clock) &&
    n(t.serial) &&
    !!t.pilots &&
    typeof t.pilots == `object` &&
    !Array.isArray(t.pilots) &&
    Object.keys(t.pilots).length <= 8 &&
    Object.entries(t.pilots).every(
      ([e, t]) =>
        r(e) &&
        t &&
        (t.item === null || i(t.item)) &&
        n(t.ammo, 0, 30) &&
        r(t.lock) &&
        n(t.lockTime, 0, 0.66) &&
        typeof t.cannonFiring == `boolean` &&
        typeof t.fireHeld == `boolean` &&
        typeof t.absorbHeld == `boolean` &&
        [
          `cooldown`,
          `acquiredAt`,
          `lastDistance`,
          `mines`,
          `nextMine`,
          `recovery`,
          `hits`,
          `pickups`,
        ].every((e) => n(t[e])) &&
        n(t.lastLane, -40, 40) &&
        n(t.reaction, -1, 1) &&
        n(t.shield, 0, 5) &&
        n(t.turbos, 0, 100) &&
        Array.isArray(t.visited) &&
        t.visited.length === RY.length &&
        t.visited.every((e) => n(e, -1, 100)),
    ) &&
    Array.isArray(t.pads) &&
    t.pads.length === RY.length &&
    t.pads.every((e) => n(e)) &&
    Array.isArray(t.projectiles) &&
    t.projectiles.length <= 160 &&
    t.projectiles.every(
      (e) =>
        e &&
        n(e.id) &&
        r(e.owner) &&
        i(e.kind) &&
        e.kind !== `turbo` &&
        e.kind !== `shield` &&
        n(e.distance, -1e3, 1e6) &&
        n(e.lane, -40, 40) &&
        n(e.heading, -10, 10) &&
        n(e.age, 0, 13) &&
        n(e.life, 0, 13) &&
        r(e.target) &&
        n(e.targetRecovery),
    ) &&
    Array.isArray(t.events) &&
    t.events.length <= 80 &&
    t.events.every(
      (e) =>
        e &&
        n(e.id) &&
        n(e.time) &&
        [
          `pickup`,
          `fire`,
          `hit`,
          `explode`,
          `heal`,
          `recover`,
          `lock`,
          `block`,
        ].includes(e.kind) &&
        (i(e.item) ||
          (e.item === `energy` && [`heal`, `recover`].includes(e.kind))) &&
        (e.kind !== `block` ||
          ![`turbo`, `shield`, `energy`].includes(e.item)) &&
        r(e.owner) &&
        n(e.distance, -1e3, 1e6) &&
        n(e.lane, -40, 40),
    )
  );
}
var sX = {
  count: 40,
  lead: 140,
  tail: 60,
  reach: 3.4,
  height: 2.2,
  sweep: 0.62,
  period: 9,
};
function cX(e = $) {
  let t = e - sX.lead - sX.tail;
  return Array.from({ length: sX.count }, (e, n) => {
    let r = sX.lead + (t * n) / (sX.count - 1),
      i = Math.max(0, jY(r) - 4.5);
    return {
      distance: r,
      lane: Math.sin((n * 2 * Math.PI) / sX.period) * i * sX.sweep,
      taken: !1,
    };
  });
}
function lX(e, t, n, r) {
  let i = 0;
  for (let a of e)
    a.taken ||
      a.distance <= t ||
      a.distance > n ||
      Math.abs(a.lane - r) > sX.reach ||
      ((a.taken = !0), i++);
  return i;
}
var uX = {
    sensitivity: 1,
    volume: 0.9,
    musicVolume: 1,
    effectsVolume: 1,
    autoThrottle: !1,
    quality: `high`,
    frameRateLimit: `uncapped`,
    speedBlur: !0,
    camera: `chase`,
    aspect: `21:9`,
    captureControls: !1,
    ghost: !0,
  },
  dX = { yawResponse: 38, headingDamping: 5.8, grip: 18 },
  fX = (e) => 1.3 + e * 0.003,
  pX = {
    yaw: 1.8,
    response: 72,
    slideGrip: 5,
    drag: 6,
    brake: 95,
    scrub: 0.45,
    slideDamping: 3.5,
    bodyYaw: 0.24,
  },
  mX = { speed: 52, ease: 0.42, acceleration: 14, beat: 1.8 },
  hX = {
    gravity: 45,
    compression: 0.3,
    rescueDepth: 14,
    rescueAhead: 12,
    rescueSpeed: 45,
    rescueHull: 12,
  },
  gX = [0.985, 0.97, 0.98, 0.955, 0.975, 0.96, 0.965],
  _X = [-2, 2, 0, -4, 4, -6, 6];
function vX(e) {
  let t = xX(e, 0, 1);
  return {
    line: 0.2 + 0.8 * t,
    corner: 0.85 + 0.15 * t,
    scrub: 1 + (1 - t) * 14,
    anticipation: 0.45 + (1 - t) * 1.2,
    throttle: 0.45 + 0.55 * t,
    mistakes: 0.8 * (1 - t),
    pads: 0.2 + 0.8 * t,
    wander: 3 * (1 - t),
  };
}
function yX(e, t, n) {
  let r = Math.sin(e * 127.1 + t * 0.0173 + n * 311.7) * 43758.5453;
  return r - Math.floor(r);
}
var bX = [
    { name: `K. SATO`, team: `KIRIN`, color: `#38d9ed` },
    { name: `A. VEGA`, team: `AURORA`, color: `#a786ef` },
    { name: `J. NOVAK`, team: `STRATOS`, color: `#f4ce4f` },
    { name: `M. CHEN`, team: `KIRIN`, color: `#45dba6` },
    { name: `R. SILVA`, team: `VANTA`, color: `#f177a5` },
    { name: `E. VOLK`, team: `AURORA`, color: `#7eacff` },
    { name: `L. OKAFOR`, team: `STRATOS`, color: `#e6eaf0` },
  ],
  xX = (e, t, n) => Math.max(t, Math.min(n, e)),
  SX = (e) => ((((e + $ / 2) % $) + $) % $) - $ / 2;
function CX(e, t) {
  return t.filter((t) => {
    if (t === e) return !1;
    let n = SX(t.distance - e.distance);
    return n > -10 && n < xX(18 + (e.speed - t.speed) * 1.2, 26, 85);
  });
}
function wX(e, t) {
  return t.filter((t) => {
    let n = -SX(t.distance - e.distance),
      r = t.speed - e.speed;
    return t !== e && r > 5 && n > 0 && n < 10 + r * 1.5;
  });
}
function TX(e, t, n, r) {
  let i = 1 / 0,
    a = t;
  for (let o of [t, e.lane, -9, -4.5, 0, 4.5, 9]) {
    if (Math.abs(o) > n) continue;
    let s = Math.abs(o - t) * 0.8 + Math.abs(o - e.lane) * 0.45;
    for (let e of r) s += Math.max(0, 5.8 - Math.abs(o - e.lane)) * 12;
    s < i && ((i = s), (a = o));
  }
  return a;
}
function EX(e, t, n) {
  let r = !1;
  for (let i of n) {
    let n = SX(i.distance - e.distance);
    if (n > 0 && n < 85 && Math.abs(e.lane - i.lane) < 5.8) {
      let e = Math.max(18, i.speed + Math.max(0, n - 10) / 0.75);
      e < t && ((t = e), (r = !0));
    }
  }
  return { target: t, braking: r };
}
function DX(e, t, n) {
  let r = 1 / 0;
  for (let i = 0; i <= 180; i += 12) {
    let a = hY(e + i),
      o = Math.abs(a) * (1 / Math.max(0.4, 1 - a * t));
    if (o < 0.004) continue;
    let s = ((1.3 + pX.yaw) * 0.84 * n) / Math.max(5e-4, o - 0.003);
    r = Math.min(r, Math.sqrt(s * s + 124 * i));
  }
  return r;
}
function OX(e, t = 30) {
  let n = e.gravity ?? hX.gravity,
    r = e.land - e.lip + t,
    i = 0,
    a = 400;
  for (let t = 0; t < 40; t++) {
    let t = (i + a) / 2,
      o = t * e.slope;
    t * ((o + Math.sqrt(o * o + 2 * n * e.height)) / n) >= r
      ? (a = t)
      : (i = t);
  }
  return a;
}
function kX(e) {
  let t = ((e % $) + $) % $,
    n = mX.speed;
  for (let e of SY)
    ((((e.kicker - t) % $) + $) % $ < 600 || (t >= e.kicker && t < e.land)) &&
      (n = Math.max(n, OX(e)));
  return n;
}
function AX(e, t, n, r) {
  return e <= t
    ? e > 0
      ? Math.min(t, e + mX.acceleration * r)
      : e
    : n
      ? Math.max(t, e - r * 105)
      : t + (e - t) * Math.exp(-r * mX.ease);
}
function jX(e, t, n, r) {
  if (!SY.length) return null;
  if (e.airTime <= 0) {
    let i = Math.floor(t / $) * $;
    for (let a of SY)
      for (let o of [i + a.lip, i + $ + a.lip])
        if (t < o && e.distance >= o)
          return (
            (e.airTime = r),
            (e.airHeight = a.height),
            (e.airSpeed = n * (gY(o) + a.slope)),
            { event: `launch`, relative: 0 }
          );
    if (!DY(e.distance)) return null;
    ((e.airTime = r), (e.airHeight = 0), (e.airSpeed = n * gY(e.distance)));
  }
  let i = e.airHeight >= 0;
  e.airSpeed -= (EY(e.distance)?.gravity ?? hX.gravity) * r;
  let a = e.airSpeed - n * gY(e.distance);
  if (((e.airHeight += a * r), (e.airTime += r), e.airHeight > 0)) return null;
  let o = DY(e.distance);
  if (!o && i)
    return (
      (e.airHeight = e.airSpeed = e.airTime = 0),
      { event: `land`, relative: a }
    );
  if (o && e.airHeight > -hX.rescueDepth) return null;
  let s = ((e.distance % $) + $) % $,
    c =
      SY.find((e) => s > e.lip && s < e.land + 60) ??
      SY.reduce((e, t) =>
        Math.abs(t.land - s) < Math.abs(e.land - s) ? t : e,
      );
  return (
    (e.distance += Math.max(0, c.land + hX.rescueAhead - s)),
    (e.speed = Math.min(e.speed, hX.rescueSpeed)),
    (e.lane = e.heading = e.lateralVelocity = 0),
    (e.hull = Math.max(1, e.hull - hX.rescueHull)),
    (e.protection = Math.max(e.protection, 1.2)),
    e.recoverySerial++,
    (e.airHeight = e.airSpeed = e.airTime = 0),
    { event: `rescue`, relative: a }
  );
}
