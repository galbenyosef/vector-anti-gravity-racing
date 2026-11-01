// assets__game-D43Oxqny 77 — layout
// Lines 32241-32586 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var Rx = class e {
    static async load() {
      let { scene: t } = await Ya(Nx, 2);
      return new e(t);
    }
    constructor(e) {
      ((this.group = new An()),
        (this.layout = Lx()),
        (this.batches = []),
        (this.transform = new k()),
        (this.rotation = new Rn()),
        (this.euler = new ue()),
        (this.position = new A()),
        (this.scale = new A(1, 1, 1)),
        (this.clock = 0),
        (this.highQuality = !0),
        (this.reducedMotion = !1),
        (this.disposed = !1),
        (this.initialized = !1),
        (this.prototypeTriangles = 0),
        (this.textureMaps = 0),
        (this.group.name = `Solstice Port · living service fleet`),
        e.updateMatrixWorld(!0));
      let t = new Set();
      try {
        for (let n of Px) {
          let r = e.children.find((e) => e.userData.assetId === n);
          if (!r) throw Error(`Port life kit is missing ${n}.`);
          let i = this.assetCount(n, !0);
          r.traverse((e) => {
            if (!(e instanceof M)) return;
            let r =
              (e.geometry.index?.count ??
                e.geometry.attributes.position.count) / 3;
            this.prototypeTriangles += r;
            let a = ao(
              e.geometry.clone().applyMatrix4(e.matrixWorld),
              e.material,
              i,
            );
            ((a.name = `${n} · shared service kit`),
              (a.castShadow = a.receiveShadow = !1),
              a.instanceMatrix.setUsage(Ge),
              (a.boundingSphere = new yt(new A(0, 80, 0), 1100)));
            for (let n of Array.isArray(e.material) ? e.material : [e.material])
              for (let e of Object.values(n)) e instanceof bn && t.add(e);
            (this.group.add(a),
              this.batches.push({ asset: n, mesh: a, triangles: r }));
          });
        }
        if (
          ((this.textureMaps = t.size),
          this.batches.length > Fx.maxBatches ||
            this.prototypeTriangles > Fx.maxPrototypeTriangles ||
            this.info.instanceTriangles > Fx.maxInstanceTriangles)
        )
          throw Error(`Port life kit exceeds its GPU geometry budget.`);
        (this.update(0, 0, 0, !0, !1),
          e.traverse((e) => {
            e instanceof M && e.geometry.dispose();
          }),
          Wa(e, this.group));
      } catch (t) {
        for (let { mesh: e } of this.batches)
          (e.geometry.dispose(), e.dispose());
        throw (Oc(e), t);
      }
    }
    assetCount(e, t) {
      if (e === `cargo-shuttle` || e === `service-drone`) {
        let n = this.layout.flights.filter((t) => t.asset === e).length;
        return t ? n : Math.min(n, e === `cargo-shuttle` ? 3 : 2);
      }
      return e === `navigation-beacon`
        ? t
          ? this.layout.beacons.length
          : Math.min(12, this.layout.beacons.length)
        : e === `service-pier`
          ? this.assetCount(`turbine-tower`, t) +
            this.assetCount(`navigation-beacon`, t)
          : t
            ? this.layout.turbines.length
            : Math.min(4, this.layout.turbines.length);
    }
    update(e, t, n, r, i) {
      if (this.disposed) return;
      let a = this.clock,
        o = this.highQuality !== r;
      if (
        (Number.isFinite(e) && e > 0 && !i && (this.clock += e),
        (this.highQuality = r),
        (this.reducedMotion = i),
        !(this.initialized && a === this.clock && !o))
      ) {
        for (let { asset: e, mesh: t } of this.batches) {
          if (
            this.initialized &&
            !o &&
            (e === `turbine-tower` ||
              e === `navigation-beacon` ||
              e === `service-pier`)
          )
            continue;
          let n = this.assetCount(e, r);
          t.count = n;
          let i = this.layout.flights.filter((t) => t.asset === e);
          for (let a = 0; a < n; a++) {
            if (
              (this.scale.set(1, 1, 1),
              e === `cargo-shuttle` || e === `service-drone`)
            ) {
              let e = Ix(i[a], this.clock);
              (this.position.set(e.x, e.y, e.z),
                this.euler.set(0, e.yaw, e.bank, `YXZ`));
            } else if (e === `service-pier`) {
              let e = this.assetCount(`turbine-tower`, r),
                t = a < e,
                n = t ? this.layout.turbines[a] : this.layout.beacons[a - e];
              (this.position.set(n.x, -4, n.z),
                this.euler.set(0, n.yaw, 0),
                this.scale.set(t ? 1 : 0.3, n.y + 4, t ? 1 : 0.3));
            } else {
              let t =
                e === `navigation-beacon`
                  ? this.layout.beacons[a]
                  : this.layout.turbines[a];
              (this.position.set(
                t.x,
                t.y + (e === `turbine-rotor` ? 16 : 0),
                t.z,
              ),
                this.euler.set(
                  0,
                  t.yaw +
                    (e === `turbine-rotor` ? this.clock * 0.6 + t.phase : 0),
                  0,
                ));
            }
            (this.rotation.setFromEuler(this.euler),
              this.transform.compose(this.position, this.rotation, this.scale),
              t.setMatrixAt(a, this.transform));
          }
          t.instanceMatrix.needsUpdate = !0;
        }
        this.initialized = !0;
      }
    }
    get info() {
      let e = Object.fromEntries(
        Px.map((e) => [e, this.assetCount(e, this.highQuality)]),
      );
      return {
        loaded: !this.disposed,
        source: `Blender`,
        drawBatches: this.batches.length,
        prototypeTriangles: this.prototypeTriangles,
        instanceTriangles: this.batches.reduce(
          (e, t) =>
            e + t.triangles * this.assetCount(t.asset, this.highQuality),
          0,
        ),
        textureMaps: this.textureMaps,
        castsShadows: !1,
        highQuality: this.highQuality,
        reducedMotion: this.reducedMotion,
        animationTime: +this.clock.toFixed(3),
        counts: e,
      };
    }
    dispose() {
      this.disposed ||
        ((this.disposed = !0),
        this.group.removeFromParent(),
        Oc(this.group),
        this.group.clear());
    }
  },
  zx = {
    metal: {
      count: 40,
      layers: [
        {
          kind: `spark`,
          share: 0.85,
          speed: [12, 32],
          spread: 0.45,
          life: [0.18, 0.55],
          size: [0.05, 0.025],
          colors: [`#ffb452`, `#ffd9a0`, `#ff8a3d`],
          brightness: 6,
          gravity: 18,
          drag: 1.2,
          floor: !0,
        },
        {
          kind: `smoke`,
          share: 0.15,
          speed: [1, 3.5],
          spread: 0.9,
          life: [0.45, 1],
          size: [0.35, 1.4],
          colors: [`#7d868d`, `#9aa3aa`],
          brightness: 1,
          gravity: -1.2,
          drag: 2.5,
          floor: !1,
        },
      ],
    },
    stone: {
      count: 36,
      layers: [
        {
          kind: `dust`,
          share: 0.55,
          speed: [2, 7],
          spread: 0.95,
          life: [0.7, 1.5],
          size: [0.45, 2.1],
          colors: [`#b9b0a2`, `#a39a8c`],
          brightness: 1,
          gravity: 0.5,
          drag: 2.8,
          floor: !1,
        },
        {
          kind: `debris`,
          share: 0.45,
          speed: [5, 13],
          spread: 0.6,
          life: [0.6, 1.2],
          size: [0.13, 0.1],
          colors: [`#7a746c`, `#5e5a55`, `#8e877d`],
          brightness: 1,
          gravity: 22,
          drag: 0.35,
          floor: !0,
        },
      ],
    },
    ground: {
      count: 36,
      layers: [
        {
          kind: `debris`,
          share: 0.4,
          speed: [4, 11],
          spread: 0.55,
          life: [0.5, 1],
          size: [0.09, 0.07],
          colors: [`#5a4531`, `#6f573d`, `#4a3a2a`],
          brightness: 1,
          gravity: 20,
          drag: 0.5,
          floor: !0,
        },
        {
          kind: `dust`,
          share: 0.6,
          speed: [1.5, 6],
          spread: 0.9,
          life: [0.8, 1.6],
          size: [0.5, 2.4],
          colors: [`#8a7358`, `#7a654e`],
          brightness: 1,
          gravity: 0.3,
          drag: 2.6,
          floor: !1,
        },
      ],
    },
    energy: {
      count: 32,
      layers: [
        {
          kind: `energy`,
          share: 0.8,
          speed: [3, 9],
          spread: 1,
          life: [0.35, 0.8],
          size: [0.24, 0.04],
          colors: [`#57e3ff`, `#8f7dff`, `#57e3a0`],
          brightness: 5,
          gravity: -2.5,
          drag: 3.2,
          floor: !1,
        },
        {
          kind: `spark`,
          share: 0.2,
          speed: [10, 22],
          spread: 0.7,
          life: [0.12, 0.3],
          size: [0.04, 0.02],
          colors: [`#c9f7ff`],
          brightness: 8,
          gravity: 0,
          drag: 2,
          floor: !1,
        },
      ],
    },
  },
  Bx = { spark: 0, energy: 1, dust: 2, smoke: 3, debris: 4 },
  Vx = new Set([`spark`, `energy`]),
  Hx = 0.03,
  Ux = 1e3,
  Wx = 5,
  Gx = {
    drag: 0.04,
    gravity: 0.22,
    regolith: [`#9a968f`, `#86827b`, `#b0aca4`],
  },
  Kx = new Map(),
  qx = new Map();
function Jx(e, t = !1) {
  let n = t ? qx : Kx,
    r = n.get(e);
  return (
    r ||
      ((r = (
        t && (e.kind === `dust` || e.kind === `debris`) ? Gx.regolith : e.colors
      ).map((t) => new j(t).multiplyScalar(e.brightness))),
      n.set(e, r)),
    r
  );
}
function Yx(e) {
  return () => {
    e = (e + 1831565813) | 0;
    let t = Math.imul(e ^ (e >>> 15), 1 | e);
    return (
      (t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t),
      ((t ^ (t >>> 14)) >>> 0) / 4294967296
    );
  };
}
function Xx() {
  return {
    time: R(0),
    right: R(new A(1, 0, 0)),
    up: R(new A(0, 1, 0)),
    forward: R(new A(0, 0, -1)),
    matterLight: R(1),
  };
}
