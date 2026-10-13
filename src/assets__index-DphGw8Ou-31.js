// assets__index-DphGw8Ou 31 — cursor
// Lines 79392-79806 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
var Z1 = class {
    constructor() {
      ((this.scope = void 0),
        (this.buttons = 0),
        (this.blocked = 0),
        (this.direction = ``),
        (this.blockDirection = !1),
        (this.repeatAt = 0));
    }
    sample(e, t, n) {
      let r = 0;
      for (let t = 0; t < 16; t++) J1(e, t) && (r |= 1 << t);
      let i = e ? (e.id ?? `controller`) : void 0,
        a = e ? (e.index ?? 0) : void 0,
        o = Number(!!(r & 32768)) - Number(!!(r & 16384)),
        s = Number(!!(r & 8192)) - Number(!!(r & 4096)),
        c = e?.axes[0] ?? 0,
        l = e?.axes[1] ?? 0,
        u = s ? (s > 0 ? `down` : `up`) : o ? (o > 0 ? `right` : `left`) : ``,
        d = this.scope !== t || this.identity !== i || this.index !== a;
      (d &&
        ((this.scope = t),
        (this.identity = i),
        (this.index = a),
        (this.blocked = r),
        (this.blockDirection = !!u),
        (this.direction = ``)),
        (this.blocked &= r),
        u || (this.blockDirection = !1));
      let f = (e) =>
          !d &&
          !!(r & (1 << e)) &&
          !(this.buttons & (1 << e)) &&
          !(this.blocked & (1 << e)),
        p =
          !!u &&
          !d &&
          !this.blockDirection &&
          (u !== this.direction || n >= this.repeatAt);
      p && (this.repeatAt = n + (u === this.direction ? 140 : 330));
      let m = {
        changed: d,
        x: s ? 0 : o,
        y: s,
        move: p,
        confirm: f(0),
        confirmHeld: !!(r & 1) && !(this.blocked & 1) && !d,
        back: f(1),
        start: f(9),
        camera: f(3),
        capture: f(8),
        previous: f(4),
        next: f(5),
        stickX: c,
        stickY: l,
        activity:
          !!r ||
          !!u ||
          Math.hypot(c, l) > 0.25 ||
          Math.abs(e?.axes[2] ?? 0) > 0.25 ||
          Math.abs(e?.axes[3] ?? 0) > 0.25,
      };
      return ((this.direction = u), (this.buttons = r), m);
    }
  },
  Q1 = class {
    constructor() {
      ((this.scope = null),
        (this.pad = new Z1()),
        (this.memory = new WeakMap()),
        (this.marked = null),
        (this.controllerMode = !1),
        (this.keyboard = new H1()),
        (this.observer = null),
        (this.scopeDirty = !0),
        (this.resolvedScope = null),
        (this.lastUpdate = 0),
        (this.cursor = new W1(() => {
          let e = document
            .querySelector(`.game-stage`)
            ?.getBoundingClientRect();
          return e?.width
            ? e
            : { left: 0, top: 0, right: innerWidth, bottom: innerHeight };
        })),
        (this.hovered = null),
        (this.holding = null),
        (this.holdStart = 0),
        (this.pointing = !1));
    }
    resolveScope() {
      return (
        this.observer ||
          ((this.observer = new MutationObserver((e) => {
            if (!this.scopeDirty)
              for (let t of e) {
                if (t.type === `attributes`) {
                  let e = t.target;
                  (e === this.resolvedScope || e.matches(K1)) &&
                    (this.scopeDirty = !0);
                } else
                  for (let e of [t.addedNodes, t.removedNodes])
                    for (let t of e)
                      t instanceof Element &&
                        (t.matches(K1) || t.querySelector(K1)) &&
                        (this.scopeDirty = !0);
                if (this.scopeDirty) break;
              }
          })),
          this.observer.observe(document.body, {
            subtree: !0,
            childList: !0,
            attributes: !0,
            attributeFilter: [
              `data-menu-scope`,
              `role`,
              `hidden`,
              `inert`,
              `aria-hidden`,
              `data-state`,
              `style`,
            ],
          })),
        (this.scopeDirty ||
          (this.resolvedScope && !this.resolvedScope.isConnected)) &&
          ((this.resolvedScope = X1()), (this.scopeDirty = !1)),
        this.resolvedScope
      );
    }
    controls(e) {
      return [...e.querySelectorAll(G1)].filter(
        (e) =>
          e.tabIndex >= 0 &&
          Y1(e) &&
          !e.matches(`:disabled,[aria-disabled="true"]`),
      );
    }
    initial(e, t = this.controls(e)) {
      let n = this.memory.get(e);
      return n && t.includes(n)
        ? n
        : (t.find((e) => e.hasAttribute(`data-menu-initial`)) ??
            t.find((e) => e.id === `start-btn`) ??
            t[0]);
    }
    focus(e, t = !0) {
      (this.marked?.removeAttribute(`data-menu-focus`),
        (this.marked = e ?? null),
        e &&
          (e.focus({ preventScroll: !0 }),
          t && e.scrollIntoView({ block: `nearest`, inline: `nearest` }),
          this.controllerMode && (e.dataset.menuFocus = ``),
          this.scope && this.memory.set(this.scope, e)));
    }
    pointer() {
      ((this.controllerMode = !1),
        this.marked?.removeAttribute(`data-menu-focus`),
        (this.marked = null),
        (this.hovered = null),
        (this.pointing = !1),
        this.cursor.show(!1));
    }
    endHold() {
      this.holding &&
        (this.holding.style.removeProperty(`--menu-hold`),
        this.holding.removeAttribute(`data-holding`),
        (this.holding = null),
        this.cursor.hold(0));
    }
    follow() {
      let e = document.activeElement;
      ((this.hovered = e && this.scope?.contains(e) ? e : null),
        (this.pointing = !1),
        this.hovered && this.cursor.place(this.hovered));
    }
    controlAt(e, t, n) {
      let r = document.elementFromPoint(t, n)?.closest(G1);
      return r &&
        e.contains(r) &&
        r.tabIndex >= 0 &&
        !r.matches(`:disabled,[aria-disabled="true"]`)
        ? r
        : null;
    }
    update(e, t, n) {
      this.keyboard.validate();
      let r = performance.now(),
        i = Math.min(0.05, Math.max(0, (r - this.lastUpdate) / 1e3));
      this.lastUpdate = r;
      let a = this.pad.sample(e, t, r);
      if (this.scope !== t) {
        let e = document.activeElement;
        if (
          (this.scope &&
            e &&
            this.scope.contains(e) &&
            this.memory.set(this.scope, e),
          (this.scope = t),
          t && this.controllerMode)
        ) {
          let n = this.controls(t);
          (this.focus(e && n.includes(e) ? e : this.initial(t, n)),
            this.follow());
        } else this.focus(void 0);
      }
      if (!e || !t) return (this.endHold(), this.cursor.show(!1), a);
      if (a.activity && !this.controllerMode) {
        this.controllerMode = !0;
        let e = this.controls(t),
          n = document.activeElement;
        (this.focus(e.includes(n) ? n : this.initial(t, e)), this.follow());
      }
      if (
        (this.cursor.show(this.controllerMode),
        this.controllerMode &&
          this.cursor.move(i, a.stickX, a.stickY, this.hovered))
      ) {
        this.pointing = !0;
        let e = this.controlAt(t, this.cursor.x, this.cursor.y);
        e !== this.hovered &&
          ((this.hovered = e),
          this.cursor.hover(!!e),
          e
            ? this.focus(e, !1)
            : (this.marked?.removeAttribute(`data-menu-focus`),
              (this.marked = null)));
      }
      let o = document.activeElement;
      if (
        (this.controllerMode &&
          !this.pointing &&
          (!o ||
            !t.contains(o) ||
            o.matches(`:disabled,[aria-disabled="true"]`)) &&
          (this.focus(this.initial(t)), this.follow()),
        a.move && (this.move(t, a.x, a.y), this.follow()),
        a.previous || a.next)
      ) {
        let e = this.controls(t),
          n = e.indexOf(document.activeElement);
        (this.focus(e[(n + (a.next ? 1 : -1) + e.length) % e.length]),
          this.follow());
      }
      a.confirm &&
        (this.pointing
          ? this.hovered?.isConnected && this.activate(t, this.hovered)
          : this.activate(t));
      let s =
        (this.pointing ? this.hovered : document.activeElement)?.closest(
          `[data-menu-hold]`,
        ) ?? null;
      if (
        (a.confirm &&
          s &&
          (this.endHold(), (this.holding = s), (this.holdStart = r)),
        this.holding)
      )
        if (!a.confirmHeld || s !== this.holding || !this.holding.isConnected)
          this.endHold();
        else {
          let e = Math.min(1, (r - this.holdStart) / 650);
          if (
            (this.holding.style.setProperty(`--menu-hold`, String(e)),
            this.holding.setAttribute(`data-holding`, ``),
            this.cursor.hold(e),
            e >= 1)
          ) {
            let e = this.holding;
            (this.endHold(),
              e.dispatchEvent(new CustomEvent(`menuhold`, { bubbles: !0 })));
          }
        }
      a.back && n();
      let c = e.axes[3] ?? 0;
      if (Math.abs(c) > 0.25) {
        let e = document.activeElement;
        for (; e && t.contains(e);) {
          let t = getComputedStyle(e).overflowY;
          if (e.scrollHeight > e.clientHeight + 1 && /auto|scroll/.test(t)) {
            e.scrollTop += c * 620 * i;
            break;
          }
          e = e.parentElement;
        }
      }
      return a;
    }
    adjust(e, t) {
      if (e instanceof HTMLSelectElement) {
        let n = [...e.options].filter(
            (e) => !e.disabled && !e.closest(`optgroup:disabled`),
          ),
          r = n.findIndex((t) => t.value === e.value),
          i = n[Math.max(0, Math.min(n.length - 1, r + t))];
        return (
          i &&
            i.value !== e.value &&
            (Object.getOwnPropertyDescriptor(
              HTMLSelectElement.prototype,
              `value`,
            )?.set?.call(e, i.value),
            e.dispatchEvent(new Event(`input`, { bubbles: !0 })),
            e.dispatchEvent(new Event(`change`, { bubbles: !0 }))),
          !0
        );
      }
      if (e instanceof HTMLInputElement && e.type === `range`) {
        let n = e.value;
        if ((t > 0 ? e.stepUp() : e.stepDown(), e.value !== n)) {
          let t = e.value;
          (Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            `value`,
          )?.set?.call(e, n),
            Object.getOwnPropertyDescriptor(
              HTMLInputElement.prototype,
              `value`,
            )?.set?.call(e, t),
            e.dispatchEvent(new Event(`input`, { bubbles: !0 })),
            e.dispatchEvent(new Event(`change`, { bubbles: !0 })));
        }
        return !0;
      }
      if (e.matches(`[role="slider"],[data-menu-adjust]`)) {
        for (let n of [`keydown`, `keyup`]) {
          let r = new KeyboardEvent(n, {
            key: t > 0 ? `ArrowRight` : `ArrowLeft`,
            bubbles: !0,
          });
          (q1.add(r), e.dispatchEvent(r));
        }
        return !0;
      }
      return !1;
    }
    move(e, t, n) {
      let r = this.controls(e),
        i = document.activeElement;
      if (!i || !r.includes(i)) {
        this.focus(this.initial(e, r));
        return;
      }
      if (t && this.adjust(i, t)) return;
      let a = i.getBoundingClientRect(),
        o,
        s = 1 / 0;
      for (let e of r) {
        if (e === i) continue;
        let r = e.getBoundingClientRect(),
          c = r.x + r.width / 2 - (a.x + a.width / 2),
          l = r.y + r.height / 2 - (a.y + a.height / 2),
          u = n ? l * n : c * t;
        if (u <= 3) continue;
        let d = u + Math.abs(n ? c : l) * 2.5;
        d < s && ((s = d), (o = e));
      }
      (!o && n && (o = r[(r.indexOf(i) + n + r.length) % r.length]),
        this.focus(o ?? i));
    }
    activate(e, t) {
      let n = this.controls(e),
        r = t ?? document.activeElement,
        i = n.includes(r) ? r : this.initial(e, n);
      if ((this.focus(i), i)) {
        if (i instanceof HTMLSelectElement) {
          this.adjust(i, 1);
          return;
        }
        i instanceof HTMLTextAreaElement ||
        (i instanceof HTMLInputElement &&
          [`text`, `search`, `url`, `email`, `tel`, `password`].includes(
            i.type,
          ))
          ? i.readOnly
            ? i.select()
            : this.keyboard.open(i, e)
          : i.matches(`[role="slider"],input[type="range"]`) || i.click();
      }
    }
    handleKeyboard(e, t, n) {
      if (q1.has(e)) return !0;
      if (!t) return !1;
      if (e.defaultPrevented) return !0;
      if ((this.pointer(), e.key === `Escape`))
        return (
          t.getAttribute(`data-menu-scope`) !== `grid` &&
            (e.preventDefault(), e.stopPropagation(), n()),
          !0
        );
      if (this.keyboard.handleKey(e)) return !0;
      let r = e.target;
      return (
        r?.matches(
          `input:not([type="range"]),textarea,[contenteditable="true"]`,
        ) ||
          ([`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`].includes(e.key)
            ? (e.preventDefault(),
              this.move(
                t,
                e.key === `ArrowLeft` ? -1 : +(e.key === `ArrowRight`),
                e.key === `ArrowUp` ? -1 : +(e.key === `ArrowDown`),
              ))
            : (e.key === `Enter` || e.key === ` `) &&
              !r?.closest(`button,a,summary,select,[role="slider"]`) &&
              (e.preventDefault(), e.repeat || this.activate(t))),
        !0
      );
    }
    dispose() {
      (this.observer?.disconnect(),
        this.pointer(),
        this.cursor.dispose(),
        this.keyboard.close(!1));
    }
  };
