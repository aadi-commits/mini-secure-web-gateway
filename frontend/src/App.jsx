import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import LiveTraffic from "./pages/LiveTraffic";
import Policies from "./pages/Policies";
import useGatewayData from "./hooks/useGatewayData";
import "./styles/global.css";

function App() {
  const {
    stats,
    logs,
    blockedDomains,
    proxyOnline,
    lastChecked,
    allowedPercentage,
  } = useGatewayData();

  return (
    <div className="app">
      <Sidebar
        proxyOnline={proxyOnline}
        lastChecked={lastChecked}
      />

      <div className="main">
        <Header proxyOnline={proxyOnline} />

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                stats={stats}
                logs={logs}
                blockedDomains={blockedDomains}
                proxyOnline={proxyOnline}
                allowedPercentage={allowedPercentage}
              />
            }
          />

          <Route
            path="/traffic"
            element={
              <LiveTraffic
                logs={logs}
                proxyOnline={proxyOnline}
              />
            }
          />

          <Route
            path="/policies"
            element={<Policies />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
