// assets__index-DphGw8Ou 32 — resolvescope
// Lines 79807-79837 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function $1({ active: e, hasGame: t }) {
  return (
    (0, C.useEffect)(() => {
      if (!e || t()) return;
      let n = new Q1(),
        r = N1(navigator),
        i = 0,
        a = () => n.resolveScope()?.querySelector(`[data-menu-back]`)?.click(),
        o = () => {
          (n.update(document.hidden ? void 0 : r(), n.resolveScope(), a),
            (i = requestAnimationFrame(o)));
        },
        s = (e) => {
          n.handleKeyboard(e, n.resolveScope(), a);
        },
        c = () => n.pointer();
      return (
        (i = requestAnimationFrame(o)),
        window.addEventListener(`keydown`, s, !0),
        window.addEventListener(`pointerdown`, c),
        () => {
          (cancelAnimationFrame(i),
            window.removeEventListener(`keydown`, s, !0),
            window.removeEventListener(`pointerdown`, c),
            n.dispose());
        }
      );
    }, [e, t]),
    null
  );
}
