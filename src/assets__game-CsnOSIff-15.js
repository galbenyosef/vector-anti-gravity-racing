// assets__game-CsnOSIff 15 — math
// Lines 4445-4769 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function Vc(e) {
  return new I({
    name: e.name,
    color: e.color,
    map: e.map,
    normalMap: e.normalMap,
    roughness: e.roughness,
    metalness: e.metalness,
    roughnessMap: e.roughnessMap,
    metalnessMap: e.metalnessMap,
  });
}
async function Hc(e, t) {
  let n = Zr([t.sun, t.sky]),
    { scene: r } = await Ja(Ic),
    a = new pn();
  a.name = `Nocturne Exchange · Blender city`;
  let o = L(1.5),
    s = L(0),
    c = L(1),
    l = new Map(),
    u = new Set(),
    d = (t, r) => {
      let a = t.uuid + (r ? `:unlit` : ``),
        d = l.get(a);
      if (d) return d;
      let f = t,
        p = t;
      switch (t.name) {
        case `Nocturne glazing`:
          p = r ? Bc(f, 1.35) : zc(f, 1.35);
          break;
        case `Nocturne tenement facade`:
          p = zc(f, 1.25);
          break;
        case `Holo screens`: {
          let e = new I({ name: t.name, roughness: 0.3, metalness: 0 }),
            n = qr(Er.add(5)).mul(16).floor(),
            r = K(n.mod(4), n.div(4).floor()).mul(0.25);
          ((e.colorNode = q(0.01)),
            (e.emissiveNode = R(f.emissiveMap, X().add(r)).rgb.mul(o)),
            (e.emissiveMap = f.emissiveMap),
            (p = e));
          break;
        }
        case `Neon cyan`:
          p = e.pulseCyan;
          break;
        case `Neon violet`:
          p = e.pulseViolet;
          break;
        case `Neon amber`:
          p = e.pulseAmber;
          break;
        case `Neon magenta`:
          p = new we({
            name: t.name,
            color: new _(`#ff3ea0`).multiplyScalar(1.8),
          });
          break;
        case `Neon white`:
          p = new we({
            name: t.name,
            color: new _(`#dcecff`).multiplyScalar(1.7),
          });
          break;
        case `Aviation red`: {
          let e = new i({ name: t.name }),
            n = G(0.78, z(s.mul(0.5).add(qr(Er.add(3)))))
              .mul(c)
              .add(B(1).sub(c));
          ((e.colorNode = q(2.6, 0.12, 0.08).mul(n.mul(0.85).add(0.15))),
            (p = e));
          break;
        }
        default:
          p = Da(Vc(f));
      }
      return (p instanceof I && (p.lightsNode = n), u.add(t), l.set(a, p), p);
    };
  try {
    r.updateMatrixWorld(!0);
    let e = {},
      t = new Map();
    for (let n of ds) {
      let i = r.children.find((e) => e.userData.assetId === n);
      if (!i) throw Error(`Nocturne city kit is missing ${n}.`);
      let a = new Jn().setFromObject(i);
      if (a.isEmpty() || a.max.y > 260 || a.min.y < -10)
        throw Error(`Invalid Nocturne bounds for ${n}.`);
      (t.set(n, i), (e[n] = { min: a.min.toArray(), max: a.max.toArray() }));
    }
    let n = JSON.parse(t.get(`exchange-gate`).userData.passage),
      i = Ss(e),
      l = {},
      f = 0,
      p = 0;
    for (let e of ds) {
      let n = i.filter((t) => t.asset === e);
      ((l[e] = n.length),
        n.length &&
          t.get(e).traverse((t) => {
            if (!(t instanceof N)) return;
            let r =
              (t.geometry.index?.count ??
                t.geometry.attributes.position.count) / 3;
            ((p += r), (f += r * n.length));
            let i = io(
              t.geometry.clone().applyMatrix4(t.matrixWorld),
              d(t.material, Lc.has(e)),
              n.length,
            );
            ((i.name = `${e} · ${t.name}`),
              (i.castShadow = i.receiveShadow = !1),
              n.forEach((e, t) => i.setMatrixAt(t, e.matrix)),
              (i.instanceMatrix.needsUpdate = !0),
              i.computeBoundingBox(),
              i.computeBoundingSphere(),
              a.add(i));
          }));
    }
    r.traverse((e) => {
      e instanceof N && e.geometry.dispose();
    });
    for (let e of u) e.dispose();
    return (
      Ua(r, a),
      {
        group: a,
        passage: n,
        placements: i,
        update(e, t, n) {
          ((s.value = t),
            (c.value = +!n),
            (o.value = n ? 1.5 : 1.35 + e.level * 0.45));
        },
        info: {
          source: `Blender`,
          loaded: !0,
          kit: `Nocturne Exchange`,
          assets: ds.length,
          instances: i.length,
          counts: l,
          drawBatches: a.children.length,
          prototypeTriangles: p,
          instanceTriangles: f,
        },
      }
    );
  } catch (e) {
    throw (
      a.traverse((e) => {
        e instanceof N &&
          (e.geometry.dispose(), e instanceof Wn && e.dispose());
      }),
      Dc(r),
      e
    );
  }
}
var Uc = {
    centerX: 46,
    centerZ: -53,
    size: 2400,
    step: 8,
    farSize: 15e3,
    farStep: 120,
  },
  Wc = 2.2,
  Gc = [
    { x: 560, z: 300, a: 175, b: 140, angle: 0.5, top: 218, seed: 11 },
    { x: 275, z: -210, a: 200, b: 128, angle: -2.27, top: 206, seed: 23 },
  ],
  Kc = [
    { x: -250, z: -40, a: 250, b: 150, angle: 0.15 },
    { x: -560, z: -300, a: 190, b: 300, angle: 0.1 },
    { x: -640, z: 60, a: 220, b: 170, angle: -0.3 },
    { x: 60, z: 120, a: 120, b: 70, angle: 0.4 },
  ],
  qc = {
    path: [
      [420, -730],
      [200, -530],
      [35, -395],
      [-130, -255],
      [-310, -115],
    ],
    halfWidth: 17,
    bed: -4.5,
  },
  Jc = { x: -300, z: -565, radius: 330, height: 4 },
  Yc = { x: 250, z: 220, a: 260, b: 210, angle: 0.9 };
