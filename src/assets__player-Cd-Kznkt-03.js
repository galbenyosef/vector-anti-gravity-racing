// assets__player-Cd-Kznkt 03 — uniforms
// Lines 522-1211 of readable/assets__player-Cd-Kznkt.pretty.js (statement-aligned).
var Re = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`,
  z = `
#define PI 3.14159265
uniform float uTime, uBeat, uKick, uBass, uHigh, uLocal, uAspect;
varying vec2 vUv;
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), u.x),
             mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
  return v;
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}
vec2 screen() { vec2 p = vUv * 2.0 - 1.0; p.x *= uAspect; return p; }
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 starfield(vec2 p, float travel, float bright) {
  vec3 col = vec3(0.0);
  for (int l = 0; l < 6; l++) {
    float fl = float(l);
    float depth = fract(travel + fl / 6.0);
    float scale = mix(28.0, 1.2, depth);
    vec2 q = p * scale + vec2(fl * 13.1, fl * 7.7);
    vec2 id = floor(q);
    vec2 f = fract(q) - 0.5;
    vec2 h = hash22(id) - 0.5;
    float d = length(f - h * 0.7);
    float size = mix(0.035, 0.1, depth);
    float b = smoothstep(size, 0.0, d) * smoothstep(0.0, 0.35, depth) * smoothstep(1.0, 0.85, depth);
    b *= step(0.55, hash12(id + fl));
    col += b * mix(vec3(0.6, 0.8, 1.0), vec3(1.0, 0.85, 0.7), hash12(id + 3.0));
  }
  return col * bright;
}`,
  ze = `
${z}
uniform float uOpen, uTravel, uSpread, uGain;
uniform vec3 uBar[5];
void main() {
  vec2 p = screen();
  vec3 col = mix(vec3(0.004, 0.006, 0.02), vec3(0.03, 0.01, 0.05), smoothstep(0.6, -1.0, p.y));
  col += starfield(p, uTravel, 1.6);
  float best = -2.0;
  vec3 bar = vec3(0.0);
  float covered = 0.0;
  for (int i = 0; i < 10; i++) {
    float fi = float(i);
    float ph = uTime * 1.55 + fi * 0.5;
    float y = uSpread * sin(ph) * (0.6 + 0.4 * sin(uTime * 0.41 + fi * 0.3));
    float z = cos(ph);
    float w = (0.05 + 0.014 * z) * uOpen;
    float d = (p.y - y) / max(w, 1e-4);
    if (abs(d) < 1.0 && z > best) {
      best = z;
      float sh = 1.0 - d * d;
      vec3 base = uBar[i - (i / 5) * 5];
      bar = base * pow(sh, 0.7) * (0.55 + 0.45 * z) * (1.0 + uKick * 0.5) + pow(sh, 14.0) * vec3(1.6);
      covered = 1.0;
    }
  }
  col = mix(col, bar * 1.4 * uGain, covered);
  // The CRT line the boot collapsed into opens into the bars.
  col += vec3(0.6, 0.9, 1.0) * 3.0 * smoothstep(0.012, 0.0, abs(p.y)) * (1.0 - uOpen);
  gl_FragColor = vec4(col, 1.0);
}`,
  Be = `
