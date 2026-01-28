const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const root = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

const sendNotFound = (res) => {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
};

const server = http.createServer((req, res) => {
  const requestPath = req.url.split("?")[0];
  const safePath = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = path.join(root, safePath);

  if (!filePath.startsWith(root)) {
    sendNotFound(res);
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendNotFound(res);
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "text/plain" });
    res.end(content);
  });
});

server.listen(port, () => {
  console.log(`TickerWire running on http://localhost:${port}`);
});