function Xc(e, t, n) {
  let r = Math.imul(e, 374761393) ^ Math.imul(t, 668265263) ^ n;
  return (
    (r = Math.imul(r ^ (r >>> 13), 1274126177)),
    ((r ^ (r >>> 16)) >>> 0) / 4294967296
  );
}
function Zc(e, t, n = 0) {
  let r = Math.floor(e),
    i = Math.floor(t),
    a = e - r,
    o = t - i,
    s = a * a * (3 - 2 * a),
    c = o * o * (3 - 2 * o),
    l = Xc(r, i, n),
    u = Xc(r + 1, i, n),
    d = Xc(r, i + 1, n),
    f = Xc(r + 1, i + 1, n);
  return l + (u - l) * s + (d - l) * c + (l - u - d + f) * s * c;
}
function Qc(e, t, n = 4, r = 0) {
  let i = 0,
    a = 0.5,
    o = 0;
  for (let s = 0; s < n; s++)
    ((i += Zc(e, t, r + s * 101) * a),
      (o += a),
      (e = e * 2.03 + 17.1),
      (t = t * 2.03 - 9.7),
      (a *= 0.5));
  return i / o;
}
var $c = (e, t, n) => {
    let r = Math.max(0, Math.min(1, (n - e) / (t - e)));
    return r * r * (3 - 2 * r);
  },
  el = (e, t, n) => e + (t - e) * n;
