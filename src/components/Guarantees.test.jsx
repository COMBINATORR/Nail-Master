import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Guarantees } from './Guarantees';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

// Mock useTheme
vi.mock('../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

// Mock BorderGlow to simplify tests and focus on Guarantees content
vi.mock('./ui/BorderGlow', () => ({
  default: ({ children }) => <div data-testid="mock-border-glow">{children}</div>,
}));

describe('Guarantees Component', () => {
  beforeEach(() => {
    // Setup default mock returns
    useTranslation.mockReturnValue({
      t: (key) => {
        const translations = {
          guaranteesTitle: 'Our Guarantees',
          guaranteesSubtitle: 'What we promise',
          g1Title: 'Quality',
          g1Desc: 'Top notch quality',
          g2Title: 'Speed',
          g2Desc: 'Lightning fast',
          g3Title: 'Support',
          g3Desc: '24/7 help',
          g4Title: 'Price',
          g4Desc: 'Affordable',
        };
        return translations[key] || key;
      },
    });

    useTheme.mockReturnValue({ theme: 'dark' });
  });

  it('renders section title and subtitle correctly', () => {
    render(<Guarantees />);
    expect(screen.getByText('Our Guarantees')).toBeInTheDocument();
    expect(screen.getByText('What we promise')).toBeInTheDocument();
  });

  it('renders all four guarantee cards with correct content', () => {
    render(<Guarantees />);

    // Check badges
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();

    // Check titles
    expect(screen.getByText('Quality')).toBeInTheDocument();
    expect(screen.getByText('Speed')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();

    // Check descriptions
    expect(screen.getByText('Top notch quality')).toBeInTheDocument();
    expect(screen.getByText('Lightning fast')).toBeInTheDocument();
    expect(screen.getByText('24/7 help')).toBeInTheDocument();
    expect(screen.getByText('Affordable')).toBeInTheDocument();

    // Verify 4 cards are rendered via mock-border-glow
    const glowContainers = screen.getAllByTestId('mock-border-glow');
    expect(glowContainers.length).toBe(4);
  });
});
