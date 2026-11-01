// assets__index-DF2rMRzV 12 — medals
// Lines 72337-72669 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
var rZ = `vector-career-v1`,
  iZ = [`gold`, `silver`, `bronze`],
  aZ = { bronze: 1, silver: 2, gold: 3 },
  oZ = [
    {
      id: `rookie`,
      name: `ROOKIE`,
      tagline: `First licence. Learn the lines.`,
      requires: 0,
      lapFactors: [1.06, 1.12, 1.2],
      cpuSkill: 0,
      orbs: [36, 33, 30],
    },
    {
      id: `pro`,
      name: `PRO`,
      tagline: `Faster fields, tighter targets.`,
      requires: 10,
      lapFactors: [1.03, 1.08, 1.14],
      cpuSkill: 0.3,
      orbs: [38, 35, 32],
    },
    {
      id: `elite`,
      name: `ELITE`,
      tagline: `Within a breath of the best.`,
      requires: 22,
      lapFactors: [1, 1.04, 1.09],
      cpuSkill: 0.65,
      orbs: [39, 37, 35],
    },
    {
      id: `phantom`,
      name: `PHANTOM`,
      tagline: `Beat the machine.`,
      requires: 36,
      lapFactors: [0.96, 1, 1.05],
      cpuSkill: 1,
      orbs: [40, 39, 38],
    },
  ],
  sZ = {
    "solstice-port-mk3": 23.4,
    "nocturne-exchange": 23.8,
    "sirocco-oasis": 29.2,
    "shackleton-rim": 38.3,
    "meridian-grand-prix": 39.4,
  },
  cZ = {
    "solstice-port-mk3": 23.4,
    "nocturne-exchange": 24,
    "sirocco-oasis": 30.3,
    "shackleton-rim": 39.6,
    "meridian-grand-prix": 38.9,
  },
  lZ = {
    race: {
      name: `SINGLE RACE`,
      brief: `Three laps against seven pilots, weapons live. Finish on the podium.`,
      race: `race`,
    },
    "speed-lap": {
      name: `SPEED LAP`,
      brief: `Open track and a Turbo every lap. Set one lap under the target.`,
      race: `timed-lap`,
    },
    orbs: {
      name: `ORBS`,
      brief: `One lap from the grid. Fly through as many of the ${pX.count} orbs as you can.`,
      race: `orbs`,
    },
    tournament: {
      name: `TOURNAMENT`,
      brief: `Five circuits back to back, three laps each. Points decide the podium.`,
      race: `race`,
    },
  },
  uZ = [
    [1, 0, `race`, 0],
    [0, 0, `speed-lap`, 0],
    [2, 0, `race`, 1],
    [1, 1, `speed-lap`, 1],
    [0, 1, `race`, 2],
    [2, 1, `speed-lap`, 2],
    [1, 2, `race`, 1],
    [0, 2, `race`, 0],
    [2, 2, `speed-lap`, 2],
    [1, 3, `tournament`, 0],
  ],
  dZ = wJ.slice(0, 3),
  fZ = [
    [0, 3, `race`, `shackleton-rim`],
    [2, 3, `speed-lap`, `shackleton-rim`],
    [1, 4, `race`, `meridian-grand-prix`],
    [2, 4, `speed-lap`, `meridian-grand-prix`],
  ],
  pZ = [0, 4],
  mZ = [
    `solstice-port-mk3`,
    `nocturne-exchange`,
    `sirocco-oasis`,
    `meridian-grand-prix`,
  ],
  hZ = [
    [0, 5, `race`],
    [1, 5, `speed-lap`],
    [2, 5, `race`],
  ],
  gZ = [
    [!1, !1, !1, !1, !1],
    [!1, !1, !1, !1, !0],
    [!1, !0, !1, !0, !1],
    [!0, !1, !0, !1, !0],
  ];
function _Z(e) {
  return wJ.map((t, n) => ({
    circuit: wJ[(e + n) % wJ.length].id,
    reverse: !!gZ[e]?.[n],
  }));
}
var vZ = oZ.flatMap((e, t) => [
    ...uZ.map(([n, r, i, a], o) => {
      let s = i === `tournament` ? _Z(t) : void 0;
      return {
        id: `${e.id}-${o + 1}`,
        tier: e.id,
        number: o + 1,
        kind: i,
        circuit: s?.[0].circuit ?? dZ[(a + t) % dZ.length].id,
        row: n,
        col: r,
        ...(o === 0 ? { opening: !0 } : {}),
        ...(s ? { rounds: s } : {}),
      };
    }),
    ...fZ
      .filter(([, , , e]) => wJ.some((t) => t.id === e))
      .map(([t, n, r, i], a) => ({
        id: `${e.id}-${uZ.length + a + 1}`,
        tier: e.id,
        number: uZ.length + a + 1,
        kind: r,
        circuit: i,
        row: t,
        col: n,
      })),
    ...[mZ[t % mZ.length]]
      .filter((e) => wJ.some((t) => t.id === e))
      .map((t) => ({
        id: `${e.id}-orbs`,
        tier: e.id,
        number: uZ.length + fZ.length + 1,
        kind: `orbs`,
        circuit: t,
        row: pZ[0],
        col: pZ[1],
      })),
    ...hZ.map(([n, r, i], a) => ({
      id: `${e.id}-rev-${a + 1}`,
      tier: e.id,
      number: uZ.length + fZ.length + 2 + a,
      kind: i,
      circuit: wJ[(t * hZ.length + a) % wJ.length].id,
      row: n,
      col: r,
      reverse: !0,
    })),
  ]),
  yZ = (e) => e.kind === `orbs`;
