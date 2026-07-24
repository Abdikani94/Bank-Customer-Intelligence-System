import PageHeader from "../components/PageHeader";

function About() {
  return (
    <section>
      <PageHeader
        title="About the Project"
        description="Project purpose, dataset, algorithms, and technologies."
      />

      <div className="page-panel no-top-margin">
        <h2>Bank Customer Intelligence System</h2>

        <p>
          This project is an end-to-end machine learning web application that
          combines supervised classification and unsupervised clustering to
          support bank marketing decisions.
        </p>

        <div className="about-grid">
          <div>
            <h3>Classification</h3>
            <p>
              Predicts whether a customer will subscribe to a term deposit as
              Yes or No.
            </p>
          </div>

          <div>
            <h3>Clustering</h3>
            <p>
              Groups customers into two similar customer segments using
              K-Means.
            </p>
          </div>

          <div>
            <h3>Dataset</h3>
            <p>
              Bank Marketing Dataset containing 45,211 rows and 17 columns.
            </p>
          </div>

          <div>
            <h3>Backend</h3>
            <p>
              FastAPI REST API with prediction, clustering, health, and Swagger
              documentation.
            </p>
          </div>

          <div>
            <h3>Frontend</h3>
            <p>
              Responsive React dashboard for predictions, segmentation,
              analytics, and project information.
            </p>
          </div>

          <div>
            <h3>Technologies</h3>
            <p>
              Python, Scikit-learn, FastAPI, React, Vite, Axios, and CSS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;