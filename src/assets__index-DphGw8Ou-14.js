// assets__index-DphGw8Ou 14 — syncedat
// Lines 73027-73367 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
var jZ = class {
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
        (this.uploadAt = this.now() + wZ),
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
        let n = await e.downloadRemoteFile(xZ);
        if (this.disposed) return;
        if (n.success) {
          let t = await e.readLocalFile(xZ);
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
            preferences: { ...n, settings: OZ(n.settings) },
          });
        if (
          !(await e.writeLocalFile(
            `/vector/preferences-v1.json`,
            this.encoder.encode(r),
          ))
        )
          throw Error(`Local save failed`);
        let i = await e.uploadRemoteFile(xZ);
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
          n = AZ(t.preferences);
        return t.version !== 1 || !TZ(t.savedAt) || !n
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
          changedAt: TZ(e.changedAt) ? e.changedAt : 0,
          syncedAt: TZ(e.syncedAt) ? e.syncedAt : 0,
        };
      } catch {
        return { user: ``, changedAt: 0, syncedAt: 0 };
      }
    }
    writeMeta() {
      try {
        this.storage?.setItem(
          CZ,
          JSON.stringify({
            user: this.user,
            changedAt: this.changedAt,
            syncedAt: this.syncedAt,
          }),
        );
      } catch {}
    }
  },
  MZ = /vangogh|van gogh|sephiroth|custom gpu 0(405|932)/i;
function NZ(e) {
  let t = new URLSearchParams(e.search).get(`deck`);
  if (t === `1`) return !0;
  if (t === `0`) return !1;
  if (/SteamDeck/i.test(e.userAgent)) return !0;
  if (!(
    /Linux/i.test(`${e.platform} ${e.userAgent}`) &&
    !/Android|CrOS/i.test(e.userAgent)
  ))
    return !1;
  if (e.gpu && MZ.test(e.gpu)) return !0;
  let n = e.devicePixelRatio > 0 ? e.devicePixelRatio : 1,
    r = Math.max(e.screenWidth, e.screenHeight) * n,
    i = Math.min(e.screenWidth, e.screenHeight) * n;
  return Math.round(r) === 1280 && Math.round(i) === 800;
}
function PZ() {
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
var FZ;
function IZ() {
  if (FZ !== void 0) return FZ;
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
    (FZ = NZ(e)),
    !FZ && NZ({ ...e, gpu: `vangogh` }) && (FZ = NZ({ ...e, gpu: PZ() })),
    FZ
  );
}
var LZ = `vector-career-v1`,
  RZ = [`gold`, `silver`, `bronze`],
  zZ = { bronze: 1, silver: 2, gold: 3 },
  BZ = [
    {
      id: `rookie`,
      name: `ROOKIE`,
      tagline: `First licence. Learn the lines.`,
      requires: 0,
      lapFactors: [1.06, 1.12, 1.2],
      cpuSkill: 0,
      orbs: [36, 33, 30],
    },
    {
      id: `pro`,
      name: `PRO`,
      tagline: `Faster fields, tighter targets.`,
      requires: 10,
      lapFactors: [1.03, 1.08, 1.14],
      cpuSkill: 0.3,
      orbs: [38, 35, 32],
    },
    {
      id: `elite`,
      name: `ELITE`,
      tagline: `Within a breath of the best.`,
      requires: 22,
      lapFactors: [1, 1.04, 1.09],
      cpuSkill: 0.65,
      orbs: [39, 37, 35],
    },
    {
      id: `phantom`,
      name: `PHANTOM`,
      tagline: `Beat the machine.`,
      requires: 36,
      lapFactors: [0.96, 1, 1.05],
      cpuSkill: 1,
      orbs: [40, 39, 38],
    },
  ],
  VZ = {
    "solstice-port-mk3": 23.4,
    "nocturne-exchange": 23.8,
    "sirocco-oasis": 29.2,
    "shackleton-rim": 38.3,
    "meridian-grand-prix": 39.4,
  },
  HZ = {
    "solstice-port-mk3": 23.4,
    "nocturne-exchange": 24,
    "sirocco-oasis": 30.3,
    "shackleton-rim": 39.6,
    "meridian-grand-prix": 38.9,
  },
  UZ = {
    race: {
      name: `SINGLE RACE`,
      brief: `Three laps against seven pilots, weapons live. Finish on the podium.`,
      race: `race`,
    },
    "speed-lap": {
      name: `SPEED LAP`,
      brief: `Open track and a Turbo every lap. Set one lap under the target.`,
      race: `timed-lap`,
    },
    orbs: {
      name: `ORBS`,
      brief: `One lap from the grid. Fly through as many of the ${sX.count} orbs as you can.`,
      race: `orbs`,
    },
    tournament: {
      name: `TOURNAMENT`,
      brief: `Five circuits back to back, three laps each. Points decide the podium.`,
      race: `race`,
    },
  },
  WZ = [
    [1, 0, `race`, 0],
    [0, 0, `speed-lap`, 0],
    [2, 0, `race`, 1],
    [1, 1, `speed-lap`, 1],
    [0, 1, `race`, 2],
    [2, 1, `speed-lap`, 2],
    [1, 2, `race`, 1],
    [0, 2, `race`, 0],
    [2, 2, `speed-lap`, 2],
    [1, 3, `tournament`, 0],
  ],
  GZ = vJ.slice(0, 3),
  KZ = [
    [0, 3, `race`, `shackleton-rim`],
    [2, 3, `speed-lap`, `shackleton-rim`],
    [1, 4, `race`, `meridian-grand-prix`],
    [2, 4, `speed-lap`, `meridian-grand-prix`],
  ],
  qZ = [0, 4],
  JZ = [
    `solstice-port-mk3`,
    `nocturne-exchange`,
    `sirocco-oasis`,
    `meridian-grand-prix`,
  ],
  YZ = [
    [0, 5, `race`],
    [1, 5, `speed-lap`],
    [2, 5, `race`],
  ],
  XZ = [
    [!1, !1, !1, !1, !1],
    [!1, !1, !1, !1, !0],
    [!1, !0, !1, !0, !1],
    [!0, !1, !0, !1, !0],
  ];
function ZZ(e) {
  return vJ.map((t, n) => ({
    circuit: vJ[(e + n) % vJ.length].id,
    reverse: !!XZ[e]?.[n],
  }));
}
