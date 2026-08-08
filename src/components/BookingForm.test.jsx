import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingForm } from './BookingForm';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const baseProps = {
  name: '',
  setName: vi.fn(),
  phone: '',
  setPhone: vi.fn(),
  selectedDate: '',
  setSelectedDate: vi.fn(),
  selectedTime: '',
  setSelectedTime: vi.fn(),
  next10Days: [
    { id: '2023-10-25', weekday: 'Mon', dayNum: '25', formatted: '25.10' },
    { id: '2023-10-26', weekday: 'Tue', dayNum: '26', formatted: '26.10' },
  ],
  visitMode: 'relax',
  setVisitMode: vi.fn(),
  isSubmitting: false,
  handleSubmit: vi.fn((e) => e.preventDefault()),
  selectedServices: [],
  selectedOptions: new Set(),
  optionsById: {},
  totalPrice: 0,
  totalTime: 0,
  fmtTime: (time) => `${time} min`,
};

const withServices = (extra = {}) => ({
  ...baseProps,
  selectedServices: [{ id: 1, nameKey: 'Haircut', price: 5000 }],
  totalPrice: 5000,
  totalTime: 60,
  setName: vi.fn(),
  setPhone: vi.fn(),
  setSelectedDate: vi.fn(),
  setSelectedTime: vi.fn(),
  setVisitMode: vi.fn(),
  handleSubmit: vi.fn((e) => e.preventDefault()),
  ...extra,
});

describe('BookingForm', () => {
  it('renders without crashing', () => {
    render(<BookingForm {...baseProps} />);
    expect(screen.getByText('formTitle')).toBeInTheDocument();
  });

  it('shows empty services state on step 1', () => {
    render(<BookingForm {...baseProps} />);
    expect(screen.getByText('formPreviewEmptyServices')).toBeInTheDocument();
  });

  it('renders selected services on step 1', () => {
    render(<BookingForm {...withServices()} />);
    expect(screen.getByText('Haircut')).toBeInTheDocument();
    expect(screen.getAllByText(/5.?000/).length).toBeGreaterThan(0);
  });

  it('renders selected options on step 1', () => {
    render(
      <BookingForm
        {...withServices({
          selectedServices: [],
          selectedOptions: new Set(['opt1', 'optInvalid']),
          optionsById: { opt1: { nameKey: 'Massage', price: 2000 } },
          totalPrice: 2000,
        })}
      />
    );
    expect(screen.getByText('+ Massage')).toBeInTheDocument();
    expect(screen.getByText(/\+2.?000/)).toBeInTheDocument();
  });

  it('calls setSelectedDate when a date is clicked on step 2', () => {
    const props = withServices();
    render(<BookingForm {...props} />);
    fireEvent.click(screen.getByText('formStepNext'));
    fireEvent.click(screen.getByText('25').closest('button'));
    expect(props.setSelectedDate).toHaveBeenCalledWith('2023-10-25');
  });

  it('calls setSelectedTime for a free slot on step 2', () => {
    const props = withServices({ selectedDate: '2023-10-25' });
    render(<BookingForm {...props} />);
    fireEvent.click(screen.getByText('formStepNext'));
    const free = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00']
      .map((t) => screen.getByText(t))
      .find((b) => !b.disabled);
    expect(free).toBeTruthy();
    fireEvent.click(free);
    expect(props.setSelectedTime).toHaveBeenCalled();
  });

  it('disables busy time slots on step 2', () => {
    const props = withServices({ selectedDate: '2023-10-25' });
    render(<BookingForm {...props} />);
    fireEvent.click(screen.getByText('formStepNext'));
    const busyCount = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'].filter(
      (t) => screen.getByText(t).disabled
    ).length;
    expect(busyCount).toBeGreaterThanOrEqual(2);
    expect(busyCount).toBeLessThanOrEqual(3);
  });

  it('calls setVisitMode on step 3', () => {
    const props = withServices({ selectedDate: '2023-10-25', selectedTime: '11:00' });
    render(<BookingForm {...props} />);
    fireEvent.click(screen.getByText('formStepNext'));
    fireEvent.click(screen.getByText('formStepNext'));
    fireEvent.click(screen.getByText('talkMode').closest('button'));
    expect(props.setVisitMode).toHaveBeenCalledWith('talk');
  });

  it('renders contact inputs on step 3', () => {
    render(<BookingForm {...withServices({ selectedDate: '2023-10-25', selectedTime: '11:00' })} />);
    fireEvent.click(screen.getByText('formStepNext'));
    fireEvent.click(screen.getByText('formStepNext'));
    expect(screen.getByPlaceholderText('namePlaceholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('phonePlaceholder')).toBeInTheDocument();
  });

  it('calls setName on step 3', () => {
    const props = withServices({ selectedDate: '2023-10-25', selectedTime: '11:00' });
    render(<BookingForm {...props} />);
    fireEvent.click(screen.getByText('formStepNext'));
    fireEvent.click(screen.getByText('formStepNext'));
    fireEvent.change(screen.getByPlaceholderText('namePlaceholder'), { target: { value: 'John Doe' } });
    expect(props.setName).toHaveBeenCalledWith('John Doe');
  });

  it('calls handleSubmit on final step', () => {
    const props = withServices({
      selectedDate: '2023-10-25',
      selectedTime: '11:00',
      name: 'John',
      phone: '1234567890',
    });
    render(<BookingForm {...props} />);
    fireEvent.click(screen.getByText('formStepNext'));
    fireEvent.click(screen.getByText('formStepNext'));
    fireEvent.submit(document.querySelector('form'));
    expect(props.handleSubmit).toHaveBeenCalled();
  });

  it('disables submit when isSubmitting on step 3', () => {
    render(
      <BookingForm
        {...withServices({ selectedDate: '2023-10-25', selectedTime: '11:00', isSubmitting: true })}
      />
    );
    fireEvent.click(screen.getByText('formStepNext'));
    fireEvent.click(screen.getByText('formStepNext'));
    expect(document.getElementById('form-submit-btn')).toBeDisabled();
  });

  it('filters time slots when period filter buttons are clicked on step 2', () => {
    const props = withServices({ selectedDate: '2023-10-25' });
    render(<BookingForm {...props} />);
    fireEvent.click(screen.getByText('formStepNext'));

    // Morning filter click
    fireEvent.click(screen.getByText('timeFilterMorning'));
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('11:00')).toBeInTheDocument();
    expect(screen.queryByText('19:00')).not.toBeInTheDocument();

    // Evening filter click
    fireEvent.click(screen.getByText('timeFilterEvening'));
    expect(screen.getByText('17:00')).toBeInTheDocument();
    expect(screen.getByText('19:00')).toBeInTheDocument();
    expect(screen.queryByText('09:00')).not.toBeInTheDocument();
  });
});