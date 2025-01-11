'use client'
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopHome from './Components/Home/DesktopHome';
import MobileHome from './Components/Home/MobileHome';

export default function Home() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Debounce pour éviter trop d'appels pendant le redimensionnement
    let timeoutId;
    const debouncedCheckScreenSize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScreenSize, 100);
    };

    checkScreenSize();
    window.addEventListener('resize', debouncedCheckScreenSize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedCheckScreenSize);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isMobile ? 'mobile' : 'desktop'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isMobile ? <MobileHome /> : <DesktopHome />}
      </motion.div>
    </AnimatePresence>
  );
} 