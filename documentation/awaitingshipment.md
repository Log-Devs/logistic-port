# Awaiting Shipment Feature Documentation

## Overview

This document describes the implementation and enhancements made to the Awaiting Shipment feature in TransGlobalFreight’s Next.js app. The feature provides a user interface for viewing, summarizing, and managing shipments that are currently awaiting processing or delivery.

## Key Changes & Components

### 1. AwaitingShipmentCard Component

- **Purpose:** Encapsulates the UI for summary cards (e.g., Total Awaiting, Pending, Received) on the Awaiting Shipments page.
- **Color Customization:**
  - Introduced a custom tetiary color (`#1A2B6D`) for the card heading in light mode.
  - In dark mode, the heading uses a lighter blue (`#AEB8D0`) for better contrast and accessibility.
- **Reusability:** The card is now a standalone component, making the codebase cleaner and more maintainable.

### 2. AwaitingShipmentTable Component

- **Purpose:** Displays a table of all awaiting shipments, including details such as ID, recipient, route, estimated arrival, items, weight, and status.
- **Status Styling:**
  - Pending and Received statuses are color-coded for clarity, with support for both light and dark themes.

### 3. Color Variables

- Added a CSS variable `--tetiary` to the global stylesheet for consistent use of the custom blue color across the app.
- Utilized Tailwind's arbitrary value syntax to ensure the tetiary color is applied correctly in both light and dark modes.

## Summary of Work

- Refactored card markup into a reusable component (`AwaitingShipmentCard`).
- Added and documented a custom tetiary color for branding and visual consistency.
- Improved dark mode support for all relevant UI elements.
- Enhanced code maintainability and UI consistency across the Awaiting Shipments feature.

---

**Last updated:** May 18, 2025
