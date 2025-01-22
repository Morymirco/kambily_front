"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function AddProductSimple() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef(null);

  const router = useRouter();

  // Données par défaut
  const defaultData = {
    name: "Produit Test",
    short_description: "Description courte du produit test",
    long_description: "Description longue et détaillée du produit test avec toutes ses caractéristiques",
    regular_price: 12000,
    promo_price: 15000,
    sku: "PROD-TEST-001",
    stock_status: true,
    weight: 1.5,
    length: 30,
    width: 20,
    height: 10,
    product_type: 'variable',
    etat_stock: 'En Stock',
    quantity: 50,
    categories: [1, 2], // IDs des catégories par défaut
    colors: [1, 2], // IDs des couleurs par défaut
    sizes: [1, 2], // IDs des tailles par défaut
    etiquettes: [1, 2], // IDs des étiquettes par défaut
  };

  const handleClick = () => {
    ref.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/login');
        return;
      }

      if (!ref.current.files.length) {
        setError('Au moins une image est requise');
        setLoading(false);
        return;
      }

    //   const dataSended = new FormData();

    //   // Ajout des données par défaut
    //   Object.entries(defaultData).forEach(([key, value]) => {
    //     dataSended.append(key, value);
    //   });
    // Créez un objet FormData
      const dataSended = new FormData();

      dataSended.append('name', defaultData.name);
      dataSended.append('short_description', defaultData.short_description);
      dataSended.append('long_description', defaultData.long_description);
      dataSended.append('regular_price', defaultData.regular_price);
      dataSended.append('promo_price', defaultData.promo_price);
      dataSended.append('sku', defaultData.sku);
      dataSended.append('stock_status', defaultData.stock_status);
      dataSended.append('weight', defaultData.weight);
      dataSended.append('length', defaultData.length);
      dataSended.append('width', defaultData.width);
      dataSended.append('height', defaultData.height);
      dataSended.append('product_type', defaultData.product_type);
      dataSended.append('etat_stock', defaultData.etat_stock);
      dataSended.append('quantity', defaultData.quantity);
      dataSended.append('categories', `[${defaultData.categories}]`);
      dataSended.append('sizes', `[${defaultData.sizes}]`);
      dataSended.append('etiquettes', `[${defaultData.etiquettes}]`);
      dataSended.append('colors', `[${defaultData.colors}]`)
      

      // Ajout des images
      Array.from(ref.current.files).forEach(file => {
        dataSended.append('images', file);
      });

      const response = await fetch("https://api.kambily.store/products/create/", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: dataSended
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Produit créé avec succès');
        router.push('/products');
      } else {
        throw new Error(data.message || 'Erreur lors de la création du produit');
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Ajouter un produit test</h1>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              name="images"
              multiple
              accept="image/png, image/jpeg"
              className="sr-only"
              ref={ref}
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  console.log('Images sélectionnées:', e.target.files);
                }
              }}
            />
            <button
              type="button"
              onClick={handleClick}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Sélectionner des images
            </button>
            {ref.current?.files?.length > 0 && (
              <p className="text-sm text-gray-600">
                {ref.current.files.length} image(s) sélectionnée(s)
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#048B9A] text-white py-4 rounded-lg hover:bg-[#037483] disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                Création en cours...
              </div>
            ) : (
              'Créer le produit test'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 