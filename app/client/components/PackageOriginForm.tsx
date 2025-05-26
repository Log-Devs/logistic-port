/**
 * [2025-05-26] Created new PackageOriginForm component for simplified shipment flow.
 * This component replaces the SenderForm and focuses only on package origin details.
 * Clients provide information about where the package is coming from and their contact info.
 * 
 * [2025-05-26] Updated to restrict country selection to Ghana and USA only,
 * made contact information fields read-only, and added country flag to phone display.
 * -- Cascade AI
 */

import React from "react";
import { FaCheckCircle, FaInfoCircle, FaGlobe, FaFlag, FaLock } from "react-icons/fa";

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

/**
 * Available countries for package origin selection
 * Restricted to Ghana and USA as per business requirements
 */
const AVAILABLE_COUNTRIES = [
  {
    code: "GH",
    name: "Ghana",
    flag: "🇬🇭",
    phoneCode: "+233"
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    phoneCode: "+1"
  }
];

// Interface for the form data in the simplified shipment flow
interface FormData {
  // Client information fields
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  clientCity: string;
  clientState: string;
  clientZip: string;
  clientCountry: string;
  
  // Package origin fields
  originCountry: string;
  originCity: string;
  originAddress?: string;
  originState?: string;
  originContactName?: string;

  // Other fields possibly used in the component
  [key: string]: any;
}

// Props interface for the PackageOriginForm component
interface PackageOriginFormProps {
  formData: FormData;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onOriginCountryInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOriginCountryKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  countrySuggestions: AddressSuggestion[];
  countryLoading: boolean;
  countryError: string | null;
  suggestionIndex: number;
  onSuggestionSelect: (suggestion: AddressSuggestion) => void;
}

/**
 * PackageOriginForm - Component for collecting package origin information 
 * and client contact details in the simplified shipment flow
 * 
 * Country selection is limited to Ghana and USA
 * Contact information is displayed but not editable
 */
const PackageOriginForm: React.FC<PackageOriginFormProps> = ({
  formData,
  onInputChange,
  onOriginCountryInput,
  onOriginCountryKeyDown,
  countrySuggestions,
  countryLoading,
  countryError,
  suggestionIndex,
  onSuggestionSelect,
}) => {
  // Determine the country flag for the phone number display
  const getCountryFlag = () => {
    // Default to Ghana flag if no match
    let flag = "🇬🇭";
    
    // Check if the phone starts with a US code
    if (formData.clientPhone.startsWith("+1")) {
      flag = "🇺🇸";
    }
    
    return flag;
  };
  
  return (
    <div className="space-y-6">      
      <div>
        <h2 className="text-2xl text-[#1A2B6D] dark:text-[#AEB8D0] font-bold my-2">
          Package Origin and Your Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Please select where the package is coming from. Your contact information is displayed below.
        </p>
      </div>

      {/* Origin Country Selection (Limited to Ghana and USA) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="originCountry" className="font-semibold flex items-center">
            Package Origin Country <span className="text-primary text-lg">*</span>
            <FaGlobe className="ml-2 text-navy-500" />
          </label>
          <div className="relative">
            <select
              id="originCountry"
              name="originCountry"
              required
              value={formData.originCountry}
              onChange={onInputChange}
              className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all"
            >
              <option value="">Select origin country</option>
              {AVAILABLE_COUNTRIES.map(country => (
                <option key={country.code} value={country.name}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Information note about available countries */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
            <FaInfoCircle className="mr-1" />
            <span>Currently only accepting packages from Ghana and USA</span>
          </div>
        </div>

        {/* Only need city if origin country is selected */}
        {formData.originCountry && (
          <div className="space-y-2">
            <label htmlFor="originCity" className="font-semibold">
              Origin City <span className="text-primary text-lg">*</span>
            </label>
            <input
              type="text"
              id="originCity"
              name="originCity"
              value={formData.originCity}
              onChange={onInputChange}
              placeholder={`City in ${formData.originCountry}`}
              className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>
        )}
      </div>

      {/* Client Information Section - Read-only */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-900/30 rounded-lg p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center mb-4">
          <h3 className="text-xl text-[#1A2B6D] dark:text-[#AEB8D0] font-semibold">
            Your Contact Information
          </h3>
          <div className="ml-auto flex items-center text-gray-500 dark:text-gray-400">
            <FaLock className="mr-2" />
            <span className="text-sm">Read only</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client Name - Read-only */}
          <div className="space-y-2">
            <label htmlFor="clientName" className="font-semibold flex items-center">
              Full Name
            </label>
            <div className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 cursor-not-allowed">
              {formData.clientName}
            </div>
          </div>

          {/* Client Email - Read-only */}
          <div className="space-y-2">
            <label htmlFor="clientEmail" className="font-semibold flex items-center">
              Email
            </label>
            <div className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 cursor-not-allowed overflow-hidden text-ellipsis">
              {formData.clientEmail}
            </div>
          </div>

          {/* Client Phone - Read-only with country flag */}
          <div className="space-y-2">
            <label htmlFor="clientPhone" className="font-semibold flex items-center">
              Phone Number
            </label>
            <div className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 cursor-not-allowed flex items-center">
              <span className="mr-2 text-lg">{getCountryFlag()}</span>
              {formData.clientPhone}
            </div>
          </div>

          {/* Client Address - Read-only */}
          <div className="space-y-2">
            <label htmlFor="clientAddress" className="font-semibold flex items-center">
              Address
            </label>
            <div className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 cursor-not-allowed">
              {formData.clientAddress || "Not provided"}
            </div>
          </div>
        </div>

        {/* Location information row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">City</label>
            <div className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 text-sm cursor-not-allowed">
              {formData.clientCity || "Not provided"}
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">State/Province</label>
            <div className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 text-sm cursor-not-allowed">
              {formData.clientState || "Not provided"}
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Country</label>
            <div className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 text-sm cursor-not-allowed">
              {formData.clientCountry || "Not provided"}
            </div>
          </div>
        </div>
      </div>

      {/* Information Card */}
      <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-200 rounded-r-lg">
        <h4 className="font-semibold mb-1">How This Works</h4>
        <p className="text-sm">
          You're telling us about a package you're expecting to receive from either Ghana or USA. We'll help coordinate its delivery to you. 
          Your contact information is pre-filled from your account. Just select the origin country and provide the city.
        </p>
      </div>
    </div>
  );
};

export default PackageOriginForm;
