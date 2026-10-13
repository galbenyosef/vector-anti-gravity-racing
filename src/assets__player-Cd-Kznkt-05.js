// assets__player-Cd-Kznkt 05 — math
// Lines 1434-3006 of readable/assets__player-Cd-Kznkt.pretty.js (statement-aligned).
var U = [`kestrel`, `manta`, `talon`, `monarch`, `vesper`],
  W = [
    `solstice-port-mk3`,
    `nocturne-exchange`,
    `sirocco-oasis`,
    `shackleton-rim`,
    `meridian-grand-prix`,
  ],
  bt = [`missile`, `rockets`, `mines`, `cannon`, `shield`],
  G = (e) => Math.min(1, Math.max(0, e)),
  K = (e, t, n) => {
    let r = G((n - e) / (t - e));
    return r * r * (3 - 2 * r);
  },
  q = (e) => 1 - (1 - G(e)) ** 3,
  J = (e) => G(e) ** 3,
  Y = (e) => K(0, 1, e),
  X = (e, t = 1.7) => {
    let n = G(e) - 1;
    return 1 + n * n * ((t + 1) * n + t);
  },
  xt = (e, t = 6) => (e < 0 ? 0 : Math.exp(-(e - Math.floor(e)) * t)),
  Z = (e, t, n = 4) => (e < t ? 0 : Math.exp(-(e - t) * n)),
  Q = (e) => new o(e),
  $ = (e) => ({ value: e }),
  St = {
    kestrel: `#ffc84a`,
    manta: `#1f48ff`,
    talon: `#ff9b2e`,
    monarch: `#5a1fd0`,
    vesper: `#d9783c`,
  },
  Ct = {
    "solstice-port-mk3": i,
    "nocturne-exchange": oe,
    "sirocco-oasis": x,
    "shackleton-rim": _e,
    "meridian-grand-prix": ve,
  },
  wt = {
    "solstice-port-mk3": [`#ff8a3a`, `#5ff3ff`, `#04121f`, `#1c0b05`],
    "nocturne-exchange": [`#a35cff`, `#4ff6ff`, `#05010f`, `#14021a`],
    "sirocco-oasis": [`#ffae3a`, `#ff4fa3`, `#1c0614`, `#2b1003`],
    "shackleton-rim": [`#bcd8ff`, `#ffffff`, `#000003`, `#0a0b12`],
    "meridian-grand-prix": [`#ffd25a`, `#3ff0c8`, `#05101c`, `#1d1406`],
  },
  Tt = {
    missile: `#ff6a2e`,
    rockets: `#ffb347`,
    mines: `#ff3d5a`,
    cannon: `#5fe6ff`,
    shield: `#4d8dff`,
  },
  Et = [
    `VECTOR SYSTEMS  ·  AG-OS 21.86`,
    `(C) 2186 ANTI-GRAVITY RACING LEAGUE`,
    ``,
  ],
  Dt = [
    [0.12, `FLIGHT MEMORY ............ 4096K OK`],
    [0.46, `ANTI-GRAVITY COILS ....... ONLINE`],
    [0.8, `CIRCUITS ................. 5 FOUND`],
    [1.14, `CRAFT .................... 5 READY`],
    [1.48, `AIRBRAKES ................ CALIBRATED`],
    [1.82, ``],
    [1.95, `> RUN VECTOR`],
  ],
  Ot = 120,
  kt = `VECTOR  ·  ANTI-GRAVITY RACING  ·  FIVE CRAFT  ·  FIVE CIRCUITS  ·  ONE LEAGUE  ·  AIRBRAKES DOWN, NOSE IN  ·  GREETINGS TO EVERY PILOT ON THE GRID  ·`,
  At = class {
    constructor(t, r) {
      ((this.assets = t),
        (this.options = r),
        (this.world = new e()),
        (this.camera = new de(50, 16 / 9, 0.1, 9e3)),
        (this.overlay = new e()),
        (this.ortho = new u(-1, 1, 1, -1, -10, 10)),
        (this.background = new e()),
        (this.shared = {
          uTime: $(0),
          uBeat: $(0),
          uKick: $(0),
          uBass: $(0),
          uHigh: $(0),
          uLocal: $(0),
          uAspect: $(16 / 9),
        }),
        (this.aspect = 16 / 9),
        (this.pixel = 500),
        (this.time = 0),
        (this.beat = 0),
        (this.lastBeat = -10),
        (this.disposables = []),
        (this.texts = []),
        (this.terminal = document.createElement(`canvas`)),
        (this.terminalText = ``),
        (this.hemi = new ce(8952319, 525328, 0.4)),
        (this.key = new d(16777215, 2.5)),
        (this.rim = new d(6737151, 2)),
        (this.rigs = new Map()),
        (this.circuits = []),
        (this.weaponHolder = new k()),
        (this.medals = []),
        (this.t = {}),
        this.world.add(this.camera),
        this.world.add(
          this.hemi,
          this.key,
          this.rim,
          this.key.target,
          this.rim.target,
        ));
      let i = (e, t) =>
        this.track(
          new O({
            vertexShader: Re,
            fragmentShader: e,
            uniforms: { ...this.shared, ...t },
            depthTest: !1,
            depthWrite: !1,
          }),
        );
      ((this.terminal.width = 1280),
        (this.terminal.height = 720),
        (this.terminalTexture = this.track(new n(this.terminal))),
        (this.terminalTexture.minFilter = b),
        (this.terminalTexture.generateMipmaps = !1),
        (this.fx = {
          boot: i(
            `
${z}
uniform sampler2D tTerm;
void main() {
  vec2 p = screen();
  vec2 t = vec2(p.x / (2.0 * 1.7778) + 0.5, p.y * 0.5 + 0.5);
  float inside = step(0.0, t.x) * step(t.x, 1.0);
  float a = texture2D(tTerm, t).r * inside;
  vec3 col = vec3(0.006, 0.012, 0.016) + vec3(0.55, 1.0, 0.9) * a * 1.5;
  col *= 0.94 + 0.06 * sin(uTime * 113.0);
  col += (hash12(gl_FragCoord.xy + uTime) - 0.5) * 0.015;
  gl_FragColor = vec4(col, 1.0);
}`,
            { tTerm: $(this.terminalTexture) },
          ),
          copper: i(ze, {
            uOpen: $(0),
            uTravel: $(0),
            uSpread: $(0.7),
            uGain: $(1),
            uBar: $(
              [`#ff6536`, `#54deda`, `#ff4fa3`, `#d9b572`, `#7a5cff`].map((e) =>
                Q(e),
              ),
            ),
          }),
          space: i(He, {
            uTop: $(Q(`#020814`)),
            uBottom: $(Q(`#000000`)),
            uTravel: $(0),
            uStars: $(1),
          }),
          tunnel: i(Be, {
            uCenter: $(new s()),
            uTravel: $(0),
            uTwist: $(0),
            uTint: $(Q(`#29c6ff`)),
            uTint2: $(Q(`#ff7a2e`)),
          }),
          rollcall: i(Ve, {
            uEffect: $(0),
            uColor: $(Q(`#ffffff`)),
            uColor2: $(Q(`#ffffff`)),
          }),
        }),
        (this.backdrop = new _(this.track(new w(2, 2)), this.fx.boot)),
        (this.backdrop.frustumCulled = !1),
        this.background.add(this.backdrop),
        (this.glow = this.track(Nt())),
        (this.groups = {
          build: new k(),
          launch: new k(),
          circuits: new k(),
          arsenal: new k(),
          moon: new k(),
          finale: new k(),
        }));
      for (let e of Object.values(this.groups)) this.world.add(e);
      ((this.logo = new _(
        this.track(Fe()),
        this.track(
          new O({
            vertexShader: It,
            fragmentShader: Lt,
            uniforms: {
              uReveal: $(0),
              uFill: $(0),
              uWobble: $(0),
              uTime: $(0),
              uKick: $(0),
              uOpacity: $(1),
              uNeon: $(Q(`#3fe6ff`).multiplyScalar(1.4)),
              uMark: $(Q(`#ff6637`).multiplyScalar(1.6)),
            },
            transparent: !0,
            depthTest: !1,
            depthWrite: !1,
          }),
        ),
      )),
        (this.logo.frustumCulled = !1),
        this.overlay.add(this.logo));
      let o = this.track(
          new y({
            color: 16777215,
            metalness: 1,
            roughness: 0.12,
            envMapIntensity: 1.6,
          }),
        ),
        c = this.track(
          new y({
            color: 16738858,
            metalness: 0.85,
            roughness: 0.28,
            emissive: 16726544,
            emissiveIntensity: 0.25,
          }),
        );
      ((this.chrome = new _(this.track(Ie()), [o, c])),
        (this.chrome.frustumCulled = !1),
        this.camera.add(this.chrome),
        (this.shock = new _(
          this.track(new h(0.94, 1, 160)),
          this.track(
            new v({
              color: Q(`#9fe8ff`).multiplyScalar(2.5),
              transparent: !0,
              blending: 2,
              depthTest: !1,
              depthWrite: !1,
            }),
          ),
        )),
        this.overlay.add(this.shock),
        (this.grid = new _(
          this.track(new w(9e3, 9e3)),
          this.track(
            new O({
              vertexShader: Ue,
              fragmentShader: We,
              uniforms: {
                uLine: $(Q(`#0c5f86`)),
                uMajor: $(Q(`#33d6ff`)),
                uBase: $(Q(`#000206`)),
                uFog: $(Q(`#00040b`)),
                uCamera: $(new a()),
                uCell: $(2.5),
                uScroll: $(0),
                uFogDistance: $(60),
                uKick: $(0),
                uOpacity: $(1),
              },
            }),
          ),
        )),
        (this.grid.rotation.x = -Math.PI / 2),
        (this.grid.frustumCulled = !1),
        this.world.add(this.grid),
        (this.wireMaterial = this.track(jt(`#2bb8ff`, `#bff4ff`, 120))));
      let l = [];
      for (let e = 0; e < 360; e++) {
        let e = Math.random() * Math.PI * 2,
          t = 4 + Math.random() * 18,
          n = Math.random() * 220;
        l.push(e, t, n, 0, e, t, n, 1);
      }
      let f = this.track(new N());
      (f.setAttribute(`position`, new T(new Float32Array(720 * 3), 3)),
        f.setAttribute(`aSeed`, new T(l, 4)),
        (this.streaks = new P(
          f,
          this.track(
            new O({
              vertexShader: Rt,
              fragmentShader: zt,
              uniforms: {
                uTravel: $(0),
                uLength: $(8),
                uColor: $(Q(`#9fe9ff`)),
                uOpacity: $(1),
              },
              blending: 2,
              depthWrite: !1,
              transparent: !0,
            }),
          ),
        )),
        (this.streaks.frustumCulled = !1),
        this.groups.launch.add(this.streaks),
        (this.particles = new Ft(r.mobile ? 1600 : 4e3)),
        this.track(this.particles),
        this.world.add(this.particles.points),
        (this.dots = Pt(r.mobile ? 520 : 900)),
        this.track(this.dots.geometry),
        this.track(this.dots.material),
        this.groups.arsenal.add(this.dots, this.weaponHolder),
        (this.shield = new _(
          this.track(new E(1, 48, 32)),
          this.track(
            new O({
              vertexShader: et,
              fragmentShader: $e,
              uniforms: { uColor: $(Q(`#4d8dff`)), uTime: $(0), uPower: $(1) },
              blending: 2,
              transparent: !0,
              depthWrite: !1,
              side: 2,
            }),
          ),
        )),
        this.groups.arsenal.add(this.shield),
        (this.sky = new _(
          this.track(new E(4e3, 48, 24)),
          this.track(
            new O({
              vertexShader: Ge,
              fragmentShader: Ke,
              uniforms: {
                uTop: $(Q(`#0b0326`)),
                uHorizon: $(Q(`#ff2f8e`).multiplyScalar(0.55)),
                uSunTop: $(Q(`#ffe45c`)),
                uSunBottom: $(Q(`#ff2f9a`)),
                uMountain: $(Q(`#12052a`)),
                uRim: $(Q(`#3ff4ff`)),
                uSunDir: $(new a(0, 0.22, -1)),
                uSunSize: $(0.3),
                uTime: $(0),
                uSun: $(1),
                uMountains: $(1),
              },
              side: 1,
              depthWrite: !1,
            }),
          ),
        )),
        (this.sky.frustumCulled = !1),
        (this.sky.renderOrder = -10),
        this.groups.finale.add(this.sky),
        (this.halo = new j(
          this.track(
            new D({
              map: this.glow,
              color: Q(`#ffd27a`).multiplyScalar(2),
              blending: 2,
              depthWrite: !1,
              transparent: !0,
            }),
          ),
        )),
        this.camera.add(this.halo),
        this.createType());
    }
    track(e) {
      return (this.disposables.push(e), e);
    }
    attachAssets() {
      let e = this.assets;
      for (let t of Object.values(e.ships)) {
        if (!t || this.rigs.has(t.id)) continue;
        let e = this.track(
            new O({
              vertexShader: Ze,
              fragmentShader: Qe,
              uniforms: {
                uColor: $(Q(A(t.id).color).lerp(Q(`#38d8ff`), 0.45)),
                uTime: $(0),
                uPower: $(1),
              },
              blending: 2,
              transparent: !0,
              depthWrite: !1,
              side: 2,
            }),
          ),
          n = new k(),
          r = this.track(Mt());
        for (let i of t.engines) {
          let t = new _(r, e),
            a = new _(r, e);
          a.rotation.z = Math.PI / 2;
          let o = new k();
          (o.position.copy(i), o.add(t, a), n.add(o));
        }
        (t.scene.add(n),
          (t.scene.visible = !1),
          this.world.add(t.scene),
          this.rigs.set(t.id, { ship: t, flames: n, flame: e }),
          t.id === this.options.hero && this.createWireframe(t));
      }
      for (let [t, n] of Object.entries(e.weapons))
        n &&
          !n.parent &&
          ((n.name = t), (n.visible = !1), this.weaponHolder.add(n));
      if (
        (e.trophy &&
          !e.trophy.parent &&
          ((e.trophy.visible = !1), this.camera.add(e.trophy)),
        e.milkyWay &&
          !this.stars &&
          ((this.stars = new _(
            this.track(new E(5e3, 48, 24)),
            this.track(
              new v({
                map: e.milkyWay,
                color: new o(1.6, 1.6, 1.6),
                side: 1,
                depthWrite: !1,
              }),
            ),
          )),
          this.stars.rotation.set(0.5, 0.4, 0.75),
          (this.stars.frustumCulled = !1),
          this.groups.moon.add(this.stars)),
        e.regolith && !this.ground && this.createGround(e.regolith),
        e.earth &&
          e.earthData &&
          !this.earth &&
          ((this.earth = new _(
            this.track(new E(1, 96, 48)),
            this.track(
              new O({
                vertexShader: tt,
                fragmentShader: nt,
                uniforms: {
                  tAlbedo: $(e.earth),
                  tData: $(e.earthData),
                  uSun: $(new a(-0.85, 0.2, 0.5)),
                  uTime: $(0),
                },
              }),
            ),
          )),
          (this.earth.rotation.y = -1.9),
          this.groups.moon.add(this.earth)),
        e.medals.length && !this.medals.length)
      )
        for (let t = 0; t < 24; t++) {
          let n = new j(
            this.track(
              new D({
                map: e.medals[t % e.medals.length],
                transparent: !0,
                depthWrite: !1,
              }),
            ),
          );
          ((n.visible = !1), this.medals.push(n), this.camera.add(n));
        }
      this.circuits.length || this.createCircuits();
    }
    createWireframe(e) {
      let t = [],
        n = [],
        r = [];
      e.scene.updateMatrixWorld(!0);
      let i = e.scene.matrixWorld.clone().invert(),
        o = new a(),
        s = new a(),
        c = 1 / 0,
        l = -1 / 0,
        u = [];
      e.scene.traverse((e) => {
        if (!(e instanceof _)) return;
        let t = new ne(e.geometry, 26),
          n = i.clone().multiply(e.matrixWorld),
          r = t.getAttribute(`position`);
        for (let e = 0; e < r.count; e += 2)
          (o.fromBufferAttribute(r, e).applyMatrix4(n),
            s.fromBufferAttribute(r, e + 1).applyMatrix4(n),
            u.push([o.clone(), s.clone()]),
            (c = Math.min(c, o.z, s.z)),
            (l = Math.max(l, o.z, s.z)));
        t.dispose();
      });
      let d = this.options.mobile ? 6e3 : 16e3,
        f = Math.max(1, u.length / d);
      for (let e = 0; e < u.length; e += f) {
        let [i, o] = u[Math.floor(e)],
          s = G(
            ((l - (i.z + o.z) / 2) / (l - c || 1)) * 0.82 +
              Math.random() * 0.18,
          ),
          d = new a().randomDirection().multiplyScalar(10 + Math.random() * 26);
        (t.push(i.x, i.y, i.z, o.x, o.y, o.z),
          n.push(s, s),
          r.push(d.x, d.y, d.z, d.x, d.y, d.z));
      }
      let p = this.track(new N());
      (p.setAttribute(`position`, new T(t, 3)),
        p.setAttribute(`aAlong`, new T(n, 1)),
        p.setAttribute(`aScatter`, new T(r, 3)),
        (this.wire = new P(p, this.wireMaterial)),
        (this.wire.frustumCulled = !1),
        this.groups.build.add(this.wire));
    }
    createGround(e) {
      let t = 2400,
        n = this.options.mobile ? 110 : 180,
        r = this.track(new w(t, t, n, n));
      r.rotateX(-Math.PI / 2);
      let i = [],
        a = 7,
        o = () => (
          (a = (Math.imul(a, 1664525) + 1013904223) >>> 0),
          a / 4294967296
        );
      for (let e = 0; e < 140; e++) {
        let e = 6 + o() ** 3 * 90;
        i.push([(o() - 0.5) * t, (o() - 0.5) * t, e, 0.22 + o() * 0.18]);
      }
      i.push([-40, -70, 38, 0.3], [70, -160, 55, 0.28]);
      let s = r.getAttribute(`position`);
      for (let e = 0; e < s.count; e++) {
        let t = s.getX(e),
          n = s.getZ(e),
          r =
            Math.sin(t * 0.011) * Math.cos(n * 0.013) * 2.2 +
            Math.sin(t * 0.031 + n * 0.02) * 0.8;
        for (let [e, a, o, s] of i) {
          let i = Math.hypot(t - e, n - a) / o;
          i > 1.6 ||
            ((r += i < 1 ? -s * o * 0.35 * (1 - i * i) : 0),
            (r += s * o * 0.12 * Math.exp(-(((i - 1) / 0.18) ** 2))));
        }
        ((r *= K(8, 40, Math.hypot(t, n))), s.setY(e, r));
      }
      (r.computeVertexNormals(),
        e.repeat.set(160, 160),
        (this.ground = new _(
          r,
          this.track(
            new y({ map: e, color: 11841706, roughness: 0.97, metalness: 0 }),
          ),
        )),
        (this.ground.position.y = -1),
        this.groups.moon.add(this.ground));
    }
    createCircuits() {
      for (let e of W) {
        let t = Ct[e],
          [n, r] = wt[e],
          i = this.options.mobile ? 480 : 900,
          o = [],
          s = [],
          c = [];
        for (let e = 0; e < i; e++) {
          let n = (e / i) * t.length;
          (o.push(t.point(n)),
            s.push(t.point(n, -16 * 2.4)),
            c.push(t.point(n, 16 * 2.4)));
        }
        let l = new M().setFromPoints(o),
          u = l.getSize(new a()),
          d = l.getCenter(new a()),
          f = 66 / Math.max(u.x, u.z),
          p = (e) =>
            new a((e.x - d.x) * f, (e.y - l.min.y) * f * 1.7, (e.z - d.z) * f),
          m = o.map(p),
          h = [s.map(p), c.map(p)],
          g = { position: [], along: [] },
          _ = { position: [], along: [] },
          v = (e, t, n, r, i) => {
            (e.position.push(t.x, t.y, t.z, n.x, n.y, n.z), e.along.push(r, i));
          };
        for (let e = 0; e < i; e++) {
          let t = (e + 1) % i,
            n = e / i,
            r = t === 0 ? 1 : t / i;
          v(g, m[e], m[t], n, r);
          for (let i of h) v(g, i[e], i[t], n, r);
          let a = m[e].clone().setY(-1.97);
          (v(_, a, m[t].clone().setY(-1.97), n, r),
            e % 9 == 0 && v(_, m[e], a, n, n));
        }
        let y = (e, t) => {
            let n = this.track(new N());
            (n.setAttribute(`position`, new T(e.position, 3)),
              n.setAttribute(`aAlong`, new T(e.along, 1)),
              n.setAttribute(
                `aScatter`,
                new T(new Float32Array(e.along.length * 3), 3),
              ));
            let r = new P(n, t);
            return ((r.frustumCulled = !1), r);
          },
          b = this.track(jt(n, r, 400, 1.6)),
          x = this.track(jt(n, r, 400, 0.35)),
          S = new k();
        S.add(y(g, b), y(_, x));
        let ee = [r, `#ffffff`, n].map((e) => {
          let t = new j(
            this.track(
              new D({
                map: this.glow,
                color: Q(e).multiplyScalar(4),
                blending: 2,
                depthWrite: !1,
                transparent: !0,
              }),
            ),
          );
          return (t.scale.setScalar(3.2), S.add(t), t);
        });
        ((S.visible = !1), this.groups.circuits.add(S));
        let C = new pe().setFromPoints([
          ...m,
          ...m.map((e) => e.clone().setY(-2)),
        ]);
        this.circuits.push({
          group: S,
          bright: b,
          dim: x,
          path: m,
          racers: ee,
          centre: C.center,
          radius: C.radius,
        });
      }
    }
    text(e, t, n, r) {
      let i = (n.size ?? 160) * (this.options.mobile ? 0.7 : 1),
        a = new pt(ut(t, { ...n, size: i }), r);
      return (this.texts.push(a), this.overlay.add(a.mesh), (this.t[e] = a), a);
    }
    createType() {
      let e = A(this.options.hero);
      (this.text(
        `subtitle`,
        `ANTI-GRAVITY RACING`,
        { weight: 600, size: 90, tracking: 0.42 },
        { color: `#bff6ff`, color2: `#5fd8ff` },
      ),
        this.text(`scroller`, kt, { weight: 900, size: 128, tracking: 0.03 }),
        (this.t.mirror = new pt(this.t.scroller.source)),
        this.overlay.add(this.t.mirror.mesh),
        this.text(
          `hud`,
          `${e.code}  ${e.name.toUpperCase()}  //  STRUCTURE SCAN`,
          { mono: !0, weight: 500, size: 64, tracking: 0.08 },
          { additive: !0, color: `#7fe7ff` },
        ));
      for (let e of [`3`, `2`, `1`])
        this.text(
          `count${e}`,
          e,
          { weight: 900, size: 320 },
          { additive: !0, color: `#9ff0ff`, color2: `#2b8cff` },
        );
      [`VECTOR`, `ANTI-GRAVITY`, `RACING`, `LEAGUE 2186`].forEach((e, t) =>
        this.text(`word${t}`, e, { weight: 900, size: 200, tracking: 0.02 }),
      );
      for (let e of U) {
        let t = A(e);
        (this.text(`ship-${e}`, t.name.toUpperCase(), {
          weight: 900,
          size: 200,
          tracking: 0.04,
        }),
          this.text(
            `code-${e}`,
            t.code,
            { mono: !0, weight: 700, size: 90, tracking: 0.12 },
            { additive: !0, color: t.color },
          ),
          this.text(
            `shape-${e}`,
            t.shape.toUpperCase(),
            { mono: !0, weight: 500, size: 60, tracking: 0.18 },
            { additive: !0, color: `#ffffff` },
          ),
          this.text(
            `number-${e}`,
            t.number,
            { weight: 900, size: 320 },
            { additive: !0, color: t.color, color2: St[e] },
          ));
      }
      W.forEach((e, t) => {
        let n = re.find((t) => t.id === e),
          [r] = wt[e];
        (this.text(
          `circuit-${e}`,
          n.name.replace(` MK III`, ``).toUpperCase(),
          { weight: 900, size: 180, tracking: 0.03 },
        ),
          this.text(
            `detail-${e}`,
            `${n.category}  ·  ${n.lengthLabel}  ·  ${n.timeOfDay}`,
            { mono: !0, weight: 500, size: 60, tracking: 0.16 },
            { additive: !0, color: r },
          ),
          this.text(
            `index-${e}`,
            `0${t + 1}`,
            { weight: 900, size: 320 },
            { additive: !0, color: r },
          ));
      });
      for (let e of bt)
        this.text(
          `weapon-${e}`,
          e.toUpperCase(),
          { weight: 900, size: 220, tracking: 0.06 },
          { color: `#ffffff`, color2: Tt[e] },
        );
      (this.text(
        `awaits`,
        `THE LEAGUE AWAITS`,
        { weight: 300, size: 110, tracking: 0.5 },
        { additive: !0, color: `#e8f2ff` },
      ),
        this.text(
          `league`,
          `AG RACING LEAGUE  ·  2186`,
          { mono: !0, weight: 500, size: 70, tracking: 0.3 },
          { additive: !0, color: `#ffd9a8` },
        ));
    }
    async compile(e) {
      let t = [];
      (this.world.traverse((e) => {
        e.visible || ((e.visible = !0), t.push(e));
      }),
        this.overlay.traverse((e) => {
          e.visible || ((e.visible = !0), t.push(e));
        }),
        (this.world.environment = this.assets.studio ?? null));
      let n = [
          e.compileAsync(this.world, this.camera),
          e.compileAsync(this.overlay, this.ortho),
        ],
        r = this.backdrop.material;
      for (let t of Object.values(this.fx))
        ((this.backdrop.material = t),
          n.push(e.compileAsync(this.background, this.ortho)));
      this.backdrop.material = r;
      for (let e of t) e.visible = !1;
      await Promise.all(n);
    }
    resize(e, n) {
      ((this.aspect = e / n),
        (this.camera.aspect = this.aspect),
        this.camera.updateProjectionMatrix(),
        (this.ortho.left = -this.aspect),
        (this.ortho.right = this.aspect),
        this.ortho.updateProjectionMatrix(),
        (this.shared.uAspect.value = this.aspect),
        (this.pixel = n / (2 * Math.tan(t.degToRad(this.camera.fov) / 2))));
    }
    gate(e, t) {
      this.reset(e, -1);
      let n = Math.floor(e * 1.6) % 2 == 0,
        r = (e) => {
          let t = Math.round(G(e) * 16);
          return `▮`.repeat(t) + `▯`.repeat(16 - t);
        },
        i = [...Et];
      if (t.ready && t.blocked)
        i.push(
          `WAITING FOR SOUND ...`,
          ``,
          (t.touch
            ? `TAP TO START WITH SOUND`
            : `CLICK OR PRESS ANY KEY FOR SOUND`) + (n ? ` _` : ``),
        );
      else if (t.ready && t.starting)
        i.push(`READY.`, ``, `STARTING SOUND` + (n ? ` _` : ``));
      else if (t.ready)
        i.push(
          `READY.`,
          ``,
          (t.touch ? `TAP TO START` : `PRESS ANY KEY`) + (n ? ` _` : ``),
        );
      else if (t.hold) {
        let n = t.hold.progress;
        i.push(
          `> ${t.hold.stage.toUpperCase()}`,
          n === null
            ? `LOADING ` + r((e * 0.6) % 1)
            : `LOADING ${r(n)} ${String(Math.round(n * 100)).padStart(3)}%`,
          ``,
          t.waiting ? `STARTING WHEN READY` : `ESC SKIPS THE INTRO`,
        );
      } else i.push(`LOADING ` + r((e * 0.6) % 1));
      return (
        this.drawTerminal(i),
        (this.backdrop.material = this.fx.boot),
        (this.backdrop.visible = !0),
        {
          ...st(),
          curve: 1,
          scan: 1,
          grain: 0.05,
          vignette: 1,
          split: 0.35,
          bloom: 1.1,
          threshold: 0.6,
        }
      );
    }
    reset(e, t) {
      ((this.time = e),
        (this.beat = t),
        (this.shared.uTime.value = e),
        (this.shared.uBeat.value = t));
      for (let e of Object.values(this.groups)) e.visible = !1;
      for (let e of this.rigs.values()) e.ship.scene.visible = !1;
      for (let e of this.texts) e.mesh.visible = !1;
      ((this.t.mirror.mesh.visible = !1),
        (this.logo.visible = !1),
        (this.chrome.visible = !1),
        (this.shock.visible = !1),
        (this.grid.visible = !1),
        (this.halo.visible = !1),
        (this.particles.points.visible = !1),
        this.assets.trophy && (this.assets.trophy.visible = !1));
      for (let e of this.medals) e.visible = !1;
      for (let e of this.circuits) e.group.visible = !1;
      ((this.backdrop.visible = !1),
        (this.world.environment = this.assets.studio ?? null),
        (this.world.environmentIntensity = 1),
        this.world.environmentRotation.set(0, 0, 0),
        (this.camera.fov = 50));
    }
    frame(e) {
      let { time: t, beat: n } = e;
      this.reset(t, n);
      let r = yt(n),
        i =
          r.id !== `boot` && r.id !== `build` && r.id !== `moon` ? xt(n, 5) : 0;
      ((this.shared.uKick.value = i),
        (this.shared.uBass.value = e.bass),
        (this.shared.uHigh.value = e.high),
        (this.shared.uLocal.value = r.local));
      let a = st();
      (({
        boot: () => this.boot(a),
        logo: () => this.logoAct(a, r.local, i),
        build: () => this.build(a, e),
        launch: () => this.launch(a, i),
        rollcall: () => this.rollcall(a, i),
        circuits: () => this.circuitsAct(a, i),
        arsenal: () => this.arsenal(a, i),
        moon: () => this.moon(a),
        finale: () => this.finale(a, i),
      })[r.id](),
        this.particles.update(t, this.pixel),
        this.camera.updateProjectionMatrix());
      for (let e of this.rigs.values()) e.flame.uniforms.uTime.value = t;
      return ((this.lastBeat = n), a);
    }
    crossed(e) {
      return (
        this.lastBeat < e && this.beat >= e && this.beat - this.lastBeat < 2
      );
    }
    showShip(e, t = 1) {
      let n = this.rigs.get(e);
      return n
        ? ((n.ship.scene.visible = !0),
          n.ship.scene.scale.setScalar(1),
          (n.flame.uniforms.uPower.value = t),
          (n.flames.visible = t > 0.01),
          n.ship.scene)
        : null;
    }
    lights(e, t, n, r, i = 0.35) {
      (this.key.color.set(e),
        (this.key.intensity = t),
        this.rim.color.set(n),
        (this.rim.intensity = r),
        (this.hemi.intensity = i));
    }
    drawTerminal(e) {
      let t = e.join(`
`);
      if (t === this.terminalText) return;
      this.terminalText = t;
      let n = this.terminal.getContext(`2d`);
      ((n.fillStyle = `#000`),
        n.fillRect(0, 0, this.terminal.width, this.terminal.height),
        (n.fillStyle = `#fff`),
        (n.font = `500 30px ${B(!0)}`),
        (n.textBaseline = `top`),
        e.forEach((e, t) => n.fillText(e, 150, 150 + t * 48)),
        (this.terminalTexture.needsUpdate = !0));
    }
    boot(e) {
      let t = this.time,
        n = [...Et];
      for (let [e, r] of Dt) {
        if (t < e) break;
        n.push(r.slice(0, Math.floor((t - e) * Ot)));
      }
      (Math.floor(t * 4) % 2 == 0 && (n[n.length - 1] += ` _`),
        this.drawTerminal(n),
        (this.backdrop.material = this.fx.boot),
        (this.backdrop.visible = !0),
        Object.assign(e, {
          curve: 1,
          scan: 1,
          grain: 0.05,
          vignette: 1,
          split: 0.35,
          bloom: 1.1,
          threshold: 0.6,
          collapse: K(5.3, 6.9, this.beat),
        }));
    }
    logoAct(e, t, n) {
      let r = this.beat,
        i = this.fx.copper;
      ((i.uniforms.uOpen.value = q(t / 1.2)),
        (i.uniforms.uTravel.value = this.time * 0.05),
        (i.uniforms.uSpread.value = 0.55 + 0.2 * K(15, 19, r)),
        (i.uniforms.uGain.value = 0.42 + 0.58 * K(14.8, 15.2, r)),
        (this.backdrop.material = i),
        (this.backdrop.visible = !0));
      let a = K(14.8, 15.2, r),
        o = Math.min(this.aspect * 1.62, 3.2) / ke,
        s = 1 + 0.035 * n * a;
      ((this.logo.visible = !0),
        this.logo.position.set(
          0,
          0.16 + Math.sin(this.time * 1.3) * 0.015 * a,
          0,
        ),
        this.logo.scale.setScalar(o * s));
      let c = this.logo.material.uniforms;
      ((c.uReveal.value = G((r - 8) / 6.5) * 1.12),
        (c.uFill.value = a),
        (c.uWobble.value = 0.2 * K(23, 24, r) * (1 - K(29, 31, r) * 0.6)),
        (c.uTime.value = this.time),
        (c.uKick.value = n),
        (c.uOpacity.value = 1));
      let l = 0.16 - (Ae * o) / 2;
      if (
        (r > 16.5 &&
          this.t.subtitle.place(0, l - 0.12, 0.05, this.time).set({
            uReveal: G((r - 16.5) / 2),
            uOpacity: 1,
            uSkew: 0,
            uSweep: ((this.time * 0.4) % 1.6) - 0.3,
          }),
        r > 15)
      ) {
        let e = (this.time - V(15)) * 1.15,
          t = 0.16 + 0.06 * Math.sin(this.time * 0.7),
          r = this.aspect * 2;
        (this.t.scroller.window(0, -0.66, 0.13, r, e, this.time).set({
          uChrome: 1,
          uWave: t,
          uWaveFreq: 7,
          uWavePhase: -this.time * 4.2,
          uOpacity: 1,
          uSkew: 0.15,
          uSplit: 0.002 * n,
        }),
          this.t.mirror.window(0, -0.88, 0.13, r, e, this.time).set({
            uChrome: 1,
            uWave: t * 1.3,
            uWaveFreq: 7,
            uWavePhase: -this.time * 4.2 + 0.6,
            uOpacity: 0.22,
            uSkew: -0.15,
          }),
          (this.t.mirror.mesh.scale.y *= -0.6));
      }
      Object.assign(e, {
        curve: 0.35,
        scan: 0.3,
        vignette: 0.8,
        split: 0.25 + n * 0.35,
        bloom: 1.05,
        threshold: 0.95,
        flash: Z(r, 7, 3) * 0.7 + Z(r, 15, 3) * 0.5,
        flashColor: Q(`#bfefff`),
      });
    }
    build(e, n) {
      let r = this.beat,
        i = G((r - 31) / 12),
        a = K(43, 47, r);
      this.groups.build.visible = !0;
      let o = this.fx.space;
      (o.uniforms.uTop.value.set(`#03112a`),
        o.uniforms.uBottom.value.set(`#000000`),
        (o.uniforms.uTravel.value = this.time * (0.03 + a * 0.2)),
        (o.uniforms.uStars.value = 0.8),
        (this.backdrop.material = o),
        (this.backdrop.visible = !0),
        (this.grid.visible = !0),
        this.grid.position.set(0, -1.6, 0));
      let s = this.grid.material.uniforms;
      (s.uLine.value.set(`#0b5c84`),
        s.uMajor.value.set(`#33d6ff`),
        s.uBase.value.set(`#000206`),
        s.uFog.value.set(`#000309`),
        (s.uCell.value = 2.5),
        (s.uFogDistance.value = 70),
        (s.uScroll.value = -this.time * (0.2 + a * 3)),
        (s.uKick.value = xt(r * 2, 6) * a),
        (s.uOpacity.value = 1));
      let c = this.wireMaterial.uniforms;
      ((c.uAssemble.value = i),
        (c.uReveal.value = 2),
        (c.uOpacity.value = 1 + a * 1.5 + n.high * 0.5));
      let l = 2.3 + (r - 31) * 0.11 + a * 0.6,
        u = t.lerp(17, 11.5, Y(i)) - a * 3.5,
        d = t.lerp(5.5, 2.4, i);
      (this.camera.position.set(Math.sin(l) * u, d, Math.cos(l) * u),
        this.camera.lookAt(0, 0.4, 0),
        (this.camera.fov = 46 - a * 8),
        s.uCamera.value.copy(this.camera.position),
        [`3`, `2`, `1`].forEach((e, t) => {
          let n = r - (35 + t * 4);
          if (n < 0 || n > 4) return;
          let i = 1.18 - 0.18 * q(n / 0.6) + n * 0.02;
          this.t[`count${e}`].place(0, 0.02, 1.05 * i, this.time).set({
            uOutline: 1,
            uSkew: 0.12,
            uOpacity: K(0, 0.08, n) * (1 - K(3, 4, n)) * 0.85,
            uGlitch: Z(n, 0, 5),
            uSplit: 0.01 * Z(n, 0, 3),
          });
        }),
        this.t.hud
          .place(
            -this.aspect + 0.08 + this.t.hud.widthAt(0.035) / 2,
            0.86,
            0.035,
            this.time,
          )
          .set({ uReveal: G((r - 31.5) / 2), uOpacity: 0.9, uSkew: 0 }),
        Object.assign(e, {
          vignette: 0.85,
          split: 0.25 + a * 1.4,
          bloom: 1.2,
          threshold: 0.8,
          flash: 0.22 * xt(r * 2, 5) * K(43, 45, r) + J((r - 46) / 1) * 1,
          flashColor: Q(`#e8fbff`),
          shake: a * 0.25,
        }));
    }
    launch(e, t) {
      let n = this.beat,
        r = n - 47,
        i = J((n - 61) / 2),
        a = Math.sin((r * Math.PI) / 4) * 1.7,
        o = this.fx.tunnel,
        s = (this.time - V(47)) * (7 + i * 30) + i * 6;
      ((o.uniforms.uTravel.value = s),
        (o.uniforms.uTwist.value = this.time * 0.15 + Math.sin(r * 0.4) * 0.3),
        o.uniforms.uCenter.value.set(-a * 0.04, 0.06),
        (this.backdrop.material = o),
        (this.backdrop.visible = !0),
        (this.groups.launch.visible = !0),
        (this.streaks.material.uniforms.uTravel.value = s * 9),
        (this.streaks.material.uniforms.uLength.value = 6 + i * 30),
        this.lights(`#ffffff`, 2.2, `#ff7a2e`, 3.5, 0.25),
        this.key.position.set(3, 6, 8),
        this.rim.position.set(-4, 2, -10),
        (this.world.environment =
          this.assets.city ?? this.assets.studio ?? null),
        (this.world.environmentIntensity = 1.2));
      let c = this.showShip(this.options.hero, 1.4 + t * 0.6 + i * 2);
      (c &&
        (c.position.set(
          a,
          0.15 * Math.sin(this.time * 3.1) + t * 0.06,
          -i * 140,
        ),
        c.rotation.set(
          -0.04 + t * 0.03,
          Math.PI + a * 0.06,
          -Math.cos((r * Math.PI) / 4) * 0.42,
        )),
        this.camera.position.set(a * 0.35, 2.1 + t * 0.1, 9.5),
        this.camera.lookAt(a * 0.55, 0.7, -20),
        (this.camera.fov = 56 + t * 1.5 + i * 10),
        [`VECTOR`, `ANTI-GRAVITY`, `RACING`, `LEAGUE 2186`].forEach((e, n) => {
          let i = r - n * 4;
          if (i < 0 || i > 4) return;
          let a = X(i / 0.4, 2.4);
          this.t[`word${n}`]
            .place(0, 0.5, 0.24 * (1 + (1 - a) * 0.5), this.time)
            .set({
              uChrome: 1,
              uOpacity: K(0, 0.05, i) * (1 - K(3.2, 3.95, i)),
              uGlitch: Z(i, 0, 5) + Z(i, 2, 8) * 0.5,
              uSplit: 0.008 * Z(i, 0, 3) + 0.002 * t,
              uSweep: ((i / 2.2) % 1.6) - 0.3,
              uSkew: 0.22,
            });
        }),
        Object.assign(e, {
          vignette: 0.7,
          split: 0.3 + t * 0.55,
          bloom: 1.15,
          threshold: 1,
          flash: Z(n, 47, 2.2),
          shake: t * 0.22 + i * 0.3,
        }));
    }
    rollcall(e, n) {
      let r = this.beat,
        i = Math.min(4, Math.floor((r - 63) / 3)),
        a = U[i],
        o = r - (63 + i * 3),
        s = A(a),
        c = this.fx.rollcall;
      ((c.uniforms.uEffect.value = i),
        c.uniforms.uColor.value.set(s.color),
        c.uniforms.uColor2.value.set(St[a]),
        (this.backdrop.material = c),
        (this.backdrop.visible = !0),
        this.lights(`#ffffff`, 2.6, s.color, 5, 0.3),
        this.key.position.set(6, 8, 10),
        this.rim.position.set(-6, 3, -8),
        (this.world.environment = this.assets.studio ?? null),
        (this.world.environmentIntensity = 1.1));
      let l = this.showShip(a, 1.2 + n * 0.5);
      if (l) {
        let e = q(o / 0.7),
          n = J((o - 2.45) / 0.55);
        (l.position.set(
          t.lerp(26, 0, e) - n * 32,
          0.12 * Math.sin(this.time * 2.4),
          0,
        ),
          l.rotation.set(
            0.1,
            -Math.PI / 2 + 1.05 - o * 0.22,
            (1 - e) * 0.55 - n * 0.4,
          ));
      }
      (this.camera.position.set(0, 2.6, 12.5),
        this.camera.lookAt(0, 0.1, 0),
        (this.camera.fov = 40));
      let u = 1 - K(2.55, 2.95, o),
        d = X((o - 0.15) / 0.35, 2.2);
      (o > 0.15 &&
        this.t[`ship-${a}`]
          .place(0, -0.6, 0.22 * (1 + (1 - d) * 0.4), this.time)
          .set({
            uChrome: 1,
            uOpacity: u,
            uGlitch: Z(o, 0.15, 6),
            uSplit: 0.006 * Z(o, 0.15, 4),
            uSweep: ((o - 0.4) / 1.6) % 1.6,
            uSkew: 0.22,
          }),
        this.t[`shape-${a}`]
          .place(0, -0.82, 0.04, this.time)
          .set({ uReveal: G((o - 0.45) / 0.7), uOpacity: u, uSkew: 0 }),
        this.t[`code-${a}`]
          .place(0, 0.8, 0.065, this.time)
          .set({ uReveal: G((o - 0.05) / 0.4), uOpacity: u, uSkew: 0 }),
        this.t[`number-${a}`]
          .place(this.aspect - 0.8, 0.3, 0.8, this.time)
          .set({
            uOutline: 1,
            uOpacity: 0.55 * u * K(0, 0.2, o),
            uSkew: 0.2,
            uGlitch: Z(o, 0, 4),
          }),
        Object.assign(e, {
          vignette: 0.55,
          scan: 0.25,
          split: 0.3 + Z(o, 0, 4) * 2 + n * 0.3 + K(78.4, 79, r) * 2,
          bloom: 0.95,
          threshold: 1.15,
          flash: Z(o, 0, 5) * 0.45,
          flashColor: Q(s.color).lerp(Q(`#ffffff`), 0.6),
          shake: n * 0.1,
        }));
    }
    circuitsAct(e, n) {
      let r = this.beat,
        i = Math.min(4, Math.floor((r - 79) / 3)),
        o = W[i],
        s = r - (79 + i * 3),
        [c, l, u, d] = wt[o];
      this.groups.circuits.visible = !0;
      let f = this.fx.space;
      (f.uniforms.uTop.value.set(u),
        f.uniforms.uBottom.value.set(d),
        (f.uniforms.uTravel.value = this.time * 0.04),
        (f.uniforms.uStars.value = 0.7),
        (this.backdrop.material = f),
        (this.backdrop.visible = !0),
        (this.grid.visible = !0),
        this.grid.position.set(0, -2, 0));
      let p = this.grid.material.uniforms;
      (p.uLine.value.set(c).multiplyScalar(0.12),
        p.uMajor.value.set(c).multiplyScalar(0.45),
        p.uBase.value.set(d).multiplyScalar(0.4),
        p.uFog.value.set(d),
        (p.uCell.value = 4),
        (p.uFogDistance.value = 150),
        (p.uScroll.value = 0),
        (p.uKick.value = n),
        (p.uOpacity.value = 1));
      let m = this.circuits[i];
      if (m) {
        m.group.visible = !0;
        let e = q(s / 1.7) * 1.001;
        for (let t of [m.bright, m.dim])
          ((t.uniforms.uReveal.value = e),
            (t.uniforms.uOpacity.value = t === m.bright ? 1.6 + n * 0.8 : 0.35),
            t.uniforms.uColor.value.set(c),
            t.uniforms.uHead.value.set(l));
        m.racers.forEach((t, n) => {
          let r = (this.time * 0.11 + n * 0.045) % 1,
            i = r < e;
          ((t.visible = i),
            i &&
              t.position
                .copy(m.path[Math.floor(r * m.path.length)])
                .add(new a(0, 0.6, 0)));
        });
      }
      let h = 0.5 + i * 1.25 + s * 0.2,
        g = m?.radius ?? 40,
        _ = m?.centre ?? new a(),
        v = (g / Math.sin(t.degToRad(22))) * 1.02,
        y = 0.62 - s * 0.03;
      (this.camera.position.set(
        _.x + Math.sin(h) * Math.cos(y) * v,
        _.y + Math.sin(y) * v,
        _.z + Math.cos(h) * Math.cos(y) * v,
      ),
        this.camera.lookAt(_.x, _.y - g * 0.32, _.z),
        (this.camera.fov = 44),
        p.uCamera.value.copy(this.camera.position));
      let b = 1 - K(2.6, 2.98, s),
        x = X(s / 0.35, 2);
      (this.t[`circuit-${o}`]
        .place(0, -0.64, 0.16 * (1 + (1 - x) * 0.4), this.time)
        .set({
          uChrome: 1,
          uOpacity: b * K(0, 0.05, s),
          uGlitch: Z(s, 0, 6),
          uSplit: 0.005 * Z(s, 0, 4),
          uSweep: (s / 1.8) % 1.6,
          uSkew: 0.2,
        }),
        this.t[`detail-${o}`]
          .place(0, -0.83, 0.038, this.time)
          .set({ uReveal: G((s - 0.3) / 0.8), uOpacity: b, uSkew: 0 }),
        this.t[`index-${o}`]
          .place(-this.aspect + 0.55, 0.55, 0.62, this.time)
          .set({
            uOutline: 1,
            uOpacity: 0.6 * b,
            uSkew: 0.2,
            uGlitch: Z(s, 0, 4),
          }),
        Object.assign(e, {
          vignette: 0.7,
          split: 0.25 + n * 0.3 + Z(s, 0, 4) * 1.5,
          bloom: 1.25,
          threshold: 0.85,
          flash: Z(s, 0, 5) * 0.3,
          flashColor: Q(l),
          shake: n * 0.08,
        }));
    }
    arsenal(e, n) {
      let r = this.beat,
        i = r - 95,
        o = 1 - K(105.5, 107, r);
      ((this.groups.arsenal.visible = !0),
        (this.particles.points.visible = !0));
      let s = this.fx.space;
      (s.uniforms.uTop.value.set(`#1a0306`),
        s.uniforms.uBottom.value.set(`#020001`),
        (s.uniforms.uTravel.value = this.time * 0.06),
        (s.uniforms.uStars.value = 0.6 * o),
        (this.backdrop.material = s),
        (this.backdrop.visible = !0),
        this.lights(`#ffffff`, 2.4, `#ff6a2e`, 4, 0.3),
        this.key.position.set(4, 6, 6),
        this.rim.position.set(-5, 2, -8),
        (this.world.environment = this.assets.city ?? null),
        this.camera.position.set(0, 0, 0),
        this.camera.lookAt(0, 0, -1),
        (this.camera.fov = 55),
        this.dots.position.set(0, 0, -34),
        this.dots.rotation.set(this.time * 0.3, this.time * 0.45, 0),
        this.dots.scale.setScalar((1 + n * 0.08) * (0.4 + 0.6 * o)),
        (this.dots.material.uniforms.uTime.value = this.time),
        (this.dots.material.uniforms.uPixel.value = this.pixel),
        bt.slice(0, 4).forEach((e, n) => {
          let r = i - n * 2,
            o = this.weaponHolder.getObjectByName(e),
            s = new a(Math.sin(n * 2.1) * 1.6, Math.cos(n * 1.7) * 0.8, -9);
          if (
            (o && r >= 0 && r < 1
              ? ((o.visible = !0),
                o.position.copy(s).setZ(t.lerp(-80, -10, q(r / 0.3))),
                o.scale.setScalar(
                  X(r / 0.35, 2.2) * (o.userData.scale ??= o.scale.x),
                ),
                o.rotation.set(this.time * 1.4 + n, this.time * 2.2, 0.4))
              : o && (o.visible = !1),
            this.crossed(96 + n * 2) && this.explode(s, Tt[e]),
            r >= 0 && r < 2)
          ) {
            let t = X(r / 0.3, 2.4);
            this.t[`weapon-${e}`]
              .place(0, 0.62, 0.2 * (1 + (1 - t) * 0.5), this.time)
              .set({
                uOpacity: 1 - K(1.4, 1.95, r),
                uGlitch: Z(r, 0, 5) + Z(r, 1, 5),
                uSplit: 0.008 * Z(r, 1, 3),
                uSkew: 0.22,
                uSweep: r % 1.6,
              });
          }
        }));
      let c = r - 103;
      if (c >= 0) {
        let e = this.showShip(this.options.hero, 0.8 * o),
          t = X(c / 0.5, 2) * o;
        (e &&
          (e.position.set(0, -0.6, -15),
          e.rotation.set(0.25, 0.6 + this.time * 0.6, 0),
          e.scale.setScalar(Math.max(0.001, 0.4 + 0.6 * o))),
          (this.shield.visible = !0),
          this.shield.position.set(0, -0.4, -15),
          this.shield.scale.setScalar(Math.max(0.001, t * 6)),
          (this.shield.material.uniforms.uTime.value = this.time),
          (this.shield.material.uniforms.uPower.value = (0.8 + n * 0.8) * o),
          c < 2 &&
            this.t[`weapon-shield`].place(0, 0.62, 0.2, this.time).set({
              uOpacity: 1 - K(1.4, 1.95, c),
              uGlitch: Z(c, 0, 5),
              uSkew: 0.22,
              uSweep: c % 1.6,
            }));
      } else this.shield.visible = !1;
      let l = 0;
      for (let e = 0; e < 4; e++) l = Math.max(l, Z(i, 1 + e * 2, 4));
      Object.assign(e, {
        vignette: 0.8,
        split: 0.3 + n * 0.4 + l * 0.9,
        bloom: 1.3,
        threshold: 0.9,
        flash: l * 0.16,
        flashColor: Q(`#ffe6c8`),
        shake: l * 0.9 + n * 0.1,
        fade: 0.25 + 0.75 * o,
      });
    }
    explode(e, t) {
      let n = Q(t);
      this.particles.burst(e, this.options.mobile ? 260 : 600, this.time, {
        speed: [6, 34],
        life: [0.5, 1.6],
        colors: [
          n.clone().multiplyScalar(2.2),
          Q(`#ffffff`).multiplyScalar(2.6),
          Q(`#ffd36a`).multiplyScalar(2.2),
        ],
        size: [0.5, 1.5],
      });
    }
    moon(e) {
      let n = this.beat,
        r = n - 107,
        i = Y(r / 12);
      ((this.groups.moon.visible = !0),
        (this.world.environment = this.assets.studio ?? null),
        (this.world.environmentIntensity = 0.35));
      let o = new a(-0.85, 0.2, 0.5).normalize();
      if (
        (this.lights(`#fff6ea`, 4, `#7fb3ff`, 1.5, 0.04),
        this.key.position.copy(o).multiplyScalar(50),
        this.rim.position.set(6, 3, -10),
        this.camera.position.set(
          t.lerp(-13, -7.5, i),
          t.lerp(1.7, 2.6, i),
          t.lerp(17, 11, i),
        ),
        this.camera.lookAt(t.lerp(2.5, 3.5, i), t.lerp(3.2, 4.2, i), -8),
        (this.camera.fov = 42),
        this.stars && this.stars.position.copy(this.camera.position),
        this.earth)
      ) {
        let e = q(r / 11);
        (this.earth.position.set(900, t.lerp(-90, 300, e), -760),
          this.earth.scale.setScalar(170),
          (this.earth.rotation.y = -1.9 + this.time * 0.03),
          (this.earth.material.uniforms.uTime.value = this.time));
      }
      let s = this.showShip(this.options.hero, 0.45);
      (s &&
        (s.position.set(0, 2.3 + Math.sin(this.time * 1.4) * 0.2, 0),
        s.rotation.set(0.05, 0.25 + r * 0.03, Math.sin(this.time * 0.9) * 0.04),
        s.scale.setScalar(1)),
        this.t.awaits.place(0, -0.62, 0.05, this.time).set({
          uReveal: G((r - 2) / 4),
          uOpacity: 0.85 * (1 - K(10.5, 12, r)),
          uSkew: 0,
          uSweep: ((r - 4) / 4) % 1.6,
        }));
      let c = n - 119,
        l = this.assets.trophy;
      if (c >= 0) {
        let e = q(c / 3);
        (l &&
          ((l.visible = !0),
          l.position.set(0, t.lerp(-6, -0.2, e), -8),
          l.rotation.set(0.08, this.time * 1.2, 0),
          l.scale.setScalar(1.7 + c * 0.08)),
          (this.halo.visible = !0),
          this.halo.position.set(0, t.lerp(-5, 0.2, e), -12),
          this.halo.scale.setScalar(3 + e * 5 + c * 0.8),
          (this.halo.material.opacity = 0.2 + e * 0.35),
          this.lights(`#fff3dc`, 4 + e * 3, `#ffd27a`, 3 + e * 5, 0.04));
      }
      Object.assign(e, {
        letterbox: 0.11 * (1 - K(121, 123, n)),
        vignette: 0.9,
        split: 0.1 + c * 0.1 * Number(c > 0),
        bloom: 0.95,
        threshold: 1.2,
        grain: 0.045,
        exposure: 1.1,
        flash: J((n - 121.5) / 1.5) * 1,
        flashColor: Q(`#fff4e0`),
        fade: K(107, 108, n),
      });
    }
    finale(e, n) {
      let r = this.beat,
        i = r - 123;
      ((this.groups.finale.visible = !0),
        (this.world.environment =
          this.assets.city ?? this.assets.studio ?? null),
        (this.world.environmentIntensity = 1.3),
        this.world.environmentRotation.set(0, this.time * 0.35, 0),
        this.lights(`#ffd6f0`, 2.4, `#3ff4ff`, 4, 0.4),
        this.key.position.set(0, 6, -30),
        this.rim.position.set(0, 10, 30));
      let a = Y((r - 131) / 8);
      (this.camera.position.set(
        Math.sin(this.time * 0.4) * 2,
        t.lerp(7.5, 19, a) + n * 0.1,
        t.lerp(32, 2, a),
      ),
        this.camera.lookAt(0, t.lerp(4, 2, a), -60),
        (this.camera.fov = 52 + n),
        this.sky.position.copy(this.camera.position));
      let o = this.sky.material.uniforms;
      ((o.uTime.value = this.time),
        (this.grid.visible = !0),
        this.grid.position.set(0, 0, 0));
      let s = this.grid.material.uniforms;
      (s.uLine.value.set(`#ff2fa0`).multiplyScalar(0.35),
        s.uMajor.value.set(`#3ff4ff`).multiplyScalar(0.9),
        s.uBase.value.set(`#07001a`),
        s.uFog.value.copy(o.uHorizon.value),
        (s.uCell.value = 6),
        (s.uFogDistance.value = 420),
        (s.uScroll.value = -(this.time - V(123)) * 9),
        (s.uKick.value = n),
        s.uCamera.value.copy(this.camera.position));
      let c = [this.options.hero, ...U.filter((e) => e !== this.options.hero)],
        l = [
          [0, 0],
          [-7.5, 8],
          [7.5, 8],
          [-15, 16],
          [15, 16],
        ];
      c.forEach((e, t) => {
        let r = this.showShip(e, 1.6 + n * 0.6);
        if (!r) return;
        let [a, o] = l[t],
          s = q((i - t * 0.25) / 2);
        (r.position.set(
          a,
          3.5 + Math.sin(this.time * 2 + t) * 0.25,
          o + (1 - s) * 60,
        ),
          r.rotation.set(0, Math.PI, Math.sin(this.time * 1.6 + t) * 0.12),
          r.scale.setScalar(1));
      });
      let u = 40 * Math.tan(t.degToRad(this.camera.fov) / 2),
        d = Math.min((u * this.aspect * 0.74) / ke, (u * 0.24) / Ae),
        f = X(i / 0.55, 1.6);
      if (
        ((this.chrome.visible = !0),
        this.chrome.position.set(0, u * 0.17, -20),
        this.chrome.scale.setScalar(d * (1 + (1 - f) * 3) * (1 + n * 0.02)),
        this.chrome.rotation.set(
          -0.12 + Math.sin(this.time * 0.7) * 0.05,
          Math.sin(this.time * 0.5) * 0.14,
          0,
        ),
        this.medals.forEach((e, t) => {
          let n = i - 4 - t * 0.12;
          if (n < 0) return;
          e.visible = !0;
          let r = this.time * 1.25 + t * 0.2618,
            a = Math.cos(r);
          (e.position.set(
            Math.sin(r) * u * this.aspect * 0.42,
            u * 0.17 + Math.sin(this.time * 2.1 + t * 0.52) * u * 0.3,
            -20 + a * 6,
          ),
            e.scale.setScalar(u * 0.09 * (1 + a * 0.25) * X(n / 0.4)));
        }),
        this.t.subtitle.place(0, 0.040000000000000036, 0.05, this.time).set({
          uReveal: G((i - 1.5) / 2),
          uOpacity: 1 - K(139, 140.3, r),
          uSkew: 0,
          uSweep: ((this.time * 0.4) % 1.6) - 0.3,
        }),
        i > 8 &&
          this.t.league.place(0, -0.82, 0.04, this.time).set({
            uReveal: G((i - 8) / 2),
            uOpacity: 1 - K(139.4, 140.4, r),
            uSkew: 0,
          }),
        i < 1.5)
      ) {
        this.shock.visible = !0;
        let e = q(i / 1.4);
        (this.shock.position.set(0, 0.34, 0),
          this.shock.scale.setScalar(0.1 + e * this.aspect * 1.6),
          (this.shock.material.opacity = 1 - e));
      }
      let p = K(139.6, 140.7, r);
      Object.assign(e, {
        vignette: 0.6,
        split: 0.25 + n * 0.45 + Z(i, 0, 3) * 3,
        bloom: 1.25,
        threshold: 1,
        flash: Z(i, 0, 2.2) * 0.85 + Z(r, 139, 1.6) * 0.8,
        shake: Z(i, 0, 3) * 1.2 + n * 0.12,
        fade: 1 - p,
      });
    }
    render(e, t) {
      (e.setRenderTarget(t),
        e.setClearColor(0, 1),
        e.clear(!0, !0, !0),
        this.backdrop.visible && e.render(this.background, this.ortho),
        e.render(this.world, this.camera),
        e.clearDepth(),
        e.render(this.overlay, this.ortho));
    }
    dispose() {
      for (let e of this.texts) e.dispose();
      (this.t.mirror.mesh.geometry.dispose(),
        this.t.mirror.mesh.material.dispose());
      for (let e of this.disposables) e.dispose();
      for (let e of this.rigs.values()) e.ship.scene.remove(e.flames);
    }
  };
