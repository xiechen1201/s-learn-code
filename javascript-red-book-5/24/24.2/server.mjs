import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";

const root = normalize(new URL(".", import.meta.url).pathname);
const host = "127.0.0.1";
const port = 8080;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const requestedPath = normalize(join(root, pathname === "/" ? "index.html" : pathname));

  if (!requestedPath.startsWith(root) || !existsSync(requestedPath) || !statSync(requestedPath).isFile()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": mimeTypes[extname(requestedPath)] ?? "application/octet-stream",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp",
  });
  createReadStream(requestedPath).pipe(response);
}).listen(port, host, () => {
  console.log(`Serving http://${host}:${port}`);
});
