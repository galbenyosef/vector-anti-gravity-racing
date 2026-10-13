// assets__index-DphGw8Ou 38 — children
// Lines 81414-81637 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function T0(e, t) {
  let n = BZ.find((t) => t.id === e.tier);
  return iQ(n, t)
    ? aQ(e, t)
      ? ``
      : `Win a medal on a neighbouring event to open it.`
    : `Earn ${n.requires} career points to open the ${n.name} tier.`;
}
function E0({ progress: e, award: t, locked: n, onBack: r, onStartEvent: i }) {
  let a = BZ.filter((t) => iQ(t, e)),
    o = QZ.find((e) => e.id === t?.event),
    [s, c] = (0, C.useState)(o?.tier ?? a.at(-1)?.id ?? `rookie`),
    l = BZ.find((e) => e.id === s),
    u = QZ.filter((e) => e.tier === l.id),
    [d, f] = (0, C.useState)(o?.id ?? u[0].id),
    p = (0, C.useRef)(null),
    m = (0, C.useRef)(null),
    h = (t) => !n && nQ(t) && aQ(t, e);
  (0, C.useEffect)(() => {
    let e = p.current;
    if (!e) return;
    let t = (e) => {
      let t = e.target.dataset.eventId,
        r = QZ.find((e) => e.id === t);
      r && !n && i(r);
    };
    return (
      e.addEventListener(`menuhold`, t),
      () => e.removeEventListener(`menuhold`, t)
    );
  }, [n, i]);
  let g = () => {
      m.current &&=
        (window.clearTimeout(m.current.timer),
        m.current.cell.classList.remove(`is-pressing`),
        null);
    },
    _ = (e, t) => {
      (g(),
        h(t) &&
          (e.classList.add(`is-pressing`),
          (m.current = {
            cell: e,
            timer: window.setTimeout(() => {
              (g(), i(t));
            }, 650),
          })));
    },
    v = (e) => !!t && ((t.improved && t.event === e) || t.unlocked.includes(e)),
    y = u.find((e) => e.id === d) ?? u[0],
    b = rQ(e),
    x = Math.max(...u.map((e) => eQ(e).x)) * b0 + b0,
    S = Math.max(...u.map((e) => eQ(e).y)) * b0 + x0,
    w = (t) => Object.values(e.medals).filter((e) => e === t).length;
  return (0, N.jsxs)(`section`, {
    className: `menu-page career-screen`,
    "data-menu-scope": `career`,
    "aria-label": `Career`,
    children: [
      (0, N.jsx)(_0, {
        index: `02`,
        section: `CAREER`,
        title: `CAREER`,
        subtitle: (0, N.jsxs)(`span`, {
          className: `career-totals`,
          "aria-label": `Career medals`,
          children: [
            RZ.map((e) =>
              (0, N.jsxs)(
                `span`,
                {
                  children: [
                    (0, N.jsx)(`img`, {
                      className: `medal-still${w(e) ? `` : ` is-empty`}`,
                      src: l0(`medal`, e),
                      alt: ``,
                    }),
                    w(e),
                  ],
                },
                e,
              ),
            ),
            (0, N.jsxs)(`strong`, {
              children: [b, (0, N.jsx)(`small`, { children: `PTS` })],
            }),
          ],
        }),
        onBack: r,
        children: (0, N.jsx)(`fieldset`, {
          className: `career-tiers`,
          "aria-label": `Career tier`,
          children: BZ.map((t, n) => {
            let r = iQ(t, e),
              i = QZ.filter((n) => n.tier === t.id && e.medals[n.id]).map(
                (t) => e.medals[t.id],
              ),
              a = i.length,
              o = QZ.filter((e) => e.tier === t.id && nQ(e)).length,
              s =
                a >= o
                  ? ([...RZ].reverse().find((e) => i.includes(e)) ?? null)
                  : null;
            return (0, N.jsxs)(
              `button`,
              {
                "aria-pressed": t.id === l.id,
                className: r ? `` : `is-locked`,
                onClick: () => {
                  (c(t.id), f(`${t.id}-1`));
                },
                children: [
                  (0, N.jsxs)(`span`, { children: [`TIER `, n + 1] }),
                  (0, N.jsx)(`strong`, { children: t.name }),
                  s &&
                    (0, N.jsx)(`img`, {
                      className: `career-tier-trophy`,
                      src: l0(`trophy`, s),
                      alt: `${t.name} ${s} trophy`,
                    }),
                  (0, N.jsx)(`small`, {
                    children: r
                      ? `${a} / ${o} MEDALS`
                      : (0, N.jsxs)(N.Fragment, {
                          children: [
                            (0, N.jsx)(Oe, {}),
                            ` `,
                            t.requires,
                            ` PTS`,
                          ],
                        }),
                  }),
                ],
              },
              t.id,
            );
          }),
        }),
      }),
      (0, N.jsxs)(`div`, {
        className: `career-body`,
        children: [
          (0, N.jsx)(`div`, {
            className: `career-grid-wrap`,
            children: (0, N.jsx)(`fieldset`, {
              ref: p,
              className: `career-grid`,
              "aria-label": `${l.name} events`,
              style: { width: x, height: S },
              children: u.map((t) => {
                let { x: n, y: r } = eQ(t),
                  a = e.medals[t.id],
                  o = aQ(t, e),
                  s = S0[t.kind],
                  c = w0(t);
                return (0, N.jsx)(
                  `button`,
                  {
                    className:
                      `career-hex kind-${t.kind}` +
                      (a ? ` medal-${a}` : ``) +
                      (o && nQ(t) ? `` : ` is-locked`) +
                      (t.id === y.id ? ` is-selected` : ``) +
                      (v(t.id) ? ` is-new` : ``) +
                      (t.reverse ? ` is-reverse` : ``),
                    style: { left: n * b0, top: r * b0, width: b0, height: x0 },
                    "aria-pressed": t.id === y.id,
                    "data-menu-initial": t.id === y.id ? `` : void 0,
                    "data-event-id": t.id,
                    "data-menu-hold": h(t) ? `` : void 0,
                    "aria-label": `Event ${t.number}: ${UZ[t.kind].name}, ${t.kind === `tournament` ? `all circuits` : c.name}${t.reverse ? `, reverse` : ``}${a ? `, ${a} medal` : ``}${o ? `` : `, locked`}`,
                    onFocus: () => f(t.id),
                    onClick: () => f(t.id),
                    onDoubleClick: () => h(t) && i(t),
                    onPointerDown: (e) =>
                      e.button === 0 && _(e.currentTarget, t),
                    onPointerUp: g,
                    onPointerLeave: g,
                    onPointerCancel: g,
                    children: (0, N.jsxs)(`span`, {
                      className: `career-hex-inner`,
                      children: [
                        (0, N.jsx)(`span`, {
                          className: `career-hex-number`,
                          children: String(t.number).padStart(2, `0`),
                        }),
                        o && nQ(t) ? (0, N.jsx)(s, {}) : (0, N.jsx)(Oe, {}),
                        (0, N.jsx)(`span`, {
                          className: `career-hex-circuit`,
                          children:
                            t.kind === `tournament`
                              ? `FINALE`
                              : c.name.slice(0, 3).toUpperCase(),
                        }),
                        t.reverse &&
                          (0, N.jsx)(`span`, {
                            className: `career-hex-reverse`,
                            children: `REVERSE`,
                          }),
                        a &&
                          (0, N.jsx)(`img`, {
                            className: `career-hex-medal`,
                            src: l0(`medal`, a),
                            alt: ``,
                          }),
                      ],
                    }),
                  },
                  t.id,
                );
              }),
            }),
          }),
          (0, N.jsx)(D0, {
            event: y,
            progress: e,
            locked: n,
            onStart: () => i(y),
          }),
        ],
      }),
    ],
  });
}
