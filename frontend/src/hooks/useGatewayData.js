import { useEffect, useState } from "react";
import {
  getGatewayLogs,
  getGatewayStats,
  getPolicies,
} from "../services/api";

function useGatewayData() {
  const [stats, setStats] = useState({
    total: 0,
    allowed: 0,
    blocked: 0,
  });

  const [logs, setLogs] = useState([]);
  const [blockedDomains, setBlockedDomains] = useState([]);
  const [proxyOnline, setProxyOnline] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);

  const fetchData = async () => {
    try {
      const [statsData, logsData, policiesData] = await Promise.all([
        getGatewayStats(),
        getGatewayLogs(),
        getPolicies(),
      ]);

      setStats(statsData);
      setLogs([...logsData].reverse());
      setBlockedDomains(policiesData.blockedDomains || []);
      setProxyOnline(true);
      setLastChecked(new Date());
    } catch (error) {
      console.error("Gateway health check failed:", error);
      setProxyOnline(false);
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  const allowedPercentage =
    stats.total > 0
      ? Math.round((stats.allowed / stats.total) * 100)
      : 0;

  return {
    stats,
    logs,
    blockedDomains,
    proxyOnline,
    lastChecked,
    allowedPercentage,
  };
}

export default useGatewayData;
