import {
  Ar as e,
  Ea as t,
  On as n,
  Rn as r,
  Tr as i,
  Zi as a,
  c as o,
  fa as s,
  fn as c,
  pn as l,
  rr as u,
  un as d,
} from "./index-DphGw8Ou.js";
import { t as ee } from "./HDRLoader-C77IBAVq.js";
var f = {
    day: {
      url: `environment/docklands_02_1k.hdr`,
      title: `Docklands 02`,
      intensity: 1,
      tunnelIntensity: 0.4,
      skyIntensity: 0.7,
      rotation: 167,
      maxRadiance: 8,
    },
    night: {
      url: `environment/shanghai_bund_1k.hdr`,
      title: `Shanghai Bund`,
      intensity: 0.08,
      tunnelIntensity: 0.613,
      skyIntensity: 0.62,
      rotation: -15,
      maxRadiance: 48,
    },
    desert: {
      url: ``,
      title: `Sirocco sky (procedural)`,
      intensity: 0.85,
      tunnelIntensity: 0.4,
      skyIntensity: 0.85,
      rotation: 0,
      maxRadiance: 8,
    },
    lunar: {
      url: ``,
      title: `Shackleton sky (procedural)`,
      intensity: 1,
      tunnelIntensity: 0.35,
      skyIntensity: 1,
      rotation: 0,
      maxRadiance: 8,
    },
    metropolis: {
      url: `environment/docklands_02_1k.hdr`,
      title: `Docklands 02 (Meridian)`,
      intensity: 1,
      tunnelIntensity: 0.45,
      skyIntensity: 0.7,
      rotation: -99,
      maxRadiance: 8,
    },
  },
  p = (e) =>
    e.scenery === `desert` ||
    e.scenery === `lunar` ||
    e.scenery === `metropolis`
      ? e.scenery
      : e.environment;
function m(t) {
  let n = new URLSearchParams(t).get(`envIntensity`),
    r = n === null || n.trim() === `` ? NaN : Number(n);
  return Number.isFinite(r) ? e.clamp(r, 0, 8) : 1;
}
function te(e, t = ``) {
  let n = f[e],
    r = m(t);
  return { ...n, intensity: n.intensity * r, skyIntensity: n.skyIntensity * r };
}
function ne(e, t) {
  let n = e instanceof Uint16Array,
    i = (t) => (n ? r.fromHalfFloat(e[t]) : e[t]),
    a = (t, i) => {
      e[t] = n ? r.toHalfFloat(i) : i;
    },
    o = 0,
    s = 0;
  for (let n = 0; n < e.length; n += 4) {
    let e = Math.max(i(n), i(n + 1), i(n + 2));
    if ((e > o && (o = e), !(e > t))) continue;
    let r = t / e;
    for (let e = 0; e < 3; e++) a(n + e, i(n + e) * r);
    s++;
  }
  return { peak: o, limited: s };
}
async function re(e) {
  if (!e.url) return null;
  let t = await new ee().loadAsync(new URL(e.url, document.baseURI).href);
  ((t.name = e.title), (t.mapping = 303));
  let { peak: n, limited: r } = ne(t.image.data, e.maxRadiance);
  return (
    (t.needsUpdate = !0),
    { texture: t, peakRadiance: n, limitedTexels: r }
  );
}
(d.BRDF_GGX, d.BRDF_Lambert, d.BasicPointShadowFilter, d.BasicShadowFilter);
var ie = d.Break;
(d.Const, d.Continue);
var ae = d.DFGLUT;
d.D_GGX;
var oe = d.Discard;
(d.EPSILON, d.F_Schlick);
var h = d.Fn;
d.INFINITY;
var se = d.If,
  ce = d.Loop;
(d.NodeAccess, d.NodeShaderStage, d.NodeType);
var le = d.NodeUpdateType;
(d.PCFShadowFilter, d.PCFSoftShadowFilter);
var ue = d.PI;
(d.PI2,
  d.TWO_PI,
  d.HALF_PI,
  d.PointShadowFilter,
  d.Return,
  d.Schlick_to_F0,
  d.ShaderNode,
  d.Stack,
  d.Switch,
  d.TBNViewMatrix,
  d.VSMShadowFilter,
  d.V_GGX_SmithCorrelated,
  d.Var,
  d.VarIntent);
