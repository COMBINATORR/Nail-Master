import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LocationMap } from './LocationMap';
import * as reactI18next from 'react-i18next';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' },
  }),
}));

describe('LocationMap', () => {
  beforeEach(() => {
    vi.stubGlobal('L', undefined);
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete window.L;
  });

  it('renders correctly', () => {
    render(<LocationMap />);
    expect(screen.getByText('findUs')).toBeInTheDocument();
  });

  it('handles Leaflet map cleanup error safely', () => {
    const removeMock = vi.fn().mockImplementation(() => {
      throw new Error('Cleanup error for test');
    });

    const mockMapInstance = {
      remove: removeMock,
      bindPopup: vi.fn().mockReturnThis(),
      openPopup: vi.fn(),
      addTo: vi.fn().mockReturnThis()
    };

    const mockMarker = {
      bindPopup: vi.fn().mockReturnThis(),
      openPopup: vi.fn().mockReturnThis()
    };

    window.L = {
      map: vi.fn().mockReturnValue(mockMapInstance),
      control: { zoom: vi.fn().mockReturnValue({ addTo: vi.fn() }) },
      tileLayer: vi.fn().mockReturnValue({ addTo: vi.fn() }),
      divIcon: vi.fn(),
      marker: vi.fn().mockReturnValue(mockMarker),
    };

    // We render and then unmount it so the cleanup function runs
    const { unmount } = render(<LocationMap leafletLoaded={true} />);

    // We unmount which should trigger the error to be thrown but caught and logged
    unmount();

    expect(removeMock).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Leaflet Cleanup Error:', expect.any(Error));
  });

  it('handles initialization error safely', () => {
    window.L = {
      map: vi.fn().mockImplementation(() => {
        throw new Error('Init error for test');
      })
    };

    render(<LocationMap leafletLoaded={true} />);

    expect(console.error).toHaveBeenCalledWith('Leaflet Map Initialization Error:', expect.any(Error));
  });

});
