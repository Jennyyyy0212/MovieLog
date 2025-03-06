import api from './api';

const reviewService = {
  addReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },
  
  getUserReviews: async () => {
    const response = await api.get('/reviews');
    return response.data;
  }
};

export default reviewService;