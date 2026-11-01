// assets__index-DF2rMRzV 24 — children
// Lines 77530-77727 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function o1({ hud: e, getGame: t, onAccept: n }) {
  let r = e?.online.invites ?? [],
    i = e ? [`countdown`, `racing`, `paused`].includes(e.mode) : !0;
  return !r.length || i
    ? null
    : (0, N.jsx)(`div`, {
        className: `invite-toasts`,
        "aria-live": `polite`,
        children: r.map((e) =>
          (0, N.jsxs)(
            `div`,
            {
              className: `invite-toast`,
              role: `alert`,
              children: [
                (0, N.jsx)(Q$, {
                  name: e.from,
                  src: e.avatar,
                  accent: `#56e7ff`,
                  size: 42,
                }),
                (0, N.jsxs)(`span`, {
                  className: `invite-copy`,
                  children: [
                    (0, N.jsx)(`strong`, { children: e.from.toUpperCase() }),
                    (0, N.jsx)(`small`, { children: `INVITED YOU TO RACE` }),
                  ],
                }),
                (0, N.jsx)(`button`, {
                  className: `invite-join`,
                  onClick: () => {
                    (n(), t()?.online.acceptInvite(e.id));
                  },
                  children: `JOIN`,
                }),
                (0, N.jsx)(`button`, {
                  "aria-label": `Dismiss invite`,
                  onClick: () => t()?.online.dismissInvite(e.id),
                  children: (0, N.jsx)(mt, {}),
                }),
              ],
            },
            e.id,
          ),
        ),
      });
}
function s1({ back: e = !0 }) {
  return (0, N.jsxs)(`div`, {
    className: `menu-navigation-hints`,
    "aria-label": `Menu controls`,
    children: [
      (0, N.jsxs)(`span`, {
        className: `menu-hints-controller`,
        children: [
          (0, N.jsxs)(`span`, {
            children: [(0, N.jsx)(`kbd`, { children: `L` }), ` POINT`],
          }),
          (0, N.jsxs)(`span`, {
            children: [(0, N.jsx)(`kbd`, { children: `✚` }), ` STEP`],
          }),
          (0, N.jsxs)(`span`, {
            children: [(0, N.jsx)(`kbd`, { children: `A / ×` }), ` SELECT`],
          }),
          e &&
            (0, N.jsxs)(`span`, {
              children: [(0, N.jsx)(`kbd`, { children: `B / ○` }), ` BACK`],
            }),
          (0, N.jsxs)(`span`, {
            children: [(0, N.jsx)(`kbd`, { children: `LB / RB` }), ` CYCLE`],
          }),
        ],
      }),
      (0, N.jsxs)(`span`, {
        className: `menu-hints-keyboard`,
        children: [
          (0, N.jsxs)(`span`, {
            children: [(0, N.jsx)(`kbd`, { children: `↑ ↓ ← →` }), ` NAVIGATE`],
          }),
          (0, N.jsxs)(`span`, {
            children: [(0, N.jsx)(`kbd`, { children: `ENTER` }), ` SELECT`],
          }),
          e &&
            (0, N.jsxs)(`span`, {
              children: [(0, N.jsx)(`kbd`, { children: `ESC` }), ` BACK`],
            }),
        ],
      }),
    ],
  });
}
function c1({
  title: e,
  subtitle: t,
  section: n,
  number: r,
  className: i = ``,
  tab: a = !1,
  hints: o,
  children: s,
  footer: c,
}) {
  let l = (0, C.useContext)(Ui),
    u = a && !!l;
  return (0, N.jsxs)(ul, {
    className: `game-screen ${i}${u ? ` is-front-tab` : ``}`,
    "data-menu-scope": n.toLowerCase().replaceAll(` `, `-`),
    showCloseButton: !1,
    children: [
      u
        ? (0, N.jsx)(Gi, {})
        : (0, N.jsx)(`span`, {
            className: `menu-surface-line`,
            "aria-hidden": `true`,
          }),
      (0, N.jsxs)(`header`, {
        className: `screen-heading`,
        hidden: u,
        children: [
          (0, N.jsx)(`div`, {
            className: `screen-index`,
            "aria-hidden": `true`,
            children: r,
          }),
          (0, N.jsxs)(`div`, {
            className: `screen-heading-copy`,
            children: [
              (0, N.jsxs)(`span`, {
                className: `screen-section`,
                children: [`VECTOR / `, n],
              }),
              (0, N.jsx)(dl, { className: `screen-title`, children: e }),
              (0, N.jsx)(fl, { className: `screen-subtitle`, children: t }),
            ],
          }),
          (0, N.jsx)(`span`, {
            className: `screen-brand`,
            "aria-hidden": `true`,
            children: `V / 2186`,
          }),
        ],
      }),
      (0, N.jsx)(`div`, { className: `screen-body`, children: s }),
      u
        ? (0, N.jsxs)(N.Fragment, {
            children: [
              (0, N.jsx)(cl, {
                className: `screen-back`,
                "aria-label": `Close`,
                "data-menu-back": !0,
                hidden: !0,
              }),
              (0, N.jsx)(Ki, {
                hints: [
                  [[`LB`, `RB`], [`Q`, `E`], `TABS`],
                  ...(o ?? []),
                  [[`A`], [`ENTER`], `SELECT`],
                  [[`B`], [`ESC`], `PLAY TAB`],
                ],
                children: c,
              }),
            ],
          })
        : (0, N.jsxs)(`footer`, {
            className: `screen-footer`,
            children: [
              (0, N.jsxs)(cl, {
                className: `screen-back`,
                "aria-label": `Close`,
                "data-menu-back": !0,
                children: [
                  (0, N.jsx)(ie, {}),
                  ` BACK`,
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
              (0, N.jsx)(s1, { back: !1 }),
              (0, N.jsx)(`div`, {
                className: `screen-footer-status`,
                children: c,
              }),
            ],
          }),
    ],
  });
}
var l1 = [
  { kind: `race`, direction: `normal`, label: `SINGLE RACE` },
  { kind: `timed-lap`, direction: `normal`, label: `TIMED LAP` },
  { kind: `timed-lap`, direction: `reverse`, label: `REVERSE LAP` },
];
