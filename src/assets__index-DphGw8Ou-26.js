// assets__index-DphGw8Ou 26 — children
// Lines 78158-78511 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function x1({ hud: e, open: t, onOpenChange: n }) {
  let r = e?.stats,
    i = e?.achievements,
    a = e?.achievementList ?? [],
    [o, s] = (0, C.useState)(`record`),
    c = r?.values,
    l = r?.status === `loading`,
    u = l
      ? `CONNECTING TO WAVEDASH`
      : r?.status === `local`
        ? `LOCAL PILOT RECORD`
        : r?.status === `saving`
          ? `SAVING TO WAVEDASH`
          : r?.status === `pending`
            ? `CLOUD SAVE PENDING`
            : `WAVEDASH SYNCED`,
    d = (e) => (l ? `—` : y1(e ?? 0)),
    f = (c?.onlineWins ?? 0) + (c?.onlineLosses ?? 0),
    p = f ? `${Math.round(((c?.onlineWins ?? 0) / f) * 100)}%` : `—`,
    m = c?.careerTier ? BZ[c.careerTier - 1]?.name : null,
    h = ((c?.distance ?? 0) / 1e3).toLocaleString(`en-GB`, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    });
  return (0, N.jsx)(nl, {
    open: t,
    onOpenChange: (e) => {
      if (!e && o === `achievements`) return s(`record`);
      n(e);
    },
    children: (0, N.jsx)(ll, {
      title: o === `achievements` ? `ACHIEVEMENTS` : `PILOT RECORD`,
      subtitle:
        o === `achievements`
          ? `Every mode, every milestone. Saved to your Wavedash account.`
          : `Every lap. Every finish. Your racing career.`,
      section: o === `achievements` ? `ACHIEVEMENTS` : `PERSONAL STATS`,
      number: o === `achievements` ? `07` : `06`,
      className: `pilot-stats-screen${o === `achievements` ? ` is-achievements` : ``}`,
      footer: (0, N.jsxs)(`output`, {
        className: `stats-sync ${r?.status}`,
        children: [(0, N.jsx)(`i`, {}), u],
      }),
      children:
        o === `achievements`
          ? (0, N.jsx)(v1, { rows: a })
          : (0, N.jsxs)(`div`, {
              className: `pilot-record-layout`,
              "aria-busy": l,
              children: [
                (0, N.jsxs)(`aside`, {
                  className: `pilot-record-hero`,
                  children: [
                    (0, N.jsxs)(`div`, {
                      className: `pilot-record-label`,
                      children: [(0, N.jsx)(O, {}), ` FLIGHT LOG`],
                    }),
                    (0, N.jsxs)(`div`, {
                      className: `pilot-distance`,
                      children: [
                        (0, N.jsx)(`strong`, { children: l ? `—` : h }),
                        (0, N.jsx)(`span`, { children: `KILOMETRES RACED` }),
                      ],
                    }),
                    (0, N.jsxs)(`div`, {
                      className: `pilot-record-secondary`,
                      children: [
                        (0, N.jsx)(`span`, { children: `TIME ON CIRCUIT` }),
                        (0, N.jsx)(`strong`, {
                          children: l ? `—` : b1(c?.time ?? 0),
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`div`, {
                      className: `pilot-record-secondary`,
                      children: [
                        (0, N.jsxs)(`span`, {
                          children: [(0, N.jsx)(ve, {}), ` TOP SPEED`],
                        }),
                        (0, N.jsxs)(`strong`, {
                          children: [
                            d(c?.speed),
                            ` `,
                            (0, N.jsx)(`small`, { children: `KM/H` }),
                          ],
                        }),
                      ],
                    }),
                    (0, N.jsx)(`p`, {
                      children: l
                        ? `Your career record is loading. You can keep racing.`
                        : r?.hasProgress
                          ? r.status === `local`
                            ? r.savedOnDevice
                              ? `Saved on this browser. Play on Wavedash for your cloud record.`
                              : `Session record. Browser storage is unavailable.`
                            : r.status === `pending`
                              ? r.savedOnDevice
                                ? `Progress kept on this device while cloud saving is pending.`
                                : `Progress held for this session while cloud saving is pending.`
                              : `Single Race · Timed Lap · Online`
                          : `Your first lap starts the story.`,
                    }),
                  ],
                }),
                (0, N.jsxs)(`div`, {
                  className: `pilot-record-panels`,
                  children: [
                    (0, N.jsxs)(`section`, {
                      className: `pilot-stat-group`,
                      "aria-label": `Race results`,
                      children: [
                        (0, N.jsxs)(`h3`, {
                          children: [(0, N.jsx)(ot, {}), ` RACE RESULTS`],
                        }),
                        (0, N.jsxs)(`dl`, {
                          className: `pilot-stat-trio`,
                          children: [
                            (0, N.jsxs)(`div`, {
                              "data-stat": `races`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `FINISHES` }),
                                (0, N.jsx)(`dd`, { children: d(c?.races) }),
                              ],
                            }),
                            (0, N.jsxs)(`div`, {
                              "data-stat": `wins`,
                              className: `stat-highlight`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `WINS` }),
                                (0, N.jsx)(`dd`, { children: d(c?.wins) }),
                              ],
                            }),
                            (0, N.jsxs)(`div`, {
                              "data-stat": `podiums`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `PODIUMS` }),
                                (0, N.jsx)(`dd`, { children: d(c?.podiums) }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`section`, {
                      className: `pilot-stat-group`,
                      "aria-label": `Online record`,
                      children: [
                        (0, N.jsxs)(`h3`, {
                          children: [(0, N.jsx)(me, {}), ` ONLINE`],
                        }),
                        (0, N.jsxs)(`dl`, {
                          className: `pilot-stat-quad`,
                          children: [
                            (0, N.jsxs)(`div`, {
                              "data-stat": `online`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `FINISHES` }),
                                (0, N.jsx)(`dd`, { children: d(c?.online) }),
                              ],
                            }),
                            (0, N.jsxs)(`div`, {
                              "data-stat": `onlineWins`,
                              className: `stat-highlight`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `WINS` }),
                                (0, N.jsx)(`dd`, {
                                  children: d(c?.onlineWins),
                                }),
                              ],
                            }),
                            (0, N.jsxs)(`div`, {
                              "data-stat": `onlineLosses`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `LOSSES` }),
                                (0, N.jsx)(`dd`, {
                                  children: d(c?.onlineLosses),
                                }),
                              ],
                            }),
                            (0, N.jsxs)(`div`, {
                              "data-stat": `winRate`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `WIN %` }),
                                (0, N.jsx)(`dd`, {
                                  children: l ? `—` : p.replace(`%`, ``),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`section`, {
                      className: `pilot-stat-group`,
                      "aria-label": `Career standing`,
                      children: [
                        (0, N.jsxs)(`h3`, {
                          children: [(0, N.jsx)(Se, {}), ` CAREER`],
                        }),
                        (0, N.jsxs)(`dl`, {
                          className: `pilot-stat-quad`,
                          children: [
                            (0, N.jsxs)(`div`, {
                              "data-stat": `careerTier`,
                              className: `stat-highlight`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `TIER` }),
                                (0, N.jsx)(`dd`, {
                                  children: l ? `—` : (m ?? `—`),
                                }),
                              ],
                            }),
                            (0, N.jsxs)(`div`, {
                              "data-stat": `careerPoints`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `POINTS` }),
                                (0, N.jsx)(`dd`, {
                                  children: d(c?.careerPoints),
                                }),
                              ],
                            }),
                            (0, N.jsxs)(`div`, {
                              "data-stat": `careerMedals`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `MEDALS` }),
                                (0, N.jsxs)(`dd`, {
                                  children: [
                                    d(c?.careerMedals),
                                    (0, N.jsx)(`small`, {
                                      children: l
                                        ? ``
                                        : `${y1(c?.careerGolds ?? 0)} GOLD`,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, N.jsxs)(`div`, {
                              "data-stat": `careerEvents`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `EVENTS` }),
                                (0, N.jsx)(`dd`, {
                                  children: d(c?.careerEvents),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`section`, {
                      className: `pilot-stat-group`,
                      "aria-label": `Circuit progress`,
                      children: [
                        (0, N.jsxs)(`h3`, {
                          children: [(0, N.jsx)(he, {}), ` CIRCUIT & COMBAT`],
                        }),
                        (0, N.jsxs)(`dl`, {
                          className: `pilot-stat-quad`,
                          children: [
                            (0, N.jsxs)(`div`, {
                              "data-stat": `laps`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `LAPS` }),
                                (0, N.jsx)(`dd`, { children: d(c?.laps) }),
                              ],
                            }),
                            (0, N.jsxs)(`div`, {
                              "data-stat": `timedLaps`,
                              children: [
                                (0, N.jsx)(`dt`, { children: `TIMED` }),
                                (0, N.jsx)(`dd`, { children: d(c?.timedLaps) }),
                              ],
                            }),
                            (0, N.jsxs)(`div`, {
                              "data-stat": `pickups`,
                              children: [
                                (0, N.jsxs)(`dt`, {
                                  children: [(0, N.jsx)(ht, {}), ` PICKUPS`],
                                }),
                                (0, N.jsx)(`dd`, { children: d(c?.pickups) }),
                              ],
                            }),
                            (0, N.jsxs)(`div`, {
                              "data-stat": `hits`,
                              children: [
                                (0, N.jsxs)(`dt`, {
                                  children: [(0, N.jsx)(fe, {}), ` HITS`],
                                }),
                                (0, N.jsx)(`dd`, { children: d(c?.hits) }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`section`, {
                      className: `developer-challenge${i?.earned ? ` earned` : ``}`,
                      "data-testid": `developer-challenge`,
                      "aria-label": `Developer challenge`,
                      children: [
                        (0, N.jsxs)(`div`, {
                          children: [
                            (0, N.jsxs)(`span`, {
                              className: `challenge-eyebrow`,
                              children: [
                                (0, N.jsx)(ot, {}),
                                ` DEVELOPER CHALLENGE`,
                              ],
                            }),
                            (0, N.jsx)(`h3`, { children: `Beat NitsuaFox` }),
                            (0, N.jsx)(`p`, {
                              children: `Beat the developer on Solstice Port in Timed Lap.`,
                            }),
                            (0, N.jsx)(`output`, {
                              className: `challenge-status`,
                              "aria-live": `polite`,
                              children:
                                i?.status === `unlocked`
                                  ? `WAVEDASH ACHIEVEMENT UNLOCKED`
                                  : i?.status === `pending`
                                    ? `EARNED · WAVEDASH CONFIRMATION PENDING`
                                    : i?.status === `local`
                                      ? `LOCAL COMPLETE · EARN ON WAVEDASH`
                                      : `LOCKED · FINISH A FASTER LAP`,
                            }),
                          ],
                        }),
                        (0, N.jsxs)(`div`, {
                          className: `challenge-target`,
                          children: [
                            (0, N.jsx)(`span`, { children: `TIME TO BEAT` }),
                            (0, N.jsx)(`strong`, { children: `00:21.073` }),
                            (0, N.jsx)(`small`, {
                              children: i?.bestMs
                                ? `YOUR LAP ${CJ(i.bestMs / 1e3)}`
                                : `TIES DO NOT COUNT`,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, N.jsx)(_1, {
                      rows: a,
                      onOpen: () => s(`achievements`),
                    }),
                  ],
                }),
              ],
            }),
    }),
  });
}
