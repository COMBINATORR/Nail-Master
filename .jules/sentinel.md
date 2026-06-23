## 2025-02-12 - Added Content Security Policy (CSP)
**Vulnerability:** The application was missing a Content-Security-Policy (CSP) header, which is a critical security header that helps mitigate Cross-Site Scripting (XSS) and data injection attacks by restricting the sources from which content can be loaded.
**Learning:** The application is a standard Vite/React single-page application. Since it's a static site, adding a `<meta http-equiv="Content-Security-Policy">` tag to `index.html` is an effective way to implement CSP. We need to allow Google Fonts, Leaflet map tiles from CartoCDN, and inline scripts/styles for React/Vite development (and potentially build tools).
**Prevention:** Always include a CSP header (or meta tag for static sites) in new projects to establish a baseline defense against XSS.

## 2024-05-15 - [Security Theater Removal]
**Vulnerability:** Found extensive security theater implementation in `src/App.jsx` (disabling context menus, copy-paste, text selection, throwing debugger traps, blocking inspect element shortcuts).
**Learning:** These client-side "protections" provide zero real security against determined attackers. They only degrade the experience for legitimate users and developers, making the site less accessible and harder to maintain. The real logic and API calls are still visible in network requests.
**Prevention:** Avoid implementing client-side obfuscation or disabling native browser features (like context menus or selection). Focus on real security measures like server-side validation, proper CORS, and secure authentication instead of trying to "hide" the frontend code.

## 2025-02-14 - Verification of Anti-Debugging Code Removal
**Vulnerability:** Addressed the absence of automated tests to ensure "security theater" code is not reintroduced.
**Learning:** Adding test-driven checks for common anti-patterns like `debugger` statements disguised as traps provides a regression safety net. When fixing a vulnerability, adding a test ensures the issue stays fixed.
**Prevention:** Implement unit tests that scan source code or output for known anti-patterns, ensuring continuous compliance with security policies.
