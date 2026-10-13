// assets__game-CsnOSIff 75 — math
// Lines 31530-31989 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var gx = [
    [0, 0, 0],
    [-6.9, 0, -3.2],
    [6.9, 0, -3.2],
    [-13.6, 0, -7.6],
    [13.6, 0, -7.6],
    [-5, 1.7, -14],
    [5, 1.7, -14],
    [0, 3, -20.5],
  ],
  _x = -0.42,
  vx = 3.4,
  yx = class {
    constructor(e) {
      ((this.scene = new n()),
        (this.camera = new wn(32, 16 / 9, 0.5, 400)),
        (this.active = !1),
        (this.slots = []),
        (this.owned = []),
        (this.occupied = 1),
        (this.target = { position: new g(), look: new g() }),
        (this.look = new g()),
        (this.aspect = 16 / 9),
        (this.clock = 0),
        (this.framed = !1),
        (this.procedural = []),
        (this.keyLights = []),
        (this.bay = null),
        (this.bayState = `none`),
        (this.waited = 0),
        (this.reveal = 0),
        (this.pipeline = null),
        (this.bloomPass = null),
        (this.inRoom = !1),
        (this.scene.environment = e),
        (this.scene.environmentIntensity = 0.75),
        (this.scene.background = new _(`#050d16`)),
        (this.scene.fog = new r(`#050d16`, 55, 150)),
        (this.hemisphere = new Gt(`#c6e6f2`, `#1a2733`, 1.9)),
        this.scene.add(this.hemisphere));
      for (let [e, t, n] of [
        [`#f4f7ff`, 3.2, [8, 14, 12]],
        [`#56e8e0`, 2.6, [-14, 6, -10]],
        [`#ff8a4a`, 1.6, [16, 4, -6]],
      ]) {
        let r = new te(e, t);
        (r.position.set(n[0], n[1], n[2]),
          this.scene.add(r),
          this.keyLights.push(r));
      }
      (this.buildFloor(), (this.arch = this.buildArch()));
      for (let e = 0; e < gx.length; e++) this.slots.push(this.buildSlot(e));
      (this.camera.layers.enable(1), this.frame(!0));
    }
    useBay(e, t, n) {
      if (this.bay) return;
      ((this.bay = e), (this.bayState = `ready`));
      for (let e of this.procedural) e.removeFromParent();
      for (let e of this.slots) for (let t of e.stand) t.removeFromParent();
      (this.scene.add(e.root),
        (this.scene.fog = null),
        (this.scene.background = new _(`#03070b`)),
        e.environment &&
          ((this.scene.environment = e.environment),
          (this.scene.environmentIntensity = 1)),
        (this.hemisphere.intensity = 0.55));
      let [r, i, a] = this.keyLights;
      ((r.intensity = 2.6),
        r.position.set(4, 18, 9),
        (i.intensity = 2.4),
        i.position.set(0, 7, -30),
        (a.intensity = 0.9),
        a.position.set(18, 3, -12));
      for (let e of this.slots) e.glow.layers.set(1);
      if ((this.syncTints(), t && n?.enabled)) {
        let e = new _n(t),
          r = Ti(this.scene, this.camera, {
            samples: 4,
            type: t.getOutputBufferType(),
          }).getTextureNode(`output`);
        ((this.bloomPass = rx(r, 0.16, 0.22, 1.4)),
          this.bloomPass.setResolutionScale(Math.min(0.5, n.resolution)),
          (e.outputNode = r.add(this.bloomPass)),
          (this.pipeline = e));
      }
    }
    bayFailed() {
      this.bayState === `loading` && (this.bayState = `failed`);
    }
    buildFloor() {
      let e = new Le(120, 96),
        t = new i(),
        n = z(U.xz.div(2.6)).sub(0.5).abs(),
        r = Z(0.47, 0.5, V(n.x, n.y)),
        a = Ni(U.xz.sub(K(0, -6))),
        o = Z(0.42, 0.5, z(a.div(7)).sub(0.5).abs()),
        s = B(1).sub(Z(14, 62, a));
      t.colorNode = W(`#0a1b26`)
        .mul(B(1).sub(Z(10, 70, a).mul(0.6)))
        .add(W(`#2ad1d6`).mul(r.mul(0.07).add(o.mul(0.16)).mul(s)));
      let c = new N(e, t);
      ((c.rotation.x = -Math.PI / 2),
        (c.position.y = -1.32),
        this.scene.add(c),
        this.procedural.push(c),
        this.owned.push(e, t));
    }
    buildArch() {
      let e = new pn(),
        t = new we({
          color: new _(`#5ef2ff`).multiplyScalar(1.6),
          toneMapped: !1,
        }),
        n = new we({
          color: new _(`#ff7a3d`).multiplyScalar(1.4),
          toneMapped: !1,
        }),
        r = new we({ color: `#10324a`, transparent: !0, opacity: 0.55 }),
        i = new sn(34, 0.32, 10, 160),
        a = new sn(31.5, 0.12, 8, 160, Math.PI * 1.25),
        o = new sn(37, 1.4, 6, 160);
      e.add(new N(i, t));
      let s = new N(a, n);
      ((s.rotation.z = Math.PI * 0.62),
        e.add(s, new N(o, r)),
        e.position.set(0, 9, -48),
        this.scene.add(e),
        this.procedural.push(e));
      let c = new ir(0.5, 30, 0.5);
      for (let e of [-46, -38, 38, 46]) {
        let n = new N(c, Math.abs(e) > 40 ? r : t);
        (n.position.set(e, 12, -40 + Math.abs(e) * 0.2),
          this.scene.add(n),
          this.procedural.push(n));
      }
      return (this.owned.push(t, n, r, i, a, o, c), e);
    }
    buildSlot(e) {
      let [t, n, r] = gx[e],
        a = new pn();
      a.position.set(t, n, r);
      let o = new _e(3.7, 4, 0.36, 6),
        s = new Ne({
          color: `#0b1822`,
          metalness: 0.3,
          roughness: 0.55,
          envMapIntensity: 0.05,
        }),
        c = new N(o, s);
      ((c.position.y = -1.1400000000000001), (c.rotation.y = Math.PI / 6));
      let l = [c];
      if (n > 0) {
        let e = new _e(3.9, 4.3, n, 6),
          t = new N(e, s);
        ((t.position.y = -1.32 - n / 2),
          (t.rotation.y = Math.PI / 6),
          a.add(t),
          l.push(t),
          this.owned.push(e));
      }
      let u = new ue(3.32, 3.5, 6),
        d = new we({
          color: `#2b5566`,
          toneMapped: !1,
          transparent: !0,
          opacity: 0.55,
        }),
        f = new N(u, d);
      (f.rotation.set(-Math.PI / 2, 0, Math.PI / 6),
        (f.position.y = -0.95),
        l.push(f));
      let p = new Le(3.1, 48),
        m = new i({
          color: `#000000`,
          transparent: !0,
          depthWrite: !1,
          blending: 2,
          toneMapped: !1,
        });
      m.opacityNode = B(1)
        .sub(Z(0.05, 1, Ni(X().sub(0.5).mul(2))))
        .mul(0.55);
      let h = new N(p, m);
      ((h.rotation.x = -Math.PI / 2), (h.position.y = -0.93), a.add(c, f, h));
      let g = new pn();
      g.rotation.y = _x;
      let v = new Ks();
      return (
        a.add(g, v.group),
        this.scene.add(a),
        this.owned.push(o, s, u, d, p, m),
        {
          pad: a,
          stand: l,
          rim: f,
          rimMaterial: d,
          glowMaterial: m,
          glow: h,
          energy: 0,
          accent: new _(),
          pivot: g,
          effect: v,
          pilot: null,
          key: ``,
          model: null,
          release: null,
          rig: null,
          age: Ln,
          phase: e * 1.37,
        }
      );
    }
    setPilots(e) {
      let t = new Set(e.map((e) => e.id));
      for (let e of this.slots) e.pilot && !t.has(e.pilot) && this.clearSlot(e);
      let n = e.find((e) => e.self),
        r = e.filter((e) => !e.self);
      n && this.assign(this.slots[0], n);
      for (let e of r) {
        let t =
          this.slots.find((t, n) => n > 0 && t.pilot === e.id) ??
          this.slots.find((e, t) => t > 0 && !e.pilot);
        t && this.assign(t, e);
      }
      let i = this.slots.reduce((e, t, n) => (t.pilot ? n : e), 0);
      ((this.occupied =
        r.length || this.inRoom ? Math.min(gx.length, i + 2) : 1),
        this.frame());
    }
    assign(e, t) {
      let n = e.pilot !== t.id;
      if (
        ((e.pilot = t.id),
        e.rimMaterial.color.set(t.accent).multiplyScalar(1.6),
        (e.rimMaterial.opacity = 1),
        e.glowMaterial.color.set(t.accent),
        e.accent.set(t.accent),
        n && (e.age = 0),
        e.key === t.key || !t.source)
      )
        return;
      this.dropModel(e);
      let r = t.source.clone(!0);
      ((e.release = ks(r)),
        r.traverse((e) => {
          if (e instanceof N) {
            e.castShadow = e.receiveShadow = !1;
            for (let t of Array.isArray(e.material) ? e.material : [e.material])
              (`envNode` in t && (t.envNode = null),
                `envMap` in t && (t.envMap = null));
          }
        }),
        e.pivot.add(r),
        (e.model = r),
        (e.rig = xc(r)),
        (e.key = t.key),
        n || (e.age = 0.35));
    }
    dropModel(e) {
      (e.model?.removeFromParent(),
        e.release?.(),
        (e.model = null),
        (e.release = null),
        (e.rig = null),
        (e.key = ``));
    }
    clearSlot(e) {
      (this.dropModel(e),
        (e.pilot = null),
        e.rimMaterial.color.set(`#2b5566`),
        (e.rimMaterial.opacity = 0.55),
        e.glowMaterial.color.set(`#000000`),
        (e.age = Ln));
    }
    syncTints() {
      let e = this.bay?.slots;
      e &&
        this.slots.forEach((t, n) => {
          e[n] &&
            (e[n].accent.value.copy(t.accent), (e[n].energy.value = t.energy));
        });
    }
    frame(e = !1) {
      let t = gx.slice(0, this.occupied),
        n = t.map((e) => e[0]),
        r = t.map((e) => e[2]),
        i = Math.max(...n.map(Math.abs)) + 5,
        a = Math.min(...r),
        o = s.degToRad(this.camera.fov),
        c = 2 * Math.atan(Math.tan(o / 2) * this.aspect * 0.8),
        l = Math.max(i / Math.tan(c / 2) + 2, 17 - a * 0.35),
        u = a * 0.42;
      (this.target.look.set(0, 1.1 + -a * 0.05, u),
        this.target.position.set(0, 2.8 + l * 0.16, u + l),
        (e || !this.framed) &&
          (this.camera.position.copy(this.target.position),
          this.look.copy(this.target.look),
          this.camera.lookAt(this.look),
          (this.framed = !0)));
    }
    resize(e) {
      Math.abs(e - this.aspect) < 0.001 ||
        ((this.aspect = e),
        (this.camera.aspect = e),
        this.camera.updateProjectionMatrix(),
        this.frame(!0));
    }
    update(e, t) {
      if (!this.active) return;
      ((e = Math.max(0, Math.min(e, 0.05))),
        (this.clock += t ? 0 : e),
        (this.waited += e),
        (this.bayState !== `loading` || this.waited > 4) &&
          (this.reveal = t ? 1 : Math.min(1, this.reveal + e / 0.5)));
      for (let n of this.slots) {
        let r = +!!n.pilot;
        n.energy += (r - n.energy) * (t ? 1 : 1 - Math.exp(-e * 4));
      }
      this.bay && ((this.bay.time.value = this.clock), this.syncTints());
      let n = t ? 1 : 1 - Math.exp(-e * 3.2);
      (this.camera.position.lerp(this.target.position, n),
        this.look.lerp(this.target.look, n),
        this.camera.lookAt(this.look),
        (this.arch.rotation.z = t ? 0 : this.clock * 0.03));
      for (let n of this.slots) {
        let r = n.age < Ln;
        n.age += e;
        let i = n.effect.update(r ? Ln - n.age : 0, t),
          a = t ? 0 : Math.sin(this.clock * 1.25 + n.phase) * 0.09;
        ((n.pivot.position.y = a + i.lift),
          n.pivot.scale.setScalar(i.scale),
          (n.pivot.rotation.z = t
            ? 0
            : Math.sin(this.clock * 0.8 + n.phase) * 0.025),
          (n.pivot.rotation.x = i.pitch),
          n.rig &&
            !t &&
            Sc(
              n.rig,
              {
                speed: 0,
                throttle: 0.15,
                steer: 0,
                airbrake: 0,
                boost: 0,
                time: this.clock + n.phase,
              },
              e,
            ));
      }
    }
    anchors() {
      let e = this.camera.clone();
      (e.position.copy(this.target.position),
        e.lookAt(this.target.look),
        e.updateMatrixWorld(!0));
      let t = this.target.position.distanceTo(new g(...gx[0]));
      return this.slots.slice(0, this.occupied).map((n, r) => {
        let [i, a, o] = gx[r],
          s = new g(i, a + vx, o),
          c = e.position.distanceTo(s);
        return (
          s.project(e),
          {
            slot: r,
            pilot: n.pilot,
            x: +((s.x + 1) / 2).toFixed(4),
            y: +((1 - s.y) / 2).toFixed(4),
            scale: +Math.min(1, t / c).toFixed(3),
          }
        );
      });
    }
    snapshot() {
      return {
        active: this.active,
        pilots: this.slots.filter((e) => e.pilot).length,
        models: this.slots.filter((e) => e.model).length,
        framed: this.occupied,
        bay: this.bayState,
      };
    }
    dispose() {
      for (let e of this.slots) (this.dropModel(e), e.effect.dispose());
      (this.owned.forEach((e) => e.dispose()),
        this.bloomPass?.dispose(),
        this.pipeline?.dispose(),
        (this.pipeline = null),
        this.bay?.root.removeFromParent(),
        (this.bay = null),
        (this.scene.environment = null),
        this.scene.clear());
    }
  },
  bx = {
    source: `Blender`,
    atlasSize: [1024, 1024],
    textureMaps: 3,
    assets: {
      "aurora-tower": {
        objects: 51,
        triangles: 2896,
        min: [-23, 0, -22],
        max: [22, 157.3249969482422, 22],
        meshes: 4,
      },
      "terrace-habitat": {
        objects: 66,
        triangles: 3704,
        min: [-26, 0, -22],
        max: [26, 82.17500305175781, 22],
        meshes: 3,
      },
      "port-terminal": {
        objects: 47,
        triangles: 3500,
        min: [-36.5, 0, -26.5],
        max: [36.5, 86.75, 26.5],
        meshes: 4,
      },
      "harbor-crane": {
        objects: 78,
        triangles: 4016,
        min: [-19, 0, -39],
        max: [19, 95.20000457763672, 48.15924072265625],
        meshes: 3,
      },
      "cargo-stack": {
        objects: 52,
        triangles: 6316,
        min: [-15, 0, -13.5],
        max: [15, 14.980000495910645, 13.5],
        meshes: 3,
      },
      "track-pylon": {
        objects: 7,
        triangles: 308,
        min: [-4.699999809265137, 0, -1.75],
        max: [1.25, 14.300000190734863, 1.75],
        meshes: 2,
      },
    },
    glbBytes: 3474040,
  },
  xx = `models/port-life.glb`,
  Sx = [
    `cargo-shuttle`,
    `service-drone`,
    `turbine-tower`,
    `turbine-rotor`,
    `navigation-beacon`,
    `service-pier`,
  ],
  Cx = {
    maxBatches: 11,
    maxPrototypeTriangles: 7500,
    maxInstanceTriangles: 7e4,
    trafficClearance: 18,
    machineryClearance: 12,
  };
