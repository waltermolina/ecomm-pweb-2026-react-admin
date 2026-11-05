import { apiRequest } from './apiClient.js';

const endpoint = '/api/products';

export const getProducts = () => apiRequest(endpoint);
export const getProduct = (id) => apiRequest(`${endpoint}/${encodeURIComponent(id)}`);
export const createProduct = (product) =>
  apiRequest(endpoint, { method: 'POST', body: JSON.stringify(product) });
export const updateProduct = (id, product) =>
  apiRequest(`${endpoint}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  });
export const deleteProduct = (id) =>
  apiRequest(`${endpoint}/${encodeURIComponent(id)}`, { method: 'DELETE' });
