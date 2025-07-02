import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { capturePaypalPayment } from "../api/paypal";
import { useCartStore } from "../store/cartStore";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";

export const PaymentSuccessPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCartStore();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      capturePaypalPayment(token)
        .then(() => {
          clearCart();
          setStatus("success");
          setTimeout(() => navigate("/"), 3000); // redirige al inicio después de 3 seg
        })
        .catch(() => setStatus("error"));
    } else {
      setStatus("error");
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      {status === "loading" && (
        <>
          <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
          <p className="text-lg font-medium text-gray-700">Procesando tu pago...</p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle className="text-green-600 mb-4" size={48} />
          <p className="text-lg font-semibold text-green-700">¡Pago exitoso!</p>
          <p className="text-gray-600 mt-2">Redirigiéndote a la página principal...</p>
        </>
      )}

      {status === "error" && (
        <>
          <AlertTriangle className="text-red-600 mb-4" size={48} />
          <p className="text-lg font-semibold text-red-700">Hubo un problema con tu pago</p>
          <p className="text-gray-600 mt-2">Por favor, intenta nuevamente o contáctanos.</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
        </>
      )}
    </section>
  );
};