var de = d.abs,
  fe = d.acesFilmicToneMapping,
  pe = d.acos;
d.acosh;
var me = d.add;
(d.addMethodChaining,
  d.addNodeElement,
  d.agxToneMapping,
  d.all,
  d.alphaT,
  d.ambientOcclusion,
  d.and,
  d.anisotropy,
  d.anisotropyB,
  d.anisotropyT,
  d.any,
  d.append,
  d.array);
var he = d.asin;
(d.asinh, d.assign);
var ge = d.atan;
(d.atanh,
  d.atomicAdd,
  d.atomicAnd,
  d.atomicFunc,
  d.atomicLoad,
  d.atomicMax,
  d.atomicMin,
  d.atomicOr,
  d.atomicStore,
  d.atomicSub,
  d.atomicXor,
  d.attenuationColor,
  d.attenuationDistance);
var g = d.attribute;
(d.attributeArray,
  d.backgroundBlurriness,
  d.backgroundIntensity,
  d.backgroundRotation,
  d.batch,
  d.bentNormalView,
  d.billboarding,
  d.bitAnd,
  d.bitNot,
  d.bitOr,
  d.bitXor,
  d.bitangentGeometry,
  d.bitangentLocal,
  d.bitangentView,
  d.bitangentWorld,
  d.bitcast,
  d.blendBurn,
  d.blendColor,
  d.blendDodge,
  d.blendOverlay,
  d.blendScreen,
  d.blur,
  d.bool);
var _ = d.buffer;
(d.bufferAttribute,
  d.bumpMap,
  d.builtin,
  d.builtinAOContext,
  d.builtinShadowContext,
  d.bvec2,
  d.bvec3,
  d.bvec4,
  d.bypass,
  d.cache,
  d.call,
  d.cameraFar,
  d.cameraIndex,
  d.cameraNear,
  d.cameraNormalMatrix);
var v = d.cameraPosition;
(d.cameraProjectionMatrix, d.cameraProjectionMatrixInverse);
var y = d.cameraViewMatrix;
(d.cameraViewport,
  d.cameraWorldMatrix,
  d.cbrt,
  d.cdl,
  d.ceil,
  d.checker,
  d.cineonToneMapping);
var b = d.clamp;
(d.clearcoat, d.clearcoatNormalView, d.clearcoatRoughness, d.clipSpace, d.code);
var x = d.color;
(d.colorSpaceToWorking,
  d.colorToDirection,
  d.compute,
  d.computeKernel,
  d.computeSkinning);
var S = d.context;
(d.convert, d.convertColorSpace);
var C = d.convertToTexture;
(d.countLeadingZeros, d.countOneBits, d.countTrailingZeros);
var w = d.cos;
d.cosh;
var T = d.cross;
(d.cubeTexture,
  d.cubeTextureBase,
  d.dFdx,
  d.dFdy,
  d.dashSize,
  d.debug,
  d.decrement,
  d.decrementBefore,
  d.defaultBuildStages,
  d.defaultShaderStages,
  d.defined,
  d.degrees,
  d.deltaTime,
  d.densityFog,
  d.densityFogFactor,
  d.depth,
  d.depthPass,
  d.determinant,
  d.difference,
  d.diffuseColor);
var E = d.directPointLight;
(d.directionToColor,
  d.directionToFaceDirection,
  d.dispersion,
  d.distance,
  d.div);
var D = d.dot;
(d.drawIndex,
  d.dynamicBufferAttribute,
  d.element,
  d.emissive,
  d.equal,
  d.equirectDirection,
  d.equirectUV);
var O = d.exp,
  k = d.exp2;
(d.exponentialHeightFogFactor,
  d.expression,
  d.faceDirection,
  d.faceForward,
  d.faceforward);
var A = d.float;
(d.floatBitsToInt, d.floatBitsToUint);
var j = d.floor;
d.fog;
var M = d.fract;
(d.frameGroup, d.frameId);
var N = d.frontFacing,
  P = d.fwidth;
