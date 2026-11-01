// assets__game-D43Oxqny 06 — mul
// Lines 1560-1788 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function io(e) {
  return e <= 1 || e > ro ? Math.max(1, e) : 2 ** Math.ceil(Math.log2(e));
}
function ao(e, t, n) {
  let r = new Dt(e, t, io(n));
  return ((r.count = n), r);
}
var oo =
  /(NodeBuffer_|nodeAttribute|nodeVarying|nodeUniform|nodeConst|nodeCode|nodeVar)(\d+)/g;
function so(e) {
  let t = new Map();
  return e.replace(oo, (e, n) => {
    let r = t.get(e);
    return (r === void 0 && t.set(e, (r = `${n}C${t.size}`)), r);
  });
}
function co(e) {
  let t = e.backend,
    n = e._nodes;
  if (!t.isWebGPUBackend || !n?._createNodeBuilderState) return !1;
  let r = n._createNodeBuilderState.bind(n);
  return (
    (n._createNodeBuilderState = (e) => {
      for (let t of [`vertexShader`, `fragmentShader`, `computeShader`]) {
        let n = e[t];
        n && (e[t] = so(n));
      }
      return r(e);
    }),
    !0
  );
}
var lo = [`off`, `low`, `medium`, `high`, `ultra`],
  uo = {
    low: { distance: 260 * 0.46, splits: [1] },
    medium: { distance: 260 * 0.77, splits: [0.22, 1] },
    high: { distance: 260, splits: [0.12, 0.38, 1] },
    ultra: { distance: 260 * 1.38, splits: [0.065, 0.19, 0.46, 1] },
  },
  fo = 2048,
  po = 0.48,
  mo = 0.1,
  ho = 0.14,
  go = 260,
  _o = 1;
function vo(e, t = fo) {
  return e.splits.map((n) => {
    let r = n * e.distance,
      i = po * r,
      a = Math.hypot(r + 5, 2 * i);
    return {
      reach: r,
      halfWidth: i,
      extent: a,
      texel: a / t,
      centre: (r - 5) / 2,
    };
  });
}
function yo(e) {
  let t = new URLSearchParams(e).get(`shadows`);
  return lo.includes(t) ? t : null;
}
var bo = (e) => e.setGroup(zr),
  xo = (e) => (e === 0 ? 2 : 1);
function So(e) {
  return Hi(({ depthTexture: t, shadowCoord: n, shadow: r }) => {
    let i = bo(Wr(`mapSize`, `vec2`, r)),
      a = n.xy.mul(i).add(0.5),
      o = a.floor(),
      s = a.sub(o),
      c = (t) =>
        Array.from({ length: e + 1 }, (n, r) => {
          let [i, a] =
            r === 0
              ? [V(2).sub(t), V(1).div(V(2).sub(t))]
              : r === e
                ? [t.add(1), t.div(t.add(1))]
                : [V(2), V(0.5)];
          return [i, a.add(2 * r - e - 0.5)];
        }),
      l = c(s.x),
      u = c(s.y),
      d = V(0);
    for (let [e, r] of l)
      for (let [a, s] of u) {
        let c = z(t, o.add(q(r, s)).div(i)).compare(n.z);
        d = d.add(e.mul(a).mul(c));
      }
    return d.div((2 * e + 1) ** 2);
  });
}
var Co = class {
    constructor(e, t) {
      ((this.active = R(0)),
        (this.guard = R(0.001)),
        (this.band = R(mo)),
        (this.layout = null),
        (this.range = 0));
      let n = new w();
      ((n.name = `Sun shadow cascade ${t}`),
        (n.target = new w()),
        (n.castShadow = !0),
        (n.shadow = e.shadow.clone()),
        n.shadow.mapSize.set(fo, fo),
        (n.shadow.filterNode = So(xo(t))),
        n.shadow.camera.layers.enable(5),
        (this.caster = n),
        (this.node = wr(n, n.shadow)));
    }
  },
  wo = class {
    constructor() {
      ((this.empty = Eo()),
        (this.map = z(this.empty)),
        (this.origin = R(new p())),
        (this.spacing = R(1)),
        (this.count = R(1)),
        (this.enabled = R(0)));
    }
    set(e, t = 0, n = 0, r = 1, i = 1) {
      ((this.map.value = e ?? this.empty),
        this.origin.value.set(t, n),
        (this.spacing.value = r),
        (this.count.value = i),
        (this.enabled.value = +!!e));
    }
    lit(e) {
      let t = e.xz.sub(this.origin).div(this.spacing).add(0.5).div(this.count),
        n = t
          .greaterThanEqual(q(0))
          .all()
          .and(t.lessThanEqual(q(1)).all())
          .select(this.enabled, V(0)),
        r = this.map.sample(t).r,
        i = Z(-To, To, e.y.sub(r));
      return Y(V(1), i, n);
    }
    dispose() {
      this.empty.dispose();
    }
  },
  To = 1.5;
