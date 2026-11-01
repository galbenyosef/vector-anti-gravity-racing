// assets__index-DF2rMRzV 33 — element
// Lines 80113-80441 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
var p0 = class {
    constructor() {
      ((this.element = null),
        (this.target = null),
        (this.draft = ``),
        (this.uppercase = !1),
        (this.display = null),
        (this.keys = []));
    }
    open(e, t) {
      (this.close(!1),
        (this.target = e),
        (this.draft = e.value),
        (this.uppercase = !1));
      let n = document.createElement(`section`);
      ((n.className = `controller-keyboard`),
        n.setAttribute(`role`, `dialog`),
        n.setAttribute(`aria-modal`, `true`),
        n.setAttribute(`aria-label`, `Controller keyboard`),
        (n.dataset.menuScope = `keyboard`));
      let r = document.createElement(`div`);
      r.className = `controller-keyboard-card`;
      let i = document.createElement(`h2`);
      i.textContent =
        e.getAttribute(`aria-label`) ||
        e.labels?.[0]?.textContent?.trim() ||
        `ENTER TEXT`;
      let a = document.createElement(`p`);
      ((a.textContent = `A / CROSS · TYPE    B / CIRCLE · CANCEL`),
        (a.className = `controller-keyboard-hint`),
        (this.display = document.createElement(`output`)),
        (this.display.className = `controller-keyboard-value`),
        this.display.setAttribute(`aria-live`, `polite`));
      let o = document.createElement(`div`);
      ((o.className = `controller-keyboard-grid`), (this.keys = []));
      for (let e of `1234567890qwertyuiopasdfghjkl-zxcvbnm_./:@?=`) {
        let t = this.button(e, () =>
          this.append(this.uppercase ? e.toUpperCase() : e),
        );
        ((t.dataset.character = e), o.appendChild(t), this.keys.push(t));
      }
      this.keys[0].dataset.menuInitial = ``;
      let s = document.createElement(`div`);
      s.className = `controller-keyboard-actions`;
      let c = this.button(`SHIFT`, () => {
        ((this.uppercase = !this.uppercase),
          c.setAttribute(`aria-pressed`, String(this.uppercase)));
        for (let e of this.keys)
          e.textContent = this.uppercase
            ? e.dataset.character.toUpperCase()
            : e.dataset.character;
      });
      c.setAttribute(`aria-pressed`, `false`);
      let l = this.button(`CANCEL`, () => this.close(!1));
      l.dataset.menuBack = ``;
      let u = this.button(`DONE`, () => this.close(!0));
      u.className = `controller-keyboard-done`;
      for (let e of [
        c,
        this.button(`SPACE`, () => this.append(` `)),
        this.button(`DELETE`, () => this.erase()),
        l,
        u,
      ])
        s.appendChild(e);
      for (let e of [i, a, this.display, o, s]) r.appendChild(e);
      (n.appendChild(r), t.appendChild(n), (this.element = n), this.refresh());
    }
    button(e, t) {
      let n = document.createElement(`button`);
      return (
        (n.type = `button`),
        (n.textContent = e),
        n.addEventListener(`click`, t),
        n
      );
    }
    refresh() {
      this.display && (this.display.textContent = this.draft || ` `);
    }
    append(e) {
      let t = this.target?.maxLength ?? -1;
      ((t < 0 || this.draft.length + e.length <= t) && (this.draft += e),
        this.refresh());
    }
    erase() {
      ((this.draft = Array.from(this.draft).slice(0, -1).join(``)),
        this.refresh());
    }
    handleKey(e) {
      if (!this.element) return !1;
      if (e.key === `Backspace`) this.erase();
      else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey)
        this.append(e.key);
      else return !1;
      return (e.preventDefault(), !0);
    }
    validate() {
      this.element &&
        (!this.target?.isConnected || !this.element.isConnected) &&
        this.close(!1);
    }
    close(e) {
      let t = this.target;
      if (e && t?.isConnected) {
        let e =
          t.tagName === `TEXTAREA`
            ? HTMLTextAreaElement.prototype
            : HTMLInputElement.prototype;
        (Object.getOwnPropertyDescriptor(e, `value`)?.set?.call(t, this.draft),
          t.dispatchEvent(new Event(`input`, { bubbles: !0 })),
          t.dispatchEvent(new Event(`change`, { bubbles: !0 })));
      }
      (this.element?.remove(),
        (this.element = this.display = null),
        (this.keys = []),
        (this.target = null),
        t?.isConnected && t.focus({ preventScroll: !0 }));
    }
  },
  m0 = {
    deadzone: 0.12,
    speed: 2.1,
    curve: 1.45,
    friction: 0.7,
    settle: 7,
    smoothing: 0.05,
  },
  h0 = class {
    constructor(e) {
      ((this.bounds = e),
        (this.x = 0),
        (this.y = 0),
        (this.vx = 0),
        (this.vy = 0),
        (this.element = null),
        (this.visible = !1),
        (this.hovering = !1));
    }
    draw() {
      if (!this.element) {
        let e = document.createElement(`div`);
        ((e.className = `menu-cursor`),
          e.setAttribute(`aria-hidden`, `true`),
          (e.innerHTML = `<i></i><b></b><s></s>`),
          document.body.appendChild(e),
          (this.element = e));
      }
      ((this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`),
        this.element.classList.toggle(`is-visible`, this.visible),
        this.element.classList.toggle(`is-hovering`, this.hovering));
    }
    show(e) {
      e !== this.visible &&
        ((this.visible = e),
        e || (this.vx = this.vy = 0),
        (e || this.element) && this.draw());
    }
    place(e) {
      if (!e) return;
      let t = e.getBoundingClientRect();
      ((this.x = t.left + t.width / 2),
        (this.y = t.top + t.height / 2),
        (this.vx = this.vy = 0),
        (this.hovering = !0),
        this.draw());
    }
    move(e, t, n, r) {
      let i = Math.min(1, Math.hypot(t, n)),
        a =
          i > m0.deadzone
            ? ((i - m0.deadzone) / (1 - m0.deadzone)) ** m0.curve
            : 0,
        o = this.bounds(),
        s = m0.speed * (o.bottom - o.top) * a * (r ? m0.friction : 1),
        c = i ? (t / i) * s : 0,
        l = i ? (n / i) * s : 0,
        u = 1 - Math.exp(-e / m0.smoothing);
      ((this.vx += (c - this.vx) * u), (this.vy += (l - this.vy) * u));
      let d = [this.x, this.y];
      if (((this.x += this.vx * e), (this.y += this.vy * e), r && a === 0)) {
        let t = r.getBoundingClientRect(),
          n = 1 - Math.exp(-m0.settle * e);
        ((this.x += (t.left + t.width / 2 - this.x) * n),
          (this.y += (t.top + t.height / 2 - this.y) * n));
      }
      return (
        (this.x = Math.min(o.right - 2, Math.max(o.left + 2, this.x))),
        (this.y = Math.min(o.bottom - 2, Math.max(o.top + 2, this.y))),
        (Math.abs(this.x - d[0]) > 0.05 || Math.abs(this.y - d[1]) > 0.05) &&
          this.draw(),
        a > 0
      );
    }
    hold(e) {
      (this.element || this.draw(),
        this.element.style.setProperty(`--hold`, String(e)),
        this.element.classList.toggle(`is-holding`, e > 0));
    }
    hover(e) {
      e !== this.hovering && ((this.hovering = e), this.draw());
    }
    dispose() {
      (this.element?.remove(), (this.element = null));
    }
  },
  g0 = `button:not(:disabled),a[href],summary,[role="slider"],[role="switch"],[data-menu-adjust],input:not([type="hidden"]):not(:disabled),select:not(:disabled),textarea:not(:disabled)`,
  _0 = `[data-menu-scope],[role="dialog"],[role="alertdialog"]`,
  v0 = new WeakSet(),
  y0 = (e, t) =>
    !!e?.buttons[t] && (e.buttons[t].pressed || e.buttons[t].value > 0.5);
function b0(e) {
  if (
    !e.getClientRects().length ||
    e.closest(`[hidden],[inert],[aria-hidden="true"]`)
  )
    return !1;
  let t = getComputedStyle(e);
  return t.visibility !== `hidden` && t.display !== `none`;
}
function x0(e = document) {
  let t = [...e.querySelectorAll(_0)].filter(b0),
    n =
      t.filter((e) => e.matches(`[role="alertdialog"]`)).at(-1) ??
      t.filter((e) => e.matches(`[role="dialog"]`)).at(-1);
  return (n ? t.filter((e) => n.contains(e)) : t).at(-1) ?? null;
}
var S0 = class {
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
    for (let t = 0; t < 16; t++) y0(e, t) && (r |= 1 << t);
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
      padX: f(2),
      padY: f(3),
      previous: f(4),
      next: f(5),
      sectionPrevious: f(6),
      sectionNext: f(7),
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
};
function C0(e, t) {
  let n = (e) => [...e.querySelectorAll(t)].filter(b0).at(-1),
    r =
      e.closest(`[role="dialog"],[role="alertdialog"]`) ??
      e.closest(`[data-menu-scope="grid"]`);
  return n(e) ?? (r && r !== e ? n(r) : void 0);
}
function w0(e, t, n) {
  let r = C0(e, t);
  if (!r) return !1;
  let i = r.querySelector(`[data-menu-step="${n}"]`);
  if (i) return (i.matches(`:disabled`) || i.click(), !0);
  let a = [...r.querySelectorAll(`button`)].filter(b0),
    o = a.findIndex((e) =>
      e.matches(
        `[aria-current="page"],[aria-pressed="true"],[aria-selected="true"]`,
      ),
    );
  for (let e = 1; e < a.length; e++) {
    let t = a[(((o + n * e) % a.length) + a.length) % a.length];
    if (!t.matches(`:disabled,[aria-disabled="true"]`)) {
      t.click();
      break;
    }
  }
  return !0;
}
function T0(e, t) {
  let n = C0(e, `[data-pad~="${t}"]`);
  return !n || n.matches(`:disabled,[aria-disabled="true"]`)
    ? !1
    : (n.click(), !0);
}
