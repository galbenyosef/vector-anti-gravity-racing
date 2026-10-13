// capture.mjs — (re)fetch the VECTOR: ANTI-GRAVITY RACING build closure into the repo root.
// usage: node tools/capture.mjs [--dry-run]
//
// This is the reproducible record of HOW the capture was assembled (2026-10-13)
// and the refresh path (PLAN §3): it boots the same platform session a browser
// would (see tools/update.mjs for the full mechanics write-up), fetches every
// file of the candidate universe and writes it at its served path (repo root =
// the CDN build-host root). Afterwards re-cut the record:
//
//   node tools/capture.mjs
//   node tools/make-manifest.mjs . .upstream/manifest.json
//   node tools/derive.mjs && node tools/audit.js && node tools/verify.mjs
//
// The candidate universe below was reconstructed from two independent sources:
//   1. the runtime network log of a full browser session (load, main menu,
//      garage/intro asset set, a complete 3-lap race and the finish screen —
//      see docs/network-log-2026-10-13.jsonl), and
//   2. the game's own embedded tables (the five-circuit table `vJ` and the
//      scenery→kit map in the entry/game chunks carry every kit, the audio
//      library table carries artist/title/url for every track, the intro/garage
//      set carries the lunar sky textures and award metals, and the ship table
//      `Xu` carries the five hulls plus the two special liveries).
// Files that exist in the closure but were not requested by this session
// (other circuits' kits/HDRs, previews, award webps) are probed directly; 404s
// are NOT shipped and are recorded in _mirror-report.json. `--dry-run` probes
// without writing.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const DRY = process.argv.includes("--dry-run");
const ORIGIN = "https://wavedash.com";
const PAGE = "/games/vector-anti-gravity-racing";
const UA = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
};
const sha = (b) => crypto.createHash("sha256").update(b).digest("hex");
function fnv32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

// ── candidate universe ──────────────────────────────────────────────────
const PLATFORM = ["embed", "embed.js", "embed.css", "sw-embed.js"];
const ENTRY = ["index.html", "favicon.svg", "favicon.ico"];
const ASSETS = [
  "assets/index-DphGw8Ou.js",
  "assets/index-J7X__Wjw.css",
  "assets/game-CsnOSIff.js",
  "assets/player-Cd-Kznkt.js",
  "assets/HDRLoader-C77IBAVq.js",
  "assets/renderer-setup--EktvnNe.js",
  "assets/award-scene-D9Dc5ufv.js",
  "assets/client-BtP_tmtQ.js",
  "assets/audio-preparation.worker-CEAJS9BC.js",
  "assets/geist-98bbbccb-BGnTDqni.woff2",
  "assets/geist-mono-013b2f2f-pyAoGB9p.woff2",
];
const SHIPS = ["kestrel", "manta", "talon", "monarch", "vesper"];
const KITS = [
  "models/solstice-port-kit.glb",
  "models/nocturne-city-kit.glb",
  "models/sirocco-oasis-kit.glb",
  "models/shackleton-base-kit.glb",
  "models/meridian-flying-kit.glb",
  "models/meridian-hotel-kit.glb",
  "models/meridian-materials.glb",
  "models/meridian-skyline-kit.glb",
  "models/meridian-street-kit.glb",
  "models/meridian-transit-kit.glb",
  "models/meridian-venue-kit.glb",
  "models/launch-bay.glb",
  "models/awards.glb",
  "models/port-life.glb",
];
const WEAPONS = ["mines", "rockets", "missile", "cannon"];
const HDRS = ["environment/docklands_02_1k.hdr", "environment/launch-bay_1k.hdr", "environment/shanghai_bund_1k.hdr"];
const LUNAR = [
  "environment/lunar-earth.png",
  "environment/lunar-earth-512.png",
  "environment/lunar-earth-data.png",
  "environment/lunar-earth-data-512.png",
  "environment/lunar-milky-way.png",
  "environment/lunar-milky-way-512.png",
  "environment/regolith-detail.png",
  "environment/regolith-detail-256.png",
];
const AUDIO = [
  "audio/afterburn-club.mp3",
  "audio/breakline-fever.mp3",
  "audio/breakneck-filter.mp3",
  "audio/dance-robo-jam-2.mp3",
  "audio/dance-robo-jam.mp3",
  "audio/dockside-ignition.mp3",
  "audio/gravity-well.mp3",
  "audio/grid-runners.mp3",
  "audio/intro-vector.mp3",
  "audio/jesus-on-es.mp3",
  "audio/menu-groove.mp3",
  "audio/metallic-dropouts-2.mp3",
  "audio/metallic-dropouts-3.mp3",
  "audio/metallic-dropouts.mp3",
  "audio/neon-undertow.mp3",
  "audio/overclock-anthem.mp3",
  "audio/photo-finish.mp3",
  "audio/raw-club-mix.mp3",
  "audio/vector-race.mp3",
  "audio/velocity-bloom.mp3",
];
const AWARDS = [];
for (const kind of ["medal", "trophy"]) for (const metal of ["gold", "silver", "bronze"]) AWARDS.push(`ui/awards/${kind}-${metal}.webp`);

