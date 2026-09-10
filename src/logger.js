const fs = require("fs");
const path = require("path");

const logDirectory = path.join(__dirname, "../logs");
const logFile = path.join(logDirectory, "proxy.log");

function logRequest(protocol, hostname, status) {
  const timestamp = new Date().toISOString();

  const logLine = `${timestamp} | ${protocol} | ${hostname} | ${status}\n`;

  fs.appendFileSync(logFile, logLine);
}

module.exports = {
  logRequest,
};
