export default function FreeDeliveryBanner() {
  return (
    <div className="bg-[#048B9A] text-white p-4 sm:p-6 lg:p-8 rounded-lg my-4 sm:my-6 lg:my-8">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
            Livraison gratuite
          </h2>
          <p className="text-sm sm:text-base lg:text-lg opacity-90">
            Pour toute commande supérieure à 500 000 GNF
          </p>
        </div>
        <button className="bg-white text-[#048B9A] px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
          Commander maintenant
        </button>
      </div>
    </div>
  );
} 