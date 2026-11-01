// assets__game-D43Oxqny 03 — note
// Lines 551-858 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var _a = {
    paint: {
      scale: 4,
      grain: 0.04,
      patches: 0.05,
      patchScale: 23,
      normal: 0.01,
      note: `Satin paint on steel: sheen varying where weathered; orange peel and pinholes show only in highlights, since paint levels fine relief.`,
    },
    concrete: {
      scale: 2.6,
      grain: 0.07,
      patches: 0.08,
      patchScale: 29,
      normal: 0.06,
      note: `Cast concrete: pores and air voids up close, visibly patchy weathering at any distance.`,
    },
    metal: {
      scale: 1.1,
      grain: 0.05,
      patches: 0.035,
      patchScale: 21,
      normal: 0.03,
      note: `Machined and sheet metal: fine pitting and slightly uneven polish.`,
    },
    plastic: {
      scale: 1.2,
      grain: 0.02,
      patches: 0.02,
      patchScale: 17,
      normal: 0.008,
      note: `Moulded plastic and vinyl: barely any variation.`,
    },
    stone: {
      scale: 180,
      grain: 0.05,
      patches: 0.06,
      patchScale: 700,
      normal: 0.05,
      blur: 2,
      note: `Weathered rock seen from kilometres away: relief of tens of metres, nothing finer.`,
    },
    mixed: {
      scale: 1.7,
      grain: 0.04,
      patches: 0.04,
      patchScale: 23,
      normal: 0,
      note: `Texture atlases of several finishes: roughness only, they keep their own normal maps.`,
    },
  },
  va = {
    structureLight: {
      color: { day: `#c9d3cf`, night: `#889bb4` },
      roughness: 0.42,
      metalness: 0,
      micro: `paint`,
      note: `Painted steel (pylons, canopy frames, portals); was metalness 0.15.`,
    },
    structureDark: {
      color: { day: `#2b424e`, night: `#1c273c` },
      roughness: 0.55,
      metalness: 0,
      micro: `paint`,
      note: `Dark painted steel (roofs, supports, tunnel frames); was metalness 0.35.`,
    },
    kerbPaint: {
      color: { day: `#ed702f`, night: `#e6ab64` },
      roughness: 0.48,
      metalness: 0,
      emissive: { day: `#000000`, night: `#765228` },
      emissiveIntensity: { day: 0, night: 0.45 },
      micro: `paint`,
      note: `Orange marker paint; the night glow stands in for retroreflection (deliberate).`,
    },
    solarGlass: {
      color: `#1c3442`,
      roughness: 0.08,
      metalness: 0,
      ior: 1.5,
      note: `Photovoltaic cells under glass on the coastal canopies; was metalness 0.6.`,
    },
    orbitalConcrete: {
      color: `#d3dfdc`,
      roughness: 0.76,
      metalness: 0,
      micro: `concrete`,
      note: `Cast concrete of the orbital ring.`,
    },
    mountainRock: {
      color: `#75949a`,
      roughness: 0.92,
      metalness: 0,
      flatShading: !0,
      micro: `stone`,
      note: `Distant faceted rock.`,
    },
    nightWater: {
      color: `#020b16`,
      roughness: 0.2,
      metalness: 0,
      ior: 1.333,
      emissive: `#050e1c`,
      emissiveIntensity: 0.3,
      note: `Nocturne bay: glossy dielectric water; was metalness 0.65. The emissive fill keeps the dark bay readable (deliberate).`,
    },
    weaponPadDeck: {
      color: `#09151e`,
      roughness: 0.4,
      metalness: 0,
      micro: `paint`,
      note: `Dark painted deck plate of weapon pads; was metalness 0.6.`,
    },
    landmarkCasing: {
      color: `#2b354b`,
      roughness: 0.42,
      metalness: 0,
      micro: `paint`,
      note: `Painted casing of Nocturne landmarks, arches, gates and posts; was metalness 0.6.`,
    },
    fallbackHull: {
      color: `#c0c3c0`,
      roughness: 0.32,
      metalness: 0,
      clearcoat: 0.5,
      clearcoatRoughness: 0.12,
      note: `Placeholder craft livery until the Blender model loads; was metalness 0.32.`,
    },
    fallbackDark: {
      color: `#0a161c`,
      roughness: 0.38,
      metalness: 0,
      note: `Placeholder craft trim; was metalness 0.6.`,
    },
    fallbackCanopy: {
      color: `#082128`,
      roughness: 0.06,
      metalness: 0,
      ior: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      emissive: `#114654`,
      emissiveIntensity: 0.24,
      note: `Placeholder craft canopy glass (instrument glow behind it); was metalness 0.7.`,
    },
  },
  ya = {
    deep: `#0f4654`,
    shallow: `#347a80`,
    roughness: 0.2,
    ior: 1.333,
    swell: 0.22,
    crossSwell: 0.16,
    sparkle: 0.05,
  },
  ba = (e, t) =>
    typeof e == `object` && e && !(e instanceof j) && `day` in e ? e[t] : e;
