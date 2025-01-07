import api from './api';
import { API_ENDPOINTS } from './config';

export const userService = {
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.user.profile);
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put(API_ENDPOINTS.user.updateProfile, userData);
    return response.data;
  }
}; 