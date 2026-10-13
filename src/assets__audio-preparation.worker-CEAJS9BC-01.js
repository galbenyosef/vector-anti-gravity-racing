// assets__audio-preparation.worker-CEAJS9BC 01 — math
// Lines 1-238 of readable/assets__audio-preparation.worker-CEAJS9BC.pretty.js (statement-aligned).
(function () {
  let e = {
      turbo: 1.15,
      mines: 0.32,
      rockets: 0.58,
      missile: 0.7,
      cannon: 0.105,
      impact: 0.68,
      "cannon-hit": 0.13,
      absorb: 0.65,
      pickup: 0.22,
      lock: 0.24,
      recover: 0.85,
      shield: 0.95,
      "shield-block": 0.42,
    },
    t = Math.PI * 2,
    n = (e, n) => Math.sin(t * e * n),
    r = (e, t) => Math.exp(-Math.max(0, e) * t),
    i = (e, t, n) =>
      e >= t && e < t + n ? Math.sin((Math.PI * (e - t)) / n) : 0;
  function a(a, o) {
    let s = e[a],
      c = new Float32Array(Math.ceil(s * o)),
      l = 1447379796,
      u = 0,
      d = 0,
      f = 0;
    for (let e = 0; e < c.length; e++) {
      let p = e / o;
      l = (Math.imul(l, 1664525) + 1013904223) >>> 0;
      let m = l / 2147483648 - 1;
      ((u += (m - u) * (1 - Math.exp((-t * 440) / o))),
        (d += (m - d) * (1 - Math.exp((-t * 2400) / o))));
      let h = m - d,
        g = 0;
      if (a === `turbo`) {
        let e = Math.sin(t * (80 * p + 420 * p * p));
        g =
          (0.6 * u + 0.2 * d + 0.3 * e) * i(p, 0, 1.05) +
          0.6 * n(48, p) * r(p, 5) +
          0.25 * h * r(p, 8);
      } else if (a === `mines`)
        g =
          0.72 * n(92, p) * r(p, 38) +
          0.48 * (d + n(1460, p) * 0.35 + n(2281, p) * 0.2) * r(p, 70) +
          0.22 * n(1150 + 700 * p, p) * i(p, 0.085, 0.055) +
          0.12 * h * i(p, 0.025, 0.09);
      else if (a === `rockets`)
        g =
          0.8 * n(58 + 110 * Math.exp(-p * 16), p) * r(p, 10) +
          0.45 * d * r(p, 7) +
          0.45 * h * r(p, 40) +
          0.5 * u * i(p, 0.03, 0.42) +
          0.13 * n(380 - p * 140, p) * i(p, 0.045, 0.35);
      else if (a === `missile`)
        g =
          0.22 * n(1700 + 1800 * p, p) * i(p, 0, 0.06) +
          0.62 * n(52 + 160 * Math.exp(-p * 15), p) * r(p, 8) +
          0.4 * d * r(p, 6) +
          0.26 * h * r(p, 26) +
          0.18 * n(650 - 280 * p, p) * i(p, 0.06, 0.48) +
          0.4 * u * i(p, 0.04, 0.48);
      else if (a === `cannon`)
        g =
          0.65 * d * r(p, 60) +
          0.38 * h * r(p, 125) +
          0.5 * n(115 + 240 * Math.exp(-p * 75), p) * r(p, 55) +
          0.16 * n(2650, p) * r(p, 95);
      else if (a === `cannon-hit`)
        g =
          0.6 * h * r(p, 70) +
          0.3 * n(2130, p) * r(p, 48) +
          0.35 * n(350, p) * r(p, 40);
      else if (a === `impact` || a === `recover`)
        ((g =
          0.88 * n(38 + 70 * Math.exp(-p * 13), p) * r(p, 7) +
          0.72 * u * r(p, 5) +
          0.5 * d * r(p, 14) +
          0.26 * h * r(p, 50) +
          0.1 * n(871, p) * i(p, 0.065, 0.13) +
          0.075 * n(1471, p) * i(p, 0.13, 0.19)),
          a === `recover` &&
            (g += 0.2 * n(420 + 500 * p, p) * i(p, 0.27, 0.52)));
      else if (a === `absorb`)
        g =
          (0.34 * Math.sin(t * (170 * p + 950 * p * p)) + 0.3 * u) *
            i(p, 0, 0.39) +
          0.18 * n(880, p) * i(p, 0.24, 0.36) +
          0.13 * n(1320, p) * i(p, 0.29, 0.35);
      else if (a === `pickup`)
        g =
          0.3 * n(660, p) * i(p, 0, 0.12) +
          0.24 * n(990, p) * i(p, 0.065, 0.15) +
          0.15 * d * r(p, 60);
      else if (a === `shield`) {
        let e = Math.log(4) / 0.55,
          r = Math.sin((220 / e) * t * (Math.exp(Math.min(p, 0.55) * e) - 1)),
          a =
            (n(1760, p) + 0.7 * n(2637, p) + 0.45 * n(3520, p)) *
            (0.6 + 0.4 * n(18, p));
        g =
          0.38 * r * i(p, 0, 0.62) +
          0.16 * a * i(p, 0.12, 0.8) +
          0.3 * u * i(p, 0, 0.5) +
          0.12 * h * i(p, 0.04, 0.3) +
          0.22 * n(110, p) * i(p, 0, 0.7);
      } else
        a === `shield-block`
          ? (g =
              0.6 * n(140 + 300 * Math.exp(-p * 30), p) * r(p, 18) +
              0.32 * (n(1180, p) + 0.6 * n(1770, p)) * r(p, 9) +
              0.34 * h * r(p, 60) +
              0.18 * n(2400 + 900 * p, p) * r(p, 25))
          : a === `lock` &&
            (g =
              0.28 *
              (n(1250, p) + 0.4 * n(2500, p)) *
              (i(p, 0, 0.055) + i(p, 0.08, 0.055) + i(p, 0.16, 0.075)));
      let _ = Math.min(1, p / 0.0015, (s - p) / 0.018);
      ((c[e] = g * _), (f = Math.max(f, Math.abs(c[e]))));
    }
    let p = 0.84 / Math.max(f, 0.01);
    for (let e = 0; e < c.length; e++) c[e] *= p;
    return c;
  }
  let o = {
      duration: 2.8,
      rt60: 2.1,
      predelay: 0.008,
      shelfHz: 4200,
      highpassHz: 170,
      lowpassHz: 6e3,
      smoothing: 0.12,
    },
    s = [
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
    c = (e) => Math.min(1, Math.max(0, e)),
    l = (e) => e * e * (3 - 2 * e);
  function u(e) {
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
  function d(e, t = 8262113) {
    let { duration: n, rt60: r, predelay: i } = o,
      a = Number.isFinite(e) && e > 0 ? e : 48e3,
      d = Math.max(1, Math.round(n * a)),
      f = [new Float32Array(d), new Float32Array(d)],
      p = Math.log(1e3) / r,
      m = Math.round(0.003 * a);
    for (let e = 0; e < 2; e++) {
      let n = f[e],
        r = u(t + e * 7919),
        o = new Float32Array(d),
        h = 0,
        g = 0;
      for (let e = 0; e < d; e++) {
        let t = e / a,
          s = 7e3 * Math.exp(-1.2 * t) + 900,
          u = 1 - Math.exp((-2 * Math.PI * s) / a);
        if (
          ((h += u * (r() * 2 - 1 - h)),
          (g += u * (r() * 2 - 1 - g)),
          (o[e] = g / Math.sqrt(u / (2 - u) / 3)),
          t < i)
        )
          continue;
        let d = l(c((t - i) / 0.09));
        n[e] = h * d * Math.exp(-p * t);
      }
      let _ = 0,
        v = 0;
      for (let e = Math.round(0.05 * a); e < Math.round(0.15 * a); e++)
        ((_ += n[e] * n[e]), v++);
      let y = Math.sqrt(_ / Math.max(1, v)) * 5;
      for (let [t, r, i] of s) {
        let s = ((i + 1) * Math.PI) / 4,
          c = e === 0 ? Math.cos(s) : Math.sin(s),
          l = Math.round(m * (1 + t * 4)),
          u = Math.round(t * a);
        for (let e = 0; e < l && u + e < d; e++) {
          let t = Math.sin((Math.PI * (e + 0.5)) / l) ** 2;
          n[u + e] += o[u + e] * t * r * c * Math.SQRT2 * y;
        }
      }
    }
    let h = 0;
    for (let e of f) for (let t of e) h += t * t;
    let g = 1 / Math.sqrt(Math.max(h / 2, 1e-12));
    for (let e of f) for (let t = 0; t < d; t++) e[t] *= g;
    return f;
  }
  async function f(t, n = () => {}, r = () => Promise.resolve(), i = () => !1) {
    let o = Object.keys(e),
      s = {},
      c = o.length + 2,
      l = 0;
    for (let e of o) {
      if ((await r(), i())) return null;
      ((s[e] = a(e, t)), n(++l / c));
    }
    if ((await r(), i())) return null;
    let u = d(t);
    if ((n(++l / c), await r(), i())) return null;
    let f = new Float32Array(Math.round(t * 2));
    for (let e = 0; e < f.length; e++) f[e] = Math.random() * 2 - 1;
    return (n(1), { sampleRate: t, combat: s, impulse: u, wind: f });
  }
  self.onmessage = async ({ data: e }) => {
    let t = await f(e.sampleRate, (e) => self.postMessage({ progress: e }));
    if (!t) return;
    let n = [
      ...Object.values(t.combat).map((e) => e.buffer),
      ...t.impulse.map((e) => e.buffer),
      t.wind.buffer,
    ];
    self.postMessage({ samples: t }, { transfer: n });
  };
})();
