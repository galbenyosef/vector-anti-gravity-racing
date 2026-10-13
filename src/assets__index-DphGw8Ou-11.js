// assets__index-DphGw8Ou 11 — children
// Lines 72014-72313 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function YX({ path: e, label: t, className: n = `` }) {
  let [, r, i] = /^M\s*([\d.-]+)[ ,]([\d.-]+)/.exec(e) ?? [];
  return (0, N.jsxs)(`svg`, {
    viewBox: `0 0 215 185`,
    className: `circuit-map-art ${n}`,
    children: [
      (0, N.jsx)(`title`, { children: t }),
      (0, N.jsx)(`path`, { d: e, className: `circuit-map-glow` }),
      (0, N.jsx)(`path`, { d: e, className: `circuit-map-line` }),
      r &&
        (0, N.jsx)(`circle`, {
          cx: r,
          cy: i,
          r: `5`,
          className: `circuit-map-start`,
        }),
    ],
  });
}
function XX({ medal: e, earned: t = !0, size: n = 18 }) {
  return (0, N.jsx)(`svg`, {
    className: `medal-pip medal-${e}${t ? ` is-earned` : ``}`,
    viewBox: `0 0 20 22`,
    width: n,
    height: n * 1.1,
    "aria-hidden": `true`,
    children: (0, N.jsx)(`polygon`, {
      points: `10,1 19,6 19,16 10,21 1,16 1,6`,
    }),
  });
}
function ZX({ filled: e = [] }) {
  let t = [];
  for (let e = 0; e < 4; e++) for (let n = 0; n < 7; n++) t.push([e, n]);
  return (0, N.jsx)(`svg`, {
    className: `hex-field`,
    viewBox: `0 0 330 170`,
    "aria-hidden": `true`,
    children: t.map(([t, n], r) => {
      let i = n * 44 + (t % 2 ? 22 : 0) + 22,
        a = t * 38 + 24;
      return (0, N.jsx)(
        `polygon`,
        {
          className: e.includes(r) ? `is-lit` : ``,
          points: [0, 1, 2, 3, 4, 5]
            .map((e) => {
              let t = (Math.PI / 3) * e - Math.PI / 2;
              return `${i + Math.cos(t) * 21},${a + Math.sin(t) * 21}`;
            })
            .join(` `),
        },
        r,
      );
    }),
  });
}
var QX = [
    `Brake with the airbrakes, not the brake: the inside airbrake turns you in and keeps your speed.`,
    `Feather the airbrake through long bends; full airbrake is for hairpins.`,
    `Airbrake before the corner, not in it: set the nose, then power out.`,
    `Both airbrakes together slow you hard in a straight line.`,
    `No use for a weapon? Absorb it to repair your hull.`,
    `A Shield shrugs off mines, rockets, missiles and cannon fire for five seconds: raise it when a missile locks on.`,
    `Speed pads chain. Line them up and the whole lap gets quicker.`,
  ],
  $X = `vector-loading-tip`,
  eZ = null,
  tZ = () => {
    if (eZ === null)
      try {
        eZ = Number(localStorage.getItem($X)) || 0;
      } catch {
        eZ = 0;
      }
    return eZ;
  },
  nZ = () => {
    eZ = tZ() + 1;
    try {
      localStorage.setItem($X, String(eZ));
    } catch {}
  },
  rZ = () => () => {},
  iZ = {
    keyboard: [
      [`Q / E`, `Left / right airbrake`],
      [`HOLD SHIFT + A / D`, `Steer and airbrake together`],
    ],
    controller: [
      [`L2 / R2`, `Left / right airbrake, analog`],
      [`STICK + TRIGGER`, `Steer and airbrake together`],
    ],
    touch: [
      [`SLIDE UP ON THE PAD`, `Steer and airbrake together`],
      [`SLIDE GAS ONTO USE`, `Fire without lifting off`],
    ],
  };
