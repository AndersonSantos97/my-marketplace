import axios from "./axiosInstance";
import type { MostSale } from "../types/MostSales";

export const fetchMostSales = async(): Promise<MostSale[]> => {
    const res = await axios.get('/sales/most_sales_now');
    console.log("Datos recibidos:", res.data);
    return res.data
    
}