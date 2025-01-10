'use client'
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaSearch, FaTimes, FaTrash } from 'react-icons/fa';

// Composant client séparé pour le bouton de suppression en masse
const BulkDeleteButton = ({ selectedCount, onDelete }) => (
  <button
    onClick={onDelete}
    className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 hover:bg-red-700"
  >
    <FaTrash size={12} />
    Supprimer la sélection
  </button>
);

// Composant client séparé pour le formulaire d'ajout
const AddAttributeForm = ({ onSubmit, onClose }) => {
  const [attributeType, setAttributeType] = useState('size'); // 'size' ou 'color'
  const [newValue, setNewValue] = useState({
    name: '',
    description: '',
    code: '' // pour les couleurs uniquement
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/test/login');
        return;
      }

      const endpoint = attributeType === 'size'
        ? 'http://35.85.136.46:8001/products/sizes/create'
        : 'http://35.85.136.46:8001/products/colors/create';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newValue)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || `Erreur lors de l'ajout`);
      }

      toast.success(`${attributeType === 'size' ? 'Taille' : 'Couleur'} ajoutée avec succès`);
      onSubmit();
      onClose();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Ajouter un attribut</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type d'attribut
            </label>
            <select
              value={attributeType}
              onChange={(e) => {
                setAttributeType(e.target.value);
                setNewValue({ name: '', description: '', code: '' });
              }}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]/20 focus:border-[#048B9A]"
            >
              <option value="size">Taille</option>
              <option value="color">Couleur</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              value={newValue.name}
              onChange={(e) => setNewValue({...newValue, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]/20 focus:border-[#048B9A]"
              required
              placeholder={attributeType === 'size' ? "ex: XL, 42..." : "ex: Rouge, Bleu..."}
            />
          </div>

          {attributeType === 'color' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code couleur
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={newValue.code}
                  onChange={(e) => setNewValue({...newValue, code: e.target.value})}
                  className="h-10 w-20 p-1 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  value={newValue.code}
                  onChange={(e) => setNewValue({...newValue, code: e.target.value})}
                  className="flex-1 px-3 py-2 border rounded-lg"
                  placeholder="#000000"
                  pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newValue.description}
              onChange={(e) => setNewValue({...newValue, description: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]/20 focus:border-[#048B9A]"
              rows={3}
              placeholder="Description optionnelle"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
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
  );
};

// Composant client séparé pour la ligne du tableau d'attributs
const AttributeRow = ({ attribute, isSelected, onSelect, onEdit, onDelete }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-4 py-4">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(attribute.id)}
        className="rounded text-[#048B9A] focus:ring-[#048B9A]"
      />
    </td>
    <td className="px-4 py-4">
      <div className="font-medium">{attribute.name}</div>
    </td>
    <td className="px-4 py-4">
      <div className="flex flex-wrap gap-1">
        {attribute.values.map((value, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
          >
            {value}
          </span>
        ))}
      </div>
    </td>
    <td className="px-4 py-4 text-sm text-gray-500">
      {attribute.description}
    </td>
    <td className="px-4 py-4 text-sm text-gray-500">
      {attribute.productsCount}
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
);

const AttributesPage = () => {
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [attributeType, setAttributeType] = useState('size'); // 'size' ou 'color'
  const [newAttribute, setNewAttribute] = useState({
    name: '',
    description: '',
    code: '' // pour les couleurs uniquement
  });
  const router = useRouter();
  
  const attributes = [
    {
      id: 1,
      name: 'Taille',
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      description: 'Tailles disponibles',
      productsCount: 28
    },
    {
      id: 2,
      name: 'Couleur',
      values: ['Rouge', 'Bleu', 'Vert', 'Noir', 'Blanc'],
      description: 'Couleurs disponibles',
      productsCount: 45
    },
    // ... autres attributs
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/test/login');
        return;
      }

      const endpoint = attributeType === 'size'
        ? 'http://35.85.136.46:8001/products/sizes/create'
        : 'http://35.85.136.46:8001/products/colors/create';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newAttribute)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || `Erreur lors de l'ajout`);
      }

      toast.success(`${attributeType === 'size' ? 'Taille' : 'Couleur'} ajoutée avec succès`);
      setShowAddModal(false);
      setNewAttribute({ name: '', description: '', code: '' });
    } catch (err) {
      console.error('Erreur:', err);
      toast.error(err.message);
    }
  };

  const handleSelectAll = useCallback((e) => {
    if (e.target.checked) {
      setSelectedAttributes(attributes.map(attr => attr.id));
    } else {
      setSelectedAttributes([]);
    }
  }, [attributes]);

  const handleSelectAttribute = useCallback((attributeId) => {
    setSelectedAttributes(prev => 
      prev.includes(attributeId)
        ? prev.filter(id => id !== attributeId)
        : [...prev, attributeId]
    );
  }, []);

  const handleBulkDelete = useCallback(() => {
    if (window.confirm(`Supprimer ${selectedAttributes.length} attribut(s) ?`)) {
      toast.success(`${selectedAttributes.length} attribut(s) supprimé(s)`);
      setSelectedAttributes([]);
    }
  }, [selectedAttributes.length]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Attributs</h1>
          {selectedAttributes.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {selectedAttributes.length} attribut(s) sélectionné(s)
            </p>
          )}
        </div>
        {selectedAttributes.length > 0 && (
          <BulkDeleteButton
            selectedCount={selectedAttributes.length}
            onDelete={handleBulkDelete}
          />
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Ajouter un attribut</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type d'attribut
                </label>
                <select
                  value={attributeType}
                  onChange={(e) => {
                    setAttributeType(e.target.value);
                    setNewAttribute({ name: '', description: '', code: '' });
                  }}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]/20 focus:border-[#048B9A]"
                >
                  <option value="size">Taille</option>
                  <option value="color">Couleur</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={newAttribute.name}
                  onChange={(e) => setNewAttribute({...newAttribute, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]/20 focus:border-[#048B9A]"
                  required
                  placeholder={attributeType === 'size' ? "ex: XL, 42..." : "ex: Rouge, Bleu..."}
                />
              </div>

              {attributeType === 'color' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code couleur
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={newAttribute.code}
                      onChange={(e) => setNewAttribute({...newAttribute, code: e.target.value})}
                      className="h-10 w-20 p-1 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      value={newAttribute.code}
                      onChange={(e) => setNewAttribute({...newAttribute, code: e.target.value})}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      placeholder="#000000"
                      pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newAttribute.description}
                  onChange={(e) => setNewAttribute({...newAttribute, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048B9A]/20 focus:border-[#048B9A]"
                  rows={3}
                  placeholder="Description optionnelle"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483]"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>

        {/* Liste des attributs */}
        <div className="col-span-2">
          {/* Barre de recherche */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un attribut..."
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
                      checked={selectedAttributes.length === attributes.length}
                      onChange={handleSelectAll}
                      className="rounded text-[#048B9A] focus:ring-[#048B9A]"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valeurs</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produits</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attributes.map((attribute) => (
                  <AttributeRow
                    key={attribute.id}
                    attribute={attribute}
                    isSelected={selectedAttributes.includes(attribute.id)}
                    onSelect={handleSelectAttribute}
                    onEdit={() => {}}
                    onDelete={() => {}}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributesPage; 