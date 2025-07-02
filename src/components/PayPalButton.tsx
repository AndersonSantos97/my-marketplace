import { useEffect, useRef } from "react";
import { capturePaypalPayment, confirmPaypalPayment } from "../api/paypal";

interface PayPalButtonProps {
  amount: number;
  createOrderBackend: () => Promise<string>; // Nuevo
  onSuccess: (details: any) => void;
  onError: (err: any) => void;
}

export const PayPalButton = ({ amount, createOrderBackend, onSuccess, onError }: PayPalButtonProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const container = paypalRef.current;

        // Limpiar contenido previo del botón antes de volver a renderizar
        if (container) {
            container.innerHTML = "";
        }

        if (!window.paypal || !paypalRef.current) return;

        window.paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
        },
        createOrder: async () => {
            try {
                return await createOrderBackend();
            } catch (err) {
            console.error("Error al crear orden:", err);
            throw err;
            }
        },
        onApprove: async (data: any, actions: any) => {
            const details = await actions.order.capture();
                    try {
            // Aquí se llama a tu backend para registrar el pago
            const paypalOrderId = details.id;
            const res = await confirmPaypalPayment(paypalOrderId)
            console.log("Pago capturado en el backend:", res.data);

            onSuccess(details); // o también puedes pasar `res.data` si prefieres
            } catch (err) {
            console.error("Error al capturar el pago en backend:", err);
            onError(err);
            }
        },
        onError: (err: any) => {
            onError(err);
        }
        }).render(paypalRef.current);
    }, [amount, createOrderBackend, onSuccess, onError]);

  return <div ref={paypalRef} />;
};