const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.kambily.store', 
  ENDPOINTS: {
    LOGIN: '/accounts/login',
    REGISTER: '/accounts/register',
    REFRESH_TOKEN: '/accounts/token/refresh/',
    ME: '/accounts/me'
  }
}

export default API_CONFIG 