import { useTranslation } from 'react-i18next';
import BorderGlow from './ui/BorderGlow';
import ScrollStack, { ScrollStackItem } from './ui/ScrollStack';
import { mobileStackProps } from './ui/scrollStackDefaults';
import { useIsMobileStack } from '../hooks/useMediaQuery';

const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const border = 'border-[var(--border-color)]';

const GuaranteeCard = ({ badge, title, desc }) => (
  <BorderGlow
    edgeSensitivity={35}
    glowColor="40 80 60"
    backgroundColor="var(--bg-card)"
    borderRadius={16}
    glowRadius={30}
    glowIntensity={1.2}
    coneSpread={25}
    colors={['var(--beam-color-1)', 'var(--beam-color-2, var(--accent))', 'var(--accent)']}
    className="w-full"
  >
    <div className="flex flex-col gap-4 p-5 h-full">
      <div className="flex justify-between items-center">
        <span className="liquid-glass-pill text-[10px] font-sans font-black uppercase tracking-widest px-3 py-1 rounded-full text-accent">
          {badge}
        </span>
      </div>
      <div>
        <h3 className={`font-display text-base lg:text-lg font-black uppercase tracking-wider ${textPrimary} mb-2`}>
          {title}
        </h3>
        <p className={`${textSecondary} text-xs leading-relaxed`}>
          {desc}
        </p>
      </div>
    </div>
  </BorderGlow>
);

export const Guarantees = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobileStack();

  const cards = [
    { badge: '01', title: t('g1Title'), desc: t('g1Desc') },
    { badge: '02', title: t('g2Title'), desc: t('g2Desc') },
    { badge: '03', title: t('g3Title'), desc: t('g3Desc') },
    { badge: '04', title: t('g4Title'), desc: t('g4Desc') },
  ];

  return (
    <section id="guarantees" className={`border-b ${border} py-14 lg:py-20`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-2 text-center`}>
          {t('guaranteesTitle')}
        </h2>
        <p className={`${textSecondary} text-sm max-w-xl mb-8 text-center mx-auto`}>
          {t('guaranteesSubtitle')}
        </p>

        {isMobile ? (
          <ScrollStack {...mobileStackProps}>
            {cards.map((g) => (
              <ScrollStackItem key={g.badge}>
                <GuaranteeCard {...g} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((g) => (
              <GuaranteeCard key={g.badge} {...g} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
