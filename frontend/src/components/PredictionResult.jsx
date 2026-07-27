import { ArrowRight, BrainCircuit, CheckCircle2, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

function PredictionResult({ result, loading }) {
  if (loading) {
    return (
      <div className="result-skeleton" aria-label="Generating prediction">
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
        <span className="empty-result-icon">
          <BrainCircuit size={27} aria-hidden="true" />
        </span>
        <h3>Ready for analysis</h3>
        <p>Complete the customer profile to generate a subscription prediction.</p>
      </div>
    );
  }

  const probability = Number(result.probability || 0);
  const percentage = Math.round(probability * 100);
  const positive = result.prediction?.toLowerCase() === "yes";
  const ResultIcon = positive ? CheckCircle2 : ShieldAlert;

  return (
    <div className={`result-card ${positive ? "positive" : "negative"}`}>
      <div className="result-hero">
        <span className="result-icon">
          <ResultIcon size={24} aria-hidden="true" />
        </span>
        <div>
          <p className="result-label">Subscription outcome</p>
          <h2>{positive ? "Likely to subscribe" : "Unlikely to subscribe"}</h2>
        </div>
      </div>

      <div className="confidence-block">
        <div className="probability-row">
          <span>Positive-class probability</span>
          <strong>{percentage}%</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className="progress-value" style={{ width: `${percentage}%` }} />
        </div>
        <div className="confidence-scale">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      <div className="result-explanation">
        <strong>Recommended action</strong>
        <p>
          {positive
            ? "Prioritize this customer for a focused term-deposit conversation."
            : "Use a lower-cost nurture channel before direct campaign outreach."}
        </p>
      </div>

      <Link className="result-action" to="/segmentation">
        Segment this customer
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default PredictionResult;
