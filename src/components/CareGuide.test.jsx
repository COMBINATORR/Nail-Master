import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CareGuide } from './CareGuide';
import * as reactI18next from 'react-i18next';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}));

// Mock useTheme hook
vi.mock('../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'dark'
  })
}));

// Mock BorderGlow to simplify rendering
vi.mock('./ui/BorderGlow', () => ({
  default: ({ children }) => <div data-testid="border-glow">{children}</div>
}));

describe('CareGuide', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementation
    reactI18next.useTranslation.mockReturnValue({
      t: (key) => key,
      i18n: { language: 'ru' }
    });
  });

  it('renders correctly with default active tab (manicure)', () => {
    render(<CareGuide />);

    expect(screen.getByText('careTitle')).toBeInTheDocument();
    expect(screen.getByText('careSubtitle')).toBeInTheDocument();

    const manicureTab = screen.getByRole('button', { name: 'manicure' });
    expect(manicureTab).toBeInTheDocument();
    expect(manicureTab).toHaveClass('active-tactile-pill');

    expect(screen.getByText('Важно')).toBeInTheDocument();
    expect(screen.getByText('Защита')).toBeInTheDocument();
    expect(screen.getByText('Уход')).toBeInTheDocument();
    expect(screen.getByText('Сроки')).toBeInTheDocument();
  });

  it('switches tabs correctly', () => {
    render(<CareGuide />);

    const pedicureTab = screen.getByRole('button', { name: 'pedicure' });
    fireEvent.click(pedicureTab);

    expect(pedicureTab).toHaveClass('active-tactile-pill');

    expect(screen.getByText('Свобода')).toBeInTheDocument();
    expect(screen.getByText('Мягкость')).toBeInTheDocument();
    expect(screen.getByText('Гигиена')).toBeInTheDocument();
    expect(screen.getByText('Форма')).toBeInTheDocument();
  });

  it('falls back to ru data if language is not supported', () => {
    // Override the mock for this specific test
    reactI18next.useTranslation.mockReturnValue({
      t: (key) => key,
      i18n: { language: 'unsupported' }
    });

    render(<CareGuide />);

    // Should still render ru tips as fallback
    expect(screen.getByText('Важно')).toBeInTheDocument();
    expect(screen.getByText('Защита')).toBeInTheDocument();
  });
});
