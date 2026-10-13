// assets__game-CsnOSIff 94 — math
// Lines 39169-39198 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function qC(e, t, n, r) {
  return r && YC(n) === `mp4` && t > 30 ? Math.round((e * 30) / t) : e;
}
function JC(e, t = 30) {
  let n = e ? `,mp4a.40.2` : ``;
  return [
    ...(t > 30
      ? [`64002a`, `42002a`, `640028`, `420028`]
      : [`640028`, `420028`, `42001f`, `42E01E`]
    ).map((e) => `video/mp4;codecs=avc1.${e}${n}`),
    `video/mp4;codecs=avc1${n}`,
    ...(e
      ? [
          `video/webm;codecs=vp8,opus`,
          `video/webm;codecs=vp9,opus`,
          `video/webm`,
        ]
      : [`video/webm;codecs=vp8`, `video/webm;codecs=vp9`, `video/webm`]),
  ];
}
function YC(e) {
  return e.toLowerCase().startsWith(`video/mp4`) ? `mp4` : `webm`;
}
function XC(e, t, n, r) {
  if (![e, t, n, r].every((e) => Number.isFinite(e) && e > 0)) return null;
  let i = Math.min(n / e, r / t),
    a = e * i,
    o = t * i;
  return { x: (n - a) / 2, y: (r - o) / 2, width: a, height: o };
}
