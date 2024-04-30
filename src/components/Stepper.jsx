import React, { useEffect, useRef, useState } from "react";

const Stepper = ({ stepsConfigs }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  const CurrentStepComponents = stepsConfigs[currentStep - 1]?.Component;

  const nextClickHandler = () => {
    if (currentStep == stepsConfigs.length) {
      setIsCompleted(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfigs.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfigs.length]);

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfigs.length - 1)) * 100;
  };

  return (
    <>
      <div className="stepper">
        {stepsConfigs.map((step, index) => (
          <div
            ref={(el) => (stepRef.current[index] = el)}
            className={`step ${
              currentStep > index + 1 || isCompleted ? "complete" : ""
            } ${currentStep === index + 1 ? "active" : ""}`}
            key={step.name}
          >
            <div className={`step-number`}>
              {currentStep > index + 1 || isCompleted ? (
                <span>&#10003;</span>
              ) : (
                index + 1
              )}
            </div>
            <div className="step-name">{step.name}</div>
          </div>
        ))}
        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{
              width: `${calculateProgressBarWidth()}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="stepper-outer">
        <CurrentStepComponents />

        {!isCompleted && (
          <button className="btn" onClick={nextClickHandler}>
            {currentStep == stepsConfigs.length ? "Finnish" : "Next"}
          </button>
        )}
      </div>
    </>
  );
};

export default Stepper;
