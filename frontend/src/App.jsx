import { useEffect, useState } from "react";
import "./App.css";

const API = "http://127.0.0.1:8080/api";

const blockedDomains = ["facebook.com", "instagram.com", "example-blocked.com"];

function App() {
  const [stats, setStats] = useState({
    total: 0,
    allowed: 0,
    blocked: 0,
  });

  const [logs, setLogs] = useState([]);

  const fetchData = async () => {
    try {
      const statsResponse = await fetch(`${API}/stats`);
      console.log("Stats response:", statsResponse.status);

      const statsData = await statsResponse.json();
      console.log("Stats data:", statsData);

      setStats(statsData);

      const logsResponse = await fetch(`${API}/logs`);
      console.log("Logs response:", logsResponse.status);

      const logsData = await logsResponse.json();
      console.log("Logs data:", logsData);

      setLogs([...logsData].reverse());
    } catch (error) {
      console.error("Dashboard API error:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  const allowedPercentage =
    stats.total > 0 ? Math.round((stats.allowed / stats.total) * 100) : 0;

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="side-brand">
          <div className="side-logo">◆</div>

          <div>
            <strong>SWG</strong>
            <span>SECURITY</span>
          </div>
        </div>

        <nav className="nav">
          <div className="nav-item active">
            <span>⌂</span>
            Dashboard
          </div>

          <div className="nav-item">
            <span>⌁</span>
            Live Traffic
          </div>

          <div className="nav-item">
            <span>◇</span>
            Policies
          </div>

          <div className="nav-item">
            <span>▥</span>
            Analytics
          </div>

          <div className="nav-item">
            <span>⚙</span>
            Settings
          </div>
        </nav>

        <div className="service-status">
          <div className="service-dot"></div>

          <div>
            <span>PROXY SERVICE</span>
            <strong>RUNNING</strong>
          </div>

          <small>Node.js Gateway v1.0.0</small>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main">
        {/* HEADER */}
        <header className="header">
          <div className="header-brand">
            <div className="shield">◆</div>

            <div>
              <h1>SECURE WEB GATEWAY</h1>
              <p>NETWORK SECURITY CONSOLE</p>
            </div>
          </div>

          <div className="header-right">
            <div className="date">
              <span>
                {new Date().toLocaleDateString(undefined, {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              <strong>{new Date().toLocaleTimeString()}</strong>
            </div>

            <div className="proxy-online">
              <span className="pulse"></span>

              <div>
                <strong>PROXY ONLINE</strong>
                <small>127.0.0.1:8080</small>
              </div>
            </div>

            <div className="admin">
              <div>A</div>
              <span>Admin</span>
            </div>
          </div>
        </header>

        <main className="content">
          {/* TOPOLOGY */}
          <section className="panel topology-panel">
            <div className="panel-header">
              <div className="title-group">
                <h2>NETWORK TOPOLOGY</h2>

                <span className="live">● LIVE</span>
              </div>

              <span className="traffic-flow">TRAFFIC FLOW »»</span>
            </div>

            <div className="topology">
              <div className="node">
                <div className="node-icon">▱</div>
                <strong>CLIENT</strong>
                <span>Browser / User</span>
              </div>

              <div className="connection">
                <span>HTTP / HTTPS</span>

                <div className="flow-line">
                  <i></i>
                </div>

                <small>REQUESTS</small>
              </div>

              <div className="node gateway">
                <div className="gateway-glow">◆</div>

                <strong>SECURE GATEWAY</strong>
                <span>:8080</span>
              </div>

              <div className="connection">
                <span>FILTERED</span>

                <div className="flow-line">
                  <i></i>
                </div>

                <small>TRAFFIC</small>
              </div>

              <div className="node">
                <div className="node-icon">◎</div>

                <strong>INTERNET</strong>
                <span>External Sites</span>
              </div>
            </div>
          </section>

          <div className="dashboard-grid">
            {/* CENTER */}
            <div className="center">
              {/* STATS */}
              <section className="stats">
                <div className="stat">
                  <div className="stat-icon blue">≋</div>

                  <div>
                    <span>TOTAL REQUESTS</span>
                    <strong>{stats.total}</strong>
                    <small>Traffic observed</small>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-icon green">✓</div>

                  <div>
                    <span>ALLOWED</span>
                    <strong className="green">{stats.allowed}</strong>
                    <small>Policy permitted</small>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-icon red">×</div>

                  <div>
                    <span>BLOCKED</span>
                    <strong className="red">{stats.blocked}</strong>
                    <small>Policy denied</small>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-icon purple">◇</div>

                  <div>
                    <span>ACTIVE POLICIES</span>
                    <strong>{blockedDomains.length}</strong>
                    <small>Domain rules</small>
                  </div>
                </div>
              </section>

              {/* LIVE TRAFFIC */}
              <section className="panel traffic-panel">
                <div className="traffic-heading">
                  <div>
                    <h2>LIVE TRAFFIC</h2>

                    <span>Real-time request logs from the proxy</span>
                  </div>

                  <span className="refresh">AUTO REFRESH 3s</span>
                </div>

                <div className="table-header">
                  <span>TIME</span>
                  <span>PROTOCOL</span>
                  <span>DESTINATION</span>
                  <span>STATUS</span>
                  <span>TYPE</span>
                </div>

                <div className="traffic-list">
                  {logs.length === 0 ? (
                    <div className="empty">Waiting for network traffic...</div>
                  ) : (
                    logs.slice(0, 15).map((log, index) => (
                      <div className="traffic-row" key={index}>
                        <span>
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>

                        <span className="protocol">{log.protocol}</span>

                        <span className="destination">{log.hostname}</span>

                        <span
                          className={
                            log.status === "BLOCKED"
                              ? "status blocked"
                              : "status allowed"
                          }
                        >
                          ● {log.status}
                        </span>

                        <span className="request-type">
                          {log.protocol === "HTTPS" ? "CONNECT" : "HTTP"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>

            {/* RIGHT PANEL */}
            <aside className="right-column">
              {/* ACCESS CONTROL */}
              <section className="panel side-panel">
                <div className="side-header">
                  <div>
                    <h2>♢ ACCESS CONTROL</h2>
                    <span>Manage blocked domains</span>
                  </div>

                  <button className="add-button">+ Add</button>
                </div>

                <div className="policy-list">
                  {blockedDomains.map((domain) => (
                    <div className="policy" key={domain}>
                      <span className="blocked-circle">−</span>

                      <span>{domain}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ACTIVITY */}
              <section className="panel side-panel">
                <div className="side-title">
                  <span className="side-symbol">▥</span>

                  <div>
                    <h2>ACTIVITY SUMMARY</h2>
                    <span>Current traffic</span>
                  </div>
                </div>

                <div className="activity">
                  <div
                    className="donut"
                    style={{
                      background: `conic-gradient(
                        #35e890 ${allowedPercentage}%,
                        #ff5363 ${allowedPercentage}% 100%
                      )`,
                    }}
                  >
                    <div>
                      <strong>{allowedPercentage}%</strong>

                      <span>Allowed</span>
                    </div>
                  </div>

                  <div className="legend">
                    <div>
                      <i className="green-dot"></i>
                      <span>Allowed</span>
                      <strong>{stats.allowed}</strong>
                    </div>

                    <div>
                      <i className="red-dot"></i>
                      <span>Blocked</span>
                      <strong>{stats.blocked}</strong>
                    </div>

                    <div>
                      <i className="blue-dot"></i>
                      <span>Total</span>
                      <strong>{stats.total}</strong>
                    </div>
                  </div>
                </div>
              </section>

              {/* QUICK ACTIONS */}
              <section className="panel side-panel">
                <h2 className="quick-title">⚡ QUICK ACTIONS</h2>

                <div className="actions">
                  <button>
                    ↗<span>View Logs</span>
                  </button>

                  <button>
                    ↓<span>Export</span>
                  </button>

                  <button>
                    ⌫<span>Clear</span>
                  </button>
                </div>
              </section>

              {/* SYSTEM INFO */}
              <section className="panel side-panel">
                <h2 className="system-title">ⓘ SYSTEM INFO</h2>

                <div className="system-info">
                  <div>
                    <span>Proxy Port</span>
                    <strong>: 8080</strong>
                  </div>

                  <div>
                    <span>Protocol</span>
                    <strong>HTTP / HTTPS</strong>
                  </div>

                  <div>
                    <span>Environment</span>
                    <strong>Development</strong>
                  </div>

                  <div>
                    <span>Total Requests</span>
                    <strong>{stats.total}</strong>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
