/* eslint-disable import/prefer-default-export */
import TokenService from '../localStorage/TokenService';

export const fetchWithToken = async (url, options = {}) => fetch(url, {
  ...options,
  headers: {
    ...options.headers,
    Authorization: `Bearer ${TokenService.getToken()}`,
  },
});
