import { useState } from "react";

import PageHeader from "../components/PageHeader";
import PredictionForm from "../components/PredictionForm";
import PredictionResult from "../components/PredictionResult";
import { predictCustomer } from "../services/api";

function Prediction() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePrediction(customerData) {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await predictCustomer(customerData);
      setResult(response);
    } catch (requestError) {
      const detail = requestError.response?.data?.detail;
      const message =
        (typeof detail === "string" ? detail : null) ||
        requestError.message ||
        "Prediction request failed.";
      setError(String(message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <PageHeader
        eyebrow="Supervised learning"
        title="Subscription prediction"
        description="Estimate whether an eligible customer is likely to subscribe to a term deposit before campaign outreach."
      />

      {error && (
        <div className="form-message error page-error" role="alert">
          <strong>Prediction unavailable.</strong>
          <span>{error}</span>
        </div>
      )}

      <div className="decision-layout">
        <article className="form-panel">
          <div className="panel-heading">
            <span>Customer input</span>
            <h2>Build the customer profile</h2>
            <p>All eight fields match the production classification pipeline.</p>
          </div>
          <PredictionForm onSubmit={handlePrediction} loading={loading} />
        </article>

        <aside className="result-panel">
          <div className="panel-heading">
            <span>Decision support</span>
            <h2>Prediction result</h2>
            <p>Random Forest probability and recommended campaign action.</p>
          </div>
          <PredictionResult result={result} loading={loading} />
        </aside>
      </div>
    </section>
  );
}

export default Prediction;
