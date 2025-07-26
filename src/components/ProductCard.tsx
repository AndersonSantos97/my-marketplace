import type { Product } from '../types/product'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'
import { getDriveDirectUrl } from "../utils/getDriveDirectUrl";

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  const addToCart = useCartStore(state => state.addToCart)
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition w-[250px] flex flex-col overflow-hidden cursor-pointer">
      {getDriveDirectUrl(product.image_url) ? (
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
          Sin imagen
        </div>
      )}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="text-lg font-heading font-semibold text-dark capitalize">{product.title}</h3>
        <p className="text-sm text-muted mt-1 line-clamp-2 capitalize">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-primary font-bold text-lg">${product.price.toFixed(2)}</span>
          {product.stock === 0 ? (
            <span className="text-red-500 font-semibold">Agotado</span>
          ) : (
            <button
              onClick={() => {
                addToCart(product);
                toast.success(`${product.title} agregado al carrito`);
              }}
              className="bg-primary text-white px-3 py-1 rounded-md text-sm bg-blue-900 transition"
            >
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>

  )
}
 