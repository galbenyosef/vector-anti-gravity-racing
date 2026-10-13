// assets__game-CsnOSIff 76 — math
// Lines 31990-32078 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function wx(e, t) {
  let n = t * e.speed + e.phase,
    r = Math.sin(n) * e.longRadius,
    i = Math.cos(n) * e.crossRadius,
    a = Math.cos(n) * e.longRadius,
    o = -Math.sin(n) * e.crossRadius;
  return {
    x: e.x + e.tangentX * r + e.tangentZ * i,
    y: e.y + Math.sin(n * 2) * 0.65,
    z: e.z + e.tangentZ * r - e.tangentX * i,
    yaw: Math.atan2(
      e.tangentX * a + e.tangentZ * o,
      e.tangentZ * a - e.tangentX * o,
    ),
    bank: Math.sin(n) * 0.055,
  };
}
function Tx() {
  let e = Nc(bx.assets),
    t = (t, n, r, i) =>
      Mc(t, n) >= 16 + r + i &&
      e.every((e) => Math.hypot(t - e.x, n - e.z) >= e.radius + r + 4),
    n = [];
  for (let e = 0; e < 28 && n.length < 10; e++) {
    let r = (e * 9) % 28,
      i = Gn(170 + (r * F) / 28),
      a = Math.hypot(i.tangent.x, i.tangent.z),
      o = i.tangent.x / a,
      s = i.tangent.z / a;
    for (let e of [r % 2 ? -1 : 1, r % 2 ? 1 : -1]) {
      if (n.length >= 10) break;
      let a = n.length % 3 != 1;
      for (let c of [66, 108, 170]) {
        let l = {
            asset: a ? `cargo-shuttle` : `service-drone`,
            x: i.position.x + s * e * c,
            y: i.position.y + (a ? 17 : 11),
            z: i.position.z - o * e * c,
            tangentX: o,
            tangentZ: s,
            longRadius: a ? 31 : 23,
            crossRadius: a ? 12 : 9,
            footprint: a ? 11 : 5,
            phase: r * 2.39996,
            speed: a ? 0.14 : 0.21,
          },
          u = !0;
        for (let e = 0; e < 256; e++) {
          let n = wx(l, (e * Math.PI * 2) / (256 * l.speed));
          if (!t(n.x, n.z, l.footprint + 1, Cx.trafficClearance)) {
            u = !1;
            break;
          }
        }
        if (u && !n.some((e) => Math.hypot(e.x - l.x, e.z - l.z) < 105)) {
          n.push(l);
          break;
        }
      }
    }
  }
  let r = [],
    i = [];
  for (let e = 0; e < 72; e++) {
    let n = (e * 23) % 72,
      a = Gn(40 + (n * F) / 72);
    for (let o of [-1, 1]) {
      let s = Math.hypot(a.tangent.x, a.tangent.z),
        c = a.tangent.z / s,
        l = -a.tangent.x / s,
        u = r.length < 8 && e % 4 == 0,
        d = u ? 48 : 35,
        f = u ? 7 : 2,
        p = a.position.x + c * o * d,
        m = a.position.z + l * o * d;
      if (!t(p, m, f, Cx.machineryClearance)) continue;
      let h = {
        x: p,
        y: a.position.y - (u ? 10 : 6),
        z: m,
        yaw: Math.atan2(a.tangent.x, a.tangent.z),
        phase: n * 1.713,
        footprint: f,
      };
      u ? r.push(h) : i.length < 24 && n % 2 == 0 && i.push(h);
    }
  }
  return { flights: n, turbines: r, beacons: i };
}
