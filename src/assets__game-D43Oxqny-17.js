// assets__game-D43Oxqny 17 — mul
// Lines 5056-5417 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var Ol = class {
    constructor(e, { mobile: t = !1 } = {}) {
      ((this.time = e),
        (this.group = new An()),
        (this.tiles = []),
        (this.textures = []),
        (this.geometries = []),
        (this.materials = []),
        (this.strata = Dl()),
        (this.ripples = El()),
        (this.dune = null),
        (this.group.name = `Sirocco Oasis · desert`));
      let n = performance.now(),
        r = t ? Wc.step * 2 : Wc.step;
      ((this.heights = xl(r)),
        (this.sunShadow = this.createSunShadow()),
        (this.skyDome = this.createSky()),
        (this.terrainMaterial = this.createTerrainMaterial()));
      let i = this.createTerrain();
      (this.createFarField(),
        this.createWater(),
        (this.info = {
          tiles: this.tiles.length,
          triangles: i,
          buildMs: Math.round(performance.now() - n),
          step: r,
        }));
    }
    heightAt(e, t) {
      let { heights: n, count: r, step: i, minX: a, minZ: o } = this.heights,
        s = (e - a) / i,
        c = (t - o) / i;
      if (s < 0 || c < 0 || s > r - 1 || c > r - 1) return bl(e, t);
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
    createSunShadow() {
      let { count: e } = this.heights,
        t = Sl(this.heights, Ko),
        n = new Uint16Array(t.length);
      for (let e = 0; e < t.length; e++) n[e] = sr.toHalfFloat(t[e]);
      let r = new fe(n, e, e, te, Kt);
      return (
        (r.name = `Sirocco terrain sun shadow`),
        (r.magFilter = r.minFilter = d),
        (r.wrapS = r.wrapT = m),
        (r.generateMipmaps = !1),
        (r.needsUpdate = !0),
        this.textures.push(r),
        r
      );
    }
    createSky() {
      let e = new At({ side: 1, depthWrite: !1, fog: !1 });
      e.name = `Sirocco sunset sky`;
      let t = Zi.normalize(),
        n = t.y,
        r = t.dot(J(Ko)).max(0),
        i = Y(
          Y(
            G(Cl.horizon),
            Y(G(Cl.sky), G(Cl.zenith), Z(0.16, 0.78, n)),
            Z(0, 0.36, n),
          ),
          G(`#ffd096`),
          r
            .pow(5)
            .mul(0.7)
            .mul(V(1).sub(Z(0.18, 0.65, n))),
        ),
        a = J(this.time.mul(7e-4), 0, this.time.mul(25e-5)),
        o = Ii(t.add(a).mul(J(2.4, 22, 6)))
          .mul(0.72)
          .add(Ii(t.add(a).mul(J(6, 48, 13))).mul(0.28))
          .smoothstep(0.04, 0.54)
          .mul(Z(0.015, 0.1, n))
          .mul(V(1).sub(Z(0.5, 0.84, n))),
        s = Y(G(`#8c739f`), G(`#ffd1a1`), r.pow(1.6)),
        c = r.smoothstep(
          Math.cos(F.degToRad(1.05)),
          Math.cos(F.degToRad(0.65)),
        ),
        l = V(1).sub(o.mul(0.68)),
        u = Y(i, s, o.mul(0.68))
          .add(c.mul(J(9, 5.5, 2.4)).mul(l))
          .add(
            r
              .pow(420)
              .mul(J(1.15, 0.47, 0.15))
              .mul(l),
          )
          .add(r.pow(22).mul(J(0.42, 0.15, 0.045)))
          .add(r.pow(3).mul(J(0.055, 0.016, 0.008)));
      e.colorNode = Y(G(Cl.ground).mul(0.75), u, Z(-0.12, 0.015, n));
      let d = new M(new nn(6500, 40, 24), e);
      return (
        (d.name = `Sirocco sky dome`),
        (d.frustumCulled = !1),
        this.geometries.push(d.geometry),
        this.materials.push(e),
        this.group.add(d),
        d
      );
    }
    createRockMaterial() {
      let e = la(),
        t = new I({
          name: `Sirocco sandstone (world strata)`,
          roughness: 0.88,
          metalness: 0,
        }),
        n = W,
        r = Ui,
        i = z(e, n.xz.div(410)).g.sub(0.5).mul(22),
        a = z(this.strata, q(0.5, n.y.add(i).div(96))),
        o = Y(n.x, n.z, r.x.abs()),
        s = z(e, q(o.div(38), n.y.div(260))).r.smoothstep(0.45, 0.8),
        c = z(e, n.xz.add(n.y).div(3.1)).g.mul(0.24).add(0.88),
        l = Z(0.55, 0.9, r.y);
      t.colorNode = Y(
        a.rgb.mul(V(1).sub(s.mul(0.3))).mul(c),
        G(Cl.sandLight),
        l.mul(0.7),
      );
      let u = z(e, q(o.div(6), n.y.div(6)))
          .ba.mul(2)
          .sub(1)
          .mul(0.4),
        d = r.add(J(u.x, u.y, u.x.negate()).mul(0.5)).normalize();
      return (
        (t.normalNode = _r.mul(U(d, 0)).xyz.normalize()),
        this.materials.push(t),
        t
      );
    }
    get duneMaterial() {
      return ((this.dune ??= this.createTerrainMaterial(!1)), this.dune);
    }
    createTerrainMaterial(e = !0) {
      let t = this.ripples,
        n = this.strata,
        r = la();
      this.textures.includes(t) || this.textures.push(t, n);
      let i = new I({
          name: e ? `Sirocco terrain` : `Sirocco dune sand`,
          roughness: 0.9,
          metalness: 0,
        }),
        a = W,
        o = Ui,
        s = e ? V(1).sub(Z(0.58, 0.78, o.y)) : V(0),
        c = z(r, a.xz.div(620)).g,
        l = z(r, a.xz.div(23)).g,
        u = Y(
          G(Cl.sandDark),
          G(Cl.sandLight),
          c.mul(0.8).add(l.mul(0.35)).sub(0.1).clamp(),
        ),
        d = z(t, a.xz.div(7.5)),
        f = z(r, a.xz.div(410)).g.sub(0.5).mul(22),
        p = z(n, q(0.5, a.y.add(f).div(96))),
        m = Y(a.x, a.z, o.x.abs()),
        h = z(r, q(m.div(38), a.y.div(260))).r.smoothstep(0.45, 0.8),
        g = p.rgb.mul(V(1).sub(h.mul(0.32))),
        _ = V(1)
          .sub(Z(0.25, 1.7, a.y.sub(0)))
          .mul(V(1).sub(s));
      ((i.colorNode = Y(u.mul(d.b.mul(0.35).add(0.85)), g, s)
        .mul(Y(V(1), V(0.6), _))
        .mul(ii(`tint`, `vec3`))),
        (i.roughnessNode = Y(Y(V(0.93), V(0.84), s), V(0.36), _)));
      let v = d.rg.mul(2).sub(1).mul(0.22).mul(V(1).sub(s)),
        y = z(r, q(m.div(9), a.y.div(9)))
          .ba.mul(2)
          .sub(1)
          .mul(0.35)
          .mul(s),
        b = o
          .add(J(v.x, 0, v.y))
          .add(J(y.x, y.y, y.x.negate()).mul(0.6))
          .normalize();
      return (
        (i.normalNode = _r.mul(U(b, 0)).xyz.normalize()),
        this.materials.push(i),
        i
      );
    }
    createTerrain(e = 6) {
      let { heights: t, count: n, step: r, minX: i, minZ: a } = this.heights,
        o = (e, r) =>
          t[
            Math.min(n - 1, Math.max(0, r)) * n +
              Math.min(n - 1, Math.max(0, e))
          ],
        s = n - 1,
        c = Math.ceil(s / e),
        l = 0;
      for (let t = 0; t < e; t++)
        for (let n = 0; n < e; n++) {
          let e = n * c,
            u = t * c,
            d = Math.min(s, e + c),
            f = Math.min(s, u + c);
          if (d <= e || f <= u) continue;
          let p = d - e + 1,
            m = f - u + 1,
            h = new Float32Array(p * m * 3),
            g = new Float32Array(p * m * 3),
            _ = new Float32Array(p * m * 3),
            v = [];
          for (let t = 0; t < m; t++)
            for (let n = 0; n < p; n++) {
              let s = e + n,
                c = u + t,
                l = t * p + n,
                d = o(s, c),
                f = i + s * r,
                m = a + c * r;
              h.set([f, d, m], l * 3);
              let v = (o(s + 1, c) - o(s - 1, c)) / (2 * r),
                y = (o(s, c + 1) - o(s, c - 1)) / (2 * r),
                b = Math.hypot(v, 1, y);
              g.set([-v / b, 1 / b, -y / b], l * 3);
              let x =
                  (o(s + 1, c) +
                    o(s - 1, c) +
                    o(s, c + 1) +
                    o(s, c - 1) -
                    4 * d) /
                  (r * r),
                S = F.clamp(x * 7, -0.12, 0.2),
                C =
                  d > 0.4 && d < 11
                    ? (1 -
                        F.smoothstep(Math.hypot(f - 250, m - 220), 170, 330)) *
                      0.22
                    : 0,
                w = 1 - S - C * 0.6;
              _.set(
                [w * (1 - C * 0.35), w * (1 - C * 0.1), w * (1 - C * 0.5)],
                l * 3,
              );
            }
          for (let e = 0; e < m - 1; e++)
            for (let t = 0; t < p - 1; t++) {
              let n = e * p + t,
                r = n + 1,
                i = n + p,
                a = i + 1;
              v.push(n, i, r, r, i, a);
            }
          let y = new Me();
          (y.setAttribute(`position`, new er(h, 3)),
            y.setAttribute(`normal`, new er(g, 3)),
            y.setAttribute(`tint`, new er(_, 3)),
            y.setIndex(v),
            y.computeBoundingBox(),
            y.computeBoundingSphere());
          let b = new M(y, this.terrainMaterial);
          b.name = `Sirocco terrain tile ${n},${t}`;
          let x = y.boundingBox;
          ((b.castShadow = x.max.y - x.min.y > 45),
            (b.receiveShadow = !0),
            this.geometries.push(y),
            this.tiles.push(b),
            this.group.add(b),
            (l += v.length / 3));
        }
      return l;
    }
    createFarField() {
      let { farSize: e, farStep: t, centerX: n, centerZ: r, size: i } = Wc,
        a = Math.round(e / t) + 1,
        o = new Float32Array(a * a * 3),
        s = new Float32Array(a * a * 3).fill(1),
        c = i / 2;
      for (let i = 0; i < a; i++)
        for (let s = 0; s < a; s++) {
          let l = n - e / 2 + s * t,
            u = r - e / 2 + i * t,
            d = Math.min(c - Math.abs(l - n), c - Math.abs(u - r)),
            f = d > t * 1.5 ? -80 : bl(l, u) - (d > 0 ? 2 : 0.6);
          o.set([l, f, u], (i * a + s) * 3);
        }
      let l = [];
      for (let e = 0; e < a - 1; e++)
        for (let t = 0; t < a - 1; t++) {
          let n = e * a + t,
            r = n + 1,
            i = n + a,
            o = i + 1;
          l.push(n, i, r, r, i, o);
        }
      let u = new Me();
      (u.setAttribute(`position`, new er(o, 3)),
        u.setAttribute(`tint`, new er(s, 3)),
        u.setIndex(l),
        u.computeVertexNormals());
      let d = new M(u, this.terrainMaterial);
      ((d.name = `Sirocco far dunes`),
        (d.receiveShadow = !1),
        (d.castShadow = !1),
        this.geometries.push(u),
        this.group.add(d));
    }
    createWater() {
      let { heights: e, count: t, step: n, minX: r, minZ: i } = this.heights,
        a = new Uint8Array(t * t * 4);
      for (let n = 0; n < t * t; n++) {
        let t = F.clamp((0 - e[n]) / 7, 0, 1);
        ((a[n * 4] = Math.round(t * 255)), (a[n * 4 + 3] = 255));
      }
      let o = Tl(a, t, t, `Sirocco water depth`, !1, m);
      this.textures.push(o);
      let s = new zn({
          name: `Sirocco lagoon`,
          roughness: 0.06,
          metalness: 0,
          ior: 1.333,
        }),
        c = W,
        l = (t - 1) * n,
        u = z(o, q(c.x.sub(r).div(l), c.z.sub(i).div(l))).r,
        d = Ii(J(c.x.mul(0.09), c.z.mul(0.13), this.time.mul(0.35))),
        f = Ii(J(c.x.mul(0.31).add(21), c.z.mul(0.23), this.time.mul(0.28))),
        p = Y(
          Y(G(Cl.shallow), G(Cl.lagoon), Z(0.02, 0.35, u)),
          G(Cl.deep),
          Z(0.35, 1, u),
        ),
        h = V(1)
          .sub(Z(0, 0.07, u))
          .mul(d.mul(0.5).add(0.5).smoothstep(0.35, 0.75));
      ((s.colorNode = Y(p, G(`#f6fbf7`), h.mul(0.7))),
        (s.roughnessNode = Y(V(0.05), V(0.5), h)));
      let g = J(d.mul(0.1), 1, f.mul(0.08)).normalize();
      s.normalNode = _r.mul(U(g, 0)).xyz.normalize();
      let _ = new Ye(Wc.size, Wc.size);
      _.rotateX(-Math.PI / 2);
      let v = new M(_, s);
      ((v.name = `Sirocco lagoon water`),
        v.position.set(Wc.centerX, 0, Wc.centerZ),
        (v.receiveShadow = !0),
        this.geometries.push(_),
        this.materials.push(s),
        this.group.add(v));
    }
    dispose() {
      (this.geometries.forEach((e) => e.dispose()),
        this.materials.forEach((e) => e.dispose()),
        this.textures.forEach((e) => e.dispose()),
        this.group.clear());
    }
  },
  kl = { background: Cl.horizon, fog: { color: Cl.fog, near: 950, far: 4300 } };
