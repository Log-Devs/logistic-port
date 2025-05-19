# Shipment Status Codes

This document lists all shipment status codes used in the logistics portfolio project, along with their meanings and associated UI color schemes.

---

## Status Codes Reference

| Code         | Label        | Description                                                                              | Color (Light)             | Color (Dark)                       |
|--------------|--------------|------------------------------------------------------------------------------------------|---------------------------|-------------------------------------|
| Processing   | Processing   | Shipment is being prepared and packed for dispatch.                                      | bg-yellow-100 text-yellow-800 border-yellow-200 | (same)                      |
| Awaiting     | Awaiting     | Shipment is ready and waiting for pickup or carrier assignment.                          | bg-blue-100 text-blue-800 border-blue-200   | (same)                      |
| In Transit   | In Transit   | Shipment is on the way to its destination.                                               | bg-purple-100 text-purple-800 border-purple-200 | (same)                      |
| Delayed      | Delayed      | Shipment has been delayed due to unforeseen circumstances.                               | bg-red-100 text-red-800 border-red-200      | (same)                      |
| Delivered    | Delivered    | Shipment has arrived at its destination and was received by the recipient.               | bg-green-100 text-green-800 border-green-200 | (same)                      |
| Canceled     | Canceled     | Shipment was canceled before completion.                                                 | bg-gray-100 text-gray-800 border-gray-200   | (same)                      |

---

## Usage
- These codes are used throughout the application for shipment tracking, status badges, and UI color coding.
- For any updates, ensure both the codebase and this documentation are kept in sync.

---

## Example

```
{
  status: "In Transit",
  label: "In Transit",
  description: "Shipment is on the way to its destination.",
  colorClass: "bg-purple-100 text-purple-800 border-purple-200"
}
```

---

For more details, see the source files:
- `app/client/components/AwaitingShipmentDetail.tsx`
- `app/client/components/AwaitingShipmentTable.tsx`
- `lib/status-color-map.ts`
- `lib/logistics-statuses.ts`

---

*This file is auto-generated and maintained for developer and designer reference.*
