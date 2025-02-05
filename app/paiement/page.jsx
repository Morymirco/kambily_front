'use client'
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaCheckCircle, FaCreditCard, FaMobileAlt, FaMoneyBill, FaTag, FaMapPin } from 'react-icons/fa';
import { AddressSelector } from '@/app/Components/AddressSelector';
import { useCart } from '@/app/providers/CartProvider';

const PaymentInput = ({ label, type, value, onChange, placeholder, required = false }) => (
  <div className="relative">
    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#048B9A] focus:ring-1 focus:ring-[#048B9A] transition-colors"
    />
  </div>
);

const Payment = () => {
  const router = useRouter();
  const { cartItems } = useCart();
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
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 15000,
    total: 0,
    items: []
  });

  useEffect(() => {
    // Récupérer l'adresse stockée
    const storedAddress = localStorage.getItem('selectedDeliveryAddress');
    if (storedAddress) {
      setSelectedAddress(JSON.parse(storedAddress));
    }
  }, []);

  useEffect(() => {
    console.log(cartItems);
    // Vérifier si cartItems existe et n'est pas vide
    if (!cartItems || cartItems.length === 0) {
      return;
    }

    // Calculer le sous-total en vérifiant chaque propriété
    const subtotal = cartItems.reduce((total, item) => {
      if (!item || !item.product) return total;
      
      const price = parseFloat(item.product.regular_price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      console.log(price, quantity);
      return total + (price * quantity);
    }, 0);

    // Créer le résumé des articles avec vérification
    const items = cartItems.map(item => {
      if (!item || !item.product) return null;
      
      return {
        name: item.product.name || 'Produit inconnu',
        quantity: parseInt(item.quantity) || 0,
        price: parseFloat(item.product.regular_price) || 0
      };
    }).filter(Boolean); // Enlever les éléments null

    setOrderSummary({
      subtotal,
      shipping: 3000,
      total: subtotal + 3000,
      items
    });
  }, [cartItems]);

  const handleBillingChange = (e) => {
    setBillingAddress({
      ...billingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateOrder = async () => {
    try {
      setIsCreatingOrder(true);
      
      // Vérifier si une adresse est sélectionnée
      if (!selectedAddress) {
        toast.error("Veuillez sélectionner une adresse de livraison");
        return;
      }

      const finalTotal = promoApplied 
        ? orderSummary.total - 15000
        : orderSummary.total;

      const orderData = {
        delivery_address_id: selectedAddress.pk,
        total_paid: finalTotal,
        promo_code: promoApplied ? promoCode : undefined
      };

      const response = await axios.post(
        'https://api.kambily.store/orders/create/',
        orderData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201 || response.status === 200) {
        console.log(response.data);
        const orderNumber = response.data?.order?.number;
        toast.success('Commande créée avec succès !');
        console.log(orderNumber);
        router.push(`/confirmation?order=${orderNumber}`);
      }

    } catch (error) {
      console.error('Erreur:', error.response?.data);
      toast.error(error.response?.data?.message || "Une erreur est survenue lors de la création de la commande");
    } finally {
      setIsCreatingOrder(false);
    }
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

  // Fonction pour appliquer le code promo
  const handleApplyPromoCode = async (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Succès (à remplacer par votre logique réelle)
      setPromoApplied(true);
      toast.success('Code promo appliqué avec succès !');
    } catch (error) {
      toast.error('Code promo invalide');
    } finally {
      setIsApplyingPromo(false);
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-16 py-3 sm:py-6"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Section Adresse de livraison */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-4 md:p-6"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Adresse de livraison</h2>
              <FaMapPin className="text-[#048B9A] text-xl" />
            </div>

            <AddressSelector 
              onAddressSelect={(address) => {
                setSelectedAddress(address);
                localStorage.setItem('selectedDeliveryAddress', JSON.stringify(address));
              }}
              selectedAddress={selectedAddress}
            />
          </motion.div>

          {/* Formulaire de paiement */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 w-full"
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
                  <div className="space-y-4">
                    <PaymentInput
                      label="Numéro de carte"
                      type="text"
                      value={billingAddress.cardNumber}
                      onChange={(e) => setBillingAddress({ ...billingAddress, cardNumber: e.target.value })}
                      placeholder="0000 0000 0000 0000"
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <PaymentInput
                        label="Date d'expiration"
                        type="text"
                        value={billingAddress.expiry}
                        onChange={(e) => setBillingAddress({ ...billingAddress, expiry: e.target.value })}
                        placeholder="MM/AA"
                        required
                      />
                      
                      <PaymentInput
                        label="CVC"
                        type="text"
                        value={billingAddress.cvc}
                        onChange={(e) => setBillingAddress({ ...billingAddress, cvc: e.target.value })}
                        placeholder="123"
                        required
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
        </div>

        {/* Colonne résumé de la commande */}
        <motion.div className="w-full lg:w-96">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 sticky top-6 w-full">
            <h2 className="text-xl font-semibold mb-6">Résumé de la commande</h2>
            
            {/* Code Promo */}
            <div className="mb-6 pb-6 border-b">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <FaTag className="text-[#048B9A]" />
                Code Promo
              </h3>
              
              <form onSubmit={handleApplyPromoCode} className="space-y-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Entrez votre code promo"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                  disabled={isApplyingPromo || promoApplied}
                />
                <button
                  type="submit"
                  disabled={isApplyingPromo || promoApplied || !promoCode.trim()}
                  className="w-full px-4 py-2 text-sm bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isApplyingPromo ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Application...</span>
                    </>
                  ) : promoApplied ? (
                    <>
                      <FaCheckCircle />
                      <span>Appliqué</span>
                    </>
                  ) : (
                    'Appliquer'
                  )}
                </button>
              </form>

              {promoApplied && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-green-600 flex items-center gap-2"
                >
                  <FaCheckCircle />
                  <span>Réduction de 15,000 GNF appliquée</span>
                </motion.div>
              )}
            </div>
            
            {/* Détails de la commande */}
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
                  <span>{Number(item.price).toLocaleString()} GNF</span>
                </motion.div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Sous-total</span>
                  <span>{Number(orderSummary.subtotal).toLocaleString()} GNF</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Frais de livraison</span>
                  <span>{Number(orderSummary.shipping).toLocaleString()} GNF</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>{Number(orderSummary.total).toLocaleString()} GNF</span>
                </div>
              </div>
            </motion.div>

            <motion.button
              onClick={handleCreateOrder}
              disabled={isCreatingOrder || !selectedAddress}
              className="w-full py-3 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreatingOrder ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Traitement en cours...</span>
                </div>
              ) : (
                'Payer maintenant'
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