"use client";

import React, { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import SenderForm from "../components/SenderForm";
import RecipientForm from "../components/RecipientForm";
import PackageForm from "../components/PackageForm";
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
  const { formData, setFormData } = useShipmentForm(initialFormData);
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

  // Handlers for each step/component
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      // Reset recipient name if ID is being used and changes, or if switching modes
      ...(name === "recipientId" &&
        prev.recipientKnowsId && { recipientName: "" }),
      ...(name === "recipientKnowsId" && {
        recipientName: "",
        recipientId: "",
      }),
    }));
  };

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
    setStep(step - 1);
  };

  const goToNextStep = async () => {
    setStep(step + 1);
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
            onSuggestionSelect={() => {}}
            //   highlightMatch={(text: string, query: string) => text}
          />
        );
      case 3:
        return (
          <PackageForm
            formData={formData}
            onInputChange={(
              e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >
            ) => handleInputChange(e)}
            onPackageDescriptionChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData((prev) => ({ ...prev, packageNote: e.target.value }))
            }
          />
        );
      case 4:
        return (
          <div>
            <div>
              <h2 className="text-2xl text-[#1A2B6D] font-bold">
                Confirm Delivery
              </h2>
            </div>
          </div>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen px-4 sm:px-10 py-6 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-2">Submit a New Shipment</h1>
      <p className="mb-6 text-gray-400">
        Fill out the form below to create a new shipment request.
      </p>

      {/* Step Indicator */}
      <StepIndicator step={step} />

      {/* form */}
      <div className="w-full md:w-[90%] lg:w-[85%] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-6 md:py-8 lg:py-10 bg-white dark:bg-slate-800 border border-gray-300 shadow-md rounded-lg">
        <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={goToPreviousStep}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 sm:py-3 px-4 sm:px-8 text-sm sm:text-base rounded-md transition-colors"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="bg-primary text-white py-2 sm:py-3 px-4 sm:px-8 text-sm sm:text-base rounded-md transition-colors disabled:opacity-50"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary text-white py-2 sm:py-3 px-4 sm:px-8 text-sm sm:text-base rounded-md transition-colors flex items-center"
            >
              Submit Shipment
            </button>
          )}
        </div>
		</form>
      </div>
    </div>
  );
}
