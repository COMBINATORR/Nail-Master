import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Portfolio } from './Portfolio';
import { works } from '../data/works';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, fallback) => fallback || key,
  }),
}));

describe('Portfolio', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders initial state correctly', () => {
    render(<Portfolio />);

    expect(screen.getByText('portfolioTitle')).toBeInTheDocument();
    expect(screen.getByText('portfolioSubtitle')).toBeInTheDocument();

    works.forEach((w) => {
      expect(screen.getAllByText(w.titleKey).length).toBeGreaterThan(0);
    });

    expect(screen.getByText(works[0].descKey)).toBeInTheDocument();
  });

  it('changes active work when clicking a panel', () => {
    render(<Portfolio />);

    expect(screen.getByText(works[0].descKey)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: works[1].titleKey }));

    expect(screen.getByText(works[1].descKey)).toBeInTheDocument();
  });

  it('renders accordion panels for all works', () => {
    render(<Portfolio />);
    works.forEach((w) => {
      expect(screen.getByRole('button', { name: w.titleKey })).toBeInTheDocument();
    });
  });
});
