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

// Define the structure for package category options, including color for UI
interface PackageCategoryOption {
  id: string;
  label: string;
  description: string;
  color: string; // Tailwind or hex color class
}

// Professional package categories with color and description
const PACKAGE_CATEGORIES: PackageCategoryOption[] = [
  {
    id: "fragile",
    label: "Fragile",
    description: "Items that require careful handling, such as glassware, electronics, or ceramics.",
    color: "bg-pink-100 border-pink-400 text-pink-900 dark:bg-pink-900/30 dark:text-pink-200",
  },
  {
    id: "perishable",
    label: "Perishable",
    description: "Goods that can spoil or decay, including food, flowers, and pharmaceuticals.",
    color: "bg-green-100 border-green-400 text-green-900 dark:bg-green-900/30 dark:text-green-200",
  },
  {
    id: "hazardous",
    label: "Hazardous",
    description: "Materials that are flammable, toxic, or otherwise dangerous, such as chemicals or batteries.",
    color: "bg-yellow-100 border-yellow-400 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200",
  },
  {
    id: "oversized",
    label: "Oversized",
    description: "Large or heavy items that require special handling, like furniture or machinery.",
    color: "bg-blue-100 border-blue-400 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200",
  },
  {
    id: "standard",
    label: "Standard",
    description: "Regular packages that do not require special handling.",
    color: "bg-gray-100 border-gray-400 text-gray-900 dark:bg-gray-900/30 dark:text-gray-200",
  },
];

// Extend formData to include packageCategory
interface PackageFormProps {
  formData: {
    freightType: string;
    packageType: string;
    packageCategory?: string; // Added for category
    packageDescription: string;
  };
  onInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onPackageDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

// PackageForm component for package details, including professional category selection
const PackageForm: React.FC<PackageFormProps> = ({
  formData,
  onInputChange,
  onPackageDescriptionChange,
}) => {
  // Find the selected category object for display
  const selectedCategory = PACKAGE_CATEGORIES.find(
    (cat) => cat.id === formData.packageCategory
  );
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

            {/* Package Category Dropdown */}
            <div className="space-y-2">
              <label htmlFor="packageCategory" className="font-semibold">
                Package Category <span className="text-primary text-lg">*</span>
              </label>
              <select
                id="packageCategory"
                name="packageCategory"
                value={formData.packageCategory || ""}
                onChange={onInputChange}
                className="w-full rounded-lg border border-gray-400 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                required
              >
                <option value="">Select package category</option>
                {PACKAGE_CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
            </div>

            {/* Category Detail Card */}
            {selectedCategory && (
              <div
                className={`mt-3 border-l-4 p-4 rounded-lg shadow-sm ${selectedCategory.color}`}
                aria-live="polite"
                data-testid="package-category-detail"
              >
                <div className="font-semibold text-base mb-1">
                  {selectedCategory.label}
                </div>
                <div className="text-sm">
                  {selectedCategory.description}
                </div>
              </div>
            )}

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