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

  it('renders correctly', () => {
    render(<Calculator {...defaultProps} />);
    expect(screen.getByText('servicesTitle')).toBeInTheDocument();
    expect(screen.getByText('servicesSubtitle')).toBeInTheDocument();
    expect(screen.getByText('servicesMultiHint')).toBeInTheDocument();
    expect(screen.getByText('catManicureName')).toBeInTheDocument();
    expect(screen.getByText('catPedicureName')).toBeInTheDocument();
  });

  it('calls setActiveCategory when a category is clicked', () => {
    render(<Calculator {...defaultProps} />);
    const pedicureTab = screen.getByText('catPedicureName');
    fireEvent.click(pedicureTab);
    expect(defaultProps.setActiveCategory).toHaveBeenCalledWith('pedicure');
  });

  it('calls toggleService with namespaced key when a service is clicked', () => {
    render(<Calculator {...defaultProps} />);
    const classicServiceTab = screen.getByText('serviceManicureClassicName');
    fireEvent.click(classicServiceTab);
    expect(defaultProps.toggleService).toHaveBeenCalledWith('manicure:classic');
  });

  it('calls setNailShape when a shape is clicked', () => {
    render(<Calculator {...defaultProps} />);
    const ovalShape = screen.getByText('shape_oval');
    fireEvent.click(ovalShape);
    expect(defaultProps.setNailShape).toHaveBeenCalledWith('oval');
  });

  it('does not render nail shapes when activeCategory is sugaring', () => {
    render(<Calculator {...defaultProps} activeCategory="sugaring" />);
    expect(screen.queryByText('chooseNailShape')).not.toBeInTheDocument();
    expect(screen.queryByText('shape_oval')).not.toBeInTheDocument();
  });

  it('calls toggleOption with namespaced key when an option is clicked', () => {
    render(<Calculator {...defaultProps} />);
    const designOption = screen.getByText('optManiDesign');
    fireEvent.click(designOption);
    expect(defaultProps.toggleOption).toHaveBeenCalledWith('manicure:design');
  });

  it('displays total price and total time correctly', () => {
    render(<Calculator {...defaultProps} totalPrice={5000} totalTime={90} />);
    expect(screen.getByText((content, el) => el?.tagName === 'SPAN' && /5[\s\u00a0\u202f]?000/.test(content) && content.includes('\u20B8'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('90 min') && (content.includes('\u2248') || content.includes('≈')))).toBeInTheDocument();
  });

  it('renders selected services and options in receipt', () => {
    const propsWithSelections = {
      ...defaultProps,
      selectedServices: [{
        id: 'classic',
        key: 'manicure:classic',
        nameKey: 'serviceManicureClassicName',
        price: 4000,
        categoryId: 'manicure',
        categoryNameKey: 'catManicureName',
      }],
      selectedOptions: ['manicure:design'],
      optionsById: {
        'manicure:design': {
          nameKey: 'optManiDesign',
          price: 2000,
          categoryId: 'manicure',
          categoryNameKey: 'catManicureName',
        },
      },
      totalPrice: 6000,
      needsNailShape: true,
    };
    render(<Calculator {...propsWithSelections} />);

    expect(screen.getAllByText((content, el) => el?.tagName === 'SPAN' && /6[\s\u00a0\u202f]?000/.test(content) && content.includes('\u20B8')).length).toBeGreaterThan(0);
    expect(screen.getAllByText('serviceManicureClassicName').length).toBeGreaterThan(0);
    expect(screen.getAllByText((content, el) => el?.tagName === 'SPAN' && /4[\s\u00a0\u202f]?000/.test(content) && content.includes('\u20B8')).length).toBeGreaterThan(0);
    expect(screen.getByText('+ optManiDesign')).toBeInTheDocument();
  });

  it('disables CTA button when no services or options are selected', () => {
    render(<Calculator {...defaultProps} />);
    const ctaButtons = screen.getAllByText('serviceCta');
    ctaButtons.forEach((btn) => expect(btn).toBeDisabled());
  });

  it('enables CTA button and calls handleCalculatorCta when clicked', () => {
    const propsWithSelections = {
      ...defaultProps,
      selectedServices: [{
        id: 'classic',
        key: 'manicure:classic',
        nameKey: 'serviceManicureClassicName',
        price: 4000,
        categoryId: 'manicure',
        categoryNameKey: 'catManicureName',
      }],
    };
    render(<Calculator {...propsWithSelections} />);
    const ctaButtons = screen.getAllByText('serviceCta');
    ctaButtons.forEach((btn) => expect(btn).not.toBeDisabled());

    fireEvent.click(ctaButtons[0]);
    expect(defaultProps.handleCalculatorCta).toHaveBeenCalled();
  });

  it('shows category count badges when cart has multi-category items', () => {
    render(
      <Calculator
        {...defaultProps}
        categoryCounts={{ manicure: 2, pedicure: 1, sugaring: 0 }}
      />
    );
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
