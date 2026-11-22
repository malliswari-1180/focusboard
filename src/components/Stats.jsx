export default function Stats({ stats }) {
  const items = [
    { label: 'Total tasks', value: stats.total },
    { label: 'In progress', value: stats.inProgress },
    { label: 'Completed', value: stats.completed },
    { label: 'Completion', value: `${stats.percent}%` },
  ];
  return (
    <section aria-label="Overview" className="stats">
      {items.map((s) => (
        <div className="card stat" key={s.label}>
          <p className="stat-label">{s.label}</p>
          <p className="stat-value">{s.value}</p>
        </div>
      ))}
      <div className="progress" role="progressbar" aria-label="Completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={stats.percent}>
        <span style={{ width: `${stats.percent}%` }} />
      </div>
    </section>
  );
}
