import { useTranslation } from 'react-i18next';
import { InstagramIcon, WhatsAppIcon, PhoneIcon } from './Icons';
import { AwardBadge } from './ui/AwardBadge';

const textMuted = 'text-[var(--text-muted)]';
const borderSubtle = 'border-[var(--border-subtle)]';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="liquid-glass-footer py-10 transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
          {/* Logo + studio text */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <div className="static-logo">
              <span className="static-logo-title text-3xl sm:text-4xl">
                <span>S</span>
                <span>V</span>
                <span>T</span>
                <span>L</span>
              </span>
              <span className="static-logo-subtitle text-[13px] sm:text-[15px]">Nails &amp; Aesthetic</span>
            </div>
            <p className={`${textMuted} text-xs max-w-xs text-center lg:text-left whitespace-pre-line`}>
              {t('footerText')}
            </p>
          </div>

          {/* Award badge — centered */}
          <div className="flex justify-center">
            <AwardBadge brand={t('awardBrand')} title={t('awardTitle')} />
          </div>

          {/* Social icons */}
          <div className="flex gap-5 items-center justify-center lg:justify-end">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[var(--text-muted)] hover:text-[#E1306C] transition-colors duration-200"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/77016698086"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-[var(--text-muted)] hover:text-[#25D366] transition-colors duration-200"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <a
              href="tel:+77016698086"
              aria-label="Call"
              className="text-[var(--text-muted)] hover:text-[#4A90D9] transition-colors duration-200"
            >
              <PhoneIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className={`border-t ${borderSubtle} mt-8 pt-6 text-center`}>
          <p className="text-[var(--text-muted)]/60 text-[10px]">
            © {new Date().getFullYear()} {t('brand')}. {t('rights')}
          </p>
          <p className="spcwlkr-credit mt-3">Powered by SPCWLKR Digital Studio</p>
        </div>
      </div>
    </footer>
  );
};
