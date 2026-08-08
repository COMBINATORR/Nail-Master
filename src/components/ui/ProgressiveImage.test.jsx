import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProgressiveImage } from './ProgressiveImage';

describe('ProgressiveImage', () => {
  it('renders initial image with opacity 0 (blur-up state)', () => {
    render(<ProgressiveImage src="https://example.com/test.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img.className).toContain('opacity-0');
  });

  it('fades in on load (opacity-100)', () => {
    render(<ProgressiveImage src="https://example.com/test.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image');
    fireEvent.load(img);
    expect(img.className).toContain('opacity-100');
  });

  it('handles error gracefully and calls onError prop', () => {
    const onErrorMock = vi.fn();
    render(<ProgressiveImage src="https://example.com/broken.jpg" alt="Broken image" onError={onErrorMock} />);
    const img = screen.getByAltText('Broken image');
    fireEvent.error(img);
    expect(onErrorMock).toHaveBeenCalled();
  });
});
