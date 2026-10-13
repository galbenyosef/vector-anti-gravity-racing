// assets__game-CsnOSIff 07 — position
// Lines 1772-2455 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Ao = class {
    constructor(e, t, n, { debug: r = !1 } = {}) {
      ((this.direction = t),
        (this.quality = `off`),
        (this.mapSize = uo),
        (this.origin = new g()),
        (this.heading = new g()),
        (this.target = new g()),
        (this.chunks = []),
        (this.geometries = []),
        (this.materials = new Map()),
        (this.compact = []),
        (this.hidden = []),
        (this.offset = new g()),
        (this.terrain = new Co()),
        (this.right = new g().crossVectors(new g(0, 1, 0), t).normalize()),
        (this.up = new g().crossVectors(t, this.right).normalize()),
        (this.slots = Array.from({ length: 4 }, (t, n) => new So(e, n))),
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
      ((e.shadow.shadowNode = new Eo(e, this.slots, r, this.terrain)),
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
      let t = e === `off` ? null : lo[e],
        n = t ? _o(t, this.mapSize) : [];
      this.slots.forEach((e, r) => {
        let i = n[r] ?? null,
          a = e.caster.shadow;
        if (((e.layout = i), !i || !t)) {
          ((e.active.value = 0), (a.autoUpdate = !1));
          return;
        }
        let o = bo(r),
          s = i.extent / 2;
        e.range = 0.55 * i.extent + ho;
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
          (a.bias = -(go * i.texel) / (c.far - c.near)),
          (a.normalBias = (1 + o / 2) * i.texel),
          (a.autoUpdate = !0),
          (a.needsUpdate = !0),
          (e.guard.value = (o + 2) / this.mapSize),
          (e.band.value = r === n.length - 1 ? mo : po),
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
        e instanceof Wn && e.castShadow && e.parent && n.push(e);
      });
      let r = [];
      for (let e of n) {
        let t = r.find((t) => Oo(t[0], e));
        t ? t.push(e) : r.push([e]);
      }
      let i = new M(),
        a = new g();
      for (let e of r) {
        let n = ko(e),
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
            let r = io(t, n, e.length);
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
          if (!(r instanceof N) || !r.castShadow) return;
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
      let r = Do.get(n[0].geometry);
      if (!r) {
        let t = new M().copy(e.matrixWorld).invert(),
          i = new g(),
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
              let s = new tr();
              return (
                s.setAttribute(`position`, new vt(o, 3)),
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
          Do.set(n[0].geometry, r));
      }
      let i = new N(r.geometry, this.casterMaterial(r.side));
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
          ((t = new we({ side: e })),
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
        t = this.quality === `off` ? null : lo[this.quality];
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
  jo = { maxFixtures: 255, slots: 8, cell: 32, maxCells: 128, penumbra: 0.18 },
  Mo = -3,
  No = { shadowNode: null, isAnalyticLightNode: !1 },
  Po = class {
    constructor() {
      ((this.origin = L(new b())),
        (this.cell = L(jo.cell)),
        (this.cells = L(new b(1, 1))),
        (this.gain = L(1)),
        (this.list = []),
        (this.stats = { cells: [1, 1], cell: 32, busiest: 0, dropped: 0 }));
      let { maxFixtures: e, slots: t, maxCells: n } = jo;
      ((this.data = new re(new Float32Array(e * 3 * 4), e, 3, Nn, Oe)),
        (this.grid = new re(new Uint8Array(n * t * n), n * t, n, Ue, qn)));
      for (let e of [this.data, this.grid])
        ((e.minFilter = e.magFilter = u),
          (e.generateMipmaps = !1),
          (e.needsUpdate = !0));
    }
    get fixtures() {
      return this.list;
    }
    set(e) {
      let { maxFixtures: t, slots: n, maxCells: r } = jo;
      if (e.length > t) throw Error(`${e.length} fixtures exceed ${t}`);
      this.list = e.map((e) => ({ ...e, position: e.position.clone() }));
      let i = this.data.image.data;
      i.fill(0);
      let a = new _();
      (this.list.forEach((e, n) => {
        (a.set(e.color).multiplyScalar(e.intensity),
          i.set([e.position.x, e.position.y, e.position.z, e.range], n * 4),
          i.set([a.r, a.g, a.b, e.decay ?? 2], (t + n) * 4));
        let r = e.cone?.axis ?? new g(0, -1, 0);
        i.set([r.x, r.y, r.z, e.cone ? e.cone.cos : Mo], (t * 2 + n) * 4);
      }),
        (this.data.needsUpdate = !0));
      let o = 1 / 0,
        c = 1 / 0,
        l = -1 / 0,
        u = -1 / 0;
      for (let e of this.list)
        ((o = Math.min(o, e.position.x - e.range)),
          (c = Math.min(c, e.position.z - e.range)),
          (l = Math.max(l, e.position.x + e.range)),
          (u = Math.max(u, e.position.z + e.range)));
      this.list.length || (o = c = l = u = 0);
      let d = Math.max(jo.cell, Math.ceil(Math.max(l - o, u - c) / r)),
        f = Math.max(1, Math.ceil((l - o) / d)),
        p = Math.max(1, Math.ceil((u - c) / d)),
        m = this.grid.image.data;
      m.fill(0);
      let h = Array.from({ length: f * p }, () => []);
      this.list.forEach((e, t) => {
        let n = Math.floor((e.position.x - e.range - o) / d),
          r = Math.floor((e.position.x + e.range - o) / d),
          i = Math.floor((e.position.z - e.range - c) / d),
          a = Math.floor((e.position.z + e.range - c) / d);
        for (let l = Math.max(0, i); l <= Math.min(p - 1, a); l++)
          for (let i = Math.max(0, n); i <= Math.min(f - 1, r); i++) {
            let n = s.clamp(e.position.x, o + i * d, o + (i + 1) * d),
              r = s.clamp(e.position.z, c + l * d, c + (l + 1) * d),
              a = (n - e.position.x) ** 2 + (r - e.position.z) ** 2;
            a > e.range * e.range ||
              h[l * f + i].push({
                index: t,
                reach: e.intensity / Math.max(a, 1),
              });
          }
      });
      let v = 0,
        y = 0;
      (h.forEach((e, t) => {
        ((v = Math.max(v, e.length)),
          (y += Math.max(0, e.length - n)),
          e.sort((e, t) => t.reach - e.reach));
        let i = t % f,
          a = Math.floor(t / f);
        e.slice(0, n).forEach(
          ({ index: e }, t) => (m[a * r * n + i * n + t] = e + 1),
        );
      }),
        (this.grid.needsUpdate = !0),
        this.origin.value.set(o, c),
        (this.cell.value = d),
        this.cells.value.set(f, p),
        (this.stats = { cells: [f, p], cell: d, busiest: v, dropped: y }));
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
      let { slots: n, penumbra: r } = jo,
        i = t.setupDirectLight.bind(t);
      Vi(() => {
        let t = U.xz.sub(this.origin).div(this.cell).floor();
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
                u = l.xyz.sub(U);
              ci(vi(u, u).lessThan(l.w.mul(l.w)), () => {
                let t = Kr(this.data, Ar(c, 2)),
                  n = Z(
                    t.w,
                    t.w.add(r),
                    vi(u.normalize().negate(), t.xyz),
                  ).toVar();
                ci(n.greaterThan(0), () => {
                  let t = Kr(this.data, Ar(c, 1)),
                    r = _r.mul(H(l.xyz, 1)).xyz.sub(ai);
                  i(
                    e,
                    No,
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
  Fo = class extends Ae {
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
  Io = class extends ut {
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
        this.building === this.scene ? new Fo(this.field) : new Ae()
      ).setLights(e);
    }
  },
  Lo = {
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
  Ro = new jt(),
  zo = new M(),
  Bo = new Mn(),
  Vo = class {
    constructor(e) {
      this.slots = Array.from({ length: e }, () => {
        let e = new $e(`#ffffff`, 0, 12, 2);
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
        rise: c,
        ghost: l,
        release: u,
        fade: d,
        hysteresis: f,
      } = Lo;
      r &&
        (r.updateMatrixWorld(),
        zo.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse),
        Ro.setFromProjectionMatrix(zo));
      let p = (e) => 1 - s.smoothstep(e.distanceTo(t), d[0], d[1]),
        m = e
          .map((e) => {
            let n = o[e.kind],
              i = e.position.distanceTo(t) < 20;
            Bo.set(e.position, n.range);
            let a = !r || i || Ro.intersectsSphere(Bo);
            return {
              emitter: e,
              score:
                n.weight *
                n.intensity *
                (e.priority ?? e.envelope) *
                p(e.position) *
                (a ? 1 : 0.35),
            };
          })
          .sort((e, t) => t.score - e.score),
        h = new Map(m.map((e) => [e.emitter.key, e]));
      for (let e of this.slots) {
        if (e.key === null) continue;
        let t = h.get(e.key);
        (t && e.light.position.copy(t.emitter.position),
          t && !e.releasing
            ? ((e.level = Math.min(t.emitter.envelope, e.level + n / c)),
              (e.score = t.score),
              h.delete(e.key))
            : ((e.level = Math.max(0, e.level - n / (e.releasing ? u : l))),
              (e.score = 0),
              t && h.delete(e.key),
              e.level === 0 &&
                ((e.key = e.kind = e.heir = null), (e.releasing = !1))));
      }
      let g = m.filter((e) => e.score > 0.01 && h.has(e.emitter.key)),
        _ = new Set(
          this.slots.filter((e) => e.releasing && e.heir).map((e) => e.heir),
        );
      for (let e of g) {
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
        if (_.has(e.emitter.key)) continue;
        let n = this.slots
          .slice(0, i)
          .filter((e) => !e.releasing)
          .sort((e, t) => e.score - t.score)[0];
        n &&
          e.score > n.score * f &&
          ((n.releasing = !0), (n.heir = e.emitter.key), _.add(e.emitter.key));
      }
      this.slots.forEach((e, t) => {
        t >= i && e.key !== null && (e.releasing = !0);
        let n = e.kind ? o[e.kind] : null;
        e.light.intensity = n
          ? n.intensity * e.level * p(e.light.position) * a
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
  Ho = { azimuth: -131, elevation: 43 },
  Uo = { azimuth: -10, elevation: 12 },
  Wo = new g().setFromSphericalCoords(
    1,
    s.degToRad(90 - Ho.elevation),
    s.degToRad(90 - Ho.azimuth),
  ),
  Go = new g().setFromSphericalCoords(
    1,
    s.degToRad(90 - Uo.elevation),
    s.degToRad(90 - Uo.azimuth),
  ),
  Ko = { azimuth: 75, elevation: 11 },
  qo = new g().setFromSphericalCoords(
    1,
    s.degToRad(90 - Ko.elevation),
    s.degToRad(90 - Ko.azimuth),
  ),
  Jo = {
    sun: `#fff6ec`,
    sunIntensity: 5.4,
    sky: `#7d9bd6`,
    ground: `#8c857a`,
    fill: { open: 0.07, tunnel: 0.3 },
    exposure: 1.3,
  },
  Yo = { azimuth: 135, elevation: 30 },
  Xo = new g().setFromSphericalCoords(
    1,
    s.degToRad(90 - Yo.elevation),
    s.degToRad(90 - Yo.azimuth),
  ),
  Zo = {
    sun: `#ffe9cc`,
    sunIntensity: 4.4,
    sky: `#bcd4ee`,
    ground: `#8a8478`,
    fill: { open: 0.26, tunnel: 0.3 },
    exposure: 1.02,
  },
  Qo = { day: `#fff0d5`, night: `#99bbf5` },
  $o = { day: 4, night: 1.4 },
  es = { day: { open: 0.2, tunnel: 0.27 }, night: { open: 1.1, tunnel: 0.72 } },
  ts = {
    sun: `#ffd09a`,
    sunIntensity: 4.2,
    sky: `#bbc0ed`,
    ground: `#c1917b`,
    fill: { open: 0.46, tunnel: 0.38 },
  },
  ns = 450;
