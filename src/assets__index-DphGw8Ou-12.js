// assets__index-DphGw8Ou 12 — children
// Lines 72314-72723 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function uZ({ open: e, onClose: t, hud: n, getGame: r, busy: i }) {
  let [a, o] = (0, C.useState)(`fleet`),
    [s, c] = (0, C.useState)(!0),
    l = (0, C.useRef)(null),
    u = Qu(n?.ship.selected),
    d = cZ(u.id, n?.ship.skin),
    f = sZ(u.id),
    p = (0, C.useRef)(r);
  ((0, C.useEffect)(() => {
    p.current = r;
  }, [r]),
    (0, C.useEffect)(() => {
      if (!e || !n?.ready) return;
      let t = p.current();
      return (
        t?.setGarageOpen(!0),
        c(t?.world.garage?.rotating ?? !1),
        () => t?.setGarageOpen(!1)
      );
    }, [e, n?.ready]));
  let m = () => (a === `skins` ? o(`fleet`) : t()),
    h = (e, t = 0) => {
      (r()?.world.garage?.drag(e, t), c(!1));
    };
  return (0, N.jsx)(nl, {
    open: e,
    onOpenChange: (e) => {
      e || m();
    },
    children: (0, N.jsxs)(ol, {
      className: `game-screen garage-screen`,
      showCloseButton: !1,
      "data-menu-scope": `garage-${a}`,
      children: [
        (0, N.jsxs)(`header`, {
          className: `garage-heading`,
          children: [
            (0, N.jsxs)(`div`, {
              children: [
                (0, N.jsx)(`span`, {
                  className: `garage-eyebrow`,
                  children: `VECTOR / FLIGHT DIVISION`,
                }),
                (0, N.jsx)(sl, {
                  className: `garage-title`,
                  children: `SHIP GARAGE`,
                }),
                (0, N.jsx)(cl, {
                  className: `garage-subtitle`,
                  children: `Your craft. Your signature.`,
                }),
              ],
            }),
            (0, N.jsxs)(`nav`, {
              className: `garage-steps`,
              "aria-label": `Garage steps`,
              children: [
                (0, N.jsxs)(`button`, {
                  "aria-current": a === `fleet` ? `step` : void 0,
                  onClick: () => o(`fleet`),
                  children: [
                    (0, N.jsx)(`span`, { children: `01` }),
                    ` SELECT CRAFT`,
                  ],
                }),
                (0, N.jsx)(se, { "aria-hidden": `true` }),
                (0, N.jsxs)(`button`, {
                  "aria-current": a === `skins` ? `step` : void 0,
                  disabled: i,
                  onClick: () => o(`skins`),
                  children: [
                    (0, N.jsx)(`span`, { children: `02` }),
                    ` CUSTOMIZE`,
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, N.jsxs)(`div`, {
          className: `garage-layout`,
          style: { "--craft-accent": a === `skins` ? d.colors[0] : u.color },
          children: [
            (0, N.jsxs)(`section`, {
              className: `garage-showcase`,
              "aria-label": `${u.name} 3D preview`,
              children: [
                (0, N.jsxs)(`div`, {
                  className: `garage-showcase-meta`,
                  children: [
                    (0, N.jsx)(`span`, { children: `PHANTOM CLASS` }),
                    (0, N.jsxs)(`span`, {
                      children: [
                        `CRAFT `,
                        String(Xu.indexOf(u) + 1).padStart(2, `0`),
                        ` / 05`,
                      ],
                    }),
                  ],
                }),
                (0, N.jsx)(`div`, {
                  className: `garage-drag`,
                  "aria-label": `Drag to rotate the ship`,
                  onPointerDown: (e) => {
                    e.button === 0 &&
                      (e.currentTarget.setPointerCapture(e.pointerId),
                      (l.current = {
                        x: e.clientX,
                        y: e.clientY,
                        id: e.pointerId,
                      }));
                  },
                  onPointerMove: (e) => {
                    if (!l.current || l.current.id !== e.pointerId) return;
                    let t =
                      900 /
                      (e.currentTarget
                        .closest(`.game-stage`)
                        ?.getBoundingClientRect().height || 900);
                    (h(
                      (e.clientX - l.current.x) * t,
                      (e.clientY - l.current.y) * t,
                    ),
                      (l.current = {
                        x: e.clientX,
                        y: e.clientY,
                        id: e.pointerId,
                      }));
                  },
                  onPointerUp: () => {
                    l.current = null;
                  },
                  onPointerCancel: () => {
                    l.current = null;
                  },
                  onLostPointerCapture: () => {
                    l.current = null;
                  },
                }),
                (0, N.jsxs)(`div`, {
                  className: `garage-craft-identity`,
                  children: [
                    (0, N.jsxs)(`span`, {
                      className: `garage-eyebrow`,
                      children: [
                        u.code,
                        ` /`,
                        ` `,
                        a === `skins` ? d.edition : u.shape.toUpperCase(),
                      ],
                    }),
                    (0, N.jsxs)(`h3`, {
                      children: [
                        u.name.toUpperCase(),
                        (0, N.jsx)(`span`, { children: u.number }),
                      ],
                    }),
                    (0, N.jsx)(`p`, {
                      children: a === `skins` ? d.description : u.description,
                    }),
                  ],
                }),
                (0, N.jsxs)(`div`, {
                  className: `garage-view-controls`,
                  children: [
                    (0, N.jsx)(`span`, { children: `DRAG TO INSPECT` }),
                    (0, N.jsxs)(`div`, {
                      children: [
                        (0, N.jsx)(`button`, {
                          "aria-label": `Rotate ship left`,
                          onClick: () => h(-36),
                          children: (0, N.jsx)(oe, {}),
                        }),
                        (0, N.jsx)(`button`, {
                          "aria-label": s
                            ? `Pause ship rotation`
                            : `Resume ship rotation`,
                          onClick: () => {
                            let e = r()?.world.garage;
                            (e && (e.rotating = !s), c(!s));
                          },
                          children: s ? (0, N.jsx)(Le, {}) : (0, N.jsx)(Re, {}),
                        }),
                        (0, N.jsx)(`button`, {
                          "aria-label": `Rotate ship right`,
                          onClick: () => h(36),
                          children: (0, N.jsx)(se, {}),
                        }),
                        (0, N.jsx)(`button`, {
                          "aria-label": `Reset ship view`,
                          onClick: () => r()?.world.garage?.reset(),
                          children: (0, N.jsx)(We, {}),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, N.jsxs)(`section`, {
              className: `garage-panel`,
              "aria-label":
                a === `fleet` ? `Ship selection` : `Ship customization`,
              children: [
                (0, N.jsxs)(`div`, {
                  className: `garage-panel-title`,
                  children: [
                    (0, N.jsxs)(`div`, {
                      children: [
                        (0, N.jsx)(`span`, {
                          className: `garage-eyebrow`,
                          children:
                            a === `fleet`
                              ? `THE PHANTOM FLEET`
                              : `${u.code} / CUSTOMIZATION`,
                        }),
                        (0, N.jsx)(`h3`, {
                          children:
                            a === `fleet`
                              ? `SELECT YOUR CRAFT`
                              : `CHOOSE YOUR SKIN`,
                        }),
                      ],
                    }),
                    (0, N.jsx)(`span`, {
                      className: `garage-counter`,
                      children:
                        a === `fleet`
                          ? `05`
                          : String(f.length).padStart(2, `0`),
                    }),
                  ],
                }),
                a === `fleet`
                  ? (0, N.jsx)(`fieldset`, {
                      className: `garage-fleet`,
                      "aria-label": `Available ships`,
                      children: Xu.map((e) =>
                        (0, N.jsxs)(
                          `button`,
                          {
                            id: `ship-${e.id}`,
                            className: `garage-ship-card`,
                            "aria-pressed": e.id === u.id,
                            "data-menu-initial": e.id === u.id || void 0,
                            disabled: i,
                            onClick: () => void r()?.selectShip(e.id),
                            children: [
                              (0, N.jsx)(`img`, {
                                src: `models/previews/${e.id}.jpg`,
                                alt: ``,
                                width: `640`,
                                height: `480`,
                              }),
                              (0, N.jsxs)(`span`, {
                                children: [
                                  (0, N.jsx)(`small`, { children: e.code }),
                                  (0, N.jsx)(`b`, {
                                    children: e.name.toUpperCase(),
                                  }),
                                  (0, N.jsx)(`em`, { children: e.shape }),
                                ],
                              }),
                              (0, N.jsx)(`i`, {
                                children:
                                  e.id === u.id
                                    ? (0, N.jsx)(j, {
                                        "aria-label": `Selected`,
                                      })
                                    : e.number,
                              }),
                            ],
                          },
                          e.id,
                        ),
                      ),
                    })
                  : (0, N.jsxs)(`fieldset`, {
                      className: `garage-skin-list`,
                      "aria-label": `${u.name} skins`,
                      children: [
                        f.map((e) =>
                          (0, N.jsxs)(
                            `button`,
                            {
                              id: `skin-${e.id}`,
                              className: `garage-skin-card`,
                              "aria-pressed": d.id === e.id,
                              "data-menu-initial": d.id === e.id || void 0,
                              disabled: i,
                              onClick: () => void r()?.selectSkin(e.id),
                              children: [
                                (0, N.jsx)(`img`, {
                                  src: e.preview,
                                  alt: ``,
                                  width: `640`,
                                  height: `480`,
                                }),
                                (0, N.jsxs)(`span`, {
                                  className: `garage-skin-info`,
                                  children: [
                                    (0, N.jsx)(`small`, {
                                      children: e.edition,
                                    }),
                                    (0, N.jsx)(`b`, { children: e.name }),
                                    (0, N.jsx)(`span`, {
                                      className: `garage-swatches`,
                                      children: e.colors.map((e) =>
                                        (0, N.jsx)(
                                          `i`,
                                          { style: { background: e } },
                                          e,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                                (0, N.jsx)(`span`, {
                                  className: `garage-equipped`,
                                  children:
                                    d.id === e.id
                                      ? (0, N.jsxs)(N.Fragment, {
                                          children: [
                                            (0, N.jsx)(j, {}),
                                            ` EQUIPPED`,
                                          ],
                                        })
                                      : `SELECT`,
                                }),
                              ],
                            },
                            e.id,
                          ),
                        ),
                        f.length === 1 &&
                          (0, N.jsx)(`p`, {
                            className: `garage-skin-note`,
                            children: `The original livery is ready to fly. More skins will join this craft’s collection.`,
                          }),
                      ],
                    }),
                (0, N.jsxs)(`div`, {
                  className: `garage-panel-bottom`,
                  children: [
                    (0, N.jsx)(`output`, {
                      className: `garage-selection-status`,
                      children: n?.ship.loading
                        ? `PREPARING YOUR CRAFT…`
                        : (0, N.jsxs)(N.Fragment, {
                            children: [
                              (0, N.jsx)(`span`, {
                                className: `garage-ready-dot`,
                              }),
                              a === `fleet`
                                ? `ALL CRAFT SHARE THE SAME HANDLING`
                                : `${d.name.toUpperCase()} LIVERY EQUIPPED`,
                            ],
                          }),
                    }),
                    n?.ship.error &&
                      (0, N.jsx)(`p`, {
                        className: `ship-load-error`,
                        role: `alert`,
                        children: n.ship.error,
                      }),
                    (0, N.jsxs)(`button`, {
                      className: `garage-primary`,
                      disabled: i,
                      onClick: () => (a === `fleet` ? o(`skins`) : t()),
                      children: [
                        a === `fleet` ? `CUSTOMIZE SHIP` : `BACK TO GRID`,
                        (0, N.jsx)(ee, {}),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, N.jsxs)(`footer`, {
          className: `screen-footer garage-footer`,
          children: [
            (0, N.jsxs)(`button`, {
              className: `screen-back`,
              "data-menu-back": !0,
              onClick: m,
              children: [
                (0, N.jsx)(oe, {}),
                a === `skins` ? `CHANGE CRAFT` : `BACK`,
                (0, N.jsx)(`kbd`, {
                  className: `menu-hints-keyboard`,
                  children: `ESC`,
                }),
              ],
            }),
            (0, N.jsx)(Hi, { back: !1 }),
            (0, N.jsx)(`span`, {
              className: `garage-footer-note`,
              children:
                a === `fleet`
                  ? `SELECT → CUSTOMIZE → RACE`
                  : `LIVERY ONLY · SAME RACE PERFORMANCE`,
            }),
          ],
        }),
      ],
    }),
  });
}
