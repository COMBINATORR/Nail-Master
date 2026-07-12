import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App, { getNext10Days } from './App'

describe('App Component', () => {
  beforeEach(() => {
    window.localStorage.clear()
    vi.clearAllMocks()
    document.body.className = ''
    document.body.removeAttribute('data-theme')
  })

  it('renders the main logo title SVTL', () => {
    render(<App />)
    const logoElements = screen.getAllByText(/[SVTL]/)
    expect(logoElements.length).toBeGreaterThan(0)
  })

  it('renders subtitles correctly', () => {
    render(<App />)
    expect(screen.getAllByText(/Nails & Aesthetic/i).length).toBeGreaterThan(0)
  })

  it('verifies that the language toggle shows RU initially', () => {
    render(<App />)
    const ruElements = screen.getAllByText('RU')
    expect(ruElements.length).toBeGreaterThan(0)
  })

  it('verifies that default theme class is applied to body', async () => {
    render(<App />)
    await waitFor(() => {
      expect(document.body.className).toContain('theme-dark')
    })
  })


  it('handles audio errors gracefully when playPowerUp/playPowerDown throws', async () => {
    const originalAudioContext = window.AudioContext;
    window.AudioContext = class {
      constructor() {
        throw new Error('AudioContext error');
      }
    };

    vi.useFakeTimers({ shouldAdvanceTime: true })
    const { container } = render(<App />)
    const logoContainer = container.querySelector('.logo-container')

    const h1Elements = container.querySelectorAll('h1');
    h1Elements.forEach(el => {
      vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
        bottom: 100, width: 100, height: 100, top: 0, left: 0, right: 100, x: 0, y: 0
      })
    })

    expect(() => {
      for (let i = 0; i < 5; i++) {
        fireEvent.click(logoContainer)
      }
    }).not.toThrow()

    let restoreBtn;
    await waitFor(() => {
      restoreBtn = document.getElementById('gravity-restore-btn')
      expect(restoreBtn).toBeInTheDocument()
    })

    expect(() => {
      fireEvent.click(restoreBtn)
    }).not.toThrow()

    window.AudioContext = originalAudioContext;
    vi.useRealTimers()
  })

  it('verifies gravity restore functionality', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const { container } = render(<App />)
    const logoContainer = container.querySelector('.logo-container')

    // We must mock getBoundingClientRect for elements to not return 0 height/width
    // so that gravity explosion doesn't skip them
    const h1Elements = container.querySelectorAll('h1');
    h1Elements.forEach(el => {
      vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
        bottom: 100, width: 100, height: 100, top: 0, left: 0, right: 100, x: 0, y: 0
      })
    })

    // Fast click 5 times
    for (let i = 0; i < 5; i++) {
      fireEvent.click(logoContainer)
    }

    // Now gravity explosion should be triggered, and gravity restore button should be visible.
    let restoreBtn;
    await waitFor(() => {
      restoreBtn = document.getElementById('gravity-restore-btn')
      expect(restoreBtn).toBeInTheDocument()
    })

    // Elements should be exploded (inline styles for transition, transform, pointerEvents)
    const someExplodedElement = container.querySelector('h1') // example
    if (someExplodedElement) {
        expect(someExplodedElement.style.transition).toContain('1100ms')
    }

    // Click restore
    fireEvent.click(restoreBtn)

    // After click restore:
    // It should immediately reset the transform to none, transition to 600ms
    if (someExplodedElement) {
        expect(someExplodedElement.style.transition).toContain('600ms')
        expect(someExplodedElement.style.transform).toBe('translate(0, 0) rotate(0deg)')
    }

    // After setTimeout (600ms) the button is hidden and original styles are restored.
    act(() => { vi.advanceTimersByTime(600) });
    await waitFor(() => {
      expect(document.getElementById('gravity-restore-btn')).not.toBeInTheDocument()
    })
    vi.useRealTimers()
  })
})

describe('Form Submission Validation', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('alerts when name is empty', () => {
    const { container } = render(<App />)
    const form = container.querySelector('form')
    fireEvent.submit(form)
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/имя|name|есім/i))
  })

  it('alerts when name is too long', () => {
    const { container } = render(<App />)
    const nameInput = container.querySelector('input[type="text"]')
    fireEvent.change(nameInput, { target: { value: 'a'.repeat(51) } })
    const form = container.querySelector('form')
    fireEvent.submit(form)
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/имя|name|есім/i))
  })

  it('alerts when phone is invalid', () => {
    const { container } = render(<App />)
    const nameInput = container.querySelector('input[type="text"]')
    fireEvent.change(nameInput, { target: { value: 'Valid Name' } })
    const form = container.querySelector('form')
    fireEvent.submit(form)
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/телефон|phone|телефон/i))
  })

  it('alerts when no service is selected', () => {
    const { container } = render(<App />)
    const nameInput = container.querySelector('input[type="text"]')
    fireEvent.change(nameInput, { target: { value: 'Valid Name' } })
    const phoneInput = container.querySelector('input[type="tel"]')
    fireEvent.change(phoneInput, { target: { value: '+77011234567' } })
    const form = container.querySelector('form')
    fireEvent.submit(form)
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/услугу|service|қызметті/i))
  })
})

describe('getNext10Days', () => {


  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns exactly 10 days starting from the mocked current day', () => {
    vi.setSystemTime(new Date(2023, 9, 15, 10, 0, 0)) // Oct 15, 2023
    const days = getNext10Days('en')

    expect(days).toHaveLength(10)
    expect(days[0].id).toBe('2023-10-15')
    expect(days[0].formatted).toBe('15.10')
    expect(days[9].id).toBe('2023-10-24')
    expect(days[9].formatted).toBe('24.10')
  })

  it('supports multiple languages correctly returning the translated day', () => {
    vi.setSystemTime(new Date(2023, 9, 15, 10, 0, 0)) // Oct 15, 2023 is Sunday

    expect(getNext10Days('en')[0].weekday).toBe('Sun')
    expect(getNext10Days('ru')[0].weekday).toBe('Вс')
    expect(getNext10Days('kk')[0].weekday).toBe('Жс')
    expect(getNext10Days('zh')[0].weekday).toBe('周日')
    expect(getNext10Days('ko')[0].weekday).toBe('일')
  })

  it('caches the results and breaks cache when date advances', () => {
    vi.setSystemTime(new Date(2023, 9, 15, 10, 0, 0)) // Oct 15, 2023

    const firstCall = getNext10Days('en')
    const secondCall = getNext10Days('en')

    // Check reference equality for cached result
    expect(firstCall).toBe(secondCall)

    // Advance time to next day
    vi.setSystemTime(new Date(2023, 9, 16, 10, 0, 0)) // Oct 16, 2023

    const nextDayCall = getNext10Days('en')

    expect(nextDayCall).not.toBe(firstCall)
    expect(nextDayCall[0].id).toBe('2023-10-16')
  })
})
