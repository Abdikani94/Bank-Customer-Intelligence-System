import { BrainCircuit, Gauge, Network, Target } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartCard from "../components/ChartCard";
import MetricCard from "../components/MetricCard";
import PageHeader from "../components/PageHeader";
import {
  chartColors,
  classificationMetrics,
  clusteringMetrics,
  confusionMatrix,
} from "../data/analytics";

function Analytics() {
  return (
    <section>
      <PageHeader
        eyebrow="Model intelligence"
        title="Performance analytics"
        description="Transparent evaluation of classification quality, prediction errors, and customer-segmentation structure."
      />

      <div className="metrics-grid">
        <MetricCard
          label="Selected classifier"
          value="Random Forest"
          description="Highest F1-score among three candidates"
          trend="Production"
          icon={BrainCircuit}
          tone="blue"
          delay={20}
        />
        <MetricCard
          label="F1-score"
          value="33.39%"
          description="Balance of precision and recall"
          trend="Selection metric"
          icon={Target}
          tone="teal"
          delay={70}
        />
        <MetricCard
          label="Recall"
          value="42.91%"
          description="454 positive customers detected"
          trend="Positive class"
          icon={Gauge}
          tone="amber"
          delay={120}
        />
        <MetricCard
          label="Silhouette score"
          value="0.547"
          description="K-Means production segmentation"
          trend="2 clusters"
          icon={Network}
          tone="navy"
          delay={170}
        />
      </div>

      <div className="analytics-dashboard">
        <ChartCard
          className="analytics-wide"
          title="Classification model comparison"
          description="Test-set performance across the three proposal models"
          tooltip="F1-score is the primary selection metric because the target is imbalanced."
        >
          <ResponsiveContainer width="100%" height={330}>
            <BarChart
              data={classificationMetrics}
              margin={{ top: 18, right: 12, left: -14, bottom: 18 }}
            >
              <CartesianGrid stroke={chartColors.grid} vertical={false} />
              <XAxis
                dataKey="model"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#A7B4C7", fontSize: 11 }}
                interval={0}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#A7B4C7", fontSize: 11 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value) => `${value}%`}
                cursor={{ fill: "rgba(76, 130, 255, 0.07)" }}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid rgba(148, 163, 184, 0.18)",
                  background: "#14253A",
                  color: "#F4F7FB",
                  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.24)",
                }}
                itemStyle={{ color: "#F4F7FB" }}
              />
              <Legend iconType="square" iconSize={9} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="accuracy" name="Accuracy" fill={chartColors.violet} radius={[4, 4, 0, 0]} />
              <Bar dataKey="precision" name="Precision" fill={chartColors.blue} radius={[4, 4, 0, 0]} />
              <Bar dataKey="recall" name="Recall" fill={chartColors.teal} radius={[4, 4, 0, 0]} />
              <Bar dataKey="f1" name="F1-score" fill={chartColors.amber} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Confusion matrix"
          description="Random Forest test predictions"
          tooltip="Rows are actual labels and columns are predicted labels."
        >
          <div className="confusion-layout">
            <div className="matrix-y-label">Actual label</div>
            <div className="confusion-matrix">
              {confusionMatrix.map((cell) => (
                <div
                  key={`${cell.actual}-${cell.predicted}`}
                  className={`matrix-cell matrix-${cell.kind}`}
                >
                  <strong>{cell.value.toLocaleString()}</strong>
                  <span>
                    Actual {cell.actual} · Predicted {cell.predicted}
                  </span>
                </div>
              ))}
            </div>
            <div className="matrix-x-label">Predicted label</div>
          </div>
          <div className="matrix-legend">
            <span><i className="correct" /> Correct prediction</span>
            <span><i className="incorrect" /> Incorrect prediction</span>
          </div>
        </ChartCard>

        <ChartCard
          title="Clustering quality"
          description="Internal evaluation on the same comparison sample"
          tooltip="Higher silhouette is better. Lower Davies–Bouldin is better."
        >
          <div className="clustering-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Algorithm</th>
                  <th>Silhouette ↑</th>
                  <th>DB index ↓</th>
                </tr>
              </thead>
              <tbody>
                {clusteringMetrics.map((model) => (
                  <tr key={model.model}>
                    <td>
                      <strong>{model.model}</strong>
                      <span>{model.role}</span>
                    </td>
                    <td>{model.silhouette.toFixed(4)}</td>
                    <td>{model.daviesBouldin.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-note">
            K-Means was deployed because it creates stable, assignable customer segments
            for the live <code>/cluster</code> endpoint.
          </p>
        </ChartCard>
      </div>
    </section>
  );
}

export default Analytics;
