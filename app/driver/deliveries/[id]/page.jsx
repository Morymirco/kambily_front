'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Link from 'next/link';
import { use, useState } from 'react';
import {
    FaArrowLeft,
    FaBox,
    FaClock,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaPhone,
    FaUser
} from 'react-icons/fa';

const DeliveryDetailsPage = ({ params }) => {
  const { id } = use(params);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Données de démonstration
  const delivery = {
    id,
    orderId: 'CMD-001',
    status: 'en_cours',
    customer: {
      name: 'Aissatou Barry',
      phone: '+224 621 00 00 00',
      address: 'Kipé, Ratoma',
      location: {
        lat: 9.535555,
        lng: -13.652687
      }
    },
    items: [
      {
        id: 1,
        name: 'Pizza Margherita',
        quantity: 2,
        price: 120000
      },
      {
        id: 2,
        name: 'Coca-Cola 33cl',
        quantity: 1,
        price: 10000
      }
    ],
    amount: 250000,
    deliveryFee: 15000,
    assignedAt: '2024-03-15T14:30:00',
    estimatedDeliveryTime: '30-45 min',
    paymentMethod: 'cash',
    notes: 'Sonner à l\'interphone 2B'
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: delivery.customer.location.lat,
    lng: delivery.customer.location.lng
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/driver/deliveries"
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FaArrowLeft className="text-gray-500" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Détails de la livraison</h1>
            <p className="text-sm text-gray-500">Commande {delivery.orderId}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          delivery.status === 'delivered'
            ? 'bg-green-100 text-green-800'
            : delivery.status === 'en_cours'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {delivery.status === 'delivered' 
            ? 'Livrée' 
            : delivery.status === 'en_cours'
            ? 'En cours'
            : 'Annulée'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Informations client */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-medium">Informations client</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FaUser className="text-gray-400" />
              <span>{delivery.customer.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-gray-400" />
              <a 
                href={`tel:${delivery.customer.phone}`}
                className="text-[#048B9A] hover:text-[#037483]"
              >
                {delivery.customer.phone}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-gray-400 mt-1" />
              <span>{delivery.customer.address}</span>
            </div>
          </div>

          <div className="pt-4 border-t space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Heure d'assignation</div>
              <div className="flex items-center gap-2">
                <FaClock className="text-gray-400" size={12} />
                {new Date(delivery.assignedAt).toLocaleTimeString('fr-FR')}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Temps estimé</div>
              <div>{delivery.estimatedDeliveryTime}</div>
            </div>
          </div>
        </div>

        {/* Détails commande */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-lg font-medium">Détails commande</h2>
          
          <div className="space-y-3">
            {delivery.items.map((item) => (
              <div key={item.id} className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <FaBox className="text-gray-400 mt-1" />
                  <div>
                    <div>{item.name}</div>
                    <div className="text-sm text-gray-500">Quantité: {item.quantity}</div>
                  </div>
                </div>
                <div className="font-medium">
                  {item.price.toLocaleString()} GNF
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Sous-total</span>
              <span>{(delivery.amount - delivery.deliveryFee).toLocaleString()} GNF</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Frais de livraison</span>
              <span>{delivery.deliveryFee.toLocaleString()} GNF</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t font-medium">
              <span>Total</span>
              <span>{delivery.amount.toLocaleString()} GNF</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Mode de paiement</div>
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-gray-400" size={12} />
                {delivery.paymentMethod === 'cash' ? 'Espèces' : 'Mobile Money'}
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Notes</h2>
          <p className="text-gray-600">{delivery.notes}</p>
        </div>
      </div>

      {/* Carte */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <LoadScript 
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          onLoad={() => setMapLoaded(true)}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default DeliveryDetailsPage; 