import React, { useState } from "react";
import EntriesTable from "./EntriesTable";
import "../App.css";
import StepTracker from "./StepTracker";
import { FiUser, FiUsers, FiCheckCircle } from "react-icons/fi";
import logo from '../assets/logo.png';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    displayName: "",
    workspaceName: "",
    workspaceURL: "",
    usage: "",
  });
  const [formDataList, setFormDataList] = useState([]);
  const [showEntries, setShowEntries] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [lastSubmittedName, setLastSubmittedName] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full Name is required";
      if (!formData.displayName.trim())
        newErrors.displayName = "Display Name is required";
    }
    if (step === 2) {
      if (!formData.workspaceName.trim())
        newErrors.workspaceName = "Workspace Name is required";
    }
    if (step === 3) {
      if (!formData.usage) newErrors.usage = "Usage selection is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUsageSelect = (option) => {
    setFormData({ ...formData, usage: option });
  };

  const handleLaunch = () => {
    const isDuplicate = formDataList.some(
      (entry) =>
        entry.fullName === formData.fullName &&
        entry.displayName === formData.displayName &&
        entry.workspaceName === formData.workspaceName &&
        entry.workspaceURL === formData.workspaceURL &&
        entry.usage === formData.usage
    );
    if (!isDuplicate) {
      setFormDataList((prevList) => [...prevList, formData]);
    }
    setShowEntries(true);
    setIsLaunched(true);
    setLastSubmittedName(formData.displayName);
    setFormData({
      fullName: "",
      displayName: "",
      workspaceName: "",
      workspaceURL: "",
      usage: "",
    });
  };

  const handleEdit = (updatedData, index) => {
    const updatedList = [...formDataList];
    updatedList[index] = updatedData;
    setFormDataList(updatedList);
  };

  const handleDelete = (index) => {
    const updatedList = formDataList.filter((_, i) => i !== index);
    setFormDataList(updatedList);
  };

  const handleMore = () => {
    setFormData({
      fullName: "",
      displayName: "",
      workspaceName: "",
      workspaceURL: "",
      usage: "",
    });
    setStep(1);
    setIsLaunched(false);
    setShowEntries(false);
  };

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="Eden Logo" className="logo" />
        <h1 className="brand-name">Eden</h1>
      </div>
      <StepTracker currentStep={step} />
      {step === 1 && (
        <div className="form-container">
          <div className="form-step">
            <h2>Welcome! First things first…</h2>
            <p>You can always change them later.</p>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="form-input"
            />
            {errors.fullName && (
              <div className="error-message">{errors.fullName}</div>
            )}

            <label>Display Name</label>
            <input
              type="text"
              name="displayName"
              placeholder="Display Name"
              value={formData.displayName}
              onChange={handleChange}
              className="form-input"
            />
            {errors.displayName && (
              <div className="error-message">{errors.displayName}</div>
            )}
            <button className="button" onClick={handleNext}>
              Create Workspace
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="form-container">
          <div className="form-step">
            <h2>Let's set up a home for all your work</h2>
            <p>You can always create another workspace later.</p>
            <label>Workspace Name</label>
            <input
              type="text"
              name="workspaceName"
              placeholder="Workspace Name"
              value={formData.workspaceName}
              onChange={handleChange}
              className="form-input"
            />
            {errors.workspaceName && (
              <div className="error-message">{errors.workspaceName}</div>
            )}
            <label htmlFor="workspaceURL">
              Workspace URL <span className="optional">(optional)</span>
            </label>
            <div className="input-group">
              <span className="input-prefix">www.eden.com/</span>
              <input
                type="text"
                id="workspaceURL"
                name="workspaceURL"
                placeholder="example"
                value={formData.workspaceURL}
                onChange={handleChange}
                className="form-input1"
              />
            </div>

            <div>
              <button className="button" onClick={handleNext}>
                Create Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="form-container">
          <div className="form-step">
            <h2>How do you planning to use Eden?</h2>
            <p>We’ll streamline your setup experience accordingly.</p>
            <div className={`usage-options ${errors.usage ? "error" : ""}`}>
              <div
                className={`usage-button ${
                  formData.usage === "myself" ? "active" : ""
                }`}
                onClick={() => handleUsageSelect("myself")}
              >
                <FiUser size={32} className="option-icon" />
                <h3>For myself</h3>
                <p>Write better. Think more clearly. Stay organized.</p>
              </div>
              <div
                className={`usage-button ${
                  formData.usage === "team" ? "active" : ""
                }`}
                onClick={() => handleUsageSelect("team")}
              >
                <FiUsers size={32} className="option-icon" />
                <h3>With my team</h3>
                <p>Wikis, docs, tasks & projects, all in one place.</p>
              </div>
            </div>
            {errors.usage && (
              <div className="error-message">{errors.usage}</div>
            )}
            <div style={{ marginTop: "16px" }}>
              <button className="button" onClick={handleNext}>
                Create Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="form-container">
          <div className="step-completed">
            <FiCheckCircle className="check-icon" />
          </div>

          <div className="form-step">
            <h2>
              Congratulations, {lastSubmittedName || formData.displayName}!
            </h2>
            <p>You have completed onboarding, you can start using the Eden!</p>
            {!isLaunched && (
              <button className="button" onClick={handleLaunch}>
                Launch Eden
              </button>
            )}
          </div>

          {showEntries && (
            <div className="center-button">
              <button className="button more" onClick={handleMore}>
                Add More
              </button>
              <EntriesTable
                entries={formDataList}
                onUpdate={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
