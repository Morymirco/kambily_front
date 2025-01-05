export default function ReturnPolicy() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
      <h1 className="text-3xl font-bold mb-8">Politique de Retour</h1>
      
      <div className="prose max-w-none">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <p className="text-gray-600 leading-relaxed mb-6">
            Chez Kambily, nous nous efforçons de vous offrir des produits de qualité et de vous satisfaire pleinement. 
            Toutefois, si vous n'êtes pas satisfait de votre achat, vous pouvez nous le retourner dans les conditions suivantes :
          </p>

          <ul className="space-y-4 text-gray-600 list-disc pl-6">
            <li>
              Vous disposez d'un délai de <span className="font-medium">14 jours</span> à compter de la réception de votre commande pour nous informer de votre intention de retourner un ou plusieurs produits, en nous contactant par e-mail à l'adresse <a href="mailto:contact@kambily.com" className="text-[#048B9A] hover:underline">contact@kambily.com</a>, ou par téléphone au 00 00 00 00 00.
            </li>
            <li>
              Vous disposez ensuite d'un délai de <span className="font-medium">14 jours supplémentaires</span> pour nous renvoyer le ou les produits concernés, à vos frais, à l'adresse suivante : Kambily Group, BP 1234, Dubréka, Guinée.
            </li>
            <li>
              Dès réception de votre colis retour, nous procéderons au remboursement dans un délai maximum de 14 jours.
            </li>
          </ul>
        </div>

        {/* Exceptions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Exceptions à la politique de retour</h2>
          <p className="text-gray-600 mb-4">
            Certains produits ne peuvent pas faire l'objet d'un retour ou d'un échange, pour des raisons d'hygiène, de sécurité ou de personnalisation.
          </p>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-3">Produits non retournables :</h3>
            <ul className="space-y-2 text-gray-600 list-disc pl-6">
              <li>Les produits périssables (aliments, fleurs, etc.)</li>
              <li>Les produits cosmétiques ou de soin (crèmes, parfums, maquillage, etc.)</li>
              <li>Les produits d'hygiène intime (sous-vêtements, maillots de bain, etc.)</li>
              <li>Les produits personnalisés (gravés, brodés, imprimés, etc.)</li>
              <li>Les produits numériques (logiciels, jeux, musique, etc.)</li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Contactez-nous</h2>
          <p className="text-gray-600 mb-4">
            Si vous avez des questions, des commentaires ou des réclamations concernant notre politique de retour ou le traitement de votre retour, vous pouvez nous contacter :
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Par email</h3>
              <a 
                href="mailto:contact@kambily.com" 
                className="text-[#048B9A] hover:underline"
              >
                contact@kambily.com
              </a>
            </div>
            <div className="flex-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Par téléphone</h3>
              <a 
                href="tel:00000000" 
                className="text-[#048B9A] hover:underline"
              >
                00 00 00 00 00
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 