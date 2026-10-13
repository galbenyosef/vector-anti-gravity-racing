// assets__index-DphGw8Ou 17 — math
// Lines 73868-74216 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
var YQ = class {
    constructor(e = KQ) {
      ((this.alongTrackSpeed = e),
        (this.tracks = new Map()),
        (this.latest = -1),
        (this.receivedAt = 0),
        (this.sincePacket = 0),
        (this.cursor = 0),
        (this.cadence = 1 / 25),
        (this.jitter = 0),
        (this.delay = VQ),
        (this.rate = 1),
        (this.paused = !1),
        (this.before = qQ()),
        (this.after = qQ()));
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
        (this.delay = VQ),
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
              for (let t of zQ) e.offset[t] += this.before[t] - this.after[t];
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
          (GQ(n, 0.01, this.cadence * 1.5) - this.cadence) * 0.05),
          (this.jitter += (Math.abs(r - n) - this.jitter) * 0.1));
        let i = GQ(this.cadence * 2 + this.jitter * 3, VQ, HQ);
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
          ((n = { frames: [], distance: -1 / 0, offset: qQ(), shown: !1 }),
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
            for (let e of zQ) n.offset[e] = 0;
            a = !1;
          }
        }
        let c = {};
        for (let e of zQ) c[e] = t.state[e];
        if (
          ((c.recoverySerial = t.state.recoverySerial),
          (c.mode = t.state.mode),
          n.frames.push({ time: e, pose: c, forward: s }),
          n.frames.length > BQ && n.frames.shift(),
          a)
        ) {
          this.read(n, this.after);
          for (let e of zQ) n.offset[e] += this.before[e] - this.after[e];
        }
      }
      for (let e of this.tracks.keys()) i.has(e) || this.tracks.delete(e);
    }
    advance(e) {
      if (this.latest < 0 || !Number.isFinite(e) || e <= 0) return;
      this.sincePacket += e;
      let t = this.latest + (this.paused ? 0 : WQ),
        n = GQ(
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
        for (let n of zQ) {
          let i = t.offset[n] * r,
            a = n === `distance` ? e * 18 : n === `lane` ? e * 4 : 1 / 0;
          t.offset[n] -= GQ(i, -a, a);
        }
    }
    sample(e, t) {
      let n = this.tracks.get(e);
      if (!n || !n.frames.length) return !1;
      this.read(n, t);
      for (let e of zQ) t[e] += n.offset[e];
      return (
        (t.speed = Math.max(0, t.speed)),
        (t.boostTime = Math.max(0, t.boostTime)),
        (t.turboTime = Math.max(0, t.turboTime)),
        (t.hitStun = Math.max(0, t.hitStun)),
        (t.throttle = GQ(t.throttle, 0, 1)),
        (t.airbrake = GQ(t.airbrake, -1, 1)),
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
      if (this.cursor <= i.time || i === a) for (let e of zQ) t[e] = i.pose[e];
      else {
        let e = a.time - i.time,
          n = GQ((this.cursor - i.time) / e, 0, 1);
        for (let e of zQ) t[e] = i.pose[e] + (a.pose[e] - i.pose[e]) * n;
        ((t.distance = JQ(
          i.pose.distance,
          a.pose.distance,
          i.forward,
          a.forward,
          e,
          n,
        )),
          (t.lane = JQ(
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
        let e = GQ(this.cursor - o.time, 0, WQ),
          n = Math.max(0, e - UQ),
          r = e - (n * n) / (2 * (WQ - UQ));
        ((t.distance = o.pose.distance + o.forward * r),
          (t.lane = o.pose.lane + GQ(o.pose.lateralVelocity * r, -1.5, 1.5)));
      }
    }
  },
  XQ = { steer: 0, throttle: 0, brake: 0, airLeft: 0, airRight: 0 },
  ZQ = 1 / 120,
  QQ = 1 / 25,
  $Q = 1 / 60,
  e$ = 8,
  t$ = 240,
  n$ = 3,
  r$ = 120,
  i$ = 1e4,
  a$ = (e) => Math.round(e * i$) / i$,
  o$ =
    `distance.lane.lateralVelocity.heading.yawRate.hoverHeight.hoverVelocity.airHeight.airSpeed.airTime.landingSerial.landingImpact.pitch.roll.slideYaw.throttle.airbrake.airLeftHeld.airRightHeld.airLeftTap.airRightTap.shiftCooldown.shiftTime.shiftDirection.shiftSerial.contactSide.collisionSerial.wallContacts.shipContacts.impact.steer.speed.hull.protection.recoverySerial.elapsed.lapStart.lap.countdown.boostTime.turboTime.hitStun.lastBoostPad.collisionCooldown.padCooldown.clock.bestLap.lastLap.sessionBest.flagAt.raceDistance`.split(
      `.`,
    ),
  s$ = (e) => typeof e == `number` && Number.isFinite(e),
  c$ = (e, t, n) => Math.max(t, Math.min(n, e));
function l$(e) {
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
function u$(e) {
  if (!Array.isArray(e) || (e.length !== 6 && e.length !== 8)) return null;
  let t = (e) => s$(e) && e >= 0 && e <= 1,
    [n, r, i, a, o, s, c, l] = e;
  if (
    !s$(n) ||
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
function d$(e) {
  let t = {
    steer: a$(e.steer),
    throttle: a$(e.throttle),
    brake: a$(e.brake),
    airLeft: a$(e.airLeft),
    airRight: a$(e.airRight),
    fire: !!e.fire,
    absorb: !!e.absorb,
  };
  return (
    e.tapLeft !== void 0 && (t.tapLeft = a$(e.tapLeft)),
    e.tapRight !== void 0 && (t.tapRight = a$(e.tapRight)),
    t
  );
}
var f$ = new Set([
  `lap`,
  `shiftSerial`,
  `collisionSerial`,
  `recoverySerial`,
  `landingSerial`,
  `lastBoostPad`,
  `wallContacts`,
  `shipContacts`,
]);
function p$(e, t) {
  if (e.mode !== t.mode) return `mode`;
  if (e.lastCollision !== t.lastCollision) return `lastCollision`;
  if (e.boostActive !== t.boostActive) return `boostActive`;
  if (e.lapTimes.length !== t.lapTimes.length) return `lapTimes`;
  for (let n of o$)
    if (f$.has(n)) {
      if (e[n] !== t[n]) return n;
    } else if (Math.abs(e[n] - t[n]) > 0.002) return n;
  return ``;
}
function m$(e) {
  if (!e || typeof e != `object`) return !1;
  let t = e;
  return (
    o$.every((e) => s$(t[e])) &&
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
    t.speed <= Yu.turbo + 1 &&
    t.turboTime >= 0 &&
    t.turboTime <= Yu.turboDuration &&
    t.hitStun >= 0 &&
    t.hitStun <= 0.75 &&
    t.elapsed >= 0 &&
    t.elapsed <= 250 &&
    t.lap >= 1 &&
    t.lap <= 3 &&
    Array.isArray(t.lapTimes) &&
    t.lapTimes.length <= 3 &&
    t.lapTimes.every((e) => s$(e) && e >= 0 && e <= 250) &&
    typeof t.boostActive == `boolean`
  );
}
