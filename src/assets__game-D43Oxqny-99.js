// assets__game-D43Oxqny 99 — sim
// Lines 41306-43758 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var yT = ([e], [t]) => (e < t ? -1 : +(e > t)),
  bT = (e) =>
    JSON.stringify([
      Object.entries(e.career.medals).sort(yT),
      Object.entries(e.career.best).sort(yT),
      Object.entries(e.laps).sort(yT),
      e.feats,
      Object.entries(e.ghosts)
        .map(([e, t]) => [e, t.lap])
        .sort(yT),
    ]),
  xT = class {
    constructor(e, t, n, r, i = Date.now) {
      ((this.getSDK = e),
        (this.hosted = t),
        (this.storage = n),
        (this.apply = r),
        (this.now = i),
        (this.user = ``),
        (this.resolved = !1),
        (this.syncing = !1),
        (this.pending = !1),
        (this.nextSync = 0),
        (this.failures = 0),
        (this.disposed = !1),
        (this.encoder = new TextEncoder()),
        (this.decoder = new TextDecoder()),
        (this.status = t ? `loading` : `local`));
    }
    changed() {
      this.disposed ||
        !this.hosted ||
        ((this.pending = !0),
        this.resolved &&
          this.failures === 0 &&
          (this.nextSync = this.now() + hT),
        this.resolved && (this.status = `saving`));
    }
    tick() {
      this.disposed ||
        !this.hosted ||
        this.syncing ||
        ((!this.resolved || this.pending) &&
          this.now() >= this.nextSync &&
          this.sync());
    }
    flush() {
      (this.pending && this.failures === 0 && (this.nextSync = 0), this.tick());
    }
    hud() {
      return { status: this.status, cloud: this.hosted };
    }
    dispose() {
      (this.flush(), (this.disposed = !0));
    }
    readLocal() {
      let e = this.storage(),
        t = {},
        n = {};
      try {
        for (let r = 0; e && r < e.length; r++) {
          let i = e.key(r);
          if (i?.startsWith(`vector-best-lap-`)) t[i] = e.getItem(i);
          else if (i?.startsWith(`vector-ghost-v1:`))
            try {
              n[i.slice(Qw.length)] = JSON.parse(e.getItem(i) ?? `null`);
            } catch {}
        }
      } catch {}
      return _T({
        career: Sn(e),
        laps: Object.fromEntries(
          Object.entries(t).map(([e, t]) => [e, Number(t)]),
        ),
        feats: qw(e),
        ghosts: n,
      });
    }
    writeLocal(e, t) {
      let n = this.storage();
      (we(n, e.career), Jw(n, e.feats));
      try {
        if (t) {
          let t = this.readLocal();
          for (let r of Object.keys(t.laps)) r in e.laps || n?.removeItem(r);
          for (let r of Object.keys(t.ghosts))
            r in e.ghosts || n?.removeItem(Qw + r);
        }
        for (let t of Object.values(e.ghosts)) sT(n, t);
        for (let [t, r] of Object.entries(e.laps)) n?.setItem(t, String(r));
      } catch {}
    }
    backoff() {
      return Math.min(6e4, 4e3 * 2 ** Math.min(this.failures, 4));
    }
    async sync() {
      let e = this.getSDK(),
        t = e?.getUser()?.id;
      if (!e || !t) {
        this.nextSync = this.now() + 1e3;
        return;
      }
      ((this.syncing = !0),
        (this.pending = !1),
        this.resolved || (this.status = `loading`));
      try {
        let n = await e.downloadRemoteFile(pT);
        if (this.disposed) return;
        let r = gT;
        if (n.success) {
          let t = await e.readLocalFile(pT);
          if (this.disposed) return;
          r = t ? this.parse(t) : gT;
        } else if (!/\b404\b/.test(n.message)) throw Error(n.message);
        let i = this.readLocal(),
          a = this.readOwner(),
          o = !!a && a !== t,
          s = o ? r : vT(i, r);
        if (
          ((this.user = t),
          this.writeOwner(),
          bT(s) !== bT(i) && (this.writeLocal(s, o), this.apply(s)),
          bT(s) !== bT(r))
        ) {
          this.status = `saving`;
          let t = JSON.stringify({
            version: 1,
            savedAt: this.now(),
            ...s,
            ghosts: Object.fromEntries(
              Object.entries(s.ghosts).map(([e, t]) => [e, rT(t)]),
            ),
          });
          if (
            !(await e.writeLocalFile(
              `/vector/progress-v1.json`,
              this.encoder.encode(t),
            ))
          )
            throw Error(`Local save failed`);
          let n = await e.uploadRemoteFile(pT);
          if (!n.success) throw Error(n.message);
        }
        ((this.resolved = !0),
          (this.failures = 0),
          (this.status = this.pending ? `saving` : `synced`));
      } catch {
        (this.failures++,
          this.resolved && (this.pending = !0),
          (this.nextSync = this.now() + this.backoff()),
          (this.status = `offline`));
      } finally {
        this.syncing = !1;
      }
    }
    parse(e) {
      let t;
      try {
        t = JSON.parse(this.decoder.decode(e));
      } catch {
        return gT;
      }
      if (typeof t.version == `number` && t.version > 1)
        throw Error(`Saved by a newer version`);
      return t.version === 1 ? _T(t) : gT;
    }
    readOwner() {
      try {
        let e = JSON.parse(
          this.storage()?.getItem(`vector-progress-sync`) || `{}`,
        );
        return typeof e.user == `string` ? e.user : ``;
      } catch {
        return ``;
      }
    }
    writeOwner() {
      try {
        this.storage()?.setItem(mT, JSON.stringify({ user: this.user }));
      } catch {}
    }
  },
  ST = {
    steer: 0,
    throttle: 0,
    brake: 0,
    airLeft: 0,
    airRight: 0,
    fire: !1,
    absorb: !1,
  },
  CT = class {
    resetTouch() {
      ((this.touch = { ...ST }),
        (this.touchPad = {
          steer: 0,
          airLeft: 0,
          airRight: 0,
          tapLeft: 0,
          tapRight: 0,
        }),
        (this.touchSteer = 0));
    }
    get selectedSkin() {
      return this.shipSkins[this.selectedShip];
    }
    presenceActivity() {
      return this.sim.mode === `menu`
        ? `In the menus`
        : this.careerEvent
          ? `Racing the career`
          : this.sim.kind === `timed-lap`
            ? `Setting timed laps`
            : `Quick racing`;
    }
    currentLoadout() {
      return {
        ship: this.selectedShip,
        skin: this.selectedSkin,
        tier: this.careerBadge.tier,
        medals: this.careerBadge.medals,
      };
    }
    syncLobby() {
      let e = this.online;
      if (!e.open) {
        this.world.lobby?.active && this.world.setLobby(null);
        return;
      }
      e.setLoadout(this.currentLoadout());
      let t = e.session,
        n =
          [`countdown`, `racing`, `paused`].includes(this.sim.mode) ||
          (!!t?.active && !t.complete && this.sim.mode !== `finished`);
      if (!e.open || !this.ready || this.circuitLoading || n) {
        this.world.setLobby(null);
        return;
      }
      let r = this.lobbyPilots();
      for (let e of r)
        e.ship &&
          e.skin !== `original` &&
          this.world.ensureCraft(e.ship, e.skin);
      this.world.setLobby(r);
    }
    lobbyPilots() {
      return this.online.lobbyId
        ? this.online.roster()
        : [
            {
              id: `self`,
              self: !0,
              ship: this.selectedShip,
              skin: this.selectedSkin,
            },
          ];
    }
    refreshCaptureHud() {
      this.capture.recordingHud
        ? this.hudCapture.refresh()
        : this.hudCapture.release();
    }
    constructor(e, t, n) {
      ((this.host = e),
        (this.notify = t),
        (this.error = n),
        (this.sim = new pt()),
        (this.audio = new nw()),
        (this.capture = new uw(() => {
          this.disposed || this.notify(this.hud());
        })),
        (this.hudCapture = new kw(
          () =>
            this.host
              .closest(`.game-stage`)
              ?.querySelector(`:scope > .racer-app`) ?? null,
        )),
        (this.keys = new Set()),
        (this.touch = { ...ST }),
        (this.touchPad = {
          steer: 0,
          airLeft: 0,
          airRight: 0,
          tapLeft: 0,
          tapRight: 0,
        }),
        (this.touchSteer = 0),
        (this.controller = !1),
        (this.ready = !1),
        (this.loading = {
          active: !0,
          progress: null,
          stage: `Preparing the circuit`,
          target: null,
        }),
        (this.graphicsPolicy = Un()),
        (this.diagnostics = un()),
        (this.detachIntro = jn(() => {
          pn() && this.audio.update(0, !1, !1, this.sim.mode === `menu`);
        })),
        (this.preferredQuality = this.sim.settings.quality),
        (this.frameStage = `initialization`),
        (this.frameCount = 0),
        (this.lastFrameFinished = 0),
        (this.graphicsRecoveries = []),
        (this.recoveringGraphics = !1),
        (this.recoveredGraphics = 0),
        (this.garageOpen = !1),
        (this.runtimeFailure = null),
        (this.selectedShip = `kestrel`),
        (this.shipSkins = _e(null)),
        (this.shipLoading = !1),
        (this.shipError = ``),
        (this.circuitLoading = !1),
        (this.circuitError = ``),
        (this.launch = null),
        (this.launchRequest = 0),
        (this.booted = !1),
        (this.browsing = null),
        (this.circuitBuild = 0),
        (this.buildingCircuit = null),
        (this.circuitBuildResult = Promise.resolve(!0)),
        (this.builtCircuit = O.id),
        (this.builtRules = { ...nt }),
        (this.buildingRules = ``),
        (this.modifiers = (() => {
          try {
            return jt(
              JSON.parse(
                localStorage.getItem(`vector-race-modifiers-v1`) || `null`,
              ),
            );
          } catch {
            return { ...nt };
          }
        })()),
        (this.menuInput = new En()),
        (this.menuFrame = 0),
        (this.menuScope = null),
        (this.padGameplayArmed = !1),
        (this.readGamepad = lt(navigator)),
        (this.onlinePaused = !1),
        (this.online = new ot(
          this.sim,
          () => {
            (this.loadBest(`race`),
              this.leaderboards.begin(),
              this.stats.flush(),
              this.stats.begin(),
              this.achievements.begin(),
              this.feats.begin(),
              (this.onlinePaused = !1),
              this.keys.clear(),
              this.resetTouch(),
              (this.lastCountdown = 4),
              this.audio.unlock().catch(() => {}),
              this.diagnostics.event(`online-race-start`));
          },
          (e) => {
            this.audio.muted = e;
          },
          (e, t) => this.selectCircuit(e, !0, t),
          () => this.ready && !this.circuitLoading && !this.shipLoading,
          () => this.presenceActivity(),
        )),
        (this.careerBadge = { tier: 1, medals: 0 }),
        (this.leaderboards = new jw(() => this.online.sdk)),
        (this.poll = new Iw(() => this.online.sdk)),
        (this.stats = new Uw(() => this.online.sdk, !!window.Wavedash, {
          getItem: (e) => localStorage.getItem(e),
          setItem: (e, t) => localStorage.setItem(e, t),
        })),
        (this.achievements = new Lt(() => this.online.sdk, !!window.Wavedash, {
          getItem: (e) => localStorage.getItem(e),
          setItem: (e, t) => localStorage.setItem(e, t),
        })),
        (this.achievementBook = Pt.map(
          (e) =>
            new Lt(
              () => this.online.sdk,
              !!window.Wavedash,
              {
                getItem: (e) => localStorage.getItem(e),
                setItem: (e, t) => localStorage.setItem(e, t),
              },
              Date.now,
              e,
            ),
        )),
        (this.feats = new Zw()),
        (this.ghostRecorder = new fT()),
        (this.ghostLap = null),
        (this.ghostGapNow = null),
        (this.nextAchievementCheck = 0),
        (this.achievementRows = []),
        (this.unlockQueue = []),
        (this.toast = null),
        (this.careerDone = Le({ medals: {}, best: {} })),
        (this.preferences = new $n(
          () => this.online.sdk,
          !!window.Wavedash,
          {
            getItem: (e) => localStorage.getItem(e),
            setItem: (e, t) => localStorage.setItem(e, t),
          },
          () => this.currentPreferences(),
          (e) => this.applyPreferences(e),
        )),
        (this.progress = new xT(
          () => this.online.sdk,
          !!window.Wavedash,
          () => {
            try {
              return localStorage;
            } catch {
              return null;
            }
          },
          (e) => this.applyProgress(e),
        )),
        (this.frame = 0),
        (this.disposed = !1),
        (this.captureStarting = !1),
        (this.captureGeneration = 0),
        (this.drawnHud = (e, t, n) => dw(e, t, n, this.sim)),
        (this.captureOverlay = (e, t, n, r) => {
          this.hudCapture.draw(e, r) ||
            this.hudCapture.usable ||
            this.drawnHud(e, t, n, r);
        }),
        (this.last = 0),
        (this.accumulator = 0),
        (this.framePacer = new Kn()),
        (this.renderElapsed = 0),
        (this.lastHUD = 0),
        (this.manualUntil = 0),
        (this.lastCountdown = 4),
        (this.lastImpact = 0),
        (this.combatAudioSource = null),
        (this.combatAudioSerial = 0),
        (this.warningAt = 0),
        (this.lastOrbs = 0),
        (this.combatInputArmed = !0),
        (this.savedBest = 0),
        (this.toolLifecycle = new AbortController()),
        (this.textHook = () =>
          JSON.stringify({
            ...this.sim.snapshot(),
            quickRaceModifiers: { ...this.modifiers },
            difficulty: this.difficulty,
            bestLap: this.browsing
              ? this.savedBestFor(this.sim.kind)
              : this.sim.bestLap,
            renderer: this.world.backend,
            graphics: {
              ...this.world.cameraRig.snapshot(),
              ...this.world.visualSnapshot(),
              playerShip: this.world.playerAsset,
              rivalShips: this.world.rivalAssets,
              weaponAssets: this.world.combatView.assets,
              environment: this.world.environmentAsset,
              renderCost: {
                drawCalls: this.world.renderer.info.render.drawCalls,
                triangles: this.world.renderer.info.render.triangles,
                geometries: this.world.renderer.info.memory.geometries,
                textures: this.world.renderer.info.memory.textures,
              },
              airbrakeAngles: this.world.player.brakes.map(
                (e) => +e.rotation.x.toFixed(3),
              ),
              cameraDistance: +this.world.camera.position
                .distanceTo(this.world.player.group.position)
                .toFixed(2),
              fov: +this.world.camera.fov.toFixed(1),
            },
            ready: this.ready,
            careerEvent: this.careerEvent,
            loading: { ...this.loading },
            runtime: {
              frames: this.frameCount,
              failure: this.runtimeFailure,
              graphicsRecoveries: this.recoveredGraphics,
            },
            restartDiagnostics: this.diagnostics.summary(),
            compatibility: this.graphicsPolicy,
            graphicsSettings: this.world.graphics.snapshot(),
            graphicsPerformance: this.world.performance.snapshot(),
            framePacing: this.framePacer.snapshot(),
            circuit: {
              ...this.shownCircuit(),
              loading: this.circuitLoading,
              loaded: !this.browsing,
              error: this.circuitError,
            },
            ship: {
              selected: this.selectedShip,
              skin: this.selectedSkin,
              loading: this.shipLoading,
              error: this.shipError,
            },
            controller: this.controller,
            settings: this.sim.settings,
            music: this.audio.snapshot(),
            capture: this.capture.snapshot(),
            online: this.online.hud(),
            career: {
              event: this.careerEvent,
              award: this.careerAward,
              tournament: this.tournamentHud(),
              fresh:
                this.careerAwardAt > 0 &&
                performance.now() - this.careerAwardAt < 4500,
            },
            cloudProgress: this.progress.hud(),
            ghost: {
              lap: this.ghostLap?.lap ?? 0,
              gap: this.ghostGapNow,
              visible: !!this.world?.ghost.group.visible,
            },
            leaderboards: this.leaderboards.hud(),
            poll: this.poll.hud(),
            stats: this.stats.hud(),
            achievements: this.achievements.hud(),
            careerAchievements: this.achievementBook
              .map((e) => e.hud())
              .filter((e) => e.id === cn.id || e.id === Bt.id),
            achievementList: this.achievementRows,
            achievementToast: this.achievementToast(),
            careerCompletion: { ...this.careerDone },
            lobbyStage: this.world?.lobby?.active
              ? {
                  anchors: this.world.lobby.anchors(),
                  loading: this.world.lobbyLoading,
                }
              : null,
            onlinePaused: this.onlinePaused,
          })),
        (this.timeHook = (e) => {
          if (
            !this.ready ||
            this.online.session?.active ||
            !Number.isFinite(e) ||
            e < 0
          )
            return;
          this.manualUntil = performance.now() + 250;
          let t = Math.max(1, Math.ceil(e / (1e3 / 120)));
          for (let n = 0; n < t; n++)
            ((this.touchSteer = mn(
              this.touchSteer,
              this.touchPad.steer,
              e / 1e3 / t,
            )),
              this.sim.update(e / 1e3 / t, this.input()),
              this.world.setMusicEnergy(this.audio.musicEnergy(e / 1e3 / t)),
              this.world.update(e / 1e3 / t));
          (this.recordFinish(),
            this.world.render(),
            this.capture.captureFrame(
              this.world.renderer.domElement,
              this.captureOverlay,
            ),
            this.notify(this.hud()),
            this.refreshCaptureHud());
        }),
        (this.keyDown = (e) => {
          if (pn()) return;
          let t = e.target;
          if (e.code === `F8` || e.code === `F9`) {
            (e.preventDefault(),
              e.repeat ||
                (e.code === `F8`
                  ? this.takeScreenshot()
                  : this.toggleRecording()));
            return;
          }
          let n = this.menuInput.resolveScope();
          if (
            !(
              t instanceof Element &&
              t.closest(`input,textarea,select,[contenteditable="true"]`)
            ) &&
            n?.getAttribute(`data-menu-scope`) !== `keyboard` &&
            (e.code === `KeyF` || e.code === `KeyM`)
          ) {
            (e.preventDefault(),
              e.repeat ||
                (e.code === `KeyF` ? this.fullscreen() : this.toggleSound()));
            return;
          }
          if (
            !this.menuInput.handleKeyboard(e, n, () => this.menuBack(n)) &&
            !(
              t instanceof Element &&
              t.closest(
                `input,select,textarea,button,a,summary,[contenteditable="true"],[role="slider"]`,
              )
            ) &&
            ([
              `ArrowUp`,
              `ArrowDown`,
              `ArrowLeft`,
              `ArrowRight`,
              `Space`,
            ].includes(e.code) &&
              this.sim.mode !== `menu` &&
              e.preventDefault(),
            !(
              e.repeat &&
              [`Space`, `KeyX`].includes(e.code) &&
              !this.keys.has(e.code)
            ) && (this.keys.add(e.code), !e.repeat))
          ) {
            if (
              this.sim.mode === `menu` &&
              [`ArrowLeft`, `ArrowRight`].includes(e.code)
            ) {
              (e.preventDefault(),
                this.cycleShip(e.code === `ArrowLeft` ? -1 : 1));
              return;
            }
            (t instanceof Element &&
              t.closest(`button`) &&
              [`Enter`, `Space`].includes(e.code)) ||
              (e.code === `Enter` &&
              (this.sim.mode === `menu` || this.sim.mode === `finished`)
                ? this.start()
                : e.code === `Escape` || e.code === `KeyP`
                  ? this.pause()
                  : e.code === `KeyR` && this.sim.mode !== `menu`
                    ? this.start()
                    : e.code === `KeyC`
                      ? this.setSettings({
                          camera: Js(this.sim.settings.camera),
                        })
                      : e.code === `KeyM`
                        ? this.toggleSound()
                        : e.code === `KeyF` && this.fullscreen());
          }
        }),
        (this.keyUp = (e) => {
          this.keys.delete(e.code);
        }),
        (this.blur = () => {
          if (
            (this.captureGeneration++,
            this.capture.stop(`Recording stopped because the game lost focus.`),
            this.stats.flush(),
            this.flushAchievements(),
            this.preferences.flush(),
            this.progress.flush(),
            this.audio.update(0, !1, !1),
            this.keys.clear(),
            this.resetTouch(),
            (this.combatInputArmed = !1),
            this.online.session?.active)
          ) {
            this.onlinePaused = !0;
            return;
          }
          (this.sim.mode === `racing` || this.sim.mode === `countdown`) &&
            this.pause();
        }),
        (this.visibility = () => {
          document.hidden
            ? this.blur()
            : ((this.last = this.lastFrameFinished = performance.now()),
              this.framePacer.reset(),
              (this.renderElapsed = 0));
        }),
        (this.audioGesture = () => {
          this.ready &&
            this.sim.mode === `menu` &&
            !document.hidden &&
            (this.audio.update(0, !1, !1, !0),
            this.audio.unlock().catch(() => {}));
        }),
        (this.pointerInput = () => this.menuInput.pointer()),
        (this.pointerMove = (e) => {
          e.pointerType === `mouse` &&
            Math.hypot(e.movementX, e.movementY) > 2 &&
            this.menuInput.pointer();
        }),
        (this.menuLoop = () => {
          if (this.disposed) return;
          this.menuFrame = requestAnimationFrame(this.menuLoop);
          let e = this.readGamepad();
          ((this.controller = !!e),
            (this.menuScope = pn() ? null : this.menuInput.resolveScope()));
          let t = this.menuInput.update(
            document.hidden ? void 0 : e,
            this.menuScope,
            () => this.menuBack(this.menuScope),
          );
          if (
            (this.menuScope
              ? (this.padGameplayArmed = !1)
              : e?.buttons.some((e) => e.pressed || e.value > 0.5) ||
                (this.padGameplayArmed = !0),
            document.hidden || pn())
          )
            return;
          (t.confirm || t.start || t.move) && this.audioGesture();
          let n = this.menuScope?.closest(
            `[role="dialog"],[role="alertdialog"]`,
          );
          (t.start &&
            this.ready &&
            !this.runtimeFailure &&
            !(this.menuScope && Ut(this.menuScope, `start`)) &&
            !n &&
            this.sim.mode !== `menu` &&
            (this.sim.mode === `finished` ? this.start() : this.pause()),
            t.camera &&
              !this.menuScope &&
              this.ready &&
              this.setSettings({ camera: Js(this.sim.settings.camera) }),
            t.capture &&
              (!n ||
                this.menuScope?.getAttribute(`data-menu-scope`) ===
                  `capture`) &&
              ((this.sim.mode === `racing` || this.sim.mode === `countdown`) &&
                this.pause(),
              document.querySelector(`.capture-menu-button`)?.click()));
        }),
        (this.loop = (e) => {
          if (
            !(this.disposed || this.runtimeFailure) &&
            !this.checkGraphicsFailure()
          ) {
            if (
              ((this.frame = requestAnimationFrame(this.loop)),
              !this.ready || document.hidden || pn())
            ) {
              ((this.last = e),
                (this.lastFrameFinished = performance.now()),
                this.framePacer.reset(),
                (this.renderElapsed = 0));
              return;
            }
            try {
              (this.runFrame(e) && this.frameCount++,
                (this.lastFrameFinished = performance.now()));
            } catch (e) {
              this.failRuntime(e, this.frameStage);
            }
          }
        }),
        (this.gridThrottle = 0),
        (this.careerEvent = null),
        (this.tournament = null),
        (this.difficulty = tt(
          (() => {
            try {
              return localStorage.getItem(de);
            } catch {
              return null;
            }
          })(),
        )),
        (this.careerAward = null),
        (this.careerAwardAt = 0),
        (this.raceSerial = 0),
        (this.careerAwarded = -1),
        (this.careerLap = 0));
      try {
        let e = Sn(localStorage);
        (this.stats.career(e, !1),
          (this.careerDone = Le(e)),
          (this.careerBadge = ee(e)));
      } catch {}
      try {
        let e = localStorage.getItem(`vector-circuit`);
        (T.some((t) => t.id === e) &&
          (Ce(e), this.sim.start(), (this.sim.mode = `menu`)),
          (this.selectedShip = ae(localStorage.getItem(Cn)).id));
        try {
          this.shipSkins = _e(
            JSON.parse(localStorage.getItem(`vector-ship-skins-v1`) || `{}`),
          );
        } catch {}
        (Object.assign(
          this.sim.settings,
          Xn(
            JSON.parse(localStorage.getItem(`vector-settings`) || `{}`),
            this.sim.settings,
          ),
        ),
          this.loadBest(`race`),
          this.leaderboards.selectCircuit(O, this.sim.kind),
          this.leaderboards.begin(O));
      } catch {}
      ((this.preferredQuality = this.sim.settings.quality),
        (this.sim.settings.graphics = ye(this.sim.settings)),
        this.graphicsPolicy.safeMode &&
          (this.sim.settings.quality = `performance`),
        this.audio.setMix(
          this.sim.settings.volume,
          this.sim.settings.musicVolume,
          this.sim.settings.effectsVolume,
        ),
        (this.detachDiagnostics = this.diagnostics.attach(() => ({
          mode: this.onlinePaused ? `paused` : this.sim.mode,
          quality: this.sim.settings.quality,
          backend: this.world?.backend ?? `INITIALIZING`,
          circuit: O.id,
          frames: this.frameCount,
          elapsed: this.sim.elapsed,
          textures: this.world?.renderer.info.memory.textures ?? 0,
          textureBytes: this.world?.renderer.info.memory.texturesSize ?? 0,
          gpuBytes: this.world?.renderer.info.memory.total ?? 0,
          geometries: this.world?.renderer.info.memory.geometries ?? 0,
          drawCalls: this.world?.renderer.info.render.drawCalls ?? 0,
          visible: !document.hidden,
        }))),
        (this.builtCircuit = O.id),
        (this.world = new bC(e, this.sim)),
        (this.resizeObserver = new ResizeObserver(() => {
          if (!this.runtimeFailure)
            try {
              this.world.resize();
            } catch (e) {
              this.failRuntime(e, `resize`);
            }
        })),
        this.resizeObserver.observe(e),
        window.addEventListener(`pointerdown`, this.audioGesture),
        window.addEventListener(`keydown`, this.audioGesture),
        window.addEventListener(`keydown`, this.keyDown, !0),
        window.addEventListener(`pointerdown`, this.pointerInput),
        window.addEventListener(`pointermove`, this.pointerMove),
        window.addEventListener(`keyup`, this.keyUp),
        window.addEventListener(`blur`, this.blur),
        document.addEventListener(`visibilitychange`, this.visibility),
        (window.render_game_to_text = this.textHook),
        (window.advanceTime = this.timeHook),
        (this.menuFrame = requestAnimationFrame(this.menuLoop)));
    }
    async init() {
      let e = await this.online.loadingScreen();
      try {
        if (
          ((this.loading.target = O.name),
          this.reportLoading(0, `Preparing the circuit`),
          await fc(),
          this.disposed)
        )
          return;
        let t = this.audio.prepare();
        if (
          (await this.world.init(
            this.selectedShip,
            (t, n) => {
              (this.reportLoading(t * 0.96, n),
                e?.updateLoadProgressZeroToOne(t * 0.96));
            },
            this.selectedSkin,
          ),
          this.disposed ||
            this.runtimeFailure ||
            (this.reportLoading(0.96, `Preparing race audio`),
            await t,
            this.disposed || this.runtimeFailure) ||
            (this.reportLoading(0.98, `Finishing preparation`),
            (this.ready = !0),
            (this.booted = !0),
            (this.loading = {
              ...this.loading,
              active: !1,
              progress: 1,
              stage: `Ready`,
            }),
            await this.online.init(),
            this.disposed || this.runtimeFailure))
        )
          return;
        (this.poll.refresh(),
          (this.lastFrameFinished = performance.now()),
          (this.onlineClock = new Aw(this.lastFrameFinished)),
          (this.onlineTimer = setInterval(() => {
            if (this.runtimeFailure || this.checkGraphicsFailure()) return;
            this.diagnostics.checkpoint();
            let e = performance.now();
            if (
              this.ready &&
              !document.hidden &&
              !this.onlinePaused &&
              e > this.manualUntil &&
              (this.sim.mode === `countdown` || this.sim.mode === `racing`) &&
              e - this.lastFrameFinished > 5e3
            ) {
              this.failRuntime(
                Error(`The browser stopped delivering animation frames.`),
                `animation`,
              );
              return;
            }
            let t = this.onlineClock.background(
              e,
              document.hidden || !this.ready,
            );
            if (t !== null && this.online.lobbyId)
              try {
                (this.online.tick(
                  t,
                  this.onlinePaused || document.hidden
                    ? { ...ST, brake: 1 }
                    : this.input(),
                ),
                  this.recordFinish());
              } catch (e) {
                this.failRuntime(e, `online update`);
              }
          }, 50)),
          this.diagnostics.event(`ready`),
          (this.last = performance.now()),
          this.registerTools(),
          this.notify(this.hud()),
          (this.frame = requestAnimationFrame(this.loop)));
      } catch (t) {
        (e?.loadComplete(), this.failRuntime(t, `initialization`));
      }
    }
    reportLoading(e, t) {
      if (this.disposed) return;
      let n = Math.min(1, Math.max(0, e)),
        r =
          !this.loading.active ||
          t !== this.loading.stage ||
          Math.floor(n * 100) !==
            Math.floor((this.loading.progress ?? -1) * 100);
      ((this.loading = { ...this.loading, active: !0, progress: n, stage: t }),
        (r || n === 1) && this.notify(this.hud()));
    }
    runtimeReport() {
      return JSON.stringify(
        {
          version: Ln,
          failure: this.runtimeFailure,
          compatibility: this.graphicsPolicy,
          graphicsSettings: this.world.graphics.snapshot(),
          graphicsPerformance: this.world.performance.snapshot(),
          graphicsBackend: this.world.visualSnapshot().graphics,
          browser: navigator.userAgent,
          viewport: {
            width: innerWidth,
            height: innerHeight,
            dpr: devicePixelRatio,
          },
          audio: this.audio.snapshot(),
          restartDiagnostics: JSON.parse(this.diagnostics.report()),
        },
        null,
        2,
      );
    }
    diagnosticsReport() {
      return JSON.stringify(
        {
          ...JSON.parse(this.diagnostics.report()),
          graphicsBackend: this.world.visualSnapshot().graphics,
        },
        null,
        2,
      );
    }
    checkGraphicsFailure() {
      if (!this.ready) return !1;
      let e = this.world.getGraphicsFailure();
      return e
        ? (document.hidden ||
            this.recoverGraphics(e) ||
            this.failRuntime(Error(e), `graphics context`),
          !0)
        : !1;
    }
    recoverGraphics(e) {
      let t = performance.now();
      if (
        ((this.graphicsRecoveries = this.graphicsRecoveries.filter(
          (e) => t - e < 18e4,
        )),
        this.disposed ||
          this.recoveringGraphics ||
          this.circuitLoading ||
          this.graphicsRecoveries.length >= 2)
      )
        return !1;
      (this.graphicsRecoveries.push(t),
        (this.recoveringGraphics = !0),
        (this.ready = !1),
        this.diagnostics.event(`graphics-recovery`, e),
        !this.online.session?.active &&
          (this.sim.mode === `countdown` || this.sim.mode === `racing`) &&
          this.sim.pause(),
        this.keys.clear(),
        this.resetTouch(),
        (this.combatInputArmed = !1));
      try {
        this.audio.update(0, !1, !1);
      } catch {}
      return (
        this.captureGeneration++,
        this.capture
          .stop(`Recording stopped while the graphics restarted.`)
          .catch(() => {}),
        (this.loading = {
          active: !0,
          progress: 0,
          stage: `Restoring graphics`,
          target: O.name,
        }),
        this.notify(this.hud()),
        this.rebuildGraphics(),
        !0
      );
    }
    async rebuildGraphics() {
      try {
        try {
          this.world.dispose();
        } catch {}
        if (
          (await fc(),
          this.disposed ||
            ((this.world = new bC(this.host, this.sim)),
            (this.world.wantedCrafts = this.online
              .roster()
              .flatMap((e) =>
                e.ship && e.skin !== `original` && !e.self
                  ? [{ ship: e.ship, skin: e.skin }]
                  : [],
              )),
            await this.world.init(
              this.selectedShip,
              (e) => this.reportLoading(e, `Restoring graphics`),
              this.selectedSkin,
            ),
            this.disposed) ||
            (this.online.lobbyId &&
              (await this.world.prepareLobby(this.lobbyPilots())),
            this.disposed))
        )
          return;
        let e = this.world.getGraphicsFailure();
        if (e) throw Error(e);
        (this.garageOpen && this.world.setGarageOpen(!0),
          (this.recoveringGraphics = !1),
          this.recoveredGraphics++,
          (this.ready = !0),
          (this.loading = {
            ...this.loading,
            active: !1,
            progress: 1,
            stage: `Ready`,
          }),
          (this.accumulator = 0),
          (this.last = this.lastFrameFinished = performance.now()),
          this.framePacer.reset(),
          (this.renderElapsed = 0),
          this.diagnostics.event(`graphics-restored`),
          cancelAnimationFrame(this.frame),
          (this.frame = requestAnimationFrame(this.loop)),
          this.notify(this.hud()));
      } catch (e) {
        ((this.recoveringGraphics = !1),
          this.disposed || this.failRuntime(e, `graphics context`));
      }
    }
    failRuntime(e, t) {
      if (!(this.disposed || this.runtimeFailure)) {
        ((this.runtimeFailure = {
          stage: t,
          message: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
          renderer: this.world?.backend ?? `INITIALIZING`,
          quality: this.sim.settings.quality,
          mode: this.sim.mode,
          countdown: this.sim.countdown,
          frames: this.frameCount,
        }),
          this.diagnostics.failure(t, e),
          (this.ready = !1),
          (this.loading.active = !1),
          cancelAnimationFrame(this.frame),
          clearInterval(this.onlineTimer),
          this.keys.clear(),
          this.resetTouch(),
          (this.sim.mode === `countdown` || this.sim.mode === `racing`) &&
            this.sim.pause());
        try {
          this.audio.update(0, !1, !1);
        } catch {}
        this.capture
          .stop(`Recording stopped because the race encountered an error.`)
          .catch(() => {});
        try {
          sessionStorage.setItem(
            `vector-last-runtime-error`,
            this.runtimeReport(),
          );
        } catch {}
        try {
          this.notify(this.hud());
        } catch {}
        this.error(
          `${t.toUpperCase()} · ${this.runtimeFailure.renderer}\n${this.runtimeFailure.message}`,
        );
      }
    }
    menuBack(e) {
      let t = e?.querySelector(
        `[data-menu-back]:not(:disabled),[aria-label="Close"]`,
      );
      t
        ? t.click()
        : this.sim.mode === `paused` || this.onlinePaused
          ? this.pause()
          : this.sim.mode === `finished` && this.menu();
    }
    input() {
      let e = vt(this.keys),
        t = {
          steer: e.steer + this.touch.steer + this.touchSteer,
          throttle: Math.max(e.throttle, this.touch.throttle),
          brake: Math.max(e.brake, this.touch.brake),
          airLeft: Math.max(
            e.airLeft,
            this.touch.airLeft,
            this.touchPad.airLeft,
          ),
          airRight: Math.max(
            e.airRight,
            this.touch.airRight,
            this.touchPad.airRight,
          ),
          tapLeft: Math.max(
            e.tapLeft,
            this.touch.airLeft,
            this.touchPad.tapLeft,
          ),
          tapRight: Math.max(
            e.tapRight,
            this.touch.airRight,
            this.touchPad.tapRight,
          ),
          fire: e.fire || !!this.touch.fire,
          absorb: e.absorb || !!this.touch.absorb,
        },
        n = this.readGamepad();
      if (
        ((this.controller = !!n), n && this.padGameplayArmed && !this.menuScope)
      ) {
        let e = Mn(n.axes[0]);
        (Math.abs(e) > Math.abs(t.steer) && (t.steer = e),
          (t.throttle = Math.max(t.throttle, n.buttons[0]?.value || 0)),
          (t.airLeft = Math.max(
            t.airLeft,
            n.buttons[6]?.value || 0,
            n.buttons[4]?.value || 0,
          )),
          (t.airRight = Math.max(
            t.airRight,
            n.buttons[7]?.value || 0,
            n.buttons[5]?.value || 0,
          )),
          (t.tapLeft = Math.max(
            t.tapLeft,
            n.buttons[6]?.value || 0,
            n.buttons[4]?.value || 0,
          )),
          (t.tapRight = Math.max(
            t.tapRight,
            n.buttons[7]?.value || 0,
            n.buttons[5]?.value || 0,
          )),
          (t.fire ||= !!n.buttons[2]?.pressed),
          (t.absorb ||= !!n.buttons[1]?.pressed));
      }
      return this.menuScope
        ? { ...ST }
        : (this.combatInputArmed ||
            (!t.fire && !t.absorb && (this.combatInputArmed = !0),
            (t.fire = t.absorb = !1)),
          (this.sim.mode === `paused` ||
            this.onlinePaused ||
            document.hidden) &&
            (t.fire = t.absorb = !1),
          (t.steer = Math.max(-1, Math.min(1, t.steer))),
          t);
    }
    runFrame(e) {
      let t = Math.max(0, Math.min((e - this.last) / 1e3, 0.08));
      this.last = e;
      let n = this.framePacer.shouldRender(e, this.sim.settings.frameRateLimit);
      ((this.renderElapsed += t),
        (this.frameStage = `input`),
        (this.touchSteer = mn(this.touchSteer, this.touchPad.steer, t)));
      let r = this.input();
      ((this.gridThrottle = r.throttle), (this.frameStage = `online update`));
      let i = this.onlineClock.frame(performance.now());
      if (
        ((this.online.available || this.online.lobbyId) &&
          this.online.tick(
            i,
            this.onlinePaused || document.hidden ? { ...ST, brake: 1 } : r,
          ),
        (this.frameStage = `simulation`),
        e > this.manualUntil && !this.online.session?.active)
      )
        for (this.accumulator += t; this.accumulator >= 1 / 120;)
          (this.sim.update(1 / 120, r), (this.accumulator -= 1 / 120));
      let a = Math.ceil(this.sim.countdown);
      if (
        ((this.frameStage = `race progress`),
        this.recordFinish(),
        (this.frameStage = `audio`),
        this.sim.mode === `countdown` &&
          a < this.lastCountdown &&
          this.audio.tone(440, 0.13, 0.15),
        this.sim.mode === `racing` &&
          this.lastCountdown > 0 &&
          this.audio.tone(880, 0.4, 0.14),
        (this.lastCountdown = Math.max(0, a)),
        this.sim.impact > this.lastImpact + 0.2 &&
          this.audio.tone(65, 0.16, 0.25, void 0, `sawtooth`, !0),
        (this.lastImpact = this.sim.impact),
        this.sim.orbsTaken > this.lastOrbs)
      ) {
        let e = 880 * 2 ** (this.sim.orbsTaken / vn.count);
        (this.audio.tone(e, 0.12, 0.1, void 0, `triangle`),
          this.audio.tone(e * 2, 0.32, 0.045));
      }
      return (
        (this.lastOrbs = this.sim.orbsTaken),
        this.sim.mode !== `paused` &&
          this.audio.setTunnel(this.raceSound ? is(this.sim.distance, !0) : 0),
        this.updateAudio(),
        this.updateCombatAudio(),
        this.syncLobby(),
        n &&
          (this.world.setMusicEnergy(
            this.audio.musicEnergy(this.renderElapsed),
          ),
          (this.frameStage = `graphics update`),
          this.world.update(this.renderElapsed),
          (this.renderElapsed = 0),
          (this.frameStage = `rendering`),
          this.world.render(),
          (this.frameStage = `capture`),
          this.capture.captureFrame(
            this.world.renderer.domElement,
            this.captureOverlay,
            e,
          )),
        (this.frameStage = `HUD`),
        e - this.lastHUD > 80 &&
          (this.notify(this.hud()),
          (this.lastHUD = e),
          this.refreshCaptureHud()),
        n
      );
    }
    get raceSound() {
      return (
        this.sim.mode === `racing` ||
        this.sim.mode === `countdown` ||
        this.sim.flagBeat
      );
    }
    updateAudio() {
      let e = this.sim,
        t = e.mode === `racing`;
      this.audio.update(
        e.speed,
        e.boostActive,
        !this.onlinePaused && !document.hidden && this.raceSound,
        !document.hidden &&
          (e.mode === `menu` || (e.mode === `finished` && !e.flagBeat)),
        {
          speed: e.speed,
          throttle: t
            ? e.throttle
            : e.mode === `countdown`
              ? this.gridThrottle
              : 0,
          boost: e.boostTime > 0,
          turbo: e.turboTime > 0,
          airbrake: t ? e.airbrake : 0,
          airLoad: t ? e.airLoad : 0,
          airborne: e.airHeight > 0.5,
        },
      );
    }
    updateCombatAudio() {
      let e = this.sim,
        t = e.combat;
      (this.combatAudioSource !== t || this.combatAudioSerial > t.serial) &&
        ((this.combatAudioSource = t),
        (this.combatAudioSerial = 0),
        (this.warningAt = 0));
      let n =
        e.mode === `racing` &&
        !this.onlinePaused &&
        !document.hidden &&
        !this.audio.muted;
      for (let r of t.events)
        if (r.id > this.combatAudioSerial) {
          if (((this.combatAudioSerial = r.id), !n || t.clock - r.time > 0.35))
            continue;
          let i = Math.abs(Jn(r.distance - e.distance));
          i < 160 &&
            (![`lock`, `pickup`, `heal`].includes(r.kind) ||
              r.owner === e.combatId) &&
            this.audio.combatSound(
              r,
              Math.max(0.1, 1 - i / 160),
              r.owner === e.combatId ? 0 : -(r.lane - e.lane) / 14,
            );
        }
      n &&
        e.clock > this.warningAt &&
        (e.hull < 30 ||
          (!t.shielded(e.combatId) &&
            t.projectiles.some((t) => t.target === e.combatId))) &&
        (this.audio.tone(e.hull < 15 ? 220 : 640, 0.11, 0.11),
        (this.warningAt = e.clock + (e.hull < 15 ? 1 : 1.8)));
    }
    savedBestFor(e) {
      try {
        let n = Number(
          localStorage.getItem(
            Tn(e, this.shownCircuit()) + t(Bn(e, this.modifiers)),
          ),
        );
        return Number.isFinite(n) && n > 0 ? n : 0;
      } catch {
        return 0;
      }
    }
    loadBest(e) {
      let n = 0;
      try {
        let r = Number(localStorage.getItem(Tn(e) + t(this.sim.modifiers)));
        Number.isFinite(r) && r > 0 && (n = r);
      } catch {}
      this.sim.bestLap = this.savedBest = n;
    }
    recordFinish() {
      (this.observeCareer(),
        this.stats.observe(this.sim, this.online.session),
        this.stats.tick(),
        this.achievements.observe(this.sim),
        this.achievements.tick());
      let e = this.feats.observe(this.sim, {
        circuit: O.id,
        laps: this.sim.laps,
        ship: this.selectedShip,
        cpuSkill: Ze(this.careerEvent, this.difficulty),
        session: this.online.session,
      });
      if (
        (e.length && this.addFeats(e),
        this.checkAchievements(),
        this.updateGhost(),
        this.preferences.tick(),
        this.progress.tick(),
        this.sim.bestLap !== this.savedBest)
      ) {
        this.savedBest = this.sim.bestLap;
        try {
          localStorage.setItem(
            Tn(this.sim.kind) + t(this.sim.modifiers),
            String(this.savedBest),
          );
        } catch {}
        this.progress.changed();
      }
      let n = this.sim.modifiers;
      if (
        !(this.sim.kind === `timed-lap`
          ? n.weapons && !n.disableBoostPads
          : kn(n) &&
            (this.sim.kind !== `race` || fn(n)) &&
            (this.sim.kind !== `race` ||
              this.sim.networked ||
              n.cpuCount === 7))
      ) {
        this.leaderboards.excludeModifiers();
        return;
      }
      if (this.sim.kind === `timed-lap`) {
        this.leaderboards.observeLap(this.sim);
        return;
      }
      if (this.sim.networked) {
        let e = this.online.session,
          t = e?.players.find((t) => t.id === e.selfId);
        if (!t || (!t.dnf && t.state.mode !== `finished`)) return;
        this.leaderboards.observe(t.dnf ? this.sim : t.state, !t.dnf);
      } else this.leaderboards.observe(this.sim);
    }
    hud() {
      let e = this.sim,
        t = e.combat.pilots[e.combatId],
        n = e.rivals.find(
          (n, r) => (e.networked ? n.team : `cpu` + r) === t?.lock,
        ),
        r = n ? L(n.distance, n.lane, 2.2).project(this.world.camera) : null,
        i = e.combat.projectiles.find((t) => t.target === e.combatId),
        a = e.combat.events.findLast(
          (t) => t.kind === `block` && t.owner === e.combatId,
        ),
        o = a ? e.combat.clock - a.time : 1 / 0;
      return {
        mode:
          this.onlinePaused && this.online.session?.active ? `paused` : e.mode,
        online: this.online.hud(),
        career: {
          event: this.careerEvent,
          award: this.careerAward,
          tournament: this.tournamentHud(),
          fresh:
            this.careerAwardAt > 0 &&
            performance.now() - this.careerAwardAt < 4500,
        },
        leaderboards: this.leaderboards.hud(),
        poll: this.poll.hud(),
        stats: this.stats.hud(),
        achievements: this.achievements.hud(),
        careerAchievements: this.achievementBook
          .map((e) => e.hud())
          .filter((e) => e.id === cn.id || e.id === Bt.id),
        achievementList: this.achievementRows,
        achievementToast: this.achievementToast(),
        careerCompletion: { ...this.careerDone },
        lobbyStage: this.world?.lobby?.active
          ? {
              anchors: this.world.lobby.anchors(),
              loading: this.world.lobbyLoading,
            }
          : null,
        preferences: this.preferences.hud(),
        cloudProgress: this.progress.hud(),
        totalLaps: this.sim.laps,
        ghost: { lap: this.ghostLap?.lap ?? 0, gap: this.ghostGapNow },
        restartDiagnostics: this.diagnostics.summary(),
        totalRacers: this.online.session?.active
          ? this.online.session.players.length
          : e.rivals.length + 1,
        ready: this.ready,
        loading: { ...this.loading },
        launch: this.launch,
        graphicsSettings: this.world.graphics.snapshot(),
        graphicsPerformance: this.world.performance.snapshot(),
        safeMode: this.graphicsPolicy.safeMode,
        framePacing: this.framePacer.snapshot(),
        mobile: this.graphicsPolicy.mobile,
        steamDeck: this.graphicsPolicy.steamDeck,
        circuit: {
          ...this.shownCircuit(),
          loading: this.circuitLoading,
          loaded: !this.browsing,
          error: this.circuitError,
        },
        ship: {
          selected: this.selectedShip,
          skin: this.selectedSkin,
          loading: this.shipLoading,
          error: this.shipError,
        },
        renderer: this.world?.backend || `INITIALIZING`,
        flagBeat: e.flagBeat,
        speed: Math.round(e.speed * 3.6),
        kind: e.kind,
        difficulty: this.difficulty,
        modifiers:
          this.sim.mode === `menu` ? this.modifiers : this.sim.modifiers,
        orbs:
          e.kind === `orbs`
            ? { taken: e.orbsTaken, total: e.orbs.length }
            : null,
        sessionBest: e.sessionBest,
        lastLap: e.lastLap,
        completedLaps: e.lapTimes.length,
        hull: e.hull,
        combat: {
          item: t?.item ?? null,
          ammo: t?.ammo ?? 0,
          absorb: sn(t),
          lockProgress: (t?.lockTime ?? 0) / 0.65,
          target:
            r && r.z < 1 && Math.abs(r.x) < 1 && Math.abs(r.y) < 1
              ? { x: (r.x + 1) * 50, y: (1 - r.y) * 50 }
              : null,
          incoming: !!i,
          incomingSide: i ? -Math.sign(i.lane - e.lane) : 0,
          shield: t?.shield ?? 0,
          shieldDuration: 5,
          blocked: o < 0.3 ? 1 - o / 0.3 : 0,
          blockedSide: a ? -Math.sign(a.lane - e.lane) : 0,
        },
        position: e.position,
        lap: e.lap,
        elapsed: e.elapsed,
        lapTime: e.elapsed - e.lapStart,
        bestLap: this.browsing ? this.savedBestFor(e.kind) : e.bestLap,
        countdown: Math.ceil(e.countdown),
        message: e.messageTime > 0 ? e.message : ``,
        boosting: e.boostActive,
        turbo: e.turboTime > 0,
        impact: e.impact,
        impactSide: e.contactSide,
        lapTimes: e.lapTimes.slice(-5),
        progress: (e.distance % v) / v,
        map: ge(e.distance),
        rivals: e.rivals.map((e) => ({ ...e, map: ge(e.distance) })),
        muted: this.audio.muted,
        music: this.audio.snapshot(),
        capture: this.capture.snapshot(),
        controller: this.controller,
        settings: {
          ...e.settings,
          aspect: this.graphicsPolicy.steamDeck ? `16:9` : e.settings.aspect,
        },
      };
    }
    registerTools() {
      let e = document.modelContext;
      if (!e?.registerTool) return;
      let t = [
        {
          name: `read_race_status`,
          description: `Read the current Vector race, ship speed, lap, position, boost and controls.`,
          inputSchema: {
            type: `object`,
            properties: {},
            additionalProperties: !1,
          },
          annotations: { readOnlyHint: !0 },
          execute: () => JSON.parse(this.textHook()),
        },
        {
          name: `start_race`,
          description: `Start or restart a three-lap race on the selected circuit, resetting the current race.`,
          inputSchema: {
            type: `object`,
            properties: {},
            additionalProperties: !1,
          },
          annotations: { readOnlyHint: !1 },
          execute: () => {
            if (!this.ready) throw Error(`The circuit is still initializing.`);
            return (this.start(`race`), this.sim.snapshot());
          },
        },
        {
          name: `set_race_paused`,
          description: `Pause or resume an active race without changing progress.`,
          inputSchema: {
            type: `object`,
            properties: { paused: { type: `boolean` } },
            required: [`paused`],
            additionalProperties: !1,
          },
          annotations: { readOnlyHint: !1 },
          execute: (e) => {
            if (
              !e ||
              typeof e != `object` ||
              !(`paused` in e) ||
              typeof e.paused != `boolean` ||
              Object.keys(e).length !== 1
            )
              throw Error(`Provide a single boolean paused field.`);
            if (![`racing`, `countdown`, `paused`].includes(this.sim.mode))
              throw Error(`Start a race before pausing or resuming.`);
            return (
              (this.online.session?.active
                ? this.onlinePaused
                : this.sim.mode === `paused`) !== e.paused && this.pause(),
              this.sim.snapshot()
            );
          },
        },
      ];
      for (let n of t)
        try {
          Promise.resolve(
            e.registerTool(n, { signal: this.toolLifecycle.signal }),
          ).catch(() => {});
        } catch {}
    }
    start(
      e = this.sim.kind,
      t = this.sim.mode === `menu` ? null : this.careerEvent,
    ) {
      if (!this.ready || this.shipLoading || this.online.busy) return;
      if (this.online.lobbyId) {
        (this.online.returnToLobby(), this.notify(this.hud()));
        return;
      }
      let n = t
        ? {
            ...nt,
            ...S(t, this.tournament?.event === t ? this.tournament.round : 0),
          }
        : Bn(e, this.modifiers);
      if (this.browsing || Gt(n) !== Gt(this.builtRules)) {
        let r = ++this.launchRequest;
        ((this.launch = { state: `pending`, kind: e, career: t, modifiers: n }),
          this.loadPicked(n).then((n) => {
            r === this.launchRequest &&
              ((this.launch = null),
              n && this.sim.mode === `menu`
                ? this.start(e, t)
                : this.notify(this.hud()));
          }));
        return;
      }
      (this.useTrackRules(n),
        (this.careerEvent = t),
        t !== this.tournament?.event && (this.tournament = null),
        this.keys.clear(),
        this.resetTouch(),
        (this.combatInputArmed = !1),
        this.audio.update(0, !1, !0),
        this.audio.unlock().catch(() => {}),
        this.recordFinish(),
        this.stats.flush(),
        this.sim.start(
          e,
          crypto.getRandomValues(new Uint32Array(1))[0],
          Ze(t, this.difficulty),
          n,
        ),
        (this.lastFrameFinished = performance.now()),
        this.raceSerial++,
        (this.careerAward = null),
        (this.careerAwardAt = 0),
        (this.careerLap = 0),
        this.diagnostics.event(`race-start`),
        this.stats.begin(),
        this.achievements.begin(),
        this.feats.begin(),
        this.ghostRecorder.begin(),
        (this.ghostLap =
          e === `timed-lap` ? oT(this.storage(), O.id, n.direction) : null),
        this.loadBest(e),
        this.leaderboards.begin(O, e, n.direction),
        this.leaderboards.selectCircuit(O, e, n.direction),
        (this.accumulator = 0),
        (this.lastCountdown = 4),
        this.notify(this.hud()));
    }
    cancelLaunch() {
      this.launch?.state === `pending` &&
        (this.launchRequest++,
        (this.launch = { ...this.launch, state: `cancelled` }),
        this.notify(this.hud()));
    }
    cycleShip(e) {
      let t = le.findIndex((e) => e.id === this.selectedShip);
      this.selectShip(le[(t + e + le.length) % le.length].id);
    }
    async selectSkin(e) {
      await this.selectShip(this.selectedShip, e);
    }
    setGarageOpen(e) {
      ((this.garageOpen = e),
        this.ready && !this.disposed && this.world.setGarageOpen(e));
    }
    async selectShip(e, t = this.shipSkins[e]) {
      if (
        ((t = xe(e, t).id),
        !(
          !this.ready ||
          this.shipLoading ||
          this.sim.mode !== `menu` ||
          this.online.launching ||
          (this.online.session?.active && !this.online.session.complete) ||
          this.online.busy ||
          (e === this.selectedShip && t === this.selectedSkin)
        ))
      ) {
        ((this.shipLoading = !0),
          (this.shipError = ``),
          this.notify(this.hud()));
        try {
          if (await this.world.selectPlayerShip(e, t)) {
            ((this.selectedShip = e), (this.shipSkins[e] = t));
            try {
              (localStorage.setItem(Cn, e),
                localStorage.setItem(me, JSON.stringify(this.shipSkins)));
            } catch {}
          }
        } catch {
          this.shipError = `Unable to load this ship. Your current craft is ready; try selecting again.`;
        } finally {
          ((this.shipLoading = !1), this.disposed || this.notify(this.hud()));
        }
      }
    }
    shownCircuit() {
      return T.find((e) => e.id === this.browsing) ?? O;
    }
    browseCircuit(e) {
      return this.disposed ||
        !this.booted ||
        !this.ready ||
        this.shipLoading ||
        this.sim.mode !== `menu` ||
        this.online.lobbyId ||
        this.online.busy ||
        !T.some((t) => t.id === e)
        ? !1
        : ((this.browsing = e === this.builtCircuit ? null : e),
          this.leaderboards.selectCircuit(
            this.shownCircuit(),
            this.sim.kind,
            this.modifiers.direction,
          ),
          this.notify(this.hud()),
          !0);
    }
    selectModifiers(e) {
      if (
        !this.ready ||
        this.shipLoading ||
        this.sim.mode !== `menu` ||
        this.online.lobbyId ||
        this.online.busy
      )
        return;
      let t = this.modifiers.direction;
      this.modifiers = jt({ ...this.modifiers, ...e });
      try {
        localStorage.setItem(Te, JSON.stringify(this.modifiers));
      } catch {}
      (this.modifiers.direction !== t &&
        this.leaderboards.selectCircuit(
          this.shownCircuit(),
          this.sim.kind,
          this.modifiers.direction,
        ),
        this.notify(this.hud()));
    }
    selectDifficulty(e) {
      if (!(
        !ne.some((t) => t.id === e) ||
        this.sim.mode !== `menu` ||
        !this.ready ||
        this.online.lobbyId ||
        this.online.busy
      )) {
        this.difficulty = e;
        try {
          localStorage.setItem(de, e);
        } catch {}
        this.notify(this.hud());
      }
    }
    observeCareer() {
      let e =
        this.careerEvent && !this.sim.networked
          ? y.find((e) => e.id === this.careerEvent)
          : void 0;
      if (!e) return;
      let t,
        n = !0;
      if (e.rounds) {
        let n = this.scoreTournamentRound(e);
        if (!n) return;
        t = n;
      } else if (e.kind === `speed-lap`) {
        let e = this.sim.sessionBest;
        if (!(e > 0) || e === this.careerLap) return;
        ((n = this.careerLap === 0), (this.careerLap = t = e));
      } else {
        if (
          this.sim.mode !== `finished` ||
          this.careerAwarded === this.raceSerial
        )
          return;
        ((this.careerAwarded = this.raceSerial),
          (t = e.kind === `orbs` ? this.sim.orbsTaken : this.sim.position));
      }
      let r = null;
      try {
        r = localStorage;
      } catch {}
      let { progress: i, award: a } = Be(Sn(r), e, t);
      (we(r, i),
        this.progress.changed(),
        this.stats.career(i, n),
        (this.careerDone = Le(i)),
        (this.careerBadge = ee(i)));
      let o = this.careerAward,
        s = o ? o.previous : a.previous,
        c = i.medals[e.id] ?? null;
      ((this.careerAward = {
        ...a,
        previous: s,
        improved: c !== s,
        unlocked: [...new Set([...(o?.unlocked ?? []), ...a.unlocked])],
        tier: a.tier ?? o?.tier ?? null,
      }),
        a.improved && (this.careerAwardAt = performance.now()));
    }
    startCareerEvent(e) {
      let t = y.find((t) => t.id === e),
        n = t && ke[t.kind].race;
      return !t || !n || this.sim.mode !== `menu`
        ? !1
        : ((this.tournament = t.rounds
            ? { event: t.id, round: 0, finishes: {}, scored: -1 }
            : null),
          this.launchCareerRace(t, t.rounds?.[0].circuit ?? t.circuit, n));
    }
    nextTournamentRound() {
      let e = this.tournament,
        t = e && y.find((t) => t.id === e.event);
      return !e ||
        !t?.rounds ||
        e.scored !== e.round ||
        e.round >= t.rounds.length - 1 ||
        this.sim.mode !== `menu`
        ? !1
        : (e.round++,
          this.launchCareerRace(t, t.rounds[e.round].circuit, `race`));
    }
    launchCareerRace(e, t, n) {
      return !this.browseCircuit(t) && t !== this.builtCircuit
        ? !1
        : (this.sim.kind !== n && this.selectKind(n), this.start(n, e.id), !0);
    }
    scoreTournamentRound(t) {
      let n = this.tournament,
        r = this.sim;
      return !n ||
        !t.rounds ||
        n.event !== t.id ||
        r.mode !== `finished` ||
        n.scored === n.round ||
        ((n.scored = n.round),
        (n.finishes = e(n.finishes, ce(r.position, r.rivals))),
        n.round < t.rounds.length - 1)
        ? 0
        : Hn(n.finishes).findIndex((e) => e.id === `player`) + 1;
    }
    tournamentHud() {
      let e = this.tournament,
        t =
          e && e.event === this.careerEvent
            ? y.find((t) => t.id === e.event)
            : void 0;
      return !e || !t?.rounds
        ? null
        : {
            event: e.event,
            round: e.round,
            rounds: t.rounds,
            scored: e.scored === e.round,
            final: e.round === t.rounds.length - 1,
            standings: Hn(e.finishes).map((t) => ({
              ...t,
              name: t.id === `player` ? `YOU` : t.id,
              color:
                t.id === `player`
                  ? `#ff5c28`
                  : (qt.find((e) => e.name === t.id)?.color ?? `#e6eaf0`),
              last: t.finishes[e.round] ?? null,
            })),
          };
    }
    flushAchievements() {
      this.achievements.flush();
      for (let e of this.achievementBook) e.flush();
    }
    useTrackRules(e) {
      (x({ ...e, direction: this.builtRules.direction }),
        (this.builtRules = {
          ...this.builtRules,
          weapons: e.weapons,
          disableBoostPads: e.disableBoostPads,
        }));
    }
    loadPicked(e = this.modifiers) {
      return this.selectCircuit(this.browsing ?? this.builtCircuit, !1, e);
    }
    openOnline() {
      !this.ready ||
        this.sim.mode !== `menu` ||
        (this.online.setInitialRules(
          this.modifiers,
          this.browsing ?? this.builtCircuit,
        ),
        this.online.setOpen(!0),
        this.syncLobby(),
        this.notify(this.hud()));
    }
    async selectCircuit(e, t = !1, n = nt) {
      if (
        this.disposed ||
        !this.booted ||
        this.shipLoading ||
        this.sim.mode !== `menu` ||
        (!t && (this.online.lobbyId || this.online.busy)) ||
        !T.some((t) => t.id === e)
      )
        return !1;
      if (
        ((this.browsing = null),
        e === this.buildingCircuit && Gt(n) === this.buildingRules)
      )
        return this.circuitBuildResult;
      if (
        !this.buildingCircuit &&
        e === this.builtCircuit &&
        Gt(n) === Gt(this.builtRules)
      )
        return (
          this.useTrackRules(n),
          this.ready ||
            ((this.ready = !0),
            (this.loading = { ...this.loading, active: !1, progress: 1 }),
            this.notify(this.hud())),
          !0
        );
      let r = ++this.circuitBuild,
        i = () => !this.disposed && r === this.circuitBuild;
      return (
        (this.circuitBuildResult = this.buildCircuit(e, i, n)),
        this.circuitBuildResult
      );
    }
    async buildCircuit(e, t, n) {
      let r = this.builtCircuit,
        i = this.builtRules,
        a = !1;
      if (
        (this.buildingCircuit ||
          (this.recordFinish(), this.stats.flush(), this.flushAchievements()),
        (this.buildingCircuit = e),
        (this.buildingRules = Gt(n)),
        (this.ready = !1),
        (this.circuitLoading = !0),
        (this.loading = {
          active: !0,
          progress: 0,
          stage: `Preparing the circuit`,
          target: T.find((t) => t.id === e).name,
        }),
        (this.circuitError = ``),
        this.keys.clear(),
        this.resetTouch(),
        this.audio.setTunnel(0),
        this.notify(this.hud()),
        this.captureGeneration++,
        await this.capture.stop(`Recording stopped before changing circuit.`),
        !t() || (await fc(), !t()))
      )
        return !1;
      this.world.dispose();
      let o = async (e, n) => {
        if (
          (Ce(e, n),
          (this.loading.target = O.name),
          this.reportLoading(0, `Preparing the circuit`),
          await fc(),
          !t())
        )
          return;
        (this.sim.start(this.sim.kind, void 0, void 0, {
          ...Bn(this.sim.kind, this.modifiers),
          ...n,
        }),
          (this.sim.mode = `menu`),
          (this.sim.distance = 0),
          (this.sim.lane = -4.6),
          this.loadBest(this.sim.kind),
          this.leaderboards.begin(O, this.sim.kind, n.direction),
          this.leaderboards.selectCircuit(O, this.sim.kind, n.direction),
          (this.world = new bC(this.host, this.sim)),
          (this.world.wantedCrafts = this.online
            .roster()
            .flatMap((e) =>
              e.ship && e.skin !== `original` && !e.self
                ? [{ ship: e.ship, skin: e.skin }]
                : [],
            )),
          this.notify(this.hud()));
        let r = !!this.online.lobbyId;
        (await this.world.init(
          this.selectedShip,
          (e, n) => {
            t() && this.reportLoading(r ? e * 0.92 : e, n);
          },
          this.selectedSkin,
        ),
          t() &&
            r &&
            (await this.world.prepareLobby(this.lobbyPilots(), (e) => {
              t() &&
                this.reportLoading(0.92 + e * 0.08, `Preparing the launch bay`);
            })),
          t() && (a = !0));
      };
      try {
        if ((await o(e, n), !t())) return !1;
        ((this.builtCircuit = e), (this.builtRules = { ...n }));
        try {
          localStorage.setItem(`vector-circuit`, e);
        } catch {}
        return !0;
      } catch {
        if (!t()) return !1;
        (this.world.dispose(),
          (this.circuitError = `This circuit could not load. Your previous circuit is ready; try again.`));
        try {
          (await o(r, i), t() && (this.builtCircuit = r));
        } catch (e) {
          return (
            t() &&
              this.error(
                e instanceof Error
                  ? e.message
                  : `Unable to reload the circuit.`,
              ),
            !1
          );
        }
        return !1;
      } finally {
        t() &&
          ((this.buildingCircuit = null),
          (this.buildingRules = ``),
          (this.circuitLoading = !1),
          this.launch?.state === `cancelled` && (this.launch = null),
          (this.ready = a),
          (this.loading = {
            ...this.loading,
            active: !1,
            progress: a ? 1 : null,
            stage: a ? `Ready` : `Unable to prepare circuit`,
          }),
          (this.accumulator = 0),
          (this.last = performance.now()),
          this.notify(this.hud()));
      }
    }
    selectKind(e) {
      !this.ready ||
        this.sim.mode !== `menu` ||
        this.online.lobbyId ||
        this.online.busy ||
        (this.sim.start(
          e,
          crypto.getRandomValues(new Uint32Array(1))[0],
          void 0,
          Bn(e, this.modifiers),
        ),
        (this.sim.mode = `menu`),
        this.loadBest(e),
        this.leaderboards.selectCircuit(
          this.shownCircuit(),
          e,
          this.modifiers.direction,
        ),
        this.notify(this.hud()));
    }
    endSession() {
      (this.recordFinish(),
        this.stats.flush(),
        this.flushAchievements(),
        this.sim.endSession(),
        this.keys.clear(),
        this.resetTouch(),
        (this.combatInputArmed = !1),
        this.notify(this.hud()));
    }
    pause() {
      this.recoveringGraphics ||
        (this.stats.flush(),
        this.flushAchievements(),
        this.online.session?.active
          ? (this.onlinePaused = !this.onlinePaused)
          : this.sim.pause(),
        (this.onlinePaused || this.sim.mode === `paused`) &&
          this.audio.update(0, !1, !1),
        this.keys.clear(),
        this.resetTouch(),
        (this.combatInputArmed = !1),
        this.notify(this.hud()));
    }
    menu() {
      if (this.online.lobbyId) {
        this.online.leave().then(() => {
          this.online.lobbyId || ((this.onlinePaused = !1), this.menu());
        });
        return;
      }
      (this.recordFinish(),
        this.stats.flush(),
        this.sim.start(this.sim.kind, void 0, void 0, {
          ...Bn(this.sim.kind, this.modifiers),
          direction: this.builtRules.direction,
        }),
        (this.sim.mode = `menu`),
        (this.sim.distance = 0),
        (this.sim.speed = 0),
        (this.sim.lane = -4.6),
        (this.sim.steer = 0),
        this.keys.clear(),
        this.resetTouch(),
        (this.combatInputArmed = !1),
        this.notify(this.hud()));
    }
    setSettings(e) {
      let t = this.world.graphics.requested,
        n =
          e.graphics ??
          (e.quality === void 0
            ? t
            : a(e.quality === `performance` ? `low` : `high`)),
        r =
          e.speedBlur === void 0
            ? n
            : Jt({ postProcessing: { speedBlur: e.speedBlur } }, n);
      (this.useSettings(
        Xn(u({ ...e, graphics: r }), {
          ...this.sim.settings,
          quality: this.preferredQuality,
        }),
      ),
        this.preferences.changed(),
        this.notify(this.hud()));
    }
    setGraphicsPreset(e) {
      this.setSettings({ graphics: a(e) });
    }
    setGraphics(e) {
      this.setSettings({ graphics: Jt(e, this.world.graphics.requested) });
    }
    setGraphicsDiagnostics(e) {
      (this.world.performance.setEnabled(e),
        e || oS(this.world.renderer),
        this.notify(this.hud()));
    }
    captureGraphicsBaseline() {
      (this.world.performance.captureBaseline(), this.notify(this.hud()));
    }
    clearGraphicsBaseline() {
      (this.world.performance.clearBaseline(), this.notify(this.hud()));
    }
    useSettings(e) {
      e.frameRateLimit !== this.sim.settings.frameRateLimit &&
        (this.framePacer.reset(), this.world.performance.reset());
      let t = ye(e);
      ((this.preferredQuality = t.preset === `low` ? `performance` : `high`),
        JSON.stringify(t) !== JSON.stringify(this.world.graphics.requested) &&
          this.world.setGraphics(t),
        Object.assign(this.sim.settings, e, {
          graphics: t,
          quality:
            this.world.graphics.effective.preset === `low`
              ? `performance`
              : `high`,
          speedBlur: t.postProcessing.speedBlur,
        }),
        this.audio.setMix(
          this.sim.settings.volume,
          this.sim.settings.musicVolume,
          this.sim.settings.effectsVolume,
        ));
      try {
        localStorage.setItem(
          je,
          Pe({
            ...e,
            graphics: t,
            quality: this.preferredQuality,
            speedBlur: t.postProcessing.speedBlur,
          }),
        );
      } catch {}
    }
    selectMusic(e) {
      (this.audio.selectTrack(e),
        this.preferences.changed(),
        this.notify(this.hud()));
    }
    setMusicShuffle(e) {
      (this.audio.setShuffle(e),
        this.preferences.changed(),
        this.notify(this.hud()));
    }
    currentPreferences() {
      let e = this.audio.snapshot();
      return {
        settings: {
          ...this.sim.settings,
          quality: this.preferredQuality,
          graphics: this.world.graphics.requested,
        },
        music: { track: St[e.index].id, shuffle: e.shuffle },
      };
    }
    applyPreferences(e) {
      (this.useSettings(e.settings), this.audio.setShuffle(e.music.shuffle));
      let t = St.findIndex((t) => t.id === e.music.track);
      (!e.music.shuffle && t >= 0 && this.audio.selectTrack(t),
        this.notify(this.hud()));
    }
    applyProgress(e) {
      (this.stats.career(e.career, !1),
        (this.careerDone = Le(e.career)),
        (this.careerBadge = ee(e.career)),
        this.sim.mode === `menu` && this.loadBest(this.sim.kind),
        this.sim.kind === `timed-lap` &&
          (this.ghostLap = aT(
            this.ghostLap,
            oT(this.storage(), O.id, this.sim.modifiers.direction),
          )),
        this.checkAchievements(!0),
        this.notify(this.hud()));
    }
    storage() {
      try {
        return localStorage;
      } catch {
        return null;
      }
    }
    updateGhost() {
      let e = this.sim,
        t = () => {
          (this.world?.setGhost(null, 0, this.selectedShip, `original`),
            (this.ghostGapNow = null));
        };
      if (!this.world || e.kind !== `timed-lap` || e.networked) return t();
      let n = e.distance - (e.lap - 1) * v,
        r = this.ghostRecorder.observe(
          e,
          {
            lane: e.lane,
            heading: e.heading + e.slideYaw,
            roll: e.roll,
            pitch: e.pitch,
            height: e.hoverHeight + Qs(e),
          },
          v,
          {
            circuit: O.id,
            direction: e.modifiers.direction,
            ship: this.selectedShip,
            skin: this.selectedSkin,
          },
        );
      r &&
        !(this.ghostLap && this.ghostLap.lap <= r.lap) &&
        ((this.ghostLap = r), sT(this.storage(), r), this.progress.changed());
      let i = e.settings.ghost ? this.ghostLap : null,
        a = e.elapsed - e.lapStart,
        o = [`countdown`, `racing`, `paused`].includes(e.mode);
      if (!i || !o || a > i.lap + 0.4) return t();
      let s = cT(i, a),
        c = Math.abs(s.distance - n),
        l = Ys(e) ? 5 : 2,
        u = Math.min(1, Math.max(0, (c - l) / 12)),
        d = ae(i.ship).id;
      (this.world.setGhost(
        { ...s, distance: s.distance + (e.lap - 1) * v },
        c < l ? 0 : 0.25 + 0.75 * u * u * (3 - 2 * u),
        d,
        xe(d, i.skin).id,
      ),
        (this.ghostGapNow = e.mode === `racing` ? uT(i, a, n) : null));
    }
    addFeats(e) {
      let t = this.storage(),
        n = qw(t),
        r = Kw([...n, ...e]);
      r.length !== n.length &&
        (Jw(t, r), this.progress.changed(), this.checkAchievements(!0));
    }
    achievementInput() {
      let e = this.storage();
      return {
        stats: this.stats.hud().values,
        career: Sn(e),
        feats: new Set(qw(e)),
      };
    }
    checkAchievements(e = !1) {
      let t = performance.now();
      if (e || t >= this.nextAchievementCheck) {
        this.nextAchievementCheck = t + 1e3;
        let e = yn(this.achievementInput());
        for (let t of this.achievementBook) {
          let n = t.hud();
          if (!e.has(n.id) || n.earned) continue;
          let r = t.settled;
          (t.award(), r && this.unlockQueue.push(n.id));
        }
        this.achievementRows = this.achievementList();
      }
      for (let e of this.achievementBook) e.tick();
    }
    achievementList() {
      let e = this.achievementInput(),
        t = new Map(this.achievementBook.map((e) => [e.hud().id, e.hud()])),
        n = this.achievements.hud();
      return Tt.map((r) => {
        let i = r.id === n.id ? n : t.get(r.id);
        return {
          id: r.id,
          title: r.title,
          description: r.description,
          group: r.group,
          tier: r.tier,
          icon: r.icon,
          status: i?.status ?? `locked`,
          progress: r.progress?.(e) ?? null,
        };
      });
    }
    achievementToast() {
      let e = performance.now();
      if (!this.toast || e - this.toast.at >= 4e3) {
        let t = this.unlockQueue.shift();
        this.toast = t ? { id: t, at: e } : null;
      }
      let t = this.toast && Tt.find((e) => e.id === this.toast.id);
      return t
        ? { id: t.id, title: t.title, tier: t.tier, at: this.toast.at }
        : null;
    }
    toggleSound() {
      if (this.online.sdk) {
        this.online.sdk.toggleMute();
        return;
      }
      ((this.audio.muted = !this.audio.muted),
        this.updateAudio(),
        this.audio.muted || this.audio.unlock().catch(() => {}),
        this.notify(this.hud()));
    }
    takeScreenshot() {
      if (!(!this.ready || this.disposed || this.circuitLoading))
        try {
          this.world.render();
          let e = this.capture.snapshot().options.hud
            ? this.hudCapture.still().then((e) => e ?? this.drawnHud)
            : void 0;
          this.capture.takeScreenshot(this.world.renderer.domElement, e);
        } catch {
          this.capture.reportError(
            `The game frame could not be captured. Try again in a moment.`,
          );
        }
    }
    setCaptureOptions(e) {
      this.capture.configure(e);
    }
    async toggleRecording() {
      let e = this.capture.snapshot().status;
      if (e === `recording`) {
        await this.capture.stop();
        return;
      }
      if (
        e === `finishing` ||
        this.captureStarting ||
        !this.ready ||
        this.disposed
      )
        return;
      let t = this.captureGeneration,
        n = this.world;
      this.captureStarting = !0;
      try {
        if (
          (this.capture.snapshot().options.audio &&
            (await this.audio.unlock().catch(() => {})),
          this.capture.snapshot().options.hud &&
            (await this.hudCapture.refresh()),
          this.disposed ||
            !this.ready ||
            document.hidden ||
            n !== this.world ||
            t !== this.captureGeneration)
        )
          return;
        this.world.render();
        let e = this.capture.snapshot().options.audio
          ? this.audio.createCaptureAudio()
          : null;
        this.capture.start(
          this.world.renderer.domElement,
          e,
          this.captureOverlay,
        );
      } catch {
        this.capture.reportError(
          `Recording could not start. Try again in a moment.`,
        );
      } finally {
        this.captureStarting = !1;
      }
    }
    fullscreen() {
      if (this.online.sdk) {
        this.online.sdk.toggleFullscreen();
        return;
      }
      document.fullscreenElement
        ? document.exitFullscreen?.().catch(() => {})
        : document.documentElement.requestFullscreen?.().catch(() => {});
    }
    dispose() {
      (this.detachDiagnostics?.(),
        this.detachIntro(),
        clearInterval(this.onlineTimer),
        this.stats.dispose(),
        this.achievements.dispose());
      for (let e of this.achievementBook) e.dispose();
      (this.preferences.dispose(),
        this.progress.dispose(),
        this.online.dispose(),
        this.toolLifecycle.abort(),
        (this.disposed = !0),
        this.captureGeneration++,
        this.capture.dispose(),
        this.hudCapture.dispose(),
        cancelAnimationFrame(this.frame),
        cancelAnimationFrame(this.menuFrame),
        this.menuInput.dispose(),
        this.resizeObserver.disconnect(),
        window.removeEventListener(`pointerdown`, this.audioGesture),
        window.removeEventListener(`keydown`, this.audioGesture),
        window.removeEventListener(`keydown`, this.keyDown, !0),
        window.removeEventListener(`pointerdown`, this.pointerInput),
        window.removeEventListener(`pointermove`, this.pointerMove),
        window.removeEventListener(`keyup`, this.keyUp),
        window.removeEventListener(`blur`, this.blur),
        document.removeEventListener(`visibilitychange`, this.visibility),
        window.render_game_to_text === this.textHook &&
          delete window.render_game_to_text,
        window.advanceTime === this.timeHook && delete window.advanceTime,
        this.audio.dispose(),
        this.world.dispose());
    }
  };
