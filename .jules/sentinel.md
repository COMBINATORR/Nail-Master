## Security Learnings & Vulnerability Patterns
* No security vulnerabilities were found or patched during this task.
* When executing node scripts directly, ensure you use the `.cjs` extension when the project specifies `"type": "module"` in `package.json`.
* Avoid mutating the original static data while refactoring and extracting it to a separate file, so as to avoid introducing subtle data regressions.
