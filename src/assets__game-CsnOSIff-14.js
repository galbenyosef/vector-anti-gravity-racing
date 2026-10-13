// assets__game-CsnOSIff 14 — math
// Lines 4105-4444 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
async function Oc(e = `kestrel`, t = `original`) {
  let n = Cn(e),
    r = Mt(n.id, t),
    { scene: i } = await Ja(ae(n.id, r.id), 8);
  try {
    let e = Ec(i);
    (Ta(i),
      (i.name = `${n.code} ${n.name} · Blender`),
      i.updateMatrixWorld(!0));
    let t = (e) => {
        let t = i.getObjectByName(e);
        if (!t) throw Error(`Player ship is missing its ${e} attachment.`);
        return t;
      },
      a = [`engine_negative_x`, `engine_positive_x`].map((e) =>
        i.worldToLocal(t(e).getWorldPosition(new g())),
      ),
      o = [`airbrake_negative_x`, `airbrake_positive_x`].map(t);
    for (let e of [
      `turbine_negative_x`,
      `turbine_positive_x`,
      `cooling_negative_x`,
      `cooling_positive_x`,
    ])
      t(e);
    let s = xc(i);
    for (let e of o)
      ((e.userData.restX = e.rotation.x),
        (e.userData.restY = e.position.y),
        (e.userData.hingeAngle = 0.68),
        (e.userData.lift = 0));
    let c = 0,
      l = 0,
      u = new Set();
    i.traverse((e) => {
      if (e instanceof N) {
        ((e.castShadow = e.receiveShadow = !0),
          l++,
          (c +=
            (e.geometry.index?.count ?? e.geometry.attributes.position.count) /
            3));
        for (let t of Array.isArray(e.material) ? e.material : [e.material])
          for (let e of Object.values(t)) e instanceof Pt && u.add(e);
      }
    });
    let d = new Jn().setFromObject(i).getSize(new g());
    if (d.x > 5.2 || d.z > 8.8 || d.y > 2.5)
      throw Error(`The player ship export exceeds its flight envelope.`);
    return (
      console.info(
        `[ship] ${n.id} ready`,
        JSON.stringify({
          code: n.code,
          triangles: Math.round(c),
          meshes: l,
          airbrakes: o.map((e) => e.name),
          turbines: s.turbines.map((e) => e.pivot.name),
          cooling: s.cooling.map((e) => e.pivot.name),
          engines: a.map((e) => e.toArray().map((e) => +e.toFixed(3))),
          textureMaps: u.size,
          enhancedSurfaces: e,
          dimensions: d.toArray().map((e) => +e.toFixed(2)),
        }),
      ),
      {
        scene: i,
        engines: a,
        brakes: o,
        animation: s,
        info: {
          id: n.id,
          skin: r.id,
          name: `${n.code} ${n.name}`,
          source: `Blender`,
          loaded: !0,
          triangles: c,
          meshes: l,
          animatedMechanisms: s.turbines.length + s.cooling.length,
          textureMaps: u.size,
          enhancedSurfaces: e,
          dimensions: d.toArray().map((e) => +e.toFixed(2)),
        },
      }
    );
  } catch (e) {
    throw (Dc(i), e);
  }
}
var kc = [
    `aurora-tower`,
    `terrace-habitat`,
    `port-terminal`,
    `harbor-crane`,
    `cargo-stack`,
    `track-pylon`,
  ],
  Ac = F,
  jc = Array.from({ length: Math.ceil(F / 5) }, (e, t) => Gn(t * 5).position);
