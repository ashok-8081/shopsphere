import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

axiosInstance.interceptors.request.use((config) => {
  //An interceptor runs before every single request automatically. Checks if userInfo exists in localStorage
  //If yes — extracts the token
  //Attaches it to every request header automatically
  const userInfo = localStorage.getItem("userInfo");

  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
