// assets__index-DphGw8Ou 18 — mode
// Lines 74217-74249 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function h$(e) {
  return {
    ...Object.fromEntries(o$.map((t) => [t, e[t]])),
    mode: e.mode,
    lastCollision: e.lastCollision,
    boostActive: e.boostActive,
    lapTimes: [...e.lapTimes],
  };
}
function g$(e, t) {
  for (let n of o$) e[n] = t[n];
  ((e.mode = t.mode),
    (e.lastCollision = t.lastCollision),
    (e.boostActive = t.boostActive),
    (e.lapTimes = [...t.lapTimes]));
}
var _$ = (e) => (e.mode === `finished` ? e.raceDistance : e.distance);
function v$(e) {
  return [...e].sort((e, t) => {
    let n = e.state.mode === `finished` && !e.dnf;
    return n === (t.state.mode === `finished` && !t.dnf)
      ? n
        ? e.state.elapsed - t.state.elapsed || e.id.localeCompare(t.id)
        : e.dnf === t.dnf
          ? _$(t.state) - _$(e.state) || e.id.localeCompare(t.id)
          : e.dnf
            ? 1
            : -1
      : n
        ? -1
        : 1;
  });
}
