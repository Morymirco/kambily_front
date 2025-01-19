'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaImage, FaSpinner } from 'react-icons/fa';

export default function TestAjoutCategorie() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    slug: '',
    is_main: false,
    parent_category: null,
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);

  // Charger les catégories principales pour le select
  const fetchMainCategories = async () => {
    try {
      const response = await fetch('https://api.kambily.store/categories/');
      if (!response.ok) throw new Error('Erreur lors du chargement des catégories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Impossible de charger les catégories');
    }
  };

  // Gérer le changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCategory(prev => ({ ...prev, image: file }));
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
      
      // Ajouter les champs de base
      formData.append('name', newCategory.name);
      formData.append('description', newCategory.description || "Description par défaut");
      formData.append('slug', newCategory.name.toLowerCase().replace(/\s+/g, '-'));

      // Gérer is_main et parent_category
      if (newCategory.is_main) {
        // Si c'est une catégorie principale
        formData.append('is_main', 'true');
        formData.append('parent_category', ''); // Pas de parent pour une catégorie principale
      } else {
        // Si ce n'est pas une catégorie principale
        formData.append('is_main', 'false');
        
        // Vérifier si une catégorie parente est sélectionnée
        if (!newCategory.parent_category) {
          toast.error('Veuillez sélectionner une catégorie parente');
          setIsSubmitting(false);
          return;
        }

        // Trouver la catégorie parente et ajouter son nom
        const parentCategory = categories.find(cat => cat.id === Number(newCategory.parent_category));
        if (!parentCategory) {
          toast.error('Catégorie parente invalide');
          setIsSubmitting(false);
          return;
        }
        formData.append('parent_category', parentCategory.name);
      }

      // Ajouter l'image si elle existe
      if (newCategory.image) {
        formData.append('image', newCategory.image);
      }

      // Log des données avant envoi
      console.log('Données envoyées:', {
        name: newCategory.name,
        description: newCategory.description || "Description par défaut",
        slug: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
        is_main: newCategory.is_main,
        parent_category: !newCategory.is_main ? categories.find(cat => cat.id === Number(newCategory.parent_category))?.name : null
      });

      const response = await fetch('https://api.kambily.store/categories/create/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      const data = await response.json();
      console.log('Réponse du serveur:', data);

      if (!response.ok) {
        if (data.name && Array.isArray(data.name) && data.name[0].includes('already exists')) {
          throw new Error(`La catégorie "${newCategory.name}" existe déjà`);
        }
        throw new Error(data.detail || `Erreur ${response.status}: ${data.message || 'Impossible de créer la catégorie'}`);
      }

      toast.success('Catégorie créée avec succès !');
      setNewCategory({
        name: '',
        description: '',
        slug: '',
        is_main: false,
        parent_category: null,
        image: null
      });
      setImagePreview(null);

    } catch (err) {
      console.error('Erreur détaillée:', err);
      toast.error(err.message || 'Une erreur est survenue lors de la création de la catégorie');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-semibold mb-6">Ajouter une catégorie</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de la catégorie *
              </label>
              <input
                type="text"
                required
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]"
                rows={3}
              />
            </div>

            {/* Catégorie principale */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newCategory.is_main}
                  onChange={(e) => setNewCategory(prev => ({ 
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
            {!newCategory.is_main && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie parente *
                </label>
                <select
                  value={newCategory.parent_category || ''}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, parent_category: e.target.value }))}
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

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#048B9A] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Création en cours...
                </>
              ) : (
                'Créer la catégorie'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 