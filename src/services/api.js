import axios from "axios";
import "dotenv/config";

const api = axios.create({
  baseURL: process.env.BACKEND_URL
});

// sempre enviar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
