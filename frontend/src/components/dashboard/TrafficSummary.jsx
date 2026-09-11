import "./TrafficSummary.css";
function TrafficSummary({
  allowedPercentage,
  blockedPercentage,
}) {
  return (
    <section className="panel side-panel">
      <div className="side-title">
        <span className="side-symbol">▥</span>

        <div>
          <h2>TRAFFIC SUMMARY</h2>
          <span>Current proxy activity</span>
        </div>
      </div>

      <div className="summary-bar">
        <div
          className="summary-allowed"
          style={{ width: `${allowedPercentage}%` }}
        ></div>
      </div>

      <div className="summary-values">
        <div>
          <span>Allowed</span>
          <strong className="green">
            {allowedPercentage}%
          </strong>
        </div>

        <div>
          <span>Blocked</span>
          <strong className="red">
            {blockedPercentage}%
          </strong>
        </div>
      </div>
    </section>
  );
}

export default TrafficSummary;
