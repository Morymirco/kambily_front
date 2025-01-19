'use client'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

export default function EditProduct() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    short_description: '',
    long_description: '',
    regular_price: '',
    promo_price: '',
    sku: '',
    stock_status: true,
    quantity: '0',
    weight: '',
    length: '',
    width: '',
    height: '',
    product_type: 'simple',
    etat_stock: '',
    categories: [],
    etiquettes: [],
    colors: [],
    sizes: []
  });

  // États pour les listes de sélection
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableEtiquettes, setAvailableEtiquettes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          router.push('/test/login');
          return;
        }

        const response = await fetch(`https://api.kambily.store/products/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement du produit');
        }

        const data = await response.json();
        setFormData({
          name: data.name || '',
          short_description: data.short_description || '',
          long_description: data.long_description || '',
          regular_price: data.regular_price?.toString() || '',
          promo_price: data.promo_price?.toString() || '',
          sku: data.sku || '',
          stock_status: data.stock_status || false,
          quantity: data.quantity?.toString() || '0',
          weight: data.weight?.toString() || '',
          length: data.length?.toString() || '',
          width: data.width?.toString() || '',
          height: data.height?.toString() || '',
          product_type: data.product_type || 'simple',
          etat_stock: data.etat_stock || '',
          categories: data.categories?.map(c => c.id) || [],
          etiquettes: data.etiquettes?.map(e => e.id) || [],
          colors: data.colors?.map(c => c.id) || [],
          sizes: data.sizes?.map(s => s.id) || []
        });
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router]);

  // Charger les données de référence au chargement
  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        
        // Charger les catégories
        const categoriesResponse = await fetch('https://api.kambily.store/categories', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const categoriesData = await categoriesResponse.json();
        setAvailableCategories(categoriesData);

        // Charger les étiquettes
        const etiquettesResponse = await fetch('https://api.kambily.store/etiquettes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const etiquettesData = await etiquettesResponse.json();
        setAvailableEtiquettes(etiquettesData);

        // Charger les couleurs
        const colorsResponse = await fetch('https://api.kambily.store/colors', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const colorsData = await colorsResponse.json();
        setAvailableColors(colorsData);

        // Charger les tailles
        const sizesResponse = await fetch('https://api.kambily.store/sizes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const sizesData = await sizesResponse.json();
        setAvailableSizes(sizesData);

      } catch (err) {
        console.error('Erreur lors du chargement des données de référence:', err);
        toast.error('Erreur lors du chargement des attributs');
      }
    };

    fetchReferenceData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
        const response = await fetch(`https://api.kambily.store/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      toast.success('Produit mis à jour avec succès');
      router.push(`/admin/products/${params.id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FaArrowLeft className="text-gray-500" />
          </button>
          <h1 className="text-xl font-bold">Modifier le produit</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de base */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Informations de base</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du produit
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description courte
              </label>
              <textarea
                value={formData.short_description}
                onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description longue
              </label>
              <textarea
                value={formData.long_description}
                onChange={(e) => setFormData({...formData, long_description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows={5}
              />
            </div>
          </div>
        </div>

        {/* Prix et stock */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Prix et stock</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix régulier
              </label>
              <input
                type="number"
                value={formData.regular_price}
                onChange={(e) => setFormData({...formData, regular_price: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix promo
              </label>
              <input
                type="number"
                value={formData.promo_price}
                onChange={(e) => setFormData({...formData, promo_price: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantité
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                État du stock
              </label>
              <select
                value={formData.etat_stock}
                onChange={(e) => setFormData({...formData, etat_stock: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Sélectionner un état</option>
                <option value="En Stock">En Stock</option>
                <option value="Rupture">Rupture</option>
                <option value="Nouveau">Nouveau</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dimensions */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Dimensions</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poids (kg)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longueur (cm)
              </label>
              <input
                type="number"
                value={formData.length}
                onChange={(e) => setFormData({...formData, length: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Largeur (cm)
              </label>
              <input
                type="number"
                value={formData.width}
                onChange={(e) => setFormData({...formData, width: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hauteur (cm)
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Attributs */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Attributs</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de produit
              </label>
              <select
                value={formData.product_type}
                onChange={(e) => setFormData({...formData, product_type: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="simple">Simple</option>
                <option value="variable">Variable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégories
              </label>
              <select
                multiple
                value={formData.categories}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => option.value);
                  setFormData({...formData, categories: values});
                }}
                className="w-full px-3 py-2 border rounded-lg"
                size={4}
              >
                {availableCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Étiquettes
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                {availableEtiquettes.map(etiquette => (
                  <label key={etiquette.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.etiquettes.includes(etiquette.id)}
                      onChange={(e) => {
                        const newEtiquettes = e.target.checked
                          ? [...formData.etiquettes, etiquette.id]
                          : formData.etiquettes.filter(id => id !== etiquette.id);
                        setFormData({...formData, etiquettes: newEtiquettes});
                      }}
                      className="rounded text-[#048B9A] focus:ring-[#048B9A]"
                    />
                    {etiquette.name}
                  </label>
                ))}
              </div>
            </div>

            {formData.product_type === 'variable' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleurs disponibles
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                    {availableColors.map(color => (
                      <label key={color.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.colors.includes(color.id)}
                          onChange={(e) => {
                            const newColors = e.target.checked
                              ? [...formData.colors, color.id]
                              : formData.colors.filter(id => id !== color.id);
                            setFormData({...formData, colors: newColors});
                          }}
                          className="rounded text-[#048B9A] focus:ring-[#048B9A]"
                        />
                        <span 
                          className="w-4 h-4 rounded-full inline-block mr-2"
                          style={{ backgroundColor: color.code }}
                        />
                        {color.name}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tailles disponibles
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                    {availableSizes.map(size => (
                      <label key={size.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.sizes.includes(size.id)}
                          onChange={(e) => {
                            const newSizes = e.target.checked
                              ? [...formData.sizes, size.id]
                              : formData.sizes.filter(id => id !== size.id);
                            setFormData({...formData, sizes: newSizes});
                          }}
                          className="rounded text-[#048B9A] focus:ring-[#048B9A]"
                        />
                        {size.name}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded-lg"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[#048B9A] text-white rounded-lg flex items-center gap-2"
          >
            <FaSave />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
} 