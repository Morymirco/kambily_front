'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { name: 'Smartphones', count: '23 produits', image: '/categories/smartphone.webp' },
  { name: 'Santé & Beauté', count: '40 produits', image: '/categories/sante.webp' },
  { name: 'Ordinateurs', count: '3 produits', image: '/categories/ordinateurs.webp' },
  { name: 'Mode & Accessoires', count: '96 produits', image: '/categories/fashion.webp' },
  { name: 'Maison Et Jardin', count: '7 produits', image: '/categories/home.webp' },
  { name: 'Électronique', count: '90 produits', image: '/categories/electronic.webp' },
  { name: 'Bébé Maman', count: '3 produits', image: '/categories/baby.webp' },
  { name: 'Automobile', count: '1 produit', image: '/categories/car.webp' },
  { name: 'Alimentation', count: '22 produits', image: '/categories/food.webp' },
];

const Categories = () => {
  return (
    <div className="px-4 py-6 bg-white  rounded-lg ">
      <div className="flex  gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-[#048B9A] flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-4 h-4 text-white"
          >
            <path 
              fillRule="evenodd" 
              d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <h2 className="text-[#048B9A] text-2xl font-medium">Catégories</h2>
      </div>
      
      <p className="text-gray-600 text-sm mb-6">
        Ne perdez pas de temps, <span className="text-black">trouvez votre catégorie !</span>
      </p>

      <div className="grid grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <motion.div 
              className="relative w-24 h-24 mb-2"
              whileHover={{ scale: 1.05 }}
            >
              <Link href={`/boutique/category?category=${category.name.toLowerCase()}`}>
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 rounded-full border-2 border-[#a1CB41] p-[2px]">
                    <div className="absolute inset-0 rounded-full border-2 border-white"></div>
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
            <h3 className="text-sm font-medium mb-1">{category.name}</h3>
            <p className="text-xs text-gray-500">{category.count}</p>
          </motion.div>
        ))}
      </div>

      {/* <Link href="https://wa.me/+224000000000">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-20 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg z-50"
        >
          <FaWhatsapp size={24} />
        </motion.button>
      </Link> */}
    </div>
  );
};

export default Categories; 