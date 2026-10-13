// assets__game-CsnOSIff 05 — kind
// Lines 1094-1542 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Ya = 160,
  Xa = 14,
  Za = { cannon: 440, rockets: 260, missile: 240 },
  Qa = 0.04,
  $a = { rockets: 1.35, missile: 1.8, cannon: 1.35 },
  eo = (e, t = 0) => {
    let n = A(e);
    return new Ot()
      .setFromRotationMatrix(new M().makeBasis(n.right, n.up, n.tangent))
      .multiply(new Ot().setFromAxisAngle(new g(0, 1, 0), t));
  },
  to = class {
    constructor(e) {
      ((this.sim = e),
        (this.root = new pn()),
        (this.assets = []),
        (this.models = new Map()),
        (this.pads = []),
        (this.histories = new Map()),
        (this.matrix = new M()),
        (this.trailPos = new Float32Array(Ya * Xa * 18)),
        (this.trailCol = new Float32Array(Ya * Xa * 18)),
        (this.trailGeo = new tr()),
        (this.particles = Array.from({ length: 400 }, () => ({
          position: new g(),
          velocity: new g(),
          life: 0,
          total: 1,
          color: new _(),
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
          new vt(this.trailPos, 3).setUsage(Be),
        ),
        this.trailGeo.setAttribute(
          `color`,
          new vt(this.trailCol, 3).setUsage(Be),
        ),
        (this.trails = new N(
          this.trailGeo,
          new we({
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
        (this.shards = this.instances(new ht(1, 0), 400, 0.85)),
        (this.rings = this.instances(new sn(1, 0.045, 5, 40), 40, 0.58)),
        (this.cores = this.instances(new bt(1, 8, 6), 200, 0.85)),
        (this.smoke = this.instances(new ht(1, 1), 260, 0.1, !1)));
      for (let e of Qt) {
        let t = new pn(),
          n = new N(new ir(6.6, 0.07, 12), xa(`weaponPadDeck`, `day`));
        t.add(n);
        let r = new Ne({
          color: `#ffe1a3`,
          emissive: `#ff980e`,
          emissiveIntensity: 2.4,
          roughness: 0.4,
        });
        for (let e of [-0.58, 0.58]) {
          let n = new N(new ir(0.95, 0.09, 7.5), r);
          ((n.rotation.y = e), (n.position.y = 0.09), t.add(n));
        }
        let i = new we({ color: `#ffbc5c` });
        for (let e of [-1, 1]) {
          let n = new N(new ir(0.11, 0.08, 10), i);
          (n.position.set(e * 3, 0.08, 0), t.add(n));
        }
        (t.position.copy(P(e.distance + 6, e.lane, 0.11)),
          t.quaternion.copy(eo(e.distance)),
          this.root.add(t),
          this.pads.push(t));
      }
    }
    instances(e, t, n, r = !0) {
      let i = new Wn(
        e,
        new we({
          color: `white`,
          transparent: !0,
          opacity: n,
          depthWrite: !1,
          blending: r ? 2 : 1,
        }),
        t,
      );
      return (
        i.instanceMatrix.setUsage(Be),
        (i.frustumCulled = !1),
        (i.count = 0),
        this.root.add(i),
        i
      );
    }
    prepareShaders() {
      this.root.visible = !0;
      let e = new M().makeTranslation(0, -1e4, 0);
      for (let t of this.models.values())
        for (let n of t)
          ((n.count = 1),
            n.setMatrixAt(0, e),
            (n.instanceMatrix.needsUpdate = !0));
      for (let t of [this.shards, this.rings, this.cores, this.smoke])
        ((t.count = 1),
          t.setMatrixAt(0, e),
          t.setColorAt(0, new _(`white`)),
          (t.instanceMatrix.needsUpdate = !0),
          (t.instanceColor.needsUpdate = !0));
    }
    async init() {
      for (let e of [`mines`, `rockets`, `missile`, `cannon`]) {
        let { scene: t } = await Ja(`models/weapons/${e}.glb`);
        if (this.disposed) {
          Ga(t);
          return;
        }
        let n = [];
        try {
          (t.updateMatrixWorld(!0), Ta(t));
          let r = 0,
            i = !1;
          (t.traverse((t) => {
            if (!(t instanceof N)) return;
            let a = t.geometry.clone().applyMatrix4(t.matrixWorld);
            (t.geometry.dispose(),
              (r += (a.index?.count ?? a.attributes.position.count) / 3));
            let o = new Wn(a, t.material, Ya);
            ((o.name = `Blender ${e}`),
              (o.count = 0),
              (o.frustumCulled = !1),
              o.instanceMatrix.setUsage(Be),
              (o.castShadow = e === `mines`),
              (o.receiveShadow = !0));
            for (let e of Array.isArray(t.material) ? t.material : [t.material])
              `map` in e && e.map && (i = !0);
            (n.push(o), this.root.add(o));
          }),
            Ua(t, this.root),
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
          throw (Ga(t), e);
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
        r = new _(
          e.item === `energy` ? `#57e3a0` : yn[n ? `shield` : e.item].color,
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
        a = P(e.distance, e.lane, 1.8);
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
      let o = r.networked ? Math.min(this.sinceSnapshot, Qa) : 0;
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
      let c = { mines: 0, rockets: 0, missile: 0, cannon: 0 },
        l = 0,
        u = 0,
        d = 0,
        f = new g(1, 0, 0).applyQuaternion(t.quaternion),
        p = new Set(i.projectiles.map((e) => e.id));
      for (let e of this.histories.keys()) p.has(e) || this.histories.delete(e);
      let m = new Map();
      for (let e of i.projectiles) {
        let t =
            e.kind === `mines`
              ? 0
              : Za[e.kind] * Math.min(o, Math.max(0, e.life)),
          r = e.distance + Math.cos(e.heading) * t,
          i = j(r) - 0.4,
          a = P(
            r,
            s.clamp(e.lane + Math.sin(e.heading) * t, -i, i),
            e.kind === `mines` ? 0.65 : 1.5,
          ),
          p = eo(r, e.kind === `mines` ? e.age * 0.6 : e.heading),
          h = e.kind === `mines` ? s.clamp(e.life / 0.3, 0, 1) : 1;
        this.matrix.compose(a, p, new g(h, h, h));
        let v = c[e.kind]++;
        for (let t of this.models.get(e.kind) ?? [])
          t.setMatrixAt(v, this.matrix);
        let y = new _(yn[e.kind].color).multiplyScalar(2.8);
        if (e.kind === `mines`) {
          let t = (e.age < 0.45 ? 0.12 : 0.23 + Math.sin(e.age * 8) * 0.05) * h,
            n = a.clone().addScaledVector(A(r).up, 0.4);
          (this.matrix.compose(n, p, new g(t, t, t)),
            this.cores.setMatrixAt(u, this.matrix),
            this.cores.setColorAt(u++, y),
            e.age >= 0.45 &&
              this.emitters.push({
                key: `p${e.id}`,
                kind: `mines`,
                position: n,
                envelope:
                  s.smoothstep(e.age, 0.45, 0.6) *
                  (0.75 + 0.25 * Math.sin(e.age * 8)) *
                  s.clamp(e.life / 0.6, 0, 1),
                priority:
                  s.smoothstep(e.age, 0.45, 0.6) * s.clamp(e.life / 0.6, 0, 1),
              }));
          continue;
        }
        let b = this.histories.get(e.id) ?? [];
        (!b.length || b[0].distanceToSquared(a) > 0.12) &&
          (b.unshift(a.clone()),
          b.length > Xa + 1 && b.pop(),
          this.histories.set(e.id, b));
        for (let t = 0; t < b.length - 1; t++) {
          let r = (e.kind === `cannon` ? 0.07 : 0.3) * (1 - t / Xa),
            i = b[t].clone().addScaledVector(f, r),
            a = b[t].clone().addScaledVector(f, -r),
            o = b[t + 1].clone().addScaledVector(f, -r),
            s = b[t + 1].clone().addScaledVector(f, r);
          for (let e of [i, a, o, i, o, s])
            (e.toArray(this.trailPos, l * 3),
              y
                .clone()
                .multiplyScalar(1 - t / Xa)
                .toArray(this.trailCol, l * 3),
              l++);
          if (n > 0.5 && e.kind !== `cannon` && t % 3 == 0 && d < 260 * n) {
            let e = 0.28 + t * 0.045;
            (this.matrix.compose(b[t], p, new g(e, e, e)),
              this.smoke.setMatrixAt(d, this.matrix),
              this.smoke.setColorAt(d++, new _(`#91a2ad`)));
          }
        }
        let x = e.kind === `cannon` ? 0.13 : 0.27,
          S = a.clone().add(new g(0, 0, -$a[e.kind]).applyQuaternion(p));
        if (
          (this.matrix.compose(S, p, new g(x, x, x * 2.8)),
          this.cores.setMatrixAt(u, this.matrix),
          this.cores.setColorAt(u++, y),
          e.kind === `cannon`)
        ) {
          let t = m.get(e.owner);
          (!t || e.age < t.age) && m.set(e.owner, e);
        } else
          this.emitters.push({
            key: `p${e.id}`,
            kind: e.kind,
            position: S,
            envelope:
              s.smoothstep(e.age, 0, 0.06) * s.clamp(e.life / 0.1, 0, 1),
          });
      }
      for (let [e, t] of m) {
        let n =
            e === r.combatId
              ? r
              : r.rivals.find(
                  (t) => t.team === e || `cpu` + r.rivals.indexOf(t) === e,
                ),
          a = Za.cannon * t.age,
          o = 1 - s.smoothstep(t.age, 0.04, 0.12);
        this.emitters.push({
          key: `gun:${e}`,
          kind: `cannon`,
          position: n
            ? P(n.distance + 4, n.lane, 1.3)
            : P(
                t.distance - Math.cos(t.heading) * a,
                t.lane - Math.sin(t.heading) * a,
                1.5,
              ),
          envelope: o * (0.7 + 0.3 * Math.abs(Math.sin(i.clock * 47 + t.id))),
          priority: o,
        });
      }
      (this.trailGeo.setDrawRange(0, l),
        (this.trailGeo.attributes.position.needsUpdate = !0),
        (this.trailGeo.attributes.color.needsUpdate = !0));
      for (let [e, t] of this.models)
        for (let n of t)
          ((n.count = c[e]),
            (n.visible = c[e] > 0),
            (n.instanceMatrix.needsUpdate = !0));
      let h = 0;
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
        (this.matrix.compose(r.position, t.quaternion, new g(i, i, i * 4)),
          this.shards.setMatrixAt(h, this.matrix),
          this.shards.setColorAt(h++, r.color));
      }
      let v = 0;
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
          l =
            a && c
              ? P(c.distance, c.lane, 1.1)
              : P(i.distance, i.lane, o || s ? 1.4 : 0.7),
          d = eo(i.distance).multiply(
            new Ot().setFromAxisAngle(new g(1, 0, 0), Math.PI / 2),
          ),
          f = new _(
            i.item === `energy` ? `#57e3a0` : yn[s ? `shield` : i.item].color,
          ).multiplyScalar(Math.max(0.1, 2.5 - n.age * 3));
        if ((!o || i.item === `turbo`) && !s && v < 40) {
          let e = a ? 2 + n.age * 4 : 1 + n.age * 11;
          (this.matrix.compose(l, d, new g(e, e, e)),
            this.rings.setMatrixAt(v, this.matrix),
            this.rings.setColorAt(v++, f));
        }
        if (n.age < 0.18 && u < 200) {
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
          (this.matrix.compose(l, t.quaternion, new g(e, e, e)),
            this.cores.setMatrixAt(u, this.matrix),
            this.cores.setColorAt(u++, f));
        }
      }
      for (let [e, t] of [
        [this.shards, h],
        [this.rings, v],
        [this.cores, u],
        [this.smoke, d],
      ])
        ((e.count = t),
          (e.instanceMatrix.needsUpdate = !0),
          e.instanceColor && (e.instanceColor.needsUpdate = !0));
    }
    dispose() {
      this.disposed ||
        ((this.disposed = !0),
        this.root.removeFromParent(),
        Ga(this.root),
        this.root.clear(),
        this.models.clear(),
        this.histories.clear());
    }
  },
  no = 1024;
