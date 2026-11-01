// assets__game-D43Oxqny 98 — math
// Lines 40998-41305 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Kw(e) {
  return Array.isArray(e)
    ? [...new Set(e.filter((e) => typeof e == `string` && Gw.test(e)))].sort()
    : [];
}
function qw(e) {
  try {
    return Kw(JSON.parse(e?.getItem(`vector-feats-v1`) ?? `null`));
  } catch {
    return [];
  }
}
function Jw(e, t) {
  try {
    e?.setItem(Ww, JSON.stringify(Kw(t)));
  } catch {}
}
function Yw(e) {
  if (e.kind === `orbs`)
    return e.orbs && e.orbs.total > 0 && e.orbs.taken >= e.orbs.total
      ? [`orbs-perfect`]
      : [];
  if (e.kind !== `race`) return [];
  let t = [`ship:${e.ship}`],
    n = !e.online && e.rivals >= 7;
  return (
    e.place === 1 &&
      (t.push(`win:${e.circuit}`),
      e.reverse && t.push(`reverse-win`),
      n && e.minHull >= 100 && t.push(`flawless-win`),
      n && e.cpuSkill >= 1 && t.push(`phantom-win`)),
    e.online && e.host && t.push(`online-host`),
    e.online && e.pilots >= 4 && t.push(`online-crowd`),
    t
  );
}
function Xw(e, t, n) {
  let r = (t ? c : or)[e];
  return r && n > 0 && n < r ? [`par:${e}`] : [];
}
var Zw = class {
    constructor() {
      ((this.active = !1),
        (this.judged = !1),
        (this.minHull = 100),
        (this.laps = 0));
    }
    begin() {
      ((this.active = !0),
        (this.judged = !1),
        (this.minHull = 100),
        (this.laps = 0));
    }
    observe(e, t) {
      if (!this.active || e.mode === `menu`) return [];
      let n = e.networked ? t.session : null,
        r = n?.players.find((e) => e.id === n.selfId);
      if (e.networked && !r) return [];
      let i = r?.state ?? e;
      i.mode === `racing` && (this.minHull = Math.min(this.minHull, i.hull));
      let a = e.modifiers.direction === `reverse`,
        o = [];
      if (e.kind === `timed-lap` && !e.networked) {
        for (let n of e.lapTimes.slice(this.laps))
          o.push(...Xw(t.circuit, a, n));
        this.laps = e.lapTimes.length;
      }
      if (
        i.mode === `finished` &&
        !r?.dnf &&
        (e.kind === `orbs` || i.lapTimes.length === t.laps) &&
        !this.judged &&
        e.kind !== `timed-lap`
      ) {
        this.judged = !0;
        let i =
          e.kind === `orbs`
            ? 0
            : r && n
              ? tr(n.players).findIndex((e) => e.id === r.id) + 1
              : e.position;
        o.push(
          ...Yw({
            kind: e.kind,
            circuit: t.circuit,
            reverse: a,
            ship: t.ship,
            place: i,
            rivals: e.rivals.length,
            cpuSkill: t.cpuSkill,
            online: !!n,
            host: !!n?.isHost,
            pilots: n?.players.length ?? 1,
            minHull: this.minHull,
            orbs:
              e.kind === `orbs`
                ? { taken: e.orbsTaken, total: e.orbs.length }
                : null,
          }),
        );
      }
      return o;
    }
  },
  Qw = `vector-ghost-v1:`,
  $w = 4800,
  eT = (e, t) => `${e}:${t}`,
  tT = (e, t) =>
    Array.isArray(e) &&
    e.length === t &&
    e.every((e) => Number.isInteger(e) && Math.abs(e) < 1e7),
  nT = [`d`, `l`, `h`, `r`, `p`, `y`];
