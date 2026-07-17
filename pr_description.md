🎯 **What:**
Added a dedicated unit test in `src/App.test.jsx` to verify that `playPowerDown` correctly catches and suppresses errors thrown by `AudioContext` methods (e.g., `createOscillator`). This addresses a gap where the `try...catch` block around the Web Audio API initialization lacked corresponding test coverage for method-level failures.

📊 **Coverage:**
The new test explicitly covers the error path when `createOscillator()` throws an exception, ensuring the application gracefully recovers and continues rendering the expected UI (such as the gravity restore button) without crashing.

✨ **Result:**
Improved test coverage for edge cases involving browser media APIs, increasing confidence that audio failures will not interrupt core user workflows.
