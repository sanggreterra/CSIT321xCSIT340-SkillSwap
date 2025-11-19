import api from './api';

export const skillService = {
  getAllSkills: (params) => api.get('/skills', { params }),
  searchSkills: (query) => api.get('/skills', { params: { q: query } }),
  createOffering: (data) => api.post('/offerings', data),
  createRequest: (data) => api.post('/requests', data),
};
