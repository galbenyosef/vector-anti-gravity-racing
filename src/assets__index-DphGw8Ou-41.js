// assets__index-DphGw8Ou 41 — jsx
// Lines 82334-82650 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function N0({ getGame: e }) {
  let t = (0, C.useRef)(null),
    n = (0, C.useRef)(null),
    r = (0, C.useRef)(!1),
    i = (0, C.useRef)(!1),
    a = (0, C.useRef)(0),
    o = (n, o = !1) => {
      let s = t.current,
        c = e();
      if (!s || !c) return;
      let l = s.getBoundingClientRect(),
        u = (n.clientX - l.left) / l.width,
        d = (n.clientY - l.top) / l.height,
        f = u - 0.5;
      Math.abs(f) > R1.dead
        ? (a.current = f < 0 ? -1 : 1)
        : (a.current ||= f < 0 ? -1 : +(f > 0));
      let p = z1(u, d, a.current),
        m = Math.max(p.airLeft, p.airRight);
      (o ? (i.current = m >= 0.35) : m < 0.15 && (i.current = !1),
        (c.touchPad = {
          ...p,
          tapLeft: i.current ? p.airLeft : 0,
          tapRight: i.current ? p.airRight : 0,
        }),
        s.style.setProperty(`--pad-x`, String(Math.min(1, Math.max(0, u)))),
        s.style.setProperty(`--pad-y`, String(Math.min(1, Math.max(0, d)))),
        s.style.setProperty(`--air-left`, String(p.airLeft)),
        s.style.setProperty(`--air-right`, String(p.airRight)));
      let h = m > 0.5;
      (h && !r.current && navigator.vibrate?.(12), (r.current = h));
    },
    s = (o) => {
      if (n.current !== o.pointerId) return;
      ((n.current = null), (r.current = !1), (i.current = !1), (a.current = 0));
      let s = e();
      s &&
        (s.touchPad = {
          steer: 0,
          airLeft: 0,
          airRight: 0,
          tapLeft: 0,
          tapRight: 0,
        });
      let c = t.current;
      c &&
        (c.removeAttribute(`data-active`),
        c.style.setProperty(`--air-left`, `0`),
        c.style.setProperty(`--air-right`, `0`));
    };
  return (0, N.jsxs)(`div`, {
    ref: t,
    className: `touch-steer-pad`,
    onPointerDown: (e) => {
      n.current === null &&
        (e.preventDefault(),
        (n.current = e.pointerId),
        e.currentTarget.setPointerCapture(e.pointerId),
        e.currentTarget.setAttribute(`data-active`, ``),
        o(e, !0));
    },
    onPointerMove: (e) => n.current === e.pointerId && o(e),
    onPointerUp: s,
    onPointerCancel: s,
    children: [
      (0, N.jsxs)(`span`, {
        className: `touch-pad-air is-left`,
        "aria-hidden": `true`,
        children: [(0, N.jsx)(`i`, {}), `AIR`],
      }),
      (0, N.jsxs)(`span`, {
        className: `touch-pad-air is-right`,
        "aria-hidden": `true`,
        children: [(0, N.jsx)(`i`, {}), `AIR`],
      }),
      (0, N.jsx)(`button`, {
        type: `button`,
        className: `touch-steer-left`,
        "aria-label": `Steer left`,
        tabIndex: -1,
        children: (0, N.jsx)(oe, {}),
      }),
      (0, N.jsx)(`button`, {
        type: `button`,
        className: `touch-steer-right`,
        "aria-label": `Steer right`,
        tabIndex: -1,
        children: (0, N.jsx)(se, {}),
      }),
      (0, N.jsx)(`span`, {
        className: `touch-pad-thumb`,
        "aria-hidden": `true`,
      }),
    ],
  });
}
var P0 = 6;
function F0({ getGame: e }) {
  let t = (0, C.useRef)(null),
    n = (0, C.useRef)(new Map()),
    r = (e, n) => {
      let r = t.current?.querySelectorAll(`[data-thumb]`) ?? [];
      for (let t of r) {
        let r = t.getBoundingClientRect();
        if (
          e >= r.left - P0 &&
          e <= r.right + P0 &&
          n >= r.top - P0 &&
          n <= r.bottom + P0
        )
          return t.dataset.thumb;
      }
      return null;
    },
    i = () => {
      let r = V1(n.current.values()),
        i = e();
      i && Object.assign(i.touch, r);
      let a = new Set();
      (r.throttle && a.add(`accelerate`),
        r.brake && a.add(`brake`),
        r.fire && a.add(`use`),
        r.absorb && a.add(`absorb`));
      for (let e of t.current?.querySelectorAll(`[data-thumb]`) ?? [])
        e.toggleAttribute(`data-held`, a.has(e.dataset.thumb));
    },
    a = (e) => {
      let t = n.current.get(e.pointerId);
      if (!t) return;
      let a = r(e.clientX, e.clientY);
      a !== t.over &&
        ((a === `use` || a === `absorb`) && navigator.vibrate?.(10),
        (t.over = a),
        i());
    },
    o = (e) => {
      n.current.delete(e.pointerId) && i();
    };
  return (0, N.jsxs)(`div`, {
    ref: t,
    className: `touch-cluster touch-right`,
    onPointerDown: (e) => {
      let t = r(e.clientX, e.clientY);
      t &&
        (e.preventDefault(),
        e.currentTarget.setPointerCapture(e.pointerId),
        n.current.set(e.pointerId, { from: t, over: t }),
        i());
    },
    onPointerMove: a,
    onPointerUp: o,
    onPointerCancel: o,
    onLostPointerCapture: o,
    children: [
      (0, N.jsx)(`button`, {
        type: `button`,
        className: `touch-absorb`,
        "data-thumb": `absorb`,
        "aria-label": `Absorb weapon`,
        children: `ABSORB`,
      }),
      (0, N.jsx)(`button`, {
        type: `button`,
        className: `touch-use`,
        "data-thumb": `use`,
        "aria-label": `Use weapon`,
        children: `USE`,
      }),
      (0, N.jsx)(`button`, {
        type: `button`,
        className: `touch-brake`,
        "data-thumb": `brake`,
        "aria-label": `Brake`,
        children: (0, N.jsx)(k, {}),
      }),
      (0, N.jsx)(`button`, {
        type: `button`,
        className: `touch-accelerate`,
        "data-thumb": `accelerate`,
        "aria-label": `Accelerate`,
        children: (0, N.jsx)(te, {}),
      }),
    ],
  });
}
var I0 = [
  { key: `added`, label: `NEW`, icon: $e },
  { key: `improved`, label: `BETTER`, icon: at },
  { key: `fixed`, label: `FIXED`, icon: pt },
];
function L0({ entry: e, latest: t }) {
  return (0, N.jsxs)(`details`, {
    className: `news-entry` + (t ? ` is-latest` : ``),
    open: !0,
    children: [
      (0, N.jsxs)(`summary`, {
        children: [
          (0, N.jsx)(`time`, { dateTime: e.date, children: c0(e.date) }),
          t &&
            (0, N.jsx)(`span`, {
              className: `news-latest`,
              children: `LATEST`,
            }),
          (0, N.jsx)(`h3`, { children: e.title }),
          (0, N.jsx)(`p`, { children: e.summary }),
        ],
      }),
      I0.map(({ key: t, label: n, icon: r }) =>
        e[t]?.length
          ? (0, N.jsxs)(
              `section`,
              {
                className: `news-group is-${t}`,
                children: [
                  (0, N.jsxs)(`h4`, { children: [(0, N.jsx)(r, {}), ` `, n] }),
                  (0, N.jsx)(`ul`, {
                    children: e[t].map((e) =>
                      (0, N.jsx)(`li`, { children: e }, e),
                    ),
                  }),
                ],
              },
              t,
            )
          : null,
      ),
    ],
  });
}
function R0({ open: e, onOpenChange: t }) {
  return (0, N.jsx)(nl, {
    open: e,
    onOpenChange: t,
    children: (0, N.jsx)(ll, {
      title: `WHAT'S NEW`,
      subtitle: `Every update to VECTOR: what's new, what's better, what's fixed.`,
      section: `NEWS`,
      number: `07`,
      className: `news-screen`,
      footer: (0, N.jsxs)(`span`, {
        className: `news-footer`,
        children: [
          (0, N.jsx)(Fe, {}),
          ` `,
          e0.length,
          ` UPDATES · NEWEST FIRST`,
        ],
      }),
      children: (0, N.jsx)(`div`, {
        className: `news-feed`,
        children: e0.map((e, t) =>
          (0, N.jsx)(L0, { entry: e, latest: t === 0 }, e.id),
        ),
      }),
    }),
  });
}
var z0 = () => () => {},
  B0 = null;
function V0() {
  return (
    (B0 ??= GX({
      search: location.search,
      webdriver: !!navigator.webdriver,
      reducedMotion: matchMedia(`(prefers-reduced-motion: reduce)`).matches,
      enabled: UX(),
    })),
    B0
  );
}
function H0() {
  let e = uX.volume * uX.musicVolume,
    t = Xu[0].id;
  try {
    let n = DZ(JSON.parse(localStorage.getItem(`vector-settings`) || `{}`));
    e = n.volume * n.musicVolume;
    let r = localStorage.getItem(Zu);
    Xu.some((e) => e.id === r) && (t = r);
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
function U0({ interrupt: e, hold: t, onGesture: n, onFinish: r }) {
  let i = (0, C.useSyncExternalStore)(z0, V0, () => !1),
    a = (0, C.useSyncExternalStore)(BX, VX, () => 0),
    [o, s] = (0, C.useState)(-1);
  return o === a || (a === 0 && !i)
    ? null
    : (0, vi.createPortal)(
        (0, N.jsx)(
          W0,
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
