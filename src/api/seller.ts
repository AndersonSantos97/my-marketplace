import axios from "./axiosInstance";
import type { Seller } from "../types/Seller";

export const fetchSellers = async (skip = 0, limit = 20): Promise<Seller[]> => {
    const response = await axios.get(`/salessellers/by-products`, {
        params: {skip, limit}
    })
    return response.data
}