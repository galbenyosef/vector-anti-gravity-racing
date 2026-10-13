// assets__game-CsnOSIff 90 — scene
// Lines 35852-38008 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var cC = class {
    constructor(e, t) {
      ((this.host = e),
        (this.sim = t),
        (this.garage = null),
        (this.lobby = null),
        (this.scene = new n()),
        (this.camera = new wn(66, 1, 0.3, 7500)),
        (this.post = null),
        (this.reflections = null),
        (this.ghost = new GS()),
        (this.performance = new Yx()),
        (this.rendererReady = !1),
        (this.authoredFiltering = new WeakMap()),
        (this.rivalAssets = []),
        (this.fleetTemplates = new Map()),
        (this.craftLoads = new Map()),
        (this.wantedCrafts = []),
        (this.boostPads = new pn()),
        (this.rivalModels = []),
        (this.rivalMaterialDisposers = []),
        (this.time = L(0)),
        (this.backend = `INITIALIZING`),
        (this.graphicsCompatibility = $t()),
        (this.graphicsFailure = null),
        (this.graphicsFailureAt = null),
        (this.graphicsError = null),
        (this.playerAsset = null),
        (this.environmentAsset = null),
        (this.batches = new Map()),
        (this.textures = [ca()]),
        (this.environmentTarget = null),
        (this.environmentMap = zi(ui(O), location.search)),
        (this.environmentInfo = {
          source: `loading`,
          peakRadiance: 0,
          limitedTexels: 0,
          cubeSize: 0,
        }),
        (this.portLife = null),
        (this.isNight = O.environment === `night`),
        (this.scenery = O.scenery),
        (this.isDesert = this.scenery === `desert`),
        (this.isLunar = this.scenery === `lunar`),
        (this.isMetropolis = this.scenery === `metropolis`),
        (this.meridian = null),
        (this.orbField = new G_()),
        (this.meridianScenery = null),
        (this.meridianLife = null),
        (this.meridianDressing = null),
        (this.meridianLayoutInfo = null),
        (this.meridianView = {
          distance: 0,
          lap: 1,
          laps: O.laps,
          position: new g(),
          finished: !1,
        }),
        (this.lunarSky = null),
        (this.lunar = null),
        (this.shackletonScenery = null),
        (this.launches = null),
        (this.floodlights = null),
        (this.shields = []),
        (this.shieldUp = []),
        (this.shieldSource = null),
        (this.shieldSerial = 0),
        (this.desert = null),
        (this.desertDressing = null),
        (this.siroccoScenery = null),
        (this.nightEnvironment = null),
        (this.nocturneCity = null),
        (this.cameraRig = new lc()),
        (this.disposed = !1),
        (this.reducedMotion = window.matchMedia(
          `(prefers-reduced-motion: reduce)`,
        )),
        (this.impacts = new Vx({
          matterLight: O.environment === `night` ? 0.4 : 1,
          vacuum: O.scenery === `lunar`,
        })),
        (this.contactPoint = new g()),
        (this.contactNormal = new g()),
        (this.lastCollisionSerial = 0),
        (this.trailPositions = new Float32Array(360)),
        (this.trailHistory = [[], []]),
        (this.trailGeometry = new tr()),
        (this.lobbyKey = ``),
        (this.bay = null),
        (this.bayLoaded = null),
        (this.renderScenePasses = () => {
          (PS(this.graphics.effective) && this.post
            ? this.post.render()
            : this.renderer.render(this.scene, this.camera),
            this.reflections?.update(this.camera));
        }),
        (this.presentationView = Object.create(t)),
        (this.graphics = new Sn(
          ie(t.settings),
          this.graphicsCompatibility.safeMode,
          this.isNight || this.isLunar,
          this.graphicsCompatibility.localReflections,
        )));
      let i = new URLSearchParams(location.search),
        a = vo(location.search);
      (a && this.graphics.patch({ shadows: { quality: a } }),
        i.has(`reflections`) &&
          this.graphics.patch({
            reflections: { intensity: HS(location.search) },
          }));
      let o = pS(location.search);
      (i.has(`ao`) &&
        this.graphics.patch({ ambientOcclusion: { quality: o.quality } }),
        i.has(`aoIntensity`) &&
          this.graphics.patch({ ambientOcclusion: { intensity: o.intensity } }),
        i.has(`aoRadius`) &&
          this.graphics.patch({ ambientOcclusion: { radius: o.radius } }),
        i.has(`SUN_SCATTERING_INTENSITY`) &&
          this.graphics.patch({
            atmosphere: {
              scatteringIntensity: Number(i.get(`SUN_SCATTERING_INTENSITY`)),
            },
          }),
        this.performance.setEnabled(i.get(`diagnostics`) === `1`),
        (this.renderer = Pi({
          forceWebGL: this.graphicsCompatibility.forceWebGL,
          circuit: O,
        })));
      let s = this.renderer.onDeviceLost;
      this.renderer.onDeviceLost = (e) => {
        (!this.disposed &&
          !this.graphicsFailure &&
          ((this.graphicsFailure = yt(e)),
          (this.graphicsFailureAt = Date.now())),
          s.call(this.renderer, e));
      };
      let c = this.renderer.onError;
      ((this.renderer.onError = (e) => {
        (this.disposed || (this.graphicsError = yt(e)),
          c.call(this.renderer, e));
      }),
        (this.renderer.info.autoReset = !1),
        (this.defaultContext = this.renderer.contextNode),
        this.renderer.domElement.setAttribute(
          `aria-label`,
          `${O.name} anti-gravity race circuit`,
        ),
        (this.renderer.domElement.style.visibility = `hidden`),
        this.host.appendChild(this.renderer.domElement),
        (this.scene.background = new _(
          this.isNight
            ? `#081329`
            : this.isDesert
              ? Ol.background
              : this.isLunar
                ? `#000000`
                : `#acd2de`,
        )),
        (this.scene.fog = this.isNight
          ? new r(`#111d38`, 1e3, 3400)
          : this.isDesert
            ? new r(Ol.fog.color, Ol.fog.near, Ol.fog.far)
            : this.isLunar
              ? new r(`#000000`, 9e3, 1e4)
              : new r(`#b3cfda`, 750, 2900)),
        (this.atmosphere = new eC(
          this.scene.fog,
          $S(
            this.isNight
              ? !0
              : this.isDesert
                ? `desert`
                : this.isLunar
                  ? `lunar`
                  : this.isMetropolis
                    ? `metropolis`
                    : !1,
            location.search,
          ),
        )),
        (this.scene.fogNode = this.atmosphere.node),
        (this.lighting = new us(this.scene, this.isNight, this.environmentMap, {
          shadowQuality: this.graphics.effective.shadows.quality,
          shadowDebug: new URLSearchParams(location.search).has(`shadowDebug`),
          desert: this.isDesert,
          lunar: this.isLunar,
          metropolis: this.isMetropolis,
          ordnanceLights: this.graphicsCompatibility.mobile ? 1 : 3,
        })),
        (this.renderer.lighting = this.lighting.fixtureLighting),
        (this.ambientParticles = new Gx(
          this.lighting,
          this.atmosphere,
          this.isNight,
          this.isLunar ? 0 : Wx(location.search),
        )),
        this.createEnvironment(),
        this.createTrack(),
        this.flushBatches(),
        (this.player = sC(`#ff5c28`, !0, this.time)),
        (this.rivals = t.rivals.map((e) => sC(e.color, !1, this.time))));
      for (let e of [this.player, ...this.rivals]) {
        (this.scene.add(e.group, e.shadow, e.glow, e.recovery.group),
          this.lighting.shadows.addCompactCaster(e.group, 7));
        let t = new Jb(new g(2.9, 1.37, 4.7), new g(0, 0.56, 0.1));
        (e.group.add(t.mesh), this.shields.push(t), this.shieldUp.push(!1));
      }
      (this.scene.add(this.impacts.group, this.ambientParticles.mesh),
        this.scene.add(this.ghost.group),
        this.trailGeometry.setAttribute(
          `position`,
          new vt(this.trailPositions, 3).setUsage(Be),
        ),
        (this.trailMesh = new nr(
          this.trailGeometry,
          new ar({
            color: new _(`#54dbff`).multiplyScalar(2),
            transparent: !0,
            opacity: 0.32,
            depthWrite: !1,
            blending: 2,
          }),
        )),
        (this.trailMesh.frustumCulled = !1),
        this.scene.add(this.trailMesh),
        (this.combatView = new to(this.sim)),
        this.scene.add(this.combatView.root),
        this.setQuality(),
        (this.stopWatchingPixelRatio = Kx(() => this.resize())));
    }
    async init(e = `kestrel`, t = () => {}, n = `original`) {
      let r = Di(this.environmentMap);
      if (
        (r.catch(() => void 0),
        t(0, `Preparing renderer`),
        await this.renderer.init(),
        (this.rendererReady = !0),
        !this.disposed &&
          (so(this.renderer),
          hc(this.renderer),
          await ni(this.renderer),
          !this.disposed &&
            ((this.backend =
              `isWebGPUBackend` in this.renderer.backend &&
              this.renderer.backend.isWebGPUBackend
                ? `WEBGPU`
                : `WEBGL 2`),
            t(0.05, `Loading your ship`),
            await this.selectPlayerShip(e, n),
            t(0.15, `Loading the racing fleet`),
            await this.loadFleet(),
            await Promise.all(
              this.wantedCrafts.map((e) => this.ensureCraft(e.ship, e.skin)),
            ),
            t(0.3, `Loading weapons and effects`),
            await this.combatView.init(),
            !this.disposed)))
      ) {
        if ((t(0.4, `Loading track scenery`), this.scenery === `port`)) {
          let e = await Fc();
          if (this.disposed) {
            Dc(e.group);
            return;
          }
          (this.scene.add(e.group),
            this.lighting.shadows.addCasterCells(e.group),
            (this.environmentAsset = e.info),
            t(0.5, `Preparing the harbour`));
          let n = await Ex.load();
          if (this.disposed) {
            n.dispose();
            return;
          }
          ((this.portLife = n), this.scene.add(n.group));
        } else if (this.desert) {
          let e = this.desert,
            t = await eu(
              (t, n) => e.heightAt(t, n),
              () => e.createRockMaterial(),
            );
          if (this.disposed) {
            Dc(t.group);
            return;
          }
          ((this.siroccoScenery = t),
            this.scene.add(t.group),
            this.lighting.shadows.addCasterCells(t.group),
            (this.environmentAsset = t.info));
        } else if (this.lunarSky && this.lunar) {
          let e = this.lunar,
            t = Vd(
              (t, n) => e.heightAt(t, n),
              (t, n, r) => e.shaded(t, n, r),
            );
          ((this.floodlights = qd(
            t.filter((e) => e.asset === `crater-beacon`).map((e) => e.position),
          )),
            this.lighting.addFixtures(this.floodlights.fixtures),
            this.scene.add(this.floodlights.group));
          let n = Ld(t, { mobile: this.graphicsCompatibility.mobile }),
            r;
          try {
            [r] = await Promise.all([n, this.lunarSky.ready, e.ready]);
          } catch (e) {
            throw (
              n.then(
                (e) => e.dispose(),
                () => void 0,
              ),
              e
            );
          }
          if (this.disposed) {
            r.dispose();
            return;
          }
          ((this.shackletonScenery = r), this.scene.add(r.group));
          let i = t.filter((e) => e.asset === `mass-driver`);
          (i.length &&
            ((this.launches = new Ud(i, md.massDriver.end)),
            this.scene.add(this.launches.group)),
            this.lighting.shadows.addCasterCells(r.group),
            (this.environmentAsset = r.info));
        } else if (this.meridian) {
          let e = this.meridian,
            t = this.graphicsCompatibility.mobile,
            n = pg({ mobile: t, heightAt: (t, n) => e.heightAt(t, n) });
          ((this.meridianLayoutInfo = n.info),
            this.lighting.addFixtures(n.fixtures),
            e.paveStreets(n, { mobile: t }));
          let r = await Fv(n, Rb(t), { mobile: t, time: this.time });
          if (this.disposed) {
            r.dispose();
            return;
          }
          ((this.meridianScenery = r),
            (this.meridianLife = new Bb((e) => r.batches(e), { mobile: t })),
            this.scene.add(r.group),
            this.lighting.shadows.addCasterCells(
              r.statics,
              lv[t ? `mobile` : `desktop`].shadowCell,
            ),
            (this.environmentAsset = r.info));
        } else if (this.nightEnvironment) {
          let e = await Hc(this.nightEnvironment, this.lighting);
          if (this.disposed) {
            Dc(e.group);
            return;
          }
          ((this.nocturneCity = e), this.scene.add(e.group));
        }
        (this.scene.add(this.orbField.group),
          t(0.55, `Preparing environment lighting`),
          await this.createEnvironmentLighting(r),
          !this.disposed &&
            ((this.reflections = new WS(
              this.renderer,
              this.scene,
              this.player.group,
              this.defaultContext,
              HS(location.search),
            )),
            this.reflections.setQuality(
              this.graphics.effective.reflections.mode === `local`,
            ),
            !this.disposed &&
              ((this.post = new IS(
                this.renderer,
                this.scene,
                this.camera,
                this.atmosphere,
                this.lighting.sun,
                this.lighting.shadows,
                this.graphics.effective,
                this.isDesert
                  ? yS.sunset
                  : this.isMetropolis
                    ? yS.metropolis
                    : yS.day,
              )),
              this.applyGraphics(),
              await this.prepareRendering((e, n) => t(0.6 + e * 0.4, n)),
              !this.disposed &&
                (this.renderer.domElement.style.visibility = ``))));
      }
    }
    async prepareRendering(e = () => {}) {
      (this.update(0),
        this.useRenderContext(),
        this.combatView.prepareShaders());
      let t = new pn();
      t.name = `Fleet preparation`;
      for (let e of this.fleetTemplates.values()) t.add(e.scene);
      this.scene.add(t);
      try {
        (this.reflections?.prepareTargets(this.camera),
          await fc(this.scene, () =>
            iC(async () => {
              let t = [...this.scene.children];
              if (
                (e(0, `Preparing track surfaces and shadows`),
                await dc(),
                !this.disposed)
              ) {
                if (this.post && PS(this.graphics.effective))
                  await this.post.prepare(t, (t) =>
                    e(t * 0.65, `Preparing track surfaces and effects`),
                  );
                else {
                  if (
                    (await this.renderer.compileAsync(this.scene, this.camera),
                    this.disposed)
                  )
                    return;
                  (e(0.65, `Preparing track surfaces and effects`),
                    this.disposed ||
                      this.renderer.render(this.scene, this.camera));
                }
                this.disposed ||
                  (e(0.65, `Preparing reflections`),
                  await this.reflections?.prepare(this.camera, (t) =>
                    e(0.65 + t * 0.25, `Preparing reflections`),
                  ));
              }
            }),
          ));
      } finally {
        (t.removeFromParent(), t.clear(), this.disposed || this.update(0));
      }
      this.disposed ||
        (e(0.92, `Finishing GPU preparation`),
        await dc(),
        !this.disposed &&
          (this.render(),
          await pc(this.renderer),
          !this.disposed && (this.performance.reset(), e(1, `Ready`))));
    }
    async selectPlayerShip(e, t = `original`) {
      let n = await Oc(e, t);
      if (this.disposed) return (Dc(n.scene), !1);
      let r = new pn(),
        i = this.player.group.children.filter(
          (e) => !this.player.flames.includes(e) && !e.userData.craftAttachment,
        );
      return (
        this.reflections?.detach(this.player.group),
        r.add(...i),
        this.player.group.add(n.scene),
        this.reflections?.attach(n.scene),
        this.lighting.shadows.mergeCraftCaster(n.scene),
        (this.player.brakes = n.brakes),
        (this.player.engines = n.engines),
        (this.player.animation = n.animation),
        (this.playerAsset = n.info),
        this.garage?.active && this.garage.setModel(n.scene),
        (this.trailHistory = [[], []]),
        Dc(r),
        this.applyTextureFiltering(),
        this.update(0),
        !0
      );
    }
    setLobby(e) {
      if (!e) {
        (this.lobby && (this.lobby.active = !1), (this.lobbyKey = ``));
        return;
      }
      ((this.lobby ??= new yx(this.scene.environment)),
        this.lobby.bayState === `none` &&
          ((this.lobby.bayState = `loading`),
          this.preloadLobby().then((e) => {
            !this.lobby ||
              this.disposed ||
              (e
                ? this.lobby.useBay(
                    e,
                    this.renderer,
                    this.graphicsCompatibility.mobile
                      ? null
                      : this.graphics.effective.bloom,
                  )
                : this.lobby.bayFailed());
          })),
        (this.lobby.active = !0),
        (this.lobby.inRoom = e.some((e) => !e.self) || e[0]?.id !== `self`),
        this.lobby.resize(this.camera.aspect));
      let t = this.player.group.children.find((e) =>
          e.name.includes(`Blender`),
        ),
        n = e.map((e) => {
          let n = e.self ? t : void 0,
            r = n || !e.ship ? null : this.craftTemplate(e.ship, e.skin),
            i = n ? (this.playerAsset?.skin ?? e.skin) : r?.skin,
            a = n ? (this.playerAsset?.id ?? e.ship) : e.ship;
          return {
            id: e.id,
            self: e.self,
            key: a ? `${a}:${i ?? `none`}:${n ? n.uuid : ``}` : ``,
            accent: e.ship ? rr({ ship: e.ship, skin: e.skin }) : `#3b5c6b`,
            source: n ?? r?.template.scene ?? null,
          };
        }),
        r = n.map((e) => `${e.id}|${e.key}|${e.accent}|${e.self}`).join(`,`);
      r !== this.lobbyKey && ((this.lobbyKey = r), this.lobby.setPilots(n));
    }
    preloadLobby() {
      if (this.bay) return this.bay;
      if (this.disposed || !this.rendererReady) return Promise.resolve(null);
      let e = this.graphicsCompatibility.mobile;
      return (
        (this.bay = hx(this.renderer, this.lobbyCamera(), {
          anisotropy: Math.min(4, this.renderer.getMaxAnisotropy()),
          reflections:
            !e && this.graphics.effective.reflections.mode === `local`,
          specular: !e,
        })
          .then((e) =>
            this.disposed ? (e.dispose(), null) : ((this.bayLoaded = e), e),
          )
          .catch(
            (e) => (
              console.warn(`Launch bay unavailable; using the stand-in.`, e),
              null
            ),
          )),
        this.bay
      );
    }
    lobbyCamera() {
      return (
        (this.lobby ??= new yx(this.scene.environment)),
        this.lobby.camera
      );
    }
    setGarageOpen(e) {
      if (e && this.sim.mode === `menu`) {
        ((this.garage ??= new Yb(this.scene.environment)),
          (this.garage.active = !0));
        let e = this.player.group.children.find((e) =>
          e.name.includes(`Blender`),
        );
        (e && this.garage.setModel(e),
          this.garage.resize(this.camera.aspect),
          this.garage.reset(),
          (this.garage.rotating = !this.reducedMotion.matches));
      } else
        this.garage && ((this.garage.active = !1), this.garage.clearModel());
      this.update(0);
    }
    async loadFleet() {
      if (this.graphicsCompatibility.mobile) {
        for (let e of E) {
          if (this.disposed) return;
          let t = await Oc(e.id);
          if (this.disposed) {
            Dc(t.scene);
            return;
          }
          this.fleetTemplates.set(t.info.id, t);
        }
        return;
      }
      let e = await Promise.allSettled(E.map((e) => Oc(e.id)));
      for (let t of e)
        t.status === `fulfilled` &&
          (this.disposed
            ? Dc(t.value.scene)
            : this.fleetTemplates.set(t.value.info.id, t.value));
      let t = e.find((e) => e.status === `rejected`);
      if (t?.status === `rejected`) throw t.reason;
    }
    setGhost(e, t, n, r) {
      if (e) {
        let e = this.craftTemplate(n, r);
        e &&
          this.ghost.setModel(`${n}:${e.skin}`, e.template.scene) &&
          this.reflections?.attach(this.ghost.group);
      }
      this.ghost.place(e, t);
    }
    craftTemplate(e, t = `original`) {
      if (t !== `original`) {
        let n = this.fleetTemplates.get(`${e}:${t}`);
        if (n) return { template: n, skin: t };
        this.ensureCraft(e, t);
      }
      let n = this.fleetTemplates.get(e);
      return n ? { template: n, skin: `original` } : null;
    }
    ensureCraft(e, t) {
      let n = `${e}:${t}`;
      if (t === `original` || this.disposed || this.fleetTemplates.has(n))
        return Promise.resolve();
      let r = this.craftLoads.get(n);
      if (r) return r;
      let i = Oc(e, t)
        .then(async (e) => {
          if (this.disposed) {
            Dc(e.scene);
            return;
          }
          this.fleetTemplates.set(n, e);
          try {
            await this.renderer.compileAsync(e.scene, this.camera, this.scene);
          } catch {}
        })
        .catch((e) => {
          console.warn(`[ship] ${n} livery unavailable`, e);
        });
      return (this.craftLoads.set(n, i), i);
    }
    setRivalModel(e, t, n = `original`) {
      let r = this.craftTemplate(t, n);
      if (!r) return;
      let i = this.rivalAssets[e];
      if (i?.id === t && i.skin === r.skin) return;
      let a = r.template,
        o = this.rivals[e],
        s = this.rivalModels[e];
      if (s) (o.group.remove(s), this.rivalMaterialDisposers[e]?.());
      else {
        let e = new pn();
        (e.add(
          ...o.group.children.filter(
            (e) => !o.flames.includes(e) && !e.userData.craftAttachment,
          ),
        ),
          Dc(e));
      }
      let c = a.scene.clone(!0);
      (o.group.add(c),
        (o.brakes = [`airbrake_negative_x`, `airbrake_positive_x`].map((e) =>
          c.getObjectByName(e),
        )),
        (o.engines = a.engines.map((e) => e.clone())),
        (o.animation = xc(c)),
        this.lighting.shadows.mergeCraftCaster(c),
        (this.rivalMaterialDisposers[e] = ks(c)),
        (this.rivalModels[e] = c),
        (this.rivalAssets[e] = {
          id: t,
          skin: r.skin,
          source: a.info.source,
          textured: a.info.textureMaps > 0,
        }));
    }
    addStatic(e, t, n, r) {
      ((n || r) &&
        e.applyMatrix4(
          new M().compose(n || new g(), r || new Ot(), new g(1, 1, 1)),
        ),
        this.batches.has(t) || this.batches.set(t, []),
        this.batches.get(t).push(e));
    }
    box(e, t, n, r, i, a) {
      this.addStatic(new ir(e, t, n), r, i, a);
    }
    flushBatches() {
      for (let [e, t] of this.batches) {
        let n = ur(t);
        if (!n) continue;
        let r = new N(n, e);
        ((r.receiveShadow = !0),
          (r.castShadow = !0),
          this.scene.add(r),
          t.forEach((e) => e.dispose()));
      }
      this.batches.clear();
    }
    async createEnvironmentLighting(e) {
      let t = null;
      try {
        t = await e;
      } catch (e) {
        console.warn(
          `${this.environmentMap.url} unavailable; lighting from the sky dome.`,
          e,
        );
      }
      if (this.disposed) {
        t?.texture.dispose();
        return;
      }
      let r = new Ut(this.renderer);
      try {
        if (t)
          ((this.environmentTarget = r.fromEquirectangular(t.texture)),
            this.scene.environmentRotation.set(
              0,
              s.degToRad(this.environmentMap.rotation),
              0,
            ));
        else {
          let e = new n(),
            t = this.skyDome.clone();
          (t.position.set(0, 0, 0),
            t.scale.setScalar(0.01),
            e.add(t),
            this.lunarSky?.setBaking(!0));
          try {
            this.environmentTarget = r.fromScene(e, 0.04, 0.1, 100, {
              size: 256,
            });
          } finally {
            this.lunarSky?.setBaking(!1);
          }
          e.clear();
        }
      } finally {
        (r.dispose(), t?.texture.dispose());
      }
      ((this.scene.environment = this.environmentTarget.texture),
        (this.lighting.environmentIntensity = t
          ? this.environmentMap.intensity
          : this.environmentMap.skyIntensity),
        (this.environmentInfo = {
          source: t ? `hdr` : `procedural-sky`,
          peakRadiance: +(t?.peakRadiance ?? 0).toFixed(1),
          limitedTexels: t?.limitedTexels ?? 0,
          cubeSize: this.environmentTarget.height / 4,
        }));
    }
    createEnvironment() {
      if (this.isMetropolis) {
        ((this.meridian = new z_(this.time, {
          mobile: this.graphicsCompatibility.mobile,
        })),
          (this.skyDome = this.meridian.skyDome),
          this.scene.add(this.meridian.group));
        return;
      }
      if (this.isLunar) {
        ((this.lunarSky = new gu({
          mobile: this.graphicsCompatibility.mobile,
        })),
          (this.skyDome = this.lunarSky.skyDome),
          (this.lunar = new dd({ mobile: this.graphicsCompatibility.mobile })),
          this.lighting.shadows.setTerrainShadow(
            this.lunar.sunShadow,
            this.lunar.heights,
          ),
          this.scene.add(this.lunarSky.group, this.lunar.group));
        return;
      }
      if (this.isDesert) {
        ((this.desert = new Dl(this.time, {
          mobile: this.graphicsCompatibility.mobile,
        })),
          this.lighting.shadows.setTerrainShadow(
            this.desert.sunShadow,
            this.desert.heights,
          ),
          (this.skyDome = this.desert.skyDome),
          this.scene.add(this.desert.group));
        return;
      }
      if (this.isNight) {
        ((this.nightEnvironment = new Os()),
          (this.skyDome = this.nightEnvironment.skyDome),
          this.scene.add(this.nightEnvironment.group));
        return;
      }
      let e = new i({ side: 1, depthWrite: !1, fog: !1 }),
        t = Xi.normalize(),
        n = t.y.max(0).pow(0.55),
        r = t.dot(q(Wo)).max(0).pow(850),
        a = t.dot(q(Wo)).max(0).pow(10),
        o = t.add(q(this.time.mul(0.0014), 0, this.time.mul(7e-4))),
        s = Fi(o.mul(q(5, 11, 5)))
          .mul(0.65)
          .add(Fi(o.mul(q(15, 25, 15))).mul(0.22))
          .smoothstep(0.1, 0.5)
          .mul(t.y.smoothstep(0.015, 0.17)),
        c = J(J(W(`#d1e5e6`), W(`#3486b9`), n), W(`#f0f6fa`), s.mul(0.7))
          .add(r.mul(q(6, 5, 3.5)))
          .add(a.mul(q(0.22, 0.18, 0.1)));
      ((e.colorNode = J(W(`#183945`), c, t.y.smoothstep(-0.18, 0.04))),
        (this.skyDome = new N(new bt(6e3, 32, 24), e)),
        this.scene.add(this.skyDome));
      let l = new kt({ roughness: va.roughness, metalness: 0, ior: va.ior });
      l.name = `Solstice sea`;
      let u = Fi(q(U.x.mul(0.13), U.z.mul(0.21), this.time.mul(0.3))),
        d = Fi(q(U.x.mul(0.4).add(40), U.z.mul(0.27), this.time.mul(0.2))),
        f = Fi(q(U.x.mul(1.3), U.z.mul(0.73), this.time.mul(0.12)))
          .mul(0.5)
          .add(0.5),
        p = J(W(va.deep), W(va.shallow), u.mul(0.35).add(0.4));
      l.colorNode = p.add(p.mul(f.pow(18).mul(va.sparkle * 20)));
      let m = q(u.mul(va.swell), 1, d.mul(va.crossSwell)).normalize();
      l.normalNode = _r.mul(H(m, 0)).xyz.normalize();
      let h = new N(new rt(14e3, 14e3), l);
      ((h.rotation.x = -Math.PI / 2), (h.position.y = -3), this.scene.add(h));
      let v = xa(`orbitalConcrete`, `day`),
        y = new N(new sn(110, 5, 10, 80), v);
      (y.position.set(30, 205, 60),
        y.rotation.set(Math.PI / 2.7, 0.25, 0.3),
        this.scene.add(y));
      let b = new N(
        new sn(110, 0.7, 6, 80),
        new we({ color: new _(`#79e5fa`).multiplyScalar(2) }),
      );
      (b.position.copy(y.position).add(new g(0, 2, -3)),
        b.rotation.copy(y.rotation),
        this.scene.add(b));
      let x = xa(`mountainRock`, `day`);
      for (let e = 0; e < 28; e++) {
        let t = (e / 28) * Math.PI * 2,
          n = 1800 + rC() * 700,
          r = 160 + rC() * 330,
          i = new Zt(220 + rC() * 330, r, 6);
        (i.scale(1, 1, 0.75),
          this.addStatic(
            i,
            x,
            new g(Math.cos(t) * n, r / 2 - 70, Math.sin(t) * n),
          ));
      }
    }
    lunarFeature(e, t) {
      return (v.find((t) => t.name.includes(e))?.from ?? t) * F;
    }
    lunarSponsors() {
      let e = F,
        t = Se.find((e) => e.glass),
        n = Se.find((e) => !e.glass);
      return [
        [e * 0.02, -1, `SHACKLETON`, `RIM / LUNAR RACING 04`, `#dfe9f5`],
        [
          this.lunarFeature(`WALL`, 0.141) - 60,
          1,
          `THE WALL`,
          `56 DEGREES / FULL THROTTLE`,
          `#ff7a45`,
        ],
        [
          (t?.from ?? 0.26) * e - 40,
          -1,
          `BIODOME`,
          `ETERNAL LIGHT / GLASS TUBE`,
          `#7cf2b4`,
        ],
        [
          (Xn[0]?.kicker ?? e * 0.45) - 160,
          1,
          `EARTHRISE`,
          `ONE-SIXTH G / HOLD IT STRAIGHT`,
          `#7fc8ff`,
        ],
        [
          this.lunarFeature(`SPIRAL`, 0.56) + 40,
          -1,
          `COLD TRAP`,
          `SHADOW SPIRAL / AIRBRAKE`,
          `#a9c4ff`,
        ],
        [
          (n?.from ?? 0.76) * e - 40,
          1,
          `SVERDRUP`,
          `LAVA TUBE / BASALT BORE`,
          `#ff9a5c`,
        ],
        [e * 0.93, -1, `VECTOR`, `WORLD RACING LEAGUE`, `#ff6838`],
      ];
    }
    createTrack() {
      let {
          road: e,
          wall: t,
          tunnel: n,
        } = iS(
          this.isNight,
          this.graphicsCompatibility.mobile,
          this.isDesert,
          this.isLunar,
        ),
        r = this.isNight ? `night` : `day`,
        a = xa(`structureLight`, r),
        o = xa(`structureDark`, r),
        s = xa(`kerbPaint`, r),
        l =
          this.nightEnvironment?.pulseCyan ??
          new we({ color: new _(`#54e9ee`).multiplyScalar(2.2) }),
        u = he();
      for (let [t, n] of u) {
        (this.addStatic(
          cr(
            t,
            n,
            (e) => -j(e),
            (e) => j(e),
            0,
            2,
          ),
          e,
        ),
          this.addStatic(
            tC(
              cr(
                t,
                n,
                (e) => -j(e) - 1,
                (e) => j(e) + 1,
                -1.6,
                2,
              ),
            ),
            o,
          ));
        for (let e of [-1, 1])
          (this.addStatic(tC(d(t, n, e, -1.6, 0, 1, 0)), o),
            this.addStatic(
              cr(
                t,
                n,
                (t) => (e < 0 ? -j(t) - 1 : j(t)),
                (t) => (e < 0 ? -j(t) : j(t) + 1),
                0,
                2,
              ),
              o,
            ));
      }
      let f = (e, t, n, r) => {
        for (let [i, a] of u)
          this.addStatic(d(i, a, e, t, n, t < 0 ? 0 : -0.035, 0.24), r);
      };
      for (let e of [-1, 1]) {
        (f(e, -1.5, 2.8, t),
          f(e, 0.3, 0.52, o),
          f(
            e,
            2.45,
            2.6,
            this.isNight
              ? new we({ color: new _(`#7bcfff`).multiplyScalar(1.3), side: 2 })
              : new i({
                  colorNode: W(`#66eaff`).mul(
                    X()
                      .x.mul(
                        (Math.PI * 24) / Math.round(F / it.wallTextureMetres),
                      )
                      .sub(this.time.mul(1.2))
                      .sin()
                      .mul(0.13)
                      .add(1.65),
                  ),
                  side: 2,
                }),
          ));
        for (let [t, n] of u)
          (this.addStatic(
            cr(
              t,
              n,
              (t) => e * j(t) - 0.3,
              (t) => e * j(t) + 0.3,
              0.045,
              2,
            ),
            s,
          ),
            this.addStatic(
              cr(
                t,
                n,
                (t) => e * (j(t) + 0.68) - 0.45,
                (t) => e * (j(t) + 0.68) + 0.45,
                2.8,
                2,
              ),
              o,
            ));
      }
      let p = (e) => {
        let t = A(e);
        return new Ot().setFromRotationMatrix(
          new M().makeBasis(t.right, t.up, t.tangent),
        );
      };
      for (let e = 0; e < F; e += 12) {
        if (c(e) || c(e + 1.5) || c(e - 1.5)) continue;
        let t = p(e);
        for (let n of [-1, 1])
          (this.box(0.22, 3.8, 0.4, o, P(e, n * (j(e) + 0.75), 0.8), t),
            Math.floor(e / 12) % 4 == 0 &&
              (this.box(0.16, 0.8, 3, s, P(e, n * (j(e) + 0.18), 0.92), t),
              this.box(1.4, 0.07, 2.2, a, P(e, n * (j(e) - 1.35), 0.045), t)));
        if (e % 60 < 12 && this.scenery === `port`) {
          let n = P(e, 0, -1.8);
          (this.box(7, n.y + 3, 6, a, new g(n.x, (n.y - 3) / 2, n.z)),
            this.box(10, 4, 10, o, new g(n.x, 0, n.z)),
            this.box(7.1, 3, 6.1, s, new g(n.x, n.y * 0.7, n.z)),
            this.box(j(e) * 2 + 2, 2, 5, o, P(e, 0, -2), t));
        }
      }
      let m = [],
        h = [];
      for (let e of dt) {
        h.push(
          cr(e.distance, e.distance + 16, e.lane - 3.25, e.lane + 3.25, 0.025),
        );
        let t = [];
        for (let n = 0; n < 4; n++) {
          let r = e.distance + n * 3.8,
            i = [
              [-2.8, 0],
              [0, 2.2],
              [2.8, 0],
              [2.8, 1],
              [0, 3.3],
              [-2.8, 1],
            ];
          for (let [n, a, o] of [
            [0, 1, 5],
            [5, 1, 4],
            [1, 2, 3],
            [1, 3, 4],
          ])
            for (let s of [n, o, a]) {
              let n = P(r + i[s][1], e.lane + i[s][0], 0.055);
              t.push(n.x, n.y, n.z);
            }
        }
        m.push(...t);
      }
      if (
        ((this.boostPads.name = `Boost pads`),
        this.scene.add(this.boostPads),
        h.length)
      ) {
        let e = ur(h);
        (h.forEach((e) => e.dispose()), e && this.boostPads.add(new N(e, o)));
      }
      if (m.length) {
        let e = new tr();
        (e.setAttribute(`position`, new ct(m, 3)),
          e.computeVertexNormals(),
          this.boostPads.add(
            new N(
              e,
              new we({ color: new _(`#58faff`).multiplyScalar(2.2), side: 2 }),
            ),
          ));
      }
      let v = aC(1024, 192, (e) => {
        ((e.fillStyle = this.isNight ? `#111a33` : `#e7efeb`),
          e.fillRect(0, 0, 1024, 192),
          (e.fillStyle = this.isNight ? `#e1ecff` : `#182e39`),
          (e.font = `italic 900 108px Arial`),
          e.fillText(`VECTOR`, 34, 130),
          (e.fillStyle = this.isNight ? `#ad91ff` : `#f36934`),
          e.fillRect(580, 24, 5, 144),
          (e.font = `bold 27px Arial`));
        let [t, ...n] = O.name.replace(` MK III`, ``).toUpperCase().split(` `),
          r = (Ye.findIndex((e) => e.id === O.id) + 1)
            .toString()
            .padStart(2, `0`);
        (e.fillText(t, 630, 80), e.fillText(`${n.join(` `)} / ${r}`, 630, 124));
      });
      this.textures.push(v);
      let y = Ca(`gateBanner`, v, this.isNight ? `night` : `day`, {
        side: 2,
        ...(this.isLunar ? { color: `#9ea2a6` } : {}),
      });
      for (let e of this.isNight
        ? [105]
        : this.isLunar
          ? [105, this.lunarFeature(`CREST`, 0.22) + 30]
          : this.isDesert
            ? [105, F * 0.69]
            : this.isMetropolis
              ? Fp().map((e, t) =>
                  S.direction === `reverse` && t > 0 ? F - e : e,
                )
              : [105, F * 0.35, F * 0.69]) {
        let t = p(e);
        for (let n of [-1, 1])
          this.box(2.1, 15, 3, a, P(e, n * (j(e) + 2), 6), t);
        (this.box(j(e) * 2 + 6, 2.8, 3, a, P(e, 0, 14), t),
          this.box(29, 0.2, 1.2, l, P(e, 0, 12.48), t));
        let n = new N(new rt(27, 5), y);
        (n.position.copy(P(e - 1.6, 0, 15)),
          n.quaternion.copy(t),
          n.rotateY(Math.PI),
          this.scene.add(n));
      }
      for (let e = 0; e < (this.isMetropolis ? 0 : 85); e += 14)
        for (let t of [-1, 1])
          this.addStatic(cr(e, e + 0.2, t * 4.8 - 2, t * 4.8 + 2, 0.06), a);
      for (let e = -15; e < 15; e += 1.5)
        for (let t = 0; t < 2; t++)
          this.addStatic(
            cr(t * 1.5, (t + 1) * 1.5, e, e + 1.5, 0.065),
            (Math.round(e / 1.5) + t) % 2 ? a : o,
          );
      if ((this.createRaceArchitecture(a, o, l, s, n), this.desert)) {
        let e = this.desert;
        ((this.desertDressing = Il(
          {
            white: a,
            dark: o,
            orange: s,
            cyan: l,
            sand: e.terrainMaterial,
            dune: e.duneMaterial,
          },
          this.time,
          (t, n) => e.heightAt(t, n),
          this.graphicsCompatibility.mobile,
        )),
          this.scene.add(this.desertDressing.group));
      } else if (this.lunar) {
        let e = this.lunar;
        ((this.desertDressing = Il(
          {
            white: a,
            dark: o,
            orange: s,
            cyan: l,
            sand: e.terrainMaterial,
            dune: e.terrainMaterial,
          },
          this.time,
          (t, n) => e.heightAt(t, n),
          this.graphicsCompatibility.mobile,
          {
            glass: { color: `#a7cbd2`, opacity: 0.16 },
            name: `Shackleton Rim · track dressing`,
            tunnelCover: !1,
          },
        )),
          this.scene.add(this.desertDressing.group));
        for (let t of Gd((t, n) => e.heightAt(t, n))) this.addStatic(t, o);
      } else
        this.meridian &&
          ((this.meridianDressing = pm(
            { white: a, dark: o, orange: s, cyan: l },
            this.time,
            this.graphicsCompatibility.mobile,
          )),
          this.scene.add(this.meridianDressing.group));
      if (this.scenery !== `port`) return;
      let b = xa(`solarGlass`, `day`);
      for (let e = 300; e < 520; e += 24) {
        let t = p(e);
        (this.box(1, 19, 1.6, a, P(e, -j(e) - 4, 8), t),
          this.box(13, 0.4, 20, o, P(e, -13, 17.5), t),
          this.box(12, 0.1, 19, b, P(e, -13, 17.76), t));
      }
    }
    createRaceArchitecture(e, t, n, r, i) {
      let a = (e) => {
          let t = A(e);
          return new Ot().setFromRotationMatrix(
            new M().makeBasis(t.right, t.up, t.tangent),
          );
        },
        o = (e, n, r, i, o, s, c = 15) => {
          let l = aC(1024, 320, (e) => {
            ((e.fillStyle = `#071a2c`),
              e.fillRect(0, 0, 1024, 320),
              (e.fillStyle = s),
              e.fillRect(0, 0, 24, 320),
              e.fillRect(0, 294, 1024, 8),
              (e.fillStyle = `#edfaff`),
              (e.font = `italic 900 110px Arial`),
              e.fillText(i, 55, 152),
              (e.fillStyle = s),
              (e.font = `bold 34px Arial`),
              e.fillText(o, 62, 233));
            for (let t = 0; t < 4; t++)
              (e.beginPath(),
                e.moveTo(838 + t * 35, 52),
                e.lineTo(857 + t * 35, 52),
                e.lineTo(827 + t * 35, 103),
                e.lineTo(808 + t * 35, 103),
                e.fill());
          });
          this.textures.push(l);
          let u = a(e);
          this.box(c + 0.7, c * 0.3125 + 0.6, 0.7, t, P(e, n, r), u);
          let d = new N(
            new rt(c, c * 0.3125),
            Ca(`screens`, l, this.isNight ? `night` : `day`, { side: 2 }),
          );
          (d.position.copy(P(e - 0.38, n, r)),
            d.quaternion.copy(u),
            d.rotateY(Math.PI),
            this.scene.add(d));
        },
        s = F,
        l = this.isLunar
          ? this.lunarSponsors()
          : this.isMetropolis
            ? []
            : this.isDesert
              ? [
                  [
                    s * 0.02,
                    -1,
                    `SIROCCO`,
                    `OASIS / DESERT RACING 03`,
                    `#ffb65c`,
                  ],
                  [
                    s * 0.214,
                    1,
                    `THE WALL`,
                    `58 DEGREES / HOLD THE LINE`,
                    `#ff7a45`,
                  ],
                  [s * 0.34, -1, `MIRAGE`, `GLASSWAY / 220 M UP`, `#6fe6ff`],
                  [
                    s * 0.505,
                    1,
                    `LEAP`,
                    `CARRY SPEED / CLEAR THE GAP`,
                    `#ffd35c`,
                  ],
                  [s * 0.63, -1, `HELIOS`, `SOLAR SPIRAL / CLIMB`, `#ffcf73`],
                  [s * 0.8, 1, `LAGOON`, `TIDAL RETURN / SANDWORM`, `#63e2d2`],
                  [s * 0.915, -1, `VECTOR`, `WORLD RACING LEAGUE`, `#ff6838`],
                ]
              : this.isNight
                ? [
                    [
                      F * 0.055,
                      -1,
                      `NOCTURNE`,
                      `EXCHANGE / NIGHT RACING`,
                      `#b39aff`,
                    ],
                    [
                      F * 0.185,
                      1,
                      `ZENITH`,
                      `SUMMIT HAIRPIN / BRAKE`,
                      `#ffcb89`,
                    ],
                    [F * 0.345, -1, `MOONFALL`, `DROP / 18 PERCENT`, `#79dfff`],
                    [F * 0.565, 1, `HALO`, `SPIRAL / CLIMB`, `#bda3ff`],
                    [F * 0.705, -1, `LANTERN`, `FOLLOW THE LIGHT`, `#ffcb89`],
                    [F * 0.93, 1, `VECTOR`, `WORLD RACING LEAGUE`, `#b59aff`],
                  ]
                : [
                    [154, -1, `AURORA`, `ANTI-GRAVITY SYSTEMS`, `#55e6ff`],
                    [218, 1, `VECTOR`, `WORLD RACING LEAGUE`, `#ff6838`],
                    [378, -1, `KIRIN`, `PRECISION / VELOCITY`, `#79ffba`],
                    [F * 0.44, -1, `STRATOS`, `ENGINEERED TO FLY`, `#ffcf55`],
                    [
                      F * 0.64,
                      1,
                      `CLOUDLINE`,
                      `SECTOR 03 / HIGH ALTITUDE`,
                      `#78dcff`,
                    ],
                    [F * 0.9, -1, `VANTA`, `NO LIMITS`, `#dba5ff`],
                  ];
      for (let [t, n, r, i, s] of l) {
        let c = S.direction === `reverse`,
          l = c && !this.isLunar ? F - t : t,
          u = (c && !this.isLunar ? -n : n) * (j(l) + 8);
        (this.box(1.2, 8, 1.3, e, P(l + 0.8, u, 4), a(l)),
          o(l, u, 9, r, c ? `REVERSE CIRCUIT / VECTOR` : i, s));
      }
      for (let r of Se) {
        let s = r.from * F,
          c = r.to * F;
        if (r.glass) {
          o(
            s - 0.5,
            0,
            19.8,
            this.isLunar
              ? `ETERNAL LIGHT BIODOME`
              : this.isMetropolis
                ? `THE AURELIAN`
                : `MIRAGE GLASSWAY`,
            this.isLunar
              ? `SHACKLETON / THROUGH THE GARDENS`
              : this.isMetropolis
                ? `GRAND PRIX SUITES / 88 M ABOVE THE GRID`
                : `SIROCCO / ABOVE THE PALMS`,
            this.isLunar
              ? `#7cf2b4`
              : this.isMetropolis
                ? `#e8c27a`
                : `#6fe6ff`,
            27,
          );
          continue;
        }
        if (this.lunar) {
          let { rock: r, rings: i } = Ou(s, c),
            a = new N(r, this.lunar.terrainMaterial);
          ((a.name = `Sverdrup lava tube`),
            (a.castShadow = a.receiveShadow = !0));
          let o = new N(
            i,
            new we({
              name: `Lava tube ring lights`,
              color: new _(`#ffc27a`).multiplyScalar(2.4),
              side: 2,
            }),
          );
          o.name = `Lava tube ring lights`;
          let l = ku(s, c),
            u = t.clone();
          u.side = 2;
          let d = new N(l.liner, u);
          ((d.name = `Lava tube liners`),
            (d.castShadow = d.receiveShadow = !0));
          let f = new N(l.collar, e);
          ((f.name = `Lava tube collars`),
            (f.castShadow = f.receiveShadow = !0));
          let p = new N(l.lights, o.material);
          ((p.name = `Lava tube mouth lights`), this.scene.add(a, o, d, f, p));
          for (let e of [-1, 1])
            this.addStatic(
              cr(
                s,
                c,
                (t) => e * (j(t) - 0.9) - 0.12,
                (t) => e * (j(t) - 0.9) + 0.12,
                0.085,
                2,
              ),
              n,
            );
        } else {
          this.addStatic(
            cr(
              s,
              c,
              (e) => -j(e) - 1,
              (e) => j(e) + 1,
              12,
              2,
            ),
            i,
          );
          for (let e of [-1, 1])
            (this.addStatic(d(s, c, e, 2.6, 12, 0.85), i),
              this.addStatic(d(s, c, e, 5.9, 6.12, 0.82), n),
              this.addStatic(
                cr(
                  s,
                  c,
                  (t) => e * (j(t) - 0.9) - 0.12,
                  (t) => e * (j(t) - 0.9) + 0.12,
                  0.085,
                  2,
                ),
                n,
              ));
          for (let r = s; r <= c; r += 10) {
            let i = a(r),
              o = j(r);
            for (let t of [-1, 1])
              this.box(0.55, 11, 0.85, e, P(r, t * (o + 0.2), 6), i);
            this.box(o * 2 + 1, 0.7, 0.85, t, P(r, 0, 11.6), i);
            let c =
              this.nightEnvironment && Math.floor((r - s) / 10) % 3 == 0
                ? this.nightEnvironment.pulseViolet
                : n;
            this.box(o * 1.5, 0.11, 0.65, c, P(r, 0, 11.2), i);
          }
        }
        let l = this.lunar ? s - 30 : s - 7,
          u = j(l),
          f = a(l);
        for (let t of [-1, 1])
          this.box(1.4, 14, 1.8, e, P(l, t * (u + 1.5), 7), f);
        (this.box(u * 2 + 4, 1.1, 1.8, t, P(l, 0, 12.8), f),
          o(
            l,
            0,
            14,
            this.isLunar
              ? `SVERDRUP LAVA TUBE`
              : this.isMetropolis
                ? `CROWN UNDERPASS`
                : this.isDesert
                  ? `SANDWORM TUNNEL`
                  : this.isNight
                    ? r === Se[0]
                      ? `EXCHANGE GATE`
                      : `PULSE TUNNEL`
                    : `ION TUNNEL`,
            this.isLunar
              ? `BASALT BORE / 3.8 BILLION YEARS OLD`
              : this.isMetropolis
                ? `BENEATH THE GRID / MERIDIAN`
                : this.isDesert
                  ? `LAGOON RETURN / BENEATH THE DUNES`
                  : this.isNight
                    ? r === Se[0]
                      ? `SKYLINE RISE / THROUGH THE ARCOLOGY`
                      : `NOCTURNE TRANSIT / MUSIC IN MOTION`
                    : `SOLSTICE TRANSIT / SECTOR 02`,
            this.isLunar
              ? `#ff9a5c`
              : this.isMetropolis
                ? `#ff6b29`
                : this.isDesert
                  ? `#ffb65c`
                  : this.isNight
                    ? `#b59aff`
                    : `#56e7ff`,
            27,
          ));
      }
      let u = aC(512, 128, (e) => {
        ((e.fillStyle = `#091d30`),
          e.fillRect(0, 0, 512, 128),
          (e.fillStyle = `#ff9a49`));
        for (let t = 0; t < 512; t += 100)
          (e.beginPath(),
            e.moveTo(t + 14, 10),
            e.lineTo(t + 58, 10),
            e.lineTo(t + 96, 64),
            e.lineTo(t + 58, 118),
            e.lineTo(t + 14, 118),
            e.lineTo(t + 54, 64),
            e.fill());
      });
      this.textures.push(u);
      let f = Ca(`chevrons`, u, this.isNight ? `night` : `day`, { side: 2 }),
        p = [];
      for (let t = 470; t < F; t += 30) {
        let n = A(t);
        if (Math.abs(n.curvature) < 0.003 || c(t) || c(t + 10)) continue;
        let i = -Math.sign(n.curvature),
          o = a(t);
        for (let n = 0; n < 4; n++) {
          let a = t + n * 3;
          this.addStatic(
            cr(
              a,
              a + 1.4,
              Math.min(i * (j(a) - 2.1), i * (j(a) - 0.4)),
              Math.max(i * (j(a) - 2.1), i * (j(a) - 0.4)),
              0.055,
              1,
            ),
            n % 2 ? e : r,
          );
        }
        if (Math.round(t / 30) % 3 != 0) continue;
        let s = new Je();
        (s.position.copy(P(t, i * (j(t) + 0.7), 4.5)),
          s.quaternion.copy(o),
          s.rotateY(Math.PI),
          s.updateMatrix());
        let l = new rt(10, 2.5);
        if (n.curvature > 0) {
          let e = l.getAttribute(`uv`);
          for (let t = 0; t < e.count; t++) e.setX(t, 1 - e.getX(t));
        }
        p.push(l.applyMatrix4(s.matrix));
      }
      let m = p.length ? ur(p) : null;
      if ((p.forEach((e) => e.dispose()), m)) {
        let e = new N(m, f);
        ((e.name = `Chevron warning boards`), this.scene.add(e));
      }
      if (this.scenery === `port`)
        for (let r = F * 0.595; r < F * 0.7; r += 36) {
          let i = a(r),
            o = j(r);
          for (let t of [-1, 1]) {
            let n = new ir(1.4, 23, 1.8);
            (n.rotateZ(t * 0.19),
              this.addStatic(n, e, P(r, t * (o + 2.8), 8), i));
          }
          (this.box(o * 2 + 1, 1, 1.8, e, P(r, 0, 19.2), i),
            this.box(o * 1.7, 0.14, 1, n, P(r, 0, 18.6), i),
            this.box(o * 2 + 6, 2.5, 2.2, t, P(r, 0, -2.4), i));
        }
    }
    updateEffects(e) {
      let t = this.sim,
        n = A(t.distance);
      (t.collisionSerial !== this.lastCollisionSerial &&
        ((this.lastCollisionSerial = t.collisionSerial),
        t.impact > 0 &&
          t.mode === `racing` &&
          this.impacts.emit({
            position: this.contactPoint
              .copy(this.player.group.position)
              .addScaledVector(n.right, t.contactSide * 2.4),
            surface: `metal`,
            direction: n.tangent,
            normal: this.contactNormal
              .copy(n.right)
              .multiplyScalar(-t.contactSide),
            strength: t.impact,
            count: Math.round(16 + 24 * t.impact),
          })),
        this.player.group.updateMatrixWorld());
      let r = t.mode === `racing` || t.mode === `finished`;
      (t.speed < 15 || !r || e > 0.2 || t.protection > 0) &&
        (this.trailHistory = [[], []]);
      let i = 0;
      for (let n = 0; n < 2; n++) {
        let r = this.trailHistory[n],
          a = this.player.engines[n]
            .clone()
            .applyMatrix4(this.player.group.matrixWorld);
        (r.length &&
          r[0].distanceTo(a) > Math.max(20, t.speed * e * 3) &&
          (r.length = 0),
          (!r.length || r[0].distanceTo(a) > 0.5) && r.unshift(a),
          r.splice(t.boostActive ? 22 : 7));
        for (let e = 1; e < r.length; e++)
          (r[e - 1].toArray(this.trailPositions, i),
            (i += 3),
            r[e].toArray(this.trailPositions, i),
            (i += 3));
      }
      (this.trailGeometry.setDrawRange(0, i / 3),
        (this.trailGeometry.attributes.position.needsUpdate = !0),
        (this.trailMesh.visible = t.speed > 25 && r));
    }
    resize() {
      let { width: e, height: t } = this.host.getBoundingClientRect();
      if (e <= 0 || t <= 0) return;
      ((this.camera.aspect = e / Math.max(1, t)),
        this.camera.updateProjectionMatrix());
      let n = tt(e, t, devicePixelRatio, this.graphics.effective.resolution);
      Ii(this.renderer, e, t, n);
    }
    setQuality() {
      let e = this.graphics.effective.preset === `low` ? `performance` : `high`;
      (this.sim.settings.quality !== e &&
        this.graphics.set(
          Xe(this.sim.settings.quality === `performance` ? `low` : `high`),
        ),
        this.applyGraphics());
    }
    setGraphics(e) {
      (this.graphics.set(e), this.applyGraphics());
    }
    patchGraphics(e) {
      (this.graphics.patch(e), this.applyGraphics());
    }
    applyGraphics() {
      let e = this.graphics.effective,
        t = this.lighting.shadows.quality !== e.shadows.quality,
        n = this.lighting.shadows.setResolution(e.shadows.mapSize);
      if (
        (this.lighting.shadows.setQuality(e.shadows.quality),
        (this.renderer.shadowMap.enabled = e.shadows.quality !== `off`),
        (n || t) && this.rendererReady)
      ) {
        let t = new Set();
        this.scene.traverse((e) => {
          let n = e.material;
          if (n) for (let e of Array.isArray(n) ? n : [n]) t.add(e);
        });
        for (let e of t) (e.dispose(), (e.needsUpdate = !0));
        this.post &&=
          (this.post.dispose(),
          new IS(
            this.renderer,
            this.scene,
            this.camera,
            this.atmosphere,
            this.lighting.sun,
            this.lighting.shadows,
            e,
            this.isDesert
              ? yS.sunset
              : this.isMetropolis
                ? yS.metropolis
                : yS.day,
          ));
      }
      (this.post?.applyGraphics(e),
        this.reflections?.setQuality(e.reflections.mode === `local`),
        this.reflections?.setIntensity(e.reflections.intensity),
        (this.atmosphere.heightEnabled.value = +!!e.atmosphere.heightFog),
        (this.atmosphere.distanceEnabled.value = +!!e.atmosphere.distanceFog),
        (this.impacts.density = e.particles.impactDensity),
        (this.impacts.group.visible = e.particles.impactDensity > 0),
        this.applyTextureFiltering(),
        this.resize(),
        this.useRenderContext(),
        this.performance.reset());
    }
    applyTextureFiltering() {
      if (!this.rendererReady) return;
      let e = this.graphics.effective.textureFiltering.anisotropy,
        t = this.renderer.getMaxAnisotropy(),
        n = (n) => {
          if (n.isRenderTargetTexture) return;
          this.authoredFiltering.has(n) ||
            this.authoredFiltering.set(n, n.anisotropy);
          let r = e === 8 ? this.authoredFiltering.get(n) : e,
            i = Math.min(r, t);
          n.anisotropy !== i && ((n.anisotropy = i), (n.needsUpdate = !0));
        };
      (this.scene.traverse((e) => {
        let t = e.material;
        if (t)
          for (let e of Array.isArray(t) ? t : [t])
            for (let t of Object.values(e)) t instanceof Pt && n(t);
      }),
        this.textures.forEach(n));
    }
    setAmbientOcclusion(e) {
      this.patchGraphics({ ambientOcclusion: e });
    }
    setAtmosphere(e) {
      (this.atmosphere.apply(e),
        e.SUN_SCATTERING_INTENSITY !== void 0 &&
          this.patchGraphics({
            atmosphere: { scatteringIntensity: e.SUN_SCATTERING_INTENSITY },
          }));
    }
    setReflectionIntensity(e) {
      this.patchGraphics({ reflections: { intensity: e } });
    }
    useRenderContext() {
      this.renderer.contextNode =
        this.post &&
        this.graphics.effective.ambientOcclusion.quality !== `off` &&
        this.graphics.effective.ambientOcclusion.intensity > 0
          ? this.post.ambientOcclusion.context
          : this.defaultContext;
    }
    setShadowQuality(e) {
      this.patchGraphics({ shadows: { quality: e } });
    }
    placeShip(
      e,
      t,
      n,
      r,
      i,
      a,
      o = !1,
      s = 0,
      l = 1.05,
      u = 0,
      d = 0,
      f = 0,
      p = 0,
    ) {
      let m = e.recovery.update(p, this.reducedMotion.matches);
      ((f += m.lift), (u += m.pitch));
      let h = A(t),
        g = new Ot().setFromRotationMatrix(
          new M().makeBasis(h.right, h.up, h.tangent),
        );
      (e.group.position
        .copy(h.position)
        .addScaledVector(h.right, n)
        .addScaledVector(h.up, l + f),
        e.group.quaternion.copy(g),
        e.group.rotateY(s),
        e.group.rotateZ(r),
        e.group.rotateX(u),
        e.group.scale.setScalar(m.scale),
        e.recovery.group.position.copy(e.group.position),
        e.recovery.group.quaternion.copy(g),
        e.recovery.group.rotateY(s),
        (e.recovery.group.visible = e.group.visible && m.active),
        e.brakes.forEach((e, t) => {
          let n = t === 0 ? d < 0 : d > 0;
          ((e.rotation.x = e.userData.restX + (n ? e.userData.hingeAngle : 0)),
            (e.position.y = e.userData.restY + (n ? e.userData.lift : 0)));
        }));
      let _ = w(t),
        v = l + f - _;
      (e.shadow.position
        .copy(h.position)
        .addScaledVector(h.right, n)
        .addScaledVector(h.up, 0.07 + _),
        e.shadow.quaternion.copy(g),
        e.shadow.rotateY(s),
        e.shadow.rotateX(-Math.PI / 2),
        e.shadow.scale.setScalar(1 + (v - 1.05) * 0.12),
        (e.shadow.visible = e.glow.visible = e.group.visible && !c(t) && v < 9),
        e.glow.position.copy(e.shadow.position).addScaledVector(h.up, 0.025),
        e.glow.quaternion.copy(e.shadow.quaternion));
      let y = 0.35 + (a / 150) * 0.9 + (typeof o == `number` ? o : o ? 0.7 : 0);
      e.flames.forEach((t, n) => {
        t.scale.y = y * (0.92 + Math.sin(i * 39 + n) * 0.08);
        let r = e.engines[Math.floor(n / 2)];
        t.position.set(r.x, r.y, r.z - (n % 2 ? 1.4 : 2) * t.scale.y);
      });
    }
    setMusicEnergy(e) {
      this.nightEnvironment?.setMusicEnergy(e);
    }
    update(e) {
      if (
        ((e = Number.isFinite(e) ? Math.max(0, e) : 0),
        this.garage?.active && this.sim.mode === `menu`)
      ) {
        (this.garage.resize(this.camera.aspect),
          this.garage.update(e, this.reducedMotion.matches));
        return;
      }
      if (this.lobby?.active) {
        (this.lobby.resize(this.camera.aspect),
          this.lobby.update(e, this.reducedMotion.matches));
        return;
      }
      let t = this.sim.networkPose
        ? Object.assign(this.presentationView, this.sim.networkPose)
        : this.sim;
      this.boostPads.visible = !this.sim.modifiers.disableBoostPads;
      let n = t.mode === `paused` ? 0 : e,
        r = this.graphics.runtime;
      this.time.value = t.clock;
      let i = Js(t);
      if (
        ((this.player.group.visible = !i),
        this.placeShip(
          this.player,
          t.distance,
          t.lane,
          t.roll,
          t.clock,
          t.speed,
          t.turboTime > 0 ? 1.35 : t.boostActive,
          t.heading + t.slideYaw,
          t.hoverHeight,
          t.pitch,
          t.airbrake,
          Zs(t),
          t.protection,
        ),
        i &&
          (this.player.recovery.group.visible =
            this.player.recovery.pose.active),
        this.player.animation &&
          Sc(
            this.player.animation,
            {
              speed: t.speed / 180,
              throttle: t.throttle,
              steer: t.steer,
              airbrake: t.airbrake,
              boost: t.turboTime > 0 ? 1 : t.boostActive ? 0.6 : 0,
              time: t.clock,
            },
            n,
          ),
        this.rivals.forEach((e, r) => {
          let i = t.rivals[r];
          if (
            ((e.group.visible = e.shadow.visible = e.glow.visible = !!i), !i)
          ) {
            e.recovery.update(0, this.reducedMotion.matches);
            return;
          }
          let a = i;
          (this.setRivalModel(r, i.shipId, i.skin),
            this.placeShip(
              e,
              i.distance,
              i.lane,
              a.roll ?? Math.sin(t.clock + r) * 0.15,
              t.clock + r,
              i.speed,
              i.turboTime > 0 ? 1.35 : i.boostActive,
              i.heading + (a.slideYaw ?? 0),
              a.hoverHeight ?? 1.05,
              a.pitch ?? 0,
              a.airbrake ?? 0,
              Zs(i),
              i.protection,
            ),
            e.animation &&
              Sc(
                e.animation,
                {
                  speed: i.speed / 180,
                  throttle: Math.min(1, i.speed / 100),
                  steer: i.heading,
                  airbrake: 0,
                  boost: i.turboTime > 0 ? 1 : i.boostActive ? 0.6 : 0,
                  time: t.clock + r,
                },
                n,
              ));
        }),
        this.portLife?.update(
          n,
          t.clock,
          t.distance,
          r.detailedEnvironment,
          this.reducedMotion.matches,
        ),
        this.nightEnvironment?.update(n, this.reducedMotion.matches),
        this.siroccoScenery?.update(t.clock, this.reducedMotion.matches),
        this.shackletonScenery?.update(n, t.clock, this.reducedMotion.matches),
        this.meridianScenery && this.updateMeridian(t, n),
        this.launches?.update(n, this.camera, this.reducedMotion.matches),
        this.orbField.update(t.kind === `orbs` ? t.orbs : null, t.clock),
        this.updateShields(n),
        this.nightEnvironment &&
          this.nocturneCity?.update(
            this.nightEnvironment.energy,
            t.clock,
            this.reducedMotion.matches,
          ),
        this.updateEffects(n),
        this.cameraRig.update(
          this.camera,
          this.reducedMotion.matches
            ? {
                mode: t.mode,
                distance: t.distance,
                lane: t.lane,
                heading: t.heading,
                roll: t.roll,
                hoverHeight: t.hoverHeight,
                airHeight: t.airHeight,
                airTime: t.airTime,
                slideYaw: t.slideYaw,
                pitch: t.pitch,
                protection: t.protection,
                speed: t.speed,
                boostActive: t.boostActive,
                clock: t.clock,
                impact: 0,
                settings: t.settings,
                flagAt: t.flagAt,
              }
            : t,
          e,
          this.reducedMotion.matches,
        ),
        this.post)
      ) {
        (t.mode === `countdown` || t.mode === `menu`) && this.post.reset();
        let e =
          r.speedBlur && t.mode === `racing` && !this.reducedMotion.matches
            ? kS(t.speed, t.boostActive, t.turboTime > 0)
            : 0;
        (this.camera.updateMatrixWorld(),
          this.post.update(
            n,
            e,
            P(t.distance + 160, t.lane * 0.5, 1.5),
            this.camera,
          ));
      }
      (this.combatView.update(n, this.camera, r.impactDensity),
        this.camera.updateMatrixWorld(),
        this.meridianScenery?.cull(this.camera),
        (this.impacts.density = r.impactDensity),
        this.impacts.update(n, this.camera),
        (this.renderer.toneMappingExposure =
          Ri.exposure *
          this.cameraRig.menuLight *
          this.lighting.update(
            t,
            this.player.group.position,
            n,
            r.lightingDetail,
            this.camera,
            this.combatView.emitters,
          )),
        this.lunarSky?.update(
          n,
          this.camera,
          this.renderer.domElement.height,
          this.reducedMotion.matches,
        ),
        this.ambientParticles.update(
          n,
          this.camera,
          this.renderer.domElement.height,
          r.sunShadows,
          this.reducedMotion.matches,
          t.distance,
          r.ambientCount,
        ));
    }
    updateMeridian(e, t) {
      let n = this.reducedMotion.matches,
        r = e.mode === `racing` || e.mode === `paused`,
        i = e.mode === `finished`,
        a = e.laps,
        o = Math.min(e.lap, a),
        s = e.kind !== `timed-lap` && (r || i) && o >= a,
        c = this.meridianView;
      ((c.distance = e.distance),
        (c.lap = o),
        (c.laps = a),
        c.position.copy(this.player.group.position),
        (c.finished = i),
        this.meridian?.update(t, n),
        this.meridianLife?.update(t, e.clock, c, n),
        this.meridianDressing?.update(t, e.clock, n));
      let l = -1;
      for (let t = 0; t < e.rivals.length; t++)
        (l < 0 || e.rivals[t].distance > e.rivals[l].distance) && (l = t);
      let u = l >= 0 ? e.rivals[l] : null,
        d = !u || e.position === 1;
      this.meridianScenery?.update(t, e.clock, {
        finalLap: s,
        reducedMotion: n,
        race: {
          lap: o,
          laps: a,
          position: e.position,
          racers: e.rivals.length + 1,
          leader: d ? `YOU` : u.name,
          leaderTeam: d ? this.playerAsset?.id : u.shipId,
        },
        countdown: e.mode === `countdown` ? e.countdown : void 0,
      });
    }
    visualSnapshot() {
      let e = this.player.animation;
      return {
        garage: this.garage?.snapshot() ?? { active: !1 },
        lobby: this.lobby?.snapshot() ?? { active: !1 },
        shipAnimation: {
          recovery: this.player.recovery.pose,
          mechanisms: e ? e.turbines.length + e.cooling.length : 0,
          phase: +(e?.phase ?? 0).toFixed(4),
          heat: +(e?.heat ?? 0).toFixed(4),
          coolingAngles: e?.coolingAngles.map((e) => +e.toFixed(4)) ?? [0, 0],
        },
        environment: this.isNight ? `night` : `day`,
        scenery: this.scenery,
        desert: this.desert
          ? {
              ...this.desert.info,
              dressing: this.desertDressing?.group.children.length ?? 0,
            }
          : null,
        configuration: this.graphics.snapshot(),
        performance: this.performance.snapshot(),
        atmosphere: this.atmosphere.snapshot(),
        reflections: this.reflections?.snapshot() ?? { mode: `hdr` },
        impactParticles: this.impacts.snapshot(),
        ambientParticles: this.ambientParticles.snapshot(),
        nightCity: this.nightEnvironment
          ? {
              ...this.nightEnvironment.snapshot(),
              architecture: this.nocturneCity?.info ?? { loaded: !1 },
            }
          : null,
        portLife: this.portLife?.info ?? { loaded: !1 },
        lunarSky: this.lunarSky?.snapshot() ?? null,
        lunarTerrain: this.lunar?.info ?? null,
        meridian: this.meridian
          ? {
              ground: this.meridian.info,
              layout: this.meridianLayoutInfo,
              life: this.meridianLife?.info ?? null,
              dressing: this.meridianDressing?.info ?? null,
            }
          : null,
        lighting: this.lighting.snapshot(),
        environmentMap: {
          ...this.environmentInfo,
          file: this.environmentMap.url,
          title: this.environmentMap.title,
          intensity: +this.lighting.environmentIntensity.toFixed(3),
          rotation: this.environmentMap.rotation,
          maxRadiance: this.environmentMap.maxRadiance,
        },
        colour: Ei(this.renderer, this.scene),
        graphics: {
          ...this.graphicsCompatibility,
          backend: this.backend,
          initialization: ki(this.renderer),
          failure: this.graphicsFailure,
          failureAt: this.graphicsFailureAt,
          lastError: this.graphicsError,
        },
        renderResolution: {
          width: this.renderer.domElement.width,
          height: this.renderer.domElement.height,
          maxPixels: this.graphics.effective.resolution.maxPixels,
        },
        postprocessing:
          PS(this.graphics.effective) && this.post
            ? this.post.snapshot()
            : {
                antialiasing: `msaa-4x`,
                toneMapping: `aces-filmic-graded`,
                temporalHistory: !1,
              },
      };
    }
    getGraphicsFailure() {
      return this.disposed ? null : this.graphicsFailure;
    }
    render() {
      if (this.disposed) return;
      if (this.graphicsFailure) throw Error(this.graphicsFailure);
      if (this.garage?.active && this.sim.mode === `menu`) {
        let e = this.renderer.toneMappingExposure,
          t = this.renderer.toneMapping;
        (this.renderer.info.reset(),
          (this.renderer.contextNode = this.defaultContext),
          (this.renderer.toneMapping = 6),
          (this.renderer.toneMappingExposure = 1.1));
        try {
          this.renderer.render(this.garage.scene, this.garage.camera);
        } finally {
          ((this.renderer.toneMapping = t),
            (this.renderer.toneMappingExposure = e));
        }
        return;
      }
      if (this.lobby?.active) {
        let e = this.renderer.toneMappingExposure,
          t = this.renderer.toneMapping;
        (this.renderer.info.reset(),
          (this.renderer.contextNode = this.defaultContext),
          (this.renderer.toneMapping = 6),
          (this.renderer.toneMappingExposure = 1.15 * this.lobby.reveal));
        try {
          this.lobby.pipeline
            ? this.lobby.pipeline.render()
            : this.renderer.render(this.lobby.scene, this.lobby.camera);
        } finally {
          ((this.renderer.toneMapping = t),
            (this.renderer.toneMappingExposure = e));
        }
        return;
      }
      let e = this.performance.enabled ? performance.now() : 0,
        t =
          this.performance.enabled &&
          this.performance.beginGPU(this.renderer, e);
      if (
        (this.renderer.info.reset(),
        this.useRenderContext(),
        uc(this.scene, this.renderScenePasses),
        this.performance.enabled &&
          (this.performance.endGPU(this.renderer, e, t),
          this.performance.record(
            e,
            performance.now() - e,
            this.renderer.info.render.drawCalls,
            this.renderer.info.render.triangles,
            this.renderer.domElement.width,
            this.renderer.domElement.height,
          )),
        this.graphicsFailure)
      )
        throw Error(this.graphicsFailure);
    }
    updateShields(e) {
      let t = this.sim,
        n = t.combat;
      (this.shieldSource !== n || this.shieldSerial > n.serial) &&
        ((this.shieldSource = n), (this.shieldSerial = n.serial));
      let r = [this.player, ...this.rivals],
        i = r.map((e, r) => {
          if (r === 0) return t.combatId;
          let i = t.rivals[r - 1];
          return i && n.pilots[i.team] ? i.team : `cpu${r - 1}`;
        }),
        a = [`racing`, `paused`, `countdown`].includes(t.mode);
      r.forEach((t, r) => {
        let o = this.shields[r],
          s = a ? (n.pilots[i[r]]?.shield ?? 0) : 0,
          c = s > 0;
        if (c && !this.shieldUp[r]) {
          let e = t.group.children.find((e) => e.name.includes(`Blender`));
          if (e) {
            let n = Gb(e, t.group);
            o.fit(n.radii, n.centre);
          }
        }
        ((this.shieldUp[r] = c), o.update(e, s, 5));
      });
      for (let e of n.events) {
        if (
          e.id <= this.shieldSerial ||
          ((this.shieldSerial = e.id),
          e.kind !== `block` || n.clock - e.time > 0.35)
        )
          continue;
        let t = i.indexOf(e.owner);
        t >= 0 && this.shields[t].impact(P(e.distance, e.lane, 1.5));
      }
    }
    dispose() {
      if (!this.disposed) {
        ((this.disposed = !0),
          this.ghost.dispose(),
          this.performance.setEnabled(!1),
          Jx(this.renderer),
          this.stopWatchingPixelRatio(),
          this.reflections?.dispose(),
          this.garage?.dispose(),
          this.lobby?.dispose(),
          this.bayLoaded?.dispose(),
          this.combatView.dispose(),
          this.impacts.dispose(),
          this.ambientParticles.dispose(),
          this.desertDressing?.dispose(),
          this.desert?.dispose(),
          this.lunarSky?.dispose(),
          this.lunar?.dispose(),
          this.meridian?.dispose(),
          this.orbField.dispose(),
          this.meridianLife?.dispose(),
          this.meridianScenery?.dispose(),
          this.meridianDressing?.dispose(),
          this.shackletonScenery?.dispose(),
          this.launches?.dispose(),
          this.floodlights?.dispose());
        for (let e of this.shields) e.dispose();
        for (let e of [this.player, ...this.rivals]) e.recovery.dispose();
        this.portLife &&
          (this.scene.remove(this.portLife.group), this.portLife.dispose());
        for (let e of this.fleetTemplates.values()) this.scene.add(e.scene);
        (Dc(this.scene),
          (this.rivalMaterialDisposers.length = 0),
          this.fleetTemplates.clear(),
          this.textures.forEach((e) => e.dispose()),
          this.environmentTarget?.dispose(),
          this.post?.dispose(),
          this.lighting.dispose(),
          gi(this.renderer),
          this.renderer.domElement.remove(),
          (this.renderer.onDeviceLost = () => {}),
          (this.renderer.onError = () => {}));
      }
    }
  },
  lC = {
    turbo: 1.15,
    mines: 0.32,
    rockets: 0.58,
    missile: 0.7,
    cannon: 0.105,
    impact: 0.68,
    "cannon-hit": 0.13,
    absorb: 0.65,
    pickup: 0.22,
    lock: 0.24,
    recover: 0.85,
    shield: 0.95,
    "shield-block": 0.42,
  },
  uC = Math.PI * 2,
  dC = (e, t) => Math.sin(uC * e * t),
  fC = (e, t) => Math.exp(-Math.max(0, e) * t),
  pC = (e, t, n) =>
    e >= t && e < t + n ? Math.sin((Math.PI * (e - t)) / n) : 0;
