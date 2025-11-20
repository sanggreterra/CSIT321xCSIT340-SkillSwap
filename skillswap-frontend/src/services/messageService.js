import api from './api';

export const messageService = {
  sendMessage: (data) => api.post('/messages', data),
  getMessagesByExchange: (exchangeId) => api.get('/messages', { params: { exchangeId } }),
};
