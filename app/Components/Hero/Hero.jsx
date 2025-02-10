'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="px-4 py-6">
      <div className="relative w-full h-[700px] rounded-2xl overflow-hidden">
        {/* Image d'arrière-plan */}
        <Image
          src="/pyjama.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Superposition de couleur */}
        <div className="absolute inset-0 bg-[#048B9A]" />

        {/* Pattern de fond */}
        <div className="absolute inset-0">
          <Image
            src="/pyjama.png"
            alt="Pattern"
            fill
            className="object-cover opacity-10 mix-blend-overlay"
          />
        </div>

        <motion.div 
          className="relative h-full max-w-[1400px] mx-auto px-8 py-16 flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-white">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="mb-4"
              />
            </div>

            <motion.h1 
              className="text-3xl sm:text-4xl font-bold mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Le plus Grand Marché <br />en Ligne <span className="relative">
                en Guinée
                <motion.div 
                  className="absolute -right-12 top-1/2 transform -translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Image
                    src="/logo.webp"
                    alt="Drapeau de la Guinée"
                    width={24}
                    height={16}
                  />
                </motion.div>
              </span>
            </motion.h1>

            <motion.p 
              className="text-base text-white/90 mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Kambily est une plateforme guinéenne dédiée au commerce en ligne, 
              mettant à disposition une large gamme de produits pour répondre à 
              tous vos besoins. Trouvez facilement ce que vous recherchez et 
              profitez d'une expérience d'achat simple et sécurisée.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <Link href="/boutique">
              <motion.button
                className="bg-white text-[#048B9A] px-6 py-2.5 text-sm rounded-lg font-medium hover:bg-opacity-90 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir nos produits
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <Link href="https://wa.me/+224000000000">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-20 left-4 bg-green-500 text-white p-3 rounded-full shadow-lg z-50"
        >
          <FaWhatsapp size={24} />
        </motion.button>
      </Link>
    </div>
  );
};

export default Hero; 