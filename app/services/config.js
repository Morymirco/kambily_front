const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://35.85.136.46:8001',
  ENDPOINTS: {
    LOGIN: '/accounts/login',
    REGISTER: '/accounts/register',
    REFRESH_TOKEN: '/accounts/token/refresh/',
    ME: '/accounts/me'
  }
}

export default API_CONFIG 