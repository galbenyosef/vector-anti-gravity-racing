// assets__game-CsnOSIff 21 — mul
// Lines 6197-6528 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function Jl(e, t, n) {
  let { samples: r } = Ul(),
    i = j(0),
    a = -n[`pylon-head`].min[1],
    o = (e, t) => {
      let n = Math.abs(e - t) % F;
      return Math.min(n, F - n);
    },
    s = Rt.filter((e) => !e.glass);
  for (let n = 10; n < F; n += 40) {
    if (
      Dt.some((e) => n > e.kicker - 12 && n < e.land + 12) ||
      s.some((e) => n > e.from * F - 20 && n < e.to * F + 20)
    )
      continue;
    let c = Gn(n),
      l = Ft(n, 0, -1.65),
      u = l.clone().addScaledVector(c.up, -a),
      d = t(u.x, u.z);
    if (
      u.y - d < Rl ||
      r.some(
        (e) =>
          o(e.d, n) > 60 &&
          e.y < c.position.y - 4 &&
          Math.hypot(e.x - u.x, e.z - u.z) < i + 6,
      )
    )
      continue;
    let f = Math.hypot(c.tangent.x, c.tangent.z),
      p = Math.atan2(c.tangent.x / f, c.tangent.z / f);
    e.push({
      asset: `pylon-head`,
      matrix: new M().makeBasis(c.right, c.up, c.tangent).setPosition(l),
      x: l.x,
      z: l.z,
      radius: 18,
    });
    let m = u.y - d + 0.5,
      h = Math.ceil(m / 10);
    for (let t = 0; t < h; t++) {
      let n = Math.min(10, m - t * 10);
      e.push({
        asset: `track-pylon`,
        matrix: Kl(u.x, d - 0.5 + t * 10, u.z, p, 1, n / 10),
        x: u.x,
        z: u.z,
        radius: 3,
      });
    }
  }
}
var Yl = `models/sirocco-oasis-kit.glb`,
  Xl = new Set([
    `desert-shrub`,
    `reeds`,
    `crop-row`,
    `heliostat`,
    `date-palm-lod`,
    `coconut-palm-lod`,
  ]),
  Zl = new Set([
    `date-palm`,
    `date-palm-lod`,
    `coconut-palm`,
    `coconut-palm-lod`,
    `fan-palm`,
    `desert-shrub`,
    `reeds`,
    `crop-row`,
    `heliostat`,
    `boulder-cluster`,
  ]),
  Ql = 300,
  $l = 1e5;
