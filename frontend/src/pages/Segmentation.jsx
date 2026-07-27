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
      const detail = requestError.response?.data?.detail;
      const message =
        (typeof detail === "string" ? detail : null) ||
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
        eyebrow="Unsupervised learning"
        title="Customer segmentation"
        description="Assign a customer to the closest production segment and reveal an actionable profile for targeted engagement."
      />

      {error && (
        <div className="form-message error page-error" role="alert">
          <strong>Segmentation unavailable.</strong>
          <span>{error}</span>
        </div>
      )}

      <div className="decision-layout">
        <article className="form-panel">
          <div className="panel-heading">
            <span>Customer input</span>
            <h2>Build the customer profile</h2>
            <p>The same production-safe fields are used for K-Means assignment.</p>
          </div>
          <SegmentationForm onSubmit={handleSegmentation} loading={loading} />
        </article>

        <aside className="result-panel">
          <div className="panel-heading">
            <span>Segment intelligence</span>
            <h2>Customer segment</h2>
            <p>Cluster identity, profile explanation, and engagement strategy.</p>
          </div>
          <SegmentationResult result={result} loading={loading} />
        </aside>
      </div>
    </section>
  );
}

export default Segmentation;
