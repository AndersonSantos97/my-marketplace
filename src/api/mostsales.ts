import axios from "./axiosInstance";
import type { Product } from "../types/product";

export const fetchMostSales = async(): Promise<Product[]> => {
    const res = await axios.get('/sales/most_sales_now');
    console.log("Datos recibidos:", res.data);
    return res.data
    
}