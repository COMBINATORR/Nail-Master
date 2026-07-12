import { render } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LocationMap } from './LocationMap';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' }
  })
}));

describe('LocationMap', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete window.L;
  });

  it('handles Leaflet initialization errors gracefully', () => {
    window.L = {
      map: vi.fn().mockImplementation(() => {
        throw new Error('Simulated Leaflet error');
      }),
      control: {
        zoom: vi.fn()
      },
      tileLayer: vi.fn(),
      divIcon: vi.fn(),
      marker: vi.fn()
    };

    render(<LocationMap leafletLoaded={true} />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Leaflet Map Initialization Error:',
      expect.any(Error)
    );
    expect(consoleErrorSpy.mock.calls[0][1].message).toBe('Simulated Leaflet error');
  });

  it('handles Leaflet cleanup errors gracefully', () => {
    const mockRemove = vi.fn().mockImplementation(() => {
        throw new Error('Simulated Cleanup error');
    });

    window.L = {
      map: vi.fn().mockReturnValue({
        remove: mockRemove
      }),
      control: {
        zoom: vi.fn().mockReturnValue({ addTo: vi.fn() })
      },
      tileLayer: vi.fn().mockReturnValue({ addTo: vi.fn() }),
      divIcon: vi.fn(),
      marker: vi.fn().mockReturnValue({
          addTo: vi.fn().mockReturnValue({
              bindPopup: vi.fn().mockReturnValue({
                  openPopup: vi.fn()
              })
          })
      })
    };

    const { unmount } = render(<LocationMap leafletLoaded={true} />);

    // Trigger cleanup
    unmount();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Leaflet Cleanup Error:',
      expect.any(Error)
    );
    expect(consoleErrorSpy.mock.calls[0][1].message).toBe('Simulated Cleanup error');
  });
});
