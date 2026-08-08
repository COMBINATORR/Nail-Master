import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SuccessModal } from './SuccessModal';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('SuccessModal', () => {
  it('does not render when showModal is false', () => {
    const { container } = render(<SuccessModal showModal={false} handleModalClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly when showModal is true', () => {
    render(<SuccessModal showModal={true} handleModalClose={() => {}} />);

    // Check that translations keys are rendered
    expect(screen.getByText('modalSuccessTitle')).toBeInTheDocument();
    expect(screen.getByText('modalSuccessDesc')).toBeInTheDocument();
    expect(screen.getByText('modalClose')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('calls handleModalClose when close button is clicked', () => {
    const handleModalCloseMock = vi.fn();
    render(<SuccessModal showModal={true} handleModalClose={handleModalCloseMock} />);

    const closeButton = screen.getByText('modalClose');
    fireEvent.click(closeButton);

    expect(handleModalCloseMock).toHaveBeenCalledTimes(1);
  });
});
