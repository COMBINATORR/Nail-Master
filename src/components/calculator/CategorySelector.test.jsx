import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategorySelector } from './CategorySelector';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('CategorySelector', () => {
  const defaultProps = {
    activeCategory: 'manicure',
    setActiveCategory: vi.fn(),
  };

  it('renders correctly with all category buttons', () => {
    render(<CategorySelector {...defaultProps} />);
    expect(screen.getByText('catManicureName')).toBeInTheDocument();
    expect(screen.getByText('catPedicureName')).toBeInTheDocument();
    expect(screen.getByText('catSugaringName')).toBeInTheDocument();
  });

  it('applies active class to the active category button', () => {
    render(<CategorySelector {...defaultProps} />);
    const manicureButton = screen.getByText('catManicureName').closest('button');
    expect(manicureButton.className).toContain('active-tactile-pill');

    const pedicureButton = screen.getByText('catPedicureName').closest('button');
    expect(pedicureButton.className).not.toContain('active-tactile-pill');
    expect(pedicureButton.className).toContain('border-transparent');
  });

  it('calls setActiveCategory when a non-active category is clicked', () => {
    render(<CategorySelector {...defaultProps} />);
    const pedicureButton = screen.getByText('catPedicureName');

    fireEvent.click(pedicureButton);
    expect(defaultProps.setActiveCategory).toHaveBeenCalledWith('pedicure');
  });

  it('calls setActiveCategory even if active category is clicked', () => {
    render(<CategorySelector {...defaultProps} />);
    const manicureButton = screen.getByText('catManicureName');

    fireEvent.click(manicureButton);
    expect(defaultProps.setActiveCategory).toHaveBeenCalledWith('manicure');
  });
});
