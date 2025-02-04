'use client'
import { useAuth } from '@/app/providers/AuthProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import AddAddressModal from './AddAddressModal';

const AddressSkeleton = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    {[1, 2, 3, 4].map((item) => (
      <div 
        key={item} 
        className="p-4 border rounded-lg animate-pulse"
      >
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0 mt-1" />
          
          <div className="flex-1 min-w-0 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const AddressSelector = ({ selectedAddress, onAddressSelect, showAddButton = true }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    ville: '',
    pays: '',
    telephone: '',
    latitude: 9.6412,
    longitude: -13.5784,
    is_default: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { authFetch } = useAuth();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await authFetch('https://api.kambily.store/addresses/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération des adresses');
      const data = await response.json();
      setAddresses(data);
      
      console.log(data);
      if (!selectedAddress && data.length > 0) {
        const defaultAddress = data.find(addr => addr.is_default) || data[0];
        onAddressSelect(defaultAddress);
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Impossible de charger les adresses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await authFetch('https://api.kambily.store/addresses/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          address: formData.address.trim(),
          ville: formData.ville.trim(),
          pays: formData.pays.trim(),
          telephone: formData.telephone.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ajout de l\'adresse panier');
      }

      const newAddress = await response.json();
      setAddresses(prev => [...prev, newAddress]);
      
      if (formData.is_default || addresses.length === 0) {
        onAddressSelect(newAddress);
      }
      
      setShowAddModal(false);
      toast.success('Adresse ajoutée avec succès');
      
      // Réinitialiser le formulaire
      setFormData({
        address: '',
        ville: '',
        pays: '',
        telephone: '',
        latitude: 9.6412,
        longitude: -13.5784,
        is_default: false
      });

      // Rafraîchir la liste des adresses
      await fetchAddresses();
      
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.message || 'Impossible d\'ajouter l\'adresse');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <AddressSkeleton />;
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {addresses.map((address) => (
          <motion.div
            key={address.pk}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 md:p-4 border rounded-lg cursor-pointer transition-all ${
              selectedAddress?.pk === address.pk
                ? 'border-[#048B9A] bg-[#048B9A]/5' 
                : 'hover:border-gray-300'
            }`}
            onClick={() => onAddressSelect(address)}
          >
            <div className="flex items-start gap-2 md:gap-3">
              <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex-shrink-0 mt-1 ${
                selectedAddress?.pk === address.pk 
                  ? 'border-[#048B9A] bg-[#048B9A]' 
                  : 'border-gray-300'
              }`}>
                  {selectedAddress?.pk === address.pk && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                  </motion.div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <h3 className="font-medium text-sm md:text-base truncate">
                    {address.address}
                  </h3>
                  {address.is_default && (
                    <span className="inline-block px-2 py-0.5 bg-[#048B9A]/10 text-[#048B9A] text-xs rounded-full w-fit">
                      Par défaut
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-1 md:line-clamp-none">
                  {address.ville}
                </p>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-1 md:line-clamp-none">
                  {address.pays}
                </p>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  {address.telephone}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {showAddButton && (
          <motion.button
            onClick={() => setShowAddModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-[140px] md:h-[160px] border-2 border-dashed border-[#048B9A] rounded-lg flex flex-col items-center justify-center gap-2 md:gap-3 text-[#048B9A] hover:bg-[#048B9A]/5 transition-colors"
          >
            <FaPlus className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-sm md:text-base">Ajouter une adresse</span>
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <AddAddressModal
            onSubmit={handleAddAddress}
            onClose={() => setShowAddModal(false)}
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressSelector; 