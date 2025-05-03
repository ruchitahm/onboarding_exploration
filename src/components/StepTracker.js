import React from "react";

const StepTracker = ({ currentStep }) => {
  const steps = [1, 2, 3, 4];
  return (
    <div className="step-tracker">
      {steps.map((step, index) => (
        <div key={step} className="step-item">
          <div className={`step-circle ${currentStep >= step ? "active" : ""}`}>
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`step-line ${currentStep > step ? "active" : ""}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepTracker;
