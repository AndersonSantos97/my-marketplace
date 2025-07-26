import type { Product } from "../types/product";
import { getDriveDirectUrl } from "../utils/getDriveDirectUrl";

interface Props {
  product: Product;
  onEdit?: () => void;
  onInactivate?: () => void;
}

export const ProductCard: React.FC<Props> = ({ product, onEdit, onInactivate }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <img src={product.image_url} alt={product.title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2 capitalize">{product.title}</h2>
      <p className="text-sm text-gray-600 capitalize">{product.description}</p>
      <p className="text-sm font-bold mt-1">${product.price}</p>
      <div className="flex gap-2 mt-4">
        {onEdit && <button onClick={onEdit} className="text-blue-900 hover:text-blue-700 cursor-pointer">Editar</button>}
        {onInactivate && <button onClick={onInactivate} className="text-red-600 hover:text-red-400 cursor-pointer">Inactivar</button>}
      </div>
    </div>
  );
};