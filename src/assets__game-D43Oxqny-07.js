// assets__game-D43Oxqny 07 — position
// Lines 1789-2472 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var jo = class {
    constructor(e, t, n, { debug: r = !1 } = {}) {
      ((this.direction = t),
        (this.quality = `off`),
        (this.mapSize = fo),
        (this.origin = new A()),
        (this.heading = new A()),
        (this.target = new A()),
        (this.chunks = []),
        (this.geometries = []),
        (this.materials = new Map()),
        (this.compact = []),
        (this.hidden = []),
        (this.offset = new A()),
        (this.terrain = new wo()),
        (this.right = new A().crossVectors(new A(0, 1, 0), t).normalize()),
        (this.up = new A().crossVectors(t, this.right).normalize()),
        (this.slots = Array.from({ length: 4 }, (t, n) => new Co(e, n))),
        this.slots.forEach((e, t) => {
          if (t === 0) return;
          let n = e.node,
            r = n.renderShadow.bind(n);
          n.renderShadow = (e) => {
            let n = this.hideCovered(t);
            try {
              r(e);
            } finally {
              for (let e of n) e.visible = !0;
            }
          };
        }),
        this.setQuality(n));
      for (let e of this.slots) e.caster.shadow.needsUpdate = !0;
      ((e.shadow.shadowNode = new Do(e, this.slots, r, this.terrain)),
        (e.castShadow = !0));
    }
    setTerrainShadow(e, t) {
      this.terrain.set(e, t?.minX, t?.minZ, t?.step, t?.count);
    }
    setResolution(e) {
      if (![512, 1024, 2048, 4096].includes(e))
        throw RangeError(`Unsupported sun shadow resolution`);
      if (e === this.mapSize) return !1;
      this.mapSize = e;
      for (let t of this.slots) {
        let n = t.caster.shadow;
        if ((n.mapSize.set(e, e), n.map)) {
          n.map.setSize(e, e, n.map.depth);
          let t = n.map.depthTexture;
          t &&
            ((t.image.width = e), (t.image.height = e), (t.needsUpdate = !0));
        }
        n.needsUpdate = !0;
      }
      return (this.setQuality(this.quality), !0);
    }
    setQuality(e) {
      this.quality = e;
      let t = e === `off` ? null : uo[e],
        n = t ? vo(t, this.mapSize) : [];
      this.slots.forEach((e, r) => {
        let i = n[r] ?? null,
          a = e.caster.shadow;
        if (((e.layout = i), !i || !t)) {
          ((e.active.value = 0), (a.autoUpdate = !1));
          return;
        }
        let o = xo(r),
          s = i.extent / 2;
        e.range = 0.55 * i.extent + go;
        let c = a.camera;
        (Object.assign(c, {
          left: -s,
          right: s,
          top: s,
          bottom: -s,
          near: 1,
          far: e.range + 0.55 * i.extent + 60,
        }),
          c.updateProjectionMatrix(),
          (a.bias = -(_o * i.texel) / (c.far - c.near)),
          (a.normalBias = (1 + o / 2) * i.texel),
          (a.autoUpdate = !0),
          (a.needsUpdate = !0),
          (e.guard.value = (o + 2) / this.mapSize),
          (e.band.value = r === n.length - 1 ? ho : mo),
          (e.active.value = 1));
      });
    }
    update(e, t) {
      (this.heading.set(0, 0, 0),
        e
          ? (e.getWorldPosition(this.origin),
            e.getWorldDirection(this.heading).setY(0))
          : this.origin.copy(t),
        (this.origin.y = t.y));
      let n = this.heading.lengthSq() > 1e-6;
      n && this.heading.normalize();
      for (let e of this.slots) {
        let t = e.layout;
        if (!t) continue;
        (this.target.copy(this.origin),
          n && this.target.addScaledVector(this.heading, t.centre));
        for (let e of [this.right, this.up]) {
          let n = this.target.dot(e);
          this.target.addScaledVector(e, Math.round(n / t.texel) * t.texel - n);
        }
        let { caster: r } = e;
        (r.target.position.copy(this.target),
          r.position.copy(this.target).addScaledVector(this.direction, e.range),
          r.updateMatrixWorld(),
          r.target.updateMatrixWorld());
      }
    }
    addCasterCells(e, t = 200) {
      let n = [];
      e.traverse((e) => {
        e instanceof Dt && e.castShadow && e.parent && n.push(e);
      });
      let r = [];
      for (let e of n) {
        let t = r.find((t) => ko(t[0], e));
        t ? t.push(e) : r.push([e]);
      }
      let i = new k(),
        a = new A();
      for (let e of r) {
        let n = Ao(e),
          r = n
            ? [{ geometry: n.geometry, material: this.casterMaterial(n.side) }]
            : e.map((e) => ({ geometry: e.geometry, material: e.material }));
        n && this.geometries.push(n.geometry);
        let o = e[0],
          s = new Map();
        for (let e = 0; e < o.count; e++) {
          (o.getMatrixAt(e, i), a.setFromMatrixPosition(i));
          let n = `${Math.floor(a.x / t)},${Math.floor(a.z / t)}`,
            r = s.get(n);
          (r || s.set(n, (r = [])), r.push(e));
        }
        for (let e of s.values())
          for (let { geometry: t, material: n } of r) {
            let r = ao(t, n, e.length);
            (e.forEach((e, t) => {
              (o.getMatrixAt(e, i), r.setMatrixAt(t, i));
            }),
              (r.instanceMatrix.needsUpdate = !0),
              (r.name = `${o.name.split(` · `)[0]} · shadow cell`),
              r.position.copy(o.position),
              r.quaternion.copy(o.quaternion),
              r.scale.copy(o.scale),
              (r.castShadow = !0),
              (r.receiveShadow = !1),
              r.layers.set(5),
              r.computeBoundingBox(),
              r.computeBoundingSphere(),
              o.parent.add(r),
              this.chunks.push(r));
          }
        for (let t of e) t.castShadow = !1;
      }
      return this.chunks.length;
    }
    mergeCraftCaster(e, t = /airbrake|cooling/i) {
      e.updateMatrixWorld(!0);
      let n = [];
      if (
        (e.traverse((r) => {
          if (!(r instanceof M) || !r.castShadow) return;
          let i = r.material;
          if (
            !(Array.isArray(i) || !r.geometry.index) &&
            !(i.transparent || i.alphaTest > 0)
          ) {
            for (let n = r; n && n !== e; n = n.parent)
              if (t.test(n.name)) return;
            n.push(r);
          }
        }),
        n.length < 2)
      )
        return 0;
      let r = Oo.get(n[0].geometry);
      if (!r) {
        let t = new k().copy(e.matrixWorld).invert(),
          i = new A(),
          a = 0,
          o = ur(
            n.map((e) => {
              let n = t.clone().multiply(e.matrixWorld),
                r = e.geometry.getAttribute(`position`),
                o = new Float32Array(r.count * 3);
              for (let e = 0; e < r.count; e++)
                i.fromBufferAttribute(r, e)
                  .applyMatrix4(n)
                  .toArray(o, e * 3);
              let s = new Me();
              return (
                s.setAttribute(`position`, new er(o, 3)),
                s.setIndex(e.geometry.getIndex()),
                e.material.side !== 0 && (a = 2),
                s
              );
            }),
          );
        if (!o) return 0;
        (o.computeVertexNormals(),
          o.computeBoundingSphere(),
          (r = { geometry: o, side: a }),
          Oo.set(n[0].geometry, r));
      }
      let i = new M(r.geometry, this.casterMaterial(r.side));
      ((i.name = `Craft shadow caster`),
        (i.castShadow = !0),
        (i.receiveShadow = !1),
        i.layers.set(5),
        i.layers.enable(6),
        (i.userData.craftProxy = !0),
        e.traverse((e) => {
          e.isMesh && (e.userData.proxied = !0);
        }),
        e.add(i));
      for (let e of n) e.castShadow = !1;
      return n.length;
    }
    addCompactCaster(e, t) {
      this.compact.push({ object: e, radius: t });
    }
    hideCovered(e) {
      this.hidden.length = 0;
      for (let { object: t, radius: n } of this.compact)
        if (t.visible) {
          t.getWorldPosition(this.target);
          for (let r = 0; r < e; r++) {
            let e = this.slots[r];
            if (!e.layout) continue;
            let i = (e.guard.value + e.band.value) * e.layout.extent + n,
              a = e.layout.extent / 2 - i,
              o = this.offset.copy(this.target).sub(e.caster.target.position);
            if (
              Math.abs(o.dot(this.right)) <= a &&
              Math.abs(o.dot(this.up)) <= a
            ) {
              ((t.visible = !1), this.hidden.push(t));
              break;
            }
          }
        }
      return this.hidden;
    }
    casterMaterial(e) {
      let t = this.materials.get(e);
      return (
        t ||
          ((t = new b({ side: e })),
          (t.name = `Shadow caster cell`),
          this.materials.set(e, t)),
        t
      );
    }
    snapshot() {
      let e = this.slots
          .filter((e) => e.layout)
          .map((e) => ({
            reach: +e.layout.reach.toFixed(1),
            extent: +e.layout.extent.toFixed(1),
            texelCm: +(e.layout.texel * 100).toFixed(2),
          })),
        t = this.quality === `off` ? null : uo[this.quality];
      return {
        quality: this.quality,
        cascades: e,
        mapSize: t ? this.mapSize : 0,
        reach: t?.distance ?? 0,
        casterCells: this.chunks.length,
        mapMemoryMB: (4 * this.mapSize ** 2 * 4) / 2 ** 20,
      };
    }
    dispose() {
      for (let e of this.slots) (e.node.dispose(), e.caster.shadow.dispose());
      for (let e of this.chunks) (e.removeFromParent(), e.dispose());
      this.chunks.length = 0;
      for (let e of this.geometries) e.dispose();
      for (let e of this.materials.values()) e.dispose();
      ((this.geometries.length = 0),
        this.materials.clear(),
        (this.compact.length = 0),
        this.terrain.dispose());
    }
  },
  Mo = { maxFixtures: 255, slots: 8, cell: 32, maxCells: 128, penumbra: 0.18 },
  No = -3,
  Po = { shadowNode: null, isAnalyticLightNode: !1 },
  Fo = class {
    constructor() {
      ((this.origin = R(new p())),
        (this.cell = R(Mo.cell)),
        (this.cells = R(new p(1, 1))),
        (this.gain = R(1)),
        (this.list = []),
        (this.stats = { cells: [1, 1], cell: 32, busiest: 0, dropped: 0 }));
      let { maxFixtures: e, slots: t, maxCells: r } = Mo;
      ((this.data = new fe(new Float32Array(e * 3 * 4), e, 3, bt, n)),
        (this.grid = new fe(new Uint8Array(r * t * r), r * t, r, te, nr)));
      for (let e of [this.data, this.grid])
        ((e.minFilter = e.magFilter = Ve),
          (e.generateMipmaps = !1),
          (e.needsUpdate = !0));
    }
    get fixtures() {
      return this.list;
    }
    set(e) {
      let { maxFixtures: t, slots: n, maxCells: r } = Mo;
      if (e.length > t) throw Error(`${e.length} fixtures exceed ${t}`);
      this.list = e.map((e) => ({ ...e, position: e.position.clone() }));
      let i = this.data.image.data;
      i.fill(0);
      let a = new j();
      (this.list.forEach((e, n) => {
        (a.set(e.color).multiplyScalar(e.intensity),
          i.set([e.position.x, e.position.y, e.position.z, e.range], n * 4),
          i.set([a.r, a.g, a.b, e.decay ?? 2], (t + n) * 4));
        let r = e.cone?.axis ?? new A(0, -1, 0);
        i.set([r.x, r.y, r.z, e.cone ? e.cone.cos : No], (t * 2 + n) * 4);
      }),
        (this.data.needsUpdate = !0));
      let o = 1 / 0,
        s = 1 / 0,
        c = -1 / 0,
        l = -1 / 0;
      for (let e of this.list)
        ((o = Math.min(o, e.position.x - e.range)),
          (s = Math.min(s, e.position.z - e.range)),
          (c = Math.max(c, e.position.x + e.range)),
          (l = Math.max(l, e.position.z + e.range)));
      this.list.length || (o = s = c = l = 0);
      let u = Math.max(Mo.cell, Math.ceil(Math.max(c - o, l - s) / r)),
        d = Math.max(1, Math.ceil((c - o) / u)),
        f = Math.max(1, Math.ceil((l - s) / u)),
        p = this.grid.image.data;
      p.fill(0);
      let m = Array.from({ length: d * f }, () => []);
      this.list.forEach((e, t) => {
        let n = Math.floor((e.position.x - e.range - o) / u),
          r = Math.floor((e.position.x + e.range - o) / u),
          i = Math.floor((e.position.z - e.range - s) / u),
          a = Math.floor((e.position.z + e.range - s) / u);
        for (let c = Math.max(0, i); c <= Math.min(f - 1, a); c++)
          for (let i = Math.max(0, n); i <= Math.min(d - 1, r); i++) {
            let n = F.clamp(e.position.x, o + i * u, o + (i + 1) * u),
              r = F.clamp(e.position.z, s + c * u, s + (c + 1) * u),
              a = (n - e.position.x) ** 2 + (r - e.position.z) ** 2;
            a > e.range * e.range ||
              m[c * d + i].push({
                index: t,
                reach: e.intensity / Math.max(a, 1),
              });
          }
      });
      let h = 0,
        g = 0;
      (m.forEach((e, t) => {
        ((h = Math.max(h, e.length)),
          (g += Math.max(0, e.length - n)),
          e.sort((e, t) => t.reach - e.reach));
        let i = t % d,
          a = Math.floor(t / d);
        e.slice(0, n).forEach(
          ({ index: e }, t) => (p[a * r * n + i * n + t] = e + 1),
        );
      }),
        (this.grid.needsUpdate = !0),
        this.origin.value.set(o, s),
        (this.cell.value = u),
        this.cells.value.set(d, f),
        (this.stats = { cells: [d, f], cell: u, busiest: h, dropped: g }));
    }
    add(e) {
      this.set([...this.list, ...e]);
    }
    nearest(e, t, n = []) {
      n.length = 0;
      let r = [];
      for (let i of this.list) {
        let a = i.position.distanceToSquared(e),
          o = n.length;
        if (!(o === t && a >= r[o - 1])) {
          for (o === t && o--; o > 0 && r[o - 1] > a;)
            ((n[o] = n[o - 1]), (r[o] = r[o - 1]), o--);
          ((n[o] = i), (r[o] = a));
        }
      }
      return n;
    }
    snapshot() {
      return { count: this.list.length, ...this.stats };
    }
    contribute(e, t) {
      let { slots: n, penumbra: r } = Mo,
        i = t.setupDirectLight.bind(t);
      Hi(() => {
        let t = W.xz.sub(this.origin).div(this.cell).floor();
        ci(
          t.x
            .greaterThanEqual(0)
            .and(t.x.lessThan(this.cells.x))
            .and(t.y.greaterThanEqual(0))
            .and(t.y.lessThan(this.cells.y)),
          () => {
            let a = Jr(t.x),
              o = Jr(t.y);
            di(n, ({ i: t }) => {
              let s = Jr(
                Kr(this.grid, Ar(a.mul(n).add(t), o))
                  .r.mul(255)
                  .round(),
              );
              ci(s.equal(0), () => {
                oi();
              });
              let c = s.sub(1),
                l = Kr(this.data, Ar(c, 0)),
                u = l.xyz.sub(W);
              ci(yi(u, u).lessThan(l.w.mul(l.w)), () => {
                let t = Kr(this.data, Ar(c, 2)),
                  n = Z(
                    t.w,
                    t.w.add(r),
                    yi(u.normalize().negate(), t.xyz),
                  ).toVar();
                ci(n.greaterThan(0), () => {
                  let t = Kr(this.data, Ar(c, 1)),
                    r = _r.mul(U(l.xyz, 1)).xyz.sub(ai);
                  i(
                    e,
                    Po,
                    pr({
                      color: t.rgb.mul(n).mul(this.gain),
                      lightVector: r,
                      cutoffDistance: l.w,
                      decayExponent: t.w,
                    }),
                  );
                });
              });
            });
          },
        );
      }, `void`)();
    }
    dispose() {
      (this.data.dispose(), this.grid.dispose());
    }
  },
  Io = class extends i {
    static get type() {
      return `FixtureLightsNode`;
    }
    constructor(e) {
      (super(), (this.field = e));
    }
    setupLights(e, t) {
      let n = e.context.reflectedLight;
      (n.directDiffuse.toStack(),
        n.directSpecular.toStack(),
        super.setupLights(e, t),
        this.field.contribute(e, this));
    }
    get hasLights() {
      return !0;
    }
  },
  Lo = class extends Oe {
    constructor(e, t) {
      (super(), (this.field = e), (this.scene = t), (this.building = null));
    }
    getNode(e) {
      this.building = e;
      try {
        return super.getNode(e);
      } finally {
        this.building = null;
      }
    }
    createNode(e = []) {
      return (
        this.building === this.scene ? new Io(this.field) : new i()
      ).setLights(e);
    }
  },
  Ro = {
    kinds: {
      rockets: { color: `#ff8a3d`, intensity: 80, range: 18, weight: 1 },
      missile: { color: `#ff4f68`, intensity: 110, range: 22, weight: 1.4 },
      cannon: { color: `#ffd15a`, intensity: 40, range: 12, weight: 0.8 },
      mines: { color: `#b18aff`, intensity: 10, range: 7, weight: 0.5 },
    },
    rise: 0.06,
    ghost: 0.15,
    release: 0.06,
    fade: [70, 110],
    hysteresis: 1.25,
  },
  zo = new Vn(),
  Bo = new k(),
  Vo = new yt(),
  Ho = class {
    constructor(e) {
      this.slots = Array.from({ length: e }, () => {
        let e = new it(`#ffffff`, 0, 12, 2);
        return (
          (e.name = `Ordnance light`),
          {
            light: e,
            key: null,
            kind: null,
            level: 0,
            releasing: !1,
            heir: null,
            score: 0,
          }
        );
      });
    }
    get lights() {
      return this.slots.map((e) => e.light);
    }
    reset() {
      for (let e of this.slots)
        ((e.key = e.kind = null),
          (e.level = e.score = 0),
          (e.releasing = !1),
          (e.heir = null),
          (e.light.intensity = 0));
    }
    update(
      e,
      t,
      n,
      { camera: r, active: i = this.slots.length, gain: a = 1 } = {},
    ) {
      if (!(n > 0)) return;
      let {
        kinds: o,
        rise: s,
        ghost: c,
        release: l,
        fade: u,
        hysteresis: d,
      } = Ro;
      r &&
        (r.updateMatrixWorld(),
        Bo.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse),
        zo.setFromProjectionMatrix(Bo));
      let f = (e) => 1 - F.smoothstep(e.distanceTo(t), u[0], u[1]),
        p = e
          .map((e) => {
            let n = o[e.kind],
              i = e.position.distanceTo(t) < 20;
            Vo.set(e.position, n.range);
            let a = !r || i || zo.intersectsSphere(Vo);
            return {
              emitter: e,
              score:
                n.weight *
                n.intensity *
                (e.priority ?? e.envelope) *
                f(e.position) *
                (a ? 1 : 0.35),
            };
          })
          .sort((e, t) => t.score - e.score),
        m = new Map(p.map((e) => [e.emitter.key, e]));
      for (let e of this.slots) {
        if (e.key === null) continue;
        let t = m.get(e.key);
        (t && e.light.position.copy(t.emitter.position),
          t && !e.releasing
            ? ((e.level = Math.min(t.emitter.envelope, e.level + n / s)),
              (e.score = t.score),
              m.delete(e.key))
            : ((e.level = Math.max(0, e.level - n / (e.releasing ? l : c))),
              (e.score = 0),
              t && m.delete(e.key),
              e.level === 0 &&
                ((e.key = e.kind = e.heir = null), (e.releasing = !1))));
      }
      let h = p.filter((e) => e.score > 0.01 && m.has(e.emitter.key)),
        g = new Set(
          this.slots.filter((e) => e.releasing && e.heir).map((e) => e.heir),
        );
      for (let e of h) {
        let t = this.slots.findIndex((e, t) => t < i && e.key === null);
        if (t >= 0) {
          let n = this.slots[t],
            { emitter: r } = e;
          ((n.key = r.key),
            (n.kind = r.kind),
            (n.level = 0),
            (n.score = e.score),
            n.light.color.set(o[r.kind].color),
            (n.light.distance = o[r.kind].range),
            n.light.position.copy(r.position));
          continue;
        }
        if (g.has(e.emitter.key)) continue;
        let n = this.slots
          .slice(0, i)
          .filter((e) => !e.releasing)
          .sort((e, t) => e.score - t.score)[0];
        n &&
          e.score > n.score * d &&
          ((n.releasing = !0), (n.heir = e.emitter.key), g.add(e.emitter.key));
      }
      this.slots.forEach((e, t) => {
        t >= i && e.key !== null && (e.releasing = !0);
        let n = e.kind ? o[e.kind] : null;
        e.light.intensity = n
          ? n.intensity * e.level * f(e.light.position) * a
          : 0;
      });
    }
    snapshot() {
      return {
        slots: this.slots.length,
        lit: this.slots.filter((e) => e.light.intensity > 1).length,
        kinds: this.slots
          .filter((e) => e.light.intensity > 1)
          .map((e) => e.kind),
      };
    }
  },
  Uo = { azimuth: -131, elevation: 43 },
  Wo = { azimuth: -10, elevation: 12 },
  Go = new A().setFromSphericalCoords(
    1,
    F.degToRad(90 - Uo.elevation),
    F.degToRad(90 - Uo.azimuth),
  ),
  Ko = new A().setFromSphericalCoords(
    1,
    F.degToRad(90 - Wo.elevation),
    F.degToRad(90 - Wo.azimuth),
  ),
  qo = { azimuth: 75, elevation: 11 },
  Jo = new A().setFromSphericalCoords(
    1,
    F.degToRad(90 - qo.elevation),
    F.degToRad(90 - qo.azimuth),
  ),
  Yo = {
    sun: `#fff6ec`,
    sunIntensity: 5.4,
    sky: `#7d9bd6`,
    ground: `#8c857a`,
    fill: { open: 0.07, tunnel: 0.3 },
    exposure: 1.3,
  },
  Xo = { azimuth: 135, elevation: 30 },
  Zo = new A().setFromSphericalCoords(
    1,
    F.degToRad(90 - Xo.elevation),
    F.degToRad(90 - Xo.azimuth),
  ),
  Qo = {
    sun: `#ffe9cc`,
    sunIntensity: 4.4,
    sky: `#bcd4ee`,
    ground: `#8a8478`,
    fill: { open: 0.26, tunnel: 0.3 },
    exposure: 1.02,
  },
  $o = { day: `#fff0d5`, night: `#99bbf5` },
  es = { day: 4, night: 1.4 },
  ts = { day: { open: 0.2, tunnel: 0.27 }, night: { open: 1.1, tunnel: 0.72 } },
  ns = {
    sun: `#ffd09a`,
    sunIntensity: 4.2,
    sky: `#bbc0ed`,
    ground: `#c1917b`,
    fill: { open: 0.46, tunnel: 0.38 },
  },
  rs = 450;
