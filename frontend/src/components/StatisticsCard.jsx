function StatisticsCard({ label, value, description }) {
  return (
    <article className="summary-card">
      <p>{label}</p>
      <h2>{value}</h2>
      <span>{description}</span>
    </article>
  );
}

export default StatisticsCard;