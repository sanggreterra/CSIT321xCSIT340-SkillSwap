import api from './api';

export const exchangeService = {
  getExchangesForUser: (userId) => api.get('/exchanges', { params: { userId } }),
};
