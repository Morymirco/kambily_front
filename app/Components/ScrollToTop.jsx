'use client'
import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Afficher le bouton quand on scroll plus bas que 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-[#E9EAEA] hover:bg-[#048B9A] text-[#048B9A] hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-50 hidden md:flex"
          aria-label="Remonter en haut"
        >
          <FaArrowUp className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop; 