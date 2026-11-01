// assets__game-D43Oxqny 21 — mul
// Lines 6232-6563 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Yl(e, t, n) {
  let { samples: r } = Wl(),
    i = P(0),
    a = -n[`pylon-head`].min[1],
    o = (e, t) => {
      let n = Math.abs(e - t) % v;
      return Math.min(n, v - n);
    },
    s = ct.filter((e) => !e.glass);
  for (let n = 10; n < v; n += 40) {
    if (
      It.some((e) => n > e.kicker - 12 && n < e.land + 12) ||
      s.some((e) => n > e.from * v - 20 && n < e.to * v + 20)
    )
      continue;
    let c = Ot(n),
      l = xn(n, 0, -1.65),
      u = l.clone().addScaledVector(c.up, -a),
      d = t(u.x, u.z);
    if (
      u.y - d < zl ||
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
      matrix: new k().makeBasis(c.right, c.up, c.tangent).setPosition(l),
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
        matrix: ql(u.x, d - 0.5 + t * 10, u.z, p, 1, n / 10),
        x: u.x,
        z: u.z,
        radius: 3,
      });
    }
  }
}
var Xl = `models/sirocco-oasis-kit.glb`,
  Zl = new Set([
    `desert-shrub`,
    `reeds`,
    `crop-row`,
    `heliostat`,
    `date-palm-lod`,
    `coconut-palm-lod`,
  ]),
  Ql = new Set([
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
  $l = 300,
  eu = 1e5;
async function tu(e, t) {
  let { scene: n } = await Ya(Xl, 4),
    r = new An();
  r.name = `Sirocco Oasis · Blender scenery`;
  let i = R(0),
    a = R(1),
    o = R(1),
    s = new Map(),
    c = new Set(),
    l = (e) => {
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
        r = Zi.y.sub(8).max(0).mul(0.06),
        o = Hr(i.mul(1.3).add(n))
          .mul(0.6)
          .add(Hr(i.mul(2.9).add(n.mul(1.7))).mul(0.25));
      return (
        (t.positionNode = Zi.add(
          J(o.mul(r).mul(r), 0, o.mul(r).mul(0.4)).mul(a).mul(0.9),
        )),
        t
      );
    },
    u = (e) => {
      let n = s.get(e.uuid);
      if (n) return n;
      let r = e,
        a;
      switch (e.name) {
        case `Date palm frond`:
        case `Coconut palm frond`:
          a = l(r);
          break;
        case `Heliostat mirror`:
          a = new cr({
            name: e.name,
            color: `#dfe8ee`,
            roughness: 0.04,
            metalness: 1,
            side: 2,
          });
          break;
        case `Dome glass`:
          a = new Ae({
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
          a = new b({
            name: e.name,
            color: new j(`#ffd28a`).multiplyScalar(3.2),
          });
          break;
        case `Neon cyan`:
          a = new b({
            name: e.name,
            color: new j(`#54e9ee`).multiplyScalar(2.2),
          });
          break;
        case `Neon amber`:
          a = new b({
            name: e.name,
            color: new j(`#ffb04a`).multiplyScalar(2.4),
          });
          break;
        case `Aviation red`: {
          let t = new At({ name: e.name }),
            n = K(0.78, B(i.mul(0.5).add(qr(Er.add(3)))))
              .mul(o)
              .add(V(1).sub(o));
          ((t.colorNode = J(2.6, 0.12, 0.08).mul(n.mul(0.85).add(0.15))),
            (a = t));
          break;
        }
        case `Sirocco sandstone`:
          a = t();
          break;
        case `Greenhouse canopy`:
        case `Shade sail`:
          a = new I({
            name: e.name,
            color: r.color,
            roughness: 0.85,
            metalness: 0,
            side: 2,
          });
          break;
        default:
          a = Oa(
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
      return (c.add(e), s.set(e.uuid, a), a);
    };
  try {
    n.updateMatrixWorld(!0);
    let t = {},
      s = new Map();
    for (let e of Rl) {
      let r = n.children.find((t) => t.userData.assetId === e);
      if (!r) throw Error(`Sirocco kit is missing ${e}.`);
      let i = new rr().setFromObject(r);
      if (i.isEmpty() || i.max.y > 240 || i.min.y < -12)
        throw Error(`Invalid Sirocco bounds for ${e}.`);
      (s.set(e, r), (t[e] = { min: i.min.toArray(), max: i.max.toArray() }));
    }
    let l = Jl(t, e),
      d = {},
      f = 0,
      p = 0;
    for (let e of Rl) {
      let t = l.filter((t) => t.asset === e);
      if (((d[e] = t.length), !t.length)) continue;
      let n = 0;
      s.get(e).traverse((e) => {
        e instanceof M &&
          (n +=
            (e.geometry.index?.count ?? e.geometry.attributes.position.count) /
            3);
      });
      let i = n * t.length > eu,
        a = new Map();
      for (let e of t) {
        let t = i ? `${Math.floor(e.x / $l)},${Math.floor(e.z / $l)}` : `all`,
          n = a.get(t);
        (n || a.set(t, (n = [])), n.push(e));
      }
      s.get(e).traverse((n) => {
        if (!(n instanceof M)) return;
        let i =
          (n.geometry.index?.count ?? n.geometry.attributes.position.count) / 3;
        ((p += i), (f += i * t.length));
        let o = n.geometry.clone().applyMatrix4(n.matrixWorld),
          s = u(n.material),
          c = s.transparent;
        for (let [t, i] of a) {
          let a = ao(o, s, i.length);
          ((a.name = `${e} · ${n.name} · ${t}`),
            (a.castShadow = !Zl.has(e) && !c),
            (a.receiveShadow = !c),
            (a.userData.reflectionHidden = Ql.has(e)),
            i.forEach((e, t) => a.setMatrixAt(t, e.matrix)),
            (a.instanceMatrix.needsUpdate = !0),
            a.computeBoundingBox(),
            a.computeBoundingSphere(),
            r.add(a));
        }
      });
    }
    n.traverse((e) => {
      e instanceof M && e.geometry.dispose();
    });
    for (let e of c) e.dispose();
    return (
      Wa(n, r),
      {
        group: r,
        placements: l,
        update(e, t) {
          ((i.value = e), (a.value = +!t), (o.value = +!t));
        },
        info: {
          source: `Blender`,
          loaded: !0,
          kit: `Sirocco Oasis`,
          assets: Rl.length,
          instances: l.length,
          counts: d,
          drawBatches: r.children.length,
          prototypeTriangles: p,
          instanceTriangles: f,
        },
      }
    );
  } catch (e) {
    throw (
      r.traverse((e) => {
        e instanceof M &&
          (e.geometry.dispose(), e instanceof Dt && e.dispose());
      }),
      Oc(n),
      e
    );
  }
}
var nu = F.degToRad,
  ru = (e, t) => new A().setFromSphericalCoords(1, nu(90 - t), nu(90 - e)),
  iu = {
    azimuth: 180,
    elevation: 13,
    angularDiameter: 3.4,
    subLongitude: 12,
    subLatitude: 6,
    roll: -18,
    radiance: 0.27,
  },
  au = ru(iu.azimuth, iu.elevation),
  ou = {
    centreAzimuth: 156,
    centreElevation: 6,
    southPoleElevation: 30,
    brightness: 0.065,
  },
  su = 7300,
  cu = { radius: 0.265, radiance: 64 },
  lu = {
    highCount: 9e3,
    lowCount: 3600,
    distance: 7400,
    faintest: 7,
    faintIntensity: 0.05,
    contrast: 0.65,
    sigma: 0.6,
    shimmer: 0.16,
  };
function uu() {
  let e = ru(ou.centreAzimuth, ou.centreElevation),
    t = ru(ou.centreAzimuth + 90, ou.southPoleElevation);
  t.addScaledVector(e, -t.dot(e)).normalize();
  let n = t.clone().negate();
  return { centre: e, north: n, y: new A().crossVectors(n, e).normalize() };
}
function du(e, t) {
  let { centre: n, north: r, y: i } = uu(),
    a = Math.cos(nu(t));
  return new A()
    .addScaledVector(n, a * Math.cos(nu(e)))
    .addScaledVector(i, a * Math.sin(nu(e)))
    .addScaledVector(r, Math.sin(nu(t)))
    .normalize();
}
