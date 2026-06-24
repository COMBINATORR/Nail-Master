export const generateWhatsAppText = ({
  includeNameAndPhone = false,
  t,
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
}) => {
  const categoryName = t[catObj?.nameKey] || '';
  const serviceNames = selectedServices.map(s => t[s.nameKey] || '').filter(Boolean);
  const optionNames = selectedOptions
    .map(id => {
      const o = optionsById[id];
      return o ? t[o.nameKey] : null;
    })
    .filter(Boolean);
  const allServicesText = [...serviceNames, ...optionNames].join(' + ');

  const shapeObj = nailShapes.find(s => s.id === nailShape);
  const shapeText = activeCategory !== 'sugaring'
    ? (lang === 'en' ? (shapeObj?.id === 'sharp_square' ? 'Sharp Square' : shapeObj?.id === 'soft_square' ? 'Soft Square' : shapeObj?.id === 'oval' ? 'Oval' : 'Almond') : lang === 'ru' ? shapeObj?.nameRu : shapeObj?.nameKk)
    : (lang === 'en' ? 'Not required' : lang === 'ru' ? 'Не требуется' : 'Қажет емес');

  const modeText = visitMode === 'relax'
    ? (lang === 'en' ? 'Relax in silence' : lang === 'ru' ? 'Relax в тишине' : 'Тыныштықтағы Relax')
    : (lang === 'en' ? 'Friendly chat' : lang === 'ru' ? 'Душевная беседа' : 'Жылы сұхбат');

  const greeting = lang === 'en' ? 'Hello!' : 'Салем!';
  const requestText = lang === 'en' ? 'I would like to book an appointment at SVTL Nails & Aesthetic.' : 'Хочу записаться в SVTL Nails & Aesthetic.';
  const servicesLabel = lang === 'en' ? 'Services' : 'Услуги';
  const shapeLabel = lang === 'en' ? 'Nail shape' : 'Форма ногтей';
  const priceLabel = lang === 'en' ? 'Fixed price' : 'Фиксированная цена';

  const dayObj = next10Days.find(d => d.id === selectedDate);
  const dateStr = dayObj ? dayObj.formatted : '';
  const dateLabel = lang === 'en' ? 'Appointment' : lang === 'ru' ? 'Запись на' : 'Жазылу';
  const timeWord = lang === 'en' ? 'at' : lang === 'ru' ? 'в' : 'сағат';
  const modeWord = lang === 'en' ? 'Mode' : lang === 'ru' ? 'Режим' : 'Режимі';

  let msg = `${greeting} ${requestText}\n` +
    `${servicesLabel}: ${allServicesText} (${categoryName})\n` +
    `${shapeLabel}: ${shapeText}\n` +
    `${dateLabel}: ${dateStr} ${timeWord} ${selectedTime}. ${modeWord}: ${modeText}\n` +
    `${priceLabel}: ${totalPrice.toLocaleString()} ₸.`;

  if (includeNameAndPhone && name) {
    const nameLabel = lang === 'en' ? 'Name' : 'Имя';
    const phoneLabel = lang === 'en' ? 'Phone' : 'Телефон';
    msg += `\n${nameLabel}: ${name}\n${phoneLabel}: ${phone}`;
  }
  return msg;
};
