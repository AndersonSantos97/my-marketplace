import axios from "./axiosInstance";
import type { Artist } from "../types/Artist";

export const fetchArtists = async (userRole: number = 2): Promise<Artist[]> => {
    const res = await axios.get(`/users/role/${userRole}`);
    console.log("Datos recibidos:", res.data);
    return res.data;
};