
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CalculatorSummary } from './CalculatorSummary';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('CalculatorSummary', () => {
  const defaultProps = {
    selectedServices: [],
    selectedOptions: [],
    optionsById: {},
    totalPrice: 0,
    totalTime: 0,
    fmtTime: vi.fn((time) => `${time} min`),
    handleCalculatorCta: vi.fn(),
  };

  it('renders empty state correctly and disables CTA button', () => {
    render(<CalculatorSummary {...defaultProps} />);

    // Check empty state message
    expect(screen.getByText('servicesNotSelected')).toBeInTheDocument();

    // Check total price (0 ₸)
    expect(screen.getByText('0 ₸')).toBeInTheDocument();

    // CTA button should be disabled
    const ctaButton = screen.getByRole('button', { name: 'serviceCta' });
    expect(ctaButton).toBeDisabled();
    expect(ctaButton).toHaveClass('cursor-not-allowed');
  });

  it('renders selected services and options correctly and enables CTA button', () => {
    const props = {
      ...defaultProps,
      selectedServices: [
        { id: 's1', nameKey: 'Manicure', price: 5000 },
        { id: 's2', nameKey: 'Pedicure', price: 7000 }
      ],
      selectedOptions: ['o1'],
      optionsById: {
        o1: { id: 'o1', nameKey: 'French', price: 2000 }
      },
      totalPrice: 14000,
      totalTime: 120,
    };

    render(<CalculatorSummary {...props} />);

    // Check services
    expect(screen.getByText('Manicure')).toBeInTheDocument();
    expect(screen.getByText('5,000 ₸')).toBeInTheDocument();

    expect(screen.getByText('Pedicure')).toBeInTheDocument();
    expect(screen.getByText('7,000 ₸')).toBeInTheDocument();

    // Check options
    expect(screen.getByText('+ French')).toBeInTheDocument();
    expect(screen.getByText('+2,000 ₸')).toBeInTheDocument();

    // Check total price
    expect(screen.getByText('14,000 ₸')).toBeInTheDocument();

    // Check total time
    expect(props.fmtTime).toHaveBeenCalledWith(120);
    expect(screen.getByText('≈ 120 min')).toBeInTheDocument();

    // CTA button should be enabled
    const ctaButton = screen.getByRole('button', { name: 'serviceCta' });
    expect(ctaButton).not.toBeDisabled();
    expect(ctaButton).not.toHaveClass('cursor-not-allowed');
  });

  it('handles CTA button click when enabled', async () => {
    const props = {
      ...defaultProps,
      selectedServices: [{ id: 's1', nameKey: 'Manicure', price: 5000 }],
    };

    render(<CalculatorSummary {...props} />);
    const user = userEvent.setup();

    const ctaButton = screen.getByRole('button', { name: 'serviceCta' });
    await user.click(ctaButton);

    expect(props.handleCalculatorCta).toHaveBeenCalledTimes(1);
  });
});
