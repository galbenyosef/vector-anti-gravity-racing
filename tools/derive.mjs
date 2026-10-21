// derive.mjs — rebuild the derived layers (readable/ + src/ + split-spec.json)
// from the VECTOR: ANTI-GRAVITY RACING capture (PLAN §3/§5). VECTOR
// (https://wavedash.com/games/vector-anti-gravity-racing) is capture-class: a
// WebGPU anti-gravity racer built as a Vite production bundle (React UI +
// three.js WebGPU/TSL renderer + game sim), delivered by the Wavedash platform
// as a per-build CDN host and wrapped by the Wavedash embed SDK shell. §0.4
// fork-over-mirror was checked on 2026-10-13 — the project publishes no source
// repo (the platform page/credits name the studio, not a source repository),
// so the mirror stands. The capture is untouched; every capture file is
// re-hashed against .upstream/manifest.json before it is rendered, so a
// drifted capture fails loudly instead of being silently re-derived.
//
// Architecture fact that shapes this pipeline: the game's own closure is the
// per-build CDN host root — index.html (hand-written shell: WebGPU meta +
// module script + stylesheet), assets/index-DphGw8Ou.js (the Vite entry chunk:
// React runtime + React-Aria UI vendor code, the app's music/track/ship tables,
// the bundled three.js WebGPU renderer + TSL node system, and the app UI),
// assets/game-CsnOSIff.js (the race simulation: world kits, combat, rivals,
// HUD wiring), assets/player-Cd-Kznkt.js (the intro/garage scene), the scenery
// chunks assets/renderer-setup--EktvnNe.js + assets/award-scene-D9Dc5ufv.js,
// assets/HDRLoader-C77IBAVq.js (vendored three.js HDR/RGBE loaders),
// assets/audio-preparation.worker-CEAJS9BC.js (the procedural-audio worker),
// assets/client-BtP_tmtQ.js (the Wavedash SDK client shim), fonts under
// assets/, and the payload trees models/, environment/, audio/, ui/. The
// platform shell that boots it on wavedash.com is also part of the build host:
// the `embed` document (extensionless HTML with the __WAVEDASH_GAME__ config),
// embed.js (the Wavedash SDK, third-party platform runtime), embed.css and
// sw-embed.js (the service worker that authorizes every build-file fetch).
//
// Pipeline:
//   app JS (index/game/player/scenery chunks + the audio worker) ->
//                                 pinned prettier 3.9.6 (module API — the CLI
//                                 respects .gitignore and can silently echo
//                                 its input), single pass, verified idempotent
//                                 -> readable/<tag>.pretty.js; then
//                                 statement-aligned slices src/<tag>-NN.js at
//                                 top-level declaration boundaries, ~250-350
//                                 line windows (oversized single declarations
//                                 stay whole), exact 2-line provenance header.
//                                 Every slice parse-checked with
//                                 `node --input-type=module --check -` and
//                                 round-tripping byte-exact to its readable
//                                 line range. Two content-anchored wholeFile
//                                 regions inside the entry chunk (vendor rule,
//                                 guards asserted): the React/React-Aria UI
//                                 runtime head and the bundled three.js
//                                 WebGPU+TSL engine region (see REGION claims
//                                 below).
//   embed.js + sw-embed.js +   -> readable pretties + wholeFile sections
//   HDRLoader + client shim       (vendor rule: the Wavedash platform SDK/SW
//                                 and the vendored three.js HDR loaders /
//                                 SDK client shim are third-party runtime,
//                                 indexed whole, never sliced).
//   assets/index-J7X__Wjw.css + embed.css -> readable pretties + wholeFile
//                                 (stylesheet rule).
//   index.html + embed         -> inline <script> scan: index.html references
//                                 external chunks only (no inline content),
//                                 `embed` carries the __WAVEDASH_GAME__ config
//                                 script; it gets a readable *-inline-N twin
//                                 and a readable/index-inline-map.json entry
//                                 (byte range + sha256 inside the capture
//                                 document).
//   payload trees + fonts      -> notRendered (hash + size recorded, no render).
//
// The models/environment/audio/ui payloads are recorded hashed-notRendered:
// engine payloads (GLB kits, HDRIs, MP3s, WOFF2, WebP) are never rewritten or
// re-encoded, per the fleet's engine-build precedent. Identifiers in src/ are
// the bundle's own minified names — a rename campaign (PLAN §5) is NOT claimed
// here and is recorded as an open task in README.md. usage:
//   node tools/derive.mjs
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const PINNED = "3.9.6";
const MAX_WINDOW = 350;
const ROOT = ""; // capture root == repo root (the build host serves at /)

// vendor JS: third-party runtime, wholeFile sections, never sliced
const VENDOR = {
  embed: {
    title: "embed — Wavedash platform SDK (vendor runtime, whole-file, never sliced)",
    desc:
      "The Wavedash platform SDK that the embed shell loads: iframe/parent messaging, lobby + P2P " +
      "matchmaking bridge, Convex client wiring, cloud-save (userfs) and UGC managers, audio routing, " +
      "progress reporting. Third-party platform runtime, not game code. Vendor rule — indexed whole-file " +
      "in readable/, never sliced or rewritten.",
    guard: (t) => (t.includes("Wavedash") && t.includes("convex")) || t.includes("lobby"),
    what: "Wavedash platform SDK",
  },
  "sw-embed": {
    title: "sw-embed — Wavedash embed service worker (vendor, whole-file, never sliced)",
    desc:
      "The service worker the embed shell registers at the build-host origin scope: it attaches the " +
      "gameplay-JWT Authorization header to every build-file request, handles POST /auth/refresh, and " +
      "caches immutable build files (build-file-cache). Platform machinery — indexed whole-file in " +
      "readable/, never sliced or rewritten.",
    guard: (t) => t.includes("wavedash:claim-clients") || t.includes("X-Wd-Sw") || t.includes("build-file-cache"),
    what: "Wavedash embed service worker",
  },
  "assets__HDRLoader-C77IBAVq": {
    title: "assets__HDRLoader-C77IBAVq — vendored three.js HDR loaders (vendor, whole-file, never sliced)",
    desc:
      "The three.js Radiance/RGBE HDR loader pair (RGBELoader + the WebGPU DataTextureHalfFloat HDR " +
      "loader the scenery pipeline uses) that Vite split out of the bundle as a dedicated chunk — " +
      "third-party engine code, not app code. Vendor rule — indexed whole-file in readable/, never sliced " +
      "or rewritten.",
    guard: (t) => /Radiance|RGBE/.test(t) && /DataTexture/.test(t),
    what: "three.js HDR loaders",
  },
  "assets__client-BtP_tmtQ": {
    title: "assets__client-BtP_tmtQ — Wavedash SDK client shim (vendor, whole-file, never sliced)",
    desc:
      "The Wavedash SDK client shim chunk (`window.Wavedash` lookup + default export) that the platform " +
      "SDK injects into the build — third-party platform glue, not game code. Vendor rule — indexed " +
      "whole-file in readable/, never sliced.",
    guard: (t) => t.includes("window.Wavedash") && /Wavedash is not initialized/.test(t),
    what: "Wavedash SDK client shim",
  },
};

