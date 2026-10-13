// assets__game-CsnOSIff 95 — recorder
// Lines 39199-39634 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var ZC = () =>
    typeof navigator < `u` && /Chrom(?:e|ium)\//.test(navigator.userAgent),
  QC = class {
    constructor(e = () => {}) {
      ((this.onChange = e),
        (this.options = { quality: `smooth`, fps: 30, hud: !0, audio: !0 }),
        (this.status = `idle`),
        (this.error = null),
        (this.notice = null),
        (this.latestScreenshot = null),
        (this.latestVideo = null),
        (this.recorder = null),
        (this.canvas = null),
        (this.context = null),
        (this.stream = null),
        (this.videoTrack = null),
        (this.audioLease = null),
        (this.chunks = []),
        (this.bytes = 0),
        (this.startedAt = 0),
        (this.elapsed = 0),
        (this.lastFrame = -1 / 0),
        (this.mimeType = ``),
        (this.ticker = null),
        (this.deadline = null),
        (this.finishDeadline = null),
        (this.finishPromise = null),
        (this.finishResolve = null),
        (this.screenshotPending = !1),
        (this.disposed = !1),
        (this.typeCache = new Map()));
    }
    supportedTypes(e) {
      if (
        typeof MediaRecorder > `u` ||
        typeof MediaRecorder.isTypeSupported != `function`
      )
        return [];
      let t = `${e}/${this.options.fps}`,
        n = this.typeCache.get(t);
      return (
        n ||
          ((n = JC(e, this.options.fps).filter((e) =>
            MediaRecorder.isTypeSupported(e),
          )),
          this.typeCache.set(t, n)),
        n
      );
    }
    snapshot() {
      let e = typeof HTMLCanvasElement < `u`,
        t = this.mimeType || this.supportedTypes(this.options.audio)[0];
      return {
        status: this.status,
        elapsed: this.elapsed,
        supported:
          e &&
          typeof HTMLCanvasElement.prototype.captureStream == `function` &&
          !!t,
        screenshotSupported:
          e && typeof HTMLCanvasElement.prototype.toBlob == `function`,
        format: t ? YC(t) : null,
        options: { ...this.options },
        latestScreenshot: this.latestScreenshot
          ? { ...this.latestScreenshot }
          : null,
        latestVideo: this.latestVideo ? { ...this.latestVideo } : null,
        error: this.error,
        notice: this.notice,
      };
    }
    configure(e) {
      this.disposed ||
        this.status === `recording` ||
        this.status === `finishing` ||
        (((e.quality !== void 0 && e.quality !== this.options.quality) ||
          (e.fps !== void 0 && e.fps !== this.options.fps) ||
          (e.audio !== void 0 && e.audio !== this.options.audio)) &&
          (this.mimeType = ``),
        (e.quality === `smooth` || e.quality === `sharp`) &&
          (this.options.quality = e.quality),
        (e.fps === 30 || e.fps === 60) && (this.options.fps = e.fps),
        typeof e.hud == `boolean` && (this.options.hud = e.hud),
        typeof e.audio == `boolean` && (this.options.audio = e.audio),
        this.onChange());
    }
    reportError(e) {
      this.disposed ||
        ((this.error = e),
        this.status !== `recording` &&
          this.status !== `finishing` &&
          (this.status = `error`),
        this.onChange());
    }
    get recordingHud() {
      return this.status === `recording` && this.options.hud;
    }
    draw(e, t, n) {
      let { width: r, height: i } = e.canvas,
        a = XC(t.width, t.height, r, i);
      if (!a)
        throw Error(
          `The game frame is not ready yet. Try capture again in a moment.`,
        );
      return (
        e.save(),
        (e.fillStyle = `#02050a`),
        e.fillRect(0, 0, r, i),
        e.drawImage(t, a.x, a.y, a.width, a.height),
        this.options.hud && n && n(e, r, i, a),
        e.restore(),
        a
      );
    }
    async takeScreenshot(e, t) {
      if (this.disposed || this.screenshotPending) return null;
      this.screenshotPending = !0;
      try {
        let n = document.createElement(`canvas`);
        ((n.width = Math.max(2, Math.min(3840, Math.ceil(e.width / 2) * 2))),
          (n.height = Math.round((n.width * 9) / 16)));
        let r = n.getContext(`2d`, { alpha: !1 });
        if (!r) throw Error(`Screenshots are unavailable in this browser.`);
        let i = this.draw(r, e),
          a = await t;
        if (this.disposed) return null;
        this.options.hud &&
          a &&
          (r.save(), a(r, n.width, n.height, i), r.restore());
        let o = await new Promise((e) => n.toBlob(e, `image/png`));
        if (this.disposed) return null;
        if (!o?.size)
          throw Error(`The screenshot could not be saved. Try again.`);
        let s = this.result(o, `screenshot`, n.width, n.height);
        return (
          this.latestScreenshot &&
            URL.revokeObjectURL(this.latestScreenshot.url),
          (this.latestScreenshot = s),
          this.status === `error` && (this.status = `idle`),
          (this.error = null),
          this.onChange(),
          s
        );
      } catch (e) {
        return (
          this.disposed ||
            ((this.error = this.message(
              e,
              `The screenshot could not be saved.`,
            )),
            this.status !== `recording` &&
              this.status !== `finishing` &&
              (this.status = `error`),
            this.onChange()),
          null
        );
      } finally {
        this.screenshotPending = !1;
      }
    }
    start(e, t, n) {
      if (
        this.disposed ||
        this.status === `recording` ||
        this.status === `finishing`
      )
        return (t?.release(), !1);
      ((this.error = null),
        (this.notice = null),
        (this.elapsed = 0),
        (this.chunks = []),
        (this.bytes = 0),
        (this.finishPromise = null),
        (this.audioLease = t ?? null));
      try {
        if (!this.snapshot().supported)
          throw Error(
            `Video recording is unavailable in this browser. Try a current Chrome, Edge or Safari.`,
          );
        let t = KC[this.options.quality];
        if (
          ((this.canvas = document.createElement(`canvas`)),
          (this.canvas.width = t.width),
          (this.canvas.height = t.height),
          (this.context = this.canvas.getContext(`2d`, { alpha: !1 })),
          !this.context)
        )
          throw Error(`Video capture could not create a recording frame.`);
        if (
          (this.draw(this.context, e, n),
          (this.stream = this.canvas.captureStream(0)),
          (this.videoTrack = this.stream.getVideoTracks()[0] ?? null),
          !this.videoTrack)
        )
          throw Error(`This browser could not capture the game canvas.`);
        typeof this.videoTrack.requestFrame != `function` &&
          (this.stream.getTracks().forEach((e) => e.stop()),
          (this.stream = this.canvas.captureStream(this.options.fps)),
          (this.videoTrack = this.stream.getVideoTracks()[0]));
        let r = this.options.audio
          ? (this.audioLease?.stream
              .getAudioTracks()
              .filter((e) => e.readyState === `live`) ?? [])
          : [];
        r.length ||
          (this.audioLease?.release(),
          (this.audioLease = null),
          this.options.audio &&
            (this.notice = `Game audio is unavailable; this clip will be silent.`));
        for (let e of r) this.stream.addTrack(e);
        for (let e of this.supportedTypes(r.length > 0))
          try {
            ((this.recorder = new MediaRecorder(this.stream, {
              mimeType: e,
              videoBitsPerSecond: qC(
                t.bitsPerSecond[this.options.fps],
                this.options.fps,
                e,
                ZC(),
              ),
              ...(r.length ? { audioBitsPerSecond: 16e4 } : {}),
            })),
              (this.mimeType = this.recorder.mimeType || e),
              this.attachRecorder(this.recorder),
              this.recorder.start(1e3));
            break;
          } catch {
            if (
              this.recorder &&
              ((this.recorder.ondataavailable = null),
              (this.recorder.onerror = null),
              (this.recorder.onstop = null),
              this.recorder.state !== `inactive`)
            )
              try {
                this.recorder.stop();
              } catch {}
            ((this.recorder = null),
              (this.mimeType = ``),
              (this.chunks = []),
              (this.bytes = 0));
          }
        if (!this.recorder)
          throw Error(
            `This browser could not start a video encoder. Try Chrome or a lower recording quality.`,
          );
        return (
          YC(this.mimeType) === `webm` &&
            (this.notice = [
              this.notice,
              `This clip uses WebM. Convert it to MP4 before uploading to X.`,
            ]
              .filter(Boolean)
              .join(` `)),
          (this.startedAt = performance.now()),
          (this.lastFrame = -1 / 0),
          (this.status = `recording`),
          this.videoTrack?.requestFrame?.(),
          (this.ticker = setInterval(() => {
            this.status === `recording` &&
              ((this.elapsed = Math.min(
                120,
                (performance.now() - this.startedAt) / 1e3,
              )),
              this.onChange());
          }, 250)),
          (this.deadline = setTimeout(() => {
            ((this.notice = `Recording saved at the 2 minute clip limit.`),
              this.stop());
          }, 120 * 1e3)),
          this.onChange(),
          !0
        );
      } catch (e) {
        return (
          (this.error = this.message(e, `Video recording could not start.`)),
          (this.status = `error`),
          this.cleanup(),
          this.onChange(),
          !1
        );
      }
    }
    attachRecorder(e) {
      ((e.ondataavailable = ({ data: t }) => {
        this.disposed ||
          this.recorder !== e ||
          !t.size ||
          (this.chunks.push(t),
          (this.bytes += t.size),
          this.bytes >= 402653184 &&
            this.status === `recording` &&
            ((this.notice = `Recording saved at the ${GC / 1024 / 1024} MB size limit.`),
            this.stop()));
      }),
        (e.onerror = () => {
          this.disposed ||
            this.recorder !== e ||
            ((this.error = `The video encoder stopped unexpectedly. Any captured footage has been kept.`),
            this.stop());
        }),
        (e.onstop = () => {
          this.recorder === e && this.finish();
        }));
    }
    captureFrame(e, t, n = performance.now()) {
      if (this.disposed || this.status !== `recording` || !this.context) return;
      let r = 1e3 / this.options.fps;
      if (!(n - this.lastFrame < r - 0.5))
        try {
          (this.draw(this.context, e, t),
            this.videoTrack?.requestFrame?.(),
            (this.lastFrame = Number.isFinite(this.lastFrame)
              ? this.lastFrame +
                r * Math.max(1, Math.floor((n - this.lastFrame) / r))
              : n));
        } catch (e) {
          ((this.error = this.message(
            e,
            `Recording stopped because a game frame could not be captured.`,
          )),
            this.stop());
        }
    }
    stop(e) {
      if (this.finishPromise) return this.finishPromise;
      if (this.disposed || !this.recorder) return Promise.resolve(null);
      (e && (this.notice = e),
        (this.elapsed = Math.min(
          120,
          Math.max(0, (performance.now() - this.startedAt) / 1e3),
        )),
        (this.status = `finishing`),
        this.clearTimers(),
        (this.finishPromise = new Promise((e) => {
          this.finishResolve = e;
        })));
      let t = this.finishPromise;
      this.finishDeadline = setTimeout(() => {
        ((this.error = `The encoder took too long to finish. Any captured footage has been kept.`),
          this.finish());
      }, 1e4);
      try {
        this.recorder.state !== `inactive` && this.recorder.stop();
      } catch {
        this.finish();
      }
      return (this.onChange(), t);
    }
    finish() {
      if (!this.recorder) return;
      let e = null;
      if (!this.disposed && this.chunks.length && this.canvas) {
        let t = new Blob(this.chunks, { type: this.mimeType });
        t.size &&
          ((e = this.result(
            t,
            `video`,
            this.canvas.width,
            this.canvas.height,
            this.elapsed,
          )),
          this.latestVideo && URL.revokeObjectURL(this.latestVideo.url),
          (this.latestVideo = e));
      }
      !this.disposed &&
        !e &&
        !this.error &&
        (this.error = `No video frames were recorded. Let the game run briefly and try again.`);
      let t = this.finishResolve;
      ((this.finishResolve = null),
        this.cleanup(),
        (this.status = this.error ? `error` : `idle`),
        t?.(e),
        this.disposed || this.onChange());
    }
    result(e, t, n, r, i) {
      let a = t === `screenshot` ? `png` : YC(e.type),
        o = new Date().toISOString().replace(/[:.]/g, `-`);
      return {
        url: URL.createObjectURL(e),
        filename: `vector-${t}-${o}.${a}`,
        bytes: e.size,
        kind: t,
        mimeType: e.type,
        width: n,
        height: r,
        ...(i === void 0 ? {} : { duration: i }),
      };
    }
    message(e, t) {
      return e instanceof Error ? e.message : t;
    }
    clearTimers() {
      (this.ticker !== null && clearInterval(this.ticker),
        this.deadline !== null && clearTimeout(this.deadline),
        this.finishDeadline !== null && clearTimeout(this.finishDeadline),
        (this.ticker = null),
        (this.deadline = null),
        (this.finishDeadline = null));
    }
    cleanup() {
      if (
        (this.clearTimers(),
        this.recorder &&
          ((this.recorder.ondataavailable = null),
          (this.recorder.onerror = null),
          (this.recorder.onstop = null),
          this.recorder.state !== `inactive`))
      )
        try {
          this.recorder.stop();
        } catch {}
      (this.stream?.getVideoTracks().forEach((e) => e.stop()),
        this.audioLease?.release(),
        (this.audioLease = null),
        (this.stream = null),
        (this.videoTrack = null),
        (this.recorder = null),
        (this.context = null),
        (this.canvas = null),
        (this.chunks = []),
        (this.bytes = 0));
    }
    dispose() {
      this.disposed ||
        ((this.disposed = !0),
        this.cleanup(),
        this.finishResolve?.(null),
        (this.finishResolve = null),
        this.latestScreenshot && URL.revokeObjectURL(this.latestScreenshot.url),
        this.latestVideo && URL.revokeObjectURL(this.latestVideo.url),
        (this.latestScreenshot = null),
        (this.latestVideo = null));
    }
  };
