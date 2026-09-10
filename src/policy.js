const blockedDomains = ["facebook.com", "instagram.com", "example-blocked.com"];

function isAllowed(hostname) {
  const host = hostname.toLowerCase();

  return !blockedDomains.some(
    (domain) => host === domain || host.endsWith(`.${domain}`),
  );
}

module.exports = {
  isAllowed,
};
