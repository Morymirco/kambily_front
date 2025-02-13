'use client';
export const ProfileSkeleton = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-16 py-12 animate-pulse">
      {/* Titre */}
      <div className="h-8 w-48 bg-gray-200 rounded-lg mb-8"></div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar skeleton */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4">
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-12 bg-gray-200 rounded-lg"
              ></div>
            ))}
          </div>
        </div>

        {/* Contenu principal skeleton */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {/* En-tête du profil */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="w-28 h-28 sm:w-24 sm:h-24 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Informations du profil */}
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border rounded-lg p-6">
                  <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
