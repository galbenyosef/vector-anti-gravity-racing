// assets__index-DphGw8Ou 22 — children
// Lines 76947-77279 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function B$({ hud: e, getGame: t, onAccept: n }) {
  let r = e?.online.invites ?? [],
    i = e ? [`countdown`, `racing`, `paused`].includes(e.mode) : !0;
  return !r.length || i
    ? null
    : (0, N.jsx)(`div`, {
        className: `invite-toasts`,
        "aria-live": `polite`,
        children: r.map((e) =>
          (0, N.jsxs)(
            `div`,
            {
              className: `invite-toast`,
              role: `alert`,
              children: [
                (0, N.jsx)(N$, {
                  name: e.from,
                  src: e.avatar,
                  accent: `#56e7ff`,
                  size: 42,
                }),
                (0, N.jsxs)(`span`, {
                  className: `invite-copy`,
                  children: [
                    (0, N.jsx)(`strong`, { children: e.from.toUpperCase() }),
                    (0, N.jsx)(`small`, { children: `INVITED YOU TO RACE` }),
                  ],
                }),
                (0, N.jsx)(`button`, {
                  className: `invite-join`,
                  onClick: () => {
                    (n(), t()?.online.acceptInvite(e.id));
                  },
                  children: `JOIN`,
                }),
                (0, N.jsx)(`button`, {
                  "aria-label": `Dismiss invite`,
                  onClick: () => t()?.online.dismissInvite(e.id),
                  children: (0, N.jsx)(mt, {}),
                }),
              ],
            },
            e.id,
          ),
        ),
      });
}
var V$ = [
  { kind: `race`, direction: `normal`, label: `SINGLE RACE` },
  { kind: `timed-lap`, direction: `normal`, label: `TIMED LAP` },
  { kind: `timed-lap`, direction: `reverse`, label: `REVERSE LAP` },
];
function H$({ hud: e, getGame: t }) {
  let n = e?.leaderboards,
    r = n?.kind === `timed-lap`,
    i = r && n?.direction === `reverse`,
    a = `${n?.kind}|${n?.direction}|${n?.circuit.id}|${n?.open}`,
    [o, s] = (0, C.useState)({ key: a, page: 0 }),
    c = o.key === a ? o.page : 0,
    l = (e) => s({ key: a, page: e }),
    u = n?.entries ?? [],
    d = Math.max(1, Math.ceil(u.length / 5)),
    f = Math.min(c, d - 1),
    p = u[0];
  return (0, N.jsx)(nl, {
    open: !!n?.open,
    onOpenChange: (e) => t()?.leaderboards.setOpen(e),
    children: (0, N.jsxs)(ll, {
      title: `LEADERBOARDS`,
      section: `RACE RECORDS`,
      number: `03`,
      subtitle: `${n?.circuit.name ?? `Solstice Port`} · ${i ? `Fastest lap, reversed` : r ? `Fastest lap` : `Three-lap combat race`}`,
      className: `records-screen`,
      footer: (0, N.jsxs)(`span`, {
        children: [
          `PHANTOM CLASS `,
          (0, N.jsx)(`span`, { className: `footer-divider`, children: `/` }),
          ` GLOBAL TOP 20`,
        ],
      }),
      children: [
        (0, N.jsxs)(`div`, {
          className: `records-toolbar`,
          children: [
            (0, N.jsx)(`fieldset`, {
              className: `game-tabs`,
              "aria-label": `Leaderboard mode`,
              children: V$.map(({ kind: e, direction: r, label: i }) => {
                let a =
                  n?.kind === e && (e !== `timed-lap` || n?.direction === r);
                return (0, N.jsx)(
                  `button`,
                  {
                    "data-menu-initial": a || void 0,
                    "aria-pressed": a,
                    onClick: () =>
                      void t()?.leaderboards.refresh(n?.circuit, e, r),
                    children: i,
                  },
                  i,
                );
              }),
            }),
            vJ.length > 1 &&
              (0, N.jsx)(`select`, {
                "aria-label": `Circuit`,
                id: `leaderboard-track`,
                value: n?.circuit.id || vJ[0].id,
                onChange: (e) => {
                  let n = vJ.find((t) => t.id === e.target.value);
                  n && t()?.leaderboards.refresh(n);
                },
                children: vJ.map((e) =>
                  (0, N.jsx)(`option`, { value: e.id, children: e.name }, e.id),
                ),
              }),
            (0, N.jsxs)(`button`, {
              className: `screen-action`,
              "aria-label": `Refresh leaderboard`,
              disabled: n?.loading || !n?.available,
              onClick: () => void t()?.leaderboards.refresh(),
              children: [(0, N.jsx)(Ve, {}), ` REFRESH`],
            }),
          ],
        }),
        (0, N.jsxs)(`div`, {
          className: `records-layout`,
          "aria-busy": n?.loading,
          children: [
            (0, N.jsxs)(`aside`, {
              className: `record-spotlight`,
              children: [
                (0, N.jsxs)(`div`, {
                  className: `record-crown`,
                  children: [
                    (0, N.jsx)(ot, {}),
                    (0, N.jsx)(`span`, { children: `CIRCUIT RECORD` }),
                  ],
                }),
                (0, N.jsx)(`span`, {
                  className: `record-rank`,
                  "aria-hidden": `true`,
                  children: `01`,
                }),
                (0, N.jsx)(`strong`, {
                  className: `record-pilot`,
                  children: n?.loading
                    ? `SYNCING…`
                    : (p?.username ?? `SET THE PACE`),
                }),
                (0, N.jsx)(`span`, {
                  className: `record-time`,
                  children: p && !n?.loading ? CJ(p.score / 1e3) : `— : — . —`,
                }),
                (0, N.jsxs)(`div`, {
                  className: `record-personal`,
                  children: [
                    (0, N.jsxs)(`span`, {
                      children: [
                        `YOUR BEST `,
                        n?.own &&
                          (0, N.jsxs)(`b`, {
                            children: [`#`, n.own.globalRank],
                          }),
                      ],
                    }),
                    (0, N.jsx)(`strong`, {
                      children: n?.own
                        ? CJ(n.own.score / 1e3)
                        : `NO RECORD YET`,
                    }),
                  ],
                }),
              ],
            }),
            (0, N.jsx)(`div`, {
              className: `records-field`,
              children: n?.available
                ? (0, N.jsxs)(N.Fragment, {
                    children: [
                      (0, N.jsxs)(`div`, {
                        className: `record-columns`,
                        "aria-hidden": `true`,
                        children: [
                          (0, N.jsx)(`span`, { children: `POS` }),
                          (0, N.jsx)(`span`, { children: `PILOT` }),
                          (0, N.jsx)(`span`, {
                            children: r ? `LAP TIME` : `RACE TIME`,
                          }),
                        ],
                      }),
                      n.loading
                        ? (0, N.jsxs)(`div`, {
                            className: `screen-empty`,
                            role: `status`,
                            children: [
                              (0, N.jsx)(`span`, {
                                className: `loading-spinner`,
                              }),
                              (0, N.jsx)(`h3`, { children: `SYNCING TIMES` }),
                            ],
                          })
                        : n.message
                          ? (0, N.jsxs)(`div`, {
                              className: `screen-empty`,
                              role: `status`,
                              children: [
                                (0, N.jsx)(ot, {}),
                                (0, N.jsx)(`h3`, {
                                  children: `RECORDS UNAVAILABLE`,
                                }),
                                (0, N.jsx)(`p`, { children: n.message }),
                              ],
                            })
                          : u.length
                            ? (0, N.jsx)(`ol`, {
                                className: `record-list`,
                                start: f * 5 + 1,
                                "aria-label": `Leaderboard times`,
                                children: u.slice(f * 5, f * 5 + 5).map((e) =>
                                  (0, N.jsxs)(
                                    `li`,
                                    {
                                      "data-rank": e.globalRank,
                                      className:
                                        e.userId === n.own?.userId
                                          ? `record-self`
                                          : ``,
                                      children: [
                                        (0, N.jsx)(`span`, {
                                          className: `record-position`,
                                          children: String(
                                            e.globalRank,
                                          ).padStart(2, `0`),
                                        }),
                                        (0, N.jsxs)(`span`, {
                                          className: `record-name`,
                                          title: e.username,
                                          children: [
                                            (0, N.jsx)(`span`, {
                                              children: e.username,
                                            }),
                                            e.userId === n.own?.userId &&
                                              (0, N.jsx)(`em`, {
                                                children: `YOU`,
                                              }),
                                          ],
                                        }),
                                        (0, N.jsx)(`strong`, {
                                          children: CJ(e.score / 1e3),
                                        }),
                                      ],
                                    },
                                    e.userId,
                                  ),
                                ),
                              })
                            : (0, N.jsxs)(`div`, {
                                className: `screen-empty`,
                                children: [
                                  (0, N.jsx)(ot, {}),
                                  (0, N.jsx)(`h3`, {
                                    children: `THE RECORD IS YOURS TO SET.`,
                                  }),
                                  (0, N.jsxs)(`p`, {
                                    children: [
                                      `Finish `,
                                      i
                                        ? `a reverse lap`
                                        : r
                                          ? `a lap`
                                          : `a race`,
                                      ` `,
                                      `to put your name on the board.`,
                                    ],
                                  }),
                                ],
                              }),
                      (0, N.jsxs)(`div`, {
                        className: `record-pagination`,
                        children: [
                          (0, N.jsx)(`span`, {
                            children: u.length
                              ? `${f * 5 + 1}–${Math.min(u.length, f * 5 + 5)} OF ${u.length}`
                              : `NO TIMES POSTED`,
                          }),
                          (0, N.jsxs)(`div`, {
                            children: [
                              (0, N.jsx)(`button`, {
                                "aria-label": `Previous records`,
                                disabled: !f || n.loading,
                                onClick: () => l(f - 1),
                                children: (0, N.jsx)(oe, {}),
                              }),
                              (0, N.jsxs)(`span`, {
                                children: [f + 1, ` / `, d],
                              }),
                              (0, N.jsx)(`button`, {
                                "aria-label": `Next records`,
                                disabled: f >= d - 1 || n.loading,
                                onClick: () => l(f + 1),
                                children: (0, N.jsx)(se, {}),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                : (0, N.jsxs)(`div`, {
                    className: `screen-empty`,
                    children: [
                      (0, N.jsx)(ot, {}),
                      (0, N.jsx)(`h3`, { children: `TAKE ON THE WORLD.` }),
                      (0, N.jsx)(`p`, {
                        children: `Global records are available on Wavedash.`,
                      }),
                      (0, N.jsxs)(`a`, {
                        className: `primary-button`,
                        href: `https://wavedash.com/games/vector-anti-gravity-racing`,
                        target: `_blank`,
                        rel: `noreferrer`,
                        children: [`PLAY ON WAVEDASH `, (0, N.jsx)(ee, {})],
                      }),
                    ],
                  }),
            }),
          ],
        }),
      ],
    }),
  });
}
