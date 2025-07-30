import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: false,
});

instance.interceptors.request.use(async (config) =>{
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh_token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });
          const newAccessToken = res.data.access_token;

          localStorage.setItem("token", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (err) {
          console.error("Refresh token expirado. Redirigiendo al login...");
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;