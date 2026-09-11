import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar({ proxyOnline, lastChecked }) {
  return (
    <aside className="sidebar">
      <div className="side-brand">
        <div className="side-logo">◆</div>

        <div>
          <strong>SWG</strong>
          <span>SECURITY</span>
        </div>
      </div>

      <nav className="nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>⌂</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/traffic"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>⌁</span>
          Live Traffic
        </NavLink>

        <NavLink
          to="/policies"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span>◇</span>
          Policies
        </NavLink>
      </nav>

      <div
        className={`service-status ${
          proxyOnline ? "online" : "offline"
        }`}
      >
        <div className="service-indicator">
          <span className="service-dot"></span>
        </div>

        <div>
          <span>PROXY SERVICE</span>
          <strong>{proxyOnline ? "ONLINE" : "OFFLINE"}</strong>
        </div>

        <small>
          {lastChecked
            ? `Last checked ${lastChecked.toLocaleTimeString()}`
            : "Checking gateway..."}
        </small>
      </div>
    </aside>
  );
}

export default Sidebar;
