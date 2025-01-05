'use client'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaImage, FaSearch, FaTrash } from 'react-icons/fa';

const CategoriesPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    parentId: '',
    description: '',
    image: null
  });
  
  const categories = [
    {
      id: 1,
      name: 'Vêtements',
      slug: 'vetements',
      description: 'Tous types de vêtements',
      parentId: null,
      image: '/categories/vetements.jpg',
      productsCount: 45,
      total: 12500000
    },
    {
      id: 2,
      name: 'Hommes',
      slug: 'hommes',
      description: 'Vêtements pour hommes',
      parentId: 1,
      image: '/categories/hommes.jpg',
      productsCount: 25,
      total: 7800000
    },
    // ... autres catégories
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCategory({
        ...newCategory,
        image: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Catégorie ajoutée avec succès');
    setNewCategory({ name: '', slug: '', parentId: '', description: '', image: null });
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

  const handleBulkDelete = () => {
    if (window.confirm(`Supprimer ${selectedCategories.length} catégorie(s) ?`)) {
      toast.success(`${selectedCategories.length} catégorie(s) supprimée(s)`);
      setSelectedCategories([]);
    }
  };

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
                <label className="block text-sm text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Catégorie parente</label>
                <select
                  value={newCategory.parentId}
                  onChange={(e) => setNewCategory({...newCategory, parentId: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Aucune</option>
                  {categories
                    .filter(cat => cat.parentId === null)
                    .map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Miniature</label>
                <div className="mt-1 flex items-center">
                  {newCategory.image ? (
                    <div className="relative w-24 h-24">
                      <img
                        src={newCategory.image}
                        alt="Aperçu"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setNewCategory({...newCategory, image: null})}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ) : (
                    <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#048B9A]">
                      <FaImage className="w-6 h-6 text-gray-400" />
                      <span className="mt-2 text-xs text-gray-500">Ajouter</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#048B9A] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#037483]"
              >
                Ajouter
              </button>
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
                      checked={selectedCategories.length === categories.length}
                      onChange={handleSelectAll}
                      className="rounded text-[#048B9A] focus:ring-[#048B9A]"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produits</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
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
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500">{category.slug}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {category.description}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {category.productsCount}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {category.total.toLocaleString()} GNF
                    </td>
                    <td className="px-4 py-4 text-right space-x-2">
                      <button className="text-[#048B9A] hover:text-[#037483]">
                        <FaEdit size={14} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage; 