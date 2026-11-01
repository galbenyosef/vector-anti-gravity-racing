// assets__game-D43Oxqny 91 — math
// Lines 38234-38520 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function EC(e, t) {
  let n = xC[e],
    r = new Float32Array(Math.ceil(n * t)),
    i = 1447379796,
    a = 0,
    o = 0,
    s = 0;
  for (let c = 0; c < r.length; c++) {
    let l = c / t;
    i = (Math.imul(i, 1664525) + 1013904223) >>> 0;
    let u = i / 2147483648 - 1;
    ((a += (u - a) * (1 - Math.exp((-SC * 440) / t))),
      (o += (u - o) * (1 - Math.exp((-SC * 2400) / t))));
    let d = u - o,
      f = 0;
    if (e === `turbo`) {
      let e = Math.sin(SC * (80 * l + 420 * l * l));
      f =
        (0.6 * a + 0.2 * o + 0.3 * e) * TC(l, 0, 1.05) +
        0.6 * CC(48, l) * wC(l, 5) +
        0.25 * d * wC(l, 8);
    } else if (e === `mines`)
      f =
        0.72 * CC(92, l) * wC(l, 38) +
        0.48 * (o + CC(1460, l) * 0.35 + CC(2281, l) * 0.2) * wC(l, 70) +
        0.22 * CC(1150 + 700 * l, l) * TC(l, 0.085, 0.055) +
        0.12 * d * TC(l, 0.025, 0.09);
    else if (e === `rockets`)
      f =
        0.8 * CC(58 + 110 * Math.exp(-l * 16), l) * wC(l, 10) +
        0.45 * o * wC(l, 7) +
        0.45 * d * wC(l, 40) +
        0.5 * a * TC(l, 0.03, 0.42) +
        0.13 * CC(380 - l * 140, l) * TC(l, 0.045, 0.35);
    else if (e === `missile`)
      f =
        0.22 * CC(1700 + 1800 * l, l) * TC(l, 0, 0.06) +
        0.62 * CC(52 + 160 * Math.exp(-l * 15), l) * wC(l, 8) +
        0.4 * o * wC(l, 6) +
        0.26 * d * wC(l, 26) +
        0.18 * CC(650 - 280 * l, l) * TC(l, 0.06, 0.48) +
        0.4 * a * TC(l, 0.04, 0.48);
    else if (e === `cannon`)
      f =
        0.65 * o * wC(l, 60) +
        0.38 * d * wC(l, 125) +
        0.5 * CC(115 + 240 * Math.exp(-l * 75), l) * wC(l, 55) +
        0.16 * CC(2650, l) * wC(l, 95);
    else if (e === `cannon-hit`)
      f =
        0.6 * d * wC(l, 70) +
        0.3 * CC(2130, l) * wC(l, 48) +
        0.35 * CC(350, l) * wC(l, 40);
    else if (e === `impact` || e === `recover`)
      ((f =
        0.88 * CC(38 + 70 * Math.exp(-l * 13), l) * wC(l, 7) +
        0.72 * a * wC(l, 5) +
        0.5 * o * wC(l, 14) +
        0.26 * d * wC(l, 50) +
        0.1 * CC(871, l) * TC(l, 0.065, 0.13) +
        0.075 * CC(1471, l) * TC(l, 0.13, 0.19)),
        e === `recover` &&
          (f += 0.2 * CC(420 + 500 * l, l) * TC(l, 0.27, 0.52)));
    else if (e === `absorb`)
      f =
        (0.34 * Math.sin(SC * (170 * l + 950 * l * l)) + 0.3 * a) *
          TC(l, 0, 0.39) +
        0.18 * CC(880, l) * TC(l, 0.24, 0.36) +
        0.13 * CC(1320, l) * TC(l, 0.29, 0.35);
    else if (e === `pickup`)
      f =
        0.3 * CC(660, l) * TC(l, 0, 0.12) +
        0.24 * CC(990, l) * TC(l, 0.065, 0.15) +
        0.15 * o * wC(l, 60);
    else if (e === `shield`) {
      let e = Math.log(4) / 0.55,
        t = Math.sin((220 / e) * SC * (Math.exp(Math.min(l, 0.55) * e) - 1)),
        n =
          (CC(1760, l) + 0.7 * CC(2637, l) + 0.45 * CC(3520, l)) *
          (0.6 + 0.4 * CC(18, l));
      f =
        0.38 * t * TC(l, 0, 0.62) +
        0.16 * n * TC(l, 0.12, 0.8) +
        0.3 * a * TC(l, 0, 0.5) +
        0.12 * d * TC(l, 0.04, 0.3) +
        0.22 * CC(110, l) * TC(l, 0, 0.7);
    } else
      e === `shield-block`
        ? (f =
            0.6 * CC(140 + 300 * Math.exp(-l * 30), l) * wC(l, 18) +
            0.32 * (CC(1180, l) + 0.6 * CC(1770, l)) * wC(l, 9) +
            0.34 * d * wC(l, 60) +
            0.18 * CC(2400 + 900 * l, l) * wC(l, 25))
        : e === `lock` &&
          (f =
            0.28 *
            (CC(1250, l) + 0.4 * CC(2500, l)) *
            (TC(l, 0, 0.055) + TC(l, 0.08, 0.055) + TC(l, 0.16, 0.075)));
    let p = Math.min(1, l / 0.0015, (n - l) / 0.018);
    ((r[c] = f * p), (s = Math.max(s, Math.abs(r[c]))));
  }
  let c = 0.84 / Math.max(s, 0.01);
  for (let e = 0; e < r.length; e++) r[e] *= c;
  return r;
}
function DC(e, t) {
  return Object.fromEntries(
    Object.keys(xC).map((n) => {
      let r = n,
        i = t?.[r] ?? EC(r, e.sampleRate),
        a = e.createBuffer(1, i.length, e.sampleRate);
      return (a.copyToChannel(i, 0), [r, a]);
    }),
  );
}
var OC = {
    duration: 2.8,
    rt60: 2.1,
    predelay: 0.008,
    shelfHz: 4200,
    highpassHz: 170,
    lowpassHz: 6e3,
    smoothing: 0.12,
  },
  kC = {
    music: { wet: 0.45, dry: 0.85, shelfDb: -3.5 },
    world: { wet: 0.6, dry: 1, shelfDb: 0 },
  },
  AC = Object.keys(kC),
  jC = [
    [0.061, 0.85, 0],
    [0.099, 0.8, -0.75],
    [0.104, 0.78, 0.75],
    [0.131, 0.45, -0.3],
    [0.137, 0.43, 0.3],
    [0.198, 0.5, 0.55],
    [0.203, 0.48, -0.55],
    [0.297, 0.36, -0.5],
    [0.396, 0.27, 0.5],
    [0.495, 0.2, -0.45],
    [0.594, 0.15, 0.45],
    [0.693, 0.11, -0.4],
  ],
  MC = (e) => Math.min(1, Math.max(0, e)),
  NC = (e) => e * e * (3 - 2 * e);
