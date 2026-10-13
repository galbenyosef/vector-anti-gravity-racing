// assets__game-CsnOSIff 93 — music
// Lines 38464-39168 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var zC = { seconds: 0.8, from: 500, to: 3e3, peak: 0.1 },
  BC = { seconds: 1.4, from: 300, to: 3600, peak: 0.16 },
  VC = class {
    constructor(e, t) {
      ((this.ctx = e),
        (this.sources = []),
        (this.partials = []),
        (this.brakePan = null),
        (this.boosting = !1),
        (this.turbo = !1));
      let n = (t, n) => {
          let r = e.createGain();
          return ((r.gain.value = t), r.connect(n), r);
        },
        r = (t, n, r, i) => {
          let a = e.createBiquadFilter();
          return (
            (a.type = t),
            (a.frequency.value = n),
            (a.Q.value = r),
            a.connect(i),
            a
          );
        },
        i = (n, r) => {
          let i = e.createBufferSource();
          ((i.buffer = t),
            (i.loop = !0),
            (i.playbackRate.value = n),
            i.connect(r),
            this.sources.push(i));
        },
        a = (t, n, ...r) => {
          let i = e.createOscillator();
          i.frequency.value = t;
          let a = e.createGain();
          ((a.gain.value = n), i.connect(a));
          for (let e of r) a.connect(e);
          return (this.sources.push(i), a);
        };
      ((this.output = e.createGain()),
        (this.output.gain.value = 0),
        (this.whineGain = n(0, this.output)),
        (this.whineFilter = r(`lowpass`, 2400, 0.7, this.whineGain)));
      for (let [t, r] of IC) {
        let i = e.createOscillator();
        ((i.type = t === 1 ? `sine` : `triangle`),
          (i.frequency.value = 300 * t),
          i.connect(n(r, this.whineFilter)),
          this.partials.push(i),
          this.sources.push(i));
      }
      this.vibrato = a(5.3, 8, ...this.partials.map((e) => e.detune));
      let o = e.createBufferSource();
      ((o.buffer = t), (o.loop = !0), (o.playbackRate.value = 0.004));
      let s = r(`lowpass`, 3, 0.5, e.createGain()),
        c = e.createGain();
      ((c.gain.value = 22), s.disconnect(), s.connect(c));
      for (let e of this.partials) c.connect(e.detune);
      (o.connect(s),
        this.sources.push(o),
        a(0.23, 0.004, this.whineGain.gain),
        a(0.37, 0.003, this.whineGain.gain),
        (this.roarGain = n(0, this.output)),
        (this.roarFilter = r(`lowpass`, 400, 0.9, this.roarGain)),
        (this.rumbleGain = n(0, this.output)));
      let l = r(`lowpass`, 160, 0.7, this.rumbleGain),
        u = r(`highpass`, 70, 0.7, this.roarFilter);
      (u.connect(l),
        i(0.71, u),
        (this.humGain = n(0, this.output)),
        (this.hum = e.createOscillator()),
        (this.hum.frequency.value = 50),
        this.hum.connect(this.humGain),
        this.sources.push(this.hum),
        (this.airGain = n(0, this.output)),
        (this.airFilter = r(`bandpass`, 900, 0.6, this.airGain)),
        i(1, this.airFilter),
        (this.brakeGain = e.createGain()),
        (this.brakeGain.gain.value = 0),
        typeof e.createStereoPanner == `function`
          ? ((this.brakePan = e.createStereoPanner()),
            this.brakeGain.connect(this.brakePan),
            this.brakePan.connect(this.output))
          : this.brakeGain.connect(this.output),
        (this.brakeFilter = r(`bandpass`, 2e3, 1.4, this.brakeGain)),
        i(1.13, this.brakeFilter),
        (this.surgeGain = n(1e-4, this.output)),
        (this.surgeFilter = r(`bandpass`, 600, 1.1, this.surgeGain)),
        i(0.87, this.surgeFilter));
      for (let e of this.sources) e.start();
    }
    update(e, t = this.ctx.currentTime) {
      let n = RC(e),
        r = (e, n, r) => e.setTargetAtTime(n, t, r);
      (r(this.output.gain, n.level, 0.03),
        IC.forEach(([e], t) =>
          r(this.partials[t].frequency, n.whineHz * e, 0.12),
        ),
        r(this.whineFilter.frequency, n.whineHz * 3.5, 0.12),
        r(this.whineGain.gain, n.whineGain, 0.08),
        r(this.vibrato.gain, n.vibratoCents, 0.3),
        r(this.roarFilter.frequency, n.roarHz, 0.06),
        r(this.roarGain.gain, n.roarGain, 0.06),
        r(this.rumbleGain.gain, n.rumbleGain, 0.08),
        r(this.hum.frequency, n.humHz, 0.2),
        r(this.humGain.gain, n.humGain, 0.1),
        r(this.airFilter.frequency, n.airHz, 0.1),
        r(this.airGain.gain, n.airGain, 0.1),
        r(this.brakeFilter.frequency, n.brakeHz, 0.05),
        r(this.brakeGain.gain, n.brakeGain, 0.04),
        this.brakePan && r(this.brakePan.pan, n.brakePan, 0.05));
      let i = e.active;
      (i && e.turbo && !this.turbo
        ? this.whoosh(BC, t)
        : i && e.boost && !this.boosting && !e.turbo && this.whoosh(zC, t),
        (this.turbo = i && e.turbo),
        (this.boosting = i && e.boost));
    }
    whoosh(e, t) {
      let n = this.surgeFilter.frequency,
        r = this.surgeGain.gain;
      (n.cancelScheduledValues(t),
        n.setValueAtTime(e.from, t),
        n.exponentialRampToValueAtTime(e.to, t + e.seconds * 0.6),
        r.cancelScheduledValues(t),
        r.setValueAtTime(1e-4, t),
        r.linearRampToValueAtTime(e.peak, t + 0.12),
        r.exponentialRampToValueAtTime(1e-4, t + e.seconds));
    }
    stop() {
      for (let e of this.sources)
        try {
          e.stop();
        } catch {}
      this.output.disconnect();
    }
  },
  HC = 0.8,
  UC = 0.75,
  WC = class {
    setMix(e, t, n) {
      let r = (e) => (Number.isFinite(e) ? Math.min(1, Math.max(0, e)) : 0),
        i = r(e),
        a = r(t),
        o = r(n),
        s =
          i !== this.volume ||
          a !== this.musicVolume ||
          o !== this.effectsVolume;
      ((this.volume = i),
        (this.musicVolume = a),
        (this.effectsVolume = o),
        this.applyMusicLevel(),
        s &&
          console.info(
            `[audio] mix`,
            JSON.stringify({
              master: this.volume,
              music: this.musicVolume,
              effects: this.effectsVolume,
            }),
          ));
    }
    musicOpen() {
      return !this.muted && this.volume > 0 && this.musicVolume > 0;
    }
    applyMusicLevel() {
      (this.music && (this.music.volume = HC * this.musicVolume),
        this.menuMusic && (this.menuMusic.volume = UC * this.musicVolume));
    }
    rememberError(e, t) {
      this.errors[e] ??=
        t instanceof Error ? `${t.name}: ${t.message}` : String(t);
    }
    optionalAudio(e, t) {
      if (this.errors[e]) return !1;
      try {
        return (t(), !0);
      } catch (t) {
        if ((this.rememberError(e, t), e === `effects`)) {
          try {
            this.craft && (this.craft.output.gain.value = 0);
          } catch {}
          this.stopCombatVoices();
        }
        return !1;
      }
    }
    stopCombatVoices() {
      for (let e of this.combatVoices)
        try {
          e.stop();
        } catch {}
      this.combatVoices.clear();
    }
    constructor() {
      ((this.context = null),
        (this.master = null),
        (this.craft = null),
        (this.music = null),
        (this.menuMusic = null),
        (this.menuSource = null),
        (this.menuPlayPending = !1),
        (this.menuPlayBlocked = !1),
        (this.menuActive = !1),
        (this.musicSource = null),
        (this.musicAnalyser = null),
        (this.musicSpectrum = new Float32Array(EC / 2)),
        (this.musicMeter = new AC(48e3)),
        (this.tunnel = null),
        (this.tunnelWeight = 0),
        (this.musicPlayPending = !1),
        (this.musicPlayBlocked = !1),
        (this.musicGeneration = 0),
        (this.trackIndex = 0),
        (this.shuffle = !0),
        (this.queue = []),
        (this.combatBus = null),
        (this.cueBus = null),
        (this.effectsDry = null),
        (this.combatBank = null),
        (this.combatVoices = new Set()),
        (this.lastRocket = { owner: ``, time: -1 }),
        (this.active = !1),
        (this.disposed = !1),
        (this.captureReleases = new Set()),
        (this.errors = {}),
        (this.preparation = null),
        (this.preparationAbort = new AbortController()),
        (this.prepared = null),
        (this.preparationProgress = 0),
        (this.muted = !1),
        (this.volume = 0.9),
        (this.musicVolume = 1),
        (this.effectsVolume = 1));
      try {
        this.shuffle = localStorage.getItem(mt) !== `off`;
        let e = localStorage.getItem(vn);
        this.trackIndex = Math.max(
          0,
          Fn.findIndex((t) => t.id === e),
        );
      } catch {}
      this.shuffle && (this.trackIndex = Math.floor(Math.random() * Fn.length));
    }
    prepare(e = () => {}) {
      if (this.disposed) return Promise.resolve();
      if ((e(this.preparationProgress), this.preparation))
        return this.preparation;
      try {
        ((this.context ??= new AudioContext()), this.prepareMusicElements());
      } catch {
        return Promise.resolve();
      }
      return (
        (this.preparation = MC(
          this.context.sampleRate,
          this.preparationAbort.signal,
          (t) => {
            this.disposed ||
              ((this.preparationProgress = Math.max(
                this.preparationProgress,
                t,
              )),
              e(this.preparationProgress));
          },
        )
          .then((e) => {
            this.disposed || (this.prepared = e);
          })
          .catch(() => {})),
        this.preparation
      );
    }
    prepareMusicElements() {
      (this.music ||
        ((this.music = new Audio(
          new URL(Fn[this.trackIndex].url, document.baseURI).href,
        )),
        (this.music.onended = () => this.playTrack(this.nextTrack())),
        (this.music.preload = `auto`)),
        this.menuMusic ||
          ((this.menuMusic = new Audio(new URL(Wt.url, document.baseURI).href)),
          (this.menuMusic.loop = !0),
          (this.menuMusic.preload = `auto`)),
        this.applyMusicLevel());
    }
    snapshot() {
      let e = this.menuActive ? Wt : Fn[this.trackIndex],
        t = this.menuActive ? this.menuMusic : this.music;
      return {
        context: this.menuActive ? `menu` : `race`,
        id: e.id,
        title: e.title,
        artist: e.artist,
        index: this.trackIndex,
        total: Fn.length,
        shuffle: this.shuffle,
        playing:
          !!t &&
          !t.paused &&
          (this.active || this.menuActive) &&
          this.musicOpen(),
        tunnel: +this.tunnelWeight.toFixed(3),
        musicEnergy: { ...this.musicMeter.value },
        errors: { ...this.errors },
        preparation: {
          ready: !!this.prepared || !!this.combatBank,
          progress: this.preparationProgress,
          sampleRate:
            this.prepared?.sampleRate ?? this.context?.sampleRate ?? 0,
        },
      };
    }
    musicEnergy(e) {
      return !this.disposed &&
        this.active &&
        !this.menuActive &&
        this.musicOpen() &&
        this.context?.state === `running` &&
        this.music &&
        !this.music.paused &&
        !this.music.ended &&
        !this.music.muted &&
        this.music.volume > 0 &&
        this.music.readyState >= 2 &&
        this.musicAnalyser &&
        this.optionalAudio(`analysis`, () =>
          this.musicAnalyser.getFloatFrequencyData(this.musicSpectrum),
        )
        ? this.musicMeter.sample(this.musicSpectrum, e)
        : this.musicMeter.sample(null, e);
    }
    setTunnel(e) {
      let t = Number.isFinite(e) ? Math.min(1, Math.max(0, e)) : 0;
      (Math.abs(t - this.tunnelWeight) < 0.002 &&
        (t === 0) == (this.tunnelWeight === 0)) ||
        ((this.tunnelWeight = t),
        this.context &&
          this.optionalAudio(`tunnel`, () =>
            this.tunnel?.set(t, this.context.currentTime),
          ));
    }
    selectTrack(e) {
      this.disposed ||
        !Number.isInteger(e) ||
        e < 0 ||
        e >= Fn.length ||
        ((this.queue = []), this.playTrack(e));
    }
    setShuffle(e) {
      if (!(this.disposed || e === this.shuffle)) {
        ((this.shuffle = e), (this.queue = []));
        try {
          localStorage.setItem(mt, e ? `on` : `off`);
        } catch {}
      }
    }
    nextTrack() {
      return this.shuffle
        ? (this.queue.length || (this.queue = St(Fn.length, this.trackIndex)),
          this.queue.shift() ?? this.trackIndex)
        : (this.trackIndex + 1) % Fn.length;
    }
    playTrack(e) {
      if (e !== this.trackIndex) {
        this.trackIndex = e;
        try {
          localStorage.setItem(vn, Fn[e].id);
        } catch {}
        this.music &&
          (this.musicGeneration++,
          (this.musicPlayPending = !1),
          (this.musicPlayBlocked = !1),
          this.music.pause(),
          (this.music.src = new URL(Fn[e].url, document.baseURI).href),
          this.music.load(),
          this.active && this.musicOpen() && this.playMusic());
      }
    }
    async unlock() {
      if (this.disposed) return;
      if (!this.master) {
        this.context ??= new AudioContext();
        let e = this.context;
        ((this.master = e.createGain()),
          (this.master.gain.value = 0),
          this.master.connect(e.destination),
          (this.effectsDry = e.createGain()),
          (this.effectsDry.gain.value = this.effectsVolume),
          this.effectsDry.connect(this.master));
        let t =
          this.prepared?.sampleRate === e.sampleRate ? this.prepared : null;
        ((this.tunnel = new TC(e, t?.impulse)),
          this.tunnel.set(this.tunnelWeight, e.currentTime),
          this.tunnel.output.connect(this.master));
        let n = this.tunnel.inputs.world;
        this.combatBank = hC(e, t?.combat);
        let r = () => {
          let t = e.createDynamicsCompressor();
          return (
            (t.threshold.value = -10),
            (t.knee.value = 9),
            (t.ratio.value = 8),
            (t.attack.value = 0.002),
            (t.release.value = 0.11),
            t
          );
        };
        ((this.combatBus = r()),
          this.combatBus.connect(n),
          (this.cueBus = r()),
          this.cueBus.connect(this.effectsDry));
        let i = e.createBuffer(1, e.sampleRate * 2, e.sampleRate),
          a = i.getChannelData(0);
        if (t) a.set(t.wind);
        else for (let e = 0; e < a.length; e++) a[e] = Math.random() * 2 - 1;
        ((this.craft = new VC(e, i)),
          this.craft.output.connect(n),
          this.prepareMusicElements(),
          (this.musicSource = e.createMediaElementSource(this.music)),
          (this.musicAnalyser = e.createAnalyser()),
          (this.musicAnalyser.fftSize = EC),
          (this.musicAnalyser.smoothingTimeConstant = 0),
          (this.musicMeter = new AC(e.sampleRate)),
          this.musicSource.connect(this.musicAnalyser),
          this.musicSource.connect(this.tunnel.inputs.music),
          (this.menuSource = e.createMediaElementSource(this.menuMusic)),
          this.menuSource.connect(this.master));
      }
      ((this.musicPlayBlocked = !1), (this.menuPlayBlocked = !1));
      let e = this.context.resume();
      (this.musicOpen() &&
        (this.active
          ? this.playMusic()
          : this.menuActive && this.playMenuMusic()),
        await e);
    }
    createCaptureAudio() {
      if (
        this.disposed ||
        !this.context ||
        !this.master ||
        this.context.state !== `running`
      )
        return null;
      let e = this.master,
        t = this.context.createMediaStreamDestination();
      e.connect(t);
      let n = !1,
        r = () => {
          if (!n) {
            n = !0;
            try {
              e.disconnect(t);
            } catch {}
            (t.stream.getTracks().forEach((e) => e.stop()),
              this.captureReleases.delete(r));
          }
        };
      return (this.captureReleases.add(r), { stream: t.stream, release: r });
    }
    playMusic() {
      let e = this.music;
      if (
        !e ||
        !this.musicSource ||
        !e.paused ||
        this.musicPlayPending ||
        this.musicPlayBlocked ||
        this.disposed
      )
        return;
      this.musicPlayPending = !0;
      let t = this.musicGeneration,
        n = (e) => {
          t !== this.musicGeneration ||
            this.disposed ||
            (e instanceof DOMException && e.name === `AbortError`) ||
            ((this.musicPlayBlocked = !0), this.rememberError(`playback`, e));
        };
      try {
        Promise.resolve(e.play())
          .catch(n)
          .finally(() => {
            t === this.musicGeneration && (this.musicPlayPending = !1);
          });
      } catch (e) {
        (n(e), (this.musicPlayPending = !1));
      }
    }
    playMenuMusic() {
      if (
        !this.menuMusic ||
        !this.menuSource ||
        !this.menuMusic.paused ||
        this.menuPlayPending ||
        this.menuPlayBlocked ||
        this.disposed
      )
        return;
      this.menuPlayPending = !0;
      let e = (e) => {
        this.disposed ||
          (e instanceof DOMException && e.name === `AbortError`) ||
          ((this.menuPlayBlocked = !0), this.rememberError(`playback`, e));
      };
      try {
        Promise.resolve(this.menuMusic.play())
          .catch(e)
          .finally(() => {
            this.menuPlayPending = !1;
          });
      } catch (t) {
        (e(t), (this.menuPlayPending = !1));
      }
    }
    tone(e, t = 0.15, n = 0.1, r, i = `sine`, a = !1) {
      this.optionalAudio(`effects`, () => this.playTone(e, t, n, r, i, a));
    }
    playTone(e, t, n, r, i, a) {
      if (!this.context || !this.master || this.effectsVolume <= 0) return;
      let o = this.context,
        s = r ?? o.currentTime,
        c = o.createOscillator(),
        l = o.createGain();
      ((c.type = i),
        c.frequency.setValueAtTime(e, s),
        l.gain.setValueAtTime(0.001, s),
        l.gain.exponentialRampToValueAtTime(Math.max(0.002, n), s + 0.009),
        l.gain.exponentialRampToValueAtTime(0.001, s + t),
        c.connect(l),
        l.connect(
          a && this.tunnel
            ? this.tunnel.inputs.world
            : (this.effectsDry ?? this.master),
        ),
        c.start(s),
        c.stop(s + t + 0.02),
        (c.onended = () => {
          (c.disconnect(), l.disconnect());
        }));
    }
    combatSound(e, t = 1, n = 0) {
      this.optionalAudio(`effects`, () => this.playCombatSound(e, t, n));
    }
    playCombatSound(e, t, n) {
      if (
        this.muted ||
        !this.active ||
        !this.context ||
        !this.master ||
        !this.combatBank ||
        !this.combatBus ||
        !this.cueBus ||
        this.volume <= 0 ||
        this.effectsVolume <= 0
      )
        return;
      if (e.kind === `fire` && e.item === `rockets`) {
        if (
          this.lastRocket.owner === e.owner &&
          Math.abs(e.time - this.lastRocket.time) < 0.06
        )
          return;
        this.lastRocket = { owner: e.owner, time: e.time };
      }
      let r =
          e.kind === `heal`
            ? `absorb`
            : e.kind === `recover`
              ? `recover`
              : e.kind === `pickup`
                ? `pickup`
                : e.kind === `lock`
                  ? `lock`
                  : e.kind === `block`
                    ? `shield-block`
                    : e.kind === `fire` && e.item !== `energy`
                      ? e.item
                      : e.item === `cannon`
                        ? `cannon-hit`
                        : `impact`,
        i = this.context,
        a = i.createBufferSource(),
        o = i.createGain(),
        s = i.createStereoPanner();
      if (
        ((a.buffer = this.combatBank[r]),
        (a.playbackRate.value = [`pickup`, `lock`, `absorb`].includes(r)
          ? 1
          : 0.97 + (e.id % 7) * 0.01),
        (o.gain.value =
          t *
          (r === `cannon`
            ? 0.58
            : r === `cannon-hit`
              ? 0.33
              : r === `shield-block`
                ? e.item === `cannon`
                  ? 0.22
                  : 0.6
                : r === `pickup` || r === `lock`
                  ? 0.36
                  : 0.78)),
        (s.pan.value = Math.max(-0.85, Math.min(0.85, n))),
        a.connect(o),
        o.connect(s),
        s.connect(
          r === `pickup` || r === `lock` || r === `absorb`
            ? this.cueBus
            : this.combatBus,
        ),
        this.combatVoices.size >= 40)
      ) {
        let e = this.combatVoices.values().next().value;
        e && (this.combatVoices.delete(e), e.stop());
      }
      (this.combatVoices.add(a),
        (a.onended = () => {
          (this.combatVoices.delete(a),
            a.disconnect(),
            o.disconnect(),
            s.disconnect());
        }),
        a.start());
    }
    update(e, t, n, r = !1, i = { ...NC, speed: e, boost: t }) {
      if (
        (!n &&
          this.active &&
          (this.stopCombatVoices(),
          (this.lastRocket = { owner: ``, time: -1 })),
        (this.active = n),
        (this.menuActive = r && !n && !Vn()),
        this.applyMusicLevel(),
        this.menuActive && this.musicOpen()
          ? this.playMenuMusic()
          : this.menuMusic && !this.menuMusic.paused && this.menuMusic.pause(),
        n && this.musicOpen()
          ? this.playMusic()
          : this.music && !this.music.paused && this.music.pause(),
        !this.context || !this.master || !this.craft)
      )
        return;
      let a = this.context.currentTime;
      (this.optionalAudio(`mix`, () => {
        (this.master.gain.setTargetAtTime(
          this.muted || (!n && !this.menuActive) ? 0 : this.volume * 0.55,
          a,
          0.1,
        ),
          this.tunnel?.inputs.world.gain.setTargetAtTime(
            this.effectsVolume,
            a,
            0.1,
          ),
          this.effectsDry?.gain.setTargetAtTime(this.effectsVolume, a, 0.1));
      }),
        this.optionalAudio(`effects`, () => {
          this.craft.update({ ...i, active: n }, a);
        }));
    }
    dispose() {
      ((this.disposed = !0),
        this.preparationAbort.abort(),
        (this.prepared = null));
      for (let e of this.captureReleases) e();
      (this.musicGeneration++,
        this.music &&
          ((this.music.onended = null),
          this.music.pause(),
          this.music.removeAttribute(`src`),
          this.music.load()),
        this.menuMusic &&
          (this.menuMusic.pause(),
          this.menuMusic.removeAttribute(`src`),
          this.menuMusic.load()),
        this.menuSource?.disconnect(),
        (this.menuSource = null),
        (this.menuMusic = null),
        this.combatVoices.clear(),
        (this.combatBank = null),
        this.combatBus?.disconnect(),
        (this.combatBus = null),
        this.cueBus?.disconnect(),
        (this.cueBus = null),
        this.musicSource?.disconnect(),
        (this.musicSource = null),
        this.musicAnalyser?.disconnect(),
        (this.musicAnalyser = null),
        this.musicMeter.reset(),
        this.tunnel?.dispose(),
        (this.tunnel = null),
        (this.music = null),
        this.context?.close().catch(() => {}),
        (this.context = null));
    }
  },
  GC = 384 * 1024 * 1024,
  KC = {
    smooth: { width: 1280, height: 720, bitsPerSecond: { 30: 8e6, 60: 12e6 } },
    sharp: { width: 1920, height: 1080, bitsPerSecond: { 30: 16e6, 60: 22e6 } },
  };
