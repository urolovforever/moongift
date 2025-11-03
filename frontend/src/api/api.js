import axios from 'axios';

// VITE_API_URL environment variable'dan foydalaning
// Agar u mavjud bo'lmasa, localhost ishlatiladi (development uchun)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,  // /api qo'shildi
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,  // CORS uchun
});

// Response interceptor - xatolarni ko'rish uchun
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export const getCategories = () => api.get('/products/categories/');
export const getProducts = (params = {}) => api.get('/products/', { params });
export const getFeaturedProducts = () => api.get('/products/featured/');
export const getProductBySlug = (slug) => api.get(`/products/${slug}/`);
export const sendContactMessage = (data) => api.post('/contact/', data);

export default api;