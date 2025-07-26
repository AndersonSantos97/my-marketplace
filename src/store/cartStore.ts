import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

interface CartItem extends Product {
    quantity: number
}

interface CartState {
    items: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    clearCart: () => void
    incrementQuantity: (productId: number) => void;
    decrementQuantity: (productId: number) => void;
    getTotalItems: () => number
    getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const existing = get().items.find(item => item.id === product.id)
        if (existing) {
          if(existing.quantity < product.stock){
            set({
              items: get().items.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            })
          }
        } else {
          set({ items: [...get().items, { ...product, quantity: 1 }] })
        }
      },

      incrementQuantity: (productId) => {
        set({
          items: get().items.map((item) => 
          item.id === productId && item.quantity < item.stock
          ? {...item, quantity: item.quantity + 1}
          :item
        )
        });
      },

      decrementQuantity: (productId) => {
        set({
          items: get().items
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },

      removeFromCart: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) })
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
 
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage' // clave para localStorage
    }
  )
)