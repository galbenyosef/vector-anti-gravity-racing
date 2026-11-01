// assets__game-D43Oxqny 10 — add
// Lines 3005-3338 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var Ts = { bass: 0, mid: 0, high: 0, level: 0, beat: 0 },
  Es = (e) => (Number.isFinite(e) ? F.clamp(e, 0, 1) : 0),
  Ds = class {
    constructor() {
      ((this.energy = { ...Ts }), (this.target = { ...Ts }));
    }
    set(e) {
      for (let t of Object.keys(Ts)) this.target[t] = Es(e[t]);
    }
    update(e, t) {
      if (t) return (Object.assign(this.energy, Ts), this.energy);
      let n =
        1 -
        Math.exp(-Math.max(0, Math.min(0.1, Number.isFinite(e) ? e : 0)) * 4.5);
      for (let e of Object.keys(Ts))
        this.energy[e] += (this.target[e] - this.energy[e]) * n;
      return this.energy;
    }
  },
  Os = (e, t) => {
    let n = Vr(e).max(1e-4);
    return V(1)
      .sub(Z(n.negate(), n, hi(e).sub(t)))
      .mul(dr(V(1), V(t * 2).div(n)));
  },
  ks = class {
    constructor() {
      ((this.group = new An()),
        (this.pulseCyan = new b({
          name: `Pulse cyan`,
          color: new j(`#63e9ff`).multiplyScalar(1.65),
        })),
        (this.pulseViolet = new b({
          name: `Pulse violet`,
          color: new j(`#a780ff`).multiplyScalar(1.45),
        })),
        (this.pulseAmber = new b({
          name: `Pulse amber`,
          color: new j(`#ffc178`).multiplyScalar(1.3),
        })),
        (this.envelope = new Ds()),
        (this.cyanBase = new j(`#63e9ff`)),
        (this.violetBase = new j(`#a780ff`)),
        (this.amberBase = new j(`#ffc178`)),
        (this.traffic = R(0)),
        (this.batches = new Map()),
        (this.landmarks = [
          `EXCHANGE GATE`,
          `ZENITH HAIRPIN`,
          `MOONFALL GATES`,
          `UNDERGRID`,
          `HALO SPIRAL`,
          `PULSE TUNNEL`,
          `LANTERN ESSES`,
        ]),
        (this.group.name = `Nocturne Exchange / night city`));
      let e = new At({ side: 1, depthWrite: !1, fog: !1 }),
        t = Zi.normalize(),
        n = t.y.max(0).pow(0.45),
        r = t.dot(J(Go)).max(0).pow(1800),
        i = t.dot(J(Go)).max(0).pow(45),
        a = V(1).sub(t.y.max(0)).pow(9),
        o = V(1).sub(t.y.max(0)).pow(40);
      ((e.colorNode = Y(G(`#213453`), G(`#040a20`), n)
        .add(r.mul(J(1.4, 1.6, 1.8)))
        .add(i.mul(J(0.018, 0.025, 0.048)))
        .add(a.mul(J(0.07, 0.035, 0.1)))
        .add(o.mul(J(0.12, 0.05, 0.03)))),
        (this.skyDome = new M(new nn(6e3, 32, 24), e)),
        (this.skyDome.name = `Midnight gradient / moon`),
        this.group.add(this.skyDome));
      let s = new M(new Ye(14e3, 14e3), Sa(`nightWater`, `night`));
      ((s.rotation.x = -Math.PI / 2),
        (s.position.y = -3),
        this.group.add(s),
        this.createCityFloor(),
        this.createStars(),
        this.createLandmarks(),
        this.flush());
    }
    setMusicEnergy(e) {
      this.envelope.set(e);
    }
    get energy() {
      return this.envelope.energy;
    }
    update(e, t) {
      let n = this.envelope.update(e, t);
      (!t && Number.isFinite(e) && (this.traffic.value += Math.min(e, 0.1)),
        this.pulseCyan.color
          .copy(this.cyanBase)
          .multiplyScalar(1.65 + n.mid * 0.75 + n.level * 0.25),
        this.pulseViolet.color
          .copy(this.violetBase)
          .multiplyScalar(1.45 + n.bass * 0.85 + n.beat * 0.25),
        this.pulseAmber.color
          .copy(this.amberBase)
          .multiplyScalar(1.3 + n.high * 0.65 + n.level * 0.2));
    }
    snapshot() {
      return {
        loaded: !0,
        landmarks: this.landmarks,
        cityFloor: `street-grid`,
        trafficTime: +this.traffic.value.toFixed(2),
        musicReactive: !0,
        musicLevel: +this.envelope.energy.level.toFixed(3),
        bass: +this.envelope.energy.bass.toFixed(3),
        extraPointLights: 0,
      };
    }
    add(e, t, n, r = new Rn()) {
      (e.applyMatrix4(new k().compose(n, r, new A(1, 1, 1))),
        this.batches.has(t) || this.batches.set(t, []),
        this.batches.get(t).push(e));
    }
    frameQuaternion(e) {
      let t = Ot(e);
      return new Rn().setFromRotationMatrix(
        new k().makeBasis(t.right, t.up, t.tangent),
      );
    }
    box(e, t, n, r, i, a, o) {
      this.add(new ht(e, t, n), r, xn(i, a, o), this.frameQuaternion(i));
    }
    flush() {
      for (let [e, t] of this.batches) {
        let n = ur(t);
        if ((t.forEach((e) => e.dispose()), !n)) continue;
        let r = new M(n, e);
        ((r.name = e.name), this.group.add(r));
      }
      this.batches.clear();
    }
    createCityFloor() {
      let { pitch: e, street: t } = ps,
        n = new At({ name: `Nocturne street grid` }),
        r = W.xz,
        i = r.mod(e),
        a = V(1).sub(K(t, i.y)),
        o = V(1).sub(K(t, i.x)),
        s = H(a, o),
        c = Y(J(0.02, 0.022, 0.03), J(0.011, 0.012, 0.017), s),
        l = dr(hi(i.x.sub(t)), dr(i.x, i.x.oneMinus().add(e - 1))),
        u = dr(hi(i.y.sub(t)), dr(i.y, i.y.oneMinus().add(e - 1))),
        d = H(Os(l, 0.35), Os(u, 0.35)),
        f = Os(i.y.sub(t / 2), 0.18)
          .mul(K(0.55, B(r.x.div(9))))
          .mul(a)
          .mul(V(1).sub(o)),
        p = Os(i.x.sub(t / 2), 0.18)
          .mul(K(0.55, B(r.y.div(9))))
          .mul(o)
          .mul(V(1).sub(a)),
        m = this.traffic,
        h = qr(r.y.div(e).floor().add(4096).toUint()),
        g = qr(r.x.div(e).floor().add(8192).toUint()),
        _ = (e, t, n) =>
          H(
            K(0.9, B(e.add(m.mul(n)).div(41).add(t))),
            K(
              0.93,
              B(
                e
                  .add(m.mul(n * 0.8))
                  .div(67)
                  .add(t.mul(3)),
              ),
            ),
          ),
        v = a.mul(V(1).sub(o)),
        y = o.mul(V(1).sub(a)),
        b = Os(i.y.sub(5.5), 0.8)
          .mul(_(r.x, h, 15))
          .mul(v)
          .add(
            Os(i.x.sub(5.5), 0.8)
              .mul(_(r.y, g, 13))
              .mul(y),
          ),
        x = Os(i.y.sub(14.5), 0.8)
          .mul(_(r.x.negate(), h.add(0.37), 14))
          .mul(v)
          .add(
            Os(i.x.sub(14.5), 0.8)
              .mul(_(r.y.negate(), g.add(0.61), 12))
              .mul(y),
          ),
        S = qr(
          r.x.div(e).floor().add(r.y.div(e).floor().mul(97)).add(2e4).toUint(),
        ),
        C = J(0.85, 0.5, 0.22)
          .mul(d.mul(S.mul(0.32).add(0.04)))
          .add(J(0.5, 0.45, 0.3).mul(f.add(p).mul(0.25)))
          .add(J(1.3, 1.2, 1).mul(b))
          .add(J(1.2, 0.1, 0.06).mul(x)),
        w = W.sub(Ur).length(),
        T = V(1).sub(Z(650, 1700, w));
      n.colorNode = c.add(C.mul(T).add(J(0.05, 0.03, 0.028).mul(T.oneMinus())));
      let ee = new M(new Ye(7400, 7400), n);
      ((ee.name = `Nocturne street grid`),
        (ee.rotation.x = -Math.PI / 2),
        ee.position.set(200, 0, 150),
        this.group.add(ee));
    }
    createStars() {
      let e = 9473,
        t = () => (
          (e = (Math.imul(e, 1664525) + 1013904223) >>> 0),
          e / 4294967296
        ),
        n = [];
      for (let e = 0; e < 320; e++) {
        let e = t() * Math.PI * 2,
          r = 0.14 + t() * 0.83,
          i = Math.sqrt(1 - r ** 2) * 4300;
        n.push(Math.cos(e) * i, r * 4300, Math.sin(e) * i);
      }
      let i = new Me();
      (i.setAttribute(`position`, new N(n, 3)),
        this.group.add(
          new De(
            i,
            new r({
              color: `#8daacb`,
              size: 2,
              sizeAttenuation: !1,
              fog: !1,
              depthWrite: !1,
            }),
          ),
        ));
    }
    createLandmarks() {
      let e = v,
        t = Sa(`landmarkCasing`, `night`, { name: `Landmark casing` }),
        n = Array.from(
          { length: 40 },
          (t, n) => Ot((0.58 + (n / 40) * 0.095) * e).position,
        ),
        r = n.reduce((e, t) => e.add(t), new A()).divideScalar(n.length),
        i = 0;
      for (let t = 0; t < e; t += 8) {
        let e = Ot(t).position;
        Math.hypot(e.x - r.x, e.z - r.z) < 150 && (i = Math.max(i, e.y));
      }
      r.y = i + 62;
      let a = new Rn().setFromEuler(new ue(Math.PI / 2 - 0.2, 0, 0.12)),
        o = t.clone();
      ((o.name = `Orbital Halo`),
        this.add(new Vt(96, 2.6, 8, 112), o, r, a),
        this.add(
          new Vt(96, 0.7, 6, 112),
          this.pulseViolet,
          r.clone().add(new A(0, -2.4, 0)),
          a,
        ),
        this.add(
          new Vt(88, 0.4, 5, 112),
          this.pulseCyan,
          r.clone().add(new A(0, -1.6, 0)),
          a,
        ));
      let s = t.clone();
      s.name = `Halo bank arches`;
      for (let t of [0.595, 0.615, 0.635, 0.655]) {
        let n = t * e,
          r = this.frameQuaternion(n);
        (this.add(new Vt(33, 1.2, 8, 72), s, xn(n, 0, 10), r),
          this.add(
            new Vt(33, 0.33, 6, 72),
            this.pulseViolet,
            xn(n - 1.1, 0, 10),
            r,
          ),
          this.add(
            new Vt(31.5, 0.18, 5, 72),
            this.pulseCyan,
            xn(n - 0.5, 0, 10),
            r,
          ));
      }
      let c = t.clone();
      c.name = `Moonfall gates`;
      for (let t = 0.276 * e, n = 0; t < 0.375 * e; t += 58, n++) {
        let e = P(t) + 2.2,
          r = n % 2 ? this.pulseCyan : this.pulseViolet;
        for (let n of [-1, 1])
          (this.box(1.3, 18, 1.6, c, t, n * e, 8),
            this.box(0.22, 16, 1.7, r, t, n * (e - 0.72), 8.5));
        (this.box(e * 2 + 1.3, 1.6, 1.6, c, t, 0, 17.8),
          this.box(e * 2 - 1.5, 0.22, 1.7, r, t, 0, 16.9));
      }
      for (let n = 0.221 * e, r = 0; n < 0.256 * e; n += 20, r++) {
        let e = -Math.sign(Ot(n).curvature) || 1,
          i = e * (P(n) + 5);
        (this.box(1.1, 26, 1.1, t, n, i, 11),
          this.box(
            0.2,
            22,
            1.15,
            r % 2 ? this.pulseViolet : this.pulseAmber,
            n,
            i - e * 0.62,
            12,
          ));
      }
      let l = t.clone();
      l.name = `Lantern posts`;
      for (let [t, n] of [
        [0.69, 0.738],
        [0.806, 0.868],
      ])
        for (let r = t * e, i = 0; r < n * e; r += 28, i++)
          if (!as(r))
            for (let e of [-1, 1]) {
              let t = e * (P(r) + 4.7),
                n = 13.5 + (i % 3) * 1.1;
              (this.box(0.4, n + 1.5, 0.5, l, r, t, n / 2 - 0.75),
                this.box(2.3, 3.1, 2.3, l, r, t, n - 1.5));
              let a = e < 0 ? this.pulseAmber : this.pulseViolet;
              (this.box(2.42, 0.45, 2.42, a, r, t, n - 0.7),
                this.box(2.42, 0.35, 2.42, a, r, t, n - 2.5));
            }
      for (let t of [-11.5, 0, 11.5]) {
        let n = ln(e * 0.975, e * 1.035, t - 0.3, t + 0.3, -1.75, 2),
          r = n.getIndex(),
          i = Array.from(r.array);
        for (let e = 0; e < i.length; e += 3)
          [i[e + 1], i[e + 2]] = [i[e + 2], i[e + 1]];
        (n.setIndex(i), this.add(n, this.pulseCyan, new A()));
      }
    }
  };
