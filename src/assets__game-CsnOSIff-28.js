// assets__game-CsnOSIff 28 — mul
// Lines 8075-8387 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
async function Ld(e, t = {}) {
  let n = t.mobile ?? !1,
    { scene: r } = await Ja(fd, n ? 1 : 4),
    a = new pn();
  a.name = `Shackleton Rim · Blender scenery`;
  let o = L(0),
    s = L(1),
    c = L(1),
    l = new Map(),
    u = new Set(),
    d = !1,
    f = (e) => {
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
      if (Ea[t.name]) return Da(t);
      let r = Od[t.name];
      return (r && ha(t, ga[r]), t);
    },
    p = (e) => {
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
        (t.opacityNode = yi(Ci.dot(Ji).abs())
          .oneMinus()
          .pow(4)
          .mul(0.63)
          .add(0.12)),
        t
      );
    },
    m = (e) => {
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
          (t.emissiveNode = R(e.emissiveMap, X()).rgb.mul(n).mul(2.6)),
        t
      );
    },
    h = (e, t, n) => new we({ name: e, color: new _(t).multiplyScalar(n) }),
    g = (e) => {
      let r = l.get(e.uuid);
      if (r) return r;
      let a = e,
        g;
      switch (e.name) {
        case `Shackleton dome glass`:
          g = p(a);
          break;
        case `Shackleton window glow`:
          g = m(a);
          break;
        case `Shackleton edge light`:
          g = h(e.name, `#ffdcae`, 2.6);
          break;
        case `Shackleton grow light`:
          g = h(e.name, `#ff4fb0`, 2.2);
          break;
        case `Shackleton foliage`: {
          let e = f(a);
          (a.map && (e.emissiveNode = R(a.map, X()).rgb.mul(0.7)), (g = e));
          break;
        }
        case `Shackleton beacon`: {
          let t = new i({ name: e.name }),
            n = G(0.8, z(o.mul(0.5).add(qr(Er.add(3)))))
              .mul(s)
              .add(B(1).sub(s));
          ((t.colorNode = q(2.6, 0.12, 0.08).mul(n.mul(0.85).add(0.15))),
            (g = t));
          break;
        }
        case `Shackleton coil glow`: {
          let t = new i({ name: e.name }),
            n = Hr(Wi.x.mul(Pd).sub(o.mul(5)))
              .mul(0.5)
              .add(0.5)
              .pow(6)
              .mul(c)
              .mul(1.6)
              .add(0.75);
          ((t.colorNode = q(0.35, 0.95, 2.4).mul(n)), (g = t));
          break;
        }
        case `Shackleton cable`: {
          let t = new I({
              name: e.name,
              color: a.color,
              roughness: 0.6,
              metalness: 0.2,
              alphaToCoverage: !0,
            }),
            n = Ur.sub(U).length();
          ((t.opacityNode = B(1).sub(Z(Nd[0], Nd[1], n))),
            (t.alphaTest = 0.01),
            (g = t));
          break;
        }
        case `Shackleton pad numerals`: {
          let t = new I({
              name: e.name,
              color: a.color,
              roughness: 0.6,
              metalness: 0,
            }),
            n = Cr(X().x.mul(8)),
            r = Er.toFloat().mod(8);
          ((t.opacityNode = B(1).sub(G(0.5, n.sub(r).abs()))),
            (t.alphaTest = 0.5),
            (g = t));
          break;
        }
        case `Shackleton regolith ground`:
          t.groundMaterial
            ? (g = t.groundMaterial())
            : ((d = !0),
              (g = Cu(xu(n).texture, { name: e.name, mobile: n, tint: !1 })));
          break;
        case `Shackleton pool water`:
          g = new Ne({
            name: e.name,
            color: `#0b2228`,
            roughness: 0.03,
            metalness: 0,
          });
          break;
        default:
          g = f(a);
      }
      return (u.add(e), l.set(e.uuid, g), g);
    };
  try {
    r.updateMatrixWorld(!0);
    let t = new Map(),
      i = {};
    for (let e of pd) {
      let n = r.children.find((t) => t.userData.assetId === e);
      if (!n) throw Error(`Shackleton kit is missing ${e}.`);
      let a = new Jn().setFromObject(n);
      if (a.isEmpty() || a.max.y > jd || a.min.y < Md)
        throw Error(`Invalid Shackleton bounds for ${e}.`);
      (t.set(e, n), (i[e] = { min: a.min.toArray(), max: a.max.toArray() }));
    }
    let l = t.get(`comms-dish-base`).userData,
      f =
        Array.isArray(l.headPivot) && l.headPivot.length === 3
          ? l.headPivot
          : md.commsHeadPivot,
      p = new Map();
    for (let t of e) t.asset === `comms-dish-base` && p.set(Id(t.position), t);
    let m = 0,
      h = Sd(e).flatMap((e) => {
        if (!n) return [e];
        if (e.asset === `boulder-a`) return m++ % 2 ? [] : [e];
        let t = Ed[e.asset];
        return t ? [{ ...e, asset: t }] : [e];
      }),
      _ = {},
      v = 0,
      y = 0;
    for (let e of pd) {
      let r = h
        .filter((t) => t.asset === e)
        .map((t) => ({
          matrix: bd(
            t,
            f,
            void 0,
            e === `comms-dish-head` ? p.get(Id(t.position)) : void 0,
          ),
          x: t.position[0],
          z: t.position[2],
        }));
      if (((_[e] = r.length), !r.length)) continue;
      let i = 0;
      t.get(e).traverse((e) => {
        e instanceof N && (i += Fd(e.geometry));
      });
      let o = i * r.length > Ad,
        s = new Map();
      for (let e of r) {
        let t = o ? `${Math.floor(e.x / kd)},${Math.floor(e.z / kd)}` : `all`,
          n = s.get(t);
        (n || s.set(t, (n = [])), n.push(e));
      }
      let c = wd.has(e) || (n && Td.has(e));
      t.get(e).traverse((t) => {
        if (!(t instanceof N)) return;
        let n = Fd(t.geometry);
        ((y += n), (v += n * r.length));
        let i = t.geometry.clone().applyMatrix4(t.matrixWorld),
          o = g(t.material),
          l = o.transparent;
        for (let [n, r] of s) {
          let s = l ? i.clone() : i,
            u = io(s, o, r.length);
          ((u.name = `${e} · ${t.name} · ${n}`),
            (u.castShadow = !c && !l),
            (u.receiveShadow = !l),
            (u.userData.reflectionHidden = Dd.has(e)),
            l && (u.renderOrder = 2),
            r.forEach((e, t) => u.setMatrixAt(t, e.matrix)),
            (u.instanceMatrix.needsUpdate = !0),
            u.computeBoundingBox(),
            u.computeBoundingSphere(),
            l &&
              u.boundingSphere &&
              (s.boundingSphere = u.boundingSphere.clone()),
            a.add(u));
        }
        l && i.dispose();
      });
    }
    r.traverse((e) => {
      e instanceof N && e.geometry.dispose();
    });
    for (let e of u) e.dispose();
    Ua(r, a);
    let b = !1;
    return {
      group: a,
      placements: e,
      bounds: i,
      headPivot: f,
      update(e, t, n) {
        ((o.value = t),
          (s.value = +!n),
          n
            ? (c.value = 0)
            : (c.value += (1 - c.value) * Math.min(1, Math.max(0, e) * 3)));
      },
      dispose() {
        b || ((b = !0), a.removeFromParent(), Dc(a), d && Su(n));
      },
      info: {
        source: `Blender`,
        loaded: !0,
        kit: `Shackleton Rim`,
        assets: pd.length,
        instances: h.length,
        counts: _,
        drawBatches: a.children.length,
        prototypeTriangles: y,
        instanceTriangles: v,
      },
    };
  } catch (e) {
    a.traverse((e) => {
      e instanceof N && (e.geometry.dispose(), e instanceof Wn && e.dispose());
    });
    for (let e of l.values()) e.dispose();
    throw (d && Su(n), Dc(r), e);
  }
}
var Rd = {
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
  zd = (e, t) => Math.atan2(-t, e);
function Bd(e) {
  return () => {
    e = (e + 1831565813) | 0;
    let t = Math.imul(e ^ (e >>> 15), 1 | e);
    return (
      (t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t),
      ((t ^ (t >>> 14)) >>> 0) / 4294967296
    );
  };
}
