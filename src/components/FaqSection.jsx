import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faqData } from '../data/faqs';
import { ChevronDownIcon } from './Icons';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const textMuted = 'text-[var(--text-muted)]';
const border = 'border-[var(--border-color)]';
const bgAlt = 'bg-[var(--bg-alt)]';

export const FaqSection = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'ru';
  const [activeFaq, setActiveFaq] = useState(null);

  const renderFaqCard = (item, i, keyPrefix) => {
    const isOpen = activeFaq === i;
    return (
      <div key={`${keyPrefix}-${i}`} className="liquid-glass rounded-2xl overflow-hidden transition-all duration-300">
        <button onClick={() => setActiveFaq(isOpen ? null : i)}
          className="w-full flex justify-between items-center p-5 text-left hover:text-bronze-500 transition-colors">
          <span className={`font-display font-bold uppercase text-xs tracking-wide ${textPrimary} leading-snug`}>{item.q}</span>
          <ChevronDownIcon className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-bronze-500' : textMuted}`} />
        </button>
        <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`} style={{ overflow: 'hidden' }}>
          <div className={`p-5 liquid-glass-body ${textSecondary} text-sm leading-relaxed`}>{item.a}</div>
        </div>
      </div>
    );
  };

  return (
    <section id="faq" className={`${bgAlt} border-b ${border} py-14 lg:py-20 transition-colors duration-300`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-10 text-center`}>{t('fearTitle')}</h2>
        {/* Mobile FAQ list */}
        <div className="flex flex-col gap-3 lg:hidden max-w-5xl mx-auto">
          {faqData[lang].map((item, i) => renderFaqCard(item, i, 'mob'))}
        </div>

        {/* Desktop FAQ columns */}
        <div className="hidden lg:grid grid-cols-2 gap-3 max-w-5xl items-start mx-auto">
          <div className="flex flex-col gap-3">
            {faqData[lang].map((item, i) => i % 2 === 0 ? renderFaqCard(item, i, 'desk-l') : null)}
          </div>
          <div className="flex flex-col gap-3">
            {faqData[lang].map((item, i) => i % 2 !== 0 ? renderFaqCard(item, i, 'desk-r') : null)}
          </div>
        </div>
      </div>
    </section>
  );
};
