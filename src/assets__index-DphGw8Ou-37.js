// assets__index-DphGw8Ou 37 — children
// Lines 81070-81413 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function y0({
  hud: e,
  getGame: t,
  starting: n,
  locked: r,
  onBack: i,
  onStart: a,
  onHangar: o,
}) {
  let [s, c] = (0, C.useState)(!1),
    l = e?.modifiers ?? Lu,
    u = e?.circuit ?? yJ,
    d = e?.kind === `timed-lap` ? `timed-lap` : `race`,
    f = d === `timed-lap` ? qu(l) : l,
    p = l.direction === `reverse`,
    m = Qu(e?.ship.selected),
    h = Xu.indexOf(m);
  return (0, N.jsxs)(`section`, {
    className: `menu-page race-setup`,
    "data-menu-scope": `race-setup`,
    "aria-label": `Quick race`,
    children: [
      (0, N.jsx)(_0, {
        index: `01`,
        section: `QUICK RACE`,
        title: `RACE SETUP`,
        subtitle: `Pick a format, a circuit and your craft.`,
        onBack: i,
        children: (0, N.jsxs)(`fieldset`, {
          className: `setup-modes`,
          "aria-label": `Game mode`,
          children: [
            (0, N.jsxs)(`button`, {
              "aria-pressed": d === `race`,
              disabled: r,
              onClick: () => t()?.selectKind(`race`),
              children: [
                `SINGLE RACE`,
                (0, N.jsxs)(`small`, {
                  children: [
                    l.laps,
                    ` `,
                    l.laps === 1 ? `LAP` : `LAPS`,
                    ` · `,
                    l.cpuCount + 1,
                    ` `,
                    l.cpuCount === 0 ? `PILOT` : `PILOTS`,
                    ` · `,
                    l.weapons ? `WEAPONS` : `PURE RACING`,
                  ],
                }),
              ],
            }),
            (0, N.jsxs)(`button`, {
              id: `timed-lap-mode`,
              "aria-pressed": d === `timed-lap`,
              disabled: r,
              onClick: () => t()?.selectKind(`timed-lap`),
              children: [
                `TIMED LAP`,
                (0, N.jsx)(`small`, {
                  children: `OPEN TRACK · TURBO EVERY LAP`,
                }),
              ],
            }),
          ],
        }),
      }),
      (0, N.jsx)(`fieldset`, {
        className: `setup-circuits`,
        "aria-label": `Circuit selection`,
        children: vJ.map((e, n) => {
          let i = v0(d, e, Ku(f)),
            a = e.id === u.id;
          return (0, N.jsxs)(
            `button`,
            {
              className: `circuit-card scenery-${e.scenery}`,
              "aria-pressed": a,
              "aria-label": e.name,
              "data-menu-initial": a ? `` : void 0,
              disabled: r,
              onClick: () => t()?.browseCircuit(e.id),
              children: [
                (0, N.jsx)(`span`, {
                  className: `circuit-card-number`,
                  children: String(n + 1).padStart(2, `0`),
                }),
                (0, N.jsxs)(`span`, {
                  className: `circuit-card-kicker`,
                  children: [
                    e.category,
                    (0, N.jsx)(`i`, { children: e.timeOfDay }),
                  ],
                }),
                (0, N.jsx)(YX, {
                  path: e.mapPath,
                  label: `${e.name} circuit map`,
                }),
                (0, N.jsx)(`strong`, {
                  className: `circuit-card-name`,
                  children: e.name.replace(` MK III`, ``).toUpperCase(),
                }),
                (0, N.jsx)(`span`, {
                  className: `circuit-card-character`,
                  children: e.character,
                }),
                (0, N.jsxs)(`span`, {
                  className: `circuit-card-facts`,
                  children: [
                    (0, N.jsxs)(`span`, {
                      children: [
                        (0, N.jsx)(`b`, { children: e.lengthLabel }),
                        ` LENGTH`,
                      ],
                    }),
                    (0, N.jsxs)(`span`, {
                      children: [
                        (0, N.jsx)(`b`, { children: i ? CJ(i) : `—` }),
                        ` `,
                        d === `race` ? `BEST LAP` : `BEST TIMED LAP`,
                      ],
                    }),
                  ],
                }),
                a &&
                  (0, N.jsx)(`span`, {
                    className: `circuit-card-flag`,
                    children: `SELECTED`,
                  }),
              ],
            },
            e.id,
          );
        }),
      }),
      (0, N.jsxs)(`div`, {
        className: `setup-bottom`,
        children: [
          (0, N.jsxs)(`fieldset`, {
            className: `setup-ship`,
            "aria-label": `Player ship`,
            children: [
              (0, N.jsx)(`button`, {
                "aria-label": `Previous ship`,
                disabled: r || !e?.ready,
                onClick: () => t()?.cycleShip(-1),
                children: (0, N.jsx)(oe, {}),
              }),
              (0, N.jsxs)(`button`, {
                className: `setup-ship-name`,
                disabled: r || !e?.ready,
                onClick: o,
                children: [
                  (0, N.jsxs)(`span`, {
                    children: [
                      e?.ship.loading ? `PREPARING SHIP` : `YOUR CRAFT`,
                      ` `,
                      (0, N.jsxs)(`small`, {
                        children: [
                          String(h + 1).padStart(2, `0`),
                          ` / 0`,
                          Xu.length,
                        ],
                      }),
                    ],
                  }),
                  (0, N.jsxs)(`strong`, {
                    style: { color: m.color },
                    children: [
                      m.code,
                      ` `,
                      (0, N.jsx)(`b`, { children: m.name.toUpperCase() }),
                    ],
                  }),
                  (0, N.jsx)(`em`, { children: m.shape }),
                ],
              }),
              (0, N.jsx)(`button`, {
                "aria-label": `Next ship`,
                disabled: r || !e?.ready,
                onClick: () => t()?.cycleShip(1),
                children: (0, N.jsx)(se, {}),
              }),
            ],
          }),
          d === `timed-lap`
            ? (0, N.jsxs)(`fieldset`, {
                className: `setup-direction`,
                "aria-labelledby": `setup-direction-label`,
                disabled: r || !e?.ready,
                children: [
                  (0, N.jsx)(A, { "aria-hidden": `true` }),
                  (0, N.jsxs)(`span`, {
                    children: [
                      (0, N.jsx)(`strong`, {
                        id: `setup-direction-label`,
                        children: `DIRECTION`,
                      }),
                      (0, N.jsx)(`small`, {
                        children: p
                          ? `REVERSE LAP LEADERBOARD`
                          : `TIMED LAP LEADERBOARD`,
                      }),
                    ],
                  }),
                  (0, N.jsx)(`div`, {
                    className: `setup-direction-choices`,
                    children: [`normal`, `reverse`].map((e) =>
                      (0, N.jsx)(
                        `button`,
                        {
                          "aria-pressed": l.direction === e,
                          onClick: () => t()?.selectModifiers({ direction: e }),
                          children: e.toUpperCase(),
                        },
                        e,
                      ),
                    ),
                  }),
                ],
              })
            : (0, N.jsxs)(`button`, {
                className: `setup-modifiers`,
                "aria-label": `Race modifiers`,
                disabled: r || !e?.ready,
                onClick: () => c(!0),
                children: [
                  (0, N.jsx)(Ze, {}),
                  (0, N.jsxs)(`span`, {
                    children: [
                      (0, N.jsx)(`strong`, { children: `MODIFIERS` }),
                      (0, N.jsxs)(`small`, {
                        children: [
                          l.laps,
                          ` `,
                          l.laps === 1 ? `LAP` : `LAPS`,
                          ` ·`,
                          ` `,
                          l.direction.toUpperCase(),
                          ` ·`,
                          ` `,
                          l.cpuCount === 0
                            ? `NO CPU`
                            : `${l.cpuCount} ${BZ.find((t) => t.id === e?.difficulty)?.name ?? `PRO`} CPU`,
                        ],
                      }),
                      (0, N.jsxs)(`small`, {
                        children: [
                          l.weapons ? `WEAPONS ON` : `WEAPONS OFF`,
                          ` ·`,
                          ` `,
                          l.disableBoostPads ? `PADS OFF` : `PADS ON`,
                        ],
                      }),
                    ],
                  }),
                  (0, N.jsx)(se, {}),
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
            className: `setup-start`,
            disabled: n.disabled,
            onClick: a,
            children: [
              (0, N.jsx)(Re, {}),
              (0, N.jsxs)(`span`, {
                children: [
                  n.label,
                  (0, N.jsx)(`small`, { children: n.detail }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, N.jsx)(nl, {
        open: s,
        onOpenChange: c,
        children: (0, N.jsx)(ll, {
          title: `RACE MODIFIERS`,
          section: `QUICK RACE`,
          number: `01`,
          subtitle: `Your circuit. Your rules.`,
          className: `modifiers-screen`,
          footer: (0, N.jsx)(`span`, {
            children: `CHANGES SAVED AUTOMATICALLY`,
          }),
          children: (0, N.jsxs)(`div`, {
            className: `modifiers-layout`,
            children: [
              (0, N.jsxs)(`aside`, {
                className: `modifiers-intro`,
                children: [
                  (0, N.jsx)(Ze, {}),
                  (0, N.jsx)(`span`, {
                    className: `screen-section`,
                    children: `TUNE YOUR RACE`,
                  }),
                  (0, N.jsxs)(`h3`, {
                    children: [
                      `MAKE IT`,
                      (0, N.jsx)(`br`, {}),
                      (0, N.jsx)(`span`, { children: `YOUR OWN.` }),
                    ],
                  }),
                  (0, N.jsxs)(`p`, { children: [u.name, ` · Single Race`] }),
                  (0, N.jsx)(`p`, {
                    children: `Reverse the route, choose your rivals, or strip the race back to pure piloting.`,
                  }),
                  (0, N.jsx)(`small`, {
                    children:
                      !Gu(l) || l.cpuCount !== 7
                        ? `Custom race · local records only.`
                        : `Standard track rules · leaderboard times enabled.`,
                  }),
                ],
              }),
              (0, N.jsx)(g0, {
                modifiers: l,
                difficulty: e?.difficulty ?? `phantom`,
                disabled: r || !e?.ready,
                onChange: (e) => t()?.selectModifiers(e),
                onDifficulty: (e) => t()?.selectDifficulty(e),
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
var b0 = 160,
  x0 = (b0 * 2) / Math.sqrt(3),
  S0 = { race: he, "speed-lap": it, orbs: le, tournament: ot },
  C0 = (e) => `${e}${e === 1 ? `ST` : e === 2 ? `ND` : e === 3 ? `RD` : `TH`}`,
  w0 = (e) => vJ.find((t) => t.id === e.circuit);
