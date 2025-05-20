import React from "react";

interface FormData {
	recipientName?: string;
	recipientAddress?: string;
	recipientPhone?: string;
	recipientCountry?: string;
	recipientPhoneCountryCode?: string;
	recipientId?: string;
	recipientKnowsId?: boolean;
	recipientType?: string;
	recipientState?: string;
	recipientCity?: string;
	recipientZip?: string;
	recipientEmail?: string;
    recipientLandmark?: string;
}

interface AddressSuggestion {
	display_name: string;
	lat: string;
	lon: string;
	address?: {
		[key: string]: string;
	};
}

interface RecipientFormProps {
    formData: FormData;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	addressLoading: boolean;
	addressError: string | null;
	onSuggestionSelect: (suggestion: AddressSuggestion) => void;
	suggestionIndex: number;
	// highlightMatch: (suggestion: AddressSuggestion, input: string) => React.ReactNode;
	onAddressInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onAddressKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	addressSuggestions: AddressSuggestion[];
}

const RecipientForm: React.FC<RecipientFormProps> = ({
    formData,
    onInputChange,
	onAddressInput,
	onAddressKeyDown,
	addressSuggestions,
	addressLoading,
	addressError,
	suggestionIndex,

}) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <h2 className="text-2xl text-[#1A2B6D] font-bold">Recipient Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="font-semibold">
              Full Name <span className="text-primary text-lg">*</span>
            </label>
            <input
              type="text"
              id="recipientName"
              name="recipientName"
              required
              value={formData.recipientName}
              onChange={onInputChange}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="recipientEmail" className="font-semibold">
              Email <span className="text-primary text-lg">*</span>
            </label>
            <input
              type="email"
              id="recipientEmail"
              name="recipientEmail"
              required
              value={formData.recipientEmail}
              onChange={onInputChange}
              placeholder="your.email@example.com"
              className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="recipientPhone" className="font-semibold">
              Phone Number <span className="text-primary text-lg">*</span>
            </label>
            <input
              type="tel"
              id="recipientPhone"
              name="recipientPhone"
              required
              value={formData.recipientPhone}
              onChange={onInputChange}
              placeholder="(233) 245-678-901"
              className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="recipientCountry" className="font-semibold">
                Country <span className="text-primary text-lg">*</span>
              </label>
              <input
                type="text"
                id="recipientCountry"
                name="recipientCountry"
                required
                value={formData.recipientCountry}
                onChange={onInputChange}
                placeholder="Enter your country"
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="recipientCity" className="font-semibold">
                City <span className="text-primary text-lg">*</span>
              </label>
              <input
                type="text"
                id="recipientCity"
                name="recipientCity"
                required
                value={formData.recipientCity}
                onChange={onInputChange}
                placeholder="Enter your city"
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="recipientAddress" className="font-semibold">
              Address <span className="text-primary text-lg">*</span>
            </label>

            <div className="relative">
              <input
                type="text"
                id="recipientAddress"
                name="recipientAddress"
                required
                value={formData.recipientAddress}
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
              <label htmlFor="recipientZip" className="font-semibold">
                Zip Code <span className="text-primary text-lg">*</span>
              </label>
              <input
                type="text"
                id="recipientZip"
                name="recipientZip"
                required
                value={formData.recipientZip}
							onChange={onInputChange}
							placeholder="Enter your ZIP/postal code"
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="recipientLandmark" className="font-semibold">
                Closest Landmark
              </label>
              <input
                type="text"
                id="recipientLandmark"
                name="recipientLandmark"
                value={formData.recipientLandmark}
                onChange={onInputChange}
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>
        </div>
    </div>
  );
};

export default RecipientForm;
