import { describe, it, expect } from 'vitest';
import { getVisibleWindow, DEFAULT_MAX_VISIBLE } from './interactive-image-accordion';

describe('getVisibleWindow', () => {
  it('shows all items when count ≤ maxVisible', () => {
    expect(getVisibleWindow(0, 5, 5)).toEqual({ start: 0, end: 5 });
    expect(getVisibleWindow(2, 3, 5)).toEqual({ start: 0, end: 3 });
  });

  it('keeps a window of maxVisible when list is longer', () => {
    expect(getVisibleWindow(0, 20, 5)).toEqual({ start: 0, end: 5 });
    expect(getVisibleWindow(10, 20, 5)).toEqual({ start: 8, end: 13 });
    expect(getVisibleWindow(19, 20, 5)).toEqual({ start: 15, end: 20 });
  });

  it('uses DEFAULT_MAX_VISIBLE of 5', () => {
    expect(DEFAULT_MAX_VISIBLE).toBe(5);
  });
});
