// assets__game-D43Oxqny 11 — distance
// Lines 3339-3502 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function As(e) {
  let t = new Map(),
    n = (e) => {
      let n = t.get(e);
      return (n || ((n = e.clone()), t.set(e, n)), n);
    };
  return (
    e.traverse((e) => {
      let t = e;
      t.isMesh &&
        (t.material = Array.isArray(t.material)
          ? t.material.map(n)
          : n(t.material));
    }),
    () => {
      for (let e of t.values()) e.dispose();
      t.clear();
    }
  );
}
var { lerp: js, smoothstep: Ms, smootherstep: Ns } = F,
  Ps = (e) => e * e * (2 - e),
  Fs = (e) => 1 - Ps(1 - e),
  Is = 0.7,
  Ls = (e) => Math.max(e.front - e.distance, 40),
  Rs = (e) => js(11, 15, Ms(e, 0, 0.45)),
  zs = 2.5,
  Bs = [
    {
      name: `grid`,
      seconds: 15,
      blend: 3,
      pose: (e, t, n) => {
        let r = js(Ls(t) + 16, 12, Fs(e));
        return {
          eye: {
            distance: t.distance + r,
            lane: n * 0.6,
            height: js(2.6, 2.1, e),
          },
          look: {
            distance: t.distance + r - js(20, 17, e),
            lane: js(n * 0.3, t.lane, Ms(e, 0.5, 1)),
            height: 1.2,
          },
          fov: 46,
        };
      },
    },
    {
      name: `orbit`,
      seconds: 20,
      blend: 3,
      pose: (e, t, n) => {
        let r = js(0.35, zs, e),
          i = Rs(e),
          a = Math.sin(e * Math.PI);
        return {
          eye: {
            distance: t.distance + i * Math.cos(r),
            lane: t.lane + n * i * Math.sin(r),
            height: js(2.9, 2.2, e) - 1.4 * a,
          },
          look: { distance: t.distance + 0.4, lane: t.lane, height: 1 },
          fov: 44 - 4 * a,
        };
      },
    },
    {
      name: `crane`,
      seconds: 14,
      blend: 4,
      pose: (e, t, n) => {
        let r = Ns(e, 0, 1);
        return {
          eye: {
            distance: t.distance + js(Rs(1) * Math.cos(zs), -22, r),
            lane: t.lane + n * js(Rs(1) * Math.sin(zs), 3.2, r),
            height: js(2.2, 12.5, r),
          },
          look: {
            distance: t.distance + js(0.4, Ls(t) + 25, Ms(r, 0.05, 1)),
            lane: js(t.lane, 0, r),
            height: js(1, 0, r),
          },
          fov: js(46, 52, r),
        };
      },
    },
    {
      name: `flyover`,
      seconds: 13,
      blend: 0,
      pose: (e, t, n) => ({
        eye: {
          distance: t.distance + js(-22, Ls(t) * 0.55, Ps(e)),
          lane: js(t.lane + n * 3.2, n * 2, e),
          height: js(12.5, 15, e),
        },
        look: {
          distance: t.distance + Ls(t) + js(25, 60, e),
          lane: 0,
          height: 0,
        },
        fov: 52,
      }),
    },
  ],
  Vs = Bs.reduce(
    (e, t, n) => [...e, n ? e[n - 1] + Bs[n - 1].seconds - Bs[n - 1].blend : 0],
    [],
  ),
  Hs = Vs.at(-1) + Bs.at(-1).seconds - Bs.at(-1).blend,
  Us = Vs[1] + Bs[1].seconds * 0.35,
  Ws = (e, t, n) => ({
    distance: js(e.distance, t.distance, n),
    lane: js(e.lane, t.lane, n),
    height: js(e.height, t.height, n),
  });
function Gs(e, t) {
  let n = t.lane < 0 ? 1 : -1,
    r = Math.floor(Math.max(0, e) / Hs),
    i = Math.max(0, e) - r * Hs,
    a = Bs.length - 1;
  for (; a > 0 && Vs[a] > i;) a--;
  let o = Bs[a],
    s = o.pose((i - Vs[a]) / o.seconds, t, n),
    c = s,
    l = o.name,
    u = Bs[a - 1];
  if (u && i < Vs[a] + u.blend) {
    let e = Ns(i - Vs[a], 0, u.blend),
      r = u.pose((i - Vs[a - 1]) / u.seconds, t, n);
    ((c = {
      eye: Ws(r.eye, s.eye, e),
      look: Ws(r.look, s.look, e),
      fov: js(r.fov, s.fov, e),
    }),
      e < 0.5 && (l = u.name));
  }
  let d = Bs.at(-1),
    f =
      a === Bs.length - 1
        ? Ms(Vs[a] + d.seconds - i, 0, Is)
        : a === 0 && r > 0
          ? Ms(i, 0, Is)
          : 1;
  return { ...c, light: f, shot: l };
}
function Ks(e, t = !1) {
  let n = e > 0,
    r = Math.max(0, wt - e),
    i = 1 - F.smoothstep(r, 0, 0.85);
  return {
    active: n,
    age: r,
    lift: n && !t ? i * 2.4 : 0,
    scale: n && !t ? 0.35 + 0.65 * F.smoothstep(r, 0, 0.28) : 1,
    pitch: n && !t ? -i * 0.1 : 0,
    opacity: n
      ? (0.3 + 0.7 * F.smoothstep(r, 0, 0.08)) * F.smoothstep(e, 0, 0.4)
      : 0,
  };
}
