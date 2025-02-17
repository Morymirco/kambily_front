import React from 'react';

const Skeleton = () => {
  return (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="h-32 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-1"></div>
      <div className="h-4 bg-gray-200 rounded mb-1"></div>
      <div className="h-4 bg-gray-200 rounded mb-1"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  );
};

export default Skeleton; 