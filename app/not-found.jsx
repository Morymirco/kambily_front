'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image 404 */}
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative w-64 h-64 mx-auto"
        >
          <Image
            src="/404.svg"
            alt="Page non trouvée"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Texte */}
        <div className="space-y-4">
          <motion.h1 
            className="text-4xl font-bold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Page non trouvée
          </motion.h1>
          
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </motion.p>
        </div>

        {/* Boutons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/">
            <motion.button
              className="w-full sm:w-auto px-6 py-2.5 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Retour à l'accueil
            </motion.button>
          </Link>
          
          <Link href="/boutique">
            <motion.button
              className="w-full sm:w-auto px-6 py-2.5 border-2 border-[#048B9A] text-[#048B9A] rounded-lg hover:bg-[#048B9A] hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Voir nos produits
            </motion.button>
          </Link>
        </motion.div>

        {/* Liens utiles */}
        <motion.div 
          className="text-sm text-gray-500 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p>Vous pouvez également :</p>
          <ul className="space-y-1">
            <li>
              <Link href="/contact" className="text-[#048B9A] hover:underline">
                Contacter notre support
              </Link>
            </li>
            <li>
              <Link href="/aide" className="text-[#048B9A] hover:underline">
                Consulter notre FAQ
              </Link>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
} 