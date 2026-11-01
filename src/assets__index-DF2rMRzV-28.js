// assets__index-DF2rMRzV 28 — children
// Lines 78760-79057 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function P1(e) {
  return new Set(N1.filter((t) => t.earned(e)).map((e) => e.id));
}
var F1 = {
    Award: ee,
    BadgeCheck: te,
    ChevronsUp: oe,
    Cpu: le,
    Crosshair: ue,
    Crown: de,
    Flag: me,
    Flame: he,
    Gauge: _e,
    Gem: ve,
    Ghost: ye,
    Globe: be,
    Hexagon: xe,
    Map: ke,
    Medal: je,
    Orbit: Fe,
    Radio: ze,
    Repeat: Ve,
    Rocket: He,
    Route: We,
    ShieldCheck: qe,
    Sparkles: Qe,
    Star: tt,
    Swords: nt,
    Target: rt,
    Timer: it,
    Trophy: ot,
    Users: ct,
    Wifi: ft,
    Zap: ht,
  },
  I1 = {
    bronze: [`#ffb27a`, `#d06f37`, `#6e3412`],
    silver: [`#ffffff`, `#c9d6e2`, `#5f6d7a`],
    gold: [`#fff2a8`, `#ffd43b`, `#9a6a00`],
    platinum: [`#e6feff`, `#61effb`, `#127c94`],
  },
  L1 = (e) =>
    Array.from({ length: 6 }, (t, n) => {
      let r = ((n * 60 - 90) * Math.PI) / 180;
      return `${(50 + e * Math.cos(r)).toFixed(2)},${(50 + e * Math.sin(r)).toFixed(2)}`;
    }).join(` `);
function R1({ id: e, icon: t, tier: n, size: r = 64, className: i }) {
  let a = F1[t] ?? ot,
    [o, s, c] = I1[n],
    l = e.toLowerCase();
  return (0, N.jsxs)(`svg`, {
    viewBox: `0 0 100 100`,
    width: r,
    height: r,
    className: i,
    "aria-hidden": `true`,
    children: [
      (0, N.jsxs)(`defs`, {
        children: [
          (0, N.jsxs)(`linearGradient`, {
            id: `rim-${l}`,
            x1: `0.15`,
            y1: `0`,
            x2: `0.85`,
            y2: `1`,
            children: [
              (0, N.jsx)(`stop`, { offset: `0`, stopColor: o }),
              (0, N.jsx)(`stop`, { offset: `0.45`, stopColor: s }),
              (0, N.jsx)(`stop`, { offset: `1`, stopColor: c }),
            ],
          }),
          (0, N.jsxs)(`radialGradient`, {
            id: `core-${l}`,
            cx: `0.5`,
            cy: `0.32`,
            r: `0.75`,
            children: [
              (0, N.jsx)(`stop`, { offset: `0`, stopColor: `#163a52` }),
              (0, N.jsx)(`stop`, { offset: `0.6`, stopColor: `#0a2235` }),
              (0, N.jsx)(`stop`, { offset: `1`, stopColor: `#041019` }),
            ],
          }),
        ],
      }),
      (0, N.jsx)(`polygon`, { points: L1(47), fill: `url(#rim-${l})` }),
      (0, N.jsx)(`polygon`, { points: L1(40), fill: `url(#core-${l})` }),
      (0, N.jsx)(`polygon`, {
        points: L1(37),
        fill: `none`,
        stroke: s,
        strokeOpacity: `0.35`,
        strokeWidth: `0.8`,
      }),
      (0, N.jsx)(`path`, {
        d: `M22 30 L50 14 L78 30`,
        fill: `none`,
        stroke: `#ffffff`,
        strokeOpacity: `0.12`,
        strokeWidth: `1.2`,
      }),
      (0, N.jsx)(a, {
        x: 27,
        y: 27,
        size: 46,
        color: o,
        strokeWidth: 1.7,
        absoluteStrokeWidth: !1,
      }),
    ],
  });
}
var z1 = (e) => e.status !== `locked`,
  B1 = (e) =>
    e.status === `unlocked`
      ? `UNLOCKED`
      : e.status === `pending`
        ? `SAVING TO WAVEDASH`
        : e.status === `local`
          ? `EARNED ON THIS DEVICE`
          : null;
