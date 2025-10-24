import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getCategories = () => api.get('/products/categories/');
export const getProducts = (params = {}) => api.get('/products/', { params });
export const getFeaturedProducts = () => api.get('/products/featured/');
export const getProductBySlug = (slug) => api.get(`/products/${slug}/`);
export const sendContactMessage = (data) => api.post('/contact/', data);

export default api;
