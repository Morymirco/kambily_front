import { create } from 'zustand';

const useStore = create((set) => ({
  // État des produits
  products: [],
  setProducts: (products) => set({ products }),
  
  // État des catégories
  categories: [],
  setCategories: (categories) => set({ categories }),
  
  // État de l'utilisateur
  user: null,
  setUser: (user) => set({ user }),
  
  // État du panier
  cart: [],
  addToCart: (product) => set((state) => ({
    cart: [...state.cart, product]
  })),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),
  
  // État de l'interface
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  
  error: null,
  setError: (error) => set({ error })
}));

export default useStore; 