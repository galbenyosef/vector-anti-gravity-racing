// assets__index-DF2rMRzV 19 — math
// Lines 74204-74552 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
var l$ = class {
    constructor(e = o$) {
      ((this.alongTrackSpeed = e),
        (this.tracks = new Map()),
        (this.latest = -1),
        (this.receivedAt = 0),
        (this.sincePacket = 0),
        (this.cursor = 0),
        (this.cadence = 1 / 25),
        (this.jitter = 0),
        (this.delay = t$),
        (this.rate = 1),
        (this.paused = !1),
        (this.before = s$()),
        (this.after = s$()));
    }
    get playbackTime() {
      return this.cursor;
    }
    get bufferDelay() {
      return this.delay;
    }
    get snapshotCount() {
      let e = 0;
      for (let t of this.tracks.values()) e = Math.max(e, t.frames.length);
      return e;
    }
    reset() {
      (this.tracks.clear(),
        (this.latest = -1),
        (this.receivedAt = this.sincePacket = this.cursor = 0),
        (this.cadence = 1 / 25),
        (this.jitter = 0),
        (this.delay = t$),
        (this.rate = 1),
        (this.paused = !1));
    }
    push(e, t, n) {
      if (
        !Number.isFinite(e) ||
        !Number.isFinite(t) ||
        e < 0 ||
        e < this.latest
      )
        return;
      if (e === this.latest) {
        if (!this.paused) {
          for (let e of this.tracks.values())
            if (e.shown) {
              (this.read(e, this.before, !1), this.read(e, this.after, !0));
              for (let t of $Q) e.offset[t] += this.before[t] - this.after[t];
            }
        }
        ((this.paused = !0),
          (this.sincePacket = 0),
          (this.receivedAt = Math.max(this.receivedAt, t)));
        return;
      }
      if (this.latest >= 0) {
        let n = e - this.latest,
          r = Math.max(0, t - this.receivedAt);
        ((this.cadence +=
          (a$(n, 0.01, this.cadence * 1.5) - this.cadence) * 0.05),
          (this.jitter += (Math.abs(r - n) - this.jitter) * 0.1));
        let i = a$(this.cadence * 2 + this.jitter * 3, t$, n$);
        this.delay += (i - this.delay) * (i > this.delay ? 0.35 : 0.025);
      } else this.cursor = e - this.delay;
      let r = this.paused;
      ((this.latest = e),
        (this.receivedAt = t),
        (this.sincePacket = 0),
        (this.paused = !1));
      let i = new Set();
      for (let t of n) {
        i.add(t.id);
        let n = this.tracks.get(t.id);
        n ||
          ((n = { frames: [], distance: -1 / 0, offset: s$(), shown: !1 }),
          this.tracks.set(t.id, n));
        let a = n.shown;
        a && this.read(n, this.before, r);
        let o = n.frames[n.frames.length - 1],
          s = Math.max(0, this.alongTrackSpeed(t.state));
        if (o) {
          let r = e - o.time,
            i = t.state.distance - o.pose.distance,
            c = Math.max(s, o.forward) * r * 1.5 + 15;
          if (
            t.state.recoverySerial !== o.pose.recoverySerial ||
            i < -0.05 ||
            i > c
          ) {
            ((n.frames.length = 0), (n.distance = -1 / 0));
            for (let e of $Q) n.offset[e] = 0;
            a = !1;
          }
        }
        let c = {};
        for (let e of $Q) c[e] = t.state[e];
        if (
          ((c.recoverySerial = t.state.recoverySerial),
          (c.mode = t.state.mode),
          n.frames.push({ time: e, pose: c, forward: s }),
          n.frames.length > e$ && n.frames.shift(),
          a)
        ) {
          this.read(n, this.after);
          for (let e of $Q) n.offset[e] += this.before[e] - this.after[e];
        }
      }
      for (let e of this.tracks.keys()) i.has(e) || this.tracks.delete(e);
    }
    advance(e) {
      if (this.latest < 0 || !Number.isFinite(e) || e <= 0) return;
      this.sincePacket += e;
      let t = this.latest + (this.paused ? 0 : i$),
        n = a$(
          1 +
            (Math.min(
              t,
              this.latest +
                (this.paused ? 0 : this.sincePacket - e) -
                this.delay,
            ) -
              this.cursor) *
              3,
          0.85,
          1.15,
        );
      ((this.rate += (n - this.rate) * (1 - Math.exp(-e * 5))),
        this.cursor < t &&
          (this.cursor = Math.min(t, this.cursor + e * this.rate)));
      let r = 1 - Math.exp(-e * 12);
      for (let t of this.tracks.values())
        for (let n of $Q) {
          let i = t.offset[n] * r,
            a = n === `distance` ? e * 18 : n === `lane` ? e * 4 : 1 / 0;
          t.offset[n] -= a$(i, -a, a);
        }
    }
    sample(e, t) {
      let n = this.tracks.get(e);
      if (!n || !n.frames.length) return !1;
      this.read(n, t);
      for (let e of $Q) t[e] += n.offset[e];
      return (
        (t.speed = Math.max(0, t.speed)),
        (t.boostTime = Math.max(0, t.boostTime)),
        (t.turboTime = Math.max(0, t.turboTime)),
        (t.hitStun = Math.max(0, t.hitStun)),
        (t.throttle = a$(t.throttle, 0, 1)),
        (t.airbrake = a$(t.airbrake, -1, 1)),
        (t.distance = Math.max(n.distance, t.distance)),
        (n.distance = t.distance),
        (n.shown = !0),
        !0
      );
    }
    read(e, t, n = this.paused) {
      let r = e.frames,
        i = r[0],
        a = i;
      for (
        let e = 1;
        e < r.length && ((a = r[e]), !(a.time >= this.cursor));
        e++
      )
        i = a;
      if (this.cursor <= i.time || i === a) for (let e of $Q) t[e] = i.pose[e];
      else {
        let e = a.time - i.time,
          n = a$((this.cursor - i.time) / e, 0, 1);
        for (let e of $Q) t[e] = i.pose[e] + (a.pose[e] - i.pose[e]) * n;
        ((t.distance = c$(
          i.pose.distance,
          a.pose.distance,
          i.forward,
          a.forward,
          e,
          n,
        )),
          (t.lane = c$(
            i.pose.lane,
            a.pose.lane,
            i.pose.lateralVelocity,
            a.pose.lateralVelocity,
            e,
            n,
          )));
      }
      let o = r[r.length - 1];
      if (this.cursor > o.time && !n && o.pose.mode !== `countdown`) {
        let e = a$(this.cursor - o.time, 0, i$),
          n = Math.max(0, e - r$),
          r = e - (n * n) / (2 * (i$ - r$));
        ((t.distance = o.pose.distance + o.forward * r),
          (t.lane = o.pose.lane + a$(o.pose.lateralVelocity * r, -1.5, 1.5)));
      }
    }
  },
  u$ = { steer: 0, throttle: 0, brake: 0, airLeft: 0, airRight: 0 },
  d$ = 1 / 120,
  f$ = 1 / 25,
  p$ = 1 / 60,
  m$ = 8,
  h$ = 240,
  g$ = 3,
  _$ = 120,
  v$ = 1e4,
  y$ = (e) => Math.round(e * v$) / v$,
  b$ =
    `distance.lane.lateralVelocity.heading.yawRate.hoverHeight.hoverVelocity.airHeight.airSpeed.airTime.landingSerial.landingImpact.pitch.roll.slideYaw.throttle.airbrake.airLeftHeld.airRightHeld.airLeftTap.airRightTap.shiftCooldown.shiftTime.shiftDirection.shiftSerial.contactSide.collisionSerial.wallContacts.shipContacts.impact.steer.speed.hull.protection.recoverySerial.elapsed.lapStart.lap.countdown.boostTime.turboTime.hitStun.lastBoostPad.collisionCooldown.padCooldown.clock.bestLap.lastLap.sessionBest.flagAt.raceDistance`.split(
      `.`,
    ),
  x$ = (e) => typeof e == `number` && Number.isFinite(e),
  S$ = (e, t, n) => Math.max(t, Math.min(n, e));
