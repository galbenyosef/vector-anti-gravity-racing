import{Cr as e,Ct as t,Da as n,Dn as r,Er as i,Fr as a,Gi as o,Gn as s,Gt as c,Hi as l,Ja as u,Jr as d,Ka as f,Kr as p,Ln as m,Ma as h,Oa as g,On as _,Pr as v,Qi as y,Qn as b,Qr as x,Sn as S,Sr as ee,St as C,Un as w,Wn as te,Xr as T,Ya as ne,Yn as re,ar as ie,bt as ae,ca as oe,ci as se,da as E,ea as D,fa as ce,ir as le,jr as O,la as k,ma as ue,na as de,pa as fe,qi as pe,qr as me,rr as A,ta as j,wn as he,wr as ge,wt as _e,xt as ve,ya as ye,yn as M,zr as N}from"./index-DF2rMRzV.js";import{a as be,i as xe,n as Se,t as Ce}from"./HDRLoader-Bse-uZFj.js";var P=e=>new URL(e,document.baseURI).href;function we(e,t){let n=new Map;e.traverse(e=>{if(!(e instanceof v))return;let r=Array.isArray(e.material)?e.material:[e.material];for(let e of r)for(let r of Object.values(e)){if(!(r instanceof fe))continue;let e=r.image;if(!e?.width||!e.height||Math.max(e.width,e.height)<=t)continue;let i=n.get(e);if(!i){let r=t/Math.max(e.width,e.height);i=document.createElement(`canvas`),i.width=Math.round(e.width*r),i.height=Math.round(e.height*r),i.getContext(`2d`).drawImage(e,0,0,i.width,i.height),e.close?.(),n.set(e,i)}r.image=i,r.needsUpdate=!0}})}var Te=class{constructor(e,t){this.renderer=e,this.mobile=t,this.assets={ships:{},weapons:{},medals:[]},this.gltf=new Se,this.textures=new ue,this.disposed=!1,this.owned=new Set}async model(e){let t=await this.gltf.loadAsync(P(e));if(this.disposed)throw F(t.scene),Error(`Intro closed`);return this.mobile&&we(t.scene,256),this.owned.add(t.scene),t.scene}texture(e,t=!0){return this.textures.loadAsync(P(e)).then(e=>(t&&(e.colorSpace=y),e.anisotropy=4,e))}async environment(e){let t=await new Ce().setDataType(le).loadAsync(P(e));t.mapping=303;let n=new xe(this.renderer),r=n.fromEquirectangular(t);return t.dispose(),n.dispose(),r.texture}async ship(e){let t=await this.model(ne(e));t.updateMatrixWorld(!0);let n=[`engine_negative_x`,`engine_positive_x`].flatMap(e=>{let n=t.getObjectByName(e);return n?[t.worldToLocal(n.getWorldPosition(new g))]:[]});t.traverse(e=>{e instanceof v&&(e.frustumCulled=!1)});let r=new M().setFromObject(t).getSize(new g),i=new A;i.add(t);let a={id:e,scene:i,engines:n,length:r.z};return this.assets.ships[e]=a,a}async essentials(e){let[t,n]=await Promise.all([this.environment(`environment/launch-bay_1k.hdr`),this.environment(`environment/shanghai_bund_1k.hdr`),this.ship(e)]);this.assets.studio=t,this.assets.city=n}async rest(e){let t=[];for(let{id:n}of f)n!==e&&t.push(this.ship(n));for(let e of[`missile`,`rockets`,`mines`,`cannon`])t.push(this.model(`models/weapons/${e}.glb`).then(t=>{let n=new M().setFromObject(t),r=n.getCenter(new g),i=n.getSize(new g);t.position.sub(r);let a=new A;a.add(t),a.scale.setScalar(3.2/Math.max(i.x,i.y,i.z,.01)),this.assets.weapons[e]=a}));t.push(this.model(`models/awards.glb`).then(e=>{let t=new A;for(let n of[`Trophy`,`Trophy halo`]){let r=e.getObjectByName(n);r&&t.add(r)}let n=new M().setFromObject(t),r=n.getSize(new g),i=n.getCenter(new g);for(let e of t.children)e.position.sub(i);let a=new A;a.add(t),a.scale.setScalar(4/Math.max(r.y,.01)),this.assets.trophy=a;let o=e.getObjectByName(`Medal`);if(o){let e=new M().setFromObject(o);o.position.sub(e.getCenter(new g));let t=new A;t.add(o),t.scale.setScalar(2/Math.max(...e.getSize(new g).toArray(),.01)),this.assets.medal=t,this.owned.add(t)}this.owned.add(a)}));let n=this.mobile?`-512`:``;t.push(this.texture(`environment/lunar-earth${n}.png`).then(e=>this.assets.earth=e),this.texture(`environment/lunar-earth-data${n}.png`,!1).then(e=>this.assets.earthData=e),this.texture(`environment/lunar-milky-way${n}.png`).then(e=>this.assets.milkyWay=e),this.texture(`environment/regolith-detail${this.mobile?`-256`:``}.png`).then(e=>{e.wrapS=e.wrapT=o,this.assets.regolith=e}),Promise.all([`gold`,`silver`,`bronze`].map(e=>this.texture(`ui/awards/medal-${e}.webp`))).then(e=>this.assets.medals=e));let r=await Promise.allSettled(t);for(let e of r)e.status===`rejected`&&!this.disposed&&console.warn(`[intro] asset unavailable`,e.reason)}dispose(){this.disposed=!0;for(let e of this.owned)F(e);for(let e of Object.values(this.assets.ships))e&&F(e.scene);for(let e of[this.assets.studio,this.assets.city,this.assets.earth,this.assets.earthData,this.assets.milkyWay,this.assets.regolith,...this.assets.medals])e?.dispose()}};function F(e){e.traverse(e=>{let t=e;if(!t.geometry)return;t.geometry.dispose();let n=Array.isArray(t.material)?t.material:[t.material];for(let e of n)if(e){for(let t of Object.values(e))t instanceof fe&&t.dispose();e.dispose()}})}var Ee=5.6,I=[{x:0,strokes:[{points:[[0,5],[0,0]]},{points:[[1.3,5],[1.3,1.15]]},{points:[[2.6,5],[2.6,2.3]]}]},...[[{points:[[0,5],[1.55,0],[2.45,0],[4,5]]}],[{points:[[4,5],[0,5],[0,0],[4,0]]},{points:[[0,2.5],[3,2.5]]}],[{points:[[4,5],[1.1,5],[0,3.9],[0,1.1],[1.1,0],[4,0]]}],[{points:[[0,5],[4,5]]},{points:[[2,5],[2,0]]}],[{points:[[1.1,5],[2.9,5],[4,3.9],[4,1.1],[2.9,0],[1.1,0],[0,1.1],[0,3.9]],closed:!0}],[{points:[[0,0],[0,5]]},{points:[[0,5],[2.9,5],[4,3.9],[4,3.6],[2.9,2.5],[0,2.5]]},{points:[[2.2,2.5],[4,0]]}]].map((e,t)=>({x:4.3+t*Ee,strokes:e}))],De=.3,L=.95,Oe=-L/2,ke=I[I.length-1].x+4+L/2,Ae=ke-Oe+5*De,je=5+L,Me=(Oe+ke+5*De)/2;function Ne(e,t,n){let r=[],i=t?e.length:e.length-1;for(let t=0;t<i;t++){let[i,a]=e[t],[o,s]=e[(t+1)%e.length],c=Math.max(1,Math.ceil(Math.hypot(o-i,s-a)/n));for(let e=0;e<c;e++)r.push([i+(o-i)*e/c,a+(s-a)*e/c])}return t?r.push(r[0]):r.push(e[e.length-1]),r}function Pe(e,t,n){let r=e.length;return e.map(([i,a],o)=>{let s=t&&o===0?e[r-2]:e[Math.max(0,o-1)],c=t&&o===r-1?e[1]:e[Math.min(r-1,o+1)],l=i-s[0],u=a-s[1],d=c[0]-i,f=c[1]-a,p=Math.hypot(l,u)||1,m=Math.hypot(d,f)||1,h=-u/p,g=l/p,_=-f/m,v=d/m;o===0&&!t&&([h,g]=[_,v]),o===r-1&&!t&&([_,v]=[h,g]);let y=h+_,b=g+v,x=Math.hypot(y,b)||1;y/=x,b/=x;let S=n/Math.max(.4,y*_+b*v);return{left:[i+y*S,a+b*S],right:[i-y*S,a-b*S]}})}var Fe=(e,t)=>[e+t*De-Me,t-2.5];function Ie(){let e=[],t=[],n=[],r=[],i=[],a=[],o=[];I.forEach((s,c)=>{s.strokes.forEach((l,u)=>{let d=Ne(l.points,!!l.closed,.25).map(([e,t])=>[e+s.x,t]),f=Pe(d,!!l.closed,L/2),p=0,m=d.map((e,t)=>(t&&(p+=Math.hypot(e[0]-d[t-1][0],e[1]-d[t-1][1])),p)),h=e.length/3;f.forEach(({left:s,right:l},d)=>{for(let[o,f]of[[s,-1],[l,1]]){let[s,l]=Fe(o[0],o[1]);e.push(s,l,0),t.push(m[d]/(p||1)),n.push(f),r.push(c*.065+u*.05),i.push(o[1]/5),a.push(c)}if(d){let e=h+(d-1)*2;o.push(e,e+1,e+2,e+1,e+3,e+2)}})})});let s=new S;return s.setAttribute(`position`,new b(e,3)),s.setAttribute(`aAlong`,new b(t,1)),s.setAttribute(`aSide`,new b(n,1)),s.setAttribute(`aDelay`,new b(r,1)),s.setAttribute(`aHeight`,new b(i,1)),s.setAttribute(`aLetter`,new b(a,1)),s.setIndex(o),s}function Le(e=1.1){let t=[];for(let r of I)for(let i of r.strokes){let a=!!i.closed,o=Pe((a?[...i.points,i.points[0]]:i.points).map(([e,t])=>[e+r.x,t]),a,L/2),s;if(a){let e=o.slice(0,-1);s=new de(e.map(({left:e})=>new n(...e))),s.holes.push(new me(e.map(({right:e})=>new n(...e))))}else s=new de([...o.map(({left:e})=>e),...o.map(({right:e})=>e).reverse()].map(e=>new n(...e)));t.push(new re(s,{depth:e,bevelEnabled:!0,bevelThickness:.2,bevelSize:.12,bevelSegments:2}))}let r=Re(t);t.forEach(e=>e.dispose());let i=r.getAttribute(`position`);for(let t=0;t<i.count;t++){let[n,r]=Fe(i.getX(t),i.getY(t));i.setXYZ(t,n,r,i.getZ(t)-e/2)}return r.computeVertexNormals(),r}function Re(e){let t=[[],[]],n=[[],[]];for(let r of e){let e=r.index?r.toNonIndexed():r,i=e.getAttribute(`position`),a=e.getAttribute(`normal`);for(let e of r.groups){let r=Math.min(1,e.materialIndex??0);for(let o=e.start;o<e.start+e.count;o++)t[r].push(i.getX(o),i.getY(o),i.getZ(o)),n[r].push(a.getX(o),a.getY(o),a.getZ(o))}e!==r&&e.dispose()}let r=new S;return r.setAttribute(`position`,new b([...t[0],...t[1]],3)),r.setAttribute(`normal`,new b([...n[0],...n[1]],3)),r.addGroup(0,t[0].length/3,0),r.addGroup(t[0].length/3,t[1].length/3,1),r}var ze=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`,R=`
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
}`,Be=`
${R}
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
}`,Ve=`
${R}
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
}`,He=`
${R}
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
}`,Ue=`
${R}
uniform vec3 uTop, uBottom;
uniform float uTravel, uStars;
void main() {
  vec2 p = screen();
  vec3 col = mix(uBottom, uTop, smoothstep(-1.0, 1.0, p.y));
  col += starfield(p, uTravel, uStars);
  gl_FragColor = vec4(col, 1.0);
}`,We=`
varying vec3 vWorld;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}`,Ge=`
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
}`,Ke=`
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 world = modelMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * viewMatrix * world;
}`,qe=`
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
}`,Je=`
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
}`,Ye=`
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
}`,Xe=`
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
}`,Ze=`
varying vec4 vColor;
varying float vFade;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.0, d);
  a = a * a;
  gl_FragColor = vec4(vColor.rgb * a * vFade, 1.0);
}`,Qe=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,$e=`
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
}`,et=`
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
}`,tt=`
varying vec3 vNormalV;
varying vec3 vViewV;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 view = modelViewMatrix * vec4(position, 1.0);
  vNormalV = normalMatrix * normal;
  vViewV = -view.xyz;
  gl_Position = projectionMatrix * view;
}`,nt=`
varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vViewW;
void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewW = cameraPosition - world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}`,rt=`
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
}`,it=`
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
}`,at=`
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
}`,ot=`
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
}`,st=`
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
}`,ct=()=>({bloom:1,threshold:1,split:.2,curve:0,scan:0,vignette:.6,grain:.03,flash:0,flashColor:new _(1,1,1),fade:1,letterbox:0,exposure:1,collapse:0,shake:0}),lt=class{constructor(t,r){this.renderer=t,this.down=[],this.up=[],this.holder=new D,this.camera=new p(-1,1,1,-1,0,1);let a={type:le,format:se,colorSpace:i,depthBuffer:!1,generateMipmaps:!1,minFilter:e,magFilter:e};this.scene=new h(1,1,{...a,depthBuffer:!0,samples:r});for(let e=0;e<5;e++)this.down.push(new h(1,1,a));for(let e=0;e<4;e++)this.up.push(new h(1,1,a));let o=(e,t)=>new j({vertexShader:ze,fragmentShader:e,uniforms:t,depthTest:!1,depthWrite:!1});this.prefilter=o(it,{tSource:{value:null},uTexel:{value:new n},uThreshold:{value:1}}),this.downMaterial=o(at,{tSource:{value:null},uTexel:{value:new n}}),this.upMaterial=o(ot,{tSource:{value:null},tBase:{value:null},uTexel:{value:new n},uScatter:{value:.7}}),this.composite=o(st,{tScene:{value:this.scene.texture},tBloom:{value:null},uResolution:{value:new n(1,1)},uTime:{value:0},uBloom:{value:1},uSplit:{value:0},uCurve:{value:0},uScan:{value:0},uVignette:{value:0},uGrain:{value:0},uFlash:{value:0},uFlashColor:{value:new _},uFade:{value:1},uLetterbox:{value:0},uExposure:{value:1},uCollapse:{value:0},uShake:{value:0}}),this.quad=new v(new T(2,2),this.composite),this.quad.frustumCulled=!1,this.holder.add(this.quad)}setSize(e,t){this.scene.setSize(e,t);let n=e,r=t;for(let e=0;e<5;e++)n=Math.max(1,Math.round(n/2)),r=Math.max(1,Math.round(r/2)),this.down[e].setSize(n,r),e<4&&this.up[e].setSize(n,r);this.composite.uniforms.uResolution.value.set(e,t)}pass(e,t){this.quad.material=e,this.renderer.setRenderTarget(t),this.renderer.render(this.holder,this.camera)}compile(){for(let e of[this.prefilter,this.downMaterial,this.upMaterial,this.composite])this.quad.material=e,this.renderer.compile(this.holder,this.camera);this.quad.material=this.composite}render(e,t){let r=e=>new n(1/e.width,1/e.height);this.prefilter.uniforms.tSource.value=this.scene.texture,this.prefilter.uniforms.uTexel.value=r(this.scene),this.prefilter.uniforms.uThreshold.value=e.threshold,this.pass(this.prefilter,this.down[0]);for(let e=1;e<5;e++)this.downMaterial.uniforms.tSource.value=this.down[e-1].texture,this.downMaterial.uniforms.uTexel.value=r(this.down[e-1]),this.pass(this.downMaterial,this.down[e]);let i=this.down[4];for(let e=3;e>=0;e--)this.upMaterial.uniforms.tSource.value=i.texture,this.upMaterial.uniforms.tBase.value=this.down[e].texture,this.upMaterial.uniforms.uTexel.value=r(i),this.pass(this.upMaterial,this.up[e]),i=this.up[e];let a=this.composite.uniforms;a.tBloom.value=this.up[0].texture,a.uTime.value=t,a.uBloom.value=e.bloom,a.uSplit.value=e.split,a.uCurve.value=e.curve,a.uScan.value=e.scan,a.uVignette.value=e.vignette,a.uGrain.value=e.grain,a.uFlash.value=e.flash,a.uFlashColor.value.copy(e.flashColor),a.uFade.value=e.fade,a.uLetterbox.value=e.letterbox,a.uExposure.value=e.exposure,a.uCollapse.value=e.collapse,a.uShake.value=e.shake,this.pass(this.composite,null)}dispose(){this.scene.dispose();for(let e of[...this.down,...this.up])e.dispose();for(let e of[this.prefilter,this.downMaterial,this.upMaterial,this.composite])e.dispose();this.quad.geometry.dispose()}},ut=8192;function z(e=!1){let t=e?`--font-geist-mono`:`--font-geist-sans`;return getComputedStyle(document.body).getPropertyValue(t).trim()||(e?`'Geist Mono', monospace`:`'Geist', Arial, sans-serif`)}function dt(t,n={}){let i=z(n.mono),a=n.weight??900,o=n.size??160,s=n.tracking??.02,c=document.createElement(`canvas`),u=c.getContext(`2d`,{willReadFrequently:!0}),d=()=>`${a} ${o}px ${i}`;u.font=d();let f=()=>t.split(``).reduce((e,t)=>e+u.measureText(t).width+o*s,-o*s),p=f(),h=Math.ceil(o*.35);p+h*2>ut&&(o=Math.floor(o*(ut-h*2)/p),u.font=d(),p=f());let g=Math.ceil(o*.3);c.width=Math.ceil((p+h*2)/4)*4,c.height=Math.ceil((o*1.05+g*2)/4)*4,u.font=d(),u.textBaseline=`alphabetic`,u.fillStyle=`#fff`;let _=c.height/2+o*.355,v=h;for(let e of t.split(``))u.fillText(e,v,_),v+=u.measureText(e).width+o*s;let{data:y}=u.getImageData(0,0,c.width,c.height),b=new Uint8Array(c.width*c.height);for(let e=0;e<c.height;e++){let t=(c.height-1-e)*c.width*4,n=e*c.width;for(let e=0;e<c.width;e++)b[n+e]=y[t+e*4+3]}let x=new m(b,c.width,c.height,l,ye);return x.unpackAlignment=1,x.generateMipmaps=!0,x.minFilter=ge,x.magFilter=e,x.wrapS=x.wrapT=r,x.needsUpdate=!0,{texture:x,aspect:c.width/c.height,pad:(c.height/2-o*.355)/c.height}}var ft=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,pt=`
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
}`,mt=class{constructor(e,t={}){this.source=e,this.aspect=e.aspect,this.uniforms={tText:{value:e.texture},uOpacity:{value:1},uReveal:{value:1},uGlitch:{value:0},uSkew:{value:.18},uSplit:{value:0},uTime:{value:0},uWave:{value:0},uWaveFreq:{value:12},uWavePhase:{value:0},uScroll:{value:0},uRepeat:{value:1},uChrome:{value:0},uOutline:{value:0},uPad:{value:e.pad},uFlash:{value:0},uSweep:{value:-1},uTexAspect:{value:e.aspect},uColor:{value:new _(t.color??`#ffffff`)},uColor2:{value:new _(t.color2??t.color??`#ffffff`)}};let n=new j({uniforms:this.uniforms,vertexShader:ft,fragmentShader:pt,transparent:!0,depthTest:!1,depthWrite:!1,side:2,premultipliedAlpha:!0,blending:t.additive?2:5});t.additive||(n.blendSrc=201,n.blendDst=205),this.mesh=new v(new T(1,1),n),this.mesh.frustumCulled=!1,this.mesh.visible=!1}place(e,t,n,r){let i=n/(1-2*this.source.pad);return this.mesh.position.set(e,t,0),this.mesh.scale.set(i*this.aspect,i,1),this.uniforms.uTime.value=r,this.mesh.visible=!0,this}window(e,t,n,r,i,a){let o=n/(1-2*this.source.pad),s=o*this.aspect;return this.mesh.position.set(e,t,0),this.mesh.scale.set(r,o,1),this.uniforms.uRepeat.value=r/s,this.uniforms.uScroll.value=(i-r)/s,this.uniforms.uTime.value=a,this.mesh.visible=!0,this}widthAt(e){return e/(1-2*this.source.pad)*this.aspect}set(e){for(let[t,n]of Object.entries(e))this.uniforms[t].value=n;return this}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.source.texture.dispose()}},ht=`audio/intro-vector.mp3`,gt=60/143.91,_t=.332,vt=e=>(e-_t)/gt,B=e=>_t+e*gt,V=[{id:`boot`,from:vt(0),to:7},{id:`logo`,from:7,to:31},{id:`build`,from:31,to:47},{id:`launch`,from:47,to:63},{id:`rollcall`,from:63,to:79},{id:`circuits`,from:79,to:95},{id:`arsenal`,from:95,to:107},{id:`moon`,from:107,to:123},{id:`finale`,from:123,to:140.75}],yt=B(V[V.length-1].to);function bt(e){let t=V.findIndex(t=>e<t.to);t<0&&(t=V.length-1);let n=V[t];return{id:n.id,index:t,local:e-n.from,progress:W((e-n.from)/(n.to-n.from))}}var H=[`kestrel`,`manta`,`talon`,`monarch`,`vesper`],U=[`solstice-port-mk3`,`nocturne-exchange`,`sirocco-oasis`,`shackleton-rim`,`meridian-grand-prix`],xt=[`missile`,`rockets`,`mines`,`cannon`,`shield`],W=e=>Math.min(1,Math.max(0,e)),G=(e,t,n)=>{let r=W((n-e)/(t-e));return r*r*(3-2*r)},K=e=>1-(1-W(e))**3,q=e=>W(e)**3,J=e=>G(0,1,e),Y=(e,t=1.7)=>{let n=W(e)-1;return 1+n*n*((t+1)*n+t)},X=(e,t=6)=>e<0?0:Math.exp(-(e-Math.floor(e))*t),Z=(e,t,n=4)=>e<t?0:Math.exp(-(e-t)*n),Q=e=>new _(e),$=e=>({value:e}),St={kestrel:`#ffc84a`,manta:`#1f48ff`,talon:`#ff9b2e`,monarch:`#5a1fd0`,vesper:`#d9783c`},Ct={"solstice-port-mk3":_e,"nocturne-exchange":ve,"sirocco-oasis":t,"shackleton-rim":C,"meridian-grand-prix":ae},wt={"solstice-port-mk3":[`#ff8a3a`,`#5ff3ff`,`#04121f`,`#1c0b05`],"nocturne-exchange":[`#a35cff`,`#4ff6ff`,`#05010f`,`#14021a`],"sirocco-oasis":[`#ffae3a`,`#ff4fa3`,`#1c0614`,`#2b1003`],"shackleton-rim":[`#bcd8ff`,`#ffffff`,`#000003`,`#0a0b12`],"meridian-grand-prix":[`#ffd25a`,`#3ff0c8`,`#05101c`,`#1d1406`]},Tt={missile:`#ff6a2e`,rockets:`#ffb347`,mines:`#ff3d5a`,cannon:`#5fe6ff`,shield:`#4d8dff`},Et=[`VECTOR SYSTEMS  ·  AG-OS 21.86`,`(C) 2186 ANTI-GRAVITY RACING LEAGUE`,``],Dt=[[.12,`FLIGHT MEMORY ............ 4096K OK`],[.46,`ANTI-GRAVITY COILS ....... ONLINE`],[.8,`CIRCUITS ................. 5 FOUND`],[1.14,`CRAFT .................... 5 READY`],[1.48,`AIRBRAKES ................ CALIBRATED`],[1.82,``],[1.95,`> RUN VECTOR`]],Ot=120,kt=`VECTOR  ·  ANTI-GRAVITY RACING  ·  FIVE CRAFT  ·  FIVE CIRCUITS  ·  ONE LEAGUE  ·  AIRBRAKES DOWN, NOSE IN  ·  GREETINGS TO EVERY PILOT ON THE GRID  ·`,At=class{constructor(t,r){this.assets=t,this.options=r,this.world=new D,this.camera=new d(50,16/9,.1,9e3),this.overlay=new D,this.ortho=new p(-1,1,1,-1,-10,10),this.background=new D,this.shared={uTime:$(0),uBeat:$(0),uKick:$(0),uBass:$(0),uHigh:$(0),uLocal:$(0),uAspect:$(16/9)},this.aspect=16/9,this.pixel=500,this.time=0,this.beat=0,this.lastBeat=-10,this.disposables=[],this.texts=[],this.terminal=document.createElement(`canvas`),this.terminalText=``,this.hemi=new ie(8952319,525328,.4),this.key=new w(16777215,2.5),this.rim=new w(6737151,2),this.rigs=new Map,this.circuits=[],this.weaponHolder=new A,this.medals=[],this.t={},this.world.add(this.camera),this.world.add(this.hemi,this.key,this.rim,this.key.target,this.rim.target);let i=(e,t)=>this.track(new j({vertexShader:ze,fragmentShader:e,uniforms:{...this.shared,...t},depthTest:!1,depthWrite:!1}));this.terminal.width=1280,this.terminal.height=720,this.terminalTexture=this.track(new he(this.terminal)),this.terminalTexture.minFilter=e,this.terminalTexture.generateMipmaps=!1,this.fx={boot:i(`
${R}
uniform sampler2D tTerm;
void main() {
  vec2 p = screen();
  vec2 t = vec2(p.x / (2.0 * 1.7778) + 0.5, p.y * 0.5 + 0.5);
  float inside = step(0.0, t.x) * step(t.x, 1.0);
  float a = texture2D(tTerm, t).r * inside;
  vec3 col = vec3(0.006, 0.012, 0.016) + vec3(0.55, 1.0, 0.9) * a * 1.5;
  col *= 0.94 + 0.06 * sin(uTime * 113.0);
  col += (hash12(gl_FragCoord.xy + uTime) - 0.5) * 0.015;
  gl_FragColor = vec4(col, 1.0);
}`,{tTerm:$(this.terminalTexture)}),copper:i(Be,{uOpen:$(0),uTravel:$(0),uSpread:$(.7),uGain:$(1),uBar:$([`#ff6536`,`#54deda`,`#ff4fa3`,`#d9b572`,`#7a5cff`].map(e=>Q(e)))}),space:i(Ue,{uTop:$(Q(`#020814`)),uBottom:$(Q(`#000000`)),uTravel:$(0),uStars:$(1)}),tunnel:i(Ve,{uCenter:$(new n),uTravel:$(0),uTwist:$(0),uTint:$(Q(`#29c6ff`)),uTint2:$(Q(`#ff7a2e`))}),rollcall:i(He,{uEffect:$(0),uColor:$(Q(`#ffffff`)),uColor2:$(Q(`#ffffff`))})},this.backdrop=new v(this.track(new T(2,2)),this.fx.boot),this.backdrop.frustumCulled=!1,this.background.add(this.backdrop),this.glow=this.track(Nt()),this.groups={build:new A,launch:new A,circuits:new A,arsenal:new A,moon:new A,finale:new A};for(let e of Object.values(this.groups))this.world.add(e);this.logo=new v(this.track(Ie()),this.track(new j({vertexShader:It,fragmentShader:Lt,uniforms:{uReveal:$(0),uFill:$(0),uWobble:$(0),uTime:$(0),uKick:$(0),uOpacity:$(1),uNeon:$(Q(`#3fe6ff`).multiplyScalar(1.4)),uMark:$(Q(`#ff6637`).multiplyScalar(1.6))},transparent:!0,depthTest:!1,depthWrite:!1}))),this.logo.frustumCulled=!1,this.overlay.add(this.logo);let o=this.track(new N({color:16777215,metalness:1,roughness:.12,envMapIntensity:1.6})),s=this.track(new N({color:16738858,metalness:.85,roughness:.28,emissive:16726544,emissiveIntensity:.25}));this.chrome=new v(this.track(Le()),[o,s]),this.chrome.frustumCulled=!1,this.camera.add(this.chrome),this.shock=new v(this.track(new pe(.94,1,160)),this.track(new a({color:Q(`#9fe8ff`).multiplyScalar(2.5),transparent:!0,blending:2,depthTest:!1,depthWrite:!1}))),this.overlay.add(this.shock),this.grid=new v(this.track(new T(9e3,9e3)),this.track(new j({vertexShader:We,fragmentShader:Ge,uniforms:{uLine:$(Q(`#0c5f86`)),uMajor:$(Q(`#33d6ff`)),uBase:$(Q(`#000206`)),uFog:$(Q(`#00040b`)),uCamera:$(new g),uCell:$(2.5),uScroll:$(0),uFogDistance:$(60),uKick:$(0),uOpacity:$(1)}}))),this.grid.rotation.x=-Math.PI/2,this.grid.frustumCulled=!1,this.world.add(this.grid),this.wireMaterial=this.track(jt(`#2bb8ff`,`#bff4ff`,120));let c=[];for(let e=0;e<360;e++){let e=Math.random()*Math.PI*2,t=4+Math.random()*18,n=Math.random()*220;c.push(e,t,n,0,e,t,n,1)}let l=this.track(new S);l.setAttribute(`position`,new b(new Float32Array(720*3),3)),l.setAttribute(`aSeed`,new b(c,4)),this.streaks=new ee(l,this.track(new j({vertexShader:Rt,fragmentShader:zt,uniforms:{uTravel:$(0),uLength:$(8),uColor:$(Q(`#9fe9ff`)),uOpacity:$(1)},blending:2,depthWrite:!1,transparent:!0}))),this.streaks.frustumCulled=!1,this.groups.launch.add(this.streaks),this.particles=new Ft(r.mobile?1600:4e3),this.track(this.particles),this.world.add(this.particles.points),this.dots=Pt(r.mobile?520:900),this.track(this.dots.geometry),this.track(this.dots.material),this.groups.arsenal.add(this.dots,this.weaponHolder),this.shield=new v(this.track(new k(1,48,32)),this.track(new j({vertexShader:tt,fragmentShader:et,uniforms:{uColor:$(Q(`#4d8dff`)),uTime:$(0),uPower:$(1)},blending:2,transparent:!0,depthWrite:!1,side:2}))),this.groups.arsenal.add(this.shield),this.sky=new v(this.track(new k(4e3,48,24)),this.track(new j({vertexShader:Ke,fragmentShader:qe,uniforms:{uTop:$(Q(`#0b0326`)),uHorizon:$(Q(`#ff2f8e`).multiplyScalar(.55)),uSunTop:$(Q(`#ffe45c`)),uSunBottom:$(Q(`#ff2f9a`)),uMountain:$(Q(`#12052a`)),uRim:$(Q(`#3ff4ff`)),uSunDir:$(new g(0,.22,-1)),uSunSize:$(.3),uTime:$(0),uSun:$(1),uMountains:$(1)},side:1,depthWrite:!1}))),this.sky.frustumCulled=!1,this.sky.renderOrder=-10,this.groups.finale.add(this.sky),this.halo=new E(this.track(new ce({map:this.glow,color:Q(`#ffd27a`).multiplyScalar(2),blending:2,depthWrite:!1,transparent:!0}))),this.camera.add(this.halo),this.createType()}track(e){return this.disposables.push(e),e}attachAssets(){let e=this.assets;for(let t of Object.values(e.ships)){if(!t||this.rigs.has(t.id))continue;let e=this.track(new j({vertexShader:Qe,fragmentShader:$e,uniforms:{uColor:$(Q(u(t.id).color).lerp(Q(`#38d8ff`),.45)),uTime:$(0),uPower:$(1)},blending:2,transparent:!0,depthWrite:!1,side:2})),n=new A,r=this.track(Mt());for(let i of t.engines){let t=new v(r,e),a=new v(r,e);a.rotation.z=Math.PI/2;let o=new A;o.position.copy(i),o.add(t,a),n.add(o)}t.scene.add(n),t.scene.visible=!1,this.world.add(t.scene),this.rigs.set(t.id,{ship:t,flames:n,flame:e}),t.id===this.options.hero&&this.createWireframe(t)}for(let[t,n]of Object.entries(e.weapons))n&&!n.parent&&(n.name=t,n.visible=!1,this.weaponHolder.add(n));if(e.trophy&&!e.trophy.parent&&(e.trophy.visible=!1,this.camera.add(e.trophy)),e.milkyWay&&!this.stars&&(this.stars=new v(this.track(new k(5e3,48,24)),this.track(new a({map:e.milkyWay,color:new _(1.6,1.6,1.6),side:1,depthWrite:!1}))),this.stars.rotation.set(.5,.4,.75),this.stars.frustumCulled=!1,this.groups.moon.add(this.stars)),e.regolith&&!this.ground&&this.createGround(e.regolith),e.earth&&e.earthData&&!this.earth&&(this.earth=new v(this.track(new k(1,96,48)),this.track(new j({vertexShader:nt,fragmentShader:rt,uniforms:{tAlbedo:$(e.earth),tData:$(e.earthData),uSun:$(new g(-.85,.2,.5)),uTime:$(0)}}))),this.earth.rotation.y=-1.9,this.groups.moon.add(this.earth)),e.medals.length&&!this.medals.length)for(let t=0;t<24;t++){let n=new E(this.track(new ce({map:e.medals[t%e.medals.length],transparent:!0,depthWrite:!1})));n.visible=!1,this.medals.push(n),this.camera.add(n)}this.circuits.length||this.createCircuits()}createWireframe(e){let t=[],n=[],r=[];e.scene.updateMatrixWorld(!0);let i=e.scene.matrixWorld.clone().invert(),a=new g,o=new g,c=1/0,l=-1/0,u=[];e.scene.traverse(e=>{if(!(e instanceof v))return;let t=new s(e.geometry,26),n=i.clone().multiply(e.matrixWorld),r=t.getAttribute(`position`);for(let e=0;e<r.count;e+=2)a.fromBufferAttribute(r,e).applyMatrix4(n),o.fromBufferAttribute(r,e+1).applyMatrix4(n),u.push([a.clone(),o.clone()]),c=Math.min(c,a.z,o.z),l=Math.max(l,a.z,o.z);t.dispose()});let d=this.options.mobile?6e3:16e3,f=Math.max(1,u.length/d);for(let e=0;e<u.length;e+=f){let[i,a]=u[Math.floor(e)],o=W((l-(i.z+a.z)/2)/(l-c||1)*.82+Math.random()*.18),s=new g().randomDirection().multiplyScalar(10+Math.random()*26);t.push(i.x,i.y,i.z,a.x,a.y,a.z),n.push(o,o),r.push(s.x,s.y,s.z,s.x,s.y,s.z)}let p=this.track(new S);p.setAttribute(`position`,new b(t,3)),p.setAttribute(`aAlong`,new b(n,1)),p.setAttribute(`aScatter`,new b(r,3)),this.wire=new ee(p,this.wireMaterial),this.wire.frustumCulled=!1,this.groups.build.add(this.wire)}createGround(e){let t=2400,n=this.options.mobile?110:180,r=this.track(new T(t,t,n,n));r.rotateX(-Math.PI/2);let i=[],a=7,o=()=>(a=Math.imul(a,1664525)+1013904223>>>0,a/4294967296);for(let e=0;e<140;e++){let e=6+o()**3*90;i.push([(o()-.5)*t,(o()-.5)*t,e,.22+o()*.18])}i.push([-40,-70,38,.3],[70,-160,55,.28]);let s=r.getAttribute(`position`);for(let e=0;e<s.count;e++){let t=s.getX(e),n=s.getZ(e),r=Math.sin(t*.011)*Math.cos(n*.013)*2.2+Math.sin(t*.031+n*.02)*.8;for(let[e,a,o,s]of i){let i=Math.hypot(t-e,n-a)/o;i>1.6||(r+=i<1?-s*o*.35*(1-i*i):0,r+=s*o*.12*Math.exp(-(((i-1)/.18)**2)))}r*=G(8,40,Math.hypot(t,n)),s.setY(e,r)}r.computeVertexNormals(),e.repeat.set(160,160),this.ground=new v(r,this.track(new N({map:e,color:11841706,roughness:.97,metalness:0}))),this.ground.position.y=-1,this.groups.moon.add(this.ground)}createCircuits(){for(let e of U){let t=Ct[e],[n,r]=wt[e],i=this.options.mobile?480:900,a=[],o=[],s=[];for(let e=0;e<i;e++){let n=e/i*t.length;a.push(t.point(n)),o.push(t.point(n,-16*2.4)),s.push(t.point(n,16*2.4))}let c=new M().setFromPoints(a),l=c.getSize(new g),u=c.getCenter(new g),d=66/Math.max(l.x,l.z),f=e=>new g((e.x-u.x)*d,(e.y-c.min.y)*d*1.7,(e.z-u.z)*d),p=a.map(f),m=[o.map(f),s.map(f)],h={position:[],along:[]},_={position:[],along:[]},v=(e,t,n,r,i)=>{e.position.push(t.x,t.y,t.z,n.x,n.y,n.z),e.along.push(r,i)};for(let e=0;e<i;e++){let t=(e+1)%i,n=e/i,r=t===0?1:t/i;v(h,p[e],p[t],n,r);for(let i of m)v(h,i[e],i[t],n,r);let a=p[e].clone().setY(-1.97);v(_,a,p[t].clone().setY(-1.97),n,r),e%9==0&&v(_,p[e],a,n,n)}let y=(e,t)=>{let n=this.track(new S);n.setAttribute(`position`,new b(e.position,3)),n.setAttribute(`aAlong`,new b(e.along,1)),n.setAttribute(`aScatter`,new b(new Float32Array(e.along.length*3),3));let r=new ee(n,t);return r.frustumCulled=!1,r},x=this.track(jt(n,r,400,1.6)),C=this.track(jt(n,r,400,.35)),w=new A;w.add(y(h,x),y(_,C));let te=[r,`#ffffff`,n].map(e=>{let t=new E(this.track(new ce({map:this.glow,color:Q(e).multiplyScalar(4),blending:2,depthWrite:!1,transparent:!0})));return t.scale.setScalar(3.2),w.add(t),t});w.visible=!1,this.groups.circuits.add(w);let T=new oe().setFromPoints([...p,...p.map(e=>e.clone().setY(-2))]);this.circuits.push({group:w,bright:x,dim:C,path:p,racers:te,centre:T.center,radius:T.radius})}}text(e,t,n,r){let i=(n.size??160)*(this.options.mobile?.7:1),a=new mt(dt(t,{...n,size:i}),r);return this.texts.push(a),this.overlay.add(a.mesh),this.t[e]=a,a}createType(){let e=u(this.options.hero);this.text(`subtitle`,`ANTI-GRAVITY RACING`,{weight:600,size:90,tracking:.42},{color:`#bff6ff`,color2:`#5fd8ff`}),this.text(`scroller`,kt,{weight:900,size:128,tracking:.03}),this.t.mirror=new mt(this.t.scroller.source),this.overlay.add(this.t.mirror.mesh),this.text(`hud`,`${e.code}  ${e.name.toUpperCase()}  //  STRUCTURE SCAN`,{mono:!0,weight:500,size:64,tracking:.08},{additive:!0,color:`#7fe7ff`});for(let e of[`3`,`2`,`1`])this.text(`count${e}`,e,{weight:900,size:320},{additive:!0,color:`#9ff0ff`,color2:`#2b8cff`});[`VECTOR`,`ANTI-GRAVITY`,`RACING`,`LEAGUE 2186`].forEach((e,t)=>this.text(`word${t}`,e,{weight:900,size:200,tracking:.02}));for(let e of H){let t=u(e);this.text(`ship-${e}`,t.name.toUpperCase(),{weight:900,size:200,tracking:.04}),this.text(`code-${e}`,t.code,{mono:!0,weight:700,size:90,tracking:.12},{additive:!0,color:t.color}),this.text(`shape-${e}`,t.shape.toUpperCase(),{mono:!0,weight:500,size:60,tracking:.18},{additive:!0,color:`#ffffff`}),this.text(`number-${e}`,t.number,{weight:900,size:320},{additive:!0,color:t.color,color2:St[e]})}U.forEach((e,t)=>{let n=c.find(t=>t.id===e),[r]=wt[e];this.text(`circuit-${e}`,n.name.replace(` MK III`,``).toUpperCase(),{weight:900,size:180,tracking:.03}),this.text(`detail-${e}`,`${n.category}  ·  ${n.lengthLabel}  ·  ${n.timeOfDay}`,{mono:!0,weight:500,size:60,tracking:.16},{additive:!0,color:r}),this.text(`index-${e}`,`0${t+1}`,{weight:900,size:320},{additive:!0,color:r})});for(let e of xt)this.text(`weapon-${e}`,e.toUpperCase(),{weight:900,size:220,tracking:.06},{color:`#ffffff`,color2:Tt[e]});this.text(`awaits`,`THE LEAGUE AWAITS`,{weight:300,size:110,tracking:.5},{additive:!0,color:`#e8f2ff`}),this.text(`league`,`AG RACING LEAGUE  ·  2186`,{mono:!0,weight:500,size:70,tracking:.3},{additive:!0,color:`#ffd9a8`})}async compile(e){let t=[];this.world.traverse(e=>{e.visible||(e.visible=!0,t.push(e))}),this.overlay.traverse(e=>{e.visible||(e.visible=!0,t.push(e))}),this.world.environment=this.assets.studio??null;let n=[e.compileAsync(this.world,this.camera),e.compileAsync(this.overlay,this.ortho)],r=this.backdrop.material;for(let t of Object.values(this.fx))this.backdrop.material=t,n.push(e.compileAsync(this.background,this.ortho));this.backdrop.material=r;for(let e of t)e.visible=!1;await Promise.all(n)}resize(e,t){this.aspect=e/t,this.camera.aspect=this.aspect,this.camera.updateProjectionMatrix(),this.ortho.left=-this.aspect,this.ortho.right=this.aspect,this.ortho.updateProjectionMatrix(),this.shared.uAspect.value=this.aspect,this.pixel=t/(2*Math.tan(O.degToRad(this.camera.fov)/2))}gate(e,t){this.reset(e,-1);let n=Math.floor(e*1.6)%2==0,r=e=>{let t=Math.round(W(e)*16);return`▮`.repeat(t)+`▯`.repeat(16-t)},i=[...Et];if(t.ready&&t.blocked)i.push(`WAITING FOR SOUND ...`,``,(t.touch?`TAP TO START WITH SOUND`:`CLICK OR PRESS ANY KEY FOR SOUND`)+(n?` _`:``));else if(t.ready&&t.starting)i.push(`READY.`,``,`STARTING SOUND`+(n?` _`:``));else if(t.ready)i.push(`READY.`,``,(t.touch?`TAP TO START`:`PRESS ANY KEY`)+(n?` _`:``));else if(t.hold){let n=t.hold.progress;i.push(`> ${t.hold.stage.toUpperCase()}`,n===null?`LOADING `+r(e*.6%1):`LOADING ${r(n)} ${String(Math.round(n*100)).padStart(3)}%`,``,t.waiting?`STARTING WHEN READY`:`ESC SKIPS THE INTRO`)}else i.push(`LOADING `+r(e*.6%1));return this.drawTerminal(i),this.backdrop.material=this.fx.boot,this.backdrop.visible=!0,{...ct(),curve:1,scan:1,grain:.05,vignette:1,split:.35,bloom:1.1,threshold:.6}}reset(e,t){this.time=e,this.beat=t,this.shared.uTime.value=e,this.shared.uBeat.value=t;for(let e of Object.values(this.groups))e.visible=!1;for(let e of this.rigs.values())e.ship.scene.visible=!1;for(let e of this.texts)e.mesh.visible=!1;this.t.mirror.mesh.visible=!1,this.logo.visible=!1,this.chrome.visible=!1,this.shock.visible=!1,this.grid.visible=!1,this.halo.visible=!1,this.particles.points.visible=!1,this.assets.trophy&&(this.assets.trophy.visible=!1);for(let e of this.medals)e.visible=!1;for(let e of this.circuits)e.group.visible=!1;this.backdrop.visible=!1,this.world.environment=this.assets.studio??null,this.world.environmentIntensity=1,this.world.environmentRotation.set(0,0,0),this.camera.fov=50}frame(e){let{time:t,beat:n}=e;this.reset(t,n);let r=bt(n),i=r.id!==`boot`&&r.id!==`build`&&r.id!==`moon`?X(n,5):0;this.shared.uKick.value=i,this.shared.uBass.value=e.bass,this.shared.uHigh.value=e.high,this.shared.uLocal.value=r.local;let a=ct();({boot:()=>this.boot(a),logo:()=>this.logoAct(a,r.local,i),build:()=>this.build(a,e),launch:()=>this.launch(a,i),rollcall:()=>this.rollcall(a,i),circuits:()=>this.circuitsAct(a,i),arsenal:()=>this.arsenal(a,i),moon:()=>this.moon(a),finale:()=>this.finale(a,i)})[r.id](),this.particles.update(t,this.pixel),this.camera.updateProjectionMatrix();for(let e of this.rigs.values())e.flame.uniforms.uTime.value=t;return this.lastBeat=n,a}crossed(e){return this.lastBeat<e&&this.beat>=e&&this.beat-this.lastBeat<2}showShip(e,t=1){let n=this.rigs.get(e);return n?(n.ship.scene.visible=!0,n.ship.scene.scale.setScalar(1),n.flame.uniforms.uPower.value=t,n.flames.visible=t>.01,n.ship.scene):null}lights(e,t,n,r,i=.35){this.key.color.set(e),this.key.intensity=t,this.rim.color.set(n),this.rim.intensity=r,this.hemi.intensity=i}drawTerminal(e){let t=e.join(`
`);if(t===this.terminalText)return;this.terminalText=t;let n=this.terminal.getContext(`2d`);n.fillStyle=`#000`,n.fillRect(0,0,this.terminal.width,this.terminal.height),n.fillStyle=`#fff`,n.font=`500 30px ${z(!0)}`,n.textBaseline=`top`,e.forEach((e,t)=>n.fillText(e,150,150+t*48)),this.terminalTexture.needsUpdate=!0}boot(e){let t=this.time,n=[...Et];for(let[e,r]of Dt){if(t<e)break;n.push(r.slice(0,Math.floor((t-e)*Ot)))}Math.floor(t*4)%2==0&&(n[n.length-1]+=` _`),this.drawTerminal(n),this.backdrop.material=this.fx.boot,this.backdrop.visible=!0,Object.assign(e,{curve:1,scan:1,grain:.05,vignette:1,split:.35,bloom:1.1,threshold:.6,collapse:G(5.3,6.9,this.beat)})}logoAct(e,t,n){let r=this.beat,i=this.fx.copper;i.uniforms.uOpen.value=K(t/1.2),i.uniforms.uTravel.value=this.time*.05,i.uniforms.uSpread.value=.55+.2*G(15,19,r),i.uniforms.uGain.value=.42+.58*G(14.8,15.2,r),this.backdrop.material=i,this.backdrop.visible=!0;let a=G(14.8,15.2,r),o=Math.min(this.aspect*1.62,3.2)/Ae,s=1+.035*n*a;this.logo.visible=!0,this.logo.position.set(0,.16+Math.sin(this.time*1.3)*.015*a,0),this.logo.scale.setScalar(o*s);let c=this.logo.material.uniforms;c.uReveal.value=W((r-8)/6.5)*1.12,c.uFill.value=a,c.uWobble.value=.2*G(23,24,r)*(1-G(29,31,r)*.6),c.uTime.value=this.time,c.uKick.value=n,c.uOpacity.value=1;let l=.16-je*o/2;if(r>16.5&&this.t.subtitle.place(0,l-.12,.05,this.time).set({uReveal:W((r-16.5)/2),uOpacity:1,uSkew:0,uSweep:this.time*.4%1.6-.3}),r>15){let e=(this.time-B(15))*1.15,t=.16+.06*Math.sin(this.time*.7),r=this.aspect*2;this.t.scroller.window(0,-.66,.13,r,e,this.time).set({uChrome:1,uWave:t,uWaveFreq:7,uWavePhase:-this.time*4.2,uOpacity:1,uSkew:.15,uSplit:.002*n}),this.t.mirror.window(0,-.88,.13,r,e,this.time).set({uChrome:1,uWave:t*1.3,uWaveFreq:7,uWavePhase:-this.time*4.2+.6,uOpacity:.22,uSkew:-.15}),this.t.mirror.mesh.scale.y*=-.6}Object.assign(e,{curve:.35,scan:.3,vignette:.8,split:.25+n*.35,bloom:1.05,threshold:.95,flash:Z(r,7,3)*.7+Z(r,15,3)*.5,flashColor:Q(`#bfefff`)})}build(e,t){let n=this.beat,r=W((n-31)/12),i=G(43,47,n);this.groups.build.visible=!0;let a=this.fx.space;a.uniforms.uTop.value.set(`#03112a`),a.uniforms.uBottom.value.set(`#000000`),a.uniforms.uTravel.value=this.time*(.03+i*.2),a.uniforms.uStars.value=.8,this.backdrop.material=a,this.backdrop.visible=!0,this.grid.visible=!0,this.grid.position.set(0,-1.6,0);let o=this.grid.material.uniforms;o.uLine.value.set(`#0b5c84`),o.uMajor.value.set(`#33d6ff`),o.uBase.value.set(`#000206`),o.uFog.value.set(`#000309`),o.uCell.value=2.5,o.uFogDistance.value=70,o.uScroll.value=-this.time*(.2+i*3),o.uKick.value=X(n*2,6)*i,o.uOpacity.value=1;let s=this.wireMaterial.uniforms;s.uAssemble.value=r,s.uReveal.value=2,s.uOpacity.value=1+i*1.5+t.high*.5;let c=2.3+(n-31)*.11+i*.6,l=O.lerp(17,11.5,J(r))-i*3.5,u=O.lerp(5.5,2.4,r);this.camera.position.set(Math.sin(c)*l,u,Math.cos(c)*l),this.camera.lookAt(0,.4,0),this.camera.fov=46-i*8,o.uCamera.value.copy(this.camera.position),[`3`,`2`,`1`].forEach((e,t)=>{let r=n-(35+t*4);if(r<0||r>4)return;let i=1.18-.18*K(r/.6)+r*.02;this.t[`count${e}`].place(0,.02,1.05*i,this.time).set({uOutline:1,uSkew:.12,uOpacity:G(0,.08,r)*(1-G(3,4,r))*.85,uGlitch:Z(r,0,5),uSplit:.01*Z(r,0,3)})}),this.t.hud.place(-this.aspect+.08+this.t.hud.widthAt(.035)/2,.86,.035,this.time).set({uReveal:W((n-31.5)/2),uOpacity:.9,uSkew:0}),Object.assign(e,{vignette:.85,split:.25+i*1.4,bloom:1.2,threshold:.8,flash:.22*X(n*2,5)*G(43,45,n)+q((n-46)/1)*1,flashColor:Q(`#e8fbff`),shake:i*.25})}launch(e,t){let n=this.beat,r=n-47,i=q((n-61)/2),a=Math.sin(r*Math.PI/4)*1.7,o=this.fx.tunnel,s=(this.time-B(47))*(7+i*30)+i*6;o.uniforms.uTravel.value=s,o.uniforms.uTwist.value=this.time*.15+Math.sin(r*.4)*.3,o.uniforms.uCenter.value.set(-a*.04,.06),this.backdrop.material=o,this.backdrop.visible=!0,this.groups.launch.visible=!0,this.streaks.material.uniforms.uTravel.value=s*9,this.streaks.material.uniforms.uLength.value=6+i*30,this.lights(`#ffffff`,2.2,`#ff7a2e`,3.5,.25),this.key.position.set(3,6,8),this.rim.position.set(-4,2,-10),this.world.environment=this.assets.city??this.assets.studio??null,this.world.environmentIntensity=1.2;let c=this.showShip(this.options.hero,1.4+t*.6+i*2);c&&(c.position.set(a,.15*Math.sin(this.time*3.1)+t*.06,-i*140),c.rotation.set(-.04+t*.03,Math.PI+a*.06,-Math.cos(r*Math.PI/4)*.42)),this.camera.position.set(a*.35,2.1+t*.1,9.5),this.camera.lookAt(a*.55,.7,-20),this.camera.fov=56+t*1.5+i*10,[`VECTOR`,`ANTI-GRAVITY`,`RACING`,`LEAGUE 2186`].forEach((e,n)=>{let i=r-n*4;if(i<0||i>4)return;let a=Y(i/.4,2.4);this.t[`word${n}`].place(0,.5,.24*(1+(1-a)*.5),this.time).set({uChrome:1,uOpacity:G(0,.05,i)*(1-G(3.2,3.95,i)),uGlitch:Z(i,0,5)+Z(i,2,8)*.5,uSplit:.008*Z(i,0,3)+.002*t,uSweep:i/2.2%1.6-.3,uSkew:.22})}),Object.assign(e,{vignette:.7,split:.3+t*.55,bloom:1.15,threshold:1,flash:Z(n,47,2.2),shake:t*.22+i*.3})}rollcall(e,t){let n=this.beat,r=Math.min(4,Math.floor((n-63)/3)),i=H[r],a=n-(63+r*3),o=u(i),s=this.fx.rollcall;s.uniforms.uEffect.value=r,s.uniforms.uColor.value.set(o.color),s.uniforms.uColor2.value.set(St[i]),this.backdrop.material=s,this.backdrop.visible=!0,this.lights(`#ffffff`,2.6,o.color,5,.3),this.key.position.set(6,8,10),this.rim.position.set(-6,3,-8),this.world.environment=this.assets.studio??null,this.world.environmentIntensity=1.1;let c=this.showShip(i,1.2+t*.5);if(c){let e=K(a/.7),t=q((a-2.45)/.55);c.position.set(O.lerp(26,0,e)-t*32,.12*Math.sin(this.time*2.4),0),c.rotation.set(.1,-Math.PI/2+1.05-a*.22,(1-e)*.55-t*.4)}this.camera.position.set(0,2.6,12.5),this.camera.lookAt(0,.1,0),this.camera.fov=40;let l=1-G(2.55,2.95,a),d=Y((a-.15)/.35,2.2);a>.15&&this.t[`ship-${i}`].place(0,-.6,.22*(1+(1-d)*.4),this.time).set({uChrome:1,uOpacity:l,uGlitch:Z(a,.15,6),uSplit:.006*Z(a,.15,4),uSweep:(a-.4)/1.6%1.6,uSkew:.22}),this.t[`shape-${i}`].place(0,-.82,.04,this.time).set({uReveal:W((a-.45)/.7),uOpacity:l,uSkew:0}),this.t[`code-${i}`].place(0,.8,.065,this.time).set({uReveal:W((a-.05)/.4),uOpacity:l,uSkew:0}),this.t[`number-${i}`].place(this.aspect-.8,.3,.8,this.time).set({uOutline:1,uOpacity:.55*l*G(0,.2,a),uSkew:.2,uGlitch:Z(a,0,4)}),Object.assign(e,{vignette:.55,scan:.25,split:.3+Z(a,0,4)*2+t*.3+G(78.4,79,n)*2,bloom:.95,threshold:1.15,flash:Z(a,0,5)*.45,flashColor:Q(o.color).lerp(Q(`#ffffff`),.6),shake:t*.1})}circuitsAct(e,t){let n=this.beat,r=Math.min(4,Math.floor((n-79)/3)),i=U[r],a=n-(79+r*3),[o,s,c,l]=wt[i];this.groups.circuits.visible=!0;let u=this.fx.space;u.uniforms.uTop.value.set(c),u.uniforms.uBottom.value.set(l),u.uniforms.uTravel.value=this.time*.04,u.uniforms.uStars.value=.7,this.backdrop.material=u,this.backdrop.visible=!0,this.grid.visible=!0,this.grid.position.set(0,-2,0);let d=this.grid.material.uniforms;d.uLine.value.set(o).multiplyScalar(.12),d.uMajor.value.set(o).multiplyScalar(.45),d.uBase.value.set(l).multiplyScalar(.4),d.uFog.value.set(l),d.uCell.value=4,d.uFogDistance.value=150,d.uScroll.value=0,d.uKick.value=t,d.uOpacity.value=1;let f=this.circuits[r];if(f){f.group.visible=!0;let e=K(a/1.7)*1.001;for(let n of[f.bright,f.dim])n.uniforms.uReveal.value=e,n.uniforms.uOpacity.value=n===f.bright?1.6+t*.8:.35,n.uniforms.uColor.value.set(o),n.uniforms.uHead.value.set(s);f.racers.forEach((t,n)=>{let r=(this.time*.11+n*.045)%1,i=r<e;t.visible=i,i&&t.position.copy(f.path[Math.floor(r*f.path.length)]).add(new g(0,.6,0))})}let p=.5+r*1.25+a*.2,m=f?.radius??40,h=f?.centre??new g,_=m/Math.sin(O.degToRad(22))*1.02,v=.62-a*.03;this.camera.position.set(h.x+Math.sin(p)*Math.cos(v)*_,h.y+Math.sin(v)*_,h.z+Math.cos(p)*Math.cos(v)*_),this.camera.lookAt(h.x,h.y-m*.32,h.z),this.camera.fov=44,d.uCamera.value.copy(this.camera.position);let y=1-G(2.6,2.98,a),b=Y(a/.35,2);this.t[`circuit-${i}`].place(0,-.64,.16*(1+(1-b)*.4),this.time).set({uChrome:1,uOpacity:y*G(0,.05,a),uGlitch:Z(a,0,6),uSplit:.005*Z(a,0,4),uSweep:a/1.8%1.6,uSkew:.2}),this.t[`detail-${i}`].place(0,-.83,.038,this.time).set({uReveal:W((a-.3)/.8),uOpacity:y,uSkew:0}),this.t[`index-${i}`].place(-this.aspect+.55,.55,.62,this.time).set({uOutline:1,uOpacity:.6*y,uSkew:.2,uGlitch:Z(a,0,4)}),Object.assign(e,{vignette:.7,split:.25+t*.3+Z(a,0,4)*1.5,bloom:1.25,threshold:.85,flash:Z(a,0,5)*.3,flashColor:Q(s),shake:t*.08})}arsenal(e,t){let n=this.beat,r=n-95,i=1-G(105.5,107,n);this.groups.arsenal.visible=!0,this.particles.points.visible=!0;let a=this.fx.space;a.uniforms.uTop.value.set(`#1a0306`),a.uniforms.uBottom.value.set(`#020001`),a.uniforms.uTravel.value=this.time*.06,a.uniforms.uStars.value=.6*i,this.backdrop.material=a,this.backdrop.visible=!0,this.lights(`#ffffff`,2.4,`#ff6a2e`,4,.3),this.key.position.set(4,6,6),this.rim.position.set(-5,2,-8),this.world.environment=this.assets.city??null,this.camera.position.set(0,0,0),this.camera.lookAt(0,0,-1),this.camera.fov=55,this.dots.position.set(0,0,-34),this.dots.rotation.set(this.time*.3,this.time*.45,0),this.dots.scale.setScalar((1+t*.08)*(.4+.6*i)),this.dots.material.uniforms.uTime.value=this.time,this.dots.material.uniforms.uPixel.value=this.pixel,xt.slice(0,4).forEach((e,t)=>{let n=r-t*2,i=this.weaponHolder.getObjectByName(e),a=new g(Math.sin(t*2.1)*1.6,Math.cos(t*1.7)*.8,-9);if(i&&n>=0&&n<1?(i.visible=!0,i.position.copy(a).setZ(O.lerp(-80,-10,K(n/.3))),i.scale.setScalar(Y(n/.35,2.2)*(i.userData.scale??=i.scale.x)),i.rotation.set(this.time*1.4+t,this.time*2.2,.4)):i&&(i.visible=!1),this.crossed(96+t*2)&&this.explode(a,Tt[e]),n>=0&&n<2){let t=Y(n/.3,2.4);this.t[`weapon-${e}`].place(0,.62,.2*(1+(1-t)*.5),this.time).set({uOpacity:1-G(1.4,1.95,n),uGlitch:Z(n,0,5)+Z(n,1,5),uSplit:.008*Z(n,1,3),uSkew:.22,uSweep:n%1.6})}});let o=n-103;if(o>=0){let e=this.showShip(this.options.hero,.8*i),n=Y(o/.5,2)*i;e&&(e.position.set(0,-.6,-15),e.rotation.set(.25,.6+this.time*.6,0),e.scale.setScalar(Math.max(.001,.4+.6*i))),this.shield.visible=!0,this.shield.position.set(0,-.4,-15),this.shield.scale.setScalar(Math.max(.001,n*6)),this.shield.material.uniforms.uTime.value=this.time,this.shield.material.uniforms.uPower.value=(.8+t*.8)*i,o<2&&this.t[`weapon-shield`].place(0,.62,.2,this.time).set({uOpacity:1-G(1.4,1.95,o),uGlitch:Z(o,0,5),uSkew:.22,uSweep:o%1.6})}else this.shield.visible=!1;let s=0;for(let e=0;e<4;e++)s=Math.max(s,Z(r,1+e*2,4));Object.assign(e,{vignette:.8,split:.3+t*.4+s*.9,bloom:1.3,threshold:.9,flash:s*.16,flashColor:Q(`#ffe6c8`),shake:s*.9+t*.1,fade:.25+.75*i})}explode(e,t){let n=Q(t);this.particles.burst(e,this.options.mobile?260:600,this.time,{speed:[6,34],life:[.5,1.6],colors:[n.clone().multiplyScalar(2.2),Q(`#ffffff`).multiplyScalar(2.6),Q(`#ffd36a`).multiplyScalar(2.2)],size:[.5,1.5]})}moon(e){let t=this.beat,n=t-107,r=J(n/12);this.groups.moon.visible=!0,this.world.environment=this.assets.studio??null,this.world.environmentIntensity=.35;let i=new g(-.85,.2,.5).normalize();if(this.lights(`#fff6ea`,4,`#7fb3ff`,1.5,.04),this.key.position.copy(i).multiplyScalar(50),this.rim.position.set(6,3,-10),this.camera.position.set(O.lerp(-13,-7.5,r),O.lerp(1.7,2.6,r),O.lerp(17,11,r)),this.camera.lookAt(O.lerp(2.5,3.5,r),O.lerp(3.2,4.2,r),-8),this.camera.fov=42,this.stars&&this.stars.position.copy(this.camera.position),this.earth){let e=K(n/11);this.earth.position.set(900,O.lerp(-90,300,e),-760),this.earth.scale.setScalar(170),this.earth.rotation.y=-1.9+this.time*.03,this.earth.material.uniforms.uTime.value=this.time}let a=this.showShip(this.options.hero,.45);a&&(a.position.set(0,2.3+Math.sin(this.time*1.4)*.2,0),a.rotation.set(.05,.25+n*.03,Math.sin(this.time*.9)*.04),a.scale.setScalar(1)),this.t.awaits.place(0,-.62,.05,this.time).set({uReveal:W((n-2)/4),uOpacity:.85*(1-G(10.5,12,n)),uSkew:0,uSweep:(n-4)/4%1.6});let o=t-119,s=this.assets.trophy;if(o>=0){let e=K(o/3);s&&(s.visible=!0,s.position.set(0,O.lerp(-6,-.2,e),-8),s.rotation.set(.08,this.time*1.2,0),s.scale.setScalar(1.7+o*.08)),this.halo.visible=!0,this.halo.position.set(0,O.lerp(-5,.2,e),-12),this.halo.scale.setScalar(3+e*5+o*.8),this.halo.material.opacity=.2+e*.35,this.lights(`#fff3dc`,4+e*3,`#ffd27a`,3+e*5,.04)}Object.assign(e,{letterbox:.11*(1-G(121,123,t)),vignette:.9,split:.1+o*.1*Number(o>0),bloom:.95,threshold:1.2,grain:.045,exposure:1.1,flash:q((t-121.5)/1.5)*1,flashColor:Q(`#fff4e0`),fade:G(107,108,t)})}finale(e,t){let n=this.beat,r=n-123;this.groups.finale.visible=!0,this.world.environment=this.assets.city??this.assets.studio??null,this.world.environmentIntensity=1.3,this.world.environmentRotation.set(0,this.time*.35,0),this.lights(`#ffd6f0`,2.4,`#3ff4ff`,4,.4),this.key.position.set(0,6,-30),this.rim.position.set(0,10,30);let i=J((n-131)/8);this.camera.position.set(Math.sin(this.time*.4)*2,O.lerp(7.5,19,i)+t*.1,O.lerp(32,2,i)),this.camera.lookAt(0,O.lerp(4,2,i),-60),this.camera.fov=52+t,this.sky.position.copy(this.camera.position);let a=this.sky.material.uniforms;a.uTime.value=this.time,this.grid.visible=!0,this.grid.position.set(0,0,0);let o=this.grid.material.uniforms;o.uLine.value.set(`#ff2fa0`).multiplyScalar(.35),o.uMajor.value.set(`#3ff4ff`).multiplyScalar(.9),o.uBase.value.set(`#07001a`),o.uFog.value.copy(a.uHorizon.value),o.uCell.value=6,o.uFogDistance.value=420,o.uScroll.value=-(this.time-B(123))*9,o.uKick.value=t,o.uCamera.value.copy(this.camera.position);let s=[this.options.hero,...H.filter(e=>e!==this.options.hero)],c=[[0,0],[-7.5,8],[7.5,8],[-15,16],[15,16]];s.forEach((e,n)=>{let i=this.showShip(e,1.6+t*.6);if(!i)return;let[a,o]=c[n],s=K((r-n*.25)/2);i.position.set(a,3.5+Math.sin(this.time*2+n)*.25,o+(1-s)*60),i.rotation.set(0,Math.PI,Math.sin(this.time*1.6+n)*.12),i.scale.setScalar(1)});let l=40*Math.tan(O.degToRad(this.camera.fov)/2),u=Math.min(l*this.aspect*.74/Ae,l*.24/je),d=Y(r/.55,1.6);if(this.chrome.visible=!0,this.chrome.position.set(0,l*.17,-20),this.chrome.scale.setScalar(u*(1+(1-d)*3)*(1+t*.02)),this.chrome.rotation.set(-.12+Math.sin(this.time*.7)*.05,Math.sin(this.time*.5)*.14,0),this.medals.forEach((e,t)=>{let n=r-4-t*.12;if(n<0)return;e.visible=!0;let i=this.time*1.25+t*.2618,a=Math.cos(i);e.position.set(Math.sin(i)*l*this.aspect*.42,l*.17+Math.sin(this.time*2.1+t*.52)*l*.3,-20+a*6),e.scale.setScalar(l*.09*(1+a*.25)*Y(n/.4))}),this.t.subtitle.place(0,.040000000000000036,.05,this.time).set({uReveal:W((r-1.5)/2),uOpacity:1-G(139,140.3,n),uSkew:0,uSweep:this.time*.4%1.6-.3}),r>8&&this.t.league.place(0,-.82,.04,this.time).set({uReveal:W((r-8)/2),uOpacity:1-G(139.4,140.4,n),uSkew:0}),r<1.5){this.shock.visible=!0;let e=K(r/1.4);this.shock.position.set(0,.34,0),this.shock.scale.setScalar(.1+e*this.aspect*1.6),this.shock.material.opacity=1-e}let f=G(139.6,140.7,n);Object.assign(e,{vignette:.6,split:.25+t*.45+Z(r,0,3)*3,bloom:1.25,threshold:1,flash:Z(r,0,2.2)*.85+Z(n,139,1.6)*.8,shake:Z(r,0,3)*1.2+t*.12,fade:1-f})}render(e,t){e.setRenderTarget(t),e.setClearColor(0,1),e.clear(!0,!0,!0),this.backdrop.visible&&e.render(this.background,this.ortho),e.render(this.world,this.camera),e.clearDepth(),e.render(this.overlay,this.ortho)}dispose(){for(let e of this.texts)e.dispose();this.t.mirror.mesh.geometry.dispose(),this.t.mirror.mesh.material.dispose();for(let e of this.disposables)e.dispose();for(let e of this.rigs.values())e.ship.scene.remove(e.flames)}};function jt(e,t,n,r=1){return new j({vertexShader:Je,fragmentShader:Ye,uniforms:{uColor:$(Q(e)),uHead:$(Q(t)),uReveal:$(1),uOpacity:$(r),uAssemble:$(3),uFogDistance:$(n)},blending:2,transparent:!0,depthWrite:!1})}function Mt(){let e=new T(.85,3.6);return e.rotateX(-Math.PI/2),e.translate(0,0,-1.8),e}function Nt(){let e=document.createElement(`canvas`);e.width=e.height=128;let t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.2,`rgba(255,255,255,0.55)`),n.addColorStop(.5,`rgba(255,255,255,0.12)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,128,128),new he(e)}function Pt(e){let t=[],n=[],r=Math.PI*(3-Math.sqrt(5)),i=Q(`#ff7a2e`),a=Q(`#ffd36a`);for(let o=0;o<e;o++){let s=1-o/(e-1)*2,c=Math.sqrt(1-s*s),l=r*o;t.push(Math.cos(l)*c*10,s*10,Math.sin(l)*c*10);let u=i.clone().lerp(a,(s+1)/2).multiplyScalar(2.2);n.push(u.r,u.g,u.b,1.3)}let o=new S;o.setAttribute(`position`,new b(t,3)),o.setAttribute(`aVelocity`,new b(new Float32Array(e*3),3)),o.setAttribute(`aColor`,new b(n,4)),o.setAttribute(`aLife`,new b(Array.from({length:e},()=>[-1,1e7]).flat(),2));let s=new x(o,new j({vertexShader:Xe,fragmentShader:Ze,uniforms:{uTime:$(0),uSize:$(.42),uPixel:$(500),uDrag:$(0)},blending:2,transparent:!0,depthWrite:!1}));return s.frustumCulled=!1,s}var Ft=class{constructor(e){this.capacity=e,this.cursor=0;let t=new S,n=t=>{let n=new b(new Float32Array(e*t),t);return n.setUsage(te),n};this.attributes={position:n(3),aVelocity:n(3),aColor:n(4),aLife:n(2)};for(let t=0;t<e;t++)this.attributes.aLife.setXY(t,-100,0);for(let[e,n]of Object.entries(this.attributes))t.setAttribute(e,n);this.points=new x(t,new j({vertexShader:Xe,fragmentShader:Ze,uniforms:{uTime:$(0),uSize:$(.35),uPixel:$(500),uDrag:$(2.2)},blending:2,transparent:!0,depthWrite:!1})),this.points.frustumCulled=!1}burst(e,t,n,r){let i=new g;for(let a=0;a<t;a++){let t=this.cursor;this.cursor=(this.cursor+1)%this.capacity,i.randomDirection();let o=O.lerp(r.speed[0],r.speed[1],Math.random()**1.5),s=r.colors[a%r.colors.length];this.attributes.position.setXYZ(t,e.x,e.y,e.z),this.attributes.aVelocity.setXYZ(t,i.x*o,i.y*o,i.z*o),this.attributes.aColor.setXYZW(t,s.r,s.g,s.b,O.lerp(r.size[0],r.size[1],Math.random())),this.attributes.aLife.setXY(t,n,O.lerp(r.life[0],r.life[1],Math.random()))}for(let e of Object.values(this.attributes))e.needsUpdate=!0}update(e,t){this.points.material.uniforms.uTime.value=e,this.points.material.uniforms.uPixel.value=t}dispose(){this.points.geometry.dispose(),this.points.material.dispose()}},It=`
attribute float aAlong, aSide, aDelay, aHeight, aLetter;
uniform float uReveal, uWobble, uTime;
varying float vAlong, vSide, vHeight, vLetter, vLocal;
void main() {
  vAlong = aAlong;
  vSide = aSide;
  vHeight = aHeight;
  vLetter = aLetter;
  vLocal = clamp((uReveal - aDelay) / 0.55, 0.0, 1.0);
  vec3 p = position;
  // The Amiga wobble: each scanline of the logo slides on its own sine.
  p.x += sin(p.y * 1.25 + uTime * 5.0) * uWobble;
  p.y += sin(p.x * 0.3 + uTime * 3.0) * uWobble * 0.35;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`,Lt=`
uniform float uFill, uKick, uOpacity, uTime;
uniform vec3 uNeon, uMark;
varying float vAlong, vSide, vHeight, vLetter, vLocal;
void main() {
  if (vAlong > vLocal + 0.0001) discard;
  float edge = abs(vSide);
  float head = smoothstep(0.07, 0.0, vLocal - vAlong) * step(vLocal, 0.999);
  vec3 neon = uNeon * (0.18 + 2.2 * smoothstep(0.55, 1.0, edge));
  float h = vHeight;
  vec3 chrome = h > 0.5
    ? mix(vec3(1.0, 0.98, 0.95), vec3(0.16, 0.42, 1.0), pow((h - 0.5) * 2.0, 0.7))
    : mix(vec3(0.22, 0.06, 0.02), vec3(1.0, 0.7, 0.35), pow(max(h, 0.0) * 2.0, 1.3));
  chrome += vec3(1.5) * smoothstep(0.035, 0.0, abs(h - 0.5));
  // A copper highlight rolling down through the chrome.
  float band = fract(uTime * 0.35);
  chrome += vec3(1.6, 1.1, 0.7) * smoothstep(0.07, 0.0, abs(h - 1.2 + band * 1.4));
  chrome = mix(chrome, uMark * (0.55 + 0.8 * h), step(vLetter, 0.5));
  vec3 filled = chrome * (1.0 + uKick * 0.3) + uNeon * smoothstep(0.78, 1.0, edge) * 1.6;
  vec3 col = mix(neon, filled, uFill) + vec3(3.5) * head;
  gl_FragColor = vec4(col * uOpacity, uOpacity);
}`,Rt=`
attribute vec4 aSeed;
uniform float uTravel, uLength;
varying float vEnd;
void main() {
  float z = mod(aSeed.z + uTravel, 220.0) - 200.0 + aSeed.w * uLength;
  vec3 p = vec3(cos(aSeed.x) * aSeed.y, sin(aSeed.x) * aSeed.y, z);
  vEnd = aSeed.w;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`,zt=`
uniform vec3 uColor;
uniform float uOpacity;
varying float vEnd;
void main() {
  gl_FragColor = vec4(uColor * (0.1 + vEnd * 1.4) * uOpacity, 1.0);
}`,Bt=e=>new Promise(t=>setTimeout(t,e)),Vt=class{constructor(e,t){this.host=e,this.options=t,this.canvas=document.createElement(`canvas`),this.director=null,this.context=null,this.buffer=null,this.source=null,this.gain=null,this.analyser=null,this.spectrum=new Uint8Array(256),this.startAt=0,this.clockStart=0,this.pausedAt=0,this.silent=!1,this.phase=`gate`,this.blocked=!1,this.unlockedAt=-1/0,this.loaded=!1,this.hold=null,this.wantsStart=!1,this.frame=0,this.last=0,this.skipAt=0,this.bass=0,this.high=0,this.width=0,this.height=0,this.gateStart=performance.now(),this.disposed=!1,this.visibility=()=>{document.hidden?(this.context?.suspend().catch(()=>{}),this.silent&&(this.pausedAt=performance.now())):((this.phase===`playing`||this.phase===`ending`)&&this.context?.resume().catch(()=>{}),this.silent&&this.pausedAt&&(this.clockStart+=performance.now()-this.pausedAt,this.pausedAt=0))},this.loop=e=>{if(this.disposed||this.phase===`ended`)return;this.frame=requestAnimationFrame(this.loop);let t=this.director;if(!t)return;let n=Math.min(.1,(e-(this.last||e))/1e3);this.last=e;try{let r=(e-this.gateStart)/1e3,i;if(this.phase===`gate`||this.phase===`starting`)i=t.gate(r,{ready:this.isReady,touch:this.options.touch,hold:this.loaded?this.hold:null,waiting:this.wantsStart,blocked:this.blocked,starting:this.phase===`starting`});else{if(r=this.clock(),r>=yt)return this.finish(`complete`);if(this.analyse(),i=t.frame({time:Math.max(0,r),beat:vt(r),dt:n,bass:this.bass,high:this.high,width:this.width,height:this.height}),this.phase===`ending`){let t=1-(e-this.skipAt)/400;if(t<=0)return this.finish(`skipped`);i.fade*=t}}t.render(this.renderer,this.post.scene),this.post.render(i,r)}catch(e){console.error(`[intro] stopped`,e),this.finish(`error`)}},this.canvas.className=`vector-intro-canvas`,e.appendChild(this.canvas),this.renderer=new be({canvas:this.canvas,antialias:!1,alpha:!1,stencil:!1,powerPreference:`high-performance`}),this.renderer.autoClear=!1,this.renderer.outputColorSpace=i,this.renderer.toneMapping=0,this.post=new lt(this.renderer,t.mobile?0:4),this.loader=new Te(this.renderer,t.mobile),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.resize(),document.addEventListener(`visibilitychange`,this.visibility),this.frame=requestAnimationFrame(this.loop)}get autoplay(){return this.context?.state===`running`}get isReady(){return this.loaded&&!this.hold}setHold(e){this.hold=e,this.isReady&&this.wantsStart&&this.begin()}get hasLoaded(){return this.loaded}get isPlaying(){return this.phase===`playing`}async load(){let e=this.options.hero,t=this.loadAudio();if(await Promise.all([`900 100px ${z()}`,`300 100px ${z()}`,`500 30px ${z(!0)}`].map(e=>document.fonts.load(e).catch(()=>[]))),this.disposed)return;let n=new At(this.loader.assets,{hero:e,mobile:this.options.mobile});this.director=n,n.resize(this.width,this.height),this.post.compile();let r=this.loader.essentials(e).catch(e=>{this.disposed||console.warn(`[intro] essentials unavailable`,e)}),i=r.then(()=>this.loader.rest(e)).then(()=>{if(!this.disposed)return n.attachAssets(),n.compile(this.renderer)}).catch(e=>{this.disposed||console.warn(`[intro] late assets`,e)});await Promise.all([t,r]),!this.disposed&&(n.attachAssets(),await n.compile(this.renderer).catch(()=>{}),await Promise.race([i,Bt(1e4)]),!this.disposed&&(this.loaded=!0,this.isReady&&this.wantsStart&&this.begin()))}async loadAudio(){try{this.context=new AudioContext({latencyHint:`interactive`});let e=await fetch(new URL(ht,document.baseURI).href);if(!e.ok)throw Error(`HTTP ${e.status}`);let t=await e.arrayBuffer(),n=new OfflineAudioContext(2,1,48e3);this.buffer=await n.decodeAudioData(t)}catch(e){console.warn(`[intro] music unavailable`,e)}}requestStart(){this.phase!==`gate`&&this.phase!==`starting`||(this.wantsStart=!0,this.unlockAudio(),this.phase===`gate`&&this.isReady&&this.begin())}unlockAudio(){let e=this.context;if(e?.state!==`running`){if(performance.now()-this.unlockedAt<1e3){e?.resume().catch(()=>{});return}try{let t=new AudioContext({latencyHint:`interactive`}),n=t.createBufferSource();n.buffer=t.createBuffer(1,1,t.sampleRate),n.connect(t.destination),n.start(),t.resume().catch(()=>{}),this.context=t,this.unlockedAt=performance.now(),e&&e.state!==`closed`&&e.close().catch(()=>{})}catch{e?.resume().catch(()=>{})}}}async begin(){if(this.phase!==`gate`)return;this.phase=`starting`;let e=this.options.freeze!==void 0;if(this.buffer&&!e){this.context?.resume().catch(()=>{});let e=performance.now();for(;this.context?.state!==`running`;){if(await Bt(40),this.disposed||this.phase!==`starting`)return;!this.blocked&&performance.now()-e>2500&&(this.blocked=!0,console.info(`[intro] waiting for sound`,JSON.stringify({state:this.context?.state??null})))}this.blocked=!1}let t=this.context,n=Math.max(0,this.options.seek??0);if(t?.state===`running`&&this.buffer&&!e){let e=t.createBufferSource();e.buffer=this.buffer;let r=t.createAnalyser();r.fftSize=512,r.smoothingTimeConstant=.55;let i=t.createGain();i.gain.value=this.options.volume,e.connect(r),r.connect(i),i.connect(t.destination);let a=t.currentTime+.1;e.start(a,n),this.startAt=a-n,Object.assign(this,{source:e,analyser:r,gain:i})}else this.silent=!0,this.clockStart=performance.now()+100-n*1e3;this.phase=`playing`,console.info(`[intro] start`,JSON.stringify({silent:this.silent,state:t?.state??null,pressed:this.unlockedAt>-1/0}))}skip(){if(this.phase===`gate`||this.phase===`starting`)return this.finish(`skipped at the gate`);if(this.phase===`playing`&&(this.phase=`ending`,this.skipAt=performance.now(),this.gain&&this.context)){let e=this.context.currentTime;this.gain.gain.cancelScheduledValues(e),this.gain.gain.setValueAtTime(this.gain.gain.value,e),this.gain.gain.linearRampToValueAtTime(0,e+.4)}}finish(e){if(this.phase!==`ended`){console.info(`[intro] end`,JSON.stringify({reason:e,at:+this.clockNow().toFixed(2)})),this.phase=`ended`;try{this.source?.stop()}catch{}this.options.onEnd()}}clockNow(){return this.phase===`gate`||this.phase===`starting`?0:this.clock()}clock(){if(this.options.freeze!==void 0){let e=window.__introFreeze;return typeof e==`number`?e:this.options.freeze}if(this.silent)return((this.pausedAt||performance.now())-this.clockStart)/1e3;let e=this.context,t=(e.outputLatency||0)+(e.baseLatency||0);return e.currentTime-this.startAt-t}resize(){let e=this.host.getBoundingClientRect(),t=Math.min(window.devicePixelRatio||1,2),n=Math.max(2,e.width*t),r=Math.max(2,e.height*t),i=this.options.mobile?11e5:28e5,a=Math.min(1,Math.sqrt(i/(n*r)));n=Math.round(n*a),r=Math.round(r*a),!(n===this.width&&r===this.height)&&(this.width=n,this.height=r,this.renderer.setPixelRatio(1),this.renderer.setSize(n,r,!1),this.post.setSize(n,r),this.director?.resize(n,r))}analyse(){let e=this.analyser;if(!e||!this.context)return;e.getByteFrequencyData(this.spectrum);let t=this.context.sampleRate/e.fftSize,n=0,r=0,i=0,a=Math.max(1,Math.floor(150/t));for(let e=1;e<=a;e++)n+=this.spectrum[e];for(let n=Math.floor(4e3/t);n<e.frequencyBinCount;n++,i++)r+=this.spectrum[n];this.bass+=(n/a/255-this.bass)*.5,this.high+=(r/Math.max(1,i)/160-this.high)*.5}dispose(){if(!this.disposed){this.disposed=!0,cancelAnimationFrame(this.frame),this.resizeObserver.disconnect(),document.removeEventListener(`visibilitychange`,this.visibility);try{this.source?.stop()}catch{}this.context?.close().catch(()=>{}),this.director?.dispose(),this.loader.dispose(),this.post.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.canvas.remove()}}};export{Vt as IntroPlayer};