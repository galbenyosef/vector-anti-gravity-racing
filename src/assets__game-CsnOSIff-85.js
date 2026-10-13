// assets__game-CsnOSIff 85 — postprocessing
// Lines 34474-34542 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function DS(e, t) {
  let n = e._renderContexts;
  if (!n) return () => {};
  let r = ES.get(n);
  if (!r) {
    let e = new Map(),
      t = n.get,
      i = (r, i, a) => t.call(n, r, i, r && e.has(r) && a !== -1 ? 0 : a);
    ((r = { targets: e, original: t, adapted: i }), ES.set(n, r), (n.get = i));
  }
  let i = r;
  i.targets.set(t, (i.targets.get(t) ?? 0) + 1);
  let a = !1;
  return () => {
    if (a) return;
    a = !0;
    let e = (i.targets.get(t) ?? 1) - 1;
    (e ? i.targets.set(t, e) : i.targets.delete(t),
      i.targets.size === 0 &&
        n.get === i.adapted &&
        ((n.get = i.original), ES.delete(n)));
  };
}
var OS = (e) => e * e * (3 - 2 * e);
function kS(e, t, n) {
  if (!Number.isFinite(e)) return 0;
  let r = nt.cruise * 0.85;
  return TS(OS(TS((e - r) / (nt.turbo - r))) * 0.8 + (n ? 0.25 : t ? 0.12 : 0));
}
function AS(e, t, n) {
  if (!(n > 0)) return e;
  let r = t > e ? 7 : 2.5;
  return e + (t - e) * (1 - Math.exp(-n * r));
}
var jS = Vi(({ input: e, threshold: t, smoothWidth: n }) => {
    let r = dr(e.rgb, q(xS.fireflyClamp)),
      i = V(r.r, V(r.g, r.b)),
      a = Gi(i.sub(t).add(n), 0, n.mul(2)),
      o = V(a.mul(a).div(n.mul(4).add(1e-4)), i.sub(t)).div(V(i, 1e-4));
    return H(r.mul(o), 1);
  }),
  MS = new b(),
  NS = new g();
function PS(e) {
  return (
    e.antiAliasing !== `msaa` ||
    (e.ambientOcclusion.quality !== `off` &&
      e.ambientOcclusion.intensity > 0) ||
    (e.bloom.enabled && e.bloom.strength > 0) ||
    (e.atmosphere.scattering && e.atmosphere.scatteringIntensity > 0) ||
    e.postProcessing.quality !== `off` ||
    e.postProcessing.speedBlur
  );
}
function FS(e) {
  return {
    ao:
      e.ambientOcclusion.quality !== `off` && e.ambientOcclusion.intensity > 0,
    bloom: e.bloom.enabled && e.bloom.strength > 0,
    scattering: e.atmosphere.scattering && e.atmosphere.scatteringIntensity > 0,
    msaa: e.antiAliasing === `msaa` || e.antiAliasing === `msaa-smaa`,
    smaa: e.antiAliasing === `smaa` || e.antiAliasing === `msaa-smaa`,
    vignette: e.postProcessing.quality !== `off`,
    sharpening: e.postProcessing.quality === `high`,
    dither: e.postProcessing.quality !== `off`,
    speedBlur: e.postProcessing.speedBlur,
    blurTaps: e.postProcessing.quality === `high` ? SS.taps : 4,
  };
}