(d.gain,
  d.gapSize,
  d.getConstNodeType,
  d.getCurrentStack,
  d.getDirection,
  d.getDistanceAttenuation,
  d.getGeometryRoughness,
  d.getNormalFromDepth);
var F = d.interleavedGradientNoise;
(d.vogelDiskSample, d.getParallaxCorrectNormal, d.getRoughness);
var I = d.getScreenPosition;
(d.getShIrradianceAt,
  d.getShadowMaterial,
  d.getShadowRenderObjectFunction,
  d.getTextureIndex);
var L = d.getViewPosition;
(d.globalId, d.glsl, d.glslFn, d.grayscale, d.greaterThan, d.greaterThanEqual);
var _e = d.hash;
(d.highpModelNormalViewMatrix,
  d.highpModelViewMatrix,
  d.hue,
  d.increment,
  d.incrementBefore,
  d.instance);
var ve = d.instanceIndex;
d.instancedArray;
var ye = d.instancedBufferAttribute;
(d.instancedDynamicBufferAttribute, d.instancedMesh);
var be = d.int;
(d.intBitsToFloat,
  d.inverse,
  d.inverseSqrt,
  d.inversesqrt,
  d.invocationLocalIndex,
  d.invocationSubgroupIndex,
  d.ior,
  d.iridescence,
  d.iridescenceIOR,
  d.iridescenceThickness);
var xe = d.ivec2;
(d.ivec3, d.ivec4, d.js, d.label);
var Se = d.length;
(d.lengthSq, d.lessThan, d.lessThanEqual, d.lightPosition, d.lightProjectionUV);
var Ce = d.lightShadowMatrix;
(d.lightTargetDirection,
  d.lightTargetPosition,
  d.lightViewPosition,
  d.lightingContext);
var we = d.lights;
(d.linearDepth,
  d.linearToneMapping,
  d.localId,
  d.log,
  d.log2,
  d.logarithmicDepthToViewZ);
var Te = d.luminance;
(d.mat2,
  d.mat3,
  d.mat4,
  d.matcapUV,
  d.materialAO,
  d.materialAlphaTest,
  d.materialAnisotropy,
  d.materialAnisotropyVector,
  d.materialAttenuationColor,
  d.materialAttenuationDistance,
  d.materialClearcoat,
  d.materialClearcoatNormal,
  d.materialClearcoatRoughness,
  d.materialColor,
  d.materialDispersion,
  d.materialEmissive,
  d.materialEnvIntensity,
  d.materialEnvRotation,
  d.materialIOR,
  d.materialIridescence,
  d.materialIridescenceIOR,
  d.materialIridescenceThickness,
  d.materialLightMap,
  d.materialLineDashOffset,
  d.materialLineDashSize,
  d.materialLineGapSize,
  d.materialLineScale,
  d.materialLineWidth,
  d.materialMetalness,
  d.materialNormal,
  d.materialOpacity,
  d.materialPointSize,
  d.materialReference,
  d.materialReflectivity,
  d.materialRefractionRatio,
  d.materialRotation);
var Ee = d.materialRoughness;
(d.materialSheen,
  d.materialSheenRoughness,
  d.materialShininess,
  d.materialSpecular,
  d.materialSpecularColor,
  d.materialSpecularIntensity,
  d.materialSpecularStrength,
  d.materialThickness,
  d.materialTransmission);
var R = d.max;
(d.maxMipLevel, d.mediumpModelViewMatrix, d.metalness);
var De = d.min,
  z = d.mix;
d.mixElement;
var Oe = d.mod;
(d.modelDirection,
  d.modelNormalMatrix,
  d.modelPosition,
  d.modelRadius,
  d.modelScale,
  d.modelViewMatrix,
  d.modelViewPosition);
var ke = d.modelViewProjection;
(d.modelWorldMatrix,
  d.modelWorldMatrixInverse,
  d.morphReference,
  d.mrt,
  d.mul,
  d.mx_aastep,
  d.mx_add,
  d.mx_atan2,
  d.mx_cell_noise_float,
  d.mx_contrast,
  d.mx_divide,
  d.mx_fractal_noise_float,
  d.mx_fractal_noise_vec2,
  d.mx_fractal_noise_vec3,
  d.mx_fractal_noise_vec4,
  d.mx_frame,
  d.mx_heighttonormal,
  d.mx_hsvtorgb,
  d.mx_ifequal,
  d.mx_ifgreater,
  d.mx_ifgreatereq,
  d.mx_invert,
  d.mx_modulo,
  d.mx_multiply);
