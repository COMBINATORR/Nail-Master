### 🧹 Extracting Multiple Components
- Extracted SVG Icons from a monolithic `App.jsx` into `src/components/Icons.jsx`.
- Kept `export` for each icon.
- Added corresponding imports in `App.jsx`.
- Verified the build step, linter, and tests passed after refactoring.
- Learned to use `sed` more efficiently when manipulating lines across files instead of copying large outputs around.

### Performance Improvement: React Re-rendering on Scroll
- **Pattern:** Using `useState` attached to high-frequency events like `scroll`, `mousemove`, or `resize` inside a root-level or parent component causes cascading re-renders of the entire subtree.
- **Solution:**
  1. Isolate the state and the event listener into a dedicated leaf sub-component if possible (e.g., `ScrollProgressBar`).
  2. If passing state is necessary, use contexts or state management libraries designed to prevent unnecessary re-renders.
  3. Throttle or debounce the event handlers where immediate feedback is not strictly required.
- **Verification:** Creating tests using `@testing-library/react` wrapping components to track render counts during high-frequency events helps identify and verify such performance fixes.

### Performance Improvement: Object allocations in render cycle
- **Pattern:** Using `Object.values()`, `Object.keys()`, or other object allocation functions directly inside a React functional component's render cycle or map function, especially when the object being evaluated is static and unchanging (like a configuration or data dictionary). This causes unnecessary object creation and garbage collection overhead on every render.
- **Solution:** Extract the static object processing (`Object.values()`, mapping) outside the component scope if the data is static, or memoize it with `useMemo` if it depends on dynamic props or state.
- **Verification:** Simple benchmarks can show large improvements in execution time by caching the static values outside the component.
