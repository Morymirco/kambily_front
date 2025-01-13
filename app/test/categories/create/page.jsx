'use client'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';

export default function CreateCategory() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [mainCategories, setMainCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: '',
    is_main: true,
    parent_category: ''
  });

  // Charger les catégories principales pour le select
  useEffect(() => {
    fetchMainCategories();
    setMounted(true);
  }, []);

  const fetchMainCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/test/login');
        return;
      }

      const response = await fetch('https://api.kambily.store/products/list_categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Réponse catégories:', response);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des catégories');
      }

      const data = await response.json();
      console.log('Données catégories:', data);

      // Filtrer pour n'avoir que les catégories principales
      const mainCats = Array.isArray(data) ? data.filter(cat => cat.is_main) : [];
      console.log('Catégories principales:', mainCats);
      
      setMainCategories(mainCats);
    } catch (err) {
      console.error('Erreur détaillée:', err);
      setError('Impossible de charger les catégories. Veuillez réessayer.');
    }
  };

  // Générer automatiquement le slug à partir du nom
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[éèê]/g, 'e')
      .replace(/[àâ]/g, 'a')
      .replace(/[ùû]/g, 'u')
      .replace(/[ôö]/g, 'o')
      .replace(/[ïî]/g, 'i')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mounted) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/test/login');
        return;
      }

      // Préparer les données
      const dataToSend = {
        ...formData,
        slug: formData.slug || generateSlug(formData.name)
      };

      // Si c'est une catégorie principale, on ne doit pas envoyer parent_category
      if (dataToSend.is_main) {
        delete dataToSend.parent_category;
      }

      console.log('Données à envoyer:', dataToSend);

      const response = await fetch('https://api.kambily.store/products/create_category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();
      console.log('Réponse:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la création de la catégorie');
      }

      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        slug: '',
        is_main: true,
        parent_category: ''
      });

      // Rafraîchir les catégories principales
      fetchMainCategories();

      // Redirection après 2 secondes
      setTimeout(() => {
        router.push('/test/categories');
      }, 2000);

    } catch (err) {
      console.error('Erreur détaillée:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#048B9A] hover:underline"
        >
          <FaArrowLeft /> Retour
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#048B9A]/10 flex items-center justify-center">
            <FaPlus className="w-6 h-6 text-[#048B9A]" />
          </div>
          <h1 className="text-2xl font-bold">Créer une catégorie</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la catégorie *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                  slug: generateSlug(e.target.value)
                });
              }}
              className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
              placeholder="Généré automatiquement si laissé vide"
            />
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_main}
                onChange={(e) => setFormData({ ...formData, is_main: e.target.checked })}
                className="rounded text-[#048B9A] focus:ring-[#048B9A]"
              />
              <span className="text-sm font-medium text-gray-700">
                Catégorie principale
              </span>
            </label>
          </div>

          {!formData.is_main && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie parente *
              </label>
              {error ? (
                <div className="text-red-500 text-sm mb-2">
                  {error}
                </div>
              ) : mainCategories.length === 0 ? (
                <div className="text-gray-500 text-sm mb-2">
                  Aucune catégorie principale disponible
                </div>
              ) : (
                <select
                  required={!formData.is_main}
                  value={formData.parent_category}
                  onChange={(e) => setFormData({ ...formData, parent_category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-[#048B9A] focus:border-[#048B9A]"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {mainCategories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-500 p-3 rounded-md text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 text-green-500 p-3 rounded-md text-sm"
            >
              Catégorie créée avec succès ! Redirection...
            </motion.div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#048B9A] text-white px-4 py-2 rounded-lg hover:bg-[#037483] transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                'Créer la catégorie'
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 