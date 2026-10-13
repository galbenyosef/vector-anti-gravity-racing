// assets__index-DphGw8Ou 36 — children
// Lines 80863-81069 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function f0({ label: e, hint: t, disabled: n, children: r }) {
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
function p0({ label: e, value: t, options: n, disabled: r, onChange: i }) {
  return (0, N.jsx)(f0, {
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
var m0 = [
  { value: `on`, label: `ON` },
  { value: `off`, label: `OFF` },
];
function h0({ rules: e, disabled: t, onChange: n }) {
  return (0, N.jsxs)(N.Fragment, {
    children: [
      (0, N.jsx)(p0, {
        label: `Track direction`,
        value: e.direction,
        disabled: t,
        options: [
          { value: `normal`, label: `NORMAL` },
          { value: `reverse`, label: `REVERSE` },
        ],
        onChange: (e) => n({ direction: e }),
      }),
      (0, N.jsx)(p0, {
        label: `Weapons`,
        value: e.weapons ? `on` : `off`,
        options: m0,
        disabled: t,
        onChange: (e) => n({ weapons: e === `on` }),
      }),
      (0, N.jsx)(p0, {
        label: `Disable boost pads`,
        value: e.disableBoostPads ? `on` : `off`,
        options: m0,
        disabled: t,
        onChange: (e) => n({ disableBoostPads: e === `on` }),
      }),
    ],
  });
}
function g0({
  modifiers: e,
  difficulty: t,
  disabled: n,
  onChange: r,
  onDifficulty: i,
}) {
  return (0, N.jsxs)(`div`, {
    className: `modifier-controls`,
    children: [
      (0, N.jsx)(f0, {
        label: `Laps`,
        hint: `1–10 · 3 FOR LEADERBOARDS`,
        disabled: n,
        children: (0, N.jsxs)(`div`, {
          className: `modifier-stepper`,
          children: [
            (0, N.jsx)(`button`, {
              "aria-label": `Fewer laps`,
              disabled: e.laps <= 1,
              onClick: () => r({ laps: e.laps - 1 }),
              children: (0, N.jsx)(oe, {}),
            }),
            (0, N.jsx)(`output`, { "aria-label": `Laps`, children: e.laps }),
            (0, N.jsx)(`button`, {
              "aria-label": `More laps`,
              disabled: e.laps >= 10,
              onClick: () => r({ laps: e.laps + 1 }),
              children: (0, N.jsx)(se, {}),
            }),
          ],
        }),
      }),
      (0, N.jsx)(f0, {
        label: `CPU pilots`,
        hint: `0–7 RIVALS`,
        disabled: n,
        children: (0, N.jsxs)(`div`, {
          className: `modifier-stepper`,
          children: [
            (0, N.jsx)(`button`, {
              "aria-label": `Fewer CPU pilots`,
              disabled: e.cpuCount === 0,
              onClick: () => r({ cpuCount: e.cpuCount - 1 }),
              children: (0, N.jsx)(oe, {}),
            }),
            (0, N.jsx)(`output`, {
              "aria-label": `CPU pilots`,
              children: e.cpuCount,
            }),
            (0, N.jsx)(`button`, {
              "aria-label": `More CPU pilots`,
              disabled: e.cpuCount === 7,
              onClick: () => r({ cpuCount: e.cpuCount + 1 }),
              children: (0, N.jsx)(se, {}),
            }),
          ],
        }),
      }),
      (0, N.jsx)(p0, {
        label: `CPU pilots difficulty`,
        value: t,
        options: BZ.map((e) => ({ value: e.id, label: e.name })),
        disabled: n || e.cpuCount === 0,
        onChange: i,
      }),
      (0, N.jsx)(h0, { rules: e, disabled: n, onChange: r }),
    ],
  });
}
function _0({
  index: e,
  section: t,
  title: n,
  subtitle: r,
  onBack: i,
  children: a,
}) {
  return (0, N.jsxs)(`header`, {
    className: `menu-page-header`,
    children: [
      (0, N.jsxs)(`button`, {
        className: `menu-page-back`,
        "data-menu-back": !0,
        onClick: i,
        children: [
          (0, N.jsx)(oe, {}),
          (0, N.jsxs)(`span`, {
            children: [
              `BACK`,
              (0, N.jsx)(`kbd`, {
                className: `menu-hints-keyboard`,
                children: `ESC`,
              }),
              (0, N.jsx)(`kbd`, {
                className: `menu-hints-controller`,
                children: `B / ○`,
              }),
            ],
          }),
        ],
      }),
      (0, N.jsxs)(`div`, {
        className: `menu-page-title`,
        children: [
          (0, N.jsx)(`span`, {
            className: `menu-page-index`,
            "aria-hidden": `true`,
            children: e,
          }),
          (0, N.jsxs)(`div`, {
            children: [
              (0, N.jsxs)(`span`, {
                className: `menu-page-section`,
                children: [`VECTOR / `, t],
              }),
              (0, N.jsx)(`h2`, { children: n }),
              (0, N.jsx)(`div`, {
                className: `menu-page-subtitle`,
                children: r,
              }),
            ],
          }),
        ],
      }),
      a && (0, N.jsx)(`div`, { className: `menu-page-tools`, children: a }),
    ],
  });
}
function v0(e, t, n) {
  try {
    let r = Number(localStorage.getItem(SJ(e, t) + n));
    return Number.isFinite(r) && r > 0 ? r : 0;
  } catch {
    return 0;
  }
}
