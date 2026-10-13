// assets__index-DphGw8Ou 09 — localstorage
// Lines 71400-71474 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
function zX(e) {
  PX !== e && ((PX = e), LX());
}
function BX(e) {
  return (
    IX.add(e),
    () => {
      IX.delete(e);
    }
  );
}
var VX = () => FX;
function HX() {
  (FX++, LX());
}
function UX() {
  try {
    return localStorage.getItem(NX) !== `off`;
  } catch {
    return !0;
  }
}
function WX(e) {
  try {
    localStorage.setItem(NX, e ? `on` : `off`);
  } catch {}
  LX();
}
function GX(e) {
  let t = new URLSearchParams(e.search).get(`intro`);
  return t === `1`
    ? !0
    : t === `0`
      ? !1
      : e.enabled && !e.webdriver && !e.reducedMotion;
}
var KX = [
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
  [
    `Menus`,
    `ARROWS / ENTER / ESC`,
    `L STICK CURSOR · D-PAD · A / B`,
    `TAP CONTROLS`,
  ],
];
function qX(e) {
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
