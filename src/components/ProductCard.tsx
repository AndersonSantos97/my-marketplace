import type { Product } from '../types/product'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  const addToCart = useCartStore(state => state.addToCart)

  return (
    <div className="bg-gray-50 shadow-md overflow-hidden transition hover:shadow-lg">
      <img
        src={product.image_url}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">${product.price.toFixed(2)}</span>
          <button
            onClick={() => {
                addToCart(product)
                toast.success(`${product.title} agregado al carrito`)
            }}
            className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}