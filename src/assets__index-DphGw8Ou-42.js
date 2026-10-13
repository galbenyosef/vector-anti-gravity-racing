// assets__index-DphGw8Ou 42 — jsx
// Lines 82651-82957 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function W0({ interrupt: e, hold: t, onGesture: n, onDone: r }) {
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
    (0, C.useLayoutEffect)(() => zX(!0), []),
    (0, C.useEffect)(() => {
      let e = H0(),
        t = null,
        n = !1,
        r = 0,
        i = () => {
          d.current ||
            ((d.current = !0),
            zX(!1),
            l(`leaving`),
            (r = window.setTimeout(() => u.current(), 600)));
        };
      return (
        C$(
          async () => {
            let { IntroPlayer: e } = await import(`./player-Cd-Kznkt.js`);
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
            zX(!1));
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
var G0 = e0.slice(0, 5),
  K0 = `Vector is 100% Vibecoded by NitsuaFox - Submit requests and feedback on X to @pipisonx or leave comments in the Wavedash comments section.`;
function q0({ onNews: e }) {
  let [t, n] = (0, C.useState)(!1);
  return (0, N.jsxs)(`aside`, {
    className: `menu-news-ticker` + (t ? ` is-paused` : ``),
    "aria-label": `News ticker`,
    children: [
      (0, N.jsxs)(`button`, {
        className: `news-ticker-label`,
        "aria-label": `Read all news updates`,
        onClick: e,
        children: [(0, N.jsx)(Fe, { "aria-hidden": `true` }), ` NEWS`],
      }),
      (0, N.jsx)(`section`, {
        className: `news-ticker-window`,
        "aria-label": `Latest five updates and community feedback. Pause to scroll through the headlines.`,
        tabIndex: 0,
        children: (0, N.jsx)(`div`, {
          className: `news-ticker-track`,
          children: [0, 1].map((e) =>
            (0, N.jsxs)(
              `div`,
              {
                className: `news-ticker-group`,
                "aria-hidden": e === 1 || void 0,
                children: [
                  G0.map((e) =>
                    (0, N.jsxs)(
                      `span`,
                      {
                        className: `news-ticker-item`,
                        children: [
                          (0, N.jsx)(`time`, {
                            dateTime: e.date,
                            children: c0(e.date),
                          }),
                          (0, N.jsx)(`span`, { children: e.title }),
                          (0, N.jsx)(`i`, {
                            "aria-hidden": `true`,
                            children: `◆`,
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                  (0, N.jsxs)(`span`, {
                    className: `news-ticker-item news-ticker-feedback`,
                    children: [
                      (0, N.jsx)(`span`, { children: K0 }),
                      (0, N.jsx)(`i`, { "aria-hidden": `true`, children: `◆` }),
                    ],
                  }),
                ],
              },
              e,
            ),
          ),
        }),
      }),
      (0, N.jsx)(`button`, {
        className: `news-ticker-toggle`,
        "aria-label": t ? `Resume news ticker` : `Pause news ticker`,
        "aria-pressed": t,
        onClick: () => n(!t),
        children: t
          ? (0, N.jsx)(Re, { "aria-hidden": `true` })
          : (0, N.jsx)(Le, { "aria-hidden": `true` }),
      }),
    ],
  });
}
var J0 = (e) =>
    [-90, -30, 30, 90, 150, 210]
      .map((t, n) => {
        let r = (t * Math.PI) / 180,
          i = (50 + e * Math.cos(r)).toFixed(1),
          a = (50 + e * Math.sin(r)).toFixed(1);
        return (n ? `L` : `M`) + i + ` ` + a;
      })
      .join(` `) + ` Z`,
  Y0 = J0(49),
  X0 = J0(45),
  Z0 = J0(37),
  Q0 = J0(55),
  $0 = (e, t) =>
    `M${e} ${t} L${e + 3} ${t + 6} V${t + 21} L${e + 6} ${t + 27} H${e - 6} L${e - 3} ${t + 21} V${t + 6} Z`,
  e2 = {
    mines: (0, N.jsxs)(N.Fragment, {
      children: [
        Array.from({ length: 8 }, (e, t) => {
          let n = (t * Math.PI) / 4,
            r = Math.cos(n),
            i = Math.sin(n);
          return (0, N.jsx)(
            `line`,
            {
              x1: 24 + r * 11,
              y1: 24 + i * 11,
              x2: 24 + r * 17,
              y2: 24 + i * 17,
            },
            t,
          );
        }),
        (0, N.jsx)(`circle`, {
          cx: `24`,
          cy: `24`,
          r: `8.5`,
          fill: `currentColor`,
        }),
      ],
    }),
    rockets: (0, N.jsxs)(N.Fragment, {
      children: [
        (0, N.jsx)(`path`, { d: $0(11, 12), className: `fill` }),
        (0, N.jsx)(`path`, { d: $0(24, 7), className: `fill` }),
        (0, N.jsx)(`path`, { d: $0(37, 12), className: `fill` }),
      ],
    }),
    missile: (0, N.jsxs)(N.Fragment, {
      children: [
        (0, N.jsx)(`circle`, { cx: `24`, cy: `24`, r: `14` }),
        (0, N.jsx)(`path`, { d: `M24 3v10M24 35v10M3 24h10M35 24h10` }),
        (0, N.jsx)(`circle`, {
          cx: `24`,
          cy: `24`,
          r: `4`,
          fill: `currentColor`,
        }),
      ],
    }),
    cannon: (0, N.jsxs)(N.Fragment, {
      children: [
        (0, N.jsx)(`path`, {
          d: `M16 41V19M24 41V15M32 41V19`,
          strokeWidth: `4.5`,
        }),
        (0, N.jsx)(`path`, { d: `M11 41h26` }),
        (0, N.jsx)(`path`, { d: `M16 12V8M24 8V4M32 12V8`, opacity: `.6` }),
      ],
    }),
    turbo: (0, N.jsxs)(N.Fragment, {
      children: [
        (0, N.jsx)(`path`, { d: `M11 22 24 9l13 13` }),
        (0, N.jsx)(`path`, { d: `M11 32 24 19l13 13`, opacity: `.7` }),
        (0, N.jsx)(`path`, { d: `M11 42 24 29l13 13`, opacity: `.4` }),
      ],
    }),
    shield: (0, N.jsxs)(N.Fragment, {
      children: [
        (0, N.jsx)(`path`, {
          d: `M24 4 39 10v12c0 10-6.5 17.5-15 22-8.5-4.5-15-12-15-22V10Z`,
        }),
        (0, N.jsx)(`path`, {
          d: `M24 15.5 30.5 19.25v7.5L24 30.5l-6.5-3.75v-7.5Z`,
          className: `fill`,
        }),
      ],
    }),
  };
