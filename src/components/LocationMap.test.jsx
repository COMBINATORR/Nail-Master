import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { LocationMap } from './LocationMap';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' },
  }),
}));

describe('LocationMap', () => {
  beforeEach(() => {
    // Create a robust mock for window.L
    const mockMapInstance = {
      remove: vi.fn().mockImplementation(() => {
        throw new Error('Test remove error');
      }),
    };

    const L = {
      map: vi.fn().mockReturnValue(mockMapInstance),
      control: { zoom: vi.fn().mockReturnValue({ addTo: vi.fn() }) },
      tileLayer: vi.fn().mockReturnValue({ addTo: vi.fn() }),
      divIcon: vi.fn().mockReturnValue({}),
      marker: vi.fn().mockReturnValue({
        addTo: vi.fn().mockReturnValue({
            bindPopup: vi.fn().mockReturnValue({ openPopup: vi.fn() })
        })
      }),
    };

    vi.stubGlobal('L', L);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete window.L;
  });

  it('handles errors during Leaflet cleanup gracefully', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { unmount } = render(<LocationMap leafletLoaded={true} />);

    // Trigger the useEffect cleanup function
    unmount();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Leaflet Cleanup Error:',
      expect.any(Error)
    );
    expect(consoleErrorSpy.mock.calls[0][1].message).toBe('Test remove error');
  });
});
