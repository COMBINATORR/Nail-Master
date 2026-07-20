import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, act, screen, waitFor } from '@testing-library/react';
import { ScrollProgressBar } from './ScrollProgressBar';

describe('ScrollProgressBar', () => {
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => setTimeout(cb, 0));
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(clearTimeout);

    // Default mock values
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(1000);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(500);
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with 0 width initially', async () => {
    const { container } = render(<ScrollProgressBar />);
    const bar = container.firstChild;
    await waitFor(() => expect(bar).toHaveStyle({ width: '0%' }));
  });

  it('updates width on scroll', async () => {
    const { container } = render(<ScrollProgressBar />);
    const bar = container.firstChild;
    await waitFor(() => expect(bar).toHaveStyle({ width: '0%' }));

    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(250);

    act(() => {
      fireEvent.scroll(window);
    });

    // totalScroll = 1000 - 500 = 500
    // currentProgress = (250 / 500) * 100 = 50%
    await waitFor(() => expect(bar).toHaveStyle({ width: '50%' }));
  });

  it('handles zero total scroll correctly', async () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(500);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(500);
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0);

    const { container } = render(<ScrollProgressBar />);
    const bar = container.firstChild;
    await waitFor(() => expect(bar).toHaveStyle({ width: '0%' }));

    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(100);
    act(() => {
      fireEvent.scroll(window);
    });

    await waitFor(() => expect(bar).toHaveStyle({ width: '0%' }));
  });

  it('cleans up event listeners on unmount', async () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ScrollProgressBar />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
