// assets__index-DphGw8Ou 45 — children
// Lines 83573-84711 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function E2() {
  let e = (0, C.useRef)(null),
    t = (0, C.useRef)(null),
    [n, r] = (0, C.useState)(null),
    [i, a] = (0, C.useState)(``),
    [o, s] = (0, C.useState)(``),
    [c, l] = (0, C.useState)(!1),
    [u, d] = (0, C.useState)(!1),
    [f, p] = (0, C.useState)(!1),
    [m, h] = (0, C.useState)(!1),
    g = s0((0, C.useSyncExternalStore)(a0, i0, () => e0[0]?.id ?? null)),
    _ = () => {
      (h(!0), o0());
    },
    [v, y] = (0, C.useState)(null),
    [b, x] = (0, C.useState)(`hub`),
    S = (0, C.useSyncExternalStore)(v2, T2, () => C2),
    w = (0, C.useSyncExternalStore)(b2, x2, () => !1),
    T = (0, C.useSyncExternalStore)(v2, S2, () => null);
  (0, C.useEffect)(() => {
    let n = !1,
      i = g2();
    return (
      C$(
        async () => {
          let { RacerGame: e } = await import(`./game-CsnOSIff.js`);
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
  let E = n?.mode ?? `menu`,
    D = E === `menu`,
    k = n?.kind === `timed-lap`,
    A = k
      ? QZ.find((e) => e.id === n?.career.event && e.kind === `speed-lap`)
      : void 0,
    ee = n?.circuit ?? yJ,
    te = (n?.modifiers.direction === `reverse` ? HZ : VZ)[ee.id] ?? 0,
    ne = !i && (!n?.ready || !!n?.loading?.active || !!n?.circuit.loading),
    re =
      !D &&
      !i &&
      n?.loading?.active &&
      n.loading.stage === `Restoring graphics`,
    ie = ee.environment === `night`,
    j = ne || !!n?.ship.loading || !!n?.online.lobbyId || !!n?.online.busy,
    ae = !!n?.ship.loading || !!n?.online.lobbyId || !!n?.online.busy,
    ce = {
      disabled: ne || !n?.ready || !!n?.ship.loading || !!n?.online.busy || !!i,
      label: ne
        ? `PREPARING CIRCUIT`
        : n?.ship.loading
          ? `PREPARING SHIP`
          : i
            ? `RENDERER UNAVAILABLE`
            : n?.ready
              ? k
                ? `START TIMED LAP`
                : `ENTER RACE`
              : `INITIALIZING CIRCUIT`,
      detail: ne
        ? `PLEASE WAIT · GETTING THE TRACK READY`
        : n?.ready
          ? n.circuit.loaded === !1
            ? `LOADS THE CIRCUIT, THEN LAUNCHES`
            : k
              ? `UNLIMITED LAPS`
              : n.controller
                ? `PRESS A / CROSS TO LAUNCH`
                : `PRESS ENTER TO LAUNCH`
          : `POWERING UP FLIGHT SYSTEMS`,
    },
    le = Qu(n?.ship.selected),
    ue =
      ne ||
      !n?.ready ||
      !!n?.ship.loading ||
      !!n?.online.launching ||
      !!n?.online.busy,
    de = E === `racing` || E === `countdown` || E === `paused`;
  (0, C.useEffect)(() => {
    if (!de || !window.matchMedia(`(pointer: coarse)`).matches) return;
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
  }, [de]);
  let fe = E === `finished` && !!n?.flagBeat,
    M = n?.online.standings.find((e) => e.id === n.online.selfId)?.dnf,
    pe = (e) => {
      ((E === `racing` || E === `countdown`) && t.current?.pause(), y(e));
    },
    me = () => {
      ((E === `racing` || E === `countdown`) && t.current?.pause(),
        t.current?.leaderboards.setOpen(!0, n?.kind || `race`));
    },
    ge = () => {
      ((E === `racing` || E === `countdown`) && t.current?.pause(),
        t.current?.stats.flush(),
        p(!0));
    };
  return (0, N.jsxs)(T1, {
    aspect: n?.settings.aspect ?? T,
    canvasRef: e,
    menuScope: D ? `grid` : void 0,
    controller: n?.controller ?? !1,
    className:
      `racer-app ` +
      (D ? `is-menu` : `in-race`) +
      (D && b === `hub` ? ` has-news-ticker` : ``) +
      (c && D ? ` is-garage` : ``) +
      (n?.lobbyStage ? ` is-lobby` : ``) +
      (k ? ` is-timed-lap` : ``) +
      (ne ? ` is-preparing-circuit` : ``) +
      (ie ? ` is-night-circuit` : ``) +
      (ee.scenery === `desert` ? ` is-desert-circuit` : ``) +
      (ee.scenery === `lunar` ? ` is-lunar-circuit` : ``) +
      (ee.scenery === `metropolis` ? ` is-metropolis-circuit` : ``) +
      (n?.boosting ? ` is-boosting` : ``) +
      (n?.turbo ? ` is-turbo` : ``) +
      (n?.combat.shield ? ` is-shielded` : ``),
    children: [
      (0, N.jsx)($1, { active: !!i, hasGame: () => !!t.current }),
      (0, N.jsx)(U0, {
        interrupt: !!n?.online.lobbyId,
        hold: ne
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
      !ne && (0, N.jsx)(Ol, { hud: n }),
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
                  g2().markRestart(`compatibility`);
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
        !D &&
        E !== `finished` &&
        n.hull < 30 &&
        (0, N.jsx)(`div`, {
          "data-capture-hud": !0,
          className:
            `health-vignette` +
            (n.hull < 15 ? ` critical` : ``) +
            (E === `paused` ? ` paused` : ``),
          style: { opacity: Math.min(0.9, 0.18 + (30 - n.hull) / 40) },
          "aria-hidden": `true`,
        }),
      D && (0, N.jsx)(`div`, { className: `menu-shade` }),
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
              de && t.current?.pause();
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
              de
                ? ee.name.replace(` MK III`, ``).toUpperCase() +
                  (n?.modifiers.direction === `reverse` ? ` · REVERSE` : ``)
                : n?.online.active
                  ? `ONLINE RACE · ` + n.online.members.length + ` PILOTS`
                  : `AG RACING LEAGUE`,
              (0, N.jsx)(`span`, {
                className: `topbar-year`,
                children: de
                  ? n?.online.active
                    ? `ONLINE · ` + n.online.members.length + ` PILOTS`
                    : n?.career.tournament
                      ? `TOURNAMENT · ROUND ${n.career.tournament.round + 1} / ${n.career.tournament.rounds.length}`
                      : k
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
              (0, N.jsx)(k1, {
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
                onClick: ge,
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
                disabled: ne,
                onClick: () => pe(`settings`),
                children: (0, N.jsx)(qe, {}),
              }),
              (0, N.jsx)(`button`, {
                className: `icon-button fullscreen-button`,
                title: `Fullscreen (F)`,
                "aria-label": `Fullscreen`,
                onClick: () => t.current?.fullscreen(),
                children: (0, N.jsx)(je, {}),
              }),
              de &&
                (0, N.jsx)(`button`, {
                  className: `icon-button pause-button`,
                  title: `Pause (Esc)`,
                  "aria-label": `Pause race`,
                  onClick: () => t.current?.pause(),
                  children: (0, N.jsx)(Le, {}),
                }),
            ],
          }),
        ],
      }),
      D &&
        (0, N.jsxs)(N.Fragment, {
          children: [
            (0, N.jsxs)(`div`, {
              className: `menu-screen`,
              "aria-busy": ne,
              children: [
                b === `hub` &&
                  (0, N.jsx)(d0, {
                    hud: n,
                    career: S,
                    busy: ae,
                    starting: ce,
                    onPage: x,
                    onStart: () => t.current?.start(),
                    onKind: (e) => t.current?.selectKind(e),
                    onOnline: () => {
                      (t.current?.audio.unlock().catch(() => {}),
                        t.current?.openOnline());
                    },
                    onHangar: () => l(!0),
                    onRecords: me,
                    onStats: ge,
                    onControls: () => pe(`controls`),
                    onSettings: () => pe(`settings`),
                    onNews: _,
                    newsUnseen: g,
                  }),
                b === `race` &&
                  (0, N.jsx)(y0, {
                    hud: n,
                    getGame: () => t.current,
                    starting: ce,
                    locked: j,
                    onBack: () => x(`hub`),
                    onStart: () => t.current?.start(),
                    onHangar: () => l(!0),
                  }),
                b === `career` &&
                  (0, N.jsx)(E0, {
                    progress: S,
                    award: n?.career.award,
                    locked: j || !n?.ready,
                    onBack: () => x(`hub`),
                    onStartEvent: (e) => t.current?.startCareerEvent(e.id),
                  }),
              ],
            }),
            ne &&
              (0, N.jsx)(aZ, {
                target: n?.loading?.target || ee.name,
                stage: n?.loading?.stage || `Starting flight systems`,
                progress: n?.loading?.progress ?? null,
                input: n?.controller ? `controller` : w ? `touch` : `keyboard`,
              }),
            b === `hub` &&
              (0, N.jsxs)(`aside`, {
                className: `ship-callout`,
                children: [
                  (0, N.jsx)(`span`, { className: `callout-line` }),
                  (0, N.jsxs)(`div`, {
                    children: [
                      (0, N.jsxs)(`span`, {
                        className: `track-number`,
                        children: [`YOUR SHIP / `, le.number],
                      }),
                      (0, N.jsxs)(`h3`, {
                        children: [
                          le.code,
                          ` `,
                          (0, N.jsx)(`span`, {
                            children: le.name.toUpperCase(),
                          }),
                        ],
                      }),
                      (0, N.jsx)(`div`, {
                        className: `ship-rating`,
                        children: le.shape.toUpperCase(),
                      }),
                      (0, N.jsx)(`span`, {
                        className: `ship-cycle-hint`,
                        children: `SELECT SHIP / FIVE CRAFT`,
                      }),
                    ],
                  }),
                ],
              }),
            (0, N.jsxs)(`footer`, {
              className: `menu-footer`,
              children: [
                (0, N.jsx)(Hi, { back: b !== `hub` }),
                (0, N.jsxs)(`span`, {
                  children: [
                    (0, N.jsxs)(`span`, {
                      className: `menu-version`,
                      children: [`VECTOR `, `1.7`],
                    }),
                    (0, N.jsx)(`span`, {
                      className: `footer-slash`,
                      children: `/`,
                    }),
                    (0, N.jsx)(`i`, { className: `status-dot` }),
                    ne ? `PREPARING CIRCUIT` : `SYSTEMS ONLINE`,
                    (0, N.jsx)(`span`, {
                      className: `footer-slash`,
                      children: `/`,
                    }),
                    n?.renderer || `INITIALIZING`,
                  ],
                }),
              ],
            }),
            b === `hub` && (0, N.jsx)(q0, { onNews: _ }),
          ],
        }),
      (de || fe) &&
        n &&
        (0, N.jsxs)(N.Fragment, {
          children: [
            A &&
              (0, N.jsx)(r2, {
                event: A,
                award: n.career.award,
                held: S.medals[A.id] ?? null,
                fresh: n.career.fresh,
                controller: n.controller,
                touch: w,
              }),
            n.career.fresh &&
              n.career.award?.earned &&
              !A &&
              (0, N.jsxs)(
                `output`,
                {
                  className: `medal-callout medal-${n.career.award.earned}`,
                  "data-capture-hud": !0,
                  children: [
                    (0, N.jsx)(`img`, {
                      src: l0(`medal`, n.career.award.earned),
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
                            CJ(n.career.award.result),
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
                        : k
                          ? `LAPS COMPLETE`
                          : `POSITION`,
                    }),
                    (0, N.jsxs)(`div`, {
                      children: [
                        (0, N.jsx)(`strong`, {
                          children: (n.orbs
                            ? n.orbs.taken
                            : k
                              ? n.completedLaps
                              : n.position
                          )
                            .toString()
                            .padStart(2, `0`),
                        }),
                        !k &&
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
                            k ? `∞` : String(n.totalLaps).padStart(2, `0`),
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
                      children: k ? `LAP TIME` : `RACE TIME`,
                    }),
                    (0, N.jsx)(`strong`, {
                      children: CJ((k ? n.lapTime : n.elapsed) || 0.001),
                    }),
                    k &&
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
                        k ? `SESSION BEST` : `BEST LAP`,
                        ` `,
                        (0, N.jsx)(`b`, {
                          children: CJ(k ? n.sessionBest : n.bestLap),
                        }),
                      ],
                    }),
                    k &&
                      (0, N.jsxs)(N.Fragment, {
                        children: [
                          (0, N.jsxs)(`span`, {
                            className: `best-time`,
                            children: [
                              `LAST LAP `,
                              (0, N.jsx)(`b`, { children: CJ(n.lastLap) }),
                            ],
                          }),
                          (0, N.jsxs)(`span`, {
                            className: `best-time`,
                            children: [
                              `PERSONAL BEST `,
                              (0, N.jsx)(`b`, { children: CJ(n.bestLap) }),
                            ],
                          }),
                          !A &&
                            te > 0 &&
                            (0, N.jsxs)(`span`, {
                              className: `best-time`,
                              children: [
                                `EXPERT PAR `,
                                (0, N.jsx)(`b`, { children: CJ(te) }),
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
                E === `countdown`
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
            (0, N.jsx)(t2, {
              item: n.combat.item,
              ammo: n.combat.ammo,
              absorb: n.combat.absorb,
              lockProgress: n.combat.lockProgress,
              controller: n.controller,
              timedLap: k,
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
                  children: n.combat.lockProgress >= 1 ? `LOCKED` : `ACQUIRING`,
                }),
              }),
            n.combat.incoming &&
              E === `racing` &&
              (0, N.jsxs)(`output`, {
                "data-capture-hud": !0,
                className:
                  `missile-warning` +
                  (n.combat.shield > 0.75 ? ` shielded` : ``),
                children: [
                  n.combat.incomingSide < 0 && (0, N.jsx)(oe, {}),
                  n.combat.shield > 0.75
                    ? `MISSILE INCOMING · SHIELD UP`
                    : `MISSILE INCOMING`,
                  n.combat.incomingSide > 0 && (0, N.jsx)(se, {}),
                ],
              }),
            (0, N.jsxs)(`section`, {
              className: `bottom-left-hud`,
              "data-capture-hud": !0,
              children: [
                (0, N.jsx)(_2, { hud: n, large: !0 }),
                (0, N.jsxs)(`div`, {
                  className:
                    `hull-meter` +
                    (n.hull < 15 ? ` critical` : n.hull < 30 ? ` low` : ``),
                  "aria-label": `Hull integrity ${Math.round(n.hull)}%`,
                  children: [
                    (0, N.jsx)(Ye, { "aria-hidden": `true` }),
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
                    (0, N.jsx)(Pe, { "aria-hidden": `true` }),
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
            (E === `countdown` || n.elapsed < 7) &&
              (0, N.jsxs)(`div`, {
                "data-capture-hud": !0,
                className:
                  `race-key-hints` +
                  (E !== `countdown` && n.elapsed > 6 ? ` fading` : ``),
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
                    children: [(0, N.jsx)(`kbd`, { children: `C` }), ` CAMERA`],
                  }),
                  (0, N.jsxs)(`span`, {
                    children: [
                      (0, N.jsx)(`kbd`, { children: `ESC` }),
                      ` `,
                      k ? `SESSION MENU` : `PAUSE`,
                    ],
                  }),
                ],
              }),
            (E === `racing` || E === `countdown`) &&
              (0, N.jsxs)(`div`, {
                className: `touch-controls`,
                children: [
                  (0, N.jsx)(`div`, {
                    className: `touch-cluster touch-left`,
                    children: (0, N.jsx)(N0, { getGame: () => t.current }),
                  }),
                  (0, N.jsx)(F0, { getGame: () => t.current }),
                ],
              }),
          ],
        }),
      re &&
        (0, N.jsx)(`div`, {
          className: `pause-overlay`,
          children: (0, N.jsxs)(`output`, {
            className: `pause-card`,
            "aria-labelledby": `restore-title`,
            children: [
              (0, N.jsx)(`span`, {
                className: `menu-surface-line`,
                "aria-hidden": `true`,
              }),
              (0, N.jsx)(`span`, {
                className: `eyebrow`,
                children: `FLIGHT SYSTEMS`,
              }),
              (0, N.jsx)(`h2`, {
                id: `restore-title`,
                children: `RESTORING GRAPHICS`,
              }),
              (0, N.jsx)(`p`, {
                children: n?.online.active
                  ? `The browser reset the graphics. The online race carries on while they come back.`
                  : `The browser reset the graphics. Your race is held right where you left it.`,
              }),
              (0, N.jsx)(`div`, {
                className: `restore-progress`,
                "aria-hidden": `true`,
                children: (0, N.jsx)(`span`, {
                  style: {
                    width: `${Math.round((n?.loading?.progress ?? 0) * 100)}%`,
                  },
                }),
              }),
            ],
          }),
        }),
      E === `paused` &&
        !v &&
        !re &&
        (0, N.jsx)(`div`, {
          className: `pause-overlay`,
          children: (0, N.jsxs)(`section`, {
            className: `pause-card`,
            "data-menu-scope": `pause`,
            "aria-labelledby": `pause-title`,
            children: [
              (0, N.jsx)(`span`, {
                className: `menu-surface-line`,
                "aria-hidden": `true`,
              }),
              (0, N.jsx)(`span`, {
                className: `eyebrow`,
                children: `FLIGHT SYSTEMS ON HOLD`,
              }),
              (0, N.jsx)(`h2`, {
                id: `pause-title`,
                children: n?.online.active
                  ? `FLIGHT MENU`
                  : k
                    ? `SESSION PAUSED`
                    : `RACE PAUSED`,
              }),
              (0, N.jsx)(`p`, {
                children: n?.online.active
                  ? `The online race continues while this menu is open.`
                  : k
                    ? `Resume to keep chasing your best lap, or end this session.`
                    : `Take a breath. The circuit can wait.`,
              }),
              (0, N.jsxs)(`button`, {
                className: `primary-button`,
                "data-menu-initial": !0,
                "data-menu-back": !0,
                onClick: () => t.current?.pause(),
                children: [
                  k ? `RESUME SESSION` : `RESUME RACE`,
                  (0, N.jsx)(Re, {}),
                ],
              }),
              (0, N.jsxs)(`button`, {
                className: `secondary-button`,
                onClick: () => t.current?.start(),
                children: [
                  n?.online.active
                    ? `RACE ROOM`
                    : k
                      ? `RESTART SESSION`
                      : `RESTART RACE`,
                  (0, N.jsx)(We, {}),
                ],
              }),
              k &&
                (0, N.jsxs)(N.Fragment, {
                  children: [
                    (0, N.jsxs)(`div`, {
                      className: `session-pause-best`,
                      children: [
                        (0, N.jsx)(`span`, { children: `SESSION BEST` }),
                        (0, N.jsx)(`strong`, {
                          children: CJ(n?.sessionBest || 0),
                        }),
                      ],
                    }),
                    (0, N.jsxs)(`button`, {
                      className: `secondary-button`,
                      onClick: () => t.current?.endSession(),
                      children: [`END SESSION`, (0, N.jsx)(he, {})],
                    }),
                  ],
                }),
              (0, N.jsxs)(`div`, {
                className: `pause-links`,
                children: [
                  (0, N.jsx)(`button`, { onClick: ge, children: `STATS` }),
                  (0, N.jsx)(`button`, {
                    onClick: () => pe(`controls`),
                    children: `CONTROLS`,
                  }),
                  (0, N.jsx)(`button`, {
                    onClick: () => pe(`settings`),
                    children: `SETTINGS`,
                  }),
                  (0, N.jsx)(`button`, {
                    onClick: () => d(!0),
                    children: `CAPTURE`,
                  }),
                  !k &&
                    (0, N.jsx)(`button`, {
                      onClick: () => {
                        (x(`hub`), t.current?.menu());
                      },
                      children: `QUIT TO MENU`,
                    }),
                ],
              }),
              (0, N.jsx)(Hi, {}),
            ],
          }),
        }),
      E === `finished` &&
        n &&
        !fe &&
        !n.online.open &&
        (0, N.jsx)(M0, {
          hud: n,
          circuit: ee,
          dnf: !!M,
          career: S,
          onRetry: () => t.current?.start(),
          onNext: (e) => {
            (x(`career`), t.current?.menu(), t.current?.startCareerEvent(e));
          },
          onNextRound: () => {
            (x(`career`), t.current?.menu(), t.current?.nextTournamentRound());
          },
          onLeaderboards: me,
          onRetrySubmit: () => t.current?.leaderboards.retry(),
          onCareer: () => {
            (x(`career`), t.current?.menu());
          },
          onSetup: () => {
            (x(`race`), t.current?.menu());
          },
          onMenu: () => {
            (x(`hub`), t.current?.menu());
          },
        }),
      c &&
        D &&
        (0, N.jsx)(uZ, {
          open: !0,
          onClose: () => l(!1),
          hud: n,
          getGame: () => t.current,
          busy: ue,
        }),
      (0, N.jsx)(z$, {
        getGame: () => t.current,
        hud: n,
        onGarage: () => l(!0),
      }),
      (0, N.jsx)(B$, {
        getGame: () => t.current,
        hud: n,
        onAccept: () => x(`hub`),
      }),
      (0, N.jsx)(H$, { getGame: () => t.current, hud: n }),
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
              (0, N.jsx)(m1, {
                id: n.achievementToast.id,
                icon:
                  c1.find((e) => e.id === n.achievementToast.id)?.icon ??
                  `Trophy`,
                tier: n.achievementToast.tier,
                size: 52,
              }),
              (0, N.jsxs)(`span`, {
                children: [
                  `ACHIEVEMENT UNLOCKED`,
                  (0, N.jsx)(`strong`, { children: n.achievementToast.title }),
                ],
              }),
            ],
          },
          `${n.achievementToast.id}-${n.achievementToast.at}`,
        ),
      (0, N.jsx)(x1, { hud: n, open: f, onOpenChange: p }),
      (0, N.jsx)(R0, { open: m, onOpenChange: h }),
      (0, N.jsx)(nl, {
        open: !!v,
        onOpenChange: (e) => {
          e || y(null);
        },
        children: (0, N.jsx)(JX, {
          kind: v ?? `settings`,
          hud: n,
          getGame: () => t.current,
        }),
      }),
    ],
  });
}
