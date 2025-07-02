import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export const CartIcon = () => {
    const totalItems = useCartStore(state => state.getTotalItems())

    return(
        <div className="relative cursor-pointer">
            <ShoppingCart size={28} className="hover:text-gray-300 block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600 md:p-0 md:dark:hover:text-gray-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"/>
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                </span>
            )}
        </div>
    )
}