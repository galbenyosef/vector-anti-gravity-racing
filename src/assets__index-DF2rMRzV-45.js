// assets__index-DF2rMRzV 45 — current
// Lines 83662-83997 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function u2() {
  try {
    return localStorage.getItem(`vector-news-seen`) ?? c2;
  } catch {
    return c2;
  }
}
function d2(e) {
  return (
    l2.add(e),
    () => {
      l2.delete(e);
    }
  );
}
function f2(e = o2[0]?.id ?? null) {
  c2 = e;
  try {
    e && localStorage.setItem(s2, e);
  } catch {}
  l2.forEach((e) => e());
}
function p2(e, t = o2) {
  return !!t.length && t[0].id !== e;
}
function m2(e) {
  let [t, n, r] = e.split(`-`).map(Number);
  return `${r} ${`JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC`.split(` `)[n - 1]} ${t}`;
}
var h2 = [
  { key: `added`, label: `NEW`, icon: Qe },
  { key: `improved`, label: `BETTER`, icon: at },
  { key: `fixed`, label: `FIXED`, icon: pt },
];
function g2({ open: e, onOpenChange: t }) {
  let [n, r] = (0, C.useState)(0),
    i = o2[n] ?? o2[0];
  return (0, N.jsx)(ol, {
    open: e,
    onOpenChange: (e) => {
      (t(e), e || r(0));
    },
    children: (0, N.jsxs)(pl, {
      kicker: `VECTOR · NEWS`,
      title: `WHAT'S NEW`,
      description: `Every update to VECTOR: what's new, what's better, what's fixed.`,
      scope: `news`,
      className: `news-drawer`,
      hints: [
        [[`✚`], [`↑ ↓`], `UPDATE`],
        [[`R`], [], `SCROLL`],
      ],
      status: (0, N.jsxs)(`span`, {
        children: [o2.length, ` UPDATES · NEWEST FIRST`],
      }),
      children: [
        (0, N.jsx)(`nav`, {
          className: `news-list`,
          "aria-label": `Updates`,
          children: o2.map((e, t) =>
            (0, N.jsxs)(
              `button`,
              {
                className: `front-row news-pick`,
                "aria-pressed": t === n,
                "data-menu-initial": t === n || void 0,
                onClick: () => r(t),
                onFocus: () => r(t),
                children: [
                  (0, N.jsxs)(`time`, {
                    dateTime: e.date,
                    children: [m2(e.date), t === 0 && ` · LATEST`],
                  }),
                  (0, N.jsx)(`strong`, { children: e.title }),
                ],
              },
              e.id,
            ),
          ),
        }),
        (0, N.jsxs)(
          `article`,
          {
            className: `news-article`,
            "data-menu-scroll": !0,
            children: [
              (0, N.jsxs)(`span`, {
                className: `news-article-date`,
                children: [
                  (0, N.jsx)(`time`, {
                    dateTime: i.date,
                    children: m2(i.date),
                  }),
                  n === 0 &&
                    (0, N.jsx)(`span`, {
                      className: `news-latest`,
                      children: `LATEST`,
                    }),
                ],
              }),
              (0, N.jsx)(`h3`, { children: i.title }),
              (0, N.jsx)(`p`, { children: i.summary }),
              h2.map(({ key: e, label: t, icon: n }) =>
                i[e]?.length
                  ? (0, N.jsxs)(
                      `section`,
                      {
                        className: `news-group is-${e}`,
                        children: [
                          (0, N.jsxs)(`h4`, {
                            children: [(0, N.jsx)(n, {}), ` `, t],
                          }),
                          (0, N.jsx)(`ul`, {
                            children: i[e].map((e) =>
                              (0, N.jsx)(`li`, { children: e }, e),
                            ),
                          }),
                        ],
                      },
                      e,
                    )
                  : null,
              ),
            ],
          },
          i.id,
        ),
      ],
    }),
  });
}
var _2 = () => () => {},
  v2 = null;
