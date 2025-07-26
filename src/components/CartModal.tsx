import { X } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useEffect, useRef } from "react";
import { createPaypalOrder } from "../api/paypal";
import { useNavigate } from "react-router-dom";
import { PayPalButton } from "./PayPalButton";


interface CartModalProps {
    isOpen: boolean
    onClose: () => void
}

export const CartModal = ({ isOpen, onClose}: CartModalProps) => {
    const { items, removeFromCart, getTotalItems, getTotalPrice, incrementQuantity, decrementQuantity } = useCartStore()
    const modalRef = useRef<HTMLDivElement>(null)

    const navigate = useNavigate();
    const { clearCart } = useCartStore();
    const hasInsufficientStock = items.some(
        item => item.stock === 0 || item.quantity > item.stock
    );
    useEffect(() => {

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
        
    }, [onclose])

    // Cierre con clic fuera del contenido
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
        }
    }

    if (!isOpen) return null

    return(
        <>
            <div
                className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
                onClick={handleOutsideClick}
                >
                <div
                    ref={modalRef}
                    className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative"
                >
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                    <X size={20} />
                    </button>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Tu carrito</h2>

                    {items.length === 0 ? (
                    <p className="text-gray-500">El carrito está vacío</p>
                    ) : (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <div className="flex flex-col">
                                <p className="font-medium text-gray-700 capitalize">{item.title}</p>
                                <p className="text-sm text-gray-500">Precio unitario: ${item.price}</p>
                                <div className="flex items-center mt-1 space-x-2">
                                    <button
                                    onClick={() => decrementQuantity(item.id)}
                                    className="bg-gray-200 px-2 rounded text-lg cursor-pointer hover:bg-gray-400"
                                    >
                                    -
                                    </button>
                                    <span className="text-gray-500">{item.quantity}</span>
                                    <button
                                    onClick={() => {
                                        if (item.quantity < item.stock) {
                                        incrementQuantity(item.id);
                                        } else {
                                        alert("No puedes agregar más de este producto.");
                                        }
                                    }}
                                    className="bg-gray-200 px-2 rounded text-lg cursor-pointer hover:bg-gray-400"
                                    >
                                    +
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                {item.stock === 0 && (
                                    <p className="text-red-500 text-sm">Agotado</p>
                                )}
                                {item.quantity > item.stock && (
                                    <p className="text-red-500 text-sm">
                                    Solo hay {item.stock} en stock
                                    </p>
                                )}
                                </div>
                                <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                                >
                                Eliminar
                                </button>
                            </div>
                        ))}

                        <div className="border-t pt-2">
                            <p className="font-semibold text-gray-500 ">Total: ${getTotalPrice().toFixed(2)}</p>
                            <p className="text-sm text-gray-500">Productos: {getTotalItems()}</p>
                        </div>
                        {hasInsufficientStock ? (
                            <p className="text-red-500 mt-2">
                            No puedes realizar la compra: hay productos agotados o cantidades que exceden el stock.
                            </p>
                        ) : (
                            <PayPalButton
                                amount={getTotalPrice()}
                                createOrderBackend={async () => {
                                    const res = await createPaypalOrder(getTotalPrice(), items.map(item => ({
                                    product_id: item.id,
                                    quantity: item.quantity,
                                    price: item.price,
                                    })));
                                    localStorage.setItem("local_order_id", res.local_order_id.toString());
                                    
                                    // Retornamos el ID de PayPal para que el botón lo use
                                    return res.paypal_order.id;
                                }}
                                onSuccess={(details) => {
                                    console.log("Pago exitoso:", details);
                                    clearCart();
                                    // Puedes navegar a otra página o mostrar mensaje
                                    navigate("/"); 
                                }}
                                onError={(err) => {
                                    console.error("Error en el pago:", err);
                                    alert("Ocurrió un error al procesar el pago.");
                                }}
                            />
                        )}

                    </div>
                    )}
                </div>
            </div>
        </>
    )
}