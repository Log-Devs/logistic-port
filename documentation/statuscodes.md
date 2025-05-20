# Shipment Status Codes (Updated)

This document defines the shipment status codes, their meanings, and their usage in the logistics portfolio project. It reflects the latest business logic and UI requirements.

---

## Status Codes Reference

| Code        | Label      | Description                                                                                                          | Color (Light)                                  | Color (Dark)                   |
|-------------|------------|----------------------------------------------------------------------------------------------------------------------|------------------------------------------------|-------------------------------|
| Pending     | Pending    | User has filled a form to submit a good. The shipment is awaiting initial warehouse check-in or pickup.               | bg-yellow-100 text-yellow-800 border-yellow-200 | (same)                        |
| Received    | Received   | Warehouse admin has checked in the product after it was brought or picked up and processed at the warehouse.          | bg-blue-100 text-blue-800 border-blue-200       | (same)                        |
| In Transit  | In Transit | The good is packed and has left the warehouse; it is currently on the way to the destination country.                 | bg-purple-100 text-purple-800 border-purple-200 | (same)                        |
| Arrived     | Arrived    | Shipment has reached the destination country but has not yet been delivered to the recipient.                         | bg-green-100 text-green-800 border-green-200    | (same)                        |
| Delivered   | Delivered  | Shipment has been delivered to the recipient.                                                                        | bg-gray-100 text-gray-800 border-gray-200       | (same)                        |

---

## Awaiting Shipments Logic
- **Only shipments with status:** `Pending`, `Received`, `In Transit`, or `Arrived` **should appear in the Awaiting Shipments view.**
- **Delivered** shipments should NOT appear in the Awaiting Shipments view.

---

## Usage
- These codes are used for shipment tracking, status badges, and UI color coding.
- Update both the codebase and this documentation if the logic changes.

---

## Example

```js
{
  status: "Received",
  label: "Received",
  description: "Warehouse admin has checked in the product after it was brought or picked up and processed at the warehouse.",
  colorClass: "bg-blue-100 text-blue-800 border-blue-200"
}
```

---

## Developer Reference
- `app/client/components/AwaitingShipmentDetail.tsx`
- `app/client/components/AwaitingShipmentTable.tsx`
- `lib/status-color-map.ts`
- `lib/logistics-statuses.ts`

---

*This file is auto-generated and maintained for developer and designer reference. Please keep it up to date with business logic changes.*
