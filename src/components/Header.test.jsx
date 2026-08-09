import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from './Header';
import * as reactI18next from 'react-i18next';

// Mock dependencies
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('./Logo3D', () => ({
  Logo3D: () => <div data-testid="logo-3d">Logo3D</div>,
}));

vi.mock('../hooks/useTactileFeedback', () => ({
  useTactileFeedback: () => ({
    soundEnabled: true,
    toggleSound: vi.fn(),
    triggerClick: vi.fn(),
    triggerSuccess: vi.fn(),
  }),
}));

vi.mock('@/components/ui/skiper-ui/skiper99', () => ({
  AnimatedMenuIcon: ({ open }) => (
    <div data-testid="animated-menu-icon" data-open={open}>
      Menu Icon
    </div>
  ),
}));

describe('Header Component', () => {
  const mockChangeLanguage = vi.fn();
  const mockSetTheme = vi.fn();
  const mockSetIsMobileMenuOpen = vi.fn();
  const mockHandleLogoClick = vi.fn();

  const defaultProps = {
    theme: 'light',
    setTheme: mockSetTheme,
    isDayTheme: true,
    isNightTheme: false,
    isMobileMenuOpen: false,
    setIsMobileMenuOpen: mockSetIsMobileMenuOpen,
    isScrolled: false,
    isScrolledCapsule: false,
    handleLogoClick: mockHandleLogoClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Default useTranslation mock implementation
    reactI18next.useTranslation.mockReturnValue({
      t: (key) => key,
      i18n: {
        language: 'en',
        changeLanguage: mockChangeLanguage,
      },
    });
  });

  it('renders correctly', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByTestId('logo-3d')).toBeInTheDocument();
    expect(screen.getByTestId('animated-menu-icon')).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    render(<Header {...defaultProps} />);

    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);

    expect(mockSetIsMobileMenuOpen).toHaveBeenCalledWith(true);
  });

  it('calls handleLogoClick when logo is clicked', () => {
    render(<Header {...defaultProps} />);

    const logoContainer = screen.getByTestId('logo-3d').parentElement;
    fireEvent.click(logoContainer);

    expect(mockHandleLogoClick).toHaveBeenCalled();
  });

  it('toggles theme menu and changes theme', () => {
    render(<Header {...defaultProps} />);

    // Click the appearance button
    const appearanceButton = screen.getByTitle('appearance');
    fireEvent.click(appearanceButton);

    // Check if theme menu options are visible
    expect(screen.getByText('day')).toBeInTheDocument();
    expect(screen.getByText('night')).toBeInTheDocument();
    expect(screen.getByText('premiumPalettes')).toBeInTheDocument();

    // Click a theme option
    const darkThemeButton = screen.getByText('night').closest('button');
    fireEvent.click(darkThemeButton);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles language menu and changes language', () => {
    render(<Header {...defaultProps} />);

    // Click the language button (should be EN based on default mock)
    const langButton = screen.getByText('EN').closest('button');
    fireEvent.click(langButton);

    // Check if language options are visible
    expect(screen.getByText('Select Language')).toBeInTheDocument();
    expect(screen.getByText('Русский')).toBeInTheDocument();
    expect(screen.getByText('Қазақша')).toBeInTheDocument();

    // Click a language option
    const ruLangButton = screen.getByText('Русский').closest('button');
    fireEvent.click(ruLangButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('ru');
  });

  it('displays KZ instead of KK for Kazakh language code', () => {
    reactI18next.useTranslation.mockReturnValue({
      t: (key) => key,
      i18n: {
        language: 'kk',
        changeLanguage: mockChangeLanguage,
      },
    });

    render(<Header {...defaultProps} />);

    // Button should show KZ
    expect(screen.getByText('KZ')).toBeInTheDocument();
  });
});
