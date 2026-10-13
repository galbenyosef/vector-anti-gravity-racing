// assets__game-CsnOSIff 58 — mul
// Lines 23121-24537 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var z_ = class {
    constructor(e, { mobile: t = !1 } = {}) {
      ((this.group = new pn()),
        (this.grid = new Map()),
        (this.portals = I_()),
        (this.owned = []),
        (this.waterClock = L(0)),
        (this.skyClock = L(0)),
        (this.trafficClock = L(0)),
        (this.streetFlags = (() => {
          let e = x_,
            t = Math.floor((e.x1 - e.x0) / e.pitch) + 3,
            n = Math.floor((e.z1 - e.z0) / e.pitch) + 3,
            r = new re(new Uint8Array(t * n * 4), t, n);
          return (
            (r.name = `Meridian street flags`),
            (r.magFilter = r.minFilter = u),
            (r.generateMipmaps = !1),
            (r.colorSpace = ``),
            (r.needsUpdate = !0),
            r
          );
        })()),
        (this.traffic = null),
        (this.streets = {
          paved: 0,
          stretches: 0,
          runs: 0,
          cars: 0,
          terraces: 0,
          vergeMetres: 0,
        }),
        (this.group.name = `Meridian Grand Prix · city floor`),
        (this.road = P_()));
      for (let e of this.road) {
        let t = this.key(e.x, e.z),
          n = this.grid.get(t);
        n ? n.push(e) : this.grid.set(t, [e]);
      }
      ((this.basinStep = t ? k_.basin.stepMobile : k_.basin.step),
        (this.garageBand = (t ? k_.fineMobile : k_.fine) * Math.SQRT2 + 0.2),
        (this.garageFloor = this.planGarage()),
        (this.skyDome = this.createSky()),
        (this.groundMaterial = this.createGroundMaterial()),
        (this.info = this.createGround(t)),
        (this.info.basinTriangles = this.createBasin()),
        (this.info.garageTriangles = this.createGarage()),
        t || (this.info.vertiportTriangles = this.createVertiportFacade()),
        this.group.add(this.skyDome));
    }
    update(e, t) {
      t ||
        !(e > 0) ||
        ((this.waterClock.value =
          (this.waterClock.value + Math.min(e, 0.25)) % 7200),
        (this.skyClock.value += Math.min(e, 0.25)),
        (this.trafficClock.value += Math.min(e, 0.25)));
    }
    paveStreets(e, { mobile: t = !1 } = {}) {
      let n = x_,
        r = A_,
        i = k_.street,
        a = n.x0 - n.pitch,
        o = n.z0 - n.pitch,
        s = Math.ceil((n.x1 - n.x0 + 2 * n.pitch) / 4),
        c = Math.ceil((n.z1 - n.z0 + 2 * n.pitch) / 4),
        l = new Uint8Array(s * c),
        u = [],
        d = Math.ceil(r.roadClear / 4) + 1;
      for (let e = 0; e < F; e += 4) {
        let t = Gn(e).position;
        if (t.y > i + 12) continue;
        e % 20 < 4 && u.push(t.x, t.z);
        let n = Math.floor((t.x - a) / 4),
          f = Math.floor((t.z - o) / 4);
        for (let e = n - d; e <= n + d; e++)
          for (let n = f - d; n <= f + d; n++) {
            if (e < 0 || n < 0 || e >= s || n >= c) continue;
            let i = a + (e + 0.5) * 4,
              u = o + (n + 0.5) * 4;
            Math.hypot(i - t.x, u - t.z) < r.roadClear + 4 * 0.71 &&
              (l[n * s + e] = 1);
          }
      }
      let f = (e, t) => {
          let n = Math.floor((e - a) / 4),
            r = Math.floor((t - o) / 4);
          return n >= 0 && r >= 0 && n < s && r < c && l[r * s + n] === 1;
        },
        p = (e, t) => {
          let n = 1 / 0;
          for (let r = 0; r < u.length; r += 2)
            n = Math.min(n, Math.hypot(u[r] - e, u[r + 1] - t));
          return n;
        },
        m = new Map(),
        h = new g();
      for (let t of Object.keys(e.placements))
        for (let n of e.placements[t]) {
          let e = eh[t]?.bounds[n.asset];
          if (!e) continue;
          let a = 1 / 0,
            o = -1 / 0;
          for (let t of [e.min[1], e.max[1]])
            (h.set(0, t, 0).applyMatrix4(n.matrix),
              (a = Math.min(a, h.y)),
              (o = Math.max(o, h.y)));
          if (!j_.has(n.asset) && (a > i + r.standing || o < i + 0.2)) continue;
          let s = n.matrix.elements,
            c = (e.min[0] + e.max[0]) / 2,
            l = (e.min[2] + e.max[2]) / 2;
          h.set(c, 0, l).applyMatrix4(n.matrix);
          let u = {
              cx: h.x,
              cz: h.z,
              ax: [s[0], s[2]],
              az: [s[8], s[10]],
              h: [(e.max[0] - e.min[0]) / 2, (e.max[2] - e.min[2]) / 2],
            },
            d =
              Math.hypot(
                u.h[0] * Math.hypot(s[0], s[2]),
                u.h[1] * Math.hypot(s[8], s[10]),
              ) + 1;
          for (
            let e = Math.floor((u.cx - d) / 64);
            e <= Math.floor((u.cx + d) / 64);
            e++
          )
            for (
              let t = Math.floor((u.cz - d) / 64);
              t <= Math.floor((u.cz + d) / 64);
              t++
            ) {
              let n = `${e},${t}`,
                r = m.get(n);
              r ? r.push(u) : m.set(n, [u]);
            }
        }
      let v = (e, t, n) => {
          for (let r of m.get(`${Math.floor(e / 64)},${Math.floor(t / 64)}`) ??
            []) {
            let i = e - r.cx,
              a = t - r.cz,
              o = Math.hypot(r.ax[0], r.ax[1]) || 1,
              s = Math.hypot(r.az[0], r.az[1]) || 1,
              c = (i * r.ax[0] + a * r.ax[1]) / o,
              l = (i * r.az[0] + a * r.az[1]) / s;
            if (Math.abs(c) < r.h[0] * o + n && Math.abs(l) < r.h[1] * s + n)
              return !0;
          }
          return !1;
        },
        y = ph.polygon,
        b = r.pavement + 4,
        x = Math.min(...y.map((e) => e[0])) - b,
        S = Math.max(...y.map((e) => e[0])) + b,
        C = Math.min(...y.map((e) => e[1])) - b,
        w = Math.max(...y.map((e) => e[1])) + b,
        T = (e, t) =>
          e > x && e < S && t > C && t < w && (M_(e, t, y) || N_(e, t, y) < b),
        E = (e, t) =>
          !f(e, t) && !T(e, t) && !v(e, t, 0.5) && this.heightAt(e, t) === i,
        D = (e, t, n, i) => {
          let a = Math.hypot(n - e, i - t),
            o = (n - e) / a,
            s = (i - t) / a;
          for (let n = -r.carriage; n <= a + r.carriage; n += 4)
            for (let i of [-r.carriage, 0, r.carriage])
              if (!E(e + o * n - s * i, t + s * n + o * i)) return !1;
          return !0;
        },
        O = this.streetFlags,
        ee = O.image.data,
        te = O.image.width,
        k = O.image.height,
        ne = te - 2,
        re = k - 2,
        A = (e) => n.x0 + (e + 0.5) * n.pitch,
        ie = (e) => n.z0 + (e + 0.5) * n.pitch,
        ae = (e) => n.x0 + e * n.pitch,
        oe = (e) => n.z0 + e * n.pitch,
        se = [],
        ce = [];
      for (let e = 0; e < ne; e++) {
        (se.push([]), ce.push([]));
        for (let t = 0; t < re; t++) {
          let r = A(e),
            i = ie(t),
            a = e < ne - 1 && D(r, oe(t) - n.pitch / 2, r, oe(t) + n.pitch / 2),
            o = t < re - 1 && D(ae(e) - n.pitch / 2, i, ae(e) + n.pitch / 2, i);
          (se[e].push(a), ce[e].push(o));
          let s = ((t + 1) * te + (e + 1)) * 4;
          ((ee[s] = a ? 255 : 0),
            (ee[s + 1] = o ? 255 : 0),
            a && this.streets.stretches++,
            o && this.streets.stretches++);
        }
      }
      if (
        ((O.needsUpdate = !0),
        (this.streets.paved = 1),
        (this.info.streets = this.streets),
        this.raiseTerraces(e.placements.street),
        t)
      )
        return this.streets;
      let le = [],
        ue = (e, t, i, a, o) => {
          for (let s = 0; s < e;) {
            if (!t(s)) {
              s++;
              continue;
            }
            let c = s;
            for (; c + 1 < e && t(c + 1);) c++;
            let [l, u] = i(s),
              d = (c - s + 1) * n.pitch;
            if (d >= r.minRun) {
              let e = 1 / 0;
              for (let t = 0; t <= d; t += n.pitch)
                e = Math.min(e, p(l + a * t, u + o * t));
              le.push({ x: l, z: u, dx: a, dz: o, len: d, near: e });
            }
            s = c + 1;
          }
        };
      for (let e = 0; e < ne - 1; e++)
        ue(
          re,
          (t) => se[e][t],
          (t) => [A(e), oe(t) - n.pitch / 2],
          0,
          1,
        );
      for (let e = 0; e < re - 1; e++)
        ue(
          ne,
          (t) => ce[t][e],
          (t) => [ae(t) - n.pitch / 2, ie(e)],
          1,
          0,
        );
      (le.sort((e, t) => e.near - t.near || t.len - e.len),
        (this.streets.runs = le.length));
      let de = 24301,
        fe = () => ((de = (de * 1664525 + 1013904223) >>> 0), de / 2 ** 32),
        pe = [],
        j = [
          `#f2f2ee`,
          `#f2f2ee`,
          `#c9ccd1`,
          `#1c1f24`,
          `#1c1f24`,
          `#3a3f47`,
          `#a3222c`,
          `#2d5fa8`,
          `#f2b134`,
          `#f2b134`,
          `#6b7f5a`,
          `#e2dccb`,
        ].map((e) => new _(e));
      fill: for (let e of le)
        for (let t of e.near < r.busy
          ? r.lanes
          : [r.lanes[Math.floor(fe() * r.lanes.length)]]) {
          let n = t + 2.6,
            i = e.len - 2 * n;
          if (i < 20) continue;
          let a = 2 * i + 2 * Math.PI * t,
            o = r.speed[0] + fe() * (r.speed[1] - r.speed[0]),
            s = e.x + e.dx * n,
            c = e.z + e.dz * n;
          for (let n = fe() * r.spacing[0]; n < a - 8;) {
            if (pe.length >= r.cars) break fill;
            let l = fe() < 0.07;
            (pe.push({
              run: [s, c, e.dx, e.dz],
              loop: [i, t, n / a, o / a],
              size: l ? [1.3, 1.55, 2.7] : [1, 1, 1],
              paint: l
                ? new _(fe() < 0.5 ? `#c8202a` : `#f2f2ee`)
                : j[Math.floor(fe() * j.length)],
            }),
              (n += r.spacing[0] + fe() * (r.spacing[1] - r.spacing[0])));
          }
        }
      if (!pe.length) return this.streets;
      let me = R_(),
        M = new Float32Array(pe.length * 4),
        he = new Float32Array(pe.length * 4),
        ge = new Float32Array(pe.length * 3),
        _e = new Float32Array(pe.length * 3);
      pe.forEach((e, t) => {
        (M.set(e.run, t * 4),
          he.set(e.loop, t * 4),
          ge.set(e.size, t * 3),
          _e.set([e.paint.r, e.paint.g, e.paint.b], t * 3));
      });
      for (let [e, t, n] of [
        [`trafficRun`, M, 4],
        [`trafficLoop`, he, 4],
        [`trafficSize`, ge, 3],
        [`trafficPaint`, _e, 3],
      ])
        me.setAttribute(e, new Ct(t, n));
      let N = new I({
          name: `Meridian ground traffic`,
          roughness: 0.4,
          metalness: 0.25,
        }),
        ve = ii(`trafficRun`, `vec4`),
        ye = ii(`trafficLoop`, `vec4`),
        be = ii(`trafficSize`, `vec3`),
        xe = ye.x,
        Se = ye.y,
        Ce = Se.mul(Math.PI),
        we = xe.mul(2).add(Ce),
        Te = z(ye.z.add(this.trafficClock.mul(ye.w))).mul(we),
        Ee = ve.xy,
        De = ve.zw,
        Oe = K(De.y.negate(), De.x),
        ke = Ee.add(De.mul(xe)),
        Ae = Te.sub(xe).div(Se).clamp(0, Math.PI),
        je = Te.sub(xe).sub(Ce),
        Me = Te.sub(xe.mul(2)).sub(Ce).div(Se).clamp(0, Math.PI),
        Ne = [
          [Ee.add(De.mul(Te)).add(Oe.mul(Se)), De],
          [
            ke.add(De.mul(Se.mul(Hr(Ae)))).add(Oe.mul(Se.mul(Rr(Ae)))),
            De.mul(Rr(Ae)).sub(Oe.mul(Hr(Ae))),
          ],
          [ke.sub(De.mul(je)).sub(Oe.mul(Se)), De.negate()],
          [
            Ee.sub(De.mul(Se.mul(Hr(Me)))).sub(Oe.mul(Se.mul(Rr(Me)))),
            De.negate()
              .mul(Rr(Me))
              .add(Oe.mul(Hr(Me))),
          ],
        ],
        P = (e) =>
          Br(
            Te.lessThan(xe),
            Ne[0][e],
            Br(
              Te.lessThan(xe.add(Ce)),
              Ne[1][e],
              Br(Te.lessThan(xe.mul(2).add(Ce)), Ne[2][e], Ne[3][e]),
            ),
          ),
        Pe = P(0),
        Fe = P(1),
        Ie = K(Fe.y, Fe.x.negate()),
        Le = Wi.mul(be),
        Re = Pe.add(Fe.mul(Le.z)).add(Ie.mul(Le.x));
      N.positionNode = q(Re.x, Le.y.add(i), Re.y);
      let ze = Ai,
        Be = q(
          Fe.x.mul(ze.z).add(Ie.x.mul(ze.x)),
          ze.y,
          Fe.y.mul(ze.z).add(Ie.y.mul(ze.x)),
        );
      N.normalNode = _r.mul(H(Be, 0)).xyz.normalize();
      let Ve = ii(`carGlass`, `float`),
        He = ii(`trafficPaint`, `vec3`),
        Ue = Z(0.32, 0.52, Wi.y).mul(0.75).add(0.25);
      ((N.colorNode = J(He, W(`#151b22`), Ve).mul(Ue)),
        (N.roughnessNode = J(B(0.42), B(0.08), Ve)));
      let We = new Wn(me, N, pe.length);
      return (
        (We.name = `Meridian ground traffic`),
        (We.frustumCulled = !1),
        (We.castShadow = !1),
        (We.receiveShadow = !0),
        (We.userData.proxied = !0),
        (We.userData.reflectionHidden = !0),
        this.group.add(We),
        (this.traffic = We),
        this.owned.push(me, N),
        (this.streets.cars = pe.length),
        this.streets
      );
    }
    floorAt(e, t, n) {
      let r = this.carved(e, t, n, !0),
        { centre: i } = k_.cauldron,
        a = k_.garage,
        o = Math.hypot(e - i[0], t - i[1]);
      if (
        o > a.core - 4 - this.garageBand &&
        o < a.drum + 4 + this.garageBand
      ) {
        let n = this.garageBin(e, t),
          i = this.garageFloor,
          a = i.core[n],
          s = i.drum[n];
        if (a === a && o > i.coreR[n] - this.garageBand && o < i.coreR[n] + 2.3)
          return Math.min(r, a);
        if (s === s && o > i.drumR[n] - 1 && o < i.drumR[n] + this.garageBand)
          return Math.min(r, s);
      }
      let s = ph.polygon;
      return M_(e, t, s) || N_(e, t, s) < this.basinStep * 0.75
        ? Math.min(r, k_.basin.floor)
        : r;
    }
    sidedFloor(e, t) {
      for (let n of this.portals) {
        let r = e - n.x,
          i = t - n.z,
          a = r * n.tx + i * n.tz;
        if (a >= 0 && a < 40 && Math.abs(r * n.rx + i * n.rz) < n.reach)
          return this.floorAt(e, t, n.skip);
      }
      return this.floorAt(e, t);
    }
    cutPortals(e, t, n, r, i) {
      let a = this.portals.filter((e) => {
        let a = 1 / 0,
          o = -1 / 0,
          s = 1 / 0;
        for (let [i, c] of [
          [t, n],
          [t + r, n],
          [t, n + r],
          [t + r, n + r],
        ]) {
          let t = (i - e.x) * e.tx + (c - e.z) * e.tz;
          ((a = Math.min(a, t)),
            (o = Math.max(o, t)),
            (s = Math.min(s, Math.abs((i - e.x) * e.rx + (c - e.z) * e.rz))));
        }
        return a < i * 2 && o > -i * 2 && s < e.reach + r;
      });
      if (!a.length) return e;
      let o = e.getAttribute(`position`),
        s = e.getIndex(),
        c = [],
        l = [],
        u = (e, t, n) => l.push(e.x, e.y, e.z, t.x, t.y, t.z, n.x, n.y, n.z),
        d = (e) => {
          for (let t = 1; t + 1 < e.length; t++) u(e[0], e[t], e[t + 1]);
        };
      for (let e = 0; e < s.count; e += 3) {
        let t = [0, 1, 2].map((t) => {
            let n = s.getX(e + t);
            return { x: o.getX(n), z: o.getZ(n), y: o.getY(n), s: 0 };
          }),
          n = a.find((e) => {
            let n = !1,
              r = !1,
              i = !1;
            for (let a of t)
              ((a.x - e.x) * e.tx + (a.z - e.z) * e.tz < 0
                ? (n = !0)
                : (r = !0),
                Math.abs((a.x - e.x) * e.rx + (a.z - e.z) * e.rz) < e.reach &&
                  (i = !0));
            return n && r && i;
          });
        if (!n) {
          c.push(s.getX(e), s.getX(e + 1), s.getX(e + 2));
          continue;
        }
        for (let e of t) e.s = (e.x - n.x) * n.tx + (e.z - n.z) * n.tz;
        let r = [],
          i = [],
          l = [];
        for (let e = 0; e < 3; e++) {
          let a = t[e],
            o = t[(e + 1) % 3];
          if (((a.s < 0 ? r : i).push(a), a.s < 0 != o.s < 0)) {
            let e = a.s / (a.s - o.s),
              t = a.x + (o.x - a.x) * e,
              s = a.z + (o.z - a.z) * e,
              c = this.floorAt(t, s),
              u = this.floorAt(t, s, n.skip);
            (r.push({ x: t, z: s, y: c, s: 0 }),
              i.push({ x: t, z: s, y: u, s: 0 }),
              l.push({ x: t, z: s, low: c, high: u }));
          }
        }
        if ((d(r), d(i), l.length !== 2)) continue;
        let [f, p] = l,
          m = Math.max(1, Math.ceil(Math.hypot(p.x - f.x, p.z - f.z) / 0.5)),
          h = (e) => {
            let t = f.x + (p.x - f.x) * e,
              r = f.z + (p.z - f.z) * e,
              i = f.low + (p.low - f.low) * e,
              a = f.high + (p.high - f.high) * e,
              o = n.open(t, r);
            return {
              x: t,
              z: r,
              low: i,
              high: a,
              below: o ? Math.min(a, Math.max(i, o[0])) : a,
              above: o ? Math.max(i, Math.min(a, o[1])) : a,
            };
          },
          g = p.x - f.x,
          _ = -(p.z - f.z) * -n.tx + g * -n.tz < 0,
          v = (e, t, n, r, i, a) => {
            if (r - n < 0.01 && a - i < 0.01) return;
            let o = { x: e.x, z: e.z, y: n, s: 0 },
              s = { x: t.x, z: t.z, y: i, s: 0 },
              c = { x: t.x, z: t.z, y: a, s: 0 },
              l = { x: e.x, z: e.z, y: r, s: 0 };
            _ ? (u(s, o, l), u(s, l, c)) : (u(o, s, c), u(o, c, l));
          },
          y = h(0);
        for (let e = 1; e <= m; e++) {
          let t = h(e / m);
          (v(y, t, y.low, y.below, t.low, t.below),
            v(y, t, y.above, y.high, t.above, t.high),
            (y = t));
        }
      }
      if (!l.length) return e;
      let f = o.count,
        p = new Float32Array((f + l.length / 3) * 3);
      (p.set(o.array, 0), p.set(l, f * 3));
      for (let e = 0; e < l.length / 3; e++) c.push(f + e);
      let m = new tr();
      return (
        m.setAttribute(`position`, new vt(p, 3)),
        m.setIndex(c),
        e.dispose(),
        m
      );
    }
    raiseTerraces(e) {
      let t = Mg,
        n = Ng,
        r = [],
        i = [],
        a = new g(),
        o = new g(),
        s = (e, t) => {
          for (let n of [0, 1, 2, 0, 2, 3])
            (r.push(e[n].x, e[n].y, e[n].z), i.push(t.x, t.y, t.z));
        },
        c = (e, t, n, r, i, a, c) => {
          let l = (t, n, r) => new g(t, n, r).applyMatrix4(e),
            u = (t, n, r) => o.set(t, n, r).transformDirection(e).clone();
          (s([l(t, i, c), l(n, i, c), l(n, i, a), l(t, i, a)], u(0, 1, 0)),
            s([l(t, r, c), l(n, r, c), l(n, i, c), l(t, i, c)], u(0, 0, 1)),
            s([l(n, r, a), l(t, r, a), l(t, i, a), l(n, i, a)], u(0, 0, -1)),
            s([l(n, r, c), l(n, r, a), l(n, i, a), l(n, i, c)], u(1, 0, 0)),
            s([l(t, r, a), l(t, r, c), l(t, i, c), l(t, i, a)], u(-1, 0, 0)));
        };
      for (let n of e) {
        if (n.asset !== `crowd-barrier`) continue;
        a.setFromMatrixPosition(n.matrix);
        let e = this.heightAt(a.x, a.z);
        if (a.y < e + 1) continue;
        let r = e - 0.3 - a.y;
        (c(n.matrix, t.x[0], t.x[1], r, 0, t.z[0], t.step),
          c(n.matrix, t.x[0], t.x[1], r, -t.rise / 2, t.step, t.z[1]),
          this.streets.terraces++);
      }
      for (let [e, t, r] of n.runs) {
        let i = null;
        for (let a = e; a <= t + 1e-6; a += 2) {
          let e = Pg(a, r);
          if (e === null) {
            i = null;
            continue;
          }
          if (i) {
            let t = (e, t, n) => {
                let i = Gn(e),
                  a = Math.hypot(i.right.x, i.right.z) || 1;
                return new g(
                  i.position.x + (i.right.x / a) * r * t,
                  n,
                  i.position.z + (i.right.z / a) * r * t,
                );
              },
              o = i,
              c = { d: a, top: e },
              l = k_.street - 0.3,
              u = t(o.d, n.inner, o.top - 0.04),
              d = t(o.d, n.outer, o.top - 0.04),
              f = t(c.d, n.inner, c.top - 0.04),
              p = t(c.d, n.outer, c.top - 0.04),
              m = new g(0, 1, 0);
            s(r > 0 ? [u, f, p, d] : [u, d, p, f], m);
            let h = new g().subVectors(d, u).setY(0).normalize(),
              _ = d.clone().setY(l),
              v = p.clone().setY(l);
            (s(r > 0 ? [v, _, d, p] : [_, v, p, d], h),
              (this.streets.vergeMetres += 2));
          }
          i = { d: a, top: e };
        }
      }
      if (!r.length) return;
      let l = new tr();
      (l.setAttribute(`position`, new ct(r, 3)),
        l.setAttribute(`normal`, new ct(i, 3)));
      let u = new I({
          name: `Meridian terrace concrete`,
          roughness: 0.86,
          metalness: 0,
        }),
        d = Z(0.6, 0.9, Hi.y),
        f = Z(k_.street + 0.8, k_.street, U.y);
      u.colorNode = J(W(`#a8a39a`), W(`#c9c4ba`), d).mul(B(1).sub(f.mul(0.18)));
      let p = new N(l, u);
      ((p.name = `Meridian terraces`),
        (p.castShadow = p.receiveShadow = !0),
        this.group.add(p),
        this.owned.push(l, u));
    }
    garageBin(e, t) {
      let { centre: n } = k_.cauldron,
        r = Math.atan2(t - n[1], e - n[0]) * (180 / Math.PI);
      return ((Math.floor(r) % 360) + 360) % 360;
    }
    planGarage() {
      let { centre: e } = k_.cauldron,
        t = k_.garage,
        n = new Float32Array(360).fill(NaN),
        r = new Float32Array(360).fill(NaN),
        i = new Float32Array(360).fill(t.core),
        a = new Float32Array(360).fill(t.drum),
        o = [];
      for (let t = 0; t < F; t += 2) {
        let n = Gn(t),
          r = n.position,
          i = Math.hypot(r.x - e[0], r.z - e[1]);
        if (i > 130) continue;
        let a = j(t),
          s = Math.abs(n.bank);
        o.push({
          x: r.x,
          z: r.z,
          a: Math.atan2(r.z - e[1], r.x - e[0]),
          r: i,
          in: (a + 1.4) * Math.cos(s) + 6 * Math.sin(s),
          out: (a + 1) * Math.cos(s) + 1.6 * Math.sin(s),
        });
      }
      for (let s = 0; s < 360; s++) {
        let c = ((s + 0.5) * Math.PI) / 180,
          l = Math.cos(c),
          u = Math.sin(c),
          d = (t) => [e[0] + l * t, e[1] + u * t],
          f = t.core,
          p = t.drum;
        for (let e of o) {
          let t = Math.abs(e.a - c) % (2 * Math.PI);
          ((t = Math.min(t, 2 * Math.PI - t)),
            !(t > (4 * Math.PI) / 180) &&
              (e.r < 75 && (f = Math.min(f, e.r - e.in - 0.3)),
              e.r > 45 && (p = Math.max(p, e.r + e.out + 0.5))));
        }
        let [m, h] = d(f + 2.8),
          g = this.heightAt(m, h);
        g < k_.street - t.depth && f > t.core - 4 && ((n[s] = g), (i[s] = f));
        let [_, v] = d(p - 0.9),
          y = this.heightAt(_, v),
          b = o.some(
            (t) =>
              Math.hypot(e[0] + l * p - t.x, e[1] + u * p - t.z) < t.out + 0.4,
          );
        y < k_.street - t.depth &&
          !b &&
          p < t.drum + 4 &&
          ((r[s] = y), (a[s] = p));
      }
      return { core: n, drum: r, coreR: i, drumR: a };
    }
    key(e, t) {
      return `${Math.floor(e / 32)},${Math.floor(t / 32)}`;
    }
    heightAt(e, t) {
      return this.carved(e, t);
    }
    meshHeightAt(e, t) {
      return this.carved(e, t, void 0, !0);
    }
    carved(e, t, n, r = !1) {
      let { street: i, bed: a, wall: o, cauldron: c } = k_,
        l = i,
        u = Math.floor(e / 32),
        d = Math.floor(t / 32),
        f = Math.hypot(e - c.centre[0], t - c.centre[1]),
        p = r && f > c.drum + 10;
      for (let r = -1; r <= 1; r++)
        for (let c = -1; c <= 1; c++)
          for (let f of this.grid.get(`${u + r},${d + c}`) ?? []) {
            if (n && f.d > n[0] && f.d < n[1]) continue;
            let r = e - f.x,
              c = t - f.z,
              u = r * f.rx + c * f.rz,
              d = Math.abs(u);
            if (Math.abs(r * f.rz - c * f.rx) > 2.2) continue;
            let m = Math.sign(u) * Math.min(d, f.half + 1),
              h = Math.min(i, (p ? f.cy + f.tan * m : f.y) - a);
            if (h >= i) continue;
            let g = p ? s.clamp((i - h - 3) / 6, 0, 1) * 2.5 : 0,
              _ = f.half + 2 + g,
              v = o - g;
            d <= _
              ? (l = Math.min(l, h))
              : d <= _ + v && (l = Math.min(l, s.lerp(h, i, (d - _) / v)));
          }
      return (f < c.core && (l = i), l);
    }
    sunken(e, t) {
      return this.heightAt(e, t) < k_.street - 0.5;
    }
    createSky() {
      let e = new i({ name: `Meridian sky`, side: 1, depthWrite: !1, fog: !1 }),
        t = q(Xo),
        n = U.sub(Ur).normalize(),
        r = n.y.max(0),
        a = J(
          J(W(`#dfe6ea`), W(`#79a9dc`), Z(0, 0.12, r)),
          J(W(`#3b78c4`), W(`#1d4f9a`), Z(0.35, 0.95, r)),
          Z(0.1, 0.4, r),
        ),
        o = q(t.x, 0, t.z).normalize(),
        s = Z(0.75, 1, q(n.x, 0, n.z).normalize().dot(o)).mul(
          B(1).sub(Z(0, 0.22, r)),
        ),
        c = J(a, W(`#f3dcc0`), s.mul(0.75)),
        l = this.skyClock,
        u = q(l.mul(0.0011), 0, l.mul(6e-4)),
        d = n.add(u),
        f = Fi(d.mul(q(4, 14, 4)))
          .mul(0.7)
          .add(Fi(d.mul(q(12, 30, 12))).mul(0.25))
          .smoothstep(0.12, 0.55)
          .mul(Z(0, 0.05, r))
          .mul(B(1).sub(Z(0.12, 0.3, r))),
        p = J(W(`#9fb2c6`), W(`#fbfaf6`), Z(0.02, 0.14, r)),
        m = Fi(d.mul(q(1.2, 6, 9)))
          .smoothstep(0.25, 0.7)
          .mul(Z(0.25, 0.6, r))
          .mul(0.08),
        h = n.dot(t).max(0).pow(850),
        g = n.dot(t).max(0).pow(10),
        _ = J(c, p, f.mul(0.85))
          .add(m)
          .add(h.mul(q(6, 5.4, 4.6)))
          .add(g.mul(q(0.24, 0.2, 0.14)));
      e.colorNode = J(W(`#9aa6af`), _, Z(-0.12, 0.02, n.y));
      let v = new N(new bt(6e3, 32, 24), e);
      return (
        (v.name = `Meridian sky`),
        (v.renderOrder = -1),
        this.owned.push(v.geometry, e),
        v
      );
    }
    createGroundMaterial() {
      let e = new I({ name: `Meridian paving`, roughness: 0.82, metalness: 0 }),
        t = U.xz,
        n = Fi(q(t.x, 0, t.y).mul(0.004))
          .mul(0.5)
          .add(0.5),
        r = z(t.div(3)),
        i = Z(0, 0.04, r.x)
          .mul(Z(0, 0.04, r.y))
          .mul(Z(1, 0.96, r.x))
          .mul(Z(1, 0.96, r.y)),
        a = J(W(`#a59d90`), W(`#bab2a4`), n),
        o = K(Hi.x, Hi.z),
        s = K(o.y.negate(), o.x).div(o.length().max(0.001)),
        c = U.xz.dot(s),
        l = U.y.sub(k_.street),
        u = Cr(l.div(2.4)),
        d = z(
          Hr(
            Cr(c.div(6).add(u.mul(0.5)))
              .mul(12.9898)
              .add(u.mul(78.233)),
          ).mul(43758.5),
        ),
        f = K(z(c.div(6).add(u.mul(0.5))), z(l.div(2.4))),
        p = Z(60, 220, ai.z.negate()),
        m = B(1).sub(
          Z(0, 0.012, f.x)
            .mul(Z(1, 0.988, f.x))
            .mul(Z(0, 0.03, f.y))
            .mul(Z(1, 0.97, f.y)),
        ),
        h = Z(0.035, 0, Y(z(l.div(7.2)).sub(0.5))),
        g = Z(-6, -30, l).mul(0.22),
        _ = J(W(`#8d8a84`), W(`#a29e96`), d)
          .mul(B(1).sub(m.mul(0.38).mul(p.oneMinus())))
          .mul(B(1).sub(g))
          .add(W(`#6f8796`).mul(h.mul(0.18).mul(p.oneMinus()))),
        v = Z(k_.street - 1, k_.street - 3, U.y).mul(Z(0.55, 0.85, o.length())),
        y = x_,
        b = A_,
        x = U.x.sub(y.x0).div(y.pitch),
        S = U.z.sub(y.z0).div(y.pitch),
        C = z(x).sub(0.5).mul(y.pitch),
        w = z(S).sub(0.5).mul(y.pitch),
        T = (e, t) =>
          R(
            this.streetFlags,
            K(
              e.add(1.5).div(this.streetFlags.image.width),
              t.add(1.5).div(this.streetFlags.image.height),
            ),
          ).level(B(0)),
        E = T(Cr(x), Cr(S.add(0.5))).r,
        D = T(Cr(x.add(0.5)), Cr(S)).g,
        O = (e, t) => {
          let n = Vr(e).mul(0.75).add(0.02);
          return Z(n.add(t), n.negate().add(t), Y(e));
        },
        ee = O(C, b.carriage).mul(E),
        te = O(w, b.carriage).mul(D),
        k = V(ee, te),
        ne = V(O(C, b.pavement).mul(E), O(w, b.pavement).mul(D)).mul(
          k.oneMinus(),
        ),
        re = V(
          O(Y(C).sub(b.carriage + 0.15), 0.15).mul(E),
          O(Y(w).sub(b.carriage + 0.15), 0.15).mul(D),
        ).mul(V(k, ne)),
        A = ai.z.negate(),
        ie = B(1).sub(Z(140, 320, A)),
        ae = Z(900, 1900, A),
        oe = O(C, b.carriage).mul(O(w, b.carriage)),
        se = (e) => G(0.45, z(e.div(6))),
        ce = (e, t, n) => {
          let r = O(e, 0.12).mul(se(t)),
            i = O(Y(e).sub(b.carriage / 2), 0.08).mul(se(t)),
            a = O(Y(e).sub(b.carriage - 0.45), 0.08),
            o = O(Y(n).sub(b.carriage + 2.6), 1.6)
              .mul(G(0.5, z(e.div(1.1))))
              .mul(O(e, b.carriage - 0.6));
          return V(V(r, i), V(a, o));
        },
        le = V(ce(C, U.z, w).mul(ee), ce(w, U.x, C).mul(te))
          .mul(oe.oneMinus())
          .mul(ie),
        ue = J(W(`#4f5257`), W(`#5b5e63`), n).mul(
          Fi(q(t.x, 0, t.y).mul(0.35))
            .mul(0.05)
            .add(1),
        ),
        de = J(
          J(
            J(
              a.mul(J(B(0.8), B(1), i)),
              J(W(`#c5beb2`), W(`#b7b0a4`), n),
              ne.mul(0.85),
            ),
            ue,
            k.mul(ae.mul(-0.55).add(1)),
          ),
          W(`#dcd7cc`),
          re.mul(0.8).mul(ie),
        ).add(W(`#e8e4da`).mul(le.mul(0.75))),
        fe = Z(k_.street - 0.35, k_.street - 0.05, U.y).mul(
          Z(0.95, 0.995, Hi.y),
        );
      return (
        (e.colorNode = J(J(a.mul(J(B(0.8), B(1), i)), de, fe), _, v)),
        this.owned.push(e),
        e
      );
    }
    createGround(e) {
      let { tile: t, margin: n, fine: r, fineMobile: i } = k_,
        a = e ? i : r,
        o = 1 / 0,
        s = 1 / 0,
        c = -1 / 0,
        l = -1 / 0;
      for (let e = 0; e < F; e += 20) {
        let t = Gn(e).position;
        ((o = Math.min(o, t.x)),
          (c = Math.max(c, t.x)),
          (s = Math.min(s, t.z)),
          (l = Math.max(l, t.z)));
      }
      ((o = Math.floor((o - n) / t) * t),
        (s = Math.floor((s - n) / t) * t),
        (c = Math.ceil((c + n) / t) * t),
        (l = Math.ceil((l + n) / t) * t));
      let u = (e, n) =>
          this.road.some(
            (r) =>
              r.x > e - 40 &&
              r.x < e + t + 40 &&
              r.z > n - 40 &&
              r.z < n + t + 40,
          ),
        d = this.basinStep * 3,
        f = ph.polygon,
        p = Math.min(...f.map((e) => e[0])) - d,
        m = Math.max(...f.map((e) => e[0])) + d,
        h = Math.min(...f.map((e) => e[1])) - d,
        g = Math.max(...f.map((e) => e[1])) + d,
        _ = (e, n) => e < m && e + t > p && n < g && n + t > h,
        v = [],
        y = 0,
        b = 0,
        x = 0,
        S = [],
        C = (e, t, n) => {
          for (let i = e; i <= e + n; i += r)
            for (let e = t; e <= t + n; e += r)
              if (this.sidedFloor(i, e) !== k_.street) return !1;
          return !0;
        },
        w = (e, t, n, r) => {
          let i = Math.round(n / r),
            a = new rt(n, n, i, i);
          (a.rotateX(-Math.PI / 2),
            a.translate(e + n / 2, 0, t + n / 2),
            a.deleteAttribute(`uv`),
            a.deleteAttribute(`normal`));
          let o = a.getAttribute(`position`);
          for (let e = 0; e < o.count; e++)
            o.setY(e, this.sidedFloor(o.getX(e), o.getZ(e)));
          let s = this.cutPortals(a, e, t, n, r);
          (s.computeVertexNormals(),
            S.push(s),
            (x += (s.index?.count ?? 0) / 3));
        };
      for (let n = o; n < c; n += t)
        for (let i = s; i < l; i += t) {
          y++;
          let o = _(n, i);
          if (!o && !u(n, i)) {
            v.push(n, i);
            continue;
          }
          if ((b++, o || !e)) {
            w(n, i, t, o ? Math.min(a, this.basinStep) : a);
            continue;
          }
          for (let e = 0; e < t; e += 32)
            for (let o = 0; o < t; o += 32)
              w(n + e, i + o, 32, C(n + e, i + o, 32) ? a : r);
        }
      let T = new Float32Array((v.length / 2) * 4 * 3),
        E = [];
      for (let e = 0; e < v.length / 2; e++) {
        let n = v[e * 2],
          r = v[e * 2 + 1],
          i = k_.street;
        T.set([n, i, r, n + t, i, r, n, i, r + t, n + t, i, r + t], e * 12);
        let a = e * 4;
        E.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
      let D = new tr();
      (D.setAttribute(`position`, new vt(T, 3)),
        D.setAttribute(
          `normal`,
          new vt(
            new Float32Array(T.length).map((e, t) => +(t % 3 == 1)),
            3,
          ),
        ),
        D.setIndex(E),
        (x += E.length / 3));
      let O = ur([D, ...S]);
      for (let e of [D, ...S]) e.dispose();
      L_(O);
      let ee = new N(O, this.groundMaterial);
      return (
        (ee.name = `Meridian streets`),
        (ee.receiveShadow = !0),
        this.group.add(ee),
        this.owned.push(O),
        { tiles: y, fineTiles: b, triangles: x }
      );
    }
    createBasin() {
      let e = ph.polygon,
        { floor: t, coping: n } = k_.basin,
        r = ph.waterY,
        i = new un(new zn(e.map(([e, t]) => new b(e, -t))));
      (i.rotateX(-Math.PI / 2), i.translate(0, r, 0), i.deleteAttribute(`uv`));
      let a = new I({ name: `Meridian marina`, roughness: 0.05, metalness: 0 }),
        o = this.waterClock,
        s = U.xz,
        c = Fi(q(s.x.mul(0.09), s.y.mul(0.13), o.mul(0.22))),
        l = Fi(q(s.x.mul(0.41).add(17), s.y.mul(0.33), o.mul(0.5))),
        u = Fi(q(s.x.mul(1.7), s.y.mul(1.3), o.mul(0.8)))
          .mul(0.5)
          .add(0.5),
        d = J(W(`#0b2f3a`), W(`#16505a`), c.mul(0.3).add(0.45));
      a.colorNode = d.add(d.mul(u.pow(14).mul(3)));
      let f = q(c.mul(0.06).add(l.mul(0.035)), 1, l.mul(0.05)).normalize();
      a.normalNode = _r.mul(H(f, 0)).xyz.normalize();
      let p = new N(i, a);
      ((p.name = `Meridian marina water`), (p.receiveShadow = !0));
      let m = this.basinStep * 2.2 + 0.3,
        h = [],
        g = [],
        _ = (e, t, n, r, i) => {
          for (let a of [e, t, n, e, n, r])
            (h.push(a[0], a[1], a[2]), g.push(i[0], i[1], i[2]));
        };
      for (let r = 0; r < e.length; r++) {
        let [i, a] = e[r],
          [o, s] = e[(r + 1) % e.length],
          c = Math.hypot(o - i, s - a),
          l = (o - i) / c,
          u = (s - a) / c,
          d = -u,
          f = l;
        M_((i + o) / 2 + d * 0.5, (a + s) / 2 + f * 0.5, e) ||
          ((d = -d), (f = -f));
        let p = 0.6,
          h = [i - l * p, a - u * p],
          g = [o + l * p, s + u * p],
          v = [h[0] - d * m, h[1] - f * m],
          y = [g[0] - d * m, g[1] - f * m],
          b = [
            [h[0], t, h[1]],
            [g[0], t, g[1]],
            [g[0], n, g[1]],
            [h[0], n, h[1]],
          ],
          x = (g[0] - h[0]) * f - (g[1] - h[1]) * d > 0 ? b : [...b].reverse();
        _(x[0], x[1], x[2], x[3], [d, 0, f]);
        let S = [
            [h[0], n, h[1]],
            [g[0], n, g[1]],
            [y[0], n, y[1]],
            [v[0], n, v[1]],
          ],
          C =
            (g[0] - h[0]) * (v[1] - h[1]) - (g[1] - h[1]) * (v[0] - h[0]) < 0
              ? S
              : [...S].reverse();
        _(C[0], C[1], C[2], C[3], [0, 1, 0]);
      }
      let v = new tr();
      (v.setAttribute(`position`, new ct(h, 3)),
        v.setAttribute(`normal`, new ct(g, 3)));
      let y = new I({
          name: `Meridian quay stone`,
          color: `#c4bba9`,
          roughness: 0.7,
          metalness: 0,
        }),
        x = z(U.x.add(U.z).div(1.6)),
        S = z(U.y.div(0.8));
      y.colorNode = W(`#c4bba9`).mul(
        J(B(0.86), B(1), Z(0, 0.05, x).mul(Z(0, 0.08, S))),
      );
      let C = new N(v, y);
      return (
        (C.name = `Meridian marina quay`),
        (C.receiveShadow = !0),
        (C.castShadow = !1),
        this.group.add(p, C),
        this.owned.push(i, a, v, y),
        (i.index ? i.index.count : i.getAttribute(`position`).count) / 3 +
          h.length / 9
      );
    }
    createGarage() {
      let { centre: e } = k_.cauldron,
        t = k_.garage,
        n = this.garageBand,
        r = { position: [], normal: [], uv: [] },
        i = { position: [], normal: [] },
        a = (e, t, n, r) => {
          for (let i of [0, 1, 2, 0, 2, 3])
            (e.position.push(t[i][0], t[i][1], t[i][2]),
              e.normal.push(n[0], n[1], n[2]),
              e.uv && r && e.uv.push(r[i][0], r[i][1]));
        },
        o = (t, n, r) => {
          let i = (t * Math.PI) / 180;
          return [e[0] + Math.cos(i) * n, r, e[1] + Math.sin(i) * n];
        },
        s = this.garageFloor,
        c = [
          { floor: s.core, radius: s.coreR, out: 1, inner: -n - 0.4, outer: 0 },
          { floor: s.drum, radius: s.drumR, out: -1, inner: 0, outer: n + 0.4 },
        ],
        l = t.coping;
      for (let e of c) {
        let t = (t) => e.floor[(t + 360) % 360] === e.floor[(t + 360) % 360],
          n = (n) => {
            let r = e.radius[(n + 359) % 360],
              i = e.radius[n % 360];
            return t(n - 1)
              ? t(n)
                ? e.out > 0
                  ? Math.min(r, i)
                  : Math.max(r, i)
                : r
              : i;
          };
        for (let s = 0; s < 360; s++) {
          if (!t(s)) continue;
          let c = e.floor[s],
            u = s,
            d = s + 1,
            f = n(s),
            p = n(s + 1),
            m = c - 0.8,
            h = ((s + 0.5) * Math.PI) / 180,
            g = [Math.cos(h) * e.out, 0, Math.sin(h) * e.out],
            _ = [o(u, f, m), o(d, p, m), o(d, p, l), o(u, f, l)],
            v = (u * Math.PI * e.radius[s]) / 180,
            y = (d * Math.PI * e.radius[s]) / 180,
            b = [
              [v, 0],
              [y, 0],
              [y, 1],
              [v, 1],
            ];
          (e.out < 0
            ? a(r, _, g, b)
            : a(r, [_[1], _[0], _[3], _[2]], g, [b[1], b[0], b[3], b[2]]),
            a(
              i,
              [
                o(u, f + e.inner, l),
                o(d, p + e.inner, l),
                o(d, p + e.outer, l),
                o(u, f + e.outer, l),
              ],
              [0, 1, 0],
            ));
          for (let [n, r, c, h] of [
            [u, f, s - 1, -1],
            [d, p, s + 1, 1],
          ]) {
            if (t(c)) continue;
            let s = (n * Math.PI) / 180,
              u = [-Math.sin(s) * h, 0, Math.cos(s) * h],
              d = [
                o(n, r + e.inner, m),
                o(n, r + e.outer, m),
                o(n, r + e.outer, l),
                o(n, r + e.inner, l),
              ];
            a(i, h > 0 ? d : [d[1], d[0], d[3], d[2]], u);
          }
        }
      }
      if (!r.position.length) return 0;
      let u = new tr();
      (u.setAttribute(`position`, new ct(r.position, 3)),
        u.setAttribute(`normal`, new ct(r.normal, 3)),
        u.setAttribute(`uv`, new ct(r.uv, 2)));
      let d = new tr();
      (d.setAttribute(`position`, new ct(i.position, 3)),
        d.setAttribute(`normal`, new ct(i.normal, 3)));
      let f = new I({
          name: `Meridian Cauldron car park`,
          roughness: 0.82,
          metalness: 0,
        }),
        p = X().x,
        m = B(k_.street).sub(U.y),
        h = Cr(m.div(t.storey)),
        g = z(m.div(t.storey)).mul(t.storey),
        _ = (e, t) => z(Hr(e.mul(127.1).add(t.mul(311.7))).mul(43758.5453)),
        v = Z(0.3, 0.27, g),
        y = Z(2.27, 2.3, g),
        b = B(1).sub(v).sub(y).max(0),
        x = Z(0.455, 0.465, Y(z(p.div(7.8)).sub(0.5))),
        S = b.mul(x.oneMinus()),
        C = g.sub(0.3).div(2).clamp(0, 1),
        w = z(p.div(2.6)),
        T = Z(0.1, 0.04, C)
          .mul(Z(0.32, 0.38, w))
          .mul(Z(0.68, 0.62, w)),
        E = J(W(`#2b3239`), W(`#0c1014`), C.pow(0.7)),
        D = Cr(p.div(2.6)),
        O = G(0.22, _(D, h)),
        ee = z(p.div(2.6)).sub(0.5).abs().mul(2),
        te = B(0.74).add(ee.pow(5).mul(0.22)),
        k = O.mul(Z(0.86, 0.8, ee)).mul(Z(te, te.add(0.02), C)),
        ne = _(D.add(7), h.add(3)),
        re = J(
          J(W(`#e9ecef`), W(`#1b1f24`), G(0.45, ne)),
          J(W(`#a3222c`), W(`#2d5fa8`), G(0.82, ne)),
          G(0.7, ne),
        ),
        A = Z(0.86, 0.9, C)
          .oneMinus()
          .mul(Z(0.78, 0.8, C))
          .mul(0.65),
        ie = re.mul(B(1).sub(A)),
        ae = Z(2.4, 2.42, g).mul(Z(2.56, 2.54, g)),
        oe = z(h.mul(0.25)),
        se = J(
          J(W(`#14b8c8`), W(`#f2b134`), G(0.24, oe)),
          J(W(`#7a5cff`), W(`#3fd18b`), G(0.74, oe)),
          G(0.49, oe),
        ),
        ce = J(J(W(`#b4afa5`), W(`#9a968d`), v), se, ae.mul(y)),
        le = J(E, ie, k),
        ue = Z(90, 320, ai.z.negate());
      f.colorNode = J(
        J(ce, le, S),
        J(W(`#77746e`), W(`#5d5b57`), 0.5),
        ue.mul(0.7),
      );
      let de = Z(55, 25, ai.z.negate()),
        fe = Z(0.1, 0.04, C).mul(0.55);
      ((f.emissiveNode = W(`#ffd9a0`)
        .mul(J(T, fe, de).mul(S).mul(3.2))
        .add(
          W(`#ff2a1e`).mul(
            k
              .mul(Z(0.93, 0.95, C))
              .mul(Z(0.62, 0.58, ee))
              .mul(Z(0.42, 0.46, ee))
              .mul(de.oneMinus())
              .mul(1.4),
          ),
        )
        .mul(ue.oneMinus())),
        (f.roughnessNode = J(B(0.85), B(0.35), k.mul(S))));
      let pe = new I({
          name: `Meridian Cauldron coping`,
          color: `#bdb8ae`,
          roughness: 0.8,
          metalness: 0,
        }),
        j = new N(u, f);
      ((j.name = `Meridian Cauldron car park`),
        (j.castShadow = j.receiveShadow = !0));
      let me = new N(d, pe);
      return (
        (me.name = `Meridian Cauldron coping`),
        (me.receiveShadow = !0),
        this.group.add(j, me),
        this.owned.push(u, d, f, pe),
        (r.position.length + i.position.length) / 9
      );
    }
    createVertiportFacade() {
      let [e, t] = Ef.centre,
        n = jp[`vertiport-crown`],
        r = (Ef.crown - n.deckHeight - 0.6 - k_.street) / 199,
        i = n.drumRadius / 27.2,
        a = (e) =>
          (21.5 +
            3 * Math.sin((Math.PI * e) / 200) -
            4 * (e / 192) ** 4 +
            0.45) *
          i,
        o = [],
        s = [],
        c = [],
        l = [];
      for (let n = 0; n <= 24; n++) {
        let i = (192 * n) / 24,
          l = a(i),
          u = (a(i + 0.5) - a(i - 0.5)) / (r || 1);
        for (let n = 0; n <= 48; n++) {
          let a = (n / 48) * Math.PI * 2,
            d = Math.cos(a),
            f = Math.sin(a);
          o.push(e + d * l, k_.street + i * r, t + f * l);
          let p = new g(d, -u, f).normalize();
          (s.push(p.x, p.y, p.z), c.push(a * l, i * r));
        }
      }
      for (let e = 0; e < 24; e++)
        for (let t = 0; t < 48; t++) {
          let n = e * 49 + t,
            r = n + 1,
            i = n + 48 + 2,
            a = n + 48 + 1;
          l.push(n, a, i, n, i, r);
        }
      let u = new tr();
      (u.setAttribute(`position`, new ct(o, 3)),
        u.setAttribute(`normal`, new ct(s, 3)),
        u.setAttribute(`uv`, new ct(c, 2)),
        u.setIndex(l),
        u.computeBoundingSphere());
      let d = new I({
          name: `Meridian vertiport garage`,
          roughness: 0.8,
          metalness: 0,
        }),
        f = X().x,
        p = X().y,
        m = 3.6,
        h = Cr(p.div(m)),
        _ = z(p.div(m)).mul(m),
        v = (e, t) => z(Hr(e.mul(127.1).add(t.mul(311.7))).mul(43758.5453)),
        y = Z(0.42, 0.38, _),
        b = Z(2.95, 3, _),
        x = B(1).sub(y).sub(b).max(0),
        S = Z(0.46, 0.47, Y(z(f.div(9)).sub(0.5))),
        C = 2 * Math.PI * a(192 / 2),
        w = Z(0.485, 0.49, Y(z(f.div(C / 4)).sub(0.5))),
        T = x.mul(S.oneMinus()).mul(w.oneMinus()),
        E = _.sub(0.4).div(2.6).clamp(0, 1),
        D = Cr(f.div(4.5)),
        O = G(0.3, v(D, h)),
        ee = z(f.div(4.5)).sub(0.5).abs().mul(2),
        te = O.mul(Z(0.82, 0.76, ee))
          .mul(Z(0.62, 0.58, E))
          .mul(Z(0.08, 0.14, E)),
        k = te.mul(Z(0.34, 0.4, E)).mul(Z(0.42, 0.3, ee)),
        ne = v(D.add(5), h.add(9)),
        re = J(
          J(W(`#f2f2ee`), W(`#f2b134`), G(0.55, ne)),
          W(`#2338c8`),
          G(0.85, ne),
        ),
        A = J(
          J(W(`#1e262e`), W(`#0b0f13`), E.pow(0.6)),
          J(re, W(`#10161c`), k),
          te,
        ),
        ie = J(J(J(W(`#d7d4cc`), W(`#b9b5ac`), y), W(`#8e959c`), w), A, T),
        ae = Z(120, 420, ai.z.negate());
      d.colorNode = J(ie, W(`#7c8086`), ae.mul(0.6));
      let oe = O.mul(Z(0.08, 0.02, E))
          .mul(Z(0.85, 0.75, ee))
          .mul(T),
        se = Z(0.96, 0.99, E.oneMinus()).mul(T);
      ((d.emissiveNode = W(`#3fe6ff`)
        .mul(oe.mul(2.4))
        .add(W(`#ffe1b0`).mul(se.mul(1.6)))
        .mul(ae.mul(-0.6).add(1))),
        (d.roughnessNode = J(B(0.85), B(0.3), te)));
      let ce = new N(u, d);
      return (
        (ce.name = `Meridian vertiport garage`),
        (ce.receiveShadow = !0),
        (ce.castShadow = !1),
        this.group.add(ce),
        this.owned.push(u, d),
        l.length / 3
      );
    }
    dispose() {
      for (let e of this.owned) e.dispose();
      (this.streetFlags.dispose(),
        this.traffic?.dispose(),
        (this.traffic = null),
        this.group.clear());
    }
  },
  B_ = 0.22,
  V_ = new M().makeScale(0, 0, 0),
  H_ = new M(),
  U_ = new g(),
  W_ = new Ot(),
  G_ = class {
    constructor() {
      ((this.group = new pn()),
        (this.takenAt = new Map()),
        (this.orbs = null),
        (this.group.name = `Orbs`));
      let e = new i({ name: `Orb core` });
      e.colorNode = q(1.4, 3.2, 3.6);
      let t = new i({
          name: `Orb shell`,
          transparent: !0,
          depthWrite: !1,
          blending: 2,
        }),
        n = vr(B(1).sub(Y(vi(Ci, Ji))), 2.2);
      ((t.colorNode = q(0.25, 1.1, 1.6).mul(n.mul(1.8).add(0.08))),
        (this.core = new Wn(new ht(0.75, 3), e, gt.count)),
        (this.shell = new Wn(new ht(1.7, 3), t, gt.count)));
      for (let e of [this.core, this.shell]) {
        ((e.frustumCulled = !1),
          (e.castShadow = e.receiveShadow = !1),
          (e.userData.reflectionHidden = !0));
        for (let t = 0; t < gt.count; t++) e.setMatrixAt(t, V_);
        this.group.add(e);
      }
      ((this.shell.renderOrder = 2), (this.group.visible = !1));
    }
    update(e, t) {
      (e !== this.orbs && ((this.orbs = e), this.takenAt.clear()),
        (this.group.visible = !!e?.length),
        e?.length &&
          (e.forEach((e, n) => {
            let r = 1;
            if (e.taken) {
              let n = this.takenAt.get(e);
              n === void 0 && this.takenAt.set(e, (n = t));
              let i = (t - n) / B_;
              r = i < 1 ? 1 + i * 1.6 : 0;
            }
            if (!r) {
              (this.core.setMatrixAt(n, V_), this.shell.setMatrixAt(n, V_));
              return;
            }
            let i = Math.sin(t * 2.3 + n * 1.7) * 0.3,
              a = P(e.distance, e.lane, gt.height + i);
            (H_.compose(a, W_, U_.setScalar(+!e.taken)),
              this.core.setMatrixAt(n, H_),
              H_.compose(a, W_, U_.setScalar(r)),
              this.shell.setMatrixAt(n, H_));
          }),
          (this.core.instanceMatrix.needsUpdate = !0),
          (this.shell.instanceMatrix.needsUpdate = !0)));
    }
    dispose() {
      this.group.removeFromParent();
      for (let e of [this.core, this.shell])
        (e.geometry.dispose(), e.material.dispose(), e.dispose());
    }
  };
