
const Promo = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-16 my-8">
      <div className="border-dotted rounded-2xl p-6 bg-[#FFF5F5] flex items-center justify-between relative overflow-hidden">
        {/* Arrière-plan avec effet */}
        <div className="absolute inset-0 opacity-10 text-[200px] font-bold text-gray-400 flex items-center justify-center">
          100%
        </div>
        
        {/* Contenu */}
        <div className="flex items-center gap-8 z-10">
          <span className="text-6xl font-bold text-gray-700">100%</span>
          <div>
            <h2 className="text-xl font-semibold text-[#048B9A] mb-1">
              Livraison gratuite à 100% pour tout achats à partir de 350.000GNF !!!
            </h2>
            <p className="text-gray-500">
              Plus vous achetez, plus vous économisez!
            </p>
          </div>
        </div>

        <span className="text-2xl font-semibold text-gray-700">
          Gratuit
        </span>
      </div>
    </div>
  );
};

export default Promo;
