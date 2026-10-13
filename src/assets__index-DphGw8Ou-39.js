// assets__index-DphGw8Ou 39 — children
// Lines 81638-81846 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function D0({ event: e, progress: t, locked: n, onStart: r }) {
  let i = BZ.find((t) => t.id === e.tier),
    a = UZ[e.kind],
    o = w0(e),
    s = t.medals[e.id],
    c = t.best[e.id],
    l = T0(e, t),
    u = S0[e.kind];
  return (0, N.jsxs)(`aside`, {
    className: `career-briefing${s ? ` has-award` : ``}`,
    "aria-live": `polite`,
    children: [
      (0, N.jsx)(u0, {
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
                let n = vJ.find((t) => t.id === e.circuit);
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
                children: [`POINTS `, bQ.join(` · `)],
              }),
            ],
          })
        : (0, N.jsxs)(`div`, {
            className: `career-briefing-circuit`,
            children: [
              (0, N.jsx)(YX, {
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
      nQ(e) &&
        (0, N.jsx)(`ol`, {
          className: `career-targets`,
          "aria-label": `Medal targets`,
          children: oQ(e).map((e) =>
            (0, N.jsxs)(
              `li`,
              {
                className: s === e.medal ? `is-earned` : ``,
                children: [
                  (0, N.jsx)(XX, {
                    medal: e.medal,
                    earned: !!s && RZ.indexOf(s) <= RZ.indexOf(e.medal),
                    size: 24,
                  }),
                  (0, N.jsx)(`span`, { children: e.medal.toUpperCase() }),
                  (0, N.jsx)(`b`, {
                    children:
                      e.unit === `position`
                        ? C0(e.value)
                        : e.unit === `orbs`
                          ? `${e.value} / ${sX.count}`
                          : CJ(e.value),
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
                ? `${C0(c)} OVERALL`
                : e.kind === `race`
                  ? `${C0(c)} PLACE`
                  : e.kind === `orbs`
                    ? `${c} / ${sX.count} ORBS`
                    : CJ(c)
              : `NOT RACED`,
          }),
        ],
      }),
      l &&
        (0, N.jsxs)(`p`, {
          className: `career-lock`,
          children: [(0, N.jsx)(Oe, {}), ` `, l],
        }),
      (0, N.jsxs)(`button`, {
        id: `career-start`,
        className: `career-start`,
        disabled: !!l || n,
        onClick: r,
        children: [
          (0, N.jsx)(Re, {}),
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
        ],
      }),
    ],
  });
}
var O0 = (e) =>
  (vJ.find((t) => t.id === e)?.name ?? e).replace(` MK III`, ``).toUpperCase();
function k0({ tournament: e }) {
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
                (0, N.jsx)(`span`, { children: A0(t + 1) }),
                (0, N.jsx)(`i`, { style: { background: e.color } }),
                (0, N.jsx)(`strong`, { children: e.name }),
                (0, N.jsx)(`em`, {
                  children: e.last ? `+${bQ[e.last - 1] ?? 0}` : ``,
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
var A0 = (e) =>
    `${e}${e === 1 ? `ST` : e === 2 ? `ND` : e === 3 ? `RD` : `TH`}`,
  j0 = [`gold`, `silver`, `bronze`];
