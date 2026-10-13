// assets__index-DphGw8Ou 06 — distance
// Lines 69827-70261 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
var aX = class {
  constructor(e = 7645521) {
    ((this.clock = 0),
      (this.serial = 0),
      (this.pilots = {}),
      (this.projectiles = []),
      (this.pads = RY.map(() => 0)),
      (this.events = []),
      (this.cpuSkill = 1),
      (this.enabled = !0),
      (this.turboCap = tX(3)),
      (this.seed = e >>> 0));
  }
  random() {
    return (
      (this.seed = (Math.imul(this.seed, 1664525) + 1013904223) >>> 0),
      this.seed / 4294967296
    );
  }
  pilot(e, t) {
    return (this.pilots[e] ??= {
      item: null,
      cannonFiring: !1,
      ammo: 0,
      lock: ``,
      lockTime: 0,
      fireHeld: !1,
      absorbHeld: !1,
      cooldown: 0,
      acquiredAt: 0,
      lastDistance: t.distance,
      lastLane: t.lane,
      visited: RY.map(() => -1),
      mines: 0,
      nextMine: 0,
      recovery: t.recoverySerial,
      reaction: 0,
      hits: 0,
      pickups: 0,
      shield: 0,
      turbos: 0,
    });
  }
  event(e, t, n, r) {
    (this.events.push({
      id: ++this.serial,
      time: this.clock,
      kind: e,
      item: t,
      owner: n,
      distance: r.distance,
      lane: r.lane,
    }),
      this.events.length > 80 && this.events.shift());
  }
  draw(e = !1) {
    let t = this.random();
    return (
      e && ((t *= 0.84), t >= 0.7 && (t += 0.16)),
      t < 0.16
        ? `mines`
        : t < 0.35
          ? `rockets`
          : t < 0.51
            ? `missile`
            : t < 0.7
              ? `cannon`
              : t < 0.86
                ? `turbo`
                : `shield`
    );
  }
  shielded(e) {
    return (this.pilots[e]?.shield ?? 0) > 0;
  }
  threatened(e, t) {
    let n = e.body;
    return t.some(
      (t) =>
        t.id !== e.id &&
        this.pilots[t.id]?.lock === e.id &&
        this.pilots[t.id].lockTime >= 0.4,
    )
      ? !0
      : this.projectiles.some((t) => {
          let r = QY(t.distance - n.distance),
            i = Math.abs(t.lane - n.lane);
          return t.kind === `mines`
            ? t.age >= 0.45 && r > 4 && r < 45 && i < 4
            : t.owner === e.id
              ? !1
              : t.target === e.id || (r < -2 && r > -60 && i < 5);
        });
  }
  grantTurbo(e, t) {
    let n = this.pilot(e, t);
    ((n.item = `turbo`),
      (n.ammo = 1),
      (n.cannonFiring = !1),
      (n.cooldown = 0),
      (n.lock = ``),
      (n.lockTime = 0),
      (n.acquiredAt = this.clock),
      this.event(`pickup`, `turbo`, e, t));
  }
  heal(e, t) {
    ((e.body.hull = Math.min(100, e.body.hull + t)),
      this.event(`heal`, `energy`, e.id, e.body));
  }
  spawn(e, t, n = e.body.heading) {
    if (this.projectiles.length >= 160) return;
    let r = this.pilots[e.id],
      i = t === `mines`;
    (this.projectiles.push({
      id: ++this.serial,
      kind: t,
      owner: e.id,
      distance: e.body.distance + (i ? -7 : 6),
      lane: e.body.lane,
      heading: n,
      age: 0,
      life: i ? 12 : t === `cannon` ? 300 / 440 : 3,
      target: t === `missile` && r.lockTime >= 0.65 ? r.lock : ``,
      targetRecovery: 0,
    }),
      this.event(`fire`, t, e.id, e.body));
  }
  hit(e, t) {
    if (t.body.protection > 0) return;
    let n = t.body;
    n.hull = Math.max(0, n.hull - JY[e.kind].damage);
    let r = {
      cannon: { retention: 0.97, loss: 1.5, stun: 0.1 },
      mines: { retention: 0.98, loss: 0.5, stun: 0.06 },
      rockets: { retention: 0.62, loss: 8, stun: 0.5 },
      missile: { retention: 0.48, loss: 10, stun: 0.75 },
    }[e.kind];
    ((n.speed = Math.max(
      Math.min(n.speed, 35),
      n.speed * r.retention - r.loss,
    )),
      (n.hitStun = Math.max(n.hitStun, r.stun)),
      (e.kind === `rockets` || e.kind === `missile`) &&
        ((n.boostTime = n.turboTime = 0), (n.boostActive = !1)),
      `impact` in n &&
        (n.impact = Math.max(
          n.impact ?? 0,
          e.kind === `cannon` ? 0.13 : e.kind === `mines` ? 0.22 : 0.65,
        )),
      `contactSide` in n && (n.contactSide = Math.sign(e.lane - n.lane)),
      this.pilots[e.owner] && this.pilots[e.owner].hits++,
      this.event(`hit`, e.kind, t.id, n),
      n.hull <= 0 && (rX(n), this.recovered(t.id, n)));
  }
  recovered(e, t) {
    let n = this.pilots[e];
    ((n.cannonFiring = !1),
      (n.mines = 0),
      (n.lock = ``),
      (n.lockTime = 0),
      (n.shield = 0),
      (n.recovery = t.recoverySerial),
      this.event(`recover`, `energy`, e, t));
  }
  step(e, t, n = !0) {
    if (!this.enabled) return;
    ((this.clock += e),
      (this.events = this.events.filter((e) => this.clock - e.time < 1.8)));
    let r = t.filter((e) => e.active);
    for (let e of t) this.pilot(e.id, e.body);
    let i = [];
    for (let t of r) {
      let r = this.pilots[t.id],
        a = t.body;
      ((r.cooldown = Math.max(0, r.cooldown - e)),
        (r.shield = Math.max(0, r.shield - e)),
        r.recovery !== a.recoverySerial && this.recovered(t.id, a),
        n &&
          RY.forEach((e, n) => {
            let o = Math.floor(a.distance / $) * $ + e.distance;
            for (let s of [o, o - $]) {
              let o = Math.floor(s / $);
              if (
                s < 0 ||
                r.visited[n] >= o ||
                a.distance <= r.lastDistance ||
                r.lastDistance > s + 12 ||
                a.distance < s
              )
                continue;
              let c = $Y(
                  (s - r.lastDistance) / (a.distance - r.lastDistance),
                  0,
                  1,
                ),
                l = r.lastLane + (a.lane - r.lastLane) * c;
              Math.abs(l - e.lane) < 3.5 &&
                ((r.visited[n] = o), i.push({ e: t, index: n, lap: o, at: c }));
            }
          }));
    }
    i.sort((e, t) => e.at - t.at || e.e.id.localeCompare(t.e.id));
    for (let { e, index: t } of i) {
      let n = this.pilots[e.id];
      n.item ||
        this.pads[t] > this.clock ||
        e.body.protection > 0 ||
        ((n.item = this.draw(n.turbos >= this.turboCap)),
        n.item === `turbo` && n.turbos++,
        (n.cannonFiring = !1),
        (n.ammo = JY[n.item].ammo),
        (n.acquiredAt = this.clock),
        n.pickups++,
        (this.pads[t] = this.clock + 1),
        this.event(`pickup`, n.item, e.id, e.body));
    }
    for (let t of r) {
      let n = this.pilots[t.id],
        i = t.body;
      if (n.item === `missile`) {
        let a = r.filter(
          (e) => e.id !== t.id && !this.shielded(e.id) && iX(i, e.body),
        );
        a.sort(
          (e, t) =>
            QY(e.body.distance - i.distance) - QY(t.body.distance - i.distance),
        );
        let o = a.find((e) => e.id === n.lock) ?? a[0];
        if (o) {
          n.lock !== o.id && ((n.lock = o.id), (n.lockTime = 0));
          let r = n.lockTime;
          ((n.lockTime = Math.min(0.65, n.lockTime + e)),
            r < 0.65 &&
              n.lockTime >= 0.65 &&
              this.event(`lock`, `missile`, t.id, i));
        } else ((n.lock = ``), (n.lockTime = 0));
      } else ((n.lock = ``), (n.lockTime = 0));
      let a = !!t.fire,
        o = !!t.absorb;
      if (t.cpu)
        if (((n.reaction -= e), n.reaction <= 0)) {
          let e = 1 - this.cpuSkill;
          n.reaction = (0.18 + this.random() * 0.18) * (1 + e * 3);
          let s = this.clock - n.acquiredAt > 0.6 + e * 2.4,
            c =
              n.item === `shield` &&
              !this.shielded(t.id) &&
              this.threatened(t, r);
          if (
            (c && e && this.random() < e * 0.6 && (c = !1),
            (o = s && !!n.item && i.hull < 38 - e * 22 && !c),
            (a =
              n.item === `shield`
                ? c ||
                  (s &&
                    !o &&
                    !this.shielded(t.id) &&
                    this.clock - n.acquiredAt > 9)
                : s &&
                  !o &&
                  (n.item === `turbo`
                    ? i.hitStun <= 0 &&
                      i.turboTime <= 0 &&
                      Math.abs(i.heading) < 0.15 &&
                      Math.abs(hY(i.distance + 70)) < 0.007
                    : n.item === `missile`
                      ? n.lockTime >= 0.65
                      : n.item === `mines`
                        ? r.some(
                            (e) =>
                              e.id !== t.id &&
                              QY(i.distance - e.body.distance) > 8 &&
                              QY(i.distance - e.body.distance) < 95,
                          )
                        : r.some(
                            (e) =>
                              e.id !== t.id &&
                              !this.shielded(e.id) &&
                              iX(i, e.body, 0.09),
                          ))),
            e && s && n.item && !o)
          ) {
            let t = this.random();
            !a && n.item !== `shield` && t < e * 0.18
              ? (a = !0)
              : a && n.item !== `shield` && t > 1 - e * 0.45 && (a = !1);
          }
        } else ((a = n.item === `cannon` && n.fireHeld), (o = !1));
      if (o && !n.absorbHeld && n.item)
        (this.heal(t, nX(n)), (n.item = null), (n.ammo = 0));
      else if (
        a &&
        n.item &&
        n.cooldown <= 0 &&
        ((n.item === `cannon` && n.cannonFiring) || !n.fireHeld) &&
        i.protection <= 0
      ) {
        let e = n.item;
        if (e === `turbo`)
          ((i.turboTime = Yu.turboDuration),
            (i.boostActive = !0),
            this.event(`fire`, e, t.id, i));
        else if (e === `shield`)
          ((n.shield = 5), this.event(`fire`, e, t.id, i));
        else if (e === `mines`) ((n.mines = 5), (n.nextMine = this.clock));
        else if (e === `rockets`)
          for (let n of [-0.055, 0, 0.055]) this.spawn(t, e, i.heading + n);
        else if ((this.spawn(t, e), e === `missile`)) {
          let e = this.projectiles.at(-1),
            t = r.find((t) => t.id === e?.target);
          e && t && (e.targetRecovery = t.body.recoverySerial);
        }
        e === `cannon`
          ? ((n.cannonFiring = !0),
            n.ammo--,
            (n.cooldown = 1 / 15),
            n.ammo || (n.item = null))
          : ((n.item = null), (n.ammo = 0));
      }
      ((n.fireHeld = a),
        (n.absorbHeld = o),
        n.mines > 0 &&
          this.clock >= n.nextMine &&
          (this.spawn(t, `mines`),
          n.mines--,
          (n.nextMine = this.clock + 0.16)));
    }
    let a = new Set();
    for (let t of this.projectiles) {
      if (a.has(t.id)) continue;
      if (((t.age += e), (t.life -= e), t.life <= 0)) {
        a.add(t.id);
        continue;
      }
      let n = t.distance,
        i = t.lane;
      if (t.kind !== `mines`) {
        let n = t.kind === `cannon` ? 440 : t.kind === `rockets` ? 260 : 240,
          i = r.find(
            (e) =>
              e.id === t.target &&
              e.body.recoverySerial === t.targetRecovery &&
              e.body.protection <= 0,
          );
        if ((t.target && !i && (t.target = ``), i)) {
          let n = QY(i.body.distance - t.distance),
            r = Math.atan2(i.body.lane - t.lane, Math.max(1, n));
          t.heading += $Y(r - t.heading, -1.5 * e, 1.5 * e);
        } else t.heading -= hY(t.distance) * n * Math.cos(t.heading) * e;
        ((t.distance += n * Math.cos(t.heading) * e),
          (t.lane += n * Math.sin(t.heading) * e));
      } else if (t.age < 0.45) continue;
      let o,
        s = 1 / 0;
      for (let e of r) {
        if ((e.id === t.owner && t.kind !== `mines`) || e.body.protection > 0)
          continue;
        let r = this.pilots[e.id],
          a = QY(n - r.lastDistance),
          c = i - r.lastLane,
          l = t.distance - n - (e.body.distance - r.lastDistance),
          u = t.lane - i - (e.body.lane - r.lastLane),
          d = $Y(
            -((a * l) / 25 + (c * u) / 9) /
              Math.max(1e-8, (l * l) / 25 + (u * u) / 9),
            0,
            1,
          );
        (a + l * d) ** 2 / 25 + (c + u * d) ** 2 / 9 <= 1 &&
          d < s &&
          ((s = d), (o = e));
      }
      if (
        (o && this.shielded(o.id)
          ? (this.event(`block`, t.kind, o.id, {
              distance: n + (t.distance - n) * s,
              lane: i + (t.lane - i) * s,
            }),
            a.add(t.id))
          : o
            ? (this.hit(t, o), a.add(t.id))
            : Math.abs(t.lane) > jY(t.distance) - 0.4 &&
              ((t.lane = $Y(t.lane, -15, 15)),
              this.event(`explode`, t.kind, t.owner, t),
              a.add(t.id)),
        !a.has(t.id) && (t.kind === `cannon` || t.kind === `rockets`))
      )
        for (let e of this.projectiles) {
          if (e.kind !== `mines` || e.age < 0.45 || a.has(e.id)) continue;
          let r = QY(e.distance - n),
            o = e.lane - i,
            s = t.distance - n,
            c = t.lane - i,
            l = $Y((r * s + o * c) / Math.max(1e-8, s * s + c * c), 0, 1);
          if ((r - s * l) ** 2 + (o - c * l) ** 2 < 4) {
            (a.add(e.id),
              a.add(t.id),
              this.event(`explode`, `mines`, e.owner, e));
            break;
          }
        }
    }
    this.projectiles = this.projectiles.filter((e) => !a.has(e.id));
    for (let e of t) {
      let t = this.pilots[e.id];
      ((t.lastDistance = e.body.distance),
        (t.lastLane = e.body.lane),
        e.active ||
          ((t.lock = ``),
          (t.lockTime = 0),
          (t.mines = 0),
          (t.shield = 0),
          (t.fireHeld = !!e.fire),
          (t.absorbHeld = !!e.absorb)));
    }
  }
  snapshot() {
    return {
      clock: this.clock,
      serial: this.serial,
      pilots: this.pilots,
      projectiles: this.projectiles,
      pads: this.pads,
      events: this.events,
    };
  }
  apply(e) {
    ((this.clock = e.clock),
      (this.serial = e.serial),
      (this.pilots = e.pilots),
      (this.projectiles = e.projectiles),
      (this.pads = e.pads),
      (this.events = e.events));
  }
};
