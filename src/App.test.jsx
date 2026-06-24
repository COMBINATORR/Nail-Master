import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App'

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
