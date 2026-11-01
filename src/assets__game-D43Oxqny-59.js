// assets__game-D43Oxqny 59 — dispose
// Lines 24676-24876 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function iv(e) {
  return (e.index?.count ?? e.attributes.position.count) / 3;
}
function av(e) {
  let t = e;
  return new I({
    name: t.name,
    color: t.color,
    map: t.map,
    normalMap: t.normalMap,
    normalScale: t.normalScale,
    roughness: t.roughness,
    metalness: t.metalness,
    roughnessMap: t.roughnessMap,
    metalnessMap: t.metalnessMap,
    emissive: t.emissive,
    emissiveMap: t.emissiveMap ?? null,
    emissiveIntensity: t.emissiveIntensity,
    transparent: t.transparent,
    opacity: t.opacity,
    alphaTest: t.alphaTest,
    side: t.side,
    vertexColors: !1,
  });
}
function ov(e) {
  let t = new Me();
  for (let [n, r] of Object.entries(e.attributes)) t.setAttribute(n, r);
  t.setIndex(e.index);
  for (let n of e.groups) t.addGroup(n.start, n.count, n.materialIndex);
  return t;
}
async function sv(e, t) {
  let n = t.mobile ?? !1,
    { scene: r } = await Ya(e, t.anisotropy ?? (n ? 1 : 4)),
    i = new An();
  i.name = t.name;
  let a = new An();
  a.name = `${t.name} · static`;
  let o = new An();
  ((o.name = `${t.name} · dynamic`), i.add(a, o));
  let s = t.cell ?? 750,
    c = t.cellTriangles ?? 1e5,
    [l, u] = t.heights ?? [-40, 420],
    d = new Map(),
    f = new Set(),
    p = new Set(),
    m = [],
    h = new Map(),
    g = (e, n) => {
      let r = `${e.uuid}|${t.remapKey?.(e, n) ?? ``}`,
        i = d.get(r);
      if (i) return i;
      let a = t.remap?.(e, av, n);
      return (a || ((a = av(e)), p.add(a)), f.add(e), d.set(r, a), a);
    };
  try {
    (t.ready && (await t.ready), r.updateMatrixWorld(!0));
    let e = new Map(),
      n = {},
      p = [];
    for (let i of t.ids) {
      let a = r.children.find((e) => e.userData.assetId === i);
      if (!a) throw Error(`${t.name} is missing ${i}.`);
      let o = 0;
      if (
        (a.traverse((e) => {
          e instanceof M && o++;
        }),
        e.set(i, a),
        !o)
      ) {
        p.push(i);
        continue;
      }
      let s = new rr().setFromObject(a);
      if (s.isEmpty() || s.max.y > u || s.min.y < l)
        throw Error(`Invalid ${t.name} bounds for ${i}.`);
      n[i] = { min: s.min.toArray(), max: s.max.toArray() };
    }
    let _ = {},
      v = [],
      y = 0,
      b = 0,
      x = 0;
    for (let n of t.ids) {
      let r = t.placements.filter((e) => e.asset === n);
      if (((_[n] = r.length), (x += r.length), !r.length || p.includes(n)))
        continue;
      let i = 0;
      e.get(n).traverse((e) => {
        e instanceof M && (i += iv(e.geometry));
      });
      let l = t.dynamic?.has(n) ?? !1,
        u = !l && (t.merge?.(n, r.length, i) ?? !1);
      u && v.push(n);
      let d = !u && !l && i * r.length > c,
        f = new Map();
      for (let e of r) {
        let t = d ? `${Math.floor(e.x / s)},${Math.floor(e.z / s)}` : `all`,
          n = f.get(t);
        (n || f.set(t, (n = [])), n.push(e));
      }
      let S = l ? o : a,
        C = l || (t.noShadow?.has(n) ?? !1),
        w = t.noReflection?.has(n) ?? !1,
        T = [];
      (e.get(n).traverse((e) => {
        if (!(e instanceof M)) return;
        let i = iv(e.geometry);
        ((b += i), (y += i * r.length));
        let a = e.geometry.clone().applyMatrix4(e.matrixWorld),
          o = { asset: n, source: e.material, geometry: a, dynamic: l },
          s = g(o.source, o);
        t.prepare?.(a, { ...o, material: s });
        let c = s.transparent;
        if (u) {
          m.push({
            asset: n,
            material: s,
            geometry: a,
            placements: r,
            castShadow: !C && !c,
            reflectionHidden: w,
          });
          return;
        }
        let d = !0;
        for (let [r, i] of f) {
          let u = t.instanceAttributes?.({ ...o, material: s }, i),
            f = a;
          (c ? (f = a.clone()) : u && (f = ov(a)), f !== a && (d = !1));
          for (let [e, t] of Object.entries(u ?? {})) f.setAttribute(e, t);
          let p = ao(f, s, i.length);
          ((p.name = `${n} · ${e.name} · ${r}`),
            (p.castShadow = !C && !c),
            (p.receiveShadow = !c),
            (p.userData.reflectionHidden = w),
            (p.userData.assetId = n),
            c && (p.renderOrder = 2),
            i.forEach((e, t) => p.setMatrixAt(t, e.matrix)),
            (p.instanceMatrix.needsUpdate = !0),
            l && (p.instanceMatrix.setUsage(Ge), (p.frustumCulled = !1)),
            p.computeBoundingBox(),
            p.computeBoundingSphere(),
            c &&
              p.boundingSphere &&
              (f.boundingSphere = p.boundingSphere.clone()),
            S.add(p),
            T.push(p));
        }
        !d && c && a.dispose();
      }),
        T.length && h.set(n, T));
    }
    r.traverse((e) => {
      e instanceof M && e.geometry.dispose();
    });
    let S = new Set(d.values());
    for (let e of f) S.has(e) || e.dispose();
    Wa(r, i);
    let C = !1;
    return {
      group: i,
      statics: a,
      dynamic: o,
      roots: e,
      bounds: n,
      pieces: m,
      batches: h,
      dispose() {
        if (!C) {
          ((C = !0), i.removeFromParent(), Oc(i));
          for (let e of m) e.geometry.dispose();
        }
      },
      info: {
        source: `Blender`,
        loaded: !0,
        kit: t.name,
        assets: t.ids.length,
        instances: x,
        counts: _,
        drawBatches: a.children.length + o.children.length,
        merged: v,
        pieces: m.length,
        empty: p,
        prototypeTriangles: b,
        instanceTriangles: y,
      },
    };
  } catch (e) {
    i.traverse((e) => {
      e instanceof M && (e.geometry.dispose(), e instanceof Dt && e.dispose());
    });
    for (let e of m) e.geometry.dispose();
    for (let e of p) e.dispose();
    for (let e of f) e.dispose();
    throw (Oc(r), e);
  }
}
