import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5278";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
