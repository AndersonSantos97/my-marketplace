import  { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createProduct, updateProduct, getCategories, getProductsBySeller2 } from "../api/products";
import type { Product } from "../types/product";
import type {Category} from "../types/categories"
import { ProductForm } from "../components/ProductForm";
import { ProductCard } from "../components/ProductCardEditable";
import { Navbar } from "./Navbar";

export const VendorDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (user) {
      getProductsBySeller2(user.id).then(setProducts).catch(console.error);
      getCategories().then(setCategories).catch(console.error);
    }
  }, [user]);

    const handleCreate = async (productData: Omit<Product, "id">) => {
    if (!user) return;

    const newProduct = await createProduct({
        ...productData,
        artist_id: user.id,
        seller_id: user.id, // opcional, si también se usa
    });

    setProducts(prev => [...prev, newProduct]);
    setShowForm(false);
    };

  const handleUpdate = async (id: number, data: Partial<Product>) => {
    const {
      title,
      description,
      price,
      is_digital,
      file_url,
      stock,
      category_id,
      status_id,
      image_url,
    } = data;

    const updated = await updateProduct(id, {
      title,
      description,
      price,
      is_digital,
      file_url,
      stock,
      category_id,
      status_id,
      image_url,
    });

    setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleInactivate = async (id: number) => {
    await updateProduct(id, { status_id: 3 });
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <>
      <header className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-15">
          <Navbar />
        </div>
      </header>
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Panel del Vendedor</h1>

        <div className="mb-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            onClick={() => {
              setShowForm(true);
              setEditingProduct(null);
            }}
          >
            Crear nuevo producto
          </button>
        </div>

        {showForm && (
          <ProductForm
            initialData={editingProduct}
            categories={categories}
            onSubmit={(data) => {
              if (editingProduct) {
                handleUpdate(editingProduct.id, data);
              } else {
                handleCreate(data);
              }
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => {
                setEditingProduct(product);
                setShowForm(true);
              }}
              onInactivate={() => handleInactivate(product.id)}
            />
          ))}
        </div>
      </section>
    </>

  );
};
