import "./NetworkFlow.css";
function NetworkFlow({ proxyOnline }) {
  return (
    <section
      className={`panel topology-panel ${
        proxyOnline ? "gateway-online" : "gateway-offline"
      }`}
    >
      <div className="panel-header">
        <div className="title-group">
          <h2>NETWORK FLOW</h2>

          <span
            className={`live ${
              proxyOnline ? "" : "offline-badge"
            }`}
          >
            ● {proxyOnline ? "LIVE" : "OFFLINE"}
          </span>
        </div>

        <span className="traffic-flow">HTTP / HTTPS</span>
      </div>

      <div className="topology">
        <div className="node">
          <div className="node-icon">▱</div>
          <strong>BROWSER</strong>
          <span>Client / User</span>
        </div>

        <div className="connection">
          <span>REQUEST</span>
          <div className="flow-line"><i></i></div>
          <small>TRAFFIC</small>
        </div>

        <div className="node gateway">
          <div className="gateway-glow">◆</div>
          <strong>SECURE GATEWAY</strong>
          <span>:8080</span>
        </div>

        <div className="connection">
          <span>FILTERED</span>
          <div className="flow-line"><i></i></div>
          <small>ALLOWED / BLOCKED</small>
        </div>

        <div className="node">
          <div className="node-icon">◎</div>
          <strong>INTERNET</strong>
          <span>External Sites</span>
        </div>
      </div>

      <div className="gateway-features">
        <span>✓ Domain Policy</span>
        <span>✓ HTTPS CONNECT</span>
        <span>✓ Traffic Logging</span>
        <span>
          {proxyOnline
            ? "✓ Gateway Reachable"
            : "✕ Gateway Unreachable"}
        </span>
      </div>
    </section>
  );
}

export default NetworkFlow;
