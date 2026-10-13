// assets__player-Cd-Kznkt 06 — math
// Lines 3007-3080 of readable/assets__player-Cd-Kznkt.pretty.js (statement-aligned).
function jt(e, t, n, r = 1) {
  return new O({
    vertexShader: qe,
    fragmentShader: Je,
    uniforms: {
      uColor: $(Q(e)),
      uHead: $(Q(t)),
      uReveal: $(1),
      uOpacity: $(r),
      uAssemble: $(3),
      uFogDistance: $(n),
    },
    blending: 2,
    transparent: !0,
    depthWrite: !1,
  });
}
function Mt() {
  let e = new w(0.85, 3.6);
  return (e.rotateX(-Math.PI / 2), e.translate(0, 0, -1.8), e);
}
function Nt() {
  let e = document.createElement(`canvas`);
  e.width = e.height = 128;
  let t = e.getContext(`2d`),
    r = t.createRadialGradient(64, 64, 0, 64, 64, 64);
  return (
    r.addColorStop(0, `rgba(255,255,255,1)`),
    r.addColorStop(0.2, `rgba(255,255,255,0.55)`),
    r.addColorStop(0.5, `rgba(255,255,255,0.12)`),
    r.addColorStop(1, `rgba(255,255,255,0)`),
    (t.fillStyle = r),
    t.fillRect(0, 0, 128, 128),
    new n(e)
  );
}
function Pt(e) {
  let t = [],
    n = [],
    r = Math.PI * (3 - Math.sqrt(5)),
    i = Q(`#ff7a2e`),
    a = Q(`#ffd36a`);
  for (let o = 0; o < e; o++) {
    let s = 1 - (o / (e - 1)) * 2,
      c = Math.sqrt(1 - s * s),
      l = r * o;
    t.push(Math.cos(l) * c * 10, s * 10, Math.sin(l) * c * 10);
    let u = i
      .clone()
      .lerp(a, (s + 1) / 2)
      .multiplyScalar(2.2);
    n.push(u.r, u.g, u.b, 1.3);
  }
  let o = new N();
  (o.setAttribute(`position`, new T(t, 3)),
    o.setAttribute(`aVelocity`, new T(new Float32Array(e * 3), 3)),
    o.setAttribute(`aColor`, new T(n, 4)),
    o.setAttribute(
      `aLife`,
      new T(Array.from({ length: e }, () => [-1, 1e7]).flat(), 2),
    ));
  let s = new ae(
    o,
    new O({
      vertexShader: Ye,
      fragmentShader: Xe,
      uniforms: { uTime: $(0), uSize: $(0.42), uPixel: $(500), uDrag: $(0) },
      blending: 2,
      transparent: !0,
      depthWrite: !1,
    }),
  );
  return ((s.frustumCulled = !1), s);
}
