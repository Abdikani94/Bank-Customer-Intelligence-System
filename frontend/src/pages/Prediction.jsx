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
      const message =
        requestError.response?.data?.detail ||
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
        title="Customer Prediction"
        description="Predict whether a customer will subscribe to a term deposit."
      />

      {error && <div className="form-message error">{error}</div>}

      <div className="feature-layout">
        <div className="page-panel no-top-margin">
          <div className="panel-heading">
            <h2>Customer Information</h2>
            <p>Enter the same features expected by the classification API.</p>
          </div>

          <PredictionForm
            onSubmit={handlePrediction}
            loading={loading}
          />
        </div>

        <div className="page-panel no-top-margin">
          <div className="panel-heading">
            <h2>Prediction Result</h2>
            <p>The model returns Yes or No with a probability score.</p>
          </div>

          <PredictionResult result={result} />
        </div>
      </div>
    </section>
  );
}

export default Prediction;