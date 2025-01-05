export default function TermsAndConditions() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
      <h1 className="text-3xl font-bold mb-8">Conditions Générales de Vente</h1>
      
      <div className="prose max-w-none space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600 leading-relaxed">
            Les présents termes et conditions de vente régissent les relations contractuelles entre Kambily, 
            société appartenant à Kambily Group, dont le siège social est situé à BP 1234, Dubréka, Guinée, 
            et toute personne physique ou morale qui effectue un achat sur le site internet www.kambily.com.
          </p>
        </div>

        {/* Articles */}
        {[
          {
            title: "Article 1 : Produits",
            content: [
              "Les Produits sont décrits avec la plus grande exactitude possible",
              "Les Produits sont conformes à la législation guinéenne",
              "Les Produits sont offerts dans la limite des stocks disponibles"
            ]
          },
          {
            title: "Article 2 : Prix",
            content: [
              "Les prix sont indiqués en francs guinéens (GNF), TTC",
              "Les frais de livraison sont indiqués avant validation",
              "Les prix peuvent être modifiés à tout moment"
            ]
          },
          {
            title: "Article 3 : Commande",
            content: [
              "Sélection des produits et ajout au panier",
              "Identification ou création de compte",
              "Choix du mode de livraison et paiement",
              "Confirmation de la commande"
            ]
          },
          {
            title: "Article 4 : Paiement",
            content: [
              "Carte bancaire, virement, chèque, mobile money",
              "Paiement sécurisé par cryptage SSL",
              "Pas de conservation des données bancaires"
            ]
          }
        ].map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              {article.content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Garanties et Responsabilités */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Garanties et Responsabilités</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Garantie légale</h3>
              <p className="text-gray-600">
                Les Produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Délai de réclamation</h3>
              <p className="text-gray-600">
                48 heures à compter de la livraison pour la garantie de conformité.
              </p>
            </div>
          </div>
        </div>

        {/* Droit de rétractation */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Droit de rétractation</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="w-12 h-12 bg-[#048B9A] text-white rounded-full flex items-center justify-center flex-shrink-0">
                14
              </div>
              <p className="text-gray-600">
                Jours pour exercer votre droit de rétractation à compter de la réception des Produits
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Procédure de retour</h3>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>Notifier Kambily de votre décision</li>
                <li>Renvoyer les produits dans leur état d'origine</li>
                <li>Remboursement sous 14 jours maximum</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Service client</h3>
              <a href="mailto:contact@kambily.com" className="text-[#048B9A] hover:underline block">
                contact@kambily.com
              </a>
              <a href="tel:00000000" className="text-[#048B9A] hover:underline">
                00 00 00 00 00
              </a>
            </div>
            
            <div className="flex-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Adresse</h3>
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