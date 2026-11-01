// assets__index-DF2rMRzV 10 — localstorage
// Lines 71732-71812 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
function GX(e) {
  BX !== e && ((BX = e), UX());
}
function KX(e) {
  return (
    HX.add(e),
    () => {
      HX.delete(e);
    }
  );
}
var qX = () => VX;
function JX() {
  (VX++, UX());
}
function YX() {
  try {
    return localStorage.getItem(zX) !== `off`;
  } catch {
    return !0;
  }
}
function XX(e) {
  try {
    localStorage.setItem(zX, e ? `on` : `off`);
  } catch {}
  UX();
}
function ZX(e) {
  let t = new URLSearchParams(e.search).get(`intro`);
  return t === `1`
    ? !0
    : t === `0`
      ? !1
      : e.enabled && !e.webdriver && !e.reducedMotion;
}
var QX = [
    [`Accelerate`, `W / ↑`, `CROSS / A`, `THROTTLE`],
    [`Steer`, `A D / ← →`, `LEFT STICK`, `← / →`],
    [`Brake`, `S / ↓`, `BOTH TRIGGERS`, `BRAKE`],
    [`Airbrake / powerslide`, `Q / E`, `L2 / R2 · LT / RT`, `L AIR / R AIR`],
    [
      `Steer + airbrake`,
      `HOLD SHIFT + A / D`,
      `STICK + L2 / R2`,
      `SLIDE UP ON ← / →`,
    ],
    [`Side-shift`, `DOUBLE-TAP Q / E`, `DOUBLE-TAP L2 / R2`, `DOUBLE-TAP AIR`],
    [`Use weapon / Shield / Turbo`, `SPACE`, `SQUARE / X`, `USE`],
    [`Absorb for hull`, `X`, `CIRCLE / B`, `ABSORB`],
    [`Pause`, `ESC / P`, `MENU / START`, `PAUSE ICON`],
    [`Camera`, `C`, `Y / TRIANGLE`, `SETTINGS`],
    [`Restart`, `R`, `PAUSE MENU`, `PAUSE MENU`],
    [`Fullscreen`, `F`, `SCREEN ICON`, `SCREEN ICON`],
    [`Screenshot`, `F8`, `CAMERA ICON`, `CAMERA ICON`],
    [`Record / stop clip`, `F9`, `RECORD BUTTON`, `RECORD BUTTON`],
  ],
  $X = [
    [[`LB`, `RB`], [`Q`, `E`], `TABS`],
    [[`LT`, `RT`], [`Z`, `C`], `SECTIONS`],
    [[`✚`], [`↑ ↓ ← →`], `STEP`],
    [[`L`], [], `POINT`],
    [[`R`], [], `SCROLL`],
    [[`A`], [`ENTER`], `SELECT`],
    [[`B`], [`ESC`], `BACK`],
    [[`☰`], [], `MAIN ACTION`],
    [[`X`, `Y`], [`R`, `G`], `SCREEN ACTIONS`],
  ],
  eZ = [`flight`, `display`, `audio`, `controls`];
function tZ(e) {
  let t = e?.preferences;
  return t?.cloud
    ? {
        loading: `LOADING YOUR SETUP`,
        saving: `SAVING TO WAVEDASH`,
        synced: `SAVED TO YOUR WAVEDASH ACCOUNT`,
        offline: `SAVED ON THIS DEVICE · WAVEDASH RETRYING`,
        local: `SAVED ON THIS DEVICE`,
      }[t.status]
    : `SAVED ON THIS DEVICE`;
}
