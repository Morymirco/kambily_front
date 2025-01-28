'use client'
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../Components/LoadingSpinner';
import NavigationSpinner from '../Components/NavigationSpinner';

const LoadingContext = createContext({
  isLoading: true,
  setIsLoading: () => {},
  isNavigating: false,
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  // Gestion du chargement initial
  useEffect(() => {
    if (document.readyState === 'complete') {
      setTimeout(() => setIsLoading(false), 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => setIsLoading(false), 1000);
      });
    }

    return () => {
      window.removeEventListener('load', () => setIsLoading(false));
    };
  }, []);

  // Gestion de la navigation
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, isNavigating }}>
      {/* Spinner de navigation (desktop uniquement) */}
      {isNavigating && <NavigationSpinner />}
      
      {/* Spinner de chargement principal */}
      {isLoading && <LoadingSpinner />}
      
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}; 