// assets__game-CsnOSIff 06 — mul
// Lines 1543-1771 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function ro(e) {
  return e <= 1 || e > no ? Math.max(1, e) : 2 ** Math.ceil(Math.log2(e));
}
function io(e, t, n) {
  let r = new Wn(e, t, ro(n));
  return ((r.count = n), r);
}
var ao =
  /(NodeBuffer_|nodeAttribute|nodeVarying|nodeUniform|nodeConst|nodeCode|nodeVar)(\d+)/g;
function oo(e) {
  let t = new Map();
  return e.replace(ao, (e, n) => {
    let r = t.get(e);
    return (r === void 0 && t.set(e, (r = `${n}C${t.size}`)), r);
  });
}
function so(e) {
  let t = e.backend,
    n = e._nodes;
  if (!t.isWebGPUBackend || !n?._createNodeBuilderState) return !1;
  let r = n._createNodeBuilderState.bind(n);
  return (
    (n._createNodeBuilderState = (e) => {
      for (let t of [`vertexShader`, `fragmentShader`, `computeShader`]) {
        let n = e[t];
        n && (e[t] = oo(n));
      }
      return r(e);
    }),
    !0
  );
}
var co = [`off`, `low`, `medium`, `high`, `ultra`],
  lo = {
    low: { distance: 260 * 0.46, splits: [1] },
    medium: { distance: 260 * 0.77, splits: [0.22, 1] },
    high: { distance: 260, splits: [0.12, 0.38, 1] },
    ultra: { distance: 260 * 1.38, splits: [0.065, 0.19, 0.46, 1] },
  },
  uo = 2048,
  fo = 0.48,
  po = 0.1,
  mo = 0.14,
  ho = 260,
  go = 1;
function _o(e, t = uo) {
  return e.splits.map((n) => {
    let r = n * e.distance,
      i = fo * r,
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
function vo(e) {
  let t = new URLSearchParams(e).get(`shadows`);
  return co.includes(t) ? t : null;
}
var yo = (e) => e.setGroup(zr),
  bo = (e) => (e === 0 ? 2 : 1);
function xo(e) {
  return Vi(({ depthTexture: t, shadowCoord: n, shadow: r }) => {
    let i = yo(Wr(`mapSize`, `vec2`, r)),
      a = n.xy.mul(i).add(0.5),
      o = a.floor(),
      s = a.sub(o),
      c = (t) =>
        Array.from({ length: e + 1 }, (n, r) => {
          let [i, a] =
            r === 0
              ? [B(2).sub(t), B(1).div(B(2).sub(t))]
              : r === e
                ? [t.add(1), t.div(t.add(1))]
                : [B(2), B(0.5)];
          return [i, a.add(2 * r - e - 0.5)];
        }),
      l = c(s.x),
      u = c(s.y),
      d = B(0);
    for (let [e, r] of l)
      for (let [a, s] of u) {
        let c = R(t, o.add(K(r, s)).div(i)).compare(n.z);
        d = d.add(e.mul(a).mul(c));
      }
    return d.div((2 * e + 1) ** 2);
  });
}
var So = class {
    constructor(e, t) {
      ((this.active = L(0)),
        (this.guard = L(0.001)),
        (this.band = L(po)),
        (this.layout = null),
        (this.range = 0));
      let n = new Je();
      ((n.name = `Sun shadow cascade ${t}`),
        (n.target = new Je()),
        (n.castShadow = !0),
        (n.shadow = e.shadow.clone()),
        n.shadow.mapSize.set(uo, uo),
        (n.shadow.filterNode = xo(bo(t))),
        n.shadow.camera.layers.enable(5),
        (this.caster = n),
        (this.node = wr(n, n.shadow)));
    }
  },
  Co = class {
    constructor() {
      ((this.empty = To()),
        (this.map = R(this.empty)),
        (this.origin = L(new b())),
        (this.spacing = L(1)),
        (this.count = L(1)),
        (this.enabled = L(0)));
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
          .greaterThanEqual(K(0))
          .all()
          .and(t.lessThanEqual(K(1)).all())
          .select(this.enabled, B(0)),
        r = this.map.sample(t).r,
        i = Z(-wo, wo, e.y.sub(r));
      return J(B(1), i, n);
    }
    dispose() {
      this.empty.dispose();
    }
  },
  wo = 1.5;
function To() {
  let e = new re(new Uint16Array([Me.toHalfFloat(-1e3)]), 1, 1, Ue, kn);
  return ((e.needsUpdate = !0), e);
}
var Eo = class extends xt {
    constructor(e, t, n, r) {
      (super(e), (this.slots = t), (this.tintCascades = n), (this.terrain = r));
    }
    updateBefore() {}
    setup(e) {
      return Vi(() => {
        this.setupShadowPosition(e);
        let t = Dr,
          n = B(1).toVar(`sunShadow`),
          r = B(1).toVar(`sunShadowRemaining`),
          i = q(0).toVar(`sunShadowTint`),
          a = [
            q(1, 0.35, 0.35),
            q(0.35, 1, 0.35),
            q(0.4, 0.55, 1),
            q(1, 0.9, 0.3),
          ];
        return (
          this.slots.forEach((e, o) => {
            let s = yo(Wr(`normalBias`, `float`, e.caster.shadow)),
              c = Or(e.caster).mul(H(t.add(Hi.mul(s)), 1)).xy,
              l = dr(dr(c.x, c.y), dr(c.x.oneMinus(), c.y.oneMinus()))
                .sub(e.guard)
                .div(e.band)
                .clamp(0, 1)
                .mul(e.active)
                .mul(r)
                .toVar(`sunCascadeWeight${o}`);
            (ci(l.greaterThan(1e-4), () => {
              let t = e.node;
              n.subAssign(l.mul(B(1).sub(t)));
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
  Do = new WeakMap();
function Oo(e, t) {
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
function ko(e) {
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
      let t = new tr();
      return (
        t.setAttribute(`position`, e.geometry.getAttribute(`position`)),
        t.setIndex(e.geometry.getIndex()),
        t
      );
    }),
  );
  return n ? { geometry: n, side: t } : null;
}
