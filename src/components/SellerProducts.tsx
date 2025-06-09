import type { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  // const handleAddToCart = () => {
  //   // Lógica para agregar al carrito
  //   console.log('Agregar al carrito:', product.id);
  // };
  const addToCart = useCartStore(state => state.addToCart)

  return (
    <div className="border rounded-lg shadow hover:shadow-md p-4">
      <img src={product.image_url} alt={product.title} className="w-full h-48 object-cover mb-4 rounded" />
      <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <p className="text-blue-500 font-bold mb-4">${product.price}</p>
      <button
        onClick={() => {
          addToCart(product)
          toast.success(`${product.title} agregado al carrito`)
        }}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Agregar al carrito
      </button>
    </div>
  );
};