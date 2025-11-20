import api from './api';

export const matchService = {
  createMatch: (data) => api.post('/matches', data),
  getMatchesForUser: (userId) => api.get('/matches', { params: { userId } }),
  acceptMatch: (matchId) => api.put(`/matches/${matchId}/accept`),
};
