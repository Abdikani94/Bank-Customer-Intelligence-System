import {
  BrainCircuit,
  Database,
  Network,
  Target,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartCard from "../components/ChartCard";
import MetricCard from "../components/MetricCard";
import PageHeader from "../components/PageHeader";
import {
  campaignPerformance,
  chartColors,
  clusterDistribution,
  predictionDistribution,
} from "../data/analytics";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid rgba(148, 163, 184, 0.18)",
  background: "#14253a",
  color: "#f4f7fb",
  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.24)",
};

function Dashboard() {
  return (
    <section>
      <PageHeader
        eyebrow="Executive overview"
        title="Customer intelligence dashboard"
        description="A live view of campaign opportunity, model readiness, and customer structure."
      />

      <div className="metrics-grid">
        <MetricCard
          label="Customer records"
          value="45,211"
          description="Complete campaign observations"
          trend="Full dataset"
          icon={Database}
          tone="blue"
          delay={20}
        />
        <MetricCard
          label="Subscription rate"
          value="11.7%"
          description="5,289 positive outcomes"
          trend="Positive class"
          icon={Target}
          tone="teal"
          delay={70}
        />
        <MetricCard
          label="Selected classifier"
          value="Random Forest"
          description="Highest classification F1-score"
          trend="F1 33.39%"
          icon={BrainCircuit}
          tone="amber"
          delay={120}
        />
        <MetricCard
          label="Customer segments"
          value="2"
          description="Production K-Means groups"
          trend="Silhouette 0.547"
          icon={Network}
          tone="navy"
          delay={170}
        />
      </div>

      <div className="dashboard-chart-grid">
        <ChartCard
          title="Campaign outcome"
          description="Observed term-deposit decisions"
          value="11.7% yes"
          tooltip="The target is imbalanced: 88.3% did not subscribe and 11.7% subscribed."
        >
          <div className="donut-layout">
            <div className="donut-chart">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={predictionDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={67}
                    outerRadius={91}
                    paddingAngle={3}
                    stroke="none"
                  >
                    <Cell fill={chartColors.blue} />
                    <Cell fill={chartColors.teal} />
                  </Pie>
                  <Tooltip
                    formatter={(value) => Number(value).toLocaleString()}
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: "#f4f7fb" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center">
                <strong>45.2K</strong>
                <span>customers</span>
              </div>
            </div>
            <div className="chart-legend">
              {predictionDistribution.map((item, index) => (
                <div key={item.name}>
                  <span
                    className="legend-dot"
                    style={{ background: index === 0 ? chartColors.blue : chartColors.teal }}
                  />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.value.toLocaleString()} · {item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard
          title="Campaign performance"
          description="Subscription rate by contact month"
          tooltip="Observed subscription rate for each campaign month."
        >
          <ResponsiveContainer width="100%" height={276}>
            <BarChart data={campaignPerformance} margin={{ top: 12, right: 4, left: -22 }}>
              <CartesianGrid stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, "Subscription rate"]}
                contentStyle={tooltipStyle}
                itemStyle={{ color: "#f4f7fb" }}
              />
              <Bar
                dataKey="rate"
                fill={chartColors.teal}
                radius={[5, 5, 0, 0]}
                maxBarSize={29}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard
        title="Customer segment composition"
        description="Production K-Means population and segment meaning"
        value="45,211 total"
      >
        <div className="segment-bars">
          {clusterDistribution.map((segment, index) => (
            <div className="segment-bar-row" key={segment.name}>
              <div className="segment-bar-label">
                <div>
                  <strong>{segment.name}</strong>
                  <span>{segment.description}</span>
                </div>
                <span>{segment.percentage}%</span>
              </div>
              <div className="segment-bar-track">
                <span
                  style={{
                    width: `${segment.percentage}%`,
                    background: index === 0 ? chartColors.violet : chartColors.teal,
                  }}
                />
              </div>
              <small>{segment.value.toLocaleString()} customers</small>
            </div>
          ))}
        </div>
      </ChartCard>
    </section>
  );
}

export default Dashboard;
