import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Guarantees } from './Guarantees';

// Mock translations
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock useTheme hook
vi.mock('../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'dark',
  }),
}));

// Mock BorderGlow to simplify rendering
vi.mock('./ui/BorderGlow', () => ({
  default: ({ children }) => <div data-testid="border-glow-mock">{children}</div>,
}));

// Mock getBorderGlowProps
vi.mock('./ui/borderGlowSiteProps', () => ({
  getBorderGlowProps: vi.fn().mockReturnValue({}),
}));

describe('Guarantees Component', () => {
  it('renders the section title and subtitle', () => {
    render(<Guarantees />);
    expect(screen.getByText('guaranteesTitle')).toBeInTheDocument();
    expect(screen.getByText('guaranteesSubtitle')).toBeInTheDocument();
  });

  it('renders all 4 guarantee cards with correct badges and translated content', () => {
    render(<Guarantees />);

    // Check that exactly 4 cards are rendered inside BorderGlow mock
    const borderGlows = screen.getAllByTestId('border-glow-mock');
    expect(borderGlows).toHaveLength(4);

    // Check badges
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();

    // Check titles
    expect(screen.getByText('g1Title')).toBeInTheDocument();
    expect(screen.getByText('g2Title')).toBeInTheDocument();
    expect(screen.getByText('g3Title')).toBeInTheDocument();
    expect(screen.getByText('g4Title')).toBeInTheDocument();

    // Check descriptions
    expect(screen.getByText('g1Desc')).toBeInTheDocument();
    expect(screen.getByText('g2Desc')).toBeInTheDocument();
    expect(screen.getByText('g3Desc')).toBeInTheDocument();
    expect(screen.getByText('g4Desc')).toBeInTheDocument();
  });
});
