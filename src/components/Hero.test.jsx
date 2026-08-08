import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from './Hero';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('Hero', () => {
  it('renders correctly with translation keys', () => {
    render(<Hero scrollToServices={vi.fn()} />);

    expect(screen.getByText('heroSuperTitle')).toBeInTheDocument();
    expect(screen.getByText(/heroTitlePre/)).toBeInTheDocument();

    // AnimatedGradientText renders the children twice (glow and fill)
    expect(screen.getAllByText('heroTitleHighlight').length).toBe(2);

    expect(screen.getByText(/heroTitlePost/)).toBeInTheDocument();
    expect(screen.getByText('heroSubtitle')).toBeInTheDocument();
    expect(screen.getByText(/heroDesc/)).toBeInTheDocument();
    expect(screen.getByText('heroCta')).toBeInTheDocument();
  });

  it('calls scrollToServices when CTA button is clicked', () => {
    const scrollToServicesMock = vi.fn();
    render(<Hero scrollToServices={scrollToServicesMock} />);

    const ctaButton = screen.getByText('heroCta');
    fireEvent.click(ctaButton);

    expect(scrollToServicesMock).toHaveBeenCalledTimes(1);
  });
});
