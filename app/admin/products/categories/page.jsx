'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaImage, FaSearch, FaTimes, FaTrash } from 'react-icons/fa';

const CategoriesPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    slug: '',
    is_main: false,
    parent_category: null,
    image: null
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const router = useRouter();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          router.push('/test/login');
          return;
        }

        const response = await fetch('http://35.85.136.46:8001/products/categories', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des catégories');
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Erreur:', err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [router]);

  // Filtrer les catégories selon la recherche
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculer les catégories à afficher pour la page courante
  const getCurrentPageItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Mettre à jour le nombre total de pages quand les catégories filtrées changent
  useEffect(() => {
    setTotalPages(Math.ceil(filteredCategories.length / itemsPerPage));
    // Revenir à la première page si les filtres changent
    setCurrentPage(1);
  }, [filteredCategories, itemsPerPage]);

  // Composant de pagination
  const Pagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    // Calculer la plage de pages à afficher
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Ajuster si on est près du début ou de la fin
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            Affichage de{' '}
            <span className="font-medium">
              {Math.min((currentPage - 1) * itemsPerPage + 1, filteredCategories.length)}
            </span>{' '}
            à{' '}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, filteredCategories.length)}
            </span>{' '}
            sur{' '}
            <span className="font-medium">{filteredCategories.length}</span> résultats
          </span>

          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="ml-4 px-2 py-1 border rounded-md text-sm"
          >
            <option value={10}>10 par page</option>
            <option value={25}>25 par page</option>
            <option value={50}>50 par page</option>
            <option value={100}>100 par page</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
          >
            ««
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
          >
            «
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => setCurrentPage(1)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                1
              </button>
              {startPage > 2 && <span className="px-2">...</span>}
            </>
          )}

          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 border rounded-md text-sm ${
                currentPage === number
                  ? 'bg-[#048B9A] text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2">...</span>}
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
          >
            »
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
          >
            »»
          </button>
        </div>
      </div>
    );
  };

  // Supprimer une catégorie
  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;

    try {
      const response = await fetch(`http://35.85.136.46:8001/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      setCategories(prevCategories => prevCategories.filter(cat => cat.id !== id));
      toast.success('Catégorie supprimée avec succès');
    } catch (err) {
      console.error('Erreur:', err);
      toast.error(err.message);
    }
  };

  // Supprimer plusieurs catégories
  const handleBulkDelete = async () => {
    if (!window.confirm(`Supprimer ${selectedCategories.length} catégorie(s) ?`)) return;

    try {
      const deletePromises = selectedCategories.map(id =>
        fetch(`http://35.85.136.46:8001/categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Accept': 'application/json'
          }
        })
      );

      await Promise.all(deletePromises);
      
      setCategories(prevCategories => 
        prevCategories.filter(cat => !selectedCategories.includes(cat.id))
      );
      setSelectedCategories([]);
      toast.success(`${selectedCategories.length} catégorie(s) supprimée(s)`);
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de la suppression multiple');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCategory({
        ...newCategory,
        image: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/test/login');
        return;
      }

      // Créer l'objet de données à envoyer
      const categoryData = {
        name: newCategory.name,
        description: newCategory.description,
        slug: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
        is_main: newCategory.is_main,
        parent_category: newCategory.parent_category || null
      };

      // Si une image est sélectionnée, créer un FormData
      let body;
      if (newCategory.image) {
        body = new FormData();
        // Ajouter les données de la catégorie
        Object.keys(categoryData).forEach(key => {
          body.append(key, categoryData[key]);
        });
        // Ajouter l'image
        body.append('image', newCategory.image);
      } else {
        body = JSON.stringify(categoryData);
      }

      const response = await fetch('http://35.85.136.46:8001/products/categories/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          ...(newCategory.image ? {} : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
        },
        body: body
      });

      const data = await response.json();

      if (!response.ok) {
        // Gestion des différents types d'erreurs
        if (response.status === 400) {
          const errorMessage = Object.entries(data)
            .map(([key, value]) => `${key}: ${value.join(', ')}`)
            .join('\n');
          throw new Error(errorMessage);
        }
        throw new Error(data.detail || 'Erreur lors de l\'ajout de la catégorie');
      }

      // Mise à jour de la liste des catégories
      setCategories(prevCategories => [...prevCategories, data]);
      
      // Réinitialisation du formulaire
      setNewCategory({
        name: '',
        description: '',
        slug: '',
        is_main: false,
        parent_category: null,
        image: null
      });
      
      // Fermer le modal et afficher le message de succès
      setShowAddModal(false);
      toast.success('Catégorie ajoutée avec succès');
    } catch (err) {
      console.error('Erreur:', err);
      toast.error(err.message);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCategories(categories.map(cat => cat.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Catégories</h1>
          {selectedCategories.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {selectedCategories.length} catégorie(s) sélectionnée(s)
            </p>
          )}
        </div>
        {selectedCategories.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 hover:bg-red-700"
          >
            <FaTrash size={12} />
            Supprimer la sélection
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Formulaire d'ajout */}
        <div className="col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-medium mb-4">Ajouter une catégorie</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({
                    ...newCategory,
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]/20 focus:border-[#048B9A]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]/20 focus:border-[#048B9A]"
                  rows={3}
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newCategory.is_main}
                    onChange={(e) => setNewCategory({...newCategory, is_main: e.target.checked})}
                    className="rounded text-[#048B9A] focus:ring-[#048B9A]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Catégorie principale
                  </span>
                </label>
              </div>

              {!newCategory.is_main && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie parente
                  </label>
                  <select
                    value={newCategory.parent_category || ''}
                    onChange={(e) => setNewCategory({...newCategory, parent_category: e.target.value || null})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]/20 focus:border-[#048B9A]"
                  >
                    <option value="">Aucune</option>
                    {categories.filter(cat => cat.is_main).map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#048B9A] hover:text-[#037483] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#048B9A]">
                        <span>Télécharger un fichier</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewCategory({
                            ...newCategory,
                            image: e.target.files[0]
                          })}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF jusqu'à 10MB
                    </p>
                    {newCategory.image && (
                      <p className="text-sm text-gray-500">
                        Fichier sélectionné: {newCategory.image.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483]"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Liste des catégories */}
        <div className="col-span-2">
          {/* Barre de recherche */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedCategories.length === filteredCategories.length}
                      onChange={handleSelectAll}
                      className="rounded text-[#048B9A] focus:ring-[#048B9A]"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produits</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getCurrentPageItems().map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleSelectCategory(category.id)}
                        className="rounded text-[#048B9A] focus:ring-[#048B9A]"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100">
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <FaImage className="text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {category.description}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {category.parent_category?.name || '-'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {category.products_count || 0} produits
                    </td>
                    <td className="px-4 py-4 text-right space-x-2">
                      <button 
                        className="text-[#048B9A] hover:text-[#037483]"
                        onClick={() => router.push(`/admin/products/categories/${category.id}/edit`)}
                      >
                        <FaEdit size={14} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(category.id)}
                      >
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ajouter la pagination après le tableau */}
          <Pagination />
        </div>
      </div>

      {/* Modal d'ajout */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Ajouter une catégorie</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({
                    ...newCategory,
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]/20 focus:border-[#048B9A]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]/20 focus:border-[#048B9A]"
                  rows={3}
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newCategory.is_main}
                    onChange={(e) => setNewCategory({...newCategory, is_main: e.target.checked})}
                    className="rounded text-[#048B9A] focus:ring-[#048B9A]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Catégorie principale
                  </span>
                </label>
              </div>

              {!newCategory.is_main && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie parente
                  </label>
                  <select
                    value={newCategory.parent_category || ''}
                    onChange={(e) => setNewCategory({...newCategory, parent_category: e.target.value || null})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]/20 focus:border-[#048B9A]"
                  >
                    <option value="">Aucune</option>
                    {categories.filter(cat => cat.is_main).map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#048B9A] hover:text-[#037483] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#048B9A]">
                        <span>Télécharger un fichier</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewCategory({
                            ...newCategory,
                            image: e.target.files[0]
                          })}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF jusqu'à 10MB
                    </p>
                    {newCategory.image && (
                      <p className="text-sm text-gray-500">
                        Fichier sélectionné: {newCategory.image.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483]"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage; 