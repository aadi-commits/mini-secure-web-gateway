const fs = require("fs");
const path = require("path");
const express = require("express");

const router = express.Router();

const logFile = path.join(__dirname, "../logs/proxy.log");

function getLogs() {
  if (!fs.existsSync(logFile)) {
    return [];
  }

  const content = fs.readFileSync(logFile, "utf-8");

  return content
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [timestamp, protocol, hostname, status] = line.split(" | ");

      return {
        timestamp,
        protocol,
        hostname,
        status,
      };
    });
}

router.get("/logs", (req, res) => {
  res.json(getLogs());
});

router.get("/stats", (req, res) => {
  const logs = getLogs();

  const allowed = logs.filter((log) => log.status === "ALLOWED").length;

  const blocked = logs.filter((log) => log.status === "BLOCKED").length;

  res.json({
    total: logs.length,
    allowed,
    blocked,
  });
});

module.exports = router;
