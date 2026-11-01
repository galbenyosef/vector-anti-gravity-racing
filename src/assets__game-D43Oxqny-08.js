// assets__game-D43Oxqny 08 — intensity
// Lines 2473-2815 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function is(e, t = !1) {
  let n = ((e % v) + v) % v,
    r = 0;
  for (let e of en) {
    if (e.glass && !t) continue;
    let i = n - e.from * v,
      a = e.to * v - n;
    r = Math.max(r, F.smoothstep(Math.min(i, a), -14, 25));
  }
  return r;
}
function as(e) {
  let t = (((e % v) + v) % v) / v;
  return en.some((e) => t >= e.from - 0.003 && t <= e.to + 0.003);
}
function os() {
  let e = [];
  for (let t = 35; t < v; t += 66)
    as(t) || e.push({ distance: t, side: Math.floor(t / 66) % 2 ? -1 : 1 });
  return e;
}
var ss = {
    tunnel: {
      spacing: 50,
      height: 7.5,
      day: { color: `#8bdeff`, intensity: 270, range: 48 },
      night: { color: `#b1d8ff`, intensity: 400, range: 64 },
      lunar: { color: `#ffc890`, intensity: 270, range: 48 },
    },
    lamp: {
      color: `#b1d8ff`,
      intensity: 680,
      range: 56,
      height: 13.6,
      inset: 2.2,
      cone: 0.2,
    },
    lowDetail: { day: 210 / 270, night: 0.8 },
  },
  cs = { color: `#ffd2a0`, intensity: 700, range: 85, cone: 0.62 };
