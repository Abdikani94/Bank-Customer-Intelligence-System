export const classificationMetrics = [
  { model: "Random Forest", accuracy: 79.97, precision: 27.33, recall: 42.91, f1: 33.39 },
  { model: "XGBoost", accuracy: 71.43, precision: 22.65, recall: 59.74, f1: 32.85 },
  { model: "Logistic Regression", accuracy: 63.76, precision: 19.17, recall: 65.22, f1: 29.63 },
];

export const predictionDistribution = [
  { name: "Did not subscribe", value: 39922, percentage: 88.3 },
  { name: "Subscribed", value: 5289, percentage: 11.7 },
];

export const clusterDistribution = [
  { name: "Cluster 0", value: 43316, percentage: 95.81, description: "Typical-balance customers" },
  { name: "Cluster 1", value: 1895, percentage: 4.19, description: "High-balance customers" },
];

export const campaignPerformance = [
  { month: "Mar", rate: 51.99 },
  { month: "Dec", rate: 46.73 },
  { month: "Sep", rate: 46.46 },
  { month: "Oct", rate: 43.77 },
  { month: "Apr", rate: 19.68 },
  { month: "Feb", rate: 16.65 },
  { month: "Aug", rate: 11.01 },
  { month: "Jun", rate: 10.22 },
  { month: "Nov", rate: 10.15 },
  { month: "Jan", rate: 10.12 },
  { month: "Jul", rate: 9.09 },
  { month: "May", rate: 6.72 },
];

export const confusionMatrix = [
  { actual: "No", predicted: "No", value: 6778, kind: "correct" },
  { actual: "No", predicted: "Yes", value: 1207, kind: "incorrect" },
  { actual: "Yes", predicted: "No", value: 604, kind: "incorrect" },
  { actual: "Yes", predicted: "Yes", value: 454, kind: "correct" },
];

export const clusteringMetrics = [
  { model: "K-Means", silhouette: 0.5474, daviesBouldin: 0.925, role: "Deployment model" },
  { model: "Agglomerative", silhouette: 0.7265, daviesBouldin: 0.5661, role: "Comparison model" },
  { model: "DBSCAN", silhouette: 0.6328, daviesBouldin: 0.3789, role: "Comparison model" },
];

export const modelActivity = [
  { title: "Classification model selected", detail: "Random Forest selected using the highest F1-score.", status: "Ready" },
  { title: "Segmentation model selected", detail: "K-Means selected for stable real-time cluster assignment.", status: "Ready" },
  { title: "Data leakage controlled", detail: "Call duration excluded from production inputs.", status: "Verified" },
];

export const chartColors = {
  blue: "#4C82FF",
  cyan: "#24C8DB",
  teal: "#20C997",
  violet: "#8B7CFF",
  amber: "#F5A524",
  red: "#F05D64",
  navy: "#8B7CFF",
  muted: "#718096",
  grid: "rgba(148, 163, 184, 0.14)",
};
