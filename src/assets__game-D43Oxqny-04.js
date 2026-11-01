// assets__game-D43Oxqny 04 — add
// Lines 859-1110 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
var ja = {
    enamel: { metalness: 0, note: `Clear-coated paint.` },
    ceramic: { metalness: 0, note: `Glazed ceramic panels.` },
    carbon: { metalness: 0, note: `Carbon-fibre composite under resin.` },
    titanium: {
      metalness: 0,
      note: `Dark anodised titanium: its authored base colour (~6% reflectance) matches a dielectric coating, not bare metal.`,
    },
    gold: {
      metalness: 1,
      note: `Champagne gold anodising: bright saturated reflectance, a true metal.`,
    },
    copper: {
      metalness: 1,
      note: `Burnished copper: saturated metal colour, lengthwise brush, thin lacquer.`,
    },
    satin: {
      metalness: 0,
      note: `Satin livery paint: soft sheen, rougher than enamel, almost no lacquer.`,
    },
    anodised: {
      metalness: 1,
      note: `Anodised livery panels: gold, copper, chrome or gunmetal from the face colour.`,
    },
    canopy: {
      metalness: 0,
      roughness: 0.06,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      note: `Tinted canopy glass with a thin polarising film (iridescence).`,
    },
  },
  Ma = {
    "models/shackleton-base-kit.glb": 256,
    "models/meridian-materials.glb": 256,
    "models/meridian-venue-kit.glb": 256,
    "models/meridian-skyline-kit.glb": 256,
    "models/meridian-hotel-kit.glb": 256,
    "models/meridian-transit-kit.glb": 256,
    "models/meridian-flying-kit.glb": 256,
    "models/meridian-street-kit.glb": 256,
    "models/launch-bay.glb": 1024,
  },
  Na = new Map(),
  Pa = new WeakSet(),
  Fa = new WeakMap(),
  Ia = new Map(),
  La = new WeakSet();
