// assets__index-DphGw8Ou 10 — children
// Lines 71475-72013 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function JX({ kind: e, hud: t, getGame: n }) {
  let [r, i] = (0, C.useState)(null),
    a = r ?? (t?.controller || t?.steamDeck ? 2 : t?.mobile ? 3 : 1),
    [o, s] = (0, C.useState)(``),
    [c, l] = (0, C.useState)(``),
    u = t?.settings ?? uX,
    d = (0, C.useSyncExternalStore)(BX, UX, () => !0),
    f = (e) => n()?.setSettings(e),
    p = t?.music.index ?? 0,
    m = (0, C.useCallback)(
      (e) => {
        let t = e?.children[p];
        if (!e || !t) return;
        let n = t.offsetTop + t.offsetHeight + 26;
        t.offsetTop < e.scrollTop
          ? (e.scrollTop = t.offsetTop)
          : n > e.scrollTop + e.clientHeight &&
            (e.scrollTop = n - e.clientHeight);
      },
      [p],
    );
  return e === `controls`
    ? (0, N.jsxs)(ll, {
        title: `FLIGHT CONTROLS`,
        section: `PILOT HANDBOOK`,
        number: `05`,
        subtitle: `Learn the line. Master the airbrakes.`,
        className: `controls-screen`,
        footer:
          t?.steamDeck && !t.controller
            ? (0, N.jsxs)(`span`, {
                children: [
                  `STEAM DECK `,
                  (0, N.jsx)(`span`, {
                    className: `footer-divider`,
                    children: `/`,
                  }),
                  ` SET YOUR BROWSER'S STEAM INPUT LAYOUT TO GAMEPAD WITH MOUSE TRACKPAD`,
                ],
              })
            : (0, N.jsxs)(`span`, {
                children: [
                  `HOLD USE FOR CANNON `,
                  (0, N.jsx)(`span`, {
                    className: `footer-divider`,
                    children: `/`,
                  }),
                  ` ABSORB TO REPAIR`,
                ],
              }),
        children: [
          (0, N.jsx)(`fieldset`, {
            className: `game-tabs control-tabs`,
            "aria-label": `Control device`,
            children: [
              [we, `KEYBOARD`],
              [_e, `CONTROLLER`],
              [Qe, `TOUCH`],
            ].map(([e, t], n) => {
              let r = e;
              return (0, N.jsxs)(
                `button`,
                {
                  "data-menu-initial": a === n + 1 || void 0,
                  "aria-pressed": a === n + 1,
                  onClick: () => i(n + 1),
                  children: [(0, N.jsx)(r, {}), t],
                },
                n,
              );
            }),
          }),
          (0, N.jsx)(`div`, {
            className: `control-bindings`,
            style: {
              gridTemplateRows: `repeat(${Math.ceil(KX.length / 2)}, 38px)`,
            },
            children: KX.map((e) =>
              (0, N.jsxs)(
                `div`,
                {
                  className: `control-binding`,
                  children: [
                    (0, N.jsx)(`span`, { children: e[0] }),
                    (0, N.jsx)(`kbd`, { children: e[a] }),
                  ],
                },
                e[0],
              ),
            ),
          }),
          (0, N.jsxs)(`div`, {
            className: `control-rules`,
            children: [
              (0, N.jsxs)(`span`, {
                children: [
                  (0, N.jsx)(ht, {}),
                  ` CYAN PADS `,
                  (0, N.jsx)(`b`, { children: `AUTOMATIC BOOST` }),
                ],
              }),
              (0, N.jsxs)(`span`, {
                children: [
                  (0, N.jsx)(fe, {}),
                  ` AMBER PADS `,
                  (0, N.jsx)(`b`, { children: `WEAPON / SHIELD / TURBO` }),
                ],
              }),
            ],
          }),
        ],
      })
    : (0, N.jsx)(ll, {
        title: `FLIGHT SETTINGS`,
        section: `SHIP SYSTEMS`,
        number: `04`,
        subtitle: `Your setup. Saved automatically.`,
        className: `settings-screen`,
        footer: (0, N.jsxs)(`span`, {
          children: [
            t?.renderer ?? `INITIALIZING`,
            ` `,
            (0, N.jsx)(`span`, { className: `footer-divider`, children: `/` }),
            ` `,
            (0, N.jsx)(`span`, {
              className: `settings-save-status`,
              "data-status": t?.preferences.status ?? `local`,
              children: qX(t),
            }),
          ],
        }),
        children: o
          ? (0, N.jsxs)(`section`, {
              className: `restart-diagnostics-panel`,
              "data-menu-scope": `restart-diagnostics`,
              "aria-label": `Restart diagnostics`,
              children: [
                (0, N.jsxs)(`div`, {
                  className: `restart-diagnostics-heading`,
                  children: [
                    (0, N.jsx)(`h3`, { children: `RESTART DIAGNOSTICS` }),
                    (0, N.jsx)(`button`, {
                      "data-menu-back": !0,
                      onClick: () => s(``),
                      children: `BACK TO SETTINGS`,
                    }),
                  ],
                }),
                (0, N.jsx)(`p`, { children: t?.restartDiagnostics.message }),
                t?.restartDiagnostics.previous &&
                  (0, N.jsxs)(`p`, {
                    className: `restart-diagnostics-last`,
                    children: [
                      `Last saved: `,
                      t.restartDiagnostics.previous.mode,
                      ` ·`,
                      ` `,
                      t.restartDiagnostics.previous.elapsed,
                      `s ·`,
                      ` `,
                      t.restartDiagnostics.previous.backend || `initializing`,
                      ` ·`,
                      ` `,
                      t.restartDiagnostics.previous.quality ||
                        `unknown quality`,
                      ` ·`,
                      ` `,
                      t.restartDiagnostics.previous.textures,
                      ` textures`,
                    ],
                  }),
                (0, N.jsxs)(`p`, {
                  className: `restart-diagnostics-help`,
                  children: [
                    `Saved only in this browser tab. Nothing is sent automatically.`,
                    t?.restartDiagnostics.storageAvailable
                      ? ` If the game reloads, copy this report or take a screenshot.`
                      : ` Browser storage is unavailable, so details may not survive a reload.`,
                  ],
                }),
                (0, N.jsx)(`textarea`, {
                  "aria-label": `Restart diagnostic report`,
                  readOnly: !0,
                  value: o,
                  spellCheck: !1,
                  onFocus: (e) => e.currentTarget.select(),
                }),
                (0, N.jsxs)(`div`, {
                  className: `restart-diagnostics-actions`,
                  children: [
                    (0, N.jsx)(`button`, {
                      "data-menu-initial": !0,
                      onClick: async () => {
                        try {
                          if (!navigator.clipboard)
                            throw Error(`Clipboard unavailable`);
                          (await navigator.clipboard.writeText(o),
                            l(`Report copied.`));
                        } catch {
                          l(
                            `Tap the report above, then choose Copy. A screenshot also helps.`,
                          );
                        }
                      },
                      children: `COPY REPORT`,
                    }),
                    (0, N.jsx)(`output`, { children: c }),
                  ],
                }),
              ],
            })
          : (0, N.jsxs)(`div`, {
              className: `settings-columns`,
              children: [
                (0, N.jsxs)(`section`, {
                  className: `flight-settings-column`,
                  "aria-label": `Flight setup`,
                  children: [
                    (0, N.jsxs)(`h3`, {
                      className: `settings-section-title`,
                      children: [
                        (0, N.jsx)(`span`, { children: `01` }),
                        ` FLIGHT`,
                      ],
                    }),
                    (0, N.jsxs)(li, {
                      className: `setting-block`,
                      children: [
                        (0, N.jsxs)(`div`, {
                          className: `setting-label`,
                          children: [
                            (0, N.jsx)(fi, {
                              children: `Steering sensitivity`,
                            }),
                            (0, N.jsxs)(`b`, {
                              children: [u.sensitivity.toFixed(2), `×`],
                            }),
                          ],
                        }),
                        (0, N.jsx)(Au, {
                          "aria-label": `Steering sensitivity`,
                          min: 0.5,
                          max: 1.6,
                          step: 0.05,
                          value: [u.sensitivity],
                          onValueChange: (e) =>
                            f({ sensitivity: Array.isArray(e) ? e[0] : e }),
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`div`, {
                      className: `setting-switch`,
                      children: [
                        (0, N.jsxs)(`div`, {
                          children: [
                            (0, N.jsx)(`label`, {
                              htmlFor: `auto-throttle`,
                              children: `Auto-throttle`,
                            }),
                            (0, N.jsx)(`p`, {
                              children: `You steer. The ship accelerates.`,
                            }),
                          ],
                        }),
                        (0, N.jsx)(vl, {
                          id: `auto-throttle`,
                          checked: u.autoThrottle,
                          onCheckedChange: (e) => f({ autoThrottle: e }),
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`div`, {
                      className: `setting-switch`,
                      children: [
                        (0, N.jsxs)(`div`, {
                          children: [
                            (0, N.jsx)(`label`, {
                              htmlFor: `ghost-lap`,
                              children: `Ghost lap`,
                            }),
                            (0, N.jsx)(`p`, {
                              children: `In time trials, race a ghost of your best lap on that circuit, with a live gap to it.`,
                            }),
                          ],
                        }),
                        (0, N.jsx)(vl, {
                          id: `ghost-lap`,
                          checked: u.ghost,
                          onCheckedChange: (e) => f({ ghost: e }),
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`div`, {
                      className: `setting-switch`,
                      children: [
                        (0, N.jsxs)(`div`, {
                          children: [
                            (0, N.jsx)(`label`, {
                              htmlFor: `capture-controls`,
                              children: `Capture buttons`,
                            }),
                            (0, N.jsx)(`p`, {
                              children: `Screenshot and clip buttons in the top bar. F8 / F9 always work.`,
                            }),
                          ],
                        }),
                        (0, N.jsx)(vl, {
                          id: `capture-controls`,
                          checked: u.captureControls,
                          onCheckedChange: (e) => f({ captureControls: e }),
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`div`, {
                      className: `setting-switch`,
                      children: [
                        (0, N.jsxs)(`div`, {
                          children: [
                            (0, N.jsx)(`label`, {
                              htmlFor: `intro-at-start`,
                              children: `Intro at start`,
                            }),
                            (0, N.jsx)(`p`, {
                              children: `The VECTOR demo plays when the game opens. Any key skips it.`,
                            }),
                          ],
                        }),
                        (0, N.jsx)(vl, {
                          id: `intro-at-start`,
                          checked: d,
                          onCheckedChange: (e) => WX(e),
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`button`, {
                      className: `restart-diagnostics-trigger`,
                      disabled: t?.mode !== `menu`,
                      onClick: () => HX(),
                      children: [
                        `PLAY INTRO`,
                        (0, N.jsx)(`small`, {
                          children: `59 seconds · any key skips`,
                        }),
                      ],
                    }),
                    (0, N.jsx)(`div`, {
                      className: `setting-label`,
                      children: (0, N.jsx)(`span`, { children: `Camera` }),
                    }),
                    (0, N.jsxs)(`fieldset`, {
                      className: `segmented`,
                      "aria-label": `Camera view`,
                      children: [
                        (0, N.jsx)(`button`, {
                          "aria-pressed": u.camera === `chase`,
                          onClick: () => f({ camera: `chase` }),
                          children: `CHASE`,
                        }),
                        (0, N.jsx)(`button`, {
                          "aria-pressed": u.camera === `close`,
                          onClick: () => f({ camera: `close` }),
                          children: `CLOSE`,
                        }),
                        (0, N.jsx)(`button`, {
                          "aria-pressed": u.camera === `first`,
                          onClick: () => f({ camera: `first` }),
                          children: `1ST PERSON`,
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`button`, {
                      className: `restart-diagnostics-trigger`,
                      onClick: () => {
                        (s(
                          n()?.diagnosticsReport() ||
                            `No report is available yet.`,
                        ),
                          l(``));
                      },
                      children: [
                        `RESTART DIAGNOSTICS`,
                        (t?.restartDiagnostics.kind === `unexpected` ||
                          t?.restartDiagnostics.kind === `error`) &&
                          (0, N.jsx)(`small`, {
                            children: `Previous session needs review`,
                          }),
                      ],
                    }),
                  ],
                }),
                (0, N.jsxs)(`section`, {
                  className: `display-settings-column`,
                  "aria-label": `Display setup`,
                  children: [
                    (0, N.jsxs)(`h3`, {
                      className: `settings-section-title`,
                      children: [
                        (0, N.jsx)(`span`, { children: `02` }),
                        ` DISPLAY`,
                      ],
                    }),
                    (0, N.jsx)(`div`, {
                      className: `setting-label`,
                      children: (0, N.jsx)(`span`, {
                        children: `Aspect ratio`,
                      }),
                    }),
                    (0, N.jsxs)(`fieldset`, {
                      className: `segmented`,
                      "aria-label": `Aspect ratio`,
                      children: [
                        (0, N.jsx)(`button`, {
                          "aria-pressed": u.aspect === `16:9`,
                          onClick: () => f({ aspect: `16:9` }),
                          children: `16:9 STANDARD`,
                        }),
                        (0, N.jsx)(`button`, {
                          "aria-pressed": u.aspect === `21:9`,
                          disabled: t?.steamDeck,
                          onClick: () => f({ aspect: `21:9` }),
                          children: `21:9 ULTRAWIDE`,
                        }),
                      ],
                    }),
                    t?.steamDeck &&
                      (0, N.jsx)(`p`, {
                        className: `graphics-help`,
                        children: `Fixed at 16:9 on Steam Deck.`,
                      }),
                    (0, N.jsx)(Dl, { hud: t, getGame: n }),
                  ],
                }),
                (0, N.jsxs)(`section`, {
                  className: `audio-settings-column`,
                  "aria-label": `Audio setup`,
                  children: [
                    (0, N.jsxs)(`h3`, {
                      className: `settings-section-title`,
                      children: [
                        (0, N.jsx)(`span`, { children: `03` }),
                        ` AUDIO`,
                      ],
                    }),
                    [
                      [`Master volume`, `volume`],
                      [`Music`, `musicVolume`],
                      [`Sound FX`, `effectsVolume`],
                    ].map(([e, t]) =>
                      (0, N.jsxs)(
                        li,
                        {
                          className: `setting-block`,
                          children: [
                            (0, N.jsxs)(`div`, {
                              className: `setting-label`,
                              children: [
                                (0, N.jsx)(fi, { children: e }),
                                (0, N.jsxs)(`b`, {
                                  children: [Math.round(u[t] * 100), `%`],
                                }),
                              ],
                            }),
                            (0, N.jsx)(Au, {
                              "aria-label": e,
                              min: 0,
                              max: 1,
                              step: 0.05,
                              value: [u[t]],
                              onValueChange: (e) =>
                                f({ [t]: Array.isArray(e) ? e[0] : e }),
                            }),
                          ],
                        },
                        t,
                      ),
                    ),
                    (0, N.jsxs)(`div`, {
                      className: `soundtrack-setting`,
                      children: [
                        (0, N.jsxs)(`div`, {
                          className: `setting-label`,
                          children: [
                            (0, N.jsx)(`span`, { children: `Race soundtrack` }),
                            (0, N.jsxs)(`button`, {
                              className: `soundtrack-shuffle`,
                              "aria-pressed": t?.music.shuffle ?? !0,
                              onClick: () =>
                                n()?.setMusicShuffle(!(t?.music.shuffle ?? !0)),
                              children: [
                                (0, N.jsx)(Xe, { "aria-hidden": `true` }),
                                `SHUFFLE`,
                              ],
                            }),
                          ],
                        }),
                        (0, N.jsx)(`div`, {
                          ref: m,
                          className: `soundtrack-list`,
                          "aria-label": `Soundtrack playlist`,
                          children: ju.map((e, r) =>
                            (0, N.jsxs)(
                              `button`,
                              {
                                id: `music-${e.id}`,
                                "aria-pressed": (t?.music.index ?? 0) === r,
                                onClick: () => n()?.selectMusic(r),
                                children: [
                                  (0, N.jsx)(`span`, {
                                    className: `soundtrack-number`,
                                    children: String(r + 1).padStart(2, `0`),
                                  }),
                                  (0, N.jsxs)(`span`, {
                                    children: [
                                      (0, N.jsx)(`strong`, {
                                        children: e.title,
                                      }),
                                      (0, N.jsx)(`small`, {
                                        children: e.artist,
                                      }),
                                    ],
                                  }),
                                  (t?.music.index ?? 0) === r &&
                                    (0, N.jsx)(Pe, {
                                      "aria-label": `Selected track`,
                                    }),
                                ],
                              },
                              e.id,
                            ),
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
      });
}
