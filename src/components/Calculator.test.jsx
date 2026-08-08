import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Calculator } from './Calculator';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('Calculator', () => {
  const defaultProps = {
    activeCategory: 'manicure',
    setActiveCategory: vi.fn(),
    selectedServiceIds: new Set(),
    toggleService: vi.fn(),
    selectedOptions: new Set(),
    toggleOption: vi.fn(),
    nailShape: 'oval',
    setNailShape: vi.fn(),
    totalPrice: 0,
    totalTime: 0,
    fmtTime: (time) => `${time} min`,
    handleCalculatorCta: vi.fn(),
    selectedServices: [],
    optionsById: {},
    categoryCounts: {},
    needsNailShape: false,
  };

  const mobile = () => within(screen.getByTestId('calc-mobile'));

  const goNext = () => {
    fireEvent.click(mobile().getByText('formStepNext'));
  };

  it('renders correctly', () => {
    render(<Calculator {...defaultProps} />);
    expect(screen.getByText('servicesTitle')).toBeInTheDocument();
    expect(screen.getByText('servicesSubtitle')).toBeInTheDocument();
    expect(mobile().getByText('servicesMultiHint')).toBeInTheDocument();
    expect(mobile().getByText('catManicureName')).toBeInTheDocument();
    expect(mobile().getByText('catPedicureName')).toBeInTheDocument();
    expect(mobile().getByText('calcStepService')).toBeInTheDocument();
  });

  it('calls setActiveCategory when a category is clicked', () => {
    render(<Calculator {...defaultProps} />);
    fireEvent.click(mobile().getByText('catPedicureName'));
    expect(defaultProps.setActiveCategory).toHaveBeenCalledWith('pedicure');
  });

  it('calls toggleService with namespaced key when a service is clicked', () => {
    render(<Calculator {...defaultProps} />);
    fireEvent.click(mobile().getByText('serviceManicureClassicName'));
    expect(defaultProps.toggleService).toHaveBeenCalledWith('manicure:classic');
  });

<<<<<<< HEAD
  it('calls setNailShape when a shape is clicked', () => {
    render(<Calculator {...defaultProps} />);
    const ovalShape = screen.getByText('shape_oval');
    fireEvent.click(ovalShape);
    expect(defaultProps.setNailShape).toHaveBeenCalledWith('oval');
  });

  it('does not render nail shapes when activeCategory is sugaring', () => {
    render(<Calculator {...defaultProps} activeCategory="sugaring" />);
    // shapeTitle should not be there
    expect(screen.queryByText('shapeTitle')).not.toBeInTheDocument();
  });

  it('calls toggleOption when an option is clicked', () => {
    render(<Calculator {...defaultProps} />);
    const designOption = screen.getByText('optManiDesign');
    fireEvent.click(designOption);
    expect(defaultProps.toggleOption).toHaveBeenCalledWith('design');
  });

  it('displays total price and total time correctly', () => {
    render(<Calculator {...defaultProps} totalPrice={5000} totalTime={90} />);
    expect(document.body.textContent.replace(/[^\\d]/g, '').includes('5000')).toBe(true);
    expect(screen.getByText((content) => content.includes('90 min') && (content.includes('\u2248') || content.includes('≈')))).toBeInTheDocument();
  });

  it('walks mobile steps: service → shape → options → summary', () => {
    const props = {
      ...defaultProps,
      selectedServices: [{
        id: 'classic',
        key: 'manicure:classic',
        nameKey: 'serviceManicureClassicName',
        price: 4000,
        categoryId: 'manicure',
        categoryNameKey: 'catManicureName',
      }],
      totalPrice: 4000,
      totalTime: 60,
      needsNailShape: true,
    };
    render(<Calculator {...props} />);

    expect(mobile().getByText('serviceManicureClassicName')).toBeInTheDocument();
    expect(mobile().queryByText('shape_oval')).not.toBeInTheDocument();

    goNext();
    expect(mobile().getByText('shape_oval')).toBeInTheDocument();
    fireEvent.click(mobile().getByText('shape_oval'));
    expect(props.setNailShape).toHaveBeenCalledWith('oval');

    goNext();
    expect(mobile().getByText('optManiDesign')).toBeInTheDocument();
    fireEvent.click(mobile().getByText('optManiDesign'));
    expect(props.toggleOption).toHaveBeenCalledWith('manicure:design');

    goNext();
    expect(mobile().getByText('serviceCta')).toBeInTheDocument();
    expect(mobile().getByText('calcAddMore')).toBeInTheDocument();
  });

  it('skips nail shape step for sugaring', () => {
    const props = {
      ...defaultProps,
      activeCategory: 'sugaring',
      selectedServices: [{
        id: 'bikini',
        key: 'sugaring:bikini',
        nameKey: 'serviceSugarBikiniName',
        price: 5000,
        categoryId: 'sugaring',
        categoryNameKey: 'catSugaringName',
      }],
      totalPrice: 5000,
    };
    render(<Calculator {...props} />);

    expect(mobile().queryByText('calcStepShape')).not.toBeInTheDocument();
    goNext();
    expect(mobile().queryByText('shape_oval')).not.toBeInTheDocument();
  });

  it('disables next on first step without selection', () => {
    render(<Calculator {...defaultProps} />);
    expect(mobile().getByText('formStepNext')).toBeDisabled();
  });

  it('enables CTA on summary and calls handleCalculatorCta', () => {
    const props = {
      ...defaultProps,
      selectedServices: [{
        id: 'classic',
        key: 'manicure:classic',
        nameKey: 'serviceManicureClassicName',
        price: 4000,
        categoryId: 'manicure',
        categoryNameKey: 'catManicureName',
      }],
      totalPrice: 4000,
      totalTime: 60,
    };
    render(<Calculator {...props} />);

    goNext();
    goNext();
    goNext();

    const cta = mobile().getByText('serviceCta');
    expect(cta).not.toBeDisabled();
    fireEvent.click(cta);
    expect(props.handleCalculatorCta).toHaveBeenCalled();
  });

  it('shows category count badges when cart has multi-category items', () => {
    render(
      <Calculator
        {...defaultProps}
        categoryCounts={{ manicure: 2, pedicure: 1, sugaring: 0 }}
      />
    );
    expect(mobile().getByLabelText('2')).toBeInTheDocument();
    expect(mobile().getByLabelText('1')).toBeInTheDocument();
  });

  it('displays running total in mobile preview strip', () => {
    render(
      <Calculator
        {...defaultProps}
        selectedServices={[{
          id: 'classic',
          key: 'manicure:classic',
          nameKey: 'serviceManicureClassicName',
          price: 5000,
          categoryId: 'manicure',
          categoryNameKey: 'catManicureName',
        }]}
        totalPrice={5000}
        totalTime={90}
      />
    );
    expect(
      mobile().getAllByText((content) => /5[\s\u00a0\u202f]?000/.test(content.replace(/,/g, '')) && content.includes('₸')).length
    ).toBeGreaterThan(0);
    expect(
      mobile().getAllByText((content) => content.includes('90 min')).length
    ).toBeGreaterThan(0);
  });
});

