import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges basic classes', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    // eslint-disable-next-line no-constant-binary-expression
    expect(cn('class1', false && 'class2', true && 'class3')).toBe('class1 class3');
    expect(cn('class1', null, undefined, 'class2')).toBe('class1 class2');
  });

  it('merges tailwind classes correctly', () => {
    // twMerge should override px-2 py-2 with p-4
    expect(cn('px-2 py-2', 'p-4')).toBe('p-4');
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  it('handles arrays and objects via clsx', () => {
    expect(cn('class1', ['class2', 'class3'])).toBe('class1 class2 class3');
    expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
  });
});