${z}
uniform vec2 uCenter;
uniform float uTravel, uTwist;
uniform vec3 uTint, uTint2;
void main() {
  vec2 p = screen() - uCenter;
  float r = length(p);
  float a = atan(p.y, p.x);
  float z = 0.55 / max(r, 0.002);
  float u = a / PI * 4.0 + uTwist + sin(z * 0.25 + uTime * 0.7) * 0.25;
  float v = z + uTravel;
  vec2 g = vec2(u, v * 0.9);
  vec2 cell = floor(g);
  vec2 gf = abs(fract(g) - 0.5);
  float seam = smoothstep(0.43, 0.5, max(gf.x, gf.y));
  float panel = hash12(cell);
  vec3 col = mix(vec3(0.015, 0.02, 0.035), vec3(0.06, 0.07, 0.1), panel);
  col += seam * uTint * 0.35;
  // Light strips along the tunnel, on every other panel seam.
  float strip = smoothstep(0.03, 0.0, 0.5 - abs(fract(u * 0.5) - 0.5));
  col += strip * uTint2 * (1.2 + 0.8 * sin(v * 6.0 - uTime * 20.0));
  // Boost rings: every few metres, flashing on the kick.
  float ring = smoothstep(0.035, 0.0, 0.5 - abs(fract(v * 0.25) - 0.5));
  col += ring * uTint * (0.6 + 2.5 * uKick);
  // Lit panels flicker past with the hi-hats.
  col += step(0.97, panel) * uTint2 * (0.8 + uHigh * 2.0);
  float fog = exp(-z * 0.085);
  col *= fog;
  col += mix(uTint2, vec3(1.0), 0.5) * 0.8 * exp(-r * 9.0);
  gl_FragColor = vec4(col, 1.0);
}`,
  Ve = `