function aZ({ target: e, stage: t, progress: n, input: r = `keyboard` }) {
  let i = (0, C.useId)(),
    a = (0, C.useId)(),
    o = n !== null && Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : null,
    s = o === null ? null : Math.floor(o * 100),
    c = vJ.find((t) => t.name === e),
    l = / MK [IVX]+$/.exec(e)?.[0] ?? ``,
    u = QX[(0, C.useSyncExternalStore)(rZ, tZ, () => 0) % QX.length];
  return (
    (0, C.useEffect)(() => nZ, []),
    (0, N.jsxs)(`section`, {
      className: `circuit-preparation scenery-${c?.scenery ?? `port`}`,
      "aria-labelledby": i,
      "aria-describedby": a,
      children: [
        c &&
          (0, N.jsx)(YX, {
            path: c.mapPath,
            label: `${c.name} circuit map`,
            className: `circuit-preparation-map`,
          }),
        (0, N.jsxs)(`div`, {
          className: `circuit-preparation-main`,
          children: [
            (0, N.jsxs)(`div`, {
              className: `circuit-preparation-heading`,
              children: [
                (0, N.jsx)(`span`, {
                  className: `circuit-preparation-spinner`,
                  "aria-hidden": `true`,
                }),
                (0, N.jsx)(`span`, { children: `PREPARING CIRCUIT` }),
              ],
            }),
            c &&
              (0, N.jsxs)(`span`, {
                className: `circuit-preparation-facts`,
                children: [
                  (0, N.jsx)(`b`, { children: c.category }),
                  (0, N.jsx)(`span`, { children: c.timeOfDay }),
                  (0, N.jsx)(`span`, { children: c.lengthLabel }),
                  (0, N.jsx)(`span`, { children: c.character }),
                ],
              }),
            (0, N.jsx)(`h2`, {
              id: i,
              children: l
                ? (0, N.jsxs)(N.Fragment, {
                    children: [
                      e.slice(0, -l.length),
                      (0, N.jsx)(`small`, { children: l }),
                    ],
                  })
                : e,
            }),
            c &&
              (0, N.jsx)(`p`, {
                className: `circuit-preparation-description`,
                children: c.description,
              }),
          ],
        }),
        (0, N.jsxs)(`aside`, {
          className: `circuit-preparation-tip`,
          "aria-label": `Airbrakes`,
          children: [
            (0, N.jsx)(`span`, {
              children: `AIRBRAKES · THE KEY TO EVERY CORNER`,
            }),
            (0, N.jsxs)(`ul`, {
              className: `airbrake-techniques`,
              children: [
                (0, N.jsxs)(`li`, {
                  children: [
                    (0, N.jsx)(`b`, { children: `TAP` }),
                    ` to turn the nose in`,
                  ],
                }),
                (0, N.jsxs)(`li`, {
                  children: [
                    (0, N.jsx)(`b`, { children: `HOLD` }),
                    ` to powerslide a hairpin`,
                  ],
                }),
                (0, N.jsxs)(`li`, {
                  children: [
                    (0, N.jsx)(`b`, { children: `DOUBLE-TAP` }),
                    ` to side-shift`,
                  ],
                }),
              ],
            }),
            (0, N.jsx)(`dl`, {
              className: `airbrake-controls`,
              children: iZ[r].map(([e, t]) =>
                (0, N.jsxs)(
                  `div`,
                  {
                    children: [
                      (0, N.jsx)(`dt`, { children: e }),
                      (0, N.jsx)(`dd`, { children: t }),
                    ],
                  },
                  e,
                ),
              ),
            }),
            (0, N.jsx)(`p`, { children: u }),
          ],
        }),
        (0, N.jsxs)(`div`, {
          className: `circuit-preparation-bar`,
          children: [
            (0, N.jsxs)(`output`, {
              className: `circuit-preparation-status`,
              "aria-live": `polite`,
              "aria-atomic": `true`,
              children: [
                (0, N.jsxs)(`span`, {
                  className: `sr-only`,
                  children: [e, `: `],
                }),
                (0, N.jsx)(`span`, {
                  id: a,
                  className: `circuit-preparation-stage`,
                  children: t,
                }),
              ],
            }),
            (0, N.jsx)(`span`, {
              className: `circuit-preparation-percent`,
              "aria-hidden": `true`,
              children: s === null ? `PLEASE WAIT` : `${s}%`,
            }),
            (0, N.jsxs)(`div`, {
              className: `circuit-preparation-progress${o === null ? ` is-indeterminate` : ``}`,
              children: [
                (0, N.jsx)(`progress`, {
                  max: 100,
                  value: o === null ? void 0 : o * 100,
                  "aria-label": `Circuit preparation`,
                  "aria-valuenow": s ?? void 0,
                  "aria-valuetext": s === null ? t : `${s}% complete`,
                }),
                o === null && (0, N.jsx)(`span`, { "aria-hidden": `true` }),
              ],
            }),
            (0, N.jsx)(`p`, {
              className: `circuit-preparation-note`,
              children: `Getting the track and race effects ready.`,
            }),
          ],
        }),
      ],
    })
  );
}
var oZ = `vector-ship-skins-v1`;
function sZ(e) {
  let t = Xu.find((t) => t.id === e),
    n = {
      id: `original`,
      name: `Original`,
      edition: `FACTORY LIVERY`,
      description: t.description,
      colors: [t.color, `#e8efe9`, `#172c36`],
      preview: `models/previews/${e}.jpg`,
    };
  return e === `kestrel`
    ? [
        n,
        {
          id: `wavedash`,
          name: `Wavedash`,
          edition: `WAVEDASH RACING`,
          description: `Pearl armour. Graphite nacelles. Cyan speed marks. Made for the dash.`,
          colors: [`#55ead8`, `#e7f5ef`, `#15303d`],
          preview: `models/previews/kestrel-wavedash.jpg`,
        },
      ]
    : e === `manta`
      ? [
          n,
          {
            id: `claude`,
            name: `Claude`,
            edition: `CLAUDE / ANTHROPIC`,
            description: `Warm ivory. Terracotta wings. Claude starbursts and Anthropic wordmarks.`,
            colors: [`#d97757`, `#faf9f5`, `#141413`],
            preview: `models/previews/manta-claude.jpg`,
          },
        ]
      : [n];
}
function cZ(e, t) {
  let n = sZ(e);
  return n.find((e) => e.id === t) ?? n[0];
}
function lZ(e) {
  let t = e && typeof e == `object` && !Array.isArray(e) ? e : {};
  return Object.fromEntries(Xu.map((e) => [e.id, cZ(e.id, t[e.id]).id]));
}
