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
    // Mock getBoundingClientRect to provide a predictable width and left offset
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 1000,
      height: 400,
      top: 0,
      left: 0,
      bottom: 400,
      right: 1000,
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial state correctly', () => {
    render(<Portfolio />);

    // Check that title is rendered
    expect(screen.getByText('portfolioTitle')).toBeInTheDocument();
    expect(screen.getByText('portfolioSubtitle')).toBeInTheDocument();

    // Check that works tabs are rendered
    works.forEach(w => {
      expect(screen.getAllByText(w.titleKey).length).toBeGreaterThan(0);
    });

    // Check before/after labels
    expect(screen.getByText('beforeText')).toBeInTheDocument();
    expect(screen.getByText('afterText')).toBeInTheDocument();
  });

  it('changes active work when clicking on a tab', () => {
    render(<Portfolio />);

    // Initial active work (index 0) title is visible in details section
    const titleElementsInitial = screen.getAllByText(works[0].titleKey);
    expect(titleElementsInitial.length).toBe(2); // One in tabs, one in details

    // The second tab is for index 1
    const secondTab = screen.getAllByText(works[1].titleKey)[0];
    fireEvent.click(secondTab);

    // Check if the title in details section changed
    const titleElementsAfter = screen.getAllByText(works[1].titleKey);
    expect(titleElementsAfter.length).toBe(2);
  });

  it('handles drag interactions on the slider via mouse events', () => {
    render(<Portfolio />);

    const sliderContainer = screen.getByText('afterText').parentElement;

    // 50% initial position
    const slideLine = screen.getByTestId('slide-line');

    expect(slideLine.style.left).toBe('50%');

    // Mousedown to start dragging
    fireEvent.mouseDown(sliderContainer, { clientX: 0, button: 0 });

    // Trigger mousemove on window
    act(() => {
      const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 250 });
      window.dispatchEvent(mouseMoveEvent);
    });

    expect(slideLine.style.left).toBe('25%'); // 250 / 1000 * 100

    // Trigger mousemove exceeding boundaries
    act(() => {
      const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 1500 });
      window.dispatchEvent(mouseMoveEvent);
    });

    expect(slideLine.style.left).toBe('100%');

    act(() => {
      const mouseMoveEvent = new MouseEvent('mousemove', { clientX: -500 });
      window.dispatchEvent(mouseMoveEvent);
    });

    expect(slideLine.style.left).toBe('0%');

    // Trigger mouseup
    act(() => {
      const mouseUpEvent = new MouseEvent('mouseup');
      window.dispatchEvent(mouseUpEvent);
    });

    // Subsequent mousemove should not affect the slider
    act(() => {
      const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 500 });
      window.dispatchEvent(mouseMoveEvent);
    });

    expect(slideLine.style.left).toBe('0%');
  });

  it('handles drag interactions on the slider via touch events', () => {
    render(<Portfolio />);

    const sliderContainer = screen.getByText('afterText').parentElement;
    const slideLine = screen.getByTestId('slide-line');

    expect(slideLine.style.left).toBe('50%');

    // TouchStart to start dragging
    fireEvent.touchStart(sliderContainer, { touches: [{ clientX: 0 }] });

    // Trigger touchmove on window
    act(() => {
      const touchMoveEvent = new TouchEvent('touchmove', { touches: [{ clientX: 750 }] });
      window.dispatchEvent(touchMoveEvent);
    });

    expect(slideLine.style.left).toBe('75%'); // 750 / 1000 * 100

    // Trigger touchend
    act(() => {
      const touchEndEvent = new TouchEvent('touchend');
      window.dispatchEvent(touchEndEvent);
    });
  });
});
