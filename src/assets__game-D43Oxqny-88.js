// assets__game-D43Oxqny 88 — mul
// Lines 35625-35858 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function lC(e = !1, t = {}) {
  let n = e === `desert`;
  return uC(
    e === `metropolis`
      ? {
          FOG_HEIGHT: 40,
          FOG_FALLOFF: 0.012,
          FOG_DENSITY: 9e-4,
          FOG_COLOR: `#c9d2da`,
          SUN_SCATTERING_INTENSITY: sC,
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
            FOG_FALLOFF: n ? 0.008 : iC,
            FOG_DENSITY: e === !0 ? 85e-5 : n ? 0.00135 : aC,
            FOG_COLOR: e === !0 ? `#273c59` : n ? `#d4a4a0` : oC,
            SUN_SCATTERING_INTENSITY: e === !0 ? 0 : sC,
          },
    t,
  );
}
function uC(e, t) {
  let n = { ...e };
  for (let e of Object.keys(cC)) {
    let r = t[e];
    typeof r == `number` &&
      Number.isFinite(r) &&
      (n[e] = F.clamp(r, cC[e][0], cC[e][1]));
  }
  return (
    t.FOG_COLOR &&
      /^#[\da-f]{6}$/i.test(t.FOG_COLOR) &&
      (n.FOG_COLOR = t.FOG_COLOR),
    n
  );
}
function dC(e, t) {
  let n = new URLSearchParams(t),
    r = {};
  for (let e of Object.keys(cC)) {
    let t = n.get(e);
    t?.trim() && (r[e] = Number(t));
  }
  let i = n.get(`FOG_COLOR`);
  return (i && (r.FOG_COLOR = i.startsWith(`#`) ? i : `#${i}`), lC(e, r));
}
var fC = class {
  constructor(e, t) {
    ((this.distanceFog = e),
      (this.height = R(6)),
      (this.falloff = R(iC)),
      (this.density = R(aC)),
      (this.color = R(new j(oC))),
      (this.scatteringIntensity = R(sC)),
      (this.heightEnabled = R(1)),
      (this.distanceEnabled = R(1)),
      (this.settings = t),
      this.apply(t));
    let n = (e) => e.setGroup(zr),
      r = n(Wr(`near`, `float`, e)),
      i = n(Wr(`far`, `float`, e)),
      a = n(Wr(`color`, `color`, e));
    this.node = Hi(() => {
      let e = W.sub(Ur).toVar(),
        t = this.opticalDepth(Ur.y, W.y, e.length())
          .negate()
          .exp()
          .oneMinus()
          .mul(this.heightEnabled);
      return U(
        Y(Y(Ni.rgb, this.color, t), a, qi(r, i).mul(this.distanceEnabled)),
        Ni.a,
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
    return Hi(() => {
      let r = dr(e, t).toVar(),
        i = H(e, t).toVar(),
        a = i.sub(r).toVar(),
        o = this.height.sub(r).clamp(0, a).toVar(),
        s = i.sub(H(r, this.height)).max(0).toVar(),
        c = this.falloff.mul(s).toVar(),
        l = c
          .lessThan(0.001)
          .select(
            V(1).sub(c.mul(0.5)).add(c.mul(c).div(6)),
            c.negate().exp().oneMinus().div(H(c, 1e-4)),
          ),
        u = o
          .mul(this.density)
          .add(s.mul(this.densityAt(r)).mul(l))
          .div(H(a, 0.001));
      return n.mul(
        a.lessThan(0.001).select(this.densityAt(e.add(t).mul(0.5)), u),
      );
    })();
  }
  apply(e) {
    ((this.settings = uC(this.settings, e)),
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
function pC(e) {
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
function mC(e = 861) {
  return () => ((e = (e * 1664525 + 1013904223) >>> 0), e / 4294967296);
}
var hC = mC();
async function gC(e) {
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
function _C(e, t, n) {
  let r = document.createElement(`canvas`),
    i = Al(e, t, Un().mobile);
  ((r.width = i.width), (r.height = i.height));
  let a = r.getContext(`2d`);
  (a.scale(i.width / e, i.height / t), n(a));
  let o = new Zn(r);
  return ((o.colorSpace = Ee), o);
}
function vC(e) {
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
  let r = new Me();
  return (
    r.setAttribute(`position`, new N(t, 3)),
    r.setIndex(n),
    r.computeVertexNormals(),
    r
  );
}
