// assets__index-DphGw8Ou 35 — children
// Lines 80526-80862 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function d0({
  hud: e,
  career: t,
  busy: n,
  starting: r,
  onPage: i,
  onStart: a,
  onKind: o,
  onOnline: s,
  onHangar: c,
  onRecords: l,
  onStats: u,
  onControls: d,
  onSettings: f,
  onNews: p,
  newsUnseen: m,
}) {
  let h = e?.circuit ?? yJ,
    g = Qu(e?.ship.selected),
    _ = e?.kind === `timed-lap`,
    v = rQ(t),
    y = [...BZ].reverse().find((e) => iQ(e, t)) ?? BZ[0],
    b = Object.values(t.medals),
    x = (e) => b.filter((t) => t === e).length,
    S = QZ.filter((e) => e.tier === y.id && t.medals[e.id]).map(
      (e) => e.number * 2,
    ),
    C = QZ.filter((e) => e.kind !== `tournament`).length,
    w = vJ.findIndex((e) => e.id === h.id) + 1,
    T = h.name.replace(` MK III`, ``).toUpperCase();
  return (0, N.jsxs)(`section`, {
    className: `menu-hub`,
    "aria-label": `Main menu`,
    children: [
      (0, N.jsxs)(`div`, {
        className: `hub-hero`,
        children: [
          (0, N.jsxs)(`div`, {
            className: `eyebrow`,
            children: [
              (0, N.jsx)(`span`, { className: `accent-dash` }),
              `PHANTOM RACING LEAGUE · SEASON 2186`,
            ],
          }),
          (0, N.jsxs)(`h1`, {
            children: [`DEFY `, (0, N.jsx)(`span`, { children: `GRAVITY.` })],
          }),
        ],
      }),
      (0, N.jsxs)(`div`, {
        className: `hub-tile hub-race`,
        children: [
          (0, N.jsxs)(`button`, {
            className: `hub-race-setup`,
            "aria-label": `Quick race setup`,
            disabled: !e?.ready || n,
            onClick: () => i(`race`),
            children: [
              (0, N.jsxs)(`span`, {
                className: `hub-tile-kicker`,
                children: [
                  `QUICK RACE`,
                  ` `,
                  (0, N.jsxs)(`i`, {
                    children: [
                      String(w).padStart(2, `0`),
                      ` · `,
                      h.category,
                      ` ·`,
                      ` `,
                      h.timeOfDay,
                    ],
                  }),
                ],
              }),
              (0, N.jsx)(`strong`, {
                className: `hub-tile-title` + (T.length > 14 ? ` is-long` : ``),
                children: T,
              }),
              (0, N.jsxs)(`span`, {
                className: `hub-race-facts`,
                children: [
                  (0, N.jsx)(`b`, {
                    children: _ ? `TIMED LAP` : `SINGLE RACE`,
                  }),
                  (0, N.jsx)(`span`, {
                    children: _
                      ? `∞ LAPS`
                      : `${e?.modifiers.laps ?? h.laps} ${e?.modifiers.laps === 1 ? `LAP` : `LAPS`}`,
                  }),
                  e?.modifiers.direction === `reverse` &&
                    (0, N.jsx)(`span`, { children: `REVERSE` }),
                  !_ &&
                    (0, N.jsx)(`span`, {
                      children:
                        BZ.find((t) => t.id === e?.difficulty)?.name ?? `PRO`,
                    }),
                ],
              }),
              (0, N.jsx)(YX, {
                path: h.mapPath,
                label: `${h.name} circuit map`,
                className: `hub-race-map`,
              }),
              (0, N.jsxs)(`span`, {
                className: `hub-tile-change`,
                children: [
                  `CHANGE CIRCUIT, SHIP OR `,
                  _ ? `DIRECTION` : `MODIFIERS`,
                ],
              }),
            ],
          }),
          (0, N.jsxs)(`div`, {
            className: `hub-race-actions`,
            children: [
              (0, N.jsxs)(`button`, {
                id: `start-btn`,
                "data-menu-initial": !0,
                className: `hub-race-start`,
                disabled: r.disabled,
                onClick: a,
                children: [
                  (0, N.jsx)(Re, {}),
                  (0, N.jsxs)(`span`, {
                    children: [
                      r.label,
                      (0, N.jsx)(`small`, { children: r.detail }),
                    ],
                  }),
                ],
              }),
              (0, N.jsxs)(`fieldset`, {
                className: `hub-race-modes`,
                "aria-label": `Game mode`,
                children: [
                  (0, N.jsx)(`button`, {
                    "aria-label": `SINGLE RACE`,
                    "aria-pressed": !_,
                    disabled: !e?.ready || n,
                    onClick: () => o(`race`),
                    children: `RACE`,
                  }),
                  (0, N.jsx)(`button`, {
                    id: `timed-lap-mode`,
                    "aria-pressed": _,
                    disabled: !e?.ready || n,
                    onClick: () => o(`timed-lap`),
                    children: `TIMED LAP`,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, N.jsxs)(`div`, {
        className: `hub-tiles`,
        children: [
          (0, N.jsxs)(`button`, {
            className: `hub-tile hub-career`,
            "aria-label": `Career`,
            disabled: !e?.ready,
            onClick: () => i(`career`),
            children: [
              (0, N.jsx)(ZX, { filled: S }),
              (0, N.jsxs)(`span`, {
                className: `hub-tile-kicker`,
                children: [
                  y.name,
                  ` `,
                  (0, N.jsxs)(`i`, { children: [v, ` PTS`] }),
                ],
              }),
              (0, N.jsx)(`strong`, {
                className: `hub-tile-title`,
                children: `CAREER`,
              }),
              (0, N.jsxs)(`span`, {
                className: `hub-medals`,
                children: [
                  [`gold`, `silver`, `bronze`].map((e) =>
                    (0, N.jsxs)(
                      `span`,
                      {
                        children: [
                          (0, N.jsx)(`img`, {
                            className: `medal-still${x(e) ? `` : ` is-empty`}`,
                            src: l0(`medal`, e),
                            alt: ``,
                          }),
                          x(e),
                        ],
                      },
                      e,
                    ),
                  ),
                  (0, N.jsxs)(`span`, {
                    className: `hub-points`,
                    children: [b.length, `/`, C],
                  }),
                ],
              }),
              (0, N.jsx)(ee, { className: `hub-tile-go` }),
            ],
          }),
          (0, N.jsxs)(`button`, {
            id: `online-btn`,
            className: `hub-tile hub-online`,
            disabled: !e?.ready || n,
            onClick: s,
            children: [
              (0, N.jsxs)(`span`, {
                className: `hub-tile-kicker`,
                children: [
                  (0, N.jsx)(me, { className: `hub-tile-icon` }),
                  `WAVEDASH`,
                ],
              }),
              (0, N.jsx)(`strong`, {
                className: `hub-tile-title`,
                children: `ONLINE`,
              }),
              (0, N.jsx)(`span`, {
                className: `hub-tile-copy`,
                children: `2–8 pilots. Host or join.`,
              }),
              (0, N.jsx)(ee, { className: `hub-tile-go` }),
            ],
          }),
        ],
      }),
      (0, N.jsxs)(`div`, {
        className: `hub-links`,
        children: [
          (0, N.jsxs)(`button`, {
            id: `hangar-btn`,
            className: `hub-link`,
            disabled: !e?.ready || n,
            onClick: c,
            children: [
              (0, N.jsx)(Ue, {}),
              (0, N.jsxs)(`span`, {
                children: [
                  `GARAGE`,
                  (0, N.jsxs)(`small`, {
                    style: { color: g.color },
                    children: [g.code, ` `, g.name.toUpperCase()],
                  }),
                ],
              }),
            ],
          }),
          (0, N.jsxs)(`button`, {
            id: `leaderboards-btn`,
            className: `hub-link`,
            disabled: !e?.ready,
            onClick: l,
            children: [
              (0, N.jsx)(ot, {}),
              (0, N.jsxs)(`span`, {
                children: [
                  `RECORDS`,
                  (0, N.jsx)(`small`, { children: `LEADERBOARDS` }),
                ],
              }),
            ],
          }),
          (0, N.jsxs)(`button`, {
            id: `stats-btn`,
            className: `hub-link`,
            disabled: !e?.ready,
            onClick: u,
            children: [
              (0, N.jsx)(O, {}),
              (0, N.jsxs)(`span`, {
                children: [
                  `PILOT`,
                  (0, N.jsx)(`small`, { children: `STATS · AWARDS` }),
                ],
              }),
            ],
          }),
          (0, N.jsxs)(`button`, {
            className: `hub-link`,
            "aria-label": `FLIGHT CONTROLS`,
            onClick: d,
            children: [
              (0, N.jsx)(we, {}),
              (0, N.jsxs)(`span`, {
                children: [
                  `CONTROLS`,
                  (0, N.jsx)(`small`, { children: `PAD · KEYS · TOUCH` }),
                ],
              }),
            ],
          }),
          (0, N.jsxs)(`button`, {
            className: `hub-link`,
            "aria-label": `FLIGHT SETTINGS`,
            disabled: !e?.ready,
            onClick: f,
            children: [
              (0, N.jsx)(qe, {}),
              (0, N.jsxs)(`span`, {
                children: [
                  `SETTINGS`,
                  (0, N.jsx)(`small`, { children: `FLIGHT · AUDIO` }),
                ],
              }),
            ],
          }),
          (0, N.jsxs)(`button`, {
            id: `news-btn`,
            className: `hub-link hub-news` + (m ? ` is-unseen` : ``),
            "aria-label": m ? `WHAT'S NEW · NEW UPDATE` : `WHAT'S NEW`,
            onClick: p,
            children: [
              (0, N.jsx)(Fe, {}),
              (0, N.jsxs)(`span`, {
                children: [
                  `NEWS`,
                  (0, N.jsx)(`small`, { children: e0[0]?.title.toUpperCase() }),
                ],
              }),
              m &&
                (0, N.jsx)(`b`, {
                  className: `hub-news-badge`,
                  children: `NEW`,
                }),
            ],
          }),
        ],
      }),
    ],
  });
}
