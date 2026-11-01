// assets__index-DF2rMRzV 42 — children
// Lines 82577-82875 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
var $0 = (e) => String(e).padStart(2, `0`);
function e2(e, t) {
  let n = e.online.active
    ? `ONLINE RACE`
    : e.career.tournament
      ? `TOURNAMENT · ROUND ${e.career.tournament.round + 1} / ${e.career.tournament.rounds.length}`
      : e.kind === `timed-lap`
        ? `TIMED LAP`
        : e.orbs
          ? `ORBS`
          : `SINGLE RACE`;
  return [
    t.name.replace(` MK III`, ``),
    n,
    e.modifiers.direction === `reverse` && `REVERSE`,
  ]
    .filter(Boolean)
    .join(` · `)
    .toUpperCase();
}
function t2({
  hud: e,
  circuit: t,
  onResume: n,
  onRestart: r,
  onEndSession: i,
  onSettings: a,
  onStats: o,
  onCapture: s,
  onQuit: c,
}) {
  let l = e.kind === `timed-lap`,
    u = e.online.active,
    d = l
      ? [
          [`LAPS`, $0(e.completedLaps)],
          [`SESSION BEST`, kJ(e.sessionBest)],
          [`PERSONAL BEST`, kJ(e.bestLap)],
        ]
      : [
          e.orbs
            ? [`ORBS`, $0(e.orbs.taken), `/ ${$0(e.orbs.total)}`]
            : [`POSITION`, `P${e.position}`, `/ ${e.totalRacers}`],
          [`LAP`, String(e.lap), `/ ${e.totalLaps}`],
          [`RACE TIME`, kJ(e.elapsed || 0.001)],
        ];
  return (0, N.jsx)(`div`, {
    className: `front-pause`,
    children: (0, N.jsxs)(`section`, {
      className: `front-pause-menu`,
      "data-menu-scope": `pause`,
      "aria-labelledby": `pause-title`,
      children: [
        (0, N.jsx)(`span`, {
          className: `front-kicker is-hot`,
          children: e2(e, t),
        }),
        (0, N.jsx)(`h2`, {
          id: `pause-title`,
          className: `front-pause-title`,
          children: u ? `FLIGHT MENU` : l ? `SESSION PAUSED` : `RACE PAUSED`,
        }),
        u &&
          (0, N.jsx)(`p`, {
            className: `front-pause-note`,
            children: `The online race carries on while this menu is open.`,
          }),
        (0, N.jsx)(`dl`, {
          className: `front-pause-stats`,
          children: d.map(([e, t, n]) =>
            (0, N.jsxs)(
              `div`,
              {
                children: [
                  (0, N.jsx)(`dt`, { children: e }),
                  (0, N.jsxs)(`dd`, {
                    children: [t, n && (0, N.jsx)(`small`, { children: n })],
                  }),
                ],
              },
              e,
            ),
          ),
        }),
        (0, N.jsxs)(`button`, {
          className: `front-primary front-pause-resume`,
          "data-menu-initial": !0,
          "data-menu-back": !0,
          "data-pad": `start`,
          onClick: n,
          children: [
            (0, N.jsx)(Le, {}),
            (0, N.jsx)(`span`, { children: l ? `RESUME SESSION` : `RESUME` }),
            (0, N.jsx)(Wi, { pad: `☰`, keys: `ESC` }),
          ],
        }),
        (0, N.jsxs)(`div`, {
          className: `front-pause-items`,
          children: [
            (0, N.jsxs)(`button`, {
              className: `front-row`,
              onClick: r,
              children: [
                (0, N.jsx)(Ue, {}),
                (0, N.jsx)(`span`, {
                  children: u
                    ? `RACE ROOM`
                    : l
                      ? `RESTART SESSION`
                      : `RESTART RACE`,
                }),
              ],
            }),
            l &&
              (0, N.jsxs)(`button`, {
                className: `front-row`,
                onClick: i,
                children: [
                  (0, N.jsx)(me, {}),
                  (0, N.jsx)(`span`, { children: `END SESSION` }),
                ],
              }),
            (0, N.jsxs)(`button`, {
              className: `front-row`,
              onClick: a,
              children: [
                (0, N.jsx)(Xe, {}),
                (0, N.jsx)(`span`, { children: `SETTINGS & CONTROLS` }),
              ],
            }),
            (0, N.jsxs)(`button`, {
              className: `front-row`,
              onClick: o,
              children: [
                (0, N.jsx)(O, {}),
                (0, N.jsx)(`span`, { children: `PILOT STATS` }),
              ],
            }),
            (0, N.jsxs)(`button`, {
              className: `front-row`,
              onClick: s,
              children: [
                (0, N.jsx)(ne, {}),
                (0, N.jsx)(`span`, { children: `CAPTURE` }),
              ],
            }),
            !l &&
              (0, N.jsxs)(`button`, {
                className: `front-row is-exit`,
                onClick: c,
                children: [
                  (0, N.jsx)(Oe, {}),
                  (0, N.jsx)(`span`, { children: `QUIT TO MENU` }),
                ],
              }),
          ],
        }),
        (0, N.jsx)(Ki, {
          hints: [
            [[`✚`], [`↑ ↓`], `MOVE`],
            [[`A`], [`ENTER`], `SELECT`],
            [[`B`, `☰`], [`ESC`], `RESUME`],
          ],
          children: (0, N.jsxs)(`span`, { children: [`VECTOR `, q0] }),
        }),
      ],
    }),
  });
}
function n2({ hud: e, circuit: t }) {
  return (0, N.jsx)(`div`, {
    className: `front-pause`,
    children: (0, N.jsxs)(`output`, {
      className: `front-pause-menu`,
      "aria-labelledby": `restore-title`,
      children: [
        (0, N.jsx)(`span`, {
          className: `front-kicker is-hot`,
          children: e2(e, t),
        }),
        (0, N.jsx)(`h2`, {
          id: `restore-title`,
          className: `front-pause-title`,
          children: `RESTORING GRAPHICS`,
        }),
        (0, N.jsx)(`p`, {
          className: `front-pause-note`,
          children: e.online.active
            ? `The browser reset the graphics. The online race carries on while they come back.`
            : `The browser reset the graphics. Your race is held right where you left it.`,
        }),
        (0, N.jsx)(`div`, {
          className: `front-progress`,
          "aria-hidden": `true`,
          children: (0, N.jsx)(`span`, {
            style: { width: `${Math.round((e.loading.progress ?? 0) * 100)}%` },
          }),
        }),
      ],
    }),
  });
}
function r2({ getGame: e }) {
  let t = (0, C.useRef)(null),
    n = (0, C.useRef)(null),
    r = (0, C.useRef)(!1),
    i = (0, C.useRef)(!1),
    a = (0, C.useRef)(0),
    o = (n, o = !1) => {
      let s = t.current,
        c = e();
      if (!s || !c) return;
      let l = s.getBoundingClientRect(),
        u = (n.clientX - l.left) / l.width,
        d = (n.clientY - l.top) / l.height,
        f = u - 0.5;
      Math.abs(f) > l0.dead
        ? (a.current = f < 0 ? -1 : 1)
        : (a.current ||= f < 0 ? -1 : +(f > 0));
      let p = u0(u, d, a.current),
        m = Math.max(p.airLeft, p.airRight);
      (o ? (i.current = m >= 0.35) : m < 0.15 && (i.current = !1),
        (c.touchPad = {
          ...p,
          tapLeft: i.current ? p.airLeft : 0,
          tapRight: i.current ? p.airRight : 0,
        }),
        s.style.setProperty(`--pad-x`, String(Math.min(1, Math.max(0, u)))),
        s.style.setProperty(`--pad-y`, String(Math.min(1, Math.max(0, d)))),
        s.style.setProperty(`--air-left`, String(p.airLeft)),
        s.style.setProperty(`--air-right`, String(p.airRight)));
      let h = m > 0.5;
      (h && !r.current && navigator.vibrate?.(12), (r.current = h));
    },
    s = (o) => {
      if (n.current !== o.pointerId) return;
      ((n.current = null), (r.current = !1), (i.current = !1), (a.current = 0));
      let s = e();
      s &&
        (s.touchPad = {
          steer: 0,
          airLeft: 0,
          airRight: 0,
          tapLeft: 0,
          tapRight: 0,
        });
      let c = t.current;
      c &&
        (c.removeAttribute(`data-active`),
        c.style.setProperty(`--air-left`, `0`),
        c.style.setProperty(`--air-right`, `0`));
    };
  return (0, N.jsxs)(`div`, {
    ref: t,
    className: `touch-steer-pad`,
    onPointerDown: (e) => {
      n.current === null &&
        (e.preventDefault(),
        (n.current = e.pointerId),
        e.currentTarget.setPointerCapture(e.pointerId),
        e.currentTarget.setAttribute(`data-active`, ``),
        o(e, !0));
    },
    onPointerMove: (e) => n.current === e.pointerId && o(e),
    onPointerUp: s,
    onPointerCancel: s,
    children: [
      (0, N.jsxs)(`span`, {
        className: `touch-pad-air is-left`,
        "aria-hidden": `true`,
        children: [(0, N.jsx)(`i`, {}), `AIR`],
      }),
      (0, N.jsxs)(`span`, {
        className: `touch-pad-air is-right`,
        "aria-hidden": `true`,
        children: [(0, N.jsx)(`i`, {}), `AIR`],
      }),
      (0, N.jsx)(`button`, {
        type: `button`,
        className: `touch-steer-left`,
        "aria-label": `Steer left`,
        tabIndex: -1,
        children: (0, N.jsx)(ie, {}),
      }),
      (0, N.jsx)(`button`, {
        type: `button`,
        className: `touch-steer-right`,
        "aria-label": `Steer right`,
        tabIndex: -1,
        children: (0, N.jsx)(ae, {}),
      }),
      (0, N.jsx)(`span`, {
        className: `touch-pad-thumb`,
        "aria-hidden": `true`,
      }),
    ],
  });
}
var i2 = 6;
