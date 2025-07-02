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
    const { items, removeFromCart, getTotalItems, getTotalPrice } = useCartStore()
    const modalRef = useRef<HTMLDivElement>(null)

    const navigate = useNavigate();
    const { clearCart } = useCartStore();

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
                        {items.map(item => (
                        <div key={item.id} className="flex justify-between items-center border-b pb-2">
                            <div>
                                <p className="font-medium text-gray-700">{item.title}</p>
                                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                <p className="text-sm text-gray-500">Subtotal: ${item.price * item.quantity}</p>
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
                            <p className="font-semibold">Total: ${getTotalPrice().toFixed(2)}</p>
                            <p className="text-sm text-gray-500">Productos: {getTotalItems()}</p>
                        </div>
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
                        {/* <button
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            onClick={handlePayment}
                            >
                            Proceder al pago
                        </button> */}
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}