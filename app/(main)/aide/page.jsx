'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FaEnvelope, FaHeadset, FaPhone, FaQuestionCircle, FaShippingFast, FaWhatsapp } from 'react-icons/fa';

export default function Help() {
  const [activeTab, setActiveTab] = useState('faq');
  const [selectedGuide, setSelectedGuide] = useState(null);

  const faqs = [
    {
      question: "Comment suivre ma commande ?",
      answer: "Vous pouvez suivre votre commande en temps réel dans la section 'Mes commandes' de votre compte. Vous recevrez également des notifications par email à chaque étape de la livraison."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Les délais de livraison varient selon votre localisation : 24-48h pour Conakry, 3-5 jours pour les autres régions. Vous pouvez consulter les délais exacts lors de la finalisation de votre commande."
    },
    {
      question: "Comment retourner un article ?",
      answer: "Vous disposez de 7 jours pour retourner un article. Connectez-vous à votre compte, sélectionnez la commande concernée et suivez les instructions pour générer votre étiquette de retour."
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons les paiements par carte bancaire, Orange Money, MTN Money, et le paiement à la livraison dans certaines zones. Tous les paiements sont sécurisés."
    }
  ];

  const guides = [
    {
      title: "Guide des tailles",
      icon: "👕",
      description: "Trouvez votre taille parfaite avec notre guide détaillé",
      link: "/aide/guide-tailles",
      content: {
        title: "Guide des tailles",
        description: "Apprenez à prendre vos mesures correctement et trouvez votre taille idéale",
        sections: [
          {
            title: "Comment prendre vos mesures",
            text: "Pour des mesures précises, utilisez un mètre ruban souple..."
          },
          {
            title: "Tableau des tailles",
            text: "Consultez nos tableaux de conversion pour homme et femme..."
          }
        ]
      }
    },
    {
      title: "Processus de commande",
      icon: "🛒",
      description: "Apprenez à commander en quelques étapes simples",
      link: "/aide/processus-commande",
      content: {
        title: "Comment commander",
        description: "Guide étape par étape pour passer votre première commande",
        sections: [
          {
            title: "Choisir vos articles",
            text: "Parcourez notre catalogue et ajoutez les articles au panier..."
          },
          {
            title: "Finaliser votre commande",
            text: "Vérifiez votre panier et procédez au paiement..."
          }
        ]
      }
    },
    {
      title: "Modes de paiement",
      icon: "💳",
      description: "Découvrez toutes nos options de paiement sécurisées",
      link: "/aide/modes-paiement",
      content: {
        title: "Modes de paiement acceptés",
        description: "Toutes les méthodes de paiement disponibles sur notre site",
        sections: [
          {
            title: "Paiement mobile",
            text: "Orange Money, MTN Money, et autres solutions mobiles..."
          },
          {
            title: "Paiement à la livraison",
            text: "Disponible dans certaines zones de livraison..."
          }
        ]
      }
    },
    {
      title: "Politique de retour",
      icon: "↩️",
      description: "Tout savoir sur nos conditions de retour",
      link: "/aide/politique-retour",
      content: {
        title: "Politique de retour",
        description: "Informations sur les retours et remboursements",
        sections: [
          {
            title: "Conditions de retour",
            text: "Vous disposez de 7 jours pour retourner un article..."
          },
          {
            title: "Procédure de retour",
            text: "Comment initier et effectuer un retour..."
          }
        ]
      }
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#048B9A]">Accueil</Link>
        <span>›</span>
        <span className="text-gray-900">Centre d'aide</span>
      </div>

      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Comment pouvons-nous vous aider ?</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Trouvez rapidement des réponses à vos questions dans notre centre d'aide
        </p>
      </div>

      {/* Cartes de contact rapide */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-[#048B9A] to-[#037483] p-6 rounded-xl text-white"
        >
          <FaHeadset className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Service Client</h3>
          <p className="mb-4 text-gray-100">Disponible 7j/7 de 8h à 22h</p>
          <a href="tel:+224624000000" className="flex items-center gap-2 text-white hover:opacity-80">
            <FaPhone className="w-4 h-4" />
            +224 624 00 00 00
          </a>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white"
        >
          <FaWhatsapp className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
          <p className="mb-4 text-gray-100">Réponse rapide par message</p>
          <a href="https://wa.me/224624000000" className="flex items-center gap-2 text-white hover:opacity-80">
            Démarrer une discussion
          </a>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white"
        >
          <FaEnvelope className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p className="mb-4 text-gray-100">Réponse sous 24h</p>
          <a href="mailto:support@kambily.com" className="flex items-center gap-2 text-white hover:opacity-80">
            support@kambily.com
          </a>
        </motion.div>
      </div>

      {/* Onglets */}
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('faq')}
          className={`pb-4 px-4 font-medium transition-colors relative ${
            activeTab === 'faq' 
              ? 'text-[#048B9A]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FaQuestionCircle />
            FAQ
          </div>
          {activeTab === 'faq' && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#048B9A]" 
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('guides')}
          className={`pb-4 px-4 font-medium transition-colors relative ${
            activeTab === 'guides' 
              ? 'text-[#048B9A]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FaShippingFast />
            Guides
          </div>
          {activeTab === 'guides' && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#048B9A]" 
            />
          )}
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="min-h-[400px]">
        {activeTab === 'faq' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <details 
                key={index}
                className="group bg-white rounded-lg shadow-sm"
              >
                <summary className="flex justify-between items-center cursor-pointer p-6 list-none">
                  <span className="font-medium">{faq.question}</span>
                  <span className="transform transition-transform duration-300 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </motion.div>
        )}

        {activeTab === 'guides' && !selectedGuide && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {guides.map((guide, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-4">{guide.icon}</div>
                <h3 className="text-lg font-medium mb-2">{guide.title}</h3>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <button 
                  onClick={() => setSelectedGuide(guide)}
                  className="text-[#048B9A] hover:text-[#037483] font-medium flex items-center gap-2 group"
                >
                  En savoir plus
                  <svg 
                    className="w-4 h-4 transform transition-transform group-hover:translate-x-1" 
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
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'guides' && selectedGuide && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-6 md:p-8"
          >
            {/* Header avec bouton retour */}
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={() => setSelectedGuide(null)}
                className="text-gray-600 hover:text-[#048B9A] transition-colors"
              >
                <svg 
                  className="w-6 h-6" 
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
              <h2 className="text-2xl font-bold">{selectedGuide.content.title}</h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-8">
              {selectedGuide.content.description}
            </p>

            {/* Sections */}
            <div className="space-y-6">
              {selectedGuide.content.sections.map((section, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <h3 className="text-lg font-medium mb-3">{section.title}</h3>
                  <p className="text-gray-600">{section.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 