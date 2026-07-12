🧪 [Test] Audio Error Handling Coverage

🎯 What: Added test coverage for `playPowerUp` and `playPowerDown` in `src/App.jsx` to verify they handle audio context errors gracefully, which was an identified testing gap.

📊 Coverage: Tests the `catch (err)` blocks of both functions by mocking `window.AudioContext` to throw an error and triggering the gravity explosion sequence. Verifies no unhandled exceptions crash the component.

✨ Result: Test suite now explicitly verifies the error paths, ensuring the game/easter egg features degrade gracefully without breaking the app if audio context creation fails (e.g. strict browser policies).
