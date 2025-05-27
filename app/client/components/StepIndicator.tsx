/**
 * [2025-05-26] Enhanced StepIndicator to support dynamic step labels.
 * Now accepts an array of step names and renders them dynamically.
 * This supports the simplified shipment flow and allows for reuse in other flows.
 * -- Cascade AI
 */

import { Check } from "lucide-react";

// Interface for StepIndicator props supporting dynamic steps
interface StepIndicatorProps {
  steps: string[];  // Array of step names
  currentStep: number; // Current active step (1-based)
}

/**
 * StepIndicator - Displays a progress indicator for multi-step forms
 * @param steps - Array of step names to display
 * @param currentStep - Current active step (1-based index)
 */
const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  // Create step indices array based on the length of steps array
  const stepIndices = steps.map((_, index) => index + 1);
  
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
      {/* Map through each step index */}
      {stepIndices.map((stepIndex) => (
        <div key={stepIndex} className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {/* Step circle with number or check mark */}
          <div 
            className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 text-xs sm:text-sm font-semibold
              ${currentStep === stepIndex
                ? 'bg-[#1A2B6D] text-white border-[#1A2B6D]' // Current step
              : stepIndex < currentStep
                ? 'bg-[#1A2B6D] text-white border-[#1A2B6D]' // Completed step
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600'} // Future step
            `}
            title={steps[stepIndex-1]}
          >
            {/* Show check mark for last step in mobile view */}
            {stepIndex === steps.length ? <Check size={16} className="sm:hidden" /> : stepIndex}
            {/* Show check mark for last step in desktop view */}
            {stepIndex === steps.length ? <Check size={20} className="hidden sm:block" /> : null}
          </div>
          
          {/* Connector line between steps */}
          {stepIndex < steps.length && (
            <div
              className={`w-5 sm:w-7 md:w-9 h-1 sm:h-1.5 md:h-2 rounded 
                ${stepIndex < currentStep ? 'bg-[#FF0000]' : 'bg-gray-200 dark:bg-gray-700'}`}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
      
      {/* Step counter text */}
      <span className="hidden sm:inline-block ml-2 md:ml-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        Step {currentStep} of {steps.length}
      </span>
      
      {/* On mobile, show step name */}
      <span className="sm:hidden ml-2 text-xs font-medium text-gray-600 dark:text-gray-300">
        {steps[currentStep-1]}
      </span>
    </div>
  );
};

export default StepIndicator;
