// assets__game-CsnOSIff 61 — math
// Lines 26466-26737 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function rv(e) {
  return nv.get(e);
}
Object.fromEntries(
  ev.filter((e) => e.probe !== null).map((e) => [e.name, e.probe]),
);
var iv = Object.fromEntries(
  ev.filter((e) => e.micro !== null).map((e) => [e.name, e.micro]),
);
function av(e, t) {
  let n = $_[e].cells[t];
  if (!n) throw Error(`Meridian ${e} atlas has no cell ${t}.`);
  return n;
}
function ov(e, t, n) {
  let r = $_[e].groups[t];
  if (!r) throw Error(`Meridian ${e} atlas has no group ${t}.`);
  let i = ((Math.floor(n) % r.cells.length) + r.cells.length) % r.cells.length;
  return [(i % r.cols) * r.pitch[0], Math.floor(i / r.cols) * r.pitch[1]];
}
var sv = {
    venue: qm,
    skyline: wm,
    hotel: hm,
    transit: Hm,
    flying: Dp,
    street: Am,
  },
  cv = Object.keys(sv),
  lv = {
    desktop: {
      cell: 1e3,
      cellTriangles: 2e4,
      merge: { count: 3, baked: 3e4, copies: 1 / 0 },
      field: { triangles: 4e5, cell: 1500 },
      shadowCell: 400,
    },
    mobile: {
      cell: 1 / 0,
      cellTriangles: 0,
      merge: { count: 2, baked: 9e3, copies: 20 },
      field: { triangles: 1 / 0, cell: 1500 },
      shadowCell: 200,
    },
  },
  uv = new Set([`podium-block-c`, `podium-block-c-lod`, `far-tower-c`]),
  dv = new Set([
    `crowd-card`,
    `crowd-figure`,
    `crowd-figure-seated`,
    `walker`,
    `holo-crown-ring`,
    `ring-screen-segment`,
    `airliner-far`,
  ]),
  fv = new Set(
    `ring-screen-segment.garage-display-craft.pit-wall-stand.marshal-post.braking-board.impact-foam-stack.tv-camera-platform.flag-mast.catch-fence-post.crowd-figure.crowd-figure-seated.crowd-card.broadcast-drone.holo-crown-ring.far-tower-a.far-tower-b.far-tower-c.far-tower-d.far-tower-e.rooftop-helipad.rooftop-pool.rooftop-hvac.rooftop-antenna.rooftop-solar.rooftop-billboard.rooftop-water-tank.rooftop-garden.rooftop-turbine.aviation-beacon.window-cleaner-gondola.window-cleaner-cable.kinetic-chandelier.kinetic-chandelier-lod.sky-pool-swimmer.lobby-fountain-jet.glass-lift.atrium-palm.atrium-palm-lod.hanging-garden-cascade.lobby-reception.lobby-staircase.lobby-fountain.lobby-lounge.lobby-piano.maglev-pod-streak.station-core.heavy-lift-drone.heavy-lift-drone-lod.container-12.container-6.aero-taxi.aero-taxi-lod.sky-car.sky-car-lod.courier-drone.patrol-drone.sky-lane-gate.airliner-far.stack-gantry.leviathan-tether.ad-blimp.ad-blimp-lod.leviathan-depot-airship.leviathan-depot-airship-lod.plane-tree-lod.marina-palm-lod.perimeter-led-board-profile.lamp-banner.bollard.bench.planter.scooter-dock.ticket-gates.info-totem.taxi-stop.litter-bin.utility-cabinet.cone-set.fountain-jet.fountain-arc.small-yacht-lod.water-taxi.marina-pontoon.quay-edge.walker.crowd-barrier.plaza-paving`.split(
      `.`,
    ),
  ),
  pv = new Set(
    `crowd-card.crowd-figure.crowd-figure-seated.walker.flag-mast.catch-fence-post.impact-foam-stack.braking-board.marshal-post.far-tower-a.far-tower-b.far-tower-c.far-tower-d.far-tower-e.aviation-beacon.plane-tree.plane-tree-lod.marina-palm.marina-palm-lod.atrium-palm.atrium-palm-lod.hanging-garden-cascade.planter.bollard.litter-bin.cone-set.utility-cabinet.info-totem.scooter-dock.bench.lamp-banner.fountain-jet.fountain-arc`.split(
      `.`,
    ),
  ),
  mv = (e, t, n, r = {}) => {
    let i = $_[t].groups[n];
    return {
      name: e,
      atlas: t,
      cell: i.cells[0],
      cols: i.cols,
      pitch: [i.pitch[0], i.pitch[1]],
      count: i.cells.length,
      ...r,
    };
  },
  hv = [
    { name: `none`, atlas: `trim`, cell: ``, cols: 1, pitch: [0, 0], count: 1 },
    mv(`team`, `trim`, `team`),
    mv(`flag`, `trim`, `flag`, { pitch: [0.25, -0.125], count: 8 }),
    mv(`banner`, `trim`, `banner`),
    mv(`board`, `trim`, `board`, { pitch: [0.125, 0.125], count: 3 }),
    mv(`marshal`, `trim`, `marshal`),
    {
      name: `awning`,
      atlas: `trim`,
      cell: `awning-ultramarine`,
      cols: 2,
      pitch: [0.125, 0.125],
      count: 4,
    },
    mv(`container`, `livery`, `container`),
    mv(`door`, `livery`, `door`),
    mv(`train`, `livery`, `train`),
    mv(`craft`, `livery`, `craft`),
  ],
  gv = new Map(hv.map((e, t) => [e.name, t])),
  _v = new Set(hv.filter((e) => e.atlas === `livery`).map((e) => e.name)),
  vv = {
    "pit-garage-pair": [`team`],
    "pit-garage-pair-lod": [`team`],
    "pit-wall-stand": [`team`],
    "garage-display-craft": [`craft`],
    "marshal-post": [`marshal`],
    "braking-board": [`board`],
    "flag-mast": [`flag`],
    "crowd-barrier": [`flag`],
    "lamp-banner": [`banner`],
    kiosk: [`awning`],
    "cafe-terrace": [`awning`],
    "container-12": [`container`, `door`],
    "container-6": [`container`, `door`],
    "cargo-truck": [`container`],
    "cargo-truck-lod": [`container`],
    "monorail-car-lead": [`train`],
    "monorail-car-lead-lod": [`train`],
    "monorail-car-mid": [`train`],
    "monorail-car-mid-lod": [`train`],
    "monorail-car-tail": [`train`],
    "monorail-car-tail-lod": [`train`],
    "freight-wagon": [`train`],
    "freight-wagon-lod": [`train`],
    "autonomous-bus": [`train`],
    "autonomous-bus-lod": [`train`],
    "sports-car": [`craft`],
    "sports-car-lod": [`craft`],
  },
  yv = `liveryOffset`,
  bv = {
    "giant-screen": `giant`,
    "fan-zone-stage": `giant`,
    "ring-screen-segment": `ring`,
    "race-control-spire": `board`,
  },
  xv = {
    giant: [512, 256, 256, 128],
    ring: [1024, 128, 512, 64],
    board: [256, 256, 128, 128],
  },
  Sv = {
    stand: { x: [-130, 340], z: [-220, -6] },
    cauldron: { centre: [-169, 62], radius: [72, 180] },
    speed: 15,
    spacing: 420,
  },
  Cv = {
    "Meridian livery atlas": 6.5,
    "Meridian trim atlas": 1.4,
    "Meridian graphite": 0.22,
  },
  wv = q(Xo.x, Xo.y, Xo.z),
  Tv = [`kestrel`, `manta`, `talon`, `monarch`];
