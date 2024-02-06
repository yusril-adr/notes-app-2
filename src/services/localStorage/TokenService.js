import CONFIG from '../../global/CONFIG';

const { TOKEN_KEY } = CONFIG.SERVICES.LOCAL_STORAGE;

const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export default TokenService;
