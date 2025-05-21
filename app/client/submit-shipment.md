# Submit Shipment Flow: Event Handler Best Practices

## [2025-05-21] TypeScript Event Handler Fix in SubmitShipmentPage

### Issue
A TypeScript error occurred in `SubmitShipmentPage` due to assigning a form submit handler (`(e: React.FormEvent<HTMLFormElement>) => Promise<void>`) to a button's `onClick` prop, which expects a mouse event handler (`MouseEventHandler<HTMLButtonElement>`). The two event types are incompatible, leading to the following error:

```
Type '(e: React.FormEvent<HTMLFormElement>) => Promise<void>' is not assignable to type 'MouseEventHandler<HTMLButtonElement>'.
  Types of parameters 'e' and 'event' are incompatible.
    Type 'MouseEvent<HTMLButtonElement, MouseEvent>' is not assignable to type 'FormEvent<HTMLFormElement>'.
      Types of property 'currentTarget' are incompatible.
        Type 'EventTarget & HTMLButtonElement' is not assignable to type 'EventTarget & HTMLFormElement'.
```

### Root Cause
- `<form onSubmit={handleSubmit}>` expects `handleSubmit` to receive a `FormEvent<HTMLFormElement>`.
- `<button onClick={handleSubmit}>` expects `handleSubmit` to receive a `MouseEvent<HTMLButtonElement>`.
- These event types are not interchangeable.

### Solution
- Attach the submit handler to the form: `<form onSubmit={handleSubmit}>`.
- Use `<button type="submit">Submit Shipment</button>` for submission, with no `onClick` prop.
- This ensures the correct event type is passed, eliminating the TypeScript error and following React/TypeScript best practices.

### Example (Fixed)
```tsx
<form onSubmit={handleSubmit}>
  {/* form fields... */}
  <button type="submit">Submit Shipment</button>
</form>
```

### Best Practices
- Always use `onSubmit` on the `<form>` for submission logic.
- Use `type="submit"` on the button to trigger form submission.
- Avoid using `onClick` for form submission unless you specifically need mouse event details.
- Document these decisions inline and in project docs for maintainability.

### Change Log
- [2025-05-21] Removed `onClick={handleSubmit}` from the submit button in `SubmitShipmentPage`. The form now uses `onSubmit={handleSubmit}` and the button is type `submit` only. All code is fully commented and follows clean code, OOP, and documentation best practices.

---

For more details, see the code comments in `app/client/submit-shipment/page.tsx` and the main README documentation.
