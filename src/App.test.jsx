import { render, screen, waitFor, fireEvent } from '@testing-library/react'
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
    // There are multiple "RU" texts in the UI, check if there's at least one that is tracked as a button or text
    const ruElements = screen.getAllByText('RU')
    expect(ruElements.length).toBeGreaterThan(0)
  })

  it('verifies that default theme class is applied to body', async () => {
    render(<App />)
    await waitFor(() => {
      // It might not use data-theme on jsdom but it definitely applies a class
      expect(document.body.className).toContain('theme-dark')
    })
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
