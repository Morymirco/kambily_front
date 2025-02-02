'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBox, FaCheckCircle, FaEnvelope, FaTruck } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

// Composant pour les boutons d'action
const ActionButton = ({ href, variant = 'primary', children }) => {
  const baseStyles = "inline-block px-6 py-3 rounded-lg transition-colors";
  const styles = variant === 'primary' 
    ? `${baseStyles} bg-[#048B9A] text-white hover:bg-[#037483]`
    : `${baseStyles} border-2 border-[#048B9A] text-[#048B9A] hover:bg-[#048B9A] hover:text-white`;

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
};

// Composant pour une étape de suivi
const TrackingStep = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className="inline-block p-3 bg-[#048B9A]/10 rounded-full mb-4">
      <Icon className="w-6 h-6 text-[#048B9A]" />
    </div>
    <h3 className="font-medium mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </motion.div>
);

// Composant pour le résumé de la commande
const OrderSummary = () => (
  <motion.div 
    className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    <h2 className="text-xl font-semibold mb-4">Détails de la commande</h2>
    <div className="space-y-4">
      <div className="flex justify-between pb-4 border-b">
        <span className="text-gray-600">Total</span>
        <span className="font-medium">80,000 GNF</span>
      </div>
      <div className="flex justify-between pb-4 border-b">
        <span className="text-gray-600">Mode de livraison</span>
        <span className="font-medium">Standard</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Adresse de livraison</span>
        <span className="font-medium text-right">123 Rue Principale<br />Conakry, Guinée</span>
      </div>
    </div>
  </motion.div>
);

// Composant pour l'en-tête de confirmation
const ConfirmationHeader = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring" }}
    >
      <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
        <FaCheckCircle className="w-12 h-12 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Commande confirmée !</h1>
      <p className="text-gray-600 max-w-md mx-auto">
        Merci pour votre commande. Votre numéro de commande est #{orderNumber}
      </p>
    </motion.div>
  );
};

// Composant pour les actions
const ActionButtons = () => (
  <motion.div 
    className="flex flex-col sm:flex-row justify-center gap-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
  >
    <ActionButton href="/boutique">
      Continuer les achats
    </ActionButton>
    <ActionButton href="/profile" variant="secondary">
      Voir mes commandes
    </ActionButton>
  </motion.div>
);

const Confirmation = () => {
  const steps = [
    {
      icon: FaEnvelope,
      title: "Confirmation envoyée",
      description: "Un email de confirmation a été envoyé à votre adresse"
    },
    {
      icon: FaBox,
      title: "Préparation de commande",
      description: "Votre commande est en cours de préparation"
    },
    {
      icon: FaTruck,
      title: "Livraison",
      description: "Livraison prévue sous 3-5 jours ouvrés"
    }
  ];

  return (
    <motion.div 
      className="max-w-[1400px] mx-auto px-4 md:px-16 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ConfirmationHeader />

      <div className="max-w-3xl mx-auto mb-12">
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <TrackingStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              delay={0.4 + index * 0.2}
            />
          ))}
        </div>
      </div>

      <OrderSummary />
      <ActionButtons />
    </motion.div>
  );
};

export default Confirmation; 