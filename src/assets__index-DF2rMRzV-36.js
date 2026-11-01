// assets__index-DF2rMRzV 36 — jsx
// Lines 81099-81176 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function N0({
  modifiers: e,
  difficulty: t,
  disabled: n,
  onChange: r,
  onDifficulty: i,
}) {
  return (0, N.jsxs)(`div`, {
    className: `modifier-controls`,
    children: [
      (0, N.jsx)(k0, {
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
              children: (0, N.jsx)(ie, {}),
            }),
            (0, N.jsx)(`output`, { "aria-label": `Laps`, children: e.laps }),
            (0, N.jsx)(`button`, {
              "aria-label": `More laps`,
              disabled: e.laps >= 10,
              onClick: () => r({ laps: e.laps + 1 }),
              children: (0, N.jsx)(ae, {}),
            }),
          ],
        }),
      }),
      (0, N.jsx)(k0, {
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
              children: (0, N.jsx)(ie, {}),
            }),
            (0, N.jsx)(`output`, {
              "aria-label": `CPU pilots`,
              children: e.cpuCount,
            }),
            (0, N.jsx)(`button`, {
              "aria-label": `More CPU pilots`,
              disabled: e.cpuCount === 7,
              onClick: () => r({ cpuCount: e.cpuCount + 1 }),
              children: (0, N.jsx)(ae, {}),
            }),
          ],
        }),
      }),
      (0, N.jsx)(A0, {
        label: `CPU pilots difficulty`,
        value: t,
        options: oZ.map((e) => ({ value: e.id, label: e.name })),
        disabled: n || e.cpuCount === 0,
        onChange: i,
      }),
      (0, N.jsx)(M0, { rules: e, disabled: n, onChange: r }),
    ],
  });
}
function P0(e, t, n) {
  try {
    let r = Number(localStorage.getItem(OJ(e, t) + n));
    return Number.isFinite(r) && r > 0 ? r : 0;
  } catch {
    return 0;
  }
}
