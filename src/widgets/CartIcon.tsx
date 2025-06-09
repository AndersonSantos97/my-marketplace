import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export const CartIcon = () => {
    const totalItems = useCartStore(state => state.getTotalItems())

    return(
        <div className="relative cursor-pointer">
            <ShoppingCart size={28} className="text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"/>
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                </span>
            )}
        </div>
    )
}