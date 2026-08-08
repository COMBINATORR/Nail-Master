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

  it('clears pre-existing Leaflet instance on the DOM node to avoid "Map container is already initialized" crash', () => {
    const L = makeLeafletMock();
    window.L = L;

    // Create a mock parent node and map node to simulate existing leaflet initialization
    const parentNode = document.createElement('div');
    const existingMapNode = document.createElement('div');
    existingMapNode.id = 'studio-map';
    existingMapNode.className = 'w-full h-full';
    // Add the property that Leaflet uses to check for existing initialization
    existingMapNode._leaflet_id = 123;
    parentNode.appendChild(existingMapNode);

    // We need to append it to the document body because the component uses document.getElementById
    document.body.appendChild(parentNode);

    render(<LocationMap leafletLoaded={true} />);

    // The component should have created a new node and replaced the old one
    const newMapNode = document.getElementById('studio-map');
    expect(newMapNode).toBeTruthy();
    expect(newMapNode._leaflet_id).toBeUndefined(); // Should be a new node without the ID
    expect(L.map).toHaveBeenCalledWith('studio-map', expect.any(Object));

    document.body.removeChild(parentNode);
  });

  it('handles map instance removal during initialization', () => {
    const removeMock = vi.fn();
    const L = makeLeafletMock({ remove: removeMock });
    window.L = L;

    const { rerender } = render(<LocationMap leafletLoaded={true} theme="light" />);
    expect(L.map).toHaveBeenCalledTimes(1);

    rerender(<LocationMap leafletLoaded={true} theme="dark" />);
    expect(removeMock).toHaveBeenCalledTimes(1);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('handles existing Leaflet DOM node safely to avoid crash', () => {
    const L = makeLeafletMock();
    window.L = L;

    const { container, rerender } = render(<LocationMap leafletLoaded={true} theme="light" />);

    const mapNode = container.querySelector('#studio-map');

    // Simulate Leaflet's internal state
    mapNode._leaflet_id = 'test-id';

    // Provide a replaceChild spy on parentNode for the specific branch testing
    const originalParentNode = mapNode.parentNode;
    if (originalParentNode) {
        originalParentNode.replaceChild = vi.fn((newChild, oldChild) => {
            originalParentNode.removeChild(oldChild);
            originalParentNode.appendChild(newChild);
        });
    }

    rerender(<LocationMap leafletLoaded={true} theme="dark" />);

    expect(originalParentNode.replaceChild).toHaveBeenCalled();
  });

  it('handles error gracefully when mapInstance.remove() throws during initialization', () => {
    const throwMock = vi.fn().mockImplementation(() => {
        throw new Error('remove error');
    });
    const L = makeLeafletMock();
    window.L = L;

    const { rerender } = render(<LocationMap leafletLoaded={true} theme="light" />);

    // Apply the throwing mock for the second render
    L.map().remove = throwMock;

    rerender(<LocationMap leafletLoaded={true} theme="dark" />);

    expect(console.error).toHaveBeenCalledWith(
      'Leaflet Map Initialization Error:',
      expect.any(Error)
    );
  });
});
