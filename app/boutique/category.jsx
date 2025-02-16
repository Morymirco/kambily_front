'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query; // Récupérer le paramètre de catégorie
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (category) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`/api/products?category=${category}`);
          if (!response.ok) throw new Error('Erreur lors du chargement des produits');
          const data = await response.json();
          setProducts(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [category]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <h1>Produits dans la catégorie: {category}</h1>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.price} GNF</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage; 