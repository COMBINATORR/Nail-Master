import { describe, it, expect } from 'vitest';
import { generateWhatsAppText } from './whatsapp';

describe('generateWhatsAppText', () => {
  const mockTranslations = {
    catManicureName: 'Manicure',
    serviceManicureClassicName: 'Hygienic Manicure',
    optManiDesign: 'Design',
    shape_oval: 'Oval',
    waNotRequired: 'Not required',
    relaxMode: 'Relax in silence',
    talkMode: 'Friendly chat',
    waGreeting: 'Hello!',
    waRequestText: 'I would like to book an appointment at SVTL Nails & Aesthetic.',
    waServicesLabel: 'Services',
    waShapeLabel: 'Nail shape',
    waPriceLabel: 'Fixed price',
    waDateLabel: 'Appointment',
    waTimeWord: 'at',
    waModeWord: 'Mode',
    waNameLabel: 'Name',
    waPhoneLabel: 'Phone'
  };

  const mockT = (key) => mockTranslations[key] || '';

  const mockNailShapes = [
    { id: 'oval', nameRu: 'Овал', nameKk: 'Овал', nameEn: 'Oval' },
    { id: 'soft_square', nameRu: 'Мягкий квадрат', nameKk: 'Жұмсақ квадрат', nameEn: 'Soft square' },
  ];

  const defaultProps = {
    includeNameAndPhone: false,
    t: mockT,
    catObj: { nameKey: 'catManicureName', id: 'manicure' },
    selectedServices: [{
      nameKey: 'serviceManicureClassicName',
      categoryId: 'manicure',
      categoryNameKey: 'catManicureName',
    }],
    selectedOptions: new Set(['manicure:design']),
    optionsById: {
      'manicure:design': {
        nameKey: 'optManiDesign',
        categoryId: 'manicure',
        categoryNameKey: 'catManicureName',
      },
    },
    nailShape: 'oval',
    nailShapes: mockNailShapes,
    needsNailShape: true,
    activeCategory: 'manicure',
    lang: 'en',
    visitMode: 'relax',
    next10Days: [{ id: '2023-10-27', formatted: 'Oct 27, Fri' }],
    selectedDate: '2023-10-27',
    selectedTime: '14:00',
    totalPrice: 6000,
    name: 'Jane Doe',
    phone: '+7 777 123 4567',
  };

  it('generates basic text correctly in English', () => {
    const text = generateWhatsAppText(defaultProps);

    expect(text).toContain('Hello! I would like to book an appointment at SVTL Nails & Aesthetic.');
    expect(text).toContain('Services: Hygienic Manicure + Design (Manicure)');
    expect(text).toContain('Nail shape: Oval');
    expect(text).toContain('Appointment: Oct 27, Fri at 14:00. Mode: Relax in silence');
    expect(text.replace(/\u00A0/g, ' ')).toMatch(/Fixed price: 6[, ]000 ₸\./);

    // Should not include name and phone by default
    expect(text).not.toContain('Jane Doe');
    expect(text).not.toContain('+7 777 123 4567');
  });

  it('includes name and phone when requested', () => {
    const props = { ...defaultProps, includeNameAndPhone: true };
    const text = generateWhatsAppText(props);

    expect(text).toContain('Name: Jane Doe');
    expect(text).toContain('Phone: +7 777 123 4567');
  });

  it('generates correct text in Russian with friendly mode', () => {
    const props = {
      ...defaultProps,
      lang: 'ru',
      visitMode: 'friendly',
      t: (key) => ({
        catManicureName: 'Маникюр',
        serviceManicureClassicName: 'Гигиенический маникюр',
        optManiDesign: 'Дизайн',
        shape_oval: 'Овал',
        talkMode: 'Душевная беседа',
        waGreeting: 'Салем!',
        waRequestText: 'Хочу записаться в SVTL Nails & Aesthetic.',
        waServicesLabel: 'Услуги',
        waShapeLabel: 'Форма ногтей',
        waDateLabel: 'Запись на',
        waTimeWord: 'в',
        waModeWord: 'Режим',
      }[key] || ''),
    };
    const text = generateWhatsAppText(props);

    expect(text).toContain('Салем! Хочу записаться в SVTL Nails & Aesthetic.');
    expect(text).toContain('Услуги: Гигиенический маникюр + Дизайн (Маникюр)');
    expect(text).toContain('Форма ногтей: Овал');
    expect(text).toContain('Запись на: Oct 27, Fri в 14:00. Режим: Душевная беседа');
  });

  it('handles sugaring-only cart by setting nail shape to not required', () => {
    const props = {
      ...defaultProps,
      needsNailShape: false,
      activeCategory: 'sugaring',
      selectedServices: [{
        nameKey: 'serviceSugarBikiniName',
        categoryId: 'sugaring',
        categoryNameKey: 'catSugaringName',
      }],
      selectedOptions: new Set(),
      optionsById: {},
    };
    mockTranslations.serviceSugarBikiniName = 'Bikini';
    mockTranslations.catSugaringName = 'Sugaring';
    const text = generateWhatsAppText(props);

    expect(text).toContain('Nail shape: Not required');
  });

  it('combines multiple categories in one WhatsApp message', () => {
    const props = {
      ...defaultProps,
      selectedServices: [
        {
          nameKey: 'serviceManicureClassicName',
          categoryId: 'manicure',
          categoryNameKey: 'catManicureName',
        },
        {
          nameKey: 'servicePediExpressName',
          categoryId: 'pedicure',
          categoryNameKey: 'catPedicureName',
        },
      ],
      selectedOptions: new Set(),
      optionsById: {},
      totalPrice: 12000,
    };
    mockTranslations.servicePediExpressName = 'Express Pedicure';
    mockTranslations.catPedicureName = 'Pedicure';
    const text = generateWhatsAppText(props);

    expect(text).toContain('Hygienic Manicure (Manicure)');
    expect(text).toContain('Express Pedicure (Pedicure)');
    expect(text).toContain('Nail shape: Oval');
  });

  it('handles missing date gracefully', () => {
    const props = {
      ...defaultProps,
      selectedDate: '2025-01-01', // Date not in next10Days
    };
    const text = generateWhatsAppText(props);

    expect(text).toContain('Appointment:  at 14:00.');
  });
});
