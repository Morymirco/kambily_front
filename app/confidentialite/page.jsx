export default function PrivacyPolicy() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
      <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
      
      <div className="prose max-w-none space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 leading-relaxed">
            La présente politique de confidentialité décrit la manière dont Kambily, société
            appartenant à Kambily Group, collecte, utilise, partage et protège les données
            personnelles des utilisateurs de son site web www.kambily.com.
          </p>
        </div>

        {/* Collecte des données */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Quelles données personnelles collectons-nous ?</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Données fournies directement :</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Vos coordonnées (nom, prénom, adresse e-mail, numéro de téléphone, adresse postale)</li>
                <li>Vos informations de paiement</li>
                <li>Vos préférences et intérêts</li>
                <li>Vos avis et commentaires</li>
                <li>Vos données de connexion</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Données collectées indirectement :</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Données techniques</li>
                <li>Données analytiques</li>
                <li>Données provenant de sources externes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Base juridique */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Sur quelle base juridique collectons-nous vos données ?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Votre consentement</h3>
              <p className="text-gray-600">
                Vous nous donnez votre accord explicite pour le traitement de vos données personnelles.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">L'exécution d'un contrat</h3>
              <p className="text-gray-600">
                Le traitement est nécessaire à l'exécution d'un contrat avec vous.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Notre intérêt légitime</h3>
              <p className="text-gray-600">
                Le traitement repose sur un intérêt légitime que nous poursuivons.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Obligation légale</h3>
              <p className="text-gray-600">
                Le traitement est requis par la loi ou une autorité compétente.
              </p>
            </div>
          </div>
        </div>

        {/* Droits des utilisateurs */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
          
          <div className="space-y-4">
            {[
              { title: "Droit d'accès", desc: "Accéder aux données que nous détenons sur vous" },
              { title: "Droit de rectification", desc: "Corriger ou compléter vos données" },
              { title: "Droit d'effacement", desc: "Demander la suppression de vos données" },
              { title: "Droit d'opposition", desc: "S'opposer au traitement de vos données" },
              { title: "Droit à la limitation", desc: "Demander la suspension du traitement" },
              { title: "Droit à la portabilité", desc: "Recevoir vos données dans un format structuré" }
            ].map((right, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-8 h-8 bg-[#048B9A] text-white rounded-full flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium">{right.title}</h3>
                  <p className="text-gray-600">{right.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Nous contacter</h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Par email</h3>
              <a href="mailto:contact@kambily.com" className="text-[#048B9A] hover:underline">
                contact@kambily.com
              </a>
            </div>
            
            <div className="flex-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Par courrier</h3>
              <p className="text-gray-600">
                Kambily Group<br />
                BP 1234, Dubréka<br />
                Guinée
              </p>
            </div>
          </div>
        </div>

        {/* Mise à jour */}
        <div className="text-sm text-gray-500 text-center">
          Dernière mise à jour : 28 décembre 2023
        </div>
      </div>
    </div>
  );
} 