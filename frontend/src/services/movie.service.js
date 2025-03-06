import api from './api';

const movieService = {
  searchMovie: async (title) => {
    const response = await api.post(`/movies/search`, {title});
    return response.data;
  },
  
  getTrendingMovies: async () => {
    const response = await api.get('/external/trending');
    return response.data;
  },

  getMovie: async (id) => {
 
    const response = await api.get(`/movies/movie/${id}`);
    return response.data;
  }
};

export default movieService;