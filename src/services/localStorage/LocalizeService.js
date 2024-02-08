import CONFIG from '../../global/CONFIG';

const { LOCALIZE_KEY } = CONFIG.SERVICES.LOCAL_STORAGE;

const LocalizeService = {
  getCurrentLang() {
    return localStorage.getItem(LOCALIZE_KEY);
  },
  saveLang(lang) {
    localStorage.setItem(LOCALIZE_KEY, lang);
  },
  removeLang() {
    localStorage.removeItem(LOCALIZE_KEY);
  },
};

export default LocalizeService;
