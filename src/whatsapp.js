export const generateWhatsAppText = (options = {}) => {
  const {
  includeNameAndPhone = false,
  t,
  selectedServices = [],
  selectedOptions = new Set(),
  optionsById = {},
  nailShape,
  nailShapes = [],
  needsNailShape,
  /** @deprecated use needsNailShape; kept for older call sites/tests */
  activeCategory,
  visitMode,
  next10Days = [],
  selectedDate,
  selectedTime,
  totalPrice,
  name,
  phone
} = options;
  const safeT = (k) => (typeof t === 'function' ? t(k) : t?.[k]);

  // Group services + options by category for a clear multi-direction message
  const groups = new Map();

  const ensureGroup = (categoryId, categoryNameKey) => {
    if (!groups.has(categoryId)) {
      groups.set(categoryId, {
        name: safeT(categoryNameKey) || categoryId,
        items: [],
      });
    }
    return groups.get(categoryId);
  };

  for (let i = 0; i < selectedServices.length; i++) {
    const svc = selectedServices[i];
    const catId = svc.categoryId || activeCategory || 'service';
    const nameKey = svc.categoryNameKey;
    const group = ensureGroup(catId, nameKey);
    const val = safeT(svc.nameKey);
    if (val) group.items.push(val);
  }

  const selectedOptionsArray = Array.from(selectedOptions);
  for (let i = 0; i < selectedOptionsArray.length; i++) {
    const o = optionsById[selectedOptionsArray[i]];
    if (!o) continue;
    const catId = o.categoryId || activeCategory || 'service';
    const nameKey = o.categoryNameKey;
    const group = ensureGroup(catId, nameKey);
    const val = safeT(o.nameKey);
    if (val) group.items.push(val);
  }

  const serviceParts = [];
  for (const { name: catName, items } of groups.values()) {
    const joined = items.join(' + ');
    serviceParts.push(catName ? `${joined} (${catName})` : joined);
  }
  const allServicesText = serviceParts.join('; ');

  const shapeNeeded =
    typeof needsNailShape === 'boolean'
      ? needsNailShape
      : activeCategory !== 'sugaring';

  const shapeObj = nailShapes.find((s) => s.id === nailShape);
  const shapeText = shapeNeeded
    ? safeT('shape_' + shapeObj?.id) || shapeObj?.nameEn || ''
    : safeT('waNotRequired');

  const modeText = visitMode === 'relax' ? safeT('relaxMode') : safeT('talkMode');

  const greeting = safeT('waGreeting');
  const requestText = safeT('waRequestText');
  const servicesLabel = safeT('waServicesLabel');
  const shapeLabel = safeT('waShapeLabel');
  const priceLabel = safeT('waPriceLabel');

  const dayObj = next10Days.find((d) => d.id === selectedDate);
  const dateStr = dayObj ? dayObj.formatted : '';
  const dateLabel = safeT('waDateLabel');
  const timeWord = safeT('waTimeWord');
  const modeWord = safeT('waModeWord');

  let msg =
    `${greeting} ${requestText}\n` +
    `${servicesLabel}: ${allServicesText}\n` +
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
