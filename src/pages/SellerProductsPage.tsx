import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsBySeller } from '../api/products';
import type { Product } from '../types/product';
import { ProductCard } from '../components/SellerProducts';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const SellerProductsPage = () => {
  const { sellerId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (sellerId) {
      getProductsBySeller(sellerId).then(setProducts);
    }
  }, [sellerId]);

  return (
    <>
      <Navbar/>
      <section className="px-4 pt-20 pb-20">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Productos del Vendedor</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};