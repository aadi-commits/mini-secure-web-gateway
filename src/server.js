const http = require("http");
const express = require("express");

const { handleRequest, handleConnect } = require("./proxy");

const apiRouter = require("./api");

const PORT = 8080;

const app = express();

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
