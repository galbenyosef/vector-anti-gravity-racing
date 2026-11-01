// assets__index-DF2rMRzV 37 — children
// Lines 81177-81500 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function F0({
  hud: e,
  getGame: t,
  starting: n,
  locked: r,
  onBack: i,
  onStart: a,
  onHangar: o,
}) {
  let s = (0, C.useId)(),
    c = e?.modifiers ?? Vu,
    l = e?.circuit ?? TJ,
    u = e?.kind === `timed-lap` ? `timed-lap` : `race`,
    d = u === `timed-lap` ? Zu(c) : c,
    f = c.direction === `reverse`,
    p = id(e?.ship.selected),
    m = nd.indexOf(p),
    h = Math.max(
      0,
      wJ.findIndex((e) => e.id === l.id),
    ),
    g = l.name.replace(` MK III`, ``).toUpperCase(),
    _ = r || !e?.ready,
    v = Yu(c) && c.cpuCount === 7;
  return (0, N.jsxs)(`section`, {
    className: `front-page race-setup`,
    "data-menu-scope": `race-setup`,
    "aria-label": `Race setup`,
    children: [
      (0, N.jsx)(Gi, {
        sub: { parent: `PLAY`, title: `RACE SETUP` },
        onBack: i,
      }),
      (0, N.jsxs)(`section`, {
        className: `setup-circuits`,
        "aria-label": `Circuit`,
        children: [
          (0, N.jsxs)(`span`, {
            className: `front-section-head`,
            children: [
              (0, N.jsxs)(`span`, {
                className: `front-kicker`,
                children: [
                  `CIRCUIT · `,
                  String(h + 1).padStart(2, `0`),
                  ` /`,
                  ` `,
                  String(wJ.length).padStart(2, `0`),
                ],
              }),
              (0, N.jsxs)(`span`, {
                children: [
                  (0, N.jsx)(Wi, { pad: `LT`, keys: `Z` }),
                  (0, N.jsx)(Wi, { pad: `RT`, keys: `C` }),
                ],
              }),
            ],
          }),
          (0, N.jsx)(`fieldset`, {
            className: `setup-circuit-list`,
            "aria-label": `Circuit selection`,
            "data-menu-sections": !0,
            children: wJ.map((e, n) => {
              let i = P0(u, e, Xu(d)),
                a = e.id === l.id;
              return (0, N.jsxs)(
                `button`,
                {
                  className: `front-row circuit-row scenery-${e.scenery}`,
                  "aria-pressed": a,
                  "aria-label": e.name,
                  "data-menu-initial": a ? `` : void 0,
                  disabled: r,
                  onClick: () => t()?.browseCircuit(e.id),
                  children: [
                    (0, N.jsx)(qZ, {
                      path: e.mapPath,
                      label: `${e.name} circuit map`,
                    }),
                    (0, N.jsxs)(`span`, {
                      className: `circuit-row-copy`,
                      children: [
                        (0, N.jsx)(`strong`, {
                          children: e.name.replace(` MK III`, ``).toUpperCase(),
                        }),
                        (0, N.jsx)(`small`, {
                          children: [
                            String(n + 1).padStart(2, `0`),
                            e.category.replace(` CIRCUIT`, ``),
                            e.timeOfDay,
                            e.lengthLabel,
                          ]
                            .filter((e, t, n) => n.indexOf(e) === t)
                            .join(` · `),
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`span`, {
                      className: `circuit-row-best`,
                      children: [
                        i ? kJ(i) : `—`,
                        (0, N.jsx)(`small`, {
                          children: u === `race` ? `BEST LAP` : `BEST TIMED`,
                        }),
                      ],
                    }),
                  ],
                },
                e.id,
              );
            }),
          }),
          (0, N.jsx)(`span`, {
            className: `front-section-head setup-craft-head`,
            children: (0, N.jsxs)(`span`, {
              className: `front-kicker`,
              children: [
                e?.ship.loading ? `PREPARING CRAFT` : `CRAFT`,
                ` ·`,
                ` `,
                String(m + 1).padStart(2, `0`),
                ` / 0`,
                nd.length,
              ],
            }),
          }),
          (0, N.jsx)(`fieldset`, {
            className: `setup-craft-set`,
            "aria-label": `Player ship`,
            children: (0, N.jsxs)(`div`, {
              className: `setup-craft front-row`,
              children: [
                (0, N.jsx)(`button`, {
                  className: `setup-ship-step`,
                  "aria-label": `Previous ship`,
                  disabled: _,
                  onClick: () => t()?.cycleShip(-1),
                  children: (0, N.jsx)(ie, {}),
                }),
                (0, N.jsxs)(`strong`, {
                  style: { color: p.color },
                  children: [
                    p.code,
                    ` `,
                    (0, N.jsx)(`b`, { children: p.name.toUpperCase() }),
                  ],
                }),
                (0, N.jsx)(`button`, {
                  className: `setup-ship-step`,
                  "aria-label": `Next ship`,
                  disabled: _,
                  onClick: () => t()?.cycleShip(1),
                  children: (0, N.jsx)(ae, {}),
                }),
                (0, N.jsxs)(`button`, {
                  className: `setup-garage`,
                  "data-pad": `y`,
                  disabled: _,
                  onClick: o,
                  children: [(0, N.jsx)(Wi, { pad: `Y`, keys: `G` }), `GARAGE`],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, N.jsxs)(`div`, {
        className: `setup-title`,
        "aria-hidden": `true`,
        children: [
          (0, N.jsxs)(`span`, {
            className: `front-kicker`,
            children: [l.category, ` · `, l.timeOfDay, ` · `, l.character],
          }),
          (0, N.jsx)(`strong`, {
            className: g.length > 14 ? `is-long` : ``,
            children: g,
          }),
        ],
      }),
      (0, N.jsxs)(`section`, {
        className: `setup-rules`,
        "aria-label": `Rules`,
        children: [
          (0, N.jsxs)(`span`, {
            className: `front-section-head`,
            children: [
              (0, N.jsx)(`span`, {
                className: `front-kicker`,
                children: `RULES`,
              }),
              (0, N.jsx)(`span`, {
                className: `front-kicker`,
                children: `SAVED AUTOMATICALLY`,
              }),
            ],
          }),
          (0, N.jsxs)(`fieldset`, {
            className: `setup-kind front-seg`,
            "aria-label": `Game mode`,
            children: [
              (0, N.jsx)(`button`, {
                "aria-pressed": u === `race`,
                disabled: r,
                onClick: () => t()?.selectKind(`race`),
                children: `SINGLE RACE`,
              }),
              (0, N.jsx)(`button`, {
                id: `timed-lap-mode`,
                "aria-pressed": u === `timed-lap`,
                disabled: r,
                onClick: () => t()?.selectKind(`timed-lap`),
                children: `TIMED LAP`,
              }),
            ],
          }),
          u === `timed-lap`
            ? (0, N.jsxs)(`div`, {
                className: `modifier-controls`,
                children: [
                  (0, N.jsxs)(`fieldset`, {
                    className: `modifier-row`,
                    disabled: _,
                    "aria-labelledby": s,
                    children: [
                      (0, N.jsxs)(`span`, {
                        className: `modifier-label`,
                        id: s,
                        children: [
                          `Track direction`,
                          (0, N.jsx)(`small`, {
                            children: f
                              ? `REVERSE LAP LEADERBOARD`
                              : `TIMED LAP LEADERBOARD`,
                          }),
                        ],
                      }),
                      (0, N.jsx)(`div`, {
                        className: `modifier-choices`,
                        children: [`normal`, `reverse`].map((e) =>
                          (0, N.jsx)(
                            `button`,
                            {
                              "aria-pressed": c.direction === e,
                              onClick: () =>
                                t()?.selectModifiers({ direction: e }),
                              children: e.toUpperCase(),
                            },
                            e,
                          ),
                        ),
                      }),
                    ],
                  }),
                  (0, N.jsx)(`p`, {
                    className: `setup-note`,
                    children: `OPEN TRACK · TURBO EVERY LAP · UNLIMITED LAPS`,
                  }),
                ],
              })
            : (0, N.jsx)(N0, {
                modifiers: c,
                difficulty: e?.difficulty ?? `phantom`,
                disabled: _,
                onChange: (e) => t()?.selectModifiers(e),
                onDifficulty: (e) => t()?.selectDifficulty(e),
              }),
          (0, N.jsx)(`p`, {
            className:
              `setup-boards` + (u === `timed-lap` || v ? ` is-standard` : ``),
            children:
              u === `timed-lap`
                ? `COUNTS FOR THE TIMED LAP BOARDS`
                : v
                  ? `STANDARD RULES · COUNTS FOR LEADERBOARDS`
                  : `CUSTOM RACE · LOCAL RECORDS ONLY`,
          }),
        ],
      }),
      (e?.circuit.error || e?.ship.error) &&
        (0, N.jsx)(`p`, {
          role: `alert`,
          className: `setup-error`,
          children: e?.circuit.error || e?.ship.error,
        }),
      (0, N.jsxs)(`button`, {
        id: `start-btn`,
        className: `front-primary setup-launch`,
        "data-pad": `start`,
        disabled: n.disabled,
        onClick: a,
        children: [
          (0, N.jsx)(Le, {}),
          (0, N.jsxs)(`span`, {
            children: [
              n.disabled ? n.label : `LAUNCH`,
              (0, N.jsx)(`small`, {
                children:
                  n.disabled || e?.circuit.loaded === !1
                    ? n.detail
                    : `${g} · ${u === `timed-lap` ? `TIMED LAP` : `SINGLE RACE`}`,
              }),
            ],
          }),
          (0, N.jsx)(Wi, { pad: `☰` }),
        ],
      }),
      (0, N.jsx)(Ki, {
        hints: [
          [[`B`], [`ESC`], `BACK`],
          [[`LT`, `RT`], [`Z`, `C`], `CIRCUIT`],
          [[`✚`], [`↑ ↓ ← →`], `MOVE · ADJUST`],
          [[`Y`], [`G`], `GARAGE`],
          [[`☰`], [], `LAUNCH`],
        ],
        children:
          e?.circuit.loaded === !1
            ? `${g} LOADS WHEN YOU LAUNCH`
            : `${g} READY`,
      }),
    ],
  });
}
var I0 = (e, t) => `ui/awards/${e}-${t}.webp`;
