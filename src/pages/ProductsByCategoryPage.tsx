import { useEffect, useState } from "react";
import { fetchProductsByCategory } from "../api/categories";
import type { CategoryWithProducts } from "../types/category";
import { ProductCard } from "../components/ProductCard";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";

const ProductsByCategoryPage = () => {
    const [categories, setCategories] = useState<CategoryWithProducts[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const data = await fetchProductsByCategory()
            setCategories(data)
            setLoading(false)
        }
        load()
    }, [])

    return(
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
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8 text-center">Productos por Categoría</h1>
                {loading ? (
                    <p className="text-center">Cargando...</p>
                ) : (
                    categories.map(category => (
                    <div key={category.category_id} className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                        {category.category_name} ({category.total_products})
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {category.products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        </div>
                        <Link
                            to={`/categoria/${category.category_id}`}
                            className="text-blue-600 hover:underline"
                            >
                            Ver más
                        </Link>
                    </div>
                    ))
                )}
            </div>
            <Footer/>
        </>
    )
}

export default ProductsByCategoryPage