import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProductsByCategory } from "../api/products"
import { ProductCard } from "../components/ProductCard"
import type { Product } from "../types/product";
import Hero from "../components/Hero";
import { Navbar } from "../components/Navbar";

export const CategoryDetailPage = () => {
    const {categoryId} = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [category, setCategory] = useState();
    const limit = 12;

    useEffect(() => {
        if (categoryId) {
        getProductsByCategory(Number(categoryId), page, limit).then(({ items, category, total }) => {
            setProducts(items);
            setTotal(total);
            setCategory(category);
        });
        }
    }, [categoryId, page]);
    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    <Hero 
                        image="/images/product_banner.jpg"
                        title="El Mejor Lugar Para Comprar"
                    />
                    <Navbar />
                </div>
            </div>
            <section className="px-6 py-10 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Productos de {category}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="flex justify-between">
                    <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    disabled={page === 0}
                    onClick={() => setPage(prev => prev - 1)}
                    >
                    Anterior
                    </button>
                    <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={(page + 1) * limit >= total}
                    onClick={() => setPage(prev => prev + 1)}
                    >
                    Siguiente
                    </button>
                </div>
            </section>
        </>
    );
}