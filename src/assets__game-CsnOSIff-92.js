// assets__game-CsnOSIff 92 — math
// Lines 38296-38463 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var AC = class {
  constructor(e, t = EC) {
    ((this.value = { bass: 0, mid: 0, high: 0, level: 0, beat: 0 }),
      (this.bassHistory = 0),
      (this.previousBass = 0),
      (this.beatPulse = 0),
      (this.cooldown = 0),
      (this.primed = !1));
    let n = e / t,
      r = (e, r) => ({
        from: Math.max(1, Math.ceil(e / n)),
        to: Math.min(t / 2, Math.ceil(r / n)),
      });
    ((this.bassBand = r(35, 240)),
      (this.midBand = r(240, 2200)),
      (this.highBand = r(2200, 12e3)));
  }
  sample(e, t) {
    let n = Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
    if (n === 0) return this.value;
    let r = e ? kC(e, this.bassBand) : 0,
      i = e ? kC(e, this.midBand) : 0,
      a = e ? kC(e, this.highBand) : 0,
      o = r * 0.45 + i * 0.4 + a * 0.15;
    if (((this.cooldown = Math.max(0, this.cooldown - n)), e)) {
      if (!this.primed) ((this.bassHistory = r), (this.primed = !0));
      else {
        let e = r - this.bassHistory - 0.055,
          t = (r - this.previousBass) / n > 0.4;
        (this.cooldown === 0 &&
          t &&
          r > 0.14 &&
          e > 0.025 &&
          ((this.beatPulse = DC(e * 4.2)), (this.cooldown = 0.26)),
          (this.bassHistory = OC(this.bassHistory, r, n, 1.05, 1.05)));
      }
      this.previousBass = r;
    } else
      ((this.primed = !1),
        (this.bassHistory = 0),
        (this.previousBass = 0),
        (this.beatPulse = 0),
        (this.cooldown = 0));
    let s = this.value;
    return (
      (s.bass = OC(s.bass, r, n, 0.075, 0.42)),
      (s.mid = OC(s.mid, i, n, 0.1, 0.48)),
      (s.high = OC(s.high, a, n, 0.12, 0.38)),
      (s.level = OC(s.level, o, n, 0.11, 0.5)),
      (s.beat = OC(s.beat, this.beatPulse, n, 0.055, 0.24)),
      (this.beatPulse *= Math.exp(-n / 0.14)),
      s
    );
  }
  reset() {
    let e = this.value;
    ((e.bass = e.mid = e.high = e.level = e.beat = 0),
      (this.bassHistory =
        this.previousBass =
        this.beatPulse =
        this.cooldown =
          0),
      (this.primed = !1));
  }
};
async function jC(e, t = () => {}, n = () => Promise.resolve(), r = () => !1) {
  let i = Object.keys(lC),
    a = {},
    o = i.length + 2,
    s = 0;
  for (let c of i) {
    if ((await n(), r())) return null;
    ((a[c] = mC(c, e)), t(++s / o));
  }
  if ((await n(), r())) return null;
  let c = CC(e);
  if ((t(++s / o), await n(), r())) return null;
  let l = new Float32Array(Math.round(e * 2));
  for (let e = 0; e < l.length; e++) l[e] = Math.random() * 2 - 1;
  return (t(1), { sampleRate: e, combat: a, impulse: c, wind: l });
}
function MC(e, t, n) {
  if (t.aborted) return Promise.resolve(null);
  let r = () =>
    jC(
      e,
      n,
      () => new Promise((e) => setTimeout(e, 0)),
      () => t.aborted,
    );
  return typeof Worker > `u`
    ? r()
    : new Promise((i, a) => {
        let o;
        try {
          o = new Worker(
            new URL(
              `` +
                new URL(`audio-preparation.worker-CEAJS9BC.js`, import.meta.url)
                  .href,
              `` + import.meta.url,
            ),
            { type: `module` },
          );
        } catch {
          r().then(i, a);
          return;
        }
        let s = () => {
            (o.terminate(), t.removeEventListener(`abort`, c));
          },
          c = () => {
            (s(), i(null));
          };
        (t.addEventListener(`abort`, c, { once: !0 }),
          (o.onmessage = ({ data: e }) => {
            t.aborted ||
              (e.progress !== void 0 && n(e.progress),
              e.samples && (s(), i(e.samples)));
          }),
          (o.onerror = (e) => {
            (e.preventDefault(), s(), r().then(i, a));
          }),
          o.postMessage({ sampleRate: e }));
      });
}
var NC = {
    speed: 0,
    throttle: 0,
    boost: !1,
    turbo: !1,
    airbrake: 0,
    airLoad: 0,
    airborne: !1,
    active: !1,
  },
  PC = 214,
  FC = 0.78,
  IC = [
    [1, 1],
    [2.003, 0.32],
    [3.011, 0.1],
  ],
  LC = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e));
function RC(e) {
  let t = LC(e.speed / PC, 0, 1.25),
    n = Math.min(1, t),
    r = e.active ? LC(e.throttle) : 0,
    i = e.turbo ? 2 : +!!e.boost,
    a = e.turbo ? 1.18 : e.boost ? 1.09 : 1,
    o = e.airborne ? 1.06 : 1;
  return {
    level: e.active ? FC : 0,
    whineHz: (150 + 560 * t ** 0.85 + 90 * r) * a * o,
    whineGain: (0.01 + 0.03 * r) * (0.5 + 0.5 * n) + 0.01 * i,
    vibratoCents: 6 + 10 * n,
    roarHz: (220 + 1500 * r * n + 700 * i) * (e.airborne ? 0.6 : 1),
    roarGain: (0.035 + 0.11 * r) * (0.3 + 0.7 * n) + 0.03 * i,
    rumbleGain: (0.02 + 0.1 * r) * (0.4 + 0.6 * n) * (e.airborne ? 0.4 : 1),
    humHz: 46 + 26 * n,
    humGain: e.active ? 0.004 + 0.006 * r : 0,
    airHz: 500 + 2600 * n,
    airGain: 0.11 * n ** 1.6 * (e.airborne ? 1.3 : 1),
    brakeHz: 1500 + 1800 * n,
    brakeGain: LC(e.airLoad) * (0.03 + 0.12 * n),
    brakePan: LC(-e.airbrake * 0.7, -0.7, 0.7),
  };
}
