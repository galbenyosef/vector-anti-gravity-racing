// assets__index-DF2rMRzV 46 — jsx
// Lines 83998-84337 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
var C2 = (e) =>
    [-90, -30, 30, 90, 150, 210]
      .map((t, n) => {
        let r = (t * Math.PI) / 180,
          i = (50 + e * Math.cos(r)).toFixed(1),
          a = (50 + e * Math.sin(r)).toFixed(1);
        return (n ? `L` : `M`) + i + ` ` + a;
      })
      .join(` `) + ` Z`,
  w2 = C2(49),
  T2 = C2(45),
  E2 = C2(37),
  D2 = C2(55),
  O2 = (e, t) =>
    `M${e} ${t} L${e + 3} ${t + 6} V${t + 21} L${e + 6} ${t + 27} H${e - 6} L${e - 3} ${t + 21} V${t + 6} Z`,
  k2 = {
    mines: (0, N.jsxs)(N.Fragment, {
      children: [
        Array.from({ length: 8 }, (e, t) => {
          let n = (t * Math.PI) / 4,
            r = Math.cos(n),
            i = Math.sin(n);
          return (0, N.jsx)(
            `line`,
            {
              x1: 24 + r * 11,
              y1: 24 + i * 11,
              x2: 24 + r * 17,
              y2: 24 + i * 17,
            },
            t,
          );
        }),
        (0, N.jsx)(`circle`, {
          cx: `24`,
          cy: `24`,
          r: `8.5`,
          fill: `currentColor`,
        }),
      ],
    }),
    rockets: (0, N.jsxs)(N.Fragment, {
      children: [
        (0, N.jsx)(`path`, { d: O2(11, 12), className: `fill` }),
        (0, N.jsx)(`path`, { d: O2(24, 7), className: `fill` }),
        (0, N.jsx)(`path`, { d: O2(37, 12), className: `fill` }),
      ],
    }),
    missile: (0, N.jsxs)(N.Fragment, {
      children: [
        (0, N.jsx)(`circle`, { cx: `24`, cy: `24`, r: `14` }),
        (0, N.jsx)(`path`, { d: `M24 3v10M24 35v10M3 24h10M35 24h10` }),
        (0, N.jsx)(`circle`, {
          cx: `24`,
          cy: `24`,
          r: `4`,
          fill: `currentColor`,
        }),
      ],
    }),
    cannon: (0, N.jsxs)(N.Fragment, {
      children: [
        (0, N.jsx)(`path`, {
          d: `M16 41V19M24 41V15M32 41V19`,
          strokeWidth: `4.5`,
        }),
        (0, N.jsx)(`path`, { d: `M11 41h26` }),
        (0, N.jsx)(`path`, { d: `M16 12V8M24 8V4M32 12V8`, opacity: `.6` }),
      ],
    }),
    turbo: (0, N.jsxs)(N.Fragment, {
      children: [
        (0, N.jsx)(`path`, { d: `M11 22 24 9l13 13` }),
        (0, N.jsx)(`path`, { d: `M11 32 24 19l13 13`, opacity: `.7` }),
        (0, N.jsx)(`path`, { d: `M11 42 24 29l13 13`, opacity: `.4` }),
      ],
    }),
    shield: (0, N.jsxs)(N.Fragment, {
      children: [
        (0, N.jsx)(`path`, {
          d: `M24 4 39 10v12c0 10-6.5 17.5-15 22-8.5-4.5-15-12-15-22V10Z`,
        }),
        (0, N.jsx)(`path`, {
          d: `M24 15.5 30.5 19.25v7.5L24 30.5l-6.5-3.75v-7.5Z`,
          className: `fill`,
        }),
      ],
    }),
  };
