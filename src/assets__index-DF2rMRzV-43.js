// assets__index-DF2rMRzV 43 — current
// Lines 82876-82977 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function a2({ getGame: e }) {
  let t = (0, C.useRef)(null),
    n = (0, C.useRef)(new Map()),
    r = (e, n) => {
      let r = t.current?.querySelectorAll(`[data-thumb]`) ?? [],
        i = null;
      for (let t of r) {
        let r = t.getBoundingClientRect(),
          a = Math.max(r.left - e, 0, e - r.right),
          o = Math.max(r.top - n, 0, n - r.bottom);
        if (!a && !o) return t.dataset.thumb;
        !i && a <= i2 && o <= i2 && (i = t.dataset.thumb);
      }
      return i;
    },
    i = (e) => {
      let n = t.current;
      if (!n) return;
      let r = n.getBoundingClientRect(),
        i = (e.clientX - r.left) / r.width,
        a = (e.clientY - r.top) / r.height;
      (n.style.setProperty(`--pad-x`, String(Math.min(1, Math.max(0, i)))),
        n.style.setProperty(`--pad-y`, String(Math.min(1, Math.max(0, a)))));
    },
    a = () => {
      let r = f0(n.current.values()),
        i = e();
      i && Object.assign(i.touch, r);
      let a = new Set();
      (r.throttle && a.add(`accelerate`),
        r.brake && a.add(`brake`),
        r.fire && a.add(`use`),
        r.absorb && a.add(`absorb`),
        t.current?.toggleAttribute(`data-active`, n.current.size > 0));
      for (let e of t.current?.querySelectorAll(`[data-thumb]`) ?? [])
        e.toggleAttribute(`data-held`, a.has(e.dataset.thumb));
    },
    o = (e) => {
      let t = n.current.get(e.pointerId);
      if (!t) return;
      i(e);
      let o = r(e.clientX, e.clientY);
      o !== t.over &&
        ((o === `use` || o === `absorb`) && navigator.vibrate?.(10),
        (t.over = o),
        a());
    },
    s = (e) => {
      n.current.delete(e.pointerId) && a();
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
        i(e),
        a());
    },
    onPointerMove: o,
    onPointerUp: s,
    onPointerCancel: s,
    onLostPointerCapture: s,
    children: [
      (0, N.jsxs)(`button`, {
        type: `button`,
        className: `touch-absorb`,
        "data-thumb": `absorb`,
        "aria-label": `Absorb weapon`,
        children: [`ABSORB`, (0, N.jsx)(oe, { "aria-hidden": `true` })],
      }),
      (0, N.jsxs)(`button`, {
        type: `button`,
        className: `touch-use`,
        "data-thumb": `use`,
        "aria-label": `Use weapon`,
        children: [`USE`, (0, N.jsx)(oe, { "aria-hidden": `true` })],
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
        children: (0, N.jsx)(j, {}),
      }),
      (0, N.jsx)(`span`, {
        className: `touch-pad-thumb`,
        "aria-hidden": `true`,
      }),
    ],
  });
}