${z}
uniform int uEffect;
uniform vec3 uColor, uColor2;
vec3 ramp(float f, vec3 c) {
  vec3 dark = c * 0.05;
  return f < 0.5 ? mix(dark, c, f * 2.0) : mix(c, mix(c, vec3(1.0), 0.75), (f - 0.5) * 2.0);
}
vec3 plasma(vec2 p, float t) {
  float cx = p.x + 0.5 * sin(t * 0.2), cy = p.y + 0.5 * cos(t * 0.3);
  float v = sin(p.x * 3.0 + t) + sin(3.0 * (p.x * sin(t * 0.5) + p.y * cos(t * 0.33)) + t)
    + sin(sqrt(9.0 * (cx * cx + cy * cy) + 1.0) + t) + sin(length(p * 4.0 + vec2(sin(t), cos(t))) - t * 2.0);
  float f = 0.5 + 0.25 * v;
  f = floor(f * 10.0) / 10.0;
  return ramp(f, uColor) + uColor2 * 0.25 * step(0.85, fract(f * 5.0));
}
vec3 rotozoom(vec2 p, float t) {
  float s = 2.2 + 1.3 * sin(t * 0.9);
  vec2 q = rot(t * 0.7) * p * s + vec2(t * 1.3, t * 0.4);
  vec2 c = floor(q);
  float chk = mod(c.x + c.y, 2.0);
  vec2 f = fract(q) - 0.5;
  float dia = smoothstep(0.32, 0.29, abs(f.x) + abs(f.y));
  float ring = smoothstep(0.03, 0.0, abs(length(f) - 0.22));
  vec3 col = mix(uColor * 0.06, uColor * 0.55, chk) + dia * (1.0 - chk) * uColor2 * 0.6 + ring * uColor * 1.4;
  float caustic = pow(abs(sin(noise(p * 4.0 + t) * 6.0 + t * 2.0)), 18.0);
  return col + caustic * uColor * 0.8;
}
vec3 fire(vec2 p, float t) {
  vec2 q = vec2(p.x * 1.3, p.y);
  float n = fbm(vec2(q.x * 2.2, q.y * 1.7 - t * 2.6)) + 0.5 * fbm(q * 4.0 - vec2(0.0, t * 4.5));
  float h = clamp(1.0 - (q.y + 1.0) * 0.5, 0.0, 1.0);
  float f = clamp(n * 1.2 * (0.2 + h * 1.15) - 0.42, 0.0, 1.0);
  vec3 col = f < 0.33 ? mix(vec3(0.0), uColor * 0.9, f * 3.0)
    : f < 0.66 ? mix(uColor * 0.9, vec3(1.0, 0.55, 0.15), (f - 0.33) * 3.0)
    : mix(vec3(1.0, 0.55, 0.15), vec3(1.25, 1.05, 0.7), (f - 0.66) * 3.0);
  return col;
}
vec3 kaleido(vec2 p, float t) {
  float r = length(p);
  float a = atan(p.y, p.x) + t * 0.35;
  float seg = PI / 3.0;
  a = mod(a, seg);
  a = abs(a - seg * 0.5);
  vec2 q = vec2(cos(a), sin(a)) * r;
  q = q * 3.2 + vec2(t * 0.6, 0.0);
  vec2 h = vec2(1.0, 1.732);
  vec2 g1 = mod(q, h) - h * 0.5;
  vec2 g2 = mod(q - h * 0.5, h) - h * 0.5;
  vec2 g = dot(g1, g1) < dot(g2, g2) ? g1 : g2;
  float hex = max(abs(g.x), dot(abs(g), normalize(vec2(1.0, 1.732))));
  float line = smoothstep(0.05, 0.0, abs(hex - 0.42));
  float inner = smoothstep(0.2, 0.18, hex);
  vec3 col = uColor2 * (0.05 + 0.25 * smoothstep(1.4, 0.0, r)) + line * uColor * 1.6 + inner * uColor2 * 0.7;
  return col + uColor * 0.6 * exp(-r * 2.5) * (0.6 + uKick);
}
vec3 twister(vec2 p, float t, float cx, float phase) {
  float twist = 1.1 + 0.9 * sin(t * 0.8 + phase);
  float ang = t * 2.0 + phase + p.y * twist + sin(p.y * 2.0 + t) * 0.6;
  float w = 0.26;
  for (int k = 0; k < 4; k++) {
    float a0 = ang + float(k) * PI * 0.5;
    float x0 = cx + sin(a0) * w, x1 = cx + sin(a0 + PI * 0.5) * w;
    if (x1 > x0 && p.x >= x0 && p.x < x1) {
      float facing = (x1 - x0) / (1.4142 * w);
      float u = (p.x - x0) / (x1 - x0);
      vec3 face = mod(float(k), 2.0) < 0.5 ? uColor : uColor2;
      float stripe = 0.75 + 0.25 * step(0.5, fract(p.y * 6.0 - t * 2.0));
      return face * (0.15 + 1.1 * facing) * (0.75 + 0.25 * sin(u * PI)) * stripe;
    }
  }
  return vec3(-1.0);
}
void main() {
  vec2 p = screen();
  float t = uTime;
  vec3 col;
  if (uEffect == 0) col = plasma(p, t);
  else if (uEffect == 1) col = rotozoom(p, t);
  else if (uEffect == 2) col = fire(p, t);
  else if (uEffect == 3) col = kaleido(p, t);
  else {
    col = mix(uColor * 0.04, uColor2 * 0.12, step(0.5, fract((p.x + p.y) * 3.0 - t)));
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      vec3 tw = twister(p, t, (fi - 1.0) * uAspect * 0.62, fi * 2.1);
      if (tw.x >= 0.0) col = tw;
    }
  }
  // Scanline banding keeps every effect in the same Amiga family.
  col *= 0.85 + 0.15 * step(0.5, fract(gl_FragCoord.y * 0.25));
  gl_FragColor = vec4(col * (0.9 + uKick * 0.25), 1.0);
}`,
  He = `
${z}
uniform vec3 uTop, uBottom;
uniform float uTravel, uStars;
void main() {
  vec2 p = screen();
  vec3 col = mix(uBottom, uTop, smoothstep(-1.0, 1.0, p.y));
  col += starfield(p, uTravel, uStars);
  gl_FragColor = vec4(col, 1.0);
}`,
  Ue = `
varying vec3 vWorld;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}`,
  We = `
uniform vec3 uLine, uMajor, uBase, uFog, uCamera;
uniform float uCell, uScroll, uFogDistance, uKick, uOpacity;
varying vec3 vWorld;
float grid(vec2 q, float width) {
  vec2 g = abs(fract(q - 0.5) - 0.5) / max(fwidth(q), vec2(1e-4));
  return 1.0 - min(min(g.x, g.y) / width, 1.0);
}
void main() {
  vec2 q = vWorld.xz / uCell + vec2(0.0, uScroll);
  float minor = grid(q, 1.1);
  float major = grid(q / 4.0, 1.6);
  float dist = length(vWorld - uCamera);
  float fog = exp(-dist / uFogDistance);
  vec3 col = uBase + minor * uLine * (0.5 + uKick * 0.6) + major * uMajor * (1.2 + uKick);
  col = mix(uFog, col, fog);
  gl_FragColor = vec4(col * uOpacity, 1.0);
}`,
  Ge = `
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 world = modelMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * viewMatrix * world;
}`,
  Ke = `
