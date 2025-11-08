import api from './api';

export const skillService = {
  getAllSkills: () => api.get('/skills'),
  searchSkills: (query) => api.get(`/skills/search?q=${encodeURIComponent(query)}`),
  createOffering: (data) => api.post('/skill-offerings', data),
  createRequest: (data) => api.post('/skill-requests', data),
};
