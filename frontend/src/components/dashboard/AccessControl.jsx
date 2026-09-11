import "./AccessControl.css";
import { Link } from "react-router-dom";

function AccessControl({ blockedDomains }) {
  return (
    <section className="panel side-panel">
      <div className="side-header">
        <div>
          <h2>◇ ACCESS CONTROL</h2>
          <span>Blocked domains</span>
        </div>

        <Link to="/policies" className="add-button">
          VIEW
        </Link>
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
  );
}

export default AccessControl;
