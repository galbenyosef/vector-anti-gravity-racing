// assets__game-CsnOSIff 13 — mul
// Lines 3827-4104 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
async function fc(e, t) {
  let n = [];
  e.traverse((e) => {
    `isLight` in e ||
      `isCamera` in e ||
      (n.push([e, e.visible, e.frustumCulled]),
      (e.visible = !0),
      (e.frustumCulled = !1));
  });
  try {
    return await t();
  } finally {
    for (let [e, t, r] of n) ((e.visible = t), (e.frustumCulled = r));
  }
}
async function pc(e) {
  let t = e.backend;
  if (t.device) await t.device.queue.onSubmittedWorkDone();
  else if (t.gl) {
    let e = t.gl,
      n = e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE, 0);
    if (!n) return;
    e.flush();
    try {
      for (
        ;
        !e.isContextLost() && e.clientWaitSync(n, 0, 0) === e.TIMEOUT_EXPIRED;
      )
        await dc();
    } finally {
      e.deleteSync(n);
    }
  }
}
function mc() {
  return new Promise((e) => {
    let t = new MessageChannel();
    ((t.port1.onmessage = () => {
      (t.port1.close(), e());
    }),
      t.port2.postMessage(null));
  });
}
function hc(e) {
  let t = e._pipelines;
  if (!t) return;
  let n = t.getForRender.bind(t),
    r = null;
  t.getForRender = (e, t = null) => {
    if (!t || !r) return n(e, t);
    let i = [],
      a = n(e, i);
    return (r.push(...i), a);
  };
  let i = e.compileAsync.bind(e);
  e.compileAsync = async (...e) => {
    let t = r,
      n = [];
    r = n;
    let a = globalThis,
      o = a.scheduler,
      s = typeof o?.yield != `function`;
    s && (o ? (o.yield = mc) : (a.scheduler = { yield: mc }));
    try {
      await i(...e);
    } finally {
      ((r = t), s && (o ? delete o.yield : delete a.scheduler));
    }
    await Promise.all(n);
  };
}
var gc = new g(1, 0, 0),
  _c = new g(0, 0, 1),
  vc = new Ot(),
  yc = Math.PI * 2,
  bc = (e, t = 0, n = 1) =>
    Number.isFinite(e) ? Math.min(n, Math.max(t, e)) : 0;
