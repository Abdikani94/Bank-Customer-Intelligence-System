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

function PredictionForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState(initialFormData);
  const [validationError, setValidationError] = useState("");

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
      setValidationError("Campaign must be at least 1.");
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
        <div className="form-message error">{validationError}</div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="prediction-age">Age</label>
          <input
            id="prediction-age"
            name="age"
            type="number"
            min="18"
            max="100"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prediction-job">Job</label>
          <select
            id="prediction-job"
            name="job"
            value={formData.job}
            onChange={handleChange}
          >
            <option value="admin.">Admin</option>
            <option value="blue-collar">Blue Collar</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="housemaid">Housemaid</option>
            <option value="management">Management</option>
            <option value="retired">Retired</option>
            <option value="self-employed">Self Employed</option>
            <option value="services">Services</option>
            <option value="student">Student</option>
            <option value="technician">Technician</option>
            <option value="unemployed">Unemployed</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="prediction-marital">Marital Status</label>
          <select
            id="prediction-marital"
            name="marital"
            value={formData.marital}
            onChange={handleChange}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="prediction-education">Education</label>
          <select
            id="prediction-education"
            name="education"
            value={formData.education}
            onChange={handleChange}
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="tertiary">Tertiary</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="prediction-balance">Account Balance</label>
          <input
            id="prediction-balance"
            name="balance"
            type="number"
            value={formData.balance}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prediction-housing">Housing Loan</label>
          <select
            id="prediction-housing"
            name="housing"
            value={formData.housing}
            onChange={handleChange}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="prediction-loan">Personal Loan</label>
          <select
            id="prediction-loan"
            name="loan"
            value={formData.loan}
            onChange={handleChange}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="prediction-campaign">Campaign Contacts</label>
          <input
            id="prediction-campaign"
            name="campaign"
            type="number"
            min="1"
            value={formData.campaign}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={handleReset}
          disabled={loading}
        >
          Reset
        </button>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Predicting..." : "Predict Customer"}
        </button>
      </div>
    </form>
  );
}

export default PredictionForm;