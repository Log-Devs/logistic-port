/**
 * [2025-05-21] Fix: Removed onClick={handleSubmit} from the 'Submit Shipment' button. The form now uses onSubmit={handleSubmit}, and the button is type="submit" only. This resolves a TypeScript event type error and follows React/TypeScript best practices. See README for details. -- Cascade AI
 */

"use client";

import React, { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import SenderForm from "../components/SenderForm";
import RecipientForm from "../components/RecipientForm";
import PackageForm from "../components/PackageForm";
import ConfirmForm from "../components/ConfirmForm";
import { useShipmentForm } from "@/hooks/useShipmentForm";
import { initialFormData } from "@/lib/constants";

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
  const { formData, setFormData, handleInputChange, resetForm } = useShipmentForm(initialFormData);
  const [step, setStep] = useState<number>(1);
  const [senderAddressSuggestions, setSenderAddressSuggestions] = useState<
    AddressSuggestion[]
  >([]);
  const [senderAddressLoading, setSenderAddressLoading] = useState(false);
  const [senderAddressError, setSenderAddressError] = useState<string | null>(
    null
  );
  const [senderSuggestionIndex, setSenderSuggestionIndex] = useState(-1);
  const [locating, setLocating] = useState(false);
  const [mapCoords, setMapCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [stepValidationError, setStepValidationError] = useState<string | null>(null);

  // Address auto-complete for sender (with keyboard nav)
  const handleSenderAddressInput = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, senderAddress: value }));
    setSenderAddressError(null);
    setSenderAddressLoading(true);
    setSenderAddressSuggestions([]);
    setSenderSuggestionIndex(-1);
    if (value.length > 2) {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
          value
        )}`;
        const res = await fetch(url);
        const data = await res.json();
        setSenderAddressSuggestions(data);
      } catch {
        setSenderAddressError("Failed to fetch address suggestions.");
      }
    }
    setSenderAddressLoading(false);
  };

  // Keyboard navigation for suggestions
  const handleSenderAddressKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!senderAddressSuggestions.length) return;
    if (e.key === "ArrowDown") {
      setSenderSuggestionIndex((idx) =>
        Math.min(idx + 1, senderAddressSuggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSenderSuggestionIndex((idx) => Math.max(idx - 1, 0));
    } else if (e.key === "Enter" && senderSuggestionIndex >= 0) {
      handleSenderSuggestionSelect(
        senderAddressSuggestions[senderSuggestionIndex]
      );
    }
  };

  // When user selects a suggestion (full form auto-fill)
  const handleSenderSuggestionSelect = async (
    suggestion: AddressSuggestion
  ) => {
    setFormData((prev) => ({
      ...prev,
      senderAddress:
        suggestion.address?.road ||
        suggestion.address?.pedestrian ||
        suggestion.address?.footway ||
        suggestion.display_name ||
        "",
      senderCity:
        suggestion.address?.city ||
        suggestion.address?.town ||
        suggestion.address?.village ||
        suggestion.address?.hamlet ||
        "",
      senderState: suggestion.address?.state || "",
      senderZip: suggestion.address?.postcode || "",
      senderCountry: suggestion.address?.country || "",
    }));
    setMapCoords({
      lat: parseFloat(suggestion.lat),
      lon: parseFloat(suggestion.lon),
    });
    setSenderAddressSuggestions([]);
    setSenderSuggestionIndex(-1);
  };

  const goToPreviousStep = () => {
    setStepValidationError(null);
    setStep(step - 1);
  };

  // Step validation helper functions
  const validateSenderStep = () => {
    const requiredFields = [
      "senderName",
      "senderAddress",
      "senderEmail",
      "senderPhone",
      "senderCity",
      "senderState",
      "senderZip",
      "senderCountry"
    ];

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setStepValidationError("Please fill in all required fields marked with *");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.senderEmail)) {
      setStepValidationError("Please enter a valid email address");
      return false;
    }

    setStepValidationError(null);
    return true;
  };

  const validateRecipientStep = () => {
    if (formData.recipientKnowsId) {
      if (!formData.recipientId) {
        setStepValidationError("Please enter the recipient ID");
        return false;
      }
    } else {
      const requiredFields = [
        "recipientName",
        "recipientEmail",
        "recipientPhone",
        "recipientAddress",
        "recipientCity",
        "recipientState",
        "recipientZip",
        "recipientCountry"
      ];

      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

      if (missingFields.length > 0) {
        setStepValidationError("Please fill in all required recipient fields marked with *");
        return false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.recipientEmail)) {
        setStepValidationError("Please enter a valid recipient email address");
        return false;
      }
    }

    setStepValidationError(null);
    return true;
  };

  const validatePackageStep = () => {
    const requiredFields = ["freightType", "packageType", "packageDescription"];

    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setStepValidationError("Please fill in all required package details marked with *");
      return false;
    }

    setStepValidationError(null);
    return true;
  };

  const goToNextStep = () => {
    let isValid = false;

    // Validate the current step
    switch (step) {
      case 1:
        isValid = validateSenderStep();
        break;
      case 2:
        isValid = validateRecipientStep();
        break;
      case 3:
        isValid = validatePackageStep();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setStepValidationError(null);
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleDetectLocation = async () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setMapCoords({ lat: latitude, lon: longitude });

          // Reverse geocode to get address details
          try {
            const address = await import("@/lib/utils").then((m) =>
              m.reverseGeocode(latitude, longitude)
            );
            const resolved = await address;
            setFormData((prev) => ({
              ...prev,
              senderCity:
                resolved.city ||
                resolved.town ||
                resolved.village ||
                resolved.hamlet ||
                "",
              senderState: resolved.state || "",
              senderZip: resolved.postcode || "",
              senderCountry: prev.senderCountry || resolved.country || "", // Only set if not already set
            }));
          } catch {
            // Optionally handle error
          }

          setLocating(false);
          setLocationSuccess(true);
          setLocationError(null);
        },
        () => {
          setLocating(false);
          setLocationSuccess(false);
          setLocationError(
            "Unable to detect your location. Please allow location access."
          );
        }
      );
    } else {
      setLocating(false);
      setLocationSuccess(false);
      setLocationError("Geolocation is not supported by your browser.");
    }
  };

  // Step Rendering
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SenderForm
            formData={formData}
            onInputChange={handleInputChange}
            onAddressInput={handleSenderAddressInput}
            onAddressKeyDown={handleSenderAddressKeyDown}
            addressSuggestions={senderAddressSuggestions}
            addressLoading={senderAddressLoading}
            addressError={senderAddressError}
            suggestionIndex={senderSuggestionIndex}
            onDetectLocation={handleDetectLocation}
            locating={locating}
            locationSuccess={locationSuccess}
            locationError={locationError}
          />
        );
      case 2:
        return (
          <RecipientForm
            formData={formData}
            onInputChange={handleInputChange}
            onAddressInput={handleSenderAddressInput}
            onAddressKeyDown={handleSenderAddressKeyDown}
            addressSuggestions={senderAddressSuggestions}
            addressLoading={senderAddressLoading}
            addressError={senderAddressError}
            suggestionIndex={senderSuggestionIndex}
            onSuggestionSelect={() => { }}
          />
        );
      case 3:
        return (
          <PackageForm
            formData={formData}
            onInputChange={handleInputChange}
            onPackageDescriptionChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData((prev) => ({ ...prev, packageNote: e.target.value }))
            }
          />
        );
      case 4:
        return (
          <ConfirmForm
            formData={formData}
            onInputChange={handleInputChange}
            onBack={goToPreviousStep}
            onSubmit={handleSubmit}
          />
        );
    }
  };

  // Form validation function
  const validateForm = () => {
    // Required fields validation
    const requiredFields = {
      // Sender information
      senderName: "Sender Name",
      senderAddress: "Sender Address",
      senderEmail: "Sender Email",
      senderPhone: "Sender Phone",
      senderCity: "Sender City",
      senderState: "Sender State",
      senderZip: "Sender ZIP Code",
      senderCountry: "Sender Country",

      // Recipient information (conditionally required based on ID usage)
      ...(formData.recipientKnowsId
        ? { recipientId: "Recipient ID" }
        : {
          recipientName: "Recipient Name",
          recipientEmail: "Recipient Email",
          recipientPhone: "Recipient Phone",
          recipientAddress: "Recipient Address",
          recipientCity: "Recipient City",
          recipientState: "Recipient State",
          recipientZip: "Recipient ZIP Code",
          recipientCountry: "Recipient Country",
        }),

      // Package information
      freightType: "Delivery Type",
      packageType: "Package Type",
      packageCategory: "Package Category", // [Required] Ensure package category is validated (re-added for completeness)
      packageDescription: "Package Description",
    };

    const missingFields: string[] = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      // Use index access with type assertion since we know these properties exist
      if (!(formData as any)[field]) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      setValidationErrors(missingFields);
      return false;
    }

    setValidationErrors([]);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step !== 4) {
      // If we're not on the final confirmation step, don't submit
      return;
    }

    setIsSubmitting(true);

    if (validateForm()) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Here you would send data to your backend
        console.log("Form submitted successfully:", formData);

        // Show success message
        alert("Shipment submitted successfully!");

        // Reset form and go back to step 1
        resetForm();
        setStep(1);
      } catch (error) {
        alert("There was an error submitting your shipment. Please try again.");
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-10 py-6 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-2">Submit a New Shipment</h1>
      <p className="mb-6 text-gray-400">
        Fill out the form below to create a new shipment request.
      </p>

      {/* Step Indicator */}
      <StepIndicator step={step} />

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
          {renderStep()}
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
            {step < 4 ? (
              // Render the "Continue" button for steps before the last (step < 4)
              <button
                type="button" // Prevents form submission on intermediate steps
                onClick={goToNextStep}
                className="bg-primary hover:bg-primary/90 text-white py-2 sm:py-3 px-4 sm:px-8 text-sm sm:text-base rounded-md transition-colors flex items-center gap-2"
              >
                Continue
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