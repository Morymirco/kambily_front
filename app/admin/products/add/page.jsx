'use client'
import Spinner from '@/app/Components/ui/Spinner';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

function generateRandomSlug(length) {
  return Math.random().toString(36).substring(2, length + 2);
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  const [formData, setFormData] = useState({
    name: generateRandomSlug(8),
    short_description: generateRandomSlug(18),
    long_description: generateRandomSlug(100),
    regular_price: 12000,
    promo_price: 15000,
    sku: generateRandomSlug(8),
    stock_status: true,
    weight: generateRandomNumber(),
    length: generateRandomNumber(),
    width: generateRandomNumber(),
    height: generateRandomNumber(),
    product_type: 'variable',
    etat_stock: 'En Stock',
    quantity: generateRandomNumber(),
    categories: [],
    colors: [],
    sizes: [],
    etiquettes: []
  });

  // Fonctions de récupération des données
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://api.kambily.store/categories/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Erreur lors du chargement des catégories');
      const data = await response.json();
      setAvailableCategories(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des catégories');
      console.error(err);
    }
  };

  const fetchColors = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://api.kambily.store/colors/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Erreur lors du chargement des couleurs');
      const data = await response.json();
      setAvailableColors(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des couleurs');
      console.error(err);
    }
  };

  const fetchSizes = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://api.kambily.store/sizes/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Erreur lors du chargement des tailles');
      const data = await response.json();
      setAvailableSizes(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des tailles');
      console.error(err);
    }
  };

  const fetchTags = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://api.kambily.store/tags/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Erreur lors du chargement des étiquettes');
      const data = await response.json();
      setAvailableTags(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des étiquettes');
      console.error(err);
    }
  };

  // useEffect pour charger les données
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Charger toutes les données nécessaires
    const loadAllData = async () => {
      try {
        await Promise.all([
          fetchCategories(),
          fetchColors(),
          fetchSizes(),
          fetchTags()
        ]);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
      }
    };

    loadAllData();
  }, [router]);

  // Gestionnaires de changement
  const handleCategoryChange = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleColorChange = (colorId) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(colorId)
        ? prev.colors.filter(id => id !== colorId)
        : [...prev.colors, colorId]
    }));
  };

  const handleSizeChange = (sizeId) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(sizeId)
        ? prev.sizes.filter(id => id !== sizeId)
        : [...prev.sizes, sizeId]
    }));
  };

  const handleTagChange = (tagId) => {
    setFormData(prev => ({
      ...prev,
      etiquettes: prev.etiquettes.includes(tagId)
        ? prev.etiquettes.filter(id => id !== tagId)
        : [...prev.etiquettes, tagId]
    }));
  };

  // Gestion des images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Créer les previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagesPreviews(prev => [...prev, ...newPreviews]);
    
    // Stocker les fichiers
    setImageFiles(prev => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(imagesPreviews[index]);
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagesPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Session expirée, veuillez vous reconnecter');
        router.push('/login');
        return;
      }

      // Validation des images
      if (imageFiles.length === 0) {
        throw new Error('Au moins une image est requise');
      }

      const dataSended = new FormData();

      // Ajout des données de base
      Object.entries(formData).forEach(([key, value]) => {
        if (!['categories', 'colors', 'sizes', 'etiquettes'].includes(key)) {
          dataSended.append(key, value);
        }
      });

      // Formatage des tableaux
      dataSended.append('categories', JSON.stringify(formData.categories));
      dataSended.append('etiquettes', JSON.stringify(formData.etiquettes));
      dataSended.append('colors', JSON.stringify(formData.colors));
      dataSended.append('sizes', JSON.stringify(formData.sizes));

      // Ajout des images
      imageFiles.forEach(file => {
        dataSended.append('images', file);
      });

      const response = await fetch('https://api.kambily.store/products/create/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: dataSended
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la création du produit');
      }

      toast.success('Produit créé avec succès !');
      router.push('/admin/products');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [productType, setProductType] = useState('simple');
  const [variations, setVariations] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const productTypes = [
    { id: 'simple', name: 'Produit simple' },
    { id: 'variable', name: 'Produit variable' }
  ];

  const predefinedAttributes = {
    colors: [
      { name: 'Noir', value: '#000000' },
      { name: 'Blanc', value: '#FFFFFF' },
      { name: 'Rouge', value: '#FF0000' },
      { name: 'Bleu', value: '#0000FF' },
      { name: 'Vert', value: '#008000' },
      { name: 'Jaune', value: '#FFFF00' },
      { name: 'Rose', value: '#FFC0CB' },
      { name: 'Gris', value: '#808080' },
      { name: 'Marron', value: '#964B00' },
      { name: 'Orange', value: '#FFA500' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
  };

  const handleAddPredefinedAttribute = (type) => {
    const newAttribute = {
      name: type === 'colors' ? 'Couleur' : 'Taille',
      values: type === 'colors' ? [] : [...predefinedAttributes.sizes],
      visible: true,
      type: type // pour identifier le type d'attribut
    };
    setAttributes([...attributes, newAttribute]);
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (mainImage) {
        URL.revokeObjectURL(mainImage.url);
      }
      setMainImage({
        url: URL.createObjectURL(file),
        file
      });
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file
    }));
    setGalleryImages([...galleryImages, ...newImages]);
  };

  const removeMainImage = () => {
    if (mainImage) {
      URL.revokeObjectURL(mainImage.url);
      setMainImage(null);
    }
  };

  const removeGalleryImage = (index) => {
    const newImages = [...galleryImages];
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    setGalleryImages(newImages);
  };

  const handleAttributeAdd = () => {
    setAttributes([...attributes, { name: '', values: [], visible: true }]);
  };

  const handleAttributeRemove = (index) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  const handleAttributeChange = (index, field, value) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6"
      >
        Ajouter un nouveau produit
      </motion.h1>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Colonne gauche */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations générales */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Informations générales</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description courte
                  </label>
                  <textarea
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description complète
                  </label>
                  <textarea
                    value={formData.long_description}
                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Type de produit */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Type de produit</h2>
            <div className="grid grid-cols-2 gap-4">
              {productTypes.map((type) => (
                <label
                  key={type.id}
                  className={`
                    flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer
                    ${productType === type.id 
                      ? 'border-[#048B9A] bg-[#048B9A]/5' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="productType"
                    value={type.id}
                    checked={productType === type.id}
                    onChange={(e) => setProductType(e.target.value)}
                    className="hidden"
                  />
                  <span className={productType === type.id ? 'text-[#048B9A]' : 'text-gray-600'}>
                    {type.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Prix et stock */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Prix et stock</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix régulier (GNF)
                </label>
                <input
                  type="number"
                  value={formData.regular_price}
                  onChange={(e) => setFormData({ ...formData, regular_price: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix promo (GNF)
                </label>
                <input
                  type="number"
                  value={formData.promo_price}
                  onChange={(e) => setFormData({ ...formData, promo_price: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  État du stock
                </label>
                <select
                  value={formData.etat_stock}
                  onChange={(e) => setFormData({ ...formData, etat_stock: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none"
                >
                  <option value="instock">En stock</option>
                  <option value="outofstock">Rupture de stock</option>
                  <option value="onbackorder">Sur commande</option>
                </select>
              </div>
            </div>
          </div>

          {/* Attributs (si produit variable) */}
          {productType === 'variable' && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Attributs</h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddPredefinedAttribute('sizes')}
                    className="text-sm px-3 py-1.5 rounded-lg border border-[#048B9A] text-[#048B9A] hover:bg-[#048B9A] hover:text-white transition-colors"
                  >
                    + Tailles
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddPredefinedAttribute('colors')}
                    className="text-sm px-3 py-1.5 rounded-lg border border-[#048B9A] text-[#048B9A] hover:bg-[#048B9A] hover:text-white transition-colors"
                  >
                    + Couleurs
                  </button>
                  <button
                    type="button"
                    onClick={handleAttributeAdd}
                    className="text-sm px-3 py-1.5 rounded-lg border border-[#048B9A] text-[#048B9A] hover:bg-[#048B9A] hover:text-white transition-colors"
                  >
                    + Autre attribut
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {attributes.map((attribute, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">{attribute.name}</span>
                      <button
                        type="button"
                        onClick={() => handleAttributeRemove(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>

                    {attribute.type === 'colors' ? (
                      // Sélecteur de couleurs
                      <div className="grid grid-cols-5 gap-2">
                        {predefinedAttributes.colors.map((color) => (
                          <label
                            key={color.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={attribute.values.includes(color.name)}
                              onChange={(e) => {
                                const newValues = e.target.checked
                                  ? [...attribute.values, color.name]
                                  : attribute.values.filter(v => v !== color.name);
                                handleAttributeChange(index, 'values', newValues);
                              }}
                              className="hidden"
                            />
                            <div className="relative w-8 h-8 rounded-full border overflow-hidden group">
                              <div
                                style={{ backgroundColor: color.value }}
                                className="w-full h-full"
                              />
                              {attribute.values.includes(color.name) && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                  <FaCheck className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <span className="text-sm">{color.name}</span>
                          </label>
                        ))}
                      </div>
                    ) : attribute.type === 'sizes' ? (
                      // Sélecteur de tailles
                      <div className="flex flex-wrap gap-2">
                        {predefinedAttributes.sizes.map((size) => (
                          <label
                            key={size}
                            className={`
                              px-3 py-1.5 rounded-lg border cursor-pointer text-sm
                              ${attribute.values.includes(size)
                                ? 'bg-[#048B9A] text-white border-[#048B9A]'
                                : 'border-gray-300 hover:border-[#048B9A]'
                              }
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={attribute.values.includes(size)}
                              onChange={(e) => {
                                const newValues = e.target.checked
                                  ? [...attribute.values, size]
                                  : attribute.values.filter(v => v !== size);
                                handleAttributeChange(index, 'values', newValues);
                              }}
                              className="hidden"
                            />
                            {size}
                          </label>
                        ))}
                      </div>
                    ) : (
                      // Champ de texte pour les autres attributs
                      <input
                        type="text"
                        placeholder="Valeurs (séparées par des virgules)"
                        value={attribute.values.join(', ')}
                        onChange={(e) => handleAttributeChange(
                          index,
                          'values',
                          e.target.value.split(',').map(v => v.trim())
                        )}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none"
                      />
                    )}

                    <label className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={attribute.visible}
                        onChange={(e) => handleAttributeChange(index, 'visible', e.target.checked)}
                        className="w-4 h-4 text-[#048B9A] focus:ring-[#048B9A] rounded"
                      />
                      <span className="ml-2 text-sm">Visible sur la page du produit</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expédition */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Expédition</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Poids (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">L (cm)</label>
                <input
                  type="number"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">l (cm)</label>
                <input
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">H (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#048B9A] focus:border-[#048B9A] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          {/* Images */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Images du produit</h2>
            
            {/* Image principale */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image principale
              </label>
              {mainImage ? (
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={mainImage.url}
                    alt="Image principale"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeMainImage}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <FaTimes className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-[#048B9A] transition-colors cursor-pointer rounded-lg">
                  <FaCloudUploadAlt className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500 mt-2">Image principale</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Galerie d'images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Galerie d'images
              </label>
              <div className="grid grid-cols-2 gap-2">
                {galleryImages.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <FaTimes className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
                <label className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-[#048B9A] transition-colors cursor-pointer flex flex-col items-center justify-center">
                  <FaCloudUploadAlt className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500 mt-2">Ajouter</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483] disabled:opacity-50 flex items-center justify-center text-sm"
            >
              {isSubmitting ? <Spinner /> : 'Publier'}
            </button>
          </div>
        </div>
      </motion.form>
    </div>
  );
} 