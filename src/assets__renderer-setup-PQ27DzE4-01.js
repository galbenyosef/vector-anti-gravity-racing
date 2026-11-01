// assets__renderer-setup-PQ27DzE4 01 — url
// Lines 1-338 of readable/assets__renderer-setup-PQ27DzE4.pretty.js (statement-aligned).
import {
  Da as e,
  Er as t,
  Qi as n,
  dn as r,
  ir as i,
  jr as a,
  kn as o,
  l as s,
  mn as c,
  pa as l,
  pn as u,
  zn as d,
} from "./index-DF2rMRzV.js";
import { t as ee } from "./HDRLoader-Bse-uZFj.js";
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
function m(e) {
  let t = new URLSearchParams(e).get(`envIntensity`),
    n = t === null || t.trim() === `` ? NaN : Number(t);
  return Number.isFinite(n) ? a.clamp(n, 0, 8) : 1;
}
function te(e, t = ``) {
  let n = f[e],
    r = m(t);
  return { ...n, intensity: n.intensity * r, skyIntensity: n.skyIntensity * r };
}
function ne(e, t) {
  let n = e instanceof Uint16Array,
    r = (t) => (n ? d.fromHalfFloat(e[t]) : e[t]),
    i = (t, r) => {
      e[t] = n ? d.toHalfFloat(r) : r;
    },
    a = 0,
    o = 0;
  for (let n = 0; n < e.length; n += 4) {
    let e = Math.max(r(n), r(n + 1), r(n + 2));
    if ((e > a && (a = e), !(e > t))) continue;
    let s = t / e;
    for (let e = 0; e < 3; e++) i(n + e, r(n + e) * s);
    o++;
  }
  return { peak: a, limited: o };
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
(r.BRDF_GGX, r.BRDF_Lambert, r.BasicPointShadowFilter, r.BasicShadowFilter);
var ie = r.Break;
(r.Const, r.Continue);
var ae = r.DFGLUT;
r.D_GGX;
var oe = r.Discard;
(r.EPSILON, r.F_Schlick);
var h = r.Fn;
r.INFINITY;
var se = r.If,
  ce = r.Loop;
(r.NodeAccess, r.NodeShaderStage, r.NodeType);
var le = r.NodeUpdateType;
(r.PCFShadowFilter, r.PCFSoftShadowFilter);
var ue = r.PI;
(r.PI2,
  r.TWO_PI,
  r.HALF_PI,
  r.PointShadowFilter,
  r.Return,
  r.Schlick_to_F0,
  r.ShaderNode,
  r.Stack,
  r.Switch,
  r.TBNViewMatrix,
  r.VSMShadowFilter,
  r.V_GGX_SmithCorrelated,
  r.Var,
  r.VarIntent);
var de = r.abs,
  fe = r.acesFilmicToneMapping,
  pe = r.acos;
r.acosh;
var me = r.add;
(r.addMethodChaining,
  r.addNodeElement,
  r.agxToneMapping,
  r.all,
  r.alphaT,
  r.ambientOcclusion,
  r.and,
  r.anisotropy,
  r.anisotropyB,
  r.anisotropyT,
  r.any,
  r.append,
  r.array);
var he = r.asin;
(r.asinh, r.assign);
var ge = r.atan;
(r.atanh,
  r.atomicAdd,
  r.atomicAnd,
  r.atomicFunc,
  r.atomicLoad,
  r.atomicMax,
  r.atomicMin,
  r.atomicOr,
  r.atomicStore,
  r.atomicSub,
  r.atomicXor,
  r.attenuationColor,
  r.attenuationDistance);
var g = r.attribute;
(r.attributeArray,
  r.backgroundBlurriness,
  r.backgroundIntensity,
  r.backgroundRotation,
  r.batch,
  r.bentNormalView,
  r.billboarding,
  r.bitAnd,
  r.bitNot,
  r.bitOr,
  r.bitXor,
  r.bitangentGeometry,
  r.bitangentLocal,
  r.bitangentView,
  r.bitangentWorld,
  r.bitcast,
  r.blendBurn,
  r.blendColor,
  r.blendDodge,
  r.blendOverlay,
  r.blendScreen,
  r.blur,
  r.bool);
var _ = r.buffer;
(r.bufferAttribute,
  r.bumpMap,
  r.builtin,
  r.builtinAOContext,
  r.builtinShadowContext,
  r.bvec2,
  r.bvec3,
  r.bvec4,
  r.bypass,
  r.cache,
  r.call,
  r.cameraFar,
  r.cameraIndex,
  r.cameraNear,
  r.cameraNormalMatrix);
var v = r.cameraPosition;
(r.cameraProjectionMatrix, r.cameraProjectionMatrixInverse);
var y = r.cameraViewMatrix;
(r.cameraViewport,
  r.cameraWorldMatrix,
  r.cbrt,
  r.cdl,
  r.ceil,
  r.checker,
  r.cineonToneMapping);
var b = r.clamp;
(r.clearcoat, r.clearcoatNormalView, r.clearcoatRoughness, r.clipSpace, r.code);
var x = r.color;
(r.colorSpaceToWorking,
  r.colorToDirection,
  r.compute,
  r.computeKernel,
  r.computeSkinning);
var S = r.context;
(r.convert, r.convertColorSpace);
var C = r.convertToTexture;
(r.countLeadingZeros, r.countOneBits, r.countTrailingZeros);
var w = r.cos;
r.cosh;
var T = r.cross;
(r.cubeTexture,
  r.cubeTextureBase,
  r.dFdx,
  r.dFdy,
  r.dashSize,
  r.debug,
  r.decrement,
  r.decrementBefore,
  r.defaultBuildStages,
  r.defaultShaderStages,
  r.defined,
  r.degrees,
  r.deltaTime,
  r.densityFog,
  r.densityFogFactor,
  r.depth,
  r.depthPass,
  r.determinant,
  r.difference,
  r.diffuseColor);
var E = r.directPointLight;
(r.directionToColor,
  r.directionToFaceDirection,
  r.dispersion,
  r.distance,
  r.div);
var D = r.dot;
(r.drawIndex,
  r.dynamicBufferAttribute,
  r.element,
  r.emissive,
  r.equal,
  r.equirectDirection,
  r.equirectUV);
var O = r.exp,
  k = r.exp2;
(r.exponentialHeightFogFactor,
  r.expression,
  r.faceDirection,
  r.faceForward,
  r.faceforward);
var A = r.float;
(r.floatBitsToInt, r.floatBitsToUint);
var j = r.floor;
r.fog;
var M = r.fract;
(r.frameGroup, r.frameId);
var N = r.frontFacing,
  P = r.fwidth;
(r.gain,
  r.gapSize,
  r.getConstNodeType,
  r.getCurrentStack,
  r.getDirection,
  r.getDistanceAttenuation,
  r.getGeometryRoughness,
  r.getNormalFromDepth);
var F = r.interleavedGradientNoise;
(r.vogelDiskSample, r.getParallaxCorrectNormal, r.getRoughness);
var I = r.getScreenPosition;
(r.getShIrradianceAt,
  r.getShadowMaterial,
  r.getShadowRenderObjectFunction,
  r.getTextureIndex);
var L = r.getViewPosition;
(r.globalId, r.glsl, r.glslFn, r.grayscale, r.greaterThan, r.greaterThanEqual);
var _e = r.hash;
(r.highpModelNormalViewMatrix,
  r.highpModelViewMatrix,
  r.hue,
  r.increment,
  r.incrementBefore,
  r.instance);
var ve = r.instanceIndex;
r.instancedArray;
var ye = r.instancedBufferAttribute;
(r.instancedDynamicBufferAttribute, r.instancedMesh);
var be = r.int;
(r.intBitsToFloat,
  r.inverse,
  r.inverseSqrt,
  r.inversesqrt,
  r.invocationLocalIndex,
  r.invocationSubgroupIndex,
  r.ior,
  r.iridescence,
  r.iridescenceIOR,
  r.iridescenceThickness);
var xe = r.ivec2;
(r.ivec3, r.ivec4, r.js, r.label);
var Se = r.length;
(r.lengthSq, r.lessThan, r.lessThanEqual, r.lightPosition, r.lightProjectionUV);
var Ce = r.lightShadowMatrix;
(r.lightTargetDirection,
  r.lightTargetPosition,
  r.lightViewPosition,
  r.lightingContext);
var we = r.lights;
(r.linearDepth,
  r.linearToneMapping,
  r.localId,
  r.log,
  r.log2,
  r.logarithmicDepthToViewZ);
var Te = r.luminance;
