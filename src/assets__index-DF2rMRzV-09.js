// assets__index-DF2rMRzV 09 — math
// Lines 70908-71731 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
var RX = class e {
    constructor() {
      ((this.networked = !1),
        (this.networkPose = null),
        (this.predicting = !1),
        (this.kind = `race`),
        (this.mode = `menu`),
        (this.pausedFrom = `racing`),
        (this.distance = 0),
        (this.lane = -4.6),
        (this.lateralVelocity = 0),
        (this.heading = 0),
        (this.yawRate = 0),
        (this.hoverHeight = 1.05),
        (this.hoverVelocity = 0),
        (this.airHeight = 0),
        (this.airSpeed = 0),
        (this.airTime = 0),
        (this.landingSerial = 0),
        (this.landingImpact = 0),
        (this.pitch = 0),
        (this.roll = 0),
        (this.slideYaw = 0),
        (this.throttle = 0),
        (this.airbrake = 0),
        (this.airLoad = 0),
        (this.airLeftHeld = 0),
        (this.airRightHeld = 0),
        (this.airLeftTap = -10),
        (this.airRightTap = -10),
        (this.shiftCooldown = 0),
        (this.shiftTime = 0),
        (this.shiftDirection = 0),
        (this.shiftSerial = 0),
        (this.remoteSideShiftIntents = !1),
        (this.contactSide = 0),
        (this.collisionSerial = 0),
        (this.lastCollision = `none`),
        (this.wallContacts = 0),
        (this.shipContacts = 0),
        (this.steer = 0),
        (this.speed = 0),
        (this.hull = 100),
        (this.protection = 0),
        (this.recoverySerial = 0),
        (this.combatId = `player`),
        (this.combat = new dX()),
        (this.elapsed = 0),
        (this.lapStart = 0),
        (this.lap = 1),
        (this.lapTimes = []),
        (this.bestLap = 0),
        (this.sessionBest = 0),
        (this.orbs = []),
        (this.orbsTaken = 0),
        (this.lastLap = 0),
        (this.countdown = 3.4),
        (this.boostTime = 0),
        (this.turboTime = 0),
        (this.hitStun = 0),
        (this.lastBoostPad = -1),
        (this.boostActive = !1),
        (this.impact = 0),
        (this.collisionCooldown = 0),
        (this.padCooldown = 0),
        (this.position = 8),
        (this.message = ``),
        (this.messageTime = 0),
        (this.clock = 0),
        (this.flagAt = 0),
        (this.raceDistance = 0),
        (this.rivals = EX.map((e, t) => ({
          ...e,
          shipId: nd[t % nd.length].id,
          skin: `original`,
          distance: 15 + (6 - t) * 13,
          lane: t % 2 ? -4.8 : 4.8,
          speed: 0,
          phase: t * 1.8,
          heading: 0,
          lateralVelocity: 0,
          boostTime: 0,
          turboTime: 0,
          hitStun: 0,
          lastBoostPad: -1,
          boostActive: !1,
          padCooldown: 0,
          hull: 100,
          protection: 0,
          collisionCooldown: 0,
          recoverySerial: 0,
          airHeight: 0,
          airSpeed: 0,
          airTime: 0,
          finished: !1,
          finishTime: 0,
        }))),
        (this.settings = { ...gX }),
        (this.cpuSkill = 1),
        (this.modifiers = { ...Vu }));
    }
    get laps() {
      return this.kind === `orbs`
        ? 1
        : this.kind === `race`
          ? this.modifiers.laps
          : TJ.laps;
    }
    start(t = this.kind, n = 7645521, r = 1, i = Vu) {
      let a = this.settings,
        o = t === this.kind ? this.bestLap : 0;
      (Object.assign(this, new e()),
        (this.settings = a),
        (this.bestLap = o),
        (this.kind = t),
        (this.cpuSkill = DX(r, 0, 1)),
        (this.modifiers = Uu(i)),
        (this.rivals = this.rivals.slice(0, this.modifiers.cpuCount)),
        this.rivals.forEach((e, t) => {
          e.distance = 15 + (this.rivals.length - 1 - t) * 13;
        }),
        (this.position = this.rivals.length + 1),
        (t === `timed-lap` || t === `orbs`) &&
          ((this.rivals = []), (this.position = 1), (this.lane = 0)),
        t === `orbs` && (this.orbs = mX()),
        (this.combat = new dX(n)),
        (this.combat.cpuSkill = this.cpuSkill),
        (this.combat.enabled = this.modifiers.weapons),
        (this.combat.turboCap = t === `timed-lap` ? 1 / 0 : sX(this.laps)),
        this.combat.pilot(this.combatId, this));
      let s = od(n);
      (this.rivals.forEach((e, t) => {
        ((e.shipId = s[t]), this.combat.pilot(`cpu` + t, e));
      }),
        t === `timed-lap` &&
          this.modifiers.weapons &&
          this.combat.grantTurbo(this.combatId, this),
        (this.mode = `countdown`));
    }
    endSession() {
      this.kind === `timed-lap` && this.retire();
    }
    retire() {
      [`racing`, `countdown`, `paused`].includes(this.mode) &&
        ((this.mode = `finished`),
        (this.raceDistance = this.distance),
        (this.boostTime = this.turboTime = this.hitStun = 0),
        (this.boostActive = !1),
        (this.airbrake = 0));
    }
    get runout() {
      return this.mode === `finished` ? this.distance - this.raceDistance : 0;
    }
    get flagBeat() {
      return (
        this.mode === `finished` &&
        this.flagAt > 0 &&
        this.clock - this.flagAt < bX.beat
      );
    }
    pause() {
      this.mode === `racing` || this.mode === `countdown`
        ? ((this.pausedFrom = this.mode), (this.mode = `paused`))
        : this.mode === `paused` && (this.mode = this.pausedFrom);
    }
    announce(e, t = 2) {
      ((this.message = e), (this.messageTime = t));
    }
    update(e, t) {
      if (this.mode === `paused` || !Number.isFinite(e) || e <= 0) return;
      if (
        ((this.clock += e),
        (this.impact = Math.max(0, this.impact - e * 2.4)),
        (this.messageTime = Math.max(0, this.messageTime - e)),
        this.mode === `countdown`)
      ) {
        ((this.countdown -= e),
          this.countdown <= 0 &&
            ((this.mode = `racing`), this.announce(`GO`, 1.4)));
        return;
      }
      if (this.mode === `finished`) {
        (this.coolDown(e), this.advanceField(e, t));
        return;
      }
      if (this.mode !== `racing`) return;
      ((this.protection = Math.max(0, this.protection - e)),
        (this.elapsed += e),
        (this.padCooldown = Math.max(0, this.padCooldown - e)),
        (this.collisionCooldown = Math.max(0, this.collisionCooldown - e)),
        (this.boostTime = Math.max(0, this.boostTime - e)),
        (this.turboTime = Math.max(0, this.turboTime - e)),
        (this.hitStun = Math.max(0, this.hitStun - e)));
      let n = this.distance,
        r = this.lane;
      ((this.shiftCooldown = Math.max(0, this.shiftCooldown - e)),
        (this.shiftTime = Math.max(0, this.shiftTime - e)),
        this.updateSideShift(t));
      let i = bY(this.distance),
        a = t.airRight - t.airLeft,
        o = -DX(t.steer, -1, 1) * this.settings.sensitivity;
      this.steer += (o - this.steer) * (1 - Math.exp(-e * 55));
      let s = DX(Math.max(t.throttle, +!!this.settings.autoThrottle), 0, 1);
      ((this.throttle = s),
        (this.airbrake = -a),
        (this.airLoad = DX((t.airLeft + t.airRight) / 2, 0, 1)),
        (this.boostActive = this.boostTime > 0 || this.turboTime > 0));
      let c =
          (this.turboTime > 0
            ? $u.turbo
            : this.boostActive
              ? $u.boost
              : $u.cruise) * zY(this.distance),
        l = this.hitStun > 0 ? 0.18 : 1,
        u = t.airLeft + t.airRight,
        d = Math.abs(a),
        f = Math.min(t.airLeft, t.airRight),
        p =
          l *
            (s * $u.acceleration +
              (this.turboTime > 0
                ? $u.turboAcceleration
                : this.boostActive
                  ? $u.boostAcceleration
                  : 0)) -
          7 -
          this.speed * (s > 0 ? 0.065 : 0.19) -
          t.brake * 105 -
          d * yX.drag -
          f * yX.brake -
          Math.abs(this.heading) * this.speed * 0.13 * (1 - d * (1 - yX.scrub));
      ((this.speed = DX(this.speed + p * e, 0, Math.max(c, this.speed))),
        (this.slideYaw +=
          (-a * yX.bodyYaw * Math.min(1, this.speed / 80) - this.slideYaw) *
          (1 - Math.exp(-e * 10))),
        this.speed > c && (this.speed = Math.max(c, this.speed - e * 34)));
      let m = Math.min(1, this.speed / 24),
        h = (this.steer * vX(this.speed) - a * yX.yaw) * m;
      this.yawRate +=
        (h - this.yawRate) *
        (1 -
          Math.exp(
            -e *
              (this.yawRate * h < 0
                ? 60
                : d > 0.05
                  ? yX.response
                  : _X.yawResponse),
          ));
      let g = RY(this.distance, this.lane),
        _ = this.speed * Math.max(0.3, Math.cos(this.heading)) * g,
        v = _X.headingDamping + (u > 0 ? 0.5 : 0),
        y = v + (yX.slideDamping - v) * d;
      this.heading = DX(
        this.heading + (this.yawRate - i.curvature * _ - this.heading * y) * e,
        -0.72,
        0.72,
      );
      let b = this.steer * this.lateralVelocity < -0.3,
        x = _X.grip + (u > 0 ? 5 : 0),
        S = x + (yX.slideGrip - x) * d + (b ? 9 : 0),
        C = Math.sin(this.heading) * this.speed;
      if (
        ((this.lateralVelocity +=
          (C - this.lateralVelocity) * (1 - Math.exp(-e * S))),
        this.speed < 0.1 && (this.lateralVelocity *= Math.exp(-e * 20)),
        (this.lane += this.lateralVelocity * e),
        (this.distance += _ * e),
        this.orbs.length &&
          (this.orbsTaken += hX(this.orbs, n, this.distance, this.lane)),
        this.touchDown(LX(this, n, _, e)),
        this.resolveWall(e),
        this.settle(e, i, p, _),
        this.crossBoostPad(this, n, r) &&
          console.info(
            `[race] boost pad`,
            JSON.stringify({
              distance: Math.round(this.distance),
              lane: +this.lane.toFixed(2),
            }),
          ),
        this.advanceField(e, t),
        (this.position =
          1 +
          this.rivals.filter((e) => e.finished || e.distance > this.distance)
            .length),
        !this.predicting && this.distance >= this.lap * $)
      ) {
        let t =
            this.elapsed -
            Math.min(e, (this.distance - this.lap * $) / Math.max(0.001, _)),
          n = t - this.lapStart;
        (this.lapTimes.push(n), (this.lapStart = t), (this.lastLap = n));
        let r = !this.sessionBest || n < this.sessionBest;
        (r && (this.sessionBest = n),
          (!this.bestLap || n < this.bestLap) && (this.bestLap = n),
          this.kind === `timed-lap` &&
            ((this.hull = Math.min(100, this.hull + 18)),
            this.modifiers.weapons &&
              this.combat.grantTurbo(this.combatId, this)),
          this.kind === `orbs` ||
          (this.kind === `race` && this.lap === this.laps)
            ? ((this.flagAt = this.clock - (this.elapsed - t)),
              (this.elapsed = t),
              this.retire(),
              (this.raceDistance = $ * this.lap),
              this.announce(`FINISH`, bX.beat))
            : (this.lap++,
              this.announce(
                this.kind === `timed-lap`
                  ? r
                    ? `SESSION BEST`
                    : `LAP ${this.lap.toString().padStart(2, `0`)}`
                  : this.lap === this.laps
                    ? `FINAL LAP`
                    : `LAP ${this.lap.toString().padStart(2, `0`)}`,
                2.4,
              )));
      }
    }
    updateRival(e, t, n, r, i) {
      ((e.protection = Math.max(0, e.protection - n)),
        (e.collisionCooldown = Math.max(0, e.collisionCooldown - n)),
        e.hull <= 0 && lX(e));
      let a = e.distance,
        o = e.lane;
      ((e.boostTime = Math.max(0, e.boostTime - n)),
        (e.turboTime = Math.max(0, e.turboTime - n)),
        (e.hitStun = Math.max(0, e.hitStun - n)),
        (e.padCooldown = Math.max(0, e.padCooldown - n)),
        (e.boostActive = e.boostTime > 0 || e.turboTime > 0));
      let s = SX[t],
        c = 85 + e.speed * 0.55,
        l = xY(e.distance + e.speed * 0.45),
        u = LY(e.distance + c) - 5,
        d = DX(l * 650, -3, 3) * i.line + CX[t] * 0.55;
      i.wander &&
        (d += i.wander * Math.sin(this.clock * (0.37 + t * 0.05) + t * 1.9));
      let f = this.combat.pilots[`cpu` + t]?.item,
        p = e.finished || this.modifiers.disableBoostPads ? 0 : UY.length,
        m = e.finished || f || !this.modifiers.weapons ? 0 : WY.length,
        h = e.distance % $,
        g = Math.floor(e.distance / $),
        _,
        v = 0,
        y = 1 / 0;
      for (let e = 0; e < p + m; e++) {
        let n = e < p ? UY[e] : WY[e - p],
          r = (n.distance - h + $) % $;
        if (r >= y) continue;
        let a = ((n.distance - h + $ + 16) % $) - 16;
        if (a < c && a > -16) {
          if (i.pads < 1 && TX(t, n.distance, g) > i.pads) continue;
          ((_ = n), (v = a), (y = r));
        }
      }
      if (_) {
        let e = DX((c - v) / 60, 0, 1),
          n = _.lane + CX[t] * 0.22;
        d += (n - d) * e;
      }
      let b = kX(e, r),
        x = e.finished ? [...b, ...AX(e, r)] : b;
      (x.length && (d = jX(e, d, u, x)), (d = DX(d, -u, u)));
      let S = DX((d - e.lane) * 3.2, -16, 16) * Math.min(1, e.speed / 35);
      ((e.lateralVelocity += (S - e.lateralVelocity) * (1 - Math.exp(-n * 10))),
        (e.lane = DX(e.lane + e.lateralVelocity * n, -u, u)),
        (e.heading = Math.atan2(e.lateralVelocity, Math.max(1, e.speed))));
      let C = Math.abs(l);
      if (i.anticipation > 0.45)
        for (let t = 0.6; t <= i.anticipation; t += 0.3)
          C = Math.max(C, Math.abs(xY(e.distance + e.speed * t)));
      let w = DX((C - 0.004) * 850, 0, 6) * (i.scrub > 1 ? i.scrub : 1),
        T =
          (e.turboTime > 0 ? $u.turbo : e.boostActive ? $u.boost : $u.cruise) *
          s *
          zY(e.distance),
        E = yY.profile.trueLaneDistance ? NX(e.distance, e.lane, s) : 1 / 0;
      if (i.corner < 1 && Number.isFinite(E)) {
        for (let t = 0.3; t <= i.anticipation; t += 0.3)
          E = Math.min(E, NX(e.distance + e.speed * t, e.lane, s));
        E *= i.corner;
      }
      let D = E < T,
        O = 1;
      if (i.mistakes > 0 && !e.finished && e.distance > 400) {
        let e = Math.floor(this.clock / 7);
        if (TX(t, e * 97.3, 13) < i.mistakes) {
          let n = e * 7 + TX(t, e * 41.9, 29) * 6;
          this.clock >= n && this.clock < n + 1 && (O = 0.66);
        }
      }
      let { target: k, braking: A } = MX(
          e,
          e.finished
            ? FX(e.distance)
            : (yY.profile.trueLaneDistance ? Math.min(T, E) : T - w) * O,
          b,
        ),
        j =
          (e.hitStun > 0 ? 0.18 : 1) *
            ($u.acceleration * s * (C > 0.004 ? i.throttle : 1) +
              (e.turboTime > 0
                ? $u.turboAcceleration
                : e.boostActive
                  ? $u.boostAcceleration
                  : 0)) -
          7 -
          e.speed * 0.065 -
          Math.abs(e.heading) * e.speed * 0.13;
      e.speed = e.finished
        ? IX(e.speed, k, A, n)
        : e.speed > k
          ? Math.max(k, e.speed - n * (A ? 105 : D ? 70 : 34))
          : Math.min(k, e.speed + j * n);
      let ee = e.speed * Math.cos(e.heading) * RY(e.distance, e.lane);
      e.distance += ee * n;
      let te = LX(e, a, ee, n);
      (te?.event === `land` &&
        (e.speed *= 1 - DX((-te.relative - 24) * 0.004, 0, 0.12)),
        e.finished
          ? e.distance >= $ * (this.laps + 1) && (e.distance -= $)
          : this.crossBoostPad(e, a, o));
    }
    advanceField(e, t) {
      if (this.networked) return;
      let n = $ * this.laps,
        r = [this, ...this.rivals],
        i = wX(this.cpuSkill);
      for (let t = 0; t < this.rivals.length; t++) {
        let a = this.rivals[t],
          o = a.distance;
        (this.updateRival(a, t, e, r, i),
          !a.finished &&
            (this.collideWith(a),
            a.distance >= n &&
              ((a.finished = !0),
              (a.finishTime =
                this.raceClock() -
                e +
                e * DX((n - o) / Math.max(0.001, a.distance - o), 0, 1)),
              (a.boostTime = a.turboTime = a.hitStun = 0),
              (a.boostActive = !1))));
      }
      this.networked ||
        this.combat.step(
          e,
          [
            {
              id: this.combatId,
              body: this,
              active: this.mode === `racing`,
              fire: t.fire,
              absorb: t.absorb,
            },
            ...this.rivals.map((e, t) => ({
              id: `cpu` + t,
              body: e,
              active: !e.finished,
              cpu: !0,
            })),
          ],
          this.kind === `race`,
        );
    }
    raceClock() {
      return this.mode === `finished` && this.flagAt > 0
        ? this.elapsed + this.clock - this.flagAt
        : this.elapsed;
    }
    coolDown(e) {
      let t = bY(this.distance),
        n = LY(this.distance) - 5,
        r = this.networked ? [] : kX(this, this.rivals),
        i = DX(this.lane, -7, 7);
      (r.length && (i = jX(this, i, n, r)), (i = DX(i, -n, n)));
      let a = DX((i - this.lane) * 3.2, -10, 10) * Math.min(1, this.speed / 35);
      this.lateralVelocity +=
        (a - this.lateralVelocity) * (1 - Math.exp(-e * 4));
      let { target: o, braking: s } = MX(this, FX(this.distance), r),
        c = this.speed;
      this.speed = IX(this.speed, o, s, e);
      let l = (this.speed - c) / e,
        u = this.heading;
      this.heading +=
        (Math.atan2(this.lateralVelocity, Math.max(1, this.speed)) -
          this.heading) *
        (1 - Math.exp(-e * 6));
      let d =
        this.speed * Math.cos(this.heading) * RY(this.distance, this.lane);
      ((this.yawRate +=
        ((this.heading - u) / e + t.curvature * d - this.yawRate) *
        (1 - Math.exp(-e * 10))),
        (this.steer +=
          (DX(this.yawRate / vX(this.speed), -1, 1) - this.steer) *
          (1 - Math.exp(-e * 8))),
        (this.throttle += (0.3 - this.throttle) * (1 - Math.exp(-e * 3))),
        (this.airbrake = 0),
        (this.slideYaw *= Math.exp(-e * 6)),
        (this.shiftTime = Math.max(0, this.shiftTime - e)),
        (this.shiftCooldown = Math.max(0, this.shiftCooldown - e)),
        (this.protection = Math.max(0, this.protection - e)),
        (this.collisionCooldown = Math.max(0, this.collisionCooldown - e)));
      let f =
          2.25 * Math.abs(Math.cos(this.heading)) +
          3.9 * Math.abs(Math.sin(this.heading)),
        p = LY(this.distance) - 0.42 - f;
      this.lane = DX(this.lane + this.lateralVelocity * e, -p, p);
      let m = this.distance;
      ((this.distance += d * e),
        this.touchDown(LX(this, m, d, e)),
        this.distance - this.raceDistance >= $ && (this.distance -= $),
        this.settle(e, t, l, d));
    }
    touchDown(e) {
      if (e) {
        if (e.event === `rescue`) {
          ((this.hoverVelocity = 0), this.announce(`RESCUED`, 1.6));
          return;
        }
        e.event === `land` &&
          (this.landingSerial++,
          (this.landingImpact = -e.relative),
          (this.hoverVelocity += e.relative * xX.compression),
          (this.impact = Math.max(
            this.impact,
            DX(-e.relative / 50, 0.15, 0.7),
          )),
          (this.speed *= 1 - DX((-e.relative - 24) * 0.004, 0, 0.12)));
      }
    }
    settle(e, t, n, r = this.speed) {
      let i = this.airTime > 0,
        a = (FY(this.distance + 1) - FY(this.distance - 1)) / 2,
        o = i ? 0 : -(t.verticalCurvature + a) * this.speed * this.speed,
        s = 1.05 + (this.boostActive ? 0.035 : 0);
      ((this.hoverVelocity +=
        ((s - this.hoverHeight) * 180 -
          this.hoverVelocity * 27 +
          DX(o * 0.32, -12, 16)) *
        e),
        (this.hoverHeight = DX(
          this.hoverHeight + this.hoverVelocity * e,
          0.86,
          1.3,
        )),
        (this.hoverHeight === 0.86 || this.hoverHeight === 1.3) &&
          (this.hoverVelocity = 0));
      let c = i
          ? -DX(
              Math.atan2(this.airSpeed - r * t.tangent.y, Math.max(20, r)) *
                0.85,
              -0.35,
              0.35,
            )
          : -Math.atan(PY(this.distance) > 0 ? FY(this.distance) : 0),
        l = DX(-n * 7e-4 - this.hoverVelocity * 0.012, -0.065, 0.065) + c;
      this.pitch += (l - this.pitch) * (1 - Math.exp(-e * 14));
      let u = DX(
        -this.yawRate * 0.23 -
          this.lateralVelocity * 0.002 -
          this.shiftDirection * (this.shiftTime / 0.22) * 0.1,
        -0.32,
        0.32,
      );
      this.roll += (u - this.roll) * (1 - Math.exp(-e * 16));
    }
    crossBoostPad(e, t, n) {
      if (e.distance <= t) return !1;
      let r = !1;
      for (let i = 0; !this.modifiers.disableBoostPads && i < UY.length; i++) {
        let a = UY[i],
          o = Math.floor((e.distance - a.distance + 1) / $),
          s = o * $ + a.distance - 1,
          c = o * UY.length + i;
        if (o < 0 || c === e.lastBoostPad || e.distance < s || t >= s + 17)
          continue;
        let l = DX((s - t) / (e.distance - t), 0, 1),
          u = n + (e.lane - n) * l;
        Math.abs(u - a.lane) >= 3.7 ||
          ((e.lastBoostPad = c),
          (e.boostTime = $u.boostDuration),
          (e.boostActive = !0),
          (r = !0));
      }
      return r;
    }
    updateSideShift(e) {
      for (let t of [`Left`, `Right`]) {
        let n = t === `Left` ? `airLeftHeld` : `airRightHeld`,
          r = t === `Left` ? `airLeftTap` : `airRightTap`,
          i =
            t === `Left`
              ? (e.tapLeft ?? e.airLeft)
              : (e.tapRight ?? e.airRight);
        if ((i < 0.15 && (this[n] = 0), i < 0.35 || this[n])) continue;
        this[n] = 1;
        let a = this.clock - this[r];
        !this.remoteSideShiftIntents &&
        a >= 0.045 &&
        a <= 0.26 &&
        this.trySideShift(t === `Left` ? 1 : -1, e)
          ? (this[r] = -10)
          : (this[r] = this.clock);
      }
    }
    trySideShift(e, t) {
      return this.mode !== `racing` ||
        this.shiftCooldown > 0 ||
        this.speed <= 35 ||
        (e === 1 ? t.airRight : t.airLeft) >= 0.15
        ? !1
        : ((this.lateralVelocity += e * 54),
          (this.shiftDirection = e),
          (this.shiftTime = 0.22),
          (this.shiftCooldown = 0.5),
          this.shiftSerial++,
          !0);
    }
    impactEvent(e, t, n) {
      this.collisionCooldown > 0 ||
        this.protection > 0 ||
        ((this.collisionCooldown = e === `wall` ? 0.19 : 0.45),
        (this.impact = e === `wall` ? DX(t, 0.2, 1) : DX(t * 0.35, 0.1, 0.35)),
        (this.contactSide = n),
        (this.lastCollision = e),
        this.collisionSerial++,
        e === `wall` ? this.wallContacts++ : this.shipContacts++,
        (this.hull = Math.max(
          0,
          this.hull - (e === `wall` ? 4 + t * 15 : 0.75 + t * 2.25),
        )),
        (this.hoverVelocity += t * (e === `wall` ? 1.5 : 0.45)));
    }
    resolveWall(e = 0) {
      let t =
          2.25 * Math.abs(Math.cos(this.heading)) +
          3.9 * Math.abs(Math.sin(this.heading)),
        n = LY(this.distance) - 0.42 - t;
      if (Math.abs(this.lane) <= n) return;
      let r = Math.sign(this.lane);
      this.lane = r * n;
      let i = Math.max(0, this.lateralVelocity * r);
      (i > 0 &&
        ((this.lateralVelocity = -r * Math.max(1.2, i * 0.18)),
        (this.speed = Math.max(
          0,
          this.speed -
            i * 0.75 -
            this.speed * Math.abs(Math.sin(this.heading)) * 0.2 -
            4,
        )),
        this.impactEvent(`wall`, DX(i / 24, 0.15, 1), r)),
        this.heading * r > 0 &&
          (this.heading -=
            r * Math.min(Math.abs(this.heading) * 0.6 + 0.05, 0.4)),
        this.yawRate * r > 0 && (this.yawRate *= 0.15),
        (this.speed = Math.max(0, this.speed - e * 38)),
        this.recoverIfNeeded());
    }
    recoverIfNeeded() {
      this.hull > 0 || (lX(this), this.announce(`SHIP RECOVERED`, 2));
    }
    collideWith(t, n = !1) {
      if (
        this.mode !== `racing` ||
        this.protection > 0 ||
        (t.protection ?? 0) > 0
      )
        return;
      let r = ((((this.distance - t.distance + $ / 2) % $) + $) % $) - $ / 2,
        i = this.lane - t.lane,
        a =
          4.5 +
          Math.abs(Math.sin(this.heading)) * 2 +
          Math.abs(Math.sin(t.heading)) * 2,
        o = 8.1;
      if (Math.abs(r) >= o || Math.abs(i) >= a) return;
      let s = Math.sign(i) || Math.sign(r) || 1,
        c = a - Math.abs(i),
        l = o - Math.abs(r),
        u = t instanceof e ? t : null,
        d = (e) => {
          n
            ? u?.impactEvent(`ship`, e, s)
            : typeof t.hull == `number` &&
              !t.protection &&
              !t.collisionCooldown &&
              ((t.hull = Math.max(0, t.hull - (0.75 + e * 2.25))),
              (t.collisionCooldown = 0.45),
              t.hull <= 0 && `recoverySerial` in t && lX(t));
        };
      if (c < l) {
        ((this.lane += s * c * 0.5), (t.lane -= s * c * 0.5));
        let e = Math.max(0, -(this.lateralVelocity - t.lateralVelocity) * s),
          n = DX(e * 0.35, 1, 6);
        ((this.lateralVelocity += s * n),
          (t.lateralVelocity -= s * n),
          (this.yawRate += s * 0.04),
          this.impactEvent(`ship`, DX(e / 22, 0.22, 0.85), -s),
          d(DX(e / 22, 0.22, 0.85)));
      } else {
        let e = Math.sign(r) || -1;
        e > 0
          ? (this.distance = Math.min($ * this.laps, this.distance + l))
          : (t.distance = Math.min($ * this.laps, t.distance + l));
        let n = Math.max(0, -(this.speed - t.speed) * e),
          i = e > 0 ? t.speed : this.speed,
          a = Math.min(n * 0.18, i * 0.06);
        ((this.speed = Math.max(0, this.speed + e * a)),
          (t.speed = Math.max(0, t.speed - e * a)),
          this.impactEvent(`ship`, DX(n / 45, 0.2, 1), -s),
          d(DX(n / 45, 0.2, 1)));
      }
      (this.resolveWall(),
        u?.resolveWall(),
        this.recoverIfNeeded(),
        u?.recoverIfNeeded(),
        u ||
          (t.lane = DX(t.lane, -LY(t.distance) + 2.8, LY(t.distance) - 2.8)));
    }
    snapshot() {
      return {
        mode: this.mode,
        kind: this.kind,
        coordinateSystem: `distance in metres along closed track; lane/heading positive to camera-left; heading in degrees; speed in km/h`,
        trackLength: Math.round($),
        player: {
          distance: +this.distance.toFixed(2),
          lane: +this.lane.toFixed(2),
          speed: Math.round(this.speed * 3.6),
          steering: +this.steer.toFixed(2),
          lateralVelocity: +this.lateralVelocity.toFixed(2),
          heading: +((this.heading * 180) / Math.PI).toFixed(2),
          yawRate: +this.yawRate.toFixed(3),
          hoverHeight: +this.hoverHeight.toFixed(2),
          airborne: this.airTime > 0,
          airHeight: +this.airHeight.toFixed(2),
          airTime: +this.airTime.toFixed(2),
          landings: this.landingSerial,
          throttle: this.throttle,
          roll: +((this.roll * 180) / Math.PI).toFixed(2),
          sideShift:
            this.shiftTime > 0
              ? this.shiftDirection > 0
                ? `left`
                : `right`
              : null,
          sideShifts: this.shiftSerial,
        },
        track: {
          sector: BY(this.distance).name,
          nextTurn: VY(this.distance),
          halfWidth: +LY(this.distance).toFixed(2),
          curvature: +bY(this.distance).curvature.toFixed(5),
          bankDegrees: +((bY(this.distance).bank * 180) / Math.PI).toFixed(1),
        },
        collisions: {
          walls: this.wallContacts,
          ships: this.shipContacts,
          last: this.lastCollision,
        },
        lap: this.lap,
        trackId: TJ.id,
        totalLaps:
          this.kind === `timed-lap`
            ? null
            : this.kind === `orbs`
              ? 1
              : this.laps,
        orbs:
          this.kind === `orbs`
            ? { taken: this.orbsTaken, total: this.orbs.length }
            : null,
        position: this.position,
        totalRacers: this.rivals.length + 1,
        cpuSkill: this.cpuSkill,
        elapsed: +this.elapsed.toFixed(2),
        runout: +this.runout.toFixed(2),
        flagBeat: this.flagBeat,
        countdown: +this.countdown.toFixed(2),
        boostSource: this.turboTime > 0 ? `turbo` : `pads`,
        boostTime: this.boostTime,
        turboTime: this.turboTime,
        hitStun: this.hitStun,
        boosting: this.boostActive,
        hull: Math.round(this.hull),
        modifiers: { ...this.modifiers },
        combat: { ...this.combat.snapshot(), self: this.combatId },
        completedLaps: this.lapTimes.length,
        lapTime: this.elapsed - this.lapStart,
        lastLap: this.lastLap,
        sessionBest: this.sessionBest,
        lapTimes: this.lapTimes.slice(-5),
        bestLap: this.bestLap,
        message: this.messageTime > 0 ? this.message : ``,
        rivals: this.rivals.map((e) => ({
          name: e.name,
          shipId: e.shipId,
          hull: Math.round(e.hull),
          distanceAhead: Math.round(e.distance - this.distance),
          lane: +e.lane.toFixed(1),
          speed: Math.round(e.speed * 3.6),
          boosting: e.boostActive,
          finished: e.finished,
        })),
        nextBoostPads: (this.modifiers.disableBoostPads ? [] : UY)
          .map((e) => ({
            distanceAhead: Math.round(
              (e.distance - (this.distance % $) + $) % $,
            ),
            lane: e.lane,
          }))
          .sort((e, t) => e.distanceAhead - t.distanceAhead)
          .slice(0, 2),
      };
    }
  },
  zX = `vector-intro`,
  BX = !1,
  VX = 0,
  HX = new Set(),
  UX = () => HX.forEach((e) => e()),
  WX = () => BX;