function bZ(e) {
  return {
    x: e.col + (e.row % 2 == 1 ? 0 : 0.5),
    y: (e.row * Math.sqrt(3)) / 2,
  };
}
function xZ(e) {
  let t = bZ(e);
  return vZ.filter((n) => {
    if (n.tier !== e.tier || n === e) return !1;
    let r = bZ(n);
    return Math.abs(Math.hypot(t.x - r.x, t.y - r.y) - 1) < 0.01;
  });
}
var SZ = (e) => !!lZ[e.kind].race;
function CZ(e) {
  let t = 0;
  for (let n of Object.values(e.medals)) t += aZ[n] ?? 0;
  return t;
}
function wZ(e, t) {
  return CZ(t) >= e.requires;
}
function TZ(e, t) {
  return wZ(
    oZ.find((t) => t.id === e.tier),
    t,
  )
    ? !!e.opening || xZ(e).some((e) => !!t.medals[e.id])
    : !1;
}
function EZ(e) {
  let t = oZ.find((t) => t.id === e.tier);
  if (e.kind === `speed-lap`) {
    let n = (e.reverse ? cZ : sZ)[e.circuit] ?? 30;
    return iZ.map((e, r) => ({
      medal: e,
      value: Math.round(n * t.lapFactors[r] * 10) / 10,
      unit: `lap`,
    }));
  }
  return e.kind === `orbs`
    ? iZ.map((e, n) => ({ medal: e, value: t.orbs[n], unit: `orbs` }))
    : iZ.map((e, t) => ({ medal: e, value: t + 1, unit: `position` }));
}
function DZ(e, t) {
  if (!SZ(e) || !Number.isFinite(t) || t <= 0) return null;
  let n = yZ(e);
  for (let r of EZ(e)) if (n ? t >= r.value : t <= r.value) return r.medal;
  return null;
}
function OZ(e) {
  let t = { medals: {}, best: {} };
  if (!e || typeof e != `object`) return t;
  let n = e,
    r = new Set(vZ.map((e) => e.id));
  for (let [e, i] of Object.entries(n.medals ?? {}))
    r.has(e) && iZ.includes(i) && (t.medals[e] = i);
  for (let [e, i] of Object.entries(n.best ?? {}))
    r.has(e) && Number.isFinite(i) && i > 0 && (t.best[e] = i);
  return t;
}
function kZ(e) {
  try {
    return OZ(JSON.parse(e?.getItem(`vector-career-v1`) ?? `null`));
  } catch {
    return OZ(null);
  }
}
var AZ = (e, t) => (e ? (t ? (iZ.indexOf(e) <= iZ.indexOf(t) ? e : t) : e) : t);
function jZ(e, t, n) {
  let r = e.medals[t.id] ?? null,
    i = DZ(t, n),
    a = AZ(r, i),
    o = { medals: { ...e.medals }, best: { ...e.best } };
  a && (o.medals[t.id] = a);
  let s = e.best[t.id],
    c = yZ(t) ? n > s : n < s;
  n > 0 && (!s || c) && (o.best[t.id] = n);
  let l = (e) => new Set(vZ.filter((t) => SZ(t) && TZ(t, e)).map((e) => e.id)),
    u = l(e),
    d = [...l(o)].filter((e) => !u.has(e)),
    f = oZ.find((t) => !wZ(t, e) && wZ(t, o))?.id ?? null;
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
function MZ(e, t) {
  let n = vZ.filter(
      (n) => SZ(n) && TZ(n, e) && e.medals[n.id] !== `gold` && n.id !== t,
    ),
    r = vZ.find((e) => e.id === t);
  return (
    n.find((t) => !e.medals[t.id] && t.tier === r?.tier) ??
    n.find((t) => !e.medals[t.id]) ??
    n[0] ??
    null
  );
}
function NZ(e, t) {
  let n = OZ(e);
  for (let [e, r] of Object.entries(OZ(t).medals))
    n.medals[e] = AZ(n.medals[e] ?? null, r);
  for (let [e, r] of Object.entries(OZ(t).best)) {
    let t = vZ.find((t) => t.id === e),
      i = n.best[e];
    (!i || (yZ(t) ? r > i : r < i)) && (n.best[e] = r);
  }
  return n;
}
function PZ(e, t) {
  try {
    e?.setItem(rZ, JSON.stringify(t));
  } catch {}
}
function FZ(e) {
  let t = e ? vZ.find((t) => t.id === e) : null;
  return oZ.find((e) => e.id === t?.tier)?.cpuSkill ?? 1;
}
var IZ = `vector-race-difficulty`;
function LZ(e) {
  return oZ.some((t) => t.id === e) ? e : `pro`;
}
function RZ(e, t) {
  return e ? FZ(e) : (oZ.find((e) => e.id === LZ(t))?.cpuSkill ?? 1);
}
function zZ(e, t = 0) {
  let n = e ? vZ.find((t) => t.id === e) : null,
    r = n?.rounds ? n.rounds[t]?.reverse : n?.reverse;
  return { ...Vu, direction: r ? `reverse` : `normal` };
}
var BZ = [10, 8, 6, 5, 4, 3, 2, 1];
function VZ(e, t) {
  let n = {};
  for (let [t, r] of Object.entries(e)) n[t] = [...r];
  return (t.forEach((e, t) => (n[e] = [...(n[e] ?? []), t + 1])), n);
}
function HZ(e, t, n = `player`) {
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
var UZ = (e) => e.reduce((e, t) => e + (BZ[t - 1] ?? 0), 0);
