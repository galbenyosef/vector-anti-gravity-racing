// assets__index-DF2rMRzV 39 — jsx
// Lines 81645-81899 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function G0({ progress: e, award: t, locked: n, onBack: r, onStartEvent: i }) {
  let a = oZ.filter((t) => wZ(t, e)),
    o = vZ.find((e) => e.id === t?.event),
    [s, c] = (0, C.useState)(o?.tier ?? a.at(-1)?.id ?? `rookie`),
    l = oZ.find((e) => e.id === s),
    u = vZ.filter((e) => e.tier === l.id),
    [d, f] = (0, C.useState)(o?.id ?? u[0].id),
    p = (0, C.useRef)(null),
    m = (0, C.useRef)(null),
    [h, g] = (0, C.useState)(1),
    _ = (0, C.useRef)(null),
    v = (t) => !n && SZ(t) && TZ(t, e);
  (0, C.useEffect)(() => {
    let e = p.current;
    if (!e) return;
    let t = (e) => {
      let t = e.target.dataset.eventId,
        r = vZ.find((e) => e.id === t);
      r && !n && i(r);
    };
    return (
      e.addEventListener(`menuhold`, t),
      () => e.removeEventListener(`menuhold`, t)
    );
  }, [n, i]);
  let y = () => {
      _.current &&=
        (window.clearTimeout(_.current.timer),
        _.current.cell.classList.remove(`is-pressing`),
        null);
    },
    b = (e, t) => {
      (y(),
        v(t) &&
          (e.classList.add(`is-pressing`),
          (_.current = {
            cell: e,
            timer: window.setTimeout(() => {
              (y(), i(t));
            }, 650),
          })));
    },
    x = (e) => !!t && ((t.improved && t.event === e) || t.unlocked.includes(e)),
    S = u.find((e) => e.id === d) ?? u[0],
    w = CZ(e),
    T = Math.max(...u.map((e) => bZ(e).x)) * z0 + z0,
    E = Math.max(...u.map((e) => bZ(e).y)) * z0 + B0,
    D = (t) => Object.values(e.medals).filter((e) => e === t).length;
  return (
    (0, C.useEffect)(() => {
      let e = m.current;
      if (!e) return;
      let t = () =>
        g(Math.min(1, (e.clientWidth - 24) / T, e.clientHeight / E));
      t();
      let n = new ResizeObserver(t);
      return (n.observe(e), () => n.disconnect());
    }, [T, E]),
    (0, N.jsxs)(`section`, {
      className: `menu-page front-page career-screen`,
      "data-menu-scope": `career`,
      "aria-label": `Career`,
      children: [
        (0, N.jsx)(Gi, {}),
        (0, N.jsx)(R0, {
          index: `02`,
          section: `CAREER`,
          title: `CAREER`,
          subtitle: (0, N.jsxs)(`span`, {
            className: `career-totals`,
            "aria-label": `Career medals`,
            children: [
              iZ.map((e) =>
                (0, N.jsxs)(
                  `span`,
                  {
                    children: [
                      (0, N.jsx)(`img`, {
                        className: `medal-still${D(e) ? `` : ` is-empty`}`,
                        src: I0(`medal`, e),
                        alt: ``,
                      }),
                      D(e),
                    ],
                  },
                  e,
                ),
              ),
              (0, N.jsxs)(`strong`, {
                children: [w, (0, N.jsx)(`small`, { children: `PTS` })],
              }),
            ],
          }),
          onBack: r,
          children: (0, N.jsxs)(`fieldset`, {
            className: `career-tiers`,
            "aria-label": `Career tier`,
            "data-menu-sections": !0,
            children: [
              (0, N.jsx)(Wi, { pad: `LT`, keys: `Z` }),
              oZ.map((t, n) => {
                let r = wZ(t, e),
                  i = vZ
                    .filter((n) => n.tier === t.id && e.medals[n.id])
                    .map((t) => e.medals[t.id]),
                  a = i.length,
                  o = vZ.filter((e) => e.tier === t.id && SZ(e)).length,
                  s =
                    a >= o
                      ? ([...iZ].reverse().find((e) => i.includes(e)) ?? null)
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
                          src: I0(`trophy`, s),
                          alt: `${t.name} ${s} trophy`,
                        }),
                      (0, N.jsx)(`small`, {
                        children: r
                          ? `${a} / ${o} MEDALS`
                          : (0, N.jsxs)(N.Fragment, {
                              children: [
                                (0, N.jsx)(De, {}),
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
              (0, N.jsx)(Wi, { pad: `RT`, keys: `C` }),
            ],
          }),
        }),
        (0, N.jsxs)(`div`, {
          className: `career-body`,
          children: [
            (0, N.jsx)(`div`, {
              ref: m,
              className: `career-grid-wrap`,
              children: (0, N.jsx)(`fieldset`, {
                ref: p,
                className: `career-grid`,
                "aria-label": `${l.name} events`,
                style: {
                  width: T,
                  height: E,
                  transform: h < 1 ? `scale(${h})` : void 0,
                  transformOrigin: h < 1 ? `0 50%` : void 0,
                },
                children: u.map((t) => {
                  let { x: n, y: r } = bZ(t),
                    a = e.medals[t.id],
                    o = TZ(t, e),
                    s = V0[t.kind],
                    c = U0(t);
                  return (0, N.jsx)(
                    `button`,
                    {
                      className:
                        `career-hex kind-${t.kind}` +
                        (a ? ` medal-${a}` : ``) +
                        (o && SZ(t) ? `` : ` is-locked`) +
                        (t.id === S.id ? ` is-selected` : ``) +
                        (x(t.id) ? ` is-new` : ``) +
                        (t.reverse ? ` is-reverse` : ``),
                      style: {
                        left: n * z0,
                        top: r * z0,
                        width: z0,
                        height: B0,
                      },
                      "aria-pressed": t.id === S.id,
                      "data-menu-initial": t.id === S.id ? `` : void 0,
                      "data-event-id": t.id,
                      "data-menu-hold": v(t) ? `` : void 0,
                      "aria-label": `Event ${t.number}: ${lZ[t.kind].name}, ${t.kind === `tournament` ? `all circuits` : c.name}${t.reverse ? `, reverse` : ``}${a ? `, ${a} medal` : ``}${o ? `` : `, locked`}`,
                      onFocus: () => f(t.id),
                      onClick: () => f(t.id),
                      onDoubleClick: () => v(t) && i(t),
                      onPointerDown: (e) =>
                        e.button === 0 && b(e.currentTarget, t),
                      onPointerUp: y,
                      onPointerLeave: y,
                      onPointerCancel: y,
                      children: (0, N.jsxs)(`span`, {
                        className: `career-hex-inner`,
                        children: [
                          (0, N.jsx)(`span`, {
                            className: `career-hex-number`,
                            children: String(t.number).padStart(2, `0`),
                          }),
                          o && SZ(t) ? (0, N.jsx)(s, {}) : (0, N.jsx)(De, {}),
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
                              src: I0(`medal`, a),
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
            (0, N.jsx)(K0, {
              event: S,
              progress: e,
              locked: n,
              onStart: () => i(S),
            }),
          ],
        }),
        (0, N.jsx)(Ki, {
          hints: [
            [[`LB`, `RB`], [`Q`, `E`], `TABS`],
            [[`LT`, `RT`], [`Z`, `C`], `TIER`],
            [[`✚`], [`↑ ↓ ← →`], `EVENT`],
            [[`A`], [`ENTER`], `HOLD TO START`],
            [[`B`], [`ESC`], `PLAY TAB`],
          ],
        }),
      ],
    })
  );
}
