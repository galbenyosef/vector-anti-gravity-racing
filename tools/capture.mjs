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
// Platform mechanics (re-probed and re-written 2026-11-01): the game is served
// by a per-build CDN host, and the platform stopped server-rendering `playKey`
// in the game page. Two read-only sources are used:
//
//   a) BUILD REFERENCE — the game page server-renders its SvelteKit hydration
//      payload `gameplayData:{ game, gameBuild, gameCloud, launchParams }`
//      (devalue-serialized, so bounded with a balanced-brace scan and read with
//      narrow field regexes). `gameBuild._id` is the build id.
//   b) PLAY KEY — `POST https://wavedash.com/api/game-launch` with
//      {"gameSlug":"vector-anti-gravity-racing"} answers
//      { playKey, userId, gameBuild, gameCloud, anonymousUser }.
//
//   host = <gameCloudId>-<fnv32(userId)>-<fnv32(gameBuildId)>.builds.wavedashcdn.com
//   GET /embed?…&pk=<playKey> mints the ~1 h gameplay JWT that every build-file
//   request needs (Authorization: Bearer + X-Wd-Sw: jwt).
//
// The candidate universe is reconstructed from two independent sources:
//   1. the runtime network log of a full browser session (load, main menu,
//      garage/intro asset set, a complete 3-lap race and the finish screen —
//      see docs/network-log-2026-10-13.jsonl), and
//   2. the game's own embedded tables (the five-circuit table and the
//      scenery→kit map in the entry/game chunks carry every kit, the audio
//      library table carries artist/title/url for every track, the intro/garage
//      set carries the lunar sky textures and award metals, and the ship table
//      carries the five hulls plus the two special liveries).
//
// The `assets/` text chunks are content-hashed and therefore rotate on every
// build, so they are NOT hard-coded: they are discovered at capture time by
// following the import graph from `index.html` (dir-relative; chunk names may
// contain `-` and `_`). The payload universe (models/, environment/, audio/,
// ui/, fonts) keeps stable names and is listed below. Files that exist in the
// closure but were not requested by this session (other circuits' kits/HDRs,
// previews, award webps) are probed directly; 404s are NOT shipped and are
// recorded in _mirror-report.json. `--dry-run` probes without writing.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const DRY = process.argv.includes("--dry-run");
const ORIGIN = "https://wavedash.com";
const PAGE = "/games/vector-anti-gravity-racing";
const GAME_SLUG = "vector-anti-gravity-racing";
const UA = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
};
function fnv32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}
function fail(msg) {
  console.error(`capture.mjs: ${msg}`);
  process.exit(2);
}

// ── candidate universe (stable-named payload) ───────────────────────────
const PLATFORM = ["embed", "embed.js", "embed.css", "sw-embed.js"];
const ENTRY = ["index.html", "favicon.svg", "favicon.ico"];
const FONTS = ["assets/geist-98bbbccb-BGnTDqni.woff2", "assets/geist-mono-013b2f2f-pyAoGB9p.woff2"];
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
const SHIPS = ["kestrel", "manta", "talon", "monarch", "vesper"];
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

function payloadCandidates() {
  const c = new Set([...PLATFORM, ...ENTRY, ...FONTS, ...KITS, ...HDRS, ...LUNAR, ...AUDIO, ...AWARDS]);
  for (const s of SHIPS) {
    c.add(`models/${s}-player.glb`);
    c.add(`models/previews/${s}.jpg`);
  }
  c.add("models/kestrel-wavedash-player.glb");
  c.add("models/manta-claude-player.glb");
  c.add("models/previews/kestrel-wavedash.jpg");
  c.add("models/previews/manta-claude.jpg");
  for (const w of WEAPONS) c.add(`models/weapons/${w}.glb`);
  return [...c];
}

// ── bootstrap (same mechanics as tools/update.mjs) ──────────────────────
async function get(url, headers) {
  const r = await fetch(url, { headers: { ...UA, ...(headers || {}) } });
  return { status: r.status, buf: r.ok ? Buffer.from(await r.arrayBuffer()) : null, headers: r.headers };
}
function sliceObject(src, key) {
  const at = src.indexOf(`${key}:{`);
  if (at < 0) return null;
  const start = at + key.length + 1; // index of '{'
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') inStr = true;
    else if (ch === "{") depth++;
    else if (ch === "}" && --depth === 0) return src.slice(start, i + 1);
  }
  return null;
}
const strField = (obj, name) => new RegExp(`[{,]${name}:"((?:[^"\\\\]|\\\\.)*)"`).exec(obj)?.[1];

const page = await get(ORIGIN + PAGE);
if (page.status !== 200) fail(`live page ${ORIGIN + PAGE} -> HTTP ${page.status}`);
const html = page.buf.toString("utf8");
const gameplayData = sliceObject(html, "gameplayData");
if (!gameplayData) fail("SSR page no longer carries a `gameplayData:{…}` object — platform shape changed");
const markupBuildId = strField(sliceObject(gameplayData, "gameBuild"), "_id");
const markupCloudId = strField(sliceObject(gameplayData, "gameCloud"), "_id");
const markupEngine = strField(sliceObject(gameplayData, "gameBuild"), "engine") || "CUSTOM";
const markupEntrypoint = strField(sliceObject(gameplayData, "gameBuild"), "entrypoint") || "index.html";
if (!markupBuildId || !markupCloudId) fail("could not read `gameBuild._id` / `gameCloud._id` out of the SSR markup");