var Ae = d.mx_noise_float;
(d.mx_noise_vec3,
  d.mx_noise_vec4,
  d.mx_place2d,
  d.mx_power,
  d.mx_ramp4,
  d.mx_ramplr,
  d.mx_ramptb,
  d.mx_rgbtohsv,
  d.mx_rotate2d,
  d.mx_rotate3d,
  d.mx_safepower,
  d.mx_separate,
  d.mx_splitlr,
  d.mx_splittb,
  d.mx_srgb_texture_to_lin_rec709,
  d.mx_subtract,
  d.mx_timer,
  d.mx_transform_uv,
  d.mx_unifiednoise2d,
  d.mx_unifiednoise3d);
var je = d.mx_worley_noise_float;
(d.mx_worley_noise_vec2,
  d.mx_worley_noise_vec3,
  d.negate,
  d.negateOnBackSide,
  d.neutralToneMapping,
  d.nodeArray,
  d.nodeImmutable);
var Me = d.nodeObject;
(d.nodeObjectIntent,
  d.nodeObjects,
  d.nodeProxy,
  d.nodeProxyIntent,
  d.normalFlat);
var Ne = d.normalGeometry,
  Pe = d.normalLocal,
  Fe = d.normalMap,
  Ie = d.normalView;
d.normalViewGeometry;
var Le = d.normalWorld,
  Re = d.normalWorldGeometry,
  ze = d.normalize;
(d.not,
  d.notEqual,
  d.numWorkgroups,
  d.objectDirection,
  d.objectGroup,
  d.objectPosition,
  d.objectRadius,
  d.objectScale,
  d.objectViewPosition,
  d.objectWorldMatrix,
  d.OnBeforeObjectUpdate,
  d.OnBeforeMaterialUpdate,
  d.OnObjectUpdate,
  d.OnMaterialUpdate,
  d.oneMinus,
  d.or,
  d.orthographicDepthToViewZ,
  d.oscSawtooth,
  d.oscSine,
  d.oscSquare,
  d.oscTriangle);
var Be = d.output;
(d.outputStruct,
  d.overloadingFn,
  d.overrideNode,
  d.overrideNodes,
  d.packHalf2x16,
  d.packSnorm2x16,
  d.packUnorm2x16,
  d.packNormalToRGB,
  d.parabola,
  d.parallaxDirection,
  d.parallaxUV,
  d.parameter);
var Ve = d.pass,
  He = d.passTexture;
d.pcurve;
var Ue = d.perspectiveDepthToViewZ,
  We = d.pmremTexture;
(d.pointShadow, d.pointUV, d.pointWidth);
var Ge = d.positionGeometry,
  Ke = d.positionLocal;
d.positionPrevious;
var qe = d.positionView,
  Je = d.positionViewDirection,
  Ye = d.positionWorld;
(d.positionWorldDirection, d.posterize);
var Xe = d.pow;
(d.pow2,
  d.pow3,
  d.pow4,
  d.premultiplyAlpha,
  d.property,
  d.radians,
  d.rand,
  d.range,
  d.rangeFog);
var Ze = d.rangeFogFactor;
d.reciprocal;
var Qe = d.reference;
(d.referenceBuffer, d.reflect);
var $e = d.reflectVector;
d.reflectView;
var et = d.reflector;
(d.refract,
  d.refractVector,
  d.refractView,
  d.reinhardToneMapping,
  d.remap,
  d.remapClamp);
var tt = d.renderGroup,
  nt = d.renderOutput;
(d.rendererReference,
  d.replaceDefaultUV,
  d.rotate,
  d.rotateUV,
  d.roughness,
  d.round);
var rt = d.rtt;
(d.sRGBTransferEOTF,
  d.sRGBTransferOETF,
  d.sample,
  d.sampler,
  d.samplerComparison);
