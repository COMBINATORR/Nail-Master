## 2026-06-21 - [Sentinel] Input Validation Enhancement
**Vulnerability:** The booking form's `name` and `phone` inputs lack validation, length limits, and sanitation.
**Learning:** This exposes the application to potentially large inputs or malformed data that could cause UI issues, resource exhaustion, or problems when formatting the WhatsApp link.
**Prevention:** Always add `maxLength` limits on user inputs and perform basic format validation before processing inputs to prevent malformed text propagation.
