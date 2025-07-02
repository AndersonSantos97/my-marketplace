import axios from "./axiosInstance";
import type { CategoryWithProducts } from "../types/category";

export const fetchProductsByCategory = async ():Promise<CategoryWithProducts[]> => {
    const response = await axios.get('/products/by-categories/?limit_per_category=10')
    return response.data
}