var it = d.saturate;
(d.saturation, d.screen);
var at = d.screenCoordinate;
(d.screenDPR, d.screenSize);
var ot = d.screenUV,
  st = d.select;
(d.setCurrentStack, d.setName, d.shaderStages);
var ct = d.shadow,
  lt = d.shadowPositionWorld;
(d.shapeCircle,
  d.sharedUniformGroup,
  d.sheen,
  d.sheenRoughness,
  d.shiftLeft,
  d.shiftRight,
  d.shininess);
var ut = d.sign,
  dt = d.sin;
(d.sinh, d.sinc, d.skinning);
var B = d.smoothstep;
(d.smoothstepElement,
  d.specularColor,
  d.specularF90,
  d.spherizeUV,
  d.split,
  d.spritesheetUV);
var V = d.sqrt;
d.stack;
var ft = d.step;
(d.stepElement,
  d.storage,
  d.storageBarrier,
  d.storageTexture,
  d.storageTexture3D,
  d.struct,
  d.sub,
  d.subgroupAdd,
  d.subgroupAll,
  d.subgroupAnd,
  d.subgroupAny,
  d.subgroupBallot,
  d.subgroupBroadcast,
  d.subgroupBroadcastFirst,
  d.subBuild,
  d.subgroupElect,
  d.subgroupExclusiveAdd,
  d.subgroupExclusiveMul,
  d.subgroupInclusiveAdd,
  d.subgroupInclusiveMul,
  d.subgroupIndex,
  d.subgroupMax,
  d.subgroupMin,
  d.subgroupMul,
  d.subgroupOr,
  d.subgroupShuffle,
  d.subgroupShuffleDown,
  d.subgroupShuffleUp,
  d.subgroupShuffleXor,
  d.subgroupSize,
  d.subgroupXor,
  d.tan,
  d.tanh,
  d.tangentGeometry,
  d.tangentLocal,
  d.tangentView,
  d.tangentWorld);
var pt = d.texture;
(d.texture3D,
  d.textureBarrier,
  d.textureBicubic,
  d.textureBicubicLevel,
  d.textureCubeUV);
var mt = d.textureLoad;
(d.textureSize,
  d.textureLevel,
  d.textureStore,
  d.thickness,
  d.time,
  d.toneMapping,
  d.toneMappingExposure,
  d.toonOutlinePass,
  d.transformDirection,
  d.transformNormal,
  d.transformNormalByInverseViewMatrix,
  d.transformNormalByViewMatrix);
var ht = d.transformNormalToView;
(d.transformedClearcoatNormalView,
  d.transformedNormalView,
  d.transformedNormalWorld,
  d.transmission,
  d.transpose,
  d.triNoise3D,
  d.triplanarTexture,
  d.triplanarTextures,
  d.trunc,
  d.uint,
  d.uintBitsToFloat);
var gt = d.uniform,
  _t = d.uniformArray;
(d.uniformCubeTexture,
  d.uniformGroup,
  d.uniformFlow,
  d.uniformTexture,
  d.unpackHalf2x16,
  d.unpackSnorm2x16,
  d.unpackUnorm2x16,
  d.unpackRGBToNormal,
  d.unpremultiplyAlpha,
  d.userData);
var vt = d.uv;
(d.uvec2, d.uvec3, d.uvec4);
var yt = d.varying,
  bt = d.varyingProperty,
  xt = d.vec2,
  H = d.vec3,
  St = d.vec4;
