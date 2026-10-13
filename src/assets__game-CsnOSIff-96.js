// assets__game-CsnOSIff 96 — cssrules
// Lines 39635-39922 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function $C(e, t, n, r) {
  (e.save(), e.scale(t / 1280, n / 720));
  let i = (t, n, r, i, a = `#ffffff`, o = `left`) => {
      ((e.font = `700 ${i}px Arial, sans-serif`),
        (e.textAlign = o),
        (e.fillStyle = a),
        e.fillText(t, n, r));
    },
    a = (t, n, r, i) => {
      ((e.fillStyle = `rgba(5, 12, 22, 0.78)`),
        e.fillRect(t, n, r, i),
        (e.fillStyle = `#ff684d`),
        e.fillRect(t, n, 3, i));
    };
  if (
    (a(28, 26, 296, 58),
    i(`VECTOR`, 43, 52, 22),
    i(O.name.toUpperCase(), 43, 71, 11, `#b9c5d0`),
    r.mode !== `menu`)
  ) {
    let t = r.kind === `timed-lap`;
    (a(994, 26, 258, 92),
      i(
        t
          ? `TIMED LAP`
          : r.kind === `orbs`
            ? `ORBS  ${r.orbsTaken} / ${r.orbs.length}`
            : `POSITION  ${r.position} / ${r.rivals.length + 1}`,
        1236,
        50,
        13,
        `#b9c5d0`,
        `right`,
      ),
      i(
        `LAP  ${r.lap}${t ? `` : ` / ${r.laps}`}`,
        1236,
        78,
        23,
        `#ffffff`,
        `right`,
      ),
      i(
        Tn((t ? r.elapsed - r.lapStart : r.elapsed) || 0.001),
        1236,
        103,
        17,
        `#ffffff`,
        `right`,
      ),
      a(1020, 585, 232, 108),
      i(
        String(Math.round(r.speed * 3.6)).padStart(3, `0`),
        1185,
        641,
        46,
        `#ffffff`,
        `right`,
      ),
      i(`KM/H`, 1236, 640, 12, `#b9c5d0`, `right`),
      i(`HULL  ${Math.max(0, Math.round(r.hull))}%`, 1035, 667, 12, `#b9c5d0`),
      (e.fillStyle = `#263240`),
      e.fillRect(1035, 679, 201, 4),
      (e.fillStyle = r.hull < 25 ? `#ff684d` : `#6ce2dd`),
      e.fillRect(1035, 679, 201 * Math.max(0, Math.min(1, r.hull / 100)), 4),
      r.mode === `countdown`
        ? i(
            String(Math.max(1, Math.ceil(r.countdown))),
            640,
            315,
            90,
            `#ffffff`,
            `center`,
          )
        : (r.boostActive || r.turboTime > 0) &&
          i(`BOOST`, 640, 662, 20, `#6ce2dd`, `center`),
      r.mode === `finished` &&
        i(`RACE COMPLETE`, 640, 106, 27, `#ffffff`, `center`));
  }
  e.restore();
}
function ew(e) {
  let t = [],
    n = 0;
  for (; n < e.length;) {
    let r = e[n];
    if (r === `\\`) n += 2;
    else if (r === `[`) {
      let t = ``;
      for (n++; n < e.length; n++) {
        let r = e[n];
        if (r === `\\`) n++;
        else if (t) r === t && (t = ``);
        else if (r === `"` || r === `'`) t = r;
        else if (r === `]`) break;
      }
      n++;
    } else if (r === `.`) {
      let r = ``;
      for (n++; n < e.length;) {
        let t = e[n];
        if (t === `\\`) {
          let t = /^[0-9a-fA-F]{1,6}\s?/.exec(e.slice(n + 1));
          t
            ? ((r += String.fromCodePoint(parseInt(t[0], 16))),
              (n += 1 + t[0].length))
            : ((r += e[n + 1] ?? ``), (n += 2));
        } else if (/[\w-]/.test(t) || t.charCodeAt(0) > 127) ((r += t), n++);
        else break;
      }
      r && t.push(r);
    } else n++;
  }
  return t;
}
function tw(e) {
  let t = [],
    n = 0,
    r = 0;
  for (let i = 0; i < e.length; i++) {
    let a = e[i];
    a === `\\`
      ? i++
      : a === `(` || a === `[`
        ? n++
        : a === `)` || a === `]`
          ? n--
          : a === `,` && n === 0 && (t.push(e.slice(r, i)), (r = i + 1));
  }
  return (t.push(e.slice(r)), t);
}
function nw(e, t) {
  return /:(?:not|is|where|has|matches|-webkit-any|-moz-any)\(/.test(e)
    ? !0
    : tw(e).some((e) => ew(e).every((e) => t.has(e)));
}
var rw = /^@(?:media|supports|layer|container|scope)\b[^{;]*\{/;
function iw(e, t) {
  let n = ``;
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    if (typeof i.selectorText == `string`)
      nw(i.selectorText, t) &&
        (n +=
          i.cssText +
          `
`);
    else if (i.styleSheet) n += iw(i.styleSheet.cssRules, t);
    else if (i.cssText.startsWith(`@font-face`)) continue;
    else if (i.cssRules && rw.test(i.cssText)) {
      let e = iw(i.cssRules, t);
      e &&
        (n +=
          i.cssText.slice(0, i.cssText.indexOf(`{`)) +
          `{
` +
          e +
          `}
`);
    } else
      n +=
        i.cssText +
        `
`;
  }
  return n;
}
var aw = (e) => (e || `U+0-10FFFF`).replace(/\s+/g, ``).toUpperCase(),
  ow = (e) => e.replace(/["']/g, ``).trim();
function sw(e) {
  return new Promise((t, n) => {
    let r = new FileReader();
    ((r.onload = () => t(typeof r.result == `string` ? r.result : ``)),
      (r.onerror = () => n(r.error)),
      r.readAsDataURL(e));
  });
}
var cw = new Map();
function lw(e, t) {
  let n = cw.get(e);
  return (
    n ||
      ((n = fetch(e)
        .then((e) => (e.ok ? e.blob() : null))
        .then(async (e) => {
          if (!e?.size) return null;
          let n = await sw(e);
          return t ? `data:${t};base64,${n.slice(n.indexOf(`,`) + 1)}` : n;
        })
        .catch(() => null)),
      cw.set(e, n)),
    n
  );
}
async function uw(e) {
  let t = new Set(),
    n = new Set();
  for (let e of document.fonts)
    e.status === `loaded` &&
      (t.add(`${ow(e.family)}|${aw(e.unicodeRange)}`), n.add(ow(e.family)));
  let r = [],
    i = (e) => {
      for (let t of Array.from(e)) {
        let e = t.styleSheet;
        t instanceof CSSFontFaceRule
          ? r.push(t)
          : e
            ? i(e.cssRules)
            : `cssRules` in t && !(t instanceof CSSStyleRule) && i(t.cssRules);
      }
    };
  for (let t of e)
    try {
      i(t.cssRules);
    } catch {}
  let a = new Set(
    r
      .filter((e) =>
        t.has(
          `${ow(e.style.getPropertyValue(`font-family`))}|${aw(e.style.getPropertyValue(`unicode-range`))}`,
        ),
      )
      .map((e) => ow(e.style.getPropertyValue(`font-family`))),
  );
  return (
    await Promise.all(
      r.map(async (e) => {
        let r = e.style,
          i = ow(r.getPropertyValue(`font-family`)),
          o = r.getPropertyValue(`unicode-range`),
          s = r.getPropertyValue(`src`),
          c = /url\(\s*["']?([^"')]+)["']?\s*\)/.exec(s)?.[1],
          l = s;
        if (c) {
          let r = t.has(`${i}|${aw(o)}`),
            s = !a.has(i) && (!o || /U\+0-FF/i.test(o));
          if (!r && !(s && n.has(i))) return ``;
          let u = e.parentStyleSheet?.href ?? document.baseURI,
            d = await lw(new URL(c, u).href, `font/woff2`);
          if (!d) return ``;
          l = `url("${d}") format("woff2")`;
        }
        return `@font-face{font-family:"${i}";${[
          `font-style`,
          `font-weight`,
          `font-stretch`,
          `unicode-range`,
        ]
          .map((e) => [e, r.getPropertyValue(e)])
          .filter(([, e]) => e)
          .map(([e, t]) => `${e}:${t}`)
          .join(`;`)};src:${l}}\n`;
      }),
    )
  ).join(``);
}
var dw = `-100000s`;
function fw(e) {
  let t = new Map();
  if (typeof CSSAnimation > `u`) return t;
  for (let n of e.getAnimations({ subtree: !0 })) {
    let e = n.effect?.target;
    if (!e || !(n instanceof CSSAnimation)) continue;
    let r = t.get(e) ?? [];
    (r.push(n), t.set(e, r));
  }
  return t;
}
function pw(e, t, n) {
  let r = ``,
    i = new Set(n.map((e) => e.effect?.pseudoElement ?? ``));
  for (let a of i) {
    let i = getComputedStyle(e, a || null)
      .animationName.split(`,`)
      .map((e) => {
        let t = e.trim(),
          r = n.find(
            (e) =>
              e.animationName === t && (e.effect?.pseudoElement ?? ``) === a,
          );
        return r
          ? `${Number(r.effect?.getTiming().delay ?? 0) - Number(r.currentTime ?? 0)}ms`
          : dw;
      });
    r += `[data-capture-anim="${t}"]${a}{animation-delay:${i.join(`,`)}!important;animation-play-state:paused!important}\n`;
  }
  return r;
}
