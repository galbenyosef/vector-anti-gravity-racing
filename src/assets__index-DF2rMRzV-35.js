// assets__index-DF2rMRzV 35 — children
// Lines 80809-81098 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function D0({ active: e, hasGame: t }) {
  return (
    (0, C.useEffect)(() => {
      if (!e || t()) return;
      let n = new E0(),
        r = i0(navigator),
        i = 0,
        a = () => n.resolveScope()?.querySelector(`[data-menu-back]`)?.click(),
        o = () => {
          (n.update(document.hidden ? void 0 : r(), n.resolveScope(), a),
            (i = requestAnimationFrame(o)));
        },
        s = (e) => {
          n.handleKeyboard(e, n.resolveScope(), a);
        },
        c = () => n.pointer();
      return (
        (i = requestAnimationFrame(o)),
        window.addEventListener(`keydown`, s, !0),
        window.addEventListener(`pointerdown`, c),
        () => {
          (cancelAnimationFrame(i),
            window.removeEventListener(`keydown`, s, !0),
            window.removeEventListener(`pointerdown`, c),
            n.dispose());
        }
      );
    }, [e, t]),
    null
  );
}
function O0({
  hud: e,
  getGame: t,
  starting: n,
  locked: r,
  status: i,
  onSetup: a,
  onStart: o,
}) {
  let s = e?.circuit ?? TJ,
    c = e?.modifiers ?? Vu,
    l = e?.kind === `timed-lap`,
    u = c.direction === `reverse`,
    d = Math.max(
      0,
      wJ.findIndex((e) => e.id === s.id),
    ),
    f = (e) => t()?.browseCircuit(wJ[(d + e + wJ.length) % wJ.length].id),
    p = s.name.replace(` MK III`, ``).toUpperCase(),
    m = oZ.find((t) => t.id === e?.difficulty)?.name ?? `PRO`,
    h = l
      ? u
        ? `REVERSE LAP LEADERBOARD`
        : `TIMED LAP LEADERBOARD`
      : Yu(c) && c.cpuCount === 7
        ? `STANDARD RULES · LEADERBOARD`
        : `CUSTOM RACE · LOCAL RECORDS`;
  return (0, N.jsxs)(`section`, {
    className: `front-page play-tab`,
    "aria-label": `Play`,
    children: [
      (0, N.jsx)(Gi, {}),
      (0, N.jsxs)(`section`, {
        className: `play-next`,
        "aria-label": `Next race`,
        children: [
          (0, N.jsxs)(`div`, {
            className: `play-map`,
            children: [
              (0, N.jsx)(qZ, {
                path: s.mapPath,
                label: `${s.name} circuit map`,
                className: `scenery-${s.scenery}`,
              }),
              (0, N.jsxs)(`span`, {
                className: `play-pager`,
                "data-menu-sections": !0,
                children: [
                  (0, N.jsx)(`button`, {
                    "aria-label": `Previous circuit`,
                    "data-menu-step": `-1`,
                    disabled: r,
                    onClick: () => f(-1),
                    children: (0, N.jsx)(Wi, { pad: `LT`, keys: `Z` }),
                  }),
                  (0, N.jsxs)(`span`, {
                    children: [
                      String(d + 1).padStart(2, `0`),
                      ` /`,
                      ` `,
                      String(wJ.length).padStart(2, `0`),
                    ],
                  }),
                  (0, N.jsx)(`button`, {
                    "aria-label": `Next circuit`,
                    "data-menu-step": `1`,
                    disabled: r,
                    onClick: () => f(1),
                    children: (0, N.jsx)(Wi, { pad: `RT`, keys: `C` }),
                  }),
                ],
              }),
            ],
          }),
          (0, N.jsxs)(`div`, {
            className: `play-next-copy`,
            children: [
              (0, N.jsxs)(`span`, {
                className: `front-kicker is-hot`,
                children: [
                  `NEXT RACE · `,
                  s.category,
                  ` · `,
                  s.timeOfDay,
                  ` ·`,
                  ` `,
                  s.lengthLabel,
                ],
              }),
              (0, N.jsx)(`strong`, {
                className: `play-name` + (p.length > 14 ? ` is-long` : ``),
                children: p,
              }),
              (0, N.jsxs)(`span`, {
                className: `play-chips`,
                children: [
                  (0, N.jsx)(`span`, {
                    className: `front-chip`,
                    children: l ? `TIMED LAP` : `SINGLE RACE`,
                  }),
                  (0, N.jsx)(`span`, {
                    className: `front-chip`,
                    children: l
                      ? `∞ LAPS`
                      : `${c.laps} ${c.laps === 1 ? `LAP` : `LAPS`}`,
                  }),
                  u &&
                    (0, N.jsx)(`span`, {
                      className: `front-chip`,
                      children: `REVERSE`,
                    }),
                  !l &&
                    (0, N.jsx)(`span`, {
                      className: `front-chip`,
                      children:
                        c.cpuCount === 0
                          ? `NO CPU`
                          : `${c.cpuCount} CPU · ${m}`,
                    }),
                  !l &&
                    (0, N.jsx)(`span`, {
                      className: `front-chip`,
                      children: c.weapons ? `WEAPONS ON` : `WEAPONS OFF`,
                    }),
                  (0, N.jsx)(`span`, {
                    className: `front-kicker play-boards`,
                    children: h,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, N.jsxs)(`div`, {
        className: `play-actions`,
        children: [
          (0, N.jsxs)(`button`, {
            id: `start-btn`,
            className: `front-ghost play-now`,
            "data-pad": `start`,
            disabled: n.disabled,
            onClick: o,
            children: [
              (0, N.jsx)(Le, {}),
              (0, N.jsxs)(`span`, {
                children: [
                  n.disabled ? n.label : `RACE NOW · SAME SETTINGS`,
                  e?.circuit.loaded === !1 &&
                    !n.disabled &&
                    (0, N.jsx)(`small`, {
                      children: `LOADS THE CIRCUIT, THEN LAUNCHES`,
                    }),
                ],
              }),
              (0, N.jsx)(Wi, { pad: `☰` }),
            ],
          }),
          (0, N.jsxs)(`button`, {
            className: `front-primary play-setup`,
            "data-menu-initial": !0,
            disabled: !e?.ready,
            onClick: a,
            children: [
              (0, N.jsx)(Xe, {}),
              (0, N.jsxs)(`span`, {
                children: [
                  `RACE SETUP`,
                  (0, N.jsx)(`small`, { children: `CIRCUIT · CRAFT · RULES` }),
                ],
              }),
              (0, N.jsx)(Wi, { pad: `A`, keys: `ENTER` }),
            ],
          }),
        ],
      }),
      (0, N.jsx)(Ki, {
        hints: [
          [[`LB`, `RB`], [`Q`, `E`], `TABS`],
          [[`LT`, `RT`], [`Z`, `C`], `CIRCUIT`],
          [[`A`], [`ENTER`], `SELECT`],
          [[`☰`], [], `RACE NOW`],
          [[`Y`], [`G`], `GARAGE`],
        ],
        children: i,
      }),
    ],
  });
}
function k0({ label: e, hint: t, disabled: n, children: r }) {
  let i = (0, C.useId)();
  return (0, N.jsxs)(`fieldset`, {
    className: `modifier-row`,
    disabled: n,
    "aria-labelledby": i,
    children: [
      (0, N.jsxs)(`span`, {
        className: `modifier-label`,
        id: i,
        children: [e, t && (0, N.jsx)(`small`, { children: t })],
      }),
      r,
    ],
  });
}
function A0({ label: e, value: t, options: n, disabled: r, onChange: i }) {
  return (0, N.jsx)(k0, {
    label: e,
    disabled: r,
    children: (0, N.jsx)(`div`, {
      className: `modifier-choices`,
      children: n.map((e) =>
        (0, N.jsx)(
          `button`,
          {
            "aria-pressed": e.value === t,
            onClick: () => i(e.value),
            children: e.label,
          },
          e.value,
        ),
      ),
    }),
  });
}
var j0 = [
  { value: `on`, label: `ON` },
  { value: `off`, label: `OFF` },
];
function M0({ rules: e, disabled: t, onChange: n }) {
  return (0, N.jsxs)(N.Fragment, {
    children: [
      (0, N.jsx)(A0, {
        label: `Track direction`,
        value: e.direction,
        disabled: t,
        options: [
          { value: `normal`, label: `NORMAL` },
          { value: `reverse`, label: `REVERSE` },
        ],
        onChange: (e) => n({ direction: e }),
      }),
      (0, N.jsx)(A0, {
        label: `Weapons`,
        value: e.weapons ? `on` : `off`,
        options: j0,
        disabled: t,
        onChange: (e) => n({ weapons: e === `on` }),
      }),
      (0, N.jsx)(A0, {
        label: `Disable boost pads`,
        value: e.disableBoostPads ? `on` : `off`,
        options: j0,
        disabled: t,
        onChange: (e) => n({ disableBoostPads: e === `on` }),
      }),
    ],
  });
}
