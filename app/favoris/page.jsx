'use client'
import Link from 'next/link';
import Produit from './../../Components/Common/Product';

export default function Wishlist() {
  // Exemple de données pour les favoris
  const favoriteProducts = [
    {
      id: 1,
      image: "/realite.webp",
      gallery: ["/realite.webp", "/realite2.webp", "/realite3.webp"],
      title: "Réalité Virtuelle Casque , Portable 3D Virtuel Réalité Lunettes Pour Films Et Jeux",
      price: "185,000",
      oldPrice: "210,000",
      inStock: true,
      description: "Profitez dès maintenant avant la fin de l'offre"
    },
    {
      id: 2,
      image: "/pochette.webp",
      gallery: ["/pochette.webp", "/pochette2.webp"],
      title: "Coque De Téléphone Portable Figure",
      price: "45,000",
      inStock: true
    },
    {
      id: 3,
      image: "/lumiere.webp",
      gallery: ["/lumiere.webp", "/lumiere2.webp"],
      title: "1 pièce Lumière d'ambiance pour téléphone clip rond avec miroir",
      price: "40,000",
      inStock: true
    },
    {
      id: 4,
      image: "/lunettes.webp",
      gallery: ["/lunettes.webp", "/lunettes2.webp"],
      title: "3 Pièces Lunettes De Soleil De Mode",
      price: "85,000",
      oldPrice: "100,000",
      inStock: true,
      description: "Ne manquez pas cette opportunité tant qu'elle dure"
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#048B9A]">Accueil</Link>
        <span>›</span>
        <span className="text-gray-900">Mes favoris</span>
      </div>

      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Mes favoris</h1>
        <p className="text-gray-600">
          {favoriteProducts.length} produit{favoriteProducts.length > 1 ? 's' : ''} dans vos favoris
        </p>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <Produit
              key={product.id}
              image={product.image}
              gallery={product.gallery}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              inStock={product.inStock}
              description={product.description}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mb-4">
            <svg 
              className="w-16 h-16 mx-auto text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Votre liste de favoris est vide</h2>
          <p className="text-gray-600 mb-6">
            Parcourez notre boutique et ajoutez des produits à vos favoris
          </p>
          <Link 
            href="/boutique"
            className="inline-block bg-[#048B9A] text-white px-6 py-3 rounded-lg hover:bg-[#037483] transition-colors"
          >
            Découvrir nos produits
          </Link>
        </div>
      )}
    </div>
  );
} 