'use client';
export const AddressSkeleton = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    {[1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="p-4 border rounded-lg animate-pulse"
      >
        <div className="flex items-start gap-3">
          {/* Icône */}
          <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0 mt-1" />

          <div className="flex-1 min-w-0 space-y-3">
            {/* Adresse */}
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            {/* Ville */}
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            {/* Pays */}
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            {/* Téléphone */}
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>

        {/* Boutons */}
        <div className="mt-4 flex justify-end gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded" />
          <div className="w-8 h-8 bg-gray-200 rounded" />
        </div>
      </div>
    ))}

    {/* Bouton d'ajout skeleton */}
    <div className="h-[160px] border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-3 animate-pulse">
      <div className="w-6 h-6 bg-gray-200 rounded-full" />
      <div className="h-4 bg-gray-200 rounded w-32" />
    </div>
  </div>
);
