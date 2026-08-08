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
    <footer className="liquid-glass-footer py-6 lg:py-8 transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-6">
          {/* Main row: Brand + Award + Socials */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="static-logo">
                <span className="static-logo-title text-2xl sm:text-3xl">
                  <span>S</span>
                  <span>V</span>
                  <span>T</span>
                  <span>L</span>
                </span>
                <span className="static-logo-subtitle text-[11px] sm:text-[13px]">
                  Nails &amp; Aesthetic
                </span>
              </div>
              <p className={`${textMuted} text-[11px] leading-tight max-w-[260px] text-center md:text-left`}>
                {t('footerText')}
              </p>
            </div>

            {/* Award badge */}
            <div className="flex justify-center flex-shrink-0">
              <AwardBadge brand={t('awardBrand')} title={t('awardTitle')} />
            </div>

            {/* Socials */}
            <div className="footer-socials flex items-center justify-center md:justify-end gap-4 sm:gap-5">
              {SOCIALS.map(({ id, href, label, accent, Icon }) => (
                <a
                  key={id}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="footer-social-link group"
                  style={{ '--social-accent': accent }}
                >
                  <span className="footer-social-icon">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="footer-social-label text-xs">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Legal row */}
          <div className={`border-t ${borderSubtle} pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left`}>
            <p className="footer-copy text-[10px] tracking-wide">
              © {year} {t('brand')}. {t('rights')}
            </p>
            <StudioCreditMenu />
          </div>
        </div>
      </div>
    </footer>
  );
};
