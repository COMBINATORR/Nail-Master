import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LocationMap } from './LocationMap';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' },
  }),
}));

vi.mock('./Icons', () => ({
  PhoneIcon: () => <div data-testid="phone-icon" />,
  WhatsAppIcon: () => <div data-testid="whatsapp-icon" />,
}));

function makeLeafletMock(mapOverrides = {}) {
  const mockMapInstance = {
    remove: vi.fn(),
    bindPopup: vi.fn().mockReturnThis(),
    openPopup: vi.fn(),
    addTo: vi.fn().mockReturnThis(),
    ...mapOverrides,
  };

  const mockMarker = {
    bindPopup: vi.fn().mockReturnThis(),
    openPopup: vi.fn().mockReturnThis(),
    addTo: vi.fn().mockReturnThis(),
  };

  return {
    map: vi.fn().mockReturnValue(mockMapInstance),
    control: { zoom: vi.fn().mockReturnValue({ addTo: vi.fn() }) },
    tileLayer: vi.fn().mockReturnValue({ addTo: vi.fn() }),
    divIcon: vi.fn().mockReturnValue({}),
    marker: vi.fn().mockReturnValue(mockMarker),
    _mapInstance: mockMapInstance,
  };
}

describe('LocationMap', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete window.L;
  });

  it('renders correctly without leaflet loaded', () => {
    delete window.L;
    const { container } = render(<LocationMap leafletLoaded={false} />);
    expect(screen.getByText('findUs')).toBeInTheDocument();
    expect(container.querySelector('#studio-map')).toBeInTheDocument();
  });

  it('initializes map on happy path when leaflet is loaded', () => {
    const L = makeLeafletMock();
    window.L = L;

    render(<LocationMap leafletLoaded={true} />);

    expect(L.map).toHaveBeenCalledWith('studio-map', expect.any(Object));
    expect(L.tileLayer).toHaveBeenCalled();
    expect(L.marker).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('handles Leaflet map cleanup error safely', () => {
    const removeMock = vi.fn().mockImplementation(() => {
      throw new Error('Cleanup error for test');
    });
    const L = makeLeafletMock({ remove: removeMock });
    window.L = L;

    const { unmount } = render(<LocationMap leafletLoaded={true} />);
    unmount();

    expect(removeMock).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Leaflet Cleanup Error:',
      expect.any(Error)
    );
  });

  it('handles initialization error safely', () => {
    window.L = {
      map: vi.fn().mockImplementation(() => {
        throw new Error('Init error for test');
      }),
      control: { zoom: vi.fn() },
      tileLayer: vi.fn(),
      divIcon: vi.fn(),
      marker: vi.fn(),
    };

    render(<LocationMap leafletLoaded={true} />);

    expect(console.error).toHaveBeenCalledWith(
      'Leaflet Map Initialization Error:',
      expect.any(Error)
    );
  });
});