uniform vec3 uTop, uHorizon, uSunTop, uSunBottom, uMountain, uRim;
uniform vec3 uSunDir;
uniform float uSunSize, uTime, uSun, uMountains;
varying vec3 vDir;
float hash(float n) { return fract(sin(n) * 43758.5453); }
float noise1(float x) { float i = floor(x), f = fract(x); return mix(hash(i), hash(i + 1.0), f * f * (3.0 - 2.0 * f)); }
void main() {
  vec3 d = normalize(vDir);
  float h = d.y;
  vec3 col = mix(uHorizon, uTop, smoothstep(-0.02, 0.45, h));
  vec3 s = normalize(uSunDir);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), s));
  vec3 up = cross(s, right);
  vec2 disc = vec2(dot(d, right), dot(d, up)) / uSunSize;
  float r = length(disc);
  float front = step(0.0, dot(d, s));
  float sunY = disc.y;
  // Outrun stripes: gaps widen towards the bottom of the disc.
  float gap = clamp((0.15 - sunY) * 0.55, 0.0, 0.65);
  float cut = step(gap, fract(sunY * 6.0 + uTime * 0.35));
  vec3 sun = mix(uSunBottom, uSunTop, clamp(sunY * 0.5 + 0.5, 0.0, 1.0));
  col += sun * 2.4 * smoothstep(1.0, 0.985, r) * cut * front * uSun;
  col += sun * 0.5 * exp(-max(r - 1.0, 0.0) * 1.6) * front * uSun;
  // Mountains: two ridges of value noise against the horizon.
  float az = atan(d.x, d.z);
  float ridge = 0.018 + 0.06 * pow(noise1(az * 5.0 + 3.0), 2.0) + 0.025 * noise1(az * 17.0);
  float ridge2 = 0.01 + 0.035 * noise1(az * 9.0 + 11.0);
  if (h < ridge * uMountains && h > -0.05) {
    col = mix(uMountain, uMountain * 0.4, 1.0 - h / max(ridge, 1e-3));
    col += uRim * smoothstep(0.004, 0.0, abs(h - ridge * uMountains)) * 1.5;
  }
  if (h < ridge2 * uMountains && h > -0.05) col = uMountain * 0.25;
  gl_FragColor = vec4(col, 1.0);
}`,
  qe = `
attribute float aAlong;
attribute vec3 aScatter;
uniform float uAssemble;
varying float vAlong;
varying float vFresh;
varying float vDepth;
void main() {
  vAlong = aAlong;
  // Segments fly in from scattered positions as the assembly progresses.
  float local = clamp((uAssemble - aAlong * 0.75) / 0.25, 0.0, 1.0);
  float e = 1.0 - local;
  vFresh = smoothstep(0.0, 0.25, local) * (1.0 - smoothstep(0.6, 1.0, local));
  vec3 p = position + aScatter * e * e;
  vec4 view = modelViewMatrix * vec4(p, 1.0);
  vDepth = -view.z;
  gl_Position = projectionMatrix * view;
}`,
  Je = `
uniform vec3 uColor, uHead;
uniform float uReveal, uOpacity, uAssemble, uFogDistance;
varying float vAlong;
varying float vFresh;
varying float vDepth;
void main() {
  if (vAlong > uReveal) discard;
  if (uAssemble < 2.0 && uAssemble < vAlong * 0.75) discard;
  float head = smoothstep(0.04, 0.0, uReveal - vAlong) * step(uReveal, 0.999);
  vec3 col = uColor + uHead * (head * 4.0 + vFresh * 2.5);
  float fog = exp(-vDepth / uFogDistance);
  gl_FragColor = vec4(col * uOpacity * fog, 1.0);
}`,
  Ye = `
