// assets__index-DF2rMRzV 41 — children
// Lines 82114-82576 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function Q0({
  hud: e,
  circuit: t,
  dnf: n,
  career: r,
  onRetry: i,
  onNext: a,
  onNextRound: o,
  onLeaderboards: s,
  onRetrySubmit: c,
  onCareer: l,
  onSetup: u,
  onMenu: d,
}) {
  let f = e.kind === `timed-lap`,
    p = e.orbs,
    m = e.online.active,
    h = vZ.find((t) => t.id === e.career.event),
    g = h && e.career.award?.event === h.id ? e.career.award : null,
    _ = h ? (r.medals[h.id] ?? null) : null,
    v = h ? MZ(r, h.id) : null,
    y = h && oZ.find((e) => e.id === h.tier),
    b =
      h?.rounds && e.career.tournament?.event === h.id
        ? e.career.tournament
        : null,
    x = !!b && !b.final,
    S = x ? b.rounds[b.round + 1] : void 0,
    C = b ? b.standings.findIndex((e) => e.id === `player`) + 1 : 0,
    w = !h && !f && !n && e.position <= 3 ? Z0[e.position - 1] : null,
    T = g?.earned ?? null,
    E = x
      ? `ROUND ${b.round + 1} DONE.`
      : h
        ? T
          ? `${T.toUpperCase()} MEDAL.`
          : `EVENT COMPLETE.`
        : f
          ? `SESSION COMPLETE.`
          : n
            ? `RACE ENDED.`
            : e.position === 1
              ? `VICTORY.`
              : e.position <= 3
                ? `PODIUM.`
                : `FINISH LINE.`,
    D = h ? EZ(h) : [],
    O = (e) => {
      let t = D.find((t) => t.medal === e);
      return t
        ? t.unit === `position`
          ? X0(t.value)
          : t.unit === `orbs`
            ? `${t.value} / ${pX.count}`
            : kJ(t.value)
        : ``;
    },
    k = m
      ? `RACE ROOM / REMATCH`
      : b
        ? `RETRY TOURNAMENT`
        : h
          ? `RETRY EVENT`
          : f
            ? `NEW TIMED SESSION`
            : `RACE AGAIN`,
    A = _ === `gold` ? null : iZ[(_ ? iZ.indexOf(_) : 3) - 1],
    j = x
      ? `YOU ARE ${X0(C)} OVERALL · ${b.standings[C - 1]?.points ?? 0} PTS`
      : p
        ? `${p.taken} OF ${p.total} ORBS`
        : f
          ? `${e.completedLaps} ${e.completedLaps === 1 ? `LAP` : `LAPS`} COMPLETED`
          : n
            ? `DID NOT FINISH`
            : `${X0(e.position)} OF ${e.totalRacers}`,
    ee = f
      ? [
          [`SESSION BEST`, kJ(e.sessionBest), !0],
          [`SESSION TIME`, kJ(e.elapsed)],
          [`PERSONAL BEST`, kJ(e.bestLap)],
        ]
      : [
          [p ? `LAP TIME` : `RACE TIME`, n ? `DNF` : kJ(e.elapsed)],
          [`BEST LAP`, kJ(e.sessionBest), !0],
          [`PERSONAL BEST`, kJ(e.bestLap)],
        ];
  return (0, N.jsx)(`div`, {
    className: `front-results`,
    children: (0, N.jsxs)(`section`, {
      className: `front-results-screen`,
      "data-menu-scope": `results`,
      "aria-labelledby": `results-title`,
      children: [
        (0, N.jsxs)(`div`, {
          className: `front-results-main`,
          children: [
            (0, N.jsxs)(`span`, {
              className: `front-kicker is-hot`,
              children: [
                t.name.replace(` MK III`, ``).toUpperCase(),
                ` ·`,
                ` `,
                h
                  ? `${y?.name} · EVENT ${String(h.number).padStart(2, `0`)} · ${lZ[h.kind].name}${b ? ` · ROUND ${b.round + 1} OF ${b.rounds.length}` : ``}`
                  : f
                    ? `TIMED LAP`
                    : m
                      ? `ONLINE RACE`
                      : p
                        ? `ORBS`
                        : `SINGLE RACE · ${e.totalLaps} ${e.totalLaps === 1 ? `LAP` : `LAPS`}`,
                e.modifiers.direction === `reverse` ? ` · REVERSE` : ``,
              ],
            }),
            (0, N.jsx)(`h2`, {
              id: `results-title`,
              className: `front-results-title`,
              children: E,
            }),
            (0, N.jsx)(`p`, { className: `front-results-place`, children: j }),
            (0, N.jsx)(`dl`, {
              className: `front-results-tiles`,
              children: ee.map(([e, t, n]) =>
                (0, N.jsxs)(
                  `div`,
                  {
                    className: n ? `is-best` : void 0,
                    children: [
                      (0, N.jsx)(`dt`, { children: e }),
                      (0, N.jsx)(`dd`, { children: t }),
                    ],
                  },
                  e,
                ),
              ),
            }),
            f &&
              !e.completedLaps &&
              (0, N.jsx)(`p`, {
                className: `session-summary`,
                children: `No complete laps. Finish a full lap to set a time.`,
              }),
            b
              ? (0, N.jsx)(Y0, { tournament: b })
              : (0, N.jsx)(`ol`, {
                  className: `front-results-laps`,
                  "aria-label": `Lap times`,
                  children: e.lapTimes.map((t, n) =>
                    (0, N.jsxs)(
                      `li`,
                      {
                        className: t === e.sessionBest ? `is-best` : void 0,
                        children: [
                          (0, N.jsxs)(`span`, {
                            children: [
                              `LAP`,
                              ` `,
                              String(
                                e.completedLaps - e.lapTimes.length + n + 1,
                              ).padStart(2, `0`),
                              t === e.sessionBest && ` · BEST`,
                            ],
                          }),
                          (0, N.jsx)(`strong`, { children: kJ(t) }),
                        ],
                      },
                      n,
                    ),
                  ),
                }),
            !n &&
              !h &&
              (0, N.jsxs)(`div`, {
                className: `leaderboard-result`,
                "data-status": e.leaderboards.result.status,
                children: [
                  (0, N.jsx)(`output`, {
                    children: e.leaderboards.result.message,
                  }),
                  e.leaderboards.result.status === `saved` &&
                    (0, N.jsxs)(`strong`, {
                      children: [
                        `YOUR BEST `,
                        kJ(e.leaderboards.result.best),
                        ` · #`,
                        e.leaderboards.result.rank,
                      ],
                    }),
                  e.leaderboards.result.status === `failed` &&
                    (0, N.jsx)(`button`, {
                      className: `front-ghost`,
                      onClick: c,
                      children: `RETRY SUBMISSION`,
                    }),
                ],
              }),
          ],
        }),
        (0, N.jsx)(`figure`, {
          className: `front-results-award`,
          children:
            x && S
              ? (0, N.jsxs)(`div`, {
                  className: `tournament-next`,
                  children: [
                    (0, N.jsxs)(`span`, {
                      children: [
                        `UP NEXT · ROUND `,
                        b.round + 2,
                        ` OF`,
                        ` `,
                        b.rounds.length,
                      ],
                    }),
                    (0, N.jsx)(qZ, {
                      path: wJ.find((e) => e.id === S.circuit)?.mapPath ?? ``,
                      label: `${J0(S.circuit)} circuit map`,
                    }),
                    (0, N.jsx)(`strong`, { children: J0(S.circuit) }),
                    S.reverse &&
                      (0, N.jsx)(`b`, {
                        className: `career-reverse-tag`,
                        children: `REVERSE`,
                      }),
                  ],
                })
              : h
                ? (0, N.jsxs)(N.Fragment, {
                    children: [
                      T || _
                        ? (0, N.jsx)(L0, {
                            kind: `medal`,
                            metal: T ?? _,
                            reveal: !!g?.improved,
                            label: `${T ?? _} medal`,
                            className: `results-award-model`,
                          })
                        : (0, N.jsx)(`div`, {
                            className: `results-award-empty`,
                            "aria-hidden": `true`,
                            children: (0, N.jsx)(xe, {}),
                          }),
                      (0, N.jsxs)(`figcaption`, {
                        className: `results-award-caption`,
                        children: [
                          (0, N.jsx)(`strong`, {
                            children: T
                              ? `${T.toUpperCase()} MEDAL`
                              : _
                                ? `${_.toUpperCase()} MEDAL HELD`
                                : `NO MEDAL`,
                          }),
                          (0, N.jsx)(`span`, {
                            children: g?.improved
                              ? g.previous
                                ? `UPGRADED FROM ${g.previous.toUpperCase()}`
                                : `NEW MEDAL · ADDED TO YOUR CAREER`
                              : T && _ && T !== _
                                ? `YOU ALREADY HOLD ${_.toUpperCase()}`
                                : A
                                  ? `${A.toUpperCase()} NEEDS ${O(A)}`
                                  : `GOLD SECURED`,
                          }),
                          !!g?.unlocked.length &&
                            (0, N.jsx)(`em`, {
                              children: g.tier
                                ? `${oZ.find((e) => e.id === g.tier)?.name} TIER UNLOCKED`
                                : `${g.unlocked.length} NEW EVENT${g.unlocked.length > 1 ? `S` : ``} OPEN`,
                            }),
                        ],
                      }),
                      (0, N.jsx)(`ol`, {
                        className: `results-targets`,
                        "aria-label": `Medal targets`,
                        children: iZ.map((e) =>
                          (0, N.jsxs)(
                            `li`,
                            {
                              className: `medal-${e}${_ && iZ.indexOf(_) <= iZ.indexOf(e) ? ` is-earned` : ``}`,
                              children: [
                                (0, N.jsx)(`span`, {
                                  children: e.toUpperCase(),
                                }),
                                (0, N.jsx)(`b`, { children: O(e) }),
                              ],
                            },
                            e,
                          ),
                        ),
                      }),
                    ],
                  })
                : w
                  ? (0, N.jsxs)(N.Fragment, {
                      children: [
                        (0, N.jsx)(L0, {
                          kind: `trophy`,
                          metal: w,
                          reveal: !0,
                          label: `${w} trophy`,
                          className: `results-award-model`,
                        }),
                        (0, N.jsxs)(`figcaption`, {
                          className: `results-award-caption`,
                          children: [
                            (0, N.jsx)(`strong`, {
                              children:
                                e.position === 1
                                  ? `RACE WINNER`
                                  : `${X0(e.position)} PLACE TROPHY`,
                            }),
                            (0, N.jsxs)(`span`, {
                              children: [
                                w.toUpperCase(),
                                ` TROPHY ·`,
                                ` `,
                                wJ.find((e) => e.id === t.id)?.category,
                              ],
                            }),
                          ],
                        }),
                      ],
                    })
                  : null,
        }),
        (0, N.jsxs)(`nav`, {
          className: `front-results-next`,
          "aria-label": `Next`,
          children: [
            x && S
              ? (0, N.jsxs)(`button`, {
                  className: `front-primary`,
                  "aria-label": `NEXT ROUND`,
                  "data-menu-initial": !0,
                  "data-pad": `start`,
                  onClick: o,
                  children: [
                    (0, N.jsx)(ae, {}),
                    (0, N.jsxs)(`span`, {
                      children: [
                        `NEXT ROUND`,
                        (0, N.jsxs)(`small`, {
                          children: [
                            J0(S.circuit),
                            S.reverse ? ` · REVERSE` : ``,
                          ],
                        }),
                      ],
                    }),
                    (0, N.jsx)(Wi, { pad: `☰`, keys: `ENTER` }),
                  ],
                })
              : (0, N.jsxs)(`button`, {
                  className: `front-primary`,
                  "aria-label": k,
                  "data-menu-initial": !0,
                  "data-pad": `start`,
                  onClick: () => (b ? a(b.event) : i()),
                  children: [
                    (0, N.jsx)(Ue, {}),
                    (0, N.jsx)(`span`, { children: k }),
                    (0, N.jsx)(Wi, { pad: `☰`, keys: `ENTER` }),
                  ],
                }),
            h &&
              v &&
              !x &&
              (0, N.jsxs)(`button`, {
                className: `front-row`,
                "aria-label": `NEXT EVENT`,
                onClick: () => a(v.id),
                children: [
                  (0, N.jsx)(ae, {}),
                  (0, N.jsxs)(`span`, {
                    children: [
                      `NEXT EVENT`,
                      (0, N.jsxs)(`small`, {
                        children: [
                          oZ.find((e) => e.id === v.tier)?.name,
                          ` ·`,
                          ` `,
                          String(v.number).padStart(2, `0`),
                          ` `,
                          lZ[v.kind].name,
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            h
              ? (0, N.jsxs)(`button`, {
                  className: `front-row`,
                  "aria-label": `CAREER GRID`,
                  onClick: l,
                  children: [
                    (0, N.jsx)(xe, {}),
                    (0, N.jsxs)(`span`, {
                      children: [
                        `CAREER GRID`,
                        (0, N.jsxs)(`small`, { children: [y?.name, ` TIER`] }),
                      ],
                    }),
                  ],
                })
              : !m &&
                (0, N.jsxs)(`button`, {
                  className: `front-row`,
                  "aria-label": `RACE SETUP`,
                  onClick: u,
                  children: [
                    (0, N.jsx)(Ke, {}),
                    (0, N.jsxs)(`span`, {
                      children: [
                        `RACE SETUP`,
                        (0, N.jsx)(`small`, {
                          children: `CIRCUIT · MODE · CRAFT`,
                        }),
                      ],
                    }),
                  ],
                }),
            !h &&
              (0, N.jsxs)(`button`, {
                className: `front-row`,
                "aria-label": `VIEW LEADERBOARD`,
                onClick: s,
                children: [
                  (0, N.jsx)(ot, {}),
                  (0, N.jsxs)(`span`, {
                    children: [
                      `VIEW LEADERBOARD`,
                      (0, N.jsx)(`small`, { children: `WAVEDASH RECORDS` }),
                    ],
                  }),
                ],
              }),
            (0, N.jsxs)(`button`, {
              className: `front-row is-exit`,
              "aria-label": `MAIN MENU`,
              "data-menu-back": !0,
              onClick: d,
              children: [
                (0, N.jsx)(Se, {}),
                (0, N.jsx)(`span`, { children: `MAIN MENU` }),
                (0, N.jsx)(Wi, { pad: `B`, keys: `ESC` }),
              ],
            }),
          ],
        }),
        (0, N.jsx)(Ki, {
          hints: [
            [[`✚`], [`↑ ↓`], `MOVE`],
            [[`A`], [`ENTER`], `SELECT`],
            [[`B`], [`ESC`], `MAIN MENU`],
          ],
          children: (0, N.jsxs)(`span`, { children: [`VECTOR `, q0] }),
        }),
      ],
    }),
  });
}
