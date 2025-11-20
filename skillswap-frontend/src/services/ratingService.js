import api from './api';

export const ratingService = {
  createRating: (data) => api.post('/ratings', data),
  getRatingsForUser: (userId) => api.get('/ratings', { params: { userId } }),
};

