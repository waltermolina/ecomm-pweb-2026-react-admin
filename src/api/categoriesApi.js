import { apiRequest } from './apiClient.js';

const endpoint = '/api/categories';

export const getCategories = () => apiRequest(endpoint);
export const getCategory = (id) => apiRequest(`${endpoint}/${encodeURIComponent(id)}`);
export const createCategory = (category) =>
  apiRequest(endpoint, { method: 'POST', body: JSON.stringify(category) });
export const updateCategory = (id, category) =>
  apiRequest(`${endpoint}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(category),
  });
export const deleteCategory = (id) =>
  apiRequest(`${endpoint}/${encodeURIComponent(id)}`, { method: 'DELETE' });
