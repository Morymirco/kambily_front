'use client'
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaLock } from 'react-icons/fa';

export default function AuthModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#048B9A]/10 rounded-full flex items-center justify-center mb-4">
                <FaLock className="w-8 h-8 text-[#048B9A]" />
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Connexion requise
              </h2>
              
              <p className="text-gray-600 mb-6">
                Veuillez vous connecter pour continuer cette action
              </p>

              <div className="flex gap-3 w-full">
                <Link
                  href="/login"
                  className="flex-1 px-4 py-2 bg-[#048B9A] text-white rounded-md hover:bg-[#037483] transition-colors"
                >
                  Se connecter
                </Link>
                <Link
                  href="/register"
                  className="flex-1 px-4 py-2 border border-[#048B9A] text-[#048B9A] rounded-md hover:bg-[#048B9A]/5 transition-colors"
                >
                  S'inscrire
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 