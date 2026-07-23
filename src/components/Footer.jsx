import { useTranslation } from 'react-i18next';
import { InstagramIcon, WhatsAppIcon, PhoneIcon } from './Icons';
import { AwardBadge } from './ui/AwardBadge';
import { StudioCreditMenu } from './StudioCreditMenu';

const textMuted = 'text-[var(--text-muted)]';
const borderSubtle = 'border-[var(--border-subtle)]';

const socialClass =
  'text-[var(--text-muted)] hover:text-bronze-400 transition-colors duration-200';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="liquid-glass-footer py-12 sm:py-14 transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-10 sm:gap-12">
          {/* Row 1: brand left · socials right */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
            <div className="flex flex-col items-center sm:items-start gap-3">
              <div className="static-logo">
                <span className="static-logo-title text-3xl sm:text-4xl">
                  <span>S</span>
                  <span>V</span>
                  <span>T</span>
                  <span>L</span>
                </span>
                <span className="static-logo-subtitle text-[13px] sm:text-[15px]">
                  Nails &amp; Aesthetic
                </span>
              </div>
              <p
                className={`${textMuted} text-xs leading-relaxed max-w-[240px] text-center sm:text-left whitespace-pre-line`}
              >
                {t('footerText')}
              </p>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-6 sm:pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`${socialClass} hover:text-[#E1306C]`}
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/77016698086"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={`${socialClass} hover:text-[#25D366]`}
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
              <a
                href="tel:+77016698086"
                aria-label="Call"
                className={`${socialClass} hover:text-[#4A90D9]`}
              >
                <PhoneIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Row 2: award — own row, truly centered */}
          <div className="flex justify-center">
            <AwardBadge brand={t('awardBrand')} title={t('awardTitle')} />
          </div>

          {/* Row 3: legal */}
          <div className={`border-t ${borderSubtle} pt-6 flex flex-col items-center gap-2 text-center`}>
            <p className="text-[var(--text-muted)]/60 text-[10px] tracking-wide">
              © {year} {t('brand')}. {t('rights')}
            </p>
            <StudioCreditMenu />
          </div>
        </div>
      </div>
    </footer>
  );
};
