// assets__index-DF2rMRzV 13 — children
// Lines 72670-73005 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function WZ(e) {
  let t = Object.entries(e).map(([e, t]) => ({
      id: e,
      points: UZ(t),
      finishes: t,
    })),
    n = (e, t) => {
      let n = [...e].sort((e, t) => e - t),
        r = [...t].sort((e, t) => e - t);
      for (let e = 0; e < Math.max(n.length, r.length); e++)
        if ((n[e] ?? 99) !== (r[e] ?? 99)) return (n[e] ?? 99) - (r[e] ?? 99);
      return 0;
    };
  return t.sort(
    (e, t) =>
      t.points - e.points ||
      n(e.finishes, t.finishes) ||
      (e.finishes.at(-1) ?? 99) - (t.finishes.at(-1) ?? 99),
  );
}
function GZ(e) {
  let t = vZ.filter(SZ),
    n = t.filter((t) => e.medals[t.id]).length,
    r = t.filter((t) => e.medals[t.id] === `gold`).length;
  return {
    total: t.length,
    medalled: n,
    golds: r,
    complete: n === t.length,
    gold: r === t.length,
  };
}
function KZ(e) {
  return {
    tier: Math.max(1, oZ.filter((t) => wZ(t, e)).length),
    medals: Object.keys(e.medals).length,
  };
}
function qZ({ path: e, label: t, className: n = `` }) {
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
function JZ({ medal: e, earned: t = !0, size: n = 18 }) {
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
var YZ = [
    `Brake with the airbrakes, not the brake: the inside airbrake turns you in and keeps your speed.`,
    `Feather the airbrake through long bends; full airbrake is for hairpins.`,
    `Airbrake before the corner, not in it: set the nose, then power out.`,
    `Both airbrakes together slow you hard in a straight line.`,
    `No use for a weapon? Absorb it to repair your hull.`,
    `A Shield shrugs off mines, rockets, missiles and cannon fire for five seconds: raise it when a missile locks on.`,
    `Speed pads chain. Line them up and the whole lap gets quicker.`,
  ],
  XZ = `vector-loading-tip`,
  ZZ = null,
  QZ = () => {
    if (ZZ === null)
      try {
        ZZ = Number(localStorage.getItem(XZ)) || 0;
      } catch {
        ZZ = 0;
      }
    return ZZ;
  },
  $Z = () => {
    ZZ = QZ() + 1;
    try {
      localStorage.setItem(XZ, String(ZZ));
    } catch {}
  },
  eQ = () => () => {},
  tQ = {
    keyboard: [
      [`Q / E`, `Left / right airbrake`],
      [`SHIFT + A / D`, `Steer and airbrake together`],
    ],
    controller: [
      [`LT / RT`, `Left / right airbrake, analog`],
      [`STICK + TRIGGER`, `Steer and airbrake together`],
    ],
    touch: [
      [`SLIDE UP ON THE PAD`, `Steer and airbrake together`],
      [`SLIDE GAS ONTO USE`, `Fire without lifting off`],
    ],
  },
  nQ = [
    [`CIRCUIT DATA`, 0],
    [`CRAFT & WEAPONS`, 0.05],
    [`SCENERY`, 0.4],
    [`SHADERS`, 0.6],
    [`FINAL CHECKS`, 0.92],
  ];
function rQ(e) {
  if (!e) return [];
  let t = id(e.ship.selected).name.toUpperCase();
  if (e.online.lobbyId)
    return [`ONLINE RACE`, `${e.online.members.length} PILOTS`, t];
  let n = e.launch;
  if (!n) return [];
  let { kind: r, modifiers: i } = n,
    a = vZ.find((e) => e.id === n.career),
    o = a && oZ.find((e) => e.id === a.tier),
    s = oZ.find((t) => t.id === e.difficulty)?.name;
  return [
    a
      ? `${o?.name} · ${lZ[a.kind].name}`
      : r === `timed-lap`
        ? `TIMED LAP`
        : r === `orbs`
          ? `ORBS`
          : `SINGLE RACE`,
    r === `race`
      ? `${i.laps} ${i.laps === 1 ? `LAP` : `LAPS`}`
      : r === `timed-lap`
        ? `UNLIMITED LAPS`
        : ``,
    r === `race` && !a
      ? i.cpuCount
        ? `${i.cpuCount} CPU · ${s ?? ``}`.trim()
        : `NO CPU PILOTS`
      : ``,
    r === `race` ? (i.weapons ? `WEAPONS ON` : `WEAPONS OFF`) : ``,
    i.direction === `reverse` ? `REVERSE` : ``,
    t,
  ]
    .filter(Boolean)
    .map((e) => e.toUpperCase());
}
function iQ({
  target: e,
  stage: t,
  progress: n,
  input: r = `keyboard`,
  chips: i = [],
  launch: a = null,
  onCancel: o,
}) {
  let s = (0, C.useId)(),
    c = (0, C.useId)(),
    l = wJ.find((t) => t.name === e),
    u = / MK [IVX]+$/.exec(e)?.[0] ?? ``,
    d = YZ[(0, C.useSyncExternalStore)(eQ, QZ, () => 0) % YZ.length];
  return (
    (0, C.useEffect)(() => $Z, []),
    (0, N.jsxs)(`section`, {
      className: `circuit-preparation scenery-${l?.scenery ?? `port`}`,
      "data-menu-scope": `loading`,
      "aria-labelledby": s,
      "aria-describedby": c,
      children: [
        l &&
          (0, N.jsx)(`svg`, {
            viewBox: `0 0 215 185`,
            className: `circuit-map-art circuit-preparation-backdrop`,
            "aria-hidden": `true`,
            children: (0, N.jsx)(`path`, {
              d: l.mapPath,
              className: `circuit-map-line`,
            }),
          }),
        (0, N.jsx)(aQ, { launch: a, onCancel: o }),
        (0, N.jsxs)(`div`, {
          className: `circuit-preparation-main`,
          children: [
            (0, N.jsxs)(`span`, {
              className: `circuit-preparation-facts`,
              children: [
                `NOW LOADING`,
                l &&
                  [l.category, l.timeOfDay, l.lengthLabel].map((e) =>
                    (0, N.jsxs)(`span`, { children: [` · `, e] }, e),
                  ),
              ],
            }),
            (0, N.jsx)(`h2`, {
              id: s,
              children: u
                ? (0, N.jsxs)(N.Fragment, {
                    children: [
                      e.slice(0, -u.length),
                      (0, N.jsx)(`small`, { children: u }),
                    ],
                  })
                : e,
            }),
            i.length > 0 &&
              (0, N.jsx)(`span`, {
                className: `circuit-preparation-chips`,
                children: i.map((e, t) =>
                  (0, N.jsx)(
                    `span`,
                    {
                      className:
                        `front-chip` + (t === i.length - 1 ? ` is-craft` : ``),
                      children: e,
                    },
                    e,
                  ),
                ),
              }),
          ],
        }),
        (0, N.jsxs)(`aside`, {
          className: `circuit-preparation-tip`,
          "aria-label": `Airbrakes`,
          children: [
            l &&
              (0, N.jsx)(qZ, {
                path: l.mapPath,
                label: `${l.name} circuit map`,
                className: `circuit-preparation-map`,
              }),
            (0, N.jsxs)(`div`, {
              children: [
                (0, N.jsx)(`span`, { children: `AIRBRAKES` }),
                (0, N.jsxs)(`ul`, {
                  className: `airbrake-techniques`,
                  children: [
                    (0, N.jsxs)(`li`, {
                      children: [
                        (0, N.jsx)(`b`, { children: `TAP` }),
                        ` trim the line`,
                      ],
                    }),
                    (0, N.jsxs)(`li`, {
                      children: [
                        (0, N.jsx)(`b`, { children: `HOLD` }),
                        ` powerslide`,
                      ],
                    }),
                    (0, N.jsxs)(`li`, {
                      children: [
                        (0, N.jsx)(`b`, { children: `×2` }),
                        ` side-shift`,
                      ],
                    }),
                  ],
                }),
                (0, N.jsx)(`dl`, {
                  className: `airbrake-controls`,
                  children: tQ[r].map(([e, t]) =>
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
              ],
            }),
          ],
        }),
        (0, N.jsx)(oQ, {
          target: e,
          stage: t,
          stageId: c,
          progress: n,
          phases: nQ,
          label: `Circuit preparation`,
          tip: d,
        }),
      ],
    })
  );
}
function aQ({ launch: e = null, onCancel: t, cancel: n = `CANCEL` }) {
  return (0, N.jsxs)(`header`, {
    className: `circuit-preparation-top`,
    children: [
      (0, N.jsxs)(`span`, {
        className: `front-brand`,
        "aria-hidden": `true`,
        children: [
          (0, N.jsxs)(`span`, {
            className: `brand-mark`,
            children: [
              (0, N.jsx)(`i`, {}),
              (0, N.jsx)(`i`, {}),
              (0, N.jsx)(`i`, {}),
            ],
          }),
          (0, N.jsxs)(`span`, {
            children: [
              `VECTOR`,
              (0, N.jsx)(`small`, { children: `ANTI-GRAVITY RACING` }),
            ],
          }),
        ],
      }),
      e === `pending` &&
        t &&
        (0, N.jsxs)(`button`, {
          className: `front-ghost circuit-preparation-cancel`,
          tabIndex: -1,
          "data-menu-back": !0,
          onClick: t,
          children: [(0, N.jsx)(Wi, { pad: `B`, keys: `ESC` }), n],
        }),
      e === `cancelled` &&
        (0, N.jsx)(`span`, {
          className: `front-chip circuit-preparation-cancelled`,
          children: `LAUNCH CANCELLED · STAYING IN THE MENU`,
        }),
    ],
  });
}