function xc(e) {
  let t = (t) =>
    [`negative_x`, `positive_x`].flatMap((n, r) => {
      let i = e.getObjectByName(`${t}_${n}`);
      return i
        ? [{ pivot: i, rest: i.quaternion.clone(), side: r ? 1 : -1 }]
        : [];
    });
  return {
    turbines: t(`turbine`),
    cooling: t(`cooling`),
    phase: 0,
    heat: 0,
    coolingAngles: [0, 0],
  };
}
function Sc(e, t, n) {
  if (!Number.isFinite(n) || n <= 0) return;
  let r = Math.min(n, 0.1),
    i = bc(t.speed),
    a = bc(t.throttle),
    o = bc(t.boost),
    s = bc(t.steer, -1, 1),
    c = bc(t.airbrake, -1, 1),
    l = Number.isFinite(t.time) ? t.time : 0,
    u = Math.min(1, a * 0.4 + i * 0.22 + o * 0.72);
  ((e.heat += (u - e.heat) * (1 - Math.exp(-r * 2.8))),
    (e.phase = (e.phase + r * (2.2 + a * 5 + i * 8 + o * 9)) % yc));
  for (let { pivot: t, rest: n, side: r } of e.turbines)
    (vc.setFromAxisAngle(_c, e.phase * r), t.quaternion.copy(n).multiply(vc));
  for (let t = 0; t < e.cooling.length; t++) {
    let { pivot: n, rest: a, side: o } = e.cooling[t],
      u =
        0.025 +
        e.heat * 0.36 +
        Math.max(0, c * o) * 0.1 +
        Math.max(0, s * o) * i * 0.045 +
        (Math.sin(l * 2.1 + o * 0.7) * 0.5 + 0.5) * 0.018;
    ((e.coolingAngles[t] += (u - e.coolingAngles[t]) * (1 - Math.exp(-r * 7))),
      vc.setFromAxisAngle(gc, e.coolingAngles[t]),
      n.quaternion.copy(a).multiply(vc));
  }
}
function Cc(e) {
  return e === `Carbon composite`
    ? `carbon`
    : e === `Brushed titanium`
      ? `titanium`
      : e === `Polarised canopy`
        ? `canopy`
        : [
              `Ceramic white`,
              `Porcelain ivory`,
              `Wavedash pearl`,
              `Claude ivory`,
            ].includes(e)
          ? `ceramic`
          : e === `Champagne gold`
            ? `gold`
            : e === `Burnished copper`
              ? `copper`
              : [
                    `Solar orange`,
                    `Atlantic blue`,
                    `Glacier cyan`,
                    `Crimson enamel`,
                    `Royal violet`,
                    `Ion magenta`,
                    `Wavedash graphite`,
                    `Wavedash cyan`,
                    `Claude terracotta`,
                  ].includes(e)
                ? `enamel`
                : null;
}
function wc(e) {
  let t = R(e).rgb,
    n = t.xy.mul(2).sub(1);
  return q(n.mul(n.length().smoothstep(0.016, 0.032)).mul(0.5).add(0.5), t.z);
}
function Tc(e, t) {
  let n = new kt().copy(e);
  if (((n.userData.surfaceFinish = t), t === `canopy`)) {
    let e = Aa.canopy;
    return (
      n.color.multiplyScalar(0.48),
      (n.roughness = e.roughness),
      (n.metalness = e.metalness),
      (n.clearcoat = e.clearcoat),
      (n.clearcoatRoughness = e.clearcoatRoughness),
      (n.iridescence = 0.16),
      (n.iridescenceIOR = 1.3),
      (n.iridescenceThicknessRange = [180, 310]),
      n
    );
  }
  if (!e.map || !e.roughnessMap || !e.normalMap) return n;
  let r = X(),
    i = r.fwidth().length(),
    a = B(1).sub(i.smoothstep(0.0015, 0.007)),
    o = R(e.map).rgb.mul(q(e.color.r, e.color.g, e.color.b)),
    s = R(e.roughnessMap),
    c = R(e.roughnessMap).bias(B(4)).g,
    l = wc(e.normalMap),
    u = (t) => K(t, t * Math.sign(e.normalScale.y || 1)),
    d =
      t === `carbon`
        ? B(0.22)
        : t === `titanium`
          ? s.b.mul(e.metalness).max(0.82)
          : s.b.mul(e.metalness),
    f = Aa[t].metalness,
    p = f === 0 ? o.mul(B(1).sub(d)) : o;
  n.metalnessNode = B(f);
  let m = Fi(r.mul(8)).mul(0.5).add(0.5),
    h = t === `carbon` ? 0.43 : t === `titanium` ? 0.35 : 0.325,
    g = s.g.smoothstep(h + 0.045, h + 0.115);
  if (
    ((n.aoNode = B(1).sub(g.mul(0.17))),
    (n.clearcoatNormalMap = e.normalMap),
    (n.clearcoatNormalNode = si(l, u(0.65))),
    t === `carbon`)
  ) {
    let e = r.mul(Math.PI * 102.4),
      t = e.x.sin().mul(e.y.sin()).mul(a);
    ((n.colorNode = p.mul(t.mul(0.06).add(1))),
      (n.roughnessNode = B(0.34)
        .add(t.mul(0.075))
        .add(m.mul(0.055))
        .add(g.mul(0.16))
        .clamp(0.24, 0.65)),
      (n.clearcoat = 0.36),
      (n.clearcoatRoughness = 0.22),
      (n.anisotropy = 0.32));
    let i = K(e.x.cos().mul(e.y.sin()), e.x.sin().mul(e.y.cos())).mul(
      a.mul(0.035),
    );
    n.normalNode = si(q(l.xy.add(i), l.z), u(1.55));
  } else if (t === `titanium`) {
    let e = Fi(r.mul(K(220, 3))).mul(a);
    ((n.colorNode = p.mul(e.mul(0.045).add(1.035))),
      (n.roughnessNode = B(0.27)
        .add(e.mul(0.095))
        .add(m.mul(0.065))
        .add(g.mul(0.17))
        .clamp(0.19, 0.64)),
      (n.normalNode = si(l, u(1.75))),
      (n.clearcoat = 0),
      (n.anisotropy = 0.68),
      (n.anisotropyRotation = Math.PI / 2));
  } else if (t === `copper`) {
    let t = Fi(r.mul(K(160, 5))).mul(a);
    ((n.colorNode = p.mul(t.mul(0.05).add(1.04))),
      (n.roughnessNode = c
        .mul(e.roughness)
        .add(t.mul(0.045))
        .add(m.sub(0.5).mul(0.04))
        .add(g.mul(0.1))
        .clamp(0.06, 0.46)),
      (n.normalNode = si(l, u(1.45))),
      (n.clearcoat = 0.22),
      (n.clearcoatRoughness = 0.12),
      (n.anisotropy = 0.74),
      (n.anisotropyRotation = Math.PI / 2));
  } else {
    let r = t === `ceramic`;
    ((n.colorNode = p.mul(m.mul(0.035).add(0.975))),
      (n.roughnessNode = c
        .mul(e.roughness)
        .sub(r ? 0.025 : 0.085)
        .add(m.sub(0.5).mul(0.14))
        .add(g.mul(0.12))
        .clamp(0.19, 0.65)),
      (n.normalNode = si(l, u(r ? 2.1 : 1.8))),
      (n.clearcoatNode = J(r ? 0.3 : 0.48, 0.06, g)),
      (n.clearcoatRoughnessNode = m
        .mul(0.1)
        .add(r ? 0.19 : 0.115)
        .add(g.mul(0.18))));
  }
  return n;
}
function Ec(e) {
  let t = new Map();
  e.traverse((e) => {
    if (!(e instanceof N)) return;
    let n = (e) => {
      let n = t.get(e);
      if (n) return n;
      let r = Cc(e.name);
      if (!r || !(e instanceof Ne)) return e;
      let i = Tc(e, r);
      return (t.set(e, i), i);
    };
    e.material = Array.isArray(e.material) ? e.material.map(n) : n(e.material);
  });
  for (let e of t.keys()) e.dispose();
  return t.size;
}
ae(`kestrel`);
var Dc = Ga;
