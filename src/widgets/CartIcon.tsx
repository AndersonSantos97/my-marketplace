import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export const CartIcon = () => {
  const totalItems = useCartStore(state => state.getTotalItems())

  return (
    <div className="relative cursor-pointer w-8 h-8 flex items-center justify-center">
      <ShoppingCart size={28} className="text-white" />
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )}
    </div>
  );
};