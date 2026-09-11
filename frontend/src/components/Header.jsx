import "./Header.css";
function Header({ proxyOnline }) {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="shield">◆</div>

        <div>
          <h1>SECURE WEB GATEWAY</h1>
          <p>NETWORK SECURITY CONSOLE</p>
        </div>
      </div>

      <div
        className={`proxy-online ${
          proxyOnline ? "online" : "offline"
        }`}
      >
        <span className="pulse"></span>

        <div>
          <strong>
            {proxyOnline ? "PROXY ONLINE" : "PROXY OFFLINE"}
          </strong>

          <small>
            {proxyOnline
              ? "127.0.0.1:8080"
              : "Gateway unreachable"}
          </small>
        </div>
      </div>
    </header>
  );
}

export default Header;