function PC(e) {
  return () => {
    e = (e + 1831565813) >>> 0;
    let t = e;
    return (
      (t = Math.imul(t ^ (t >>> 15), t | 1)),
      (t ^= t + Math.imul(t ^ (t >>> 7), t | 61)),
      ((t ^ (t >>> 14)) >>> 0) / 4294967296
    );
  };
}
function FC(e, t = 8262113) {
  let { duration: n, rt60: r, predelay: i } = OC,
    a = Number.isFinite(e) && e > 0 ? e : 48e3,
    o = Math.max(1, Math.round(n * a)),
    s = [new Float32Array(o), new Float32Array(o)],
    c = Math.log(1e3) / r,
    l = Math.round(0.003 * a);
  for (let e = 0; e < 2; e++) {
    let n = s[e],
      r = PC(t + e * 7919),
      u = new Float32Array(o),
      d = 0,
      f = 0;
    for (let e = 0; e < o; e++) {
      let t = e / a,
        o = 7e3 * Math.exp(-1.2 * t) + 900,
        s = 1 - Math.exp((-2 * Math.PI * o) / a);
      if (
        ((d += s * (r() * 2 - 1 - d)),
        (f += s * (r() * 2 - 1 - f)),
        (u[e] = f / Math.sqrt(s / (2 - s) / 3)),
        t < i)
      )
        continue;
      let l = NC(MC((t - i) / 0.09));
      n[e] = d * l * Math.exp(-c * t);
    }
    let p = 0,
      m = 0;
    for (let e = Math.round(0.05 * a); e < Math.round(0.15 * a); e++)
      ((p += n[e] * n[e]), m++);
    let h = Math.sqrt(p / Math.max(1, m)) * 5;
    for (let [t, r, i] of jC) {
      let s = ((i + 1) * Math.PI) / 4,
        c = e === 0 ? Math.cos(s) : Math.sin(s),
        d = Math.round(l * (1 + t * 4)),
        f = Math.round(t * a);
      for (let e = 0; e < d && f + e < o; e++) {
        let t = Math.sin((Math.PI * (e + 0.5)) / d) ** 2;
        n[f + e] += u[f + e] * t * r * c * Math.SQRT2 * h;
      }
    }
  }
  let u = 0;
  for (let e of s) for (let t of e) u += t * t;
  let d = 1 / Math.sqrt(Math.max(u / 2, 1e-12));
  for (let e of s) for (let t = 0; t < o; t++) e[t] *= d;
  return s;
}
function IC(e, t = `music`) {
  let n = Number.isFinite(e) ? MC(e) : 0,
    { dry: r, wet: i, shelfDb: a } = kC[t];
  return { dry: 1 + (r - 1) * n, wet: i * n, shelfDb: n > 0 ? a * n : 0 };
}
var LC = class {
    constructor(e, t) {
      ((this.context = e), (this.weight = 0));
      let n = e,
        r = OC;
      ((this.output = n.createGain()),
        (this.reverb = n.createConvolver()),
        (this.reverb.normalize = !1));
      let [i, a] = t ?? FC(n.sampleRate),
        o = n.createBuffer(2, i.length, n.sampleRate);
      (o.copyToChannel(i, 0),
        o.copyToChannel(a, 1),
        (this.reverb.buffer = o),
        (this.highpass = n.createBiquadFilter()),
        (this.highpass.type = `highpass`),
        (this.highpass.frequency.value = r.highpassHz),
        (this.lowpass = n.createBiquadFilter()),
        (this.lowpass.type = `lowpass`),
        (this.lowpass.frequency.value = r.lowpassHz),
        this.reverb.connect(this.highpass),
        this.highpass.connect(this.lowpass),
        this.lowpass.connect(this.output));
      let s = {},
        c = {};
      for (let e of AC) {
        let t = n.createGain(),
          i = n.createBiquadFilter(),
          a = n.createGain(),
          o = n.createGain();
        ((i.type = `highshelf`),
          (i.frequency.value = r.shelfHz),
          (i.gain.value = 0),
          (o.gain.value = 0),
          t.connect(i),
          i.connect(a),
          a.connect(this.output),
          t.connect(o),
          o.connect(this.reverb),
          (s[e] = t),
          (c[e] = { tone: i, dry: a, send: o }));
      }
      ((this.inputs = s), (this.buses = c));
    }
    set(e, t = this.context.currentTime) {
      let n = Number.isFinite(e) ? MC(e) : 0;
      this.weight = n;
      let r = OC.smoothing;
      for (let e of AC) {
        let i = IC(n, e),
          a = this.buses[e];
        (a.dry.gain.setTargetAtTime(i.dry, t, r),
          a.send.gain.setTargetAtTime(i.wet, t, r),
          a.tone.gain.setTargetAtTime(i.shelfDb, t, r));
      }
    }
    dispose() {
      for (let e of AC) {
        this.inputs[e].disconnect();
        for (let t of Object.values(this.buses[e])) t.disconnect();
      }
      for (let e of [this.reverb, this.highpass, this.lowpass, this.output])
        e.disconnect();
    }
  },
  RC = 2048,
  zC = (e) => Math.max(0, Math.min(1, e)),
  BC = (e, t, n, r, i) => e + (t - e) * -Math.expm1(-n / (t > e ? r : i));
function VC(e, t) {
  let n = Math.min(e.length, t.to);
  if (n <= t.from) return 0;
  let r = 0;
  for (let i = t.from; i < n; i++) {
    let t = e[i];
    Number.isFinite(t) && (r += 10 ** (Math.min(0, t) * 0.1));
  }
  return r === 0 ? 0 : zC((10 * Math.log10(r / (n - t.from)) + 72) / 48);
}