attribute vec3 aVelocity;
attribute vec4 aColor;
attribute vec2 aLife;
uniform float uTime, uSize, uPixel, uDrag;
varying vec4 vColor;
varying float vFade;
void main() {
  float age = uTime - aLife.x;
  float alive = step(0.0, age) * step(age, aLife.y);
  float k = uDrag > 0.0 ? (1.0 - exp(-uDrag * age)) / uDrag : age;
  vec3 p = position + aVelocity * k;
  vec4 view = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * view;
  vFade = alive * (1.0 - clamp(age / max(aLife.y, 1e-3), 0.0, 1.0));
  vColor = aColor;
  gl_PointSize = alive * uSize * aColor.a * uPixel / max(-view.z, 0.1) * (0.4 + 0.6 * vFade);
}`,
  Xe = `
varying vec4 vColor;
varying float vFade;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.0, d);
  a = a * a;
  gl_FragColor = vec4(vColor.rgb * a * vFade, 1.0);
}`,
  Ze = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,
  Qe = `
uniform vec3 uColor;
uniform float uTime, uPower;
varying vec2 vUv;
void main() {
  float along = vUv.y;
  float across = abs(vUv.x - 0.5) * 2.0;
  float flicker = 0.85 + 0.15 * sin(uTime * 60.0 + along * 20.0);
  float body = smoothstep(1.0, 0.0, across / max(1.0 - along * 0.85, 0.05)) * (1.0 - along);
  float core = smoothstep(0.35, 0.0, across) * smoothstep(0.5, 0.0, along);
  vec3 col = uColor * body * 2.2 + vec3(1.0, 0.95, 0.9) * core * 4.0;
  gl_FragColor = vec4(col * flicker * uPower, 1.0);
}`,
  $e = `
uniform vec3 uColor;
uniform float uTime, uPower;
varying vec3 vNormalV;
varying vec3 vViewV;
varying vec2 vUv;
void main() {
  float rim = pow(1.0 - abs(dot(normalize(vNormalV), normalize(vViewV))), 2.5);
  vec2 q = vUv * vec2(28.0, 14.0);
  vec2 h = vec2(1.0, 1.732);
  vec2 g1 = mod(q, h) - h * 0.5, g2 = mod(q - h * 0.5, h) - h * 0.5;
  vec2 g = dot(g1, g1) < dot(g2, g2) ? g1 : g2;
  float hex = max(abs(g.x), dot(abs(g), normalize(vec2(1.0, 1.732))));
  float line = smoothstep(0.06, 0.0, abs(hex - 0.45));
  float wave = 0.5 + 0.5 * sin(vUv.y * 30.0 - uTime * 6.0);
  vec3 col = uColor * (rim * 2.5 + line * (0.4 + wave * 0.8));
  gl_FragColor = vec4(col * uPower, 1.0);
}`,
  et = `
varying vec3 vNormalV;
varying vec3 vViewV;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 view = modelViewMatrix * vec4(position, 1.0);
  vNormalV = normalMatrix * normal;
  vViewV = -view.xyz;
  gl_Position = projectionMatrix * view;
}`,
  tt = `
varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vViewW;
void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewW = cameraPosition - world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}`,
  nt = `
