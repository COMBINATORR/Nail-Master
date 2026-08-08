import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Logo3D', () => {
  let originalMatchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    vi.resetModules();
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  const setupHover = (matches) => {
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(hover: hover)' ? matches : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  };

  it('renders without hover capabilities (touch devices)', async () => {
    setupHover(false);
    const { Logo3D } = await import('./Logo3D.jsx');
    const { container } = render(<Logo3D />);

    // Should not render defs and specular layer
    expect(container.querySelector('defs')).not.toBeInTheDocument();
    expect(container.querySelector('.logo-spec-layer')).not.toBeInTheDocument();
  });

  it('renders with hover capabilities (desktop)', async () => {
    setupHover(true);
    const { Logo3D } = await import('./Logo3D.jsx');
    const { container } = render(<Logo3D />);

    // Should render defs and specular layer
    expect(container.querySelector('defs')).toBeInTheDocument();
    expect(container.querySelector('.logo-spec-layer')).toBeInTheDocument();
  });

  it('handles mouse events and updates specular light position', async () => {
    setupHover(true);
    const { Logo3D } = await import('./Logo3D.jsx');
    const { container } = render(<Logo3D />);

    const svg = container.querySelector('svg');
    const fePointLight = container.querySelector('fePointLight');

    // Mock getBoundingClientRect
    vi.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      right: 300,
      bottom: 300,
      x: 100,
      y: 100
    });

    // Initial state
    expect(fePointLight).toHaveAttribute('x', '22');
    expect(fePointLight).toHaveAttribute('y', '6');

    // Mouse enter caches rect
    fireEvent.mouseEnter(svg);

    // Mouse move updates light position
    // (clientX: 150 - left: 100) / 200 * 32 = 0.25 * 32 = 8
    // (clientY: 200 - top: 100) / 200 * 32 = 0.5 * 32 = 16
    fireEvent.mouseMove(svg, { clientX: 150, clientY: 200 });

    expect(fePointLight).toHaveAttribute('x', '8.0');
    expect(fePointLight).toHaveAttribute('y', '16.0');

    // Mouse leave resets light position
    fireEvent.mouseLeave(svg);
    expect(fePointLight).toHaveAttribute('x', '22');
    expect(fePointLight).toHaveAttribute('y', '6');
  });

  it('handles resize and scroll events by clearing cached rect', async () => {
    setupHover(true);
    const { Logo3D } = await import('./Logo3D.jsx');
    const { container } = render(<Logo3D />);

    const svg = container.querySelector('svg');
    const fePointLight = container.querySelector('fePointLight');

    const rectSpy = vi.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      right: 300,
      bottom: 300,
      x: 100,
      y: 100
    });

    fireEvent.mouseEnter(svg);
    expect(rectSpy).toHaveBeenCalledTimes(1);

    // Mouse move shouldn't call getBoundingClientRect because it's cached
    fireEvent.mouseMove(svg, { clientX: 150, clientY: 200 });
    expect(rectSpy).toHaveBeenCalledTimes(1);

    // Trigger resize
    fireEvent.resize(window);

    // Mouse move should call getBoundingClientRect again
    fireEvent.mouseMove(svg, { clientX: 150, clientY: 200 });
    expect(rectSpy).toHaveBeenCalledTimes(2);

    // Trigger scroll
    fireEvent.scroll(window);

    // Mouse move should call getBoundingClientRect again
    fireEvent.mouseMove(svg, { clientX: 150, clientY: 200 });
    expect(rectSpy).toHaveBeenCalledTimes(3);
  });
});
