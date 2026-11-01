// assets__game-D43Oxqny 15 — math
// Lines 4480-4804 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Hc(e) {
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
async function Uc(e, t) {
  let n = Zr([t.sun, t.sky]),
    { scene: r } = await Ya(Lc),
    i = new An();
  i.name = `Nocturne Exchange · Blender city`;
  let a = R(1.5),
    o = R(0),
    s = R(1),
    c = new Map(),
    l = new Set(),
    u = (t, r) => {
      let i = t.uuid + (r ? `:unlit` : ``),
        u = c.get(i);
      if (u) return u;
      let d = t,
        f = t;
      switch (t.name) {
        case `Nocturne glazing`:
          f = r ? Vc(d, 1.35) : Bc(d, 1.35);
          break;
        case `Nocturne tenement facade`:
          f = Bc(d, 1.25);
          break;
        case `Holo screens`: {
          let e = new I({ name: t.name, roughness: 0.3, metalness: 0 }),
            n = qr(Er.add(5)).mul(16).floor(),
            r = q(n.mod(4), n.div(4).floor()).mul(0.25);
          ((e.colorNode = J(0.01)),
            (e.emissiveNode = z(d.emissiveMap, X().add(r)).rgb.mul(a)),
            (e.emissiveMap = d.emissiveMap),
            (f = e));
          break;
        }
        case `Neon cyan`:
          f = e.pulseCyan;
          break;
        case `Neon violet`:
          f = e.pulseViolet;
          break;
        case `Neon amber`:
          f = e.pulseAmber;
          break;
        case `Neon magenta`:
          f = new b({
            name: t.name,
            color: new j(`#ff3ea0`).multiplyScalar(1.8),
          });
          break;
        case `Neon white`:
          f = new b({
            name: t.name,
            color: new j(`#dcecff`).multiplyScalar(1.7),
          });
          break;
        case `Aviation red`: {
          let e = new At({ name: t.name }),
            n = K(0.78, B(o.mul(0.5).add(qr(Er.add(3)))))
              .mul(s)
              .add(V(1).sub(s));
          ((e.colorNode = J(2.6, 0.12, 0.08).mul(n.mul(0.85).add(0.15))),
            (f = e));
          break;
        }
        default:
          f = Oa(Hc(d));
      }
      return (f instanceof I && (f.lightsNode = n), l.add(t), c.set(i, f), f);
    };
  try {
    r.updateMatrixWorld(!0);
    let e = {},
      t = new Map();
    for (let n of fs) {
      let i = r.children.find((e) => e.userData.assetId === n);
      if (!i) throw Error(`Nocturne city kit is missing ${n}.`);
      let a = new rr().setFromObject(i);
      if (a.isEmpty() || a.max.y > 260 || a.min.y < -10)
        throw Error(`Invalid Nocturne bounds for ${n}.`);
      (t.set(n, i), (e[n] = { min: a.min.toArray(), max: a.max.toArray() }));
    }
    let n = JSON.parse(t.get(`exchange-gate`).userData.passage),
      c = Cs(e),
      d = {},
      f = 0,
      p = 0;
    for (let e of fs) {
      let n = c.filter((t) => t.asset === e);
      ((d[e] = n.length),
        n.length &&
          t.get(e).traverse((t) => {
            if (!(t instanceof M)) return;
            let r =
              (t.geometry.index?.count ??
                t.geometry.attributes.position.count) / 3;
            ((p += r), (f += r * n.length));
            let a = ao(
              t.geometry.clone().applyMatrix4(t.matrixWorld),
              u(t.material, Rc.has(e)),
              n.length,
            );
            ((a.name = `${e} · ${t.name}`),
              (a.castShadow = a.receiveShadow = !1),
              n.forEach((e, t) => a.setMatrixAt(t, e.matrix)),
              (a.instanceMatrix.needsUpdate = !0),
              a.computeBoundingBox(),
              a.computeBoundingSphere(),
              i.add(a));
          }));
    }
    r.traverse((e) => {
      e instanceof M && e.geometry.dispose();
    });
    for (let e of l) e.dispose();
    return (
      Wa(r, i),
      {
        group: i,
        passage: n,
        placements: c,
        update(e, t, n) {
          ((o.value = t),
            (s.value = +!n),
            (a.value = n ? 1.5 : 1.35 + e.level * 0.45));
        },
        info: {
          source: `Blender`,
          loaded: !0,
          kit: `Nocturne Exchange`,
          assets: fs.length,
          instances: c.length,
          counts: d,
          drawBatches: i.children.length,
          prototypeTriangles: p,
          instanceTriangles: f,
        },
      }
    );
  } catch (e) {
    throw (
      i.traverse((e) => {
        e instanceof M &&
          (e.geometry.dispose(), e instanceof Dt && e.dispose());
      }),
      Oc(r),
      e
    );
  }
}
var Wc = {
    centerX: 46,
    centerZ: -53,
    size: 2400,
    step: 8,
    farSize: 15e3,
    farStep: 120,
  },
  Gc = 2.2,
  Kc = [
    { x: 560, z: 300, a: 175, b: 140, angle: 0.5, top: 218, seed: 11 },
    { x: 275, z: -210, a: 200, b: 128, angle: -2.27, top: 206, seed: 23 },
  ],
  qc = [
    { x: -250, z: -40, a: 250, b: 150, angle: 0.15 },
    { x: -560, z: -300, a: 190, b: 300, angle: 0.1 },
    { x: -640, z: 60, a: 220, b: 170, angle: -0.3 },
    { x: 60, z: 120, a: 120, b: 70, angle: 0.4 },
  ],
  Jc = {
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
  Yc = { x: -300, z: -565, radius: 330, height: 4 },
  Xc = { x: 250, z: 220, a: 260, b: 210, angle: 0.9 };
function Zc(e, t, n) {
  let r = Math.imul(e, 374761393) ^ Math.imul(t, 668265263) ^ n;
  return (
    (r = Math.imul(r ^ (r >>> 13), 1274126177)),
    ((r ^ (r >>> 16)) >>> 0) / 4294967296
  );
}
function Qc(e, t, n = 0) {
  let r = Math.floor(e),
    i = Math.floor(t),
    a = e - r,
    o = t - i,
    s = a * a * (3 - 2 * a),
    c = o * o * (3 - 2 * o),
    l = Zc(r, i, n),
    u = Zc(r + 1, i, n),
    d = Zc(r, i + 1, n),
    f = Zc(r + 1, i + 1, n);
  return l + (u - l) * s + (d - l) * c + (l - u - d + f) * s * c;
}
function $c(e, t, n = 4, r = 0) {
  let i = 0,
    a = 0.5,
    o = 0;
  for (let s = 0; s < n; s++)
    ((i += Qc(e, t, r + s * 101) * a),
      (o += a),
      (e = e * 2.03 + 17.1),
      (t = t * 2.03 - 9.7),
      (a *= 0.5));
  return i / o;
}
var el = (e, t, n) => {
    let r = Math.max(0, Math.min(1, (n - e) / (t - e)));
    return r * r * (3 - 2 * r);
  },
  tl = (e, t, n) => e + (t - e) * n;
function nl(e, t, n) {
  let r = t - e.x,
    i = n - e.z,
    a = Math.cos(e.angle),
    o = Math.sin(e.angle),
    s = r * a + i * o,
    c = -r * o + i * a;
  return Math.hypot(s / e.a, c / e.b);
}
function rl(e, t, [n, r], [i, a]) {
  let o = i - n,
    s = a - r,
    c = Math.max(0, Math.min(1, ((e - n) * o + (t - r) * s) / (o * o + s * s)));
  return Math.hypot(e - n - o * c, t - r - s * c);
}
function il(e, t) {
  let n = 1 / 0;
  for (let r = 1; r < Jc.path.length; r++)
    n = Math.min(n, rl(e, t, Jc.path[r - 1], Jc.path[r]));
  return n;
}
function al(e, t, n, r, i, a) {
  let o = e * n + t * r,
    s = -e * r + t * n,
    c = $c(s / 330, o / 700, 3, a) * 140 + $c(s / 90, o / 160, 2, a + 3) * 22,
    l = 0.75 + $c(e / 900, t / 900, 2, a + 5) * 0.6,
    u = (o + c) / (i * l),
    d = u - Math.floor(u),
    f = d < 0.74 ? d / 0.74 : (1 - d) / 0.26,
    p = el(0.25, 0.7, $c(s / 140, o / 520, 3, a + 9));
  return el(0, 1, f) * p;
}
function ol(e, t) {
  let n = 0.3 + 0.7 * $c(e / 520, t / 520, 3, 31);
  return (
    2.5 +
    al(e, t, 0.83, 0.56, 160, 7) * 10 * n +
    al(e, t, 0.28, 0.96, 260, 17) * 6 * (1.2 - n) +
    $c(e / 700, t / 700, 3, 3) * 9 +
    $c(e / 45, t / 45, 2, 61) * 0.8
  );
}
function sl(e, t) {
  let n = 0,
    r = ($c(e / 140, t / 140, 3, 51) - 0.5) * 0.35;
  for (let i of qc) n = Math.max(n, el(1.05, 0.55, nl(i, e, t) + r));
  return n;
}
var cl = { from: [-340, 0], to: [170, 20], clear: 150 };
function ll(e, t, n) {
  let r = rl(t, n, cl.from, cl.to),
    i = nl(e, t, n) + Math.max(0, cl.clear - r) / 70,
    a = Math.atan2(n - e.z, t - e.x);
  return (
    i +
    (($c(Math.cos(a) * 3 + e.seed, Math.sin(a) * 3, 4, e.seed) - 0.5) * 0.28 +
      ($c(t / 60, n / 60, 2, e.seed + 5) - 0.5) * 0.08)
  );
}
function ul(e, t) {
  let n = ol(e, t),
    r = el(1.1, 0.6, nl(Xc, e, t));
  n = tl(n, 5 + $c(e / 90, t / 90, 2, 71) * 2.5, r * 0.85);
  let i = sl(e, t);
  ((n = tl(n, -6 + $c(e / 60, t / 60, 2, 9) * 2, i)),
    i < 0.05 && (n = Math.max(n, 0.6)));
  let a = el(Yc.radius, Yc.radius * 0.72, Math.hypot(e - Yc.x, t - Yc.z));
  n = tl(n, Yc.height + $c(e / 50, t / 50, 2, 4) * 0.6, a);
  for (let r of Kc) {
    let i = ll(r, e, t);
    if (i > 1.5) continue;
    let a = el(1.03, 0.97, i),
      o = el(0.93, 0.85, i) * 6 + el(1, 0.93, i) * 3,
      s = r.top - 9 + o + $c(e / 45, t / 45, 3, r.seed + 9) * 2.5,
      c = el(1.45, 1.01, i) ** 1.6 * 38;
    n = Math.max(n, tl(n + c, s, a));
  }
  let o = il(e, t);
  return (
    o < Jc.halfWidth + 14 &&
      (n = tl(
        Jc.bed,
        Math.max(n, 3),
        el(Jc.halfWidth - 1, Jc.halfWidth + 12, o),
      )),
    n
  );
}
var dl = [
    [1e3, 1420],
    [1860, 2380],
  ],
  fl = -1,
  pl = [],
  ml = new Map(),
  hl = 64;
