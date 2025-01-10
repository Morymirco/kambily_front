'use client'
import DeleteConfirmationModal from '@/app/Components/Admin/DeleteConfirmationModal';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaComment, FaEdit, FaEye, FaImages, FaStar, FaTrash } from 'react-icons/fa';

export default function ProductDetailAdmin() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          router.push('/test/login');
          return;
        }

        const response = await fetch(`http://35.85.136.46:8001/products/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Erreur lors du chargement du produit');
        }

        const data = await response.json();
        console.log('Données du produit:', data);

        // Transformation des données pour correspondre à la structure attendue
        const transformedProduct = {
          id: data.id,
          name: data.name,
          price: parseFloat(data.regular_price) || 0,
          promo_price: parseFloat(data.promo_price) || 0,
          description: data.long_description || '',
          short_description: data.short_description || '',
          category: data.categories?.[0]?.name || 'Non catégorisé',
          stock_status: data.stock_status,
          quantity: parseInt(data.quantity) || 0,
          sku: data.sku || '',
          etat_stock: data.etat_stock || '',
          product_type: data.product_type || 'simple',
          dimensions: {
            weight: parseFloat(data.weight) || 0,
            length: parseFloat(data.length) || 0,
            width: parseFloat(data.width) || 0,
            height: parseFloat(data.height) || 0
          },
          image: data.images?.[0]?.image || '/placeholder.png',
          gallery: data.images?.map(img => img.image) || [],
          colors: data.colors || [],
          sizes: data.sizes || [],
          etiquettes: data.etiquettes || [],
          attributes: [
            ...(data.colors?.length ? [{
              name: 'Couleurs',
              value: data.colors.map(c => c.name).join(', ')
            }] : []),
            ...(data.sizes?.length ? [{
              name: 'Tailles',
              value: data.sizes.map(s => s.name).join(', ')
            }] : []),
            ...(data.etiquettes?.length ? [{
              name: 'Étiquettes',
              value: data.etiquettes.map(e => e.name).join(', ')
            }] : []),
            {
              name: 'SKU',
              value: data.sku || 'N/A'
            },
            {
              name: 'État',
              value: data.etat_stock || 'N/A'
            },
            {
              name: 'Type',
              value: data.product_type || 'Simple'
            }
          ]
        };

        setProduct(transformedProduct);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
        toast.error(err.message);
        
        if (err.message.includes('401') || err.message.includes('403')) {
          router.push('/test/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, router]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://35.85.136.46:8001/products/${params.id}/reviews`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des avis');
        }

        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoadingReviews(false);
      }
    };

    if (params.id) {
      fetchReviews();
    }
  }, [params.id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`http://35.85.136.46:8001/products/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      toast.success('Produit supprimé avec succès');
      router.push('/admin/products');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => router.back()}
          className="px-4 py-2 bg-[#048B9A] text-white rounded-lg"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <FaArrowLeft className="text-gray-500" />
            </button>
            <h1 className="text-xl font-bold">Détails du produit</h1>
          </div>

          <div className="flex gap-3">
            <Link 
              href={`/test/testafficheproduct/${params.id}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <FaEye />
              <span>Voir</span>
            </Link>
            <Link 
              href={`/admin/products/${params.id}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-[#048B9A] text-white rounded-lg hover:bg-[#037483]"
            >
              <FaEdit />
              <span>Modifier</span>
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <FaTrash />
              <span>Supprimer</span>
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-3 gap-6">
          {/* Colonne de gauche - Images */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaImages />
                Images
              </h2>
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.gallery?.[selectedImageIndex] || product.image || '/placeholder.png'}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.gallery?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index 
                        ? 'border-[#048B9A]' 
                        : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne centrale - Informations principales */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du produit
                  </label>
                  <p className="text-lg font-semibold">{product.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix
                  </label>
                  <p className="text-lg font-semibold">{product.price?.toLocaleString()} GNF</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <p>{product.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.stock_status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock_status ? 'En stock' : 'Rupture de stock'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium mb-4">Description</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
            </div>

            {/* Caractéristiques */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium mb-4">Caractéristiques</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.attributes?.map((attr, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {attr.name}
                    </label>
                    <p>{attr.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section des avis */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaComment />
            Avis clients
          </h2>

          {loadingReviews ? (
            <div className="flex justify-center py-4">
              <div className="w-8 h-8 border-4 border-[#048B9A] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.author}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              Aucun avis pour ce produit
            </p>
          )}
        </div>
      </div>
      
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer le produit"
        message="Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible."
        loading={isDeleting}
      />
    </>
  );
} 