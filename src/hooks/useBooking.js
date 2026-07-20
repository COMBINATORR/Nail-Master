import { useState, useMemo } from 'react';
import { categories, nailShapes } from '../data';
import { generateWhatsAppText } from '../whatsapp';

/** Composite key so manicure/pedicure options with same local id don't collide */
export const itemKey = (categoryId, id) => `${categoryId}:${id}`;

const buildCatalog = () => {
  const servicesByKey = {};
  const optionsByKey = {};
  for (const cat of Object.values(categories)) {
    for (const svc of cat.services) {
      const key = itemKey(cat.id, svc.id);
      servicesByKey[key] = {
        ...svc,
        key,
        categoryId: cat.id,
        categoryNameKey: cat.nameKey,
      };
    }
    for (const opt of cat.options || []) {
      const key = itemKey(cat.id, opt.id);
      optionsByKey[key] = {
        ...opt,
        key,
        categoryId: cat.id,
        categoryNameKey: cat.nameKey,
      };
    }
  }
  return { servicesByKey, optionsByKey };
};

const CATALOG = buildCatalog();

const categoryOfKey = (key) => (typeof key === 'string' ? key.split(':')[0] : '');

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
  const optionsById = CATALOG.optionsByKey;

  const selectedServices = useMemo(
    () => selectedServiceIds.map((k) => CATALOG.servicesByKey[k]).filter(Boolean),
    [selectedServiceIds]
  );

  const categoryCounts = useMemo(() => {
    const counts = { manicure: 0, pedicure: 0, sugaring: 0 };
    for (const id of selectedServiceIds) {
      const c = categoryOfKey(id);
      if (c in counts) counts[c] += 1;
    }
    for (const id of selectedOptions) {
      const c = categoryOfKey(id);
      if (c in counts) counts[c] += 1;
    }
    return counts;
  }, [selectedServiceIds, selectedOptions]);

  const needsNailShape = useMemo(() => {
    const hasNailCat = (key) => {
      const c = categoryOfKey(key);
      return c === 'manicure' || c === 'pedicure';
    };
    return selectedServiceIds.some(hasNailCat) || selectedOptions.some(hasNailCat);
  }, [selectedServiceIds, selectedOptions]);

  const totalPrice = useMemo(() => {
    const sPrice = selectedServices.reduce((sum, svc) => sum + svc.price, 0);
    const oPrice = selectedOptions.reduce((sum, id) => {
      const o = optionsById[id];
      return sum + (o ? o.price : 0);
    }, 0);
    return sPrice + oPrice;
  }, [selectedServices, selectedOptions, optionsById]);

  const totalTime = useMemo(() => {
    const sTime = selectedServices.reduce((sum, svc) => sum + svc.time, 0);
    const oTime = selectedOptions.reduce((sum, id) => {
      const o = optionsById[id];
      return sum + (o ? o.time : 0);
    }, 0);
    return sTime + oTime;
  }, [selectedServices, selectedOptions, optionsById]);

  const fmtTime = (m) => {
    const h = Math.floor(m / 60);
    const mn = m % 60;
    const hl = t('hour_short', 'ч');
    const ml = t('min_short', 'мин');
    return `${h > 0 ? `${h} ${hl} ` : ''}${mn > 0 ? `${mn} ${ml}` : ''}`;
  };

  /** Tabs only switch the list — cart keeps all categories */
  const changeCategory = (id) => {
    if (id === activeCategory) return;
    setActiveCategory(id);
  };

  const toggleService = (key) =>
    setSelectedServiceIds((p) => (p.includes(key) ? p.filter((x) => x !== key) : [...p, key]));

  const toggleOption = (key) =>
    setSelectedOptions((p) => (p.includes(key) ? p.filter((x) => x !== key) : [...p, key]));

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
      selectedServices,
      selectedOptions,
      optionsById,
      nailShape,
      nailShapes,
      needsNailShape,
      visitMode,
      next10Days,
      selectedDate,
      selectedTime,
      totalPrice,
      name,
      phone,
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
    activeCategory,
    setActiveCategory: changeCategory,
    selectedServiceIds,
    setSelectedServiceIds,
    selectedOptions,
    setSelectedOptions,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    phone,
    setPhone,
    name,
    setName,
    showModal,
    setShowModal,
    isSubmitting,
    setIsSubmitting,
    nailShape,
    setNailShape,
    visitMode,
    setVisitMode,
    catObj,
    optionsById,
    selectedServices,
    categoryCounts,
    needsNailShape,
    totalPrice,
    totalTime,
    fmtTime,
    toggleService,
    toggleOption,
    handleCalculatorCta,
    handleSubmit,
    handleModalClose,
  };
}
