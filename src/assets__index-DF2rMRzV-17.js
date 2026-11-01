// assets__index-DF2rMRzV 17 — syncedat
// Lines 73690-74030 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
var MQ = class {
    constructor(e, t, n, r, i, a = Date.now) {
      ((this.getSDK = e),
        (this.hosted = t),
        (this.storage = n),
        (this.current = r),
        (this.apply = i),
        (this.now = a),
        (this.user = ``),
        (this.changedAt = 0),
        (this.syncedAt = 0),
        (this.resolved = !1),
        (this.loading = !1),
        (this.uploading = !1),
        (this.nextLoad = 0),
        (this.uploadAt = 0),
        (this.failures = 0),
        (this.disposed = !1),
        (this.encoder = new TextEncoder()),
        (this.decoder = new TextDecoder()),
        (this.status = t ? `loading` : `local`));
      let o = this.readMeta();
      ((this.user = o.user),
        (this.changedAt = o.changedAt),
        (this.syncedAt = o.syncedAt));
    }
    changed() {
      this.disposed ||
        ((this.changedAt = Math.max(
          this.now(),
          this.syncedAt + 1,
          this.changedAt + 1,
        )),
        (this.uploadAt = this.now() + TQ),
        this.writeMeta(),
        this.hosted && this.resolved && (this.status = `saving`));
    }
    tick() {
      if (this.disposed || !this.hosted) return;
      let e = this.now();
      (!this.resolved && !this.loading && e >= this.nextLoad && this.load(),
        this.resolved &&
          !this.uploading &&
          this.changedAt > this.syncedAt &&
          e >= this.uploadAt &&
          this.upload());
    }
    flush() {
      (this.changedAt > this.syncedAt &&
        this.failures === 0 &&
        (this.uploadAt = 0),
        this.tick());
    }
    hud() {
      return { status: this.status, cloud: this.hosted };
    }
    dispose() {
      (this.flush(), (this.disposed = !0));
    }
    backoff() {
      return Math.min(6e4, 4e3 * 2 ** Math.min(this.failures, 4));
    }
    async load() {
      let e = this.getSDK(),
        t = e?.getUser()?.id;
      if (!e || !t) {
        this.nextLoad = this.now() + 1e3;
        return;
      }
      ((this.loading = !0), (this.status = `loading`));
      try {
        (this.user && this.user !== t && (this.changedAt = this.syncedAt = 0),
          (this.user = t));
        let n = await e.downloadRemoteFile(SQ);
        if (this.disposed) return;
        if (n.success) {
          let t = await e.readLocalFile(SQ);
          if (this.disposed) return;
          let n = t ? this.parse(t) : null;
          n
            ? ((this.syncedAt = n.savedAt),
              n.savedAt >= this.changedAt &&
                ((this.changedAt = n.savedAt), this.apply(n.preferences)))
            : (this.syncedAt = 0);
        } else {
          if (!/\b404\b/.test(n.message)) throw Error(n.message);
          this.syncedAt = 0;
        }
        ((this.resolved = !0),
          (this.failures = 0),
          (this.uploadAt = this.now()),
          this.writeMeta(),
          (this.status = this.changedAt > this.syncedAt ? `saving` : `synced`));
      } catch {
        (this.failures++,
          (this.nextLoad = this.now() + this.backoff()),
          (this.status = `offline`));
      } finally {
        this.loading = !1;
      }
    }
    async upload() {
      let e = this.getSDK();
      if (!e || e.getUser()?.id !== this.user) return;
      let t = this.changedAt;
      ((this.uploading = !0), (this.status = `saving`));
      try {
        let n = this.current(),
          r = JSON.stringify({
            version: 1,
            savedAt: t,
            preferences: { ...n, settings: kQ(n.settings) },
          });
        if (
          !(await e.writeLocalFile(
            `/vector/preferences-v1.json`,
            this.encoder.encode(r),
          ))
        )
          throw Error(`Local save failed`);
        let i = await e.uploadRemoteFile(SQ);
        if (!i.success) throw Error(i.message);
        ((this.syncedAt = Math.max(this.syncedAt, t)),
          (this.failures = 0),
          this.writeMeta(),
          (this.status = this.changedAt > this.syncedAt ? `saving` : `synced`));
      } catch {
        (this.failures++,
          (this.uploadAt = this.now() + this.backoff()),
          (this.status = `offline`));
      } finally {
        this.uploading = !1;
      }
    }
    parse(e) {
      try {
        let t = JSON.parse(this.decoder.decode(e)),
          n = jQ(t.preferences);
        return t.version !== 1 || !EQ(t.savedAt) || !n
          ? null
          : { savedAt: t.savedAt, preferences: n };
      } catch {
        return null;
      }
    }
    readMeta() {
      try {
        let e = JSON.parse(
          this.storage?.getItem(`vector-preferences-sync`) || `{}`,
        );
        return {
          user: typeof e.user == `string` ? e.user : ``,
          changedAt: EQ(e.changedAt) ? e.changedAt : 0,
          syncedAt: EQ(e.syncedAt) ? e.syncedAt : 0,
        };
      } catch {
        return { user: ``, changedAt: 0, syncedAt: 0 };
      }
    }
    writeMeta() {
      try {
        this.storage?.setItem(
          wQ,
          JSON.stringify({
            user: this.user,
            changedAt: this.changedAt,
            syncedAt: this.syncedAt,
          }),
        );
      } catch {}
    }
  },
  NQ = /vangogh|van gogh|sephiroth|custom gpu 0(405|932)/i;
