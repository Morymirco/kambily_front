import api from './api';
import { API_ENDPOINTS } from './config';

export const authService = {
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.auth.login, credentials);
    if (response.data.access) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post(API_ENDPOINTS.auth.register, userData);
    return response.data;
  },

  logout: async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return await api.post(API_ENDPOINTS.auth.logout);
  }
}; 