function Mc(e, t) {
  return (
    Ac !== F &&
      ((Ac = F),
      (jc = Array.from(
        { length: Math.ceil(F / 5) },
        (e, t) => Gn(t * 5).position,
      ))),
    Math.min(...jc.map((n) => Math.hypot(e - n.x, t - n.z)))
  );
}
function Nc(e) {
  let t = [],
    n = 2186,
    r = () => (
      (n = (Math.imul(n, 1664525) + 1013904223) >>> 0),
      n / 4294967296
    ),
    i = (n, r, i, a, o = 0, s = [1, 1, 1], c = !1) => {
      let l = e[n],
        u = Math.hypot(
          Math.max(Math.abs(l.min[0]), Math.abs(l.max[0])) * s[0],
          Math.max(Math.abs(l.min[2]), Math.abs(l.max[2])) * s[2],
        );
      return Mc(r, a) < 16 + u + (n === `track-pylon` ? 0.7 : 12) ||
        (!c &&
          t.some(
            (e) =>
              e.asset !== `track-pylon` &&
              Math.hypot(r - e.x, a - e.z) < u + e.radius + 8,
          ))
        ? !1
        : (t.push({
            asset: n,
            x: r,
            y: n === `track-pylon` ? i : i - 4,
            z: a,
            yaw: o,
            scale: s,
            radius: u,
          }),
          !0);
    },
    a = (e, t, n, r, a = [1, 1, 1]) => {
      let o = Gn(t),
        s = { x: o.tangent.z, z: -o.tangent.x },
        c = Math.hypot(s.x, s.z);
      return (
        (s.x /= c),
        (s.z /= c),
        i(
          e,
          o.position.x + s.x * n * r,
          0,
          o.position.z + s.z * n * r,
          Math.atan2(-s.x * n, -s.z * n),
          a,
        )
      );
    };
  for (let [e, t] of [
    50, 225, 440, 730, 1010, 1470, 1750, 2040, 2370, 2680, 2980, 3290, 3540,
  ].entries())
    (a(e % 3 == 1 ? `terrace-habitat` : `aurora-tower`, t, e % 2 ? -1 : 1, 82, [
      1,
      0.85 + (e % 4) * 0.1,
      1,
    ]),
      (e < 3 || e % 3 == 0) &&
        a(`terrace-habitat`, t + 60, e % 2 ? 1 : -1, 83, [1, 1, 1]));
  for (let e of [150, 830, 1660, 2510, 3150]) a(`port-terminal`, e, -1, 125);
  for (let e of [980, 1520, 1860, 2260, 2890]) a(`harbor-crane`, e, 1, 145);
  i(`terrace-habitat`, 30, 0, 60, 0.15, [1.8, 2, 1.8]);
  for (
    let e = 0;
    e < 170 &&
    t.filter((e) => e.asset === `aurora-tower` || e.asset === `terrace-habitat`)
      .length < 43;
    e++
  ) {
    let t = (r() - 0.5) * 1510,
      n = (r() - 0.5) * 1460;
    if (Math.abs(t) < 180 && n < -610) continue;
    let a = 0.75 + r() * 0.55;
    i(e % 3 ? `aurora-tower` : `terrace-habitat`, t, 0, n, r() * Math.PI * 2, [
      a,
      0.65 + r() * 0.65,
      a,
    ]);
  }
  for (let e = 0; e < 8; e++) {
    let t = -600 + e * 165;
    (i(`harbor-crane`, t, 0, 790, 0, [0.9, 0.9, 0.9]),
      i(`cargo-stack`, t - 45, 0, 760, Math.PI * 0.5, [1.2, 1.2, 1.2], !0),
      i(`cargo-stack`, t + 50, 0, 790, 0, [1, 1, 1], !0));
  }
  for (let e = 80; e < 450; e += 46)
    for (let t of [-1, 1]) {
      let n = Gn(e),
        r = n.position.x + n.right.x * t * 23,
        a = n.position.z + n.right.z * t * 23;
      i(
        `track-pylon`,
        r,
        n.position.y - 1,
        a,
        Math.atan2(n.tangent.x, n.tangent.z) + (t < 0 ? Math.PI : 0),
        [1, 1, 1],
        !0,
      );
    }
  return t;
}
var Pc = `models/solstice-port-kit.glb`;
async function Fc() {
  let { scene: e } = await Ja(Pc, 4),
    t = new pn();
  t.name = `Solstice Port · Blender architecture`;
  try {
    (e.updateMatrixWorld(!0), Ta(e), Oa(e));
    let n = new Map(),
      r = {},
      i = new Set();
    for (let t of kc) {
      let i = e.children.find((e) => e.userData.assetId === t);
      if (!i) throw Error(`Port kit is missing ${t}.`);
      n.set(t, i);
      let a = new Jn().setFromObject(i);
      if (
        ((r[t] = { min: a.min.toArray(), max: a.max.toArray() }),
        a.isEmpty() || a.min.y < -0.1 || a.max.y > 180)
      )
        throw Error(`Invalid architecture bounds for ${t}.`);
    }
    let a = Nc(r),
      o = 0,
      s = 0,
      c = {},
      l = new M(),
      u = new Ot(),
      d = new g(0, 1, 0);
    for (let e of kc) {
      let r = n.get(e),
        f = a.filter((t) => t.asset === e);
      ((c[e] = f.length),
        r.traverse((n) => {
          if (!(n instanceof N)) return;
          let r =
            (n.geometry.index?.count ?? n.geometry.attributes.position.count) /
            3;
          ((o += r), (s += r * f.length));
          let a = io(
            n.geometry.clone().applyMatrix4(n.matrixWorld),
            n.material,
            f.length,
          );
          ((a.name = `${e} · ${n.name}`),
            (a.castShadow = a.receiveShadow = !0));
          for (let e of Array.isArray(a.material) ? a.material : [a.material])
            for (let t of Object.values(e)) t instanceof Pt && i.add(t);
          (f.forEach((e, t) => {
            (u.setFromAxisAngle(d, e.yaw),
              l.compose(new g(e.x, e.y, e.z), u, new g(...e.scale)),
              a.setMatrixAt(t, l));
          }),
            (a.instanceMatrix.needsUpdate = !0),
            a.computeBoundingBox(),
            a.computeBoundingSphere(),
            t.add(a));
        }));
    }
    return (
      e.traverse((e) => {
        e instanceof N && e.geometry.dispose();
      }),
      Ua(e, t),
      {
        group: t,
        info: {
          source: `Blender`,
          loaded: !0,
          kit: `Solstice Port`,
          assets: kc.length,
          instances: a.length,
          counts: c,
          drawBatches: t.children.length,
          prototypeTriangles: o,
          instanceTriangles: s,
          textureMaps: i.size,
        },
      }
    );
  } catch (n) {
    throw (
      t.traverse((e) => {
        e instanceof N &&
          (e.geometry.dispose(), e instanceof Wn && e.dispose());
      }),
      Dc(e),
      n
    );
  }
}
var Ic = `models/nocturne-city-kit.glb`,
  Lc = new Set([`far-block-a`, `far-block-b`, `far-block-c`]);
function Rc(e, t) {
  let n = K(qr(Er.add(11)).mul(16).floor(), qr(Er.add(37)).mul(16).floor()).div(
      16,
    ),
    r = X().add(n);
  return {
    st: r,
    colour: R(e.map, r),
    emissive: R(e.emissiveMap, r)
      .rgb.mul(qr(Er.add(71)).mul(0.7).add(0.5))
      .mul(t),
  };
}
function zc(e, t) {
  let n = new I({ name: e.name }),
    r = Rc(e, t),
    i = R(e.roughnessMap, r.st);
  return (
    (n.colorNode = r.colour),
    (n.roughnessNode = i.g),
    (n.metalnessNode = i.b),
    (n.emissiveNode = r.emissive),
    (n.map = e.map),
    (n.emissiveMap = e.emissiveMap),
    (n.roughnessMap = e.roughnessMap),
    n
  );
}
function Bc(e, t) {
  let n = new i({ name: e.name }),
    r = Rc(e, t);
  return (
    (n.colorNode = r.colour.rgb.mul(0.45).add(r.emissive)),
    (n.map = e.map),
    n
  );
}