const launchRes = await fetch(ORIGIN + "/api/game-launch", {
  method: "POST",
  headers: { ...UA, "Content-Type": "application/json", Origin: ORIGIN, Referer: ORIGIN + PAGE },
  body: JSON.stringify({ gameSlug: GAME_SLUG }),
});
if (!launchRes.ok) fail(`launch API ${ORIGIN}/api/game-launch -> HTTP ${launchRes.status}`);
const launch = await launchRes.json();
const playKey = launch.playKey;
const gameBuildId = launch.gameBuild?._id;
const gameCloudId = launch.gameCloud?._id;
const anonId = launch.userId || launch.anonymousUser?.id;
if (!playKey || !gameBuildId || !gameCloudId || !anonId)
  fail(`launch API no longer returns { playKey, userId, gameBuild._id, gameCloud._id } (keys: ${Object.keys(launch).join(", ") || "none"})`);
if (gameBuildId !== markupBuildId)
  fail(`SSR markup build ${markupBuildId} != launch API build ${gameBuildId} — the page and the launch API disagree`);
const engine = launch.gameBuild.engine || markupEngine;
const entrypoint = launch.gameBuild.entrypoint || markupEntrypoint;
const anonName = launch.anonymousUser?.username || "anonymous";

const buildHash = fnv32(gameBuildId);
const host = `${gameCloudId}-${fnv32(anonId)}-${buildHash}.builds.wavedashcdn.com`;
const sdk = JSON.stringify({ convexCloudUrl: "https://convex-api.wavedash.com", wavedashUser: { id: anonId, username: anonName }, gameCloudId, ugcHost: "ugc.wavedashcdn.com", uploadsHost: "uploads.wavedash.com", launchParams: {}, parentOrigin: "https://wavedash.com", initialVolume: 1 });
const embedUrl =
  `https://${host}/embed?entrypoint=${encodeURIComponent(entrypoint)}&engine=${encodeURIComponent(engine)}` +
  `&pk=${playKey}&sdkconfig=${encodeURIComponent(sdk)}&gameSlug=${GAME_SLUG}`;
const embed = await get(embedUrl);
const jwt = embed.status === 200 ? /gameplayJwt":"([^"]+)"/.exec(embed.buf.toString("utf8"))?.[1] : null;
if (!jwt) fail(`live embed -> HTTP ${embed.status}, no gameplayJwt`);
const auth = { Authorization: `Bearer ${jwt}`, "X-Wd-Sw": "jwt" };
console.log(`build ${buildHash} @ ${host}`);

// ── discover the content-hashed `assets/` chunk closure from index.html ──
const CHUNK_EXT = /\.(js|css|woff2?)$/i;
function chunkRefs(text) {
  const out = new Set();
  for (const m of text.matchAll(/["'`](\.?\/?[A-Za-z0-9_\-./@]*?[A-Za-z0-9_-]+\.[A-Za-z0-9]{1,10})["'`]/g)) {
    const s = m[1];
    if (CHUNK_EXT.test(s)) out.add(s);
  }
  return out;
}
function resolveChunk(base, ref) {
  const dir = base.includes("/") ? base.slice(0, base.lastIndexOf("/") + 1) : "";
  const parts = (dir + ref.replace(/^\.\//, "")).split("/");
  const st = [];
  for (const p of parts) {
    if (p === "..") st.pop();
    else if (p !== "." && p !== "") st.push(p);
  }
  return st.join("/");
}
async function discoverChunks() {
  const found = new Set();
  const ix = await get(`https://${host}/index.html`, auth);
  if (ix.status !== 200) fail(`live index.html -> HTTP ${ix.status}`);
  const queue = [];
  for (const raw of chunkRefs(ix.buf.toString("utf8"))) queue.push(resolveChunk("index.html", raw));
  while (queue.length) {
    const rel = queue.shift();
    if (found.has(rel) || !rel.startsWith("assets/")) continue;
    found.add(rel);
    if (!/\.(js|css)$/i.test(rel)) continue;
    const r = await get(`https://${host}/${rel}`, auth);
    if (r.status !== 200) continue;
    for (const raw of chunkRefs(r.buf.toString("utf8"))) queue.push(resolveChunk(rel, raw));
  }
  return [...found].sort();
}

const list = [...new Set([...payloadCandidates(), ...(await discoverChunks())])].sort();
console.log(`candidates: ${list.length}${DRY ? " (dry run — no writes)" : ""}`);

// ── fetch ───────────────────────────────────────────────────────────────
const results = [];
let i = 0;
let done = 0;
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (i < list.length) {
      const p = list[i++];
      try {
        const r = await get(`https://${host}/${p}`, auth);
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
  }),
);
const ok = results.filter((r) => r.status === 200);
const missing = results.filter((r) => r.status !== 200);
console.log(`captured ${ok.length} file(s), ${ok.reduce((a, b) => a + b.bytes, 0)} bytes; ${missing.length} absent:`);
for (const m of missing) console.log(`  ${m.status} ${m.p}`);
if (!DRY) {
  fs.writeFileSync(
    path.join(proj, "_mirror-report.capture-log.json"),
    JSON.stringify({ generated: new Date().toISOString(), host, build: buildHash, buildId: gameBuildId, buildNumber: launch.gameBuild.buildNumber, captured: ok, absent: missing }, null, 2) + "\n",
  );
  console.log("next: node tools/make-manifest.mjs . .upstream/manifest.json && node tools/derive.mjs && node tools/audit.js && node tools/verify.mjs");
}
