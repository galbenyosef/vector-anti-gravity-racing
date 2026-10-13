// assets__game-CsnOSIff 22 — math
// Lines 6529-6634 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function du() {
  let e = iu.clone(),
    t = new g(0, 1, 0),
    n = t
      .clone()
      .addScaledVector(e, -t.dot(e))
      .normalize()
      .applyAxisAngle(e, tu(ru.roll)),
    r = new g().crossVectors(e, n).normalize(),
    i = e.clone().negate(),
    a = tu(ru.subLatitude),
    o = n
      .clone()
      .multiplyScalar(Math.cos(a))
      .addScaledVector(i, Math.sin(a))
      .normalize(),
    s = i.clone().addScaledVector(o, -i.dot(o)).normalize();
  return {
    forward: e,
    up: n,
    right: r,
    north: o,
    meridian: s,
    east: new g().crossVectors(o, s).normalize(),
  };
}
var fu = [
  [227.23, -8.89, -1.46, 0],
  [261.21, -25.29, -0.74, 0.15],
  [315.73, -0.68, -0.27, 0.71],
  [15.12, 69.11, -0.05, 1.23],
  [67.45, 19.24, 0.03, 0],
  [162.59, 4.57, 0.08, 0.8],
  [209.24, -25.25, 0.13, -0.03],
  [213.7, 13.02, 0.34, 0.42],
  [290.84, -58.79, 0.46, -0.16],
  [199.79, -8.96, 0.5, 1.85],
  [311.77, 1.25, 0.61, -0.23],
  [47.74, -8.91, 0.76, 0.22],
  [300.13, -0.36, 0.76, -0.24],
  [180.97, -20.25, 0.86, 1.54],
  [351.95, 15.06, 0.96, 1.83],
  [316.11, 50.84, 0.97, -0.23],
  [192.23, 23.41, 1.14, 1],
  [20.49, -64.91, 1.16, 0.09],
  [84.28, 1.99, 1.25, 0.09],
  [302.46, 3.18, 1.25, -0.23],
  [226.43, 48.93, 1.35, -0.11],
  [239.83, -11.33, 1.5, -0.21],
  [351.74, -2.21, 1.62, -0.22],
  [300.17, 5.67, 1.64, 1.59],
];
function pu(e = cu.highCount) {
  let t = 1597463007,
    n = () => (
      (t = (Math.imul(t, 1664525) + 1013904223) >>> 0),
      t / 4294967296
    ),
    r = fu.map(([e, t, n, r]) => ({
      direction: uu(e, t),
      magnitude: n,
      colorIndex: r,
    })),
    { north: i } = lu(),
    a = 0.45,
    o = 10 ** (a * 1.7),
    c = 10 ** (a * cu.faintest),
    l = new g();
  for (; r.length < e;) {
    let e = n() * 2 - 1,
      t = n() * Math.PI * 2,
      u = Math.sqrt(1 - e * e);
    l.set(u * Math.cos(t), e, u * Math.sin(t));
    let d = l.dot(i);
    if (n() > 0.32 + 0.68 * Math.exp(-((d / 0.22) ** 2))) continue;
    let f = Math.log10(o + n() * (c - o)) / a,
      p = s.clamp(0.15 + (n() - 0.35) * 1.3 + (f - 4) * 0.05, -0.3, 1.9);
    r.push({ direction: l.clone(), magnitude: f, colorIndex: p });
  }
  return r;
}
function mu(e, t = new _()) {
  let n = [
      [-0.3, [0.62, 0.72, 1]],
      [0, [0.8, 0.86, 1]],
      [0.4, [1, 0.97, 0.94]],
      [0.8, [1, 0.88, 0.72]],
      [1.2, [1, 0.78, 0.55]],
      [1.9, [1, 0.6, 0.36]],
    ],
    r = 0;
  for (; r < n.length - 2 && e > n[r + 1][0];) r++;
  let [i, a] = n[r],
    [o, c] = n[r + 1],
    l = s.clamp((e - i) / (o - i), 0, 1);
  t.setRGB(
    a[0] + (c[0] - a[0]) * l,
    a[1] + (c[1] - a[1]) * l,
    a[2] + (c[2] - a[2]) * l,
  );
  let u = (t.r + t.g + t.b) / 3;
  return t.lerp(new _(u, u, u), 0.25);
}
function hu(e) {
  return cu.faintIntensity * 10 ** (0.4 * cu.contrast * (cu.faintest - e));
}