uniform sampler2D tAlbedo, tData;
uniform vec3 uSun;
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vViewW;
void main() {
  vec3 n = normalize(vNormalW);
  vec3 v = normalize(vViewW);
  vec3 s = normalize(uSun);
  vec2 uv = vUv + vec2(uTime * 0.004, 0.0);
  vec3 albedo = texture2D(tAlbedo, uv).rgb;
  albedo = pow(albedo, vec3(2.2));
  vec4 data = texture2D(tData, uv);
  vec4 cloudData = texture2D(tData, uv + vec2(uTime * 0.002, 0.0));
  float clouds = cloudData.b;
  float day = max(dot(n, s), 0.0);
  vec3 col = mix(albedo, vec3(0.8, 0.83, 0.86), clouds * 0.85) * day * 1.35;
  vec3 h = normalize(s + v);
  col += vec3(1.0, 0.9, 0.75) * pow(max(dot(n, h), 0.0), 120.0) * data.g * (1.0 - clouds) * 0.8;
  float night = smoothstep(0.05, -0.15, dot(n, s));
  col += vec3(1.0, 0.65, 0.3) * data.r * night * (1.0 - clouds * 0.7) * 1.4;
  float rim = pow(1.0 - max(dot(n, v), 0.0), 3.0);
  col += vec3(0.25, 0.55, 1.2) * rim * (0.25 + 1.4 * smoothstep(-0.3, 0.6, dot(n, s)));
  gl_FragColor = vec4(col, 1.0);
}`,
  rt = `
uniform sampler2D tSource;
uniform vec2 uTexel;
uniform float uThreshold;
varying vec2 vUv;
vec3 tap(vec2 o) { return texture2D(tSource, vUv + o * uTexel).rgb; }
void main() {
  vec3 c = (tap(vec2(-1.0)) + tap(vec2(1.0, -1.0)) + tap(vec2(-1.0, 1.0)) + tap(vec2(1.0))) * 0.25;
  float l = max(c.r, max(c.g, c.b));
  float knee = uThreshold * 0.6;
  float soft = clamp(l - uThreshold + knee, 0.0, 2.0 * knee);
  soft = soft * soft / (4.0 * knee + 1e-4);
  float w = max(soft, l - uThreshold) / max(l, 1e-4);
  gl_FragColor = vec4(min(c * w, vec3(40.0)), 1.0);
}`,
  it = `
uniform sampler2D tSource;
uniform vec2 uTexel;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tSource, vUv).rgb * 4.0;
  c += texture2D(tSource, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  c += texture2D(tSource, vUv + uTexel * vec2(1.0, -1.0)).rgb;
  c += texture2D(tSource, vUv + uTexel * vec2(-1.0, 1.0)).rgb;
  c += texture2D(tSource, vUv + uTexel * vec2(1.0, 1.0)).rgb;
  gl_FragColor = vec4(c / 8.0, 1.0);
}`,
  at = `
uniform sampler2D tSource, tBase;
uniform vec2 uTexel;
uniform float uScatter;
varying vec2 vUv;
void main() {
  vec3 c = vec3(0.0);
  c += texture2D(tSource, vUv + uTexel * vec2(-2.0, 0.0)).rgb;
  c += texture2D(tSource, vUv + uTexel * vec2(2.0, 0.0)).rgb;
  c += texture2D(tSource, vUv + uTexel * vec2(0.0, -2.0)).rgb;
  c += texture2D(tSource, vUv + uTexel * vec2(0.0, 2.0)).rgb;
  c += texture2D(tSource, vUv + uTexel * vec2(-1.0, -1.0)).rgb * 2.0;
  c += texture2D(tSource, vUv + uTexel * vec2(1.0, -1.0)).rgb * 2.0;
  c += texture2D(tSource, vUv + uTexel * vec2(-1.0, 1.0)).rgb * 2.0;
  c += texture2D(tSource, vUv + uTexel * vec2(1.0, 1.0)).rgb * 2.0;
  c /= 12.0;
  gl_FragColor = vec4(mix(texture2D(tBase, vUv).rgb, c, uScatter), 1.0);
}`,
  ot = `
