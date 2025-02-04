'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

const LoginPrompt = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto py-12 px-4"
    >
      <div className="text-center max-w-lg mx-auto">
        <FaUserCircle className="w-24 h-24 md:w-32 md:h-32 text-gray-300 mb-8 mx-auto" />
        
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          Connectez-vous pour accéder à votre panier
        </h2>
        <p className="text-gray-500 mb-8 mx-auto max-w-md">
          Créez un compte ou connectez-vous pour profiter de toutes nos fonctionnalités
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/login"
            className="inline-block bg-[#048B9A] text-white px-8 py-3 rounded-lg hover:bg-[#037483] transition-colors"
          >
            Se connecter
          </Link>
          <Link 
            href="/register"
            className="inline-block border-2 border-[#048B9A] text-[#048B9A] px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPrompt; 