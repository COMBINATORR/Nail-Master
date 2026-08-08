import { useTranslation } from 'react-i18next';
import { InstagramIcon, WhatsAppIcon, PhoneIcon } from './Icons';
import { AwardBadge } from './ui/AwardBadge';
import { StudioCreditMenu } from './StudioCreditMenu';

const textMuted = 'text-[var(--text-muted)]';
const borderSubtle = 'border-[var(--border-subtle)]';

const SOCIALS = [
  {
    id: 'instagram',
    href: 'https://instagram.com',
    label: 'Instagram',
    accent: '#E1306C',
    Icon: InstagramIcon,
  },
  {
    id: 'whatsapp',
    href: 'https://wa.me/77016698086',
    label: 'WhatsApp',
    accent: '#25D366',
    Icon: WhatsAppIcon,
  },
  {
    id: 'phone',
    href: 'tel:+77016698086',
    label: 'Телефон',
    accent: '#4A90D9',
    Icon: PhoneIcon,
  },
];

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="liquid-glass-footer py-4 lg:py-5 transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-3 sm:gap-3.5">
          {/* Main row: Brand + Award + Socials */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-0.5">
              <div className="static-logo">
                <span className="static-logo-title text-xl sm:text-2xl">
                  <span>S</span>
                  <span>V</span>
                  <span>T</span>
                  <span>L</span>
                </span>
                <span className="static-logo-subtitle text-[10px] sm:text-[11px]">
                  Nails &amp; Aesthetic
                </span>
              </div>
              <p className={`${textMuted} text-[10px] leading-none max-w-[260px] text-center md:text-left`}>
                {t('footerText')}
              </p>
            </div>

            {/* Award badge */}
            <div className="flex justify-center flex-shrink-0 scale-90 sm:scale-95">
              <AwardBadge brand={t('awardBrand')} title={t('awardTitle')} />
            </div>

            {/* Socials */}
            <div className="footer-socials flex items-center justify-center md:justify-end gap-3 sm:gap-4">
              {SOCIALS.map(({ id, href, label, accent, Icon }) => (
                <a
                  key={id}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="footer-social-link group py-1"
                  style={{ '--social-accent': accent }}
                >
                  <span className="footer-social-icon">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="footer-social-label text-[11px]">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Legal row */}
          <div className={`border-t ${borderSubtle} pt-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left`}>
            <p className="footer-copy text-[9px] sm:text-[10px] tracking-wide">
              © {year} {t('brand')}. {t('rights')}
            </p>
            <StudioCreditMenu />
          </div>
        </div>
      </div>
    </footer>
  );
};
