import "./ProxyInfo.css";
function ProxyInfo({ proxyOnline }) {
  return (
    <section className="panel side-panel">
      <h2 className="system-title">ⓘ PROXY INFO</h2>

      <div className="system-info">
        <div>
          <span>Proxy Address</span>
          <strong>127.0.0.1:8080</strong>
        </div>

        <div>
          <span>Protocol</span>
          <strong>HTTP / HTTPS</strong>
        </div>

        <div>
          <span>Policy Engine</span>
          <strong>Domain Based</strong>
        </div>

        <div>
          <span>Logging</span>
          <strong>Enabled</strong>
        </div>

        <div>
          <span>Gateway Status</span>
          <strong className={proxyOnline ? "green" : "red"}>
            {proxyOnline ? "Reachable" : "Unreachable"}
          </strong>
        </div>
      </div>
    </section>
  );
}

export default ProxyInfo;
