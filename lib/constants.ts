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

/**
 * [2025-05-26] Updated initialFormData to support the simplified shipment request flow.
 * Added client and origin fields, removed sender fields as per admin requirements.
 * The new flow focuses only on package details and origin, not sender information.
 * -- Cascade AI
 */
export const initialFormData = {
	// Client information (person requesting the shipment)
	clientName: DUMMY_USER.fullName,
	clientEmail: DUMMY_USER.email,
	clientPhone: DUMMY_USER.phone,
	clientAddress: DUMMY_USER.address,
	clientCity: DUMMY_USER.city,
	clientState: DUMMY_USER.state,
	clientZip: DUMMY_USER.zip,
	clientCountry: DUMMY_USER.country,
	
	// Package origin information
	originCountry: "",
	originCity: "",
	originAddress: "",
	originState: "",
	originContactName: "",
	
	// Legacy fields kept for backward compatibility
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
	
	// Package information
	freightType: "",
	packageType: "",
	packageCategory: "",
	packageDescription: "",
	packageNote: "", 
	packageValue: "",
	packageWeight: "",
	
	// System fields
	recipientPhoneCountryCode: "",
	recipientId: "",
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