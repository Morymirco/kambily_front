'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="px-4 py-6">
      <div className="relative w-full h-[580px] rounded-2xl overflow-hidden">
        {/* Image d'arrière-plan */}
        <Image
          src="/pyjama.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Superposition avec dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#015760] via-[#000000]/90 to-[#015760]/80" />

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
            <div className="mb-4 ms-[-15px]">
              <Image
                src="/logotransparent.png"
                alt="Logo"
                width={60}
                height={60}
                className="mb-4"
              />
            </div>

            <motion.h1 
              className="text-2xl sm:text-4xl font-bold mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Le plus Grand <br />Marché en Ligne <br /><span className="relative">
               <div className='bg-[#ffffff] rounded-full px-4 py-1.5 flex items-center gap-2 mt-4 w-fit relative'>
                 <span className='text-[#048B9A] font-light'>en</span>
                 <span className='text-[#048B9A] font-bold'>Guinée</span>
                 <div className='w-5 h-5 rounded-full overflow-hidden'>
                   <Image
                     src="/flags/gn.png"
                     alt="Drapeau du Niger"
                     width={20}
                     height={20}
                     className="object-cover absolute"
                   />
                 </div>
               </div>
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
                className="bg-white text-[#048B9A] px-6 py-2.5 text-sm rounded-3xl font-medium hover:bg-opacity-90 shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir nos produits
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform translate-y-[1px]"
                >
                  <path 
                    d="M5 12H19M19 12L12 5M19 12L12 19" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
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