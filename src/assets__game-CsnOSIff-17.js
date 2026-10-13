// assets__game-CsnOSIff 17 — mul
// Lines 5021-5382 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Dl = class {
    constructor(e, { mobile: t = !1 } = {}) {
      ((this.time = e),
        (this.group = new pn()),
        (this.tiles = []),
        (this.textures = []),
        (this.geometries = []),
        (this.materials = []),
        (this.strata = El()),
        (this.ripples = Tl()),
        (this.dune = null),
        (this.group.name = `Sirocco Oasis · desert`));
      let n = performance.now(),
        r = t ? Uc.step * 2 : Uc.step;
      ((this.heights = bl(r)),
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
      if (s < 0 || c < 0 || s > r - 1 || c > r - 1) return yl(e, t);
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
        t = xl(this.heights, Go),
        n = new Uint16Array(t.length);
      for (let e = 0; e < t.length; e++) n[e] = Me.toHalfFloat(t[e]);
      let r = new re(n, e, e, Ue, kn);
      return (
        (r.name = `Sirocco terrain sun shadow`),
        (r.magFilter = r.minFilter = Fe),
        (r.wrapS = r.wrapT = x),
        (r.generateMipmaps = !1),
        (r.needsUpdate = !0),
        this.textures.push(r),
        r
      );
    }
    createSky() {
      let e = new i({ side: 1, depthWrite: !1, fog: !1 });
      e.name = `Sirocco sunset sky`;
      let t = Xi.normalize(),
        n = t.y,
        r = t.dot(q(Go)).max(0),
        a = J(
          J(
            W(Sl.horizon),
            J(W(Sl.sky), W(Sl.zenith), Z(0.16, 0.78, n)),
            Z(0, 0.36, n),
          ),
          W(`#ffd096`),
          r
            .pow(5)
            .mul(0.7)
            .mul(B(1).sub(Z(0.18, 0.65, n))),
        ),
        o = q(this.time.mul(7e-4), 0, this.time.mul(25e-5)),
        c = Fi(t.add(o).mul(q(2.4, 22, 6)))
          .mul(0.72)
          .add(Fi(t.add(o).mul(q(6, 48, 13))).mul(0.28))
          .smoothstep(0.04, 0.54)
          .mul(Z(0.015, 0.1, n))
          .mul(B(1).sub(Z(0.5, 0.84, n))),
        l = J(W(`#8c739f`), W(`#ffd1a1`), r.pow(1.6)),
        u = r.smoothstep(
          Math.cos(s.degToRad(1.05)),
          Math.cos(s.degToRad(0.65)),
        ),
        d = B(1).sub(c.mul(0.68)),
        f = J(a, l, c.mul(0.68))
          .add(u.mul(q(9, 5.5, 2.4)).mul(d))
          .add(
            r
              .pow(420)
              .mul(q(1.15, 0.47, 0.15))
              .mul(d),
          )
          .add(r.pow(22).mul(q(0.42, 0.15, 0.045)))
          .add(r.pow(3).mul(q(0.055, 0.016, 0.008)));
      e.colorNode = J(W(Sl.ground).mul(0.75), f, Z(-0.12, 0.015, n));
      let p = new N(new bt(6500, 40, 24), e);
      return (
        (p.name = `Sirocco sky dome`),
        (p.frustumCulled = !1),
        this.geometries.push(p.geometry),
        this.materials.push(e),
        this.group.add(p),
        p
      );
    }
    createRockMaterial() {
      let e = ca(),
        t = new I({
          name: `Sirocco sandstone (world strata)`,
          roughness: 0.88,
          metalness: 0,
        }),
        n = U,
        r = Hi,
        i = R(e, n.xz.div(410)).g.sub(0.5).mul(22),
        a = R(this.strata, K(0.5, n.y.add(i).div(96))),
        o = J(n.x, n.z, r.x.abs()),
        s = R(e, K(o.div(38), n.y.div(260))).r.smoothstep(0.45, 0.8),
        c = R(e, n.xz.add(n.y).div(3.1)).g.mul(0.24).add(0.88),
        l = Z(0.55, 0.9, r.y);
      t.colorNode = J(
        a.rgb.mul(B(1).sub(s.mul(0.3))).mul(c),
        W(Sl.sandLight),
        l.mul(0.7),
      );
      let u = R(e, K(o.div(6), n.y.div(6)))
          .ba.mul(2)
          .sub(1)
          .mul(0.4),
        d = r.add(q(u.x, u.y, u.x.negate()).mul(0.5)).normalize();
      return (
        (t.normalNode = _r.mul(H(d, 0)).xyz.normalize()),
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
        r = ca();
      this.textures.includes(t) || this.textures.push(t, n);
      let i = new I({
          name: e ? `Sirocco terrain` : `Sirocco dune sand`,
          roughness: 0.9,
          metalness: 0,
        }),
        a = U,
        o = Hi,
        s = e ? B(1).sub(Z(0.58, 0.78, o.y)) : B(0),
        c = R(r, a.xz.div(620)).g,
        l = R(r, a.xz.div(23)).g,
        u = J(
          W(Sl.sandDark),
          W(Sl.sandLight),
          c.mul(0.8).add(l.mul(0.35)).sub(0.1).clamp(),
        ),
        d = R(t, a.xz.div(7.5)),
        f = R(r, a.xz.div(410)).g.sub(0.5).mul(22),
        p = R(n, K(0.5, a.y.add(f).div(96))),
        m = J(a.x, a.z, o.x.abs()),
        h = R(r, K(m.div(38), a.y.div(260))).r.smoothstep(0.45, 0.8),
        g = p.rgb.mul(B(1).sub(h.mul(0.32))),
        _ = B(1)
          .sub(Z(0.25, 1.7, a.y.sub(0)))
          .mul(B(1).sub(s));
      ((i.colorNode = J(u.mul(d.b.mul(0.35).add(0.85)), g, s)
        .mul(J(B(1), B(0.6), _))
        .mul(ii(`tint`, `vec3`))),
        (i.roughnessNode = J(J(B(0.93), B(0.84), s), B(0.36), _)));
      let v = d.rg.mul(2).sub(1).mul(0.22).mul(B(1).sub(s)),
        y = R(r, K(m.div(9), a.y.div(9)))
          .ba.mul(2)
          .sub(1)
          .mul(0.35)
          .mul(s),
        b = o
          .add(q(v.x, 0, v.y))
          .add(q(y.x, y.y, y.x.negate()).mul(0.6))
          .normalize();
      return (
        (i.normalNode = _r.mul(H(b, 0)).xyz.normalize()),
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
        c = n - 1,
        l = Math.ceil(c / e),
        u = 0;
      for (let t = 0; t < e; t++)
        for (let n = 0; n < e; n++) {
          let e = n * l,
            d = t * l,
            f = Math.min(c, e + l),
            p = Math.min(c, d + l);
          if (f <= e || p <= d) continue;
          let m = f - e + 1,
            h = p - d + 1,
            g = new Float32Array(m * h * 3),
            _ = new Float32Array(m * h * 3),
            v = new Float32Array(m * h * 3),
            y = [];
          for (let t = 0; t < h; t++)
            for (let n = 0; n < m; n++) {
              let c = e + n,
                l = d + t,
                u = t * m + n,
                f = o(c, l),
                p = i + c * r,
                h = a + l * r;
              g.set([p, f, h], u * 3);
              let y = (o(c + 1, l) - o(c - 1, l)) / (2 * r),
                b = (o(c, l + 1) - o(c, l - 1)) / (2 * r),
                x = Math.hypot(y, 1, b);
              _.set([-y / x, 1 / x, -b / x], u * 3);
              let S =
                  (o(c + 1, l) +
                    o(c - 1, l) +
                    o(c, l + 1) +
                    o(c, l - 1) -
                    4 * f) /
                  (r * r),
                C = s.clamp(S * 7, -0.12, 0.2),
                w =
                  f > 0.4 && f < 11
                    ? (1 -
                        s.smoothstep(Math.hypot(p - 250, h - 220), 170, 330)) *
                      0.22
                    : 0,
                T = 1 - C - w * 0.6;
              v.set(
                [T * (1 - w * 0.35), T * (1 - w * 0.1), T * (1 - w * 0.5)],
                u * 3,
              );
            }
          for (let e = 0; e < h - 1; e++)
            for (let t = 0; t < m - 1; t++) {
              let n = e * m + t,
                r = n + 1,
                i = n + m,
                a = i + 1;
              y.push(n, i, r, r, i, a);
            }
          let b = new tr();
          (b.setAttribute(`position`, new vt(g, 3)),
            b.setAttribute(`normal`, new vt(_, 3)),
            b.setAttribute(`tint`, new vt(v, 3)),
            b.setIndex(y),
            b.computeBoundingBox(),
            b.computeBoundingSphere());
          let x = new N(b, this.terrainMaterial);
          x.name = `Sirocco terrain tile ${n},${t}`;
          let S = b.boundingBox;
          ((x.castShadow = S.max.y - S.min.y > 45),
            (x.receiveShadow = !0),
            this.geometries.push(b),
            this.tiles.push(x),
            this.group.add(x),
            (u += y.length / 3));
        }
      return u;
    }
    createFarField() {
      let { farSize: e, farStep: t, centerX: n, centerZ: r, size: i } = Uc,
        a = Math.round(e / t) + 1,
        o = new Float32Array(a * a * 3),
        s = new Float32Array(a * a * 3).fill(1),
        c = i / 2;
      for (let i = 0; i < a; i++)
        for (let s = 0; s < a; s++) {
          let l = n - e / 2 + s * t,
            u = r - e / 2 + i * t,
            d = Math.min(c - Math.abs(l - n), c - Math.abs(u - r)),
            f = d > t * 1.5 ? -80 : yl(l, u) - (d > 0 ? 2 : 0.6);
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
      let u = new tr();
      (u.setAttribute(`position`, new vt(o, 3)),
        u.setAttribute(`tint`, new vt(s, 3)),
        u.setIndex(l),
        u.computeVertexNormals());
      let d = new N(u, this.terrainMaterial);
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
        let t = s.clamp((0 - e[n]) / 7, 0, 1);
        ((a[n * 4] = Math.round(t * 255)), (a[n * 4 + 3] = 255));
      }
      let o = wl(a, t, t, `Sirocco water depth`, !1, x);
      this.textures.push(o);
      let c = new kt({
          name: `Sirocco lagoon`,
          roughness: 0.06,
          metalness: 0,
          ior: 1.333,
        }),
        l = U,
        u = (t - 1) * n,
        d = R(o, K(l.x.sub(r).div(u), l.z.sub(i).div(u))).r,
        f = Fi(q(l.x.mul(0.09), l.z.mul(0.13), this.time.mul(0.35))),
        p = Fi(q(l.x.mul(0.31).add(21), l.z.mul(0.23), this.time.mul(0.28))),
        m = J(
          J(W(Sl.shallow), W(Sl.lagoon), Z(0.02, 0.35, d)),
          W(Sl.deep),
          Z(0.35, 1, d),
        ),
        h = B(1)
          .sub(Z(0, 0.07, d))
          .mul(f.mul(0.5).add(0.5).smoothstep(0.35, 0.75));
      ((c.colorNode = J(m, W(`#f6fbf7`), h.mul(0.7))),
        (c.roughnessNode = J(B(0.05), B(0.5), h)));
      let g = q(f.mul(0.1), 1, p.mul(0.08)).normalize();
      c.normalNode = _r.mul(H(g, 0)).xyz.normalize();
      let _ = new rt(Uc.size, Uc.size);
      _.rotateX(-Math.PI / 2);
      let v = new N(_, c);
      ((v.name = `Sirocco lagoon water`),
        v.position.set(Uc.centerX, 0, Uc.centerZ),
        (v.receiveShadow = !0),
        this.geometries.push(_),
        this.materials.push(c),
        this.group.add(v));
    }
    dispose() {
      (this.geometries.forEach((e) => e.dispose()),
        this.materials.forEach((e) => e.dispose()),
        this.textures.forEach((e) => e.dispose()),
        this.group.clear());
    }
  },
  Ol = { background: Sl.horizon, fog: { color: Sl.fog, near: 950, far: 4300 } };
