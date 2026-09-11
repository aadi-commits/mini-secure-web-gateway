const API = "http://127.0.0.1:8080/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API}${endpoint}`, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(
      error.error || `API request failed: ${response.status}`,
    );
  }

  return response.json();
}

export function getGatewayStats() {
  return request("/stats");
}

export function getGatewayLogs() {
  return request("/logs");
}

export function getPolicies() {
  return request("/policies");
}

export function addPolicy(domain) {
  return request("/policies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      domain,
    }),
  });
}

export function syncPolicies() {
  return request("/policies/sync", {
    method: "POST",
  });
}

export function deletePolicy(domain) {
  return request(`/policies/${encodeURIComponent(domain)}`, {
    method: "DELETE",
  });
}