// assets__index-DphGw8Ou 20 — children
// Lines 75923-76071 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function M$(e) {
  return (
    e
      .split(/[\s_.-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((e) => e[0])
      .join(``)
      .toUpperCase() || `?`
  );
}
function N$({ name: e, src: t, accent: n, size: r = 40 }) {
  let [i, a] = (0, C.useState)(!1);
  return (0, N.jsx)(`span`, {
    className: `lobby-avatar`,
    style: { "--avatar-accent": n, width: r, height: r },
    "aria-hidden": `true`,
    children:
      t && !i
        ? (0, N.jsx)(`img`, { src: t, alt: ``, onError: () => a(!0) })
        : M$(e),
  });
}
function P$({ ping: e }) {
  return e === null
    ? null
    : (0, N.jsxs)(`span`, {
        className: `lobby-signal bars-${e < 80 ? 3 : e < 160 ? 2 : 1}`,
        title: `${e} ms`,
        children: [
          (0, N.jsx)(`i`, {}),
          (0, N.jsx)(`i`, {}),
          (0, N.jsx)(`i`, {}),
          (0, N.jsxs)(`small`, { children: [e, `MS`] }),
        ],
      });
}
function F$(e) {
  if (!e) return `CRAFT INCOMING`;
  let t = Qu(e.ship),
    n = cZ(e.ship, e.skin);
  return `${t.code} ${t.name.toUpperCase()} · ${n.name.toUpperCase()}`;
}
function I$({ pilot: e, x: t, y: n, scale: r }) {
  let i = e.loadout ? jQ(e.loadout) : `#5f7f8c`,
    a = BZ[(e.loadout?.tier ?? 1) - 1];
  return (0, N.jsxs)(`article`, {
    className: `lobby-plate status-${e.status}${e.self ? ` is-self` : ``}`,
    style: {
      left: `${t * 100}%`,
      top: `${n * 100}%`,
      "--plate-scale": r,
      "--plate-accent": i,
    },
    "aria-label": `${e.name}${e.host ? `, host` : ``}${e.self ? `, you` : ``}: ${F$(e.loadout)}, ${j$[e.status]}`,
    children: [
      (0, N.jsx)(N$, { name: e.name, src: e.avatar, accent: i }),
      (0, N.jsxs)(`div`, {
        className: `lobby-plate-copy`,
        children: [
          (0, N.jsxs)(`strong`, {
            children: [
              e.host &&
                (0, N.jsx)(M, {
                  className: `lobby-crown`,
                  "aria-hidden": `true`,
                }),
              e.name,
              e.self && (0, N.jsx)(`small`, { children: `YOU` }),
            ],
          }),
          (0, N.jsx)(`span`, {
            className: `lobby-plate-craft`,
            children: F$(e.loadout),
          }),
          (0, N.jsxs)(`span`, {
            className: `lobby-plate-meta`,
            children: [
              (0, N.jsx)(`em`, {
                className: `lobby-status`,
                children: j$[e.status],
              }),
              e.loadout &&
                (0, N.jsxs)(`span`, {
                  className: `lobby-badge`,
                  children: [
                    a?.name ?? `ROOKIE`,
                    ` · `,
                    e.loadout.medals,
                    (0, N.jsx)(ot, { "aria-hidden": `true` }),
                  ],
                }),
              (0, N.jsx)(P$, { ping: e.ping }),
            ],
          }),
        ],
      }),
    ],
  });
}
function L$({ label: e, value: t, min: n, max: r, disabled: i, onChange: a }) {
  return (0, N.jsxs)(`fieldset`, {
    className: `lobby-rule lobby-rule-stepper`,
    "aria-label": e,
    children: [
      (0, N.jsx)(`span`, { children: e }),
      (0, N.jsxs)(`div`, {
        children: [
          (0, N.jsx)(`button`, {
            "aria-label": `Fewer ${e.toLowerCase()}`,
            disabled: i || t <= n,
            onClick: () => a(t - 1),
            children: (0, N.jsx)(oe, {}),
          }),
          (0, N.jsx)(`output`, { "aria-label": e, children: t }),
          (0, N.jsx)(`button`, {
            "aria-label": `More ${e.toLowerCase()}`,
            disabled: i || t >= r,
            onClick: () => a(t + 1),
            children: (0, N.jsx)(se, {}),
          }),
        ],
      }),
    ],
  });
}
function R$({ label: e, value: t, options: n, disabled: r, onChange: i }) {
  return (0, N.jsxs)(`fieldset`, {
    className: `lobby-rule`,
    "aria-label": e,
    children: [
      (0, N.jsx)(`span`, { children: e }),
      (0, N.jsx)(`div`, {
        children: n.map(([e, n]) =>
          (0, N.jsx)(
            `button`,
            {
              "aria-pressed": e === t,
              disabled: r,
              onClick: () => i(e),
              children: n,
            },
            e,
          ),
        ),
      }),
    ],
  });
}
