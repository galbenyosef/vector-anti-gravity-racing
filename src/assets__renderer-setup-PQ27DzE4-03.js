// assets__renderer-setup-PQ27DzE4 03 — highlightbalance
// Lines 666-983 of readable/assets__renderer-setup-PQ27DzE4.pretty.js (statement-aligned).
(r.vectorComponents,
  r.velocity,
  r.vertexColor,
  r.vertexIndex,
  r.vertexStage,
  r.vibrance,
  r.viewZToLogarithmicDepth,
  r.viewZToOrthographicDepth,
  r.viewZToPerspectiveDepth,
  r.viewZToReversedOrthographicDepth,
  r.viewZToReversedPerspectiveDepth,
  r.viewport,
  r.viewportCoordinate,
  r.viewportDepthTexture,
  r.viewportLinearDepth,
  r.viewportMipTexture,
  r.viewportOpaqueMipTexture,
  r.viewportResolution,
  r.viewportSafeUV,
  r.viewportSharedTexture,
  r.viewportSize,
  r.viewportTexture,
  r.viewportUV,
  r.wgsl,
  r.wgslFn,
  r.workgroupArray,
  r.workgroupBarrier,
  r.workgroupId,
  r.workingToColorSpace,
  r.xor);
var U = (e) =>
    Object.freeze({
      ...e,
      shadowBalance: Object.freeze([...e.shadowBalance]),
      highlightBalance: Object.freeze([...e.highlightBalance]),
    }),
  W = Object.freeze({
    coastal: U({
      id: `coastal-day`,
      name: `Coastal clarity`,
      blackPoint: 0.015,
      contrast: 0.24,
      saturation: 1.1,
      shadowBalance: [0.965, 0.985, 1],
      highlightBalance: [1, 0.99, 0.965],
    }),
    neon: U({
      id: `neon-night`,
      name: `Violet / cyan neon`,
      blackPoint: 0.01,
      contrast: 0.2,
      saturation: 1.12,
      shadowBalance: [0.965, 0.925, 1],
      highlightBalance: [0.94, 1, 1],
    }),
    sunset: U({
      id: `amber-sunset`,
      name: `Amber sunset / plum shadows`,
      blackPoint: 0.012,
      contrast: 0.23,
      saturation: 1.12,
      shadowBalance: [0.97, 0.92, 1],
      highlightBalance: [1, 0.955, 0.875],
    }),
    lunar: U({
      id: `lunar-vacuum`,
      name: `Vacuum black / steel white`,
      blackPoint: 0.016,
      contrast: 0.29,
      saturation: 1.04,
      shadowBalance: [0.955, 0.98, 1],
      highlightBalance: [1, 0.985, 0.955],
    }),
    metropolis: U({
      id: `grand-prix-morning`,
      name: `Cobalt morning / champagne highlights`,
      blackPoint: 0.013,
      contrast: 0.25,
      saturation: 1.13,
      shadowBalance: [0.95, 0.975, 1],
      highlightBalance: [1, 0.985, 0.94],
    }),
  });
function Ct(e) {
  let t = typeof e == `string` ? e : e?.id;
  return t === `nocturne-exchange`
    ? W.neon
    : t === `sirocco-oasis`
      ? W.sunset
      : t === `shackleton-rim`
        ? W.lunar
        : t === `meridian-grand-prix`
          ? W.metropolis
          : W.coastal;
}
var G = {
    workingColorSpace: t,
    outputColorSpace: n,
    toneMapping: 5,
    exposure: 1,
    hdrBufferType: i,
  },
  K = W.coastal,
  wt = [0.2126, 0.7152, 0.0722];
function q(e) {
  return h(([t, n]) => {
    let {
        blackPoint: r,
        contrast: i,
        saturation: a,
        shadowBalance: o,
        highlightBalance: s,
      } = e,
      c = V(R(fe(t, n), H(0)))
        .sub(r)
        .div(1 - r)
        .clamp(0, 1)
        .toVar();
    c.assign(z(c, c.mul(c).mul(c.mul(-2).add(3)), i));
    let l = D(c, H(...wt)),
      u = z(H(...o), H(...s), B(0, 1, l)),
      d = R(z(H(l), c, a), H(0))
        .mul(u)
        .clamp(0, 1);
    return d.mul(d);
  }).setLayout({
    name: `vectorToneMapping_${e.id.replaceAll(`-`, `_`)}`,
    type: `vec3`,
    inputs: [
      { name: `color`, type: `vec3` },
      { name: `exposure`, type: `float` },
    ],
  });
}
var Tt = q(K),
  Et = new Map([
    [W.coastal, Tt],
    [W.neon, q(W.neon)],
    [W.sunset, q(W.sunset)],
    [W.lunar, q(W.lunar)],
    [W.metropolis, q(W.metropolis)],
  ]),
  J = new WeakMap();