function rT(e) {
  let t = { ...e, delta: 1 };
  for (let n of nT) t[n] = e[n].map((e, t, n) => (t ? e - n[t - 1] : e));
  return t;
}
function iT(e) {
  if (!e || typeof e != `object`) return null;
  let t = e;
  if (t.delta === 1) {
    ((t = { ...t }), delete t.delta);
    for (let e of nT) {
      let n = t[e];
      if (!Array.isArray(n)) return null;
      let r = 0;
      t[e] = n.map((e) => (r += Number(e)));
    }
  }
  let n = t,
    r = Array.isArray(n.d) ? n.d.length : 0;
  return n.v !== 1 ||
    typeof n.circuit != `string` ||
    (n.direction !== `normal` && n.direction !== `reverse`) ||
    typeof n.lap != `number` ||
    !Number.isFinite(n.lap) ||
    n.lap <= 0 ||
    typeof n.ship != `string` ||
    typeof n.skin != `string` ||
    n.hz !== 20 ||
    r < 2 ||
    r > $w ||
    !tT(n.d, r) ||
    !tT(n.l, r) ||
    !tT(n.h, r) ||
    !tT(n.r, r) ||
    !tT(n.p, r) ||
    !tT(n.y, r)
    ? null
    : n;
}
var aT = (e, t) => (e ? (t && t.lap < e.lap ? t : e) : t);
function oT(e, t, n) {
  try {
    return iT(JSON.parse(e?.getItem(`vector-ghost-v1:` + eT(t, n)) ?? `null`));
  } catch {
    return null;
  }
}
function sT(e, t) {
  try {
    e?.setItem(Qw + eT(t.circuit, t.direction), JSON.stringify(rT(t)));
  } catch {}
}
function cT(e, t) {
  let n = e.d.length - 1,
    r = Math.max(0, Math.min(n, t * e.hz)),
    i = Math.min(n - 1, Math.floor(r)),
    a = r - i,
    o = (e) => e[i] + (e[i + 1] - e[i]) * a;
  return {
    distance: o(e.d) / 10,
    lane: o(e.l) / 100,
    heading: o(e.h) / 1e3,
    roll: o(e.r) / 1e3,
    pitch: o(e.p) / 1e3,
    height: Math.max(0, o(e.y) / 100),
  };
}
function lT(e, t) {
  let n = t * 10,
    r = e.d;
  if (n <= r[0]) return 0;
  if (n >= r[r.length - 1]) return e.lap;
  let i = 0,
    a = r.length - 1;
  for (; a - i > 1;) {
    let e = (i + a) >> 1;
    r[e] <= n ? (i = e) : (a = e);
  }
  let o = r[a] - r[i],
    s = o > 0 ? (n - r[i]) / o : 0;
  return Math.min(e.lap, (i + s) / e.hz);
}
function uT(e, t, n) {
  return t < 1 || n <= 0 ? null : t - lT(e, n);
}
function dT(e, t, n, r) {
  if (e.length < 2 || !(t > 0)) return null;
  let i = e[e.length - 1],
    a = [...e, { ...i, t, distance: n }],
    o = Math.min($w, Math.floor(t * 20) + 1),
    s = {
      v: 1,
      ...r,
      lap: t,
      hz: 20,
      d: [],
      l: [],
      h: [],
      r: [],
      p: [],
      y: [],
    },
    c = 0,
    l = 0;
  for (let e = 0; e < o; e++) {
    let t = e / 20;
    for (; c < a.length - 2 && a[c + 1].t < t;) c++;
    let n = a[c],
      r = a[c + 1],
      i = r.t > n.t ? Math.max(0, Math.min(1, (t - n.t) / (r.t - n.t))) : 0,
      o = (e, t) => e + (t - e) * i;
    ((l = Math.max(l, Math.round(o(n.distance, r.distance) * 10))),
      s.d.push(l),
      s.l.push(Math.round(o(n.lane, r.lane) * 100)),
      s.h.push(Math.round(o(n.heading, r.heading) * 1e3)),
      s.r.push(Math.round(o(n.roll, r.roll) * 1e3)),
      s.p.push(Math.round(o(n.pitch, r.pitch) * 1e3)),
      s.y.push(Math.round(Math.max(0, o(n.height, r.height)) * 100)));
  }
  return (
    s.d.push(Math.round(n * 10)),
    s.l.push(Math.round(i.lane * 100)),
    s.h.push(Math.round(i.heading * 1e3)),
    s.r.push(Math.round(i.roll * 1e3)),
    s.p.push(Math.round(i.pitch * 1e3)),
    s.y.push(Math.round(Math.max(0, i.height) * 100)),
    iT(s)
  );
}
var fT = class {
    constructor() {
      ((this.frames = []), (this.completed = 0), (this.whole = !1));
    }
    begin() {
      ((this.frames = []), (this.completed = 0), (this.whole = !0));
    }
    observe(e, t, n, r) {
      if (e.mode !== `racing`) return null;
      let i = null;
      if (e.lapTimes.length > this.completed) {
        let t = e.lapTimes[e.lapTimes.length - 1];
        (this.whole &&
          e.lapTimes.length === this.completed + 1 &&
          (i = dT(this.frames, t, n, r)),
          (this.completed = e.lapTimes.length),
          (this.frames = []),
          (this.whole = !0));
      }
      let a = e.elapsed - e.lapStart;
      !this.frames.length && a > 0.5 && (this.whole = !1);
      let o = this.frames[this.frames.length - 1];
      return (
        (!o || a > o.t) &&
          this.frames.push({
            t: a,
            ...t,
            distance: e.distance - (e.lap - 1) * n,
          }),
        i
      );
    }
  },
  pT = `/vector/progress-v1.json`,
  mT = `vector-progress-sync`,
  hT = 1500,
  gT = { career: qe(null), laps: {}, feats: [], ghosts: {} };
function _T(e) {
  let t = e && typeof e == `object` ? e : {},
    n = {};
  if (t.laps && typeof t.laps == `object`)
    for (let [e, r] of Object.entries(t.laps))
      e.startsWith(`vector-best-lap-`) &&
        typeof r == `number` &&
        Number.isFinite(r) &&
        r > 0 &&
        (n[e] = r);
  let r = {};
  if (t.ghosts && typeof t.ghosts == `object`)
    for (let [e, n] of Object.entries(t.ghosts)) {
      let t = iT(n);
      t && e === eT(t.circuit, t.direction) && (r[e] = t);
    }
  return { career: qe(t.career), laps: n, feats: Kw(t.feats), ghosts: r };
}
function vT(e, t) {
  let n = { ...e.laps };
  for (let [e, r] of Object.entries(t.laps)) n[e] <= r || (n[e] = r);
  let r = { ...e.ghosts };
  for (let [e, n] of Object.entries(t.ghosts)) r[e] = aT(r[e] ?? null, n);
  return {
    career: ie(e.career, t.career),
    laps: n,
    feats: Kw([...e.feats, ...t.feats]),
    ghosts: r,
  };
}