function C$(e) {
  let t = [
    e.steer,
    e.throttle,
    e.brake,
    e.airLeft,
    e.airRight,
    !!e.fire | (e.absorb ? 2 : 0),
  ];
  return (
    (e.tapLeft !== void 0 || e.tapRight !== void 0) &&
      t.push(e.tapLeft ?? -1, e.tapRight ?? -1),
    t
  );
}
function w$(e) {
  if (!Array.isArray(e) || (e.length !== 6 && e.length !== 8)) return null;
  let t = (e) => x$(e) && e >= 0 && e <= 1,
    [n, r, i, a, o, s, c, l] = e;
  if (
    !x$(n) ||
    Math.abs(n) > 1 ||
    !t(r) ||
    !t(i) ||
    !t(a) ||
    !t(o) ||
    !Number.isInteger(s) ||
    Number(s) < 0 ||
    Number(s) > 3
  )
    return null;
  let u = {
    steer: n,
    throttle: r,
    brake: i,
    airLeft: a,
    airRight: o,
    fire: (Number(s) & 1) == 1,
    absorb: (Number(s) & 2) == 2,
  };
  if (e.length === 8) {
    for (let [e, n] of [
      [`tapLeft`, c],
      [`tapRight`, l],
    ])
      if (n !== -1) {
        if (!t(n)) return null;
        u[e] = n;
      }
  }
  return u;
}
function T$(e) {
  let t = {
    steer: y$(e.steer),
    throttle: y$(e.throttle),
    brake: y$(e.brake),
    airLeft: y$(e.airLeft),
    airRight: y$(e.airRight),
    fire: !!e.fire,
    absorb: !!e.absorb,
  };
  return (
    e.tapLeft !== void 0 && (t.tapLeft = y$(e.tapLeft)),
    e.tapRight !== void 0 && (t.tapRight = y$(e.tapRight)),
    t
  );
}
var E$ = new Set([
  `lap`,
  `shiftSerial`,
  `collisionSerial`,
  `recoverySerial`,
  `landingSerial`,
  `lastBoostPad`,
  `wallContacts`,
  `shipContacts`,
]);
function D$(e, t) {
  if (e.mode !== t.mode) return `mode`;
  if (e.lastCollision !== t.lastCollision) return `lastCollision`;
  if (e.boostActive !== t.boostActive) return `boostActive`;
  if (e.lapTimes.length !== t.lapTimes.length) return `lapTimes`;
  for (let n of b$)
    if (E$.has(n)) {
      if (e[n] !== t[n]) return n;
    } else if (Math.abs(e[n] - t[n]) > 0.002) return n;
  return ``;
}
function O$(e) {
  if (!e || typeof e != `object`) return !1;
  let t = e;
  return (
    b$.every((e) => x$(t[e])) &&
    [`countdown`, `racing`, `finished`].includes(t.mode) &&
    t.distance >= 0 &&
    t.distance <= $ * (t.mode === `finished` ? 4 : 3) + 5 &&
    t.raceDistance >= 0 &&
    t.raceDistance <= $ * 3 + 5 &&
    (t.mode === `finished`
      ? t.distance >= t.raceDistance - 1 && t.distance <= t.raceDistance + $ + 1
      : t.raceDistance === 0) &&
    t.flagAt >= 0 &&
    t.flagAt <= t.clock &&
    Math.abs(t.lane) <= 14 &&
    Math.abs(t.heading) <= 1.3 &&
    t.hoverHeight >= 0.7 &&
    t.hoverHeight <= 3.6 &&
    t.airHeight >= -20 &&
    t.airHeight <= 80 &&
    t.airTime >= 0 &&
    t.airTime <= 12 &&
    [`none`, `wall`, `ship`].includes(t.lastCollision) &&
    t.hull >= 0 &&
    t.hull <= 100 &&
    t.protection >= 0 &&
    t.protection <= 1.3 &&
    t.speed >= 0 &&
    t.speed <= $u.turbo + 1 &&
    t.turboTime >= 0 &&
    t.turboTime <= $u.turboDuration &&
    t.hitStun >= 0 &&
    t.hitStun <= 0.75 &&
    t.elapsed >= 0 &&
    t.elapsed <= 250 &&
    t.lap >= 1 &&
    t.lap <= 3 &&
    Array.isArray(t.lapTimes) &&
    t.lapTimes.length <= 3 &&
    t.lapTimes.every((e) => x$(e) && e >= 0 && e <= 250) &&
    typeof t.boostActive == `boolean`
  );
}
