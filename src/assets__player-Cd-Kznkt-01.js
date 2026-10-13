// assets__player-Cd-Kznkt 01 — assets
// Lines 1-237 of readable/assets__player-Cd-Kznkt.pretty.js (statement-aligned).
import {
  $i as e,
  Ar as t,
  Cn as n,
  Cr as r,
  Ct as i,
  Da as a,
  Dn as o,
  Ea as s,
  En as c,
  Ga as l,
  Gr as u,
  Hn as d,
  In as f,
  Ja as p,
  Jn as m,
  Ki as h,
  Kr as g,
  Nr as _,
  Pr as v,
  Rr as y,
  Sr as b,
  St as x,
  Tr as S,
  Un as ee,
  Vi as C,
  Wi as te,
  Wn as ne,
  Wt as re,
  Yr as w,
  Zi as ie,
  Zn as T,
  Zr as ae,
  bt as oe,
  ca as E,
  da as D,
  ea as O,
  fa as se,
  ir as ce,
  ja as le,
  nr as k,
  pa as ue,
  qa as A,
  qr as de,
  rr as fe,
  sa as pe,
  si as me,
  ta as he,
  ua as j,
  va as ge,
  vn as M,
  xn as N,
  xr as P,
  xt as _e,
  yt as ve,
} from "./index-DphGw8Ou.js";
import { a as ye, i as be, n as xe, t as Se } from "./HDRLoader-C77IBAVq.js";
var F = (e) => new URL(e, document.baseURI).href;
function Ce(e, t) {
  let n = new Map();
  e.traverse((e) => {
    if (!(e instanceof _)) return;
    let r = Array.isArray(e.material) ? e.material : [e.material];
    for (let e of r)
      for (let r of Object.values(e)) {
        if (!(r instanceof se)) continue;
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
var we = class {
  constructor(e, t) {
    ((this.renderer = e),
      (this.mobile = t),
      (this.assets = { ships: {}, weapons: {}, medals: [] }),
      (this.gltf = new xe()),
      (this.textures = new ue()),
      (this.disposed = !1),
      (this.owned = new Set()));
  }
  async model(e) {
    let t = await this.gltf.loadAsync(F(e));
    if (this.disposed) throw (I(t.scene), Error(`Intro closed`));
    return (this.mobile && Ce(t.scene, 256), this.owned.add(t.scene), t.scene);
  }
  texture(e, t = !0) {
    return this.textures
      .loadAsync(F(e))
      .then((e) => (t && (e.colorSpace = ie), (e.anisotropy = 4), e));
  }
  async environment(e) {
    let t = await new Se().setDataType(fe).loadAsync(F(e));
    t.mapping = 303;
    let n = new be(this.renderer),
      r = n.fromEquirectangular(t);
    return (t.dispose(), n.dispose(), r.texture);
  }
  async ship(e) {
    let t = await this.model(p(e));
    t.updateMatrixWorld(!0);
    let n = [`engine_negative_x`, `engine_positive_x`].flatMap((e) => {
      let n = t.getObjectByName(e);
      return n ? [t.worldToLocal(n.getWorldPosition(new a()))] : [];
    });
    t.traverse((e) => {
      e instanceof _ && (e.frustumCulled = !1);
    });
    let r = new M().setFromObject(t).getSize(new a()),
      i = new k();
    i.add(t);
    let o = { id: e, scene: i, engines: n, length: r.z };
    return ((this.assets.ships[e] = o), o);
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
    for (let { id: n } of l) n !== e && t.push(this.ship(n));
    for (let e of [`missile`, `rockets`, `mines`, `cannon`])
      t.push(
        this.model(`models/weapons/${e}.glb`).then((t) => {
          let n = new M().setFromObject(t),
            r = n.getCenter(new a()),
            i = n.getSize(new a());
          t.position.sub(r);
          let o = new k();
          (o.add(t),
            o.scale.setScalar(3.2 / Math.max(i.x, i.y, i.z, 0.01)),
            (this.assets.weapons[e] = o));
        }),
      );
    t.push(
      this.model(`models/awards.glb`).then((e) => {
        let t = new k();
        for (let n of [`Trophy`, `Trophy halo`]) {
          let r = e.getObjectByName(n);
          r && t.add(r);
        }
        let n = new M().setFromObject(t),
          r = n.getSize(new a()),
          i = n.getCenter(new a());
        for (let e of t.children) e.position.sub(i);
        let o = new k();
        (o.add(t),
          o.scale.setScalar(4 / Math.max(r.y, 0.01)),
          (this.assets.trophy = o));
        let s = e.getObjectByName(`Medal`);
        if (s) {
          let e = new M().setFromObject(s);
          s.position.sub(e.getCenter(new a()));
          let t = new k();
          (t.add(s),
            t.scale.setScalar(
              2 / Math.max(...e.getSize(new a()).toArray(), 0.01),
            ),
            (this.assets.medal = t),
            this.owned.add(t));
        }
        this.owned.add(o);
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
        ((e.wrapS = e.wrapT = te), (this.assets.regolith = e));
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
    for (let e of this.owned) I(e);
    for (let e of Object.values(this.assets.ships)) e && I(e.scene);
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
function I(e) {
  e.traverse((e) => {
    let t = e;
    if (!t.geometry) return;
    t.geometry.dispose();
    let n = Array.isArray(t.material) ? t.material : [t.material];
    for (let e of n)
      if (e) {
        for (let t of Object.values(e)) t instanceof se && t.dispose();
        e.dispose();
      }
  });
}
