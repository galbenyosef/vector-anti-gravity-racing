// assets__index-DphGw8Ou 40 — children
// Lines 81847-82333 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function M0({
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
    h = QZ.find((t) => t.id === e.career.event),
    g = h && e.career.award?.event === h.id ? e.career.award : null,
    _ = h ? (r.medals[h.id] ?? null) : null,
    v = h ? fQ(r, h.id) : null,
    y = h && BZ.find((e) => e.id === h.tier),
    b =
      h?.rounds && e.career.tournament?.event === h.id
        ? e.career.tournament
        : null,
    x = !!b && !b.final,
    S = x ? b.rounds[b.round + 1] : void 0,
    C = b ? b.standings.findIndex((e) => e.id === `player`) + 1 : 0,
    w = !h && !f && !n && e.position <= 3 ? j0[e.position - 1] : null,
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
    D = h ? oQ(h) : [],
    O = (e) => {
      let t = D.find((t) => t.medal === e);
      return t
        ? t.unit === `position`
          ? A0(t.value)
          : t.unit === `orbs`
            ? `${t.value} / ${sX.count}`
            : CJ(t.value)
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
    A = _ === `gold` ? null : RZ[(_ ? RZ.indexOf(_) : 3) - 1];
  return (0, N.jsx)(`div`, {
    className: `finish-overlay results-overlay`,
    children: (0, N.jsxs)(`section`, {
      className: `finish-card results-screen`,
      "data-menu-scope": `results`,
      "aria-labelledby": `results-title`,
      children: [
        (0, N.jsxs)(`header`, {
          className: `results-head`,
          children: [
            (0, N.jsxs)(`span`, {
              className: `eyebrow`,
              children: [
                t.name.replace(` MK III`, ``).toUpperCase(),
                ` /`,
                ` `,
                h
                  ? `${y?.name} · EVENT ${String(h.number).padStart(2, `0`)} · ${UZ[h.kind].name}${b ? ` · ROUND ${b.round + 1} OF ${b.rounds.length}` : ``}${e.modifiers.direction === `reverse` ? ` · REVERSE` : ``}`
                  : f
                    ? `TIMED LAP`
                    : m
                      ? `ONLINE RACE`
                      : `RACE COMPLETE`,
              ],
            }),
            (0, N.jsx)(`h2`, { id: `results-title`, children: E }),
          ],
        }),
        (0, N.jsxs)(`div`, {
          className: `results-body`,
          children: [
            (0, N.jsxs)(`div`, {
              className: `results-stats`,
              children: [
                (0, N.jsxs)(`div`, {
                  className: `finish-position`,
                  children: [
                    (0, N.jsx)(`strong`, {
                      children: p
                        ? String(p.taken).padStart(2, `0`)
                        : f
                          ? String(e.completedLaps).padStart(2, `0`)
                          : A0(e.position),
                    }),
                    (0, N.jsx)(`span`, {
                      children: p
                        ? (0, N.jsxs)(N.Fragment, {
                            children: [
                              `ORBS`,
                              (0, N.jsx)(`br`, {}),
                              `OF `,
                              p.total,
                            ],
                          })
                        : f
                          ? `LAPS COMPLETED`
                          : (0, N.jsxs)(N.Fragment, {
                              children: [
                                `POSITION`,
                                (0, N.jsx)(`br`, {}),
                                `OF `,
                                String(e.totalRacers).padStart(2, `0`),
                                ` PILOTS`,
                              ],
                            }),
                    }),
                  ],
                }),
                (0, N.jsxs)(`div`, {
                  className: `result-total`,
                  children: [
                    (0, N.jsx)(`span`, {
                      children: f
                        ? `SESSION BEST LAP`
                        : p
                          ? `LAP TIME`
                          : `TOTAL RACE TIME`,
                    }),
                    (0, N.jsx)(`strong`, {
                      children: n ? `DNF` : CJ(f ? e.sessionBest : e.elapsed),
                    }),
                  ],
                }),
                f &&
                  (0, N.jsx)(`p`, {
                    className: `session-summary`,
                    children: e.completedLaps
                      ? `Session time ${CJ(e.elapsed)} · Personal best ${CJ(e.bestLap)}`
                      : `No complete laps. Finish a full lap to set a time.`,
                  }),
                b && (0, N.jsx)(k0, { tournament: b }),
                (0, N.jsx)(`div`, {
                  className: `lap-results${b ? ` is-hidden` : ``}`,
                  children: e.lapTimes.map((t, n) =>
                    (0, N.jsxs)(
                      `div`,
                      {
                        children: [
                          (0, N.jsxs)(`span`, {
                            children: [
                              `LAP`,
                              ` `,
                              String(
                                e.completedLaps - e.lapTimes.length + n + 1,
                              ).padStart(2, `0`),
                            ],
                          }),
                          (0, N.jsx)(`strong`, { children: CJ(t) }),
                          t === e.sessionBest &&
                            (0, N.jsx)(`span`, {
                              className: `lap-best`,
                              children: `BEST`,
                            }),
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
                    children: [
                      (0, N.jsx)(`output`, {
                        children: e.leaderboards.result.message,
                      }),
                      e.leaderboards.result.status === `saved` &&
                        (0, N.jsxs)(`strong`, {
                          children: [
                            `YOUR BEST `,
                            CJ(e.leaderboards.result.best),
                            ` · #`,
                            e.leaderboards.result.rank,
                          ],
                        }),
                      e.leaderboards.result.status === `failed` &&
                        (0, N.jsx)(`button`, {
                          className: `result-back`,
                          onClick: c,
                          children: `RETRY SUBMISSION`,
                        }),
                    ],
                  }),
              ],
            }),
            (0, N.jsx)(`div`, {
              className: `results-award`,
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
                        (0, N.jsx)(YX, {
                          path:
                            vJ.find((e) => e.id === S.circuit)?.mapPath ?? ``,
                          label: `${O0(S.circuit)} circuit map`,
                        }),
                        (0, N.jsx)(`strong`, { children: O0(S.circuit) }),
                        S.reverse &&
                          (0, N.jsx)(`b`, {
                            className: `career-reverse-tag`,
                            children: `REVERSE`,
                          }),
                        (0, N.jsxs)(`em`, {
                          children: [
                            `YOU ARE `,
                            A0(C),
                            ` OVERALL ·`,
                            ` `,
                            b.standings[C - 1]?.points ?? 0,
                            ` PTS`,
                          ],
                        }),
                      ],
                    })
                  : h
                    ? (0, N.jsxs)(N.Fragment, {
                        children: [
                          T || _
                            ? (0, N.jsx)(u0, {
                                kind: `medal`,
                                metal: T ?? _,
                                reveal: !!g?.improved,
                                label: `${T ?? _} medal`,
                                className: `results-award-model`,
                              })
                            : (0, N.jsx)(`div`, {
                                className: `results-award-empty`,
                                "aria-hidden": `true`,
                                children: (0, N.jsx)(Se, {}),
                              }),
                          (0, N.jsxs)(`div`, {
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
                                    ? `${BZ.find((e) => e.id === g.tier)?.name} TIER UNLOCKED`
                                    : `${g.unlocked.length} NEW EVENT${g.unlocked.length > 1 ? `S` : ``} OPEN`,
                                }),
                            ],
                          }),
                          (0, N.jsx)(`ol`, {
                            className: `results-targets`,
                            "aria-label": `Medal targets`,
                            children: RZ.map((e) =>
                              (0, N.jsxs)(
                                `li`,
                                {
                                  className: `medal-${e}${_ && RZ.indexOf(_) <= RZ.indexOf(e) ? ` is-earned` : ``}`,
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
                            (0, N.jsx)(u0, {
                              kind: `trophy`,
                              metal: w,
                              reveal: !0,
                              label: `${w} trophy`,
                              className: `results-award-model`,
                            }),
                            (0, N.jsxs)(`div`, {
                              className: `results-award-caption`,
                              children: [
                                (0, N.jsx)(`strong`, {
                                  children:
                                    e.position === 1
                                      ? `RACE WINNER`
                                      : `${A0(e.position)} PLACE TROPHY`,
                                }),
                                (0, N.jsx)(`span`, {
                                  children: vJ.find((e) => e.id === t.id)
                                    ?.category,
                                }),
                              ],
                            }),
                          ],
                        })
                      : (0, N.jsx)(`div`, {
                          className: `results-award-empty`,
                          "aria-hidden": `true`,
                          children: (0, N.jsx)(ot, {}),
                        }),
            }),
          ],
        }),
        (0, N.jsxs)(`footer`, {
          className: `results-actions`,
          children: [
            x && S
              ? (0, N.jsxs)(`button`, {
                  className: `results-action is-primary`,
                  "aria-label": `NEXT ROUND`,
                  "data-menu-initial": !0,
                  onClick: o,
                  children: [
                    (0, N.jsx)(se, {}),
                    (0, N.jsxs)(`span`, {
                      children: [
                        `NEXT ROUND`,
                        (0, N.jsxs)(`small`, {
                          children: [
                            O0(S.circuit),
                            S.reverse ? ` · REVERSE` : ``,
                          ],
                        }),
                      ],
                    }),
                  ],
                })
              : (0, N.jsxs)(`button`, {
                  className: `results-action is-primary`,
                  "aria-label": k,
                  "data-menu-initial": !0,
                  onClick: () => (b ? a(b.event) : i()),
                  children: [
                    (0, N.jsx)(We, {}),
                    (0, N.jsxs)(`span`, {
                      children: [
                        k,
                        (0, N.jsx)(`small`, { children: `A / ✕ · ENTER` }),
                      ],
                    }),
                  ],
                }),
            h &&
              v &&
              !x &&
              (0, N.jsxs)(`button`, {
                className: `results-action`,
                "aria-label": `NEXT EVENT`,
                onClick: () => a(v.id),
                children: [
                  (0, N.jsx)(se, {}),
                  (0, N.jsxs)(`span`, {
                    children: [
                      `NEXT EVENT`,
                      (0, N.jsxs)(`small`, {
                        children: [
                          BZ.find((e) => e.id === v.tier)?.name,
                          ` ·`,
                          ` `,
                          String(v.number).padStart(2, `0`),
                          ` `,
                          UZ[v.kind].name,
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            !h &&
              (0, N.jsxs)(`button`, {
                className: `results-action`,
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
            h
              ? (0, N.jsxs)(`button`, {
                  className: `results-action`,
                  "aria-label": `CAREER GRID`,
                  onClick: l,
                  children: [
                    (0, N.jsx)(Se, {}),
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
                  className: `results-action`,
                  "aria-label": `RACE SETUP`,
                  onClick: u,
                  children: [
                    (0, N.jsx)(qe, {}),
                    (0, N.jsxs)(`span`, {
                      children: [
                        `RACE SETUP`,
                        (0, N.jsx)(`small`, {
                          children: `CIRCUIT · MODE · SHIP`,
                        }),
                      ],
                    }),
                  ],
                }),
            (0, N.jsxs)(`button`, {
              className: `results-action is-exit`,
              "aria-label": `MAIN MENU`,
              "data-menu-back": !0,
              onClick: d,
              children: [
                (0, N.jsx)(Ce, {}),
                (0, N.jsxs)(`span`, {
                  children: [
                    `MAIN MENU`,
                    (0, N.jsx)(`small`, { children: `B / ○ · ESC` }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, N.jsx)(Hi, {}),
      ],
    }),
  });
}
