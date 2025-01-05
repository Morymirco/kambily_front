'use client'
import Link from 'next/link';
import { useState } from 'react';
import { FaCookie, FaShieldAlt, FaUserShield } from 'react-icons/fa';

export default function CookiePolicy() {
  const [activeTab, setActiveTab] = useState('general');

  const cookieTypes = [
    {
      name: "Cookies essentiels",
      description: "Ces cookies sont nécessaires au fonctionnement du site. Ils permettent la navigation et l'utilisation des fonctionnalités de base.",
      examples: ["Session de connexion", "Panier d'achat", "Préférences de sécurité"],
      canBeDisabled: false
    },
    {
      name: "Cookies analytiques",
      description: "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site en collectant des informations anonymes.",
      examples: ["Pages visitées", "Temps passé sur le site", "Origine du trafic"],
      canBeDisabled: true
    },
    {
      name: "Cookies de fonctionnalité",
      description: "Ces cookies permettent d'améliorer votre expérience en mémorisant vos préférences.",
      examples: ["Langue préférée", "Région", "Personnalisation de l'interface"],
      canBeDisabled: true
    },
    {
      name: "Cookies marketing",
      description: "Ces cookies sont utilisés pour suivre les visiteurs sur les sites Web. L'intention est d'afficher des publicités pertinentes pour chaque utilisateur.",
      examples: ["Publicités ciblées", "Réseaux sociaux", "Remarketing"],
      canBeDisabled: true
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#048B9A]">Accueil</Link>
        <span>›</span>
        <span className="text-gray-900">Politique de cookies</span>
      </div>

      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Politique de Cookies</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
          Découvrez comment nous les utilisons et comment vous pouvez les contrôler.
        </p>
      </div>

      {/* Onglets */}
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-4 px-4 font-medium transition-colors relative ${
            activeTab === 'general' 
              ? 'text-[#048B9A]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FaCookie />
            Général
          </div>
          {activeTab === 'general' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#048B9A]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`pb-4 px-4 font-medium transition-colors relative ${
            activeTab === 'privacy' 
              ? 'text-[#048B9A]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FaUserShield />
            Confidentialité
          </div>
          {activeTab === 'privacy' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#048B9A]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`pb-4 px-4 font-medium transition-colors relative ${
            activeTab === 'security' 
              ? 'text-[#048B9A]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FaShieldAlt />
            Sécurité
          </div>
          {activeTab === 'security' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#048B9A]" />
          )}
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="min-h-[400px]">
        {activeTab === 'general' && (
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Qu'est-ce qu'un cookie ?</h2>
              <p className="text-gray-600">
                Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile 
                lorsque vous visitez un site web. Les cookies sont largement utilisés pour faire 
                fonctionner les sites web ou les rendre plus efficaces, ainsi que pour fournir 
                des informations aux propriétaires du site.
              </p>
            </section>

            {/* Types de cookies */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-6">Types de cookies que nous utilisons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cookieTypes.map((cookie, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm"
                  >
                    <h3 className="text-lg font-medium mb-3 flex items-center justify-between">
                      {cookie.name}
                      {cookie.canBeDisabled ? (
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                          Optionnel
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-[#048B9A]/10 text-[#048B9A] rounded-full">
                          Requis
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 mb-4">{cookie.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">Exemples :</p>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {cookie.examples.map((example, i) => (
                          <li key={i}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Protection de vos données</h2>
            <p className="text-gray-600 mb-6">
              Nous prenons la protection de vos données personnelles très au sérieux. 
              Nos cookies sont utilisés de manière responsable et transparente, conformément 
              aux lois sur la protection des données en vigueur.
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Conservation des données</h3>
                <p className="text-sm text-gray-600">
                  Les cookies que nous utilisons ne stockent aucune information personnelle 
                  directement identifiable. Les données sont conservées uniquement pendant 
                  la durée nécessaire à la réalisation des finalités visées.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Vos droits</h3>
                <p className="text-sm text-gray-600">
                  Vous avez le droit de contrôler et/ou supprimer les cookies comme vous 
                  le souhaitez. Vous pouvez effacer les cookies déjà présents sur votre 
                  ordinateur et paramétrer la plupart des navigateurs pour qu'ils les bloquent.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Sécurité des cookies</h2>
            <p className="text-gray-600 mb-6">
              La sécurité de vos données est notre priorité. Nous utilisons des 
              protocoles de sécurité avancés pour protéger les informations stockées 
              dans nos cookies.
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Mesures de sécurité</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  <li>Chiffrement des données sensibles</li>
                  <li>Protocoles de sécurité SSL/TLS</li>
                  <li>Audits de sécurité réguliers</li>
                  <li>Mises à jour de sécurité continues</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 