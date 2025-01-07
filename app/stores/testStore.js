import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTestStore = create(
  persist(
    (set) => ({
      // État de l'authentification
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,

      // Actions d'authentification
      setAuth: (userData, tokens) => set({
        user: userData,
        isAuthenticated: true,
        accessToken: tokens.access,
        refreshToken: tokens.refresh
      }),

      logout: () => set({
        user: null,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null
      }),

      // État du panier
      cart: [],
      cartCount: 0,

      // Actions du panier
      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            cartCount: state.cartCount + 1
          };
        }

        return {
          cart: [...state.cart, { ...product, quantity: 1 }],
          cartCount: state.cartCount + 1
        };
      }),

      removeFromCart: (productId) => set((state) => {
        const item = state.cart.find(item => item.id === productId);
        return {
          cart: state.cart.filter(item => item.id !== productId),
          cartCount: state.cartCount - (item ? item.quantity : 0)
        };
      }),

      // État des favoris
      favorites: [],

      // Actions des favoris
      toggleFavorite: (product) => set((state) => {
        const isFavorite = state.favorites.some(fav => fav.id === product.id);
        return {
          favorites: isFavorite
            ? state.favorites.filter(fav => fav.id !== product.id)
            : [...state.favorites, product]
        };
      }),

      // État de l'interface
      isMobileMenuOpen: false,
      isSearchOpen: false,

      // Actions de l'interface
      toggleMobileMenu: () => set((state) => ({
        isMobileMenuOpen: !state.isMobileMenuOpen
      })),

      toggleSearch: () => set((state) => ({
        isSearchOpen: !state.isSearchOpen
      }))
    }),
    {
      name: 'test-store',
      getStorage: () => localStorage,
    }
  )
);

export default useTestStore; 