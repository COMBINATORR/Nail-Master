import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AnimatedGradientText } from './AnimatedGradientText';

describe('AnimatedGradientText', () => {
  it('renders children twice for glow and fill effects', () => {
    render(<AnimatedGradientText>Gradient Text</AnimatedGradientText>);
    const elements = screen.getAllByText('Gradient Text');
    expect(elements).toHaveLength(2);
  });

  it('applies the default "agt" class', () => {
    const { container } = render(<AnimatedGradientText>Text</AnimatedGradientText>);
    const spanElement = container.firstChild;
    expect(spanElement.className).toContain('agt');
  });

  it('applies custom className in addition to default class', () => {
    const { container } = render(
      <AnimatedGradientText className="custom-class">Text</AnimatedGradientText>
    );
    const spanElement = container.firstChild;
    expect(spanElement.className).toContain('agt');
    expect(spanElement.className).toContain('custom-class');
  });

  it('has aria-hidden="true" on the glow element', () => {
    const { container } = render(<AnimatedGradientText>Text</AnimatedGradientText>);
    const glowElement = container.querySelector('.agt__glow');
    expect(glowElement).not.toBeNull();
    expect(glowElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('has a fill element', () => {
    const { container } = render(<AnimatedGradientText>Text</AnimatedGradientText>);
    const fillElement = container.querySelector('.agt__fill');
    expect(fillElement).not.toBeNull();
  });
});
