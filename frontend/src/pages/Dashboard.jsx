import PageHeader from "../components/PageHeader";
import StatisticsCard from "../components/StatisticsCard";

function Dashboard() {
  return (
    <section>
      <PageHeader
        title="Dashboard"
        description="Overview of the customer intelligence system."
      />

      <div className="statistics-grid">
        <StatisticsCard
          label="Dataset Records"
          value="45,211"
          description="Bank marketing customers"
        />

        <StatisticsCard
          label="Dataset Features"
          value="17"
          description="Customer and campaign features"
        />

        <StatisticsCard
          label="Classification"
          value="Yes / No"
          description="Term-deposit subscription"
        />

        <StatisticsCard
          label="Customer Segments"
          value="2"
          description="K-Means clusters"
        />
      </div>

      <div className="dashboard-grid">
        <article className="dashboard-panel">
          <h2>System Overview</h2>

          <p>
            This application predicts whether a bank customer is likely to
            subscribe to a term deposit and assigns the customer to a similar
            customer segment.
          </p>
        </article>

        <article className="dashboard-panel">
          <h2>Machine Learning Tasks</h2>

          <div className="task-list">
            <div>
              <strong>Supervised Learning</strong>
              <span>Binary classification for term-deposit subscription.</span>
            </div>

            <div>
              <strong>Unsupervised Learning</strong>
              <span>K-Means clustering with two customer segments.</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Dashboard;