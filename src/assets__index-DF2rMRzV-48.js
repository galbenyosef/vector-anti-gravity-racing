// assets__index-DF2rMRzV 48 — raw
// Lines 84688-84701 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function e4() {
  let e = null;
  try {
    e = localStorage.getItem(rZ);
  } catch {}
  if (e !== $2.raw) {
    let t = Q2;
    try {
      t = OZ(JSON.parse(e ?? `null`));
    } catch {}
    $2 = { raw: e, value: t };
  }
  return $2.value;
}