function Ev(e) {
  switch (e) {
    case `Meridian trim atlas`:
    case `Meridian livery atlas`:
    case `Meridian graphite`:
      return `rotor`;
    case `Meridian fabric`:
      return `cloth`;
    case `Meridian crowd`:
    case `Meridian crowd cards`:
      return `arms`;
    case `Meridian foliage`:
    case `Meridian timber`:
    case `Meridian concrete`:
      return `sway`;
    default:
      return null;
  }
}
var Dv = new Set([
    `windows`,
    `cloth`,
    `advert`,
    `crowd`,
    `crowd-cards`,
    `interior`,
    `beacon`,
    `crystal`,
  ]),
  Ov = new Set([
    `Meridian trim atlas`,
    `Meridian livery atlas`,
    `Meridian fabric`,
  ]),
  kv = new Set([
    `Meridian trim atlas`,
    `Meridian fabric`,
    `Meridian livery atlas`,
  ]),
  Av = {
    "Meridian trim atlas": `trim`,
    "Meridian fabric": `trim`,
    "Meridian livery atlas": `livery`,
  };
function jv(e, t, n = 0) {
  let r =
    Math.imul(Math.round(e * 8) | 0, 668265261) ^
    Math.imul(Math.round(t * 8) | 0, 374761393) ^
    Math.imul(n | 0, 2654435761);
  return (
    (r = Math.imul(r ^ (r >>> 15), 2246822507)),
    (r = Math.imul(r ^ (r >>> 13), 3266489909)),
    (r ^= r >>> 16),
    (r >>> 0) / 4294967296
  );
}
function Mv(e) {
  return [
    e.variant === void 0
      ? Math.floor(jv(e.x, e.z, 11) * 480)
      : ((Math.round(e.variant) % 480) + 480) % 480,
    jv(e.x, e.z, 29),
  ];
}
function Nv(e, t, n) {
  let r = e.getAttribute(`uv`),
    i = e.getAttribute(`position`).count,
    a = new Float32Array(i),
    o = n
      .map((e) => {
        let n = hv[gv.get(e) ?? 0];
        return !n.cell || n.atlas !== t
          ? null
          : { id: gv.get(e), rect: av(t, n.cell).rect };
      })
      .filter((e) => e !== null),
    s = 0;
  if (r && o.length)
    for (let e = 0; e < i; e++) {
      let t = r.getX(e),
        n = r.getY(e);
      for (let { id: r, rect: i } of o)
        if (
          t >= i[0] - 0.004 &&
          t <= i[2] + 0.004 &&
          n >= i[1] - 0.004 &&
          n <= i[3] + 0.004
        ) {
          ((a[e] = r), s++);
          break;
        }
    }
  return { attribute: new ct(a, 1), tagged: s };
}
function Pv(e, t, n) {
  let r = Ev(e),
    i = t.geometry,
    a =
      r !== null &&
      i.hasAttribute(`color`) &&
      (r === `arms` || !n) &&
      (r !== `rotor` || i.hasAttribute(`uv1`)),
    o = rv(e),
    s =
      t.dynamic && (e === `Meridian livery atlas` || (!n && o?.micro != null)),
    c = ``;
  return (
    e === `Meridian screen`
      ? (c = bv[t.asset] ?? `giant`)
      : e === `Meridian advert atlas` && t.asset === `taxi-stop`
        ? (c = `fixed`)
        : e === `Meridian holo` && t.asset === `holo-crown-ring`
          ? (c = `spin`)
          : e === `Meridian water` && t.asset === `sky-pool`
            ? (c = `caustic`)
            : e === `Meridian hotel glass` && uv.has(t.asset) && (c = `office`),
    `${a ? r : ``}|${s ? `moving` : ``}|${c}`
  );
}
