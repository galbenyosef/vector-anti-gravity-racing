// assets__game-CsnOSIff 26 — math
// Lines 7674-8007 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var dd = class {
    constructor({ mobile: e = !1 } = {}) {
      ((this.group = new pn()),
        (this.shadowHeights = new Float32Array()),
        (this.tiles = []),
        (this.textures = []),
        (this.geometries = []),
        (this.materials = []),
        (this.group.name = `Shackleton Rim · regolith`));
      let t = performance.now(),
        n = e ? Au.step * 2 : Au.step;
      ((this.heights = ud(n)), (this.sunShadow = this.createSunShadow()));
      let r = xu(e);
      ((this.mobile = e),
        (this.ready = r.ready),
        (this.terrainMaterial = Cu(r.texture, { mobile: e })),
        this.materials.push(this.terrainMaterial),
        (this.mouths = Rt.filter((e) => !e.glass).flatMap((e) =>
          Eu(e.from * F, e.to * F, Gn),
        )),
        (this.cutMaterial = this.mouths.length
          ? Cu(r.texture, {
              name: `Shackleton regolith (tube mouths)`,
              mobile: e,
              cutouts: this.mouths.map(({ toLocal: e }) => ({
                toLocal: e,
                from: Tu.cut[0],
                to: Tu.cut[1],
                lane: Tu.lane,
                crown: Tu.crown,
              })),
            })
          : null),
        this.cutMaterial && this.materials.push(this.cutMaterial));
      let i = this.createTerrain();
      (this.createFarField(),
        (this.info = {
          tiles: this.tiles.length,
          triangles: i,
          buildMs: Math.round(performance.now() - t),
          step: n,
          size: this.heights.size,
        }));
    }
    heightAt(e, t) {
      let { heights: n, count: r, step: i, minX: a, minZ: o } = this.heights,
        s = (e - a) / i,
        c = (t - o) / i;
      if (s < 0 || c < 0 || s > r - 1 || c > r - 1) return ld(e, t);
      let l = Math.min(r - 2, Math.floor(s)),
        u = Math.min(r - 2, Math.floor(c)),
        d = s - l,
        f = c - u,
        p = n[u * r + l],
        m = n[u * r + l + 1],
        h = n[(u + 1) * r + l],
        g = n[(u + 1) * r + l + 1];
      return p + (m - p) * d + (h - p) * f + (p - m - h + g) * d * f;
    }
    shaded(e, t, n) {
      let { count: r, step: i, minX: a, minZ: o } = this.heights,
        s = (e - a) / i,
        c = (n - o) / i;
      if (s < 0 || c < 0 || s > r - 1 || c > r - 1) return !1;
      let l = Math.min(r - 2, Math.floor(s)),
        u = Math.min(r - 2, Math.floor(c)),
        d = s - l,
        f = c - u,
        p = this.shadowHeights,
        m = p[u * r + l],
        h = p[u * r + l + 1],
        g = p[(u + 1) * r + l],
        _ = p[(u + 1) * r + l + 1];
      return t < m + (h - m) * d + (g - m) * f + (m - h - g + _) * d * f;
    }
    createSunShadow() {
      let { count: e } = this.heights,
        t = xl(this.heights, qo);
      this.shadowHeights = t;
      let n = new Uint16Array(t.length);
      for (let e = 0; e < t.length; e++) n[e] = Me.toHalfFloat(t[e]);
      let r = new re(n, e, e, Ue, kn);
      return (
        (r.name = `Shackleton terrain sun shadow`),
        (r.magFilter = r.minFilter = Fe),
        (r.wrapS = r.wrapT = x),
        (r.generateMipmaps = !1),
        (r.needsUpdate = !0),
        this.textures.push(r),
        r
      );
    }
    tint(e, t, n) {
      let r = s.clamp(n * 9, -0.1, 0.16),
        { bright: i } = Uu(e, t),
        a = (Qc(e / 520, t / 520, 3, 91) - 0.5) * 0.22,
        o = 1 - r + i * 0.3 + a;
      return [o * (1.01 - i * 0.02), o, o * (0.985 + i * 0.03)];
    }
    createTerrain(e = 6) {
      let t = this.mouths.map(({ toWorld: e }) =>
          new g().setFromMatrixPosition(e),
        ),
        n = (e, n) => t.some((t) => Math.hypot(t.x - e, t.z - n) < 48),
        { heights: r, count: i, step: a, minX: o, minZ: s } = this.heights,
        c = (e, t) =>
          r[
            Math.min(i - 1, Math.max(0, t)) * i +
              Math.min(i - 1, Math.max(0, e))
          ],
        l = i - 1,
        u = Math.ceil(l / e),
        d = 0;
      for (let t = 0; t < e; t++)
        for (let r = 0; r < e; r++) {
          let e = r * u,
            i = t * u,
            f = Math.min(l, e + u),
            p = Math.min(l, i + u);
          if (f <= e || p <= i) continue;
          let m = f - e + 1,
            h = p - i + 1,
            g = new Float32Array(m * h * 3),
            _ = new Float32Array(m * h * 3),
            v = new Float32Array(m * h * 3),
            y = [],
            b = [];
          for (let t = 0; t < h; t++)
            for (let n = 0; n < m; n++) {
              let r = e + n,
                l = i + t,
                u = t * m + n,
                d = c(r, l),
                f = o + r * a,
                p = s + l * a;
              g.set([f, d, p], u * 3);
              let h = (c(r + 1, l) - c(r - 1, l)) / (2 * a),
                y = (c(r, l + 1) - c(r, l - 1)) / (2 * a),
                b = Math.hypot(h, 1, y);
              _.set([-h / b, 1 / b, -y / b], u * 3);
              let x =
                (c(r + 1, l) +
                  c(r - 1, l) +
                  c(r, l + 1) +
                  c(r, l - 1) -
                  4 * d) /
                (a * a);
              v.set(this.tint(f, p, x), u * 3);
            }
          for (let t = 0; t < h - 1; t++)
            for (let r = 0; r < m - 1; r++) {
              let c = t * m + r,
                l = c + 1,
                u = c + m,
                d = u + 1,
                f = o + (e + r + 0.5) * a,
                p = s + (i + t + 0.5) * a,
                h = this.cutMaterial && n(f, p) ? b : y;
              (r + t) % 2 ? h.push(c, u, l, l, u, d) : h.push(c, u, d, c, d, l);
            }
          let x = new tr();
          if (
            (x.setAttribute(`position`, new vt(g, 3)),
            x.setAttribute(`normal`, new vt(_, 3)),
            x.setAttribute(`tint`, new vt(v, 3)),
            x.setIndex(y),
            x.computeBoundingBox(),
            x.computeBoundingSphere(),
            b.length && this.cutMaterial)
          ) {
            let e = new tr();
            for (let t of [`position`, `normal`, `tint`])
              e.setAttribute(t, x.getAttribute(t));
            (e.setIndex(b), e.computeBoundingBox(), e.computeBoundingSphere());
            let n = new N(e, this.cutMaterial);
            ((n.name = `Shackleton tube mouth ground ${r},${t}`),
              (n.castShadow = !1),
              (n.receiveShadow = !0),
              (n.renderOrder = 1),
              (n.userData.proxied = !0),
              this.geometries.push(e),
              this.tiles.push(n),
              this.group.add(n),
              (d += b.length / 3));
          }
          let S = new N(x, this.terrainMaterial);
          ((S.name = `Shackleton terrain tile ${r},${t}`),
            (S.castShadow = !1),
            (S.receiveShadow = !0),
            this.geometries.push(x),
            this.tiles.push(S),
            this.group.add(S),
            (d += y.length / 3));
        }
      return d;
    }
    createFarField() {
      let { farSize: e, farStep: t } = Au,
        { centerX: n, centerZ: r } = id(),
        i = this.heights.size / 2,
        a = Math.round(e / t) + 1,
        o = new Float32Array(a * a * 3),
        s = new Float32Array(a * a * 3);
      for (let c = 0; c < a; c++)
        for (let l = 0; l < a; l++) {
          let u = n - e / 2 + l * t,
            d = r - e / 2 + c * t,
            f = Math.min(i - Math.abs(u - n), i - Math.abs(d - r)),
            p = f > t * 1.5 ? -400 : ld(u, d) - (f > 0 ? 2 : 0.6);
          (o.set([u, p, d], (c * a + l) * 3),
            s.set(this.tint(u, d, 0), (c * a + l) * 3));
        }
      let c = [];
      for (let e = 0; e < a - 1; e++)
        for (let t = 0; t < a - 1; t++) {
          let n = e * a + t,
            r = n + 1,
            i = n + a,
            o = i + 1;
          c.push(n, i, r, r, i, o);
        }
      let l = new tr();
      (l.setAttribute(`position`, new vt(o, 3)),
        l.setAttribute(`tint`, new vt(s, 3)),
        l.setIndex(c),
        l.computeVertexNormals());
      let u = new N(l, this.terrainMaterial);
      ((u.name = `Shackleton far terrain`),
        (u.userData.proxied = !0),
        (u.receiveShadow = !1),
        (u.castShadow = !1),
        this.geometries.push(l),
        this.group.add(u));
    }
    dispose() {
      (this.geometries.forEach((e) => e.dispose()),
        this.materials.forEach((e) => e.dispose()),
        this.textures.forEach((e) => e.dispose()),
        Su(this.mobile),
        this.group.clear());
    }
  },
  fd = `models/shackleton-base-kit.glb`,
  pd =
    `starship-hls.starship-cargo.biodome.habitat-module.habitat-inflatable.printed-habitat.solar-mast.fission-reactor.comms-dish-base.comms-dish-head.comms-mast.landing-pad.isru-plant.fuel-tanks.lunar-rover.ltv-rover.power-pylon.cable-spool.crater-beacon.pad-light.boulder-a.boulder-b.boulder-c.boulder-d.boulder-c-lod.boulder-d-lod.boulder-field.lava-tube-portal.mass-driver.mass-driver-pylon`.split(
      `.`,
    ),
  md = {
    commsHeadPivot: [0, 12, 0],
    biodome: {
      corridorHalfWidth: 22.5,
      trackHeight: 4,
      portalWidth: 45,
      portalHeight: 21.5,
      portalX: 95.65,
      sleeveFrom: 63,
    },
    lavaTube: {
      mouthX: -20,
      deckHeight: 0.5,
      lane: 22,
      crown: 19,
      clearance: 3.4,
      arches: [-23.7, -25.2],
    },
    massDriver: {
      length: 120,
      pitchDegrees: 10,
      end: [118.177, 20.838, 0],
      supports: [
        [13.033, -4.81, 0],
        [36.669, -0.642, 0],
        [60.304, 3.525, 0],
        [83.939, 7.693, 0],
        [107.575, 11.86, 0],
      ],
      pylonSection: 10,
    },
  };
