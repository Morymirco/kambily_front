'use client'
import { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 10; // Définir une constante pour le nombre d'éléments par page
const API_BASE_URL = 'http://127.0.0.1:8001'; // Centraliser l'URL de l'API

export default function ProductList() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	
	// Utiliser useCallback pour mémoriser la fonction
	const fetchProducts = useCallback(async (pageNumber = 1) => {
		if (loading) return; // Éviter les appels multiples pendant le chargement
		
		try {
			setLoading(true);
			setError(null); // Réinitialiser l'erreur au début de chaque appel
			
			const response = await fetch(
				`${API_BASE_URL}/products/?page=${pageNumber}&limit=${ITEMS_PER_PAGE}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					},
					credentials: 'include', // Gérer les cookies si nécessaire
				}
			);
			
			if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
			}
			
			const data = await response.json();
			console.log (data)
			
			const transformedProducts = (data.results || []).map(product => ({
				id: product.id,
				title: product.name,
				image: product.images?.[0]?.image || '/tshirt.png',
				gallery: product.images?.slice(1)?.map(img => img.image) || [],
				price: new Intl.NumberFormat('fr-FR', {
					style: 'currency',
					currency: 'XOF'
				}).format(product.regular_price),
				oldPrice: product.promo_price !== product.regular_price
					? new Intl.NumberFormat('fr-FR', {
						style: 'currency',
						currency: 'XOF'
					}).format(product.regular_price)
					: null,
				inStock: product.etat_stock === 'En Stock',
				category: product.categories?.[0]?.name || 'Non catégorisé'
			}));
			
			setProducts(prev => pageNumber === 1 ? transformedProducts : [...prev, ...transformedProducts]);
			setHasMore(!!data.next);
		} catch (err) {
			console.error('Erreur lors du chargement des produits:', err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, [loading]); // Dépendance au loading state
	
	useEffect(() => {
		fetchProducts(page);
	}, [page, fetchProducts]);
	
	// Gestionnaire de rechargement
	const handleRetry = () => {
		setProducts([]);
		setPage(1);
		fetchProducts(1);
	};
	
	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Liste des Produits</h1>
				{error && (
					<button
						onClick={handleRetry}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
					>
						Réessayer
					</button>
				)}
			</div>
			
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					<p>{error}</p>
				</div>
			)}
			
			<InfiniteScroll
				dataLength={products.length}
				next={() => setPage(prev => prev + 1)}
				hasMore={hasMore && !error}
				loader={
					<div className="flex justify-center p-4">
						<Loader2 className="animate-spin h-8 w-8 text-blue-500" />
					</div>
				}
				endMessage={
					<p className="text-center text-gray-500 p-4">
						Vous avez vu tous les produits disponibles.
					</p>
				}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{products.map(product => (
						<div
							key={product.id}
							className="border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white"
						>
							<div className="relative pt-[100%]">
								<img
									src={product.image}
									alt={product.title}
									className="absolute top-0 left-0 w-full h-full object-cover"
									onError={(e) => {
										e.target.src = '/tshirt.png';
									}}
								/>
							</div>
							<div className="p-4">
								<h2 className="text-lg font-semibold line-clamp-2 mb-2">
									{product.title}
								</h2>
								<div className="flex items-baseline gap-2">
									<p className="text-lg font-bold text-blue-600">
										{product.price}
									</p>
									{product.oldPrice && (
										<p className="text-sm text-gray-500 line-through">
											{product.oldPrice}
										</p>
									)}
								</div>
								<p className={`text-sm mt-2 ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
									{product.inStock ? 'En stock' : 'Rupture de stock'}
								</p>
							</div>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}