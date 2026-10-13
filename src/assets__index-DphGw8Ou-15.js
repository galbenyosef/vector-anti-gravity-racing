// assets__index-DphGw8Ou 15 — medals
// Lines 73368-73694 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
var QZ = BZ.flatMap((e, t) => [
    ...WZ.map(([n, r, i, a], o) => {
      let s = i === `tournament` ? ZZ(t) : void 0;
      return {
        id: `${e.id}-${o + 1}`,
        tier: e.id,
        number: o + 1,
        kind: i,
        circuit: s?.[0].circuit ?? GZ[(a + t) % GZ.length].id,
        row: n,
        col: r,
        ...(o === 0 ? { opening: !0 } : {}),
        ...(s ? { rounds: s } : {}),
      };
    }),
    ...KZ.filter(([, , , e]) => vJ.some((t) => t.id === e)).map(
      ([t, n, r, i], a) => ({
        id: `${e.id}-${WZ.length + a + 1}`,
        tier: e.id,
        number: WZ.length + a + 1,
        kind: r,
        circuit: i,
        row: t,
        col: n,
      }),
    ),
    ...[JZ[t % JZ.length]]
      .filter((e) => vJ.some((t) => t.id === e))
      .map((t) => ({
        id: `${e.id}-orbs`,
        tier: e.id,
        number: WZ.length + KZ.length + 1,
        kind: `orbs`,
        circuit: t,
        row: qZ[0],
        col: qZ[1],
      })),
    ...YZ.map(([n, r, i], a) => ({
      id: `${e.id}-rev-${a + 1}`,
      tier: e.id,
      number: WZ.length + KZ.length + 2 + a,
      kind: i,
      circuit: vJ[(t * YZ.length + a) % vJ.length].id,
      row: n,
      col: r,
      reverse: !0,
    })),
  ]),
  $Z = (e) => e.kind === `orbs`;
function eQ(e) {
  return {
    x: e.col + (e.row % 2 == 1 ? 0 : 0.5),
    y: (e.row * Math.sqrt(3)) / 2,
  };
}
function tQ(e) {
  let t = eQ(e);
  return QZ.filter((n) => {
    if (n.tier !== e.tier || n === e) return !1;
    let r = eQ(n);
    return Math.abs(Math.hypot(t.x - r.x, t.y - r.y) - 1) < 0.01;
  });
}
var nQ = (e) => !!UZ[e.kind].race;
function rQ(e) {
  let t = 0;
  for (let n of Object.values(e.medals)) t += zZ[n] ?? 0;
  return t;
}
function iQ(e, t) {
  return rQ(t) >= e.requires;
}
function aQ(e, t) {
  return iQ(
    BZ.find((t) => t.id === e.tier),
    t,
  )
    ? !!e.opening || tQ(e).some((e) => !!t.medals[e.id])
    : !1;
}
function oQ(e) {
  let t = BZ.find((t) => t.id === e.tier);
  if (e.kind === `speed-lap`) {
    let n = (e.reverse ? HZ : VZ)[e.circuit] ?? 30;
    return RZ.map((e, r) => ({
      medal: e,
      value: Math.round(n * t.lapFactors[r] * 10) / 10,
      unit: `lap`,
    }));
  }
  return e.kind === `orbs`
    ? RZ.map((e, n) => ({ medal: e, value: t.orbs[n], unit: `orbs` }))
    : RZ.map((e, t) => ({ medal: e, value: t + 1, unit: `position` }));
}
function sQ(e, t) {
  if (!nQ(e) || !Number.isFinite(t) || t <= 0) return null;
  let n = $Z(e);
  for (let r of oQ(e)) if (n ? t >= r.value : t <= r.value) return r.medal;
  return null;
}
function cQ(e) {
  let t = { medals: {}, best: {} };
  if (!e || typeof e != `object`) return t;
  let n = e,
    r = new Set(QZ.map((e) => e.id));
  for (let [e, i] of Object.entries(n.medals ?? {}))
    r.has(e) && RZ.includes(i) && (t.medals[e] = i);
  for (let [e, i] of Object.entries(n.best ?? {}))
    r.has(e) && Number.isFinite(i) && i > 0 && (t.best[e] = i);
  return t;
}
function lQ(e) {
  try {
    return cQ(JSON.parse(e?.getItem(`vector-career-v1`) ?? `null`));
  } catch {
    return cQ(null);
  }
}
var uQ = (e, t) => (e ? (t ? (RZ.indexOf(e) <= RZ.indexOf(t) ? e : t) : e) : t);
function dQ(e, t, n) {
  let r = e.medals[t.id] ?? null,
    i = sQ(t, n),
    a = uQ(r, i),
    o = { medals: { ...e.medals }, best: { ...e.best } };
  a && (o.medals[t.id] = a);
  let s = e.best[t.id],
    c = $Z(t) ? n > s : n < s;
  n > 0 && (!s || c) && (o.best[t.id] = n);
  let l = (e) => new Set(QZ.filter((t) => nQ(t) && aQ(t, e)).map((e) => e.id)),
    u = l(e),
    d = [...l(o)].filter((e) => !u.has(e)),
    f = BZ.find((t) => !iQ(t, e) && iQ(t, o))?.id ?? null;
  return {
    progress: o,
    award: {
      event: t.id,
      result: n,
      earned: i,
      previous: r,
      improved: a !== r,
      unlocked: d,
      tier: f,
    },
  };
}
function fQ(e, t) {
  let n = QZ.filter(
      (n) => nQ(n) && aQ(n, e) && e.medals[n.id] !== `gold` && n.id !== t,
    ),
    r = QZ.find((e) => e.id === t);
  return (
    n.find((t) => !e.medals[t.id] && t.tier === r?.tier) ??
    n.find((t) => !e.medals[t.id]) ??
    n[0] ??
    null
  );
}
function pQ(e, t) {
  let n = cQ(e);
  for (let [e, r] of Object.entries(cQ(t).medals))
    n.medals[e] = uQ(n.medals[e] ?? null, r);
  for (let [e, r] of Object.entries(cQ(t).best)) {
    let t = QZ.find((t) => t.id === e),
      i = n.best[e];
    (!i || ($Z(t) ? r > i : r < i)) && (n.best[e] = r);
  }
  return n;
}
function mQ(e, t) {
  try {
    e?.setItem(LZ, JSON.stringify(t));
  } catch {}
}
function hQ(e) {
  let t = e ? QZ.find((t) => t.id === e) : null;
  return BZ.find((e) => e.id === t?.tier)?.cpuSkill ?? 1;
}
var gQ = `vector-race-difficulty`;
function _Q(e) {
  return BZ.some((t) => t.id === e) ? e : `pro`;
}
function vQ(e, t) {
  return e ? hQ(e) : (BZ.find((e) => e.id === _Q(t))?.cpuSkill ?? 1);
}
function yQ(e, t = 0) {
  let n = e ? QZ.find((t) => t.id === e) : null,
    r = n?.rounds ? n.rounds[t]?.reverse : n?.reverse;
  return { ...Lu, direction: r ? `reverse` : `normal` };
}
var bQ = [10, 8, 6, 5, 4, 3, 2, 1];
function xQ(e, t) {
  let n = {};
  for (let [t, r] of Object.entries(e)) n[t] = [...r];
  return (t.forEach((e, t) => (n[e] = [...(n[e] ?? []), t + 1])), n);
}
function SQ(e, t, n = `player`) {
  let r = [...t].sort((e, t) =>
      e.finished === t.finished
        ? e.finished
          ? e.finishTime - t.finishTime
          : t.distance - e.distance
        : e.finished
          ? -1
          : 1,
    ),
    i = Math.max(0, Math.min(r.length, e - 1));
  return [
    ...r.slice(0, i).map((e) => e.name),
    n,
    ...r.slice(i).map((e) => e.name),
  ];
}
var CQ = (e) => e.reduce((e, t) => e + (bQ[t - 1] ?? 0), 0);
function wQ(e) {
  let t = Object.entries(e).map(([e, t]) => ({
      id: e,
      points: CQ(t),
      finishes: t,
    })),
    n = (e, t) => {
      let n = [...e].sort((e, t) => e - t),
        r = [...t].sort((e, t) => e - t);
      for (let e = 0; e < Math.max(n.length, r.length); e++)
        if ((n[e] ?? 99) !== (r[e] ?? 99)) return (n[e] ?? 99) - (r[e] ?? 99);
      return 0;
    };
  return t.sort(
    (e, t) =>
      t.points - e.points ||
      n(e.finishes, t.finishes) ||
      (e.finishes.at(-1) ?? 99) - (t.finishes.at(-1) ?? 99),
  );
}
function TQ(e) {
  let t = QZ.filter(nQ),
    n = t.filter((t) => e.medals[t.id]).length,
    r = t.filter((t) => e.medals[t.id] === `gold`).length;
  return {
    total: t.length,
    medalled: n,
    golds: r,
    complete: n === t.length,
    gold: r === t.length,
  };
}
function EQ(e) {
  return {
    tier: Math.max(1, BZ.filter((t) => iQ(t, e)).length),
    medals: Object.keys(e.medals).length,
  };
}
var DQ = { ship: `kestrel`, skin: `original`, tier: 1, medals: 0 },
  OQ = (e, t, n, r) => (Number.isInteger(e) ? Math.min(n, Math.max(t, e)) : r);
