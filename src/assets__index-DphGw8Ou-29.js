// assets__index-DphGw8Ou 29 — math
// Lines 79011-79164 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
var A1 = /28de|045e|x-?box|xinput|steam/i,
  j1 = (e) => ({ pressed: e > 0.5, touched: e > 0, value: e });
function M1(e, t) {
  if (
    e.mapping === `standard` ||
    e.buttons.length !== 11 ||
    e.axes.length < 8 ||
    !A1.test(e.id)
  )
    return e;
  let n = (t) => (Number.isFinite(e.axes[t]) ? e.axes[t] : 0),
    r = (r) => {
      let i = `${e.id}#${e.index}:${r}`;
      return (
        n(r) <= -0.5 && t.add(i),
        t.has(i) ? Math.min(1, Math.max(0, (n(r) + 1) / 2)) : 0
      );
    },
    i = (t) => e.buttons[t] ?? j1(0);
  return {
    id: e.id,
    index: e.index,
    connected: e.connected,
    timestamp: e.timestamp,
    mapping: `standard`,
    axes: [n(0), n(1), n(3), n(4)],
    buttons: [
      ...[0, 1, 2, 3, 4, 5].map(i),
      j1(r(2)),
      j1(r(5)),
      i(6),
      i(7),
      i(9),
      i(10),
      j1(+(n(7) < -0.5)),
      j1(+(n(7) > 0.5)),
      j1(+(n(6) < -0.5)),
      j1(+(n(6) > 0.5)),
      i(8),
    ],
    vibrationActuator: e.vibrationActuator ?? null,
    hapticActuators: e.hapticActuators ?? [],
  };
}
function N1(e) {
  let t = !1,
    n,
    r = new Map(),
    i = new Set();
  return () => {
    if (t) return;
    let a;
    try {
      a = e.getGamepads?.();
    } catch {
      t = !0;
      return;
    }
    let o,
      s,
      c,
      l,
      u = new Set(),
      d = new Map();
    a?.forEach((e, t) => {
      if (!e?.connected) return;
      let a = M1(e, i);
      (u.add(t), d.set(a, t), (o ??= a), t === n && (s = a));
      let f = r.get(t),
        p = a.buttons.map((e) => e.pressed || e.value > 0.5),
        m = a.axes.map((e) => (Number.isFinite(e) ? e : 0)),
        h = p.some(Boolean) || m.some((e) => Math.abs(e) > 0.35),
        g =
          p.some((e, t) => e && !f?.buttons[t]) ||
          m.some(
            (e, t) =>
              Math.abs(e) > 0.35 && Math.abs(e - (f?.axes[t] ?? 0)) > 0.2,
          );
      (h && !c && (c = a),
        g && ((l = a), (n = t)),
        r.set(t, { buttons: p, axes: m }));
    });
    for (let e of r.keys()) u.has(e) || r.delete(e);
    !s && !l && (n = void 0);
    let f = l ?? s ?? c ?? o;
    return (f && n === void 0 && (n = d.get(f)), f);
  };
}
var P1 = 0.08;
function F1(e) {
  if (!Number.isFinite(e) || Math.abs(e) <= 0.08) return 0;
  let t = Math.min(1, (Math.abs(e) - P1) / (1 - P1));
  return Math.sign(e) * t * (0.72 + 0.28 * t);
}
var I1 = [`ShiftRight`, `ShiftLeft`];
function L1(e) {
  let t = (...t) => +!!t.some((t) => e.has(t)),
    n = t(`KeyA`, `ArrowLeft`),
    r = t(`KeyD`, `ArrowRight`),
    i = t(...I1);
  return {
    steer: r - n,
    throttle: t(`KeyW`, `ArrowUp`),
    brake: t(`KeyS`, `ArrowDown`),
    airLeft: Math.max(t(`KeyQ`), i * n),
    airRight: Math.max(t(`KeyE`), i * r),
    tapLeft: t(`KeyQ`),
    tapRight: t(`KeyE`),
    fire: !!t(`Space`),
    absorb: !!t(`KeyX`),
  };
}
var R1 = {
  dead: 0.04,
  full: 0.42,
  curve: 1.6,
  airFrom: 0.5,
  airTravel: 0.4,
  attack: 14,
  release: 26,
};
function z1(e, t, n = 0) {
  let r = Math.min(0.5, Math.max(-0.5, e - 0.5)),
    i = Math.abs(r) > R1.dead ? Math.sign(r) : n || Math.sign(r),
    a = Math.abs(r) - R1.dead,
    o =
      a <= 0
        ? 0
        : Math.sign(r) * Math.min(1, a / (R1.full - R1.dead)) ** R1.curve,
    s = 1 - Math.min(1, Math.max(0, t)),
    c = Math.min(1, Math.max(0, (s - R1.airFrom) / R1.airTravel));
  return { steer: o, airLeft: i < 0 ? c : 0, airRight: i > 0 ? c : 0 };
}
function B1(e, t, n) {
  if (!(n > 0)) return e;
  let r =
    Math.abs(t) > Math.abs(e) && Math.sign(t) !== -Math.sign(e)
      ? R1.attack
      : R1.release;
  return e + (t - e) * (1 - Math.exp(-n * r));
}
function V1(e) {
  let t = 0,
    n = 0,
    r = !1,
    i = !1;
  for (let { from: a, over: o } of e)
    (o === `brake`
      ? (n = 1)
      : (a === `accelerate` || o === `accelerate`) && (t = 1),
      o === `use` && (r = !0),
      o === `absorb` && (i = !0));
  return { throttle: t, brake: n, fire: r, absorb: i };
}
