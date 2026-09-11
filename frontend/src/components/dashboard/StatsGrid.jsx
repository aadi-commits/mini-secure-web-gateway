import "./StatsGrid.css";
import StatCard from "./StatCard";

function StatsGrid({ stats, policyCount }) {
  return (
    <section className="stats">
      <StatCard
        type="blue"
        icon="≋"
        label="TOTAL REQUESTS"
        value={stats.total}
        description="Traffic observed"
      />

      <StatCard
        type="green"
        icon="✓"
        label="ALLOWED"
        value={stats.allowed}
        description="Policy permitted"
      />

      <StatCard
        type="red"
        icon="×"
        label="BLOCKED"
        value={stats.blocked}
        description="Policy denied"
      />

      <StatCard
        type="purple"
        icon="◇"
        label="ACTIVE POLICIES"
        value={policyCount}
        description="Domain rules"
      />
    </section>
  );
}

export default StatsGrid;
