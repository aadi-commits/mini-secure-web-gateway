import "./RecentTraffic.css";
import { Link } from "react-router-dom";

function RecentTraffic({ logs }) {
  return (
    <section className="panel traffic-panel">
      <div className="traffic-heading">
        <div>
          <h2>RECENT TRAFFIC</h2>
          <span>Latest requests observed by the proxy</span>
        </div>

        <Link to="/traffic" className="view-all">
          VIEW ALL →
        </Link>
      </div>

      <div className="table-header">
        <span>TIME</span>
        <span>PROTOCOL</span>
        <span>DESTINATION</span>
        <span>STATUS</span>
      </div>

      <div className="traffic-list">
        {logs.length === 0 ? (
          <div className="empty">
            Waiting for network traffic...
          </div>
        ) : (
          logs.slice(0, 5).map((log, index) => (
            <div
              className="traffic-row"
              key={`${log.timestamp}-${index}`}
            >
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
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RecentTraffic;
