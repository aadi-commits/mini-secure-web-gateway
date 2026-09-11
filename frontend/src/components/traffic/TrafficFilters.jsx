import "./TrafficFilters.css";
function TrafficFilters({
  search,
  setSearch,
  protocol,
  setProtocol,
  status,
  setStatus,
}) {
  return (
    <div className="traffic-filters">
      <input
        type="text"
        placeholder="Search destination..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select
        value={protocol}
        onChange={(event) => setProtocol(event.target.value)}
      >
        <option value="ALL">All Protocols</option>
        <option value="HTTP">HTTP</option>
        <option value="HTTPS">HTTPS</option>
      </select>

      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="ALL">All Status</option>
        <option value="ALLOWED">Allowed</option>
        <option value="BLOCKED">Blocked</option>
      </select>
    </div>
  );
}

export default TrafficFilters;
