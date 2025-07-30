import { useEffect, useRef } from "react";
import { confirmPaypalPayment } from "../api/paypal";

interface PayPalButtonProps {
  amount: number;
  createOrderBackend: () => Promise<string>; // Nuevo
  onSuccess: (details: any) => void;
  onError: (err: any) => void;
}

export const PayPalButton = ({
  amount,
  createOrderBackend,
  onSuccess,
  onError
}: PayPalButtonProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  console.log(amount);
  useEffect(() => {
    const container = paypalRef.current;
    if (!window.paypal || !container) return;

    const button = window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal'
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
        console.log(data)
        const details = await actions.order.capture();
        try {
          const paypalOrderId = details.id;
          await confirmPaypalPayment(paypalOrderId);
          onSuccess(details);
        } catch (err) {
          console.error("Error al capturar el pago en backend:", err);
          onError(err);
        }
      },
      onError: (err: any) => {
        console.error("Error en PayPal Buttons:", err);
        onError(err);
      }
    });

    button.render(container);

    return () => {
      button.close();
    };
  }, []); //OJO: SIN dependencias dinámicas

  return <div ref={paypalRef} />;
};