function Ra(e, t, n) {
  let r = Math.min(1, n / Math.max(e, t));
  return {
    width: Math.max(1, Math.round(e * r)),
    height: Math.max(1, Math.round(t * r)),
  };
}
function za(e, t) {
  let n = t.image;
  return JSON.stringify([
    e,
    n.width,
    n.height,
    t.mapping,
    t.channel,
    t.wrapS,
    t.wrapT,
    t.magFilter,
    t.minFilter,
    t.anisotropy,
    t.format,
    t.internalFormat,
    t.type,
    t.offset.toArray(),
    t.repeat.toArray(),
    t.center.toArray(),
    t.rotation,
    t.matrixAutoUpdate,
    t.matrix.toArray(),
    t.colorSpace,
    t.flipY,
    t.premultiplyAlpha,
    t.unpackAlignment,
    t.generateMipmaps,
    t.compareFunction,
  ]);
}
function Ba(e) {
  let t = new Set();
  return (
    e.traverse((e) => {
      let n = e.material;
      if (n) for (let e of Array.isArray(n) ? n : [n]) t.add(e);
    }),
    t
  );
}
function Va(e) {
  let t = new Set();
  for (let n of e) for (let e of Object.values(n)) e instanceof bn && t.add(e);
  return t;
}
function Ha(e) {
  !e ||
    Ia.has(e) ||
    La.has(e) ||
    (La.add(e),
    e.close
      ? e.close()
      : typeof e.getContext == `function` && (e.width = e.height = 1));
}
function Ua(e, t) {
  let n = Ba(e),
    r = Va(n),
    i = { entries: new Set(), released: !1 };
  Fa.set(e, [...(Fa.get(e) ?? []), i]);
  let a = new Map(),
    o = new Set();
  for (let e of r) {
    let n = za(t.get(e) ?? `unshared:${e.uuid}`, e),
      r = Na.get(n);
    if (!r) {
      ((r = { key: n, texture: e, owners: 0 }), Na.set(n, r), Pa.add(e));
      let t = e.image;
      Ia.set(t, (Ia.get(t) ?? 0) + 1);
    }
    (i.entries.has(r) || (i.entries.add(r), r.owners++),
      a.set(e, r.texture),
      e !== r.texture && (o.add(e.image), e.dispose()));
  }
  for (let e of n) {
    let t = e;
    for (let [e, n] of Object.entries(t)) n instanceof bn && (t[e] = a.get(n));
  }
  for (let e of o) Ha(e);
}
function Wa(e, t) {
  let n = Fa.get(e);
  !n || e === t || (Fa.set(t, [...(Fa.get(t) ?? []), ...n]), Fa.delete(e));
}
function Ga(e) {
  let t = new Set();
  for (let n of e) Pa.has(n) || (n.image && t.add(n.image), n.dispose());
  for (let e of t) Ha(e);
}
function Ka(e) {
  let t = new Set(),
    n = Ba(e),
    r = Va(n),
    i = new Set();
  e.traverse((e) => {
    for (let t of Fa.get(e) ?? []) i.add(t);
    let n = e;
    (n.geometry && t.add(n.geometry), n instanceof Dt && n.dispose());
  });
  for (let e of t) e.dispose();
  for (let e of n) e.dispose();
  let a = new Set();
  for (let e of r) Pa.has(e) || (a.add(e.image), e.dispose());
  for (let e of i)
    if (!e.released) {
      e.released = !0;
      for (let t of e.entries) {
        if (--t.owners > 0) continue;
        (Na.delete(t.key), t.texture.dispose());
        let e = t.texture.image,
          n = Ia.get(e) - 1;
        (n ? Ia.set(e, n) : Ia.delete(e), a.add(e));
      }
      e.entries.clear();
    }
  for (let e of a) e && Ha(e);
}
async function qa(e) {
  let t = new Map(),
    n = e.parser.json.images,
    r = e.parser.options?.path ?? ``;
  return (
    n?.forEach((e, n) => {
      e.uri && !e.uri.startsWith(`data:`) && t.set(n, `uri:${r}${e.uri}`);
    }),
    !globalThis.crypto?.subtle ||
      !n ||
      (await Promise.all(
        n.map(async (n, r) => {
          if (n.bufferView === void 0) return;
          let i = await e.parser.getDependency(`bufferView`, n.bufferView),
            a = await crypto.subtle.digest(`SHA-256`, i);
          t.set(
            r,
            `${n.mimeType ?? ``}:${Array.from(new Uint8Array(a), (e) => e.toString(16).padStart(2, `0`)).join(``)}`,
          );
        }),
      )),
    t
  );
}
async function Ja(e, t) {
  let n = t.limit ?? 512,
    r = Va(Ba(e.scene)),
    i = new Map(),
    a = new Map(),
    o = new Set();
  try {
    let s = await qa(e);
    for (let c of r) {
      c.anisotropy = t.anisotropy;
      let r = e.parser.associations.get(c)?.textures,
        l = r === void 0 ? void 0 : e.parser.json.textures[r]?.source;
      l !== void 0 && s.has(l) && i.set(c, s.get(l));
      let u = c.image;
      if (!t.mobile || Math.max(u.width, u.height) <= n) continue;
      let d = a.get(u);
      if (!d) {
        let e = Ra(u.width, u.height, n);
        ((d = document.createElement(`canvas`)),
          (d.width = e.width),
          (d.height = e.height));
        let t = d.getContext(`2d`);
        if (!t) throw Error(`Unable to prepare mobile asset textures.`);
        (t.drawImage(u, 0, 0, e.width, e.height), a.set(u, d));
      }
      (o.add(u), (c.source = new Nn(d)), (c.needsUpdate = !0));
    }
    Ua(e.scene, i);
  } catch (t) {
    throw (Ka(e.scene), t);
  } finally {
    for (let e of o) Ha(e);
  }
}
async function Ya(e, t = 1) {
  let n = [],
    r = !1,
    i = new lr().register((e) => ({
      name: `VECTOR_asset_texture_lifetime`,
      loadTexture(t) {
        let i = e.loadTexture(t).then((e) => (r && e && Ga([e]), e));
        return (n.push(i), i);
      },
    })),
    a;
  try {
    a = await i.loadAsync(new URL(e, document.baseURI).href);
    let n = Un();
    return (await Ja(a, { mobile: n.mobile, anisotropy: t, limit: Ma[e] }), a);
  } catch (e) {
    ((r = !0), a && Ka(a.scene));
    let t = await Promise.allSettled(n),
      i = new Set();
    for (let e of t) e.status === `fulfilled` && e.value && i.add(e.value);
    throw (Ga(i), e);
  }
}
