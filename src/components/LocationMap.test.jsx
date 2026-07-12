import { render, screen } from '@testing-library/react';
import { LocationMap } from './LocationMap';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' }
  })
}));

vi.mock('./Icons', () => ({
  PhoneIcon: () => <div data-testid="phone-icon" />,
  WhatsAppIcon: () => <div data-testid="whatsapp-icon" />
}));

describe('LocationMap', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    window.L = {
      map: vi.fn().mockReturnValue({ remove: vi.fn() }),
      control: {
        zoom: vi.fn().mockReturnValue({ addTo: vi.fn() })
      },
      tileLayer: vi.fn().mockReturnValue({ addTo: vi.fn() }),
      divIcon: vi.fn(),
      marker: vi.fn().mockReturnValue({
        bindPopup: vi.fn().mockReturnValue({
          openPopup: vi.fn()
        }),
        addTo: vi.fn().mockReturnThis()
      })
    };
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    delete window.L;
  });

  it('renders correctly and initializes map on happy path', () => {
    render(<LocationMap leafletLoaded={true} />);

    // Verify some text renders
    expect(screen.getByText('findUs')).toBeInTheDocument();

    // Verify that map was initialized
    expect(window.L.map).toHaveBeenCalledWith('studio-map', expect.any(Object));
    expect(window.L.tileLayer).toHaveBeenCalled();
    expect(window.L.marker).toHaveBeenCalled();

    // No errors should be logged
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('handles Leaflet initialization error', () => {
    const error = new Error('Simulated Map Error');
    window.L.map.mockImplementation(() => {
      throw error;
    });

    render(<LocationMap leafletLoaded={true} />);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Leaflet Map Initialization Error:', error);
  });
});
