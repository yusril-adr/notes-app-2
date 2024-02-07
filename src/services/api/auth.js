// Configuration
import CONFIG from '../../global/CONFIG';

// Errors
import ClientError from '../../errors/ClientError';

// Utils
import { fetchWithToken } from './utils';

// Services
import TokenService from '../localStorage/TokenService';

const {
  DICODING_BASE_URL: BASE_URL,
} = CONFIG.SERVICES.API;

const AuthService = {
  async login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new ClientError(responseJson.message);
    }

    return { error: false, data: responseJson.data };
  },

  async register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new ClientError(responseJson.message);
    }

    return { error: false, data: responseJson.data };
  },

  async getUserLogged() {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new ClientError(responseJson.message);
    }

    return { error: false, data: responseJson.data };
  },

  logout() {
    TokenService.removeToken();
  },
};

export default AuthService;
