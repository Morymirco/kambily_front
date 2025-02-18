'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaTools, FaCog, FaExclamationTriangle } from 'react-icons/fa';

const MaintenancePage= () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-3xl w-full text-center">
        {/* Logo */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <Image
            src="/logo.webp"
            alt="Kambily Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
        </motion.div>

        {/* Icônes animées */}
        <motion.div 
          className="flex justify-center gap-4 mb-8"
          variants={itemVariants}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="text-[#048B9A]"
          >
            <FaCog className="w-12 h-12" />
          </motion.div>
          <motion.div
            animate={{
              rotate: [0, -360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="text-[#048B9A]"
          >
            <FaTools className="w-12 h-12" />
          </motion.div>
        </motion.div>

        {/* Texte principal */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
          variants={itemVariants}
        >
          Site en maintenance
        </motion.h1>

        <motion.p 
          className="text-xl text-gray-600 mb-8"
          variants={itemVariants}
        >
          Nous travaillons à améliorer votre expérience
        </motion.p>

        {/* Barre de progression */}
        <motion.div 
          className="w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="h-full bg-[#048B9A]"
            initial={{ width: "0%" }}
            animate={{ width: "70%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Message d'information */}
        <motion.div 
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 mx-auto max-w-xl"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 mb-3">
            <FaExclamationTriangle className="text-yellow-500 w-6 h-6" />
            <h2 className="text-lg font-semibold text-yellow-700">
              Maintenance planifiée
            </h2>
          </div>
          <p className="text-yellow-600">
            Notre site est temporairement indisponible pour maintenance. 
            Nous serons de retour très bientôt avec de nouvelles fonctionnalités !
          </p>
        </motion.div>

        {/* Détails de contact */}
        <motion.div 
          className="text-gray-500"
          variants={itemVariants}
        >
          <p className="mb-2">Pour toute urgence, contactez-nous :</p>
          <p className="font-medium">
            Email: <a href="mailto:contact@kambily.com" className="text-[#048B9A] hover:underline">
              contact@kambily.com
            </a>
          </p>
          <p className="font-medium">
            Tél: <a href="tel:+224000000" className="text-[#048B9A] hover:underline">
              +224 000 000
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MaintenancePage; 