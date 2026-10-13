// assets__game-CsnOSIff 10 — add
// Lines 2986-3319 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var ws = { bass: 0, mid: 0, high: 0, level: 0, beat: 0 },
  Ts = (e) => (Number.isFinite(e) ? s.clamp(e, 0, 1) : 0),
  Es = class {
    constructor() {
      ((this.energy = { ...ws }), (this.target = { ...ws }));
    }
    set(e) {
      for (let t of Object.keys(ws)) this.target[t] = Ts(e[t]);
    }
    update(e, t) {
      if (t) return (Object.assign(this.energy, ws), this.energy);
      let n =
        1 -
        Math.exp(-Math.max(0, Math.min(0.1, Number.isFinite(e) ? e : 0)) * 4.5);
      for (let e of Object.keys(ws))
        this.energy[e] += (this.target[e] - this.energy[e]) * n;
      return this.energy;
    }
  },
  Ds = (e, t) => {
    let n = Vr(e).max(1e-4);
    return B(1)
      .sub(Z(n.negate(), n, Y(e).sub(t)))
      .mul(dr(B(1), B(t * 2).div(n)));
  },
  Os = class {
    constructor() {
      ((this.group = new pn()),
        (this.pulseCyan = new we({
          name: `Pulse cyan`,
          color: new _(`#63e9ff`).multiplyScalar(1.65),
        })),
        (this.pulseViolet = new we({
          name: `Pulse violet`,
          color: new _(`#a780ff`).multiplyScalar(1.45),
        })),
        (this.pulseAmber = new we({
          name: `Pulse amber`,
          color: new _(`#ffc178`).multiplyScalar(1.3),
        })),
        (this.envelope = new Es()),
        (this.cyanBase = new _(`#63e9ff`)),
        (this.violetBase = new _(`#a780ff`)),
        (this.amberBase = new _(`#ffc178`)),
        (this.traffic = L(0)),
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
      let e = new i({ side: 1, depthWrite: !1, fog: !1 }),
        t = Xi.normalize(),
        n = t.y.max(0).pow(0.45),
        r = t.dot(q(Wo)).max(0).pow(1800),
        a = t.dot(q(Wo)).max(0).pow(45),
        o = B(1).sub(t.y.max(0)).pow(9),
        s = B(1).sub(t.y.max(0)).pow(40);
      ((e.colorNode = J(W(`#213453`), W(`#040a20`), n)
        .add(r.mul(q(1.4, 1.6, 1.8)))
        .add(a.mul(q(0.018, 0.025, 0.048)))
        .add(o.mul(q(0.07, 0.035, 0.1)))
        .add(s.mul(q(0.12, 0.05, 0.03)))),
        (this.skyDome = new N(new bt(6e3, 32, 24), e)),
        (this.skyDome.name = `Midnight gradient / moon`),
        this.group.add(this.skyDome));
      let c = new N(new rt(14e3, 14e3), xa(`nightWater`, `night`));
      ((c.rotation.x = -Math.PI / 2),
        (c.position.y = -3),
        this.group.add(c),
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
    add(e, t, n, r = new Ot()) {
      (e.applyMatrix4(new M().compose(n, r, new g(1, 1, 1))),
        this.batches.has(t) || this.batches.set(t, []),
        this.batches.get(t).push(e));
    }
    frameQuaternion(e) {
      let t = Gn(e);
      return new Ot().setFromRotationMatrix(
        new M().makeBasis(t.right, t.up, t.tangent),
      );
    }
    box(e, t, n, r, i, a, o) {
      this.add(new ir(e, t, n), r, Ft(i, a, o), this.frameQuaternion(i));
    }
    flush() {
      for (let [e, t] of this.batches) {
        let n = ur(t);
        if ((t.forEach((e) => e.dispose()), !n)) continue;
        let r = new N(n, e);
        ((r.name = e.name), this.group.add(r));
      }
      this.batches.clear();
    }
    createCityFloor() {
      let { pitch: e, street: t } = fs,
        n = new i({ name: `Nocturne street grid` }),
        r = U.xz,
        a = r.mod(e),
        o = B(1).sub(G(t, a.y)),
        s = B(1).sub(G(t, a.x)),
        c = V(o, s),
        l = J(q(0.02, 0.022, 0.03), q(0.011, 0.012, 0.017), c),
        u = dr(Y(a.x.sub(t)), dr(a.x, a.x.oneMinus().add(e - 1))),
        d = dr(Y(a.y.sub(t)), dr(a.y, a.y.oneMinus().add(e - 1))),
        f = V(Ds(u, 0.35), Ds(d, 0.35)),
        p = Ds(a.y.sub(t / 2), 0.18)
          .mul(G(0.55, z(r.x.div(9))))
          .mul(o)
          .mul(B(1).sub(s)),
        m = Ds(a.x.sub(t / 2), 0.18)
          .mul(G(0.55, z(r.y.div(9))))
          .mul(s)
          .mul(B(1).sub(o)),
        h = this.traffic,
        g = qr(r.y.div(e).floor().add(4096).toUint()),
        _ = qr(r.x.div(e).floor().add(8192).toUint()),
        v = (e, t, n) =>
          V(
            G(0.9, z(e.add(h.mul(n)).div(41).add(t))),
            G(
              0.93,
              z(
                e
                  .add(h.mul(n * 0.8))
                  .div(67)
                  .add(t.mul(3)),
              ),
            ),
          ),
        y = o.mul(B(1).sub(s)),
        b = s.mul(B(1).sub(o)),
        x = Ds(a.y.sub(5.5), 0.8)
          .mul(v(r.x, g, 15))
          .mul(y)
          .add(
            Ds(a.x.sub(5.5), 0.8)
              .mul(v(r.y, _, 13))
              .mul(b),
          ),
        S = Ds(a.y.sub(14.5), 0.8)
          .mul(v(r.x.negate(), g.add(0.37), 14))
          .mul(y)
          .add(
            Ds(a.x.sub(14.5), 0.8)
              .mul(v(r.y.negate(), _.add(0.61), 12))
              .mul(b),
          ),
        C = qr(
          r.x.div(e).floor().add(r.y.div(e).floor().mul(97)).add(2e4).toUint(),
        ),
        w = q(0.85, 0.5, 0.22)
          .mul(f.mul(C.mul(0.32).add(0.04)))
          .add(q(0.5, 0.45, 0.3).mul(p.add(m).mul(0.25)))
          .add(q(1.3, 1.2, 1).mul(x))
          .add(q(1.2, 0.1, 0.06).mul(S)),
        T = U.sub(Ur).length(),
        E = B(1).sub(Z(650, 1700, T));
      n.colorNode = l.add(w.mul(E).add(q(0.05, 0.03, 0.028).mul(E.oneMinus())));
      let D = new N(new rt(7400, 7400), n);
      ((D.name = `Nocturne street grid`),
        (D.rotation.x = -Math.PI / 2),
        D.position.set(200, 0, 150),
        this.group.add(D));
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
      let r = new tr();
      (r.setAttribute(`position`, new ct(n, 3)),
        this.group.add(
          new lt(
            r,
            new ke({
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
      let e = F,
        t = xa(`landmarkCasing`, `night`, { name: `Landmark casing` }),
        n = Array.from(
          { length: 40 },
          (t, n) => Gn((0.58 + (n / 40) * 0.095) * e).position,
        ),
        r = n.reduce((e, t) => e.add(t), new g()).divideScalar(n.length),
        i = 0;
      for (let t = 0; t < e; t += 8) {
        let e = Gn(t).position;
        Math.hypot(e.x - r.x, e.z - r.z) < 150 && (i = Math.max(i, e.y));
      }
      r.y = i + 62;
      let a = new Ot().setFromEuler(new D(Math.PI / 2 - 0.2, 0, 0.12)),
        o = t.clone();
      ((o.name = `Orbital Halo`),
        this.add(new sn(96, 2.6, 8, 112), o, r, a),
        this.add(
          new sn(96, 0.7, 6, 112),
          this.pulseViolet,
          r.clone().add(new g(0, -2.4, 0)),
          a,
        ),
        this.add(
          new sn(88, 0.4, 5, 112),
          this.pulseCyan,
          r.clone().add(new g(0, -1.6, 0)),
          a,
        ));
      let s = t.clone();
      s.name = `Halo bank arches`;
      for (let t of [0.595, 0.615, 0.635, 0.655]) {
        let n = t * e,
          r = this.frameQuaternion(n);
        (this.add(new sn(33, 1.2, 8, 72), s, Ft(n, 0, 10), r),
          this.add(
            new sn(33, 0.33, 6, 72),
            this.pulseViolet,
            Ft(n - 1.1, 0, 10),
            r,
          ),
          this.add(
            new sn(31.5, 0.18, 5, 72),
            this.pulseCyan,
            Ft(n - 0.5, 0, 10),
            r,
          ));
      }
      let c = t.clone();
      c.name = `Moonfall gates`;
      for (let t = 0.276 * e, n = 0; t < 0.375 * e; t += 58, n++) {
        let e = j(t) + 2.2,
          r = n % 2 ? this.pulseCyan : this.pulseViolet;
        for (let n of [-1, 1])
          (this.box(1.3, 18, 1.6, c, t, n * e, 8),
            this.box(0.22, 16, 1.7, r, t, n * (e - 0.72), 8.5));
        (this.box(e * 2 + 1.3, 1.6, 1.6, c, t, 0, 17.8),
          this.box(e * 2 - 1.5, 0.22, 1.7, r, t, 0, 16.9));
      }
      for (let n = 0.221 * e, r = 0; n < 0.256 * e; n += 20, r++) {
        let e = -Math.sign(Gn(n).curvature) || 1,
          i = e * (j(n) + 5);
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
          if (!is(r))
            for (let e of [-1, 1]) {
              let t = e * (j(r) + 4.7),
                n = 13.5 + (i % 3) * 1.1;
              (this.box(0.4, n + 1.5, 0.5, l, r, t, n / 2 - 0.75),
                this.box(2.3, 3.1, 2.3, l, r, t, n - 1.5));
              let a = e < 0 ? this.pulseAmber : this.pulseViolet;
              (this.box(2.42, 0.45, 2.42, a, r, t, n - 0.7),
                this.box(2.42, 0.35, 2.42, a, r, t, n - 2.5));
            }
      for (let t of [-11.5, 0, 11.5]) {
        let n = xn(e * 0.975, e * 1.035, t - 0.3, t + 0.3, -1.75, 2),
          r = n.getIndex(),
          i = Array.from(r.array);
        for (let e = 0; e < i.length; e += 3)
          [i[e + 1], i[e + 2]] = [i[e + 2], i[e + 1]];
        (n.setIndex(i), this.add(n, this.pulseCyan, new g()));
      }
    }
  };
