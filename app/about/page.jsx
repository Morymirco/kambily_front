'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaUsers, FaStar, FaHandshake } from 'react-icons/fa';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Images du slider
  const slides = [
    {
      id: 0,
      image: "/about4.jpg",
      alt: "Livraison Kambily"
    },
    {
      id: 1,
      image: "/about2.jpg",
      alt: "Service client Kambily"
    },
    {
      id: 2,
      image: "/about3.jpg",
      alt: "Équipe Kambily"
    }
  ];

  // Fonction pour passer à la slide suivante
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Fonction pour passer à la slide précédente
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play du slider
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change de slide toutes les 5 secondes

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: <FaUsers className="text-3xl text-[#048B9A]" />,
      number: "1000+",
      label: "Clients Satisfaits"
    },
    {
      icon: <FaStar className="text-3xl text-[#048B9A]" />,
      number: "5+",
      label: "Années d'Expérience"
    },
    {
      icon: <FaHandshake className="text-3xl text-[#048B9A]" />,
      number: "100%",
      label: "Satisfaction Client"
    }
  ];

  const teamMembers = [
    {
      name: "Albert Siba Beavogui",
      role: "Directeur Général",
      image: "/team/mory.jpg",
    },
    {
      name: "El Oumar Doumbouya",
      role: "Directeur financier",
      image: "/team/mory.jpg",
    },
    {
      name: "Mory Mirco koulibaly",
      role: "Directeur informatique",
      image: "/team/mory.jpg",
    }
  ];

  const values = [
    {
      title: "Qualité",
      description: "Nous nous engageons à fournir des produits de la plus haute qualité à nos clients."
    },
    {
      title: "Innovation",
      description: "Nous restons à la pointe des dernières tendances et technologies."
    },
    {
      title: "Service Client",
      description: "Notre équipe est dévouée à offrir une expérience client exceptionnelle."
    },
    {
      title: "Intégrité",
      description: "Nous menons nos activités avec honnêteté et transparence."
    }
  ];

  // Variants pour les animations
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div>
      {/* Hero Header avec animation */}
      <motion.div 
        className="relative h-[400px] w-full mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/about.webp"
          alt="À propos"
          fill
          className="object-cover brightness-50"
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white">À propos</h1>
        </motion.div>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
        {/* Section Qui sommes nous? avec Slider */}
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            {/* Container du slider avec transition */}
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
                    currentSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Points de navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? "bg-[#048B9A]" : "bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Boutons de navigation améliorés */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg z-10 group"
              aria-label="Image précédente"
            >
              <svg 
                className="w-6 h-6 text-gray-800 group-hover:text-[#048B9A] transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg z-10 group"
              aria-label="Image suivante"
            >
              <svg 
                className="w-6 h-6 text-gray-800 group-hover:text-[#048B9A] transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-6">Qui sommes nous?</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Chez Kambily, notre passion réside dans la création d'une expérience de shopping en ligne exceptionnelle, où le style, la qualité et le service se rencontrent pour vous offrir une satisfaction totale. Nous sommes bien plus qu'une simple plateforme e-commerce, nous sommes une équipe passionnée, dédiée à offrir la meilleure expérience d'achat possible à nos clients. Rejoignez la communauté Kambily et découvrez une nouvelle façon de faire du shopping en ligne. Nous sommes impatients de vous servir !
            </p>
          </motion.div>
        </motion.div>

        {/* Section Notre mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Chez Kambily, notre mission est de redéfinir votre expérience d'achat en ligne. Nous croyons que le shopping en ligne devrait être facile, efficace et agréable. C'est pourquoi nous nous engageons à vous offrir une plateforme e-commerce qui non seulement répond à vos besoins, mais les dépasse. Nous nous engageons à offrir des prix compétitifs et une garantie d'ajustement, assurant que vous obtenez toujours la meilleure valeur pour votre argent. Mais notre mission ne s'arrête pas là. Nous nous soucions profondément de nos clients et nous nous engageons à offrir un service client exceptionnel.
            </p>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/about2.jpg"
              alt="Notre équipe"
              fill
              className="object-cover"
            />
          </div>
        </div>

       

        {/* Statistiques avec animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="flex justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {stat.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Nos Valeurs avec animation */}
        <motion.div 
          className="mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-8"
            variants={fadeInUp}
          >
            Nos Valeurs
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaCheckCircle className="text-[#048B9A] text-2xl mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notre Équipe avec animation */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-8"
            variants={fadeInUp}
          >
            Notre Équipe
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-[300px] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 