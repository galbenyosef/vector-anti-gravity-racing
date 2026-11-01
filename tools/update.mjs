// update.mjs — read-only drift probe for VECTOR: ANTI-GRAVITY RACING
// (https://wavedash.com/games/vector-anti-gravity-racing). Never rewrites the capture.
// usage: node tools/update.mjs [--json]
//
// Platform mechanics (re-probed 2026-11-01): the game is NOT served from
// wavedash.com. Two live sources are needed, and they are separate:
//
//   a) BUILD REFERENCE — the game page server-renders its SvelteKit hydration
//      payload, which carries
//        gameplayData:{ game, gameBuild, gameCloud, launchParams }
//      The build reference lives in that embedded object: `gameBuild._id`
//      (plus `gameCloud._id`, `gameBuild.engine`, `gameBuild.entrypoint`,
//      `gameBuild.buildNumber`). The payload is devalue-serialized (unquoted
//      keys), so it is not JSON — it is bounded with a balanced-brace scan and
//      read with narrow field regexes.
//
//      NOTE (2026-11-01): the per-load `playKey:"…"` field that used to sit in
//      this payload is GONE. Do not look for it here.
//
//   b) PLAY KEY — the playKey is now minted by the platform's launch API:
//        POST https://wavedash.com/api/game-launch
//        Content-Type: application/json
//        {"gameSlug":"vector-anti-gravity-racing"}
//      -> 200 { playKey, userId, gameBuild, gameCloud, anonymousUser }
//      Cookieless works: each call mints a fresh anonymous user + playKey.
//
// The game itself is served by a per-build CDN host:
//
//   https://<gameCloudId>-<fnv32(userId)>-<fnv32(gameBuildId)>.builds.wavedashcdn.com
//
// (derivation confirmed in the platform client bundle: Ki()/Ba() = FNV-1a
// 32-bit, `As({gameCloudId,userId,gameBuildId})`, 63-char cap).
//
// The host requires a per-session gameplay JWT: GET /embed?entrypoint=…&engine=CUSTOM&pk=<playKey>
// (with the sdkconfig JSON param) answers the embed shell HTML carrying
// window.__WAVEDASH_GAME__ = { gcid, gbid, swPath, gameplayJwt, sessionToken };
// every build-file request then travels with `Authorization: Bearer <jwt>` +
// `X-Wd-Sw: jwt` (what the sw-embed.js service worker adds in a browser).
//
// Note on encodings: the build host serves text assets (index.html, the JS/CSS
// chunks) brotli-compressed. Node's fetch transparently content-decodes them,
// and the capture stores the decoded bytes (what a browser hands to the game),
// so a naive static server serves the mirror correctly as identity. The probe
// below uses the same fetch path, so sha256 comparisons are apples-to-apples.
//
// This probe is therefore:
//   1. GET the game page (cookieless — an anonymous bootstrap is enough) and
//      read the build reference out of the embedded `gameplayData` object;
//   2. POST /api/game-launch for the per-session playKey (+ build/cloud/user);
//   3. derive the same CDN host the platform would derive (FNV-1a 32-bit of
//      userId and gameBuildId);
//   4. GET /embed with that pk to mint a fresh gameplay JWT (valid ~1 h);
//   5. probe every file recorded in .upstream/manifest.json with the JWT and
//      compare sha256 (the `embed` shell is `dynamic: true` — rotating
//      JWT/sessionToken — so it is compared normalized).
//
// Failure mode: if either source changes shape (no `gameplayData` object, no
// `gameBuild._id`, or no `playKey` in the launch response) the probe exits 2
// with a message naming the missing piece. It never guesses.
//
// Known noise: _mirror-report.json is a local capture record — never probed.
// A build change shows up twice: as a "build" row (build-id hash) and as
// changed/live-missing file rows.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const ORIGIN = "https://wavedash.com";
const PAGE = "/games/vector-anti-gravity-racing";
const GAME_SLUG = "vector-anti-gravity-racing";
const LAUNCH = "/api/game-launch";
const CAPTURED_BUILD_HASH = "1c1257d5"; // fnv32(gameBuildId) of the captured build
const CONC = 6;
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
function fail(msg) {
  console.error(`update.mjs: ${msg}`);
  process.exit(2);
}
async function get(url, headers) {
  const r = await fetch(url, { headers: { ...UA, ...(headers || {}) } });
  return { status: r.status, buf: r.ok ? Buffer.from(await r.arrayBuffer()) : null, headers: r.headers };
}
async function postJson(url, body) {
  const r = await fetch(url, {
    method: "POST",
    headers: { ...UA, "Content-Type": "application/json", Origin: ORIGIN, Referer: ORIGIN + PAGE },
    body: JSON.stringify(body),
  });
  if (!r.ok) return { status: r.status, json: null };
  try {
    return { status: r.status, json: await r.json() };
  } catch {
    return { status: r.status, json: null };
  }
}
// rotating per-session fields inside the embed shell — everything else must be identical
const normalizeEmbed = (s) =>
  s
    .replace(/gameplayJwt":"[^"]*"/g, 'gameplayJwt":"<jwt>"')
    .replace(/sessionToken":"[0-9a-f]*"/g, 'sessionToken":"<token>"')
    .replace(/wavedashUser":\{"id":"[^"]*","username":"[^"]*"\}/g, 'wavedashUser":{"id":"<id>","username":"<name>"}')
    .replace(/pk=[0-9a-f]+/g, "pk=<playKey>")
    .replace(/swPath":"\/sw-embed\.js\?v=[^"]*"/g, 'swPath":"/sw-embed.js?v=<uuid>"');

// ── SvelteKit hydration payload helpers ─────────────────────────────────
// The payload is devalue-serialized (unquoted keys, `void 0`), so JSON.parse
// cannot read it. Bound the object with a balanced-brace scan that skips
// string literals, then read the few fields we need with narrow regexes.
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
const numField = (obj, name) => {
  const m = new RegExp(`[{,]${name}:([0-9]+)`).exec(obj);
  return m ? Number(m[1]) : undefined;
};

const manifest = JSON.parse(fs.readFileSync(path.join(proj, ".upstream", "manifest.json"), "utf8"));

// ── 1) build reference from the SSR markup ─────────────────────────────
const page = await get(ORIGIN + PAGE);
if (page.status !== 200) fail(`live page ${ORIGIN + PAGE} -> HTTP ${page.status}`);
const html = page.buf.toString("utf8");
const gameplayData = sliceObject(html, "gameplayData");
if (!gameplayData)
  fail(
    "SSR page no longer carries a `gameplayData:{…}` object — the platform's hydration payload changed shape " +
      "(look for a renamed/relocated build reference; the old `playKey:\"…\"` field is long gone).",
  );
const markupBuild = sliceObject(gameplayData, "gameBuild");
const markupCloud = sliceObject(gameplayData, "gameCloud");
if (!markupBuild || !markupCloud) fail("`gameplayData` no longer carries both `gameBuild` and `gameCloud` objects");
const markupBuildId = strField(markupBuild, "_id");
const markupCloudId = strField(markupCloud, "_id");
if (!markupBuildId || !markupCloudId)
  fail("could not read `gameBuild._id` / `gameCloud._id` out of the SSR markup — the embedded JSON changed shape");
const markup = {
  buildId: markupBuildId,
  cloudId: markupCloudId,
  buildNumber: numField(markupBuild, "buildNumber"),
  engine: strField(markupBuild, "engine"),
  entrypoint: strField(markupBuild, "entrypoint"),
};

// ── 2) playKey (and the authoritative build/cloud/user) from the launch API ──
const launched = await postJson(ORIGIN + LAUNCH, { gameSlug: GAME_SLUG });
if (launched.status !== 200)
  fail(`launch API ${ORIGIN + LAUNCH} -> HTTP ${launched.status} (expected 200 JSON)`);
const launch = launched.json;
if (!launch || typeof launch !== "object") fail(`launch API ${LAUNCH} did not answer JSON`);
const playKey = launch.playKey;
const launchBuildId = launch.gameBuild?._id;
const launchCloudId = launch.gameCloud?._id;
const userId = launch.userId || launch.anonymousUser?.id;
if (!playKey || !launchBuildId || !launchCloudId || !userId)
  fail(
    `launch API ${LAUNCH} no longer returns the expected { playKey, userId, gameBuild._id, gameCloud._id } ` +
      `(got keys: ${Object.keys(launch).join(", ") || "none"})`,
  );

const buildHash = fnv32(launchBuildId);
const host = `${launchCloudId}-${fnv32(userId)}-${buildHash}.builds.wavedashcdn.com`;
const engine = launch.gameBuild.engine || markup.engine;
const entrypoint = launch.gameBuild.entrypoint || markup.entrypoint;

// ── 3) mint a gameplay JWT via the embed shell ──────────────────────────
const sdk = JSON.stringify({
  convexCloudUrl: "https://convex-api.wavedash.com",
  wavedashUser: { id: userId, username: launch.anonymousUser?.username || "anonymous" },
  gameCloudId: launchCloudId,
  ugcHost: "ugc.wavedashcdn.com",
  uploadsHost: "uploads.wavedash.com",
  launchParams: {},
  parentOrigin: "https://wavedash.com",
  initialVolume: 1,
});
const embedUrl =
  `https://${host}/embed?entrypoint=${encodeURIComponent(entrypoint || "index.html")}` +
  `&engine=${encodeURIComponent(engine || "CUSTOM")}&pk=${playKey}&sdkconfig=${encodeURIComponent(sdk)}&gameSlug=${GAME_SLUG}`;
const embed = await get(embedUrl);
if (embed.status !== 200) fail(`live embed ${embedUrl.slice(0, 120)}… -> HTTP ${embed.status}`);
const embedText = embed.buf.toString("utf8");
const jwt = /gameplayJwt":"([^"]+)"/.exec(embedText)?.[1];
if (!jwt) fail("live embed shell carries no gameplayJwt — platform shape changed");

// ── 4) probe every captured file ────────────────────────────────────────
const rows = [];
if (buildHash !== CAPTURED_BUILD_HASH)
  rows.push({
    file: "<build>",
    state: "changed",
    mirror: CAPTURED_BUILD_HASH,
    live: buildHash,
    note: `gameBuild._id hash differs — a new build is live (markup buildNumber ${markup.buildNumber} / launch buildNumber ${launch.gameBuild.buildNumber})`,
  });
if (launchBuildId !== markupBuildId)
  rows.push({
    file: "<build-source>",
    state: "changed",
    note: `SSR markup build ${markupBuildId} != launch API build ${launchBuildId} — the page and the launch API disagree`,
  });

const rels = Object.keys(manifest.files).filter((r) => !r.endsWith("_mirror-report.json")).sort();
let i = 0;
const results = new Map();
await Promise.all(
  Array.from({ length: CONC }, async () => {
    while (i < rels.length) {
      const rel = rels[i++];
      try {
        const r = await get(`https://${host}/${rel}`, { Authorization: `Bearer ${jwt}`, "X-Wd-Sw": "jwt" });
        results.set(rel, r);
      } catch (e) {
        results.set(rel, { status: 0, err: String(e) });
      }
    }
  }),
);
for (const rel of rels) {
  const m = manifest.files[rel];
  const l = results.get(rel);
  if (!l || l.status !== 200) {
    rows.push({ file: rel, state: "live-missing", status: l ? l.status : 0 });
    continue;
  }
  if (m.dynamic) {
    // rotating session fields — compare normalized
    if (rel === "embed") {
      const a = normalizeEmbed(l.buf.toString("utf8"));
      const b = normalizeEmbed(fs.readFileSync(path.join(proj, rel), "utf8"));
      if (a !== b) rows.push({ file: rel, state: "changed", note: "dynamic shell differs beyond rotating tokens" });
    } else if (rel.endsWith(".html") || isDoc(rel)) {
      const a = normalizeEmbed(l.buf.toString("utf8"));
      const b = normalizeEmbed(fs.readFileSync(path.join(proj, rel), "utf8"));
      if (a !== b) rows.push({ file: rel, state: "changed" });
    }
    continue; // dynamic: presence (+ shape for the embed shell) is the stable signal
  }
  if (rel === "embed" || isDoc(rel)) {
    const a = normalizeEmbed(l.buf.toString("utf8"));
    const b = normalizeEmbed(fs.readFileSync(path.join(proj, rel), "utf8"));
    if (a !== b) rows.push({ file: rel, state: "changed" });
  } else if (m.sha256 !== sha(l.buf)) {
    rows.push({ file: rel, state: "changed", mirror: m.sha256.slice(0, 12), live: sha(l.buf).slice(0, 12) });
  }
}
function isDoc(rel) {
  return /\.html$/i.test(rel) || rel === "embed";
}
const changed = rows.filter((r) => r.state === "changed").length;
const missing = rows.filter((r) => r.state === "live-missing").length;
if (process.argv.includes("--json")) {
  console.log(
    JSON.stringify(
      {
        origin: ORIGIN,
        host,
        build: buildHash,
        markup,
        launch: {
          buildId: launchBuildId,
          cloudId: launchCloudId,
          buildNumber: launch.gameBuild.buildNumber,
          engine,
          entrypoint,
        },
        checked: rels.length,
        changed,
        missing,
        rows,
      },
      null,
      2,
    ),
  );
} else if (!rows.length) {
  console.log(`up to date: ${rels.length} captured files identical upstream (build ${buildHash})`);
} else {
  console.log(`DRIFT: ${changed} changed, ${missing} live-missing (of ${rels.length} captured; build ${buildHash})`);
  for (const r of rows.slice(0, 40)) console.log(`  ${r.state.padEnd(14)} ${r.file}`);
  process.exit(1);
}
