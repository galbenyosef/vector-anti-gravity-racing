// assets__index-DF2rMRzV 22 — children
// Lines 76273-76573 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function J$({ stage: e, progress: t, back: n, onBack: r }) {
  let i = (0, C.useId)(),
    a = (0, C.useId)();
  return (0, N.jsxs)(`section`, {
    className: `circuit-preparation scenery-bay`,
    "data-menu-scope": `loading`,
    "aria-labelledby": i,
    "aria-describedby": a,
    children: [
      (0, N.jsx)(`svg`, {
        viewBox: `0 0 215 185`,
        className: `circuit-map-art circuit-preparation-backdrop`,
        "aria-hidden": `true`,
        children: (0, N.jsx)(`path`, { d: G$, className: `circuit-map-line` }),
      }),
      (0, N.jsx)(aQ, { launch: `pending`, onCancel: r, cancel: n }),
      (0, N.jsxs)(`div`, {
        className: `circuit-preparation-main`,
        children: [
          (0, N.jsx)(`span`, {
            className: `circuit-preparation-facts`,
            children: `NOW LOADING · ONLINE · WAVEDASH NETWORK · UP TO 8 PILOTS`,
          }),
          (0, N.jsx)(`h2`, { id: i, children: `Launch Bay` }),
          (0, N.jsx)(`p`, {
            className: `circuit-preparation-description`,
            children: `Host a room, join one, or bring your friends. Every pilot lines up here in their own craft and livery.`,
          }),
        ],
      }),
      (0, N.jsxs)(`aside`, {
        className: `circuit-preparation-tip`,
        "aria-label": `Online rooms`,
        children: [
          (0, N.jsxs)(`svg`, {
            viewBox: `0 0 215 185`,
            className: `circuit-map-art circuit-preparation-map`,
            "aria-hidden": `true`,
            children: [
              (0, N.jsx)(`path`, { d: G$, className: `circuit-map-glow` }),
              (0, N.jsx)(`path`, { d: G$, className: `circuit-map-line` }),
              (0, N.jsx)(`circle`, {
                cx: W$[0][0],
                cy: W$[0][1],
                r: `5`,
                className: `circuit-map-start`,
              }),
            ],
          }),
          (0, N.jsxs)(`div`, {
            children: [
              (0, N.jsx)(`span`, { children: `ONLINE ROOMS` }),
              (0, N.jsx)(`ul`, {
                className: `launch-bay-steps`,
                children: q$.map(([e, t]) =>
                  (0, N.jsxs)(
                    `li`,
                    { children: [(0, N.jsx)(`b`, { children: e }), ` `, t] },
                    e,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
      (0, N.jsx)(oQ, {
        target: `Launch Bay`,
        stage: e,
        stageId: a,
        progress: t,
        phases: K$,
        label: `Launch bay preparation`,
        tip: `Change craft in the bay: your rivals see your livery on the grid.`,
      }),
    ],
  });
}
var Y$ = [
    { id: `public`, label: `PUBLIC`, note: `Anyone can join` },
    { id: `friends`, label: `FRIENDS`, note: `Your friends only` },
    { id: `private`, label: `PRIVATE`, note: `Invite link only` },
  ],
  X$ = {
    connecting: `CONNECTING`,
    standby: `IN THE BAY`,
    loading: `LOADING CIRCUIT`,
    ready: `READY`,
    racing: `RACING`,
    reconnecting: `RECONNECTING`,
  };
function Z$(e) {
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
function Q$({ name: e, src: t, accent: n, size: r = 40 }) {
  let [i, a] = (0, C.useState)(!1);
  return (0, N.jsx)(`span`, {
    className: `lobby-avatar`,
    style: { "--avatar-accent": n, width: r, height: r },
    "aria-hidden": `true`,
    children:
      t && !i
        ? (0, N.jsx)(`img`, { src: t, alt: ``, onError: () => a(!0) })
        : Z$(e),
  });
}
function $$({ ping: e }) {
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
function e1(e) {
  if (!e) return `CRAFT INCOMING`;
  let t = id(e.ship),
    n = lQ(e.ship, e.skin);
  return `${t.code} ${t.name.toUpperCase()} · ${n.name.toUpperCase()}`;
}
function t1({ pilot: e, x: t, y: n, scale: r }) {
  let i = e.loadout ? HQ(e.loadout) : `#5f7f8c`,
    a = oZ[(e.loadout?.tier ?? 1) - 1];
  return (0, N.jsxs)(`article`, {
    className: `lobby-plate status-${e.status}${e.self ? ` is-self` : ``}`,
    "data-plate": e.id,
    style: {
      left: `${t * 100}%`,
      top: `${n * 100}%`,
      "--plate-scale": r,
      "--plate-accent": i,
    },
    "aria-label": `${e.name}${e.host ? `, host` : ``}${e.self ? `, you` : ``}: ${e1(e.loadout)}, ${X$[e.status]}`,
    children: [
      (0, N.jsx)(Q$, { name: e.name, src: e.avatar, accent: i }),
      (0, N.jsxs)(`div`, {
        className: `lobby-plate-copy`,
        children: [
          (0, N.jsxs)(`strong`, {
            children: [
              e.host &&
                (0, N.jsx)(de, {
                  className: `lobby-crown`,
                  "aria-hidden": `true`,
                }),
              e.name,
              e.self && (0, N.jsx)(`small`, { children: `YOU` }),
            ],
          }),
          (0, N.jsx)(`span`, {
            className: `lobby-plate-craft`,
            children: e1(e.loadout),
          }),
          (0, N.jsxs)(`span`, {
            className: `lobby-plate-meta`,
            children: [
              (0, N.jsx)(`em`, {
                className: `lobby-status`,
                children: X$[e.status],
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
              (0, N.jsx)($$, { ping: e.ping }),
            ],
          }),
        ],
      }),
    ],
  });
}
function n1({ label: e, value: t, min: n, max: r, disabled: i, onChange: a }) {
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
            children: (0, N.jsx)(ie, {}),
          }),
          (0, N.jsx)(`output`, { "aria-label": e, children: t }),
          (0, N.jsx)(`button`, {
            "aria-label": `More ${e.toLowerCase()}`,
            disabled: i || t >= r,
            onClick: () => a(t + 1),
            children: (0, N.jsx)(ae, {}),
          }),
        ],
      }),
    ],
  });
}
function r1({ label: e, value: t, options: n, disabled: r, onChange: i }) {
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
function i1(e) {
  let t = (0, C.useRef)(null),
    [n, r] = (0, C.useState)(null),
    i = e.map((e) => e.key).join(),
    a = !!n && e.length * 0.15 > (n.band[1] - n.band[0]) * 2;
  return (
    (0, C.useLayoutEffect)(() => {
      let e = t.current,
        n = e?.parentElement;
      if (!e || !n) return;
      let i = () => {
        let t = e.offsetWidth,
          i = e.offsetHeight;
        if (!t || !i) return;
        let a = n.querySelector(`.lobby-left`),
          o = n.querySelector(`.lobby-right`),
          s = n.querySelector(`.front-bar`),
          c = {};
        e.querySelectorAll(`[data-plate]`).forEach((e) => {
          c[e.dataset.plate] = [e.offsetWidth / t, e.offsetHeight / i];
        });
        let l = [
          a ? (a.offsetLeft + a.offsetWidth) / t + 0.01 : 0.02,
          o ? o.offsetLeft / t - 0.01 : 0.98,
        ];
        l[1] - l[0] < Math.max(0, ...Object.values(c).map((e) => e[0])) &&
          (l = [0.02, 0.98]);
        let u = {
          band: l,
          ceiling: s ? (s.offsetTop + s.offsetHeight) / i + 0.01 : 0.14,
          sizes: c,
        };
        r((e) => (e && JSON.stringify(e) === JSON.stringify(u) ? e : u));
      };
      i();
      let a = new ResizeObserver(i);
      return (a.observe(e), () => a.disconnect());
    }, [i, a]),
    {
      layer: t,
      spots: n
        ? GQ(
            e.map(({ key: e, anchor: t }) => {
              let [r, i] = n.sizes[e] ?? [0.14, 0.08];
              return {
                x: t.x,
                y: t.y,
                width: r * t.scale + 0.006,
                height: i * t.scale + 0.012,
              };
            }),
            n.band,
            n.ceiling,
          )
        : e.map(({ anchor: e }) => e),
      laid: !!n,
      crowded: a,
    }
  );
}