const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
const readLines = (abs) => {
  const t = fs.readFileSync(abs, "utf8");
  const l = t.split("\n");
  if (l.length && l[l.length - 1] === "") l.pop();
  return l;
};
const linesOf = (text) => text.replace(/\n$/, "").split("\n");
const lineOf = (text, offset) => text.slice(0, offset).split("\n").length;

// capture-relative name -> derived tag (dirs flattened with __)
const tagOf = (capRel) => {
  const rel = capRel.startsWith(ROOT) ? capRel.slice(ROOT.length) : capRel;
  return rel.replace(/\.(js|css|html?)$/i, "").split("/").join("__");
};
const prettyRelFor = (capRel) =>
  "readable/" + tagOf(capRel) + (/\.css$/i.test(capRel) ? ".pretty.css" : ".pretty.js");

// ── pinned prettier (module API, exactly 3.9.6) ─────────────────────────
async function loadPrettier() {
  const candidates = [
    process.env.PRETTIER_MJS,
    path.join(proj, "node_modules", "prettier", "index.mjs"),
    "D:/repos/mirrors/metropolygonia/node_modules/prettier/index.mjs",
  ].filter(Boolean);
  for (const c of candidates) {
    if (!fs.existsSync(c)) continue;
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(path.dirname(c), "package.json"), "utf8"));
      if (pkg.version !== PINNED) continue;
      const mod = (await import(pathToFileURL(c).href)).default;
      if (mod.version === PINNED) return { mod, at: c };
    } catch {
      /* try next */
    }
  }
  throw new Error(`pinned prettier ${PINNED} not found (set PRETTIER_MJS to its index.mjs)`);
}

// format until a fixed point (bounded): prettier's first pass on the very
// large entry chunk is not yet a fixed point of the same call (one node stays
// in a wrapped layout that re-parsing re-joins), so the pipeline records how
// many passes were needed per file and the audit replays the same count.
async function formatToFixpoint(prettier, text, parser, maxPasses = 4) {
  let cur = text;
  for (let pass = 1; pass <= maxPasses; pass++) {
    const out = await prettier.format(cur, { parser });
    if (out === cur) return { text: cur, passes: pass - 1 }; // already stable (0 extra passes) or converged
    const again = await prettier.format(out, { parser });
    if (again === out) return { text: out, passes: pass };
    cur = out;
  }
  throw new Error(`prettier ${parser} did not reach a fixed point in ${maxPasses} passes`);
}