function tl(e, t, n) {
  let r = t - e.x,
    i = n - e.z,
    a = Math.cos(e.angle),
    o = Math.sin(e.angle),
    s = r * a + i * o,
    c = -r * o + i * a;
  return Math.hypot(s / e.a, c / e.b);
}
function nl(e, t, [n, r], [i, a]) {
  let o = i - n,
    s = a - r,
    c = Math.max(0, Math.min(1, ((e - n) * o + (t - r) * s) / (o * o + s * s)));
  return Math.hypot(e - n - o * c, t - r - s * c);
}
function rl(e, t) {
  let n = 1 / 0;
  for (let r = 1; r < qc.path.length; r++)
    n = Math.min(n, nl(e, t, qc.path[r - 1], qc.path[r]));
  return n;
}
function il(e, t, n, r, i, a) {
  let o = e * n + t * r,
    s = -e * r + t * n,
    c = Qc(s / 330, o / 700, 3, a) * 140 + Qc(s / 90, o / 160, 2, a + 3) * 22,
    l = 0.75 + Qc(e / 900, t / 900, 2, a + 5) * 0.6,
    u = (o + c) / (i * l),
    d = u - Math.floor(u),
    f = d < 0.74 ? d / 0.74 : (1 - d) / 0.26,
    p = $c(0.25, 0.7, Qc(s / 140, o / 520, 3, a + 9));
  return $c(0, 1, f) * p;
}
function al(e, t) {
  let n = 0.3 + 0.7 * Qc(e / 520, t / 520, 3, 31);
  return (
    2.5 +
    il(e, t, 0.83, 0.56, 160, 7) * 10 * n +
    il(e, t, 0.28, 0.96, 260, 17) * 6 * (1.2 - n) +
    Qc(e / 700, t / 700, 3, 3) * 9 +
    Qc(e / 45, t / 45, 2, 61) * 0.8
  );
}
function ol(e, t) {
  let n = 0,
    r = (Qc(e / 140, t / 140, 3, 51) - 0.5) * 0.35;
  for (let i of Kc) n = Math.max(n, $c(1.05, 0.55, tl(i, e, t) + r));
  return n;
}
var sl = { from: [-340, 0], to: [170, 20], clear: 150 };
function cl(e, t, n) {
  let r = nl(t, n, sl.from, sl.to),
    i = tl(e, t, n) + Math.max(0, sl.clear - r) / 70,
    a = Math.atan2(n - e.z, t - e.x);
  return (
    i +
    ((Qc(Math.cos(a) * 3 + e.seed, Math.sin(a) * 3, 4, e.seed) - 0.5) * 0.28 +
      (Qc(t / 60, n / 60, 2, e.seed + 5) - 0.5) * 0.08)
  );
}
function ll(e, t) {
  let n = al(e, t),
    r = $c(1.1, 0.6, tl(Yc, e, t));
  n = el(n, 5 + Qc(e / 90, t / 90, 2, 71) * 2.5, r * 0.85);
  let i = ol(e, t);
  ((n = el(n, -6 + Qc(e / 60, t / 60, 2, 9) * 2, i)),
    i < 0.05 && (n = Math.max(n, 0.6)));
  let a = $c(Jc.radius, Jc.radius * 0.72, Math.hypot(e - Jc.x, t - Jc.z));
  n = el(n, Jc.height + Qc(e / 50, t / 50, 2, 4) * 0.6, a);
  for (let r of Gc) {
    let i = cl(r, e, t);
    if (i > 1.5) continue;
    let a = $c(1.03, 0.97, i),
      o = $c(0.93, 0.85, i) * 6 + $c(1, 0.93, i) * 3,
      s = r.top - 9 + o + Qc(e / 45, t / 45, 3, r.seed + 9) * 2.5,
      c = $c(1.45, 1.01, i) ** 1.6 * 38;
    n = Math.max(n, el(n + c, s, a));
  }
  let o = rl(e, t);
  return (
    o < qc.halfWidth + 14 &&
      (n = el(
        qc.bed,
        Math.max(n, 3),
        $c(qc.halfWidth - 1, qc.halfWidth + 12, o),
      )),
    n
  );
}
var ul = [
    [1e3, 1420],
    [1860, 2380],
  ],
  dl = -1,
  fl = [],
  pl = new Map(),
  ml = 64;
