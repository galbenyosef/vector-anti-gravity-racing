// assets__index-DphGw8Ou 13 — quality
// Lines 72724-73026 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
var dZ = {
    preset: `high`,
    resolution: { scale: 1, maxDpr: 1.6, maxPixels: 3e6 },
    shadows: { quality: `high`, mapSize: 2048 },
    ambientOcclusion: {
      quality: `high`,
      intensity: 1.25,
      radius: 2,
      resolution: 0.5,
    },
    reflections: { mode: `local`, intensity: 1 },
    bloom: {
      enabled: !0,
      strength: 0.3,
      radius: 0.6,
      threshold: 1.05,
      resolution: 0.5,
    },
    atmosphere: {
      heightFog: !0,
      distanceFog: !0,
      scattering: !0,
      scatteringIntensity: 0.35,
      scatteringResolution: 0.25,
      scatteringSteps: 16,
    },
    particles: { ambientDensity: 1, impactDensity: 1 },
    antiAliasing: `msaa-smaa`,
    textureFiltering: { anisotropy: 8 },
    postProcessing: { quality: `high`, speedBlur: !0 },
  },
  fZ = (e) => JSON.parse(JSON.stringify(e)),
  pZ = {
    low: {
      ...fZ(dZ),
      preset: `low`,
      resolution: { scale: 1, maxDpr: 1, maxPixels: 18e5 },
      shadows: { quality: `off`, mapSize: 1024 },
      ambientOcclusion: { ...dZ.ambientOcclusion, quality: `off` },
      reflections: { mode: `environment`, intensity: 1 },
      bloom: { ...dZ.bloom, enabled: !1 },
      atmosphere: { ...dZ.atmosphere, scattering: !1 },
      particles: { ambientDensity: 0.25, impactDensity: 0.5 },
      antiAliasing: `msaa`,
      textureFiltering: { anisotropy: 8 },
      postProcessing: { quality: `off`, speedBlur: !1 },
    },
    medium: {
      ...fZ(dZ),
      preset: `medium`,
      resolution: { scale: 1, maxDpr: 1.25, maxPixels: 24e5 },
      shadows: { quality: `medium`, mapSize: 1024 },
      ambientOcclusion: { ...dZ.ambientOcclusion, quality: `low` },
      reflections: { mode: `environment`, intensity: 1 },
      atmosphere: {
        ...dZ.atmosphere,
        scatteringResolution: 0.125,
        scatteringSteps: 8,
      },
      particles: { ambientDensity: 0.5, impactDensity: 0.75 },
      antiAliasing: `msaa`,
      textureFiltering: { anisotropy: 4 },
      postProcessing: { quality: `low`, speedBlur: !0 },
    },
    high: dZ,
    ultra: {
      ...fZ(dZ),
      preset: `ultra`,
      resolution: { scale: 1, maxDpr: 2, maxPixels: 5e6 },
      shadows: { quality: `ultra`, mapSize: 2048 },
      ambientOcclusion: {
        ...dZ.ambientOcclusion,
        quality: `ultra`,
        resolution: 0.75,
      },
      atmosphere: {
        ...dZ.atmosphere,
        scatteringResolution: 0.5,
        scatteringSteps: 24,
      },
      textureFiltering: { anisotropy: 16 },
    },
  };
function mZ(e) {
  return fZ(pZ[e]);
}
var hZ = [`off`, `low`, `medium`, `high`, `ultra`],
  gZ = (e) => (e && typeof e == `object` && !Array.isArray(e) ? e : {});
