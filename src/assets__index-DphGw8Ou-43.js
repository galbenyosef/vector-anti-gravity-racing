// assets__index-DphGw8Ou 43 — children
// Lines 82958-83259 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function t2({
  item: e,
  ammo: t,
  absorb: n,
  lockProgress: r,
  controller: i,
  timedLap: a,
  shield: o = 0,
  shieldDuration: s = 1,
}) {
  let c = e ? JY[e] : null,
    l = e === `missile` && r >= 1,
    u = e
      ? e === `cannon`
        ? (t / JY.cannon.ammo) * 100
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
    style: { "--weapon": c?.color ?? `#9fb4bf`, "--shield": JY.shield.color },
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
              (0, N.jsx)(`path`, { d: Q0, className: `shield-aura-track` }),
              (0, N.jsx)(`path`, {
                d: Q0,
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
                (0, N.jsx)(`path`, { d: Y0, className: `weapon-plate` }),
                (0, N.jsx)(`path`, { d: X0, className: `weapon-ring-track` }),
                e &&
                  (0, N.jsx)(`path`, {
                    d: X0,
                    className: `weapon-ring`,
                    pathLength: 100,
                    strokeDasharray: `${u} 100`,
                  }),
                (0, N.jsx)(`path`, {
                  d: Z0,
                  className: `weapon-core`,
                  fill: `url(#weapon-core)`,
                }),
                e &&
                  (0, N.jsx)(`g`, {
                    className: `weapon-glyph`,
                    transform: `translate(26 26)`,
                    children: e2[e],
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
var n2 = (e) => (e ? 3 - RZ.indexOf(e) : 0);
function r2({
  event: e,
  award: t,
  held: n,
  fresh: r,
  controller: i,
  touch: a,
}) {
  let o = t?.event === e.id ? t.earned : null,
    s = t?.event === e.id ? t.previous : n,
    c = [...oQ(e)].reverse(),
    l = c.find((e) => n2(e.medal) > n2(o)),
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
            children: (0, N.jsx)(`img`, { src: l0(`medal`, u), alt: `` }, u),
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
                  : `${l.medal.toUpperCase()} ${CJ(l.value)}`,
              }),
              (0, N.jsx)(`ol`, {
                className: `session-medal-ladder`,
                children: c.map((e) =>
                  (0, N.jsxs)(
                    `li`,
                    {
                      className:
                        `medal-${e.medal}` +
                        (n2(o) >= n2(e.medal) ? ` is-done` : ``) +
                        (e === l ? ` is-next` : ``),
                      children: [
                        (0, N.jsx)(`i`, {}),
                        CJ(e.value),
                        n2(o) >= n2(e.medal) && (0, N.jsx)(j, {}),
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
            n2(o) > n2(s)
              ? (0, N.jsxs)(N.Fragment, {
                  children: [
                    (0, N.jsx)(`kbd`, {
                      children: i ? `START` : a ? (0, N.jsx)(Le, {}) : `ESC`,
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
var i2 = `vector-restart-diagnostics-v1`,
  a2 = `graphics-loss-2`,
  o2 = 5e3,
  s2 = 16e3,
  c2 = 12,
  l2 = 12,
  u2 = (e, t = 240) =>
    typeof e == `string`
      ? e
          .slice(0, t)
          .split(``)
          .map((e) => (e.charCodeAt(0) < 32 ? ` ` : e))
          .join(``)
      : ``,
  d2 = (e) => (typeof e == `number` && Number.isFinite(e) ? Math.max(0, e) : 0),
  f2 = (e = {}) => ({
    mode: u2(e.mode, 32) || `initialization`,
    quality: u2(e.quality, 24),
    backend: u2(e.backend, 24),
    circuit: u2(e.circuit, 48),
    frames: d2(e.frames),
    elapsed: Math.round(d2(e.elapsed) * 10) / 10,
    textures: d2(e.textures),
    textureBytes: d2(e.textureBytes),
    gpuBytes: d2(e.gpuBytes),
    geometries: d2(e.geometries),
    drawCalls: d2(e.drawCalls),
    visible: e.visible !== !1,
  });
function p2(e) {
  if (!e || typeof e != `object`) return null;
  let t = e;
  return typeof t.bootId != `string` ||
    typeof t.startedAt != `number` ||
    !t.sample ||
    typeof t.sample != `object`
    ? null
    : {
        bootId: u2(t.bootId, 80),
        build: u2(t.build, 40),
        startedAt: d2(t.startedAt),
        timeOrigin: d2(t.timeOrigin),
        navigation: u2(t.navigation, 32),
        browser: u2(t.browser),
        embedded: t.embedded === !0,
        lastAt: d2(t.lastAt),
        lifecycle: [`active`, `hidden`, `pagehide`, `disposed`].includes(
          t.lifecycle ?? ``,
        )
          ? t.lifecycle
          : `active`,
        restart: u2(t.restart, 64),
        failure: u2(t.failure),
        errors: d2(t.errors),
        sample: f2(t.sample),
        memoryHistory: Array.isArray(t.memoryHistory)
          ? t.memoryHistory
              .slice(-l2)
              .filter((e) => e && typeof e == `object`)
              .map((e) => ({
                at: d2(e.at),
                frames: d2(e.frames),
                gpuBytes: d2(e.gpuBytes),
                textureBytes: d2(e.textureBytes),
                textures: d2(e.textures),
                geometries: d2(e.geometries),
              }))
          : [],
        events: Array.isArray(t.events)
          ? t.events
              .slice(-c2)
              .filter((e) => e && typeof e == `object`)
              .map((e) => ({
                at: d2(e.at),
                kind: u2(e.kind, 32),
                detail: u2(e.detail),
              }))
          : [],
      };
}
