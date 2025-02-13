'use client';
export const formatPrice = (price) => {
  // Enlever les décimales et formater avec des espaces
  return price
    .toString()
    .split('.')[0]
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' GNF';
};
