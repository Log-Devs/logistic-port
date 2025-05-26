/**
 * [2025-05-26] Major Update: Simplified shipment submission flow per admin request.
 * Removed sender information step and focused only on package details.
 * The client now only provides information about receiving a package and its details.
 * This aligns with the new business logic where clients only submit requests for packages they will receive.
 * See README for details. -- Cascade AI
 */

"use client";

// EMAIL_REGEX: File-level constant for robust email validation (clean code best practice)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

import React, { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import PackageOriginForm from "../components/PackageOriginForm";
import PackageForm from "../components/PackageForm";
import ConfirmForm from "../components/ConfirmForm";
import { useShipmentForm } from "@/hooks/useShipmentForm";
import { initialFormData } from "@/lib/constants";

// Interface for address suggestions from OpenStreetMap API
interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    pedestrian?: string;
    footway?: string;
    city?: string;
    town?: string;
    village?: string;
    hamlet?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

export default function SubmitShipmentPage() {
  // Initialize form with simplified data structure
  const { formData, setFormData, handleInputChange: baseHandleInputChange, resetForm } = useShipmentForm(initialFormData);

  // Enhanced handleInputChange: clears stepValidationError if set, for instant UX feedback
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (stepValidationError) setStepValidationError(null); // Clear error on any input change
    baseHandleInputChange(e);
  }
  
  // Core state variables for the simplified flow
  const [step, setStep] = useState<number>(1); // Start with step 1 (origin country)
  const [originAddressSuggestions, setOriginAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [originAddressLoading, setOriginAddressLoading] = useState(false);
  const [originAddressError, setOriginAddressError] = useState<string | null>(null);
  const [originSuggestionIndex, setOriginSuggestionIndex] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [stepValidationError, setStepValidationError] = useState<string | null>(null);

  // Address auto-complete for package origin (with keyboard nav)
  const handleOriginCountryInput = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Handle address/country input for package origin
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, originCountry: value }));
    setOriginAddressError(null);
    setOriginAddressLoading(true);
    setOriginAddressSuggestions([]);
    setOriginSuggestionIndex(-1);
    
    // Only search if user has typed at least 2 characters
    if (value.length > 2) {
      try {
        // Use OpenStreetMap API to get country suggestions
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(value)}&countrycodes=1`;
        const res = await fetch(url);
        const data = await res.json();
        setOriginAddressSuggestions(data);
      } catch {
        setOriginAddressError("Failed to fetch country suggestions.");
      }
    }
    setOriginAddressLoading(false);
  };

  // Keyboard navigation for country suggestions
  const handleOriginCountryKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!originAddressSuggestions.length) return;
    
    // Navigate through suggestions with arrow keys
    if (e.key === "ArrowDown") {
      setOriginSuggestionIndex((idx) =>
        Math.min(idx + 1, originAddressSuggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setOriginSuggestionIndex((idx) => Math.max(idx - 1, 0));
    } else if (e.key === "Enter" && originSuggestionIndex >= 0) {
      // Select the highlighted suggestion on Enter key
      handleOriginSuggestionSelect(
        originAddressSuggestions[originSuggestionIndex]
      );
    }
  };

  // When user selects a country suggestion
  const handleOriginSuggestionSelect = (
    suggestion: AddressSuggestion
  ) => {
    // Update form with selected country
    setFormData((prev) => ({
      ...prev,
      originCountry: suggestion.address?.country || suggestion.display_name || "",
      originCity: suggestion.address?.city || "",
    }));
    
    // Clear suggestions after selection
    setOriginAddressSuggestions([]);
    setOriginSuggestionIndex(-1);
  };

  // Simple function to go back to previous step
  const goToPreviousStep = () => {
    setStepValidationError(null);
    setStep(step - 1);
  };

  // Step validation helper functions
  const validateOriginStep = () => {
    // Check required fields for the origin step
    const requiredFields = [
      "originCountry",
      "clientEmail",
      "clientName",
      "clientPhone"
    ];

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setStepValidationError("Please fill in all required fields marked with *");
      return false;
    }

    // Email validation
    if (!EMAIL_REGEX.test(formData.clientEmail)) {
      setStepValidationError("Please enter a valid email address");
      return false;
    }

    setStepValidationError(null);
    return true;
  };

  const validatePackageStep = () => {
    // Check required fields for package details
    const requiredFields = [
      "packageType",
      "packageCategory",
      "packageDescription",
      "freightType"
    ];

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setStepValidationError("Please fill in all required package fields marked with *");
      return false;
    }

    setStepValidationError(null);
    return true;
  };

  // Handle moving to the next step in the form flow
  const handleNextStep = () => {
    setStepValidationError(null);
    
    // Step validation based on current step
    let isValid = false;
    
    switch (step) {
      case 1: // Package Origin & Client Info
        isValid = validateOriginStep();
        break;
      case 2: // Package Details
        isValid = validatePackageStep();
        break;
      default:
        isValid = true;
    }
    
    // Only proceed if current step is valid
    if (isValid) {
      setStep(step + 1);
      window.scrollTo(0, 0); // Scroll to top when changing steps
    }
  };

  // Step Rendering
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <PackageOriginForm
            formData={formData}
            onInputChange={handleInputChange}
            onOriginCountryInput={handleOriginCountryInput}
            onOriginCountryKeyDown={handleOriginCountryKeyDown}
            countrySuggestions={originAddressSuggestions}
            countryLoading={originAddressLoading}
            countryError={originAddressError}
            suggestionIndex={originSuggestionIndex}
            onSuggestionSelect={handleOriginSuggestionSelect}
          />
        );
      case 2:
        return (
          <PackageForm
            formData={formData}
            onInputChange={handleInputChange}
            onPackageDescriptionChange={handleInputChange}
          />
        );
      case 3:
        return (
          <ConfirmForm 
            formData={formData} 
            onInputChange={handleInputChange} 
            onBack={goToPreviousStep} 
            onSubmit={handleSubmit} 
          />
        );
      default:
        return null; // Handle unexpected step values
    }
  };

  // Form validation function
  const validateForm = () => {
    // Required fields validation
    const requiredFields = {
      // Client information
      clientName: "Your Name", 
      clientEmail: "Your Email",
      clientPhone: "Your Phone",
      
      // Origin information
      originCountry: "Origin Country",
      
      // Package information
      packageType: "Package Type",
      packageCategory: "Package Category",
      packageDescription: "Package Description",
      freightType: "Delivery Type",
    };

    const missingFields: string[] = [];

    for (const [field, label] of Object.entries(requiredFields)) {
      // @ts-ignore: dynamic access
      if (!formData[field]) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      setValidationErrors([`Please fill in all required fields: ${missingFields.join(", ")}`]);
      return false;
    }

    // Email validation
    if (!EMAIL_REGEX.test(formData.clientEmail)) {
      setValidationErrors(["Please enter a valid email address"]);
      return false;
    }

    setValidationErrors([]);
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setValidationErrors([]);
    
    try {
      // In a real application, this would submit to an API
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success modal
      document.getElementById('successModal')?.classList.remove('hidden');
      
      // Reset form and go back to step 1 after submission
      resetForm();
      setStep(1);
    } catch (error) {
      console.error("Error submitting shipment request:", error);
      setValidationErrors(["There was an error submitting your package request. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-10 py-6 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-2">Submit a New Shipment</h1>
      <p className="mb-6 text-gray-400">
        Fill out the form below to create a new shipment request.
      </p>

      {/* Step Indicator */}
      <StepIndicator
        steps={["Origin & Client", "Package", "Confirm"]}
        currentStep={step}
      />

      {/* Error messages */}
      {validationErrors.length > 0 && (
        <div className="w-full md:w-[90%] lg:w-[85%] mx-auto mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
          <h3 className="font-semibold mb-2">Please correct the following issues:</h3>
          <ul className="list-disc list-inside space-y-1">
            {validationErrors.map((error, idx) => (
              <li key={idx}>{error} is required</li>
            ))}
          </ul>
        </div>
      )}

      {/* Step validation error */}
      {stepValidationError && (
        <div className="w-full md:w-[90%] lg:w-[85%] mx-auto mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-700 dark:text-yellow-300">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {stepValidationError}
          </div>
        </div>
      )}

      {/* Form */}
      {/* Main form container - opened here, closed after form */}
      <div className="w-full md:w-[90%] lg:w-[85%] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-6 md:py-8 lg:py-10 bg-white dark:bg-slate-800 border border-gray-300 shadow-md rounded-lg transition-all duration-300">
        <form onSubmit={handleSubmit} noValidate>
          {renderStepContent()}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={goToPreviousStep}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 sm:py-3 px-4 sm:px-8 text-sm sm:text-base rounded-md transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back
              </button>
            ) : (
              <div></div>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-primary hover:bg-primary/90 text-white py-2 sm:py-3 px-4 sm:px-8 text-sm sm:text-base rounded-md transition-colors flex items-center gap-2"
              >
                Next
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              // Render the "Submit Shipment" button on the last step (step === 4)
              <>
                {/*
                  The 'Submit Shipment' button is set to type="submit" and does NOT use onClick.
                  This ensures the form's onSubmit handler (handleSubmit) receives a FormEvent<HTMLFormElement>,
                  which matches its expected type and prevents TypeScript errors.
                  See documentation in the README for details on this best practice.
                */}
                <button
                  type="submit" // Triggers form submission and calls handleSubmit via form's onSubmit
                  className="bg-red-500 hover:bg-red-700 text-white py-2 sm:py-3 px-4 sm:px-8 text-sm sm:text-base rounded-md transition-colors flex items-center gap-2"
                >
                  Submit Shipment
                </button>
              </>
            )}
          </div>
        </form>
      </div>
      {/* End of main form container - properly closed here */}
    </div>
  );
}