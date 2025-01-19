'use client'
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaImage, FaSpinner } from 'react-icons/fa';

export default function TestModifCategorie({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: '',
    description: '',
    slug: '',
    is_main: false,
    parent_category: null,
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Charger la catégorie et les catégories principales au montage
  useEffect(() => {
    fetchCategory();
    fetchMainCategories();
  }, [id]);

  // Charger les détails de la catégorie
  const fetchCategory = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`https://api.kambily.store/categories/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Erreur lors du chargement de la catégorie');
      
      const data = await response.json();
      setCategory({
        name: data.name,
        description: data.description || '',
        slug: data.slug,
        is_main: data.is_main,
        parent_category: data.parent_category?.id || null,
        image: null
      });
      if (data.image) {
        setImagePreview(data.image.image);
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Impossible de charger la catégorie');
      router.push('/test/testaffichecat');
    }
  };

  // Charger les catégories principales pour le select
  const fetchMainCategories = async () => {
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
      const mainCategories = data.filter(cat => cat.is_main && cat.id !== parseInt(id));
      setCategories(mainCategories);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Impossible de charger les catégories');
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer le changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login');
        return;
      }

      const formData = new FormData();
      formData.append('name', category.name);
      formData.append('description', category.description || "Description par défaut");
      formData.append('slug', category.name.toLowerCase().replace(/\s+/g, '-'));
      formData.append('is_main', category.is_main.toString());

      if (!category.is_main && category.parent_category) {
        const parentCategory = categories.find(cat => cat.id === Number(category.parent_category));
        if (parentCategory) {
          formData.append('parent_category', parentCategory.name);
        }
      } else {
        formData.append('parent_category', '');
      }

      if (category.image) {
        formData.append('image', category.image);
      }

      const response = await fetch(`https://api.kambily.store/categories/${id}/update/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Erreur lors de la modification de la catégorie');
      }

      toast.success('Catégorie modifiée avec succès !');
      router.push('/test/testaffichecat');

    } catch (err) {
      console.error('Erreur:', err);
      toast.error(err.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="w-8 h-8 text-[#048B9A] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-semibold mb-6">Modifier la catégorie</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de la catégorie *
              </label>
              <input
                type="text"
                required
                value={category.name}
                onChange={(e) => setCategory(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={category.description}
                onChange={(e) => setCategory(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                rows={3}
              />
            </div>

            {/* Catégorie principale */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={category.is_main}
                  onChange={(e) => setCategory(prev => ({ 
                    ...prev, 
                    is_main: e.target.checked,
                    parent_category: e.target.checked ? null : prev.parent_category 
                  }))}
                  className="rounded text-[#048B9A] focus:ring-[#048B9A]"
                />
                <span className="text-sm font-medium text-gray-700">
                  Catégorie principale
                </span>
              </label>
            </div>

            {/* Catégorie parente */}
            {!category.is_main && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie parente *
                </label>
                <select
                  value={category.parent_category || ''}
                  onChange={(e) => setCategory(prev => ({ ...prev, parent_category: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <div className="h-32 w-32 relative rounded-lg overflow-hidden bg-gray-100">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Aperçu"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <FaImage className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#048B9A] file:text-white hover:file:bg-[#037483]"
                />
              </div>
            </div>

            {/* Boutons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/test/testaffichecat')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#048B9A] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Modification en cours...
                  </>
                ) : (
                  'Enregistrer les modifications'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 