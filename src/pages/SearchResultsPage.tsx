import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchProducts } from "../api/products";
import type { Product } from "../types/product";
import { ProductCard } from "../components/ProductCard";
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Hero from '../components/Hero';

export const SearchResultsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const results = await searchProducts(query);
        setProducts(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim() !== "") {
      fetchProducts();
    }
  }, [query]);

  return (
    <>
        <div className="max-w-7xl mx-auto">
          <div className="relative">
              <Hero 
                image="/images/3.png"
                title="Los mejores productos para adquirir"
              />
              <Navbar />
          </div>
        </div>
        <div className="px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Resultados de búsqueda para: "{query}"</h2>

            {loading ? (
                <p className="text-gray-600">Cargando...</p>
            ) : products.length === 0 ? (
                <p className="text-gray-600">No se encontraron productos.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            )}
        </div>

        <Footer/>
    </>
  );
};
