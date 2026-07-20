import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WhatsAppIcon, PhoneIcon } from './Icons';
import { ALL_TIMES, getBusySlots } from '../data/slots';

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
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  const hasServices = selectedServices.length > 0 || selectedOptions.length > 0;
  const busySlots = useMemo(() => getBusySlots(selectedDate), [selectedDate]);

  // If selected time becomes busy when date changes — clear it
  useEffect(() => {
    if (selectedTime && busySlots.has(selectedTime)) {
      setSelectedTime('');
    }
  }, [selectedDate, selectedTime, busySlots, setSelectedTime]);

  const servicesLine = useMemo(() => {
    if (selectedServices.length === 0 && selectedOptions.length === 0) {
      return '—';
    }
    const parts = [];
    for (let i = 0; i < selectedServices.length; i++) {
      parts.push(t(selectedServices[i].nameKey));
    }
    for (let i = 0; i < selectedOptions.length; i++) {
      const o = optionsById[selectedOptions[i]];
      if (o) {
        parts.push(t(o.nameKey));
      }
    }
    return parts.length > 0 ? parts.join(' · ') : '—';
  }, [selectedServices, selectedOptions, optionsById, t]);

  const dateLine = useMemo(() => {
    if (!selectedDate) return '—';
    const d = next10Days.find((x) => x.id === selectedDate);
    return d ? `${d.formatted} (${d.weekday})` : selectedDate;
  }, [selectedDate, next10Days]);

  const previewLine = [servicesLine, dateLine, selectedTime || '—'].join(' · ');

  const goServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const canNextFrom1 = hasServices;
  const canNextFrom2 = Boolean(selectedDate && selectedTime && !busySlots.has(selectedTime));

  const onNext = () => {
    if (step === 1) {
      if (!canNextFrom1) {
        alert(t('formNeedServices'));
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!selectedDate) {
        alert(t('formNeedDate'));
        return;
      }
      if (!selectedTime || busySlots.has(selectedTime)) {
        alert(t('formNeedTime'));
        return;
      }
      setStep(3);
    }
  };

  const steps = [
    { n: 1, label: t('formStep1') },
    { n: 2, label: t('formStep2') },
    { n: 3, label: t('formStep3') },
  ];

  return (
    <section id="appointment-form" className="bg-transparent py-14 lg:py-20 transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Left: copy */}
          <div className="text-center flex flex-col items-center">
            <h2 className={`font-display text-3xl lg:text-5xl font-black ${textPrimary} leading-none tracking-tighter uppercase mb-6 text-center`}>
              {t('formTitle')}
            </h2>
            <p className={`${textSecondary} text-sm leading-relaxed mb-6 text-center max-w-md`}>{t('formHelp')}</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/77016698086"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass flex items-center gap-2 text-[#25D366] hover:scale-105 px-4 py-2.5 rounded-full text-xs font-bold transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href="tel:+77016698086"
                className={`liquid-glass flex items-center gap-2 ${textSecondary} hover:text-bronze-500 hover:scale-105 px-4 py-2.5 rounded-full text-xs font-bold transition-all`}
              >
                <PhoneIcon className="w-4 h-4" /> +7 701 669 8086
              </a>
            </div>
          </div>

          {/* Right: stepped form */}
          <div className="liquid-glass-strong rounded-2xl p-6 lg:p-8 shadow-2xl">
            <div className="flex justify-center mb-4">
              <span className="liquid-glass-pill font-display text-[8px] tracking-widest text-bronze-500 font-bold uppercase px-3 py-0.5 rounded-full">
                BOOK APPOINTMENT
              </span>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6">
              {steps.map((s, idx) => (
                <div key={s.n} className="flex items-center gap-1 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (s.n < step) setStep(s.n);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all
                      ${step === s.n
                        ? 'liquid-glass-chip liquid-glass-chip-active text-[var(--text-primary)]'
                        : step > s.n
                          ? 'liquid-glass-chip text-bronze-400 cursor-pointer'
                          : 'text-[var(--text-muted)] opacity-70'
                      }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">{s.n}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                  {idx < steps.length - 1 && (
                    <span className="w-4 sm:w-6 h-px bg-[var(--border-color)] opacity-60" />
                  )}
                </div>
              ))}
            </div>

            {/* Live preview strip */}
            <div className="liquid-glass rounded-xl p-3 mb-5 text-left">
              <span className="text-bronze-400 font-bold block mb-1 uppercase tracking-wider text-[9px]">
                {t('formPreviewTitle')}
              </span>
              <p className={`text-xs ${textPrimary} font-semibold leading-relaxed break-words`}>
                {previewLine}
              </p>
              {hasServices && (
                <p className={`text-[10px] ${textMuted} mt-1`}>
                  {totalPrice.toLocaleString()} ₸ · {fmtTime(totalTime)}
                </p>
              )}
            </div>

            <form
              onSubmit={(e) => {
                if (step !== 3) {
                  e.preventDefault();
                  onNext();
                  return;
                }
                handleSubmit(e);
              }}
              className="space-y-4"
            >
              {/* STEP 1 — services */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="liquid-glass rounded-xl p-4 text-sm">
                    <span className="text-bronze-400 font-bold block mb-2 uppercase tracking-wider text-[9px]">
                      {t('servicesSelectedPreview')}:
                    </span>
                    {!hasServices ? (
                      <div className={`text-center py-4 ${textSecondary} text-xs font-semibold space-y-3`}>
                        <p>{t('formPreviewEmptyServices')}</p>
                        <button
                          type="button"
                          onClick={goServices}
                          className="liquid-glass-chip liquid-glass-chip-active px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        >
                          {t('formPickServices')}
                        </button>
                      </div>
                    ) : (
                      <>
                        {selectedServices.map((svc) => (
                          <div key={svc.key || svc.id} className={`flex justify-between font-bold ${textPrimary} mb-1 gap-2`}>
                            <span className="leading-snug">
                              {svc.categoryNameKey ? (
                                <span className="text-bronze-400/80 font-semibold text-[10px] uppercase tracking-wider mr-1.5">
                                  {t(svc.categoryNameKey)}
                                </span>
                              ) : null}
                              {t(svc.nameKey)}
                            </span>
                            <span className="text-bronze-500 flex-shrink-0">{svc.price.toLocaleString()} ₸</span>
                          </div>
                        ))}
                        {selectedOptions.map((id) => {
                          const o = optionsById[id];
                          if (!o) return null;
                          return (
                            <div key={id} className={`flex justify-between text-xs ${textMuted} pl-3 gap-2`}>
                              <span>+ {t(o.nameKey)}</span>
                              <span className="flex-shrink-0">+{o.price.toLocaleString()} ₸</span>
                            </div>
                          );
                        })}
                        <div className={`border-t ${border} mt-3 pt-2.5 flex justify-between font-black ${textPrimary}`}>
                          <span className="text-xs uppercase tracking-wider">{t('total')}:</span>
                          <span className="text-bronze-400">
                            {totalPrice.toLocaleString()} ₸ ({fmtTime(totalTime)})
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2.5 items-center p-3 liquid-glass rounded-xl text-[10px] text-[var(--text-secondary)] leading-relaxed">
                    <span className="text-xs">☕</span>
                    <p className="flex-1">{t('formComfort')}</p>
                  </div>
                </div>
              )}

              {/* STEP 2 — date & time */}
              {step === 2 && (
                <div className="space-y-3.5">
                  <div className="space-y-1.5">
                    <span className={`block font-display font-bold text-[9px] uppercase tracking-wider ${textMuted}`}>
                      {t('selectDate')}
                    </span>
                    <div className="date-scroll-strip snap-x snap-mandatory">
                      <div className="date-scroll-strip-inner">
                        {next10Days.map((d) => {
                          const isSelected = selectedDate === d.id;
                          return (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => setSelectedDate(d.id)}
                              className={`flex-shrink-0 snap-start w-[52px] py-2.5 rounded-xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer liquid-glass-chip liquid-glass-chip-noscale
                                ${isSelected
                                  ? 'liquid-glass-chip-active text-[var(--text-primary)]'
                                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                }`}
                            >
                              <span className="text-[9px] uppercase opacity-60 font-medium tracking-tighter">{d.weekday}</span>
                              <span className="text-xs font-black mt-0.5">{d.dayNum}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className={`block font-display font-bold text-[9px] uppercase tracking-wider ${textMuted}`}>
                      {t('selectTime')}
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {ALL_TIMES.map((time) => {
                        const busy = selectedDate ? busySlots.has(time) : false;
                        const isSelected = selectedTime === time && !busy;
                        return (
                          <button
                            key={time}
                            type="button"
                            disabled={busy || !selectedDate}
                            onClick={() => !busy && setSelectedTime(time)}
                            title={busy ? t('formSlotBusy') : t('formSlotFree')}
                            className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition-all duration-300
                              ${busy
                                ? 'slot-busy liquid-glass-chip liquid-glass-chip-noscale'
                                : isSelected
                                  ? 'liquid-glass-chip liquid-glass-chip-noscale liquid-glass-chip-active text-[var(--text-primary)] cursor-pointer'
                                  : 'liquid-glass-chip liquid-glass-chip-noscale text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer disabled:opacity-40'
                              }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                    {selectedDate && (
                      <p className={`text-[9px] ${textMuted} pt-1`}>
                        <span className="text-danger">{t('formSlotBusy')}</span>: {[...busySlots].join(', ') || '—'}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3 — contacts */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('namePlaceholder')}
                      required
                      maxLength={50}
                      pattern="[A-Za-zА-Яа-яЁёӘәІіҢңҒғҮүҰұҚқӨөҺһ\s\-]+"
                      className="liquid-glass-input text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all w-full"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('phonePlaceholder')}
                      required
                      maxLength={15}
                      pattern="[\+0-9\s\-]+"
                      className="liquid-glass-input text-[var(--text-primary)] placeholder-[var(--text-muted)] rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all w-full"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className={`block font-display font-bold text-[9px] uppercase tracking-wider ${textMuted}`}>
                      {t('visitModeLabel')}
                    </span>
                    <div className="grid grid-cols-2 p-1 gap-1 rounded-xl liquid-glass">
                      <button
                        type="button"
                        onClick={() => setVisitMode('relax')}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-[10px] font-bold transition-all duration-200 cursor-pointer
                          ${visitMode === 'relax'
                            ? 'active-tactile-pill scale-[1.02]'
                            : 'text-[var(--text-secondary)] bg-transparent hover:text-[var(--text-primary)] hover:bg-white/5'
                          }`}
                      >
                        <span>{t('relaxMode')}</span>
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
                        <span>{t('talkMode')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Nav buttons */}
              <div className="flex gap-2 mt-4 items-stretch">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="liquid-glass flex-1 min-w-0 py-3.5 px-3 rounded-xl text-[11px] sm:text-xs uppercase font-bold tracking-wider transition-all hover:scale-[1.02]"
                  >
                    {t('formStepBack')}
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={onNext}
                    disabled={step === 1 ? !canNextFrom1 : !canNextFrom2}
                    className={`flex-[1.4] min-w-0 btn-premium-tactile disabled:opacity-40 py-3.5 px-3 rounded-xl text-[11px] sm:text-xs uppercase font-bold tracking-wider transition-all border-beam-active ${step === 1 && !canNextFrom1 ? 'cursor-not-allowed' : ''}`}
                  >
                    {t('formStepNext')}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="form-submit-btn"
                    className={`flex-[1.6] min-w-0 btn-premium-tactile disabled:opacity-50 py-3.5 px-2.5 sm:px-4 rounded-xl text-[10px] sm:text-xs uppercase font-bold tracking-wide sm:tracking-wider transition-all duration-300 flex justify-center items-center gap-1.5 sm:gap-2 leading-tight ${!isSubmitting ? 'border-beam-active' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-charcoal-950 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                    ) : (
                      <>
                        <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-center whitespace-normal break-words">
                          {t('formCtaWhatsApp')}
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
