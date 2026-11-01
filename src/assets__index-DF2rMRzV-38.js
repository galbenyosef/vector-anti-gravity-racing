// assets__index-DF2rMRzV 38 — children
// Lines 81501-81644 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function L0({
  kind: e,
  metal: t,
  reveal: n = !1,
  hidden: r = !1,
  label: i,
  className: a = ``,
}) {
  let o = (0, C.useRef)(null),
    s = (0, C.useRef)(null),
    c = `${e}-${n}`,
    [l, u] = (0, C.useState)(``),
    d = l === c,
    f = (0, C.useRef)({ metal: t, hidden: r });
  return (
    (0, C.useEffect)(() => {
      ((f.current = { metal: t, hidden: r }),
        s.current?.setMetal(t),
        s.current?.setActive(!r));
    }, [t, r]),
    (0, C.useEffect)(() => {
      let t = o.current;
      if (!t) return;
      let r = !1,
        i = new AbortController(),
        a = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
      return (
        L$(
          async () => {
            let { mountAward: e } = await import(`./award-scene-DZbn-o_G.js`);
            return { mountAward: e };
          },
          __vite__mapDeps([0, 1, 2]),
          import.meta.url,
        )
          .then(({ mountAward: o }) => {
            if (!r)
              return o(t, {
                kind: e,
                metal: f.current.metal,
                reveal: n,
                still: a,
                onReady: () => !r && u(c),
                signal: i.signal,
              });
          })
          .then((e) => {
            if (e) {
              if (r) return e.dispose();
              ((s.current = e),
                e.setMetal(f.current.metal),
                e.setActive(!f.current.hidden));
            }
          })
          .catch(() => {}),
        () => {
          ((r = !0), i.abort(), s.current?.dispose(), (s.current = null));
        }
      );
    }, [c, e, n]),
    (0, N.jsx)(`div`, {
      ref: o,
      className: `award-viewer award-${e} metal-${t}${d ? ` is-live` : ``}${n ? ` is-reveal` : ``}${r ? ` is-hidden` : ``} ${a}`,
      "aria-hidden": r || void 0,
      children: (0, N.jsx)(`img`, {
        className: `award-still`,
        src: I0(e, t),
        alt: r ? `` : i,
      }),
    })
  );
}
function R0({
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
          (0, N.jsx)(ie, {}),
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
var z0 = 160,
  B0 = (z0 * 2) / Math.sqrt(3),
  V0 = { race: me, "speed-lap": it, orbs: se, tournament: ot },
  H0 = (e) => `${e}${e === 1 ? `ST` : e === 2 ? `ND` : e === 3 ? `RD` : `TH`}`,
  U0 = (e) => wJ.find((t) => t.id === e.circuit);
function W0(e, t) {
  let n = oZ.find((t) => t.id === e.tier);
  return wZ(n, t)
    ? TZ(e, t)
      ? ``
      : `Win a medal on a neighbouring event to open it.`
    : `Earn ${n.requires} career points to open the ${n.name} tier.`;
}
