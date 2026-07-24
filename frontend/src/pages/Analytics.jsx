import PageHeader from "../components/PageHeader";
import StatisticsCard from "../components/StatisticsCard";
import AnalyticsChart from "../components/AnalyticsChart";

function Analytics() {
  return (
    <section>
      <PageHeader
        title="Analytics"
        description="Model performance, clustering quality, and system statistics."
      />

      <div className="statistics-grid">
        <StatisticsCard
          label="Classification Type"
          value="Binary"
          description="Yes or No prediction"
        />

        <StatisticsCard
          label="Primary Metric"
          value="F1-Score"
          description="Balances precision and recall"
        />

        <StatisticsCard
          label="Clustering Method"
          value="K-Means"
          description="Customer segmentation"
        />

        <StatisticsCard
          label="Number of Clusters"
          value="2"
          description="Cluster 0 and Cluster 1"
        />
      </div>

      <div className="analytics-grid">
        <AnalyticsChart
          title="Classification Evaluation"
          description="Metrics specified in the project proposal."
        >
          <div className="metric-list">
            <span>Accuracy</span>
            <span>Precision</span>
            <span>Recall</span>
            <span>F1-Score</span>
            <span>Confusion Matrix</span>
          </div>
        </AnalyticsChart>

        <AnalyticsChart
          title="Clustering Evaluation"
          description="Metrics used to evaluate customer segmentation."
        >
          <div className="metric-list">
            <span>Silhouette Score</span>
            <span>Davies-Bouldin Index</span>
            <span>Elbow Method</span>
          </div>
        </AnalyticsChart>

        <AnalyticsChart
          title="Model Workflow"
          description="End-to-end machine learning and deployment pipeline."
        >
          <div className="workflow-list">
            <span>Dataset</span>
            <strong>→</strong>
            <span>Preprocessing</span>
            <strong>→</strong>
            <span>Model</span>
            <strong>→</strong>
            <span>FastAPI</span>
            <strong>→</strong>
            <span>React</span>
          </div>
        </AnalyticsChart>

        <AnalyticsChart
          title="Available APIs"
          description="Backend endpoints connected to this dashboard."
        >
          <div className="endpoint-list">
            <code>POST /predict</code>
            <code>POST /cluster</code>
            <code>GET /health</code>
          </div>
        </AnalyticsChart>
      </div>
    </section>
  );
}

export default Analytics;