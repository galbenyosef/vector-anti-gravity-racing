// assets__game-CsnOSIff 39 — math
// Lines 11777-12042 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var am = {
    a: [0, 1.92, 1.2, 2.2],
    b: [0.92, 1.1, 1.2, 2.2],
    c: [0.92, 0, 1.2, 1.1],
    d: [0, 0, 1.2, 0.28],
    e: [0, 0, 0.28, 1.1],
    f: [0, 1.1, 0.28, 2.2],
    g: [0, 0.96, 1.2, 1.24],
  },
  om = [
    `abcdef`,
    `bc`,
    `abged`,
    `abgcd`,
    `fgbc`,
    `afgcd`,
    `afgedc`,
    `abc`,
    `abcdefg`,
    `abcdfg`,
  ],
  sm = [
    {
      title: `MERIDIAN`,
      sub: `GRAND PRIX · CIRCUIT 05`,
      bg: [`#2a40d6`, `#1a2a9c`],
      ink: `#ffffff`,
      accent: `#b9c6ff`,
      motif: `laurel`,
    },
    {
      title: `VECTOR`,
      sub: `WORLD RACING LEAGUE`,
      bg: [`#11141b`, `#07080c`],
      ink: `#ffffff`,
      accent: `#ff6b29`,
      motif: `chevrons`,
    },
    {
      title: `AURELIAN`,
      sub: `HOTELS & RESIDENCES · MERIDIAN`,
      bg: [`#2a1d10`, `#140d07`],
      ink: `#f1d08e`,
      accent: `#d9a84e`,
      motif: `sunburst`,
      font: `italic 700 74px Georgia, serif`,
    },
    {
      title: `KIRIN`,
      sub: `PRECISION / VELOCITY`,
      bg: [`#05211a`, `#02100c`],
      ink: `#ffffff`,
      accent: `#3dffaa`,
      motif: `rings`,
    },
    {
      title: `CROWN LINE`,
      sub: `MAGLEV · STREET TO SUMMIT IN 90 S`,
      bg: [`#24306e`, `#141a40`],
      ink: `#e9d7ae`,
      accent: `#c8b28a`,
      motif: `bars`,
    },
    {
      title: `STRATOS`,
      sub: `ENGINEERED TO FLY`,
      bg: [`#101a3c`, `#080d20`],
      ink: `#ffffff`,
      accent: `#ffcf55`,
      motif: `chevrons`,
    },
    {
      title: `ORBIS`,
      sub: `THE EYE · SUITES IN THE SKY`,
      bg: [`#2c1660`, `#170a34`],
      ink: `#ffffff`,
      accent: `#ff86e0`,
      motif: `rings`,
    },
    {
      title: `LEVIATHAN`,
      sub: `FREIGHT · FLYING STORAGE`,
      bg: [`#1b2026`, `#0c0e11`],
      ink: `#ffffff`,
      accent: `#ff8a3d`,
      motif: `stack`,
    },
  ],
  cm = 128,
  lm = 1024;
