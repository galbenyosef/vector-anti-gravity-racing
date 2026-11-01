// assets__game-D43Oxqny 78 — mul
// Lines 32587-32896 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var Zx = class {
  constructor(e, t, n) {
    ((this.capacity = e),
      (this.liveUntil = -1 / 0),
      (this.emitted = 0),
      (this.next = 0),
      (this.dirtyStart = 0),
      (this.dirtyCount = 0),
      (this.records = Array.from({ length: Wx }, () =>
        new on(new Float32Array(e * 4), 4).setUsage(Ge),
      )));
    let r = new Ye(1, 1),
      i = new qn();
    (i.setIndex(r.getIndex()),
      i.setAttribute(`position`, r.getAttribute(`position`)),
      i.setAttribute(`uv`, r.getAttribute(`uv`)),
      (i.instanceCount = e),
      (this.mesh = new M(i, Qx(this.records, t, n))),
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
function Qx(e, t, { time: n, right: r, up: i, forward: a, matterLight: o }) {
  let [s, c, l, u, d] = e.map((e) => Gr(e, `vec4`)),
    f = n.sub(s.w),
    p = c.w,
    m = f.greaterThanEqual(0).and(f.lessThan(p)),
    h = f.clamp(0, p),
    g = l.w.max(0.001),
    _ = Pr(g.negate().mul(h)),
    v = V(1).sub(_).div(g),
    y = u.w,
    b = y.div(g).mul(h.sub(v)),
    x = c.xyz.mul(v).sub(J(0, b, 0)),
    S = l.xyz,
    C = s.xyz.add(x).sub(S.mul(x.dot(S).min(0))),
    w = c.xyz.mul(_).sub(J(0, y.div(g).mul(V(1).sub(_)), 0)),
    T = h.div(p.max(1e-4)),
    ee = Y(d.x, d.y, T),
    te = d.z,
    E = d.w,
    D = Gi.xy,
    ne = w.sub(a.mul(w.dot(a))),
    re = ne.length(),
    ie = Br(re.greaterThan(0.001), ne.div(re), i),
    ae = a.cross(ie),
    oe = ie.mul(D.y.sub(0.5).mul(ee.add(re.mul(Hx)))).add(ae.mul(D.x.mul(ee))),
    se = E.sub(0.5).mul(Br(te.greaterThan(3.5), 14, 1.5)),
    ce = E.mul(Math.PI * 2).add(se.mul(h)),
    le = q(
      Rr(ce).mul(D.x).sub(Hr(ce).mul(D.y)),
      Hr(ce).mul(D.x).add(Rr(ce).mul(D.y)),
    ).mul(ee),
    ue = r.mul(le.x).add(i.mul(le.y)),
    O = Br(te.lessThan(0.5), oe, ue).mul(Br(m, 1, 0)),
    de = new At({
      transparent: !0,
      depthWrite: !1,
      side: 2,
      blending: t ? 2 : 1,
      fog: !t,
    });
  ((de.name = t ? `ImpactGlow` : `ImpactMatter`), (de.positionNode = C.add(O)));
  let fe = kr(T),
    pe = kr(te),
    me = kr(E),
    he = kr(u.xyz),
    ge = X(),
    _e = ge.sub(0.5).mul(2).length(),
    k = V(1).sub(fe);
  if (t) {
    let e = V(1).sub(ge.x.mul(2).sub(1).abs()),
      t = e.mul(e).mul(ge.y.mul(0.75).add(0.25)),
      r = he.x.max(he.y).max(he.z),
      i = Y(J(1, 0.93, 0.8).mul(r), he, fe.sqrt())
        .mul(t)
        .mul(k.pow(1.2)),
      a = V(1).sub(_e).max(0),
      o = Hr(n.mul(28).add(me.mul(40)))
        .mul(0.25)
        .add(0.75),
      s = he.mul(a.mul(a)).mul(o).mul(k);
    ((de.colorNode = Br(pe.lessThan(0.5), i, s)), (de.opacityNode = V(1)));
  } else {
    let e = V(1)
        .sub(_e.mul(_e))
        .max(0)
        .pow(1.5)
        .mul(k.pow(1.5))
        .mul(h.mul(8).min(1))
        .mul(Br(pe.greaterThan(2.5), 0.38, 0.5)),
      t = V(1).sub(fe.sub(0.8).max(0).mul(5)),
      n = pe.greaterThan(3.5);
    ((de.colorNode = he.mul(Br(n, ge.y.sub(0.5).mul(0.5).add(1), 1)).mul(o)),
      (de.opacityNode = Br(n, t, e)),
      (de.alphaTest = 0.01));
  }
  return de;
}
var $x = class {
    constructor({
      glowCapacity: e = 1024,
      matterCapacity: t = 1024,
      matterLight: n = 1,
      seed: r = 1,
      vacuum: i = !1,
    } = {}) {
      ((this.group = new An()),
        (this.density = 1),
        (this.clock = 0),
        (this.uniforms = Xx()),
        (this.axis = new A()),
        (this.normal = new A()),
        (this.tangent = new A()),
        (this.bitangent = new A()),
        (this.launch = new A()),
        (this.group.name = `Impact particles`),
        (this.vacuum = i),
        (this.uniforms.matterLight.value = n),
        (this.glow = new Zx(e, !0, this.uniforms)),
        (this.matter = new Zx(t, !1, this.uniforms)),
        this.group.add(this.glow.mesh, this.matter.mesh),
        (this.random = Yx(r)));
    }
    emit({
      position: e,
      surface: t,
      direction: n,
      normal: r,
      strength: i = 1,
      count: a,
    }) {
      let o = zx[t],
        s = F.clamp(i, 0, 2),
        c = Math.round((a ?? o.count * Math.max(0.15, s)) * this.density);
      if (c <= 0) return 0;
      let l = this.random,
        u = this.axis.copy(n).normalize(),
        d = this.normal.copy(r ?? this.axis).normalize();
      (r || d.negate(),
        d.lengthSq() === 0 && d.set(0, 1, 0),
        u
          .addScaledVector(d, -2 * u.dot(d))
          .addScaledVector(d, 0.35)
          .normalize(),
        u.lengthSq() === 0 && u.copy(d),
        this.tangent
          .set(+(Math.abs(u.x) < 0.9), Math.abs(u.x) < 0.9 ? 0 : 1, 0)
          .cross(u)
          .normalize(),
        this.bitangent.crossVectors(u, this.tangent));
      let f = 0;
      return (
        o.layers.forEach((t, n) => {
          let r = n === o.layers.length - 1 ? c - f : Math.round(c * t.share);
          if (this.vacuum && t.kind === `smoke`) return;
          let i = Vx.has(t.kind) ? this.glow : this.matter,
            a = Jx(t, this.vacuum),
            p = this.vacuum ? t.drag * Gx.drag : t.drag,
            m = this.vacuum ? Math.max(0, t.gravity) * Gx.gravity : t.gravity,
            h = 0.35 + 0.65 * Math.min(s, 1.5);
          for (let n = 0; n < r && f < c; n++, f++) {
            let n = i.claim(),
              r = Math.cos(t.spread * Math.PI * 0.5),
              o = 1 - l() * (1 - r),
              s = Math.sqrt(1 - o * o),
              c = l() * Math.PI * 2,
              f = this.launch
                .copy(u)
                .multiplyScalar(o)
                .addScaledVector(this.tangent, Math.cos(c) * s)
                .addScaledVector(this.bitangent, Math.sin(c) * s),
              g = f.dot(d);
            (g < 0 && f.addScaledVector(d, -2 * g),
              f.multiplyScalar(F.lerp(t.speed[0], t.speed[1], l()) * h));
            let _ = F.lerp(t.life[0], t.life[1], l()),
              v = a[Math.floor(l() * a.length)],
              y = a[Math.floor(l() * a.length)],
              b = l(),
              x = 0.15;
            (i.write(
              0,
              n,
              e.x + (l() - 0.5) * x + d.x * 0.05,
              e.y + (l() - 0.5) * x + d.y * 0.05,
              e.z + (l() - 0.5) * x + d.z * 0.05,
              this.clock,
            ),
              i.write(1, n, f.x, f.y, f.z, _),
              i.write(
                2,
                n,
                t.floor ? d.x : 0,
                t.floor ? d.y : 0,
                t.floor ? d.z : 0,
                p,
              ),
              i.write(
                3,
                n,
                v.r + (y.r - v.r) * b,
                v.g + (y.g - v.g) * b,
                v.b + (y.b - v.b) * b,
                m,
              ));
            let S = 0.8 + l() * 0.4;
            (i.write(4, n, t.size[0] * S, t.size[1] * S, Bx[t.kind], l()),
              (i.liveUntil = Math.max(i.liveUntil, this.clock + _)));
          }
        }),
        f
      );
    }
    update(e, t) {
      (e > 0 && (this.clock += e),
        this.clock > Ux &&
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
  eS = {
    highCount: 512,
    performanceCount: 128,
    radius: 12,
    maxPixels: 1.35,
    intensity: 1,
  };
function tS(e) {
  return Number.isFinite(e) ? F.clamp(e, 0, 2) : eS.intensity;
}
function nS(e) {
  let t = new URLSearchParams(e).get(`dust`);
  return t?.trim() ? tS(Number(t)) : eS.intensity;
}
