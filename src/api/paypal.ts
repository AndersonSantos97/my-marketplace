import axios from "./axiosInstance";

interface CartItem {
  product_id: number;
  quantity: number;
  price: number;
}

export const createPaypalOrder = async (amount: number, items: CartItem[]) => {
  const res = await axios.post("/payments/create", {
    amount,
    items,
  });
  return res.data;
};

// export const capturePaypalOrder = async (orderId: string) => {
//     const res = await axios.post(`/payments/capture/${orderId}`);
//     return res.data;
// }

export const capturePaypalPayment = async (orderId: string) => {
  const res = await axios.post(`/payments/capture/${orderId}`);
  return res.data;
};

export const confirmPaypalPayment = async (paypalOrderId: string) => {
  return await axios.post(`/payments/confirm/${paypalOrderId}`);
};