function hd(e, t) {
  let n = e.x * Math.sin(t) + e.z * Math.cos(t);
  return Math.atan2(n, e.y);
}
var gd = new D(),
  _d = new Ot(),
  vd = new g(),
  yd = new g();
function bd(e, t = md.commsHeadPivot, n = new M(), r) {
  let i = e.scale ?? 1;
  (gd.set(e.roll ?? 0, e.yaw, e.pitch ?? 0, `YZX`), _d.setFromEuler(gd));
  let a = new g(...e.position);
  if (e.asset === `comms-dish-head`) {
    let n = r ?? e,
      i = n.scale ?? 1;
    (vd
      .set(t[0] * i, t[1] * i * (n.scaleY ?? 1), t[2] * i)
      .applyAxisAngle(Je.DEFAULT_UP, n.yaw),
      a.add(vd));
  }
  return (yd.set(i, i * (e.scaleY ?? 1), i), n.compose(a, _d, yd));
}
function xd(e) {
  return e
    .filter((e) => e.asset === `mass-driver`)
    .flatMap((e) => {
      let t = bd(e);
      return md.massDriver.supports.map((e) => new g(...e).applyMatrix4(t));
    });
}
function Sd(e) {
  let t = e.filter(
    (e) => e.asset === `mass-driver-pylon` && e.scaleY === void 0,
  );
  if (t.length < 2) return e;
  let n = xd(e),
    { pylonSection: r } = md.massDriver,
    i = new Map(),
    a = new Set();
  for (let e of t) {
    let t = n.find(
      (t) => Math.hypot(t.x - e.position[0], t.z - e.position[2]) < 1,
    );
    if (!t) continue;
    a.add(e);
    let r = i.get(t);
    (!r || e.position[1] < r.position[1]) &&
      i.set(t, { ...e, position: [t.x, e.position[1], t.z] });
  }
  let o = [...i].map(([e, t]) => {
    let n = t.scale ?? 1;
    return { ...t, scaleY: Math.max(0.05, (e.y - t.position[1]) / (r * n)) };
  });
  return [...e.filter((e) => !a.has(e)), ...o];
}
