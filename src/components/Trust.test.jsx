import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Trust } from './Trust';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock('../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'dark',
  }),
}));

describe('Trust', () => {
  it('renders section title and subtitle', () => {
    render(<Trust />);
    expect(screen.getByText('trustTitle')).toBeInTheDocument();
    expect(screen.getByText('trustSubtitle')).toBeInTheDocument();
  });

  it('renders all trust cards with badges and titles', () => {
    render(<Trust />);

    // Check badges
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();

    // Check titles
    expect(screen.getByText('trust1Title')).toBeInTheDocument();
    expect(screen.getByText('trust2Title')).toBeInTheDocument();
    expect(screen.getByText('trust3Title')).toBeInTheDocument();

    // Check descriptions
    expect(screen.getByText('trust1Desc')).toBeInTheDocument();
    expect(screen.getByText('trust2Desc')).toBeInTheDocument();
    expect(screen.getByText('trust3Desc')).toBeInTheDocument();
  });
});
