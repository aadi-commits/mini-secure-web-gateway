const http = require("http");
const express = require("express");

const { handleRequest, handleConnect } = require("./proxy");
const apiRouter = require("./api");

const PORT = 8080;

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  next();
});

app.use("/api", apiRouter);

const server = http.createServer((req, res) => {
  // API requests go to Express
  if (req.url.startsWith("/api/")) {
    app(req, res);
    return;
  }

  // Everything else goes to the proxy
  handleRequest(req, res);
});

// HTTPS CONNECT requests go directly to the proxy
server.on("connect", handleConnect);

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Mini Secure Web Gateway running on port ${PORT}`);
});
