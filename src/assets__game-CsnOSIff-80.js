// assets__game-CsnOSIff 80 — height
// Lines 32990-33309 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Yx = class {
  constructor() {
    ((this.enabled = !1),
      (this.frames = new Float64Array(120)),
      (this.cpu = new Float64Array(120)),
      (this.cursor = 0),
      (this.count = 0),
      (this.last = 0),
      (this.warmup = 30),
      (this.generation = 0),
      (this.pending = !1),
      (this.nextGPU = 0),
      (this.gpu = null),
      (this.gpuMeasuredAt = 0),
      (this.baseline = null),
      (this.draws = 0),
      (this.triangles = 0),
      (this.width = 0),
      (this.height = 0));
  }
  setEnabled(e) {
    ((this.enabled = e), this.reset(), e || (this.baseline = null));
  }
  reset() {
    (this.generation++,
      (this.count = this.cursor = this.last = 0),
      (this.warmup = 30),
      (this.gpu = null),
      (this.gpuMeasuredAt = 0));
  }
  record(e, t, n, r, i, a) {
    if (!this.enabled) return;
    let o = e - this.last;
    if (
      ((this.last = e),
      (this.draws = n),
      (this.triangles = r),
      (this.width = i),
      (this.height = a),
      this.warmup > 0)
    ) {
      this.warmup--;
      return;
    }
    !(o > 0 && o < 1e3) ||
      !Number.isFinite(t) ||
      ((this.frames[this.cursor] = o),
      (this.cpu[this.cursor] = Math.max(0, t)),
      (this.cursor = (this.cursor + 1) % this.frames.length),
      (this.count = Math.min(this.count + 1, this.frames.length)));
  }
  beginGPU(e, t) {
    let n = qx(e),
      r = n.hasFeature(`timestamp-query`) || !!n.disjoint;
    (!r || t - this.gpuMeasuredAt > 2e3) && (this.gpu = null);
    let i =
      this.enabled &&
      r &&
      !this.pending &&
      t >= this.nextGPU &&
      this.warmup === 0;
    return (i ? (n.trackTimestamp = !0) : Jx(e), i);
  }
  endGPU(e, t, n) {
    if (!n) return;
    let r = this.generation;
    ((this.pending = !0), (this.nextGPU = t + 250));
    let i = e.resolveTimestampsAsync();
    (Jx(e),
      i
        .then((e) => {
          !this.enabled ||
            r !== this.generation ||
            ((this.gpu =
              typeof e == `number` && Number.isFinite(e) && e > 0 ? e : null),
            (this.gpuMeasuredAt = t));
        })
        .catch(() => {
          this.enabled && r === this.generation && (this.gpu = null);
        })
        .finally(() => {
          this.pending = !1;
        }));
  }
  captureBaseline() {
    if (this.enabled && this.count >= 30) {
      let {
        fps: e,
        frameMs: t,
        p95Ms: n,
        cpuMs: r,
        gpuMs: i,
        drawCalls: a,
        triangles: o,
      } = this.snapshot();
      this.baseline = {
        fps: e,
        frameMs: t,
        p95Ms: n,
        cpuMs: r,
        gpuMs: i,
        drawCalls: a,
        triangles: o,
      };
    }
  }
  clearBaseline() {
    this.baseline = null;
  }
  snapshot() {
    let e = Array.from(this.frames.subarray(0, this.count)),
      t = e.reduce((e, t) => e + t, 0) / Math.max(1, this.count),
      n =
        this.cpu.subarray(0, this.count).reduce((e, t) => e + t, 0) /
        Math.max(1, this.count);
    e.sort((e, t) => e - t);
    let r = (e) => Math.round(e * 100) / 100;
    return {
      enabled: this.enabled,
      samples: this.count,
      fps: t > 0 ? r(1e3 / t) : 0,
      frameMs: r(t),
      p95Ms: r(e[Math.max(0, Math.ceil(e.length * 0.95) - 1)] ?? 0),
      cpuMs: r(n),
      gpuMs: this.gpu === null ? null : r(this.gpu),
      drawCalls: this.draws,
      triangles: this.triangles,
      resolution: { width: this.width, height: this.height },
      baseline: this.baseline,
      deltaMs:
        this.baseline && this.count >= 30 ? r(t - this.baseline.frameMs) : null,
    };
  }
};
function Xx(e) {
  return () => (
    (e = (Math.imul(e, 1664525) + 1013904223) >>> 0),
    e / 4294967296
  );
}
function Zx(e, t) {
  let n = document.createElement(`canvas`);
  return (
    (n.width = e),
    (n.height = t),
    n.getContext(`2d`, { willReadFrequently: !0 })
  );
}
function Qx(e, t, n) {
  let r = kl(e, t, n, e / 2),
    i = () => {
      let n = Zx(r.width, r.height);
      return (n.scale(r.width / e, r.height / t), n);
    };
  return { colour: i(), height: i(), orm: i() };
}
function $x(e, t, n, r, i, a) {
  ((e.fillStyle = t), e.fillRect(n, r, i, a));
}
function eS(e, t, n, r, i, a, o, s) {
  ($x(e.colour, a, t, n, r, i),
    $x(e.height, `rgb(${o} ${o} ${o})`, t, n, r, i),
    $x(e.orm, s, t, n, r, i));
}
function tS(e, t, n, r, i) {
  let { width: a, height: o } = e.height.canvas,
    s = e.height.getImageData(0, 0, a, o).data,
    c = Zx(a, o),
    l = c.createImageData(a, o),
    u = (e, t) => s[(((t + o) % o) * a + ((e + a) % a)) * 4] / 255;
  for (let e = 0; e < o; e++)
    for (let t = 0; t < a; t++) {
      let s = ((u(t - 1, e) - u(t + 1, e)) * i * a) / (2 * n),
        c = ((u(t, e + 1) - u(t, e - 1)) * i * o) / (2 * r),
        d = Math.hypot(s, c, 1),
        f = (e * a + t) * 4;
      ((l.data[f] = ((s / d) * 0.5 + 0.5) * 255),
        (l.data[f + 1] = ((c / d) * 0.5 + 0.5) * 255),
        (l.data[f + 2] = ((1 / d) * 0.5 + 0.5) * 255),
        (l.data[f + 3] = 255));
    }
  c.putImageData(l, 0, 0);
  let d = (e, n, r = !1) => {
      let i = new p(e.canvas);
      return (
        (i.name = `${t} ${n}`),
        (i.wrapS = i.wrapT = qe),
        (i.anisotropy = 8),
        (i.colorSpace = r ? st : ``),
        i
      );
    },
    f = {
      map: d(e.colour, `albedo`, !0),
      normalMap: d(c, `normal`),
      orm: d(e.orm, `ORM`),
    };
  return ((e.height.canvas.width = e.height.canvas.height = 1), f);
}
function nS(e) {
  let t = 2048,
    n = 1024,
    r = Qx(t, n, e),
    i = Xx(4077);
  eS(r, 0, 0, t, n, `#303d46`, 118, `rgb(245 184 80)`);
  for (let e = 0; e < 6; e++) {
    let t = 256 + e * 256;
    for (let n = -1; n < 5; n++) {
      let a = n * 256 + (e % 2) * 128,
        o = Math.floor(i() * 9);
      (eS(r, t + 2, a + 2, 252, 252, `#202c34`, 40, `rgb(172 231 35)`),
        eS(
          r,
          t + 5,
          a + 5,
          246,
          246,
          `rgb(${63 + o} ${76 + o} ${85 + o})`,
          155,
          `rgb(250 ${166 + o * 3} 78)`,
        ),
        eS(r, t + 5, a + 5, 2, 246, `#66757b`, 166, `rgb(231 116 182)`),
        eS(r, t + 5, a + 5, 246, 2, `#66757b`, 166, `rgb(231 116 182)`));
      for (let e of [t + 15, t + 238])
        for (let t of [a + 15, a + 238])
          (eS(r, e - 2, t - 1, 5, 3, `#25323a`, 67, `rgb(191 132 165)`),
            $x(r.colour, `#778589`, e - 1, t - 1, 2, 1));
    }
  }
  for (let e = 0; e < 64e3; e++) {
    let e = 260 + i() * 1528,
      t = i() * n;
    ($x(
      r.colour,
      i() > 0.5 ? `rgba(174,191,193,0.055)` : `rgba(10,22,30,0.08)`,
      e,
      t,
      1 + i() * 2,
      0.5 + i() * 2,
    ),
      $x(
        r.height,
        `rgba(${i() > 0.5 ? `190,190,190` : `100,100,100`},0.16)`,
        e,
        t,
        1,
        1,
      ));
  }
  for (let e = 0; e < 2200; e++) {
    let e = 260 + i() * 1528,
      t = i() * n,
      a = 3 + i() * 70;
    ($x(r.colour, `rgba(13,27,36,0.09)`, e, t, 0.5 + i(), a),
      $x(r.orm, `rgba(240,111,98,0.12)`, e, t, 1 + i() * 3, a));
  }
  for (let e of [0, 1856]) {
    eS(r, e, 0, 192, n, `#26363f`, 115, `rgb(229 141 172)`);
    for (let t = 0; t < n; t += 128) {
      eS(r, e + 14, t + 5, 164, 118, `#42535d`, 151, `rgb(243 132 180)`);
      for (let n = 0; n < 8; n++)
        (eS(
          r,
          e + 46,
          t + 25 + n * 10,
          100,
          4,
          `#162731`,
          25,
          `rgb(152 220 64)`,
        ),
          $x(r.colour, `#708185`, e + 46, t + 29 + n * 10, 100, 1));
      for (let n of [e + 24, e + 164])
        eS(r, n, t + 13, 4, 4, `#96a4a6`, 164, `rgb(224 103 211)`);
    }
  }
  for (let e of [218, 1822])
    ($x(r.colour, `#b6c3bd`, e, 0, 8, n),
      $x(r.orm, `rgb(250 172 8)`, e, 0, 8, n));
  for (let e of [682, 1362])
    for (let t = 32; t < n; t += 256)
      ($x(r.colour, `#81969d`, e, t, 5, 56),
        $x(r.orm, `rgb(248 184 8)`, e, t, 5, 56));
  for (let e of [193, 1837])
    for (let t = 0; t < n; t += 64)
      ($x(r.colour, `#b5a269`, e, t + 8, 13, 28),
        $x(r.orm, `rgb(249 190 9)`, e, t + 8, 13, 28));
  let a = r.colour;
  return (
    (a.font = `600 15px monospace`),
    (a.fillStyle = `#93a5a9`),
    a.fillText(`AG / 04`, 276, 57),
    a.fillText(`VECTOR`, 1660, 565),
    tS(r, `Circuit deck`, 32, 32, 0.13)
  );
}
function rS(e) {
  let t = 1024,
    n = Qx(t, 512, e),
    r = Xx(1109);
  eS(n, 0, 0, t, 512, `#89999e`, 144, `rgb(248 142 156)`);
  for (let e = 0; e < t; e += 256)
    for (let t = 0; t < 512; t += 128) {
      (eS(n, e + 1, t + 1, 254, 126, `#485d6a`, 35, `rgb(173 209 80)`),
        eS(n, e + 4, t + 4, 248, 120, `#9babb0`, 155, `rgb(249 134 163)`),
        eS(n, e + 5, t + 5, 246, 2, `#b3bec0`, 167, `rgb(244 108 192)`));
      for (let r of [e + 13, e + 241])
        for (let e of [t + 14, t + 114])
          eS(n, r, e, 4, 4, `#4b606b`, 69, `rgb(188 105 195)`);
      (eS(n, e + 26, t + 55, 204, 18, `#344b58`, 80, `rgb(213 176 118)`),
        eS(n, e + 28, t + 57, 200, 3, `#71848e`, 132, `rgb(235 115 184)`));
    }
  for (let e = 0; e < 4500; e++) {
    let e = r() * t,
      i = r() * 512;
    ($x(n.colour, `rgba(33,54,65,0.055)`, e, i, 10 + r() * 85, 0.5),
      $x(n.orm, `rgba(241,196,120,0.1)`, e, i, 10 + r() * 85, 1));
  }
  return tS(n, `Circuit barrier`, 16, 8, 0.075);
}