function V1({ rows: e, onOpen: t }) {
  let n = e.filter(z1),
    r = [
      ...n,
      ...e
        .filter((e) => !z1(e))
        .sort(
          (e, t) =>
            (t.progress ? t.progress.have / t.progress.total : 0) -
            (e.progress ? e.progress.have / e.progress.total : 0),
        ),
    ].slice(0, 7);
  return (0, N.jsxs)(`section`, {
    className: `achievements-summary`,
    "aria-label": `Achievements`,
    children: [
      (0, N.jsxs)(`span`, {
        className: `challenge-eyebrow`,
        children: [(0, N.jsx)(ot, {}), ` ACHIEVEMENTS`],
      }),
      (0, N.jsxs)(`div`, {
        className: `achievements-summary-count`,
        children: [
          (0, N.jsx)(`strong`, { children: n.length }),
          (0, N.jsxs)(`span`, { children: [`/ `, e.length, ` UNLOCKED`] }),
        ],
      }),
      (0, N.jsx)(`span`, {
        className: `achievements-bar`,
        children: (0, N.jsx)(`i`, {
          style: { width: `${e.length ? (n.length / e.length) * 100 : 0}%` },
        }),
      }),
      (0, N.jsx)(`div`, {
        className: `achievements-summary-badges`,
        children: r.map((e) =>
          (0, N.jsx)(
            R1,
            {
              id: e.id,
              icon: e.icon,
              tier: e.tier,
              size: 44,
              className: z1(e) ? `is-earned` : `is-locked`,
            },
            e.id,
          ),
        ),
      }),
      (0, N.jsxs)(`button`, {
        className: `achievements-open`,
        onClick: t,
        "data-menu-initial": ``,
        children: [`VIEW ALL `, (0, N.jsx)(ae, {})],
      }),
    ],
  });
}
function H1({ rows: e }) {
  let t = e.filter(z1).length,
    n = Object.entries(C1),
    [r, i] = (0, C.useState)(`racing`);
  return (0, N.jsxs)(`div`, {
    className: `achievements-view`,
    children: [
      (0, N.jsxs)(`header`, {
        className: `achievements-view-head`,
        children: [
          (0, N.jsx)(`nav`, {
            className: `achievements-groups`,
            "aria-label": `Modes`,
            children: n.map(([t, n], a) => {
              let o = e.filter((e) => e.group === t);
              return (0, N.jsxs)(
                `button`,
                {
                  "aria-pressed": r === t,
                  onClick: () => i(t),
                  onFocus: () => i(t),
                  "data-menu-initial": a ? void 0 : ``,
                  children: [
                    n,
                    (0, N.jsxs)(`b`, {
                      children: [o.filter(z1).length, `/`, o.length],
                    }),
                  ],
                },
                t,
              );
            }),
          }),
          (0, N.jsxs)(`div`, {
            className: `achievements-summary-count`,
            children: [
              (0, N.jsx)(`strong`, { children: t }),
              (0, N.jsxs)(`span`, { children: [`/ `, e.length, ` UNLOCKED`] }),
            ],
          }),
          (0, N.jsx)(`span`, {
            className: `achievements-bar`,
            children: (0, N.jsx)(`i`, {
              style: { width: `${e.length ? (t / e.length) * 100 : 0}%` },
            }),
          }),
        ],
      }),
      (0, N.jsx)(`ol`, {
        className: `achievements-grid`,
        "aria-label": `${C1[r]} achievements`,
        children: e
          .filter((e) => e.group === r)
          .map((e) => {
            let t = z1(e),
              n = B1(e);
            return (0, N.jsxs)(
              `li`,
              {
                className: `achievement-card tier-${e.tier}${t ? ` is-earned` : ``}`,
                "data-achievement": e.id,
                children: [
                  (0, N.jsx)(R1, {
                    id: e.id,
                    icon: e.icon,
                    tier: e.tier,
                    size: 56,
                  }),
                  (0, N.jsxs)(`div`, {
                    children: [
                      (0, N.jsxs)(`span`, {
                        className: `achievement-group`,
                        children: [C1[e.group], ` · `, e.tier.toUpperCase()],
                      }),
                      (0, N.jsx)(`strong`, { children: e.title }),
                      (0, N.jsx)(`p`, { children: e.description }),
                      t
                        ? (0, N.jsxs)(`output`, {
                            className: `achievement-state`,
                            children: [(0, N.jsx)(re, {}), ` `, n],
                          })
                        : e.progress && e.progress.total > 1
                          ? (0, N.jsxs)(`span`, {
                              className: `achievement-progress`,
                              children: [
                                (0, N.jsx)(`span`, {
                                  className: `achievements-bar`,
                                  children: (0, N.jsx)(`i`, {
                                    style: {
                                      width: `${(e.progress.have / e.progress.total) * 100}%`,
                                    },
                                  }),
                                }),
                                e.progress.have.toLocaleString(`en-GB`),
                                ` / `,
                                e.progress.total.toLocaleString(`en-GB`),
                              ],
                            })
                          : (0, N.jsxs)(`output`, {
                              className: `achievement-state is-locked`,
                              children: [(0, N.jsx)(De, {}), ` LOCKED`],
                            }),
                    ],
                  }),
                ],
              },
              e.id,
            );
          }),
      }),
    ],
  });
}
var U1 = (e) => Math.floor(e).toLocaleString(`en-GB`);
function W1(e) {
  let t = Math.floor(e / 6e4);
  return t >= 60
    ? `${U1(t / 60)}h ${t % 60}m`
    : `${t}m ${Math.floor(e / 1e3) % 60}s`;
}
