import Image from 'next/image';
import SmallProductCard from './SmallProductCard';

export default function ElectronicsSection() {
  return (
    <div className="px-4 space-y-4">
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src="/realite.webp"
            alt="Casque VR"
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium">
            Réalité Virtuelle Casque, Portable 3D Virtuel Réalité Lunettes Pour Films Et Jeux
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-gray-400 line-through text-sm">210,000GNF</span>
            <span className="text-[#048B9A] font-medium">185,000GNF</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-600 mt-1">
            <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
            In Stock
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Profitez dès maintenant avant la fin de l'offre
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <SmallProductCard 
          imageUrl="/pochette.webp"
          title="Réalité Virtuelle Casque, Portable 3D Virtuel Réalité Lunettes Pour Films Et Jeux"
          price={185000}
          originalPrice={210000}
        />
        <SmallProductCard 
          imageUrl="/realite.webp"
          title="Réalité Virtuelle Casque, Portable 3D Virtuel Réalité Lunettes Pour Films Et Jeux"
          price={185000}
          originalPrice={210000}
        />
        <SmallProductCard 
          imageUrl="/lumiere.webp"
          title="Réalité Virtuelle Casque, Portable 3D Virtuel Réalité Lunettes Pour Films Et Jeux"
          price={185000}
          originalPrice={210000}
        />
      </div>
    </div>
  );
} 