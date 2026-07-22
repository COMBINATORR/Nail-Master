export const generateWhatsAppText = (options = {}) => {
  const {
  includeNameAndPhone = false,
  t,
  catObj,
  selectedServices,
  selectedOptions,
  optionsById,
  nailShape,
  nailShapes,
  activeCategory,
  visitMode,
  next10Days,
  selectedDate,
  selectedTime,
  totalPrice,
  name,
  phone
} = options;
  const safeT = (k) => (typeof t === 'function' ? t(k) : t[k]);
  const categoryName = safeT(catObj?.nameKey) || '';

  // Single-pass loops (no map+filter intermediate arrays) + i18n-safe lookups
  const allServicesArr = [];
  for (let i = 0; i < selectedServices.length; i++) {
    const val = safeT(selectedServices[i].nameKey);
    if (val) allServicesArr.push(val);
  }
  for (let i = 0; i < selectedOptions.length; i++) {
    const o = optionsById[selectedOptions[i]];
    if (o) {
      const val = safeT(o.nameKey);
      if (val) allServicesArr.push(val);
    }
  }
  const allServicesText = allServicesArr.join(' + ');

  const shapeObj = nailShapes.find(s => s.id === nailShape);
  const shapeText = activeCategory !== 'sugaring'
    ? safeT('shape_' + shapeObj?.id) || shapeObj?.nameEn || ''
    : safeT('waNotRequired');

  const modeText = visitMode === 'relax'
    ? safeT('relaxMode')
    : safeT('talkMode');

  const greeting = safeT('waGreeting');
  const requestText = safeT('waRequestText');
  const servicesLabel = safeT('waServicesLabel');
  const shapeLabel = safeT('waShapeLabel');
  const priceLabel = safeT('waPriceLabel');

  const dayObj = next10Days.find(d => d.id === selectedDate);
  const dateStr = dayObj ? dayObj.formatted : '';
  const dateLabel = safeT('waDateLabel');
  const timeWord = safeT('waTimeWord');
  const modeWord = safeT('waModeWord');

  let msg = `${greeting} ${requestText}\n` +
    `${servicesLabel}: ${allServicesText} (${categoryName})\n` +
    `${shapeLabel}: ${shapeText}\n` +
    `${dateLabel}: ${dateStr} ${timeWord} ${selectedTime}. ${modeWord}: ${modeText}\n` +
    `${priceLabel}: ${totalPrice.toLocaleString()} ₸.`;

  if (includeNameAndPhone && name) {
    const nameLabel = safeT('waNameLabel');
    const phoneLabel = safeT('waPhoneLabel');
    msg += `\n${nameLabel}: ${name}\n${phoneLabel}: ${phone}`;
  }
  return msg;
};