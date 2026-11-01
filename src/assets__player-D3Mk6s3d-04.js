// assets__player-D3Mk6s3d 04 — mesh
// Lines 1212-1433 of readable/assets__player-D3Mk6s3d.pretty.js (statement-aligned).
function z(e = !1) {
  let t = e ? `--font-geist-mono` : `--font-geist-sans`;
  return (
    getComputedStyle(document.body).getPropertyValue(t).trim() ||
    (e ? `'Geist Mono', monospace` : `'Geist', Arial, sans-serif`)
  );
}
function dt(t, n = {}) {
  let i = z(n.mono),
    a = n.weight ?? 900,
    o = n.size ?? 160,
    s = n.tracking ?? 0.02,
    c = document.createElement(`canvas`),
    u = c.getContext(`2d`, { willReadFrequently: !0 }),
    d = () => `${a} ${o}px ${i}`;
  u.font = d();
  let f = () =>
      t.split(``).reduce((e, t) => e + u.measureText(t).width + o * s, -o * s),
    p = f(),
    h = Math.ceil(o * 0.35);
  p + h * 2 > ut &&
    ((o = Math.floor((o * (ut - h * 2)) / p)), (u.font = d()), (p = f()));
  let g = Math.ceil(o * 0.3);
  ((c.width = Math.ceil((p + h * 2) / 4) * 4),
    (c.height = Math.ceil((o * 1.05 + g * 2) / 4) * 4),
    (u.font = d()),
    (u.textBaseline = `alphabetic`),
    (u.fillStyle = `#fff`));
  let _ = c.height / 2 + o * 0.355,
    v = h;
  for (let e of t.split(``))
    (u.fillText(e, v, _), (v += u.measureText(e).width + o * s));
  let { data: y } = u.getImageData(0, 0, c.width, c.height),
    b = new Uint8Array(c.width * c.height);
  for (let e = 0; e < c.height; e++) {
    let t = (c.height - 1 - e) * c.width * 4,
      n = e * c.width;
    for (let e = 0; e < c.width; e++) b[n + e] = y[t + e * 4 + 3];
  }
  let x = new m(b, c.width, c.height, l, ye);
  return (
    (x.unpackAlignment = 1),
    (x.generateMipmaps = !0),
    (x.minFilter = ge),
    (x.magFilter = e),
    (x.wrapS = x.wrapT = r),
    (x.needsUpdate = !0),
    {
      texture: x,
      aspect: c.width / c.height,
      pad: (c.height / 2 - o * 0.355) / c.height,
    }
  );
}
var ft = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,
  pt = `
uniform sampler2D tText;
uniform float uOpacity, uReveal, uGlitch, uSkew, uSplit, uTime;
uniform float uWave, uWaveFreq, uWavePhase, uScroll, uRepeat;
uniform float uChrome, uOutline, uPad, uFlash, uSweep, uTexAspect;
uniform vec3 uColor, uColor2;
varying vec2 vUv;
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float glyph(vec2 uv) {
  if (uv.y < 0.0 || uv.y > 1.0 || uv.x < 0.0 || uv.x > 1.0) return 0.0;
  return texture2D(tText, uv).r;
}
void main() {
  vec2 uv = vUv;
  // Scroller: the quad is a window onto the text moving through it.
  uv.x = uv.x * uRepeat + uScroll;
  // Per-column sine, the classic Amiga scroller.
  uv.y += sin(vUv.x * uWaveFreq + uWavePhase) * uWave;
  // Skew is in letter heights; uv.x spans the whole (wide) texture.
  uv.x -= (uv.y - 0.5) * uSkew / uTexAspect;
  float slice = floor(uv.y * 16.0);
  float frame = floor(uTime * 30.0);
  float glitch = step(1.0 - uGlitch * 0.7, hash(vec2(slice, frame)));
  uv.x += (hash(vec2(slice + 7.0, frame)) - 0.5) * 0.2 * glitch * uGlitch;
  // Left-to-right reveal with a hot edge.
  float edge = uReveal * 1.25 - vUv.x * 0.25;
  float shown = step(vUv.x, edge * 1.0);
  float a = glyph(uv);
  float r = glyph(uv + vec2(uSplit, 0.0));
  float b = glyph(uv - vec2(uSplit, 0.0));
  // Letter-relative height for the chrome horizon.
  float h = clamp((uv.y - uPad) / (1.0 - 2.0 * uPad), 0.0, 1.0);
  vec3 chrome = h > 0.5
    ? mix(vec3(1.0, 0.98, 0.95), vec3(0.18, 0.42, 1.0), pow((h - 0.5) * 2.0, 0.7))
    : mix(vec3(0.25, 0.07, 0.02), vec3(1.0, 0.72, 0.36), pow(h * 2.0, 1.4));
  chrome += vec3(1.6) * smoothstep(0.035, 0.0, abs(h - 0.5));
  vec3 flat2 = mix(uColor2, uColor, h);
  vec3 fill = mix(flat2, chrome, uChrome);
  // A light sweep across the letters.
  fill += vec3(1.2) * smoothstep(0.08, 0.0, abs(vUv.x - uSweep + (h - 0.5) * 0.2));
  // Outline: keep the antialiased rim and hollow the body.
  float rim = smoothstep(0.08, 0.45, a) * (1.0 - smoothstep(0.55, 0.95, a));
  float body = mix(a, rim * 1.6, uOutline);
  vec3 color = fill * body;
  color.r += uColor.r * max(r - a, 0.0) * 1.5;
  color.b += uColor2.b * max(b - a, 0.0) * 1.5 + 0.6 * max(b - a, 0.0);
  float alpha = max(body, max(r, b) * step(0.001, uSplit) * 0.6);
  color = mix(color, vec3(alpha) * 3.0, uFlash);
  float head = smoothstep(0.03, 0.0, abs(vUv.x - edge)) * step(edge, 1.0) * a;
  color += vec3(3.0) * head;
  gl_FragColor = vec4(color, alpha) * uOpacity * shown;
}`,
  mt = class {
    constructor(e, t = {}) {
      ((this.source = e),
        (this.aspect = e.aspect),
        (this.uniforms = {
          tText: { value: e.texture },
          uOpacity: { value: 1 },
          uReveal: { value: 1 },
          uGlitch: { value: 0 },
          uSkew: { value: 0.18 },
          uSplit: { value: 0 },
          uTime: { value: 0 },
          uWave: { value: 0 },
          uWaveFreq: { value: 12 },
          uWavePhase: { value: 0 },
          uScroll: { value: 0 },
          uRepeat: { value: 1 },
          uChrome: { value: 0 },
          uOutline: { value: 0 },
          uPad: { value: e.pad },
          uFlash: { value: 0 },
          uSweep: { value: -1 },
          uTexAspect: { value: e.aspect },
          uColor: { value: new _(t.color ?? `#ffffff`) },
          uColor2: { value: new _(t.color2 ?? t.color ?? `#ffffff`) },
        }));
      let n = new j({
        uniforms: this.uniforms,
        vertexShader: ft,
        fragmentShader: pt,
        transparent: !0,
        depthTest: !1,
        depthWrite: !1,
        side: 2,
        premultipliedAlpha: !0,
        blending: t.additive ? 2 : 5,
      });
      (t.additive || ((n.blendSrc = 201), (n.blendDst = 205)),
        (this.mesh = new v(new T(1, 1), n)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.visible = !1));
    }
    place(e, t, n, r) {
      let i = n / (1 - 2 * this.source.pad);
      return (
        this.mesh.position.set(e, t, 0),
        this.mesh.scale.set(i * this.aspect, i, 1),
        (this.uniforms.uTime.value = r),
        (this.mesh.visible = !0),
        this
      );
    }
    window(e, t, n, r, i, a) {
      let o = n / (1 - 2 * this.source.pad),
        s = o * this.aspect;
      return (
        this.mesh.position.set(e, t, 0),
        this.mesh.scale.set(r, o, 1),
        (this.uniforms.uRepeat.value = r / s),
        (this.uniforms.uScroll.value = (i - r) / s),
        (this.uniforms.uTime.value = a),
        (this.mesh.visible = !0),
        this
      );
    }
    widthAt(e) {
      return (e / (1 - 2 * this.source.pad)) * this.aspect;
    }
    set(e) {
      for (let [t, n] of Object.entries(e)) this.uniforms[t].value = n;
      return this;
    }
    dispose() {
      (this.mesh.geometry.dispose(),
        this.mesh.material.dispose(),
        this.source.texture.dispose());
    }
  },
  ht = `audio/intro-vector.mp3`,
  gt = 60 / 143.91,
  _t = 0.332,
  vt = (e) => (e - _t) / gt,
  B = (e) => _t + e * gt,
  V = [
    { id: `boot`, from: vt(0), to: 7 },
    { id: `logo`, from: 7, to: 31 },
    { id: `build`, from: 31, to: 47 },
    { id: `launch`, from: 47, to: 63 },
    { id: `rollcall`, from: 63, to: 79 },
    { id: `circuits`, from: 79, to: 95 },
    { id: `arsenal`, from: 95, to: 107 },
    { id: `moon`, from: 107, to: 123 },
    { id: `finale`, from: 123, to: 140.75 },
  ],
  yt = B(V[V.length - 1].to);
function bt(e) {
  let t = V.findIndex((t) => e < t.to);
  t < 0 && (t = V.length - 1);
  let n = V[t];
  return {
    id: n.id,
    index: t,
    local: e - n.from,
    progress: W((e - n.from) / (n.to - n.from)),
  };
}
