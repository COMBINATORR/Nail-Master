import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBooking } from './useBooking';

// Mock generateWhatsAppText to observe how it's called
vi.mock('../whatsapp', () => ({
  generateWhatsAppText: vi.fn(() => 'MOCKED_WA_TEXT')
}));
import { generateWhatsAppText } from '../whatsapp';

describe('useBooking', () => {
  let mockT;
  let defaultProps;

  beforeEach(() => {
    mockT = vi.fn((key) => key);
    defaultProps = {
      lang: 'en',
      t: mockT,
      next10Days: [{ id: 'day1', formatted: 'Day 1' }]
    };

    // Mock alert and scrolling
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    const originalGetElementById = document.getElementById.bind(document);
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'appointment-form') {
        return { scrollIntoView: vi.fn() };
      }
      return originalGetElementById(id);
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useBooking(defaultProps));

    expect(result.current.activeCategory).toBe('manicure');
    expect(result.current.selectedServiceIds.size).toBe(0);
    expect(result.current.selectedOptions.size).toBe(0);
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.totalTime).toBe(0);
    expect(result.current.categoryCounts).toEqual({ manicure: 0, pedicure: 0, sugaring: 0 });
    expect(result.current.needsNailShape).toBe(false);
  });

  it('changes active category', () => {
    const { result } = renderHook(() => useBooking(defaultProps));

    act(() => {
      result.current.setActiveCategory('pedicure');
    });
    expect(result.current.activeCategory).toBe('pedicure');

    // Attempting to change to the same category should do nothing
    act(() => {
      result.current.setActiveCategory('pedicure');
    });
    expect(result.current.activeCategory).toBe('pedicure');
  });

  it('toggles services', () => {
    const { result } = renderHook(() => useBooking(defaultProps));

    act(() => {
      result.current.toggleService('manicure:gel');
    });
    expect(result.current.selectedServiceIds.has('manicure:gel')).toBe(true);
    expect(result.current.selectedServices.length).toBe(1);
    expect(result.current.selectedServices[0].id).toBe('gel');
    expect(result.current.categoryCounts).toEqual({ manicure: 1, pedicure: 0, sugaring: 0 });

    // Toggling again should remove it
    act(() => {
      result.current.toggleService('manicure:gel');
    });
    expect(result.current.selectedServiceIds.has('manicure:gel')).toBe(false);
    expect(result.current.selectedServices.length).toBe(0);
    expect(result.current.categoryCounts).toEqual({ manicure: 0, pedicure: 0, sugaring: 0 });
  });

  it('toggles options', () => {
    const { result } = renderHook(() => useBooking(defaultProps));

    act(() => {
      result.current.toggleOption('pedicure:design');
    });
    expect(result.current.selectedOptions.has('pedicure:design')).toBe(true);
    expect(result.current.categoryCounts).toEqual({ manicure: 0, pedicure: 1, sugaring: 0 });

    act(() => {
      result.current.toggleOption('pedicure:design');
    });
    expect(result.current.selectedOptions.has('pedicure:design')).toBe(false);
  });

  it('calculates total price and time', () => {
    const { result } = renderHook(() => useBooking(defaultProps));

    act(() => {
      result.current.toggleService('manicure:gel'); // price: 6000, time: 90
      result.current.toggleOption('manicure:design'); // price: 2000, time: 20
    });

    expect(result.current.totalPrice).toBe(8000);
    expect(result.current.totalTime).toBe(110);
  });

  it('determines if nail shape is needed', () => {
    const { result } = renderHook(() => useBooking(defaultProps));

    expect(result.current.needsNailShape).toBe(false);

    act(() => {
      result.current.toggleService('sugaring:legs');
    });
    expect(result.current.needsNailShape).toBe(false);

    act(() => {
      result.current.toggleService('manicure:classic');
    });
    expect(result.current.needsNailShape).toBe(true);
  });

  it('formats time correctly', () => {
    const { result } = renderHook(() => useBooking(defaultProps));

    expect(result.current.fmtTime(30)).toBe('30 min_short');
    expect(result.current.fmtTime(60)).toBe('1 hour_short ');
    expect(result.current.fmtTime(90)).toBe('1 hour_short 30 min_short');
  });

  it('handles calculator CTA scroll', () => {
    const { result } = renderHook(() => useBooking(defaultProps));
    const mockScroll = vi.fn();
    const originalGetElementById = document.getElementById.bind(document);
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'appointment-form') {
        return { scrollIntoView: mockScroll };
      }
      return originalGetElementById(id);
    });

    act(() => {
      result.current.handleCalculatorCta();
    });

    expect(document.getElementById).toHaveBeenCalledWith('appointment-form');
    expect(mockScroll).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  describe('handleSubmit', () => {
    it('alerts if name is invalid', () => {
      const { result } = renderHook(() => useBooking(defaultProps));

      const mockEvent = { preventDefault: vi.fn() };
      act(() => {
        result.current.handleSubmit(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Please enter a valid name (max 50 chars).');
    });

    it('alerts if phone is invalid', () => {
      const { result } = renderHook(() => useBooking(defaultProps));

      act(() => {
        result.current.setName('John Doe');
      });
      act(() => {
        result.current.handleSubmit({ preventDefault: vi.fn() });
      });

      expect(window.alert).toHaveBeenCalledWith('Please enter a valid phone number.');
    });

    it('alerts if no services are selected', () => {
      const { result } = renderHook(() => useBooking(defaultProps));

      act(() => {
        result.current.setName('John Doe');
        result.current.setPhone('1234567890');
      });
      act(() => {
        result.current.handleSubmit({ preventDefault: vi.fn() });
      });

      expect(window.alert).toHaveBeenCalledWith('Please select at least one service.');
    });

    it('alerts if date or time is missing', () => {
      const { result } = renderHook(() => useBooking(defaultProps));

      act(() => {
        result.current.setName('John Doe');
        result.current.setPhone('1234567890');
        result.current.toggleService('manicure:gel');
      });
      act(() => {
        result.current.handleSubmit({ preventDefault: vi.fn() });
      });

      expect(window.alert).toHaveBeenCalledWith('Please select a date and time.');
    });

    it('submits successfully and opens WhatsApp', () => {
      const { result } = renderHook(() => useBooking(defaultProps));

      const mockClick = vi.fn();
      const mockLink = {
        href: '',
        target: '',
        rel: '',
        click: mockClick
      };

      vi.spyOn(document, 'createElement').mockReturnValue(mockLink);
      vi.spyOn(document.body, 'appendChild').mockImplementation(() => {});
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => {});

      act(() => {
        result.current.setName('John Doe');
        result.current.setPhone('+1234567890');
        result.current.toggleService('manicure:gel');
        result.current.setSelectedDate('day1');
        result.current.setSelectedTime('10:00');
      });

      act(() => {
        result.current.handleSubmit({ preventDefault: vi.fn() });
      });

      expect(result.current.isSubmitting).toBe(true);
      expect(generateWhatsAppText).toHaveBeenCalled();

      expect(mockLink.href).toBe('https://wa.me/77016698086?text=MOCKED_WA_TEXT');
      expect(mockLink.target).toBe('_blank');
      expect(mockClick).toHaveBeenCalled();

      // Fast-forward timeout for resetting isSubmitting and showing modal
      act(() => {
        vi.runAllTimers();
      });

      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.showModal).toBe(true);
    });

    it('handles modal close', () => {
      const { result } = renderHook(() => useBooking(defaultProps));

      act(() => {
        result.current.setName('John');
        result.current.setPhone('123');
        result.current.setShowModal(true);
        result.current.handleModalClose();
      });

      expect(result.current.showModal).toBe(false);
      expect(result.current.name).toBe('');
      expect(result.current.phone).toBe('');
    });
  });
});
