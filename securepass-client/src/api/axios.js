import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.9.3:4000/api", // backend URL
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
