// assets__game-D43Oxqny 58 — mul
// Lines 23156-24675 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var B_ = class {
    constructor(e, { mobile: t = !1 } = {}) {
      ((this.group = new An()),
        (this.grid = new Map()),
        (this.portals = L_()),
        (this.owned = []),
        (this.waterClock = R(0)),
        (this.skyClock = R(0)),
        (this.trafficClock = R(0)),
        (this.streetFlags = (() => {
          let e = S_,
            t = Math.floor((e.x1 - e.x0) / e.pitch) + 3,
            n = Math.floor((e.z1 - e.z0) / e.pitch) + 3,
            r = new fe(new Uint8Array(t * n * 4), t, n);
          return (
            (r.name = `Meridian street flags`),
            (r.magFilter = r.minFilter = Ve),
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
        (this.road = F_()));
      for (let e of this.road) {
        let t = this.key(e.x, e.z),
          n = this.grid.get(t);
        n ? n.push(e) : this.grid.set(t, [e]);
      }
      ((this.basinStep = t ? A_.basin.stepMobile : A_.basin.step),
        (this.garageBand = (t ? A_.fineMobile : A_.fine) * Math.SQRT2 + 0.2),
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
      let n = S_,
        r = j_,
        i = A_.street,
        a = n.x0 - n.pitch,
        o = n.z0 - n.pitch,
        s = Math.ceil((n.x1 - n.x0 + 2 * n.pitch) / 4),
        c = Math.ceil((n.z1 - n.z0 + 2 * n.pitch) / 4),
        l = new Uint8Array(s * c),
        u = [],
        d = Math.ceil(r.roadClear / 4) + 1;
      for (let e = 0; e < v; e += 4) {
        let t = Ot(e).position;
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
        h = new A();
      for (let t of Object.keys(e.placements))
        for (let n of e.placements[t]) {
          let e = th[t]?.bounds[n.asset];
          if (!e) continue;
          let a = 1 / 0,
            o = -1 / 0;
          for (let t of [e.min[1], e.max[1]])
            (h.set(0, t, 0).applyMatrix4(n.matrix),
              (a = Math.min(a, h.y)),
              (o = Math.max(o, h.y)));
          if (!M_.has(n.asset) && (a > i + r.standing || o < i + 0.2)) continue;
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
      let g = (e, t, n) => {
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
        _ = mh.polygon,
        y = r.pavement + 4,
        b = Math.min(..._.map((e) => e[0])) - y,
        x = Math.max(..._.map((e) => e[0])) + y,
        S = Math.min(..._.map((e) => e[1])) - y,
        C = Math.max(..._.map((e) => e[1])) + y,
        w = (e, t) =>
          e > b && e < x && t > S && t < C && (N_(e, t, _) || P_(e, t, _) < y),
        T = (e, t) =>
          !f(e, t) && !w(e, t) && !g(e, t, 0.5) && this.heightAt(e, t) === i,
        ee = (e, t, n, i) => {
          let a = Math.hypot(n - e, i - t),
            o = (n - e) / a,
            s = (i - t) / a;
          for (let n = -r.carriage; n <= a + r.carriage; n += 4)
            for (let i of [-r.carriage, 0, r.carriage])
              if (!T(e + o * n - s * i, t + s * n + o * i)) return !1;
          return !0;
        },
        te = this.streetFlags,
        E = te.image.data,
        D = te.image.width,
        ne = te.image.height,
        re = D - 2,
        ie = ne - 2,
        ae = (e) => n.x0 + (e + 0.5) * n.pitch,
        oe = (e) => n.z0 + (e + 0.5) * n.pitch,
        se = (e) => n.x0 + e * n.pitch,
        ce = (e) => n.z0 + e * n.pitch,
        le = [],
        ue = [];
      for (let e = 0; e < re; e++) {
        (le.push([]), ue.push([]));
        for (let t = 0; t < ie; t++) {
          let r = ae(e),
            i = oe(t),
            a =
              e < re - 1 && ee(r, ce(t) - n.pitch / 2, r, ce(t) + n.pitch / 2),
            o =
              t < ie - 1 && ee(se(e) - n.pitch / 2, i, se(e) + n.pitch / 2, i);
          (le[e].push(a), ue[e].push(o));
          let s = ((t + 1) * D + (e + 1)) * 4;
          ((E[s] = a ? 255 : 0),
            (E[s + 1] = o ? 255 : 0),
            a && this.streets.stretches++,
            o && this.streets.stretches++);
        }
      }
      if (
        ((te.needsUpdate = !0),
        (this.streets.paved = 1),
        (this.info.streets = this.streets),
        this.raiseTerraces(e.placements.street),
        t)
      )
        return this.streets;
      let O = [],
        de = (e, t, i, a, o) => {
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
              O.push({ x: l, z: u, dx: a, dz: o, len: d, near: e });
            }
            s = c + 1;
          }
        };
      for (let e = 0; e < re - 1; e++)
        de(
          ie,
          (t) => le[e][t],
          (t) => [ae(e), ce(t) - n.pitch / 2],
          0,
          1,
        );
      for (let e = 0; e < ie - 1; e++)
        de(
          re,
          (t) => ue[t][e],
          (t) => [se(t) - n.pitch / 2, oe(e)],
          1,
          0,
        );
      (O.sort((e, t) => e.near - t.near || t.len - e.len),
        (this.streets.runs = O.length));
      let fe = 24301,
        pe = () => ((fe = (fe * 1664525 + 1013904223) >>> 0), fe / 2 ** 32),
        me = [],
        he = [
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
        ].map((e) => new j(e));
      fill: for (let e of O)
        for (let t of e.near < r.busy
          ? r.lanes
          : [r.lanes[Math.floor(pe() * r.lanes.length)]]) {
          let n = t + 2.6,
            i = e.len - 2 * n;
          if (i < 20) continue;
          let a = 2 * i + 2 * Math.PI * t,
            o = r.speed[0] + pe() * (r.speed[1] - r.speed[0]),
            s = e.x + e.dx * n,
            c = e.z + e.dz * n;
          for (let n = pe() * r.spacing[0]; n < a - 8;) {
            if (me.length >= r.cars) break fill;
            let l = pe() < 0.07;
            (me.push({
              run: [s, c, e.dx, e.dz],
              loop: [i, t, n / a, o / a],
              size: l ? [1.3, 1.55, 2.7] : [1, 1, 1],
              paint: l
                ? new j(pe() < 0.5 ? `#c8202a` : `#f2f2ee`)
                : he[Math.floor(pe() * he.length)],
            }),
              (n += r.spacing[0] + pe() * (r.spacing[1] - r.spacing[0])));
          }
        }
      if (!me.length) return this.streets;
      let ge = z_(),
        _e = new Float32Array(me.length * 4),
        k = new Float32Array(me.length * 4),
        ve = new Float32Array(me.length * 3),
        ye = new Float32Array(me.length * 3);
      me.forEach((e, t) => {
        (_e.set(e.run, t * 4),
          k.set(e.loop, t * 4),
          ve.set(e.size, t * 3),
          ye.set([e.paint.r, e.paint.g, e.paint.b], t * 3));
      });
      for (let [e, t, n] of [
        [`trafficRun`, _e, 4],
        [`trafficLoop`, k, 4],
        [`trafficSize`, ve, 3],
        [`trafficPaint`, ye, 3],
      ])
        ge.setAttribute(e, new on(t, n));
      let be = new I({
          name: `Meridian ground traffic`,
          roughness: 0.4,
          metalness: 0.25,
        }),
        xe = ii(`trafficRun`, `vec4`),
        Se = ii(`trafficLoop`, `vec4`),
        M = ii(`trafficSize`, `vec3`),
        Ce = Se.x,
        we = Se.y,
        Te = we.mul(Math.PI),
        Ee = Ce.mul(2).add(Te),
        N = B(Se.z.add(this.trafficClock.mul(Se.w))).mul(Ee),
        De = xe.xy,
        Oe = xe.zw,
        ke = q(Oe.y.negate(), Oe.x),
        Ae = De.add(Oe.mul(Ce)),
        P = N.sub(Ce).div(we).clamp(0, Math.PI),
        je = N.sub(Ce).sub(Te),
        Me = N.sub(Ce.mul(2)).sub(Te).div(we).clamp(0, Math.PI),
        Ne = [
          [De.add(Oe.mul(N)).add(ke.mul(we)), Oe],
          [
            Ae.add(Oe.mul(we.mul(Hr(P)))).add(ke.mul(we.mul(Rr(P)))),
            Oe.mul(Rr(P)).sub(ke.mul(Hr(P))),
          ],
          [Ae.sub(Oe.mul(je)).sub(ke.mul(we)), Oe.negate()],
          [
            De.sub(Oe.mul(we.mul(Hr(Me)))).sub(ke.mul(we.mul(Rr(Me)))),
            Oe.negate()
              .mul(Rr(Me))
              .add(ke.mul(Hr(Me))),
          ],
        ],
        Pe = (e) =>
          Br(
            N.lessThan(Ce),
            Ne[0][e],
            Br(
              N.lessThan(Ce.add(Te)),
              Ne[1][e],
              Br(N.lessThan(Ce.mul(2).add(Te)), Ne[2][e], Ne[3][e]),
            ),
          ),
        Fe = Pe(0),
        Ie = Pe(1),
        Le = q(Ie.y, Ie.x.negate()),
        Re = Gi.mul(M),
        ze = Fe.add(Ie.mul(Re.z)).add(Le.mul(Re.x));
      be.positionNode = J(ze.x, Re.y.add(i), ze.y);
      let Be = ji,
        Ve = J(
          Ie.x.mul(Be.z).add(Le.x.mul(Be.x)),
          Be.y,
          Ie.y.mul(Be.z).add(Le.y.mul(Be.x)),
        );
      be.normalNode = _r.mul(U(Ve, 0)).xyz.normalize();
      let He = ii(`carGlass`, `float`),
        Ue = ii(`trafficPaint`, `vec3`),
        We = Z(0.32, 0.52, Gi.y).mul(0.75).add(0.25);
      ((be.colorNode = Y(Ue, G(`#151b22`), He).mul(We)),
        (be.roughnessNode = Y(V(0.42), V(0.08), He)));
      let Ge = new Dt(ge, be, me.length);
      return (
        (Ge.name = `Meridian ground traffic`),
        (Ge.frustumCulled = !1),
        (Ge.castShadow = !1),
        (Ge.receiveShadow = !0),
        (Ge.userData.proxied = !0),
        (Ge.userData.reflectionHidden = !0),
        this.group.add(Ge),
        (this.traffic = Ge),
        this.owned.push(ge, be),
        (this.streets.cars = me.length),
        this.streets
      );
    }
    floorAt(e, t, n) {
      let r = this.carved(e, t, n, !0),
        { centre: i } = A_.cauldron,
        a = A_.garage,
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
      let s = mh.polygon;
      return N_(e, t, s) || P_(e, t, s) < this.basinStep * 0.75
        ? Math.min(r, A_.basin.floor)
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
      let m = new Me();
      return (
        m.setAttribute(`position`, new er(p, 3)),
        m.setIndex(c),
        e.dispose(),
        m
      );
    }
    raiseTerraces(e) {
      let t = Ng,
        n = Pg,
        r = [],
        i = [],
        a = new A(),
        o = new A(),
        s = (e, t) => {
          for (let n of [0, 1, 2, 0, 2, 3])
            (r.push(e[n].x, e[n].y, e[n].z), i.push(t.x, t.y, t.z));
        },
        c = (e, t, n, r, i, a, c) => {
          let l = (t, n, r) => new A(t, n, r).applyMatrix4(e),
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
          let e = Fg(a, r);
          if (e === null) {
            i = null;
            continue;
          }
          if (i) {
            let t = (e, t, n) => {
                let i = Ot(e),
                  a = Math.hypot(i.right.x, i.right.z) || 1;
                return new A(
                  i.position.x + (i.right.x / a) * r * t,
                  n,
                  i.position.z + (i.right.z / a) * r * t,
                );
              },
              o = i,
              c = { d: a, top: e },
              l = A_.street - 0.3,
              u = t(o.d, n.inner, o.top - 0.04),
              d = t(o.d, n.outer, o.top - 0.04),
              f = t(c.d, n.inner, c.top - 0.04),
              p = t(c.d, n.outer, c.top - 0.04),
              m = new A(0, 1, 0);
            s(r > 0 ? [u, f, p, d] : [u, d, p, f], m);
            let h = new A().subVectors(d, u).setY(0).normalize(),
              g = d.clone().setY(l),
              _ = p.clone().setY(l);
            (s(r > 0 ? [_, g, d, p] : [g, _, p, d], h),
              (this.streets.vergeMetres += 2));
          }
          i = { d: a, top: e };
        }
      }
      if (!r.length) return;
      let l = new Me();
      (l.setAttribute(`position`, new N(r, 3)),
        l.setAttribute(`normal`, new N(i, 3)));
      let u = new I({
          name: `Meridian terrace concrete`,
          roughness: 0.86,
          metalness: 0,
        }),
        d = Z(0.6, 0.9, Ui.y),
        f = Z(A_.street + 0.8, A_.street, W.y);
      u.colorNode = Y(G(`#a8a39a`), G(`#c9c4ba`), d).mul(V(1).sub(f.mul(0.18)));
      let p = new M(l, u);
      ((p.name = `Meridian terraces`),
        (p.castShadow = p.receiveShadow = !0),
        this.group.add(p),
        this.owned.push(l, u));
    }
    garageBin(e, t) {
      let { centre: n } = A_.cauldron,
        r = Math.atan2(t - n[1], e - n[0]) * (180 / Math.PI);
      return ((Math.floor(r) % 360) + 360) % 360;
    }
    planGarage() {
      let { centre: e } = A_.cauldron,
        t = A_.garage,
        n = new Float32Array(360).fill(NaN),
        r = new Float32Array(360).fill(NaN),
        i = new Float32Array(360).fill(t.core),
        a = new Float32Array(360).fill(t.drum),
        o = [];
      for (let t = 0; t < v; t += 2) {
        let n = Ot(t),
          r = n.position,
          i = Math.hypot(r.x - e[0], r.z - e[1]);
        if (i > 130) continue;
        let a = P(t),
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
        g < A_.street - t.depth && f > t.core - 4 && ((n[s] = g), (i[s] = f));
        let [_, v] = d(p - 0.9),
          y = this.heightAt(_, v),
          b = o.some(
            (t) =>
              Math.hypot(e[0] + l * p - t.x, e[1] + u * p - t.z) < t.out + 0.4,
          );
        y < A_.street - t.depth &&
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
      let { street: i, bed: a, wall: o, cauldron: s } = A_,
        c = i,
        l = Math.floor(e / 32),
        u = Math.floor(t / 32),
        d = Math.hypot(e - s.centre[0], t - s.centre[1]),
        f = r && d > s.drum + 10;
      for (let r = -1; r <= 1; r++)
        for (let s = -1; s <= 1; s++)
          for (let d of this.grid.get(`${l + r},${u + s}`) ?? []) {
            if (n && d.d > n[0] && d.d < n[1]) continue;
            let r = e - d.x,
              s = t - d.z,
              l = r * d.rx + s * d.rz,
              u = Math.abs(l);
            if (Math.abs(r * d.rz - s * d.rx) > 2.2) continue;
            let p = Math.sign(l) * Math.min(u, d.half + 1),
              m = Math.min(i, (f ? d.cy + d.tan * p : d.y) - a);
            if (m >= i) continue;
            let h = f ? F.clamp((i - m - 3) / 6, 0, 1) * 2.5 : 0,
              g = d.half + 2 + h,
              _ = o - h;
            u <= g
              ? (c = Math.min(c, m))
              : u <= g + _ && (c = Math.min(c, F.lerp(m, i, (u - g) / _)));
          }
      return (d < s.core && (c = i), c);
    }
    sunken(e, t) {
      return this.heightAt(e, t) < A_.street - 0.5;
    }
    createSky() {
      let e = new At({
          name: `Meridian sky`,
          side: 1,
          depthWrite: !1,
          fog: !1,
        }),
        t = J(Zo),
        n = W.sub(Ur).normalize(),
        r = n.y.max(0),
        i = Y(
          Y(G(`#dfe6ea`), G(`#79a9dc`), Z(0, 0.12, r)),
          Y(G(`#3b78c4`), G(`#1d4f9a`), Z(0.35, 0.95, r)),
          Z(0.1, 0.4, r),
        ),
        a = J(t.x, 0, t.z).normalize(),
        o = Z(0.75, 1, J(n.x, 0, n.z).normalize().dot(a)).mul(
          V(1).sub(Z(0, 0.22, r)),
        ),
        s = Y(i, G(`#f3dcc0`), o.mul(0.75)),
        c = this.skyClock,
        l = J(c.mul(0.0011), 0, c.mul(6e-4)),
        u = n.add(l),
        d = Ii(u.mul(J(4, 14, 4)))
          .mul(0.7)
          .add(Ii(u.mul(J(12, 30, 12))).mul(0.25))
          .smoothstep(0.12, 0.55)
          .mul(Z(0, 0.05, r))
          .mul(V(1).sub(Z(0.12, 0.3, r))),
        f = Y(G(`#9fb2c6`), G(`#fbfaf6`), Z(0.02, 0.14, r)),
        p = Ii(u.mul(J(1.2, 6, 9)))
          .smoothstep(0.25, 0.7)
          .mul(Z(0.25, 0.6, r))
          .mul(0.08),
        m = n.dot(t).max(0).pow(850),
        h = n.dot(t).max(0).pow(10),
        g = Y(s, f, d.mul(0.85))
          .add(p)
          .add(m.mul(J(6, 5.4, 4.6)))
          .add(h.mul(J(0.24, 0.2, 0.14)));
      e.colorNode = Y(G(`#9aa6af`), g, Z(-0.12, 0.02, n.y));
      let _ = new M(new nn(6e3, 32, 24), e);
      return (
        (_.name = `Meridian sky`),
        (_.renderOrder = -1),
        this.owned.push(_.geometry, e),
        _
      );
    }
    createGroundMaterial() {
      let e = new I({ name: `Meridian paving`, roughness: 0.82, metalness: 0 }),
        t = W.xz,
        n = Ii(J(t.x, 0, t.y).mul(0.004))
          .mul(0.5)
          .add(0.5),
        r = B(t.div(3)),
        i = Z(0, 0.04, r.x)
          .mul(Z(0, 0.04, r.y))
          .mul(Z(1, 0.96, r.x))
          .mul(Z(1, 0.96, r.y)),
        a = Y(G(`#a59d90`), G(`#bab2a4`), n),
        o = q(Ui.x, Ui.z),
        s = q(o.y.negate(), o.x).div(o.length().max(0.001)),
        c = W.xz.dot(s),
        l = W.y.sub(A_.street),
        u = Cr(l.div(2.4)),
        d = B(
          Hr(
            Cr(c.div(6).add(u.mul(0.5)))
              .mul(12.9898)
              .add(u.mul(78.233)),
          ).mul(43758.5),
        ),
        f = q(B(c.div(6).add(u.mul(0.5))), B(l.div(2.4))),
        p = Z(60, 220, ai.z.negate()),
        m = V(1).sub(
          Z(0, 0.012, f.x)
            .mul(Z(1, 0.988, f.x))
            .mul(Z(0, 0.03, f.y))
            .mul(Z(1, 0.97, f.y)),
        ),
        h = Z(0.035, 0, hi(B(l.div(7.2)).sub(0.5))),
        g = Z(-6, -30, l).mul(0.22),
        _ = Y(G(`#8d8a84`), G(`#a29e96`), d)
          .mul(V(1).sub(m.mul(0.38).mul(p.oneMinus())))
          .mul(V(1).sub(g))
          .add(G(`#6f8796`).mul(h.mul(0.18).mul(p.oneMinus()))),
        v = Z(A_.street - 1, A_.street - 3, W.y).mul(Z(0.55, 0.85, o.length())),
        y = S_,
        b = j_,
        x = W.x.sub(y.x0).div(y.pitch),
        S = W.z.sub(y.z0).div(y.pitch),
        C = B(x).sub(0.5).mul(y.pitch),
        w = B(S).sub(0.5).mul(y.pitch),
        T = (e, t) =>
          z(
            this.streetFlags,
            q(
              e.add(1.5).div(this.streetFlags.image.width),
              t.add(1.5).div(this.streetFlags.image.height),
            ),
          ).level(V(0)),
        ee = T(Cr(x), Cr(S.add(0.5))).r,
        te = T(Cr(x.add(0.5)), Cr(S)).g,
        E = (e, t) => {
          let n = Vr(e).mul(0.75).add(0.02);
          return Z(n.add(t), n.negate().add(t), hi(e));
        },
        D = E(C, b.carriage).mul(ee),
        ne = E(w, b.carriage).mul(te),
        re = H(D, ne),
        ie = H(E(C, b.pavement).mul(ee), E(w, b.pavement).mul(te)).mul(
          re.oneMinus(),
        ),
        ae = H(
          E(hi(C).sub(b.carriage + 0.15), 0.15).mul(ee),
          E(hi(w).sub(b.carriage + 0.15), 0.15).mul(te),
        ).mul(H(re, ie)),
        oe = ai.z.negate(),
        se = V(1).sub(Z(140, 320, oe)),
        ce = Z(900, 1900, oe),
        le = E(C, b.carriage).mul(E(w, b.carriage)),
        ue = (e) => K(0.45, B(e.div(6))),
        O = (e, t, n) => {
          let r = E(e, 0.12).mul(ue(t)),
            i = E(hi(e).sub(b.carriage / 2), 0.08).mul(ue(t)),
            a = E(hi(e).sub(b.carriage - 0.45), 0.08),
            o = E(hi(n).sub(b.carriage + 2.6), 1.6)
              .mul(K(0.5, B(e.div(1.1))))
              .mul(E(e, b.carriage - 0.6));
          return H(H(r, i), H(a, o));
        },
        de = H(O(C, W.z, w).mul(D), O(w, W.x, C).mul(ne))
          .mul(le.oneMinus())
          .mul(se),
        fe = Y(G(`#4f5257`), G(`#5b5e63`), n).mul(
          Ii(J(t.x, 0, t.y).mul(0.35))
            .mul(0.05)
            .add(1),
        ),
        pe = Y(
          Y(
            Y(
              a.mul(Y(V(0.8), V(1), i)),
              Y(G(`#c5beb2`), G(`#b7b0a4`), n),
              ie.mul(0.85),
            ),
            fe,
            re.mul(ce.mul(-0.55).add(1)),
          ),
          G(`#dcd7cc`),
          ae.mul(0.8).mul(se),
        ).add(G(`#e8e4da`).mul(de.mul(0.75))),
        me = Z(A_.street - 0.35, A_.street - 0.05, W.y).mul(
          Z(0.95, 0.995, Ui.y),
        );
      return (
        (e.colorNode = Y(Y(a.mul(Y(V(0.8), V(1), i)), pe, me), _, v)),
        this.owned.push(e),
        e
      );
    }
    createGround(e) {
      let { tile: t, margin: n, fine: r, fineMobile: i } = A_,
        a = e ? i : r,
        o = 1 / 0,
        s = 1 / 0,
        c = -1 / 0,
        l = -1 / 0;
      for (let e = 0; e < v; e += 20) {
        let t = Ot(e).position;
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
        f = mh.polygon,
        p = Math.min(...f.map((e) => e[0])) - d,
        m = Math.max(...f.map((e) => e[0])) + d,
        h = Math.min(...f.map((e) => e[1])) - d,
        g = Math.max(...f.map((e) => e[1])) + d,
        _ = (e, n) => e < m && e + t > p && n < g && n + t > h,
        y = [],
        b = 0,
        x = 0,
        S = 0,
        C = [],
        w = (e, t, n) => {
          for (let i = e; i <= e + n; i += r)
            for (let e = t; e <= t + n; e += r)
              if (this.sidedFloor(i, e) !== A_.street) return !1;
          return !0;
        },
        T = (e, t, n, r) => {
          let i = Math.round(n / r),
            a = new Ye(n, n, i, i);
          (a.rotateX(-Math.PI / 2),
            a.translate(e + n / 2, 0, t + n / 2),
            a.deleteAttribute(`uv`),
            a.deleteAttribute(`normal`));
          let o = a.getAttribute(`position`);
          for (let e = 0; e < o.count; e++)
            o.setY(e, this.sidedFloor(o.getX(e), o.getZ(e)));
          let s = this.cutPortals(a, e, t, n, r);
          (s.computeVertexNormals(),
            C.push(s),
            (S += (s.index?.count ?? 0) / 3));
        };
      for (let n = o; n < c; n += t)
        for (let i = s; i < l; i += t) {
          b++;
          let o = _(n, i);
          if (!o && !u(n, i)) {
            y.push(n, i);
            continue;
          }
          if ((x++, o || !e)) {
            T(n, i, t, o ? Math.min(a, this.basinStep) : a);
            continue;
          }
          for (let e = 0; e < t; e += 32)
            for (let o = 0; o < t; o += 32)
              T(n + e, i + o, 32, w(n + e, i + o, 32) ? a : r);
        }
      let ee = new Float32Array((y.length / 2) * 4 * 3),
        te = [];
      for (let e = 0; e < y.length / 2; e++) {
        let n = y[e * 2],
          r = y[e * 2 + 1],
          i = A_.street;
        ee.set([n, i, r, n + t, i, r, n, i, r + t, n + t, i, r + t], e * 12);
        let a = e * 4;
        te.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
      let E = new Me();
      (E.setAttribute(`position`, new er(ee, 3)),
        E.setAttribute(
          `normal`,
          new er(
            new Float32Array(ee.length).map((e, t) => +(t % 3 == 1)),
            3,
          ),
        ),
        E.setIndex(te),
        (S += te.length / 3));
      let D = ur([E, ...C]);
      for (let e of [E, ...C]) e.dispose();
      R_(D);
      let ne = new M(D, this.groundMaterial);
      return (
        (ne.name = `Meridian streets`),
        (ne.receiveShadow = !0),
        this.group.add(ne),
        this.owned.push(D),
        { tiles: b, fineTiles: x, triangles: S }
      );
    }
    createBasin() {
      let e = mh.polygon,
        { floor: t, coping: n } = A_.basin,
        r = mh.waterY,
        i = new Dn(new dn(e.map(([e, t]) => new p(e, -t))));
      (i.rotateX(-Math.PI / 2), i.translate(0, r, 0), i.deleteAttribute(`uv`));
      let a = new I({ name: `Meridian marina`, roughness: 0.05, metalness: 0 }),
        o = this.waterClock,
        s = W.xz,
        c = Ii(J(s.x.mul(0.09), s.y.mul(0.13), o.mul(0.22))),
        l = Ii(J(s.x.mul(0.41).add(17), s.y.mul(0.33), o.mul(0.5))),
        u = Ii(J(s.x.mul(1.7), s.y.mul(1.3), o.mul(0.8)))
          .mul(0.5)
          .add(0.5),
        d = Y(G(`#0b2f3a`), G(`#16505a`), c.mul(0.3).add(0.45));
      a.colorNode = d.add(d.mul(u.pow(14).mul(3)));
      let f = J(c.mul(0.06).add(l.mul(0.035)), 1, l.mul(0.05)).normalize();
      a.normalNode = _r.mul(U(f, 0)).xyz.normalize();
      let m = new M(i, a);
      ((m.name = `Meridian marina water`), (m.receiveShadow = !0));
      let h = this.basinStep * 2.2 + 0.3,
        g = [],
        _ = [],
        v = (e, t, n, r, i) => {
          for (let a of [e, t, n, e, n, r])
            (g.push(a[0], a[1], a[2]), _.push(i[0], i[1], i[2]));
        };
      for (let r = 0; r < e.length; r++) {
        let [i, a] = e[r],
          [o, s] = e[(r + 1) % e.length],
          c = Math.hypot(o - i, s - a),
          l = (o - i) / c,
          u = (s - a) / c,
          d = -u,
          f = l;
        N_((i + o) / 2 + d * 0.5, (a + s) / 2 + f * 0.5, e) ||
          ((d = -d), (f = -f));
        let p = 0.6,
          m = [i - l * p, a - u * p],
          g = [o + l * p, s + u * p],
          _ = [m[0] - d * h, m[1] - f * h],
          y = [g[0] - d * h, g[1] - f * h],
          b = [
            [m[0], t, m[1]],
            [g[0], t, g[1]],
            [g[0], n, g[1]],
            [m[0], n, m[1]],
          ],
          x = (g[0] - m[0]) * f - (g[1] - m[1]) * d > 0 ? b : [...b].reverse();
        v(x[0], x[1], x[2], x[3], [d, 0, f]);
        let S = [
            [m[0], n, m[1]],
            [g[0], n, g[1]],
            [y[0], n, y[1]],
            [_[0], n, _[1]],
          ],
          C =
            (g[0] - m[0]) * (_[1] - m[1]) - (g[1] - m[1]) * (_[0] - m[0]) < 0
              ? S
              : [...S].reverse();
        v(C[0], C[1], C[2], C[3], [0, 1, 0]);
      }
      let y = new Me();
      (y.setAttribute(`position`, new N(g, 3)),
        y.setAttribute(`normal`, new N(_, 3)));
      let b = new I({
          name: `Meridian quay stone`,
          color: `#c4bba9`,
          roughness: 0.7,
          metalness: 0,
        }),
        x = B(W.x.add(W.z).div(1.6)),
        S = B(W.y.div(0.8));
      b.colorNode = G(`#c4bba9`).mul(
        Y(V(0.86), V(1), Z(0, 0.05, x).mul(Z(0, 0.08, S))),
      );
      let C = new M(y, b);
      return (
        (C.name = `Meridian marina quay`),
        (C.receiveShadow = !0),
        (C.castShadow = !1),
        this.group.add(m, C),
        this.owned.push(i, a, y, b),
        (i.index ? i.index.count : i.getAttribute(`position`).count) / 3 +
          g.length / 9
      );
    }
    createGarage() {
      let { centre: e } = A_.cauldron,
        t = A_.garage,
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
      let u = new Me();
      (u.setAttribute(`position`, new N(r.position, 3)),
        u.setAttribute(`normal`, new N(r.normal, 3)),
        u.setAttribute(`uv`, new N(r.uv, 2)));
      let d = new Me();
      (d.setAttribute(`position`, new N(i.position, 3)),
        d.setAttribute(`normal`, new N(i.normal, 3)));
      let f = new I({
          name: `Meridian Cauldron car park`,
          roughness: 0.82,
          metalness: 0,
        }),
        p = X().x,
        m = V(A_.street).sub(W.y),
        h = Cr(m.div(t.storey)),
        g = B(m.div(t.storey)).mul(t.storey),
        _ = (e, t) => B(Hr(e.mul(127.1).add(t.mul(311.7))).mul(43758.5453)),
        v = Z(0.3, 0.27, g),
        y = Z(2.27, 2.3, g),
        b = V(1).sub(v).sub(y).max(0),
        x = Z(0.455, 0.465, hi(B(p.div(7.8)).sub(0.5))),
        S = b.mul(x.oneMinus()),
        C = g.sub(0.3).div(2).clamp(0, 1),
        w = B(p.div(2.6)),
        T = Z(0.1, 0.04, C)
          .mul(Z(0.32, 0.38, w))
          .mul(Z(0.68, 0.62, w)),
        ee = Y(G(`#2b3239`), G(`#0c1014`), C.pow(0.7)),
        te = Cr(p.div(2.6)),
        E = K(0.22, _(te, h)),
        D = B(p.div(2.6)).sub(0.5).abs().mul(2),
        ne = V(0.74).add(D.pow(5).mul(0.22)),
        re = E.mul(Z(0.86, 0.8, D)).mul(Z(ne, ne.add(0.02), C)),
        ie = _(te.add(7), h.add(3)),
        ae = Y(
          Y(G(`#e9ecef`), G(`#1b1f24`), K(0.45, ie)),
          Y(G(`#a3222c`), G(`#2d5fa8`), K(0.82, ie)),
          K(0.7, ie),
        ),
        oe = Z(0.86, 0.9, C)
          .oneMinus()
          .mul(Z(0.78, 0.8, C))
          .mul(0.65),
        se = ae.mul(V(1).sub(oe)),
        ce = Z(2.4, 2.42, g).mul(Z(2.56, 2.54, g)),
        le = B(h.mul(0.25)),
        ue = Y(
          Y(G(`#14b8c8`), G(`#f2b134`), K(0.24, le)),
          Y(G(`#7a5cff`), G(`#3fd18b`), K(0.74, le)),
          K(0.49, le),
        ),
        O = Y(Y(G(`#b4afa5`), G(`#9a968d`), v), ue, ce.mul(y)),
        de = Y(ee, se, re),
        fe = Z(90, 320, ai.z.negate());
      f.colorNode = Y(
        Y(O, de, S),
        Y(G(`#77746e`), G(`#5d5b57`), 0.5),
        fe.mul(0.7),
      );
      let pe = Z(55, 25, ai.z.negate()),
        me = Z(0.1, 0.04, C).mul(0.55);
      ((f.emissiveNode = G(`#ffd9a0`)
        .mul(Y(T, me, pe).mul(S).mul(3.2))
        .add(
          G(`#ff2a1e`).mul(
            re
              .mul(Z(0.93, 0.95, C))
              .mul(Z(0.62, 0.58, D))
              .mul(Z(0.42, 0.46, D))
              .mul(pe.oneMinus())
              .mul(1.4),
          ),
        )
        .mul(fe.oneMinus())),
        (f.roughnessNode = Y(V(0.85), V(0.35), re.mul(S))));
      let he = new I({
          name: `Meridian Cauldron coping`,
          color: `#bdb8ae`,
          roughness: 0.8,
          metalness: 0,
        }),
        ge = new M(u, f);
      ((ge.name = `Meridian Cauldron car park`),
        (ge.castShadow = ge.receiveShadow = !0));
      let _e = new M(d, he);
      return (
        (_e.name = `Meridian Cauldron coping`),
        (_e.receiveShadow = !0),
        this.group.add(ge, _e),
        this.owned.push(u, d, f, he),
        (r.position.length + i.position.length) / 9
      );
    }
    createVertiportFacade() {
      let [e, t] = Df.centre,
        n = Mp[`vertiport-crown`],
        r = (Df.crown - n.deckHeight - 0.6 - A_.street) / 199,
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
          o.push(e + d * l, A_.street + i * r, t + f * l);
          let p = new A(d, -u, f).normalize();
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
      let u = new Me();
      (u.setAttribute(`position`, new N(o, 3)),
        u.setAttribute(`normal`, new N(s, 3)),
        u.setAttribute(`uv`, new N(c, 2)),
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
        g = B(p.div(m)).mul(m),
        _ = (e, t) => B(Hr(e.mul(127.1).add(t.mul(311.7))).mul(43758.5453)),
        v = Z(0.42, 0.38, g),
        y = Z(2.95, 3, g),
        b = V(1).sub(v).sub(y).max(0),
        x = Z(0.46, 0.47, hi(B(f.div(9)).sub(0.5))),
        S = 2 * Math.PI * a(192 / 2),
        C = Z(0.485, 0.49, hi(B(f.div(S / 4)).sub(0.5))),
        w = b.mul(x.oneMinus()).mul(C.oneMinus()),
        T = g.sub(0.4).div(2.6).clamp(0, 1),
        ee = Cr(f.div(4.5)),
        te = K(0.3, _(ee, h)),
        E = B(f.div(4.5)).sub(0.5).abs().mul(2),
        D = te
          .mul(Z(0.82, 0.76, E))
          .mul(Z(0.62, 0.58, T))
          .mul(Z(0.08, 0.14, T)),
        ne = D.mul(Z(0.34, 0.4, T)).mul(Z(0.42, 0.3, E)),
        re = _(ee.add(5), h.add(9)),
        ie = Y(
          Y(G(`#f2f2ee`), G(`#f2b134`), K(0.55, re)),
          G(`#2338c8`),
          K(0.85, re),
        ),
        ae = Y(
          Y(G(`#1e262e`), G(`#0b0f13`), T.pow(0.6)),
          Y(ie, G(`#10161c`), ne),
          D,
        ),
        oe = Y(Y(Y(G(`#d7d4cc`), G(`#b9b5ac`), v), G(`#8e959c`), C), ae, w),
        se = Z(120, 420, ai.z.negate());
      d.colorNode = Y(oe, G(`#7c8086`), se.mul(0.6));
      let ce = te
          .mul(Z(0.08, 0.02, T))
          .mul(Z(0.85, 0.75, E))
          .mul(w),
        le = Z(0.96, 0.99, T.oneMinus()).mul(w);
      ((d.emissiveNode = G(`#3fe6ff`)
        .mul(ce.mul(2.4))
        .add(G(`#ffe1b0`).mul(le.mul(1.6)))
        .mul(se.mul(-0.6).add(1))),
        (d.roughnessNode = Y(V(0.85), V(0.3), D)));
      let ue = new M(u, d);
      return (
        (ue.name = `Meridian vertiport garage`),
        (ue.receiveShadow = !0),
        (ue.castShadow = !1),
        this.group.add(ue),
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
  V_ = 0.22,
  H_ = 0.13,
  U_ = 0.42,
  W_ = { range: 42, edge: 1.4 },
  G_ = new A(0, 0.5, 0),
  K_ = new A(0, -0.6, 3),
  q_ = new A(1.9, 1.1, 3.4),
  J_ = new k().makeScale(0, 0, 0),
  Y_ = new k(),
  X_ = new A(),
  Z_ = new Rn(),
  Q_ = new Rn(),
  $_ = new A(0, 0, 1),
  ev = new A(),
  tv = new A(),
  nv = (e) => e * e * (3 - 2 * e),
  rv = class {
    constructor() {
      ((this.group = new An()),
        (this.ringGlow = R(0)),
        (this.auraGlow = R(0)),
        (this.takenAt = new Map()),
        (this.drawn = Array.from({ length: vn.count }, () => new A())),
        (this.sink = Array.from({ length: vn.count }, () => new A())),
        (this.pulseAt = -1 / 0),
        (this.orbs = null),
        (this.group.name = `Orbs`));
      let e = new At({ name: `Orb core` });
      e.colorNode = J(1.4, 3.2, 3.6);
      let t = { transparent: !0, depthWrite: !1, blending: 2 },
        n = new At({ name: `Orb shell`, ...t }),
        r = vr(V(1).sub(hi(yi(wi, Yi))), 2.2);
      ((n.colorNode = J(0.25, 1.1, 1.6).mul(r.mul(1.8).add(0.08))),
        (this.core = new Dt(new _n(0.75, 3), e, vn.count)),
        (this.shell = new Dt(new _n(1.7, 3), n, vn.count)));
      let i = new At({ name: `Orb pickup ring`, side: 2, ...t }),
        a = V(1)
          .sub(hi(Pi(Gi.xz).sub(2.35)).div(0.45))
          .max(0);
      i.colorNode = J(0.6, 2.6, 3.2).mul(a.mul(a).mul(this.ringGlow));
      let o = new wn(1.9, 2.8, 64);
      (o.rotateX(-Math.PI / 2), (this.ring = new M(o, i)));
      let s = new At({ name: `Orb pickup aura`, ...t });
      ((s.colorNode = J(0.3, 1.3, 1.8).mul(r.mul(2.4).mul(this.auraGlow))),
        (this.aura = new M(new nn(1, 40, 24), s)));
      for (let e of [this.core, this.shell])
        for (let t = 0; t < vn.count; t++) e.setMatrixAt(t, J_);
      for (let e of [this.core, this.shell, this.ring, this.aura])
        ((e.frustumCulled = !1),
          (e.castShadow = e.receiveShadow = !1),
          (e.userData.reflectionHidden = !0),
          this.group.add(e));
      ((this.shell.renderOrder = 2),
        (this.ring.renderOrder = this.aura.renderOrder = 3),
        (this.ring.visible = this.aura.visible = !1),
        (this.group.visible = !1));
    }
    update(e, t, n) {
      if (e !== this.orbs) {
        ((this.orbs = e), this.takenAt.clear(), (this.pulseAt = -1 / 0));
        for (let t of e ?? []) t.taken && this.takenAt.set(t, -1 / 0);
      }
      ((this.group.visible = !!e?.length),
        e?.length &&
          (n &&
            ev
              .copy(n.cockpit ? K_ : G_)
              .applyQuaternion(n.quaternion)
              .add(n.position),
          e.forEach((e, r) => {
            let i = this.drawn[r];
            if (e.taken) {
              let a = this.takenAt.get(e);
              a === void 0 &&
                (this.takenAt.set(e, (a = t)),
                (this.pulseAt = t),
                this.sink[r].copy(i).sub(ev));
              let o = (t - a) / (n ? H_ : V_);
              if (o >= 1) {
                (this.core.setMatrixAt(r, J_), this.shell.setMatrixAt(r, J_));
                return;
              }
              if (n) {
                i.copy(this.sink[r])
                  .multiplyScalar(1 - nv(o))
                  .add(ev);
                let e = 0.5 * (1 - o);
                (Y_.compose(i, Q_, X_.setScalar(e * (1 - o))),
                  this.core.setMatrixAt(r, Y_),
                  Y_.compose(i, Q_, X_.setScalar(e)),
                  this.shell.setMatrixAt(r, Y_));
              } else
                (Y_.compose(i, Q_, X_.setScalar(0)),
                  this.core.setMatrixAt(r, Y_),
                  Y_.compose(i, Q_, X_.setScalar(1 + o * 1.6)),
                  this.shell.setMatrixAt(r, Y_));
              return;
            }
            let a = Math.sin(t * 2.3 + r * 1.7) * 0.3;
            i.copy(L(e.distance, e.lane, vn.height + a));
            let o = n ? e.distance - n.distance : 0,
              s =
                n && o > 0 && o < W_.range
                  ? (1 -
                      F.smoothstep(
                        Math.abs(e.lane - n.lane),
                        vn.reach - W_.edge,
                        vn.reach,
                      )) *
                    (1 - o / W_.range) ** 2
                  : 0;
            if (!s) {
              (Y_.compose(i, Q_, X_.setScalar(1)),
                this.core.setMatrixAt(r, Y_),
                this.shell.setMatrixAt(r, Y_));
              return;
            }
            tv.subVectors(ev, i);
            let c = tv.length();
            (i.addScaledVector(tv, s),
              Z_.setFromUnitVectors($_, tv.divideScalar(c || 1)));
            let l = 1 - (n?.cockpit ? 0.85 : 0.5) * s;
            (Y_.compose(i, Z_, X_.set(l, l, l * (1 + 0.9 * s))),
              this.shell.setMatrixAt(r, Y_),
              Y_.compose(i, Z_, X_.multiplyScalar(0.85)),
              this.core.setMatrixAt(r, Y_));
          }),
          (this.core.instanceMatrix.needsUpdate = !0),
          (this.shell.instanceMatrix.needsUpdate = !0),
          this.updatePulse(t, n)));
    }
    updatePulse(e, t) {
      let n = (e - this.pulseAt) / U_,
        r = !!t && n >= 0 && n < 1;
      if (((this.ring.visible = r), (this.aura.visible = r && !t.cockpit), !r))
        return;
      let i = 1 - n,
        a = 1 - i * i;
      (this.ring.position.copy(t.position),
        this.ring.quaternion.copy(t.quaternion),
        this.ring.scale.setScalar(0.8 + 1.7 * a),
        (this.ringGlow.value = i * i),
        this.aura.position
          .copy(G_)
          .applyQuaternion(t.quaternion)
          .add(t.position),
        this.aura.quaternion.copy(t.quaternion),
        this.aura.scale.copy(q_).multiplyScalar(1 + 0.18 * a),
        (this.auraGlow.value = i * i * i));
    }
    dispose() {
      this.group.removeFromParent();
      for (let e of [this.core, this.shell, this.ring, this.aura])
        (e.geometry.dispose(),
          e.material.dispose(),
          e instanceof Dt && e.dispose());
    }
  };
