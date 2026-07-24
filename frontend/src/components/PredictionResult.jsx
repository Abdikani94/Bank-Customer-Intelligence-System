function PredictionResult({ result }) {
  if (!result) {
    return (
      <div className="empty-result">
        Submit customer information to receive a prediction.
      </div>
    );
  }

  const probability = Number(result.probability || 0);
  const percentage = Math.round(probability * 100);
  const positive = result.prediction?.toLowerCase() === "yes";

  return (
    <div className={`result-card ${positive ? "positive" : "negative"}`}>
      <p className="result-label">Prediction</p>
      <h2>{result.prediction}</h2>

      <div className="probability-row">
        <span>Probability</span>
        <strong>{percentage}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-value"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="result-description">
        {positive
          ? "This customer is likely to subscribe to the term deposit."
          : "This customer is unlikely to subscribe to the term deposit."}
      </p>
    </div>
  );
}

export default PredictionResult;