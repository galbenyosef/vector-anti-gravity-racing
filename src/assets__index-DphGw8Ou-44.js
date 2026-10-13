// assets__index-DphGw8Ou 44 — current
// Lines 83260-83572 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
var m2 = class {
    constructor(e) {
      ((this.options = e),
        (this.previous = null),
        (this.nextCheckpoint = 0),
        (this.storageAvailable = !1),
        (this.storage = e.storage));
      let t = null;
      try {
        let n = this.storage?.getItem(i2);
        if (n && n.length <= s2) {
          let r = JSON.parse(n);
          if (r && typeof r == `object` && `version` in r && r.version === 1) {
            let n = r,
              i = p2(n.current);
            i?.bootId === e.bootId
              ? ((t = i), (this.previous = p2(n.previous)))
              : (this.previous = i);
          }
        }
      } catch {}
      let n = e.now();
      ((this.current = t ?? {
        bootId: u2(e.bootId, 80),
        build: `graphics-loss-2`,
        startedAt: n,
        timeOrigin: d2(e.timeOrigin),
        navigation: u2(e.navigation, 32),
        browser: u2(e.browser),
        embedded: e.embedded,
        lastAt: n,
        lifecycle: `active`,
        restart: ``,
        failure: ``,
        errors: 0,
        sample: f2(),
        events: [],
        memoryHistory: [],
      }),
        this.event(t ? `module-resumed` : `startup`, e.navigation));
    }
    attach(e) {
      return (
        (this.source = e),
        (this.current.lifecycle = `active`),
        this.event(`game-attached`),
        () => {
          this.source === e &&
            ((this.current.lifecycle = `disposed`),
            this.event(`game-disposed`),
            (this.source = void 0));
        }
      );
    }
    checkpoint() {
      !this.source || this.options.now() < this.nextCheckpoint || this.save();
    }
    lifecycle(e, t = !1) {
      (!(e === `hidden` && this.current.lifecycle === `pagehide`) &&
        (this.current.lifecycle !== `disposed` || e === `pagehide`) &&
        (this.current.lifecycle =
          e === `hidden` ? `hidden` : e === `pagehide` ? `pagehide` : `active`),
        this.event(e, t ? `bfcache` : ``));
    }
    markRestart(e) {
      ((this.current.restart = u2(e, 64)),
        this.event(`intentional-restart`, e));
    }
    failure(e, t, n = !0) {
      let r = `Unknown error`;
      try {
        r = t instanceof Error ? `${t.name}: ${t.message}` : String(t);
      } catch {}
      let i = u2(`${e}: ${r}`);
      (this.current.errors++,
        n && (this.current.failure = i),
        this.event(n ? `runtime-failure` : `browser-error`, i));
    }
    event(e, t = ``) {
      (this.current.events.push({
        at: this.options.now(),
        kind: u2(e, 32),
        detail: u2(t),
      }),
        (this.current.events = this.current.events.slice(-c2)),
        this.save());
    }
    summary() {
      let e = this.previous,
        t = `none`,
        n = `No previous session is available in this tab.`;
      return (
        e &&
          (e.restart
            ? ((t = `intentional`),
              (n = `The previous session requested a compatibility restart.`))
            : e.failure
              ? ((t = `error`), (n = `Previous game error: ${e.failure}`))
              : e.lifecycle === `pagehide`
                ? ((t = `page-left`),
                  (n = `The previous page reported leaving or reloading. The reason is unknown.`))
                : e.lifecycle === `hidden` || !e.sample.visible
                  ? ((t = `backgrounded`),
                    (n = `The previous page was hidden before this session started.`))
                  : e.lifecycle === `disposed`
                    ? ((t = `disposed`),
                      (n = `The previous game was closed by the page.`))
                    : [`racing`, `countdown`].includes(e.sample.mode) &&
                        this.current.startedAt - e.lastAt >= 0 &&
                        this.current.startedAt - e.lastAt < 9e4
                      ? ((t = `unexpected`),
                        (n = `The previous race ended without a closing event. A browser or host restart is possible; the cause is unknown.`))
                      : ((t = `unknown`),
                        (n = `The previous session has no closing event. Its cause is unknown.`))),
        {
          kind: t,
          message: n,
          storageAvailable: this.storageAvailable,
          previous: e
            ? {
                backend: e.sample.backend,
                quality: e.sample.quality,
                mode: e.sample.mode,
                elapsed: e.sample.elapsed,
                textures: e.sample.textures,
                lastAt: e.lastAt,
              }
            : null,
        }
      );
    }
    report() {
      return JSON.stringify(
        {
          version: 1,
          interpretation: this.summary(),
          current: this.current,
          previous: this.previous,
        },
        null,
        2,
      );
    }
    save() {
      if (this.source)
        try {
          this.current.sample = f2(this.source());
          let e = this.current.memoryHistory,
            t = this.options.now();
          if (!e.length || t - e[e.length - 1].at >= o2) {
            let {
              frames: n,
              gpuBytes: r,
              textureBytes: i,
              textures: a,
              geometries: o,
            } = this.current.sample;
            (e.push({
              at: t,
              frames: n,
              gpuBytes: r,
              textureBytes: i,
              textures: a,
              geometries: o,
            }),
              e.length > l2 && e.shift());
          }
        } catch {}
      if (
        ((this.current.lastAt = this.options.now()),
        (this.nextCheckpoint = this.current.lastAt + o2),
        this.storage)
      )
        try {
          let e = () =>
              JSON.stringify({
                version: 1,
                current: this.current,
                previous: this.previous,
              }),
            t = e();
          for (; new TextEncoder().encode(t).byteLength > s2;) {
            let n = this.previous?.events.length
              ? this.previous.events
              : this.current.events;
            if (n.length) n.shift();
            else {
              let e = this.previous?.memoryHistory.length
                ? this.previous.memoryHistory
                : this.current.memoryHistory;
              if (!e.length) break;
              e.shift();
            }
            t = e();
          }
          (this.storage.setItem(i2, t), (this.storageAvailable = !0));
        } catch {
          ((this.storageAvailable = !1), (this.storage = void 0));
        }
    }
  },
  h2;
