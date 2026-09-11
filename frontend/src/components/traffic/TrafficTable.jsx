import "./TrafficTable.css";
function TrafficTable({ logs }) {
  return (
    <div className="full-traffic-table">
      <div className="table-header">
        <span>TIME</span>
        <span>PROTOCOL</span>
        <span>DESTINATION</span>
        <span>STATUS</span>
      </div>

      <div className="traffic-list">
        {logs.length === 0 ? (
          <div className="empty">
            No traffic matches the current filters.
          </div>
        ) : (
          logs.map((log, index) => (
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
    </div>
  );
}

export default TrafficTable;
