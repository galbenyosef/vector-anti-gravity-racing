// assets__index-DF2rMRzV 11 — children
// Lines 71813-72336 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function nZ({ kind: e, hud: t, getGame: n }) {
  let [r, i] = (0, C.useState)(e === `controls` ? `controls` : `flight`),
    [a, o] = (0, C.useState)(null),
    s = a ?? (t?.controller || t?.steamDeck ? 2 : t?.mobile ? 3 : 1),
    [c, l] = (0, C.useState)(``),
    [u, d] = (0, C.useState)(``),
    f = t?.settings ?? gX,
    p = (0, C.useSyncExternalStore)(KX, YX, () => !0),
    m = (e) => n()?.setSettings(e),
    h = t?.music.index ?? 0,
    g = (0, C.useCallback)(
      (e) => {
        let t = e?.children[h];
        if (!e || !t) return;
        let n = t.offsetTop + t.offsetHeight + 26;
        t.offsetTop < e.scrollTop
          ? (e.scrollTop = t.offsetTop)
          : n > e.scrollTop + e.clientHeight &&
            (e.scrollTop = n - e.clientHeight);
      },
      [h],
    ),
    _ = (e, t, n, r, i) =>
      (0, N.jsxs)(`div`, {
        className: `setting-switch`,
        children: [
          (0, N.jsxs)(`div`, {
            children: [
              (0, N.jsx)(`label`, { htmlFor: e, children: t }),
              (0, N.jsx)(`p`, { children: n }),
            ],
          }),
          (0, N.jsx)(Sl, { id: e, checked: r, onCheckedChange: i }),
        ],
      });
  return (0, N.jsx)(pl, {
    kicker: `VECTOR · SYSTEMS`,
    title: `SETTINGS`,
    description: `Flight, display, audio and controls. Saved automatically.`,
    scope: `settings`,
    className: `game-screen settings-drawer`,
    head:
      !c &&
      (0, N.jsxs)(`fieldset`, {
        className: `front-subtabs settings-sections`,
        "aria-label": `Settings section`,
        "data-menu-sections": !0,
        children: [
          (0, N.jsx)(Wi, { pad: `LT`, keys: `Z` }),
          eZ.map((e) =>
            (0, N.jsx)(
              `button`,
              {
                "aria-pressed": r === e,
                "data-menu-initial": r === e || void 0,
                onClick: () => i(e),
                children: e.toUpperCase(),
              },
              e,
            ),
          ),
          (0, N.jsx)(Wi, { pad: `RT`, keys: `C` }),
        ],
      }),
    hints: [
      [[`LT`, `RT`], [`Z`, `C`], `SECTION`],
      [[`✚`], [`↑ ↓`], `MOVE`],
      [[`A`], [`ENTER`], `CHANGE`],
    ],
    status: (0, N.jsxs)(N.Fragment, {
      children: [
        (0, N.jsx)(`span`, { children: t?.renderer ?? `INITIALIZING` }),
        (0, N.jsx)(`span`, {
          className: `settings-save-status`,
          "data-status": t?.preferences.status ?? `local`,
          children: tZ(t),
        }),
      ],
    }),
    children: c
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
                  onClick: () => l(``),
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
                  t.restartDiagnostics.previous.quality || `unknown quality`,
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
              value: c,
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
                      (await navigator.clipboard.writeText(c),
                        d(`Report copied.`));
                    } catch {
                      d(
                        `Tap the report above, then choose Copy. A screenshot also helps.`,
                      );
                    }
                  },
                  children: `COPY REPORT`,
                }),
                (0, N.jsx)(`output`, { children: u }),
              ],
            }),
          ],
        })
      : r === `flight`
        ? (0, N.jsxs)(`section`, {
            className: `settings-section`,
            "aria-label": `Flight`,
            children: [
              (0, N.jsxs)(li, {
                className: `setting-block`,
                children: [
                  (0, N.jsxs)(`div`, {
                    className: `setting-label`,
                    children: [
                      (0, N.jsx)(fi, { children: `Steering sensitivity` }),
                      (0, N.jsxs)(`b`, {
                        children: [f.sensitivity.toFixed(2), `×`],
                      }),
                    ],
                  }),
                  (0, N.jsx)(Pu, {
                    "aria-label": `Steering sensitivity`,
                    min: 0.5,
                    max: 1.6,
                    step: 0.05,
                    value: [f.sensitivity],
                    onValueChange: (e) =>
                      m({ sensitivity: Array.isArray(e) ? e[0] : e }),
                  }),
                ],
              }),
              _(
                `auto-throttle`,
                `Auto-throttle`,
                `You steer. The ship accelerates.`,
                f.autoThrottle,
                (e) => m({ autoThrottle: e }),
              ),
              _(
                `ghost-lap`,
                `Ghost lap`,
                `In time trials, race a ghost of your best lap on that circuit, with a live gap to it.`,
                f.ghost,
                (e) => m({ ghost: e }),
              ),
              (0, N.jsxs)(`div`, {
                className: `setting-block`,
                children: [
                  (0, N.jsx)(`div`, {
                    className: `setting-label`,
                    children: (0, N.jsx)(`span`, { children: `Camera` }),
                  }),
                  (0, N.jsxs)(`fieldset`, {
                    className: `front-seg`,
                    "aria-label": `Camera view`,
                    children: [
                      (0, N.jsx)(`button`, {
                        "aria-pressed": f.camera === `chase`,
                        onClick: () => m({ camera: `chase` }),
                        children: `CHASE`,
                      }),
                      (0, N.jsx)(`button`, {
                        "aria-pressed": f.camera === `close`,
                        onClick: () => m({ camera: `close` }),
                        children: `CLOSE`,
                      }),
                      (0, N.jsx)(`button`, {
                        "aria-pressed": f.camera === `first`,
                        onClick: () => m({ camera: `first` }),
                        children: `1ST PERSON`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, N.jsxs)(`button`, {
                className: `restart-diagnostics-trigger`,
                onClick: () => {
                  (l(n()?.diagnosticsReport() || `No report is available yet.`),
                    d(``));
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
          })
        : r === `display`
          ? (0, N.jsxs)(`section`, {
              className: `settings-section display-settings-column`,
              "aria-label": `Display`,
              children: [
                (0, N.jsxs)(`div`, {
                  className: `setting-block`,
                  children: [
                    (0, N.jsx)(`div`, {
                      className: `setting-label`,
                      children: (0, N.jsx)(`span`, {
                        children: `Aspect ratio`,
                      }),
                    }),
                    (0, N.jsxs)(`fieldset`, {
                      className: `front-seg`,
                      "aria-label": `Aspect ratio`,
                      children: [
                        (0, N.jsx)(`button`, {
                          "aria-pressed": f.aspect === `16:9`,
                          onClick: () => m({ aspect: `16:9` }),
                          children: `16:9 STANDARD`,
                        }),
                        (0, N.jsx)(`button`, {
                          "aria-pressed": f.aspect === `21:9`,
                          disabled: t?.steamDeck,
                          onClick: () => m({ aspect: `21:9` }),
                          children: `21:9 ULTRAWIDE`,
                        }),
                      ],
                    }),
                    t?.steamDeck &&
                      (0, N.jsx)(`p`, {
                        className: `graphics-help`,
                        children: `Fixed at 16:9 on Steam Deck.`,
                      }),
                  ],
                }),
                (0, N.jsx)(jl, { hud: t, getGame: n }),
                _(
                  `capture-controls`,
                  `Capture buttons`,
                  `Screenshot and clip buttons in the race bar. F8 / F9 always work.`,
                  f.captureControls,
                  (e) => m({ captureControls: e }),
                ),
                _(
                  `intro-at-start`,
                  `Intro at start`,
                  `The VECTOR demo plays when the game opens. Any key skips it.`,
                  p,
                  (e) => XX(e),
                ),
                (0, N.jsxs)(`button`, {
                  className: `restart-diagnostics-trigger`,
                  disabled: t?.mode !== `menu`,
                  onClick: () => JX(),
                  children: [
                    `PLAY INTRO`,
                    (0, N.jsx)(`small`, {
                      children: `59 seconds · any key skips`,
                    }),
                  ],
                }),
              ],
            })
          : r === `audio`
            ? (0, N.jsxs)(`section`, {
                className: `settings-section audio-settings-column`,
                "aria-label": `Audio`,
                children: [
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
                                children: [Math.round(f[t] * 100), `%`],
                              }),
                            ],
                          }),
                          (0, N.jsx)(Pu, {
                            "aria-label": e,
                            min: 0,
                            max: 1,
                            step: 0.05,
                            value: [f[t]],
                            onValueChange: (e) =>
                              m({ [t]: Array.isArray(e) ? e[0] : e }),
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
                              (0, N.jsx)(Ye, { "aria-hidden": `true` }),
                              `SHUFFLE`,
                            ],
                          }),
                        ],
                      }),
                      (0, N.jsx)(`div`, {
                        ref: g,
                        className: `soundtrack-list`,
                        "aria-label": `Soundtrack playlist`,
                        children: Fu.map((e, r) =>
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
                                    (0, N.jsx)(`strong`, { children: e.title }),
                                    (0, N.jsx)(`small`, { children: e.artist }),
                                  ],
                                }),
                                (t?.music.index ?? 0) === r &&
                                  (0, N.jsx)(Ne, {
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
              })
            : (0, N.jsxs)(`section`, {
                className: `settings-section controls-section`,
                "aria-label": `Controls`,
                children: [
                  (0, N.jsxs)(`div`, {
                    className: `controls-device`,
                    children: [
                      (0, N.jsx)(`fieldset`, {
                        className: `front-seg`,
                        "aria-label": `Control device`,
                        children: [
                          [Ce, `KEYBOARD`],
                          [ge, `CONTROLLER`],
                          [Ze, `TOUCH`],
                        ].map(([e, t], n) => {
                          let r = e;
                          return (0, N.jsxs)(
                            `button`,
                            {
                              "aria-pressed": s === n + 1,
                              onClick: () => o(n + 1),
                              children: [(0, N.jsx)(r, {}), t],
                            },
                            n,
                          );
                        }),
                      }),
                      t?.controller &&
                        (0, N.jsx)(`span`, {
                          className: `front-kicker controls-detected`,
                          children: `CONTROLLER DETECTED`,
                        }),
                    ],
                  }),
                  t?.steamDeck &&
                    !t.controller &&
                    (0, N.jsx)(`p`, {
                      className: `graphics-help`,
                      children: `Steam Deck: set your browser's Steam Input layout to Gamepad with Mouse Trackpad.`,
                    }),
                  (0, N.jsx)(`span`, {
                    className: `front-kicker`,
                    children: `IN THE RACE`,
                  }),
                  (0, N.jsx)(`div`, {
                    className: `controls-binds`,
                    children: QX.map((e) =>
                      (0, N.jsxs)(
                        `div`,
                        {
                          className: `controls-bind`,
                          children: [
                            (0, N.jsx)(`span`, { children: e[0] }),
                            (0, N.jsx)(`kbd`, { children: e[s] }),
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
                          (0, N.jsx)(ue, {}),
                          ` AMBER PADS `,
                          (0, N.jsx)(`b`, {
                            children: `WEAPON / SHIELD / TURBO`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  s !== 3 &&
                    (0, N.jsxs)(N.Fragment, {
                      children: [
                        (0, N.jsx)(`span`, {
                          className: `front-kicker`,
                          children: `IN THE MENUS`,
                        }),
                        (0, N.jsx)(`div`, {
                          className: `controls-menus`,
                          children: $X
                            .filter(([e, t]) => (s === 2 ? e : t).length)
                            .map(([e, t, n]) =>
                              (0, N.jsxs)(
                                `span`,
                                {
                                  className: `front-hint`,
                                  children: [
                                    (s === 2 ? e : t).map((e) =>
                                      (0, N.jsx)(
                                        `kbd`,
                                        { className: `front-key`, children: e },
                                        e,
                                      ),
                                    ),
                                    n,
                                  ],
                                },
                                n,
                              ),
                            ),
                        }),
                      ],
                    }),
                ],
              }),
  });
}