(d.vectorComponents,
  d.velocity,
  d.vertexColor,
  d.vertexIndex,
  d.vertexStage,
  d.vibrance,
  d.viewZToLogarithmicDepth,
  d.viewZToOrthographicDepth,
  d.viewZToPerspectiveDepth,
  d.viewZToReversedOrthographicDepth,
  d.viewZToReversedPerspectiveDepth,
  d.viewport,
  d.viewportCoordinate,
  d.viewportDepthTexture,
  d.viewportLinearDepth,
  d.viewportMipTexture,
  d.viewportOpaqueMipTexture,
  d.viewportResolution,
  d.viewportSafeUV,
  d.viewportSharedTexture,
  d.viewportSize,
  d.viewportTexture,
  d.viewportUV,
  d.wgsl,
  d.wgslFn,
  d.workgroupArray,
  d.workgroupBarrier,
  d.workgroupId,
  d.workingToColorSpace,
  d.xor);
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
    workingColorSpace: i,
    outputColorSpace: a,
    toneMapping: 5,
    exposure: 1,
    hdrBufferType: u,
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
  ((n.enabled = !0),
    (n.workingColorSpace = G.workingColorSpace),
    (e.outputColorSpace = G.outputColorSpace));
  let r = Ct(t);
  (e.library.addToneMapping(Et.get(r), 5),
    (e.toneMapping = G.toneMapping),
    (e.toneMappingExposure = G.exposure),
    J.set(e, r));
}
var Ot = class extends l {
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
            ? o(e)
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
var X = new t();
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
    Z = t instanceof s ? t : null;
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
    r = new Set(),
    i = 0,
    a = (e, r, a) => {
      for (let o of r) {
        let r = e[o];
        r instanceof s &&
          (i++,
          (n.getTransfer(r.colorSpace) === `srgb`) !== a &&
            t.add(
              `${e.name || e.type}.${o}: ${r.name || `texture`} is ${r.colorSpace || `no colour space`}`,
            ));
      }
    };
  return (
    e.traverse((e) => {
      let t = e.material;
      if (t)
        for (let e of Array.isArray(t) ? t : [t])
          r.has(e) || (r.add(e), a(e, Pt, !0), a(e, Ft, !1));
    }),
    { checked: i, issues: [...t] }
  );
}
function Lt(e, t) {
  let r = J.get(e) ?? K;
  return {
    workingColorSpace: n.workingColorSpace,
    outputColorSpace: e.outputColorSpace,
    toneMapping: e.toneMapping === 5 ? `aces-filmic-graded` : e.toneMapping,
    exposure: +e.toneMappingExposure.toFixed(3),
    grade: {
      id: r.id,
      name: r.name,
      blackPoint: r.blackPoint,
      contrast: r.contrast,
      saturation: r.saturation,
      shadowBalance: [...r.shadowBalance],
      highlightBalance: [...r.highlightBalance],
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
  let n = c.prototype,
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
export {
  De as $,
  f as $t,
  E as A,
  rt as At,
  L as B,
  V as Bt,
  y as C,
  Xe as Ct,
  C as D,
  et as Dt,
  S as E,
  $e as Et,
  j as F,
  ct as Ft,
  F as G,
  gt as Gt,
  ve as H,
  pt as Ht,
  M as I,
  lt as It,
  Ce as J,
  yt as Jt,
  xe as K,
  _t as Kt,
  N as L,
  ut as Lt,
  O as M,
  at as Mt,
  k as N,
  ot as Nt,
  w as O,
  tt as Ot,
  A as P,
  st as Pt,
  R as Q,
  St as Qt,
  P as R,
  dt as Rt,
  v as S,
  Ye as St,
  x as T,
  Qe as Tt,
  ye as U,
  mt as Ut,
  _e as V,
  ft as Vt,
  be as W,
  ht as Wt,
  Te as X,
  xt as Xt,
  we as Y,
  bt as Yt,
  Ee as Z,
  H as Zt,
  me as _,
  We as _t,
  Rt as a,
  Me as at,
  g as b,
  qe as bt,
  ie as c,
  Fe as ct,
  se as d,
  Re as dt,
  p as en,
  z as et,
  ce as f,
  ze as ft,
  pe as g,
  Ue as gt,
  de as h,
  He as ht,
  Q as i,
  je as it,
  D as j,
  it as jt,
  T as k,
  nt as kt,
  oe as l,
  Ie as lt,
  ue as m,
  Ve as mt,
  Lt as n,
  re as nn,
  ke as nt,
  jt as o,
  Ne as ot,
  le as p,
  Be as pt,
  Se as q,
  vt as qt,
  kt as r,
  Ae as rt,
  Mt as s,
  Pe as st,
  G as t,
  te as tn,
  Oe as tt,
  h as u,
  Le as ut,
  he as v,
  Ge as vt,
  b as w,
  Ze as wt,
  _ as x,
  Je as xt,
  ge as y,
  Ke as yt,
  I as z,
  B as zt,
};
