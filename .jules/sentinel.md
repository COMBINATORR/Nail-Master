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
