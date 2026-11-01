// assets__index-DF2rMRzV 20 — mode
// Lines 74553-74585 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function k$(e) {
  return {
    ...Object.fromEntries(b$.map((t) => [t, e[t]])),
    mode: e.mode,
    lastCollision: e.lastCollision,
    boostActive: e.boostActive,
    lapTimes: [...e.lapTimes],
  };
}
function A$(e, t) {
  for (let n of b$) e[n] = t[n];
  ((e.mode = t.mode),
    (e.lastCollision = t.lastCollision),
    (e.boostActive = t.boostActive),
    (e.lapTimes = [...t.lapTimes]));
}
var j$ = (e) => (e.mode === `finished` ? e.raceDistance : e.distance);
function M$(e) {
  return [...e].sort((e, t) => {
    let n = e.state.mode === `finished` && !e.dnf;
    return n === (t.state.mode === `finished` && !t.dnf)
      ? n
        ? e.state.elapsed - t.state.elapsed || e.id.localeCompare(t.id)
        : e.dnf === t.dnf
          ? j$(t.state) - j$(e.state) || e.id.localeCompare(t.id)
          : e.dnf
            ? 1
            : -1
      : n
        ? -1
        : 1;
  });
}
