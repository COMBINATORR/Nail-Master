import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MobileMenu } from './MobileMenu';

// Mock react-i18next
const changeLanguageMock = vi.fn();
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: 'en',
      changeLanguage: changeLanguageMock
    },
  }),
}));

// Mock Icons
vi.mock('./Icons', () => ({
  CloseIcon: () => <div data-testid="close-icon" />,
  InstagramIcon: () => <div data-testid="instagram-icon" />,
  WhatsAppIcon: () => <div data-testid="whatsapp-icon" />,
  SunIcon: () => <div data-testid="sun-icon" />,
  MoonIcon: () => <div data-testid="moon-icon" />,
}));

describe('MobileMenu', () => {
  const defaultProps = {
    isMobileMenuOpen: true,
    setIsMobileMenuOpen: vi.fn(),
    theme: 'light',
    setTheme: vi.fn(),
    isDayTheme: true,
    isNightTheme: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not render when isMobileMenuOpen is false', () => {
    const { container } = render(<MobileMenu {...defaultProps} isMobileMenuOpen={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders correctly when isMobileMenuOpen is true', () => {
    const { container } = render(<MobileMenu {...defaultProps} />);

    // Check if backdrop exists
    expect(container.querySelector('.popup-backdrop')).toBeInTheDocument();

    // Check if icons are rendered
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    expect(screen.getByTestId('whatsapp-icon')).toBeInTheDocument();
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();

    // Check if nav links are rendered (using English labels)
    expect(screen.getByText('About me')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Works')).toBeInTheDocument();
  });

  it('calls setIsMobileMenuOpen(false) when the close button is clicked', () => {
    render(<MobileMenu {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: /close menu/i });
    fireEvent.click(closeButton);

    expect(defaultProps.setIsMobileMenuOpen).toHaveBeenCalledWith(false);
  });

  it('calls setIsMobileMenuOpen(false) when the backdrop is clicked', () => {
    const { container } = render(<MobileMenu {...defaultProps} />);

    // The backdrop is the first div inside the popup-backdrop
    const backdrop = container.querySelector('.bg-charcoal-950\\/60');
    fireEvent.click(backdrop);

    expect(defaultProps.setIsMobileMenuOpen).toHaveBeenCalledWith(false);
  });

  it('calls setIsMobileMenuOpen(false) when a nav link is clicked', () => {
    render(<MobileMenu {...defaultProps} />);

    const aboutLink = screen.getByText('About me');
    fireEvent.click(aboutLink);

    expect(defaultProps.setIsMobileMenuOpen).toHaveBeenCalledWith(false);
  });

  it('verifies language selection calls i18n.changeLanguage and closes the menu', () => {
    render(<MobileMenu {...defaultProps} />);

    const ruButton = screen.getByText('RU');
    fireEvent.click(ruButton);

    expect(changeLanguageMock).toHaveBeenCalledWith('ru');
    expect(defaultProps.setIsMobileMenuOpen).toHaveBeenCalledWith(false);
  });

  it('verifies theme buttons correctly call setTheme', () => {
    render(<MobileMenu {...defaultProps} />);

    // Day button
    const dayButton = screen.getByText('day').closest('button');
    fireEvent.click(dayButton);
    expect(defaultProps.setTheme).toHaveBeenCalledWith('light');

    // Night button
    const nightButton = screen.getByText('night').closest('button');
    fireEvent.click(nightButton);
    expect(defaultProps.setTheme).toHaveBeenCalledWith('dark');

    // Emerald preset
    const emeraldButton = screen.getByText('Emerald').closest('button');
    fireEvent.click(emeraldButton);
    expect(defaultProps.setTheme).toHaveBeenCalledWith('emerald');

    // Nude preset
    const nudeButton = screen.getByText('Nude').closest('button');
    fireEvent.click(nudeButton);
    expect(defaultProps.setTheme).toHaveBeenCalledWith('nudefashion');
  });
});
