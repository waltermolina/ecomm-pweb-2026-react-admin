import { apiRequest } from './apiClient.js';

const endpoint = '/api/users';

export const getUsers = () => apiRequest(endpoint);
export const getUser = (id) => apiRequest(`${endpoint}/${encodeURIComponent(id)}`);
export const createUser = (user) =>
  apiRequest(endpoint, { method: 'POST', body: JSON.stringify(user) });
export const updateUser = (id, user) =>
  apiRequest(`${endpoint}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  });
export const deleteUser = (id) =>
  apiRequest(`${endpoint}/${encodeURIComponent(id)}`, { method: 'DELETE' });
