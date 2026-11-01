// assets__index-DF2rMRzV 14 — children
// Lines 73006-73105 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function oQ({
  target: e,
  stage: t,
  stageId: n,
  progress: r,
  phases: i,
  label: a,
  tip: o,
}) {
  let s = r !== null && Number.isFinite(r) ? Math.min(1, Math.max(0, r)) : null,
    c = s === null ? null : Math.floor(s * 100),
    l = i.findLastIndex(([, e]) => (s ?? 0) >= e);
  return (0, N.jsxs)(`div`, {
    className: `circuit-preparation-bar`,
    children: [
      (0, N.jsx)(`ol`, {
        className: `circuit-preparation-phases`,
        "aria-hidden": `true`,
        children: i.map(([e], t) =>
          (0, N.jsx)(
            `li`,
            {
              className: t < l ? `is-done` : t === l ? `is-active` : void 0,
              children: e,
            },
            e,
          ),
        ),
      }),
      (0, N.jsx)(`span`, {
        className: `circuit-preparation-percent`,
        "aria-hidden": `true`,
        children:
          c === null
            ? `PLEASE WAIT`
            : (0, N.jsxs)(N.Fragment, {
                children: [c, (0, N.jsx)(`small`, { children: `%` })],
              }),
      }),
      (0, N.jsxs)(`div`, {
        className: `circuit-preparation-progress${s === null ? ` is-indeterminate` : ``}`,
        children: [
          (0, N.jsx)(`progress`, {
            max: 100,
            value: s === null ? void 0 : s * 100,
            "aria-label": a,
            "aria-valuenow": c ?? void 0,
            "aria-valuetext": c === null ? t : `${c}% complete`,
          }),
          s === null && (0, N.jsx)(`span`, { "aria-hidden": `true` }),
        ],
      }),
      (0, N.jsxs)(`output`, {
        className: `circuit-preparation-status`,
        "aria-live": `polite`,
        "aria-atomic": `true`,
        children: [
          (0, N.jsxs)(`span`, { className: `sr-only`, children: [e, `: `] }),
          (0, N.jsx)(`span`, {
            id: n,
            className: `circuit-preparation-stage`,
            children: t,
          }),
        ],
      }),
      o &&
        (0, N.jsxs)(`p`, {
          className: `circuit-preparation-note`,
          children: [`TIP · `, o],
        }),
    ],
  });
}
var sQ = `vector-ship-skins-v1`;
function cQ(e) {
  let t = nd.find((t) => t.id === e);
  return [
    {
      id: `original`,
      name: `Original`,
      edition: `FACTORY LIVERY`,
      description: t.description,
      colors: [t.color, `#e8efe9`, `#172c36`],
      preview: `models/previews/${e}.jpg`,
    },
    ...ed[e].map((t) => ({
      ...t,
      id: t.id,
      preview: `models/previews/${e}-${t.id}.jpg`,
    })),
  ];
}
function lQ(e, t) {
  let n = cQ(e);
  return n.find((e) => e.id === t) ?? n[0];
}
function uQ(e) {
  let t = e && typeof e == `object` && !Array.isArray(e) ? e : {};
  return Object.fromEntries(nd.map((e) => [e.id, lQ(e.id, t[e.id]).id]));
}
