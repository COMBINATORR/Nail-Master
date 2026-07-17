🎯 **What:** Replaced silent `catch` blocks in audio playback functions (`playPowerDown`, `playPowerUp`) with proper error logging and explanatory comments.

💡 **Why:** Silently ignoring errors makes debugging difficult. Since audio playback can be blocked by modern browser autoplay policies (e.g., if there's no prior user interaction), logging a warning helps developers understand why audio isn't playing without disrupting the user experience, improving maintainability.

✅ **Verification:**
- Validated that the app logic remains unchanged.
- Ensured tests and linters pass (`pnpm test`, `pnpm lint`).

✨ **Result:** Improved codebase observability and developer experience by exposing hidden audio playback errors.
