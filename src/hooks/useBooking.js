import { useState, useMemo } from 'react';
import { categories, nailShapes } from '../data';
import { generateWhatsAppText } from '../whatsapp';

export function useBooking({ lang, t, next10Days }) {
  const [activeCategory, setActiveCategory] = useState('manicure');
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nailShape, setNailShape] = useState('oval');
  const [visitMode, setVisitMode] = useState('relax');

  const catObj = categories[activeCategory];

  const optionsById = useMemo(() => catObj?.options?.reduce((acc, opt) => {
    acc[opt.id] = opt;
    return acc;
  }, {}) || {}, [catObj]);

  const selectedServices = useMemo(() => catObj.services.filter(s => selectedServiceIds.includes(s.id)), [catObj, selectedServiceIds]);

  const totalPrice = useMemo(() => {
    const sPrice = selectedServices.reduce((sum, svc) => sum + svc.price, 0);
    const oPrice = selectedOptions.reduce((sum, id) => {
      const o = optionsById[id]; return sum + (o ? o.price : 0);
    }, 0);
    return sPrice + oPrice;
  }, [selectedServices, selectedOptions, optionsById]);

  const totalTime = useMemo(() => {
    const sTime = selectedServices.reduce((sum, svc) => sum + svc.time, 0);
    const oTime = selectedOptions.reduce((sum, id) => {
      const o = optionsById[id]; return sum + (o ? o.time : 0);
    }, 0);
    return sTime + oTime;
  }, [selectedServices, selectedOptions, optionsById]);

  const fmtTime = (m) => {
    const h = Math.floor(m / 60), mn = m % 60;
    const hl = t('hour_short', 'ч');
    const ml = t('min_short', 'мин');
    return `${h > 0 ? `${h} ${hl} ` : ''}${mn > 0 ? `${mn} ${ml}` : ''}`;
  };

  const toggleService = (id) => setSelectedServiceIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleOption = (id) => setSelectedOptions(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handleCalculatorCta = () => {
    document.getElementById('appointment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || name.trim().length === 0 || name.length > 50) {
      alert(lang === 'en' ? 'Please enter a valid name (max 50 chars).' : lang === 'ru' ? 'Пожалуйста, введите корректное имя (до 50 символов).' : 'Жарамды есім енгізіңіз (ең көбі 50 таңба).');
      return;
    }
    const phoneClean = phone.replace(/[^0-9+]/g, '');
    if (!phoneClean || phoneClean.length < 10 || phoneClean.length > 15) {
      alert(lang === 'en' ? 'Please enter a valid phone number.' : lang === 'ru' ? 'Пожалуйста, введите корректный номер телефона.' : 'Жарамды телефон нөмірін енгізіңіз.');
      return;
    }
    if (selectedServices.length === 0 && selectedOptions.length === 0) {
      alert(lang === 'en' ? 'Please select at least one service.' : lang === 'ru' ? 'Пожалуйста, выберите хотя бы одну услугу.' : 'Кем дегенде бір қызметті таңдаңыз.');
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert(lang === 'en' ? 'Please select a date and time.' : lang === 'ru' ? 'Пожалуйста, выберите дату и время.' : 'Күн мен уақытты таңдаңыз.');
      return;
    }
    setIsSubmitting(true);

    const waText = generateWhatsAppText({
      includeNameAndPhone: true,
      t: (key, defaultValue) => t(key, defaultValue),
      catObj,
      selectedServices,
      selectedOptions,
      optionsById,
      nailShape,
      nailShapes,
      activeCategory,
      lang,
      visitMode,
      next10Days,
      selectedDate,
      selectedTime,
      totalPrice,
      name,
      phone
    });
    const waUrl = `https://wa.me/77016698086?text=${encodeURIComponent(waText)}`;

    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(true);
    }, 1000);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setName('');
    setPhone('');
  };

  return {
    activeCategory, setActiveCategory,
    selectedServiceIds, setSelectedServiceIds,
    selectedOptions, setSelectedOptions,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    phone, setPhone,
    name, setName,
    showModal, setShowModal,
    isSubmitting, setIsSubmitting,
    nailShape, setNailShape,
    visitMode, setVisitMode,
    catObj, optionsById, selectedServices,
    totalPrice, totalTime, fmtTime,
    toggleService, toggleOption,
    handleCalculatorCta, handleSubmit, handleModalClose
  };
}
