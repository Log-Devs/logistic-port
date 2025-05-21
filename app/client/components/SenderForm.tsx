import React from "react";
import { FaCheckCircle, FaInfoCircle, FaSearchLocation } from "react-icons/fa";

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

interface FormData {
  senderName: string;
  senderAddress: string;
  senderContact: string;
  senderEmail: string;
  senderPhone: string;
  senderCity: string;
  senderState: string;
  senderZip: string;
  senderCountry: string;
  senderLandmark: string;
  recipientName: string;
  recipientAddress: string;
  recipientContact: string;
  recipientCountry: string;
  recipientPhoneCountryCode: string;
  recipientId: string;
  recipientKnowsId: boolean;
  packageType: string;
  packageCategory: string;
  packageWeight: string;
  packageDescription: string;
  freightType: string;
}

interface SenderFormProps {
  formData: FormData;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onAddressInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addressSuggestions: AddressSuggestion[];
  addressLoading: boolean;
  addressError: string | null;
  suggestionIndex: number;
  onDetectLocation: () => void;
  locating: boolean;
  locationSuccess: boolean;
  locationError: string | null;
}

const SenderForm: React.FC<SenderFormProps> = ({
  formData,
  onInputChange,
  onAddressInput,
  onAddressKeyDown,
  addressSuggestions,
  addressLoading,
  addressError,
  suggestionIndex,
  onDetectLocation,
  locating,
  locationSuccess,
  locationError,
}) => {
  return (
    <div>      <div>
        <h2 className="text-2xl text-[#1A2B6D] dark:text-[#AEB8D0] font-bold my-2">
          Sender Details
        </h2>
      </div>
      <div>
        <div className="mb-6 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={onDetectLocation}
            disabled={locating}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Detect my location"
          >
            <FaSearchLocation />
            {locating ? "Detecting..." : "Detect My Location"}
          </button>

          {locationSuccess && (
            <span className="flex items-center text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 rounded-full px-3 py-1">
              <FaCheckCircle className="mr-1" />
              Location detected
            </span>
          )}

          {locationError && (
            <span className="text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
              <FaInfoCircle className="inline mr-1" />
              {locationError}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="font-semibold">
              Full Name <span className="text-primary text-lg">*</span>
            </label>
            <input
              type="text"
              id="senderName"
              name="senderName"
              required
              value={formData.senderName}
              onChange={onInputChange}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="senderEmail" className="font-semibold">
              Email <span className="text-primary text-lg">*</span>
            </label>
            <input
              type="email"
              id="senderEmail"
              name="senderEmail"
              required
              value={formData.senderEmail}
              onChange={onInputChange}
              placeholder="your.email@example.com"
              className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="senderPhone" className="font-semibold">
              Phone Number <span className="text-primary text-lg">*</span>
            </label>
            <input
              type="tel"
              id="senderPhone"
              name="senderPhone"
              required
              value={formData.senderPhone}
              onChange={onInputChange}
              placeholder="(233) 245-678-901"
              className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="senderCountry" className="font-semibold">
                Country <span className="text-primary text-lg">*</span>
              </label>
              <input
                type="text"
                id="senderCountry"
                name="senderCountry"
                required
                value={formData.senderCountry}
                onChange={onInputChange}
                placeholder="Enter your country"
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="senderCity" className="font-semibold">
                City <span className="text-primary text-lg">*</span>
              </label>
              <input
                type="text"
                id="senderCity"
                name="senderCity"
                required
                value={formData.senderCity}
                onChange={onInputChange}
                placeholder="Enter your city"
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="senderAddress" className="font-semibold">
              Address <span className="text-primary text-lg">*</span>
            </label>

            <div className="relative">
              <input
                type="text"
                id="senderAddress"
                name="senderAddress"
                required
                value={formData.senderAddress}
                onChange={onAddressInput}
                onKeyDown={onAddressKeyDown}
                autoComplete="off"
                placeholder="Enter your street address"
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                aria-autocomplete="list"
                aria-controls="address-suggestions"
                aria-activedescendant={
                  addressSuggestions.length > 0
                    ? `suggestion-${suggestionIndex}`
                    : undefined
                }
              />
              {addressLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-navy-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
              <label htmlFor="senderZip" className="font-semibold">
                Zip Code <span className="text-primary text-lg">*</span>
              </label>
              <input
                type="text"
                id="senderZip"
                name="senderZip"
                required
                value={formData.senderZip}
							onChange={onInputChange}
							placeholder="Enter your ZIP/postal code"
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="senderLandmark" className="font-semibold">
                Closest Landmark
              </label>
              <input
                type="text"
                id="senderLandmark"
                name="senderLandmark"
                value={formData.senderLandmark}
                onChange={onInputChange}
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenderForm;