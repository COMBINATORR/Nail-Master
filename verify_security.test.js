import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Security verification', () => {
    it('should not contain anti-debugging theater code in src/App.jsx', () => {
        const appJsxPath = path.resolve(process.cwd(), 'src', 'App.jsx');
        const content = fs.readFileSync(appJsxPath, 'utf8');

        expect(content).not.toContain('triggerDebuggerLoop');

        const debuggerRegex = /\bdebugger\s*;/g;
        let match;
        let hasActiveDebugger = false;

        while ((match = debuggerRegex.exec(content)) !== null) {
          const index = match.index;
          const lastNewline = content.lastIndexOf('\n', index);
          const line = content.substring(lastNewline + 1, index);
          if (!line.includes('//') && !line.includes('/*')) {
              hasActiveDebugger = true;
              break;
          }
        }

        expect(hasActiveDebugger).toBe(false);
    });
});
