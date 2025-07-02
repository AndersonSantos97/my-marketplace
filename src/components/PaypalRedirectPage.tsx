import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { capturePaypalPayment } from "../api/paypal";
import { useCartStore } from "../store/cartStore";

export const PaypalRedirectPage = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Procesando tu pago...");
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCartStore();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token"); // este es el order_id de PayPal

    if (!token) {
      setStatus("error");
      setMessage("Token de PayPal no encontrado.");
      return;
    }

    const capturePayment = async () => {
      try {
        const response = await capturePaypalPayment(token);
        console.log("Pago capturado:", response);
        setStatus("success");
        setMessage("¡Pago realizado con éxito!");
        clearCart();
        localStorage.removeItem("local_order_id");

        // Redirigir a productos después de unos segundos
        setTimeout(() => navigate("/"), 4000);
      } catch (err) {
        console.error("Error al capturar pago:", err);
        setStatus("error");
        setMessage("Ocurrió un error al procesar el pago.");
      }
    };

    capturePayment();
  }, [location.search, clearCart, navigate]);

  return (
    <section className="flex flex-col items-center justify-center h-screen px-6">
      {status === "loading" && <p className="text-gray-600 text-lg">{message}</p>}
      {status === "success" && (
        <div className="text-green-600 text-xl font-bold">{message}</div>
      )}
      {status === "error" && (
        <div className="text-red-600 text-xl font-bold">{message}</div>
      )}
    </section>
  );
};