function A2({
  item: e,
  ammo: t,
  absorb: n,
  lockProgress: r,
  controller: i,
  timedLap: a,
  shield: o = 0,
  shieldDuration: s = 1,
}) {
  let c = e ? eX[e] : null,
    l = e === `missile` && r >= 1,
    u = e
      ? e === `cannon`
        ? (t / eX.cannon.ammo) * 100
        : e === `missile`
          ? Math.min(1, r) * 100
          : 100
      : 0,
    d = Math.max(0, Math.min(1, o / s)) * 100;
  return (0, N.jsxs)(`section`, {
    className:
      `weapon-hud` +
      (e ? ` armed` : ` empty`) +
      (l ? ` locked` : ``) +
      (o > 0 ? ` shielded` : ``) +
      (o > 0 && o < 1.2 ? ` shield-ending` : ``),
    style: { "--weapon": c?.color ?? `#9fb4bf`, "--shield": eX.shield.color },
    "aria-label": `Weapon inventory`,
    "data-capture-hud": !0,
    children: [
      o > 0 &&
        (0, N.jsx)(`div`, {
          className: `shield-aura`,
          "aria-hidden": `true`,
          children: (0, N.jsxs)(`svg`, {
            viewBox: `0 0 100 100`,
            children: [
              (0, N.jsx)(`path`, { d: D2, className: `shield-aura-track` }),
              (0, N.jsx)(`path`, {
                d: D2,
                className: `shield-aura-ring`,
                pathLength: 100,
                strokeDasharray: `${d} 100`,
              }),
            ],
          }),
        }),
      (0, N.jsxs)(
        `div`,
        {
          className: `weapon-emblem`,
          children: [
            (0, N.jsxs)(`svg`, {
              viewBox: `0 0 100 100`,
              "aria-hidden": `true`,
              children: [
                (0, N.jsx)(`defs`, {
                  children: (0, N.jsxs)(`radialGradient`, {
                    id: `weapon-core`,
                    cx: `50%`,
                    cy: `38%`,
                    r: `65%`,
                    children: [
                      (0, N.jsx)(`stop`, { offset: `0`, stopColor: `#173447` }),
                      (0, N.jsx)(`stop`, { offset: `1`, stopColor: `#061520` }),
                    ],
                  }),
                }),
                (0, N.jsx)(`path`, { d: w2, className: `weapon-plate` }),
                (0, N.jsx)(`path`, { d: T2, className: `weapon-ring-track` }),
                e &&
                  (0, N.jsx)(`path`, {
                    d: T2,
                    className: `weapon-ring`,
                    pathLength: 100,
                    strokeDasharray: `${u} 100`,
                  }),
                (0, N.jsx)(`path`, {
                  d: E2,
                  className: `weapon-core`,
                  fill: `url(#weapon-core)`,
                }),
                e &&
                  (0, N.jsx)(`g`, {
                    className: `weapon-glyph`,
                    transform: `translate(26 26)`,
                    children: k2[e],
                  }),
              ],
            }),
            e === `cannon` &&
              (0, N.jsx)(`b`, { className: `weapon-ammo`, children: t }),
          ],
        },
        e ?? `empty`,
      ),
      c
        ? (0, N.jsxs)(`div`, {
            className: `weapon-info`,
            children: [
              (0, N.jsx)(`strong`, { children: l ? `LOCKED` : c.name }),
              (0, N.jsxs)(`span`, {
                children: [
                  (0, N.jsx)(`kbd`, { children: i ? `□` : `SPACE` }),
                  ` `,
                  e === `shield` ? `ACTIVATE` : `FIRE`,
                  (0, N.jsx)(`kbd`, { children: i ? `○` : `X` }),
                  ` +`,
                  n,
                  ` HULL`,
                ],
              }),
            ],
          })
        : o > 0
          ? (0, N.jsxs)(`div`, {
              className: `weapon-info shield-info`,
              children: [
                (0, N.jsx)(`strong`, { children: `SHIELD UP` }),
                (0, N.jsxs)(`span`, { children: [o.toFixed(1), ` S`] }),
              ],
            })
          : a &&
            (0, N.jsx)(`div`, {
              className: `weapon-info`,
              children: (0, N.jsx)(`span`, { children: `TURBO NEXT LAP` }),
            }),
    ],
  });
}
var j2 = (e) => (e ? 3 - iZ.indexOf(e) : 0);
function M2({
  event: e,
  award: t,
  held: n,
  fresh: r,
  controller: i,
  touch: a,
}) {
  let o = t?.event === e.id ? t.earned : null,
    s = t?.event === e.id ? t.previous : n,
    c = [...EZ(e)].reverse(),
    l = c.find((e) => j2(e.medal) > j2(o)),
    u = o ?? l?.medal ?? `gold`;
  return (0, N.jsxs)(`aside`, {
    className:
      `session-medal medal-${u}` +
      (o ? ` is-earned` : ``) +
      (r && o ? ` is-fresh` : ``),
    "aria-label": `Career medal this session`,
    "data-capture-hud": !0,
    children: [
      (0, N.jsxs)(`div`, {
        className: `session-medal-main`,
        children: [
          (0, N.jsx)(`span`, {
            className: `session-medal-art`,
            children: (0, N.jsx)(`img`, { src: I0(`medal`, u), alt: `` }, u),
          }),
          (0, N.jsxs)(`div`, {
            className: `session-medal-copy`,
            children: [
              (0, N.jsx)(`span`, {
                className: `hud-label`,
                children: o ? `MEDAL EARNED` : `CAREER TARGET`,
              }),
              (0, N.jsx)(`strong`, {
                children: o
                  ? o.toUpperCase()
                  : `${l.medal.toUpperCase()} ${kJ(l.value)}`,
              }),
              (0, N.jsx)(`ol`, {
                className: `session-medal-ladder`,
                children: c.map((e) =>
                  (0, N.jsxs)(
                    `li`,
                    {
                      className:
                        `medal-${e.medal}` +
                        (j2(o) >= j2(e.medal) ? ` is-done` : ``) +
                        (e === l ? ` is-next` : ``),
                      children: [
                        (0, N.jsx)(`i`, {}),
                        kJ(e.value),
                        j2(o) >= j2(e.medal) && (0, N.jsx)(re, {}),
                      ],
                    },
                    e.medal,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
      o &&
        (0, N.jsx)(`p`, {
          className: `session-medal-hint`,
          children:
            j2(o) > j2(s)
              ? (0, N.jsxs)(N.Fragment, {
                  children: [
                    (0, N.jsx)(`kbd`, {
                      children: i ? `START` : a ? (0, N.jsx)(Ie, {}) : `ESC`,
                    }),
                    (0, N.jsxs)(`span`, {
                      children: [
                        `END SESSION TO COLLECT YOUR `,
                        o.toUpperCase(),
                        ` MEDAL`,
                      ],
                    }),
                  ],
                })
              : (0, N.jsxs)(`span`, {
                  children: [s.toUpperCase(), ` MEDAL ALREADY IN YOUR CAREER`],
                }),
        }),
    ],
  });
}
var N2 = `vector-restart-diagnostics-v1`,
  P2 = `graphics-loss-2`,
  F2 = 5e3,
  I2 = 16e3,
  L2 = 12,
  R2 = 12,
  z2 = (e, t = 240) =>
    typeof e == `string`
      ? e
          .slice(0, t)
          .split(``)
          .map((e) => (e.charCodeAt(0) < 32 ? ` ` : e))
          .join(``)
      : ``,
  B2 = (e) => (typeof e == `number` && Number.isFinite(e) ? Math.max(0, e) : 0),
  V2 = (e = {}) => ({
    mode: z2(e.mode, 32) || `initialization`,
    quality: z2(e.quality, 24),
    backend: z2(e.backend, 24),
    circuit: z2(e.circuit, 48),
    frames: B2(e.frames),
    elapsed: Math.round(B2(e.elapsed) * 10) / 10,
    textures: B2(e.textures),
    textureBytes: B2(e.textureBytes),
    gpuBytes: B2(e.gpuBytes),
    geometries: B2(e.geometries),
    drawCalls: B2(e.drawCalls),
    visible: e.visible !== !1,
  });
