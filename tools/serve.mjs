// serve.mjs — tiny static server for the mirror boot test / local play.
// usage: node tools/serve.mjs [root] [port]
//
// The capture stores decoded bytes exactly as a browser receives them from the
// build host (the CDN serves the text assets brotli-compressed; Node's fetch
// content-decodes them before they are written), so a naive static server like
// this one serves the mirror correctly with identity encoding — nothing here
// needs to re-encode or decompress anything.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = process.argv[2] || ".";
const port = Number(process.argv[3] || 8137);
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".glb": "model/gltf-binary",
  ".hdr": "image/vnd.radiance",
  ".mp3": "audio/mpeg",
  ".woff2": "font/woff2",
  ".wasm": "application/wasm",
};
http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    p = p.replace(/^\/+/, "");
    if (p.endsWith("/") || p === "") p += "index.html";
    const abs = path.resolve(root, p);
    const rootAbs = path.resolve(root);
    if (!(abs === rootAbs || abs.startsWith(rootAbs + path.sep))) {
      res.writeHead(403).end();
      return;
    }
    let file = abs;
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (!fs.existsSync(file)) {
      res.writeHead(404, { "content-type": "text/plain" }).end("not found");
      console.log(`404 ${p}`);
      return;
    }
    res.writeHead(200, {
      "content-type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
      "cross-origin-opener-policy": "same-origin",
      "cross-origin-embedder-policy": "require-corp",
    });
    fs.createReadStream(file).pipe(res);
    if (!/\.(png|jpg|jpeg|webp|glb|hdr|mp3|woff2|wasm)$/.test(file)) console.log(`200 ${p}`);
  })
  .listen(port, () => console.log(`serving ${path.resolve(root)} on http://127.0.0.1:${port}`));
