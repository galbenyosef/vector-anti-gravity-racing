// assets__game-D43Oxqny 28 — mul
// Lines 8111-8423 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
async function Rd(e, t = {}) {
  let n = t.mobile ?? !1,
    { scene: r } = await Ya(pd, n ? 1 : 4),
    i = new An();
  i.name = `Shackleton Rim · Blender scenery`;
  let a = R(0),
    o = R(1),
    s = R(1),
    c = new Map(),
    l = new Set(),
    u = !1,
    d = (e) => {
      let t = new I({
        name: e.name,
        color: e.color,
        map: e.map,
        normalMap: e.normalMap,
        normalScale: e.normalScale,
        roughness: e.roughness,
        metalness: e.metalness,
        roughnessMap: e.roughnessMap,
        metalnessMap: e.metalnessMap,
      });
      if (n) return t;
      if (Da[t.name]) return Oa(t);
      let r = kd[t.name];
      return (r && ga(t, _a[r]), t);
    },
    f = (e) => {
      let t = new I({
        name: e.name,
        color: `#050708`,
        roughness: 0.03,
        metalness: 0,
        transparent: !0,
        depthWrite: !1,
        side: 2,
      });
      return (
        (t.blending = 5),
        (t.blendSrc = 201),
        (t.blendDst = 205),
        (t.blendSrcAlpha = 201),
        (t.blendDstAlpha = 205),
        (t.opacityNode = bi(wi.dot(Yi).abs())
          .oneMinus()
          .pow(4)
          .mul(0.63)
          .add(0.12)),
        t
      );
    },
    p = (e) => {
      let t = new I({
          name: e.name,
          map: e.map,
          roughnessMap: e.roughnessMap,
          metalnessMap: e.metalnessMap,
          roughness: 1,
          metalness: 1,
          emissiveMap: e.emissiveMap,
        }),
        n = qr(Er.add(71)).mul(0.6).add(0.65);
      return (
        e.emissiveMap &&
          (t.emissiveNode = z(e.emissiveMap, X()).rgb.mul(n).mul(2.6)),
        t
      );
    },
    m = (e, t, n) => new b({ name: e, color: new j(t).multiplyScalar(n) }),
    h = (e) => {
      let r = c.get(e.uuid);
      if (r) return r;
      let i = e,
        h;
      switch (e.name) {
        case `Shackleton dome glass`:
          h = f(i);
          break;
        case `Shackleton window glow`:
          h = p(i);
          break;
        case `Shackleton edge light`:
          h = m(e.name, `#ffdcae`, 2.6);
          break;
        case `Shackleton grow light`:
          h = m(e.name, `#ff4fb0`, 2.2);
          break;
        case `Shackleton foliage`: {
          let e = d(i);
          (i.map && (e.emissiveNode = z(i.map, X()).rgb.mul(0.7)), (h = e));
          break;
        }
        case `Shackleton beacon`: {
          let t = new At({ name: e.name }),
            n = K(0.8, B(a.mul(0.5).add(qr(Er.add(3)))))
              .mul(o)
              .add(V(1).sub(o));
          ((t.colorNode = J(2.6, 0.12, 0.08).mul(n.mul(0.85).add(0.15))),
            (h = t));
          break;
        }
        case `Shackleton coil glow`: {
          let t = new At({ name: e.name }),
            n = Hr(Gi.x.mul(Fd).sub(a.mul(5)))
              .mul(0.5)
              .add(0.5)
              .pow(6)
              .mul(s)
              .mul(1.6)
              .add(0.75);
          ((t.colorNode = J(0.35, 0.95, 2.4).mul(n)), (h = t));
          break;
        }
        case `Shackleton cable`: {
          let t = new I({
              name: e.name,
              color: i.color,
              roughness: 0.6,
              metalness: 0.2,
              alphaToCoverage: !0,
            }),
            n = Ur.sub(W).length();
          ((t.opacityNode = V(1).sub(Z(Pd[0], Pd[1], n))),
            (t.alphaTest = 0.01),
            (h = t));
          break;
        }
        case `Shackleton pad numerals`: {
          let t = new I({
              name: e.name,
              color: i.color,
              roughness: 0.6,
              metalness: 0,
            }),
            n = Cr(X().x.mul(8)),
            r = Er.toFloat().mod(8);
          ((t.opacityNode = V(1).sub(K(0.5, n.sub(r).abs()))),
            (t.alphaTest = 0.5),
            (h = t));
          break;
        }
        case `Shackleton regolith ground`:
          t.groundMaterial
            ? (h = t.groundMaterial())
            : ((u = !0),
              (h = wu(Su(n).texture, { name: e.name, mobile: n, tint: !1 })));
          break;
        case `Shackleton pool water`:
          h = new cr({
            name: e.name,
            color: `#0b2228`,
            roughness: 0.03,
            metalness: 0,
          });
          break;
        default:
          h = d(i);
      }
      return (l.add(e), c.set(e.uuid, h), h);
    };
  try {
    r.updateMatrixWorld(!0);
    let t = new Map(),
      c = {};
    for (let e of md) {
      let n = r.children.find((t) => t.userData.assetId === e);
      if (!n) throw Error(`Shackleton kit is missing ${e}.`);
      let i = new rr().setFromObject(n);
      if (i.isEmpty() || i.max.y > Md || i.min.y < Nd)
        throw Error(`Invalid Shackleton bounds for ${e}.`);
      (t.set(e, n), (c[e] = { min: i.min.toArray(), max: i.max.toArray() }));
    }
    let d = t.get(`comms-dish-base`).userData,
      f =
        Array.isArray(d.headPivot) && d.headPivot.length === 3
          ? d.headPivot
          : hd.commsHeadPivot,
      p = new Map();
    for (let t of e) t.asset === `comms-dish-base` && p.set(Ld(t.position), t);
    let m = 0,
      g = Cd(e).flatMap((e) => {
        if (!n) return [e];
        if (e.asset === `boulder-a`) return m++ % 2 ? [] : [e];
        let t = Dd[e.asset];
        return t ? [{ ...e, asset: t }] : [e];
      }),
      _ = {},
      v = 0,
      y = 0;
    for (let e of md) {
      let r = g
        .filter((t) => t.asset === e)
        .map((t) => ({
          matrix: xd(
            t,
            f,
            void 0,
            e === `comms-dish-head` ? p.get(Ld(t.position)) : void 0,
          ),
          x: t.position[0],
          z: t.position[2],
        }));
      if (((_[e] = r.length), !r.length)) continue;
      let a = 0;
      t.get(e).traverse((e) => {
        e instanceof M && (a += Id(e.geometry));
      });
      let o = a * r.length > jd,
        s = new Map();
      for (let e of r) {
        let t = o ? `${Math.floor(e.x / Ad)},${Math.floor(e.z / Ad)}` : `all`,
          n = s.get(t);
        (n || s.set(t, (n = [])), n.push(e));
      }
      let c = Td.has(e) || (n && Ed.has(e));
      t.get(e).traverse((t) => {
        if (!(t instanceof M)) return;
        let n = Id(t.geometry);
        ((y += n), (v += n * r.length));
        let a = t.geometry.clone().applyMatrix4(t.matrixWorld),
          o = h(t.material),
          l = o.transparent;
        for (let [n, r] of s) {
          let s = l ? a.clone() : a,
            u = ao(s, o, r.length);
          ((u.name = `${e} · ${t.name} · ${n}`),
            (u.castShadow = !c && !l),
            (u.receiveShadow = !l),
            (u.userData.reflectionHidden = Od.has(e)),
            l && (u.renderOrder = 2),
            r.forEach((e, t) => u.setMatrixAt(t, e.matrix)),
            (u.instanceMatrix.needsUpdate = !0),
            u.computeBoundingBox(),
            u.computeBoundingSphere(),
            l &&
              u.boundingSphere &&
              (s.boundingSphere = u.boundingSphere.clone()),
            i.add(u));
        }
        l && a.dispose();
      });
    }
    r.traverse((e) => {
      e instanceof M && e.geometry.dispose();
    });
    for (let e of l) e.dispose();
    Wa(r, i);
    let b = !1;
    return {
      group: i,
      placements: e,
      bounds: c,
      headPivot: f,
      update(e, t, n) {
        ((a.value = t),
          (o.value = +!n),
          n
            ? (s.value = 0)
            : (s.value += (1 - s.value) * Math.min(1, Math.max(0, e) * 3)));
      },
      dispose() {
        b || ((b = !0), i.removeFromParent(), Oc(i), u && Cu(n));
      },
      info: {
        source: `Blender`,
        loaded: !0,
        kit: `Shackleton Rim`,
        assets: md.length,
        instances: g.length,
        counts: _,
        drawBatches: i.children.length,
        prototypeTriangles: y,
        instanceTriangles: v,
      },
    };
  } catch (e) {
    i.traverse((e) => {
      e instanceof M && (e.geometry.dispose(), e instanceof Dt && e.dispose());
    });
    for (let e of c.values()) e.dispose();
    throw (u && Cu(n), Oc(r), e);
  }
}
var zd = {
    "landing-pad": 40,
    biodome: 100,
    "isru-plant": 22,
    "fuel-tanks": 15,
    "printed-habitat": 10,
    "habitat-module": 13,
    "habitat-inflatable": 8,
    "fission-reactor": 16,
    "comms-mast": 9,
    "comms-dish-base": 6,
    "solar-mast": 6,
    "crater-beacon": 5,
    "lunar-rover": 5,
    "ltv-rover": 3,
    "power-pylon": 2,
    "cable-spool": 3,
  },
  Bd = (e, t) => Math.atan2(-t, e);
function Vd(e) {
  return () => {
    e = (e + 1831565813) | 0;
    let t = Math.imul(e ^ (e >>> 15), 1 | e);
    return (
      (t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t),
      ((t ^ (t >>> 14)) >>> 0) / 4294967296
    );
  };
}