function PQ(e) {
  let t = new URLSearchParams(e.search).get(`deck`);
  if (t === `1`) return !0;
  if (t === `0`) return !1;
  if (/SteamDeck/i.test(e.userAgent)) return !0;
  if (!(
    /Linux/i.test(`${e.platform} ${e.userAgent}`) &&
    !/Android|CrOS/i.test(e.userAgent)
  ))
    return !1;
  if (e.gpu && NQ.test(e.gpu)) return !0;
  let n = e.devicePixelRatio > 0 ? e.devicePixelRatio : 1,
    r = Math.max(e.screenWidth, e.screenHeight) * n,
    i = Math.min(e.screenWidth, e.screenHeight) * n;
  return Math.round(r) === 1280 && Math.round(i) === 800;
}
function FQ() {
  try {
    let e = document.createElement(`canvas`).getContext(`webgl`);
    if (!e) return ``;
    let t = e.getExtension(`WEBGL_debug_renderer_info`),
      n = e.getParameter(t ? t.UNMASKED_RENDERER_WEBGL : e.RENDERER);
    return (
      e.getExtension(`WEBGL_lose_context`)?.loseContext(),
      typeof n == `string` ? n : ``
    );
  } catch {
    return ``;
  }
}
var IQ;
function LQ() {
  if (IQ !== void 0) return IQ;
  if (typeof window > `u`) return !1;
  let e = {
    search: location.search,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    screenWidth: screen.width,
    screenHeight: screen.height,
    devicePixelRatio,
  };
  return (
    (IQ = PQ(e)),
    !IQ && PQ({ ...e, gpu: `vangogh` }) && (IQ = PQ({ ...e, gpu: FQ() })),
    IQ
  );
}
var RQ = { ship: `kestrel`, skin: `original`, tier: 1, medals: 0 },
  zQ = (e, t, n, r) => (Number.isInteger(e) ? Math.min(n, Math.max(t, e)) : r);
function BQ(e) {
  if (!e || typeof e != `object` || Array.isArray(e)) return null;
  let t = e,
    n = nd.find((e) => e.id === t.ship)?.id;
  return n
    ? {
        ship: n,
        skin: lQ(n, t.skin).id,
        tier: zQ(t.tier, 1, oZ.length, 1),
        medals: zQ(t.medals, 0, 999, 0),
      }
    : null;
}
var VQ = (e) => `${e.ship}:${e.skin}:${e.tier}:${e.medals}`;
function HQ(e) {
  return e.skin === `original`
    ? id(e.ship).color
    : lQ(e.ship, e.skin).colors[0];
}
var UQ = 0.6,
  WQ = 4;
function GQ(e, t, n = 0) {
  let r = [],
    i = e.map((e, t) => t).sort((t, n) => e[n].y - e[t].y || e[t].x - e[n].x),
    a = (e) =>
      r.every(
        (t) =>
          !t ||
          Math.abs(t.x - e.x) >= (t.width + e.width) / 2 ||
          e.y - e.height >= t.y ||
          t.y - t.height >= e.y,
      );
  for (let o of i) {
    let i = e[o],
      s = t[0] + i.width / 2,
      c = Math.max(s, t[1] - i.width / 2),
      l = (e) => Math.min(c, Math.max(s, e)),
      u,
      d = 1 / 0;
    for (let e = 0; e <= WQ; e++) {
      let t = i.y - e * i.height;
      if (e && t - i.height < n) break;
      let o = [
        l(i.x),
        ...r.flatMap((e) =>
          e
            ? [
                l(e.x - (e.width + i.width) / 2),
                l(e.x + (e.width + i.width) / 2),
              ]
            : [],
        ),
      ];
      for (let n of o) {
        let r = { ...i, x: n, y: t },
          o = Math.abs(n - i.x) / i.width + e * UQ;
        o < d && a(r) && ((u = r), (d = o));
      }
    }
    r[o] = u ?? { ...i, x: l(i.x) };
  }
  return r.map((e) => ({ x: e.x, y: e.y }));
}
var KQ = [
    `item`,
    `cannonFiring`,
    `ammo`,
    `lock`,
    `lockTime`,
    `fireHeld`,
    `absorbHeld`,
    `cooldown`,
    `acquiredAt`,
    `lastDistance`,
    `lastLane`,
    `visited`,
    `mines`,
    `nextMine`,
    `recovery`,
    `reaction`,
    `hits`,
    `pickups`,
    `shield`,
    `turbos`,
  ],
  qQ = [`pickup`, `fire`, `hit`, `explode`, `heal`, `recover`, `lock`, `block`];
function JQ(e) {
  let t = Object.keys(e.pilots),
    n = (e) => t.indexOf(e);
  return {
    t: e.clock,
    n: e.serial,
    ids: t,
    u: t.map((t) => KQ.map((n) => e.pilots[t][n])),
    p: e.projectiles.map((e) => [
      e.id,
      n(e.owner),
      nX.indexOf(e.kind),
      e.distance,
      e.lane,
      e.heading,
      e.age,
      e.life,
      n(e.target),
      e.targetRecovery,
    ]),
    d: e.pads,
    e: e.events.map((e) => [
      e.id,
      e.time,
      qQ.indexOf(e.kind),
      rX.indexOf(e.item),
      n(e.owner),
      e.distance,
      e.lane,
    ]),
  };
}
