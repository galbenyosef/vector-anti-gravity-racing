// assets__game-CsnOSIff 97 — values
// Lines 39923-40636 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var mw = (e) =>
    e
      .replace(/&/g, `&amp;`)
      .replace(/</g, `&lt;`)
      .replace(/>/g, `&gt;`)
      .replace(/"/g, `&quot;`),
  hw = (e) => `<![CDATA[${e.replace(/]]>/g, `]]]]><![CDATA[>`)}]]>`,
  gw = `data:image/svg+xml;charset=utf-8,`,
  _w = class {
    constructor(e) {
      ((this.findRoot = e),
        (this.sheetRules = []),
        (this.fonts = ``),
        (this.prepared = null),
        (this.included = new Set()),
        (this.css = ``),
        (this.head = ``),
        (this.headKey = ``),
        (this.frame = null),
        (this.running = null),
        (this.failures = 0),
        (this.probed = !1),
        (this.broken = !1),
        (this.disposed = !1));
    }
    get usable() {
      return !this.broken && !this.disposed;
    }
    prepare() {
      return (
        (this.prepared ??= this.collect().finally(() => {
          this.prepared = null;
        })),
        this.prepared
      );
    }
    async collect() {
      let e = [
          ...Array.from(document.styleSheets),
          ...(document.adoptedStyleSheets ?? []),
        ],
        t = [];
      for (let n of e)
        try {
          t.push(n.cssRules);
        } catch {}
      ((this.sheetRules = t),
        (this.included = new Set()),
        (this.headKey = ``),
        t.length || (this.broken = !0),
        (this.fonts = await uw(e).catch(() => ``)));
    }
    async still() {
      let e = await this.render(!0);
      return e
        ? (t, n, r, i) => t.drawImage(e.image, i.x, i.y, i.width, i.height)
        : null;
    }
    refresh() {
      return (
        (this.running ??= (async () => {
          try {
            this.frame = (await this.render(!this.frame)) ?? this.frame;
          } finally {
            this.running = null;
          }
        })()),
        this.running
      );
    }
    draw(e, t) {
      return this.frame
        ? (e.drawImage(this.frame.image, t.x, t.y, t.width, t.height), !0)
        : !1;
    }
    release() {
      this.frame = null;
    }
    dispose() {
      ((this.disposed = !0), (this.frame = null));
    }
    async render(e) {
      if (!this.usable) return null;
      try {
        let t = this.findRoot(),
          n = t && this.clone(t);
        if (!n) return null;
        ((e || !this.sheetRules.length) && (await this.prepare()),
          await this.inlineImages(n.shell));
        let r = await this.load(n);
        return this.disposed ? null : ((this.failures = 0), r);
      } catch {
        return (++this.failures >= 2 && (this.broken = !0), null);
      }
    }
    clone(e) {
      let t = e.offsetWidth,
        n = e.offsetHeight;
      if (!t || !n) return null;
      let r = e.cloneNode(!1);
      ((r.style.transform = `none`), (r.style.visibility = `visible`));
      let i = fw(e),
        a = ``,
        o = 0,
        s = (e, t) => {
          let n = i.get(e);
          (n &&
            (t.setAttribute(`data-capture-anim`, String(++o)),
            (a += pw(e, o, n))),
            t.hasAttribute(`data-capture-hidden`) &&
              (t.style.visibility = `hidden`));
          for (let n = 0; n < e.children.length; n++)
            s(e.children[n], t.children[n]);
        },
        c = (e, t) => {
          for (let n of Array.from(e.children))
            if (n.hasAttribute(`data-capture-hud`)) {
              let e = n.cloneNode(!0);
              (s(n, e), t.appendChild(e));
            } else if (n.querySelector(`[data-capture-hud]`)) {
              let e = n.cloneNode(!1);
              (c(n, e), t.appendChild(e));
            }
        };
      c(e, r);
      let l = new Set();
      for (let e of [
        r,
        document.documentElement,
        document.body,
        ...Array.from(r.querySelectorAll(`[class]`)),
      ])
        e.classList.forEach((e) => l.add(e));
      return { shell: r, width: t, height: n, classes: l, animations: a };
    }
    async inlineImages(e) {
      await Promise.all(
        Array.from(e.querySelectorAll(`img`)).map(async (e) => {
          let t = e.getAttribute(`src`);
          e.removeAttribute(`srcset`);
          let n = t ? await lw(new URL(t, document.baseURI).href) : null;
          n ? e.setAttribute(`src`, n) : e.removeAttribute(`src`);
        }),
      );
    }
    header(e) {
      let { classes: t, width: n, height: r } = e;
      if ([...t].some((e) => !this.included.has(e)) || !this.css) {
        for (let e of t) this.included.add(e);
        ((this.css = this.sheetRules.map((e) => iw(e, this.included)).join(``)),
          (this.headKey = ``));
      }
      let i = `${n}x${r}`;
      if (this.headKey !== i) {
        this.headKey = i;
        let e = mw(document.documentElement.className);
        this.head = encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${r}" viewBox="0 0 ${n} ${r}"><foreignObject x="0" y="0" width="${n}" height="${r}"><html xmlns="http://www.w3.org/1999/xhtml" class="${e}" style="background:transparent"><head><style>${hw(this.fonts + this.css)}</style><style>${hw(`*,*::before,*::after{animation-delay:` + dw + `!important;animation-play-state:paused!important}`)}</style>`,
        );
      }
      return this.head;
    }
    async load(e) {
      let { shell: t, width: n, height: r } = e;
      if (!this.css && !this.sheetRules.length)
        throw Error(`The page styles could not be read.`);
      let i = new XMLSerializer().serializeToString(t),
        a = mw(document.body.className),
        o =
          gw +
          this.header(e) +
          encodeURIComponent(
            `<style>${hw(e.animations)}</style></head><body class="${a}" style="margin:0;background:transparent">${i}</body></html></foreignObject></svg>`,
          ),
        s = new Image();
      return (
        (s.width = n),
        (s.height = r),
        await new Promise((e, t) => {
          ((s.onload = () => e()),
            (s.onerror = () => t(Error(`The HUD image did not load.`))),
            (s.src = o));
        }),
        this.probed || this.probe(s),
        { image: s, width: n, height: r }
      );
    }
    probe(e) {
      let t = document.createElement(`canvas`);
      t.width = t.height = 8;
      let n = t.getContext(`2d`, { willReadFrequently: !0 });
      if (!n) throw Error(`No scratch canvas for the HUD probe.`);
      n.drawImage(e, 0, 0, 8, 8);
      try {
        (n.getImageData(0, 0, 1, 1), (this.probed = !0));
      } catch {
        throw (
          (this.broken = !0),
          Error(`This browser blocks drawing the HUD into a canvas.`)
        );
      }
    }
  },
  vw = class {
    constructor(e = 0) {
      this.lastTick = this.lastFrame = e;
    }
    frame(e) {
      return (
        Number.isFinite(e) && (this.lastFrame = Math.max(this.lastFrame, e)),
        this.consume(e)
      );
    }
    background(e, t) {
      return !t && e - this.lastFrame < 100 ? null : this.consume(e);
    }
    consume(e) {
      if (!Number.isFinite(e) || e <= this.lastTick) return 0;
      let t = Math.min((e - this.lastTick) / 1e3, 2);
      return ((this.lastTick = e), t);
    }
  },
  yw = class {
    constructor(e) {
      ((this.getSDK = e),
        (this.open = !1),
        (this.circuit = O),
        (this.kind = `race`),
        (this.direction = `normal`),
        (this.loading = !1),
        (this.message = ``),
        (this.entries = []),
        (this.own = null),
        (this.ids = new Map()),
        (this.request = 0),
        (this.observedLaps = 0),
        (this.attempt = this.newAttempt(O)));
    }
    newAttempt(e, t = `race`, n = `normal`) {
      return {
        circuit: e,
        kind: t,
        direction: t === `timed-lap` ? n : `normal`,
        score: 0,
        status: `idle`,
        message: ``,
        rank: 0,
        best: 0,
      };
    }
    begin(e = O, t = `race`, n = `normal`) {
      ((this.observedLaps = 0), (this.attempt = this.newAttempt(e, t, n)));
    }
    excludeModifiers() {
      this.attempt.status === `idle` &&
        ((this.attempt.status = `ineligible`),
        (this.attempt.message = `Custom race · local records only.`));
    }
    resolve(e, t, n, r) {
      let i = se(t, n, r),
        a = this.ids.get(i);
      return (
        a ||
          ((a = e
            .getOrCreateLeaderboard(
              i,
              e.LeaderboardSortOrder.ASC,
              e.LeaderboardDisplayType.TIME_MILLISECONDS,
            )
            .then((e) => {
              if (!e.success) throw Error(e.message);
              return e.data.id;
            })
            .catch((e) => {
              throw (this.ids.delete(i), e);
            })),
          this.ids.set(i, a)),
        a
      );
    }
    observe(e, t = !0) {
      let n = this.attempt;
      if (n.kind !== `race` || e.mode !== `finished` || n.status !== `idle`)
        return;
      let r = e.lapTimes.reduce((e, t) => e + t, 0);
      if (
        !t ||
        e.lapTimes.length !== n.circuit.laps ||
        !e.lapTimes.every((e) => Number.isFinite(e) && e > 0) ||
        !Number.isFinite(e.elapsed) ||
        e.elapsed <= 0 ||
        Math.abs(r - e.elapsed) > 0.001
      ) {
        ((n.status = `ineligible`),
          (n.message = `Complete all laps to record a leaderboard time.`));
        return;
      }
      ((n.score = Math.round(e.elapsed * 1e3)), this.submit(n));
    }
    observeLap(e) {
      if (
        this.attempt.kind !== `timed-lap` ||
        e.kind !== `timed-lap` ||
        e.networked
      )
        return;
      if (e.lapTimes.length === this.observedLaps) {
        this.attempt.status === `unavailable` &&
          this.getSDK() &&
          this.submit(this.attempt);
        return;
      }
      if (
        ((this.observedLaps = e.lapTimes.length),
        !e.lapTimes.length ||
          !e.lapTimes.every((e) => Number.isFinite(e) && e > 0) ||
          !Number.isFinite(e.elapsed) ||
          e.lapTimes.reduce((e, t) => e + t, 0) > e.elapsed + 0.001)
      )
        return;
      let t = Math.round(Math.min(...e.lapTimes) * 1e3);
      if (t <= 0 || (this.attempt.score > 0 && t >= this.attempt.score)) return;
      let n = this.newAttempt(
        this.attempt.circuit,
        `timed-lap`,
        this.attempt.direction,
      );
      ((n.score = t), (this.attempt = n), this.submit(n));
    }
    async submit(e) {
      let t = this.getSDK();
      if (!t) {
        ((e.status = `unavailable`),
          (e.message = `Play on Wavedash to record your time on the leaderboard.`));
        return;
      }
      ((e.status = `saving`), (e.message = `Saving your track time…`));
      try {
        let n = await this.resolve(t, e.circuit, e.kind, e.direction),
          r = await t.uploadLeaderboardScore(n, e.score, !0, void 0, {
            track: e.circuit.id,
            laps: e.kind === `timed-lap` ? 1 : e.circuit.laps,
            mode: e.kind,
            direction: e.direction,
            boost: `pads-and-turbo`,
          });
        if (!r.success) throw Error(r.message);
        ((e.status = `saved`),
          (e.rank = r.data.globalRank),
          (e.best = r.data.score / 1e3),
          (e.message = r.data.scoreChanged
            ? `Personal best saved.`
            : `Time submitted. Your faster personal best stands.`),
          this.open &&
            this.attempt === e &&
            this.circuit.id === e.circuit.id &&
            this.kind === e.kind &&
            this.direction === e.direction &&
            this.refresh());
      } catch {
        ((e.status = `failed`),
          (e.message = `Your time could not be saved. Retry before starting another session.`));
      }
    }
    retry() {
      this.attempt.status === `failed` && this.submit(this.attempt);
    }
    setOpen(e, t = this.kind, n = this.direction) {
      ((this.open = e), e && this.refresh(this.circuit, t, n));
    }
    selectCircuit(e, t = this.kind, n = this.direction) {
      (this.request++,
        (this.circuit = e),
        (this.kind = t),
        (this.direction = t === `timed-lap` ? n : `normal`),
        (this.loading = !1),
        (this.message = ``),
        (this.entries = []),
        (this.own = null));
    }
    async refresh(
      e = this.circuit,
      t = this.kind,
      n = t === this.kind ? this.direction : `normal`,
    ) {
      let r = ++this.request;
      (t !== `timed-lap` && (n = `normal`),
        (this.circuit.id !== e.id || this.kind !== t || this.direction !== n) &&
          ((this.entries = []), (this.own = null)),
        (this.circuit = e),
        (this.kind = t),
        (this.direction = n),
        (this.message = ``));
      let i = this.getSDK();
      if (!i) {
        ((this.loading = !1),
          (this.message = `Play VECTOR on Wavedash to view and enter the track leaderboards.`));
        return;
      }
      this.loading = !0;
      try {
        let a = await this.resolve(i, e, t, n),
          [o, s] = await Promise.all([
            i.listLeaderboardEntries(a, 0, 20),
            i.getMyLeaderboardEntries(a),
          ]);
        if (!o.success) throw Error(o.message);
        if (!s.success) throw Error(s.message);
        if (r !== this.request) return;
        ((this.entries = o.data), (this.own = s.data[0] || null));
      } catch {
        r === this.request &&
          (this.message = `Unable to load track times. Refresh to try again.`);
      } finally {
        r === this.request && (this.loading = !1);
      }
    }
    hud() {
      return {
        open: this.open,
        available: !!this.getSDK(),
        circuit: this.circuit,
        kind: this.kind,
        direction: this.direction,
        loading: this.loading,
        message: this.message,
        entries: this.entries,
        own: this.own,
        result: { ...this.attempt },
      };
    }
  },
  bw = {
    races: [`VECTOR_RACES_COMPLETED`, `Races completed`],
    wins: [`VECTOR_RACE_WINS`, `Race wins`],
    podiums: [`VECTOR_PODIUMS`, `Podium finishes`],
    online: [`VECTOR_ONLINE_RACES`, `Online races completed`],
    laps: [`VECTOR_LAPS_COMPLETED`, `Laps completed`],
    timedLaps: [`VECTOR_TIMED_LAPS`, `Timed laps completed`],
    time: [`VECTOR_RACE_TIME_MS`, `Time racing (milliseconds)`],
    distance: [`VECTOR_DISTANCE_METRES`, `Distance raced (metres)`],
    speed: [`VECTOR_TOP_SPEED_KPH`, `Top speed (km/h)`],
    pickups: [`VECTOR_WEAPON_PICKUPS`, `Weapon pickups collected`],
    hits: [`VECTOR_WEAPON_HITS`, `Weapon hits landed`],
    onlineWins: [`VECTOR_ONLINE_WINS`, `Online wins`],
    onlineLosses: [`VECTOR_ONLINE_LOSSES`, `Online losses`],
    careerEvents: [`VECTOR_CAREER_EVENTS`, `Career events completed`],
    careerPoints: [`VECTOR_CAREER_POINTS`, `Career points`],
    careerMedals: [`VECTOR_CAREER_MEDALS`, `Career events medalled`],
    careerGolds: [`VECTOR_CAREER_GOLDS`, `Career gold medals`],
    careerTier: [`VECTOR_CAREER_TIER`, `Highest career tier`],
  },
  xw = new Set([
    `speed`,
    `careerPoints`,
    `careerMedals`,
    `careerGolds`,
    `careerTier`,
  ]),
  Sw = Object.keys(bw),
  Cw = () => Object.fromEntries(Sw.map((e) => [e, 0])),
  ww = (e) =>
    typeof e == `number` && Number.isFinite(e) && e >= 0
      ? Math.min(e, 2 ** 53 - 1)
      : 0,
  Tw = (e) => Object.fromEntries(Sw.map((t) => [t, ww(e?.[t])])),
  Ew = class {
    constructor(e, t, n, r = Date.now) {
      if (
        ((this.getSDK = e),
        (this.hosted = t),
        (this.storage = n),
        (this.now = r),
        (this.values = Cw()),
        (this.confirmed = Cw()),
        (this.observed = Cw()),
        (this.active = !1),
        (this.finished = !1),
        (this.sdk = null),
        (this.user = ``),
        (this.loaded = !1),
        (this.loading = !1),
        (this.disposed = !1),
        (this.inFlight = null),
        (this.failed = {}),
        (this.unsubscribe = []),
        (this.nextLoad = 0),
        (this.nextFlush = 0),
        (this.nextCache = 0),
        (this.saved = !1),
        (this.cacheDirty = !1),
        (this.definitionMissing = !1),
        !t)
      ) {
        this.user = `local`;
        let e = this.readCache();
        ((this.values = e.values), (this.loaded = !0));
      }
    }
    cacheKey() {
      return `vector-pilot-stats-v1:${this.user}`;
    }
    readCache() {
      try {
        let e = JSON.parse(this.storage?.getItem(this.cacheKey()) || `{}`);
        return { values: Tw(e.values), confirmed: Tw(e.confirmed) };
      } catch {
        return { values: Cw(), confirmed: Cw() };
      }
    }
    saveCache() {
      if (!(!this.user || !this.cacheDirty))
        try {
          (this.storage?.setItem(
            this.cacheKey(),
            JSON.stringify({ values: this.values, confirmed: this.confirmed }),
          ),
            (this.saved = !!this.storage),
            (this.cacheDirty = !1));
        } catch {
          this.saved = !1;
        }
    }
    begin() {
      ((this.observed = Cw()), (this.finished = !1), (this.active = !0));
    }
    observe(e, t) {
      if (!this.active || e.mode === `menu`) return;
      let n = e.networked ? t?.players.find((e) => e.id === t.selfId) : null;
      if (e.networked && !n) return;
      let r = n?.state ?? e;
      if (r.elapsed <= 0) return;
      let i = e.combat.pilots[e.combatId],
        a = {
          time: r.elapsed * 1e3,
          distance: r.mode === `finished` ? r.raceDistance : r.distance,
          laps: r.lapTimes.length,
          timedLaps: e.kind === `timed-lap` ? r.lapTimes.length : 0,
          pickups: i?.pickups ?? 0,
          hits: i?.hits ?? 0,
        };
      for (let e of Object.keys(a)) {
        let t = ww(a[e]),
          n = Math.max(0, t - this.observed[e]);
        ((this.observed[e] += n),
          (this.values[e] += n),
          n && (this.cacheDirty = !0));
      }
      if (r.mode === `racing`) {
        let e = Math.floor(ww(r.speed) * 3.6);
        e > this.values.speed &&
          ((this.values.speed = e), (this.cacheDirty = !0));
      }
      if (
        !this.finished &&
        e.kind === `race` &&
        r.mode === `finished` &&
        !n?.dnf &&
        r.lapTimes.length === e.laps
      ) {
        this.finished = !0;
        let r =
          n && t
            ? Kn(t.players).findIndex((e) => e.id === n.id) + 1
            : e.position;
        (this.values.races++,
          r === 1 && this.values.wins++,
          r >= 1 && r <= 3 && this.values.podiums++,
          n &&
            (this.values.online++,
            r === 1 ? this.values.onlineWins++ : this.values.onlineLosses++),
          (this.cacheDirty = !0),
          this.flush());
      } else
        !this.finished &&
          n?.dnf &&
          t?.complete &&
          ((this.finished = !0),
          this.values.onlineLosses++,
          (this.cacheDirty = !0),
          this.flush());
    }
    career(e, t) {
      let n = Object.values(e.medals),
        r = {
          careerPoints: Xt(e),
          careerMedals: n.length,
          careerGolds: n.filter((e) => e === `gold`).length,
          careerTier: er.filter((t) => sr(t, e)).length,
        };
      for (let e of Object.keys(r))
        r[e] > this.values[e] &&
          ((this.values[e] = r[e]), (this.cacheDirty = !0));
      t && (this.values.careerEvents++, (this.cacheDirty = !0));
    }
    tick() {
      if (this.disposed) return;
      let e = this.now();
      (this.hosted &&
        !this.loaded &&
        !this.loading &&
        e >= this.nextLoad &&
        this.load(),
        e >= this.nextCache && ((this.nextCache = e + 1e3), this.saveCache()),
        e >= this.nextFlush && this.flush());
    }
    async load() {
      this.nextLoad = this.now() + 3e3;
      let e = this.getSDK();
      if (e) {
        this.loading = !0;
        try {
          let t = e.getUser();
          if (!t?.id) return;
          this.sdk ||
            ((this.sdk = e),
            this.unsubscribe.push(
              e.on(e.Events.STATS_STORED, (e) => this.stored(e.success)),
            ));
          let n = await e.requestStats();
          if (this.disposed || !n.success || !n.data) return;
          let r = Cw();
          this.definitionMissing = !1;
          for (let t of Sw)
            ((r[t] = ww(e.getStat(bw[t][0]))),
              e.setStat(bw[t][0], r[t]) || (this.definitionMissing = !0));
          if (this.definitionMissing) return;
          this.user = t.id;
          let i = this.readCache();
          for (let e of Sw) {
            let t = i.values[e] > i.confirmed[e] ? i.values[e] : 0,
              n = Math.max(r[e], t);
            ((this.values[e] = xw.has(e)
              ? Math.max(n, this.values[e])
              : n + this.values[e]),
              (this.confirmed[e] = r[e]));
          }
          ((this.loaded = !0), (this.cacheDirty = !0), this.flush());
        } catch {
        } finally {
          this.loading = !1;
        }
      }
    }
    flush() {
      if (
        ((this.nextFlush = this.now() + 1e4),
        this.saveCache(),
        !this.hosted ||
          !this.loaded ||
          !this.sdk ||
          this.inFlight ||
          this.disposed)
      )
        return;
      let e = {};
      for (let t of Sw) {
        let n = Math.floor(this.values[t]);
        n > this.confirmed[t] && this.failed[t] !== n && (e[t] = n);
      }
      if (Object.keys(e).length) {
        this.inFlight = e;
        try {
          for (let t of Object.keys(e))
            this.sdk.setStat(bw[t][0], e[t]) ||
              (delete e[t], (this.definitionMissing = !0));
          if (!Object.keys(e).length) {
            this.inFlight = null;
            return;
          }
          this.sdk.storeStats() || this.stored(!1);
        } catch {
          this.stored(!1);
        }
      }
    }
    stored(e) {
      let t = this.inFlight;
      if (t) {
        this.inFlight = null;
        for (let n of Object.keys(t))
          e
            ? ((this.confirmed[n] = t[n]), delete this.failed[n])
            : (this.failed[n] = t[n]);
        ((this.cacheDirty = !0), this.saveCache());
      }
    }
    hud() {
      let e = Sw.some((e) => Math.floor(this.values[e]) > this.confirmed[e]),
        t = this.hosted
          ? this.loaded
            ? this.inFlight
              ? `saving`
              : e || this.definitionMissing
                ? `pending`
                : `synced`
            : `loading`
          : `local`;
      return {
        values: { ...this.values },
        status: t,
        savedOnDevice: this.saved,
        available: this.loaded,
        hasProgress: this.values.time > 0,
      };
    }
    dispose() {
      (this.flush(),
        (this.disposed = !0),
        this.unsubscribe.forEach((e) => e()));
    }
  },
  Dw = `vector-feats-v1`,
  Ow = /^[a-z0-9:-]{1,64}$/;
