import { PayPalButton } from "../components/PayPalButton";
import { useState } from "react";

export const Cart = () => {
  const [cartTotal, setCartTotal] = useState(45.99); // ejemplo

  const handleSuccess = (details: any) => {
    console.log("Pago exitoso:", details);
    alert("Gracias por tu compra, " + details.payer.name.given_name);
    // await fetch("http://localhost:8000/orders", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`, // si estás usando JWT
    //     },
    //     body: JSON.stringify({
    //         orderId: details.id,
    //         total: details.purchase_units[0].amount.value,
    //         payerEmail: details.payer.email_address,
    //         items: [...], // tus ítems si quieres registrar
    //     }),
    // });
  };

  // return (
  //   <div>
  //     <h1>Resumen del Carrito</h1>
  //     <p>Total a pagar: ${cartTotal}</p>
  //     <PayPalButton total={cartTotal} onSuccess={handleSuccess} />
  //   </div>
  // );
};