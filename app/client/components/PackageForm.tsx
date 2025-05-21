import React from "react";

const DELIVERY_TYPES = [
  { id: "ground", label: "Ground" },
  { id: "air", label: "Air" },
  { id: "sea", label: "Sea" },
  { id: "express", label: "Express" }
];

const PACKAGE_TYPES = [
  { id: "box", label: "Box" },
  { id: "envelope", label: "Envelope" },
  { id: "pallet", label: "Pallet" },
  { id: "tube", label: "Tube" }
];

interface PackageFormProps {
  formData: {
    freightType: string;
    packageType: string;
    packageDescription: string;
  };
  onInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onPackageDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PackageForm: React.FC<PackageFormProps> = ({
  formData,
  onInputChange,
  onPackageDescriptionChange,
}) => {
  return (
    <div>
      <div>        <div className="flex items-center mb-6">
        <h2 className="text-2xl text-[#1A2B6D] dark:text-[#AEB8D0] font-bold">Package Details</h2>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-2 mb-2">
              <label htmlFor="deliveryType" className="font-semibold">
                Delivery Type <span className="text-primary text-lg">*</span>
              </label>
              <select
                id="freightType"
                name="freightType"
                value={formData.freightType || ""}
                onChange={onInputChange}
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                required
              >
                <option value="">Select delivery type</option>
                {DELIVERY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="packageType" className="font-semibold">
                Package Type <span className="text-primary text-lg">*</span>
              </label>
              <select
                id="packageType"
                name="packageType"
                value={formData.packageType || ""}
                onChange={onInputChange}
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                required
              >
                <option value="">Select package type</option>
                {PACKAGE_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-2 row-span-2">
            <label htmlFor="packageDescription" className="font-semibold">
              Package Description <span className="text-primary text-lg">*</span>
            </label>
            <textarea
              id="packageDescription"
              name="packageDescription"
              value={formData.packageDescription || ""}
              onChange={onInputChange}
              className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Describe the package contents"
              rows={4}
              required
            />
          </div>
        </div>
      </div>
    </div >
  );
};

export default PackageForm;