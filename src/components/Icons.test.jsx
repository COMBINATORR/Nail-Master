import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CheckIcon, ChevronDownIcon, WhatsAppIcon, PhoneIcon } from './Icons'

describe('Icons', () => {
  it('renders CheckIcon as an SVG', () => {
    const { container } = render(<CheckIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders ChevronDownIcon with a custom className', () => {
    const { container } = render(<ChevronDownIcon className="test-class" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('test-class')
  })

  it('renders WhatsAppIcon as an SVG', () => {
    const { container } = render(<WhatsAppIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders PhoneIcon as an SVG', () => {
    const { container } = render(<PhoneIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
