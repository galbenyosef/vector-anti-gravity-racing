// assets__index-DF2rMRzV 23 — children
// Lines 76574-77529 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function a1({ hud: e, getGame: t, onGarage: n }) {
  let r = e?.online,
    i = () => t()?.online,
    a = !!r?.lobbyId,
    [o, s] = (0, C.useState)(`chat`),
    [c, l] = (0, C.useState)(`rooms`),
    u = a ? o : c,
    [d, f] = (0, C.useState)(`public`),
    [p, m] = (0, C.useState)(``),
    [h, g] = (0, C.useState)(``),
    [_, v] = (0, C.useState)(0),
    [y, b] = (0, C.useState)(() => Date.now()),
    x = (0, C.useRef)(null);
  (0, C.useEffect)(() => {
    if (!r?.open) return;
    let e = window.setInterval(() => b(Date.now()), 1e3);
    return () => window.clearInterval(e);
  }, [r?.open]);
  let S = r?.chat.length ?? 0;
  (0, C.useEffect)(() => {
    u === `chat` && x.current?.scrollIntoView({ block: `end` });
  }, [u, S]);
  let w = (e) => {
      ((u === `chat` || e === `chat`) && v(S), (a ? s : l)(e));
    },
    T = Math.max(
      0,
      wJ.findIndex((e) => e.id === r?.circuitId),
    ),
    E = wJ[T],
    D = (0, C.useMemo)(() => {
      if (r?.lobbyId) return r.pilots;
      let t = e?.ship.selected ?? `kestrel`;
      return [
        {
          id: `self`,
          name: r?.selfName || `YOU`,
          self: !0,
          host: !1,
          avatar: r?.selfAvatar ?? null,
          loadout: {
            ship: t,
            skin: e?.ship.skin ?? `original`,
            tier: 1,
            medals: 0,
          },
          status: `standby`,
          ping: null,
        },
      ];
    }, [
      r?.lobbyId,
      r?.pilots,
      r?.selfName,
      r?.selfAvatar,
      e?.ship.selected,
      e?.ship.skin,
    ]),
    O = e?.lobbyStage?.anchors ?? [],
    k = (r?.pilots.length ?? 0) >= 8,
    j = O.flatMap((e) => {
      let t = D.find((t) => t.id === e.pilot || (e.slot === 0 && t.self && !a));
      return t
        ? [{ key: t.id, anchor: e, pilot: t }]
        : r?.available && !k
          ? [{ key: `slot-${e.slot}`, anchor: e, pilot: null }]
          : [];
    }),
    { layer: ee, spots: te, laid: ne, crowded: re } = i1(j),
    M = !a || !r?.isHost || !!r?.settingsLocked,
    oe = (r?.events ?? []).filter((e) => y - e.time < 4500),
    se = u === `chat` ? 0 : Math.max(0, S - _),
    ce = (e) => {
      i()?.say(e) && g(``);
    };
  if (!r) return null;
  let le = e?.lobbyStage?.loading;
  if (le)
    return (0, N.jsx)(ol, {
      open: !!r.open,
      onOpenChange: (e) => i()?.setOpen(e),
      children: (0, N.jsxs)(ul, {
        className: `game-screen lobby-screen front-online`,
        showCloseButton: !1,
        "data-menu-scope": `launch-bay`,
        children: [
          (0, N.jsx)(Gi, {}),
          (0, N.jsxs)(`header`, {
            className: `lobby-header is-preparing`,
            children: [
              (0, N.jsxs)(`button`, {
                className: `lobby-back`,
                "data-menu-back": !0,
                onClick: () => i()?.setOpen(!1),
                children: [
                  (0, N.jsx)(ie, {}),
                  ` `,
                  a ? `LEAVE` : `BACK`,
                  (0, N.jsx)(`kbd`, {
                    className: `menu-hints-keyboard`,
                    children: `ESC`,
                  }),
                ],
              }),
              (0, N.jsx)(dl, { className: `sr-only`, children: `Launch Bay` }),
              (0, N.jsx)(fl, {
                className: `sr-only`,
                children: `Preparing the launch bay.`,
              }),
            ],
          }),
          (0, N.jsx)(J$, {
            stage: le.stage,
            progress: le.progress,
            back: a ? `LEAVE` : `BACK`,
            onBack: () => i()?.setOpen(!1),
          }),
        ],
      }),
    });
  let ue = Y$.find((e) => e.id === r.visibility) ?? Y$[0],
    de = r.available
      ? a
        ? r.isHost
          ? r.launching
            ? (0, N.jsxs)(`button`, {
                className: `lobby-launch is-launching`,
                onClick: () => i()?.cancelLaunch(),
                children: [
                  (0, N.jsx)(He, {}),
                  (0, N.jsxs)(`span`, {
                    children: [
                      `LAUNCHING…`,
                      (0, N.jsx)(`small`, {
                        children: r.waitingFor.length
                          ? `WAITING FOR ${r.waitingFor.slice(0, 2).join(`, `).toUpperCase()}${r.waitingFor.length > 2 ? ` +${r.waitingFor.length - 2}` : ``} · CANCEL`
                          : `STARTING · CANCEL`,
                      }),
                    ],
                  }),
                ],
              })
            : (0, N.jsxs)(`button`, {
                id: `online-start`,
                className: `lobby-launch`,
                "data-pad": `start`,
                "data-menu-initial": !0,
                disabled: !r.canLaunch,
                onClick: () => void i()?.launch(),
                children: [
                  (0, N.jsx)(He, {}),
                  (0, N.jsxs)(`span`, {
                    children: [
                      r.active && !r.complete
                        ? `RACE IN PROGRESS`
                        : r.complete
                          ? `LAUNCH REMATCH`
                          : `LAUNCH RACE`,
                      (0, N.jsx)(`small`, {
                        children:
                          r.pilots.length < 2
                            ? `WAITING FOR A RIVAL`
                            : `${r.pilots.length} PILOTS · LOADS ONCE, THEN GO`,
                      }),
                    ],
                  }),
                ],
              })
          : (0, N.jsxs)(`output`, {
              className: `lobby-launch is-waiting`,
              children: [
                (0, N.jsx)(He, {}),
                (0, N.jsxs)(`span`, {
                  children: [
                    r.launching
                      ? r.circuitLoading
                        ? `LOADING CIRCUIT`
                        : `READY · LAUNCHING`
                      : r.active && !r.complete
                        ? `RACE IN PROGRESS`
                        : `WAITING FOR HOST`,
                    (0, N.jsx)(`small`, {
                      children: r.launching
                        ? `THE RACE STARTS WHEN EVERYONE IS READY`
                        : `${r.hostName.toUpperCase()} LAUNCHES THE RACE`,
                    }),
                  ],
                }),
              ],
            })
        : (0, N.jsxs)(`button`, {
            id: `lobby-host`,
            className: `lobby-launch`,
            "data-pad": `start`,
            "data-menu-initial": !0,
            disabled: r.busy || !r.connected,
            onClick: () => void i()?.create(d),
            children: [
              (0, N.jsx)(He, {}),
              (0, N.jsxs)(`span`, {
                children: [
                  `HOST A ROOM`,
                  (0, N.jsxs)(`small`, {
                    children: [
                      Y$.find((e) => e.id === d).label,
                      ` · UP TO 8 PILOTS`,
                    ],
                  }),
                ],
              }),
            ],
          })
      : (0, N.jsxs)(`a`, {
          className: `lobby-launch`,
          "data-menu-initial": !0,
          href: `https://wavedash.com/games/vector-anti-gravity-racing`,
          target: `_blank`,
          rel: `noreferrer`,
          children: [
            (0, N.jsx)(pe, {}),
            (0, N.jsxs)(`span`, {
              children: [
                `PLAY ON WAVEDASH`,
                (0, N.jsx)(`small`, {
                  children: `ONLINE ROOMS LIVE ON WAVEDASH`,
                }),
              ],
            }),
            (0, N.jsx)(A, {}),
          ],
        });
  return (0, N.jsx)(ol, {
    open: !!r.open,
    onOpenChange: (e) => i()?.setOpen(e),
    children: (0, N.jsxs)(ul, {
      className: `game-screen lobby-screen front-online`,
      showCloseButton: !1,
      "data-menu-scope": `launch-bay`,
      children: [
        (0, N.jsx)(Gi, {}),
        (0, N.jsxs)(`div`, {
          ref: ee,
          className:
            `lobby-plates` + (ne ? ` is-laid` : ``) + (re ? ` is-crowded` : ``),
          "aria-label": `Pilots in the bay`,
          children: [
            (0, N.jsx)(`svg`, {
              className: `lobby-tethers`,
              viewBox: `0 0 100 100`,
              preserveAspectRatio: `none`,
              "aria-hidden": `true`,
              children: j.map(({ key: e, anchor: t, pilot: n }, r) => {
                let i = te[r];
                return (0, N.jsx)(
                  `path`,
                  {
                    d: `M${i.x * 100} ${i.y * 100}L${t.x * 100} ${(t.y + 0.029 * t.scale) * 100}`,
                    style: { stroke: n?.loadout ? HQ(n.loadout) : `#5f7f8c` },
                  },
                  e,
                );
              }),
            }),
            j.map(({ key: e, anchor: t, pilot: n }, o) => {
              let s = te[o];
              return n
                ? (0, N.jsx)(
                    t1,
                    { pilot: n, x: s.x, y: s.y, scale: t.scale },
                    e,
                  )
                : (0, N.jsxs)(
                    `button`,
                    {
                      className: `lobby-plate lobby-invite-slot`,
                      "data-plate": e,
                      style: {
                        left: `${s.x * 100}%`,
                        top: `${s.y * 100}%`,
                        "--plate-scale": t.scale,
                      },
                      onClick: () => {
                        (w(`friends`), i()?.refreshFriends());
                      },
                      children: [
                        (0, N.jsx)(Re, {}),
                        (0, N.jsxs)(`span`, {
                          children: [
                            `INVITE A PILOT`,
                            (0, N.jsx)(`small`, {
                              children: a
                                ? `${r.pilots.length} / 8 IN THE BAY`
                                : `HOSTS A FRIENDS ROOM`,
                            }),
                          ],
                        }),
                      ],
                    },
                    e,
                  );
            }),
          ],
        }),
        (0, N.jsxs)(`header`, {
          className: `lobby-header`,
          children: [
            (0, N.jsxs)(`button`, {
              className: `lobby-back`,
              "data-menu-back": !0,
              onClick: () => i()?.setOpen(!1),
              children: [
                (0, N.jsx)(ie, {}),
                ` `,
                a ? `LEAVE` : `BACK`,
                (0, N.jsx)(`kbd`, {
                  className: `menu-hints-keyboard`,
                  children: `ESC`,
                }),
              ],
            }),
            (0, N.jsxs)(`div`, {
              className: `lobby-title`,
              children: [
                (0, N.jsx)(`span`, { children: `VECTOR / WAVEDASH NETWORK` }),
                (0, N.jsx)(dl, { children: `LAUNCH BAY` }),
                (0, N.jsx)(fl, {
                  children: a
                    ? `${r.isHost ? `YOUR ROOM` : r.hostName ? `${r.hostName.toUpperCase()}’S ROOM` : `RACE ROOM`} · ${r.pilots.length} / 8 PILOTS`
                    : `Host a room, join one, or bring your friends.`,
                }),
              ],
            }),
            a &&
              (0, N.jsxs)(`div`, {
                className: `lobby-room-chips`,
                children: [
                  (0, N.jsxs)(`span`, {
                    className: `lobby-chip vis-${r.visibility}`,
                    children: [
                      r.visibility === `private`
                        ? (0, N.jsx)(Ee, {})
                        : r.visibility === `friends`
                          ? (0, N.jsx)(ct, {})
                          : (0, N.jsx)(pe, {}),
                      ue.label,
                    ],
                  }),
                  (0, N.jsxs)(`button`, {
                    className: `lobby-chip`,
                    onClick: () => void i()?.copyInvite(),
                    disabled: r.busy,
                    children: [(0, N.jsx)(we, {}), ` COPY INVITE`],
                  }),
                ],
              }),
            (0, N.jsxs)(`div`, {
              className: `lobby-self`,
              children: [
                (0, N.jsx)(Q$, {
                  name: r.selfName || `You`,
                  src: r.selfAvatar,
                  accent: e?.ship
                    ? HQ({ ship: e.ship.selected, skin: e.ship.skin })
                    : `#56e7ff`,
                  size: 46,
                }),
                (0, N.jsxs)(`span`, {
                  className: `lobby-self-copy`,
                  children: [
                    r.selfName || `PILOT`,
                    (0, N.jsx)(`small`, {
                      children: r.available
                        ? r.connected
                          ? `ONLINE`
                          : `CONNECTING…`
                        : `LOCAL`,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, N.jsx)(`section`, {
          className: `lobby-left`,
          "aria-label": a ? `Race settings` : `Host a room`,
          children:
            a || !r.available
              ? (0, N.jsxs)(`div`, {
                  className: `lobby-card lobby-circuit`,
                  children: [
                    (0, N.jsx)(`span`, {
                      className: `lobby-card-kicker`,
                      children: a
                        ? r.isHost
                          ? `RACE SETTINGS · YOU CHOOSE`
                          : `RACE SETTINGS · HOST CHOOSES`
                        : `CIRCUIT`,
                    }),
                    (0, N.jsxs)(`div`, {
                      className: `lobby-circuit-pick`,
                      children: [
                        (0, N.jsx)(`button`, {
                          "aria-label": `Previous circuit`,
                          disabled: M,
                          onClick: () =>
                            i()?.setCircuit(
                              wJ[(T + wJ.length - 1) % wJ.length].id,
                            ),
                          children: (0, N.jsx)(ie, {}),
                        }),
                        (0, N.jsx)(qZ, {
                          path: E.mapPath,
                          label: `${E.name} map`,
                        }),
                        (0, N.jsx)(`button`, {
                          "aria-label": `Next circuit`,
                          disabled: M,
                          onClick: () =>
                            i()?.setCircuit(wJ[(T + 1) % wJ.length].id),
                          children: (0, N.jsx)(ae, {}),
                        }),
                      ],
                    }),
                    (0, N.jsx)(`strong`, {
                      children: E.name.replace(` MK III`, ``).toUpperCase(),
                    }),
                    (0, N.jsxs)(`small`, {
                      children: [
                        E.category,
                        ` · `,
                        E.lengthLabel,
                        ` · `,
                        r.rules.laps,
                        ` `,
                        r.rules.laps === 1 ? `LAP` : `LAPS`,
                      ],
                    }),
                    (0, N.jsx)(n1, {
                      label: `LAPS`,
                      value: r.rules.laps,
                      min: 1,
                      max: 10,
                      disabled: M,
                      onChange: (e) => void i()?.setRules({ laps: e }),
                    }),
                    (0, N.jsx)(r1, {
                      label: `DIRECTION`,
                      value: r.rules.direction,
                      options: [
                        [`normal`, `NORMAL`],
                        [`reverse`, `REVERSE`],
                      ],
                      disabled: M,
                      onChange: (e) => void i()?.setRules({ direction: e }),
                    }),
                    (0, N.jsx)(r1, {
                      label: `WEAPONS`,
                      value: r.rules.weapons ? `on` : `off`,
                      options: [
                        [`on`, `ON`],
                        [`off`, `OFF`],
                      ],
                      disabled: M,
                      onChange: (e) =>
                        void i()?.setRules({ weapons: e === `on` }),
                    }),
                    (0, N.jsx)(r1, {
                      label: `BOOST PADS`,
                      value: r.rules.disableBoostPads ? `off` : `on`,
                      options: [
                        [`on`, `ON`],
                        [`off`, `OFF`],
                      ],
                      disabled: M,
                      onChange: (e) =>
                        void i()?.setRules({ disableBoostPads: e === `off` }),
                    }),
                    (0, N.jsx)(`p`, {
                      className: `lobby-card-note`,
                      children: a
                        ? `Changing settings never loads anything. The circuit loads once, at launch.`
                        : `Online racing is available when you play VECTOR on Wavedash.`,
                    }),
                  ],
                })
              : (0, N.jsxs)(`div`, {
                  className: `lobby-card lobby-host`,
                  children: [
                    (0, N.jsx)(`span`, {
                      className: `lobby-card-kicker`,
                      children: `HOST A ROOM`,
                    }),
                    (0, N.jsx)(`fieldset`, {
                      className: `lobby-privacy`,
                      "aria-label": `Room privacy`,
                      children: Y$.map((e) =>
                        (0, N.jsxs)(
                          `button`,
                          {
                            "aria-pressed": d === e.id,
                            onClick: () => f(e.id),
                            children: [
                              e.id === `private`
                                ? (0, N.jsx)(Ee, {})
                                : e.id === `friends`
                                  ? (0, N.jsx)(ct, {})
                                  : (0, N.jsx)(pe, {}),
                              (0, N.jsxs)(`span`, {
                                children: [
                                  e.label,
                                  (0, N.jsx)(`small`, { children: e.note }),
                                ],
                              }),
                            ],
                          },
                          e.id,
                        ),
                      ),
                    }),
                    (0, N.jsxs)(`p`, {
                      className: `lobby-card-note`,
                      children: [
                        `Your room starts on `,
                        E.name.replace(` MK III`, ``),
                        `. Change the circuit and rules inside the room; nothing loads until you launch.`,
                      ],
                    }),
                    (0, N.jsxs)(`form`, {
                      className: `lobby-join`,
                      onSubmit: (e) => {
                        (e.preventDefault(), i()?.join(p));
                      },
                      children: [
                        (0, N.jsx)(`label`, {
                          htmlFor: `lobby-join-code`,
                          children: `JOIN BY ROOM ID`,
                        }),
                        (0, N.jsxs)(`div`, {
                          children: [
                            (0, N.jsx)(`input`, {
                              id: `lobby-join-code`,
                              placeholder: `Paste a room ID`,
                              autoComplete: `off`,
                              autoCapitalize: `none`,
                              spellCheck: !1,
                              value: p,
                              maxLength: 80,
                              onChange: (e) => m(e.target.value),
                            }),
                            (0, N.jsxs)(`button`, {
                              type: `submit`,
                              disabled: r.busy || !p.trim(),
                              children: [`JOIN `, (0, N.jsx)(A, {})],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
        }),
        (0, N.jsxs)(`section`, {
          className: `lobby-right`,
          "aria-label": `Rooms, friends and chat`,
          children: [
            (0, N.jsxs)(`nav`, {
              className: `lobby-tabs`,
              "aria-label": `Panels`,
              "data-menu-sections": !0,
              children: [
                (0, N.jsx)(Wi, { pad: `LT`, keys: `Z` }),
                (a
                  ? [
                      `chat`,
                      `friends`,
                      ...(r.standings.length ? [`results`] : []),
                    ]
                  : [`rooms`, `friends`]
                ).map((e) =>
                  (0, N.jsxs)(
                    `button`,
                    {
                      "aria-pressed": u === e,
                      onClick: () => {
                        (w(e), e === `friends` && i()?.refreshFriends());
                      },
                      children: [
                        e === `chat`
                          ? (0, N.jsx)(Me, {})
                          : e === `friends`
                            ? (0, N.jsx)(st, {})
                            : e === `results`
                              ? (0, N.jsx)(ot, {})
                              : (0, N.jsx)(pe, {}),
                        e.toUpperCase(),
                        e === `chat` &&
                          se > 0 &&
                          u !== `chat` &&
                          (0, N.jsx)(`b`, {
                            className: `lobby-unread`,
                            children: se,
                          }),
                      ],
                    },
                    e,
                  ),
                ),
                (0, N.jsx)(Wi, { pad: `RT`, keys: `C` }),
              ],
            }),
            u === `rooms` &&
              (0, N.jsxs)(`div`, {
                className: `lobby-panel lobby-rooms`,
                children: [
                  (0, N.jsxs)(`div`, {
                    className: `lobby-panel-head`,
                    children: [
                      (0, N.jsx)(`fieldset`, {
                        className: `lobby-segment`,
                        "aria-label": `Room list`,
                        children: [`public`, `friends`].map((e) =>
                          (0, N.jsx)(
                            `button`,
                            {
                              "aria-pressed": r.roomsTab === e,
                              disabled: !r.available || r.busy,
                              onClick: () => void i()?.refresh(e),
                              children: e === `public` ? `PUBLIC` : `FRIENDS'`,
                            },
                            e,
                          ),
                        ),
                      }),
                      (0, N.jsx)(`button`, {
                        className: `lobby-icon-button`,
                        "aria-label": `Refresh rooms`,
                        "data-pad": `x`,
                        disabled: !r.available || r.busy,
                        onClick: () => void i()?.refresh(),
                        children: (0, N.jsx)(Be, {}),
                      }),
                    ],
                  }),
                  (0, N.jsx)(`ul`, {
                    children: r.rooms.map((e) => {
                      let t = wJ.find((t) => t.id === e.circuitId);
                      return (0, N.jsx)(
                        `li`,
                        {
                          children: (0, N.jsxs)(`button`, {
                            className: `lobby-room`,
                            disabled: r.busy,
                            onClick: () => void i()?.join(e.id),
                            children: [
                              t &&
                                (0, N.jsx)(qZ, {
                                  path: t.mapPath,
                                  label: `${t.name} map`,
                                }),
                              (0, N.jsxs)(`span`, {
                                children: [
                                  (0, N.jsx)(`strong`, {
                                    children: e.host
                                      ? `${e.host.toUpperCase()}’S ROOM`
                                      : e.name,
                                  }),
                                  (0, N.jsxs)(`small`, {
                                    children: [
                                      (t?.name ?? e.name)
                                        .replace(` MK III`, ``)
                                        .toUpperCase(),
                                      e.rules &&
                                        e.rules.laps !== 3 &&
                                        ` · ${e.rules.laps} ${e.rules.laps === 1 ? `LAP` : `LAPS`}`,
                                      e.rules?.direction === `reverse` &&
                                        ` · REVERSE`,
                                      e.rules &&
                                        !e.rules.weapons &&
                                        ` · NO WEAPONS`,
                                      e.rules?.disableBoostPads && ` · NO PADS`,
                                    ],
                                  }),
                                  (0, N.jsx)(`i`, {
                                    className: `lobby-seats`,
                                    "aria-label": `${e.count} of ${e.max} pilots`,
                                    children: Array.from(
                                      { length: e.max },
                                      (t, n) =>
                                        (0, N.jsx)(
                                          `b`,
                                          {
                                            className:
                                              n < e.count ? `is-taken` : ``,
                                          },
                                          n,
                                        ),
                                    ),
                                  }),
                                ],
                              }),
                              (0, N.jsxs)(`em`, {
                                children: [`JOIN `, (0, N.jsx)(A, {})],
                              }),
                            ],
                          }),
                        },
                        e.id,
                      );
                    }),
                  }),
                  !r.rooms.length &&
                    (0, N.jsx)(`p`, {
                      className: `lobby-empty`,
                      children: r.available
                        ? r.roomsTab === `friends`
                          ? `None of your friends are hosting. Host a room and invite them.`
                          : `No open rooms right now. Host one and be first on the grid.`
                        : `Rooms appear here when you play on Wavedash.`,
                    }),
                ],
              }),
            u === `friends` &&
              (0, N.jsxs)(`div`, {
                className: `lobby-panel lobby-friends`,
                children: [
                  (0, N.jsx)(`ul`, {
                    children: r.friends.map((e) =>
                      (0, N.jsxs)(
                        `li`,
                        {
                          className: e.online ? `is-online` : ``,
                          children: [
                            (0, N.jsx)(Q$, {
                              name: e.name,
                              src: e.avatar,
                              accent: e.online ? `#57e3a0` : `#4c6170`,
                              size: 36,
                            }),
                            (0, N.jsxs)(`span`, {
                              className: `lobby-friend-copy`,
                              children: [
                                (0, N.jsx)(`strong`, { children: e.name }),
                                (0, N.jsx)(`small`, {
                                  children: e.inRoom
                                    ? `IN YOUR ROOM`
                                    : e.online
                                      ? `ONLINE`
                                      : `OFFLINE`,
                                }),
                              ],
                            }),
                            (0, N.jsx)(`button`, {
                              disabled:
                                !r.available ||
                                r.busy ||
                                e.inRoom ||
                                e.invited ||
                                k,
                              onClick: () => void i()?.inviteFriend(e.id),
                              children: e.inRoom
                                ? `HERE`
                                : e.invited
                                  ? `INVITED ✓`
                                  : `INVITE`,
                            }),
                          ],
                        },
                        e.id,
                      ),
                    ),
                  }),
                  !r.friends.length &&
                    (0, N.jsx)(`p`, {
                      className: `lobby-empty`,
                      children: r.available
                        ? `Add friends on Wavedash and they appear here, ready to invite.`
                        : `Your Wavedash friends appear here.`,
                    }),
                  a &&
                    (0, N.jsxs)(`button`, {
                      className: `lobby-wide`,
                      onClick: () => void i()?.copyInvite(),
                      disabled: r.busy,
                      children: [(0, N.jsx)(we, {}), ` COPY INVITE LINK`],
                    }),
                  r.available &&
                    (0, N.jsxs)(`button`, {
                      className: `lobby-wide`,
                      onClick: () => i()?.openOverlay(),
                      children: [
                        (0, N.jsx)(st, {}),
                        ` ADD FRIENDS ON WAVEDASH `,
                        (0, N.jsx)(A, {}),
                      ],
                    }),
                ],
              }),
            u === `chat` &&
              (0, N.jsxs)(`div`, {
                className: `lobby-panel lobby-chat`,
                children: [
                  (0, N.jsxs)(`ol`, {
                    "aria-live": `polite`,
                    children: [
                      r.chat.map((e) =>
                        (0, N.jsxs)(
                          `li`,
                          {
                            className: e.self ? `is-self` : ``,
                            children: [
                              (0, N.jsx)(`strong`, { children: e.name }),
                              ` `,
                              e.text,
                            ],
                          },
                          e.id,
                        ),
                      ),
                      !r.chat.length &&
                        (0, N.jsx)(`li`, {
                          className: `lobby-empty`,
                          children: `Say hello. Quick chat works with a controller too.`,
                        }),
                      (0, N.jsx)(`li`, { ref: x, "aria-hidden": `true` }),
                    ],
                  }),
                  (0, N.jsx)(`div`, {
                    className: `lobby-quick`,
                    children: B$.map((e) =>
                      (0, N.jsx)(
                        `button`,
                        { onClick: () => ce(e), children: e },
                        e,
                      ),
                    ),
                  }),
                  (0, N.jsxs)(`form`, {
                    className: `lobby-say`,
                    onSubmit: (e) => {
                      (e.preventDefault(), ce(h));
                    },
                    children: [
                      (0, N.jsx)(`input`, {
                        "aria-label": `Chat message`,
                        placeholder: `Message the room`,
                        value: h,
                        maxLength: 120,
                        onChange: (e) => g(e.target.value),
                      }),
                      (0, N.jsx)(`button`, {
                        type: `submit`,
                        "aria-label": `Send`,
                        disabled: !h.trim(),
                        children: (0, N.jsx)(Ge, {}),
                      }),
                    ],
                  }),
                ],
              }),
            u === `results` &&
              (0, N.jsx)(`div`, {
                className: `lobby-panel lobby-results`,
                children: (0, N.jsx)(`ol`, {
                  "aria-label": `Online race standings`,
                  children: r.standings.map((e, t) =>
                    (0, N.jsxs)(
                      `li`,
                      {
                        className: e.id === r.selfId ? `is-self` : ``,
                        children: [
                          (0, N.jsx)(`b`, {
                            children: String(t + 1).padStart(2, `0`),
                          }),
                          (0, N.jsx)(`span`, { children: e.name }),
                          (0, N.jsx)(`strong`, {
                            children: e.dnf
                              ? `DNF`
                              : e.finished
                                ? kJ(e.time)
                                : `RACING`,
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                }),
              }),
          ],
        }),
        oe.length > 0 &&
          (0, N.jsx)(`div`, {
            className: `lobby-events`,
            "aria-live": `polite`,
            children: oe.map((e) =>
              (0, N.jsxs)(
                `span`,
                {
                  className: `is-${e.kind}`,
                  children: [
                    e.name.toUpperCase(),
                    ` `,
                    e.kind === `joined` ? `JOINED THE BAY` : `LEFT`,
                  ],
                },
                e.id,
              ),
            ),
          }),
        (0, N.jsxs)(`footer`, {
          className: `lobby-footer`,
          children: [
            (0, N.jsxs)(`div`, {
              className: `lobby-actions`,
              children: [
                (0, N.jsxs)(`button`, {
                  "data-pad": `y`,
                  onClick: n,
                  disabled:
                    r.busy ||
                    r.launching ||
                    (r.active && !r.complete) ||
                    !e?.ready,
                  children: [(0, N.jsx)(dt, {}), ` CHANGE CRAFT`],
                }),
                a &&
                  (0, N.jsxs)(`button`, {
                    onClick: () => void i()?.leave(),
                    disabled: r.busy,
                    children: [(0, N.jsx)(Oe, {}), ` LEAVE ROOM`],
                  }),
              ],
            }),
            r.message &&
              (0, N.jsxs)(`output`, {
                className: `lobby-message`,
                children: [
                  r.message,
                  (0, N.jsx)(`button`, {
                    "aria-label": `Dismiss`,
                    onClick: () => {
                      let e = i();
                      e && (e.message = ``);
                    },
                    children: (0, N.jsx)(mt, {}),
                  }),
                ],
              }),
            de,
          ],
        }),
      ],
    }),
  });
}
