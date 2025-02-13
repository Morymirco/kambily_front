'use client';
export const ProductSkeleton = () => (
  <div className="bg-white rounded-lg p-4 space-y-3">
    <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse" />
    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
  </div>
);
