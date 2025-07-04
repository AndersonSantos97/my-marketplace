import axios from "./axiosInstance";
import type { Product } from "../types/product";

const API = "http://127.0.0.1:8000";

export const getProductsBySeller = async (sellerId: string): Promise<Product[]> => {
  const response = await axios.get(`/products/seller/${sellerId}`);
  return response.data;
};

export const getProductsBySeller2 = async (sellerId: number) => {
  const res = await fetch(`${API}/products/seller2/${sellerId}`);
  if (!res.ok) throw new Error("Error al cargar productos");
  return await res.json();
};

export const createProduct = async (data: Omit<Product, "id">) => {
  const res = await fetch(`${API}/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

export const updateProduct = async (id: number, data: Partial<any>) => {
  const res = await fetch(`${API}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return await res.json();
};

export const getCategories = async () => {
  const response = await fetch(`${API}/categories/`);
  if (!response.ok) throw new Error("Error al obtener categorías");
  return response.json();
};

export const getProductsByCategory = async (
  categoryId: number,
  page = 0,
  limit = 12
) => {
  const res = await fetch(
    `${API}/products/by-category/${categoryId}?page=${page + 1}&per_page=${limit}`
  );
  if (!res.ok) throw new Error("Error al obtener productos por categoría");
  
  const data = await res.json()

  return {
    items: data.products,
    category: data.category_name,
    total: data.total,
  };
};