function g2() {
  if (h2) return h2;
  let e;
  try {
    e = window.sessionStorage;
  } catch {}
  let t = performance.timeOrigin;
  h2 = new m2({
    storage: e,
    now: () => Date.now(),
    bootId: String(t),
    timeOrigin: t,
    navigation:
      performance.getEntriesByType(`navigation`)[0]?.type ?? `unknown`,
    browser: navigator.userAgent,
    embedded: window.parent !== window,
  });
  let n = h2;
  return (
    document.addEventListener(`visibilitychange`, () =>
      n.lifecycle(document.hidden ? `hidden` : `visible`),
    ),
    window.addEventListener(`pagehide`, (e) =>
      n.lifecycle(`pagehide`, e.persisted),
    ),
    window.addEventListener(`pageshow`, (e) =>
      n.lifecycle(`pageshow`, e.persisted),
    ),
    window.addEventListener(`error`, (e) =>
      n.failure(`window`, e.error ?? e.message, !1),
    ),
    window.addEventListener(`unhandledrejection`, (e) =>
      n.failure(`promise`, e.reason, !1),
    ),
    n
  );
}
function _2({ hud: e, circuit: t = e?.circuit ?? yJ, large: n = !1 }) {
  let r = t.mapPath,
    [, i, a] = /^M\s*([\d.-]+)[ ,]([\d.-]+)/.exec(r) ?? [];
  return (0, N.jsxs)(`svg`, {
    viewBox: `0 0 215 185`,
    className: n ? `track-map large` : `track-map`,
    "aria-label": `${t.name} circuit map`,
    children: [
      (0, N.jsx)(`path`, {
        d: r,
        fill: `none`,
        stroke: `currentColor`,
        strokeWidth: n ? 3 : 4,
        opacity: `.22`,
      }),
      (0, N.jsx)(`path`, {
        d: r,
        fill: `none`,
        stroke: `currentColor`,
        strokeWidth: `1`,
        opacity: `.6`,
      }),
      e?.rivals.map((e, t) =>
        (0, N.jsx)(
          `circle`,
          { cx: e.map.x, cy: e.map.y, r: `2.5`, fill: e.color },
          t,
        ),
      ),
      (0, N.jsx)(`circle`, {
        cx: e?.map.x ?? Number(i ?? HY[0].x),
        cy: e?.map.y ?? Number(a ?? HY[0].y),
        r: `5`,
        fill: `#ff6435`,
        stroke: `#fff`,
        strokeWidth: `1.5`,
      }),
    ],
  });
}
var v2 = () => () => {},
  y2 = `(pointer: coarse)`,
  b2 = (e) => {
    let t = window.matchMedia(y2);
    return (
      t.addEventListener(`change`, e),
      () => t.removeEventListener(`change`, e)
    );
  },
  x2 = () => window.matchMedia(y2).matches;
function S2() {
  if (IZ()) return `16:9`;
  try {
    return DZ(JSON.parse(localStorage.getItem(`vector-settings`) || `{}`))
      .aspect;
  } catch {}
  return uX.aspect;
}
var C2 = cQ(null),
  w2 = { raw: null, value: C2 };
function T2() {
  let e = null;
  try {
    e = localStorage.getItem(LZ);
  } catch {}
  if (e !== w2.raw) {
    let t = C2;
    try {
      t = cQ(JSON.parse(e ?? `null`));
    } catch {}
    w2 = { raw: e, value: t };
  }
  return w2.value;
}
