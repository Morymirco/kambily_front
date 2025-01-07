import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const TOKEN_REFRESH_THRESHOLD = 5 * 60; // 5 minutes en secondes

export const auth = {
  setTokens: (access, refresh) => {
    Cookies.set('access_token', access, {
      secure: true,
      sameSite: 'strict',
      expires: 1 // 1 jour
    });
    
    Cookies.set('refresh_token', refresh, {
      secure: true,
      sameSite: 'strict',
      expires: 7 // 7 jours
    });
  },

  getAccessToken: () => Cookies.get('access_token'),
  getRefreshToken: () => Cookies.get('refresh_token'),

  removeTokens: () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  },

  isTokenExpired: (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  },

  needsRefresh: (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp - currentTime < TOKEN_REFRESH_THRESHOLD;
    } catch {
      return true;
    }
  }
}; 