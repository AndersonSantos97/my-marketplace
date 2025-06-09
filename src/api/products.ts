import axios from "./axiosInstance";
import type { Product } from "../types/product";

export const getProductsBySeller = async (sellerId: string): Promise<Product[]> => {
  const response = await axios.get(`/products/seller/${sellerId}`);
  return response.data;
};