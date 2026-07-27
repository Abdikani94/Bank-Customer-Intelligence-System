import { Info } from "lucide-react";

function ChartCard({ title, description, value, tooltip, children, className = "" }) {
  return (
    <article className={`chart-card ${className}`}>
      <header className="chart-card-header">
        <div>
          <div className="chart-title-row">
            <h2>{title}</h2>
            {tooltip && (
              <span className="info-tooltip" tabIndex="0">
                <Info size={15} aria-label="More information" />
                <span role="tooltip">{tooltip}</span>
              </span>
            )}
          </div>
          <p>{description}</p>
        </div>
        {value && <strong className="chart-summary-value">{value}</strong>}
      </header>
      <div className="chart-card-body">{children}</div>
    </article>
  );
}

export default ChartCard;
