import React from 'react';

const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = ['Shipping', 'Payment', 'Review', 'Confirmation'];
  
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            index + 1 <= currentStep
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-300 text-gray-500'
          }`}>
            {index + 1 <= currentStep ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          <span className={`ml-2 text-sm ${
            index + 1 <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
          }`}>
            {step}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-4 ${
              index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator; 