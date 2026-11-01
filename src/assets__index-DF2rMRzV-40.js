// assets__index-DF2rMRzV 40 — children
// Lines 81900-82113 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function K0({ event: e, progress: t, locked: n, onStart: r }) {
  let i = oZ.find((t) => t.id === e.tier),
    a = lZ[e.kind],
    o = U0(e),
    s = t.medals[e.id],
    c = t.best[e.id],
    l = W0(e, t),
    u = V0[e.kind];
  return (0, N.jsxs)(`aside`, {
    className: `career-briefing${s ? ` has-award` : ``}`,
    "aria-live": `polite`,
    children: [
      (0, N.jsx)(L0, {
        kind: `medal`,
        metal: s ?? `gold`,
        hidden: !s,
        label: `${s} medal won`,
        className: `career-briefing-award`,
      }),
      (0, N.jsxs)(`span`, {
        className: `career-briefing-kicker`,
        children: [
          (0, N.jsx)(u, {}),
          ` `,
          i.name,
          ` · EVENT `,
          String(e.number).padStart(2, `0`),
          e.reverse &&
            (0, N.jsx)(`b`, {
              className: `career-reverse-tag`,
              children: `REVERSE`,
            }),
        ],
      }),
      (0, N.jsx)(`h3`, { children: a.name }),
      (0, N.jsx)(`p`, { className: `career-briefing-copy`, children: a.brief }),
      e.rounds
        ? (0, N.jsxs)(`ol`, {
            className: `career-rounds`,
            "aria-label": `Tournament rounds`,
            children: [
              e.rounds.map((e, t) => {
                let n = wJ.find((t) => t.id === e.circuit);
                return (0, N.jsxs)(
                  `li`,
                  {
                    children: [
                      (0, N.jsxs)(`span`, { children: [`R`, t + 1] }),
                      (0, N.jsx)(`strong`, {
                        children: n.name.replace(` MK III`, ``).toUpperCase(),
                      }),
                      e.reverse &&
                        (0, N.jsx)(`b`, {
                          className: `career-reverse-tag`,
                          children: `REVERSE`,
                        }),
                    ],
                  },
                  t,
                );
              }),
              (0, N.jsxs)(`li`, {
                className: `career-rounds-points`,
                children: [`POINTS `, BZ.join(` · `)],
              }),
            ],
          })
        : (0, N.jsxs)(`div`, {
            className: `career-briefing-circuit`,
            children: [
              (0, N.jsx)(qZ, {
                path: o.mapPath,
                label: `${o.name} circuit map`,
              }),
              (0, N.jsxs)(`div`, {
                children: [
                  (0, N.jsx)(`strong`, {
                    children: o.name.replace(` MK III`, ``).toUpperCase(),
                  }),
                  (0, N.jsxs)(`span`, {
                    children: [
                      o.timeOfDay,
                      ` · `,
                      o.lengthLabel,
                      ` ·`,
                      ` `,
                      e.kind === `race` ? `${o.laps} LAPS` : `OPEN LAPS`,
                      e.reverse && ` · REVERSE`,
                    ],
                  }),
                ],
              }),
            ],
          }),
      SZ(e) &&
        (0, N.jsx)(`ol`, {
          className: `career-targets`,
          "aria-label": `Medal targets`,
          children: EZ(e).map((e) =>
            (0, N.jsxs)(
              `li`,
              {
                className: s === e.medal ? `is-earned` : ``,
                children: [
                  (0, N.jsx)(JZ, {
                    medal: e.medal,
                    earned: !!s && iZ.indexOf(s) <= iZ.indexOf(e.medal),
                    size: 24,
                  }),
                  (0, N.jsx)(`span`, { children: e.medal.toUpperCase() }),
                  (0, N.jsx)(`b`, {
                    children:
                      e.unit === `position`
                        ? H0(e.value)
                        : e.unit === `orbs`
                          ? `${e.value} / ${pX.count}`
                          : kJ(e.value),
                  }),
                ],
              },
              e.medal,
            ),
          ),
        }),
      (0, N.jsxs)(`div`, {
        className: `career-best`,
        children: [
          (0, N.jsx)(`span`, { children: `YOUR BEST` }),
          (0, N.jsx)(`b`, {
            children: c
              ? e.kind === `tournament`
                ? `${H0(c)} OVERALL`
                : e.kind === `race`
                  ? `${H0(c)} PLACE`
                  : e.kind === `orbs`
                    ? `${c} / ${pX.count} ORBS`
                    : kJ(c)
              : `NOT RACED`,
          }),
        ],
      }),
      l &&
        (0, N.jsxs)(`p`, {
          className: `career-lock`,
          children: [(0, N.jsx)(De, {}), ` `, l],
        }),
      (0, N.jsxs)(`button`, {
        id: `career-start`,
        className: `career-start front-primary`,
        "data-pad": `start`,
        disabled: !!l || n,
        onClick: r,
        children: [
          (0, N.jsx)(Le, {}),
          (0, N.jsxs)(`span`, {
            children: [
              `START EVENT`,
              (0, N.jsx)(`small`, {
                children: l
                  ? `LOCKED`
                  : `${e.rounds ? `${e.rounds.length} RACES` : o.name.replace(` MK III`, ``).toUpperCase()} · OR HOLD A / ✕ ON ITS HEX`,
              }),
            ],
          }),
          (0, N.jsx)(Wi, { pad: `☰` }),
        ],
      }),
    ],
  });
}
var q0 = `1.13`,
  J0 = (e) =>
    (wJ.find((t) => t.id === e)?.name ?? e)
      .replace(` MK III`, ``)
      .toUpperCase();
function Y0({ tournament: e }) {
  return (0, N.jsxs)(`div`, {
    className: `tournament-standings`,
    children: [
      (0, N.jsxs)(`h3`, {
        children: [
          `STANDINGS`,
          (0, N.jsxs)(`small`, {
            children: [`AFTER ROUND `, e.round + 1, ` OF `, e.rounds.length],
          }),
        ],
      }),
      (0, N.jsx)(`ol`, {
        "aria-label": `Tournament standings`,
        children: e.standings.map((e, t) =>
          (0, N.jsxs)(
            `li`,
            {
              className: e.id === `player` ? `is-player` : ``,
              children: [
                (0, N.jsx)(`span`, { children: X0(t + 1) }),
                (0, N.jsx)(`i`, { style: { background: e.color } }),
                (0, N.jsx)(`strong`, { children: e.name }),
                (0, N.jsx)(`em`, {
                  children: e.last ? `+${BZ[e.last - 1] ?? 0}` : ``,
                }),
                (0, N.jsx)(`b`, { children: e.points }),
              ],
            },
            e.id,
          ),
        ),
      }),
    ],
  });
}
var X0 = (e) =>
    `${e}${e === 1 ? `ST` : e === 2 ? `ND` : e === 3 ? `RD` : `TH`}`,
  Z0 = [`gold`, `silver`, `bronze`];