function xa(e, t) {
  let n = va[e];
  return {
    color: ba(n.color, t),
    roughness: n.roughness,
    metalness: n.metalness,
    emissive: ba(n.emissive, t) ?? `#000000`,
    emissiveIntensity: ba(n.emissiveIntensity, t) ?? 0,
    flatShading: n.flatShading ?? !1,
    ...(n.ior !== void 0 ||
    n.clearcoat !== void 0 ||
    n.clearcoatRoughness !== void 0
      ? {
          ior: n.ior ?? 1.5,
          clearcoat: n.clearcoat ?? 0,
          clearcoatRoughness: n.clearcoatRoughness ?? 0,
        }
      : {}),
  };
}
function Sa(e, t, n = {}) {
  let r = xa(e, t),
    i = `ior` in r,
    a = va[e].micro,
    o;
  if (a) {
    let e = i ? new zn({ ...r, ...n }) : new I({ ...r, ...n });
    (ga(e, _a[a]), (o = e));
  } else o = i ? new Ae({ ...r, ...n }) : new cr({ ...r, ...n });
  return ((o.name ||= e), o);
}
var Ca = {
  gateBanner: {
    roughness: 0.55,
    glow: { day: 0.15, night: 0.9 },
    note: `Backlit start-gate banners. Sunlight already lights the print to its old brightness; more glow by day would bloom over the lettering.`,
  },
  chevrons: {
    roughness: 0.4,
    glow: { day: 0.3, night: 0.85 },
    note: `Illuminated corner chevrons; stay legible in shade at speed.`,
  },
  screens: {
    roughness: 0.12,
    glow: { day: 1, night: 1 },
    glass: `#050607`,
    note: `Sponsor screens: emitted image behind glossy black glass.`,
  },
  raceNumber: {
    roughness: 0.38,
    glow: { day: 0, night: 0 },
    transparent: !0,
    note: `Painted race numbers on the placeholder craft.`,
  },
};
function wa(e, t, n, r = {}) {
  let i = Ca[e],
    a = i.glow[n],
    o = new cr({
      color: i.glass ?? `#ffffff`,
      map: i.glass ? null : t,
      roughness: i.roughness,
      metalness: 0,
      emissive: a > 0 ? `#ffffff` : `#000000`,
      emissiveMap: a > 0 ? t : null,
      emissiveIntensity: a,
      transparent: i.transparent ?? !1,
      ...r,
    });
  return ((o.name = `Sign · ${e}`), o);
}
var Ta = {
  "Graphite graphics": { metalness: 0, note: `Printed livery; was 0.08.` },
  "Ivory graphics": { metalness: 0, note: `Printed livery; was 0.08.` },
  "Intake shadow": { metalness: 0, note: `Dark painted intake; was 0.2.` },
  "Ion cyan": { metalness: 0, note: `Emissive lens; was 0.25.` },
  "Reactor white": { metalness: 0, note: `Emissive lens; was 0.25.` },
  "Navigation amber": { metalness: 0, note: `Emissive lens; was 0.25.` },
  "Livery ink": { metalness: 0, note: `Printed livery; was 0.08.` },
  "Livery decal": { metalness: 0, note: `Printed livery; was 0.08.` },
  "Livery ion glow": { metalness: 0, note: `Emissive lens; was 0.25.` },
  "Livery reactor glow": { metalness: 0, note: `Emissive lens; was 0.25.` },
  "Ivory signage": { roughness: 0.45, note: `Satin painted panels.` },
  "Dark lettering": { roughness: 0.62, note: `Matte vinyl lettering.` },
  "Cyan wayfinding": { roughness: 0.3, note: `Acrylic light diffusers.` },
  "Amber beacon": { roughness: 0.25, note: `Beacon lens.` },
  "mines-emitter": { metalness: 0, note: `Emitter lens; was 0.65.` },
  "rockets-emitter": { metalness: 0, note: `Emitter lens; was 0.65.` },
  "missile-emitter": { metalness: 0, note: `Emitter lens; was 0.65.` },
  "cannon-emitter": { metalness: 0, note: `Emitter lens; was 0.65.` },
};
function Ea(e) {
  let t = new Set();
  return (
    e.traverse((e) => {
      let n = e;
      if (n.material)
        for (let e of Array.isArray(n.material) ? n.material : [n.material]) {
          if (t.has(e)) continue;
          let n = Ta[e.name];
          !n || !(e instanceof cr) || (Aa(e, n), t.add(e));
        }
    }),
    t.size
  );
}
var Da = {
  "Solstice shared PBR atlas": `mixed`,
  "Ivory signage": `paint`,
  "Dark lettering": `plastic`,
  "Nocturne concrete": `concrete`,
  "Nocturne metal": `metal`,
  "Nocturne trim atlas": `mixed`,
};
function Oa(e) {
  let t = Da[e.name];
  return (t && ga(e, _a[t]), e);
}
function ka(e) {
  let t = new Map(),
    n = (e) => {
      let n = t.get(e);
      if (!n) {
        let r = e;
        if (((n = e), Da[r.name] && r.isMeshStandardMaterial)) {
          let e = r.isMeshPhysicalMaterial ? new zn() : new I();
          (e.copy(r), (n = Oa(e)));
        }
        t.set(e, n);
      }
      return n;
    };
  e.traverse((e) => {
    let t = e;
    t.isMesh &&
      (t.material = Array.isArray(t.material)
        ? t.material.map(n)
        : n(t.material));
  });
  let r = 0;
  for (let [e, n] of t) n !== e && (e.dispose(), r++);
  return r;
}
function Aa(e, t) {
  (t.roughness !== void 0 && (e.roughness = t.roughness),
    t.metalness !== void 0 &&
      (t.metalness === 0 &&
        !e.metalnessMap &&
        e.color.multiplyScalar(1 - e.metalness),
      (e.metalness = t.metalness)));
}
