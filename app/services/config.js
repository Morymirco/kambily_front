export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login/',
    register: '/auth/register/',
    logout: '/auth/logout/',
    refresh: '/auth/refresh/',
  },
  products: {
    list: '/products/',
    detail: (id) => `/products/${id}/`,
    categories: '/categories/',
  },
  orders: {
    list: '/orders/',
    create: '/orders/create/',
    detail: (id) => `/orders/${id}/`,
  },
  user: {
    profile: '/user/profile/',
    updateProfile: '/user/profile/update/',
  }
}; 