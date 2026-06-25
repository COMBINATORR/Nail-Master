import { describe, it, expect } from 'vitest';
import { generateWhatsAppText } from './whatsapp';

describe('generateWhatsAppText', () => {
  const mockTranslations = {
    catManicureName: 'Manicure',
    serviceManicureClassicName: 'Hygienic Manicure',
    optManiDesign: 'Design',
  };

  const mockNailShapes = [
    { id: 'oval', nameRu: 'Овал', nameKk: 'Овал', nameEn: 'Oval' },
    { id: 'soft_square', nameRu: 'Мягкий квадрат', nameKk: 'Жұмсақ квадрат', nameEn: 'Soft square' },
  ];

  const defaultProps = {
    includeNameAndPhone: false,
    t: mockTranslations,
    catObj: { nameKey: 'catManicureName' },
    selectedServices: [{ nameKey: 'serviceManicureClassicName' }],
    selectedOptions: ['design'],
    optionsById: { design: { nameKey: 'optManiDesign' } },
    nailShape: 'oval',
    nailShapes: mockNailShapes,
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
      t: {
        catManicureName: 'Маникюр',
        serviceManicureClassicName: 'Гигиенический маникюр',
        optManiDesign: 'Дизайн',
      }
    };
    const text = generateWhatsAppText(props);

    expect(text).toContain('Салем! Хочу записаться в SVTL Nails & Aesthetic.');
    expect(text).toContain('Услуги: Гигиенический маникюр + Дизайн (Маникюр)');
    expect(text).toContain('Форма ногтей: Овал');
    expect(text).toContain('Запись на: Oct 27, Fri в 14:00. Режим: Душевная беседа');
  });

  it('handles sugaring category by setting nail shape to not required', () => {
    const props = {
      ...defaultProps,
      activeCategory: 'sugaring',
    };
    const text = generateWhatsAppText(props);

    expect(text).toContain('Nail shape: Not required');
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