// ── parse check: the exact standalone gate (ESM stdin) ──────────────────
function parses(text) {
  const r = spawnSync(process.execPath, ["--input-type=module", "--check", "-"], {
    input: text,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return { ok: r.status === 0, why: (r.stderr || "").trim().split("\n").slice(-3).join(" | ") };
}

// ── markers for titles (top tokens, lowercase; fleet convention) ────────
const STOP = new Set(
  ("function return typeof undefined object string number boolean prototype length value default " +
    "exports import this that with from then else case break continue delete instanceof constructor " +
    "arguments void null true false call apply name type text target window document globalthis self " +
    "require module async await yield static class const let var new for while switch throw try catch " +
    "finally extends super using debugger of in do if has own hasown get set")
    .split(" ")
    .filter(Boolean),
);
function markers(text, n = 2) {
  const code = text.replace(/`[^`]*`|"[^"\n]*"|'[^'\n]*'/g, " ");
  const counts = new Map();
  for (const m of code.matchAll(/[A-Za-z][A-Za-z0-9_]{2,}/g)) {
    const w = m[0].toLowerCase();
    if (STOP.has(w)) continue;
    counts.set(w, (counts.get(w) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, n);
}
const markerText = (ms) => ms.map(([w, c]) => `${w}(${c})`).join(", ");

// ── windowize: cut only at statement starts; ≤350 lines, a single ───────
// ── oversized declaration is a window of its own ────────────────────────
function windowize(stmts) {
  const out = [];
  let cur = null;
  for (const s of stmts) {
    if (!cur) {
      cur = { first: s, last: s, count: 1, startLine: s.startLine, endLine: s.endLine };
      continue;
    }
    const projected = s.endLine - cur.startLine + 1;
    if (projected > MAX_WINDOW) {
      out.push(cur);
      cur = { first: s, last: s, count: 1, startLine: s.startLine, endLine: s.endLine };
    } else {
      cur.last = s;
      cur.count++;
      cur.endLine = s.endLine;
    }
  }
  if (cur) out.push(cur);
  return out;
}

// ── inline block scan (byte-exact, over the raw document buffer) ────────
function scanBlocks(buf) {
  const blocks = [];
  for (const [open, close, kind] of [
    ["<script", "</script", "script"],
    ["<style", "</style", "style"],
  ]) {
    let p = 0;
    let n = 0;
    while (true) {
      const i = buf.indexOf(open, p);
      if (i < 0) break;
      const after = buf[i + open.length];
      const boundary =
        after === 0x3e || after === 0x2f || after === 0x20 || after === 0x09 || after === 0x0a || after === 0x0d;
      if (!boundary) {
        p = i + open.length;
        continue;
      }
      const tagEnd = buf.indexOf(">", i);
      if (tagEnd < 0) break;
      const j = buf.indexOf(close, tagEnd + 1);
      if (j < 0) throw new Error(`unterminated <${kind}> opened at byte ${i}`);
      const tag = buf.subarray(i, tagEnd + 1).toString("utf8");
      const external = /\bsrc\s*=\s*["']/i.test(tag);
      if (external) {
        blocks.push({ kind, external: true, tag, openStart: i, contentStart: tagEnd + 1, contentEnd: j });
      } else {
        n++;
        const content = buf.subarray(tagEnd + 1, j);
        blocks.push({
          kind: /\btype\s*=\s*["']importmap["']/i.test(tag) ? "importmap" : kind,
          external: false,
          block: n,
          tag,
          openStart: i,
          contentStart: tagEnd + 1,
          contentEnd: j,
          bytes: content.length,
          sha256: sha256(content),
          text: content.toString("utf8"),
        });
      }
      p = j + close.length;
    }
  }
  return blocks.sort((a, b) => a.openStart - b.openStart);
}

// documents to scan for inline blocks (extensionless `embed` is an HTML doc)
const isDoc = (rel) => /\.html$/i.test(rel) || rel === "embed";

// app JS (sliced): everything except the vendor set
const appJsRels = (captured) =>
  captured.filter((r) => /\.js$/i.test(r) && !VENDOR[tagOf(r)]).sort();

async function main() {
  const { mod: prettier, at } = await loadPrettier();
  console.log(`pinned prettier ${PINNED} (${at})`);

  const manifest = JSON.parse(fs.readFileSync(path.join(proj, ".upstream", "manifest.json"), "utf8"));
  const captured = Object.keys(manifest.files).map((r) => r.split(path.sep).join("/")).sort();
  const captureBytes = (rel) => {
    const abs = path.join(proj, rel);
    if (!fs.existsSync(abs)) throw new Error(`capture file missing: ${rel}`);
    const buf = fs.readFileSync(abs);
    if (sha256(buf) !== manifest.files[rel].sha256)
      throw new Error(`${rel} on disk does not match .upstream/manifest.json — re-verify the capture first`);
    return buf;
  };

  const readableDir = path.join(proj, "readable");
  const srcDir = path.join(proj, "src");
  fs.mkdirSync(readableDir, { recursive: true });
  fs.mkdirSync(srcDir, { recursive: true });
  const written = { readable: new Set(), src: new Set() };

  const sources = [];
  const sections = [];
  const notRendered = [];
  const inlineMapBlocks = [];
  const inlineFiles = [];

  const jsRels = appJsRels(captured);
  const vendorRels = captured.filter((r) => /\.js$/i.test(r) && VENDOR[tagOf(r)]).sort();
  const cssRels = captured.filter((r) => /\.css$/i.test(r));
  const docRels = captured.filter(isDoc);
  const payloadRels = captured.filter((r) => !/\.(js|css)$/i.test(r) && !isDoc(r));

  // ── 1) app JS: statement-aligned slices (+ anchored vendor regions) ─────
  for (const rel of jsRels) {
    const buf = captureBytes(rel);
    const text = buf.toString("utf8");
    if (!Buffer.from(text, "utf8").equals(buf)) throw new Error(`${rel} does not round-trip through utf8`);
    const fmt = await formatToFixpoint(prettier, text, "babel");
    const pretty = fmt.text;
    if (pretty === text)
      throw new Error(`${rel}: prettier output is byte-identical to the capture — nothing to derive`);
    const sourceFile = prettyRelFor(rel);
    fs.writeFileSync(path.join(proj, sourceFile), pretty);
    written.readable.add(path.basename(sourceFile));
    const lines = linesOf(pretty);
    const tag = tagOf(rel);

    const dbg = await prettier.__debug.parse(pretty, { parser: "babel" });
    const top = (dbg.ast.program || dbg.ast).body;
    const stmts = top.map((n) => ({
      node: n,
      startLine: lineOf(pretty, n.start),
      endLine: lineOf(pretty, n.end),
      text: pretty.slice(n.start, n.end),
    }));
    for (let i = 1; i < stmts.length; i++)
      if (stmts[i].startLine <= stmts[i - 1].endLine)
        throw new Error(`${rel}: statements ${i - 1}/${i} share a line — cannot slice at line boundaries`);

    const specials = [];
    const covered = new Array(stmts.length).fill(false);
    const claim = (a, b, block) => {
      if (a < 0 || b < a || b >= stmts.length) throw new Error(`${rel}: bad ${block.file} range ${a}-${b}`);
      for (let i = a; i <= b; i++) {
        if (covered[i]) throw new Error(`${rel}: ${block.file} overlaps another block at statement ${i}`);
        covered[i] = true;
      }
      specials.push({ ...block, A: stmts[a].startLine, B: stmts[b].endLine });
    };

    if (tag === "assets__index-DphGw8Ou") {
      // ── content-anchored vendor region 1: the React/React-Aria runtime head
      const appAudio = stmts.findIndex((s) => s.text.includes("dockside-ignition"));
      if (appAudio < 5) throw new Error(`${rel}: app audio-table anchor (dockside-ignition) not found`);
      const reactRegion = lines.slice(stmts[0].startLine - 1, stmts[appAudio - 1].endLine).join("\n");
      for (const [re, what] of [
        [/__REACT_DEVTOOLS/, "React devtools hook"],
        [/forwardRef/, "React.forwardRef components"],
        [/createElement/, "React createElement runtime"],
        [/__vite__mapDeps|modulepreload/, "Vite chunk machinery"],
      ])
        if (!re.test(reactRegion)) throw new Error(`${rel}: react vendor region guard failed (${what})`);
      for (const bad of ["dockside", "solstice-port", "VXR-07", "models/", "audio/", "previews/"])
        if (reactRegion.includes(bad))
          throw new Error(`${rel}: react vendor region unexpectedly contains app marker "${bad}"`);
      claim(0, appAudio - 1, {
        kind: "whole",
        file: `${tag}-react-vendor.js`,
        title: `${tag} — React + React-Aria UI runtime head (vendor region, whole-file, never sliced)`,
        body:
          "the Vite chunk's opening vendor block: the Vite __vite__mapDeps prelude, the React runtime " +
          "(createElement/forwardRef/jsx-runtime plumbing, devtools hooks, schedulers) and the React-Aria " +
          "UI component libraries (slider/overlay/icon primitives) the app UI is built from — third-party " +
          "runtime. Content-anchored: the region ends immediately before the app's music-library table " +
          "(`audio/dockside-ignition.mp3`). Vendor rule — indexed whole-file in readable/, never sliced.",
      });

      // ── content-anchored vendor region 2: the bundled three.js WebGPU + TSL engine
      const vs = stmts.findIndex((s, i) => i > appAudio && s.text.includes("300 es"));
      if (vs < 0) throw new Error(`${rel}: three.js region start anchor (\`300 es\` constants) not found`);
      if (!/Math\.imul/.test(stmts[vs - 1].text) || !/models\//.test(stmts[vs - 2].text))
        throw new Error(`${rel}: vendor region does not directly follow the app ship-table helpers`);
      const resume = stmts.findIndex((s, i) => i > vs && s.text.includes("Route spacing"));
      if (resume < 0) throw new Error(`${rel}: app resume anchor (Route spacing) not found after the vendor region`);
      const ve = resume - 1;
      const regionText = lines.slice(stmts[vs].startLine - 1, stmts[ve].endLine).join("\n");
      for (const [re, what] of [
        [/WebGPURenderer/, "WebGPURenderer"],
        [/NodeMaterial/, "NodeMaterial/TSL"],
        [/__THREE_DEVTOOLS__/, "three.js devtools registration"],
        [/`300 es`/, "GLSL version constants"],
        [/WebGL2 backend/, "WebGL2 backend fallback"],
      ])
        if (!re.test(regionText)) throw new Error(`${rel}: three.js vendor region guard failed (${what})`);
      for (const bad of ["solstice-port-mk3", "Route spacing", "dockside-ignition", "preferences-v1", "VXR-07"])
        if (regionText.includes(bad))
          throw new Error(`${rel}: three.js vendor region unexpectedly contains app marker "${bad}"`);
      claim(vs, ve, {
        kind: "whole",
        file: `${tag}-three-vendor.js`,
        title: `${tag} — bundled three.js WebGPU + TSL engine (vendor region, whole-file, never sliced)`,
        body:
          "the bundled three.js WebGPU engine (three.webgpu + the TSL node system: math/constants/colour " +
          "management, textures, geometries, materials, node materials, the WebGPURenderer with its WebGL2 " +
          "backend fallback, GPU render pipeline/diagnostics, the window.__THREE_DEVTOOLS__ registrations) " +
          "plus the React scheduler/queueing modules the bundler merged into the same span. The region " +
          "starts at the app ship-table helper boundary and ends immediately before the app's track-spline " +
          "builder (`Route spacing`). Vendor rule — indexed whole-file in readable/, never sliced.",
      });
    }

    // a final pure `export {…}` table carries no new statements — indexed only
    const lastStmt = stmts[stmts.length - 1];
    if (
      lastStmt &&
      lastStmt.node.type === "ExportNamedDeclaration" &&
      !covered[stmts.length - 1] &&
      /^export\s*\{[\s\S]*\}\s*;?$/.test(lastStmt.text.trim()) &&
      !/\bfrom\b/.test(lastStmt.text)
    ) {
      claim(stmts.length - 1, stmts.length - 1, {
        kind: "skip",
        file: `${tag}-tail-export.js`,
        title: `${tag} — final export table (not sliced)`,
        desc: `Lines ${lastStmt.startLine}-${lastStmt.endLine}. The chunk's final export {…} table — the exported bindings live in the earlier slices; a standalone tail carries no new statements, so it is indexed only.`,
      });
    }

    // runs of uncovered statements -> windows
    const runs = [];
    for (let i = 0; i < stmts.length; i++) {
      if (covered[i]) continue;
      const run = [stmts[i]];
      while (i + 1 < stmts.length && !covered[i + 1]) run.push(stmts[++i]);
      runs.push(run);
    }
    const slices = [];
    for (const run of runs) for (const w of windowize(run)) slices.push(w);

    // blocks in line order, then re-tile so every line of the pretty is owned
    const blocks = [...specials, ...slices.map((w) => ({ kind: "slice", A: w.startLine, B: w.endLine, count: w.count }))];
    blocks.sort((a, b) => a.A - b.A);
    for (let i = 0; i < blocks.length; i++) {
      if (i === 0) blocks[i].A = 1;
      if (i + 1 < blocks.length) blocks[i].B = blocks[i + 1].A - 1;
      else blocks[i].B = lines.length;
    }

    let nn = 0;
    let perFileSkipped = 0;
    let perFileVendor = 0;
    for (const b of blocks) {
      if (b.kind === "slice") {
        nn++;
        const num = String(nn).padStart(2, "0");
        const body = lines.slice(b.A - 1, b.B).join("\n") + "\n";
        const ms = markers(body);
        const topWord = ms.length ? ms[0][0] : /^\s*import\b/.test(body) ? "imports" : tag.toLowerCase();
        const oversized = b.count === 1 && b.B - b.A + 1 > MAX_WINDOW;
        const file = `${tag}-${num}.js`;
        const sliceText =
          `// ${tag} ${num} — ${topWord}\n` +
          `// Lines ${b.A}-${b.B} of ${sourceFile} (statement-aligned).\n` +
          body;
        const chk = parses(sliceText);
        if (!chk.ok) throw new Error(`generated src/${file} does not parse standalone: ${chk.why}`);
        fs.writeFileSync(path.join(srcDir, file), sliceText);
        written.src.add(file);
        sections.push({
          file,
          title: `${tag} ${num} — ${topWord}`,
          desc: `${oversized ? "Oversized single declaration (kept whole). " : ""}Lines ${b.A}-${b.B}. Markers: ${markerText(ms)}.`,
          startLine: b.A,
          endLine: b.B,
          sourceFile,
        });
      } else if (b.kind === "whole") {
        perFileVendor++;
        sections.push({
          // A region is a line RANGE inside the source file, not a file of
          // its own: its text lives in `sourceFile` over the recorded
          // range, so `file` names the region (one label per region) and
          // the two regions of a chunk never collide on one path.
          file: b.file,
          wholeFile: true,
          title: b.title,
          desc: `Lines ${b.A}-${b.B} of ${sourceFile}: ${b.body}`,
          note: "whole-file region (vendor rule): indexed in readable/, never sliced",
          startLine: b.A,
          endLine: b.B,
          sourceFile,
        });
      } else {
        perFileSkipped++;
        sections.push({
          file: b.file,
          skipped: true,
          title: b.title,
          desc: b.desc,
          startLine: b.A,
          endLine: b.B,
          sourceFile,
          firstLine: lines[b.A - 1],
          lastLine: lines[b.B - 1],
          // The tail's own text — the layer's index-only copy of the
          // chunk's final export {…} table. A reader that walks the spec
          // finds the table in the pristine and, without this, never finds
          // the layer's counterpart of it: the table is then reported as
          // UNCOVERED (unchecked), never as checked.
          text: lines.slice(b.A - 1, b.B).join("\n"),
        });
      }
    }
    sources.push({
      sourceFile,
      capture: rel,
      captureKind: "file",
      captureSha256: manifest.files[rel].sha256,
      captureBytes: buf.length,
      prettyLines: lines.length,
      prettyBytes: Buffer.byteLength(pretty, "utf8"),
      prettyPasses: fmt.passes,
      idempotent: true,
      tag,
      slices: nn,
      derived:
        `readable + ${nn} statement-aligned slice(s)` +
        (perFileVendor ? ` + ${perFileVendor} wholeFile region(s)` : "") +
        (perFileSkipped ? ` + ${perFileSkipped} skipped section(s)` : ""),
    });
    console.log(
      `derive: ${rel} -> ${sourceFile} (${lines.length} lines, ${nn} slices, ${perFileVendor} wholeFile, ${perFileSkipped} skipped)`,
    );
  }

  // ── 2) vendor JS + CSS: readable pretty + wholeFile section ────────────
  const wholeFileRels = [...vendorRels, ...cssRels];
  for (const rel of wholeFileRels) {
    const buf = captureBytes(rel);
    const text = buf.toString("utf8");
    const isCss = /\.css$/i.test(rel);
    const fmt = await formatToFixpoint(prettier, text, isCss ? "css" : "babel");
    const pretty = fmt.text;
    if (pretty === text) throw new Error(`${rel}: prettier output is byte-identical to the capture`);
    const sourceFile = prettyRelFor(rel);
    fs.writeFileSync(path.join(proj, sourceFile), pretty);
    written.readable.add(path.basename(sourceFile));
    const lines = linesOf(pretty);
    const tag = tagOf(rel);
    const cls = /\.js$/i.test(rel) ? VENDOR[tag] : undefined;
    if (cls && cls.guard && !cls.guard(pretty))
      throw new Error(`${rel}: whole-file guard failed — readable changed shape`);
    const title = cls ? cls.title : `${tag} — stylesheet (whole-file, never sliced)`;
    const desc = cls
      ? `Lines 1-${lines.length} of ${sourceFile}: ${cls.desc}`
      : `Lines 1-${lines.length} of ${sourceFile}. Whole-file (stylesheet rule): the capture stylesheet is indexed whole in readable/, never sliced.`;
    sections.push({
      // `file` is the DERIVED text of this section — the readable twin
      // itself, which is what a reader must compare the capture against.
      // A name that does not exist on disk names no text at all.
      file: sourceFile,
      wholeFile: true,
      // `origin` is the PRISTINE the twin was cut from: the capture, a
      // file DIFFERENT from the derived text. A reader that walks the
      // capture can then find the twin as its counterpart.
      origin: rel,
      title,
      desc,
      note: "whole-file (vendor/stylesheet rule): indexed in readable/, never sliced",
      startLine: 1,
      endLine: lines.length,
      sourceFile,
    });
    sources.push({
      sourceFile,
      capture: rel,
      captureKind: "file",
      captureSha256: manifest.files[rel].sha256,
      captureBytes: buf.length,
      prettyLines: lines.length,
      prettyBytes: Buffer.byteLength(pretty, "utf8"),
      prettyPasses: fmt.passes,
      idempotent: true,
      tag,
      slices: 0,
      derived: cls ? "readable only (vendor bundle, wholeFile)" : "readable only (stylesheet, wholeFile)",
      ...(cls ? { what: cls.what } : {}),
    });
    console.log(`derive: ${rel} -> ${sourceFile} (${lines.length} lines, wholeFile ${cls ? "vendor" : "stylesheet"})`);
  }

  // ── 3) documents: inline scan + twins (+ slices for inline JS) ─────────
  for (const rel of docRels) {
    const buf = captureBytes(rel);
    const blocks = scanBlocks(buf);
    const inline = blocks.filter((b) => !b.external);
    const external = blocks.filter((b) => b.external);
    inlineFiles.push(rel);
    for (const b of external)
      console.log(`derive: ${rel}: external ${b.kind} (not derived): ${b.tag.slice(0, 90)}`);
    const entryTag = tagOf(rel);
    for (const b of inline) {
      const isStyle = b.kind === "style";
      const parser = isStyle ? "css" : b.kind === "importmap" ? "json" : "babel";
      const type = (/\btype\s*=\s*["']?([^"'\s>]+)/i.exec(b.tag)?.[1] ?? "").toLowerCase();
      const DATA_TYPES = new Set(["application/ld+json", "application/json", "importmap", "speculationrules"]);
      if (parser === "babel" && DATA_TYPES.has(type)) {
        notRendered.push({
          capture: rel,
          kind: "inline-data",
          type,
          byteStart: b.contentStart,
          byteEnd: b.contentEnd,
          bytes: b.bytes,
          sha256: b.sha256,
          rendered: false,
          reason: `typed data block (<script type="${type}">) — data, not JS/CSS; recorded with range + sha256, no pretty pass`,
        });
        continue;
      }
      const tag = `${entryTag}-inline-${b.block}`;
      const ext = isStyle ? "css" : "js";
      const prettyFile = `${tag}.pretty.${ext}`;
      const fmt = await formatToFixpoint(prettier, b.text, parser);
      const pretty = fmt.text;
      if (pretty === b.text) throw new Error(`readable/${prettyFile} would be byte-identical to its capture source`);
      fs.writeFileSync(path.join(readableDir, prettyFile), pretty);
      written.readable.add(prettyFile);
      const lines = linesOf(pretty);
      const prettyBuf = Buffer.from(pretty, "utf8");
      inlineMapBlocks.push({
        file: `readable/${prettyFile}`,
        source: rel,
        kind: b.kind,
        block: b.block,
        byteStart: b.contentStart,
        byteEnd: b.contentEnd,
        captureBytes: b.bytes,
        captureSha256: b.sha256,
        prettyBytes: prettyBuf.length,
        prettySha256: sha256(prettyBuf),
      });
      sources.push({
        sourceFile: `readable/${prettyFile}`,
        capture: rel,
        captureKind: `inline-${b.kind}`,
        captureByteStart: b.contentStart,
        captureByteEnd: b.contentEnd,
        captureSha256: b.sha256,
        captureBytes: b.bytes,
        prettyLines: lines.length,
        prettyBytes: prettyBuf.length,
        prettyPasses: fmt.passes,
        prettySha256: sha256(prettyBuf),
        tag,
        slices: 0,
        derived: "readable only (inline block, wholeFile)",
      });
      // JS inline blocks slice like any app file; CSS inline blocks are wholeFile
      if (isStyle || b.kind === "importmap") {
        sections.push({
          // the derived text (the readable twin) + the capture it was cut
          // from — see the vendor/stylesheet whole-file section above
          file: `readable/${prettyFile}`,
          wholeFile: true,
          origin: rel,
          title: `${tag} — inline ${b.kind} block (whole-file, never sliced)`,
          desc: `Lines 1-${lines.length} of readable/${prettyFile}. Whole-file: the document's inline ${b.kind} block (${b.bytes} B at bytes ${b.contentStart}-${b.contentEnd} of ${rel}) is indexed whole and never sliced.`,
          note: `whole-file (inline ${b.kind} block, not sliced)`,
          startLine: 1,
          endLine: lines.length,
          sourceFile: `readable/${prettyFile}`,
        });
        console.log(`derive: ${rel} inline ${b.kind} #${b.block} -> readable/${prettyFile} (${lines.length} lines, wholeFile)`);
        continue;
      }
      // slice the inline JS at top-level statement boundaries
      const dbg = await prettier.__debug.parse(pretty, { parser: "babel" });
      const top = (dbg.ast.program || dbg.ast).body;
      const stmts = top.map((n) => ({
        node: n,
        startLine: lineOf(pretty, n.start),
        endLine: lineOf(pretty, n.end),
        text: pretty.slice(n.start, n.end),
      }));
      for (let i = 1; i < stmts.length; i++)
        if (stmts[i].startLine <= stmts[i - 1].endLine)
          throw new Error(`${rel} inline #${b.block}: statements ${i - 1}/${i} share a line`);
      const perInlineCovered = new Array(stmts.length).fill(false);
      const specials = [];
      const claimI = (a, b2, block) => {
        if (a < 0 || b2 < a || b2 >= stmts.length) throw new Error(`${rel}: bad ${block.file} range ${a}-${b2}`);
        for (let i = a; i <= b2; i++) {
          if (perInlineCovered[i]) throw new Error(`${rel}: ${block.file} overlaps at statement ${i}`);
          perInlineCovered[i] = true;
        }
        specials.push({ ...block, A: stmts[a].startLine, B: stmts[b2].endLine });
      };
      const lastStmt = stmts[stmts.length - 1];
      if (
        lastStmt &&
        lastStmt.node.type === "ExportNamedDeclaration" &&
        !perInlineCovered[stmts.length - 1] &&
        /^export\s*\{[\s\S]*\}\s*;?$/.test(lastStmt.text.trim()) &&
        !/\bfrom\b/.test(lastStmt.text)
      ) {
        claimI(stmts.length - 1, stmts.length - 1, {
          kind: "skip",
          file: `${tag}-tail-export.js`,
          title: `${tag} — final export table (not sliced)`,
          desc: `Lines ${lastStmt.startLine}-${lastStmt.endLine}. Final export {…} table — indexed only.`,
        });
      }
      const runs = [];
      for (let i = 0; i < stmts.length; i++) {
        if (perInlineCovered[i]) continue;
        const run = [stmts[i]];
        while (i + 1 < stmts.length && !perInlineCovered[i + 1]) run.push(stmts[++i]);
        runs.push(run);
      }
      const slices = [];
      for (const run of runs) for (const w of windowize(run)) slices.push(w);
      const blocks2 = [...specials, ...slices.map((w) => ({ kind: "slice", A: w.startLine, B: w.endLine, count: w.count }))];
      blocks2.sort((a, b3) => a.A - b3.A);
      for (let i = 0; i < blocks2.length; i++) {
        if (i === 0) blocks2[i].A = 1;
        if (i + 1 < blocks2.length) blocks2[i].B = blocks2[i + 1].A - 1;
        else blocks2[i].B = lines.length;
      }
      let nn = 0;
      for (const bl of blocks2) {
        if (bl.kind === "slice") {
          nn++;
          const num = String(nn).padStart(2, "0");
          const body = lines.slice(bl.A - 1, bl.B).join("\n") + "\n";
          const ms = markers(body);
          const topWord = ms.length ? ms[0][0] : tag.toLowerCase();
          const oversized = bl.count === 1 && bl.B - bl.A + 1 > MAX_WINDOW;
          const file = `${tag}-${num}.js`;
          const sliceText =
            `// ${tag} ${num} — ${topWord}\n` +
            `// Lines ${bl.A}-${bl.B} of readable/${prettyFile} (statement-aligned).\n` +
            body;
          const chk = parses(sliceText);
          if (!chk.ok) throw new Error(`generated src/${file} does not parse standalone: ${chk.why}`);
          fs.writeFileSync(path.join(srcDir, file), sliceText);
          written.src.add(file);
          sections.push({
            file,
            title: `${tag} ${num} — ${topWord}`,
            desc: `${oversized ? "Oversized single declaration (kept whole). " : ""}Lines ${bl.A}-${bl.B}. Markers: ${markerText(ms)}.`,
            startLine: bl.A,
            endLine: bl.B,
            sourceFile: `readable/${prettyFile}`,
          });
        } else {
          sections.push({
            file: bl.file,
            skipped: true,
            title: bl.title,
            desc: bl.desc,
            startLine: bl.A,
            endLine: bl.B,
            sourceFile: `readable/${prettyFile}`,
            firstLine: lines[bl.A - 1],
            lastLine: lines[bl.B - 1],
            // the tail's own text — see the app-JS skipped section above
            text: lines.slice(bl.A - 1, bl.B).join("\n"),
          });
        }
      }
      console.log(`derive: ${rel} inline ${b.kind} #${b.block} -> readable/${prettyFile} (${lines.length} lines, ${nn} slices)`);
    }
  }

  // inline map deliverable
  if (inlineMapBlocks.length) {
    fs.writeFileSync(
      path.join(readableDir, "index-inline-map.json"),
      JSON.stringify({ note: "inline <script>/<style> byte ranges + sha256 inside the captured documents", blocks: inlineMapBlocks }, null, 2) + "\n",
    );
  }

  // ── 4) prune orphan derived files (capture untouched) ──────────────────
  let pruned = 0;
  for (const [dir, keep, exts] of [
    [readableDir, written.readable, /\.(pretty\.js|pretty\.css)$/],
    [srcDir, written.src, /\.js$/],
  ]) {
    for (const f of fs.readdirSync(dir)) {
      if (exts.test(f) && !keep.has(f)) {
        fs.rmSync(path.join(dir, f));
        pruned++;
        console.log(`derive: pruned orphan derived file ${path.basename(dir)}/${f}`);
      }
    }
  }

  // ── 5) notRendered payloads (every asset; hashed, never rendered) ──────
  for (const rel of payloadRels) {
    const buf = captureBytes(rel);
    notRendered.push({
      capture: rel,
      bytes: buf.length,
      sha256: manifest.files[rel].sha256,
      rendered: false,
      reason:
        /\.(glb|hdr)$/.test(rel)
          ? "engine payload (glTF/HDR scene data) — recorded hashed, never rendered or re-encoded (engine-build precedent)"
          : /\.woff2?$/.test(rel)
            ? "font payload — recorded hashed, never rendered or re-encoded"
            : /\.(mp3|ogg|wav)$/.test(rel)
              ? "audio payload — recorded hashed, never rendered or re-encoded"
              : "binary asset payload — recorded hashed, never rendered",
    });
  }

  // ── 6) split-spec.json (2-space indent + trailing newline) ─────────────
  const appJs = sources.filter((s) => s.derived.startsWith("readable +"));
  const prettyCount = sources.filter((s) => s.sourceFile?.endsWith(".pretty.js")).length;
  const spec = {
    project: "vector-anti-gravity-racing",
    kind: "statement-aligned-slices",
    defaultFile: `src/${sections.find((s) => !s.wholeFile && !s.skipped).file}`,
    importWhitelist: [],
    note:
      "VECTOR: ANTI-GRAVITY RACING (https://wavedash.com/games/vector-anti-gravity-racing) is " +
      "capture-class: a WebGPU anti-gravity racer on the Wavedash platform, served by a per-build CDN " +
      "host (mx70fsjxynf8mke9yqthamtfcx8dtssc-<user-hash>-<build-hash>.builds.wavedashcdn.com) behind a " +
      "platform session (playKey → embed → gameplay JWT). §0.4 fork-over-mirror was checked on " +
      "2026-10-13 — the project publishes no source repository, so the mirror stands. The build is a " +
      "Vite production bundle: index.html loads the entry chunk assets/index-DphGw8Ou.js (React runtime + " +
      "React-Aria UI vendors, the app's music/track/ship tables, the bundled three.js WebGPU+TSL engine, " +
      "the app UI), which pulls game-CsnOSIff.js (race simulation), player-Cd-Kznkt.js (intro/garage), " +
      "renderer-setup--EktvnNe.js and award-scene-D9Dc5ufv.js (scenery), the vendored three.js loaders " +
      "HDRLoader-C77IBAVq.js, the app's audio-preparation.worker-CEAJS9BC.js and the Wavedash SDK client " +
      "shim client-BtP_tmtQ.js. Derived pipeline: capture → pinned prettier 3.9.6 (module API, default " +
      "options, applied until a fixed point — the entry chunk needs 2 passes, everything else 1; the " +
      "recorded pass count is replayed by the audit — never the CLI: it respects .gitignore and can " +
      "silently echo its input) → readable/<tag>.pretty.js|css per captured JS/CSS file (repo-root-relative, dirs " +
      "flattened with __; every pretty provably NOT byte-identical to its capture source) → " +
      "statement-aligned slices src/<tag>-NN.js of the app-side JS at top-level declaration boundaries, " +
      "~250-350 line windows (oversized single declarations stay whole) with an exact 2-line provenance " +
      "header. Every slice parses standalone under `node --input-type=module --check -` and round-trips " +
      "byte-exact to its recorded readable line range. Vendor rule — wholeFile sections/regions, never " +
      "sliced: embed.js (the Wavedash platform SDK), sw-embed.js (its embed service worker), " +
      "assets/HDRLoader-C77IBAVq.js (the vendored three.js HDR loader chunk) and " +
      "assets/client-BtP_tmtQ.js (the SDK client shim) are third-party runtime; inside the entry chunk " +
      "two content-anchored wholeFile regions are asserted by guards — the React/React-Aria UI runtime " +
      "head and the bundled three.js WebGPU+TSL engine region (ending at the app's track-spline builder). " +
      "The scenery chunks carry bundler-merged three.js/TSL utility code interleaved with app code at " +
      "minified module boundaries; those files are sliced statement-aligned and their slices are NOT " +
      "claimed as clean app code — recorded honestly. Machinery/stylesheet rule — " +
      "assets/index-J7X__Wjw.css and embed.css are wholeFile. Non-standalone parts are skipped sections: " +
      "each chunk's final pure export {…} table. Payload rule (engine-build precedent): every file under " +
      "models/, environment/, audio/, ui/ and the fonts are recorded in notRendered with size + sha256 — " +
      "never prettified, re-encoded or otherwise rewritten. Backend paths fetched at runtime — " +
      "/vector/preferences-v1.json and /vector/progress-v1.json (Wavedash userfs cloud saves), " +
      "/auth/token and /auth/refresh (session rotation) — are platform endpoints, not static assets, and " +
      "are recorded as gaps in _mirror-report.json. Identifiers in src/ are the bundle's own minified " +
      "names — the identifier-rename campaign (PLAN §5) is recorded as an open task in README.md, not " +
      "claimed here. Capture bytes are untouched by everything above; re-cut with `node tools/derive.mjs` " +
      "after any capture refresh. `node tools/audit.js` is the gate.",
    renderOptions: {
      _default:
        "prettier 3.9.6, module API, default options, formatted to a fixed point (per-file pass count recorded in sources[].prettyPasses; the entry chunk converges on pass 2) — never the CLI: it respects .gitignore and can silently echo its input",
      js: "parser babel, no plugins",
      css: "parser css, no plugins",
    },
    source:
      `readable/: ${prettyCount} JS pretties (${appJs.length} app chunk/worker file(s) sliced, ` +
      `${appJs.filter((s) => s.derived.includes("wholeFile region")).length} with content-anchored wholeFile regions, ` +
      `${vendorRels.length} vendor wholeFile) + ` +
      `${sources.filter((s) => s.sourceFile?.endsWith(".pretty.css")).length} CSS pretties + ` +
      `${inlineMapBlocks.length} inline twin(s); ` +
      `src/: ${appJs.reduce((n, s) => n + s.slices, 0)} statement-aligned slices across ` +
      `${appJs.filter((s) => s.slices > 0).length} file(s); ` +
      `${sections.filter((s) => s.skipped).length} skipped section(s); ` +
      `${sections.filter((s) => s.wholeFile).length} wholeFile section(s); ` +
      `capture: ${captured.length} files under .upstream/manifest.json (${payloadRels.length} payload(s) notRendered); ` +
      `inline scan: ${inlineFiles.join(", ")} (${inlineMapBlocks.length} inline content block(s)).`,
    inline: {
      scanned: inlineFiles,
      contentBlocks: inlineMapBlocks.length,
      notRendered: notRendered.filter((n) => n.kind === "inline-data").length,
      note: "index.html references external chunks only (no inline content); the extensionless `embed` document carries the __WAVEDASH_GAME__ config script (gcid/gbid/swPath/gameplayJwt/sessionToken), twin-pretty'd and sliced like app JS.",
    },
    sources,
    sections,
    notRendered,
  };
  fs.writeFileSync(path.join(proj, "split-spec.json"), JSON.stringify(spec, null, 2) + "\n");

  // ── 7) self-check (tools/audit.js is the authoritative gate) ────────────
  let bad = 0;
  const bySource = new Map();
  for (const s of sections) {
    if (!bySource.has(s.sourceFile)) bySource.set(s.sourceFile, []);
    bySource.get(s.sourceFile).push(s);
  }
  for (const [sourceFile, list] of bySource) {
    const lines = readLines(path.join(proj, sourceFile));
    const sorted = [...list].sort((a, b) => a.startLine - b.startLine);
    if (sorted[0].startLine !== 1) {
      console.error(`TILING FAIL ${sourceFile}: starts at line ${sorted[0].startLine}`);
      bad++;
    }
    for (let i = 1; i < sorted.length; i++)
      if (sorted[i].startLine !== sorted[i - 1].endLine + 1) {
        console.error(`TILING FAIL ${sourceFile}: gap/overlap at ${sorted[i].file}`);
        bad++;
      }
    if (sorted[sorted.length - 1].endLine !== lines.length) {
      console.error(`TILING FAIL ${sourceFile}: does not reach EOF (${lines.length})`);
      bad++;
    }
  }
  let parsed = 0;
  let ranged = 0;
  let roundOK = 0;
  for (const s of sections) {
    if (s.wholeFile || s.skipped) continue;
    ranged++;
    const abs = path.join(srcDir, s.file);
    const text = fs.readFileSync(abs, "utf8");
    const nl2 = text.indexOf("\n", text.indexOf("\n") + 1);
    const body = text.slice(nl2 + 1);
    const expected = readLines(path.join(proj, s.sourceFile)).slice(s.startLine - 1, s.endLine).join("\n") + "\n";
    if (body !== expected) {
      console.error(`ROUND-TRIP FAIL ${s.file}`);
      bad++;
    } else roundOK++;
    if (!parses(text).ok) {
      console.error(`PARSE FAIL src/${s.file}`);
      bad++;
    } else parsed++;
  }
  let prettyParsed = 0;
  for (const s of sources) {
    if (!s.sourceFile?.endsWith(".pretty.js")) continue;
    if (!parses(fs.readFileSync(path.join(proj, s.sourceFile), "utf8")).ok) {
      console.error(`PARSE FAIL ${s.sourceFile}`);
      bad++;
    } else prettyParsed++;
  }
  console.log(
    `derive: ${written.readable.size} readable file(s), ${written.src.size} src slices ` +
      `(${parsed}/${ranged} parse standalone, ${roundOK}/${ranged} round-trip byte-exact), ` +
      `${sections.filter((s) => s.skipped).length} skipped, ${sections.filter((s) => s.wholeFile).length} wholeFile, ` +
      `${prettyParsed} pretty js parse clean, ${notRendered.length} notRendered, ${pruned} orphan(s) pruned — ` +
      `self-check ${bad ? bad + " FAILURE(S)" : "clean"}`,
  );
  if (bad) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
