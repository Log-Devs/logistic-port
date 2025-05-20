import { useState } from "react";

export function useShipmentForm<T>(initialFormData: T) {
	const [formData, setFormData] = useState(initialFormData);
	// ...add more state and handlers as needed...
	return { formData, setFormData };
}
