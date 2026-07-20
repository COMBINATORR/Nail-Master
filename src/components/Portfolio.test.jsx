import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Portfolio } from './Portfolio';
import { works } from '../data/works';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, fallback) => fallback || key,
  }),
}));

describe('Portfolio', () => {
  beforeEach(() => {
    // Predictable width/offset for slider math
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 1000,
      height: 400,
      top: 0,
      left: 0,
      bottom: 400,
      right: 1000,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial state correctly', () => {
    render(<Portfolio />);

    expect(screen.getByText('portfolioTitle')).toBeInTheDocument();
    expect(screen.getByText('portfolioSubtitle')).toBeInTheDocument();

    works.forEach((w) => {
      expect(screen.getAllByText(w.titleKey).length).toBeGreaterThan(0);
    });

    expect(screen.getByText('beforeText')).toBeInTheDocument();
    expect(screen.getByText('afterText')).toBeInTheDocument();
  });

  it('changes active work when clicking on a tab', () => {
    render(<Portfolio />);

    expect(screen.getAllByText(works[0].titleKey).length).toBe(2);

    fireEvent.click(screen.getAllByText(works[1].titleKey)[0]);

    expect(screen.getAllByText(works[1].titleKey).length).toBe(2);
  });

  it('handles drag interactions on the slider via mouse events', () => {
    render(<Portfolio />);

    // Events are bound on the slider root (ref container)
    const sliderContainer = screen.getByTestId('slide-line').parentElement;
    const slideLine = screen.getByTestId('slide-line');

    expect(slideLine.style.left).toBe('50%');

    fireEvent.mouseDown(sliderContainer, { clientX: 0, button: 0 });

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 250 }));
    });
    expect(slideLine.style.left).toBe('25%');

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 1500 }));
    });
    expect(slideLine.style.left).toBe('100%');

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: -500 }));
    });
    expect(slideLine.style.left).toBe('0%');

    act(() => {
      window.dispatchEvent(new MouseEvent('mouseup'));
    });

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 500 }));
    });
    expect(slideLine.style.left).toBe('0%');
  });

  it('handles drag interactions on the slider via touch events', () => {
    render(<Portfolio />);

    const sliderContainer = screen.getByTestId('slide-line').parentElement;
    const slideLine = screen.getByTestId('slide-line');

    expect(slideLine.style.left).toBe('50%');

    fireEvent.touchStart(sliderContainer, { touches: [{ clientX: 0 }] });

    act(() => {
      // jsdom TouchEvent may not carry touches reliably — use fireEvent when available
      fireEvent.touchMove(window, { touches: [{ clientX: 750 }] });
    });

    // If fireEvent didn't update (window target), fall back to synthetic with touches
    if (slideLine.style.left === '50%') {
      act(() => {
        const evt = new Event('touchmove', { bubbles: true });
        Object.defineProperty(evt, 'touches', {
          value: [{ clientX: 750 }],
        });
        window.dispatchEvent(evt);
      });
    }

    expect(slideLine.style.left).toBe('75%');

    act(() => {
      fireEvent.touchEnd(window);
    });
  });
});