function _Z(e, t = dZ) {
  let n = gZ(e),
    r = fZ(t);
  for (let e of Object.keys(r))
    if (typeof r[e] == `object`) {
      let t = gZ(n[e]),
        i = r[e];
      for (let e of Object.keys(i)) {
        let n = t[e];
        typeof n == typeof i[e] &&
          (typeof n != `number` || Number.isFinite(n)) &&
          (i[e] = n);
      }
    } else typeof n[e] == `string` && (r[e] = n[e]);
  let i = (e, t, n) => (t.includes(e) ? e : n),
    a = (e, t, n) => Math.min(n, Math.max(t, e));
  return (
    (r.preset = i(r.preset, [`low`, `medium`, `high`, `ultra`], t.preset)),
    (r.shadows.quality = i(r.shadows.quality, hZ, t.shadows.quality)),
    (r.shadows.mapSize = i(
      r.shadows.mapSize,
      [512, 1024, 2048, 4096],
      t.shadows.mapSize,
    )),
    (r.ambientOcclusion.quality = i(
      r.ambientOcclusion.quality,
      hZ,
      t.ambientOcclusion.quality,
    )),
    (r.reflections.mode = i(
      r.reflections.mode,
      [`environment`, `local`],
      t.reflections.mode,
    )),
    (r.antiAliasing = i(
      r.antiAliasing,
      [`off`, `msaa`, `smaa`, `msaa-smaa`],
      t.antiAliasing,
    )),
    (r.textureFiltering.anisotropy = i(
      r.textureFiltering.anisotropy,
      [1, 2, 4, 8, 16],
      t.textureFiltering.anisotropy,
    )),
    (r.postProcessing.quality = i(
      r.postProcessing.quality,
      [`off`, `low`, `high`],
      t.postProcessing.quality,
    )),
    (r.resolution.scale = a(r.resolution.scale, 0.5, 1.5)),
    (r.resolution.maxDpr = a(r.resolution.maxDpr, 0.5, 2)),
    (r.resolution.maxPixels = Math.round(a(r.resolution.maxPixels, 5e5, 8e6))),
    (r.ambientOcclusion.intensity = a(r.ambientOcclusion.intensity, 0, 2)),
    (r.ambientOcclusion.radius = a(r.ambientOcclusion.radius, 0.25, 6)),
    (r.ambientOcclusion.resolution = a(r.ambientOcclusion.resolution, 0.25, 1)),
    (r.reflections.intensity = a(r.reflections.intensity, 0, 1)),
    (r.bloom.strength = a(r.bloom.strength, 0, 1.5)),
    (r.bloom.radius = a(r.bloom.radius, 0, 1)),
    (r.bloom.threshold = a(r.bloom.threshold, 0, 4)),
    (r.bloom.resolution = a(r.bloom.resolution, 0.125, 1)),
    (r.atmosphere.scatteringIntensity = a(
      r.atmosphere.scatteringIntensity,
      0,
      2,
    )),
    (r.atmosphere.scatteringResolution = a(
      r.atmosphere.scatteringResolution,
      0.125,
      0.5,
    )),
    (r.atmosphere.scatteringSteps = Math.round(
      a(r.atmosphere.scatteringSteps, 4, 32),
    )),
    (r.particles.ambientDensity = a(r.particles.ambientDensity, 0, 1)),
    (r.particles.impactDensity = a(r.particles.impactDensity, 0, 1)),
    r
  );
}
function vZ(e) {
  return e.graphics
    ? _Z(e.graphics)
    : _Z(
        {
          postProcessing: {
            speedBlur: e.quality === `performance` ? !1 : e.speedBlur,
          },
        },
        mZ(e.quality === `performance` ? `low` : `high`),
      );
}
var yZ = class {
  constructor(e, t = !1, n = !1, r = !0) {
    ((this.safeMode = t),
      (this.night = n),
      (this.localReflections = r),
      (this.requested = _Z(e)),
      (this.effective = this.resolve()));
  }
  set(e) {
    ((this.requested = _Z(e)), (this.effective = this.resolve()));
  }
  patch(e) {
    this.set(_Z(e, this.requested));
  }
  select(e) {
    this.set(mZ(e));
  }
  resolve() {
    let e = fZ(this.requested);
    return (
      this.safeMode &&
        ((e.preset = `low`),
        (e.resolution.maxDpr = Math.min(e.resolution.maxDpr, 1)),
        (e.resolution.maxPixels = Math.min(e.resolution.maxPixels, 18e5)),
        (e.resolution.scale = Math.min(e.resolution.scale, 1)),
        (e.shadows.quality = `off`),
        (e.ambientOcclusion.quality = `off`),
        (e.reflections.mode = `environment`),
        (e.bloom.enabled = !1),
        (e.atmosphere.scattering = !1),
        (e.particles.ambientDensity = Math.min(
          e.particles.ambientDensity,
          0.25,
        )),
        (e.particles.impactDensity = Math.min(e.particles.impactDensity, 0.5)),
        (e.antiAliasing = `msaa`),
        (e.postProcessing = { quality: `off`, speedBlur: !1 }),
        (e.textureFiltering.anisotropy = Math.min(
          e.textureFiltering.anisotropy,
          8,
        ))),
      this.night && (e.atmosphere.scattering = !1),
      this.localReflections || (e.reflections.mode = `environment`),
      e
    );
  }
  get runtime() {
    let e = this.effective;
    return {
      detailedEnvironment: e.preset !== `low`,
      lightingDetail: e.preset !== `low`,
      sunShadows: e.shadows.quality !== `off`,
      ambientCount: Math.round(512 * e.particles.ambientDensity),
      impactDensity: e.particles.impactDensity,
      speedBlur: e.postProcessing.speedBlur,
    };
  }
  snapshot() {
    return {
      preset: this.effective.preset,
      custom:
        JSON.stringify(this.requested) !==
        JSON.stringify(pZ[this.requested.preset]),
      requested: fZ(this.requested),
      effective: fZ(this.effective),
      limited: this.safeMode,
    };
  }
};
function bZ(e, t, n, r) {
  let i = (e) => (Number.isFinite(e) && e > 0 ? e : 1),
    a = Math.sqrt(r.maxPixels) / Math.sqrt(i(e)) / Math.sqrt(i(t)),
    o = Math.min(i(n), r.maxDpr, a);
  return Math.min(o * r.scale, a);
}
var xZ = `/vector/preferences-v1.json`,
  SZ = `vector-settings`,
  CZ = `vector-preferences-sync`,
  wZ = 1200,
  TZ = (e) => typeof e == `number` && Number.isFinite(e),
  EZ = (e, t, n) => Math.max(t, Math.min(n, e));
