// assets__index-DphGw8Ou 19 — session
// Lines 74250-75922 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
var y$ = class {
    constructor(e, t, n, r = yJ.id) {
      ((this.selfId = e),
        (this.sim = t),
        (this.transport = n),
        (this.circuitId = r),
        (this.members = []),
        (this.hostId = ``),
        (this.raceId = ``),
        (this.complete = !1),
        (this.error = ``),
        (this.ping = 0),
        (this.pings = new Map()),
        (this.ready = new Set()),
        (this.loadout = { ...DQ }),
        (this.loadouts = new Map()),
        (this.directLoadouts = new Set()),
        (this.circuitReady = !0),
        (this.players = []),
        (this.sims = new Map()),
        (this.queues = new Map()),
        (this.seq = 0),
        (this.lastState = -1),
        (this.inputSeq = 0),
        (this.inputTick = 0),
        (this.history = []),
        (this.stretch = 0),
        (this.nextStretch = 0),
        (this.leadWindow = -1),
        (this.lastInput = XQ),
        (this.confirmed = 0),
        (this.corrected = 0),
        (this.lastMismatch = ``),
        (this.presentation = new RQ()),
        (this.hostPresentation = new Map()),
        (this.interpolation = new YQ(
          (e) => e.speed * Math.cos(e.heading) * MY(e.distance, e.lane),
        )),
        (this.lastSnapshotTime = -1),
        (this.sentAirMask = 0),
        (this.sentCombatMask = 0),
        (this.firePress = 0),
        (this.absorbPress = 0),
        (this.actions = new Map()),
        (this.now = 0),
        (this.nextHello = 0),
        (this.nextSend = 0),
        (this.receivedAt = 0),
        (this.acc = 0),
        (this.firstFinish = 0),
        (this.dnf = new Set()),
        (this.lastRace = ``),
        (this.rules = { ...Lu }));
    }
    setRules(e) {
      Hu(e) !== Hu(this.rules) &&
        ((this.rules = zu(e)),
        this.ready.clear(),
        (this.nextHello = 0),
        this.circuitReady && this.ready.add(this.selfId));
    }
    setLoadout(e) {
      AQ(e) !== AQ(this.loadout) &&
        ((this.loadout = { ...e }), (this.nextHello = 0));
    }
    learnLoadouts(e, t) {
      let n = kQ(t.loadout);
      if (
        (n && (this.loadouts.set(e, n), this.directLoadouts.add(e)),
        !(e !== this.hostId || !t.roster || typeof t.roster != `object`))
      )
        for (let [e, n] of Object.entries(t.roster)) {
          let t = kQ(n);
          t &&
            e !== this.selfId &&
            !this.directLoadouts.has(e) &&
            this.members.some((t) => t.id === e) &&
            this.loadouts.set(e, t);
        }
    }
    setCircuit(e, t) {
      ((e !== this.circuitId || t !== this.circuitReady) &&
        (this.ready.clear(), (this.nextHello = 0)),
        (this.circuitId = e),
        (this.circuitReady = t),
        t && this.ready.add(this.selfId));
    }
    get isHost() {
      return this.hostId === this.selfId;
    }
    get active() {
      return !!this.raceId;
    }
    diagnostics() {
      return {
        protocol: 24,
        snapshotHz: 25,
        predictionSteps: this.isHost ? 0 : this.history.length,
        confirmed: this.confirmed,
        corrected: this.corrected,
        lastMismatch: this.lastMismatch,
        stretch: this.stretch,
        interpolationMs: this.isHost
          ? 0
          : Math.round(this.interpolation.bufferDelay * 1e3),
        bufferedSnapshots: this.isHost ? 0 : this.interpolation.snapshotCount,
      };
    }
    get canStart() {
      return (
        this.isHost &&
        this.circuitReady &&
        (!this.active || this.complete) &&
        this.members.length >= 2 &&
        this.members.every((e) => this.ready.has(e.id))
      );
    }
    setMembers(e, t) {
      (this.hostId &&
        this.hostId !== t &&
        this.active &&
        this.abort(`The host left. The new host can start a fresh race.`),
        (this.members = e.slice(0, 8)),
        (this.hostId = t),
        this.circuitReady && this.ready.add(this.selfId));
      for (let t of this.ready)
        e.some((e) => e.id === t) || this.ready.delete(t);
      for (let t of [...this.loadouts.keys(), ...this.pings.keys()])
        e.some((e) => e.id === t) ||
          (this.loadouts.delete(t),
          this.directLoadouts.delete(t),
          this.pings.delete(t));
      if (this.isHost)
        for (let t of this.sims.keys())
          e.some((e) => e.id === t) || this.retire(t);
    }
    retire(e) {
      (this.dnf.add(e), this.sims.get(e)?.retire());
    }
    abort(e) {
      ((this.lastRace = this.raceId),
        (this.raceId = ``),
        (this.complete = !1),
        (this.error = e),
        this.sims.clear(),
        (this.players = []),
        (this.sim.mode = `menu`),
        (this.sim.speed = 0),
        (this.sim.networkPose = null),
        (this.sim.predicting = !1),
        this.queues.clear(),
        (this.stretch = 0),
        (this.history.length = 0),
        this.interpolation.reset(),
        this.hostPresentation.clear(),
        (this.acc = 0));
    }
    disconnect(e) {
      this.ready.delete(e);
    }
    start() {
      if (!this.canStart) return !1;
      ((this.error = ``),
        (this.lastRace = this.raceId),
        (this.raceId = crypto.randomUUID()),
        (this.complete = !1),
        (this.seq = 0),
        (this.lastState = -1),
        (this.firstFinish = 0),
        this.dnf.clear(),
        this.queues.clear(),
        this.actions.clear(),
        (this.firePress = this.absorbPress = this.sentCombatMask = 0),
        (this.sentAirMask = 0),
        (this.inputTick = this.inputSeq = 0),
        (this.confirmed = this.corrected = 0),
        (this.stretch = 0),
        (this.leadWindow = -1),
        (this.history.length = 0),
        this.interpolation.reset(),
        this.hostPresentation.clear(),
        (this.nextSend = this.now),
        this.sims.clear(),
        (this.acc = 0),
        this.members.forEach((e, t) => {
          let n = e.id === this.selfId ? this.sim : new MX();
          (n.start(`race`, void 0, void 0, zu(this.rules)),
            (n.networked = !0),
            (n.combatId = e.id),
            (n.rivals = []),
            (n.lane = t % 2 ? 4.6 : -4.6),
            (n.distance = (3 - Math.floor(t / 2)) * 12),
            (n.countdown = 4),
            (n.position = t + 1),
            this.sims.set(e.id, n));
        }),
        (this.sim.combat = new aX(
          this.raceId
            .split(``)
            .reduce((e, t) => Math.imul(e, 31) + t.charCodeAt(0), 7),
        )),
        (this.sim.combat.enabled = this.rules.weapons));
      for (let [e, t] of this.sims) this.sim.combat.pilot(e, t);
      this.presentation.reset(this.sim);
      for (let [e, t] of this.sims) {
        if (e === this.selfId) continue;
        let n = new RQ();
        (n.reset(t), this.hostPresentation.set(e, n));
      }
      return (this.collect(), this.publish(!0), !0);
    }
    collect() {
      this.players = [...this.sims].map(([e, t]) => ({
        id: e,
        name:
          this.members.find((t) => t.id === e)?.name ||
          this.players.find((t) => t.id === e)?.name ||
          `PILOT`,
        state: h$(t),
        dnf: this.dnf.has(e),
        ack:
          (this.queues.get(e)?.consumed ?? -1) >= 0
            ? this.queues.get(e).consumed
            : void 0,
        lead: this.queues.has(e)
          ? [this.queues.get(e).windows, this.queues.get(e).lead]
          : void 0,
      }));
      let e = v$(this.players);
      for (let [t, n] of this.sims)
        n.position = e.findIndex((e) => e.id === t) + 1;
    }
    publish(e = !1) {
      this.transport.send(null, e, {
        v: 24,
        kind: `state`,
        circuit: this.circuitId,
        rules: this.rules,
        race: this.raceId,
        seq: ++this.seq,
        time: this.sim.clock,
        players: this.players,
        complete: this.complete,
        combat: PQ(this.sim.combat.snapshot()),
      });
    }
    receive(e, t) {
      if (!this.members.some((t) => t.id === e) || !t || typeof t != `object`)
        return;
      let n = t;
      if (n.v !== 24) return;
      if (
        ((n.kind === `hello` || n.kind === `helloAck`) &&
          this.learnLoadouts(e, n),
        !Bu(n.rules) || Hu(n.rules) !== Hu(this.rules))
      ) {
        this.ready.delete(e);
        return;
      }
      if (n.kind === `hello` || n.kind === `helloAck`) {
        if (
          !this.circuitReady ||
          n.circuit !== this.circuitId ||
          n.ready !== !0
        ) {
          this.ready.delete(e);
          return;
        }
      } else if (!this.circuitReady || n.circuit !== this.circuitId) return;
      if (n.kind === `hello` && s$(n.time)) {
        (this.ready.add(e),
          this.transport.send(e, !0, {
            v: 24,
            kind: `helloAck`,
            circuit: this.circuitId,
            rules: this.rules,
            ready: this.circuitReady,
            loadout: this.loadout,
            time: n.time,
          }));
        return;
      }
      if (n.kind === `helloAck` && s$(n.time)) {
        (this.ready.add(e),
          (this.ping = Math.round(c$((this.now - n.time) * 1e3, 0, 5e3))),
          this.pings.set(e, this.ping));
        return;
      }
      if (this.isHost && n.kind === `input`) {
        if (
          !this.active ||
          n.race !== this.raceId ||
          !this.sims.has(e) ||
          !Number.isSafeInteger(n.seq) ||
          Number(n.seq) < 0 ||
          !Number.isSafeInteger(n.first) ||
          Number(n.first) < 0 ||
          Number(n.first) > 1e8 ||
          !Array.isArray(n.inputs) ||
          n.inputs.length < 1 ||
          n.inputs.length > 16 ||
          !s$(n.sensitivity) ||
          !Number.isSafeInteger(n.firePress) ||
          Number(n.firePress) < 0 ||
          Number(n.firePress) > 1e6 ||
          !Number.isSafeInteger(n.absorbPress) ||
          Number(n.absorbPress) < 0 ||
          Number(n.absorbPress) > 1e6
        )
          return;
        let t = n.inputs.map(u$);
        if (t.some((e) => !e)) return;
        let r = this.actions.get(e) ?? {
          fire: 0,
          absorb: 0,
          pendingFire: 0,
          pendingAbsorb: 0,
        };
        ((r.pendingFire = Math.min(
          4,
          r.pendingFire + Math.max(0, Number(n.firePress) - r.fire),
        )),
          (r.pendingAbsorb = Math.min(
            4,
            r.pendingAbsorb + Math.max(0, Number(n.absorbPress) - r.absorb),
          )),
          (r.fire = Math.max(r.fire, Number(n.firePress))),
          (r.absorb = Math.max(r.absorb, Number(n.absorbPress))),
          this.actions.set(e, r));
        let i = this.queues.get(e) ?? {
          inputs: new Map(),
          next: -1,
          newest: -1,
          last: XQ,
          sensitivity: 1,
          consumed: -1,
          minLead: 1 / 0,
          window: 0,
          windows: 0,
          lead: n$,
        };
        (this.queues.set(e, i), (i.sensitivity = c$(n.sensitivity, 0.5, 1.6)));
        let a = Number(n.first),
          o = i.next >= 0 ? i.next : a;
        for (let e = 0; e < t.length; e++) {
          let n = a + e;
          n < o ||
            n > o + 1200 ||
            (i.inputs.has(n) || i.inputs.set(n, t[e]),
            (i.newest = Math.max(i.newest, n)));
        }
        i.next < 0 && i.newest >= 0 && (i.next = Math.max(a, i.newest - n$));
        return;
      }
      if (
        e !== this.hostId ||
        this.isHost ||
        n.kind !== `state` ||
        typeof n.race != `string` ||
        n.race.length > 80 ||
        n.race === this.lastRace ||
        !Number.isSafeInteger(n.seq) ||
        Number(n.seq) < 0 ||
        !s$(n.time) ||
        n.time < 0 ||
        n.time > 1e8 ||
        !Array.isArray(n.players) ||
        n.players.length < 2 ||
        n.players.length > 8 ||
        typeof n.complete != `boolean` ||
        !n.players.every(
          (e) =>
            e &&
            typeof e.id == `string` &&
            typeof e.name == `string` &&
            e.name.length <= 64 &&
            typeof e.dnf == `boolean` &&
            (e.ack === void 0 ||
              (Number.isSafeInteger(e.ack) && e.ack >= 0 && e.ack <= 1e8)) &&
            (e.lead === void 0 ||
              (Array.isArray(e.lead) &&
                e.lead.length === 2 &&
                e.lead.every(
                  (e) => Number.isSafeInteger(e) && Math.abs(e) <= 1e8,
                ))) &&
            m$(e.state),
        )
      )
        return;
      let r = FQ(n.combat);
      if (!r) return;
      let i = n.players;
      if (
        new Set(i.map((e) => e.id)).size !== i.length ||
        !i.some((t) => t.id === e) ||
        !i.some((e) => e.id === this.selfId)
      )
        return;
      let a = n.race !== this.raceId,
        o = this.players.find((e) => e.id === this.selfId);
      if (
        (!a && Number(n.seq) <= this.lastState) ||
        (!a && n.time < this.lastSnapshotTime)
      )
        return;
      (a &&
        ((this.lastRace = this.raceId),
        (this.raceId = n.race),
        this.sim.start(`race`, void 0, void 0, zu(this.rules)),
        (this.sim.networked = !0),
        (this.firePress = this.absorbPress = this.sentCombatMask = 0),
        (this.sentAirMask = 0),
        (this.inputTick = this.inputSeq = 0),
        (this.confirmed = this.corrected = 0),
        (this.stretch = 0),
        (this.leadWindow = -1),
        (this.history.length = 0),
        this.interpolation.reset(),
        (this.acc = 0),
        (this.nextSend = this.now),
        (this.sim.rivals = []),
        (this.error = ``)),
        (this.sim.combatId = this.selfId),
        this.sim.combat.apply(r),
        (this.lastState = Number(n.seq)),
        (this.lastSnapshotTime = n.time),
        (this.players = i),
        (this.complete = n.complete),
        (this.receivedAt = this.now),
        this.interpolation.push(n.time, this.now, i));
      let s = i.find((e) => e.id === this.selfId),
        c = o?.state.recoverySerial ?? this.sim.recoverySerial,
        l = s.ack ?? -1,
        u = this.history.length > 0 && l < this.history[0].tick - 1,
        d = this.history.findIndex((e) => e.tick === l),
        f = d >= 0 ? this.history[d].state : null;
      if (a || u || l > this.inputTick) {
        let e = h$(this.sim);
        if (
          (g$(this.sim, s.state),
          (this.history.length = 0),
          (this.inputTick = Math.max(0, l)),
          (this.acc = 0),
          (this.sim.predicting = !0),
          !a)
        ) {
          let e = Math.min(t$ / 2, Math.ceil(this.ping / 1e3 / ZQ) + n$),
            t = this.sim.settings,
            n = { sensitivity: t.sensitivity, autoThrottle: t.autoThrottle },
            r = a$(t.sensitivity);
          ((t.sensitivity = r), (t.autoThrottle = !1));
          for (let t = 0; t < e; t++)
            (this.sim.update(ZQ, this.lastInput),
              this.history.push({
                tick: ++this.inputTick,
                input: this.lastInput,
                sensitivity: r,
                state: h$(this.sim),
              }));
          ((t.sensitivity = n.sensitivity), (t.autoThrottle = n.autoThrottle));
        }
        this.presentation.reconcile(this.sim, !0, e);
      } else if (f && !(this.lastMismatch = p$(f, s.state)))
        (this.history.splice(0, d + 1), this.confirmed++);
      else {
        f || (this.lastMismatch = `unknown`);
        let e = h$(this.sim);
        (g$(this.sim, s.state), this.history.splice(0, d + 1));
        let t = this.sim.settings,
          n = { sensitivity: t.sensitivity, autoThrottle: t.autoThrottle };
        ((this.sim.predicting = !0), (t.autoThrottle = !1));
        for (let e of this.history)
          ((t.sensitivity = e.sensitivity),
            this.sim.update(ZQ, e.input),
            (e.state = h$(this.sim)));
        ((t.sensitivity = n.sensitivity),
          (t.autoThrottle = n.autoThrottle),
          this.corrected++,
          this.presentation.reconcile(
            this.sim,
            c !== s.state.recoverySerial,
            e,
          ));
      }
      if (
        ((this.sim.predicting = !0), s.lead && s.lead[0] !== this.leadWindow)
      ) {
        this.leadWindow = s.lead[0];
        let e = s.lead[1];
        e < 1
          ? (this.stretch = Math.min(8, n$ + 1 - e))
          : e > n$ + 3 && (this.stretch = -Math.min(4, e - n$ - 1));
      }
      ((this.sim.position = v$(i).findIndex((e) => e.id === this.selfId) + 1),
        s.dnf && (this.sim.mode = `finished`),
        !a &&
          o &&
          (s.state.mode === `finished` && o.state.mode !== `finished` && !s.dnf
            ? this.sim.announce(`FINISH`, mX.beat)
            : s.state.lap > o.state.lap &&
              this.sim.announce(
                s.state.lap === this.sim.laps
                  ? `FINAL LAP`
                  : `LAP ${s.state.lap}`,
                2,
              )));
    }
    consume(e) {
      let t = e.next++,
        n = e.inputs.get(t);
      return (
        e.inputs.delete(t),
        (e.minLead = Math.min(e.minLead, e.newest - t)),
        n && (e.last = n),
        (e.consumed = t),
        ++e.window >= r$ &&
          ((e.lead = e.minLead),
          e.windows++,
          (e.window = 0),
          (e.minLead = 1 / 0)),
        e.last
      );
    }
    tick(e, t) {
      if (
        !Number.isFinite(e) ||
        e < 0 ||
        ((e = Math.min(e, 2)),
        (this.now += e),
        this.now >= this.nextHello &&
          (this.transport.send(null, !0, {
            v: 24,
            kind: `hello`,
            circuit: this.circuitId,
            rules: this.rules,
            ready: this.circuitReady,
            loadout: this.loadout,
            ...(this.isHost
              ? {
                  roster: Object.fromEntries([
                    [this.selfId, this.loadout],
                    ...this.loadouts,
                  ]),
                }
              : {}),
            time: this.now,
          }),
          (this.nextHello = this.now + 1)),
        !this.active || !this.circuitReady)
      )
        return;
      let n = this.isHost ? QQ : $Q,
        r = this.now >= this.nextSend;
      if (
        (r &&
          (this.nextSend +=
            (Math.floor((this.now - this.nextSend) / n) + 1) * n),
        this.isHost)
      ) {
        for (this.acc += e; this.acc + 1e-9 >= ZQ;) {
          let e = [];
          for (let [n, r] of this.sims) {
            let i = n === this.selfId;
            i
              ? this.presentation.beforeStep(r)
              : this.hostPresentation.get(n)?.beforeStep(r);
            let a = i ? void 0 : this.queues.get(n);
            if (this.dnf.has(n)) {
              (a && this.consume(a), r.update(ZQ, XQ));
              continue;
            }
            let o = XQ;
            (i
              ? (o = t)
              : ((r.settings.autoThrottle = !1),
                a &&
                  ((o = this.consume(a)),
                  (r.settings.sensitivity = a.sensitivity))),
              r.update(ZQ, o));
            let s = this.actions.get(n),
              c = this.sim.combat.pilots[n],
              l = !!o.fire,
              u = !!o.absorb;
            (!i &&
              s &&
              c &&
              ((l = c.item === `cannon` && !!o.fire),
              (u = !1),
              s.pendingFire > 0 &&
                ((c.fireHeld = !1), (l = !0), s.pendingFire--),
              s.pendingAbsorb > 0 &&
                ((c.absorbHeld = !1), (u = !0), s.pendingAbsorb--)),
              e.push({
                id: n,
                body: r,
                active: r.mode === `racing` && !this.dnf.has(n),
                fire: l,
                absorb: u,
              }),
              r.mode === `finished` &&
                !this.firstFinish &&
                (this.firstFinish = this.now),
              (r.elapsed > 240 ||
                (this.firstFinish &&
                  this.now - this.firstFinish > 35 &&
                  r.mode !== `finished`)) &&
                this.retire(n));
          }
          let n = [...this.sims.entries()].filter(
            ([e, t]) => !this.dnf.has(e) && t.mode === `racing`,
          );
          for (let e = 0; e < n.length; e++)
            for (let t = e + 1; t < n.length; t++)
              n[e][1].collideWith(n[t][1], !0);
          (e.some((e) => e.active) && this.sim.combat.step(ZQ, e),
            (this.acc = Math.max(0, this.acc - ZQ)));
        }
        this.collect();
        let n = this.complete;
        ((this.complete = this.players.every(
          (e) => e.state.mode === `finished` || e.dnf,
        )),
          (r || this.complete !== n) && this.publish(this.complete !== n));
      } else {
        if (this.now - this.receivedAt > 8) {
          this.abort(
            `Host connection lost. Leave the room and rejoin or create a new race.`,
          );
          return;
        }
        let n = a$(this.sim.settings.sensitivity),
          i = d$({
            ...t,
            throttle: Math.max(t.throttle, +!!this.sim.settings.autoThrottle),
          }),
          a =
            (i.airLeft >= 0.35
              ? 1
              : i.airLeft < 0.15
                ? 0
                : this.sentAirMask & 1) |
            (i.airRight >= 0.35
              ? 2
              : i.airRight < 0.15
                ? 0
                : this.sentAirMask & 2),
          o = a !== this.sentAirMask,
          s = !!i.fire | (i.absorb ? 2 : 0),
          c = s !== this.sentCombatMask;
        (s & 1 && !(this.sentCombatMask & 1) && this.firePress++,
          s & 2 && !(this.sentCombatMask & 2) && this.absorbPress++,
          (this.sentAirMask = a),
          (this.sentCombatMask = s));
        let l = this.sim.position,
          u = this.sim.settings,
          d = { sensitivity: u.sensitivity, autoThrottle: u.autoThrottle };
        for (
          u.sensitivity = n,
            u.autoThrottle = !1,
            this.lastInput = i,
            this.acc += e,
            this.stretch &&
              this.now >= this.nextStretch &&
              (this.stretch > 0
                ? ((this.acc += ZQ),
                  this.stretch--,
                  (this.nextStretch = this.now + 0.05))
                : this.acc + 1e-9 >= ZQ &&
                  ((this.acc -= ZQ),
                  this.stretch++,
                  (this.nextStretch = this.now + 0.05)));
          this.acc + 1e-9 >= ZQ;
        )
          (this.presentation.beforeStep(this.sim),
            this.sim.update(ZQ, i),
            this.history.push({
              tick: ++this.inputTick,
              input: i,
              sensitivity: n,
              state: h$(this.sim),
            }),
            this.history.length > t$ && this.history.shift(),
            (this.acc = Math.max(0, this.acc - ZQ)));
        if (
          ((u.sensitivity = d.sensitivity),
          (u.autoThrottle = d.autoThrottle),
          (this.sim.position = l),
          (r || o || c) && this.history.length)
        ) {
          let e = this.history.slice(-e$);
          this.transport.send(this.hostId, o || c, {
            v: 24,
            kind: `input`,
            circuit: this.circuitId,
            rules: this.rules,
            race: this.raceId,
            seq: ++this.inputSeq,
            first: e[0].tick,
            inputs: e.map((e) => l$(e.input)),
            sensitivity: n,
            firePress: this.firePress,
            absorbPress: this.absorbPress,
          });
        }
      }
      if ((this.presentation.update(this.sim, e, this.acc / ZQ), this.isHost))
        for (let [t, n] of this.hostPresentation) {
          let r = this.sims.get(t);
          r && n.update(r, e, this.acc / ZQ);
        }
      else this.interpolation.advance(e);
      this.updateRivals();
    }
    updateRivals() {
      let e = this.sim.rivals;
      this.sim.rivals = this.players
        .filter((e) => e.id !== this.selfId)
        .map((t, n) => {
          let r = e.find((e) => e.team === t.id),
            i = this.loadouts.get(t.id),
            a = Object.assign(r ?? {}, t.state, {
              name: t.name,
              shipId: i?.ship ?? Xu[n % Xu.length].id,
              skin: i?.skin ?? `original`,
              team: t.id,
              color: bX[n].color,
              phase: 0,
              finished: t.state.mode === `finished` || t.dnf,
              finishTime: t.state.elapsed,
            });
          return (
            this.isHost
              ? Object.assign(a, this.sims.get(t.id)?.networkPose)
              : this.interpolation.sample(t.id, a),
            (a.boostActive = a.boostTime > 0 || a.turboTime > 0),
            a
          );
        });
    }
  },
  b$ = `modulepreload`,
  x$ = function (e, t) {
    return new URL(e, t).href;
  },
  S$ = {},
  C$ = function (e, t, n) {
    let r = Promise.resolve();
    if (t && t.length > 0) {
      let e = document.getElementsByTagName(`link`),
        i = document.querySelector(`meta[property=csp-nonce]`),
        a = i?.nonce || i?.getAttribute(`nonce`);
      function o(e) {
        return Promise.all(
          e.map((e) =>
            Promise.resolve(e).then(
              (e) => ({ status: `fulfilled`, value: e }),
              (e) => ({ status: `rejected`, reason: e }),
            ),
          ),
        );
      }
      r = o(
        t.map((t) => {
          if (((t = x$(t, n)), t in S$)) return;
          S$[t] = !0;
          let r = t.endsWith(`.css`),
            i = r ? `[rel="stylesheet"]` : ``;
          if (n)
            for (let n = e.length - 1; n >= 0; n--) {
              let i = e[n];
              if (i.href === t && (!r || i.rel === `stylesheet`)) return;
            }
          else if (document.querySelector(`link[href="${t}"]${i}`)) return;
          let o = document.createElement(`link`);
          if (
            ((o.rel = r ? `stylesheet` : b$),
            r || (o.as = `script`),
            (o.crossOrigin = ``),
            (o.href = t),
            a && o.setAttribute(`nonce`, a),
            document.head.appendChild(o),
            r)
          )
            return new Promise((e, n) => {
              (o.addEventListener(`load`, e),
                o.addEventListener(`error`, () =>
                  n(Error(`Unable to preload CSS for ${t}`)),
                ));
            });
        }),
      );
    }
    function i(e) {
      let t = new Event(`vite:preloadError`, { cancelable: !0 });
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented))
        throw e;
    }
    return r.then((t) => {
      for (let e of t || []) e.status === `rejected` && i(e.reason);
      return e().catch(i);
    });
  },
  w$ = { public: 0, friends: 1, private: 2 },
  T$ = (e) => (e === 1 ? `friends` : e === 2 ? `private` : `public`),
  E$ = [
    `GG!`,
    `Ready when you are`,
    `One more race?`,
    `Nice line!`,
    `Loading, one sec`,
    `Good luck!`,
  ],
  D$ = 120,
  O$ = 30,
  k$ = class {
    constructor(
      e,
      t,
      n,
      r = async () => !0,
      i = () => !0,
      a = () => `In the menus`,
      o = (e, t) => e === yJ.id && Uu(t) === Uu(GY),
    ) {
      ((this.sim = e),
        (this.onStart = t),
        (this.onMute = n),
        (this.onCircuit = r),
        (this.gameReady = i),
        (this.activity = a),
        (this.isBuilt = o),
        (this.sdk = null),
        (this.session = null),
        (this.lobbyId = ``),
        (this.rooms = []),
        (this.roomsTab = `public`),
        (this.members = []),
        (this.available = !1),
        (this.connected = !1),
        (this.busy = !1),
        (this.open = !1),
        (this.message = ``),
        (this.inviteLink = ``),
        (this.visibility = `public`),
        (this.circuit = yJ.id),
        (this.loadout = { ...DQ }),
        (this.chat = []),
        (this.friends = []),
        (this.invited = new Set()),
        (this.invites = []),
        (this.events = []),
        (this.launching = ``),
        (this.unsubscribe = []),
        (this.encoder = new TextEncoder()),
        (this.decoder = new TextDecoder()),
        (this.refreshAt = 0),
        (this.friendsAt = O$),
        (this.lastActive = !1),
        (this.disposed = !1),
        (this.autoJoined = !1),
        (this.preparingCircuit = ``),
        (this.failedCircuit = ``),
        (this.roomRevision = 0),
        (this.eventSerial = 0),
        (this.lastChat = 0),
        (this.pendingInvites = []),
        (this.peers = new Map()),
        (this.presenceKey = ``),
        (this.presenceAt = 0),
        (this.rules = { ...Lu }),
        (this.lastStandings = []),
        (this.roomsAt = 0),
        (this.currentRace = ``));
    }
    setInitialRules(e, t = yJ.id) {
      this.lobbyId ||
        ((this.rules = zu(e)),
        (this.circuit = vJ.some((e) => e.id === t) ? t : yJ.id),
        this.session?.setRules(this.rules));
    }
    roster() {
      let e = this.session;
      return !e || !this.lobbyId
        ? []
        : this.members.map((t) => {
            let n = t.id === e.selfId,
              r = n ? this.loadout : (e.loadouts.get(t.id) ?? null);
            return {
              id: t.id,
              self: n,
              ship: r?.ship ?? null,
              skin: r?.skin ?? `original`,
            };
          });
    }
    standings() {
      return v$(this.session?.players || []).map((e) => ({
        id: e.id,
        name: e.name,
        finished: e.state.mode === `finished`,
        dnf: e.dnf,
        time: e.state.elapsed,
        distance: e.state.distance,
      }));
    }
    returnToLobby() {
      if (!this.lobbyId) return;
      this.open = !0;
      let e = this.session;
      e?.active &&
        e.complete &&
        ((this.lastStandings = this.standings()), e.abort(``));
    }
    setLoadout(e) {
      AQ(e) !== AQ(this.loadout) &&
        ((this.loadout = { ...e }), this.session?.setLoadout(this.loadout));
    }
    built(e, t) {
      return this.isBuilt(e, t) && this.gameReady();
    }
    get settingsLocked() {
      return (
        this.busy ||
        !!this.launching ||
        (!!this.lobbyId && !this.session?.isHost) ||
        (!!this.session?.active && !this.session.complete)
      );
    }
    async setRules(e) {
      if (this.settingsLocked) return;
      let t = zu({ ...this.rules, ...e });
      Hu(t) !== Hu(this.rules) && ((this.rules = t), this.publishRoom());
    }
    setCircuit(e) {
      this.settingsLocked ||
        !vJ.some((t) => t.id === e) ||
        (e !== this.circuit && ((this.circuit = e), this.publishRoom()));
    }
    publishRoom() {
      let e = this.session;
      if (
        (e?.complete && e.abort(``),
        e?.setRules(this.rules),
        e?.setCircuit(this.circuit, this.built(this.circuit, this.rules)),
        !this.lobbyId || !e?.isHost || !this.sdk)
      )
        return;
      let t = this.lobbyId,
        n = vJ.find((e) => e.id === this.circuit);
      (this.sdk.setLobbyData(t, `circuit`, this.circuit),
        this.sdk.setLobbyData(t, `title`, n.name),
        this.sdk.setLobbyData(t, `rules`, JSON.stringify(this.rules)));
    }
    async loadingScreen() {
      if (!window.Wavedash) return null;
      let { default: e } = await C$(
        async () => {
          let { default: e } = await import(`./client-BtP_tmtQ.js`);
          return { default: e };
        },
        [],
        import.meta.url,
      );
      return e;
    }
    async init() {
      if (!window.Wavedash) return;
      let { default: e } = await C$(
        async () => {
          let { default: e } = await import(`./client-BtP_tmtQ.js`);
          return { default: e };
        },
        [],
        import.meta.url,
      );
      this.disposed || this.attach(e);
    }
    attach(e) {
      ((this.sdk = e), (this.available = !0));
      let t = e.Events;
      (this.unsubscribe.push(
        e.on(t.BACKEND_CONNECTED, () => {
          ((this.connected = !0), this.identity(), this.joinLaunchRoom());
        }),
        e.on(t.BACKEND_DISCONNECTED, () => {
          ((this.connected = !1),
            (this.message = `Wavedash connection lost. Reconnecting…`));
        }),
        e.on(t.LOBBY_JOINED, (t) => {
          if (
            ((this.lobbyId = t.lobbyId),
            this.roomRevision++,
            (this.open = !0),
            (this.message = ``),
            (this.chat = []),
            (this.events = []),
            this.invited.clear(),
            this.peers.clear(),
            (this.launching = ``),
            (this.visibility = T$(
              this.rooms.find((e) => e.lobbyId === t.lobbyId)?.visibility ??
                w$[this.visibility],
            )),
            (this.invites = this.invites.filter(
              (e) => e.lobbyId !== t.lobbyId,
            )),
            this.identity(),
            this.syncMembers(),
            this.session?.isHost)
          ) {
            let n = this.sdk.getUser()?.username ?? `Pilot`;
            (e.setLobbyData(t.lobbyId, `protocol`, 24),
              e.setLobbyData(t.lobbyId, `host`, n.slice(0, 32)),
              e.setLobbyData(t.lobbyId, `visibility`, w$[this.visibility]),
              e.setLobbyData(t.lobbyId, `racing`, !1),
              e.setLobbyData(t.lobbyId, `launch`, null),
              this.publishRoom());
          } else
            (this.session?.setCircuit(this.session.circuitId, !1),
              this.syncCircuit());
          for (let e of this.pendingInvites.splice(0)) this.inviteFriend(e);
        }),
        e.on(t.LOBBY_USERS_UPDATED, (e) => {
          this.syncMembers();
          let t = this.session?.selfId;
          e.userId === t ||
            !e.username ||
            ((this.events = [
              ...this.events.slice(-3),
              {
                id: ++this.eventSerial,
                kind: e.changeType === `LEFT` ? `left` : `joined`,
                name: e.username.slice(0, 32),
                time: Date.now(),
              },
            ]),
            e.changeType === `JOINED` && this.invited.delete(e.userId));
        }),
        e.on(t.LOBBY_DATA_UPDATED, () => void this.syncCircuit()),
        e.on(t.LOBBY_MESSAGE, (e) => {
          if (
            e.lobbyId !== this.lobbyId ||
            this.chat.some((t) => t.id === e.messageId)
          )
            return;
          let t = String(e.message).replace(/\s+/g, ` `).trim().slice(0, D$);
          t &&
            (this.chat = [
              ...this.chat.slice(-49),
              {
                id: e.messageId,
                userId: e.userId,
                name: e.username.slice(0, 32),
                text: t,
                time: e.timestamp,
              },
            ]);
        }),
        e.on(t.LOBBY_INVITE, (e) => {
          e.lobbyId !== this.lobbyId &&
            (this.invites.some((t) => t.id === e.notificationId) ||
              (this.invites = [
                ...this.invites.slice(-2),
                {
                  id: e.notificationId,
                  lobbyId: e.lobbyId,
                  from: e.sender.username.slice(0, 32),
                  avatar: this.avatarUrl(e.sender._id, e.sender.avatarUrl),
                  time: Date.now(),
                },
              ]));
        }),
        e.on(t.LOBBY_KICKED, () => {
          this.clear(
            `The room closed or you were removed. You can join another room.`,
          );
        }),
        e.on(t.P2P_CONNECTION_ESTABLISHED, (e) =>
          this.peers.set(e.userId, `connected`),
        ),
        e.on(t.P2P_PEER_RECONNECTED, (e) =>
          this.peers.set(e.userId, `connected`),
        ),
        e.on(t.P2P_PEER_DISCONNECTED, (e) => {
          (this.peers.delete(e.userId), this.session?.disconnect(e.userId));
        }),
        e.on(t.P2P_PEER_RECONNECTING, (e) => {
          (this.peers.set(e.userId, `reconnecting`),
            this.session?.disconnect(e.userId));
        }),
        e.on(t.P2P_CONNECTION_FAILED, (e) => {
          (this.peers.set(e.userId, `failed`),
            this.session?.disconnect(e.userId),
            (this.message = `A pilot could not connect. Rejoin the room to retry.`));
        }),
        e.on(t.MUTE_CHANGED, (e) => this.onMute(e.isMuted)),
      ),
        e.init({
          deferEvents: !0,
          p2p: { messageSize: 65536, maxIncomingMessages: 128 },
        }),
        this.identity(),
        this.onMute(e.isMuted()),
        e.updateLoadProgressZeroToOne(1),
        e.readyForEvents(),
        (this.connected = !0),
        this.joinLaunchRoom());
    }
    avatarUrl(e, t) {
      try {
        let t = this.sdk?.getUserAvatarUrl(
          e,
          this.sdk.AvatarSize?.MEDIUM ?? 128,
        );
        if (t) return t;
      } catch {}
      return t && /^https?:\/\//.test(t) ? t : null;
    }
    identity() {
      if (!this.sdk || this.session) return;
      let e = this.sdk.getUser();
      e?.id &&
        ((this.session = new y$(e.id, this.sim, {
          send: (e, t, n) => {
            let r = this.encoder.encode(
              JSON.stringify(n, (e, t) =>
                typeof t == `number` ? Math.round(t * 1e4) / 1e4 : t,
              ),
            );
            r.byteLength > this.sdk.getP2PMaxPayloadSize() ||
              (e
                ? this.sdk.sendP2PMessage(e, +!t, t, r)
                : this.sdk.broadcastP2PMessage(+!t, t, r));
          },
        })),
        this.session.setLoadout(this.loadout),
        this.session.setRules(this.rules));
    }
    joinLaunchRoom() {
      if (this.autoJoined || !this.sdk || !this.connected) return;
      let e = this.sdk.getLaunchParams().lobby;
      typeof e == `string` && e && ((this.autoJoined = !0), this.join(e));
    }
    syncMembers() {
      if (!this.sdk || !this.lobbyId) return;
      this.members = this.sdk
        .getLobbyUsers(this.lobbyId)
        .map((e) => ({ id: e.userId, name: e.username.slice(0, 32) }));
      let e = this.sdk.getLobbyHostId(this.lobbyId);
      (this.session?.setMembers(this.members, e || ``),
        this.session?.error &&
          ((this.open = !0), (this.message = this.session.error)));
    }
    async syncCircuit() {
      if (!this.sdk || !this.lobbyId || !this.session || this.preparingCircuit)
        return;
      if (this.session.isHost) {
        (this.session.setRules(this.rules),
          this.session.setCircuit(
            this.circuit,
            this.built(this.circuit, this.rules),
          ));
        return;
      }
      if (this.session.active && !this.session.complete) return;
      let e = this.lobbyId,
        t = this.sdk.getLobbyData(e, `circuit`),
        n;
      try {
        n = JSON.parse(String(this.sdk.getLobbyData(e, `rules`)));
      } catch {}
      if (typeof t != `string` || !Bu(n)) {
        this.session.setCircuit(this.session.circuitId, !1);
        return;
      }
      let r = this.sdk.getLobbyData(e, `visibility`);
      if (
        (typeof r == `number` && (this.visibility = T$(r)),
        (this.circuit = t),
        (this.rules = zu(n)),
        this.session.setRules(this.rules),
        !vJ.some((e) => e.id === t))
      ) {
        (this.session.setCircuit(this.session.circuitId, !1),
          (this.message = `This room uses a circuit unavailable in this build. Update VECTOR to join.`));
        return;
      }
      if (this.built(t, n)) {
        (this.session.setCircuit(t, !0),
          this.launchToken() || (this.launching = ``));
        return;
      }
      this.session.setCircuit(t, !1);
      let i = this.launchToken();
      if (!i) {
        this.launching = ``;
        return;
      }
      let a = `${t}:${Uu(n)}`;
      if (a === this.failedCircuit || !this.gameReady()) return;
      this.session.complete && this.session.abort(``);
      let o = this.roomRevision,
        s = this.session;
      ((this.launching = i),
        (this.preparingCircuit = a),
        s.setCircuit(t, !1),
        (this.message = `Preparing the host’s circuit…`));
      try {
        let e = await this.onCircuit(t, n);
        if (this.disposed || o !== this.roomRevision || this.session !== s)
          return;
        (s.setCircuit(t, e && this.built(t, n)),
          s.circuitReady || (this.failedCircuit = a),
          (this.message = s.circuitReady
            ? ``
            : `Unable to prepare the host’s circuit. Leave and rejoin to retry.`));
      } finally {
        o === this.roomRevision && (this.preparingCircuit = ``);
      }
    }
    launchToken() {
      if (!this.sdk || !this.lobbyId) return ``;
      let e = this.sdk.getLobbyData(this.lobbyId, `launch`);
      return typeof e == `string` ? e : ``;
    }
    async action(e) {
      if (!this.busy) {
        ((this.busy = !0), (this.message = ``));
        try {
          await e();
        } catch (e) {
          this.message =
            e instanceof Error
              ? e.message
              : `Unable to reach Wavedash. Try again.`;
        } finally {
          this.busy = !1;
        }
      }
    }
    setOpen(e) {
      ((this.open = e),
        !e && this.lobbyId && !this.session?.active && this.leave(),
        e && ((this.friendsAt = O$), this.lobbyId || this.refresh()));
    }
    async refresh(e = this.roomsTab) {
      if (((this.open = !0), (this.roomsTab = e), !this.sdk)) {
        this.message = `Online racing is available when you play VECTOR on Wavedash.`;
        return;
      }
      (await this.action(() => this.loadRooms()), this.refreshFriends());
    }
    async loadRooms() {
      if (!this.sdk) return;
      this.roomsAt = 0;
      let e = await this.sdk.listAvailableLobbies(this.roomsTab === `friends`);
      if (!e.success) throw Error(e.message);
      this.rooms = e.data.filter(
        (e) =>
          e.metadata.protocol === 24 &&
          e.playerCount < e.maxPlayers &&
          !e.metadata.racing,
      );
    }
    async refreshFriends() {
      if (!(!this.sdk || !this.connected)) {
        this.friendsAt = 0;
        try {
          let e = await this.sdk.listFriends();
          if (!e.success) return;
          this.friends = e.data
            .map((e) => ({
              id: e.userId,
              name: e.username.slice(0, 32),
              avatar: this.avatarUrl(e.userId, e.avatarUrl),
              online: e.isOnline,
            }))
            .sort(
              (e, t) =>
                Number(t.online) - Number(e.online) ||
                e.name.localeCompare(t.name),
            )
            .slice(0, 40);
        } catch {}
      }
    }
    async create(e = `public`) {
      let t = e === !0 ? `private` : e === !1 ? `public` : e;
      !this.sdk ||
        this.lobbyId ||
        !this.gameReady() ||
        ((this.visibility = t),
        await this.action(async () => {
          let e = await this.sdk.createLobby(
            t === `friends`
              ? this.sdk.LobbyVisibility.FRIENDS_ONLY
              : t === `private`
                ? this.sdk.LobbyVisibility.PRIVATE
                : this.sdk.LobbyVisibility.PUBLIC,
            8,
          );
          if (!e.success) throw Error(e.message);
        }));
    }
    async join(e) {
      !this.sdk ||
        this.lobbyId ||
        !e.trim() ||
        !this.gameReady() ||
        (await this.action(async () => {
          let t = await this.sdk.joinLobby(e.trim());
          if (!t.success) throw Error(t.message);
        }));
    }
    async copyInvite() {
      !this.sdk ||
        !this.lobbyId ||
        (await this.action(async () => {
          let e = await this.sdk.getLobbyInviteLink(!0);
          if (!e.success) throw Error(e.message);
          ((this.inviteLink = e.data),
            (this.message = `Invite link copied. Share it with your pilots.`));
        }));
    }
    async inviteFriend(e) {
      if (!(!this.sdk || !this.friends.some((t) => t.id === e))) {
        if (!this.lobbyId) {
          (this.pendingInvites.includes(e) || this.pendingInvites.push(e),
            this.invited.add(e),
            await this.create(`friends`));
          return;
        }
        if (!this.members.some((t) => t.id === e)) {
          this.invited.add(e);
          try {
            let t = await this.sdk.inviteUserToLobby(this.lobbyId, e);
            if (!t.success) throw Error(t.message);
            let n = this.friends.find((t) => t.id === e)?.name ?? `your friend`;
            this.message = `Invite sent to ${n}.`;
          } catch {
            (this.invited.delete(e),
              (this.message = `That invite did not send. Try again.`));
          }
        }
      }
    }
    async acceptInvite(e) {
      let t = this.invites.find((t) => t.id === e);
      !t ||
        (this.session?.active && !this.session.complete) ||
        ((this.invites = this.invites.filter((t) => t.id !== e)),
        this.lobbyId !== t.lobbyId &&
          (this.lobbyId && (await this.leave()),
          !this.lobbyId && ((this.open = !0), await this.join(t.lobbyId))));
    }
    openOverlay() {
      try {
        this.sdk?.toggleOverlay();
      } catch {}
    }
    dismissInvite(e) {
      this.invites = this.invites.filter((t) => t.id !== e);
    }
    say(e) {
      let t = e.replace(/\s+/g, ` `).trim().slice(0, D$),
        n = Date.now();
      return !this.sdk || !this.lobbyId || !t || n - this.lastChat < 700
        ? !1
        : ((this.lastChat = n), this.sdk.sendLobbyMessage(this.lobbyId, t));
    }
    async launch() {
      let e = this.session;
      if (
        !this.sdk ||
        !this.lobbyId ||
        !e?.isHost ||
        this.busy ||
        this.launching ||
        (e.active && !e.complete) ||
        this.members.length < 2 ||
        !this.gameReady()
      )
        return;
      let t = Date.now().toString(36);
      if (
        ((this.launching = t),
        (this.message = ``),
        e.complete && e.abort(``),
        this.sdk.setLobbyData(this.lobbyId, `launch`, t),
        this.built(this.circuit, this.rules))
      ) {
        e.setCircuit(this.circuit, !0);
        return;
      }
      let n = this.roomRevision,
        r = `${this.circuit}:${Uu(this.rules)}`;
      ((this.preparingCircuit = r), e.setCircuit(this.circuit, !1));
      try {
        let t = await this.onCircuit(this.circuit, this.rules);
        if (this.disposed || n !== this.roomRevision || this.session !== e)
          return;
        (e.setCircuit(this.circuit, t && this.built(this.circuit, this.rules)),
          e.circuitReady ||
            ((this.message = `Unable to prepare this circuit. Try again.`),
            this.cancelLaunch()));
      } finally {
        n === this.roomRevision && (this.preparingCircuit = ``);
      }
    }
    cancelLaunch() {
      !this.session?.isHost ||
        !this.launching ||
        ((this.launching = ``),
        this.sdk?.setLobbyData(this.lobbyId, `launch`, null));
    }
    start() {
      if (this.gameReady() && this.session?.start()) {
        ((this.open = !1),
          (this.lastActive = !0),
          (this.launching = ``),
          (this.currentRace = this.session.raceId),
          this.onStart());
        let e = this.lobbyId;
        (this.sdk?.setLobbyData(e, `racing`, !0),
          this.sdk?.setLobbyData(e, `launch`, null));
      }
    }
    tick(e, t) {
      if (
        (this.presence(e),
        this.open &&
          this.connected &&
          (this.friendsAt += e) > O$ &&
          this.refreshFriends(),
        this.open &&
          this.connected &&
          !this.lobbyId &&
          (this.roomsAt += e) > 12 &&
          this.loadRooms().catch(() => {}),
        !this.sdk || !this.session || !this.lobbyId)
      )
        return;
      for (let e of [0, 1])
        for (let t = 0; t < 128; t++) {
          let t = this.sdk.readP2PMessageFromChannel(e);
          if (!t) break;
          if (!(t.payload.byteLength > 65536))
            try {
              this.session.receive(
                t.fromUserId,
                JSON.parse(this.decoder.decode(t.payload)),
              );
            } catch {}
        }
      let n = this.session.raceId;
      if (
        (n &&
          n !== this.currentRace &&
          ((this.currentRace = n),
          (this.open = !1),
          (this.launching = ``),
          this.onStart()),
        this.session.tick(e, t),
        this.launching &&
          this.session.isHost &&
          this.session.canStart &&
          this.start(),
        this.lastActive &&
          !this.session.active &&
          ((this.open = !0), (this.message = this.session.error)),
        (this.lastActive = this.session.active),
        (this.refreshAt += e),
        this.refreshAt > 1 &&
          ((this.refreshAt = 0),
          this.syncMembers(),
          this.syncCircuit(),
          this.session.isHost))
      ) {
        let e = this.lobbyId;
        this.sdk.setLobbyData(
          e,
          `racing`,
          this.session.active && !this.session.complete,
        );
        let t = this.sdk.getUser()?.username?.slice(0, 32);
        t &&
          this.sdk.getLobbyData(e, `host`) !== t &&
          this.sdk.setLobbyData(e, `host`, t);
      }
    }
    presence(e) {
      if (!this.sdk || !this.connected) return;
      this.presenceAt += e;
      let t = this.session,
        n = vJ.find((e) => e.id === this.circuit)?.name ?? ``,
        r = this.lobbyId
          ? {
              status:
                t?.active && !t.complete ? `Racing online` : `In a race room`,
              circuit: n,
              pilots: this.members.length,
              maxPilots: 8,
              joinable: this.visibility !== `private`,
            }
          : { status: this.activity(), circuit: yJ.name },
        i = JSON.stringify(r);
      i === this.presenceKey ||
        this.presenceAt < 10 ||
        ((this.presenceKey = i),
        (this.presenceAt = 0),
        this.sdk.updateUserPresence(r).catch(() => {}));
    }
    clear(e = ``) {
      (this.roomRevision++,
        (this.preparingCircuit = ``),
        (this.failedCircuit = ``),
        this.session?.abort(e),
        (this.session = null),
        (this.lobbyId = ``),
        (this.members = []),
        (this.inviteLink = ``),
        (this.message = e),
        (this.chat = []),
        (this.events = []),
        this.invited.clear(),
        this.peers.clear(),
        (this.launching = ``),
        (this.lastStandings = []),
        this.sim.start(`race`, void 0, void 0, zu(GY)),
        (this.sim.mode = `menu`),
        (this.lastActive = !1),
        (this.currentRace = ``),
        this.identity());
    }
    async leave() {
      !this.sdk ||
        !this.lobbyId ||
        (await this.action(async () => {
          let e = await this.sdk.leaveLobby(this.lobbyId);
          if (!e.success) throw Error(e.message);
          this.clear();
        }),
        this.open && !this.lobbyId && this.loadRooms().catch(() => {}));
    }
    status(e) {
      let t = this.session;
      if (!t) return `connecting`;
      if (t.active && !t.complete) return `racing`;
      let n = e === t.selfId;
      if (!n && this.peers.get(e) === `reconnecting`) return `reconnecting`;
      let r = !!(this.launching || this.launchToken());
      return n
        ? t.circuitReady
          ? `ready`
          : r
            ? `loading`
            : `standby`
        : !t.loadouts.has(e) && !t.ready.has(e)
          ? `connecting`
          : t.ready.has(e)
            ? `ready`
            : r
              ? `loading`
              : `standby`;
    }
    hud() {
      let e = this.session,
        t = e?.selfId || ``,
        n = this.sdk?.getUser(),
        r = !!(this.launching || this.launchToken()),
        i = this.members.map((n) => ({
          ...n,
          self: n.id === t,
          host: n.id === e?.hostId,
          avatar: this.avatarUrl(n.id),
          loadout: n.id === t ? this.loadout : (e?.loadouts.get(n.id) ?? null),
          status: this.status(n.id),
          ping: n.id === t ? null : (e?.pings.get(n.id) ?? null),
        }));
      return {
        rules: {
          direction: this.rules.direction,
          weapons: this.rules.weapons,
          disableBoostPads: this.rules.disableBoostPads,
          laps: this.rules.laps,
        },
        available: this.available,
        connected: this.connected,
        busy: this.busy,
        open: this.open,
        lobbyId: this.lobbyId,
        message: this.message || e?.error || ``,
        inviteLink: this.inviteLink,
        selfId: t,
        selfName: n?.username ?? ``,
        selfAvatar: t ? this.avatarUrl(t) : null,
        hostId: e?.hostId || ``,
        hostName: this.members.find((t) => t.id === e?.hostId)?.name ?? ``,
        isHost: !!e?.isHost,
        visibility: this.visibility,
        active: !!e?.active,
        complete: !!e?.complete,
        canStart: !!e?.canStart && this.gameReady(),
        canLaunch:
          !!e?.isHost &&
          this.members.length >= 2 &&
          !r &&
          !this.busy &&
          (!e.active || e.complete) &&
          this.gameReady(),
        launching: r,
        waitingFor: r
          ? i.filter((e) => e.status !== `ready`).map((e) => e.name)
          : [],
        settingsLocked: this.settingsLocked,
        circuitId: this.lobbyId ? this.circuit : yJ.id,
        circuitLoading:
          !!this.preparingCircuit || (!!this.lobbyId && r && !e?.circuitReady),
        ping: e?.ping || 0,
        network: e?.diagnostics() ?? null,
        members: i.map((e) => ({ ...e, ready: e.status === `ready` })),
        pilots: i,
        chat: this.chat.map((e) => ({ ...e, self: e.userId === t })),
        friends: this.friends.map((e) => ({
          ...e,
          invited: this.invited.has(e.id),
          inRoom: this.members.some((t) => t.id === e.id),
        })),
        invites: [...this.invites],
        events: [...this.events],
        roomsTab: this.roomsTab,
        rooms: this.rooms.map((e) => {
          let t = null;
          try {
            let n = JSON.parse(String(e.metadata.rules));
            Bu(n) && (t = n);
          } catch {}
          let n = vJ.find((t) => t.id === e.metadata.circuit);
          return {
            id: e.lobbyId,
            name: String(e.metadata.title || n?.name || `VECTOR Circuit`),
            host: String(e.metadata.host || ``),
            circuitId: n?.id ?? null,
            rules: t,
            visibility: T$(e.visibility),
            count: e.playerCount,
            max: e.maxPlayers,
          };
        }),
        standings: e?.players.length ? this.standings() : this.lastStandings,
      };
    }
    dispose() {
      ((this.disposed = !0),
        this.unsubscribe.forEach((e) => e()),
        this.lobbyId &&
          this.sdk &&
          this.sdk.leaveLobby(this.lobbyId).catch(() => {}));
    }
  },
  A$ = [
    { id: `public`, label: `PUBLIC`, note: `Anyone can join` },
    { id: `friends`, label: `FRIENDS`, note: `Your friends only` },
    { id: `private`, label: `PRIVATE`, note: `Invite link only` },
  ],
  j$ = {
    connecting: `CONNECTING`,
    standby: `IN THE BAY`,
    loading: `LOADING CIRCUIT`,
    ready: `READY`,
    racing: `RACING`,
    reconnecting: `RECONNECTING`,
  };
