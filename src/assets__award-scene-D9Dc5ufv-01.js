// assets__award-scene-D9Dc5ufv 01 — math
// Lines 1-214 of readable/assets__award-scene-D9Dc5ufv.pretty.js (statement-aligned).
import {
  $i as e,
  Ar as t,
  Da as n,
  Hn as r,
  fa as i,
  in as a,
  l as o,
  nr as s,
  pn as c,
  qr as l,
  vn as u,
} from "./index-DphGw8Ou.js";
import { n as d } from "./HDRLoader-C77IBAVq.js";
import { $t as f, i as p, nn as m, s as h } from "./renderer-setup--EktvnNe.js";
function g(e) {
  let t = e.clone(!0),
    n = new Map(),
    r = new Map(),
    a = new Map(),
    o = (e) => {
      let t = r.get(e);
      if (t) return t;
      ((t = e.clone()), r.set(e, t));
      for (let [e, n] of Object.entries(t)) {
        if (!(n instanceof i)) continue;
        let r = a.get(n);
        (r || ((r = n.clone()), a.set(n, r)), (t[e] = r));
      }
      return t;
    };
  t.traverse((e) => {
    let t = e;
    if (!t.isMesh) return;
    let r = n.get(t.geometry);
    (r || ((r = t.geometry.clone()), n.set(t.geometry, r)),
      (t.geometry = r),
      (t.material = Array.isArray(t.material)
        ? t.material.map(o)
        : o(t.material)));
  });
  let s = !1;
  return {
    model: t,
    dispose() {
      if (!s) {
        s = !0;
        for (let e of r.values()) e.dispose();
        for (let e of n.values()) e.dispose();
        for (let e of a.values()) e.dispose();
      }
    },
  };
}
var _ = {
    gold: [1, 0.76, 0.2],
    silver: [0.9, 0.91, 0.94],
    bronze: [0.46, 0.17, 0.065],
  },
  v = null,
  y = null;
function b() {
  return (
    (y ??= m(f.day).catch((e) => {
      throw ((y = null), e);
    })),
    y
  );
}
function x() {
  return (
    (v ??= new d()
      .loadAsync(new URL(`models/awards.glb`, document.baseURI).href)
      .then((e) => e.scene)
      .catch((e) => {
        throw ((v = null), e);
      })),
    v
  );
}
var S = (e) => {
  let t = 1.6;
  return 1 + (t + 1) * (e - 1) ** 3 + t * (e - 1) ** 2;
};
async function C(
  i,
  { kind: d, metal: m, reveal: v, still: y, onReady: C, signal: w },
) {
  let T = document.createElement(`canvas`);
  ((T.className = `award-canvas`), T.setAttribute(`aria-hidden`, `true`));
  let E = new c({
      canvas: T,
      alpha: !0,
      antialias: !0,
      forceWebGL: o().forceWebGL,
    }),
    D = [],
    O = !1,
    k = { dispose: () => {}, setMetal: (e) => {}, setActive: (e) => {} },
    A = null,
    j = () => {
      O ||
        ((O = !0),
        w?.removeEventListener(`abort`, j),
        document.removeEventListener(`visibilitychange`, M),
        A?.disconnect(),
        E.setAnimationLoop(null),
        D.forEach((e) => e.dispose()),
        p(E),
        T.remove());
    };
  k.dispose = j;
  let M = () => k.setActive(N),
    N = !0;
  try {
    if ((await E.init(), w?.aborted)) return (j(), k);
    w?.addEventListener(`abort`, j, { once: !0 });
    let c = await x();
    if (O) return k;
    (E.setClearColor(0, 0),
      (E.toneMapping = 6),
      (E.toneMappingExposure = 1.15));
    let p = Math.min(window.devicePixelRatio || 1, o().safeMode ? 1 : 2),
      P = new e(),
      F = new a(E);
    D.push(F);
    let I = await b();
    if (O) return k;
    if (I) {
      let e = I.texture.clone();
      try {
        let t = F.fromEquirectangular(e);
        ((P.environment = t.texture), D.push(t));
      } finally {
        e.dispose();
      }
      ((P.environmentIntensity = 1.25),
        (P.environmentRotation.y = t.degToRad(f.day.rotation)));
    }
    let L = new r(16769728, 2.4);
    L.position.set(-2, 3, 4);
    let R = new r(7325951, 2.2);
    (R.position.set(3, 1.5, -3), P.add(L, R));
    let z = c.getObjectByName(d === `medal` ? `Medal` : `Trophy`);
    if (!z) throw Error(`awards.glb has no ${d}`);
    let B = g(z);
    D.push(B);
    let V = B.model;
    (V.position.set(0, 0, 0), V.rotation.set(0, 0, 0));
    let H = [];
    V.traverse((e) => {
      let t = e;
      if (!t.isMesh) return;
      let n = (e) => (e.name.startsWith(`Award metal`) && H.push(e), e);
      t.material = Array.isArray(t.material)
        ? t.material.map(n)
        : n(t.material);
    });
    let U = new u().setFromObject(V),
      W = U.getSize(new n());
    V.position.sub(U.getCenter(new n()));
    let G = new s();
    (G.add(V), G.scale.setScalar(2 / Math.max(W.x, W.y, W.z)), P.add(G));
    let K = V.getObjectByName(`Trophy halo`),
      q = new l(26, 1, 0.1, 50);
    (q.position.set(0, 0.25, 5.4), q.lookAt(0, 0, 0));
    let J = () => {
      let e = Math.max(1, i.clientWidth),
        t = Math.max(1, i.clientHeight);
      (h(E, e, t, p), (q.aspect = e / t), q.updateProjectionMatrix());
    };
    (J(), (A = new ResizeObserver(J)), A.observe(i), i.appendChild(T));
    let Y = performance.now(),
      X = d === `medal` ? 0.55 : 0.4,
      Z = (e) => {
        let t = (e - Y) / 1e3;
        if (y) {
          G.rotation.set(0.08, -0.45, 0);
          return;
        }
        let n = v ? Math.min(1, t / 0.9) : 1;
        G.scale.setScalar(
          (2 / Math.max(W.x, W.y, W.z)) * (v ? 0.25 + 0.75 * S(n) : 1),
        );
        let r = v ? (1 - n) ** 2 * Math.PI * 4 : 0;
        ((G.rotation.y = -0.45 + t * X + r),
          (G.rotation.x = 0.06 + Math.sin(t * 0.9) * 0.05),
          (G.position.y = Math.sin(t * 1.6) * 0.06),
          K && (K.rotation.y = t * 1.4));
      },
      Q = (e) => {
        O || document.hidden || (Z(e), E.render(P, q));
      };
    k.setMetal = (e) => {
      let [t, n, r] = _[e];
      for (let e of H) e.color.setRGB(t, n, r);
      (y || !$) && Q(performance.now());
    };
    let $ = !1;
    ((k.setActive = (e) => {
      ((N = e),
        ($ = N && !y && !document.hidden && !O),
        E.setAnimationLoop($ ? Q : null));
    }),
      document.addEventListener(`visibilitychange`, M),
      k.setMetal(m),
      Q(Y),
      C(),
      k.setActive(!0));
  } catch (e) {
    throw (j(), e);
  }
  return k;
}
