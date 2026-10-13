// assets__renderer-setup--EktvnNe 01 — url
// Lines 1-338 of readable/assets__renderer-setup--EktvnNe.pretty.js (statement-aligned).
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
