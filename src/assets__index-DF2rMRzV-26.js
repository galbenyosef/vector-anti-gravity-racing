// assets__index-DF2rMRzV 26 — children
// Lines 78080-78208 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
var d1 = (e, t) => e.poll?.options.find((e) => e.key === t)?.label ?? ``;
function f1({ hud: e, getGame: t }) {
  let n = e?.poll,
    r = n?.poll;
  if (!n || !r) return null;
  let i = !!n.mine && n.counted,
    a = (e) => (n.total ? Math.round((n.counts[e] / n.total) * 100) : 0),
    o = n.available
      ? n.voting
        ? `Saving your vote…`
        : n.mine
          ? `Your vote is in for ${d1(n, n.mine)}. Thanks! Pick another answer to change it.`
          : n.loading && !n.checked
            ? `Checking for your vote…`
            : `Pick one answer. The results show once you have voted.`
      : `Play VECTOR on Wavedash to vote.`;
  return (0, N.jsx)(ol, {
    open: n.open,
    onOpenChange: (e) => t()?.poll.setOpen(e),
    children: (0, N.jsx)(pl, {
      kicker: `VECTOR · COMMUNITY VOTE`,
      title: r.question,
      description: `Help decide what comes to VECTOR next.`,
      scope: `vote`,
      className: `vote-drawer`,
      head: (0, N.jsxs)(`div`, {
        className: `poll-ask`,
        children: [
          (0, N.jsx)(`output`, { className: `poll-status`, children: o }),
          n.message &&
            n.available &&
            (0, N.jsx)(`p`, { className: `poll-message`, children: n.message }),
        ],
      }),
      hints: [
        [[`✚`], [`↑ ↓`], `CHOOSE`],
        [[`A`], [`ENTER`], `VOTE`],
      ],
      status: (0, N.jsx)(`span`, {
        children: i
          ? `${n.total} ${n.total === 1 ? `VOTE` : `VOTES`} · ONE PER PILOT`
          : `ONE VOTE PER PILOT · SAVED TO WAVEDASH`,
      }),
      children: (0, N.jsx)(`fieldset`, {
        className: `poll-options` + (i ? ` is-shown` : ``),
        "aria-label": r.question,
        children: r.options.map((e, r) => {
          let o = n.mine === e.key;
          return (0, N.jsxs)(
            `button`,
            {
              className: `front-row poll-option` + (o ? ` is-mine` : ``),
              "aria-pressed": o,
              "data-menu-initial": (n.mine ? o : r === 0) || void 0,
              disabled: !n.available || n.voting,
              onClick: () => void t()?.poll.vote(e.key),
              style: { "--share": `${i ? a(r) : 0}%` },
              children: [
                (0, N.jsx)(`span`, {
                  className: `poll-bar`,
                  "aria-hidden": `true`,
                }),
                (0, N.jsx)(`span`, {
                  className: `poll-letter`,
                  children: e.key,
                }),
                (0, N.jsxs)(`span`, {
                  className: `poll-label`,
                  children: [
                    e.label,
                    o &&
                      (0, N.jsxs)(`small`, {
                        children: [(0, N.jsx)(re, {}), ` YOUR VOTE`],
                      }),
                  ],
                }),
                i &&
                  (0, N.jsxs)(`span`, {
                    className: `poll-share`,
                    children: [
                      a(r),
                      `%`,
                      (0, N.jsxs)(`small`, {
                        children: [
                          n.counts[r],
                          ` `,
                          n.counts[r] === 1 ? `VOTE` : `VOTES`,
                        ],
                      }),
                    ],
                  }),
              ],
            },
            e.key,
          );
        }),
      }),
    }),
  });
}
var p1 = {
    id: `BEAT_NITSUAFOX`,
    title: `Beat NitsuaFox`,
    description: `Beat developer NitsuaFox's 00:21.073 Timed Lap on Solstice Port MK III.`,
    targetMs: 21073,
    circuitId: `solstice-port-mk3`,
  },
  m1 = {
    id: `CAREER_COMPLETE`,
    title: `Career Complete`,
    description: `Win a medal in every career event, from Rookie to the Phantom finale.`,
  },
  h1 = {
    id: `CAREER_GOLD`,
    title: `Career Gold`,
    description: `Win gold in every career event, including all four finales.`,
  },
  g1 = new WeakMap(),
  _1 = new WeakMap(),
  v1 = new WeakMap();
function y1(e) {
  let t = v1.get(e);
  if (!t) {
    ((t = e.requestStats()), v1.set(e, t));
    let n = () => v1.delete(e);
    t.then(n, n);
  }
  return t;
}
