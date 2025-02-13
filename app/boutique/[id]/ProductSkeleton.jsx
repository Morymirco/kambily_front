'use client';
export const ProductSkeleton = () => (
  <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12">
    {/* Fil d'Ariane skeleton */}
    <div className="flex items-center gap-2 mb-8">
      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="w-2 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="w-2 h-4 bg-gray-200 rounded animate-pulse" />
      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Galerie d'images skeleton */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-lg bg-gray-200 animate-pulse" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>

      {/* Informations produit skeleton */}
      <div className="space-y-6">
        {/* Titre */}
        <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse" />

        {/* Prix et notation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Tailles */}
        <div className="space-y-4">
          <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>

        {/* Couleurs */}
        <div className="space-y-4">
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* Quantité */}
        <div className="space-y-4">
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-4 pt-6">
          <div className="flex-1 h-14 bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex-1 h-14 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);
