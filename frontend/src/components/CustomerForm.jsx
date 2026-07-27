import { LoaderCircle, RotateCcw, Send, UserRound } from "lucide-react";
import { useState } from "react";

const initialFormData = {
  age: 35,
  job: "technician",
  marital: "married",
  education: "secondary",
  balance: 2500,
  housing: "no",
  loan: "no",
  campaign: 2,
};

const jobOptions = [
  ["admin.", "Admin"],
  ["blue-collar", "Blue collar"],
  ["entrepreneur", "Entrepreneur"],
  ["housemaid", "Housemaid"],
  ["management", "Management"],
  ["retired", "Retired"],
  ["self-employed", "Self employed"],
  ["services", "Services"],
  ["student", "Student"],
  ["technician", "Technician"],
  ["unemployed", "Unemployed"],
  ["unknown", "Unknown"],
];

function Field({ label, helper, children }) {
  return (
    <div className="form-group">
      <div className="field-label-row">
        <label htmlFor={children.props.id}>{label}</label>
        {helper && <span>{helper}</span>}
      </div>
      {children}
    </div>
  );
}

function CustomerForm({ onSubmit, loading, mode }) {
  const [formData, setFormData] = useState(initialFormData);
  const [validationError, setValidationError] = useState("");
  const prefix = mode === "prediction" ? "predict" : "segment";
  const isPrediction = mode === "prediction";

  function handleChange(event) {
    const { name, value, type } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setValidationError("");

    if (formData.age < 18 || formData.age > 100) {
      setValidationError("Age must be between 18 and 100.");
      return;
    }

    if (formData.campaign < 1) {
      setValidationError("Campaign contacts must be at least 1.");
      return;
    }

    await onSubmit(formData);
  }

  function handleReset() {
    setFormData(initialFormData);
    setValidationError("");
  }

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      {validationError && (
        <div className="form-message error" role="alert">
          {validationError}
        </div>
      )}

      <section className="form-section" aria-labelledby={`${prefix}-profile`}>
        <div className="form-section-heading">
          <span className="form-section-icon">
            <UserRound size={17} aria-hidden="true" />
          </span>
          <div>
            <h3 id={`${prefix}-profile`}>Customer profile</h3>
            <p>Demographic and account information used by the model.</p>
          </div>
        </div>

        <div className="form-grid">
          <Field label="Age" helper="18–100 years">
            <input
              id={`${prefix}-age`}
              name="age"
              type="number"
              min="18"
              max="100"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="Job category">
            <select
              id={`${prefix}-job`}
              name="job"
              value={formData.job}
              onChange={handleChange}
            >
              {jobOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Marital status">
            <select
              id={`${prefix}-marital`}
              name="marital"
              value={formData.marital}
              onChange={handleChange}
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </Field>

          <Field label="Education level">
            <select
              id={`${prefix}-education`}
              name="education"
              value={formData.education}
              onChange={handleChange}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="tertiary">Tertiary</option>
              <option value="unknown">Unknown</option>
            </select>
          </Field>
        </div>
      </section>

      <section className="form-section" aria-labelledby={`${prefix}-financial`}>
        <div className="form-section-heading">
          <span className="form-section-index">02</span>
          <div>
            <h3 id={`${prefix}-financial`}>Financial context</h3>
            <p>Balance, lending, and current campaign engagement.</p>
          </div>
        </div>

        <div className="form-grid">
          <Field label="Account balance" helper="EUR">
            <input
              id={`${prefix}-balance`}
              name="balance"
              type="number"
              value={formData.balance}
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="Campaign contacts" helper="Minimum 1">
            <input
              id={`${prefix}-campaign`}
              name="campaign"
              type="number"
              min="1"
              value={formData.campaign}
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="Housing loan">
            <select
              id={`${prefix}-housing`}
              name="housing"
              value={formData.housing}
              onChange={handleChange}
            >
              <option value="no">No housing loan</option>
              <option value="yes">Has housing loan</option>
            </select>
          </Field>

          <Field label="Personal loan">
            <select
              id={`${prefix}-loan`}
              name="loan"
              value={formData.loan}
              onChange={handleChange}
            >
              <option value="no">No personal loan</option>
              <option value="yes">Has personal loan</option>
            </select>
          </Field>
        </div>
      </section>

      <div className="form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={handleReset}
          disabled={loading}
        >
          <RotateCcw size={15} aria-hidden="true" />
          Reset
        </button>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? (
            <>
              <LoaderCircle className="button-spinner" size={16} aria-hidden="true" />
              Processing
            </>
          ) : (
            <>
              <Send size={15} aria-hidden="true" />
              {isPrediction ? "Run prediction" : "Assign segment"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default CustomerForm;
