// assets__index-DF2rMRzV 30 — children
// Lines 79446-79556 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function K1(e, t, n = !1) {
  let r = new URLSearchParams(e),
    i =
      /iPhone|iPad|iPod/i.test(t.userAgent) ||
      (t.platform === `MacIntel` && t.maxTouchPoints > 1),
    a = i || /Android|Mobile|Tablet|Silk|Kindle/i.test(t.userAgent),
    o = r.get(`safe`) === `1` || ((a || n) && r.get(`safe`) !== `0`);
  return {
    appleMobile: i,
    mobile: a,
    steamDeck: n,
    safeMode: o,
    localReflections:
      !/\bFirefox\//.test(t.userAgent) || r.get(`probe`) === `1`,
    forceWebGL: o || r.has(`webgl`) || (a && r.get(`webgpu`) !== `1`),
  };
}
var q1 = () => K1(location.search, navigator, LQ());
function J1(e) {
  if (typeof e == `string`) return e.slice(0, 240);
  if (!e || typeof e != `object`) return `Unknown graphics error`;
  let t = e;
  return (
    [t.api, t.type, t.message, t.reason]
      .filter((e) => typeof e == `string` && e.length > 0)
      .join(`: `) || `Unknown graphics error`
  ).slice(0, 240);
}
function Y1() {
  let e = (e) => {
      let t = document.createElement(`div`);
      t.style.cssText = `position:fixed;left:-9999px;top:0;visibility:hidden;zoom:${e}`;
      let n = t.appendChild(document.createElement(`span`));
      ((n.textContent = `MMMM`),
        (n.style.cssText = `font:100px monospace;white-space:nowrap`),
        document.body.appendChild(t));
      let r = n.getBoundingClientRect().width;
      return (t.remove(), r);
    },
    t = e(`1`);
  return !t || e(`0.5`) / t < 0.75;
}
function X1({
  aspect: e,
  children: t,
  className: n,
  canvasRef: r,
  menuScope: i,
  controller: a = !1,
}) {
  let o = (0, C.useRef)(null),
    [s, c] = (0, C.useState)(null),
    [l, u] = (0, C.useState)(0),
    [d, f] = (0, C.useState)(1600),
    [p, m] = (0, C.useState)(!1);
  (0, C.useLayoutEffect)(() => {
    let e = o.current;
    if (!e) return;
    m(q1().mobile && Y1());
    let t = () => {
      let t = e.getBoundingClientRect(),
        n = t.height / 900;
      (u(n), n > 0 && f(t.width / n));
    };
    t();
    let n = new ResizeObserver(t);
    return (n.observe(e), () => n.disconnect());
  }, [e]);
  let h = p
    ? { zoom: l || 1, contain: `layout` }
    : { transform: `scale(${l})` };
  return (0, N.jsx)(`main`, {
    className: `game-viewport`,
    "data-aspect": e ?? void 0,
    children: (0, N.jsxs)(`div`, {
      ref: o,
      className: `game-stage`,
      children: [
        (0, N.jsx)(`div`, { ref: r, className: `game-canvas` }),
        (0, N.jsx)(al, {
          value: s,
          children: (0, N.jsx)(`div`, {
            ref: c,
            className: n,
            "data-menu-scope": i,
            "data-controller": a,
            style: {
              width: d,
              ...h,
              visibility: e && l > 0 ? `visible` : `hidden`,
              "--ui-scale": l || 1,
            },
            children: t,
          }),
        }),
      ],
    }),
  });
}
function Z1(e) {
  let t = Math.max(0, Math.floor(e));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, `0`)}`;
}
function Q1(e) {
  return e < 1e6
    ? `${Math.max(1, Math.round(e / 1e3))} KB`
    : `${(e / 1e6).toFixed(1)} MB`;
}
function $1(e) {
  e.preventDefault();
}
