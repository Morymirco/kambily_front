'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { use, useState } from 'react';
import { FaDownload, FaPrint, FaStar, FaTruck } from 'react-icons/fa';

export default function OrderDetail({ params }) {
  const orderId = use(params).id;
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [signature, setSignature] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Récupérer la clé API depuis les variables d'environnement
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Exemple de données de commande avec code de confirmation
  const orderDetails = {
    id: orderId,
    status: 'En cours de livraison',
    date: '12 Mars 2024',
    total: '150,000 GNF',
    confirmationCode: '123456', // Code envoyé au client lors de la commande
    items: [/* ... items ... */],
    delivery: {
      deliveryMan: {
        name: "John Doe",
        phone: "+224 624 XX XX XX",
        photo: "/delivery/driver.jpg",
        rating: 4.8
      },
      location: { lat: 9.6412, lng: -13.5784 }
    },
    payment: {
      method: "Orange Money",
      transactionId: "OM123456789",
      receiptUrl: "/receipts/receipt-10234.pdf"
    }
  };

  const handleConfirmDelivery = async (e) => {
    e.preventDefault();
    setCodeError('');
    setIsSubmitting(true);

    try {
      // Vérification du code
      if (confirmationCode !== orderDetails.confirmationCode) {
        setCodeError('Code de confirmation incorrect');
        setIsSubmitting(false);
        return;
      }

      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Si succès, fermer le modal et afficher le modal de notation
      setShowConfirmModal(false);
      setShowRatingModal(true);
      setConfirmationCode('');
    } catch (error) {
      setCodeError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitRating = () => {
    // Logique d'envoi de la note
    console.log('Note envoyée:', rating, comment);
    setShowRatingModal(false);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
      {/* En-tête */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <Link href="/profile" className="text-[#048B9A] hover:underline mb-2 inline-block">
            ← Retour aux commandes
          </Link>
          <h1 className="text-2xl font-bold">Commande #{orderDetails.id}</h1>
          <p className="text-gray-500">Passée le {orderDetails.date}</p>
        </div>
        <div className="flex gap-3">
          <a
            href={orderDetails.payment.receiptUrl}
            download
            className="flex items-center gap-2 px-4 py-2 border border-[#048B9A] text-[#048B9A] rounded-lg hover:bg-[#048B9A] hover:text-white transition-colors"
          >
            <FaDownload className="w-4 h-4" />
            Reçu
          </a>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 border border-[#048B9A] text-[#048B9A] rounded-lg hover:bg-[#048B9A] hover:text-white transition-colors"
          >
            <FaPrint className="w-4 h-4" />
            Imprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Produits */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Produits commandés</h2>
            {/* Liste des produits */}
          </div>

          {/* Carte de suivi */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Suivi de livraison</h2>
            <div className="h-[400px] rounded-lg overflow-hidden mb-4">
              <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={orderDetails.delivery.location}
                  zoom={13}
                >
                  <Marker position={orderDetails.delivery.location} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {/* État de la commande */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">État de la commande</h2>
            <div className="space-y-4">
              {/* Timeline de statut */}
            </div>
          </div>

          {/* Informations du livreur */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Livreur</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={orderDetails.delivery.deliveryMan.photo}
                  alt="Livreur"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{orderDetails.delivery.deliveryMan.name}</p>
                <p className="text-gray-500">{orderDetails.delivery.deliveryMan.phone}</p>
                <div className="flex items-center text-yellow-400 mt-1">
                  <FaStar />
                  <span className="ml-1 text-gray-700">
                    {orderDetails.delivery.deliveryMan.rating}
                  </span>
                </div>
              </div>
            </div>
            {orderDetails.status === 'En cours de livraison' && (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="w-full mt-4 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483] transition-colors"
              >
                Confirmer la réception
              </button>
            )}
          </div>

          {/* Résumé du paiement */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Paiement</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Méthode</span>
                <span>{orderDetails.payment.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Transaction</span>
                <span>{orderDetails.payment.transactionId}</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>Total</span>
                <span>{orderDetails.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de livraison */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#048B9A]/10 flex items-center justify-center">
                  <FaTruck className="w-8 h-8 text-[#048B9A]" />
                </div>
                <h3 className="text-lg font-semibold">Confirmer la réception</h3>
                <p className="text-gray-600 mt-2">
                  Veuillez saisir le code de confirmation qui vous a été envoyé lors de votre commande.
                </p>
              </div>

              <form onSubmit={handleConfirmDelivery} className="space-y-4">
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      value={confirmationCode}
                      onChange={(e) => {
                        setConfirmationCode(e.target.value.replace(/\D/g, ''));
                        setCodeError('');
                      }}
                      placeholder="Entrez le code à 6 chiffres"
                      className={`w-full px-4 py-3 text-center text-2xl tracking-widest border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A] ${
                        codeError ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {codeError && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm text-red-500"
                    >
                      {codeError}
                    </motion.p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={confirmationCode.length !== 6 || isSubmitting}
                    className="flex-1 bg-[#048B9A] text-white px-4 py-3 rounded-lg hover:bg-[#037483] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : (
                      'Confirmer'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowConfirmModal(false);
                      setConfirmationCode('');
                      setCodeError('');
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <button 
                  onClick={() => {/* Logique pour renvoyer le code */}}
                  className="text-sm text-[#048B9A] hover:underline"
                >
                  Je n'ai pas reçu mon code
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de notation */}
      <AnimatePresence>
        {showRatingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold mb-4">Noter le livreur</h3>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Laissez un commentaire (optionnel)"
                className="w-full p-3 border rounded-lg mb-4 focus:ring-[#048B9A] focus:border-[#048B9A]"
                rows={4}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSubmitRating}
                  className="flex-1 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483] transition-colors"
                >
                  Envoyer
                </button>
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 