async function eu(e, t) {
  let { scene: n } = await Ja(Yl, 4),
    r = new pn();
  r.name = `Sirocco Oasis · Blender scenery`;
  let a = L(0),
    o = L(1),
    s = L(1),
    c = new Map(),
    l = new Set(),
    u = (e) => {
      let t = new I({
          name: e.name,
          map: e.map,
          color: e.color,
          roughness: 0.62,
          metalness: 0,
          alphaTest: 0.5,
          alphaToCoverage: !0,
          side: 2,
        }),
        n = qr(Er.add(17)).mul(6.28),
        r = Xi.y.sub(8).max(0).mul(0.06),
        i = Hr(a.mul(1.3).add(n))
          .mul(0.6)
          .add(Hr(a.mul(2.9).add(n.mul(1.7))).mul(0.25));
      return (
        (t.positionNode = Xi.add(
          q(i.mul(r).mul(r), 0, i.mul(r).mul(0.4)).mul(o).mul(0.9),
        )),
        t
      );
    },
    d = (e) => {
      let n = c.get(e.uuid);
      if (n) return n;
      let r = e,
        o;
      switch (e.name) {
        case `Date palm frond`:
        case `Coconut palm frond`:
          o = u(r);
          break;
        case `Heliostat mirror`:
          o = new Ne({
            name: e.name,
            color: `#dfe8ee`,
            roughness: 0.04,
            metalness: 1,
            side: 2,
          });
          break;
        case `Dome glass`:
          o = new pe({
            name: e.name,
            color: `#cdeff0`,
            roughness: 0.05,
            metalness: 0,
            ior: 1.5,
            transparent: !0,
            opacity: 0.28,
            depthWrite: !1,
            side: 2,
          });
          break;
        case `Receiver glow`:
          o = new we({
            name: e.name,
            color: new _(`#ffd28a`).multiplyScalar(3.2),
          });
          break;
        case `Neon cyan`:
          o = new we({
            name: e.name,
            color: new _(`#54e9ee`).multiplyScalar(2.2),
          });
          break;
        case `Neon amber`:
          o = new we({
            name: e.name,
            color: new _(`#ffb04a`).multiplyScalar(2.4),
          });
          break;
        case `Aviation red`: {
          let t = new i({ name: e.name }),
            n = G(0.78, z(a.mul(0.5).add(qr(Er.add(3)))))
              .mul(s)
              .add(B(1).sub(s));
          ((t.colorNode = q(2.6, 0.12, 0.08).mul(n.mul(0.85).add(0.15))),
            (o = t));
          break;
        }
        case `Sirocco sandstone`:
          o = t();
          break;
        case `Greenhouse canopy`:
        case `Shade sail`:
          o = new I({
            name: e.name,
            color: r.color,
            roughness: 0.85,
            metalness: 0,
            side: 2,
          });
          break;
        default:
          o = Da(
            new I({
              name: r.name,
              color: r.color,
              map: r.map,
              normalMap: r.normalMap,
              roughness: r.roughness,
              metalness: r.metalness,
              roughnessMap: r.roughnessMap,
              metalnessMap: r.metalnessMap,
            }),
          );
      }
      return (l.add(e), c.set(e.uuid, o), o);
    };
  try {
    n.updateMatrixWorld(!0);
    let t = {},
      i = new Map();
    for (let e of Ll) {
      let r = n.children.find((t) => t.userData.assetId === e);
      if (!r) throw Error(`Sirocco kit is missing ${e}.`);
      let a = new Jn().setFromObject(r);
      if (a.isEmpty() || a.max.y > 240 || a.min.y < -12)
        throw Error(`Invalid Sirocco bounds for ${e}.`);
      (i.set(e, r), (t[e] = { min: a.min.toArray(), max: a.max.toArray() }));
    }
    let c = ql(t, e),
      u = {},
      f = 0,
      p = 0;
    for (let e of Ll) {
      let t = c.filter((t) => t.asset === e);
      if (((u[e] = t.length), !t.length)) continue;
      let n = 0;
      i.get(e).traverse((e) => {
        e instanceof N &&
          (n +=
            (e.geometry.index?.count ?? e.geometry.attributes.position.count) /
            3);
      });
      let a = n * t.length > $l,
        o = new Map();
      for (let e of t) {
        let t = a ? `${Math.floor(e.x / Ql)},${Math.floor(e.z / Ql)}` : `all`,
          n = o.get(t);
        (n || o.set(t, (n = [])), n.push(e));
      }
      i.get(e).traverse((n) => {
        if (!(n instanceof N)) return;
        let i =
          (n.geometry.index?.count ?? n.geometry.attributes.position.count) / 3;
        ((p += i), (f += i * t.length));
        let a = n.geometry.clone().applyMatrix4(n.matrixWorld),
          s = d(n.material),
          c = s.transparent;
        for (let [t, i] of o) {
          let o = io(a, s, i.length);
          ((o.name = `${e} · ${n.name} · ${t}`),
            (o.castShadow = !Xl.has(e) && !c),
            (o.receiveShadow = !c),
            (o.userData.reflectionHidden = Zl.has(e)),
            i.forEach((e, t) => o.setMatrixAt(t, e.matrix)),
            (o.instanceMatrix.needsUpdate = !0),
            o.computeBoundingBox(),
            o.computeBoundingSphere(),
            r.add(o));
        }
      });
    }
    n.traverse((e) => {
      e instanceof N && e.geometry.dispose();
    });
    for (let e of l) e.dispose();
    return (
      Ua(n, r),
      {
        group: r,
        placements: c,
        update(e, t) {
          ((a.value = e), (o.value = +!t), (s.value = +!t));
        },
        info: {
          source: `Blender`,
          loaded: !0,
          kit: `Sirocco Oasis`,
          assets: Ll.length,
          instances: c.length,
          counts: u,
          drawBatches: r.children.length,
          prototypeTriangles: p,
          instanceTriangles: f,
        },
      }
    );
  } catch (e) {
    throw (
      r.traverse((e) => {
        e instanceof N &&
          (e.geometry.dispose(), e instanceof Wn && e.dispose());
      }),
      Dc(n),
      e
    );
  }
}
var tu = s.degToRad,
  nu = (e, t) => new g().setFromSphericalCoords(1, tu(90 - t), tu(90 - e)),
  ru = {
    azimuth: 180,
    elevation: 13,
    angularDiameter: 3.4,
    subLongitude: 12,
    subLatitude: 6,
    roll: -18,
    radiance: 0.27,
  },
  iu = nu(ru.azimuth, ru.elevation),
  au = {
    centreAzimuth: 156,
    centreElevation: 6,
    southPoleElevation: 30,
    brightness: 0.065,
  },
  ou = 7300,
  su = { radius: 0.265, radiance: 64 },
  cu = {
    highCount: 9e3,
    lowCount: 3600,
    distance: 7400,
    faintest: 7,
    faintIntensity: 0.05,
    contrast: 0.65,
    sigma: 0.6,
    shimmer: 0.16,
  };
function lu() {
  let e = nu(au.centreAzimuth, au.centreElevation),
    t = nu(au.centreAzimuth + 90, au.southPoleElevation);
  t.addScaledVector(e, -t.dot(e)).normalize();
  let n = t.clone().negate();
  return { centre: e, north: n, y: new g().crossVectors(n, e).normalize() };
}
function uu(e, t) {
  let { centre: n, north: r, y: i } = lu(),
    a = Math.cos(tu(t));
  return new g()
    .addScaledVector(n, a * Math.cos(tu(e)))
    .addScaledVector(i, a * Math.sin(tu(e)))
    .addScaledVector(r, Math.sin(tu(t)))
    .normalize();
}
