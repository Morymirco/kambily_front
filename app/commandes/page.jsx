'use client'
import { motion,AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaSearch, FaBox, FaTruck, FaCheckCircle } from 'react-icons/fa';

export default function TrackOrder() {
  const [isSearching, setIsSearching] = useState(false);
  const [orderFound, setOrderFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    // Simuler une recherche
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSearching(false);
    setOrderFound(true);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="max-w-[1400px] mx-auto px-4 md:px-16 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Suivre ma commande
      </motion.h1>

      <div className="max-w-xl mx-auto">
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-sm"
          variants={formVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de commande
              </label>
              <input
                type="text"
                placeholder="Ex: ORD-2024-XXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
              />
            </motion.div>
            
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-[#048B9A] text-white py-3 rounded-lg hover:bg-[#037483] transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSearching}
            >
              {isSearching ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <FaSearch className="w-4 h-4" />
                  <span>Suivre ma commande</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Résultat de la recherche */}
        <AnimatePresence>
          {orderFound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Commande #ORD-2024-1234</h2>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                    En cours
                  </span>
                </div>

                {/* Timeline de suivi */}
                <div className="relative">
                  {[
                    { icon: FaBox, label: "Commande confirmée", date: "28 Jan 2024", done: true },
                    { icon: FaTruck, label: "En cours de livraison", date: "30 Jan 2024", done: true },
                    { icon: FaCheckCircle, label: "Livraison prévue", date: "1 Fév 2024", done: false }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.2 }}
                    >
                      <div className={`p-2 rounded-full ${
                        step.done ? 'bg-[#048B9A] text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <step.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">{step.label}</p>
                        <p className="text-sm text-gray-500">{step.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 