function Eo() {
  let e = new fe(new Uint16Array([sr.toHalfFloat(-1e3)]), 1, 1, te, Kt);
  return ((e.needsUpdate = !0), e);
}
var Do = class extends rn {
    constructor(e, t, n, r) {
      (super(e), (this.slots = t), (this.tintCascades = n), (this.terrain = r));
    }
    updateBefore() {}
    setup(e) {
      return Hi(() => {
        this.setupShadowPosition(e);
        let t = Dr,
          n = V(1).toVar(`sunShadow`),
          r = V(1).toVar(`sunShadowRemaining`),
          i = J(0).toVar(`sunShadowTint`),
          a = [
            J(1, 0.35, 0.35),
            J(0.35, 1, 0.35),
            J(0.4, 0.55, 1),
            J(1, 0.9, 0.3),
          ];
        return (
          this.slots.forEach((e, o) => {
            let s = bo(Wr(`normalBias`, `float`, e.caster.shadow)),
              c = Or(e.caster).mul(U(t.add(Ui.mul(s)), 1)).xy,
              l = dr(dr(c.x, c.y), dr(c.x.oneMinus(), c.y.oneMinus()))
                .sub(e.guard)
                .div(e.band)
                .clamp(0, 1)
                .mul(e.active)
                .mul(r)
                .toVar(`sunCascadeWeight${o}`);
            (ci(l.greaterThan(1e-4), () => {
              let t = e.node;
              n.subAssign(l.mul(V(1).sub(t)));
            }),
              r.subAssign(l),
              this.tintCascades && i.addAssign(a[o].mul(l)));
          }),
          n.assign(dr(n, this.terrain.lit(t))),
          this.tintCascades ? i.add(r).mul(n) : n
        );
      })();
    }
  },
  Oo = new WeakMap();
function ko(e, t) {
  if (
    e.parent !== t.parent ||
    e.count !== t.count ||
    !e.matrix.equals(t.matrix)
  )
    return !1;
  let n = e.instanceMatrix.array,
    r = t.instanceMatrix.array;
  for (let t = 0; t < e.count * 16; t++) if (n[t] !== r[t]) return !1;
  return !0;
}
function Ao(e) {
  let t = 0;
  for (let n of e) {
    let e = n.material;
    if (
      Array.isArray(e) ||
      !n.geometry.index ||
      e.transparent ||
      e.alphaTest > 0 ||
      (`alphaMap` in e && e.alphaMap)
    )
      return null;
    e.side !== 0 && (t = 2);
  }
  if (e.length === 1) return null;
  let n = ur(
    e.map((e) => {
      let t = new Me();
      return (
        t.setAttribute(`position`, e.geometry.getAttribute(`position`)),
        t.setIndex(e.geometry.getIndex()),
        t
      );
    }),
  );
  return n ? { geometry: n, side: t } : null;
}
