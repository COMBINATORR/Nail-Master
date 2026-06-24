export const categories = {
  manicure: {
    id: 'manicure',
    nameKey: 'catManicureName',
    services: [
      { id: 'classic', nameKey: 'serviceManicureClassicName', descKey: 'serviceManicureClassicDesc', price: 4000, time: 60 },
      { id: 'gel', nameKey: 'serviceManicureGelName', descKey: 'serviceManicureGelDesc', price: 6000, time: 90 }
    ],
    options: [
      { id: 'design', nameKey: 'optManiDesign', price: 2000, time: 20 },
      { id: 'strengthen', nameKey: 'optManiStrengthen', price: 1500, time: 15 },
      { id: 'repair', nameKey: 'optManiRepair', price: 1000, time: 10 },
      { id: 'spa', nameKey: 'optManiSpa', price: 1500, time: 15 }
    ]
  },
  pedicure: {
    id: 'pedicure',
    nameKey: 'catPedicureName',
    services: [
      { id: 'express', nameKey: 'servicePediExpressName', descKey: 'servicePediExpressDesc', price: 8000, time: 60 },
      { id: 'smart', nameKey: 'servicePediSmartName', descKey: 'servicePediSmartDesc', price: 12000, time: 90 },
      { id: 'hygiene', nameKey: 'servicePediHygieneName', descKey: 'servicePediHygieneDesc', price: 9000, time: 60 }
    ],
    options: [
      { id: 'design', nameKey: 'optPediDesign', price: 2000, time: 20 },
      { id: 'cracks', nameKey: 'optPediCracks', price: 3000, time: 20 },
      { id: 'spa', nameKey: 'optPediSpa', price: 2000, time: 20 }
    ]
  },
  sugaring: {
    id: 'sugaring',
    nameKey: 'catSugaringName',
    services: [
      { id: 'bikini', nameKey: 'serviceSugarBikiniName', descKey: 'serviceSugarBikiniDesc', price: 5000, time: 30 },
      { id: 'legs', nameKey: 'serviceSugarLegsName', descKey: 'serviceSugarLegsDesc', price: 6000, time: 40 },
      { id: 'underarms', nameKey: 'serviceSugarUnderarmsName', descKey: 'serviceSugarUnderarmsDesc', price: 2000, time: 15 },
      { id: 'arms', nameKey: 'serviceSugarArmsName', descKey: 'serviceSugarArmsDesc', price: 5000, time: 25 },
      { id: 'fullbody', nameKey: 'serviceSugarFullBodyName', descKey: 'serviceSugarFullBodyDesc', price: 15000, time: 90 }
    ],
    options: [
      { id: 'bikinipit', nameKey: 'optSugarBikiniPit', price: 6000, time: 30 },
      { id: 'cleaning', nameKey: 'optSugarCleaning', price: 3000, time: 15 },
      { id: 'face', nameKey: 'optSugarFace', price: 1500, time: 10 }
    ]
  }
};
