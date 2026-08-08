### Performance Optimization: Polling vs Events
* ⚡ **Issue**: `setInterval` polling for a global object (e.g., `window.L`) wastes CPU cycles and triggers unnecessary function executions, impacting battery life on mobile devices and blocking main thread execution time.
* 🛡️ **Solution**: Replace `setInterval` polling with `window.addEventListener('load', ...)` when detecting objects loaded via non-deferred script tags.
* 🎯 **Why**: Using the browser's native `load` event guarantees execution exactly when resources finish loading, turning O(n) polling cycles into an O(1) event callback.
