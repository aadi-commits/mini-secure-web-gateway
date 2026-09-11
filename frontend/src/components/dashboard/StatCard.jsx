function StatCard({ type, icon, label, value, description }) {
  return (
    <div className="stat">
      <div className={`stat-icon ${type}`}>{icon}</div>

      <div>
        <span>{label}</span>

        <strong
          className={
            type === "green" || type === "red"
              ? type
              : ""
          }
        >
          {value}
        </strong>

        <small>{description}</small>
      </div>
    </div>
  );
}

export default StatCard;
