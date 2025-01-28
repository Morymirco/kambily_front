'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  FaCheckCircle,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaPinterestP,
  FaTwitter
} from 'react-icons/fa';




const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        bounce: 0.4
      }
    }
  };

  const socialVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showSuccessToast = () => {
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <FaCheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Message envoyé !
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#048B9A] hover:text-[#037483] focus:outline-none"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    ), {
      duration: 4000,
      position: 'top-right',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch('https://api.kambily.store/accounts/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });
      showSuccessToast(); 
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message');
      }

      // Réinitialiser le formulaire
      setFormData({
        email: '',
        subject: '',
        message: ''
      });
      
      // Nouveau toast personnalisé
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.', {
        style: {
          border: '1px solid #FF0000',
          padding: '16px',
          color: '#FF0000',
        },
        iconTheme: {
          primary: '#FF0000',
          secondary: '#FFFFFF',
        },
      });
    } finally {
      setIsSubmitting(false);
     
    }
  };

  return (
    <motion.div 
      className="max-w-[1400px] mx-auto px-4 md:px-16 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Colonne de gauche */}
        <motion.div variants={containerVariants}>
          <motion.h1 
            className="text-3xl font-bold mb-6"
            variants={itemVariants}
          >
            Comment pouvons-nous vous aider ?
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 mb-8"
            variants={itemVariants}
          >
            Bienvenue chez Kambily, votre partenaire dédié à votre satisfaction. Notre équipe est là pour répondre à toutes vos questions et vous offrir un service exceptionnel. Contactez-nous pour toute assistance, nous sommes là pour vous aider.
          </motion.p>

          <motion.div 
            className="space-y-6 mb-8"
            variants={containerVariants}
          >
            {/* Horaires */}
            <motion.div variants={itemVariants}>
              <h2 className="text-gray-500 mb-1">Horaires:</h2>
              <p>Monday - Friday : 9h - 17h</p>
              <p>Weekend : 10h-15h</p>
            </motion.div>

            {/* Bureau */}
            <motion.div variants={itemVariants}>
              <h2 className="text-gray-500 mb-1">Bureau ouvert</h2>
              <p>Yattaya, C/Ratoma</p>
            </motion.div>

            {/* Téléphone */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-gray-500 mb-1">Numero de telephone</h2>
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 15 }}
                >
                  <FaPhone className="w-4 h-4 text-gray-600" />
                </motion.div>
                <p>+224000000</p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-gray-500 mb-1">Adresse E-mail</h2>
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 15 }}
                >
                  <FaEnvelope className="w-4 h-4 text-gray-600" />
                </motion.div>
                <p>contact@kambily.com</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Réseaux sociaux */}
          <motion.div variants={containerVariants}>
            <motion.h2 
              className="text-gray-500 mb-4"
              variants={itemVariants}
            >
              Suivez-nous sur les réseaux sociaux
            </motion.h2>
            <motion.div 
              className="flex gap-4"
              variants={containerVariants}
            >
              {[
                { Icon: FaFacebookF, color: 'bg-[#3b5998]' },
                { Icon: FaInstagram, color: 'bg-gray-900' },
                { Icon: FaTwitter, color: 'bg-[#1DA1F2]' },
                { Icon: FaPinterestP, color: 'bg-[#E60023]' },
                { Icon: FaLinkedinIn, color: 'bg-[#0077B5]' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`w-10 h-10 ${social.color} text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity`}
                  variants={socialVariants}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Colonne de droite - Formulaire */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-bold mb-6"
            variants={itemVariants}
          >
            Contactez-nous
          </motion.h2>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={containerVariants}
          >
            <motion.div 
              className="grid grid-cols-1 gap-6"
              variants={itemVariants}
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Votre adresse mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Votre message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="8"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  required
                ></textarea>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full bg-[#048B9A] text-white px-8 py-3 rounded-lg 
                transition-all duration-300 relative
                ${isSubmitting ? 'bg-[#037483] cursor-not-allowed' : 'hover:bg-[#037483]'}
              `}
              variants={itemVariants}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
              <span className={`flex items-center justify-center gap-2 ${isSubmitting ? 'invisible' : ''}`}>
                Envoyer le message
              </span>
              
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact; 