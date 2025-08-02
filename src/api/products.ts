import axios from "./axiosInstance";
import type { Product } from "../types/product";

const API = import.meta.env.VITE_API_URL;

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


export const searchProducts = async(query: string):Promise<Product[]> => {
  const response = await axios.get<Product[]>(`/products/search/alike`,{
    params: {query},
  });

  return response.data;
}

// Obtener productos inactivos del vendedor
export const getInactiveProducts = (sellerId: number) =>
  axios.get(`/products/seller/inactive/${sellerId}?status_id=3`);

// Activar producto (cambiar status_id a 1)
export const activateProduct = (productId: number) =>
  axios.patch(`/products/active/${productId}`, { status_id: 1 });