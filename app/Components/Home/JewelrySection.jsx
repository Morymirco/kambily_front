import Image from 'next/image';

export default function JewelrySection() {
  return (
    <>
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-[#048B9A]">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-medium">Meilleures Offres</h2>
            <p className="text-xs text-gray-400 leading-tight">
              Découvrez nos offres imbattables conçues pour offrir le meilleur rapport qualité-prix.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <JewelryItem
            image="/bijoux/bagues.jpg"
            title="21/23 Pièces/Set De Bagues À La Mode"
            price="40,000 GNF"
          />
          <JewelryItem
            image="/bijoux/collier.jpg"
            title="2 pièces Collier à papillon"
            price="18,000 GNF"
          />
        </div>
      </div>

      <div className="m-4 relative rounded-lg overflow-hidden">
        <Image
          src="/bijoux/collier-diamant.jpg"
          alt="Collection de bijoux"
          width={400}
          height={300}
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-between">
          <div>
            <div className="inline-block bg-[#048B9A] text-white text-xs px-2 py-1 rounded">
              BIJOUTERIE
            </div>
            <h2 className="text-white text-xl font-bold mt-2">
              Éblouissez-vous avec notre collection de bijoux
            </h2>
            <p className="text-white/90 text-sm mt-1">
              Parcourez notre collection pour trouver des bijoux qui parlent de votre style unique.
            </p>
          </div>
          <button className="text-white text-sm font-medium">
            Explorer →
          </button>
        </div>
      </div>
    </>
  );
}

function JewelryItem({ image, title, price }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="text-[#048B9A] font-medium mt-1">{price}</div>
        <div className="flex items-center gap-2 text-xs text-green-600 mt-1">
          <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
          In Stock
        </div>
        <button className="w-full mt-2 bg-[#048B9A] text-white py-2 rounded-lg text-sm">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
} 