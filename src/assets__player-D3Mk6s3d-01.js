// assets__player-D3Mk6s3d 01 — assets
// Lines 1-237 of readable/assets__player-D3Mk6s3d.pretty.js (statement-aligned).
import {
  Cr as e,
  Ct as t,
  Da as n,
  Dn as r,
  Er as i,
  Fr as a,
  Gi as o,
  Gn as s,
  Gt as c,
  Hi as l,
  Ja as u,
  Jr as d,
  Ka as f,
  Kr as p,
  Ln as m,
  Ma as h,
  Oa as g,
  On as _,
  Pr as v,
  Qi as y,
  Qn as b,
  Qr as x,
  Sn as S,
  Sr as ee,
  St as C,
  Un as w,
  Wn as te,
  Xr as T,
  Ya as ne,
  Yn as re,
  ar as ie,
  bt as ae,
  ca as oe,
  ci as se,
  da as E,
  ea as D,
  fa as ce,
  ir as le,
  jr as O,
  la as k,
  ma as ue,
  na as de,
  pa as fe,
  qi as pe,
  qr as me,
  rr as A,
  ta as j,
  wn as he,
  wr as ge,
  wt as _e,
  xt as ve,
  ya as ye,
  yn as M,
  zr as N,
} from "./index-DF2rMRzV.js";
import { a as be, i as xe, n as Se, t as Ce } from "./HDRLoader-Bse-uZFj.js";
var P = (e) => new URL(e, document.baseURI).href;
function we(e, t) {
  let n = new Map();
  e.traverse((e) => {
    if (!(e instanceof v)) return;
    let r = Array.isArray(e.material) ? e.material : [e.material];
    for (let e of r)
      for (let r of Object.values(e)) {
        if (!(r instanceof fe)) continue;
        let e = r.image;
        if (!e?.width || !e.height || Math.max(e.width, e.height) <= t)
          continue;
        let i = n.get(e);
        if (!i) {
          let r = t / Math.max(e.width, e.height);
          ((i = document.createElement(`canvas`)),
            (i.width = Math.round(e.width * r)),
            (i.height = Math.round(e.height * r)),
            i.getContext(`2d`).drawImage(e, 0, 0, i.width, i.height),
            e.close?.(),
            n.set(e, i));
        }
        ((r.image = i), (r.needsUpdate = !0));
      }
  });
}
var Te = class {
  constructor(e, t) {
    ((this.renderer = e),
      (this.mobile = t),
      (this.assets = { ships: {}, weapons: {}, medals: [] }),
      (this.gltf = new Se()),
      (this.textures = new ue()),
      (this.disposed = !1),
      (this.owned = new Set()));
  }
  async model(e) {
    let t = await this.gltf.loadAsync(P(e));
    if (this.disposed) throw (F(t.scene), Error(`Intro closed`));
    return (this.mobile && we(t.scene, 256), this.owned.add(t.scene), t.scene);
  }
  texture(e, t = !0) {
    return this.textures
      .loadAsync(P(e))
      .then((e) => (t && (e.colorSpace = y), (e.anisotropy = 4), e));
  }
  async environment(e) {
    let t = await new Ce().setDataType(le).loadAsync(P(e));
    t.mapping = 303;
    let n = new xe(this.renderer),
      r = n.fromEquirectangular(t);
    return (t.dispose(), n.dispose(), r.texture);
  }
  async ship(e) {
    let t = await this.model(ne(e));
    t.updateMatrixWorld(!0);
    let n = [`engine_negative_x`, `engine_positive_x`].flatMap((e) => {
      let n = t.getObjectByName(e);
      return n ? [t.worldToLocal(n.getWorldPosition(new g()))] : [];
    });
    t.traverse((e) => {
      e instanceof v && (e.frustumCulled = !1);
    });
    let r = new M().setFromObject(t).getSize(new g()),
      i = new A();
    i.add(t);
    let a = { id: e, scene: i, engines: n, length: r.z };
    return ((this.assets.ships[e] = a), a);
  }
  async essentials(e) {
    let [t, n] = await Promise.all([
      this.environment(`environment/launch-bay_1k.hdr`),
      this.environment(`environment/shanghai_bund_1k.hdr`),
      this.ship(e),
    ]);
    ((this.assets.studio = t), (this.assets.city = n));
  }
  async rest(e) {
    let t = [];
    for (let { id: n } of f) n !== e && t.push(this.ship(n));
    for (let e of [`missile`, `rockets`, `mines`, `cannon`])
      t.push(
        this.model(`models/weapons/${e}.glb`).then((t) => {
          let n = new M().setFromObject(t),
            r = n.getCenter(new g()),
            i = n.getSize(new g());
          t.position.sub(r);
          let a = new A();
          (a.add(t),
            a.scale.setScalar(3.2 / Math.max(i.x, i.y, i.z, 0.01)),
            (this.assets.weapons[e] = a));
        }),
      );
    t.push(
      this.model(`models/awards.glb`).then((e) => {
        let t = new A();
        for (let n of [`Trophy`, `Trophy halo`]) {
          let r = e.getObjectByName(n);
          r && t.add(r);
        }
        let n = new M().setFromObject(t),
          r = n.getSize(new g()),
          i = n.getCenter(new g());
        for (let e of t.children) e.position.sub(i);
        let a = new A();
        (a.add(t),
          a.scale.setScalar(4 / Math.max(r.y, 0.01)),
          (this.assets.trophy = a));
        let o = e.getObjectByName(`Medal`);
        if (o) {
          let e = new M().setFromObject(o);
          o.position.sub(e.getCenter(new g()));
          let t = new A();
          (t.add(o),
            t.scale.setScalar(
              2 / Math.max(...e.getSize(new g()).toArray(), 0.01),
            ),
            (this.assets.medal = t),
            this.owned.add(t));
        }
        this.owned.add(a);
      }),
    );
    let n = this.mobile ? `-512` : ``;
    t.push(
      this.texture(`environment/lunar-earth${n}.png`).then(
        (e) => (this.assets.earth = e),
      ),
      this.texture(`environment/lunar-earth-data${n}.png`, !1).then(
        (e) => (this.assets.earthData = e),
      ),
      this.texture(`environment/lunar-milky-way${n}.png`).then(
        (e) => (this.assets.milkyWay = e),
      ),
      this.texture(
        `environment/regolith-detail${this.mobile ? `-256` : ``}.png`,
      ).then((e) => {
        ((e.wrapS = e.wrapT = o), (this.assets.regolith = e));
      }),
      Promise.all(
        [`gold`, `silver`, `bronze`].map((e) =>
          this.texture(`ui/awards/medal-${e}.webp`),
        ),
      ).then((e) => (this.assets.medals = e)),
    );
    let r = await Promise.allSettled(t);
    for (let e of r)
      e.status === `rejected` &&
        !this.disposed &&
        console.warn(`[intro] asset unavailable`, e.reason);
  }
  dispose() {
    this.disposed = !0;
    for (let e of this.owned) F(e);
    for (let e of Object.values(this.assets.ships)) e && F(e.scene);
    for (let e of [
      this.assets.studio,
      this.assets.city,
      this.assets.earth,
      this.assets.earthData,
      this.assets.milkyWay,
      this.assets.regolith,
      ...this.assets.medals,
    ])
      e?.dispose();
  }
};
function F(e) {
  e.traverse((e) => {
    let t = e;
    if (!t.geometry) return;
    t.geometry.dispose();
    let n = Array.isArray(t.material) ? t.material : [t.material];
    for (let e of n)
      if (e) {
        for (let t of Object.values(e)) t instanceof fe && t.dispose();
        e.dispose();
      }
  });
}
