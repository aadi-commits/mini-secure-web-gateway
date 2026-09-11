const fs = require("fs");
const path = require("path");
const express = require("express");

const {
  getBlockedDomains,
  addBlockedDomain,
  removeBlockedDomain,
} = require("./policy");

const { syncBlockedConnections } = require("./proxy");

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

// Get current blocked domains
router.get("/policies", (req, res) => {
  res.json({
    blockedDomains: getBlockedDomains(),
  });
});

// Add a blocked domain
router.post("/policies", (req, res) => {
  try {
    const { domain } = req.body;

    const addedDomain = addBlockedDomain(domain);

    res.status(201).json({
      message: "Domain blocked successfully",
      domain: addedDomain,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.post("/policies/sync", (req, res) => {
  try {
    const terminatedConnections = syncBlockedConnections();

    res.json({
      message: "Policies synchronized successfully",
      terminatedConnections,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Remove a blocked domain
router.delete("/policies/:domain", (req, res) => {
  try {
    const removedDomain = removeBlockedDomain(req.params.domain);

    res.json({
      message: "Domain unblocked successfully",
      domain: removedDomain,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
});

module.exports = router;