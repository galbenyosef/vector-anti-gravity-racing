// assets__index-DF2rMRzV 18 — math
// Lines 74031-74203 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function YQ(e) {
  if (!e || typeof e != `object`) return null;
  let t = e;
  if (
    !Array.isArray(t.ids) ||
    t.ids.length > 8 ||
    !t.ids.every(
      (e) =>
        typeof e == `string` &&
        e.length <= 80 &&
        ![`__proto__`, `constructor`, `prototype`].includes(e),
    ) ||
    new Set(t.ids).size !== t.ids.length ||
    !Array.isArray(t.u) ||
    t.u.length !== t.ids.length ||
    !t.u.every((e) => Array.isArray(e) && e.length === KQ.length) ||
    !Array.isArray(t.p) ||
    t.p.length > 160 ||
    !t.p.every((e) => Array.isArray(e) && e.length === 10) ||
    !Array.isArray(t.e) ||
    t.e.length > 80 ||
    !t.e.every((e) => Array.isArray(e) && e.length === 7)
  )
    return null;
  let n = {};
  t.ids.forEach((e, r) => {
    n[e] = Object.fromEntries(KQ.map((e, n) => [e, t.u[r][n]]));
  });
  let r = {
    clock: t.t,
    serial: t.n,
    pilots: n,
    pads: t.d,
    projectiles: t.p.map((e) => ({
      id: e[0],
      owner: t.ids[e[1]],
      kind: nX[e[2]],
      distance: e[3],
      lane: e[4],
      heading: e[5],
      age: e[6],
      life: e[7],
      target: e[8] === -1 ? `` : t.ids[e[8]],
      targetRecovery: e[9],
    })),
    events: t.e.map((e) => ({
      id: e[0],
      time: e[1],
      kind: qQ[e[2]],
      item: rX[e[3]],
      owner: t.ids[e[4]],
      distance: e[5],
      lane: e[6],
    })),
  };
  return fX(r) ? r : null;
}
var XQ = [
    `distance`,
    `lane`,
    `heading`,
    `roll`,
    `pitch`,
    `hoverHeight`,
    `airHeight`,
    `speed`,
    `slideYaw`,
    `steer`,
    `throttle`,
    `airbrake`,
  ],
  ZQ = (e) => ((((e + $ / 2) % $) + $) % $) - $ / 2,
  QQ = class {
    constructor() {
      ((this.pose = {}),
        (this.previous = {}),
        (this.correction = {}),
        (this.initialized = !1));
    }
    reset(e) {
      for (let t of XQ)
        ((this.pose[t] = this.previous[t] = e[t]), (this.correction[t] = 0));
      ((this.pose.clock = e.clock),
        (this.initialized = !0),
        (e.networkPose = this.pose));
    }
    beforeStep(e) {
      this.initialized || this.reset(e);
      for (let t of XQ) this.previous[t] = e[t];
    }
    reconcile(e, t, n) {
      if (
        !this.initialized ||
        t ||
        Math.abs(ZQ(this.pose.distance - e.distance)) > 60
      ) {
        this.reset(e);
        return;
      }
      for (let t of XQ) {
        let r = t === `distance` ? ZQ(e[t] - n[t]) : e[t] - n[t];
        ((this.previous[t] += r), (this.correction[t] -= r));
      }
    }
    update(e, t, n) {
      this.initialized || this.reset(e);
      let r = Math.max(0, Math.min(1, n)),
        i = Math.exp(-Math.max(0, t) / 0.11);
      for (let t of XQ) {
        this.correction[t] *= i;
        let n =
          t === `distance`
            ? ZQ(e[t] - this.previous[t])
            : e[t] - this.previous[t];
        this.pose[t] = this.previous[t] + n * r + this.correction[t];
      }
      let a = LY(this.pose.distance) - 2.5;
      ((this.pose.lane = Math.max(-a, Math.min(a, this.pose.lane))),
        (this.pose.clock += Math.max(0, t)),
        (e.networkPose = this.pose));
    }
  },
  $Q = [
    `distance`,
    `lane`,
    `speed`,
    `lateralVelocity`,
    `heading`,
    `yawRate`,
    `hoverHeight`,
    `hoverVelocity`,
    `airHeight`,
    `pitch`,
    `roll`,
    `slideYaw`,
    `steer`,
    `throttle`,
    `airbrake`,
    `boostTime`,
    `turboTime`,
    `hitStun`,
  ],
  e$ = 32,
  t$ = 0.08,
  n$ = 0.18,
  r$ = 0.04,
  i$ = 0.12,
  a$ = (e, t, n) => Math.max(t, Math.min(n, e)),
  o$ = (e) => Math.max(0, e.speed) * Math.max(0.3, Math.cos(e.heading));
function s$() {
  let e = {};
  for (let t of $Q) e[t] = 0;
  return e;
}
function c$(e, t, n, r, i, a) {
  let o = t - e;
  if (Math.abs(o) < 1e-8) return e;
  let s = o / i,
    c = Math.max(0, n / s),
    l = Math.max(0, r / s),
    u = Math.hypot(c, l);
  u > 3 && ((c *= 3 / u), (l *= 3 / u));
  let d = a * a,
    f = d * a;
  return a$(
    (2 * f - 3 * d + 1) * e +
      (f - 2 * d + a) * o * c +
      (-2 * f + 3 * d) * t +
      (f - d) * o * l,
    Math.min(e, t),
    Math.max(e, t),
  );
}