function um(e, t, n) {
  let r = n * cm;
  (e.save(),
    e.beginPath(),
    e.rect(0, r, lm, cm),
    e.clip(),
    (e.fillStyle = `#000`),
    e.fillRect(0, r, lm, cm));
  let i = e.createLinearGradient(0, r + 6, 0, r + cm - 6);
  (i.addColorStop(0, t.bg[0]),
    i.addColorStop(1, t.bg[1]),
    (e.fillStyle = i),
    e.fillRect(0, r + 6, lm, cm - 12));
  let a = r + cm / 2;
  switch (((e.fillStyle = t.accent), (e.strokeStyle = t.accent), t.motif)) {
    case `chevrons`:
      for (let t = 0; t < 3; t++) {
        let n = 40 + t * 46;
        ((e.globalAlpha = 1 - t * 0.25),
          e.beginPath(),
          e.moveTo(n, r + 22),
          e.lineTo(n + 26, r + 22),
          e.lineTo(n + 58, a),
          e.lineTo(n + 26, r + cm - 22),
          e.lineTo(n, r + cm - 22),
          e.lineTo(n + 32, a),
          e.fill());
      }
      e.globalAlpha = 1;
      for (let t = 0; t < 3; t++) {
        let n = 900 + t * 34;
        ((e.globalAlpha = 0.35 + t * 0.3),
          e.beginPath(),
          e.moveTo(n, r + 34),
          e.lineTo(n + 16, r + 34),
          e.lineTo(n + 36, a),
          e.lineTo(n + 16, r + cm - 34),
          e.lineTo(n, r + cm - 34),
          e.lineTo(n + 20, a),
          e.fill());
      }
      e.globalAlpha = 1;
      break;
    case `rings`:
      e.lineWidth = 7;
      for (let t of [16, 30, 44])
        (e.beginPath(), e.arc(110, a, t, 0, Math.PI * 2), e.stroke());
      ((e.lineWidth = 5),
        e.beginPath(),
        e.arc(940, a, 30, 0, Math.PI * 2),
        e.stroke());
      break;
    case `sunburst`:
      for (let t = 0; t < 18; t++) {
        let n = (t / 18) * Math.PI * 2;
        (e.beginPath(),
          e.moveTo(110, a),
          e.arc(110, a, 48, n, n + Math.PI / 36),
          e.fill());
      }
      ((e.fillStyle = t.bg[1]),
        e.beginPath(),
        e.arc(110, a, 20, 0, Math.PI * 2),
        e.fill(),
        (e.fillStyle = t.accent),
        e.beginPath(),
        e.arc(110, a, 12, 0, Math.PI * 2),
        e.fill(),
        e.fillRect(860, a - 2, 120, 4));
      break;
    case `bars`:
      for (let t = 0; t < 4; t++)
        ((e.globalAlpha = 1 - t * 0.2),
          e.fillRect(36 + t * 18, r + 30 + t * 18, 150 - t * 36, 10));
      ((e.globalAlpha = 1), e.fillRect(0, r + cm - 22, lm, 6));
      break;
    case `stack`:
      for (let t = 0; t < 6; t++) {
        let n = 40 + (t % 3) * 52,
          i = r + 26 + Math.floor(t / 3) * 40;
        ((e.globalAlpha = 0.55 + ((t * 37) % 5) * 0.1),
          e.fillRect(n, i, 46, 34));
      }
      e.globalAlpha = 1;
      break;
    case `laurel`:
      e.lineWidth = 5;
      for (let t of [-1, 1])
        for (let n = 0; n < 5; n++) {
          let r = Math.PI / 2 + t * (0.35 + n * 0.42),
            i = 120 + Math.cos(r) * 40,
            o = a + Math.sin(r) * 40;
          (e.beginPath(),
            e.ellipse(i, o, 13, 6, r + Math.PI / 2, 0, Math.PI * 2),
            e.fill());
        }
      ((e.font = `italic 900 40px Arial`),
        (e.textAlign = `center`),
        (e.textBaseline = `middle`),
        (e.fillStyle = t.ink),
        e.fillText(`05`, 120, a + 2),
        (e.fillStyle = t.accent));
      for (let t = 0; t < 4; t++) e.fillRect(880 + t * 30, r + 30, 14, cm - 60);
      break;
  }
  ((e.textAlign = `left`),
    (e.textBaseline = `alphabetic`),
    (e.fillStyle = t.ink),
    (e.font = t.font ?? `italic 900 84px Arial`),
    e.fillText(t.title, 220, r + 86, 470));
  let o = Math.min(470, e.measureText(t.title).width);
  ((e.fillStyle = t.accent),
    (e.font = `bold 22px Arial`),
    e.fillText(t.sub, 240 + o, r + 84, 840 - o - 240),
    e.restore());
}
function dm(e) {
  if (typeof document > `u`) {
    let e = new Uint8Array(32 * Rp * 4);
    sm.forEach((t, n) => {
      let r = new _(t.bg[0]);
      for (let t = 0; t < 4; t++)
        for (let i = 0; i < 4; i++) {
          let a = (((Rp - 1 - n) * 4 + t) * 4 + i) * 4;
          e.set([r.r * 255, r.g * 255, r.b * 255, 255], a);
        }
    });
    let t = new re(e, 4, Rp * 4);
    return ((t.colorSpace = st), (t.wrapS = qe), (t.needsUpdate = !0), t);
  }
  let t = kl(lm, cm * Rp, e),
    n = document.createElement(`canvas`);
  ((n.width = t.width), (n.height = t.height));
  let r = n.getContext(`2d`);
  (r.scale(t.width / lm, t.height / (cm * Rp)),
    sm.forEach((e, t) => um(r, e, t)));
  let i = new p(n);
  return (
    (i.colorSpace = st),
    (i.wrapS = qe),
    (i.wrapT = x),
    (i.anisotropy = 8),
    i
  );
}
function fm(e) {
  let t = e ? 64 : 128,
    n = new Uint8Array(t * t * 4),
    r = (t / 128) * 1.6;
  for (let e = 0; e < t; e++)
    for (let i = 0; i < t; i++) {
      let a = i / t,
        o = e / t,
        s = Math.abs(((a * 6 + o * 6) % 1) - 0.5) * (t / 6),
        c = Math.abs(((a * 6 - o * 6 + 6) % 1) - 0.5) * (t / 6),
        l = Math.abs(((o * 2) % 1) - 0.5) * (t / 2),
        u =
          Math.max(
            1 - Math.max(0, t / 12 - s - r) / 1.2,
            1 - Math.max(0, t / 12 - c - r) / 1.2,
            +(l > t / 4 - r * 1.4),
          ) > 0.5,
        d = (e * t + i) * 4;
      n.set([255, 255, 255, u ? 255 : 0], d);
    }
  let i = new re(n, t, t);
  return (
    (i.wrapS = i.wrapT = qe),
    (i.magFilter = Fe),
    (i.minFilter = m),
    (i.generateMipmaps = !0),
    (i.anisotropy = 4),
    (i.needsUpdate = !0),
    i
  );
}
