// assets__game-CsnOSIff 78 — mul
// Lines 32425-32735 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var zx = class {
  constructor(e, t, n) {
    ((this.capacity = e),
      (this.liveUntil = -1 / 0),
      (this.emitted = 0),
      (this.next = 0),
      (this.dirtyStart = 0),
      (this.dirtyCount = 0),
      (this.records = Array.from({ length: Mx }, () =>
        new Ct(new Float32Array(e * 4), 4).setUsage(Be),
      )));
    let r = new rt(1, 1),
      i = new rn();
    (i.setIndex(r.getIndex()),
      i.setAttribute(`position`, r.getAttribute(`position`)),
      i.setAttribute(`uv`, r.getAttribute(`uv`)),
      (i.instanceCount = e),
      (this.mesh = new N(i, Bx(this.records, t, n))),
      (this.mesh.name = t
        ? `Impact glow particles`
        : `Impact matter particles`),
      (this.mesh.frustumCulled = !1),
      (this.mesh.visible = !1),
      (this.mesh.castShadow = this.mesh.receiveShadow = !1));
  }
  claim() {
    let e = this.next;
    return (
      (this.next = (this.next + 1) % this.capacity),
      this.dirtyCount === 0 && (this.dirtyStart = e),
      (this.dirtyCount = Math.min(this.capacity, this.dirtyCount + 1)),
      this.emitted++,
      e
    );
  }
  write(e, t, n, r, i, a) {
    let o = this.records[e].array;
    ((o[t * 4] = n),
      (o[t * 4 + 1] = r),
      (o[t * 4 + 2] = i),
      (o[t * 4 + 3] = a));
  }
  upload() {
    if (this.dirtyCount === 0) return;
    let e = this.dirtyCount >= this.capacity,
      t = e ? 0 : this.dirtyStart,
      n = e ? this.capacity : Math.min(this.dirtyCount, this.capacity - t);
    for (let e of this.records)
      (e.clearUpdateRanges(),
        e.addUpdateRange(t * 4, n * 4),
        n < this.dirtyCount && e.addUpdateRange(0, (this.dirtyCount - n) * 4),
        (e.needsUpdate = !0));
    this.dirtyCount = 0;
  }
  clear() {
    let e = this.records[1].array;
    for (let t = 3; t < e.length; t += 4) e[t] = 0;
    ((this.dirtyStart = 0),
      (this.dirtyCount = this.capacity),
      (this.liveUntil = -1 / 0));
  }
  alive(e) {
    let t = this.records[0].array,
      n = this.records[1].array,
      r = 0;
    for (let i = 3; i < t.length; i += 4) e >= t[i] && e < t[i] + n[i] && r++;
    return r;
  }
  dispose() {
    (this.mesh.geometry.dispose(), this.mesh.material.dispose());
  }
};
function Bx(e, t, { time: n, right: r, up: a, forward: o, matterLight: s }) {
  let [c, l, u, d, f] = e.map((e) => Gr(e, `vec4`)),
    p = n.sub(c.w),
    m = l.w,
    h = p.greaterThanEqual(0).and(p.lessThan(m)),
    g = p.clamp(0, m),
    _ = u.w.max(0.001),
    v = Pr(_.negate().mul(g)),
    y = B(1).sub(v).div(_),
    b = d.w,
    x = b.div(_).mul(g.sub(y)),
    S = l.xyz.mul(y).sub(q(0, x, 0)),
    C = u.xyz,
    w = c.xyz.add(S).sub(C.mul(S.dot(C).min(0))),
    T = l.xyz.mul(v).sub(q(0, b.div(_).mul(B(1).sub(v)), 0)),
    E = g.div(m.max(1e-4)),
    D = J(f.x, f.y, E),
    O = f.z,
    ee = f.w,
    te = Wi.xy,
    k = T.sub(o.mul(T.dot(o))),
    ne = k.length(),
    re = Br(ne.greaterThan(0.001), k.div(ne), a),
    A = o.cross(re),
    ie = re.mul(te.y.sub(0.5).mul(D.add(ne.mul(Ax)))).add(A.mul(te.x.mul(D))),
    ae = ee.sub(0.5).mul(Br(O.greaterThan(3.5), 14, 1.5)),
    oe = ee.mul(Math.PI * 2).add(ae.mul(g)),
    se = K(
      Rr(oe).mul(te.x).sub(Hr(oe).mul(te.y)),
      Hr(oe).mul(te.x).add(Rr(oe).mul(te.y)),
    ).mul(D),
    ce = r.mul(se.x).add(a.mul(se.y)),
    le = Br(O.lessThan(0.5), ie, ce).mul(Br(h, 1, 0)),
    ue = new i({
      transparent: !0,
      depthWrite: !1,
      side: 2,
      blending: t ? 2 : 1,
      fog: !t,
    });
  ((ue.name = t ? `ImpactGlow` : `ImpactMatter`),
    (ue.positionNode = w.add(le)));
  let de = kr(E),
    fe = kr(O),
    pe = kr(ee),
    j = kr(d.xyz),
    me = X(),
    M = me.sub(0.5).mul(2).length(),
    he = B(1).sub(de);
  if (t) {
    let e = B(1).sub(me.x.mul(2).sub(1).abs()),
      t = e.mul(e).mul(me.y.mul(0.75).add(0.25)),
      r = j.x.max(j.y).max(j.z),
      i = J(q(1, 0.93, 0.8).mul(r), j, de.sqrt())
        .mul(t)
        .mul(he.pow(1.2)),
      a = B(1).sub(M).max(0),
      o = Hr(n.mul(28).add(pe.mul(40)))
        .mul(0.25)
        .add(0.75),
      s = j.mul(a.mul(a)).mul(o).mul(he);
    ((ue.colorNode = Br(fe.lessThan(0.5), i, s)), (ue.opacityNode = B(1)));
  } else {
    let e = B(1)
        .sub(M.mul(M))
        .max(0)
        .pow(1.5)
        .mul(he.pow(1.5))
        .mul(g.mul(8).min(1))
        .mul(Br(fe.greaterThan(2.5), 0.38, 0.5)),
      t = B(1).sub(de.sub(0.8).max(0).mul(5)),
      n = fe.greaterThan(3.5);
    ((ue.colorNode = j.mul(Br(n, me.y.sub(0.5).mul(0.5).add(1), 1)).mul(s)),
      (ue.opacityNode = Br(n, t, e)),
      (ue.alphaTest = 0.01));
  }
  return ue;
}
var Vx = class {
    constructor({
      glowCapacity: e = 1024,
      matterCapacity: t = 1024,
      matterLight: n = 1,
      seed: r = 1,
      vacuum: i = !1,
    } = {}) {
      ((this.group = new pn()),
        (this.density = 1),
        (this.clock = 0),
        (this.uniforms = Rx()),
        (this.axis = new g()),
        (this.normal = new g()),
        (this.tangent = new g()),
        (this.bitangent = new g()),
        (this.launch = new g()),
        (this.group.name = `Impact particles`),
        (this.vacuum = i),
        (this.uniforms.matterLight.value = n),
        (this.glow = new zx(e, !0, this.uniforms)),
        (this.matter = new zx(t, !1, this.uniforms)),
        this.group.add(this.glow.mesh, this.matter.mesh),
        (this.random = Lx(r)));
    }
    emit({
      position: e,
      surface: t,
      direction: n,
      normal: r,
      strength: i = 1,
      count: a,
    }) {
      let o = Dx[t],
        c = s.clamp(i, 0, 2),
        l = Math.round((a ?? o.count * Math.max(0.15, c)) * this.density);
      if (l <= 0) return 0;
      let u = this.random,
        d = this.axis.copy(n).normalize(),
        f = this.normal.copy(r ?? this.axis).normalize();
      (r || f.negate(),
        f.lengthSq() === 0 && f.set(0, 1, 0),
        d
          .addScaledVector(f, -2 * d.dot(f))
          .addScaledVector(f, 0.35)
          .normalize(),
        d.lengthSq() === 0 && d.copy(f),
        this.tangent
          .set(+(Math.abs(d.x) < 0.9), Math.abs(d.x) < 0.9 ? 0 : 1, 0)
          .cross(d)
          .normalize(),
        this.bitangent.crossVectors(d, this.tangent));
      let p = 0;
      return (
        o.layers.forEach((t, n) => {
          let r = n === o.layers.length - 1 ? l - p : Math.round(l * t.share);
          if (this.vacuum && t.kind === `smoke`) return;
          let i = kx.has(t.kind) ? this.glow : this.matter,
            a = Ix(t, this.vacuum),
            m = this.vacuum ? t.drag * Nx.drag : t.drag,
            h = this.vacuum ? Math.max(0, t.gravity) * Nx.gravity : t.gravity,
            g = 0.35 + 0.65 * Math.min(c, 1.5);
          for (let n = 0; n < r && p < l; n++, p++) {
            let n = i.claim(),
              r = Math.cos(t.spread * Math.PI * 0.5),
              o = 1 - u() * (1 - r),
              c = Math.sqrt(1 - o * o),
              l = u() * Math.PI * 2,
              p = this.launch
                .copy(d)
                .multiplyScalar(o)
                .addScaledVector(this.tangent, Math.cos(l) * c)
                .addScaledVector(this.bitangent, Math.sin(l) * c),
              _ = p.dot(f);
            (_ < 0 && p.addScaledVector(f, -2 * _),
              p.multiplyScalar(s.lerp(t.speed[0], t.speed[1], u()) * g));
            let v = s.lerp(t.life[0], t.life[1], u()),
              y = a[Math.floor(u() * a.length)],
              b = a[Math.floor(u() * a.length)],
              x = u(),
              S = 0.15;
            (i.write(
              0,
              n,
              e.x + (u() - 0.5) * S + f.x * 0.05,
              e.y + (u() - 0.5) * S + f.y * 0.05,
              e.z + (u() - 0.5) * S + f.z * 0.05,
              this.clock,
            ),
              i.write(1, n, p.x, p.y, p.z, v),
              i.write(
                2,
                n,
                t.floor ? f.x : 0,
                t.floor ? f.y : 0,
                t.floor ? f.z : 0,
                m,
              ),
              i.write(
                3,
                n,
                y.r + (b.r - y.r) * x,
                y.g + (b.g - y.g) * x,
                y.b + (b.b - y.b) * x,
                h,
              ));
            let C = 0.8 + u() * 0.4;
            (i.write(4, n, t.size[0] * C, t.size[1] * C, Ox[t.kind], u()),
              (i.liveUntil = Math.max(i.liveUntil, this.clock + v)));
          }
        }),
        p
      );
    }
    update(e, t) {
      (e > 0 && (this.clock += e),
        this.clock > jx &&
          this.clock >= this.glow.liveUntil &&
          this.clock >= this.matter.liveUntil &&
          ((this.clock = 0), this.glow.clear(), this.matter.clear()),
        (this.uniforms.time.value = this.clock));
      let { right: n, up: r, forward: i } = this.uniforms;
      (n.value.setFromMatrixColumn(t.matrixWorld, 0).normalize(),
        r.value.setFromMatrixColumn(t.matrixWorld, 1).normalize(),
        i.value.setFromMatrixColumn(t.matrixWorld, 2).negate().normalize());
      for (let e of [this.glow, this.matter])
        (e.upload(), (e.mesh.visible = this.clock < e.liveUntil));
    }
    set matterLight(e) {
      this.uniforms.matterLight.value = e;
    }
    snapshot() {
      return {
        capacity: this.glow.capacity + this.matter.capacity,
        alive: this.glow.alive(this.clock) + this.matter.alive(this.clock),
        emitted: this.glow.emitted + this.matter.emitted,
        drawCalls: this.group.visible
          ? +this.glow.mesh.visible + +this.matter.mesh.visible
          : 0,
      };
    }
    dispose() {
      (this.group.removeFromParent(),
        this.glow.dispose(),
        this.matter.dispose());
    }
  },
  Hx = {
    highCount: 512,
    performanceCount: 128,
    radius: 12,
    maxPixels: 1.35,
    intensity: 1,
  };
function Ux(e) {
  return Number.isFinite(e) ? s.clamp(e, 0, 2) : Hx.intensity;
}
function Wx(e) {
  let t = new URLSearchParams(e).get(`dust`);
  return t?.trim() ? Ux(Number(t)) : Hx.intensity;
}
