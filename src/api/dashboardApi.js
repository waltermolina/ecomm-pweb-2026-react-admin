import { apiRequest } from './apiClient.js';

export const getDashboardStats = () => apiRequest('/api/stats');