function DZ(e, t = uX) {
  let n = e && typeof e == `object` ? e : {},
    r = { ...t };
  return (
    TZ(n.sensitivity) && (r.sensitivity = EZ(n.sensitivity, 0.5, 1.6)),
    TZ(n.volume) && (r.volume = EZ(n.volume, 0, 1)),
    TZ(n.musicVolume) && (r.musicVolume = EZ(n.musicVolume, 0, 1)),
    TZ(n.effectsVolume) && (r.effectsVolume = EZ(n.effectsVolume, 0, 1)),
    n.flightModel === 2 &&
      typeof n.autoThrottle == `boolean` &&
      (r.autoThrottle = n.autoThrottle),
    (n.quality === `high` || n.quality === `performance`) &&
      (r.quality = n.quality),
    ul.includes(n.frameRateLimit) && (r.frameRateLimit = n.frameRateLimit),
    typeof n.speedBlur == `boolean` && (r.speedBlur = n.speedBlur),
    typeof n.captureControls == `boolean` &&
      (r.captureControls = n.captureControls),
    typeof n.ghost == `boolean` && (r.ghost = n.ghost),
    n.graphics &&
      typeof n.graphics == `object` &&
      (r.graphics = _Z(n.graphics, t.graphics)),
    (n.camera === `chase` || n.camera === `close` || n.camera === `first`) &&
      (r.camera = n.camera),
    n.frame === 2 &&
      (n.aspect === `16:9` || n.aspect === `21:9`) &&
      (r.aspect = n.aspect),
    r
  );
}
var OZ = (e) => ({ ...e, flightModel: 2, frame: 2 }),
  kZ = (e) => JSON.stringify(OZ(e));
function AZ(e) {
  if (!e || typeof e != `object`) return null;
  let t = e;
  if (!t.settings || typeof t.settings != `object`) return null;
  let n = ju.some((e) => e.id === t.music?.track) ? t.music.track : ju[0].id;
  return {
    settings: DZ({ ...t.settings, flightModel: 2 }),
    music: {
      track: n,
      shuffle: typeof t.music?.shuffle == `boolean` ? t.music.shuffle : !0,
    },
  };
}
