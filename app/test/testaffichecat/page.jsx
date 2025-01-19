'use client'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaEdit, FaImage, FaSpinner, FaTrash } from 'react-icons/fa';

export default function TestAfficheCat() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Charger les catégories au montage
  useEffect(() => {
    fetchCategories();
  }, []);

  // Récupérer toutes les catégories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://api.kambily.store/categories/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Erreur lors du chargement des catégories');
      
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Impossible de charger les catégories');
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une catégorie
  const handleDelete = async (categoryId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`https://api.kambily.store/categories/${categoryId}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');

      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      toast.success('Catégorie supprimée avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Impossible de supprimer la catégorie');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="w-8 h-8 text-[#048B9A] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Liste des catégories</h1>
          <button
            onClick={() => router.push('/test/testajoutcate')}
            className="bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483]"
          >
            Ajouter une catégorie
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Image */}
              <div className="h-48 relative">
                {category.image ? (
                  <img
                    src={category.image.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <FaImage className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description || "Aucune description"}
                </p>

                {/* Détails */}
                <div className="space-y-2 text-sm text-gray-500">
                  <p>
                    Type: {category.is_main ? 'Catégorie principale' : 'Sous-catégorie'}
                  </p>
                  {!category.is_main && category.parent_category && (
                    <p>
                      Parent: {category.parent_category.name}
                    </p>
                  )}
                  <p>Produits: {category.x || 0}</p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => router.push(`/test/testajoutcate/${category.id}`)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune catégorie trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
} 