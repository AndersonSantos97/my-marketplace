import { useEffect, useState } from "react";
import { getInactiveProducts, activateProduct } from "../api/products";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Navbar } from "../components/Navbar";

export const InactiveProductsPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user) {
      fetchInactiveProducts();
    }
  }, [user]);

  const fetchInactiveProducts = async () => {
    try {
      const res = await getInactiveProducts(user!.id);
      setProducts(res.data);
    } catch (error) {
      console.error("Error al obtener productos inactivos:", error);
      toast.error("No se pudieron cargar los productos.");
    }
  };

  const handleActivate = async (productId: number) => {
    try {
      await activateProduct(productId);
      toast.success("Producto activado.");
      fetchInactiveProducts(); // Volver a cargar la lista
    } catch (error) {
      console.error("Error al activar producto:", error);
      toast.error("No se pudo activar el producto.");
    }
  };

  if (!user) {
    return <p className="text-center mt-6">Debes iniciar sesión.</p>;
  }

  return (
    <>
      <header className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-15">
          <Navbar />
        </div>
      </header>
      <section>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Productos inactivos</h1>
          {products.length === 0 ? (
            <p>No tienes productos inactivos.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product: any) => (
                <div key={product.id} className="bg-white border rounded shadow p-4 flex flex-col">
                  <img
                    src={product.image_url} 
                    alt={product.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h2 className="font-semibold text-lg capitalize">{product.title}</h2>
                  <p className="text-sm text-gray-600 mb-2 capitalize">{product.description}</p>
                  <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleActivate(product.id)}
                    className="mt-auto bg-blue-900 text-white py-1 px-3 rounded hover:bg-blue-800 transition"
                  >
                    Activar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
