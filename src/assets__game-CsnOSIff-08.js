// assets__game-CsnOSIff 08 — intensity
// Lines 2456-2805 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function rs(e, t = !1) {
  let n = ((e % F) + F) % F,
    r = 0;
  for (let e of Se) {
    if (e.glass && !t) continue;
    let i = n - e.from * F,
      a = e.to * F - n;
    r = Math.max(r, s.smoothstep(Math.min(i, a), -14, 25));
  }
  return r;
}
function is(e) {
  let t = (((e % F) + F) % F) / F;
  return Se.some((e) => t >= e.from - 0.003 && t <= e.to + 0.003);
}
function as() {
  let e = [];
  for (let t = 35; t < F; t += 66)
    is(t) || e.push({ distance: t, side: Math.floor(t / 66) % 2 ? -1 : 1 });
  return e;
}
var os = {
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
  ss = { color: `#ffd2a0`, intensity: 700, range: 85, cone: 0.62 };
function cs({ night: e = !1, lunar: t = !1 } = {}) {
  let { tunnel: n, lamp: r } = os,
    i = e ? n.night : t ? n.lunar : n.day,
    a = Se.filter((e) => !e.glass).flatMap((e) => {
      let t = e.from * F,
        r = e.to * F;
      return Array.from(
        { length: Math.floor((r - t) / n.spacing) + 1 },
        (e, r) => ({ ...i, position: P(t + r * n.spacing, 0, n.height) }),
      );
    });
  if (e)
    for (let { distance: e, side: t } of as())
      a.push({
        color: r.color,
        intensity: r.intensity,
        range: r.range,
        position: P(e, t * (j(e) - r.inset), r.height),
        cone: { axis: new g(0, -1, 0), cos: r.cone },
      });
  return a;
}
var ls = {
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
  us = class {
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
        (this.sun = new te(Qo.day, $o.day)),
        (this.sky = new Gt(`#cce8ff`, `#3a4b55`, es.day.open)),
        (this.engine = new $e(`#61dfff`, 0, 15, 2)),
        (this.tunnel = Array.from(
          { length: 3 },
          () => new $e(`#8bdeff`, 0, 48, 2),
        )),
        (this.flashes = Array.from({ length: 2 }, () => ({
          light: new $e(`#ffb468`, 0, 20, 2),
          life: 0,
          total: 0.25,
          power: 0,
        }))),
        (this.field = new Po()),
        (this.target = new g()),
        (this.viewer = new g()),
        (this.near = []),
        (this.serial = 0),
        (this.lastLaunch = ``),
        (this.source = null),
        (this.blend = 0),
        (this.exposure = 1),
        (this.lunar = o && !t),
        (this.metropolis = s && !t),
        (this.sunPosition = this.lunar
          ? Ko
          : this.metropolis
            ? Yo
            : a && !t
              ? Uo
              : Ho),
        (this.sunDirection = (
          this.lunar ? qo : this.metropolis ? Xo : a && !t ? Go : Wo
        ).clone()),
        (this.environmentIntensity = n.intensity),
        (this.tunnelEnvironment = n.tunnelIntensity),
        (this.fill = t
          ? es.night
          : this.lunar
            ? Jo.fill
            : this.metropolis
              ? Zo.fill
              : a
                ? ts.fill
                : es.day),
        a &&
          !t &&
          (this.sun.color.set(ts.sun),
          (this.sun.intensity = ts.sunIntensity),
          this.sky.color.set(ts.sky),
          this.sky.groundColor.set(ts.ground),
          (this.sky.intensity = this.fill.open)),
        this.metropolis &&
          (this.sun.color.set(Zo.sun),
          (this.sun.intensity = Zo.sunIntensity),
          this.sky.color.set(Zo.sky),
          this.sky.groundColor.set(Zo.ground),
          (this.sky.intensity = this.fill.open)),
        this.lunar &&
          (this.sun.color.set(Jo.sun),
          (this.sun.intensity = Jo.sunIntensity),
          this.sky.color.set(Jo.sky),
          this.sky.groundColor.set(Jo.ground),
          (this.sky.intensity = this.fill.open)),
        t &&
          (this.sun.color.set(Qo.night),
          (this.sun.intensity = $o.night),
          this.sky.color.set(`#b4c5f0`),
          this.sky.groundColor.set(`#223d65`),
          (this.sky.intensity = es.night.open)),
        this.field.set(cs({ night: t, lunar: this.lunar })),
        (this.fixtureLighting = new Io(this.field, e)),
        (this.ordnance = new Vo(c)),
        (this.shadows = new Ao(this.sun, this.sunDirection, r, { debug: i })),
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
      let o = rs(e.distance);
      n > 0 && (this.blend += (o - this.blend) * (1 - Math.exp(-n * 4)));
      let c = this.fill;
      ((this.sky.intensity = s.lerp(c.open, c.tunnel, this.blend)),
        (this.scene.environmentIntensity =
          this.environmentIntensity *
          (1 - this.blend * (1 - this.tunnelEnvironment))),
        (this.exposure = this.night
          ? 1.15 + this.blend * 0.06
          : this.lunar
            ? Jo.exposure + this.blend * 0.15
            : this.metropolis
              ? Zo.exposure + this.blend * 0.12
              : 1 + this.blend * 0.12));
      let l = i ? i.getWorldPosition(this.viewer) : this.viewer.copy(t);
      (this.sun.target.position.copy(t),
        this.sun.position.copy(t).addScaledVector(this.sunDirection, ns),
        this.shadows.update(i, t));
      let u = r ? 1 : this.night ? os.lowDetail.night : os.lowDetail.day;
      this.field.gain.value = u;
      let d = this.field.nearest(t, this.tunnel.length, this.near);
      if (
        (this.tunnel.forEach((e, n) => {
          let r = d[n];
          if (!r) {
            e.intensity = 0;
            return;
          }
          (e.position.copy(r.position),
            e.color.set(r.color),
            (e.distance = r.range),
            (e.intensity =
              r.intensity *
              u *
              (1 - s.smoothstep(r.position.distanceTo(t), 30, 45))));
        }),
        this.engine.position.copy(P(e.distance - 3, e.lane, 0.8)),
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
      let f = (e) => 1 - s.smoothstep(e.distanceTo(l), ...ls.fade),
        p = (e) => e.power * (e.life / e.total) ** 2 * f(e.light.position);
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
          if (n && !ls.muzzleItems.has(t.item)) continue;
          let r = `${t.owner}:${t.item}:${t.time}`;
          if (n && r === this.lastLaunch) continue;
          (n && (this.lastLaunch = r),
            this.target.copy(P(t.distance, t.lane, 1.8)));
          let { power: i, total: a } =
              t.kind === `block`
                ? t.item === `cannon`
                  ? ls.muzzle
                  : ls.block
                : n && t.item === `shield`
                  ? ls.shield
                  : n
                    ? ls.muzzle
                    : ls.impact,
            o = i * f(this.target);
          if (o <= 0) continue;
          let s = this.flashes.reduce((e, t) => (p(e) <= p(t) ? e : t));
          p(s) >= o ||
            (s.light.position.copy(this.target),
            s.light.color.set(
              t.kind === `block`
                ? ls.colors.block
                : (n && ls.colors[t.item]) || ls.colors.default,
            ),
            (s.total = a),
            (s.life = a),
            (s.power = i));
        }
      }
      for (let e of this.flashes) e.light.intensity = p(e) * (r ? 1 : 0.5);
      return (
        this.ordnance.update(a, l, n, {
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
  ds = [
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
  fs = { pitch: 110, street: 20 },
  ps = 0.125,
  ms = 10,
  hs = {
    "neon-tenement": `neon-tenement-lod`,
    "neon-tenement-tall": `neon-tenement-tall-lod`,
  };
function gs(e = 4) {
  return Array.from({ length: Math.ceil(F / e) }, (t, n) => {
    let r = Gn(n * e).position;
    return { d: n * e, x: r.x, y: r.y, z: r.z };
  });
}
function _s(e, t, n) {
  let r = 1 / 0,
    i = e[0];
  for (let a of e) {
    let e = (a.x - t) ** 2 + (a.z - n) ** 2;
    e < r && ((r = e), (i = a));
  }
  return { distance: Math.sqrt(r), sample: i };
}
