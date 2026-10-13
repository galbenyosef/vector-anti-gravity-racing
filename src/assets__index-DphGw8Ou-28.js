// assets__index-DphGw8Ou 28 — children
// Lines 78609-79010 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function k1({
  hud: e,
  getGame: t,
  open: n,
  onOpenChange: r,
  showButtons: i = !0,
}) {
  let [a, o] = (0, C.useState)(``),
    s = e?.capture,
    c = s?.status === `recording`,
    l = s?.status === `finishing`,
    u = c || l,
    d = s?.options ?? { quality: `smooth`, fps: 30, hud: !0, audio: !0 },
    f = [s?.latestScreenshot, s?.latestVideo].filter((e) => !!e),
    p = (s?.error ?? s?.notice ?? ``) + f.map((e) => e.url).join(`|`),
    m = !n && p !== a && (!!s?.error || !!s?.notice || f.length > 0),
    h = s?.format === `mp4` ? `MP4` : `WebM`,
    g = c
      ? `Stop video recording (F9)`
      : l
        ? `Preparing video download`
        : `Record video (F9)`,
    _ = !e?.ready || !s?.screenshotSupported,
    v = l || (!c && (!e?.ready || !s?.supported)),
    y = () => t()?.takeScreenshot(),
    b = () => {
      (t()?.toggleRecording(), c || r(!1));
    };
  return (0, N.jsxs)(`div`, {
    className: `capture-controls`,
    children: [
      (0, N.jsx)(`button`, {
        type: `button`,
        className: `icon-button capture-shot`,
        hidden: !i && !u,
        title: `Screenshot (F8)`,
        "aria-label": `Take screenshot (F8)`,
        disabled: _,
        onPointerDown: O1,
        onClick: y,
        children: (0, N.jsx)(ie, { "aria-hidden": `true` }),
      }),
      (0, N.jsxs)(`button`, {
        type: `button`,
        className: `capture-record${c ? ` is-recording` : ``}`,
        hidden: !i && !u,
        title: g,
        "aria-label": g,
        disabled: v,
        onPointerDown: O1,
        onClick: b,
        children: [
          l
            ? (0, N.jsx)(Ee, {
                className: `capture-spinner`,
                "aria-hidden": `true`,
              })
            : c
              ? (0, N.jsx)(et, {
                  className: `capture-stop-icon`,
                  "aria-hidden": `true`,
                })
              : (0, N.jsx)(ue, {
                  className: `capture-record-icon`,
                  "aria-hidden": `true`,
                }),
          (0, N.jsx)(`span`, {
            children: c
              ? (0, N.jsxs)(N.Fragment, {
                  children: [
                    (0, N.jsx)(`b`, { children: `REC` }),
                    ` `,
                    E1(s.elapsed),
                    (0, N.jsx)(`small`, { children: ` / 2:00` }),
                  ],
                })
              : l
                ? `SAVING`
                : `RECORD`,
          }),
          c &&
            (0, N.jsx)(`span`, {
              className: `capture-stop-label`,
              children: `STOP`,
            }),
        ],
      }),
      (0, N.jsxs)(`button`, {
        type: `button`,
        className: `icon-button capture-menu-button`,
        hidden: !i && !u,
        title: `Capture options & downloads`,
        "aria-label": `Capture options and downloads`,
        "aria-expanded": n,
        "aria-controls": `capture-panel`,
        onPointerDown: O1,
        onClick: () => r(!n),
        children: [
          (0, N.jsx)(ae, { "aria-hidden": `true` }),
          f.length > 0 && (0, N.jsx)(`i`, { "aria-hidden": `true` }),
        ],
      }),
      m &&
        (0, N.jsxs)(`div`, {
          className: `capture-notification${s?.error ? ` has-error` : ``}`,
          children: [
            (0, N.jsxs)(`button`, {
              type: `button`,
              onPointerDown: O1,
              onClick: () => r(!0),
              children: [
                (0, N.jsx)(pe, { "aria-hidden": `true` }),
                (0, N.jsx)(`output`, {
                  children: s?.error
                    ? `Capture needs attention`
                    : s?.notice ||
                      `${f.length === 1 ? `Capture` : `Captures`} ready to save`,
                }),
              ],
            }),
            (0, N.jsx)(`button`, {
              type: `button`,
              "aria-label": `Dismiss capture notification`,
              onPointerDown: O1,
              onClick: () => o(p),
              children: (0, N.jsx)(mt, { "aria-hidden": `true` }),
            }),
          ],
        }),
      n &&
        (0, N.jsxs)(`section`, {
          id: `capture-panel`,
          className: `capture-panel`,
          role: `dialog`,
          "data-menu-scope": `capture`,
          "aria-label": `Capture options and downloads`,
          children: [
            (0, N.jsxs)(`div`, {
              className: `capture-heading`,
              children: [
                (0, N.jsxs)(`div`, {
                  children: [
                    (0, N.jsx)(`span`, { children: `FLIGHT RECORDER` }),
                    (0, N.jsx)(`h2`, { children: `CAPTURE THE RUN.` }),
                  ],
                }),
                (0, N.jsx)(`button`, {
                  type: `button`,
                  className: `capture-close`,
                  "aria-label": `Close capture options`,
                  "data-menu-back": !0,
                  onPointerDown: O1,
                  onClick: () => r(!1),
                  children: (0, N.jsx)(mt, { "aria-hidden": `true` }),
                }),
              ],
            }),
            (0, N.jsxs)(`p`, {
              className: `capture-intro`,
              children: [
                (0, N.jsx)(`kbd`, { children: `F8` }),
                ` Screenshot `,
                (0, N.jsx)(`span`, { children: `·` }),
                ` `,
                (0, N.jsx)(`kbd`, { children: `F9` }),
                ` Record / stop`,
              ],
            }),
            (0, N.jsxs)(`div`, {
              className: `capture-panel-actions`,
              children: [
                (0, N.jsxs)(`button`, {
                  id: `capture-panel-shot`,
                  type: `button`,
                  className: `secondary-button capture-panel-action`,
                  "aria-label": `Take screenshot`,
                  "data-menu-initial": !0,
                  disabled: _,
                  onPointerDown: O1,
                  onClick: y,
                  children: [
                    (0, N.jsx)(ie, { "aria-hidden": `true` }),
                    ` SCREENSHOT`,
                  ],
                }),
                (0, N.jsxs)(`button`, {
                  id: `capture-panel-record`,
                  type: `button`,
                  className: `primary-button capture-panel-action${c ? ` is-recording` : ``}`,
                  "aria-label": g,
                  "data-menu-initial": _ || void 0,
                  disabled: v,
                  onPointerDown: O1,
                  onClick: b,
                  children: [
                    l
                      ? (0, N.jsx)(Ee, {
                          className: `capture-spinner`,
                          "aria-hidden": `true`,
                        })
                      : c
                        ? (0, N.jsx)(et, { "aria-hidden": `true` })
                        : (0, N.jsx)(ue, { "aria-hidden": `true` }),
                    l ? `SAVING CLIP` : c ? `STOP RECORDING` : `RECORD CLIP`,
                  ],
                }),
              ],
            }),
            (0, N.jsxs)(`fieldset`, {
              disabled: u,
              children: [
                (0, N.jsx)(`legend`, { children: `VIDEO QUALITY` }),
                (0, N.jsxs)(`div`, {
                  className: `capture-quality`,
                  children: [
                    (0, N.jsxs)(`button`, {
                      type: `button`,
                      "aria-pressed": d.quality === `smooth`,
                      onPointerDown: O1,
                      onClick: () =>
                        t()?.setCaptureOptions({ quality: `smooth` }),
                      children: [
                        (0, N.jsx)(`strong`, { children: `SMOOTH` }),
                        (0, N.jsx)(`span`, { children: `720p · lighter` }),
                      ],
                    }),
                    (0, N.jsxs)(`button`, {
                      type: `button`,
                      "aria-pressed": d.quality === `sharp`,
                      onPointerDown: O1,
                      onClick: () =>
                        t()?.setCaptureOptions({ quality: `sharp` }),
                      children: [
                        (0, N.jsx)(`strong`, { children: `SHARP` }),
                        (0, N.jsx)(`span`, { children: `1080p · crisper` }),
                      ],
                    }),
                  ],
                }),
                (0, N.jsxs)(`div`, {
                  className: `capture-quality`,
                  role: `group`,
                  "aria-label": `Video frame rate`,
                  children: [
                    (0, N.jsxs)(`button`, {
                      type: `button`,
                      "aria-pressed": d.fps === 30,
                      onPointerDown: O1,
                      onClick: () => t()?.setCaptureOptions({ fps: 30 }),
                      children: [
                        (0, N.jsx)(`strong`, { children: `30 FPS` }),
                        (0, N.jsx)(`span`, { children: `Standard` }),
                      ],
                    }),
                    (0, N.jsxs)(`button`, {
                      type: `button`,
                      "aria-pressed": d.fps === 60,
                      onPointerDown: O1,
                      onClick: () => t()?.setCaptureOptions({ fps: 60 }),
                      children: [
                        (0, N.jsx)(`strong`, { children: `60 FPS` }),
                        (0, N.jsx)(`span`, { children: `Fluid · heavier` }),
                      ],
                    }),
                  ],
                }),
                (0, N.jsxs)(`div`, {
                  className: `capture-option`,
                  children: [
                    (0, N.jsxs)(`div`, {
                      children: [
                        (0, N.jsx)(`label`, {
                          htmlFor: `capture-hud`,
                          children: `Race HUD`,
                        }),
                        (0, N.jsx)(`span`, {
                          children: `Speed, lap & position`,
                        }),
                      ],
                    }),
                    (0, N.jsx)(`button`, {
                      id: `capture-hud`,
                      type: `button`,
                      role: `switch`,
                      "aria-label": `Include race HUD in captures`,
                      "aria-checked": d.hud,
                      className: `capture-switch`,
                      onPointerDown: O1,
                      onClick: () => t()?.setCaptureOptions({ hud: !d.hud }),
                      children: (0, N.jsx)(`span`, {}),
                    }),
                  ],
                }),
                (0, N.jsxs)(`div`, {
                  className: `capture-option`,
                  children: [
                    (0, N.jsxs)(`div`, {
                      children: [
                        (0, N.jsx)(`label`, {
                          htmlFor: `capture-audio`,
                          children: `Game audio`,
                        }),
                        (0, N.jsx)(`span`, { children: `Music & effects` }),
                      ],
                    }),
                    (0, N.jsx)(`button`, {
                      id: `capture-audio`,
                      type: `button`,
                      role: `switch`,
                      "aria-label": `Include game audio in videos`,
                      "aria-checked": d.audio,
                      className: `capture-switch`,
                      onPointerDown: O1,
                      onClick: () =>
                        t()?.setCaptureOptions({ audio: !d.audio }),
                      children: (0, N.jsx)(`span`, {}),
                    }),
                  ],
                }),
              ],
            }),
            (0, N.jsx)(`p`, {
              className: `capture-format`,
              children: s?.supported
                ? `${h} · UP TO 2 MINUTES`
                : `VIDEO RECORDING UNAVAILABLE`,
            }),
            (0, N.jsx)(`p`, {
              className: `capture-help`,
              children: s?.supported
                ? s.format === `mp4`
                  ? `MP4 clips are ready to upload to X. Smooth and 30 fps keep recording lighter.`
                  : `This browser records WebM. Convert clips to MP4 before uploading to X.`
                : `This browser cannot record clips. Try a current Chrome, Edge or Safari browser.`,
            }),
            (s?.error || s?.notice) &&
              (0, N.jsx)(`p`, {
                className: `capture-message${s.error ? ` has-error` : ``}`,
                role: s.error ? `alert` : `status`,
                children: s.error || s.notice,
              }),
            f.length > 0 &&
              (0, N.jsxs)(`div`, {
                className: `capture-downloads`,
                children: [
                  (0, N.jsx)(`h3`, { children: `READY TO SAVE` }),
                  f.map((e) =>
                    (0, N.jsxs)(
                      `a`,
                      {
                        href: e.url,
                        download: e.filename,
                        className: `capture-download`,
                        onKeyDown: (e) => {
                          e.key === `Enter` && e.stopPropagation();
                        },
                        children: [
                          (0, N.jsx)(pe, { "aria-hidden": `true` }),
                          (0, N.jsxs)(`span`, {
                            children: [
                              (0, N.jsx)(`strong`, {
                                children:
                                  e.kind === `screenshot`
                                    ? `Save screenshot`
                                    : `Save video clip`,
                              }),
                              (0, N.jsxs)(`small`, {
                                children: [
                                  e.kind === `screenshot`
                                    ? `PNG`
                                    : e.mimeType.includes(`mp4`)
                                      ? `MP4`
                                      : `WebM`,
                                  ` `,
                                  `· `,
                                  D1(e.bytes),
                                  ` · `,
                                  e.width,
                                  ` ×`,
                                  ` `,
                                  e.height,
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      e.url,
                    ),
                  ),
                  (0, N.jsx)(`p`, {
                    className: `capture-help`,
                    children: `Save before reloading. A new capture replaces the previous one of the same type.`,
                  }),
                ],
              }),
            (0, N.jsx)(Hi, {}),
          ],
        }),
    ],
  });
}