function y2() {
  return (
    (v2 ??= ZX({
      search: location.search,
      webdriver: !!navigator.webdriver,
      reducedMotion: matchMedia(`(prefers-reduced-motion: reduce)`).matches,
      enabled: YX(),
    })),
    v2
  );
}
function b2() {
  let e = gX.volume * gX.musicVolume,
    t = nd[0].id;
  try {
    let n = OQ(JSON.parse(localStorage.getItem(`vector-settings`) || `{}`));
    e = n.volume * n.musicVolume;
    let r = localStorage.getItem(rd);
    nd.some((e) => e.id === r) && (t = r);
  } catch {}
  let n = matchMedia(`(pointer: coarse)`).matches,
    r = n && Math.min(screen.width, screen.height) < 900,
    i = new URLSearchParams(location.search),
    a = (e) => {
      let t = Number.parseFloat(i.get(e) ?? ``);
      return Number.isFinite(t) ? t : void 0;
    };
  return {
    volume: e,
    hero: t,
    touch: n,
    mobile: r,
    freeze: a(`introFreeze`),
    seek: a(`introAt`),
  };
}
function x2({ interrupt: e, hold: t, onGesture: n, onFinish: r }) {
  let i = (0, C.useSyncExternalStore)(_2, y2, () => !1),
    a = (0, C.useSyncExternalStore)(KX, qX, () => 0),
    [o, s] = (0, C.useState)(-1);
  return o === a || (a === 0 && !i)
    ? null
    : (0, vi.createPortal)(
        (0, N.jsx)(
          S2,
          {
            interrupt: e,
            hold: t,
            onGesture: n,
            onDone: () => {
              (s(a), r());
            },
          },
          a,
        ),
        document.body,
      );
}
function S2({ interrupt: e, hold: t, onGesture: n, onDone: r }) {
  let i = (0, C.useRef)(n),
    a = (0, C.useRef)(t),
    o = (0, C.useRef)(null),
    s = (0, C.useRef)(null),
    [c, l] = (0, C.useState)(`gate`),
    u = (0, C.useRef)(r);
  (0, C.useLayoutEffect)(() => {
    ((u.current = r), (a.current = t), (i.current = n));
  });
  let d = (0, C.useRef)(!1),
    f = (0, C.useRef)(!1),
    p = (0, C.useRef)(0);
  return (
    (0, C.useLayoutEffect)(() => GX(!0), []),
    (0, C.useEffect)(() => {
      let e = b2(),
        t = null,
        n = !1,
        r = 0,
        i = () => {
          d.current ||
            ((d.current = !0),
            GX(!1),
            l(`leaving`),
            (r = window.setTimeout(() => u.current(), 600)));
        };
      return (
        L$(
          async () => {
            let { IntroPlayer: e } = await import(`./player-D3Mk6s3d.js`);
            return { IntroPlayer: e };
          },
          __vite__mapDeps([3, 2]),
          import.meta.url,
        )
          .then(({ IntroPlayer: r }) => {
            if (n || !o.current) return;
            let c = new r(o.current, { ...e, onEnd: i });
            ((t = c), (s.current = c), c.setHold(a.current));
            let u = window.setTimeout(() => {
              c.hasLoaded || i();
            }, 25e3);
            return c.load().then(() => {
              (window.clearTimeout(u),
                (c.autoplay || e.freeze !== void 0) &&
                  !f.current &&
                  ((f.current = !0),
                  (p.current = performance.now() + 700),
                  c.requestStart(),
                  l(`playing`)));
            });
          })
          .catch((e) => {
            (console.warn(`[intro] unavailable`, e), i());
          }),
        () => {
          ((n = !0),
            window.clearTimeout(r),
            t?.dispose(),
            (s.current = null),
            GX(!1));
        }
      );
    }, []),
    (0, C.useEffect)(() => {
      e && s.current?.skip();
    }, [e]),
    (0, C.useEffect)(() => {
      s.current?.setHold(t);
    }, [t]),
    (0, C.useEffect)(() => {
      let e = !0,
        t = (e) => {
          let t = s.current;
          if (!(!t || d.current)) {
            if (e) return t.skip();
            t.isPlaying
              ? performance.now() > p.current && t.skip()
              : (t.requestStart(),
                f.current || ((f.current = !0), l(`playing`), i.current()),
                (p.current = performance.now() + 700));
          }
        },
        n = (e) => {
          e.isTrusted &&
            (e.repeat ||
              e.metaKey ||
              e.ctrlKey ||
              e.altKey ||
              (e.key !== `Tab` &&
                (e.preventDefault(),
                e.stopImmediatePropagation(),
                t(e.key === `Escape`))));
        },
        r = (e) => {
          e.isTrusted &&
            (e.target?.closest(`.vector-intro-skip`) ||
              (e.type.startsWith(`pointer`) && e.preventDefault(), t(!1)));
        },
        a = [`pointerdown`, `pointerup`, `click`, `touchend`],
        o = 0,
        c = () => {
          o = requestAnimationFrame(c);
          let n = [...(navigator.getGamepads?.() ?? [])].some((e) =>
            e?.buttons.some((e) => e.pressed),
          );
          (n && !e && t(!1), (e = n));
        };
      (c(), window.addEventListener(`keydown`, n, !0));
      for (let e of a) window.addEventListener(e, r, !0);
      return () => {
        (cancelAnimationFrame(o), window.removeEventListener(`keydown`, n, !0));
        for (let e of a) window.removeEventListener(e, r, !0);
      };
    }, []),
    (0, N.jsxs)(`dialog`, {
      open: !0,
      className: `vector-intro`,
      "data-stage": c,
      "aria-label": `VECTOR intro`,
      "data-menu-scope": `intro`,
      children: [
        (0, N.jsx)(`div`, { ref: o, className: `vector-intro-stage` }),
        (0, N.jsx)(`p`, {
          className: `vector-intro-sr`,
          "aria-live": `polite`,
          children:
            c === `gate`
              ? `Press any key or tap to start the intro. Escape skips it.`
              : `Intro playing. Press any key to skip.`,
        }),
        (0, N.jsxs)(`button`, {
          className: `vector-intro-skip`,
          onClick: () => s.current?.skip(),
          "data-menu-initial": !0,
          children: [
            `SKIP INTRO `,
            (0, N.jsx)(`span`, { "aria-hidden": `true`, children: `›` }),
          ],
        }),
      ],
    })
  );
}
