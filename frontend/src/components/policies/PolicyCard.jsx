import "./PolicyCard.css";
function PolicyCard({ domain, onDelete }) {
  return (
    <div className="policy-card">
      <div className="policy-card-icon">−</div>

      <div className="policy-card-main">
        <strong>{domain}</strong>
        <span>Domain access rule</span>
      </div>

      <div className="policy-card-status">
        ● BLOCKED
      </div>

      <button
        className="policy-delete"
        type="button"
        onClick={() => onDelete(domain)}
      >
        DELETE
      </button>
    </div>
  );
}

export default PolicyCard;