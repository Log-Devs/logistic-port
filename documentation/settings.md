# Settings Components Documentation

## Overview

This document outlines the implementation of the settings pages in the Logistics Port application, including the Account, Notification, Preferences, and Security settings components. All components follow a consistent design pattern and support dark mode.

## Components Structure

### 1. PreferencesSettings

- **Path**: `/app/client/components/settings/PreferencesSettings.tsx`
- **Features**:
  - Dark mode toggle implementation
  - Consistent header styling with icon
  - Responsive layout
  - Border separators between sections

### 2. NotificationSettings

- **Path**: `/app/client/components/settings/NotificationSettings.tsx`
- **Features**:
  - Toggle switches for different notification types:
    - Email notifications
    - SMS notifications
    - Marketing communications
  - Description text under each option
  - Consistent styling with other settings pages

### 3. SecuritySettings

- **Path**: `/app/client/components/settings/SecuritySettings.tsx`
- **Features**:
  - Password management
  - Two-factor authentication toggle
  - Security preferences
  - Form validation for password fields

### 4. AccountSettings

- **Path**: `/app/client/components/settings/AccountSettings.tsx`
- **Features**:
  - Basic user information management
  - Form fields:
    - Full Name
    - Email
    - Phone Number
    - Country
    - City
    - Address
    - ZIP Code
    - Landmark (optional)
  - Form state management with pre-populated data
  - Real-time form updates

## Styling Patterns

### Header Style

```tsx
<div className="flex text-xl font-semibold mb-2">
  <Icon className="text-2xl mr-3" />
  <h2>Component Title</h2>
</div>
```

### Form Field Pattern

```tsx
<div className="border-b border-b-gray-300 py-3">
  <label className="block text-md font-semibold mb-2">Field Label</label>
  <p className="text-gray-400 mb-2">Description text</p>
  <input className="w-full rounded-lg border border-gray-400 ..." />
</div>
```

### Dark Mode Support

- All components use dark mode classes:
  - `dark:text-gray-400`
  - `dark:bg-gray-800`
  - `dark:border-gray-700`

### Button Style

```tsx
className =
  "px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:text-primary border-2 border-primary hover:border-2 transition-colors";
```

## Implementation Details

### Form State Management

- Uses React's useState for form data
- Initial values from `initialFormData` in `/lib/constants.ts`
- Proper input change handlers
- Form submission handling

### State Management Example

```tsx
const [formData, setFormData] = useState(initialFormData);

const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Handle form submission
  console.log("Form submitted:", formData);
};
```

### Form Field Integration

```tsx
<input
  type="text"
  id="fieldName"
  name="fieldName"
  required
  value={formData.fieldName}
  onChange={onInputChange}
  placeholder="Enter value"
  className="w-full rounded-lg border border-gray-400 dark:border-gray-700 ..."
/>
```

### Initial Data Integration

- Form fields are automatically populated from `initialFormData`
- Each field is connected to the form state
- Changes are tracked in real-time
- Form submission captures the complete updated state

## Common Features

1. **Header Section**

   - Icon + Title
   - Description text
   - Consistent spacing

2. **Form Layout**

   - Responsive grid system
   - Proper spacing between fields
   - Clear visual hierarchy

3. **Input Fields**

   - Consistent styling
   - Dark mode support
   - Focus states
   - Placeholder text
   - Required field indicators

4. **Submit Buttons**
   - Primary/Secondary color scheme
   - Hover effects
   - Consistent positioning

## Usage

The settings components are accessible through the settings page and provide a unified interface for users to manage their preferences. Each component can be imported and used independently:

```tsx
import { AccountSettings } from "@/app/client/components/settings/AccountSettings";
import { NotificationSettings } from "@/app/client/components/settings/NotificationSettings";
import { PreferencesSettings } from "@/app/client/components/settings/PreferencesSettings";
import { SecuritySettings } from "@/app/client/components/settings/SecuritySettings";
```

## Future Improvements

1. Add form validation
2. Implement API integration for saving settings
3. Add success/error notifications
4. Implement auto-save functionality
5. Add confirmation dialogs for sensitive changes
