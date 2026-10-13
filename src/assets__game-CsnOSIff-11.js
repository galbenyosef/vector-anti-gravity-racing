// assets__game-CsnOSIff 11 — distance
// Lines 3320-3483 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function ks(e) {
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
var { lerp: As, smoothstep: js, smootherstep: Ms } = s,
  Ns = (e) => e * e * (2 - e),
  Ps = (e) => 1 - Ns(1 - e),
  Fs = 0.7,
  Is = (e) => Math.max(e.front - e.distance, 40),
  Ls = (e) => As(11, 15, js(e, 0, 0.45)),
  Rs = 2.5,
  zs = [
    {
      name: `grid`,
      seconds: 15,
      blend: 3,
      pose: (e, t, n) => {
        let r = As(Is(t) + 16, 12, Ps(e));
        return {
          eye: {
            distance: t.distance + r,
            lane: n * 0.6,
            height: As(2.6, 2.1, e),
          },
          look: {
            distance: t.distance + r - As(20, 17, e),
            lane: As(n * 0.3, t.lane, js(e, 0.5, 1)),
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
        let r = As(0.35, Rs, e),
          i = Ls(e),
          a = Math.sin(e * Math.PI);
        return {
          eye: {
            distance: t.distance + i * Math.cos(r),
            lane: t.lane + n * i * Math.sin(r),
            height: As(2.9, 2.2, e) - 1.4 * a,
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
        let r = Ms(e, 0, 1);
        return {
          eye: {
            distance: t.distance + As(Ls(1) * Math.cos(Rs), -22, r),
            lane: t.lane + n * As(Ls(1) * Math.sin(Rs), 3.2, r),
            height: As(2.2, 12.5, r),
          },
          look: {
            distance: t.distance + As(0.4, Is(t) + 25, js(r, 0.05, 1)),
            lane: As(t.lane, 0, r),
            height: As(1, 0, r),
          },
          fov: As(46, 52, r),
        };
      },
    },
    {
      name: `flyover`,
      seconds: 13,
      blend: 0,
      pose: (e, t, n) => ({
        eye: {
          distance: t.distance + As(-22, Is(t) * 0.55, Ns(e)),
          lane: As(t.lane + n * 3.2, n * 2, e),
          height: As(12.5, 15, e),
        },
        look: {
          distance: t.distance + Is(t) + As(25, 60, e),
          lane: 0,
          height: 0,
        },
        fov: 52,
      }),
    },
  ],
  Bs = zs.reduce(
    (e, t, n) => [...e, n ? e[n - 1] + zs[n - 1].seconds - zs[n - 1].blend : 0],
    [],
  ),
  Vs = Bs.at(-1) + zs.at(-1).seconds - zs.at(-1).blend,
  Hs = Bs[1] + zs[1].seconds * 0.35,
  Us = (e, t, n) => ({
    distance: As(e.distance, t.distance, n),
    lane: As(e.lane, t.lane, n),
    height: As(e.height, t.height, n),
  });
function Ws(e, t) {
  let n = t.lane < 0 ? 1 : -1,
    r = Math.floor(Math.max(0, e) / Vs),
    i = Math.max(0, e) - r * Vs,
    a = zs.length - 1;
  for (; a > 0 && Bs[a] > i;) a--;
  let o = zs[a],
    s = o.pose((i - Bs[a]) / o.seconds, t, n),
    c = s,
    l = o.name,
    u = zs[a - 1];
  if (u && i < Bs[a] + u.blend) {
    let e = Ms(i - Bs[a], 0, u.blend),
      r = u.pose((i - Bs[a - 1]) / u.seconds, t, n);
    ((c = {
      eye: Us(r.eye, s.eye, e),
      look: Us(r.look, s.look, e),
      fov: As(r.fov, s.fov, e),
    }),
      e < 0.5 && (l = u.name));
  }
  let d = zs.at(-1),
    f =
      a === zs.length - 1
        ? js(Bs[a] + d.seconds - i, 0, Fs)
        : a === 0 && r > 0
          ? js(i, 0, Fs)
          : 1;
  return { ...c, light: f, shot: l };
}
function Gs(e, t = !1) {
  let n = e > 0,
    r = Math.max(0, Ln - e),
    i = 1 - s.smoothstep(r, 0, 0.85);
  return {
    active: n,
    age: r,
    lift: n && !t ? i * 2.4 : 0,
    scale: n && !t ? 0.35 + 0.65 * s.smoothstep(r, 0, 0.28) : 1,
    pitch: n && !t ? -i * 0.1 : 0,
    opacity: n
      ? (0.3 + 0.7 * s.smoothstep(r, 0, 0.08)) * s.smoothstep(e, 0, 0.4)
      : 0,
  };
}
