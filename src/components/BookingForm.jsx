import { useTranslation } from 'react-i18next';
import { WhatsAppIcon, PhoneIcon } from './Icons';

const bg = 'bg-transparent';
const bgCard = 'bg-[var(--bg-card)]';
const textPrimary = 'text-[var(--text-primary)]';
const textSecondary = 'text-[var(--text-secondary)]';
const textMuted = 'text-[var(--text-muted)]';
const border = 'border-[var(--border-color)]';

export const BookingForm = ({
  name,
  setName,
  phone,
  setPhone,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  next10Days,
  visitMode,
  setVisitMode,
  isSubmitting,
  handleSubmit,
  selectedServices,
  selectedOptions,
  optionsById,
  totalPrice,
  totalTime,
  fmtTime
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="appointment-form" className={`${bg} py-14 lg:py-20 transition-colors duration-300`}>
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Left: copy */}
          <div>
            <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-6`}>{t('formTitle')}</h2>
            <p className={`${textSecondary} text-sm leading-relaxed mb-6`}>{t('formHelp')}</p>

            {/* Contact links */}
            <div className="flex gap-3">
              <a href="https://wa.me/77016698086" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 border border-[#25D366]/30 text-[#25D366] bg-[#25D366]/5 hover:bg-[#25D366]/10 px-4 py-2.5 rounded-xl text-xs font-bold transition-all">
                <WhatsAppIcon className="w-4 h-4" /> WhatsApp
              </a>
              <a href="tel:+77016698086"
                 className={`flex items-center gap-2 border ${border} ${textSecondary} hover:text-bronze-500 hover:border-bronze-500/30 px-4 py-2.5 rounded-xl text-xs font-bold transition-all`}>
                <PhoneIcon className="w-4 h-4" /> +7 701 669 8086
              </a>
            </div>
          </div>

          {/* Right: form card */}
          <div className={`border border-bronze-500/20 rounded-2xl p-6 lg:p-8 ${bgCard} shadow-2xl`}>
            <div className="flex justify-center mb-4">
              <span className="font-display text-[8px] tracking-widest text-bronze-500 font-bold uppercase border border-bronze-500/30 px-3 py-0.5 rounded-full">BOOK APPOINTMENT</span>
            </div>

            {/* Receipt */}
            <div className="bg-bronze-500/5 border border-bronze-500/20 rounded-xl p-4 mb-5 text-sm">
              <span className="text-bronze-400 font-bold block mb-2 uppercase tracking-wider text-[9px]">{t('servicesSelectedPreview')}:</span>
              {selectedServices.length === 0 && selectedOptions.length === 0 ? (
                <div className={`text-center py-4 ${textSecondary} text-xs font-semibold`}>
                  {t('servicesNotSelected')}
                </div>
              ) : (
                <>
                  {selectedServices.map(svc => (
                    <div key={svc.id} className={`flex justify-between font-bold ${textPrimary} mb-1`}>
                      <span>{t(svc.nameKey)}</span>
                      <span className="text-bronze-500">{svc.price.toLocaleString()} ₸</span>
                    </div>
                  ))}
                  {selectedOptions.map(id => {
                    const o = optionsById[id]; if (!o) return null;
                    return (
                      <div key={id} className={`flex justify-between text-xs ${textMuted} pl-3`}>
                        <span>+ {t(o.nameKey)}</span>
                        <span>+{o.price.toLocaleString()} ₸</span>
                      </div>
                    );
                  })}
                </>
              )}
              <div className={`border-t ${border} mt-3 pt-2.5 flex justify-between font-black ${textPrimary}`}>
                <span className="text-xs uppercase tracking-wider">{t('total')}:</span>
                <span className="text-bronze-400">{totalPrice.toLocaleString()} ₸ ({fmtTime(totalTime)})</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Compact AC & Coffee Banner */}
              <div className="flex gap-2.5 items-center p-3 bg-bronze-500/5 border border-bronze-500/10 rounded-xl text-[10px] text-[var(--text-secondary)] leading-relaxed">
                <span className="text-xs">☕</span>
                <p className="flex-1">{t('formComfort')}</p>
              </div>

              {/* Input Fields */}
              <div className="space-y-2">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('namePlaceholder')} required maxLength={50} pattern="[A-Za-zА-Яа-яЁёӘәІіҢңҒғҮүҰұҚқӨөҺһ\s\-]+"
                  className="bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-bronze-500 transition-all w-full" />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t('phonePlaceholder')} required maxLength={15} pattern="[\+0-9\s\-]+"
                  className="bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-bronze-500 transition-all w-full" />
              </div>

              {/* Date & Time Picker */}
              <div className="space-y-3.5">
                {/* Date Picker Strip */}
                <div className="space-y-1.5">
                  <span className={`block font-display font-bold text-[9px] uppercase tracking-wider ${textMuted}`}>
                    {lang === 'en' ? 'Select Date:' : lang === 'ru' ? 'Выбрать дату:' : 'Күнді таңдау:'}
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
                    {next10Days.map(d => {
                      const isSelected = selectedDate === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setSelectedDate(d.id)}
                          className={`flex-shrink-0 snap-start w-[52px] py-2.5 border rounded-xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer
                            ${isSelected
                              ? 'border-bronze-500 bg-bronze-500/10 text-[var(--text-primary)] shadow-[0_0_12px_rgba(197,168,128,0.2)]'
                              : 'border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-bronze-500/30'
                            }`}
                        >
                          <span className="text-[9px] uppercase opacity-60 font-medium tracking-tighter">{d.weekday}</span>
                          <span className="text-xs font-black mt-0.5">{d.dayNum}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots Grid */}
                <div className="space-y-1.5">
                  <span className={`block font-display font-bold text-[9px] uppercase tracking-wider ${textMuted}`}>
                    {lang === 'en' ? 'Select Time:' : lang === 'ru' ? 'Выбрать время:' : 'Уақытты таңдау:'}
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'].map(time => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-1 border rounded-xl text-center text-xs font-bold transition-all duration-300 cursor-pointer
                            ${isSelected
                              ? 'border-bronze-500 bg-bronze-500/10 text-[var(--text-primary)] shadow-[0_0_12px_rgba(197,168,128,0.2)]'
                              : 'border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-bronze-500/30'
                            }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Visit Mode Switch */}
              <div className="space-y-1.5">
                <span className={`block font-display font-bold text-[9px] uppercase tracking-wider ${textMuted}`}>
                  {lang === 'en' ? 'Visit mode:' : lang === 'ru' ? 'Режим визита:' : 'Визит форматы:'}
                </span>
                <div className="grid grid-cols-2 p-1 gap-1 rounded-xl tactile-container">
                  <button
                    type="button"
                    onClick={() => setVisitMode('relax')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-[10px] font-bold transition-all duration-200 cursor-pointer
                      ${visitMode === 'relax'
                        ? 'active-tactile-pill scale-[1.02]'
                        : 'text-[var(--text-secondary)] bg-transparent hover:text-[var(--text-primary)] hover:bg-white/5'
                      }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span>{lang === 'en' ? 'Relax in silence' : lang === 'ru' ? 'Relax в тишине' : 'Тыныштықтағы Relax'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitMode('talk')}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-[10px] font-bold transition-all duration-200 cursor-pointer
                      ${visitMode === 'talk'
                        ? 'active-tactile-pill scale-[1.02]'
                        : 'text-[var(--text-secondary)] bg-transparent hover:text-[var(--text-primary)] hover:bg-white/5'
                      }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{lang === 'en' ? 'Friendly chat' : lang === 'ru' ? 'Душевная беседа' : 'Жылы сұхбат'}</span>
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} id="form-submit-btn"
                className="w-full btn-premium-tactile disabled:opacity-50 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-all duration-300 flex justify-center items-center gap-2 mt-4">
                {isSubmitting
                  ? <span className="w-4 h-4 border-2 border-charcoal-950 border-t-transparent rounded-full animate-spin"></span>
                  : t('formCta')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