function ls({ night: e = !1, lunar: t = !1 } = {}) {
  let { tunnel: n, lamp: r } = ss,
    i = e ? n.night : t ? n.lunar : n.day,
    a = en
      .filter((e) => !e.glass)
      .flatMap((e) => {
        let t = e.from * v,
          r = e.to * v;
        return Array.from(
          { length: Math.floor((r - t) / n.spacing) + 1 },
          (e, r) => ({ ...i, position: L(t + r * n.spacing, 0, n.height) }),
        );
      });
  if (e)
    for (let { distance: e, side: t } of os())
      a.push({
        color: r.color,
        intensity: r.intensity,
        range: r.range,
        position: L(e, t * (P(e) - r.inset), r.height),
        cone: { axis: new A(0, -1, 0), cos: r.cone },
      });
  return a;
}
var us = {
    impact: { power: 230, total: 0.28 },
    muzzle: { power: 45, total: 0.1 },
    block: { power: 140, total: 0.22 },
    shield: { power: 90, total: 0.3 },
    muzzleItems: new Set([`cannon`, `turbo`, `rockets`, `missile`, `shield`]),
    colors: {
      turbo: `#78eaff`,
      rockets: `#ff9a52`,
      missile: `#ff6a78`,
      shield: `#7fb0ff`,
      block: `#a8c8ff`,
      default: `#ffb569`,
    },
    fade: [70, 110],
  },
  ds = class {
    constructor(
      e,
      t = !1,
      n = fr[t ? `night` : `day`],
      {
        shadowQuality: r = `high`,
        shadowDebug: i = !1,
        desert: a = !1,
        lunar: o = !1,
        metropolis: s = !1,
        ordnanceLights: c = 3,
      } = {},
    ) {
      ((this.scene = e),
        (this.night = t),
        (this.sun = new Re($o.day, es.day)),
        (this.sky = new ft(`#cce8ff`, `#3a4b55`, ts.day.open)),
        (this.engine = new it(`#61dfff`, 0, 15, 2)),
        (this.tunnel = Array.from(
          { length: 3 },
          () => new it(`#8bdeff`, 0, 48, 2),
        )),
        (this.flashes = Array.from({ length: 2 }, () => ({
          light: new it(`#ffb468`, 0, 20, 2),
          life: 0,
          total: 0.25,
          power: 0,
        }))),
        (this.field = new Fo()),
        (this.target = new A()),
        (this.viewer = new A()),
        (this.near = []),
        (this.serial = 0),
        (this.lastLaunch = ``),
        (this.source = null),
        (this.blend = 0),
        (this.exposure = 1),
        (this.lunar = o && !t),
        (this.metropolis = s && !t),
        (this.sunPosition = this.lunar
          ? qo
          : this.metropolis
            ? Xo
            : a && !t
              ? Wo
              : Uo),
        (this.sunDirection = (
          this.lunar ? Jo : this.metropolis ? Zo : a && !t ? Ko : Go
        ).clone()),
        (this.environmentIntensity = n.intensity),
        (this.tunnelEnvironment = n.tunnelIntensity),
        (this.fill = t
          ? ts.night
          : this.lunar
            ? Yo.fill
            : this.metropolis
              ? Qo.fill
              : a
                ? ns.fill
                : ts.day),
        a &&
          !t &&
          (this.sun.color.set(ns.sun),
          (this.sun.intensity = ns.sunIntensity),
          this.sky.color.set(ns.sky),
          this.sky.groundColor.set(ns.ground),
          (this.sky.intensity = this.fill.open)),
        this.metropolis &&
          (this.sun.color.set(Qo.sun),
          (this.sun.intensity = Qo.sunIntensity),
          this.sky.color.set(Qo.sky),
          this.sky.groundColor.set(Qo.ground),
          (this.sky.intensity = this.fill.open)),
        this.lunar &&
          (this.sun.color.set(Yo.sun),
          (this.sun.intensity = Yo.sunIntensity),
          this.sky.color.set(Yo.sky),
          this.sky.groundColor.set(Yo.ground),
          (this.sky.intensity = this.fill.open)),
        t &&
          (this.sun.color.set($o.night),
          (this.sun.intensity = es.night),
          this.sky.color.set(`#b4c5f0`),
          this.sky.groundColor.set(`#223d65`),
          (this.sky.intensity = ts.night.open)),
        this.field.set(ls({ night: t, lunar: this.lunar })),
        (this.fixtureLighting = new Lo(this.field, e)),
        (this.ordnance = new Ho(c)),
        (this.shadows = new jo(this.sun, this.sunDirection, r, { debug: i })),
        this.scene.add(
          this.sun,
          this.sun.target,
          this.sky,
          this.engine,
          ...this.flashes.map((e) => e.light),
          ...this.ordnance.lights,
        ));
    }
    addFixtures(e) {
      this.field.add(e);
    }
    update(e, t, n, r, i, a = []) {
      let o = is(e.distance);
      n > 0 && (this.blend += (o - this.blend) * (1 - Math.exp(-n * 4)));
      let s = this.fill;
      ((this.sky.intensity = F.lerp(s.open, s.tunnel, this.blend)),
        (this.scene.environmentIntensity =
          this.environmentIntensity *
          (1 - this.blend * (1 - this.tunnelEnvironment))),
        (this.exposure = this.night
          ? 1.15 + this.blend * 0.06
          : this.lunar
            ? Yo.exposure + this.blend * 0.15
            : this.metropolis
              ? Qo.exposure + this.blend * 0.12
              : 1 + this.blend * 0.12));
      let c = i ? i.getWorldPosition(this.viewer) : this.viewer.copy(t);
      (this.sun.target.position.copy(t),
        this.sun.position.copy(t).addScaledVector(this.sunDirection, rs),
        this.shadows.update(i, t));
      let l = r ? 1 : this.night ? ss.lowDetail.night : ss.lowDetail.day;
      this.field.gain.value = l;
      let u = this.field.nearest(t, this.tunnel.length, this.near);
      if (
        (this.tunnel.forEach((e, n) => {
          let r = u[n];
          if (!r) {
            e.intensity = 0;
            return;
          }
          (e.position.copy(r.position),
            e.color.set(r.color),
            (e.distance = r.range),
            (e.intensity =
              r.intensity *
              l *
              (1 - F.smoothstep(r.position.distanceTo(t), 30, 45))));
        }),
        this.engine.position.copy(L(e.distance - 3, e.lane, 0.8)),
        e.mode !== `paused` &&
          (this.engine.intensity =
            e.mode === `menu`
              ? 12
              : (18 + e.throttle * 15 + (e.boostActive ? 55 : 0)) *
                (r ? 1 : 0.65)),
        this.source !== e.combat)
      ) {
        ((this.source = e.combat), (this.serial = 0), (this.lastLaunch = ``));
        for (let e of this.flashes) e.life = 0;
        this.ordnance.reset();
      }
      let d = (e) => 1 - F.smoothstep(e.distanceTo(c), ...us.fade),
        f = (e) => e.power * (e.life / e.total) ** 2 * d(e.light.position);
      if (n > 0) {
        for (let e of this.flashes) e.life = Math.max(0, e.life - n);
        for (let t of e.combat.events) {
          if (
            t.id <= this.serial ||
            ((this.serial = t.id),
            e.mode !== `racing` ||
              ![`hit`, `explode`, `fire`, `block`].includes(t.kind))
          )
            continue;
          let n = t.kind === `fire`;
          if (n && !us.muzzleItems.has(t.item)) continue;
          let r = `${t.owner}:${t.item}:${t.time}`;
          if (n && r === this.lastLaunch) continue;
          (n && (this.lastLaunch = r),
            this.target.copy(L(t.distance, t.lane, 1.8)));
          let { power: i, total: a } =
              t.kind === `block`
                ? t.item === `cannon`
                  ? us.muzzle
                  : us.block
                : n && t.item === `shield`
                  ? us.shield
                  : n
                    ? us.muzzle
                    : us.impact,
            o = i * d(this.target);
          if (o <= 0) continue;
          let s = this.flashes.reduce((e, t) => (f(e) <= f(t) ? e : t));
          f(s) >= o ||
            (s.light.position.copy(this.target),
            s.light.color.set(
              t.kind === `block`
                ? us.colors.block
                : (n && us.colors[t.item]) || us.colors.default,
            ),
            (s.total = a),
            (s.life = a),
            (s.power = i));
        }
      }
      for (let e of this.flashes) e.light.intensity = f(e) * (r ? 1 : 0.5);
      return (
        this.ordnance.update(a, c, n, {
          camera: i,
          active: r
            ? this.ordnance.slots.length
            : Math.ceil(this.ordnance.slots.length / 2),
          gain: r ? 1 : 0.65,
        }),
        this.exposure
      );
    }
    snapshot() {
      let e = this.shadows.snapshot();
      return {
        localLightBudget: 1 + this.flashes.length + this.ordnance.slots.length,
        shadowMaps: e.cascades.length,
        shadowResolution: e.cascades.length ? e.mapSize : 0,
        shadow: e,
        sun: {
          intensity: this.sun.intensity,
          color: `#${this.sun.color.getHexString()}`,
          ...this.sunPosition,
        },
        tunnelBlend: +this.blend.toFixed(3),
        exposure: +this.exposure.toFixed(3),
        fixtures: this.field.snapshot(),
        impactLights: this.flashes.filter((e) => e.light.intensity > 1).length,
        ordnanceLights: this.ordnance.snapshot(),
        environmentIntensity: +this.scene.environmentIntensity.toFixed(3),
        environment: this.night ? `night` : `day`,
      };
    }
    dispose() {
      (this.shadows.dispose(), this.sun.shadow.dispose(), this.field.dispose());
    }
  },
  fs = [
    `spire-tower`,
    `arcology-block`,
    `twin-towers`,
    `neon-tenement`,
    `neon-tenement-tall`,
    `neon-tenement-lod`,
    `neon-tenement-tall-lod`,
    `data-spire`,
    `holo-pylon`,
    `lamp-mast`,
    `pier-column`,
    `pier-head`,
    `far-block-a`,
    `far-block-b`,
    `far-block-c`,
    `exchange-gate`,
  ],
  ps = { pitch: 110, street: 20 },
  ms = 0.125,
  hs = 10,
  gs = {
    "neon-tenement": `neon-tenement-lod`,
    "neon-tenement-tall": `neon-tenement-tall-lod`,
  };
function _s(e = 4) {
  return Array.from({ length: Math.ceil(v / e) }, (t, n) => {
    let r = Ot(n * e).position;
    return { d: n * e, x: r.x, y: r.y, z: r.z };
  });
}
