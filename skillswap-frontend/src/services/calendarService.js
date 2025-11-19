import api from './api';

export const calendarService = {
  createEvent: (data) => api.post('/calendar', data),
  getEventsForUser: (userId) => api.get('/calendar', { params: { userId } }),
};