function kQ(e) {
  if (!e || typeof e != `object` || Array.isArray(e)) return null;
  let t = e,
    n = Xu.find((e) => e.id === t.ship)?.id;
  return n
    ? {
        ship: n,
        skin: cZ(n, t.skin).id,
        tier: OQ(t.tier, 1, BZ.length, 1),
        medals: OQ(t.medals, 0, 999, 0),
      }
    : null;
}
var AQ = (e) => `${e.ship}:${e.skin}:${e.tier}:${e.medals}`;
function jQ(e) {
  return e.skin === `original`
    ? Qu(e.ship).color
    : cZ(e.ship, e.skin).colors[0];
}
var MQ = [
    `item`,
    `cannonFiring`,
    `ammo`,
    `lock`,
    `lockTime`,
    `fireHeld`,
    `absorbHeld`,
    `cooldown`,
    `acquiredAt`,
    `lastDistance`,
    `lastLane`,
    `visited`,
    `mines`,
    `nextMine`,
    `recovery`,
    `reaction`,
    `hits`,
    `pickups`,
    `shield`,
    `turbos`,
  ],
  NQ = [`pickup`, `fire`, `hit`, `explode`, `heal`, `recover`, `lock`, `block`];
function PQ(e) {
  let t = Object.keys(e.pilots),
    n = (e) => t.indexOf(e);
  return {
    t: e.clock,
    n: e.serial,
    ids: t,
    u: t.map((t) => MQ.map((n) => e.pilots[t][n])),
    p: e.projectiles.map((e) => [
      e.id,
      n(e.owner),
      XY.indexOf(e.kind),
      e.distance,
      e.lane,
      e.heading,
      e.age,
      e.life,
      n(e.target),
      e.targetRecovery,
    ]),
    d: e.pads,
    e: e.events.map((e) => [
      e.id,
      e.time,
      NQ.indexOf(e.kind),
      ZY.indexOf(e.item),
      n(e.owner),
      e.distance,
      e.lane,
    ]),
  };
}
