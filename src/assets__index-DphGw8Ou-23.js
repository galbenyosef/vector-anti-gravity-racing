// assets__index-DphGw8Ou 23 — description
// Lines 77280-77308 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
var U$ = {
    id: `BEAT_NITSUAFOX`,
    title: `Beat NitsuaFox`,
    description: `Beat developer NitsuaFox's 00:21.073 Timed Lap on Solstice Port MK III.`,
    targetMs: 21073,
    circuitId: `solstice-port-mk3`,
  },
  W$ = {
    id: `CAREER_COMPLETE`,
    title: `Career Complete`,
    description: `Win a medal in every career event, from Rookie to the Phantom finale.`,
  },
  G$ = {
    id: `CAREER_GOLD`,
    title: `Career Gold`,
    description: `Win gold in every career event, including all four finales.`,
  },
  K$ = new WeakMap(),
  q$ = new WeakMap(),
  J$ = new WeakMap();
function Y$(e) {
  let t = J$.get(e);
  if (!t) {
    ((t = e.requestStats()), J$.set(e, t));
    let n = () => J$.delete(e);
    t.then(n, n);
  }
  return t;
}
