'use client';
export const WishlistSkeleton = () => (
  <div className="space-y-6">
    <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Image skeleton */}
          <div className="aspect-square relative bg-gray-200 animate-pulse" />

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
