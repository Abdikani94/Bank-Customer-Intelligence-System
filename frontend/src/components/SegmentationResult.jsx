import { ArrowRight, Network, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

function SegmentationResult({ result, loading }) {
  if (loading) {
    return (
      <div className="result-skeleton" aria-label="Assigning customer segment">
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="empty-result">
        <span className="empty-result-icon teal">
          <Network size={27} aria-hidden="true" />
        </span>
        <h3>Segment not assigned</h3>
        <p>Submit a customer profile to identify the closest behavioral segment.</p>
      </div>
    );
  }

  const highBalance = Number(result.cluster) === 1;

  return (
    <div className="result-card cluster-result">
      <div className="result-hero">
        <span className="result-icon teal">
          <UsersRound size={24} aria-hidden="true" />
        </span>
        <div>
          <p className="result-label">Assigned customer segment</p>
          <h2>Cluster {result.cluster}</h2>
        </div>
      </div>

      <span className="segment-type">
        {highBalance ? "High-balance professional" : "Core retail customer"}
      </span>

      <div className="result-explanation">
        <strong>Segment profile</strong>
        <p>{result.description}</p>
      </div>

      <div className="segment-facts">
        <div>
          <span>Strategy</span>
          <strong>{highBalance ? "Premium offers" : "Value-led offers"}</strong>
        </div>
        <div>
          <span>Outreach</span>
          <strong>{highBalance ? "Relationship-led" : "Digital-first"}</strong>
        </div>
      </div>

      <Link className="result-action" to="/analytics">
        Review model analytics
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default SegmentationResult;
