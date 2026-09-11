const http = require("http");
const net = require("net");

const { isAllowed, getBlockedDomains } = require("./policy");
const { logRequest } = require("./logger");

// Track active HTTPS tunnels
const activeTunnels = new Map();

function addTunnel(hostname, clientSocket, serverSocket) {
  const host = hostname.toLowerCase();

  if (!activeTunnels.has(host)) {
    activeTunnels.set(host, new Set());
  }

  activeTunnels.get(host).add({
    clientSocket,
    serverSocket,
  });
}

function removeTunnel(hostname, tunnel) {
  const host = hostname.toLowerCase();
  const tunnels = activeTunnels.get(host);

  if (!tunnels) return;

  tunnels.delete(tunnel);

  if (tunnels.size === 0) {
    activeTunnels.delete(host);
  }
}

function handleRequest(clientReq, clientRes) {
  console.log(`[HTTP] ${clientReq.method} ${clientReq.url}`);

  try {
    const targetUrl = new URL(clientReq.url);

    if (!isAllowed(targetUrl.hostname)) {
      console.log(`[BLOCKED] ${targetUrl.hostname}`);
      logRequest("HTTP", targetUrl.hostname, "BLOCKED");

      clientRes.writeHead(403, {
        "Content-Type": "text/plain",
      });

      clientRes.end("Access denied by Secure Web Gateway");
      return;
    }

    logRequest("HTTP", targetUrl.hostname, "ALLOWED");

    const options = {
      hostname: targetUrl.hostname,
      port: targetUrl.port || 80,
      path: `${targetUrl.pathname}${targetUrl.search}`,
      method: clientReq.method,
      headers: clientReq.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(clientRes);
    });

    proxyReq.on("error", (error) => {
      console.error("[PROXY ERROR]", error.message);

      if (!clientRes.headersSent) {
        clientRes.writeHead(502);
      }

      clientRes.end("Bad Gateway");
    });

    clientReq.pipe(proxyReq);
  } catch (error) {
    console.error("[REQUEST ERROR]", error.message);

    clientRes.writeHead(400);
    clientRes.end("Invalid proxy request");
  }
}

function handleConnect(req, clientSocket, head) {
  const [hostname, port] = req.url.split(":");
  const targetPort = Number(port) || 443;

  console.log(`[CONNECT] ${hostname}:${targetPort}`);

  if (!isAllowed(hostname)) {
    console.log(`[BLOCKED] ${hostname}`);

    logRequest("HTTPS", hostname, "BLOCKED");

    clientSocket.write(
      "HTTP/1.1 403 Forbidden\r\n" +
        "Connection: close\r\n" +
        "Content-Type: text/plain\r\n" +
        "\r\n" +
        "Access denied by Secure Web Gateway",
    );

    clientSocket.destroy();
    return;
  }

  logRequest("HTTPS", hostname, "ALLOWED");

  const serverSocket = net.connect(targetPort, hostname, () => {
    console.log(`[TUNNEL] Connected to ${hostname}:${targetPort}`);

    clientSocket.write(
      "HTTP/1.1 200 Connection Established\r\n" +
        "\r\n",
    );

    if (head && head.length) {
      serverSocket.write(head);
    }

    const tunnel = {
      clientSocket,
      serverSocket,
    };

    addTunnel(hostname, clientSocket, serverSocket);

    clientSocket.pipe(serverSocket);
    serverSocket.pipe(clientSocket);

    clientSocket.on("error", (error) => {
      console.error(
        `[CLIENT SOCKET ERROR] ${hostname}:${targetPort}`,
        error.message,
      );

      serverSocket.destroy();
    });

    serverSocket.on("error", (error) => {
      console.error(
        `[TUNNEL ERROR] ${hostname}:${targetPort}`,
        error.message,
      );

      clientSocket.destroy();
    });

    clientSocket.on("close", () => {
      removeTunnel(hostname, tunnel);
      serverSocket.destroy();
    });

    serverSocket.on("close", () => {
      removeTunnel(hostname, tunnel);
      clientSocket.destroy();
    });
  });

  serverSocket.on("error", (error) => {
    console.error(
      `[TUNNEL ERROR] ${hostname}:${targetPort}`,
      error.message,
    );

    clientSocket.destroy();
  });
}

/**
 * Terminate active HTTPS tunnels for blocked domains.
 */
function syncBlockedConnections() {
  const blockedDomains = getBlockedDomains();

  let terminatedCount = 0;

  for (const [hostname, tunnels] of activeTunnels.entries()) {
    const shouldBlock = blockedDomains.some(
      (domain) =>
        hostname === domain ||
        hostname.endsWith(`.${domain}`),
    );

    if (!shouldBlock) {
      continue;
    }

    console.log(
      `[SYNC] Terminating ${tunnels.size} tunnel(s) for ${hostname}`,
    );

    for (const tunnel of tunnels) {
      tunnel.clientSocket.destroy();
      tunnel.serverSocket.destroy();
      terminatedCount++;
    }

    activeTunnels.delete(hostname);
  }

  return terminatedCount;
}

module.exports = {
  handleRequest,
  handleConnect,
  syncBlockedConnections,
};