// assets__game-CsnOSIff 89 — mul
// Lines 35698-35851 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function sC(e, t, n) {
  let r = new pn(),
    a = [],
    o = xa(`fallbackHull`, `day`),
    s = xa(`fallbackHull`, `day`, {
      color: new _(e).multiplyScalar(0.78),
      roughness: 0.34,
    }),
    c = xa(`fallbackDark`, `day`),
    l = xa(`fallbackCanopy`, `day`),
    u = new we({ color: new _(`#67eeff`).multiplyScalar(3) });
  function d(e, t, n = 0, i = 0, a = 0) {
    let o = new N(e, t);
    return (o.position.set(n, i, a), (o.castShadow = !0), r.add(o), o);
  }
  (d(
    oC([
      [-3.5, 1, 0.42, -0.35],
      [-1.2, 1.15, 0.76, -0.45],
      [1.8, 0.62, 0.48, -0.28],
      [4.3, 0.025, 0.04, -0.025],
    ]),
    o,
  ),
    d(
      oC([
        [-1.6, 0.54, 0.68, 0],
        [-0.4, 0.58, 0.92, 0],
        [1.7, 0.17, 0.12, 0],
        [2.1, 0.02, 0.03, 0],
      ]),
      l,
      0,
      0.43,
      0,
    ),
    d(new ir(4.65, 0.2, 1.5), c, 0, -0.06, -1.3));
  let f = [];
  for (let e of [-1, 1]) {
    (d(
      oC([
        [-3.5, 0.77, 0.45, -0.42],
        [-1.8, 0.8, 0.63, -0.5],
        [0.9, 0.46, 0.42, -0.24],
        [2.1, 0.04, 0.08, -0.03],
      ]),
      s,
      e * 1.76,
      0.12,
      -0.25,
    ),
      d(
        oC([
          [-3.3, 0.25, 0.045, -0.02],
          [-1.8, 0.28, 0.045, -0.02],
          [1.3, 0.04, 0.01, -0.01],
        ]),
        o,
        e * 1.76,
        0.76,
        -0.25,
      ),
      d(new ir(0.1, 0.12, 2.6), u, e * 2.49, 0.2, -1.25));
    let t = d(new ir(0.12, 1.32, 1.75), s, e * 1.8, 1.1, -2.55);
    t.rotation.z = e * -0.22;
    let r = d(new ir(0.8, 0.07, 1.35), s, e * 2.05, 0.62, -2.2);
    (Object.assign(r.userData, {
      restX: 0,
      restY: 0.62,
      hingeAngle: -0.7,
      lift: 0.23,
    }),
      a.push(r),
      d(new ir(0.08, 0.06, 2.8), u, e * 2.38, 0.08, -0.2),
      d(new ir(0.75, 0.06, 0.35), c, e * 1.75, 0.75, 0.9));
    let l = d(new _e(0.46, 0.46, 0.5, 16), c, e * 1.76, 0.07, -3.83);
    l.rotation.x = Math.PI / 2;
    let p = d(new _e(0.34, 0.34, 0.02, 16), u, e * 1.76, 0.07, -4.1);
    p.rotation.x = Math.PI / 2;
    for (let t = 0; t < 4; t++)
      d(new ir(0.64, 0.035, 0.08), c, e * 1.76, 0.77, -1.3 - t * 0.22);
    let m = new i({ transparent: !0, depthWrite: !1, blending: 2, side: 2 }),
      h = X().y.mul(28).sub(n.mul(26)).sin().mul(0.12).add(0.88),
      g = X().y.smoothstep(0, 0.18).mul(0.82).add(0.18);
    ((m.colorNode = J(W(`#b2eeff`).mul(1.7), W(`#247dd8`), X().y.pow(0.6))),
      (m.opacityNode = X().y.oneMinus().pow(0.7).mul(h).mul(g).mul(0.35)));
    let _ = d(new Zt(0.36, 4, 16, 1, !0), m, e * 1.76, 0.07, -5.9);
    ((_.rotation.x = -Math.PI / 2), (_.castShadow = !1), f.push(_));
    let v = d(
      new Zt(0.19, 2.8, 12),
      new i({
        colorNode: J(W(`#e4ffff`).mul(2.2), W(`#70dfff`).mul(1.4), X().y),
        opacityNode: X().y.oneMinus().pow(0.4).mul(g).mul(0.5),
        transparent: !0,
        depthWrite: !1,
        blending: 2,
      }),
      e * 1.76,
      0.07,
      -5.3,
    );
    ((v.rotation.x = -Math.PI / 2), (v.castShadow = !1), f.push(v));
  }
  let p = d(new ir(0.16, 0.03, 2.1), s, 0, 0.43, 2.2);
  p.rotation.x = 0.15;
  let m = aC(256, 128, (n) => {
      ((n.fillStyle = `#132832`),
        (n.font = `italic 900 82px Arial`),
        n.fillText(t ? `07` : `AG`, 10, 90),
        (n.fillStyle = e),
        n.fillRect(152, 20, 12, 80),
        n.fillRect(173, 20, 5, 80));
    }),
    h = d(new rt(1.16, 0.58), Ca(`raceNumber`, m, `day`), 0, 0.82, -2.35);
  h.rotation.x = -Math.PI / 2;
  let v = aC(128, 128, (e) => {
      let t = e.createRadialGradient(64, 64, 4, 64, 64, 63);
      (t.addColorStop(0, `rgba(0,10,15,0.65)`),
        t.addColorStop(0.55, `rgba(0,10,15,0.35)`),
        t.addColorStop(1, `rgba(0,10,15,0)`),
        (e.fillStyle = t),
        e.fillRect(0, 0, 128, 128));
    }),
    y = new N(
      new rt(8, 10),
      new we({
        map: v,
        transparent: !0,
        depthWrite: !1,
        polygonOffset: !0,
        polygonOffsetFactor: -2,
      }),
    ),
    b = aC(128, 128, (e) => {
      let t = e.createRadialGradient(64, 64, 1, 64, 64, 64);
      (t.addColorStop(0, `rgba(40,224,255,0.35)`),
        t.addColorStop(1, `rgba(0,160,255,0)`),
        (e.fillStyle = t),
        e.fillRect(0, 0, 128, 128));
    }),
    x = new N(
      new rt(7, 9),
      new we({ map: b, transparent: !0, depthWrite: !1, blending: 2 }),
    );
  return {
    group: r,
    recovery: new Ks(),
    flames: f,
    shadow: y,
    glow: x,
    brakes: a,
    engines: [-1.76, 1.76].map((e) => new g(e, 0.07, -4.07)),
  };
}
