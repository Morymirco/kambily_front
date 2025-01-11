'use client'
import { useState } from 'react';
import { FaCamera, FaQrcode, FaTimes, FaUpload } from 'react-icons/fa';

const DeliveryConfirmationModal = ({ isOpen, onClose, delivery, onConfirm }) => {
  const [proofs, setProofs] = useState({
    signature: null,
    photos: [],
    qrCode: null
  });
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setProofs(prev => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 3) // Maximum 3 photos
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simuler l'envoi des preuves
      await new Promise(resolve => setTimeout(resolve, 1500));
      onConfirm(delivery.orderId, proofs);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la confirmation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* En-tête */}
        <div className="flex justify-between items-center p-4 border-b shrink-0">
          <h2 className="text-lg font-medium">Confirmer la livraison</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Informations de la commande */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <div className="text-sm text-gray-500">N° Commande</div>
                <div className="font-medium">{delivery.orderId}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Client</div>
                <div className="font-medium">{delivery.customer}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Adresse</div>
                <div className="font-medium">{delivery.address}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Montant</div>
                <div className="font-medium">{delivery.amount.toLocaleString()} GNF</div>
              </div>
            </div>

            {/* Scanner QR Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scanner le QR Code
              </label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {proofs.qrCode ? (
                  <div className="text-sm text-green-600 flex items-center justify-center gap-2">
                    <FaQrcode />
                    Code scanné avec succès
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setProofs(prev => ({ ...prev, qrCode: 'scanned' }))}
                    className="text-[#048B9A] hover:text-[#037483] text-sm flex items-center justify-center gap-2 w-full"
                  >
                    <FaQrcode />
                    Scanner le QR Code
                  </button>
                )}
              </div>
            </div>

            {/* Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos de la livraison (max. 3)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="border-2 border-dashed rounded-lg aspect-square flex items-center justify-center relative"
                  >
                    {proofs.photos[index] ? (
                      <div className="w-full h-full relative group">
                        <img
                          src={URL.createObjectURL(proofs.photos[index])}
                          alt={`Preuve ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setProofs(prev => ({
                            ...prev,
                            photos: prev.photos.filter((_, i) => i !== index)
                          }))}
                          className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center"
                        >
                          Supprimer
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer text-center p-2 w-full h-full flex flex-col items-center justify-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <FaCamera className="text-gray-400 mb-1" size={20} />
                        <span className="text-xs text-gray-500">
                          Ajouter une photo
                        </span>
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Signature du client */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signature du client
              </label>
              <div className="border-2 border-dashed rounded-lg p-4">
                {proofs.signature ? (
                  <div className="text-sm text-green-600 flex items-center justify-center gap-2">
                    <FaUpload />
                    Signature capturée
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setProofs(prev => ({ ...prev, signature: 'signed' }))}
                    className="text-[#048B9A] hover:text-[#037483] text-sm flex items-center justify-center gap-2 w-full"
                  >
                    <FaUpload />
                    Capturer la signature
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer fixe */}
        <div className="border-t p-4 shrink-0">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#048B9A] text-white rounded-lg text-sm hover:bg-[#037483] disabled:opacity-50"
              disabled={loading || !proofs.qrCode || proofs.photos.length === 0 || !proofs.signature}
            >
              {loading ? 'Confirmation...' : 'Confirmer la livraison'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfirmationModal;