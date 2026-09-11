import "./Policies.css";
import { useEffect, useState } from "react";
import PolicyCard from "../components/policies/PolicyCard";
import {
  getPolicies,
  addPolicy,
  deletePolicy,
  syncPolicies,
} from "../services/api";

function Policies() {
  const [blockedDomains, setBlockedDomains] = useState([]);
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load policies from backend
  async function loadPolicies() {
    try {
      setLoading(true);
      setError("");

      const data = await getPolicies();

      setBlockedDomains(data.blockedDomains);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPolicies();
  }, []);

  // Add a new policy
  async function handleAddPolicy() {
    const trimmedDomain = domain.trim().toLowerCase();

    if (!trimmedDomain) {
      setError("Please enter a domain.");
      return;
    }

    try {
      setError("");
      setSuccess("");

      await addPolicy(trimmedDomain);

      setDomain("");
      setSuccess(`${trimmedDomain} has been blocked.`);

      await loadPolicies();
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete a policy
  async function handleDeletePolicy(domainToDelete) {
    try {
      setError("");
      setSuccess("");

      await deletePolicy(domainToDelete);

      setSuccess(`${domainToDelete} has been unblocked.`);

      await loadPolicies();
    } catch (err) {
      setError(err.message);
    }
  }

  // Sync policies with active gateway connections
  async function handleSyncPolicies() {
    try {
      setSyncing(true);
      setError("");
      setSuccess("");

      const data = await syncPolicies();

      setSuccess(
        `Policies synchronized successfully. ${data.terminatedConnections} active connection(s) terminated.`,
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setSyncing(false);
    }
  }

  return (
    <main className="content page-content">
      <div className="page-heading">
        <div>
          <h2>ACCESS POLICIES</h2>
          <p>
            Domain rules used by the gateway to allow or block
            web traffic.
          </p>
        </div>

        <div className="policy-actions">
          <button
            className="secondary-action"
            type="button"
            onClick={handleSyncPolicies}
            disabled={syncing}
          >
            {syncing ? "SYNCING..." : "SYNC POLICIES"}
          </button>

          <button
            className="primary-action"
            type="button"
            onClick={() => {
              const input = document.getElementById("policy-domain");

              input?.focus();
            }}
          >
            + Add Rule
          </button>
        </div>
      </div>

      {/* Add Policy */}
      <section className="panel policy-form-panel">
        <div className="policies-header">
          <div>
            <h3>ADD BLOCK RULE</h3>
            <span>
              Add a domain that should be blocked by the gateway.
            </span>
          </div>

          <span className="policy-mode">
            DOMAIN BASED
          </span>
        </div>

        <div className="policy-form">
          <input
            id="policy-domain"
            type="text"
            placeholder="e.g. youtube.com"
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAddPolicy();
              }
            }}
          />

          <button
            className="primary-action"
            type="button"
            onClick={handleAddPolicy}
          >
            BLOCK DOMAIN
          </button>
        </div>

        {error && (
          <div className="policy-message policy-error">
            {error}
          </div>
        )}

        {success && (
          <div className="policy-message policy-success">
            {success}
          </div>
        )}
      </section>

      {/* Existing Policies */}
      <section className="panel policies-panel">
        <div className="policies-header">
          <div>
            <h3>BLOCKED DOMAINS</h3>

            <span>
              {loading
                ? "Loading policies..."
                : `${blockedDomains.length} active domain rules`}
            </span>
          </div>

          <span className="policy-mode">
            DOMAIN BASED
          </span>
        </div>

        <div className="policy-cards">
          {loading ? (
            <p className="policy-empty">
              Loading blocked domains...
            </p>
          ) : blockedDomains.length === 0 ? (
            <p className="policy-empty">
              No blocked domains configured.
            </p>
          ) : (
            blockedDomains.map((domain) => (
              <PolicyCard
                key={domain}
                domain={domain}
                onDelete={handleDeletePolicy}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Policies;