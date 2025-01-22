import ProductForm from '../components/ProductForm';

export default function CreateProductPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Créer un nouveau produit
            </h1>
            <ProductForm />
        </div>
    );
} 