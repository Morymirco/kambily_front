'use client';

import { useState } from 'react';
import Image from 'next/image';

const ProductForm = () => {
    // État initial du formulaire
    const [formData, setFormData] = useState({
        name: 'Titre du produit',
        short_description: 'Description courte du produit',
        long_description: 'Description longue et détaillée du produit avec toutes ses caractéristiques',
        quantity: 0,
        regular_price: 0,
        promo_price: 0,
        sku: 'SKU-PROD-001',
        stock_status: true,
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        product_type: 'simple',
        etat_stock: 'En Stock',
        categories: [1, 2], // IDs des catégories par défaut
    
    });

    // État pour gérer les images
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    // Gestion du changement des champs du formulaire
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Gestion du changement des images
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        // Création des URLs de prévisualisation
        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        // Ajout des données du formulaire
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        // Ajout des images
        images.forEach(image => {
            formDataToSend.append('images', image);
        });

        try {
            const response = await fetch('https://api.kambily.store/products/create/', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Assurez-vous d'avoir le token
                }
            });

            if (response.ok) {
                alert('Produit créé avec succès !');
                // Réinitialiser le formulaire
                setFormData({
                    name: '',
                    short_description: '',
                    long_description: '',
                    quantity: 0,
                    regular_price: 0,
                    promo_price: 0,
                    sku: '',
                    stock_status: true,
                    weight: 0,
                    length: 0,
                    width: 0,
                    height: 0,
                    product_type: 'simple',
                    etat_stock: 'En Stock',
                });
                setImages([]);
                setPreviewUrls([]);
            } else {
                throw new Error('Erreur lors de la création du produit', response.status,);
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la création du produit');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Images du produit
                </label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                />
                <div className="flex gap-2 mt-2">
                    {previewUrls.map((url, index) => (
                        <div key={index} className="relative w-20 h-20">
                            <Image
                                src={url}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="object-cover rounded"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md
                    hover:bg-blue-700 transition duration-200"
            >
                Ajouter le produit
            </button>
        </form>
    );
};

export default ProductForm; 