import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LocationMap } from './LocationMap';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' }
  })
}));

describe('LocationMap', () => {
  beforeEach(() => {
    vi.stubGlobal('L', {
      map: vi.fn().mockReturnValue({
        remove: vi.fn()
      }),
      control: {
        zoom: vi.fn().mockReturnValue({ addTo: vi.fn() })
      },
      tileLayer: vi.fn().mockReturnValue({ addTo: vi.fn() }),
      divIcon: vi.fn().mockReturnValue('mockIcon'),
      marker: vi.fn().mockReturnValue({
        addTo: vi.fn().mockReturnValue({
          bindPopup: vi.fn().mockReturnValue({
            openPopup: vi.fn()
          })
        })
      })
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete window.L;
  });

  it('renders correctly without leaflet loaded', () => {
    const originalL = window.L;
    delete window.L;

    const { container } = render(<LocationMap leafletLoaded={false} />);
    expect(container.querySelector('#studio-map')).toBeInTheDocument();

    window.L = originalL;
  });

  it('renders and initializes map when leaflet is loaded', () => {
    render(<LocationMap leafletLoaded={true} />);

    expect(window.L.map).toHaveBeenCalledWith('studio-map', expect.any(Object));
    expect(window.L.tileLayer).toHaveBeenCalled();
    expect(window.L.marker).toHaveBeenCalled();
  });

  it('handles existing leaflet instance on map node', () => {
    const originalGetElementById = document.getElementById;

    // Create a mock node with _leaflet_id to simulate an existing map
    const mockNode = document.createElement('div');
    mockNode.id = 'studio-map';
    mockNode._leaflet_id = 123;
    const parentNode = document.createElement('div');
    parentNode.appendChild(mockNode);

    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'studio-map') return mockNode;
      return originalGetElementById.call(document, id);
    });

    render(<LocationMap leafletLoaded={true} />);

    // Parent node should have replaced the child, so it should only have 1 child which is not the old mockNode
    expect(parentNode.childNodes.length).toBe(1);
    expect(parentNode.childNodes[0]._leaflet_id).toBeUndefined();

    // Clean up
    document.getElementById.mockRestore();
  });

  it('catches and logs error when leaflet cleanup fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const mockError = new Error('Cleanup failed');
    window.L.map.mockReturnValue({
      remove: vi.fn().mockImplementation(() => {
        throw mockError;
      })
    });

    const { unmount } = render(<LocationMap leafletLoaded={true} />);

    unmount();

    expect(consoleSpy).toHaveBeenCalledWith('Leaflet Cleanup Error:', mockError);
  });

  it('catches and logs error when leaflet initialization fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const mockError = new Error('Init failed');
    window.L.map.mockImplementation(() => {
      throw mockError;
    });

    render(<LocationMap leafletLoaded={true} />);

    expect(consoleSpy).toHaveBeenCalledWith('Leaflet Map Initialization Error:', mockError);
  });
});
