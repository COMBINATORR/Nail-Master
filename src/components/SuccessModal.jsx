import { useTranslation } from 'react-i18next';

export const SuccessModal = ({ showModal, handleModalClose }) => {
  const { t } = useTranslation();

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm popup-backdrop">
      <div className="liquid-glass-strong rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
        <div className="w-14 h-14 icon-success rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">✓</div>
        <h3 className="font-display text-xl font-black uppercase tracking-tight text-[var(--text-primary)] mb-3">
          {t('modalSuccessTitle')}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
          {t('modalSuccessDesc')}
        </p>
        <button
          onClick={handleModalClose}
          className="w-full btn-premium-tactile py-3 rounded-xl text-sm tracking-wide transition-all"
        >
          {t('modalClose')}
        </button>
      </div>
    </div>
  );
};
