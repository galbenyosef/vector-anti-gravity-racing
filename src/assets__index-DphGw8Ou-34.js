// assets__index-DphGw8Ou 34 — current
// Lines 80424-80525 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function i0() {
  try {
    return localStorage.getItem(`vector-news-seen`) ?? n0;
  } catch {
    return n0;
  }
}
function a0(e) {
  return (
    r0.add(e),
    () => {
      r0.delete(e);
    }
  );
}
function o0(e = e0[0]?.id ?? null) {
  n0 = e;
  try {
    e && localStorage.setItem(t0, e);
  } catch {}
  r0.forEach((e) => e());
}
function s0(e, t = e0) {
  return !!t.length && t[0].id !== e;
}
function c0(e) {
  let [t, n, r] = e.split(`-`).map(Number);
  return `${r} ${`JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC`.split(` `)[n - 1]} ${t}`;
}
var l0 = (e, t) => `ui/awards/${e}-${t}.webp`;
function u0({
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
        C$(
          async () => {
            let { mountAward: e } = await import(`./award-scene-D9Dc5ufv.js`);
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
        src: l0(e, t),
        alt: r ? `` : i,
      }),
    })
  );
}