uniform sampler2D tScene, tBloom;
uniform vec2 uResolution;
uniform float uTime, uBloom, uSplit, uCurve, uScan, uVignette, uGrain;
uniform float uFlash, uFade, uLetterbox, uExposure, uCollapse, uShake;
uniform vec3 uFlashColor;
varying vec2 vUv;
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec3 aces(vec3 x) {
  x *= 0.6;
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}
vec3 toSRGB(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}
void main() {
  vec2 uv = vUv;
  vec2 centred = uv * 2.0 - 1.0;
  centred += vec2(hash(vec2(uTime, 1.0)) - 0.5, hash(vec2(uTime, 2.0)) - 0.5) * uShake * 0.02;
  // Barrel curvature for the CRT sections.
  centred *= 1.0 + uCurve * dot(centred, centred) * 0.08;
  // CRT switch-off: squash to a line, then to a dot.
  float squashY = mix(1.0, 0.006, smoothstep(0.0, 0.6, uCollapse));
  float squashX = mix(1.0, 0.002, smoothstep(0.6, 1.0, uCollapse));
  vec2 sampleUv = vec2(centred.x / squashX, centred.y / squashY) * 0.5 + 0.5;
  float inside = step(abs(centred.x), squashX) * step(abs(centred.y), squashY);
  inside *= step(0.0, sampleUv.x) * step(sampleUv.x, 1.0) * step(0.0, sampleUv.y) * step(sampleUv.y, 1.0);
  vec2 dir = sampleUv - 0.5;
  vec3 col;
  col.r = texture2D(tScene, sampleUv + dir * uSplit * 0.02).r;
  col.g = texture2D(tScene, sampleUv).g;
  col.b = texture2D(tScene, sampleUv - dir * uSplit * 0.02).b;
  col += texture2D(tBloom, sampleUv).rgb * uBloom;
  col *= uExposure * inside;
  // The squashed picture burns brighter as it shrinks to a line and a dot.
  col *= 1.0 + 2.5 * smoothstep(0.3, 1.0, uCollapse);
  col += vec3(0.7, 0.9, 1.0) * 6.0 * smoothstep(0.55, 1.0, uCollapse) * inside;
  col = aces(col);
  float line = 0.5 + 0.5 * sin(gl_FragCoord.y * 3.14159 * 0.5);
  col *= mix(1.0, 0.72 + 0.28 * line, uScan);
  float aspect = uResolution.x / uResolution.y;
  vec2 v = (vUv - 0.5) * vec2(aspect, 1.0);
  col *= mix(1.0, smoothstep(1.25, 0.25, length(v)), uVignette);
  col = mix(col, uFlashColor, clamp(uFlash, 0.0, 1.0));
  col += (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * uGrain;
  float bar = step(abs(vUv.y - 0.5), 0.5 - uLetterbox);
  col *= bar * uFade;
  gl_FragColor = vec4(toSRGB(max(col, 0.0)), 1.0);
}`,
  st = () => ({
    bloom: 1,
    threshold: 1,
    split: 0.2,
    curve: 0,
    scan: 0,
    vignette: 0.6,
    grain: 0.03,
    flash: 0,
    flashColor: new o(1, 1, 1),
    fade: 1,
    letterbox: 0,
    exposure: 1,
    collapse: 0,
    shake: 0,
  }),
  ct = class {
    constructor(t, n) {
      ((this.renderer = t),
        (this.down = []),
        (this.up = []),
        (this.holder = new e()),
        (this.camera = new u(-1, 1, 1, -1, 0, 1)));
      let r = {
        type: fe,
        format: me,
        colorSpace: S,
        depthBuffer: !1,
        generateMipmaps: !1,
        minFilter: b,
        magFilter: b,
      };
      this.scene = new le(1, 1, { ...r, depthBuffer: !0, samples: n });
      for (let e = 0; e < 5; e++) this.down.push(new le(1, 1, r));
      for (let e = 0; e < 4; e++) this.up.push(new le(1, 1, r));
      let i = (e, t) =>
        new O({
          vertexShader: Re,
          fragmentShader: e,
          uniforms: t,
          depthTest: !1,
          depthWrite: !1,
        });
      ((this.prefilter = i(rt, {
        tSource: { value: null },
        uTexel: { value: new s() },
        uThreshold: { value: 1 },
      })),
        (this.downMaterial = i(it, {
          tSource: { value: null },
          uTexel: { value: new s() },
        })),
        (this.upMaterial = i(at, {
          tSource: { value: null },
          tBase: { value: null },
          uTexel: { value: new s() },
          uScatter: { value: 0.7 },
        })),
        (this.composite = i(ot, {
          tScene: { value: this.scene.texture },
          tBloom: { value: null },
          uResolution: { value: new s(1, 1) },
          uTime: { value: 0 },
          uBloom: { value: 1 },
          uSplit: { value: 0 },
          uCurve: { value: 0 },
          uScan: { value: 0 },
          uVignette: { value: 0 },
          uGrain: { value: 0 },
          uFlash: { value: 0 },
          uFlashColor: { value: new o() },
          uFade: { value: 1 },
          uLetterbox: { value: 0 },
          uExposure: { value: 1 },
          uCollapse: { value: 0 },
          uShake: { value: 0 },
        })),
        (this.quad = new _(new w(2, 2), this.composite)),
        (this.quad.frustumCulled = !1),
        this.holder.add(this.quad));
    }
    setSize(e, t) {
      this.scene.setSize(e, t);
      let n = e,
        r = t;
      for (let e = 0; e < 5; e++)
        ((n = Math.max(1, Math.round(n / 2))),
          (r = Math.max(1, Math.round(r / 2))),
          this.down[e].setSize(n, r),
          e < 4 && this.up[e].setSize(n, r));
      this.composite.uniforms.uResolution.value.set(e, t);
    }
    pass(e, t) {
      ((this.quad.material = e),
        this.renderer.setRenderTarget(t),
        this.renderer.render(this.holder, this.camera));
    }
    compile() {
      for (let e of [
        this.prefilter,
        this.downMaterial,
        this.upMaterial,
        this.composite,
      ])
        ((this.quad.material = e),
          this.renderer.compile(this.holder, this.camera));
      this.quad.material = this.composite;
    }
    render(e, t) {
      let n = (e) => new s(1 / e.width, 1 / e.height);
      ((this.prefilter.uniforms.tSource.value = this.scene.texture),
        (this.prefilter.uniforms.uTexel.value = n(this.scene)),
        (this.prefilter.uniforms.uThreshold.value = e.threshold),
        this.pass(this.prefilter, this.down[0]));
      for (let e = 1; e < 5; e++)
        ((this.downMaterial.uniforms.tSource.value = this.down[e - 1].texture),
          (this.downMaterial.uniforms.uTexel.value = n(this.down[e - 1])),
          this.pass(this.downMaterial, this.down[e]));
      let r = this.down[4];
      for (let e = 3; e >= 0; e--)
        ((this.upMaterial.uniforms.tSource.value = r.texture),
          (this.upMaterial.uniforms.tBase.value = this.down[e].texture),
          (this.upMaterial.uniforms.uTexel.value = n(r)),
          this.pass(this.upMaterial, this.up[e]),
          (r = this.up[e]));
      let i = this.composite.uniforms;
      ((i.tBloom.value = this.up[0].texture),
        (i.uTime.value = t),
        (i.uBloom.value = e.bloom),
        (i.uSplit.value = e.split),
        (i.uCurve.value = e.curve),
        (i.uScan.value = e.scan),
        (i.uVignette.value = e.vignette),
        (i.uGrain.value = e.grain),
        (i.uFlash.value = e.flash),
        i.uFlashColor.value.copy(e.flashColor),
        (i.uFade.value = e.fade),
        (i.uLetterbox.value = e.letterbox),
        (i.uExposure.value = e.exposure),
        (i.uCollapse.value = e.collapse),
        (i.uShake.value = e.shake),
        this.pass(this.composite, null));
    }
    dispose() {
      this.scene.dispose();
      for (let e of [...this.down, ...this.up]) e.dispose();
      for (let e of [
        this.prefilter,
        this.downMaterial,
        this.upMaterial,
        this.composite,
      ])
        e.dispose();
      this.quad.geometry.dispose();
    }
  },
  lt = 8192;
