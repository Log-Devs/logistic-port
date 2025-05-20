import { useState, useCallback } from "react";

export function useShipmentForm<T>(initialFormData: T) {
	const [formData, setFormData] = useState(initialFormData);
	
	// Handler for form input changes
	const handleInputChange = useCallback((
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;

		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
			// Reset recipient name if ID is being used and changes, or if switching modes
			...(name === "recipientKnowsId" && {
				recipientName: "",
				recipientId: "",
			}),
		}));
	}, []);

	// Reset form to initial state
	const resetForm = useCallback(() => {
		setFormData(initialFormData);
	}, [initialFormData]);
	
	return { formData, setFormData, handleInputChange, resetForm };
}
