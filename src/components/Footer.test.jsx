import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from './Footer';

// Mock dependencies
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock('./ui/AwardBadge', () => ({
  AwardBadge: ({ brand, title }) => (
    <div data-testid="award-badge">
      <span data-testid="award-brand">{brand}</span>
      <span data-testid="award-title">{title}</span>
    </div>
  ),
}));

vi.mock('./StudioCreditMenu', () => ({
  StudioCreditMenu: () => <div data-testid="studio-credit-menu">StudioCreditMenu</div>,
}));

describe('Footer Component', () => {
  it('renders successfully with brand logo', () => {
    render(<Footer />);

    // Check static logo elements
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('V')).toBeInTheDocument();
    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByText('Nails & Aesthetic')).toBeInTheDocument();
  });

  it('renders footer texts with translations', () => {
    render(<Footer />);

    expect(screen.getByText('footerText')).toBeInTheDocument();
  });

  it('renders social media links correctly', () => {
    render(<Footer />);

    const instagramLink = screen.getByLabelText('Instagram');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
    expect(screen.getByText('Instagram', { selector: '.footer-social-label' })).toBeInTheDocument();

    const whatsappLink = screen.getByLabelText('WhatsApp');
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/77016698086');
    expect(screen.getByText('WhatsApp', { selector: '.footer-social-label' })).toBeInTheDocument();

    const phoneLink = screen.getByLabelText('Телефон');
    expect(phoneLink).toHaveAttribute('href', 'tel:+77016698086');
    expect(screen.getByText('Телефон', { selector: '.footer-social-label' })).toBeInTheDocument();
  });

  it('renders award badge with correct props', () => {
    render(<Footer />);

    expect(screen.getByTestId('award-badge')).toBeInTheDocument();
    expect(screen.getByTestId('award-brand').textContent).toBe('awardBrand');
    expect(screen.getByTestId('award-title').textContent).toBe('awardTitle');
  });

  it('renders legal section with current year and credit menu', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    // Using string matching to handle spaces and formatting in: © {year} {t('brand')}. {t('rights')}
    const copyrightText = screen.getByText((content) => {
      return content.includes(currentYear.toString()) &&
             content.includes('brand') &&
             content.includes('rights');
    });

    expect(copyrightText).toBeInTheDocument();
    expect(screen.getByTestId('studio-credit-menu')).toBeInTheDocument();
  });
});
