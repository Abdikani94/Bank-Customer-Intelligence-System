function SegmentationResult({ result }) {
  if (!result) {
    return (
      <div className="empty-result">
        Submit customer information to assign a customer segment.
      </div>
    );
  }

  return (
    <div className="result-card cluster-result">
      <p className="result-label">Customer Segment</p>

      <div className="cluster-badge">
        Cluster {result.cluster}
      </div>

      <p className="result-description">
        {result.description}
      </p>
    </div>
  );
}

export default SegmentationResult;