// assets__game-CsnOSIff 04 — add
// Lines 894-1093 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function La(e, t, n) {
  let r = Math.min(1, n / Math.max(e, t));
  return {
    width: Math.max(1, Math.round(e * r)),
    height: Math.max(1, Math.round(t * r)),
  };
}
function Ra(e, t) {
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
function za(e) {
  let t = new Set();
  return (
    e.traverse((e) => {
      let n = e.material;
      if (n) for (let e of Array.isArray(n) ? n : [n]) t.add(e);
    }),
    t
  );
}
function Ba(e) {
  let t = new Set();
  for (let n of e) for (let e of Object.values(n)) e instanceof Pt && t.add(e);
  return t;
}
function Va(e) {
  !e ||
    Fa.has(e) ||
    Ia.has(e) ||
    (Ia.add(e),
    e.close
      ? e.close()
      : typeof e.getContext == `function` && (e.width = e.height = 1));
}
function Ha(e, t) {
  let n = za(e),
    r = Ba(n),
    i = { entries: new Set(), released: !1 };
  Pa.set(e, [...(Pa.get(e) ?? []), i]);
  let a = new Map(),
    o = new Set();
  for (let e of r) {
    let n = Ra(t.get(e) ?? `unshared:${e.uuid}`, e),
      r = Ma.get(n);
    if (!r) {
      ((r = { key: n, texture: e, owners: 0 }), Ma.set(n, r), Na.add(e));
      let t = e.image;
      Fa.set(t, (Fa.get(t) ?? 0) + 1);
    }
    (i.entries.has(r) || (i.entries.add(r), r.owners++),
      a.set(e, r.texture),
      e !== r.texture && (o.add(e.image), e.dispose()));
  }
  for (let e of n) {
    let t = e;
    for (let [e, n] of Object.entries(t)) n instanceof Pt && (t[e] = a.get(n));
  }
  for (let e of o) Va(e);
}
function Ua(e, t) {
  let n = Pa.get(e);
  !n || e === t || (Pa.set(t, [...(Pa.get(t) ?? []), ...n]), Pa.delete(e));
}
function Wa(e) {
  let t = new Set();
  for (let n of e) Na.has(n) || (n.image && t.add(n.image), n.dispose());
  for (let e of t) Va(e);
}
function Ga(e) {
  let t = new Set(),
    n = za(e),
    r = Ba(n),
    i = new Set();
  e.traverse((e) => {
    for (let t of Pa.get(e) ?? []) i.add(t);
    let n = e;
    (n.geometry && t.add(n.geometry), n instanceof Wn && n.dispose());
  });
  for (let e of t) e.dispose();
  for (let e of n) e.dispose();
  let a = new Set();
  for (let e of r) Na.has(e) || (a.add(e.image), e.dispose());
  for (let e of i)
    if (!e.released) {
      e.released = !0;
      for (let t of e.entries) {
        if (--t.owners > 0) continue;
        (Ma.delete(t.key), t.texture.dispose());
        let e = t.texture.image,
          n = Fa.get(e) - 1;
        (n ? Fa.set(e, n) : Fa.delete(e), a.add(e));
      }
      e.entries.clear();
    }
  for (let e of a) e && Va(e);
}
async function Ka(e) {
  let t = new Map(),
    n = e.parser.json.images;
  return (
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
async function qa(e, t) {
  let n = t.limit ?? 512,
    r = Ba(za(e.scene)),
    i = new Map(),
    a = new Map(),
    o = new Set();
  try {
    let s = await Ka(e);
    for (let c of r) {
      c.anisotropy = t.anisotropy;
      let r = e.parser.associations.get(c)?.textures,
        l = r === void 0 ? void 0 : e.parser.json.textures[r]?.source;
      l !== void 0 && s.has(l) && i.set(c, s.get(l));
      let u = c.image;
      if (!t.mobile || Math.max(u.width, u.height) <= n) continue;
      let d = a.get(u);
      if (!d) {
        let e = La(u.width, u.height, n);
        ((d = document.createElement(`canvas`)),
          (d.width = e.width),
          (d.height = e.height));
        let t = d.getContext(`2d`);
        if (!t) throw Error(`Unable to prepare mobile asset textures.`);
        (t.drawImage(u, 0, 0, e.width, e.height), a.set(u, d));
      }
      (o.add(u), (c.source = new gn(d)), (c.needsUpdate = !0));
    }
    Ha(e.scene, i);
  } catch (t) {
    throw (Ga(e.scene), t);
  } finally {
    for (let e of o) Va(e);
  }
}
async function Ja(e, t = 1) {
  let n = [],
    r = !1,
    i = new lr().register((e) => ({
      name: `VECTOR_asset_texture_lifetime`,
      loadTexture(t) {
        let i = e.loadTexture(t).then((e) => (r && e && Wa([e]), e));
        return (n.push(i), i);
      },
    })),
    a;
  try {
    a = await i.loadAsync(new URL(e, document.baseURI).href);
    let n = $t();
    return (await qa(a, { mobile: n.mobile, anisotropy: t, limit: ja[e] }), a);
  } catch (e) {
    ((r = !0), a && Ga(a.scene));
    let t = await Promise.allSettled(n),
      i = new Set();
    for (let e of t) e.status === `fulfilled` && e.value && i.add(e.value);
    throw (Wa(i), e);
  }
}
