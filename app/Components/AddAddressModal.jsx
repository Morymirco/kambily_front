'use client'
import { useGoogleMapsScript } from '@/app/hooks/useGoogleMapsScript';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddAddressModal = ({ onSubmit, onClose, formData, setFormData, isSubmitting }) => {
  const mapRef = useRef(null);
  const isGoogleMapsLoaded = useGoogleMapsScript();

  useEffect(() => {
    if (!isGoogleMapsLoaded || !mapRef.current) return;

    // Initialiser la carte
    const googleMap = new window.google.maps.Map(mapRef.current, {
      zoom: 13,
      center: { lat: formData.latitude || 9.6412, lng: formData.longitude || -13.5784 },
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    // Créer le marqueur
    const marker = new window.google.maps.Marker({
      position: { lat: formData.latitude || 9.6412, lng: formData.longitude || -13.5784 },
      map: googleMap,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
    });

    // Gérer le clic sur la carte
    googleMap.addListener('click', (event) => {
      const position = event.latLng;
      marker.setPosition(position);
      setFormData({
        ...formData,
        latitude: position.lat(),
        longitude: position.lng(),
      });

      // Géocodage inverse pour obtenir l'adresse
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const address = results[0];
          setFormData(prev => ({
            ...prev,
            address: address.formatted_address,
            ville: address.address_components.find(c => c.types.includes('locality'))?.long_name || '',
            pays: address.address_components.find(c => c.types.includes('country'))?.long_name || '',
          }));
        }
      });
    });

    // Gérer le déplacement du marqueur
    marker.addListener('dragend', () => {
      const position = marker.getPosition();
      setFormData({
        ...formData,
        latitude: position.lat(),
        longitude: position.lng(),
      });

      // Géocodage inverse pour obtenir l'adresse
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const address = results[0];
          setFormData(prev => ({
            ...prev,
            address: address.formatted_address,
            ville: address.address_components.find(c => c.types.includes('locality'))?.long_name || '',
            pays: address.address_components.find(c => c.types.includes('country'))?.long_name || '',
          }));
        }
      });
    });

    // Ajouter la barre de recherche avec autocomplétion
    const searchInput = document.getElementById('address-search');
    if (searchInput) {
      const autocomplete = new window.google.maps.places.Autocomplete(searchInput, {
        types: ['address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const position = place.geometry.location;
        googleMap.setCenter(position);
        marker.setPosition(position);

        setFormData({
          ...formData,
          address: place.formatted_address,
          latitude: position.lat(),
          longitude: position.lng(),
          ville: place.address_components.find(c => c.types.includes('locality'))?.long_name || '',
          pays: place.address_components.find(c => c.types.includes('country'))?.long_name || '',
        });
      });
    }
  }, [isGoogleMapsLoaded, formData.latitude, formData.longitude]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 md:p-4 bg-black bg-opacity-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl p-2 md:p-4 w-full max-w-2xl my-2 md:my-0 max-h-[95vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-2 md:mb-4">
          <h3 className="text-sm md:text-lg font-semibold">Ajouter une adresse</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-2 md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {/* Colonne carte et recherche */}
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Rechercher une adresse
                </label>
                <input
                  id="address-search"
                  type="text"
                  placeholder="Entrez une adresse..."
                  className="w-full px-2 py-1 md:py-2 border border-gray-300 rounded-lg text-xs"
                />
              </div>

              <div 
                ref={mapRef} 
                className="w-full h-[150px] md:h-[250px] rounded-lg border border-gray-300"
              />
            </div>

            {/* Colonne formulaire */}
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Adresse complète
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-2 py-1 border rounded-lg text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Ville</label>
                  <input
                    type="text"
                    value={formData.ville}
                    onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                    className="w-full px-2 py-1 border rounded-lg text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Pays</label>
                  <input
                    type="text"
                    value={formData.pays}
                    onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                    className="w-full px-2 py-1 border rounded-lg text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  className="w-full px-2 py-1 border rounded-lg text-xs"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_default"
                  checked={formData.is_default}
                  onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                  className="rounded border-gray-300 text-[#048B9A]"
                />
                <label htmlFor="is_default" className="text-xs text-gray-700">
                  Définir comme adresse par défaut
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#048B9A] text-white px-3 py-1.5 rounded-lg text-xs font-medium"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Ajout...</span>
                </div>
              ) : (
                "Ajouter l'adresse"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium"
            >
              Annuler
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddAddressModal; 