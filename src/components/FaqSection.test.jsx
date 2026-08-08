import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FaqSection } from './FaqSection';
import { faqData } from '../data/faqs';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'ru' }
  }),
}));

describe('FaqSection', () => {
  it('renders the component title', () => {
    render(<FaqSection />);
    expect(screen.getByText('fearTitle')).toBeInTheDocument();
  });

  it('renders all FAQ questions for the default language', () => {
    render(<FaqSection />);
    faqData.ru.forEach((faq) => {
      const questions = screen.getAllByText(faq.q);
      expect(questions.length).toBeGreaterThan(0);
    });
  });

  it('initially renders all FAQ answers as closed', () => {
    render(<FaqSection />);
    faqData.ru.forEach((faq) => {
      const answers = screen.getAllByText(faq.a);
      answers.forEach(answer => {
        const wrapper = answer.parentElement;
        expect(wrapper).toHaveClass('max-h-0');
        expect(wrapper).not.toHaveClass('max-h-40');
      });
    });
  });

  it('toggles FAQ open state on click', () => {
    render(<FaqSection />);
    const firstFaq = faqData.ru[0];

    const button = screen.getAllByText(firstFaq.q)[0].closest('button');
    const answer = screen.getAllByText(firstFaq.a)[0];
    const wrapper = answer.parentElement;

    expect(wrapper).toHaveClass('max-h-0');

    fireEvent.click(button);
    expect(wrapper).toHaveClass('max-h-40');
    expect(wrapper).not.toHaveClass('max-h-0');

    fireEvent.click(button);
    expect(wrapper).toHaveClass('max-h-0');
  });

  it('closes previously opened FAQ when opening a new one', () => {
    render(<FaqSection />);
    const firstFaq = faqData.ru[0];
    const secondFaq = faqData.ru[1];

    const firstButton = screen.getAllByText(firstFaq.q)[0].closest('button');
    const secondButton = screen.getAllByText(secondFaq.q)[0].closest('button');

    const firstWrapper = screen.getAllByText(firstFaq.a)[0].parentElement;
    const secondWrapper = screen.getAllByText(secondFaq.a)[0].parentElement;

    fireEvent.click(firstButton);
    expect(firstWrapper).toHaveClass('max-h-40');
    expect(secondWrapper).toHaveClass('max-h-0');

    fireEvent.click(secondButton);
    expect(firstWrapper).toHaveClass('max-h-0');
    expect(secondWrapper).toHaveClass('max-h-40');
  });
});
