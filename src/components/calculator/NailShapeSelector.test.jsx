import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NailShapeSelector } from './NailShapeSelector';
import { nailShapes } from '../../data/nailShapes';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('NailShapeSelector', () => {
  it('returns null when activeCategory is sugaring', () => {
    const { container } = render(
      <NailShapeSelector activeCategory="sugaring" nailShape="oval" setNailShape={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders all nail shapes when activeCategory is not sugaring', () => {
    render(
      <NailShapeSelector activeCategory="manicure" nailShape="oval" setNailShape={vi.fn()} />
    );

    // Check header
    expect(screen.getByText('chooseNailShape')).toBeInTheDocument();

    // Check all shapes are rendered
    nailShapes.forEach(shape => {
      expect(screen.getByText('shape_' + shape.id)).toBeInTheDocument();
    });

    // Verify count of shape containers
    const shapeElements = screen.getAllByText(/^shape_/);
    expect(shapeElements).toHaveLength(nailShapes.length);
  });

  it('calls setNailShape with the correct shape ID when clicked', async () => {
    const setNailShapeMock = vi.fn();
    render(
      <NailShapeSelector activeCategory="manicure" nailShape="oval" setNailShape={setNailShapeMock} />
    );

    const user = userEvent.setup();
    const targetShape = nailShapes[0];

    await user.click(screen.getByText('shape_' + targetShape.id));

    expect(setNailShapeMock).toHaveBeenCalledTimes(1);
    expect(setNailShapeMock).toHaveBeenCalledWith(targetShape.id);
  });

  it('applies the active CSS classes to the selected nailShape', () => {
    const activeShapeId = nailShapes[1].id; // 'soft_square'
    render(
      <NailShapeSelector activeCategory="manicure" nailShape={activeShapeId} setNailShape={vi.fn()} />
    );

    const activeShapeElement = screen.getByText('shape_' + activeShapeId).closest('.liquid-glass-chip');
    expect(activeShapeElement).toHaveClass('liquid-glass-chip-active');
    expect(activeShapeElement).toHaveClass('text-bronze-400');
    expect(activeShapeElement).toHaveClass('tactile-card-selected');

    // Verify another shape doesn't have active classes
    const inactiveShapeId = nailShapes[2].id; // 'oval'
    const inactiveShapeElement = screen.getByText('shape_' + inactiveShapeId).closest('.liquid-glass-chip');
    expect(inactiveShapeElement).not.toHaveClass('liquid-glass-chip-active');
    expect(inactiveShapeElement).toHaveClass('opacity-80');
  });
});
