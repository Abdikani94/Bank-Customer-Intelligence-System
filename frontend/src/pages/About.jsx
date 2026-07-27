import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Code2,
  Database,
  GitBranch,
  Network,
  Server,
} from "lucide-react";

import PageHeader from "../components/PageHeader";

const technologies = [
  "Python",
  "Scikit-learn",
  "XGBoost",
  "FastAPI",
  "Pydantic",
  "React",
  "Vite",
  "Recharts",
];

const pipeline = [
  { label: "Bank marketing data", detail: "45,211 records", icon: Database },
  { label: "Preprocessing", detail: "Encoding, scaling, selection", icon: GitBranch },
  { label: "Classification", detail: "Random Forest", icon: BrainCircuit },
  { label: "Segmentation", detail: "K-Means", icon: Network },
  { label: "API delivery", detail: "FastAPI endpoints", icon: Server },
  { label: "Decision interface", detail: "React dashboard", icon: BarChart3 },
];

function About() {
  return (
    <section>
      <PageHeader
        eyebrow="Project overview"
        title="From customer data to campaign decisions"
        description="An end-to-end machine learning product for term-deposit prediction and explainable customer segmentation."
      />

      <div className="about-intro-grid">
        <article className="about-story">
          <span className="section-kicker">Product purpose</span>
          <h2>Focused outreach, informed by customer intelligence</h2>
          <p>
            Banks contact large customer populations during marketing campaigns,
            but not every customer has the same likelihood of subscribing. This
            system combines supervised classification and unsupervised segmentation
            to support more focused, explainable campaign decisions.
          </p>

          <div className="about-outcomes">
            <div>
              <BrainCircuit size={19} aria-hidden="true" />
              <span>
                <strong>Predict intent</strong>
                Estimate term-deposit subscription probability.
              </span>
            </div>
            <div>
              <Network size={19} aria-hidden="true" />
              <span>
                <strong>Understand segments</strong>
                Assign customers to actionable behavioral groups.
              </span>
            </div>
          </div>
        </article>

        <aside className="dataset-card">
          <div className="dataset-card-top">
            <span><Database size={19} /></span>
            <small>UCI / Kaggle</small>
          </div>
          <h2>Bank Marketing Dataset</h2>
          <p>Portuguese bank direct-marketing campaign observations.</p>

          <dl className="dataset-stats">
            <div><dt>Records</dt><dd>45,211</dd></div>
            <div><dt>Columns</dt><dd>17</dd></div>
            <div><dt>Target</dt><dd>Yes / No</dd></div>
            <div><dt>Positive rate</dt><dd>11.7%</dd></div>
          </dl>
        </aside>
      </div>

      <article className="architecture-card">
        <header>
          <span className="section-kicker">System architecture</span>
          <h2>Production pipeline</h2>
          <p>One consistent path from source data to customer-facing decisions.</p>
        </header>

        <div className="pipeline-flow">
          {pipeline.map(({ label, detail, icon: Icon }, index) => (
            <div className="pipeline-step" key={label}>
              <span className="pipeline-icon"><Icon size={18} /></span>
              <div>
                <strong>{label}</strong>
                <span>{detail}</span>
              </div>
              {index < pipeline.length - 1 && (
                <ArrowRight className="pipeline-arrow" size={16} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </article>

      <div className="about-bottom-grid">
        <article className="technology-card">
          <header>
            <Code2 size={20} aria-hidden="true" />
            <div>
              <h2>Technology stack</h2>
              <p>Focused tools selected for reliable ML delivery.</p>
            </div>
          </header>
          <div className="technology-badges">
            {technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </article>

        <article className="governance-card">
          <span className="section-kicker">Model governance</span>
          <h2>Production-safe by design</h2>
          <ul>
            <li>Call duration removed to prevent data leakage.</li>
            <li>Class imbalance handled during model training.</li>
            <li>F1-score used as the classification selection metric.</li>
            <li>Identical eight-field contract across both live endpoints.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default About;
