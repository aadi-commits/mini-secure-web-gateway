const fs = require("fs");
const path = require("path");

const policyFile = path.join(__dirname, "../data/policies.json");

function getPolicies() {
  if (!fs.existsSync(policyFile)) {
    return {
      blockedDomains: [],
    };
  }

  return JSON.parse(fs.readFileSync(policyFile, "utf-8"));
}

function savePolicies(policies) {
  fs.writeFileSync(
    policyFile,
    JSON.stringify(policies, null, 2),
    "utf-8",
  );
}

function getBlockedDomains() {
  return getPolicies().blockedDomains;
}

function normalizeDomain(domain) {
  if (typeof domain !== "string") {
    throw new Error("Domain is required");
  }

  let value = domain.trim().toLowerCase();

  if (!value) {
    throw new Error("Domain is required");
  }

  // Remove protocol
  value = value.replace(/^https?:\/\//, "");

  // Remove path
  value = value.split("/")[0];

  // Remove port
  value = value.split(":")[0];

  // Remove www prefix
  value = value.replace(/^www\./, "");

  // Remove trailing dot
  value = value.replace(/\.$/, "");

  // Basic domain validation
  if (
    !value.includes(".") ||
    value.startsWith(".") ||
    value.endsWith(".")
  ) {
    throw new Error("Please enter a valid domain");
  }

  return value;
}

function isAllowed(hostname) {
  const host = hostname.toLowerCase();

  const blockedDomains = getBlockedDomains();

  return !blockedDomains.some(
    (domain) =>
      host === domain ||
      host.endsWith(`.${domain}`),
  );
}

function addBlockedDomain(domain) {
  const policies = getPolicies();

  const normalizedDomain = normalizeDomain(domain);

  if (policies.blockedDomains.includes(normalizedDomain)) {
    throw new Error("Domain already blocked");
  }

  policies.blockedDomains.push(normalizedDomain);

  savePolicies(policies);

  return normalizedDomain;
}

function removeBlockedDomain(domain) {
  const policies = getPolicies();

  const normalizedDomain = normalizeDomain(domain);

  const index = policies.blockedDomains.indexOf(normalizedDomain);

  if (index === -1) {
    throw new Error("Domain not found");
  }

  policies.blockedDomains.splice(index, 1);

  savePolicies(policies);

  return normalizedDomain;
}

module.exports = {
  isAllowed,
  getBlockedDomains,
  addBlockedDomain,
  removeBlockedDomain,
};