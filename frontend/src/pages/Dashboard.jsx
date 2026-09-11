import "./Dashboard.css";
import StatsGrid from "../components/dashboard/StatsGrid";
import NetworkFlow from "../components/dashboard/NetworkFlow";
import RecentTraffic from "../components/dashboard/RecentTraffic";
import AccessControl from "../components/dashboard/AccessControl";
import TrafficSummary from "../components/dashboard/TrafficSummary";
import ProxyInfo from "../components/dashboard/ProxyInfo";

function Dashboard({
  stats,
  logs,
  proxyOnline,
  allowedPercentage,
  blockedDomains,
}) {
  const blockedPercentage =
    stats.total > 0
      ? Math.round((stats.blocked / stats.total) * 100)
      : 0;

  return (
    <main className="content">
      <StatsGrid
        stats={stats}
        policyCount={blockedDomains.length}
      />

      <NetworkFlow proxyOnline={proxyOnline} />

      <div className="dashboard-grid">
        <RecentTraffic logs={logs} />

        <aside className="right-column">
          <AccessControl blockedDomains={blockedDomains} />

          <TrafficSummary
            allowedPercentage={allowedPercentage}
            blockedPercentage={blockedPercentage}
          />

          <ProxyInfo proxyOnline={proxyOnline} />
        </aside>
      </div>
    </main>
  );
}

export default Dashboard;
