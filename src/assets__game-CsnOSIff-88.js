// assets__game-CsnOSIff 88 — mul
// Lines 35464-35697 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function ZS(e = !1, t = {}) {
  let n = e === `desert`;
  return QS(
    e === `metropolis`
      ? {
          FOG_HEIGHT: 40,
          FOG_FALLOFF: 0.012,
          FOG_DENSITY: 9e-4,
          FOG_COLOR: `#c9d2da`,
          SUN_SCATTERING_INTENSITY: YS,
        }
      : e === `lunar`
        ? {
            FOG_HEIGHT: 6,
            FOG_FALLOFF: 0,
            FOG_DENSITY: 0,
            FOG_COLOR: `#000000`,
            SUN_SCATTERING_INTENSITY: 0,
          }
        : {
            FOG_HEIGHT: n ? 22 : 6,
            FOG_FALLOFF: n ? 0.008 : KS,
            FOG_DENSITY: e === !0 ? 85e-5 : n ? 0.00135 : qS,
            FOG_COLOR: e === !0 ? `#273c59` : n ? `#d4a4a0` : JS,
            SUN_SCATTERING_INTENSITY: e === !0 ? 0 : YS,
          },
    t,
  );
}
function QS(e, t) {
  let n = { ...e };
  for (let e of Object.keys(XS)) {
    let r = t[e];
    typeof r == `number` &&
      Number.isFinite(r) &&
      (n[e] = s.clamp(r, XS[e][0], XS[e][1]));
  }
  return (
    t.FOG_COLOR &&
      /^#[\da-f]{6}$/i.test(t.FOG_COLOR) &&
      (n.FOG_COLOR = t.FOG_COLOR),
    n
  );
}
function $S(e, t) {
  let n = new URLSearchParams(t),
    r = {};
  for (let e of Object.keys(XS)) {
    let t = n.get(e);
    t?.trim() && (r[e] = Number(t));
  }
  let i = n.get(`FOG_COLOR`);
  return (i && (r.FOG_COLOR = i.startsWith(`#`) ? i : `#${i}`), ZS(e, r));
}
var eC = class {
  constructor(e, t) {
    ((this.distanceFog = e),
      (this.height = L(6)),
      (this.falloff = L(KS)),
      (this.density = L(qS)),
      (this.color = L(new _(JS))),
      (this.scatteringIntensity = L(YS)),
      (this.heightEnabled = L(1)),
      (this.distanceEnabled = L(1)),
      (this.settings = t),
      this.apply(t));
    let n = (e) => e.setGroup(zr),
      r = n(Wr(`near`, `float`, e)),
      i = n(Wr(`far`, `float`, e)),
      a = n(Wr(`color`, `color`, e));
    this.node = Vi(() => {
      let e = U.sub(Ur).toVar(),
        t = this.opticalDepth(Ur.y, U.y, e.length())
          .negate()
          .exp()
          .oneMinus()
          .mul(this.heightEnabled);
      return H(
        J(J(Mi.rgb, this.color, t), a, Ki(r, i).mul(this.distanceEnabled)),
        Mi.a,
      );
    })();
  }
  densityAt(e) {
    return e
      .sub(this.height)
      .max(0)
      .mul(this.falloff)
      .negate()
      .exp()
      .mul(this.density);
  }
  opticalDepth(e, t, n) {
    return Vi(() => {
      let r = dr(e, t).toVar(),
        i = V(e, t).toVar(),
        a = i.sub(r).toVar(),
        o = this.height.sub(r).clamp(0, a).toVar(),
        s = i.sub(V(r, this.height)).max(0).toVar(),
        c = this.falloff.mul(s).toVar(),
        l = c
          .lessThan(0.001)
          .select(
            B(1).sub(c.mul(0.5)).add(c.mul(c).div(6)),
            c.negate().exp().oneMinus().div(V(c, 1e-4)),
          ),
        u = o
          .mul(this.density)
          .add(s.mul(this.densityAt(r)).mul(l))
          .div(V(a, 0.001));
      return n.mul(
        a.lessThan(0.001).select(this.densityAt(e.add(t).mul(0.5)), u),
      );
    })();
  }
  apply(e) {
    ((this.settings = QS(this.settings, e)),
      (this.height.value = this.settings.FOG_HEIGHT),
      (this.falloff.value = this.settings.FOG_FALLOFF),
      (this.density.value = this.settings.FOG_DENSITY),
      this.color.value.set(this.settings.FOG_COLOR),
      (this.scatteringIntensity.value =
        this.settings.SUN_SCATTERING_INTENSITY));
  }
  snapshot() {
    return {
      ...this.settings,
      technique: `analytic-height-integral`,
      distanceFog: {
        near: this.distanceFog.near,
        far: this.distanceFog.far,
        color: `#${this.distanceFog.color.getHexString()}`,
      },
    };
  }
};
function tC(e) {
  let t = e.getIndex(),
    n = t.array;
  for (let e = 0; e < n.length; e += 3) {
    let t = n[e + 1];
    ((n[e + 1] = n[e + 2]), (n[e + 2] = t));
  }
  t.needsUpdate = !0;
  let r = e.getAttribute(`normal`);
  for (let e = 0; e < r.count; e++)
    r.setXYZ(e, -r.getX(e), -r.getY(e), -r.getZ(e));
  return ((r.needsUpdate = !0), e);
}
function nC(e = 861) {
  return () => ((e = (e * 1664525 + 1013904223) >>> 0), e / 4294967296);
}
var rC = nC();
async function iC(e) {
  let t = self;
  if (typeof t.scheduler?.yield == `function`) return e();
  let n = t.scheduler,
    r = new MessageChannel(),
    i = [];
  r.port1.onmessage = () => i.shift()?.();
  try {
    t.scheduler = {
      yield: () =>
        new Promise((e) => {
          (i.push(e), r.port2.postMessage(null));
        }),
    };
  } catch {
    return (r.port1.close(), r.port2.close(), e());
  }
  try {
    return await e();
  } finally {
    (n ? (t.scheduler = n) : delete t.scheduler,
      r.port1.close(),
      r.port2.close());
  }
}
function aC(e, t, n) {
  let r = document.createElement(`canvas`),
    i = kl(e, t, $t().mobile);
  ((r.width = i.width), (r.height = i.height));
  let a = r.getContext(`2d`);
  (a.scale(i.width / e, i.height / t), n(a));
  let o = new p(r);
  return ((o.colorSpace = st), o);
}
function oC(e) {
  let t = [],
    n = [];
  for (let [n, r, i, a] of e)
    t.push(
      -r,
      0,
      n,
      -r * 0.65,
      i,
      n,
      r * 0.65,
      i,
      n,
      r,
      0,
      n,
      r * 0.65,
      a,
      n,
      -r * 0.65,
      a,
      n,
    );
  for (let t = 0; t < e.length - 1; t++)
    for (let e = 0; e < 6; e++) {
      let r = t * 6 + e,
        i = t * 6 + ((e + 1) % 6),
        a = r + 6,
        o = i + 6;
      n.push(r, i, a, i, o, a);
    }
  for (let t = 1; t < 5; t++) {
    n.push(0, t + 1, t);
    let r = (e.length - 1) * 6;
    n.push(r, r + t, r + t + 1);
  }
  for (let e = 0; e < n.length; e += 3)
    [n[e + 1], n[e + 2]] = [n[e + 2], n[e + 1]];
  let r = new tr();
  return (
    r.setAttribute(`position`, new ct(t, 3)),
    r.setIndex(n),
    r.computeVertexNormals(),
    r
  );
}