function candidates() {
  const c = new Set([...PLATFORM, ...ENTRY, ...ASSETS, ...KITS, ...HDRS, ...LUNAR, ...AUDIO, ...AWARDS]);
  for (const s of SHIPS) {
    c.add(`models/${s}-player.glb`);
    c.add(`models/previews/${s}.jpg`);
  }
  c.add("models/kestrel-wavedash-player.glb");
  c.add("models/manta-claude-player.glb");
  c.add("models/previews/kestrel-wavedash.jpg");
  c.add("models/previews/manta-claude.jpg");
  for (const w of WEAPONS) c.add(`models/weapons/${w}.glb`);
  return [...c].sort();
}

// ── bootstrap (same mechanics as tools/update.mjs) ──────────────────────
async function get(url, headers) {
  const r = await fetch(url, { headers: { ...UA, ...(headers || {}) } });
  return { status: r.status, buf: r.ok ? Buffer.from(await r.arrayBuffer()) : null, headers: r.headers };
}
const page = await get(ORIGIN + PAGE);
if (page.status !== 200) {
  console.error(`live page -> HTTP ${page.status}`);
  process.exit(2);
}
const html = page.buf.toString("utf8");
const playKey = /playKey:"([0-9a-f]+)"/.exec(html)?.[1];
const gameCloudId = /gameCloud:\{.*?_id:"([^"]+)"/.exec(html)?.[1];
const gameBuildId = /gameBuild:\{.*?_id:"([^"]+)"/.exec(html)?.[1];
const engine = /gameBuild:\{.*?engine:"([^"]+)"/.exec(html)?.[1] || "CUSTOM";
const entrypoint = /gameBuild:\{.*?entrypoint:"([^"]+)"/.exec(html)?.[1] || "index.html";
const anonId = /anonymousUser:\{id:"([^"]+)"/.exec(html)?.[1];
const anonName = /anonymousUser:\{id:"[^"]+",username:"([^"]+)"/.exec(html)?.[1] || "anonymous";
if (!playKey || !gameCloudId || !gameBuildId || !anonId) {
  console.error("could not extract the game bootstrap from the SSR page");
  process.exit(2);
}
const host = `${gameCloudId}-${fnv32(anonId)}-${fnv32(gameBuildId)}.builds.wavedashcdn.com`;
const sdk = JSON.stringify({ convexCloudUrl: "https://convex-api.wavedash.com", wavedashUser: { id: anonId, username: anonName }, gameCloudId, ugcHost: "ugc.wavedashcdn.com", uploadsHost: "uploads.wavedash.com", launchParams: {}, parentOrigin: "https://wavedash.com", initialVolume: 1 });
const embed = await get(`https://${host}/embed?entrypoint=${encodeURIComponent(entrypoint)}&engine=${encodeURIComponent(engine)}&pk=${playKey}&sdkconfig=${encodeURIComponent(sdk)}&gameSlug=vector-anti-gravity-racing`);
const jwt = embed.status === 200 ? /gameplayJwt":"([^"]+)"/.exec(embed.buf.toString("utf8"))?.[1] : null;
if (!jwt) {
  console.error(`live embed -> HTTP ${embed.status}, no gameplayJwt`);
  process.exit(2);
}
console.log(`build ${fnv32(gameBuildId)} @ ${host}`);

// ── fetch ───────────────────────────────────────────────────────────────
const list = candidates();
console.log(`candidates: ${list.length}${DRY ? " (dry run — no writes)" : ""}`);
const results = [];
let i = 0;
let done = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (i < list.length) {
    const p = list[i++];
    try {
      const r = await get(`https://${host}/${p}`, { Authorization: `Bearer ${jwt}`, "X-Wd-Sw": "jwt" });
      if (r.status === 200) {
        if (!DRY) {
          const dst = path.join(proj, p);
          fs.mkdirSync(path.dirname(dst), { recursive: true });
          fs.writeFileSync(dst, r.buf);
        }
        results.push({ p, status: 200, bytes: r.buf.length, enc: r.headers.get("content-encoding") || "" });
      } else results.push({ p, status: r.status });
    } catch (e) {
      results.push({ p, status: 0, err: String(e) });
    }
    if (++done % 25 === 0) console.log(`  ${done}/${list.length}`);
  }
}));
const ok = results.filter((r) => r.status === 200);
const missing = results.filter((r) => r.status !== 200);
console.log(`captured ${ok.length} file(s), ${ok.reduce((a, b) => a + b.bytes, 0)} bytes; ${missing.length} absent:`);
for (const m of missing) console.log(`  ${m.status} ${m.p}`);
if (!DRY) {
  fs.writeFileSync(
    path.join(proj, "_mirror-report.capture-log.json"),
    JSON.stringify({ generated: new Date().toISOString(), host, build: fnv32(gameBuildId), captured: ok, absent: missing }, null, 2) + "\n",
  );
  console.log("next: node tools/make-manifest.mjs . .upstream/manifest.json && node tools/derive.mjs && node tools/audit.js && node tools/verify.mjs");
}
