'use client'
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaMobileAlt, FaMoneyBill, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Payment = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Guinée'
  });

  // Résumé de la commande (à connecter avec votre panier)
  const orderSummary = {
    subtotal: 65000,
    shipping: 15000,
    total: 80000,
    items: [
      {
        name: "Ensemble De Pyjama",
        quantity: 1,
        price: 65000
      }
    ]
  };

  const handleBillingChange = (e) => {
    setBillingAddress({
      ...billingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simuler le traitement du paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Rediriger vers la page de confirmation
      router.push('/confirmation');
    } catch (error) {
      console.error('Erreur de paiement:', error);
      setIsProcessing(false);
      // Gérer l'erreur (vous pouvez ajouter un toast ici)
    }
  };

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
        stiffness: 100
      }
    }
  };

  const paymentFormVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2
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
        className="text-3xl font-bold mb-8"
        variants={itemVariants}
      >
        Paiement
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Formulaire de paiement */}
        <motion.div 
          className="flex-1"
          variants={itemVariants}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6 mb-6"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold mb-6">Méthode de paiement</h2>
            
            <div className="space-y-4 mb-6">
              {[
                { value: 'card', icon: FaCreditCard, label: 'Carte bancaire' },
                { value: 'mobile', icon: FaMobileAlt, label: 'Mobile Money' },
                { value: 'cash', icon: FaMoneyBill, label: 'Paiement à la livraison' }
              ].map((method) => (
                <motion.label
                  key={method.value}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer hover:border-[#048B9A] transition-colors ${
                    paymentMethod === method.value ? 'border-[#048B9A] bg-[#048B9A]/5' : ''
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-[#048B9A]"
                  />
                  <div className="ml-4 flex items-center gap-3">
                    <method.icon className="text-[#048B9A] text-xl" />
                    <span>{method.label}</span>
                  </div>
                </motion.label>
              ))}
            </div>

            {/* Formulaires de paiement avec animation */}
            <AnimatePresence mode="wait">
              {paymentMethod === 'card' && (
                <motion.div
                  key="card"
                  variants={paymentFormVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numéro de carte
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#048B9A] focus:border-[#048B9A]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date d'expiration
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#048B9A] focus:border-[#048B9A]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#048B9A] focus:border-[#048B9A]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'mobile' && (
                <motion.div
                  key="mobile"
                  variants={paymentFormVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      placeholder="+224 6XX XX XX XX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#048B9A] focus:border-[#048B9A]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Adresse de facturation */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold mb-6">Adresse de facturation</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={billingAddress.fullName}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#048B9A] focus:border-[#048B9A]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={billingAddress.email}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#048B9A] focus:border-[#048B9A]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={billingAddress.phone}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#048B9A] focus:border-[#048B9A]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={billingAddress.city}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#048B9A] focus:border-[#048B9A]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse complète
                </label>
                <textarea
                  name="address"
                  value={billingAddress.address}
                  onChange={handleBillingChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#048B9A] focus:border-[#048B9A]"
                  required
                ></textarea>
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* Résumé de la commande */}
        <motion.div 
          className="w-full lg:w-96"
          variants={itemVariants}
        >
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-6">Résumé de la commande</h2>
            
            <motion.div 
              className="space-y-4 mb-6"
              variants={containerVariants}
            >
              {orderSummary.items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex justify-between text-sm"
                >
                  <span>{item.name} (x{item.quantity})</span>
                  <span>{item.price.toLocaleString()} GNF</span>
                </motion.div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Sous-total</span>
                  <span>{orderSummary.subtotal.toLocaleString()} GNF</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Frais de livraison</span>
                  <span>{orderSummary.shipping.toLocaleString()} GNF</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>{orderSummary.total.toLocaleString()} GNF</span>
                </div>
              </div>
            </motion.div>

            <motion.button
              onClick={handleSubmit}
              className="w-full bg-[#048B9A] text-white py-3 rounded-md hover:bg-[#037483] transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <FaLock />
                  <span>Payer {orderSummary.total.toLocaleString()} GNF</span>
                </>
              )}
            </motion.button>

            <motion.p 
              className="text-sm text-gray-500 text-center mt-4"
              variants={itemVariants}
            >
              Vos informations de paiement sont sécurisées
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Payment; 