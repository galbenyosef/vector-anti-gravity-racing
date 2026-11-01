// assets__index-DF2rMRzV 15 — children
// Lines 73106-73386 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function dQ({ open: e, onClose: t, hud: n, getGame: r, busy: i }) {
  let [a, o] = (0, C.useState)(!0),
    s = (0, C.useRef)(null),
    c = id(n?.ship.selected),
    l = lQ(c.id, n?.ship.skin),
    u = cQ(c.id),
    d = nd.indexOf(c),
    f = (0, C.useRef)(r);
  ((0, C.useEffect)(() => {
    f.current = r;
  }, [r]),
    (0, C.useEffect)(() => {
      if (!e || !n?.ready) return;
      let t = f.current();
      return (
        t?.setGarageOpen(!0),
        o(t?.world.garage?.rotating ?? !1),
        () => t?.setGarageOpen(!1)
      );
    }, [e, n?.ready]));
  let p = (e, t = 0) => {
    (r()?.world.garage?.drag(e, t), o(!1));
  };
  return (0, N.jsx)(ol, {
    open: e,
    onOpenChange: (e) => {
      e || t();
    },
    children: (0, N.jsxs)(ul, {
      className: `game-screen garage-screen front-garage`,
      showCloseButton: !1,
      "data-menu-scope": `garage`,
      style: { "--craft-accent": l.colors[0] },
      children: [
        (0, N.jsx)(Gi, {}),
        (0, N.jsx)(dl, { className: `front-hidden`, children: `SHIP GARAGE` }),
        (0, N.jsx)(fl, {
          className: `front-hidden`,
          children: `Pick your craft and its livery. Every craft shares the same handling.`,
        }),
        (0, N.jsx)(`div`, {
          className: `garage-drag`,
          "aria-label": `Drag to rotate the ship`,
          onPointerDown: (e) => {
            e.button === 0 &&
              (e.currentTarget.setPointerCapture(e.pointerId),
              (s.current = { x: e.clientX, y: e.clientY, id: e.pointerId }));
          },
          onPointerMove: (e) => {
            if (!s.current || s.current.id !== e.pointerId) return;
            let t =
              900 /
              (e.currentTarget.closest(`.game-stage`)?.getBoundingClientRect()
                .height || 900);
            (p((e.clientX - s.current.x) * t, (e.clientY - s.current.y) * t),
              (s.current = { x: e.clientX, y: e.clientY, id: e.pointerId }));
          },
          onPointerUp: () => {
            s.current = null;
          },
          onPointerCancel: () => {
            s.current = null;
          },
          onLostPointerCapture: () => {
            s.current = null;
          },
        }),
        (0, N.jsxs)(`section`, {
          className: `garage-crafts`,
          "aria-label": `Craft`,
          children: [
            (0, N.jsxs)(`span`, {
              className: `front-section-head`,
              children: [
                (0, N.jsxs)(`span`, {
                  className: `front-kicker`,
                  children: [
                    `CRAFT · `,
                    String(d + 1).padStart(2, `0`),
                    ` / 0`,
                    nd.length,
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
              className: `garage-craft-list`,
              "aria-label": `Available ships`,
              "data-menu-sections": !0,
              children: nd.map((e) =>
                (0, N.jsxs)(
                  `button`,
                  {
                    id: `ship-${e.id}`,
                    className: `front-row garage-craft`,
                    "aria-pressed": e.id === c.id,
                    disabled: i,
                    onClick: () => void r()?.selectShip(e.id),
                    children: [
                      (0, N.jsx)(`i`, {
                        style: { background: e.color },
                        "aria-hidden": `true`,
                      }),
                      (0, N.jsxs)(`span`, {
                        children: [
                          (0, N.jsx)(`small`, { children: e.code }),
                          (0, N.jsx)(`b`, { children: e.name.toUpperCase() }),
                        ],
                      }),
                      (0, N.jsx)(`small`, {
                        children:
                          e.id === c.id ? `IN USE` : e.shape.toUpperCase(),
                      }),
                    ],
                  },
                  e.id,
                ),
              ),
            }),
            (0, N.jsxs)(`p`, {
              className: `garage-handling`,
              children: [
                (0, N.jsx)(`i`, { "aria-hidden": `true` }),
                ` ALL CRAFT SHARE THE SAME HANDLING`,
              ],
            }),
          ],
        }),
        (0, N.jsxs)(`section`, {
          className: `garage-identity`,
          "aria-label": `${c.name} details`,
          children: [
            (0, N.jsxs)(`span`, {
              className: `front-kicker is-hot`,
              children: [c.code, ` · `, l.edition],
            }),
            (0, N.jsx)(`h3`, { children: c.name.toUpperCase() }),
            (0, N.jsx)(`p`, {
              children: l.id === `original` ? c.description : l.description,
            }),
            (0, N.jsxs)(`div`, {
              className: `garage-view-controls`,
              children: [
                (0, N.jsx)(`button`, {
                  "aria-label": `Rotate ship left`,
                  onClick: () => p(-36),
                  children: (0, N.jsx)(ie, {}),
                }),
                (0, N.jsx)(`button`, {
                  "aria-label": a
                    ? `Pause ship rotation`
                    : `Resume ship rotation`,
                  onClick: () => {
                    let e = r()?.world.garage;
                    (e && (e.rotating = !a), o(!a));
                  },
                  children: a ? (0, N.jsx)(Ie, {}) : (0, N.jsx)(Le, {}),
                }),
                (0, N.jsx)(`button`, {
                  "aria-label": `Rotate ship right`,
                  onClick: () => p(36),
                  children: (0, N.jsx)(ae, {}),
                }),
                (0, N.jsx)(`button`, {
                  "aria-label": `Reset ship view`,
                  onClick: () => r()?.world.garage?.reset(),
                  children: (0, N.jsx)(Ue, {}),
                }),
                (0, N.jsx)(`span`, { children: `DRAG TO INSPECT` }),
              ],
            }),
          ],
        }),
        (0, N.jsxs)(`section`, {
          className: `garage-liveries`,
          "aria-label": `${c.name} liveries`,
          children: [
            (0, N.jsxs)(`span`, {
              className: `front-section-head`,
              children: [
                (0, N.jsxs)(`span`, {
                  className: `front-kicker`,
                  children: [
                    `LIVERY · `,
                    u.length,
                    ` FOR `,
                    c.name.toUpperCase(),
                  ],
                }),
                (0, N.jsxs)(`span`, {
                  className: `front-kicker`,
                  children: [
                    String(u.findIndex((e) => e.id === l.id) + 1).padStart(
                      2,
                      `0`,
                    ),
                    ` /`,
                    ` `,
                    String(u.length).padStart(2, `0`),
                  ],
                }),
              ],
            }),
            (0, N.jsx)(`fieldset`, {
              className: `garage-livery-list`,
              "aria-label": `${c.name} skins`,
              children: u.map((e) =>
                (0, N.jsxs)(
                  `button`,
                  {
                    id: `skin-${e.id}`,
                    className: `front-row garage-livery`,
                    "aria-pressed": l.id === e.id,
                    "data-menu-initial": l.id === e.id || void 0,
                    disabled: i,
                    onClick: () => void r()?.selectSkin(e.id),
                    children: [
                      (0, N.jsxs)(`span`, {
                        className: `garage-livery-top`,
                        children: [
                          (0, N.jsx)(`small`, { children: e.edition }),
                          l.id === e.id &&
                            (0, N.jsxs)(`em`, {
                              children: [(0, N.jsx)(re, {}), ` EQUIPPED`],
                            }),
                        ],
                      }),
                      (0, N.jsx)(`b`, { children: e.name.toUpperCase() }),
                      (0, N.jsx)(`span`, {
                        className: `garage-swatches`,
                        "aria-hidden": `true`,
                        children: e.colors.map((e) =>
                          (0, N.jsx)(`i`, { style: { background: e } }, e),
                        ),
                      }),
                    ],
                  },
                  e.id,
                ),
              ),
            }),
            (0, N.jsx)(`p`, {
              className: `garage-livery-note`,
              children: `YOUR PAD, NAME PLATE AND TRAIL TAKE ITS COLOUR ONLINE`,
            }),
            n?.ship.error &&
              (0, N.jsx)(`p`, {
                className: `ship-load-error`,
                role: `alert`,
                children: n.ship.error,
              }),
          ],
        }),
        (0, N.jsx)(`button`, {
          className: `front-hidden`,
          "data-menu-back": !0,
          onClick: t,
          children: `BACK`,
        }),
        (0, N.jsx)(Ki, {
          hints: [
            [[`LB`, `RB`], [`Q`, `E`], `TABS`],
            [[`LT`, `RT`], [`Z`, `C`], `CRAFT`],
            [[`✚`], [`↑ ↓ ← →`], `LIVERY`],
            [[`A`], [`ENTER`], `EQUIP`],
            [[`B`], [`ESC`], `BACK`],
          ],
          children: n?.ship.loading
            ? `PREPARING YOUR CRAFT…`
            : `${c.code} ${c.name.toUpperCase()} · ${l.name.toUpperCase()}`,
        }),
      ],
    }),
  });
}
