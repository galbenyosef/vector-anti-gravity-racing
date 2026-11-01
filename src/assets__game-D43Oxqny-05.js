// assets__game-D43Oxqny 05 — kind
// Lines 1111-1559 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var Xa = 160,
  Za = 14,
  Qa = { cannon: 440, rockets: 260, missile: 240 },
  $a = 0.04,
  eo = { rockets: 1.35, missile: 1.8, cannon: 1.35 },
  to = (e, t = 0) => {
    let n = pe(e);
    return new Rn()
      .setFromRotationMatrix(new k().makeBasis(n.right, n.up, n.tangent))
      .multiply(new Rn().setFromAxisAngle(new A(0, 1, 0), t));
  },
  no = class {
    constructor(e) {
      ((this.sim = e),
        (this.root = new An()),
        (this.assets = []),
        (this.models = new Map()),
        (this.pads = []),
        (this.histories = new Map()),
        (this.matrix = new k()),
        (this.trailPos = new Float32Array(Xa * Za * 18)),
        (this.trailCol = new Float32Array(Xa * Za * 18)),
        (this.trailGeo = new Me()),
        (this.particles = Array.from({ length: 400 }, () => ({
          position: new A(),
          velocity: new A(),
          life: 0,
          total: 1,
          color: new j(),
          size: 1,
        }))),
        (this.flashes = []),
        (this.emitters = []),
        (this.snapshotClock = -1),
        (this.sinceSnapshot = 0),
        (this.serial = 0),
        (this.source = null),
        (this.disposed = !1),
        (this.root.name = `VECTOR combat / Blender ordnance`),
        this.trailGeo.setAttribute(
          `position`,
          new er(this.trailPos, 3).setUsage(Ge),
        ),
        this.trailGeo.setAttribute(
          `color`,
          new er(this.trailCol, 3).setUsage(Ge),
        ),
        (this.trails = new M(
          this.trailGeo,
          new b({
            vertexColors: !0,
            transparent: !0,
            opacity: 0.5,
            depthWrite: !1,
            side: 2,
            blending: 2,
          }),
        )),
        (this.trails.frustumCulled = !1),
        this.root.add(this.trails),
        (this.shards = this.instances(new _n(1, 0), 400, 0.85)),
        (this.rings = this.instances(new Vt(1, 0.045, 5, 40), 40, 0.58)),
        (this.cores = this.instances(new nn(1, 8, 6), 200, 0.85)),
        (this.smoke = this.instances(new _n(1, 1), 260, 0.1, !1)));
      for (let e of s) {
        let t = new An(),
          n = new M(new ht(6.6, 0.07, 12), Sa(`weaponPadDeck`, `day`));
        t.add(n);
        let r = new cr({
          color: `#ffe1a3`,
          emissive: `#ff980e`,
          emissiveIntensity: 2.4,
          roughness: 0.4,
        });
        for (let e of [-0.58, 0.58]) {
          let n = new M(new ht(0.95, 0.09, 7.5), r);
          ((n.rotation.y = e), (n.position.y = 0.09), t.add(n));
        }
        let i = new b({ color: `#ffbc5c` });
        for (let e of [-1, 1]) {
          let n = new M(new ht(0.11, 0.08, 10), i);
          (n.position.set(e * 3, 0.08, 0), t.add(n));
        }
        (t.position.copy(L(e.distance + 6, e.lane, 0.11)),
          t.quaternion.copy(to(e.distance)),
          this.root.add(t),
          this.pads.push(t));
      }
    }
    instances(e, t, n, r = !0) {
      let i = new Dt(
        e,
        new b({
          color: `white`,
          transparent: !0,
          opacity: n,
          depthWrite: !1,
          blending: r ? 2 : 1,
        }),
        t,
      );
      return (
        i.instanceMatrix.setUsage(Ge),
        (i.frustumCulled = !1),
        (i.count = 0),
        this.root.add(i),
        i
      );
    }
    prepareShaders() {
      this.root.visible = !0;
      let e = new k().makeTranslation(0, -1e4, 0);
      for (let t of this.models.values())
        for (let n of t)
          ((n.count = 1),
            n.setMatrixAt(0, e),
            (n.instanceMatrix.needsUpdate = !0));
      for (let t of [this.shards, this.rings, this.cores, this.smoke])
        ((t.count = 1),
          t.setMatrixAt(0, e),
          t.setColorAt(0, new j(`white`)),
          (t.instanceMatrix.needsUpdate = !0),
          (t.instanceColor.needsUpdate = !0));
    }
    async init() {
      for (let e of [`mines`, `rockets`, `missile`, `cannon`]) {
        let { scene: t } = await Ya(`models/weapons/${e}.glb`);
        if (this.disposed) {
          Ka(t);
          return;
        }
        let n = [];
        try {
          (t.updateMatrixWorld(!0), Ea(t));
          let r = 0,
            i = !1;
          (t.traverse((t) => {
            if (!(t instanceof M)) return;
            let a = t.geometry.clone().applyMatrix4(t.matrixWorld);
            (t.geometry.dispose(),
              (r += (a.index?.count ?? a.attributes.position.count) / 3));
            let o = new Dt(a, t.material, Xa);
            ((o.name = `Blender ${e}`),
              (o.count = 0),
              (o.frustumCulled = !1),
              o.instanceMatrix.setUsage(Ge),
              (o.castShadow = e === `mines`),
              (o.receiveShadow = !0));
            for (let e of Array.isArray(t.material) ? t.material : [t.material])
              `map` in e && e.map && (i = !0);
            (n.push(o), this.root.add(o));
          }),
            Wa(t, this.root),
            this.models.set(e, n),
            this.assets.push({
              id: e,
              meshes: n.length,
              triangles: r,
              textured: i,
            }));
        } catch (e) {
          for (let e of n)
            (e.removeFromParent(), e.geometry.dispose(), e.dispose());
          throw (Ka(t), e);
        }
      }
    }
    burst(e, t) {
      if (
        e.kind === `pickup` ||
        e.kind === `lock` ||
        (this.flashes.push({ event: e, age: 0 }),
        this.flashes.length > 40 && this.flashes.shift(),
        e.kind === `fire` && e.item !== `cannon` && e.item !== `turbo`)
      )
        return;
      let n = e.kind === `block`,
        r = new j(
          e.item === `energy` ? `#57e3a0` : In[n ? `shield` : e.item].color,
        ).multiplyScalar(2),
        i =
          e.kind === `fire`
            ? 3
            : n
              ? e.item === `cannon`
                ? 4
                : 14
              : e.kind === `heal`
                ? 18
                : e.kind === `recover`
                  ? 36
                  : e.item === `cannon`
                    ? 5
                    : 22,
        a = L(e.distance, e.lane, 1.8);
      for (let n = 0; n < Math.ceil(i * t); n++) {
        let t = this.particles.find((e) => e.life <= 0);
        if (!t) break;
        let i = e.id * 1.718 + n * 2.399,
          o = e.item === `cannon` ? 8 : 18;
        (t.position.copy(a),
          t.velocity.set(Math.sin(i) * o, 3 + (n % 5) * 2, Math.cos(i) * o),
          (t.life = t.total = 0.22 + (n % 7) * 0.075),
          t.color.copy(r),
          (t.size = e.item === `cannon` ? 0.055 : 0.1),
          e.kind === `heal` &&
            (t.position.addScaledVector(t.velocity.clone().normalize(), 4),
            t.velocity.multiplyScalar(-0.55)));
      }
    }
    update(e, t, n = 1) {
      let r = this.sim,
        i = r.combat,
        a = [`racing`, `paused`, `countdown`].includes(r.mode);
      if (((this.root.visible = a), (this.emitters.length = 0), !a)) return;
      i.clock === this.snapshotClock
        ? (this.sinceSnapshot += Math.max(0, e))
        : ((this.snapshotClock = i.clock), (this.sinceSnapshot = 0));
      let o = r.networked ? Math.min(this.sinceSnapshot, $a) : 0;
      (this.source !== i || this.serial > i.serial) &&
        ((this.source = i),
        (this.serial = 0),
        this.histories.clear(),
        (this.flashes = []),
        this.particles.forEach((e) => (e.life = 0)));
      for (let e of i.events)
        e.id > this.serial &&
          (i.clock - e.time < 0.35 && this.burst(e, n), (this.serial = e.id));
      this.pads.forEach((e, t) => {
        e.visible = r.kind === `race` && r.modifiers.weapons;
        let n = i.pads[t] <= i.clock;
        for (let r = 1; r < 3; r++) {
          let a = e.children[r].material;
          ((a.emissiveIntensity = n
            ? 2.1 + Math.sin(i.clock * 4 + t) * 0.3
            : 0.03),
            a.color.set(n ? `#ffe1a3` : `#37404a`));
        }
      });
      let s = { mines: 0, rockets: 0, missile: 0, cannon: 0 },
        c = 0,
        l = 0,
        u = 0,
        d = new A(1, 0, 0).applyQuaternion(t.quaternion),
        f = new Set(i.projectiles.map((e) => e.id));
      for (let e of this.histories.keys()) f.has(e) || this.histories.delete(e);
      let p = new Map();
      for (let e of i.projectiles) {
        let t =
            e.kind === `mines`
              ? 0
              : Qa[e.kind] * Math.min(o, Math.max(0, e.life)),
          r = e.distance + Math.cos(e.heading) * t,
          i = P(r) - 0.4,
          a = L(
            r,
            F.clamp(e.lane + Math.sin(e.heading) * t, -i, i),
            e.kind === `mines` ? 0.65 : 1.5,
          ),
          f = to(r, e.kind === `mines` ? e.age * 0.6 : e.heading),
          m = e.kind === `mines` ? F.clamp(e.life / 0.3, 0, 1) : 1;
        this.matrix.compose(a, f, new A(m, m, m));
        let h = s[e.kind]++;
        for (let t of this.models.get(e.kind) ?? [])
          t.setMatrixAt(h, this.matrix);
        let g = new j(In[e.kind].color).multiplyScalar(2.8);
        if (e.kind === `mines`) {
          let t = (e.age < 0.45 ? 0.12 : 0.23 + Math.sin(e.age * 8) * 0.05) * m,
            n = a.clone().addScaledVector(pe(r).up, 0.4);
          (this.matrix.compose(n, f, new A(t, t, t)),
            this.cores.setMatrixAt(l, this.matrix),
            this.cores.setColorAt(l++, g),
            e.age >= 0.45 &&
              this.emitters.push({
                key: `p${e.id}`,
                kind: `mines`,
                position: n,
                envelope:
                  F.smoothstep(e.age, 0.45, 0.6) *
                  (0.75 + 0.25 * Math.sin(e.age * 8)) *
                  F.clamp(e.life / 0.6, 0, 1),
                priority:
                  F.smoothstep(e.age, 0.45, 0.6) * F.clamp(e.life / 0.6, 0, 1),
              }));
          continue;
        }
        let _ = this.histories.get(e.id) ?? [];
        (!_.length || _[0].distanceToSquared(a) > 0.12) &&
          (_.unshift(a.clone()),
          _.length > Za + 1 && _.pop(),
          this.histories.set(e.id, _));
        for (let t = 0; t < _.length - 1; t++) {
          let r = (e.kind === `cannon` ? 0.07 : 0.3) * (1 - t / Za),
            i = _[t].clone().addScaledVector(d, r),
            a = _[t].clone().addScaledVector(d, -r),
            o = _[t + 1].clone().addScaledVector(d, -r),
            s = _[t + 1].clone().addScaledVector(d, r);
          for (let e of [i, a, o, i, o, s])
            (e.toArray(this.trailPos, c * 3),
              g
                .clone()
                .multiplyScalar(1 - t / Za)
                .toArray(this.trailCol, c * 3),
              c++);
          if (n > 0.5 && e.kind !== `cannon` && t % 3 == 0 && u < 260 * n) {
            let e = 0.28 + t * 0.045;
            (this.matrix.compose(_[t], f, new A(e, e, e)),
              this.smoke.setMatrixAt(u, this.matrix),
              this.smoke.setColorAt(u++, new j(`#91a2ad`)));
          }
        }
        let v = e.kind === `cannon` ? 0.13 : 0.27,
          y = a.clone().add(new A(0, 0, -eo[e.kind]).applyQuaternion(f));
        if (
          (this.matrix.compose(y, f, new A(v, v, v * 2.8)),
          this.cores.setMatrixAt(l, this.matrix),
          this.cores.setColorAt(l++, g),
          e.kind === `cannon`)
        ) {
          let t = p.get(e.owner);
          (!t || e.age < t.age) && p.set(e.owner, e);
        } else
          this.emitters.push({
            key: `p${e.id}`,
            kind: e.kind,
            position: y,
            envelope:
              F.smoothstep(e.age, 0, 0.06) * F.clamp(e.life / 0.1, 0, 1),
          });
      }
      for (let [e, t] of p) {
        let n =
            e === r.combatId
              ? r
              : r.rivals.find(
                  (t) => t.team === e || `cpu` + r.rivals.indexOf(t) === e,
                ),
          a = Qa.cannon * t.age,
          o = 1 - F.smoothstep(t.age, 0.04, 0.12);
        this.emitters.push({
          key: `gun:${e}`,
          kind: `cannon`,
          position: n
            ? L(n.distance + 4, n.lane, 1.3)
            : L(
                t.distance - Math.cos(t.heading) * a,
                t.lane - Math.sin(t.heading) * a,
                1.5,
              ),
          envelope: o * (0.7 + 0.3 * Math.abs(Math.sin(i.clock * 47 + t.id))),
          priority: o,
        });
      }
      (this.trailGeo.setDrawRange(0, c),
        (this.trailGeo.attributes.position.needsUpdate = !0),
        (this.trailGeo.attributes.color.needsUpdate = !0));
      for (let [e, t] of this.models)
        for (let n of t)
          ((n.count = s[e]),
            (n.visible = s[e] > 0),
            (n.instanceMatrix.needsUpdate = !0));
      let m = 0;
      for (let r of this.particles) {
        if (r.life <= 0) continue;
        if (n === 0) {
          r.life = 0;
          continue;
        }
        ((r.life -= e),
          r.position.addScaledVector(r.velocity, e),
          (r.velocity.y -= 12 * e));
        let i = r.size * Math.max(0, r.life / r.total);
        (this.matrix.compose(r.position, t.quaternion, new A(i, i, i * 4)),
          this.shards.setMatrixAt(m, this.matrix),
          this.shards.setColorAt(m++, r.color));
      }
      let h = 0;
      this.flashes = this.flashes.filter((e) => e.age < 0.8);
      for (let n of this.flashes) {
        n.age += e;
        let i = n.event,
          a =
            i.kind === `heal` ||
            i.kind === `recover` ||
            (i.kind === `fire` && i.item === `shield`),
          o = i.kind === `fire` && i.item !== `shield`,
          s = i.kind === `block`,
          c =
            i.owner === r.combatId
              ? r
              : r.rivals.find(
                  (e) =>
                    e.team === i.owner ||
                    `cpu` + r.rivals.indexOf(e) === i.owner,
                ),
          u =
            a && c
              ? L(c.distance, c.lane, 1.1)
              : L(i.distance, i.lane, o || s ? 1.4 : 0.7),
          d = to(i.distance).multiply(
            new Rn().setFromAxisAngle(new A(1, 0, 0), Math.PI / 2),
          ),
          f = new j(
            i.item === `energy` ? `#57e3a0` : In[s ? `shield` : i.item].color,
          ).multiplyScalar(Math.max(0.1, 2.5 - n.age * 3));
        if ((!o || i.item === `turbo`) && !s && h < 40) {
          let e = a ? 2 + n.age * 4 : 1 + n.age * 11;
          (this.matrix.compose(u, d, new A(e, e, e)),
            this.rings.setMatrixAt(h, this.matrix),
            this.rings.setColorAt(h++, f));
        }
        if (n.age < 0.18 && l < 200) {
          let e =
            (o
              ? 0.45
              : s
                ? i.item === `cannon`
                  ? 0.5
                  : 1.3
                : i.item === `cannon`
                  ? 0.6
                  : 2.8) *
            (1 - n.age / 0.18);
          (this.matrix.compose(u, t.quaternion, new A(e, e, e)),
            this.cores.setMatrixAt(l, this.matrix),
            this.cores.setColorAt(l++, f));
        }
      }
      for (let [e, t] of [
        [this.shards, m],
        [this.rings, h],
        [this.cores, l],
        [this.smoke, u],
      ])
        ((e.count = t),
          (e.instanceMatrix.needsUpdate = !0),
          e.instanceColor && (e.instanceColor.needsUpdate = !0));
    }
    dispose() {
      this.disposed ||
        ((this.disposed = !0),
        this.root.removeFromParent(),
        Ka(this.root),
        this.root.clear(),
        this.models.clear(),
        this.histories.clear());
    }
  },
  ro = 1024;
