import {DUMMY_USER} from "@/app/app-config"

export const DELIVERY_TYPES = [
	{ id: "ground", label: "Ground" },
	{ id: "air", label: "Air" },
	{ id: "sea", label: "Sea" },
	{ id: "express", label: "Express" }
];

export const PACKAGE_TYPES = [
	{ id: "box", label: "Box" },
	{ id: "envelope", label: "Envelope" },
	{ id: "pallet", label: "Pallet" },
	{ id: "tube", label: "Tube" }
];

export const initialFormData = {
	senderName: DUMMY_USER.fullName,
	senderAddress: DUMMY_USER.address,
	senderContact: DUMMY_USER.email,
	senderEmail: DUMMY_USER.email,
	senderPhone: DUMMY_USER.phone,
	senderCity: DUMMY_USER.city,
	senderState: DUMMY_USER.state,
	senderZip: DUMMY_USER.zip,
	senderCountry: DUMMY_USER.country,
	senderLandmark: "",
	recipientName: DUMMY_USER.fullName,
	recipientAddress: DUMMY_USER.address,
	recipientContact: DUMMY_USER.email,
	recipientEmail: DUMMY_USER.email,
	recipientPhone: DUMMY_USER.phone,
	recipientCity: DUMMY_USER.city,
	recipientState: DUMMY_USER.state,
	recipientZip: DUMMY_USER.zip,
	recipientKnowsId: false,
	recipientCountry: "",
	freightType: "",
	packageType: "",
	packageCategory: "",
	packageDescription: "",
	packageNote: "", // Added packageNote with a default value
	recipientPhoneCountryCode: '', // Added missing property
	recipientId: '', // Added missing property
	packageValue: '',
	packageWeight: '', // Changed from 0 (number) to '' (string) to match FormData interface
};

export const initialUserData = {
	senderName: DUMMY_USER.fullName,
	senderAddress: DUMMY_USER.address,
	// senderContact represents the primary contact method (e.g., phone number)
	senderContact: DUMMY_USER.phone,
	// senderEmail represents the email address of the sender
	senderEmail: DUMMY_USER.email,
	senderPhone: DUMMY_USER.phone,
	senderCity: DUMMY_USER.city,
	senderState: DUMMY_USER.state,
	senderZip: DUMMY_USER.zip,
	senderCountry: DUMMY_USER.country,
}