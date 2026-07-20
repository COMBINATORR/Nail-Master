import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
    selectedServiceIds: [],
    toggleService: vi.fn(),
    selectedOptions: [],
    toggleOption: vi.fn(),
    nailShape: 'square',
    setNailShape: vi.fn(),
    totalPrice: 0,
    totalTime: 0,
    fmtTime: (time) => `${time} min`,
    handleCalculatorCta: vi.fn(),
    selectedServices: [],
    optionsById: {},
  };

  it('renders correctly', () => {
    render(<Calculator {...defaultProps} />);
    expect(screen.getByText('servicesTitle')).toBeInTheDocument();
    expect(screen.getByText('servicesSubtitle')).toBeInTheDocument();
    // Check if category tabs are rendered
    expect(screen.getByText('catManicureName')).toBeInTheDocument();
    expect(screen.getByText('catPedicureName')).toBeInTheDocument();
  });

  it('calls setActiveCategory when a category is clicked', () => {
    render(<Calculator {...defaultProps} />);
    const pedicureTab = screen.getByText('catPedicureName');
    fireEvent.click(pedicureTab);
    expect(defaultProps.setActiveCategory).toHaveBeenCalledWith('pedicure');
  });

  it('calls toggleService when a service is clicked', () => {
    render(<Calculator {...defaultProps} />);
    const classicServiceTab = screen.getByText('serviceManicureClassicName'); // The inner element
    fireEvent.click(classicServiceTab);
    expect(defaultProps.toggleService).toHaveBeenCalledWith('classic');
  });

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
    const spans4 = screen.getAllByText((content, el) => el?.tagName === 'SPAN' && /5/.test(content) && /000/.test(content) && (content.includes('₸') || content.includes('\u20B8')));
    expect(spans4.length).toBeGreaterThan(0);
    const texts = screen.getAllByText((content) => content.includes('90 min') && (content.includes('\u2248') || content.includes('≈')));
    expect(texts.length).toBeGreaterThan(0);
  });

  it('renders selected services and options in receipt', () => {
    const propsWithSelections = {
      ...defaultProps,
      selectedServices: [{ id: 'classic', nameKey: 'serviceManicureClassicName', price: 4000 }],
      selectedOptions: ['design'],
      optionsById: { 'design': { nameKey: 'optManiDesign', price: 2000 } },
      totalPrice: 6000
    };
    render(<Calculator {...propsWithSelections} />);

    // Total price
    const spans = screen.getAllByText((content, el) => el?.tagName === 'SPAN' && /6/.test(content) && /000/.test(content) && (content.includes('₸') || content.includes('\u20B8')));
    expect(spans.length).toBeGreaterThan(0);
    // Service receipt row
    expect(screen.getAllByText('serviceManicureClassicName').length).toBeGreaterThan(0);
    const spans2 = screen.getAllByText((content, el) => el?.tagName === 'SPAN' && /4/.test(content) && /000/.test(content) && (content.includes('₸') || content.includes('\u20B8')));
    expect(spans2.length).toBeGreaterThan(0);
    // Option receipt row
    expect(screen.getByText('+ optManiDesign')).toBeInTheDocument();
    const spans3 = screen.getAllByText((content, el) => el?.tagName === 'SPAN' && content.includes('+') && /2/.test(content) && /000/.test(content) && (content.includes('₸') || content.includes('\u20B8')));
    expect(spans3.length).toBeGreaterThan(0);
  });

  it('disables CTA button when no services or options are selected', () => {
    render(<Calculator {...defaultProps} />);
    const ctaButton = screen.getByText('serviceCta');
    expect(ctaButton).toBeDisabled();
  });

  it('enables CTA button and calls handleCalculatorCta when clicked', () => {
    const propsWithSelections = {
      ...defaultProps,
      selectedServices: [{ id: 'classic', nameKey: 'serviceManicureClassicName', price: 4000 }]
    };
    render(<Calculator {...propsWithSelections} />);
    const ctaButton = screen.getByText('serviceCta');
    expect(ctaButton).not.toBeDisabled();

    fireEvent.click(ctaButton);
    expect(defaultProps.handleCalculatorCta).toHaveBeenCalled();
  });
});
