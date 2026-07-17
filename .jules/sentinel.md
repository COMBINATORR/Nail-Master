### Localization Hardcoding Risk

### Localization Hardcoding Risk

**Vulnerability/Risk:**
Hardcoding language-specific ternary logic (`lang === 'en' ? ... : ...`) inside JavaScript files rather than using a dedicated i18n key-value system.

**Impact:**
- Breaks scalability when adding new languages, as developers must track down and modify hardcoded conditional blocks.
- Can lead to incorrect string fallbacks for unsupported/new languages (e.g., returning English strings for Korean users because the condition only accounted for English, Russian, and Kazakh).
- Dilutes code readability and separates translation data from localized UI logic.

**Solution:**
- Consolidate all localized strings into the dedicated localization store (e.g., `src/locales/*.json` files).
- Provide robust translation lookup mechanisms in code (e.g., a `safeT` wrapper) to decouple the UI formatting from the language switching logic.

### Performance Improvement: React Re-rendering on Scroll
- **Pattern:** Using `useState` attached to high-frequency events like `scroll`, `mousemove`, or `resize` inside a root-level or parent component causes cascading re-renders of the entire subtree.
- **Solution:**
  1. Isolate the state and the event listener into a dedicated leaf sub-component if possible (e.g., `ScrollProgressBar`).
  2. If passing state is necessary, use contexts or state management libraries designed to prevent unnecessary re-renders.
  3. Throttle or debounce the event handlers where immediate feedback is not strictly required.
- **Verification:** Creating tests using `@testing-library/react` wrapping components to track render counts during high-frequency events helps identify and verify such performance fixes.

### Code Health: Proper Error Handling for Non-Critical APIs
- **Pattern:** Using a bare `catch (err) { }` block or simply commenting out errors suppresses potentially useful debugging information.
- **Solution:** For non-critical progressive enhancements (e.g., `AudioContext` failing due to lack of user interaction or browser restrictions), instead of silencing the error entirely, use `console.warn` along with an explanatory comment. This provides visibility for developers without interrupting the user experience or cluttering `console.error` logs.
- **Verification:** Mock global objects (e.g., `window.AudioContext`) in tests to throw an error and assert that it handles gracefully without crashing the app, while also capturing the stderr/stdout to verify the warning is correctly emitted.

### Performance Improvement: Object allocations in render cycle
- **Pattern:** Using `Object.values()`, `Object.keys()`, or other object allocation functions directly inside a React functional component's render cycle or map function, especially when the object being evaluated is static and unchanging (like a configuration or data dictionary). This causes unnecessary object creation and garbage collection overhead on every render.
- **Solution:** Extract the static object processing (`Object.values()`, mapping) outside the component scope if the data is static, or memoize it with `useMemo` if it depends on dynamic props or state.
- **Verification:** Simple benchmarks can show large improvements in execution time by caching the static values outside the component.
