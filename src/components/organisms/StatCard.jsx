export default function StatCard({ label, value, icon, tone }) {
  return (
    <article className="stat-card">
      <span className={`stat-icon ${tone}`} aria-hidden="true">{icon}</span>
      <div><p>{label}</p><strong>{value ?? '—'}</strong></div>
    </article>
  );
}
