// assets__index-DF2rMRzV 49 — children
// Lines 84702-85752 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function t4() {
  let e = (0, C.useRef)(null),
    t = (0, C.useRef)(null),
    [n, r] = (0, C.useState)(null),
    [i, a] = (0, C.useState)(``),
    [o, s] = (0, C.useState)(``),
    [c, l] = (0, C.useState)(!1),
    [u, d] = (0, C.useState)(!1),
    [f, p] = (0, C.useState)(!1),
    [m, h] = (0, C.useState)(!1),
    g = p2((0, C.useSyncExternalStore)(d2, u2, () => o2[0]?.id ?? null)),
    _ = () => {
      (h(!0), f2());
    },
    [v, y] = (0, C.useState)(null),
    [b, x] = (0, C.useState)(`settings`),
    [S, w] = (0, C.useState)(`hub`),
    T = (0, C.useSyncExternalStore)(q2, e4, () => Q2),
    E = (0, C.useSyncExternalStore)(Y2, X2, () => !1),
    D = (0, C.useSyncExternalStore)(q2, Z2, () => null);
  (0, C.useEffect)(() => {
    let n = !1,
      i = G2();
    return (
      L$(
        async () => {
          let { RacerGame: e } = await import(`./game-D43Oxqny.js`);
          return { RacerGame: e };
        },
        __vite__mapDeps([4, 1, 2]),
        import.meta.url,
      )
        .then(({ RacerGame: o }) => {
          if (!(n || !e.current))
            try {
              let n = new o(
                e.current,
                (e) => (0, vi.flushSync)(() => r(e)),
                (e) => {
                  (s(t.current?.runtimeReport() ?? e), a(e));
                },
              );
              ((t.current = n), n.init());
            } catch (e) {
              (i.failure(`startup`, e),
                a(
                  e instanceof Error
                    ? e.message
                    : `The renderer could not start.`,
                ));
            }
        })
        .catch((e) => {
          (i.failure(`game import`, e), a(String(e)));
        }),
      () => {
        ((n = !0), t.current?.dispose(), (t.current = null));
      }
    );
  }, []);
  let k = n?.mode ?? `menu`,
    A = k === `menu`,
    j = n?.kind === `timed-lap`,
    ee = j
      ? vZ.find((e) => e.id === n?.career.event && e.kind === `speed-lap`)
      : void 0,
    te = n?.circuit ?? TJ,
    ne = (n?.modifiers.direction === `reverse` ? cZ : sZ)[te.id] ?? 0,
    re = !i && (!n?.ready || !!n?.loading?.active || !!n?.circuit.loading),
    M =
      !A &&
      !i &&
      n?.loading?.active &&
      n.loading.stage === `Restoring graphics`,
    oe = te.environment === `night`,
    se = re || !!n?.ship.loading || !!n?.online.lobbyId || !!n?.online.busy,
    ce = {
      disabled: re || !n?.ready || !!n?.ship.loading || !!n?.online.busy || !!i,
      label: re
        ? `PREPARING CIRCUIT`
        : n?.ship.loading
          ? `PREPARING SHIP`
          : i
            ? `RENDERER UNAVAILABLE`
            : n?.ready
              ? j
                ? `START TIMED LAP`
                : `ENTER RACE`
              : `INITIALIZING CIRCUIT`,
      detail: re
        ? `PLEASE WAIT · GETTING THE TRACK READY`
        : n?.ready
          ? n.circuit.loaded === !1
            ? `LOADS THE CIRCUIT, THEN LAUNCHES`
            : j
              ? `UNLIMITED LAPS`
              : n.controller
                ? `PRESS A / CROSS TO LAUNCH`
                : `PRESS ENTER TO LAUNCH`
          : `POWERING UP FLIGHT SYSTEMS`,
    },
    le =
      re ||
      !n?.ready ||
      !!n?.ship.loading ||
      !!n?.online.launching ||
      !!n?.online.busy,
    ue = k === `racing` || k === `countdown` || k === `paused`;
  (0, C.useEffect)(() => {
    if (!ue || !window.matchMedia(`(pointer: coarse)`).matches) return;
    let e = requestAnimationFrame(() => {
      let e = document.querySelector(`.pause-button`);
      if (!(e instanceof HTMLElement)) return;
      let t = e.getBoundingClientRect();
      console.info(
        `[ui] mobile pause`,
        JSON.stringify({
          width: Math.round(t.width),
          height: Math.round(t.height),
        }),
      );
    });
    return () => cancelAnimationFrame(e);
  }, [ue]);
  let de = k === `finished` && !!n?.flagBeat,
    fe = n?.online.standings.find((e) => e.id === n.online.selfId)?.dnf,
    pe = (e) => {
      ((k === `racing` || k === `countdown`) && t.current?.pause(), y(e), x(e));
    },
    me = () => {
      ((k === `racing` || k === `countdown`) && t.current?.pause(),
        t.current?.leaderboards.setOpen(!0, n?.kind || `race`));
    },
    he = () => {
      ((k === `racing` || k === `countdown`) && t.current?.pause(),
        t.current?.stats.flush(),
        p(!0));
    },
    ge = !!n?.online.lobbyId,
    _e = c
      ? `garage`
      : n?.online.open
        ? `online`
        : n?.leaderboards.open
          ? `records`
          : f
            ? `pilot`
            : S === `career`
              ? `career`
              : `play`,
    ve = (e) => {
      e !== _e &&
        (e !== `garage` && l(!1),
        e !== `pilot` && p(!1),
        e !== `records` &&
          n?.leaderboards.open &&
          t.current?.leaderboards.setOpen(!1),
        e !== `online` &&
          e !== `garage` &&
          n?.online.open &&
          !ge &&
          t.current?.online.setOpen(!1),
        w(e === `career` ? `career` : `hub`),
        e === `garage`
          ? l(!0)
          : e === `pilot`
            ? he()
            : e === `records`
              ? me()
              : e === `online` &&
                (t.current?.audio.unlock().catch(() => {}),
                t.current?.openOnline()));
    },
    ye = n?.poll,
    be = {
      tab: _e,
      goTab: ve,
      locked: Hi.filter((e) =>
        e === `play`
          ? ge
          : !n?.ready ||
            (e === `online`
              ? !!n.ship.loading || !!n.online.busy
              : e === `garage`
                ? !!n.ship.loading
                : ge),
      ),
      room: ge ? `${n.online.members.length}/8` : ``,
      muted: !!n?.muted,
      vote: !!ye?.poll,
      voteNew: !!ye?.poll && ye.available && ye.checked && !ye.mine,
      newsUnseen: g,
      settingsDisabled: re,
      onVote: () => t.current?.poll.setOpen(!0),
      onNews: _,
      onSettings: () => pe(`settings`),
      onSound: () => t.current?.toggleSound(),
      onFullscreen: () => t.current?.fullscreen(),
    };
  return (0, N.jsx)(X1, {
    aspect: n?.settings.aspect ?? D,
    canvasRef: e,
    menuScope: A ? `grid` : void 0,
    controller: n?.controller ?? !1,
    className:
      `racer-app ` +
      (A ? `is-menu` : `in-race`) +
      (k === `paused` ? ` is-paused` : ``) +
      (c && A ? ` is-garage` : ``) +
      (n?.lobbyStage ? ` is-lobby` : ``) +
      (j ? ` is-timed-lap` : ``) +
      (re ? ` is-preparing-circuit` : ``) +
      (oe ? ` is-night-circuit` : ``) +
      (te.scenery === `desert` ? ` is-desert-circuit` : ``) +
      (te.scenery === `lunar` ? ` is-lunar-circuit` : ``) +
      (te.scenery === `metropolis` ? ` is-metropolis-circuit` : ``) +
      (n?.boosting ? ` is-boosting` : ``) +
      (n?.turbo ? ` is-turbo` : ``) +
      (n?.combat.shield ? ` is-shielded` : ``),
    children: (0, N.jsxs)(Ui.Provider, {
      value: A ? be : null,
      children: [
        (0, N.jsx)(D0, { active: !!i, hasGame: () => !!t.current }),
        (0, N.jsx)(x2, {
          interrupt: !!n?.online.lobbyId,
          hold: re
            ? {
                progress: n?.loading?.progress ?? null,
                stage: n?.loading?.stage || `Starting flight systems`,
              }
            : null,
          onGesture: () => {
            t.current?.audio.unlock().catch(() => {});
          },
          onFinish: () => {
            n?.mode !== `racing` && t.current?.audio.unlock().catch(() => {});
          },
        }),
        (0, N.jsx)(`div`, {
          className: `scene-vignette`,
          "data-capture-hud": !0,
        }),
        !re && (0, N.jsx)(Ml, { hud: n }),
        i &&
          (0, N.jsx)(`div`, {
            className: `runtime-error-overlay`,
            "data-menu-scope": `runtime-error`,
            role: `alertdialog`,
            "aria-modal": `true`,
            "aria-labelledby": `runtime-error-title`,
            children: (0, N.jsxs)(`section`, {
              className: `runtime-error-card`,
              children: [
                (0, N.jsx)(`span`, {
                  className: `eyebrow`,
                  children: `FLIGHT SYSTEMS`,
                }),
                (0, N.jsx)(`h2`, {
                  id: `runtime-error-title`,
                  children: `RACE INTERRUPTED`,
                }),
                (0, N.jsx)(`p`, {
                  children: `Restart with lighter graphics to get back on the grid.`,
                }),
                (0, N.jsx)(`pre`, {
                  className: `runtime-error-message`,
                  children: i,
                }),
                (0, N.jsx)(`button`, {
                  className: `primary-button`,
                  "data-menu-initial": !0,
                  onClick: () => {
                    G2().markRestart(`compatibility`);
                    let e = new URL(location.href);
                    (e.searchParams.set(`webgl`, `1`),
                      e.searchParams.set(`safe`, `1`),
                      e.searchParams.delete(`webgpu`),
                      e.href === location.href
                        ? location.reload()
                        : location.assign(e.href));
                  },
                  children: `RESTART IN COMPATIBILITY MODE`,
                }),
                (0, N.jsxs)(`details`, {
                  children: [
                    (0, N.jsx)(`summary`, { children: `Technical details` }),
                    (0, N.jsx)(`pre`, { children: o || i }),
                  ],
                }),
              ],
            }),
          }),
        n &&
          !A &&
          k !== `finished` &&
          n.hull < 30 &&
          (0, N.jsx)(`div`, {
            "data-capture-hud": !0,
            className:
              `health-vignette` +
              (n.hull < 15 ? ` critical` : ``) +
              (k === `paused` ? ` paused` : ``),
            style: { opacity: Math.min(0.9, 0.18 + (30 - n.hull) / 40) },
            "aria-hidden": `true`,
          }),
        A && (0, N.jsx)(`div`, { className: `menu-shade` }),
        (0, N.jsx)(`div`, {
          className: `boost-tunnel`,
          "aria-hidden": `true`,
          "data-capture-hud": !0,
        }),
        n &&
          n.combat.blocked > 0.05 &&
          (0, N.jsx)(`div`, {
            className: `shield-flash`,
            "data-capture-hud": !0,
            "aria-hidden": `true`,
            style: {
              opacity: n.combat.blocked * 0.55,
              background: n.combat.blockedSide
                ? `radial-gradient(ellipse at ${n.combat.blockedSide > 0 ? `0%` : `100%`} 50%, #4d8dffaa, transparent 60%)`
                : `radial-gradient(ellipse at 50% 100%, #4d8dff88, transparent 60%)`,
            },
          }),
        n &&
          n.impact > 0.05 &&
          (0, N.jsx)(`div`, {
            className: `impact-flash`,
            "data-capture-hud": !0,
            style: {
              opacity: n.impact * 0.5,
              ...(n.impactSide
                ? {
                    boxShadow: `none`,
                    background: `radial-gradient(ellipse at ${n.impactSide > 0 ? `0%` : `100%`} 50%, #ff542ebb, transparent 65%)`,
                  }
                : {}),
            },
          }),
        (0, N.jsxs)(`header`, {
          className: `topbar`,
          "data-capture-hud": !0,
          children: [
            (0, N.jsxs)(`button`, {
              className: `brand`,
              "aria-label": `Vector home`,
              onClick: () => {
                ue && t.current?.pause();
              },
              children: [
                (0, N.jsxs)(`span`, {
                  className: `brand-mark`,
                  "aria-hidden": `true`,
                  children: [
                    (0, N.jsx)(`i`, {}),
                    (0, N.jsx)(`i`, {}),
                    (0, N.jsx)(`i`, {}),
                  ],
                }),
                (0, N.jsxs)(`span`, {
                  children: [
                    `VECTOR`,
                    (0, N.jsx)(`span`, {
                      className: `brand-sub`,
                      children: `ANTI-GRAVITY RACING`,
                    }),
                  ],
                }),
              ],
            }),
            (0, N.jsxs)(`div`, {
              className: `topbar-center`,
              children: [
                (0, N.jsx)(`span`, { className: `live-dot` }),
                ue
                  ? te.name.replace(` MK III`, ``).toUpperCase() +
                    (n?.modifiers.direction === `reverse` ? ` · REVERSE` : ``)
                  : n?.online.active
                    ? `ONLINE RACE · ` + n.online.members.length + ` PILOTS`
                    : `AG RACING LEAGUE`,
                (0, N.jsx)(`span`, {
                  className: `topbar-year`,
                  children: ue
                    ? n?.online.active
                      ? `ONLINE · ` + n.online.members.length + ` PILOTS`
                      : n?.career.tournament
                        ? `TOURNAMENT · ROUND ${n.career.tournament.round + 1} / ${n.career.tournament.rounds.length}`
                        : j
                          ? `TIMED LAP`
                          : n?.orbs
                            ? `ORBS`
                            : `SINGLE RACE`
                    : `2186`,
                }),
              ],
            }),
            (0, N.jsxs)(`div`, {
              className: `toolbar`,
              "data-capture-hidden": !0,
              children: [
                (0, N.jsx)(e0, {
                  hud: n,
                  getGame: () => t.current,
                  open: u,
                  onOpenChange: d,
                  showButtons: !!n?.settings.captureControls,
                }),
                (0, N.jsx)(`button`, {
                  className: `icon-button`,
                  title: `Pilot stats`,
                  "aria-label": `Pilot stats`,
                  disabled: !n?.ready,
                  onClick: he,
                  children: (0, N.jsx)(O, {}),
                }),
                (0, N.jsx)(`button`, {
                  className: `icon-button`,
                  title: `Track leaderboards`,
                  "aria-label": `Track leaderboards`,
                  disabled: !n?.ready,
                  onClick: me,
                  children: (0, N.jsx)(ot, {}),
                }),
                (0, N.jsx)(`button`, {
                  className: `icon-button`,
                  title: `Audio (M)`,
                  "aria-label": n?.muted ? `Enable audio` : `Mute audio`,
                  onClick: () => t.current?.toggleSound(),
                  children: n?.muted ? (0, N.jsx)(ut, {}) : (0, N.jsx)(lt, {}),
                }),
                (0, N.jsx)(`button`, {
                  className: `icon-button`,
                  title: `Settings`,
                  "aria-label": `Settings`,
                  disabled: re,
                  onClick: () => pe(`settings`),
                  children: (0, N.jsx)(Ke, {}),
                }),
                (0, N.jsx)(`button`, {
                  className: `icon-button fullscreen-button`,
                  title: `Fullscreen (F)`,
                  "aria-label": `Fullscreen`,
                  onClick: () => t.current?.fullscreen(),
                  children: (0, N.jsx)(Ae, {}),
                }),
                ue &&
                  (0, N.jsx)(`button`, {
                    className: `icon-button pause-button`,
                    title: `Pause (Esc)`,
                    "aria-label": `Pause race`,
                    onClick: () => t.current?.pause(),
                    children: (0, N.jsx)(Ie, {}),
                  }),
              ],
            }),
          ],
        }),
        A &&
          (0, N.jsxs)(N.Fragment, {
            children: [
              (0, N.jsxs)(`div`, {
                className: `menu-screen`,
                "aria-busy": re,
                children: [
                  S === `hub` &&
                    _e === `play` &&
                    (0, N.jsx)(O0, {
                      hud: n,
                      getGame: () => t.current,
                      starting: ce,
                      locked: se,
                      status: (0, N.jsxs)(N.Fragment, {
                        children: [
                          g &&
                            (0, N.jsxs)(`span`, {
                              className: `front-status-news`,
                              children: [`NEW · `, o2[0]?.title.toUpperCase()],
                            }),
                          (0, N.jsxs)(`span`, {
                            className: `menu-version`,
                            children: [`VECTOR `, `1.13`],
                          }),
                          (0, N.jsx)(`span`, {
                            children: re
                              ? `PREPARING CIRCUIT`
                              : n?.renderer || `INITIALIZING`,
                          }),
                        ],
                      }),
                      onSetup: () => w(`race`),
                      onStart: () => t.current?.start(),
                    }),
                  S === `race` &&
                    (0, N.jsx)(F0, {
                      hud: n,
                      getGame: () => t.current,
                      starting: ce,
                      locked: se,
                      onBack: () => w(`hub`),
                      onStart: () => t.current?.start(),
                      onHangar: () => l(!0),
                    }),
                  S === `career` &&
                    (0, N.jsx)(G0, {
                      progress: T,
                      award: n?.career.award,
                      locked: se || !n?.ready,
                      onBack: () => w(`hub`),
                      onStartEvent: (e) => t.current?.startCareerEvent(e.id),
                    }),
                ],
              }),
              re &&
                (0, N.jsx)(iQ, {
                  target: n?.loading?.target || te.name,
                  stage: n?.loading?.stage || `Starting flight systems`,
                  progress: n?.loading?.progress ?? null,
                  input: n?.controller
                    ? `controller`
                    : E
                      ? `touch`
                      : `keyboard`,
                  chips: rQ(n),
                  launch: n?.launch?.state ?? null,
                  onCancel: () => t.current?.cancelLaunch(),
                }),
            ],
          }),
        (ue || de) &&
          n &&
          (0, N.jsxs)(N.Fragment, {
            children: [
              ee &&
                (0, N.jsx)(M2, {
                  event: ee,
                  award: n.career.award,
                  held: T.medals[ee.id] ?? null,
                  fresh: n.career.fresh,
                  controller: n.controller,
                  touch: E,
                }),
              n.career.fresh &&
                n.career.award?.earned &&
                !ee &&
                (0, N.jsxs)(
                  `output`,
                  {
                    className: `medal-callout medal-${n.career.award.earned}`,
                    "data-capture-hud": !0,
                    children: [
                      (0, N.jsx)(`img`, {
                        src: I0(`medal`, n.career.award.earned),
                        alt: ``,
                      }),
                      (0, N.jsxs)(`span`, {
                        children: [
                          (0, N.jsxs)(`strong`, {
                            children: [
                              n.career.award.earned.toUpperCase(),
                              ` MEDAL`,
                            ],
                          }),
                          (0, N.jsxs)(`span`, {
                            children: [
                              kJ(n.career.award.result),
                              ` ·`,
                              ` `,
                              n.career.award.improved
                                ? `ADDED TO YOUR CAREER`
                                : `MEDAL ALREADY HELD`,
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  `${n.career.award.event}-${n.career.award.result}`,
                ),
              (0, N.jsxs)(`section`, {
                className: `race-top-hud`,
                "aria-label": `Race statistics`,
                "data-capture-hud": !0,
                children: [
                  (0, N.jsxs)(`div`, {
                    className: `position-stat`,
                    children: [
                      (0, N.jsx)(`span`, {
                        className: `hud-label`,
                        children: n.orbs
                          ? `ORBS`
                          : j
                            ? `LAPS COMPLETE`
                            : `POSITION`,
                      }),
                      (0, N.jsxs)(`div`, {
                        children: [
                          (0, N.jsx)(
                            `strong`,
                            {
                              className: n.orbs?.taken ? `orb-taken` : void 0,
                              children: (n.orbs
                                ? n.orbs.taken
                                : j
                                  ? n.completedLaps
                                  : n.position
                              )
                                .toString()
                                .padStart(2, `0`),
                            },
                            n.orbs?.taken,
                          ),
                          !j &&
                            (0, N.jsxs)(`span`, {
                              children: [
                                `/`,
                                ` `,
                                String(
                                  n.orbs ? n.orbs.total : n.totalRacers,
                                ).padStart(2, `0`),
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                  (0, N.jsxs)(`div`, {
                    className: `lap-stat`,
                    children: [
                      (0, N.jsx)(`span`, {
                        className: `hud-label`,
                        children: `LAP`,
                      }),
                      (0, N.jsxs)(`div`, {
                        children: [
                          (0, N.jsx)(`strong`, {
                            children: n.lap.toString().padStart(2, `0`),
                          }),
                          (0, N.jsxs)(`span`, {
                            children: [
                              `/ `,
                              j ? `∞` : String(n.totalLaps).padStart(2, `0`),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, N.jsxs)(`div`, {
                    className: `time-stat`,
                    children: [
                      (0, N.jsx)(`span`, {
                        className: `hud-label`,
                        children: j ? `LAP TIME` : `RACE TIME`,
                      }),
                      (0, N.jsx)(`strong`, {
                        children: kJ((j ? n.lapTime : n.elapsed) || 0.001),
                      }),
                      j &&
                        n.ghost.gap !== null &&
                        (0, N.jsxs)(`span`, {
                          className: `ghost-gap ${n.ghost.gap <= 0 ? `is-ahead` : `is-behind`}`,
                          children: [
                            `GHOST`,
                            ` `,
                            (0, N.jsxs)(`b`, {
                              children: [
                                n.ghost.gap <= 0 ? `−` : `+`,
                                Math.abs(n.ghost.gap).toFixed(3),
                              ],
                            }),
                          ],
                        }),
                      (0, N.jsxs)(`span`, {
                        className: `best-time`,
                        children: [
                          j ? `SESSION BEST` : `BEST LAP`,
                          ` `,
                          (0, N.jsx)(`b`, {
                            children: kJ(j ? n.sessionBest : n.bestLap),
                          }),
                        ],
                      }),
                      j &&
                        (0, N.jsxs)(N.Fragment, {
                          children: [
                            (0, N.jsxs)(`span`, {
                              className: `best-time`,
                              children: [
                                `LAST LAP `,
                                (0, N.jsx)(`b`, { children: kJ(n.lastLap) }),
                              ],
                            }),
                            (0, N.jsxs)(`span`, {
                              className: `best-time`,
                              children: [
                                `PERSONAL BEST `,
                                (0, N.jsx)(`b`, { children: kJ(n.bestLap) }),
                              ],
                            }),
                            !ee &&
                              ne > 0 &&
                              (0, N.jsxs)(`span`, {
                                className: `best-time`,
                                children: [
                                  `EXPERT PAR `,
                                  (0, N.jsx)(`b`, { children: kJ(ne) }),
                                ],
                              }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
              (0, N.jsx)(`div`, {
                className: `race-progress`,
                "data-capture-hud": !0,
                children: (0, N.jsx)(`span`, {
                  style: { width: n.progress * 100 + `%` },
                }),
              }),
              (0, N.jsx)(`div`, {
                className: `race-announcement`,
                "aria-live": `polite`,
                "data-capture-hud": !0,
                children:
                  k === `countdown`
                    ? (0, N.jsxs)(N.Fragment, {
                        children: [
                          (0, N.jsx)(`span`, { children: `GET READY` }),
                          (0, N.jsx)(
                            `strong`,
                            { children: Math.min(3, n.countdown) },
                            n.countdown,
                          ),
                          (0, N.jsx)(`small`, {
                            children: n.controller
                              ? `HOLD CROSS / A TO ACCELERATE`
                              : `HOLD W OR ↑ TO ACCELERATE`,
                          }),
                        ],
                      })
                    : n.message
                      ? (0, N.jsx)(`strong`, {
                          className: `message-text`,
                          children: n.message,
                        })
                      : null,
              }),
              (0, N.jsx)(A2, {
                item: n.combat.item,
                ammo: n.combat.ammo,
                absorb: n.combat.absorb,
                lockProgress: n.combat.lockProgress,
                controller: n.controller,
                timedLap: j,
                shield: n.combat.shield,
                shieldDuration: n.combat.shieldDuration,
              }),
              n.combat.target &&
                n.combat.item === `missile` &&
                (0, N.jsx)(`div`, {
                  "data-capture-hud": !0,
                  className:
                    `target-bracket` +
                    (n.combat.lockProgress >= 1 ? ` locked` : ``),
                  style: {
                    left: n.combat.target.x + `%`,
                    top: n.combat.target.y + `%`,
                  },
                  children: (0, N.jsx)(`span`, {
                    children:
                      n.combat.lockProgress >= 1 ? `LOCKED` : `ACQUIRING`,
                  }),
                }),
              n.combat.incoming &&
                k === `racing` &&
                (0, N.jsxs)(`output`, {
                  "data-capture-hud": !0,
                  className:
                    `missile-warning` +
                    (n.combat.shield > 0.75 ? ` shielded` : ``),
                  children: [
                    n.combat.incomingSide < 0 && (0, N.jsx)(ie, {}),
                    n.combat.shield > 0.75
                      ? `MISSILE INCOMING · SHIELD UP`
                      : `MISSILE INCOMING`,
                    n.combat.incomingSide > 0 && (0, N.jsx)(ae, {}),
                  ],
                }),
              (0, N.jsxs)(`section`, {
                className: `bottom-left-hud`,
                "data-capture-hud": !0,
                children: [
                  (0, N.jsx)(K2, { hud: n, large: !0 }),
                  (0, N.jsxs)(`div`, {
                    className:
                      `hull-meter` +
                      (n.hull < 15 ? ` critical` : n.hull < 30 ? ` low` : ``),
                    "aria-label": `Hull integrity ${Math.round(n.hull)}%`,
                    children: [
                      (0, N.jsx)(Je, { "aria-hidden": `true` }),
                      (0, N.jsx)(`div`, {
                        className: `hull-cells`,
                        children: Array.from({ length: 20 }, (e, t) =>
                          (0, N.jsx)(
                            `i`,
                            { className: n.hull > t * 5 ? `lit` : `` },
                            t,
                          ),
                        ),
                      }),
                      (0, N.jsxs)(`b`, {
                        children: [
                          Math.round(n.hull),
                          (0, N.jsx)(`small`, { children: `%` }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, N.jsxs)(`section`, {
                className: `speed-hud`,
                "data-capture-hud": !0,
                children: [
                  (0, N.jsxs)(`div`, {
                    className: `speed-readout`,
                    children: [
                      (0, N.jsx)(`strong`, {
                        children: n.speed.toString().padStart(3, `0`),
                      }),
                      (0, N.jsx)(`span`, { children: `KM/H` }),
                    ],
                  }),
                  (0, N.jsx)(`div`, {
                    className: `speed-ticks`,
                    children: Array.from({ length: 32 }, (e, t) =>
                      (0, N.jsx)(
                        `i`,
                        { className: (n.speed / 630) * 32 > t ? `lit` : `` },
                        t,
                      ),
                    ),
                  }),
                  (0, N.jsx)(`div`, {
                    className: `boost-label`,
                    children:
                      (n.turbo || n.boosting) &&
                      (0, N.jsxs)(`span`, {
                        children: [
                          (0, N.jsx)(ht, {}),
                          n.turbo ? `TURBO` : `BOOST`,
                        ],
                      }),
                  }),
                ],
              }),
              n.music.playing &&
                (0, N.jsxs)(
                  `div`,
                  {
                    className: `music-now-playing`,
                    "data-capture-hud": !0,
                    children: [
                      (0, N.jsx)(Ne, { "aria-hidden": `true` }),
                      (0, N.jsxs)(`span`, {
                        children: [
                          n.music.artist,
                          ` — `,
                          (0, N.jsx)(`strong`, { children: n.music.title }),
                        ],
                      }),
                    ],
                  },
                  n.music.id,
                ),
              (k === `countdown` || n.elapsed < 7) &&
                (0, N.jsxs)(`div`, {
                  "data-capture-hud": !0,
                  className:
                    `race-key-hints` +
                    (k !== `countdown` && n.elapsed > 6 ? ` fading` : ``),
                  children: [
                    (0, N.jsxs)(`span`, {
                      children: [
                        (0, N.jsx)(`kbd`, {
                          children: n.controller ? `L2` : `Q`,
                        }),
                        (0, N.jsx)(`kbd`, {
                          children: n.controller ? `R2` : `E`,
                        }),
                        ` AIRBRAKES`,
                      ],
                    }),
                    !n.controller &&
                      (0, N.jsxs)(`span`, {
                        children: [
                          (0, N.jsx)(`kbd`, { children: `⇧` }),
                          ` + `,
                          (0, N.jsx)(`kbd`, { children: `A` }),
                          (0, N.jsx)(`kbd`, { children: `D` }),
                          ` STEER + AIRBRAKE`,
                        ],
                      }),
                    (0, N.jsxs)(`span`, {
                      children: [
                        (0, N.jsx)(`kbd`, { children: `C` }),
                        ` CAMERA`,
                      ],
                    }),
                    (0, N.jsxs)(`span`, {
                      children: [
                        (0, N.jsx)(`kbd`, { children: `ESC` }),
                        ` `,
                        j ? `SESSION MENU` : `PAUSE`,
                      ],
                    }),
                  ],
                }),
              (k === `racing` || k === `countdown`) &&
                (0, N.jsxs)(`div`, {
                  className: `touch-controls`,
                  children: [
                    (0, N.jsx)(`div`, {
                      className: `touch-cluster touch-left`,
                      children: (0, N.jsx)(r2, { getGame: () => t.current }),
                    }),
                    (0, N.jsx)(a2, { getGame: () => t.current }),
                  ],
                }),
            ],
          }),
        M && n && (0, N.jsx)(n2, { hud: n, circuit: te }),
        k === `paused` &&
          !v &&
          !M &&
          n &&
          (0, N.jsx)(t2, {
            hud: n,
            circuit: te,
            onResume: () => t.current?.pause(),
            onRestart: () => t.current?.start(),
            onEndSession: () => t.current?.endSession(),
            onSettings: () => pe(`settings`),
            onStats: he,
            onCapture: () => d(!0),
            onQuit: () => {
              (w(`hub`), t.current?.menu());
            },
          }),
        k === `finished` &&
          n &&
          !de &&
          !n.online.open &&
          (0, N.jsx)(Q0, {
            hud: n,
            circuit: te,
            dnf: !!fe,
            career: T,
            onRetry: () => t.current?.start(),
            onNext: (e) => {
              (w(`career`), t.current?.menu(), t.current?.startCareerEvent(e));
            },
            onNextRound: () => {
              (w(`career`),
                t.current?.menu(),
                t.current?.nextTournamentRound());
            },
            onLeaderboards: me,
            onRetrySubmit: () => t.current?.leaderboards.retry(),
            onCareer: () => {
              (w(`career`), t.current?.menu());
            },
            onSetup: () => {
              (w(`race`), t.current?.menu());
            },
            onMenu: () => {
              (w(`hub`), t.current?.menu());
            },
          }),
        c &&
          A &&
          (0, N.jsx)(dQ, {
            open: !0,
            onClose: () => l(!1),
            hud: n,
            getGame: () => t.current,
            busy: le,
          }),
        (0, N.jsx)(a1, {
          getGame: () => t.current,
          hud: n,
          onGarage: () => l(!0),
        }),
        (0, N.jsx)(o1, {
          getGame: () => t.current,
          hud: n,
          onAccept: () => w(`hub`),
        }),
        (0, N.jsx)(u1, { getGame: () => t.current, hud: n }),
        (0, N.jsx)(f1, { getGame: () => t.current, hud: n }),
        n?.achievementToast &&
          !f &&
          !m &&
          !v &&
          !u &&
          (0, N.jsxs)(
            `output`,
            {
              className: `achievement-toast tier-${n.achievementToast.tier}`,
              "aria-live": `polite`,
              "data-capture-hud": !0,
              children: [
                (0, N.jsx)(R1, {
                  id: n.achievementToast.id,
                  icon:
                    M1.find((e) => e.id === n.achievementToast.id)?.icon ??
                    `Trophy`,
                  tier: n.achievementToast.tier,
                  size: 52,
                }),
                (0, N.jsxs)(`span`, {
                  children: [
                    `ACHIEVEMENT UNLOCKED`,
                    (0, N.jsx)(`strong`, {
                      children: n.achievementToast.title,
                    }),
                  ],
                }),
              ],
            },
            `${n.achievementToast.id}-${n.achievementToast.at}`,
          ),
        (0, N.jsx)(G1, { hud: n, open: f, onOpenChange: p }),
        (0, N.jsx)(g2, { open: m, onOpenChange: h }),
        (0, N.jsx)(ol, {
          open: !!v,
          onOpenChange: (e) => {
            e || y(null);
          },
          children: (0, N.jsx)(
            nZ,
            { kind: b, hud: n, getGame: () => t.current },
            b,
          ),
        }),
      ],
    }),
  });
}
