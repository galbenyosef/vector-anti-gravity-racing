// assets__index-DphGw8Ou 24 — group
// Lines 77309-77859 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
var X$ = (e) => typeof e == `number` && Number.isSafeInteger(e) && e > 0,
  Z$ = (e, t) => (e === null ? t : t === null ? e : Math.min(e, t)),
  Q$ = class {
    constructor(e, t, n, r = Date.now, i = U$) {
      ((this.getSDK = e),
        (this.hosted = t),
        (this.storage = n),
        (this.now = r),
        (this.definition = i),
        (this.active = !1),
        (this.observedLaps = 0),
        (this.bestMs = null),
        (this.earned = !1),
        (this.confirmed = !1),
        (this.user = ``),
        (this.sdk = null),
        (this.blockedSDK = !1),
        (this.loaded = !1),
        (this.loading = !1),
        (this.generation = 0),
        (this.nextLoad = 0),
        (this.nextSubmit = 0),
        (this.nextCache = 0),
        (this.cacheDirty = !1),
        (this.disposed = !1),
        t || ((this.user = `local`), this.readCache()));
    }
    get lapChallenge() {
      return this.definition === U$;
    }
    get attempt() {
      return `${this.user}:${this.definition.id}`;
    }
    cacheKey() {
      return `vector-achievements-v1:${this.hosted ? `wavedash` : `standalone`}:${this.user}:${this.definition.id}`;
    }
    readCache() {
      try {
        let e = JSON.parse(this.storage?.getItem(this.cacheKey()) || `{}`);
        (this.lapChallenge &&
          X$(e.bestMs) &&
          (this.bestMs = Z$(this.bestMs, e.bestMs)),
          (this.earned ||= e.earned === !0),
          (this.earned ||= this.bestMs !== null && this.bestMs < U$.targetMs));
      } catch {}
    }
    saveCache(e = !1) {
      if (!(
        !this.user ||
        !this.cacheDirty ||
        (!e && this.now() < this.nextCache)
      )) {
        this.nextCache = this.now() + 1e3;
        try {
          (this.storage?.setItem(
            this.cacheKey(),
            JSON.stringify({ bestMs: this.bestMs, earned: this.earned }),
          ),
            (this.cacheDirty = !1));
        } catch {}
      }
    }
    bind() {
      if (!this.hosted || this.disposed) return !1;
      try {
        let e = this.getSDK(),
          t = e?.getUser()?.id;
        if (!e || !t) return !1;
        if (this.sdk === e && this.user === t) return !this.blockedSDK;
        (this.user &&
          this.user !== t &&
          (this.saveCache(!0),
          (this.bestMs = null),
          (this.earned = !1),
          (this.active = !1),
          (this.observedLaps = 0)),
          (this.user = t),
          (this.sdk = e),
          (this.confirmed = !1),
          (this.loaded = this.loading = !1),
          (this.nextLoad = this.nextSubmit = this.nextCache = 0),
          this.generation++);
        let n = q$.get(e);
        return (
          (this.blockedSDK = !!n && n !== t),
          n || q$.set(e, t),
          this.readCache(),
          (this.cacheDirty = !0),
          this.saveCache(),
          !this.blockedSDK
        );
      } catch {
        return !1;
      }
    }
    begin() {
      this.disposed ||
        (this.bind(), (this.active = !0), (this.observedLaps = 0));
    }
    observe(e, t = yJ.id) {
      if (
        !this.disposed &&
        (this.bind(),
        !(
          !this.lapChallenge ||
          !this.active ||
          t !== U$.circuitId ||
          e.kind !== `timed-lap` ||
          e.networked ||
          e.combatId !== `player` ||
          e.rivals.length !== 0 ||
          ![`racing`, `paused`, `finished`].includes(e.mode) ||
          e.lapTimes.length <= this.observedLaps ||
          !Number.isFinite(e.elapsed) ||
          e.elapsed <= 0 ||
          !Number.isFinite(e.distance) ||
          e.distance < e.lapTimes.length * $ ||
          !e.lapTimes.every(
            (e) => e > 0 && Number.isFinite(e) && X$(Math.round(e * 1e3)),
          ) ||
          e.lapTimes.reduce((e, t) => e + t, 0) > e.elapsed + 0.001
        ))
      ) {
        for (let t of e.lapTimes.slice(this.observedLaps))
          this.bestMs = Z$(this.bestMs, Math.round(t * 1e3));
        ((this.observedLaps = e.lapTimes.length),
          (this.earned ||= this.bestMs !== null && this.bestMs < U$.targetMs),
          (this.cacheDirty = !0),
          this.saveCache(!0),
          this.flush());
      }
    }
    get settled() {
      return !this.hosted || this.loaded;
    }
    award() {
      this.disposed ||
        this.lapChallenge ||
        (this.bind(),
        !this.earned &&
          ((this.earned = !0),
          (this.cacheDirty = !0),
          this.saveCache(!0),
          this.flush()));
    }
    tick() {
      this.disposed ||
        !this.hosted ||
        !this.bind() ||
        (!this.loaded &&
          !this.loading &&
          this.now() >= this.nextLoad &&
          this.load(),
        this.loaded && (this.readRemote(), this.flush()));
    }
    async load() {
      let e = this.sdk,
        t = this.generation;
      ((this.nextLoad = this.now() + 3e3), (this.loading = !0));
      try {
        let n = await Y$(e);
        if (
          this.disposed ||
          t !== this.generation ||
          e.getUser()?.id !== this.user ||
          !n.success ||
          !n.data
        )
          return;
        ((this.loaded = !0), this.readRemote(), this.flush());
      } catch {
      } finally {
        t === this.generation && (this.loading = !1);
      }
    }
    readRemote() {
      if (!(this.confirmed || !this.sdk || K$.get(this.sdk)?.has(this.attempt)))
        try {
          this.sdk.getAchievement(this.definition.id) &&
            ((this.earned = this.confirmed = !0),
            (this.cacheDirty = !0),
            this.saveCache(!0));
        } catch {}
    }
    flush() {
      if (this.disposed) return;
      let e = this.bind();
      if (
        (this.saveCache(),
        !e ||
          !this.sdk ||
          !this.loaded ||
          !this.earned ||
          this.confirmed ||
          K$.get(this.sdk)?.has(this.attempt) ||
          this.now() < this.nextSubmit)
      )
        return;
      this.nextSubmit = this.now() + 3e3;
      try {
        if (!this.sdk.setAchievement(this.definition.id, !0)) return;
      } catch {}
      let t = K$.get(this.sdk) ?? new Set();
      (t.add(this.attempt), K$.set(this.sdk, t));
    }
    hud() {
      return {
        id: this.definition.id,
        title: this.definition.title,
        targetMs: U$.targetMs,
        circuitId: U$.circuitId,
        earned: this.earned,
        bestMs: this.bestMs,
        status: this.earned
          ? this.hosted
            ? this.confirmed
              ? `unlocked`
              : `pending`
            : `local`
          : `locked`,
      };
    }
    dispose() {
      this.disposed ||
        (this.flush(),
        this.saveCache(!0),
        (this.active = !1),
        (this.disposed = !0),
        this.generation++);
    }
  },
  $$ = {
    racing: `RACING`,
    "time-trial": `TIME TRIAL`,
    combat: `COMBAT`,
    career: `CAREER`,
    online: `ONLINE`,
  },
  e1 = (e, t) => ({
    earned: (n) => n.stats[e] >= t,
    progress: (n) => ({ have: Math.min(t, Math.floor(n.stats[e])), total: t }),
  }),
  t1 = (e, t) => ({
    earned: (n) => t.every((t) => n.feats.has(e + t)),
    progress: (n) => ({
      have: t.filter((t) => n.feats.has(e + t)).length,
      total: t.length,
    }),
  }),
  n1 = (e) => ({ earned: (t) => t.feats.has(e) }),
  r1 = (e) => (t) => t.career.medals[e] === `gold`,
  i1 = (e) => {
    let t = BZ[e - 1].requires,
      n = (e) => Math.max(rQ(e.career), e.stats.careerPoints);
    return {
      earned: (r) => n(r) >= t || r.stats.careerTier >= e,
      progress: (r) => ({
        have: r.stats.careerTier >= e ? t : Math.min(t, n(r)),
        total: t,
      }),
    };
  },
  a1 = vJ.map((e) => e.id),
  o1 = Xu.map((e) => e.id),
  s1 = QZ.filter((e) => e.rounds).map((e) => e.id),
  c1 = [
    {
      id: `FIRST_FINISH`,
      title: `Lights Out`,
      description: `Finish your first race.`,
      group: `racing`,
      tier: `bronze`,
      icon: `Flag`,
      ...e1(`races`, 1),
    },
    {
      id: `FIRST_WIN`,
      title: `Top Step`,
      description: `Win a race.`,
      group: `racing`,
      tier: `bronze`,
      icon: `Trophy`,
      ...e1(`wins`, 1),
    },
    {
      id: `PODIUMS_25`,
      title: `Podium Regular`,
      description: `Finish on the podium 25 times.`,
      group: `racing`,
      tier: `silver`,
      icon: `Award`,
      ...e1(`podiums`, 25),
    },
    {
      id: `WINS_50`,
      title: `Serial Winner`,
      description: `Win 50 races.`,
      group: `racing`,
      tier: `gold`,
      icon: `Crown`,
      ...e1(`wins`, 50),
    },
    {
      id: `GRAND_TOUR`,
      title: `Grand Tour`,
      description: `Win a race on all five circuits.`,
      group: `racing`,
      tier: `silver`,
      icon: `Map`,
      ...t1(`win:`, a1),
    },
    {
      id: `WRONG_WAY`,
      title: `Wrong Way Round`,
      description: `Win a race on a reversed circuit.`,
      group: `racing`,
      tier: `bronze`,
      icon: `Repeat`,
      ...n1(`reverse-win`),
    },
    {
      id: `FLEET_COMMANDER`,
      title: `Fleet Commander`,
      description: `Finish a race in all five craft.`,
      group: `racing`,
      tier: `silver`,
      icon: `Rocket`,
      ...t1(`ship:`, o1),
    },
    {
      id: `UNTOUCHABLE`,
      title: `Untouchable`,
      description: `Win a race against seven rivals without losing any hull.`,
      group: `racing`,
      tier: `gold`,
      icon: `ShieldCheck`,
      ...n1(`flawless-win`),
    },
    {
      id: `GHOST_IN_THE_MACHINE`,
      title: `Ghost in the Machine`,
      description: `Win a race against a full field of Phantom pilots.`,
      group: `racing`,
      tier: `gold`,
      icon: `Ghost`,
      ...n1(`phantom-win`),
    },
    {
      id: `SPEED_750`,
      title: `Seven-Fifty`,
      description: `Reach 750 km/h.`,
      group: `racing`,
      tier: `silver`,
      icon: `Gauge`,
      ...e1(`speed`, 750),
    },
    {
      id: `DISTANCE_100`,
      title: `Century`,
      description: `Race 100 km.`,
      group: `racing`,
      tier: `bronze`,
      icon: `Route`,
      earned: (e) => e.stats.distance >= 1e5,
      progress: (e) => ({
        have: Math.min(100, Math.floor(e.stats.distance / 1e3)),
        total: 100,
      }),
    },
    {
      id: `DISTANCE_1000`,
      title: `Thousand-Kilometre Club`,
      description: `Race 1,000 km.`,
      group: `racing`,
      tier: `gold`,
      icon: `Orbit`,
      earned: (e) => e.stats.distance >= 1e6,
      progress: (e) => ({
        have: Math.min(1e3, Math.floor(e.stats.distance / 1e3)),
        total: 1e3,
      }),
    },
    {
      id: `FIRST_TIMED_LAP`,
      title: `On the Clock`,
      description: `Complete a Timed Lap.`,
      group: `time-trial`,
      tier: `bronze`,
      icon: `Timer`,
      ...e1(`timedLaps`, 1),
    },
    {
      id: `BENCHMARK`,
      title: `Benchmark`,
      description: `Beat the Expert Par lap on all five circuits in Timed Lap.`,
      group: `time-trial`,
      tier: `gold`,
      icon: `Zap`,
      ...t1(`par:`, a1),
    },
    { ...U$, group: `time-trial`, tier: `gold`, icon: `Flame` },
    {
      id: `CLEAN_SWEEP`,
      title: `Clean Sweep`,
      description: `Collect all 40 orbs in one Orbs run.`,
      group: `time-trial`,
      tier: `silver`,
      icon: `Sparkles`,
      ...n1(`orbs-perfect`),
    },
    {
      id: `FIRST_HIT`,
      title: `Locked On`,
      description: `Land a weapon hit.`,
      group: `combat`,
      tier: `bronze`,
      icon: `Crosshair`,
      ...e1(`hits`, 1),
    },
    {
      id: `HITS_250`,
      title: `Sharpshooter`,
      description: `Land 250 weapon hits.`,
      group: `combat`,
      tier: `gold`,
      icon: `Target`,
      ...e1(`hits`, 250),
    },
    {
      id: `FIRST_MEDAL`,
      title: `Licensed`,
      description: `Win your first career medal.`,
      group: `career`,
      tier: `bronze`,
      icon: `Medal`,
      ...e1(`careerMedals`, 1),
    },
    {
      id: `TIER_PRO`,
      title: `Turning Pro`,
      description: `Open the Pro tier of the career.`,
      group: `career`,
      tier: `bronze`,
      icon: `ChevronsUp`,
      ...i1(2),
    },
    {
      id: `TIER_ELITE`,
      title: `Elite Company`,
      description: `Open the Elite tier of the career.`,
      group: `career`,
      tier: `silver`,
      icon: `Star`,
      ...i1(3),
    },
    {
      id: `TIER_PHANTOM`,
      title: `Phantom Licence`,
      description: `Open the Phantom tier of the career.`,
      group: `career`,
      tier: `gold`,
      icon: `Hexagon`,
      ...i1(4),
    },
    {
      id: `FINALE_CHAMPION`,
      title: `Champion`,
      description: `Win gold in a career finale.`,
      group: `career`,
      tier: `silver`,
      icon: `Trophy`,
      earned: (e) => s1.some((t) => r1(t)(e)),
    },
    {
      id: `BEAT_THE_MACHINE`,
      title: `Beat the Machine`,
      description: `Win gold in the Phantom finale.`,
      group: `career`,
      tier: `gold`,
      icon: `Cpu`,
      earned: r1(`phantom-10`),
    },
    {
      ...W$,
      group: `career`,
      tier: `gold`,
      icon: `BadgeCheck`,
      earned: (e) => TQ(e.career).complete,
      progress: (e) => {
        let t = TQ(e.career);
        return { have: t.medalled, total: t.total };
      },
    },
    {
      ...G$,
      group: `career`,
      tier: `platinum`,
      icon: `Gem`,
      earned: (e) => TQ(e.career).gold,
      progress: (e) => {
        let t = TQ(e.career);
        return { have: t.golds, total: t.total };
      },
    },
    {
      id: `ONLINE_FIRST_RACE`,
      title: `Wired In`,
      description: `Finish an online race.`,
      group: `online`,
      tier: `bronze`,
      icon: `Wifi`,
      ...e1(`online`, 1),
    },
    {
      id: `ONLINE_HOST`,
      title: `Open House`,
      description: `Host an online race through to the finish.`,
      group: `online`,
      tier: `bronze`,
      icon: `Radio`,
      ...n1(`online-host`),
    },
    {
      id: `ONLINE_FIRST_WIN`,
      title: `Net Gain`,
      description: `Win an online race.`,
      group: `online`,
      tier: `silver`,
      icon: `Globe`,
      ...e1(`onlineWins`, 1),
    },
    {
      id: `ONLINE_FULL_HOUSE`,
      title: `Full House`,
      description: `Finish an online race against three or more other pilots.`,
      group: `online`,
      tier: `silver`,
      icon: `Users`,
      ...n1(`online-crowd`),
    },
    {
      id: `ONLINE_WINS_10`,
      title: `Room Ruler`,
      description: `Win 10 online races.`,
      group: `online`,
      tier: `gold`,
      icon: `Swords`,
      ...e1(`onlineWins`, 10),
    },
  ],
  l1 = c1.filter((e) => e.earned);
