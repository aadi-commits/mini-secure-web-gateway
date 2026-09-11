import "./LiveTraffic.css";
import { useMemo, useState } from "react";
import TrafficFilters from "../components/traffic/TrafficFilters";
import TrafficTable from "../components/traffic/TrafficTable";

function LiveTraffic({ logs, proxyOnline }) {
  const [search, setSearch] = useState("");
  const [protocol, setProtocol] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesSearch =
        !query ||
        String(log.hostname || "")
          .toLowerCase()
          .includes(query);

      const matchesProtocol =
        protocol === "ALL" || log.protocol === protocol;

      const matchesStatus =
        status === "ALL" || log.status === status;

      return (
        matchesSearch &&
        matchesProtocol &&
        matchesStatus
      );
    });
  }, [logs, search, protocol, status]);

  return (
    <main className="content page-content">
      <div className="page-heading">
        <div>
          <h2>LIVE TRAFFIC</h2>
          <p>
            Monitor requests currently observed by the secure
            web gateway.
          </p>
        </div>

        <div
          className={`page-status ${
            proxyOnline ? "online" : "offline"
          }`}
        >
          ● {proxyOnline ? "GATEWAY ONLINE" : "GATEWAY OFFLINE"}
        </div>
      </div>

      <section className="panel full-traffic-panel">
        <div className="full-traffic-header">
          <div>
            <h3>TRAFFIC LOG</h3>
            <span>AUTO REFRESH 3s</span>
          </div>

          <TrafficFilters
            search={search}
            setSearch={setSearch}
            protocol={protocol}
            setProtocol={setProtocol}
            status={status}
            setStatus={setStatus}
          />
        </div>

        <TrafficTable logs={filteredLogs} />
      </section>
    </main>
  );
}

export default LiveTraffic;
