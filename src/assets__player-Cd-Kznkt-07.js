// assets__player-Cd-Kznkt 07 — phase
// Lines 3081-3548 of readable/assets__player-Cd-Kznkt.pretty.js (statement-aligned).
var Ft = class {
    constructor(e) {
      ((this.capacity = e), (this.cursor = 0));
      let t = new N(),
        n = (t) => {
          let n = new T(new Float32Array(e * t), t);
          return (n.setUsage(ee), n);
        };
      this.attributes = {
        position: n(3),
        aVelocity: n(3),
        aColor: n(4),
        aLife: n(2),
      };
      for (let t = 0; t < e; t++) this.attributes.aLife.setXY(t, -100, 0);
      for (let [e, n] of Object.entries(this.attributes)) t.setAttribute(e, n);
      ((this.points = new ae(
        t,
        new O({
          vertexShader: Ye,
          fragmentShader: Xe,
          uniforms: {
            uTime: $(0),
            uSize: $(0.35),
            uPixel: $(500),
            uDrag: $(2.2),
          },
          blending: 2,
          transparent: !0,
          depthWrite: !1,
        }),
      )),
        (this.points.frustumCulled = !1));
    }
    burst(e, n, r, i) {
      let o = new a();
      for (let a = 0; a < n; a++) {
        let n = this.cursor;
        ((this.cursor = (this.cursor + 1) % this.capacity),
          o.randomDirection());
        let s = t.lerp(i.speed[0], i.speed[1], Math.random() ** 1.5),
          c = i.colors[a % i.colors.length];
        (this.attributes.position.setXYZ(n, e.x, e.y, e.z),
          this.attributes.aVelocity.setXYZ(n, o.x * s, o.y * s, o.z * s),
          this.attributes.aColor.setXYZW(
            n,
            c.r,
            c.g,
            c.b,
            t.lerp(i.size[0], i.size[1], Math.random()),
          ),
          this.attributes.aLife.setXY(
            n,
            r,
            t.lerp(i.life[0], i.life[1], Math.random()),
          ));
      }
      for (let e of Object.values(this.attributes)) e.needsUpdate = !0;
    }
    update(e, t) {
      ((this.points.material.uniforms.uTime.value = e),
        (this.points.material.uniforms.uPixel.value = t));
    }
    dispose() {
      (this.points.geometry.dispose(), this.points.material.dispose());
    }
  },
  It = `
attribute float aAlong, aSide, aDelay, aHeight, aLetter;
uniform float uReveal, uWobble, uTime;
varying float vAlong, vSide, vHeight, vLetter, vLocal;
void main() {
  vAlong = aAlong;
  vSide = aSide;
  vHeight = aHeight;
  vLetter = aLetter;
  vLocal = clamp((uReveal - aDelay) / 0.55, 0.0, 1.0);
  vec3 p = position;
  // The Amiga wobble: each scanline of the logo slides on its own sine.
  p.x += sin(p.y * 1.25 + uTime * 5.0) * uWobble;
  p.y += sin(p.x * 0.3 + uTime * 3.0) * uWobble * 0.35;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`,
  Lt = `
uniform float uFill, uKick, uOpacity, uTime;
uniform vec3 uNeon, uMark;
varying float vAlong, vSide, vHeight, vLetter, vLocal;
void main() {
  if (vAlong > vLocal + 0.0001) discard;
  float edge = abs(vSide);
  float head = smoothstep(0.07, 0.0, vLocal - vAlong) * step(vLocal, 0.999);
  vec3 neon = uNeon * (0.18 + 2.2 * smoothstep(0.55, 1.0, edge));
  float h = vHeight;
  vec3 chrome = h > 0.5
    ? mix(vec3(1.0, 0.98, 0.95), vec3(0.16, 0.42, 1.0), pow((h - 0.5) * 2.0, 0.7))
    : mix(vec3(0.22, 0.06, 0.02), vec3(1.0, 0.7, 0.35), pow(max(h, 0.0) * 2.0, 1.3));
  chrome += vec3(1.5) * smoothstep(0.035, 0.0, abs(h - 0.5));
  // A copper highlight rolling down through the chrome.
  float band = fract(uTime * 0.35);
  chrome += vec3(1.6, 1.1, 0.7) * smoothstep(0.07, 0.0, abs(h - 1.2 + band * 1.4));
  chrome = mix(chrome, uMark * (0.55 + 0.8 * h), step(vLetter, 0.5));
  vec3 filled = chrome * (1.0 + uKick * 0.3) + uNeon * smoothstep(0.78, 1.0, edge) * 1.6;
  vec3 col = mix(neon, filled, uFill) + vec3(3.5) * head;
  gl_FragColor = vec4(col * uOpacity, uOpacity);
}`,
  Rt = `
attribute vec4 aSeed;
uniform float uTravel, uLength;
varying float vEnd;
void main() {
  float z = mod(aSeed.z + uTravel, 220.0) - 200.0 + aSeed.w * uLength;
  vec3 p = vec3(cos(aSeed.x) * aSeed.y, sin(aSeed.x) * aSeed.y, z);
  vEnd = aSeed.w;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`,
  zt = `
uniform vec3 uColor;
uniform float uOpacity;
varying float vEnd;
void main() {
  gl_FragColor = vec4(uColor * (0.1 + vEnd * 1.4) * uOpacity, 1.0);
}`,
  Bt = (e) => new Promise((t) => setTimeout(t, e)),
  Vt = class {
    constructor(e, t) {
      ((this.host = e),
        (this.options = t),
        (this.canvas = document.createElement(`canvas`)),
        (this.director = null),
        (this.context = null),
        (this.buffer = null),
        (this.source = null),
        (this.gain = null),
        (this.analyser = null),
        (this.spectrum = new Uint8Array(256)),
        (this.startAt = 0),
        (this.clockStart = 0),
        (this.pausedAt = 0),
        (this.silent = !1),
        (this.phase = `gate`),
        (this.blocked = !1),
        (this.unlockedAt = -1 / 0),
        (this.loaded = !1),
        (this.hold = null),
        (this.wantsStart = !1),
        (this.frame = 0),
        (this.last = 0),
        (this.skipAt = 0),
        (this.bass = 0),
        (this.high = 0),
        (this.width = 0),
        (this.height = 0),
        (this.gateStart = performance.now()),
        (this.disposed = !1),
        (this.visibility = () => {
          document.hidden
            ? (this.context?.suspend().catch(() => {}),
              this.silent && (this.pausedAt = performance.now()))
            : ((this.phase === `playing` || this.phase === `ending`) &&
                this.context?.resume().catch(() => {}),
              this.silent &&
                this.pausedAt &&
                ((this.clockStart += performance.now() - this.pausedAt),
                (this.pausedAt = 0)));
        }),
        (this.loop = (e) => {
          if (this.disposed || this.phase === `ended`) return;
          this.frame = requestAnimationFrame(this.loop);
          let t = this.director;
          if (!t) return;
          let n = Math.min(0.1, (e - (this.last || e)) / 1e3);
          this.last = e;
          try {
            let r = (e - this.gateStart) / 1e3,
              i;
            if (this.phase === `gate` || this.phase === `starting`)
              i = t.gate(r, {
                ready: this.isReady,
                touch: this.options.touch,
                hold: this.loaded ? this.hold : null,
                waiting: this.wantsStart,
                blocked: this.blocked,
                starting: this.phase === `starting`,
              });
            else {
              if (((r = this.clock()), r >= vt)) return this.finish(`complete`);
              if (
                (this.analyse(),
                (i = t.frame({
                  time: Math.max(0, r),
                  beat: _t(r),
                  dt: n,
                  bass: this.bass,
                  high: this.high,
                  width: this.width,
                  height: this.height,
                })),
                this.phase === `ending`)
              ) {
                let t = 1 - (e - this.skipAt) / 400;
                if (t <= 0) return this.finish(`skipped`);
                i.fade *= t;
              }
            }
            (t.render(this.renderer, this.post.scene), this.post.render(i, r));
          } catch (e) {
            (console.error(`[intro] stopped`, e), this.finish(`error`));
          }
        }),
        (this.canvas.className = `vector-intro-canvas`),
        e.appendChild(this.canvas),
        (this.renderer = new ye({
          canvas: this.canvas,
          antialias: !1,
          alpha: !1,
          stencil: !1,
          powerPreference: `high-performance`,
        })),
        (this.renderer.autoClear = !1),
        (this.renderer.outputColorSpace = S),
        (this.renderer.toneMapping = 0),
        (this.post = new ct(this.renderer, t.mobile ? 0 : 4)),
        (this.loader = new we(this.renderer, t.mobile)),
        (this.resizeObserver = new ResizeObserver(() => this.resize())),
        this.resizeObserver.observe(e),
        this.resize(),
        document.addEventListener(`visibilitychange`, this.visibility),
        (this.frame = requestAnimationFrame(this.loop)));
    }
    get autoplay() {
      return this.context?.state === `running`;
    }
    get isReady() {
      return this.loaded && !this.hold;
    }
    setHold(e) {
      ((this.hold = e), this.isReady && this.wantsStart && this.begin());
    }
    get hasLoaded() {
      return this.loaded;
    }
    get isPlaying() {
      return this.phase === `playing`;
    }
    async load() {
      let e = this.options.hero,
        t = this.loadAudio();
      if (
        (await Promise.all(
          [`900 100px ${B()}`, `300 100px ${B()}`, `500 30px ${B(!0)}`].map(
            (e) => document.fonts.load(e).catch(() => []),
          ),
        ),
        this.disposed)
      )
        return;
      let n = new At(this.loader.assets, {
        hero: e,
        mobile: this.options.mobile,
      });
      ((this.director = n),
        n.resize(this.width, this.height),
        this.post.compile());
      let r = this.loader.essentials(e).catch((e) => {
          this.disposed || console.warn(`[intro] essentials unavailable`, e);
        }),
        i = r
          .then(() => this.loader.rest(e))
          .then(() => {
            if (!this.disposed)
              return (n.attachAssets(), n.compile(this.renderer));
          })
          .catch((e) => {
            this.disposed || console.warn(`[intro] late assets`, e);
          });
      (await Promise.all([t, r]),
        !this.disposed &&
          (n.attachAssets(),
          await n.compile(this.renderer).catch(() => {}),
          await Promise.race([i, Bt(1e4)]),
          !this.disposed &&
            ((this.loaded = !0),
            this.isReady && this.wantsStart && this.begin())));
    }
    async loadAudio() {
      try {
        this.context = new AudioContext({ latencyHint: `interactive` });
        let e = await fetch(new URL(mt, document.baseURI).href);
        if (!e.ok) throw Error(`HTTP ${e.status}`);
        let t = await e.arrayBuffer(),
          n = new OfflineAudioContext(2, 1, 48e3);
        this.buffer = await n.decodeAudioData(t);
      } catch (e) {
        console.warn(`[intro] music unavailable`, e);
      }
    }
    requestStart() {
      (this.phase !== `gate` && this.phase !== `starting`) ||
        ((this.wantsStart = !0),
        this.unlockAudio(),
        this.phase === `gate` && this.isReady && this.begin());
    }
    unlockAudio() {
      let e = this.context;
      if (e?.state !== `running`) {
        if (performance.now() - this.unlockedAt < 1e3) {
          e?.resume().catch(() => {});
          return;
        }
        try {
          let t = new AudioContext({ latencyHint: `interactive` }),
            n = t.createBufferSource();
          ((n.buffer = t.createBuffer(1, 1, t.sampleRate)),
            n.connect(t.destination),
            n.start(),
            t.resume().catch(() => {}),
            (this.context = t),
            (this.unlockedAt = performance.now()),
            e && e.state !== `closed` && e.close().catch(() => {}));
        } catch {
          e?.resume().catch(() => {});
        }
      }
    }
    async begin() {
      if (this.phase !== `gate`) return;
      this.phase = `starting`;
      let e = this.options.freeze !== void 0;
      if (this.buffer && !e) {
        this.context?.resume().catch(() => {});
        let e = performance.now();
        for (; this.context?.state !== `running`;) {
          if ((await Bt(40), this.disposed || this.phase !== `starting`))
            return;
          !this.blocked &&
            performance.now() - e > 2500 &&
            ((this.blocked = !0),
            console.info(
              `[intro] waiting for sound`,
              JSON.stringify({ state: this.context?.state ?? null }),
            ));
        }
        this.blocked = !1;
      }
      let t = this.context,
        n = Math.max(0, this.options.seek ?? 0);
      if (t?.state === `running` && this.buffer && !e) {
        let e = t.createBufferSource();
        e.buffer = this.buffer;
        let r = t.createAnalyser();
        ((r.fftSize = 512), (r.smoothingTimeConstant = 0.55));
        let i = t.createGain();
        ((i.gain.value = this.options.volume),
          e.connect(r),
          r.connect(i),
          i.connect(t.destination));
        let a = t.currentTime + 0.1;
        (e.start(a, n),
          (this.startAt = a - n),
          Object.assign(this, { source: e, analyser: r, gain: i }));
      } else
        ((this.silent = !0),
          (this.clockStart = performance.now() + 100 - n * 1e3));
      ((this.phase = `playing`),
        console.info(
          `[intro] start`,
          JSON.stringify({
            silent: this.silent,
            state: t?.state ?? null,
            pressed: this.unlockedAt > -1 / 0,
          }),
        ));
    }
    skip() {
      if (this.phase === `gate` || this.phase === `starting`)
        return this.finish(`skipped at the gate`);
      if (
        this.phase === `playing` &&
        ((this.phase = `ending`),
        (this.skipAt = performance.now()),
        this.gain && this.context)
      ) {
        let e = this.context.currentTime;
        (this.gain.gain.cancelScheduledValues(e),
          this.gain.gain.setValueAtTime(this.gain.gain.value, e),
          this.gain.gain.linearRampToValueAtTime(0, e + 0.4));
      }
    }
    finish(e) {
      if (this.phase !== `ended`) {
        (console.info(
          `[intro] end`,
          JSON.stringify({ reason: e, at: +this.clockNow().toFixed(2) }),
        ),
          (this.phase = `ended`));
        try {
          this.source?.stop();
        } catch {}
        this.options.onEnd();
      }
    }
    clockNow() {
      return this.phase === `gate` || this.phase === `starting`
        ? 0
        : this.clock();
    }
    clock() {
      if (this.options.freeze !== void 0) {
        let e = window.__introFreeze;
        return typeof e == `number` ? e : this.options.freeze;
      }
      if (this.silent)
        return ((this.pausedAt || performance.now()) - this.clockStart) / 1e3;
      let e = this.context,
        t = (e.outputLatency || 0) + (e.baseLatency || 0);
      return e.currentTime - this.startAt - t;
    }
    resize() {
      let e = this.host.getBoundingClientRect(),
        t = Math.min(window.devicePixelRatio || 1, 2),
        n = Math.max(2, e.width * t),
        r = Math.max(2, e.height * t),
        i = this.options.mobile ? 11e5 : 28e5,
        a = Math.min(1, Math.sqrt(i / (n * r)));
      ((n = Math.round(n * a)),
        (r = Math.round(r * a)),
        !(n === this.width && r === this.height) &&
          ((this.width = n),
          (this.height = r),
          this.renderer.setPixelRatio(1),
          this.renderer.setSize(n, r, !1),
          this.post.setSize(n, r),
          this.director?.resize(n, r)));
    }
    analyse() {
      let e = this.analyser;
      if (!e || !this.context) return;
      e.getByteFrequencyData(this.spectrum);
      let t = this.context.sampleRate / e.fftSize,
        n = 0,
        r = 0,
        i = 0,
        a = Math.max(1, Math.floor(150 / t));
      for (let e = 1; e <= a; e++) n += this.spectrum[e];
      for (let n = Math.floor(4e3 / t); n < e.frequencyBinCount; n++, i++)
        r += this.spectrum[n];
      ((this.bass += (n / a / 255 - this.bass) * 0.5),
        (this.high += (r / Math.max(1, i) / 160 - this.high) * 0.5));
    }
    dispose() {
      if (!this.disposed) {
        ((this.disposed = !0),
          cancelAnimationFrame(this.frame),
          this.resizeObserver.disconnect(),
          document.removeEventListener(`visibilitychange`, this.visibility));
        try {
          this.source?.stop();
        } catch {}
        (this.context?.close().catch(() => {}),
          this.director?.dispose(),
          this.loader.dispose(),
          this.post.dispose(),
          this.renderer.dispose(),
          this.renderer.forceContextLoss(),
          this.canvas.remove());
      }
    }
  };
