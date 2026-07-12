import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingForm } from './BookingForm';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('BookingForm', () => {
  const defaultProps = {
    name: '',
    setName: vi.fn(),
    phone: '',
    setPhone: vi.fn(),
    selectedDate: null,
    setSelectedDate: vi.fn(),
    selectedTime: null,
    setSelectedTime: vi.fn(),
    next10Days: [
      { id: '2023-10-25', weekday: 'Mon', dayNum: '25' },
      { id: '2023-10-26', weekday: 'Tue', dayNum: '26' },
    ],
    visitMode: 'relax',
    setVisitMode: vi.fn(),
    isSubmitting: false,
    handleSubmit: vi.fn((e) => e.preventDefault()),
    selectedServices: [],
    selectedOptions: [],
    optionsById: {},
    totalPrice: 0,
    totalTime: 0,
    fmtTime: (time) => `${time} min`,
  };

  it('renders without crashing', () => {
    render(<BookingForm {...defaultProps} />);
    expect(screen.getByText('formTitle')).toBeInTheDocument();
  });

  it('renders input fields correctly', () => {
    render(<BookingForm {...defaultProps} />);
    expect(screen.getByPlaceholderText('namePlaceholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('phonePlaceholder')).toBeInTheDocument();
  });

  it('calls setName when name input changes', () => {
    render(<BookingForm {...defaultProps} />);
    const nameInput = screen.getByPlaceholderText('namePlaceholder');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(defaultProps.setName).toHaveBeenCalledWith('John Doe');
  });

  it('calls setPhone when phone input changes', () => {
    render(<BookingForm {...defaultProps} />);
    const phoneInput = screen.getByPlaceholderText('phonePlaceholder');
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    expect(defaultProps.setPhone).toHaveBeenCalledWith('+1234567890');
  });

  it('renders selected services correctly', () => {
    const propsWithServices = {
      ...defaultProps,
      selectedServices: [{ id: 1, nameKey: 'Haircut', price: 5000 }],
      totalPrice: 5000,
    };
    render(<BookingForm {...propsWithServices} />);
    expect(screen.getByText('Haircut')).toBeInTheDocument();
    expect(screen.getByText('5,000 ₸')).toBeInTheDocument();
  });

  it('renders "servicesNotSelected" when no services are selected', () => {
    render(<BookingForm {...defaultProps} />);
    expect(screen.getByText('servicesNotSelected')).toBeInTheDocument();
  });

  it('calls handleSubmit on form submission', () => {
    render(<BookingForm {...defaultProps} name="John" phone="123456" />);

    // We need to query the form and fire the submit event.
    // Instead of querying the submit button and clicking it (which might not always fire the form submit in jsdom if validation fails),
    // we fire submit on the form itself.
    const form = document.querySelector('form');
    fireEvent.submit(form);

    expect(defaultProps.handleSubmit).toHaveBeenCalled();
  });

  it('disables submit button and shows loading state when isSubmitting is true', () => {
    const propsSubmitting = { ...defaultProps, isSubmitting: true };
    render(<BookingForm {...propsSubmitting} />);
    const button = document.getElementById('form-submit-btn');
    expect(button).toBeDisabled();
    expect(screen.queryByText('formCta')).not.toBeInTheDocument();
  });
});
