import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Configuration
import CONFIG from '../../global/CONFIG';

import enTranslation from './langs/en.json';
import idTranslation from './langs/id.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      id: { translation: idTranslation },
    },
    lng: CONFIG.SERVICES.LOCALIZE.DEFAULT_LANG,
    fallbackLng: CONFIG.SERVICES.LOCALIZE.DEFAULT_LANG,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
