import { useState, useMemo } from 'react';
import { categories, nailShapes } from '../data';
import { generateWhatsAppText } from '../whatsapp';

/** Composite key so manicure/pedicure options with same local id don't collide */
export const itemKey = (categoryId, id) => `${categoryId}:${id}`;

// NOTE: This object is statically built from data/categories.js for performance. Ensure they stay in sync!
const CATALOG = {
  servicesByKey: {
    'manicure:classic': { id: 'classic', nameKey: 'serviceManicureClassicName', descKey: 'serviceManicureClassicDesc', price: 4000, time: 60, key: 'manicure:classic', categoryId: 'manicure', categoryNameKey: 'catManicureName' },
    'manicure:gel': { id: 'gel', nameKey: 'serviceManicureGelName', descKey: 'serviceManicureGelDesc', price: 6000, time: 90, key: 'manicure:gel', categoryId: 'manicure', categoryNameKey: 'catManicureName' },
    'pedicure:express': { id: 'express', nameKey: 'servicePediExpressName', descKey: 'servicePediExpressDesc', price: 8000, time: 60, key: 'pedicure:express', categoryId: 'pedicure', categoryNameKey: 'catPedicureName' },
    'pedicure:smart': { id: 'smart', nameKey: 'servicePediSmartName', descKey: 'servicePediSmartDesc', price: 12000, time: 90, key: 'pedicure:smart', categoryId: 'pedicure', categoryNameKey: 'catPedicureName' },
    'pedicure:hygiene': { id: 'hygiene', nameKey: 'servicePediHygieneName', descKey: 'servicePediHygieneDesc', price: 9000, time: 60, key: 'pedicure:hygiene', categoryId: 'pedicure', categoryNameKey: 'catPedicureName' },
    'sugaring:bikini': { id: 'bikini', nameKey: 'serviceSugarBikiniName', descKey: 'serviceSugarBikiniDesc', price: 5000, time: 30, key: 'sugaring:bikini', categoryId: 'sugaring', categoryNameKey: 'catSugaringName' },
    'sugaring:legs': { id: 'legs', nameKey: 'serviceSugarLegsName', descKey: 'serviceSugarLegsDesc', price: 6000, time: 40, key: 'sugaring:legs', categoryId: 'sugaring', categoryNameKey: 'catSugaringName' },
    'sugaring:underarms': { id: 'underarms', nameKey: 'serviceSugarUnderarmsName', descKey: 'serviceSugarUnderarmsDesc', price: 2000, time: 15, key: 'sugaring:underarms', categoryId: 'sugaring', categoryNameKey: 'catSugaringName' },
    'sugaring:arms': { id: 'arms', nameKey: 'serviceSugarArmsName', descKey: 'serviceSugarArmsDesc', price: 5000, time: 25, key: 'sugaring:arms', categoryId: 'sugaring', categoryNameKey: 'catSugaringName' },
    'sugaring:fullbody': { id: 'fullbody', nameKey: 'serviceSugarFullBodyName', descKey: 'serviceSugarFullBodyDesc', price: 15000, time: 90, key: 'sugaring:fullbody', categoryId: 'sugaring', categoryNameKey: 'catSugaringName' }
  },
  optionsByKey: {
    'manicure:design': { id: 'design', nameKey: 'optManiDesign', price: 2000, time: 20, key: 'manicure:design', categoryId: 'manicure', categoryNameKey: 'catManicureName' },
    'manicure:strengthen': { id: 'strengthen', nameKey: 'optManiStrengthen', price: 1500, time: 15, key: 'manicure:strengthen', categoryId: 'manicure', categoryNameKey: 'catManicureName' },
    'manicure:repair': { id: 'repair', nameKey: 'optManiRepair', price: 1000, time: 10, key: 'manicure:repair', categoryId: 'manicure', categoryNameKey: 'catManicureName' },
    'manicure:spa': { id: 'spa', nameKey: 'optManiSpa', price: 1500, time: 15, key: 'manicure:spa', categoryId: 'manicure', categoryNameKey: 'catManicureName' },
    'pedicure:design': { id: 'design', nameKey: 'optPediDesign', price: 2000, time: 20, key: 'pedicure:design', categoryId: 'pedicure', categoryNameKey: 'catPedicureName' },
    'pedicure:cracks': { id: 'cracks', nameKey: 'optPediCracks', price: 3000, time: 20, key: 'pedicure:cracks', categoryId: 'pedicure', categoryNameKey: 'catPedicureName' },
    'pedicure:spa': { id: 'spa', nameKey: 'optPediSpa', price: 2000, time: 20, key: 'pedicure:spa', categoryId: 'pedicure', categoryNameKey: 'catPedicureName' },
    'sugaring:bikinipit': { id: 'bikinipit', nameKey: 'optSugarBikiniPit', price: 6000, time: 30, key: 'sugaring:bikinipit', categoryId: 'sugaring', categoryNameKey: 'catSugaringName' },
    'sugaring:cleaning': { id: 'cleaning', nameKey: 'optSugarCleaning', price: 3000, time: 15, key: 'sugaring:cleaning', categoryId: 'sugaring', categoryNameKey: 'catSugaringName' },
    'sugaring:face': { id: 'face', nameKey: 'optSugarFace', price: 1500, time: 10, key: 'sugaring:face', categoryId: 'sugaring', categoryNameKey: 'catSugaringName' }
  }
};

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

  // Single pass for price + time (Jules #76) — multi-category cart keys already resolved
  const { totalPrice, totalTime } = useMemo(() => {
    let sPrice = 0;
    let sTime = 0;
    let oPrice = 0;
    let oTime = 0;

    for (let i = 0; i < selectedServices.length; i++) {
      const svc = selectedServices[i];
      sPrice += svc.price || 0;
      sTime += svc.time || 0;
    }

    for (let i = 0; i < selectedOptions.length; i++) {
      const o = optionsById[selectedOptions[i]];
      if (o) {
        oPrice += o.price || 0;
        oTime += o.time || 0;
      }
    }

    return {
      totalPrice: sPrice + oPrice,
      totalTime: sTime + oTime,
    };
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