function Dt(e, t) {
  ((o.enabled = !0),
    (o.workingColorSpace = G.workingColorSpace),
    (e.outputColorSpace = G.outputColorSpace));
  let n = Ct(t);
  (e.library.addToneMapping(Et.get(n), 5),
    (e.toneMapping = G.toneMapping),
    (e.toneMappingExposure = G.exposure),
    J.set(e, n));
}
var Ot = class extends c {
  get currentSamples() {
    return this.getRenderTarget() === null ? 0 : super.currentSamples;
  }
};
function kt({ forceWebGL: e, circuit: t }) {
  let n = new Ot({
    antialias: !0,
    alpha: !1,
    powerPreference: `high-performance`,
    forceWebGL: e,
    outputBufferType: G.hdrBufferType,
  });
  return (
    Dt(n, t),
    At(n, e),
    (n.shadowMap.enabled = !0),
    (n.shadowMap.type = 2),
    n
  );
}
var Y = new WeakMap();
function At(e, t) {
  let n = {
    requested: t ? `WEBGL 2` : `WEBGPU`,
    secureContext: globalThis.isSecureContext === !0,
    webGPUAvailable: typeof navigator < `u` && `gpu` in navigator,
    fallbackReason: ``,
  };
  if ((Y.set(e, n), t)) return;
  let r = e.backend,
    i = r.init;
  r.init = async function (e) {
    try {
      await i.call(this, e);
    } catch (e) {
      throw (
        (n.fallbackReason = n.secureContext
          ? n.webGPUAvailable
            ? s(e)
            : `This browser does not expose WebGPU.`
          : `WebGPU requires a secure context (HTTPS or localhost).`),
        e
      );
    } finally {
      r.init = i;
    }
  };
}
function jt(e) {
  let t = Y.get(e);
  return t ? { ...t } : null;
}
var X = new e();
function Mt(e, t, n, r) {
  return (
    e.getSize(X),
    X.x === t && X.y === n && e.getPixelRatio() === r
      ? !1
      : (e.setDrawingBufferSize(t, n, r), !0)
  );
}
var Z;
function Nt() {
  if (Z === void 0) {
    let e = ae.shaderNode?.jsFunc,
      t = e?.({ roughness: A(0), dotNV: A(0) })?.node?.value;
    Z = t instanceof l ? t : null;
  }
  return Z;
}
function Q(e) {
  let t = e._frameBufferTargets;
  for (let e of t?.values() ?? []) (e.texture.dispose(), e.dispose());
  let n = Nt();
  (n && e._textures?._destroyTexture(n), e.dispose());
}
var Pt = [`map`, `emissiveMap`, `specularColorMap`, `sheenColorMap`],
  Ft = [
    `normalMap`,
    `clearcoatNormalMap`,
    `bumpMap`,
    `displacementMap`,
    `roughnessMap`,
    `metalnessMap`,
    `aoMap`,
    `alphaMap`,
    `clearcoatMap`,
    `clearcoatRoughnessMap`,
    `sheenRoughnessMap`,
    `specularIntensityMap`,
    `transmissionMap`,
    `thicknessMap`,
    `iridescenceMap`,
    `iridescenceThicknessMap`,
    `anisotropyMap`,
  ];
function It(e) {
  let t = new Set(),
    n = new Set(),
    r = 0,
    i = (e, n, i) => {
      for (let a of n) {
        let n = e[a];
        n instanceof l &&
          (r++,
          (o.getTransfer(n.colorSpace) === `srgb`) !== i &&
            t.add(
              `${e.name || e.type}.${a}: ${n.name || `texture`} is ${n.colorSpace || `no colour space`}`,
            ));
      }
    };
  return (
    e.traverse((e) => {
      let t = e.material;
      if (t)
        for (let e of Array.isArray(t) ? t : [t])
          n.has(e) || (n.add(e), i(e, Pt, !0), i(e, Ft, !1));
    }),
    { checked: r, issues: [...t] }
  );
}
function Lt(e, t) {
  let n = J.get(e) ?? K;
  return {
    workingColorSpace: o.workingColorSpace,
    outputColorSpace: e.outputColorSpace,
    toneMapping: e.toneMapping === 5 ? `aces-filmic-graded` : e.toneMapping,
    exposure: +e.toneMappingExposure.toFixed(3),
    grade: {
      id: n.id,
      name: n.name,
      blackPoint: n.blackPoint,
      contrast: n.contrast,
      saturation: n.saturation,
      shadowBalance: [...n.shadowBalance],
      highlightBalance: [...n.highlightBalance],
    },
    hdrBuffer:
      e.getOutputBufferType() === 1016 ? `half-float` : e.getOutputBufferType(),
    textures: It(t),
  };
}
var $ = `diagnostic( off, derivative_uniformity );`;
async function Rt(e) {
  let t = e.backend.device;
  if (!t || !/\bFirefox\//.test(navigator.userAgent)) return !1;
  let n = u.prototype,
    r = n._getWGSLFragmentCode;
  return r.name === `relaxedFragmentCode`
    ? !0
    : (
          await t
            .createShaderModule({
              code: `${$}\n@fragment fn main() -> @location(0) vec4f { return vec4f(1.0); }`,
            })
            .getCompilationInfo()
        ).messages.some((e) => e.type === `error`)
      ? !1
      : ((n._getWGSLFragmentCode = function (e) {
          let t = r.call(this, e);
          return t.includes($) ? t : `${$}\n${t}`;
        }),
        !0);
}
