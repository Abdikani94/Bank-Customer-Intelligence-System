function AnalyticsChart({ title, description, children }) {
  return (
    <article className="analytics-card">
      <div className="analytics-card-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="analytics-content">{children}</div>
    </article>
  );
}

export default AnalyticsChart;