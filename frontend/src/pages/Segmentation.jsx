import { useState } from "react";

import PageHeader from "../components/PageHeader";
import SegmentationForm from "../components/SegmentationForm";
import SegmentationResult from "../components/SegmentationResult";

import { segmentCustomer } from "../services/api";

function Segmentation() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSegmentation(customerData) {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await segmentCustomer(customerData);
      setResult(response);
    } catch (requestError) {
      const message =
        requestError.response?.data?.detail ||
        requestError.message ||
        "Segmentation request failed.";

      setError(String(message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <PageHeader
        title="Customer Segmentation"
        description="Assign a customer to Cluster 0 or Cluster 1."
      />

      {error && <div className="form-message error">{error}</div>}

      <div className="feature-layout">
        <div className="page-panel no-top-margin">
          <div className="panel-heading">
            <h2>Customer Information</h2>
            <p>Enter the features used by the K-Means clustering model.</p>
          </div>

          <SegmentationForm
            onSubmit={handleSegmentation}
            loading={loading}
          />
        </div>

        <div className="page-panel no-top-margin">
          <div className="panel-heading">
            <h2>Segmentation Result</h2>
            <p>The model assigns the customer to one of two clusters.</p>
          </div>

          <SegmentationResult result={result} />
        </div>
      </div>
    </section>
  );
}

export default Segmentation;